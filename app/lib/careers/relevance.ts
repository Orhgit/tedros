// Career-track × city relevance map (RIN-473 — programmatic SEO Wave 3).
//
// Determines which (track, city) pairs deserve their own page. Mirrors
// `lib/rights/relevance.ts` so the routing layer (`/careers/$track/$city`)
// can use the same shape.
//
// Default for tracks with broad applicability is `community-cities` (all
// 16 absorption cities). Tech / finance / law concentrate in specific
// metro hubs, so they use `list` to avoid shipping thin pages elsewhere.
//
// Pure module. Pull this into the route loader, sitemap loader, and tests.

import type { City } from "../cities/registry";
import type { CareerTrack } from "./categories";

export type Relevance =
  | { kind: "all" }
  | { kind: "community-cities" }
  | { kind: "list"; cities: string[] };

// Cities with material Ethiopian-Israeli community presence. Re-uses the
// same 16 absorption cities defined in `lib/rights/relevance.ts`. Kept
// duplicated here (small list, infrequent change) so this module stays
// independent of the rights helper.
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

// Per-track relevance. Tracks that omit an entry default to
// `{ kind: "community-cities" }` — the safest default for community-facing
// employment surfaces (ships ≤16 cells per track, never the full 38).
const RELEVANCE_BY_TRACK: Record<CareerTrack, Relevance> = {
  // Tech bootcamps and partner companies cluster in 5 metro hubs.
  tech: {
    kind: "list",
    cities: ["tel-aviv", "haifa", "jerusalem", "beer-sheva", "netanya"],
  },

  // Health navigators / nursing / community-health roles are needed in
  // every absorption city — Tene Briut targets all of them.
  healthcare: { kind: "community-cities" },

  // Schools exist in every absorption city. ENP teaching corps too.
  education: { kind: "community-cities" },

  // Civil service positions exist nationwide; absorption cities are the
  // densest source of community applicants.
  "public-sector": { kind: "community-cities" },

  // Entrepreneurship hubs / accelerators cluster in 6 metro centers.
  entrepreneurship: {
    kind: "list",
    cities: ["tel-aviv", "haifa", "jerusalem", "beer-sheva", "netanya", "rehovot"],
  },

  // Finance jobs concentrate in 4 metro hubs (Israeli finance reality —
  // ramat-gan would be a 5th but is not in the city registry).
  finance: {
    kind: "list",
    cities: ["tel-aviv", "jerusalem", "haifa", "netanya"],
  },

  // Welfare offices and community centers exist in every absorption city.
  "social-work": { kind: "community-cities" },

  // Law firms cluster in 4 hubs.
  law: {
    kind: "list",
    cities: ["tel-aviv", "jerusalem", "haifa", "beer-sheva"],
  },

  // Trades demand exists everywhere; absorption cities prefer community
  // professionals.
  trades: { kind: "community-cities" },

  // Retail demand follows population density — present everywhere, but
  // we ship only community-cities to avoid duplication with general
  // `/cities/$slug` retail content.
  "retail-services": { kind: "community-cities" },
};

export function relevanceFor(track: CareerTrack): Relevance {
  return RELEVANCE_BY_TRACK[track];
}

export function isRelevant(track: CareerTrack, citySlug: string): boolean {
  const rel = relevanceFor(track);
  switch (rel.kind) {
    case "all":
      return true;
    case "community-cities":
      return COMMUNITY_CITIES.includes(citySlug);
    case "list":
      return rel.cities.includes(citySlug);
  }
}

export function relevantCities(track: CareerTrack, allCities: City[]): City[] {
  const rel = relevanceFor(track);
  switch (rel.kind) {
    case "all":
      return allCities;
    case "community-cities":
      return allCities.filter((c) => COMMUNITY_CITIES.includes(c.slug));
    case "list":
      return allCities.filter((c) => rel.cities.includes(c.slug));
  }
}

// Total cell count per track — useful for sitemap planning + tests.
export function cellCount(track: CareerTrack, allCities: City[]): number {
  return relevantCities(track, allCities).length;
}
