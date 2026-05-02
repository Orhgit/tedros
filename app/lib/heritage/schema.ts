// JSON-LD generators for the Heritage events vertical (RIN-422 / RIN-417).
//
// Pure functions returning objects suitable for embedding in a route's
// `meta` export under `{ "script:ld+json": ... }`. Each generator is
// unit-tested against the Schema.org type it claims to produce.

import type { Locale } from "../i18n/config";

export type JsonLd = Record<string, unknown>;

export interface SchemaContext {
  publicUrl: string;
  locale: Locale;
}

const SCHEMA_CONTEXT = "https://schema.org";

function localizedText(t: { he: string; en?: string; am?: string }, locale: Locale): string {
  return t[locale] ?? t.he;
}

function urlFor(ctx: SchemaContext, path: string): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${ctx.publicUrl}/${ctx.locale}${trimmed}`;
}

// ── Breadcrumb (re-used) ──────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(
  ctx: SchemaContext,
  items: BreadcrumbItem[],
): JsonLd {
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

// ── Event JSON-LD ─────────────────────────────────────────────────────────

export interface HeritageEventJsonLdInput {
  slug: string;
  name: { he: string; en?: string; am?: string };
  description: { he: string; en?: string; am?: string };
  /** ISO-8601 date (YYYY-MM-DD) of the next observance, or null if none. */
  startDate: string | null;
  /** Optional: where the event happens (default: nationwide). */
  location?: {
    name: string;
    /** Optional locality. */
    addressLocality?: string;
  };
  /** Optional: scoped to a single city (used by cells). */
  citySlug?: string;
}

export function heritageEventJsonLd(
  ctx: SchemaContext,
  input: HeritageEventJsonLdInput,
): JsonLd {
  const url = input.citySlug
    ? urlFor(ctx, `/heritage/events/${input.slug}/${input.citySlug}`)
    : urlFor(ctx, `/heritage/events/${input.slug}`);
  const name = localizedText(input.name, ctx.locale);
  const description = localizedText(input.description, ctx.locale);

  // The location block: locality-scoped for cells, country-scoped otherwise.
  const location = input.location
    ? {
        "@type": "Place",
        name: input.location.name,
        ...(input.location.addressLocality
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: input.location.addressLocality,
                addressCountry: "IL",
              },
            }
          : {}),
      }
    : {
        "@type": "Country",
        name: "Israel",
      };

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Event",
    "@id": url,
    url,
    name,
    description,
    inLanguage: ctx.locale,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(input.startDate ? { startDate: input.startDate } : {}),
    location,
    organizer: {
      "@type": "Organization",
      name: "Tedros",
      url: ctx.publicUrl,
    },
  };
}
