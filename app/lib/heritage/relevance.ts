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
  // Ethiopian Orthodox church presence — limited to three cities today.
  genna: { kind: "list", cities: ["jerusalem", "haifa", "beer-sheva"] },
  "aliyah-day": { kind: "community-cities" },
  "beta-israel": { kind: "community-cities" },
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
