import { describe, expect, it } from "vitest";
import {
  INELIGIBILITY_REASONS,
  leadSubmissionSchema,
} from "../app/lib/validation/lead";

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

  it("accepts a mortgage-flow lead with no listingId", () => {
    const out = leadSubmissionSchema.parse({
      name: "אור חזן",
      email: "or@example.com",
      consent: true,
      eligibilityOutcome: "eligible",
    });
    expect(out.listingId).toBeUndefined();
    expect(out.eligibilityOutcome).toBe("eligible");
    expect(out.eligibilityReasons).toEqual([]);
  });

  it("retains the ADR-009 ineligibility snapshot on a not-eligible lead", () => {
    const out = leadSubmissionSchema.parse({
      name: "אור",
      phone: "+972-50-1234567",
      consent: true,
      eligibilityOutcome: "ineligible",
      eligibilityReasons: [
        "not_ethiopian_origin",
        "owned_property_within_10y",
      ],
      selfReportedMonthlyIncome: 12_500,
    });
    expect(out.eligibilityOutcome).toBe("ineligible");
    expect(out.eligibilityReasons).toEqual([
      "not_ethiopian_origin",
      "owned_property_within_10y",
    ]);
    expect(out.selfReportedMonthlyIncome).toBe(12_500);
  });

  it("rejects an eligible lead carrying ineligibility reasons", () => {
    expect(() =>
      leadSubmissionSchema.parse({
        name: "אור",
        email: "or@example.com",
        consent: true,
        eligibilityOutcome: "eligible",
        eligibilityReasons: ["not_ethiopian_origin"],
      }),
    ).toThrow();
  });

  it("rejects an unknown ineligibility reason", () => {
    expect(() =>
      leadSubmissionSchema.parse({
        name: "אור",
        email: "or@example.com",
        consent: true,
        eligibilityOutcome: "ineligible",
        eligibilityReasons: ["something_we_made_up"],
      }),
    ).toThrow();
  });

  it("rejects a negative self-reported income", () => {
    expect(() =>
      leadSubmissionSchema.parse({
        name: "אור",
        email: "or@example.com",
        consent: true,
        selfReportedMonthlyIncome: -1,
      }),
    ).toThrow();
  });
});

describe("INELIGIBILITY_REASONS", () => {
  it("freezes the four ADR-009 D4 keys in canonical order", () => {
    expect(INELIGIBILITY_REASONS).toEqual([
      "not_ethiopian_origin",
      "not_a_family",
      "single_parent_no_eligible_child",
      "owned_property_within_10y",
    ]);
  });
});
