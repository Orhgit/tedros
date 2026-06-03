import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import type { Route } from "./+types/$lang.cities.$slug";
import { CAREER_TRACKS } from "~/lib/careers/careers.server";
import { isRelevant as isCareerRelevant } from "~/lib/careers/relevance";
import {
  CITY_PATH_PREFIX,
  cityName,
  cityOverview,
  cityPath,
  findCityBySlug,
  type City,
} from "~/lib/cities/registry";
import { listPublicListings, type PublicListingSummary } from "~/lib/db/queries/listings.server";
import { listRights } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { HERITAGE_EVENTS, nextDate } from "~/lib/heritage/events.server";
import { isRelevant as isHeritageRelevant } from "~/lib/heritage/relevance";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { glyphForTag } from "~/lib/rights/categories";
import { isRelevant as isRightRelevant } from "~/lib/rights/relevance";

const MORTGAGE_CALC_PATH = "/calculator/mortgage-ethiopian-immigrants";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const slug = params.slug ?? "";
  const city = findCityBySlug(slug);
  if (!city) {
    throw new Response("City not found", { status: 404 });
  }
  const { PUBLIC_URL } = getEnv();

  const cityRights = listRights(locale)
    .filter((r) => isRightRelevant(r.slug, city.slug))
    .slice(0, 8);

  const cityTracks = CAREER_TRACKS.filter((tr) => isCareerRelevant(tr.slug, city.slug))
    .slice(0, 6)
    .map((tr) => ({ slug: tr.slug, name: tr.name[locale] ?? tr.name.he }));

  const cityHeritage = HERITAGE_EVENTS.filter((e) =>
    isHeritageRelevant(e.slug, city.slug),
  ).map((e) => ({
    slug: e.slug,
    name: e.name[locale] ?? e.name.he,
    next: nextDate(e),
  }));

  const { items: cityListings } = await listPublicListings(
    { citySlugHe: city.slug },
    0,
  ).catch(() => ({ items: [] as PublicListingSummary[], total: 0 }));

  return { locale, city, publicUrl: PUBLIC_URL, cityRights, cityTracks, cityHeritage, cityListings: cityListings.slice(0, 6) };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, city, publicUrl } = data;
  const name = cityName(city, locale);
  const title = t(locale, "city_meta_title", { name });
  const description = t(locale, "city_meta_description", { name });
  const canonical = `${publicUrl}${cityPath(locale, city.slug)}`;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: t(locale, "city_keywords", { name }) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...hreflangMeta(publicUrl, locale, `${CITY_PATH_PREFIX}/${city.slug}`),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "City",
        name,
        url: canonical,
        inLanguage: locale,
        addressCountry: "IL",
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.geo.lat,
          longitude: city.geo.lon,
        },
      },
    },
  ];
};

export default function CityPage({ loaderData }: Route.ComponentProps) {
  const { locale, city, cityRights, cityTracks, cityHeritage, cityListings } = loaderData;
  const name = cityName(city, locale);

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12">
      <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
        <img
          src="https://images.unsplash.com/photo-1734865934450-719ef6f59a37?fm=webp&q=70&w=1200&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
          aria-hidden="true"
        />
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to={`/${locale}`} className="hover:underline">
                {t(locale, "homepage_title")}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link to={`/${locale}${CITY_PATH_PREFIX}`} className="hover:underline">
                {t(locale, "cities_index_title")}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li aria-current="page" className="text-gray-700 dark:text-gray-300">
              {name}
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "city_page_h1", { name })}
        </h1>
        <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t(locale, "city_page_lead", { name })}
        </p>
      </header>

      <main className="mt-10 grid gap-10">
        <CityOverviewSection locale={locale} city={city} />
        {city.communityStats && city.communityStats.length > 0 && (
          <CommunityStatsSection locale={locale} city={city} />
        )}

        {(cityRights.length > 0 || cityTracks.length > 0 || cityHeritage.length > 0) && (
          <section className="rounded-lg border border-earth-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-earth-900">
              {t(locale, "city_section_overview_title", { name })}
            </h2>

            {cityRights.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold tracking-wide text-earth-700 uppercase">
                  {t(locale, "rights_landing_title")}
                </h3>
                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {cityRights.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/${locale}/rights/${r.slug}/${city.slug}`}
                        className="flex items-center gap-2 rounded-md border border-earth-100 bg-earth-50 px-3 py-2 text-sm text-ink-800 transition hover:border-earth-300"
                      >
                        <span aria-hidden="true">
                          {glyphForTag(r.tags[0] ?? "housing")}
                        </span>
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cityTracks.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold tracking-wide text-earth-700 uppercase">
                  {t(locale, "careers_breadcrumb_careers")}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {cityTracks.map((tr) => (
                    <li key={tr.slug}>
                      <Link
                        to={`/${locale}/careers/${tr.slug}/${city.slug}`}
                        className="rounded-full border border-earth-200 bg-earth-50 px-3 py-1 text-sm text-ink-700 transition hover:border-earth-400"
                      >
                        {tr.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cityHeritage.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold tracking-wide text-earth-700 uppercase">
                  {t(locale, "heritage_events_landing_title")}
                </h3>
                <ul className="mt-2 space-y-1">
                  {cityHeritage.map((e) => (
                    <li key={e.slug}>
                      <Link
                        to={`/${locale}/heritage/events/${e.slug}/${city.slug}`}
                        className="flex items-center justify-between rounded-md border border-earth-100 bg-earth-50 px-3 py-2 text-sm text-ink-800 transition hover:border-earth-300"
                      >
                        <span>{e.name}</span>
                        {e.next && (
                          <span className="text-xs text-earth-500">{e.next}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        <CityListingsSection
          locale={locale}
          city={city}
          listings={cityListings}
        />
        <CitySection
          locale={locale}
          titleKey="city_section_urban_renewal_title"
          emptyKey="city_section_urban_renewal_empty"
          city={city}
        />
        <CitySection
          locale={locale}
          titleKey="city_section_professionals_title"
          emptyKey="city_section_professionals_empty"
          city={city}
        />
        <MortgageCalculatorCta locale={locale} city={city} />
        <CitySection
          locale={locale}
          titleKey="city_section_community_title"
          emptyKey="city_section_community_body"
          city={city}
          tone="info"
        />
      </main>

      <footer className="mt-16 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-800">
        <Link to={`/${locale}${CITY_PATH_PREFIX}`} className="hover:underline">
          ← {t(locale, "cities_back_to_index")}
        </Link>
      </footer>
    </div>
  );
}

function CityOverviewSection({ locale, city }: { locale: Locale; city: City }) {
  const name = cityName(city, locale);
  return (
    <section
      aria-labelledby="city-overview-heading"
      className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
    >
      <h2
        id="city-overview-heading"
        className="text-xl font-semibold text-gray-900 dark:text-gray-100"
      >
        {t(locale, "city_section_overview_title", { name })}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {cityOverview(city, locale)}
      </p>
    </section>
  );
}

function CommunityStatsSection({ locale, city }: { locale: Locale; city: City }) {
  const name = cityName(city, locale);
  const stats = city.communityStats ?? [];
  return (
    <section
      aria-labelledby="community-stats-heading"
      className="rounded-lg border border-earth-200 bg-earth-50/60 p-6"
    >
      <h2 id="community-stats-heading" className="text-xl font-semibold text-earth-900">
        {locale === "he"
          ? `קהילה אתיופית ב${name} — נתונים`
          : locale === "am"
            ? `${name} ውስጥ ኢትዮጵያ ማህበረሰብ`
            : `Ethiopian community in ${name}`}
      </h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((s, i) => (
          <div key={i} className="rounded-md border border-earth-100 bg-white px-4 py-3">
            <dt className="text-xs font-medium text-earth-600">
              {s.label[locale] ?? s.label.he}
            </dt>
            <dd className="mt-1 text-base font-semibold text-earth-900">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function MortgageCalculatorCta({ locale, city }: { locale: Locale; city: City }) {
  const name = cityName(city, locale);
  return (
    <section
      aria-labelledby="city-tools-heading"
      className="rounded-lg border border-emerald-300 bg-emerald-50 p-6 dark:border-emerald-700 dark:bg-emerald-950"
    >
      <h2
        id="city-tools-heading"
        className="text-xl font-semibold text-emerald-900 dark:text-emerald-100"
      >
        {t(locale, "city_section_tools_title")}
      </h2>
      <h3 className="mt-3 text-base font-medium text-emerald-900 dark:text-emerald-100">
        {t(locale, "mortgage_calc_title")}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
        {t(locale, "city_calc_cta_body", { name })}
      </p>
      <Link
        to={`/${locale}${MORTGAGE_CALC_PATH}`}
        className="mt-3 inline-block text-sm font-medium text-emerald-900 underline-offset-4 hover:underline dark:text-emerald-100"
      >
        {t(locale, "cta_open_calculator")}
      </Link>
    </section>
  );
}

function CityListingsSection({
  locale,
  city,
  listings,
}: {
  locale: Locale;
  city: City;
  listings: PublicListingSummary[];
}) {
  const name = cityName(city, locale);
  const allUrl = `/${locale}/listings?city=${city.slug}`;

  if (listings.length === 0) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {t(locale, "city_section_listings_title")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {t(locale, "city_section_listings_empty", { name })}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {t(locale, "city_section_listings_title")}
        </h2>
        <Link
          to={allUrl}
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          {locale === "he" ? `כל הנכסים ב${name} ←` : `All listings in ${name} →`}
        </Link>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => {
          const title = (l.title as { he: string }).he;
          const slug = (l.slug as { he: string }).he;
          const attrs = l.attributes as Record<string, unknown>;
          const externalUrl = attrs.externalSourceUrl as string | undefined;
          const rooms = typeof attrs.rooms === "number" ? attrs.rooms : undefined;
          const area = typeof attrs.areaM2 === "number" ? attrs.areaM2 : undefined;
          const price = l.price ? `₪${l.price.toLocaleString()}` : null;

          return (
            <li key={l.id}>
              <a
                href={externalUrl ?? `/${locale}/listings/${city.slug}/${l.type}/${slug}`}
                target={externalUrl ? "_blank" : undefined}
                rel={externalUrl ? "noopener noreferrer" : undefined}
                className="block rounded-md border border-gray-100 bg-gray-50 p-3 text-sm transition hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-600"
              >
                <p className="font-medium text-gray-900 line-clamp-2 dark:text-gray-100">{title}</p>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {price ?? "—"}
                  {rooms !== undefined ? ` · ${rooms} חדרים` : ""}
                  {area !== undefined ? ` · ${area} מ"ר` : ""}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 text-center">
        <Link
          to={allUrl}
          className="inline-block rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
        >
          {locale === "he" ? "ראה כל הנכסים" : "See all listings"}
        </Link>
      </div>
    </section>
  );
}

function CitySection({
  locale,
  titleKey,
  emptyKey,
  city,
  tone = "neutral",
}: {
  locale: Locale;
  titleKey: string;
  emptyKey: string;
  city: City;
  tone?: "neutral" | "info";
}) {
  const name = cityName(city, locale);
  const wrapperClass =
    tone === "info"
      ? "rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950"
      : "rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950";

  return (
    <section aria-labelledby={titleKey} className={wrapperClass}>
      <h2
        id={titleKey}
        className="text-xl font-semibold text-gray-900 dark:text-gray-100"
      >
        {t(locale, titleKey)}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {t(locale, emptyKey, { name })}
      </p>
    </section>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const isNotFound = status === 404;
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold">{status}</h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
        {isNotFound ? "City not found." : "Unexpected error."}
      </p>
    </main>
  );
}
