// /:lang/rights/:slug/:city — Programmatic SEO cell (RIN-339).
//
// One page per (right × city) where the right is relevant to the city
// (`isRelevant` from `lib/rights/relevance.ts`). Inherits the right's body
// content but adds a city overlay: localized title prefix, the city's
// community context, and a region/community-share indicator. The intent
// is long-tail SEO that no competitor covers — Kol-Zchut indexes rights
// nationally, and Yad2/Madlan don't cover rights at all.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.rights.$slug_.$city";
import { EligibilityWizard } from "~/components/sections/eligibility-wizard";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { findCityBySlug, cityName, cityOverview } from "~/lib/cities/registry";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { classesForTag, glyphForTag, tagChipClasses } from "~/lib/rights/categories";
import { isRelevant } from "~/lib/rights/relevance";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug || !params.city) {
    throw data({ error: "missing-params" }, { status: 404 });
  }
  const right = getRightBySlug(params.slug, locale);
  const city = findCityBySlug(params.city);
  if (!right || !city) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  if (!isRelevant(right.slug, city.slug)) {
    throw data({ error: "not-relevant" }, { status: 404 });
  }
  const html = renderMarkdown(right.body);
  const { PUBLIC_URL } = getEnv();
  return { locale, right, city, html, publicUrl: PUBLIC_URL };
}

// Locale-specific preposition that prefixes the city name. Hebrew/Amharic
// attach the prep directly to the noun (no space); English uses "in ".
function prepFor(locale: Locale): string {
  return locale === "en" ? "in " : locale === "am" ? "በ" : "ב";
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, right, city, publicUrl } = data;
  const cityNameLocal = cityName(city, locale);
  const prep = prepFor(locale);
  const title = `${right.title} ${prep}${cityNameLocal} — Tedros`;
  const description = `${right.summary} ${prep}${cityNameLocal}.`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      tagName: "link",
      rel: "canonical",
      href: `${publicUrl}/${locale}/rights/${right.slug}/${city.slug}`,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "GovernmentService",
        name: `${right.title} — ${cityNameLocal}`,
        description: right.summary,
        provider: {
          "@type": "GovernmentOrganization",
          name: "Government of Israel",
        },
        areaServed: {
          "@type": "City",
          name: cityNameLocal,
          geo: {
            "@type": "GeoCoordinates",
            latitude: city.geo.lat,
            longitude: city.geo.lon,
          },
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: right.govUrl,
        },
      },
    },
  ];
};

export default function RightCityCell({ loaderData }: Route.ComponentProps) {
  const { locale, right, city, html } = loaderData;
  const primaryTag = right.tags[0] ?? "housing";
  const tone = classesForTag(primaryTag);
  const cityNameLocal = cityName(city, locale);
  const cityOverviewLocal = cityOverview(city, locale);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/rights`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative mb-6 overflow-hidden rounded-2xl border bg-card p-6 sm:p-10 ${tone.border}`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/rights`} className="hover:underline">
              {t(locale, "rights_landing_title")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/rights/${right.slug}`} className="hover:underline">
              {right.title}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForTag(primaryTag)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {right.title}{" "}
                <span className="text-earth-700">
                  {prepFor(locale)}
                  {cityNameLocal}
                </span>
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{right.summary}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {right.tags.map((tg) => (
              <Link
                key={tg}
                to={`/${locale}/rights?tag=${tg}`}
                className={tagChipClasses(tg)}
              >
                <span aria-hidden="true" className="me-1">
                  {glyphForTag(tg)}
                </span>
                {t(locale, `rights_tag_${tg}`)}
              </Link>
            ))}
          </div>
        </header>

        {/* City context overlay — reads the city's community-aware overview
            so each cell has unique on-page content (defends against thin-content). */}
        <section className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="text-sm font-semibold tracking-wide text-earth-900 uppercase">
            {t(locale, "rights_city_context_heading")} {cityNameLocal}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-700">
            {cityOverviewLocal}
          </p>
          <p className="mt-3 text-sm text-earth-700">
            <Link to={`/${locale}/cities/${city.slug}`} className="hover:underline">
              {t(locale, "rights_city_more_link")}
            </Link>
          </p>
        </section>

        {/* Inherited right body */}
        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {right.wizard && (
          <EligibilityWizard
            schema={right.wizard}
            locale={locale}
            govUrl={right.govUrl}
            primaryTag={primaryTag}
          />
        )}

        <aside
          className={`mt-10 overflow-hidden rounded-lg border p-5 ${tone.softBg} ${tone.border}`}
        >
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "rights_official_form_label")}
          </p>
          <a
            href={right.govUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:opacity-90 ${tone.accentBg}`}
          >
            <span aria-hidden="true">↗</span>
            {t(locale, "rights_official_form_cta")}
          </a>
          <p className="mt-2 text-xs text-ink-600">
            {t(locale, "rights_official_form_disclaimer")}
          </p>
        </aside>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
