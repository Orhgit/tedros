// Server-only factory for the email adapter.
// Picks a Resend client when RESEND_API_KEY is set, else a logging mock.
// Tests that need to assert sends should construct adapters directly via
// `createMockAdapter()` and pass them into `submitLead` — no global state.

import { getEnv } from "../env.server";
import { createMockAdapter, createResendAdapter, type EmailAdapter } from "./resend";

let cached: EmailAdapter | undefined;

export function getEmailAdapter(): EmailAdapter {
  if (cached) return cached;
  const env = getEnv();
  if (env.RESEND_API_KEY && env.RESEND_API_KEY.length > 0) {
    cached = createResendAdapter({
      apiKey: env.RESEND_API_KEY,
      defaultFrom: env.RESEND_FROM,
    });
  } else {
    cached = createMockAdapter({ logToConsole: env.NODE_ENV !== "test" });
  }
  return cached;
}

export function __resetEmailAdapterForTesting() {
  cached = undefined;
}
