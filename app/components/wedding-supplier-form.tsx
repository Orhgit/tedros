// "Add your business to the wedding & henna directory" intake form
// (TED-143). Follows the `professional-application-form.tsx` pattern —
// `useFetcher` POST to `/$lang/professionals/apply`, honeypot `website`
// field, optional Turnstile, submissions land in `professional_applications`
// as `pending` for manual review.
//
// Two deliberate differences from the professionals form:
//   1. `profession` is a namespaced `wedding-<category>` value, so supplier
//      intake never enters the licensed-professionals directory.
//   2. Supplier-specific labels arrive as props resolved in the loader from
//      the server content module, rather than as new `messages/*` keys
//      (ADR-020 — the dictionary ships whole to the client).

import { useEffect, useId, useRef } from "react";
import { useFetcher } from "react-router";

import type { City } from "~/lib/cities/registry";
import {
  ALL_WEDDING_SUPPLIER_CATEGORIES,
  weddingSupplierProfession,
  type WeddingSupplierCategory,
} from "~/lib/heritage/wedding-categories";
import { type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export type SupplierFormResponse =
  | { kind: "ok" }
  | { kind: "honeypot" }
  | { kind: "validation_error"; errors: Record<string, string> }
  | { kind: "rate_limited"; retryAfterSeconds: number }
  | { kind: "turnstile_failed" };

export interface WeddingSupplierFormLabels {
  businessName: string;
  category: string;
  categoryPlaceholder: string;
  city: string;
  description: string;
  descriptionHint: string;
  consent: string;
  nationwide: string;
  /** Localized name per category, keyed by category slug. */
  categoryNames: Record<WeddingSupplierCategory, string>;
}

interface WeddingSupplierFormProps {
  locale: Locale;
  cities: City[];
  labels: WeddingSupplierFormLabels;
  turnstileSiteKey?: string;
}

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none aria-[invalid=true]:border-red-500 dark:border-gray-700 dark:bg-gray-900";

export function WeddingSupplierForm({
  locale,
  cities,
  labels,
  turnstileSiteKey,
}: WeddingSupplierFormProps) {
  const fetcher = useFetcher<SupplierFormResponse>();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = fetcher.state !== "idle";
  const data = fetcher.data;

  useEffect(() => {
    if (data?.kind === "ok" || data?.kind === "honeypot") formRef.current?.reset();
  }, [data]);

  if (data?.kind === "ok" || data?.kind === "honeypot") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-green-300 bg-green-50 p-4 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-100"
      >
        <p className="font-semibold">{t(locale, "professional_apply_success_title")}</p>
        <p className="mt-1 text-sm">{t(locale, "professional_apply_success_body")}</p>
      </div>
    );
  }

  const fieldErrors = data?.kind === "validation_error" ? data.errors : undefined;
  const formError = formLevelError(data, locale);

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      action={`/${locale}/professionals/apply`}
      className="flex flex-col gap-4"
      noValidate
    >
      <input type="hidden" name="locale" value={locale} />
      {/* Suppliers are listed as businesses, not by spoken language; the
          shared schema requires at least one, so declare the site default. */}
      <input type="hidden" name="languages" value="he" />

      <div>
        <label htmlFor={`${formId}-name`} className="mb-1 block text-sm font-medium">
          {labels.businessName}
          <span aria-hidden="true"> *</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          required
          aria-invalid={fieldErrors?.name ? true : undefined}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-category`}
          className="mb-1 block text-sm font-medium"
        >
          {labels.category}
          <span aria-hidden="true"> *</span>
        </label>
        <select id={`${formId}-category`} name="profession" required className={inputClass}>
          <option value="">{labels.categoryPlaceholder}</option>
          {ALL_WEDDING_SUPPLIER_CATEGORIES.map((c) => (
            <option key={c} value={weddingSupplierProfession(c)}>
              {labels.categoryNames[c]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${formId}-city`} className="mb-1 block text-sm font-medium">
          {labels.city}
        </label>
        <select id={`${formId}-city`} name="primaryRegions" className={inputClass}>
          <option value="">
            {t(locale, "professional_apply_region_select_placeholder")}
          </option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.names[locale]}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="nationwideRemote" className="mt-1" />
        <span>{labels.nationwide}</span>
      </label>

      <div>
        <label htmlFor={`${formId}-phone`} className="mb-1 block text-sm font-medium">
          {t(locale, "professional_apply_field_phone")}
          <span aria-hidden="true"> *</span>
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          dir="ltr"
          required
          aria-invalid={fieldErrors?.phone ? true : undefined}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="mb-1 block text-sm font-medium">
          {t(locale, "professional_apply_field_email")}
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          dir="ltr"
          aria-invalid={fieldErrors?.email ? true : undefined}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-bio`} className="mb-1 block text-sm font-medium">
          {labels.description}
          <span aria-hidden="true"> *</span>
        </label>
        <textarea
          id={`${formId}-bio`}
          name="bio"
          rows={4}
          required
          aria-describedby={`${formId}-bio-hint`}
          className={inputClass}
        />
        <p id={`${formId}-bio-hint`} className="mt-1 text-xs text-ink-600">
          {labels.descriptionHint}
        </p>
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consentToPublish" required className="mt-1" />
        <span>{labels.consent}</span>
      </label>

      {/* Honeypot — off-screen, never focusable by a real user. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      {turnstileSiteKey ? (
        <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
      ) : null}

      {formError ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-earth-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-earth-900 disabled:opacity-60"
      >
        {submitting
          ? t(locale, "professional_apply_submitting")
          : t(locale, "professional_apply_submit")}
      </button>
    </fetcher.Form>
  );
}

function formLevelError(
  data: SupplierFormResponse | undefined,
  locale: Locale,
): string | undefined {
  if (!data) return undefined;
  switch (data.kind) {
    case "rate_limited":
      return t(locale, "professional_apply_error_rate_limited");
    case "turnstile_failed":
      return t(locale, "professional_apply_error_turnstile_failed");
    case "validation_error":
      return t(locale, "professional_apply_error_generic");
    default:
      return undefined;
  }
}
