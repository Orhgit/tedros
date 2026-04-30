import { describe, expect, it } from "vitest";

import { CITIES } from "../app/lib/cities/registry";
import {
  COMMUNITY_CITIES,
  isRelevant,
  relevanceFor,
  relevantCities,
} from "../app/lib/rights/relevance";

describe("relevanceFor", () => {
  it("defaults to 'all' when slug is unknown", () => {
    expect(relevanceFor("does-not-exist")).toEqual({ kind: "all" });
  });

  it("'all' for nationally-applicable rights (e.g. immigrant-tax-relief)", () => {
    // Default to all unless explicitly mapped — tax relief isn't mapped, so
    // it should be 'all'.
    expect(relevanceFor("immigrant-tax-relief")).toEqual({ kind: "all" });
  });

  it("'list' for hyper-local urban-renewal rights", () => {
    expect(relevanceFor("urban-renewal-kiryat-moshe")).toEqual({
      kind: "list",
      cities: ["rehovot"],
    });
  });

  it("'community-cities' for community-served programs", () => {
    expect(relevanceFor("tene-briut-mental-health")).toEqual({
      kind: "community-cities",
    });
  });
});

describe("isRelevant", () => {
  it("'all' rights are relevant in any city", () => {
    // klita-basket defaults to "all" (no entry).
    expect(isRelevant("klita-basket", "netanya")).toBe(true);
    expect(isRelevant("klita-basket", "tiberias")).toBe(true);
    expect(isRelevant("klita-basket", "eilat")).toBe(true);
  });

  it("urban-renewal-kiryat-moshe only in rehovot", () => {
    expect(isRelevant("urban-renewal-kiryat-moshe", "rehovot")).toBe(true);
    expect(isRelevant("urban-renewal-kiryat-moshe", "netanya")).toBe(false);
    expect(isRelevant("urban-renewal-kiryat-moshe", "tel-aviv")).toBe(false);
  });

  it("community-cities filter respects the COMMUNITY_CITIES list", () => {
    expect(isRelevant("tene-briut-mental-health", "netanya")).toBe(true);
    expect(isRelevant("tene-briut-mental-health", "kiryat-malakhi")).toBe(true);
    expect(isRelevant("tene-briut-mental-health", "tiberias")).toBe(false);
    expect(isRelevant("tene-briut-mental-health", "eilat")).toBe(false);
  });

  it("falash-mura limited to its 4 pilot cities", () => {
    for (const city of ["netanya", "rishon-lezion", "rehovot", "kiryat-malakhi"]) {
      expect(isRelevant("falash-mura-direct-absorption", city)).toBe(true);
    }
    expect(isRelevant("falash-mura-direct-absorption", "tel-aviv")).toBe(false);
  });
});

describe("relevantCities", () => {
  it("returns all 38 cities for an 'all' right", () => {
    expect(relevantCities("klita-basket", CITIES).length).toBe(CITIES.length);
  });

  it("returns 1 city for urban-renewal-kiryat-moshe", () => {
    const out = relevantCities("urban-renewal-kiryat-moshe", CITIES);
    expect(out.length).toBe(1);
    expect(out[0]?.slug).toBe("rehovot");
  });

  it("returns COMMUNITY_CITIES intersection for community-cities scope", () => {
    const out = relevantCities("tene-briut-mental-health", CITIES);
    // Every returned city is in the community list.
    for (const c of out) expect(COMMUNITY_CITIES).toContain(c.slug);
    // Every community-cities city is included if it exists in CITIES.
    const presentCommunityCities = COMMUNITY_CITIES.filter((slug) =>
      CITIES.some((c) => c.slug === slug),
    );
    expect(out.length).toBe(presentCommunityCities.length);
  });
});
