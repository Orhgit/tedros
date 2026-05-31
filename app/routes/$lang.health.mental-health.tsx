// /:lang/health/mental-health — Mental Health Hub (RIN-654).
// ERAN crisis line ABOVE the fold. Resources, cultural context, FAQPage JSON-LD.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.health.mental-health";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { healthPath } from "~/lib/health/links";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "~/lib/health/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

// ── FAQ content (3 locales, 4 questions) ────────────────────────────────────

const FAQ_CONTENT: Array<{
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}> = [
  {
    id: "what-is-eran",
    question: {
      he: "מה זה ERAN ואיך פועל הקו?",
      en: "What is ERAN and how does the crisis line work?",
      am: "ERAN ምንድን ነው?",
    },
    answer: {
      he: "ERAN (עמותת ער\"ן) הוא קו חירום לבריאות הנפש הזמין 24 שעות ביממה, 7 ימים בשבוע. מספר הטלפון: 1201. שיחות חינמיות ואנונימיות. ניתן לדבר גם בצ'אט בכתובת eran.org.il.",
      en: "ERAN is an emotional first-aid association providing a free, anonymous crisis line available 24/7. Phone: 1201. Chat also available at eran.org.il.",
      am: "ERAN 24/7 ነፃ እና ስም-አልባ የቀውስ መስመር ነው። ስልክ: 1201። eran.org.il ላይ ቻት ያገኛሉ።",
    },
  },
  {
    id: "amharic-therapist",
    question: {
      he: "כיצד מוצאים מטפל דובר אמהרית?",
      en: "How do I find an Amharic-speaking therapist?",
      am: "አማርኛ ተናጋሪ ሳይኮሎጂስት እንዴት ያገኛሉ?",
    },
    answer: {
      he: "נכון לעכשיו אין פסיכיאטרים דוברי אמהרית בישראל, אך ישנם פסיכולוגים ועובדים סוציאליים מהקהילה. שירות תנה בריאות יכול לסייע בחיבור למטפלים שמכירים את ההקשר התרבותי.",
      en: "There are currently no Amharic-speaking psychiatrists in Israel, but there are community psychologists and social workers. Tene Briut can help connect you with culturally aware practitioners.",
      am: "ምንም አማርኛ ተናጋሪ ሳይኪያትሪስቶች የሉም። ቴኔ ብሩት ባህሉን የሚያውቁ ሳይኮሎጂስቶች ሊያገናኝዎ ይችላሉ።",
    },
  },
  {
    id: "cultural-healers",
    question: {
      he: "מה תפקידם של מרפאים מסורתיים (דבטרה, בלאזאר)?",
      en: "What role do traditional healers (Debtera, Balezar) play?",
      am: "ባህላዊ ፈዋሾች (ደብተራ፣ ባለዛር) ምን ሚና አላቸው?",
    },
    answer: {
      he: "בתרבות האתיופית, דבטרה ובלאזאר מטפלים ב'ዛר' ובמצוקות רוחניות. מחקרים מראים שפנייה למרפאים מסורתיים עלולה לעכב טיפול רפואי. בריאות הנפש היא גם עניין רפואי — שני הגישות יכולות להתקיים ביחד.",
      en: "In Ethiopian culture, Debtera and Balezar practitioners treat 'Zar' and spiritual distress. Research shows traditional healer visits may delay medical treatment. Mental health is also a medical matter — both approaches can coexist.",
      am: "ደብተራ እና ባለዛር ዛርን እና ሌሎች ጭንቀቶችን ይፈውሳሉ። ሁለቱ አካሄዶች አብረው ሊኖሩ ይችላሉ፣ ግን የሕክምና ዕርዳታ አስፈላጊ ሊሆን ይችላል።",
    },
  },
  {
    id: "stigma",
    question: {
      he: "מה עושים כשהסטיגמה בבית מונעת פנייה לעזרה?",
      en: "What can I do when stigma at home prevents seeking help?",
      am: "ቤት ውስጥ ያለ stigma ዕርዳታ መፈለግ ሲያቆም ምን ላድርግ?",
    },
    answer: {
      he: "ניתן לפנות לERAN (1201) בצינעה לחלוטין — השיחות חסויות. ניתן גם להגיע ישירות לרופא משפחה ולדבר על מצוקה נפשית — הרופא מחויב לחיסיון. ארגון NATAL וElem מציעים פגישות וירטואליות.",
      en: "You can call ERAN (1201) completely privately — all calls are confidential. You can also speak directly with your family doctor about psychological distress — bound by confidentiality. NATAL and Elem offer virtual sessions.",
      am: "ERAN 1201 ሙሉ ሚስጥራዊ ነው። ሐኪምዎ ሚስጥር የመጠበቅ ግዴታ አለበት። NATAL እና Elem ምናባዊ ስብሰባዎችን ያቀርባሉ።",
    },
  },
];

// ── resources (3 organizations) ─────────────────────────────────────────────

const RESOURCES: Array<{
  name: string;
  url: string;
  description: Record<Locale, string>;
}> = [
  {
    name: "תנה בריאות / Tene Briut",
    url: "https://tene-briut.org.il",
    description: {
      he: "שירות תרגום ותמיכה קהילתית לנושאי בריאות — בעברית ובאמהרית.",
      en: "Translation and community support for health matters in Hebrew and Amharic.",
      am: "ለጤና ጉዳዮች የትርጉም እና ማህበረሰብ ድጋፍ — በዕብራይስጥ እና አማርኛ።",
    },
  },
  {
    name: "NATAL",
    url: "https://www.natal.org.il",
    description: {
      he: "ארגון ישראלי לטיפול בנפגעי מלחמה וטראומה — כולל ליווי לקהילות הנמצאות בסיכון.",
      en: "Israeli organization for trauma and war casualties — including support for at-risk communities.",
      am: "ለአደጋ ዳርቻ ማህበረሰቦች ድጋፍ የሚሰጥ የእስራኤል ድርጅት።",
    },
  },
  {
    name: "Elem",
    url: "https://www.elem.org.il",
    description: {
      he: "תמיכה בצעירים במצבי סיכון — כולל תוכניות ייעודיות לנוער מהקהילה.",
      en: "Support for at-risk youth — including dedicated programs for community young people.",
      am: "ለአደጋ ዳርቻ ወጣቶች ድጋፍ — ለማህበረሰብ ወጣቶች ፕሮግራሞችን ጨምሮ።",
    },
  },
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const faqs = FAQ_CONTENT.map((f) => ({
    id: f.id,
    question: f.question[locale],
    answer: f.answer[locale],
  }));

  const resources = RESOURCES.map((r) => ({
    name: r.name,
    url: r.url,
    description: r.description[locale],
  }));

  return { locale, faqs, resources, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, faqs, publicUrl } = data;
  const title = t(locale, "health_mental_health_title");
  const description = t(locale, "health_mental_health_subtitle");
  const _url = `${publicUrl}/${locale}/health/mental-health`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/health/mental-health"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: "/health/mental-health", name: title, description },
      ),
    },
    {
      "script:ld+json": faqJsonLd({ publicUrl, locale }, faqs),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "health_breadcrumb_home"), path: "/" },
        { name: t(locale, "health_breadcrumb_health"), path: "/health" },
        {
          name: t(locale, "health_mental_health_title"),
          path: "/health/mental-health",
        },
      ]),
    },
  ];
};

export default function MentalHealthHub({ loaderData }: Route.ComponentProps) {
  const { locale, faqs, resources } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        {/* HealthDisclaimer variant="mental-health" — ERAN above the fold */}
        <HealthDisclaimer locale={locale} variant="mental-health" />

        {/* Header */}
        <header className="relative mb-8 isolate overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "health_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${healthPath()}`} className="hover:underline">
              {t(locale, "health_breadcrumb_health")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {t(locale, "health_mental_health_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "health_mental_health_subtitle")}
          </p>
        </header>

        {/* Community stats */}
        <section className="mb-10" aria-labelledby="mh-stats-heading">
          <h2
            id="mh-stats-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "health_condition_figures_label")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                figure: locale === "he" ? "פי 2" : locale === "am" ? "2 እጥፍ" : "2×",
                label:
                  locale === "he"
                    ? "שיעור אשפוז פסיכיאטרי"
                    : locale === "am"
                      ? "ሆስፒታሎሽን ምጣኔ"
                      : "Psychiatric hospitalization",
              },
              {
                figure: locale === "he" ? "פי 4" : locale === "am" ? "4 እጥፍ" : "4×",
                label:
                  locale === "he"
                    ? "שיעור אובדנות (24.5 ל-100,000)"
                    : locale === "am"
                      ? "ራስን ማጥፋት (24.5/100,000)"
                      : "Suicide rate (24.5/100,000)",
              },
              {
                figure: "43%",
                label:
                  locale === "he"
                    ? "אמון במערכת הרפואית"
                    : locale === "am"
                      ? "በሥርዓቱ መተማመን"
                      : "Trust in health system",
              },
            ].map((stat) => (
              <li
                key={stat.label}
                className="rounded-xl border border-earth-200 bg-card p-4 text-center"
              >
                <p className="font-display text-3xl font-bold text-earth-800">
                  {stat.figure}
                </p>
                <p className="mt-1 text-sm text-ink-600">{stat.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Cultural context */}
        <section
          className="mb-10 rounded-2xl border border-earth-200 bg-card p-6"
          aria-labelledby="mh-culture-heading"
        >
          <h2
            id="mh-culture-heading"
            className="mb-3 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "הקשר תרבותי — למה הסטיגמה גבוהה יותר?"
              : locale === "am"
                ? "ባህላዊ ሁኔታ"
                : "Cultural context — why is stigma higher?"}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-ink-700">
            {locale === "he" ? (
              <>
                <p>
                  בתרבות האתיופית, מצוקה נפשית נתפסת לעיתים כגזרה רוחנית (Zar) — ולא כמחלה
                  שניתנת לטיפול רפואי. זה מוביל לפנייה למרפאים מסורתיים (דבטרה, בלאזאר)
                  לפני הפנייה למערכת הרפואית.
                </p>
                <p>
                  בנוסף, חשש מסטיגמה חברתית — שמישהו יחשוב שה&quot;משוגע&quot; — גורם
                  לאנשים רבים לשתוק ולא לפנות לעזרה. מחקרים מראים שה-43% אמון הוא מהנמוכים
                  בקרב כל הקבוצות האתניות בישראל.
                </p>
                <p>
                  החדשות הטובות: יש כיום פסיכולוגים ועובדים סוציאליים מהקהילה שמבינים את
                  ההקשר הזה — ופנייה לעזרה היא מעשה אומץ, לא חולשה.
                </p>
              </>
            ) : locale === "am" ? (
              <>
                <p>
                  በኢትዮጵያ ባህል፣ የአዕምሮ ጭንቀት አንዳንዴ እንደ ዛር (Zar) ይቆጠራል። ይህ ሰዎችን ከሐኪም ይልቅ ባህላዊ
                  ፈዋሾች (ደብተራ፣ ባለዛር) ዘንድ ሊልካቸው ይችላል።
                </p>
                <p>
                  43% ብቻ የሆኑ የማህበረሰብ አባላት የሕክምና ሥርዓቱ ሊረዳ ይችላል ብለው ያምናሉ። ዕርዳታ መፈለግ ጥንካሬ ነው።
                </p>
              </>
            ) : (
              <>
                <p>
                  In Ethiopian culture, psychological distress is sometimes seen as a
                  spiritual matter (Zar) rather than a medical condition. This can lead
                  people to seek traditional healers (Debtera, Balezar) before approaching
                  the medical system.
                </p>
                <p>
                  Additionally, fear of social stigma — being perceived as
                  &quot;crazy&quot; — causes many people to remain silent. Research shows
                  that 43% trust is among the lowest across all ethnic groups in Israel.
                </p>
                <p>
                  The good news: there are now community psychologists and social workers
                  who understand this context — and seeking help is an act of courage, not
                  weakness.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Practical access guide */}
        <section
          className="mb-10 rounded-2xl border border-earth-200 bg-card p-6"
          aria-labelledby="mh-access-heading"
        >
          <h2
            id="mh-access-heading"
            className="mb-3 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "איך מגיעים לטיפול — מדריך מעשי"
              : locale === "am"
                ? "ወደ ሕክምና ደረጃ በደረጃ"
                : "How to access treatment — practical guide"}
          </h2>
          <ol className="space-y-3 text-sm leading-relaxed text-ink-700">
            {(locale === "he"
              ? [
                  "פנו לרופא משפחה בקופת חולים ואמרו: 'אני מרגיש/ה במצוקה נפשית'. הרופא מחויב לחיסיון.",
                  "בקשו הפניה לפסיכולוג/ית קלינית — ניתן לקבל 6-12 פגישות ממומנות על-ידי קופת חולים.",
                  "ציינו שאתם מחפשים מטפל שמכיר את ההקשר התרבותי האתיופי — שירות תנה בריאות יכול להמליץ.",
                  "אם אין הפניה מיידית — תנה בריאות מספקת ליווי ועזרה בניווט במערכת.",
                ]
              : locale === "am"
                ? [
                    "ወደ ቤተሰብ ሐኪም ይሂዱ: 'የአዕምሮ ጭንቀት እያጋጠመኝ ነው' ይበሉ። ሐኪሙ ሚስጥር የመጠበቅ ግዴታ አለበት።",
                    "ለሳይኮሎጂስት ሪፈራ ይጠይቁ — 6-12 ስብሰባዎች ብዙ ጊዜ ይሸፈናሉ።",
                    "ቴኔ ብሩት ምክር ለማግኘትና ወደ ስርዓቱ ለመሄድ ሊረዳዎ ይችላሉ።",
                  ]
                : [
                    "See your family doctor at the health fund and say: 'I am experiencing psychological distress'. The doctor is bound by confidentiality.",
                    "Request a referral to a clinical psychologist — 6–12 funded sessions are usually available through the health fund.",
                    "Mention that you are looking for a therapist with Ethiopian cultural awareness — Tene Briut can recommend one.",
                    "If no referral is immediately available, Tene Briut provides support and help navigating the system.",
                  ]
            ).map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-earth-100 text-xs font-semibold text-earth-700">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Youth at-risk */}
        <section
          className="mb-10 rounded-2xl border border-amber-200 bg-amber-50/60 p-6"
          aria-labelledby="mh-youth-heading"
        >
          <h2
            id="mh-youth-heading"
            className="mb-3 font-display text-xl font-semibold text-amber-900"
          >
            {locale === "he"
              ? "נוער בסיכון — תמיכה מיוחדת"
              : locale === "am"
                ? "አደጋ ዳርቻ ወጣቶች"
                : "At-risk youth — dedicated support"}
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-ink-700">
            {locale === "he"
              ? "26.7% מהקהילה הם מתחת לגיל 14. נוער בין שתי תרבויות נחשף לסיכון גבוה יותר לדיכאון, אלימות ועזיבת ביה\"ס. ארגון Elem מציע תוכניות ייחודיות לנוער האתיופי."
              : locale === "am"
                ? "26.7% ከ14 ዓመት በታች ናቸው። Elem ለኢትዮጵያ ወጣቶች ፕሮግራሞችን ያቀርባሉ።"
                : "26.7% of the community is under 14. Youth navigating two cultures face higher rates of depression, violence, and school dropout. Elem offers dedicated programmes for Ethiopian youth."}
          </p>
          <ul className="space-y-2 text-sm text-ink-700">
            {(locale === "he"
              ? [
                  "Elem — תוכניות ייעוץ אישי לנוער מהקהילה (קיים ב-20+ ערים)",
                  "NATAL — ליווי לנפגעי טראומה בכל גיל",
                  "ער\"ן 1201 — גם נוער יכולים להתקשר (חסוי לחלוטין)",
                  "בתי ספר — יועצים בית-ספריים מוסמכים לזיהוי ילדים במצוקה",
                ]
              : locale === "am"
                ? [
                    "Elem — ለ20+ ከተሞች ግለሰባዊ ምክር",
                    "NATAL — ለሁሉም ዕድሜ አደጋ ዳርቻ ድጋፍ",
                    "ERAN 1201 — ወጣቶችም ሊደውሉ ይችላሉ (ሚስጥራዊ)",
                  ]
                : [
                    "Elem — personal counselling for community youth (available in 20+ cities)",
                    "NATAL — trauma support for all ages",
                    "ERAN 1201 — young people can call too (completely confidential)",
                    "Schools — school counsellors are trained to identify children in distress",
                  ]
            ).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span aria-hidden className="text-amber-600">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Resources */}
        <section className="mb-10" aria-labelledby="mh-resources-heading">
          <h2
            id="mh-resources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "ארגונים ומשאבים"
              : locale === "am"
                ? "ድርጅቶች እና ሀብቶች"
                : "Organizations and resources"}
          </h2>
          <ul className="space-y-4">
            {resources.map((r) => (
              <li key={r.name} className="rounded-xl border border-earth-200 bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {r.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-600">{r.description}</p>
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-md border border-earth-200 px-3 py-1.5 text-xs font-medium text-earth-700 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {locale === "he" ? "לאתר" : locale === "am" ? "ድህረ ገጽ" : "Website"} ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10" aria-labelledby="mh-faq-heading">
          <h2
            id="mh-faq-heading"
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
