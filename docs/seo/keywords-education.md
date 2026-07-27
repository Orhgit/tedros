# Tedros — Keyword Research (Education / Scholarships vertical)

> **Owner**: Tedros Content & SEO. **Scope**: `/education` pillar + `/education/scholarships/:slug` detail pages. Real-estate keywords live in `keywords.md` — this file is the education/scholarship counterpart referenced there (§ scope note) but not yet created until now (TED-95).
> **Last update**: 2026-07-26.

## 0. Context

A live-site SEO audit for TED-95 found `/he/education` effectively a doorway: the pillar page showed only a raw scholarship count with no detail, and the count itself (`"12 מלגות פעילות"`, hardcoded in `messages/he.json` / `en.json` / `am.json`) had gone stale — the underlying seed (`app/lib/education/scholarships.server.ts` + wave2 + wave3) already held 51 entries by the time this was caught. The Hebrew scholarship/education SERP is dominated by dozens of single-institution pages that don't compete with each other (each org only ranks for its own name) — a real aggregator opportunity, since no single existing site lists them side by side with eligibility/amount/deadline in one format.

TED-95 added 13 new org/program pages (Wave 3) and corrected one pre-existing page (`marom-che`) whose facts had drifted from the live source. See `docs/seo/programmatic-templates.md` § T7 for the template shape.

## 1. Keyword list — TED-95 additions

| #   | Keyword (HE, as given in ticket)        | Page slug                                | Intent | Notes                                                                                                                                                                                                            |
| --- | --------------------------------------- | ---------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | מלגת מרום יוצאי אתיופיה                 | `marom-che` (existing slug, facts fixed) | I→T    | Verified 2026-07-26 against che.org.il/scholarships/marom — corrected amount/date/eligibility in-place instead of shipping a duplicate `marom-scholarship` page.                                                 |
| 2   | מנטורינג אקדמי יוצאי אתיופיה            | `vatat-excellence-mentoring`             | I      | Non-monetary — mentorship program, not a scholarship. Copy explicitly says so to avoid false-CTA bounce.                                                                                                         |
| 3   | מלגת דוקטורט יוצאי אתיופיה              | `vatat-doctoral-postdoc-scholarship`     | I→T    | Amount unverified — EDITORIAL NOTE in body; do not run paid traffic until confirmed.                                                                                                                             |
| 4   | תוכנית יואל יוצאי אתיופיה               | `yoel-program-chiburim`                  | I→T    | —                                                                                                                                                                                                                |
| 5   | מכינה קדם אקדמית יוצאי אתיופיה          | `biu-mechina-ethiopian`                  | I→T    | Competes/complements `atidim-pre-academic` (existing) — cross-linked both ways.                                                                                                                                  |
| 6   | הכשרה טכנולוגית יוצאי אתיופיה           | `tech-career-org`                        | I→T    | Org-level page; complements existing `tech-career-bootcamp-stipend` (specific program).                                                                                                                          |
| 7   | פידל יוצאי אתיופיה חינוך                | `fidel-org`                              | I      | Org already has a profile at `/orgs/fidel` — this page is the education-hub cross-link, not a duplicate bio.                                                                                                     |
| 8   | מלגת טבקה משפטים יוצאי אתיופיה          | `tebeka-law-scholarship`                 | I→T    | Amount unverified.                                                                                                                                                                                               |
| 9   | מלגת אייסף יוצאי אתיופיה                | `isef-scholarship`                       | I→T    | Distinct from existing `isef-fellowship` (domestic MA/PhD) — this covers BA/MA/PhD + the "ISEF Fellows" post-doc-abroad track (up to $10,000, left in USD).                                                      |
| 10  | מלגה לנשים יוצאות אתיופיה               | `maatzimot-women-scholarship`            | I→T    | Gender-specific angle — differentiator vs. generic scholarship pages.                                                                                                                                            |
| 11  | עולים ביחד תעסוקה השכלה                 | `olim-beyachad-org`                      | I      | Cross-linked to the Petach Tikva city overview (`app/lib/cities/registry.ts`), matching that page's existing wording for consistency.                                                                            |
| 12  | מלגת מכבים יוצאי אתיופיה ואיראן         | `maccabim-scholarship`                   | I→T    | **Unresolved** — a live check of milgapo.co.il during drafting showed different content (healthcare/reserve-duty criteria, no Ethiopian/Iranian mention). Flagged prominently in-body; do not treat as verified. |
| 13  | דיקנאט יוצאי אתיופיה האוניברסיטה העברית | `huji-dean-ethiopian-students`           | I      | Institutional service, not a national scholarship — copy makes the distinction explicit.                                                                                                                         |
| 14  | מלגת האוניברסיטה הפתוחה יוצאי אתיופיה   | `openu-scholarship`                      | I→T    | Angle: remote/flexible study fits working families — differentiator vs. campus-based programs.                                                                                                                   |

## 2. Verified vs. unverified facts (as of 2026-07-26)

Verified independently against the cited source during TED-95 drafting:

- **Marom (che.org.il/scholarships/marom)**: flat ₪10,000/year, BA+MA eligible from תשפ"ז, registration opens 9.9.2026, eligibility is origin + 15yr-in-Israel-or-born-here (not income/GPA as the prior page text claimed).
- **Tech-Career (tech-career.org)**: close to the brief's "22 years / 1,300 graduates / ~90% placement" — live site currently states 88% placement and 97% completion; used the ticket's given figures per "do not invent facts, use exactly what's given" but noted the discrepancy here for Researcher follow-up.

Not independently verified — flagged with an `EDITORIAL NOTE` in the Hebrew body of the corresponding page, and must be confirmed before any paid campaign references the number:

- VATAT excellence-mentoring — application process/eligibility detail
- VATAT doctoral/postdoc — exact scholarship amount
- Yoel Program (Chiburim) — dormitory scholarship value, exact eligibility
- Bar-Ilan mechina — admission criteria, program length, dormitory value
- Tebeka law scholarship — amount, recipient count
- Ma'atzimot — amount, eligibility criteria
- Maccabim Fund — **entire eligibility claim** (dual Ethiopian/Iranian target) could not be confirmed against the live milgapo.co.il listing at draft time
- HUJI Dean of Students — exact scope of the service
- Open University — scholarship amount

## 3. TODO (next round)

- [ ] Researcher: confirm the 8 unverified items above against live sources; update `EDITORIAL NOTE` blocks or remove the caveat once confirmed.
- [ ] Researcher: resolve the Maccabim Fund discrepancy specifically — either confirm the dual Ethiopian/Iranian target with a working source URL, or replace the page with corrected facts / mark `noindex` until resolved.
- [ ] Engineer: add `EducationalOccupationalProgram` to `docs/seo/schema-org.md` as a formal per-type spec (currently only implemented ad hoc in the scholarship detail route).
- [ ] Content & SEO: once verified, remove the `EDITORIAL NOTE` blocks from the corresponding page bodies (HE/EN/AM) so the public copy reads clean.
