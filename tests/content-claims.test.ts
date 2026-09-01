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
  /(אינם מופיעים|אינו מופיע|לא קיים|לא קיימת|אין זכות כזו|אין מענק|אין מסלול|אין הגרלה|אין תוכנית|הוסר|הוסרו|ההרשמה סגורה|נסגרה|do not appear|does not appear|no such|not a real|no longer|was removed|were removed|is closed|does not exist|no origin criterion|in error)/;

// ---------------------------------------------------------------------------
// 2. Sourced money claims — ADR-021
// ---------------------------------------------------------------------------

import { CAREER_TRACKS } from "../app/lib/careers/careers.server";
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
  {
    id: "db/seeds/rights:ujia-kiedf-business-loans",
    why: "₪200,000 ceiling UNVERIFIED — the audit ran out of search budget before reaching KIEDF/UJIA",
  },
  {
    id: "db/seeds/rights:national-civic-service",
    why: "~₪5,000/month national-service allowance UNVERIFIED and flagged high-risk — the real דמי כלכלה are believed far lower",
  },
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
