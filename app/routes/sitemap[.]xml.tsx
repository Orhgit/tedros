import { getEnv } from "~/lib/env.server";
import { SUPPORTED_LOCALES } from "~/lib/i18n/config";
import { CITIES, CITY_PATH_PREFIX } from "~/lib/cities/registry";

/**
 * Resource route — `/sitemap.xml`. Phase 1/3 stub: homepage + the cities
 * index + every per-city page in each locale, with hreflang alternates per
 * ADR-005. Tedros Content & SEO replaces this with a sitemap-index +
 * per-locale per-section sitemaps (cap 40K URLs each) once listings,
 * articles, and professionals come online.
 */

const STATIC_PATHS: readonly string[] = ["", CITY_PATH_PREFIX];

export function loader() {
  const { PUBLIC_URL } = getEnv();

  const allPaths = [
    ...STATIC_PATHS,
    ...CITIES.map((c) => `${CITY_PATH_PREFIX}/${c.slug}`),
  ];

  const urls = allPaths
    .flatMap((path) => {
      const altLinks = SUPPORTED_LOCALES.map(
        (loc) =>
          `      <xhtml:link rel="alternate" hreflang="${loc}" href="${PUBLIC_URL}/${loc}${path}"/>`,
      ).join("\n");
      const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${PUBLIC_URL}/he${path}"/>`;
      return SUPPORTED_LOCALES.map(
        (loc) =>
          `  <url>
    <loc>${PUBLIC_URL}/${loc}${path}</loc>
${altLinks}
${xDefault}
  </url>`,
      );
    })
    .join("\n");

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
