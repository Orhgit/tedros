// Scholarship queries (RIN-504 / Phase 5 Education Hub Wave 1).
// Mirrors the Org + Glossary query patterns: a thin layer over a static
// seed today, ready to be flipped to a Drizzle implementation later.

import {
  SCHOLARSHIPS,
  type ScholarshipEntry,
  type ScholarshipStatus,
  getScholarshipBodyForLocale,
  pickLocale,
} from "../../education/scholarships.server";
import type { ScholarshipLevel } from "../../education/categories";
import type { Locale } from "../../i18n/config";

export interface ScholarshipSummary {
  slug: string;
  level: ScholarshipLevel;
  providerOrgSlug: string;
  name: string;
  shortDescription: string;
  amountMinIls: number;
  amountMaxIls: number;
  amountNote: string;
  deadline: "rolling" | string | null;
  status: ScholarshipStatus;
  lastVerified: string;
  applicationUrl: string;
  communityPriority: boolean;
  tags: string[];
}

export interface ScholarshipDetail extends ScholarshipSummary {
  body: string;
  relatedScholarships: string[];
  relatedRights: string[];
}

export function listScholarships(locale: Locale): ScholarshipSummary[] {
  return SCHOLARSHIPS.map((e) => ({
    slug: e.slug,
    level: e.level,
    providerOrgSlug: e.providerOrgSlug,
    name: pickLocale(e.name, locale),
    shortDescription: pickLocale(e.shortDescription, locale),
    amountMinIls: e.amountMinIls,
    amountMaxIls: e.amountMaxIls,
    amountNote: pickLocale(e.amountNote, locale),
    deadline: e.deadline,
    status: e.status,
    lastVerified: e.lastVerified,
    applicationUrl: e.applicationUrl,
    communityPriority: e.communityPriority,
    tags: e.tags,
  })).sort((a, b) => a.name.localeCompare(b.name, locale));
}

export function getScholarshipBySlug(
  slug: string,
  locale: Locale,
): ScholarshipDetail | null {
  const entry: ScholarshipEntry | undefined = SCHOLARSHIPS.find((e) => e.slug === slug);
  if (!entry) return null;
  return {
    slug: entry.slug,
    level: entry.level,
    providerOrgSlug: entry.providerOrgSlug,
    name: pickLocale(entry.name, locale),
    shortDescription: pickLocale(entry.shortDescription, locale),
    amountMinIls: entry.amountMinIls,
    amountMaxIls: entry.amountMaxIls,
    amountNote: pickLocale(entry.amountNote, locale),
    deadline: entry.deadline,
    status: entry.status,
    lastVerified: entry.lastVerified,
    applicationUrl: entry.applicationUrl,
    communityPriority: entry.communityPriority,
    tags: entry.tags,
    body: getScholarshipBodyForLocale(entry, locale),
    relatedScholarships: entry.relatedScholarships,
    relatedRights: entry.relatedRights,
  };
}

export function allScholarshipSlugs(): string[] {
  return SCHOLARSHIPS.map((e) => e.slug);
}

// Resolve `relatedScholarships` slugs into summaries; falls back to same-level
// scholarships if curated set is shorter than `limit`.
export function relatedScholarships(
  slug: string,
  locale: Locale,
  limit = 3,
): ScholarshipSummary[] {
  const current = SCHOLARSHIPS.find((e) => e.slug === slug);
  if (!current) return [];
  const ids = new Set(current.relatedScholarships);
  const curated = SCHOLARSHIPS.filter((e) => ids.has(e.slug));
  let pool: ScholarshipEntry[] = curated;
  if (pool.length < limit) {
    const sameLevel = SCHOLARSHIPS.filter(
      (e) => e.level === current.level && e.slug !== slug && !ids.has(e.slug),
    );
    pool = pool.concat(sameLevel);
  }
  return pool.slice(0, limit).map((e) => ({
    slug: e.slug,
    level: e.level,
    providerOrgSlug: e.providerOrgSlug,
    name: pickLocale(e.name, locale),
    shortDescription: pickLocale(e.shortDescription, locale),
    amountMinIls: e.amountMinIls,
    amountMaxIls: e.amountMaxIls,
    amountNote: pickLocale(e.amountNote, locale),
    deadline: e.deadline,
    status: e.status,
    lastVerified: e.lastVerified,
    applicationUrl: e.applicationUrl,
    communityPriority: e.communityPriority,
    tags: e.tags,
  }));
}
