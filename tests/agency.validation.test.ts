import { describe, expect, it } from "vitest";
import {
  agencySignupSchema,
  agencyVerificationDecisionSchema,
  israeliLegalIdSchema,
} from "../app/lib/validation/agency";

describe("israeliLegalIdSchema", () => {
  // Pre-computed valid 9-digit IDs (Luhn-style checksum, mod 10 == 0).
  it.each(["000000018", "000000026", "123456782"])(
    "accepts valid id %s",
    (id) => {
      expect(() => israeliLegalIdSchema.parse(id)).not.toThrow();
    },
  );

  it("rejects an id with the wrong checksum", () => {
    expect(() => israeliLegalIdSchema.parse("123456789")).toThrow();
  });

  it("rejects an id with the wrong length", () => {
    expect(() => israeliLegalIdSchema.parse("12345678")).toThrow();
  });

  it("strips non-digits before validating", () => {
    expect(israeliLegalIdSchema.parse(" 000-000-018 ")).toBe("000000018");
  });
});

describe("agencySignupSchema", () => {
  const valid = {
    name: { he: "תדרוס נדל\"ן" },
    slug: { he: "tedros-realty" },
    contactEmail: "broker@tedros.local",
    contactPhone: "+972-50-1234567",
  };

  it("accepts a minimal payload", () => {
    const out = agencySignupSchema.parse(valid);
    expect(out.name.he).toContain("תדרוס");
  });

  it("rejects a slug with uppercase / spaces", () => {
    expect(() =>
      agencySignupSchema.parse({ ...valid, slug: { he: "Tedros Realty" } }),
    ).toThrow();
  });

  it("rejects an invalid email", () => {
    expect(() =>
      agencySignupSchema.parse({ ...valid, contactEmail: "not-an-email" }),
    ).toThrow();
  });
});

describe("agencyVerificationDecisionSchema", () => {
  it("requires legalId + license on verify", () => {
    expect(() =>
      agencyVerificationDecisionSchema.parse({ decision: "verify" }),
    ).toThrow();
    const ok = agencyVerificationDecisionSchema.parse({
      decision: "verify",
      legalId: "000000018",
      licenseNumber: "BR-1234",
    });
    expect(ok.decision).toBe("verify");
  });

  it("requires reason on reject and suspend", () => {
    expect(() =>
      agencyVerificationDecisionSchema.parse({ decision: "reject" }),
    ).toThrow();
    expect(() =>
      agencyVerificationDecisionSchema.parse({ decision: "suspend" }),
    ).toThrow();
  });
});
