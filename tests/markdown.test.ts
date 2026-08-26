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
