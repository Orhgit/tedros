// /:lang/heritage/kessim/:city — programmatic city page for the kessim &
// Ethiopian-community rabbis directory (TED-140).
//
// One page per city that appears in the official Ministry of Religious
// Services list. Shows every entry published for that city — position,
// name, and the office phone as published — with source attribution.
// JSON-LD: ItemList + BreadcrumbList.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.heritage.kessim.$city";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  KESSIM_CITIES,
  KESSIM_SOURCE,
  findKessimCity,
  kessimByCity,
  kessimDisplayName,
  kessimPositionLabel,
} from "~/lib/heritage/kessim.server";
import { kessimCityPath, kessimLandingPath, marriagePath } from "~/lib/heritage/links";
import { breadcrumbJsonLd, itemListJsonLd } from "~/lib/heritage/schema";
import { cityOverview, findCityBySlug } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const citySlug = params.city;
  if (!citySlug) throw data({ error: "not-found" }, { status: 404 });

  const city = findKessimCity(citySlug);
  if (!city) throw data({ error: "not-found" }, { status: 404 });

  const entries = kessimByCity(city.slug).map((e) => ({
    id: e.id,
    displayName: kessimDisplayName(e, locale),
    positionLabel: kessimPositionLabel(e.position, locale),
    position: e.position,
    phone: e.phone,
  }));

  // City overview only exists for cities in the main registry.
  const registryCity = city.inRegistry ? findCityBySlug(city.slug) : undefined;
  const overview = registryCity ? cityOverview(registryCity, locale) : null;

  // Neighbouring entries in the directory, for internal linking.
  const otherCities = KESSIM_CITIES.filter((c) => c.slug !== city.slug)
    .slice(0, 8)
    .map((c) => ({ slug: c.slug, name: c.names[locale] ?? c.names.he }));

  const { PUBLIC_URL } = getEnv();

  return {
    locale,
    citySlug: city.slug,
    cityName: city.names[locale] ?? city.names.he,
    inRegistry: city.inRegistry,
    overview,
    entries,
    otherCities,
    source: {
      govUrl: KESSIM_SOURCE.govUrl,
      dataGovUrl: KESSIM_SOURCE.dataGovUrl,
      publisher: KESSIM_SOURCE.publisher[locale] ?? KESSIM_SOURCE.publisher.he,
      updatedAt: KESSIM_SOURCE.updatedAt,
    },
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data: loaded }) => {
  if (!loaded) return [{ title: "Tedros" }];
  const { locale, citySlug, cityName, entries, publicUrl } = loaded;
  const title = t(locale, "kessim_city_title", { city: cityName });
  const description = t(locale, "kessim_city_description", {
    city: cityName,
    count: entries.length,
  });

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, kessimCityPath(citySlug)),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": itemListJsonLd(
        { publicUrl, locale },
        {
          path: kessimCityPath(citySlug),
          name: title,
          description,
          items: entries.map((e) => ({
            name: e.displayName,
            path: kessimCityPath(citySlug),
          })),
        },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: t(locale, "kessim_landing_title"), path: kessimLandingPath() },
        { name: cityName, path: kessimCityPath(citySlug) },
      ]),
    },
  ];
};

export default function KessimCityPage({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    citySlug,
    cityName,
    inRegistry,
    overview,
    entries,
    otherCities,
    source,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${kessimLandingPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${kessimLandingPath()}`} className="hover:underline">
              {t(locale, "kessim_landing_title")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {t(locale, "kessim_city_title", { city: cityName })}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {t(locale, "kessim_city_description", {
              city: cityName,
              count: entries.length,
            })}
          </p>
        </header>

        {overview && (
          <section className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-5">
            <h2 className="text-sm font-semibold tracking-wide text-earth-900 uppercase">
              {t(locale, "rights_city_context_heading")} {cityName}
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink-700">{overview}</p>
            {inRegistry && (
              <p className="mt-3 text-sm text-earth-700">
                <Link to={`/${locale}/cities/${citySlug}`} className="hover:underline">
                  {t(locale, "rights_city_more_link")}
                </Link>
              </p>
            )}
          </section>
        )}

        <section className="mb-10" aria-labelledby="kessim-list-heading">
          <h2
            id="kessim-list-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "kessim_city_list_heading", { city: cityName })}
          </h2>
          <ul className="space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {entry.displayName}
                    </h3>
                    <p className="mt-1 text-xs font-medium tracking-wide text-earth-700 uppercase">
                      {entry.positionLabel}
                    </p>
                  </div>
                  {entry.phone && (
                    <a
                      href={`tel:${entry.phone.replace(/[^0-9+*]/g, "")}`}
                      className="font-display text-lg font-bold text-earth-700 hover:underline"
                      aria-label={`${entry.displayName}: ${entry.phone}`}
                    >
                      {entry.phone}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-600">{t(locale, "kessim_phone_note")}</p>
        </section>

        {/* Cross-links — marriage guide, mourning guide, the right. */}
        <section className="mb-10 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {t(locale, "kessim_related_heading")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                to={`/${locale}${marriagePath()}`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {t(locale, "kessim_related_marriage")}
              </Link>
            </li>
            <li>
              <Link
                to={`/${locale}/family/mourning`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {t(locale, "kessim_related_mourning")}
              </Link>
            </li>
            <li>
              <Link
                to={`/${locale}/rights/kessim-religious-support`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {t(locale, "kessim_related_right")}
              </Link>
            </li>
          </ul>
        </section>

        {otherCities.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-semibold tracking-wide text-earth-900 uppercase">
              {t(locale, "kessim_other_cities_heading")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${locale}${kessimCityPath(c.slug)}`}
                    className="inline-block rounded-md border border-earth-200 bg-card px-3 py-1.5 text-sm text-ink-700 transition hover:border-earth-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {locale === "he" ? "מקור" : locale === "am" ? "ምንጭ" : "Source"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {t(locale, "kessim_source_note", {
              publisher: source.publisher,
              date: source.updatedAt,
            })}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href={source.govUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-700 underline hover:text-earth-900"
              >
                gov.il — {t(locale, "kessim_source_gov_label")} ↗
              </a>
            </li>
            <li>
              <a
                href={source.dataGovUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-700 underline hover:text-earth-900"
              >
                data.gov.il — {t(locale, "kessim_source_data_label")} ↗
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-ink-600">{t(locale, "kessim_source_caveat")}</p>
        </section>

        <div className="mt-10 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${kessimLandingPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "kessim_landing_title")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
