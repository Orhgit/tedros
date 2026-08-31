// Client-safe meta builder for the TED-144 mental-health access routes.
// JSON-LD objects are precomputed in the loader (server); this only arranges
// descriptors, so it can run in the browser during client-side navigation.

import { mentalHealthAccessPath } from "~/lib/health/links";
import type { JsonLd } from "~/lib/health/schema";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import type { Locale } from "~/lib/i18n/config";

export interface MentalHealthAccessMetaData {
  locale: Locale;
  slug: string;
  publicUrl: string;
  title: string;
  subtitle: string;
  article: JsonLd;
  faqSchema: JsonLd;
  breadcrumb: JsonLd;
}

export function mentalHealthAccessMeta(data: MentalHealthAccessMetaData | undefined) {
  if (!data) return [{ title: "Tedros" }];
  const { locale, slug, publicUrl, title, subtitle, article, faqSchema, breadcrumb } =
    data;
  const path = mentalHealthAccessPath(slug);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, path),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": article },
    { "script:ld+json": faqSchema },
    { "script:ld+json": breadcrumb },
  ];
}
