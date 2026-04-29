// Subscriber email-signup validation (TED-25).

import { z } from "zod";

import { SUPPORTED_LOCALES } from "../i18n/config";

export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(320),
  locale: z.enum(SUPPORTED_LOCALES),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
