import { SUPPORTED_LOCALES } from "~/lib/i18n/config";

export function buildSitemapXml(
  publicUrl: string,
  paths: string[],
  lastmodByPath: Map<string, string> = new Map(),
): string {
  const buildDate = new Date().toISOString().slice(0, 10);

  function altLinksFor(path: string): string {
    return SUPPORTED_LOCALES.map(
      (loc) =>
        `      <xhtml:link rel="alternate" hreflang="${loc}" href="${publicUrl}/${loc}${path}"/>`,
    ).join("\n");
  }

  function xDefaultFor(path: string): string {
    return `      <xhtml:link rel="alternate" hreflang="x-default" href="${publicUrl}/he${path}"/>`;
  }

  function priorityFor(path: string): string {
    if (path === "") return "1.0";
    if (
      /^\/(rights|careers|education|heritage|health|cities|glossary|orgs|programs|news|listings)$/.test(
        path,
      )
    )
      return "0.9";
    if (
      /^\/(cities|rights|careers|education|orgs|programs|glossary|listings)\/[^/]+$/.test(
        path,
      )
    )
      return "0.8";
    if (
      /^\/(rights|heritage\/events|education\/scholarships|careers)\/[^/]+\/[^/]+$/.test(
        path,
      ) ||
      /^\/professionals\/[^/]+\/[^/]+$/.test(path)
    )
      return "0.5";
    return "0.6";
  }

  function changefreqFor(path: string): string {
    if (path.includes("/news/")) return "daily";
    if (path.includes("/careers/jobs/")) return "weekly";
    if (path === "") return "weekly";
    return "monthly";
  }

  function urlEntry(path: string, lastmod?: string): string {
    const lm = lastmod ?? buildDate;
    return SUPPORTED_LOCALES.map(
      (loc) => `  <url>
    <loc>${publicUrl}/${loc}${path}</loc>
    <lastmod>${lm}</lastmod>
    <changefreq>${changefreqFor(path)}</changefreq>
    <priority>${priorityFor(path)}</priority>
${altLinksFor(path)}
${xDefaultFor(path)}
  </url>`,
    ).join("\n");
  }

  const urls = paths.map((path) => urlEntry(path, lastmodByPath.get(path))).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function sitemapResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
