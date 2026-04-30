// Right × city relevance map (RIN-339 — programmatic SEO).
//
// Determines which (right, city) pairs deserve their own page. The default
// is "all" — the right applies nationwide and we generate a cell for every
// city. Some rights are hyper-local (urban renewal in 3 specific
// neighborhoods) or partner-bound (Tene Briut clinics in specific cities)
// — those get a `list` scope so we don't ship 38 thin pages each.
//
// Pure module. Pull this into the route loader, sitemap loader, and tests.

import type { City } from "../cities/registry";

export type Relevance =
  | { kind: "all" }
  | { kind: "community-cities" }
  | { kind: "list"; cities: string[] };

// Cities with material Ethiopian-Israeli community presence per CBS 2024
// + community-services research (`02-community-needs-deep-dive.md`).
// Used by `community-cities` rights — programs that exist nationally but
// only have local infrastructure / outreach in these cities.
export const COMMUNITY_CITIES = [
  "netanya",
  "rishon-lezion",
  "rehovot",
  "ashkelon",
  "ashdod",
  "beer-sheva",
  "kiryat-gat",
  "kiryat-malakhi",
  "petach-tikva",
  "haifa",
  "jerusalem",
  "holon",
  "bat-yam",
  "lod",
  "ramla",
  "afula",
];

// Per-slug relevance. Rights that omit an entry default to `{ kind: "all" }`.
const RELEVANCE_BY_SLUG: Record<string, Relevance> = {
  // Urban-renewal rights are tied to a specific neighborhood / city.
  "urban-renewal-kiryat-moshe": { kind: "list", cities: ["rehovot"] },
  "urban-renewal-ramat-eliyahu": { kind: "list", cities: ["rishon-lezion"] },
  "urban-renewal-netanya": { kind: "list", cities: ["netanya"] },

  // Falash Mura direct-absorption pilot — only the 4 pilot cities per
  // Vision v2 §"Phase 6" + the seed body.
  "falash-mura-direct-absorption": {
    kind: "list",
    cities: ["netanya", "rishon-lezion", "rehovot", "kiryat-malakhi"],
  },

  // Tene Briut, ENP, and other community partner programs operate in
  // specific cities only.
  "tene-briut-mental-health": { kind: "community-cities" },
  "chronic-disease-prevention": { kind: "community-cities" },
  "medical-translation": { kind: "community-cities" },
  "matriculation-grant": { kind: "community-cities" }, // ENP 32-city net
  "youth-mentorship": { kind: "community-cities" },
  "family-counseling": { kind: "community-cities" },
  "kessim-religious-support": { kind: "community-cities" },
  "sigd-funding": { kind: "community-cities" },
  "domestic-violence-support": { kind: "community-cities" },
  "ujia-kiedf-business-loans": { kind: "community-cities" },

  // Tech-Career bootcamps are physical campuses in the major hubs.
  "tech-career-bootcamp": {
    kind: "list",
    cities: ["tel-aviv", "beer-sheva", "haifa"],
  },

  // Hesegim has a national reach but most students concentrate in
  // university cities.
  "hesegim-scholarships": { kind: "community-cities" },
  "excellence-employment": { kind: "community-cities" },
  "student-aid": { kind: "community-cities" },

  // Aharai! pre-army has cohorts in major community cities.
  "aharai-pre-army": { kind: "community-cities" },
};

export function relevanceFor(slug: string): Relevance {
  return RELEVANCE_BY_SLUG[slug] ?? { kind: "all" };
}

export function isRelevant(rightSlug: string, citySlug: string): boolean {
  const rel = relevanceFor(rightSlug);
  switch (rel.kind) {
    case "all":
      return true;
    case "community-cities":
      return COMMUNITY_CITIES.includes(citySlug);
    case "list":
      return rel.cities.includes(citySlug);
  }
}

export function relevantCities(rightSlug: string, allCities: City[]): City[] {
  const rel = relevanceFor(rightSlug);
  switch (rel.kind) {
    case "all":
      return allCities;
    case "community-cities":
      return allCities.filter((c) => COMMUNITY_CITIES.includes(c.slug));
    case "list":
      return allCities.filter((c) => rel.cities.includes(c.slug));
  }
}
