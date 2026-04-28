// Audit log + slug history.
//
// audit_log shape per Vega D4: monthly RANGE partitioning by occurred_at.
// Drizzle has no first-class partitioned-table DSL — we declare the parent
// table here, and the migration emits `PARTITION BY RANGE (occurred_at)`
// + monthly partition creation as raw SQL. See the migration helper at
// `app/lib/db/migrations/_partitions.sql.ts`.
//
// slug_history: single polymorphic table per my proposal, no FK enforced
// at the DB layer (Postgres can't FK to multiple parent tables). Cleanup
// runs in the application layer alongside soft-delete + rename actions.

import {
  index,
  inet,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { localeEnum } from "../columns";

// --- Enums -----------------------------------------------------------------

export const auditActionEnum = pgEnum("audit_action", [
  "create",
  "update",
  "delete",
  "restore",
  "publish",
  "unpublish",
  "verify",
  "reject",
  "login",
  "logout",
  "consent_grant",
  "consent_revoke",
]);

// Five-way distinction (Vega, 2026-04-26):
//   - user:   end user via the web app
//   - agency: agency_member / agency_admin acting in their B2B context
//   - admin:  Tedros team operating the platform
//   - agent:  Multica AI agent writing directly (Researcher, Architect, ...)
//   - system: cron jobs, sync workers, migrations, no human/agent in the loop
// Distinguishing user/agency/admin (rather than collapsing to 'user') makes
// audit queries answerable without joining users.role at the time of action.
export const actorTypeEnum = pgEnum("actor_type", [
  "user",
  "agency",
  "admin",
  "agent",
  "system",
]);

// --- audit_log -------------------------------------------------------------
// Append-only. Partitioned monthly by `occurred_at` (Vega D4).
// Engineer: see `_partitions.sql.ts` for partition-creation helper.

export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").defaultRandom().notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
    // No FK to users.id by design: actorType can be 'agent' or 'system',
    // for which no users row exists. The id is still meaningful for the
    // 'user'/'agency'/'admin' actor types — joinable in queries when needed.
    // (QA-PR1, N1.)
    actorId: uuid("actor_id"),
    actorType: actorTypeEnum("actor_type").notNull(),
    action: auditActionEnum("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id").notNull(),
    // Tenant scope: agency_id when the entity is owned by/scoped to an agency.
    // Null for global entities (rights, programs, articles, etc.).
    agencyId: uuid("agency_id"),
    before: jsonb("before"),
    after: jsonb("after"),
    diff: jsonb("diff"),
    // Request context. `requestId` matches the X-Request-Id header set by
    // Caddy (ADR-006); makes audit ↔ logs joinable.
    requestId: text("request_id"),
    ip: inet("ip"),
    userAgent: text("user_agent"),
  },
  (t) => ({
    // Partitioned tables require the partition key in the primary key.
    // Declared here so drizzle-kit's `0000_init.sql` emits a real PK
    // matching the partitioned table that `_post_init.sql.ts` re-creates.
    // (QA-PR1, M1.)
    pk: primaryKey({ columns: [t.id, t.occurredAt] }),
    occurredAtIdx: index("audit_log_occurred_at_idx").on(t.occurredAt),
    actorIdx: index("audit_log_actor_idx").on(t.actorId, t.occurredAt),
    entityIdx: index("audit_log_entity_idx").on(t.entityType, t.entityId, t.occurredAt),
    agencyIdx: index("audit_log_agency_idx").on(t.agencyId, t.occurredAt),
    requestIdx: index("audit_log_request_idx").on(t.requestId),
  }),
);

// --- slug_history ----------------------------------------------------------
// Polymorphic: `(entity_type, entity_id)` references one of listings,
// articles, rights, programs, professionals, agencies. No FK enforced at DB.
// 301 redirect lookup is `WHERE locale = ? AND old_slug = ?`.

export const slugHistory = pgTable(
  "slug_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id").notNull(),
    locale: localeEnum("locale").notNull(),
    oldSlug: text("old_slug").notNull(),
    // Optional: scope slugs that were unique-per-(city, locale) for listings.
    // For other entity types this is null.
    scopeId: uuid("scope_id"),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    // 301 redirect lookup is by `(entity_type, locale, scope_id, old_slug)`.
    // UNIQUE prevents an old slug from pointing to two different entities,
    // which would make the redirect non-deterministic. NULLs in `scope_id`
    // (global entities) are treated as distinct by Postgres, which is fine
    // — a global slug history just allows append-only versioning.
    // (QA-PR1, M4.)
    redirectIdx: uniqueIndex("slug_history_redirect_unique").on(
      t.entityType,
      t.locale,
      t.scopeId,
      t.oldSlug,
    ),
    entityIdx: index("slug_history_entity_idx").on(t.entityType, t.entityId),
  }),
);
