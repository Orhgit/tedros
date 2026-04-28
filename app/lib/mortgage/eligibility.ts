// Mortgage eligibility — Olim mi-Etiopia (משכנתא לעולים מאתיופיה).
//
// Binary check against the official "הלוואת המדינה ליוצאי אתיופיה" programme.
// Source-of-truth: docs/research/mortgage-program-verified.md (PR #7) +
// docs/adr/009-mortgage-eligibility-binary.md.
//
// The result is intentionally NOT personalised: every approved applicant gets
// the same loan (PROGRAMME constants below). All grading heuristics from the
// MVP (tier / per-child / income ceiling / age) have been removed — they were
// fabricated and harmful to a low-financial-literacy audience.
//
// Pure module: no DB, no `.server.ts` suffix — safe to unit-test under jsdom.

import { z } from "zod";

// Programme constants — identical for every eligible applicant. Sourced from
// the official programme; never derived from user input.
export const PROGRAMME = Object.freeze({
  loanAmount: 600_000,
  termYears: 25,
  phase1: Object.freeze({ years: 10, rateAnnual: 0 }),
  phase2: Object.freeze({ years: 15, rateAnnual: 0.02 }),
  equityRatioAtMaxLoan: 0.05,
  equityRatioAboveMaxLoan: 0.25,
  annualLotteryQuota: 200,
} as const);

// Stable i18n contract — Paraglide message keys derive from these values
// (`mortgage_eligibility_reason_<key>`). Order is canonical for accumulation.
export const INELIGIBILITY_REASONS = [
  "not_ethiopian_origin",
  "not_a_family",
  "single_parent_no_eligible_child",
  "owned_property_within_10y",
] as const;

export type IneligibilityReason = (typeof INELIGIBILITY_REASONS)[number];

export const FAMILY_STATUSES = [
  "married",
  "common_law",
  "single_parent",
  "single",
] as const;
export type FamilyStatus = (typeof FAMILY_STATUSES)[number];

export const eligibilityInputSchema = z
  .object({
    selfBornInEthiopia: z.boolean(),
    parentBornInEthiopia: z.boolean(),
    spouseBornInEthiopia: z.boolean(),
    spouseParentBornInEthiopia: z.boolean(),
    familyStatus: z.enum(FAMILY_STATUSES),
    hasChildUnder21LivingWithApplicant: z.boolean(),
    ownedRealEstateLast10Years: z.boolean(),
    recentPurchaseExceptionApplies: z.boolean(),
  })
  .strict();

export type EligibilityInput = z.infer<typeof eligibilityInputSchema>;

export type EligibilityResult =
  | { eligible: true }
  | { eligible: false; reasons: IneligibilityReason[] };

export function calculateEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: IneligibilityReason[] = [];

  const hasEthiopianOrigin =
    input.selfBornInEthiopia ||
    input.parentBornInEthiopia ||
    input.spouseBornInEthiopia ||
    input.spouseParentBornInEthiopia;
  if (!hasEthiopianOrigin) reasons.push("not_ethiopian_origin");

  if (input.familyStatus === "single") {
    reasons.push("not_a_family");
  } else if (
    input.familyStatus === "single_parent" &&
    !input.hasChildUnder21LivingWithApplicant
  ) {
    reasons.push("single_parent_no_eligible_child");
  }

  if (input.ownedRealEstateLast10Years && !input.recentPurchaseExceptionApplies) {
    reasons.push("owned_property_within_10y");
  }

  if (reasons.length > 0) {
    reasons.sort(
      (a, b) => INELIGIBILITY_REASONS.indexOf(a) - INELIGIBILITY_REASONS.indexOf(b),
    );
    return { eligible: false, reasons };
  }
  return { eligible: true };
}

/**
 * Parse a loosely-typed payload (e.g. `Object.fromEntries(formData)`) into a
 * validated input. HTML form values arrive as strings (checkboxes as "on" or
 * absent); coerce them to the booleans + enum the schema expects.
 *
 * Rejects the legacy MVP fields (`age`, `monthlyIncome`, `children`) with a
 * clear error — defensive: they should not be sent at all (the form removed
 * them in this rewrite), but if a stale client posts them we want to fail
 * loud rather than silently strip them.
 */
export function parseEligibilityForm(
  raw: Record<string, unknown>,
):
  | { ok: true; input: EligibilityInput }
  | { ok: false; fieldErrors: Record<string, string> } {
  const REJECTED_LEGACY_FIELDS = ["age", "monthlyIncome", "children"] as const;
  const legacyErrors: Record<string, string> = {};
  for (const field of REJECTED_LEGACY_FIELDS) {
    if (raw[field] !== undefined && raw[field] !== "") {
      legacyErrors[field] =
        `Field "${field}" is no longer accepted by the eligibility check.`;
    }
  }
  if (Object.keys(legacyErrors).length > 0) {
    return { ok: false, fieldErrors: legacyErrors };
  }

  const coerced = {
    selfBornInEthiopia: toBool(raw.selfBornInEthiopia),
    parentBornInEthiopia: toBool(raw.parentBornInEthiopia),
    spouseBornInEthiopia: toBool(raw.spouseBornInEthiopia),
    spouseParentBornInEthiopia: toBool(raw.spouseParentBornInEthiopia),
    familyStatus: raw.familyStatus,
    hasChildUnder21LivingWithApplicant: toBool(raw.hasChildUnder21LivingWithApplicant),
    ownedRealEstateLast10Years: toBool(raw.ownedRealEstateLast10Years),
    recentPurchaseExceptionApplies: toBool(raw.recentPurchaseExceptionApplies),
  };

  const parsed = eligibilityInputSchema.safeParse(coerced);
  if (parsed.success) return { ok: true, input: parsed.data };

  const fieldErrors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const path = issue.path.join(".");
    if (!fieldErrors[path]) fieldErrors[path] = issue.message;
  }
  return { ok: false, fieldErrors };
}

function toBool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.toLowerCase().trim();
    return v === "on" || v === "true" || v === "1" || v === "yes";
  }
  return false;
}
