# The four kept directories — demand check before investment (TED-170)

**Date:** 2026-09-16 · **Author:** Tedros Content & SEO · **Status:** measured; investment decided
**Window:** 2026-06-18 → 2026-09-15 (90 days), Google Search Console API, property `https://tedros.co.il/`
**Precondition for TED-170:** the audit in `2026-09-14-programmatic-matrix-audit.md` kept four
directories on uniqueness grounds and flagged that one of them — the best-written of the set —
had earned nothing. So this document establishes demand **before** deciding where to spend effort.

---

## Executive summary

**Uniqueness and demand are close to uncorrelated across these four directories.** The directory
with the highest corpus-uniqueness earns almost nothing; two earn literally zero; the one that
earns most does so through a page type the audit did not measure at all.

| directory                     | all-locale URLs | corpus-unique | **90d impressions** | clicks | pages w/ impr |
| ----------------------------- | --------------: | ------------: | ------------------: | -----: | ------------: |
| `cities/<city>`               |             117 |    **57.2 %** |             **160** |      2 |            46 |
| `culinary/shopping/<city>`    |              24 |        36.2 % |               **0** |      0 |             0 |
| `heritage/kessim/<city>`      |              93 |        34.3 % |               **0** |      0 |             0 |
| `professionals/<prof>/<city>` |              99 |        29.9 % |             **204** |      4 |            28 |

For scale, over the same window: `rights/*` 20,989 impressions, `news/*` 10,464. **The four kept
directories together account for 364 impressions — 0.8 % of the site's 45,741.**

Three findings drove the investment decision, and each one pointed away from "write more directory
pages":

1. **The demand these directories serve is real, but it lands on article-shaped pages, not
   directory-shaped ones.** Hand-written news city guides earned **7,803 impressions and 220 clicks**
   against `cities/<city>`'s 160 and 2 — a 49× gap on the same subject. Likewise
   `news/where-to-buy-ethiopian-spices-groceries-israel` earned **199 impressions, 10 clicks, avg
   position 5.0** while the entire 8-city `culinary/shopping` directory earned 0.
2. **Kessim demand exists and is national and definitional, not per-city.** Zero impressions for the
   directory, but the query `kessim` earned **60 impressions at avg position 4.8–9.2** — served by
   `rights/kessim-religious-support/<city>` cells that **TED-172 is about to 301 away**, plus
   `glossary/kessim` for `קייסים`, `קסים`, `מה זה קייס`. Nobody searched for a kes in a named city.
3. **Within professionals, the individual practitioner profiles out-earn the prof×city matrix** —
   328 impressions / 9 clicks across 57 profile pages vs 204 / 4 across 28 matrix cells, and 131 of
   those 204 are a single page. This is the quantitative form of the ticket's own claim that the gap
   is recruitment, not writing.

---

## 1. Method

- `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY` via Composio, property `https://tedros.co.il/`,
  2026-06-18 → 2026-09-15.
- Three pulls: `dimensions=["page"]` (3,963 rows, 45,741 impressions — full, not truncated),
  `dimensions=["query"]` (1,586 rows), and `dimensions=["query","page"]` (2,475 rows) to attribute
  each query to the page that served it.
- An initial `["page","query"]` pull at `row_limit: 500` was **discarded as misleading** — it
  truncates to the top 500 rows and undercounts every long-tail directory. The figures above come
  from the full pulls.
- Directory buckets assigned by regex on the URL path, with `professionals/profile/<slug>` separated
  from `professionals/<prof>/<city>` — the audit had merged them, which is what hid finding 3.
- Caveat carried forward from the audit: GSC page-dimension data is privacy-thresholded, so
  low-impression URLs are undercounted. That can only make the zero-impression directories look
  _better_ than they are, never worse.

---

## 2. Per-directory findings and what was decided

### 2.1 `heritage/kessim/<city>` — 0 impressions, but real demand one level up

The directory earned nothing across all 93 URLs in 90 days. But the community's own term does earn:

| query        | impressions | avg position | served by                                      |
| ------------ | ----------: | -----------: | ---------------------------------------------- |
| `kessim`     |          28 |          4.8 | `en/rights/kessim-religious-support/jerusalem` |
| `kessim`     |          27 |          5.7 | `en/rights/kessim-religious-support/rehovot`   |
| `kessim`     |           5 |          9.2 | `en/rights/kessim-religious-support/netanya`   |
| `קייסים`     |          10 |         22.8 | `he/glossary/kessim`                           |
| `קסים`       |           4 |         55.2 | `he/glossary/kessim`                           |
| `מה זה קייס` |           1 |          9.0 | `he/glossary/kessim`                           |

Two things follow. **The demand is definitional and national** — "who or what is a kes", never "a kes
in Ashkelon". And **60 of those 76 impressions sit on URLs TED-172 is redirecting away**, so without
action this demand loses its landing page.

**Decided: deepen the landing page, not the city pages.** The roster was re-verified (§3) and left
alone; the landing page gained the content that answers the actual query — which ceremonies a kes is
approached for, what to ask before committing, how to arrange one — plus FAQPage schema, since the
queries are questions. The 31 city pages got a link to it and nothing else: copying one identical
block across a city matrix is precisely the 0–1.7 %-unique pattern that cost 6,858 URLs.

### 2.2 `culinary/shopping/<city>` — 0 impressions, while the national article ranks 5th

Zero across all 24 URLs. Meanwhile `news/where-to-buy-ethiopian-spices-groceries-israel` earned
**199 impressions and 10 clicks at avg position 5.0**, on queries that are unambiguously this
directory's intent: `איפה קונים` (5), `איפה קונים?` (3), `איפה אפשר לקנות` (2), `איפה לקנות`,
`איפה משיגים`, `איפה ניתן לקנות`, `תבלין`. Adjacent informational demand is larger still —
`אינג'רה` and variants total 139 impressions, served by `glossary/injera` and
`news/ethiopian-food-culture-injera`.

The directory holds the verified data; the article holds the audience. **And the article did not
link to the directory at all.**

**Decided: re-verify, add no cities, and connect the two.** See §3 for verification results. The
article now carries a by-city section linking all eight pages in all three locales, and states which
cities have no page and why.

### 2.3 `professionals/<prof>/<city>` — the profiles are the asset, and the ticket was right

Splitting the two page types apart changes the picture:

| page type                      | pages w/ impr | impressions | clicks |
| ------------------------------ | ------------: | ----------: | -----: |
| `professionals/profile/<slug>` |        **57** |     **328** |  **9** |
| `professionals/<prof>/<city>`  |            28 |         204 |      4 |
| `professionals/<prof>` pillar  |            10 |          14 |      0 |

The matrix total is dominated by one page — `en/professionals/real-estate-agent/netanya` at 131 of
204, on generic English queries (`real estate brokers netanya`, `netanya real estate advisor`) that
have nothing to do with the community. Strip it and the other 27 cells earned 73 impressions between
them.

The profile pages, by contrast, spread demand across 57 pages and convert better (9 clicks on 328
impressions vs 4 on 204), including in Amharic — `am/…/psychologist-ashdod-anxiety-depression` at
position 5.6, `am/…/psychologist-netanya-trauma` at 6.6.

**Decided: touched nothing here.** The data says each additional _real practitioner_ adds a page that
earns; additional prose does not. That is TED-25, it is blocked on the owner, and no amount of
content work in this PR substitutes for it. Writing more here would have been motion without effect.

### 2.4 `cities/<city>` — highest uniqueness, 2 clicks, and one genuinely useful signal

160 impressions, 2 clicks across 117 URLs — against **7,803 impressions and 220 clicks** for the
hand-written news city guides covering the same cities. The article form wins by 49×.

One finding is worth acting on later, though not by writing more city pages. **The Amharic locale
over-indexes sharply:**

| locale | pages w/ impr | impressions | notable                                             |
| ------ | ------------: | ----------: | --------------------------------------------------- |
| `am`   |             9 |      **77** | `am/cities/nof-hagalil` 31 impr at **position 4.5** |
| `he`   |            23 |          58 |                                                     |
| `en`   |            14 |          25 |                                                     |

9 Amharic pages out-earn 23 Hebrew ones, at materially better positions (4.2–7.3), on bare
Amharic city names — `ኖፍ`, `አፉላ`, `አታ`, `ኢየሩሳሌም ከተማ`. There is very little Amharic-language
competition for Israeli city names, and we are already winning it by default.

**Decided: left the 39 city hubs alone in this PR, and logged the Amharic signal for a scoped
follow-up.** It is a real opportunity, but it is an Amharic-content question needing a native
speaker — not something to act on by machine-writing 39 more pages, which is how this site got into
trouble.

---

## 3. Verification results

### 3.1 Kessim roster — re-crossed against data.gov.il, 2026-09-16

- `package_show?id=ethiopianrav`: **no newer version exists.** Still one resource
  (`cd9f47b3-e4fa-42c9-ad6b-97410c78725b`), `last_modified` **2024-10-13**, `metadata_modified`
  **2024-10-13** — unchanged since the directory was built.
- All **75** datastore records re-fetched and diffed field-by-field against the repo entries.

| check                                         | result  |
| --------------------------------------------- | ------- |
| records in source / in repo                   | 75 / 75 |
| in source but missing from repo               | **0**   |
| in repo but not in source (i.e. invented)     | **0**   |
| mismatches on position, familyName, firstName | **0**   |
| mismatches on phone                           | **0**   |
| distinct `Place` values vs. city slugs        | 31 / 31 |

**Zero corrections required.** The landing page now prints the re-check date alongside the ministry's
own update date, so a reader can see both that the list was checked this month and that the ministry
has not touched it in two years.

### 3.2 Culinary shops — re-verified 2026-09-16

- All **11** distinct source URLs re-fetched. Ten return 200. `facebook.com/Marketonayla` returns
  400 to non-browser clients — Facebook's bot block, not a dead page.
- The four `confidence: "current"` shops sourced to their own website were each opened and confirmed
  trading, with addresses and published hours:

| shop           | city          | address confirmed         | signal                      |
| -------------- | ------------- | ------------------------- | --------------------------- |
| תבליני סלמון   | Rishon LeZion | תרמ"ב 18                  | © 2025, live contact        |
| עלמיתו תבלינים | Ashkelon      | העבודה 26 (+ Beit Shikma) | published hours, promotions |
| מולו תבלינים   | Holon         | התנאים 5, ג'סי כהן        | **address newly captured**  |
| סוד הקסם       | Yehud         | בן צבי 21                 | live storefront, shipping   |

- **1 improvement:** Holon's `area` was the bare city name; it is now the street address.
- **0 removals, 0 additions, 0 cities added.** The `dated` entries keep their year and their
  call-ahead caveat.

### 3.3 A factual correction found while verifying

Checking the kessim material against the 2018 government decision surfaced an **unsupported claim in
five places** across `marriage.server.ts` and `kessim.server.ts`: that the decision authorized the
kessim to officiate `חופה וקידושין`.

Government decision **3649** (19.02.2018, "הסדרת שירותי הדת עבור יוצאי אתיופיה") recognized the
kessim as the community's spiritual leaders and funded posts for them in the religious councils —
7.5 kessim posts in 2018, 10 more across 2019–2021, 20 Ethiopian-origin rabbis funded in 2018.
Ynet's report of the decision lists marriage authority as a **community demand still under
discussion**, not as something granted. Officiating a _registered_ wedding requires a personal permit
from the city rabbi at the religious council where the file was opened, or from the Chief
Rabbinate's committee for approving officiants.

The worst instance was an FAQ asking `קס יכול לחתן אותנו באופן רשמי?` and answering **`כן.`** A couple
who read it, booked a kes and a hall, and learned at registration that the ceremony could not be
registered is the TED-148 failure shape exactly: a reader acting on our word and being refused at a
counter.

All five passages now state the permit rule and tell the reader to ask the religious council by name
before booking. The TED-140 sensitivity requirement — that neither track be ranked above the other —
is preserved and now rests on an accurate premise. A `RETIRED_CLAIMS`-style guard in
`tests/heritage-kessim.test.ts` bans the old phrasings in all three locales.

---

## 4. What this says about where directory effort should go

The audit's conclusion was that these four directories are the site's real asset because they carry
verified primary data. That remains true, and the verification in §3 is what keeps it true. But
uniqueness earns nothing on its own:

- **Verified data is an asset; a directory page is not automatically its best container.** Both
  zero-impression directories have a national, article-shaped sibling that ranks. The directory's
  job is to be the sourced data behind that article — which means the article must link to it, and
  until this PR neither did.
- **Check the demand shape before the page shape.** The kessim material was strong and its URL
  pattern was wrong: people ask what a kes _is_, then how to reach one. A per-city roster answers
  the second question to an audience that never arrives at it.
- **For professionals, content work is not the lever.** 57 real profiles out-earn 33 matrix cells.
  The next unit of value there is a recruited practitioner (TED-25), not a paragraph.
- **The Amharic locale is underexploited and uncontested.** 9 Amharic city pages out-earn 23 Hebrew
  ones at better positions. This deserves a scoped issue with a native speaker attached — not
  machine-written expansion.

---

## Sources

- Google Search Console API, property `https://tedros.co.il/`, 2026-06-18 → 2026-09-15 (this
  document). Full `page`, `query` and `query`×`page` pulls.
- [data.gov.il — רבני העדה האתיופית (`ethiopianrav`)](https://data.gov.il/dataset/ethiopianrav),
  resource `cd9f47b3-e4fa-42c9-ad6b-97410c78725b`, re-fetched 2026-09-16.
- [Government decision 3649, 19.02.2018](https://www.gov.il/he/pages/dec3649_2018) — gov.il returns
  403 to automated clients; the `/Departments/policies/dec3649_2018` form 301s to it, confirming the
  page exists.
- [Ynet — החלטה היסטורית: מדינת ישראל תכיר בקייסים](https://www.ynet.co.il/articles/0,7340,L-5121468,00.html)
- [Davar — לראשונה: יוסדר מעמדם של הקייסים](https://www.davar1.co.il/111287/)
- [המועצה הדתית ירושלים — רשימת הרבנים המאושרים לעריכת חופה וקידושין](https://rabanut.org.il/%D7%A8%D7%A9%D7%99%D7%9E%D7%AA-%D7%94%D7%A8%D7%91%D7%A0%D7%99%D7%9D-%D7%94%D7%9E%D7%90%D7%95%D7%A9%D7%A8%D7%99%D7%9D-%D7%9C%D7%A2%D7%A8%D7%99%D7%9B%D7%AA-%D7%97%D7%95%D7%A4%D7%94-%D7%95%D7%A7%D7%99/)
- [Israeliana — מסורת ומורשת בקהילת יוצאי אתיופיה בישראל: דת ואמונה](https://www.israeliana.org/post/%D7%A4%D7%95%D7%9C%D7%A7%D7%9C%D7%95%D7%A8-%D7%9E%D7%95%D7%A8%D7%A9%D7%AA-%D7%95%D7%A0%D7%95%D7%A1%D7%98%D7%9C%D7%92%D7%99%D7%94-%D7%91%D7%A7%D7%94%D7%99%D7%9C%D7%AA-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-%D7%91%D7%99%D7%A9%D7%A8%D7%90%D7%9C-%D7%97%D7%9C%D7%A7-%D7%91)
- [Davar — טקס סיגד ההמוני בטיילת ארמון הנציב](https://www.davar1.co.il/157433/)
- Shop sources re-fetched 2026-09-16: [salmonspice.com](https://salmonspice.com/),
  [almitospices](https://keren7890.wixsite.com/almitospices),
  [mulu-tavlenem.com](https://www.mulu-tavlenem.com/he/home),
  [sodhakesem.com](https://www.sodhakesem.com/).
- Prior: `docs/research/2026-09-14-programmatic-matrix-audit.md`, `docs/adr/021-*.md`,
  `docs/adr/022-*.md`.

---

**Handoff → Tedros Engineer** for review of the route and registry changes, and
**→ Tedros PM** for two follow-ups this measurement justifies but does not itself deliver:
(1) TED-25 practitioner recruitment is the only lever that grows the professionals directory;
(2) an Amharic-locale opportunity worth its own issue, with a native speaker attached — the AM
copy added in this PR is model-written and needs native review before it is treated as final.
