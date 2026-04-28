// Edit a listing — `/{lang}/agency/listings/{id}/edit` (TED-21).
//
// Loader scopes via `requireAgencyMember(userId, listing.agencyId)`. Action
// re-validates with `parseListingIntake` and re-applies the publish gate
// before any draft → active transition.

import { Form, Link, data, redirect } from "react-router";
import { and, eq, isNull } from "drizzle-orm";
import type { Route } from "./+types/$lang.agency.listings.$id.edit";

import { requireUser } from "~/lib/auth/guards";
import { db } from "~/lib/db.server";
import { listingTranslations, listings } from "~/lib/db/schema/realestate";
import { requireAgencyMember, requirePublishGate } from "~/lib/db/scoping";
import { presignListingImageUpload } from "~/lib/storage/r2.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { parseListingIntake } from "~/lib/validation/listings";

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  const id = params.id ?? "";

  const rows = await db
    .select()
    .from(listings)
    .where(and(eq(listings.id, id), isNull(listings.deletedAt)))
    .limit(1);
  const row = rows[0];
  if (!row) throw new Response("Not found", { status: 404 });

  await requireAgencyMember(user.id, row.agencyId);

  const trs = await db
    .select({ locale: listingTranslations.locale, body: listingTranslations.body })
    .from(listingTranslations)
    .where(eq(listingTranslations.listingId, id));
  const bodyHe = trs.find((t) => t.locale === "he")?.body ?? "";

  const r2Presign = presignListingImageUpload({
    agencyId: row.agencyId,
    listingId: row.id,
    contentType: "image/jpeg",
  });

  return { locale, listing: row, bodyHe, r2Presign };
}

export async function action({ params, request }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  const id = params.id ?? "";

  const rows = await db
    .select({ id: listings.id, agencyId: listings.agencyId, status: listings.status })
    .from(listings)
    .where(and(eq(listings.id, id), isNull(listings.deletedAt)))
    .limit(1);
  const row = rows[0];
  if (!row) throw new Response("Not found", { status: 404 });

  await requireAgencyMember(user.id, row.agencyId);

  const formData = await request.formData();
  const titleHe = String(formData.get("title_he") ?? "").trim();

  const intakeRaw: unknown = {
    agencyId: row.agencyId,
    type: formData.get("type"),
    status: formData.get("status") ?? "draft",
    title: { he: titleHe },
    price: formData.get("price") || undefined,
    cityId: formData.get("cityId"),
    attributes: {
      currency: formData.get("currency") || "ILS",
      address: formData.get("address") || undefined,
      rooms: formData.get("rooms") ? Number(formData.get("rooms")) : undefined,
      areaM2: formData.get("areaM2") ? Number(formData.get("areaM2")) : undefined,
      programKind: formData.get("programKind") || undefined,
      programCode: formData.get("programCode") || undefined,
      commercialKind: formData.get("commercialKind") || undefined,
      amenities: [],
    },
    body: formData.get("body_he") ? { he: String(formData.get("body_he")) } : undefined,
  };

  let intake;
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

  if (intake.status === "active" && row.status !== "active") {
    await requirePublishGate(row.agencyId);
  }

  await db
    .update(listings)
    .set({
      type: intake.type,
      status: intake.status,
      title: { he: intake.title.he, en: intake.title.en, am: intake.title.am },
      price: intake.price !== undefined ? String(intake.price) : null,
      attributes: intake.attributes,
      cityId: intake.cityId,
      publishedAt:
        intake.status === "active" && row.status !== "active" ? new Date() : undefined,
      updatedAt: new Date(),
    })
    .where(eq(listings.id, id));

  if (intake.body?.he !== undefined) {
    // upsert HE translation
    await db
      .insert(listingTranslations)
      .values({ listingId: id, locale: "he", body: intake.body.he })
      .onConflictDoUpdate({
        target: [listingTranslations.listingId, listingTranslations.locale],
        set: { body: intake.body.he, updatedAt: new Date() },
      });
  }

  return redirect(`/${locale}/agency`);
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: `Edit · ${t(data?.locale ?? DEFAULT_LOCALE, "agency_dashboard_title")}` },
  { name: "robots", content: "noindex" },
];

export default function EditListing({ loaderData, actionData }: Route.ComponentProps) {
  const { locale, listing, bodyHe, r2Presign } = loaderData;
  const issues = new Map(
    (actionData?.ok === false ? actionData.issues : []).map((i) => [i.path, i.message]),
  );
  const title = (listing.title as { he: string }).he;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="mb-4 text-sm">
        <Link to={`/${locale}/agency`} className="underline">
          ← {t(locale, "agency_dashboard_title")}
        </Link>
      </p>
      <h1 className="text-2xl font-bold">Edit listing</h1>

      <Form method="post" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Type" name="type" issues={issues}>
          <select
            name="type"
            defaultValue={listing.type}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            {(
              [
                "sale",
                "rent",
                "urban_renewal",
                "investment",
                "gov_program",
                "commercial",
              ] as const
            ).map((tp) => (
              <option key={tp} value={tp}>
                {t(locale, `listings_type_${tp}`)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status" name="status" issues={issues}>
          <select
            name="status"
            defaultValue={listing.status}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="draft">draft</option>
            <option value="active">active</option>
            <option value="sold">sold</option>
            <option value="rented">rented</option>
            <option value="archived">archived</option>
          </select>
        </Field>

        <Field label="Title (HE)" name="title.he" issues={issues} fullWidth>
          <input
            name="title_he"
            required
            defaultValue={title}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <input type="hidden" name="cityId" value={listing.cityId} />

        <Field label="Price" name="price" issues={issues}>
          <input
            name="price"
            type="number"
            min={0}
            step="any"
            defaultValue={listing.price ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label="Currency" name="attributes.currency" issues={issues}>
          <select
            name="currency"
            defaultValue={
              (listing.attributes as unknown as { currency?: string } | null)?.currency ??
              "ILS"
            }
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="ILS">ILS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </Field>

        <Field label="Body (HE)" name="body.he" issues={issues} fullWidth>
          <textarea
            name="body_he"
            rows={6}
            defaultValue={bodyHe}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Save
          </button>
        </div>
      </Form>

      <section className="mt-10 rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-800">
        <h2 className="font-semibold">Image upload</h2>
        <p className="mt-1 text-xs text-gray-500">
          Upload directly to R2 with the presigned URL below (PUT).
          {!r2Presign.enabled && " R2 credentials not configured — placeholder URL."}
        </p>
        <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-900">
          {`PUT ${r2Presign.uploadUrl}\nContent-Type: ${r2Presign.headers["Content-Type"]}\n# r2_key: ${r2Presign.r2Key}`}
        </pre>
      </section>
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
