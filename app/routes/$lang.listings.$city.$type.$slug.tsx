// Public listing detail — `/{lang}/listings/{city}/{type}/{slug}` (TED-21).
//
// Loader resolves by HE slug (canonical lookup), renders title/body/attrs,
// embeds JSON-LD `RealEstateListing`, and serves the lead-capture form.
// The `action` validates with `leadSubmissionSchema` and inserts.

import { useEffect, useRef } from "react";
import { Form, Link, data } from "react-router";
import { SiteHeader } from "~/components/sections/site-header";
import type { Route } from "./+types/$lang.listings.$city.$type.$slug";

import { db } from "~/lib/db.server";
import { leads, listings } from "~/lib/db/schema/realestate";
import { eq } from "drizzle-orm";
import {
  getPublicListingByPath,
  type ListingType,
  type PublicListingDetail,
} from "~/lib/db/queries/listings.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { leadSubmissionSchema } from "~/lib/validation/lead";

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

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const city = params.city ?? "";
  const type = params.type ?? "";
  const slug = params.slug ?? "";

  if (!(LISTING_TYPES as string[]).includes(type)) {
    throw new Response("Not found", { status: 404 });
  }

  const listing = await getPublicListingByPath({
    citySlugHe: city,
    type: type as ListingType,
    slugHe: slug,
  });
  if (!listing) {
    throw new Response("Not found", { status: 404 });
  }
  const { PUBLIC_URL } = getEnv();
  return { locale, listing, publicUrl: PUBLIC_URL };
}

export async function action({ request, params }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const formData = await request.formData();
  const url = new URL(request.url);

  const consent = formData.get("consent") === "on";
  const raw = {
    listingId: formData.get("listingId"),
    name: formData.get("name"),
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
    message: formData.get("message") || undefined,
    consent: consent ? (true as const) : undefined,
    metadata: {
      page: url.pathname,
      referer: request.headers.get("referer") ?? undefined,
      locale,
    },
  };

  const parsed = leadSubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));
    return data({ ok: false as const, issues }, { status: 400 });
  }

  // Resolve agency_id from the listing — the lead row denormalises it.
  const listingId = parsed.data.listingId;
  if (!listingId) {
    return data(
      { ok: false as const, issues: [{ path: "listingId", message: "required" }] },
      { status: 400 },
    );
  }
  const targetRows = await db
    .select({ agencyId: listings.agencyId })
    .from(listings)
    .where(eq(listings.id, listingId))
    .limit(1);
  const target = targetRows[0];
  if (!target) {
    return data(
      { ok: false as const, issues: [{ path: "listingId", message: "not found" }] },
      { status: 404 },
    );
  }

  await db.insert(leads).values({
    listingId: parsed.data.listingId,
    agencyId: target.agencyId,
    name: parsed.data.name,
    email: parsed.data.email ?? null,
    phone: parsed.data.phone ?? null,
    message: parsed.data.message ?? null,
    metadata: parsed.data.metadata ?? {},
  });

  return { ok: true as const };
}

export const meta: Route.MetaFunction = ({ data, params }) => {
  if (!data) return [{ title: "Not found" }];
  const locale = data.locale ?? DEFAULT_LOCALE;
  const title = pickLocale(data.listing.title, locale);
  const cityName = pickLocale(data.listing.city.name, locale);
  const description = (data.listing.body[locale] ?? data.listing.body.he ?? title).slice(
    0,
    200,
  );
  const path = `/listings/${params.city}/${params.type}/${params.slug}`;

  return [
    { title: `${title} · ${cityName}` },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${data.publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${data.publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    ...hreflangMeta(data.publicUrl, locale, path),
  ];
};

export default function ListingDetail({ loaderData, actionData }: Route.ComponentProps) {
  const { locale, listing, publicUrl } = loaderData;
  const title = pickLocale(listing.title, locale);
  const cityName = pickLocale(listing.city.name, locale);
  const body = listing.body[locale] ?? listing.body.he ?? "";

  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (actionData?.ok) successRef.current?.focus();
  }, [actionData]);

  const jsonLd = buildRealEstateJsonLd({ listing, locale, publicUrl });

  return (
    <>
      <SiteHeader locale={locale} currentPath={`/${locale}/listings`} />
      <article className="mx-auto max-w-3xl px-6 py-10">
        <p className="mb-4 text-sm">
          <Link
            to={`/${locale}/listings`}
            className="text-gray-600 underline hover:text-gray-900 dark:text-gray-400"
          >
            {t(locale, "listing_back_to_results")}
          </Link>
        </p>

        <header>
          <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {t(locale, `listings_type_${listing.type}`)}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {cityName}
            {listing.neighborhood
              ? ` · ${pickLocale(listing.neighborhood.name, locale)}`
              : ""}
          </p>
        </header>

        {typeof (listing.attributes as Record<string, unknown>).externalSourceUrl ===
          "string" && (
          <p className="mt-3 text-sm">
            <a
              href={
                (listing.attributes as Record<string, unknown>)
                  .externalSourceUrl as string
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
            >
              {locale === "he"
                ? "צפה בנכס במרכז הנכסים ↗"
                : "View on Merkaz HaNekhasim ↗"}
            </a>
          </p>
        )}

        <PriceLine listing={listing} locale={locale} />
        <AttributesGrid listing={listing} locale={locale} />

        {body && (
          <section className="prose prose-sm mt-6 max-w-none whitespace-pre-line text-gray-800 dark:text-gray-200">
            {body}
          </section>
        )}

        <section
          aria-labelledby="lead-form-heading"
          className="mt-10 rounded-lg border border-gray-200 p-6 dark:border-gray-800"
        >
          <h2 id="lead-form-heading" className="text-xl font-semibold">
            {t(locale, "listing_lead_form_title")}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t(locale, "listing_lead_form_intro")}
          </p>

          {actionData?.ok ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="mt-4 rounded border border-green-300 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
            >
              {t(locale, "listing_lead_thanks")}
            </div>
          ) : (
            <LeadForm listingId={listing.id} locale={locale} actionData={actionData} />
          )}
        </section>

        <script
          type="application/ld+json"
          // JSON-LD is server-rendered so search engines pick it up before JS hydrates.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>
    </>
  );
}

function PriceLine({
  listing,
  locale,
}: {
  listing: PublicListingDetail;
  locale: Locale;
}) {
  const currency =
    ((listing.attributes as { currency?: string }).currency as
      | "ILS"
      | "USD"
      | "EUR"
      | undefined) ?? "ILS";
  const prefix = t(locale, `listing_price_currency_${currency.toLowerCase()}` as const);
  return (
    <p className="mt-6 text-3xl font-bold">
      {listing.price === null ? "—" : `${prefix}${listing.price.toLocaleString()}`}
    </p>
  );
}

function AttributesGrid({
  listing,
  locale,
}: {
  listing: PublicListingDetail;
  locale: Locale;
}) {
  const a = listing.attributes as Record<string, unknown>;
  const items: Array<{ label: string; value: string }> = [];
  if (typeof a.rooms === "number")
    items.push({ label: t(locale, "listings_filter_min_rooms"), value: String(a.rooms) });
  if (typeof a.areaM2 === "number") items.push({ label: "m²", value: String(a.areaM2) });
  if (typeof a.bedrooms === "number")
    items.push({ label: "bedrooms", value: String(a.bedrooms) });
  if (typeof a.floor === "number") items.push({ label: "floor", value: String(a.floor) });
  if (typeof a.parkingSpots === "number")
    items.push({ label: "parking", value: String(a.parkingSpots) });
  if (typeof a.yearBuilt === "number")
    items.push({ label: "year", value: String(a.yearBuilt) });

  if (items.length === 0) return null;
  return (
    <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded border border-gray-200 p-3 text-sm dark:border-gray-800"
        >
          <dt className="text-xs text-gray-500 uppercase">{it.label}</dt>
          <dd className="mt-0.5 font-medium">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function LeadForm({
  listingId,
  locale,
  actionData,
}: {
  listingId: string;
  locale: Locale;
  actionData: { ok: false; issues: { path: string; message: string }[] } | undefined;
}) {
  const issueByPath = new Map<string, string>(
    (actionData?.issues ?? []).map((i) => [i.path, i.message]),
  );
  return (
    <Form method="post" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <input type="hidden" name="listingId" value={listingId} />

      <label className="flex flex-col text-sm sm:col-span-2">
        <span className="mb-1 font-medium">{t(locale, "listing_lead_name")}</span>
        <input
          required
          name="name"
          type="text"
          minLength={2}
          maxLength={200}
          className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        {issueByPath.get("name") && (
          <span className="mt-1 text-xs text-red-600">{issueByPath.get("name")}</span>
        )}
      </label>

      <label className="flex flex-col text-sm">
        <span className="mb-1 font-medium">{t(locale, "listing_lead_email")}</span>
        <input
          name="email"
          type="email"
          maxLength={320}
          className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        {issueByPath.get("email") && (
          <span className="mt-1 text-xs text-red-600">{issueByPath.get("email")}</span>
        )}
      </label>

      <label className="flex flex-col text-sm">
        <span className="mb-1 font-medium">{t(locale, "listing_lead_phone")}</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          minLength={7}
          maxLength={32}
          className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        {issueByPath.get("phone") && (
          <span className="mt-1 text-xs text-red-600">{issueByPath.get("phone")}</span>
        )}
      </label>

      <label className="flex flex-col text-sm sm:col-span-2">
        <span className="mb-1 font-medium">{t(locale, "listing_lead_message")}</span>
        <textarea
          name="message"
          maxLength={4000}
          rows={4}
          className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
      </label>

      <label className="flex items-start gap-2 text-sm sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>{t(locale, "listing_lead_consent")}</span>
      </label>
      {issueByPath.get("consent") && (
        <p className="text-xs text-red-600 sm:col-span-2">{issueByPath.get("consent")}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          {t(locale, "listing_lead_submit")}
        </button>
      </div>
    </Form>
  );
}

function buildRealEstateJsonLd({
  listing,
  locale,
  publicUrl,
}: {
  listing: PublicListingDetail;
  locale: Locale;
  publicUrl: string;
}) {
  const title = pickLocale(listing.title, locale);
  const cityName = pickLocale(listing.city.name, locale);
  const slug = pickLocale(listing.slug, locale) || listing.slug.he;
  const url = `${publicUrl}/${locale}/listings/${listing.city.slugHe}/${listing.type}/${slug}`;
  const a = listing.attributes as {
    currency?: string;
    address?: string;
    areaM2?: number;
    rooms?: number;
    bedrooms?: number;
  };
  const body = listing.body[locale] ?? listing.body.he ?? "";

  // schema.org `RealEstateListing` per Google's structured data guidance.
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: title,
    url,
    description: body || title,
    inLanguage: locale,
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressCountry: "IL",
      streetAddress: a.address,
    },
    ...(listing.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: listing.price,
            priceCurrency: a.currency ?? "ILS",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    ...(typeof a.areaM2 === "number"
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: a.areaM2,
            unitCode: "MTK",
          },
        }
      : {}),
    ...(typeof a.bedrooms === "number" ? { numberOfBedrooms: a.bedrooms } : {}),
    ...(typeof a.rooms === "number" ? { numberOfRooms: a.rooms } : {}),
    provider: {
      "@type": "RealEstateAgent",
      name: pickLocale(listing.agency.name, locale),
      ...(listing.agency.contactEmail ? { email: listing.agency.contactEmail } : {}),
      ...(listing.agency.contactPhone ? { telephone: listing.agency.contactPhone } : {}),
    },
  };
}
