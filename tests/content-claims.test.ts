// TED-157 — CI guard for factual claims in published content.
//
// Three separate fabrication patterns surfaced within one week: eight
// scholarship entries naming organizations that do not exist (TED-152), two
// retired phone numbers on 21 files (TED-155), and a rights page advertising a
// "₪2,500 cultural-adjustment grant unique to immigrants from Africa" that
// exists in no source (TED-148). All three were found by accident, while
// working on something else.
//
// This file is the systematic version. It has two halves:
//
//   1. RETIRED_CLAIMS — an explicit ban-list, in the shape TED-155 established
//      for phone numbers. Once a claim has been investigated and found
//      unsupported, it may not come back under a different slug or a
//      re-translation. Matched over raw file text, so it catches he/en/am at
//      once.
//   2. The sourcing convention of ADR-021 — every content entry that states a
//      shekel amount must also carry a source URL and a verification date, so
//      that a reader (and the next content wave) can see where the number came
//      from and how old it is.
//
// See docs/adr/021-sourced-claims.md for the reasoning and for how to add
// content that satisfies the second rule.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const REPO_ROOT = join(__dirname, "..");

// ---------------------------------------------------------------------------
// 1. Retired claims — never publish these again
// ---------------------------------------------------------------------------

const SCAN_DIRS = [
  join(REPO_ROOT, "app", "lib"),
  join(REPO_ROOT, "app", "routes"),
  join(REPO_ROOT, "messages"),
];

const SCAN_EXTENSIONS = [".ts", ".tsx", ".json"];

/**
 * A claim retired by investigation, with the reason it was retired.
 *
 * `pattern` is matched against raw file text. `allowNear` exempts a match that
 * appears within the same paragraph as a debunking phrase — corrected copy
 * sometimes has to name a false claim in order to warn readers about it, which
 * a bare substring ban would flag.
 */
interface RetiredClaim {
  readonly label: string;
  readonly pattern: RegExp;
  readonly why: string;
}

const RETIRED_CLAIMS: readonly RetiredClaim[] = [
  {
    label: "the 150% enhanced discharge grant for Ethiopian-Israeli soldiers",
    pattern: /מענק שחרור מוגדל|150% ממענק הבסיס|enhanced discharge grant/,
    why: "the MOD's discharged-soldiers fund lists its special-entitlement populations and country of origin is not among them; the form number given for it (ב.ל.87) is a National Insurance prefix on a Ministry of Defence payment",
  },
  {
    label: "form ב.ל.87 for a discharge grant",
    pattern: /ב\.ל\.87|B\.L\.87/,
    why: "no such form; discharge grants are not paid by ביטוח לאומי",
  },
  {
    label: "a ₪12,000 vocational-training voucher",
    pattern:
      /12,000[^\n]{0,30}(שוברי|שובר|הכשרה)|vocational training vouchers worth up to ₪12,000/,
    why: "the ministry's voucher covers up to 80% of the course, capped at ₪7,000",
  },
  {
    label: "the fabricated scholarship domains",
    pattern:
      /brachafund\.org\.il|shalemfund\.org\.il|beginheritage\.co\.il|kkl-jnf\.org\.il/,
    why: "all four are NXDOMAIN — never registered, not merely moved",
  },
  {
    label: "placeholder phone numbers",
    pattern: /1-800-XXX-XXX|0\d-XXX-XXXX/,
    why: "two placeholders shipped as live instructions, one of them a youth crisis line",
  },
  {
    label: "dead organisation domains",
    pattern:
      /fbn\.org\.il|tech-career\.org\.il|atidbamidbar\.org\.il|bina-na\.org|scaleup-velocity\.org|hila-equal-education\.org\.il|acharai\.org\.il|merom\.org\.il/,
    why: "none resolve; the live addresses are friendsbynature.org, tech-career.org, bamidbar.org, binacf.org",
  },
  {
    label: "a 90% mortgage financing track",
    pattern: /90% מימון|עד 90% ערך הנכס/,
    why: "Bank of Israel caps a first-home buyer at 75%; no 90% track was found",
  },
  {
    label: "an open lottery for the ₪600,000 community mortgage",
    pattern: /הגרלה שנתית|annual lottery/,
    why: "registration closed after the 2017 round; both ministry programme pages now 404",
  },

  // ── TED-158 ───────────────────────────────────────────────────────────────

  {
    label: "phantom statutes cited as the basis of a right",
    pattern: /המעוקין|חוק שוויון זכויות \(2000\)|Equal Rights Act \(2000\)/,
    why: 'no statute of either name exists. The whistleblower law is חוק הגנה על עובדים ... התשנ"ז-1997; the 2000 act is חוק איסור הפליה במוצרים ובשירותים',
  },
  {
    label: '"צו 50" as the basis of civil-service affirmative representation',
    pattern:
      /צו 50 מחייב|Order 50 requires|תיבת "ייצוג הולם \/ צו 50"|Affirmative representation \/ Order 50/,
    why: "no instrument of that name. The basis is ס' 15א לחוק שירות המדינה (מינויים), the test is 'כישורים דומים' — not 'two equal candidates' — and the preference is discretionary. NOTE: the bare term 'צו 50' still appears in careers/, news/ and stories/ and needs its own sweep — this pattern bans the false legal proposition, not the term",
  },
  {
    label: "the 1982 criminal-procedure law as the source of stop powers",
    pattern: /חוק סדר הדין הפלילי \(1982\)|Code of Criminal Procedure \(1982\)/,
    why: "עיכוב is governed by פרק ג' (ss.66-75) of the 1996 arrests law. The 1982 citation contradicted our own street-stop guide",
  },
  {
    label: "עלבון עובד ציבור offered to a racism complainant as a remedy",
    pattern: /עלבון עובד ציבור|insulting a public official/,
    why: "s.288 protects the public servant, not the complainant. It is among the offences people in this community are charged with in these encounters — it appears in the schedule of the 2024 records-deletion law for that reason",
  },
  {
    label: "the phantom Legal Aid and defunct-NGO contact routes",
    pattern: /1-700-704-555|yedid\.org\.il|m-z\.co\.il|amona\.co\.il/,
    why: "1-700-704-555 returns zero hits anywhere (Legal Aid is *6405); Yedid closed in 2020 and its domain is now a commercial tutoring marketplace; m-z.co.il is a bookkeeping firm, not the Press Council; amona.co.il is NXDOMAIN",
  },
  {
    label: "programmes that do not exist",
    pattern: /PRESEN|codeOved|JDC-Ashalim Strong Families/,
    why: "PRESEN and codeOved have no operator at all; 'JDC-Ashalim Strong Families' is not a JDC programme (their work is PACT); Scale-Up Velocity is real but is a training body, not an investor — it runs no seed-funding bootcamp",
  },
  // NOT YET BANNABLE — "ENP Tech-Career". Tech-Career is an independent
  // עמותה; ENP works with ages 13-18 and runs no bootcamp or employment
  // programme, and the "78% placement (ENP 2024 report)" cited for it came
  // from a report that does not exist. Corrected in careers/faqs.server here,
  // but the conflation also sits in careers.server, comparisons, news,
  // professionals and stories.server — and stories.server is frozen pending
  // the owner's persona-labelling decision, so a ban added now would fail the
  // build on a file nobody is allowed to touch. Add this pattern in the PR
  // that clears the remaining five files.
  {
    label: "the 28-week maternity leave and the ethnic daycare subsidy",
    pattern:
      /28 שבועות|28 weeks[^\n]{0,30}(leave|לידה)|סבסוד צהרון[^\n]{0,20}80%|80% of cost for community members/,
    why: "the TED-148 exclusivity-fabrication pattern. Statutory leave is 26 weeks (15 paid) with no 28-week or community-specific variant; the daycare subsidy is means-tested and has no origin criterion",
  },
];

function contentFilesUnder(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...contentFilesUnder(full));
    } else if (
      SCAN_EXTENSIONS.some((ext) => full.endsWith(ext)) &&
      !full.endsWith(".test.ts") &&
      !full.endsWith(".test.tsx")
    ) {
      out.push(full);
    }
  }
  return out;
}

describe("retired claims stay retired (TED-157)", () => {
  const files = SCAN_DIRS.flatMap(contentFilesUnder);

  it("scans a non-trivial number of content sources", () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it.each(RETIRED_CLAIMS)("no content republishes $label", (claim) => {
    const offenders: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      if (!claim.pattern.test(src)) continue;
      // Allow the claim to be named inside a paragraph that debunks it.
      const paragraphs = src.split(/\n\s*\n/);
      const asserted = paragraphs.filter(
        (p) => claim.pattern.test(p) && !DEBUNK_RE.test(p),
      );
      if (asserted.length > 0) offenders.push(file.replace(`${REPO_ROOT}/`, ""));
    }
    expect(
      offenders,
      `${claim.label} was retired: ${claim.why}\nStill asserted in:\n  ` +
        offenders.join("\n  "),
    ).toEqual([]);
  });
});

/** Phrases that mark a paragraph as warning about a claim rather than making it. */
const DEBUNK_RE =
  /(אינם מופיעים|אינו מופיע|אינה קיימת|אינו קיים|לא קיים|לא קיימת|אין דבר כזה|אין זכות כזו|אין מענק|אין מסלול|אין הגרלה|אין תוכנית|אינה מפרסמת|אינה זכות עדתית|שום קריטריון של מוצא|קבע בעבר|הופיע כאן בעבר|נכתב כאן בעבר|לא נמצא|לא נמצאה|הוסר|הוסרו|הוסרה|שגוי|טעות|ההרשמה סגורה|נסגרה|do not appear|does not appear|no such|not a real|no longer|was removed|were removed|is closed|does not exist|do not exist|there is no|no evidence|no origin criterion|in error|is wrong|was wrong|publishes no|deliberately excluded|NXDOMAIN|\bremoved\b|\bretired\b|previously (said|stated|listed|described))/i;

// ---------------------------------------------------------------------------
// 2. Sourced money claims — ADR-021
// ---------------------------------------------------------------------------

import { CAREER_TRACKS } from "../app/lib/careers/careers.server";
import { FAQS } from "../app/lib/careers/faqs.server";
import { COMPARISONS } from "../app/lib/comparisons/comparisons.server";
import { PRIORITY_RIGHTS } from "../app/lib/db/seeds/rights";
import { ALL_SCHOLARSHIPS } from "../app/lib/education/scholarships.server";
import { FAMILY_TOPICS } from "../app/lib/family/topics.server";
import { PROGRAMS } from "../app/lib/programs/programs.server";

/**
 * Registries in scope for the sourcing rule. These are the ones that tell a
 * reader what they are entitled to and how much it is worth — the pages where
 * a wrong number sends someone to a counter to be refused.
 *
 * Deliberately NOT in scope: `news/articles.server` (dated reporting, which
 * carries its own per-article source fields), `statistics/topics.server`
 * (CBS/ENP figures cited inline), and `professionals` (market fee ranges,
 * which are estimates and are labelled as such). Extending to those is its
 * own issue.
 */
const CLAIM_REGISTRIES: ReadonlyArray<{
  readonly label: string;
  readonly entries: readonly unknown[];
  /** Government-benefit content: the source must be a government domain. */
  readonly requireGovSource: boolean;
}> = [
  { label: "db/seeds/rights", entries: PRIORITY_RIGHTS, requireGovSource: true },
  {
    label: "education/scholarships.server (all waves)",
    entries: ALL_SCHOLARSHIPS,
    requireGovSource: false,
  },
  { label: "programs/programs.server", entries: PROGRAMS, requireGovSource: false },
  {
    label: "comparisons/comparisons.server",
    entries: COMPARISONS,
    requireGovSource: false,
  },
  { label: "careers/careers.server", entries: CAREER_TRACKS, requireGovSource: false },
  { label: "family/topics.server", entries: FAMILY_TOPICS, requireGovSource: false },
  // TED-158: this registry was missing from the list, so the ADR-021
  // sourcing rule had never applied to it — while the route emits FAQPage
  // JSON-LD, i.e. asks Google to serve its numbers as answers. It entered
  // the TED-158 audit with ~25 percentage claims, a dozen shekel figures
  // and zero URLs. Adding it here is what keeps that from recurring.
  { label: "careers/faqs.server", entries: FAQS, requireGovSource: false },
];

/** A shekel amount: "₪1,250", "1,250 ₪", '600,000 ש"ח'. */
const MONEY_RE = /(₪\s*\d|\d[\d,.]*\s*₪|\d[\d,.]*\s*ש"ח)/;

/** Any absolute URL. */
const URL_RE = /https?:\/\/[^\s"'`)]+/g;

/** Government / statutory primary sources. */
const GOV_HOST_RE = /(^|\.)((gov|btl|knesset|court|mod)\.il|nevo\.co\.il)$/;

/**
 * A verification date the reader can see: "נבדק אוגוסט 2026", "verified August
 * 2026", "נכון לספטמבר 2026", or a `lastVerified: "2026-08-30"` field on
 * registries that already have one.
 */
const VERIFIED_MARKER_RE = /(נבדק|נכון ל|בתוקף מ|verified|checked|lastVerified)/;
const YEAR_RE = /20\d\d/;

/**
 * Entries that state money and predate ADR-021, which TED-157 could not
 * resolve against a primary source in the time it had. This list is a debt
 * ledger: it may shrink, and an addition to it needs a reason and an issue.
 * See the PR ledger for TED-157 for what was checked and what was not.
 */
const GRANDFATHERED: ReadonlyArray<{ readonly id: string; readonly why: string }> = [
  {
    id: "db/seeds/rights:youth-mentorship",
    why: "PERACH stipend corrected to the published ₪7,000; the entry's other programmes are NGO-run, so the source is an org page, not gov.il",
  },
  // TED-158 CLEARED: ujia-kiedf-business-loans and national-civic-service.
  // The loan ceiling was removed (neither UJIA nor KIEDF publishes one, and
  // our two files disagreed: ₪200,000 vs ₪150,000). The national-service
  // allowance was ~5x overstated — the real subsistence payment is ₪810/month
  // since March 2025, plus a tiered maintenance allowance, totalling roughly
  // ₪800-2,100. Both entries now state their figures with sources.
  {
    id: "db/seeds/rights:hesegim-scholarships",
    why: "stale: 'הישגים' is a grades 7-12 tutoring programme, not a scholarship. Entry needs rewriting or deleting, like the comparison already removed",
  },
  {
    id: "db/seeds/rights:chronic-disease-prevention",
    why: "health-fund co-pays; the corrected 31-42 ₪ figures went into the comparison entry, not here",
  },
  {
    id: "db/seeds/rights:summer-camps-subsidy",
    why: "₪400-800/week and the 80% subsidy UNVERIFIED — no programme granting the subsidy was confirmed",
  },
  {
    id: "db/seeds/rights:employment-discrimination-rights",
    why: "₪120,000 ceiling VERIFIED against the statute, but it is index-linked and the published 2026 figure was not located, so no date is stated",
  },
  {
    id: "db/seeds/rights:social-security-new-immigrants",
    why: "child allowance, birth grant and income support corrected here; the entry's remaining figures are unaudited",
  },
  {
    id: "db/seeds/rights:unemployment-benefit-guide",
    why: "caps corrected to the 2026 figures; the entry's eligibility conditions are unaudited",
  },
  {
    id: "db/seeds/rights:rent-assistance-new-olim",
    why: "the inflated table was removed and the structure corrected, but the ministry's current rate table itself was not reachable",
  },
  {
    id: "db/seeds/rights:army-discharge-benefits-ethiopians",
    why: "separate entry from the veterans guide fixed here; its figures are unaudited",
  },
  {
    id: "db/seeds/rights:free-mortgage-counselling",
    why: "unaudited",
  },
  {
    id: "db/seeds/rights:severance-pay-guide",
    why: "the calculation rule is VERIFIED; the worked example carries no source line yet",
  },
  {
    id: "db/seeds/rights:unconditional-scholarships-7-sources",
    why: "rewritten as a warning page — it names the retired amounts in order to debunk them",
  },
  {
    id: "db/seeds/rights:yozmim-esek-business-course",
    why: "₪728 course fee re-verified under TED-148 against the SBA's own page, which is not a gov.il domain",
  },
  {
    id: "comparisons/comparisons.server:tene-briut-vs-clalit",
    why: "co-pays corrected to the 2026 published schedule; the source URLs live in the health funds' pages, not yet cited in the entry",
  },
  {
    id: "comparisons/comparisons.server:klita-basket-vs-aliyah-grant",
    why: "side B corrected against נוהל 4.063 here; the procedure URL is not yet inline in the entry",
  },
  {
    id: "comparisons/comparisons.server:community-mortgage-vs-first-home-grant",
    why: "the ₪84,000 purchase-tax saving was removed and the Tax Authority instruction cited in the body; the criteria cells still carry bare figures",
  },
  {
    id: "family/topics.server:elderly",
    why: "קצבת אזרח ותיק figures and the retirement-age band are both wrong and UNAUDITED — reported in the remaining-work map",
  },
  {
    id: "careers/careers.server:tech",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:healthcare",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:education",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:public-sector",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:entrepreneurship",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:finance",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:social-work",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:law",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:trades",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
  {
    id: "careers/careers.server:retail-services",
    why: "salary ranges, entirely unaudited — careers/ is the largest unaudited surface left",
  },
];

function entryId(entry: unknown, index: number): string {
  const e = entry as { slug?: string | { he?: string }; title?: { he?: string } };
  if (typeof e?.slug === "string") return e.slug;
  if (e?.slug && typeof e.slug === "object" && e.slug.he) return e.slug.he;
  if (e?.title?.he) return e.title.he;
  return `#${index}`;
}

describe("money claims carry a source and a verification date (ADR-021)", () => {
  const grandfathered = new Set(GRANDFATHERED.map((g) => g.id));

  it("scans a non-trivial number of entries", () => {
    const total = CLAIM_REGISTRIES.reduce((n, r) => n + r.entries.length, 0);
    expect(total).toBeGreaterThan(100);
  });

  it.each(CLAIM_REGISTRIES)("$label", ({ label, entries, requireGovSource }) => {
    const offenders: string[] = [];

    entries.forEach((entry, index) => {
      const id = `${label}:${entryId(entry, index)}`;
      if (grandfathered.has(id)) return;

      const blob = JSON.stringify(entry);
      if (!MONEY_RE.test(blob)) return;

      const urls = blob.match(URL_RE) ?? [];
      if (urls.length === 0) {
        offenders.push(`${id} — states an amount with no source URL`);
        return;
      }
      if (requireGovSource) {
        const hasGov = urls.some((u) => {
          try {
            return GOV_HOST_RE.test(new URL(u).hostname);
          } catch {
            return false;
          }
        });
        if (!hasGov) {
          offenders.push(`${id} — states an amount with no government source URL`);
          return;
        }
      }
      if (!(VERIFIED_MARKER_RE.test(blob) && YEAR_RE.test(blob))) {
        offenders.push(`${id} — states an amount with no visible verification date`);
      }
    });

    expect(
      offenders,
      `ADR-021: every entry stating a shekel amount must print its source and ` +
        `the month it was verified.\n  ${offenders.join("\n  ")}`,
    ).toEqual([]);
  });
});
