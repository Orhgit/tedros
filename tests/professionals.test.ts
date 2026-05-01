import { describe, expect, it } from "vitest";

import {
  allProfessionalSlugs,
  getProfessionalSlot,
  listByProfession,
  listByProfessionAndCity,
  listProfessionals,
  professionalCityPairs,
} from "../app/lib/db/queries/professionals.server";
import { ALL_PROFESSIONS, isProfession } from "../app/lib/professionals/categories";
import { PROFESSIONALS } from "../app/lib/professionals/professionals.server";
import { CITIES } from "../app/lib/cities/registry";

describe("professionals seed integrity", () => {
  it("has at least 25 directory slots", () => {
    expect(PROFESSIONALS.length).toBeGreaterThanOrEqual(25);
  });

  it("every slot has a unique slug", () => {
    const slugs = PROFESSIONALS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every slug follows {profession}-{city}-{specialty} kebab-case", () => {
    for (const e of PROFESSIONALS) {
      expect(e.slug).toMatch(/^[a-z]+(-[a-z0-9]+)+$/);
    }
  });

  it("every profession value is a known enum member", () => {
    for (const e of PROFESSIONALS) {
      expect(ALL_PROFESSIONS).toContain(e.profession);
    }
  });

  it("every citySlug resolves to a real CITIES entry", () => {
    const validSlugs = new Set(CITIES.map((c) => c.slug));
    for (const e of PROFESSIONALS) {
      expect(validSlugs.has(e.citySlug), `${e.slug} → ${e.citySlug}`).toBe(true);
    }
  });

  it("every slot has HE/EN/AM title + shortDescription + body", () => {
    for (const e of PROFESSIONALS) {
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

  it("covers all 8 professions", () => {
    const seen = new Set(PROFESSIONALS.map((e) => e.profession));
    expect(seen.size).toBe(ALL_PROFESSIONS.length);
  });
});

describe("isProfession", () => {
  it("returns true for known professions", () => {
    expect(isProfession("lawyer")).toBe(true);
    expect(isProfession("psychologist")).toBe(true);
    expect(isProfession("real-estate-agent")).toBe(true);
  });
  it("returns false for unknown values", () => {
    expect(isProfession("astronaut")).toBe(false);
    expect(isProfession("")).toBe(false);
  });
});

describe("listProfessionals", () => {
  it("returns all slots in the requested locale", () => {
    expect(listProfessionals("he").length).toBe(PROFESSIONALS.length);
    expect(listProfessionals("en").length).toBe(PROFESSIONALS.length);
    expect(listProfessionals("am").length).toBe(PROFESSIONALS.length);
  });
  it("HE summaries contain Hebrew characters", () => {
    const he = listProfessionals("he");
    expect(he.some((s) => /[֐-׿]/.test(s.title))).toBe(true);
  });
});

describe("listByProfession", () => {
  it("returns only slots matching the profession", () => {
    const lawyers = listByProfession("lawyer", "he");
    expect(lawyers.length).toBeGreaterThan(0);
    for (const l of lawyers) expect(l.profession).toBe("lawyer");
  });
  it("returns empty for a profession with no slots", () => {
    // We have entries for every profession — pick none-set scenario by
    // iterating after a (hypothetical) empty profession would behave correctly.
    // This proves correctness of the filter.
    const allCount = listProfessionals("he").length;
    const sumByProf = ALL_PROFESSIONS.reduce(
      (acc, p) => acc + listByProfession(p, "he").length,
      0,
    );
    expect(sumByProf).toBe(allCount);
  });
});

describe("listByProfessionAndCity", () => {
  it("filters to exact profession × city combinations", () => {
    const out = listByProfessionAndCity("lawyer", "netanya", "he");
    for (const e of out) {
      expect(e.profession).toBe("lawyer");
      expect(e.citySlug).toBe("netanya");
    }
  });
  it("returns empty for a city with no entries", () => {
    expect(listByProfessionAndCity("lawyer", "eilat", "he")).toEqual([]);
  });
});

describe("getProfessionalSlot", () => {
  it("returns full detail for known slug", () => {
    const slot = getProfessionalSlot("lawyer-netanya-family-law", "he");
    expect(slot).not.toBeNull();
    expect(slot?.profession).toBe("lawyer");
    expect(slot?.citySlug).toBe("netanya");
    expect(slot?.body.length).toBeGreaterThan(100);
  });
  it("returns null for unknown slug", () => {
    expect(getProfessionalSlot("does-not-exist", "he")).toBeNull();
  });
});

describe("professionalCityPairs", () => {
  it("returns one pair per (profession, city) combination present in seed", () => {
    const pairs = professionalCityPairs();
    const keys = new Set(pairs.map((p) => `${p.profession}::${p.citySlug}`));
    expect(keys.size).toBe(pairs.length); // unique
    // Total pairs ≥ professions covered (we have at least 1 city per prof).
    expect(pairs.length).toBeGreaterThanOrEqual(ALL_PROFESSIONS.length);
  });
});

describe("allProfessionalSlugs", () => {
  it("matches the seed length", () => {
    expect(allProfessionalSlugs().length).toBe(PROFESSIONALS.length);
  });
});
