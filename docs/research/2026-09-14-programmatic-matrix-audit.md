# Programmatic URL matrix — duplication audit (TED-170)

**Date:** 2026-09-14 · **Author:** Tedros Researcher · **Status:** measurement complete, decision pending
**Scope:** every `<template> × <city>` URL family on tedros.co.il, measured against production
**Data language:** Hebrew (`/he/`) pages; Search Console figures cover all three locales

---

## Executive summary

1. **Four of the eight city-matrix templates carry zero original content.** Measured on the
   rendered page with site chrome stripped, `heritage/events/<event>/<city>` and
   `heritage/wedding/suppliers/<cat>/<city>` are **100.0 % identical** to each other *and to their
   own pillar page* — byte-identical bodies, differing only in `<title>` and `<link rel=canonical>`.
   `education/scholarships/<slug>/<city>` and `rights/<slug>/<city>` have a median pairwise
   similarity of **88.6 %** and **92.0 %**.
2. **The decisive number is not pairwise similarity — it is corpus uniqueness.** Of a median
   **3,447-character** `rights/<slug>/<city>` page, only **59 characters (1.7 %)** appear on no
   other Tedros URL, and those 59 characters are one templated FAQ heading
   (`איך מקבלים <right> ב<city>?`). Everything else is a verbatim copy of either the right's body
   (repeated across 39 cities) or the city payload (repeated across 48 rights in that city).
   For events, scholarships and wedding suppliers the figure is **0 characters**.
3. **Four templates do earn their existence.** `professionals/<prof>/<city>`,
   `heritage/kessim/<city>`, `culinary/shopping/<city>` and `cities/<city>` carry 30–57 %
   corpus-unique content, because they render **real per-city entity records** — named kessim with
   phone numbers from the Ministry of Religious Services list, named lawyers, named shops with a
   source-verification date.
4. **Search Console shows the city matrix did earn impressions, but at ~10× worse yield per URL.**
   In the good window `rights/<slug>/<city>` produced **0.032 impressions per URL per day** against
   **0.321** for `rights/<slug>` and **0.432** for hand-written `news/<slug>`.
5. **The same query is being answered by up to 15 different Tedros URLs.** The national Hebrew
   query `משכנתא ליוצאי אתיופיה` (no city in it) returned 15 Tedros URLs, 14 of them
   `rights/mashkanta-guide-ethiopians/<city>` cells. **86 % of all rights×city impressions came
   from queries that contain no city name at all.** This is the textbook shape of Google's
   "substantially similar pages" doorway example.
6. **However — and this matters — the impression collapse is almost certainly NOT a doorway
   enforcement.** The decline is uniform across every template including hand-written news
   (−89 %) and the glossary (−89 %); an identical two-day collapse happened on **Aug 20–21** and
   fully recovered on Aug 22; and Sep 3–4 partially recovered (248, 231 impressions) before
   collapsing again. Quality demotions are persistent and page-type-selective. See
   [§5](#5-what-the-evidence-does-and-does-not-prove).

**The duplication problem is real and independently worth fixing. It is not proven to be the cause
of the 2026-08-30 collapse.**

---

## 1. Method

* URL inventory from the seven live sitemaps, fetched 2026-09-14:
  9,366 URLs total (3,122 per locale × 3).
* **492 Hebrew pages fetched from production** at ~1.4 s per request, single-threaded, identifying
  user-agent. Sampling: `rights` — 24 right slugs sampled systematically across the alphabet × 8
  cities each (188 cells) plus their 24 pillar pages; every other city template sampled
  **exhaustively** (all 51 event cells, all 90 scholarship cells, all 33 professional cells, all 31
  kessim pages, all 39 city hubs, all 8 culinary and 6 supplier cells).
* **Chrome stripped before measurement.** Text is taken from `<article id="main-content">` only, so
  `SiteHeader`, the site `<nav>` elements and `SiteFooter` never enter the comparison. Scripts,
  styles and SVG are dropped. Without this step the measurement reports the layout, not the content.
* **Similarity** = `difflib.SequenceMatcher` ratio over the whitespace-normalised word sequence of
  that text. This reproduces the spot checks in the brief (600k-mortgage jerusalem/ashdod, etc.) to
  within a point.
* **Corpus uniqueness** = for each block-level line of text, count how many pages in the template's
  corpus contain that exact line. Lines with count 1 are original to that URL; the rest are copies.
* Search Console via the API, `dimensions=["page"]` paginated to exhaustion (1,515 rows for the
  good window), plus `["page","query"]` and `["date"]`.

Raw measurement scripts and the fetched corpus live in the session scratchpad; the derived numbers
are reproduced in full below.

---

## 2. Measured distributions per template

### 2.1 Pairwise similarity between city variants of the same page (chrome stripped)

| Template | HE URLs | all-locale URLs | pairs | **p10** | **median** | **p90** | **≥ 90 %** |
|---|---:|---:|---:|---:|---:|---:|---:|
| `heritage/events/<event>/<city>` | 51 | 153 | 90 | **1.000** | **1.000** | **1.000** | **100 %** |
| `heritage/wedding/suppliers/<cat>/<city>` | 6 | 18 | 4 | **1.000** | **1.000** | **1.000** | **100 %** |
| `rights/<slug>/<city>` | 2,138 | 6,414 | 304 | 0.876 | **0.920** | 0.941 | **77 %** |
| `education/scholarships/<slug>/<city>` | 90 | 270 | 126 | 0.864 | **0.886** | 0.907 | 19 % |
| `heritage/kessim/<city>` | 31 | 93 | 59 | 0.736 | **0.783** | 0.833 | 3 % |
| `cities/<city>` | 39 | 117 | 75 | 0.622 | **0.783** | 0.831 | 0 % |
| `culinary/shopping/<city>` | 8 | 24 | 13 | 0.563 | **0.631** | 0.748 | 0 % |
| `professionals/<prof>/<city>` | 33 | 99 | 42 | 0.319 | **0.375** | 0.419 | 0 % |

`careers/<track>/<city>` is already 301-redirected behind `CITY_CELLS_ENABLED = false` (TED-132)
and no longer appears in the sitemap; it is excluded.

Within `rights`, the relevance gate makes almost no difference to duplication:

| rights scope | rights | cells | median similarity | ≥ 90 % |
|---|---:|---:|---:|---:|
| `{kind:"all"}` (39 cities) | 48 | 1,872 | 0.923 | 88 % |
| `community-cities` (16 cities) | 16 | 256 | 0.876 | 25 % |
| `list` (1–4 cities) | 5 | 10 | — (too few pairs) | — |

### 2.2 City variant vs. its own pillar page

| Comparison | n | p10 | median | p90 | ≥ 90 % |
|---|---:|---:|---:|---:|---:|
| `heritage/events/<e>/<city>` vs `heritage/events/<e>` | 51 | 1.000 | **1.000** | 1.000 | **100 %** |
| `education/scholarships/<s>/<city>` vs pillar | 90 | 0.764 | 0.841 | 0.869 | 0 % |
| `rights/<slug>/<city>` vs `rights/<slug>` | 188 | 0.745 | 0.800 | 0.856 | 0 % |

The event cells are the same failure mode TED-132 found in careers: the loader assembles a city
overlay, but the rendered `<article>` contains the pillar body and nothing else. `סיגד בחולון` and
`סיגד ברמלה` both render `<h1>סיגד</h1>`; the string "חולון" appears **once** inside the article,
in a cross-link chip.

### 2.3 Unique content volume — the number that decides this

"Corpus-unique" = characters on lines that appear on **no other page of that template**.

| Template | median page chars | corpus-unique chars | **% unique** |
|---|---:|---:|---:|
| `heritage/events/<e>/<city>` | 2,608 | **0** | **0.0 %** |
| `education/scholarships/<s>/<city>` | 1,703 | **0** | **0.0 %** |
| `heritage/wedding/suppliers/<c>/<city>` | 1,899 | **0** | **0.0 %** |
| `rights/<slug>/<city>` | 3,447 | **59** | **1.7 %** |
| `professionals/<prof>/<city>` | 418 | 125 | 29.9 % |
| `heritage/kessim/<city>` | 1,067 | 366 | 34.3 % |
| `culinary/shopping/<city>` | 1,262 | 456 | 36.2 % |
| `cities/<city>` | 1,229 | 703 | **57.2 %** |

Worked example — `rights/600k-mortgage/herzliya` vs `…/ashkelon`, 3,555 chars total, 716 differ:

```
[170] הרצליה, הידועה כמרכז היי-טק ישראלי, מושכת יוצאי אתיופיה מהדור השני …   ← cityOverview
[ 30] קהילה אתיופית בהרצליה — נתונים                                          ← heading
[  6] ~2,000   [  3] ~2%   [ 22] הרצליה פיתוח, נווה אמל   [  3] ENP           ← 4 stats
[115] קהילת יוצאי אתיופיה בהרצליה מונה כ-~2,000 תושבים …                      ← generated FAQ 1
[ 96] הגישו בקשה דרך אתר מינהל הדיור … בהרצליה. לסיוע פנו ל: ENP.             ← generated FAQ 2
[ 73] בהרצליה פועלים: ENP. ארגונים אלה יכולים לסייע בניירת …                  ← generated FAQ 3
```

Every one of those 716 characters is emitted identically on **all 48 rights cells for Herzliya**
(measured: median 1,095 chars of city payload repeated verbatim on every sampled rights cell of the
same city) and on `cities/herzliya`. So the page's *real* per-URL contribution is the 59 characters
of the templated FAQ heading — 1.7 % of the page, produced by string concatenation.

This is what "5,900 chars of which 120 vary" looks like in practice, and it is worse than the
spot checks suggested: the varying part is not merely small, it is **itself duplicated 48 ways**.

---

## 3. What Google actually rewarded (Search Console cross-check)

### 3.1 Yield per URL, good window 2026-08-20 → 2026-08-29

Full pagination, 1,515 pages, 7,028 impressions, 137 clicks (703 impressions/day).

| Template | all-locale URLs | pages w/ impressions | impressions | **impr / URL / day** | clicks |
|---|---:|---:|---:|---:|---:|
| `news/<slug>` (hand-written) | 507 | 158 | 2,189 | **0.432** | 53 |
| `education/scholarships/<slug>` (pillar) | 54 | 58 | 216 | **0.400** | 9 |
| `rights/<slug>` (pillar) | 213 | 79 | 684 | **0.321** | 6 |
| `education/scholarships/<slug>/<city>` | 270 | 106 | 177 | 0.066 | 3 |
| `heritage/events/<event>/<city>` | 153 | 35 | 90 | 0.059 | 3 |
| **`rights/<slug>/<city>`** | **6,414** | **792** | **2,077** | **0.032** | **41** |
| `professionals/<prof>/<city>` | 99 | 6 | 24 | 0.024 | 0 |
| `heritage/kessim/<city>` | 93 | 0 | **0** | **0.000** | 0 |

**Honest reading:** the city matrix was not dead weight in impression terms — `rights/<slug>/<city>`
was the second-largest bucket (29.6 % of impressions) and produced 41 of 137 clicks. But it needed
6,414 URLs — 68 % of the entire sitemap — to do it, at one tenth the per-URL yield of the pillar
pages it copies. And `heritage/kessim/<city>`, the template with the *best* genuinely-local content,
earned zero impressions, which shows impressions are not tracking content quality here at all.

### 3.2 Query-level cannibalisation

From `dimensions=["page","query"]` (top 500 rows, good window):

* **343 distinct queries; 66 of them were served by more than one Tedros URL.**
* `משכנתא ליוצאי אתיופיה` → **15 Tedros URLs**, 14 of them `rights/mashkanta-guide-ethiopians/<city>`
  cells (tel-aviv, afula, beer-sheva, eilat, herzliya, jerusalem, kiryat-malakhi, lod, modiin,
  yerucham, tiberias, carmiel …).
* `זכאות למשכנתא ליוצאי אתיופיה` → 14 URLs, 12 of them city cells.
* **Only 14 % of rights×city impressions came from queries containing a city name.** The remaining
  86 % came from national queries the pillar page should have answered.

Some cells did match genuinely local intent — `שירות לאומי באילת`, `אולפן עברית חיפה`,
`ulpan herzliya` — but these are a handful of impressions against thousands.

### 3.3 The collapse is site-wide and intermittent

Daily impressions (all locales):

```
08-15  662 | 08-16  927 | 08-17  918 | 08-18  865 | 08-19  433
08-20   26 | 08-21   30 |  ← full collapse, avg position 64.0 / 51.4
08-22  618 | 08-23  822 | 08-24  828 | 08-25  894 | 08-26  958 | 08-27  816 | 08-28  616 | 08-29  485
08-30   32 | 08-31   24 | 09-01   31 | 09-02   42 |
09-03  248 | 09-04  231 |  ← partial recovery, full page mix returns
09-05   38 | 09-06   42 | 09-07   31 | 09-08   47 | 09-09   48 | 09-10   27 | 09-11   27 | 09-12   48
```

Decline by template, good window vs. 08-31 → 09-13:

| Template | impr/day good | impr/day bad | change | avg pos good → bad |
|---|---:|---:|---:|---|
| `news/<slug>` (hand-written, not templated) | 218.9 | 23.6 | **−89 %** | 7.2 → 11.6 |
| `rights/<slug>/<city>` | 207.7 | 17.3 | **−92 %** | 15.4 → 21.5 |
| `rights/<slug>` (pillar) | 68.4 | 7.9 | **−88 %** | 17.3 → 31.5 |
| `glossary/<slug>` | 43.8 | 4.7 | **−89 %** | 19.3 → 48.5 |
| `education/scholarships/<slug>` (pillar) | 21.6 | 2.9 | −86 % | 17.3 → 42.8 |
| `cities/<city>` | 2.4 | 0.4 | −82 % | 16.0 → 20.2 |

Google's only confirmed ranking event in the period is the **August 2026 spam update, 18–21 Aug,
completed 21 Aug** — nine days before the 30 Aug collapse, and the site's traffic was at its
*highest* (958/day on 26 Aug) after that update finished. The Search Status Dashboard records no
incident between 25 Aug and 14 Sep.

---

## 4. Google's policy language

**Doorway abuse** — [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies#doorways):

> "Doorway abuse is when sites or pages are created to rank for specific, similar search queries.
> They lead users to intermediate pages that aren't as useful as the final destination. Examples of
> doorway abuse include:
> - Having multiple websites with slight variations to the URL and home page to maximize their reach for any specific query
> - **Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page**
> - Generating pages to funnel visitors into the actual usable or relevant portion of a site
> - **Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy**"

The two bolded bullets describe `rights/<slug>/<city>` and `heritage/events/<e>/<city>` precisely:
pages targeted at specific cities, substantially similar (median 92.0 % / 100.0 %), whose cross-link
sections funnel users toward the pillar page.

**Scaled content abuse** — [same document](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content):

> "Scaled content abuse is when many pages are generated for the primary purpose of manipulating
> search rankings and not helping users. This abusive practice is typically focused on creating
> large amounts of unoriginal content that provides little to no value to users, no matter how it's
> created. Examples of scaled content abuse include, but aren't limited to:
> - Using generative AI tools or other similar tools to generate many pages without adding value for users
> - Scraping feeds, search results, or other content to generate many pages (including through automated transformations like synonymizing, translating, or other obfuscation techniques), where little value is provided to users
> - **Stitching or combining content from different web pages without adding value**
> - Creating multiple sites with the intent of hiding the scaled nature of the content
> - **Creating many pages where the content makes little or no sense to a reader but contains search keywords**"

"Stitching or combining content from different web pages without adding value" is a literal
description of the cell architecture: right body + city overview + generated FAQ, none of it new.

**Search Essentials / helpful content** —
[Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content),
"Avoid creating search engine-first content":

> - "Is the content primarily made to attract visits from search engines?"
> - "Are you producing lots of content on many different topics in hopes that some of it might perform well in search results?"
> - "Are you using extensive automation to produce content on many topics?"
> - "Are you mainly summarizing what others have to say without adding much value?"

and under content quality:

> - "If the content draws on other sources, does it avoid simply copying or rewriting those sources, and instead provide substantial additional value and originality?"
> - "Does the content provide substantial value when compared to other pages in search results?"

Note what the policy does **not** say: nothing here makes city-templated pages illegitimate per se.
The test is added value. `heritage/kessim/<city>` — a directory of named kessim with phone numbers,
sourced from the Ministry for Religious Services — passes that test. `rights/<slug>/<city>` at
1.7 % corpus-unique content does not.

---

## 5. What the evidence does and does not prove

**Proven by measurement:**

* Four templates (rights, scholarships, events, wedding suppliers) publish **6,855 all-locale URLs**
  whose bodies are 0–1.7 % original at corpus level. That is a defensible match to the *text* of
  Google's doorway and scaled-content policies, independent of any ranking event.
* The matrix cannibalises its own pillars: one national query returning 15 Tedros URLs is measured,
  not inferred.
* Per-URL yield of the city matrix is ~10× below the pillar pages, so the matrix is expensive in
  crawl budget and index footprint relative to what it returns.
* Four other templates (professionals, kessim, culinary, cities) are genuinely differentiated and
  should not be touched.

**NOT proven — stated plainly:**

* **That duplication caused the 2026-08-30 collapse.** Three facts argue against it: (a) the decline
  is uniform (−86 % to −92 %) across templated *and* hand-written content, including news at −89 %;
  (b) an identical two-day collapse occurred 20–21 Aug and fully recovered to 618/day on 22 Aug;
  (c) 3–4 Sep partially recovered with the full page mix before collapsing again. Algorithmic
  quality demotions do not oscillate on a two-day cycle and do not hit hand-written news equally.
* **That there is no manual action.** Google exposes no manual-actions API, so this audit cannot
  check it. **Someone must open Search Console → Security & Manual Actions in the UI.** That single
  check discriminates between the two hypotheses and should happen before any 6,855-URL migration.
* **That the recovery would follow consolidation.** No causal claim can be made. Consolidation is
  justified on cost, cannibalisation and policy-conformance grounds alone.
* Sampling caveat: `rights` duplication is measured on 188 of 2,138 HE cells (24 of 69 right slugs
  × 8 of up to 39 cities each). The spread is extremely tight (p10 0.876, p90 0.941, min 0.828,
  max 0.948 across 304 pairs), so the estimate is stable, but it is a sample. Every other template
  was measured exhaustively.
* GSC page-dimension data is subject to privacy thresholding; low-impression URLs are under-counted,
  which if anything understates how many city cells earned nothing.

---

## 6. Per-pillar recommendation

| Template | all-locale URLs | median sim | % unique | **Recommendation** | URLs removed |
|---|---:|---:|---:|---|---:|
| `heritage/events/<event>/<city>` | **153** | 1.000 | 0.0 % | **Remove** — 301 to `heritage/events/<event>` | **153** |
| `heritage/wedding/suppliers/<cat>/<city>` | **18** | 1.000 | 0.0 % | **Remove** — 301 to `…/suppliers/<cat>` | **18** |
| `rights/<slug>/<city>` | **6,414** | 0.920 | 1.7 % | **Remove** — 301 to `rights/<slug>` | **6,414** |
| `education/scholarships/<slug>/<city>` | **270** | 0.886 | 0.0 % | **Remove** — 301 to `education/scholarships/<slug>` | **270** |
| `professionals/<prof>/<city>` | 99 | 0.375 | 29.9 % | **Keep** — real named practitioners per city | 0 |
| `heritage/kessim/<city>` | 93 | 0.783 | 34.3 % | **Keep** — named kessim + phone numbers, official source | 0 |
| `culinary/shopping/<city>` | 24 | 0.631 | 36.2 % | **Keep** — named shops, dated verification | 0 |
| `cities/<city>` | 117 | 0.783 | 57.2 % | **Keep** — the canonical home of city content | 0 |
| `careers/<track>/<city>` | 0 | — | — | already removed (TED-132) | — |

**Total removed: 6,855 all-locale URLs (2,285 per locale) — 73 % of the 9,366-URL sitemap,
leaving 2,511.** The four kept city templates total 333 URLs.

### City variants worth preserving — the specific list

* **All 33 `professionals/<prof>/<city>` cells** (99 URLs). Median 37.5 % similarity; each renders
  actual named, Amharic-speaking practitioners filtered to that city. Lowest measured pair:
  `professionals/real-estate-agent/netanya` vs `…/jerusalem` at **0.259**.
* **All 31 `heritage/kessim/<city>` pages** (93 URLs). E.g. `heritage/kessim/afula` lists three
  named kessim and rabbis with phone numbers from the official Ministry for Religious Services
  register. This is primary-source local data that exists nowhere else online in Hebrew.
* **All 8 `culinary/shopping/<city>` pages** (24 URLs). Named streets, named shops, an explicit
  "list verified against sources on 30 August 2026" line.
* **All 39 `cities/<city>` hubs** (117 URLs). 57.2 % unique — the highest of any template, and the
  correct 301 destination for any city-scoped intent that survives consolidation.

**Not worth preserving, despite looking local:** the 10 `list`-scoped rights cells
(`urban-renewal-kiryat-moshe/rehovot`, `urban-renewal-ramat-eliyahu/rishon-lezion`,
`urban-renewal-netanya/netanya`, `tech-career-bootcamp/{tel-aviv,beer-sheva,haifa}`,
`falash-mura-direct-absorption/{netanya,rishon-lezion,rehovot,kiryat-malakhi}`). Measured against
their own pillars they are 0.762–0.822 similar, and the pillar is *already* the city-specific page —
`rights/urban-renewal-netanya` is about Netanya. The cell adds a duplicate. Fold them in with the
rest.

---

## 7. Migration recommendation

**301 permanent redirect to the pillar page, gated behind a per-template flag — the TED-132
pattern, reused verbatim.**

`app/routes/$lang.careers.$track.$city.tsx` already does exactly this for the ~408 careers cells:

```ts
const CITY_CELLS_ENABLED = false;

export async function loader({ params }: Route.LoaderArgs) {
  // …param validation…
  if (!CITY_CELLS_ENABLED) {
    throw redirect(`/${locale}${trackPath(trackParam)}`, 301);
  }
  // …the full cell loader remains below, unreachable until the flag flips…
}
```

Copy it into `$lang.rights.$slug_.$city.tsx`, `$lang.heritage.events.$event.$city.tsx`,
`$lang.education.scholarships.$slug_.$city.tsx` and
`$lang.heritage.wedding.suppliers.$category.$city.tsx`, and drop the corresponding entries from
`sitemap-rights.xml`, `sitemap-content.xml` and the cross-link chip lists that point at them.

**Why 301 and not the alternatives:**

* **vs. `noindex`** — `noindex` keeps 6,855 URLs crawlable and crawled, so the crawl-budget and
  index-bloat cost stays. It also passes no signal to the pillar. Its only advantage is
  reversibility, which the feature flag already provides more cheaply.
* **vs. deletion / 410** — the city cells earned 41 of 137 clicks and 2,077 impressions in the good
  window. A 410 throws that away. Because 86 % of those impressions came from queries with no city
  in them, the pillar page is the correct destination for essentially all of that demand — a 301
  redirects real users to a strictly better page and consolidates the signals.
* **vs. `rel=canonical` to the pillar** — canonical is a hint, not a directive; Google is free to
  ignore it and keep indexing near-duplicates, which is the failure mode we are trying to exit.
* The flag preserves the option to re-enable any cell family the day it has real local content
  (a municipal office address, a local programme, distinct eligibility), which is exactly the door
  TED-132 left open.

**Sequencing.** Do the manual-action check first (§5). Then ship events + wedding suppliers
(171 URLs, 0 % unique, zero risk, immediate) as a fast follow, then scholarships (270), then rights
(6,414) as its own PR with a redirect test per right slug. Keep the four preserved templates out of
the change entirely.

---

## Sources

* Production crawl of tedros.co.il, 492 Hebrew pages, 2026-09-14 (this audit).
* Google Search Console API, property `https://tedros.co.il/`, windows 2026-08-15 → 2026-09-13.
* [Spam policies for Google web search — Doorway abuse](https://developers.google.com/search/docs/essentials/spam-policies#doorways)
* [Spam policies for Google web search — Scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)
* [Google Search Essentials](https://developers.google.com/search/docs/essentials)
* [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
* [Google Search Status Dashboard — ranking updates history](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history) (August 2026 spam update, 18 Aug, 2 d 16 h)
* [Search Engine Journal — Google finishes rolling out the August 2026 spam update](https://www.searchenginejournal.com/google-begins-rolling-out-the-august-2026-spam-update/586301/)
* Repo precedent: `app/routes/$lang.careers.$track.$city.tsx` (TED-132), `app/lib/rights/relevance.ts`,
  `app/lib/rights/city-faq.server.ts`, `app/lib/cities/content.server.ts`.

---

**Handoff → Tedros Architect / PM.** The measurement is done and the recommendation is a
4-file, flag-gated change. Two decisions are owner-level and are not mine to make:
(1) does someone confirm there is no manual action in Search Console before we migrate 6,855 URLs;
(2) do we accept losing the 29.6 % of impressions the rights matrix currently carries in exchange
for a 2,511-URL site whose every page is original. My read: yes, because that 29.6 % is being served
to national queries the pillar answers better.
