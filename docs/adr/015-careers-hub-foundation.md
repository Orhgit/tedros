# ADR-015: Careers Hub foundation — static modules over a DB-backed schema

**Status**: Accepted (2026-05-01).
**Owner**: Vega (decision); Tedros Engineer (implementation); Tedros Content & SEO (track copy).
**Related**: RIN-469 (epic), RIN-470 (this sub-ticket), [ADR-001 stack](../discovery/adr/ADR-001-stack.md) cost-discipline P5, [ADR-002](../discovery/adr/ADR-002-data-model.md) data-model, [ADR-010 comprehensive-portal-scope](./010-comprehensive-portal-scope.md).

## Context

RIN-469 introduces a Careers Hub vertical (~720 programmatic SEO URLs). The original Sub-1 specification (RIN-470 ticket body) called for **5 new Drizzle entities** — `career_tracks`, `bootcamps`, `job_postings`, `success_stories`, `career_faqs` — plus migrations, FTS sidecars, and a query layer.

When picking up the work I checked the patterns in the four most recent verticals:

| Vertical    | Ticket   | Storage              | Notes                                               |
|-------------|----------|----------------------|-----------------------------------------------------|
| Glossary    | RIN-418  | static module        | `lib/glossary/glossary.server.ts` — no DB           |
| Org profiles| RIN-419  | static module        | `lib/orgs/orgs.server.ts` — no DB                   |
| Comparisons | RIN-421  | static module        | `lib/comparisons/comparisons.server.ts` — no DB     |
| Org programs| RIN-424  | static module        | `lib/programs/programs.server.ts` — no DB           |
| Rights Hub  | RIN-328  | Drizzle (`rights`)   | predates the static-module convention               |

Every vertical shipped after Rights Hub has used **render-from-seed**: a TypeScript module that exports a typed array, with route loaders importing the array directly. The DB layer is reserved for entities that need write paths (subscribers, leads, listings, audit log).

## Decision

**Careers Hub Sub-1 ships as static modules**, not Drizzle entities.

```
app/lib/careers/
├── categories.ts          — CareerTrack enum, glyphs, tag mapping (client-safe)
├── careers.server.ts      — CAREER_TRACKS array (10 entries, HE/EN/AM bodies)
├── bootcamps.server.ts    — BOOTCAMPS scaffold (filled by Sub-3, RIN-472)
├── jobs.server.ts         — JOBS scaffold (filled by Sub-5, RIN-474)
├── stories.server.ts      — STORIES scaffold (filled by Sub-6, RIN-475)
├── faqs.server.ts         — FAQS scaffold (filled by Sub-6, RIN-475)
├── relevance.ts           — track × city scope (mirrors lib/rights/relevance.ts)
├── schema.ts              — JSON-LD generators (pure functions)
└── links.ts               — internal-link graph helpers
```

Tests live in `tests/careers-{relevance,schema,links}.test.ts` per the project convention.

## Why static modules

1. **Convention parity** — every vertical merged in the last two weeks uses this shape. Adding a 6th DB-backed vertical would re-fragment the codebase.
2. **Cost discipline (ADR-001 P5)** — no migration, no Drizzle codegen step, no FTS sidecar to operate. The seed compiles to ~15KB of bundled data per server cold-start.
3. **No write path needed at V1** — Sub-2..Sub-6 are read-only SEO surfaces. The ticket originally proposed `JobPosting.posted_at` etc. but every job posting is owner-curated, not user-submitted, so there is nothing to write.
4. **Testability** — pure functions over plain arrays test in milliseconds and pin integrity (no dead refs to rights/orgs/glossary slugs) at the type level.
5. **Reversibility** — converting to Drizzle later is mechanical (`pgTable` + a one-shot migration that imports from the seed). The reverse is harder.

## Why not Drizzle now

- **Job-board write path is explicitly out of V1** — Sub-5 (RIN-474) ships 20 owner-curated postings; the open user-submitted-jobs question (RIN-474 Sub-5 Phase 2 — Inngest scraper) is gated on legal review and may never ship at all.
- **No moderation flow** — verticals that need moderation/audit (subscribers, leads) live in DB. Career content is editorial.
- **i18n already works in JSONB nowhere — the static module ships HE/EN/AM as a `Record<Locale, string>`** which is simpler than the `*_translations` sidecar pattern the DB tables would force.

## Consequences

- **Positive**: Sub-1 ships in one session (~3-4 hours) instead of two (schema + migration + queries). All later subs build on a typed seed.
- **Positive**: every internal-link reference is checked at test time against the canonical seeds (rights, orgs, glossary, professions) — no production-time dead links.
- **Positive**: the `JobPosting` Schema.org generator is pure and unit-testable — Sub-5's "0 errors in Rich Results Test" DoD becomes a CI gate over the generator output, not a manual review.
- **Negative**: large content updates (e.g. monthly bootcamp refresh) require a code deploy, not a CMS edit. Acceptable while content count is small (10 tracks, 15 bootcamps, 20 FAQs, 10 stories — single-digit volume).
- **Negative**: full-text search across careers content is unavailable until we backfill into the search index. Mitigation: every FAQ/story/bootcamp links into the existing tag-based discovery surfaces in Sub-2.

## Migration path (if we ever need DB)

1. Author a Drizzle migration that creates `career_tracks` + sidecars matching the existing TypeScript shape.
2. Write a one-shot script that reads `CAREER_TRACKS` and inserts row-per-entry.
3. Swap `findCareerTrack(slug)` to `db.query.careerTracks.findFirst(...)` — the public API stays the same.
4. Delete the static seed.

The decision boundary is **does an external party (CMS editor, partner org, automated scraper) need to write?** If yes, move to DB. Until then, stay in static modules.

## Alternatives considered

- **Drizzle + JSONB column for translations** (the original Sub-1 spec) — rejected for the convention-parity and cost-discipline reasons above.
- **CMS-backed content (Payload)** — out of scope until Phase 8 per [ADR-010](./010-comprehensive-portal-scope.md). Career content is too small to justify a CMS today.
- **Markdown files in `content/careers/`** — rejected because the relational metadata (`relatedRights`, `relatedOrgs`, `recommendedBootcamps`, `relatedProfessions`) is hard to type-check against existing seeds with frontmatter alone.

## SEO surface dependencies

This ADR enables:

- **Sub-2 (RIN-471)** — Hub landing + 10 tracks × HE/EN/AM = 33 URLs
- **Sub-3 (RIN-472)** — 15 bootcamps + Affirmative Action explainer = 48 URLs
- **Sub-4 (RIN-473)** — City × Track programmatic cells (~408 URLs after relevance filter)
- **Sub-5 (RIN-474)** — Job board + JobPosting schema (~63 URLs, Google for Jobs eligible)
- **Sub-6 (RIN-475)** — Statistics + 20 FAQs + 10 stories (~99 URLs)

Total Careers Hub footprint after Sub-6: **~723 programmatic SEO URLs**.
