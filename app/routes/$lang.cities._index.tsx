import { Link } from "react-router";
import type { Route } from "./+types/$lang.cities._index";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { CITIES, CITY_PATH_PREFIX, cityName, cityPath } from "~/lib/cities/registry";

const REGIONS = ["center", "south", "north"] as const;

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
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12">
      <header>
        <Link
          to={`/${locale}`}
          className="text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-400"
        >
          ← {t(locale, "homepage_title")}
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "cities_index_title")}
        </h1>
        <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t(locale, "cities_index_lead")}
        </p>
      </header>

      <main className="mt-10 grid gap-10">
        {REGIONS.map((region) => {
          const cities = CITIES.filter((c) => c.region === region);
          if (cities.length === 0) return null;
          return (
            <section key={region} aria-labelledby={`region-${region}`}>
              <h2
                id={`region-${region}`}
                className="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {t(locale, `cities_region_${region}`)}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={cityPath(locale, c.slug)}
                      className="block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-400 hover:shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600"
                    >
                      <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {cityName(c, locale)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </div>
  );
}
