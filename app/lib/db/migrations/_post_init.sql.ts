// SQL pieces that `drizzle-kit generate` cannot emit from the schema.
//
// drizzle-kit covers the ordinary CREATE TABLE / CREATE INDEX / CREATE TYPE
// statements. The four cases below need raw SQL, applied AFTER the auto-
// generated init migration in the same transaction:
//
//   1. PostgreSQL extensions (`unaccent` for FTS, `pgcrypto` for UUIDs).
//   2. Convert the auto-generated `audit_log` to a partitioned parent
//      and create initial monthly partitions (Vega D4).
//   3. Replace the placeholder `tsvector` columns (`listings.search_vec`,
//      `listing_translations.body_vec`, `right_translations.body_vec`,
//      `program_translations.body_vec`, `article_translations.body_vec`)
//      with `GENERATED ALWAYS AS (...) STORED` expressions using
//      `simple` + `unaccent` config.
//   4. GIN indexes on the generated tsvector columns (drizzle's `using('gin', ...)`
//      ergonomics for customType columns is brittle; emit raw to be safe).
//
// Engineer: call `postInitSql()` from your migration runner immediately
// after applying the drizzle-kit-generated `0000_init.sql`. If you'd
// rather inline this into the same SQL file, paste the output verbatim
// at the end of `0000_init.sql` before commit.

import { ensureRollingPartitions } from "./_partitions.sql";

export function postInitSql(now: Date = new Date()): string {
  return [
    extensionsSql(),
    auditLogPartitionedSql(),
    ensureRollingPartitions(now).join("\n"),
    tsvectorColumnsSql(),
    tsvectorIndexesSql(),
  ].join("\n\n");
}

// 1. Extensions ------------------------------------------------------------

function extensionsSql(): string {
  // `unaccent(text)` is STABLE, not IMMUTABLE — Postgres won't allow it inside
  // `GENERATED ALWAYS AS (...) STORED` expressions. Wrapping the dictionary
  // call in a SQL function declared IMMUTABLE is the standard workaround:
  // we promise immutability (the `unaccent` dictionary is loaded at extension
  // install and not re-altered in normal ops). If someone ever ALTERs the
  // dictionary, all generated columns become stale — drop + re-add to refresh.
  // (QA-PR1, Round 2.)
  return /* sql */ `
    CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid()
    CREATE EXTENSION IF NOT EXISTS unaccent;   -- FTS normalization for HE/EN/AM

    CREATE OR REPLACE FUNCTION immutable_unaccent(text) RETURNS text
      LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
      AS $$ SELECT unaccent('unaccent', $1) $$;
  `;
}

// 2. audit_log → partitioned parent ---------------------------------------
// drizzle-kit emits a plain `CREATE TABLE audit_log (...)`. We drop and
// re-create as PARTITION BY RANGE (occurred_at). Safe at init: no rows yet.

function auditLogPartitionedSql(): string {
  return /* sql */ `
    DROP TABLE IF EXISTS audit_log;

    CREATE TABLE audit_log (
      id           uuid          NOT NULL DEFAULT gen_random_uuid(),
      occurred_at  timestamptz   NOT NULL DEFAULT now(),
      actor_id     uuid,
      actor_type   actor_type    NOT NULL,
      action       audit_action  NOT NULL,
      entity_type  text          NOT NULL,
      entity_id    uuid          NOT NULL,
      agency_id    uuid,
      before       jsonb,
      after        jsonb,
      diff         jsonb,
      request_id   text,
      ip           inet,
      user_agent   text,
      PRIMARY KEY (id, occurred_at)
    ) PARTITION BY RANGE (occurred_at);
  `;
}

// 3. Generated tsvector columns ------------------------------------------
// Replace placeholder columns with GENERATED ALWAYS AS (...) STORED.
// Config: 'simple' + immutable_unaccent for HE/EN/AM. The wrapper function
// is defined in extensionsSql() above; raw `unaccent()` is STABLE and would
// be rejected here by Postgres. (QA-PR1, Round 2.)

function tsvectorColumnsSql(): string {
  return /* sql */ `
    -- listings.search_vec: title (weight A) across HE/EN/AM
    ALTER TABLE listings DROP COLUMN IF EXISTS search_vec;
    ALTER TABLE listings ADD COLUMN search_vec tsvector
      GENERATED ALWAYS AS (
        setweight(to_tsvector('simple', immutable_unaccent(coalesce(title->>'he',''))), 'A') ||
        setweight(to_tsvector('simple', immutable_unaccent(coalesce(title->>'en',''))), 'A') ||
        setweight(to_tsvector('simple', immutable_unaccent(coalesce(title->>'am',''))), 'A')
      ) STORED;

    -- listing_translations.body_vec: full body per row (locale-scoped)
    ALTER TABLE listing_translations DROP COLUMN IF EXISTS body_vec;
    ALTER TABLE listing_translations ADD COLUMN body_vec tsvector
      GENERATED ALWAYS AS (to_tsvector('simple', immutable_unaccent(body))) STORED;

    ALTER TABLE right_translations DROP COLUMN IF EXISTS body_vec;
    ALTER TABLE right_translations ADD COLUMN body_vec tsvector
      GENERATED ALWAYS AS (to_tsvector('simple', immutable_unaccent(body))) STORED;

    ALTER TABLE program_translations DROP COLUMN IF EXISTS body_vec;
    ALTER TABLE program_translations ADD COLUMN body_vec tsvector
      GENERATED ALWAYS AS (to_tsvector('simple', immutable_unaccent(body))) STORED;

    ALTER TABLE article_translations DROP COLUMN IF EXISTS body_vec;
    ALTER TABLE article_translations ADD COLUMN body_vec tsvector
      GENERATED ALWAYS AS (to_tsvector('simple', immutable_unaccent(body))) STORED;
  `;
}

// 4. GIN indexes on the generated tsvector columns -----------------------

function tsvectorIndexesSql(): string {
  return /* sql */ `
    DROP INDEX IF EXISTS listings_search_gin;
    CREATE INDEX listings_search_gin ON listings USING GIN (search_vec);

    DROP INDEX IF EXISTS listing_translations_body_gin;
    CREATE INDEX listing_translations_body_gin ON listing_translations USING GIN (body_vec);

    DROP INDEX IF EXISTS right_translations_body_gin;
    CREATE INDEX right_translations_body_gin ON right_translations USING GIN (body_vec);

    DROP INDEX IF EXISTS program_translations_body_gin;
    CREATE INDEX program_translations_body_gin ON program_translations USING GIN (body_vec);

    DROP INDEX IF EXISTS article_translations_body_gin;
    CREATE INDEX article_translations_body_gin ON article_translations USING GIN (body_vec);
  `;
}
