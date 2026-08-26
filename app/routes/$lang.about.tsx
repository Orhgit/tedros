// /:lang/about — About Tedros (Phase 3 polish).
//
// Tells visitors what the project is, the thesis behind the 3-layer model
// (Read / Do / Connect), and where to find the open code + research. Static
// page — content is locale-switched inline rather than via t() keys, since
// the copy is unique to this single page and would otherwise bloat the
// global messages dictionary.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.about";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL };
}

const COPY: Record<
  Locale,
  {
    title: string;
    kicker: string;
    intro: string;
    threeLayers: { heading: string; read: string; do_: string; connect: string };
    openSourceHeading: string;
    openSourceBody: string;
    openSourceCta: string;
    sourcesHeading: string;
    sourcesBody: string;
    sourcesCta: string;
    rightsCta: string;
    realestateCta: string;
    homeBreadcrumb: string;
  }
> = {
  he: {
    title: "אודות טדרוס",
    kicker: "פלטפורמה",
    intro:
      "טדרוס הוא פורטל קהילתי מקיף ליוצאי אתיופיה בישראל. הפרויקט מאגד מידע, זכויות ושירותים שכבר קיימים — ומתרגם אותם לעברית, אנגלית ואמהרית — כדי להפוך קריאה לפעולה. לא רק לדעת — לקבל. לא רק לבקש — לקבל בחזרה.",
    threeLayers: {
      heading: "שלוש שכבות בכל פילר",
      read: "קריאה — תוכן מובנה ב-SEO תלת-לשוני, יותר שימושי לעמוד מאשר ויקיפדיה.",
      do_: "פעולה — אשפי זכאות, טפסי הגשה, ניתוב לתלונה רשמית. פותרים את מס-הביורוקרטיה-בעברית שהקהילה משלמת בעודף.",
      connect:
        "חיבור — אנשי מקצוע מבוקרים, מנטורים, קבוצות תמיכה, קייסים ומוסדות קהילתיים.",
    },
    openSourceHeading: "פרויקט פתוח",
    openSourceBody:
      "כל הקוד, ה-ADRs (החלטות אדריכלות), והמחקר הקהילתי גלויים ב-GitHub. הפרויקט בנוי כשרשרת פתוחה כדי שיוכל לשמש מודל לפרויקטים דומים בקהילות אחרות.",
    openSourceCta: "ראו את הקוד ב-GitHub",
    sourcesHeading: "איך אנחנו מאמתים עובדות",
    sourcesBody:
      "כל נתון בטדרוס מגובה במקור ראשוני — גופי ממשלה (gov.il), הלשכה המרכזית לסטטיסטיקה, ביטוח לאומי וכדומה. אנחנו לא מפרסמים הערכות או נתונים לא מאומתים על הקהילה. תהליך המחקר, כולל המקורות שנבדקו ונפסלו בגלל חוסר עיגון עובדתי, מתועד בפומבי.",
    sourcesCta: "מסמכי המחקר ב-GitHub",
    rightsCta: "מדריך הזכויות",
    realestateCta: 'פילר נדל"ן',
    homeBreadcrumb: "בית",
  },
  en: {
    title: "About Tedros",
    kicker: "Platform",
    intro:
      "Tedros is a comprehensive community portal for Ethiopian-Israelis. It aggregates information, rights, and services that already exist — translates them into Hebrew, English, and Amharic — and turns reading into doing. Not just to know — to receive. Not just to ask — to receive back.",
    threeLayers: {
      heading: "Three layers per pillar",
      read: "Read — programmatic, tri-lingual SEO content. More useful per page than encyclopedic alternatives.",
      do_: "Do — eligibility wizards, application forms, complaint routing. Solves the Hebrew-bureaucracy-tax the community pays disproportionately.",
      connect:
        "Connect — vetted professionals, mentors, support groups, kessim, and community institutions.",
    },
    openSourceHeading: "Open source",
    openSourceBody:
      "All the code, ADRs (architecture decisions), and community research live on GitHub. The project is built in the open so it can serve as a model for similar community-portal projects.",
    openSourceCta: "View the source on GitHub",
    sourcesHeading: "How we verify facts",
    sourcesBody:
      "Every figure on Tedros is backed by a primary source — government bodies (gov.il), the Central Bureau of Statistics, the National Insurance Institute, and similar authorities. We don't publish estimates or unverified statistics about the community. The research process, including sources that were checked and rejected for lacking a documented factual anchor, is publicly recorded.",
    sourcesCta: "Research documents on GitHub",
    rightsCta: "Rights catalog",
    realestateCta: "Real Estate pillar",
    homeBreadcrumb: "Home",
  },
  am: {
    title: "ስለ Tedros",
    kicker: "መድረክ",
    intro:
      "Tedros ለኢትዮጵያዊ-እስራኤላውያን ሰፊ የማህበረሰብ ፖርታል ነው። አስቀድሞ ያሉ መረጃዎችን፣ መብቶችን እና አገልግሎቶችን ይሰበስባል — በዕብራይስጥ፣ በእንግሊዝኛ እና በአማርኛ ይተረጉማል — እና ማንበብን ወደ ድርጊት ይቀይራል። ማወቅ ብቻ ሳይሆን — መቀበል። መጠየቅ ብቻ ሳይሆን — መልሶ መቀበል።",
    threeLayers: {
      heading: "በእያንዳንዱ ምሰሶ ሦስት ሽፋኖች",
      read: "ማንበብ — በሦስት ቋንቋዎች የተዋቀረ የ SEO ይዘት።",
      do_: "ማድረግ — የብቁነት አስታማቾች፣ የማመልከቻ ቅጾች፣ የቅሬታ መንገድ።",
      connect: "መገናኘት — የተረጋገጡ ባለሙያዎች፣ አማካሪዎች፣ የድጋፍ ቡድኖች፣ ቄሶች እና የማህበረሰብ ተቋማት።",
    },
    openSourceHeading: "ክፍት ምንጭ",
    openSourceBody:
      "ሁሉም ኮድ፣ ADR ዎች (የስነ-ህንፃ ውሳኔዎች) እና የማህበረሰብ ምርምር በ GitHub ላይ ናቸው። ፕሮጀክቱ በግልፅ የተገነባ ነው።",
    openSourceCta: "ኮዱን በ GitHub ይመልከቱ",
    sourcesHeading: "እውነታዎችን እንዴት እናረጋግጣለን",
    sourcesBody:
      "በ Tedros ላይ ያለ እያንዳንዱ መረጃ ከመንግስት አካላት (gov.il)፣ ከማዕከላዊ የስታቲስቲክስ ቢሮ እና ከመሳሰሉት ኦፊሴላዊ ምንጮች የተረጋገጠ ነው። ስለ ማህበረሰቡ ያልተረጋገጡ ግምቶችን አናወጣም።",
    sourcesCta: "የምርምር ሰነዶች በ GitHub",
    rightsCta: "የመብቶች ካታሎግ",
    realestateCta: "የሪል እስቴት ምሰሶ",
    homeBreadcrumb: "መነሻ",
  },
};

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  const c = COPY[locale];
  return [
    { title: `${c.title} — Tedros` },
    { name: "description", content: c.intro },
    ...hreflangMeta(publicUrl, locale, "/about"),
    { property: "og:title", content: c.title },
    { property: "og:description", content: c.intro },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${publicUrl}/#organization`,
        name: "Tedros",
        url: publicUrl,
        logo: `${publicUrl}/logo.png`,
        description:
          locale === "he"
            ? 'פורטל קהילתי מקיף ליוצאי אתיופיה בישראל — זכויות, קריירה, בריאות, נדל"ן, קהילה.'
            : locale === "am"
              ? "ለኢትዮጵያ-እስራኤላውያን ሁሉን አቀፍ ማህበረሰብ ፖርታል — መብቶች፣ ሥራ፣ ጤና፣ ሪል እስቴት።"
              : "Comprehensive community portal for Ethiopian-Israelis — rights, careers, health, real-estate.",
        foundingDate: "2026",
        areaServed: { "@type": "Country", name: "Israel" },
        audience: {
          "@type": "Audience",
          audienceType:
            locale === "he" ? "יוצאי אתיופיה בישראל" : "Ethiopian-Israeli community",
        },
        inLanguage: ["he", "en", "am"],
        sameAs: ["https://github.com/Orhgit/tedros"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@tedros.co.il",
          availableLanguage: ["Hebrew", "English", "Amharic"],
        },
      },
    },
  ];
};

export default function AboutPage({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const c = COPY[locale];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/about`} />
      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Hero */}
        <header className="mb-10 overflow-hidden rounded-2xl border border-earth-200 px-6 py-10 sm:px-10 sm:py-14">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {c.homeBreadcrumb}
            </Link>
          </p>
          <p className="mt-3 text-sm font-medium tracking-wide text-earth-600 uppercase">
            {c.kicker}
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">{c.intro}</p>
        </header>

        {/* Three-layer model */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900 sm:text-3xl">
            {c.threeLayers.heading}
          </h2>
          <ul className="mt-6 space-y-4 text-ink-700">
            <li className="border-s-4 border-accent-green ps-4 leading-relaxed">
              {c.threeLayers.read}
            </li>
            <li className="border-s-4 border-accent-yellow ps-4 leading-relaxed">
              {c.threeLayers.do_}
            </li>
            <li className="border-s-4 border-accent-red ps-4 leading-relaxed">
              {c.threeLayers.connect}
            </li>
          </ul>
        </section>

        {/* Open source */}
        <section className="mb-12 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900">
            {c.openSourceHeading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {c.openSourceBody}
          </p>
          <a
            href="https://github.com/Orhgit/tedros"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700"
          >
            <span aria-hidden="true">↗</span>
            {c.openSourceCta}
          </a>
        </section>

        {/* Sources & methodology */}
        <section className="mb-12 rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900">
            {c.sourcesHeading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-700">{c.sourcesBody}</p>
          <a
            href="https://github.com/Orhgit/tedros/tree/main/docs/research"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700"
          >
            <span aria-hidden="true">↗</span>
            {c.sourcesCta}
          </a>
        </section>

        {/* CTAs to live pillars */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to={`/${locale}/rights`}
            className="flex items-center justify-between rounded-lg border-2 border-earth-300 bg-card px-5 py-4 transition hover:border-earth-500 hover:bg-earth-50"
          >
            <span className="font-display text-lg font-semibold text-earth-900">
              {c.rightsCta}
            </span>
            <span aria-hidden="true" className="icon-flip inline-block text-earth-700">
              →
            </span>
          </Link>
          <Link
            to={`/${locale}/cities`}
            className="flex items-center justify-between rounded-lg border-2 border-earth-300 bg-card px-5 py-4 transition hover:border-earth-500 hover:bg-earth-50"
          >
            <span className="font-display text-lg font-semibold text-earth-900">
              {c.realestateCta}
            </span>
            <span aria-hidden="true" className="icon-flip inline-block text-earth-700">
              →
            </span>
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
