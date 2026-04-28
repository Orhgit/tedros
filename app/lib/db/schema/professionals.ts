// Professionals directory — vetted lawyers/realtors/advisors etc.
// Reviews are moderated (ADR-002). Many-to-many with categories.

import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import {
  publishable,
  softDelete,
  timestamps,
  translatable,
  translatableNullable,
} from "../columns";
import { users, verificationStatusEnum } from "./identity";
import { cities } from "./realestate";

export const professionals = pgTable(
  "professionals",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    // Optional: a professional may not have a Tedros user account (we curate
    // some entries from public sources). When linked, drives login/edit access.
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    displayName: translatable("display_name"),
    slug: translatable("slug"),
    // Optional short tagline. (QA-PR1, M3.)
    headline: translatableNullable("headline"),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "restrict" }),
    licenseNumber: varchar("license_number", { length: 64 }),
    contactEmail: varchar("contact_email", { length: 320 }),
    contactPhone: varchar("contact_phone", { length: 32 }),
    websiteUrl: text("website_url"),
    verificationStatus: verificationStatusEnum("verification_status")
      .notNull()
      .default("pending"),
    ...timestamps,
    ...softDelete,
  },
  (t) => ({
    slugHeIdx: uniqueIndex("professionals_slug_he_unique")
      .on(sql`(${t.slug} ->> 'he')`)
      .where(sql`${t.deletedAt} IS NULL`),
    slugEnIdx: uniqueIndex("professionals_slug_en_unique")
      .on(sql`(${t.slug} ->> 'en')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'en') IS NOT NULL`),
    slugAmIdx: uniqueIndex("professionals_slug_am_unique")
      .on(sql`(${t.slug} ->> 'am')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'am') IS NOT NULL`),
    cityIdx: index("professionals_city_idx").on(t.cityId),
    verificationIdx: index("professionals_verification_idx").on(t.verificationStatus),
  }),
);

// --- Categories ------------------------------------------------------------
// Open-set taxonomy (lookup, not enum) per ADR-002. Seeded ~20 to start.

export const professionalCategories = pgTable(
  "professional_categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: translatable("name"),
    slug: translatable("slug"),
    ...timestamps,
  },
  (t) => ({
    slugHeIdx: uniqueIndex("professional_categories_slug_he_unique").on(
      sql`(${t.slug} ->> 'he')`,
    ),
  }),
);

export const professionalCategoryLinks = pgTable(
  "professional_category_links",
  {
    professionalId: uuid("professional_id")
      .notNull()
      .references(() => professionals.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => professionalCategories.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.professionalId, t.categoryId] }),
    categoryLookup: index("professional_category_links_cat_idx").on(t.categoryId),
  }),
);

// --- Reviews ---------------------------------------------------------------
// Moderated; admin gates publication via `published_at`. PII-light (rating
// + free-text), so soft-delete is enough for takedown.

export const professionalReviews = pgTable(
  "professional_reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    professionalId: uuid("professional_id")
      .notNull()
      .references(() => professionals.id, { onDelete: "cascade" }),
    reviewerUserId: uuid("reviewer_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    rating: integer("rating").notNull(),
    body: text("body").notNull(),
    ...timestamps,
    ...softDelete,
    ...publishable,
  },
  (t) => ({
    professionalIdx: index("professional_reviews_pro_idx")
      .on(t.professionalId, t.publishedAt)
      .where(sql`${t.deletedAt} IS NULL`),
    // 1..5 rating bound — declared so drizzle-kit emits the CHECK
    // alongside the table (QA-PR1, M5).
    ratingRange: check(
      "professional_reviews_rating_check",
      sql`${t.rating} BETWEEN 1 AND 5`,
    ),
  }),
);
