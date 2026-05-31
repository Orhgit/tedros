// /:lang/heritage/events/:event/:city — Programmatic SEO cell (RIN-422).
//
// One page per (event × city) where the pair is relevant via
// `isRelevant`. Inherits the event's body + adds a city overlay so each
// cell carries unique on-page content (defends against thin-content).

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.heritage.events.$event.$city";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { glyphForHeritageEvent, isHeritageEvent } from "~/lib/heritage/categories";
import {
  HERITAGE_EVENTS,
  findHeritageEvent,
  heritageEventBody,
  nextDate,
} from "~/lib/heritage/events.server";
import { eventCityPath, eventPath, eventsLandingPath } from "~/lib/heritage/links";
import { isRelevant } from "~/lib/heritage/relevance";
import { breadcrumbJsonLd, heritageEventJsonLd } from "~/lib/heritage/schema";
import { cityName, cityOverview, findCityBySlug } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

function prepFor(locale: Locale): string {
  return locale === "en" ? "in " : locale === "am" ? "በ" : "ב";
}

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const eventParam = params.event;
  const cityParam = params.city;
  if (!eventParam || !cityParam || !isHeritageEvent(eventParam)) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const event = findHeritageEvent(eventParam);
  const city = findCityBySlug(cityParam);
  if (!event || !city) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  if (!isRelevant(event.slug, city.slug)) {
    throw data({ error: "not-relevant" }, { status: 404 });
  }

  const html = renderMarkdown(heritageEventBody(event, locale));
  const next = nextDate(event);
  const cityNameLocal = cityName(city, locale);
  const cityOverviewLocal = cityOverview(city, locale);

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${eventCityPath(event.slug, city.slug)}`;

  const otherCityEvents = HERITAGE_EVENTS.filter(
    (e) => e.slug !== event.slug && isRelevant(e.slug, city.slug),
  ).map((e) => ({
    slug: e.slug,
    name: e.name[locale] ?? e.name.he,
    next: nextDate(e),
  }));

  return {
    locale,
    event,
    city,
    cityNameLocal,
    cityOverviewLocal,
    html,
    next,
    shareUrl,
    publicUrl: PUBLIC_URL,
    otherCityEvents,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, event, city, cityNameLocal, next, publicUrl } = data;
  const eventName = event.name[locale] ?? event.name.he;
  const description = event.shortDescription[locale] ?? event.shortDescription.he;
  const prep = prepFor(locale);
  const title = `${eventName} ${prep}${cityNameLocal} — Tedros`;

  const eventJsonLd = heritageEventJsonLd(
    { publicUrl, locale },
    {
      slug: event.slug,
      name: { he: eventName, en: eventName, am: eventName },
      description: event.shortDescription,
      startDate: next,
      location: { name: cityNameLocal, addressLocality: cityNameLocal },
      citySlug: city.slug,
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "heritage_events_landing_title"), path: eventsLandingPath() },
    { name: eventName, path: eventPath(event.slug) },
    { name: cityNameLocal, path: eventCityPath(event.slug, city.slug) },
  ]);

  return [
    { title },
    { name: "description", content: `${description} ${prep}${cityNameLocal}.` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    ...hreflangMeta(publicUrl, locale, eventCityPath(event.slug, city.slug)),
    { "script:ld+json": eventJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function HeritageEventCityCell({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    event,
    city,
    cityNameLocal,
    cityOverviewLocal,
    html,
    next,
    shareUrl,
    otherCityEvents,
  } = loaderData;
  const eventName = event.name[locale] ?? event.name.he;
  const dateDescription = event.dateDescription[locale] ?? event.dateDescription.he;
  const prep = prepFor(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/heritage/events`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative isolate mb-6 overflow-hidden rounded-2xl border border-accent-sigd/30 bg-accent-sigd/5 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${eventsLandingPath()}`} className="hover:underline">
              {t(locale, "heritage_events_landing_title")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${eventPath(event.slug)}`} className="hover:underline">
              {eventName}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForHeritageEvent(event.slug)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {eventName}{" "}
                <span className="text-earth-700">
                  {prep}
                  {cityNameLocal}
                </span>
              </h1>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-ink-700 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-700 uppercase">
                {t(locale, "heritage_events_when_label")}
              </p>
              <p className="mt-1">{dateDescription}</p>
            </div>
            {next && (
              <div>
                <p className="text-xs font-semibold tracking-wide text-earth-700 uppercase">
                  {t(locale, "heritage_events_next_observance_label")}
                </p>
                <p className="mt-1 font-medium text-earth-800">{next}</p>
              </div>
            )}
          </div>
        </header>

        {/* City context overlay — keeps each cell uniquely-content-rich. */}
        <section className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="text-sm font-semibold tracking-wide text-earth-900 uppercase">
            {t(locale, "rights_city_context_heading")} {cityNameLocal}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-700">
            {cityOverviewLocal}
          </p>
          <p className="mt-3 text-sm text-earth-700">
            <Link to={`/${locale}/cities/${city.slug}`} className="hover:underline">
              {t(locale, "rights_city_more_link")}
            </Link>
          </p>
        </section>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-6">
          <WhatsAppShare
            title={`${eventName} ${prep}${cityNameLocal}`}
            url={shareUrl}
            locale={locale}
          />
        </div>

        {otherCityEvents.length > 0 && (
          <section className="mt-10 rounded-2xl border border-earth-200 bg-earth-50 p-5">
            <h2 className="text-sm font-semibold tracking-wide text-earth-900 uppercase">
              {t(locale, "heritage_events_landing_title")} — {cityNameLocal}
            </h2>
            <ul className="mt-3 space-y-2">
              {otherCityEvents.map((e) => (
                <li key={e.slug}>
                  <Link
                    to={`/${locale}${eventCityPath(e.slug, city.slug)}`}
                    className="flex items-center justify-between rounded-lg border border-earth-200 bg-white p-3 text-sm transition hover:border-earth-400"
                  >
                    <span className="text-ink-800">{e.name}</span>
                    {e.next && <span className="text-xs text-earth-600">{e.next}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${eventPath(event.slug)}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "heritage_events_back_to_event", { event: eventName })}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
