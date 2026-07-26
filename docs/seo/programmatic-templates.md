# Programmatic SEO templates

Owner: Tedros Content & SEO. Updated whenever a new template ships.

## What this doc is

Tedros leans on programmatic SEO: a small set of page templates × a controlled set of variants (cities, neighborhoods, topics, professions). This file lists which templates are live, what variants each one renders, and the URL/slug convention so future templates compose without collisions.

The goal is **non-thin, intent-matched** programmatic output. Every variant a template produces has to earn its URL with substantive, locale-specific content — not a string-substituted shell.

## Conventions

- **Locale prefix**: every public page is mounted under `/he|/en|/am/...`. Hebrew is canonical (`x-default → /he/...`).
- **Slug case**: kebab-case Latin (`rishon-lezion`, `kiryat-malakhi`). Same slug across all three locales.
- **Hreflang**: every locale variant of a programmatic URL emits the full `he`/`en`/`am`/`x-default` set.
- **Canonical**: per-locale canonical URL — never cross-locale canonical.
- **Schema.org**: every template emits at least one JSON-LD block matching the page intent (`City`, `WebApplication`, `FAQPage`, `ItemList`, `RealEstateListing`, `LocalBusiness`).
- **Empty-state copy is not enough**: a programmatic page that only renders templated copy + "no listings yet" is a doorway page. Each variant must contribute at least one block of variant-specific content (e.g. the per-city `overview` paragraph in the registry).

## Live templates

### T1 — `/cities` index → `/cities/:slug`

| field                    | value                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| Routes                   | `app/routes/$lang.cities._index.tsx`, `app/routes/$lang.cities.$slug.tsx`                           |
| Variants                 | 8 cities (`app/lib/cities/registry.ts`)                                                             |
| URLs generated           | 1 index × 3 locales + 8 cities × 3 locales = 27                                                     |
| Schema                   | `ItemList` (index), `City` with geo (per city)                                                      |
| Variant-specific content | `overview` paragraph (HE/EN/AM) per city; mention community-relevant neighborhoods where documented |
| Internal links out       | mortgage calculator (per city), back to cities index                                                |

### T2 — `/calculator/mortgage-ethiopian-immigrants`

| field                    | value                                                           |
| ------------------------ | --------------------------------------------------------------- |
| Routes                   | `app/routes/$lang.calculator.mortgage-ethiopian-immigrants.tsx` |
| Variants                 | 1 (locale × 3)                                                  |
| URLs generated           | 3                                                               |
| Schema                   | `WebApplication` + `FAQPage` (4 Q&As)                           |
| Variant-specific content | calculator form + result + FAQ section                          |
| Internal links in        | every city page (CTA card)                                      |

### T3 — `/urban-renewal/:neighborhood` (TED-16 §3.2 — shipped TED-93 / ADR-016)

| field                    | value                                                                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Routes                   | `app/routes/$lang.urban-renewal.$slug.tsx`                                                                                                                      |
| Variants                 | 14 neighborhoods (`app/lib/urban-renewal/registry.ts`) — 5 original priority neighborhoods + 9 added in TED-93                                                  |
| URLs generated           | 14 × 3 = 42                                                                                                                                                     |
| Slug convention          | `<neighborhood>-<city>`, e.g. `kiryat-moshe-rehovot`, `ramat-ashkol-lod`, `shchuna-dalet-beer-sheva` (always suffixed with city to avoid collisions)            |
| Schema                   | `BreadcrumbList` + `Place` (`containedInPlace` → City, no `geo` — unverified at neighborhood level) + `GovernmentService` + `FAQPage` (3 visibly-rendered Q&As) |
| Variant-specific content | project status, developer/authority, unit counts (before → planned), community relevance, legal-aid pointer into `rights` content, source citations             |
| Internal links           | city pages (`/cities/:slug`) list their neighborhoods; each neighborhood page links back to its city and to the matching `rights` legal-aid entry               |
| Known gap                | a 15th Kiryat Gat neighborhood ("Atzmaut-Komemiyut") was skipped — the name/transliteration could not be verified against a source; see ADR-016 §D5             |

## Planned templates

These are committed in TED-16 phase 3 but not yet shipped. Designs below so future implementation stays aligned with the SEO model.

### T4 — `/listings/:city/:type/:slug` (TED-16 §3.3)

| field                    | value                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ---- | ------------- | ---------- | ----------- | ----------- |
| Slug                     | `<random-id-or-listing-slug>` (collision-safe)                                                    |
| Types                    | `sale                                                                                             | rent | urban-renewal | investment | gov-program | commercial` |
| Schema                   | `RealEstateListing` per listing                                                                   |
| Variant-specific content | listing description, photos, contact form                                                         |
| Index pages              | `/listings`, `/listings/:city`, `/listings/:city/:type` — each gets its own `meta` and `ItemList` |

### T5 — City × topic landing pages (proposed expansion of T1)

Once T3 and T4 ship, the city × topic axis opens up. Pattern:

| URL                           | Topic                                                                |
| ----------------------------- | -------------------------------------------------------------------- |
| `/cities/:slug`               | overview (T1, live)                                                  |
| `/cities/:slug/listings`      | redirect → `/listings/:city` (T4) — keep the city slug user-friendly |
| `/cities/:slug/urban-renewal` | filtered T3 view scoped to one city                                  |
| `/cities/:slug/professionals` | local pros                                                           |
| `/cities/:slug/mortgage`      | calculator pre-populated for the city + city-specific guidance       |

Slug collision risk: keep `cities/:slug/:topic` paths, never reuse a slug as a topic name. Topic slugs are a closed enum maintained in `app/lib/cities/topics.ts` (when added).

### T6 — Profession × city (TED-16 §3.4 expansion)

| URL                                | Example                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| `/professionals/:profession/:city` | `/he/professionals/mortgage-advisor/netanya`                                          |
| Variants                           | profession enum (mortgage-advisor, lawyer, real-estate-agent, contractor, ...) × city |
| Variant-specific content           | profession overview + local member list (filtered)                                    |

## Anti-patterns to avoid

- **Doorway pages**: do not ship a template variant that has only the templated shell. Either add variant-specific content or do not ship the variant.
- **Cross-locale canonical**: each locale URL canonicalises to itself. Hebrew is the `x-default`, not the canonical for English/Amharic.
- **`noindex` to "fix" thin pages**: if it should not be indexed it should not be a separate URL — collapse it.
- **FAQ schema without visible FAQs**: Google Rich Results requires the Q&A be visible on page. The mortgage calculator page is the reference pattern.
- **Untranslated string interpolation in meta**: every `{name}` must come from the locale-specific dictionary, never from a fixed-locale source.

## Adding a new template — checklist

1. Define the variant set and store it as a typed registry in `app/lib/<domain>/registry.ts` (pure module, no DB).
2. Decide the slug convention; document collision-safety here.
3. Add HE/EN/AM message keys (`*_meta_title`, `*_meta_description`, `*_keywords` at minimum).
4. Implement the route with: per-locale canonical, full hreflang set (incl. `x-default`), at least one JSON-LD block, and a variant-specific content block (not just templated copy).
5. Update `app/routes/sitemap[.]xml.tsx` to emit every (variant × locale) URL.
6. Update this doc — add a row in "Live templates".
7. Tag QA for axe/Lighthouse on at least one HE and one EN variant.
