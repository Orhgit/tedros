import { getEnv } from "~/lib/env.server";

/**
 * Sitemap index — `/sitemap.xml`.
 * Points to per-section sub-sitemaps for better crawl-budget management.
 * Each sub-sitemap is capped well under 40K URLs (sitemap protocol limit).
 *
 * TED-188: no `lastmod` here either. It used to be `new Date()`, which told a
 * crawler that all six sub-sitemaps had changed today, every day. At the index
 * level that is the first thing a crawler reads about this site, and it was
 * false six times over. Same rule as `buildSitemapXml`: claim a change date
 * only when we know one.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const subs = [
    "sitemap-core.xml",
    "sitemap-rights.xml",
    "sitemap-careers.xml",
    "sitemap-health.xml",
    "sitemap-content.xml",
    "sitemap-news.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subs.map((s) => `  <sitemap>\n    <loc>${PUBLIC_URL}/${s}</loc>\n  </sitemap>`).join("\n")}
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
