// Heritage event × city relevance map (RIN-422 — programmatic SEO).
//
// Mirrors `lib/rights/relevance.ts` so the routing layer
// (`/heritage/events/$event/$city`) can use the same shape.
//
// Sigd: every absorption city hosts regional ceremonies → community-cities.
// Genna: only 3 Ethiopian Orthodox church locations → list.
// Aliyah Day: every absorption city hosts local commemorations →
// community-cities.

import type { City } from "../cities/registry";
import type { HeritageEventSlug } from "./categories";

export type Relevance =
  | { kind: "all" }
  | { kind: "community-cities" }
  | { kind: "list"; cities: string[] };

// Same 16 absorption cities used by `lib/rights/relevance.ts`. Re-declared
// here to avoid a cross-vertical dependency.
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

const RELEVANCE_BY_EVENT: Record<HeritageEventSlug, Relevance> = {
  sigd: { kind: "community-cities" },
  genna: { kind: "list", cities: ["jerusalem", "haifa", "beer-sheva"] },
  "aliyah-day": { kind: "community-cities" },
  "beta-israel": { kind: "community-cities" },
  // Culture article slugs — national relevance (all cities)
  "sigd-meaning": { kind: "community-cities" },
  "beta-israel-history": { kind: "community-cities" },
  "operation-solomon-1991": { kind: "community-cities" },
  "operation-moses-1984": { kind: "community-cities" },
  "kessim-priests": { kind: "community-cities" },
  "orit-holy-book": { kind: "community-cities" },
  "geez-sacred-language": { kind: "community-cities" },
  "ethiopian-israeli-music": { kind: "community-cities" },
  "ethiopian-cuisine-recipes": { kind: "community-cities" },
  "coffee-ceremony": { kind: "community-cities" },
  "traditional-dress": { kind: "community-cities" },
  "ethiopian-wedding": { kind: "community-cities" },
  "20-sivan-memorial": { kind: "community-cities" },
  "aliyah-day-june": { kind: "community-cities" },
  "notable-ethiopian-israelis": { kind: "community-cities" },
  "second-generation-identity": { kind: "community-cities" },
  "traditional-crafts": { kind: "community-cities" },
  "ethiopian-athletes": { kind: "community-cities" },
  "digital-diaspora": { kind: "community-cities" },
  "amharic-learning": { kind: "community-cities" },
  "amharic-proverbs": { kind: "community-cities" },
  "blood-affair-1996": { kind: "community-cities" },
  "media-representation": { kind: "community-cities" },
  "heritage-center": { kind: "community-cities" },
  "festivals-holagav": { kind: "community-cities" },
  "literature-creativity": { kind: "community-cities" },
  "olympic-athletes": { kind: "community-cities" },
  "visual-artists": { kind: "community-cities" },
  "famous-musicians": { kind: "community-cities" },
  "israel-ethiopia-relations": { kind: "community-cities" },
};

export function relevanceFor(event: HeritageEventSlug): Relevance {
  return RELEVANCE_BY_EVENT[event];
}

export function isRelevant(event: HeritageEventSlug, citySlug: string): boolean {
  const rel = relevanceFor(event);
  switch (rel.kind) {
    case "all":
      return true;
    case "community-cities":
      return COMMUNITY_CITIES.includes(citySlug);
    case "list":
      return rel.cities.includes(citySlug);
  }
}

export function relevantCities(event: HeritageEventSlug, allCities: City[]): City[] {
  const rel = relevanceFor(event);
  switch (rel.kind) {
    case "all":
      return allCities;
    case "community-cities":
      return allCities.filter((c) => COMMUNITY_CITIES.includes(c.slug));
    case "list":
      return allCities.filter((c) => rel.cities.includes(c.slug));
  }
}
