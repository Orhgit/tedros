// Public + agency-scoped listing queries (TED-21).
//
// Loaders/actions import from here instead of touching `db` directly so the
// scoping helpers in `~/lib/db/scoping` are always wired into the WHERE.

import { and, asc, desc, eq, gte, ilike, inArray, lte, sql, type SQL } from "drizzle-orm";

import { db } from "../../db.server";
import type { Locale } from "../../i18n/config";
import { AGENCY_ROLES, agencies, agencyMembers } from "../schema/identity";
import {
  cities,
  leads,
  listingMedia,
  listingTranslations,
  listings,
  neighborhoods,
} from "../schema/realestate";
import { forLeadsOf, forListingsOf, publiclyVisibleListing } from "../scoping";

export type ListingType =
  | "sale"
  | "rent"
  | "urban_renewal"
  | "investment"
  | "gov_program"
  | "commercial";

export type ListingStatus = "draft" | "active" | "sold" | "rented" | "archived";

export type PublicListingSummary = {
  id: string;
  type: ListingType;
  title: { he: string; en?: string; am?: string };
  slug: { he: string; en?: string; am?: string };
  price: number | null;
  city: { id: string; name: { he: string; en?: string; am?: string }; slugHe: string };
  neighborhood: { id: string; name: { he: string; en?: string; am?: string } } | null;
  attributes: Record<string, unknown>;
  publishedAt: string | null;
};

export type ListingFilters = {
  cityId?: string;
  citySlugHe?: string;
  type?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
};

const PAGE_SIZE = 24;

function priceAsNumber(raw: string | null): number | null {
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export async function listPublicListings(
  filters: ListingFilters,
  page = 0,
): Promise<{ items: PublicListingSummary[]; total: number }> {
  const where: SQL[] = [publiclyVisibleListing()];
  if (filters.cityId) where.push(eq(listings.cityId, filters.cityId));
  if (filters.type) where.push(eq(listings.type, filters.type));
  if (filters.minPrice !== undefined)
    where.push(gte(listings.price, filters.minPrice.toString()));
  if (filters.maxPrice !== undefined)
    where.push(lte(listings.price, filters.maxPrice.toString()));
  if (filters.minRooms !== undefined) {
    // attributes.rooms is JSONB — extract as numeric for comparison.
    where.push(
      sql`COALESCE((${listings.attributes} ->> 'rooms')::numeric, 0) >= ${filters.minRooms}`,
    );
  }
  if (filters.citySlugHe) {
    const cityRows = await db
      .select({ id: cities.id })
      .from(cities)
      .where(sql`(${cities.slug} ->> 'he') = ${filters.citySlugHe}`)
      .limit(1);
    const cityId = cityRows[0]?.id;
    if (!cityId) return { items: [], total: 0 };
    where.push(eq(listings.cityId, cityId));
  }

  const whereClause = and(...where);

  const rows = await db
    .select({
      id: listings.id,
      type: listings.type,
      title: listings.title,
      slug: listings.slug,
      price: listings.price,
      attributes: listings.attributes,
      publishedAt: listings.publishedAt,
      cityId: cities.id,
      cityName: cities.name,
      citySlug: cities.slug,
      neighborhoodId: neighborhoods.id,
      neighborhoodName: neighborhoods.name,
    })
    .from(listings)
    .innerJoin(cities, eq(listings.cityId, cities.id))
    .leftJoin(neighborhoods, eq(listings.neighborhoodId, neighborhoods.id))
    .where(whereClause)
    .orderBy(desc(listings.publishedAt))
    .limit(PAGE_SIZE)
    .offset(page * PAGE_SIZE);

  const totalRow = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(listings)
    .where(whereClause);

  const items: PublicListingSummary[] = rows.map((r) => ({
    id: r.id,
    type: r.type as ListingType,
    title: r.title as PublicListingSummary["title"],
    slug: r.slug as PublicListingSummary["slug"],
    price: priceAsNumber(r.price),
    city: {
      id: r.cityId,
      name: r.cityName as PublicListingSummary["city"]["name"],
      slugHe: ((r.citySlug as { he?: string } | null)?.he ?? "") as string,
    },
    neighborhood: r.neighborhoodId
      ? {
          id: r.neighborhoodId,
          name: r.neighborhoodName as { he: string; en?: string; am?: string },
        }
      : null,
    attributes: (r.attributes ?? {}) as Record<string, unknown>,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
  }));

  return { items, total: totalRow[0]?.count ?? items.length };
}

export type PublicListingDetail = PublicListingSummary & {
  body: Partial<Record<Locale, string>>;
  media: { id: string; r2Key: string; alt: { he: string; en?: string; am?: string } }[];
  agency: {
    id: string;
    name: { he: string; en?: string; am?: string };
    contactEmail: string | null;
    contactPhone: string | null;
  };
};

export async function getPublicListingByPath(opts: {
  citySlugHe: string;
  type: ListingType;
  slugHe: string;
}): Promise<PublicListingDetail | null> {
  const cityRow = await db
    .select({ id: cities.id })
    .from(cities)
    .where(sql`(${cities.slug} ->> 'he') = ${opts.citySlugHe}`)
    .limit(1);
  const cityId = cityRow[0]?.id;
  if (!cityId) return null;

  const rows = await db
    .select({
      id: listings.id,
      type: listings.type,
      title: listings.title,
      slug: listings.slug,
      price: listings.price,
      attributes: listings.attributes,
      publishedAt: listings.publishedAt,
      cityId: cities.id,
      cityName: cities.name,
      citySlug: cities.slug,
      neighborhoodId: neighborhoods.id,
      neighborhoodName: neighborhoods.name,
      agencyId: agencies.id,
      agencyName: agencies.name,
      agencyEmail: agencies.contactEmail,
      agencyPhone: agencies.contactPhone,
    })
    .from(listings)
    .innerJoin(cities, eq(listings.cityId, cities.id))
    .innerJoin(agencies, eq(listings.agencyId, agencies.id))
    .leftJoin(neighborhoods, eq(listings.neighborhoodId, neighborhoods.id))
    .where(
      and(
        publiclyVisibleListing(),
        eq(listings.cityId, cityId),
        eq(listings.type, opts.type),
        sql`(${listings.slug} ->> 'he') = ${opts.slugHe}`,
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  const [trs, media] = await Promise.all([
    db
      .select({ locale: listingTranslations.locale, body: listingTranslations.body })
      .from(listingTranslations)
      .where(eq(listingTranslations.listingId, row.id)),
    db
      .select({
        id: listingMedia.id,
        r2Key: listingMedia.r2Key,
        alt: listingMedia.altText,
      })
      .from(listingMedia)
      .where(eq(listingMedia.listingId, row.id))
      .orderBy(asc(listingMedia.sortOrder)),
  ]);

  const body: Partial<Record<Locale, string>> = {};
  for (const t of trs) body[t.locale as Locale] = t.body;

  return {
    id: row.id,
    type: row.type as ListingType,
    title: row.title as PublicListingDetail["title"],
    slug: row.slug as PublicListingDetail["slug"],
    price: priceAsNumber(row.price),
    city: {
      id: row.cityId,
      name: row.cityName as PublicListingDetail["city"]["name"],
      slugHe: ((row.citySlug as { he?: string } | null)?.he ?? "") as string,
    },
    neighborhood: row.neighborhoodId
      ? {
          id: row.neighborhoodId,
          name: row.neighborhoodName as { he: string; en?: string; am?: string },
        }
      : null,
    attributes: (row.attributes ?? {}) as Record<string, unknown>,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
    body,
    media: media.map((m) => ({
      id: m.id,
      r2Key: m.r2Key,
      alt: (m.alt ?? { he: "" }) as { he: string; en?: string; am?: string },
    })),
    agency: {
      id: row.agencyId,
      name: row.agencyName as PublicListingDetail["agency"]["name"],
      contactEmail: row.agencyEmail,
      contactPhone: row.agencyPhone,
    },
  };
}

// --- Agency-scoped queries -------------------------------------------------

export async function listAgencyListings(agencyId: string): Promise<
  Array<{
    id: string;
    type: ListingType;
    status: ListingStatus;
    title: { he: string; en?: string; am?: string };
    price: number | null;
    publishedAt: string | null;
    updatedAt: string;
  }>
> {
  const rows = await db
    .select({
      id: listings.id,
      type: listings.type,
      status: listings.status,
      title: listings.title,
      price: listings.price,
      publishedAt: listings.publishedAt,
      updatedAt: listings.updatedAt,
    })
    .from(listings)
    .where(forListingsOf(agencyId))
    .orderBy(desc(listings.updatedAt));

  return rows.map((r) => ({
    id: r.id,
    type: r.type as ListingType,
    status: r.status as ListingStatus,
    title: r.title as { he: string; en?: string; am?: string },
    price: priceAsNumber(r.price),
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export async function listAgencyLeads(agencyId: string) {
  return db
    .select({
      id: leads.id,
      listingId: leads.listingId,
      name: leads.name,
      email: leads.email,
      phone: leads.phone,
      status: leads.status,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .where(forLeadsOf(agencyId))
    .orderBy(desc(leads.createdAt))
    .limit(100);
}

// --- City lookups for filter UI -------------------------------------------

export async function listCitiesForFilter(): Promise<
  Array<{ id: string; name: { he: string; en?: string; am?: string }; slugHe: string }>
> {
  const rows = await db
    .select({ id: cities.id, name: cities.name, slug: cities.slug })
    .from(cities)
    .orderBy(asc(sql`(${cities.name} ->> 'he')`));
  return rows.map((r) => ({
    id: r.id,
    name: r.name as { he: string; en?: string; am?: string },
    slugHe: ((r.slug as { he?: string } | null)?.he ?? "") as string,
  }));
}

// Resolve the agency the current user owns or is an active member of.
// First match wins (we expect 1 — agency_member is keyed (user_id, agency_id)
// so a user can technically belong to multiple; the dashboard picks the
// first by membership created_at).
export async function findAgencyForUser(userId: string): Promise<{
  id: string;
  name: { he: string; en?: string; am?: string };
  verificationStatus: "pending" | "verified" | "rejected" | "suspended";
  role: "owner" | "agent";
} | null> {
  const rows = await db
    .select({
      id: agencies.id,
      name: agencies.name,
      verificationStatus: agencies.verificationStatus,
      roleInAgency: agencyMembers.roleInAgency,
    })
    .from(agencies)
    .innerJoin(agencyMembers, eq(agencyMembers.agencyId, agencies.id))
    .where(
      and(
        eq(agencyMembers.userId, userId),
        eq(agencyMembers.status, "active"),
        sql`${agencies.deletedAt} IS NULL`,
      ),
    )
    .orderBy(asc(agencyMembers.createdAt))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (!(AGENCY_ROLES as readonly string[]).includes(row.roleInAgency)) return null;
  return {
    id: row.id,
    name: row.name as { he: string; en?: string; am?: string },
    verificationStatus: row.verificationStatus,
    role: row.roleInAgency as "owner" | "agent",
  };
}

// Suppress unused-import warnings — `inArray` and `ilike` are kept for
// future filter expansion (text search, multi-city) and intentionally
// imported now to avoid churn when wired up by Content & SEO.
void inArray;
void ilike;
