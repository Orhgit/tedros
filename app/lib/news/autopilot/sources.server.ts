// News autopilot — source registry + normalize (TED-114 / ADR-019 §2).
//
// This module is the shared config + fetch/normalize/dedup layer both the
// daily Claude Code routine (ADR-019 §1 — its own agentic session calls
// `WebFetch` against these same URLs and reasons over the result) and any
// future server-side ingester can rely on. It does not itself run on a
// schedule inside this app — no cron/worker imports this at request time —
// but it is the single source of truth for "which sources are approved for
// MVP" so the routine's prompt and this file never drift.
//
// Sources approved for MVP, per docs/research/2026-08-24-news-autopilot-sources.md
// (all verified live with curl/WebFetch on 2026-08-24 — see that doc for the
// full rejection list: gov.il direct, רמ"י, municipal sites):
//
//   1. data.gov.il CKAN datastore_search API — "מחיר למשתכן" housing-lottery
//      dataset (Ministry of Construction & Housing). JSON, no auth, updates
//      weekly. Ranked #1 in research — most directly on-topic, cheapest to
//      parse (no LLM needed even for the basic "new lottery in {city}" fact).
//   2. Google News RSS — 2–3 targeted queries (Ethiopian-Israeli community +
//      housing/rights/community mortgage). Ranked #2 — broadest coverage,
//      catches press + municipal + government items indirectly.
//   3. Walla RSS (general + business feeds) — secondary source, ranked #3.
//      Broad/noisy; kept as a diversity source, filtered by keyword match
//      downstream (triage stage, not this module).
//
// Explicitly out of scope for MVP (see research doc §"לא מומלץ כרגע"):
// gov.il/דירה בהנחה direct (Cloudflare-blocked), רמ"י (no live dataset,
// stale since 2022), municipal sites (no RSS, some currently down).

import { z } from "zod";

// --- Unified normalized shape -----------------------------------------------
// Every source, regardless of transport (JSON API vs RSS), normalizes down
// to this shape before hitting the dedup/triage stage. This is intentionally
// a subset of `news_drafts`' source-attribution columns
// (`app/lib/db/schema/news-drafts.ts`) — `sourceUrl` and `rawSnapshot` map
// 1:1, `sourceName` is filled in by the caller from `NewsSourceConfig.name`.

export interface NormalizedNewsItem {
  /** Human-readable headline as found at the source, unedited. */
  title: string;
  /** Canonical URL for the item — becomes `news_drafts.source_url` (unique). */
  sourceUrl: string;
  /** ISO-8601 timestamp if the source provides one; null if unknown. */
  publishedAt: string | null;
  /**
   * Verbatim excerpt/snippet as fetched — becomes `news_drafts.raw_snapshot`.
   * Never edited or summarized here; drafting/summarizing is the routine's
   * job (ADR-019 §3), not this module's.
   */
  rawExcerpt: string;
}

export type NewsSourceKind = "json-api" | "rss";

export interface NewsSourceConfig {
  /** Stable id, used in logs and as `news_drafts.source_name` prefix. */
  id: string;
  /** Human-readable source name for `news_drafts.source_name`. */
  name: string;
  kind: NewsSourceKind;
  /** URL to fetch. For the CKAN source this already includes query params. */
  url: string;
  /**
   * Fetch the URL and normalize the response into `NormalizedNewsItem[]`.
   * Kept per-source (not a single generic RSS/JSON parser) because each
   * source's field names/shape differ enough that a shared parser would
   * need source-specific branches anyway — this is more explicit to audit.
   */
  fetchAndNormalize(): Promise<NormalizedNewsItem[]>;
}

// --- 1. data.gov.il — "מחיר למשתכן" housing lottery dataset ----------------
// CKAN datastore_search API. `resource_id` is the specific resource found in
// research (2,352 rows, updated 2026-08-16 as of the research date) — the
// package itself (`mechir-lamishtaken`) has multiple resources; this is the
// one with per-lottery rows (city, status, unit count, price/m²).
// https://data.gov.il/api/3/action/datastore_search?resource_id=7c8255d0-49ef-49db-8904-4cf917586031

const MECHIR_LAMISHTAKEN_RESOURCE_ID = "7c8255d0-49ef-49db-8904-4cf917586031";
const MECHIR_LAMISHTAKEN_URL = `https://data.gov.il/api/3/action/datastore_search?resource_id=${MECHIR_LAMISHTAKEN_RESOURCE_ID}&limit=100&sort=_id desc`;

// Only the fields this pipeline cares about — the real API response has
// many more columns; extras are ignored (`z.object` is not `.strict()`).
const mechirLamishtakenRecordSchema = z.object({
  _id: z.number(),
  LamasName: z.string().nullish(), // city
  Neighborhood: z.string().nullish(),
  LotteryStatusValue: z.string().nullish(), // e.g. "פורסמו תוצאות"
  LotteryExecutionDate: z.string().nullish(),
  LotteryHousingUnits: z.union([z.number(), z.string()]).nullish(),
  PriceForMeter: z.union([z.number(), z.string()]).nullish(),
  MarketingMethodDesc: z.string().nullish(),
});

const mechirLamishtakenResponseSchema = z.object({
  success: z.boolean(),
  result: z.object({
    records: z.array(mechirLamishtakenRecordSchema),
  }),
});

// Cities with meaningful Ethiopian-Israeli community concentration, per the
// research doc's municipal-site section — used to filter the (otherwise
// nationwide) dataset down to community-relevant rows before this ever
// reaches the routine's triage stage.
const COMMUNITY_RELEVANT_CITIES = [
  "נתניה",
  "אשדוד",
  "לוד",
  "באר שבע",
  "קריית גת",
  "ראשון לציון",
  "רחובות",
  "פתח תקווה",
  "חדרה",
  "ירושלים",
];

function isCommunityRelevantCity(cityName: string | null | undefined): boolean {
  if (!cityName) return false;
  return COMMUNITY_RELEVANT_CITIES.some((city) => cityName.includes(city));
}

async function fetchMechirLamishtaken(): Promise<NormalizedNewsItem[]> {
  const res = await fetch(MECHIR_LAMISHTAKEN_URL, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`data.gov.il datastore_search failed: HTTP ${res.status}`);
  }
  const json = await res.json();
  const parsed = mechirLamishtakenResponseSchema.safeParse(json);
  if (!parsed.success || !parsed.data.success) {
    throw new Error("data.gov.il datastore_search: unexpected response shape");
  }

  return parsed.data.result.records
    .filter((rec) => isCommunityRelevantCity(rec.LamasName))
    .map((rec) => {
      const city = rec.LamasName ?? "";
      const neighborhood = rec.Neighborhood ? ` – ${rec.Neighborhood}` : "";
      const status = rec.LotteryStatusValue ?? "עדכון סטטוס";
      const title = `מחיר למשתכן: ${status} ב${city}${neighborhood}`;
      const excerptParts = [
        rec.LotteryHousingUnits ? `${rec.LotteryHousingUnits} יח"ד` : null,
        rec.PriceForMeter ? `מחיר למ"ר: ${rec.PriceForMeter}` : null,
        rec.MarketingMethodDesc ?? null,
      ].filter((part): part is string => Boolean(part));

      return {
        title,
        // No stable per-row public URL from the API — use the package page
        // plus the row id as a stable, unique anchor for dedup purposes.
        sourceUrl: `https://data.gov.il/dataset/mechir-lamishtaken#row-${rec._id}`,
        publishedAt: rec.LotteryExecutionDate ?? null,
        rawExcerpt: excerptParts.length > 0 ? excerptParts.join(" | ") : title,
      } satisfies NormalizedNewsItem;
    });
}

// --- 2. Google News RSS — targeted queries ----------------------------------
// `news.google.com/rss/search?q=...&hl=iw&gl=IL&ceid=IL:iw`. Verified in
// research: 200 OK, valid RSS 2.0, 50+ relevant results for the first query.
// Links returned are Google redirect URLs, not direct source URLs — kept
// as-is here (resolving them is a triage-stage concern per ADR-019 §2,
// "dedup against sourceUrl" only needs a *stable* URL, which the redirect
// URL is).

const GOOGLE_NEWS_QUERIES = [
  "יוצאי אתיופיה דיור",
  "יוצאי אתיופיה משכנתא",
  "יוצאי אתיופיה זכויות",
] as const;

function googleNewsRssUrl(query: string): string {
  const params = new URLSearchParams({
    q: query,
    hl: "iw",
    gl: "IL",
    ceid: "IL:iw",
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

// --- 3. Walla RSS — secondary/diversity source ------------------------------
// https://rss.walla.co.il/feed/1 (general news), /feed/2 (business). Verified
// 200 OK in research; no Ethiopian-Israeli-specific feed exists, so this is
// kept broad and filtered downstream by the routine's triage stage.

const WALLA_FEEDS = [
  { id: "walla-general", name: "וואלה! חדשות", url: "https://rss.walla.co.il/feed/1" },
  { id: "walla-business", name: "וואלה! כלכלה", url: "https://rss.walla.co.il/feed/2" },
] as const;

// --- Minimal dependency-free RSS 2.0 <item> extractor -----------------------
// No RSS parser lib is in package.json (cost/dependency discipline per
// CLAUDE.md) and these feeds are plain RSS 2.0, so a small regex-based
// extractor is enough for MVP. This is intentionally not a general XML
// parser — it only pulls the four fields this pipeline needs, and falls
// back gracefully (empty array) rather than throwing on a feed shape it
// doesn't recognize, since Google News / Walla could change markup without
// notice and a hard failure here shouldn't crash the whole run.

function decodeXmlEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function extractTag(itemXml: string, tag: string): string | null {
  const match = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  const captured = match?.[1];
  return captured !== undefined ? decodeXmlEntities(captured) : null;
}

function parseRssItems(xml: string): NormalizedNewsItem[] {
  const itemMatches = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const items: NormalizedNewsItem[] = [];

  for (const itemXml of itemMatches) {
    const title = extractTag(itemXml, "title");
    const link = extractTag(itemXml, "link");
    if (!title || !link) continue; // skip malformed entries rather than throw

    const pubDate = extractTag(itemXml, "pubDate");
    const description = extractTag(itemXml, "description") ?? title;

    items.push({
      title,
      sourceUrl: link,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
      rawExcerpt: description,
    });
  }

  return items;
}

async function fetchRss(url: string): Promise<NormalizedNewsItem[]> {
  const res = await fetch(url, {
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
  });
  if (!res.ok) {
    throw new Error(`RSS fetch failed for ${url}: HTTP ${res.status}`);
  }
  const xml = await res.text();
  return parseRssItems(xml);
}

// --- Registry ----------------------------------------------------------------

export const NEWS_AUTOPILOT_SOURCES: NewsSourceConfig[] = [
  {
    id: "data-gov-il-mechir-lamishtaken",
    name: "data.gov.il — מחיר למשתכן",
    kind: "json-api",
    url: MECHIR_LAMISHTAKEN_URL,
    fetchAndNormalize: fetchMechirLamishtaken,
  },
  ...GOOGLE_NEWS_QUERIES.map(
    (query, i): NewsSourceConfig => ({
      id: `google-news-rss-${i + 1}`,
      name: `Google News RSS — "${query}"`,
      kind: "rss",
      url: googleNewsRssUrl(query),
      fetchAndNormalize: () => fetchRss(googleNewsRssUrl(query)),
    }),
  ),
  ...WALLA_FEEDS.map(
    (feed): NewsSourceConfig => ({
      id: feed.id,
      name: feed.name,
      kind: "rss",
      url: feed.url,
      fetchAndNormalize: () => fetchRss(feed.url),
    }),
  ),
];

// --- Fetch-all + dedup helper ------------------------------------------------
// Fetches every configured source, tags each result with its source config,
// and dedups by `sourceUrl` (first occurrence wins). A single source
// throwing (e.g. one RSS feed temporarily down) does not fail the whole
// batch — per ADR-019 §3 the routine still needs whatever the other sources
// returned. Callers that need per-source error visibility should inspect
// `NewsAutopilotFetchResult.errors`.

export interface NewsAutopilotFetchResult {
  items: Array<NormalizedNewsItem & { sourceId: string; sourceName: string }>;
  errors: Array<{ sourceId: string; message: string }>;
}

export async function fetchAllNewsAutopilotSources(): Promise<NewsAutopilotFetchResult> {
  // Each settled entry carries its own `source` regardless of fulfilled vs.
  // rejected, so neither branch needs to look the source back up by index
  // (fragile under `noUncheckedIndexedAccess`, and just riskier in general).
  const settled = await Promise.allSettled(
    NEWS_AUTOPILOT_SOURCES.map(async (source) => {
      try {
        return { source, items: await source.fetchAndNormalize() };
      } catch (err) {
        throw { source, err };
      }
    }),
  );

  const seenUrls = new Set<string>();
  const items: NewsAutopilotFetchResult["items"] = [];
  const errors: NewsAutopilotFetchResult["errors"] = [];

  for (const outcome of settled) {
    if (outcome.status === "rejected") {
      const { source, err } = outcome.reason as {
        source: NewsSourceConfig;
        err: unknown;
      };
      errors.push({
        sourceId: source.id,
        message: err instanceof Error ? err.message : String(err),
      });
      continue;
    }
    const { source, items: sourceItems } = outcome.value;
    for (const item of sourceItems) {
      if (seenUrls.has(item.sourceUrl)) continue;
      seenUrls.add(item.sourceUrl);
      items.push({ ...item, sourceId: source.id, sourceName: source.name });
    }
  }

  return { items, errors };
}
