// Lead capture validator (TED-21).
//
// Public form submitted from a listing detail page or the mortgage-eligibility
// result page. Email or phone is required (one of), so the broker has at
// least one channel to reply on.

import { z } from "zod";

const phoneRegex = /^[0-9+\-() ]+$/;

// IneligibilityReason keys — frozen by ADR-009 D1/D4. Order matches the
// canonical decision-tree order; tests assert reasons are returned in this
// order when multiple apply. Adding a key is an ADR-level change.
export const INELIGIBILITY_REASONS = [
  "not_ethiopian_origin",
  "not_a_family",
  "single_parent_no_eligible_child",
  "owned_property_within_10y",
] as const;

export type IneligibilityReason = (typeof INELIGIBILITY_REASONS)[number];

export const ineligibilityReasonSchema = z.enum(INELIGIBILITY_REASONS);

export const leadSubmissionSchema = z
  .object({
    // Optional: lead may originate from the mortgage-eligibility flow, which
    // has no listing context. Listing-detail submissions still require it on
    // the action layer; the schema permits both surfaces.
    listingId: z.string().uuid().optional(),
    name: z.string().trim().min(2).max(200),
    email: z.string().email().max(320).optional(),
    phone: z.string().trim().min(7).max(32).regex(phoneRegex).optional(),
    message: z.string().trim().max(4000).optional(),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "Consent to contact is required (Israeli Privacy Law).",
      }),
    }),
    // Filled by hidden inputs on the form, not by the user.
    metadata: z
      .object({
        utmSource: z.string().max(80).optional(),
        utmMedium: z.string().max(80).optional(),
        utmCampaign: z.string().max(80).optional(),
        page: z.string().max(500).optional(),
        referer: z.string().max(500).optional(),
        locale: z.enum(["he", "en", "am"]).optional(),
      })
      .default({}),
    // ADR-009 (Data model). Snapshot of the eligibility check that produced
    // this lead. All three fields are optional — a lead from a listing page
    // omits them entirely; a lead from the mortgage flow includes outcome +
    // (when ineligible) reasons; income is independent of either.
    eligibilityOutcome: z.enum(["eligible", "ineligible"]).optional(),
    eligibilityReasons: z.array(ineligibilityReasonSchema).default([]),
    // ADR-009 D5: optional self-reported monthly income, brokerage-only,
    // never feeds back into the eligibility check. Stored as numeric(10,2)
    // server-side; cap below mirrors the column precision.
    selfReportedMonthlyIncome: z
      .number()
      .nonnegative()
      .max(99_999_999.99)
      .optional(),
  })
  .refine((v) => Boolean(v.email || v.phone), {
    message: "At least one of email or phone is required.",
    path: ["email"],
  })
  .refine(
    // Reasons are only meaningful for `ineligible`. Reject `eligible` +
    // non-empty reasons to keep the stored row internally consistent.
    (v) => v.eligibilityOutcome !== "eligible" || v.eligibilityReasons.length === 0,
    {
      message: "Eligible leads must not carry ineligibility reasons.",
      path: ["eligibilityReasons"],
    },
  );

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;

// Admin/agency action — transition lead status.
export const leadStatusTransitionSchema = z.object({
  leadId: z.string().uuid(),
  next: z.enum(["pending", "assigned", "contacted", "closed"]),
  // Only used when transitioning to `assigned`; ignored otherwise but
  // always allowed in the payload to keep the form simple.
  assignedToUserId: z.string().uuid().optional(),
  note: z.string().max(2000).optional(),
});

export type LeadStatusTransition = z.infer<typeof leadStatusTransitionSchema>;
