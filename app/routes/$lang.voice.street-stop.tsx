// /:lang/voice/street-stop — "Stopped on the street? Your rights" (TED-137).
//
// Zooms into the street stop (עיכוב) itself, complementing
// /voice/police-conduct (the full stop→search→arrest→complaint arc) — the
// two pages cross-link both ways. Also cross-promotes the record-expungement
// wizard (/rights/criminal-record-expungement).
//
// Schema.org: WebPage + Article + FAQPage + BreadcrumbList.
// A full Amharic summary section renders in EVERY locale (TED-137).

import { Link } from "react-router";

import type { Route } from "./+types/$lang.voice.street-stop";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { formatDate } from "~/lib/i18n/format";
import { t } from "~/lib/i18n/messages";
import {
  voicePath,
  policeConductPath,
  racismReportPath,
  streetStopPath,
  expungementWizardPath,
} from "~/lib/voice/links";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  webPageJsonLd,
} from "~/lib/voice/schema";
import {
  STREET_STOP_TOPIC,
  STREET_STOP_FAQS,
  STREET_STOP_AM_SUMMARY,
  STREET_STOP_AM_SUMMARY_TITLE,
} from "~/lib/voice/street-stop.server";
import {
  topicTitle,
  topicSubtitle,
  topicBody,
  resourceDescription,
} from "~/lib/voice/topics.server";

const VOICE_HERO_IMG =
  "https://images.unsplash.com/photo-1764145144753-922ae256714b?fm=webp&q=70&w=1200&fit=crop";

// Section chrome authored per-locale on the server — keeping the two unused
// locales out of the client chunk (the 375 kB budget is already breached).
const CHROME = {
  he: {
    glanceTitle: "עיכוב — בקצרה",
    glanceItems: [
      "עיכוב אינו מעצר — והוא מותר רק כשיש יסוד סביר לחשד.",
      "השוטר חייב להזדהות ולהסביר את סיבת העיכוב.",
      "עיכוב מוגבל לשלוש שעות (בחריגים — עד שש).",
      "לתחנה — רק כשלא ניתן לברר במקום.",
      "אל תתנגדו פיזית; תעדו הכל: שם, תג, שעה, מקום, עדים.",
    ],
    promoLead: "נשאר לכם רישום מעיכוב או הפגנה? ",
    promoCta: "בדקו באשף מחיקת הרישום אם הוא נמחק אוטומטית לפי חוק 2024",
    stepsHeading: "הזכויות שלכם, צעד אחר צעד",
    faqHeading: "שאלות נפוצות",
  },
  en: {
    glanceTitle: "A street stop — at a glance",
    glanceItems: [
      "A stop is not an arrest — it is allowed only on reasonable suspicion.",
      "The officer must identify themselves and state the reason.",
      "A stop is capped at three hours (in exceptional cases — up to six).",
      "To the station — only when it cannot be clarified on the spot.",
      "Do not physically resist; document everything: name, badge, time, place, witnesses.",
    ],
    promoLead: "Left with a record from a stop or a protest? ",
    promoCta:
      "Check in the expungement wizard whether the 2024 law deletes it automatically",
    stepsHeading: "Your rights, step by step",
    faqHeading: "Frequently asked questions",
  },
  am: {
    glanceTitle: "ማቆም — በአጭሩ",
    glanceItems: [
      "ማቆም እስር አይደለም — የሚፈቀደው ምክንያታዊ ጥርጣሬ ሲኖር ብቻ ነው።",
      "ፖሊሱ ራሱን ማስተዋወቅ እና ምክንያቱን ማስረዳት አለበት።",
      "ማቆም በሦስት ሰዓታት የተገደበ ነው (በልዩ ሁኔታ — እስከ ስድስት)።",
      "ወደ ጣቢያ — በቦታው ሊጣራ በማይችልበት ጊዜ ብቻ።",
      "አካላዊ ተቃውሞ አያድርጉ፤ ሁሉንም ይመዝግቡ: ስም፣ መለያ፣ ሰዓት፣ ቦታ፣ ምስክሮች።",
    ],
    promoLead: "ከማቆም ወይም ከሰልፍ መዝገብ ቀርቶልዎታል? ",
    promoCta: "በ2024 ሕግ በራስ-ሰር እንደተሰረዘ በስረዛ አዋቂው ይመርምሩ",
    stepsHeading: "መብቶችዎ፣ ደረጃ በደረጃ",
    faqHeading: "ተደጋጋሚ ጥያቄዎች",
  },
} as const;

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const title = topicTitle(STREET_STOP_TOPIC, locale);
  const subtitle = topicSubtitle(STREET_STOP_TOPIC, locale);
  const body = topicBody(STREET_STOP_TOPIC, locale);

  const resources = STREET_STOP_TOPIC.resources.map((r) => ({
    name: r.name,
    phone: r.phone,
    url: r.url,
    description: resourceDescription(r, locale),
  }));

  const faqs = STREET_STOP_FAQS.map((f) => ({
    question: f.question[locale] ?? f.question.he,
    answer: f.answer[locale] ?? f.answer.he,
  }));

  const ctx = { publicUrl: PUBLIC_URL, locale };
  const webPage = webPageJsonLd(ctx, {
    path: streetStopPath(),
    name: title,
    description: subtitle,
  });
  const article = articleJsonLd(ctx, {
    path: streetStopPath(),
    headline: title,
    description: subtitle,
    dateModified: STREET_STOP_TOPIC.lastReviewed,
  });
  const faqPage = faqJsonLd(ctx, faqs);
  const breadcrumb = breadcrumbJsonLd(ctx, [
    { name: t(locale, "voice_breadcrumb_home"), path: "/" },
    { name: t(locale, "voice_breadcrumb_voice"), path: "/voice" },
    { name: title, path: streetStopPath() },
  ]);

  return {
    locale,
    publicUrl: PUBLIC_URL,
    title,
    subtitle,
    body,
    resources,
    faqs,
    chrome: CHROME[locale],
    amSummary: STREET_STOP_AM_SUMMARY,
    amSummaryTitle: STREET_STOP_AM_SUMMARY_TITLE,
    lastReviewed: STREET_STOP_TOPIC.lastReviewed,
    webPage,
    article,
    faqPage,
    breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, title, subtitle, webPage, article, faqPage, breadcrumb } =
    data;
  const url = `${publicUrl}/${locale}${streetStopPath()}`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, streetStopPath()),
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": webPage },
    { "script:ld+json": article },
    { "script:ld+json": faqPage },
    { "script:ld+json": breadcrumb },
  ];
};

export default function StreetStop({ loaderData }: Route.ComponentProps) {
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
    lastReviewed,
  } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/voice`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "voice_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${voicePath()}`} className="hover:underline">
            {t(locale, "voice_breadcrumb_voice")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        {/* Page header */}
        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src={VOICE_HERO_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* At a glance */}
        <section
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5"
          aria-labelledby="street-stop-glance-heading"
        >
          <h2
            id="street-stop-glance-heading"
            className="mb-3 font-display text-base font-semibold text-amber-900"
          >
            {chrome.glanceTitle}
          </h2>
          <ul className="space-y-1.5 text-sm text-amber-900">
            {chrome.glanceItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span aria-hidden className="mt-0.5 font-bold text-amber-700">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Full Amharic summary — rendered in every locale (TED-137) */}
        <section
          className="mb-8 rounded-xl border border-earth-300 bg-earth-50 p-5"
          aria-labelledby="street-stop-am-summary-heading"
          lang="am"
          dir="ltr"
        >
          <h2
            id="street-stop-am-summary-heading"
            className="mb-3 font-display text-base font-semibold text-earth-900"
          >
            {amSummaryTitle}
          </h2>
          <ul className="space-y-1.5 text-sm text-earth-900">
            {amSummary.map((line, i) => (
              <li key={i} className="flex items-start gap-2">
                <span aria-hidden className="mt-0.5 font-bold text-earth-700">
                  •
                </span>
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* Expungement wizard cross-promo */}
        <aside className="mb-8 rounded-xl border border-accent-green/30 bg-accent-green/5 p-5">
          <p className="text-sm font-semibold text-earth-900">
            {chrome.promoLead}
            <Link
              to={`/${locale}${expungementWizardPath()}`}
              className="underline underline-offset-2 hover:text-earth-700"
            >
              {chrome.promoCta}
            </Link>
          </p>
        </aside>

        {/* Body content */}
        <article className="mb-10 rounded-2xl border border-earth-200 bg-card p-6 sm:p-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-earth-900">
            {chrome.stepsHeading}
          </h2>
          <div className="space-y-4">
            {body.split("\n\n").map((para, idx) => {
              const trimmed = para.trim();
              if (trimmed.startsWith("> ")) {
                return (
                  <p
                    key={idx}
                    className="border-s-4 border-earth-300 ps-3 text-xs leading-relaxed text-ink-500"
                  >
                    {trimmed.replace(/^>\s*/, "").replace(/\*\*/g, "")}
                  </p>
                );
              }
              const boldMatch = trimmed.match(/^\*\*(.+?)\*\*(.*)$/s);
              if (boldMatch) {
                return (
                  <p key={idx} className="text-sm leading-relaxed text-ink-700">
                    <strong className="font-semibold text-earth-900">
                      {boldMatch[1]}
                    </strong>
                    {boldMatch[2]}
                  </p>
                );
              }
              return (
                <p key={idx} className="text-sm leading-relaxed text-ink-700">
                  {trimmed}
                </p>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-ink-500">
            {t(locale, "voice_last_reviewed_label")}: {formatDate(locale, lastReviewed)}
          </p>
        </article>

        {/* FAQ */}
        <section className="mb-10" aria-labelledby="street-stop-faq-heading">
          <h2
            id="street-stop-faq-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {chrome.faqHeading}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-earth-200 bg-card p-5"
              >
                <summary className="cursor-pointer list-none font-display text-base font-semibold text-earth-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-10" aria-labelledby="street-stop-resources-heading">
          <h2
            id="street-stop-resources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "voice_resources_heading")}
          </h2>
          <ul className="space-y-4">
            {resources.map((resource) => (
              <li
                key={resource.name}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {resource.name}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{resource.description}</p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {resource.phone && (
                    <a
                      href={`tel:${resource.phone.replace(/-/g, "")}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-earth-700 hover:underline"
                    >
                      <span aria-hidden="true">📞</span>
                      {resource.phone}
                    </a>
                  )}
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-earth-700 hover:underline"
                    >
                      {resource.url.replace(/^https?:\/\//, "")}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Related guides */}
        <section className="mb-10" aria-labelledby="street-stop-related-heading">
          <h2
            id="street-stop-related-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "voice_related_heading")}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li>
              <Link
                to={`/${locale}${policeConductPath()}`}
                className="block h-full rounded-xl border border-earth-200 bg-card p-4 text-sm font-medium text-earth-900 transition hover:border-earth-400"
              >
                {t(locale, "voice_police_title")}
              </Link>
            </li>
            <li>
              <Link
                to={`/${locale}${racismReportPath()}`}
                className="block h-full rounded-xl border border-earth-200 bg-card p-4 text-sm font-medium text-earth-900 transition hover:border-earth-400"
              >
                {t(locale, "voice_racism_title")}
              </Link>
            </li>
          </ul>
        </section>

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${voicePath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "voice_back_to_hub")}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
