# ADR-024: A `<template> × <city>` page exists only if it carries content that exists nowhere else on the site

**Status**: Accepted (2026-09-15).
**Owner**: Tedros Engineer.
**Related**: TED-172 (this change), TED-170 / `docs/research/2026-09-14-programmatic-matrix-audit.md` (the measurement), TED-132 (the careers precedent this reuses), TED-125 (which added the cross-link chips now removed).

## Context

The site published 9,366 indexable URLs across seven sitemaps. Eight of them were
`<template> × <city>` matrices. The TED-170 audit fetched 492 Hebrew pages from production,
stripped site chrome, and measured two things per template: pairwise similarity between city
variants, and **corpus uniqueness** — the share of a page's characters that appear on no other
Tedros URL.

The two numbers disagree, and the second is the one that decides:

| template                                  | all-locale URLs | median pairwise similarity | corpus-unique content |
| ----------------------------------------- | --------------: | -------------------------: | --------------------: |
| `heritage/events/<event>/<city>`          |             153 |                      1.000 |                 0.0 % |
| `heritage/wedding/suppliers/<cat>/<city>` |              18 |                      1.000 |                 0.0 % |
| `rights/<slug>/<city>`                    |           6,414 |                      0.920 |                 1.7 % |
| `education/scholarships/<slug>/<city>`    |             270 |                      0.886 |                 0.0 % |
| `professionals/<prof>/<city>`             |              99 |                      0.375 |                29.9 % |
| `heritage/kessim/<city>`                  |              93 |                      0.783 |                34.3 % |
| `culinary/shopping/<city>`                |              24 |                      0.631 |                36.2 % |
| `cities/<city>`                           |             117 |                      0.783 |                57.2 % |

A median `rights/<slug>/<city>` page is 3,447 characters of which **59 (1.7 %)** appear nowhere
else — and those 59 are one templated FAQ heading produced by string concatenation. The other
716 varying characters vary against _sibling cities_ but are emitted identically on all 48 rights
cells of the same city, so they are not original either. The event cells are worse: the rendered
`<article>` is the pillar body verbatim, so `סיגד בחולון` and `סיגד ברמלה` both emit `<h1>סיגד</h1>`.

Three consequences were measured, not inferred:

1. **Cannibalisation.** 66 of 343 queries were served by more than one Tedros URL. The national
   query `משכנתא ליוצאי אתיופיה` returned **15 Tedros URLs, 14 of them city cells of one right**.
   **86 % of rights×city impressions came from queries containing no city name** — demand the
   pillar should own.
2. **Yield.** 0.032 impressions/URL/day for the cells against 0.321 for the rights pillars and
   0.432 for hand-written news. The matrix needed 68 % of the sitemap to produce 29.6 % of
   impressions.
3. **Policy shape.** "Pages targeted at specific regions or cities that funnel users to one page"
   and "stitching or combining content from different web pages without adding value" are literal
   descriptions of the cell architecture, from Google's doorway and scaled-content spam policies.

The audit is explicit that this does **not** prove the 2026-08-30 impression collapse was an
enforcement — that decline is uniform across hand-written news too, and it oscillates on a
two-day cycle, which quality demotions do not. The case here rests on cost, cannibalisation and
policy conformance alone.

## Decision

**A city cell ships only when it renders per-city entity records that exist nowhere else on the
site.** Similarity between siblings is not the test; corpus uniqueness is.

Concretely, in this change:

- `rights/<slug>/<city>`, `education/scholarships/<slug>/<city>`,
  `heritage/events/<event>/<city>` and `heritage/wedding/suppliers/<cat>/<city>` **301 to their
  pillar page**, each behind its own `CITY_CELLS_ENABLED = false` in the route module — the
  TED-132 pattern from `app/routes/$lang.careers.$track.$city.tsx`, copied rather than
  generalised, so each template can be restored independently.
- The redirected URLs leave `sitemap-rights.xml` and `sitemap-content.xml`, and the cross-link
  chip sections that pointed at them are removed from the pillar pages. A URL is never both
  301'd and submitted.
- `professionals/<prof>/<city>`, `heritage/kessim/<city>`, `culinary/shopping/<city>` and
  `cities/<city>` are untouched. They render named practitioners, named kessim with phone numbers
  from the Ministry for Religious Services register, and named shops with a dated verification
  line — 29–57 % corpus-unique, and the reason the site exists.

**301, not the alternatives.** `noindex` keeps 6,855 URLs crawled and passes no signal to the
pillar; its only advantage, reversibility, is what the flag already provides. A 410 throws away
41 real clicks and 2,077 impressions. `rel=canonical` is a hint Google may ignore, which is
precisely the failure mode being exited.

## Consequences

- The sitemap drops from 9,366 to 2,511 all-locale URLs — **6,855 removed, 73 %.** Measured on
  the static sitemaps: 8,829 → 1,971 (6,414 rights cells, 270 scholarship cells, 153 event cells,
  18 supplier cells, plus 3 for a `/cities` entry that was listed twice in `sitemap-core.xml`).
- The 29.6 % of impressions the rights matrix carried now has to be earned by the pillar pages.
  Since 86 % of it came from queries with no city in them, the pillar is the better answer to
  essentially all of it — but this is a bet, and it should be checked against Search Console
  30–60 days out.
- Any genuinely local query that a cell did serve (`שירות לאומי באילת`, `אולפן עברית חיפה`) now
  lands on the national pillar. The `cities/<city>` hub remains the home of city-scoped intent.
- The flags stay. The day a template gets real local content — a municipal office address, a
  local programme, distinct eligibility — flipping one constant restores that family, and the
  happy-path loader below the flag is still there to render it.
- `tests/sitemap-urls.test.ts` pins per-sitemap URL counts, so re-inflating the matrix by
  thousands of URLs cannot land as a side effect of something else.

## Alternatives considered

- **Write real per-city content instead.** Correct in principle, and the flags leave the door
  open. It is not available at 2,285 pages per locale, and shipping the duplicates while waiting
  is what produced the current state.
- **Keep the ~10 `list`-scoped rights cells that look local** (`urban-renewal-netanya/netanya`
  and friends). Rejected: measured at 0.762–0.822 against their own pillar, and the pillar is
  _already_ the city-specific page. The cell adds a duplicate of a page about the same city.
- **Do nothing until the Search Console manual-actions check is done.** The audit asks for that
  check and it is still owner-level work, but this change is justified on crawl cost,
  cannibalisation and policy conformance without it — and it is reversible per template.
