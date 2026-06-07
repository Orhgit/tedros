import { ARTICLES } from "~/lib/news/articles.server";
import { ALL_NEWS_TAGS } from "~/lib/news/categories";
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
    ...ARTICLES.map((a) => `/news/${a.slug}`),
    ...ALL_NEWS_TAGS.map((tag) => `/news/tag/${tag}`),
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths, lastmodByPath));
}
