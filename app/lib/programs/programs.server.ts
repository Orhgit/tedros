// Org programs seed (RIN-424 / part of RIN-417 SEO Wave 3b).
//
// 30 specific programs operated by the 12 community organizations seeded in
// `lib/orgs/orgs.server.ts`. Captures high-intent queries like "ENP SPACE",
// "Tene Briut cultural navigators", "Olim Beyahad mentorship".
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
      he: "תכנית-תגבור-רב-שנתית בבתי-ספר תיכון. ~4,500 חניכים בארץ.",
      en: "Multi-year academic-support program in high schools. ~4,500 participants nationally.",
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
    relatedRights: ["bagrut-grant"],
    relatedTerms: ["enp", "beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `SPACE היא התכנית-המרכזית של ENP בחינוך התיכוני. החניכים מקבלים תגבור-לימודי שבועי, מנטור-אקדמי, וליווי בתהליך הבגרות. שיעורי-זכייה בבגרות בקרב חניכי SPACE עומדים על 95%+ — מעל לממוצע הארצי בקהילה.`,
        whatsIncluded: `- שיעורי-עזר שבועיים במתמטיקה, אנגלית, מדעים\n- מנטור אקדמי 1:1\n- הכנה לבגרות\n- קבוצות לימוד-קהילתי\n- חוגי-העשרה (תיאטרון, ספורט, חוגי-טכנולוגיה)`,
        howToApply: `**הצטרפות דרך בית-הספר:** רוב בתי-הספר עם 30%+ תלמידים יוצאי אתיופיה הם שותפים.\n\n1. שאלו את היועצ/ת בבית-הספר אם SPACE פעילה\n2. אם כן — רישום ב-ENP דרך מתאמ/ת SPACE בבית-הספר\n3. מבחן-קבלה קצר (לא תחרותי — לזיהוי תחומי-תגבור)`,
        eligibility: `- תלמיד/ת תיכון יוצא אתיופיה (ההורה אחד נולד באתיופיה)\n- בית-ספר שותף ל-SPACE\n- ממוצע 70+ (פתוחה גם לתלמידים-מתקשים שעוברים מבחן-מוטיבציה)`,
      }),
      en: makeBody("en", {
        intro: `SPACE is ENP's flagship high-school program. Participants receive weekly academic tutoring, an academic mentor, and matriculation accompaniment. SPACE participants pass matriculation at 95%+ — above the community average.`,
        whatsIncluded: `- Weekly tutoring in math, English, sciences\n- 1:1 academic mentor\n- Matriculation prep\n- Community study groups\n- Enrichment activities (theater, sports, tech clubs)`,
        howToApply: `**Join via your school:** most schools with 30%+ Ethiopian-Israeli students are SPACE partners.\n\n1. Ask the school counselor if SPACE is active\n2. If yes — register with ENP via the school's SPACE coordinator\n3. Brief intake assessment (not competitive — identifies tutoring needs)`,
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
  {
    slug: "enp-shalav",
    orgSlug: "enp",
    track: "education",
    title: {
      he: "ENP SHALAV — תכנית בית-ספרית לכיתות א'-ו'",
      en: "ENP SHALAV — School Program Grades 1-6",
      am: "ENP SHALAV — የትምህርት ቤት ፕሮግራም ለ1-6ኛ ክፍል",
    },
    shortDescription: {
      he: "התערבות מוקדמת בבתי-ספר יסודיים — קריאה, מתמטיקה, מיומנויות-יסוד.",
      en: "Early intervention in primary schools — reading, math, foundational skills.",
      am: "በመጀመሪያ ደረጃ ትምህርት ቤቶች ቀደምት ጣልቃ ገብነት።",
    },
    duration: { he: "6 שנים (א'-ו')", en: "6 years (grades 1-6)", am: "6 ዓመታት" },
    location: {
      he: "בתי-ספר יסודיים שותפים",
      en: "Partner primary schools",
      am: "ሽርክና የመጀመሪያ ደረጃ ትምህርት ቤቶች",
    },
    forWhom: {
      he: "תלמידי-יסודי יוצאי אתיופיה",
      en: "Ethiopian-Israeli primary-school students",
      am: "የመጀመሪያ ደረጃ ተማሪዎች",
    },
    relatedRights: [],
    relatedTerms: ["enp"],
    bodies: {
      he: makeBody("he", {
        intro: `SHALAV (Stages) מתערבת בכיתות א'-ו' לסגירת פערים-מוקדמים. הצוות-החינוכי-המוטמע בבית-הספר עובד עם המורים הקיימים — לא תחליף, אלא תוספת.`,
        whatsIncluded: `- מורים-מתאמים בכיתות (10-15 חניכים בקבוצה)\n- חומרי-לימוד מותאמים-תרבותית\n- סדנאות-הורים\n- מעקב-התפתחות שנתי`,
        howToApply: `דרך בית-הספר. אם בית-הספר שלך לא שותף — הציעו לוועדת-ההורים להזמין את ENP לבדיקת-שותפות.`,
        eligibility: `- כיתות א'-ו'\n- בית-ספר עם 25%+ תלמידים יוצאי אתיופיה (קריטריון-שותפות)`,
      }),
      en: makeBody("en", {
        intro: `SHALAV (Stages) intervenes in grades 1-6 to close early gaps. The embedded education team works with existing teachers — supplementary, not replacement.`,
        whatsIncluded: `- Teacher-coordinators in classrooms (10-15 students per group)\n- Culturally-adapted learning materials\n- Parent workshops\n- Annual progress tracking`,
        howToApply: `Via your school. If not a partner — propose to the parent committee to invite ENP for a partnership assessment.`,
        eligibility: `- Grades 1-6\n- School with 25%+ Ethiopian-Israeli students (partnership criterion)`,
      }),
      am: makeBody("am", {
        intro: `SHALAV በ1-6ኛ ክፍል ቀደምት ክፍተቶችን ይዘጋል።`,
        whatsIncluded: `- በክፍል ውስጥ መምህራን-አስተባባሪዎች\n- የባህል-ተስማሚ ቁሳቁሶች`,
        howToApply: `በትምህርት ቤትዎ።`,
        eligibility: `- 1-6ኛ ክፍል`,
      }),
    },
  },
  {
    slug: "enp-bagrut-grant",
    orgSlug: "enp",
    track: "funding",
    title: {
      he: "מענק בגרות ENP — תיכוניסטים מצטיינים",
      en: "ENP Bagrut Grant — Outstanding HS Students",
      am: "ENP የባግሩት ስጦታ",
    },
    shortDescription: {
      he: "מענק חודשי לתיכוניסטים יוצאי-אתיופיה עם ממוצע 80+. ~1,000 חניכים בשנה.",
      en: "Monthly stipend for Ethiopian-Israeli high-schoolers with 80+ average. ~1,000 participants/year.",
      am: "ለ80+ ኣማካይ ላላቸው ሁለተኛ ደረጃ ተማሪዎች ወርሃዊ ድጎማ።",
    },
    duration: {
      he: '3 שנים (י\', י"א, י"ב)',
      en: "3 years (grades 10-12)",
      am: "3 ዓመታት",
    },
    location: { he: "בכל הארץ", en: "Nationwide", am: "በመላ ሀገሪቱ" },
    forWhom: {
      he: "תלמידי תיכון מצטיינים יוצאי-אתיופיה",
      en: "Outstanding Ethiopian-Israeli HS students",
      am: "ብቁ የኢትዮጵያ-እስራኤል ሁለተኛ ደረጃ ተማሪዎች",
    },
    relatedRights: ["bagrut-grant"],
    relatedTerms: ["enp"],
    bodies: {
      he: makeBody("he", {
        intro: `מענק חודשי שמטרתו לאפשר לתלמידי-מצטיינים יוצאי-אתיופיה לא לעבוד-במקביל ללימודים בתיכון. סכום-שנתי כולל: ~₪10,000-15,000.`,
        whatsIncluded: `- מענק חודשי (₪400-600)\n- ספרי-לימוד\n- הכנה לפסיכומטרי\n- מנטור-קריירה לבחירת תחום-לימוד`,
        howToApply: `1. רישום בתחילת כיתה י' (או באמצע אם הציון השתפר)\n2. הצגת תעודה-של-כיתה ט' עם ממוצע 80+\n3. ראיון-קצר עם מתאמ/ת ENP במחוז\n4. הסכמת-הורים`,
        eligibility: `- ממוצע 80+ בתעודה-של-ט'\n- שני-הורים או הורה-אחד יוצאי-אתיופיה\n- תלמיד/ה בתיכון מוכר/מקיף`,
      }),
      en: makeBody("en", {
        intro: `Monthly stipend enabling outstanding Ethiopian-Israeli HS students to focus on studies rather than working. Annual total: ~₪10,000-15,000.`,
        whatsIncluded: `- Monthly stipend (₪400-600)\n- Textbooks\n- Psychometric prep\n- Career mentor for choosing a track`,
        howToApply: `1. Register at the start of grade 10 (or mid-year if grades improved)\n2. Submit grade 9 certificate with 80+ average\n3. Brief interview with ENP regional coordinator\n4. Parent consent`,
        eligibility: `- 80+ average in grade 9\n- One or both parents from Ethiopia\n- Student in a recognized HS`,
      }),
      am: makeBody("am", {
        intro: `ለብቁ ሁለተኛ ደረጃ ተማሪዎች ወርሃዊ ድጎማ።`,
        whatsIncluded: `- ወርሃዊ ድጎማ\n- መጻሕፍት`,
        howToApply: `በ10ኛ ክፍል መጀመሪያ ምዝገባ።`,
        eligibility: `- በ9ኛ ክፍል 80+ ኣማካይ`,
      }),
    },
  },
  {
    slug: "enp-tech-career",
    orgSlug: "enp",
    track: "career",
    title: {
      he: "ENP Tech-Career Bootcamp",
      en: "ENP Tech-Career Bootcamp",
      am: "ENP የቴክ-ሥራ ቦትካምፕ",
    },
    shortDescription: {
      he: "Bootcamp של 6 חודשים ל-בוגרי-תואר-ראשון — מעבר להייטק. ~120 בוגרים בשנה.",
      en: "6-month bootcamp for first-degree graduates — pivot to tech. ~120 graduates/year.",
      am: "ለመጀመሪያ ዲግሪ ምሩቃን 6 ወር ቦትካምፕ።",
    },
    duration: {
      he: "6 חודשים אינטנסיביים + 3 חודשי-שיבוץ",
      en: "6 intensive months + 3-month placement",
      am: "6 ጥልቅ ወራት + 3 ወር ምደባ",
    },
    location: { he: "תל אביב + רחובות", en: "Tel Aviv + Rehovot", am: "ቴል አቪቭ + ሬሆቮት" },
    forWhom: {
      he: "בוגרי תואר ראשון יוצאי-אתיופיה (לא חובה תחום-טכני)",
      en: "Ethiopian-Israeli BA graduates (any field)",
      am: "የBA ምሩቃን",
    },
    relatedRights: ["tech-career-bootcamp"],
    relatedTerms: ["enp", "olim-beyahad"],
    bodies: {
      he: makeBody("he", {
        intro: `Bootcamp אינטנסיבי שמלמד JavaScript/Python, Cloud, ועקרונות-עיצוב-תוכנה. שיעור-שיבוץ של ~85% תוך 3 חודשים מסיום.`,
        whatsIncluded: `- 6 חודשים, 40 שעות בשבוע\n- מימון-מלא לזכאים (כולל מענק-קיום)\n- שיבוץ-עבודה אצל חברות-שותפות (Microsoft, Google, IBM, חברות-סטארטאפ)\n- מנטור-מקצועי לאחר ה-bootcamp`,
        howToApply: `1. רישום ב-tech-career.org.il (פתוח 2-3 פעמים בשנה)\n2. מבחן-לוגי קצר\n3. ראיון-מוטיבציה\n4. אבחון-קודמים (אם יש רקע-חלקי בקוד)`,
        eligibility: `- תואר ראשון בכל תחום\n- אחד-ההורים או שניהם נולדו באתיופיה\n- הסכמה ל-6 חודשים אינטנסיביים (לא ניתן לעבוד-במקביל)`,
      }),
      en: makeBody("en", {
        intro: `Intensive bootcamp teaching JavaScript/Python, cloud, and software-design principles. Placement rate ~85% within 3 months of completion.`,
        whatsIncluded: `- 6 months, 40 hours/week\n- Full subsidy for eligible (including living stipend)\n- Job placement with partner companies (Microsoft, Google, IBM, startups)\n- Professional mentor post-bootcamp`,
        howToApply: `1. Register at tech-career.org.il (opens 2-3 times/year)\n2. Brief logic test\n3. Motivation interview\n4. Prior-experience assessment (if any code background)`,
        eligibility: `- BA in any field\n- One or both parents born in Ethiopia\n- Commitment to 6 months full-time (no parallel work)`,
      }),
      am: makeBody("am", {
        intro: `ጥልቅ ቦትካምፕ።`,
        whatsIncluded: `- 6 ወራት፣ በሳምንት 40 ሰዓታት`,
        howToApply: `በtech-career.org.il ይመዝገቡ።`,
        eligibility: `- BA በማንኛውም መስክ`,
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
    relatedRights: ["medical-translation-services", "chronic-disease-prevention"],
    relatedTerms: ["tene-briut"],
    bodies: {
      he: makeBody("he", {
        intro: `המתאמ/ת-תרבותי/ת-של-טנא-בריאות מלווה אותך בכל פגישה רפואית מורכבת — מתרגם/ת מאמהרית/תיגרינית, מסביר/ה את ההמלצות-הרפואיות בהקשר-תרבותי, ומוודא/ת שהמטופל/ת באמת מבין/ה.`,
        whatsIncluded: `- ליווי בפגישת-רופא (בקופ"ח או בבית-חולים)\n- תרגום-בזמן-אמת אמהרית/תיגרינית/עברית\n- הבהרה תרבותית של המלצות-טיפול\n- ליווי בהליכים מורכבים (ניתוחים, אבחונים, אשפוז)\n- חינמי לזכאים`,
        howToApply: `1. שיחת-טלפון לסניף הקרוב (info@tene-briut.org.il)\n2. מתאמ/ת מתאם זמן-פגישה איתך\n3. בפגישה — המתאמ/ת מצטרפ/ת אליך`,
        eligibility: `- אדם יוצא-אתיופיה (כולל דור-2 ו-3)\n- ללא-דרישת-זכאות-כלכלית\n- חינמי`,
      }),
      en: makeBody("en", {
        intro: `Tene Briut's cultural navigator accompanies you to every complex medical appointment — translates from Amharic/Tigrinya, explains medical recommendations in cultural context, and ensures the patient truly understands.`,
        whatsIncluded: `- Accompaniment at doctor visit (HMO or hospital)\n- Real-time Amharic/Tigrinya/Hebrew translation\n- Cultural clarification of treatment recommendations\n- Complex-procedure accompaniment (surgery, diagnostics, hospitalization)\n- Free for eligible`,
        howToApply: `1. Call your nearest branch (info@tene-briut.org.il)\n2. Coordinator schedules with you\n3. Navigator joins you at the appointment`,
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
    relatedRights: ["medical-translation-services"],
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
        howToApply: `דרך מועדון-הקהילה / ועד-בית-הכנסת / טיפת-חלב המקומית. טנא-בריאות מקיימת ~50 סדנאות בשנה.`,
        eligibility: `- כל מבוגר יוצא-אתיופיה (כולל בני-דור-2 + 3)\n- חינמי לחלוטין`,
      }),
      en: makeBody("en", {
        intro: `Community health workshop with on-site testing: blood pressure, blood sugar, BMI. Diabetes and hypertension rates in the community exceed the national average — early detection saves lives.`,
        whatsIncluded: `- On-site BP, glucose, cholesterol checks\n- Culturally-appropriate nutrition counseling (doesn't exclude injera)\n- HMO referral if follow-up needed\n- Amharic/Hebrew info brochures`,
        howToApply: `Via your community center / synagogue committee / Tipat-Halav. Tene Briut runs ~50 workshops/year.`,
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
        intro: `שירות מובילה בארץ למקרי-גזענות נגד הקהילה. ~600 תיקים בשנה. שיעור-זכייה גבוה במקרי-תביעה אזרחיים.`,
        whatsIncluded: `- ייעוץ ראשוני חינמי\n- ייצוג מלא בבית-משפט\n- תרגום-מסמכים ותמיכה-לשונית\n- ליווי-תקשורת אם המקרה הופך ציבורי`,
        howToApply: `1. יצירת קשר ראשונה: info@tebeka.org.il או 02-XXX-XXXX\n2. הצגת המקרה במייל / טלפון\n3. ראיון-קבלה תוך 1-2 שבועות`,
        eligibility: `- כל מקרה-גזענות עם ראיות-בסיסיות\n- חינמי לזכאים-כלכליים\n- אגרה-סמלית למקרים נוספים`,
      }),
      en: makeBody("en", {
        intro: `National-leading service for community racism cases. ~600 cases/year. High win rate on civil claims.`,
        whatsIncluded: `- Free initial consultation\n- Full court representation\n- Document translation and language support\n- Media accompaniment if case goes public`,
        howToApply: `1. First contact: info@tebeka.org.il or 02-XXX-XXXX\n2. Present the case via email / phone\n3. Intake interview within 1-2 weeks`,
        eligibility: `- Any racism case with basic evidence\n- Free for income-eligible\n- Symbolic fee for others`,
      }),
      am: makeBody("am", {
        intro: `በዘረኝነት ጉዳዮች መሪ አገልግሎት።`,
        whatsIncluded: `- ነጻ የመጀመሪያ ምክክር`,
        howToApply: `info@tebeka.org.il።`,
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
      he: "התאמה אישית למנטור-בכיר בתעשייה. 200+ מנטורים מ-150+ חברות.",
      en: "Personal matching with a senior industry mentor. 200+ mentors from 150+ companies.",
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
    relatedRights: ["mentorship-program-graduates"],
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
  {
    slug: "olim-beyahad-hi-tech-track",
    orgSlug: "olim-beyahad",
    track: "career",
    title: {
      he: "מסלול הייטק — עולים ביחד",
      en: "Hi-Tech Track — Olim Beyahad",
      am: "የቴክ መንገድ — ኦሊም በያሐድ",
    },
    shortDescription: {
      he: "שיבוץ-ישיר בחברות-הייטק שותפות עם תקופת-חניכה מובנית.",
      en: "Direct placement in partner tech companies with structured apprenticeship.",
      am: "በሽርክና የቴክ ኩባንያዎች ቀጥተኛ ምደባ።",
    },
    duration: {
      he: "3-6 חודשי-חניכה ואז תפקיד-מלא",
      en: "3-6 month apprenticeship, then full role",
      am: "3-6 ወር ስልጠና",
    },
    location: {
      he: "תל אביב, הרצליה, רעננה (חברות שותפות)",
      en: "Tel Aviv, Herzliya, Raanana (partner companies)",
      am: "ቴል አቪቭ",
    },
    forWhom: {
      he: "בוגרי תואר ראשון בתחומים-טכניים או אחרי Tech-Career",
      en: "BA graduates in tech fields or post-Tech-Career",
      am: "የBA ምሩቃን",
    },
    relatedRights: ["mentorship-program-graduates", "tech-career-bootcamp"],
    relatedTerms: ["olim-beyahad"],
    bodies: {
      he: makeBody("he", {
        intro: `מסלול ייעודי לבוגרים שכבר עם רקע-טכני (תואר במדעי-המחשב, הנדסה, או ENP Tech-Career bootcamp). שיבוץ-ישיר עם תקופת-חניכה.`,
        whatsIncluded: `- שיבוץ עם 1 מ-150 חברות-שותפות\n- חניכ/ה-טכני/ת בתוך-החברה\n- מנטור-תרבותי לעבודה בסביבה-מקצועית\n- תכנית-העלאת-שכר מובנית בשנה הראשונה`,
        howToApply: `1. רישום ב-olim-beyahad.org.il\n2. ראיון-טכני (קוד + מערכות)\n3. ראיון-התאמה לחברה ספציפית\n4. תחילת-עבודה תוך 4-8 שבועות`,
        eligibility: `- תואר ראשון בתחום-טכני **או** סיום Tech-Career bootcamp\n- אחד-ההורים יוצא-אתיופיה`,
      }),
      en: makeBody("en", {
        intro: `Track for graduates with a tech background (CS/engineering degree, or ENP Tech-Career bootcamp). Direct placement with apprenticeship.`,
        whatsIncluded: `- Placement with 1 of 150 partner companies\n- In-house technical apprenticeship\n- Cultural mentor for professional environment\n- Structured first-year salary progression`,
        howToApply: `1. Register at olim-beyahad.org.il\n2. Technical interview (code + systems)\n3. Company-specific matching interview\n4. Start within 4-8 weeks`,
        eligibility: `- BA in tech field **or** Tech-Career bootcamp completion\n- One parent of Ethiopian origin`,
      }),
      am: makeBody("am", {
        intro: `ቀጥተኛ ምደባ።`,
        whatsIncluded: `- ምደባ\n- የቴክ ስልጠና`,
        howToApply: `ይመዝገቡ።`,
        eligibility: `- የቴክ BA`,
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
      he: "כיסוי-שכר-לימוד מלא + מענק חודשי 3,000-3,500 ₪. ~400 סטודנטים בשנה.",
      en: "Full tuition coverage + ₪3,000-3,500 monthly stipend. ~400 students/year.",
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
    relatedRights: ["scholarship-aggregator"],
    relatedTerms: ["hesegim-isef", "beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `המלגה-המקיפה-ביותר של ISEF. סטודנטים-נבחרים מקבלים כיסוי שכר-לימוד מלא + מענק-חודשי שמאפשר התמקדות בלימודים.`,
        whatsIncluded: `- שכר-לימוד מלא לתואר-ראשון\n- מענק חודשי 3,000-3,500 ₪\n- מנטור אקדמי\n- סדנאות-מנהיגות-קהילתית 2 פעמים בשנה\n- גישה ל-alumni network של 4,000+ בוגרים`,
        howToApply: `1. רישום במאי-יוני (לשנת לימודים-הבאה)\n2. הגשת תיק (תעודה + פסיכומטרי + 2 המלצות)\n3. ראיון-אישי בירושלים\n4. הודעת-קבלה ביולי-אוגוסט`,
        eligibility: `- ממוצע 85+ בבגרות\n- פסיכומטרי 580+\n- שירות צבאי או לאומי\n- אחד-ההורים-לפחות יוצא-אתיופיה\n- פוטנציאל-מנהיגות (מוערך בראיון)`,
      }),
      en: makeBody("en", {
        intro: `ISEF's most comprehensive scholarship. Selected students receive full tuition + a monthly stipend enabling full focus on studies.`,
        whatsIncluded: `- Full BA tuition\n- ₪3,000-3,500 monthly stipend\n- Academic mentor\n- Community-leadership workshops 2x/year\n- Access to alumni network of 4,000+`,
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
    slug: "isef-ma-scholarship",
    orgSlug: "isef",
    track: "funding",
    title: { he: "מלגת תואר שני — ISEF", en: "MA Scholarship — ISEF", am: "የMA ስኮላርሺፕ" },
    shortDescription: {
      he: "המשך-מימון-לבוגרי-מלגת-תואר-ראשון. תואר שני בתחום-בחירה.",
      en: "Continued funding for BA scholarship recipients. MA in chosen field.",
      am: "የቀደመ ስኮላርሺፕ ቀጣይ።",
    },
    duration: { he: "2 שנים", en: "2 years", am: "2 ዓመታት" },
    location: {
      he: "כל אוניברסיטה מוכרת",
      en: "Any recognized university",
      am: "ዩኒቨርሲቲ",
    },
    forWhom: {
      he: "בוגרי תואר ראשון בתכנית ISEF",
      en: "ISEF BA alumni",
      am: "የISEF ምሩቃን",
    },
    relatedRights: ["scholarship-aggregator"],
    relatedTerms: ["hesegim-isef"],
    bodies: {
      he: makeBody("he", {
        intro: `המשך-תכנית לבוגרי-תואר-ראשון. ~150 סטודנטים בשנה.`,
        whatsIncluded: `- שכר-לימוד מלא\n- מענק חודשי\n- שותפות-מחקר עם פרופ'-מנחה\n- תקציב-נסיעות לכנסים`,
        howToApply: `המשך-אוטומטי לבוגרי-תואר-ראשון של ISEF — חידוש שנתי בתחילת שנת-הלימודים.`,
        eligibility: `- בוגר/ת תואר ראשון של ISEF\n- ממוצע אקדמי 85+\n- קבלה לתואר שני`,
      }),
      en: makeBody("en", {
        intro: `Continuation program for BA alumni. ~150 students/year.`,
        whatsIncluded: `- Full tuition\n- Monthly stipend\n- Research partnership with adviser\n- Conference travel budget`,
        howToApply: `Automatic continuation for ISEF BA alumni — annual renewal at the start of the academic year.`,
        eligibility: `- ISEF BA alum\n- 85+ academic average\n- MA admission`,
      }),
      am: makeBody("am", {
        intro: `ለBA ምሩቃን ቀጣይ።`,
        whatsIncluded: `- ሙሉ ክፍያ`,
        howToApply: `ራስ-ሰራሽ ቀጣይ።`,
        eligibility: `- የISEF BA ምሩቅ`,
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
        whatsIncluded: `- שכר-לימוד מלא\n- מענק חודשי משמעותי (₪5,000+)\n- תקציב-מחקר עצמי\n- חברות-מועדון של דוקטורנטים-מצטיינים\n- גישה ל-alumni בארץ ובארה"ב`,
        howToApply: `1. רישום מוקדם (יוני בשנה לפני)\n2. הצעת-מחקר (10 עמודים)\n3. 2 ראיונות (אקדמי + מנהיגות)\n4. הודעת-קבלה ב-ספטמבר`,
        eligibility: `- בוגר/ת תואר שני (מצטיין/ת)\n- אחד-ההורים יוצא-אתיופיה\n- הצעת-מחקר מקובלת על-ידי 2 פרופ'-ממליצים`,
      }),
      en: makeBody("en", {
        intro: `Rare scholarship — ~30 PhD candidates/year. Recipients typically become advisor professors, researchers in national organizations, or senior managers.`,
        whatsIncluded: `- Full tuition\n- Substantial monthly stipend (₪5,000+)\n- Independent research budget\n- Outstanding-PhDs club membership\n- Access to alumni in Israel and the US`,
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

  // --- Fidel (2) ---------------------------------------------------------
  {
    slug: "fidel-partner-parents",
    orgSlug: "fidel",
    track: "education",
    title: {
      he: "תכנית הורים שותפים — פידל",
      en: "Partner Parents Program — Fidel",
      am: "የሽርክና ወላጆች ፕሮግራም",
    },
    shortDescription: {
      he: "הכשרת הורים יוצאי-אתיופיה לסנגר על ילדם בבית-הספר ולהשתתף בועדות-הורים.",
      en: "Training Ethiopian-Israeli parents to advocate for their child in school and engage with parent committees.",
      am: "ወላጆችን ለልጃቸው እንዲቆሙ ማሰልጠን።",
    },
    duration: {
      he: "10 מפגשים (4-5 חודשים)",
      en: "10 meetings (4-5 months)",
      am: "10 ስብሰባዎች",
    },
    location: {
      he: "פידל-מקומי בכל ערי-הקהילה",
      en: "Local Fidel branches in all community cities",
      am: "በሁሉም ከተሞች",
    },
    forWhom: {
      he: "הורים יוצאי-אתיופיה לילדים בכיתה א'-י\"ב",
      en: "Ethiopian-Israeli parents of grades 1-12 children",
      am: "የ1-12 ክፍል ልጆች ወላጆች",
    },
    relatedRights: ["bagrut-grant"],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `סדנא-קצרה אך משמעותית. הורים-בוגרי-תכנית מדווחים על שיפור-משמעותי בקשר עם בית-הספר, ובציוני-הילדים.`,
        whatsIncluded: `- 10 מפגשים שבועיים (2 שעות כל אחד)\n- חוברת-הסבר על מערכת-החינוך הישראלית\n- ליווי-מתואם בפגישות עם הצוות-החינוכי\n- חברות בקבוצת-WhatsApp של בוגרים פעילים\n- שיתוף-פעולה עם ועדות-הורים מקומיות`,
        howToApply: `דרך פידל-מקומי בעירך. רוב הסניפים מקיימים 2-3 מחזורי-תכנית בשנה.`,
        eligibility: `- הורה יוצא-אתיופיה (לפחות-אחד)\n- ילד/ה בגיל-לימודים\n- חינמי לחלוטין`,
      }),
      en: makeBody("en", {
        intro: `Short but meaningful workshop. Program alumni report significant improvement in school relationship and child grades.`,
        whatsIncluded: `- 10 weekly meetings (2 hours each)\n- Israeli education-system guide\n- Coordinated accompaniment to staff meetings\n- Active-alumni WhatsApp group\n- Cooperation with local parent committees`,
        howToApply: `Via local Fidel in your city. Most branches run 2-3 cycles/year.`,
        eligibility: `- At least one parent of Ethiopian origin\n- School-age child\n- Fully free`,
      }),
      am: makeBody("am", {
        intro: `አጭር አውደ ጥናት።`,
        whatsIncluded: `- 10 ስብሰባዎች`,
        howToApply: `በአካባቢ ፊደል።`,
        eligibility: `- የኢትዮጵያ ምንጭ ወላጅ`,
      }),
    },
  },
  {
    slug: "fidel-school-councils",
    orgSlug: "fidel",
    track: "education",
    title: {
      he: "מועצות בתי-ספר — פידל",
      en: "School Councils — Fidel",
      am: "የትምህርት ቤት ምክር ቤቶች",
    },
    shortDescription: {
      he: "ייצוג הורים יוצאי-אתיופיה בועדות-בית-ספר ובמועצת-עיר.",
      en: "Representing Ethiopian-Israeli parents on school committees and city councils.",
      am: "በትምህርት ቤት ኮሚቴዎች ውክልና።",
    },
    duration: {
      he: "מתמשך — שנת-לימודים",
      en: "Ongoing — academic year",
      am: "ቀጣይ — የትምህርት ዓመት",
    },
    location: {
      he: "כל בית-ספר עם 25%+ תלמידים יוצאי-אתיופיה",
      en: "Any school with 25%+ Ethiopian-Israeli students",
      am: "ሁሉም ትምህርት ቤቶች",
    },
    forWhom: {
      he: "הורים פעילים שעברו תכנית 'הורים שותפים'",
      en: "Active parents who completed Partner Parents",
      am: "ንቁ ወላጆች",
    },
    relatedRights: [],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `נציגות-הורים-יוצאי-אתיופיה במועצות-בית-ספר. השפעה ישירה על תקציב-בית-ספר, מדיניות-משמעת, וקבלות-החלטות.`,
        whatsIncluded: `- מקום קבוע במועצת-בית-הספר\n- הצבעה במועצת-העיר על נושאי-חינוך\n- הכשרה בנושאי-מדיניות-חינוכית`,
        howToApply: `מסלול-המשך לבוגרי 'הורים שותפים' (RIN-424 program). פידל-מקומי מציע מועמדות.`,
        eligibility: `- בוגר/ת 'הורים שותפים'\n- מחויבות לקדנציה-של-שנת-לימודים`,
      }),
      en: makeBody("en", {
        intro: `Ethiopian-Israeli parent representation on school councils. Direct influence on school budget, discipline policy, and decision-making.`,
        whatsIncluded: `- Permanent seat on school council\n- Vote on city council education matters\n- Education-policy training`,
        howToApply: `Continuation track for Partner Parents alumni. Local Fidel proposes candidates.`,
        eligibility: `- Partner Parents alum\n- Commitment to one-academic-year term`,
      }),
      am: makeBody("am", {
        intro: `በምክር ቤቶች ውክልና።`,
        whatsIncluded: `- ቋሚ ቦታ`,
        howToApply: `የቀደመ ፕሮግራም ምሩቅ።`,
        eligibility: `- ምሩቅ ወላጅ`,
      }),
    },
  },

  // --- Hila (2) ----------------------------------------------------------
  {
    slug: "hila-academic-tutoring",
    orgSlug: "hila",
    track: "education",
    title: {
      he: 'תגבור-לימודי בכיתות — חיל"ה',
      en: "In-Class Academic Tutoring — Hila",
      am: "በክፍል የአካዳሚክ ድጋፍ — ሂላ",
    },
    shortDescription: {
      he: "מורים-מתאמים בתוך כיתות-בית-ספר. שיעורי-עזר במתמטיקה, אנגלית, מדעים.",
      en: "Embedded teacher-coordinators in classrooms. Math, English, sciences tutoring.",
      am: "በክፍል ውስጥ መምህራን።",
    },
    duration: { he: "שנת-לימודים", en: "Academic year", am: "የትምህርት ዓመት" },
    location: {
      he: "60+ בתי-ספר ארצית",
      en: "60+ schools nationwide",
      am: "60+ ትምህርት ቤቶች",
    },
    forWhom: {
      he: 'תלמידי כיתות א-י"ב יוצאי-אתיופיה',
      en: "Ethiopian-Israeli grades 1-12 students",
      am: "ተማሪዎች",
    },
    relatedRights: [],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `חיל"ה ממקמת מורים-מתאמים-מקצועיים בתוך-כיתות בבתי-ספר עם ריכוז גבוה. תגבור-בתוך-בית-הספר (לא אחר-הצהריים).`,
        whatsIncluded: `- שיעורי-עזר בתוך-כיתה (קבוצות 6-10)\n- מעקב-התקדמות חודשי\n- חומרי-לימוד מותאמים-תרבותית\n- תיאום עם המורה-הראשי`,
        howToApply: `אוטומטי בבית-ספר שותף ל-חיל"ה. אם בית-הספר לא שותף — המנהל יכול להגיש בקשה.`,
        eligibility: `- תלמיד/ה בבית-ספר שותף\n- חינמי`,
      }),
      en: makeBody("en", {
        intro: `Hila places professional teacher-coordinators in classrooms at high-concentration schools. Tutoring within school (not afternoon).`,
        whatsIncluded: `- In-class tutoring (groups of 6-10)\n- Monthly progress tracking\n- Culturally-adapted materials\n- Coordination with main teacher`,
        howToApply: `Automatic at partner schools. If your school is not a partner — principal can apply.`,
        eligibility: `- Student at partner school\n- Free`,
      }),
      am: makeBody("am", {
        intro: `በክፍል ውስጥ መምህራን።`,
        whatsIncluded: `- በክፍል ውስጥ ድጋፍ`,
        howToApply: `በሽርክና ትምህርት ቤት ራስ-ሰራሽ።`,
        eligibility: `- ተማሪ`,
      }),
    },
  },
  {
    slug: "hila-first-stone",
    orgSlug: "hila",
    track: "education",
    title: { he: 'אבן ראשונה — חיל"ה', en: "First Stone — Hila", am: "የመጀመሪያ ድንጋይ — ሂላ" },
    shortDescription: {
      he: "התערבות-יסודית בכיתות א'-ג': קריאה, חשבון, מיומנויות-יסוד.",
      en: "Foundational intervention grades 1-3: reading, math, basic skills.",
      am: "በ1-3ኛ ክፍል መሰረታዊ ጣልቃ ገብነት።",
    },
    duration: { he: "3 שנים (כיתה א'-ג')", en: "3 years (grades 1-3)", am: "3 ዓመታት" },
    location: {
      he: "30+ בתי-ספר יסודי שותפים",
      en: "30+ partner primary schools",
      am: "30+ ትምህርት ቤቶች",
    },
    forWhom: {
      he: "תלמידי כיתה א'-ג' יוצאי-אתיופיה",
      en: "Ethiopian-Israeli grades 1-3 students",
      am: "የ1-3ኛ ክፍል ተማሪዎች",
    },
    relatedRights: [],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `מטרה: לסגור פערי-קריאה ומתמטיקה בשנים-מוקדמות. סקרי-מעקב מראים שתלמידי 'אבן ראשונה' מגיעים לכיתה ד' עם רמה דומה לתלמידים-לא-מהקהילה.`,
        whatsIncluded: `- 4-5 שעות-שבוע של תגבור-מובנה\n- חומרי-קריאה באמהרית/עברית כפולה\n- מעקב-התפתחות חצי-שנתי\n- סדנאות-הורים על מהלך-השנה`,
        howToApply: `אוטומטי בבית-ספר שותף.`,
        eligibility: `- תלמיד/ה בכיתה א'-ג' בבית-ספר שותף`,
      }),
      en: makeBody("en", {
        intro: `Goal: close reading and math gaps in early years. Tracking surveys show 'First Stone' students reach grade 4 at parity with non-community peers.`,
        whatsIncluded: `- 4-5 hours/week of structured tutoring\n- Bilingual (Amharic/Hebrew) reading materials\n- Semi-annual progress tracking\n- Parent workshops on year arc`,
        howToApply: `Automatic at partner schools.`,
        eligibility: `- Grades 1-3 student at partner school`,
      }),
      am: makeBody("am", {
        intro: `በ1-3ኛ ክፍል ክፍተት መዝጊያ።`,
        whatsIncluded: `- 4-5 ሰዓታት`,
        howToApply: `ራስ-ሰራሽ።`,
        eligibility: `- 1-3ኛ ክፍል`,
      }),
    },
  },

  // --- JDC-Ashalim (2) ---------------------------------------------------
  {
    slug: "jdc-ashalim-strong-families",
    orgSlug: "jdc-ashalim",
    track: "community",
    title: {
      he: "משפחות חזקות — JDC-אשלים",
      en: "Strong Families — JDC-Ashalim",
      am: "ጠንካራ ቤተሰቦች — JDC-አሻሊም",
    },
    shortDescription: {
      he: "ליווי משפחות עם ילדים בסיכון. תכנית-אם של JDC-אשלים בקהילה.",
      en: "Accompanying families with at-risk children. JDC-Ashalim's flagship community program.",
      am: "አደጋ ላይ ያሉ ልጆች ያላቸውን ቤተሰቦች ማጀብ።",
    },
    duration: { he: "12-24 חודשים", en: "12-24 months", am: "12-24 ወራት" },
    location: { he: "12+ ערים שותפות", en: "12+ partner cities", am: "12+ ከተሞች" },
    forWhom: {
      he: "משפחות עם ילדים בסיכון תפקודי",
      en: "Families with functionally at-risk children",
      am: "ቤተሰቦች",
    },
    relatedRights: ["domestic-violence-support", "summer-camp-subsidies"],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `תכנית-ליווי-משפחות-בסיכון בשותפות עם משרד-הרווחה. הצוות-המקצועי כולל עובדת-סוציאלית + פסיכולוג/ית-משפחה + מתאמ/ת-קהילתי.`,
        whatsIncluded: `- ביקורי-בית שבועיים\n- ייעוץ-זוגי-משפחתי\n- ליווי-בית-ספר\n- שיתוף-פעולה עם הרווחה-מקומית\n- חינמי לחלוטין`,
        howToApply: `הפניה דרך לשכת-רווחה מקומית או דרך טנא-בריאות / חברים-בטבע.`,
        eligibility: `- הפניה ממקצוע (רווחה, חינוך, בריאות)\n- ילד/ה בגיל 0-18`,
      }),
      en: makeBody("en", {
        intro: `Family-accompaniment program in partnership with the Ministry of Welfare. Team includes social worker + family psychologist + community coordinator.`,
        whatsIncluded: `- Weekly home visits\n- Couples/family counseling\n- School accompaniment\n- Cooperation with local welfare\n- Fully free`,
        howToApply: `Referral via local welfare office or via Tene Briut / Friends by Nature.`,
        eligibility: `- Professional referral (welfare, education, health)\n- Child age 0-18`,
      }),
      am: makeBody("am", {
        intro: `የቤተሰብ አጃቢነት ፕሮግራም።`,
        whatsIncluded: `- ሳምንታዊ ጉብኝቶች`,
        howToApply: `በደህንነት ቢሮ።`,
        eligibility: `- የልጅ ዕድሜ 0-18`,
      }),
    },
  },
  {
    slug: "jdc-ashalim-community-health-partner",
    orgSlug: "jdc-ashalim",
    track: "health",
    title: {
      he: "שותפות-בריאות-קהילתית — JDC-אשלים",
      en: "Community Health Partnership — JDC-Ashalim",
      am: "የማህበረሰብ ጤና ሽርክና",
    },
    shortDescription: {
      he: "מימון ליווי-טנא-בריאות + תרגום-רפואי + מניעת-מחלות.",
      en: "Funding for Tene Briut accompaniment + medical translation + disease prevention.",
      am: "የቴኔ ብሪዩት ድጋፍ።",
    },
    duration: { he: "מתמשך", en: "Ongoing", am: "ቀጣይ" },
    location: {
      he: "ארצי (דרך טנא-בריאות)",
      en: "Nationwide (via Tene Briut)",
      am: "በመላ ሀገሪቱ",
    },
    forWhom: {
      he: "כל אדם יוצא-אתיופיה הזקוק לליווי-בריאותי",
      en: "Any Ethiopian-Israeli needing health navigation",
      am: "ሁሉም",
    },
    relatedRights: ["chronic-disease-prevention", "medical-translation-services"],
    relatedTerms: ["tene-briut"],
    bodies: {
      he: makeBody("he", {
        intro: `JDC-אשלים מממנת חלק-מרכזי של פעילות טנא-בריאות. אין תכנית-משלה — אלא תמיכה-תקציבית-מתואמת. תהיה זכאי/ת לשירותי-טנא-בריאות = מקבל/ת בעקיפין שירות-JDC.`,
        whatsIncluded: `- ראה תכניות טנא-בריאות (Cultural Navigators, Medical Translation, Chronic Disease Prevention)\n- 30+ מתורגמנים-רפואיים\n- 6 סניפים-נווטים`,
        howToApply: `דרך טנא-בריאות ישירות.`,
        eligibility: `- ראה זכאות-טנא-בריאות`,
      }),
      en: makeBody("en", {
        intro: `JDC-Ashalim funds a major part of Tene Briut's operations. No standalone program — coordinated budget support. Eligibility for Tene Briut = indirect JDC service.`,
        whatsIncluded: `- See Tene Briut programs (Cultural Navigators, Medical Translation, Chronic Disease Prevention)\n- 30+ medical translators\n- 6 navigator branches`,
        howToApply: `Via Tene Briut directly.`,
        eligibility: `- See Tene Briut eligibility`,
      }),
      am: makeBody("am", {
        intro: `JDC ከቴኔ ብሪዩት ጋር ሽርክና።`,
        whatsIncluded: `- የቴኔ ብሪዩት ፕሮግራሞች ይመልከቱ`,
        howToApply: `በቴኔ ብሪዩት።`,
        eligibility: `- የቴኔ ብሪዩት ብቁነት`,
      }),
    },
  },

  // --- Friends by Nature (2) ---------------------------------------------
  {
    slug: "fbn-youth-centers",
    orgSlug: "friends-by-nature",
    track: "community",
    title: {
      he: "בתי-נוער — חברים בטבע",
      en: "Youth Centers — Friends by Nature",
      am: "የወጣት ማዕከላት",
    },
    shortDescription: {
      he: "30+ מרכזי-פנאי-וחינוך אחרי-בית-ספר לבני-נוער יוצאי-אתיופיה.",
      en: "30+ leisure-and-education centers for Ethiopian-Israeli youth after school.",
      am: "30+ የወጣት ማዕከላት።",
    },
    duration: { he: "שנת-לימודים מלאה", en: "Full academic year", am: "ሙሉ ዓመት" },
    location: { he: "30+ ערים", en: "30+ cities", am: "30+ ከተሞች" },
    forWhom: {
      he: "בני-נוער 12-18 יוצאי-אתיופיה",
      en: "Ethiopian-Israeli youth 12-18",
      am: "ወጣቶች 12-18",
    },
    relatedRights: ["summer-camp-subsidies"],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `מרכזי-פנאי-מקצועיים אחרי שעות-בית-ספר. צוות-מתאמים מהקהילה (לרוב בוגרי-בתי-נוער-חברים-בטבע בעצמם).`,
        whatsIncluded: `- חוגים: ספורט, אומנות, מוזיקה, רובוטיקה\n- מנטור 1:1\n- ארוחת-ערב חמה\n- ליווי-לימודי לבעיות-בית-ספר\n- מועדון-בנים/בנות נפרדים לפי-גיל`,
        howToApply: `1. הירשמו ב-בית-נוער הקרוב (פתוח לכל בן/בת-נוער יוצא/ת-אתיופיה)\n2. ראיון-קבלה קצר\n3. חבר/ה ב-30 הימים הראשונים, ואז מחויבות-קבועה`,
        eligibility: `- בן/בת-נוער 12-18\n- אחד-ההורים יוצא-אתיופיה\n- חינמי לזכאים`,
      }),
      en: makeBody("en", {
        intro: `Professional leisure-centers after school hours. Coordinator team from the community (mostly Friends by Nature alumni themselves).`,
        whatsIncluded: `- Activities: sports, art, music, robotics\n- 1:1 mentor\n- Hot dinner\n- Tutoring for school issues\n- Boys/girls clubs by age`,
        howToApply: `1. Register at your nearest center (open to any Ethiopian-Israeli youth)\n2. Brief intake\n3. 30-day trial, then commitment`,
        eligibility: `- Ages 12-18\n- One parent of Ethiopian origin\n- Free for eligible`,
      }),
      am: makeBody("am", {
        intro: `ከትምህርት በኋላ ማዕከላት።`,
        whatsIncluded: `- ስፖርት፣ ጥበብ`,
        howToApply: `በቅርብ ማዕከል ይመዝገቡ።`,
        eligibility: `- 12-18`,
      }),
    },
  },
  {
    slug: "fbn-crisis-hotline",
    orgSlug: "friends-by-nature",
    track: "community",
    title: {
      he: "קו-חירום 24/7 — חברים בטבע",
      en: "24/7 Crisis Hotline — Friends by Nature",
      am: "24/7 የቀውስ መስመር",
    },
    shortDescription: {
      he: "קו-טלפון 24/7 לבני-נוער במצוקה. אנונימי, חינמי, באמהרית/עברית.",
      en: "24/7 phone line for distressed youth. Anonymous, free, Amharic/Hebrew.",
      am: "24/7 የስልክ መስመር።",
    },
    duration: { he: "24/7", en: "24/7", am: "24/7" },
    location: { he: "ארצי", en: "Nationwide", am: "በመላ ሀገሪቱ" },
    forWhom: { he: "בני-נוער במצב-משבר", en: "Youth in crisis", am: "በቀውስ ውስጥ ያሉ ወጣቶች" },
    relatedRights: ["domestic-violence-support"],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `שירות-חירום שמיועד לבני-נוער שמרגישים בסיכון: מחשבות-אובדניות, אלימות-במשפחה, התעללות, חוסר-קורת-גג. **חיוני לזכור — זה מציל-חיים.**`,
        whatsIncluded: `- מענה-מקצועי תוך 60 שניות\n- שירות באמהרית/עברית/תיגרינית (לפי-זמינות)\n- אנונימיות מלאה\n- ליווי לסיוע פיזי אם נדרש`,
        howToApply: `מספר-החירום: **1-800-XXX-XXX** (פרטים נוספים באתר fbn.org.il).\n\n**במקרה-חירום מיידי**: 100 (משטרה) או 101 (מד"א) במקביל.`,
        eligibility: `- כל בן/בת-נוער\n- אנונימי-לחלוטין\n- חינמי`,
      }),
      en: makeBody("en", {
        intro: `Emergency service for at-risk youth: suicidal ideation, family violence, abuse, homelessness. **Critical to remember — this saves lives.**`,
        whatsIncluded: `- Professional response within 60 seconds\n- Service in Amharic/Hebrew/Tigrinya (subject to availability)\n- Full anonymity\n- Accompaniment to physical help if needed`,
        howToApply: `Hotline: **1-800-XXX-XXX** (more details at fbn.org.il).\n\n**Immediate emergency**: 100 (police) or 101 (Magen David Adom) in parallel.`,
        eligibility: `- Any youth\n- Fully anonymous\n- Free`,
      }),
      am: makeBody("am", {
        intro: `የአደጋ አገልግሎት።`,
        whatsIncluded: `- ሙያዊ ምላሽ`,
        howToApply: `1-800-XXX-XXX።`,
        eligibility: `- ሁሉም ወጣት`,
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
        intro: `IAEJ הוא הקול-המוביל בארץ למאבק לאיחוד-משפחות פלשמורה. הוביל את החלטות 716/2015, 4399/2018, ואת חידוש 716 ב-2024.`,
        whatsIncluded: `- ייצוג-משפחתי מול ממשלה ו-Knesset\n- תמיכה-משפטית בצירוף עם Tebeka\n- מעקב-מבצעים והעברה-לישראל\n- סדנאות-הסברה לקהילה`,
        howToApply: `1. רישום משפחה ב-iaej.co.il\n2. הצגת-מסמכים על קרובי-משפחה באתיופיה\n3. הוספה לרשימת-המאבק (לא מבטיחה עלייה אוטומטית)`,
        eligibility: `- משפחה עם קרובים פלשמורה (חיים באתיופיה)\n- עליית-יהודים-מוכר`,
      }),
      en: makeBody("en", {
        intro: `IAEJ is the leading national voice for Falash Mura family reunification. Led Decisions 716/2015, 4399/2018, and the 2024 716 renewal.`,
        whatsIncluded: `- Family representation before government and Knesset\n- Legal support together with Tebeka\n- Operation tracking and transfer to Israel\n- Community education workshops`,
        howToApply: `1. Family registration at iaej.co.il\n2. Submit documents on Ethiopian relatives\n3. Added to advocacy list (no automatic guarantee)`,
        eligibility: `- Family with Falash Mura relatives (in Ethiopia)\n- Recognized aliyah path`,
      }),
      am: makeBody("am", {
        intro: `የፋላሽ ሙራ ቤተሰብ ዳግም ግንኙነት።`,
        whatsIncluded: `- መንግስት ውክልና`,
        howToApply: `በiaej.co.il ምዝገባ።`,
        eligibility: `- በኢትዮጵያ ፋላሽ ሙራ ዘመዶች`,
      }),
    },
  },
  {
    slug: "iaej-senior-centers",
    orgSlug: "iaej",
    track: "community",
    title: {
      he: "מועדוני-קשישים — IAEJ",
      en: "Senior Centers — IAEJ",
      am: "የአዛውንት ማዕከላት",
    },
    shortDescription: {
      he: "30+ מרכזי-יום לקשישים יוצאי-אתיופיה. אוכל, פעילות, ליווי-בריאותי.",
      en: "30+ day centers for Ethiopian-Israeli seniors. Meals, activities, health navigation.",
      am: "30+ የቀን ማዕከላት።",
    },
    duration: { he: "יומי", en: "Daily", am: "ዕለታዊ" },
    location: { he: "30+ ערים", en: "30+ cities", am: "30+ ከተሞች" },
    forWhom: {
      he: "קשישים 65+ יוצאי-אתיופיה",
      en: "Seniors 65+ of Ethiopian origin",
      am: "65+ አዛውንቶች",
    },
    relatedRights: ["senior-stipend"],
    relatedTerms: ["beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `מענה-מקיף לאוכלוסיית-קשישים מהקהילה — שמירה על תרבות, מניעת-בידוד, וליווי-בריאותי. הסיבה: לקשישים-יוצאי-אתיופיה יש שיעור-בידוד גבוה במיוחד.`,
        whatsIncluded: `- ארוחת-בוקר וצהריים מהמטבח האתיופי\n- חוגי-תפילה (קייסים)\n- אירועי-סיגד-מקומיים\n- ליווי לקופ"ח (בשיתוף טנא-בריאות)\n- הסעות מבית הקשיש`,
        howToApply: `1. הפניה דרך לשכת-רווחה מקומית או ביטוח-לאומי\n2. הרשמה ב-מועדון הקרוב\n3. ראיון-התאמה לבריאות-נוכחית`,
        eligibility: `- גיל 65+\n- אחד-ההורים-לפחות יוצא-אתיופיה\n- חינמי לזכאי-רווחה; השתתפות-סמלית למבטחים`,
      }),
      en: makeBody("en", {
        intro: `Comprehensive response to community senior population — cultural preservation, isolation prevention, health navigation. The reason: Ethiopian-Israeli seniors have particularly high isolation rates.`,
        whatsIncluded: `- Breakfast and lunch from Ethiopian kitchen\n- Prayer circles (Kessim)\n- Local Sigd events\n- HMO accompaniment (with Tene Briut)\n- Transportation from senior's home`,
        howToApply: `1. Referral via local welfare office or National Insurance\n2. Register at nearest club\n3. Health-fit intake interview`,
        eligibility: `- Age 65+\n- At least one parent of Ethiopian origin\n- Free for welfare-eligible; symbolic fee for insured`,
      }),
      am: makeBody("am", {
        intro: `የአዛውንት ማዕከላት።`,
        whatsIncluded: `- ቁርስ እና ምሳ`,
        howToApply: `በደህንነት ቢሮ።`,
        eligibility: `- 65+`,
      }),
    },
  },

  // --- BINA (1) ----------------------------------------------------------
  {
    slug: "bina-heritage-tourism",
    orgSlug: "bina",
    track: "community",
    title: { he: "תיירות-מורשת — BINA", en: "Heritage Tourism — BINA", am: "የቅርስ ቱሪዝም" },
    shortDescription: {
      he: "סיורי-קהילה לישראל לקרובים-בני-משפחה. אחת לשנה.",
      en: "Yearly community heritage trips to Israel for relatives.",
      am: "ዓመታዊ ጉዞዎች።",
    },
    duration: { he: "10-14 ימים", en: "10-14 days", am: "10-14 ቀናት" },
    location: {
      he: "ירושלים, נתניה, רחובות, מוזיאון פלשמורה",
      en: "Jerusalem, Netanya, Rehovot, Falash Mura Museum",
      am: "በእስራኤል",
    },
    forWhom: {
      he: 'בני-משפחה של ביתא-ישראל בארה"ב/קנדה',
      en: "Family members of Beta Israel in US/Canada",
      am: "ቤተሰብ",
    },
    relatedRights: [],
    relatedTerms: ["beta-israel"],
    bodies: {
      he: makeBody("he", {
        intro: `BINA מארגנת אחת-לשנה סיור-קהילתי-משפחתי לישראל. מטרות: לחזק-שרשרת-קהילתית, להראות-לדור-2 בארה"ב את ארץ-המוצא, ולגייס-משאבים.`,
        whatsIncluded: `- 10-14 ימים בארץ\n- ביקורים-מקצועיים בארגוני-קהילה (ENP, IAEJ, Tene Briut)\n- מפגשים-משפחתיים מתואמים\n- אירועי-מורשת (סיגד אם הוא בתקופה)\n- מארגנים-מקצועיים מהקהילה`,
        howToApply: `הרשמה דרך bina-na.org. תאריכי-יציאה מתפרסמים ב-מאי לסיור של אוקטובר/נובמבר.`,
        eligibility: `- חבר/ת BINA או בן/בת-משפחה של חבר/ה\n- $2,500-3,500 לבן-אדם (כולל טיסה)\n- מילגות-חלקיות לסטודנטים`,
      }),
      en: makeBody("en", {
        intro: `BINA organizes a yearly family-community trip to Israel. Goals: strengthen the community chain, show 2nd-gen in the US the country of origin, and raise resources.`,
        whatsIncluded: `- 10-14 days in Israel\n- Professional visits to community organizations (ENP, IAEJ, Tene Briut)\n- Coordinated family meetings\n- Heritage events (Sigd if in season)\n- Community professional organizers`,
        howToApply: `Register via bina-na.org. Departure dates announced in May for October/November trip.`,
        eligibility: `- BINA member or family of a member\n- $2,500-3,500 per person (including flight)\n- Partial scholarships for students`,
      }),
      am: makeBody("am", {
        intro: `ዓመታዊ የቤተሰብ ጉዞ።`,
        whatsIncluded: `- 10-14 ቀናት`,
        howToApply: `bina-na.org።`,
        eligibility: `- የBINA አባል`,
      }),
    },
  },

  // --- Atid B'midbar (2) -------------------------------------------------
  {
    slug: "atid-bamidbar-code-camp",
    orgSlug: "atid-bamidbar",
    track: "career",
    title: { he: "קוד-קמפ — עתיד במדבר", en: "Code Camp — Atid B'midbar", am: "ኮድ ካምፕ" },
    shortDescription: {
      he: "Bootcamp תכנות בבאר-שבע. ~80 בוגרים בשנה.",
      en: "Coding bootcamp in Beersheba. ~80 graduates/year.",
      am: "የኮድ ቦትካምፕ።",
    },
    duration: { he: "5 חודשים", en: "5 months", am: "5 ወራት" },
    location: { he: "באר שבע", en: "Beersheba", am: "ቤርሼባ" },
    forWhom: {
      he: "תושבי-נגב יוצאי-אתיופיה",
      en: "Ethiopian-Israeli Negev residents",
      am: "የነጎቭ ነዋሪዎች",
    },
    relatedRights: ["tech-career-bootcamp"],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `Bootcamp לתושבי-נגב, בשיתוף-פעולה עם חברות-הייטק-נגביות. שותפים: SOC, Mer, חברות-סטארטאפ.`,
        whatsIncluded: `- 5 חודשים, 35 שעות בשבוע\n- מימון-מלא לזכאים\n- שיבוץ-עבודה אצל חברות-נגב\n- מנטור-קריירה לאחר ה-bootcamp`,
        howToApply: `1. רישום ב-atidbamidbar.org.il\n2. מבחן-לוגי\n3. ראיון-מוטיבציה`,
        eligibility: `- תושב/ת-נגב יוצא/ת-אתיופיה\n- תואר ראשון או חמש שנות-לימוד אקדמי\n- אזרחות ישראלית`,
      }),
      en: makeBody("en", {
        intro: `Bootcamp for Negev residents, partnered with Negev tech companies. Partners: SOC, Mer, startups.`,
        whatsIncluded: `- 5 months, 35 hours/week\n- Full subsidy for eligible\n- Job placement with Negev firms\n- Career mentor post-bootcamp`,
        howToApply: `1. Register at atidbamidbar.org.il\n2. Logic test\n3. Motivation interview`,
        eligibility: `- Ethiopian-Israeli Negev resident\n- BA or 5 years of academic study\n- Israeli citizenship`,
      }),
      am: makeBody("am", {
        intro: `የነጎቭ ቦትካምፕ።`,
        whatsIncluded: `- 5 ወራት`,
        howToApply: `ይመዝገቡ።`,
        eligibility: `- የነጎቭ ነዋሪ`,
      }),
    },
  },
  {
    slug: "atid-bamidbar-school-tutoring",
    orgSlug: "atid-bamidbar",
    track: "education",
    title: {
      he: "תגבור-לימודי בבתי-ספר — עתיד במדבר",
      en: "School Tutoring — Atid B'midbar",
      am: "የትምህርት ቤት ድጋፍ",
    },
    shortDescription: {
      he: "תגבור בבתי-ספר באזור באר-שבע / רהט / שדרות.",
      en: "Tutoring in schools in the Beersheba / Rahat / Sderot area.",
      am: "በነጎቭ ትምህርት ቤት ድጋፍ።",
    },
    duration: { he: "שנת-לימודים", en: "Academic year", am: "የትምህርት ዓመት" },
    location: {
      he: "7 בתי-ספר באזור באר-שבע",
      en: "7 schools in Beersheba area",
      am: "7 ትምህርት ቤቶች",
    },
    forWhom: {
      he: "תלמידים יוצאי-אתיופיה בנגב",
      en: "Ethiopian-Israeli students in Negev",
      am: "ተማሪዎች",
    },
    relatedRights: [],
    relatedTerms: [],
    bodies: {
      he: makeBody("he", {
        intro: `מקביל-לחיל"ה אך מותאם-לנגב. מורים-מתאמים בבתי-ספר עם ריכוז גבוה של תלמידים יוצאי-אתיופיה.`,
        whatsIncluded: `- תגבור בקבוצות 6-10\n- חומרי-לימוד\n- מעקב-התקדמות`,
        howToApply: `דרך בית-הספר.`,
        eligibility: `- תלמיד/ה בבית-ספר שותף`,
      }),
      en: makeBody("en", {
        intro: `Parallel to Hila but tailored for the Negev. Teacher-coordinators in schools with high concentration.`,
        whatsIncluded: `- Tutoring in groups of 6-10\n- Materials\n- Progress tracking`,
        howToApply: `Via your school.`,
        eligibility: `- Student at partner school`,
      }),
      am: makeBody("am", {
        intro: `በነጎቭ የትምህርት ድጋፍ።`,
        whatsIncluded: `- ድጋፍ`,
        howToApply: `በትምህርት ቤት።`,
        eligibility: `- ተማሪ`,
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
