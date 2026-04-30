// Glossary queries (RIN-418 / part of RIN-417 — SEO Wave 1).
//
// Mirrors the Rights Hub query pattern (`rights.server.ts`): a thin layer
// over a static seed today, ready to be flipped to a Drizzle-against-Postgres
// implementation later without touching consumers.

import {
  GLOSSARY,
  type GlossaryCategory,
  type GlossaryEntry,
  getEntryBodyForLocale,
  pickLocale,
} from "../../glossary/glossary";
import type { Locale } from "../../i18n/config";

export interface GlossarySummary {
  slug: string;
  category: GlossaryCategory;
  term: string;
  summary: string;
}

export interface GlossaryDetail extends GlossarySummary {
  body: string;
  relatedRights: string[];
  relatedTerms: string[];
  sources: Array<{ title: string; url: string }>;
}

export function listGlossary(locale: Locale): GlossarySummary[] {
  return GLOSSARY.map((e) => ({
    slug: e.slug,
    category: e.category,
    term: pickLocale(e.term, locale),
    summary: pickLocale(e.summary, locale),
  })).sort((a, b) => a.term.localeCompare(b.term, locale));
}

export function getGlossaryEntry(slug: string, locale: Locale): GlossaryDetail | null {
  const entry: GlossaryEntry | undefined = GLOSSARY.find((e) => e.slug === slug);
  if (!entry) return null;
  return {
    slug: entry.slug,
    category: entry.category,
    term: pickLocale(entry.term, locale),
    summary: pickLocale(entry.summary, locale),
    body: getEntryBodyForLocale(entry, locale),
    relatedRights: entry.relatedRights,
    relatedTerms: entry.relatedTerms,
    sources: entry.sources ?? [],
  };
}

export function allGlossarySlugs(): string[] {
  return GLOSSARY.map((e) => e.slug);
}

// Find related glossary terms — by `relatedTerms` field first (curated),
// falls back to category match if curated set is shorter than `limit`.
export function relatedGlossaryTerms(
  slug: string,
  locale: Locale,
  limit = 3,
): GlossarySummary[] {
  const current = GLOSSARY.find((e) => e.slug === slug);
  if (!current) return [];
  const ids = new Set(current.relatedTerms);
  const curated = GLOSSARY.filter((e) => ids.has(e.slug));
  let pool: GlossaryEntry[] = curated;
  if (pool.length < limit) {
    const sameCategory = GLOSSARY.filter(
      (e) => e.category === current.category && e.slug !== slug && !ids.has(e.slug),
    );
    pool = pool.concat(sameCategory);
  }
  return pool.slice(0, limit).map((e) => ({
    slug: e.slug,
    category: e.category,
    term: pickLocale(e.term, locale),
    summary: pickLocale(e.summary, locale),
  }));
}
