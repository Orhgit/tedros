// /:lang/family/soldiers/lone-soldier — lone soldiers & struggling families
// (TED-142). Same shell and conventions as the detention guide.

import type { Route } from "./+types/$lang.family.soldiers.lone-soldier";
import { SoldiersGuide } from "~/components/sections/soldiers-guide";
import { getEnv } from "~/lib/env.server";
import {
  familySupportWizardPath,
  loneSoldierPath,
  soldierDetentionPath,
  soldiersPath,
} from "~/lib/family/links";
import {
  LONE_SOLDIER_AM_SUMMARY,
  LONE_SOLDIER_AM_SUMMARY_TITLE,
  LONE_SOLDIER_FAQS,
  LONE_SOLDIER_TOPIC,
} from "~/lib/family/lone-soldier.server";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webPageJsonLd,
} from "~/lib/family/schema";
import { LONE_SOLDIER_CHROME } from "~/lib/family/soldiers.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { formatDate } from "~/lib/i18n/format";
import { hreflangMeta } from "~/lib/i18n/hreflang";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1590332763336-4c1cf3b5f0e5?fm=webp&q=70&w=1200&fit=crop";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const topic = LONE_SOLDIER_TOPIC;
  const chrome = LONE_SOLDIER_CHROME[locale];

  const title = topic.title[locale] ?? topic.title.he;
  const subtitle = topic.subtitle[locale] ?? topic.subtitle.he;
  const body = topic.body[locale] ?? topic.body.he;

  const resources = topic.resources.map((r) => ({
    name: r.name,
    phone: r.phone,
    url: r.url,
    description: r.description[locale] ?? r.description.he,
  }));

  const faqs = LONE_SOLDIER_FAQS.map((f) => ({
    question: f.question[locale] ?? f.question.he,
    answer: f.answer[locale] ?? f.answer.he,
  }));

  const ctx = { publicUrl: PUBLIC_URL, locale };
  const path = loneSoldierPath();

  return {
    locale,
    publicUrl: PUBLIC_URL,
    title,
    subtitle,
    body,
    resources,
    faqs,
    chrome,
    amSummary: LONE_SOLDIER_AM_SUMMARY,
    amSummaryTitle: LONE_SOLDIER_AM_SUMMARY_TITLE,
    lastReviewedText: `${chrome.lastReviewedLabel}: ${formatDate(locale, topic.lastReviewed)}`,
    webPage: webPageJsonLd(ctx, { path, name: title, description: subtitle }),
    article: articleJsonLd(ctx, {
      path,
      headline: title,
      description: subtitle,
      datePublished: topic.lastReviewed,
      dateModified: topic.lastReviewed,
    }),
    faqPage: faqJsonLd(ctx, faqs),
    breadcrumb: breadcrumbJsonLd(ctx, [
      { name: chrome.breadcrumbHome, path: "/" },
      { name: chrome.breadcrumbParent, path: soldiersPath() },
      { name: title, path },
    ]),
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, title, subtitle, webPage, article, faqPage, breadcrumb } =
    data;
  const url = `${publicUrl}/${locale}${loneSoldierPath()}`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, loneSoldierPath()),
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: url },
    { "script:ld+json": webPage },
    { "script:ld+json": article },
    { "script:ld+json": faqPage },
    { "script:ld+json": breadcrumb },
  ];
};

export default function LoneSoldier({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    title,
    subtitle,
    body,
    resources,
    faqs,
    chrome,
    amSummary,
    amSummaryTitle,
    lastReviewedText,
  } = loaderData;

  return (
    <SoldiersGuide
      locale={locale}
      navPath={`/${locale}/family`}
      heroImage={HERO_IMAGE}
      title={title}
      subtitle={subtitle}
      body={body}
      breadcrumb={{
        homeLabel: chrome.breadcrumbHome,
        homeTo: `/${locale}`,
        parentLabel: chrome.breadcrumbParent,
        parentTo: `/${locale}${soldiersPath()}`,
      }}
      glanceTitle={chrome.glanceTitle}
      glanceItems={chrome.glanceItems}
      amSummaryTitle={amSummaryTitle}
      amSummary={amSummary}
      bodyHeading={chrome.bodyHeading}
      faqHeading={chrome.faqHeading}
      faqs={faqs}
      resourcesHeading={chrome.resourcesHeading}
      resources={resources}
      relatedHeading={chrome.relatedHeading}
      related={[
        {
          to: `/${locale}${soldierDetentionPath()}`,
          label: chrome.relatedDetention,
        },
        {
          to: `/${locale}${familySupportWizardPath()}`,
          label: chrome.relatedWizard,
        },
      ]}
      lastReviewedLabel={lastReviewedText}
      backLabel={chrome.backLabel}
      backTo={`/${locale}${soldiersPath()}`}
      promo={{
        lead: chrome.promoLead,
        cta: chrome.promoCta,
        to: `/${locale}${familySupportWizardPath()}`,
      }}
    />
  );
}
