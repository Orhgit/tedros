// /:lang/subscribe/confirm/:token — single-use double-opt-in confirmation
// landing (TED-25). The route both performs the confirm (loader) and renders
// the success/error page. Idempotent: repeat clicks show "invalid" because
// the token is cleared on the first hit.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.subscribe.confirm.$token";
import { confirmSubscriber } from "~/lib/subscribers/confirm.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const result = params.token
    ? await confirmSubscriber(params.token)
    : { ok: false as const, error: "invalid-token" as const };
  return { locale, result };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  return [
    { title: t(locale, "subscribe_confirm_page_title") },
    { name: "robots", content: "noindex" },
  ];
};

export default function ConfirmPage({ loaderData }: Route.ComponentProps) {
  const { locale, result } = loaderData;
  const isOk = result.ok;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <main className="container-default mx-auto max-w-xl py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-earth-900">
            {t(
              locale,
              isOk ? "subscribe_confirm_heading" : "subscribe_confirm_invalid_heading",
            )}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-700">
            {t(
              locale,
              isOk ? "subscribe_confirm_body" : "subscribe_confirm_invalid_body",
            )}
          </p>
          <p className="mt-6">
            <Link
              to={`/${locale}`}
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700"
            >
              {t(locale, "subscribe_back_home")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
