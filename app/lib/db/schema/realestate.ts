// Real-estate domain — listings, geography, leads.
// Heterogeneous listing attributes via JSONB (ADR-002 + Vega D3).

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import {
  localeEnum,
  publishable,
  softDelete,
  timestamps,
  translatable,
  tsvector,
} from "../columns";
import { agencies, users } from "./identity";

// --- Enums -----------------------------------------------------------------

export const listingTypeEnum = pgEnum("listing_type", [
  "sale",
  "rent",
  "urban_renewal",
  "investment",
  "gov_program",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
]);

export const mediaKindEnum = pgEnum("media_kind", [
  "image",
  "video",
  "floorplan",
  "tour_3d",
]);

// --- Geography lookups -----------------------------------------------------

export const cities = pgTable(
  "cities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: translatable("name"),
    slug: translatable("slug"),
    ...timestamps,
  },
  (t) => ({
    // Cities are global; HE slug is canonical lookup key.
    slugHeIdx: uniqueIndex("cities_slug_he_unique")
      .on(sql`(${t.slug} ->> 'he')`),
  }),
);

export const neighborhoods = pgTable(
  "neighborhoods",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    name: translatable("name"),
    slug: translatable("slug"),
    ...timestamps,
  },
  (t) => ({
    cityIdx: index("neighborhoods_city_idx").on(t.cityId),
    slugHeIdx: uniqueIndex("neighborhoods_city_slug_he_unique")
      .on(t.cityId, sql`(${t.slug} ->> 'he')`),
  }),
);

// --- listings --------------------------------------------------------------
// Slug uniqueness scope: per `(city_id, locale)` — matches URL pattern
// `/he/listings/:city/:slug` and minimizes collisions across agencies.
// Pending Architect amendment confirmation; documented inline so reverting
// to global-per-locale = drop these unique indexes, add new ones.

export const listings = pgTable(
  "listings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    agencyId: uuid("agency_id")
      .notNull()
      .references(() => agencies.id, { onDelete: "restrict" }),
    type: listingTypeEnum("type").notNull(),
    title: translatable("title"),
    slug: translatable("slug"),
    // Numeric, currency-agnostic at the column level (currency stored in
    // `attributes.currency`; default 'ILS'). 14-digit precision covers
    // any plausible real-estate price in agorot.
    price: numeric("price", { precision: 14, scale: 2 }),
    // Type-specific fields. Validated in `app/lib/validation/listings/<type>.ts`
    // with a Zod schema per listing_type at the action layer (ADR-002).
    attributes: jsonb("attributes").notNull().default({}),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    neighborhoodId: uuid("neighborhood_id").references(
      () => neighborhoods.id,
      { onDelete: "set null" },
    ),
    // Generated tsvector — see custom type comment above.
    searchVec: tsvector("search_vec"),
    ...timestamps,
    ...softDelete,
    ...publishable,
  },
  (t) => ({
    // Per-(city, locale) slug uniqueness, partial on live rows only.
    slugHeIdx: uniqueIndex("listings_city_slug_he_unique")
      .on(t.cityId, sql`(${t.slug} ->> 'he')`)
      .where(sql`${t.deletedAt} IS NULL`),
    slugEnIdx: uniqueIndex("listings_city_slug_en_unique")
      .on(t.cityId, sql`(${t.slug} ->> 'en')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'en') IS NOT NULL`),
    slugAmIdx: uniqueIndex("listings_city_slug_am_unique")
      .on(t.cityId, sql`(${t.slug} ->> 'am')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'am') IS NOT NULL`),

    agencyIdx: index("listings_agency_idx").on(t.agencyId),
    cityIdx: index("listings_city_idx").on(t.cityId),
    neighborhoodIdx: index("listings_neighborhood_idx").on(t.neighborhoodId),
    typeIdx: index("listings_type_idx").on(t.type),

    // Hot path: live listings only. Partial index keeps it small.
    livePublished: index("listings_live_published_idx")
      .on(t.publishedAt)
      .where(sql`${t.deletedAt} IS NULL AND ${t.publishedAt} IS NOT NULL`),

    // FTS index. Engineer must add `using('gin', searchVec)` semantics in
    // the migration; Drizzle's `using('gin', ...)` ergonomics here are still
    // brittle, so we declare the column and let the migration emit the GIN.
    searchIdx: index("listings_search_gin").on(t.searchVec),
  }),
);

// --- listing_translations --------------------------------------------------
// Long body per locale + per-locale FTS vector (ADR-002).

export const listingTranslations = pgTable(
  "listing_translations",
  {
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    body: text("body").notNull(),
    bodyVec: tsvector("body_vec"),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.listingId, t.locale] }),
    bodyIdx: index("listing_translations_body_gin").on(t.bodyVec),
  }),
);

// --- listing_media ---------------------------------------------------------
// Pointer rows; actual bytes in R2 (ADR-007). `r2_key` is content-addressed.

export const listingMedia = pgTable(
  "listing_media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listings.id, { onDelete: "cascade" }),
    kind: mediaKindEnum("kind").notNull().default("image"),
    r2Key: text("r2_key").notNull(),
    width: integer("width"),
    height: integer("height"),
    // base64 LQIP for above-the-fold images (ADR-007).
    lqip: text("lqip"),
    altText: translatable("alt_text"),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (t) => ({
    listingIdx: index("listing_media_listing_idx").on(t.listingId, t.sortOrder),
  }),
);

// --- leads -----------------------------------------------------------------
// PII-sensitive (ADR-003 + Israeli Privacy Law). No softDelete: leads are
// audited at deletion via audit_log.

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    listingId: uuid("listing_id").references(() => listings.id, {
      onDelete: "set null",
    }),
    submittedByUserId: uuid("submitted_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    status: leadStatusEnum("status").notNull().default("new"),
    // {phone, email, note, source} — all client-validated with Zod at action.
    contact: jsonb("contact").notNull(),
    // Non-PII analytics (utm_source, page, etc.). Safe to retain post-anon.
    metadata: jsonb("metadata").notNull().default({}),
    ...timestamps,
  },
  (t) => ({
    listingIdx: index("leads_listing_idx").on(t.listingId, t.status),
    statusIdx: index("leads_status_idx").on(t.status),
    submittedByIdx: index("leads_submitted_by_idx").on(t.submittedByUserId),
  }),
);

