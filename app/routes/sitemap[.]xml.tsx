import { CITIES, CITY_PATH_PREFIX } from "~/lib/cities/registry";
import { PRIORITY_RIGHTS } from "~/lib/db/seeds/rights";
import { getEnv } from "~/lib/env.server";
import { COMPARISONS } from "~/lib/comparisons/comparisons.server";
import { GLOSSARY } from "~/lib/glossary/glossary.server";
import { SUPPORTED_LOCALES } from "~/lib/i18n/config";
import { ORGS } from "~/lib/orgs/orgs.server";
import { ALL_PROFESSIONS } from "~/lib/professionals/categories";
import {
  PROFESSIONALS,
  type ProfessionalSlot,
} from "~/lib/professionals/professionals.server";
import { relevantCities } from "~/lib/rights/relevance";

/**
 * Resource route — `/sitemap.xml`. Lists every public URL with hreflang
 * alternates per ADR-005. As more sections come online, Content & SEO will
 * split this into a sitemap-index + per-locale per-section sitemaps (cap
 * 40K URLs each).
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  function altLinksFor(path: string): string {
    return SUPPORTED_LOCALES.map(
      (loc) =>
        `      <xhtml:link rel="alternate" hreflang="${loc}" href="${PUBLIC_URL}/${loc}${path}"/>`,
    ).join("\n");
  }
  function xDefaultFor(path: string): string {
    return `      <xhtml:link rel="alternate" hreflang="x-default" href="${PUBLIC_URL}/he${path}"/>`;
  }

  function urlEntry(path: string): string {
    return `  <url>
    <loc>${PUBLIC_URL}/${"$LOC_PLACEHOLDER"}${path}</loc>
${altLinksFor(path)}
${xDefaultFor(path)}
  </url>`;
  }

  // RIN-339 — programmatic SEO right × city cells. Filter by relevance
  // (`isRelevant`) so we don't ship 1,140 thin pages — narrows to ~600
  // cells across community-cities and list-bound rights.
  const rightCityCells: string[] = [];
  for (const right of PRIORITY_RIGHTS) {
    for (const city of relevantCities(right.slug.he, CITIES)) {
      rightCityCells.push(`/rights/${right.slug.he}/${city.slug}`);
    }
  }

  const PATHS = [
    "",
    "/calculator/mortgage-ethiopian-immigrants",
    CITY_PATH_PREFIX,
    ...CITIES.map((c) => `${CITY_PATH_PREFIX}/${c.slug}`),
    "/rights",
    // Each right has the same Latin slug across locales today; if they
    // diverge later, sitemap will need to walk allRightSlugsByLocale().
    ...PRIORITY_RIGHTS.map((r) => `/rights/${r.slug.he}`),
    ...rightCityCells,
    // RIN-418 — Glossary (Wave 1 of RIN-417): 12 entries × 3 locales.
    "/glossary",
    ...GLOSSARY.map((e) => `/glossary/${e.slug}`),
    // RIN-419 — Org profiles (Wave 1b of RIN-417): 12 entries × 3 locales.
    "/orgs",
    ...ORGS.map((o) => `/orgs/${o.slug}`),
    // RIN-444 — Professionals directory (Wave 2b of RIN-417):
    // landing + by-profession (8) + non-empty profession×city pairs +
    // detail pages × 3 locales.
    "/professionals",
    ...ALL_PROFESSIONS.map((p) => `/professionals/${p}`),
    // Only non-empty (profession, city) pairs — skip thin/missing pages.
    ...(() => {
      const seen = new Set<string>();
      const out: string[] = [];
      for (const e of PROFESSIONALS as ProfessionalSlot[]) {
        const key = `${e.profession}::${e.citySlug}`;
        if (!seen.has(key)) {
          seen.add(key);
          out.push(`/professionals/${e.profession}/${e.citySlug}`);
        }
      }
      return out;
    })(),
    ...PROFESSIONALS.map((e) => `/professionals/profile/${e.slug}`),
    // RIN-421 — Comparisons (Wave 3a of RIN-417): 10 X-vs-Y entries.
    "/compare",
    ...COMPARISONS.map((c) => `/compare/${c.slug}`),
  ];

  const urls = SUPPORTED_LOCALES.flatMap((loc) =>
    PATHS.map((path) => urlEntry(path).replace("$LOC_PLACEHOLDER", loc)),
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
