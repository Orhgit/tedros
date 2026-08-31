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

---

# TED-145 — Parents vs. the school system

> **Owner**: Tedros Content & SEO. **Scope**: the special-education eligibility-committee right (`/rights/special-education-eligibility-committee`, with an objection wizard) plus two guides — `/education/registration-discrimination` and `/education/parent-rights`.
> **Added**: 2026-08-31.

## 4. Context and search angle

The Knesset Research Center's own documents describe the gap this content addresses: in 2010 it found 42 institutions where Ethiopian-Israeli pupils exceeded 40% of the roll (11 above 70%), and in 2022 that 17.2% of Ethiopian-Israeli pupils were entitled to special-education services against 12% system-wide, with the share integrated into mainstream education falling considerably over the preceding four years. Nothing parent-facing exists in plain Hebrew, let alone Amharic.

The strongest SEO asset here is a **naming gap**. Amendment 11 (2018) renamed the committees — ועדת השמה became ועדת זכאות ואפיון, and ערר became השגה — but parents, and the school staff phoning them, still say "ועדת השמה". Search demand sits on the dead term while every official page uses the live one. So the wizard page's H1 leads with the old name in quotes and resolves it in the first line. That is a deliberate bridge, not sloppiness, and the test suite pins both names into the body so a future edit cannot "tidy" the old one away.

Second angle: **deadline queries**. "כמה זמן יש להגיש השגה", "21 יום ועדת זכאות ואפיון", "7 ימים ערר רישום" are high-intent and currently answered mainly by law-firm lead-gen pages. Our answer is free, cites the section number, and ends in a wizard rather than a contact form.

## 5. Keyword list — TED-145

| #   | Keyword (HE)                       | Page                                      | Intent | Notes                                                                                                       |
| --- | ---------------------------------- | ----------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| 1   | ועדת השמה                          | `special-education-eligibility-committee` | I      | The dead term carrying the demand. H1 uses it in quotes; body resolves it to ועדת זכאות ואפיון immediately. |
| 2   | ועדת זכאות ואפיון                  | same                                      | I      | The live official term — head term for the page.                                                            |
| 3   | השגה על החלטת ועדת זכאות ואפיון    | same                                      | I→T    | Transactional tail; lands on the wizard.                                                                    |
| 4   | ועדת ערר חינוך מיוחד               | same                                      | I      | Also renamed (→ ועדת השגה). Body names both so the query resolves here.                                     |
| 5   | 21 יום השגה חינוך מיוחד            | same                                      | I→T    | Deadline query. §13(א).                                                                                     |
| 6   | זכות הורים לבחור מסגרת חינוך מיוחד | same                                      | I      | The core of Amendment 11 — §7(ב). Most parents do not know they hold the choice.                            |
| 7   | ועדת שיבוץ חינוך מיוחד             | same                                      | I      | Disambiguated on-page: parents are not invited to it, so preferences must be stated earlier.                |
| 8   | הפניה לוועדה בגלל עברית            | same                                      | I      | Long-tail, high-value. חוזר 0287 bars referral on absorption/language grounds alone.                        |
| 9   | מתורגמן לאמהרית ועדת חינוך מיוחד   | same                                      | I      | Community-specific; the accessibility duty is real and stronger than parents assume.                        |
| 10  | לא קיבלו את הילד שלי לבית ספר      | `registration-discrimination`             | I→T    | The natural-language form of the problem, not the legal term.                                               |
| 11  | אפליה ברישום לבית ספר              | same                                      | I      | Head term.                                                                                                  |
| 12  | חוק זכויות התלמיד סעיף 5           | same                                      | I      | Statute query; we quote the section verbatim.                                                               |
| 13  | בית ספר מוכר שאינו רשמי אפליה      | same                                      | I      | §16(ב) — the misconception that recognised schools may choose freely.                                       |
| 14  | ערר על שיבוץ לבית ספר              | same                                      | I→T    | Deadline query — תקנה 30 / תקנה 11, both 7 days.                                                            |
| 15  | תלונה על גזענות בבית ספר           | same                                      | T      | Routes to the anti-racism unit, whose complaint form exists **in Amharic**.                                 |
| 16  | אסיפת הורים ראשונה                 | `parent-rights`                           | I      | Seasonal head term (Aug–Sep).                                                                               |
| 17  | תשלומי הורים מה חובה               | same                                      | I      | Only personal-accident insurance is compulsory — the single most money-saving fact on the site.             |
| 18  | בית ספר לא נותן תעודה בגלל חוב     | same                                      | I→T    | 0302 §11.2 — expressly prohibited, matriculation certificates included.                                     |
| 19  | מלגה לתלמיד שההורים לא יכולים לשלם | same                                      | I→T    | The school scholarship committee (0406). Publicity is mandatory and almost never happens.                   |
| 20  | השעיה מבית ספר זכויות              | same                                      | I      | 0470 (in force 2.2.2026, replacing 0394).                                                                   |
| 21  | הרחקה לצמיתות מבית ספר ערר         | same                                      | I→T    | 14-day appeal; the pupil is not expelled until it is decided.                                               |
| 22  | ועד הורים כיתה חוקים               | same                                      | I      | 0423 (1.9.2024). Note מועצת הורים was abolished — do not target that term.                                  |

Amharic and English mirrors ship on every page; each page also carries a **full Amharic summary rendered in all three locales**, since older community members read the Amharic block even on the Hebrew URL.

## 6. Verified vs. excluded (as of 2026-08-31)

Every statutory claim was read from the statute or circular text itself, not from a search snippet. Sources are listed on-page. Notable verifications: חוק חינוך מיוחד §§5–13 and 20ד (Nevo consolidated text); חוק זכויות התלמיד §§4, 5, 6, 7, 10, 11, 14, 16(ב) (ספר החוקים); תקנה 3(א)(8) לתקנות מוסדות מוכרים; §15 לחוק פיקוח על בתי ספר; תקנות רישום 30 and 7ד; תקנות העברה 8(ג) and 11; and חוזרי מנכ"ל 0423, 0302 + הודעה 0379, 0406, 0470, 0416, 0334, 0395, 0287.

**Excluded as unverifiable — do not add without a primary source:**

- The holding, panel, date, school names and number of children in **בג"ץ 7426/08** (טבקה נ' שרת החינוך ועיריית פתח-תקווה). The Supreme Court document server was unreachable across repeated attempts and every account traced to secondary sources. The docket is named as a fact of litigation; nothing is asserted about what was decided. A test asserts the page does not say what the court held.
- Any claim that discrimination is a **עבירת משמעת** for a state employee under חוק זכויות התלמיד. No such provision exists; the sanction in the law is criminal (§5(ב)).
- Whether **מוסדות פטור** are bound by חוק זכויות התלמיד. §16 addresses only רשמי and מוכר שאינו רשמי.
- A **general** right to an interpreter at ordinary parents' meetings. The duty exists in two defined contexts only (0287 committees, 0416 expulsions); the page says exactly that and a test pins the hedge.
- **ENP mediator coverage** (schools, cities, mediators). ENP does not publish it; the page says the programme does not operate everywhere.
- Any **משרד החינוך "מתווכים חינוכיים"** programme for the community — current existence unconfirmed.
- The full **תשפ"ז payment table** and the "קו פתוח לתלמידים" numbers. The one compulsory figure (₪69) is stated and the official annual table linked instead.
- The **2020 booklet's disability × function-level choice table** — published as a transitional arrangement for תש"ף/תשפ"א.

**Correction shipped:** Tebeka's phone is **072-2424622** per their own contact page. The number used across the site's existing Voice pages (03-5103538) does not appear anywhere on tebeka.org.il. TED-145 uses the verified number and a test blocks the stale one from re-entering these pages.

## 7. TODO (next round)

- [ ] **Content & SEO (or Researcher): sweep 03-5103538 → 072-2424622** across `app/lib/voice/*.server.ts`, `app/routes/$lang.voice._index.tsx` and the expungement seed entry. Out of scope for TED-145, which touched only its own pages, but the site is now inconsistent and the old number is wrong on four files.
- [ ] Researcher: open בג"ץ 7426/08 in a browser and confirm the holding, so the Petah Tikva paragraph can be expanded from "the matter was litigated" to what was actually decided.
- [ ] Content & SEO: annual maintenance — הודעה 0379 is reissued each August, and הוראת שעה 0302 expires 31.8.2027. Re-verify the ₪69 figure and the scholarship ranges then.
- [ ] Engineer: consider enriching the eligibility-committee city cells (scoped `community-cities`) with per-authority contact detail — the ועדת שיבוץ genuinely differs per authority, which would make those cells substantive rather than templated.
