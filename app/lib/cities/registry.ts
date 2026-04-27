// City registry — static source for the Phase 3.4 programmatic SEO pages.
//
// 8 priority cities for the community per TED-16 description. The DB seed
// (`app/lib/db/seeds/cities.ts`) currently lists only 5 cities and uses a
// different cut (Ashdod vs. Ashkelon). This registry is the source of truth
// for the SEO pages until Tedros Data & Integrations expands the DB seed
// and we wire the route through Drizzle.
//
// Pure module: no DB, safe to import from a loader, an action, or a test.

import type { Locale } from "~/lib/i18n/config";

export type CityName = { he: string; en: string; am: string };

export type City = {
  slug: string; // URL slug — same in every locale (Latin, kebab-case)
  names: CityName;
  region: "south" | "center" | "north"; // for index grouping + meta
  // Approximate longitude/latitude — used in the City schema.org JSON-LD
  // for richer SERP snippets. Sourced from public Wikipedia coordinates;
  // not user-facing.
  geo: { lat: number; lon: number };
};

export const CITIES: City[] = [
  {
    slug: "netanya",
    names: { he: "נתניה", en: "Netanya", am: "ነታንያ" },
    region: "center",
    geo: { lat: 32.3329, lon: 34.8599 },
  },
  {
    slug: "rishon-lezion",
    names: { he: "ראשון לציון", en: "Rishon LeZion", am: "ሪሾን ለጽዮን" },
    region: "center",
    geo: { lat: 31.971, lon: 34.7892 },
  },
  {
    slug: "rehovot",
    names: { he: "רחובות", en: "Rehovot", am: "ረሆቮት" },
    region: "center",
    geo: { lat: 31.8928, lon: 34.8113 },
  },
  {
    slug: "ashkelon",
    names: { he: "אשקלון", en: "Ashkelon", am: "አሽከሎን" },
    region: "south",
    geo: { lat: 31.6688, lon: 34.5717 },
  },
  {
    slug: "kiryat-gat",
    names: { he: "קריית גת", en: "Kiryat Gat", am: "ቂርያት ጋት" },
    region: "south",
    geo: { lat: 31.6098, lon: 34.7642 },
  },
  {
    slug: "beer-sheva",
    names: { he: "באר שבע", en: "Be'er Sheva", am: "ቤር ሼቫ" },
    region: "south",
    geo: { lat: 31.2518, lon: 34.7913 },
  },
  {
    slug: "haifa",
    names: { he: "חיפה", en: "Haifa", am: "ሐይፋ" },
    region: "north",
    geo: { lat: 32.794, lon: 34.9896 },
  },
  {
    slug: "kiryat-malakhi",
    names: { he: "קריית מלאכי", en: "Kiryat Malakhi", am: "ቂርያት ማላኪ" },
    region: "south",
    geo: { lat: 31.7311, lon: 34.7466 },
  },
];

const BY_SLUG = new Map<string, City>(CITIES.map((c) => [c.slug, c]));

export function findCityBySlug(slug: string): City | undefined {
  return BY_SLUG.get(slug);
}

export function cityName(city: City, locale: Locale): string {
  return city.names[locale] ?? city.names.he;
}

export const CITY_PATH_PREFIX = "/cities";

export function cityPath(locale: Locale, slug: string): string {
  return `/${locale}${CITY_PATH_PREFIX}/${slug}`;
}
