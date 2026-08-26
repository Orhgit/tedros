import { Form, Link, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/$lang.calculator.mortgage-ethiopian-immigrants";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { cityName, findCityBySlug } from "~/lib/cities/registry";
import {
  calculateEligibility,
  FAMILY_STATUSES,
  parseEligibilityForm,
  PROGRAMME,
  type EligibilityResult,
  type FamilyStatus,
  type IneligibilityReason,
} from "~/lib/mortgage/eligibility";

const CALCULATOR_PATH = "/calculator/mortgage-ethiopian-immigrants";
const GOVIL_PROGRAMME_URL =
  "https://www.gov.il/he/departments/topics/mortgage_assistance_new_immigrant/govil-landing-page";

const FAQ_KEYS = [
  ["mortgage_faq_q1", "mortgage_faq_a1"],
  ["mortgage_faq_q2", "mortgage_faq_a2"],
  ["mortgage_faq_q3", "mortgage_faq_a3"],
  ["mortgage_faq_q4", "mortgage_faq_a4"],
  ["mortgage_faq_q5", "mortgage_faq_a5"],
  ["mortgage_faq_q6", "mortgage_faq_a6"],
  ["mortgage_faq_q7", "mortgage_faq_a7"],
  ["mortgage_faq_q8", "mortgage_faq_a8"],
] as const;

const DOC_KEYS = [
  "mortgage_docs_id",
  "mortgage_docs_aliya",
  "mortgage_docs_origin",
  "mortgage_docs_payslips",
  "mortgage_docs_bank",
  "mortgage_docs_marriage",
  "mortgage_docs_no_property",
] as const;

const MORTGAGE_CITIES = [
  "netanya",
  "tel-aviv",
  "haifa",
  "beer-sheva",
  "rehovot",
  "bat-yam",
  "rishon-lezion",
  "jerusalem",
] as const;

const ORIGIN_FIELDS = [
  "selfBornInEthiopia",
  "parentBornInEthiopia",
  "spouseBornInEthiopia",
  "spouseParentBornInEthiopia",
] as const;
type OriginField = (typeof ORIGIN_FIELDS)[number];

type FormState = {
  selfBornInEthiopia: boolean;
  parentBornInEthiopia: boolean;
  spouseBornInEthiopia: boolean;
  spouseParentBornInEthiopia: boolean;
  familyStatus: FamilyStatus | "";
  hasChildUnder21LivingWithApplicant: boolean;
  ownedRealEstateLast10Years: boolean;
  recentPurchaseExceptionApplies: boolean;
};

type ActionData =
  | { kind: "result"; result: EligibilityResult; form: FormState }
  | { kind: "errors"; fieldErrors: Record<string, string>; form: FormState };

const EMPTY_FORM: FormState = {
  selfBornInEthiopia: false,
  parentBornInEthiopia: false,
  spouseBornInEthiopia: false,
  spouseParentBornInEthiopia: false,
  familyStatus: "",
  hasChildUnder21LivingWithApplicant: false,
  ownedRealEstateLast10Years: false,
  recentPurchaseExceptionApplies: false,
};

function readBool(raw: Record<string, string>, key: string): boolean {
  const v = raw[key];
  return v === "on" || v === "true" || v === "1";
}

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
    selfBornInEthiopia: readBool(raw, "selfBornInEthiopia"),
    parentBornInEthiopia: readBool(raw, "parentBornInEthiopia"),
    spouseBornInEthiopia: readBool(raw, "spouseBornInEthiopia"),
    spouseParentBornInEthiopia: readBool(raw, "spouseParentBornInEthiopia"),
    familyStatus:
      raw.familyStatus !== undefined &&
      (FAMILY_STATUSES as readonly string[]).includes(raw.familyStatus)
        ? (raw.familyStatus as FamilyStatus)
        : "",
    hasChildUnder21LivingWithApplicant: readBool(
      raw,
      "hasChildUnder21LivingWithApplicant",
    ),
    ownedRealEstateLast10Years: readBool(raw, "ownedRealEstateLast10Years"),
    recentPurchaseExceptionApplies: readBool(raw, "recentPurchaseExceptionApplies"),
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
    acceptedAnswer: { "@type": "Answer", text: t(locale, aKey) },
  }));

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: t(locale, "mortgage_seo_keywords") },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: `${base}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${base}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${CALCULATOR_PATH}`} />
      <div className="mx-auto flex max-w-3xl flex-col px-6 py-12">
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

        <ActiveLotteryDisclaimer locale={locale} />

        <main id="main-content" className="mt-10 flex-1">
          <Form
            method="post"
            aria-labelledby="mortgage-calc-heading"
            className="grid gap-8"
            noValidate
          >
            <h2 id="mortgage-calc-heading" className="sr-only">
              {t(locale, "mortgage_section_questions")}
            </h2>

            <Fieldset legend={t(locale, "mortgage_section_origin")}>
              {ORIGIN_FIELDS.map((field) => (
                <CheckboxField
                  key={field}
                  name={field}
                  label={t(locale, originLabelKey(field))}
                  defaultChecked={form[field]}
                />
              ))}
            </Fieldset>

            <Fieldset legend={t(locale, "mortgage_section_family")}>
              <label htmlFor="familyStatus" className="grid gap-1.5">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t(locale, "mortgage_q_family_status")}
                </span>
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
                {errors.familyStatus && (
                  <span role="alert" className="text-sm text-red-600 dark:text-red-400">
                    {errors.familyStatus}
                  </span>
                )}
              </label>

              <CheckboxField
                name="hasChildUnder21LivingWithApplicant"
                label={t(locale, "mortgage_q_child_under_21")}
                defaultChecked={form.hasChildUnder21LivingWithApplicant}
              />
            </Fieldset>

            <Fieldset legend={t(locale, "mortgage_section_ownership")}>
              <CheckboxField
                name="ownedRealEstateLast10Years"
                label={t(locale, "mortgage_q_owned_property")}
                defaultChecked={form.ownedRealEstateLast10Years}
              />
              <CheckboxField
                name="recentPurchaseExceptionApplies"
                label={t(locale, "mortgage_q_recent_purchase_exception")}
                defaultChecked={form.recentPurchaseExceptionApplies}
              />
            </Fieldset>

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

          <ProgrammeFactsCard locale={locale} />
          <ProcessExplainer locale={locale} />
          <DocumentsChecklist locale={locale} />
          <MortgageCitiesSection locale={locale} />
          <LeadCta locale={locale} />
        </main>
      </div>
      <SiteFooter locale={locale} />
    </div>
  );
}

function ActiveLotteryDisclaimer({ locale }: { locale: Locale }) {
  return (
    <aside
      role="note"
      className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
    >
      <p>{t(locale, "mortgage_disclaimer_active_lottery")}</p>
      <p className="mt-2">
        <a
          href={GOVIL_PROGRAMME_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium underline underline-offset-4 hover:no-underline"
        >
          {t(locale, "mortgage_govil_link_label")}
        </a>
      </p>
    </aside>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <legend className="px-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-gray-900 dark:text-gray-100">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 dark:border-gray-700"
      />
      <span>{label}</span>
    </label>
  );
}

function ResultPanel({ locale, result }: { locale: Locale; result: EligibilityResult }) {
  if (result.eligible) {
    return (
      <section
        aria-live="polite"
        className="mt-10 rounded-lg border border-emerald-300 bg-emerald-50 p-6 dark:border-emerald-700 dark:bg-emerald-950"
      >
        <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
          {t(locale, "mortgage_result_eligible_title")}
        </h2>
        <p className="mt-2 text-sm text-emerald-900 dark:text-emerald-100">
          {t(locale, "mortgage_result_eligible_summary")}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-live="polite"
      className="mt-10 rounded-lg border border-amber-300 bg-amber-50 p-6 dark:border-amber-700 dark:bg-amber-950"
    >
      <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
        {t(locale, "mortgage_result_ineligible_title")}
      </h2>
      <p className="mt-2 text-sm text-amber-900 dark:text-amber-100">
        {t(locale, "mortgage_result_ineligible_summary")}
      </p>
      <ul className="mt-3 list-disc space-y-1 ps-6 text-sm text-amber-900 dark:text-amber-100">
        {result.reasons.map((reason) => (
          <li key={reason}>{t(locale, reasonKey(reason))}</li>
        ))}
      </ul>
    </section>
  );
}

function ProgrammeFactsCard({ locale }: { locale: Locale }) {
  const fmt = new Intl.NumberFormat(locale === "am" ? "en" : locale);
  const phase1Pct = (PROGRAMME.phase1.rateAnnual * 100).toFixed(1);
  const phase2Pct = (PROGRAMME.phase2.rateAnnual * 100).toFixed(1);
  const phase2End = PROGRAMME.phase1.years + PROGRAMME.phase2.years;

  return (
    <section className="mt-10 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {t(locale, "mortgage_programme_title")}
      </h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <Fact
          label={t(locale, "mortgage_programme_loan_label")}
          value={t(locale, "mortgage_programme_loan_value", {
            amount: fmt.format(PROGRAMME.loanAmount),
          })}
        />
        <Fact
          label={t(locale, "mortgage_programme_term_label")}
          value={t(locale, "mortgage_programme_term_value", {
            years: PROGRAMME.termYears,
          })}
        />
        <Fact
          label={t(locale, "mortgage_programme_phase1_label", {
            years: PROGRAMME.phase1.years,
          })}
          value={t(locale, "mortgage_programme_percent", { value: phase1Pct })}
        />
        <Fact
          label={t(locale, "mortgage_programme_phase2_label", {
            start: PROGRAMME.phase1.years + 1,
            end: phase2End,
          })}
          value={t(locale, "mortgage_programme_percent", { value: phase2Pct })}
        />
        <Fact
          label={t(locale, "mortgage_programme_equity_label")}
          value={t(locale, "mortgage_programme_equity_value")}
        />
        <Fact
          label={t(locale, "mortgage_programme_quota_label")}
          value={t(locale, "mortgage_programme_quota_value", {
            count: PROGRAMME.annualLotteryQuota,
          })}
        />
      </dl>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-gray-600 uppercase dark:text-gray-400">
        {label}
      </dt>
      <dd className="text-lg font-semibold text-gray-900 dark:text-gray-100">{value}</dd>
    </div>
  );
}

function ProcessExplainer({ locale }: { locale: Locale }) {
  return (
    <section className="mt-10 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {t(locale, "mortgage_process_title")}
      </h2>
      <ol className="mt-3 list-decimal space-y-2 ps-6 text-sm text-gray-800 dark:text-gray-200">
        <li>{t(locale, "mortgage_process_step_register")}</li>
        <li>{t(locale, "mortgage_process_step_certificate")}</li>
        <li>{t(locale, "mortgage_process_step_lottery")}</li>
        <li>{t(locale, "mortgage_process_step_window")}</li>
      </ol>
    </section>
  );
}

function LeadCta({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="mt-10 rounded-lg border border-gray-900 bg-gray-900 p-6 text-white dark:border-white dark:bg-white dark:text-gray-900">
        <h2 className="text-xl font-semibold">{t(locale, "mortgage_lead_cta_title")}</h2>
        <p className="mt-2 text-sm opacity-90">
          {t(locale, "mortgage_lead_cta_description")}
        </p>
        <Link
          to={`/${locale}/contact`}
          className="mt-4 inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
        >
          {t(locale, "mortgage_lead_cta_button")}
        </Link>
      </section>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-xl font-semibold text-earth-900">
          {t(locale, "mortgage_faq_title")}
        </h2>
        <dl className="mt-6 space-y-6">
          {FAQ_KEYS.map(([qKey, aKey]) => (
            <div key={qKey}>
              <dt className="font-medium text-earth-900">{t(locale, qKey)}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-700">
                {t(locale, aKey)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

function DocumentsChecklist({ locale }: { locale: Locale }) {
  return (
    <section className="mt-10 rounded-lg border border-earth-200 bg-earth-50/50 p-6">
      <h2 className="text-xl font-semibold text-earth-900">
        {t(locale, "mortgage_docs_title")}
      </h2>
      <ul className="mt-3 space-y-2">
        {DOC_KEYS.map((key) => (
          <li key={key} className="flex items-start gap-2 text-sm text-ink-700">
            <span aria-hidden="true" className="mt-0.5 text-earth-600">
              ✓
            </span>
            {t(locale, key)}
          </li>
        ))}
      </ul>
    </section>
  );
}

function MortgageCitiesSection({ locale }: { locale: Locale }) {
  const cities = MORTGAGE_CITIES.map((slug) => findCityBySlug(slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );

  if (cities.length === 0) return null;

  return (
    <section className="mt-10 rounded-lg border border-earth-200 p-6">
      <h2 className="text-xl font-semibold text-earth-900">
        {t(locale, "mortgage_cities_title")}
      </h2>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cities.map((city) => (
          <li key={city.slug}>
            <Link
              to={`/${locale}/cities/${city.slug}`}
              className="block rounded-md border border-earth-100 bg-earth-50 px-3 py-2 text-center text-sm text-ink-800 transition hover:border-earth-300"
            >
              {cityName(city, locale)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function originLabelKey(field: OriginField): string {
  switch (field) {
    case "selfBornInEthiopia":
      return "mortgage_q_self_born";
    case "parentBornInEthiopia":
      return "mortgage_q_parent_born";
    case "spouseBornInEthiopia":
      return "mortgage_q_spouse_born";
    case "spouseParentBornInEthiopia":
      return "mortgage_q_spouse_parent_born";
  }
}

function reasonKey(reason: IneligibilityReason): string {
  return `mortgage_eligibility_reason_${reason}`;
}
