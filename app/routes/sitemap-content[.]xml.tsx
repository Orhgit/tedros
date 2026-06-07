import { CITIES } from "~/lib/cities/registry";
import { COMPARISONS } from "~/lib/comparisons/comparisons.server";
import { EDUCATION_TRACKS } from "~/lib/education/tracks";
import { SCHOLARSHIPS } from "~/lib/education/scholarships.server";
import { SCHOLARSHIP_RELEVANCE_CITIES } from "~/lib/education/scholarship-relevance";
import { getEnv } from "~/lib/env.server";
import { GLOSSARY } from "~/lib/glossary/glossary.server";
import { HERITAGE_EVENTS } from "~/lib/heritage/events.server";
import { relevantCities as heritageRelevantCities } from "~/lib/heritage/relevance";
import { ORGS } from "~/lib/orgs/orgs.server";
import { ALL_PROFESSIONS } from "~/lib/professionals/categories";
import {
  PROFESSIONALS,
  type ProfessionalSlot,
} from "~/lib/professionals/professionals.server";
import { PROGRAMS } from "~/lib/programs/programs.server";
import { STAT_TOPICS } from "~/lib/statistics/topics.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * Content sitemap — education, heritage, glossary, orgs, programs,
 * comparisons, statistics, professionals.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const professionalCells: string[] = [];
  const seen = new Set<string>();
  for (const e of PROFESSIONALS as ProfessionalSlot[]) {
    const key = `${e.profession}::${e.citySlug}`;
    if (!seen.has(key)) {
      seen.add(key);
      professionalCells.push(`/professionals/${e.profession}/${e.citySlug}`);
    }
  }

  const heritageCells: string[] = [];
  for (const event of HERITAGE_EVENTS) {
    for (const city of heritageRelevantCities(event.slug, CITIES)) {
      heritageCells.push(`/heritage/events/${event.slug}/${city.slug}`);
    }
  }

  const paths = [
    // Education
    "/education/scholarships",
    ...SCHOLARSHIPS.map((s) => `/education/scholarships/${s.slug}`),
    "/education/tracks",
    ...EDUCATION_TRACKS.map((t) => `/education/tracks/${t}`),
    ...SCHOLARSHIPS.flatMap((s) =>
      SCHOLARSHIP_RELEVANCE_CITIES.map(
        (city) => `/education/scholarships/${s.slug}/${city}`,
      ),
    ),
    // Heritage events
    ...HERITAGE_EVENTS.map((e) => `/heritage/events/${e.slug}`),
    ...heritageCells,
    // Glossary
    ...GLOSSARY.map((e) => `/glossary/${e.slug}`),
    // Orgs
    ...ORGS.map((o) => `/orgs/${o.slug}`),
    // Programs
    ...PROGRAMS.map((p) => `/programs/${p.slug}`),
    // Comparisons
    ...COMPARISONS.map((c) => `/compare/${c.slug}`),
    // Statistics
    ...STAT_TOPICS.map((t) => `/statistics/${t.slug}`),
    // Professionals
    ...ALL_PROFESSIONS.map((p) => `/professionals/${p}`),
    ...professionalCells,
    ...PROFESSIONALS.map((e) => `/professionals/profile/${e.slug}`),
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths));
}
