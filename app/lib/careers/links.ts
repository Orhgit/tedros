// Internal-link graph helpers for the Careers Hub vertical (RIN-470).
//
// Pure module — given a track, returns the slug refs that the track page
// (Sub-2), city × track cells (Sub-4), and bootcamp pages (Sub-3) should
// link to.
//
// Why a helper instead of inlining in routes: every Wave (Sub-2..Sub-6)
// needs ≥3 internal links per page (DoD), and audits in CI need a single
// source of truth to compare against. Routes call these helpers; tests
// pin the integrity of the graph (no dead refs).

import type { Locale } from "../i18n/config";
import {
  CAREER_TRACKS,
  type CareerTrackEntry,
  findCareerTrack,
} from "./careers.server";
import type { CareerTrack } from "./categories";

// ── per-track lookups ──────────────────────────────────────────────────────

/** Right slugs the track page should surface. Returns up to `limit`. */
export function relatedRightSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedRights.slice(0, limit);
}

/** Org slugs the track page should surface. */
export function relatedOrgSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedOrgs.slice(0, limit);
}

/** Glossary term slugs the track page should surface. */
export function relatedTermSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedTerms.slice(0, limit);
}

/** Bootcamp slugs (filled in by Sub-3 — empty array safe before then). */
export function recommendedBootcampSlugs(track: CareerTrack, limit = 5): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.recommendedBootcamps.slice(0, limit);
}

/** Profession slugs from the professionals directory (RIN-444). */
export function relatedProfessionSlugs(track: CareerTrack, limit = 3): string[] {
  const entry = findCareerTrack(track);
  if (!entry) return [];
  return entry.relatedProfessions.slice(0, limit);
}

// ── reverse lookups ────────────────────────────────────────────────────────

/**
 * Tracks that mention a given right slug. Used by the right detail page
 * (RIN-336 / RIN-339) to render a "related career tracks" section once
 * Sub-2 ships.
 */
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

// ── canonical URLs ─────────────────────────────────────────────────────────

/** Path (locale-relative) for a track landing page. */
export function trackPath(track: CareerTrack): string {
  return `/careers/${track}`;
}

/** Path (locale-relative) for a track × city programmatic cell (Sub-4). */
export function trackCityPath(track: CareerTrack, citySlug: string): string {
  return `/careers/${track}/${citySlug}`;
}

/** Path for a bootcamp/program detail page (Sub-3). */
export function bootcampPath(bootcampSlug: string): string {
  return `/careers/programs/${bootcampSlug}`;
}

/** Path for a job posting detail page (Sub-5). */
export function jobPath(jobSlug: string): string {
  return `/careers/jobs/${jobSlug}`;
}

/** Path for a success story (Sub-6). */
export function storyPath(storySlug: string): string {
  return `/careers/stories/${storySlug}`;
}

/** Path for an FAQ entry (Sub-6). */
export function faqPath(faqSlug: string): string {
  return `/careers/faq/${faqSlug}`;
}

// ── audit helpers (used by tests + CI) ─────────────────────────────────────

/**
 * Internal-link summary per track. Sub-2 page DoD is "≥5 internal links";
 * this helper returns the count, so tests can pin the floor.
 */
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

/**
 * Returns every (track, slug, kind) triple referenced by the careers seed.
 * Tests use this to verify there are no dead references — every right
 * slug exists in `lib/db/seeds/rights.ts`, every org slug in
 * `lib/orgs/orgs.server.ts`, etc.
 */
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
    for (const term of t.relatedTerms) out.push({ track: t.slug, slug: term, kind: "term" });
    for (const b of t.recommendedBootcamps)
      out.push({ track: t.slug, slug: b, kind: "bootcamp" });
    for (const p of t.relatedProfessions)
      out.push({ track: t.slug, slug: p, kind: "profession" });
  }
  return out;
}

/** Display name of a track in the requested locale. */
export function trackDisplayName(entry: CareerTrackEntry, locale: Locale): string {
  return entry.name[locale] ?? entry.name.he;
}
