import { ARTICLES } from "~/lib/news/articles.server";
import { getEnv } from "~/lib/env.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * News sitemap — articles + tag pages. Separated for daily crawl priority.
 * Articles use article-specific lastmod dates.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const lastmodByPath = new Map<string, string>(
    ARTICLES.map((a) => [`/news/${a.slug}`, a.updatedAt]),
  );

  const paths = [
    // TED-187: the articles are the asset — they carry 29 of the site's 34
    // clicks. The 13 tag archives are filtered views that hold no writing of
    // their own, so they are noindex and no longer submitted.
    ...ARTICLES.map((a) => `/news/${a.slug}`),
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths, lastmodByPath));
}
