// Wave 11a integrity guard (TED-162) — civic / policy / elections / immigration.
//
// Wave 11a is news about a live election and a live immigration file, so the
// things most worth guarding are the things that go stale or go wrong:
// duplicate slugs across the growing pile of waves, a locale silently missing,
// and — following ADR-021 — a body that asserts facts without naming where they
// came from.

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
import { ARTICLES_WAVE11A } from "../app/lib/news/articles-wave11a.server";
import { ALL_NEWS_TAGS } from "../app/lib/news/categories";

const LOCALES = ["he", "en", "am"] as const;

/** Heading that opens the source list, per locale. */
const SOURCES_HEADING: Record<(typeof LOCALES)[number], string> = {
  he: "## מקורות",
  en: "## Sources",
  am: "## ምንጮች",
};

describe("wave 11a shape", () => {
  it("ships 8 articles", () => {
    expect(ARTICLES_WAVE11A).toHaveLength(8);
  });

  it("every wave 11a slug is unique across ALL waves", () => {
    const all = ARTICLES.map((a) => a.slug);
    expect(new Set(all).size).toBe(all.length);
    for (const a of ARTICLES_WAVE11A) {
      expect(all.filter((s) => s === a.slug)).toHaveLength(1);
    }
  });

  it("every wave 11a article is reachable through the main ARTICLES registry", () => {
    const registry = new Set(ARTICLES.map((a) => a.slug));
    for (const a of ARTICLES_WAVE11A) {
      expect(registry.has(a.slug), `${a.slug} not registered`).toBe(true);
    }
  });

  it("carries title, excerpt and body in every locale", () => {
    for (const a of ARTICLES_WAVE11A) {
      for (const locale of LOCALES) {
        expect(a.title[locale]?.trim(), `${a.slug}.title.${locale}`).toBeTruthy();
        expect(a.excerpt[locale]?.trim(), `${a.slug}.excerpt.${locale}`).toBeTruthy();
        expect(a.bodies[locale].length, `${a.slug}.bodies.${locale}`).toBeGreaterThan(
          200,
        );
      }
    }
  });

  it("uses only valid tags, and stays inside the civic/policy/immigration domain", () => {
    const domain = ["civic", "policy", "immigration"];
    for (const a of ARTICLES_WAVE11A) {
      expect(a.tags.length).toBeGreaterThanOrEqual(1);
      for (const tag of a.tags) {
        expect(ALL_NEWS_TAGS.includes(tag), `${a.slug}: bad tag ${tag}`).toBe(true);
      }
      expect(
        a.tags.some((t) => domain.includes(t)),
        `${a.slug} carries no domain tag`,
      ).toBe(true);
    }
  });

  it("is dated 2026-09-08 or later, with updatedAt >= publishedAt", () => {
    for (const a of ARTICLES_WAVE11A) {
      expect(a.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.publishedAt >= "2026-09-08", `${a.slug} predates the wave`).toBe(true);
      expect(a.updatedAt >= a.publishedAt).toBe(true);
    }
  });
});

describe("wave 11a sourcing (ADR-021)", () => {
  it("every body ends with a sources section in its own language", () => {
    for (const a of ARTICLES_WAVE11A) {
      for (const locale of LOCALES) {
        expect(
          a.bodies[locale].includes(SOURCES_HEADING[locale]),
          `${a.slug}.${locale} has no ${SOURCES_HEADING[locale]} section`,
        ).toBe(true);
      }
    }
  });

  it("every sources section cites at least one external primary source", () => {
    for (const a of ARTICLES_WAVE11A) {
      for (const locale of LOCALES) {
        const body = a.bodies[locale];
        const tail = body.slice(body.indexOf(SOURCES_HEADING[locale]));
        const external = tail.match(/\]\(https?:\/\/[^)]+\)/g) ?? [];
        expect(
          external.length,
          `${a.slug}.${locale} cites no external source`,
        ).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("cited sources carry a year, so a reader can see how old the claim is", () => {
    for (const a of ARTICLES_WAVE11A) {
      const tail = a.bodies.he.slice(a.bodies.he.indexOf(SOURCES_HEADING.he));
      expect(/20\d{2}/.test(tail), `${a.slug}: no dated source in HE`).toBe(true);
    }
  });

  it("Amharic bodies keep the machine-translation review notice", () => {
    for (const a of ARTICLES_WAVE11A) {
      expect(
        a.bodies.am.includes("የAI ትርጉም"),
        `${a.slug}.am is missing the AI-translation notice`,
      ).toBe(true);
    }
  });
});
