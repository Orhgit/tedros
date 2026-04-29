// Rights Hub queries (RIN-337 / part of RIN-328 — Phase 3 MVP).
//
// Data source for v1: the static seed in `app/lib/db/seeds/rights.ts`. This
// lets the Rights Hub ship without a populated DB and lets dev work happen
// offline. When the seed runner lands and a populated DB is the source of
// truth, swap the two functions below to issue Drizzle queries against
// `rights` + `right_translations` — public API stays the same.

import { PRIORITY_RIGHTS, type RightSeed } from "../seeds/rights";
import type { Locale } from "../../i18n/config";
import { DEFAULT_LOCALE } from "../../i18n/config";

export interface RightSummary {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface RightDetail extends RightSummary {
  body: string;
  govUrl: string;
}

function pickLocale(t: { he: string; en?: string; am?: string }, locale: Locale): string {
  return t[locale] ?? t.he;
}

function bodyForLocale(seed: RightSeed, locale: Locale): string {
  return seed.bodies[locale] ?? seed.bodies[DEFAULT_LOCALE];
}

export function listRights(locale: Locale): RightSummary[] {
  return PRIORITY_RIGHTS.map((r) => ({
    slug: pickLocale(r.slug, locale),
    title: pickLocale(r.title, locale),
    summary: pickLocale(r.eligibilitySummary, locale),
    tags: r.tags,
  }));
}

export function getRightBySlug(slug: string, locale: Locale): RightDetail | null {
  // Match against the slug in any locale (slugs are Latin kebab-case across
  // locales today, but tomorrow they may diverge — the route accepts the
  // slug shown in the user's locale).
  const seed = PRIORITY_RIGHTS.find(
    (r) => r.slug.he === slug || r.slug.en === slug || r.slug.am === slug,
  );
  if (!seed) return null;
  return {
    slug: pickLocale(seed.slug, locale),
    title: pickLocale(seed.title, locale),
    summary: pickLocale(seed.eligibilitySummary, locale),
    body: bodyForLocale(seed, locale),
    govUrl: seed.govUrl,
    tags: seed.tags,
  };
}

// Used by sitemap.xml.tsx — every right × every locale.
export function allRightSlugsByLocale(): Array<{ locale: Locale; slug: string }> {
  const out: Array<{ locale: Locale; slug: string }> = [];
  for (const r of PRIORITY_RIGHTS) {
    out.push({ locale: "he", slug: r.slug.he });
    if (r.slug.en) out.push({ locale: "en", slug: r.slug.en });
    if (r.slug.am) out.push({ locale: "am", slug: r.slug.am });
  }
  return out;
}
