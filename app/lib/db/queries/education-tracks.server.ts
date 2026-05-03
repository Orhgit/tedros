// Education-track queries (RIN-507 / Phase 5 Wave 2).
// Aggregates Wave-1 scholarships + RIN-424 programs by track.
//
// Tracks are a server-only aggregation surface — components only render
// what the loader hands them, so this file stays out of the client bundle.

import {
  EDUCATION_TRACK_DEFINITIONS,
  type EducationTrack,
  type EducationTrackSlug,
} from "../../education/tracks";
import { pickLocale } from "../../education/scholarships.server";
import { PROGRAMS } from "../../programs/programs.server";
import { listScholarships, type ScholarshipSummary } from "./scholarships.server";
import type { Locale } from "../../i18n/config";

export interface EducationTrackSummary {
  slug: EducationTrackSlug;
  name: string;
  shortDescription: string;
  scholarshipCount: number;
  programCount: number;
}

export interface ProgramRef {
  slug: string;
  title: string;
  shortDescription: string;
  orgSlug: string;
}

export interface EducationTrackDetail {
  slug: EducationTrackSlug;
  name: string;
  shortDescription: string;
  intro: string;
  scholarships: ScholarshipSummary[];
  programs: ProgramRef[];
}

function scholarshipsForTrack(
  track: EducationTrack,
  locale: Locale,
): ScholarshipSummary[] {
  const all = listScholarships(locale);
  return all.filter((s) => {
    if (!track.scholarshipLevels.includes(s.level)) return false;
    if (track.scholarshipTagsAny && track.scholarshipTagsAny.length > 0) {
      const hit = s.tags.some((tag) => track.scholarshipTagsAny!.includes(tag));
      if (!hit) return false;
    }
    return true;
  });
}

function programsForTrack(track: EducationTrack, locale: Locale): ProgramRef[] {
  return PROGRAMS.filter((p) => track.programTracks.includes(p.track))
    .map((p) => ({
      slug: p.slug,
      title: pickLocale(p.title, locale),
      shortDescription: pickLocale(p.shortDescription, locale),
      orgSlug: p.orgSlug,
    }))
    .sort((a, b) => a.title.localeCompare(b.title, locale));
}

export function listEducationTracks(locale: Locale): EducationTrackSummary[] {
  return EDUCATION_TRACK_DEFINITIONS.map((track) => {
    const scholarshipCount = scholarshipsForTrack(track, locale).length;
    const programCount = programsForTrack(track, locale).length;
    return {
      slug: track.slug,
      name: pickLocale(track.name, locale),
      shortDescription: pickLocale(track.shortDescription, locale),
      scholarshipCount,
      programCount,
    };
  });
}

export function getEducationTrackBySlug(
  slug: string,
  locale: Locale,
): EducationTrackDetail | null {
  const track = EDUCATION_TRACK_DEFINITIONS.find((t) => t.slug === slug);
  if (!track) return null;
  return {
    slug: track.slug,
    name: pickLocale(track.name, locale),
    shortDescription: pickLocale(track.shortDescription, locale),
    intro: track.intro[locale] ?? track.intro.he,
    scholarships: scholarshipsForTrack(track, locale),
    programs: programsForTrack(track, locale),
  };
}

export function allEducationTrackSlugs(): string[] {
  return EDUCATION_TRACK_DEFINITIONS.map((t) => t.slug);
}

// Sanity check helper for tests — proves no track is empty (== thin SEO).
export function trackContentCount(slug: string, locale: Locale = "he"): number {
  const detail = getEducationTrackBySlug(slug, locale);
  if (!detail) return 0;
  return detail.scholarships.length + detail.programs.length;
}
