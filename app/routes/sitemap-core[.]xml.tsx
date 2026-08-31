import { CITIES, CITY_PATH_PREFIX } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";
import { CITY_URBAN_RENEWAL_SLUGS } from "~/lib/urban-renewal/city-aggregate";
import {
  URBAN_RENEWAL_NEIGHBORHOODS,
  URBAN_RENEWAL_PATH_PREFIX,
} from "~/lib/urban-renewal/registry";

/**
 * Core sitemap — homepage, pillars, cities, calculators, static pages.
 * ~60 paths × 3 locales = ~180 URLs.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const paths = [
    "",
    "/calculator/mortgage-ethiopian-immigrants",
    // NOTE: /calculator/mortgage is a noindex lead-form stub (TED-22 mock) —
    // listing it here contradicted its robots meta (TED-119).
    "/about",
    "/privacy",
    "/rights",
    "/careers",
    "/education",
    "/health",
    "/heritage/events",
    "/heritage/marriage",
    "/news",
    "/glossary",
    "/orgs",
    "/programs",
    "/compare",
    "/statistics",
    "/professionals",
    "/cities",
    "/family",
    "/family/domestic-violence",
    "/family/elderly",
    "/family/women-empowerment",
    "/family/mourning",
    "/voice",
    "/voice/community-action",
    "/voice/police-conduct",
    "/voice/racism-report",
    "/voice/street-stop",
    "/listings",
    CITY_PATH_PREFIX,
    ...CITIES.map((c) => `${CITY_PATH_PREFIX}/${c.slug}`),
    URBAN_RENEWAL_PATH_PREFIX,
    ...URBAN_RENEWAL_NEIGHBORHOODS.map((n) => `${URBAN_RENEWAL_PATH_PREFIX}/${n.slug}`),
    ...CITY_URBAN_RENEWAL_SLUGS.map(
      (slug) => `${CITY_PATH_PREFIX}/${slug}/urban-renewal`,
    ),
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths));
}
