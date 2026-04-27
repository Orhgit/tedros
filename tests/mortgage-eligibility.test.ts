import { describe, expect, it } from "vitest";
import {
  MAX_LOAN,
  calculateEligibility,
  parseEligibilityForm,
  type EligibilityInput,
} from "../app/lib/mortgage/eligibility";

const baseline: EligibilityInput = {
  age: 30,
  familyStatus: "married",
  children: 2,
  origin: "ethiopian_oleh",
  monthlyIncome: 12_000,
};

describe("calculateEligibility — gating", () => {
  it("rejects under-21 applicants", () => {
    const r = calculateEligibility({ ...baseline, age: 20 });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons).toContain("age_below_minimum");
  });

  it("rejects applicants with no community connection", () => {
    const r = calculateEligibility({ ...baseline, origin: "other" });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons).toContain("origin_not_eligible");
  });

  it("rejects households above the income ceiling", () => {
    const r = calculateEligibility({ ...baseline, monthlyIncome: 50_000 });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons).toContain("income_too_high");
  });

  it("collects all failing reasons together", () => {
    const r = calculateEligibility({
      ...baseline,
      age: 18,
      origin: "other",
      monthlyIncome: 99_999,
    });
    expect(r.eligible).toBe(false);
    if (!r.eligible) {
      expect(r.reasons).toEqual(
        expect.arrayContaining([
          "age_below_minimum",
          "origin_not_eligible",
          "income_too_high",
        ]),
      );
    }
  });
});

describe("calculateEligibility — amounts", () => {
  it("returns the enhanced family tier for a married couple with children", () => {
    const r = calculateEligibility(baseline);
    expect(r.eligible).toBe(true);
    if (r.eligible) {
      expect(r.tier).toBe("enhanced");
      expect(r.loanAmount).toBeLessThanOrEqual(MAX_LOAN);
      expect(r.loanAmount).toBeGreaterThan(0);
    }
  });

  it("caps the loan amount at the programme maximum", () => {
    // Single parent base (500K) + 5 capped children × 25K = 625K → caps at 600K.
    const r = calculateEligibility({
      ...baseline,
      familyStatus: "divorced",
      children: 10,
    });
    expect(r.eligible).toBe(true);
    if (r.eligible) expect(r.loanAmount).toBe(MAX_LOAN);
  });

  it("gives single parents the single_parent tier and a higher grant", () => {
    const single = calculateEligibility({
      ...baseline,
      familyStatus: "divorced",
      children: 1,
    });
    expect(single.eligible).toBe(true);
    if (single.eligible) {
      expect(single.tier).toBe("single_parent");
      expect(single.grantAmount).toBeGreaterThan(25_000);
    }
  });

  it("gives the standard tier to a childless single applicant", () => {
    const r = calculateEligibility({
      ...baseline,
      familyStatus: "single",
      children: 0,
    });
    expect(r.eligible).toBe(true);
    if (r.eligible) expect(r.tier).toBe("standard");
  });

  it("scales the subsidy share by income band", () => {
    const low = calculateEligibility({ ...baseline, monthlyIncome: 5_000 });
    const mid = calculateEligibility({ ...baseline, monthlyIncome: 12_000 });
    const high = calculateEligibility({ ...baseline, monthlyIncome: 22_000 });
    if (low.eligible && mid.eligible && high.eligible) {
      expect(low.subsidyRate).toBeGreaterThan(mid.subsidyRate);
      expect(mid.subsidyRate).toBeGreaterThan(high.subsidyRate);
    }
  });
});

describe("parseEligibilityForm", () => {
  it("coerces FormData-style strings into a typed input", () => {
    const parsed = parseEligibilityForm({
      age: "32",
      familyStatus: "married",
      children: "3",
      origin: "ethiopian_oleh",
      monthlyIncome: "10500",
    });
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.input.age).toBe(32);
      expect(parsed.input.children).toBe(3);
      expect(parsed.input.monthlyIncome).toBe(10_500);
    }
  });

  it("returns field errors when required fields are missing or invalid", () => {
    const parsed = parseEligibilityForm({
      age: "",
      familyStatus: "not_a_status",
      children: "abc",
      origin: "",
      monthlyIncome: "-5",
    });
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) {
      expect(parsed.fieldErrors).toHaveProperty("age");
      expect(parsed.fieldErrors).toHaveProperty("familyStatus");
      expect(parsed.fieldErrors).toHaveProperty("children");
      expect(parsed.fieldErrors).toHaveProperty("origin");
    }
  });
});
