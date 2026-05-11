// JSON-LD generators for the Health Hub vertical (RIN-653/654/655 Wave 1,
// RIN-656/657 Wave 2).
//
// Pure functions — return plain objects suitable for embedding in a
// route's `meta` export under `{ "script:ld+json": ... }`. Each generator
// is unit-tested against the Schema.org type it claims to produce.
//
// Schemas covered:
//   healthConditionJsonLd  → MedicalWebPage (YMYL-appropriate)
//   webPageJsonLd          → WebPage (hub + conditions landing)
//   faqJsonLd              → FAQPage (mental health hub, health rights)
//   localBusinessJsonLd    → LocalBusiness (health services)
//   breadcrumbJsonLd       → BreadcrumbList helper

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
  /** Path relative to the locale, e.g. `/health` or `/health/conditions`. */
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

// ── WebPage (pillar + conditions landing) ──────────────────────────────────

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

// ── MedicalWebPage (condition detail pages — YMYL) ─────────────────────────

export interface HealthConditionJsonLdInput {
  slug: string;
  name: string;
  description: string;
  /** ISO date of last review, e.g. "2026-05-11". */
  lastReviewed: string;
  /** Medical audience: Patient | MedicalResearcher | etc. */
  audienceType?: string;
}

export function healthConditionJsonLd(
  ctx: SchemaContext,
  input: HealthConditionJsonLdInput,
): JsonLd {
  const url = urlFor(ctx, `/health/conditions/${input.slug}`);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    inLanguage: ctx.locale,
    lastReviewed: input.lastReviewed,
    reviewedBy: {
      "@type": "Organization",
      name: "Tedros",
      url: ctx.publicUrl,
    },
    audience: {
      "@type": "MedicalAudience",
      audienceType: input.audienceType ?? "Patient",
      geographicArea: {
        "@type": "Country",
        name: "Israel",
      },
    },
    isPartOf: {
      "@type": "WebSite",
      url: ctx.publicUrl,
      name: "Tedros",
    },
    about: {
      "@type": "MedicalCondition",
      name: input.name,
    },
  };
}

// ── FAQPage (mental health hub, health rights) ─────────────────────────────

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

// ── LocalBusiness (health services directory — RIN-656) ────────────────────

export interface LocalBusinessJsonLdInput {
  name: string;
  description: string;
  url?: string;
  telephone?: string;
  /** ISO country code, e.g. "IL". */
  addressCountry?: string;
}

export function localBusinessJsonLd(
  ctx: SchemaContext,
  input: LocalBusinessJsonLdInput,
): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "HealthAndBeautyBusiness",
    name: input.name,
    description: input.description,
    inLanguage: ctx.locale,
    ...(input.url ? { url: input.url } : {}),
    ...(input.telephone ? { telephone: input.telephone } : {}),
    ...(input.addressCountry
      ? {
          address: {
            "@type": "PostalAddress",
            addressCountry: input.addressCountry,
          },
        }
      : {}),
    isPartOf: {
      "@type": "WebSite",
      url: ctx.publicUrl,
      name: "Tedros",
    },
  };
}
