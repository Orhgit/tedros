// City registry — static source for the Phase 3.4 programmatic SEO pages.
//
// 8 priority cities for the community per TED-16 description. The DB seed
// (`app/lib/db/seeds/cities.ts`) currently lists only 5 cities and uses a
// different cut (Ashdod vs. Ashkelon). This registry is the source of truth
// for the SEO pages until Tedros Data & Integrations expands the DB seed
// and we wire the route through Drizzle.
//
// Pure module: no DB, safe to import from a loader, an action, or a test.

import type { Locale } from "~/lib/i18n/config";

export type CityName = { he: string; en: string; am: string };

// One paragraph of community-relevant context per locale. Rendered on the
// city page and used to give every URL substantive, non-templated content
// (Google quality / doorway-page risk). HE is primary, EN/AM mirror.
export type CityOverview = { he: string; en: string; am: string };

export type City = {
  slug: string; // URL slug — same in every locale (Latin, kebab-case)
  names: CityName;
  region: "south" | "center" | "north"; // for index grouping + meta
  // Approximate longitude/latitude — used in the City schema.org JSON-LD
  // for richer SERP snippets. Sourced from public Wikipedia coordinates;
  // not user-facing.
  geo: { lat: number; lon: number };
  overview: CityOverview;
};

export const CITIES: City[] = [
  {
    slug: "netanya",
    names: { he: "נתניה", en: "Netanya", am: "ነታንያ" },
    region: "center",
    geo: { lat: 32.3329, lon: 34.8599 },
    overview: {
      he: "נתניה היא אחד המוקדים הגדולים בישראל לקהילת יוצאי אתיופיה, עם נוכחות משמעותית במיוחד בשכונות דורה, נאות שקד וקריית נורדאו. בנוסף לקהילה הוותיקה, רבות מהמשפחות הצעירות מחפשות פתרונות דיור באזור — בין השאר במסגרת פרויקטי ההתחדשות העירונית הפעילים בעיר.",
      en: "Netanya is one of Israel's largest hubs of the Israeli-Ethiopian community, with a particularly strong presence in the Dora, Neot Shaked and Kiryat Nordau neighborhoods. Alongside the established community, many younger families are looking for housing in the area — including through the active urban-renewal projects across the city.",
      am: "ነታንያ ለእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ በእስራኤል ካሉ ትላልቅ ማዕከላት አንዷ ናት፣ በተለይም በዶራ፣ ኒዮት ሻከድ እና ቂርያት ኖርዳው ሰፈሮች ጠንካራ መገኘት አላት። ከተመሰረተው ማህበረሰብ በተጨማሪ፣ ብዙ ወጣት ቤተሰቦች በከተማው ካሉ ንቁ የከተማ እድሳት ፕሮጀክቶች ጨምሮ በአካባቢው ቤት ይፈልጋሉ።",
    },
  },
  {
    slug: "rishon-lezion",
    names: { he: "ראשון לציון", en: "Rishon LeZion", am: "ሪሾን ለጽዮን" },
    region: "center",
    geo: { lat: 31.971, lon: 34.7892 },
    overview: {
      he: "ראשון לציון מארחת קהילה גדולה ופעילה של יוצאי אתיופיה, עם ריכוז היסטורי בשכונת רמת אליהו — שכונה שנבנתה במקור כקליטה והפכה למוקד קהילתי ותיק. כיום השכונה נמצאת בלב מהלכי התחדשות עירונית, לצד נוכחות גוברת של בני הדור השני בכל רחבי העיר.",
      en: "Rishon LeZion is home to a large, active Israeli-Ethiopian community, historically concentrated in the Ramat Eliyahu neighborhood — originally built as absorption housing and now a long-standing community centre. The neighborhood is currently at the heart of urban-renewal efforts, alongside a growing second-generation presence across the city.",
      am: "ሪሾን ለጽዮን ትልቅ እና ንቁ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ መኖሪያ ነች፣ በታሪክ በራማት ኤልያሁ ሰፈር ላይ የተሰበሰበ — በመጀመሪያ እንደ ቅበላ መኖሪያ የተገነባ እና ዛሬ የቆየ የማህበረሰብ ማዕከል ነው። ሰፈሩ በከተማ እድሳት ጥረቶች ማዕከል ላይ ሲሆን፣ በከተማው ሁሉ የሁለተኛ ትውልድ መገኘት እያደገ ነው።",
    },
  },
  {
    slug: "rehovot",
    names: { he: "רחובות", en: "Rehovot", am: "ረሆቮት" },
    region: "center",
    geo: { lat: 31.8928, lon: 34.8113 },
    overview: {
      he: "רחובות מאכלסת קהילה ותיקה ומעורבת של יוצאי אתיופיה, עם ריכוז משמעותי בשכונת קריית משה. השכונה — שמרבית תושביה מהקהילה — נמצאת תחת תהליכי התחדשות עירונית, ויחד איתם עולה הביקוש לפתרונות דיור משלימים בעיר ובסביבתה.",
      en: "Rehovot has a long-established Israeli-Ethiopian community, with a significant concentration in the Kiryat Moshe neighborhood. Most of the neighborhood's residents are from the community, and it is currently going through urban-renewal processes — driving demand for additional housing options in the city and the surrounding area.",
      am: "ረሆቮት ቆየት ያለ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ አላት፣ በቂርያት ሞሼ ሰፈር ላይ ጉልህ መገኘት ያለው። አብዛኞቹ የሰፈሩ ነዋሪዎች ከማህበረሰቡ የመጡ ናቸው፣ እና በአሁኑ ጊዜ የከተማ እድሳት ሂደቶችን እያለፈ ነው — በከተማው እና በአካባቢው ለተጨማሪ የመኖሪያ አማራጮች ፍላጎት እያደገ ነው።",
    },
  },
  {
    slug: "ashkelon",
    names: { he: "אשקלון", en: "Ashkelon", am: "አሽከሎን" },
    region: "south",
    geo: { lat: 31.6688, lon: 34.5717 },
    overview: {
      he: "אשקלון קלטה גלים משמעותיים של יוצאי אתיופיה משנות ה-90 ואילך, ומהווה כיום מוקד קהילתי דרומי משמעותי. הקהילה פרושה בשכונות שונות בעיר, עם נוכחות גוברת של עסקים, מוסדות חינוך ויוזמות חברתיות מקומיות.",
      en: "Ashkelon absorbed significant waves of Israeli-Ethiopian community members from the 1990s onward and is today a major southern community hub. Community members are spread across multiple neighborhoods in the city, alongside a growing presence of local businesses, educational institutions and community-led initiatives.",
      am: "አሽከሎን ከ1990ዎቹ ጀምሮ ጉልህ የሆኑ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ አባላትን ተቀብላለች፣ ዛሬም ዋና የደቡብ ማህበረሰብ ማዕከል ነች። የማህበረሰቡ አባላት በከተማው ውስጥ በበርካታ ሰፈሮች ተበትነዋል፣ ከአካባቢ ንግዶች፣ የትምህርት ተቋማት እና በማህበረሰቡ የሚመሩ ተነሳሽነቶች ጋር።",
    },
  },
  {
    slug: "kiryat-gat",
    names: { he: "קריית גת", en: "Kiryat Gat", am: "ቂርያት ጋት" },
    region: "south",
    geo: { lat: 31.6098, lon: 34.7642 },
    overview: {
      he: "קריית גת היא אחת הערים בישראל בהן שיעור הקהילה מתוך כלל האוכלוסייה הוא מהגבוהים. הקהילה פעילה בעיר עשרות שנים, עם רשת ענפה של ארגונים, בתי ספר ומיזמים — ועל רקע זה גם דרישה גבוהה לפתרונות דיור הוגנים בעיר.",
      en: "Kiryat Gat has one of the highest proportions of Israeli-Ethiopian community members relative to total population in Israel. The community has been active in the city for decades, with a broad network of organisations, schools and initiatives — and a correspondingly high demand for fair housing options in the city.",
      am: "ቂርያት ጋት ከጠቅላላ ሕዝብ አንፃር በእስራኤል ካሉ ከፍተኛ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ መጠን ካላቸው ከተሞች አንዷ ነች። ማህበረሰቡ በከተማው ለበርካታ አስርት ዓመታት ንቁ ሆኖ ቆይቷል፣ ሰፊ የድርጅቶች፣ የትምህርት ቤቶች እና ተነሳሽነቶች መረብ ያለው — እንዲሁም በከተማው ለፍትሐዊ የመኖሪያ አማራጮች ተመጣጣኝ ከፍተኛ ፍላጎት አለ።",
    },
  },
  {
    slug: "beer-sheva",
    names: { he: "באר שבע", en: "Be'er Sheva", am: "ቤር ሼቫ" },
    region: "south",
    geo: { lat: 31.2518, lon: 34.7913 },
    overview: {
      he: "באר שבע, הגדולה בערי הדרום, מאכלסת קהילה גדלה של יוצאי אתיופיה, עם נוכחות משמעותית של בני הדור השני סביב האוניברסיטה ובמוסדות חינוך אזוריים. העיר מציעה מגוון רחב של נכסים והזדמנויות דיור, יחד עם פרויקטי תשתית ופיתוח.",
      en: "Be'er Sheva, the largest city in the south, hosts a growing Israeli-Ethiopian community, with a notable presence of second-generation members around Ben-Gurion University and the regional educational institutions. The city offers a wide range of properties and housing opportunities, alongside ongoing infrastructure and development projects.",
      am: "ቤር ሼቫ፣ ከደቡብ ከተሞች ትልቋ፣ እያደገ ያለ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ መኖሪያ ነች፣ በቤን-ጉሪዮን ዩኒቨርሲቲ እና በክልሉ የትምህርት ተቋማት ዙሪያ የሁለተኛ ትውልድ አባላት ጉልህ መገኘት አላቸው። ከተማዋ የተለያዩ ንብረቶችን እና የመኖሪያ ቤት እድሎችን ታቀርባለች፣ ከቀጣይ መሰረተ ልማት እና ልማት ፕሮጀክቶች ጋር።",
    },
  },
  {
    slug: "haifa",
    names: { he: "חיפה", en: "Haifa", am: "ሐይፋ" },
    region: "north",
    geo: { lat: 32.794, lon: 34.9896 },
    overview: {
      he: 'חיפה מארחת קהילה ותיקה של יוצאי אתיופיה, פרושה ברבעים שונים בעיר. שוק הנדל"ן בעיר מציע מגוון של פתרונות דיור — מעיצובים מודרניים בכרמל ועד שכונות עם פוטנציאל התחדשות במזרח העיר.',
      en: "Haifa is home to an established Israeli-Ethiopian community, spread across multiple neighborhoods in the city. The local real-estate market offers a range of housing options — from modern projects in the Carmel area to neighborhoods with urban-renewal potential in the eastern part of the city.",
      am: "ሐይፋ የተመሰረተ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ መኖሪያ ነች፣ በከተማው በበርካታ ሰፈሮች ተበትኗል። የአካባቢው የሪል እስቴት ገበያ የተለያዩ የመኖሪያ ቤት አማራጮችን ያቀርባል — በካርሜል አካባቢ ካሉ ዘመናዊ ፕሮጀክቶች እስከ በምስራቁ የከተማ ክፍል ካሉ የከተማ እድሳት አቅም ካላቸው ሰፈሮች።",
    },
  },
  {
    slug: "kiryat-malakhi",
    names: { he: "קריית מלאכי", en: "Kiryat Malakhi", am: "ቂርያት ማላኪ" },
    region: "south",
    geo: { lat: 31.7311, lon: 34.7466 },
    overview: {
      he: "קריית מלאכי היא אחת הערים בישראל עם שיעור גבוה במיוחד של יוצאי אתיופיה מתוך כלל האוכלוסייה. הקהילה היא חלק מרכזי באופי העיר — עם השפעה נראית במוסדות חינוך, מסחר ופעילות חברתית — ועם דרישה משמעותית לפתרונות דיור עדכניים.",
      en: "Kiryat Malakhi is one of Israel's cities with a particularly high proportion of Israeli-Ethiopian community members relative to total population. The community is a central part of the city's character — visibly present in education, commerce and community activity — alongside significant demand for updated housing options.",
      am: "ቂርያት ማላኪ ከጠቅላላ ሕዝብ አንፃር በተለይ ከፍተኛ የሆኑ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ አባላት ካሉባቸው የእስራኤል ከተሞች አንዷ ነች። ማህበረሰቡ የከተማው ባሕሪ ማዕከላዊ ክፍል ነው — በትምህርት፣ በንግድ እና በማህበረሰብ እንቅስቃሴ ላይ በሚታይ ሁኔታ የሚገኝ — እና ለዘመናዊ የመኖሪያ ቤት አማራጮች ጉልህ ፍላጎት አለ።",
    },
  },
];

const BY_SLUG = new Map<string, City>(CITIES.map((c) => [c.slug, c]));

export function findCityBySlug(slug: string): City | undefined {
  return BY_SLUG.get(slug);
}

export function cityName(city: City, locale: Locale): string {
  return city.names[locale] ?? city.names.he;
}

export function cityOverview(city: City, locale: Locale): string {
  return city.overview[locale] ?? city.overview.he;
}

export const CITY_PATH_PREFIX = "/cities";

export function cityPath(locale: Locale, slug: string): string {
  return `/${locale}${CITY_PATH_PREFIX}/${slug}`;
}
