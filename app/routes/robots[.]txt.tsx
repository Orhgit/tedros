import { getEnv } from "~/lib/env.server";

/**
 * Resource route — `/robots.txt`. No default export, only loader.
 * Per ADR-005 + Lighthouse SEO `robots-txt` audit (worth ~4 points).
 * Sitemap reference points at the dynamic sitemap-index that ADR-005
 * promises; until the per-section sitemaps land we serve a minimal stub
 * at `/sitemap.xml` (see app/routes/sitemap[.]xml.tsx).
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();
  const body = `User-agent: *
Allow: /

Sitemap: ${PUBLIC_URL}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
