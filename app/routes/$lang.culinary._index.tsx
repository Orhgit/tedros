// /:lang/culinary — Culinary pillar (TED-146).
//
// Ethiopian-Jewish cuisine in Israel: the staples (injera/teff, berbere,
// dabo, buna) with cultural/religious context first — not recipes — plus
// the teff/gluten-free consumer section, links into the where-to-buy city
// pages, and the Sigd menu guide.
//
// Schema.org: WebPage + BreadcrumbList (computed in loader, server only).

import { Link } from "react-router";

import type { Route } from "./+types/$lang.culinary._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { culinaryPath, culinaryShoppingCityPath, sigdMenuPath } from "~/lib/culinary/links";
import { breadcrumbJsonLd, webPageJsonLd, type JsonLd } from "~/lib/culinary/schema";
import {
  CULINARY_STAPLES,
  stapleBody,
  stapleSummary,
  stapleTitle,
} from "~/lib/culinary/staples.server";
import { CITY_SHOPPING, ONLINE_SELLERS, localized } from "~/lib/culinary/shops.server";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const staples = CULINARY_STAPLES.map((s) => ({
    slug: s.slug,
    kind: s.kind,
    title: stapleTitle(s, locale),
    summary: stapleSummary(s, locale),
    html: renderMarkdown(stapleBody(s, locale)),
  }));

  const shoppingCities = CITY_SHOPPING.map((entry) => {
    const city = CITIES.find((c) => c.slug === entry.citySlug);
    return {
      slug: entry.citySlug,
      name: city ? cityName(city, locale) : entry.citySlug,
      shopCount: entry.shops.length,
    };
  });

  const onlineSellers = ONLINE_SELLERS.map((s) => ({
    name: s.name,
    url: s.url,
    sells: localized(s.sells, locale),
  }));

  const title = t(locale, "culinary_title");
  const description = t(locale, "culinary_subtitle");

  const webPage: JsonLd = webPageJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    { path: culinaryPath(), name: title, description },
  );
  const breadcrumb: JsonLd = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: title, path: culinaryPath() },
  ]);

  return {
    locale,
    staples,
    shoppingCities,
    onlineSellers,
    title,
    description,
    publicUrl: PUBLIC_URL,
    webPage,
    breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, description, publicUrl, webPage, breadcrumb } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, culinaryPath()),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": webPage },
    { "script:ld+json": breadcrumb },
  ];
};

export default function CulinaryPillar({ loaderData }: Route.ComponentProps) {
  const { locale, staples, shoppingCities, onlineSellers, title, description } =
    loaderData;

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
          <span aria-current="page">{title}</span>
        </nav>

        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{description}</p>
        </header>

        {/* Sigd menu callout */}
        <section className="mb-8 rounded-xl border border-accent-sigd/30 bg-accent-sigd/5 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {t(locale, "culinary_sigd_callout_heading")}
          </h2>
          <p className="mt-1 text-sm text-ink-700">
            {t(locale, "culinary_sigd_callout_text")}
          </p>
          <Link
            to={`/${locale}${sigdMenuPath()}`}
            className="mt-2 inline-block text-sm font-medium text-earth-800 underline hover:text-earth-600"
          >
            {t(locale, "culinary_sigd_callout_link")}{" "}
            <span aria-hidden="true" className="icon-flip inline-block">
              →
            </span>
          </Link>
        </section>

        {/* Staples */}
        {staples.map((staple) => (
          <section
            key={staple.slug}
            id={staple.slug}
            aria-labelledby={`staple-${staple.slug}`}
            className="mb-10 rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
          >
            <h2
              id={`staple-${staple.slug}`}
              className="font-display text-xl font-semibold text-earth-900"
            >
              {staple.title}
            </h2>
            <p className="mt-1 text-sm text-ink-600">{staple.summary}</p>
            <div
              className="prose prose-ink mt-4 max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: staple.html }}
            />
          </section>
        ))}

        {/* Where to buy — city pages */}
        <section
          className="mb-10"
          aria-labelledby="culinary-shopping-heading"
          id="shopping"
        >
          <h2
            id="culinary-shopping-heading"
            className="font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "culinary_shopping_heading")}
          </h2>
          <p className="mt-2 text-sm text-ink-700">
            {t(locale, "culinary_shopping_intro")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {shoppingCities.map((c) => (
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

        {/* Online sellers */}
        <section className="mb-10" aria-labelledby="culinary-online-heading">
          <h2
            id="culinary-online-heading"
            className="font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "culinary_online_heading")}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
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

        <p className="mb-10 rounded-lg border border-earth-200 bg-earth-50 p-4 text-xs text-ink-600">
          {t(locale, "culinary_disclaimer")}
        </p>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
