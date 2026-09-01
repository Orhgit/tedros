# ADR-021: A money or eligibility claim carries its source in the copy, or it does not ship

**Status**: Proposed (2026-09-01).
**Owner**: Tedros Content & SEO (the convention); Tedros QA (the guard); Tedros Engineer (registry shapes).
**Related**: TED-157 (this sweep), TED-152 (8 fabricated scholarships), TED-155 (2 retired phone numbers on 21 files), TED-148 (the fabricated absorption basket), TED-121 (`content-markers` — the guard this one is modelled on), ADR-020 (where content lives).

## Context

In one week this repo shipped three separate fabrication incidents, and **every one was found by accident, while someone was working on something else**:

| Issue   | What was published                                                                                                                         | How it was found                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| TED-152 | 8 scholarship entries naming organizations that do not exist. "קרן פלס" turned out to be a singer.                                         | Noticed while merging duplicate entries |
| TED-155 | Two retired Tebeka phone numbers across 21 files, neither on Tebeka's site.                                                                | Noticed while fixing one guide          |
| TED-148 | A rights page advertising "מענק הסתגלות תרבותית ₪2,500 — ייחודי לעולים מאפריקה", furniture grants, 500 free ulpan hours, ₪12,000 vouchers. | Noticed while adding an unrelated entry |

TED-148 is the one that sets the stakes. It did not merely publish a wrong number: it told a community that a benefit existed **because of where they were born**, when the ministry's own page says the basket is paid to olim "מכל מדינות העולם" by family status and age. Someone who read that page and acted on it gets refused at a counter, in front of a clerk, having been told by us that they were entitled.

The audience makes the error asymmetric. This site is read by people deciding whether a bureaucratic errand is worth a bus fare and a day off work. **A missing claim costs a reader one search. A false claim costs them the day, and some of their willingness to try again.**

### Why the accidents keep happening

The content registries have no consistent place to record where a fact came from:

| Registry             | Source field                        | Verification date |
| -------------------- | ----------------------------------- | ----------------- |
| `ScholarshipEntry`   | `applicationUrl` (often a homepage) | `lastVerified` ✅ |
| `RightSeed`          | one `govUrl` for the whole page     | none              |
| `ProgramEntry`       | **none**                            | **none**          |
| `ComparisonEntry`    | **none**                            | **none**          |
| careers / family / … | **none**                            | **none**          |

So a shekel figure enters a body as prose and there is nothing — no field, no review step, no test — that ever asks it where it came from. `lastVerified` on `ScholarshipEntry` shows why a field alone is not enough: 16 wave-2 entries carry `lastVerified: "2026-08-30"`, asserted on the same day TED-152 was deleting fabricated siblings out of that same file. **An unenforced field records a claim about verification, not verification.**

TED-152 also shows how a partial sweep leaves a trap. Its selection criterion was "does the named organization exist" — so the entries that survived are the ones naming Technion, HUJI, TAU, Yad Hanadiv, Na'amat. They survived because the _org_ is famous, not because anyone confirmed the _scholarship_. A future reader of that commit reasonably concludes the file was audited. It was not.

## Decision

**Any content entry that states a monetary amount or an eligibility threshold must carry, in the rendered copy, (a) a link to the primary source it came from and (b) the month it was verified. A CI guard fails the build when it does not.**

Four parts:

### 1. The source line goes in the copy, not only in a field

At the end of any section stating amounts:

```md
מקור: [משרד העלייה והקליטה — סל קליטה](https://www.gov.il/he/Departments/General/absorption_basket) · נבדק אוגוסט 2026.
```

In the copy, because the reader is the person who is harmed. A `sources: []` field satisfies the test and tells the reader nothing; a printed line lets them see that our figure is eleven months old and go check. This is the pattern PR #128 established and it is here promoted to a rule.

### 2. Primary sources win

gov.il, btl.gov.il, ministry PDFs, statute text, or the operating organization's own current page. Kol Zchut is acceptable corroboration and **loses on conflict** — TED-148 found gov.il and Kol Zchut disagreeing on an age band, and TED-157 found more of the same. Aggregator scholarship portals are never sufficient for an amount.

### 3. Unverifiable means removed, not softened

"כ-" and "עד" do not rescue a number nobody can source. An entry may keep its page and drop its figures, pointing the reader at the org's own page instead. A page that says "the amount is published here" is honest and useful; a page that guesses is neither.

### 4. Two CI guards, in `tests/content-claims.test.ts`

- **`RETIRED_CLAIMS`** — an explicit ban-list, in the shape TED-155 established for phone numbers. Once a claim has been investigated and found unsupported, it cannot return under a different slug or via a re-translation. Matched over raw file text, so all three locales are covered at once, with an exemption for paragraphs that name a false claim in order to warn readers about it.
- **`sourced money claims`** — walks every content registry, and for each entry that states a shekel amount, requires a source URL and a verification date in that same entry. Government-benefit registries additionally require the URL to be on a government domain.

## Why this mechanism and not a better-looking one

**Rejected: a typed `sources: SourceRef[]` on every entry interface.** The obvious answer, and worse. It means changing seven unrelated interfaces and touching every entry in each, produces a large diff that reviewers skim, and — decisively — it puts the provenance somewhere the reader never sees. `lastVerified` already demonstrated that a field with no enforcement and no reader is a field that gets filled in by habit. Where a registry _already_ has such a field, the guard accepts it; new ones are not worth the migration.

**Rejected: making the reviewer the check.** That is the status quo. It found nothing in three incidents.

**Rejected: waiting for the CMS.** Payload would give editorial workflow, but the content lives in `.server` modules today (ADR-020) and the fabrications are live now.

**Complementary, not now: a freshness autopilot** that re-fetches each recorded source URL on a schedule and opens an issue when a page changes or 404s. The guard above makes that possible by ensuring the URLs exist and are machine-readable. Worth its own issue once this convention is in place.

## Consequences

**Good**

- A shekel figure cannot enter the repo without a URL and a date next to it. The failure mode of TED-148 is now a red build rather than an accidental discovery.
- Staleness becomes legible to readers instead of invisible.
- The retired-claims list is cumulative institutional memory: each investigation permanently costs the next fabrication a route back in.
- Cheap for content PRs — one markdown line per section that states money.

**Costs, honestly**

- **Writing content gets slower.** That is the intended effect. Producing an entry now requires reaching a primary source, and gov.il 403s automated fetches, so this is real friction on every future content wave. The alternative is the current speed, at the current accuracy.
- **The grandfather list is a debt ledger.** Entries that predate this ADR and were not reachable in TED-157 are listed explicitly in the test. The list is visible in review and should only shrink. A content PR _can_ add to it — nothing prevents that but a reviewer noticing, and a reviewer noticing is precisely what failed before. Mitigation: the list carries a per-entry reason and the issue that will clear it, so an addition without one is conspicuous.
- **The guard checks provenance, not truth.** It cannot tell a real source from a plausible URL. It raises the floor from "nobody asked" to "someone had to name a source"; it does not replace the audit.
- **Regex over prose is approximate.** It will occasionally flag a non-claim (a fee in a worked example) and will miss claims phrased without a shekel sign. Both are tuned by adding cases, not by loosening the rule.
