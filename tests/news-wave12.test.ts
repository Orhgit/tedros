// Wave 12 integrity guard (TED-171) — the first week of the sustained cadence.
//
// Wave 12 is a mixed wave (civic, rights, health, heritage, employment) rather
// than a single-domain one, so the guard checks the things that have actually
// decayed across earlier waves rather than a domain whitelist: a slug colliding
// with one of the 155 that came before, a locale silently missing, a body
// shipping without the sources section ADR-021 requires, a tag outside the
// registry, and — new here — the two Sigd facts this wave is most likely to get
// wrong on a future edit.

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
import { ARTICLES_WAVE12 } from "../app/lib/news/articles-wave12.server";
import { ALL_NEWS_TAGS } from "../app/lib/news/categories";

const LOCALES = ["he", "en", "am"] as const;

/** Heading that opens the per-article source list, per locale. */
const SOURCES_HEADING: Record<(typeof LOCALES)[number], string> = {
  he: "## מקורות",
  en: "## Sources",
  am: "## ምንጮች",
};

describe("wave 12 shape", () => {
  it("ships 6 articles", () => {
    expect(ARTICLES_WAVE12).toHaveLength(6);
  });

  it("is registered in the ARTICLES aggregate", () => {
    const registry = new Set(ARTICLES.map((a) => a.slug));
    for (const a of ARTICLES_WAVE12) {
      expect(registry.has(a.slug), `${a.slug} not registered`).toBe(true);
    }
  });

  it("introduces no slug that collides with any earlier wave", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const a of ARTICLES_WAVE12) {
      expect(slugs.filter((s) => s === a.slug)).toHaveLength(1);
    }
  });

  it("carries title, excerpt and body in every locale", () => {
    for (const a of ARTICLES_WAVE12) {
      for (const locale of LOCALES) {
        expect(a.title[locale]?.trim(), `${a.slug}.title.${locale}`).toBeTruthy();
        expect(a.excerpt[locale]?.trim(), `${a.slug}.excerpt.${locale}`).toBeTruthy();
        expect(a.bodies[locale].length, `${a.slug}.bodies.${locale}`).toBeGreaterThan(
          200,
        );
      }
    }
  });

  it("uses only tags from the registry", () => {
    for (const a of ARTICLES_WAVE12) {
      expect(a.tags.length, `${a.slug} has no tag`).toBeGreaterThanOrEqual(1);
      for (const tag of a.tags) {
        expect(ALL_NEWS_TAGS.includes(tag), `${a.slug}: bad tag ${tag}`).toBe(true);
      }
    }
  });

  it("spreads across domains instead of clustering in one", () => {
    const domains = new Set(ARTICLES_WAVE12.flatMap((a) => a.tags));
    expect(
      domains.size,
      `wave 12 covers only ${[...domains].join(", ")}`,
    ).toBeGreaterThanOrEqual(5);
  });

  it("is dated 2026-09-16 or later, with updatedAt >= publishedAt", () => {
    for (const a of ARTICLES_WAVE12) {
      expect(a.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.publishedAt >= "2026-09-16", `${a.slug} predates the wave`).toBe(true);
      expect(a.updatedAt >= a.publishedAt).toBe(true);
    }
  });
});

describe("wave 12 sourcing (ADR-021)", () => {
  it("every body ends with a sources section in its own language", () => {
    for (const a of ARTICLES_WAVE12) {
      for (const locale of LOCALES) {
        expect(
          a.bodies[locale].includes(SOURCES_HEADING[locale]),
          `${a.slug}.${locale} has no ${SOURCES_HEADING[locale]} section`,
        ).toBe(true);
      }
    }
  });

  it("every sources section cites at least one external primary source", () => {
    for (const a of ARTICLES_WAVE12) {
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
    for (const a of ARTICLES_WAVE12) {
      const tail = a.bodies.he.slice(a.bodies.he.indexOf(SOURCES_HEADING.he));
      expect(/20\d{2}/.test(tail), `${a.slug}: no dated source in HE`).toBe(true);
    }
  });

  it("never cites tedros.co.il as the source of a fact", () => {
    for (const a of ARTICLES_WAVE12) {
      for (const locale of LOCALES) {
        expect(
          /\]\(https?:\/\/(www\.)?tedros\.co\.il/.test(a.bodies[locale]),
          `${a.slug}.${locale} cites our own domain as a source`,
        ).toBe(false);
      }
    }
  });

  it("Amharic bodies keep the machine-translation review notice", () => {
    for (const a of ARTICLES_WAVE12) {
      expect(
        a.bodies.am.includes("የAI ትርጉም"),
        `${a.slug}.am is missing the AI-translation notice`,
      ).toBe(true);
    }
  });
});

describe("wave 12 facts that must not drift", () => {
  const sigd = ARTICLES_WAVE12.find(
    (a) => a.slug === "sigd-5787-no-published-events-yet-2026",
  );

  it("keeps 9.11.2026 as the date of Sigd 5787", () => {
    expect(sigd, "the Sigd article is missing").toBeDefined();
    expect(sigd!.bodies.he).toContain("9 בנובמבר 2026");
    expect(sigd!.bodies.en).toContain("9 November 2026");
  });

  it("invents no ceremony schedule for Sigd 5787", () => {
    // TED-165 and TED-169 both had to strip fabricated Sigd logistics. The
    // point of this article is that nothing has been published yet, so any
    // clock time appearing in its body would be a regression.
    for (const locale of LOCALES) {
      expect(
        /\b\d{1,2}:\d{2}\b/.test(sigd!.bodies[locale]),
        `${locale} body states a time of day for a ceremony nobody has announced`,
      ).toBe(false);
    }
  });

  it("does not assert a 200% election-day pay rate the statute does not set", () => {
    const law = ARTICLES_WAVE12.find(
      (a) => a.slug === "election-day-shabbaton-what-the-law-says-2026",
    );
    expect(law, "the election-day law article is missing").toBeDefined();
    // The figure may be named in order to say it is not in the statute; it may
    // not be stated as the entitlement. Both bodies say so explicitly.
    expect(law!.bodies.he).toContain("אינו כתוב בסעיף 136");
    expect(law!.bodies.en).toContain("not written in section 136");
  });
});
