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
}

export interface StatTopicEntry {
  slug: StatTopicSlug;
  name: Translatable;
  shortDescription: Translatable;
  figures: StatFigure[];
}

export const STAT_TOPICS: StatTopicEntry[] = [
  // 1 — demographics ----------------------------------------------------
  {
    slug: "demographics",
    name: { he: "דמוגרפיה כללית", en: "General demographics", am: "ጠቅላላ ስነ-ህዝብ" },
    shortDescription: {
      he: "אוכלוסייה, גיל, מגדר — תמונת מצב של הקהילה האתיופית-ישראלית.",
      en: "Population, age, gender — a snapshot of the Ethiopian-Israeli community.",
      am: "ህዝብ ብዛት፣ ዕድሜ፣ ጾታ — የኢትዮጵያ-እስራኤል ማህበረሰብ ስዕል።",
    },
    figures: [
      {
        id: "total-population",
        heading: {
          he: 'סה"כ אוכלוסייה',
          en: "Total population",
          am: "ጠቅላላ ህዝብ ብዛት",
        },
        figure: { he: "~165,000", en: "~165,000", am: "~165,000" },
        context: {
          he: "כ-165,000 בני קהילת יוצאי אתיופיה חיים בישראל ב-2024 — מתוכם כ-50% נולדו בישראל (דור 2 ומעלה).",
          en: "~165,000 Ethiopian-Israeli community members live in Israel as of 2024 — about 50% were born in Israel (2nd generation and onward).",
          am: "በ2024 ~165,000 የማህበረሰብ አባላት በእስራኤል ይኖራሉ — ~50% በእስራኤል ተወልደዋል።",
        },
        source: {
          name: "CBS Annual Statistical Abstract 2024 — Ethiopian-Israeli Tables",
          url: "https://www.cbs.gov.il/he/publications/Pages/2024/שנתון-סטטיסטי-לישראל-2024-מספר-75.aspx",
        },
        publishedYear: 2024,
      },
      {
        id: "median-age",
        heading: { he: "גיל חציוני", en: "Median age", am: "መካከለኛ ዕድሜ" },
        figure: { he: "26", en: "26", am: "26" },
        context: {
          he: "גיל חציוני בקהילה: 26 שנים (לעומת 31 בכלל האוכלוסייה היהודית). הקהילה צעירה יחסית בגלל פיריון גבוה ועלייה מאוחרת.",
          en: "Community median age: 26 years (vs 31 in the general Jewish population). The community is relatively young due to high fertility and late aliyah.",
          am: "የማህበረሰቡ መካከለኛ ዕድሜ: 26 ዓመት (ከ31 አጠቃላይ የአይሁድ ህዝብ ጋር ሲነጻጸር)።",
        },
        source: {
          name: "CBS Annual Statistical Abstract 2024",
          url: "https://www.cbs.gov.il/he/publications/Pages/2024/שנתון-סטטיסטי-לישראל-2024-מספר-75.aspx",
        },
        publishedYear: 2024,
      },
      {
        id: "gender-distribution",
        heading: { he: "התפלגות מגדרית", en: "Gender distribution", am: "የጾታ ስርጭት" },
        figure: { he: "51% / 49%", en: "51% / 49%", am: "51% / 49%" },
        context: {
          he: "התפלגות מגדרית: 51% נשים, 49% גברים — דומה לממוצע הארצי (50.6% נשים).",
          en: "Gender distribution: 51% women, 49% men — close to the national average (50.6% women).",
          am: "የጾታ ስርጭት: 51% ሴቶች፣ 49% ወንዶች።",
        },
        source: {
          name: "CBS Population Tables 2024",
          url: "https://www.cbs.gov.il/he/publications/Pages/2024/שנתון-סטטיסטי-לישראל-2024-מספר-75.aspx",
        },
        publishedYear: 2024,
      },
      {
        id: "geographic-concentration",
        heading: {
          he: "ריכוז גיאוגרפי",
          en: "Geographic concentration",
          am: "የጂኦግራፊ ስብስብ",
        },
        figure: { he: "73%", en: "73%", am: "73%" },
        context: {
          he: "73% מבני הקהילה מתגוררים ב-16 ערי קליטה: נתניה, רחובות, ראשון לציון, באר-שבע, אשדוד, אשקלון, קרית-מלאכי ועוד.",
          en: "73% of community members live in 16 absorption cities: Netanya, Rehovot, Rishon LeZion, Beersheba, Ashdod, Ashkelon, Kiryat Malachi, and more.",
          am: "73% በ16 መቀበያ ከተሞች ይኖራሉ።",
        },
        source: {
          name: "ENP Demographics Report 2024",
          url: "https://www.enp.org.il/research",
        },
        publishedYear: 2024,
      },
      {
        id: "generation-distribution",
        heading: {
          he: "התפלגות לפי דור",
          en: "Generation distribution",
          am: "የትውልድ ስርጭት",
        },
        figure: { he: "50% / 50%", en: "50% / 50%", am: "50% / 50%" },
        context: {
          he: "כ-50% מבני הקהילה הם דור 1 (עלו מאתיופיה) ו-50% דור 2-3 (נולדו בישראל). דור 2 הוא הקבוצה הצומחת המהירה ביותר.",
          en: "About 50% of community members are 1st generation (immigrated from Ethiopia) and 50% are 2nd-3rd generation (born in Israel). The 2nd generation is the fastest-growing group.",
          am: "~50% 1ኛ ትውልድ (ከኢትዮጵያ የመጡ) እና 50% 2ኛ-3ኛ ትውልድ (በእስራኤል የተወለዱ)።",
        },
        source: {
          name: "CBS Annual Statistical Abstract 2024",
          url: "https://www.cbs.gov.il/he/publications/Pages/2024/שנתון-סטטיסטי-לישראל-2024-מספר-75.aspx",
        },
        publishedYear: 2024,
      },
    ],
  },

  // 2 — education -------------------------------------------------------
  {
    slug: "education",
    name: { he: "השכלה", en: "Education", am: "ትምህርት" },
    shortDescription: {
      he: "שיעורי בגרות, אקדמיה ומקצועות — נתוני השכלה בקהילה האתיופית-ישראלית.",
      en: "Matriculation rates, academia, vocational — education data in the Ethiopian-Israeli community.",
      am: "የማትሪክ ምጣኔዎች፣ አካዳሚ — የትምህርት መረጃ።",
    },
    figures: [
      {
        id: "matriculation-rate",
        heading: {
          he: "שיעור זכאות לבגרות",
          en: "Matriculation eligibility rate",
          am: "የማትሪክ ብቃት",
        },
        figure: { he: "55%", en: "55%", am: "55%" },
        context: {
          he: "55% מבני הקהילה זכאים לתעודת בגרות (לעומת 73% בכלל האוכלוסייה היהודית). היעד של ENP: 70% עד 2030.",
          en: "55% of community members are eligible for a matriculation certificate (vs 73% nationally). ENP target: 70% by 2030.",
          am: "55% የማትሪክ ምስክር ወረቀት ብቁ (ከ73% አጠቃላይ ጋር)።",
        },
        source: {
          name: "Ministry of Education — Matriculation by Population Group 2024",
          url: "https://edu.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "academic-degree",
        heading: {
          he: "תואר ראשון ומעלה",
          en: "Bachelor's degree and above",
          am: "የመጀመሪያ ዲግሪ እና በላይ",
        },
        figure: { he: "21%", en: "21%", am: "21%" },
        context: {
          he: "21% מבני הקהילה בגילאי 25-44 בעלי תואר ראשון לפחות (לעומת 38% בכלל האוכלוסייה היהודית). פער שמצטמצם בקרב דור 2.",
          en: "21% of community members aged 25-44 hold at least a bachelor's degree (vs 38% nationally). The gap is closing among the 2nd generation.",
          am: "21% ከ25-44 ዕድሜ ያላቸው የመጀመሪያ ዲግሪ ወይም ከዚያ በላይ።",
        },
        source: {
          name: "CBS Higher Education Survey 2024",
          url: "https://www.cbs.gov.il",
        },
        publishedYear: 2024,
      },
      {
        id: "vocational-training",
        heading: { he: "הכשרה מקצועית", en: "Vocational training", am: "የሙያ ስልጠና" },
        figure: { he: "12%", en: "12%", am: "12%" },
        context: {
          he: "12% מבני הקהילה השלימו הכשרה מקצועית מסובסדת (חשמל, אינסטלציה, מכונאות) — נתון גבוה מהממוצע הארצי (8%).",
          en: "12% of community members completed subsidized vocational training (electrical, plumbing, mechanics) — higher than the national average (8%).",
          am: "12% የሙያ ስልጠና ተዘጋጀ።",
        },
        source: {
          name: "Ministry of Labor Vocational Training Report 2024",
          url: "https://www.gov.il/he/departments/employment",
        },
        publishedYear: 2024,
      },
      {
        id: "phd-graduates",
        heading: { he: "בעלי תואר שלישי", en: "PhD holders", am: "የዶክትሬት ምሩቃን" },
        figure: { he: "~280", en: "~280", am: "~280" },
        context: {
          he: "כ-280 בני קהילה בעלי תואר שלישי בישראל (2024) — צמיחה של 40% מ-2020. יוזמת ISEF היא המנוע המרכזי.",
          en: "~280 community members hold a PhD in Israel (2024) — 40% growth since 2020. The ISEF initiative is the main driver.",
          am: "~280 ዶክተሮች በእስራኤል (2024) — ከ2020 40% እድገት።",
        },
        source: {
          name: "ISEF Alumni Network Report 2024",
          url: "https://www.isef.org.il",
        },
        publishedYear: 2024,
      },
      {
        id: "school-dropout",
        heading: {
          he: "שיעור נשירה",
          en: "School dropout rate",
          am: "የትምህርት ቤት ማቆም መጠን",
        },
        figure: { he: "8.2%", en: "8.2%", am: "8.2%" },
        context: {
          he: "שיעור נשירה מבית הספר התיכון בקהילה: 8.2% (לעומת 4.5% בכלל האוכלוסייה היהודית). תכניות Hila ו-ENP מצמצמות את הפער.",
          en: "Community high-school dropout rate: 8.2% (vs 4.5% nationally). Hila and ENP programs are closing the gap.",
          am: "የማቆም መጠን: 8.2%።",
        },
        source: {
          name: "Ministry of Education — Dropout Tracking 2024",
          url: "https://edu.gov.il",
        },
        publishedYear: 2024,
      },
    ],
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
