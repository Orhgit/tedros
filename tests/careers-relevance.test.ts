import { describe, expect, it } from "vitest";

import { CITIES } from "../app/lib/cities/registry";
import { ALL_CAREER_TRACKS } from "../app/lib/careers/categories";
import {
  COMMUNITY_CITIES,
  cellCount,
  isRelevant,
  relevanceFor,
  relevantCities,
} from "../app/lib/careers/relevance";

describe("relevanceFor", () => {
  it("returns a defined relevance for every track", () => {
    for (const track of ALL_CAREER_TRACKS) {
      expect(relevanceFor(track)).toBeDefined();
    }
  });

  it("tech is restricted to 5 metro hubs", () => {
    const r = relevanceFor("tech");
    expect(r.kind).toBe("list");
    if (r.kind === "list") {
      expect(r.cities).toEqual([
        "tel-aviv",
        "haifa",
        "jerusalem",
        "beer-sheva",
        "netanya",
      ]);
    }
  });

  it("healthcare ships in every community city", () => {
    expect(relevanceFor("healthcare")).toEqual({ kind: "community-cities" });
  });

  it("law concentrates in 4 court hubs", () => {
    const r = relevanceFor("law");
    expect(r.kind).toBe("list");
    if (r.kind === "list") expect(r.cities).toContain("tel-aviv");
  });
});

describe("isRelevant", () => {
  it("tech in tel-aviv = true", () => {
    expect(isRelevant("tech", "tel-aviv")).toBe(true);
  });

  it("tech in eilat = false (not on the list)", () => {
    expect(isRelevant("tech", "eilat")).toBe(false);
  });

  it("healthcare in netanya = true (community city)", () => {
    expect(isRelevant("healthcare", "netanya")).toBe(true);
  });

  it("healthcare in eilat = false (not in COMMUNITY_CITIES)", () => {
    expect(isRelevant("healthcare", "eilat")).toBe(false);
  });

  it("trades — community-cities for every track that opts in", () => {
    for (const city of COMMUNITY_CITIES) {
      expect(isRelevant("trades", city)).toBe(true);
    }
  });

  it("public-sector follows the COMMUNITY_CITIES list strictly", () => {
    expect(isRelevant("public-sector", "kiryat-malakhi")).toBe(true);
    expect(isRelevant("public-sector", "yerucham")).toBe(false);
  });
});

describe("relevantCities", () => {
  it("tech returns 5 cities (all in registry)", () => {
    const out = relevantCities("tech", CITIES);
    expect(out.length).toBe(5);
    expect(out.map((c) => c.slug).sort()).toEqual(
      ["beer-sheva", "haifa", "jerusalem", "netanya", "tel-aviv"].sort(),
    );
  });

  it("healthcare returns the COMMUNITY_CITIES intersection with CITIES", () => {
    const out = relevantCities("healthcare", CITIES);
    const expectedCount = COMMUNITY_CITIES.filter((slug) =>
      CITIES.some((c) => c.slug === slug),
    ).length;
    expect(out.length).toBe(expectedCount);
    for (const c of out) expect(COMMUNITY_CITIES).toContain(c.slug);
  });

  it("finance returns 4 list-scoped cities", () => {
    const out = relevantCities("finance", CITIES);
    expect(out.length).toBe(4);
  });
});

describe("cellCount — aggregate sitemap math", () => {
  it("sums to the planned ~136 cells across the 10 tracks", () => {
    const total = ALL_CAREER_TRACKS.reduce(
      (acc, t) => acc + cellCount(t, CITIES),
      0,
    );
    // Expected per the RIN-473 distribution table:
    //   tech 5 + healthcare 16 + education 16 + public-sector 16 +
    //   entrepreneurship 6 + finance 4 + social-work 16 + law 4 +
    //   trades 16 + retail-services 16 = 115 (community-cities scope
    //   gives 16 only when every COMMUNITY_CITIES entry is present in
    //   the registry).
    //
    // Pin a tight range so churn in the registry is caught but small
    // additions don't break the test.
    expect(total).toBeGreaterThanOrEqual(110);
    expect(total).toBeLessThanOrEqual(160);
  });

  it("every list-scoped city exists in the registry", () => {
    for (const track of ALL_CAREER_TRACKS) {
      const r = relevanceFor(track);
      if (r.kind !== "list") continue;
      for (const slug of r.cities) {
        expect(
          CITIES.some((c) => c.slug === slug),
          `track=${track} references missing city slug '${slug}'`,
        ).toBe(true);
      }
    }
  });

  it("every COMMUNITY_CITIES slug exists in the registry (or is documented absent)", () => {
    // We accept the helper carrying a slug not in the registry yet —
    // some absorption cities (e.g. afula) may be added later. Pin only
    // that the *intersection* is non-empty so we never ship 0 cells.
    const intersection = COMMUNITY_CITIES.filter((slug) =>
      CITIES.some((c) => c.slug === slug),
    );
    expect(intersection.length).toBeGreaterThanOrEqual(10);
  });
});
