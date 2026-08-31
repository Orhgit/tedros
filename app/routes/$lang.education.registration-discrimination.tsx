// /:lang/education/registration-discrimination — what counts as discrimination
// in school registration, and what to do about it (TED-145).
//
// JSON-LD: Article + FAQPage + BreadcrumbList.
//
// ADR-020: every string on this page is resolved for the rendered locale in
// `loader` and passed through loader data. `meta` reads only `data` — it never
// imports the `.server` content module, which would fail the build.

import type { Route } from "./+types/$lang.education.registration-discrimination";
import { GuidePage } from "~/components/sections/guide-page";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import {
  DISCRIMINATION_AMHARIC_SUMMARY,
  DISCRIMINATION_BODY,
  DISCRIMINATION_SUBTITLE,
  DISCRIMINATION_TITLE,
  discriminationCopy,
  discriminationCrosslinks,
  discriminationFaq,
  discriminationResources,
  discriminationSources,
  discriminationSteps,
} from "~/lib/education/registration-discrimination.server";
import { registrationDiscriminationPath } from "~/lib/education/links";
import {
  breadcrumbJsonLd,
  educationArticleJsonLd,
  faqPageJsonLd,
} from "~/lib/education/schema";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

/**
 * First published — bump on substantive edits. Declared here rather than
 * imported from the content module: `meta` is not stripped from the client
 * bundle, so anything it reads must be client-safe (ADR-020 §4).
 */
const PUBLISHED_AT = "2026-08-31";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  return {
    locale,
    publicUrl: PUBLIC_URL,
    title: DISCRIMINATION_TITLE[locale],
    subtitle: DISCRIMINATION_SUBTITLE[locale],
    // The Amharic summary is deliberately the same text in every locale.
    summary: DISCRIMINATION_AMHARIC_SUMMARY,
    body: DISCRIMINATION_BODY[locale],
    steps: discriminationSteps(locale),
    faq: discriminationFaq(locale),
    resources: discriminationResources(locale),
    sources: discriminationSources(locale),
    crosslinks: discriminationCrosslinks(locale),
    summaryHeading: discriminationCopy("summaryHeading", locale),
    stepsHeading: discriminationCopy("stepsHeading", locale),
    bodyHeading: discriminationCopy("bodyHeading", locale),
    faqHeading: discriminationCopy("faqHeading", locale),
    crosslinkHeading: discriminationCopy("crosslinkHeading", locale),
    crosslinkBody: discriminationCopy("crosslinkBody", locale),
    resourcesHeading: discriminationCopy("resourcesHeading", locale),
    sourcesHeading: discriminationCopy("sourcesHeading", locale),
    websiteLabel: discriminationCopy("websiteLabel", locale),
    disclaimer: discriminationCopy("disclaimer", locale),
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, subtitle, faq, publicUrl } = data;
  const path = registrationDiscriminationPath();

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

export default function RegistrationDiscriminationPage({
  loaderData,
}: Route.ComponentProps) {
  const { locale } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader
        locale={locale}
        currentPath={`/${locale}${registrationDiscriminationPath()}`}
      />
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
