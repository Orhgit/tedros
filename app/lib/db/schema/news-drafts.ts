// News autopilot draft queue (TED-114 / ADR-016).
// Published articles remain the static ARTICLES seed in app/lib/news/ —
// this table is the review queue only, per the ADR-015 static-vs-DB rule.

import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { timestamps, translatableNullable } from "../columns";
import { users } from "./identity";

export const newsDraftStatusEnum = pgEnum("news_draft_status", [
  "pending",
  "approved",
  "rejected",
  "promoted",
]);

// AM requires human review before promotion (risk R3 / CLAUDE.md).
// EN is lower-risk but still gated — nothing promotes untouched.
export const newsDraftLocaleStatusEnum = pgEnum("news_draft_locale_status", [
  "machine_draft",
  "human_reviewed",
  "skipped",
]);

// Amendment 1 (2026-08-24): how a draft reached the static seed — for audit,
// distinguishing the standard human-PR-reviewed path from the CI-gated
// fast-track path that skips the *human* PR review only (ADR-016 §5).
export const newsDraftPromotionMethodEnum = pgEnum("news_draft_promotion_method", [
  "manual_pr",
  "fast_track",
]);

export const newsDrafts = pgTable(
  "news_drafts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // --- source attribution (audit trail + E-E-A-T citation) -------------
    sourceUrl: text("source_url").notNull(),
    sourceName: text("source_name").notNull(),
    publishedAtSource: timestamp("published_at_source", { withTimezone: true }),
    rawSnapshot: text("raw_snapshot").notNull(), // fetched title+snippet verbatim

    // --- AI processing metadata -------------------------------------------
    relevanceScore: numeric("relevance_score", { precision: 3, scale: 2 }),
    tags: jsonb("tags").notNull().default([]), // NewsTag[]

    // --- HE (source of truth) ----------------------------------------------
    heTitle: translatableNullable("he_title"),
    heExcerpt: translatableNullable("he_excerpt"),
    heBody: text("he_body"),

    // --- EN mirror -----------------------------------------------------------
    enTitle: translatableNullable("en_title"),
    enExcerpt: translatableNullable("en_excerpt"),
    enBody: text("en_body"),
    enStatus: newsDraftLocaleStatusEnum("en_status").notNull().default("machine_draft"),

    // --- AM (gated — see ADR-016 §4) ----------------------------------------
    amTitle: translatableNullable("am_title"),
    amExcerpt: translatableNullable("am_excerpt"),
    amBody: text("am_body"),
    amStatus: newsDraftLocaleStatusEnum("am_status").notNull().default("machine_draft"),

    // Amendment 1 (2026-08-24): exceptional path — publish machine-only AM
    // for genuinely urgent items. Default false; promotion script requires
    // reason + admin id set together with the flag, never just the flag.
    amUrgentOverride: boolean("am_urgent_override").notNull().default(false),
    amUrgentOverrideReason: text("am_urgent_override_reason"),
    amUrgentOverrideByUserId: uuid("am_urgent_override_by_user_id").references(
      () => users.id,
      { onDelete: "set null" },
    ),
    amUrgentOverrideAt: timestamp("am_urgent_override_at", { withTimezone: true }),

    // --- review workflow -----------------------------------------------------
    status: newsDraftStatusEnum("status").notNull().default("pending"),
    reviewerUserId: uuid("reviewer_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    promotedSlug: text("promoted_slug"), // set once appended to the static seed
    promotionMethod: newsDraftPromotionMethodEnum("promotion_method"), // set at promotion time

    ...timestamps,
  },
  (t) => ({
    sourceUrlUnique: uniqueIndex("news_drafts_source_url_unique").on(t.sourceUrl),
    statusIdx: index("news_drafts_status_idx").on(t.status),
    pendingReview: index("news_drafts_pending_idx")
      .on(t.createdAt)
      .where(sql`${t.status} = 'pending'`),
    // Amendment 2 (2026-08-24): supports the action-layer rolling-7-day
    // count that enforces the ~2/week AM urgent-override cap (ADR-016 §4). A
    // rolling window can't be a CHECK constraint, so this index just makes
    // the per-admin COUNT(*) WHERE am_urgent_override_at >= now() - interval
    // '7 days' query cheap at the route layer.
    amOverrideRecency: index("news_drafts_am_override_at_idx")
      .on(t.amUrgentOverrideByUserId, t.amUrgentOverrideAt)
      .where(sql`${t.amUrgentOverride} = true`),
  }),
);
