// /:lang/news/:slug — News article detail (RIN-425 / RIN-417).
// Renders one article with markdown body + NewsArticle JSON-LD.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.news.$slug";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { glyphForNewsTag, isNewsTag } from "~/lib/news/categories";
import {
  articleBody,
  articlesByPublishedDesc,
  findArticle,
} from "~/lib/news/articles.server";
import { breadcrumbJsonLd, newsArticleJsonLd } from "~/lib/news/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.slug) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const article = findArticle(params.slug);
  if (!article) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const html = renderMarkdown(articleBody(article, locale));

  // 3 sibling articles (most-recent excluding self).
  const siblings = articlesByPublishedDesc()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map((a) => ({
      slug: a.slug,
      title: a.title[locale] ?? a.title.he,
      publishedAt: a.publishedAt,
    }));

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/news/${article.slug}`;

  return { locale, article, html, siblings, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, article, publicUrl } = data;
  const title = article.title[locale] ?? article.title.he;
  const description = article.excerpt[locale] ?? article.excerpt.he;

  const articleJsonLd = newsArticleJsonLd(
    { publicUrl, locale },
    {
      slug: article.slug,
      headline: title,
      description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      tags: article.tags,
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "news_landing_title"), path: "/news" },
    { name: title, path: `/news/${article.slug}` },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, `/news/${article.slug}`),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": articleJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function NewsArticleDetail({ loaderData }: Route.ComponentProps) {
  const { locale, article, html, siblings, shareUrl } = loaderData;
  const title = article.title[locale] ?? article.title.he;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/news`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
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
          <p className="mt-3 text-xs text-ink-600">
            {t(locale, "news_published_label")}: {article.publishedAt}
            {article.publishedAt !== article.updatedAt && (
              <>
                {" "}
                · {t(locale, "news_updated_label")}: {article.updatedAt}
              </>
            )}{" "}
            ·{" "}
            <Link to={`/${locale}/about`} className="hover:underline">
              {locale === "he"
                ? "מערכת טדרוס"
                : locale === "am"
                  ? "የቴድሮስ ዝግጅት ክፍል"
                  : "Tedros Editorial"}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tg) => {
              if (!isNewsTag(tg)) return null;
              return (
                <Link
                  key={tg}
                  to={`/${locale}/news/tag/${tg}`}
                  className="inline-flex items-center gap-1 rounded-full border border-earth-200 bg-earth-50 px-2.5 py-0.5 text-xs text-earth-800 hover:border-earth-400"
                >
                  <span aria-hidden="true">{glyphForNewsTag(tg)}</span>
                  {t(locale, `news_tag_${tg}`)}
                </Link>
              );
            })}
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-6">
          <WhatsAppShare title={title} url={shareUrl} locale={locale} />
        </div>

        {siblings.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "news_siblings_heading")}
            </h2>
            <ul className="mt-4 space-y-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${locale}/news/${s.slug}`}
                    className="block rounded-md border border-earth-200 bg-card p-3 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <p className="text-xs text-ink-600">{s.publishedAt}</p>
                    <p className="mt-1 font-medium text-earth-900">{s.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "news_back_to_landing")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
