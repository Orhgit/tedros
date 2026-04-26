import { Form, Link } from "react-router";
import type { Route } from "./+types/$lang.dashboard";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { requireUser } from "~/lib/auth/guards";

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const user = await requireUser(request);
  return { locale, user };
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: t(data?.locale ?? DEFAULT_LOCALE, "dashboard_title") },
];

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { locale, user } = loaderData;
  const displayName = user.name ?? user.email;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t(locale, "dashboard_title")}
        </h1>
        <Form method="post" action="/auth/signout">
          <input type="hidden" name="callbackUrl" value={`/${locale}`} />
          <button
            type="submit"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            {t(locale, "nav_logout")}
          </button>
        </Form>
      </header>
      <p className="mt-6 text-lg">
        {t(locale, "dashboard_welcome", { name: displayName })}
      </p>
      <p className="mt-8 text-sm text-gray-500">
        <Link to={`/${locale}`} className="underline">
          {t(locale, "nav_home")}
        </Link>
      </p>
    </div>
  );
}
