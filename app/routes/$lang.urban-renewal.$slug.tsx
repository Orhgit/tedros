// Urban-renewal neighborhood entry point (TED-22 mock).
// Phase 3.2 ships the real neighborhood pages + map; this stub renders
// just enough chrome to test the LeadForm against an `urban-renewal:{slug}`
// source. The slug is whatever the URL carries — validated as a slug by the
// LeadForm's source parser.

import type { Route } from "./+types/$lang.urban-renewal.$slug";
import { LeadForm } from "~/components/lead-form";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

const SLUG_RE = /^[a-z0-9-]{1,64}$/;

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const slug = params.slug ?? "";
  const validSlug = SLUG_RE.test(slug) ? slug : null;
  const env = getEnv();
  return {
    locale,
    slug: validSlug,
    turnstileSiteKey: env.TURNSTILE_SITE_KEY ?? null,
    publicUrl: env.PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, slug, publicUrl } = data;
  return [
    { title: `${t(locale, "lead_form_title")} — Tedros` },
    ...hreflangMeta(
      publicUrl ?? "http://localhost:3000",
      locale,
      `/urban-renewal/${slug ?? ""}`,
    ),
  ];
};

export default function UrbanRenewalNeighborhood({ loaderData }: Route.ComponentProps) {
  const { locale, slug, turnstileSiteKey } = loaderData;
  return (
    <>
      <SiteHeader locale={locale} currentPath={`/${locale}/urban-renewal/${slug ?? ""}`} />
      <main className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-xs tracking-wide text-gray-500 uppercase">{slug ?? "—"}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        {t(locale, "lead_form_title")}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t(locale, "lead_form_subtitle")}
      </p>
      <div className="mt-8">
        <LeadForm
          locale={locale}
          source={slug ? { kind: "urban-renewal", slug } : { kind: "general" }}
          {...(turnstileSiteKey ? { turnstileSiteKey } : {})}
        />
      </div>
    </main>
    </>
  );
}
