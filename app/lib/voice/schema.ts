// JSON-LD generators for the Voice & Action pillar.
//
// Pure functions — return plain objects suitable for embedding in a
// route's `meta` export under `{ "script:ld+json": ... }`.
//
// Schemas covered:
//   webPageJsonLd      → WebPage (hub + sub-pages)
//   breadcrumbJsonLd   → BreadcrumbList helper

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
  /** Path relative to the locale, e.g. `/voice` or `/voice/racism-report`. */
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

// ── FAQPage (street-stop guide — TED-137) ──────────────────────────────────

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqJsonLd(ctx: SchemaContext, entries: FaqEntry[]): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    inLanguage: ctx.locale,
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: e.answer,
      },
    })),
  };
}

// ── Article (street-stop guide — TED-137) ──────────────────────────────────

export interface ArticleJsonLdInput {
  path: string;
  headline: string;
  description: string;
  /** ISO date (YYYY-MM-DD) — the topic's lastReviewed. */
  dateModified: string;
}

export function articleJsonLd(ctx: SchemaContext, input: ArticleJsonLdInput): JsonLd {
  const url = urlFor(ctx, input.path);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    "@id": url,
    mainEntityOfPage: url,
    headline: input.headline,
    description: input.description,
    inLanguage: ctx.locale,
    dateModified: input.dateModified,
    author: { "@type": "Organization", name: "Tedros" },
    publisher: { "@type": "Organization", name: "Tedros", url: ctx.publicUrl },
  };
}

// ── WebPage ────────────────────────────────────────────────────────────────

export interface WebPageJsonLdInput {
  path: string;
  name: string;
  description: string;
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
