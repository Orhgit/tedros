# News autopilot — Claude Code routine spec (TED-114 / ADR-019)

**Status: NOT created yet.** This document is the spec/prompt for the daily
Claude Code cloud routine described in [ADR-019](../adr/019-news-autopilot-pipeline.md)
§1/§3 (see Amendment 1 + Amendment 2 — read those, they change the design
materially from the original decision). Nobody has run `RemoteTrigger
action: "create"` against this spec yet — that is a deliberate, separate,
owner-approved step (see "Activation checklist" at the end). Creating the
routine costs nothing by itself (it just registers a schedule); the first
scheduled _fire_ is the point at which it starts doing real work and should
not happen before the owner has reviewed this doc and the secrets are in
place.

## What this is, in one paragraph

Once a day, a fully isolated Claude Code cloud session checks out `tedros`
at `main`, fetches the approved RSS/API sources
(`app/lib/news/autopilot/sources.server.ts`), does relevance triage +
HE/EN/AM drafting itself (no `ANTHROPIC_API_KEY` spend inside this repo —
the routine's own reasoning _is_ the AI work, paid for by the owner's
existing Claude Code subscription), and POSTs each accepted candidate to
`POST https://tedros.co.il/api/internal/news-autopilot/ingest`. That route
(`app/routes/api.internal.news-autopilot.ingest.tsx`) validates against a
Zod schema and inserts into `news_drafts` as `status: "pending"`. Nothing
publishes automatically — a human approves in `admin.news-drafts.tsx` before
anything reaches the static `ARTICLES` seed (ADR-019 §5).

## Why a routine and not GitHub Actions / host cron

Already decided in ADR-019 §1 — do not relitigate here. Short version: a
routine is the only mechanism that does the _reasoning_ (fetch + triage +
draft) under the owner's subscription instead of a metered API bill, and per
Amendment 2 there is **no paid fallback of any kind** — GitHub Actions' only
role is a watchdog that notifies on a miss (see
`.github/workflows/news-autopilot-watchdog.yml`, created alongside this
doc), never an execution path.

## Trigger configuration

| Field                                          | Value                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                                         | `tedros-news-autopilot-daily`                                                                                                                                                                                                                                                                                                                                                               |
| `cron_expression`                              | `0 3 * * *` (03:00 UTC = 06:00 Asia/Jerusalem in summer / 05:00 in winter — early enough that the watchdog, running later, has a fresh signal by the time an admin checks in the morning)                                                                                                                                                                                                   |
| `job_config.ccr.environment_id`                | Default cloud environment (`env_01JeJCEjrymbmVnu3zhNZJ6x` at time of writing — re-confirm via `RemoteTrigger action: "list"` / the `schedule` skill before creating, in case the default changes)                                                                                                                                                                                           |
| `job_config.ccr.session_context.model`         | `claude-sonnet-5` (drafting quality matters — HE is source-of-truth per CLAUDE.md, AM needs to be good enough for a human reviewer to correct rather than rewrite)                                                                                                                                                                                                                          |
| `job_config.ccr.session_context.sources`       | `[{"git_repository": {"url": "https://github.com/Orhgit/tedros"}}]`                                                                                                                                                                                                                                                                                                                         |
| `job_config.ccr.session_context.allowed_tools` | `["Bash", "Read", "Grep", "WebFetch"]` — no `Write`/`Edit`: the routine never modifies the repo, it only reads `sources.server.ts` for the source list/dedup helper and calls out over HTTPS. `Bash` is only needed if the routine chooses to run `fetchAllNewsAutopilotSources()` via `tsx` rather than reimplementing the fetch with `WebFetch` directly — see "Two ways to fetch" below. |
| `enabled`                                      | `true` once activated (see checklist) — create with `enabled: false` and flip it on only after the owner confirms secrets are in place                                                                                                                                                                                                                                                      |

## Secret handling — read this before creating the routine

**A routine cannot read this repo's `.env` / GH Secrets / any host environment
variable** (ADR-019 §1, verified against the `schedule` skill: "It cannot
access local files, local services, or local environment variables"). There
is no `env:` field in the `RemoteTrigger` create body. That means
`AUTOPILOT_SECRET` — the same bearer token `getEnv()` checks in
`api.internal.news-autopilot.ingest.tsx` — has to be embedded as a literal
value **inside the routine's prompt text** at creation time, the same way a
human would paste a token into any other automation that has no secret
store.

Consequences, stated plainly so nobody is surprised later:

- The token will be visible in plaintext to anyone with access to
  `https://claude.ai/code/routines/{id}` (the routine config/run history
  UI) — same blast radius as anyone with prod SSH access already has via
  `.env`, but a different surface, so it should be treated as a real
  secret, not a throwaway value.
- **Do not** reuse an existing production secret value for this if the
  value is shared with anything more sensitive — generate a
  purpose-specific token (`openssl rand -hex 32`, same as the ADR's
  `AUTOPILOT_SECRET` generation note) and set `AUTOPILOT_SECRET` in the
  server's `.env` / prod env to _that_ value. It only needs to authorize
  this one route.
- Rotation (CLAUDE.md: "rotate quarterly") means **two** updates in sync:
  the server's `AUTOPILOT_SECRET` env var (redeploy or restart to pick it
  up) _and_ a `RemoteTrigger action: "update"` call that edits the prompt
  text embedding the old token. Add this to whatever quarterly rotation
  checklist DevOps already runs.

## The prompt (verbatim — this is what goes in `events[].data.message.content`)

```
You are the Tedros News Autopilot, a scheduled daily job (TED-114 / ADR-019).
You run once, do the work below, and stop — you never modify this repo, you
only read from it and make one outbound HTTPS call per accepted news item.

REPO CONTEXT (read, do not write)
- Read app/lib/news/autopilot/sources.server.ts in full. It exports
  `NEWS_AUTOPILOT_SOURCES` (the approved source list) and
  `fetchAllNewsAutopilotSources()`, a fetch+dedup-by-URL helper. You may run
  it directly via `npx tsx -e "..."` in Bash if the sandbox has network
  egress and the repo's dependencies installed (`pnpm install` first), OR
  fetch each source URL yourself with WebFetch and normalize by hand — pick
  whichever is more reliable in your sandbox; the source list in that file
  is the single source of truth for "which sources are approved," don't add
  sources it doesn't list.
- Read app/lib/news/categories.ts for the exact `NewsTag` union
  (`ALL_NEWS_TAGS`) — every tag you emit must be one of these values,
  spelled exactly.
- Read app/lib/db/schema/news-drafts.ts and
  app/routes/api.internal.news-autopilot.ingest.tsx to see the exact Zod
  schema your POST body must satisfy. The route is the source of truth for
  the payload shape — if this prompt and that file ever disagree, the file
  wins.

STEP 1 — FETCH
Fetch every source in NEWS_AUTOPILOT_SOURCES. A single source failing
(HTTP error, malformed feed) must not stop the run — skip it, note it, keep
going with the rest. If ALL sources fail, do not POST anything; end the
session and let the GitHub Actions watchdog's silence-detection catch it
naturally (do not fabricate a placeholder draft to avoid an empty run).

STEP 2 — DEDUP
Before spending any effort drafting, drop any item whose sourceUrl:
  (a) you've already POSTed in this same run (skip a would-be duplicate
      within one session), or
  (b) is obviously already covered by an existing static article — you do
      not have DB read access to `news_drafts`, so true cross-run dedup
      happens server-side via the route's unique index on sourceUrl
      (onConflictDoNothing) — a resubmission is safe, not an error, just
      wasted effort. Don't worry about perfect dedup here; the server is
      the source of truth for "already ingested."

STEP 3 — RELEVANCE TRIAGE
For each remaining item, decide: is this genuinely relevant to Ethiopian-
Israeli community life — housing (especially urban renewal /
התחדשות עירונית), rights, immigration/aliyah, employment, education,
community events, or health as it intersects those? Most Google News /
Walla items will NOT be relevant (those feeds are broad by design, filtered
here, not at the source). Drop anything off-topic, generic national news
with no community angle, or pure noise. Err toward dropping when unsure —
a missed item is recoverable tomorrow; a low-relevance published item is
not (it damages trust in the feed).

Assign a relevanceScore 0–1 (your own judgment; 1 = obviously and directly
about the community, e.g. a housing-lottery row already filtered to a
community-relevant city; lower for indirect/broad relevance).

STEP 4 — DRAFT (HE first, then EN, then AM — per CLAUDE.md's language order)
For each item that survives triage:
- Write heTitle/heExcerpt/heBody in Hebrew. This is the source of truth —
  write it as a real short news item (a few paragraphs), not a stub. Cite
  the source inline where natural ("לפי דיווח..." / "על פי [שם המקור]...").
  NEVER invent a statistic, date, or fact not present in the source's
  title/snippet (rawExcerpt) — if the snippet is thin, write a thin but
  accurate item rather than padding with invented specifics. This is a
  hard rule, not a style preference — it's the E-E-A-T/liability guardrail
  this ADR depends on (risk R12).
- If any assigned tag intersects "rights" or "health", append the standard
  disclaimer to heBody: "מידע זה אינו ייעוץ משפטי/רפואי. לקבלת ליווי אישי
  פנו ל[גורם מקצועי מתאים]." (adapt the bracketed part naturally, don't
  leave the placeholder literal).
- Translate (not re-invent) into enTitle/enExcerpt/enBody — a faithful
  translation of the HE version, not a second independent draft.
- Translate into amTitle/amExcerpt/amBody similarly. If you are not
  confident in Amharic output quality for a given item, it is fine to omit
  the am* fields entirely (the route accepts amTitle/amExcerpt/amBody as
  optional — the draft ingests fine with HE+EN only, amStatus becomes
  "skipped" server-side). Do not guess badly rather than omit.
- tags: pick 1+ from the ALL_NEWS_TAGS list you read in step 0 (exact
  spelling). relevanceScore: the number from step 3.
- sourceUrl / sourceName / rawSnapshot / publishedAtSource: copy verbatim
  from the fetched item (rawSnapshot = the original title+snippet as
  fetched, unedited — this is the audit trail, never paraphrase it).

STEP 5 — POST
For each drafted item, POST to
  https://tedros.co.il/api/internal/news-autopilot/ingest
with header `Authorization: Bearer {AUTOPILOT_SECRET}` (the literal token
value is provided to you as part of this routine's configuration — treat it
as a secret, never print it to your own output/logs) and
`Content-Type: application/json`, body matching this shape exactly
(optional fields may be omitted, not sent as null):

{
  "sourceUrl": "string, must be a valid URL",
  "sourceName": "string",
  "publishedAtSource": "ISO-8601 datetime with offset, e.g. 2026-08-24T10:00:00Z (optional)",
  "rawSnapshot": "string, verbatim fetched title+snippet",
  "relevanceScore": 0.0,
  "tags": ["housing"],
  "heTitle": { "he": "..." },
  "heExcerpt": { "he": "..." },
  "heBody": "...",
  "enTitle": { "en": "..." },
  "enExcerpt": { "en": "..." },
  "enBody": "... (optional, but include enTitle/enExcerpt/enBody together or not at all)",
  "amTitle": { "am": "..." },
  "amExcerpt": { "am": "..." },
  "amBody": "... (optional, same all-or-nothing rule as EN)"
}

Expected responses:
  - 201 { ok: true, duplicate: false, id: "..." } — ingested.
  - 200 { ok: true, duplicate: true } — already existed (unique sourceUrl
    conflict), not an error, just a no-op. Continue to the next item.
  - 401 — AUTOPILOT_SECRET is wrong/missing. Stop immediately, do not retry
    other items (they'll all fail the same way), and end the session with a
    clear final message stating "AUTOPILOT_SECRET auth failed" so the run
    log shows it plainly.
  - 422 { error, issues } — your payload didn't match the schema. Log the
    validation issues in your own output, skip this one item, continue
    with the rest. Do not silently drop the failure — mention it in your
    final summary so a human reviewing the run log sees which item failed
    and why (usually a missing required field or a tag not in
    ALL_NEWS_TAGS).
  - Any 5xx / network error: log it, skip this item, continue. Do not
    retry in a loop.

STEP 6 — FINAL SUMMARY (your last message)
End with a short plain-text summary: how many sources fetched OK / failed
(name each failed source), how many items passed triage, how many POSTed
successfully vs. duplicate vs. failed (with the reason for each failure).
This is what a human reads in the run log if something looks off — make it
scannable, not a wall of text.

HARD RULES (do not deviate)
- Never fabricate a fact, statistic, date, or quote not present in the
  fetched source material.
- Never mark anything as human-reviewed — you have no such authority; the
  ingest route ignores any such claim from you by design.
- Never write to any file in this repository. Read-only checkout.
- Never call any endpoint other than the one ingest URL above.
- If you find yourself uncertain whether an item is relevant, exclude it —
  under-triage is always safer than over-triage for a public-facing feed.
```

### Two ways to fetch — pick one, don't mix silently

The prompt above deliberately leaves the routine a choice: run
`fetchAllNewsAutopilotSources()` via a short `tsx -e` script after
`pnpm install`, or re-implement the fetch with `WebFetch` per source. Both
are valid; the important invariant is that the **source list itself**
(`NEWS_AUTOPILOT_SOURCES` in `sources.server.ts`) stays the single source of
truth for "what's approved to fetch" either way — the routine must read
that file fresh every run (not hardcode a stale copy of the URLs into its
own memory across runs) so a source-list change in the repo takes effect
the very next scheduled run with zero routine reconfiguration.

## Error handling summary (also embedded in the prompt above, restated for reviewers)

| Failure                                                  | Behavior                                                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| One source's fetch fails (HTTP error, feed down)         | Skip that source, continue with the rest, mention it in the final summary.                                     |
| All sources fail                                         | POST nothing. End the run. The watchdog's "no fresh drafts today" check catches this the next morning.         |
| One item's relevance is ambiguous                        | Drop it (bias toward under-triage).                                                                            |
| One item's draft fails schema validation on ingest (422) | Skip that item, log why, continue with the rest.                                                               |
| `AUTOPILOT_SECRET` rejected (401)                        | Stop the whole run immediately — every subsequent call will fail identically; don't burn the session retrying. |
| Ingest route unreachable / 5xx                           | Skip that item, continue, don't retry-loop.                                                                    |
| A duplicate `sourceUrl` (200, `duplicate: true`)         | Not an error — the server already had it (this run or a previous one). Continue normally.                      |

## Activation checklist (owner-facing — nothing below is done yet)

1. Generate a dedicated `AUTOPILOT_SECRET` (`openssl rand -hex 32`) — do
   **not** reuse another secret's value.
2. Set `AUTOPILOT_SECRET` in the production server's `.env` (alongside the
   existing `DATABASE_URL`/`RESEND_API_KEY` etc. per
   `docker-compose.prod.yml`) and restart/redeploy the `tedros` container
   so `getEnv()` picks it up.
3. Confirm the `news_drafts` migration has actually been run against the
   production DB (`pnpm db:migrate` on the server) — the ingest route will
   throw on every request until the table exists.
4. Create the routine with `RemoteTrigger action: "create"` using the exact
   `job_config` above, with the prompt's `{AUTOPILOT_SECRET}` placeholder
   replaced by the real value from step 1 — **start with `enabled: false`**.
5. Run it once manually (`RemoteTrigger action: "run"`) against a _staging_
   `AUTOPILOT_SECRET`/route if one exists, or accept that the first real run
   is against prod and review the run log + the resulting `news_drafts`
   rows closely before trusting subsequent runs unattended.
6. Flip `enabled: true` only after the owner has reviewed at least one
   run's output for HE/EN/AM quality and confirmed the admin review UI
   (`admin.news-drafts.tsx`) is reachable and its `requireRole(admin)`
   check is actually wired (ADR-019 Consequences flags this as a
   prerequisite, not guaranteed yet).
7. Add the GitHub Actions watchdog's required secrets (see
   `.github/workflows/news-autopilot-watchdog.yml` and the secrets list
   in this repo's DevOps report) and flip that workflow from
   `workflow_dispatch`-only to also having a `schedule:` trigger — also a
   deliberate, separate, owner-approved step, not bundled with step 4-6.
