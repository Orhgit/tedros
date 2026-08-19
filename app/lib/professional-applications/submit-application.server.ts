// Server-only wrapper: wires Drizzle, env, and the shared Resend adapter.
// The route action calls this. Tests call `submitApplication` directly.

import { db } from "../db.server";
import { professionalApplications } from "../db/schema";
import { getEnv } from "../env.server";
import { getEmailAdapter } from "../integrations/email.server";
import { createTurnstileVerifier } from "../leads/turnstile.server";
import { createInMemoryRateLimiter } from "../leads/rate-limit";
import {
  submitApplication,
  type ApplicationInsertRow,
  type SubmitApplicationRequest,
  type SubmitApplicationResult,
} from "./submit-application";

// 3 applications per IP per hour — same shape as the lead-form limiter.
const applicationRateLimiter = createInMemoryRateLimiter({
  limit: 3,
  windowMs: 60 * 60 * 1000,
});

async function insertApplicationRow(row: ApplicationInsertRow): Promise<{ id: string }> {
  const inserted = await db
    .insert(professionalApplications)
    .values({
      name: row.name,
      profession: row.profession,
      phone: row.phone,
      email: row.email,
      licenseNumber: row.licenseNumber,
      publishLicenseNumber: row.publishLicenseNumber,
      primaryRegions: row.primaryRegions,
      secondaryRegions: row.secondaryRegions,
      nationwideRemote: row.nationwideRemote,
      bio: row.bio,
      languages: row.languages,
      locale: row.locale,
      consentToPublish: row.consentToPublish,
    })
    .returning({ id: professionalApplications.id });
  const created = inserted[0];
  if (!created) throw new Error("application insert returned no row");
  return { id: created.id };
}

export async function submitApplicationFromRequest(
  input: SubmitApplicationRequest,
): Promise<SubmitApplicationResult> {
  const env = getEnv();
  const verifyTurnstile = env.TURNSTILE_SECRET_KEY
    ? createTurnstileVerifier({ secret: env.TURNSTILE_SECRET_KEY })
    : undefined;

  return submitApplication(input, {
    insertApplication: insertApplicationRow,
    email: getEmailAdapter(),
    rateLimit: applicationRateLimiter,
    notifyToEmail: env.LEADS_DEFAULT_TO_EMAIL,
    ...(verifyTurnstile ? { verifyTurnstile } : {}),
  });
}
