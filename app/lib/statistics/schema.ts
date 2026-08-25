// JSON-LD generators for the Statistics demographics vertical (RIN-423).
// Pure functions returning Schema.org `Dataset` and `BreadcrumbList`
// objects — Google indexes Dataset for the Dataset Search SERP feature.

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

export interface StatTopicJsonLdInput {
  topicSlug: string;
  name: string;
  description: string;
  /** ISO-8601 interval — typically a single year like "2024". */
  temporalCoverage?: string;
  /** Free-form keywords (mix of HE and EN ok — Google picks up both). */
  keywords?: string[];
  /** The organization(s) that produced the underlying figures (e.g. CBS —
   * הלמ"ס). Falls back to Tedros itself when omitted. */
  creatorName?: string;
  /** When true, emits a `distribution` DataDownload pointing at the
   * topic's CSV export (`/:lang/statistics/:topic.csv`). */
  includeCsvDistribution?: boolean;
}

export function statTopicJsonLd(ctx: SchemaContext, input: StatTopicJsonLdInput): JsonLd {
  const url = urlFor(ctx, `/statistics/${input.topicSlug}`);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Dataset",
    "@id": url,
    url,
    name: input.name,
    description: input.description,
    creator: {
      "@type": "Organization",
      name: input.creatorName ?? "Tedros",
      url: ctx.publicUrl,
    },
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    isAccessibleForFree: true,
    spatialCoverage: { "@type": "Country", name: "Israel" },
    ...(input.temporalCoverage ? { temporalCoverage: input.temporalCoverage } : {}),
    ...(input.keywords && input.keywords.length > 0 ? { keywords: input.keywords } : {}),
    ...(input.includeCsvDistribution
      ? {
          distribution: [
            {
              "@type": "DataDownload",
              encodingFormat: "text/csv",
              contentUrl: `${url}.csv`,
            },
          ],
        }
      : {}),
  };
}
