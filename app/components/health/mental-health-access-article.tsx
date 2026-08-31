// Shared article layout for the TED-144 mental-health access guides
// (/health/mental-health/{interpreter,hospitalization-rights,culturally-competent-care}).
//
// Renders: breadcrumb, header, ERAN crisis banner (HealthDisclaimer
// variant="mental-health"), optional "not legal advice" banner, the full
// standalone Amharic summary card (lang="am", always LTR), numbered sections,
// FAQ, official sources, related guides, and back links.

import { Link } from "react-router";

import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { healthPath, mentalHealthPath } from "~/lib/health/links";
import { formatDate } from "~/lib/i18n/format";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export interface AccessArticleSection {
  id: string;
  heading: string;
  body: string;
}

export interface AccessArticleFaq {
  id: string;
  question: string;
  answer: string;
}

export interface AccessArticleSource {
  name: string;
  url: string;
}

export interface AccessArticleRelatedLink {
  /** Path relative to the locale, e.g. `/health/mental-health/interpreter`. */
  path: string;
  label: string;
}

interface MentalHealthAccessArticleProps {
  locale: Locale;
  title: string;
  subtitle: string;
  sections: AccessArticleSection[];
  faqs: AccessArticleFaq[];
  sources: AccessArticleSource[];
  amharicSummary: string;
  legalDisclaimer: boolean;
  lastReviewed: string;
  related: AccessArticleRelatedLink[];
}

export function MentalHealthAccessArticle({
  locale,
  title,
  subtitle,
  sections,
  faqs,
  sources,
  amharicSummary,
  legalDisclaimer,
  lastReviewed,
  related,
}: MentalHealthAccessArticleProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "health_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${healthPath()}`} className="hover:underline">
            {t(locale, "health_breadcrumb_health")}
          </Link>
          {" / "}
          <Link to={`/${locale}${mentalHealthPath()}`} className="hover:underline">
            {t(locale, "health_mental_health_title")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        {/* ERAN crisis line above the fold — every mental-health page */}
        <HealthDisclaimer locale={locale} variant="mental-health" />

        {/* Not-legal-advice banner (hospitalization rights) */}
        {legalDisclaimer && (
          <div className="mb-6 rounded-lg border border-earth-300 bg-earth-50 px-4 py-3 text-sm text-ink-700">
            <p>
              <span className="font-semibold">
                {t(locale, "health_disclaimer_label")}:{" "}
              </span>
              {t(locale, "health_mh_legal_disclaimer")}
            </p>
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
          <p className="mt-2 text-xs text-ink-500">
            {t(locale, "health_rights_last_reviewed_label")}:{" "}
            {formatDate(locale, lastReviewed)}
          </p>
        </header>

        {/* Full Amharic summary — the access-critical block. Amharic is an
            LTR script; force direction regardless of page locale. */}
        <section
          className="mb-10 rounded-2xl border-2 border-earth-300 bg-earth-50 p-5 sm:p-6"
          aria-labelledby="mh-access-am-summary-heading"
        >
          <h2
            id="mh-access-am-summary-heading"
            className="mb-3 font-display text-lg font-semibold text-earth-900"
          >
            {t(locale, "health_mh_am_summary_label")}
          </h2>
          <div dir="ltr" lang="am" className="space-y-3 text-start">
            {amharicSummary.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-700">
                {para.trim()}
              </p>
            ))}
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth-100 font-display text-sm font-bold text-earth-800"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2
                    id={`${section.id}-heading`}
                    className="font-display text-lg font-semibold text-earth-900"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-ink-700">
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-10" aria-labelledby="mh-access-faq-heading">
          <h2
            id="mh-access-faq-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "שאלות נפוצות"
              : locale === "am"
                ? "ተደጋጋሚ ጥያቄዎች"
                : "Frequently asked questions"}
          </h2>
          <ul className="space-y-4">
            {faqs.map((faq) => (
              <li key={faq.id} className="rounded-xl border border-earth-200 bg-card p-5">
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Official sources — every factual claim links back to one of these */}
        <section className="mt-10" aria-labelledby="mh-access-sources-heading">
          <h2
            id="mh-access-sources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "health_mh_sources_label")}
          </h2>
          <ul className="space-y-2">
            {sources.map((source) => (
              <li key={source.url} className="text-sm">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-earth-700 underline decoration-earth-300 underline-offset-2 hover:decoration-earth-600"
                >
                  {source.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Related guides */}
        {related.length > 0 && (
          <section className="mt-10" aria-labelledby="mh-access-related-heading">
            <h2
              id="mh-access-related-heading"
              className="mb-4 font-display text-xl font-semibold text-earth-900"
            >
              {t(locale, "health_mh_guides_label")}
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map((link) => (
                <li key={link.path}>
                  <Link
                    to={`/${locale}${link.path}`}
                    className="block rounded-xl border border-earth-200 bg-card p-4 text-sm font-medium text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back navigation */}
        <div className="mt-10 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${mentalHealthPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "health_mh_back_to_mental_health")}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
