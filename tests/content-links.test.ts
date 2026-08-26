// CI guard for internal markdown links inside content registry bodies (TED-123).
//
// A QA audit found dozens of internal links (`[text](/he/...)`) in template-literal
// markdown bodies pointing at pages that 404. This test extracts every internal
// markdown link from all content registries and asserts it resolves to either:
//   - a static route derived from `app/routes/$lang.*.tsx` filenames, or
//   - a dynamic detail path built from the real slug registries (rights, orgs,
//     glossary, scholarships, news, careers, heritage, cities, programs, ...).
//
// On failure it lists every offending link with the registry it came from.

import { readdirSync } from "node:fs";
import { resolve } from "node:path";

import { beforeAll, describe, expect, it } from "vitest";

beforeAll(() => {
  process.env.NODE_ENV = "test";
  process.env.PORT = process.env.PORT ?? "3000";
  process.env.PUBLIC_URL = process.env.PUBLIC_URL ?? "https://tedros.co.il";
  process.env.DATABASE_URL =
    process.env.DATABASE_URL ??
    "postgres://tedros:tedros_test@localhost:5432/tedros_test";
  process.env.AUTH_SECRET = process.env.AUTH_SECRET ?? "x".repeat(32);
  process.env.AUTH_TRUST_HOST = process.env.AUTH_TRUST_HOST ?? "true";
  process.env.EMAIL_FROM = process.env.EMAIL_FROM ?? "no-reply@tedros.local";
});

// ---------------------------------------------------------------------------
// Link sources — every registry whose bodies may contain internal markdown links.
// ---------------------------------------------------------------------------

import { BOOTCAMPS } from "../app/lib/careers/bootcamps.server";
import { CAREER_TRACKS } from "../app/lib/careers/careers.server";
import { FAQS } from "../app/lib/careers/faqs.server";
import { JOBS } from "../app/lib/careers/jobs.server";
import { isRelevant as isCareerCellRelevant } from "../app/lib/careers/relevance";
import { STORIES } from "../app/lib/careers/stories.server";
import { CITIES } from "../app/lib/cities/registry";
import { COMPARISONS } from "../app/lib/comparisons/comparisons.server";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { isScholarshipCellRelevant } from "../app/lib/education/scholarship-relevance";
import { ALL_SCHOLARSHIPS } from "../app/lib/education/scholarships.server";
import { EDUCATION_TRACKS } from "../app/lib/education/tracks";
import { FAMILY_TOPICS } from "../app/lib/family/topics.server";
import { GLOSSARY } from "../app/lib/glossary/glossary.server";
import { CONDITIONS } from "../app/lib/health/conditions.server";
import { HERITAGE_EVENTS } from "../app/lib/heritage/events.server";
import { isRelevant as isHeritageCellRelevant } from "../app/lib/heritage/relevance";
import { ARTICLES } from "../app/lib/news/articles.server";
import { ALL_NEWS_TAGS } from "../app/lib/news/categories";
import { ORGS } from "../app/lib/orgs/orgs.server";
import { PROFESSIONALS } from "../app/lib/professionals/professionals.server";
import { PROGRAMS } from "../app/lib/programs/programs.server";
import { isRelevant as isRightCellRelevant } from "../app/lib/rights/relevance";
import { STAT_TOPICS } from "../app/lib/statistics/topics.server";
import {
  URBAN_RENEWAL_NEIGHBORHOODS,
  neighborhoodsByCity,
} from "../app/lib/urban-renewal/registry";

/** Registries scanned for internal markdown links, keyed by a human label. */
const LINK_SOURCES: Record<string, unknown> = {
  "news/articles.server (all waves)": ARTICLES,
  "education/scholarships.server (all waves)": ALL_SCHOLARSHIPS,
  "orgs/orgs.server": ORGS,
  "glossary/glossary.server (all waves)": GLOSSARY,
  "heritage/events.server": HERITAGE_EVENTS,
  "db/seeds/rights": PRIORITY_RIGHTS,
  "family/topics.server": FAMILY_TOPICS,
  "careers/faqs.server": FAQS,
  "careers/stories.server": STORIES,
  "careers/bootcamps.server": BOOTCAMPS,
  "careers/careers.server": CAREER_TRACKS,
  "careers/jobs.server": JOBS,
  "comparisons/comparisons.server": COMPARISONS,
  "professionals/professionals.server": PROFESSIONALS,
  "health/conditions.server": CONDITIONS,
  "programs/programs.server": PROGRAMS,
  "statistics/topics.server": STAT_TOPICS,
};

// ---------------------------------------------------------------------------
// Link extraction
// ---------------------------------------------------------------------------

/** Matches `](/he/...)`, `](/en/...)`, `](/am/...)` markdown link targets. */
const INTERNAL_LINK_RE = /\]\((\/(?:he|en|am)\/[^)\s"\\]+)\)/g;

interface FoundLink {
  source: string;
  href: string;
  /** Locale-stripped, anchor/query-stripped, no trailing slash. */
  path: string;
}

function normalize(href: string): string {
  let path = href.replace(/^\/(he|en|am)(?=\/|$)/, "");
  path = path.replace(/[#?].*$/, "");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path === "" ? "/" : path;
}

function collectLinks(): FoundLink[] {
  const out: FoundLink[] = [];
  for (const [source, registry] of Object.entries(LINK_SOURCES)) {
    const blob = JSON.stringify(registry);
    for (const match of blob.matchAll(INTERNAL_LINK_RE)) {
      const href = match[1] as string;
      out.push({ source, href, path: normalize(href) });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Valid targets — static routes derived from filenames
// ---------------------------------------------------------------------------

// jsdom gives import.meta.url an http scheme — resolve from the repo root
// (vitest runs with cwd at the repo root).
const routesDir = resolve(process.cwd(), "app/routes");

function staticRoutePaths(): Set<string> {
  const out = new Set<string>(["/"]);
  for (const file of readdirSync(routesDir)) {
    const m = /^\$lang\.(.+)\.tsx$/.exec(file);
    if (!m) continue;
    const name = m[1] as string;
    if (name.includes("[.]")) continue; // resource routes (rss/csv/txt/html)
    const segments = name.split(".");
    if (segments.some((s) => s.startsWith("$"))) continue; // dynamic — handled below
    if (segments[segments.length - 1] === "_index") segments.pop();
    if (segments.length === 0) continue; // `$lang._index` → "/" (already added)
    out.add("/" + segments.join("/"));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Valid targets — dynamic detail paths built from the real slug registries
// ---------------------------------------------------------------------------

function dynamicPaths(): Set<string> {
  const out = new Set<string>();
  const citySlugs = CITIES.map((c) => c.slug);

  // /rights/<slug> (+ per-city cells where the right is relevant).
  // Slugs are Latin kebab-case in every locale; the route matches any locale
  // variant, so every variant is a valid detail path.
  for (const right of PRIORITY_RIGHTS) {
    const variants = new Set(
      [right.slug.he, right.slug.en, right.slug.am].filter(Boolean),
    );
    for (const slug of variants) {
      out.add(`/rights/${slug}`);
      for (const city of citySlugs) {
        if (isRightCellRelevant(right.slug.he, city)) {
          out.add(`/rights/${slug}/${city}`);
        }
      }
    }
  }

  for (const entry of GLOSSARY) out.add(`/glossary/${entry.slug}`);
  for (const org of ORGS) out.add(`/orgs/${org.slug}`);

  for (const sch of ALL_SCHOLARSHIPS) {
    out.add(`/education/scholarships/${sch.slug}`);
    for (const city of citySlugs) {
      if (isScholarshipCellRelevant(city)) {
        out.add(`/education/scholarships/${sch.slug}/${city}`);
      }
    }
  }

  for (const track of EDUCATION_TRACKS) out.add(`/education/tracks/${track}`);

  for (const track of CAREER_TRACKS) {
    out.add(`/careers/${track.slug}`);
    for (const city of citySlugs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isCareerCellRelevant(track.slug as any, city)) {
        out.add(`/careers/${track.slug}/${city}`);
      }
    }
  }
  for (const b of BOOTCAMPS) out.add(`/careers/programs/${b.slug}`);
  for (const j of JOBS) out.add(`/careers/jobs/${j.slug}`);
  for (const f of FAQS) out.add(`/careers/faq/${f.slug}`);
  for (const s of STORIES) out.add(`/careers/stories/${s.slug}`);

  for (const a of ARTICLES) out.add(`/news/${a.slug}`);
  for (const tag of ALL_NEWS_TAGS) out.add(`/news/tag/${tag}`);

  for (const ev of HERITAGE_EVENTS) {
    out.add(`/heritage/events/${ev.slug}`);
    for (const city of citySlugs) {
      if (isHeritageCellRelevant(ev.slug, city)) {
        out.add(`/heritage/events/${ev.slug}/${city}`);
      }
    }
  }

  for (const city of citySlugs) {
    out.add(`/cities/${city}`);
    // The per-city urban-renewal overview 404s when no neighborhoods are
    // registered for the city (anti-doorway) — mirror that.
    if (neighborhoodsByCity(city).length > 0) {
      out.add(`/cities/${city}/urban-renewal`);
    }
  }

  for (const c of COMPARISONS) out.add(`/compare/${c.slug}`);
  for (const p of PROGRAMS) out.add(`/programs/${p.slug}`);
  for (const t of STAT_TOPICS) out.add(`/statistics/${t.slug}`);
  for (const c of CONDITIONS) out.add(`/health/conditions/${c.slug}`);
  for (const n of URBAN_RENEWAL_NEIGHBORHOODS) out.add(`/urban-renewal/${n.slug}`);

  for (const p of PROFESSIONALS) {
    out.add(`/professionals/${p.profession}`);
    out.add(`/professionals/profile/${p.slug}`);
    // The (profession × city) page 404s when no slot exists for the pair —
    // only pairs actually present in the registry are valid.
    out.add(`/professionals/${p.profession}/${p.citySlug}`);
  }

  return out;
}

// ---------------------------------------------------------------------------
// The guard
// ---------------------------------------------------------------------------

describe("content registries — internal markdown links", () => {
  const links = collectLinks();
  const staticPaths = staticRoutePaths();
  const dynamic = dynamicPaths();

  it("finds a meaningful number of internal links (extraction sanity)", () => {
    // If this drops to ~0 the regex or the registries changed shape and the
    // guard is silently blind — fail loudly instead.
    expect(links.length).toBeGreaterThan(300);
  });

  it("derives the expected static section routes (route-scan sanity)", () => {
    for (const p of ["/rights", "/glossary", "/orgs", "/news", "/careers", "/about"]) {
      expect(staticPaths.has(p), `expected static route ${p}`).toBe(true);
    }
  });

  it("every internal markdown link resolves to an existing page", () => {
    const broken = links
      .filter((l) => !staticPaths.has(l.path) && !dynamic.has(l.path))
      .map((l) => `${l.source} → ${l.href}`);
    // Deduplicate for a readable failure report, keep counts visible.
    const counted = new Map<string, number>();
    for (const b of broken) counted.set(b, (counted.get(b) ?? 0) + 1);
    const report = [...counted.entries()]
      .map(([k, n]) => (n > 1 ? `${k} (x${n})` : k))
      .sort();
    expect(report).toEqual([]);
  });
});
