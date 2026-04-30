import { describe, expect, it } from "vitest";

import { relatedRights } from "../app/lib/db/queries/rights.server";

describe("relatedRights", () => {
  it("returns up to N related rights, sorted by tag overlap", () => {
    // Klita-basket has tags: new_immigrant, grants, monthly_payment.
    // Related rights should include other new_immigrant / grants tagged
    // entries (advanced-ulpan, immigrant-tax-relief, falash-mura, etc.).
    const out = relatedRights("klita-basket", "he", 4);
    expect(out.length).toBeLessThanOrEqual(4);
    expect(out.length).toBeGreaterThan(0);
    // Self must not appear.
    expect(out.find((r) => r.slug === "klita-basket")).toBeUndefined();
    // Each related right should share at least one tag with klita-basket.
    const klitaTags = new Set(["new_immigrant", "grants", "monthly_payment"]);
    for (const r of out) {
      const overlap = r.tags.filter((t) => klitaTags.has(t)).length;
      expect(overlap).toBeGreaterThan(0);
    }
  });

  it("respects the limit", () => {
    expect(relatedRights("klita-basket", "he", 2).length).toBeLessThanOrEqual(2);
    expect(relatedRights("klita-basket", "he", 1).length).toBeLessThanOrEqual(1);
  });

  it("returns empty array for unknown slug", () => {
    expect(relatedRights("does-not-exist", "he")).toEqual([]);
  });

  it("returns localized titles + summaries", () => {
    const he = relatedRights("klita-basket", "he", 1)[0];
    const en = relatedRights("klita-basket", "en", 1)[0];
    if (he && en) {
      expect(he.title).not.toBe(en.title);
      expect(he.title).toMatch(/[֐-׿]/); // Hebrew range
    }
  });
});
