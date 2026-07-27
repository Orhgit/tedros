# ADR-017: Tier-1 transactional SEO pages — reuse existing route trees, degrade listing-hub pages pending real inventory

**Status**: Accepted (2026-07-21).
**Owner**: Tedros Architect (this decision); Tedros Content & SEO (content authoring); Tedros Engineer (T3 template promotion, listings filter param); Tedros Researcher (lottery date, municipal contacts).
**Related**: `docs/seo/keywords.md` §2 (Tier 1), `docs/seo/programmatic-templates.md` (T1–T6), ADR-002 (translatable columns / listing attributes), ADR-005 (sitemap + word-count gate), ADR-016 (T3 implementation detail, ships D2), R1 and R6 in `docs/discovery/risk-register.md`.

## Context

`docs/seo/keywords.md` §2 lists 15 Tier-1 transactional keywords with an aspirational URL namespace (`/diur/...`, `/hitchadshut-ironit/{neighborhood}`, `/listings/{city}/sale`) and page types (`calc`, `pillar`, `landing`, `programmatic`, `listing-hub`) written before those pages existed. `docs/seo/programmatic-templates.md` separately documents T1 (`/cities`) and T2 (`/calculator/mortgage-ethiopian-immigrants`) as the only _live_ templates, with T3 (`/urban-renewal/:neighborhood`), T4 (`/listings/:city/:type/:slug`), T5, T6 marked planned.

A repo audit for this ADR found the actual state is a third thing, ahead of both docs in some places and behind in others:

- **`rights` domain is live and already covers 3 of the 15 keywords.** `/rights/:slug` (+ `/rights/:slug/:city` cells) already ships `600k-mortgage` (row 1's exact program) and `public-housing` (row 15's exact program), each with `GovernmentService` JSON-LD, HE/EN/AM bodies, and — for `600k-mortgage` — a live `EligibilityWizard`. Building keywords.md's proposed `/diur/mehir-le-mishtaken-yotzei-etiopiya`-style namespace for these would create a second, competing "housing rights" URL tree.
- **T4 (listings) is partially live, but as a single filtered index (`/listings?city=&type=`) + detail route (`/listings/:city/:type/:slug`), not a per-city static hub.** There is no `/listings/:city` or `/listings/:city/:type` route today.
- **Real listing inventory is 5 demo rows total** (`app/lib/db/seeds/listings.ts`), covering `netanya` (1), `rishon-lezion` (1), `rehovot` (1), `haifa` (1), `ashdod` (1). Of keywords.md rows 9–13's five target cities (netanya, rishon-lezion, rehovot, ashkelon, kiryat-gat), **`ashkelon` and `kiryat-gat` have zero listings**, and the three that have any have exactly one each. Risk R1 (no legal API for Yad2/Madlan; scraping breaks ToS) means there is no near-term path to real inventory via scraping — growth depends on agency onboarding, which has not happened yet.
- **T3 (`/urban-renewal/:slug`) exists only as a lead-capture stub** (`app/routes/$lang.urban-renewal.$slug.tsx`, explicitly commented "TED-22 mock"). It renders no neighborhood content, no schema.org, no per-neighborhood data — just a `LeadForm`. However, the DB-seed data for exactly keywords.md rows 4–8's five neighborhoods already exists (`app/lib/db/seeds/neighborhoods.ts`): Kiryat Moshe/Rehovot, Ramat Eliyahu/Rishon LeZion, Dora, Neot Shaked, Kiryat Nordau/Netanya — matching T3's planned variant set exactly.
- `programmatic-templates.md`'s own anti-pattern list already forbids doorway pages ("do not ship a template variant that has only the templated shell") and gates neighborhood listing filters on "≥10 live listings." Shipping keywords.md rows 9–13 as literal per-city indexable hub pages today would violate that gate the docs themselves set.

Content and Engineer agents are about to start work from keywords.md's slugs verbatim. Without a routing decision now, they will either duplicate the `rights` domain or ship five near-empty listing-hub pages that read as doorway pages to Google — actively working against R6 (SEO authority race) rather than for it.

## Decision

### D1 — Reuse existing route trees; no parallel URL namespace

Tier-1 rows that map to a domain with a live route render as new **entries** inside that route tree, not new top-level paths:

- Row 1 (משכנתא ליוצאי אתיופיה) → existing `/rights/600k-mortgage` + existing `/calculator/mortgage-ethiopian-immigrants`. No new `/calculator/mashkanta-yotzei-etiopiya` or `/diur/...` route. Content-only change: tune `<h1>`/meta title/meta description on both pages to surface the literal keyword phrase.
- Row 2 (תוכנית הדיור יוצאי אתיופיה) → new `rights` seed entry (e.g. `tochnit-diur-yotzei-etiopiya`), rendered at `/rights/tochnit-diur-yotzei-etiopiya` via the existing `$lang.rights.$slug.tsx` route. No engineering change.
- Row 3 (הגרלה משכנתא 2026) → new `rights` seed entry (e.g. `hagrala-mashkanta-2026`) on the same route, optionally reusing the existing `EligibilityWizard` component. See D4 for the publish gate.
- Row 14 (מחיר למשתכן יוצאי אתיופיה) and Row 15 (דיור ציבורי יוצאי אתיופיה) → new/extended `rights` entries the same way; row 15 can extend the existing `public-housing` entry's copy with an explicit community angle rather than forking a new slug, at Content & SEO's discretion.
- keywords.md's `URL slug (HE)` column for rows 1, 2, 3, 14, 15 is stale as of this ADR and should be updated by Content & SEO to the actual `/rights/:slug` path once each entry ships, instead of the `/diur/...` paths originally drafted.

Rationale: `/rights` already carries the `GovernmentService` schema, the E-E-A-T framing (gov source links, "last verified" pattern per R14 mitigation), and the wizard component this content needs. A second tree for the same intent fragments internal linking and PageRank, and risks Google treating the two as duplicate/thin content of each other.

### D2 — T3 graduates from stub to full template this round, at its existing path

> **Implementation note (2026-07-26):** the D2 promotion described below shipped as TED-93; see ADR-016 for the implementation-level decisions (content registry pattern, schema.org type selection, the 15th-neighborhood naming gap) made while building it.

`/urban-renewal/:slug` (already claimed by the stub route) becomes the real T3 route — do not move it to keywords.md's `/hitchadshut-ironit/:slug`. Every other live programmatic route in this codebase (`/rights`, `/professionals`, `/listings`, `/cities`) uses an English URL segment with the locale prefix carrying HE/EN/AM, and Hebrew appears in the `slug` values, on-page copy, and meta — not as a second URL-segment language. `/hitchadshut-ironit/...` would break that convention and create a URL that is neither the canonical English-segment pattern nor a real user-facing Hebrew slug (it is a transliteration, not the Hebrew script the keyword itself uses).

Slug convention for the 5 neighborhood variants (matches `programmatic-templates.md` T3 spec, `<neighborhood>-<city>` to stay collision-safe): `kiryat-moshe-rehovot`, `ramat-eliyahu-rishon-lezion`, `dora-netanya`, `neot-shaked-netanya`, `kiryat-nordau-netanya`. These are distinct from the bare neighborhood slugs already in `app/lib/db/seeds/neighborhoods.ts` (`kiryat-moshe`, `ramat-eliyahu`, ...), which are scoped by `city_id` in the DB and serve a different purpose (FK target for `listings.neighborhood_id`) — do not conflate the two; the SEO-registry composite slug is a presentation-layer concern.

### D3 — Listing-hub rows (9–13) do not ship as dedicated per-city hub routes this round

Given 0–1 listings per target city today and no near-term path to real inventory (R1), a dedicated `/listings/:city/sale`-style indexable page per city would be a doorway page under this project's own anti-pattern rule. Instead, for M0–M3:

- Reuse the **already-live** filtered index at `/listings?city=<slug>&type=sale`. Do not create a new indexable URL for it; canonical stays the bare `/listings` path (query-string variants are not separately indexed).
- Each of the 5 cities' **already-live** `/cities/:slug` page (T1) gets a "community-curated listings" teaser card linking to that filtered view — zero new routes, reuses `overview`/CTA pattern already established for the mortgage calculator link.
- Where a city has a live `real-estate-agent` professional slot (`/professionals/real-estate-agent/:city`, T6, already live — currently populated for `netanya` and `rehovot` only), that page is the interim answer to "who do I talk to about buying in this city," and can absorb some of rows 9–13's transactional intent without new engineering.
- The real, indexable `/listings/:city/:type` hub (T4/T5 as designed) ships **once a city crosses the ≥10-live-listings bar** already established in `programmatic-templates.md` for neighborhood listing filters — applied here at city granularity. This is gated on agency onboarding (outside this ADR's scope), not on engineering effort.
- Rows 9–13 are therefore **flagged blocked** in the tracking table below, not target-this-round.

### D4 — Row 3 (lottery landing) ships gated on date confirmation, not gated on engineering

Row 3 uses the same `rights`-entry pattern as D1, so there is no engineering blocker. It is content-blocked: keywords.md's own note ("לוודא תאריך פתיחה רשמי לפני פרסום") stands. The entry may be authored and reviewed now but must not go live (should ship `noindex` or stay in draft state) until Tedros Researcher confirms the actual 2026 registration window from a primary source (mh.gov.il). Do not fabricate or estimate a date.

## Consequences

- Content & SEO gets 4 of 15 rows (1, 2, 14, 15) as pure-content tasks against an existing, already-schema'd route — fastest path to indexed pages.
- Engineer gets one real build this round: promoting T3 from stub to full template (5 variants), plus a small addition to `listPublicListings`'s filter surface if the neighborhood page wants to show its own listings (optional, not required for M1).
- 5 of 15 rows (9–13) are explicitly not shipped as their own URL this round — M1's "30+ pages live" KPI (keywords.md §8) must be met from the other 10 rows + Tier 2/3 pages, not from listing-hubs. PM should re-baseline the M1 count.
- keywords.md needs a follow-up edit (owned by Content & SEO) to replace the `/diur/...` and `/hitchadshut-ironit/...` slugs with the real `/rights/...` and `/urban-renewal/...` paths once shipped, so the tracker stays a source of truth rather than drifting further from reality.
- Risk register: this ADR is itself a mitigation for R6 (avoids diluting authority across two rights trees) and for the doorway-page failure mode that would otherwise feed directly into R6's "SEO authority race" risk.

## Alternatives considered

1. **Ship keywords.md's URL tree verbatim** (`/diur/...`, `/hitchadshut-ironit/...`, `/listings/:city/:type` for all 5 cities). Rejected: creates a duplicate content tree for rows 1/2/14/15 competing with the live `rights` domain, and ships 3–5 near-empty listing pages that read as doorway pages to Google, actively working against R6.
2. **Hold rows 9–13 entirely until real listings exist**, i.e. don't even add teaser cards or lean on the professionals directory. Rejected: the `/cities/:slug` pages and `real-estate-agent` professional pages are live today and can capture partial intent now at zero engineering cost; leaving that on the table gains nothing.
3. **Fabricate a placeholder 2026 lottery date to ship row 3 immediately.** Rejected outright: violates R14/R18 mitigations (fact-track only, cite govt decisions verbatim) and directly risks the kind of factual-liability incident R12/R14 exist to prevent.
4. **Rename the live `/urban-renewal/:slug` route to match keywords.md's `/hitchadshut-ironit/:slug`.** Rejected: breaks the codebase's established English-URL-segment / localized-content convention used by every other live programmatic route, for no SEO benefit (the Hebrew keyword match comes from on-page `<title>`/`<h1>`/meta content, not the URL segment).
