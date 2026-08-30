// /:lang/culinary/shopping/:city — "Where to buy Ethiopian groceries in
// {city}" programmatic pages (TED-146).
//
// Verified-only policy: every shop rendered here carries a public source
// (see app/lib/culinary/shops.server.ts). Dated sources render an explicit
// call-ahead notice; "partial" cities render a page-level notice. Cities
// with nothing verifiable have no page (404).
//
// Schema.org: ItemList of GroceryStore + BreadcrumbList.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.culinary.shopping.$city";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { culinaryPath, culinaryShoppingCityPath, sigdMenuPath } from "~/lib/culinary/links";
import { breadcrumbJsonLd, shopItemListJsonLd, type JsonLd } from "~/lib/culinary/schema";
import {
  ONLINE_SELLERS,
  cityIntro,
  findCityShopping,
  localized,
} from "~/lib/culinary/shops.server";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { formatDate } from "~/lib/i18n/format";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const citySlug = params.city;
  if (!citySlug) throw data({ error: "not-found" }, { status: 404 });

  const entry = findCityShopping(citySlug);
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!entry || !city) throw data({ error: "not-found" }, { status: 404 });

  const { PUBLIC_URL } = getEnv();
  const cityNameLocal = cityName(city, locale);
  const cityNameHe = city.names.he;

  const title = t(locale, "culinary_city_title", { city: cityNameLocal });
  const description = t(locale, "culinary_city_meta", {
    city: cityNameLocal,
    count: entry.shops.length,
  });

  const shops = entry.shops.map((s) => ({
    name: s.name,
    area: s.area ? localized(s.area, locale) : null,
    sells: localized(s.sells, locale),
    sourceUrl: s.sourceUrl,
    sourceLabel: localized(s.sourceLabel, locale),
    sourceYear: s.sourceYear,
    confidence: s.confidence,
  }));

  const itemList: JsonLd = shopItemListJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    {
      path: culinaryShoppingCityPath(citySlug),
      name: title,
      description,
      shops: entry.shops.map((s) => ({
        name: s.name,
        area: s.area ? s.area.he : undefined,
        cityName: cityNameHe,
        description: s.sells.he,
      })),
    },
  );

  const breadcrumb: JsonLd = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "culinary_title"), path: culinaryPath() },
    { name: title, path: culinaryShoppingCityPath(citySlug) },
  ]);

  const otherCities = CITIES.filter(
    (c) => c.slug !== citySlug && findCityShopping(c.slug),
  ).map((c) => ({ slug: c.slug, name: cityName(c, locale) }));

  const onlineSellers = ONLINE_SELLERS.map((s) => ({
    name: s.name,
    url: s.url,
    sells: localized(s.sells, locale),
  }));

  return {
    locale,
    citySlug,
    cityNameLocal,
    status: entry.status,
    intro: cityIntro(entry, locale),
    marketArea: entry.marketArea ? localized(entry.marketArea, locale) : null,
    shops,
    verifiedAt: entry.verifiedAt,
    otherCities,
    onlineSellers,
    title,
    description,
    publicUrl: PUBLIC_URL,
    itemList,
    breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, citySlug, title, description, publicUrl, itemList, breadcrumb } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, culinaryShoppingCityPath(citySlug)),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": itemList },
    { "script:ld+json": breadcrumb },
  ];
};

export default function CulinaryShoppingCity({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    cityNameLocal,
    status,
    intro,
    marketArea,
    shops,
    verifiedAt,
    otherCities,
    onlineSellers,
    title,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${culinaryPath()}`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${culinaryPath()}`} className="hover:underline">
            {t(locale, "culinary_title")}
          </Link>
          {" / "}
          <span aria-current="page">{cityNameLocal}</span>
        </nav>

        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{intro}</p>
          <p className="mt-4 text-xs text-ink-500">
            {t(locale, "culinary_verified_at_label")}: {formatDate(locale, verifiedAt)}
          </p>
        </header>

        {status === "partial" && (
          <div
            role="note"
            className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
          >
            {t(locale, "culinary_partial_notice")}
          </div>
        )}

        {marketArea && (
          <section className="mb-8 rounded-xl border border-earth-200 bg-card p-5">
            <h2 className="font-display text-base font-semibold text-earth-900">
              {t(locale, "culinary_market_area_label")}
            </h2>
            <p className="mt-1 text-sm text-ink-700">{marketArea}</p>
          </section>
        )}

        {/* Shops */}
        <section aria-labelledby="city-shops-heading" className="mb-10">
          <h2
            id="city-shops-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "culinary_shops_heading")}
          </h2>
          <ul className="space-y-4">
            {shops.map((shop) => (
              <li
                key={shop.name}
                className="rounded-2xl border border-earth-200 bg-card p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-base font-semibold text-earth-900">
                    {shop.name}
                  </h3>
                  {shop.confidence === "dated" && (
                    <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      {t(locale, "culinary_dated_badge", { year: shop.sourceYear })}
                    </span>
                  )}
                </div>
                {shop.area && <p className="mt-1 text-sm text-ink-700">{shop.area}</p>}
                <p className="mt-2 text-sm text-ink-700">{shop.sells}</p>
                <p className="mt-3 text-xs text-ink-500">
                  {t(locale, "culinary_source_label")}:{" "}
                  <a
                    href={shop.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-ink-700"
                  >
                    {shop.sourceLabel}
                  </a>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-600">
            {t(locale, "culinary_call_ahead_note")}
          </p>
        </section>

        {/* Online fallback */}
        <section aria-labelledby="city-online-heading" className="mb-10">
          <h2
            id="city-online-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "culinary_online_heading")}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {onlineSellers.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                >
                  <span className="block font-medium text-earth-900">{s.name}</span>
                  <span className="mt-1 block text-ink-600">{s.sells}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Update CTA + disclaimer */}
        <section className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5 text-sm">
          <p className="text-ink-700">
            {t(locale, "culinary_update_cta")}{" "}
            <Link to={`/${locale}/lead`} className="font-medium underline">
              {t(locale, "culinary_update_cta_link")}
            </Link>
          </p>
          <p className="mt-3 text-xs text-ink-600">{t(locale, "culinary_disclaimer")}</p>
        </section>

        {/* Other cities */}
        {otherCities.length > 0 && (
          <section aria-labelledby="other-cities-heading" className="mb-10">
            <h2
              id="other-cities-heading"
              className="mb-3 font-display text-base font-semibold text-earth-900"
            >
              {t(locale, "culinary_other_cities_heading")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${locale}${culinaryShoppingCityPath(c.slug)}`}
                    className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="border-t border-earth-200 pt-6 text-sm">
          <Link
            to={`/${locale}${culinaryPath()}`}
            className="inline-flex items-center gap-2 text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "culinary_back_to_pillar")}
          </Link>
          {" · "}
          <Link to={`/${locale}${sigdMenuPath()}`} className="hover:underline">
            {t(locale, "culinary_sigd_callout_link")}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
