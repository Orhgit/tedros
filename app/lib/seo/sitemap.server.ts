import { SUPPORTED_LOCALES } from "~/lib/i18n/config";

export function buildSitemapXml(
  publicUrl: string,
  paths: string[],
  lastmodByPath: Map<string, string> = new Map(),
): string {
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

  // TED-188 — `lastmod` is emitted only when the caller actually knows when
  // the content changed.
  //
  // This used to fall back to `new Date()`, which meant 1,323 of 1,992 URLs
  // (66%) told Google "this changed today" on every single request, every
  // day, for pages that had not been touched in months. `lastmod` is the one
  // signal we have for asking that a page be looked at again, and spending it
  // on every URL daily is the same as not having it: a crawler that has been
  // lied to about 66% of a sitemap has no reason to believe the other 34%.
  //
  // `lastmod` is optional in the sitemaps protocol. Omitting it leaves Google
  // on its own heuristics, which is where it already was — but it means that
  // when we *do* set it, on the news articles and on a page we have genuinely
  // just rewritten, the claim is true and worth acting on.
  function urlEntry(path: string, lastmod?: string): string {
    const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
    return SUPPORTED_LOCALES.map(
      (loc) => `  <url>
    <loc>${publicUrl}/${loc}${path}</loc>${lastmodLine}
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
