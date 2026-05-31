// /:lang/voice/racism-report — How to report racism incidents in Israel.
//
// Covers: Tebeka, ACRI, police complaint process, documenting incidents,
// legal protection. Schema.org: WebPage + BreadcrumbList.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.voice.racism-report";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { voicePath, racismReportPath } from "~/lib/voice/links";
import { breadcrumbJsonLd, webPageJsonLd } from "~/lib/voice/schema";
import {
  RACISM_REPORT_TOPIC,
  topicTitle,
  topicSubtitle,
  topicBody,
  resourceDescription,
} from "~/lib/voice/topics.server";

const VOICE_HERO_IMG =
  "https://images.unsplash.com/photo-1764145144753-922ae256714b?fm=webp&q=70&w=1200&fit=crop";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const title = topicTitle(RACISM_REPORT_TOPIC, locale);
  const subtitle = topicSubtitle(RACISM_REPORT_TOPIC, locale);
  const body = topicBody(RACISM_REPORT_TOPIC, locale);

  const resources = RACISM_REPORT_TOPIC.resources.map((r) => ({
    name: r.name,
    phone: r.phone,
    url: r.url,
    description: resourceDescription(r, locale),
  }));

  const webPage = webPageJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    { path: racismReportPath(), name: title, description: subtitle },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "voice_breadcrumb_home"), path: "/" },
    { name: t(locale, "voice_breadcrumb_voice"), path: "/voice" },
    { name: title, path: racismReportPath() },
  ]);

  return {
    locale,
    publicUrl: PUBLIC_URL,
    title,
    subtitle,
    body,
    resources,
    lastReviewed: RACISM_REPORT_TOPIC.lastReviewed,
    webPage,
    breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, title, subtitle, webPage, breadcrumb } = data;
  const url = `${publicUrl}/${locale}${racismReportPath()}`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, racismReportPath()),
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": webPage },
    { "script:ld+json": breadcrumb },
  ];
};

export default function RacismReport({ loaderData }: Route.ComponentProps) {
  const { locale, title, subtitle, body, resources, lastReviewed } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/voice`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "voice_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${voicePath()}`} className="hover:underline">
            {t(locale, "voice_breadcrumb_voice")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        {/* Page header */}
        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src={VOICE_HERO_IMG}
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
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* Body content */}
        <article className="mb-10 rounded-2xl border border-earth-200 bg-card p-6 sm:p-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-earth-900">
            {t(locale, "voice_report_steps_heading")}
          </h2>
          <div className="space-y-4">
            {body.split("\n\n").map((para, idx) => {
              const trimmed = para.trim();
              if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                return (
                  <h3
                    key={idx}
                    className="mt-2 font-display text-base font-semibold text-earth-900"
                  >
                    {trimmed.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              // Bold inline headings like **Step 1 — ...**
              const boldMatch = trimmed.match(/^\*\*(.+?)\*\*(.*)$/s);
              if (boldMatch) {
                return (
                  <p key={idx} className="text-sm leading-relaxed text-ink-700">
                    <strong className="font-semibold text-earth-900">
                      {boldMatch[1]}
                    </strong>
                    {boldMatch[2]}
                  </p>
                );
              }
              return (
                <p key={idx} className="text-sm leading-relaxed text-ink-700">
                  {trimmed}
                </p>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-ink-500">
            {t(locale, "voice_last_reviewed_label")}: {lastReviewed}
          </p>
        </article>

        {/* Resources */}
        <section className="mb-10" aria-labelledby="racism-resources-heading">
          <h2
            id="racism-resources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "voice_resources_heading")}
          </h2>
          <ul className="space-y-4">
            {resources.map((resource) => (
              <li
                key={resource.name}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {resource.name}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{resource.description}</p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {resource.phone && (
                    <a
                      href={`tel:${resource.phone.replace(/-/g, "")}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-earth-700 hover:underline"
                    >
                      <span aria-hidden="true">📞</span>
                      {resource.phone}
                    </a>
                  )}
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-earth-700 hover:underline"
                    >
                      {resource.url.replace(/^https?:\/\//, "")}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${voicePath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "voice_back_to_hub")}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
