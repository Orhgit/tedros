// Comparison-pages queries (RIN-421 / SEO Wave 3a).
// Same thin-layer-over-static-seed pattern as glossary/orgs/professionals.

import {
  COMPARISONS,
  type ComparisonEntry,
  getComparisonBodyForLocale,
  pickLocale,
} from "../../comparisons/comparisons.server";
import type { ComparisonCategory } from "../../comparisons/categories";
import type { Locale } from "../../i18n/config";

export interface ComparisonSummary {
  slug: string;
  category: ComparisonCategory;
  title: string;
  shortDescription: string;
}

export interface ResolvedSide {
  name: string;
  tagline: string;
  link?: { type: "right" | "org" | "glossary"; slug: string };
}

export interface ResolvedCriterion {
  label: string;
  a: string;
  b: string;
  winner?: "a" | "b" | "both" | "neither";
}

export interface ComparisonDetail extends ComparisonSummary {
  body: string;
  sideA: ResolvedSide;
  sideB: ResolvedSide;
  criteria: ResolvedCriterion[];
  relatedRights: string[];
  relatedTerms: string[];
  relatedOrgs: string[];
}

function summarize(entry: ComparisonEntry, locale: Locale): ComparisonSummary {
  return {
    slug: entry.slug,
    category: entry.category,
    title: pickLocale(entry.title, locale),
    shortDescription: pickLocale(entry.shortDescription, locale),
  };
}

export function listComparisons(locale: Locale): ComparisonSummary[] {
  return COMPARISONS.map((e) => summarize(e, locale)).sort((a, b) =>
    a.title.localeCompare(b.title, locale),
  );
}

export function getComparisonEntry(
  slug: string,
  locale: Locale,
): ComparisonDetail | null {
  const entry = COMPARISONS.find((e) => e.slug === slug);
  if (!entry) return null;
  return {
    ...summarize(entry, locale),
    body: getComparisonBodyForLocale(entry, locale),
    sideA: {
      name: pickLocale(entry.sideA.name, locale),
      tagline: pickLocale(entry.sideA.tagline, locale),
      link: entry.sideA.link,
    },
    sideB: {
      name: pickLocale(entry.sideB.name, locale),
      tagline: pickLocale(entry.sideB.tagline, locale),
      link: entry.sideB.link,
    },
    criteria: entry.criteria.map((c) => ({
      label: pickLocale(c.label, locale),
      a: pickLocale(c.a, locale),
      b: pickLocale(c.b, locale),
      winner: c.winner,
    })),
    relatedRights: entry.relatedRights,
    relatedTerms: entry.relatedTerms,
    relatedOrgs: entry.relatedOrgs,
  };
}

export function allComparisonSlugs(): string[] {
  return COMPARISONS.map((e) => e.slug);
}
