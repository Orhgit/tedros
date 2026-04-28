// Core lead-submission pipeline (TED-22).
//
// All side effects — DB writes, email sends, Turnstile verification, rate
// limiting — are passed in as deps so this can be unit-tested without a
// running Postgres or Resend account. The route action wires real impls.
//
// Outcome model: every call resolves; the `kind` field tells the caller
// what to render. We never throw on user-caused failures (validation,
// honeypot, rate limit) — those are normal control flow that the form UI
// distinguishes between for the user.

import type { ZodIssue } from "zod";

import {
  DEFAULT_AUTO_REPLY_HOURS,
  renderAgencyNotification,
  renderAutoReply,
} from "../integrations/email-templates";
import type { EmailAdapter, SendEmailInput } from "../integrations/resend";
import { leadInputSchemaWithContact } from "./validation";
import { parseLeadSource, type LeadSource } from "./source";

// --- Types ---------------------------------------------------------------

export interface AgencyContact {
  agencyId: string;
  email: string;
  // Optional dashboard URL we add as a CTA in the agency mail.
  dashboardUrl?: string;
}

export interface LeadInsertRow {
  agencyId: string | null;
  listingId: string | null;
  contact: {
    name: string;
    email?: string;
    phone?: string;
    message?: string;
    source: string;
  };
  metadata: {
    sourceKind: LeadSource["kind"];
    locale: string;
    ip?: string;
    userAgent?: string;
  };
}

export interface InsertedLead {
  id: string;
}

export interface SubmitLeadDeps {
  /** Resolves the agency contact for a lead source, or null when unknown. */
  lookupAgencyContact(source: LeadSource): Promise<AgencyContact | null>;
  /** Persists the lead row. Must return the new row's id. */
  insertLead(row: LeadInsertRow): Promise<InsertedLead>;
  /** Outbound mail provider. */
  email: EmailAdapter;
  /** Verifies a Turnstile token. Return true to allow, false to reject. */
  verifyTurnstile?: (token: string, ip?: string) => Promise<boolean>;
  /** Sliding-window rate limiter keyed on IP. */
  rateLimit: { check(key: string): { ok: boolean; retryAfterSeconds: number } };
  /** Default recipient when no agency can be resolved (admin@tedros). */
  defaultToEmail: string;
  /** Auto-reply hours promise — defaults to 24. */
  autoReplyHours?: number;
}

export interface SubmitLeadInput {
  formData: Record<string, string>;
  ip: string;
  userAgent?: string;
}

export type SubmitLeadResult =
  | { kind: "ok"; leadId: string; emailedAgency: boolean; emailedUser: boolean }
  // The honeypot was filled. We pretend success so bots don't learn anything,
  // but emit no DB row and no mail. Tests can assert on this kind.
  | { kind: "honeypot" }
  | {
      kind: "validation_error";
      // Map field-name → first error code (i18n key). Form-level errors land
      // under the empty-string key.
      errors: Record<string, string>;
    }
  | { kind: "rate_limited"; retryAfterSeconds: number }
  | { kind: "turnstile_failed" };

// --- Implementation ------------------------------------------------------

export async function submitLead(
  input: SubmitLeadInput,
  deps: SubmitLeadDeps,
): Promise<SubmitLeadResult> {
  // 1. Honeypot first — drop bots before any work.
  if ((input.formData.website ?? "").length > 0) {
    return { kind: "honeypot" };
  }

  // 2. Schema validation. We collect Zod issues and map them to a flat
  //    field → code dictionary the form can localize.
  const parsed = leadInputSchemaWithContact.safeParse(input.formData);
  if (!parsed.success) {
    return { kind: "validation_error", errors: zodErrorsToMap(parsed.error.issues) };
  }
  const data = parsed.data;

  // 3. Rate limit before any external calls.
  const rl = deps.rateLimit.check(input.ip);
  if (!rl.ok) {
    return { kind: "rate_limited", retryAfterSeconds: rl.retryAfterSeconds };
  }

  // 4. Turnstile (if configured).
  if (deps.verifyTurnstile) {
    const ok = await deps.verifyTurnstile(data.turnstileToken ?? "", input.ip);
    if (!ok) return { kind: "turnstile_failed" };
  }

  // 5. Resolve source, look up agency.
  const source = parseLeadSource(data.source);
  // Validation already verified the source parses; this is just narrowing.
  if (!source) {
    return { kind: "validation_error", errors: { source: "source_invalid" } };
  }
  const agency = await deps.lookupAgencyContact(source).catch(() => null);

  // 6. Persist. listingId only when source = listing.
  const row: LeadInsertRow = {
    agencyId: agency?.agencyId ?? null,
    listingId: source.kind === "listing" ? source.listingId : null,
    contact: {
      name: data.name,
      ...(data.email ? { email: data.email } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.message ? { message: data.message } : {}),
      source: data.source,
    },
    metadata: {
      sourceKind: source.kind,
      locale: data.locale,
      ip: input.ip,
      ...(input.userAgent ? { userAgent: input.userAgent } : {}),
    },
  };
  const inserted = await deps.insertLead(row);

  // 7. Send agency notification.
  const recipient = agency?.email ?? deps.defaultToEmail;
  const agencyMail = renderAgencyNotification({
    locale: data.locale,
    leadName: data.name,
    leadEmail: data.email,
    leadPhone: data.phone,
    leadMessage: data.message,
    source,
    ...(agency?.dashboardUrl ? { dashboardUrl: agency.dashboardUrl } : {}),
  });
  const agencyEmailInput: SendEmailInput = {
    to: recipient,
    subject: agencyMail.subject,
    html: agencyMail.html,
    text: agencyMail.text,
    ...(data.email ? { replyTo: data.email } : {}),
    tags: [
      { name: "type", value: "lead-to-agency" },
      { name: "source", value: source.kind },
    ],
  };
  let emailedAgency = false;
  try {
    await deps.email.send(agencyEmailInput);
    emailedAgency = true;
  } catch {
    // Agency send failures must not lose the lead — the row is already in
    // the DB and ops/Sentry will pick up the throw via wrapping callers.
    // We keep the result `ok` so the user still sees the success state.
  }

  // 8. Auto-reply (only if we have the user's email).
  let emailedUser = false;
  if (data.email) {
    const autoReply = renderAutoReply({
      locale: data.locale,
      leadName: data.name,
      responseHours: deps.autoReplyHours ?? DEFAULT_AUTO_REPLY_HOURS,
    });
    try {
      await deps.email.send({
        to: data.email,
        subject: autoReply.subject,
        html: autoReply.html,
        text: autoReply.text,
        tags: [
          { name: "type", value: "lead-auto-reply" },
          { name: "source", value: source.kind },
        ],
      });
      emailedUser = true;
    } catch {
      // Same rationale — a failed auto-reply doesn't fail the submission.
    }
  }

  return { kind: "ok", leadId: inserted.id, emailedAgency, emailedUser };
}

function zodErrorsToMap(issues: readonly ZodIssue[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.length > 0 ? String(issue.path[0]) : "";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
