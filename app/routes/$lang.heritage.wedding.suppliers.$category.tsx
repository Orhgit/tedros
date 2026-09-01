// /:lang/heritage/wedding/suppliers/:category — one supplier category of the
// Ethiopian wedding & henna directory (TED-143).
//
// Verified-only: every supplier rendered carries a public source and a check
// date (see `wedding-suppliers.server.ts`). A category with nothing verifiable
// renders an explicit empty state and the join form as the call to action —
// it is NOT padded, and the page still exists, because saying "we looked and
// found nothing" is itself useful to someone searching for it.
//
// JSON-LD: ItemList of LocalBusiness + BreadcrumbList.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.heritage.wedding.suppliers.$category";
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
import {
  ALL_WEDDING_SUPPLIER_CATEGORIES,
  glyphForWeddingCategory,
  isWeddingSupplierCategory,
} from "~/lib/heritage/wedding-categories";
import { weddingCopy } from "~/lib/heritage/wedding.server";
import {
  categoryIntro,
  categoryName,
  categoryPageDescription,
  categoryPageTitle,
  citiesForCategory,
  presentSupplier,
  suppliersByCategory,
} from "~/lib/heritage/wedding-suppliers.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const category = params.category;
  if (!category || !isWeddingSupplierCategory(category)) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const { PUBLIC_URL } = getEnv();
  const entries = suppliersByCategory(category);
  const title = categoryPageTitle(category, locale);
  const description = categoryPageDescription(category, entries.length, locale);

  const suppliers = entries.map((s) => presentSupplier(s, locale));

  const cities = citiesForCategory(category)
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter((c) => c !== undefined)
    .map((c) => ({ slug: c.slug, name: cityName(c, locale) }));

  const itemList = supplierItemListJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    {
      path: weddingSupplierCategoryPath(category),
      name: title,
      description,
      suppliers: entries.map((s) => ({
        name: s.name,
        description: s.offers.he,
        url: s.sourceUrl,
        ...(s.citySlug
          ? { cityName: CITIES.find((c) => c.slug === s.citySlug)?.names.he }
          : {}),
      })),
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: weddingCopy("suppliersHeading", locale), path: weddingPath() },
    { name: title, path: weddingSupplierCategoryPath(category) },
  ]);

  return {
    locale,
    publicUrl: PUBLIC_URL,
    category,
    glyph: glyphForWeddingCategory(category),
    title,
    description,
    intro: categoryIntro(category, locale),
    suppliers,
    cities,
    hasUnlocated: entries.some((s) => !s.citySlug),
    otherCategories: ALL_WEDDING_SUPPLIER_CATEGORIES.filter((c) => c !== category).map(
      (c) => ({ slug: c, name: categoryName(c, locale) }),
    ),
    itemList,
    breadcrumb,
    copy: {
      emptyCategory: weddingCopy("emptyCategory", locale),
      joinCta: weddingCopy("joinCta", locale),
      joinCtaBody: weddingCopy("joinCtaBody", locale),
      callAhead: weddingCopy("callAhead", locale),
      citiesHeading: weddingCopy("citiesHeading", locale),
      noCityNote: weddingCopy("noCityNote", locale),
      otherCategoriesHeading: weddingCopy("otherCategoriesHeading", locale),
      backToHub: weddingCopy("backToHub", locale),
      source: weddingCopy("verifiedLabel", locale),
      datedBadge: weddingCopy("datedBadge", locale),
      checkedPrefix: weddingCopy("checkedPrefix", locale),
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, category, title, description, publicUrl, itemList, breadcrumb } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, weddingSupplierCategoryPath(category)),
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

export default function WeddingSupplierCategory({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    glyph,
    title,
    intro,
    suppliers,
    cities,
    hasUnlocated,
    otherCategories,
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
        </nav>

        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            <span aria-hidden="true">{glyph}</span> {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{intro}</p>
        </header>

        {suppliers.length === 0 ? (
          <section
            role="note"
            className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900"
          >
            {copy.emptyCategory}
          </section>
        ) : (
          <section className="mb-10" aria-labelledby="suppliers-heading">
            <h2 id="suppliers-heading" className="sr-only">
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
            {hasUnlocated && (
              <p className="mt-4 text-xs leading-relaxed text-ink-600">
                {copy.noCityNote}
              </p>
            )}
            <p className="mt-3 text-xs leading-relaxed text-ink-600">{copy.callAhead}</p>
          </section>
        )}

        {cities.length > 0 && (
          <section className="mb-10" aria-labelledby="supplier-cities-heading">
            <h2
              id="supplier-cities-heading"
              className="mb-3 font-display text-base font-semibold text-earth-900"
            >
              {copy.citiesHeading}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${locale}${weddingSupplierCityPath(loaderData.category, c.slug)}`}
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

        <section className="mb-10" aria-labelledby="other-categories-heading">
          <h2
            id="other-categories-heading"
            className="mb-3 font-display text-base font-semibold text-earth-900"
          >
            {copy.otherCategoriesHeading}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {otherCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/${locale}${weddingSupplierCategoryPath(c.slug)}`}
                  className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-earth-200 pt-6 text-sm">
          <Link
            to={`/${locale}${weddingPath()}`}
            className="inline-flex items-center gap-2 text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {copy.backToHub}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
