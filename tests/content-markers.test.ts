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
