import { Form, Link } from "react-router";
import type { Route } from "./+types/$lang.login";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? null;
  const redirectTo = url.searchParams.get("redirectTo") ?? `/${locale}/dashboard`;
  const googleEnabled = !!process.env.GOOGLE_CLIENT_ID;
  return { locale, status, redirectTo, googleEnabled };
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: t(data?.locale ?? DEFAULT_LOCALE, "login_title") },
];

export default function Login({ loaderData }: Route.ComponentProps) {
  const { locale, status, redirectTo, googleEnabled } = loaderData;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        {t(locale, "login_title")}
      </h1>

      {status === "check-email" && (
        <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
          {t(locale, "login_email_label")} ✉️
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          ⚠️
        </p>
      )}

      <Form
        method="post"
        action="/auth/signin/nodemailer"
        className="mt-8 space-y-4"
      >
        <input type="hidden" name="callbackUrl" value={redirectTo} />
        <label className="block">
          <span className="text-sm font-medium">
            {t(locale, "login_email_label")}
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={t(locale, "login_email_placeholder")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-white dark:focus:ring-white"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-lg bg-gray-900 px-5 py-2.5 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          {t(locale, "login_magic_link_button")}
        </button>
      </Form>

      {googleEnabled && (
        <>
          <div className="my-6 flex items-center gap-3 text-sm text-gray-500">
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            <span>{t(locale, "login_or")}</span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>
          <Form method="post" action="/auth/signin/google">
            <input type="hidden" name="callbackUrl" value={redirectTo} />
            <button
              type="submit"
              className="w-full rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
            >
              {t(locale, "login_google_button")}
            </button>
          </Form>
        </>
      )}

      <p className="mt-8 text-sm text-gray-500">
        <Link to={`/${locale}`} className="underline">
          {t(locale, "nav_home")}
        </Link>
      </p>
    </div>
  );
}
