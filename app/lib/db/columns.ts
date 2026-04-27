// Shared column helpers (D5 — Vega's standard).
// Use spread (`...timestamps`) inside `pgTable` definitions.

import { customType, jsonb, pgEnum, timestamp } from "drizzle-orm/pg-core";

// --- Locale -----------------------------------------------------------------
// Closed set, changes only with deploys (ADR-002 + ADR-004).
export const localeEnum = pgEnum("locale", ["he", "en", "am"]);

// --- Translatable JSONB -----------------------------------------------------
// Short text translatable on-row (titles, names, slugs). Long body lives in
// per-entity sidecar `*_translations` tables for FTS (ADR-002).
//
// HE is required (primary locale per ADR-004); EN/AM optional, fallback to HE.
export type Translatable = { he: string; en?: string; am?: string };

export const translatable = (col: string) =>
  jsonb(col).$type<Translatable>().notNull();

// Optional translatable text (e.g. agency description, professional headline).
// `null` is a valid value at the column level — distinct from "empty in HE".
export const translatableNullable = (col: string) =>
  jsonb(col).$type<Translatable>();

// --- Standard timestamp groups ---------------------------------------------
// timestamptz everywhere (ADR-002 + Vega D5). DB-side defaults so seeds and
// raw migrations get correct values without app participation.

export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

// Add to entities a user might want to restore (ADR-002).
// NOT applied to: audit_log, sessions, lookup tables.
export const softDelete = {
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
};

// Add to publishable content (D5). Distinct from createdAt — drafts exist.
export const publishable = {
  publishedAt: timestamp("published_at", { withTimezone: true }),
};

// --- tsvector ---------------------------------------------------------------
// Drizzle has no native tsvector type; declare it once and reuse.
// Concrete generated columns are emitted by `migrations/_post_init.sql.ts`
// with `simple` config + `immutable_unaccent()` (a SQL wrapper around the
// `unaccent` extension, declared IMMUTABLE so it's allowed inside
// GENERATED ALWAYS AS (...) STORED — raw unaccent() is STABLE and rejected).
//
//   ALTER TABLE <t> ADD COLUMN <c> tsvector
//     GENERATED ALWAYS AS (
//       setweight(to_tsvector('simple', immutable_unaccent(coalesce(<col>->>'he',''))), 'A') ||
//       setweight(to_tsvector('simple', immutable_unaccent(coalesce(<col>->>'en',''))), 'A') ||
//       setweight(to_tsvector('simple', immutable_unaccent(coalesce(<col>->>'am',''))), 'A')
//     ) STORED;
//
// Then GIN index on the column.
export const tsvector = customType<{ data: string; driverData: string }>({
  dataType() {
    return "tsvector";
  },
});

