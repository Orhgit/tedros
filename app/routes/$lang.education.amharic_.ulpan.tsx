// /:lang/education/amharic/ulpan — Hebrew ulpan for adult Ethiopian-Israeli
// immigrants, and the questions to ask about Amharic support (TED-147).
//
// "amharic_." escapes fs-routes nesting under the hub index route while keeping
// the URL segment, matching the pattern used by the mental-health guides.
//
// ── Why this is not the page its spec described ───────────────────────────
// `docs/seo/pages/2026-08-05-bilingual-ulpan-hebrew-amharic.md` specced a
// "bilingual Hebrew-Amharic ulpan" page and was then marked REJECTED by its own
// §9 follow-up round: the two-teacher model it was built on was tried in
// "individual classrooms" and never rolled out nationally for budget reasons
// (Hed HaUlpan 102, 2014), and no ulpan running it today could be found. The
// spec's own conclusion is "do not re-implement without further verification".
//
// So this page keeps the search intent and drops the false promise. It is
// built on what is verifiable — the ministry's live national ulpan list, the
// two-teacher model stated explicitly as history, and the questions that will
// actually work when a reader phones an ulpan. The spec also placed the page
// in the Rights Hub behind a DB seed; every comparable guide shipped since
// (mourning, soldiers, mental-health, parent-rights) is a static route over a
// `.server` content module, so it follows those instead. Both deviations are
// written up in the PR.
//
// JSON-LD: Article + FAQPage + BreadcrumbList.

import type { Route } from "./+types/$lang.education.amharic_.ulpan";
import { GuidePage } from "~/components/sections/guide-page";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  ULPAN_AMHARIC_SUMMARY,
  ULPAN_BODY,
  ULPAN_SUBTITLE,
  ULPAN_TITLE,
  ulpanCopy,
  ulpanCrosslinks,
  ulpanFaq,
  ulpanResources,
  ulpanSources,
  ulpanSteps,
} from "~/lib/education/amharic.server";
import { amharicUlpanPath } from "~/lib/education/links";
import {
  breadcrumbJsonLd,
  educationArticleJsonLd,
  faqPageJsonLd,
} from "~/lib/education/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

/**
 * First published — bump on substantive edits. Declared here rather than
 * imported from the content module: `meta` is NOT stripped from the client
 * bundle, so a `.server` import reached from it fails the build outright
 * (ADR-020 §4). This is the same reason `$lang.education.parent-rights.tsx`
 * keeps its own `PUBLISHED_AT`.
 */
const PUBLISHED_AT = "2026-08-31";

/**
 * The standalone Amharic summary is the whole point of this page for its
 * primary reader, so the Ge'ez face is loaded here too rather than only on /am
 * (TED-128). `unicode-range` keeps the fetch to browsers that need it.
 */
export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: "/fonts/noto-sans-ethiopic.css" },
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  return {
    locale,
    publicUrl: PUBLIC_URL,
    title: ULPAN_TITLE[locale],
    subtitle: ULPAN_SUBTITLE[locale],
    // Deliberately the same Amharic text in every locale.
    summary: ULPAN_AMHARIC_SUMMARY,
    body: ULPAN_BODY[locale],
    steps: ulpanSteps(locale),
    faq: ulpanFaq(locale),
    resources: ulpanResources(locale),
    sources: ulpanSources(locale),
    crosslinks: ulpanCrosslinks(locale),
    summaryHeading: ulpanCopy("summaryHeading", locale),
    stepsHeading: ulpanCopy("stepsHeading", locale),
    bodyHeading: ulpanCopy("bodyHeading", locale),
    faqHeading: ulpanCopy("faqHeading", locale),
    crosslinkHeading: ulpanCopy("crosslinkHeading", locale),
    crosslinkBody: ulpanCopy("crosslinkBody", locale),
    resourcesHeading: ulpanCopy("resourcesHeading", locale),
    sourcesHeading: ulpanCopy("sourcesHeading", locale),
    websiteLabel: ulpanCopy("websiteLabel", locale),
    disclaimer: ulpanCopy("disclaimer", locale),
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, subtitle, faq, publicUrl } = data;
  const path = amharicUlpanPath();

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
    { property: "og:url", content: `${publicUrl}/${locale}${path}` },
    {
      "script:ld+json": educationArticleJsonLd(
        { publicUrl, locale },
        {
          path,
          headline: title,
          description: subtitle,
          datePublished: PUBLISHED_AT,
        },
      ),
    },
    {
      "script:ld+json": faqPageJsonLd(
        { publicUrl, locale },
        path,
        faq.map((f) => ({ question: f.question, answer: f.answer })),
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: t(locale, "education_pillar_title"), path: "/education" },
        { name: title, path },
      ]),
    },
  ];
};

export default function AmharicUlpanPage({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${amharicUlpanPath()}`} />
      <GuidePage
        locale={locale}
        homeLabel={t(locale, "rights_breadcrumb_home")}
        title={loaderData.title}
        subtitle={loaderData.subtitle}
        summaryHeading={loaderData.summaryHeading}
        summary={loaderData.summary}
        stepsHeading={loaderData.stepsHeading}
        steps={loaderData.steps}
        bodyHeading={loaderData.bodyHeading}
        body={loaderData.body}
        faqHeading={loaderData.faqHeading}
        faq={loaderData.faq}
        crosslinkHeading={loaderData.crosslinkHeading}
        crosslinkBody={loaderData.crosslinkBody}
        crosslinks={loaderData.crosslinks}
        resourcesHeading={loaderData.resourcesHeading}
        resources={loaderData.resources}
        sourcesHeading={loaderData.sourcesHeading}
        sources={loaderData.sources}
        websiteLabel={loaderData.websiteLabel}
        disclaimer={loaderData.disclaimer}
      />
      <SiteFooter locale={locale} />
    </div>
  );
}
