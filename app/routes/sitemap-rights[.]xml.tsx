import { CITIES } from "~/lib/cities/registry";
import { PRIORITY_RIGHTS } from "~/lib/db/seeds/rights";
import { getEnv } from "~/lib/env.server";
import { relevantCities } from "~/lib/rights/relevance";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * Rights sitemap — right detail pages + rights×city programmatic cells.
 * ~600 cells filtered by relevance + ~50 right pages = ~650 × 3 locales ≈ 1,950 URLs.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const rightPaths = PRIORITY_RIGHTS.map((r) => `/rights/${r.slug.he}`);

  const cellPaths: string[] = [];
  for (const right of PRIORITY_RIGHTS) {
    for (const city of relevantCities(right.slug.he, CITIES)) {
      cellPaths.push(`/rights/${right.slug.he}/${city.slug}`);
    }
  }

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, [...rightPaths, ...cellPaths]));
}
