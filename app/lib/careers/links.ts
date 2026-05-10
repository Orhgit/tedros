// Canonical URL helpers for the Careers Hub vertical (RIN-470).
// Pure client-safe module — no server imports.
// Server-data helpers (relatedRightSlugs, allSlugReferences, etc.) live in
// links.server.ts.

import type { Locale } from "../i18n/config";
import type { CareerTrackEntry } from "./careers.server";
import type { CareerTrack } from "./categories";

// ── canonical URLs ─────────────────────────────────────────────────────────

export function trackPath(track: CareerTrack): string {
  return `/careers/${track}`;
}

export function trackCityPath(track: CareerTrack, citySlug: string): string {
  return `/careers/${track}/${citySlug}`;
}

export function bootcampPath(bootcampSlug: string): string {
  return `/careers/programs/${bootcampSlug}`;
}

export function jobPath(jobSlug: string): string {
  return `/careers/jobs/${jobSlug}`;
}

export function storyPath(storySlug: string): string {
  return `/careers/stories/${storySlug}`;
}

export function faqPath(faqSlug: string): string {
  return `/careers/faq/${faqSlug}`;
}

/** Display name of a track in the requested locale. */
export function trackDisplayName(entry: CareerTrackEntry, locale: Locale): string {
  return entry.name[locale] ?? entry.name.he;
}
