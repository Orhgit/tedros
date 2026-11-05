// A verified, dated event surfaced on the homepage while it is imminent
// (TED-185).
//
// Why this exists, stated plainly: four days before Sigd 5787, the homepage
// did not mention the holiday once, and carried no link to any of the eleven
// Sigd pages. Two things follow from that. A reader who lands on the
// homepage looking for the ceremony is handed nothing. And Googlebot, which
// crawls the homepage far more often than anything else here, has no reason
// to re-fetch the pages that just changed — the events page had last been
// crawled twenty days earlier, the article forty-four.
//
// Bundle note (TED-153 convention): this component carries no copy. Every
// string arrives from the route loader, which reads it from the message
// catalogue and from `lib/heritage/sigd.server.ts`.
//
// The strip is rendered only when the loader supplies an event, and the
// loader only supplies one inside a date window. Nobody has to remember to
// put it up, and — the part that actually matters — nobody has to remember
// to take it down.

import { Link } from "react-router";

export interface SeasonalEventStripProps {
  locale: string;
  /** Short label above the name, e.g. "Coming up". */
  eyebrow: string;
  /** The event name, as the organiser calls it. */
  name: string;
  /** Formatted date, already localised. */
  date: string;
  /** Venue, as the organiser states it. */
  location: string;
  /** Start time, only when the organiser published one. */
  startTime?: string;
  /** "In N days" / "Today", resolved by the loader. */
  countdown: string;
  /** Locale-relative path to the page with the full details. */
  href: string;
  ctaLabel: string;
}

export function SeasonalEventStrip({
  locale,
  eyebrow,
  name,
  date,
  location,
  startTime,
  countdown,
  href,
  ctaLabel,
}: SeasonalEventStripProps) {
  return (
    <aside
      aria-label={eyebrow}
      className="border-b border-accent-sigd/30 bg-accent-sigd/10"
    >
      <div className="container-default flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-earth-700 uppercase">
            {eyebrow} · {countdown}
          </p>
          <p className="mt-0.5 font-medium text-earth-900">
            <Link to={`/${locale}${href}`} className="hover:underline">
              {name}
            </Link>
          </p>
          <p className="mt-0.5 text-sm text-ink-700">
            {date}
            {startTime ? ` · ${startTime}` : ""} · {location}
          </p>
        </div>
        <Link
          to={`/${locale}${href}`}
          className="shrink-0 self-start rounded-lg bg-accent-green px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 sm:self-auto"
        >
          {ctaLabel}
        </Link>
      </div>
    </aside>
  );
}
