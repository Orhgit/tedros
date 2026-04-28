import { describe, expect, it } from "vitest";
import {
  CITIES,
  CITY_PATH_PREFIX,
  cityName,
  cityOverview,
  cityPath,
  findCityBySlug,
} from "../app/lib/cities/registry";
import { SUPPORTED_LOCALES } from "../app/lib/i18n/config";

describe("city registry", () => {
  it("ships the eight cities specified by TED-16 §3.4", () => {
    const slugs = CITIES.map((c) => c.slug).sort();
    expect(slugs).toEqual(
      [
        "ashkelon",
        "beer-sheva",
        "haifa",
        "kiryat-gat",
        "kiryat-malakhi",
        "netanya",
        "rehovot",
        "rishon-lezion",
      ].sort(),
    );
  });

  it("has unique kebab-case slugs", () => {
    const slugs = CITIES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
    }
  });

  it("has a non-empty name in every supported locale", () => {
    for (const c of CITIES) {
      for (const loc of SUPPORTED_LOCALES) {
        expect(c.names[loc]).toBeTruthy();
      }
    }
  });

  it("has plausible Israeli geo coordinates", () => {
    for (const c of CITIES) {
      expect(c.geo.lat).toBeGreaterThan(29);
      expect(c.geo.lat).toBeLessThan(34);
      expect(c.geo.lon).toBeGreaterThan(34);
      expect(c.geo.lon).toBeLessThan(36);
    }
  });

  it("has a substantive, non-empty overview in every supported locale", () => {
    // Each city page renders this paragraph as the primary unique content
    // (~280-340 chars). Guard against thin/duplicate-content regressions.
    for (const c of CITIES) {
      for (const loc of SUPPORTED_LOCALES) {
        expect(c.overview[loc]).toBeTruthy();
        expect(c.overview[loc].length).toBeGreaterThan(120);
      }
    }
  });
});

describe("findCityBySlug", () => {
  it("returns the city for a known slug", () => {
    const c = findCityBySlug("netanya");
    expect(c?.names.he).toBe("נתניה");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findCityBySlug("atlantis")).toBeUndefined();
  });
});

describe("cityName / cityPath helpers", () => {
  const netanya = findCityBySlug("netanya")!;

  it("falls back to Hebrew when a locale name is missing", () => {
    // Build a stripped clone where only `he` is defined to exercise the
    // documented fallback. Cast to `never` to bypass the strict CityName
    // shape — production data always has all three.
    const stripped = {
      ...netanya,
      names: { he: netanya.names.he } as never,
    };
    expect(cityName(stripped, "en")).toBe(netanya.names.he);
    expect(cityName(stripped, "am")).toBe(netanya.names.he);
  });

  it("returns the locale-specific name when present", () => {
    expect(cityName(netanya, "he")).toBe("נתניה");
    expect(cityName(netanya, "en")).toBe("Netanya");
    expect(cityName(netanya, "am")).toBe("ነታንያ");
  });

  it("builds the canonical city URL for each locale", () => {
    expect(cityPath("he", netanya.slug)).toBe(`/he${CITY_PATH_PREFIX}/netanya`);
    expect(cityPath("en", netanya.slug)).toBe(`/en${CITY_PATH_PREFIX}/netanya`);
    expect(cityPath("am", netanya.slug)).toBe(`/am${CITY_PATH_PREFIX}/netanya`);
  });

  it("returns the locale-specific overview when present", () => {
    expect(cityOverview(netanya, "he")).toContain("נתניה");
    expect(cityOverview(netanya, "en")).toContain("Netanya");
    expect(cityOverview(netanya, "am")).toContain("ነታንያ");
  });
});
