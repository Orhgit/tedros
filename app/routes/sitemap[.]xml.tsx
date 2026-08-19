import { getEnv } from "~/lib/env.server";

/**
 * Sitemap index — `/sitemap.xml`.
 * Points to per-section sub-sitemaps for better crawl-budget management.
 * Each sub-sitemap is capped well under 40K URLs (sitemap protocol limit).
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();
  const buildDate = new Date().toISOString().slice(0, 10);

  const subs = [
    "sitemap-core.xml",
    "sitemap-rights.xml",
    "sitemap-careers.xml",
    "sitemap-health.xml",
    "sitemap-content.xml",
    "sitemap-news.xml",
    "sitemap-listings.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subs.map((s) => `  <sitemap>\n    <loc>${PUBLIC_URL}/${s}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </sitemap>`).join("\n")}
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
