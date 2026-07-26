// JSON-LD generators for the urban-renewal T3 template (TED-93 / ADR-016).
//
// Pure functions — return plain objects suitable for embedding in a
// route's `meta` export under `{ "script:ld+json": ... }`. Follows the
// per-vertical schema.ts convention used by careers/health/heritage.
//
// Schemas covered (see docs/seo/schema-org.md §9 mapping row for
// `/he/hitchadshut-ironit/{neighborhood}`):
//   breadcrumbJsonLd  → BreadcrumbList
//   placeJsonLd       → Place (with containedInPlace → City)
//   governmentServiceJsonLd → GovernmentService (renewal authority/program)
//   faqJsonLd         → FAQPage (only when ≥3 visibly-rendered Q&As back it)

import type { Locale } from "~/lib/i18n/config";
import type { LocalizedText, UrbanRenewalNeighborhood } from "./registry";

export type JsonLd = Record<string, unknown>;

export interface SchemaContext {
  /** Public site URL prefix, e.g. `https://tedros.co.il` (no trailing slash). */
  publicUrl: string;
  locale: Locale;
}

const SCHEMA_CONTEXT = "https://schema.org";

function localizedText(t: LocalizedText, locale: Locale): string {
  return t[locale] ?? t.he;
}

function urlFor(ctx: SchemaContext, path: string): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${ctx.publicUrl}/${ctx.locale}${trimmed}`;
}

// ── breadcrumbs ────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  /** Path relative to the locale, e.g. `/urban-renewal` or `/urban-renewal/dora-netanya`. */
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

// ── Place (neighborhood) ────────────────────────────────────────────────────

export function placeJsonLd(
  ctx: SchemaContext,
  neighborhood: UrbanRenewalNeighborhood,
  cityName: string,
): JsonLd {
  const url = urlFor(ctx, `/urban-renewal/${neighborhood.slug}`);
  const name = localizedText(neighborhood.name, ctx.locale);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Place",
    "@id": `${url}#place`,
    name,
    url,
    // No `geo` here — we don't have verified per-neighborhood coordinates
    // (see ADR-016 §D3); omitting rather than fabricating.
    containedInPlace: {
      "@type": "City",
      name: cityName,
    },
    additionalType: "https://schema.org/Neighborhood",
  };
}

// ── GovernmentService (renewal authority / program) ─────────────────────────

export function governmentServiceJsonLd(
  ctx: SchemaContext,
  neighborhood: UrbanRenewalNeighborhood,
  cityName: string,
): JsonLd {
  const url = urlFor(ctx, `/urban-renewal/${neighborhood.slug}`);
  const name = localizedText(neighborhood.name, ctx.locale);
  const description = localizedText(neighborhood.status, ctx.locale);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "GovernmentService",
    "@id": `${url}#service`,
    name:
      ctx.locale === "he"
        ? `התחדשות עירונית — ${name}`
        : ctx.locale === "am"
          ? `የከተማ ዳግም-ግንባታ — ${name}`
          : `Urban renewal — ${name}`,
    description,
    url,
    inLanguage: ctx.locale,
    provider: {
      "@type": "GovernmentOrganization",
      name: localizedText(neighborhood.authority, ctx.locale),
    },
    areaServed: { "@type": "City", name: cityName },
  };
}

// ── FAQ (only when ≥3 visible Q&As exist on the page) ───────────────────────

export interface FaqEntry {
  question: LocalizedText;
  answer: LocalizedText;
}

export function faqJsonLd(ctx: SchemaContext, entries: FaqEntry[]): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    inLanguage: ctx.locale,
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: localizedText(e.question, ctx.locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: localizedText(e.answer, ctx.locale),
      },
    })),
  };
}
