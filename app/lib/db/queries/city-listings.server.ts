// City landing page: fetch listings sorted images-first.
// Separate file so the cities route imports a clean .server module
// without mixing with the public listings query surface.

import { and, desc, eq, isNull, sql } from "drizzle-orm";

import { db } from "../../db.server";
import { dedupeListings } from "../../listings/display";
import { cities, listings } from "../schema/realestate";

export type CityListingPreview = {
  id: string;
  type: string;
  title: { he: string; en?: string; am?: string };
  slug: { he: string };
  price: number | null;
  citySlugHe: string;
  attributes: Record<string, unknown>;
};

export async function listCityListingPreviews(
  citySlugHe: string,
  limit = 6,
): Promise<CityListingPreview[]> {
  const cityRows = await db
    .select({ id: cities.id })
    .from(cities)
    .where(sql`(${cities.slug} ->> 'he') = ${citySlugHe}`)
    .limit(1);
  const city = cityRows[0];
  if (!city) return [];

  const rows = await db
    .select({
      id: listings.id,
      type: listings.type,
      title: listings.title,
      slug: listings.slug,
      price: listings.price,
      attributes: listings.attributes,
    })
    .from(listings)
    .where(
      and(
        eq(listings.cityId, city.id),
        isNull(listings.deletedAt),
        sql`${listings.publishedAt} IS NOT NULL`,
        sql`${listings.status} = 'active'`,
      ),
    )
    .orderBy(
      // Images first
      sql`CASE WHEN (${listings.attributes} ->> 'featuredImageUrl') != '' AND (${listings.attributes} ->> 'featuredImageUrl') IS NOT NULL THEN 0 ELSE 1 END`,
      desc(listings.publishedAt),
    )
    // Over-fetch so duplicates removed below still leave `limit` results
    // (the merkaz-h sync can carry the same property twice — TED-129).
    .limit(limit * 4);

  const mapped = rows.map((r) => {
    const price = r.price ? Number(r.price) : null;
    return {
      id: r.id,
      type: r.type,
      title: r.title as CityListingPreview["title"],
      slug: r.slug as CityListingPreview["slug"],
      price: Number.isFinite(price) ? price : null,
      citySlugHe,
      attributes: (r.attributes ?? {}) as Record<string, unknown>,
    };
  });

  return dedupeListings(mapped).slice(0, limit);
}
