// Mortgage eligibility — Olim mi-Etiopia (משכנתא לעולים מאתיופיה).
//
// Indicative-only calculator for the Phase 3.1 MVP. The actual programme is
// the "תוכנית החומש" run jointly by the Ministry of Aliyah & Integration and
// the Ministry of Construction & Housing — final entitlement is determined
// by them, not by this page (see `mortgage_disclaimer` copy).
//
// Verified against the official programme (gov.il, Knesset MMM, kol-zchut)
// by Tedros Data & Integrations:
//   - 600K NIS ceiling and 25-year repayment term ARE official.
//   - Interest is tiered in time: 0% for the first 10 years, 2% for the
//     next 15. There is no flat "subsidised rate" + "market rate" split.
//   - The official programme has NO age limit and NO income ceiling — gating
//     is via an annual quota of 200 families and a lottery, plus residency
//     and no-prior-ownership rules we do not yet model.
//
// What this module still does (and labels as such): it gives a **soft**
// estimate of expected loan amount and a non-repayable grant component
// using `tier` / `grantByTier` / `INCOME_CEILING_HEURISTIC` as MVP
// heuristics — these are NOT part of the official programme. The disclaimer
// in `messages/*.json` makes this explicit to the user.
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

export type IneligibleReason = "origin_not_eligible" | "income_too_high";

export type EligibilityResult =
  | {
      eligible: true;
      loanAmount: number;
      grantAmount: number; // non-repayable component (מענק) — MVP heuristic
      tier: "standard" | "enhanced" | "single_parent"; // MVP heuristic
      // Two-phase interest schedule from the official programme:
      phase1RateAnnual: number;
      phase1Years: number;
      phase2RateAnnual: number;
      phase2Years: number;
    }
  | { eligible: false; reasons: IneligibleReason[] };

// MVP heuristic — NOT part of the official programme (which has no income
// ceiling, only an annual quota + lottery). Kept as a soft pre-check so the
// calculator does something useful for very high earners; can be removed
// when we model the quota/lottery surface.
const INCOME_CEILING_HEURISTIC = 35_000;

/**
 * Classify the household into one of three tiers — MVP heuristic, NOT part
 * of the official programme. Drives `grantByTier` and the per-child top-up
 * in the soft loan estimate. A flat 600K is the official ceiling for every
 * approved applicant; this banding lets us show users a more realistic
 * estimate before they reach the application stage.
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
  // Note: no `MIN_AGE` check — the official programme has no age limit.
  if (raw.origin === "other") reasons.push("origin_not_eligible");
  if (raw.monthlyIncome > INCOME_CEILING_HEURISTIC) reasons.push("income_too_high");
  if (reasons.length > 0) return { eligible: false, reasons };

  const tier = classifyTier(raw);

  // MVP heuristic — base loan by tier (NIS). The official programme has a
  // flat 600K ceiling for every approved applicant; tiered estimates here
  // are a softer, more realistic preview pending the quota/lottery model.
  const baseByTier: Record<typeof tier, number> = {
    standard: 320_000,
    enhanced: 460_000,
    single_parent: 500_000,
  };
  const perChild = 25_000; // MVP heuristic — not in official programme.
  const cappedChildren = Math.min(raw.children, 5);
  const rawLoan = baseByTier[tier] + cappedChildren * perChild;
  const loanAmount = Math.min(rawLoan, MAX_LOAN);

  // MVP heuristic — non-repayable grant (מענק עומד) by tier. The general
  // Ministry of Construction housing-aid programme grants a "standing
  // grant" by points; we approximate that here pending the points model.
  const grantByTier: Record<typeof tier, number> = {
    standard: 25_000,
    enhanced: 50_000,
    single_parent: 75_000,
  };

  return {
    eligible: true,
    loanAmount,
    grantAmount: grantByTier[tier],
    tier,
    // Official programme: 0% for years 1–10, 2% for years 11–25.
    phase1RateAnnual: 0,
    phase1Years: 10,
    phase2RateAnnual: 0.02,
    phase2Years: 15,
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
