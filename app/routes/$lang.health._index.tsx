// /:lang/health — Health Hub pillar landing (RIN-653).
// Hero + condition card grid + mental-health card + sidelinks + disclaimer.
// JSON-LD: BreadcrumbList + WebPage.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.health._index";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { ALL_HEALTH_CONDITIONS, glyphForCondition } from "~/lib/health/categories";
import { CONDITIONS } from "~/lib/health/conditions.server";
import { conditionsPath, conditionPath, mentalHealthPath } from "~/lib/health/links";
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
  const title = t(locale, "health_landing_title");
  const description = t(locale, "health_landing_subtitle");
  const url = `${publicUrl}/${locale}/health`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/health"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: url },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: "/health", name: title, description },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "health_breadcrumb_home"), path: "/" },
        { name: t(locale, "health_breadcrumb_health"), path: "/health" },
      ]),
    },
  ];
};

export default function HealthLanding({ loaderData }: Route.ComponentProps) {
  const { locale, conditions } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        {/* HealthDisclaimer — required on every health route */}
        <HealthDisclaimer locale={locale} variant="standard" />

        {/* Hero */}
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-green/10 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-green/15 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "health_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "health_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "health_landing_subtitle")}
          </p>
          <p className="relative mt-3 text-sm text-ink-600">
            {conditions.length} {t(locale, "health_conditions_count_label")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Conditions grid */}
            <section className="mb-10" aria-labelledby="health-conditions-heading">
              <h2
                id="health-conditions-heading"
                className="mb-4 font-display text-2xl font-semibold text-earth-900"
              >
                {t(locale, "health_conditions_title")}
              </h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {conditions.map((condition) => (
                  <li key={condition.slug}>
                    <Link
                      to={`/${locale}${conditionPath(condition.slug)}`}
                      className="group block rounded-xl border border-earth-200 bg-card p-5 transition hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                          {condition.name}
                        </h3>
                        <span aria-hidden="true" className="text-2xl leading-none">
                          {condition.glyph}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">
                        {condition.shortDescription}
                      </p>
                      <p className="mt-2 text-xs text-ink-500">
                        {condition.figureCount} {t(locale, "health_figures_count_label")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  to={`/${locale}${conditionsPath()}`}
                  className="text-sm font-medium text-earth-700 hover:underline"
                >
                  {t(locale, "health_conditions_title")}{" "}
                  <span aria-hidden="true" className="icon-flip inline-block">
                    →
                  </span>
                </Link>
              </div>
            </section>

            {/* Mental Health featured card */}
            <section className="mb-10" aria-labelledby="health-mental-health-heading">
              <Link
                to={`/${locale}${mentalHealthPath()}`}
                className="block rounded-2xl border-2 border-earth-300 bg-card p-6 transition hover:border-earth-500 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2
                      id="health-mental-health-heading"
                      className="font-display text-xl font-bold text-earth-900"
                    >
                      {t(locale, "health_mental_health_title")}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700">
                      {t(locale, "health_mental_health_subtitle")}
                    </p>
                  </div>
                  <span aria-hidden="true" className="text-3xl leading-none">
                    🌿
                  </span>
                </div>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-earth-700">
                  {t(locale, "health_mental_health_crisis_cta")}
                  <span aria-hidden="true" className="icon-flip inline-block">
                    ←
                  </span>
                </p>
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Tene Briut */}
            <div className="rounded-xl border border-earth-200 bg-card p-5">
              <h3 className="font-display text-base font-semibold text-earth-900">
                {t(locale, "health_tene_briut_link_label")}
              </h3>
              <p className="mt-1 text-sm text-ink-600">
                {t(locale, "health_tene_briut_link_body")}
              </p>
              <a
                href="https://tene-briut.org.il"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-earth-700 hover:underline"
              >
                tene-briut.org.il
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Health rights */}
            <div className="rounded-xl border border-earth-200 bg-card p-5">
              <h3 className="font-display text-base font-semibold text-earth-900">
                {t(locale, "health_rights_link_label")}
              </h3>
              <p className="mt-1 text-sm text-ink-600">
                {t(locale, "health_rights_link_body")}
              </p>
              <Link
                to={`/${locale}/rights`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-earth-700 hover:underline"
              >
                {t(locale, "health_rights_link_label")}
                <span aria-hidden="true" className="icon-flip inline-block">
                  ←
                </span>
              </Link>
            </div>

            {/* ERAN crisis line teaser */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <h3 className="font-display text-base font-semibold text-red-800">
                {t(locale, "health_eran_label")}
              </h3>
              <a
                href="tel:1201"
                className="mt-2 block font-display text-3xl font-bold text-red-600 hover:underline"
                aria-label={t(locale, "health_eran_label")}
              >
                {t(locale, "health_eran_number")}
              </a>
              <p className="mt-1 text-xs text-red-700">
                {t(locale, "health_mental_health_crisis_body")}
              </p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
