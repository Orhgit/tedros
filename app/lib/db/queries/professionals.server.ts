// Professionals directory queries (RIN-444 / SEO Wave 2b).
// Same thin-layer-over-static-seed pattern as glossary/orgs.

import {
  PROFESSIONALS,
  type ProfessionalSlot,
  getProfessionalBodyForLocale,
  pickLocale,
} from "../../professionals/professionals.server";
import type { Profession } from "../../professionals/categories";
import type { Locale } from "../../i18n/config";

export interface ProfessionalSummary {
  slug: string;
  profession: Profession;
  citySlug: string;
  specialty: string;
  title: string;
  shortDescription: string;
}

export interface ProfessionalDetail extends ProfessionalSummary {
  body: string;
  relatedRights: string[];
  relatedTerms: string[];
  relatedOrgs: string[];
  listedProfessional?: ProfessionalSlot["listedProfessional"];
}

function summarize(entry: ProfessionalSlot, locale: Locale): ProfessionalSummary {
  return {
    slug: entry.slug,
    profession: entry.profession,
    citySlug: entry.citySlug,
    specialty: entry.specialty,
    title: pickLocale(entry.title, locale),
    shortDescription: pickLocale(entry.shortDescription, locale),
  };
}

export function listProfessionals(locale: Locale): ProfessionalSummary[] {
  return PROFESSIONALS.map((e) => summarize(e, locale)).sort((a, b) =>
    a.title.localeCompare(b.title, locale),
  );
}

export function listByProfession(
  profession: Profession,
  locale: Locale,
): ProfessionalSummary[] {
  return PROFESSIONALS.filter((e) => e.profession === profession)
    .map((e) => summarize(e, locale))
    .sort((a, b) => a.title.localeCompare(b.title, locale));
}

export function listByProfessionAndCity(
  profession: Profession,
  citySlug: string,
  locale: Locale,
): ProfessionalSummary[] {
  return PROFESSIONALS.filter(
    (e) => e.profession === profession && e.citySlug === citySlug,
  )
    .map((e) => summarize(e, locale))
    .sort((a, b) => a.title.localeCompare(b.title, locale));
}

export function getProfessionalSlot(
  slug: string,
  locale: Locale,
): ProfessionalDetail | null {
  const entry = PROFESSIONALS.find((e) => e.slug === slug);
  if (!entry) return null;
  return {
    ...summarize(entry, locale),
    body: getProfessionalBodyForLocale(entry, locale),
    relatedRights: entry.relatedRights,
    relatedTerms: entry.relatedTerms,
    relatedOrgs: entry.relatedOrgs,
    listedProfessional: entry.listedProfessional,
  };
}

export function allProfessionalSlugs(): string[] {
  return PROFESSIONALS.map((e) => e.slug);
}

// Returns ALL (profession × city) pairs that have at least one slot —
// used by the sitemap to enumerate the programmatic-SEO surface without
// emitting empty pages.
export function professionalCityPairs(): Array<{
  profession: Profession;
  citySlug: string;
}> {
  const seen = new Set<string>();
  const out: Array<{ profession: Profession; citySlug: string }> = [];
  for (const e of PROFESSIONALS) {
    const key = `${e.profession}::${e.citySlug}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ profession: e.profession, citySlug: e.citySlug });
    }
  }
  return out;
}
