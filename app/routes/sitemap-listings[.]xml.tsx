import { listPublicListings } from "~/lib/db/queries/listings.server";
import { getEnv } from "~/lib/env.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * Listings sitemap — individual `/listings/:citySlugHe/:type/:slugHe` detail
 * pages. Split from sitemap-core.xml because, unlike every other section,
 * listings live in Postgres (not a static in-memory registry) and the loader
 * needs to be async. See TED-111 — these detail pages already carry
 * canonical + hreflang meta and were crawlable-but-undiscoverable (no sitemap
 * entry) before this.
 */
export async function loader() {
  const { PUBLIC_URL } = getEnv();

  const paths: string[] = [];
  let page = 0;
  // Small dataset today (single digits of demo listings, per ADR-017) —
  // page through defensively rather than assuming everything fits page 0.
  for (;;) {
    const { items, total } = await listPublicListings({}, page);
    for (const item of items) {
      const slugHe = item.slug.he;
      if (!slugHe) continue;
      paths.push(`/listings/${item.city.slugHe}/${item.type}/${slugHe}`);
    }
    page += 1;
    if (paths.length >= total || items.length === 0) break;
  }

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths));
}
