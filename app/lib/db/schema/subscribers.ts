// Email subscribers (TED-25). Double-opt-in flow:
//   1. Visitor submits email on the homepage.
//   2. Row is created with `confirmation_token`; we send the confirmation
//      mail.
//   3. Visitor clicks the link → `confirmed_at` is stamped and the token is
//      cleared (single-use). The row stays.
//   4. Every outbound mail carries an `unsubscribe_token` link (one-click).
//
// `userId` is nullable because most subscribers register before they ever
// sign in. On first login (Auth.js callback) we backfill `userId` by email:
// the subscribers row outlives any unauthenticated session.

import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { localeEnum, softDelete, timestamps } from "../columns";
import { users } from "./identity";

export const subscribers = pgTable(
  "subscribers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    locale: localeEnum("locale").notNull().default("he"),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    // `null` until the user clicks the confirmation link in the welcome mail.
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    // Single-use, cleared on confirm. NULL on already-confirmed rows.
    confirmationToken: text("confirmation_token"),
    // Permanent — every email we send links here for one-click unsubscribe.
    unsubscribeToken: text("unsubscribe_token").notNull(),
    // Topic preferences (e.g. ["rights", "realestate"]). Empty = all.
    interests: jsonb("interests")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    ...timestamps,
    ...softDelete,
  },
  (t) => ({
    // One subscriber per email among non-deleted rows. After unsubscribe
    // (soft-delete) the user can re-subscribe and we'll create a fresh row.
    emailUnique: uniqueIndex("subscribers_email_unique")
      .on(t.email)
      .where(sql`${t.deletedAt} IS NULL`),
    // Tokens are unique while present. Confirmation token nulls out on
    // confirm; unsubscribe token persists.
    confirmTokenUnique: uniqueIndex("subscribers_confirmation_token_unique")
      .on(t.confirmationToken)
      .where(sql`${t.confirmationToken} IS NOT NULL`),
    unsubTokenUnique: uniqueIndex("subscribers_unsubscribe_token_unique").on(
      t.unsubscribeToken,
    ),
    userIdx: index("subscribers_user_idx").on(t.userId),
  }),
);
