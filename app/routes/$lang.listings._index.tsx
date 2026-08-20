// Public listings index — `/{lang}/listings` (TED-21).
//
// Loader filters via `publiclyVisibleListing()` (only verified-agency,
// status='active', published rows). Server-rendered for SEO + LCP.

import { Form, Link } from "react-router";
import { SiteHeader } from "~/components/sections/site-header";
import type { Route } from "./+types/$lang.listings._index";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { getEnv } from "~/lib/env.server";
import {
  listCitiesForFilter,
  listPublicListings,
  type ListingType,
  type PublicListingSummary,
} from "~/lib/db/queries/listings.server";

const LISTING_TYPES: ListingType[] = [
  "sale",
  "rent",
  "urban_renewal",
  "investment",
  "gov_program",
  "commercial",
];

function pickLocale<T extends Partial<Record<Locale, string>>>(
  obj: T,
  locale: Locale,
): string {
  return obj[locale] ?? obj.he ?? "";
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const url = new URL(request.url);
  const citySlugHe = url.searchParams.get("city") || undefined;
  const typeParam = url.searchParams.get("type");
  const type = (LISTING_TYPES as string[]).includes(typeParam ?? "")
    ? (typeParam as ListingType)
    : undefined;
  const minPriceRaw = url.searchParams.get("min_price");
  const maxPriceRaw = url.searchParams.get("max_price");
  const minRoomsRaw = url.searchParams.get("min_rooms");
  const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;
  const minRooms = minRoomsRaw ? Number(minRoomsRaw) : undefined;
  const page = Math.max(0, Number(url.searchParams.get("page") ?? 0));

  const [{ items, total }, citiesList] = await Promise.all([
    listPublicListings(
      {
        citySlugHe,
        type,
        minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
        maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
        minRooms: Number.isFinite(minRooms) ? minRooms : undefined,
      },
      page,
    ),
    listCitiesForFilter(),
  ]);

  const { PUBLIC_URL } = getEnv();
  return {
    locale,
    publicUrl: PUBLIC_URL,
    items,
    total,
    cities: citiesList,
    filters: {
      city: citySlugHe ?? "",
      type: type ?? "",
      minPrice: minPriceRaw ?? "",
      maxPrice: maxPriceRaw ?? "",
      minRooms: minRoomsRaw ?? "",
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "";
  const title = t(locale, "listings_title");
  const description = t(locale, "listings_intro");
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    ...hreflangMeta(publicUrl, locale, "/listings"),
  ];
};

export default function ListingsIndex({ loaderData }: Route.ComponentProps) {
  const { locale, items, total, cities, filters } = loaderData;

  return (
    <>
      <SiteHeader locale={locale} currentPath={`/${locale}/listings`} />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {t(locale, "listings_title")}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t(locale, "listings_intro")}
          </p>
        </header>

        <Form
          method="get"
          className="mb-8 grid grid-cols-1 gap-3 rounded-lg border border-gray-200 p-4 sm:grid-cols-2 lg:grid-cols-6 dark:border-gray-800"
        >
          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">{t(locale, "listings_filter_city")}</span>
            <select
              name="city"
              defaultValue={filters.city}
              className="rounded border border-gray-300 px-2 py-1.5 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="">{t(locale, "listings_filter_any")}</option>
              {cities.map((c) => (
                <option key={c.id} value={c.slugHe}>
                  {pickLocale(c.name, locale)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">{t(locale, "listings_filter_type")}</span>
            <select
              name="type"
              defaultValue={filters.type}
              className="rounded border border-gray-300 px-2 py-1.5 dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="">{t(locale, "listings_filter_any")}</option>
              {LISTING_TYPES.map((tp) => (
                <option key={tp} value={tp}>
                  {t(locale, `listings_type_${tp}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">
              {t(locale, "listings_filter_min_price")}
            </span>
            <input
              type="number"
              name="min_price"
              inputMode="numeric"
              min={0}
              defaultValue={filters.minPrice}
              className="rounded border border-gray-300 px-2 py-1.5 dark:border-gray-700 dark:bg-gray-900"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">
              {t(locale, "listings_filter_max_price")}
            </span>
            <input
              type="number"
              name="max_price"
              inputMode="numeric"
              min={0}
              defaultValue={filters.maxPrice}
              className="rounded border border-gray-300 px-2 py-1.5 dark:border-gray-700 dark:bg-gray-900"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium">
              {t(locale, "listings_filter_min_rooms")}
            </span>
            <input
              type="number"
              name="min_rooms"
              inputMode="decimal"
              step="0.5"
              min={0}
              defaultValue={filters.minRooms}
              className="rounded border border-gray-300 px-2 py-1.5 dark:border-gray-700 dark:bg-gray-900"
            />
          </label>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              {t(locale, "listings_filter_apply")}
            </button>
            <Link
              to={`/${locale}/listings`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              {t(locale, "listings_filter_clear")}
            </Link>
          </div>
        </Form>

        <p className="mb-4 text-sm text-gray-500" data-testid="results-count">
          {t(locale, "listings_results_count", { count: total })}
        </p>

        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700">
            {t(locale, "listings_empty")}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id}>
                <ListingCard item={item} locale={locale} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function ListingCard({ item, locale }: { item: PublicListingSummary; locale: Locale }) {
  const title = pickLocale(item.title, locale);
  const slug = pickLocale(item.slug, locale) || item.slug.he;
  const cityName = pickLocale(item.city.name, locale);
  const href = `/${locale}/listings/${item.city.slugHe}/${item.type}/${slug}`;
  const rooms = (item.attributes as { rooms?: number }).rooms;
  const areaM2 = (item.attributes as { areaM2?: number }).areaM2;
  const currency =
    ((item.attributes as { currency?: string }).currency as
      | "ILS"
      | "USD"
      | "EUR"
      | undefined) ?? "ILS";

  return (
    <Link
      to={href}
      className="block h-full rounded-lg border border-gray-200 p-4 transition hover:border-gray-400 hover:shadow-sm dark:border-gray-800 dark:hover:border-gray-600"
    >
      <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {t(locale, `listings_type_${item.type}`)}
      </span>
      <h3 className="mt-2 text-lg leading-snug font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {cityName}
        {item.neighborhood ? ` · ${pickLocale(item.neighborhood.name, locale)}` : ""}
      </p>
      <p className="mt-3 text-xl font-bold">
        {item.price === null
          ? "—"
          : `${t(locale, `listing_price_currency_${currency.toLowerCase()}` as const)}${item.price.toLocaleString()}`}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        {[
          rooms !== undefined ? t(locale, "listing_rooms", { rooms }) : null,
          areaM2 !== undefined ? t(locale, "listing_area_m2", { area: areaM2 }) : null,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </Link>
  );
}
