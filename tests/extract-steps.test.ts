import { describe, expect, it } from "vitest";

import { extractApplicationSteps } from "../app/lib/rights/extract-steps";

describe("extractApplicationSteps — Hebrew", () => {
  it("extracts numbered list under '## איך מגישים?'", () => {
    const body = `## למי מיועד?

תושבים.

## איך מגישים?

1. נכנסים לאתר
2. ממלאים טופס
3. מצרפים מסמכים
`;
    const steps = extractApplicationSteps(body, "he");
    expect(steps).toEqual(["נכנסים לאתר", "ממלאים טופס", "מצרפים מסמכים"]);
  });

  it("matches alternate Hebrew headings (איך מתחילים, איך פונים)", () => {
    const body = `## איך מתחילים?\n\n1. צעד אחד\n2. צעד שני\n`;
    expect(extractApplicationSteps(body, "he")).toEqual(["צעד אחד", "צעד שני"]);
  });

  it("strips bold + link markdown from steps", () => {
    const body = `## איך מגישים?\n\n1. **חשוב**: לבקר ב-[gov.il](https://gov.il)\n`;
    expect(extractApplicationSteps(body, "he")).toEqual([
      "חשוב: לבקר ב-gov.il (https://gov.il)",
    ]);
  });
});

describe("extractApplicationSteps — English", () => {
  it("extracts steps under '## How to apply'", () => {
    const body = `## What's included\n\nFoo.\n\n## How to apply\n\n1. Open form\n2. Submit\n`;
    expect(extractApplicationSteps(body, "en")).toEqual(["Open form", "Submit"]);
  });

  it("matches '## How to start'", () => {
    const body = `## How to start\n\n1. Step one\n2. Step two\n3. Step three\n`;
    expect(extractApplicationSteps(body, "en")).toEqual([
      "Step one",
      "Step two",
      "Step three",
    ]);
  });
});

describe("extractApplicationSteps — Amharic", () => {
  it("extracts steps under Amharic 'how to apply' heading", () => {
    const body = `## ለማን ይሆናል?\n\nማንኛውም.\n\n## እንዴት ማመልከት ይቻላል?\n\n1. የመጀመሪያ እርምጃ\n2. ሁለተኛ\n`;
    expect(extractApplicationSteps(body, "am")).toEqual(["የመጀመሪያ እርምጃ", "ሁለተኛ"]);
  });
});

describe("extractApplicationSteps — edge cases", () => {
  it("returns empty when no matching heading", () => {
    expect(extractApplicationSteps("## רק כותרת אחרת\n\n1. צעד\n", "he")).toEqual([]);
  });

  it("returns empty when heading exists but no numbered list follows", () => {
    expect(
      extractApplicationSteps("## איך מגישים?\n\nstuff but no list\n", "he"),
    ).toEqual([]);
  });

  it("stops at next heading", () => {
    const body = `## איך מגישים?\n\n1. אחד\n2. שניים\n\n## כותרת נוספת\n\n1. לא נכלל\n`;
    expect(extractApplicationSteps(body, "he")).toEqual(["אחד", "שניים"]);
  });
});
