// Server-side link-graph helpers for the Careers Hub vertical (RIN-470).
// Reads from CAREER_TRACKS seed data. Used by tests and loaders only.
// Client-safe URL helpers live in links.ts.

import { CAREER_TRACKS, findCareerTrack } from "./careers.server";
import type { CareerTrack } from "./categories";

export function relatedRightSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedRights.slice(0, limit);
}

export function relatedOrgSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedOrgs.slice(0, limit);
}

export function relatedTermSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedTerms.slice(0, limit);
}

export function recommendedBootcampSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.recommendedBootcamps.slice(0, limit);
}

export function relatedProfessionSlugs(track: CareerTrack, limit = 3): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedProfessions.slice(0, limit);
}

export function tracksForRight(rightSlug: string): CareerTrack[] {
  return CAREER_TRACKS.filter((t) => t.relatedRights.includes(rightSlug)).map(
    (t) => t.slug,
  );
}

export function tracksForOrg(orgSlug: string): CareerTrack[] {
  return CAREER_TRACKS.filter((t) => t.relatedOrgs.includes(orgSlug)).map((t) => t.slug);
}

export function tracksForBootcamp(bootcampSlug: string): CareerTrack[] {
  return CAREER_TRACKS.filter((t) => t.recommendedBootcamps.includes(bootcampSlug)).map(
    (t) => t.slug,
  );
}

export function internalLinkCount(track: CareerTrack): number {
  const entry = findCareerTrack(track);
  if (!entry) return 0;
  return (
    entry.relatedRights.length +
    entry.relatedOrgs.length +
    entry.relatedTerms.length +
    entry.recommendedBootcamps.length +
    entry.relatedProfessions.length
  );
}

export interface SlugReference {
  track: CareerTrack;
  slug: string;
  kind: "right" | "org" | "term" | "bootcamp" | "profession";
}

export function allSlugReferences(): SlugReference[] {
  const out: SlugReference[] = [];
  for (const t of CAREER_TRACKS) {
    for (const r of t.relatedRights) out.push({ track: t.slug, slug: r, kind: "right" });
    for (const o of t.relatedOrgs) out.push({ track: t.slug, slug: o, kind: "org" });
    for (const term of t.relatedTerms)
      out.push({ track: t.slug, slug: term, kind: "term" });
    for (const b of t.recommendedBootcamps)
      out.push({ track: t.slug, slug: b, kind: "bootcamp" });
    for (const p of t.relatedProfessions)
      out.push({ track: t.slug, slug: p, kind: "profession" });
  }
  return out;
}
