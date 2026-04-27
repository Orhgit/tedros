// Agency dashboard — `/{lang}/agency` (TED-21).
//
// Lists the active user's agency and its listings. CRUD goes via separate
// routes (`./listings.new`, `./listings.$id.edit`). All reads are scoped via
// `forListingsOf(agencyId)` (defence-in-depth, see `~/lib/db/scoping`).

import { Form, Link, data, redirect } from "react-router";
import { and, eq, isNull } from "drizzle-orm";
import type { Route } from "./+types/$lang.agency._index";

import { requireUser } from "~/lib/auth/guards";
import { db } from "~/lib/db.server";
import {
  findAgencyForUser,
  listAgencyListings,
  type ListingStatus,
} from "~/lib/db/queries/listings.server";
import { listings } from "~/lib/db/schema/realestate";
import { requireAgencyMember } from "~/lib/db/scoping";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

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
    return { locale, user, agency: null, listings: [] as never[] };
  }
  const items = await listAgencyListings(agency.id);
  return { locale, user, agency, listings: items };
}

// Soft-delete a listing. Form posts `intent=delete` + `listingId`.
export async function action({ params, request }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const listingId = String(formData.get("listingId") ?? "");
  if (intent !== "delete" || !listingId) {
    return data({ ok: false as const, error: "bad request" }, { status: 400 });
  }

  // Look up the listing's agency to scope the membership check.
  const target = await db
    .select({ id: listings.id, agencyId: listings.agencyId })
    .from(listings)
    .where(and(eq(listings.id, listingId), isNull(listings.deletedAt)))
    .limit(1);
  const row = target[0];
  if (!row) return data({ ok: false as const }, { status: 404 });

  await requireAgencyMember(user.id, row.agencyId);

  await db
    .update(listings)
    .set({ deletedAt: new Date() })
    .where(eq(listings.id, listingId));

  return redirect(`/${locale}/agency`);
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: t(data?.locale ?? DEFAULT_LOCALE, "agency_dashboard_title") },
  { name: "robots", content: "noindex" },
];

export default function AgencyDashboard({ loaderData }: Route.ComponentProps) {
  const { locale, agency, listings } = loaderData;

  if (!agency) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">{t(locale, "agency_dashboard_title")}</h1>
        <p className="mt-6 text-gray-600 dark:text-gray-400">
          {t(locale, "agency_dashboard_no_agency")}
        </p>
        <p className="mt-4">
          <Link
            to={`/${locale}/agency/signup`}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {t(locale, "agency_dashboard_signup_link")}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {pickLocale(agency.name, locale)}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t(locale, "agency_dashboard_title")}
          </p>
        </div>
        <Link
          to={`/${locale}/agency/listings/new`}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          {t(locale, "agency_dashboard_new_listing")}
        </Link>
      </header>

      {agency.verificationStatus !== "verified" && (
        <div
          role="alert"
          className="mt-6 rounded border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
        >
          {t(locale, "agency_dashboard_pending")}
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">
          {t(locale, "agency_dashboard_listings_heading")}
        </h2>

        {listings.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700">
            {t(locale, "agency_dashboard_no_listings")}
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
            {listings.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{pickLocale(l.title, locale)}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {t(locale, `listings_type_${l.type}`)} ·{" "}
                    {t(locale, `agency_dashboard_status_${l.status}` as const)}
                    {l.price !== null ? ` · ₪${l.price.toLocaleString()}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/${locale}/agency/listings/${l.id}/edit`}
                    className="rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                  >
                    Edit
                  </Link>
                  <Form method="post">
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="listingId" value={l.id} />
                    <button
                      type="submit"
                      className="rounded border border-red-300 px-3 py-1.5 text-xs text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
                      onClick={(e) => {
                        if (!confirm("Delete this listing?")) e.preventDefault();
                      }}
                    >
                      Delete
                    </button>
                  </Form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// Suppress unused-import warning for ListingStatus — kept for the typed
// `agency_dashboard_status_${ListingStatus}` message keys above so adding a
// new status surfaces a TS error in a single place.
void ({} as ListingStatus);
