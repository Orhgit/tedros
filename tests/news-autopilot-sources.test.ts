// News autopilot source registry tests (TED-114 / ADR-016 §2).
//
// Covers: normalizing the CKAN "מחיר למשתכן" JSON response (incl. filtering
// to community-relevant cities), normalizing RSS into NormalizedNewsItem[],
// a single source's fetch failure not failing the whole batch (Promise.
// allSettled resilience), a source returning a non-RSS/malformed body not
// throwing, and cross-source dedup by sourceUrl (first occurrence wins).
//
// `global.fetch` is stubbed with a call-order-based mock: `fetchAllNewsAutopilotSources`
// iterates `NEWS_AUTOPILOT_SOURCES` with `Array#map`, and each source's
// `fetchAndNormalize()` calls `fetch()` synchronously as the first thing it
// does — so fetch calls land in strict registry order (CKAN, then the 3
// Google News RSS queries, then the 2 Walla feeds), which this test relies
// on instead of trying to pattern-match Hebrew query strings inside
// percent-encoded URLs.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  fetchAllNewsAutopilotSources,
  NEWS_AUTOPILOT_SOURCES,
} from "../app/lib/news/autopilot/sources.server";

function rssFeed(
  items: Array<{ title: string; link: string; pubDate?: string; description?: string }>,
): string {
  const itemsXml = items
    .map(
      (i) => `
    <item>
      <title><![CDATA[${i.title}]]></title>
      <link>${i.link}</link>
      ${i.pubDate ? `<pubDate>${i.pubDate}</pubDate>` : ""}
      <description><![CDATA[${i.description ?? i.title}]]></description>
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0"?><rss version="2.0"><channel>${itemsXml}</channel></rss>`;
}

function ckanResponse() {
  return JSON.stringify({
    success: true,
    result: {
      records: [
        {
          _id: 1,
          LamasName: "נתניה",
          Neighborhood: "רמת פולג",
          LotteryStatusValue: "פורסמו תוצאות",
          LotteryExecutionDate: "2026-08-01",
          LotteryHousingUnits: 120,
          PriceForMeter: 14000,
          MarketingMethodDesc: "מחיר למשתכן",
        },
        {
          // Not in COMMUNITY_RELEVANT_CITIES — must be filtered out.
          _id: 2,
          LamasName: "תל אביב",
          LotteryStatusValue: "בתהליך",
        },
      ],
    },
  });
}

describe("fetchAllNewsAutopilotSources", () => {
  let callIndex: number;

  beforeEach(() => {
    callIndex = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        const idx = callIndex++;
        switch (idx) {
          case 0: // data-gov-il-mechir-lamishtaken
            return new Response(ckanResponse(), { status: 200 });
          case 1: // google-news-rss-1 ("יוצאי אתיופיה דיור")
            return new Response(
              rssFeed([
                {
                  title: "כתבה על דיור",
                  link: "https://news.example/a1",
                  pubDate: "Mon, 01 Jan 2026 00:00:00 GMT",
                },
              ]),
              { status: 200 },
            );
          case 2: // google-news-rss-2 ("יוצאי אתיופיה משכנתא") — simulate an outage
            return new Response("", { status: 500 });
          case 3: // google-news-rss-3 ("יוצאי אתיופיה זכויות")
            return new Response(
              rssFeed([{ title: "כתבה על זכויות", link: "https://news.example/a3" }]),
              { status: 200 },
            );
          case 4: // walla-general — one duplicate of a1, one new item
            return new Response(
              rssFeed([
                { title: "אותה כתבה, מקור שני", link: "https://news.example/a1" },
                { title: "כתבה נוספת מוואלה", link: "https://walla.example/b1" },
              ]),
              { status: 200 },
            );
          case 5: // walla-business — malformed body (no <item> tags), must not throw
            return new Response("<html>not an rss feed</html>", { status: 200 });
          default:
            return new Response("", { status: 404 });
        }
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("has the expected registry shape (1 CKAN + 3 Google News RSS + 2 Walla)", () => {
    expect(NEWS_AUTOPILOT_SOURCES).toHaveLength(6);
    expect(NEWS_AUTOPILOT_SOURCES.map((s) => s.id)).toEqual([
      "data-gov-il-mechir-lamishtaken",
      "google-news-rss-1",
      "google-news-rss-2",
      "google-news-rss-3",
      "walla-general",
      "walla-business",
    ]);
  });

  it("normalizes the CKAN response and filters to community-relevant cities", async () => {
    const { items } = await fetchAllNewsAutopilotSources();
    const ckanItems = items.filter((i) => i.sourceId === "data-gov-il-mechir-lamishtaken");
    expect(ckanItems).toHaveLength(1);
    expect(ckanItems[0]!.title).toContain("נתניה");
    expect(ckanItems[0]!.title).not.toContain("תל אביב");
    expect(ckanItems[0]!.sourceUrl).toBe("https://data.gov.il/dataset/mechir-lamishtaken#row-1");
    expect(ckanItems[0]!.rawExcerpt).toContain("14000");
  });

  it("does not fail the whole batch when one source's fetch fails", async () => {
    const { errors, items } = await fetchAllNewsAutopilotSources();
    expect(errors).toHaveLength(1);
    expect(errors[0]!.sourceId).toBe("google-news-rss-2");
    expect(errors[0]!.message).toMatch(/HTTP 500/);

    // The other two Google News RSS sources still contributed items.
    expect(items.some((i) => i.sourceId === "google-news-rss-1")).toBe(true);
    expect(items.some((i) => i.sourceId === "google-news-rss-3")).toBe(true);
  });

  it("gracefully returns zero items (not a crash) for a malformed/non-RSS body", async () => {
    const { items, errors } = await fetchAllNewsAutopilotSources();
    expect(items.some((i) => i.sourceId === "walla-business")).toBe(false);
    // A 200 OK with unparsable content is not a fetch/HTTP error.
    expect(errors.some((e) => e.sourceId === "walla-business")).toBe(false);
  });

  it("dedups by sourceUrl across sources, first occurrence wins", async () => {
    const { items } = await fetchAllNewsAutopilotSources();
    const dupUrlItems = items.filter((i) => i.sourceUrl === "https://news.example/a1");
    expect(dupUrlItems).toHaveLength(1);
    // First occurrence in registry order is google-news-rss-1, not walla-general.
    expect(dupUrlItems[0]!.sourceId).toBe("google-news-rss-1");
    expect(dupUrlItems[0]!.title).toBe("כתבה על דיור");
  });

  it("still includes the non-duplicate Walla item", async () => {
    const { items } = await fetchAllNewsAutopilotSources();
    const item = items.find((i) => i.sourceUrl === "https://walla.example/b1");
    expect(item).toBeDefined();
    expect(item!.sourceId).toBe("walla-general");
  });
});
