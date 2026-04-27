// Identity & access — users, agencies, agency membership.
// Auth.js tables (accounts, sessions, verification_tokens) live in `auth.ts`
// and reuse `users` from this module per ADR-003.

import { sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import {
  localeEnum,
  softDelete,
  timestamps,
  translatable,
  translatableNullable,
} from "../columns";

// --- Enums -----------------------------------------------------------------

export const userRoleEnum = pgEnum("user_role", [
  "user",
  "agency_member",
  "agency_admin",
  "admin",
]);

// `suspended` added per TED-21: admins can demote a previously-verified
// agency without deleting it (e.g. compliance review, payment failure).
// Distinct from `rejected` which is the terminal state of the initial
// onboarding check.
export const verificationStatusEnum = pgEnum("verification_status", [
  "pending",
  "verified",
  "rejected",
  "suspended",
]);

// Per-agency role. `owner` = signs the contract / can rename or delete the
// agency / can invite admins. `agent` = sales agent — can CRUD listings and
// claim leads but cannot delete the agency itself. (TED-21)
export const AGENCY_ROLES = ["owner", "agent"] as const;
export type AgencyRoleInAgency = (typeof AGENCY_ROLES)[number];

// Membership lifecycle, separate from role:
//   - invited : owner sent invite, user has not accepted
//   - active  : day-to-day state
//   - suspended : revoked without deletion (audit trail preserved)
export const agencyMemberStatusEnum = pgEnum("agency_member_status", [
  "invited",
  "active",
  "suspended",
]);

// --- users -----------------------------------------------------------------
// Auth.js Drizzle adapter writes here (ADR-003). The adapter requires
// `email`, `emailVerified`, `image`, `name` columns — we match.

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).unique().notNull(),
    // Auth.js sets this on magic-link confirm or OAuth (ADR-003).
    emailVerified: timestamp("email_verified", { withTimezone: true }),
    name: text("name"),
    image: text("image"),
    phone: varchar("phone", { length: 32 }),
    role: userRoleEnum("role").notNull().default("user"),
    preferredLocale: localeEnum("preferred_locale").notNull().default("he"),
    ...timestamps,
    ...softDelete,
  },
  // `email` has `.unique()`; that already creates the index Auth.js needs.
);

// --- agencies --------------------------------------------------------------
// `legalId` and `licenseNumber` are required at verification time, but the
// signup form only collects them on step 2 — so they're nullable at the
// column level and the admin verification gate enforces presence (TED-21).

export const agencies = pgTable(
  "agencies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: translatable("name"),
    slug: translatable("slug"),
    ownerUserId: uuid("owner_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    verificationStatus: verificationStatusEnum("verification_status")
      .notNull()
      .default("pending"),
    // Israeli legal identifier — ת.ז. (9-digit) for sole proprietors or
    // ח.פ. (9-digit) for incorporated brokerages. Validated by the Zod
    // schema in `app/lib/validation/agency.ts` (Luhn-style check digit).
    legalId: varchar("legal_id", { length: 32 }),
    // רישיון תיווך — Ministry of Justice broker license number. Required
    // before `verificationStatus` may transition to `verified`.
    licenseNumber: varchar("license_number", { length: 64 }),
    // Optional company blurb — agencies sign up before writing one.
    // (QA-PR1, M3.)
    description: translatableNullable("description"),
    contactEmail: varchar("contact_email", { length: 320 }),
    contactPhone: varchar("contact_phone", { length: 32 }),
    websiteUrl: text("website_url"),
    ...timestamps,
    ...softDelete,
  },
  (t) => ({
    ownerIdx: index("agencies_owner_idx").on(t.ownerUserId),
    verificationIdx: index("agencies_verification_idx").on(t.verificationStatus),
    // legal_id and license_number must be unique among non-deleted agencies
    // when present — two different agencies cannot share the same Ministry
    // license. Partial so the (overwhelmingly common) draft state with
    // NULLs doesn't collide.
    legalIdUniq: uniqueIndex("agencies_legal_id_unique")
      .on(t.legalId)
      .where(sql`${t.deletedAt} IS NULL AND ${t.legalId} IS NOT NULL`),
    licenseUniq: uniqueIndex("agencies_license_number_unique")
      .on(t.licenseNumber)
      .where(sql`${t.deletedAt} IS NULL AND ${t.licenseNumber} IS NOT NULL`),
    // Slug uniqueness: global per-locale (no parent in `/he/agencies/:slug`).
    slugHeIdx: uniqueIndex("agencies_slug_he_unique")
      .on(sql`(${t.slug} ->> 'he')`)
      .where(sql`${t.deletedAt} IS NULL`),
    slugEnIdx: uniqueIndex("agencies_slug_en_unique")
      .on(sql`(${t.slug} ->> 'en')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'en') IS NOT NULL`),
    slugAmIdx: uniqueIndex("agencies_slug_am_unique")
      .on(sql`(${t.slug} ->> 'am')`)
      .where(sql`${t.deletedAt} IS NULL AND (${t.slug} ->> 'am') IS NOT NULL`),
  }),
);

// --- agency_members --------------------------------------------------------
// Two-axis RBAC per ADR-003: users.role is global; this row is per-agency.

export const agencyMembers = pgTable(
  "agency_members",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    agencyId: uuid("agency_id")
      .notNull()
      .references(() => agencies.id, { onDelete: "cascade" }),
    // 'owner' | 'agent' — see AGENCY_ROLES above.
    roleInAgency: text("role_in_agency").notNull(),
    status: agencyMemberStatusEnum("status").notNull().default("invited"),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.agencyId] }),
    agencyLookup: index("agency_members_agency_idx").on(t.agencyId, t.status),
  }),
);
