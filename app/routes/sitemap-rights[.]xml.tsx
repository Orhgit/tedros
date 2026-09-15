import { PRIORITY_RIGHTS } from "~/lib/db/seeds/rights";
import { getEnv } from "~/lib/env.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * Rights sitemap — right detail pages only.
 *
 * TED-172: the ~2,138 rights×city cells 301 to their right page while
 * CITY_CELLS_ENABLED is false in `$lang.rights.$slug_.$city.tsx` — redirecting
 * URLs must not also be submitted for indexing. Restore `cellPaths` (and the
 * `CITIES` / `relevantCities` imports) the day the flag flips back on.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const rightPaths = PRIORITY_RIGHTS.map((r) => `/rights/${r.slug.he}`);

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, rightPaths));
}
