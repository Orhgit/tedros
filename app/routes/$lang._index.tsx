import { Form, Link, useNavigation } from "react-router";
import type { Route } from "./+types/$lang._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { submitSubscriber } from "~/lib/subscribers/submit.server";
import { subscribeSchema } from "~/lib/validation/subscriber";

const PILLARS = [
  "rights",
  "realestate",
  "professionals",
  "employment",
  "education",
  "health",
  "family",
  "heritage",
  "news",
  "voice",
] as const;

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  return { locale };
}

export async function action({ request, params }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const formData = await request.formData();
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
    locale,
  });

  if (!parsed.success) {
    return { ok: false as const, error: "invalid" as const, locale };
  }

  const result = await submitSubscriber(parsed.data);
  if (!result.ok) {
    return { ok: false as const, error: result.error, locale };
  }
  return { ok: true as const, status: result.status, locale };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const title = t(locale, "homepage_title");
  const description = t(locale, "homepage_subtitle");
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const submitted = actionData?.ok === true;
  const errorKey = actionData?.ok === false ? "subscribe_error_invalid" : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Cultural flag-stripe at top — Ethiopian heritage cue, used sparingly. */}
      <div className="flag-stripe h-1.5" aria-hidden="true" />

      <div className="container-default flex min-h-[calc(100vh-0.375rem)] flex-col py-10">
        <header className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900">
            {t(locale, "homepage_title")}
          </h1>
          <nav
            className="flex gap-1 text-sm"
            aria-label={t(locale, "lang_switcher_label")}
          >
            <Link
              to="/he"
              hrefLang="he"
              className="rounded-md px-3 py-1.5 text-ink-700 hover:bg-earth-100 hover:text-earth-900"
            >
              {t(locale, "lang_he")}
            </Link>
            <Link
              to="/en"
              hrefLang="en"
              className="rounded-md px-3 py-1.5 text-ink-700 hover:bg-earth-100 hover:text-earth-900"
            >
              {t(locale, "lang_en")}
            </Link>
            <Link
              to="/am"
              hrefLang="am"
              className="rounded-md px-3 py-1.5 text-ink-700 hover:bg-earth-100 hover:text-earth-900"
            >
              {t(locale, "lang_am")}
            </Link>
          </nav>
        </header>

        <main className="mt-12 flex-1">
          {/* Hero */}
          <section>
            <p className="font-display text-2xl leading-relaxed font-semibold text-earth-900 sm:text-3xl">
              {t(locale, "homepage_subtitle")}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-700">
              {t(locale, "homepage_intro")}
            </p>
          </section>

          {/* Pillars grid */}
          <section className="mt-16">
            <h2 className="font-display text-xl font-semibold tracking-tight text-earth-900">
              {t(locale, "pillars_heading")}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PILLARS.map((p) => {
                const liveHref: Record<string, string> = {
                  realestate: `/${locale}/cities`,
                  rights: `/${locale}/rights`,
                };
                const href = liveHref[p] ?? null;
                const isLive = href !== null;
                const tile = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-earth-900">
                        {t(locale, `pillar_${p}_title`)}
                      </h3>
                      {isLive ? (
                        <span className="shrink-0 rounded-full bg-accent-green/15 px-2.5 py-0.5 text-[11px] font-medium text-accent-green ring-1 ring-accent-green/30">
                          {t(locale, "pillar_live")}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-accent-yellow/30 px-2.5 py-0.5 text-[11px] font-medium text-earth-900 ring-1 ring-accent-yellow/40">
                          {t(locale, "pillar_coming_soon")}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {t(locale, `pillar_${p}_summary`)}
                    </p>
                  </>
                );
                const baseClass =
                  "block rounded-lg border border-border bg-card p-5 shadow-xs transition-all";
                const hoverClass = isLive
                  ? "hover:-translate-y-0.5 hover:border-accent-green/60 hover:shadow-sm"
                  : "hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-sm";
                return href ? (
                  <Link key={p} to={href} className={`${baseClass} ${hoverClass}`}>
                    {tile}
                  </Link>
                ) : (
                  <article key={p} className={`${baseClass} ${hoverClass}`}>
                    {tile}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Subscribe */}
          <section className="mt-20 rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900">
              {t(locale, "subscribe_heading")}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">
              {t(locale, "subscribe_subtitle")}
            </p>

            {submitted ? (
              <p
                role="status"
                className="mt-5 rounded-md bg-accent-green/10 px-4 py-3 text-sm text-accent-green ring-1 ring-accent-green/20"
              >
                {t(locale, "subscribe_success")}
              </p>
            ) : (
              <Form
                method="post"
                action="?index"
                className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="email" className="sr-only">
                  {t(locale, "subscribe_email_label")}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder={t(locale, "subscribe_email_placeholder")}
                  className="flex-1 rounded-md border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
                  aria-invalid={errorKey ? true : undefined}
                  aria-describedby={errorKey ? "email-error" : undefined}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700 disabled:opacity-60"
                >
                  {t(locale, "subscribe_button")}
                </button>
              </Form>
            )}

            {errorKey && (
              <p id="email-error" role="alert" className="mt-3 text-sm text-destructive">
                {t(locale, errorKey)}
              </p>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              {t(locale, "subscribe_privacy_note")}
            </p>
          </section>
        </main>
      </div>
      <SiteFooter locale={locale} />
    </div>
  );
}
