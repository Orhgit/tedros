# SEO Technical Audit — Tedros Portal

**Date:** 2026-05-30  
**Auditor:** Tedros Researcher  
**Scope:** Full code-level audit — robots.txt, sitemap, meta/canonical, hreflang, env, internal linking, CWV indicators, structured data, redirects, orphan routes.

---

## Executive Summary

The portal has solid SEO foundations (robots.txt is clean, sitemap is comprehensive, structured data is present on most pages), but three issue clusters block significant indexing:

1. **Critical — Missing canonical tags on ~21 high-traffic content pages** (rights detail, orgs, programs, professionals, comparisons, glossary, education hubs). Google cannot establish the authoritative URL.
2. **High — Missing hreflang on ~46 content routes**. Google may fail to surface the correct language variant and may treat /he/, /en/, /am/ as duplicate content.
3. **High — 5 live content sections absent from sitemap** (family, voice, about, listings, urban-renewal). Pages exist and are linked from the homepage but Google has no discovery path via sitemap.

---

## Findings

### 1. robots.txt

**File:** `app/routes/robots[.]txt.tsx`  
**Severity:** Low (no problem)

- `User-agent: *` / `Allow: /` — no Disallow directives. All public pages are crawlable.
- Sitemap reference: `${PUBLIC_URL}/sitemap.xml` — correct, points to the dynamic sitemap.
- Cache-Control: `public, max-age=3600` — fine.
- **Risk:** if `PUBLIC_URL` is not set in production (defaults to `http://localhost:3000`), the Sitemap directive will be wrong. See finding #5.

---

### 2. sitemap.xml — Missing sections

**File:** `app/routes/sitemap[.]xml.tsx`  
**Severity:** High

The following live route files have no corresponding entries in the sitemap:

| Missing section        | Route files                                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `/family`              | `$lang.family._index.tsx`, `$lang.family.domestic-violence.tsx`, `$lang.family.elderly.tsx`, `$lang.family.women-empowerment.tsx`         |
| `/voice`               | `$lang.voice._index.tsx`, `$lang.voice.community-action.tsx`, `$lang.voice.police-conduct.tsx`, `$lang.voice.racism-report.tsx`           |
| `/about`               | `$lang.about.tsx`                                                                                                                         |
| `/listings`            | `$lang.listings._index.tsx`, `$lang.listings.$city.$type.$slug.tsx`                                                                       |
| `/urban-renewal/:slug` | `$lang.urban-renewal.$slug.tsx`                                                                                                           |
| `/calculator/mortgage` | `$lang.calculator.mortgage.tsx` (the base mortgage calc — only the specialized `/calculator/mortgage-ethiopian-immigrants` is in sitemap) |

All six family sub-pages, four voice sub-pages, and listings detail pages are reachable via internal links on the homepage but invisible to Google via sitemap.

**Fix:** Add to `PATHS` array in sitemap:

```ts
"/family",
"/family/domestic-violence",
"/family/elderly",
"/family/women-empowerment",
"/voice",
"/voice/community-action",
"/voice/police-conduct",
"/voice/racism-report",
"/about",
"/calculator/mortgage",
```

Listings and urban-renewal need dynamic path generation similar to other sections.

---

### 3. Canonical tags — Missing on 21 content routes

**File:** Multiple routes  
**Severity:** Critical

In React Router v7, child route `meta()` functions **replace** parent meta entirely (no automatic merging). The layout `$lang.tsx` sets `canonical: /${locale}`, but this is dropped whenever a child exports its own `meta`. Pages that export `meta` but use neither `hreflangMeta()` (which includes canonical) nor a manual `<link rel="canonical">` emit **no canonical tag at all**.

Affected routes (meta export present, no canonical):

```
$lang.rights.$slug.tsx              ← highest-traffic rights detail pages
$lang.orgs.$slug.tsx
$lang.programs.$slug.tsx
$lang.professionals.profile.$slug.tsx
$lang.professionals._index.tsx
$lang.professionals.$profession._index.tsx
$lang.compare.$slug.tsx
$lang.compare._index.tsx
$lang.glossary.$slug.tsx
$lang.glossary._index.tsx
$lang.education.scholarships.$slug.tsx
$lang.education.scholarships._index.tsx
$lang.education.tracks.$slug.tsx
$lang.education.tracks._index.tsx
$lang.education._index.tsx (likely — needs verification)
$lang.careers.$track.tsx
$lang.careers.affirmative-action.tsx
$lang.listings._index.tsx
$lang.about.tsx
$lang.calculator.mortgage.tsx
$lang.voice._index.tsx
```

**Fix:** Replace inline `return [{ tagName: "link", rel: "canonical", href: ... }]` pattern with `hreflangMeta(publicUrl, locale, "/path")` — which returns canonical + all hreflang alternates in one call. The `hreflangMeta` helper already exists at `app/lib/i18n/hreflang.ts`.

The most critical fix is `$lang.rights.$slug.tsx` because rights detail pages are the highest-traffic programmatic SEO surface.

---

### 4. hreflang — Missing on ~46 content routes

**File:** Multiple routes  
**Severity:** High

`hreflangMeta()` is already defined and used correctly in some routes. Many routes — including all careers sub-pages, all health sub-pages, all news detail pages, all glossary/orgs/programs/professionals pages — do not call it.

Missing hreflang means:

- Google may index all three language variants as separate duplicate pages instead of treating them as language alternates.
- Correct-language pages may not surface for Hebrew/Amharic speakers.

The sitemap DOES include hreflang `<xhtml:link>` alternates for all paths (via `altLinksFor()`), so this is a partial mitigation — but page-level hreflang in `<head>` is the authoritative signal.

**Most critical gaps:**

- `$lang.rights.$slug.tsx` — no hreflang
- `$lang.news.$slug.tsx` — no hreflang (news articles have canonical but not hreflang)
- `$lang.careers.jobs.$slug.tsx` — has canonical, missing hreflang
- All `/health/*` sub-pages
- All `/careers/*` sub-pages

**Fix:** Use `hreflangMeta(publicUrl, locale, path)` in every content route's `meta()` function.

---

### 5. PUBLIC_URL — Defaults to localhost if unset

**File:** `app/lib/env.server.ts`, line 10  
**Severity:** High (deployment risk)

```ts
PUBLIC_URL: z.string().url()
  .regex(/[^/]$/, "PUBLIC_URL must not end with a trailing slash")
  .default("http://localhost:3000"),
```

There is **no Zod refine guard** preventing `http://localhost:3000` from being used in `NODE_ENV=production`. If the production host does not explicitly set `PUBLIC_URL=https://tedros.co.il`, every canonical URL, every sitemap entry, and every hreflang alternate will point to localhost — making the entire site invisible to Google.

The `.env.production.example` correctly shows `PUBLIC_URL=https://tedros.co.il`, but a misconfigured deploy would fail silently.

**Fix:** Add production guard to env schema:

```ts
PUBLIC_URL: z.string().url()
  .regex(/[^/]$/, "PUBLIC_URL must not end with a trailing slash")
  .default("http://localhost:3000")
  .refine(
    (url) => process.env.NODE_ENV !== "production" || !url.includes("localhost"),
    "PUBLIC_URL must not be localhost in production"
  ),
```

---

### 6. Internal linking — Orphan sections

**File:** `app/components/sections/site-footer.tsx`, `app/components/sections/site-header.tsx`  
**Severity:** Medium

**Footer** (`site-footer.tsx`): Lists `/rights`, `/cities`, `/calculator/mortgage-ethiopian-immigrants`, `/glossary`, `/orgs`, `/professionals`, `/compare`, `/programs` as live links. Four sections (`employment`, `health`, `family`, `voice`) are listed as "coming soon" plain text — no links.

**However:** Health, Family, and Voice are fully live routes with content. Marking them as "coming soon" in the footer means:

- No footer-level incoming links to `/health`, `/family`, `/voice`.
- Googlebot reaches them only via homepage hero cards or sitemap.
- PageRank signal to these sections is lower than warranted.

**Header nav** (`site-header.tsx`): Only 4 items — `/cities`, `/rights`, `/professionals`, `/education`. Missing: `/health`, `/careers`, `/news`, `/heritage/events`, `/programs`, `/orgs`, `/glossary`, `/compare`, `/family`, `/voice`.

The header limitation is understandable for UX, but the footer should be updated to reflect live sections.

**Fix:** Update `site-footer.tsx` to move `health`, `family`, `voice`, `careers`, `news`, `heritage` from "coming soon" to live links.

---

### 7. Core Web Vitals — LCP

**File:** `app/routes/$lang._index.tsx`, lines 131-138; `app/root.tsx`  
**Severity:** Medium

**Hero image** (`$lang._index.tsx`):

- `loading="eager"` and `fetchPriority="high"` are set — good.
- But the image is an **external Unsplash URL** (`images.unsplash.com`). This requires a cross-origin DNS lookup + connection before the first byte, adding ~100-300ms to LCP on cold connections.
- There is **no `<link rel="preload">` hint** in `root.tsx` or `$lang.tsx` for this image. The browser only discovers it when parsing the component.

**Fonts:** `root.tsx` (comment line 27) notes that Google Fonts were removed due to LCP impact. System fonts are used. This is correct per ADR-005.

**Recommendation:**

1. Add a `<link rel="preconnect" href="https://images.unsplash.com">` in `root.tsx` links function.
2. Consider self-hosting the hero image via Cloudflare R2 (already in the project's free-tier stack) to eliminate the cross-origin penalty.

---

### 8. Structured data (JSON-LD)

**File:** Multiple routes  
**Severity:** Medium (gaps exist)

54 of ~82 content routes emit JSON-LD. Coverage by type:

| Schema type                   | Routes using it                                                        |
| ----------------------------- | ---------------------------------------------------------------------- |
| `WebSite` + `SearchAction`    | Homepage only                                                          |
| `GovernmentService` + `HowTo` | Rights detail pages                                                    |
| `NewsArticle`                 | News article detail                                                    |
| `BreadcrumbList`              | Most detail pages (careers, education, family, health, heritage, news) |
| `JobPosting`                  | Careers jobs detail                                                    |
| `FAQPage`                     | Careers FAQ                                                            |

**Missing JSON-LD on content routes:**

```
$lang.rights._index.tsx        — no CollectionPage/ItemList
$lang.orgs.$slug.tsx           — no Organization schema
$lang.professionals.profile.$slug.tsx — no Person/ProfessionalService schema
$lang.programs.$slug.tsx       — no EducationalOccupationalProgram schema
$lang.glossary.$slug.tsx       — no DefinedTerm schema
$lang.compare.$slug.tsx        — no ComparisonPage/Article schema
$lang.listings._index.tsx      — no RealEstateListing or ItemList
$lang.statistics._index.tsx    — no Dataset schema
$lang.voice._index.tsx         — no relevant schema
```

The most impactful additions would be `Organization` for org profiles and `Person`/`ProfessionalService` for professional profiles (potential rich results in local search).

---

### 9. Redirects — Homepage uses 302 (temporary)

**File:** `app/routes/_index.tsx`, line 8  
**Severity:** Medium

```ts
return redirect(`/${locale}`, 302);
```

The root `/` redirects to `/${locale}` with HTTP 302 (temporary). This should be **301 (permanent)** to pass full link equity. A 302 tells Google "this redirect is temporary, keep the original URL as canonical." With 302, Google may index `/` as a separate URL and not consolidate PageRank to the locale-prefixed URLs.

**Fix:** Change to `redirect(\`/\${locale}\`, 301)`.

Note: The 308 in `$lang.tsx` for unknown lang slugs is correct (permanent redirect variant).

---

### 10. Routes in app/routes/ not in sitemap (complete list)

**Severity:** See per-route

| Route file                                   | In sitemap?               | Should be?    | Notes                                                 |
| -------------------------------------------- | ------------------------- | ------------- | ----------------------------------------------------- |
| `$lang.about.tsx`                            | No                        | Yes           | Live page, not indexed                                |
| `$lang.family._index.tsx`                    | No                        | Yes           | Live pillar                                           |
| `$lang.family.domestic-violence.tsx`         | No                        | Yes           | Live sub-page                                         |
| `$lang.family.elderly.tsx`                   | No                        | Yes           | Live sub-page                                         |
| `$lang.family.women-empowerment.tsx`         | No                        | Yes           | Live sub-page                                         |
| `$lang.voice._index.tsx`                     | No                        | Yes           | Live pillar                                           |
| `$lang.voice.community-action.tsx`           | No                        | Yes           | Live sub-page                                         |
| `$lang.voice.police-conduct.tsx`             | No                        | Yes           | Live sub-page                                         |
| `$lang.voice.racism-report.tsx`              | No                        | Yes           | Live sub-page                                         |
| `$lang.calculator.mortgage.tsx`              | No                        | Yes           | Live tool, different from the immigrant-specific page |
| `$lang.listings._index.tsx`                  | No                        | Likely        | Real estate landing                                   |
| `$lang.listings.$city.$type.$slug.tsx`       | No                        | Yes (dynamic) | Individual listing pages                              |
| `$lang.urban-renewal.$slug.tsx`              | No                        | Yes (dynamic) | Urban renewal detail pages                            |
| `$lang.professionals.$profession._index.tsx` | Yes (via ALL_PROFESSIONS) | Yes           | Covered                                               |
| `$lang.agency.*`                             | No                        | No            | noindex, internal                                     |
| `$lang.dashboard.tsx`                        | No                        | No            | noindex                                               |
| `$lang.login.tsx`                            | No                        | No            | noindex                                               |
| `$lang.design.tsx`                           | No                        | No            | noindex                                               |
| `$lang.subscribe.*.tsx`                      | No                        | No            | noindex                                               |
| `$lang.lead.tsx`                             | No                        | No            | no meta, internal                                     |
| `_index.tsx`                                 | N/A                       | No            | Redirects to /he                                      |
| `api.chat.tsx`                               | N/A                       | No            | API route                                             |
| `auth.$.tsx`                                 | N/A                       | No            | Auth callback                                         |
| `healthz.tsx`                                | N/A                       | No            | Health check                                          |

---

## Prioritized Recommendations

| Priority | Issue                                                                                              | Effort                                                | Impact                                                                            |
| -------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| P0       | Add canonical via `hreflangMeta()` to `$lang.rights.$slug.tsx` and other 20 missing content routes | Medium (repeat pattern)                               | Critical — without canonical, detail pages compete with each other across locales |
| P0       | Add hreflang to all content routes missing it (~46 routes)                                         | Medium (same fix as canonical — use `hreflangMeta()`) | High — duplicate content signal across 3 locales                                  |
| P1       | Add family, voice, about, calculator/mortgage to sitemap                                           | Low (add strings to PATHS array)                      | High — these pages are invisible to Google via sitemap                            |
| P1       | Change `_index.tsx` redirect from 302 to 301                                                       | Trivial                                               | Medium — PageRank consolidation                                                   |
| P2       | Add production guard to `PUBLIC_URL` in env.server.ts                                              | Low                                                   | High (prevents silent misconfiguration)                                           |
| P2       | Update footer to link to live Health, Family, Voice, Careers sections                              | Low                                                   | Medium — internal link equity                                                     |
| P3       | Add `<link rel="preconnect">` for Unsplash in root.tsx                                             | Low                                                   | Medium — LCP improvement                                                          |
| P3       | Add missing JSON-LD schemas (Organization, Person, DefinedTerm)                                    | Medium                                                | Medium — rich result eligibility                                                  |
| P4       | Add listings/urban-renewal to sitemap (dynamic paths)                                              | Medium                                                | Low (section may not be fully launched)                                           |

---

## Sources (Code)

All findings are based on direct reading of:

- `/Users/orhazan/tedros/app/routes/robots[.]txt.tsx`
- `/Users/orhazan/tedros/app/routes/sitemap[.]xml.tsx`
- `/Users/orhazan/tedros/app/routes/$lang.tsx`
- `/Users/orhazan/tedros/app/routes/$lang._index.tsx`
- `/Users/orhazan/tedros/app/root.tsx`
- `/Users/orhazan/tedros/app/lib/env.server.ts`
- `/Users/orhazan/tedros/app/lib/i18n/hreflang.ts`
- `/Users/orhazan/tedros/app/lib/i18n/config.ts`
- `/Users/orhazan/tedros/app/components/sections/site-footer.tsx`
- `/Users/orhazan/tedros/app/components/sections/site-header.tsx`
- All 82 files in `/Users/orhazan/tedros/app/routes/`

---

_Next: Tag @Tedros-ContentSEO to action P0/P1 fixes, and @Tedros-PM to create Linear issues for each priority tier._
