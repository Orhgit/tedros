// /:lang/health/conditions/:condition — Condition detail page (RIN-655).
// Loader: validate slug, return condition data + locale.
// JSON-LD: MedicalWebPage (YMYL) + BreadcrumbList.
// 404 on invalid slug.

import { data as routerData, Link } from "react-router";

import type { Route } from "./+types/$lang.health.conditions.$condition";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { isHealthCondition } from "~/lib/health/categories";
import {
  CONDITIONS,
  conditionBody,
  conditionName,
  findCondition,
} from "~/lib/health/conditions.server";
import { conditionsPath, healthPath } from "~/lib/health/links";
import { breadcrumbJsonLd, healthConditionJsonLd } from "~/lib/health/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { formatDate } from "~/lib/i18n/format";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const conditionSlug = params.condition;

  if (!conditionSlug || !isHealthCondition(conditionSlug)) {
    throw routerData(null, { status: 404 });
  }

  const entry = findCondition(conditionSlug);
  if (!entry) {
    throw routerData(null, { status: 404 });
  }

  const { PUBLIC_URL } = getEnv();

  const condition = {
    slug: entry.slug,
    name: conditionName(entry, locale),
    shortDescription: entry.shortDescription[locale] ?? entry.shortDescription.he,
    body: conditionBody(entry, locale),
    figures: entry.figures.map((f) => ({
      id: f.id,
      heading: f.heading[locale] ?? f.heading.he,
      figure: f.figure[locale] ?? f.figure.he,
      context: f.context[locale] ?? f.context.he,
      source: f.source,
      publishedYear: f.publishedYear,
    })),
    warnings: entry.warnings.map((w) => w[locale] ?? w.he),
    lastReviewed: entry.lastReviewed,
  };

  // Sibling conditions (other 5)
  const siblings = CONDITIONS.filter((c) => c.slug !== entry.slug).map((c) => ({
    slug: c.slug,
    name: conditionName(c, locale),
  }));

  return { locale, condition, siblings, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, condition, publicUrl } = data;
  const _url = `${publicUrl}/${locale}/health/conditions/${condition.slug}`;

  return [
    { title: `${condition.name} — Tedros` },
    { name: "description", content: condition.shortDescription },
    ...hreflangMeta(publicUrl, locale, `/health/conditions/${condition.slug}`),
    { property: "og:title", content: condition.name },
    { property: "og:description", content: condition.shortDescription },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": healthConditionJsonLd(
        { publicUrl, locale },
        {
          slug: condition.slug,
          name: condition.name,
          description: condition.shortDescription,
          lastReviewed: condition.lastReviewed,
        },
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
        {
          name: condition.name,
          path: `/health/conditions/${condition.slug}`,
        },
      ]),
    },
  ];
};

export default function ConditionDetail({ loaderData }: Route.ComponentProps) {
  const { locale, condition, siblings } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* HealthDisclaimer — required on every health route */}
        <HealthDisclaimer locale={locale} variant="standard" />

        {/* Breadcrumb + title */}
        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "health_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${healthPath()}`} className="hover:underline">
              {t(locale, "health_breadcrumb_health")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${conditionsPath()}`} className="hover:underline">
              {t(locale, "health_breadcrumb_conditions")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {condition.name}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {condition.shortDescription}
          </p>
          <p className="mt-2 text-xs text-ink-500">
            {t(locale, "health_condition_last_reviewed_label")}:{" "}
            {formatDate(locale, condition.lastReviewed)}
          </p>
        </header>

        {/* Body paragraphs */}
        <section className="mb-10 space-y-4" aria-labelledby="condition-body-heading">
          <h2 id="condition-body-heading" className="sr-only">
            {condition.name}
          </h2>
          {condition.body.split("\n\n").map((para, i) => (
            <p key={i} className="leading-relaxed text-ink-800">
              {para}
            </p>
          ))}
        </section>

        {/* Research figures */}
        {condition.figures.length > 0 && (
          <section className="mb-10" aria-labelledby="condition-figures-heading">
            <h2
              id="condition-figures-heading"
              className="mb-4 font-display text-xl font-semibold text-earth-900"
            >
              {t(locale, "health_condition_figures_label")}
            </h2>
            <ul className="space-y-4">
              {condition.figures.map((fig) => (
                <li
                  key={fig.id}
                  className="rounded-xl border border-earth-200 bg-card p-5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {fig.heading}
                    </h3>
                    <span className="font-display text-2xl font-bold text-earth-700 sm:text-3xl">
                      {fig.figure}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    {fig.context}
                  </p>
                  <p className="mt-2 text-xs text-ink-500">
                    {t(locale, "health_condition_source_label")}:{" "}
                    <a
                      href={fig.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-earth-800 underline hover:no-underline"
                    >
                      {fig.source.name}
                    </a>{" "}
                    · {fig.publishedYear}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* YMYL warnings */}
        {condition.warnings.map((warning, i) => (
          <div
            key={i}
            className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <p>{warning}</p>
          </div>
        ))}

        {/* Sibling conditions */}
        {siblings.length > 0 && (
          <section className="mb-10" aria-labelledby="condition-siblings-heading">
            <h2
              id="condition-siblings-heading"
              className="mb-3 font-display text-lg font-semibold text-earth-900"
            >
              {t(locale, "health_conditions_title")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${locale}/health/conditions/${s.slug}`}
                    className="rounded-md border border-earth-200 bg-card px-3 py-1.5 text-sm text-earth-700 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${conditionsPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "health_back_to_conditions")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
