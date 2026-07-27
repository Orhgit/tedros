# ADR-016: Urban-renewal neighborhood pages graduate to a full T3 template

**Status**: Accepted (2026-07-26). Implemented same day (TED-93).
**Owner**: Tedros Engineer (implementation); Tedros Content & SEO (facts, sourcing).
**Related**: [ADR-017](./017-tier1-seo-routing.md) (D2 — the routing decision this ADR implements), [docs/seo/programmatic-templates.md](../seo/programmatic-templates.md) (T3 definition), [docs/seo/schema-org.md](../seo/schema-org.md) §6/§9, [docs/seo/technical-audit-2026-05-30.md](../seo/technical-audit-2026-05-30.md).

## Context

A live-site SEO audit (2026-07) found that `/he/urban-renewal/:slug` — the route intended to cover priority urban-renewal neighborhoods with real Hebrew search demand — was still the Phase-3.2 stub from TED-22: a page with no unique body content and no schema.org markup, wrapping nothing but the shared `LeadForm`. `app/lib/db/seeds/neighborhoods.ts` already carried typed data for 5 priority neighborhoods (Kiryat Moshe/Rehovot, Ramat Eliyahu/Rishon LeZion, Dora/Neot Shaked/Kiryat Nordau in Netanya), but nothing rendered it. `docs/seo/programmatic-templates.md` already specified T3 as a planned template with a defined slug convention and schema requirements — it just hadn't shipped.

This is flagged as the single highest-value, lowest-cost fix identified in the audit: real search demand exists, the URLs are already live (and thin), and the underlying facts were already researched.

## Decision

### D1. T3 ships as a real content template, not a doorway page

`app/routes/$lang.urban-renewal.$slug.tsx` now has a loader that resolves the slug against a new pure-module registry (`app/lib/urban-renewal/registry.ts`, no DB — same pattern as `app/lib/cities/registry.ts` for T1), renders real per-neighborhood sections (project status, developer/authority, unit counts before → planned, community relevance, legal-aid pointer), and keeps the lead-capture form as a secondary CTA below the content, not the only content.

### D2. Content lives in a typed registry, not the DB `neighborhoods` seed

`app/lib/db/seeds/neighborhoods.ts` is a DB seed for the `neighborhoods` table (FK target for `listings.neighborhood_id`) and uses short, per-city-scoped slugs. The T3 route needs a globally unique `<neighborhood>-<city>` slug (per the programmatic-templates.md convention, to avoid collisions across cities) plus rich localized content that doesn't belong in a real-estate FK table. We therefore introduce a separate pure registry for the SEO template, mirroring the T1 city registry pattern, and keep the DB seed file focused on its original purpose (also extended with the 9 new neighborhoods for future listings linkage).

### D3. Schema.org: `Place` + `GovernmentService` + visible `FAQPage`, per docs/seo/schema-org.md §9

Each page emits `BreadcrumbList`, `Place` (with `containedInPlace` → the city), a `GovernmentService` block describing the renewal authority/program, and an `FAQPage` block — but only backed by 3 real, visibly-rendered Q&As per page (per the FAQ anti-pattern warning in schema-org.md §11). No `Place.geo` is emitted at the neighborhood level: we don't have verified per-neighborhood coordinates and would rather omit the field than fabricate coordinates.

### D4. Legal-aid contact reuses existing `rights` content — no new facts invented

Three neighborhoods already have a dedicated `rights` entry (`urban-renewal-kiryat-moshe`, `urban-renewal-ramat-eliyahu`, `urban-renewal-netanya`). The other 9 link to the generic `pinui-binui-tenant-rights` right, which already carries real, sourced contact info (Tebeka free legal hotline, Urban Renewal Authority phone). No new contact facts were invented for this ADR.

### D5. One neighborhood skipped for lack of verifiable naming

TED-93's source list included a 15th neighborhood in Kiryat Gat ("Atzmaut-Komemiyut" / transliteration uncertain). It was not added — see the TED-93 PR description for detail. Ship the other 14 (5 upgraded + 9 new) now; add the 15th once a named, sourced confirmation exists.

## Consequences

- 14 neighborhoods × 3 locales = 42 real, indexable URLs replace 5×3=15 thin/duplicate ones (net +27 new URLs, all non-thin).
- `docs/seo/programmatic-templates.md` T3 status moves from "Planned" to "Live".
- Future neighborhoods (the skipped 15th, or any new priority area) follow the same two-registry split: DB seed row (if listings will reference it) + SEO registry entry (for the page).
- City pages (`/cities/:slug`) can now cross-link to their neighborhoods' T3 pages instead of rendering the "coming soon" empty state.

## Alternatives considered

- **Store T3 content directly on the DB `neighborhoods` row** (e.g. a JSONB `content` column). Rejected for this pass — would require a migration + Data agent involvement, and the T1 precedent (pure-module registry, no DB) is proven, cheaper, and sufficient for the current variant count (14, not thousands).
- **Skip the Kiryat Gat 15th neighborhood by guessing the Hebrew name.** Rejected — CLAUDE.md's cost/quality bar and the source ticket both explicitly call for skipping over guessing when a fact can't be verified.
