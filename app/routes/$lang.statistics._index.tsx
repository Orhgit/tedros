// /:lang/statistics — Statistics demographics landing (RIN-423 / RIN-417).
// Lists 8 community-statistics topics + a sidelink to the careers/employment
// statistics page (which lives under the Careers Hub).

import { Link } from "react-router";

import type { Route } from "./+types/$lang.statistics._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { glyphForStatTopic } from "~/lib/statistics/categories";
import { breadcrumbJsonLd } from "~/lib/statistics/schema";
import {
  STAT_TOPICS,
  statTopicDescription,
  statTopicName,
} from "~/lib/statistics/topics.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const topics = STAT_TOPICS.map((tp) => ({
    slug: tp.slug,
    name: statTopicName(tp, locale),
    shortDescription: statTopicDescription(tp, locale),
    figureCount: tp.figures.length,
  }));
  const { PUBLIC_URL } = getEnv();
  return { locale, topics, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "statistics_landing_title");
  const description = t(locale, "statistics_landing_subtitle");
  const url = `${publicUrl}/${locale}/statistics`;

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: title, path: "/statistics" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { "script:ld+json": breadcrumb },
  ];
};

export default function StatisticsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, topics } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/statistics`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "statistics_landing_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "statistics_landing_subtitle")}
          </p>
          <p className="mt-3 text-xs text-ink-600">
            {t(locale, "statistics_data_year_label")}: 2024
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {topics.map((tp) => (
            <li key={tp.slug}>
              <Link
                to={`/${locale}/statistics/${tp.slug}`}
                className="block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-earth-900">
                    {tp.name}
                  </h3>
                  <span aria-hidden="true" className="text-xl leading-none">
                    {glyphForStatTopic(tp.slug)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {tp.shortDescription}
                </p>
                <p className="mt-3 text-xs text-earth-700">
                  {tp.figureCount} {t(locale, "statistics_figures_label")}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Sidelink to careers employment statistics — same surface, different vertical. */}
        <section className="mt-10 rounded-lg border border-earth-200 bg-earth-50 p-5">
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "statistics_employment_link_label")}
          </p>
          <p className="mt-1 text-sm text-ink-700">
            {t(locale, "statistics_employment_link_body")}
          </p>
          <Link
            to={`/${locale}/careers/statistics`}
            className="mt-3 inline-flex items-center gap-2 text-sm text-earth-800 hover:underline"
          >
            {t(locale, "statistics_employment_link_cta")} →
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
