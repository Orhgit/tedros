// Shared presentational shell for the Soldiers & Families guide pages
// (TED-142): /family/soldiers/detention and /family/soldiers/lone-soldier.
//
// Bundle discipline (TED-153 convention): this component holds NO content
// strings at all — every label, heading and paragraph arrives as a prop from
// the route loader, which reads them from `~/lib/family/soldiers.server`.
// Two routes share one chunk, so the JSX cost is paid once rather than twice.

import { Link } from "react-router";

import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import type { Locale } from "~/lib/i18n/config";

export interface GuideResource {
  name: string;
  phone?: string;
  url?: string;
  description: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideRelatedLink {
  to: string;
  label: string;
}

export interface SoldiersGuideProps {
  locale: Locale;
  /** Path used to mark the active nav item, e.g. `/he/family`. */
  navPath: string;
  heroImage: string;

  title: string;
  subtitle: string;
  /** Markdown-lite body: `\n\n`-separated paragraphs, `**bold lead**`, `> note`. */
  body: string;

  breadcrumb: {
    homeLabel: string;
    homeTo: string;
    parentLabel: string;
    parentTo: string;
  };

  glanceTitle: string;
  glanceItems: readonly string[];

  amSummaryTitle: string;
  amSummary: readonly string[];

  bodyHeading: string;
  faqHeading: string;
  faqs: GuideFaq[];
  resourcesHeading: string;
  resources: GuideResource[];
  relatedHeading: string;
  related: GuideRelatedLink[];

  lastReviewedLabel: string;
  backLabel: string;
  backTo: string;

  /** Optional cross-promo strip (e.g. to the ת"ש wizard). */
  promo?: { lead: string; cta: string; to: string };
}

/** Renders the markdown-lite body used by the family/voice content modules. */
function BodyParagraph({ text }: { text: string }) {
  const trimmed = text.trim();

  if (trimmed.startsWith("> ")) {
    return (
      <p className="border-s-4 border-earth-300 ps-3 text-xs leading-relaxed text-ink-500">
        {trimmed.replace(/^>\s*/, "").replace(/\*\*/g, "")}
      </p>
    );
  }

  const boldMatch = trimmed.match(/^\*\*(.+?)\*\*(.*)$/s);
  if (boldMatch) {
    return (
      <p className="text-sm leading-relaxed text-ink-700">
        <strong className="font-semibold text-earth-900">{boldMatch[1]}</strong>
        {boldMatch[2]}
      </p>
    );
  }

  return <p className="text-sm leading-relaxed text-ink-700">{trimmed}</p>;
}

export function SoldiersGuide({
  locale,
  navPath,
  heroImage,
  title,
  subtitle,
  body,
  breadcrumb,
  glanceTitle,
  glanceItems,
  amSummaryTitle,
  amSummary,
  bodyHeading,
  faqHeading,
  faqs,
  resourcesHeading,
  resources,
  relatedHeading,
  related,
  lastReviewedLabel,
  backLabel,
  backTo,
  promo,
}: SoldiersGuideProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={navPath} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={breadcrumb.homeTo} className="hover:underline">
            {breadcrumb.homeLabel}
          </Link>
          {" / "}
          <Link to={breadcrumb.parentTo} className="hover:underline">
            {breadcrumb.parentLabel}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src={heroImage}
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
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* At a glance */}
        <section
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5"
          aria-labelledby="soldiers-glance-heading"
        >
          <h2
            id="soldiers-glance-heading"
            className="mb-3 font-display text-base font-semibold text-amber-900"
          >
            {glanceTitle}
          </h2>
          <ul className="space-y-1.5 text-sm text-amber-900">
            {glanceItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span aria-hidden className="mt-0.5 font-bold text-amber-700">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Full Amharic summary for parents — rendered in EVERY locale (TED-142) */}
        <section
          className="mb-8 rounded-xl border border-earth-300 bg-earth-50 p-5"
          aria-labelledby="soldiers-am-summary-heading"
          lang="am"
          dir="ltr"
        >
          <h2
            id="soldiers-am-summary-heading"
            className="mb-3 font-display text-base font-semibold text-earth-900"
          >
            {amSummaryTitle}
          </h2>
          <ul className="space-y-1.5 text-sm text-earth-900">
            {amSummary.map((line, i) => (
              <li key={i} className="flex items-start gap-2">
                <span aria-hidden className="mt-0.5 font-bold text-earth-700">
                  •
                </span>
                {line}
              </li>
            ))}
          </ul>
        </section>

        {promo && (
          <aside className="mb-8 rounded-xl border border-accent-green/30 bg-accent-green/5 p-5">
            <p className="text-sm font-semibold text-earth-900">
              {promo.lead}
              <Link
                to={promo.to}
                className="underline underline-offset-2 hover:text-earth-700"
              >
                {promo.cta}
              </Link>
            </p>
          </aside>
        )}

        <article className="mb-10 rounded-2xl border border-earth-200 bg-card p-6 sm:p-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-earth-900">
            {bodyHeading}
          </h2>
          <div className="space-y-4">
            {body.split("\n\n").map((para, idx) => (
              <BodyParagraph key={idx} text={para} />
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-500">{lastReviewedLabel}</p>
        </article>

        <section className="mb-10" aria-labelledby="soldiers-faq-heading">
          <h2
            id="soldiers-faq-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {faqHeading}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-earth-200 bg-card p-5"
              >
                <summary className="cursor-pointer list-none font-display text-base font-semibold text-earth-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10" aria-labelledby="soldiers-resources-heading">
          <h2
            id="soldiers-resources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {resourcesHeading}
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
                      href={`tel:${resource.phone.replace(/[-\s]/g, "")}`}
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

        <section className="mb-10" aria-labelledby="soldiers-related-heading">
          <h2
            id="soldiers-related-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {relatedHeading}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block h-full rounded-xl border border-earth-200 bg-card p-4 text-sm font-medium text-earth-900 transition hover:border-earth-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-earth-200 pt-6">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {backLabel}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
