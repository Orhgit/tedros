// City-level urban-renewal aggregate page — T5 slice (TED-94).
//
// `/cities/:slug/urban-renewal` aggregates a city's already-shipped T3
// neighborhood pages (`~/lib/urban-renewal/registry.ts`, TED-93/ADR-016)
// with real citywide context: the city's existing sourced `overview` from
// `~/lib/cities/content.server.ts`, a summed unit count over neighborhoods that
// publish a numeric figure (never estimated — see
// `~/lib/urban-renewal/city-aggregate.ts`), and links out to each
// neighborhood's own page. Only resolves for cities that actually have a
// T3 neighborhood registered — see ADR-017 §D1 (reuse existing route
// trees, no parallel URL namespace) and programmatic-templates.md's T5
// spec ("filtered T3 view scoped to one city").

import { Link, isRouteErrorResponse, useRouteError } from "react-router";

import type { Route } from "./+types/$lang.cities.$slug.urban-renewal";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { cityName, cityPath, findCityBySlug } from "~/lib/cities/registry";
import { cityOverview } from "~/lib/cities/content.server";
import {
  aggregateUnits,
  citySources,
  cityUrbanRenewalKeyword,
  distinctUnitNotes,
} from "~/lib/urban-renewal/city-aggregate";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import {
  localized,
  neighborhoodName,
  neighborhoodPath,
  neighborhoodsByCity,
  URBAN_RENEWAL_PATH_PREFIX,
} from "~/lib/urban-renewal/registry";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  type SchemaContext,
} from "~/lib/urban-renewal/schema";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const slug = params.slug ?? "";
  const city = findCityBySlug(slug);
  if (!city) {
    throw new Response("City not found", { status: 404 });
  }
  const neighborhoods = neighborhoodsByCity(city.slug);
  if (neighborhoods.length === 0) {
    // No T3 neighborhoods registered for this city — this aggregate page
    // has nothing non-thin to render (would be a doorway page). 404s
    // rather than rendering an empty shell; the base `/cities/:slug` page
    // still renders its (empty-state) urban-renewal section as before.
    throw new Response("No urban-renewal neighborhoods registered for this city", {
      status: 404,
    });
  }

  const units = aggregateUnits(neighborhoods);
  const notes = distinctUnitNotes(neighborhoods);
  const sources = citySources(neighborhoods);
  const legalRight = getRightBySlug("pinui-binui-tenant-rights", locale);
  const { PUBLIC_URL } = getEnv();

  return {
    locale,
    city,
    overview: cityOverview(city.slug, locale),
    neighborhoods,
    units,
    notes,
    sources,
    legalRight,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, city, neighborhoods, publicUrl } = data;
  const cityDisplayName = cityName(city, locale);
  const keyword = cityUrbanRenewalKeyword(city.slug, locale);
  const title = t(locale, "city_urw_meta_title", { keyword });
  const description = t(locale, "city_urw_meta_description", {
    keyword,
    city: cityDisplayName,
    count: neighborhoods.length,
  });
  const path = `/cities/${city.slug}/urban-renewal`;
  const canonical = `${publicUrl}${path}`;

  const ctx: SchemaContext = { publicUrl: publicUrl ?? "http://localhost:3000", locale };
  const breadcrumbs = breadcrumbJsonLd(ctx, [
    { name: t(locale, "urw_breadcrumb_home"), path: "/" },
    { name: t(locale, "cities_index_title"), path: "/cities" },
    { name: cityDisplayName, path: `/cities/${city.slug}` },
    { name: t(locale, "city_section_urban_renewal_title"), path },
  ]);
  const itemList = itemListJsonLd(
    ctx,
    neighborhoods.map((n) => ({
      name: neighborhoodName(n, locale),
      path: `${URBAN_RENEWAL_PATH_PREFIX}/${n.slug}`,
    })),
  );

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keyword },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...hreflangMeta(publicUrl, locale, path),
    { "script:ld+json": breadcrumbs },
    { "script:ld+json": itemList },
  ];
};

export default function CityUrbanRenewalPage({ loaderData }: Route.ComponentProps) {
  const { locale, city, overview, neighborhoods, units, notes, sources, legalRight } =
    loaderData;
  const cityDisplayName = cityName(city, locale);
  const keyword = cityUrbanRenewalKeyword(city.slug, locale);
  const path = `/${locale}/cities/${city.slug}/urban-renewal`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={path} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-earth-700">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to={`/${locale}`} className="hover:underline">
                {t(locale, "urw_breadcrumb_home")}
              </Link>
            </li>
            <li aria-hidden className="icon-flip">
              ›
            </li>
            <li>
              <Link to={`/${locale}/cities`} className="hover:underline">
                {t(locale, "cities_index_title")}
              </Link>
            </li>
            <li aria-hidden className="icon-flip">
              ›
            </li>
            <li>
              <Link to={cityPath(locale, city.slug)} className="hover:underline">
                {cityDisplayName}
              </Link>
            </li>
            <li aria-hidden className="icon-flip">
              ›
            </li>
            <li aria-current="page" className="text-earth-900">
              {t(locale, "city_section_urban_renewal_title")}
            </li>
          </ol>
        </nav>

        <header className="mt-4">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {keyword}
          </h1>
          <p className="mt-2 text-lg leading-relaxed text-ink-700">
            {t(locale, "city_urw_lead", {
              city: cityDisplayName,
              count: neighborhoods.length,
            })}
          </p>
        </header>

        <section
          aria-labelledby="city-urw-context-heading"
          className="mt-8 rounded-lg border border-earth-200 bg-earth-50/60 p-6"
        >
          <h2
            id="city-urw-context-heading"
            className="text-xl font-semibold text-earth-900"
          >
            {t(locale, "city_urw_section_context_title", { city: cityDisplayName })}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">{overview}</p>
        </section>

        <section
          aria-labelledby="city-urw-numbers-heading"
          className="mt-6 rounded-lg border border-earth-200 bg-white p-6"
        >
          <h2
            id="city-urw-numbers-heading"
            className="text-xl font-semibold text-earth-900"
          >
            {t(locale, "city_urw_section_numbers_title")}
          </h2>
          {units.total > 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {t(locale, "city_urw_units_total", {
                total: units.total,
                counted: units.countedSlugs.length,
                all: neighborhoods.length,
              })}
            </p>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {t(locale, "city_urw_units_none_published")}
            </p>
          )}
          {notes.length > 0 && (
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm leading-relaxed text-ink-700">
              {notes.map((note, i) => (
                <li key={i}>{localized(note, locale)}</li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="city-urw-list-heading" className="mt-8">
          <h2 id="city-urw-list-heading" className="text-xl font-semibold text-earth-900">
            {t(locale, "city_urw_section_neighborhoods_title", {
              count: neighborhoods.length,
            })}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {neighborhoods.map((n) => {
              const name = neighborhoodName(n, locale);
              const summary = n.units.note
                ? localized(n.units.note, locale)
                : n.units.after !== undefined
                  ? t(locale, "urw_units_planned_only", { after: n.units.after })
                  : localized(n.status, locale);
              return (
                <li key={n.slug}>
                  <Link
                    to={neighborhoodPath(locale, n.slug)}
                    className="flex h-full flex-col gap-2 rounded-lg border border-earth-200 bg-white p-5 transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2 text-base font-semibold text-earth-900">
                      <span aria-hidden="true">🏗️</span>
                      {name}
                    </span>
                    <span className="line-clamp-3 text-sm leading-relaxed text-ink-700">
                      {summary}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {legalRight && (
          <aside className="mt-8 overflow-hidden rounded-lg border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700 dark:bg-emerald-950">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
              {t(locale, "urw_section_legal_title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
              {legalRight.summary}
            </p>
            <Link
              to={`/${locale}/rights/${legalRight.slug}`}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              {t(locale, "urw_legal_cta")}
              <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        )}

        {sources.length > 0 && (
          <footer className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-800">
            <p className="font-medium">{t(locale, "urw_sources_title")}</p>
            <ul className="mt-1 list-inside list-disc">
              {sources.map((src) => (
                <li key={src}>{src}</li>
              ))}
            </ul>
          </footer>
        )}

        <div className="mt-6">
          <Link to={cityPath(locale, city.slug)} className="text-sm hover:underline">
            {t(locale, "urw_back_to_city", { city: cityDisplayName })}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold">{status}</h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
        {status === 404 ? "City urban-renewal overview not found." : "Unexpected error."}
      </p>
    </main>
  );
}
