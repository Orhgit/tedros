import { describe, expect, it } from "vitest";

import { findCityBySlug } from "../app/lib/cities/registry";
import { SUPPORTED_LOCALES } from "../app/lib/i18n/config";
import {
  aggregateUnits,
  CITY_URBAN_RENEWAL_KEYWORDS,
  CITY_URBAN_RENEWAL_SLUGS,
  cityUrbanRenewalKeyword,
  citySources,
  distinctUnitNotes,
} from "../app/lib/urban-renewal/city-aggregate";
import { neighborhoodsByCity } from "../app/lib/urban-renewal/registry";

describe("CITY_URBAN_RENEWAL_SLUGS (TED-94)", () => {
  it("is exactly the 7 cities with a T3 neighborhood registered", () => {
    expect(new Set(CITY_URBAN_RENEWAL_SLUGS)).toEqual(
      new Set([
        "rehovot",
        "rishon-lezion",
        "netanya",
        "kiryat-gat",
        "kiryat-malakhi",
        "lod",
        "beer-sheva",
      ]),
    );
    expect(CITY_URBAN_RENEWAL_SLUGS.length).toBe(7);
  });

  it("every slug resolves against the city registry", () => {
    for (const slug of CITY_URBAN_RENEWAL_SLUGS) {
      expect(findCityBySlug(slug), `unknown city ${slug}`).toBeTruthy();
    }
  });

  it("every slug has a non-empty keyword in every locale", () => {
    for (const slug of CITY_URBAN_RENEWAL_SLUGS) {
      for (const locale of SUPPORTED_LOCALES) {
        expect(cityUrbanRenewalKeyword(slug, locale)).toBeTruthy();
      }
    }
  });

  it("does not define a keyword for a city with no registered neighborhoods", () => {
    expect(CITY_URBAN_RENEWAL_KEYWORDS["tel-aviv"]).toBeUndefined();
    expect(cityUrbanRenewalKeyword("tel-aviv", "he")).toBe("");
  });

  it("uses the pinui-binui keyword for Kiryat Malakhi and Lod, urban-renewal for the rest", () => {
    expect(cityUrbanRenewalKeyword("kiryat-malakhi", "he")).toContain("פינוי בינוי");
    expect(cityUrbanRenewalKeyword("lod", "he")).toContain("פינוי בינוי");
    expect(cityUrbanRenewalKeyword("netanya", "he")).toContain("התחדשות עירונית");
    expect(cityUrbanRenewalKeyword("beer-sheva", "he")).toContain("התחדשות עירונית");
  });
});

describe("aggregateUnits", () => {
  it("sums only neighborhoods with a published numeric figure (Rishon LeZion: 1/1)", () => {
    const agg = aggregateUnits(neighborhoodsByCity("rishon-lezion"));
    expect(agg.total).toBe(7200);
    expect(agg.countedSlugs).toEqual(["ramat-eliyahu-rishon-lezion"]);
    expect(agg.noteOnlySlugs).toEqual([]);
  });

  it("sums Rehovot's Tama'l 1086 figure (8,700 planned units)", () => {
    const agg = aggregateUnits(neighborhoodsByCity("rehovot"));
    expect(agg.total).toBe(8700);
    expect(agg.countedSlugs).toEqual(["kiryat-moshe-rehovot"]);
  });

  it("sums Lod's Ramat Ashkol figure (5,200 planned units)", () => {
    const agg = aggregateUnits(neighborhoodsByCity("lod"));
    expect(agg.total).toBe(5200);
  });

  it("only counts Netanya's Sela figure (116) — the shared Dora/Neot Shaked/Kiryat Nordau note is never summed as a number", () => {
    const agg = aggregateUnits(neighborhoodsByCity("netanya"));
    expect(agg.total).toBe(116);
    expect(agg.countedSlugs).toEqual(["sela-netanya"]);
    expect(agg.noteOnlySlugs).toEqual(
      expect.arrayContaining([
        "dora-netanya",
        "neot-shaked-netanya",
        "kiryat-nordau-netanya",
      ]),
    );
  });

  it("sums Kiryat Gat's Shevet Israel (2,300) and Komemiyut-Yaski (1,552) figures — Rova HaNevi'im's shared-budget note is not summed", () => {
    const agg = aggregateUnits(neighborhoodsByCity("kiryat-gat"));
    expect(agg.total).toBe(3852);
    expect(agg.countedSlugs).toEqual(
      expect.arrayContaining(["shvat-israel-kiryat-gat", "komemiyut-yaski-kiryat-gat"]),
    );
    expect(agg.countedSlugs.length).toBe(2);
  });

  it("has zero numeric total for Kiryat Malakhi — all 4 compounds only cite the shared ~4,000 note", () => {
    const agg = aggregateUnits(neighborhoodsByCity("kiryat-malakhi"));
    expect(agg.total).toBe(0);
    expect(agg.countedSlugs).toEqual([]);
    expect(agg.noteOnlySlugs.length).toBe(4);
  });

  it("has zero numeric total for Be'er Sheva — the project is still at the planning stage", () => {
    const agg = aggregateUnits(neighborhoodsByCity("beer-sheva"));
    expect(agg.total).toBe(0);
  });

  it("returns zero total and empty arrays for an empty neighborhood list", () => {
    const agg = aggregateUnits([]);
    expect(agg).toEqual({ total: 0, countedSlugs: [], noteOnlySlugs: [] });
  });
});

describe("distinctUnitNotes", () => {
  it("dedupes the shared Dora/Neot Shaked cluster note in Netanya (3 note-only neighborhoods, 1 distinct note)", () => {
    const notes = distinctUnitNotes(neighborhoodsByCity("netanya"));
    // dora, neot-shaked share one note; kiryat-nordau has its own distinct note;
    // sela has both numeric fields AND a note (phase-one vs overall-plan detail).
    expect(notes.length).toBe(3);
  });

  it("dedupes Kiryat Malakhi's Moshe Sharet + Herzl notes (identical text) while keeping Kibbutz Galuyot and Chabad's distinctly-worded notes", () => {
    const notes = distinctUnitNotes(neighborhoodsByCity("kiryat-malakhi"));
    // 4 compounds, but moshe-sharet and herzl cite the exact same sentence.
    expect(notes.length).toBe(3);
    expect(notes.every((n) => n.he.includes("4,000"))).toBe(true);
  });
});

describe("citySources", () => {
  it("unions and dedupes sources across a city's neighborhoods", () => {
    const sources = citySources(neighborhoodsByCity("netanya"));
    expect(sources.length).toBeGreaterThan(0);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("returns an empty array for a city with no neighborhoods", () => {
    expect(citySources([])).toEqual([]);
  });
});
