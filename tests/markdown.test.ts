import { describe, expect, it } from "vitest";

import { renderMarkdown } from "../app/lib/utils/markdown";

describe("renderMarkdown", () => {
  it("renders h2 and h3 headings", () => {
    const out = renderMarkdown("## למי מיועד?\n### תנאי משנה");
    expect(out).toContain("<h2");
    expect(out).toContain("למי מיועד?");
    expect(out).toContain("<h3");
    expect(out).toContain("תנאי משנה");
  });

  it("renders unordered lists", () => {
    const out = renderMarkdown("- אחד\n- שניים\n- שלושה");
    expect(out).toContain("<ul");
    expect(out).toContain("<li");
    expect(out.match(/<li/g)?.length).toBe(3);
  });

  it("renders ordered lists", () => {
    const out = renderMarkdown("1. step one\n2. step two\n3. step three");
    expect(out).toContain("<ol");
    expect(out.match(/<li/g)?.length).toBe(3);
  });

  it("collapses paragraph lines", () => {
    const out = renderMarkdown("first line\nsecond line of same paragraph");
    expect(out).toContain("<p");
    expect(out).toContain("first line second line of same paragraph");
  });

  it("renders **bold**", () => {
    const out = renderMarkdown("hello **world**");
    expect(out).toContain("<strong>world</strong>");
  });

  it("renders [text](url) links with target + rel", () => {
    const out = renderMarkdown("see [Tebeka](https://www.tebeka.org.il)");
    expect(out).toContain('href="https://www.tebeka.org.il"');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
  });

  it("escapes HTML in raw paragraph text (XSS guard)", () => {
    const out = renderMarkdown("<script>alert(1)</script>");
    expect(out).not.toContain("<script>alert(1)</script>");
    expect(out).toContain("&lt;script&gt;");
  });

  it("escapes HTML inside links and bold (XSS guard)", () => {
    const out = renderMarkdown("**<img onerror=x>**");
    expect(out).not.toContain("<img onerror=x>");
    expect(out).toContain("<strong>");
    expect(out).toContain("&lt;img");
  });

  it("renders mixed blocks separated by blank lines", () => {
    const md = `## כותרת\n\nפסקה ראשונה.\n\n- פריט 1\n- פריט 2`;
    const out = renderMarkdown(md);
    expect(out).toContain("<h2");
    expect(out).toContain("<p");
    expect(out).toContain("<ul");
  });
});

describe("GFM tables (TED-125)", () => {
  it("renders a pipe table as an HTML table in a scroll container", () => {
    const src = `## לוח אירועים

| עיר | אירוע |
|-----|-------|
| ירושלים | טקס מרכזי |
| נתניה | חגיגה קהילתית |
`;
    const html = renderMarkdown(src);
    expect(html).toContain("<table");
    expect(html).toContain("overflow-x-auto");
    expect(html).toContain("<th");
    expect(html).toContain("ירושלים");
    expect(html).toContain("נתניה");
    expect(html).not.toContain("|-----|");
  });

  it("keeps a paragraph followed by a table separate", () => {
    const src = `פסקה רגילה
| א | ב |
|---|---|
| 1 | 2 |
`;
    const html = renderMarkdown(src);
    expect(html).toContain("<p");
    expect(html).toContain("<table");
  });
});

// TED-169 — a `|` row that is not a well-formed GFM table used to stall the
// block loop: no block branch consumed the line, and the paragraph branch
// broke on it before consuming anything, so `i` never advanced and the
// renderer pushed an empty <p> per iteration until the SSR process died with
// `FATAL ERROR: Ineffective mark-compacts near heap limit`. One such row in
// the `foreign-worker-rights-undocumented` seed body took the container down
// on every crawl of /:lang/rights/foreign-worker-rights-undocumented/:city.
describe("malformed tables terminate (TED-169)", () => {
  const cases: Array<[string, string]> = [
    ["orphan row with no separator", "| א | ב |\n"],
    [
      "table broken mid-body by a non-pipe row",
      "| א | ב |\n|---|---|\n| 1 | 2 |\n- oops | 3 | 4 |\n| 5 | 6 |\n",
    ],
    ["row after a heading", "## כותרת\n| א | ב |\n"],
    ["row after a list", "- פריט\n| א | ב |\n"],
    ["lone pipe", "|\n"],
  ];

  for (const [name, src] of cases) {
    it(`returns for ${name}`, () => {
      const started = Date.now();
      const html = renderMarkdown(src);
      // A stalled loop never returns at all, so reaching this line is the
      // real assertion. The bounds also catch a merely-quadratic regression.
      expect(Date.now() - started).toBeLessThan(1000);
      expect(html.length).toBeLessThan(10_000);
    });
  }

  it("renders an orphan row as visible text rather than dropping it", () => {
    const html = renderMarkdown("| קו לעובד | 1-800-354-354 |\n");
    expect(html).toContain("קו לעובד");
    expect(html).toContain("1-800-354-354");
  });
});
