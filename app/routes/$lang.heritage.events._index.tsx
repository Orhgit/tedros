// /:lang/heritage/events — Heritage events landing (RIN-422 / RIN-417).
// Lists the 3 community-significant heritage events with next-observance
// dates and links into per-event hubs.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.heritage.events._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { glyphForHeritageEvent } from "~/lib/heritage/categories";
import { HERITAGE_EVENTS, nextDate } from "~/lib/heritage/events.server";
import { eventPath } from "~/lib/heritage/links";
import { breadcrumbJsonLd } from "~/lib/heritage/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const events = HERITAGE_EVENTS.map((e) => ({
    slug: e.slug,
    name: e.name[locale] ?? e.name.he,
    shortDescription: e.shortDescription[locale] ?? e.shortDescription.he,
    dateDescription: e.dateDescription[locale] ?? e.dateDescription.he,
    nextObservance: nextDate(e),
  }));
  const { PUBLIC_URL } = getEnv();
  return { locale, events, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "heritage_events_landing_title");
  const description = t(locale, "heritage_events_landing_subtitle");
  const _url = `${publicUrl}/${locale}/heritage/events`;

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: title, path: "/heritage/events" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/heritage/events"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { "script:ld+json": breadcrumb },
  ];
};

export default function HeritageEventsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, events } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/heritage/events`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "heritage_events_landing_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "heritage_events_landing_subtitle")}
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <li key={e.slug}>
              <Link
                to={`/${locale}${eventPath(e.slug)}`}
                className="block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-earth-900">
                    {e.name}
                  </h3>
                  <span aria-hidden="true" className="text-xl leading-none">
                    {glyphForHeritageEvent(e.slug)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {e.shortDescription}
                </p>
                <div className="mt-3 space-y-1 text-xs text-ink-700">
                  <p>{e.dateDescription}</p>
                  {e.nextObservance && (
                    <p className="font-medium text-earth-800">
                      {t(locale, "heritage_events_next_observance_label")}:{" "}
                      {e.nextObservance}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
