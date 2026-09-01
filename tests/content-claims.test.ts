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

const RETIRED_CLAIMS: readonly RetiredClaim[] = [];

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
  /(אינם מופיעים|אינו מופיע|לא קיים|לא קיימת|אין תוכנית|do not appear|does not appear|no such|not a real)/;

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
const VERIFIED_RE =
  /(נבדק[ווּ]?[^"\n]{0,40}20\d\d|נכון ל[^"\n]{0,30}20\d\d|verified[^"\n]{0,40}20\d\d|checked[^"\n]{0,40}20\d\d|"lastVerified":"20\d\d-\d\d-\d\d")/;

/**
 * Entries that state money and predate ADR-021, which TED-157 could not
 * resolve against a primary source in the time it had. This list is a debt
 * ledger: it may shrink, and an addition to it needs a reason and an issue.
 * See the PR ledger for TED-157 for what was checked and what was not.
 */
const GRANDFATHERED: ReadonlyArray<{ readonly id: string; readonly why: string }> = [];

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
      if (!VERIFIED_RE.test(blob)) {
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

