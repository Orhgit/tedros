// "Join the directory" self-serve application form (TED-26). Submits via
// `useFetcher` to `/$lang/professionals/apply` — mirrors `lead-form.tsx`'s
// structure and a11y/spam-protection patterns (honeypot, optional Turnstile).

import { useEffect, useId, useRef, useState } from "react";
import { useFetcher } from "react-router";

import type { City } from "~/lib/cities/registry";
import { type Locale, SUPPORTED_LOCALES } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import {
  ALL_PROFESSIONS,
  professionMessageKey,
  isProfession,
  type Profession,
} from "~/lib/professionals/categories";
import { isLocationOptional } from "~/lib/professional-applications/location";

export type ApplicationFormResponse =
  | { kind: "ok" }
  | { kind: "honeypot" }
  | { kind: "validation_error"; errors: Record<string, string> }
  | { kind: "rate_limited"; retryAfterSeconds: number }
  | { kind: "turnstile_failed" };

interface ProfessionalApplicationFormProps {
  locale: Locale;
  cities: City[];
  turnstileSiteKey?: string;
}

export function ProfessionalApplicationForm({
  locale,
  cities,
  turnstileSiteKey,
}: ProfessionalApplicationFormProps) {
  const fetcher = useFetcher<ApplicationFormResponse>();
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = fetcher.state !== "idle";
  const data = fetcher.data;

  const [profession, setProfession] = useState<Profession | "">("");
  const [nationwide, setNationwide] = useState(false);
  const locationOptional = isProfession(profession) && isLocationOptional(profession);

  useEffect(() => {
    if (data?.kind === "ok" || data?.kind === "honeypot") {
      formRef.current?.reset();
      setProfession("");
      setNationwide(false);
    }
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
  const showRegions = !locationOptional || !nationwide;

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      action={`/${locale}/professionals/apply`}
      className="flex flex-col gap-4"
      aria-labelledby={`${formId}-title`}
      noValidate
    >
      <input type="hidden" name="locale" value={locale} />

      <Field
        id={`${formId}-name`}
        name="name"
        label={t(locale, "professional_apply_field_name")}
        autoComplete="name"
        required
        error={mapFieldError(fieldErrors?.name, locale)}
      />

      <div>
        <label
          htmlFor={`${formId}-profession`}
          className="mb-1 block text-sm font-medium"
        >
          {t(locale, "professional_apply_field_profession")}
          <span aria-hidden="true"> *</span>
        </label>
        <select
          id={`${formId}-profession`}
          name="profession"
          required
          value={profession}
          onChange={(e) => {
            const v = e.target.value;
            setProfession(isProfession(v) ? v : "");
            setNationwide(false);
          }}
          className={selectClass}
        >
          <option value="">
            {t(locale, "professional_apply_field_profession_placeholder")}
          </option>
          {ALL_PROFESSIONS.map((p) => (
            <option key={p} value={p}>
              {t(locale, professionMessageKey(p))}
            </option>
          ))}
        </select>
        {fieldErrors?.profession ? (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {t(locale, "professional_apply_error_required")}
          </p>
        ) : null}
      </div>

      <Field
        id={`${formId}-phone`}
        name="phone"
        type="tel"
        label={t(locale, "professional_apply_field_phone")}
        autoComplete="tel"
        dir="ltr"
        required
        error={mapFieldError(fieldErrors?.phone, locale)}
      />

      <Field
        id={`${formId}-email`}
        name="email"
        type="email"
        label={t(locale, "professional_apply_field_email")}
        autoComplete="email"
        dir="ltr"
        error={mapFieldError(fieldErrors?.email, locale)}
      />

      <Field
        id={`${formId}-licenseNumber`}
        name="licenseNumber"
        label={t(locale, "professional_apply_field_license_number")}
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="publishLicenseNumber" className="h-4 w-4" />
        {t(locale, "professional_apply_field_publish_license_number")}
      </label>

      {locationOptional ? (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="nationwideRemote"
            checked={nationwide}
            onChange={(e) => setNationwide(e.target.checked)}
            className="h-4 w-4"
          />
          {t(locale, "professional_apply_field_nationwide_remote")}
        </label>
      ) : null}

      {showRegions ? (
        <>
          <RegionSelect
            id={`${formId}-primaryRegion1`}
            name="primaryRegions"
            cities={cities}
            locale={locale}
            label={t(locale, "professional_apply_field_primary_region_1")}
            required
          />
          <RegionSelect
            id={`${formId}-primaryRegion2`}
            name="primaryRegions"
            cities={cities}
            locale={locale}
            label={t(locale, "professional_apply_field_primary_region_2")}
          />
          {fieldErrors?.primaryRegions ? (
            <p className="-mt-2 text-xs text-red-600 dark:text-red-400">
              {mapRegionsError(fieldErrors.primaryRegions, locale)}
            </p>
          ) : null}

          <div>
            <label className="mb-1 block text-sm font-medium">
              {t(locale, "professional_apply_field_secondary_regions")}
            </label>
            <div className="grid max-h-40 grid-cols-2 gap-1 overflow-y-auto rounded-md border border-gray-300 p-2 text-sm sm:grid-cols-3 dark:border-gray-700">
              {cities.map((c) => (
                <label key={c.slug} className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    name="secondaryRegions"
                    value={c.slug}
                    className="h-3.5 w-3.5"
                  />
                  {c.names[locale]}
                </label>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <fieldset>
        <legend className="mb-1 block text-sm font-medium">
          {t(locale, "professional_apply_field_languages")}
        </legend>
        <div className="flex flex-wrap gap-4 text-sm">
          {SUPPORTED_LOCALES.map((loc) => (
            <label key={loc} className="flex items-center gap-1.5">
              <input type="checkbox" name="languages" value={loc} className="h-4 w-4" />
              {t(locale, `professional_apply_language_${loc}`)}
            </label>
          ))}
        </div>
        {fieldErrors?.languages ? (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {t(locale, "professional_apply_error_languages_required")}
          </p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor={`${formId}-bio`} className="mb-1 block text-sm font-medium">
          {t(locale, "professional_apply_field_bio")}
        </label>
        <textarea
          id={`${formId}-bio`}
          name="bio"
          rows={3}
          maxLength={1000}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          name="consentToPublish"
          required
          className="mt-0.5 h-4 w-4"
        />
        {t(locale, "professional_apply_field_consent")}
      </label>
      {fieldErrors?.consentToPublish ? (
        <p className="-mt-2 text-xs text-red-600 dark:text-red-400">
          {t(locale, "professional_apply_error_consent_required")}
        </p>
      ) : null}

      {/* Honeypot — must remain visually hidden but present in DOM. */}
      <div
        aria-hidden="true"
        className="absolute top-auto -left-[9999px] h-px w-px overflow-hidden"
      >
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
        {submitting
          ? t(locale, "professional_apply_submitting")
          : t(locale, "professional_apply_submit")}
      </button>
    </fetcher.Form>
  );
}

const selectClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-900";

function RegionSelect(props: {
  id: string;
  name: string;
  cities: City[];
  locale: Locale;
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-1 block text-sm font-medium">
        {props.label}
        {props.required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <select
        id={props.id}
        name={props.name}
        required={props.required}
        className={selectClass}
      >
        <option value="">
          {t(props.locale, "professional_apply_region_select_placeholder")}
        </option>
        {props.cities.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.names[props.locale]}
          </option>
        ))}
      </select>
    </div>
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
      return t(locale, "professional_apply_error_required");
    case "email_invalid":
    case "email_too_long":
      return t(locale, "professional_apply_error_email_invalid");
    case "phone_invalid":
    case "phone_too_long":
      return t(locale, "professional_apply_error_phone_invalid");
    default:
      return t(locale, "professional_apply_error_generic");
  }
}

function mapRegionsError(code: string, locale: Locale): string {
  switch (code) {
    case "primary_regions_max_two":
      return t(locale, "professional_apply_error_primary_regions_max_two");
    default:
      return t(locale, "professional_apply_error_regions_required");
  }
}

function formLevelError(
  data: ApplicationFormResponse | undefined,
  locale: Locale,
): string | undefined {
  if (!data) return undefined;
  switch (data.kind) {
    case "rate_limited":
      return t(locale, "professional_apply_error_rate_limited");
    case "turnstile_failed":
      return t(locale, "professional_apply_error_turnstile_failed");
    case "validation_error":
      return data.errors[""] ? t(locale, "professional_apply_error_generic") : undefined;
    default:
      return undefined;
  }
}
