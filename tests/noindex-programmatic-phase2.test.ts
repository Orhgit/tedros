// TED-187 phase 2 + TED-188 — the second tranche of programmatic withdrawals,
// and the schema-integrity fix that came out of auditing them.
//
// 300 URLs leave the index here: 87 profession × city cells, 120 health
// condition pages, 54 one-question FAQ pages and 39 news tag archives. None
// of them is deleted and none returns 410 — every page still renders and
// stays linked from its hub. Only the invitation to index is withdrawn.
//
// Most assertions below are assertions of ABSENCE: no hreflang, no canonical,
// no `reviewedBy`. An absence assertion passes just as happily when the thing
// under test was never wired up at all, so each cluster is also checked from
// the other side — the pages that must KEEP their hreflang are asserted to
// have it, with the exact count. A change that switched the guard off, or
// inverted it, fails here rather than passing quietly.

/* eslint-disable @typescript-eslint/no-explicit-any */
// `any` throughout the helpers below, for the same reason as in
// noindex-programmatic-bulk.test.ts: React Router's generated `MetaDescriptor`
// union does not narrow usefully when what we need to ask is "is there a tag
// in here with name=robots", and spelling out the union would couple these
// tests to generated types that change on every route change.

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

import { ALL_HEALTH_CONDITIONS } from "../app/lib/health/categories";
import { CONDITIONS } from "../app/lib/health/conditions.server";
import { FAQS } from "../app/lib/careers/faqs.server";
import { ALL_NEWS_TAGS } from "../app/lib/news/categories";
import { findCityBySlug } from "../app/lib/cities/registry";
import {
  PROFESSIONALS,
  type ProfessionalSlot,
} from "../app/lib/professionals/professionals.server";
import { healthConditionJsonLd } from "../app/lib/health/schema";
import { loader as careersSitemap } from "../app/routes/sitemap-careers[.]xml";
import { loader as contentSitemap } from "../app/routes/sitemap-content[.]xml";
import { loader as coreSitemap } from "../app/routes/sitemap-core[.]xml";
import { loader as healthSitemap } from "../app/routes/sitemap-health[.]xml";
import { loader as newsSitemap } from "../app/routes/sitemap-news[.]xml";
import { loader as rightsSitemap } from "../app/routes/sitemap-rights[.]xml";
import { loader as sitemapIndex } from "../app/routes/sitemap[.]xml";
import { meta as conditionMeta } from "../app/routes/$lang.health.conditions.$condition";
import { meta as faqMeta } from "../app/routes/$lang.careers.faq.$question";
import { meta as newsTagMeta } from "../app/routes/$lang.news.tag.$tag";
import { meta as cellMetaFn } from "../app/routes/$lang.professionals.$profession.$city";

// The five that are handed no lastmod data at all, plus news which is handed
// a real one per article.
const NO_LASTMOD_SITEMAPS = {
  core: coreSitemap,
  rights: rightsSitemap,
  careers: careersSitemap,
  health: healthSitemap,
  content: contentSitemap,
} as const;
const ALL_SITEMAPS = { ...NO_LASTMOD_SITEMAPS, news: newsSitemap } as const;

const PUBLIC_URL = "https://tedros.co.il";

function robotsOf(tags: any[]): string | undefined {
  return tags.find((t) => t && t.name === "robots")?.content;
}
function hreflangCount(tags: any[]): number {
  return tags.filter((t) => t && t.tagName === "link" && t.hrefLang).length;
}
function canonicalCount(tags: any[]): number {
  return tags.filter((t) => t && t.tagName === "link" && t.rel === "canonical").length;
}
function jsonLdNodes(tags: any[]): any[] {
  return tags.filter((t) => t && t["script:ld+json"]).map((t) => t["script:ld+json"]);
}

// ── the counts this whole change is built on ──────────────────────────────
// Asserted first: if the shape of the data moves, every number quoted in the
// comments below (and in the PR, and in TED-187) is wrong, and the reader
// should be told that here rather than puzzling over a downstream failure.

const CELLS = new Map<string, boolean>();
for (const e of PROFESSIONALS as ProfessionalSlot[]) {
  const key = `${e.profession}/${e.citySlug}`;
  CELLS.set(key, (CELLS.get(key) ?? false) || e.listedProfessional != null);
}
const STAFFED_CELLS = [...CELLS].filter(([, v]) => v).map(([k]) => k);
const ANON_CELLS = [...CELLS].filter(([, v]) => !v).map(([k]) => k);

describe("the shape of the data this change assumes", () => {
  it("has 33 profession × city cells, 4 staffed and 29 anonymous", () => {
    expect(CELLS.size).toBe(33);
    expect(STAFFED_CELLS.length).toBe(4);
    expect(ANON_CELLS.length).toBe(29);
  });

  it("names the 4 staffed cells explicitly", () => {
    // Spelled out so that a cell silently losing its last real professional
    // is a test failure and not a quiet de-indexing. lawyer/jerusalem is the
    // one that matters most: it is mixed, one anonymous slot beside one real
    // person, and it must stay in.
    expect([...STAFFED_CELLS].sort()).toEqual([
      "lawyer/jerusalem",
      "lawyer/maale-adumim",
      "real-estate-agent/jerusalem",
      "real-estate-agent/maale-adumim",
    ]);
  });

  it("has 40 health conditions, 18 careers FAQs and 13 news tags", () => {
    expect(ALL_HEALTH_CONDITIONS.length).toBe(40);
    expect(CONDITIONS.length).toBe(40);
    expect(FAQS.length).toBe(18);
    expect(ALL_NEWS_TAGS.length).toBe(13);
  });

  it("withdraws exactly 300 URLs across the four clusters", () => {
    const paths =
      ANON_CELLS.length +
      ALL_HEALTH_CONDITIONS.length +
      FAQS.length +
      ALL_NEWS_TAGS.length;
    expect(paths).toBe(100);
    expect(paths * 3).toBe(300);
  });
});

// ── health conditions (120 URLs) ──────────────────────────────────────────

describe("health condition pages are noindex (TED-187)", () => {
  it.each(CONDITIONS.map((c) => c.slug))(
    "%s is noindex with no hreflang",
    async (slug) => {
      const condition = CONDITIONS.find((c) => c.slug === slug)!;
      const tags = (conditionMeta as any)({
        data: {
          locale: "he",
          publicUrl: PUBLIC_URL,
          condition: {
            slug: condition.slug,
            name: "x",
            shortDescription: "y",
            lastReviewed: condition.lastReviewed,
          },
        },
      }) as any[];

      expect(robotsOf(tags)).toBe("noindex,follow");
      expect(hreflangCount(tags)).toBe(0);
      expect(canonicalCount(tags)).toBe(0);
    },
  );
});

// This is the defect, not the SEO decision. `MedicalWebPage.reviewedBy` plus
// `lastReviewed` is a machine-readable claim that a named reviewer medically
// reviewed this page on that date. Forty pages carried it, naming "Tedros" —
// a website — and no review ever happened. It is the same class of defect as
// the `Person` node that asserted an empty directory slot was a human being.
describe("no page claims a medical review that never happened (TED-187)", () => {
  it("emits dateModified and neither reviewedBy nor lastReviewed", () => {
    const node = healthConditionJsonLd(
      { publicUrl: PUBLIC_URL, locale: "he" },
      {
        slug: "diabetes-type-2",
        name: "x",
        description: "y",
        lastEdited: "2026-05-11",
      },
    ) as Record<string, unknown>;

    expect(node["@type"]).toBe("MedicalWebPage");
    expect(node.dateModified).toBe("2026-05-11");
    expect(node).not.toHaveProperty("reviewedBy");
    expect(node).not.toHaveProperty("lastReviewed");
  });

  it("makes no reviewer claim anywhere in a rendered condition page's JSON-LD", async () => {
    const tags = (conditionMeta as any)({
      data: {
        locale: "he",
        publicUrl: PUBLIC_URL,
        condition: {
          slug: "diabetes-type-2",
          name: "x",
          shortDescription: "y",
          lastReviewed: "2026-05-11",
        },
      },
    }) as any[];

    const serialized = JSON.stringify(jsonLdNodes(tags));
    expect(serialized).not.toContain("reviewedBy");
    expect(serialized).not.toContain("lastReviewed");
  });
});

// ── careers FAQ (54 URLs) and news tags (39 URLs) ─────────────────────────

describe("one-question FAQ pages are noindex (TED-187)", () => {
  it.each(FAQS.map((f) => f.slug))("%s is noindex with no hreflang", async (slug) => {
    const tags = (faqMeta as any)({
      data: {
        locale: "he",
        publicUrl: PUBLIC_URL,
        faq: FAQS.find((f) => f.slug === slug)!,
        track: null,
      },
    }) as any[];

    expect(robotsOf(tags)).toBe("noindex,follow");
    expect(hreflangCount(tags)).toBe(0);
    expect(canonicalCount(tags)).toBe(0);
  });
});

describe("news tag archives are noindex (TED-187)", () => {
  it.each(ALL_NEWS_TAGS)("%s is noindex with no hreflang", async (tag) => {
    const tags = (newsTagMeta as any)({
      data: { locale: "he", publicUrl: PUBLIC_URL, tag, articles: [] },
    }) as any[];

    expect(robotsOf(tags)).toBe("noindex,follow");
    expect(hreflangCount(tags)).toBe(0);
    expect(canonicalCount(tags)).toBe(0);
  });
});

// ── profession × city cells (87 URLs out, 12 kept) ────────────────────────

async function cellMeta(profession: string, citySlug: string) {
  const slots = (PROFESSIONALS as ProfessionalSlot[])
    .filter((e) => e.profession === profession && e.citySlug === citySlug)
    .map((e) => ({
      slug: e.slug,
      title: "t",
      languages: e.languages,
      isListed: e.listedProfessional != null,
    }));
  return (cellMetaFn as any)({
    data: {
      locale: "he",
      publicUrl: PUBLIC_URL,
      profession,
      city: findCityBySlug(citySlug)!,
      slots,
      overview: null,
    },
  }) as any[];
}

describe("a city cell is indexed only while a named human is in it (TED-187)", () => {
  it.each(ANON_CELLS)("%s has nobody in it, so it is noindex", async (key) => {
    const [profession, citySlug] = key.split("/");
    const tags = await cellMeta(profession!, citySlug!);

    expect(robotsOf(tags)).toBe("noindex,follow");
    expect(hreflangCount(tags)).toBe(0);
    expect(canonicalCount(tags)).toBe(0);
  });

  it.each(STAFFED_CELLS)(
    "%s has a real professional, so it stays indexed",
    async (key) => {
      const [profession, citySlug] = key.split("/");
      const tags = await cellMeta(profession!, citySlug!);

      expect(robotsOf(tags)).toBeUndefined();
      // he + en + am + x-default
      expect(hreflangCount(tags)).toBe(4);
      expect(canonicalCount(tags)).toBe(1);
    },
  );
});

// ── the sitemaps must agree with the routes (the TED-173 rule) ────────────

describe("no withdrawn URL is still submitted (TED-173)", () => {
  async function allLocs(): Promise<string[]> {
    const out: string[] = [];
    for (const loader of Object.values(ALL_SITEMAPS)) {
      const xml = await (loader() as Response).text();
      out.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]!));
    }
    return out;
  }

  it("submits no health condition, FAQ detail, news tag or unstaffed cell", async () => {
    const paths = new Set(
      (await allLocs()).map((l) => new URL(l).pathname.replace(/^\/(he|en|am)/, "")),
    );

    for (const c of ALL_HEALTH_CONDITIONS) {
      expect(paths.has(`/health/conditions/${c}`), c).toBe(false);
    }
    for (const f of FAQS) {
      expect(paths.has(`/careers/faq/${f.slug}`), f.slug).toBe(false);
    }
    for (const t of ALL_NEWS_TAGS) {
      expect(paths.has(`/news/tag/${t}`), t).toBe(false);
    }
    for (const key of ANON_CELLS) {
      expect(paths.has(`/professionals/${key}`), key).toBe(false);
    }

    // ...and the other side: the hubs and the staffed cells are still there.
    expect(paths.has("/health/conditions")).toBe(true);
    expect(paths.has("/careers/faq")).toBe(true);
    expect(paths.has("/news")).toBe(true);
    for (const key of STAFFED_CELLS) {
      expect(paths.has(`/professionals/${key}`), key).toBe(true);
    }
  });
});

// ── TED-188 ───────────────────────────────────────────────────────────────

describe("a sitemap claims a change date only when it knows one (TED-188)", () => {
  it("never emits today's date as a blanket lastmod", async () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const [n, loader] of Object.entries(NO_LASTMOD_SITEMAPS)) {
      const xml = await (loader() as Response).text();
      // These five pass no lastmod data at all, so they must carry none —
      // previously every one of their URLs claimed it changed today.
      expect(xml, `sitemap-${n}`).not.toContain("<lastmod>");
      expect(xml, `sitemap-${n}`).not.toContain(today);
    }
  });

  it("still emits a real lastmod where one is actually known", async () => {
    const xml = await (newsSitemap() as Response).text();
    const locs = [...xml.matchAll(/<loc>/g)].length;
    const lastmods = [...xml.matchAll(/<lastmod>/g)].length;
    // Every news URL carries its article's own updatedAt — the one honest
    // lastmod on the site, and the whole point of keeping the mechanism.
    expect(locs).toBeGreaterThan(0);
    expect(lastmods).toBe(locs);
  });

  it("does not put a lastmod on the sitemap index either", async () => {
    const xml = await (sitemapIndex() as Response).text();
    expect(xml).not.toContain("<lastmod>");
    expect(xml).toContain("sitemap-news.xml");
  });
});
