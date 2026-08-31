// Copy for /:lang/about — SERVER ONLY (ADR-020).
//
// Long-form page copy in three locales. The route's loader picks the one
// locale being rendered and returns it as `copy`; the component and `meta`
// both read it off loader data. `meta` may not import this module — it is
// not stripped from the client build and the build fails outright.

import type { Locale } from "~/lib/i18n/config";

export type AboutCopy = {
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
};

const COPY: Record<Locale, AboutCopy> = {
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

export function aboutCopy(locale: Locale): AboutCopy {
  return COPY[locale] ?? COPY.he;
}
