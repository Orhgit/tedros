// Action-only endpoint for the shared LeadForm. The form submits here via
// `useFetcher`, so we don't render any UI — the entry-point page handles
// the success state inline. A direct GET returns 405 (avoids exposing an
// empty page from a search engine snapshot).

import { data } from "react-router";

import type { Route } from "./+types/$lang.lead";
import { submitLeadFromRequest } from "~/lib/leads/submit-lead.server";

export async function loader() {
  throw data("Method Not Allowed", { status: 405 });
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return data(
      { kind: "validation_error", errors: { "": "method_not_allowed" } },
      { status: 405 },
    );
  }

  const formData = await request.formData();
  const fields: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") fields[key] = value;
  }

  const ip = readClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const result = await submitLeadFromRequest({ formData: fields, ip, userAgent });

  // Map result kinds to HTTP status codes for client/observability.
  switch (result.kind) {
    case "ok":
    case "honeypot":
      return data(result, { status: 200 });
    case "validation_error":
      return data(result, { status: 400 });
    case "rate_limited":
      return data(result, {
        status: 429,
        headers: { "Retry-After": String(result.retryAfterSeconds) },
      });
    case "turnstile_failed":
      return data(result, { status: 400 });
  }
}

// Trust order: CF-Connecting-IP (Cloudflare) → X-Forwarded-For first hop →
// fallback. Per ADR-006 we sit behind Caddy + Cloudflare in prod.
function readClientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return "0.0.0.0";
}
