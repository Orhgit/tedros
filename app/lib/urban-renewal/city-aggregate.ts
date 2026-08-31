// City-level urban-renewal aggregate view — T5 slice (TED-94).
//
// `/cities/:slug/urban-renewal` renders every T3 neighborhood registered
// for that city (see `~/lib/urban-renewal/registry.ts`) plus real,
// citywide aggregation: a summed unit count (only over neighborhoods that
// publish a numeric `before`/`after` figure — never estimated), and the
// city's existing sourced `overview`/community-stat content from
// `~/lib/cities/registry.ts`. No new facts are invented here; this module
// only aggregates what TED-93's registry already carries.
//
// Per docs/seo/programmatic-templates.md "T5 — City × topic landing
// pages", `/cities/:slug/urban-renewal` is the "filtered T3 view scoped
// to one city" variant — reusing the existing `/cities` route tree per
// ADR-017 §D1 (no parallel URL namespace for this domain).
//
// EN/AM keyword phrases below are machine-draft translations pending
// native review (repo convention — see CLAUDE.md "Languages" and
// `~/lib/urban-renewal/registry.ts`'s header comment).

import type { Locale } from "~/lib/i18n/config";
// The three aggregation helpers below read `units.note` and `sources`, which
// live in ./content.server.ts — callers must pass HYDRATED neighborhoods
// (`hydrateNeighborhoods`), which in practice means calling them in a loader.
import type { LocalizedText, UrbanRenewalNeighborhood } from "./registry";
import { URBAN_RENEWAL_NEIGHBORHOODS } from "./registry";

/**
 * The literal Tier-1 keyword phrase for each city's aggregate page (see
 * TED-94 spec table) — some cities use "התחדשות עירונית" (urban renewal),
 * others use the more specific "פינוי בינוי" (pinui-binui/demolish-rebuild)
 * term that matches their actual search demand. Do not normalize these to
 * one term; the phrase is the whole point of the page's <h1>/meta.
 */
export const CITY_URBAN_RENEWAL_KEYWORDS: Record<string, LocalizedText> = {
  netanya: {
    he: "התחדשות עירונית נתניה",
    en: "Urban renewal in Netanya",
    am: "የከተማ ዕድሳት በነታንያ",
  },
  "rishon-lezion": {
    he: "התחדשות עירונית ראשון לציון",
    en: "Urban renewal in Rishon LeZion",
    am: "የከተማ ዕድሳት በሪሾን ለጽዮን",
  },
  rehovot: {
    he: "התחדשות עירונית רחובות",
    en: "Urban renewal in Rehovot",
    am: "የከተማ ዕድሳት በረሆቮት",
  },
  "kiryat-gat": {
    he: "התחדשות עירונית קריית גת",
    en: "Urban renewal in Kiryat Gat",
    am: "የከተማ ዕድሳት በቂርያት ጋት",
  },
  "kiryat-malakhi": {
    he: "פינוי בינוי קריית מלאכי",
    en: "Pinui-binui in Kiryat Malakhi",
    am: "ፒኑይ-ቢኑይ በቂርያት ማላኪ",
  },
  lod: {
    he: "פינוי בינוי לוד",
    en: "Pinui-binui in Lod",
    am: "ፒኑይ-ቢኑይ በሎድ",
  },
  "beer-sheva": {
    he: "התחדשות עירונית באר שבע",
    en: "Urban renewal in Be'er Sheva",
    am: "የከተማ ዕድሳት በቤር ሼቫ",
  },
};

/** Cities that have at least one T3 neighborhood registered — the only
 * cities `/cities/:slug/urban-renewal` resolves for. */
export const CITY_URBAN_RENEWAL_SLUGS: string[] = Array.from(
  new Set(URBAN_RENEWAL_NEIGHBORHOODS.map((n) => n.citySlug)),
);

export function cityUrbanRenewalKeyword(citySlug: string, locale: Locale): string {
  const entry = CITY_URBAN_RENEWAL_KEYWORDS[citySlug];
  if (!entry) return "";
  return entry[locale] ?? entry.he;
}

export type UnitsAggregate = {
  /** Sum of `after` (falling back to `before`) across neighborhoods that
   * publish a numeric figure. 0 when none do. */
  total: number;
  /** Slugs of neighborhoods counted in `total`. */
  countedSlugs: string[];
  /** Neighborhoods with only a qualitative note (no numeric figure) — never
   * summed, only listed for transparency. */
  noteOnlySlugs: string[];
};

/** Sum published unit figures across a city's neighborhoods. Only counts
 * neighborhoods with an explicit numeric `after` or `before` value — never
 * estimates or backfills a number for a neighborhood that only has a
 * descriptive `note` (e.g. a citywide/shared-cluster figure already quoted
 * verbatim elsewhere), to avoid double-counting shared totals. */
export function aggregateUnits(
  neighborhoods: UrbanRenewalNeighborhood[],
): UnitsAggregate {
  let total = 0;
  const countedSlugs: string[] = [];
  const noteOnlySlugs: string[] = [];
  for (const n of neighborhoods) {
    const value = n.units.after ?? n.units.before;
    if (typeof value === "number") {
      total += value;
      countedSlugs.push(n.slug);
    } else if (n.units.note) {
      noteOnlySlugs.push(n.slug);
    }
  }
  return { total, countedSlugs, noteOnlySlugs };
}

/** Distinct qualitative unit notes across a city's neighborhoods, deduped by
 * Hebrew text — several neighborhoods in the same city share one citywide
 * figure (e.g. Kiryat Malakhi's ~4,000-unit total across its 4 compounds,
 * or Netanya's ~464-family Dora+Neot Shaked cluster) and would otherwise be
 * repeated once per neighborhood that cites them. */
export function distinctUnitNotes(
  neighborhoods: UrbanRenewalNeighborhood[],
): LocalizedText[] {
  const seen = new Set<string>();
  const notes: LocalizedText[] = [];
  for (const n of neighborhoods) {
    const note = n.units.note;
    if (!note) continue;
    if (seen.has(note.he)) continue;
    seen.add(note.he);
    notes.push(note);
  }
  return notes;
}

/** Union of every source URL cited across a city's neighborhoods, in
 * first-seen order, deduped. */
export function citySources(neighborhoods: UrbanRenewalNeighborhood[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of neighborhoods) {
    for (const src of n.sources) {
      if (seen.has(src)) continue;
      seen.add(src);
      out.push(src);
    }
  }
  return out;
}
