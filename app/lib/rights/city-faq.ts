/**
 * Generates city-specific FAQ items for a rights×city programmatic cell.
 *
 * Each (right, city) pair gets 3 questions:
 *  1. Community size in the city (from communityStats)
 *  2. How to apply locally (right-tag-specific)
 *  3. Which neighbourhoods are most relevant (from communityStats)
 *
 * All answers are unique per cell — prevents near-duplicate detection.
 */

import type { City } from "~/lib/cities/registry";
import type { Locale } from "~/lib/i18n/config";

export interface FaqItem {
  question: string;
  answer: string;
}

interface RightLike {
  title: string;
  tags: string[];
}

function statVal(city: City, idx: number): string {
  return city.communityStats?.[idx]?.value ?? "";
}

export function generateCityFaq(
  right: RightLike,
  city: City,
  locale: Locale,
): FaqItem[] {
  const cityName = city.names[locale] ?? city.names.he;
  const rightTitle = right.title;
  const popVal = statVal(city, 0);
  const pctVal = statVal(city, 1);
  const hoods = statVal(city, 2);
  const services = statVal(city, 3);
  const tag = right.tags[0] ?? "housing";

  if (locale === "he") {
    return [
      {
        question: `כמה יוצאי אתיופיה גרים ב${cityName}?`,
        answer: popVal
          ? `קהילת יוצאי אתיופיה ב${cityName} מונה כ-${popVal} תושבים — כ-${pctVal} מאוכלוסיית העיר. השכונות המרכזיות: ${hoods}.`
          : `ב${cityName} פועלת קהילה פעילה של יוצאי אתיופיה עם מוסדות, ארגונים ובתי כנסת מסורתיים.`,
      },
      {
        question: `איך מקבלים ${rightTitle} ב${cityName}?`,
        answer: getApplicationAnswer(tag, cityName, services, locale),
      },
      {
        question: `אילו שירותי קהילה זמינים ב${cityName} בנושא זה?`,
        answer: services
          ? `ב${cityName} פועלים: ${services}. ארגונים אלה יכולים לסייע בניירת, תרגום ומיצוי הזכות.`
          : `ב${cityName} ניתן לפנות לרווחה העירונית ולמשרד הקליטה המקומי לסיוע במיצוי הזכות.`,
      },
    ];
  }

  if (locale === "am") {
    return [
      {
        question: `${cityName} ስንት ኢትዮጵያ-እስራኤላውያን ይኖራሉ?`,
        answer: popVal
          ? `${cityName} ውስጥ ያለው ማህበረሰብ ${popVal} ሲሆን ይህም ከከተማው ህዝብ ${pctVal} ነው። ዋና ሰፈሮች: ${hoods}.`
          : `${cityName} ውስጥ ንቁ ማህበረሰብ አለ።`,
      },
      {
        question: `${cityName} ውስጥ ${rightTitle} እንዴት ያገኛሉ?`,
        answer: getApplicationAnswer(tag, cityName, services, locale),
      },
      {
        question: `${cityName} ውስጥ የሚገኙ ድጋፍ አገልግሎቶች ምን ምን ናቸው?`,
        answer: services
          ? `${cityName} ውስጥ ${services} ይገኛሉ። እነዚህ ድርጅቶች ሰነድ፣ ትርጉም እና ድጋፍ ይሰጣሉ።`
          : `ለድጋፍ የከተማ ማህበራዊ አገልግሎት ወይም የቅድሚያ ቢሮ ያነጋግሩ።`,
      },
    ];
  }

  // English
  return [
    {
      question: `How many Ethiopian-Israelis live in ${cityName}?`,
      answer: popVal
        ? `The Ethiopian-Israeli community in ${cityName} numbers approximately ${popVal} residents — around ${pctVal} of the city's population. Main neighbourhoods: ${hoods}.`
        : `${cityName} has an active Ethiopian-Israeli community with institutions, organisations and traditional synagogues.`,
    },
    {
      question: `How do I claim ${rightTitle} in ${cityName}?`,
      answer: getApplicationAnswer(tag, cityName, services, locale),
    },
    {
      question: `What community support is available in ${cityName} for this right?`,
      answer: services
        ? `In ${cityName}, the following organisations can assist with paperwork, translation and entitlement: ${services}.`
        : `Contact the municipal welfare office or local absorption centre in ${cityName} for assistance.`,
    },
  ];
}

function getApplicationAnswer(
  tag: string,
  cityName: string,
  services: string,
  locale: Locale,
): string {
  const support = services
    ? locale === "he"
      ? ` לסיוע פנו ל: ${services}.`
      : locale === "am"
        ? ` ድጋፍ ለ ${services}.`
        : ` For support: ${services}.`
    : "";

  if (locale === "he") {
    const answers: Record<string, string> = {
      housing: `הגישו בקשה דרך אתר מינהל הדיור הממשלתי או בסניף המקומי של משרד הבינוי ב${cityName}.${support}`,
      mortgage: `פנו לסניף בנק לאומי, דיסקונט או איגוד ב${cityName} — הם המורשים לעיבוד בקשות המשכנתא הקהילתית.${support}`,
      grants: `הגישו את הטופס הרלוונטי בלשכת הסיוע הממשלתית ב${cityName}.${support}`,
      employment: `פנו ללשכת התעסוקה ב${cityName} — מחויבת לסייע ביישום חוק העסקה מתקנת.${support}`,
      education: `פנו למחלקת החינוך העירונית ב${cityName} או לקרן הסיוע לסטודנטים.${support}`,
      legal: `ניתן לפנות לתבקה — מוקד שפועל מול כל הרשויות כולל אלה ב${cityName}.${support}`,
      family: `פנו לאגף הרווחה של עיריית ${cityName} — מחויבים לטפל בבקשות תוך 30 יום.${support}`,
      health: `פנו לקופת החולים המקומית ב${cityName} — כל הקופות מחויבות לספק שירות בשפה מובנת.${support}`,
    };
    return answers[tag] ?? `הגישו את הבקשה דרך הגוף הממשלתי הרלוונטי ב${cityName}.${support}`;
  }

  if (locale === "am") {
    return `${cityName} ውስጥ ለማመልከት ወደ አካባቢ መስሪያ ቤት ወይም ድጋፍ አቅራቢ ድርጅት ይሂዱ።${support}`;
  }

  const answers: Record<string, string> = {
    housing: `Apply via the Government Housing Authority website or the local Ministry of Construction office in ${cityName}.${support}`,
    mortgage: `Visit Bank Leumi, Discount or Igud branches in ${cityName} — they are authorised to process Community Mortgage applications.${support}`,
    employment: `Contact the ${cityName} Employment Bureau — it is required to assist in implementing affirmative-action law.${support}`,
    education: `Contact the ${cityName} municipal education department or the student aid fund directly.${support}`,
    legal: `Contact Tebeka — they operate nationally including in ${cityName}.${support}`,
    family: `Contact the ${cityName} municipal welfare department — they are required to respond within 30 days.${support}`,
    health: `Contact your local health fund (kupat holim) in ${cityName} — all funds are required to provide understandable service.${support}`,
  };
  return answers[tag] ?? `Apply via the relevant government body in ${cityName}.${support}`;
}
