import { CITIES, CITY_PATH_PREFIX } from "~/lib/cities/registry";
import { PRIORITY_RIGHTS } from "~/lib/db/seeds/rights";
import { getEnv } from "~/lib/env.server";
import { SUPPORTED_LOCALES } from "~/lib/i18n/config";

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

  const PATHS = [
    "",
    "/calculator/mortgage-ethiopian-immigrants",
    CITY_PATH_PREFIX,
    ...CITIES.map((c) => `${CITY_PATH_PREFIX}/${c.slug}`),
    "/rights",
    // Each right has the same Latin slug across locales today; if they
    // diverge later, sitemap will need to walk allRightSlugsByLocale().
    ...PRIORITY_RIGHTS.map((r) => `/rights/${r.slug.he}`),
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
