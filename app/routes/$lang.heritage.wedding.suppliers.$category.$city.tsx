// /:lang/heritage/wedding/suppliers/:category/:city — the category × city
// cell of the Ethiopian wedding & henna supplier directory (TED-143).
//
// A cell exists ONLY where at least one verified supplier states that city on
// its own page. Every other combination 404s, exactly as the culinary
// where-to-buy pages do — a city page with nothing on it is worse than no
// page, and generating one per city would be an invitation to fill it.
//
// JSON-LD: ItemList of LocalBusiness + BreadcrumbList.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.heritage.wedding.suppliers.$category.$city";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WeddingSupplierList } from "~/components/sections/wedding-supplier-list";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import {
  weddingJoinPath,
  weddingPath,
  weddingSupplierCategoryPath,
  weddingSupplierCityPath,
} from "~/lib/heritage/links";
import { breadcrumbJsonLd, supplierItemListJsonLd } from "~/lib/heritage/schema";
import { isWeddingSupplierCategory } from "~/lib/heritage/wedding-categories";
import { weddingCopy } from "~/lib/heritage/wedding.server";
import {
  categoryName,
  cityPageDescription,
  cityPageTitle,
  citiesForCategory,
  presentSupplier,
  suppliersByCategoryCity,
} from "~/lib/heritage/wedding-suppliers.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const category = params.category;
  const citySlug = params.city;
  if (!category || !isWeddingSupplierCategory(category) || !citySlug) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const entries = suppliersByCategoryCity(category, citySlug);
  const city = CITIES.find((c) => c.slug === citySlug);
  // No verified supplier in this cell → no page. Never an empty city page.
  if (entries.length === 0 || !city) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const { PUBLIC_URL } = getEnv();
  const cityLocal = cityName(city, locale);
  const title = cityPageTitle(category, cityLocal, locale);
  const description = cityPageDescription(category, cityLocal, entries.length, locale);

  const otherCities = citiesForCategory(category)
    .filter((slug) => slug !== citySlug)
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ slug: c.slug, name: cityName(c, locale) }));

  const itemList = supplierItemListJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    {
      path: weddingSupplierCityPath(category, citySlug),
      name: title,
      description,
      suppliers: entries.map((s) => ({
        name: s.name,
        description: s.offers.he,
        url: s.sourceUrl,
        cityName: city.names.he,
        area: s.area.he,
      })),
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: weddingCopy("suppliersHeading", locale), path: weddingPath() },
    {
      name: categoryName(category, locale),
      path: weddingSupplierCategoryPath(category),
    },
    { name: title, path: weddingSupplierCityPath(category, citySlug) },
  ]);

  return {
    locale,
    publicUrl: PUBLIC_URL,
    category,
    citySlug,
    categoryLabel: categoryName(category, locale),
    title,
    description,
    suppliers: entries.map((s) => presentSupplier(s, locale)),
    otherCities,
    itemList,
    breadcrumb,
    copy: {
      joinCta: weddingCopy("joinCta", locale),
      joinCtaBody: weddingCopy("joinCtaBody", locale),
      callAhead: weddingCopy("callAhead", locale),
      citiesHeading: weddingCopy("citiesHeading", locale),
      backToHub: weddingCopy("backToHub", locale),
      source: weddingCopy("verifiedLabel", locale),
      datedBadge: weddingCopy("datedBadge", locale),
      checkedPrefix: weddingCopy("checkedPrefix", locale),
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const {
    locale,
    category,
    citySlug,
    title,
    description,
    publicUrl,
    itemList,
    breadcrumb,
  } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, weddingSupplierCityPath(category, citySlug)),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { "script:ld+json": itemList },
    { "script:ld+json": breadcrumb },
  ];
};

export default function WeddingSupplierCity({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    category,
    categoryLabel,
    title,
    description,
    suppliers,
    otherCities,
    copy,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${weddingPath()}`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${weddingPath()}`} className="hover:underline">
            {copy.backToHub}
          </Link>
          {" / "}
          <Link
            to={`/${locale}${weddingSupplierCategoryPath(category)}`}
            className="hover:underline"
          >
            {categoryLabel}
          </Link>
        </nav>

        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{description}</p>
        </header>

        <section className="mb-10" aria-labelledby="city-suppliers-heading">
          <h2 id="city-suppliers-heading" className="sr-only">
            {title}
          </h2>
          <WeddingSupplierList
            suppliers={suppliers}
            labels={{
              source: copy.source,
              datedBadge: copy.datedBadge,
              checkedPrefix: copy.checkedPrefix,
            }}
          />
          <p className="mt-3 text-xs leading-relaxed text-ink-600">{copy.callAhead}</p>
        </section>

        {otherCities.length > 0 && (
          <section className="mb-10" aria-labelledby="other-cities-heading">
            <h2
              id="other-cities-heading"
              className="mb-3 font-display text-base font-semibold text-earth-900"
            >
              {copy.citiesHeading}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${locale}${weddingSupplierCityPath(category, c.slug)}`}
                    className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {copy.joinCta}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{copy.joinCtaBody}</p>
          <Link
            to={`/${locale}${weddingJoinPath()}`}
            className="mt-3 inline-block text-sm font-medium text-earth-700 underline hover:text-earth-900"
          >
            {copy.joinCta}
          </Link>
        </section>

        <div className="border-t border-earth-200 pt-6 text-sm">
          <Link
            to={`/${locale}${weddingSupplierCategoryPath(category)}`}
            className="inline-flex items-center gap-2 text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {categoryLabel}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
