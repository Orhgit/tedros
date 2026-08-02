// Statistics topics seed (RIN-423 — Wave 3 / RIN-417).
//
// 8 demographic-statistics topic pages designed to be citation-bar by
// Wikipedia/news/academic readers — capturing queries like "כמה יהודים
// אתיופים יש בישראל", "אחוז בגרות בקהילה האתיופית", etc.
//
// Each topic ships 4-6 figures with localized heading + figure + context
// + source citation + publication year. The route layer at
// `/$lang/statistics/$topic` emits a `Dataset` JSON-LD per topic — Google
// Dataset Search eligible.
//
// Note: the **employment** topic intentionally lives at
// `/$lang/careers/statistics` (RIN-475 / Careers Hub) and is NOT
// duplicated here — that page covers wages, civil-service representation,
// gender wage gap, etc. Cross-link to it from this hub.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. Yearly maintenance:
// when CBS publishes the next abstract, refresh figures in place.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { StatTopicSlug } from "./categories";

export interface StatFigure {
  /** Figure ID (unique within a topic). */
  id: string;
  heading: Translatable;
  /** Headline value as a localized string ("~155,000", "62%"). */
  figure: Translatable;
  context: Translatable;
  source: { name: string; url: string };
  publishedYear: number;
  /** Optional caveat surfaced next to the source citation (e.g. "historical,
   * not a current figure"). Used when a stat is verified but stale. */
  confidenceNote?: Translatable;
}

/** A single bar in the energy-light CSS/SVG bar visualization (no chart
 * library — TED-20 explicitly calls for "ENERGY-LIGHT"). Values are
 * percentages (0-100) so bar widths can be computed directly. */
export interface StatBarChartItem {
  label: Translatable;
  valuePercent: number;
}

export interface StatBarChart {
  heading: Translatable;
  items: StatBarChartItem[];
  source: { name: string; url: string };
}

export interface StatTopicEntry {
  slug: StatTopicSlug;
  name: Translatable;
  shortDescription: Translatable;
  figures: StatFigure[];
  /** Longer-form markdown narrative (HE source-of-truth, EN/AM mirrored —
   * CLAUDE.md convention). Optional: only topics with a verified narrative
   * brief ship one (TED-20 wave 1: demographics, education). */
  narrative?: Record<Locale, string>;
  /** Optional energy-light bar visualization (e.g. district distribution). */
  barChart?: StatBarChart;
}

export const STAT_TOPICS: StatTopicEntry[] = [
  // 1 — demographics ----------------------------------------------------
  // Verified against docs/research/2026-07-29-community-statistics-verified.md
  // (TED-20 wave 1). Primary source: CBS "לקט נתונים לרגל חג הסיגד 2025"
  // (media release 367/2025, published 16.11.2025), data as of end-2024.
  {
    slug: "demographics",
    name: { he: "דמוגרפיה כללית", en: "General demographics", am: "ጠቅላላ ስነ-ህዝብ" },
    shortDescription: {
      he: "אוכלוסייה, גיל, פריסה גיאוגרפית — תמונת מצב מאומתת של הקהילה האתיופית-ישראלית, נכון לסוף 2024.",
      en: "Population, age, geographic spread — a verified snapshot of the Ethiopian-Israeli community as of end-2024.",
      am: "ህዝብ ብዛት፣ ዕድሜ፣ ጂኦግራፊያዊ ስርጭት — የተረጋገጠ የኢትዮጵያ-እስራኤል ማህበረሰብ ስዕል፣ እስከ 2024 መጨረሻ።",
    },
    figures: [
      {
        id: "total-population",
        heading: {
          he: 'סה"כ אוכלוסייה ממוצא אתיופי',
          en: "Total Ethiopian-origin population",
          am: "ጠቅላላ የኢትዮጵያ ምንጭ ህዝብ ብዛት",
        },
        figure: { he: "177,600", en: "177,600", am: "177,600" },
        context: {
          he: "177,600 נפש ממוצא אתיופי חיים בישראל, נכון לסוף 2024 — עלייה מ-171,600 בסוף 2023 (קצב גידול שנתי של כ-3.5%). מתוכם 93,400 ילידי אתיופיה (כ-53%) ו-84,200 ילידי ישראל שאביהם נולד באתיופיה (כ-47%).",
          en: "177,600 people of Ethiopian origin live in Israel as of end-2024 — up from 171,600 at end-2023 (an annual growth rate of about 3.5%). Of these, 93,400 (~53%) were born in Ethiopia and 84,200 (~47%) were born in Israel to a father born in Ethiopia.",
          am: "177,600 የኢትዮጵያ ምንጭ ያላቸው ሰዎች እስከ 2024 መጨረሻ በእስራኤል ይኖራሉ — ከ2023 መጨረሻ 171,600 ጭማሪ (~3.5% ዓመታዊ እድገት)። 93,400 (~53%) በኢትዮጵያ የተወለዱ፣ 84,200 (~47%) በእስራኤል የተወለዱ አባታቸው በኢትዮጵያ የተወለደ ናቸው።",
        },
        source: {
          name: 'הלמ"ס — "האוכלוסייה ממוצא אתיופי בישראל, לקט נתונים לרגל חג הסיגד 2025" (הודעה 367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "age-0-14",
        heading: {
          he: "ילדים בגילאי 0-14",
          en: "Children aged 0-14",
          am: "ከ0-14 ዓመት ልጆች",
        },
        figure: { he: "26.2%", en: "26.2%", am: "26.2%" },
        context: {
          he: "26.2% מהאוכלוסייה ממוצא אתיופי הם ילדים בגילאי 0-14 — קרוב לשיעור בכלל האוכלוסייה היהודית והאחרים (26.7%).",
          en: "26.2% of the Ethiopian-origin population are children aged 0-14 — close to the share in the general Jewish-and-others population (26.7%).",
          am: "26.2% የኢትዮጵያ ምንጭ ህዝብ ከ0-14 ዓመት ልጆች ናቸው — ከጠቅላላ የአይሁድ ህዝብ (26.7%) ጋር ተቀራራቢ።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "age-65-plus",
        heading: { he: "בני 65 ומעלה", en: "Aged 65 and over", am: "ከ65 ዓመት በላይ" },
        figure: { he: "7.0%", en: "7.0%", am: "7.0%" },
        context: {
          he: "רק 7.0% מהאוכלוסייה ממוצא אתיופי הם בני 65 ומעלה, לעומת 15.0% בכלל האוכלוסייה היהודית והאחרים — אוכלוסייה צעירה משמעותית.",
          en: "Only 7.0% of the Ethiopian-origin population is aged 65+, versus 15.0% in the general Jewish-and-others population — a significantly younger population.",
          am: "7.0% ብቻ የኢትዮጵያ ምንጭ ህዝብ ከ65 ዓመት በላይ ናቸው፣ ከጠቅላላ ህዝብ 15.0% ጋር ሲነጻጸር — በጣም ወጣት ህዝብ።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "geographic-district-concentration",
        heading: {
          he: "ריכוז גיאוגרפי — מחוז מוביל",
          en: "Geographic concentration — leading district",
          am: "ጂኦግራፊያዊ ስብስብ — ግንባር ግዛት",
        },
        figure: { he: "37.2%", en: "37.2%", am: "37.2%" },
        context: {
          he: "37.2% מהקהילה מתגוררים במחוז המרכז, 27.4% במחוז הדרום — יחד כ-65% משני מחוזות. הפילוח המלא מוצג בתרשים למטה.",
          en: "37.2% of the community lives in the Central District, 27.4% in the Southern District — together about 65% across just two districts. Full breakdown in the chart below.",
          am: "37.2% ማህበረሰቡ በማዕከላዊ ግዛት ይኖራል፣ 27.4% በደቡብ ግዛት — በጠቅላላ ~65% በሁለት ግዛቶች ብቻ።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "top-municipality-count",
        heading: {
          he: "הרשות עם מספר התושבים הגבוה ביותר",
          en: "Municipality with the most residents",
          am: "ከፍተኛ ነዋሪ ያለው ማዘጋጃ ቤት",
        },
        figure: { he: "נתניה — 13,300", en: "Netanya — 13,300", am: "ነታኒያ — 13,300" },
        context: {
          he: "נתניה מובילה במספר תושבים ממוצא אתיופי — 13,300 נפש, כ-5.6% מאוכלוסיית העיר.",
          en: "Netanya leads in absolute number of Ethiopian-origin residents — 13,300 people, about 5.6% of the city's population.",
          am: "ነታኒያ በኢትዮጵያ ምንጭ ነዋሪዎች ብዛት ግንባር ቀደም ናት — 13,300 ሰዎች፣ ~5.6% የከተማዋ ህዝብ።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "top-municipality-share",
        heading: {
          he: "הרשות עם האחוז הגבוה ביותר",
          en: "Municipality with the highest share",
          am: "ከፍተኛ መቶኛ ያለው ማዘጋጃ ቤት",
        },
        figure: {
          he: "קריית מלאכי — 13.8%",
          en: "Kiryat Malachi — 13.8%",
          am: "ኪርያት ማላኪ — 13.8%",
        },
        context: {
          he: "קריית מלאכי מובילה באחוז יחסי לגודל היישוב — 13.8% מכלל אוכלוסיית העיר (3,900 נפש) הם ממוצא אתיופי.",
          en: "Kiryat Malachi leads in relative share of the local population — 13.8% of the city's total population (3,900 people) is of Ethiopian origin.",
          am: "ኪርያት ማላኪ በአካባቢያዊ ድርሻ ግንባር ቀደም ናት — 13.8% የከተማዋ ጠቅላላ ህዝብ (3,900 ሰዎች) የኢትዮጵያ ምንጭ ናቸው።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "new-immigrants-2024",
        heading: {
          he: "עולים חדשים מאתיופיה",
          en: "New immigrants from Ethiopia",
          am: "ከኢትዮጵያ አዲስ ስደተኞች",
        },
        figure: { he: "285", en: "285", am: "285" },
        context: {
          he: "285 עולים חדשים מאתיופיה ב-2024 — ירידה חדה לעומת 1,812 ב-2023 ו-1,680 ב-2022.",
          en: "285 new immigrants arrived from Ethiopia in 2024 — a sharp decline from 1,812 in 2023 and 1,680 in 2022.",
          am: "285 አዲስ ስደተኞች ከኢትዮጵያ በ2024 — ከ2023 (1,812) እና ከ2022 (1,680) ጋር ሲነጻጸር ትልቅ ቅናሽ።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "births-fertility",
        heading: {
          he: "לידות ושיעור פריון",
          en: "Births and fertility rate",
          am: "ልደት እና የመውለድ መጠን",
        },
        figure: {
          he: "4,010 לידות · TFR 2.54",
          en: "4,010 births · TFR 2.54",
          am: "4,010 ልደት · TFR 2.54",
        },
        context: {
          he: "4,010 לידות חי בקרב נשים ממוצא אתיופי ב-2024; שיעור פריון כולל (TFR) של 2.54 ילדים לאישה.",
          en: "4,010 live births to Ethiopian-origin women in 2024; a total fertility rate (TFR) of 2.54 children per woman.",
          am: "4,010 ህያው ልደት በኢትዮጵያ ምንጭ ሴቶች በ2024; 2.54 የመውለድ መጠን (TFR) በአንዲት ሴት።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "household-size",
        heading: {
          he: "גודל משק בית ממוצע",
          en: "Average household size",
          am: "አማካይ የቤተሰብ ብዛት",
        },
        figure: { he: "3.70", en: "3.70", am: "3.70" },
        context: {
          he: "גודל משק בית ממוצע בקהילה: 3.70 נפשות, לעומת 2.99 בממוצע בכלל האוכלוסייה היהודית והאחרים.",
          en: "Average household size in the community: 3.70 people, versus 2.99 in the general Jewish-and-others population.",
          am: "አማካይ የቤተሰብ ብዛት በማህበረሰቡ: 3.70 ሰዎች፣ ከጠቅላላ ህዝብ 2.99 ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 — אינפוגרפיקה',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
    ],
    barChart: {
      heading: {
        he: "התפלגות גיאוגרפית לפי מחוז",
        en: "Geographic distribution by district",
        am: "በግዛት የጂኦግራፊያዊ ስርጭት",
      },
      items: [
        {
          label: { he: "מחוז המרכז", en: "Central District", am: "ማዕከላዊ ግዛት" },
          valuePercent: 37.2,
        },
        {
          label: { he: "מחוז הדרום", en: "Southern District", am: "ደቡብ ግዛት" },
          valuePercent: 27.4,
        },
        {
          label: { he: "מחוז חיפה", en: "Haifa District", am: "ሃይፋ ግዛት" },
          valuePercent: 13.8,
        },
        {
          label: { he: "מחוז ירושלים", en: "Jerusalem District", am: "ኢየሩሳሌም ግዛት" },
          valuePercent: 6.6,
        },
        {
          label: { he: "מחוז הצפון", en: "Northern District", am: "ሰሜን ግዛት" },
          valuePercent: 6.5,
        },
        {
          label: { he: "מחוז תל אביב", en: "Tel Aviv District", am: "ተል አቪቭ ግዛት" },
          valuePercent: 6.4,
        },
        {
          label: {
            he: "אזור יהודה ושומרון",
            en: "Judea and Samaria Area",
            am: "ይሁዳ እና ሳምራ አካባቢ",
          },
          valuePercent: 2.1,
        },
      ],
      source: {
        name: 'הלמ"ס, לקט נתונים לרגל חג הסיגד 2025 (367/2025)',
        url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
      },
    },
    narrative: {
      he: `## תמונת מצב

האוכלוסייה ממוצא אתיופי בישראל היא אוכלוסייה צעירה יחסית לכלל האוכלוסייה היהודית, עם ריכוז גיאוגרפי בולט במחוזות המרכז והדרום. נכון לסוף 2024 עומדת האוכלוסייה על 177,600 נפש — עלייה של כ-3.5% מסוף 2023 (171,600).

## מקור הנתונים ותדירות עדכון

הלמ"ס מפרסמת מדי שנה, לקראת חג הסיגד (בנובמבר), "לקט נתונים" רשמי הכולל דמוגרפיה, חינוך, ספורט, רווחה ופשיעה — זהו המקור העדכני והאמין ביותר לנתוני הקהילה, ומתעדכן שנה אחרי שנה. עמוד זה מבוסס על הפרסום האחרון (367/2025, נתוני סוף 2024) ויעודכן מדי נובמבר עם צאת הדוח החדש.

## נקודות מפתח

- **אוכלוסייה צעירה**: רק 7.0% מהקהילה בני 65+ (לעומת 15.0% בכלל האוכלוסייה) — תוצאה של פריון גבוה יחסית ועלייה שהתרחשה בעיקר בעשורים האחרונים.
- **ריכוז גיאוגרפי**: כ-65% מהקהילה מתגוררים במחוזות המרכז והדרום בלבד. נתניה היא הרשות עם מספר התושבים הגבוה ביותר (13,300); קריית מלאכי היא הרשות עם האחוז היחסי הגבוה ביותר (13.8%).
- **קצב עלייה בירידה חדה**: 285 עולים חדשים ב-2024, לעומת 1,812 ב-2023 — ירידה שמשקפת שינויים במדיניות הקליטה והיקף מועמדי העלייה הממתינים.`,
      en: `## Snapshot

The Ethiopian-origin population in Israel is relatively young compared to the general Jewish population, with a pronounced geographic concentration in the Central and Southern districts. As of end-2024 the population stood at 177,600 — up about 3.5% from end-2023 (171,600).

## Data source and update cadence

CBS publishes an official "data digest" every year ahead of the Sigd holiday (November), covering demographics, education, sports, welfare, and crime — the most current and reliable source for community data, refreshed annually. This page is based on the latest publication (367/2025, end-2024 data) and will be updated every November when the new report is released.

## Key points

- **Young population**: only 7.0% of the community is aged 65+ (vs 15.0% in the general population) — a result of relatively high fertility and aliyah concentrated mostly in recent decades.
- **Geographic concentration**: about 65% of the community lives in just the Central and Southern districts. Netanya has the highest absolute number of residents (13,300); Kiryat Malachi has the highest relative share (13.8%).
- **Sharply declining aliyah rate**: 285 new immigrants in 2024, down from 1,812 in 2023 — reflecting changes in absorption policy and the size of the waiting pool of aliyah candidates.`,
      am: `## አጠቃላይ እይታ

የኢትዮጵያ ምንጭ ያለው ህዝብ በእስራኤል ከጠቅላላ የአይሁድ ህዝብ ጋር ሲነጻጸር በአንጻራዊነት ወጣት ነው፣ በማዕከላዊ እና በደቡብ ግዛቶች ጎላ ያለ ጂኦግራፊያዊ ስብስብ አለው። እስከ 2024 መጨረሻ ህዝቡ 177,600 ደርሷል — ከ2023 መጨረሻ (171,600) ~3.5% ጭማሪ።

## የመረጃ ምንጭ እና የማዘመኛ ጊዜ

የእስራኤል ማዕከላዊ ስታቲስቲክስ ቢሮ (הלמ"ס) በየዓመቱ ከሲግድ በዓል በፊት (ኖቬምበር) ኦፊሴላዊ "የመረጃ ስብስብ" ያትማል። ይህ ገጽ በቅርብ ጊዜ ህትመት (367/2025፣ የ2024 መጨረሻ መረጃ) ላይ የተመሰረተ ሲሆን በየኖቬምበር ይዘመናል።

## ቁልፍ ነጥቦች

- **ወጣት ህዝብ**: 7.0% ብቻ ማህበረሰቡ ከ65 ዓመት በላይ ናቸው (ከጠቅላላ ህዝብ 15.0% ጋር ሲነጻጸር)።
- **ጂኦግራፊያዊ ስብስብ**: ~65% ማህበረሰቡ በማዕከላዊ እና በደቡብ ግዛቶች ብቻ ይኖራል። ነታኒያ ከፍተኛ ነዋሪ ብዛት አላት (13,300); ኪርያት ማላኪ ከፍተኛ አንጻራዊ ድርሻ አላት (13.8%)።
- **በከፍተኛ ሁኔታ እየቀነሰ ያለ የስደት መጠን**: 285 አዲስ ስደተኞች በ2024፣ ከ2023 (1,812) ጋር ሲነጻጸር ትልቅ ቅናሽ።`,
    },
  },

  // 2 — education -------------------------------------------------------
  // Verified against docs/research/2026-07-29-community-statistics-verified.md
  // (TED-20 wave 1). Primary source: CBS Sigd data digests 2024 (371/2024)
  // and 2025 (367/2025). The stale 2017 bagrut-eligibility figure and the
  // 2012/13 Taub Center higher-ed gap are intentionally NOT shown as
  // headline figures (per research brief) — the former is referenced only
  // as labeled historical context in the narrative below; the latter is
  // omitted entirely (single, decade-old secondary source).
  {
    slug: "education",
    name: { he: "השכלה", en: "Education", am: "ትምህርት" },
    shortDescription: {
      he: "שיעורי ניגשים לבגרות, המשך ללימודים אקדמיים והכשרות מקצועיות — נתוני השכלה מאומתים בקהילה.",
      en: "Matriculation exam rates, continuation to academia, vocational training — verified education data in the community.",
      am: "የማትሪክ ፈተና ተሳታፊነት፣ ወደ አካዳሚ መቀጠል — የተረጋገጠ የትምህርት መረጃ።",
    },
    figures: [
      {
        id: "students-count",
        heading: {
          he: "תלמידים ממוצא אתיופי בחינוך היסודי-על-יסודי",
          en: "Students in primary-secondary education",
          am: "በአንደኛ-ሁለተኛ ደረጃ ትምህርት ያሉ ተማሪዎች",
        },
        figure: { he: "34,300", en: "34,300", am: "34,300" },
        context: {
          he: '34,300 תלמידים ממוצא אתיופי בחינוך העברי בתשפ"ד (2023/24) — 2.2% מכלל התלמידים בחינוך העברי.',
          en: "34,300 Ethiopian-origin students in the Hebrew education system in the 2023/24 school year — 2.2% of all students in Hebrew-medium education.",
          am: "34,300 የኢትዮጵያ ምንጭ ተማሪዎች በዕብራይስጥ ትምህርት ሥርዓት በ2023/24 — 2.2% ከጠቅላላ ተማሪዎች።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "bagrut-exam-takers",
        heading: {
          he: 'שיעור הניגשים לבחינות בגרות (י"ב)',
          en: "Matriculation exam-taking rate (12th grade)",
          am: "የ12ኛ ክፍል የማትሪክ ፈተና ተሳታፊነት",
        },
        figure: { he: "93.7%", en: "93.7%", am: "93.7%" },
        context: {
          he: '93.7% מבני הקהילה ניגשו לבחינות בגרות בתשפ"ד (2023/24), לעומת 95.1% בכלל החינוך העברי — פער קטן.',
          en: "93.7% of community 12th-graders sat matriculation exams in the 2023/24 school year, versus 95.1% across all Hebrew-medium education — a small gap.",
          am: "93.7% ማህበረሰቡ ተማሪዎች የማትሪክ ፈተና ወስደዋል በ2023/24፣ ከ95.1% ጠቅላላ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "academic-college-continuation",
        heading: {
          he: "המשך ללימודי תואר ראשון במכללות אקדמיות",
          en: "Continuation to BA studies at academic colleges",
          am: "ወደ BA ትምህርት በአካዳሚክ ኮሌጆች መቀጠል",
        },
        figure: { he: "57.7%", en: "57.7%", am: "57.7%" },
        context: {
          he: 'בקרב בוגרי י"ב יוצאי אתיופיה (תשפ"ד), 57.7% ממשיכים ללימודי תואר ראשון במכללות אקדמיות — גבוה מ-39.1% בכלל החינוך העברי. מגמה קשורה כנראה לנגישות מכללות אזוריות.',
          en: "Among Ethiopian-origin 12th-grade graduates (2023/24), 57.7% continue to BA studies at academic colleges — higher than the 39.1% rate across all Hebrew-medium education. Likely linked to the accessibility of regional colleges.",
          am: "ከኢትዮጵያ ምንጭ 12ኛ ክፍል ተመራቂዎች (2023/24)፣ 57.7% ወደ BA ትምህርት በአካዳሚክ ኮሌጆች ይቀጥላሉ — ከ39.1% ጠቅላላ በላይ።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "university-ba-students",
        heading: {
          he: "סטודנטים לתואר ראשון באוניברסיטאות",
          en: "University BA students",
          am: "የዩኒቨርሲቲ BA ተማሪዎች",
        },
        figure: { he: "4,151", en: "4,151", am: "4,151" },
        context: {
          he: 'בתשפ"ה (2024/25) לומדים 4,151 סטודנטים יוצאי אתיופיה לתואר ראשון באוניברסיטאות בישראל — מתוכם 534 סטודנטים לשנה ראשונה.',
          en: "In the 2024/25 academic year, 4,151 Ethiopian-origin students study for a BA at Israeli universities — 534 of them first-year students.",
          am: "በ2024/25 የትምህርት ዓመት፣ 4,151 የኢትዮጵያ ምንጭ ተማሪዎች በእስራኤል ዩኒቨርሲቲዎች BA ያጠናሉ — 534 ከነሱ 1ኛ ዓመት ተማሪዎች።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2025,
      },
      {
        id: "higher-ed-growth-trend",
        heading: {
          he: "מגמת גידול בהשכלה גבוהה — 7 שנים",
          en: "Higher-education growth trend — 7 years",
          am: "የከፍተኛ ትምህርት እድገት አዝማሚያ — 7 ዓመታት",
        },
        figure: {
          he: "3,194 ← 4,144 (+29.7%)",
          en: "3,194 → 4,144 (+29.7%)",
          am: "3,194 → 4,144 (+29.7%)",
        },
        context: {
          he: 'מספר הסטודנטים יוצאי אתיופיה במוסדות להשכלה גבוהה גדל מ-3,194 (תשע"ז, 2016/17) ל-4,144 (תשפ"ד, 2023/24) — עלייה של 29.7% על פני 7 שנים, לעומת 3.9% בלבד בקרב שאר הסטודנטים היהודים והאחרים.',
          en: "The number of Ethiopian-origin students in higher education grew from 3,194 (2016/17) to 4,144 (2023/24) — a 29.7% increase over 7 years, versus just 3.9% among other Jewish-and-other students.",
          am: "የኢትዮጵያ ምንጭ ተማሪዎች ብዛት በከፍተኛ ትምህርት ከ3,194 (2016/17) ወደ 4,144 (2023/24) አድጓል — 29.7% ጭማሪ በ7 ዓመታት፣ ከ3.9% ጠቅላላ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2024" (371/2024, 26.11.2024)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2024/371/11_24_371b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "vocational-training",
        heading: {
          he: "תלמידים בקורסים להכשרות מקצועיות",
          en: "Students in vocational training courses",
          am: "በሙያ ስልጠና ኮርሶች ያሉ ተማሪዎች",
        },
        figure: { he: "986", en: "986", am: "986" },
        context: {
          he: "986 תלמידים ממוצא אתיופי בקורסים להכשרות מקצועיות ב-2024 — 2.3% מכלל הלומדים בהכשרות באותה שנה.",
          en: "986 Ethiopian-origin students enrolled in vocational training courses in 2024 — 2.3% of all vocational-training participants that year.",
          am: "986 የኢትዮጵያ ምንጭ ተማሪዎች በሙያ ስልጠና ኮርሶች በ2024 — 2.3% ከጠቅላላ ተሳታፊዎች።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
    ],
    narrative: {
      he: `## תמונת מצב

פערי ההישגים הלימודיים בין יוצאי אתיופיה לכלל האוכלוסייה היהודית מצטמצמים באיטיות אך באופן עקבי לאורך זמן — הן בשיעורי הגשה לבחינות הבגרות והן בהמשך ללימודים אקדמיים, אם כי פער משמעותי עדיין קיים בזכאות לבגרות העומדת בדרישות הסף של האוניברסיטאות (נתון עדכני לפער הזה טרם אותר — ראו הערת מתודולוגיה למטה).

## נקודה מעניינת: יתרון במכללות אקדמיות

בניגוד למצופה, בקרב יוצאי אתיופיה יש נטייה **גבוהה יותר** יחסית להמשך לימודים במכללות אקדמיות (57.7%) בהשוואה לכלל הציבור (39.1%) — מגמה שקשורה כנראה להיצע ולנגישות של מכללות אזוריות בערים בהן מתגוררת הקהילה.

## הקשר היסטורי (למגמה בלבד — לא נתון עדכני)

בשנת 2017 עמד שיעור הזכאות לבגרות על כ-62% בקרב יוצאי אתיופיה לעומת 79% בכלל החינוך העברי (הלמ"ס, לקט נתונים לחג הסיגד 2018, כפי שצוטט ב-ynet). הנתון הזה **ישן ולא לשימוש כמספר נוכחי** — הוא מובא כאן רק כנקודת-ייחוס להמחשת מגמת השיפור לאורך זמן, ולא כמדד לשנת 2024/25.

## הערת מתודולוגיה

לא אותר נתון עדכני (2023-2025) לשיעור זכאות לבגרות "העומדת בדרישות הסף של האוניברסיטאות" בלבד (להבדיל משיעור "ניגשים לבחינות" המוצג למעלה) — הלמ"ס בפרסומי הסיגד האחרונים מדגישה שיעור ניגשים והמשך למכללות אקדמיות, אך לא פרסמה בבירור את שיעור הזכאות התואם דרישות-סף אוניברסיטה לשנה הנוכחית. איננו מציגים כאן מספר מוערך.`,
      en: `## Snapshot

Achievement gaps between Ethiopian-Israelis and the general Jewish population are narrowing slowly but consistently over time — both in matriculation exam-taking rates and in continuation to academic studies — though a meaningful gap likely still exists in eligibility for a matriculation certificate that meets university entrance thresholds (no current figure for this specific gap was found — see the methodology note below).

## An interesting reversal: an edge at academic colleges

Contrary to what one might expect, Ethiopian-Israelis show a **higher** relative rate of continuation to academic colleges (57.7%) compared to the general public (39.1%) — a trend likely linked to the availability and accessibility of regional colleges in cities where the community is concentrated.

## Historical context (trend only — not a current figure)

In 2017, the matriculation-eligibility rate stood at about 62% among Ethiopian-Israelis versus 79% across all Hebrew-medium education (CBS, 2018 Sigd data digest, as cited by Ynet). This figure is **outdated and should not be used as a current number** — it's included here only as a reference point illustrating the improvement trend over time, not as a 2024/25 measure.

## Methodology note

No current figure (2023-2025) was found for the rate of matriculation eligibility that specifically meets university entrance thresholds (as distinct from the "exam-taking rate" shown above) — CBS's recent Sigd publications emphasize exam-taking and continuation to academic colleges, but have not clearly published the entrance-threshold eligibility rate for the current year. We do not present an estimated number here.`,
      am: `## አጠቃላይ እይታ

በኢትዮጵያ-እስራኤላውያንና በጠቅላላ የአይሁድ ህዝብ መካከል ያለው የትምህርት ስኬት ልዩነት በዝግታ ግን ወጥ በሆነ መንገድ እየጠበበ ነው — በማትሪክ ፈተና ተሳታፊነትም ሆነ ወደ አካዳሚክ ትምህርት በመቀጠል። ነገር ግን ለዩኒቨርሲቲ መግቢያ መስፈርት የሚያሟላ የማትሪክ ብቃት ላይ ጉልህ ልዩነት ገና አለ ሊሆን ይችላል (ለዚህ የተለየ ልዩነት የቅርብ ጊዜ አሃዝ አልተገኘም)።

## አስደሳች ግኝት: በአካዳሚክ ኮሌጆች ብልጫ

የኢትዮጵያ-እስራኤላውያን ወደ አካዳሚክ ኮሌጆች የመቀጠል መጠን (57.7%) ከጠቅላላው ህዝብ (39.1%) የበለጠ ነው — ይህ አዝማሚያ ማህበረሰቡ በሚኖርባቸው ከተሞች ካሉ የክልል ኮሌጆች ተደራሽነት ጋር የተያያዘ ሊሆን ይችላል።

## ታሪካዊ አውድ (ለአዝማሚያ ብቻ — የቅርብ ጊዜ አሃዝ አይደለም)

በ2017፣ የማትሪክ ብቃት መጠን በኢትዮጵያ-እስራኤላውያን ~62% ነበር፣ ከጠቅላላ 79% ጋር ሲነጻጸር። ይህ አሃዝ **ያረጀ ነው እና እንደ የቅርብ ጊዜ አሃዝ መጠቀም የለበትም** — እዚህ የቀረበው ለንፅፅር አዝማሚያ ማሳያ ብቻ ነው።

## የስልት ማስታወሻ

ለዩኒቨርሲቲ መግቢያ መስፈርት የሚያሟላ የማትሪክ ብቃት ልዩ መጠን የቅርብ ጊዜ (2023-2025) አሃዝ አልተገኘም። እዚህ የተገመተ ቁጥር አናቀርብም።`,
    },
  },

  // 3 — housing ---------------------------------------------------------
  // Verified against docs/research/2026-08-02-community-statistics-housing.md
  // (TED-99). CBS does NOT publish a standing "housing" table in the Sigd
  // digests (checked directly against 367/2025 and 371/2024 PDFs) — the
  // strongest quantitative source is the household-expenditure breakdown in
  // 371/2024 (data year 2022). The 60.5% homeownership figure is a single,
  // decade-old secondary source (Calcalist, citing a 2016 CBS survey) and is
  // shown ONLY as labeled historical context, per the research brief.
  {
    slug: "housing",
    name: { he: "דיור", en: "Housing", am: "መኖሪያ" },
    shortDescription: {
      he: "הוצאה על דיור, תוכניות סיוע ממשלתיות ובעלות על דירה — מצב הדיור המאומת בקהילה.",
      en: "Housing expenditure, government assistance programs, and homeownership — verified housing status in the community.",
      am: "በመኖሪያ ላይ ወጪ፣ የመንግስት ድጋፍ ፕሮግራሞች — የተረጋገጠ የመኖሪያ ሁኔታ።",
    },
    figures: [
      {
        id: "housing-expenditure-share",
        heading: {
          he: "נתח ההוצאה על דיור מתוך תקציב הצריכה",
          en: "Housing expenditure share of the consumption budget",
          am: "ከፍጆታ በጀት ውስጥ በመኖሪያ ላይ የሚወጣ ድርሻ",
        },
        figure: { he: "26.7% מול 24.8%", en: "26.7% vs 24.8%", am: "26.7% vs 24.8%" },
        context: {
          he: 'משקי בית של יוצאי אתיופיה מוציאים 3,475 ש"ח בחודש על דיור — 26.7% מתקציב הצריכה שלהם, לעומת 4,362 ש"ח (24.8%) בכלל האוכלוסייה. נתח יחסי גבוה יותר על סכום מוחלט נמוך יותר.',
          en: 'Ethiopian-origin households spend ₪3,475/month on housing — 26.7% of their consumption budget, versus ₪4,362 (24.8%) for the general population. A higher relative share on a lower absolute amount.',
          am: "የኢትዮጵያ ምንጭ ቤተሰቦች በወር 3,475 ₪ በመኖሪያ ላይ ያወጣሉ — 26.7% ከፍጆታ በጀታቸው፣ ከ4,362 ₪ (24.8%) ጠቅላላ ህዝብ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2024" (371/2024, 26.11.2024)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2024/371/11_24_371b.pdf",
        },
        publishedYear: 2022,
      },
      {
        id: "household-income-expenditure",
        heading: {
          he: "הכנסה והוצאה כספית למשק בית",
          en: "Household income and expenditure",
          am: "የቤተሰብ ገቢ እና ወጪ",
        },
        figure: { he: '16,295 ש"ח הכנסה ברוטו', en: "₪16,295 gross income", am: "16,295 ₪ ገቢ" },
        context: {
          he: 'הכנסה ברוטו למשק בית: 16,295 ש"ח (יוצאי אתיופיה) לעומת 22,013 ש"ח (כלל האוכלוסייה); הכנסה נטו: 14,676 לעומת 18,237; הוצאה לנפש: 2,749 לעומת 4,580 ש"ח — פער הכנסה משמעותי שמסביר את נתח ההוצאה הגבוה יותר על דיור.',
          en: "Gross household income: ₪16,295 (Ethiopian-origin) vs ₪22,013 (general population); net income: ₪14,676 vs ₪18,237; per-capita expenditure: ₪2,749 vs ₪4,580 — a substantial income gap that helps explain the higher housing-expenditure share.",
          am: "የቤተሰብ ገቢ: 16,295 ₪ (የኢትዮጵያ ምንጭ) ከ22,013 ₪ (ጠቅላላ ህዝብ) ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2024" (371/2024, 26.11.2024)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2024/371/11_24_371b.pdf",
        },
        publishedYear: 2022,
      },
      {
        id: "homeownership-historical",
        heading: {
          he: "שיעור בעלות על דירה (נתון היסטורי)",
          en: "Homeownership rate (historical figure)",
          am: "የቤት ባለቤትነት መጠን (ታሪካዊ አሃዝ)",
        },
        figure: { he: "60.5%", en: "60.5%", am: "60.5%" },
        context: {
          he: "60.5% מיוצאי אתיופיה (עולים) התגוררו בדירה בבעלותם, לעומת ממוצע ארצי כולל של 67.6% (67.3% כלל היהודים, 78.3% הציבור הערבי). זהו הנתון היחיד שאותר, ומקורו סקר הלמ״ס משנת 2016 בלבד — לא אותר עדכון.",
          en: "60.5% of Ethiopian-origin olim lived in an owned home, versus a national average of 67.6% (67.3% of all Jews, 78.3% of the Arab public). This is the only figure located, and it comes from a single 2016 CBS survey — no update was found.",
          am: "60.5% የኢትዮጵያ ምንጭ ሰዎች የራሳቸው ቤት ነበራቸው፣ ከ67.6% ጠቅላላ ህዝብ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'כלכליסט, "רוכשים דירות, אבל ממשיכים לגור בשכירות" (7.12.2017), מצטט סקר הלמ"ס 2016',
          url: "https://www.calcalist.co.il/real_estate/articles/0,7340,L-3726835,00.html",
        },
        publishedYear: 2016,
        confidenceNote: {
          he: "נתון משנת 2016 בלבד, ממקור משני — כמעט עשור ישן. אין להציג כנתון נוכחי.",
          en: "A single 2016 figure from a secondary source — nearly a decade old. Not a current figure.",
          am: "የ2016 ብቻ አሃዝ ከሁለተኛ ምንጭ — ወደ አስር ዓመት ያረጀ። እንደ የአሁን አሃዝ አይቆጠርም።",
        },
      },
      {
        id: "homesh-mortgage-program",
        heading: {
          he: 'תוכנית "חומש" — משכנתא מסובסדת',
          en: '"Chomesh" program — subsidized mortgage',
          am: '"ቾሜሽ" ፕሮግራም — የተደገፈ ሞርጌጅ',
        },
        figure: { he: 'עד 600,000 ש"ח', en: "Up to ₪600,000", am: "እስከ 600,000 ₪" },
        context: {
          he: 'הלוואת דיור עד 600,000 ש"ח ל-25 שנה (10 שנים ראשונות ללא ריבית, 15 נוספות בריבית 2%) לזוגות שבהם לפחות אחד מבני הזוג יליד אתיופיה, לרכישת דירה ראשונה. תקציב מוקצה: כ-120 מיליון ש"ח בשנה. פועלת מסוף 2016 עד היום.',
          en: "A housing loan of up to ₪600,000 over 25 years (10 interest-free years, then 15 years at 2%) for couples where at least one spouse was born in Ethiopia, for a first home purchase. Allocated budget: about ₪120M/year. Active since late 2016.",
          am: "እስከ 600,000 ₪ የቤት ብድር ለ25 ዓመታት፣ ቢያንስ አንድ ጋብቻ አጋር በኢትዮጵያ ለተወለደ ጥንዶች።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "נתונים על יוצאי אתיופיה וסקירת תוכניות סיוע בדיור" (10.8.2025)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf",
        },
        publishedYear: 2025,
      },
      {
        id: "housing-grants-olim",
        heading: {
          he: "מענקי דיור לעולים מאתיופיה",
          en: "Housing grants for olim from Ethiopia",
          am: "ከኢትዮጵያ ለመጡ ስደተኞች የቤት ድጋፍ",
        },
        figure: {
          he: '235,000–650,000 ש"ח',
          en: "₪235,000–650,000",
          am: "235,000–650,000 ₪",
        },
        context: {
          he: 'מענק דיור לעולים היוצאים ממרכזי/אתרי קליטה, בין 235,000 ש"ח (זוג ללא ילדים) ל-650,000 ש"ח (זוג עם 9+ ילדים) — לפי הרכב המשפחה. התוכנית בתוקף עד סוף 2031.',
          en: "A housing grant for olim leaving absorption centers, ranging from ₪235,000 (a couple with no children) to ₪650,000 (a couple with 9+ children) — based on family composition. The program runs through the end of 2031.",
          am: "የቤት ድጋፍ ከ235,000 ₪ እስከ 650,000 ₪ በቤተሰብ ስብጥር መሰረት፣ እስከ 2031 መጨረሻ ድረስ በስራ ላይ።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "נתונים על יוצאי אתיופיה וסקירת תוכניות סיוע בדיור" (10.8.2025)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf",
        },
        publishedYear: 2022,
      },
      {
        id: "urban-renewal-program",
        heading: {
          he: "תוכנית התחדשות עירונית ממוקדת",
          en: "Targeted urban renewal program",
          am: "የተለየ የከተማ ዳግም-ግንባታ ፕሮግራም",
        },
        figure: {
          he: 'תקציב 120 מיליון ש"ח / 5 שנים',
          en: "₪120M budget / 5 years",
          am: "120 ሚሊዮን ₪ / 5 ዓመታት",
        },
        context: {
          he: 'תוכנית התחדשות עירונית בשכונות עם ריכוז גבוה של יוצאי אתיופיה — תקציב כולל של 120 מיליון ש"ח על פני 5 שנים (2016–2021), במימון שווה של משרד הבינוי והשיכון ומשרד האוצר. יעדים: שכונות בנתניה, רחובות וראשון לציון.',
          en: "An urban renewal program in neighborhoods with a high concentration of Ethiopian-origin residents — a total budget of ₪120M over 5 years (2016-2021), jointly funded by the Ministry of Construction and Housing and the Ministry of Finance. Targets: neighborhoods in Netanya, Rehovot, and Rishon LeZion.",
          am: "የከተማ ዳግም-ግንባታ ፕሮግራም በኢትዮጵያ ምንጭ ነዋሪዎች ከፍተኛ ስብስብ ባላቸው አካባቢዎች — 120 ሚሊዮን ₪ በ5 ዓመታት።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "נתונים על יוצאי אתיופיה וסקירת תוכניות סיוע בדיור" (10.8.2025)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf",
        },
        publishedYear: 2016,
      },
    ],
    barChart: {
      heading: {
        he: "נתח ההוצאה על דיור מתוך תקציב הצריכה",
        en: "Housing expenditure share of the consumption budget",
        am: "ከፍጆታ በጀት ውስጥ በመኖሪያ ላይ የሚወጣ ድርሻ",
      },
      items: [
        {
          label: { he: "יוצאי אתיופיה", en: "Ethiopian-origin", am: "የኢትዮጵያ ምንጭ" },
          valuePercent: 26.7,
        },
        {
          label: { he: "כלל האוכלוסייה", en: "General population", am: "ጠቅላላ ህዝብ" },
          valuePercent: 24.8,
        },
      ],
      source: {
        name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2024" (371/2024, 26.11.2024)',
        url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2024/371/11_24_371b.pdf",
      },
    },
    narrative: {
      he: `## תמונת מצב

בניגוד לדמוגרפיה וחינוך, הלמ"ס אינה מפרסמת טבלת "דיור" קבועה בלקט הנתונים השנתי לחג הסיגד. הנתון הכמותי החזק ביותר שאותר הוא נתח ההוצאה על דיור מתוך תקציב משק הבית: משקי בית של יוצאי אתיופיה מוציאים 26.7% מתקציב הצריכה שלהם על דיור (3,475 ש"ח בחודש) — נתח גבוה יותר מ-24.8% בכלל האוכלוסייה (4,362 ש"ח), למרות סכום מוחלט נמוך יותר. הפער נובע בעיקר מהכנסה נמוכה יותר: הכנסה ברוטו של 16,295 ש"ח למשק בית לעומת 22,013 ש"ח בכלל האוכלוסייה.

## מה המדינה מציעה

המדינה מפעילה מספר תוכניות סיוע ייעודיות לרכישת דירה: תוכנית "חומש" מציעה הלוואת דיור של עד 600,000 ש"ח ל-25 שנה (10 שנים ראשונות ללא ריבית) לזוגות שבהם לפחות אחד מבני הזוג יליד אתיופיה; מענקי דיור בין 235,000 ל-650,000 ש"ח לעולים היוצאים ממרכזי קליטה (בתוקף עד 2031); ותוכנית התחדשות עירונית ממוקדת בהיקף 120 מיליון ש"ח על פני 5 שנים בשכונות עם ריכוז קהילתי בנתניה, רחובות וראשון לציון.

## הערת מתודולוגיה — שיעור בעלות על דירה

הנתון היחיד שאותר לשיעור בעלות על דירה בקרב יוצאי אתיופיה (60.5%) מגיע ממקור משני (כלכליסט) המצטט סקר הלמ"ס משנת **2016** — נתון בן כעשור. לא אותר עדכון עדכני מהלמ"ס. הנתון מוצג כאן אך ורק כהקשר היסטורי ואינו מייצג את המצב הנוכחי; באותה תקופה עמד הממוצע הארצי הכולל על 67.6%.`,
      en: `## Snapshot

Unlike demographics and education, CBS does not publish a standing "housing" table in its annual Sigd data digest. The strongest quantitative figure located is the housing-expenditure share of the household budget: Ethiopian-origin households spend 26.7% of their consumption budget on housing (₪3,475/month) — a higher share than the 24.8% national figure (₪4,362), despite a lower absolute amount. The gap mainly reflects lower income: gross household income of ₪16,295 versus ₪22,013 nationally.

## What the state offers

The state runs several dedicated home-purchase assistance programs: the "Chomesh" program offers a housing loan of up to ₪600,000 over 25 years (the first 10 years interest-free) for couples where at least one spouse was born in Ethiopia; housing grants of ₪235,000-650,000 for olim leaving absorption centers (through 2031); and a targeted urban renewal program worth ₪120M over 5 years in neighborhoods with community concentration in Netanya, Rehovot, and Rishon LeZion.

## Methodology note — homeownership rate

The only figure located for the Ethiopian-origin homeownership rate (60.5%) comes from a secondary source (Calcalist) citing a **2016** CBS survey — nearly a decade old. No current update was found. It is shown here only as historical context and does not represent the current situation; the national average at the time was 67.6%.`,
      am: `## አጠቃላይ እይታ

ከስነ-ህዝብ እና ትምህርት በተለየ፣ የእስራኤል ማዕከላዊ ስታቲስቲክስ ቢሮ (הלמ"ס) በየዓመቱ የሲግድ የመረጃ ስብስብ ውስጥ ቋሚ "የመኖሪያ" ሠንጠረዥ አያትምም። የተገኘው ጠንካራ አሃዝ የመኖሪያ ወጪ ድርሻ ነው፦ የኢትዮጵያ ምንጭ ቤተሰቦች 26.7% ከፍጆታ በጀታቸው በመኖሪያ ላይ ያወጣሉ (3,475 ₪ በወር) — ከ24.8% ጠቅላላ ህዝብ (4,362 ₪) የበለጠ ድርሻ፣ ምንም እንኳን ዝቅተኛ ፍጹም መጠን ቢሆንም። ልዩነቱ በዋናነት ከዝቅተኛ ገቢ የመጣ ነው፦ 16,295 ₪ የቤተሰብ ገቢ ከ22,013 ₪ ጠቅላላ ህዝብ ጋር ሲነጻጸር።

## መንግስት ምን ያቀርባል

መንግስት በርካታ የቤት ግዢ ድጋፍ ፕሮግራሞችን ያንቀሳቅሳል፦ "ቾሜሽ" ፕሮግራም እስከ 600,000 ₪ የቤት ብድር ለ25 ዓመታት (የመጀመሪያዎቹ 10 ዓመታት ወለድ የለሽ) ለጥንዶች ቢያንስ አንዱ በኢትዮጵያ ለተወለደ ያቀርባል፤ የቤት ድጋፍ ከ235,000 እስከ 650,000 ₪ ለስደተኞች (እስከ 2031)፤ እና የከተማ ዳግም-ግንባታ ፕሮግራም 120 ሚሊዮን ₪ በ5 ዓመታት በነታኒያ፣ ረሆቮት እና ሪሾን ለጽዮን።

## የስልት ማስታወሻ — የቤት ባለቤትነት መጠን

የተገኘው ብቸኛ አሃዝ ለኢትዮጵያ ምንጭ የቤት ባለቤትነት መጠን (60.5%) ከሁለተኛ ምንጭ (ካልካሊስት) የመጣ ሲሆን የ**2016** የLAምስ ጥናትን ይጠቅሳል — ወደ አስር ዓመት ያረጀ። የቅርብ ጊዜ ዝማኔ አልተገኘም። እዚህ የቀረበው እንደ ታሪካዊ አውድ ብቻ ነው እና የአሁኑን ሁኔታ አይወክልም፤ በወቅቱ ብሔራዊ አማካይ 67.6% ነበር።`,
    },
  },

  // 4 — health ---------------------------------------------------------
  // Verified against docs/research/2026-08-02-community-statistics-health.md
  // (TED-99). Primary source: Knesset Research and Information Center,
  // "Data on the health status of Ethiopian-Israelis" (10.7.2024), which
  // directly quotes official Ministry of Health responses (May 2024) and CBS
  // data. Per the brief's explicit instruction, 1990s HIV figures are NOT
  // included — sensitive historical data requiring product/owner sign-off
  // that was not obtained. Chronic-disease figures (diabetes/hypertension)
  // are academic-study-based, not a national registry — the Ministry of
  // Health confirmed no such registry exists by country of birth; this is
  // disclosed via confidenceNote on each affected figure.
  {
    slug: "health",
    name: { he: "בריאות", en: "Health", am: "ጤና" },
    shortDescription: {
      he: "תוחלת חיים, תמותת תינוקות, מחלות כרוניות ובריאות הנפש — נתוני בריאות מאומתים בקהילה.",
      en: "Life expectancy, infant mortality, chronic disease, and mental health — verified health data in the community.",
      am: "የህይወት ዕድሜ፣ ሥር የሰደደ በሽታ — የተረጋገጠ የጤና መረጃ።",
    },
    figures: [
      {
        id: "life-expectancy",
        heading: { he: "תוחלת חיים בלידה", en: "Life expectancy at birth", am: "የህይወት ዕድሜ" },
        figure: { he: "83.8", en: "83.8", am: "83.8" },
        context: {
          he: "תוחלת חיים בלידה: 83.8 שנים ליוצאי אתיופיה, לעומת 83.4 ליהודים ואחרים ו-82.8 בכלל האוכלוסייה (ממוצע 2020-2022). הלמ״ס עצמה מציינת שההבדל בעל מובהקות גבולית בלבד, בשל אוכלוסייה קטנה ורווח סמך רחב — אין להציג כ״קהילה חיה יותר שנים״ ללא ההסתייגות.",
          en: "Life expectancy at birth: 83.8 years for Ethiopian-origin Israelis, versus 83.4 for Jews-and-others and 82.8 for the general population (2020-2022 average). CBS itself notes the difference has only borderline statistical significance, given the small population and wide confidence interval — this should not be presented as \"the community lives longer\" without that caveat.",
          am: "የህይወት ዕድሜ: 83.8 ዓመታት ለኢትዮጵያ ምንጭ፣ ከ82.8 ጠቅላላ ህዝብ ጋር ሲነጻጸር (2020-2022 አማካይ)።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "נתונים על מצב הבריאות של יוצאי אתיופיה" (10.7.2024)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf",
        },
        publishedYear: 2022,
        confidenceNote: {
          he: "הלמ״ס מציינת מובהקות סטטיסטית גבולית בלבד (אוכלוסייה קטנה, רווח סמך רחב).",
          en: "CBS notes only borderline statistical significance (small population, wide confidence interval).",
          am: "የLAምስ ብቻ ድንበር ላይ ያለ ስታቲስቲካዊ ትርጉም ያመለክታል።",
        },
      },
      {
        id: "infant-mortality",
        heading: { he: "שיעור תמותת תינוקות", en: "Infant mortality rate", am: "የህጻናት ሞት መጠን" },
        figure: { he: "2.2 ל-1,000", en: "2.2 per 1,000", am: "2.2 በ1,000" },
        context: {
          he: "2.2 פטירות ל-1,000 לידות חי בקרב תינוקות לאם ילידת אתיופיה (או ילידת ישראל שאביה יליד אתיופיה) — נמוך מהשיעור בכלל האוכלוסייה (2.7) ומעט גבוה מיהודים ואחרים (1.9). ממוצע 2020-2022.",
          en: "2.2 deaths per 1,000 live births among infants born to a mother born in Ethiopia (or an Israeli-born mother whose father was born in Ethiopia) — lower than the general population rate (2.7) and slightly above Jews-and-others (1.9). 2020-2022 average.",
          am: "2.2 ሞት በ1,000 ህያው ልደት ለኢትዮጵያ ምንጭ እናቶች ልጆች።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "נתונים על מצב הבריאות של יוצאי אתיופיה" (10.7.2024)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf",
        },
        publishedYear: 2022,
      },
      {
        id: "suicide-mortality",
        heading: {
          he: "שיעור פטירות בגין פגיעה עצמית מכוונת",
          en: "Deaths due to intentional self-harm",
          am: "ራስን ከመጉዳት የተነሳ ሞት",
        },
        figure: { he: "8.4 ל-100,000", en: "8.4 per 100,000", am: "8.4 በ100,000" },
        context: {
          he: "8.4 פטירות ל-100,000 תושבים יוצאי אתיופיה ב-2022, לעומת 3.7 בכלל האוכלוסייה — יותר מפי 2. ב-2021 (שנה חריגה) הפער היה גדול אף יותר: 16.1 לעומת 4.2. זהו הפער הבריאותי המתועד והעקבי ביותר לאורך זמן (מ-2009 ועד 2023) בקרב יוצאי אתיופיה, וראוי להדגשה זהירה ולא סנסציוניסטית, לצד מידע על שירותי תמיכה זמינים.",
          en: "8.4 deaths per 100,000 Ethiopian-origin residents in 2022, versus 3.7 in the general population — more than double. In 2021 (an outlier year) the gap was even larger: 16.1 versus 4.2. This is the most consistently documented health gap over time (2009-2023) in the community, and warrants careful, non-sensationalist coverage alongside information on available support services.",
          am: "8.4 ሞት በ100,000 የኢትዮጵያ ምንጭ ነዋሪዎች በ2022፣ ከ3.7 ጠቅላላ ህዝብ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, מצוטט ב: מרכז המחקר והמידע של הכנסת (10.7.2024)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf",
        },
        publishedYear: 2022,
      },
      {
        id: "diabetes-prevalence",
        heading: {
          he: "שכיחות סוכרת",
          en: "Diabetes prevalence",
          am: "የስኳር በሽታ",
        },
        figure: { he: "3.6% מול 2.7%", en: "3.6% vs 2.7%", am: "3.6% vs 2.7%" },
        context: {
          he: "3.6% מיוצאי אתיופיה מאובחנים עם סוכרת, לעומת 2.7% בכלל האוכלוסייה היהודית (2018). משרד הבריאות מסר במפורש שאין לו רישום לאומי לסוכרת לפי ארץ לידה — הנתון מבוסס על מחקר נקודתי, לא מרשם רשמי מלא.",
          en: "3.6% of Ethiopian-origin Israelis are diagnosed with diabetes, versus 2.7% in the general Jewish population (2018). The Ministry of Health explicitly stated it has no national diabetes registry by country of birth — this figure is based on a specific study, not a full official registry.",
          am: "3.6% የኢትዮጵያ ምንጭ ሰዎች በስኳር በሽታ ተመርምረዋል፣ ከ2.7% ጠቅላላ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'משרד הבריאות, "מצב הבריאות של יוצאי אתיופיה בישראל – 2018" (דצמבר 2019), מצוטט ב: מרכז המחקר והמידע של הכנסת (10.7.2024)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf",
        },
        publishedYear: 2018,
        confidenceNote: {
          he: "אין רישום לאומי רשמי — מבוסס מחקר נקודתי, לא סקר ארצי מייצג.",
          en: "No official national registry — based on a specific study, not a representative national survey.",
          am: "ኦፊሴላዊ ብሔራዊ መዝገብ የለም — በተለየ ጥናት ላይ የተመሰረተ።",
        },
      },
      {
        id: "diabetes-by-years-in-country",
        heading: {
          he: "שכיחות סוכרת לפי שנות ותק בארץ",
          en: "Diabetes prevalence by years in the country",
          am: "የስኳር በሽታ በሀገር ውስጥ በቆዩባቸው ዓመታት",
        },
        figure: { he: "0.4% ← 17.6%", en: "0.4% → 17.6%", am: "0.4% → 17.6%" },
        context: {
          he: "שכיחות סוכרת עולה בחדות עם הזמן שחלף מאז העלייה: 0.4% בעת העלייה, 8.6% אחרי 4 שנים, 9.6% אחרי 7 שנים, ו-17.6% אחרי 10-16 שנים בארץ — מגמה המיוחסת לשינויים תזונתיים ואורח חיים. מבוסס מחקרים נקודתיים, לא רישום רשמי.",
          en: "Diabetes prevalence rises sharply with years since immigration: 0.4% at the time of aliyah, 8.6% after 4 years, 9.6% after 7 years, and 17.6% after 10-16 years in the country — a trend attributed to dietary and lifestyle changes. Based on specific studies, not an official registry.",
          am: "የስኳር በሽታ ስደት ከሆነ በኋላ በዓመታት ውስጥ በከፍተኛ ሁኔታ ይጨምራል: 0.4% ወደ 17.6%።",
        },
        source: {
          name: 'משרד הבריאות, "צמצום פערים בגורמי הסיכון לתחלואה כרונית ובתחלואה כרונית, בדגש על סוכרת" (31.12.2023), מצוטט ב: מרכז המחקר והמידע של הכנסת (10.7.2024)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf",
        },
        publishedYear: 2023,
        confidenceNote: {
          he: "מבוסס מחקרים נקודתיים (לא צוינו שנות המחקר המדויקות), לא רישום לאומי.",
          en: "Based on specific studies (exact study years not specified in the source), not a national registry.",
          am: "በተለዩ ጥናቶች ላይ የተመሰረተ፣ ብሔራዊ መዝገብ አይደለም።",
        },
      },
      {
        id: "mammography-screening",
        heading: {
          he: "שיעורי ביצוע בדיקות ממוגרפיה",
          en: "Mammography screening rate",
          am: "የማሞግራፊ ምርመራ መጠን",
        },
        figure: { he: "67%–69%", en: "67%-69%", am: "67%-69%" },
        context: {
          he: "67%-69% מילידות אתיופיה בגילי 50-74 ביצעו בדיקת ממוגרפיה, לעומת 70%-72% בקרב יהודיות ממוצא אחר — פער קטן יחסית, קרוב ליעד הלאומי (70%).",
          en: "67%-69% of Ethiopia-born women aged 50-74 underwent mammography screening, versus 70%-72% among Jewish women of other origins — a relatively small gap, close to the national target (70%).",
          am: "67%-69% ከኢትዮጵያ የተወለዱ ሴቶች ዕድሜ 50-74 የማሞግራፊ ምርመራ አድርገዋል።",
        },
        source: {
          name: 'משרד הבריאות, מצוטט ב: מרכז המחקר והמידע של הכנסת (10.7.2024)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf",
        },
        publishedYear: 2022,
      },
      {
        id: "household-health-expenditure",
        heading: {
          he: "הוצאה חודשית ממוצעת על בריאות למשק בית",
          en: "Average monthly household health expenditure",
          am: "አማካይ ወርሃዊ የቤተሰብ የጤና ወጪ",
        },
        figure: { he: '617 ש"ח', en: "₪617", am: "617 ₪" },
        context: {
          he: 'משקי בית של יוצאי אתיופיה מוציאים 617 ש"ח בחודש על בריאות (4.7% מסך ההוצאה לתצרוכת), לעומת 1,133 ש"ח (6.4%) בכלל משקי הבית.',
          en: "Ethiopian-origin households spend ₪617/month on health (4.7% of consumption expenditure), versus ₪1,133 (6.4%) for the general population.",
          am: "የኢትዮጵያ ምንጭ ቤተሰቦች 617 ₪ በወር በጤና ላይ ያወጣሉ።",
        },
        source: {
          name: 'הלמ"ס, סקר הוצאות משק הבית 2022, מצוטט ב-"לקט נתונים לרגל חג הסיגד 2024" (371/2024)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2024/371/11_24_371b.pdf",
        },
        publishedYear: 2022,
      },
    ],
    barChart: {
      heading: {
        he: "שכיחות סוכרת לפי שנות ותק בארץ",
        en: "Diabetes prevalence by years in the country",
        am: "የስኳር በሽታ በሀገር ውስጥ በቆዩባቸው ዓመታት",
      },
      items: [
        { label: { he: "בעת העלייה", en: "At time of aliyah", am: "ወደ ሀገር ሲገቡ" }, valuePercent: 0.4 },
        { label: { he: "אחרי 4 שנים", en: "After 4 years", am: "ከ4 ዓመታት በኋላ" }, valuePercent: 8.6 },
        { label: { he: "אחרי 7 שנים", en: "After 7 years", am: "ከ7 ዓመታት በኋላ" }, valuePercent: 9.6 },
        {
          label: { he: "אחרי 10-16 שנים", en: "After 10-16 years", am: "ከ10-16 ዓመታት በኋላ" },
          valuePercent: 17.6,
        },
      ],
      source: {
        name: 'משרד הבריאות, "צמצום פערים בגורמי הסיכון לתחלואה כרונית" (31.12.2023), מצוטט ב: מרכז המחקר והמידע של הכנסת (10.7.2024)',
        url: "https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf",
      },
    },
    narrative: {
      he: `## תמונת מצב

תוחלת החיים בקרב יוצאי אתיופיה (83.8 שנים) קרובה לתוחלת החיים בכלל האוכלוסייה (82.8) — אך הלמ"ס עצמה מדגישה שההבדל בעל מובהקות סטטיסטית גבולית בלבד, בשל גודל אוכלוסייה קטן יחסית. שיעור תמותה כללי מתוקנן לגיל כמעט זהה לכלל האוכלוסייה (4.69 לעומת 4.92 ל-1,000).

## הפער הבריאותי המתועד ביותר: התאבדות ופגיעה עצמית

שיעור הפטירות בגין פגיעה עצמית מכוונת בקרב יוצאי אתיופיה (8.4 ל-100,000 ב-2022) גבוה מפי 2 מכלל האוכלוסייה (3.7) — ובשנים חריגות (כמו 2021) הפער מגיע כמעט לפי 4. זהו הפער העקבי ביותר לאורך זמן, מ-2009 ועד 2023, ומחייב התייחסות זהירה, לא סנסציוניסטית, לצד הפניה למשאבי תמיכה.

## מחלות כרוניות — הסתייגות חשובה

משרד הבריאות מסר במפורש שאין לו רישום לאומי רשמי לסוכרת, יתר לחץ דם או השמנת יתר לפי ארץ לידה — כל הנתונים בפרק זה (למשל שכיחות סוכרת של 3.6% לעומת 2.7%, ומגמת העלייה החדה מ-0.4% בעת העלייה ל-17.6% אחרי 10-16 שנה בארץ) מבוססים על מחקרים אקדמיים נקודתיים, לרוב מבוססי נתוני צה"ל, ולא על סקר ארצי מייצג עדכני. אין להציג אותם כ"נתון רשמי ומקיף".

## מה לא כלול בעמוד זה — במכוון

בהתאם להנחיית המחקר, עמוד זה **אינו כולל נתונים אפידמיולוגיים רגישים במיוחד מתקופת שנות ה-90** שאותרו במהלך המחקר. נתונים אלה היסטוריים מובהקים ורגישים ביותר, ופרסומם דורש אישור מפורש שלא ניתן — לכן הוחלט להשמיטם לחלוטין מהעמוד הציבורי.`,
      en: `## Snapshot

Life expectancy among Ethiopian-origin Israelis (83.8 years) is close to the general population's (82.8) — but CBS itself stresses that the difference has only borderline statistical significance, given the relatively small population. The age-adjusted overall mortality rate is nearly identical to the general population (4.69 vs 4.92 per 1,000).

## The most consistently documented gap: suicide and self-harm

The rate of deaths from intentional self-harm among Ethiopian-origin Israelis (8.4 per 100,000 in 2022) is more than double the general population's (3.7) — and in outlier years (like 2021) the gap reaches nearly 4x. This is the most consistent gap over time, from 2009 to 2023, and warrants careful, non-sensationalist coverage alongside references to support resources.

## Chronic disease — an important caveat

The Ministry of Health explicitly stated it has no official national registry for diabetes, hypertension, or obesity by country of birth — all figures in this section (e.g. a 3.6% vs 2.7% diabetes prevalence, and the sharp rise from 0.4% at aliyah to 17.6% after 10-16 years in the country) are based on specific academic studies, mostly IDF-based, not a current representative national survey. They should not be presented as an "official, comprehensive figure."

## What this page deliberately does not include

Per the research brief's explicit instruction, this page **does not include a certain category of especially sensitive epidemiological data from the 1990s** that surfaced during research. That data is clearly historical and highly sensitive, and publishing it requires explicit sign-off that was not obtained — so it has been fully omitted from this public page.`,
      am: `## አጠቃላይ እይታ

የኢትዮጵያ ምንጭ እስራኤላውያን የህይወት ዕድሜ (83.8 ዓመታት) ከጠቅላላ ህዝብ (82.8) ጋር ተቀራራቢ ነው — ነገር ግን የLAምስ ራሱ ልዩነቱ ድንበር ላይ ያለ ስታቲስቲካዊ ትርጉም ብቻ እንዳለው ያሰምርበታል፣ በአንጻራዊነት ትንሽ ህዝብ በመሆኑ።

## በጣም የተመዘገበው ልዩነት: ራስን ማጥፋት እና ራስን መጉዳት

የራስን ጉዳት ሞት መጠን በኢትዮጵያ ምንጭ ሰዎች (8.4 በ100,000 በ2022) ከጠቅላላ ህዝብ (3.7) ከሁለት እጥፍ በላይ ነው። ይህ ከ2009 እስከ 2023 በጣም ወጥ የሆነ ልዩነት ነው፣ በጥንቃቄ እና ደጋፊ በሆነ አካሄድ መታየት አለበት።

## ሥር የሰደደ በሽታ — አስፈላጊ ማስጠንቀቂያ

የጤና ጥበቃ ሚኒስቴር በሀገር መወለጃ መሰረት ለስኳር፣ ለደም ግፊት ወይም ለውፍረት ኦፊሴላዊ ብሔራዊ መዝገብ እንደሌለው በግልጽ ገልጿል — በዚህ ክፍል ያሉ ሁሉም አሃዞች በተለዩ የአካዳሚክ ጥናቶች ላይ የተመሰረቱ ናቸው፣ ብሔራዊ መዝገብ አይደሉም።

## በዚህ ገጽ ሆን ተብሎ ያልተካተተው

በምርምር ማብራሪያው መሰረት፣ ይህ ገጽ **በ1990ዎቹ የተገኘ በጣም ስሜታዊ የሆነ ኤፒዲሚዮሎጂያዊ መረጃ ምድብ አያካትትም**። ይህ መረጃ ግልጽ ታሪካዊ እና በጣም ስሜታዊ ነው፣ ህትመቱም ግልጽ ማጽደቅ ይጠይቃል ያልተገኘ — ስለዚህ ከዚህ ህዝባዊ ገጽ ሙሉ በሙሉ ተትቷል።`,
    },
  },

  // 5 — language -------------------------------------------------------
  // Verified against docs/research/2026-08-02-community-statistics-language.md
  // (TED-99). CRITICAL GAP (per research brief + task instructions): CBS
  // publishes ZERO language data in its Sigd digests (checked directly). The
  // only quantitative source found is a Myers-JDC-Brookdale survey fielded
  // Dec 2009-Jun 2010, published Dec 2012, covering ONLY first-generation
  // immigrants ("vatikim", 20+ years in Israel) — it does NOT cover the
  // ~47% of the community that is Israeli-born 2nd generation (per
  // demographics topic, TED-20). Every figure below carries a
  // confidenceNote disclosing this, and the narrative discloses it
  // prominently up front, per the task's explicit instruction. Kept
  // deliberately narrative-heavy with fewer stat cards than other topics,
  // per the brief's own recommendation.
  {
    slug: "language",
    name: { he: "שפה", en: "Language", am: "ቋንቋ" },
    shortDescription: {
      he: "עברית, אמהרית ותיגרינית — נתונים מאומתים, אך ישנים ומוגבלים לדור העולים בלבד (ראו הבהרה בעמוד).",
      en: "Hebrew, Amharic, and Tigrinya — verified data, but old and limited to the immigrant generation only (see the disclosure on this page).",
      am: "ዕብራይስጥ፣ አማርኛና ትግርኛ — የተረጋገጠ ግን ያረጀ መረጃ፣ ለስደተኛ ትውልድ ብቻ የተወሰነ።",
    },
    figures: [
      {
        id: "hebrew-self-rated-very-good",
        heading: {
          he: 'הערכה עצמית של שליטה בעברית — "טובה מאוד"',
          en: 'Self-rated Hebrew fluency — "very good"',
          am: "ራስ-ገምት ዕብራይስጥ ብቃት — “በጣም ጥሩ”",
        },
        figure: { he: "59%", en: "59%", am: "59%" },
        context: {
          he: '59% מיוצאי אתיופיה ה"ותיקים" (עלו לפני 1991, ותק 20+ שנה במועד הסקר) העריכו את שליטתם בעברית כ"טובה מאוד"; 18% נוספים כ"טובה" — סה"כ כ-77%. הנתון מתייחס לדור העולים בלבד.',
          en: 'Among "vatikim" Ethiopian-origin immigrants (arrived before 1991, 20+ years in Israel at the time of the survey), 59% rated their Hebrew fluency as "very good"; another 18% as "good" — about 77% combined. This figure covers the immigrant generation only.',
          am: "59% ራሳቸውን በዕብራይስጥ “በጣም ጥሩ” ብቃት ገምግመዋል።",
        },
        source: {
          name: 'מכון מאיירס-ג\'וינט-ברוקדייל, "לאחר עשרים שנה בישראל: סקר יוצאי אתיופיה הוותיקים" (טבת תשע"ג/דצמבר 2012), לוח 14',
          url: "https://brookdale-web.s3.amazonaws.com/uploads/2018/01/615-12-Ethiopian-Vatikim-HEB-REP-1.pdf",
        },
        publishedYear: 2010,
        confidenceNote: {
          he: 'סקר 2009-2010 (פורסם 2012), דור העולים ("ותיקים") בלבד — אינו כולל את הדור השני יליד הארץ.',
          en: '2009-2010 survey (published 2012), covers the immigrant ("vatikim") generation only — does not include the Israeli-born 2nd generation.',
          am: "የ2009-2010 ጥናት (2012 ታትሟል)፣ ለስደተኛ ትውልድ ብቻ — ሁለተኛ ትውልድን አያካትትም።",
        },
      },
      {
        id: "ulpan-attendance",
        heading: {
          he: "לימודי אולפן בקרב עולים בגיל בגרות",
          en: "Ulpan attendance among adult immigrants",
          am: "በአዋቂ ስደተኞች ዘንድ የኡልፓን ትምህርት",
        },
        figure: { he: "80%", en: "80%", am: "80%" },
        context: {
          he: "80% ממי שעלו אחרי גיל 18 למדו באולפן 6 חודשים לפחות לאחר ההגעה לישראל. האולפן קשור ישירות לשליטה טובה יותר בעברית (ראו הנתון הבא).",
          en: "80% of those who immigrated after age 18 attended ulpan for at least 6 months after arriving in Israel. Ulpan attendance is directly linked to better Hebrew fluency (see the next figure).",
          am: "80% ከ18 ዓመት በኋላ የመጡ ስደተኞች ቢያንስ ለ6 ወራት ኡልፓን ተምረዋል።",
        },
        source: {
          name: 'מכון מאיירס-ג\'וינט-ברוקדייל, "לאחר עשרים שנה בישראל: סקר יוצאי אתיופיה הוותיקים" (2012), עמ׳ 16',
          url: "https://brookdale-web.s3.amazonaws.com/uploads/2018/01/615-12-Ethiopian-Vatikim-HEB-REP-1.pdf",
        },
        publishedYear: 2010,
        confidenceNote: {
          he: 'סקר 2009-2010 (פורסם 2012), דור העולים בלבד — אין נתון עדכני לשיעור השלמת אולפן בעשור האחרון.',
          en: "2009-2010 survey (published 2012), immigrant generation only — no current figure for ulpan completion rates in the last decade was found.",
          am: "የ2009-2010 ጥናት (2012 ታትሟል)፣ ለስደተኛ ትውልድ ብቻ።",
        },
      },
      {
        id: "ulpan-effect-on-fluency",
        heading: {
          he: "אפקט האולפן על שליטה בעברית ליום-יום",
          en: "Effect of ulpan on everyday Hebrew fluency",
          am: "የኡልፓን ተጽዕኖ በዕለታዊ ዕብራይስጥ ብቃት",
        },
        figure: { he: "75% מול 40%", en: "75% vs 40%", am: "75% vs 40%" },
        context: {
          he: '75% ממי שלמדו באולפן דיווחו על עברית "מספיקה למדי/בהחלט" ליום-יום, לעומת 40% בלבד ממי שלא למדו באולפן — קורלציה חזקה, נתון "actionable" לחשיבות האולפן.',
          en: 'Of those who attended ulpan, 75% reported Hebrew "sufficient/entirely sufficient" for daily life, versus only 40% of those who did not — a strong correlation and an actionable data point for the value of ulpan.',
          am: "75% ኡልፓን የተማሩ ለዕለታዊ ህይወት በቂ ዕብራይስጥ አላቸው ብለው ዘግበዋል፣ ከ40% ካልተማሩ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'מכון מאיירס-ג\'וינט-ברוקדייל, "לאחר עשרים שנה בישראל: סקר יוצאי אתיופיה הוותיקים" (2012), עמ׳ 16',
          url: "https://brookdale-web.s3.amazonaws.com/uploads/2018/01/615-12-Ethiopian-Vatikim-HEB-REP-1.pdf",
        },
        publishedYear: 2010,
        confidenceNote: {
          he: "סקר 2009-2010 (פורסם 2012), דור העולים בלבד.",
          en: "2009-2010 survey (published 2012), immigrant generation only.",
          am: "የ2009-2010 ጥናት (2012 ታትሟል)፣ ለስደተኛ ትውልድ ብቻ።",
        },
      },
      {
        id: "amharic-tigrinya-literacy",
        heading: {
          he: "אוריינות (קרוא וכתוב) באמהרית/תיגרית",
          en: "Amharic/Tigrinya literacy (reading and writing)",
          am: "የአማርኛ/ትግርኛ ማንበብ-መጻፍ ችሎታ",
        },
        figure: { he: "44%", en: "44%", am: "44%" },
        context: {
          he: "44% מיוצאי אתיופיה הוותיקים ידעו קרוא וכתוב באמהרית/תיגרית — פילוח לפי גיל עלייה: 56% ממי שעלו בגיל 0-5, 48% בגיל 6-18, 8% בלבד בגיל 19-45.",
          en: "44% of vatikim Ethiopian-origin immigrants were literate in Amharic/Tigrinya — by age at immigration: 56% of those who immigrated at 0-5, 48% at 6-18, only 8% at 19-45.",
          am: "44% የስደተኛ ትውልድ በአማርኛ/ትግርኛ ማንበብ-መጻፍ ችሎታ ነበራቸው።",
        },
        source: {
          name: 'מכון מאיירס-ג\'וינט-ברוקדייל, "לאחר עשרים שנה בישראל: סקר יוצאי אתיופיה הוותיקים" (2012), לוח 5',
          url: "https://brookdale-web.s3.amazonaws.com/uploads/2018/01/615-12-Ethiopian-Vatikim-HEB-REP-1.pdf",
        },
        publishedYear: 2010,
        confidenceNote: {
          he: "סקר 2009-2010 (פורסם 2012), דור העולים בלבד — אינו כולל את הדור השני יליד הארץ.",
          en: "2009-2010 survey (published 2012), immigrant generation only — does not include the Israeli-born 2nd generation.",
          am: "የ2009-2010 ጥናት (2012 ታትሟል)፣ ለስደተኛ ትውልድ ብቻ።",
        },
      },
    ],
    barChart: {
      heading: {
        he: 'שימוש בעברית "בלבד" לפי הקשר (דור עולים)',
        en: '"Hebrew only" usage by context (immigrant generation)',
        am: "“ዕብራይስጥ ብቻ” አጠቃቀም በአውድ (የስደተኛ ትውልድ)",
      },
      items: [
        { label: { he: "בעבודה", en: "At work", am: "በስራ ቦታ" }, valuePercent: 64 },
        { label: { he: "עם הילדים", en: "With children", am: "ከልጆች ጋር" }, valuePercent: 41 },
        { label: { he: "עם בן/בת הזוג", en: "With spouse", am: "ከትዳር አጋር ጋር" }, valuePercent: 24 },
        { label: { he: "עם חברים", en: "With friends", am: "ከጓደኞች ጋር" }, valuePercent: 22 },
      ],
      source: {
        name: 'מכון מאיירס-ג\'וינט-ברוקדייל, "לאחר עשרים שנה בישראל: סקר יוצאי אתיופיה הוותיקים" (2012), לוח 46',
        url: "https://brookdale-web.s3.amazonaws.com/uploads/2018/01/615-12-Ethiopian-Vatikim-HEB-REP-1.pdf",
      },
    },
    narrative: {
      he: `## הבהרה חשובה — לפני שממשיכים

**הנתונים הבאים מתייחסים לדור העולים בלבד ואינם משקפים את הדור הישראלי-ילידי.** בניגוד לדמוגרפיה וחינוך, הלמ"ס אינה מפרסמת שום נתון בנושא שפה בלקט הסיגד השנתי — נבדק ישירות מול שני הלקטים העדכניים ביותר (367/2025 ו-371/2024) ולא נמצא בהם אף אזכור של עברית, אמהרית, תיגרינית או אולפן. המקור היחיד שנמצא הוא סקר טלפוני ייצוגי של מכון מאיירס-ג'וינט-ברוקדייל, שנערך בדצמבר 2009-יוני 2010 ופורסם בדצמבר 2012, וכיסה אך ורק יוצאי אתיופיה "ותיקים" (עלו לפני 1991, עם ותק של 20+ שנה בישראל במועד הסקר). נכון לסוף 2024, כ-47% מהקהילה הם ילידי ישראל (דור שני) — ועבורם **לא נמצא שום נתון סטטיסטי עדכני ומאומת** על שליטה בעברית או שימור אמהרית/תיגרינית.

## מה כן ידוע (דור העולים, 2009-2010)

בקרב הוותיקים שנסקרו, 77% העריכו את שליטתם בעברית כ"טובה" עד "טובה מאוד". לימודי אולפן (80% ממי שעלו בבגרות) קשורים בבירור לשליטה טובה יותר: 75% ממי שלמדו באולפן דיווחו על עברית מספקת ליום-יום, לעומת 40% בלבד ממי שלא למדו. 44% ידעו קרוא וכתוב באמהרית/תיגרית — כאשר טבלת השימוש בשפה לפי הקשר (עבודה/בן-זוג/ילדים/חברים) ממחישה מעבר שפה בין-דורי כבר בתוך אותה קבוצת נסקרים: עברית דומיננטית עם הילדים (41% רק עברית) בהשוואה לבן/בת הזוג (24%) — פשוט כי רוב הילדים נולדו בארץ.

## למה זה חשוב

הפער בנתונים הוא בעצמו ממצא: אין כיום מקור רשמי הבודק שימור או אובדן שפה בקרב יליד הארץ ממוצא אתיופי — אוכלוסייה שהיא כבר קרוב למחצית מהקהילה. עד שיפורסם מחקר עדכני, לא ניתן לדעת בביטחון סטטיסטי מה שיעור דוברי האמהרית או רמת השליטה בעברית בקרב הדור השני.`,
      en: `## Important disclosure — before you continue

**The following data refers to the immigrant generation only and does not reflect the Israeli-born generation.** Unlike demographics and education, CBS publishes no language data at all in its annual Sigd digest — this was checked directly against the two most recent digests (367/2025 and 371/2024), and neither contains a single mention of Hebrew, Amharic, Tigrinya, or ulpan. The only source located is a representative telephone survey by the Myers-JDC-Brookdale Institute, fielded December 2009-June 2010 and published December 2012, covering only "vatikim" Ethiopian-origin immigrants (arrived before 1991, with 20+ years in Israel at the time of the survey). As of end-2024, about 47% of the community is Israeli-born (2nd generation) — and for them, **no current, verified statistical data** on Hebrew fluency or Amharic/Tigrinya retention was found.

## What is known (immigrant generation, 2009-2010)

Among the vatikim surveyed, 77% rated their Hebrew fluency as "good" to "very good." Ulpan attendance (80% of those who immigrated as adults) is clearly linked to better fluency: 75% of ulpan attendees reported sufficient everyday Hebrew, versus only 40% of non-attendees. 44% were literate in Amharic/Tigrinya — and the language-use-by-context table (work/spouse/children/friends) illustrates an intergenerational language shift already visible within this surveyed group: Hebrew dominates with children (41% Hebrew-only) compared to with a spouse (24%) — simply because most children were born in Israel.

## Why this matters

The data gap is itself a finding: there is currently no official source examining language retention or loss among the Israeli-born generation of Ethiopian origin — a population that is already close to half the community. Until updated research is published, there is no statistically sound way to know the share of Amharic speakers or the level of Hebrew fluency among the 2nd generation.`,
      am: `## አስፈላጊ ማብራሪያ — ከመቀጠልዎ በፊት

**የሚከተለው መረጃ ለስደተኛ ትውልድ ብቻ የሚያመለክት ሲሆን የእስራኤል-ተወላጅ ትውልድን አያንጸባርቅም።** ከስነ-ህዝብ እና ትምህርት በተለየ፣ የLAምስ በሲግድ የመረጃ ስብስብ ውስጥ ምንም የቋንቋ መረጃ አያትምም። የተገኘው ብቸኛ ምንጭ በማየርስ-ጆይንት-ብሩክዴል ተቋም የተካሄደ ተወካይ የስልክ ጥናት ነው (ታህሳስ 2009-ሰኔ 2010 ተካሂዶ፣ ታህሳስ 2012 ታትሟል) — "ቫቲኪም" ተብለው የሚጠሩ የኢትዮጵያ ምንጭ ስደተኞችን ብቻ የሸፈነ (ከ1991 በፊት የመጡ)። እስከ 2024 መጨረሻ፣ ~47% ማህበረሰቡ በእስራኤል የተወለዱ ናቸው (2ኛ ትውልድ) — እና ለነሱ **ምንም የቅርብ ጊዜ የተረጋገጠ ስታቲስቲካዊ መረጃ** በዕብራይስጥ ብቃት ወይም በአማርኛ/ትግርኛ ጥበቃ ላይ አልተገኘም።

## የሚታወቀው (የስደተኛ ትውልድ፣ 2009-2010)

ከተጠኑት ቫቲኪም መካከል፣ 77% ራሳቸውን በዕብራይስጥ "ጥሩ" እስከ "በጣም ጥሩ" ብለው ገምግመዋል። የኡልፓን ትምህርት (80% በአዋቂነት የመጡ) ከተሻለ ብቃት ጋር በግልጽ የተያያዘ ነው፦ 75% ኡልፓን የተማሩ በቂ የዕለት ተዕለት ዕብራይስጥ አላቸው ብለው ዘግበዋል፣ ከ40% ካልተማሩ ጋር ሲነጻጸር። 44% በአማርኛ/ትግርኛ ማንበብ-መጻፍ ይችሉ ነበር።

## ለምን አስፈላጊ ነው

የመረጃ ክፍተቱ ራሱ ግኝት ነው፦ በአሁኑ ጊዜ የቋንቋ ጥበቃ ወይም ማጣት በእስራኤል-ተወላጅ የኢትዮጵያ ምንጭ ትውልድ ላይ የሚመረምር ኦፊሴላዊ ምንጭ የለም — ይህ ህዝብ አሁን ወደ ግማሽ ማህበረሰቡ ተቃርቧል። የተዘመነ ጥናት እስኪታተም ድረስ፣ የ2ኛ ትውልድ የአማርኛ ተናጋሪዎች ድርሻ ወይም የዕብራይስጥ ብቃት ደረጃ በስታቲስቲካዊ እርግጠኝነት ማወቅ አይቻልም።`,
    },
  },

  // 6 — immigration ---------------------------------------------------
  // Verified against docs/research/2026-08-02-community-statistics-immigration.md
  // (TED-99). Historical head counts for Operations Moses and Solomon differ
  // by source (6,364-8,000 and 14,310-14,500 respectively) — presented as
  // ranges per the brief, rather than picking one number arbitrarily. The
  // Operation Tzur Yisrael "~5,000 total" figure has an internal arithmetic
  // discrepancy (2,000+1,550=3,550) flagged in the brief — not published as
  // a clean total. 2015/2016 annual figures and a total cumulative
  // Falash Mura count since 1993 were not found and are NOT estimated.
  {
    slug: "immigration",
    name: {
      he: "עלייה ועלייה ממשיכה",
      en: "Immigration and ongoing aliyah",
      am: "ወደ እስራኤል መግባት",
    },
    shortDescription: {
      he: "מבצע משה, מבצע שלמה ועלייה מתמשכת מאז — היסטוריה ומגמה שנתית מאומתת.",
      en: "Operation Moses, Operation Solomon, and ongoing aliyah since — verified history and annual trend.",
      am: "ሙሴና ሰሎሞን ኦፕሬሽኖች — የተረጋገጠ ታሪክ እና ዓመታዊ አዝማሚያ።",
    },
    figures: [
      {
        id: "operation-moses",
        heading: {
          he: "מבצע משה (1984-1985)",
          en: "Operation Moses (1984-1985)",
          am: "ሙሴ ኦፕሬሽን (1984-1985)",
        },
        figure: { he: "כ-6,300–8,000", en: "~6,300-8,000", am: "~6,300-8,000" },
        context: {
          he: "מבצע משה הביא בין 6,364 (ספירה מדויקת של הטיסות, 21.11.1984-5.1.1985, לפי Feldmann, On Wings of Eagles) לבין כ-8,000 (הערכת ENP הכוללת תקופה רחבה יותר סביב המבצע) יהודים אתיופים מסודן לישראל.",
          en: "Operation Moses brought between 6,364 (an exact flight count, 21.11.1984-5.1.1985, per Feldmann's On Wings of Eagles) and about 8,000 (an ENP estimate covering a broader window around the operation) Ethiopian Jews from Sudan to Israel.",
          am: "ሙሴ ኦፕሬሽን በ6,364 እና 8,000 መካከል የኢትዮጵያ አይሁዶችን ከሱዳን ወደ እስራኤል አምጥቷል።",
        },
        source: {
          name: 'ויקיפדיה עברית, "מבצע משה" (מצטט Feldmann, On Wings of Eagles, 2012) ו-ENP',
          url: "https://he.wikipedia.org/wiki/%D7%9E%D7%91%D7%A6%D7%A2_%D7%9E%D7%A9%D7%94",
        },
        publishedYear: 1985,
        confidenceNote: {
          he: "פער בין מקורות (6,364 מדויק מול ~8,000 עגול) — מוצג כטווח, לא כמספר יחיד.",
          en: "A discrepancy between sources (an exact 6,364 vs a rounded ~8,000) — shown as a range, not a single number.",
          am: "በምንጮች መካከል ልዩነት — እንደ ክልል ቀርቧል፣ እንደ አንድ ቁጥር አይደለም።",
        },
      },
      {
        id: "operation-solomon",
        heading: {
          he: "מבצע שלמה (1991)",
          en: "Operation Solomon (1991)",
          am: "ሰሎሞን ኦፕሬሽን (1991)",
        },
        figure: { he: "כ-14,300–14,500", en: "~14,300-14,500", am: "~14,300-14,500" },
        context: {
          he: "מבצע שלמה הביא בין 14,310 ל-14,400-14,500 יהודים אתיופים לישראל תוך 36 שעות (24-25 במאי 1991) — מבצע ההטסה המהיר ביותר בהיסטוריה. כל המקורות שנבדקו נמצאים בטווח הצר הזה.",
          en: "Operation Solomon brought between 14,310 and 14,400-14,500 Ethiopian Jews to Israel within 36 hours (May 24-25, 1991) — the fastest airlift in history. All sources checked fall within this narrow range.",
          am: "ሰሎሞን ኦፕሬሽን በ36 ሰዓት ውስጥ 14,310-14,500 የኢትዮጵያ አይሁዶችን አምጥቷል።",
        },
        source: {
          name: 'ויקיפדיה עברית, "מבצע שלמה"',
          url: "https://he.wikipedia.org/wiki/%D7%9E%D7%91%D7%A6%D7%A2_%D7%A9%D7%9C%D7%9E%D7%94",
        },
        publishedYear: 1991,
      },
      {
        id: "falash-mura-ongoing",
        heading: {
          he: "עלייה מתמשכת של יוצאי פלאשמורה",
          en: "Ongoing Falash Mura aliyah",
          am: "ተከታታይ የፋላሽ ሙራ አሊያ",
        },
        figure: { he: "מ-1993 ואילך", en: "Since 1993", am: "ከ1993 ጀምሮ" },
        context: {
          he: 'עלייה איטית ומתמשכת של יוצאי "פלאשמורה" מ-1993 ועד היום, במבצעים ממשלתיים מוגדרים-בזמן. לדוגמה, "מבצע צור ישראל" (2020-2023, בשני שלבים) הביא כ-3,550 עולים לפי הסכום המפורש בוויקיפדיה (2,000 + כ-1,550) — מקור אחד מזכיר גם "כ-5,000" למבצע כולו, אך הסכום אינו מתיישב עם פירוט השלבים ולכן אינו מוצג כאן כמספר סופי.',
          en: 'A slow, ongoing aliyah of "Falash Mura" from 1993 to the present, via time-bound government-defined operations. For example, "Operation Tzur Yisrael" (2020-2023, in two phases) brought about 3,550 olim by the explicit phase breakdown (2,000 + ~1,550) cited on Wikipedia — one source also mentions "about 5,000" for the operation overall, but that figure does not reconcile with the phase breakdown, so it is not shown here as a final total.',
          am: "ተከታታይ የፋላሽ ሙራ አሊያ ከ1993 ጀምሮ በጊዜ-የተገደቡ የመንግስት ኦፕሬሽኖች።",
        },
        source: {
          name: 'ויקיפדיה עברית, "מבצע צור ישראל"',
          url: "https://he.wikipedia.org/wiki/%D7%9E%D7%91%D7%A6%D7%A2_%D7%A6%D7%95%D7%A8_%D7%99%D7%A9%D7%A8%D7%90%D7%9C",
        },
        publishedYear: 2023,
        confidenceNote: {
          he: "סתירה חשבונית פנימית במקור (2,000+1,550≠5,000) — אין לפרסם \"5,000\" כמספר סופי.",
          en: "An internal arithmetic discrepancy in the source (2,000+1,550≠5,000) — \"5,000\" is not published as a final total.",
          am: "የምንጭ ውስጣዊ የሂሳብ ልዩነት — “5,000” እንደ መጨረሻ ድምር አይታተምም።",
        },
      },
      {
        id: "annual-aliyah-2024",
        heading: {
          he: "עלייה שנתית — 2024",
          en: "Annual aliyah — 2024",
          am: "ዓመታዊ አሊያ — 2024",
        },
        figure: { he: "285", en: "285", am: "285" },
        context: {
          he: "285 עולים מאתיופיה ב-2024 — ירידה של כ-84% לעומת 1,812 ב-2023, הנמוך ביותר בעשור המתועד (2017-2024). ראו מגמת השנים המלאה בתרשים למטה.",
          en: "285 olim from Ethiopia in 2024 — an ~84% drop from 1,812 in 2023, the lowest figure in the documented decade (2017-2024). See the full year-by-year trend in the chart below.",
          am: "285 ስደተኞች ከኢትዮጵያ በ2024 — ~84% ቅናሽ ከ2023 (1,812) ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "absorption-center-duration",
        heading: {
          he: "משך שהייה במרכזי קליטה",
          en: "Duration of stay in absorption centers",
          am: "በመቀበያ ማዕከላት የመቆያ ጊዜ",
        },
        figure: { he: "18-24 חודשים", en: "18-24 months", am: "18-24 ወራት" },
        context: {
          he: "מסלול הקליטה הטיפוסי לעולי אתיופיה כולל שהייה של כ-18-24 חודשים במרכזי/אתרי קליטה — בשונה מ\"קליטה ישירה\" (ללא מרכז קליטה) הנפוצה יותר בקרב עולים ממדינות רווחה.",
          en: "The typical absorption track for Ethiopian olim includes a stay of about 18-24 months in absorption centers — unlike the \"direct absorption\" (no absorption center) more common among olim from Western countries.",
          am: "የተለመደው መቀበያ መንገድ ለኢትዮጵያ ስደተኞች 18-24 ወራት በመቀበያ ማዕከላት መቆየትን ያካትታል።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "נתונים על יוצאי אתיופיה וסקירת תוכניות סיוע בדיור" (10.8.2025)',
          url: "https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf",
        },
        publishedYear: 2025,
      },
      {
        id: "waiting-in-ethiopia-2023",
        heading: {
          he: "ממתינים באתיופיה — הערכה",
          en: "Awaiting aliyah in Ethiopia — estimate",
          am: "በኢትዮጵያ የሚጠብቁ — ግምት",
        },
        figure: { he: "כ-9,000", en: "~9,000", am: "~9,000" },
        context: {
          he: 'כ-9,000 ממתינים נוספים באתיופיה, לפי הערכה נקודתית מיולי 2023 (בתום "מבצע צור ישראל"). לא אותר עדכון מאומת לנתון זה מאז — מוצג כהערכה היסטורית-נקודתית, לא כמספר עדכני.',
          en: 'About 9,000 additional people were estimated to be awaiting aliyah in Ethiopia, per a point estimate from July 2023 (at the conclusion of "Operation Tzur Yisrael"). No verified update to this figure has been found since — shown as a historical point estimate, not a current number.',
          am: "~9,000 ተጨማሪ ሰዎች በኢትዮጵያ አሊያ እንደሚጠብቁ ተገምቷል (ሐምሌ 2023)።",
        },
        source: {
          name: 'ויקיפדיה עברית, "מבצע צור ישראל"',
          url: "https://he.wikipedia.org/wiki/%D7%9E%D7%91%D7%A6%D7%A2_%D7%A6%D7%95%D7%A8_%D7%99%D7%A9%D7%A8%D7%90%D7%9C",
        },
        publishedYear: 2023,
        confidenceNote: {
          he: "הערכה נקודתית ממקור משני אחד (יולי 2023) — לא אותר עדכון.",
          en: "A single-source, single-point estimate (July 2023) — no update was found.",
          am: "ከአንድ ሁለተኛ ምንጭ የተገኘ ግምት (ሐምሌ 2023)።",
        },
      },
    ],
    barChart: {
      heading: {
        he: "עלייה שנתית מאתיופיה, 2017-2024",
        en: "Annual aliyah from Ethiopia, 2017-2024",
        am: "ከኢትዮጵያ ዓመታዊ አሊያ፣ 2017-2024",
      },
      items: [
        { label: { he: "2017", en: "2017", am: "2017" }, valuePercent: 80.9 },
        { label: { he: "2018", en: "2018", am: "2018" }, valuePercent: 11.5 },
        { label: { he: "2019", en: "2019", am: "2019" }, valuePercent: 45.1 },
        { label: { he: "2020", en: "2020", am: "2020" }, valuePercent: 59.6 },
        { label: { he: "2021", en: "2021", am: "2021" }, valuePercent: 96.9 },
        { label: { he: "2022", en: "2022", am: "2022" }, valuePercent: 92.7 },
        { label: { he: "2023", en: "2023", am: "2023" }, valuePercent: 100 },
        { label: { he: "2024", en: "2024", am: "2024" }, valuePercent: 15.7 },
      ],
      source: {
        name: 'הלמ"ס, דוחות "לקט נתונים לרגל חג הסיגד" 2020-2025 (ראו נתוני שנתי בהקשר)',
        url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
      },
    },
    narrative: {
      he: `## תמונת מצב

העלייה מאתיופיה לישראל מתחלקת לשלוש תקופות: עלייה קטנה ובודדת עד תחילת שנות ה-70; שני גלי עלייה מרכזיים וקצרים — מבצע משה (1984-1985, כ-6,300-8,000 עולים) ומבצע שלמה (1991, כ-14,300-14,500 עולים תוך 36 שעות) — שהעלו יחד כשליש מכלל האוכלוסייה ממוצא אתיופי בישראל כיום (הלמ"ס); ועלייה מתמשכת ואיטית יותר של יוצאי פלאשמורה מ-1993 ועד היום, במבצעים ממשלתיים מוגדרי-זמן.

## מגמת העשור האחרון: ירידה חדה

בעשור 2017-2024 קצב העלייה השנתי תנודתי מאוד — משיא של 1,812 עולים ב-2023 לשפל של 285 בלבד ב-2024, ירידה של כ-84% בשנה אחת, הנמוכה ביותר בעשור המתועד. שים לב: תרשים המגמה (בר-צ'ארט למעלה) מציג את השנים כאחוז מהשיא (2023=100%) לצורך השוואה חזותית בין שנים — הערכים המספריים המדויקים (208 ב-2018 עד 1,812 ב-2023) מפורטים בטקסט זה, לא רק בתרשים.

## מספרים היסטוריים — למה טווח ולא מספר יחיד

לגלי העלייה הגדולים (משה, שלמה) יש הבדלים קטנים אך עקביים בין מקורות — ספירת טיסות מדויקת (6,364 / 14,310) מול הערכות עגולות יותר (~8,000 / ~14,400-14,500). כדי לא להטעות, אנו מציגים טווח ולא בוחרים מספר יחיד באופן שרירותי.

## קליטה ותמיכה

עולי אתיופיה עוברים מסלול קליטה ייחודי — שהייה של כ-18-24 חודשים במרכזי/אתרי קליטה, לעומת "קליטה ישירה" הנפוצה יותר בקרב עולים ממדינות רווחה — לצד תוכניות סיוע ייעודיות בדיור (ראו נושא "דיור").`,
      en: `## Snapshot

Aliyah from Ethiopia to Israel falls into three periods: small, individual immigration until the early 1970s; two major, short waves — Operation Moses (1984-1985, ~6,300-8,000 olim) and Operation Solomon (1991, ~14,300-14,500 olim within 36 hours) — which together brought about a third of today's entire Ethiopian-origin population in Israel (per CBS); and a slower, ongoing aliyah of Falash Mura from 1993 to the present, via time-bound government operations.

## The last decade's trend: a sharp decline

Over 2017-2024 the annual aliyah rate was highly volatile — from a peak of 1,812 olim in 2023 to a low of just 285 in 2024, an ~84% one-year drop, the lowest in the documented decade. Note: the trend chart above shows each year as a percentage of the peak (2023=100%) for visual comparison — exact figures (208 in 2018 through 1,812 in 2023) are detailed in this text, not only in the chart.

## Historical figures — why a range, not a single number

The major aliyah waves (Moses, Solomon) show small but consistent differences between sources — an exact flight count (6,364 / 14,310) versus rounder estimates (~8,000 / ~14,400-14,500). To avoid misleading readers, we present a range rather than arbitrarily picking one number.

## Absorption and support

Ethiopian olim go through a distinct absorption track — a stay of about 18-24 months in absorption centers, unlike the "direct absorption" more common among olim from Western countries — alongside dedicated housing assistance programs (see the Housing topic).`,
      am: `## አጠቃላይ እይታ

ከኢትዮጵያ ወደ እስራኤል የሚደረግ አሊያ በሦስት ወቅቶች ይከፈላል፦ እስከ 1970ዎቹ መጀመሪያ ድረስ ትንሽ የግል ስደት፤ ሁለት ዋና ዋና አጭር ማዕበሎች — ሙሴ ኦፕሬሽን (1984-1985፣ ~6,300-8,000 ስደተኞች) እና ሰሎሞን ኦፕሬሽን (1991፣ በ36 ሰዓት ውስጥ ~14,300-14,500 ስደተኞች) — በጋራ ዛሬ ካለው የኢትዮጵያ ምንጭ ህዝብ ውስጥ ወደ አንድ ሦስተኛውን ያመጡ፤ እና ከ1993 ጀምሮ እስከ አሁን ድረስ ተከታታይ የፋላሽ ሙራ ስደት፣ በጊዜ-የተገደቡ የመንግስት ኦፕሬሽኖች።

## የመጨረሻው አስርት ዓመት አዝማሚያ: ከፍተኛ ቅናሽ

በ2017-2024 ዓመታዊ የአሊያ መጠን በጣም ተለዋዋጭ ነበር — ከ2023 ከፍተኛ ደረጃ (1,812 ስደተኞች) ወደ 2024 ዝቅተኛ ደረጃ (285 ብቻ)፣ ~84% የአንድ-ዓመት ቅናሽ፣ በተመዘገበው አስርት ዓመት ውስጥ ዝቅተኛው።

## ታሪካዊ ቁጥሮች — ለምን ክልል እንጂ አንድ ቁጥር አይደለም

ለትላልቅ የአሊያ ማዕበሎች (ሙሴ፣ ሰሎሞን) በምንጮች መካከል ትንሽ ግን ወጥ የሆነ ልዩነት አለ። አንባቢዎችን እንዳናሳስት፣ ክልል እናቀርባለን እንጂ በዘፈቀደ አንድ ቁጥር አንመርጥም።

## መቀበል እና ድጋፍ

የኢትዮጵያ ስደተኞች የተለየ የመቀበያ መንገድ ያልፋሉ — በመቀበያ ማዕከላት ~18-24 ወራት መቆየት — ከልዩ የቤት ድጋፍ ፕሮግራሞች ጋር (የ"መኖሪያ" ርዕስን ይመልከቱ)።`,
    },
  },

  // 7 — family --------------------------------------------------------
  // Verified against docs/research/2026-08-02-community-statistics-family.md
  // (TED-99). Primary source: CBS Sigd data digest 2025 (367/2025) —
  // marriage/divorce data lags 2 years behind the digest's publication year
  // (2023 data in the 2025 report), while household/family-structure data is
  // a 3-year rolling average from the labor-force survey. This is noted
  // explicitly per-figure and in the narrative so it isn't confused with the
  // end-2024 demographics figures (TED-20).
  {
    slug: "family",
    name: { he: "משפחה", en: "Family", am: "ቤተሰብ" },
    shortDescription: {
      he: "נישואין, גירושין, גודל משפחה וחד-הוריות — מבנה משפחתי מאומת בקהילה.",
      en: "Marriage, divorce, household size, and single-parenthood — verified family structure in the community.",
      am: "ጋብቻ፣ ፍቺ፣ የቤተሰብ መዋቅር — የተረጋገጠ የቤተሰብ መረጃ።",
    },
    figures: [
      {
        id: "marriages-2023",
        heading: {
          he: "נישואין ממוצא אתיופי",
          en: "Ethiopian-origin marriages",
          am: "የኢትዮጵያ ምንጭ ጋብቻ",
        },
        figure: { he: "740 חתנים · 766 כלות", en: "740 grooms · 766 brides", am: "740 ሙሽሮች · 766 ሙሽሪት" },
        context: {
          he: "740 חתנים ו-766 כלות ממוצא אתיופי נישאו במוסדות הדת המורשים בישראל ב-2023 — 92% מהם נישאו לראשונה. נתוני נישואין/גירושין בלקט הסיגד מתפרסמים בפיגור של כשנתיים לעומת נתוני הדמוגרפיה הכללית.",
          en: "740 grooms and 766 brides of Ethiopian origin married through recognized religious institutions in Israel in 2023 — 92% for the first time. Marriage/divorce data in the Sigd digest lags about two years behind the general demographics figures.",
          am: "740 ሙሽሮች እና 766 ሙሽሪት የኢትዮጵያ ምንጭ በ2023 ተጋብተዋል።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2023,
      },
      {
        id: "endogamy-generation-gap",
        heading: {
          he: "נישואין בתוך הקהילה — פער בין-דורי",
          en: "In-community marriage — intergenerational gap",
          am: "በማህበረሰቡ ውስጥ ጋብቻ — በትውልድ መካከል ልዩነት",
        },
        figure: { he: "82% (88% מול 74%)", en: "82% (88% vs 74%)", am: "82% (88% vs 74%)" },
        context: {
          he: '82% מהנישאים ממוצא אתיופי נישאו לבן/בת זוג מאותו המוצא — במגמת ירידה עקבית מאז 2015. הפער בין הדורות בולט: 88% מילידי אתיופיה נישאו "פנימה", לעומת 74% בלבד מילידי ישראל (דור שני) — מגמת "החוצה" חזקה משמעותית בדור השני.',
          en: '82% of Ethiopian-origin newlyweds married a spouse of the same origin — a consistent downward trend since 2015. The intergenerational gap is stark: 88% of Ethiopia-born olim married "in," versus only 74% of Israeli-born (2nd generation) — a significantly stronger "out-marriage" trend in the 2nd generation.',
          am: "82% የኢትዮጵያ ምንጭ ተጋቢዎች ተመሳሳይ ምንጭ ካለው ጋር ተጋብተዋል — ከ2015 ጀምሮ በተከታታይ እየቀነሰ።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2023,
      },
      {
        id: "marriage-age",
        heading: {
          he: "גיל ממוצע בנישואין ראשונים",
          en: "Average age at first marriage",
          am: "አማካይ የመጀመሪያ ጋብቻ ዕድሜ",
        },
        figure: { he: "30.4 (גברים) · 28.6 (נשים)", en: "30.4 (men) · 28.6 (women)", am: "30.4 (ወንዶች) · 28.6 (ሴቶች)" },
        context: {
          he: "גיל נישואין ראשון: 30.4 לגברים (גבוה ב-3.4 שנים מהממוצע היהודי) ו-28.6 לנשים (גבוה ב-3.2 שנים). בקרב בני 25-29, 86% מהגברים ו-70% מהנשים בקהילה עדיין רווקים, לעומת 64%/51% בכלל האוכלוסייה.",
          en: "Age at first marriage: 30.4 for men (3.4 years higher than the Jewish average) and 28.6 for women (3.2 years higher). Among 25-29 year-olds, 86% of men and 70% of women in the community are still single, versus 64%/51% in the general population.",
          am: "የመጀመሪያ ጋብቻ ዕድሜ: 30.4 ለወንዶች፣ 28.6 ለሴቶች — ከጠቅላላ አማካይ ከፍ ያለ።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2023,
      },
      {
        id: "divorce-rate",
        heading: { he: "שיעור גירושין", en: "Divorce rate", am: "የፍቺ መጠን" },
        figure: { he: "14.1 ל-1,000", en: "14.1 per 1,000", am: "14.1 በ1,000" },
        context: {
          he: "14.1 גירושין לכל אלף נשואים ממוצא אתיופי ב-2023 (359 גברים, 393 נשים) — לעומת 8.2 בכלל האוכלוסייה היהודית, כמעט פי 1.7.",
          en: "14.1 divorces per 1,000 married Ethiopian-origin individuals in 2023 (359 men, 393 women) — versus 8.2 in the general Jewish population, nearly 1.7x.",
          am: "14.1 ፍቺ በ1,000 የተጋቡ የኢትዮጵያ ምንጭ ሰዎች በ2023 — ከ8.2 ጠቅላላ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2023,
      },
      {
        id: "household-size",
        heading: {
          he: "גודל משק בית ממוצע",
          en: "Average household size",
          am: "አማካይ የቤተሰብ ብዛት",
        },
        figure: { he: "3.70", en: "3.70", am: "3.70" },
        context: {
          he: '46.3 אלף משקי בית ממוצא אתיופי (ממוצע 2022-2024) בגודל ממוצע של 3.70 נפשות — לעומת 2.99 בכלל האוכלוסייה. 82% מהם משקי בית משפחתיים (לעומת 74% בכלל האוכלוסייה).',
          en: "46.3 thousand Ethiopian-origin households (2022-2024 average), averaging 3.70 people — versus 2.99 in the general population. 82% of them are family households (versus 74% in the general population).",
          am: "46.3 ሺህ የኢትዮጵያ ምንጭ ቤተሰቦች፣ አማካይ 3.70 ሰዎች — ከ2.99 ጠቅላላ ጋር ሲነጻጸር።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
      {
        id: "single-parent-families",
        heading: { he: "שיעור משפחות חד-הוריות", en: "Single-parent family rate", am: "ብቸኛ ወላጅ ቤተሰብ መጠን" },
        figure: { he: "26%", en: "26%", am: "26%" },
        context: {
          he: "26% ממשפחות יוצאי אתיופיה (מתוך 38.4 אלף משפחות) הן משפחות חד-הוריות — כמעט פי 2 מהאחוז בקרב משפחות יהודיות ואחרות (13%). המגמה בעלייה: 24% ב-2022/23.",
          en: "26% of Ethiopian-origin families (out of 38.4 thousand families) are single-parent — nearly 2x the rate among Jewish-and-other families (13%). The trend is rising: 24% in 2022/23.",
          am: "26% የኢትዮጵያ ምንጭ ቤተሰቦች ብቸኛ ወላጅ ናቸው — ከ13% ጠቅላላ ጋር ሲነጻጸር ሁለት እጥፍ ገደማ።",
        },
        source: {
          name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
          url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
        },
        publishedYear: 2024,
      },
    ],
    barChart: {
      heading: {
        he: "התפלגות סוגי משפחה (יוצאי אתיופיה)",
        en: "Family-type distribution (Ethiopian-origin)",
        am: "የቤተሰብ ዓይነት ስርጭት (የኢትዮጵያ ምንጭ)",
      },
      items: [
        {
          label: { he: "זוג עם ילדים", en: "Couple with children", am: "ልጆች ያሏቸው ጥንዶች" },
          valuePercent: 63,
        },
        {
          label: { he: "משפחות חד-הוריות", en: "Single-parent families", am: "ብቸኛ ወላጅ ቤተሰቦች" },
          valuePercent: 26,
        },
        {
          label: { he: "זוג ללא ילדים", en: "Couple without children", am: "ልጆች የሌሏቸው ጥንዶች" },
          valuePercent: 11,
        },
      ],
      source: {
        name: 'הלמ"ס, "לקט נתונים לרגל חג הסיגד 2025" (367/2025, 16.11.2025)',
        url: "https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf",
      },
    },
    narrative: {
      he: `## תמונת מצב

נתוני הלמ"ס מציגים תמונה עקבית לאורך שנים: גיל נישואין ראשונים גבוה משמעותית בקרב יוצאי אתיופיה לעומת כלל האוכלוסייה היהודית (כ-3 שנים יותר, גם אצל גברים וגם אצל נשים), שיעור נישואין בתוך הקהילה גבוה אך במגמת ירידה עקבית מאז 2015, שיעור גירושין גבוה יותר (כמעט פי 1.7), ואחוז משפחות חד-הוריות גבוה פי-כמעט-שניים מכלל האוכלוסייה. במקביל, משקי הבית והמשפחות גדולים יותר בממוצע, עם אחוז גבוה יותר של "זוג עם ילדים" (63% לעומת 57%) ואחוז נמוך יותר של "זוג ללא ילדים" (11% לעומת 30%) — ייתכן שנובע מגיל צעיר יחסית של האוכלוסייה, לא בהכרח מהבדל בהעדפות.

## הערת תזמון חשובה

נתוני נישואין וגירושין בפרק זה מתייחסים ל-2023 — לא ל-2024 כמו נתוני הדמוגרפיה הכללית (TED-20) — כי הלמ"ס מפרסמת אותם בפיגור קבוע של כשנתיים. נתוני משקי בית ומשפחות הם ממוצע תלת-שנתי (2022-2024) מסקר כוח אדם. אין לערבב בין שנות הנתונים השונות בעמוד זה.

## מגמת בין-דורות

הפער הבולט ביותר הוא בין הדורות: 88% מיוצאי אתיופיה ילידי אתיופיה נישאו לבן/בת זוג מאותו מוצא, לעומת 74% בלבד מהדור השני יליד ישראל — סימן להשתלבות והתמזגות הדרגתית עם כלל האוכלוסייה.`,
      en: `## Snapshot

CBS data shows a consistent picture over the years: age at first marriage is significantly higher among Ethiopian-Israelis than the general Jewish population (about 3 years, for both men and women), the in-community marriage rate is high but has been declining consistently since 2015, the divorce rate is higher (nearly 1.7x), and the single-parent family rate is nearly double the general population's. At the same time, households and families are larger on average, with a higher share of "couple with children" (63% vs 57%) and a lower share of "couple without children" (11% vs 30%) — possibly reflecting the community's relatively young age structure rather than a difference in preferences.

## An important timing note

Marriage and divorce figures in this section refer to 2023 — not 2024 like the general demographics figures (TED-20) — because CBS consistently publishes them with a roughly two-year lag. Household and family figures are a three-year average (2022-2024) from the labor-force survey. These different data years should not be conflated on this page.

## An intergenerational trend

The starkest gap is between generations: 88% of Ethiopia-born Ethiopian-Israelis married a spouse of the same origin, versus only 74% of the Israeli-born 2nd generation — a sign of gradual integration and intermingling with the general population.`,
      am: `## አጠቃላይ እይታ

የLAምስ መረጃ ወጥ ምስል ያሳያል፦ የመጀመሪያ ጋብቻ ዕድሜ በኢትዮጵያ-እስራኤላውያን ዘንድ ከጠቅላላ የአይሁድ ህዝብ በእጅጉ ከፍ ያለ ነው (~3 ዓመታት)፣ በማህበረሰቡ ውስጥ የጋብቻ መጠን ከፍተኛ ግን ከ2015 ጀምሮ በተከታታይ እየቀነሰ ነው፣ የፍቺ መጠን ከፍ ያለ ነው (~1.7 እጥፍ)፣ እና የብቸኛ ወላጅ ቤተሰብ መጠን ከጠቅላላ ህዝብ ሁለት እጥፍ ገደማ ነው። በተመሳሳይ ጊዜ፣ ቤተሰቦች በአማካይ የበለጠ ናቸው፣ ከፍ ያለ "ልጆች ያሏቸው ጥንዶች" ድርሻ (63% ከ57%) እና ዝቅተኛ "ልጆች የሌሏቸው ጥንዶች" ድርሻ (11% ከ30%) ጋር።

## አስፈላጊ የጊዜ ማስታወሻ

በዚህ ክፍል ያሉ የጋብቻ እና የፍቺ አሃዞች የ2023 ናቸው — እንደ ጠቅላላ ስነ-ህዝብ አሃዞች (TED-20) የ2024 አይደሉም — ምክንያቱም የLAምስ ሁልጊዜ በሁለት ዓመት መዘግየት ያትማቸዋል። የቤተሰብ አሃዞች የሦስት-ዓመት አማካይ (2022-2024) ናቸው። የተለያዩ የመረጃ ዓመታት በዚህ ገጽ መቀላቀል የለባቸውም።

## በትውልድ መካከል ያለ አዝማሚያ

በጣም ጎላ ያለው ልዩነት በትውልዶች መካከል ነው፦ 88% በኢትዮጵያ የተወለዱ የኢትዮጵያ-እስራኤላውያን ተመሳሳይ ምንጭ ካለው ጋር ተጋብተዋል፣ ከ74% ብቻ በእስራኤል ከተወለደው 2ኛ ትውልድ ጋር ሲነጻጸር — ከጠቅላላ ህዝብ ጋር ቀስ በቀስ የመዋሃድ ምልክት።`,
    },
  },

  // 8 — civic-participation ------------------------------------------
  // Verified against docs/research/2026-08-02-community-statistics-civic.md
  // (TED-99). The "3.9%/0.3%" civil-service representation figure could NOT
  // be traced to a primary source and is deliberately excluded, per the
  // brief's explicit instruction. Voter turnout by ethnicity is
  // structurally untracked in Israel (no ethnicity-tagged voter rolls) —
  // presented as a "no data exists" fact rather than silently omitted, per
  // the brief's recommendation. Law-enforcement figures are framed as
  // "over-representation in enforcement data," not crime rates, per the
  // Knesset Research Center's own explicit caveat.
  {
    slug: "civic-participation",
    name: { he: "השתתפות אזרחית", en: "Civic participation", am: "የዜግነት ተሳትፎ" },
    shortDescription: {
      he: "ייצוג בכנסת, תעסוקה במגזר הציבורי ונתוני אכיפה — שילוב הקהילה במרחב הציבורי, נתונים מאומתים.",
      en: "Knesset representation, public-sector employment, and enforcement data — verified community integration in the public sphere.",
      am: "በክኔሴት ውክልና፣ በመንግስት ስራ ውክልና — የተረጋገጠ የማህበረሰብ ተሳትፎ።",
    },
    figures: [
      {
        id: "knesset-representation",
        heading: {
          he: "ייצוג בכנסת (כנסת 25)",
          en: "Knesset representation (25th Knesset)",
          am: "በክኔሴት ውክልና (25ኛ ክኔሴት)",
        },
        figure: { he: "3 ח\"כים", en: "3 MKs", am: "3 የፓርላማ አባላት" },
        context: {
          he: '3 חברי כנסת יוצאי אתיופיה בכנסת ה-25 (מכהנת מנוב׳ 2022) — גידול מ-2 ח"כים בכנסות ה-21-22. שיעור הייצוג (3 מתוך 120 = 2.5%) קרוב לשיעור באוכלוסייה היהודית (~2.2%) — בשונה מהפער הבולט בתעסוקה הציבורית.',
          en: '3 Ethiopian-origin MKs in the 25th Knesset (serving since Nov. 2022) — up from 2 MKs in the 21st-22nd Knessets. The representation rate (3 of 120 = 2.5%) is close to the share of the Jewish population (~2.2%) — unlike the pronounced gap in public-sector employment.',
          am: "3 የኢትዮጵያ ምንጭ የፓርላማ አባላት በ25ኛው ክኔሴት — ከ21-22ኛ ክኔሴት 2 አባላት ጭማሪ።",
        },
        source: {
          name: 'ויקיפדיה, "הכנסת העשרים וחמש" (מבוסס על רישומי הכנסת)',
          url: "https://he.wikipedia.org/wiki/הכנסת_העשרים_וחמש",
        },
        publishedYear: 2022,
      },
      {
        id: "government-companies-representation",
        heading: {
          he: "ייצוג בחברות ממשלתיות ותאגידים ציבוריים",
          en: "Representation in government companies and public corporations",
          am: "በመንግስት ኩባንያዎች ውክልና",
        },
        figure: { he: "2.44%", en: "2.44%", am: "2.44%" },
        context: {
          he: 'ב-2023 היוו יוצאי אתיופיה 2.44% מעובדי החברות הממשלתיות (1,273 מתוך 52,181) ו-2.44% מעובדי התאגידים הציבוריים — מעל היעד המנהלי (כ-1.81%, לפי שיעורם באוכלוסייה). עלייה הדרגתית מ-1.78% ב-2016. עם זאת, ב-2022-2023 היה עובד בכיר יוצא-אתיופיה אחד בלבד בכלל 32 החברות הממשלתיות המחויבות בדיווח.',
          en: 'In 2023, Ethiopian-origin employees made up 2.44% of government-company staff (1,273 of 52,181) and 2.44% of public-corporation staff — above the administrative target (~1.81%, based on their population share). A gradual rise from 1.78% in 2016. However, in 2022-2023 there was only one senior Ethiopian-origin employee across all 32 reporting government companies.',
          am: "በ2023 የኢትዮጵያ ምንጭ ሠራተኞች 2.44% የመንግስት ኩባንያ ሠራተኞች ነበሩ — ከ1.81% ኢላማ በላይ።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "ייצוג הולם ליוצאי אתיופיה בחברות הממשלתיות ובתאגידים הציבוריים בשנת 2023" (6.3.2025)',
          url: "https://fs.knesset.gov.il/25/Committees/25_cs_mmm_5850929.pdf",
        },
        publishedYear: 2023,
        confidenceNote: {
          he: "ייצוג כללי מעל היעד, אך מרוכז כמעט כולו בדרגים הזוטרים (עובד בכיר אחד בלבד ב-32 חברות).",
          en: "Overall representation exceeds target, but is nearly all concentrated in junior ranks (only one senior employee across 32 companies).",
          am: "ጠቅላላ ውክልና ከኢላማ በላይ ነው፣ ግን በአብዛኛው በጀማሪ ደረጃዎች ላይ ያተኮረ ነው።",
        },
      },
      {
        id: "local-authority-senior-representation",
        heading: {
          he: "ייצוג בדרג בכיר ברשויות מקומיות",
          en: "Representation in senior local-authority ranks",
          am: "በአካባቢ ባለስልጣናት ከፍተኛ ደረጃ ውክልና",
        },
        figure: { he: "0.2%", en: "0.2%", am: "0.2%" },
        context: {
          he: "רק 0.2% מהעובדים הבכירים ברשויות מקומיות היו יוצאי אתיופיה (4 מתוך 1,711, 2021) — לעומת 3.6% מכלל העובדים באותן רשויות. במקביל, 74.8% מהעובדים יוצאי אתיופיה ברשויות מקומיות היו בדרג המינהלי הזוטר ביותר (לעומת 66.3% בכלל העובדים).",
          en: "Only 0.2% of senior local-authority employees were Ethiopian-origin (4 of 1,711, 2021) — versus 3.6% of all employees at those same authorities. Meanwhile, 74.8% of Ethiopian-origin local-authority employees were in the most junior administrative rank (versus 66.3% of all employees).",
          am: "0.2% ብቻ ከፍተኛ የአካባቢ ባለስልጣን ሠራተኞች የኢትዮጵያ ምንጭ ነበሩ (4 ከ1,711፣ 2021)።",
        },
        source: {
          name: 'משרד מבקר המדינה, "דוח על הביקורת בשלטון המקומי 2024" (יולי 2024)',
          url: "https://library.mevaker.gov.il/sites/DigitalLibrary/Documents/2024/Shilton/2024-Shilton-202-Shiloov.pdf",
        },
        publishedYear: 2021,
      },
      {
        id: "civil-service-2019-target-miss",
        heading: {
          he: "עמידה ביעד ייצוג הולם בשירות המדינה",
          en: "Meeting the representation target in the civil service",
          am: "በመንግስት አገልግሎት ውክልና ኢላማ ማሟላት",
        },
        figure: { he: "63% / 79% לא עמדו ביעד", en: "63% / 79% missed target", am: "63% / 79% ኢላማ አላሟሉም" },
        context: {
          he: '88% מעובדי שירות המדינה יוצאי אתיופיה הועסקו בדרג הזוטר ביותר; 63% ממשרדי הממשלה ו-79% מיחידות הסמך לא עמדו ביעד הממשלתי לייצוג הולם (2019). זהו הנתון העדכני ביותר שאותר לשירות המדינה עצמו (להבדיל מחברות ממשלתיות, שלגביהן יש נתוני 2023).',
          en: '88% of Ethiopian-origin civil-service employees were in the most junior rank; 63% of government ministries and 79% of statutory units missed the government\'s representation target (2019). This is the most recent figure located for the civil service itself (as distinct from government companies, for which 2023 data exists).',
          am: "88% የኢትዮጵያ ምንጭ የመንግስት ሠራተኞች በጀማሪ ደረጃ ላይ ነበሩ፤ 63% ሚኒስቴሮች ኢላማውን አላሟሉም (2019)።",
        },
        source: {
          name: 'משרד מבקר המדינה, "העסקה מכילה של מגוון אוכלוסיות בשירות המדינה" (דוח שנתי 71ג/72א, 2021)',
          url: "https://library.mevaker.gov.il/sites/DigitalLibrary/Pages/Reports/7302-8.aspx",
        },
        publishedYear: 2019,
        confidenceNote: {
          he: "הנתון העדכני ביותר שאותר לשירות המדינה עצמו הוא מ-2019 — אין נתון ל-2023-2025 ממקור ראשוני.",
          en: "The most recent figure located for the civil service itself is from 2019 — no 2023-2025 figure from a primary source was found.",
          am: "የተገኘው በጣም የቅርብ ጊዜ አሃዝ ከ2019 ነው።",
        },
      },
      {
        id: "law-enforcement-overrepresentation",
        heading: {
          he: "ייצוג-יתר בנתוני מעצרים",
          en: "Over-representation in arrest data",
          am: "በእስር መረጃ ውስጥ ከመጠን በላይ ውክልና",
        },
        figure: { he: "8.2%–9.4%", en: "8.2%-9.4%", am: "8.2%-9.4%" },
        context: {
          he: 'יוצאי אתיופיה, המהווים 2.2% מהאוכלוסייה היהודית, היוו 8.2%-9.4% מהמעצרים בכלל האוכלוסייה היהודית מדי שנה (2019-2023) — אך רק 5%-6% מתיקי החקירה שנפתחו. חשוב: אלו נתוני "ייצוג-יתר באכיפה" (מעצרים, תיקים) — לא שיעורי פשיעה. המקור עצמו מציין שקשה לדעת עד כמה הם משקפים היקף עבירות בפועל לעומת שיעור עיסוק המשטרה.',
          en: 'Ethiopian-Israelis, who make up 2.2% of the Jewish population, accounted for 8.2%-9.4% of arrests within the Jewish population each year (2019-2023) — but only 5%-6% of investigation files opened. Important: this is "over-representation in enforcement data" (arrests, files) — not a crime rate. The source itself notes it is hard to know how much this reflects actual offense rates versus policing patterns.',
          am: "የኢትዮጵያ ምንጭ ሰዎች 2.2% ከአይሁድ ህዝብ ቢሆኑም 8.2%-9.4% ከእስሮች ነበሩ (2019-2023) — ይህ የ“ከመጠን በላይ ውክልና” መረጃ ነው፣ የወንጀል መጠን አይደለም።",
        },
        source: {
          name: 'מרכז המחקר והמידע של הכנסת, "נתוני אכיפה כלפי יוצאי אתיופיה בשנים 2019-2023" (21.5.2024)',
          url: "https://fs.knesset.gov.il/25/law/25_ls_mmm_4436954.pdf",
        },
        publishedYear: 2023,
        confidenceNote: {
          he: 'ייצוג-יתר בנתוני אכיפה — לא שיעור פשיעה. המקור מדגיש שקשה לדעת אם זה משקף עבירות בפועל או דפוסי שיטור.',
          en: "Over-representation in enforcement data — not a crime rate. The source stresses it's hard to know if this reflects actual offenses or policing patterns.",
          am: "በአፈጻጸም መረጃ ውስጥ ከመጠን በላይ ውክልና — የወንጀል መጠን አይደለም።",
        },
      },
      {
        id: "voter-turnout-no-data",
        heading: {
          he: "אחוז הצבעה לפי מוצא",
          en: "Voter turnout by ethnic origin",
          am: "በዘር ምንጭ የድምጽ አሰጣጥ መጠን",
        },
        figure: { he: "אין נתון קיים", en: "No data exists", am: "መረጃ የለም" },
        context: {
          he: 'בישראל אין תיוג אתני בפנקסי הבוחרים, ולכן ועדת הבחירות המרכזית אינה מפרסמת (ואינה יכולה לפרסם) נתוני הצבעה מפולחים לפי מוצא אתיופי — לא ברמת הפרט וגם לא ברמת יישוב, כי אין יישוב יהודי בישראל עם רוב יוצאי אתיופיה. זו עובדה מבנית של מערכת הבחירות בישראל, לא פער מחקר שניתן לסגור.',
          en: "Israel does not tag voter rolls by ethnicity, so the Central Elections Committee does not publish (and structurally cannot publish) voter-turnout data broken down by Ethiopian origin — neither at the individual level nor by locality, since no Jewish locality in Israel has an Ethiopian-origin majority. This is a structural fact about Israel's electoral system, not a research gap that could be closed.",
          am: "እስራኤል የድምጽ መስጫ መዝገቦችን በዘር አይለይም፣ ስለዚህ የማዕከላዊ ምርጫ ኮሚቴ በኢትዮጵያ ምንጭ የተከፋፈለ የድምጽ አሰጣጥ መረጃ አያትምም — ይህ የስርዓት እውነታ ነው፣ ሊዘጋ የሚችል የምርምር ክፍተት አይደለም።",
        },
        source: {
          name: "ועדת הבחירות המרכזית לכנסת",
          url: "https://www.bechirot.gov.il",
        },
        publishedYear: 2023,
        confidenceNote: {
          he: "אין תיוג אתני בפנקסי הבוחרים בישראל — עובדה מבנית, לא נתון חסר שניתן להשלים.",
          en: "Israel's voter rolls carry no ethnicity tag — a structural fact, not a missing data point that could be filled in.",
          am: "የእስራኤል የድምጽ መስጫ መዝገቦች የዘር ምልክት የላቸውም — የስርዓት እውነታ ነው።",
        },
      },
    ],
    barChart: {
      heading: {
        he: "ייצוג יוצאי אתיופיה בגופים ציבוריים לפי סוג",
        en: "Ethiopian-origin representation in public bodies by type",
        am: "የኢትዮጵያ ምንጭ ውክልና በህዝባዊ አካላት በዓይነት",
      },
      items: [
        {
          label: { he: "חברות ממשלתיות", en: "Government companies", am: "የመንግስት ኩባንያዎች" },
          valuePercent: 2.44,
        },
        {
          label: { he: "תאגידים ציבוריים", en: "Public corporations", am: "ህዝባዊ ድርጅቶች" },
          valuePercent: 2.44,
        },
        {
          label: {
            he: "דרג מינהלי ברשויות מקומיות",
            en: "Administrative rank, local authorities",
            am: "የአስተዳደር ደረጃ በአካባቢ ባለስልጣናት",
          },
          valuePercent: 1.85,
        },
        {
          label: {
            he: "דרג בכיר ברשויות מקומיות",
            en: "Senior rank, local authorities",
            am: "ከፍተኛ ደረጃ በአካባቢ ባለስልጣናት",
          },
          valuePercent: 0.2,
        },
      ],
      source: {
        name: 'מרכז המחקר והמידע של הכנסת (6.3.2025) ומשרד מבקר המדינה (יולי 2024)',
        url: "https://fs.knesset.gov.il/25/Committees/25_cs_mmm_5850929.pdf",
      },
    },
    narrative: {
      he: `## תמונת מצב

הייצוג הפוליטי של יוצאי אתיופיה בכנסת (3 ח"כים, 2.5%) קרוב בפועל לשיעורם באוכלוסייה היהודית (~2.2%) — אך זהו החריג. בתעסוקה הציבורית התמונה מורכבת בהרבה: הייצוג הכללי בחברות ממשלתיות ותאגידים ציבוריים (2.44% ב-2023) אמנם עולה על היעד המנהלי, אך מרוכז כמעט כולו בדרגים הזוטרים — עובד בכיר יוצא-אתיופיה אחד בלבד בכלל 32 החברות הממשלתיות שנבדקו. ברשויות המקומיות ובשירות המדינה עצמו התמונה בעייתית עוד יותר: 0.2% בלבד בדרג הבכיר ברשויות מקומיות, ו-88% מעובדי שירות המדינה יוצאי אתיופיה בדרג הזוטר ביותר (2019).

## אכיפת חוק — הבהרת מסגור חשובה

יוצאי אתיופיה מיוצגים ביתר בנתוני מעצרים (8.2%-9.4% מהמעצרים, לעומת 2.2% מהאוכלוסייה) — אך אלו נתוני **ייצוג באכיפה**, לא שיעורי פשיעה. המקור (מרכז המחקר והמידע של הכנסת) מדגיש במפורש שקשה לדעת עד כמה הנתונים משקפים היקף עבירות בפועל, לעומת שיעור התלונות או "שיטור יתר" — הסתייגות שיש לשמר בכל הצגה של הנתונים הללו.

## מה אין לנו נתון עליו — ובכוונה

בישראל אין תיוג אתני בפנקסי הבוחרים, ולכן אין ואינו יכול להיות נתון רשמי על אחוז הצבעה בקרב יוצאי אתיופיה — לא ברמת הפרט וגם לא ברמת יישוב. זו עובדה מעניינת כשלעצמה על מבנה מערכת הבחירות בישראל, לא השמטה של נושא. בנוסף, נתון שהופיע בכמה חיפושים ("3.9% ייצוג בשירות המדינה, דצמבר 2024, מתוכם 0.3% בכירים") **לא אותר במקור ראשוני מזוהה** ואינו מוצג בעמוד זה.`,
      en: `## Snapshot

Political representation of Ethiopian-Israelis in the Knesset (3 MKs, 2.5%) is actually close to their share of the Jewish population (~2.2%) — but this is the exception. The picture in public-sector employment is far more complex: overall representation in government companies and public corporations (2.44% in 2023) exceeds the administrative target, but it is nearly all concentrated in junior ranks — only one senior Ethiopian-origin employee across all 32 government companies examined. In local authorities and the civil service itself, the picture is even more troubling: only 0.2% in senior local-authority ranks, and 88% of Ethiopian-origin civil servants in the most junior rank (2019).

## Law enforcement — an important framing note

Ethiopian-Israelis are over-represented in arrest data (8.2%-9.4% of arrests, versus 2.2% of the population) — but this is **enforcement-representation** data, not a crime rate. The source (Knesset Research and Information Center) explicitly notes it is hard to know how much this reflects actual offense rates versus complaint rates or "over-policing" — a caveat that should be preserved wherever this data is presented.

## What we don't have data on — deliberately

Israel does not tag voter rolls by ethnicity, so there is not, and structurally cannot be, an official figure for voter turnout among Ethiopian-Israelis — neither at the individual nor the locality level. This is an interesting fact in itself about Israel's electoral system, not an omission. Separately, a figure that surfaced in several searches ("3.9% civil-service representation, December 2024, 0.3% senior") **could not be traced to an identifiable primary source** and is not shown on this page.`,
      am: `## አጠቃላይ እይታ

የኢትዮጵያ-እስራኤላውያን በክኔሴት የፖለቲካ ውክልና (3 የፓርላማ አባላት፣ 2.5%) ከአይሁድ ህዝብ ድርሻቸው (~2.2%) ጋር ተቀራራቢ ነው — ግን ይህ ልዩ ነው። በመንግስት ስራ ውክልና ምስሉ በጣም የተወሳሰበ ነው፦ ጠቅላላ ውክልና በመንግስት ኩባንያዎች (2.44% በ2023) ከኢላማ በላይ ቢሆንም፣ በአብዛኛው በጀማሪ ደረጃዎች ላይ ያተኮረ ነው — በ32 የመንግስት ኩባንያዎች ውስጥ አንድ ከፍተኛ የኢትዮጵያ ምንጭ ሠራተኛ ብቻ። በአካባቢ ባለስልጣናት እና በመንግስት አገልግሎት ራሱ ምስሉ የበለጠ አስቸጋሪ ነው፦ 0.2% ብቻ በከፍተኛ ደረጃ፣ እና 88% የኢትዮጵያ ምንጭ የመንግስት ሠራተኞች በጀማሪ ደረጃ (2019)።

## የህግ አፈጻጸም — አስፈላጊ የማዕቀፍ ማስታወሻ

የኢትዮጵያ-እስራኤላውያን በእስር መረጃ ውስጥ ከመጠን በላይ ተወክለዋል (8.2%-9.4% ከእስሮች፣ ከ2.2% ህዝብ ጋር ሲነጻጸር) — ግን ይህ **የአፈጻጸም ውክልና** መረጃ ነው፣ የወንጀል መጠን አይደለም። ምንጩ (የክኔሴት ምርምር ማዕከል) በግልጽ ይህ ትክክለኛ የወንጀል መጠንን ወይም የፖሊስ ስርዓተ-ጥለትን እንደሚያንጸባርቅ ለማወቅ አስቸጋሪ እንደሆነ ይገልጻል።

## መረጃ የሌለን — ሆን ተብሎ

እስራኤል የድምጽ መስጫ መዝገቦችን በዘር አይለይም፣ ስለዚህ ለኢትዮጵያ-እስራኤላውያን ኦፊሴላዊ የድምጽ አሰጣጥ መጠን የለም እና በስርዓት ሊኖር አይችልም። ይህ ስለ እስራኤል የምርጫ ስርዓት አስደሳች እውነታ ነው፣ መዘንጋት አይደለም። በተጨማሪም፣ በበርካታ ፍለጋዎች የወጣ አሃዝ ("3.9% የመንግስት አገልግሎት ውክልና፣ ታህሳስ 2024") **ወደ ግልጽ የመጀመሪያ ምንጭ ሊገኝ አልቻለም** እና በዚህ ገጽ አልቀረበም።`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findStatTopic(slug: string): StatTopicEntry | null {
  return STAT_TOPICS.find((t) => t.slug === slug) ?? null;
}

export function statTopicName(entry: StatTopicEntry, locale: Locale): string {
  return entry.name[locale] ?? entry.name[DEFAULT_LOCALE] ?? entry.name.he;
}

export function statTopicDescription(entry: StatTopicEntry, locale: Locale): string {
  return (
    entry.shortDescription[locale] ??
    entry.shortDescription[DEFAULT_LOCALE] ??
    entry.shortDescription.he
  );
}

export function pickFigure(
  figure: StatFigure,
  locale: Locale,
  key: "heading" | "figure" | "context",
): string {
  const t = figure[key];
  return t[locale] ?? t[DEFAULT_LOCALE] ?? t.he;
}

export function pickFigureConfidenceNote(
  figure: StatFigure,
  locale: Locale,
): string | null {
  const t = figure.confidenceNote;
  if (!t) return null;
  return t[locale] ?? t[DEFAULT_LOCALE] ?? t.he;
}

export function statTopicNarrative(entry: StatTopicEntry, locale: Locale): string | null {
  const t = entry.narrative;
  if (!t) return null;
  return t[locale] ?? t[DEFAULT_LOCALE] ?? t.he;
}

export function pickTranslatable(value: Translatable, locale: Locale): string {
  return value[locale] ?? value[DEFAULT_LOCALE] ?? value.he;
}

export function pickBarChartLabel(item: StatBarChartItem, locale: Locale): string {
  return pickTranslatable(item.label, locale);
}

/**
 * ISO-8601-ish temporal coverage string for the Dataset JSON-LD, derived
 * from the topic's figures. A single year if all figures share one; a
 * "min/max" range string otherwise (e.g. education mixes 2024 and 2025
 * data years).
 */
export function topicTemporalCoverage(entry: StatTopicEntry): string {
  const years = Array.from(new Set(entry.figures.map((f) => f.publishedYear))).sort(
    (a, b) => a - b,
  );
  if (years.length === 0) return "";
  if (years.length === 1) return String(years[0]);
  return `${years[0]}/${years[years.length - 1]}`;
}
