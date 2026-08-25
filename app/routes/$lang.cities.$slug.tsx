import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { SiteHeader } from "~/components/sections/site-header";
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
import {
  listCityListingPreviews,
  type CityListingPreview,
} from "~/lib/db/queries/city-listings.server";
import { listRights } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { HERITAGE_EVENTS, nextDate } from "~/lib/heritage/events.server";
import { isRelevant as isHeritageRelevant } from "~/lib/heritage/relevance";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { glyphForTag } from "~/lib/rights/categories";
import { isRelevant as isRightRelevant } from "~/lib/rights/relevance";
import { neighborhoodName, neighborhoodsByCity } from "~/lib/urban-renewal/registry";

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

  const cityListings = await listCityListingPreviews(city.slug, 6).catch(() => []);

  const cityNeighborhoods = neighborhoodsByCity(city.slug).map((n) => ({
    slug: n.slug,
    name: neighborhoodName(n, locale),
  }));

  return {
    locale,
    city,
    publicUrl: PUBLIC_URL,
    cityRights,
    cityTracks,
    cityHeritage,
    cityListings,
    cityNeighborhoods,
  };
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
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
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
  const {
    locale,
    city,
    cityRights,
    cityTracks,
    cityHeritage,
    cityListings,
    cityNeighborhoods,
  } = loaderData;
  const name = cityName(city, locale);

  return (
    <>
      <SiteHeader locale={locale} currentPath={`/${locale}/cities/${city.slug}`} />
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
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-gray-500 dark:text-gray-400"
          >
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

          {(cityRights.length > 0 ||
            cityTracks.length > 0 ||
            cityHeritage.length > 0) && (
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

          <CityListingsSection locale={locale} city={city} listings={cityListings} />
          {cityNeighborhoods.length > 0 ? (
            <section
              aria-labelledby="city-urban-renewal-heading"
              className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
            >
              <h2
                id="city-urban-renewal-heading"
                className="text-xl font-semibold text-gray-900 dark:text-gray-100"
              >
                {t(locale, "city_section_urban_renewal_title")}
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {cityNeighborhoods.map((n) => (
                  <li key={n.slug}>
                    <Link
                      to={`/${locale}/urban-renewal/${n.slug}`}
                      className="flex items-center gap-2 rounded-md border border-earth-100 bg-earth-50 px-3 py-2 text-sm text-ink-800 transition hover:border-earth-300"
                    >
                      <span aria-hidden="true">🏗️</span>
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {cityNeighborhoods.length > 0 && (
                <Link
                  to={`/${locale}/cities/${city.slug}/urban-renewal`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-earth-700 hover:underline"
                >
                  {t(locale, "city_section_urban_renewal_aggregate_cta", { name })}
                  <span aria-hidden="true">←</span>
                </Link>
              )}
            </section>
          ) : (
            <CitySection
              locale={locale}
              titleKey="city_section_urban_renewal_title"
              emptyKey="city_section_urban_renewal_empty"
              city={city}
            />
          )}
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
    </>
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

function ListingCard({
  listing,
  locale,
  citySlug,
}: {
  listing: CityListingPreview;
  locale: Locale;
  citySlug: string;
}) {
  const title = (listing.title as { he: string }).he;
  const slug = (listing.slug as { he: string }).he;
  const attrs = listing.attributes as Record<string, unknown>;
  const externalUrl = attrs.externalSourceUrl as string | undefined;
  const href = externalUrl ?? `/${locale}/listings/${citySlug}/${listing.type}/${slug}`;
  const isExternal = !!externalUrl;

  const featuredUrl = attrs.featuredImageUrl as string | undefined;
  const previewImgs = featuredUrl
    ? [`/media/proxy?url=${encodeURIComponent(featuredUrl)}`]
    : [];

  const rooms = typeof attrs.rooms === "number" ? attrs.rooms : undefined;
  const area = typeof attrs.areaM2 === "number" ? attrs.areaM2 : undefined;
  const floor = typeof attrs.floor === "number" ? attrs.floor : undefined;
  const propType = typeof attrs.propertyType === "string" ? attrs.propertyType : null;
  const address = typeof attrs.address === "string" ? attrs.address : null;
  const price = listing.price
    ? `₪${Number(listing.price).toLocaleString("he-IL")}`
    : null;
  const isRent = listing.type === "rent";

  const typeBadgeColor =
    listing.type === "rent"
      ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
  const typeLabel = isRent ? "להשכרה" : "למכירה";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex h-105 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        {previewImgs.length > 0 ? (
          <img
            src={previewImgs[0]}
            alt={title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 dark:text-gray-700">
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        {/* Type badge */}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeBadgeColor}`}
        >
          {typeLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        {propType && (
          <p className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
            {propType}
          </p>
        )}
        <h3 className="line-clamp-2 text-base leading-snug font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {address && (
          <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {address}
          </p>
        )}

        <div className="mt-auto pt-3">
          {/* Price */}
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {price ?? (
              <span className="text-sm font-normal text-gray-400">מחיר לא צוין</span>
            )}
            {price && isRent && (
              <span className="text-sm font-normal text-gray-500"> / חודש</span>
            )}
          </p>

          {/* Specs chips */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {rooms !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                🛏 {rooms} חד׳
              </span>
            )}
            {area !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                📐 {area} מ״ר
              </span>
            )}
            {floor !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                🏢 קומה {floor}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

function CityListingsSection({
  locale,
  city,
  listings,
}: {
  locale: Locale;
  city: City;
  listings: CityListingPreview[];
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
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t(locale, "city_section_listings_title")}
          </h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {locale === "he"
              ? `${listings.length} נכסים זמינים ב${name}`
              : `${listings.length} available in ${name}`}
          </p>
        </div>
        <Link
          to={allUrl}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {locale === "he" ? "כל הנכסים" : "See all"}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      </div>

      <ul className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <li key={l.id} className="h-full">
            <ListingCard listing={l} locale={locale} citySlug={city.slug} />
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <Link
          to={allUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {locale === "he" ? `ראה את כל הנכסים ב${name}` : `All listings in ${name}`}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
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
