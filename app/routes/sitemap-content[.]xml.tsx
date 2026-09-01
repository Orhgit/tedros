import { CITIES } from "~/lib/cities/registry";
import { COMPARISONS } from "~/lib/comparisons/comparisons.server";
import { CITY_SHOPPING } from "~/lib/culinary/shops.server";
import { EDUCATION_TRACKS } from "~/lib/education/tracks";
import {
  amharicHubPath,
  amharicUlpanPath,
  parentRightsPath,
  registrationDiscriminationPath,
} from "~/lib/education/links";
import { SCHOLARSHIPS } from "~/lib/education/scholarships.server";
import { SCHOLARSHIP_RELEVANCE_CITIES } from "~/lib/education/scholarship-relevance";
import { getEnv } from "~/lib/env.server";
import { GLOSSARY } from "~/lib/glossary/glossary.server";
import { HERITAGE_EVENTS } from "~/lib/heritage/events.server";
import { KESSIM_CITIES } from "~/lib/heritage/kessim.server";
import {
  weddingPath,
  weddingSupplierCategoryPath,
  weddingSupplierCityPath,
} from "~/lib/heritage/links";
import { ALL_WEDDING_SUPPLIER_CATEGORIES } from "~/lib/heritage/wedding-categories";
import { weddingSupplierCells } from "~/lib/heritage/wedding-suppliers.server";
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
    // Parents vs. the school system (TED-145)
    registrationDiscriminationPath(),
    parentRightsPath(),
    // Learning Amharic (TED-147)
    amharicHubPath(),
    amharicUlpanPath(),
    ...SCHOLARSHIPS.flatMap((s) =>
      SCHOLARSHIP_RELEVANCE_CITIES.map(
        (city) => `/education/scholarships/${s.slug}/${city}`,
      ),
    ),
    // Heritage events
    ...HERITAGE_EVENTS.map((e) => `/heritage/events/${e.slug}`),
    ...heritageCells,
    // Kessim directory (TED-140)
    "/heritage/kessim",
    ...KESSIM_CITIES.map((c) => `/heritage/kessim/${c.slug}`),
    // Wedding & henna hub + supplier directory (TED-143). Category pages are
    // listed even when empty — "we looked and found nothing verifiable" is a
    // real answer to the query. City cells exist only where a supplier states
    // that city on its own page, so they come from the data, not a product.
    weddingPath(),
    ...ALL_WEDDING_SUPPLIER_CATEGORIES.map((c) => weddingSupplierCategoryPath(c)),
    ...weddingSupplierCells().map((cell) =>
      weddingSupplierCityPath(cell.category, cell.citySlug),
    ),
    // Culinary (TED-146)
    "/culinary",
    "/culinary/sigd-menu",
    ...CITY_SHOPPING.map((c) => `/culinary/shopping/${c.citySlug}`),
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
    "/professionals/amharic", // Amharic-speaker landing (TED-136)
    ...ALL_PROFESSIONS.map((p) => `/professionals/${p}`),
    ...professionalCells,
    ...PROFESSIONALS.map((e) => `/professionals/profile/${e.slug}`),
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths));
}
