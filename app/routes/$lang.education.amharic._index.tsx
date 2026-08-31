// /:lang/education/amharic — the Amharic-learning hub (TED-147).
//
// Three things in one page: the interactive fidel chart, family words and
// sentences with transliteration, and a verified list of where to study —
// including the 5-unit bagrut route, which is the least-known entitlement on
// the site and works even when a school does not teach the subject.
//
// JSON-LD: Article + FAQPage + BreadcrumbList.
//
// ADR-020: every string is resolved for the rendered locale in `loader` and
// passed through loader data. `meta` reads only `data` — it never imports the
// `.server` content module, which would fail the build. The one thing that
// does reach the browser is `~/lib/education/fidel`, which is client-safe
// script data by design (see the header of that module).

import type { Route } from "./+types/$lang.education.amharic._index";
import { Link } from "react-router";

import { FidelGrid } from "~/components/education/fidel-grid";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  AMHARIC_COURSES,
  AMHARIC_HUB_CROSSLINKS,
  AMHARIC_HUB_FAQ,
  AMHARIC_HUB_SECTIONS,
  AMHARIC_HUB_SOURCES,
  AMHARIC_HUB_SUBTITLE,
  AMHARIC_HUB_SUMMARY,
  AMHARIC_HUB_TITLE,
  AMHARIC_PHRASES,
  AMHARIC_PUBLISHED_AT,
  AMHARIC_SUPPLY_GAP,
  amharicHubCopy,
} from "~/lib/education/amharic.server";
import { amharicHubPath } from "~/lib/education/links";
import {
  breadcrumbJsonLd,
  educationArticleJsonLd,
  faqPageJsonLd,
} from "~/lib/education/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { formatDate } from "~/lib/i18n/format";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

/**
 * The Ge'ez webfont is normally linked only on /am (TED-128). This page renders
 * 238 Ge'ez glyphs in every locale, so it opts in for itself. React Router
 * merges `links` across matched routes, so he/en pages elsewhere are untouched,
 * and the stylesheet's `unicode-range` means the file is only fetched by a
 * browser that actually has Ethiopic characters to paint.
 */
export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: "/fonts/noto-sans-ethiopic.css" },
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  return {
    locale,
    publicUrl: PUBLIC_URL,
    title: AMHARIC_HUB_TITLE[locale],
    subtitle: AMHARIC_HUB_SUBTITLE[locale],
    // Deliberately the same Amharic text in every locale — it exists so a
    // reader can hand the page to a parent who reads Amharic and not Hebrew.
    summary: AMHARIC_HUB_SUMMARY,
    sections: AMHARIC_HUB_SECTIONS.map((s) => ({
      id: s.id,
      heading: s.heading[locale],
      body: s.body[locale],
    })),
    phraseGroups: AMHARIC_PHRASES.map((g) => ({
      id: g.id,
      heading: g.heading[locale],
      phrases: g.phrases.map((p) => ({
        id: p.id,
        am: p.am,
        translit: p.translit,
        meaning: p.meaning[locale],
        note: p.note?.[locale],
      })),
    })),
    courses: AMHARIC_COURSES.map((c) => ({
      id: c.id,
      name: c.name[locale],
      url: c.url,
      audience: c.audience[locale],
      description: c.description[locale],
      cost: c.cost[locale],
      contact: c.contact,
    })),
    supplyGap: AMHARIC_SUPPLY_GAP[locale],
    faq: AMHARIC_HUB_FAQ.map((f) => ({
      id: f.id,
      question: f.question[locale],
      answer: f.answer[locale],
    })),
    sources: AMHARIC_HUB_SOURCES.map((s) => ({ name: s.name[locale], url: s.url })),
    crosslinks: AMHARIC_HUB_CROSSLINKS.map((c) => ({
      path: c.path,
      label: c.label[locale],
    })),
    copy: {
      summaryHeading: amharicHubCopy("summaryHeading", locale),
      fidelHeading: amharicHubCopy("fidelHeading", locale),
      fidelIntro: amharicHubCopy("fidelIntro", locale),
      fidelHint: amharicHubCopy("fidelHint", locale),
      fidelConsonantLabel: amharicHubCopy("fidelConsonantLabel", locale),
      fidelOrderLabel: amharicHubCopy("fidelOrderLabel", locale),
      fidelRowHeaderLabel: amharicHubCopy("fidelRowHeaderLabel", locale),
      phrasesHeading: amharicHubCopy("phrasesHeading", locale),
      phrasesIntro: amharicHubCopy("phrasesIntro", locale),
      coursesHeading: amharicHubCopy("coursesHeading", locale),
      coursesIntro: amharicHubCopy("coursesIntro", locale),
      audienceLabel: amharicHubCopy("audienceLabel", locale),
      costLabel: amharicHubCopy("costLabel", locale),
      contactLabel: amharicHubCopy("contactLabel", locale),
      visitLabel: amharicHubCopy("visitLabel", locale),
      gapHeading: amharicHubCopy("gapHeading", locale),
      faqHeading: amharicHubCopy("faqHeading", locale),
      sourcesHeading: amharicHubCopy("sourcesHeading", locale),
      relatedHeading: amharicHubCopy("relatedHeading", locale),
      lastReviewedLabel: amharicHubCopy("lastReviewedLabel", locale),
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, subtitle, faq, publicUrl } = data;
  const path = amharicHubPath();

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, path),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: `${publicUrl}/${locale}${path}` },
    {
      "script:ld+json": educationArticleJsonLd(
        { publicUrl, locale },
        {
          path,
          headline: title,
          description: subtitle,
          datePublished: AMHARIC_PUBLISHED_AT,
        },
      ),
    },
    {
      "script:ld+json": faqPageJsonLd(
        { publicUrl, locale },
        path,
        faq.map((f) => ({ question: f.question, answer: f.answer })),
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: t(locale, "education_pillar_title"), path: "/education" },
        { name: title, path },
      ]),
    },
  ];
};

export default function AmharicHub({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    title,
    subtitle,
    summary,
    sections,
    phraseGroups,
    courses,
    supplyGap,
    faq,
    sources,
    crosslinks,
    copy,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${amharicHubPath()}`} />

      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}/education`} className="hover:underline">
            {t(locale, "education_pillar_title")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 px-6 py-8 sm:px-10 sm:py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
          <p className="mt-3 text-xs text-ink-500">
            {copy.lastReviewedLabel}: {formatDate(locale, AMHARIC_PUBLISHED_AT)}
          </p>
        </header>

        {/* Standalone Amharic summary — Ge'ez is LTR inside an RTL page (ADR-008). */}
        <section
          className="mb-10 rounded-2xl border-2 border-earth-300 bg-earth-50 p-5 sm:p-6"
          aria-labelledby="amharic-summary-heading"
        >
          <h2
            id="amharic-summary-heading"
            className="mb-3 font-display text-lg font-semibold text-earth-900"
          >
            {copy.summaryHeading}
          </h2>
          <div dir="ltr" lang="am" className="space-y-3 text-start">
            {summary.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-700">
                {para.trim()}
              </p>
            ))}
          </div>
        </section>

        {/* Prose sections */}
        <div className="mb-10 space-y-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
            >
              <h2
                id={`${section.id}-heading`}
                className="font-display text-xl font-semibold text-earth-900"
              >
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed whitespace-pre-line text-ink-700">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {/* The interactive fidel chart */}
        <FidelGrid
          labels={{
            heading: copy.fidelHeading,
            intro: copy.fidelIntro,
            hint: copy.fidelHint,
            consonantLabel: copy.fidelConsonantLabel,
            orderLabel: copy.fidelOrderLabel,
            rowHeaderLabel: copy.fidelRowHeaderLabel,
          }}
        />

        {/* Family phrases */}
        <section className="mb-10" aria-labelledby="phrases-heading">
          <h2
            id="phrases-heading"
            className="mb-2 font-display text-xl font-semibold text-earth-900"
          >
            {copy.phrasesHeading}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-ink-700">{copy.phrasesIntro}</p>
          <div className="space-y-6">
            {phraseGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-earth-200 bg-card p-5"
              >
                <h3 className="mb-3 font-display text-base font-semibold text-earth-900">
                  {group.heading}
                </h3>
                <ul className="divide-y divide-earth-100">
                  {group.phrases.map((phrase) => (
                    <li
                      key={phrase.id}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <span
                        lang="am"
                        dir="ltr"
                        className="shrink-0 text-start font-display text-xl text-earth-900 sm:w-44"
                      >
                        {phrase.am}
                      </span>
                      <span
                        dir="ltr"
                        className="shrink-0 text-start text-sm text-ink-500 sm:w-44"
                      >
                        {phrase.translit}
                      </span>
                      <span className="min-w-0 text-sm text-ink-700">
                        {phrase.meaning}
                        {phrase.note && (
                          <span className="mt-0.5 block text-xs text-ink-500">
                            {phrase.note}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Verified places to study */}
        <section className="mb-10" aria-labelledby="courses-heading">
          <h2
            id="courses-heading"
            className="mb-2 font-display text-xl font-semibold text-earth-900"
          >
            {copy.coursesHeading}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-ink-700">{copy.coursesIntro}</p>
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course.id}
                className="rounded-2xl border border-earth-200 bg-card p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-earth-900">
                    {course.name}
                  </h3>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-md border border-earth-200 px-3 py-1.5 text-xs font-medium text-earth-700 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {copy.visitLabel} ↗
                  </a>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {course.description}
                </p>
                <dl className="mt-3 space-y-1 text-xs text-ink-600">
                  <div>
                    <dt className="inline font-medium">{copy.audienceLabel}: </dt>
                    <dd className="inline">{course.audience}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium">{copy.costLabel}: </dt>
                    <dd className="inline">{course.cost}</dd>
                  </div>
                  {course.contact && (
                    <div>
                      <dt className="inline font-medium">{copy.contactLabel}: </dt>
                      <dd className="inline" dir="ltr">
                        {course.contact}
                      </dd>
                    </div>
                  )}
                </dl>
              </li>
            ))}
          </ul>

          {/* The gap we did not fill, stated rather than papered over. */}
          <div className="mt-4 rounded-2xl border border-earth-300 bg-earth-50 p-5">
            <h3 className="font-display text-base font-semibold text-earth-900">
              {copy.gapHeading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{supplyGap}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10" aria-labelledby="amharic-faq-heading">
          <h2
            id="amharic-faq-heading"
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
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{item.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Cross-links — the glossary reciprocal */}
        <section className="mb-10 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {copy.relatedHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {crosslinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={`/${locale}${link.path}`}
                  className="text-earth-700 underline hover:text-earth-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Sources */}
        <section
          className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
          aria-labelledby="amharic-sources-heading"
        >
          <h2
            id="amharic-sources-heading"
            className="font-display text-base font-semibold text-earth-900"
          >
            {copy.sourcesHeading}
          </h2>
          <ul className="mt-2 space-y-1">
            {sources.map((source) => (
              <li key={source.url} className="text-sm text-ink-700">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-earth-900"
                >
                  {source.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
