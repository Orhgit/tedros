// JSON-LD generators for the News vertical (RIN-425).
// `NewsArticle` per article (Google Top Stories carousel eligible) and
// `BreadcrumbList` helper.

import type { Locale } from "../i18n/config";

export type JsonLd = Record<string, unknown>;

export interface SchemaContext {
  publicUrl: string;
  locale: Locale;
}

const SCHEMA_CONTEXT = "https://schema.org";

function urlFor(ctx: SchemaContext, path: string): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${ctx.publicUrl}/${ctx.locale}${trimmed}`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(ctx: SchemaContext, items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: urlFor(ctx, item.path),
    })),
  };
}

export interface NewsArticleJsonLdInput {
  slug: string;
  headline: string;
  description: string;
  /** ISO-8601 publication date. */
  datePublished: string;
  /** ISO-8601 last-update date. */
  dateModified: string;
  tags: string[];
}

export function newsArticleJsonLd(
  ctx: SchemaContext,
  input: NewsArticleJsonLdInput,
): JsonLd {
  const url = urlFor(ctx, `/news/${input.slug}`);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "NewsArticle",
    "@id": url,
    url,
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: ctx.locale,
    keywords: input.tags,
    author: {
      "@type": "Organization",
      name: "Tedros",
      url: ctx.publicUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Tedros",
      url: ctx.publicUrl,
    },
  };
}
