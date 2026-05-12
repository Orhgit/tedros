// /:lang/health/traditional-medicine — Traditional Medicine Hub (RIN-658).
//
// Lists 5 Ethiopian traditional practices with safety-level badges
// (green=complementary, amber=consult-doctor, red=caution).
// Includes cultural sensitivity note, FAQPage JSON-LD, BreadcrumbList.
//
// Schema.org: FAQPage + BreadcrumbList — both computed in loader (server only).
// YMYL: HealthDisclaimer variant="standard" on every render.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.health.traditional-medicine";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import {
  TRADITIONAL_PRACTICES,
  practiceName,
  practiceDescription,
  practiceBody,
  type SafetyLevel,
} from "~/lib/health/traditional-medicine.server";
import { breadcrumbJsonLd, faqJsonLd } from "~/lib/health/schema";
import type { JsonLd } from "~/lib/health/schema";
import { healthPath, traditionalMedicinePath } from "~/lib/health/links";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

// ── Safety badge helpers ─────────────────────────────────────────────────────

function safetyLabel(locale: Locale, level: SafetyLevel): string {
  const map: Record<SafetyLevel, Record<Locale, string>> = {
    complementary: {
      he: t(locale, "health_traditional_medicine_safety_complementary"),
      en: t(locale, "health_traditional_medicine_safety_complementary"),
      am: t(locale, "health_traditional_medicine_safety_complementary"),
    },
    "consult-doctor": {
      he: t(locale, "health_traditional_medicine_safety_consult"),
      en: t(locale, "health_traditional_medicine_safety_consult"),
      am: t(locale, "health_traditional_medicine_safety_consult"),
    },
    caution: {
      he: t(locale, "health_traditional_medicine_safety_caution"),
      en: t(locale, "health_traditional_medicine_safety_caution"),
      am: t(locale, "health_traditional_medicine_safety_caution"),
    },
  };
  return map[level][locale];
}

function safetyBadgeClass(level: SafetyLevel): string {
  switch (level) {
    case "complementary":
      return "bg-green-100 text-green-800 border border-green-300";
    case "consult-doctor":
      return "bg-amber-100 text-amber-800 border border-amber-300";
    case "caution":
      return "bg-red-100 text-red-800 border border-red-300";
  }
}

// ── FAQ content for JSON-LD (3 questions) ────────────────────────────────────

const FAQ_CONTENT: Array<{
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}> = [
  {
    id: "what-is-debtera",
    question: {
      he: "מהו דבטרה ומה תפקידו?",
      en: "What is a Debtera and what is their role?",
      am: "ደብተራ ምንድን ነው?",
    },
    answer: {
      he: "הדבטרה הוא דמות דתית-תרבותית אתיופית שמטפלת במצוקות רוחניות, רגשיות, ותרבותיות. הוא משמש כגשר בין הקהילה לעולם הרוחני. הפנייה לדבטרה יכולה להיות חלק מהתמיכה התרבותית, אך לא תחליף לטיפול רפואי.",
      en: "A Debtera is an Ethiopian religious-cultural figure who addresses spiritual, emotional, and cultural distress. They serve as a bridge between the community and the spiritual world. Consulting a Debtera can be part of cultural support, but is not a substitute for medical care.",
      am: "ደብተራ ሃይማኖታዊ-ባህላዊ ሰው ሲሆን መንፈሳዊ እና ስሜታዊ ጭንቀቶችን ይፈታል። ሐኪምን መተካት አይቻልም።",
    },
  },
  {
    id: "are-herbal-remedies-safe",
    question: {
      he: "האם תרופות צמחיות אתיופיות בטוחות?",
      en: "Are Ethiopian herbal remedies safe?",
      am: "የኢትዮጵያ ቅጠላ ቅጠሎች ደህንነታቸው ያለው ናቸው?",
    },
    answer: {
      he: "תרופות צמחיות רבות בשימוש בקהילה, אך הסכנה המרכזית היא תגובות בין-תרופות עם תרופות מרשם. אם אתם נוטלים תרופות קבועות, הכרחי לספר לרופא על כל צמח מרפא שאתם לוקחים לפני שינוי.",
      en: "Many herbal remedies are used in the community, but the main risk is drug-herb interactions with prescription medications. If you take regular medications, it is essential to tell your doctor about any herbal preparation you are taking before making changes.",
      am: "ዋናው አደጋ ከሌሎች መድሃኒቶች ጋር ያለ ተጋድሎ ነው። ሐኪምዎን ቅጠላ ቅጠሎቹ ስለ ወሰዱ ያሳውቁ።",
    },
  },
  {
    id: "what-is-zar",
    question: {
      he: "מהו טקס הזאר?",
      en: "What is the Zar ceremony?",
      am: "ዛር ሥርዓት ምንድን ነው?",
    },
    answer: {
      he: "טקס הזאר הוא ריטואל ריפוי קהילתי אתיופי לטיפול בסבל רוחני ובמצוקות נפשיות. הסכנה הרפואית: סימפטומים פסיכוטיים כמו שמיעת קולות עלולים להתפרש כ'רוחות זאר' ולא לקבל טיפול רפואי הכרחי. אם בן משפחה מגלה ביטויים חריגים — פנו לרופא בהקדם.",
      en: "The Zar ceremony is an Ethiopian community healing ritual for spiritual suffering and mental distress. The medical risk: psychotic symptoms such as hearing voices may be interpreted as 'Zar spirits' and not receive necessary medical treatment. If a family member shows unusual behavior, seek medical evaluation promptly.",
      am: "ዛር ሥርዓት ሥነ-አዕምሮ ጭንቀቶች ለፈወስ ባህላዊ ሥርዓት ነው። ሳይኮሲስ ምልክቶች እንደ ዛር ሊተረጎሙ ይችላሉ — ሐኪምዎን ያናግሩ።",
    },
  },
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const practices = TRADITIONAL_PRACTICES.map((p) => ({
    slug: p.slug,
    name: practiceName(p, locale),
    description: practiceDescription(p, locale),
    body: practiceBody(p, locale),
    safetyLevel: p.safetyLevel,
    lastReviewed: p.lastReviewed,
  }));

  const faqs = FAQ_CONTENT.map((f) => ({
    id: f.id,
    question: f.question[locale],
    answer: f.answer[locale],
  }));

  const title = t(locale, "health_traditional_medicine_title");
  const description = t(locale, "health_traditional_medicine_subtitle");

  const faqSchema: JsonLd = faqJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    faqs.map((f) => ({ question: f.question, answer: f.answer })),
  );

  const breadcrumb: JsonLd = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "health_breadcrumb_home"), path: "/" },
    { name: t(locale, "health_breadcrumb_health"), path: "/health" },
    { name: title, path: traditionalMedicinePath() },
  ]);

  return {
    locale,
    practices,
    faqs,
    title,
    description,
    publicUrl: PUBLIC_URL,
    faqSchema,
    breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, description, publicUrl, faqSchema, breadcrumb } = data;
  const url = `${publicUrl}/${locale}${traditionalMedicinePath()}`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": faqSchema },
    { "script:ld+json": breadcrumb },
  ];
};

export default function TraditionalMedicineHub({ loaderData }: Route.ComponentProps) {
  const { locale, practices, faqs } = loaderData;
  const title = t(locale, "health_traditional_medicine_title");
  const subtitle = t(locale, "health_traditional_medicine_subtitle");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "health_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${healthPath()}`} className="hover:underline">
            {t(locale, "health_breadcrumb_health")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        {/* Page header */}
        <header className="relative mb-8 overflow-hidden rounded-2xl border border-earth-200 bg-card p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.15]"
            loading="lazy"
            decoding="async"
          />
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* YMYL Disclaimer */}
        <HealthDisclaimer locale={locale} variant="standard" />

        {/* Cultural sensitivity note */}
        <section
          className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-5"
          aria-labelledby="cultural-note-heading"
        >
          <h2
            id="cultural-note-heading"
            className="mb-2 font-display text-base font-semibold text-blue-900"
          >
            {locale === "he"
              ? "הערה תרבותית"
              : locale === "am"
                ? "ባህላዊ ማስታወሻ"
                : "Cultural note"}
          </h2>
          <p className="text-sm leading-relaxed text-blue-800">
            {t(locale, "health_traditional_medicine_cultural_note")}
          </p>
        </section>

        {/* Practices list */}
        <section aria-labelledby="practices-heading" className="mb-10">
          <h2
            id="practices-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "פרקטיקות מסורתיות"
              : locale === "am"
                ? "ባህላዊ ሕክምናዎች"
                : "Traditional practices"}
          </h2>

          <ul className="space-y-6">
            {practices.map((practice) => (
              <li
                key={practice.slug}
                id={practice.slug}
                className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-earth-900">
                    {practice.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${safetyBadgeClass(practice.safetyLevel)}`}
                  >
                    {safetyLabel(locale, practice.safetyLevel)}
                  </span>
                </div>

                <p className="mb-3 text-sm font-medium text-ink-600">
                  {practice.description}
                </p>

                <div className="space-y-3">
                  {practice.body.split("\n\n").map((para, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-ink-700">
                      {para.trim()}
                    </p>
                  ))}
                </div>

                <p className="mt-4 text-xs text-ink-500">
                  {t(locale, "health_condition_last_reviewed_label")}:{" "}
                  {practice.lastReviewed}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Safety legend */}
        <section
          className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
          aria-labelledby="safety-legend-heading"
        >
          <h2
            id="safety-legend-heading"
            className="mb-3 font-display text-base font-semibold text-earth-900"
          >
            {locale === "he"
              ? "מדריך רמות בטיחות"
              : locale === "am"
                ? "የደህንነት ደረጃ ምሩ"
                : "Safety level guide"}
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <span className="rounded-full border border-green-300 bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800">
                {t(locale, "health_traditional_medicine_safety_complementary")}
              </span>
              <span className="text-ink-700">
                {locale === "he"
                  ? "ניתן לשלב עם טיפול רפואי; אין ראיות לנזק"
                  : locale === "am"
                    ? "ሕክምና ጋር ሊሰጥ ይቻላል"
                    : "Can be used alongside medical care; no evidence of harm"}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-800">
                {t(locale, "health_traditional_medicine_safety_consult")}
              </span>
              <span className="text-ink-700">
                {locale === "he"
                  ? "התייעצו עם רופא לפני ו/או בזמן שימוש"
                  : locale === "am"
                    ? "ሐኪምዎን አስቀድሞ ያናግሩ"
                    : "Consult your doctor before and/or during use"}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="rounded-full border border-red-300 bg-red-100 px-3 py-0.5 text-xs font-semibold text-red-800">
                {t(locale, "health_traditional_medicine_safety_caution")}
              </span>
              <span className="text-ink-700">
                {locale === "he"
                  ? "הפנייה לרפואה מודרנית היא עדיפות ראשונה"
                  : locale === "am"
                    ? "ሐኪም ቤት ቅዱሞ ሂዱ"
                    : "Seeking modern medical care is the first priority"}
              </span>
            </li>
          </ul>
        </section>

        {/* FAQ section */}
        <section className="mb-10" aria-labelledby="trad-faq-heading">
          <h2
            id="trad-faq-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "שאלות נפוצות"
              : locale === "am"
                ? "ተደጋጋሚ ጥያቄዎች"
                : "Frequently asked questions"}
          </h2>
          <ul className="space-y-4">
            {faqs.map((faq) => (
              <li key={faq.id} className="rounded-xl border border-earth-200 bg-card p-5">
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${healthPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "health_back_to_hub")}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
