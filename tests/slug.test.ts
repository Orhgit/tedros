import { describe, expect, it } from "vitest";

import { slugify } from "../app/lib/utils/slug";

describe("slugify", () => {
  it("lowercases and collapses spaces", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips diacritics", () => {
    expect(slugify("café")).toBe("cafe");
  });

  it("trims edge dashes from punctuation", () => {
    expect(slugify("--Test! / Foo--")).toBe("test-foo");
  });

  it("caps length at 80 characters", () => {
    const long = "a".repeat(200);
    expect(slugify(long).length).toBeLessThanOrEqual(80);
  });

  it("returns empty string for non-alphanumeric input", () => {
    expect(slugify("✨🚀")).toBe("");
  });
});
