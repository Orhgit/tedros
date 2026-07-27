import { describe, expect, it } from "vitest";
import { findCityBySlug } from "../app/lib/cities/registry";
import { SUPPORTED_LOCALES } from "../app/lib/i18n/config";
import {
  findNeighborhoodBySlug,
  localized,
  neighborhoodName,
  neighborhoodPath,
  neighborhoodsByCity,
  URBAN_RENEWAL_NEIGHBORHOODS,
  URBAN_RENEWAL_PATH_PREFIX,
} from "../app/lib/urban-renewal/registry";

describe("urban-renewal registry", () => {
  it("includes the 5 original priority neighborhoods plus 9 TED-93 + 1 TED-97 (15 total)", () => {
    const slugs = new Set(URBAN_RENEWAL_NEIGHBORHOODS.map((n) => n.slug));
    const original = [
      "kiryat-moshe-rehovot",
      "ramat-eliyahu-rishon-lezion",
      "dora-netanya",
      "neot-shaked-netanya",
      "kiryat-nordau-netanya",
    ];
    for (const s of original) {
      expect(slugs.has(s), `missing original neighborhood: ${s}`).toBe(true);
    }
    expect(URBAN_RENEWAL_NEIGHBORHOODS.length).toBe(15);
  });

  it("includes the verified 15th Kiryat Gat neighborhood (TED-96/TED-97)", () => {
    const slugs = URBAN_RENEWAL_NEIGHBORHOODS.map((n) => n.slug);
    expect(slugs).toContain("komemiyut-yaski-kiryat-gat");
    const n = findNeighborhoodBySlug("komemiyut-yaski-kiryat-gat")!;
    expect(n.name.he).toBe("מתחם קוממיות-יסקי");
    expect(n.citySlug).toBe("kiryat-gat");
  });

  it("has unique slugs in `<neighborhood>-<city>` kebab-case form", () => {
    const slugs = URBAN_RENEWAL_NEIGHBORHOODS.map((n) => n.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every neighborhood references a real city in the city registry", () => {
    for (const n of URBAN_RENEWAL_NEIGHBORHOODS) {
      const city = findCityBySlug(n.citySlug);
      expect(
        city,
        `neighborhood ${n.slug} references unknown city ${n.citySlug}`,
      ).toBeTruthy();
    }
  });

  it("has non-empty name, status, authority, and communityContext in every locale", () => {
    for (const n of URBAN_RENEWAL_NEIGHBORHOODS) {
      for (const loc of SUPPORTED_LOCALES) {
        expect(n.name[loc]).toBeTruthy();
        expect(n.status[loc]).toBeTruthy();
        expect(n.status[loc].length).toBeGreaterThan(40);
        expect(n.authority[loc]).toBeTruthy();
        expect(n.communityContext[loc]).toBeTruthy();
        expect(n.communityContext[loc].length).toBeGreaterThan(40);
      }
    }
  });

  it("has at least one source per neighborhood", () => {
    for (const n of URBAN_RENEWAL_NEIGHBORHOODS) {
      expect(n.sources.length).toBeGreaterThan(0);
    }
  });

  it("has a resolvable `rights` slug for the legal-aid pointer", () => {
    for (const n of URBAN_RENEWAL_NEIGHBORHOODS) {
      expect(n.rightSlug).toBeTruthy();
    }
  });

  it("either has before+after unit counts or a descriptive note, never neither", () => {
    for (const n of URBAN_RENEWAL_NEIGHBORHOODS) {
      const hasNumbers = n.units.before !== undefined || n.units.after !== undefined;
      const hasNote = !!n.units.note;
      expect(hasNumbers || hasNote, `neighborhood ${n.slug} has no unit info`).toBe(true);
    }
  });
});

describe("findNeighborhoodBySlug", () => {
  it("returns the neighborhood for a known slug", () => {
    const n = findNeighborhoodBySlug("dora-netanya");
    expect(n?.name.he).toBe("דורה");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findNeighborhoodBySlug("atlantis")).toBeUndefined();
  });
});

describe("neighborhoodsByCity", () => {
  it("groups Netanya's 3 original + 1 new neighborhood together", () => {
    const netanya = neighborhoodsByCity("netanya");
    const slugs = netanya.map((n) => n.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "dora-netanya",
        "neot-shaked-netanya",
        "kiryat-nordau-netanya",
        "sela-netanya",
      ]),
    );
  });

  it("groups Kiryat Malakhi's 4 compounds together", () => {
    const km = neighborhoodsByCity("kiryat-malakhi");
    expect(km.length).toBe(4);
  });

  it("returns an empty array for a city with no neighborhoods", () => {
    expect(neighborhoodsByCity("tel-aviv")).toEqual([]);
  });
});

describe("neighborhoodName / neighborhoodPath / localized helpers", () => {
  const dora = findNeighborhoodBySlug("dora-netanya")!;

  it("returns the locale-specific name", () => {
    expect(neighborhoodName(dora, "he")).toBe("דורה");
    expect(neighborhoodName(dora, "en")).toBe("Dora");
    expect(neighborhoodName(dora, "am")).toBe("ዶራ");
  });

  it("falls back to Hebrew when a locale is missing", () => {
    const stripped = { ...dora, name: { he: dora.name.he } as never };
    expect(neighborhoodName(stripped, "en")).toBe(dora.name.he);
  });

  it("builds the canonical neighborhood URL per locale", () => {
    expect(neighborhoodPath("he", dora.slug)).toBe(
      `/he${URBAN_RENEWAL_PATH_PREFIX}/dora-netanya`,
    );
    expect(neighborhoodPath("en", dora.slug)).toBe(
      `/en${URBAN_RENEWAL_PATH_PREFIX}/dora-netanya`,
    );
  });

  it("localized() reads the right locale key with Hebrew fallback", () => {
    expect(localized(dora.status, "he")).toBe(dora.status.he);
    expect(localized({ he: "x" } as never, "en")).toBe("x");
  });
});
