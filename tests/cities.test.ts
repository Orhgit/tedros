import { describe, expect, it } from "vitest";
import {
  CITIES,
  CITY_PATH_PREFIX,
  cityName,
  cityPath,
  findCityBySlug,
} from "../app/lib/cities/registry";
// Long-form prose moved to a server-only module under ADR-020; the coverage
// guarantees below are unchanged, they just read from its new home.
import { CITY_CONTENT, cityOverview } from "../app/lib/cities/content.server";
import { SUPPORTED_LOCALES } from "../app/lib/i18n/config";

describe("city registry", () => {
  it("includes the original eight priority cities from TED-16 §3.4 and expands to all major community cities", () => {
    const slugs = new Set(CITIES.map((c) => c.slug));
    const priorityEight = [
      "ashkelon",
      "beer-sheva",
      "haifa",
      "kiryat-gat",
      "kiryat-malakhi",
      "netanya",
      "rehovot",
      "rishon-lezion",
    ];
    for (const s of priorityEight) {
      expect(slugs.has(s), `missing priority city: ${s}`).toBe(true);
    }
    expect(CITIES.length).toBeGreaterThanOrEqual(30);
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
      const overview = CITY_CONTENT[c.slug]?.overview;
      if (!overview) throw new Error(`no overview content for "${c.slug}"`);
      for (const loc of SUPPORTED_LOCALES) {
        expect(overview[loc]).toBeTruthy();
        expect(overview[loc].length).toBeGreaterThan(70);
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
    expect(cityOverview(netanya.slug, "he")).toContain("נתניה");
    expect(cityOverview(netanya.slug, "en")).toContain("Netanya");
    expect(cityOverview(netanya.slug, "am")).toContain("ነታንያ");
  });
});
