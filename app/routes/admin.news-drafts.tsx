// News autopilot — admin draft review queue (TED-114 / ADR-016 §4/§5).
//
// Lists `news_drafts` rows in `pending`/`approved` status for a human to
// review: HE (source of truth) side by side with the EN/AM machine drafts,
// the source link, and approve/reject actions. AM gets its own two-path
// workflow per ADR-016 §4:
//   - the ordinary path: mark the AM draft human-reviewed
//     (`amStatus: "human_reviewed"`), unlimited, no special gate.
//   - the exceptional path: "urgent override" — publish the machine AM draft
//     without human review, logged with a required reason. Hard-capped at
//     `AM_OVERRIDE_WEEKLY_LIMIT` per rolling 7 days (Amendment 2) — the
//     option is only offered (and only accepted server-side) while the
//     acting admin hasn't used up this week's quota; see
//     `app/lib/news/autopilot/am-override.ts`.
//
// Promotion to the static seed (`scripts/news-promote.ts`) is a separate,
// manually-invoked step once a draft is `status: "approved"` — this route
// does not call it. Gated end-to-end by `requireRole(request, "admin")`,
// per ADR-016's note that the admin surface depends on the DB-backed role
// lookup actually being wired (app/lib/auth/guards.ts).

import { and, desc, eq, gte, inArray } from "drizzle-orm";
import { data, Form } from "react-router";
import type { Route } from "./+types/admin.news-drafts";
import { db } from "~/lib/db.server";
import { requireRole } from "~/lib/auth/guards";
import { newsDrafts, type newsDraftLocaleStatusEnum } from "~/lib/db/schema/news-drafts";
import {
  AM_OVERRIDE_WEEKLY_LIMIT,
  amOverrideResetAt,
  isAmOverrideAllowed,
} from "~/lib/news/autopilot/am-override";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

type LocaleStatus = (typeof newsDraftLocaleStatusEnum.enumValues)[number];

// --- loader ------------------------------------------------------------------

export async function loader({ request }: Route.LoaderArgs) {
  const admin = await requireRole(request, "admin");

  const drafts = await db
    .select()
    .from(newsDrafts)
    .where(inArray(newsDrafts.status, ["pending", "approved"]))
    .orderBy(desc(newsDrafts.createdAt));

  // Amendment 2's rolling-7-day AM override cap — per acting admin. The
  // partial index (`news_drafts_am_override_at_idx`) makes this cheap.
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentOverrides = await db
    .select({ at: newsDrafts.amUrgentOverrideAt })
    .from(newsDrafts)
    .where(
      and(
        eq(newsDrafts.amUrgentOverrideByUserId, admin.id),
        eq(newsDrafts.amUrgentOverride, true),
        gte(newsDrafts.amUrgentOverrideAt, sevenDaysAgo),
      ),
    );
  const recentOverrideTimestamps = recentOverrides
    .map((r) => r.at)
    .filter((d): d is Date => d !== null);

  const overrideAllowed = isAmOverrideAllowed(recentOverrideTimestamps, new Date());
  const overrideResetAt = amOverrideResetAt(recentOverrideTimestamps, new Date());

  return { drafts, overrideAllowed, overrideResetAt };
}

export const meta: Route.MetaFunction = () => [
  { title: "News Autopilot — סקירת טיוטות" },
  { name: "robots", content: "noindex" },
];

// --- action ------------------------------------------------------------------

async function assertDraftEditable(draftId: string) {
  const [row] = await db
    .select({ id: newsDrafts.id, status: newsDrafts.status })
    .from(newsDrafts)
    .where(eq(newsDrafts.id, draftId))
    .limit(1);
  if (!row) throw data({ error: "Draft not found" }, { status: 404 });
  return row;
}

export async function action({ request }: Route.ActionArgs) {
  const admin = await requireRole(request, "admin");

  const form = await request.formData();
  const intent = String(form.get("intent") ?? "");
  const draftId = String(form.get("draftId") ?? "");
  if (!draftId) {
    return data({ error: "Missing draftId" }, { status: 400 });
  }

  await assertDraftEditable(draftId);

  if (intent === "approve") {
    await db
      .update(newsDrafts)
      .set({ status: "approved", reviewerUserId: admin.id, reviewedAt: new Date() })
      .where(eq(newsDrafts.id, draftId));
    return data({ ok: true });
  }

  if (intent === "reject") {
    await db
      .update(newsDrafts)
      .set({ status: "rejected", reviewerUserId: admin.id, reviewedAt: new Date() })
      .where(eq(newsDrafts.id, draftId));
    return data({ ok: true });
  }

  if (intent === "am_review") {
    const amStatus: LocaleStatus = "human_reviewed";
    await db.update(newsDrafts).set({ amStatus }).where(eq(newsDrafts.id, draftId));
    return data({ ok: true });
  }

  if (intent === "am_override") {
    const reason = String(form.get("reason") ?? "").trim();
    if (!reason) {
      return data({ error: "AM urgent override requires a reason." }, { status: 400 });
    }

    // Hard block, re-checked server-side regardless of what the form showed
    // (per ADR-016 Amendment 2 — "המערכת חייבת לסרב", not a soft warning).
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentOverrides = await db
      .select({ at: newsDrafts.amUrgentOverrideAt })
      .from(newsDrafts)
      .where(
        and(
          eq(newsDrafts.amUrgentOverrideByUserId, admin.id),
          eq(newsDrafts.amUrgentOverride, true),
          gte(newsDrafts.amUrgentOverrideAt, sevenDaysAgo),
        ),
      );
    const recentTimestamps = recentOverrides
      .map((r) => r.at)
      .filter((d): d is Date => d !== null);

    if (!isAmOverrideAllowed(recentTimestamps, new Date())) {
      const resetAt = amOverrideResetAt(recentTimestamps, new Date());
      return data(
        {
          error: `מכסת ה-override השבועית (${AM_OVERRIDE_WEEKLY_LIMIT} לשבוע) נוצלה. יש להשתמש בסקירה אנושית רגילה.${
            resetAt ? ` מתאפס ב-${resetAt.toISOString()}.` : ""
          }`,
        },
        { status: 409 },
      );
    }

    await db
      .update(newsDrafts)
      .set({
        amUrgentOverride: true,
        amUrgentOverrideReason: reason,
        amUrgentOverrideByUserId: admin.id,
        amUrgentOverrideAt: new Date(),
      })
      .where(eq(newsDrafts.id, draftId));
    return data({ ok: true });
  }

  return data({ error: `Unknown intent "${intent}"` }, { status: 400 });
}

// --- UI ------------------------------------------------------------------------

function LocaleBlock({
  label,
  title,
  excerpt,
  body,
  status,
}: {
  label: string;
  title?: string;
  excerpt?: string;
  body?: string | null;
  status?: LocaleStatus;
}) {
  if (!title && !body) {
    return (
      <div className="rounded-md border border-dashed border-zinc-800 p-3 text-sm text-zinc-500">
        {label}: אין טיוטה
      </div>
    );
  }
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900 p-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-zinc-400">{label}</span>
        {status && (
          <Badge variant={status === "human_reviewed" ? "success" : "default"}>
            {status}
          </Badge>
        )}
      </div>
      {title && <p className="font-medium text-zinc-100">{title}</p>}
      {excerpt && <p className="mt-1 text-sm text-zinc-300">{excerpt}</p>}
      {body && (
        <p className="mt-2 line-clamp-4 text-sm whitespace-pre-line text-zinc-400">
          {body}
        </p>
      )}
    </div>
  );
}

export default function AdminNewsDrafts({ loaderData }: Route.ComponentProps) {
  const { drafts, overrideAllowed, overrideResetAt } = loaderData;

  return (
    <div dir="rtl" className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            News Autopilot — סקירת טיוטות
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            {drafts.length} טיוטות ממתינות/מאושרות · מכסת AM override השבועית:{" "}
            {overrideAllowed
              ? "פנויה"
              : `נוצלה, מתאפסת ב-${overrideResetAt?.toISOString() ?? "-"}`}
          </p>
        </header>

        <div className="flex flex-col gap-6">
          {drafts.length === 0 && (
            <p className="text-sm text-zinc-500">אין טיוטות ממתינות כרגע.</p>
          )}

          {drafts.map((draft) => (
            <Card key={draft.id} className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-zinc-100">
                    {draft.heTitle?.he ?? "(ללא כותרת)"}
                  </CardTitle>
                  <Badge variant={draft.status === "approved" ? "success" : "default"}>
                    {draft.status}
                  </Badge>
                </div>
                <a
                  href={draft.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-200"
                >
                  {draft.sourceName} — {draft.sourceUrl}
                </a>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <LocaleBlock
                    label="HE"
                    title={draft.heTitle?.he}
                    excerpt={draft.heExcerpt?.he}
                    body={draft.heBody}
                  />
                  <LocaleBlock
                    label="EN"
                    title={draft.enTitle?.en}
                    excerpt={draft.enExcerpt?.en}
                    body={draft.enBody}
                    status={draft.enStatus}
                  />
                  <LocaleBlock
                    label="AM"
                    title={draft.amTitle?.am}
                    excerpt={draft.amExcerpt?.am}
                    body={draft.amBody}
                    status={draft.amStatus}
                  />
                </div>

                {/* Overall content approve/reject */}
                <div className="flex flex-wrap gap-2 border-t border-zinc-800 pt-3">
                  <Form method="post">
                    <input type="hidden" name="draftId" value={draft.id} />
                    <input type="hidden" name="intent" value="approve" />
                    <Button type="submit" variant="success" size="sm">
                      אישור
                    </Button>
                  </Form>
                  <Form method="post">
                    <input type="hidden" name="draftId" value={draft.id} />
                    <input type="hidden" name="intent" value="reject" />
                    <Button type="submit" variant="destructive" size="sm">
                      דחייה
                    </Button>
                  </Form>
                </div>

                {/* AM-specific workflow */}
                {draft.amBody && draft.amStatus === "machine_draft" && (
                  <div className="flex flex-col gap-3 border-t border-zinc-800 pt-3">
                    <p className="text-xs font-semibold text-zinc-400">
                      אמהרית ממתינה לסקירה
                    </p>
                    <Form method="post">
                      <input type="hidden" name="draftId" value={draft.id} />
                      <input type="hidden" name="intent" value="am_review" />
                      <Button type="submit" size="sm" variant="outline">
                        אשר סקירה אנושית רגילה (AM)
                      </Button>
                    </Form>

                    {overrideAllowed ? (
                      <Form
                        method="post"
                        className="flex flex-col gap-2 rounded-md border border-amber-900/50 bg-amber-950/20 p-3"
                      >
                        <input type="hidden" name="draftId" value={draft.id} />
                        <input type="hidden" name="intent" value="am_override" />
                        <div className="flex items-center gap-2">
                          <Checkbox id={`urgent-${draft.id}`} required />
                          <Label
                            htmlFor={`urgent-${draft.id}`}
                            className="text-sm text-amber-200"
                          >
                            פרסום דחוף ללא בדיקה (AM urgent override)
                          </Label>
                        </div>
                        <Textarea
                          name="reason"
                          required
                          placeholder="סיבה (חובה) — לדוגמה: מועד הגשה 3 ימים"
                          className="text-sm"
                        />
                        <Button type="submit" size="sm" variant="destructive">
                          פרסם AM ללא בדיקה
                        </Button>
                      </Form>
                    ) : (
                      <p className="text-xs text-amber-500">
                        מכסת ה-override השבועית ({AM_OVERRIDE_WEEKLY_LIMIT} לשבוע) נוצלה —
                        יש להשתמש בסקירה אנושית רגילה עד לאיפוס
                        {overrideResetAt ? ` (${overrideResetAt.toISOString()})` : ""}.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
