import { describe, expect, it } from "vitest";
import { localePrefixTarget } from "~/lib/i18n/locale-redirect";

describe("localePrefixTarget (TED-118)", () => {
  it("prefixes the default locale for section paths shared without one", () => {
    expect(localePrefixTarget("/rights")).toBe("/he/rights");
    expect(localePrefixTarget("/rights/advanced-ulpan")).toBe("/he/rights/advanced-ulpan");
    expect(localePrefixTarget("/careers/tech/jerusalem")).toBe("/he/careers/tech/jerusalem");
  });

  it("swaps an unsupported language tag instead of stacking prefixes", () => {
    expect(localePrefixTarget("/fr")).toBe("/he");
    expect(localePrefixTarget("/fr/rights")).toBe("/he/rights");
    expect(localePrefixTarget("/pt-br/rights")).toBe("/he/rights");
  });

  it("preserves the query string", () => {
    expect(localePrefixTarget("/rights", "?tag=army")).toBe("/he/rights?tag=army");
  });

  it("returns null for supported locales and the root, so callers 404 instead of looping", () => {
    expect(localePrefixTarget("/he/rights")).toBeNull();
    expect(localePrefixTarget("/en")).toBeNull();
    expect(localePrefixTarget("/am/health")).toBeNull();
    expect(localePrefixTarget("/")).toBeNull();
  });
});
