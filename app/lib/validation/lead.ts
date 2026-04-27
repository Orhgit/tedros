// Lead capture validator (TED-21).
//
// Public form submitted from a listing detail page. Email or phone is
// required (one of), so the broker has at least one channel to reply on.

import { z } from "zod";

const phoneRegex = /^[0-9+\-() ]+$/;

export const leadSubmissionSchema = z
  .object({
    listingId: z.string().uuid(),
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
  })
  .refine((v) => Boolean(v.email || v.phone), {
    message: "At least one of email or phone is required.",
    path: ["email"],
  });

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
