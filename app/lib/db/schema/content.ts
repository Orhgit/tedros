// Content — editorial articles and programmatic SEO pages.
// Body in sidecar translations (ADR-002). programmatic_pages are
// content-gated per ADR-005 (≥800 words + data); enforced at action layer.

import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
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
import { users } from "./identity";

// --- articles --------------------------------------------------------------

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: translatable("title"),
    slug: translatable("slug"),
    excerpt: translatable("excerpt"),
    coverR2Key: text("cover_r2_key"),
    authorUserId: uuid("author_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    tags: jsonb("tags").notNull().default([]),
    ...timestamps,
    ...softDelete,
    ...publishable,
  },
  (t) => ({
    slugHeIdx: uniqueIndex("articles_slug_he_unique")
      .on(sql`(${t.slug} ->> 'he')`)
      .where(sql`${t.deletedAt} IS NULL`),
    slugEnIdx: uniqueIndex("articles_slug_en_unique")
      .on(sql`(${t.slug} ->> 'en')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'en') IS NOT NULL`),
    slugAmIdx: uniqueIndex("articles_slug_am_unique")
      .on(sql`(${t.slug} ->> 'am')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'am') IS NOT NULL`),
    livePublished: index("articles_live_published_idx")
      .on(t.publishedAt)
      .where(sql`${t.deletedAt} IS NULL AND ${t.publishedAt} IS NOT NULL`),
    authorIdx: index("articles_author_idx").on(t.authorUserId),
  }),
);

export const articleTranslations = pgTable(
  "article_translations",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    locale: localeEnum("locale").notNull(),
    body: text("body").notNull(),
    bodyVec: tsvector("body_vec"),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.articleId, t.locale] }),
    bodyIdx: index("article_translations_body_gin").on(t.bodyVec),
  }),
);

// --- programmatic_pages -----------------------------------------------------
// Generated city × topic (and similar) pages, gated to ≥800 words + data
// per ADR-005. The `payload_jsonb` carries the structured data the page
// renders from; `wordCount` is denormalized at write time for fast filter.

export const programmaticPages = pgTable(
  "programmatic_pages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    // Identifies the template + axes, e.g. 'city-housing', 'city-rights'.
    template: varchar("template", { length: 64 }).notNull(),
    // Composite slug for the URL: e.g. {he: 'netanya/zchuyot-diur'}
    slug: translatable("slug"),
    title: translatable("title"),
    metaDescription: translatable("meta_description"),
    payload: jsonb("payload").notNull().default({}),
    // Denormalized: cheapest way to enforce the SEO content-gate at write.
    wordCount: text("word_count"),
    ...timestamps,
    ...softDelete,
    ...publishable,
  },
  (t) => ({
    templateIdx: index("programmatic_pages_template_idx").on(t.template),
    slugHeIdx: uniqueIndex("programmatic_pages_slug_he_unique")
      .on(sql`(${t.slug} ->> 'he')`)
      .where(sql`${t.deletedAt} IS NULL`),
    livePublished: index("programmatic_pages_live_published_idx")
      .on(t.publishedAt)
      .where(sql`${t.deletedAt} IS NULL AND ${t.publishedAt} IS NOT NULL`),
  }),
);
