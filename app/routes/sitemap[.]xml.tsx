import { getEnv } from "~/lib/env.server";
import { SUPPORTED_LOCALES } from "~/lib/i18n/config";

/**
 * Resource route — `/sitemap.xml`. Phase 1 stub: only the homepage in
 * each locale, with hreflang alternates per ADR-005. Tedros Content & SEO
 * replaces this with a sitemap-index + per-locale per-section sitemaps
 * (cap 40K URLs each) once listings/articles/professionals come online.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();
  const altLinks = SUPPORTED_LOCALES.map(
    (loc) =>
      `      <xhtml:link rel="alternate" hreflang="${loc}" href="${PUBLIC_URL}/${loc}"/>`,
  ).join("\n");
  const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${PUBLIC_URL}/he"/>`;

  const urls = SUPPORTED_LOCALES.map(
    (loc) =>
      `  <url>
    <loc>${PUBLIC_URL}/${loc}</loc>
${altLinks}
${xDefault}
  </url>`,
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
