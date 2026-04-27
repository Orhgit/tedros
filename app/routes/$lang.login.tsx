import { Form, Link } from "react-router";
import type { Route } from "./+types/$lang.login";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? null;
  const redirectTo = url.searchParams.get("redirectTo") ?? `/${locale}/dashboard`;
  const googleEnabled = Boolean(getEnv().GOOGLE_CLIENT_ID);
  return { locale, status, redirectTo, googleEnabled };
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: t(data?.locale ?? DEFAULT_LOCALE, "login_title") },
];

export default function Login({ loaderData }: Route.ComponentProps) {
  const { locale, status, redirectTo, googleEnabled } = loaderData;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t(locale, "login_title")}</h1>

      {status === "check-email" && (
        <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-200">
          ✉️
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          ⚠️
        </p>
      )}

      {googleEnabled ? (
        <Form method="post" action="/auth/signin/google" className="mt-8">
          <input type="hidden" name="callbackUrl" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            {t(locale, "login_google_button")}
          </button>
        </Form>
      ) : (
        <p className="mt-8 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          GOOGLE_CLIENT_ID / SECRET
        </p>
      )}

      <p className="mt-8 text-sm text-gray-500">
        <Link to={`/${locale}`} className="underline">
          {t(locale, "nav_home")}
        </Link>
      </p>
    </div>
  );
}
