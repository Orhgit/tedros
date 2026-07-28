// Urban-renewal vertical index — global entry point (internal-linking audit
// finding: the 15 neighborhood pages + 7 city aggregates were previously
// reachable only via Home -> Cities -> [city] -> Urban Renewal tab, with no
// site-wide nav/footer link and no index page of their own). This route adds
// that missing entry point without introducing a parallel URL namespace —
// it's simply an index over the `/urban-renewal/:slug` tree that already
// exists (see ADR-016/ADR-017).

import { Link } from "react-router";
import type { Route } from "./+types/$lang.urban-renewal._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { cityName, cityPath, findCityBySlug } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { CITY_URBAN_RENEWAL_SLUGS } from "~/lib/urban-renewal/city-aggregate";
import {
  neighborhoodName,
  neighborhoodPath,
  neighborhoodsByCity,
  URBAN_RENEWAL_PATH_PREFIX,
} from "~/lib/urban-renewal/registry";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const cities = CITY_URBAN_RENEWAL_SLUGS.map((slug) => findCityBySlug(slug))
    .filter((c) => c !== undefined)
    .map((city) => ({
      city,
      neighborhoods: neighborhoodsByCity(city.slug),
    }));

  return { locale, publicUrl: PUBLIC_URL, cities };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  const title = t(locale, "urw_index_meta_title");
  const description = t(locale, "urw_index_meta_description");
  const canonical = `${publicUrl}/${locale}${URBAN_RENEWAL_PATH_PREFIX}`;

  const itemListElement =
    data?.cities.flatMap(({ neighborhoods }) =>
      neighborhoods.map((n) => ({
        name: neighborhoodName(n, locale),
        url: `${publicUrl}${neighborhoodPath(locale, n.slug)}`,
      })),
    ) ?? [];

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: t(locale, "urw_index_keywords") },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...hreflangMeta(publicUrl, locale, URBAN_RENEWAL_PATH_PREFIX),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: title,
        itemListElement: itemListElement.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: item.url,
        })),
      },
    },
  ];
};

export default function UrbanRenewalIndexPage({ loaderData }: Route.ComponentProps) {
  const { locale, cities } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader
        locale={locale}
        currentPath={`/${locale}${URBAN_RENEWAL_PATH_PREFIX}`}
      />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="mb-10">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "homepage_title")}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "urw_index_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "urw_index_lead")}
          </p>
        </header>

        <div className="grid gap-10">
          {cities.map(({ city, neighborhoods }) => (
            <section key={city.slug} aria-labelledby={`city-${city.slug}`}>
              <h2
                id={`city-${city.slug}`}
                className="mb-4 font-display text-xl font-semibold text-earth-900"
              >
                <Link
                  to={`${cityPath(locale, city.slug)}/urban-renewal`}
                  className="hover:underline"
                >
                  {cityName(city, locale)}
                </Link>
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {neighborhoods.map((n) => (
                  <li key={n.slug}>
                    <Link
                      to={neighborhoodPath(locale, n.slug)}
                      className="block rounded-lg border border-border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-accent-green/60 hover:shadow-md"
                    >
                      <span className="text-base font-medium text-earth-900">
                        {neighborhoodName(n, locale)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
