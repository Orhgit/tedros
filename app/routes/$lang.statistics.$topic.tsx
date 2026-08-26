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
  pickBarChartLabel,
  pickFigure,
  pickFigureConfidenceNote,
  pickTranslatable,
  statTopicDescription,
  statTopicName,
  statTopicNarrative,
  topicTemporalCoverage,
} from "~/lib/statistics/topics.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

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
    confidenceNote: pickFigureConfidenceNote(f, locale),
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
  const csvUrl = `${shareUrl}.csv`;
  const name = statTopicName(topic, locale);
  const description = statTopicDescription(topic, locale);
  const temporalCoverage = topicTemporalCoverage(topic);

  const narrativeMarkdown = statTopicNarrative(topic, locale);
  const narrativeHtml = narrativeMarkdown ? renderMarkdown(narrativeMarkdown) : null;

  const barChart = topic.barChart
    ? {
        heading: pickTranslatable(topic.barChart.heading, locale),
        items: topic.barChart.items.map((item) => ({
          label: pickBarChartLabel(item, locale),
          valuePercent: item.valuePercent,
        })),
        source: topic.barChart.source,
      }
    : null;

  return {
    locale,
    topic,
    figures,
    siblings,
    shareUrl,
    csvUrl,
    publicUrl: PUBLIC_URL,
    name,
    description,
    temporalCoverage,
    narrativeHtml,
    barChart,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, topic, publicUrl, name, description, temporalCoverage } = data;
  const _url = `${publicUrl}/${locale}/statistics/${topic.slug}`;

  const datasetJsonLd = statTopicJsonLd(
    { publicUrl, locale },
    {
      topicSlug: topic.slug,
      name,
      description,
      temporalCoverage,
      ...(topic.slug === "demographics" || topic.slug === "education"
        ? { creatorName: "הלשכה המרכזית לסטטיסטיקה (הלמ״ס) / CBS Israel" }
        : {}),
      includeCsvDistribution: true,
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
    ...hreflangMeta(publicUrl, locale, `/statistics/${topic.slug}`),
    { property: "og:title", content: name },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": datasetJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function StatisticsTopicDetail({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    topic,
    figures,
    siblings,
    shareUrl,
    csvUrl,
    name,
    description,
    narrativeHtml,
    barChart,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/statistics`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1734865934450-719ef6f59a37?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
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
              {f.confidenceNote && (
                <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  ⚠️ {f.confidenceNote}
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* Energy-light CSS bar chart — no chart library (TED-20). */}
        {barChart && (
          <section className="mt-10 rounded-2xl border border-earth-200 bg-card p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold text-earth-900">
              {barChart.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {barChart.items.map((item) => (
                <li key={item.label}>
                  <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-ink-700">{item.label}</span>
                    <span className="font-display font-semibold text-earth-800">
                      {item.valuePercent}%
                    </span>
                  </div>
                  <div
                    className="h-2.5 w-full overflow-hidden rounded-full bg-earth-100"
                    role="img"
                    aria-label={`${item.label}: ${item.valuePercent}%`}
                  >
                    <div
                      className="h-full rounded-full bg-earth-600"
                      style={{ width: `${Math.min(item.valuePercent, 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-600">
              {t(locale, "statistics_source_label")}:{" "}
              <a
                href={barChart.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-800 underline hover:no-underline"
              >
                {barChart.source.name}
              </a>
            </p>
          </section>
        )}

        {narrativeHtml && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "statistics_narrative_heading")}
            </h2>
            <div
              className="prose prose-ink mt-4 max-w-none"
              dangerouslySetInnerHTML={{ __html: narrativeHtml }}
            />
          </section>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-earth-200 bg-earth-50 p-5 text-sm text-ink-700">
          <p>{t(locale, "statistics_methodology_note")}</p>
          <a
            href={csvUrl}
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-earth-300 bg-card px-3 py-2 text-sm font-medium text-earth-800 transition hover:border-earth-500 hover:bg-earth-100"
          >
            <span aria-hidden="true">⬇</span>
            {t(locale, "statistics_csv_download_label")}
          </a>
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
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "statistics_back_to_landing")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
