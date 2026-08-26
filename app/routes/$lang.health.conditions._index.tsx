// /:lang/health/conditions — Conditions landing page (RIN-655).
// Lists all 6 conditions as cards. BreadcrumbList JSON-LD.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.health.conditions._index";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { ALL_HEALTH_CONDITIONS, glyphForCondition } from "~/lib/health/categories";
import { CONDITIONS } from "~/lib/health/conditions.server";
import { conditionPath, healthPath } from "~/lib/health/links";
import { breadcrumbJsonLd, webPageJsonLd } from "~/lib/health/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const conditions = ALL_HEALTH_CONDITIONS.map((slug) => {
    const entry = CONDITIONS.find((c) => c.slug === slug);
    if (!entry) return null;
    return {
      slug: entry.slug,
      name: entry.name[locale] ?? entry.name.he,
      shortDescription: entry.shortDescription[locale] ?? entry.shortDescription.he,
      glyph: glyphForCondition(slug),
      figureCount: entry.figures.length,
    };
  }).filter((c): c is NonNullable<typeof c> => c !== null);

  return { locale, conditions, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "health_conditions_title");
  const description = t(locale, "health_conditions_subtitle");
  const _url = `${publicUrl}/${locale}/health/conditions`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/health/conditions"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: "/health/conditions", name: title, description },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "health_breadcrumb_home"), path: "/" },
        { name: t(locale, "health_breadcrumb_health"), path: "/health" },
        {
          name: t(locale, "health_breadcrumb_conditions"),
          path: "/health/conditions",
        },
      ]),
    },
  ];
};

export default function ConditionsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, conditions } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        {/* HealthDisclaimer — required on every health route */}
        <HealthDisclaimer locale={locale} variant="standard" />

        {/* Header */}
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "health_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${healthPath()}`} className="hover:underline">
              {t(locale, "health_breadcrumb_health")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {t(locale, "health_conditions_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "health_conditions_subtitle")}
          </p>
        </header>

        {/* Condition cards */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition) => (
            <li key={condition.slug}>
              <Link
                to={`/${locale}${conditionPath(condition.slug)}`}
                className="group block h-full rounded-xl border border-earth-200 bg-card p-5 transition hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                    {condition.name}
                  </h2>
                  <span aria-hidden="true" className="text-2xl leading-none">
                    {condition.glyph}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {condition.shortDescription}
                </p>
                <p className="mt-3 text-xs text-ink-500">
                  {condition.figureCount} {t(locale, "health_figures_count_label")}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${healthPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "health_back_to_hub")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
