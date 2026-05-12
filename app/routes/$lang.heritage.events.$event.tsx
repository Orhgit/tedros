// /:lang/heritage/events/:event — Heritage event hub (RIN-422 / RIN-417).
// Renders the event's HE/EN/AM body + links into the relevant cities
// (programmatic cells handled by `$lang.heritage.events.$event.$city.tsx`).

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.heritage.events.$event";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { glyphForHeritageEvent, isHeritageEvent } from "~/lib/heritage/categories";
import {
  findHeritageEvent,
  heritageEventBody,
  nextDate,
} from "~/lib/heritage/events.server";
import { eventCityPath, eventPath, eventsLandingPath } from "~/lib/heritage/links";
import { relevantCities } from "~/lib/heritage/relevance";
import { breadcrumbJsonLd, heritageEventJsonLd } from "~/lib/heritage/schema";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getGlossaryEntry } from "~/lib/db/queries/glossary.server";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const eventParam = params.event;
  if (!eventParam || !isHeritageEvent(eventParam)) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const event = findHeritageEvent(eventParam);
  if (!event) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const html = renderMarkdown(heritageEventBody(event, locale));
  const next = nextDate(event);

  const cities = relevantCities(event.slug, CITIES).map((c) => ({
    slug: c.slug,
    name: cityName(c, locale),
  }));

  const relatedRights = event.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }))
    .slice(0, 4);

  const relatedTerms = event.relatedTerms
    .map((slug) => getGlossaryEntry(slug, locale))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    .map((g) => ({ slug: g.slug, term: g.term, summary: g.summary }))
    .slice(0, 4);

  const relatedOrgs = event.relatedOrgs
    .map((slug) => getOrgEntry(slug, locale))
    .filter((o): o is NonNullable<typeof o> => o !== null)
    .map((o) => ({ slug: o.slug, name: o.name, shortDescription: o.shortDescription }))
    .slice(0, 3);

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${eventPath(event.slug)}`;

  return {
    locale,
    event,
    html,
    next,
    cities,
    relatedRights,
    relatedTerms,
    relatedOrgs,
    shareUrl,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, event, next, publicUrl } = data;
  const name = event.name[locale] ?? event.name.he;
  const description = event.shortDescription[locale] ?? event.shortDescription.he;

  const eventJsonLd = heritageEventJsonLd(
    { publicUrl, locale },
    {
      slug: event.slug,
      name: event.name,
      description: event.shortDescription,
      startDate: next,
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "heritage_events_landing_title"), path: eventsLandingPath() },
    { name, path: eventPath(event.slug) },
  ]);

  return [
    { title: `${name} — Tedros` },
    { name: "description", content: description },
    {
      tagName: "link",
      rel: "canonical",
      href: `${publicUrl}/${locale}${eventPath(event.slug)}`,
    },
    { property: "og:title", content: name },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": eventJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function HeritageEventDetail({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    event,
    html,
    next,
    cities,
    relatedRights,
    relatedTerms,
    relatedOrgs,
    shareUrl,
  } = loaderData;
  const name = event.name[locale] ?? event.name.he;
  const description = event.shortDescription[locale] ?? event.shortDescription.he;
  const dateDescription = event.dateDescription[locale] ?? event.dateDescription.he;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/heritage/events`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative mb-8 overflow-hidden rounded-2xl border border-accent-sigd/30 bg-accent-sigd/5 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.15]"
            loading="lazy"
            decoding="async"
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${eventsLandingPath()}`} className="hover:underline">
              {t(locale, "heritage_events_landing_title")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForHeritageEvent(event.slug)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{description}</p>
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

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-6">
          <WhatsAppShare title={name} url={shareUrl} locale={locale} />
        </div>

        {cities.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "heritage_events_cities_heading", { event: name })}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${locale}${eventCityPath(event.slug, c.slug)}`}
                    className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedRights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "heritage_events_related_rights_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedRights.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${locale}/rights/${r.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{r.title}</span>
                    <span className="mt-1 block text-ink-600">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedOrgs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "heritage_events_related_orgs_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {relatedOrgs.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/${locale}/orgs/${o.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{o.name}</span>
                    <span className="mt-1 block text-ink-600">{o.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedTerms.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "heritage_events_related_terms_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {relatedTerms.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/${locale}/glossary/${g.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{g.term}</span>
                    <span className="mt-1 block text-ink-600">{g.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${eventsLandingPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "heritage_events_back_to_landing")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
