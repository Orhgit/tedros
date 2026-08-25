// AM urgent-override rate limit (TED-114 / ADR-019 §4, Amendment 2).
//
// "~2 overrides per rolling 7 days", enforced at the action layer (a rolling
// window can't be a Postgres CHECK constraint — see the comment on
// `news_drafts_am_override_at_idx` in app/lib/db/schema/news-drafts.ts).
// This is a hard block per the owner's explicit phrasing ("המערכת חייבת
// לסרב"), not a soft warning — see ADR-019 Amendment 2, Open Question #4.
//
// Pure and DB-free by design (mirrors the pattern in
// app/lib/leads/rate-limit.ts) so the windowing logic is unit-testable
// without a live Postgres connection. The caller (the admin review action)
// is responsible for fetching the candidate timestamps — rows where
// `amUrgentOverrideByUserId = <the acting admin>` and `amUrgentOverride =
// true` — from `news_drafts` and handing them here; this function only
// decides whether the window's already at capacity.

/** Rolling window length for the AM urgent-override cap. */
export const AM_OVERRIDE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/** Max overrides allowed within the rolling window ("~2/week"). */
export const AM_OVERRIDE_WEEKLY_LIMIT = 2;

function withinWindow(recentTimestamps: Date[], now: Date): Date[] {
  const cutoff = now.getTime() - AM_OVERRIDE_WINDOW_MS;
  return recentTimestamps
    .filter((t) => t.getTime() >= cutoff)
    .sort((a, b) => a.getTime() - b.getTime());
}

/**
 * Whether a new AM urgent-override is allowed right now, given the acting
 * admin's past override timestamps. Strictly less-than the limit — hitting
 * the limit exactly locks out the next attempt (per the "בדיוק 2 → נעול"
 * requirement).
 */
export function isAmOverrideAllowed(
  recentTimestamps: Date[],
  now: Date = new Date(),
): boolean {
  return withinWindow(recentTimestamps, now).length < AM_OVERRIDE_WEEKLY_LIMIT;
}

/**
 * When the cap next frees up a slot (the oldest in-window override's
 * timestamp + the window length), or `null` if an override is allowed right
 * now. For the admin UI's "the weekly limit is reached and when it resets"
 * message (ADR-019 §4, Amendment 2).
 */
export function amOverrideResetAt(
  recentTimestamps: Date[],
  now: Date = new Date(),
): Date | null {
  const inWindow = withinWindow(recentTimestamps, now);
  if (inWindow.length < AM_OVERRIDE_WEEKLY_LIMIT) return null;
  const oldest = inWindow[0]!;
  return new Date(oldest.getTime() + AM_OVERRIDE_WINDOW_MS);
}
