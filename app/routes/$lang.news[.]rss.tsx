// /:lang/news.rss — RSS 2.0 feed for the news landing (TED-18 DoD: "RSS feed
// validates"). Resource route, no default export — mirrors robots.txt /
// sitemap[.]xml.tsx conventions.

import type { Route } from "./+types/$lang.news[.]rss";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { articlesByPublishedDesc } from "~/lib/news/articles.server";
import { t } from "~/lib/i18n/messages";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

export function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  const feedUrl = `${PUBLIC_URL}/${locale}/news.rss`;
  const siteUrl = `${PUBLIC_URL}/${locale}/news`;
  const articles = articlesByPublishedDesc();

  const items = articles
    .map((a) => {
      const title = a.title[locale] ?? a.title.he;
      const excerpt = a.excerpt[locale] ?? a.excerpt.he;
      const link = `${PUBLIC_URL}/${locale}/news/${a.slug}`;
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${toRfc822(a.publishedAt)}</pubDate>
      <description>${escapeXml(excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = articles[0] ? toRfc822(articles[0].publishedAt) : new Date(0).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(t(locale, "news_landing_title"))} — Tedros</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(t(locale, "news_landing_subtitle"))}</description>
    <language>${locale}</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
