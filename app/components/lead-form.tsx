// Shared "I'm interested" form (TED-22). One component, three feature
// surfaces — listings, urban renewal, mortgage calc — selected via the
// `source` prop and serialized into a hidden field for the action.
//
// Submits via `useFetcher` to `/$lang/lead` so the surrounding entry-point
// page stays put and renders the success state inline. Honeypot field
// `website` is positioned off-screen but still in the DOM.

import { useEffect, useId, useRef } from "react";
import { useFetcher } from "react-router";

import { type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { serializeLeadSource, type LeadSource } from "~/lib/leads/source";

export type LeadFormResponse =
  | { kind: "ok" }
  | { kind: "honeypot" }
  | { kind: "validation_error"; errors: Record<string, string> }
  | { kind: "rate_limited"; retryAfterSeconds: number }
  | { kind: "turnstile_failed" };

interface LeadFormProps {
  locale: Locale;
  source: LeadSource;
  /** Optional Cloudflare Turnstile site key. When set, renders the widget. */
  turnstileSiteKey?: string;
  className?: string;
}

export function LeadForm({ locale, source, turnstileSiteKey, className }: LeadFormProps) {
  const fetcher = useFetcher<LeadFormResponse>();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = fetcher.state !== "idle";
  const data = fetcher.data;

  // Reset form on success so a follow-up lead doesn't reuse stale fields.
  // Honeypot results also reset (nothing was sent, but the bot's tab can
  // try again — let real-user flows in the same browser still work).
  useEffect(() => {
    if (data?.kind === "ok" || data?.kind === "honeypot") {
      formRef.current?.reset();
    }
  }, [data]);

  if (data?.kind === "ok" || data?.kind === "honeypot") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-lg border border-green-300 bg-green-50 p-4 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-100 ${className ?? ""}`}
      >
        <p className="font-semibold">{t(locale, "lead_form_success_title")}</p>
        <p className="mt-1 text-sm">{t(locale, "lead_form_success_body")}</p>
      </div>
    );
  }

  const formError = formLevelError(data, locale);
  const fieldErrors = data?.kind === "validation_error" ? data.errors : undefined;

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      action={`/${locale}/lead`}
      className={`flex flex-col gap-4 ${className ?? ""}`}
      aria-labelledby={`${formId}-title`}
      noValidate
    >
      <div>
        <h2 id={`${formId}-title`} className="text-xl font-semibold">
          {t(locale, "lead_form_title")}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {t(locale, "lead_form_subtitle")}
        </p>
      </div>

      <input type="hidden" name="source" value={serializeLeadSource(source)} />
      <input type="hidden" name="locale" value={locale} />

      <Field
        id={`${formId}-name`}
        name="name"
        label={t(locale, "lead_form_name")}
        autoComplete="name"
        required
        error={mapFieldError(fieldErrors?.name, locale)}
      />

      <Field
        id={`${formId}-email`}
        name="email"
        type="email"
        label={t(locale, "lead_form_email")}
        autoComplete="email"
        dir="ltr"
        error={mapFieldError(fieldErrors?.email, locale)}
      />

      <Field
        id={`${formId}-phone`}
        name="phone"
        type="tel"
        label={t(locale, "lead_form_phone")}
        autoComplete="tel"
        dir="ltr"
        error={mapFieldError(fieldErrors?.phone, locale)}
      />

      <div>
        <label htmlFor={`${formId}-message`} className="mb-1 block text-sm font-medium">
          {t(locale, "lead_form_message")}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          maxLength={2000}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>

      {/* Honeypot — must remain visually hidden but present in DOM and
          tab-out of the natural focus order. Hidden via sr-only (clip-based):
          a physical -left offset extends the scrollable area on RTL pages
          instead of being cut off (TED-120). */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {turnstileSiteKey ? (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
      ) : null}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {t(locale, "lead_form_consent")}{" "}
        <a
          href={`/${locale}/privacy`}
          className="underline hover:text-gray-700 dark:hover:text-gray-200"
        >
          {t(locale, "footer_privacy")}
        </a>
      </p>

      {formError ? (
        <p
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-900 dark:border-red-700 dark:bg-red-950 dark:text-red-100"
        >
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-gray-900"
      >
        {submitting ? t(locale, "lead_form_submitting") : t(locale, "lead_form_submit")}
      </button>
    </fetcher.Form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
  error?: string;
}

function Field(props: FieldProps) {
  const errorId = props.error ? `${props.id}-error` : undefined;
  return (
    <div>
      <label htmlFor={props.id} className="mb-1 block text-sm font-medium">
        {props.label}
        {props.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        autoComplete={props.autoComplete}
        dir={props.dir}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={errorId}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none aria-[invalid=true]:border-red-500 dark:border-gray-700 dark:bg-gray-900"
      />
      {props.error ? (
        <p id={errorId} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {props.error}
        </p>
      ) : null}
    </div>
  );
}

function mapFieldError(code: string | undefined, locale: Locale): string | undefined {
  if (!code) return undefined;
  switch (code) {
    case "name_too_short":
    case "name_too_long":
      return t(locale, "lead_form_required");
    case "email_invalid":
    case "email_too_long":
      return t(locale, "lead_form_email_invalid");
    case "phone_invalid":
    case "phone_too_long":
      return t(locale, "lead_form_phone_invalid");
    case "contact_required":
      return t(locale, "lead_form_contact_required");
    default:
      return t(locale, "lead_form_error_generic");
  }
}

function formLevelError(
  data: LeadFormResponse | undefined,
  locale: Locale,
): string | undefined {
  if (!data) return undefined;
  switch (data.kind) {
    case "rate_limited":
      return t(locale, "lead_form_rate_limited");
    case "turnstile_failed":
      return t(locale, "lead_form_turnstile_failed");
    case "validation_error":
      // Field-level errors render inline; this only fires for an empty
      // catch-all (e.g., unknown source serialization).
      return data.errors[""] ? t(locale, "lead_form_error_generic") : undefined;
    default:
      return undefined;
  }
}
