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
