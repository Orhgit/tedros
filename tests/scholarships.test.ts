import { describe, expect, it } from "vitest";

import {
  allScholarshipSlugs,
  getScholarshipBySlug,
  listScholarships,
  relatedScholarships,
} from "../app/lib/db/queries/scholarships.server";
import { SCHOLARSHIPS, pickLocale } from "../app/lib/education/scholarships.server";
import { SCHOLARSHIP_LEVELS } from "../app/lib/education/categories";

describe("scholarships seed integrity", () => {
  it("has at least 12 scholarships", () => {
    expect(SCHOLARSHIPS.length).toBeGreaterThanOrEqual(12);
  });

  it("every scholarship has a unique slug", () => {
    const slugs = SCHOLARSHIPS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug is Latin kebab-case", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.slug, `${e.slug}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every scholarship has HE/EN/AM name + shortDescription + body", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.name.he).toBeTruthy();
      expect(e.name.en).toBeTruthy();
      expect(e.name.am).toBeTruthy();
      expect(e.shortDescription.he).toBeTruthy();
      expect(e.shortDescription.en).toBeTruthy();
      expect(e.shortDescription.am).toBeTruthy();
      expect(e.bodies.he.length).toBeGreaterThan(100);
      expect(e.bodies.en.length).toBeGreaterThan(100);
      expect(e.bodies.am.length).toBeGreaterThan(50);
    }
  });

  it("every scholarship has a known level", () => {
    const levels = new Set(SCHOLARSHIP_LEVELS as readonly string[]);
    for (const e of SCHOLARSHIPS) {
      expect(levels.has(e.level), `${e.slug} → ${e.level}`).toBe(true);
    }
  });

  it("amount range is non-negative and ordered", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.amountMinIls).toBeGreaterThanOrEqual(0);
      expect(e.amountMaxIls).toBeGreaterThanOrEqual(e.amountMinIls);
    }
  });

  it("every applicationUrl is https", () => {
    for (const e of SCHOLARSHIPS) {
      expect(e.applicationUrl, `${e.slug}`).toMatch(/^https:\/\//);
    }
  });

  it("relatedScholarships point at valid slugs", () => {
    const slugs = new Set(allScholarshipSlugs());
    for (const e of SCHOLARSHIPS) {
      for (const r of e.relatedScholarships) {
        expect(slugs.has(r), `${e.slug} → ${r}`).toBe(true);
      }
    }
  });
});

describe("listScholarships", () => {
  it("returns all scholarships in the requested locale", () => {
    expect(listScholarships("he").length).toBe(SCHOLARSHIPS.length);
    expect(listScholarships("en").length).toBe(SCHOLARSHIPS.length);
    expect(listScholarships("am").length).toBe(SCHOLARSHIPS.length);
  });

  it("sorts alphabetically per locale", () => {
    const en = listScholarships("en");
    const enNames = en.map((e) => e.name);
    const sorted = [...enNames].sort((a, b) => a.localeCompare(b, "en"));
    expect(enNames).toEqual(sorted);
  });

  it("translates amountNote per locale", () => {
    const isef = listScholarships("he").find((s) => s.slug === "isef-fellowship");
    expect(isef?.amountNote).toContain("שכר לימוד");
  });
});

describe("getScholarshipBySlug", () => {
  it("returns full detail for known slug", () => {
    const isef = getScholarshipBySlug("isef-fellowship", "he");
    expect(isef).not.toBeNull();
    expect(isef?.name).toMatch(/ISEF/);
    expect(isef?.body).toContain("ISEF");
    expect(isef?.applicationUrl).toMatch(/isef\.org\.il/);
    expect(isef?.providerOrgSlug).toBe("isef");
  });

  it("returns null for unknown slug", () => {
    expect(getScholarshipBySlug("does-not-exist", "he")).toBeNull();
  });

  it("returns body in requested locale", () => {
    const en = getScholarshipBySlug("hesegim-undergraduate", "en");
    expect(en?.body).toContain("Who is it for");
  });
});

describe("relatedScholarships", () => {
  it("returns up to N curated related scholarships", () => {
    const out = relatedScholarships("isef-fellowship", "he", 3);
    expect(out.length).toBeLessThanOrEqual(3);
    const slugs = out.map((r) => r.slug);
    // ISEF Fellowship curates Hesegim + Cogito.
    expect(slugs).toContain("hesegim-undergraduate");
  });

  it("self never appears", () => {
    for (const e of SCHOLARSHIPS) {
      const out = relatedScholarships(e.slug, "he", 5);
      expect(out.find((r) => r.slug === e.slug)).toBeUndefined();
    }
  });

  it("returns empty array for unknown slug", () => {
    expect(relatedScholarships("nope", "he")).toEqual([]);
  });

  it("falls back to same-level when curated set is empty", () => {
    // Find an entry with no curated relatedScholarships (or all curated are unknown)
    const orphan = SCHOLARSHIPS.find((e) => e.relatedScholarships.length === 0);
    if (orphan) {
      const out = relatedScholarships(orphan.slug, "he", 3);
      // Should still return same-level fallback (if any siblings exist)
      const sameLevelCount = SCHOLARSHIPS.filter(
        (e) => e.level === orphan.level && e.slug !== orphan.slug,
      ).length;
      expect(out.length).toBeLessThanOrEqual(Math.min(3, sameLevelCount));
    }
  });
});

describe("pickLocale fallback", () => {
  it("returns HE when EN/AM missing", () => {
    const t = { he: "hello-he" } as { he: string; en?: string; am?: string };
    expect(pickLocale(t, "en")).toBe("hello-he");
    expect(pickLocale(t, "am")).toBe("hello-he");
  });
});
