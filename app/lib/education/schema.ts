// JSON-LD generators for the Education pillar (TED-145).
//
// Pure functions returning objects suitable for embedding in a route's `meta`
// export under `{ "script:ld+json": ... }`. Mirrors the heritage/voice
// generators; kept pillar-local so each vertical can evolve its schema without
// a shared-module ripple.

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

// ── Breadcrumb ─────────────────────────────────────────────────────────────

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

// ── FAQPage ────────────────────────────────────────────────────────────────

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqPageJsonLd(
  ctx: SchemaContext,
  path: string,
  entries: FaqEntry[],
): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    "@id": `${urlFor(ctx, path)}#faq`,
    inLanguage: ctx.locale,
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
}

// ── Article ────────────────────────────────────────────────────────────────

export interface EducationArticleJsonLdInput {
  path: string;
  headline: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  datePublished: string;
}

export function educationArticleJsonLd(
  ctx: SchemaContext,
  input: EducationArticleJsonLdInput,
): JsonLd {
  const url = urlFor(ctx, input.path);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    "@id": url,
    mainEntityOfPage: url,
    headline: input.headline,
    description: input.description,
    inLanguage: ctx.locale,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    author: { "@type": "Organization", name: "Tedros" },
    publisher: { "@type": "Organization", name: "Tedros", url: ctx.publicUrl },
  };
}
