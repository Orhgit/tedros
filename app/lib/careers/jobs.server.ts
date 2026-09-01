// Job-posting seed (RIN-474 / RIN-469).
//
// JobPosting is Google for Jobs eligible — every required Schema.org field
// is required here too, which is why this type is stricter than the other
// careers scaffolds.
//
// ## Seeding policy
//
// Tedros emits a real Google for Jobs feature only for *real, current*
// openings. Posting synthesized or stale jobs would (a) mislead users
// who click expecting an active opening and (b) risk Google deindexing
// the entire site for low-quality structured data.
//
// JOBS therefore stays empty in the repo until the owner has explicit
// permission to publish a specific posting from a specific employer
// (per `open_questions.md` Q3 / RIN-325 outreach). When permission
// arrives, append entries below using the shape declared by
// `JobPostingEntry`. The route layer + JSON-LD generator handle any
// number of entries (including zero) without code changes.
//
// Routes behave as follows:
//   - /:lang/careers/jobs        → renders an empty-state landing while
//                                   JOBS.length === 0; renders cards once
//                                   active jobs exist.
//   - /:lang/careers/jobs/:slug  → renders a JobPosting JSON-LD page for
//                                   active jobs; returns 410 Gone when a
//                                   job is past `validThrough` (Google
//                                   recommendation — distinguishes from
//                                   404 so the indexer drops it cleanly).

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
 * V1 seeds — 8 public-sector job postings under Order 50 (צו 50).
 * All listed via the Israeli Civil Service Commission portal (jobs.gov.il).
 * V2 community jobs will be appended after RIN-325 outreach confirms feeds.
 */
export const JOBS: JobPostingEntry[] = [
  // TED-157: eight entries were removed here. They were job postings
  // attributed to real, named employers — משרד הבריאות, משרד העלייה והקליטה,
  // עיריית תל אביב-יפו, עיריית רחובות, עיריית קרית מלאכי, שירות התעסוקה —
  // for vacancies none of them had published, with invented salary bands and
  // interview months, emitted as Google-for-Jobs structured data. That is the
  // exact outcome the seeding policy above exists to prevent, and the array
  // was seeded in violation of it. It stays empty until the owner has
  // permission for a specific posting from a specific employer.
];

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
