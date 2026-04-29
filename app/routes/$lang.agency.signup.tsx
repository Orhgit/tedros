// Agency signup — `/{lang}/agency/signup` (TED-21).
//
// Action validates with `agencySignupSchema` (Zod), inserts the agency with
// verification_status=pending, makes the active user the owner, and emails
// admin via Resend (logged in dev when no RESEND_API_KEY is set).

import { Form, Link, data, redirect } from "react-router";
import type { Route } from "./+types/$lang.agency.signup";

import { requireUser } from "~/lib/auth/guards";
import { db } from "~/lib/db.server";
import { agencies, agencyMembers } from "~/lib/db/schema/identity";
import { findAgencyForUser } from "~/lib/db/queries/listings.server";
import { notifyAdminAgencyPending } from "~/lib/agencies/notify-admin.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { agencySignupSchema } from "~/lib/validation/agency";

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  // If the user already runs / belongs to an agency, send them to the
  // dashboard — single-tenant signup per user, intentional friction-floor.
  const existing = await findAgencyForUser(user.id);
  if (existing) throw redirect(`/${locale}/agency`);
  return { locale };
}

export async function action({ params, request }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);

  const formData = await request.formData();
  const raw = {
    name: {
      he: String(formData.get("name_he") ?? ""),
      en: formData.get("name_en") ? String(formData.get("name_en")) : undefined,
    },
    slug: {
      he: String(formData.get("slug_he") ?? ""),
    },
    contactEmail: String(formData.get("contact_email") ?? ""),
    contactPhone: String(formData.get("contact_phone") ?? ""),
    websiteUrl: formData.get("website_url")
      ? String(formData.get("website_url"))
      : undefined,
    legalId: formData.get("legal_id") ? String(formData.get("legal_id")) : undefined,
    licenseNumber: formData.get("license_number")
      ? String(formData.get("license_number"))
      : undefined,
  };

  const parsed = agencySignupSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));
    return data({ ok: false as const, issues, values: raw }, { status: 400 });
  }

  const inserted = await db
    .insert(agencies)
    .values({
      name: { he: parsed.data.name.he, en: parsed.data.name.en },
      slug: { he: parsed.data.slug.he },
      ownerUserId: user.id,
      verificationStatus: "pending",
      legalId: parsed.data.legalId ?? null,
      licenseNumber: parsed.data.licenseNumber ?? null,
      contactEmail: parsed.data.contactEmail,
      contactPhone: parsed.data.contactPhone,
      websiteUrl: parsed.data.websiteUrl ?? null,
    })
    .returning({ id: agencies.id });

  const agencyId = inserted[0]?.id;
  if (!agencyId) {
    return data(
      {
        ok: false as const,
        issues: [{ path: "", message: "Insert failed" }],
        values: raw,
      },
      { status: 500 },
    );
  }

  await db.insert(agencyMembers).values({
    userId: user.id,
    agencyId,
    roleInAgency: "owner",
    status: "active",
  });

  // Best-effort admin notification — don't fail signup on email errors.
  try {
    await notifyAdminAgencyPending({
      agencyName: parsed.data.name.he,
      agencyId,
      contactEmail: parsed.data.contactEmail,
      contactPhone: parsed.data.contactPhone,
    });
  } catch (err) {
    console.error("[agency-signup] admin notify failed", err);
  }

  return redirect(`/${locale}/agency?signedup=1`);
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: t(data?.locale ?? DEFAULT_LOCALE, "agency_signup_title") },
  { name: "robots", content: "noindex" },
];

export default function AgencySignup({ loaderData, actionData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const issues = new Map<string, string>(
    (actionData?.ok === false ? actionData.issues : []).map((i) => [i.path, i.message]),
  );
  const values = (actionData?.ok === false ? actionData.values : null) ?? null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <p className="mb-4 text-sm">
        <Link to={`/${locale}`} className="underline">
          ← {t(locale, "nav_home")}
        </Link>
      </p>
      <h1 className="text-3xl font-bold">{t(locale, "agency_signup_title")}</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {t(locale, "agency_signup_intro")}
      </p>

      <Form method="post" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label={t(locale, "agency_signup_name_he")}
          name="name.he"
          issues={issues}
          fullWidth
        >
          <input
            name="name_he"
            required
            minLength={2}
            maxLength={120}
            defaultValue={values?.name.he ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field
          label={t(locale, "agency_signup_name_en")}
          name="name.en"
          issues={issues}
          fullWidth
        >
          <input
            name="name_en"
            maxLength={120}
            defaultValue={values?.name.en ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label={t(locale, "agency_signup_slug_he")} name="slug.he" issues={issues}>
          <input
            name="slug_he"
            required
            minLength={2}
            maxLength={80}
            pattern="[a-z0-9-]+"
            defaultValue={values?.slug.he ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field
          label={t(locale, "agency_signup_email")}
          name="contactEmail"
          issues={issues}
        >
          <input
            name="contact_email"
            type="email"
            required
            maxLength={320}
            defaultValue={values?.contactEmail ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field
          label={t(locale, "agency_signup_phone")}
          name="contactPhone"
          issues={issues}
        >
          <input
            name="contact_phone"
            type="tel"
            required
            minLength={7}
            maxLength={32}
            defaultValue={values?.contactPhone ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field
          label={t(locale, "agency_signup_website")}
          name="websiteUrl"
          issues={issues}
        >
          <input
            name="website_url"
            type="url"
            defaultValue={values?.websiteUrl ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field label={t(locale, "agency_signup_legal_id")} name="legalId" issues={issues}>
          <input
            name="legal_id"
            inputMode="numeric"
            maxLength={32}
            defaultValue={values?.legalId ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <Field
          label={t(locale, "agency_signup_license")}
          name="licenseNumber"
          issues={issues}
        >
          <input
            name="license_number"
            maxLength={64}
            defaultValue={values?.licenseNumber ?? ""}
            className="rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {t(locale, "agency_signup_submit")}
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
