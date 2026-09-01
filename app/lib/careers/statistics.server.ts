// Careers Hub statistics seed (RIN-475 — Wave 5 / RIN-469).
//
// 8 employment-related statistics about the Ethiopian-Israeli community.
// All figures sourced from public datasets (CBS Annual Statistical
// Abstract, ENP impact reports, State Comptroller civil-service reports).
// Update cadence: yearly when CBS publishes the next abstract.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. The page lives at
// `/$lang/careers/statistics` and emits a `Dataset` JSON-LD block so it
// is eligible for Google Dataset Search.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export interface StatEntry {
  id: string;
  /** Section heading. */
  heading: Translatable;
  /** The headline figure as a localized string ("12.4%", "₪10,800"). */
  figure: Translatable;
  /** Short context — explains what the figure measures. */
  context: Translatable;
  /** Plain-text source citation (publisher, year). */
  source: { name: string; url: string };
  /** Year the figure was published — used in JSON-LD `datePublished`. */
  publishedYear: number;
}

export const CAREERS_STATISTICS: StatEntry[] = [
  // TED-157: all eight entries removed. Every one cited a homepage, a
  // site-search URL, or a report that could not be located, and the page
  // emits `Dataset` JSON-LD — so the site was asking Google to index
  // statistics with no traceable source. Two were also inverted: the
  // "62% employment vs 78%" framing has the participation gap backwards
  // (Knesset MMM 10.8.2025 puts Ethiopian-Israelis at 3.4% of Jewish
  // salaried posts against 2.8% of the population — the real gap is in
  // wages, not participation), and the "1.7% of civil-service posts"
  // figure is the population share, not representation.
  //
  // Rebuild only from the Knesset MMM PDFs and the CBS abstract, one
  // entry at a time, each citing the document it came from.
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function statBody(entry: StatEntry, locale: Locale): string {
  return entry.context[locale] ?? entry.context[DEFAULT_LOCALE] ?? entry.context.he;
}

export function statHeading(entry: StatEntry, locale: Locale): string {
  return entry.heading[locale] ?? entry.heading[DEFAULT_LOCALE] ?? entry.heading.he;
}

export function statFigure(entry: StatEntry, locale: Locale): string {
  return entry.figure[locale] ?? entry.figure[DEFAULT_LOCALE] ?? entry.figure.he;
}
