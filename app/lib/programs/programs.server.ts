// Org programs seed (RIN-424 / part of RIN-417 SEO Wave 3b).
//
// Programs operated by the community organizations seeded in
// `lib/orgs/orgs.server.ts`. Captures high-intent queries like "ENP SPACE",
// "Tene Briut", "Olim Beyahad mentorship".
//
// TED-157: 17 of the original 27 entries were retired. They named programmes
// the operating organizations do not run, and carried fabricated figures,
// two placeholder phone numbers (`1-800-XXX-XXX` published as a youth crisis
// line, and `02-XXX-XXXX` as Tebeka intake) and four domains that do not
// resolve. The survivors were stripped back to what the organizations
// themselves publish. Amounts stay out unless the operator publishes them.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { ProgramTrack } from "./categories";

export type { ProgramTrack } from "./categories";

export interface ProgramEntry {
  slug: string;
  /** Slug of the operating org (must match `lib/orgs/orgs.server.ts`). */
  orgSlug: string;
  track: ProgramTrack;
  title: Translatable;
  shortDescription: Translatable;
  /** Structured fields rendered as a fact-sheet sidebar. */
  duration: Translatable;
  location: Translatable;
  forWhom: Translatable;
  /** Slugs of related rights / glossary terms. */
  relatedRights: string[];
  relatedTerms: string[];
  /** Markdown body × locale. */
  bodies: Record<Locale, string>;
}

// Helper that builds a consistent body skeleton from the structured fields.
function makeBody(
  loc: Locale,
  args: {
    intro: string;
    whatsIncluded: string;
    howToApply: string;
    eligibility: string;
  },
): string {
  const headings = {
    he: { included: "מה כלול", apply: "איך פונים?", eligibility: "דרישות-קבלה" },
    en: {
      included: "What's included",
      apply: "How to apply",
      eligibility: "Eligibility",
    },
    am: { included: "ምን ይካተታል", apply: "እንዴት ማመልከት", eligibility: "ብቁነት" },
  } as const;
  const h = headings[loc];
  return `${args.intro}

## ${h.included}

${args.whatsIncluded}

## ${h.apply}

${args.howToApply}

## ${h.eligibility}

${args.eligibility}
`;
}

export const PROGRAMS: ProgramEntry[] = [
  // --- ENP (4) -----------------------------------------------------------
  {
    slug: "enp-space",
    orgSlug: "enp",
    track: "education",
    title: {
      he: "ENP SPACE — תגבור לימודי לכיתות ז'-י\"ב",
      en: "ENP SPACE — Academic Support Grades 7-12",
      am: "ENP SPACE — የአካዳሚክ ድጋፍ ለ7-12ኛ ክፍል",
    },
    shortDescription: {
      he: "תכנית-תגבור-רב-שנתית בבתי-ספר תיכון. 5,635 תלמידים ב-32 יישובים (נתוני העמותה, תשפ"ו).",
      en: "Multi-year academic-support program in high schools. 5,635 pupils in 32 localities (ENP figures, 2025/26).",
      am: "በሁለተኛ ደረጃ ትምህርት ቤቶች የብዙ ዓመት የአካዳሚክ ድጋፍ።",
    },
    duration: {
      he: "6 שנים (כיתה ז' עד י\"ב)",
      en: "6 years (grades 7-12)",
      am: "6 ዓመታት (7-12ኛ ክፍል)",
    },
    location: {
      he: "בתי-ספר שותפים בכל הארץ",
      en: "Partner schools nationwide",
      am: "በመላ ሀገሪቱ ሽርክና ትምህርት ቤቶች",
    },
    forWhom: {
      he: "תלמידי תיכון יוצאי אתיופיה",
      en: "Ethiopian-Israeli high-school students",
      am: "የኢትዮጵያ-እስራኤል ሁለተኛ ደረጃ ተማሪዎች",
    },
    relatedRights: ["matriculation-grant"],
    relatedTerms: ["enp", "beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `SPACE היא התכנית-המרכזית של ENP בחינוך התיכוני. החניכים מקבלים תגבור-לימודי שבועי, מנטור-אקדמי, וליווי בתהליך הבגרות. שיעורי הזכאות לבגרות שיוחסו כאן לתכנית הוסרו — לא אותר להם מקור שהעמותה מפרסמת.`,
        whatsIncluded: `- שיעורי-עזר שבועיים במתמטיקה, אנגלית, מדעים\n- מנטור אקדמי 1:1\n- הכנה לבגרות\n- קבוצות לימוד-קהילתי\n- חוגי-העשרה (תיאטרון, ספורט, חוגי-טכנולוגיה)`,
        howToApply: `**הצטרפות דרך בית-הספר:** ENP מפעילה את התכנית בבתי ספר שותפים ב-32 יישובים.\n\n1. שאלו את היועצ/ת בבית-הספר אם SPACE פעילה\n2. אם כן — רישום ב-ENP דרך מתאמ/ת SPACE בבית-הספר\n3. מבחן-קבלה קצר (לא תחרותי — לזיהוי תחומי-תגבור)`,
        eligibility: `- תלמיד/ת תיכון יוצא אתיופיה (ההורה אחד נולד באתיופיה)\n- בית-ספר שותף ל-SPACE\n- ממוצע 70+ (פתוחה גם לתלמידים-מתקשים שעוברים מבחן-מוטיבציה)`,
      }),
      en: makeBody("en", {
        intro: `SPACE is ENP's flagship high-school program. Participants receive weekly academic tutoring, an academic mentor, and matriculation accompaniment. Matriculation rates previously claimed here were removed — no figure published by ENP was found for them.`,
        whatsIncluded: `- Weekly tutoring in math, English, sciences\n- 1:1 academic mentor\n- Matriculation prep\n- Community study groups\n- Enrichment activities (theater, sports, tech clubs)`,
        howToApply: `**Join via your school:** ENP runs the programme in partner schools across 32 localities.\n\n1. Ask the school counselor if SPACE is active\n2. If yes — register with ENP via the school's SPACE coordinator\n3. Brief intake assessment (not competitive — identifies tutoring needs)`,
        eligibility: `- Ethiopian-Israeli high-school student (one parent born in Ethiopia)\n- School partnered with SPACE\n- 70+ average (also open to struggling students passing a motivation interview)`,
      }),
      am: makeBody("am", {
        intro: `SPACE የENP ዋነኛ የሁለተኛ ደረጃ ፕሮግራም ነው። ተሳታፊዎች ሳምንታዊ የአካዳሚክ ድጋፍ፣ የአካዳሚክ አማካሪና የመጨረሻ ፈተና አጃቢነት ይቀበላሉ።`,
        whatsIncluded: `- በሂሳብ፣ እንግሊዝኛ፣ ሳይንስ ሳምንታዊ ሥልጠና\n- 1:1 የአካዳሚክ አማካሪ\n- የመጨረሻ ፈተና ዝግጅት`,
        howToApply: `በትምህርት ቤትዎ የSPACE አስተባባሪ ያግኙ።`,
        eligibility: `- የኢትዮጵያ-እስራኤል ሁለተኛ ደረጃ ተማሪ\n- ሽርክና ትምህርት ቤት`,
      }),
    },
  },

  // --- Tene Briut (3) ----------------------------------------------------
  {
    slug: "tene-briut-cultural-navigators",
    orgSlug: "tene-briut",
    track: "health",
    title: {
      he: "מתאמי-בריאות תרבותיים — טנא בריאות",
      en: "Cultural Health Navigators — Tene Briut",
      am: "የቴኔ ብሪዩት የባህል ጤና አማካሪዎች",
    },
    shortDescription: {
      he: "ליווי מטופלים יוצאי-אתיופיה בקופות-חולים, בתי-חולים, וקופות סל-בריאות.",
      en: "Patient accompaniment in HMOs, hospitals, and health-basket programs for Ethiopian-Israelis.",
      am: "በኤች.ኤም.ኦና በሆስፒታሎች ታካሚዎችን ማጀብ።",
    },
    duration: {
      he: "מתמשך — לפי-צורך",
      en: "Ongoing — as needed",
      am: "ቀጣይ — በሚያስፈልገው መሰረት",
    },
    location: {
      he: "6 סניפים: רחובות, ירושלים, נתניה, ראשון לציון, באר שבע, חיפה",
      en: "6 branches: Rehovot, Jerusalem, Netanya, Rishon LeZion, Beersheba, Haifa",
      am: "6 ቅርንጫፎች",
    },
    forWhom: {
      he: "כל אדם יוצא-אתיופיה הזקוק לליווי-בריאותי",
      en: "Any Ethiopian-Israeli needing health navigation",
      am: "የጤና አጃቢ የሚያስፈልጋቸው",
    },
    relatedRights: ["medical-translation", "chronic-disease-prevention"],
    relatedTerms: ["tene-briut"],
    bodies: {
      he: makeBody("he", {
        intro: `המתאמ/ת-תרבותי/ת-של-טנא-בריאות מלווה אותך בכל פגישה רפואית מורכבת — מתרגם/ת מאמהרית/תיגרינית, מסביר/ה את ההמלצות-הרפואיות בהקשר-תרבותי, ומוודא/ת שהמטופל/ת באמת מבין/ה.`,
        whatsIncluded: `- ליווי בפגישת-רופא (בקופ"ח או בבית-חולים)\n- תרגום-בזמן-אמת אמהרית/תיגרינית/עברית\n- הבהרה תרבותית של המלצות-טיפול\n- ליווי בהליכים מורכבים (ניתוחים, אבחונים, אשפוז)\n- חינמי לזכאים`,
        howToApply: `1. שיחת טלפון למשרד בחדרה: 04-6211891 (tenebriut@tene-briut.org.il)\n2. מתאמ/ת מתאם זמן-פגישה איתך\n3. בפגישה — המתאמ/ת מצטרפ/ת אליך`,
        eligibility: `- אדם יוצא-אתיופיה (כולל דור-2 ו-3)\n- ללא-דרישת-זכאות-כלכלית\n- חינמי`,
      }),
      en: makeBody("en", {
        intro: `Tene Briut's cultural navigator accompanies you to every complex medical appointment — translates from Amharic/Tigrinya, explains medical recommendations in cultural context, and ensures the patient truly understands.`,
        whatsIncluded: `- Accompaniment at doctor visit (HMO or hospital)\n- Real-time Amharic/Tigrinya/Hebrew translation\n- Cultural clarification of treatment recommendations\n- Complex-procedure accompaniment (surgery, diagnostics, hospitalization)\n- Free for eligible`,
        howToApply: `1. Call the Hadera office: 04-6211891 (tenebriut@tene-briut.org.il)\n2. Coordinator schedules with you\n3. Navigator joins you at the appointment`,
        eligibility: `- Ethiopian-Israeli (including 2nd and 3rd generations)\n- No income-eligibility requirement\n- Free`,
      }),
      am: makeBody("am", {
        intro: `የቴኔ ብሪዩት የባህል አማካሪ በሕክምና ቀጠሮዎች ላይ ያጅባል።`,
        whatsIncluded: `- በሐኪም ጉብኝት ላይ አጃቢነት\n- አማርኛ/ትግርኛ/ዕብራይስጥ ትርጉም`,
        howToApply: `ለቅርብ ቅርንጫፍ ይደውሉ።`,
        eligibility: `- የኢትዮጵያ-እስራኤላዊ`,
      }),
    },
  },
  {
    slug: "tene-briut-medical-translation",
    orgSlug: "tene-briut",
    track: "health",
    title: {
      he: "שירות תרגום רפואי — טנא בריאות",
      en: "Medical Translation Service — Tene Briut",
      am: "የቴኔ ብሪዩት የህክምና ትርጉም",
    },
    shortDescription: {
      he: "תרגום-מקצועי אמהרית/תיגרינית/עברית בפגישות רפואיות מורכבות.",
      en: "Professional Amharic/Tigrinya/Hebrew translation at complex medical appointments.",
      am: "በህክምና ቀጠሮዎች ላይ ሙያዊ ትርጉም።",
    },
    duration: { he: "לפי-פגישה", en: "Per appointment", am: "በቀጠሮ" },
    location: {
      he: "כל הארץ (טלפוני או פיזי)",
      en: "Nationwide (phone or in-person)",
      am: "በመላ ሀገሪቱ",
    },
    forWhom: {
      he: "מטופלים יוצאי-אתיופיה",
      en: "Ethiopian-Israeli patients",
      am: "የኢትዮጵያ-እስራኤል ታካሚዎች",
    },
    relatedRights: ["medical-translation"],
    relatedTerms: ["tene-briut"],
    bodies: {
      he: makeBody("he", {
        intro: `שירות-תרגום שמיועד למצבי-טיפול-מורכבים: ניתוחים, אבחנות-קשות, אשפוז ארוך, או טיפולים-לטווח-ארוך. שונה מהמתאמ/ת-בריאות — כאן זה תרגום-טהור (לא תיווך-תרבותי).`,
        whatsIncluded: `- מתורגמ/נ/ית-מקצועי/ת בעלת רישוי\n- זמין/ה טלפונית בזמן-אמת או פיזית בפגישה\n- חינמי דרך קופת-החולים או דרך טנא-בריאות`,
        howToApply: `**אם הקופ"ח שלך מספקת**: בקש בעת תיאום-הפגישה.\n\n**אם לא**: פנה ל-טנא-בריאות לרכז שירות-תרגום משלים.`,
        eligibility: `- חינמי דרך הקופ"ח שלך (כל אזרח)\n- חינמי דרך טנא-בריאות לזכאים`,
      }),
      en: makeBody("en", {
        intro: `Translation service for complex care: surgeries, hard diagnoses, long hospitalization, or long-term treatments. Different from cultural navigators — this is pure translation (no cultural mediation).`,
        whatsIncluded: `- Licensed professional translator\n- Available by phone in real-time or in-person\n- Free via your HMO or via Tene Briut`,
        howToApply: `**If your HMO offers it**: request when scheduling.\n\n**If not**: contact Tene Briut for supplementary translation.`,
        eligibility: `- Free via your HMO (every citizen)\n- Free via Tene Briut for eligible`,
      }),
      am: makeBody("am", {
        intro: `ለውስብስብ ሕክምና የትርጉም አገልግሎት።`,
        whatsIncluded: `- ሙያዊ ተርጓሚ`,
        howToApply: `ቀጠሮ ሲይዙ ይጠይቁ።`,
        eligibility: `- በኤች.ኤም.ኦ ነጻ`,
      }),
    },
  },
  {
    slug: "tene-briut-chronic-disease",
    orgSlug: "tene-briut",
    track: "health",
    title: {
      he: "מניעת מחלות-כרוניות בקהילה — טנא בריאות",
      en: "Community Chronic Disease Prevention — Tene Briut",
      am: "የቴኔ ብሪዩት ሥር-ሰደድ መከላከል",
    },
    shortDescription: {
      he: 'אבחון-מוקדם של סוכרת, יל"ד, וכולסטרול גבוה — בקהילה, ללא קופ"ח.',
      en: "Early detection of diabetes, hypertension, and high cholesterol — in community, no HMO needed.",
      am: "የስኳር በሽታ፣ የደም ግፊት ቀደምት መለየት።",
    },
    duration: { he: "סדנא של חצי-יום", en: "Half-day workshop", am: "የግማሽ ቀን አውደ ጥናት" },
    location: {
      he: "מועדוני-קהילה ובתי-כנסת בכל ערי-הקהילה",
      en: "Community centers and synagogues in community cities",
      am: "የማህበረሰብ ማዕከላት",
    },
    forWhom: {
      he: "מבוגרים יוצאי-אתיופיה (גיל 35+)",
      en: "Adults (35+) of Ethiopian origin",
      am: "ጎልማሶች (35+)",
    },
    relatedRights: ["chronic-disease-prevention"],
    relatedTerms: ["tene-briut", "beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `סדנת-בריאות-קהילתית עם בדיקות-מקום: לחץ-דם, סוכר-בדם, BMI. שיעורי-סוכרת ויל"ד בקהילה גבוהים מהממוצע — אבחון-מוקדם מציל-חיים.`,
        whatsIncluded: `- בדיקת לחץ-דם, סוכר, וכולסטרול במקום\n- ייעוץ-תזונה תרבותי-מתאים (בלי לבטל את ה-injera)\n- הפניה ל-קופ"ח אם נדרש מעקב\n- חוברות-מידע באמהרית/עברית`,
        howToApply: `דרך מועדון-הקהילה / ועד-בית-הכנסת / טיפת-חלב המקומית. טנא בריאות מקיימת ימי בריאות אזוריים לאורך השנה.`,
        eligibility: `- כל מבוגר יוצא-אתיופיה (כולל בני-דור-2 + 3)\n- חינמי לחלוטין`,
      }),
      en: makeBody("en", {
        intro: `Community health workshop with on-site testing: blood pressure, blood sugar, BMI. Diabetes and hypertension rates in the community exceed the national average — early detection saves lives.`,
        whatsIncluded: `- On-site BP, glucose, cholesterol checks\n- Culturally-appropriate nutrition counseling (doesn't exclude injera)\n- HMO referral if follow-up needed\n- Amharic/Hebrew info brochures`,
        howToApply: `Via your community center / synagogue committee / Tipat-Halav. Tene Briut runs regional health days through the year.`,
        eligibility: `- Any adult of Ethiopian origin (incl. 2nd & 3rd gen)\n- Fully free`,
      }),
      am: makeBody("am", {
        intro: `የማህበረሰብ የጤና አውደ ጥናት።`,
        whatsIncluded: `- የደም ግፊት፣ የስኳር ምርመራ`,
        howToApply: `በማህበረሰብ ማዕከላት።`,
        eligibility: `- የኢትዮጵያ-ምንጭ`,
      }),
    },
  },

  // --- Tebeka (2) --------------------------------------------------------
  {
    slug: "tebeka-racism-litigation",
    orgSlug: "tebeka",
    track: "legal",
    title: {
      he: "תביעות גזענות — טבקה",
      en: "Racism Litigation — Tebeka",
      am: "የጠበቃ ዘረኝነት ክሶች",
    },
    shortDescription: {
      he: "סיוע-משפטי-מקצועי במקרי-גזענות אזרחיים ופליליים, ותביעות-פיצויים.",
      en: "Professional legal aid in civil and criminal racism cases, and damages claims.",
      am: "ሙያዊ ሕጋዊ እርዳታ።",
    },
    duration: { he: "לפי-תיק (3-18 חודשים)", en: "Per case (3-18 months)", am: "በጉዳይ" },
    location: {
      he: "ירושלים (מטה) + ייצוג בכל הארץ",
      en: "Jerusalem HQ + nationwide representation",
      am: "ኢየሩሳሌም + በመላ ሀገሪቱ",
    },
    forWhom: {
      he: "כל מי שנפגע מגזענות (פיזית, מילולית, או מוסדית)",
      en: "Anyone harmed by racism (physical, verbal, or institutional)",
      am: "በዘረኝነት የተጎዱ",
    },
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["tebeka", "beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `ייצוג משפטי במקרי גזענות ואפליה נגד הקהילה — תחום הפעילות המרכזי של טבקה.`,
        whatsIncluded: `- ייעוץ ראשוני חינמי\n- ייצוג מלא בבית-משפט\n- תרגום-מסמכים ותמיכה-לשונית\n- ליווי-תקשורת אם המקרה הופך ציבורי`,
        howToApply: `1. יצירת קשר ראשונה: general@tebeka.org.il או 072-2424622\n2. הצגת המקרה במייל / טלפון\n3. ראיון-קבלה תוך 1-2 שבועות`,
        eligibility: `- כל מקרה-גזענות עם ראיות-בסיסיות\n- חינמי לזכאים-כלכליים\n- אגרה-סמלית למקרים נוספים`,
      }),
      en: makeBody("en", {
        intro: `Legal representation in racism and discrimination cases against the community — Tebeka's core activity.`,
        whatsIncluded: `- Free initial consultation\n- Full court representation\n- Document translation and language support\n- Media accompaniment if case goes public`,
        howToApply: `1. First contact: general@tebeka.org.il or 072-2424622\n2. Present the case via email / phone\n3. Intake interview within 1-2 weeks`,
        eligibility: `- Any racism case with basic evidence\n- Free for income-eligible\n- Symbolic fee for others`,
      }),
      am: makeBody("am", {
        intro: `በዘረኝነት ጉዳዮች መሪ አገልግሎት።`,
        whatsIncluded: `- ነጻ የመጀመሪያ ምክክር`,
        howToApply: `general@tebeka.org.il።`,
        eligibility: `- ለብቁ ነጻ`,
      }),
    },
  },
  {
    slug: "tebeka-police-accountability",
    orgSlug: "tebeka",
    track: "legal",
    title: {
      he: "אכיפה משטרתית — טבקה",
      en: "Police Accountability — Tebeka",
      am: "የጠበቃ የፖሊስ ተጠያቂነት",
    },
    shortDescription: {
      he: "סיוע במקרי שימוש-מופרז-בכוח, אפליה, או גזענות מצד שוטרים.",
      en: "Assistance in cases of excessive force, discrimination, or racism by police officers.",
      am: "በፖሊስ ዘረኝነት ጉዳዮች።",
    },
    duration: { he: "תלוי-מקרה", en: "Case-dependent", am: "በጉዳዩ" },
    location: {
      he: "ירושלים + ייצוג בכל הארץ",
      en: "Jerusalem + nationwide",
      am: "ኢየሩሳሌም",
    },
    forWhom: {
      he: "כל מי שנפגע מאכיפה משטרתית פוגענית",
      en: "Anyone harmed by abusive policing",
      am: "በፖሊስ የተጎዱ",
    },
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["tebeka"],
    bodies: {
      he: makeBody("he", {
        intro: `אחת התכניות המוכרות-ביותר של טבקה. ייצוג נגד שוטרים, מח"ש, ובמקרים מורכבים — בית-משפט.`,
        whatsIncluded: `- תיעוד-מיידי של המקרה (כולל הקלטות, תיעוד-רפואי)\n- תלונה ל-מח"ש (המחלקה לחקירות-שוטרים)\n- ייצוג בבירור-משמעתי או בבית-משפט\n- סיוע-תקשורתי אם נדרש`,
        howToApply: `**מיידי**: לאחר אירוע-משטרתי — צלמו, הקליטו, ובאותו יום פנו ל-טבקה. עיכוב מקטין סיכוי-זכייה.`,
        eligibility: `- כל מקרה עם ראיות בסיסיות\n- חינמי לחלוטין במקרי-אכיפה משטרתית`,
      }),
      en: makeBody("en", {
        intro: `One of Tebeka's most-recognized programs. Representation against officers, police-investigation unit, and in complex cases — court.`,
        whatsIncluded: `- Immediate case documentation (recordings, medical records)\n- Complaint to police-investigation unit (Mahash)\n- Representation in disciplinary hearing or court\n- Media support if needed`,
        howToApply: `**Immediately**: after a police incident — photograph, record, and contact Tebeka same day. Delay reduces win likelihood.`,
        eligibility: `- Any case with basic evidence\n- Fully free for police-accountability cases`,
      }),
      am: makeBody("am", {
        intro: `በፖሊስ ላይ ውክልና።`,
        whatsIncluded: `- ፈጣን ሰነድ`,
        howToApply: `**ወዲያውኑ**።`,
        eligibility: `- ሙሉ ለሙሉ ነጻ`,
      }),
    },
  },

  // --- Olim Beyahad (2) --------------------------------------------------
  {
    slug: "olim-beyahad-1on1-mentorship",
    orgSlug: "olim-beyahad",
    track: "career",
    title: {
      he: "מנטורינג 1:1 — עולים ביחד",
      en: "1:1 Mentorship — Olim Beyahad",
      am: "1:1 አማካሪነት — ኦሊም በያሐድ",
    },
    shortDescription: {
      he: "התאמה אישית למנטור בכיר בתעשייה, דרך עמותת עולים ביחד.",
      en: "Personal matching with a senior industry mentor, through Olim Beyahad.",
      am: "ከከፍተኛ የኢንዱስትሪ አማካሪ ጋር።",
    },
    duration: { he: "12-24 חודשים", en: "12-24 months", am: "12-24 ወራት" },
    location: {
      he: "תל אביב (אירועים) + פגישות-וידאו",
      en: "Tel Aviv (events) + video meetings",
      am: "ቴል አቪቭ",
    },
    forWhom: {
      he: "בוגרי תואר ראשון יוצאי-אתיופיה",
      en: "Ethiopian-Israeli BA graduates",
      am: "የBA ምሩቃን",
    },
    relatedRights: ["youth-mentorship"],
    relatedTerms: ["olim-beyahad"],
    bodies: {
      he: makeBody("he", {
        intro: `המנטור הופך ל-ספאר-פרטנר-קריירה לאורך השנים. הוא/היא לא מורה אלא דמות-מנהיגות בתחומך — מהנדס/ת בכיר/ה ב-Microsoft, שותפ/ה ב-EY, רופא/ה ראש-מחלקה, וכו'.`,
        whatsIncluded: `- פגישת-התאמה (intake) לבחירת תחום ופרופיל-מנטור\n- מנטור 1:1 לפחות פגישה בחודש\n- גישה לאירועי-נטוורקינג של הארגון\n- תיעוד-יעדים ומעקב-התקדמות`,
        howToApply: `1. רישום באתר olim-beyahad.org.il\n2. ראיון-התאמה (CV + ראיון 30 דקות)\n3. הצעת 2-3 מנטורים — אתה בוחר/ת\n4. התחלת-תכנית בתוך 4-6 שבועות`,
        eligibility: `- תואר ראשון (גם לפני סיום)\n- אחד-ההורים יוצא-אתיופיה`,
      }),
      en: makeBody("en", {
        intro: `The mentor becomes your career sparring-partner over years. Not a teacher — a leadership figure in your field: senior engineer at Microsoft, EY partner, head physician, etc.`,
        whatsIncluded: `- Intake to select field and mentor profile\n- 1:1 mentor, monthly minimum\n- Access to organizational networking events\n- Goal documentation and progress tracking`,
        howToApply: `1. Register at olim-beyahad.org.il\n2. Matching interview (CV + 30-min interview)\n3. 2-3 mentor proposals — you choose\n4. Program start within 4-6 weeks`,
        eligibility: `- BA (also pre-completion)\n- One parent of Ethiopian origin`,
      }),
      am: makeBody("am", {
        intro: `አማካሪዎ የእርስዎ የሥራ አጋር ይሆናል።`,
        whatsIncluded: `- 1:1 አማካሪ`,
        howToApply: `በolim-beyahad.org.il ይመዝገቡ።`,
        eligibility: `- BA`,
      }),
    },
  },

  // --- ISEF (3) -----------------------------------------------------------
  {
    slug: "isef-ba-scholarship",
    orgSlug: "isef",
    track: "funding",
    title: {
      he: "מלגת תואר ראשון — ISEF",
      en: "BA Scholarship — ISEF",
      am: "የBA ስኮላርሺፕ — ISEF",
    },
    shortDescription: {
      he: "סיוע בשכר לימוד לתואר ראשון, בשותפות עם המוסד האקדמי. אייס"ף אינה מפרסמת סכום אחיד — הסכום נקבע מול המוסד.",
      en: "Undergraduate tuition assistance, in partnership with the academic institution. ISEF publishes no single figure — the amount is set with the institution.",
      am: "ሙሉ የትምህርት ክፍያ ሽፋን + ወርሃዊ ድጎማ።",
    },
    duration: { he: "3 שנים (תואר ראשון מלא)", en: "3 years (full BA)", am: "3 ዓመታት" },
    location: {
      he: "כל אוניברסיטה/מכללה מוכרת בארץ",
      en: "Any recognized university/college",
      am: "በማንኛውም ዩኒቨርሲቲ",
    },
    forWhom: {
      he: "סטודנטים מצטיינים יוצאי-אתיופיה (תואר ראשון)",
      en: "Outstanding Ethiopian-Israeli BA students",
      am: "ምርጥ የBA ተማሪዎች",
    },
    relatedRights: ["unconditional-scholarships-7-sources"],
    relatedTerms: ["hesegim-isef", "beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `המלגה-המקיפה-ביותר של ISEF. סטודנטים-נבחרים מקבלים כיסוי שכר-לימוד מלא + מענק-חודשי שמאפשר התמקדות בלימודים.`,
        whatsIncluded: `- סיוע בשכר לימוד לתואר ראשון (הסכום נקבע מול המוסד; ראו [isef.org.il](https://www.isef.org.il/))\n- מנטור אקדמי\n- מפגשי מנהיגות לאורך השנה\n- מחויבות לשעות מעורבות חברתית`,
        howToApply: `1. רישום במאי-יוני (לשנת לימודים-הבאה)\n2. הגשת תיק (תעודה + פסיכומטרי + 2 המלצות)\n3. ראיון-אישי בירושלים\n4. הודעת-קבלה ביולי-אוגוסט`,
        eligibility: `- ממוצע 85+ בבגרות\n- פסיכומטרי 580+\n- שירות צבאי או לאומי\n- אחד-ההורים-לפחות יוצא-אתיופיה\n- פוטנציאל-מנהיגות (מוערך בראיון)`,
      }),
      en: makeBody("en", {
        intro: `ISEF's most comprehensive scholarship. Selected students receive full tuition + a monthly stipend enabling full focus on studies.`,
        whatsIncluded: `- Undergraduate tuition assistance (amount set with the institution; see [isef.org.il](https://www.isef.org.il/))\n- Academic mentor\n- Leadership meetings through the year\n- A community-service commitment`,
        howToApply: `1. Register in May-June (for next academic year)\n2. Submit file (certificate + psychometric + 2 recommendations)\n3. Personal interview in Jerusalem\n4. Acceptance notice in July-August`,
        eligibility: `- 85+ matriculation average\n- 580+ psychometric\n- Military or national service\n- At least one parent of Ethiopian origin\n- Leadership potential (assessed at interview)`,
      }),
      am: makeBody("am", {
        intro: `የISEF በጣም ሰፊ ስኮላርሺፕ።`,
        whatsIncluded: `- ሙሉ የትምህርት ክፍያ\n- ወርሃዊ ድጎማ`,
        howToApply: `በግንቦት-ሰኔ ይመዝገቡ።`,
        eligibility: `- 85+ ኣማካይ`,
      }),
    },
  },
  {
    slug: "isef-phd-scholarship",
    orgSlug: "isef",
    track: "funding",
    title: { he: "מלגת דוקטורט — ISEF", en: "PhD Scholarship — ISEF", am: "የPhD ስኮላርሺፕ" },
    shortDescription: {
      he: "מימון-מלא ל-PhD + תקציב-מחקר עצמי.",
      en: "Full PhD funding + independent research budget.",
      am: "ሙሉ የPhD ድጋፍ።",
    },
    duration: { he: "4-6 שנים", en: "4-6 years", am: "4-6 ዓመታት" },
    location: {
      he: 'כל אוניברסיטת-מחקר מוכרת (גם בחו"ל)',
      en: "Any research university (including overseas)",
      am: "ዩኒቨርሲቲ",
    },
    forWhom: {
      he: "דוקטורנטים יוצאי-אתיופיה",
      en: "Ethiopian-Israeli PhD candidates",
      am: "PhD",
    },
    relatedRights: [],
    relatedTerms: ["hesegim-isef"],
    bodies: {
      he: makeBody("he", {
        intro: `מלגה-נדירה — ~30 דוקטורנטים בשנה. מקבלי-המלגה הופכים בדרך-כלל לפרופ'-מנחים, חוקרים בארגונים-לאומיים, או מנהלים-בכירים.`,
        whatsIncluded: `- מלגת דוקטורט שנתית (אייס"ף מפרסמת 26,500 ₪ לשנה לשנת תשפ"ה; נבדק בספטמבר 2026 — ראו [isef.org.il](https://www.isef.org.il/))\n- מימון ל-3-4 שנות מחקר\n- ליווי וקהילת דוקטורנטים`,
        howToApply: `1. רישום מוקדם (יוני בשנה לפני)\n2. הצעת-מחקר (10 עמודים)\n3. 2 ראיונות (אקדמי + מנהיגות)\n4. הודעת-קבלה ב-ספטמבר`,
        eligibility: `- בוגר/ת תואר שני (מצטיין/ת)\n- אחד-ההורים יוצא-אתיופיה\n- הצעת-מחקר מקובלת על-ידי 2 פרופ'-ממליצים`,
      }),
      en: makeBody("en", {
        intro: `Rare scholarship — ~30 PhD candidates/year. Recipients typically become advisor professors, researchers in national organizations, or senior managers.`,
        whatsIncluded: `- Annual doctoral scholarship (ISEF publishes ₪26,500/year for 2024/25; checked September 2026 — see [isef.org.il](https://www.isef.org.il/))\n- Funding for 3-4 research years\n- Mentoring and a doctoral cohort`,
        howToApply: `1. Early registration (June, year prior)\n2. Research proposal (10 pages)\n3. 2 interviews (academic + leadership)\n4. Acceptance notice in September`,
        eligibility: `- Outstanding MA graduate\n- One parent of Ethiopian origin\n- Research proposal approved by 2 recommending professors`,
      }),
      am: makeBody("am", {
        intro: `ለPhD ስኮላርሺፕ።`,
        whatsIncluded: `- ሙሉ ክፍያ`,
        howToApply: `ቀደም ብሎ ምዝገባ።`,
        eligibility: `- ምርጥ MA ምሩቅ`,
      }),
    },
  },

  // --- IAEJ (2) ----------------------------------------------------------
  {
    slug: "iaej-falash-mura-advocacy",
    orgSlug: "iaej",
    track: "community",
    title: {
      he: "סנגור פלשמורה — האגודה הישראלית למען יהודי אתיופיה",
      en: "Falash Mura Advocacy — IAEJ",
      am: "የፋላሽ ሙራ ጥብቅና",
    },
    shortDescription: {
      he: "מאבק לאיחוד-משפחות פלשמורה: לובי, תזכירי-עמדה, ייצוג מול ממשלה.",
      en: "Falash Mura family-reunification advocacy: lobbying, position papers, government representation.",
      am: "የፋላሽ ሙራ ጥብቅና።",
    },
    duration: {
      he: "מתמשך — מאבק רב-שנתי",
      en: "Ongoing — multi-year campaign",
      am: "ቀጣይ",
    },
    location: {
      he: "ירושלים (לובי) + תל-אביב (מטה)",
      en: "Jerusalem (lobbying) + Tel Aviv (HQ)",
      am: "ኢየሩሳሌም + ቴል አቪቭ",
    },
    forWhom: {
      he: "משפחות עם קרובים פלשמורה באתיופיה",
      en: "Families with Falash Mura relatives in Ethiopia",
      am: "ቤተሰቦች",
    },
    relatedRights: ["falash-mura-direct-absorption"],
    relatedTerms: ["falash-mura"],
    bodies: {
      he: makeBody("he", {
        intro: `IAEJ פועלת בזירה הציבורית למען איחוד משפחות פלשמורה. מספרי החלטות הממשלה שיוחסו כאן לארגון הוסרו — לא אותרו במקור רשמי.`,
        whatsIncluded: `- ייצוג-משפחתי מול ממשלה ו-Knesset\n- תמיכה-משפטית בצירוף עם Tebeka\n- מעקב-מבצעים והעברה-לישראל\n- סדנאות-הסברה לקהילה`,
        howToApply: `אתר הארגון נמצא בשיפוץ ואינו מציג תוכניות או טופסי רישום. לבקשות איחוד משפחות פנו למשרד הפנים ולמשרד העלייה והקליטה, ולא דרך עמוד זה.`,
        eligibility: `- משפחה עם קרובים פלשמורה (חיים באתיופיה)\n- עליית-יהודים-מוכר`,
      }),
      en: makeBody("en", {
        intro: `IAEJ campaigns publicly for Falash Mura family reunification. Government-decision numbers previously attributed to it here were removed — no official source was found for them.`,
        whatsIncluded: `- Family representation before government and Knesset\n- Legal support together with Tebeka\n- Operation tracking and transfer to Israel\n- Community education workshops`,
        howToApply: `The organisation's site is under reconstruction and lists no programmes or registration forms. For family-reunification requests contact the Ministry of Interior and the Ministry of Aliyah and Integration, not this page.`,
        eligibility: `- Family with Falash Mura relatives (in Ethiopia)\n- Recognized aliyah path`,
      }),
      am: makeBody("am", {
        intro: `የፋላሽ ሙራ ቤተሰብ ዳግም ግንኙነት።`,
        whatsIncluded: `- መንግስት ውክልና`,
        howToApply: `ለቤተሰብ ዳግም ውህደት ጥያቄ ወደ የውስጥ ጉዳይ ሚኒስቴር ይመልከቱ።`,
        eligibility: `- በኢትዮጵያ ፋላሽ ሙራ ዘመዶች`,
      }),
    },
  },
];

// --- Helpers ----------------------------------------------------------------

export function pickLocale<T extends { he: string; en?: string; am?: string }>(
  t: T,
  locale: Locale,
): string {
  return t[locale] ?? t.he;
}

export function getProgramBodyForLocale(entry: ProgramEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
