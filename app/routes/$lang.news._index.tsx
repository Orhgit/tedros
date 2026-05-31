// /:lang/news — News landing (RIN-425 / RIN-417).
// Lists articles sorted descending by publishedAt + tag filter chips.
// Emits `ItemList` JSON-LD listing the recent articles.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.news._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { ALL_NEWS_TAGS, glyphForNewsTag, isNewsTag } from "~/lib/news/categories";
import { articlesByPublishedDesc } from "~/lib/news/articles.server";
import { breadcrumbJsonLd } from "~/lib/news/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const articles = articlesByPublishedDesc().map((a) => ({
    slug: a.slug,
    title: a.title[locale] ?? a.title.he,
    excerpt: a.excerpt[locale] ?? a.excerpt.he,
    publishedAt: a.publishedAt,
    tags: a.tags,
  }));
  const { PUBLIC_URL } = getEnv();
  return { locale, articles, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, articles, publicUrl } = data;
  const title = t(locale, "news_landing_title");
  const description = t(locale, "news_landing_subtitle");
  const url = `${publicUrl}/${locale}/news`;

  const itemList =
    articles.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title,
          numberOfItems: articles.length,
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${publicUrl}/${locale}/news/${a.slug}`,
          })),
        }
      : null;

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "news_breadcrumb_home"), path: "/" },
    { name: title, path: "/news" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/news"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: url },
    ...(itemList ? [{ "script:ld+json": itemList }] : []),
    { "script:ld+json": breadcrumb },
  ];
};

export default function NewsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, articles } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag") ?? "";

  const filtered = tagFilter
    ? articles.filter((a) => (a.tags as readonly string[]).includes(tagFilter))
    : articles;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/news`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative mb-8 isolate overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "news_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "news_landing_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "news_landing_subtitle")}
          </p>
        </header>

        <section
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label={t(locale, "news_filter_label")}
        >
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("tag");
              setSearchParams(params, { replace: true });
            }}
            className={`rounded-full px-3 py-1 text-sm transition ${
              !tagFilter
                ? "bg-earth-800 text-white"
                : "bg-earth-100 text-earth-900 hover:bg-earth-200"
            }`}
          >
            {t(locale, "news_filter_all")}
          </button>
          {ALL_NEWS_TAGS.map((tg) => {
            if (!isNewsTag(tg)) return null;
            const isActive = tagFilter === tg;
            return (
              <Link
                key={tg}
                to={`/${locale}/news/tag/${tg}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition ${
                  isActive
                    ? "bg-earth-800 text-white"
                    : "border border-earth-200 bg-card text-earth-800 hover:border-earth-400"
                }`}
              >
                <span aria-hidden="true">{glyphForNewsTag(tg)}</span>
                {t(locale, `news_tag_${tg}`)}
              </Link>
            );
          })}
        </section>

        {filtered.length === 0 ? (
          <p className="text-center text-base text-ink-600">
            {t(locale, "news_empty_state")}
          </p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/${locale}/news/${a.slug}`}
                  className="block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                >
                  <p className="text-xs text-ink-600">{a.publishedAt}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-earth-900">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{a.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {a.tags.map((tg) => (
                      <span
                        key={tg}
                        className="inline-flex items-center gap-1 rounded-full border border-earth-200 bg-earth-50 px-2 py-0.5 text-xs text-earth-700"
                      >
                        <span aria-hidden="true">{glyphForNewsTag(tg)}</span>
                        {t(locale, `news_tag_${tg}`)}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
