// Create a listing — `/{lang}/agency/listings/new` (TED-21).
//
// Action validates with `parseListingIntake` (top-level + per-type Zod
// discriminated union) and enforces the publish gate via
// `requirePublishGate(agencyId)` — only verified agencies may publish active.

import { Form, Link, data, redirect } from "react-router";
import { asc, eq, sql } from "drizzle-orm";
import type { Route } from "./+types/$lang.agency.listings.new";

import { requireUser } from "~/lib/auth/guards";
import { db } from "~/lib/db.server";
import { findAgencyForUser } from "~/lib/db/queries/listings.server";
import {
  cities,
  listingTranslations,
  listings,
  neighborhoods,
} from "~/lib/db/schema/realestate";
import { requireAgencyMember, requirePublishGate } from "~/lib/db/scoping";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { slugify } from "~/lib/utils/slug";
import { parseListingIntake, type ListingIntake } from "~/lib/validation/listings";

const LISTING_TYPES = [
  "sale",
  "rent",
  "urban_renewal",
  "investment",
  "gov_program",
  "commercial",
] as const;

function pickLocale<T extends Partial<Record<Locale, string>>>(
  obj: T,
  locale: Locale,
): string {
  return obj[locale] ?? obj.he ?? "";
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  const agency = await findAgencyForUser(user.id);
  if (!agency) {
    throw redirect(`/${locale}/agency`);
  }
  await requireAgencyMember(user.id, agency.id);
  const cityList = await db
    .select({ id: cities.id, name: cities.name })
    .from(cities)
    .orderBy(asc(sql`(${cities.name} ->> 'he')`));
  return { locale, agency, cities: cityList };
}

export async function action({ params, request }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  const agency = await findAgencyForUser(user.id);
  if (!agency) throw redirect(`/${locale}/agency`);
  await requireAgencyMember(user.id, agency.id);

  const formData = await request.formData();
  const titleHe = String(formData.get("title_he") ?? "").trim();
  const slugHe = slugify(String(formData.get("slug_he") ?? "").trim() || titleHe);

  // Build the per-type attributes object from form fields. The per-type Zod
  // schema strips unknowns, so passing the union of inputs is safe.
  const attributes: Record<string, unknown> = {
    address: formData.get("address") || undefined,
    currency: formData.get("currency") || "ILS",
    rooms: formData.get("rooms") ? Number(formData.get("rooms")) : undefined,
    areaM2: formData.get("areaM2") ? Number(formData.get("areaM2")) : undefined,
    bedrooms: formData.get("bedrooms") ? Number(formData.get("bedrooms")) : undefined,
    floor: formData.get("floor") ? Number(formData.get("floor")) : undefined,
    parkingSpots: formData.get("parkingSpots")
      ? Number(formData.get("parkingSpots"))
      : undefined,
    yearBuilt: formData.get("yearBuilt") ? Number(formData.get("yearBuilt")) : undefined,
    amenities: [],
    // Per-type required fields below — discriminator stripped by parser.
    programKind: formData.get("programKind") || undefined,
    programCode: formData.get("programCode") || undefined,
    commercialKind: formData.get("commercialKind") || undefined,
  };

  const intakeRaw: unknown = {
    agencyId: agency.id,
    type: formData.get("type"),
    status: formData.get("status") ?? "draft",
    title: { he: titleHe },
    price: formData.get("price") || undefined,
    cityId: formData.get("cityId"),
    neighborhoodId: formData.get("neighborhoodId") || undefined,
    attributes,
    body: formData.get("body_he") ? { he: String(formData.get("body_he")) } : undefined,
  };

  let intake: ListingIntake;
  try {
    intake = parseListingIntake(intakeRaw);
  } catch (err) {
    const issues =
      err && typeof err === "object" && "issues" in err
        ? (err as { issues: { path: (string | number)[]; message: string }[] }).issues
        : [{ path: [], message: "Invalid input" }];
    return data(
      {
        ok: false as const,
        issues: issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  if (intake.status === "active") {
    await requirePublishGate(agency.id);
  }

  const inserted = await db
    .insert(listings)
    .values({
      agencyId: intake.agencyId,
      type: intake.type,
      status: intake.status,
      title: { he: intake.title.he, en: intake.title.en, am: intake.title.am },
      slug: { he: slugHe },
      price: intake.price !== undefined ? String(intake.price) : null,
      attributes: intake.attributes,
      cityId: intake.cityId,
      neighborhoodId: intake.neighborhoodId ?? null,
      publishedAt: intake.status === "active" ? new Date() : null,
    })
    .returning({ id: listings.id });

  const newId = inserted[0]?.id;
  if (newId && intake.body?.he) {
    await db.insert(listingTranslations).values({
      listingId: newId,
      locale: "he",
      body: intake.body.he,
    });
  }

  return redirect(`/${locale}/agency`);
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: t(data?.locale ?? DEFAULT_LOCALE, "agency_dashboard_new_listing") },
  { name: "robots", content: "noindex" },
];

export default function NewListing({ loaderData, actionData }: Route.ComponentProps) {
  const { locale, agency, cities: cityList } = loaderData;
  const issues = new Map(
    (actionData?.ok === false ? actionData.issues : []).map((i) => [i.path, i.message]),
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="mb-4 text-sm">
        <Link to={`/${locale}/agency`} className="underline">
          ← {t(locale, "agency_dashboard_title")}
        </Link>
      </p>

      <h1 className="text-3xl font-bold">{t(locale, "agency_dashboard_new_listing")}</h1>

      {agency.verificationStatus !== "verified" && (
        <div
          role="alert"
          className="mt-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
        >
          {t(locale, "agency_dashboard_pending")}
        </div>
      )}

      <Form method="post" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Type" name="type" issues={issues}>
          <select
            name="type"
            required
            defaultValue="sale"
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            {LISTING_TYPES.map((tp) => (
              <option key={tp} value={tp}>
                {t(locale, `listings_type_${tp}`)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status" name="status" issues={issues}>
          <select
            name="status"
            defaultValue="draft"
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="draft">{t(locale, "agency_dashboard_status_draft")}</option>
            <option value="active" disabled={agency.verificationStatus !== "verified"}>
              {t(locale, "agency_dashboard_status_active")}
            </option>
          </select>
        </Field>

        <Field label="Title (HE)" name="title.he" issues={issues} fullWidth>
          <input
            name="title_he"
            required
            minLength={2}
            maxLength={160}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label="URL slug (lowercase, optional)" name="slug.he" issues={issues}>
          <input
            name="slug_he"
            maxLength={80}
            placeholder="auto from title"
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label="City" name="cityId" issues={issues}>
          <select
            name="cityId"
            required
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            {cityList.map((c) => (
              <option key={c.id} value={c.id}>
                {pickLocale(c.name as Partial<Record<Locale, string>>, locale)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Price" name="price" issues={issues}>
          <input
            name="price"
            type="number"
            min={0}
            step="any"
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label="Currency" name="attributes.currency" issues={issues}>
          <select
            name="currency"
            defaultValue="ILS"
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="ILS">ILS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </Field>

        <Field label="Address" name="attributes.address" issues={issues} fullWidth>
          <input
            name="address"
            maxLength={300}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label="Rooms" name="attributes.rooms" issues={issues}>
          <input
            name="rooms"
            type="number"
            step="0.5"
            min={0}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label="Area (m²)" name="attributes.areaM2" issues={issues}>
          <input
            name="areaM2"
            type="number"
            step="any"
            min={0}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label="Body (HE)" name="body.he" issues={issues} fullWidth>
          <textarea
            name="body_he"
            rows={6}
            minLength={20}
            maxLength={20_000}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <details className="rounded border border-gray-200 p-3 text-sm sm:col-span-2 dark:border-gray-800">
          <summary className="cursor-pointer font-medium">Type-specific fields</summary>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field
              label="Urban renewal — programKind"
              name="attributes.programKind"
              issues={issues}
            >
              <select
                name="programKind"
                defaultValue=""
                className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="">—</option>
                <option value="pinui_binui">pinui_binui</option>
                <option value="tama_38_1">tama_38_1</option>
                <option value="tama_38_2">tama_38_2</option>
                <option value="other">other</option>
              </select>
            </Field>
            <Field
              label="Gov program — programCode"
              name="attributes.programCode"
              issues={issues}
            >
              <input
                name="programCode"
                maxLength={64}
                className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              />
            </Field>
            <Field
              label="Commercial — commercialKind"
              name="attributes.commercialKind"
              issues={issues}
            >
              <select
                name="commercialKind"
                defaultValue=""
                className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="">—</option>
                <option value="office">office</option>
                <option value="retail">retail</option>
                <option value="warehouse">warehouse</option>
                <option value="industrial">industrial</option>
                <option value="hospitality">hospitality</option>
                <option value="mixed_use">mixed_use</option>
                <option value="land">land</option>
              </select>
            </Field>
          </div>
        </details>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

function Field({
  label,
  name,
  issues,
  children,
  fullWidth = false,
}: {
  label: string;
  name: string;
  issues: Map<string, string>;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  const issue = issues.get(name);
  return (
    <label className={`flex flex-col text-sm ${fullWidth ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 font-medium">{label}</span>
      {children}
      {issue && <span className="mt-1 text-xs text-red-600">{issue}</span>}
    </label>
  );
}

// Imports kept to surface unused-symbol warnings for the next contributor:
void neighborhoods;
void eq;
