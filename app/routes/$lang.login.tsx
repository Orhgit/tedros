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
  { name: "robots", content: "noindex" },
];

export default function Login({ loaderData }: Route.ComponentProps) {
  const { locale, status, redirectTo, googleEnabled } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100vh-0.375rem)] max-w-md flex-col justify-center px-6 py-16">
        <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900">
          {t(locale, "login_title")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-700">
          {t(locale, "login_subtitle")}
        </p>

        {status === "check-email" && (
          <p className="mt-4 rounded-md bg-accent-green/10 px-4 py-3 text-sm text-accent-green ring-1 ring-accent-green/20">
            ✉️
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive ring-1 ring-destructive/20">
            ⚠️
          </p>
        )}

        {googleEnabled ? (
          <Form method="post" action="/auth/signin/google" className="mt-8">
            <input type="hidden" name="callbackUrl" value={redirectTo} />
            <button
              type="submit"
              className="w-full rounded-md border border-border bg-card px-5 py-2.5 font-medium hover:bg-earth-100"
            >
              {t(locale, "login_google_button")}
            </button>
          </Form>
        ) : (
          <p className="mt-8 rounded-md bg-accent-yellow/15 px-4 py-3 text-sm text-earth-900 ring-1 ring-accent-yellow/30">
            {t(locale, "login_no_provider")}
          </p>
        )}

        <p className="mt-6 rounded-md bg-accent-sigd/10 px-4 py-3 text-sm text-earth-900 ring-1 ring-accent-sigd/20">
          {t(locale, "login_not_subscribed_yet")}
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          <Link to={`/${locale}`} className="underline hover:text-earth-700">
            {t(locale, "nav_home")}
          </Link>
        </p>
      </div>
    </div>
  );
}
