// Server-only wrapper around `submitLead` that wires Drizzle, env, and the
// shared Resend adapter. Route actions call this and pass through the
// result. Tests bypass this and call `submitLead` directly.

import { eq } from "drizzle-orm";

import { db } from "../db.server";
import { agencies, leads, listings } from "../db/schema";
import { getEnv } from "../env.server";
import { getEmailAdapter } from "../integrations/email.server";
import { leadRateLimiter } from "./rate-limit";
import {
  submitLead,
  type AgencyContact,
  type LeadInsertRow,
  type SubmitLeadInput,
  type SubmitLeadResult,
} from "./submit-lead";
import type { LeadSource } from "./source";
import { createTurnstileVerifier } from "./turnstile.server";

async function lookupAgencyContact(source: LeadSource): Promise<AgencyContact | null> {
  switch (source.kind) {
    case "agency": {
      const row = await db
        .select({ id: agencies.id, email: agencies.contactEmail })
        .from(agencies)
        .where(eq(agencies.id, source.agencyId))
        .limit(1);
      const found = row[0];
      if (!found?.email) return null;
      return { agencyId: found.id, email: found.email };
    }
    case "listing": {
      const row = await db
        .select({ agencyId: agencies.id, email: agencies.contactEmail })
        .from(listings)
        .innerJoin(agencies, eq(agencies.id, listings.agencyId))
        .where(eq(listings.id, source.listingId))
        .limit(1);
      const found = row[0];
      if (!found?.email) return null;
      return { agencyId: found.agencyId, email: found.email };
    }
    default:
      return null;
  }
}

async function insertLeadRow(row: LeadInsertRow): Promise<{ id: string }> {
  if (!row.agencyId) throw new Error("lead requires a resolved agencyId");
  const inserted = await db
    .insert(leads)
    .values({
      listingId: row.listingId,
      agencyId: row.agencyId,
      name: row.contact.name,
      email: row.contact.email,
      phone: row.contact.phone,
      message: row.contact.message,
      metadata: row.metadata,
    })
    .returning({ id: leads.id });
  const created = inserted[0];
  if (!created) throw new Error("lead insert returned no row");
  return { id: created.id };
}

export async function submitLeadFromRequest(
  input: SubmitLeadInput,
): Promise<SubmitLeadResult> {
  const env = getEnv();
  const verifyTurnstile = env.TURNSTILE_SECRET_KEY
    ? createTurnstileVerifier({ secret: env.TURNSTILE_SECRET_KEY })
    : undefined;

  return submitLead(input, {
    lookupAgencyContact,
    insertLead: insertLeadRow,
    email: getEmailAdapter(),
    rateLimit: leadRateLimiter,
    defaultToEmail: env.LEADS_DEFAULT_TO_EMAIL,
    ...(verifyTurnstile ? { verifyTurnstile } : {}),
  });
}
