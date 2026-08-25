// News autopilot ingest endpoint (TED-114 / ADR-016 §1, §3, §5).
//
// This route is the ONLY write path into `news_drafts`. Per ADR-016
// Amendment 1/2, the AI work (fetch → normalize → dedup → triage → HE/EN/AM
// draft) happens *outside* this codebase, inside a Claude Code cloud
// routine running under the owner's own subscription (no ANTHROPIC_API_KEY
// spend anywhere in this repo, and no paid fallback of any kind — see the
// ADR). The routine POSTs its finished draft here over plain HTTPS with a
// bearer secret; this route does nothing but validate + persist.
//
// TODO(DevOps, per ADR-016 implementation handoff): wire the actual
// scheduling —
//   1. Create the Claude Code routine itself (RemoteTrigger / `schedule`
//      skill) — daily cron, `tedros` repo checkout, prompt covering
//      fetch → normalize → triage → draft → POST here.
//   2. `.github/workflows/news-autopilot.yml` — watchdog-and-notify only.
//      Runs ~1-2h after the routine's schedule, calls this route's GET
//      (status check below) with the same bearer secret; if no fresh
//      drafts landed today, sends a Resend notification to
//      ADMIN_NOTIFICATIONS_EMAIL. No execution fallback, no retry, no
//      Anthropic API call from CI — per Amendment 2, there is no paid
//      fallback path anywhere in this design.
// Neither of the above is created by this change — intentionally, per the
// task instructions (nothing scheduled/deployed until the owner signs off).
//
// GET on this same route is a lightweight status check for the watchdog
// (bearer-gated the same way) — "did any drafts land today" — so DevOps
// doesn't need a second authenticated route.

import { timingSafeEqual } from "node:crypto";
import { and, count, eq, gte } from "drizzle-orm";
import { data } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/api.internal.news-autopilot.ingest";
import { db } from "~/lib/db.server";
import { getEnv } from "~/lib/env.server";
import { newsDrafts } from "~/lib/db/schema/news-drafts";
import { ALL_NEWS_TAGS, isNewsTag } from "~/lib/news/categories";

// --- auth --------------------------------------------------------------------

/** Constant-time-ish bearer check against AUTOPILOT_SECRET. */
function authorized(request: Request): boolean {
  const { AUTOPILOT_SECRET } = getEnv();
  if (!AUTOPILOT_SECRET) return false;

  const header = request.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return false;

  // Lengths differ trivially in practice (fixed secret length), but avoid an
  // early-exit `===` compare on attacker-controlled input regardless.
  const a = Buffer.from(token);
  const b = Buffer.from(AUTOPILOT_SECRET);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// --- payload validation --------------------------------------------------------

// Single-locale-populated Translatable fragments (see ADR-016's note on the
// Drizzle schema: each column stores the full `{he,en,am}` shape so the
// promotion script can merge them into `NewsArticleEntry.title`/`.excerpt`
// without reshaping, but at ingest time only the one relevant key is set).
const heFragment = z.object({ he: z.string().trim().min(1) }).strict();
const enFragment = z.object({ en: z.string().trim().min(1) }).strict();
const amFragment = z.object({ am: z.string().trim().min(1) }).strict();

const newsTagSchema = z.string().refine(isNewsTag, {
  message: `must be one of: ${ALL_NEWS_TAGS.join(", ")}`,
});

const ingestSchema = z.object({
  // --- source attribution (audit trail + E-E-A-T citation) -----------------
  sourceUrl: z.string().url(),
  sourceName: z.string().trim().min(1),
  publishedAtSource: z.string().datetime({ offset: true }).optional(),
  // Verbatim fetched title+snippet, for audit/liability (ADR-016 data model).
  rawSnapshot: z.string().trim().min(1),

  // --- AI processing metadata ------------------------------------------------
  relevanceScore: z.number().min(0).max(1).optional(),
  tags: z.array(newsTagSchema).min(1),

  // --- HE (source of truth, required) -----------------------------------------
  heTitle: heFragment,
  heExcerpt: heFragment,
  heBody: z.string().trim().min(1),

  // --- EN mirror (machine-drafted; human review happens in the admin UI,
  // never asserted by the routine itself — see enStatus note below) --------
  enTitle: enFragment.optional(),
  enExcerpt: enFragment.optional(),
  enBody: z.string().trim().min(1).optional(),

  // --- AM (machine-drafted; gated behind human review before promotion,
  // ADR-016 §4 — same rule) -------------------------------------------------
  amTitle: amFragment.optional(),
  amExcerpt: amFragment.optional(),
  amBody: z.string().trim().min(1).optional(),
});

export type NewsAutopilotIngestPayload = z.infer<typeof ingestSchema>;

// --- action (POST — ingest a draft) --------------------------------------------

export async function action({ request }: Route.ActionArgs) {
  if (!authorized(request)) {
    return data({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return data({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ingestSchema.safeParse(json);
  if (!parsed.success) {
    return data(
      { error: "Invalid payload", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const draft = parsed.data;

  // enStatus/amStatus are never accepted from the caller — the routine
  // cannot self-certify "human_reviewed". Every ingested draft starts
  // `machine_draft` (or effectively "skipped" for AM when no AM body was
  // produced); only the admin review route (app/routes/admin.news-drafts.tsx,
  // owned by the review UI work, not this route) may advance either status,
  // and only `amUrgentOverride*` — set exclusively by that admin route,
  // never here — can substitute for AM human review at promotion time.
  const insertValues: typeof newsDrafts.$inferInsert = {
    sourceUrl: draft.sourceUrl,
    sourceName: draft.sourceName,
    publishedAtSource: draft.publishedAtSource
      ? new Date(draft.publishedAtSource)
      : undefined,
    rawSnapshot: draft.rawSnapshot,
    relevanceScore: draft.relevanceScore?.toFixed(2),
    tags: draft.tags,

    // The `translatable*` column helper types every locale column as the
    // full `{he,en,am}` shape (`he` required) so the promotion script can
    // read each one as a self-contained `Translatable` without reshaping
    // (ADR-016's note on `heTitle`/`heExcerpt`) — `he` is carried into the
    // en/am columns for that reason, not because the routine drafted HE
    // text into those fields again.
    heTitle: draft.heTitle,
    heExcerpt: draft.heExcerpt,
    heBody: draft.heBody,

    enTitle: draft.enTitle ? { he: draft.heTitle.he, ...draft.enTitle } : undefined,
    enExcerpt: draft.enExcerpt
      ? { he: draft.heExcerpt.he, ...draft.enExcerpt }
      : undefined,
    enBody: draft.enBody,
    enStatus: "machine_draft",

    amTitle: draft.amTitle ? { he: draft.heTitle.he, ...draft.amTitle } : undefined,
    amExcerpt: draft.amExcerpt
      ? { he: draft.heExcerpt.he, ...draft.amExcerpt }
      : undefined,
    amBody: draft.amBody,
    amStatus: draft.amBody ? "machine_draft" : "skipped",

    status: "pending",
  };
  const [row] = await db
    .insert(newsDrafts)
    .values(insertValues)
    // Dedup vs `news_drafts.sourceUrl` (any status) per ADR-016 §2 — the
    // routine does its own dedup too, but the unique index is the source of
    // truth. A conflict here means the routine re-fetched something it (or
    // a previous run) already ingested; treat it as a no-op, not an error.
    .onConflictDoNothing({ target: newsDrafts.sourceUrl })
    .returning({ id: newsDrafts.id });

  if (!row) {
    return data({ ok: true, duplicate: true });
  }

  return data({ ok: true, duplicate: false, id: row.id }, { status: 201 });
}

// --- loader (GET — watchdog status check, ADR-016 §1) --------------------------
//
// "N fresh drafts today?" for the GH Actions watchdog — avoids needing a
// second authenticated route just to answer that one question.

export async function loader({ request }: Route.LoaderArgs) {
  if (!authorized(request)) {
    return data({ error: "Unauthorized" }, { status: 401 });
  }

  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);

  const [row] = await db
    .select({ total: count() })
    .from(newsDrafts)
    .where(
      and(gte(newsDrafts.createdAt, startOfToday), eq(newsDrafts.status, "pending")),
    );

  return data({ freshDraftsToday: row?.total ?? 0, checkedAt: new Date().toISOString() });
}
