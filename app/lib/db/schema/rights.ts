// Rights & Programs — government rights catalog and absorption/aid programs.
// Long body in sidecar translation tables for FTS (ADR-002).

import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
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

// --- rights ----------------------------------------------------------------
// Slug uniqueness: global per-locale (no parent in URL — `/he/rights/:slug`).

export const rights = pgTable(
  "rights",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: translatable("title"),
    slug: translatable("slug"),
    govUrl: text("gov_url"),
    eligibilitySummary: translatable("eligibility_summary"),
    // Free-form taxonomy: ['housing','grants','mortgage',...]. Curated by Content.
    tags: jsonb("tags").notNull().default([]),
    ...timestamps,
    ...softDelete,
    ...publishable,
  },
  (t) => ({
    slugHeIdx: uniqueIndex("rights_slug_he_unique")
      .on(sql`(${t.slug} ->> 'he')`)
      .where(sql`${t.deletedAt} IS NULL`),
    slugEnIdx: uniqueIndex("rights_slug_en_unique")
      .on(sql`(${t.slug} ->> 'en')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'en') IS NOT NULL`),
    slugAmIdx: uniqueIndex("rights_slug_am_unique")
      .on(sql`(${t.slug} ->> 'am')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'am') IS NOT NULL`),
    livePublished: index("rights_live_published_idx")
      .on(t.publishedAt)
      .where(sql`${t.deletedAt} IS NULL AND ${t.publishedAt} IS NOT NULL`),
  }),
);

export const rightTranslations = pgTable(
  "right_translations",
  {
    rightId: uuid("right_id")
      .notNull()
      .references(() => rights.id, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    body: text("body").notNull(),
    bodyVec: tsvector("body_vec"),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.rightId, t.locale] }),
    bodyIdx: index("right_translations_body_gin").on(t.bodyVec),
  }),
);

// --- programs --------------------------------------------------------------
// Government/non-gov absorption + aid programs. Same shape as rights, but
// programs are typically time-bounded and have providers (ministries, NGOs).

export const programs = pgTable(
  "programs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: translatable("title"),
    slug: translatable("slug"),
    provider: translatable("provider"),
    eligibilitySummary: translatable("eligibility_summary"),
    applicationUrl: text("application_url"),
    tags: jsonb("tags").notNull().default([]),
    ...timestamps,
    ...softDelete,
    ...publishable,
  },
  (t) => ({
    slugHeIdx: uniqueIndex("programs_slug_he_unique")
      .on(sql`(${t.slug} ->> 'he')`)
      .where(sql`${t.deletedAt} IS NULL`),
    slugEnIdx: uniqueIndex("programs_slug_en_unique")
      .on(sql`(${t.slug} ->> 'en')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'en') IS NOT NULL`),
    slugAmIdx: uniqueIndex("programs_slug_am_unique")
      .on(sql`(${t.slug} ->> 'am')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'am') IS NOT NULL`),
    livePublished: index("programs_live_published_idx")
      .on(t.publishedAt)
      .where(sql`${t.deletedAt} IS NULL AND ${t.publishedAt} IS NOT NULL`),
  }),
);

export const programTranslations = pgTable(
  "program_translations",
  {
    programId: uuid("program_id")
      .notNull()
      .references(() => programs.id, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    body: text("body").notNull(),
    bodyVec: tsvector("body_vec"),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.programId, t.locale] }),
    bodyIdx: index("program_translations_body_gin").on(t.bodyVec),
  }),
);
