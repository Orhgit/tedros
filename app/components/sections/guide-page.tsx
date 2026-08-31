// Long-form guide layout shared by the TED-145 parents-vs-school pages.
//
// Bundle note (TED-153 convention): this component carries *no* copy. Every
// string — headings included — arrives from the route loader, which reads it
// from a `.server` content module. Two routes render one component, so the
// client bundle pays for the markup once instead of twice.

import { Link } from "react-router";

export interface GuideStep {
  id: string;
  title: string;
  detail: string;
  officialUrl?: string;
  officialLabel?: string;
  /** Locale-relative internal path, e.g. "/voice". */
  internalPath?: string;
  internalLabel?: string;
}

export interface GuideFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface GuideResource {
  name: string;
  phone?: string;
  url: string;
  description: string;
}

export interface GuideSource {
  name: string;
  url: string;
}

export interface GuideCrosslink {
  /** Locale-relative internal path. */
  path: string;
  label: string;
}

export interface GuidePageProps {
  locale: string;
  homeLabel: string;
  title: string;
  subtitle: string;
  /** Amharic (or locale) summary rendered up top, before the steps. */
  summaryHeading: string;
  summary: string;
  stepsHeading: string;
  steps: GuideStep[];
  bodyHeading: string;
  body: string;
  faqHeading: string;
  faq: GuideFaqItem[];
  crosslinkHeading: string;
  crosslinkBody: string;
  crosslinks: GuideCrosslink[];
  resourcesHeading: string;
  resources: GuideResource[];
  sourcesHeading: string;
  sources: GuideSource[];
  websiteLabel: string;
  disclaimer: string;
}

export function GuidePage({
  locale,
  homeLabel,
  title,
  subtitle,
  summaryHeading,
  summary,
  stepsHeading,
  steps,
  bodyHeading,
  body,
  faqHeading,
  faq,
  crosslinkHeading,
  crosslinkBody,
  crosslinks,
  resourcesHeading,
  resources,
  sourcesHeading,
  sources,
  websiteLabel,
  disclaimer,
}: GuidePageProps) {
  return (
    <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
      <header className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 px-6 py-8 sm:px-10 sm:py-12">
        <p className="text-sm font-medium text-earth-700">
          <Link to={`/${locale}`} className="hover:underline">
            {homeLabel}
          </Link>
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
      </header>

      {/* Plain-language summary — the whole guide in one paragraph. */}
      <section
        className="mb-10 rounded-2xl border border-earth-300 bg-card p-6"
        aria-labelledby="guide-summary-heading"
      >
        <h2
          id="guide-summary-heading"
          className="mb-2 font-display text-lg font-semibold text-earth-900"
        >
          {summaryHeading}
        </h2>
        <p
          className="text-sm leading-relaxed whitespace-pre-line text-ink-700"
          lang="am"
          dir="ltr"
        >
          {summary}
        </p>
      </section>

      {/* Steps — the "what do I actually do" answer. */}
      <section className="mb-10" aria-labelledby="guide-steps-heading">
        <h2
          id="guide-steps-heading"
          className="mb-4 font-display text-xl font-semibold text-earth-900"
        >
          {stepsHeading}
        </h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step.id} className="rounded-xl border border-earth-200 bg-card p-5">
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
        aria-labelledby="guide-body-heading"
      >
        <h2
          id="guide-body-heading"
          className="mb-4 font-display text-xl font-semibold text-earth-900"
        >
          {bodyHeading}
        </h2>
        <div className="space-y-3 text-sm leading-relaxed whitespace-pre-line text-ink-700">
          {body}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10" aria-labelledby="guide-faq-heading">
        <h2
          id="guide-faq-heading"
          className="mb-4 font-display text-xl font-semibold text-earth-900"
        >
          {faqHeading}
        </h2>
        <ul className="space-y-4">
          {faq.map((item) => (
            <li key={item.id} className="rounded-xl border border-earth-200 bg-card p-5">
              <h3 className="font-display text-base font-semibold text-earth-900">
                {item.question}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Cross-links to the neighbouring pillars */}
      <section className="mb-10 rounded-2xl border border-earth-200 bg-earth-50 p-5">
        <h2 className="font-display text-base font-semibold text-earth-900">
          {crosslinkHeading}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-700">{crosslinkBody}</p>
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

      {/* Resources */}
      <section className="mb-10" aria-labelledby="guide-resources-heading">
        <h2
          id="guide-resources-heading"
          className="mb-4 font-display text-xl font-semibold text-earth-900"
        >
          {resourcesHeading}
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
                  {websiteLabel} ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Sources */}
      <section
        className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
        aria-labelledby="guide-sources-heading"
      >
        <h2
          id="guide-sources-heading"
          className="font-display text-base font-semibold text-earth-900"
        >
          {sourcesHeading}
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
  );
}
