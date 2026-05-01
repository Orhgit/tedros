// Bootcamp / program seed scaffold (RIN-470 → RIN-472 / RIN-469).
//
// Sub-3 (RIN-472) fills BOOTCAMPS with 15 entries. Sub-1 only declares the
// shape and exports an empty array so dependent code (track pages, sitemap
// loader, schema validation) can compile against the type today.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored at write-time.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import type { BootcampProgramType } from "./schema";

export interface BootcampEntry {
  slug: string;
  /** Org slug from `lib/orgs/orgs.server.ts`. Optional for cross-org bootcamps. */
  orgSlug?: string;
  /** Career track this bootcamp leads into (matches `CareerTrack`). */
  trackSlug: string;
  programType: BootcampProgramType;
  name: Translatable;
  shortDescription: Translatable;
  /** ISO-8601 duration, e.g. `P12W` for 12 weeks. */
  timeToComplete?: string;
  /** True when financial aid / subsidies cover community-member tuition. */
  financialAidEligible: boolean;
  /** Free-form occupational category (BLS code or plain text). */
  occupationalCategory?: string;
  applicationUrl: string;
  /** Right slugs satisfied by this bootcamp's eligibility. */
  relatedRights: string[];
  /** Profession slugs (RIN-444). */
  relatedProfessions: string[];
  /** City slugs where the bootcamp has a physical campus. */
  cities: string[];
  /** Bodies × locale — populated in Sub-3. */
  bodies: Record<Locale, string>;
}

/**
 * 15 bootcamps will be seeded by RIN-472 (Sub-3 — Wave 2). Until then this
 * is intentionally empty so route loaders return "no bootcamps yet" cards
 * gracefully.
 */
export const BOOTCAMPS: BootcampEntry[] = [];

export function findBootcamp(slug: string): BootcampEntry | null {
  return BOOTCAMPS.find((b) => b.slug === slug) ?? null;
}

export function bootcampsForTrack(trackSlug: string): BootcampEntry[] {
  return BOOTCAMPS.filter((b) => b.trackSlug === trackSlug);
}

export function bootcampsForOrg(orgSlug: string): BootcampEntry[] {
  return BOOTCAMPS.filter((b) => b.orgSlug === orgSlug);
}

export function bootcampsForCity(citySlug: string): BootcampEntry[] {
  return BOOTCAMPS.filter((b) => b.cities.includes(citySlug));
}
