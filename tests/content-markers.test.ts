// TED-121 — CI guard: internal review markers must never reach published
// content. An "EDITORIAL NOTE" blockquote leaked to production on a
// scholarship page (visible to every visitor, admitting the info was
// unverified). This scans every content/data source under app/lib.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CONTENT_ROOT = join(__dirname, "..", "app", "lib");

// Markers that mean "a human still needs to look at this" — they belong in
// Linear or code comments outside content bodies, never in rendered markdown.
const FORBIDDEN = [/EDITORIAL NOTE/i, /\bDO NOT PUBLISH\b/i, /אין לפרסם עמוד זה/];

function tsFilesUnder(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...tsFilesUnder(full));
    else if (full.endsWith(".ts") && !full.endsWith(".test.ts")) out.push(full);
  }
  return out;
}

describe("published content carries no internal review markers (TED-121)", () => {
  it("app/lib sources are free of editorial markers", () => {
    const offenders: string[] = [];
    for (const file of tsFilesUnder(CONTENT_ROOT)) {
      const src = readFileSync(file, "utf8");
      for (const marker of FORBIDDEN) {
        if (marker.test(src)) {
          offenders.push(`${file.replace(CONTENT_ROOT, "app/lib")} matches ${marker}`);
        }
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});

// TED-169 — a markdown table row that is not attached to a `|---|` separator
// renders as a raw pipe-soup paragraph instead of a table. The one that
// shipped (a `-` typed where a `|` belonged, mid-table, in the
// `foreign-worker-rights-undocumented` body) also used to hang the renderer;
// `renderMarkdown` now always makes progress, so this guard is about the
// content reading correctly rather than about the crash.
describe("markdown tables in content are well formed (TED-169)", () => {
  const SEPARATOR = /^\|?[\s:|-]+\|?$/;
  // A table row: starts and ends with `|` and has at least three pipes. The
  // pipe-count floor keeps multi-line TypeScript union types (`| "a"`) out —
  // they start with `|` but never end with one.
  const isRow = (line: string) =>
    line.startsWith("|") && line.endsWith("|") && (line.match(/\|/g) ?? []).length >= 3;

  it("every table row belongs to a table with a separator", () => {
    const offenders: string[] = [];
    for (const file of tsFilesUnder(CONTENT_ROOT)) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      let inTable = false;
      for (let i = 0; i < lines.length; i++) {
        const line = (lines[i] ?? "").trim();
        if (!isRow(line)) {
          inTable = false;
          continue;
        }
        // A row opens a table when the next line is the `|---|` separator,
        // and otherwise must be continuing one already open.
        if (SEPARATOR.test((lines[i + 1] ?? "").trim())) {
          inTable = true;
          i += 1;
          continue;
        }
        if (!inTable) {
          offenders.push(
            `${file.replace(CONTENT_ROOT, "app/lib")}:${i + 1}: orphan table row: ${line}`,
          );
        }
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
