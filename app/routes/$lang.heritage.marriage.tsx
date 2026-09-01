// /:lang/heritage/marriage — marriage registration guide for
// Ethiopian-Israelis (TED-140). The Rabbanut track step by step, when a
// birur yahadut is required, the documents, the role of the kes, and where
// to get free help. JSON-LD: Article + FAQPage + BreadcrumbList.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.heritage.marriage";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  MARRIAGE_BODY,
  MARRIAGE_FAQ,
  MARRIAGE_RESOURCES,
  MARRIAGE_SOURCES,
  MARRIAGE_STEPS,
  MARRIAGE_SUBTITLE,
  MARRIAGE_TITLE,
  marriageCopy,
} from "~/lib/heritage/marriage.server";
import { kessimLandingPath, marriagePath, weddingPath } from "~/lib/heritage/links";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  heritageArticleJsonLd,
} from "~/lib/heritage/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

/**
 * First published — bump `dateModified` in `meta` on substantive edits.
 * Declared here rather than imported from the server module: `meta` is not
 * stripped from the client bundle, so anything it references must be
 * client-safe.
 */
const PUBLISHED_AT = "2026-08-30";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  return {
    locale,
    title: MARRIAGE_TITLE[locale],
    subtitle: MARRIAGE_SUBTITLE[locale],
    body: MARRIAGE_BODY[locale],
    steps: MARRIAGE_STEPS.map((s) => ({
      id: s.id,
      title: s.title[locale],
      detail: s.detail[locale],
      officialUrl: s.officialUrl,
      officialLabel: s.officialLabel?.[locale],
      internalPath: s.internalPath,
      internalLabel: s.internalLabel?.[locale],
    })),
    faq: MARRIAGE_FAQ.map((f) => ({
      id: f.id,
      question: f.question[locale],
      answer: f.answer[locale],
    })),
    resources: MARRIAGE_RESOURCES.map((r) => ({
      name: r.name,
      phone: r.phone,
      url: r.url,
      description: r.description[locale],
    })),
    sources: MARRIAGE_SOURCES.map((s) => ({ name: s.name[locale], url: s.url })),
    // Server-module copy — never reaches the client message bundle.
    kessimCrosslinkBody: marriageCopy("kessimCrosslinkBody", locale),
    weddingCrosslinkHeading: marriageCopy("weddingCrosslinkHeading", locale),
    weddingCrosslinkBody: marriageCopy("weddingCrosslinkBody", locale),
    weddingCrosslinkCta: marriageCopy("weddingCrosslinkCta", locale),
    disclaimer: marriageCopy("disclaimer", locale),
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, subtitle, faq, publicUrl } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, marriagePath()),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": heritageArticleJsonLd(
        { publicUrl, locale },
        {
          path: marriagePath(),
          headline: title,
          description: subtitle,
          datePublished: PUBLISHED_AT,
        },
      ),
    },
    {
      "script:ld+json": faqPageJsonLd(
        { publicUrl, locale },
        marriagePath(),
        faq.map((f) => ({ question: f.question, answer: f.answer })),
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: title, path: marriagePath() },
      ]),
    },
  ];
};

export default function MarriageGuidePage({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    title,
    subtitle,
    body,
    steps,
    faq,
    resources,
    sources,
    kessimCrosslinkBody,
    weddingCrosslinkHeading,
    weddingCrosslinkBody,
    weddingCrosslinkCta,
    disclaimer,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${marriagePath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 px-6 py-8 sm:px-10 sm:py-12">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* Steps first — the "what do I actually do" answer. */}
        <section className="mb-10" aria-labelledby="marriage-steps-heading">
          <h2
            id="marriage-steps-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "marriage_steps_heading")}
          </h2>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li
                key={step.id}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth-100 font-display text-base font-bold text-earth-800"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700">
                      {step.detail}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {step.officialUrl && (
                        <a
                          href={step.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-earth-700 underline hover:text-earth-900"
                        >
                          {step.officialLabel ?? step.officialUrl} ↗
                        </a>
                      )}
                      {step.internalPath && (
                        <Link
                          to={`/${locale}${step.internalPath}`}
                          className="text-xs font-medium text-earth-700 underline hover:text-earth-900"
                        >
                          {step.internalLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Full guide body */}
        <section
          className="mb-10 rounded-2xl border border-earth-200 bg-card p-6"
          aria-labelledby="marriage-guide-heading"
        >
          <h2
            id="marriage-guide-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "marriage_body_heading")}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed whitespace-pre-line text-ink-700">
            {body}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10" aria-labelledby="marriage-faq-heading">
          <h2
            id="marriage-faq-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "marriage_faq_heading")}
          </h2>
          <ul className="space-y-4">
            {faq.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {item.question}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">{item.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Find a kes */}
        <section className="mb-10 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {t(locale, "marriage_kessim_crosslink_heading")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">
            {kessimCrosslinkBody}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                to={`/${locale}${kessimLandingPath()}`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {t(locale, "marriage_kessim_crosslink_cta")}
              </Link>
            </li>
            <li>
              <Link
                to={`/${locale}/rights/kessim-religious-support`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {t(locale, "kessim_related_right")}
              </Link>
            </li>
            <li>
              <Link
                to={`/${locale}/family/mourning`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {t(locale, "kessim_related_mourning")}
              </Link>
            </li>
          </ul>
        </section>

        {/* The ceremony itself (TED-143) */}
        <section className="mb-10 rounded-2xl border border-earth-200 bg-card p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {weddingCrosslinkHeading}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">
            {weddingCrosslinkBody}
          </p>
          <Link
            to={`/${locale}${weddingPath()}`}
            className="mt-3 inline-block text-sm font-medium text-earth-700 underline hover:text-earth-900"
          >
            {weddingCrosslinkCta}
          </Link>
        </section>

        {/* Resources */}
        <section className="mb-10" aria-labelledby="marriage-resources-heading">
          <h2
            id="marriage-resources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "family_resources_heading")}
          </h2>
          <ul className="space-y-4">
            {resources.map((r) => (
              <li key={r.name} className="rounded-xl border border-earth-200 bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {r.name}
                    </h3>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/[^0-9+*]/g, "")}`}
                        className="mt-1 inline-block font-display text-xl font-bold text-earth-700 hover:underline"
                        aria-label={`${r.name}: ${r.phone}`}
                      >
                        {r.phone}
                      </a>
                    )}
                    <p className="mt-1 text-sm text-ink-600">{r.description}</p>
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-md border border-earth-200 px-3 py-1.5 text-xs font-medium text-earth-700 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {locale === "he" ? "לאתר" : locale === "am" ? "ድህረ ገጽ" : "Website"} ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Sources */}
        <section
          className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
          aria-labelledby="marriage-sources-heading"
        >
          <h2
            id="marriage-sources-heading"
            className="font-display text-base font-semibold text-earth-900"
          >
            {locale === "he" ? "מקורות" : locale === "am" ? "ምንጮች" : "Sources"}
          </h2>
          <ul className="mt-2 space-y-1">
            {sources.map((s) => (
              <li key={s.url} className="text-sm text-ink-700">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-earth-900"
                >
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-600">{disclaimer}</p>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
