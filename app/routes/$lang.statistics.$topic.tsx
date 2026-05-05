// /:lang/statistics/:topic — Statistics topic detail (RIN-423 / RIN-417).
// One page per topic, listing 4-5 figures with sources. Emits a `Dataset`
// JSON-LD (Google Dataset Search eligible).

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.statistics.$topic";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { glyphForStatTopic, isStatTopic } from "~/lib/statistics/categories";
import { breadcrumbJsonLd, statTopicJsonLd } from "~/lib/statistics/schema";
import {
  STAT_TOPICS,
  findStatTopic,
  pickFigure,
  statTopicDescription,
  statTopicName,
} from "~/lib/statistics/topics.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.topic || !isStatTopic(params.topic)) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const topic = findStatTopic(params.topic);
  if (!topic) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const figures = topic.figures.map((f) => ({
    id: f.id,
    heading: pickFigure(f, locale, "heading"),
    figure: pickFigure(f, locale, "figure"),
    context: pickFigure(f, locale, "context"),
    source: f.source,
    publishedYear: f.publishedYear,
  }));

  // Sibling topics for the cross-link footer.
  const siblings = STAT_TOPICS.filter((t) => t.slug !== topic.slug)
    .slice(0, 4)
    .map((t) => ({
      slug: t.slug,
      name: statTopicName(t, locale),
    }));

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/statistics/${topic.slug}`;

  return { locale, topic, figures, siblings, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, topic, publicUrl } = data;
  const name = statTopicName(topic, locale);
  const description = statTopicDescription(topic, locale);
  const url = `${publicUrl}/${locale}/statistics/${topic.slug}`;

  const datasetJsonLd = statTopicJsonLd(
    { publicUrl, locale },
    {
      topicSlug: topic.slug,
      name,
      description,
      temporalCoverage: "2024",
      keywords: [
        "Ethiopian-Israeli",
        "Beta Israel",
        "Israel demographics",
        "קהילה אתיופית",
      ],
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "statistics_landing_title"), path: "/statistics" },
    { name, path: `/statistics/${topic.slug}` },
  ]);

  return [
    { title: `${name} — ${t(locale, "statistics_landing_title")} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: name },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": datasetJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function StatisticsTopicDetail({ loaderData }: Route.ComponentProps) {
  const { locale, topic, figures, siblings, shareUrl } = loaderData;
  const name = statTopicName(topic, locale);
  const description = statTopicDescription(topic, locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/statistics`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-card p-6 sm:p-10">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/statistics`} className="hover:underline">
              {t(locale, "statistics_landing_title")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForStatTopic(topic.slug)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{description}</p>
            </div>
          </div>
        </header>

        <ul className="space-y-6">
          {figures.map((f) => (
            <li
              key={f.id}
              className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-lg font-semibold text-earth-900">
                  {f.heading}
                </h2>
                <span className="font-display text-2xl font-bold text-earth-700 sm:text-3xl">
                  {f.figure}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{f.context}</p>
              <p className="mt-3 text-xs text-ink-600">
                {t(locale, "statistics_source_label")}:{" "}
                <a
                  href={f.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-earth-800 underline hover:no-underline"
                >
                  {f.source.name}
                </a>{" "}
                · {f.publishedYear}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-lg border border-earth-200 bg-earth-50 p-5 text-sm text-ink-700">
          <p>{t(locale, "statistics_methodology_note")}</p>
        </div>

        <div className="mt-6">
          <WhatsAppShare title={name} url={shareUrl} locale={locale} />
        </div>

        {siblings.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "statistics_siblings_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${locale}/statistics/${s.slug}`}
                    className="block rounded-md border border-earth-200 bg-card p-3 text-sm text-earth-800 transition hover:border-earth-400 hover:shadow-sm"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/statistics`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "statistics_back_to_landing")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
