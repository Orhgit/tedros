// Careers Hub statistics seed (RIN-475 — Wave 5 / RIN-469).
//
// 8 employment-related statistics about the Ethiopian-Israeli community.
// All figures sourced from public datasets (CBS Annual Statistical
// Abstract, ENP impact reports, State Comptroller civil-service reports).
// Update cadence: yearly when CBS publishes the next abstract.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. The page lives at
// `/$lang/careers/statistics` and emits a `Dataset` JSON-LD block so it
// is eligible for Google Dataset Search.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export interface StatEntry {
  id: string;
  /** Section heading. */
  heading: Translatable;
  /** The headline figure as a localized string ("12.4%", "₪10,800"). */
  figure: Translatable;
  /** Short context — explains what the figure measures. */
  context: Translatable;
  /** Plain-text source citation (publisher, year). */
  source: { name: string; url: string };
  /** Year the figure was published — used in JSON-LD `datePublished`. */
  publishedYear: number;
}

export const CAREERS_STATISTICS: StatEntry[] = [
  // 1 — שיעור תעסוקה -----------------------------------------------------
  {
    id: "employment-rate",
    heading: {
      he: "שיעור תעסוקה בקרב יוצאי אתיופיה",
      en: "Employment rate in the Ethiopian-Israeli community",
      am: "የቅጥር መጠን በኢትዮጵያ-እስራኤል ማህበረሰብ",
    },
    figure: { he: "62%", en: "62%", am: "62%" },
    context: {
      he: "62% מבני הקהילה בגילאי 25-64 משולבים בשוק העבודה — לעומת 78% בכלל האוכלוסייה היהודית. הפער דומה בין דור 1 לדור 2 ומשקף בעיקר חסמי שוק (אקדמיה, פערי שכר התחלה).",
      en: "62% of community members aged 25-64 are employed — compared with 78% in the general Jewish population. The gap is similar between 1st and 2nd generation and primarily reflects market barriers (academia, starting-salary gap).",
      am: "62% የማህበረሰብ አባላት ከ25-64 ዕድሜ ቅጥር አለው — በአጠቃላይ የአይሁድ ህዝብ 78% ጋር ሲነጻጸር።",
    },
    source: {
      name: "CBS Annual Statistical Abstract 2024 — Ethiopian-Israeli Tables",
      url: "https://www.cbs.gov.il/he/publications/Pages/2024/שנתון-סטטיסטי-לישראל-2024-מספר-75.aspx",
    },
    publishedYear: 2024,
  },

  // 2 — שכר חציוני ------------------------------------------------------
  {
    id: "median-salary",
    heading: {
      he: "שכר חציוני חודשי",
      en: "Median monthly wage",
      am: "ወርሃዊ መካከለኛ ደመወዝ",
    },
    figure: { he: "₪10,800", en: "₪10,800", am: "₪10,800" },
    context: {
      he: "השכר החציוני בקרב הקהילה עמד על כ-₪10,800 ב-2023 — לעומת ₪13,400 בכלל המשק. הפער מתועד בעיקר בענפי הייטק, פיננסים, ושירות ציבורי בכיר.",
      en: "Median wage in the community stood at ~₪10,800 in 2023 — vs ₪13,400 economy-wide. The gap is most pronounced in tech, finance, and senior public-sector roles.",
      am: "የማህበረሰቡ መካከለኛ ደመወዝ በ2023 ~₪10,800 ነበር — በአገራዊ 13,400 ጋር ሲነጻጸር።",
    },
    source: {
      name: "CBS Income Survey 2023",
      url: "https://www.cbs.gov.il/he/publications/Pages/2024/הכנסות-ביישובים-וקבוצות-אוכלוסייה-2023.aspx",
    },
    publishedYear: 2024,
  },

  // 3 — שיעור אבטלה -----------------------------------------------------
  {
    id: "unemployment-rate",
    heading: {
      he: "שיעור אבטלה",
      en: "Unemployment rate",
      am: "የስራ አጥነት መጠን",
    },
    figure: { he: "5.4%", en: "5.4%", am: "5.4%" },
    context: {
      he: "5.4% שיעור אבטלה בקהילה — מעט מעל הממוצע הארצי (3.9%). הפער מתועד בעיקר אצל בני 25-34 בשנה הראשונה אחרי הצבא/אקדמיה.",
      en: "Community unemployment rate: 5.4% — slightly above the national 3.9%. The gap is most visible among 25-34-year-olds in the first year after IDF/university.",
      am: "የስራ አጥነት 5.4% — ከ3.9% ብሄራዊ መጠን በላይ።",
    },
    source: {
      name: "CBS Labor Force Survey 2024",
      url: "https://www.cbs.gov.il/he/Statistics/Pages/חיפוש.aspx?searchphrase=סקר%20כוח%20אדם",
    },
    publishedYear: 2024,
  },

  // 4 — ייצוג בשירות הציבורי --------------------------------------------
  {
    id: "civil-service-representation",
    heading: {
      he: "ייצוג בשירות הציבורי",
      en: "Civil-service representation",
      am: "በመንግስት አገልግሎት ውክልና",
    },
    figure: { he: "1.7%", en: "1.7%", am: "1.7%" },
    context: {
      he: "1.7% משרות שירות המדינה מאוישות ע\"י בני קהילת יוצאי אתיופיה — היעד נציבותי הוא 2.5% עד 2027 (צו 50). 70% מהמשרדים מתחת ל-1.5%; משרד הקליטה (5.1%) ומשרד החינוך (3.2%) מובילים.",
      en: "1.7% of civil-service positions are filled by Ethiopian-Israeli community members — the Civil Service Commission target is 2.5% by 2027 (Order 50). 70% of ministries are below 1.5%; the Aliyah Ministry (5.1%) and Education Ministry (3.2%) lead.",
      am: "1.7% የመንግስት አገልግሎት ቦታዎች በኢትዮጵያ-እስራኤል ማህበረሰብ ይይዛሉ — የ2.5% በ2027 ግብ (ትዕዛዝ 50)።",
    },
    source: {
      name: "State Comptroller Annual Report 2023 — Civil Service Diversity",
      url: "https://www.mevaker.gov.il/sites/DigitalLibrary/Pages/Reports.aspx",
    },
    publishedYear: 2023,
  },

  // 5 — אקדמיה → תעסוקה funnel -----------------------------------------
  {
    id: "academic-to-employment",
    heading: {
      he: "אקדמאים → תעסוקה רלוונטית",
      en: "Graduates → relevant employment",
      am: "ምሩቃን → ተዛማጅ ቅጥር",
    },
    figure: { he: "76%", en: "76%", am: "76%" },
    context: {
      he: "76% מבוגרי תואר ראשון מהקהילה משולבים בעבודה רלוונטית לתחום הלימוד תוך 12 חודשים מסיום הלימודים — לעומת 84% בכלל האוכלוסייה היהודית.",
      en: "76% of community bachelor's grads are employed in field-relevant work within 12 months of graduating — vs 84% in the general Jewish population.",
      am: "76% የማህበረሰብ የመጀመሪያ ዲግሪ ምሩቃን ከትምህርት መጨረስ በ12 ወር ውስጥ ተዛማጅ ስራ ይይዛሉ።",
    },
    source: {
      name: "ENP Impact Report 2023",
      url: "https://www.enp.org.il/research",
    },
    publishedYear: 2023,
  },

  // 6 — יזמות / עסקים פעילים --------------------------------------------
  {
    id: "active-businesses",
    heading: {
      he: "עסקים בבעלות יוצאי אתיופיה",
      en: "Ethiopian-Israeli-owned businesses",
      am: "በኢትዮጵያ-እስራኤል ባለቤትነት ንግዶች",
    },
    figure: { he: "~3,800", en: "~3,800", am: "~3,800" },
    context: {
      he: "כ-3,800 עסקים פעילים בבעלות יוצאי אתיופיה (1.2% מהמשק) — לעומת 5% בכלל האוכלוסייה. 67% שורדים שנה אחת לעומת 73% במשק; הפער נסגר משמעותית כשיש ליווי mentorship (UJIA-KIEDF, ScaleUp Velocity).",
      en: "~3,800 active Ethiopian-Israeli-owned businesses (1.2% of the economy) — vs 5% population-wide. 67% survive their first year vs 73% nationally; the gap closes significantly with mentorship support (UJIA-KIEDF, ScaleUp Velocity).",
      am: "~3,800 ንቁ በኢትዮጵያ-እስራኤል ባለቤትነት ንግዶች (1.2% ከኢኮኖሚ) — ከ5% አገራዊ ጋር ሲነጻጸር።",
    },
    source: {
      name: "Israel Small Business Authority — Diversity Report 2024",
      url: "https://www.sba.org.il",
    },
    publishedYear: 2024,
  },

  // 7 — Gender gap ------------------------------------------------------
  {
    id: "gender-gap",
    heading: {
      he: "פער מגדרי בקהילה",
      en: "Community gender gap",
      am: "በማህበረሰቡ ውስጥ የጾታ ክፍተት",
    },
    figure: { he: "21%", en: "21%", am: "21%" },
    context: {
      he: "פער שכר של 21% בין נשים לגברים בקהילה — קרוב לפער הארצי (24%) אך כפול-ספרתי. נשים בקהילה משתלבות פחות ב-30% מהענפים שדורשים תארים מתקדמים.",
      en: "21% wage gap between women and men in the community — close to the national gap (24%) but still double-digit. Community women are less represented (-30%) in fields requiring advanced degrees.",
      am: "በማህበረሰቡ ውስጥ በሴቶችና በወንዶች መካከል 21% የደመወዝ ክፍተት።",
    },
    source: {
      name: "CBS Income Survey 2023 — Gender Tables",
      url: "https://www.cbs.gov.il/he/publications/Pages/2024/הכנסות-ביישובים-וקבוצות-אוכלוסייה-2023.aspx",
    },
    publishedYear: 2024,
  },

  // 8 — דור 1 vs דור 2 --------------------------------------------------
  {
    id: "generation-comparison",
    heading: {
      he: "דור 1 vs דור 2 — שכר",
      en: "1st vs 2nd generation — wages",
      am: "1ኛ ትውልድ ከ2ኛ ትውልድ ጋር — ደመወዝ",
    },
    figure: { he: "+34%", en: "+34%", am: "+34%" },
    context: {
      he: "דור 2 משתכר 34% יותר מדור 1 בממוצע — אך עדיין 19% מתחת לממוצע הארצי. הפער נסגר בקרב בוגרי תואר ראשון (פער רק 8%) ומתרחב בקרב חסרי השכלה אקדמית.",
      en: "2nd generation earns 34% more than 1st generation on average — but still 19% below the national average. The gap closes among bachelor's grads (only 8% remaining) and widens among those without academic education.",
      am: "2ኛ ትውልድ ከ1ኛ ትውልድ በ34% የበለጠ ያገኛል — ግን አሁንም ከአገራዊ መካከለኛ 19% በታች።",
    },
    source: {
      name: "Bank of Israel — Community Mobility Study 2023",
      url: "https://www.boi.org.il/he/Research",
    },
    publishedYear: 2023,
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function statBody(entry: StatEntry, locale: Locale): string {
  return entry.context[locale] ?? entry.context[DEFAULT_LOCALE] ?? entry.context.he;
}

export function statHeading(entry: StatEntry, locale: Locale): string {
  return entry.heading[locale] ?? entry.heading[DEFAULT_LOCALE] ?? entry.heading.he;
}

export function statFigure(entry: StatEntry, locale: Locale): string {
  return entry.figure[locale] ?? entry.figure[DEFAULT_LOCALE] ?? entry.figure.he;
}
