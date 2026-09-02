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
 * An optional phone-number separator: absent (the `tel:` form), an ASCII
 * hyphen, or any of the Unicode dashes — U+2011 in particular, which content
 * authors reach for to stop a number wrapping mid-digit.
 */
const SEP = "[-‐-―]?";

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
  // TED-159. Separators below are matched via SEP rather than a literal "-":
  // the Hebrew body of the domestic-violence topic wrote this number with
  // U+2011 non-breaking hyphens, so an ASCII-only pattern read clean while the
  // wrong number was live on the page.
  {
    label: "DV hotline 1-800-22-0000 (was published as WIZO's)",
    pattern: new RegExp(`1${SEP}800${SEP}22${SEP}0000`),
    replacement: "118 (welfare ministry) or *6724 (עמותת ל.א.)",
    source:
      "wizo.org.il — absent from their site; their exchange is 03-692xxxx. " +
      "Traceable only to ~2001 Haaretz listings as the ministry's old line.",
  },
  {
    label: "Na'amat phone 03-6922022",
    pattern: new RegExp(`03${SEP}6922022`),
    replacement: "*9201",
    source: "naamat.org.il — publishes *9201; 03-692xxxx is WIZO's exchange",
  },
  {
    label: "ITIM phone 1-700-500-507",
    pattern: new RegExp(`1${SEP}700${SEP}500${SEP}507`),
    replacement: "*8083",
    source: "itim.org.il — publishes *8083",
  },
  // TED-160. All of these were live on crisis pages. Every pattern below uses
  // SEP for the same reason TED-159 introduced it.
  {
    label: "WIZO shelter line 1-800-500-550",
    pattern: new RegExp(`1${SEP}800${SEP}500${SEP}550`),
    replacement: "118 (welfare ministry) or *6724 (עמותת ל.א.)",
    source: "wizo.org.il — absent from their site; WIZO publishes no DV line",
  },
  {
    label: "WIZO phone 03-5240479",
    pattern: new RegExp(`03${SEP}5240479`),
    replacement: "118 or *6724",
    source: "wizo.org.il — absent from their site",
  },
  {
    label: "WIZO hotline 1900",
    // Bare four-digit code: anchored to a non-digit on each side so it cannot
    // match inside a year, a price, or a longer number.
    pattern: /(?<![\d*-])1900(?![\d-])/,
    replacement: "118 or *6724",
    source: "wizo.org.il — absent from their site; no such WIZO hotline",
  },
  {
    label: "WIZO Haifa 04-8562222",
    pattern: new RegExp(`04${SEP}8562222`),
    replacement: "118 or *6724",
    source: "wizo.org.il — absent from their site",
  },
  {
    label: "Na'amat shelter line 1-800-505-360",
    pattern: new RegExp(`1${SEP}800${SEP}505${SEP}360`),
    replacement: "*9201",
    source: "naamat.org.il — publishes *9201 and nothing else for women",
  },
  {
    label: "Na'amat phone 09-866-2222",
    pattern: new RegExp(`09${SEP}866${SEP}2222`),
    replacement: "*9201",
    source: "naamat.org.il — absent from their site",
  },
  {
    label: "ELEM phone 03-613-9090",
    pattern: new RegExp(`03${SEP}613${SEP}9090`),
    replacement: "03-7686666",
    source: "elem.org.il/contact — publishes 03-7686666",
  },
  {
    label: "Tebeka phone 03-629-4040",
    pattern: new RegExp(`03${SEP}629${SEP}4040`),
    replacement: "072-2424622",
    source: "tebeka.org.il — publishes 072-2424622",
  },
  {
    label: "ACRI phone 03-6936893",
    pattern: new RegExp(`03${SEP}6936893`),
    replacement: "03-5608185",
    source: "acri.org.il — publishes 03-5608185 (Tel Aviv) and 04-8526333",
  },
  {
    label: "105 published as the domestic-violence hotline",
    // 105 is the police child-online-protection centre. The bare number is far
    // too common to ban outright, so this targets the co-occurrence that made
    // it wrong: the digits sitting in the same line as a DV/hotline phrase.
    pattern:
      /(?<![\d*-])105(?![\d-])[^\n]*(אלימות במשפחה|domestic violence|የቤት ውስጥ አመፅ)|(אלימות במשפחה|domestic violence|የቤት ውስጥ አመፅ)[^\n]*(?<![\d*-])105(?![\d-])/,
    replacement: "118 — the welfare ministry's national DV line",
    source:
      "police.gov.il/join/unit-105 — 105 is the National Centre for the " +
      "Protection of Children Online, unrelated to domestic violence",
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
