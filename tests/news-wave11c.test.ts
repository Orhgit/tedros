// TED-164 — wave 11c (health / family / rights) integrity tests.
//
// These articles are YMYL: a reader in distress dials a number off the page.
// The sweep that preceded this wave found, live in production, a placeholder
// string published as a 24/7 youth crisis line, and 18 wrong numbers including
// one organization's line published under three other organizations' names.
// So beyond the shape checks, the last describe block below is a contact
// guard: it enumerates every phone-like token the wave publishes and fails on
// anything outside an allowlist whose entries each name the page they were
// verified against.

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ARTICLES } from "../app/lib/news/articles.server";
import { ARTICLES_WAVE11C } from "../app/lib/news/articles-wave11c.server";
import { ALL_NEWS_TAGS } from "../app/lib/news/categories";

const LOCALES = ["he", "en", "am"] as const;

/** The domain this wave was commissioned for. */
const ALLOWED_TAGS = new Set(["health", "family", "rights"]);

describe("wave 11c shape (TED-164)", () => {
  it("ships 8 articles", () => {
    expect(ARTICLES_WAVE11C).toHaveLength(8);
  });

  it("every slug is unique across ALL waves, not just this one", () => {
    const all = ARTICLES.map((a) => a.slug);
    expect(new Set(all).size).toBe(all.length);
    // and each wave 11c slug appears exactly once in the merged registry
    for (const a of ARTICLES_WAVE11C) {
      expect(all.filter((s) => s === a.slug)).toHaveLength(1);
    }
  });

  it("is actually registered in the merged ARTICLES registry", () => {
    for (const a of ARTICLES_WAVE11C) {
      expect(ARTICLES.find((x) => x.slug === a.slug)).toBeDefined();
    }
  });

  it("has HE/EN/AM title, excerpt and body for every article", () => {
    for (const a of ARTICLES_WAVE11C) {
      for (const locale of LOCALES) {
        expect(a.title[locale], `${a.slug} title.${locale}`).toBeTruthy();
        expect(a.excerpt[locale], `${a.slug} excerpt.${locale}`).toBeTruthy();
        expect(
          a.bodies[locale].length,
          `${a.slug} body.${locale} too short`,
        ).toBeGreaterThan(400);
      }
    }
  });

  it("carries a sources section in every locale", () => {
    // ADR-021: a reader must be able to see where a claim came from.
    const HEADINGS = /## (מקורות|Sources|ምንጮች)/;
    for (const a of ARTICLES_WAVE11C) {
      for (const locale of LOCALES) {
        expect(
          HEADINGS.test(a.bodies[locale]),
          `${a.slug} (${locale}) has no sources section`,
        ).toBe(true);
      }
    }
  });

  it("cites at least one external source URL per locale", () => {
    for (const a of ARTICLES_WAVE11C) {
      for (const locale of LOCALES) {
        expect(
          /\]\(https?:\/\//.test(a.bodies[locale]),
          `${a.slug} (${locale}) cites no external source`,
        ).toBe(true);
      }
    }
  });

  it("uses only valid tags, and only this wave's domain", () => {
    for (const a of ARTICLES_WAVE11C) {
      expect(a.tags.length).toBeGreaterThanOrEqual(1);
      for (const tag of a.tags) {
        expect(ALL_NEWS_TAGS.includes(tag), `${a.slug}: ${tag}`).toBe(true);
        expect(ALLOWED_TAGS.has(tag), `${a.slug}: ${tag} out of domain`).toBe(true);
      }
    }
  });

  it("has valid, consistent ISO dates", () => {
    for (const a of ARTICLES_WAVE11C) {
      expect(a.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.updatedAt >= a.publishedAt).toBe(true);
    }
  });

  it("marks every Amharic body as machine-translated pending native review", () => {
    for (const a of ARTICLES_WAVE11C) {
      expect(a.bodies.am, `${a.slug} am body missing the review marker`).toContain(
        "የAI ትርጉም",
      );
    }
  });

  it("carries the not-legal-advice line on every article tagged rights", () => {
    const DISCLAIMER = /(אינו ייעוץ משפטי|not legal advice|የሕግ ምክር አይደለም)/;
    for (const a of ARTICLES_WAVE11C) {
      if (!a.tags.includes("rights")) continue;
      // Statute and enforcement pieces must carry it; the two programme-report
      // pieces are tagged rights for navigation but state no legal test.
      if (!/law|records|policing/.test(a.slug)) continue;
      for (const locale of LOCALES) {
        expect(
          DISCLAIMER.test(a.bodies[locale]),
          `${a.slug} (${locale}) is missing the legal disclaimer`,
        ).toBe(true);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Contact guard — every published number is one we verified, or the build fails
// ---------------------------------------------------------------------------

/**
 * Numbers this wave is allowed to publish. Each entry names the page it was
 * verified against. Adding a number here without opening that page is the
 * exact failure this guard exists to prevent.
 */
const VERIFIED_NUMBERS: ReadonlyArray<{
  readonly code: string;
  readonly source: string;
}> = [
  {
    code: "118",
    source:
      "Ministry of Welfare and Social Security national domestic-violence line, " +
      "24/7 including Amharic — established by TED-159/TED-160",
  },
  { code: "100", source: "Israel Police emergency number" },
  { code: "101", source: "Magen David Adom emergency number" },
  {
    code: "1201",
    source: "eran.org.il — ERAN publishes 1201 as its hotline on its own site",
  },
];

const ALLOWED_CODES = new Set(VERIFIED_NUMBERS.map((n) => n.code));

const WAVE_FILE = join(
  __dirname,
  "..",
  "app",
  "lib",
  "news",
  "articles-wave11c.server.ts",
);

/**
 * What a reader actually sees — titles, excerpts and bodies in all three
 * locales. Deliberately NOT the raw file: the header comment discusses *5144
 * in order to explain why the wave does not publish it, and a guard that reads
 * source comments would fail on its own documentation.
 */
const PUBLISHED_TEXT = ARTICLES_WAVE11C.flatMap((a) =>
  LOCALES.flatMap((l) => [a.title[l] ?? "", a.excerpt[l] ?? "", a.bodies[l]]),
).join("\n\n");

/**
 * Citation prefixes that make a following number a reference, not a number to
 * dial — a statute-book page ("ס"ח תשפ"ד עמ' 1094"), a section, a page range.
 */
const CITATION_PREFIX =
  /(עמ'|עמוד|עמודים|סעיף|סעיפים|pp?\.|page|pages|section|ገጽ|አንቀጽ)\s*$/;

describe("wave 11c publishes no unverified contact details (TED-164)", () => {
  const source = PUBLISHED_TEXT;

  it("scans a non-trivial amount of published text", () => {
    // Guards against a refactor emptying the corpus and vacuously passing.
    expect(source.length).toBeGreaterThan(20000);
  });

  it("does not read its own source comments as published content", () => {
    // The file explains why *5144 is not restated here; that explanation must
    // never itself trip the star-code guard below.
    expect(readFileSync(WAVE_FILE, "utf8")).toContain("*5144");
    expect(source).not.toContain("*5144");
  });

  it("publishes no star codes, landlines or 1-800 numbers", () => {
    // This wave deliberately links our own interpreter guide rather than
    // restating the *5144 centre, and publishes no organization landline —
    // Tene Briut in particular has inconsistent numbers across the web and
    // was left to a dedicated verification pass.
    const RISKY: ReadonlyArray<{ label: string; pattern: RegExp }> = [
      // A real star code is `*5144` or `5144*`. The lookarounds keep markdown
      // bold out of it — `**173 ₪**` would otherwise read as the star code
      // `*173`, which is how this guard first failed on its own copy.
      { label: "star code (*NNNN)", pattern: /(?<!\*)\*\d{3,4}(?!\*)/ },
      { label: "star code (NNNN*)", pattern: /(?<!\*)\d{3,4}\*(?!\*)/ },
      { label: "landline (0N-NNNNNNN)", pattern: /\b0\d{1,2}-?\d{7}\b/ },
      { label: "1-800 number", pattern: /\b1[-\s]?800[-\s]?[\d-]{5,}/ },
      { label: "1-700 number", pattern: /\b1[-\s]?700[-\s]?[\d-]{5,}/ },
      { label: "placeholder digits", pattern: /X{3,}/ },
    ];
    const offenders = RISKY.filter((r) => r.pattern.test(source)).map((r) => r.label);
    expect(
      offenders,
      `wave 11c must not publish: ${offenders.join(", ")}. ` +
        "Verify against the owning organization's own page, add it to " +
        "VERIFIED_NUMBERS with that source, and relax this guard deliberately.",
    ).toEqual([]);
  });

  it("every short code it does publish is on the verified allowlist", () => {
    // Bare 3-4 digit codes, excluding anything that is part of a larger number,
    // a year, a percentage or a thousands-separated figure.
    const SHORT_CODE = /(?<![\d,.*\-–—%₪])\b(1\d{3}|1[01]\d)\b(?![\d,.\-–—%])/g;
    const found = new Set<string>();
    for (const match of source.matchAll(SHORT_CODE)) {
      // Skip references — a statute-book page number is not a phone number.
      const preceding = source.slice(Math.max(0, match.index - 24), match.index);
      if (CITATION_PREFIX.test(preceding)) continue;
      found.add(match[1]!);
    }
    const unverified = [...found].filter((code) => !ALLOWED_CODES.has(code));
    expect(
      unverified,
      "Unverified contact codes published in wave 11c: " +
        `${unverified.join(", ")}. Every number a reader can dial must be ` +
        "verified against the owning organization's own published page.",
    ).toEqual([]);
  });

  it("the allowlist itself records a source for every entry", () => {
    for (const entry of VERIFIED_NUMBERS) {
      expect(
        entry.source.length,
        `${entry.code} has no verification source`,
      ).toBeGreaterThan(10);
    }
  });
});
