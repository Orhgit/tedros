import { Link } from "react-router";
import type { Route } from "./+types/$lang.cities._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { CITIES, CITY_PATH_PREFIX, cityName, cityPath } from "~/lib/cities/registry";

const REGIONS = ["jerusalem", "center", "south", "north"] as const;

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  const title = t(locale, "cities_index_meta_title");
  const description = t(locale, "cities_index_meta_description");
  const canonical = `${publicUrl}/${locale}${CITY_PATH_PREFIX}`;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: t(locale, "cities_index_keywords") },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { tagName: "link", rel: "canonical", href: canonical },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "he",
      href: `${publicUrl}/he${CITY_PATH_PREFIX}`,
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "en",
      href: `${publicUrl}/en${CITY_PATH_PREFIX}`,
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "am",
      href: `${publicUrl}/am${CITY_PATH_PREFIX}`,
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: `${publicUrl}/he${CITY_PATH_PREFIX}`,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: title,
        itemListElement: CITIES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: cityName(c, locale),
          url: `${publicUrl}${cityPath(locale, c.slug)}`,
        })),
      },
    },
  ];
};

export default function CitiesIndexPage({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${CITY_PATH_PREFIX}`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-green/5 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1734865934450-719ef6f59a37?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden="true" className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-yellow/15 blur-3xl" />
          <div aria-hidden="true" className="absolute -inset-s-16 -bottom-16 size-56 rounded-full bg-accent-green/10 blur-3xl" />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "homepage_title")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "cities_index_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "cities_index_lead")}
          </p>
        </header>

        <div className="grid gap-10">
          {REGIONS.map((region) => {
            const cities = CITIES.filter((c) => c.region === region);
            if (cities.length === 0) return null;
            return (
              <section key={region} aria-labelledby={`region-${region}`}>
                <h2
                  id={`region-${region}`}
                  className="mb-4 font-display text-xl font-semibold text-earth-900"
                >
                  {t(locale, `cities_region_${region}`)}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={cityPath(locale, c.slug)}
                        className="block rounded-lg border border-border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-accent-green/60 hover:shadow-md"
                      >
                        <span className="text-base font-medium text-earth-900">
                          {cityName(c, locale)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
