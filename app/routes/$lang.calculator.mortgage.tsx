// Mortgage-eligibility calculator entry point (TED-22 mock).
// Phase 3.1 ships the actual calculator; this skeleton just lets the
// LeadForm be tested end-to-end from a mortgage-calc context.

import type { Route } from "./+types/$lang.calculator.mortgage";
import { LeadForm } from "~/components/lead-form";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const env = getEnv();
  return {
    locale,
    turnstileSiteKey: env.TURNSTILE_SITE_KEY ?? null,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  return [{ title: `${t(locale, "lead_form_title")} — Tedros` }];
};

export default function MortgageCalculator({ loaderData }: Route.ComponentProps) {
  const { locale, turnstileSiteKey } = loaderData;
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        {t(locale, "lead_form_title")}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t(locale, "lead_form_subtitle")}
      </p>
      <div className="mt-8">
        <LeadForm
          locale={locale}
          source={{ kind: "mortgage-calc" }}
          {...(turnstileSiteKey ? { turnstileSiteKey } : {})}
        />
      </div>
    </main>
  );
}
