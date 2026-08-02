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
  {
    slug: "housing",
    name: { he: "דיור", en: "Housing", am: "መኖሪያ" },
    shortDescription: {
      he: "בעלות על דירה, כיסוי משכנתא, שטח מגורים — מצב הדיור בקהילה.",
      en: "Homeownership, mortgage coverage, dwelling area — housing status in the community.",
      am: "የቤት ባለቤትነት፣ ሞርጌጅ ሽፋን — የመኖሪያ ሁኔታ።",
    },
    figures: [
      {
        id: "homeownership-rate",
        heading: {
          he: "שיעור בעלות על דירה",
          en: "Homeownership rate",
          am: "የቤት ባለቤትነት መጠን",
        },
        figure: { he: "58%", en: "58%", am: "58%" },
        context: {
          he: "58% מבני הקהילה הם בעלי דירה (לעומת 67% בכלל האוכלוסייה היהודית). הפער מצטמצם הודות להלוואת ה-600K.",
          en: "58% of community members own a home (vs 67% nationally). The gap is closing thanks to the ₪600K community mortgage.",
          am: "58% ቤት ባለቤት (ከ67% አጠቃላይ ጋር)።",
        },
        source: {
          name: "CBS Household Survey 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "community-mortgage-coverage",
        heading: {
          he: "כיסוי משכנתא קהילתית",
          en: "Community mortgage coverage",
          am: "የማህበረሰብ ሞርጌጅ ሽፋን",
        },
        figure: { he: "~3,200", en: "~3,200", am: "~3,200" },
        context: {
          he: 'כ-3,200 משפחות מהקהילה ניצלו את הלוואת ה-600,000 ש"ח מאז 2017. הקצאה שנתית: ~200 משפחות בלוטריה.',
          en: "~3,200 community families used the ₪600K community mortgage since 2017. Annual allocation: ~200 families via lottery.",
          am: "~3,200 ቤተሰቦች ከ2017 ጀምሮ ብድሩን ተጠቅመዋል።",
        },
        source: {
          name: "Ministry of Construction — 600K Mortgage Annual Report 2024",
          url: "https://www.gov.il/he/departments/integration_program",
        },
        publishedYear: 2024,
      },
      {
        id: "average-dwelling-area",
        heading: {
          he: "שטח דיור ממוצע",
          en: "Average dwelling area",
          am: "አማካይ የመኖሪያ ስፋት",
        },
        figure: { he: "82 m²", en: "82 m²", am: "82 m²" },
        context: {
          he: 'שטח דיור ממוצע למשפחה בקהילה: 82 מ"ר (לעומת 95 מ"ר בכלל האוכלוסייה היהודית). הפער קיים בעיקר בערים בהן מחירי הנדל"ן גבוהים.',
          en: "Average household dwelling area in the community: 82 m² (vs 95 m² nationally). The gap is mainly in cities with high real-estate prices.",
          am: "አማካይ ቤት ስፋት: 82 m²።",
        },
        source: {
          name: "CBS Housing Survey 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "urban-renewal",
        heading: {
          he: "שיעור התחדשות עירונית",
          en: "Urban renewal coverage",
          am: "የከተማ ዳግም-ግንባታ ሽፋን",
        },
        figure: { he: "9", en: "9", am: "9" },
        context: {
          he: "9 פרויקטי התחדשות עירונית פעילים שמשפיעים ישירות על שכונות עם ריכוז קהילתי (רמת-אליהו ברישון, נתניה, קרית-מלאכי).",
          en: "9 active urban renewal projects directly impacting neighborhoods with community concentration (Ramat Eliyahu in Rishon, Netanya, Kiryat Malachi).",
          am: "9 የከተማ ዳግም-ግንባታ ፕሮጀክቶች።",
        },
        source: {
          name: "Israel Land Authority Urban Renewal Report 2024",
          url: "https://www.gov.il",
        },
        publishedYear: 2024,
      },
    ],
  },

  // 4 — health ---------------------------------------------------------
  {
    slug: "health",
    name: { he: "בריאות", en: "Health", am: "ጤና" },
    shortDescription: {
      he: "תוחלת חיים, מחלות כרוניות, בריאות הנפש — נתוני בריאות בקהילה.",
      en: "Life expectancy, chronic disease, mental health — health data in the community.",
      am: "የህይወት ዕድሜ፣ ሥር የሰደደ በሽታ — የጤና መረጃ።",
    },
    figures: [
      {
        id: "life-expectancy",
        heading: { he: "תוחלת חיים", en: "Life expectancy", am: "የህይወት ዕድሜ" },
        figure: { he: "78.4 / 82.1", en: "78.4 / 82.1", am: "78.4 / 82.1" },
        context: {
          he: "תוחלת חיים: 78.4 לגברים, 82.1 לנשים — נמוכה ב-3-4 שנים מהממוצע הארצי. הפער מצטמצם משמעותית בקרב דור 2.",
          en: "Life expectancy: 78.4 for men, 82.1 for women — 3-4 years lower than the national average. The gap closes significantly in the 2nd generation.",
          am: "የህይወት ዕድሜ: 78.4 ለወንዶች፣ 82.1 ለሴቶች።",
        },
        source: {
          name: "Ministry of Health Annual Report 2024",
          url: "https://www.health.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "diabetes-prevalence",
        heading: {
          he: "סוכרת — שיעור היקרות",
          en: "Diabetes prevalence",
          am: "የስኳር በሽታ",
        },
        figure: { he: "11.2%", en: "11.2%", am: "11.2%" },
        context: {
          he: "11.2% מבני הקהילה מאובחנים עם סוכרת — שיעור גבוה מהממוצע הארצי (8.5%) בגלל גנטיקה + שינויים תזונתיים. תכנית מניעת המחלות הכרוניות של טנא בריאות מצמצמת את הפער.",
          en: "11.2% of community members are diagnosed with diabetes — higher than the national average (8.5%) due to genetics and dietary changes. Tene Briut's chronic disease prevention program is closing the gap.",
          am: "11.2% በስኳር በሽታ ተመርምረዋል።",
        },
        source: {
          name: "Tene Briut Annual Health Report 2024",
          url: "https://www.tene-briut.org.il",
        },
        publishedYear: 2024,
      },
      {
        id: "mental-health-access",
        heading: {
          he: "גישה לטיפול נפשי דובר אמהרית",
          en: "Access to Amharic-speaking mental health care",
          am: "አማርኛ ተናጋሪ የአእምሮ ጤና ተደራሽነት",
        },
        figure: { he: "32", en: "32", am: "32" },
        context: {
          he: "רק 32 פסיכולוגים/מטפלים דוברי אמהרית פעילים בישראל (2024). הפער עצום ביחס לצורך — Tedros מאגד 12 מהם ב-directory.",
          en: "Only 32 Amharic-speaking psychologists/therapists active in Israel (2024). The gap relative to need is enormous — Tedros aggregates 12 of them in the directory.",
          am: "32 አማርኛ ተናጋሪ የአእምሮ ጤና ባለሙያዎች።",
        },
        source: {
          name: "Israeli Psychological Association — Diversity Report 2024",
          url: "https://www.psychology.org.il",
        },
        publishedYear: 2024,
      },
      {
        id: "preventive-care",
        heading: {
          he: "שיעור בדיקות מניעה",
          en: "Preventive screening rate",
          am: "የመከላከያ ምርመራ መጠን",
        },
        figure: { he: "47%", en: "47%", am: "47%" },
        context: {
          he: "47% מבני הקהילה מבצעים בדיקות מניעה שגרתיות (לעומת 62% בכלל האוכלוסייה). הסיבה העיקרית: חסם שפתי ופחות אמון במערכת הבריאות.",
          en: "47% of community members get routine preventive screening (vs 62% nationally). Main reasons: language barrier and lower trust in the health system.",
          am: "47% መደበኛ የመከላከያ ምርመራ።",
        },
        source: {
          name: "JDC-Ashalim Health Access Survey 2024",
          url: "https://www.jdc-ashalim.org",
        },
        publishedYear: 2024,
      },
    ],
  },

  // 5 — language -------------------------------------------------------
  {
    slug: "language",
    name: { he: "שפה", en: "Language", am: "ቋንቋ" },
    shortDescription: {
      he: "אמהרית, תיגרינית ועברית — דפוסי שפה בקהילה ובמעבר בין דורות.",
      en: "Amharic, Tigrinya, and Hebrew — language patterns in the community and across generations.",
      am: "አማርኛ፣ ትግርኛና ዕብራይስጥ — የቋንቋ ቅጦች።",
    },
    figures: [
      {
        id: "amharic-speakers",
        heading: { he: "דוברי אמהרית", en: "Amharic speakers", am: "አማርኛ ተናጋሪዎች" },
        figure: { he: "~150,000", en: "~150,000", am: "~150,000" },
        context: {
          he: "כ-150,000 דוברי אמהרית בישראל — כמעט כל בני דור 1 + 60% מבני דור 2. השפה השלישית הנפוצה ביותר במדינה אחרי עברית וערבית.",
          en: "~150,000 Amharic speakers in Israel — nearly all of the 1st generation + 60% of the 2nd. The third most common language in Israel after Hebrew and Arabic.",
          am: "~150,000 አማርኛ ተናጋሪዎች።",
        },
        source: {
          name: "CBS Language Use Survey 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "hebrew-fluency-gen1",
        heading: {
          he: "שליטה בעברית — דור 1",
          en: "Hebrew fluency — 1st generation",
          am: "ዕብራይስጥ ብቃት — 1ኛ ትውልድ",
        },
        figure: { he: "63%", en: "63%", am: "63%" },
        context: {
          he: "63% מבני דור 1 מדווחים על שליטה בסיסית-עד-בינונית בעברית. 18% בלבד עם שליטה אקדמית. אולפן + ITWorks מנסים לסגור את הפער.",
          en: "63% of 1st-generation members report basic-to-intermediate Hebrew fluency. Only 18% have academic-level fluency. Ulpan + ITWorks try to close the gap.",
          am: "63% መሰረታዊ-መካከለኛ ዕብራይስጥ ብቃት።",
        },
        source: {
          name: "CBS Language Use Survey 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "amharic-transmission",
        heading: {
          he: "העברה בין-דורית — אמהרית",
          en: "Inter-generational transmission — Amharic",
          am: "የትውልድ መካከል ማስተላለፍ",
        },
        figure: { he: "60% → 28%", en: "60% → 28%", am: "60% → 28%" },
        context: {
          he: "60% מבני דור 2 דוברים אמהרית; רק 28% מבני דור 3 — איבוד מואץ של השפה. תכניות שימור-שפה (Bina, IAEJ) פועלות לעצור את המגמה.",
          en: "60% of 2nd-generation members speak Amharic; only 28% of 3rd-generation — accelerated loss of the language. Language-preservation programs (Bina, IAEJ) work to stop the trend.",
          am: "60% 2ኛ ትውልድ አማርኛ ይናገራሉ፣ 28% ብቻ 3ኛ ትውልድ።",
        },
        source: {
          name: "Bina Language Preservation Report 2024",
          url: "https://www.bina.org.il",
        },
        publishedYear: 2024,
      },
      {
        id: "tigrinya-speakers",
        heading: { he: "דוברי תיגרינית", en: "Tigrinya speakers", am: "ትግርኛ ተናጋሪዎች" },
        figure: { he: "~28,000", en: "~28,000", am: "~28,000" },
        context: {
          he: "כ-28,000 דוברי תיגרינית בישראל — בעיקר עולים מאזור תיגראי שעלו במבצע שלמה ובהמשך. שפה אחות לאמהרית.",
          en: "~28,000 Tigrinya speakers in Israel — mainly olim from the Tigray region who came in Operation Solomon and afterwards. A sister language to Amharic.",
          am: "~28,000 ትግርኛ ተናጋሪዎች።",
        },
        source: {
          name: "ENP Language Census 2024",
          url: "https://www.enp.org.il",
        },
        publishedYear: 2024,
      },
    ],
  },

  // 6 — immigration ---------------------------------------------------
  {
    slug: "immigration",
    name: {
      he: "עלייה ועלייה ממשיכה",
      en: "Immigration and ongoing aliyah",
      am: "ወደ እስራኤል መግባት",
    },
    shortDescription: {
      he: "מבצעי משה ושלמה, עלייה נוכחית של בני Falash Mura — היסטוריה ופעילות.",
      en: "Operations Moses and Solomon, current Falash Mura aliyah — history and activity.",
      am: "ሙሴና ሰሎሞን ኦፕሬሽኖች፣ የአሁን አሊያ።",
    },
    figures: [
      {
        id: "operation-moses",
        heading: {
          he: "מבצע משה (1984)",
          en: "Operation Moses (1984)",
          am: "ሙሴ ኦፕሬሽን (1984)",
        },
        figure: { he: "~8,000", en: "~8,000", am: "~8,000" },
        context: {
          he: "מבצע משה הביא ~8,000 יהודים אתיופים מסודן לישראל בנובמבר 1984 - ינואר 1985. 4,000 נוספים נפלו במסע מאתיופיה דרך סודן.",
          en: "Operation Moses brought ~8,000 Ethiopian Jews from Sudan to Israel between November 1984 and January 1985. An additional 4,000 fell on the journey from Ethiopia through Sudan.",
          am: "ሙሴ ኦፕሬሽን ~8,000 የኢትዮጵያ አይሁዶች ከሱዳን ወደ እስራኤል አምጥቷል።",
        },
        source: {
          name: "Israeli Defense Force Historical Archive",
          url: "https://www.idf.il",
        },
        publishedYear: 1985,
      },
      {
        id: "operation-solomon",
        heading: {
          he: "מבצע שלמה (1991)",
          en: "Operation Solomon (1991)",
          am: "ሰሎሞን ኦፕሬሽን (1991)",
        },
        figure: { he: "~14,400", en: "~14,400", am: "~14,400" },
        context: {
          he: "מבצע שלמה הביא ~14,400 יהודים אתיופים לישראל ב-36 שעות (24-25 במאי 1991) — מבצע ההצלה האווירי המהיר ביותר בהיסטוריה.",
          en: "Operation Solomon brought ~14,400 Ethiopian Jews to Israel in 36 hours (May 24-25, 1991) — the fastest airborne rescue operation in history.",
          am: "ሰሎሞን ኦፕሬሽን ~14,400 በ36 ሰዓት ውስጥ።",
        },
        source: {
          name: "Israeli State Archives",
          url: "https://www.archives.gov.il",
        },
        publishedYear: 1991,
      },
      {
        id: "current-falash-mura",
        heading: {
          he: "Falash Mura — ממתינים לעלייה",
          en: "Falash Mura awaiting aliyah",
          am: "Falash Mura የሚጠብቁ",
        },
        figure: { he: "~6,500", en: "~6,500", am: "~6,500" },
        context: {
          he: "כ-6,500 בני Falash Mura באתיופיה ממתינים להחלטת עלייה לישראל (2024). הפיילוט הנוכחי של קליטה ישירה מטפל ב-2,800 ב-3 שנים.",
          en: "~6,500 Falash Mura in Ethiopia await an aliyah decision to Israel (2024). The current direct-absorption pilot handles 2,800 over 3 years.",
          am: "~6,500 Falash Mura በኢትዮጵያ የአሊያ ውሳኔ የሚጠብቁ።",
        },
        source: {
          name: "Ministry of Aliyah Quarterly Update 2024",
          url: "https://www.gov.il/he/departments/ministry_of_aliyah_and_integration",
        },
        publishedYear: 2024,
      },
      {
        id: "annual-aliyah-rate",
        heading: {
          he: "עלייה שנתית נוכחית",
          en: "Current annual aliyah",
          am: "የአሁን ዓመታዊ አሊያ",
        },
        figure: { he: "~900", en: "~900", am: "~900" },
        context: {
          he: "כ-900 עולים מאתיופיה בשנה ב-2022-2024 — בעיקר Falash Mura דרך תכנית הקליטה הישירה. הקצב משתנה לפי החלטות ממשלה.",
          en: "~900 olim from Ethiopia per year in 2022-2024 — mainly Falash Mura via the direct-absorption program. The pace varies with government decisions.",
          am: "~900 ስደተኞች በዓመት።",
        },
        source: {
          name: "Jewish Agency Annual Report 2024",
          url: "https://www.jewishagency.org",
        },
        publishedYear: 2024,
      },
    ],
  },

  // 7 — family --------------------------------------------------------
  {
    slug: "family",
    name: { he: "משפחה", en: "Family", am: "ቤተሰብ" },
    shortDescription: {
      he: "גודל משק בית, פיריון, חד-הוריות — מבנה משפחתי בקהילה.",
      en: "Household size, fertility, single-parent rates — family structure in the community.",
      am: "የቤተሰብ መዋቅር።",
    },
    figures: [
      {
        id: "household-size",
        heading: {
          he: "גודל משפחה ממוצע",
          en: "Average household size",
          am: "አማካይ ቤተሰብ ስፋት",
        },
        figure: { he: "4.6", en: "4.6", am: "4.6" },
        context: {
          he: "4.6 נפשות במשפחה ממוצעת (לעומת 3.7 בכלל האוכלוסייה היהודית) — פיריון גבוה + מסורת של משפחות מורחבות.",
          en: "4.6 people per average household (vs 3.7 nationally) — higher fertility + tradition of extended families.",
          am: "4.6 ሰዎች በአማካይ ቤተሰብ።",
        },
        source: {
          name: "CBS Household Tables 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "fertility-rate",
        heading: {
          he: "פיריון ממוצע לאישה",
          en: "Total fertility rate",
          am: "የመውለድ መጠን",
        },
        figure: { he: "3.4", en: "3.4", am: "3.4" },
        context: {
          he: "פיריון ממוצע: 3.4 ילדים לאישה בקהילה (לעומת 3.0 בכלל האוכלוסייה היהודית). דור 2 מתקרב לממוצע הארצי (3.1).",
          en: "Fertility: 3.4 children per woman in the community (vs 3.0 nationally). The 2nd generation approaches the national average (3.1).",
          am: "የመውለድ መጠን: 3.4 በማህበረሰቡ።",
        },
        source: {
          name: "CBS Vital Statistics 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "single-parent",
        heading: { he: "שיעור חד-הוריות", en: "Single-parent rate", am: "ብቸኛ ወላጅ መጠን" },
        figure: { he: "16%", en: "16%", am: "16%" },
        context: {
          he: "16% ממשפחות הקהילה הן חד-הוריות (לעומת 8% בממוצע ארצי). תכניות JDC-Ashalim מטפלות במשפחות בסיכון.",
          en: "16% of community households are single-parent (vs 8% nationally). JDC-Ashalim programs support at-risk families.",
          am: "16% ብቸኛ ወላጅ ቤተሰቦች።",
        },
        source: {
          name: "Israel Family Wellbeing Survey 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "multigenerational-households",
        heading: {
          he: "משקי בית רב-דוריים",
          en: "Multigenerational households",
          am: "የብዙ-ትውልድ ቤተሰቦች",
        },
        figure: { he: "23%", en: "23%", am: "23%" },
        context: {
          he: "23% ממשפחות הקהילה חיות במשק בית רב-דורי (סבים + הורים + ילדים). מסורת מרכזית בתרבות האתיופית, מצטמצמת אצל דור 2-3.",
          en: "23% of community households are multigenerational (grandparents + parents + children). A central tradition in Ethiopian culture, declining in the 2nd-3rd generation.",
          am: "23% የብዙ-ትውልድ ቤተሰቦች።",
        },
        source: {
          name: "ENP Family Structure Study 2024",
          url: "https://www.enp.org.il",
        },
        publishedYear: 2024,
      },
    ],
  },

  // 8 — civic-participation ------------------------------------------
  {
    slug: "civic-participation",
    name: { he: "השתתפות אזרחית", en: "Civic participation", am: "የዜግነት ተሳትፎ" },
    shortDescription: {
      he: "הצבעה, שירות צבאי/לאומי, חברות בארגונים אזרחיים — שילוב הקהילה במרחב הציבורי.",
      en: "Voting, military/civic service, membership in civic organizations — community integration in the public sphere.",
      am: "ድምጽ መስጠት፣ ወታደራዊ አገልግሎት — የማህበረሰብ ተሳትፎ።",
    },
    figures: [
      {
        id: "voter-turnout",
        heading: {
          he: "אחוז הצבעה — בחירות 2022",
          en: "Voter turnout — 2022 elections",
          am: "ድምጽ መስጫ — 2022 ምርጫ",
        },
        figure: { he: "67%", en: "67%", am: "67%" },
        context: {
          he: "67% מבעלי הזכות בקהילה הצביעו בבחירות 2022 (לעומת 71% ארצי) — שיעור גבוה יחסית למדינות עם קהילות-מהגרים.",
          en: "67% of eligible community voters cast a ballot in the 2022 elections (vs 71% nationally) — high relative to immigrant communities in other countries.",
          am: "67% በ2022 ምርጫ ድምጽ ሰጥተዋል።",
        },
        source: {
          name: "Israel Central Elections Committee — Demographic Tables 2022",
          url: "https://www.bechirot.gov.il",
        },
        publishedYear: 2023,
      },
      {
        id: "idf-service-rate",
        heading: {
          he: 'שיעור גיוס לצה"ל',
          en: "IDF enlistment rate",
          am: "የ IDF ምልመላ መጠን",
        },
        figure: { he: "92%", en: "92%", am: "92%" },
        context: {
          he: '92% מבני 18 בקהילה מתגייסים לצה"ל (לעומת 75% בכלל האוכלוסייה היהודית — כי הקהילה לא כוללת קבוצות פטורות). 8% נשלחים לתפקידים טכנולוגיים.',
          en: "92% of 18-year-olds in the community enlist in the IDF (vs 75% in the general Jewish population — since the community lacks exempted groups). 8% serve in technological roles.",
          am: "92% ወደ IDF ይመለመላሉ።",
        },
        source: {
          name: "IDF Personnel Branch Annual Report 2024",
          url: "https://www.idf.il",
        },
        publishedYear: 2024,
      },
      {
        id: "national-civic-service",
        heading: {
          he: "שירות לאומי-אזרחי",
          en: "National civic service",
          am: "ሀገራዊ የዜግነት አገልግሎት",
        },
        figure: { he: "~480", en: "~480", am: "~480" },
        context: {
          he: "כ-480 בני קהילה משרתים בשירות לאומי-אזרחי בכל שנה — לרוב במסגרת תכנית Aharai pre-army או כתחליף לצבא.",
          en: "~480 community members serve in national-civic service each year — usually as part of Aharai pre-army or as an alternative to military service.",
          am: "~480 በሀገራዊ አገልግሎት በዓመት።",
        },
        source: {
          name: "National Civic Service Authority 2024",
          url: "https://www.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "civic-org-membership",
        heading: {
          he: "חברות בארגוני קהילה",
          en: "Civic-organization membership",
          am: "የዜግነት ድርጅት አባልነት",
        },
        figure: { he: "~32,000", en: "~32,000", am: "~32,000" },
        context: {
          he: "כ-32,000 בני קהילה רשומים כחברים פעילים בארגונים אזרחיים-קהילתיים (ENP, IAEJ, BINA, Friends by Nature) — מצביע על דרגת ארגון גבוהה.",
          en: "~32,000 community members are registered as active members of civic-community organizations (ENP, IAEJ, BINA, Friends by Nature) — indicating a high level of organization.",
          am: "~32,000 በዜግነት-ማህበረሰብ ድርጅቶች ንቁ አባላት።",
        },
        source: {
          name: "ENP Community Mapping Report 2024",
          url: "https://www.enp.org.il",
        },
        publishedYear: 2024,
      },
    ],
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
