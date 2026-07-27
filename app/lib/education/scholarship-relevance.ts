// Scholarship × city relevance (RIN-508 / Phase 5 Wave 3).
//
// Pure relevance helper. Determines which (scholarship, city) cells deserve
// their own page. Scholarships in the seed are nationally available, so the
// relevance scope is purely about SEO discipline:
//   only render cells where the city has a material Ethiopian-Israeli
//   community presence — otherwise the cell is duplicate of the
//   national scholarship page and would be a thin-content SEO penalty.
//
// Ships 5 top-community cities × N scholarships (N grows per content wave —
// see SCHOLARSHIPS.length, do not hardcode a specific product here or in
// tests/scholarship-relevance.test.ts). This list will grow with the
// community-cities list as CBS data updates.
//
// Pattern mirrors `lib/rights/relevance.ts` (RIN-339).

import type { City } from "../cities/registry";

// Top 5 cities by community population per CBS 2024 + community research
// (`docs/research/02-community-needs-deep-dive.md`). These are the cities
// where a "scholarship X in city Y" search has a real audience.
export const SCHOLARSHIP_RELEVANCE_CITIES = [
  "netanya",
  "rishon-lezion",
  "rehovot",
  "ashkelon",
  "beer-sheva",
];

const CITY_SET = new Set(SCHOLARSHIP_RELEVANCE_CITIES);

export function isScholarshipCellRelevant(citySlug: string): boolean {
  return CITY_SET.has(citySlug);
}

export function relevantScholarshipCities(allCities: City[]): City[] {
  return allCities.filter((c) => CITY_SET.has(c.slug));
}
