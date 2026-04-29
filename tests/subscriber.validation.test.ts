import { describe, expect, it } from "vitest";

import { subscribeSchema } from "../app/lib/validation/subscriber";

describe("subscribeSchema", () => {
  it("accepts a valid email + locale", () => {
    const out = subscribeSchema.parse({
      email: "user@example.com",
      locale: "he",
    });
    expect(out.email).toBe("user@example.com");
    expect(out.locale).toBe("he");
  });

  it("normalizes email to lowercase + trimmed", () => {
    const out = subscribeSchema.parse({
      email: "  USER@Example.COM  ",
      locale: "en",
    });
    expect(out.email).toBe("user@example.com");
  });

  it("rejects invalid email shape", () => {
    expect(() =>
      subscribeSchema.parse({ email: "not-an-email", locale: "he" }),
    ).toThrow();
  });

  it("rejects an unknown locale", () => {
    expect(() => subscribeSchema.parse({ email: "u@e.com", locale: "fr" })).toThrow();
  });

  it("rejects an email longer than 320 chars", () => {
    const long = `${"a".repeat(310)}@e.com`; // 316 chars — fine
    const tooLong = `${"a".repeat(320)}@e.com`; // 326 chars — rejected
    expect(() => subscribeSchema.parse({ email: long, locale: "he" })).not.toThrow();
    expect(() => subscribeSchema.parse({ email: tooLong, locale: "he" })).toThrow();
  });
});
