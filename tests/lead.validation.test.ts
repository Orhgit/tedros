import { describe, expect, it } from "vitest";
import { leadSubmissionSchema } from "../app/lib/validation/lead";

const listingId = "11111111-1111-1111-1111-111111111111";

describe("leadSubmissionSchema", () => {
  it("accepts a submission with email + consent", () => {
    const out = leadSubmissionSchema.parse({
      listingId,
      name: "אור חזן",
      email: "or@example.com",
      consent: true,
    });
    expect(out.email).toBe("or@example.com");
    expect(out.metadata).toEqual({});
  });

  it("accepts phone without email", () => {
    const out = leadSubmissionSchema.parse({
      listingId,
      name: "אור חזן",
      phone: "+972-50-1234567",
      consent: true,
    });
    expect(out.phone).toBeDefined();
  });

  it("rejects when neither email nor phone is provided", () => {
    expect(() =>
      leadSubmissionSchema.parse({
        listingId,
        name: "אור",
        consent: true,
      }),
    ).toThrow();
  });

  it("rejects when consent is missing", () => {
    expect(() =>
      leadSubmissionSchema.parse({
        listingId,
        name: "אור",
        email: "or@example.com",
      }),
    ).toThrow();
  });

  it("retains UTM metadata", () => {
    const out = leadSubmissionSchema.parse({
      listingId,
      name: "אור",
      email: "or@example.com",
      consent: true,
      metadata: { utmSource: "facebook", locale: "he" },
    });
    expect(out.metadata.utmSource).toBe("facebook");
    expect(out.metadata.locale).toBe("he");
  });
});
