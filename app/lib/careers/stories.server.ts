// Success-story seed scaffold (RIN-470 → RIN-475 / RIN-469).
//
// Sub-6 (RIN-475) fills STORIES with 10 anonymized profiles. Sub-1
// declares the shape so the route loader, schema validator, and PII
// audit can compile against the type today.
//
// PII rules (CLAUDE.md + Sub-6 DoD):
//   - `nickname` is anonymized — first name + age range only
//   - No real photos; routes render an illustration
//   - `consentAt` (ISO-8601) is required — no story ships without it
//   - Specific employer names only with explicit written consent

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";

export interface SuccessStoryEntry {
  slug: string;
  /** Anonymized display nickname — never a real surname. */
  nickname: Translatable;
  /** Track this story belongs to (matches `CareerTrack`). */
  trackSlug: string;
  /** City slug from `lib/cities/registry.ts`. */
  citySlug: string;
  /** Where the subject started — e.g. "high-school graduate". */
  startingPoint: Translatable;
  /** Current role — e.g. "Senior backend engineer". */
  currentRole: Translatable;
  /** Brief headline summary. */
  summary: Translatable;
  /** Bootcamp slugs the subject went through. */
  programsUsed: string[];
  /** ISO-8601 date the subject signed the consent form. */
  consentAt: string;
  /** ISO-8601 publication date. */
  publishedAt: string;
  /** Bodies × locale — populated in Sub-6. */
  bodies: Record<Locale, string>;
}

/**
 * 10 stories will be seeded by RIN-475 (Sub-6 — Wave 5). Until then this
 * is empty; routes render "סיפורים בקרוב" cards.
 */
export const STORIES: SuccessStoryEntry[] = [];

export function findStory(slug: string): SuccessStoryEntry | null {
  return STORIES.find((s) => s.slug === slug) ?? null;
}

export function storiesForTrack(trackSlug: string): SuccessStoryEntry[] {
  return STORIES.filter((s) => s.trackSlug === trackSlug);
}

export function storiesForCity(citySlug: string): SuccessStoryEntry[] {
  return STORIES.filter((s) => s.citySlug === citySlug);
}
