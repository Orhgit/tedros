// Mortgage-eligibility calculator entry point (TED-22 mock).
// Phase 3.1 ships the actual calculator; this skeleton just lets the
// LeadForm be tested end-to-end from a mortgage-calc context.

import type { Route } from "./+types/$lang.calculator.mortgage";
import { LeadForm } from "~/components/lead-form";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
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
  // Mock/skeleton stub (see file header) — the real calculator lives at
  // /calculator/mortgage-ethiopian-immigrants. Keep this out of the index
  // so it doesn't compete with (or duplicate) that page.
  return [
    { title: `${t(locale, "lead_form_title")} — Tedros` },
    { name: "robots", content: "noindex" },
  ];
};

export default function MortgageCalculator({ loaderData }: Route.ComponentProps) {
  const { locale, turnstileSiteKey } = loaderData;
  // LeadForm renders its own lead_form_title heading — the page used to
  // repeat it as an h1 right above, showing the title twice (TED-119). Full
  // site chrome (header/footer) so the stub no longer feels like a dead end.
  return (
    <>
      <SiteHeader locale={locale} currentPath={`/${locale}/calculator/mortgage`} />
      <main id="main-content" className="mx-auto max-w-2xl px-6 py-12">
        <LeadForm
          locale={locale}
          source={{ kind: "mortgage-calc" }}
          {...(turnstileSiteKey ? { turnstileSiteKey } : {})}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
