// Agency signup + verification validators (TED-21).
//
// Israeli legal_id and broker license number are real-world identifiers
// with checksum rules — validated client+server with the helpers below.

import { z } from "zod";

// ת.ז. (תעודת זהות) and ח.פ. (חברות פרטיות) both share the 9-digit Luhn-like
// `digit * weight` checksum. Reject obvious format errors here; the actual
// authority lookup happens out-of-band during admin verification.
function isValidIsraeliId(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  if (digits.length !== 9) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let d = Number(digits[i]) * ((i % 2) + 1);
    if (d > 9) d -= 9;
    sum += d;
  }
  return sum % 10 === 0;
}

export const israeliLegalIdSchema = z
  .string()
  .trim()
  .transform((s) => s.replace(/\D/g, ""))
  .refine(isValidIsraeliId, {
    message: "Invalid Israeli ID / company number (9-digit checksum)",
  });

// Ministry of Justice broker license — typically 4–6 digits, sometimes
// prefixed. We accept anything up to 64 chars and normalise whitespace.
export const brokerLicenseSchema = z
  .string()
  .trim()
  .min(2)
  .max(64)
  .regex(/^[A-Za-z0-9\-./ ]+$/, {
    message: "License number contains invalid characters",
  });

// --- Signup intake ---------------------------------------------------------
// Step 1 of the form (TED-21). Verification fields (legal_id, license)
// can be filled here or on a follow-up step before the admin reviews.

export const agencyTranslatableSchema = z.object({
  he: z.string().trim().min(2).max(120),
  en: z.string().trim().max(120).optional(),
  am: z.string().trim().max(120).optional(),
});

export const agencySignupSchema = z.object({
  name: agencyTranslatableSchema,
  // HE slug is required; en/am optional and fall back to HE on the public site.
  slug: z.object({
    he: z
      .string()
      .trim()
      .min(2)
      .max(80)
      .regex(/^[a-z0-9-]+$/, {
        message: "Slug must be lowercase a-z, 0-9, or '-'",
      }),
    en: z
      .string()
      .trim()
      .max(80)
      .regex(/^[a-z0-9-]*$/)
      .optional(),
    am: z
      .string()
      .trim()
      .max(80)
      .regex(/^[a-z0-9-]*$/)
      .optional(),
  }),
  contactEmail: z.string().email().max(320),
  contactPhone: z
    .string()
    .trim()
    .min(7)
    .max(32)
    .regex(/^[0-9+\-() ]+$/),
  websiteUrl: z.string().url().optional(),
  description: agencyTranslatableSchema.partial({ en: true, am: true }).optional(),
  legalId: israeliLegalIdSchema.optional(),
  licenseNumber: brokerLicenseSchema.optional(),
});

export type AgencySignup = z.infer<typeof agencySignupSchema>;

// Admin-side schema for transitioning verification_status. Verified requires
// both legal_id and license_number to be set.
export const agencyVerificationDecisionSchema = z.discriminatedUnion("decision", [
  z.object({
    decision: z.literal("verify"),
    legalId: israeliLegalIdSchema,
    licenseNumber: brokerLicenseSchema,
    note: z.string().max(2000).optional(),
  }),
  z.object({
    decision: z.literal("reject"),
    reason: z.string().min(2).max(2000),
  }),
  z.object({
    decision: z.literal("suspend"),
    reason: z.string().min(2).max(2000),
  }),
]);

export type AgencyVerificationDecision = z.infer<typeof agencyVerificationDecisionSchema>;
