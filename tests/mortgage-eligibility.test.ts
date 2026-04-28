import { describe, expect, it } from "vitest";
import {
  calculateEligibility,
  INELIGIBILITY_REASONS,
  parseEligibilityForm,
  PROGRAMME,
  type EligibilityInput,
  type IneligibilityReason,
} from "../app/lib/mortgage/eligibility";

const eligibleBaseline: EligibilityInput = {
  selfBornInEthiopia: true,
  parentBornInEthiopia: false,
  spouseBornInEthiopia: false,
  spouseParentBornInEthiopia: false,
  familyStatus: "married",
  hasChildUnder21LivingWithApplicant: false,
  ownedRealEstateLast10Years: false,
  recentPurchaseExceptionApplies: false,
};

describe("PROGRAMME constants", () => {
  it("is frozen so callers cannot mutate it at runtime", () => {
    expect(Object.isFrozen(PROGRAMME)).toBe(true);
    expect(Object.isFrozen(PROGRAMME.phase1)).toBe(true);
    expect(Object.isFrozen(PROGRAMME.phase2)).toBe(true);
  });

  it("matches the official two-phase rate schedule (0% / 10y, 2% / 15y)", () => {
    expect(PROGRAMME.loanAmount).toBe(600_000);
    expect(PROGRAMME.termYears).toBe(25);
    expect(PROGRAMME.phase1).toEqual({ years: 10, rateAnnual: 0 });
    expect(PROGRAMME.phase2).toEqual({ years: 15, rateAnnual: 0.02 });
    expect(PROGRAMME.phase1.years + PROGRAMME.phase2.years).toBe(PROGRAMME.termYears);
  });
});

describe("calculateEligibility — eligible result", () => {
  it("returns eligible: true for a married applicant of Ethiopian origin with no prior ownership", () => {
    const r = calculateEligibility(eligibleBaseline);
    expect(r.eligible).toBe(true);
  });

  it("does not expose any per-applicant numeric fields on the eligible branch", () => {
    const r = calculateEligibility(eligibleBaseline);
    expect(r.eligible).toBe(true);
    if (r.eligible) {
      // The contract is the literal `{ eligible: true }` — no other keys.
      expect(Object.keys(r)).toEqual(["eligible"]);
    }
  });

  it("treats common-law partners the same as married applicants", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      familyStatus: "common_law",
    });
    expect(r.eligible).toBe(true);
  });

  it("accepts a single parent who has a child under 21 living with them", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      familyStatus: "single_parent",
      hasChildUnder21LivingWithApplicant: true,
    });
    expect(r.eligible).toBe(true);
  });

  it("accepts an applicant with prior ownership when the documented exception applies", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      ownedRealEstateLast10Years: true,
      recentPurchaseExceptionApplies: true,
    });
    expect(r.eligible).toBe(true);
  });

  it("accepts origin via parent / spouse / spouse-parent (any one of four)", () => {
    const viaParent = calculateEligibility({
      ...eligibleBaseline,
      selfBornInEthiopia: false,
      parentBornInEthiopia: true,
    });
    const viaSpouse = calculateEligibility({
      ...eligibleBaseline,
      selfBornInEthiopia: false,
      spouseBornInEthiopia: true,
    });
    const viaSpouseParent = calculateEligibility({
      ...eligibleBaseline,
      selfBornInEthiopia: false,
      spouseParentBornInEthiopia: true,
    });
    expect(viaParent.eligible).toBe(true);
    expect(viaSpouse.eligible).toBe(true);
    expect(viaSpouseParent.eligible).toBe(true);
  });
});

describe("calculateEligibility — each IneligibilityReason is reachable", () => {
  it("not_ethiopian_origin: no origin checkbox selected", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      selfBornInEthiopia: false,
    });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons).toContain("not_ethiopian_origin");
  });

  it("not_a_family: applicant marks themselves as single", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      familyStatus: "single",
    });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons).toContain("not_a_family");
  });

  it("single_parent_no_eligible_child: single parent with no child <21 in household", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      familyStatus: "single_parent",
      hasChildUnder21LivingWithApplicant: false,
    });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons).toContain("single_parent_no_eligible_child");
  });

  it("owned_property_within_10y: prior ownership without exception", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      ownedRealEstateLast10Years: true,
      recentPurchaseExceptionApplies: false,
    });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons).toContain("owned_property_within_10y");
  });
});

describe("calculateEligibility — accumulation", () => {
  it("returns ALL applicable reasons, not just the first one (no short-circuit)", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      selfBornInEthiopia: false,
      ownedRealEstateLast10Years: true,
    });
    expect(r.eligible).toBe(false);
    if (!r.eligible) {
      expect(r.reasons).toEqual(["not_ethiopian_origin", "owned_property_within_10y"]);
    }
  });

  it("orders reasons by the canonical INELIGIBILITY_REASONS sequence", () => {
    const r = calculateEligibility({
      ...eligibleBaseline,
      selfBornInEthiopia: false,
      familyStatus: "single",
      ownedRealEstateLast10Years: true,
    });
    expect(r.eligible).toBe(false);
    if (!r.eligible) {
      const expected = (
        [
          "not_ethiopian_origin",
          "not_a_family",
          "owned_property_within_10y",
        ] satisfies IneligibilityReason[]
      ).slice();
      expected.sort(
        (a, b) => INELIGIBILITY_REASONS.indexOf(a) - INELIGIBILITY_REASONS.indexOf(b),
      );
      expect(r.reasons).toEqual(expected);
    }
  });
});

describe("parseEligibilityForm", () => {
  const validRaw = {
    selfBornInEthiopia: "on",
    familyStatus: "married",
  };

  it("coerces HTML form values (checkboxes + select) into a typed input", () => {
    const parsed = parseEligibilityForm(validRaw);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.input.selfBornInEthiopia).toBe(true);
      expect(parsed.input.parentBornInEthiopia).toBe(false);
      expect(parsed.input.familyStatus).toBe("married");
      expect(parsed.input.ownedRealEstateLast10Years).toBe(false);
    }
  });

  it("rejects the legacy MVP fields (age / monthlyIncome / children) with a clear error", () => {
    for (const legacy of ["age", "monthlyIncome", "children"]) {
      const parsed = parseEligibilityForm({ ...validRaw, [legacy]: "32" });
      expect(parsed.ok).toBe(false);
      if (!parsed.ok) {
        expect(parsed.fieldErrors).toHaveProperty(legacy);
      }
    }
  });

  it("returns a field error when familyStatus is missing or invalid", () => {
    const parsed = parseEligibilityForm({
      selfBornInEthiopia: "on",
      familyStatus: "not_a_status",
    });
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) {
      expect(parsed.fieldErrors).toHaveProperty("familyStatus");
    }
  });
});
