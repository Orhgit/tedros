// Job-posting seed scaffold (RIN-470 → RIN-474 / RIN-469).
//
// Sub-5 (RIN-474) fills JOBS with up to 20 entries. Sub-1 declares the
// shape so the route loader, sitemap loader, and JobPosting schema
// validator can compile against the type today.
//
// JobPosting is Google for Jobs eligible — every required Schema.org field
// is required here too, which is why this type is stricter than the other
// scaffolds.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import type { EmploymentType } from "./schema";

export interface JobPostingEntry {
  slug: string;
  title: Translatable;
  description: Translatable;
  /** Org slug for internal employers, plain name for external public-sector. */
  employerOrgSlug?: string;
  employerNameExternal?: string;
  /** City slug from `lib/cities/registry.ts`. */
  citySlug: string;
  /** Optional region label (e.g. `Center`, `North`) — used in `addressRegion`. */
  region?: string;
  employmentType: EmploymentType;
  /** ISO-8601 timestamp when the posting went live. */
  postedAt: string;
  /** ISO-8601 timestamp after which the posting returns 410 Gone. */
  validThrough: string;
  /** External application URL. */
  applicationUrl: string;
  /** Optional salary disclosure. */
  baseSalary?: {
    minValue: number;
    maxValue: number;
    currency: string;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  /** Order-50 affirmative-action flag. */
  affirmativeAction: boolean;
  /** Career track this job belongs to. */
  trackSlug: string;
  /** Bodies × locale — populated in Sub-5. */
  bodies: Record<Locale, string>;
}

/**
 * 20 jobs will be seeded by RIN-474 (Sub-5 — Wave 4). 8 public-sector
 * postings ship without owner outreach; 12 partner-org postings depend on
 * RIN-325 outreach approval — see `open_questions.md` Q3.
 */
export const JOBS: JobPostingEntry[] = [];

export function findJob(slug: string): JobPostingEntry | null {
  return JOBS.find((j) => j.slug === slug) ?? null;
}

/**
 * True when a job is currently active (`postedAt <= now < validThrough`).
 * Routes return 410 Gone for inactive postings so Google can drop them
 * from the Jobs feature without delay.
 */
export function isJobActive(job: JobPostingEntry, now: Date = new Date()): boolean {
  const posted = new Date(job.postedAt);
  const valid = new Date(job.validThrough);
  return posted <= now && now < valid;
}

export function activeJobs(now: Date = new Date()): JobPostingEntry[] {
  return JOBS.filter((j) => isJobActive(j, now));
}

export function activeJobsForTrack(
  trackSlug: string,
  now: Date = new Date(),
): JobPostingEntry[] {
  return activeJobs(now).filter((j) => j.trackSlug === trackSlug);
}

export function activeJobsForCity(
  citySlug: string,
  now: Date = new Date(),
): JobPostingEntry[] {
  return activeJobs(now).filter((j) => j.citySlug === citySlug);
}
