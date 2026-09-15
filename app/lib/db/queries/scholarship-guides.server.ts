// Scholarship-guide queries (TED-168).
// Same thin-layer-over-a-seed pattern as `queries/scholarships.server.ts`.

import {
  SCHOLARSHIP_GUIDES,
  type ScholarshipGuide,
  type ScholarshipGuideFaq,
  pickGuideLocale,
} from "../../education/scholarship-guides.server";
import type { Locale } from "../../i18n/config";
import { DEFAULT_LOCALE } from "../../i18n/config";

export interface ScholarshipGuideSummary {
  slug: string;
  title: string;
  summary: string;
  updated: string;
}

export interface ScholarshipGuideDetail extends ScholarshipGuideSummary {
  body: string;
  faqs: ScholarshipGuideFaq[];
  relatedScholarships: string[];
}

function summarize(g: ScholarshipGuide, locale: Locale): ScholarshipGuideSummary {
  return {
    slug: g.slug,
    title: pickGuideLocale(g.title, locale),
    summary: pickGuideLocale(g.summary, locale),
    updated: g.updated,
  };
}

export function listScholarshipGuides(locale: Locale): ScholarshipGuideSummary[] {
  return SCHOLARSHIP_GUIDES.map((g) => summarize(g, locale));
}

export function getScholarshipGuideBySlug(
  slug: string,
  locale: Locale,
): ScholarshipGuideDetail | null {
  const g = SCHOLARSHIP_GUIDES.find((e) => e.slug === slug);
  if (!g) return null;
  return {
    ...summarize(g, locale),
    body: g.bodies[locale] ?? g.bodies[DEFAULT_LOCALE] ?? g.bodies.he,
    faqs: g.faqs[locale] ?? g.faqs[DEFAULT_LOCALE] ?? g.faqs.he,
    relatedScholarships: g.relatedScholarships,
  };
}

/** Guides that reference a given scholarship slug — used for reverse cross-links. */
export function guidesForScholarship(
  scholarshipSlug: string,
  locale: Locale,
): ScholarshipGuideSummary[] {
  return SCHOLARSHIP_GUIDES.filter((g) =>
    g.relatedScholarships.includes(scholarshipSlug),
  ).map((g) => summarize(g, locale));
}
