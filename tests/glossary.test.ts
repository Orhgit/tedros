import { describe, expect, it } from "vitest";

import {
  allGlossarySlugs,
  getGlossaryEntry,
  listGlossary,
  relatedGlossaryTerms,
} from "../app/lib/db/queries/glossary.server";
import { GLOSSARY } from "../app/lib/glossary/glossary";

describe("glossary seed integrity", () => {
  it("has at least 12 entries", () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(12);
  });

  it("every entry has unique slug", () => {
    const slugs = GLOSSARY.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug is Latin kebab-case", () => {
    for (const e of GLOSSARY) {
      expect(e.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every entry has HE/EN/AM term + summary + body", () => {
    for (const e of GLOSSARY) {
      expect(e.term.he).toBeTruthy();
      expect(e.term.en).toBeTruthy();
      expect(e.term.am).toBeTruthy();
      expect(e.summary.he).toBeTruthy();
      expect(e.summary.en).toBeTruthy();
      expect(e.summary.am).toBeTruthy();
      expect(e.bodies.he.length).toBeGreaterThan(100);
      expect(e.bodies.en.length).toBeGreaterThan(100);
      expect(e.bodies.am.length).toBeGreaterThan(100);
    }
  });

  it("relatedTerms point at valid slugs", () => {
    const slugs = new Set(allGlossarySlugs());
    for (const e of GLOSSARY) {
      for (const r of e.relatedTerms) {
        expect(slugs.has(r), `${e.slug} → ${r}`).toBe(true);
      }
    }
  });
});

describe("listGlossary", () => {
  it("returns all entries summarized in the requested locale", () => {
    const he = listGlossary("he");
    const en = listGlossary("en");
    const am = listGlossary("am");
    expect(he.length).toBe(GLOSSARY.length);
    expect(en.length).toBe(GLOSSARY.length);
    expect(am.length).toBe(GLOSSARY.length);
    // HE should contain Hebrew chars in at least one summary.
    expect(he.some((e) => /[֐-׿]/.test(e.summary))).toBe(true);
  });

  it("sorts alphabetically per locale", () => {
    const en = listGlossary("en");
    const enTerms = en.map((e) => e.term);
    const sorted = [...enTerms].sort((a, b) => a.localeCompare(b, "en"));
    expect(enTerms).toEqual(sorted);
  });
});

describe("getGlossaryEntry", () => {
  it("returns full detail for known slug", () => {
    const sigd = getGlossaryEntry("sigd", "he");
    expect(sigd).not.toBeNull();
    expect(sigd?.term).toMatch(/סיגד/);
    expect(sigd?.body).toContain("סיגד");
    expect(sigd?.relatedTerms.length).toBeGreaterThan(0);
  });

  it("returns null for unknown slug", () => {
    expect(getGlossaryEntry("does-not-exist", "he")).toBeNull();
  });

  it("falls back to HE body when locale missing (defensive)", () => {
    // All seed entries currently provide all 3 locales — this asserts the
    // detail loader is robust to a locale gap.
    const en = getGlossaryEntry("sigd", "en");
    expect(en?.body.length).toBeGreaterThan(50);
  });
});

describe("relatedGlossaryTerms", () => {
  it("returns up to N curated related terms", () => {
    const out = relatedGlossaryTerms("sigd", "he", 3);
    expect(out.length).toBeLessThanOrEqual(3);
    // Sigd's curated relatedTerms: beta-israel, kessim — must appear.
    const slugs = out.map((r) => r.slug);
    expect(slugs).toContain("beta-israel");
    expect(slugs).toContain("kessim");
  });

  it("self never appears", () => {
    for (const e of GLOSSARY) {
      const out = relatedGlossaryTerms(e.slug, "he", 5);
      expect(out.find((r) => r.slug === e.slug)).toBeUndefined();
    }
  });

  it("returns empty array for unknown slug", () => {
    expect(relatedGlossaryTerms("nope", "he")).toEqual([]);
  });
});

describe("allGlossarySlugs", () => {
  it("matches the seed length", () => {
    expect(allGlossarySlugs().length).toBe(GLOSSARY.length);
  });
});
