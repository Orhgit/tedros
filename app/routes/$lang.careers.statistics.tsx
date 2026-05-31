// /:lang/careers/statistics — Employment statistics for the Ethiopian-Israeli
// community (RIN-475 / RIN-469). Eight curated figures from CBS / ENP / State
// Comptroller / Bank of Israel sources, each with citation. Emits a
// `Dataset` JSON-LD block so the page is eligible for Google Dataset Search.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.careers.statistics";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import {
  CAREERS_STATISTICS,
  statBody,
  statFigure,
  statHeading,
} from "~/lib/careers/statistics.server";
import { breadcrumbJsonLd, careersStatisticsJsonLd } from "~/lib/careers/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const stats = CAREERS_STATISTICS.map((s) => ({
    id: s.id,
    heading: statHeading(s, locale),
    figure: statFigure(s, locale),
    body: statBody(s, locale),
    source: s.source,
    publishedYear: s.publishedYear,
  }));
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/careers/statistics`;
  return { locale, stats, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "careers_statistics_title");
  const description = t(locale, "careers_statistics_subtitle");
  const url = `${publicUrl}/${locale}/careers/statistics`;

  const datasetJsonLd = careersStatisticsJsonLd(
    { publicUrl, locale },
    {
      name: { he: title, en: title, am: title },
      description: { he: description, en: description, am: description },
      temporalCoverage: "2023/2024",
      keywords: [
        "Ethiopian-Israeli employment",
        "civil-service representation",
        "wage gap",
        "תעסוקה",
        "ייצוג הולם",
      ],
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: title, path: "/careers/statistics" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/careers/statistics"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": datasetJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function CareersStatistics({ loaderData }: Route.ComponentProps) {
  const { locale, stats, shareUrl } = loaderData;
  const title = t(locale, "careers_statistics_title");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative mb-10 isolate overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "careers_statistics_subtitle")}
          </p>
          <p className="mt-3 text-xs text-ink-600">
            {t(locale, "careers_statistics_temporal_label")}: 2023-2024
          </p>
        </header>

        <ul className="space-y-6">
          {stats.map((s) => (
            <li
              key={s.id}
              className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-lg font-semibold text-earth-900">
                  {s.heading}
                </h2>
                <span className="font-display text-2xl font-bold text-earth-700 sm:text-3xl">
                  {s.figure}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{s.body}</p>
              <p className="mt-3 text-xs text-ink-600">
                {t(locale, "careers_statistics_source_label")}:{" "}
                <a
                  href={s.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-earth-800 underline hover:no-underline"
                >
                  {s.source.name}
                </a>{" "}
                · {s.publishedYear}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-lg border border-earth-200 bg-earth-50 p-5 text-sm text-ink-700">
          <p>{t(locale, "careers_statistics_methodology_note")}</p>
        </div>

        <div className="mt-6">
          <WhatsAppShare title={title} url={shareUrl} locale={locale} />
        </div>

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_track_back_to_hub")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
