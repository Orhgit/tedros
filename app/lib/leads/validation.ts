// Zod schemas for lead-form input. Pure — no DB or env access — so the
// shape can be reused on both the action layer and (later) any client-side
// progressive enhancement.

import { z } from "zod";

import { parseLeadSource } from "./source";

// E.164-ish or Israeli-local; we accept anything 7–20 chars made of digits,
// spaces, dashes, parens, and an optional leading '+'. Stricter validation
// belongs in the agency-side dashboard, not the public form.
const PHONE_RE = /^\+?[\d\s\-()]{7,20}$/;

export const leadInputSchema = z.object({
  name: z.string().trim().min(2, "name_too_short").max(120, "name_too_long"),
  email: z
    .string()
    .trim()
    .email("email_invalid")
    .max(320, "email_too_long")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  phone: z
    .string()
    .trim()
    .regex(PHONE_RE, "phone_invalid")
    .max(32, "phone_too_long")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: z.string().trim().max(2000, "message_too_long").optional(),
  source: z
    .string()
    .min(1, "source_required")
    .refine((v) => parseLeadSource(v) !== null, "source_invalid"),
  // Honeypot — must be empty. Bots fill it; real users never see it.
  website: z.string().max(0, "honeypot_filled").optional(),
  // Optional Cloudflare Turnstile token, verified server-side when configured.
  turnstileToken: z.string().optional(),
  // Locale the form was rendered in — used to pick the auto-reply template.
  locale: z.enum(["he", "en", "am"]).default("he"),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

// At least one of email/phone is required — easier to enforce here than in
// the per-field schemas above so the error maps to a single form-level key.
export const leadInputSchemaWithContact = leadInputSchema.refine(
  (v) => Boolean(v.email) || Boolean(v.phone),
  { message: "contact_required", path: ["email"] },
);
