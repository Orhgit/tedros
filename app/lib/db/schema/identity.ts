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

import { localeEnum, softDelete, timestamps, translatable } from "../columns";

// --- Enums -----------------------------------------------------------------

export const userRoleEnum = pgEnum("user_role", [
  "user",
  "agency_member",
  "agency_admin",
  "admin",
]);

export const verificationStatusEnum = pgEnum("verification_status", [
  "pending",
  "verified",
  "rejected",
]);

// Per-agency role lives on the join table; not a global enum on users.
// Two values for now; if it grows, promote to pgEnum.
export const AGENCY_ROLES = ["member", "admin"] as const;
export type AgencyRoleInAgency = (typeof AGENCY_ROLES)[number];

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
    description: translatable("description"),
    contactEmail: varchar("contact_email", { length: 320 }),
    contactPhone: varchar("contact_phone", { length: 32 }),
    websiteUrl: text("website_url"),
    ...timestamps,
    ...softDelete,
  },
  (t) => ({
    ownerIdx: index("agencies_owner_idx").on(t.ownerUserId),
    verificationIdx: index("agencies_verification_idx").on(t.verificationStatus),
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
    // 'member' | 'admin' — see AGENCY_ROLES above
    roleInAgency: text("role_in_agency").notNull(),
    ...timestamps,
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.agencyId] }),
    agencyLookup: index("agency_members_agency_idx").on(t.agencyId),
  }),
);
