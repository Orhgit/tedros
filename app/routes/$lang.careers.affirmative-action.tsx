// /:lang/careers/affirmative-action — Order-50 / civil-service representation
// explainer (RIN-472). One page per locale = 3 SEO URLs. Captures the head
// query "ייצוג הולם בשירות הציבורי" + Order-50 long-tail.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.careers.affirmative-action";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { breadcrumbJsonLd } from "~/lib/careers/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

const BODIES: Record<Locale, string> = {
  he: `## TL;DR

צו נציבות שירות המדינה ("צו 50") מחייב ייצוג הולם של בני קהילת יוצאי אתיופיה במשרות שירות המדינה. שיעור היעד נכון להיום: 2.5% מהמועמדים הכלליים — והיישום בפועל עומד על ~1.7% (דוח מבקר המדינה 2023). פנייה ל-flag צו-50 בעת הגשת מועמדות יכולה להפוך מועמדים שווי-שורה לזוכי-תפקיד.

## מה זה צו 50

נציבות שירות המדינה הוקמה ב-1953 וצו 50 (1981) הוא ה-amendment שמרחיב את עקרון השוויון להעדפה מתקנת לקבוצות מיעוטים — ובכלל זה יוצאי אתיופיה (תיקון 11 משנת 2000). הוא חל על:

- **משרדי ממשלה** (כל המשרדים, נציבויות, רשויות)
- **רשויות מקומיות** (עיריות, מועצות, איגודים)
- **תאגידים סטטוטוריים** (ביטוח לאומי, רשות המיסים, וכו')
- **חברות בבעלות מדינה** (חברת חשמל, רכבת ישראל)

## הוראות חוק רלוונטיות

- חוק שירות המדינה (מינויים), §15A — חובת ייצוג הולם של מיעוטים
- חוק שיוויון הזדמנויות בעבודה, §2 — איסור הפליה (פרטי + ציבורי)
- צו נציבות שירות המדינה 50 (תיקון 2000) — היישום הספציפי לקהילה האתיופית

## למי זה רלוונטי

כל אזרח/ית ישראלי/ת ממוצא אתיופי — כולל דור 1, 2 ו-3. הזכאות נקבעת על-בסיס זיהוי-עצמי בעת הגשת מועמדות. לא צריך להוכיח גנאלוגיה. ראו [ייצוג הולם בשירות הציבורי — זכות](/he/rights/public-sector-representation).

## איך מממשים — צעד אחר צעד

1. **בדיקת זכאות**: פנו לדף [ייצוג הולם בשירות הציבורי](/he/rights/public-sector-representation) להבין את הזכאות הספציפית.
2. **הגשת מועמדות**: בעת הגשה למשרה ציבורית — סמנו את ה-flag "ייצוג הולם / צו 50" בטופס. השדה הזה הוא לעיתים opt-in נסתר; אם אינכם רואים אותו, פנו לאחראית גיוס.
3. **שמירה על תיעוד**: שמרו עותק של ההגשה כולל הסימון. בערעור על דחייה זה הראיה המרכזית.
4. **ערעור אם נדחית**: דרך [טבקה (Tebeka)](/he/orgs/tebeka) — מקרי discrimination מתועדים, ייעוץ משפטי חינמי לקהילה.

## סטטיסטיקות יישום

- שיעור ייצוג נוכחי: **1.7%** (יעד: 2.5% עד 2027)
- 70% מהמשרדים הממשלתיים מתחת ל-1.5%
- ביצועים טובים יותר במשרד הקליטה (5.1%) ובמשרד החינוך (3.2%) — שניהם מעל היעד

## ארגונים שעוזרים

- [טבקה (Tebeka)](/he/orgs/tebeka) — ייצוג משפטי בערעורים + תיקי discrimination
- [ENP](/he/orgs/enp) — הכוונה לתפקידים פנויים בשירות הציבורי
- נציבות שירות המדינה — בקרה על יישום הצו

## מסלולי כניסה ייעודיים

- [עתידים אקדמי](/he/careers/programs/atidim-academic) — תואר ראשון/שני + 3 שנות שירות מובטחות
- [עתידים צה"לי](/he/careers/programs/atidim-military) — צה"ל → שירות ציבורי
- [שירות ציבורי — Track](/he/careers/public-sector) — סקירה מלאה

## ראו גם

- [תעסוקה וקריירה — Careers Hub](/he/careers)
- [ייצוג הולם בשירות הציבורי — זכות](/he/rights/public-sector-representation)`,
  en: `## TL;DR

The Civil Service Commission Order ("Order 50") mandates affirmative representation of Ethiopian-Israelis in state-service roles. Current target: 2.5% of all candidates — actual implementation is ~1.7% (State Comptroller 2023 report). Flagging "Order 50 / affirmative action" when applying can turn equivalently-ranked candidates into job winners.

## What is Order 50

The Civil Service Commission was established in 1953, and Order 50 (1981) is the amendment that extends the equality principle into affirmative preference for minority groups — including Ethiopian-Israelis (amendment 11, 2000). It applies to:

- **Government ministries** (all ministries, commissions, authorities)
- **Local authorities** (municipalities, councils, regional unions)
- **Statutory corporations** (Bituach Leumi, Tax Authority, etc.)
- **State-owned companies** (Israel Electric, Israel Railways)

## Relevant statutes

- Civil Service Law (Appointments), §15A — affirmative representation of minorities
- Equal Employment Opportunities Law, §2 — prohibition of discrimination (private + public)
- Civil Service Commission Order 50 (2000 amendment) — community-specific implementation

## Who is eligible

Any Israeli citizen of Ethiopian descent — including 1st, 2nd, and 3rd generation. Eligibility is determined by self-identification at time of application. You don't need to prove genealogy. See [Affirmative-action public-sector — right](/en/rights/public-sector-representation).

## How to claim it — step by step

1. **Verify eligibility**: visit [Affirmative-action public-sector](/en/rights/public-sector-representation) to understand the specific eligibility.
2. **Submit application**: when applying to a public-sector role — flag "Affirmative representation / Order 50" on the form. This field is often opt-in and hidden; if you don't see it, ask the recruiter.
3. **Keep documentation**: save a copy of the application including the flag. In an appeal, this is the central evidence.
4. **Appeal a rejection**: via [Tebeka](/en/orgs/tebeka) — documented discrimination cases, free legal counsel for the community.

## Implementation statistics

- Current representation rate: **1.7%** (target: 2.5% by 2027)
- 70% of government ministries are below 1.5%
- Better performance at the Aliyah Ministry (5.1%) and Education Ministry (3.2%) — both above target

## Organizations that help

- [Tebeka](/en/orgs/tebeka) — legal representation in appeals + discrimination cases
- [ENP](/en/orgs/enp) — placement guidance into civil-service openings
- Civil Service Commission — implementation oversight

## Dedicated entry tracks

- [Atidim Academic](/en/careers/programs/atidim-academic) — BA/MA + guaranteed 3-year civil-service placement
- [Atidim Military](/en/careers/programs/atidim-military) — IDF → civil service
- [Public Sector — Track](/en/careers/public-sector) — full overview

## See also

- [Careers Hub](/en/careers)
- [Affirmative-action public-sector — right](/en/rights/public-sector-representation)`,
  am: `## TL;DR

የመንግስት አገልግሎት ኮሚሽን ትዕዛዝ ("ትዕዛዝ 50") የኢትዮጵያ-እስራኤላውያንን ተወካይ ቅጥር ለመንግስት አገልግሎት ሚናዎች ያስገድዳል። የአሁኑ ግብ: 2.5% ከሁሉም አመልካቾች — ነገር ግን ትግበራው ~1.7% ነው።

## ትዕዛዝ 50 ምንድን ነው

በ1953 የተቋቋመው የመንግስት አገልግሎት ኮሚሽን ትዕዛዝ ሲሆን ትዕዛዝ 50 (1981) ለማህበረሰብ-ተወካዮች ቅድሚያ የሚሰጥ amendment ነው። ይህ የሚተገበረው በ:

- የመንግስት ሚኒስቴሮች
- የአካባቢ ባለስልጣኖች (ማዘጋጃ ቤቶች)
- የሕግ ድርጅቶች (ቢዲኒው፣ የግብር ባለስልጣን)
- በመንግስት ባለቤትነት የተያዙ ኩባንያዎች

## ለማን ይተገበራል

ሁሉም ኢትዮጵያ-እስራኤላውያን — 1ኛ፣ 2ኛ እና 3ኛ ትውልድ።

## እንዴት ማመልከት

1. ብቁነትን ያረጋግጡ
2. ቦታ በሚያመለክቱበት ጊዜ "ትዕዛዝ 50" ምልክት ያድርጉ
3. ሰነድ ይያዙ
4. ውድቅ ከሆኑ በጤቤካ ይግባኝ ማለት

## የትግበራ ስታቲስቲክስ

- አሁናዊ ውክልና: **1.7%** (ግብ: 2.5% በ2027)

## ድርጅቶች የሚረዱ

- [ጤቤካ](/am/orgs/tebeka) — የህግ ውክልና
- [ENP](/am/orgs/enp) — የመንግስት አገልግሎት ቦታዎች መመሪያ

## ልዩ መግቢያ መንገዶች

- [Atidim Academic](/am/careers/programs/atidim-academic)
- [Atidim Military](/am/careers/programs/atidim-military)

## ተጨማሪ ይመልከቱ

- [ስራ እና ሙያ Hub](/am/careers)`,
};

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const html = renderMarkdown(BODIES[locale] ?? BODIES[DEFAULT_LOCALE]);
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/careers/affirmative-action`;
  return { locale, html, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "careers_affirmative_action_title");
  const description = t(locale, "careers_affirmative_action_subtitle");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${publicUrl}/${locale}/careers/affirmative-action`,
    url: `${publicUrl}/${locale}/careers/affirmative-action`,
    headline: title,
    description,
    inLanguage: locale,
    author: { "@type": "Organization", name: "Tedros", url: publicUrl },
    publisher: { "@type": "Organization", name: "Tedros", url: publicUrl },
  };

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    {
      name: t(locale, "careers_affirmative_action_breadcrumb"),
      path: "/careers/affirmative-action",
    },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/careers/affirmative-action"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": articleJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function AffirmativeAction({ loaderData }: Route.ComponentProps) {
  const { locale, html, shareUrl } = loaderData;
  const title = t(locale, "careers_affirmative_action_title");
  const subtitle = t(locale, "careers_affirmative_action_subtitle");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="absolute inset-s-0 inset-e-0 top-0 h-1.5 bg-accent-red"
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              ⚖️
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
            </div>
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-6">
          <WhatsAppShare title={title} url={shareUrl} locale={locale} />
        </div>

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "careers_track_back_to_hub")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
