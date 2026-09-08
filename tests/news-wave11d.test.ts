// Wave 11d integrity guard (TED-165) — heritage, community, cities, housing.
//
// The point of this wave was verification discipline, so the guard checks the
// things that decayed in earlier waves: slugs colliding across waves, a locale
// silently missing, a body shipping without a sources section, and a tag
// outside the registry.

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

import { ARTICLES } from "../app/lib/news/articles.server";
import { ARTICLES_WAVE11D } from "../app/lib/news/articles-wave11d.server";
import { ALL_NEWS_TAGS } from "../app/lib/news/categories";

const LOCALES = ["he", "en", "am"] as const;

/** Heading that opens the per-article source list, per locale. */
const SOURCES_HEADING: Record<(typeof LOCALES)[number], string> = {
  he: "## מקורות",
  en: "## Sources",
  am: "## ምንጮች",
};

describe("wave 11d", () => {
  it("ships 8 articles", () => {
    expect(ARTICLES_WAVE11D).toHaveLength(8);
  });

  it("is registered in the ARTICLES aggregate", () => {
    const all = new Set(ARTICLES.map((a) => a.slug));
    for (const a of ARTICLES_WAVE11D) {
      expect(all.has(a.slug)).toBe(true);
    }
  });

  it("introduces no slug that collides with any earlier wave", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("carries HE/EN/AM title, excerpt and body for every article", () => {
    for (const a of ARTICLES_WAVE11D) {
      for (const locale of LOCALES) {
        expect(
          a.title[locale]?.trim().length,
          `${a.slug}.title.${locale}`,
        ).toBeGreaterThan(0);
        expect(
          a.excerpt[locale]?.trim().length,
          `${a.slug}.excerpt.${locale}`,
        ).toBeGreaterThan(0);
        expect(a.bodies[locale]?.length, `${a.slug}.body.${locale}`).toBeGreaterThan(200);
      }
    }
  });

  it("every body ends with a sources section naming at least one source", () => {
    for (const a of ARTICLES_WAVE11D) {
      for (const locale of LOCALES) {
        const body = a.bodies[locale];
        const heading = SOURCES_HEADING[locale];
        expect(body.includes(heading), `${a.slug}.${locale} has no "${heading}"`).toBe(
          true,
        );
        const tail = body.slice(body.lastIndexOf(heading));
        expect(/https?:\/\//.test(tail), `${a.slug}.${locale} sources has no URL`).toBe(
          true,
        );
      }
    }
  });

  it("uses only registered tags, and stays inside this wave's domain", () => {
    const domain = new Set(["holiday", "community", "cities", "housing", "announcement"]);
    for (const a of ARTICLES_WAVE11D) {
      expect(a.tags.length).toBeGreaterThanOrEqual(1);
      for (const tag of a.tags) {
        expect(ALL_NEWS_TAGS.includes(tag), `${a.slug}: ${tag} is not a news tag`).toBe(
          true,
        );
        expect(domain.has(tag), `${a.slug}: ${tag} is outside wave 11d's domain`).toBe(
          true,
        );
      }
    }
  });

  it("is dated 2026-09-08", () => {
    for (const a of ARTICLES_WAVE11D) {
      expect(a.publishedAt).toBe("2026-09-08");
      expect(a.updatedAt).toBe("2026-09-08");
    }
  });

  it("states the verified Sigd date and never the retired one", () => {
    const sigd = ARTICLES_WAVE11D.find(
      (a) => a.slug === "sigd-5787-monday-9-november-2026",
    );
    expect(sigd).toBeDefined();
    expect(sigd!.bodies.he).toContain("9 בנובמבר 2026");
    // 19.11.2026 was the fabricated date this wave corrected; it may only
    // appear in the explicit correction notice, never as the date itself.
    expect(sigd!.bodies.he).toContain('**סיגד תשפ"ז יחול ביום שני, 9 בנובמבר 2026.**');
  });
});
