# ADR-025: A programmatic page ships only when a named human or a cited source stands behind it

**Status**: Accepted (2026-11-12).
**Owner**: Tedros Engineer (the guard); Tedros Content & SEO (the convention).
**Related**: TED-187 (this change), TED-186 (the diagnosis), TED-188 (the `lastmod` half), ADR-024 (whose scope this widens and one of whose premises this corrects), ADR-021 (the sourced-claims guard this is modelled on), ADR-020 (where content lives).

## Context

ADR-024 (2026-09-15) withdrew 6,855 city-cell URLs and set the test for a
`<template> × <city>` page: it ships only if it renders per-city entity records
that exist nowhere else on the site. That decision stands, and the measurement
behind it — corpus uniqueness, not pairwise similarity — was the right
instrument.

Two months of Search Console data say it was not enough, and that one of its
factual premises was wrong.

### What two more months measured

ADR-024 declined to attribute the 2026-08-30 collapse to a quality judgment, on
two stated grounds: the decline was uniform across hand-written news too, and it
oscillated on a two-day cycle, "which quality demotions do not." Both readings
were reasonable on the data then available. Neither survives the Sigd
observance, which is as close to a controlled experiment as this site will get.

Sigd 5787 fell on **9.11.2026**. `/he/news/sigd-2026-complete-guide` is
hand-written, uniquely sourced, indexed, and was recrawled through the period:

| window                                | impressions | average position |
| ------------------------------------- | ----------: | ---------------: |
| 9–15.8 and 23–29.8 (three months out) |     ~300/wk |          **2.7** |
| 26.10–1.11 (the week before)          |           6 |          **5.2** |
| 5–11.11 (**the week of the holiday**) |           1 |         **13.0** |

Demand for `חג הסיגד` is at its annual maximum in the week of the holiday. The
page was fresher in November than in August — TED-185 had just added the
assembly the organiser announced, content that exists on no other site. The
position fell anyway, and not one Hebrew `סיגד` query appears in the November
report at all, where `חג הסיגד` had been the site's single largest query.

Demand up, freshness up, originality up, position down. That is not seasonality,
not crawl budget, not indexing: a 38-URL sample taken 9.11 found 35 of 38
"Submitted and indexed", a median crawl age of ~35 days, and the server
answering 200 in 0.42 s. The two-day oscillation ADR-024 saw is what ±3
impressions looks like on a base of ten per day.

What is left is that Google is choosing not to rank pages it has crawled,
indexed and found healthy. One check remains owner-only and is not yet done
(Search Console → Manual actions), so "algorithmic" is the leading reading and
not a settled one. Either way the demotion is site-level: the homepage still
ranks **1.0** for the site's own name, so the domain is not suppressed — what
collapsed is non-brand informational ranking, everywhere, at once.

### The premise in ADR-024 that was wrong

ADR-024 left four city families untouched, `professionals/<prof>/<city>` among
them, on the grounds that they "render named practitioners". For that family
this was not true. Of the 35 directory slots, **30 are anonymous**: they
describe a _type_ of professional — "what to expect from a lawyer in Netanya" —
with no lawyer. 29 of the 33 profession × city cells contained nothing else.
The 29.9 % corpus uniqueness the audit measured was real, and it was template
prose varying by city name, not people.

The same audit instrument, pointed at the clusters ADR-024 did not cover, found
the same shape: 40 health condition pages, 18 one-question FAQ pages, 13 news
tag archives, 10 composite "success stories" and 105 professional profile
slots. 447 URLs, 26 % of the submitted footprint, carrying 5 % of impressions
and **0 of 34 clicks** in the six weeks to 8.11.

### The defect that found itself

Auditing those clusters for _who_ was behind them surfaced two schema claims
that were simply false, and they are the reason this ADR is about people rather
than about uniqueness:

- Every one of the 105 profile slots emitted a `Person` node. For the 100
  anonymous ones its `name` fell back to the slot title, so the site asserted
  in machine-readable form that `עורך דין במעלה אדומים — תחום כללי` is a human
  being.
- Every one of the 40 health condition pages emitted `MedicalWebPage` with
  `reviewedBy: {"@type": "Organization", name: "Tedros"}` and a `lastReviewed`
  date. That pair is a specific claim: this medical content was reviewed, on
  that date, by that reviewer. No review ever happened, the date was the seed
  date, and "Tedros" is a website, not a clinician.

Corpus uniqueness would never have caught either. Both pages were unique. They
were unique _and_ unattributable, and on YMYL medical content that is the worst
combination available.

## Decision

**A page is submitted for indexing only when a named human or a cited primary
source stands behind it. Where neither does, the page may still exist and stay
linked, but it is `noindex,follow` and absent from every sitemap.**

This widens ADR-024 in two ways. Its subject is any programmatic cluster, not
only `<template> × <city>`. And its test is attribution rather than corpus
uniqueness — uniqueness is necessary and has turned out not to be sufficient.

Three corollaries, each of which this change implements:

1. **The guard reads the data, never a list.** Every withdrawal here is
   `entry.listedProfessional != null` or `slots.some((s) => s.isListed)`, so a
   professional who onboards tomorrow brings their page back into the index
   without anyone editing a route. `lawyer/jerusalem` is the case that proves
   the point: one anonymous slot beside one real person, and it stays indexed.
2. **A structured-data node is a factual claim and is held to the same bar.** A
   `Person` requires a person; `reviewedBy` on medical content requires a
   clinician who did the review. Where the subject does not exist, the node is
   not emitted — it is not softened, and the page is not merely hidden.
3. **`noindex`, not 301 and not 410.** ADR-024 chose 301 correctly: its cells
   were duplicates of a pillar that _should_ own the query. These pages are not
   duplicates of anything, so there is nowhere to point a redirect, and a 410
   would destroy content a reader who arrives still wants. The pages render,
   stay linked from their hubs, keep their disclaimers, and come back by
   flipping the condition that withdrew them.

**Withdrawal is a precondition, not a remedy.** Nothing here is evidence that a
thinner index restores ranking; no such evidence exists. It removes the
strongest policy-conformance objection against the site and makes a
reconsideration request possible if the manual-actions check comes back dirty.
The thing that earns ranking back is pages like the Sigd assembly, and this ADR
exists to stop the other kind being produced faster than they can be withdrawn.

## Consequences

- The submitted footprint goes **1,992 → 1,572 all-locale URLs**, in two
  tranches: 120 in TED-187 phase 1 (90 anonymous profile slots, 30 story
  pages), 300 in phase 2 (87 unstaffed city cells, 120 health conditions, 54
  FAQ pages, 39 tag archives). 420 URLs withdrawn, not the 447 originally
  scoped — 27 of them turned out to have a real person behind them.
- `/health/conditions/*` is withdrawn on expertise rather than emptiness, and
  is the one cluster here with a clear route back: a named clinician reviewing
  the 40 pages restores both the index entry and, honestly this time, the
  `reviewedBy` node. The figures themselves are sourced and are not the
  problem.
- **`lastmod` now means something** (TED-188). It used to fall back to
  `new Date()`, so 1,323 of 1,992 URLs claimed "changed today" every day. 483
  URLs carry one now — the news articles, from their own `updatedAt` — and the
  other 1,089 carry none. A crawler lied to about 66 % of a sitemap has no
  reason to believe the rest, and this is the signal we need in order to ask
  for a recrawl of pages we have actually changed.
- `tests/index-footprint.test.ts` pins the total. Raising the ceiling is a
  deliberate edit with this ADR's question attached to it: who is behind the
  new pages? The 2026-08-30 wave was 136 files and +22,646 lines and landed
  without anyone having to answer that.
- The four families ADR-024 kept are now three. `heritage/kessim/<city>`
  (named kessim, phone numbers from the Ministry for Religious Services
  register), `culinary/shopping/<city>` (named shops with dated verification)
  and `cities/<city>` pass this ADR's test as they passed ADR-024's, and for
  the right reason: there is somebody behind them.

## Alternatives considered

**Wait for the manual-actions check before withdrawing anything.** The check is
ten seconds of owner time and is still outstanding, and ADR-024 considered the
same objection. Rejected on the same ground, now with more force: if the answer
is dirty, a reconsideration request requires the cleanup to already be done; if
it is clean, the cleanup is what a core-update refresh would need to see. The
answer changes the timeline, not the work.

**Widen to the full 447 regardless of attribution.** Rejected, and this is the
substantive scope change from the issue as written. TED-187 said 105 profile
URLs and 99 city cells; 15 of the former and 12 of the latter carry a real
person's name, phone number and licence. Implementing the issue literally would
have de-indexed five professionals who asked to be in the directory — which is
the opposite of this ADR.

**Keep the clusters and improve them in place.** Correct for the health pages
and available any time a clinician reviews them. Not available for 29 city
cells with nobody in them: there is no edit that makes an empty directory
listing worth ranking, only an onboarding.

**Delete the pages (410).** Rejected. 410 is the right answer for syndicated
duplicates — TED-176 used it for 537 listing URLs — and the wrong answer here.
These pages are reached from hubs and from each other, some are genuinely
useful to a reader who lands on them, and nothing about the diagnosis requires
destroying them. `noindex` withdraws exactly the claim that was overstated.

**A CI guard that judges originality.** Not buildable, and pretending otherwise
would be worse than the count ceiling: it would licence the next wave on a
green check. The ceiling is honest about what a machine can see — how many URLs
we are asking Google to take seriously — and leaves the judgment where it has
to live, with whoever raises the number.
