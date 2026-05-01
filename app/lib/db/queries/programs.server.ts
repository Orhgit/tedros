// Programs queries (RIN-424 / SEO Wave 3b).

import {
  PROGRAMS,
  type ProgramEntry,
  getProgramBodyForLocale,
  pickLocale,
} from "../../programs/programs.server";
import type { ProgramTrack } from "../../programs/categories";
import type { Locale } from "../../i18n/config";

export interface ProgramSummary {
  slug: string;
  orgSlug: string;
  track: ProgramTrack;
  title: string;
  shortDescription: string;
  duration: string;
  location: string;
  forWhom: string;
}

export interface ProgramDetail extends ProgramSummary {
  body: string;
  relatedRights: string[];
  relatedTerms: string[];
}

function summarize(entry: ProgramEntry, locale: Locale): ProgramSummary {
  return {
    slug: entry.slug,
    orgSlug: entry.orgSlug,
    track: entry.track,
    title: pickLocale(entry.title, locale),
    shortDescription: pickLocale(entry.shortDescription, locale),
    duration: pickLocale(entry.duration, locale),
    location: pickLocale(entry.location, locale),
    forWhom: pickLocale(entry.forWhom, locale),
  };
}

export function listPrograms(locale: Locale): ProgramSummary[] {
  return PROGRAMS.map((e) => summarize(e, locale)).sort((a, b) =>
    a.title.localeCompare(b.title, locale),
  );
}

export function listProgramsByOrg(orgSlug: string, locale: Locale): ProgramSummary[] {
  return PROGRAMS.filter((e) => e.orgSlug === orgSlug)
    .map((e) => summarize(e, locale))
    .sort((a, b) => a.title.localeCompare(b.title, locale));
}

export function getProgramEntry(slug: string, locale: Locale): ProgramDetail | null {
  const entry = PROGRAMS.find((e) => e.slug === slug);
  if (!entry) return null;
  return {
    ...summarize(entry, locale),
    body: getProgramBodyForLocale(entry, locale),
    relatedRights: entry.relatedRights,
    relatedTerms: entry.relatedTerms,
  };
}

export function allProgramSlugs(): string[] {
  return PROGRAMS.map((e) => e.slug);
}
