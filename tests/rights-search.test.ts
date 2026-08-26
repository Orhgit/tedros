import { describe, expect, it } from "vitest";
import { matchesQuery } from "~/lib/rights/search";

describe("rights search matching (TED-126)", () => {
  it("matches plain substrings", () => {
    expect(matchesQuery("משכנתא מסובסדת לזכאים", "משכנתא")).toBe(true);
    expect(matchesQuery("something else", "משכנתא")).toBe(false);
  });

  it("matches the placeholder example: singular query against plural data", () => {
    expect(matchesQuery("מלגות לסטודנטים יוצאי אתיופיה", "מלגה")).toBe(true);
  });

  it("matches plural query against singular data", () => {
    expect(matchesQuery("מלגה לסטודנטים", "מלגות")).toBe(true);
    expect(matchesQuery("ספר זכויות", "ספרים")).toBe(true);
  });

  it("does not stem too aggressively", () => {
    // A two-letter stem must not create matches.
    expect(matchesQuery("מים חמים", "מלה")).toBe(false);
  });

  it("empty query matches everything", () => {
    expect(matchesQuery("כל טקסט", "")).toBe(true);
  });
});
