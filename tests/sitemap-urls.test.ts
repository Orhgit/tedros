// TED-172 — sitemap composition guard.
//
// A URL must never be both 301'd and submitted for indexing, so the four
// consolidated city-matrix templates have to be absent from every sitemap, and
// the four templates the audit told us to keep have to still be present. The
// per-sitemap URL counts are asserted so a future change that re-inflates the
// matrix by thousands of URLs cannot land quietly.
//
// `sitemap-listings.xml` is DB-backed and is excluded here; it is covered by
// the listings tests.

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
  core: 282,
  rights: 213,
  careers: 147,
  health: 147,
  // TED-168: 678 - 18 (six scholarships retired, 3 locales each)
  //          + 15 (the guides index + four application guides, 3 locales each)
  content: 675,
  news: 504,
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
  it("keeps the 33 professionals × city cells, 31 kessim, 8 culinary, 39 city hubs", async () => {
    const locs = await allLocs();
    const count = (re: RegExp) => locs.filter((l) => re.test(l)).length / 3;

    expect(cityCellsUnder(locs, "/professionals").length / 3).toBe(33);
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
    expect(has("/heritage/wedding/suppliers/catering")).toBe(true);
    expect(has("/education/scholarships/isef-fellowship")).toBe(true);
  });
});
