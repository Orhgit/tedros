// /:lang/heritage/kessim — Kessim & Ethiopian-community rabbis directory
// landing (TED-140). Lists the 31 cities in the official Ministry of
// Religious Services list, with per-city counts, and links into the city
// pages. JSON-LD: ItemList + BreadcrumbList.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.heritage.kessim._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  KESSIM_CITIES,
  KESSIM_DIRECTORY,
  KESSIM_SOURCE,
  kessimByCity,
  kessimCopy,
} from "~/lib/heritage/kessim.server";
import { kessimCityPath, kessimLandingPath, marriagePath } from "~/lib/heritage/links";
import { breadcrumbJsonLd, itemListJsonLd } from "~/lib/heritage/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const cities = KESSIM_CITIES.map((city) => {
    const entries = kessimByCity(city.slug);
    return {
      slug: city.slug,
      name: city.names[locale] ?? city.names.he,
      inRegistry: city.inRegistry,
      total: entries.length,
      kessimCount: entries.filter((e) => e.position === "kes").length,
      rabbisCount: entries.filter((e) => e.position !== "kes").length,
    };
  });

  return {
    locale,
    cities,
    // Long-form copy comes from the server module, not messages/*.json —
    // it would otherwise ship in the client message bundle (TED-115).
    subtitle: kessimCopy("landingSubtitle", locale),
    crosslinkBody: kessimCopy("marriageCrosslinkBody", locale),
    sourceCaveat: kessimCopy("sourceCaveat", locale),
    totalEntries: KESSIM_DIRECTORY.length,
    totalKessim: KESSIM_DIRECTORY.filter((e) => e.position === "kes").length,
    totalRabbis: KESSIM_DIRECTORY.filter((e) => e.position !== "kes").length,
    source: {
      govUrl: KESSIM_SOURCE.govUrl,
      dataGovUrl: KESSIM_SOURCE.dataGovUrl,
      publisher: KESSIM_SOURCE.publisher[locale] ?? KESSIM_SOURCE.publisher.he,
      updatedAt: KESSIM_SOURCE.updatedAt,
    },
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, cities, subtitle, publicUrl } = data;
  const title = t(locale, "kessim_landing_title");
  const description = subtitle;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, kessimLandingPath()),
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
          path: kessimLandingPath(),
          name: title,
          description,
          items: cities.map((c) => ({
            name: c.name,
            path: kessimCityPath(c.slug),
          })),
        },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: title, path: kessimLandingPath() },
      ]),
    },
  ];
};

export default function KessimLanding({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    cities,
    subtitle,
    crosslinkBody,
    sourceCaveat,
    totalEntries,
    totalKessim,
    totalRabbis,
    source,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${kessimLandingPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {t(locale, "kessim_landing_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
          <p className="mt-4 text-sm text-ink-600">
            {t(locale, "kessim_totals", {
              total: totalEntries,
              kessim: totalKessim,
              rabbis: totalRabbis,
              cities: cities.length,
            })}
          </p>
        </header>

        {/* Cross-link to the marriage guide — the most common reason to look
            for a kes. */}
        <section className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {t(locale, "kessim_marriage_crosslink_heading")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{crosslinkBody}</p>
          <Link
            to={`/${locale}${marriagePath()}`}
            className="mt-3 inline-block text-sm font-medium text-earth-700 underline hover:text-earth-900"
          >
            {t(locale, "kessim_marriage_crosslink_cta")}
          </Link>
        </section>

        <section aria-labelledby="kessim-cities-heading">
          <h2
            id="kessim-cities-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "kessim_cities_heading")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  to={`/${locale}${kessimCityPath(city.slug)}`}
                  className="block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                >
                  <h3 className="font-display text-base font-semibold text-earth-900">
                    {city.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">
                    {t(locale, "kessim_city_counts", {
                      kessim: city.kessimCount,
                      rabbis: city.rabbisCount,
                    })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Source attribution — required by the issue brief. */}
        <section className="mt-10 rounded-xl border border-earth-200 bg-earth-50 p-5">
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
          <p className="mt-3 text-xs text-ink-600">{sourceCaveat}</p>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
