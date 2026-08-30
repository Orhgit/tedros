// JSON-LD generators for the Family & Support pillar.
//
// Pure functions — return plain objects suitable for embedding in a
// route's `meta` export under `{ "script:ld+json": ... }`.
//
// Schemas covered:
//   webPageJsonLd     → WebPage (hub + sub-pages)
//   breadcrumbJsonLd  → BreadcrumbList helper

import type { Locale } from "../i18n/config";

// ── shared types ───────────────────────────────────────────────────────────

export type JsonLd = Record<string, unknown>;

export interface SchemaContext {
  /** Public site URL prefix, e.g. `https://tedros.co.il` (no trailing slash). */
  publicUrl: string;
  locale: Locale;
}

const SCHEMA_CONTEXT = "https://schema.org";

function urlFor(ctx: SchemaContext, path: string): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${ctx.publicUrl}/${ctx.locale}${trimmed}`;
}

// ── breadcrumbs ────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  /** Path relative to the locale, e.g. `/family` or `/family/elderly`. */
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

// ── WebPage (pillar + sub-page landing) ───────────────────────────────────

export interface WebPageJsonLdInput {
  path: string;
  name: string;
  description: string;
}

// ── Article (long-form guide pages, e.g. the mourning guide) ──────────────

export interface ArticleJsonLdInput {
  path: string;
  headline: string;
  description: string;
  /** ISO date the guide was first published. */
  datePublished: string;
  /** ISO date of the last substantive update. */
  dateModified?: string;
}

export function articleJsonLd(ctx: SchemaContext, input: ArticleJsonLdInput): JsonLd {
  const url = urlFor(ctx, input.path);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    "@id": url,
    url,
    mainEntityOfPage: url,
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: ctx.locale,
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

export function webPageJsonLd(ctx: SchemaContext, input: WebPageJsonLdInput): JsonLd {
  const url = urlFor(ctx, input.path);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    inLanguage: ctx.locale,
    isPartOf: {
      "@type": "WebSite",
      url: ctx.publicUrl,
      name: "Tedros",
    },
  };
}
