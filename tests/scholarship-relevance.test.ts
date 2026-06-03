import { describe, expect, it } from "vitest";

import { CITIES } from "../app/lib/cities/registry";
import {
  SCHOLARSHIP_RELEVANCE_CITIES,
  isScholarshipCellRelevant,
  relevantScholarshipCities,
} from "../app/lib/education/scholarship-relevance";
import { SCHOLARSHIPS } from "../app/lib/education/scholarships.server";

describe("scholarship-relevance", () => {
  it("ships exactly 5 community cities for V1", () => {
    expect(SCHOLARSHIP_RELEVANCE_CITIES).toHaveLength(5);
  });

  it("every relevance city slug exists in the cities registry", () => {
    const allSlugs = new Set(CITIES.map((c) => c.slug));
    for (const slug of SCHOLARSHIP_RELEVANCE_CITIES) {
      expect(allSlugs.has(slug), `city ${slug} missing from registry`).toBe(true);
    }
  });

  it("isScholarshipCellRelevant returns true for relevance cities", () => {
    for (const slug of SCHOLARSHIP_RELEVANCE_CITIES) {
      expect(isScholarshipCellRelevant(slug)).toBe(true);
    }
  });

  it("isScholarshipCellRelevant returns false for non-relevance cities", () => {
    expect(isScholarshipCellRelevant("tel-aviv")).toBe(false);
    expect(isScholarshipCellRelevant("does-not-exist")).toBe(false);
  });

  it("relevantScholarshipCities filters from CITIES", () => {
    const relevant = relevantScholarshipCities(CITIES);
    expect(relevant).toHaveLength(5);
    expect(relevant.every((c) => SCHOLARSHIP_RELEVANCE_CITIES.includes(c.slug))).toBe(
      true,
    );
  });

  it("V1 cell budget — scholarships × 5 cities", () => {
    const cells = SCHOLARSHIPS.length * SCHOLARSHIP_RELEVANCE_CITIES.length;
    expect(cells).toBe(190);
  });
});
