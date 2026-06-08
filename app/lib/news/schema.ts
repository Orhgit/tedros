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
  author?: { name: string; url?: string };
}

const EDITORIAL_TEAM = {
  "@type": "Organization",
  "@id": "https://tedros.co.il/#editorial-team",
  name: "צוות מערכת טדרוס",
  url: "https://tedros.co.il/he/about",
  member: [
    {
      "@type": "Person",
      name: "צוות קהילה טדרוס",
      jobTitle: "עורכת תוכן קהילתית",
      knowsLanguage: ["he", "en", "am"],
      worksFor: { "@id": "https://tedros.co.il/#organization" },
    },
  ],
};

export function newsArticleJsonLd(
  ctx: SchemaContext,
  input: NewsArticleJsonLdInput,
): JsonLd {
  const url = urlFor(ctx, `/news/${input.slug}`);
  const authorNode = input.author
    ? {
        "@type": "Person",
        name: input.author.name,
        ...(input.author.url ? { url: input.author.url } : {}),
        worksFor: { "@id": `${ctx.publicUrl}/#organization` },
      }
    : EDITORIAL_TEAM;

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
    author: authorNode,
    publisher: {
      "@type": "Organization",
      "@id": `${ctx.publicUrl}/#organization`,
      name: "Tedros",
      url: ctx.publicUrl,
      logo: {
        "@type": "ImageObject",
        url: `${ctx.publicUrl}/logo.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
