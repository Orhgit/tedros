// TED-155 — CI guard: retired contact details must never re-enter published
// content. People in distress read these numbers off a page and dial them, so
// a stale one is a correctness bug, not a typo.
//
// TED-145 (PR #126) introduced this check scoped to its own two guides. Two
// stale Tebeka numbers were meanwhile live on ~15 other files, which a scoped
// test can never catch — so the mechanism is widened here to scan every content
// source under app/lib, every route under app/routes, and all three Paraglide
// message catalogs.
//
// To retire a number or domain: verify the replacement against the
// organization's own site, sweep it repo-wide, then add the old value below.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const REPO_ROOT = join(__dirname, "..");

/** Directories scanned in full, recursively. */
const SCAN_DIRS = [
  join(REPO_ROOT, "app", "lib"),
  join(REPO_ROOT, "app", "routes"),
  join(REPO_ROOT, "messages"),
];

const SCAN_EXTENSIONS = [".ts", ".tsx", ".json"];

/**
 * Retired contact details, with the source that retired them. `pattern` is
 * matched against raw file text, so it catches both the display form
 * ("03-5103538") and link forms ("tel:035103538") when written accordingly.
 */
const RETIRED: ReadonlyArray<{
  readonly label: string;
  readonly pattern: RegExp;
  readonly replacement: string;
  readonly source: string;
}> = [
  {
    label: "Tebeka phone 03-5103538",
    // Matches the dashed display form and the bare tel: digits.
    pattern: /03-?5103538/,
    replacement: "072-2424622",
    source: "tebeka.org.il/contact/ — number appears nowhere on their site",
  },
  {
    label: "Tebeka hotline 1-800-20-20-16",
    pattern: /1-800-20-20-16/,
    replacement: "072-2424622",
    source: "tebeka.org.il/contact/ — number appears nowhere on their site",
  },
  {
    label: "Tebeka email info@tebeka.org.il",
    pattern: /info@tebeka\.org\.il/,
    replacement: "general@tebeka.org.il",
    source: "tebeka.org.il/contact/ and site footer",
  },
  {
    label: "האגודה למען החייל domain awis.org.il",
    pattern: /awis\.org\.il/,
    replacement: "www.ufis.org.il",
    source: "TED-142 — TLS failure from three independent tools",
  },
  {
    label: "IDF domain aka.idf.il",
    pattern: /aka\.idf\.il/,
    replacement: "a verified live IDF/gov.il page",
    source: "TED-142 — reported unreachable",
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

describe("published contact details are the currently verified ones (TED-155)", () => {
  const files = SCAN_DIRS.flatMap(contentFilesUnder);

  it("scans a non-trivial number of content sources", () => {
    // Guards against a refactor silently emptying the scan set, which would
    // turn every assertion below into a vacuous pass.
    expect(files.length).toBeGreaterThan(50);
  });

  it.each(RETIRED)("no content references the retired $label", (retired) => {
    const offenders: string[] = [];
    for (const file of files) {
      if (retired.pattern.test(readFileSync(file, "utf8"))) {
        offenders.push(file.replace(`${REPO_ROOT}/`, ""));
      }
    }
    expect(
      offenders,
      `${retired.label} is retired — use ${retired.replacement} instead ` +
        `(${retired.source}). Found in:\n  ${offenders.join("\n  ")}`,
    ).toEqual([]);
  });
});
