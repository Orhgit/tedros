// Mortgage eligibility — Olim mi-Etiopia (משכנתא לעולים מאתיופיה).
//
// Indicative-only calculator for the Phase 3.1 MVP. The actual programme is
// administered by the Ministry of Aliyah & Integration together with the
// Ministry of Construction & Housing — final entitlement is determined by
// them, not by this page (see `disclaimer` in the Hebrew copy).
//
// Numbers below are tuned for the MVP and reviewed by Content & SEO before
// every release. They are intentionally conservative: better to under-promise
// here and let the case worker explain the upside than the other way around.
//
// Pure module: no DB, no `.server.ts` suffix — safe to unit-test under jsdom.

import { z } from "zod";

export const MAX_LOAN = 600_000;

export const FAMILY_STATUSES = ["single", "married", "divorced", "widowed"] as const;
export type FamilyStatus = (typeof FAMILY_STATUSES)[number];

export const ORIGINS = ["ethiopian_oleh", "ethiopian_descent", "other"] as const;
export type Origin = (typeof ORIGINS)[number];

export const eligibilityInputSchema = z.object({
  age: z.number().int().min(18).max(120),
  familyStatus: z.enum(FAMILY_STATUSES),
  children: z.number().int().min(0).max(15),
  origin: z.enum(ORIGINS),
  monthlyIncome: z.number().min(0).max(200_000),
});

export type EligibilityInput = z.infer<typeof eligibilityInputSchema>;

export type IneligibleReason =
  | "age_below_minimum"
  | "origin_not_eligible"
  | "income_too_high";

export type EligibilityResult =
  | {
      eligible: true;
      loanAmount: number;
      subsidyRate: number; // 0..1, share of the loan that carries the subsidised rate
      subsidisedRateAnnual: number; // e.g. 0.005 = 0.5%
      marketRateAnnual: number; // e.g. 0.045 = 4.5%
      grantAmount: number; // non-repayable component (מענק)
      tier: "standard" | "enhanced" | "single_parent";
    }
  | { eligible: false; reasons: IneligibleReason[] };

const MIN_AGE = 21;
// Income ceiling above which the subsidised programme is not available
// (per nuclear-family). Keep deliberately generous for MVP.
const INCOME_CEILING = 35_000;

/**
 * Classify the household into one of three tiers; tiers drive the loan
 * amount, subsidy share and grant component. Single parents get the same
 * loan amount as a couple but a higher grant.
 */
function classifyTier(
  input: EligibilityInput,
): "standard" | "enhanced" | "single_parent" {
  const isCoupled = input.familyStatus === "married";
  const isSingleParent =
    !isCoupled && input.children > 0 && input.familyStatus !== "single";
  if (isSingleParent) return "single_parent";
  if (isCoupled || input.children >= 2) return "enhanced";
  return "standard";
}

export function calculateEligibility(raw: EligibilityInput): EligibilityResult {
  const reasons: IneligibleReason[] = [];
  if (raw.age < MIN_AGE) reasons.push("age_below_minimum");
  if (raw.origin === "other") reasons.push("origin_not_eligible");
  if (raw.monthlyIncome > INCOME_CEILING) reasons.push("income_too_high");
  if (reasons.length > 0) return { eligible: false, reasons };

  const tier = classifyTier(raw);

  // Base loan by tier (NIS).
  const baseByTier: Record<typeof tier, number> = {
    standard: 320_000,
    enhanced: 460_000,
    single_parent: 500_000,
  };
  // Children add a per-child top-up (capped at 5 children for the calc).
  const perChild = 25_000;
  const cappedChildren = Math.min(raw.children, 5);
  const rawLoan = baseByTier[tier] + cappedChildren * perChild;
  const loanAmount = Math.min(rawLoan, MAX_LOAN);

  // Subsidy share grows for low-income households. Below 8K → 70% subsidised,
  // 8K–15K → 50%, 15K–25K → 30%, above 25K → 15%.
  const monthly = raw.monthlyIncome;
  const subsidyRate =
    monthly < 8_000 ? 0.7 : monthly < 15_000 ? 0.5 : monthly < 25_000 ? 0.3 : 0.15;

  // Non-repayable grant (מענק עומד) by tier — small fixed component.
  const grantByTier: Record<typeof tier, number> = {
    standard: 25_000,
    enhanced: 50_000,
    single_parent: 75_000,
  };

  return {
    eligible: true,
    loanAmount,
    subsidyRate,
    subsidisedRateAnnual: 0.005,
    marketRateAnnual: 0.045,
    grantAmount: grantByTier[tier],
    tier,
  };
}

/**
 * Parse a loosely-typed payload (e.g. `Object.fromEntries(formData)`) into a
 * validated input. Returns either the parsed input or a flat list of field
 * errors keyed by field name — easy to render under each form input.
 */
export function parseEligibilityForm(
  raw: Record<string, unknown>,
):
  | { ok: true; input: EligibilityInput }
  | { ok: false; fieldErrors: Record<string, string> } {
  const coerced = {
    age: numberOrNaN(raw.age),
    familyStatus: raw.familyStatus,
    children: numberOrNaN(raw.children),
    origin: raw.origin,
    monthlyIncome: numberOrNaN(raw.monthlyIncome),
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

function numberOrNaN(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : NaN;
  }
  return NaN;
}
