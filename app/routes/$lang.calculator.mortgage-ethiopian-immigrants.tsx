import { Form, Link, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/$lang.calculator.mortgage-ethiopian-immigrants";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import {
  calculateEligibility,
  FAMILY_STATUSES,
  ORIGINS,
  parseEligibilityForm,
  type EligibilityResult,
  type FamilyStatus,
  type IneligibleReason,
  type Origin,
} from "~/lib/mortgage/eligibility";

const CALCULATOR_PATH = "/calculator/mortgage-ethiopian-immigrants";

const FAQ_KEYS = [
  ["mortgage_faq_q1", "mortgage_faq_a1"],
  ["mortgage_faq_q2", "mortgage_faq_a2"],
  ["mortgage_faq_q3", "mortgage_faq_a3"],
  ["mortgage_faq_q4", "mortgage_faq_a4"],
] as const;

type FormState = {
  age: string;
  familyStatus: FamilyStatus | "";
  children: string;
  origin: Origin | "";
  monthlyIncome: string;
};

type ActionData =
  | { kind: "result"; result: EligibilityResult; form: FormState }
  | { kind: "errors"; fieldErrors: Record<string, string>; form: FormState };

const EMPTY_FORM: FormState = {
  age: "",
  familyStatus: "",
  children: "0",
  origin: "",
  monthlyIncome: "",
};

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL };
}

export async function action({ request, params }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const formData = await request.formData();
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const form: FormState = {
    age: raw.age ?? "",
    familyStatus: (raw.familyStatus as FamilyStatus) ?? "",
    children: raw.children ?? "0",
    origin: (raw.origin as Origin) ?? "",
    monthlyIncome: raw.monthlyIncome ?? "",
  };

  const parsed = parseEligibilityForm(raw);
  if (!parsed.ok) {
    return Response.json(
      { kind: "errors", fieldErrors: parsed.fieldErrors, form } satisfies ActionData,
      { status: 400, headers: { "Content-Language": locale } },
    );
  }

  const result = calculateEligibility(parsed.input);
  return Response.json({ kind: "result", result, form } satisfies ActionData, {
    headers: { "Content-Language": locale },
  });
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const base = data?.publicUrl ?? "http://localhost:3000";
  const title = t(locale, "mortgage_calc_meta_title");
  const description = t(locale, "mortgage_calc_meta_description");
  const ogTitle = t(locale, "mortgage_calc_title");
  const canonical = `${base}/${locale}${CALCULATOR_PATH}`;

  const faqEntities = FAQ_KEYS.map(([qKey, aKey]) => ({
    "@type": "Question",
    name: t(locale, qKey),
    acceptedAnswer: {
      "@type": "Answer",
      text: t(locale, aKey),
    },
  }));

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: t(locale, "mortgage_seo_keywords") },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: description },
    { tagName: "link", rel: "canonical", href: canonical },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "he",
      href: `${base}/he${CALCULATOR_PATH}`,
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "en",
      href: `${base}/en${CALCULATOR_PATH}`,
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "am",
      href: `${base}/am${CALCULATOR_PATH}`,
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: `${base}/he${CALCULATOR_PATH}`,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: ogTitle,
        description,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: canonical,
        inLanguage: locale,
        offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: faqEntities,
      },
    },
  ];
};

export default function MortgageCalculatorPage({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const actionData = useActionData<typeof action>() as ActionData | undefined;
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const form = actionData?.form ?? EMPTY_FORM;
  const errors = actionData?.kind === "errors" ? actionData.fieldErrors : {};

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-12">
      <header>
        <Link
          to={`/${locale}`}
          className="text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-400"
        >
          ← {t(locale, "homepage_title")}
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "mortgage_calc_title")}
        </h1>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          {t(locale, "mortgage_calc_subtitle")}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {t(locale, "mortgage_calc_intro")}
        </p>
      </header>

      <main className="mt-10 flex-1">
        <Form
          method="post"
          aria-labelledby="mortgage-calc-heading"
          className="grid gap-5"
          noValidate
        >
          <h2 id="mortgage-calc-heading" className="sr-only">
            {t(locale, "mortgage_calc_title")}
          </h2>

          <Field label={t(locale, "mortgage_field_age")} error={errors.age} htmlFor="age">
            <input
              id="age"
              name="age"
              type="number"
              min={18}
              max={120}
              defaultValue={form.age}
              required
              aria-invalid={Boolean(errors.age) || undefined}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-950"
            />
          </Field>

          <Field
            label={t(locale, "mortgage_field_family_status")}
            error={errors.familyStatus}
            htmlFor="familyStatus"
          >
            <select
              id="familyStatus"
              name="familyStatus"
              defaultValue={form.familyStatus}
              required
              aria-invalid={Boolean(errors.familyStatus) || undefined}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="" disabled>
                —
              </option>
              {FAMILY_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {t(locale, `mortgage_status_${status}`)}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label={t(locale, "mortgage_field_children")}
            error={errors.children}
            htmlFor="children"
          >
            <input
              id="children"
              name="children"
              type="number"
              min={0}
              max={15}
              defaultValue={form.children}
              required
              aria-invalid={Boolean(errors.children) || undefined}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-950"
            />
          </Field>

          <Field
            label={t(locale, "mortgage_field_origin")}
            error={errors.origin}
            htmlFor="origin"
          >
            <select
              id="origin"
              name="origin"
              defaultValue={form.origin}
              required
              aria-invalid={Boolean(errors.origin) || undefined}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="" disabled>
                —
              </option>
              {ORIGINS.map((origin) => (
                <option key={origin} value={origin}>
                  {t(locale, `mortgage_origin_${originSuffix(origin)}`)}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label={t(locale, "mortgage_field_monthly_income")}
            error={errors.monthlyIncome}
            htmlFor="monthlyIncome"
          >
            <input
              id="monthlyIncome"
              name="monthlyIncome"
              type="number"
              inputMode="numeric"
              min={0}
              step={100}
              defaultValue={form.monthlyIncome}
              required
              aria-invalid={Boolean(errors.monthlyIncome) || undefined}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-950"
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-base font-medium text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-60 sm:w-auto dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {t(locale, "mortgage_submit")}
          </button>
        </Form>

        {actionData?.kind === "result" && (
          <ResultPanel locale={locale} result={actionData.result} />
        )}

        <FaqSection locale={locale} />

        <p className="mt-12 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {t(locale, "mortgage_disclaimer")}
        </p>
      </main>
    </div>
  );
}

function FaqSection({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby="mortgage-faq-heading"
      className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800"
    >
      <h2
        id="mortgage-faq-heading"
        className="text-2xl font-semibold tracking-tight"
      >
        {t(locale, "mortgage_faq_title")}
      </h2>
      <dl className="mt-4 grid gap-4">
        {FAQ_KEYS.map(([qKey, aKey]) => (
          <div key={qKey}>
            <dt className="text-base font-medium text-gray-900 dark:text-gray-100">
              {t(locale, qKey)}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {t(locale, aKey)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = error ? `${htmlFor}-error` : undefined;
  return (
    <label htmlFor={htmlFor} className="grid gap-1.5">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {label}
      </span>
      <span aria-describedby={errorId}>{children}</span>
      {error && (
        <span
          id={errorId}
          role="alert"
          className="text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </span>
      )}
    </label>
  );
}

function ResultPanel({ locale, result }: { locale: Locale; result: EligibilityResult }) {
  if (!result.eligible) {
    return (
      <section
        aria-live="polite"
        className="mt-10 rounded-lg border border-amber-300 bg-amber-50 p-6 dark:border-amber-700 dark:bg-amber-950"
      >
        <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
          {t(locale, "mortgage_result_ineligible_title")}
        </h2>
        <ul className="mt-3 list-disc space-y-1 ps-6 text-sm text-amber-900 dark:text-amber-100">
          {result.reasons.map((reason) => (
            <li key={reason}>{t(locale, reasonKey(reason))}</li>
          ))}
        </ul>
      </section>
    );
  }

  const fmt = new Intl.NumberFormat(locale === "am" ? "en" : locale);
  const subsidyPct = Math.round(result.subsidyRate * 100);
  const subsidisedPct = (result.subsidisedRateAnnual * 100).toFixed(1);
  const marketPct = (result.marketRateAnnual * 100).toFixed(1);

  return (
    <section
      aria-live="polite"
      className="mt-10 rounded-lg border border-emerald-300 bg-emerald-50 p-6 dark:border-emerald-700 dark:bg-emerald-950"
    >
      <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
        {t(locale, "mortgage_result_eligible_title")}
      </h2>
      <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">
        {t(locale, `mortgage_result_tier_${result.tier}`)}
      </p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <ResultRow
          label={t(locale, "mortgage_result_loan_label")}
          value={t(locale, "mortgage_result_currency_nis", {
            amount: fmt.format(result.loanAmount),
          })}
        />
        <ResultRow
          label={t(locale, "mortgage_result_grant_label")}
          value={t(locale, "mortgage_result_currency_nis", {
            amount: fmt.format(result.grantAmount),
          })}
        />
        <ResultRow
          label={t(locale, "mortgage_result_subsidy_label")}
          value={t(locale, "mortgage_result_percent", { value: subsidyPct })}
        />
        <ResultRow
          label={t(locale, "mortgage_result_subsidised_rate")}
          value={t(locale, "mortgage_result_percent", { value: subsidisedPct })}
        />
        <ResultRow
          label={t(locale, "mortgage_result_market_rate")}
          value={t(locale, "mortgage_result_percent", { value: marketPct })}
        />
      </dl>

      <h3 className="mt-6 text-base font-semibold text-emerald-900 dark:text-emerald-100">
        {t(locale, "mortgage_result_next_steps_title")}
      </h3>
      <ol className="mt-2 list-decimal space-y-1 ps-6 text-sm text-emerald-900 dark:text-emerald-100">
        <li>{t(locale, "mortgage_result_step_documents")}</li>
        <li>{t(locale, "mortgage_result_step_advisor")}</li>
        <li>{t(locale, "mortgage_result_step_bank")}</li>
      </ol>
    </section>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
        {label}
      </dt>
      <dd className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
        {value}
      </dd>
    </div>
  );
}

// `mortgage_origin_*` keys use short suffixes for readability — map enum →
// suffix here so the key set in messages stays small.
function originSuffix(origin: Origin): "oleh" | "descent" | "other" {
  switch (origin) {
    case "ethiopian_oleh":
      return "oleh";
    case "ethiopian_descent":
      return "descent";
    case "other":
      return "other";
  }
}

function reasonKey(reason: IneligibleReason): string {
  return `mortgage_reason_${reason}`;
}
