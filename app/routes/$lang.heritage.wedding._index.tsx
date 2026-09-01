// /:lang/heritage/wedding — Ethiopian wedding & henna planning guide plus
// the entry point to the supplier directory (TED-143).
//
// JSON-LD: Article + FAQPage + BreadcrumbList.
//
// All long-form copy is resolved in the loader from `wedding.server.ts` and
// `wedding-suppliers.server.ts`; `meta` reads only what the loader returned,
// because `meta` ships to the client and cannot import a `.server` module
// (ADR-020 §4).

import { Link } from "react-router";

import type { Route } from "./+types/$lang.heritage.wedding._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import {
  kessimLandingPath,
  marriagePath,
  weddingJoinPath,
  weddingPath,
  weddingSupplierCategoryPath,
} from "~/lib/heritage/links";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  heritageArticleJsonLd,
} from "~/lib/heritage/schema";
import {
  ALL_WEDDING_SUPPLIER_CATEGORIES,
  glyphForWeddingCategory,
} from "~/lib/heritage/wedding-categories";
import {
  BETA_ISRAEL_TERMS,
  HABESHA_TERMS,
  WEDDING_BODY,
  WEDDING_FAQ,
  WEDDING_SOURCES,
  WEDDING_STAGES,
  WEDDING_SUBTITLE,
  WEDDING_TITLE,
  weddingCopy,
} from "~/lib/heritage/wedding.server";
import {
  categoryIntro,
  categoryName,
  citiesForCategory,
  supplierCountLabel,
  suppliersByCategory,
} from "~/lib/heritage/wedding-suppliers.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

/** First published — bump `dateModified` in `meta` on substantive edits. */
const PUBLISHED_AT = "2026-09-01";

/** The wave-10 news article this guide grew out of. */
const NEWS_SLUG = "hit-animation-ethiopian-wedding-traditions-2026";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const categories = ALL_WEDDING_SUPPLIER_CATEGORIES.map((slug) => {
    const count = suppliersByCategory(slug).length;
    const cityCount = citiesForCategory(slug).length;
    return {
      slug,
      glyph: glyphForWeddingCategory(slug),
      name: categoryName(slug, locale),
      intro: categoryIntro(slug, locale),
      countLabel: supplierCountLabel(count, cityCount, locale),
    };
  });

  return {
    locale,
    publicUrl: PUBLIC_URL,
    title: WEDDING_TITLE[locale],
    subtitle: WEDDING_SUBTITLE[locale],
    body: WEDDING_BODY[locale],
    stages: WEDDING_STAGES.map((s) => ({
      id: s.id,
      timing: s.timing[locale],
      title: s.title[locale],
      detail: s.detail[locale],
      internalPath: s.internalPath,
      internalLabel: s.internalLabel?.[locale],
    })),
    betaIsraelTerms: BETA_ISRAEL_TERMS.map((x) => ({
      term: x.term[locale],
      geez: x.geez ?? null,
      meaning: x.meaning[locale],
    })),
    habeshaTerms: HABESHA_TERMS.map((x) => ({
      term: x.term[locale],
      geez: x.geez ?? null,
      meaning: x.meaning[locale],
    })),
    faq: WEDDING_FAQ.map((f) => ({
      id: f.id,
      question: f.question[locale],
      answer: f.answer[locale],
    })),
    sources: WEDDING_SOURCES.map((s) => ({ name: s.name[locale], url: s.url })),
    categories,
    copy: {
      bodyHeading: weddingCopy("bodyHeading", locale),
      stagesHeading: weddingCopy("stagesHeading", locale),
      faqHeading: weddingCopy("faqHeading", locale),
      betaIsraelTermsHeading: weddingCopy("betaIsraelTermsHeading", locale),
      habeshaTermsHeading: weddingCopy("habeshaTermsHeading", locale),
      habeshaTermsNote: weddingCopy("habeshaTermsNote", locale),
      variationNote: weddingCopy("variationNote", locale),
      suppliersHeading: weddingCopy("suppliersHeading", locale),
      suppliersIntro: weddingCopy("suppliersIntro", locale),
      joinCta: weddingCopy("joinCta", locale),
      joinCtaBody: weddingCopy("joinCtaBody", locale),
      relatedHeading: weddingCopy("relatedHeading", locale),
      relatedMarriage: weddingCopy("relatedMarriage", locale),
      relatedKessim: weddingCopy("relatedKessim", locale),
      relatedNews: weddingCopy("relatedNews", locale),
      sourcesHeading: weddingCopy("sourcesHeading", locale),
      disclaimer: weddingCopy("disclaimer", locale),
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, subtitle, faq, publicUrl } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, weddingPath()),
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
          path: weddingPath(),
          headline: title,
          description: subtitle,
          datePublished: PUBLISHED_AT,
        },
      ),
    },
    {
      "script:ld+json": faqPageJsonLd(
        { publicUrl, locale },
        weddingPath(),
        faq.map((f) => ({ question: f.question, answer: f.answer })),
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: title, path: weddingPath() },
      ]),
    },
  ];
};

export default function WeddingHub({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    title,
    subtitle,
    body,
    stages,
    betaIsraelTerms,
    habeshaTerms,
    faq,
    sources,
    categories,
    copy,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${weddingPath()}`} />

      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>
        </nav>

        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 px-6 py-8 sm:px-10 sm:py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        <section className="mb-10 rounded-2xl border border-earth-200 bg-card p-6">
          <h2 className="mb-3 font-display text-xl font-semibold text-earth-900">
            {copy.bodyHeading}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed whitespace-pre-line text-ink-700">
            {body}
          </div>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            {copy.variationNote}
          </p>
        </section>

        {/* Stages */}
        <section className="mb-10" aria-labelledby="wedding-stages-heading">
          <h2
            id="wedding-stages-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {copy.stagesHeading}
          </h2>
          <ol className="space-y-4">
            {stages.map((stage, i) => (
              <li
                key={stage.id}
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
                    <p className="text-xs font-medium tracking-wide text-earth-700 uppercase">
                      {stage.timing}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold text-earth-900">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700">
                      {stage.detail}
                    </p>
                    {stage.internalPath && (
                      <Link
                        to={`/${locale}${stage.internalPath}`}
                        className="mt-2 inline-block text-xs font-medium text-earth-700 underline hover:text-earth-900"
                      >
                        {stage.internalLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Supplier directory */}
        <section className="mb-10" aria-labelledby="wedding-suppliers-heading">
          <h2
            id="wedding-suppliers-heading"
            className="mb-2 font-display text-xl font-semibold text-earth-900"
          >
            {copy.suppliersHeading}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-ink-700">
            {copy.suppliersIntro}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/${locale}${weddingSupplierCategoryPath(c.slug)}`}
                  className="block h-full rounded-xl border border-earth-200 bg-card p-5 transition hover:border-earth-400 hover:shadow-sm"
                >
                  <span className="font-display text-base font-semibold text-earth-900">
                    <span aria-hidden="true">{c.glyph}</span> {c.name}
                  </span>
                  <span className="mt-1 block text-xs text-ink-500">
                    {c.countLabel}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-700">
                    {c.intro}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-earth-200 bg-earth-50 p-5">
            <h3 className="font-display text-base font-semibold text-earth-900">
              {copy.joinCta}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-700">
              {copy.joinCtaBody}
            </p>
            <Link
              to={`/${locale}${weddingJoinPath()}`}
              className="mt-3 inline-block text-sm font-medium text-earth-700 underline hover:text-earth-900"
            >
              {copy.joinCta}
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10" aria-labelledby="wedding-faq-heading">
          <h2
            id="wedding-faq-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {copy.faqHeading}
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
                <p className="mt-1 text-sm leading-relaxed text-ink-700">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Terms — two deliberately separate lists */}
        <section className="mb-10" aria-labelledby="wedding-terms-heading">
          <h2
            id="wedding-terms-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {copy.betaIsraelTermsHeading}
          </h2>
          <dl className="space-y-3">
            {betaIsraelTerms.map((x) => (
              <div
                key={x.term}
                className="rounded-lg border border-earth-200 bg-card p-4"
              >
                <dt className="font-display text-sm font-semibold text-earth-900">
                  {x.term}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-700">
                  {x.meaning}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 mb-2 font-display text-lg font-semibold text-earth-900">
            {copy.habeshaTermsHeading}
          </h3>
          <p className="mb-3 text-xs leading-relaxed text-ink-600">
            {copy.habeshaTermsNote}
          </p>
          <dl className="space-y-3">
            {habeshaTerms.map((x) => (
              <div
                key={x.term}
                className="rounded-lg border border-earth-200 bg-card p-4"
              >
                <dt className="font-display text-sm font-semibold text-earth-900">
                  {x.term}
                  {x.geez && locale !== "am" ? (
                    <span className="ms-2 font-normal text-ink-500">{x.geez}</span>
                  ) : null}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-700">
                  {x.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related reading */}
        <section
          className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
          aria-labelledby="wedding-related-heading"
        >
          <h2
            id="wedding-related-heading"
            className="mb-2 font-display text-base font-semibold text-earth-900"
          >
            {copy.relatedHeading}
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to={`/${locale}${marriagePath()}`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {copy.relatedMarriage}
              </Link>
            </li>
            <li>
              <Link
                to={`/${locale}${kessimLandingPath()}`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {copy.relatedKessim}
              </Link>
            </li>
            <li>
              <Link
                to={`/${locale}/news/${NEWS_SLUG}`}
                className="text-earth-700 underline hover:text-earth-900"
              >
                {copy.relatedNews}
              </Link>
            </li>
          </ul>
        </section>

        {/* Sources */}
        <section
          className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
          aria-labelledby="wedding-sources-heading"
        >
          <h2
            id="wedding-sources-heading"
            className="font-display text-base font-semibold text-earth-900"
          >
            {copy.sourcesHeading}
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
          <p className="mt-3 text-xs text-ink-600">{copy.disclaimer}</p>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
