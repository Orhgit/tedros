# DB schema — Phase 1 (Tedros Data & Integrations)

Drizzle schema for ADR-002, with Vega's D3 (Postgres-native), D4 (audit_log + monthly partitioning), and D5 (timestamp helpers + 5-way `actor_type`) baked in. Owner: Tedros Data & Integrations.

## Layout

```
app/lib/db/
├── columns.ts                 # timestamps, softDelete, publishable, locale, translatable, tsvector
├── schema/
│   ├── index.ts               # barrel re-export
│   ├── identity.ts            # users, agencies, agency_members + enums
│   ├── auth.ts                # Auth.js v5 adapter tables
│   ├── realestate.ts          # cities, neighborhoods, listings, listing_translations, listing_media, leads
│   ├── rights.ts              # rights, programs + per-locale body translations
│   ├── professionals.ts       # professionals, categories (M2M), reviews
│   ├── content.ts             # articles + translations, programmatic_pages
│   └── audit.ts               # audit_log (partition-ready), slug_history (polymorphic)
├── migrations/
│   ├── _partitions.sql.ts     # ensureRollingPartitions(now) — daily worker call, +3 months ahead
│   └── _post_init.sql.ts      # postInitSql() — extensions + partitioned audit_log + tsvector columns + GIN indexes
└── seeds/
    └── cities.ts              # 5 Phase-1 cities; extends to 50 in Phase 2
```

## Migration sequence (Engineer integration)

`drizzle-kit generate` covers ordinary tables / indexes / enums. Four pieces need raw SQL applied immediately after, in the same transaction. `_post_init.sql.ts` exports `postInitSql()` returning that SQL; call it from your migration runner after `0000_init.sql` applies.

1. `CREATE EXTENSION IF NOT EXISTS pgcrypto, unaccent` + define `immutable_unaccent(text)` — an `IMMUTABLE` SQL wrapper around `unaccent('unaccent', $1)`. Required because raw `unaccent()` is `STABLE` and Postgres rejects `STABLE` expressions inside `GENERATED ALWAYS AS ... STORED`.
2. `audit_log` becomes `PARTITION BY RANGE (occurred_at)` + 3 monthly partitions (current + next 2). Wire `ensureRollingPartitions(now)` into a daily worker (DevOps).
3. `*search_vec` / `*body_vec` columns become `GENERATED ALWAYS AS (to_tsvector('simple', immutable_unaccent(...))) STORED`.
4. GIN indexes on those generated columns.

## Locked decisions (ADR-002 thread + Vega D1–D5)

| Topic                   | Decision                                                                                                                                           | Source                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Translation strategy    | JSONB on-row for short text; sidecar `*_translations` for long body + FTS                                                                          | ADR-002               |
| Slug uniqueness         | `(city_id, locale)` for `listings`; global per-locale for `agencies` / `articles` / `rights` / `programs` / `professionals` / `programmatic_pages` | My proposal, Vega ack |
| FTS config              | `simple` + `unaccent` for HE / EN / AM (Postgres has no production-ready dictionary for HE or AM in 2026)                                          | Vega                  |
| `slug_history`          | Single polymorphic table with `entity_type` discriminator; no DB-level FK; app-layer cleanup                                                       | My proposal, Vega ack |
| Soft delete             | `deleted_at` on user-facing content; partial unique indexes guard `WHERE deleted_at IS NULL`                                                       | ADR-002 + D5          |
| Audit                   | Single `audit_log` table, partitioned monthly; written by `withAudit()` wrapper at the action layer (not DB triggers)                              | ADR-002 + D4          |
| `actor_type`            | `'user' \| 'agency' \| 'admin' \| 'agent' \| 'system'` — distinguishes user-initiated, B2B, platform-team, agent automation, and system jobs       | Vega                  |
| Timestamps              | `timestamptz` everywhere; `defaultNow()` at DB; `$onUpdate` on `updated_at`                                                                        | D5                    |
| Postgres-native Drizzle | JSONB + partial indexes + generated tsvector + expression indexes all used; no abstraction layer                                                   | D3                    |

## Out of scope for this PR

- `app/db.server.ts` (Drizzle client wired to `DATABASE_URL`) — Engineer (skeleton).
- `drizzle.config.ts` — Engineer.
- `package.json` with `drizzle-orm` / `drizzle-kit` — Engineer.
- `pnpm drizzle-kit generate` — runs after Engineer's skeleton lands.
- `withAudit()` wrapper at the action layer — Engineer or me, post-skeleton.
- Zod listing-attribute validators per `listing_type` — me, post-skeleton.
- Daily cron calling `ensureRollingPartitions(now)` — DevOps, per Vega.
- Seed extended to 50 cities + categories + rights/programs content — me, post-skeleton.

## First-run admin

There is no admin user seed — `users.role` defaults to `'user'`. To bootstrap the first admin after migrations:

```sql
UPDATE users SET role = 'admin' WHERE email = '<your-email>';
```

Document the chosen admin email in your deployment runbook. (QA-PR1, N3.)
