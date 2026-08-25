# Test plan — News autopilot ingest pipeline (TED-114 / ADR-019)

**Owner**: Tedros QA. **Scope**: `app/routes/api.internal.news-autopilot.ingest.tsx`, `app/lib/news/autopilot/sources.server.ts`, `app/lib/db/schema/news-drafts.ts`, `scripts/news-promote.ts`. **Status**: infrastructure only — nothing runs in production yet (no routine created, no `.github/workflows/news-autopilot.yml`, no `app/routes/admin.news-drafts.tsx` review UI). This plan covers what exists in the repo today; the routine itself and the admin review UI are out of scope until they land.

## 1. Route security — `POST /api/internal/news-autopilot/ingest`, `GET` (watchdog)

| #   | Case                                                                                                                                                                               | Expected                                                             |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1.1 | No `Authorization` header                                                                                                                                                          | 401 `{ error: "Unauthorized" }`                                      |
| 1.2 | `Authorization` scheme other than `Bearer` (e.g. `Basic`)                                                                                                                          | 401                                                                  |
| 1.3 | `Bearer` with a wrong/garbage token                                                                                                                                                | 401                                                                  |
| 1.4 | `AUTOPILOT_SECRET` env var unset (not configured)                                                                                                                                  | 401 even with a well-formed token — route must fail closed, not open |
| 1.5 | GET (watchdog status) without a token                                                                                                                                              | 401                                                                  |
| 1.6 | GET with a valid token                                                                                                                                                             | 200, `{ freshDraftsToday, checkedAt }`                               |
| 1.7 | Non-POST method reaches the `action` handler directly                                                                                                                              | 405                                                                  |
| 1.8 | Timing-safe comparison — `authorized()` uses `timingSafeEqual` after an explicit length check, not `===`, specifically to avoid a timing side-channel on attacker-controlled input | code inspection only; not practically testable via Vitest timing     |

**Automated in**: `tests/news-autopilot-ingest.test.ts` (1.1–1.7). 1.8 is a code-review item, not a unit test.

## 2. Payload validation (Zod)

| #   | Case                                                         | Expected                                    |
| --- | ------------------------------------------------------------ | ------------------------------------------- |
| 2.1 | Malformed JSON body                                          | 400 `{ error: "Invalid JSON" }`             |
| 2.2 | Missing required field (`sourceUrl`)                         | 422, `issues.fieldErrors.sourceUrl` present |
| 2.3 | `sourceUrl` not a valid URL                                  | 422                                         |
| 2.4 | `tags: []` (empty array)                                     | 422 — at least one tag required             |
| 2.5 | `tags` containing a value not in `ALL_NEWS_TAGS`             | 422                                         |
| 2.6 | Missing `heBody` (HE is the required source-of-truth locale) | 422                                         |
| 2.7 | Minimal valid payload: HE fields only, EN/AM omitted         | 201, inserted with `amStatus: "skipped"`    |
| 2.8 | No successful insert happens on any 400/422 path             | insert mock never called                    |

**Automated in**: `tests/news-autopilot-ingest.test.ts` (2.1–2.8).

## 3. Server-side status enforcement (the routine cannot self-certify)

The Zod schema (`ingestSchema`) does not even accept `enStatus`/`amStatus`/`status`/`reviewerUserId` as input fields — a non-strict `z.object` silently strips them. On top of that, `action()` hardcodes `enStatus: "machine_draft"`, `amStatus: draft.amBody ? "machine_draft" : "skipped"`, and `status: "pending"` when building the insert row, regardless of what the caller sent. This is defense in depth (schema shape + hardcoded values), not a single point of failure.

| #   | Case                                                                                                                        | Expected                                                                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | Payload tries to smuggle `enStatus: "human_reviewed"`, `amStatus: "human_reviewed"`, `status: "approved"`, `reviewerUserId` | Row is inserted with `enStatus: "machine_draft"`, `amStatus: "machine_draft"`, `status: "pending"`; `reviewerUserId` absent from the insert |
| 3.2 | AM body present                                                                                                             | `amStatus: "machine_draft"`                                                                                                                 |
| 3.3 | AM body absent                                                                                                              | `amStatus: "skipped"`                                                                                                                       |

**Automated in**: `tests/news-autopilot-ingest.test.ts`.

## 4. Dedup by `sourceUrl`

| #   | Case                                                          | Expected                                                                                          |
| --- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 4.1 | First ingest of a given `sourceUrl`                           | `onConflictDoNothing().returning()` yields a row → `{ ok: true, duplicate: false, id }`, HTTP 201 |
| 4.2 | Repeat ingest of the same `sourceUrl` (unique index conflict) | `returning()` yields `[]` → `{ ok: true, duplicate: true }`, no error, no 5xx                     |

**Automated in**: `tests/news-autopilot-ingest.test.ts`, via a mocked `db.insert(...).values(...).onConflictDoNothing().returning()` chain (no live Postgres required — see §6 on why).

## 5. Collection stage — `sources.server.ts`

| #   | Case                                                                     | Expected                                                                                                                                            |
| --- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5.1 | CKAN "מחיר למשתכן" response normalizes correctly                         | title/sourceUrl/rawExcerpt built as documented                                                                                                      |
| 5.2 | CKAN records for a non-`COMMUNITY_RELEVANT_CITIES` city are filtered out | not present in output                                                                                                                               |
| 5.3 | One RSS source returns HTTP 500                                          | `errors` contains that source's id + message; the **other** sources still contribute `items` — batch does not fail wholesale (`Promise.allSettled`) |
| 5.4 | One source returns 200 OK with a non-RSS/malformed body                  | zero items from that source, but **not** counted as an `errors` entry (distinguishes "fetch failed" from "nothing parseable")                       |
| 5.5 | Two sources return an item with the same `sourceUrl`                     | deduped — first occurrence (by registry order) wins, not overwritten by a later source                                                              |
| 5.6 | Registry shape                                                           | exactly 1 CKAN + 3 Google News RSS + 2 Walla sources, ids match ADR-019 §2                                                                          |

**Automated in**: `tests/news-autopilot-sources.test.ts`, via a call-order-indexed `fetch` stub (avoids brittle matching against percent-encoded Hebrew query strings in the mocked URLs).

## 6. AM urgent-override weekly rate limit (~2/rolling-7-days) — **not implemented yet, coverage gap**

ADR-019 §4/Amendment 2 specifies a hard rate limit ("the system must refuse" a 3rd override within a rolling 7 days), enforced at the action layer via `COUNT(*) WHERE am_urgent_override_at >= now() - interval '7 days'`. Searched the repo for this logic:

- **`app/routes/admin.news-drafts.tsx`** (the route ADR-019 names as the owner of the override action) **does not exist yet** — nothing to test.
- **`scripts/news-promote.ts`** only re-validates that an override, if already set on a row, is _internally consistent_ (`amUrgentOverride && amUrgentOverrideReason && amUrgentOverrideByUserId` all set together) — it does **not** implement or check the rolling-7-day count. That's a different, narrower guarantee than the rate limit.
- The supporting index (`news_drafts_am_override_at_idx`) exists in the schema, ready for that future query, but the query itself is nowhere in the codebase.

**Consequence**: the "3rd override in the same week → refused" edge case from the task brief cannot be tested — there is no code path to exercise. This is flagged as a blocker for the admin review UI's Definition of Done, not a gap in this test round. Recommend: when `admin.news-drafts.tsx` is built, extract the rate-limit check into a small pure function (e.g. `isAmOverrideAllowed(recentOverrideTimestamps: Date[], now: Date): boolean`) so it's testable without a live DB, mirroring the `createInMemoryRateLimiter` pattern already used for lead-submission rate limiting (`app/lib/leads/rate-limit.ts`, `tests/leads-rate-limit.test.ts`).

## 7. Fast-track promotion — skips PR review only, never content approval

| #   | Case                                                                                                                                                                                      | Expected                                                                                                                              | Status                                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 7.1 | `news:promote --draft <id>` on a row with `status !== "approved"`                                                                                                                         | refuses, exits 1, message points to the admin review UI                                                                               | code-reviewed; not unit tested (script is a `main()`-at-import CLI, not currently structured for DI — see §8) |
| 7.2 | `--fast-track` flag only changes `promotionMethod` to `fast_track` and which `gh` commands are printed; content-approval gate (`status === "approved"`) applies identically on both paths | confirmed by reading `scripts/news-promote.ts` lines 155–165: the approval check runs before the `fastTrack` branch is ever consulted | code-reviewed                                                                                                 |
| 7.3 | AM promotion gate: `amStatus === "human_reviewed"` OR a fully-set override triple                                                                                                         | promotes AM; otherwise ships HE+EN only, printed note explains why                                                                    | code-reviewed                                                                                                 |
| 7.4 | `amUrgentOverride === true` but reason/admin id missing                                                                                                                                   | script refuses outright (treats a bare flag as a bug, not an override)                                                                | code-reviewed                                                                                                 |

None of §7 is automated — see §8.

## 8. Known coverage gaps (explicit, for the record)

1. **AM override weekly rate limit** (§6) — no code exists to test yet; the check lives entirely in the not-yet-built admin review route.
2. **`scripts/news-promote.ts` end-to-end** — the script calls `main()` at import time and `process.exit()` in its `.finally()`, so it can't be `import`ed from a test file without side effects (spawning a real DB client, writing to `articles-wave9.server.ts`, calling `process.exit(0)` mid test run). No unit tests were added for it in this round. Recommend a follow-up refactor: extract the pure parts (`slugify`, `renderEntry`, the AM-gate boolean logic) into testable exports, and guard `main()` behind an `if (import.meta.url === ...)` entry-point check — the same pattern already used for `__dirname` resolution in the file.
3. **The routine itself** — is not code in this repo (a Claude Code cloud routine under the owner's subscription, per ADR-019 Amendment 1); there is nothing here to unit test. Its correctness (triage quality, HE/EN/AM draft quality, citation discipline, the legal/health disclaimer rule) can only be assessed by reviewing its actual POSTed output once the routine is created and running — recommend a manual QA pass on the first week of real drafts once DevOps wires the routine, checking against ADR-019 §3's rules (no fabricated statistics, disclaimer present when tags intersect `rights`/`health`).
4. **No E2E test** of the full pipeline (fetch → routine → POST → admin review → promote → PR). Each stage is unit/integration tested in isolation; the seams between them (especially "routine's actual JSON shape matches `ingestSchema` in practice") are only as good as ADR-019's documentation until the routine exists and produces real payloads to validate against.
5. **`requireRole(request, "admin")`** — ADR-019 explicitly flags this as a documented TODO the admin review route and fast-track promotion both depend on; not this round's scope, but a QA blocker once that route is built (today every user resolves to `"user"`).

## 9. Regression check

`pnpm test` run in full after adding this round's tests: **606/606 passing** (582 pre-existing + 24 new — 18 in `tests/news-autopilot-ingest.test.ts`, 6 in `tests/news-autopilot-sources.test.ts`), no existing test broken. `pnpm typecheck` and `pnpm lint` both clean on the changed/added files (pre-existing `no-undef` lint errors in `scripts/send-backlink-outreach.mjs` are unrelated to this change and predate it).

## Sign-off

- **Automated coverage added this round**: route auth, payload validation, forced-status enforcement, dedup, source normalization/resilience/dedup — all green.
- **Not gated on this round** (nothing here changes production behavior — no routine, no workflow, no admin route deployed): safe to hand to **DevOps** for the _next_ step only, which per ADR-019's implementation handoff is creating the routine + watchdog workflow — **not** a production deploy of user-facing behavior. Tag **Tedros Data & Integrations** to confirm the `news_drafts` migration has actually been run against the target DB before that happens (schema exists in the repo; migration-applied status wasn't verified in this QA pass). Tag **Tedros Engineer** for the two follow-ups in §8 (promote-script testability refactor, AM-rate-limit extraction) before `admin.news-drafts.tsx` ships.
