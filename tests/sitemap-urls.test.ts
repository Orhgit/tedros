// TED-172 — sitemap composition guard.
//
// A URL must never be both 301'd and submitted for indexing, so the four
// consolidated city-matrix templates have to be absent from every sitemap, and
// the four templates the audit told us to keep have to still be present. The
// per-sitemap URL counts are asserted so a future change that re-inflates the
// matrix by thousands of URLs cannot land quietly.
//
// TED-176 retired `sitemap-listings.xml` entirely: 537 syndicated listing URLs
// that earned 24 impressions and zero clicks in their whole lifetime. The index
// test below asserts it stays gone.

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

import { CITIES } from "../app/lib/cities/registry";
import { loader as careersSitemap } from "../app/routes/sitemap-careers[.]xml";
import { loader as contentSitemap } from "../app/routes/sitemap-content[.]xml";
import { loader as coreSitemap } from "../app/routes/sitemap-core[.]xml";
import { loader as healthSitemap } from "../app/routes/sitemap-health[.]xml";
import { loader as newsSitemap } from "../app/routes/sitemap-news[.]xml";
import { loader as rightsSitemap } from "../app/routes/sitemap-rights[.]xml";

const SITEMAPS = {
  core: coreSitemap,
  rights: rightsSitemap,
  careers: careersSitemap,
  health: healthSitemap,
  content: contentSitemap,
  news: newsSitemap,
} as const;

// All-locale URL count per static sitemap, measured on this branch. Each path
// is emitted once per locale (he/en/am), so every number is divisible by 3.
const EXPECTED_URLS: Record<keyof typeof SITEMAPS, number> = {
  // 282 -> 279: /privacy dropped (TED-173). It was noindex-worthy and ranked
  // above the homepage for `tedros.co.il`; a noindex page must not be submitted.
  core: 279,
  rights: 213,
  // TED-187: 147 -> 117. The ten careers/stories detail pages are noindex
  // (composite illustrations, zero impressions in the six weeks to 8.11.2026),
  // so they are no longer submitted. /careers/stories itself stays.
  // TED-187 phase 2: 117 -> 63. The 18 one-question /careers/faq/* pages are
  // noindex — each is rendered in full on /careers/faq, so none held content
  // of its own. The hub stays.
  careers: 63,
  // TED-187 phase 2: 147 -> 27. The 40 health condition pages are noindex.
  // Withdrawn on expertise, not emptiness: YMYL medical content with no
  // clinician behind it. /health/conditions itself stays.
  health: 27,
  // TED-169 took this to 687 (+9: the three Sigd season routes, 3 locales each).
  // TED-168: -18 (six scholarships retired, 3 locales each)
  //          +15 (the guides index + four application guides, 3 locales each)
  // TED-187: 684 -> 594. The 30 anonymous professional slots are noindex —
  // they describe a *type* of professional and have nobody behind them — so
  // they are no longer submitted. The 5 slots with a real named professional
  // stay, which is why this is -90 and not -105.
  // TED-187 phase 2: 594 -> 507. 29 of the 33 profession x city cells hold
  // nothing but anonymous slots and are withdrawn (-87). The 4 cells that
  // hold a real named professional stay, which is why this is -87 and not -99.
  content: 507,
  // TED-171: +18 (wave 12 — six news articles, 3 locales each).
  // TED-187 phase 2: 522 -> 483. The 13 /news/tag/* archives are noindex:
  // filtered views of /news holding no writing of their own. The articles
  // stay — they carry 29 of the site's 34 clicks.
  news: 483,
};

async function locsOf(name: keyof typeof SITEMAPS): Promise<string[]> {
  const res = SITEMAPS[name]() as Response;
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? "");
}

const CITY_SLUGS = new Set(CITIES.map((c) => c.slug));

// A "city cell" is `<template>/<city-slug>` — matched against the real city
// registry so sibling paths like /careers/programs/<slug> are not mistaken for
// one.
function cityCellsUnder(locs: string[], prefix: string): string[] {
  return locs.filter((l) => {
    const m = new RegExp(`/(?:he|en|am)${prefix}/([^/]+)/([^/]+)$`).exec(l);
    return m !== null && CITY_SLUGS.has(m[2] ?? "");
  });
}

async function allLocs(): Promise<string[]> {
  const out: string[] = [];
  for (const name of Object.keys(SITEMAPS) as Array<keyof typeof SITEMAPS>) {
    out.push(...(await locsOf(name)));
  }
  return out;
}

describe("sitemap URL counts", () => {
  it("matches the expected per-sitemap totals", async () => {
    for (const name of Object.keys(SITEMAPS) as Array<keyof typeof SITEMAPS>) {
      const locs = await locsOf(name);
      expect(locs.length, `sitemap-${name}.xml`).toBe(EXPECTED_URLS[name]);
      expect(locs.length % 3, `sitemap-${name}.xml is not 3 locales wide`).toBe(0);
    }
  });

  it("emits every path in he, en and am", async () => {
    const locs = await allLocs();
    const byLocale = { he: 0, en: 0, am: 0 };
    for (const loc of locs) {
      const m = /^https?:\/\/[^/]+\/(he|en|am)(\/|$)/.exec(loc);
      expect(m, loc).not.toBeNull();
      byLocale[m![1] as keyof typeof byLocale] += 1;
    }
    expect(byLocale.he).toBe(byLocale.en);
    expect(byLocale.he).toBe(byLocale.am);
  });

  it("lists no URL twice", async () => {
    const locs = await allLocs();
    expect(new Set(locs).size).toBe(locs.length);
  });
});

// TED-173: /privacy was submitted in sitemap-core while being the kind of page
// that should never compete for the site's own name — and a live SERP check
// for `tedros.co.il` put /he/privacy at #2, above the homepage at #4.
// Submitting a page tells Google it matters; these pages do not.
describe("routes that must never be submitted (TED-173)", () => {
  const NEVER_SUBMIT = [
    "/privacy",
    "/terms",
    "/design",
    "/login",
    "/dashboard",
    "/agency",
    "/calculator/mortgage",
    "/professionals/join",
    "/heritage/wedding/join",
  ];

  it.each(NEVER_SUBMIT)("does not publish %s", async (path) => {
    const locs = await allLocs();
    const offenders = locs.filter((loc) => {
      const p = new URL(loc).pathname.replace(/^\/(he|en|am)/, "");
      return p === path;
    });
    expect(offenders).toEqual([]);
  });
});

describe("consolidated city cells are absent from every sitemap (TED-172)", () => {
  it("publishes no rights × city cell", async () => {
    const locs = await allLocs();
    expect(cityCellsUnder(locs, "/rights")).toEqual([]);
  });

  it("publishes no scholarship × city cell", async () => {
    const locs = await allLocs();
    expect(cityCellsUnder(locs, "/education/scholarships")).toEqual([]);
  });

  it("publishes no event × city cell", async () => {
    const locs = await allLocs();
    expect(cityCellsUnder(locs, "/heritage/events")).toEqual([]);
  });

  it("publishes no wedding supplier × city cell", async () => {
    const locs = await allLocs();
    expect(cityCellsUnder(locs, "/heritage/wedding/suppliers")).toEqual([]);
  });

  it("publishes no career × city cell (TED-132, still off)", async () => {
    const locs = await allLocs();
    expect(cityCellsUnder(locs, "/careers")).toEqual([]);
  });
});

describe("the city templates the audit told us to keep are still published", () => {
  it("keeps the 4 staffed professionals × city cells, 31 kessim, 8 culinary, 39 city hubs", async () => {
    const locs = await allLocs();
    const count = (re: RegExp) => locs.filter((l) => re.test(l)).length / 3;

    // TED-187 phase 2: was 33. The audit kept all 33 cells on the grounds that
    // they were the main SEO surface; 29 of them turned out to list nothing
    // but anonymous slots. Only the 4 with a real named professional are
    // submitted now. `noindex-programmatic-phase2.test.ts` names them.
    expect(cityCellsUnder(locs, "/professionals").length / 3).toBe(4);
    expect(count(/\/heritage\/kessim\/[^/]+$/)).toBe(31);
    expect(count(/\/culinary\/shopping\/[^/]+$/)).toBe(8);
    expect(count(/\/cities\/[^/]+$/)).toBe(39);
  });

  it("keeps the pillar pages the cells now redirect to", async () => {
    const locs = await allLocs();
    const has = (path: string) => locs.includes(`https://tedros.co.il/he${path}`);

    expect(has("/rights/mashkanta-guide-ethiopians")).toBe(true);
    expect(has("/rights/urban-renewal-netanya")).toBe(true);
    expect(has("/heritage/events/sigd")).toBe(true);
    // TED-169 — the Sigd season siblings. Not city cells: three distinct
    // pages. `/heritage/sigd` itself 301s to the guide and must stay out.
    expect(has("/heritage/sigd/events-2026")).toBe(true);
    expect(has("/heritage/sigd/schools")).toBe(true);
    expect(has("/heritage/sigd/guests")).toBe(true);
    expect(has("/heritage/sigd")).toBe(false);
    expect(has("/heritage/wedding/suppliers/catering")).toBe(true);
    expect(has("/education/scholarships/isef-fellowship")).toBe(true);
  });
});

// TED-176: the listings sitemap published 537 syndicated copies of
// merkaz-h.co.il pages. Over their whole lifetime they earned 24 impressions
// and zero clicks while making up a fifth of everything we asked Google to
// index. The sub-sitemap is gone and the index must not advertise it.
describe("the retired listings sitemap (TED-176)", () => {
  it("is not referenced by the sitemap index", async () => {
    const { loader } = await import("../app/routes/sitemap[.]xml");
    const xml = await (loader() as Response).text();
    expect(xml).not.toContain("sitemap-listings.xml");
  });

  it("still advertises every sub-sitemap that remains", async () => {
    const { loader } = await import("../app/routes/sitemap[.]xml");
    const xml = await (loader() as Response).text();
    for (const name of ["core", "rights", "careers", "health", "content", "news"]) {
      expect(xml, name).toContain(`sitemap-${name}.xml`);
    }
  });
});
