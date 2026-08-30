// Shared loader/meta plumbing for the TED-144 mental-health access routes.
// Routes stay thin: loader delegates here, meta delegates to the descriptors
// built in the loader (JSON-LD is precomputed server-side, mirroring the
// wave-3 loader pattern in traditional-medicine/nutrition).

import { getEnv } from "~/lib/env.server";
import {
  localizeAccessText,
  mentalHealthAccessPageBySlug,
  type MentalHealthAccessSlug,
} from "~/lib/health/mental-health-access.server";
import { mentalHealthAccessPath, mentalHealthPath, rightsPath } from "~/lib/health/links";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  type JsonLd,
} from "~/lib/health/schema";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

/** Message keys per page — titles/subtitles live in messages/*.json (HE first). */
const PAGE_KEYS: Record<MentalHealthAccessSlug, { title: string; subtitle: string }> = {
  interpreter: {
    title: "health_mh_interpreter_title",
    subtitle: "health_mh_interpreter_subtitle",
  },
  "hospitalization-rights": {
    title: "health_mh_hospitalization_title",
    subtitle: "health_mh_hospitalization_subtitle",
  },
  "culturally-competent-care": {
    title: "health_mh_cultural_title",
    subtitle: "health_mh_cultural_subtitle",
  },
};

/** Internal cross-links per page (path + label message key). */
const RELATED: Record<MentalHealthAccessSlug, Array<{ path: string; key: string }>> = {
  interpreter: [
    {
      path: mentalHealthAccessPath("hospitalization-rights"),
      key: "health_mh_hospitalization_title",
    },
    {
      path: mentalHealthAccessPath("culturally-competent-care"),
      key: "health_mh_cultural_title",
    },
    { path: "/professionals/amharic", key: "professionals_amharic_landing_title" },
  ],
  "hospitalization-rights": [
    { path: mentalHealthAccessPath("interpreter"), key: "health_mh_interpreter_title" },
    {
      path: mentalHealthAccessPath("culturally-competent-care"),
      key: "health_mh_cultural_title",
    },
    { path: rightsPath(), key: "health_rights_title" },
  ],
  "culturally-competent-care": [
    { path: mentalHealthAccessPath("interpreter"), key: "health_mh_interpreter_title" },
    {
      path: mentalHealthAccessPath("hospitalization-rights"),
      key: "health_mh_hospitalization_title",
    },
    { path: "/professionals/amharic", key: "professionals_amharic_landing_title" },
    { path: "/health/traditional-medicine", key: "health_traditional_medicine_title" },
  ],
};

export interface MentalHealthAccessLoaderData {
  locale: Locale;
  slug: MentalHealthAccessSlug;
  publicUrl: string;
  title: string;
  subtitle: string;
  sections: Array<{ id: string; heading: string; body: string }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  sources: Array<{ name: string; url: string }>;
  amharicSummary: string;
  legalDisclaimer: boolean;
  lastReviewed: string;
  related: Array<{ path: string; label: string }>;
  article: JsonLd;
  faqSchema: JsonLd;
  breadcrumb: JsonLd;
}

export function loadMentalHealthAccessPage(
  lang: string | undefined,
  slug: MentalHealthAccessSlug,
): MentalHealthAccessLoaderData {
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const { PUBLIC_URL: publicUrl } = getEnv();

  const page = mentalHealthAccessPageBySlug(slug);
  if (!page) throw new Response("Not Found", { status: 404 });

  const keys = PAGE_KEYS[slug];
  const title = t(locale, keys.title);
  const subtitle = t(locale, keys.subtitle);
  const path = mentalHealthAccessPath(slug);
  const ctx = { publicUrl, locale };

  const faqs = page.faqs.map((f) => ({
    id: f.id,
    question: localizeAccessText(f.question, locale),
    answer: localizeAccessText(f.answer, locale),
  }));

  return {
    locale,
    slug,
    publicUrl,
    title,
    subtitle,
    sections: page.sections.map((s) => ({
      id: s.id,
      heading: localizeAccessText(s.heading, locale),
      body: localizeAccessText(s.body, locale),
    })),
    faqs,
    sources: page.sources,
    amharicSummary: page.amharicSummary,
    legalDisclaimer: page.legalDisclaimer,
    lastReviewed: page.lastReviewed,
    related: RELATED[slug].map((r) => ({ path: r.path, label: t(locale, r.key) })),
    article: articleJsonLd(ctx, {
      path,
      headline: title,
      description: subtitle,
      lastReviewed: page.lastReviewed,
    }),
    faqSchema: faqJsonLd(ctx, faqs),
    breadcrumb: breadcrumbJsonLd(ctx, [
      { name: t(locale, "health_breadcrumb_home"), path: "/" },
      { name: t(locale, "health_breadcrumb_health"), path: "/health" },
      { name: t(locale, "health_mental_health_title"), path: mentalHealthPath() },
      { name: title, path },
    ]),
  };
}
