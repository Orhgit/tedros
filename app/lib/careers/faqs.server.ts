// Career-FAQ seed scaffold (RIN-470 → RIN-475 / RIN-469).
//
// Sub-6 (RIN-475) fills FAQS with 20 long-tail Q&A entries. Sub-1
// declares the shape so the route loader and FAQPage schema validator
// can compile against the type today.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";

export interface CareerFaqEntry {
  slug: string;
  /** The question text — H1 of the FAQ page. */
  question: Translatable;
  /** TL;DR (1-2 sentences) — used as `description` and TL;DR box. */
  shortAnswer: Translatable;
  /** Track this FAQ relates to (optional — some are cross-track). */
  trackSlug?: string;
  /** Order in which to display under `/careers/faq`. */
  orderIndex: number;
  /** ISO-8601 date the answer was last reviewed by content team (E-E-A-T). */
  reviewedAt: string;
  /** Bodies × locale — populated in Sub-6 (~250-400 words HE). */
  bodies: Record<Locale, string>;
}

/**
 * 20 FAQs will be seeded by RIN-475 (Sub-6 — Wave 5). Until then routes
 * render the "FAQ קרובות" placeholder.
 */
export const FAQS: CareerFaqEntry[] = [];

export function findFaq(slug: string): CareerFaqEntry | null {
  return FAQS.find((f) => f.slug === slug) ?? null;
}

export function faqsForTrack(trackSlug: string): CareerFaqEntry[] {
  return FAQS.filter((f) => f.trackSlug === trackSlug);
}

export function faqsByOrder(): CareerFaqEntry[] {
  return [...FAQS].sort((a, b) => a.orderIndex - b.orderIndex);
}
