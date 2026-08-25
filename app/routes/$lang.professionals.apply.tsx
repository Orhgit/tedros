// Action-only endpoint for the professional-application form (TED-26). The
// form submits here via `useFetcher`, so we don't render any UI — the entry
// page handles the success state inline. A direct GET returns 405. Mirrors
// `$lang.lead.tsx`.

import { data } from "react-router";

import type { Route } from "./+types/$lang.professionals.apply";
import {
  formDataToApplicationInput,
  type SubmitApplicationResult,
} from "~/lib/professional-applications/submit-application";
import { submitApplicationFromRequest } from "~/lib/professional-applications/submit-application.server";

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
  const raw = formDataToApplicationInput(formData);
  const ip = readClientIp(request);

  const result: SubmitApplicationResult = await submitApplicationFromRequest({ raw, ip });

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
