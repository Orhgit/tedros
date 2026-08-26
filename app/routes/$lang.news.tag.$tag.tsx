// /:lang/news/tag/:tag — News by-tag landing (RIN-425 / RIN-417).
// Lists articles filtered to a single tag. Lighter than the main landing —
// no tag-chip strip (the URL is the filter).

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.news.tag.$tag";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { glyphForNewsTag, isNewsTag } from "~/lib/news/categories";
import { articlesByTag } from "~/lib/news/articles.server";
import { breadcrumbJsonLd } from "~/lib/news/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { formatDate } from "~/lib/i18n/format";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.tag || !isNewsTag(params.tag)) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const articles = articlesByTag(params.tag)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map((a) => ({
      slug: a.slug,
      title: a.title[locale] ?? a.title.he,
      excerpt: a.excerpt[locale] ?? a.excerpt.he,
      publishedAt: a.publishedAt,
      tags: a.tags,
    }));

  const { PUBLIC_URL } = getEnv();
  return { locale, tag: params.tag, articles, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, tag, publicUrl } = data;
  const tagLabel = t(locale, `news_tag_${tag}`);
  const title = `${t(locale, "news_landing_title")} — ${tagLabel}`;
  const description = t(locale, "news_landing_subtitle");

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "news_landing_title"), path: "/news" },
    { name: tagLabel, path: `/news/tag/${tag}` },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, `/news/tag/${tag}`),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { "script:ld+json": breadcrumb },
  ];
};

export default function NewsByTag({ loaderData }: Route.ComponentProps) {
  const { locale, tag, articles } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/news`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/news`} className="hover:underline">
              {t(locale, "news_landing_title")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            <span aria-hidden="true" className="me-2">
              {isNewsTag(tag) && glyphForNewsTag(tag)}
            </span>
            {t(locale, `news_tag_${tag}`)}
          </h1>
          <p className="mt-3 text-sm text-ink-700">
            {articles.length} {t(locale, "news_articles_count_label")}
          </p>
        </header>

        {articles.length === 0 ? (
          <p className="text-center text-base text-ink-600">
            {t(locale, "news_empty_state")}
          </p>
        ) : (
          <ul className="space-y-4">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/${locale}/news/${a.slug}`}
                  className="block rounded-lg border border-earth-200 bg-card p-5 transition hover:border-earth-400 hover:shadow-sm"
                >
                  <p className="text-xs text-ink-600">
                    {formatDate(locale, a.publishedAt)}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-earth-900">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{a.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "news_back_to_landing")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
