// Org profile queries (RIN-419 / part of RIN-417 — SEO Wave 1b).
// Mirrors the Glossary + Rights query patterns: a thin layer over a static
// seed today, ready to be flipped to a Drizzle implementation later.

import {
  ORGS,
  type OrgEntry,
  getOrgBodyForLocale,
  pickLocale,
} from "../../orgs/orgs.server";
import type { OrgCategory } from "../../orgs/categories";
import type { Locale } from "../../i18n/config";

export interface OrgSummary {
  slug: string;
  category: OrgCategory;
  name: string;
  shortDescription: string;
  foundedYear: number;
  headquartersCity: string;
}

export interface OrgDetail extends OrgSummary {
  body: string;
  websiteUrl: string;
  contactEmail: string | null;
  relatedRights: string[];
  relatedTerms: string[];
  relatedOrgs: string[];
}

export function listOrgs(locale: Locale): OrgSummary[] {
  return ORGS.map((e) => ({
    slug: e.slug,
    category: e.category,
    name: pickLocale(e.name, locale),
    shortDescription: pickLocale(e.shortDescription, locale),
    foundedYear: e.foundedYear,
    headquartersCity: pickLocale(e.headquartersCity, locale),
  })).sort((a, b) => a.name.localeCompare(b.name, locale));
}

export function getOrgEntry(slug: string, locale: Locale): OrgDetail | null {
  const entry: OrgEntry | undefined = ORGS.find((e) => e.slug === slug);
  if (!entry) return null;
  return {
    slug: entry.slug,
    category: entry.category,
    name: pickLocale(entry.name, locale),
    shortDescription: pickLocale(entry.shortDescription, locale),
    foundedYear: entry.foundedYear,
    headquartersCity: pickLocale(entry.headquartersCity, locale),
    body: getOrgBodyForLocale(entry, locale),
    websiteUrl: entry.websiteUrl,
    contactEmail: entry.contactEmail ?? null,
    relatedRights: entry.relatedRights,
    relatedTerms: entry.relatedTerms,
    relatedOrgs: entry.relatedOrgs,
  };
}

export function allOrgSlugs(): string[] {
  return ORGS.map((e) => e.slug);
}

// Resolve the curated `relatedOrgs` slugs into summaries; falls back to
// same-category if the curated set is shorter than `limit`.
export function relatedOrgs(slug: string, locale: Locale, limit = 3): OrgSummary[] {
  const current = ORGS.find((e) => e.slug === slug);
  if (!current) return [];
  const ids = new Set(current.relatedOrgs);
  const curated = ORGS.filter((e) => ids.has(e.slug));
  let pool: OrgEntry[] = curated;
  if (pool.length < limit) {
    const sameCategory = ORGS.filter(
      (e) => e.category === current.category && e.slug !== slug && !ids.has(e.slug),
    );
    pool = pool.concat(sameCategory);
  }
  return pool.slice(0, limit).map((e) => ({
    slug: e.slug,
    category: e.category,
    name: pickLocale(e.name, locale),
    shortDescription: pickLocale(e.shortDescription, locale),
    foundedYear: e.foundedYear,
    headquartersCity: pickLocale(e.headquartersCity, locale),
  }));
}
