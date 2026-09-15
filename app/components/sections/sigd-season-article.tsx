// Shared layout for the three Sigd season pages (TED-169):
// /heritage/sigd/events-2026, /heritage/sigd/schools, /heritage/sigd/guests.
//
// Bundle note (TED-153 convention, same as `guide-page.tsx`): this component
// carries *no* copy. Every string — headings included — arrives from the route
// loader, which reads it from `lib/heritage/sigd.server.ts`. Three routes
// render one component, so the client pays for this markup once.

import { Link } from "react-router";

export interface SigdSeasonLink {
  /** Locale-relative internal path, e.g. "/heritage/sigd/schools". */
  path: string;
  label: string;
  description: string;
}

export interface SigdSeasonEventRow {
  id: string;
  name: string;
  organizer: string;
  location: string;
  date: string;
  startTime?: string;
  sourceUrl: string;
  sourceLabel: string;
  verifiedOn: string;
  notes?: string;
}

export interface SigdSeasonArticleProps {
  locale: string;
  homeLabel: string;
  sectionLabel: string;
  sectionPath: string;
  title: string;
  description: string;
  /** "The holiday falls on" label + the formatted date. */
  dateLabel: string;
  dateValue: string;
  hebrewDate: string;
  /** Rendered markdown body. */
  html: string;
  /**
   * Verified events. When empty the route passes `emptyHeading`/`emptyBody`
   * and the table is replaced by an honest notice — see ADR-021.
   */
  events?: SigdSeasonEventRow[];
  eventsHeading?: string;
  emptyHeading?: string;
  emptyBody?: string;
  sourceLabel?: string;
  verifiedLabel?: string;
  relatedHeading: string;
  related: SigdSeasonLink[];
  backLabel: string;
  backPath: string;
}

export function SigdSeasonArticle({
  locale,
  homeLabel,
  sectionLabel,
  sectionPath,
  title,
  description,
  dateLabel,
  dateValue,
  hebrewDate,
  html,
  events,
  eventsHeading,
  emptyHeading,
  emptyBody,
  sourceLabel,
  verifiedLabel,
  relatedHeading,
  related,
  backLabel,
  backPath,
}: SigdSeasonArticleProps) {
  return (
    <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
        <Link to={`/${locale}`} className="hover:underline">
          {homeLabel}
        </Link>
        {" / "}
        <Link to={`/${locale}${sectionPath}`} className="hover:underline">
          {sectionLabel}
        </Link>
        {" / "}
        <span aria-current="page">{title}</span>
      </nav>

      <header className="mb-8 rounded-2xl border border-accent-sigd/30 bg-accent-sigd/5 p-6 sm:p-10">
        <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-700">{description}</p>
        <p className="mt-4 text-sm font-medium text-earth-800">
          {dateLabel}: {dateValue}{" "}
          <span className="font-normal text-earth-700">({hebrewDate})</span>
        </p>
      </header>

      {eventsHeading && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold text-earth-900">
            {eventsHeading}
          </h2>
          {events && events.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="rounded-lg border border-earth-200 bg-card p-4 text-sm"
                >
                  <p className="font-medium text-earth-900">{e.name}</p>
                  <p className="mt-1 text-ink-700">
                    {e.organizer} · {e.location}
                  </p>
                  <p className="mt-1 text-ink-700">
                    {e.date}
                    {e.startTime ? ` · ${e.startTime}` : ""}
                  </p>
                  {e.notes && <p className="mt-1 text-ink-600">{e.notes}</p>}
                  <p className="mt-2 text-xs text-earth-700">
                    {sourceLabel}:{" "}
                    <a
                      href={e.sourceUrl}
                      className="underline"
                      rel="nofollow noreferrer"
                      target="_blank"
                    >
                      {e.sourceLabel}
                    </a>{" "}
                    · {verifiedLabel}: {e.verifiedOn}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl border border-earth-200 bg-earth-50 p-5">
              <p className="font-medium text-earth-900">{emptyHeading}</p>
              <p className="mt-2 text-base leading-relaxed text-ink-700">{emptyBody}</p>
            </div>
          )}
        </section>
      )}

      <section
        className="prose prose-ink max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-earth-900">
            {relatedHeading}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.path}>
                <Link
                  to={`/${locale}${r.path}`}
                  className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                >
                  <span className="block font-medium text-earth-900">{r.label}</span>
                  <span className="mt-1 block text-ink-600">{r.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12 border-t border-earth-200 pt-6">
        <Link
          to={`/${locale}${backPath}`}
          className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
        >
          <span aria-hidden="true" className="icon-flip inline-block">
            ←
          </span>
          {backLabel}
        </Link>
      </div>
    </article>
  );
}
