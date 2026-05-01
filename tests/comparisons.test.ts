import { describe, expect, it } from "vitest";

import {
  ALL_COMPARISON_CATEGORIES,
  glyphForComparisonCategory,
} from "../app/lib/comparisons/categories";
import { COMPARISONS } from "../app/lib/comparisons/comparisons.server";
import {
  allComparisonSlugs,
  getComparisonEntry,
  listComparisons,
} from "../app/lib/db/queries/comparisons.server";

describe("comparisons seed integrity", () => {
  it("has at least 10 comparison entries", () => {
    expect(COMPARISONS.length).toBeGreaterThanOrEqual(10);
  });

  it("every entry has unique slug", () => {
    const slugs = COMPARISONS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug is Latin kebab-case with vs", () => {
    for (const e of COMPARISONS) {
      expect(e.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every entry has HE/EN/AM title + shortDescription + body", () => {
    for (const e of COMPARISONS) {
      expect(e.title.he).toBeTruthy();
      expect(e.title.en).toBeTruthy();
      expect(e.title.am).toBeTruthy();
      expect(e.shortDescription.he).toBeTruthy();
      expect(e.shortDescription.en).toBeTruthy();
      expect(e.shortDescription.am).toBeTruthy();
      expect(e.bodies.he.length).toBeGreaterThan(100);
      expect(e.bodies.en.length).toBeGreaterThan(100);
      expect(e.bodies.am.length).toBeGreaterThan(100);
    }
  });

  it("every entry has at least 4 criteria", () => {
    for (const e of COMPARISONS) {
      expect(e.criteria.length, `${e.slug} criteria`).toBeGreaterThanOrEqual(4);
    }
  });

  it("every criterion has HE/EN/AM label + values for both sides", () => {
    for (const e of COMPARISONS) {
      for (const c of e.criteria) {
        expect(c.label.he).toBeTruthy();
        expect(c.label.en).toBeTruthy();
        expect(c.label.am).toBeTruthy();
        expect(c.a.he).toBeTruthy();
        expect(c.b.he).toBeTruthy();
      }
    }
  });

  it("every category is in the registered enum", () => {
    for (const e of COMPARISONS) {
      expect(ALL_COMPARISON_CATEGORIES).toContain(e.category);
    }
  });
});

describe("listComparisons", () => {
  it("returns all entries in the requested locale", () => {
    expect(listComparisons("he").length).toBe(COMPARISONS.length);
    expect(listComparisons("en").length).toBe(COMPARISONS.length);
    expect(listComparisons("am").length).toBe(COMPARISONS.length);
  });

  it("HE summaries contain Hebrew characters", () => {
    const he = listComparisons("he");
    expect(he.some((e) => /[֐-׿]/.test(e.title))).toBe(true);
  });
});

describe("getComparisonEntry", () => {
  it("returns full detail for known slug", () => {
    const isef = getComparisonEntry("isef-vs-hesegim", "he");
    expect(isef).not.toBeNull();
    expect(isef?.criteria.length).toBeGreaterThanOrEqual(4);
    expect(isef?.body.length).toBeGreaterThan(200);
    expect(isef?.sideA.name).toBeTruthy();
    expect(isef?.sideB.name).toBeTruthy();
  });

  it("returns null for unknown slug", () => {
    expect(getComparisonEntry("does-not-exist", "he")).toBeNull();
  });

  it("resolves criterion winner correctly", () => {
    const isef = getComparisonEntry("isef-vs-hesegim", "he");
    expect(isef).not.toBeNull();
    const hasWinner = isef!.criteria.some((c) => c.winner !== undefined);
    expect(hasWinner).toBe(true);
  });
});

describe("glyphForComparisonCategory", () => {
  it("returns a glyph for every category", () => {
    for (const c of ALL_COMPARISON_CATEGORIES) {
      expect(glyphForComparisonCategory(c).length).toBeGreaterThan(0);
    }
  });
});

describe("allComparisonSlugs", () => {
  it("matches the seed length", () => {
    expect(allComparisonSlugs().length).toBe(COMPARISONS.length);
  });
});
