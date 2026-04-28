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
  varchar,
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

// `commercial` added per TED-21 (Phase 3.3). The closed set covers every
// pricing model agencies onboard — broader categorisation (luxury, plot,
// etc.) lives in `attributes.subtype` to avoid enum churn.
export const listingTypeEnum = pgEnum("listing_type", [
  "sale",
  "rent",
  "urban_renewal",
  "investment",
  "gov_program",
  "commercial",
]);

// Lifecycle of a published unit. Distinct from `published_at`, which is the
// audit timestamp of the first draft → active transition. `status` is the
// thing the listing-card renders and the search index filters on.
//   - draft     : agency is editing; never indexed, never on the public site
//   - active    : on the public site; eligible for `/listings`
//   - sold      : sale-type listing closed — kept for SEO + history
//   - rented    : rent-type listing closed — same
//   - archived  : agency hid it but did not soft-delete (e.g. seasonal pause)
export const listingStatusEnum = pgEnum("listing_status", [
  "draft",
  "active",
  "sold",
  "rented",
  "archived",
]);

// Lifecycle of a single lead, from form-submit to broker close-out (TED-21).
// Distinct from a sales funnel: this is an *assignment* flow. A lead is
// `pending` until an agency_member claims it, then `assigned`, then
// `contacted` once the broker has spoken to the prospect, then `closed`
// (terminal — outcome lives on `lead_outcomes` if we add one later).
export const leadStatusEnum = pgEnum("lead_status", [
  "pending",
  "assigned",
  "contacted",
  "closed",
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
    slugHeIdx: uniqueIndex("cities_slug_he_unique").on(sql`(${t.slug} ->> 'he')`),
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
    slugHeIdx: uniqueIndex("neighborhoods_city_slug_he_unique").on(
      t.cityId,
      sql`(${t.slug} ->> 'he')`,
    ),
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
    // Lifecycle gate; see enum doc above. Default `draft` so the agency
    // intake form never accidentally publishes (TED-21).
    status: listingStatusEnum("status").notNull().default("draft"),
    title: translatable("title"),
    slug: translatable("slug"),
    // Numeric, currency-agnostic at the column level (currency stored in
    // `attributes.currency`; default 'ILS'). 14-digit precision covers
    // any plausible real-estate price in agorot.
    price: numeric("price", { precision: 14, scale: 2 }),
    // Type-specific fields. Validated in `app/lib/validation/listings.ts`
    // with a Zod schema per listing_type at the action layer (ADR-002).
    attributes: jsonb("attributes").notNull().default({}),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    neighborhoodId: uuid("neighborhood_id").references(() => neighborhoods.id, {
      onDelete: "set null",
    }),
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
    statusIdx: index("listings_status_idx").on(t.status),

    // Hot path: live listings only. Partial index keeps it small and the
    // status check matches the loader for `/{lang}/listings` (TED-21).
    livePublished: index("listings_live_published_idx")
      .on(t.publishedAt)
      .where(
        sql`${t.deletedAt} IS NULL AND ${t.publishedAt} IS NOT NULL AND ${t.status} = 'active'`,
      ),

    // GIN index on `search_vec` is owned by `migrations/_post_init.sql.ts`
    // (drizzle-kit defaults `index().on(tsvectorCol)` to btree, which fails
    // on tsvector — QA-PR1, B2).
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
    // GIN index on `body_vec` owned by `_post_init.sql.ts` (B2).
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
//
// Direct `agency_id` denormalises one hop off `listings.agency_id` — keeping
// it on the lead row makes agency-scoped queries (the dashboard inbox) a
// single index lookup, and survives `listing_id` going NULL on listing
// soft-delete (TED-21).

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    listingId: uuid("listing_id").references(() => listings.id, {
      onDelete: "set null",
    }),
    agencyId: uuid("agency_id")
      .notNull()
      .references(() => agencies.id, { onDelete: "restrict" }),
    submittedByUserId: uuid("submitted_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    assignedToUserId: uuid("assigned_to_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    status: leadStatusEnum("status").notNull().default("pending"),
    // Normalised contact fields. Length caps mirror users.email / users.phone.
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }),
    phone: varchar("phone", { length: 32 }),
    message: text("message"),
    // Non-PII analytics (utm_source, page, referer, locale, consent_at, ...).
    // Safe to retain post-anon.
    metadata: jsonb("metadata").notNull().default({}),
    ...timestamps,
  },
  (t) => ({
    listingIdx: index("leads_listing_idx").on(t.listingId, t.status),
    agencyIdx: index("leads_agency_idx").on(t.agencyId, t.status, t.createdAt),
    statusIdx: index("leads_status_idx").on(t.status),
    submittedByIdx: index("leads_submitted_by_idx").on(t.submittedByUserId),
    assignedToIdx: index("leads_assigned_to_idx").on(t.assignedToUserId),
  }),
);
