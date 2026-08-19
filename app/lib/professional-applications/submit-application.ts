// Core "join the directory" submission pipeline (TED-26). Side effects —
// DB insert, email notify, Turnstile, rate limiting — are injected so this
// is unit-testable without Postgres/Resend. Mirrors `leads/submit-lead.ts`.

import type { ZodIssue } from "zod";

import type { EmailAdapter, SendEmailInput } from "../integrations/resend";
import {
  professionalApplicationSchema,
  type ProfessionalApplicationInput,
} from "./validation";

export interface ApplicationInsertRow {
  name: string;
  profession: string;
  phone: string;
  email?: string;
  licenseNumber?: string;
  publishLicenseNumber: boolean;
  primaryRegions: string[];
  secondaryRegions: string[];
  nationwideRemote: boolean;
  bio?: string;
  languages: string[];
  locale: string;
  consentToPublish: boolean;
}

export interface InsertedApplication {
  id: string;
}

export interface SubmitApplicationDeps {
  insertApplication(row: ApplicationInsertRow): Promise<InsertedApplication>;
  email: EmailAdapter;
  verifyTurnstile?: (token: string, ip?: string) => Promise<boolean>;
  rateLimit: { check(key: string): { ok: boolean; retryAfterSeconds: number } };
  /** Admin inbox that gets notified of every new application. */
  notifyToEmail: string;
}

// FormData multi-value fields (checkboxes/multi-selects) arrive as repeated
// keys — `Object.fromEntries` would silently drop all but the last. Build
// the raw object with arrays for the fields that need them before handing
// off to Zod.
export function formDataToApplicationInput(formData: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of formData.keys()) {
    if (key === "primaryRegions" || key === "secondaryRegions" || key === "languages") {
      out[key] = formData.getAll(key).map(String);
    } else if (!(key in out)) {
      out[key] = String(formData.get(key) ?? "");
    }
  }
  return out;
}

export interface SubmitApplicationRequest {
  raw: Record<string, unknown>;
  ip: string;
}

export type SubmitApplicationResult =
  | { kind: "ok"; applicationId: string; emailedAdmin: boolean }
  | { kind: "honeypot" }
  | { kind: "validation_error"; errors: Record<string, string> }
  | { kind: "rate_limited"; retryAfterSeconds: number }
  | { kind: "turnstile_failed" };

export async function submitApplication(
  input: SubmitApplicationRequest,
  deps: SubmitApplicationDeps,
): Promise<SubmitApplicationResult> {
  if (typeof input.raw.website === "string" && input.raw.website.length > 0) {
    return { kind: "honeypot" };
  }

  const parsed = professionalApplicationSchema.safeParse(input.raw);
  if (!parsed.success) {
    return { kind: "validation_error", errors: zodErrorsToMap(parsed.error.issues) };
  }
  const data: ProfessionalApplicationInput = parsed.data;

  const rl = deps.rateLimit.check(input.ip);
  if (!rl.ok) {
    return { kind: "rate_limited", retryAfterSeconds: rl.retryAfterSeconds };
  }

  if (deps.verifyTurnstile) {
    const ok = await deps.verifyTurnstile(data.turnstileToken ?? "", input.ip);
    if (!ok) return { kind: "turnstile_failed" };
  }

  const row: ApplicationInsertRow = {
    name: data.name,
    profession: data.profession,
    phone: data.phone,
    ...(data.email ? { email: data.email } : {}),
    ...(data.licenseNumber ? { licenseNumber: data.licenseNumber } : {}),
    publishLicenseNumber: data.publishLicenseNumber,
    primaryRegions: data.primaryRegions,
    secondaryRegions: data.secondaryRegions,
    nationwideRemote: data.nationwideRemote,
    ...(data.bio ? { bio: data.bio } : {}),
    languages: data.languages,
    locale: data.locale,
    consentToPublish: data.consentToPublish,
  };
  const inserted = await deps.insertApplication(row);

  const subject = `New professional application: ${data.name} (${data.profession})`;
  const lines = [
    `Name: ${data.name}`,
    `Profession: ${data.profession}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    data.licenseNumber
      ? `License: ${data.licenseNumber} (publish: ${data.publishLicenseNumber})`
      : "License: not provided",
    data.nationwideRemote
      ? "Coverage: nationwide / remote"
      : `Primary regions: ${data.primaryRegions.join(", ")}`,
    data.secondaryRegions.length > 0
      ? `Secondary regions: ${data.secondaryRegions.join(", ")}`
      : null,
    `Languages: ${data.languages.join(", ")}`,
    data.bio ? `Bio: ${data.bio}` : null,
    `Submitted in locale: ${data.locale}`,
  ].filter((l): l is string => l !== null);
  const text = lines.join("\n");
  const html = `<pre>${lines.map(escapeHtml).join("\n")}</pre>`;

  const emailInput: SendEmailInput = {
    to: deps.notifyToEmail,
    subject,
    html,
    text,
    ...(data.email ? { replyTo: data.email } : {}),
    tags: [{ name: "type", value: "professional-application" }],
  };
  let emailedAdmin = false;
  try {
    await deps.email.send(emailInput);
    emailedAdmin = true;
  } catch {
    // The application row is already in the DB — a failed notification
    // must not fail the submission from the applicant's perspective.
  }

  return { kind: "ok", applicationId: inserted.id, emailedAdmin };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function zodErrorsToMap(issues: readonly ZodIssue[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.length > 0 ? String(issue.path[0]) : "";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
