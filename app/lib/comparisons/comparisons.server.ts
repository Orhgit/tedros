// Comparison-pages seed (RIN-421 / part of RIN-417 SEO Wave 3).
//
// 10 "X vs Y" pages in HE/EN/AM. Captures long-tail comparison queries
// ("ISEF vs Hesegim", "Tene Briut vs Klalit") and routes users into the
// right Right / Org / Glossary entry afterwards.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { ComparisonCategory } from "./categories";

export type { ComparisonCategory } from "./categories";

/** A side of a comparison. Either points at a known Right / Org / Glossary
 * entry (so we can validate cross-links) or carries free-form data. */
export interface ComparisonSide {
  name: Translatable;
  /** What kind of internal entry this side maps to, if any. */
  link?:
    | { type: "right"; slug: string }
    | { type: "org"; slug: string }
    | { type: "glossary"; slug: string };
  /** Tagline shown under the name in the side-by-side header. */
  tagline: Translatable;
}

/** A single criterion compared across both sides. */
export interface ComparisonCriterion {
  label: Translatable;
  a: Translatable;
  b: Translatable;
  /** Optional indicator of which side "wins" this criterion (or "both"). */
  winner?: "a" | "b" | "both" | "neither";
}

export interface ComparisonEntry {
  slug: string;
  category: ComparisonCategory;
  title: Translatable;
  shortDescription: Translatable;
  sideA: ComparisonSide;
  sideB: ComparisonSide;
  criteria: ComparisonCriterion[];
  /** Slugs of related rights / glossary terms / orgs. */
  relatedRights: string[];
  relatedTerms: string[];
  relatedOrgs: string[];
  /** Markdown body × locale (intro + how-to-choose + summary). */
  bodies: Record<Locale, string>;
}

// --- 10 comparison entries --------------------------------------------------

export const COMPARISONS: ComparisonEntry[] = [
  // 1. ISEF vs Hesegim — excellence scholarships
  {
    slug: "isef-vs-hesegim",
    category: "education",
    title: {
      he: "ISEF מול הישגים — מלגות מצטיינים",
      en: "ISEF vs Hesegim — Excellence Scholarships",
      am: "ISEF በተቃራኒ ሄሰጊም — የብቃት ስኮላርሺፕ",
    },
    shortDescription: {
      he: "שתי תוכניות מימון לסטודנטים מצטיינים יוצאי אתיופיה. ISEF פילנתרופית-בינלאומית; הישגים ממשלתית-ישראלית.",
      en: "Two funding programs for outstanding Ethiopian-Israeli students. ISEF is philanthropic-international; Hesegim is government-Israeli.",
      am: "ለብቁ የኢትዮጵያ-እስራኤል ተማሪዎች ሁለት የፋይናንስ ፕሮግራሞች።",
    },
    sideA: {
      name: { he: "ISEF", en: "ISEF", am: "ISEF" },
      link: { type: "org", slug: "isef" },
      tagline: {
        he: "קרן פילנתרופית",
        en: "Philanthropic foundation",
        am: "የበጎ አድራጎት ፋውንዴሽን",
      },
    },
    sideB: {
      name: { he: "הישגים", en: "Hesegim", am: "ሄሰጊም" },
      link: { type: "glossary", slug: "hesegim-isef" },
      tagline: { he: "תוכנית ממשלתית", en: "Government program", am: "የመንግስት ፕሮግራም" },
    },
    criteria: [
      {
        label: { he: "מקור-מימון", en: "Funding source", am: "የፋይናንስ ምንጭ" },
        a: {
          he: "פילנתרופיה (פדרציות אמריקאיות)",
          en: "Philanthropy (American federations)",
          am: "የበጎ አድራጎት (አሜሪካዊ ፌዴሬሽኖች)",
        },
        b: {
          he: "משרד העלייה והקליטה",
          en: "Ministry of Aliyah & Integration",
          am: "የዐሊያህና መቀበል ሚኒስቴር",
        },
      },
      {
        label: { he: "סטודנטים בשנה", en: "Students/year", am: "በዓመት ተማሪዎች" },
        a: { he: "~400", en: "~400", am: "~400" },
        b: { he: "~600", en: "~600", am: "~600" },
        winner: "b",
      },
      {
        label: { he: "כיסוי שכר-לימוד", en: "Tuition coverage", am: "የትምህርት ክፍያ ሽፋን" },
        a: { he: "100%", en: "100%", am: "100%" },
        b: { he: "75%", en: "75%", am: "75%" },
        winner: "a",
      },
      {
        label: { he: "מענק חודשי", en: "Monthly stipend", am: "ወርሃዊ ድጎማ" },
        a: { he: "₪3,000-3,500", en: "₪3,000-3,500", am: "₪3,000-3,500" },
        b: { he: "₪2,500", en: "₪2,500", am: "₪2,500" },
        winner: "a",
      },
      {
        label: { he: "דרישת-ממוצע", en: "GPA requirement", am: "የውጤት ኣማካይ መስፈርት" },
        a: { he: "85+", en: "85+", am: "85+" },
        b: { he: "80+", en: "80+", am: "80+" },
        winner: "b",
      },
      {
        label: { he: "מסלולים", en: "Tracks", am: "መንገዶች" },
        a: { he: "תואר ראשון, שני, ודוקטורט", en: "BA, MA, PhD", am: "BA፣ MA፣ PhD" },
        b: { he: "תואר ראשון בלבד (כברירת-מחדל)", en: "BA only (default)", am: "BA ብቻ" },
        winner: "a",
      },
      {
        label: { he: "מנטור אקדמי", en: "Academic mentor", am: "የአካዳሚክ አማካሪ" },
        a: { he: "כן", en: "Yes", am: "አዎ" },
        b: { he: "לא רשמי", en: "Not formal", am: "መደበኛ አይደለም" },
        winner: "a",
      },
      {
        label: { he: "ראיון אישי", en: "Personal interview", am: "የግል ቃለ መጠይቅ" },
        a: { he: "חובה", en: "Required", am: "ግዴታ" },
        b: { he: "לא רגילה", en: "Not standard", am: "መደበኛ አይደለም" },
      },
    ],
    relatedRights: ["unconditional-scholarships-7-sources", "matriculation-grant"],
    relatedTerms: ["hesegim-isef", "beta-israel"],
    relatedOrgs: ["isef", "enp"],
    bodies: {
      he: `## למה ההשוואה הזו

שני המסלולים הם ה-default-ים העיקריים לסטודנטים מצטיינים יוצאי אתיופיה. ההבדלים פרקטיים — לא של איכות.

## איך לבחור?

- **ממוצע 85+, פוטנציאל מנהיגות, תואר שני/דוקטורט בעתיד**: ISEF נותנת יותר. הסכומים, המנטור האקדמי, והמסלול לתואר שני/דוקטורט מטיבים עם נתיב-קריירה ארוך.
- **ממוצע 80-85, רוצה להתחיל בלי ראיון מורכב**: הישגים יותר נגישה. גם 75% של שכר-הלימוד + 2,500 ₪ חודשי משמעותיים, ופחות סטודנטים בקבוצה ⇒ פחות תחרות.
- **שתיהן יחד?** לא. כפל-מילגות פוסל אחת מהן.

## נקודות-מבט נוספות

- ENP מנהלת את הישגים ב-Tier-1 ⇒ ערוץ-תקשורת ברור עם הקהילה.
- ISEF מחייבת alumni-network פעילה — מי שלא מתאים לפעילות-קהילתית יישלל.
- שתיהן מבוססות-אמת מקור-אתיופי (לפחות הורה אחד נולד באתיופיה).

## תכנית-פעולה

1. בדקו את הקריטריונים שלכם מול שתיהן.
2. אם זכאים לשתיהן: חשבו lifetime-value של ISEF (תואר שני אם תמשיכו) מול תואר-ראשון בלבד של הישגים.
3. הגישו תיק-בקשה ל-ISEF ב-מאי-יוני, להישגים בקיץ.
`,
      en: `## Why this comparison

Both tracks are the primary defaults for outstanding Ethiopian-Israeli students. The differences are practical — not quality-related.

## How to choose

- **GPA 85+, leadership potential, planning MA/PhD**: ISEF gives more. Higher amounts, an academic mentor, and the MA/PhD track make for a longer career path.
- **GPA 80-85, want to start without a complex interview**: Hesegim is more accessible. 75% tuition + ₪2,500 monthly is meaningful, and the larger cohort means less in-group competition.
- **Both together?** No. Double-scholarship rules disqualify one.

## Additional perspectives

- ENP runs Hesegim at Tier-1 — a clear communication channel with the community.
- ISEF requires an active alumni network — applicants without community-engagement potential are filtered out.
- Both require Ethiopian origin (at least one parent born in Ethiopia).

## Action plan

1. Check your criteria against both.
2. If eligible for both: weigh ISEF's lifetime value (MA/PhD if you continue) against Hesegim's BA-only coverage.
3. Apply to ISEF in May-June, Hesegim in summer.
`,
      am: `## ይህ ንጽጽር ለምን

ሁለቱም መንገዶች ለብቁ የኢትዮጵያ-እስራኤል ተማሪዎች ዋነኛ አማራጮች ናቸው። ልዩነቶቹ ተግባራዊ ናቸው።

## እንዴት ለመምረጥ

- **ኣማካይ 85+፣ መሪነት እምቅ፣ MA/PhD ለማቀድ**: ISEF ብዙ ይሰጣል።
- **ኣማካይ 80-85፣ ቃለ መጠይቅ ሳይኖር መጀመር**: ሄሰጊም የበለጠ ተደራሽ ነው።
- **ሁለቱም በአንድ ጊዜ?** አይቻልም።

## ተጨማሪ እይታዎች

- ENP ሄሰጊምን በTier-1 ያስተዳድራል።
- ISEF ንቁ የቀድሞ ምሩቃን ኔትወርክ ይፈልጋል።
- ሁለቱም የኢትዮጵያ ምንጭ ይፈልጋሉ።

## የድርጊት እቅድ

1. መስፈርቶችዎን ከሁለቱም ጋር ያረጋግጡ።
2. ለሁለቱም ብቁ ከሆኑ: ISEF (MA/PhD) ከ ሄሰጊም (BA ብቻ) ጋር ያወዳድሩ።
3. ለISEF በግንቦት-ሰኔ፣ ለሄሰጊም በበጋ ያመልክቱ።
`,
    },
  },

  // 2. ENP vs Fidel — community education
  {
    slug: "enp-vs-fidel",
    category: "education",
    title: {
      he: "ENP מול פידל — חינוך קהילתי",
      en: "ENP vs Fidel — Community Education",
      am: "ENP በተቃራኒ ፊደል — የማህበረሰብ ትምህርት",
    },
    shortDescription: {
      he: "ENP מסגרת-שותפות לאומית; פידל אגודת הורים-תלמידים. שניהם פעילים בתחום החינוך.",
      en: "ENP is a national partnership framework; Fidel is a parents-students association. Both work in education.",
      am: "ENP ብሔራዊ የሽርክና ማዕቀፍ ነው፤ ፊደል የወላጆች-ተማሪዎች ማህበር ነው።",
    },
    sideA: {
      name: { he: "ENP", en: "ENP", am: "ENP" },
      link: { type: "org", slug: "enp" },
      tagline: { he: "שותפות לאומית", en: "National partnership", am: "ብሔራዊ ሽርክና" },
    },
    sideB: {
      name: { he: "פידל", en: "Fidel", am: "ፊደል" },
      link: { type: "org", slug: "fidel" },
      tagline: {
        he: "אגודת הורים-תלמידים",
        en: "Parents-students association",
        am: "የወላጆች-ተማሪዎች ማህበር",
      },
    },
    criteria: [
      {
        label: { he: "מודל", en: "Model", am: "ሞዴል" },
        a: { he: "מימון + תכניות", en: "Funding + programs", am: "ፋይናንስ + ፕሮግራሞች" },
        b: {
          he: "סנגור הורים + תכניות",
          en: "Parent advocacy + programs",
          am: "የወላጅ ጥብቅና + ፕሮግራሞች",
        },
      },
      {
        label: { he: "תכניות מרכזיות", en: "Main programs", am: "ዋና ፕሮግራሞች" },
        a: {
          he: "SPACE, SHALAV, מענק בגרות, Tech-Career",
          en: "SPACE, SHALAV, Bagrut grant, Tech-Career",
          am: "SPACE፣ SHALAV፣ Bagrut፣ Tech-Career",
        },
        b: {
          he: "הורים שותפים, מועצות בתי-ספר, סדנאות",
          en: "Partner parents, school councils, workshops",
          am: "የሽርክና ወላጆች፣ የትምህርት ቤት ምክር ቤቶች",
        },
      },
      {
        label: { he: "אוכלוסיית-יעד", en: "Target audience", am: "ዒላማ ሕዝብ" },
        a: { he: "תלמידים ובוגרים", en: "Students and graduates", am: "ተማሪዎችና ምሩቃን" },
        b: { he: "הורים + תלמידים", en: "Parents + students", am: "ወላጆች + ተማሪዎች" },
      },
      {
        label: { he: "טווח-גילים", en: "Age range", am: "የእድሜ ክልል" },
        a: {
          he: "כיתה א'-ראשית-קריירה",
          en: "Grade 1-early career",
          am: "1ኛ ክፍል-ቀደምት ሥራ",
        },
        b: { he: "כיתה א'-י\"ב", en: "Grade 1-12", am: "1-12ኛ ክፍል" },
      },
      {
        label: { he: "מקור-מימון", en: "Funding source", am: "የፋይናንስ ምንጭ" },
        a: {
          he: "ממשלה (40%) + JDC + פדרציות",
          en: "Government (40%) + JDC + federations",
          am: "መንግስት + JDC + ፌዴሬሽኖች",
        },
        b: {
          he: "ממשלה + תרומות + JDC",
          en: "Government + donations + JDC",
          am: "መንግስት + ስጦታዎች + JDC",
        },
      },
      {
        label: { he: "השפעה ציבורית", en: "Public impact", am: "የህዝብ ተጽእኖ" },
        a: {
          he: "מימון + תזכירי-מדיניות",
          en: "Funding + policy briefs",
          am: "ፋይናንስ + የፖሊሲ ሰነዶች",
        },
        b: {
          he: "סנגור פעיל בכנסת + הכשרת-הורים",
          en: "Active Knesset advocacy + parent training",
          am: "ንቁ የኬሰት ጥብቅና + የወላጅ ስልጠና",
        },
      },
    ],
    relatedRights: ["matriculation-grant", "unconditional-scholarships-7-sources"],
    relatedTerms: ["enp"],
    relatedOrgs: ["enp", "fidel", "hila"],
    bodies: {
      he: `## למה לא להחליט מי "טוב יותר"

הם משלימים. מסלול-טבעי לתלמיד מהקהילה: פידל מטפלת בהורים, ENP במימון. אבל לפעמים צריך להחליט.

## איך לבחור?

- **ילד בכיתה א'-ו'**: שניהם רלוונטיים — פידל לעבודה עם הורים בבית-ספר, ENP-SHALAV לתגבור בתוך-כיתה.
- **תיכוניסט/ית מצטיין/ת**: ENP-SPACE + מענק בגרות. פידל פחות אפקטיבית בתיכון.
- **בוגר/ת תיכון לפני אקדמיה**: ENP בלבד (Tech-Career, מנטור-קריירה).
- **הורים שמרגישים לא-נציגים בבית-ספר**: פידל בלבד.

## אין-מתחרים

ENP ופידל פותרים בעיות שונות. הקהילה מרוויחה מההשקעה בשניהם — אך לקבלת-החלטה אישית, מסגרת-זמן + גיל-הילד מכריעים.
`,
      en: `## Why don't we just pick a winner

They're complementary. A natural community-student path: Fidel handles parents, ENP handles funding. Sometimes a choice is needed.

## How to choose

- **Child in grades 1-6**: both are relevant — Fidel for parent-school work, ENP-SHALAV for in-class tutoring.
- **Outstanding high-schooler**: ENP-SPACE + Bagrut grant. Fidel less effective in HS.
- **HS graduate before college**: ENP only (Tech-Career, career mentor).
- **Parents feeling underrepresented at school**: Fidel only.

## Not zero-sum

ENP and Fidel solve different problems. Personal decisions hinge on timing and child's age.
`,
      am: `## ለምን አሸናፊ አንመርጥም

ተደጋጋፊ ናቸው። የተፈጥሮ መንገድ፦ ፊደል ለወላጆች፣ ENP ለፋይናንስ።

## እንዴት ለመምረጥ

- **በ1-6ኛ ክፍል ልጅ**: ሁለቱም ተገቢ።
- **ብቁ የሁለተኛ ደረጃ ተማሪ**: ENP-SPACE + የባግሩት ስጦታ።
- **ከሁለተኛ ደረጃ ምሩቅ ከኮሌጅ በፊት**: ENP ብቻ።
- **ራሳቸውን ተወካይ ያልሆኑ ወላጆች**: ፊደል ብቻ።
`,
    },
  },

  // 3. Olim Beyahad vs ENP Tech-Career
  {
    slug: "olim-beyahad-vs-tech-career",
    category: "education",
    title: {
      he: "עולים ביחד מול Tech-Career — מעבר להייטק",
      en: "Olim Beyahad vs Tech-Career — Path to Tech",
      am: "ኦሊም በያሐድ በተቃራኒ ቴክ-ካሪየር",
    },
    shortDescription: {
      he: "שניהם מובילים בוגרי-תואר-ראשון להייטק. עולים ביחד = מנטורינג; Tech-Career = bootcamp.",
      en: "Both move first-degree graduates into tech. Olim Beyahad = mentorship; Tech-Career = bootcamp.",
      am: "ሁለቱም የመጀመሪያ ዲግሪ ምሩቃንን ወደ ቴክ ያስገባሉ።",
    },
    sideA: {
      name: { he: "עולים ביחד", en: "Olim Beyahad", am: "ኦሊም በያሐድ" },
      link: { type: "org", slug: "olim-beyahad" },
      tagline: {
        he: "מנטורינג ארוך-טווח",
        en: "Long-term mentorship",
        am: "የረዥም ጊዜ አማካሪነት",
      },
    },
    sideB: {
      name: { he: "ENP Tech-Career", en: "ENP Tech-Career", am: "ENP ቴክ-ካሪየር" },
      link: { type: "right", slug: "tech-career-bootcamp" },
      tagline: { he: "bootcamp 6 חודשים", en: "6-month bootcamp", am: "6 ወር ቦትካምፕ" },
    },
    criteria: [
      {
        label: { he: "פורמט", en: "Format", am: "ቅርጸት" },
        a: {
          he: "מנטור 1:1 + נטוורקינג",
          en: "1:1 mentor + networking",
          am: "1:1 አማካሪ + ኔትወርኪንግ",
        },
        b: {
          he: "Bootcamp אינטנסיבי 6 חודשים",
          en: "Intensive 6-month bootcamp",
          am: "ጥልቅ 6 ወር ቦትካምፕ",
        },
      },
      {
        label: { he: "טווח-זמן", en: "Time horizon", am: "የጊዜ አድማስ" },
        a: { he: "12-24 חודשים", en: "12-24 months", am: "12-24 ወራት" },
        b: { he: "6 חודשים + שיבוץ", en: "6 months + placement", am: "6 ወራት + ምደባ" },
      },
      {
        label: { he: "דרישת-תואר", en: "Degree requirement", am: "የዲግሪ መስፈርት" },
        a: { he: "תואר ראשון", en: "BA required", am: "BA ግዴታ" },
        b: {
          he: "לא חובה (ניתן ללמוד תוך-כדי)",
          en: "Not required (can study during)",
          am: "አስፈላጊ አይደለም",
        },
        winner: "b",
      },
      {
        label: { he: "תוצאת-יעד", en: "Target outcome", am: "ዒላማ ውጤት" },
        a: {
          he: "תפקיד-איכותי בתחום-המקצועי",
          en: "Quality role in professional field",
          am: "ጥራት ያለው ሥራ",
        },
        b: { he: "תפקיד-טכני בהייטק", en: "Tech role in industry", am: "የቴክ ሥራ" },
      },
      {
        label: { he: "תכנים-נלמדים", en: "Content learned", am: "የተማረ ይዘት" },
        a: {
          he: "אסטרטגיית-קריירה, נטוורקינג, פתרון-בעיות",
          en: "Career strategy, networking, problem solving",
          am: "የሥራ ስትራቴጂ",
        },
        b: {
          he: "JavaScript/Python, Cloud, מעשה-מקצועי",
          en: "JS/Python, cloud, professional practice",
          am: "JavaScript/Python፣ ክላውድ",
        },
      },
      {
        label: { he: "כמות בוגרים בשנה", en: "Graduates/year", am: "በዓመት ምሩቃን" },
        a: { he: "~150-200", en: "~150-200", am: "~150-200" },
        b: { he: "~120", en: "~120", am: "~120" },
        winner: "a",
      },
      {
        label: { he: "מימון", en: "Funding", am: "ፋይናንስ" },
        a: {
          he: "חינם (חסות חברות הייטק)",
          en: "Free (corporate sponsorship)",
          am: "ነጻ",
        },
        b: {
          he: "סובסידיה מלאה לזכאים",
          en: "Full subsidy for eligible",
          am: "ለብቁ ሙሉ ድጎማ",
        },
      },
    ],
    relatedRights: ["youth-mentorship", "tech-career-bootcamp"],
    relatedTerms: ["olim-beyahad", "enp"],
    relatedOrgs: ["olim-beyahad", "enp"],
    bodies: {
      he: `## למה ההשוואה הזו

שתי תכניות מובילות לתעסוקה בהייטק, אבל המודלים שונים מאוד.

## איך לבחור?

- **כבר עם תואר ראשון בתחום-לא-טכני (היסטוריה, ביולוגיה, חינוך)**: Tech-Career עדיף — ה-bootcamp נותן מיומנויות-מקצועיות שאתה לא מתכון לרכוש דרך מנטור-עולים-ביחד בלבד.
- **תואר ראשון בתחום-קרוב (כלכלה, מתמטיקה, סטטיסטיקה)**: עולים ביחד — המנטור מאפשר לך לשלב את הרקע הקיים שלך ולהתקדם דרך נטוורקינג ולא דרך הסבה-מלאה.
- **שניהם יחד?** אופציה שכיחה. Tech-Career נותן מיומנויות; עולים ביחד נותן את הקריירה-לטווח-ארוך.

## תכנית-פעולה

1. אם אתה כבר בתעסוקה — עולים ביחד.
2. אם אין תפקיד-מתאים בתחום שלך — Tech-Career.
3. אחרי Tech-Career — הירשם לעולים ביחד למנטור-קריירה ארוך-טווח.
`,
      en: `## Why this comparison

Two leading routes to tech, but the models are very different.

## How to choose

- **Already have a BA in non-tech (history, biology, education)**: Tech-Career wins — the bootcamp gives professional skills you wouldn't get via Olim Beyahad mentorship alone.
- **BA in adjacent field (econ, math, stats)**: Olim Beyahad — mentor lets you leverage your existing background and progress via networking rather than a full pivot.
- **Both?** Common combination. Tech-Career delivers the skills; Olim Beyahad delivers the long-term career.

## Action plan

1. Already employed — Olim Beyahad.
2. No matching role in your field — Tech-Career.
3. After Tech-Career — register for Olim Beyahad for long-term mentorship.
`,
      am: `## ይህ ንጽጽር ለምን

ሁለት መሪ መንገዶች ወደ ቴክ።

## እንዴት ለመምረጥ

- **በቴክ ላልሆነ መስክ BA አለ**: ቴክ-ካሪየር ይመረጣል።
- **በተቃርቦ መስክ BA**: ኦሊም በያሐድ።
- **ሁለቱም?** የተለመደ ጥምረት።
`,
    },
  },

  // 4. Tene Briut vs Klalit (community health vs HMO)
  {
    slug: "tene-briut-vs-clalit",
    category: "health",
    title: {
      he: "טנא בריאות מול קופת-חולים — בריאות קהילתית מול HMO",
      en: "Tene Briut vs HMO — Community Health vs Standard Care",
      am: "ቴኔ ብሪዩት በተቃራኒ HMO",
    },
    shortDescription: {
      he: 'טנא בריאות = ארגון-בריאות-קהילתי משלים. קופ"ח = ביטוח-בריאות חוקי. שניהם נחוצים.',
      en: "Tene Briut = supplementary community-health organization. HMO = legal health insurance. Both needed.",
      am: "ቴኔ ብሪዩት = ተጨማሪ የማህበረሰብ ጤና ድርጅት። HMO = ሕጋዊ የጤና ኢንሹራንስ።",
    },
    sideA: {
      name: { he: "טנא בריאות", en: "Tene Briut", am: "ቴኔ ብሪዩት" },
      link: { type: "org", slug: "tene-briut" },
      tagline: { he: "תיווך תרבותי", en: "Cultural mediation", am: "የባህል ድልድይ" },
    },
    sideB: {
      name: {
        he: 'קופ"ח (כללית/מכבי/מאוחדת/לאומית)',
        en: "HMO (Clalit/Maccabi/Meuhedet/Leumit)",
        am: "HMO",
      },
      tagline: {
        he: "ביטוח-בריאות חובה",
        en: "Mandatory health insurance",
        am: "የግዴታ የጤና ኢንሹራንስ",
      },
    },
    criteria: [
      {
        label: { he: "סוג-שירות", en: "Service type", am: "የአገልግሎት ዓይነት" },
        a: {
          he: "תיווך-תרבותי + מתאמי-בריאות",
          en: "Cultural mediation + health navigators",
          am: "የባህል ድልድይ",
        },
        b: {
          he: "רפואה-ראשונית + תרופות + אשפוז",
          en: "Primary care + meds + hospitalization",
          am: "ቀዳሚ እንክብካቤ + መድኃኒት",
        },
      },
      {
        label: { he: "סטטוס-משפטי", en: "Legal status", am: "ሕጋዊ ሁኔታ" },
        a: { he: "ארגון-לא-ממשלתי", en: "NGO", am: "መንግስታዊ ያልሆነ" },
        b: { he: "ביטוח-חובה לפי חוק", en: "Mandatory by law", am: "በሕግ ግዴታ" },
      },
      {
        label: { he: "עלות-למטופל", en: "Cost to patient", am: "ለታካሚ ወጪ" },
        a: { he: "חינם", en: "Free", am: "ነጻ" },
        b: { he: "₪32-150 השתתפות", en: "₪32-150 co-pay", am: "₪32-150 ድርሻ" },
      },
      {
        label: { he: "שפת-תקשורת", en: "Communication language", am: "የመግባቢያ ቋንቋ" },
        a: {
          he: "אמהרית/תיגרינית/עברית",
          en: "Amharic/Tigrinya/Hebrew",
          am: "አማርኛ/ትግርኛ/ዕብራይስጥ",
        },
        b: {
          he: "עברית בעיקר; חלק מהקופות יש שירות-תרגום",
          en: "Hebrew mainly; some HMOs offer translation",
          am: "ዕብራይስጥ በዋነኛ",
        },
      },
      {
        label: { he: "ידע-תרבותי", en: "Cultural knowledge", am: "የባህል እውቀት" },
        a: { he: "מומחים בקהילה", en: "Community experts", am: "የማህበረሰብ ባለሙያዎች" },
        b: { he: "תלוי-מטפל", en: "Provider-dependent", am: "በአቅራቢ ይወሰናል" },
      },
      {
        label: { he: "כיסוי-גיאוגרפי", en: "Geographic coverage", am: "ጂኦግራፊካዊ ሽፋን" },
        a: { he: "6 סניפים-מרכזיים", en: "6 main branches", am: "6 ዋና ቅርንጫፎች" },
        b: { he: "כל הארץ", en: "Nationwide", am: "በመላ ሀገሪቱ" },
      },
    ],
    relatedRights: ["chronic-disease-prevention", "medical-translation"],
    relatedTerms: ["tene-briut", "beta-israel"],
    relatedOrgs: ["tene-briut"],
    bodies: {
      he: `## אין מי "מנצח" — שניהם חיוניים

קופת-חולים = ביטוח-בריאות חובה לפי חוק (כל אזרח חייב חברוּת באחת). טנא בריאות = שכבה משלימה לתיווך-תרבותי. שניהם משתפים-פעולה.

## איך משתמשים בשניהם?

1. **רגילה**: כל האזרחים חברים בקופ"ח (כללית, מכבי, מאוחדת, או לאומית).
2. **כשנדרש תיווך-תרבותי**: בקש/י ממתאם/ת טנא-בריאות ללוות אותך בפגישה. השירות חינמי לזכאים.
3. **כשמדובר במחלות-כרוניות שכיחות בקהילה** (סוכרת, יל"ד): טנא בריאות מבצעת אבחון-מוקדם בקהילה ⇒ שיתוף-פעולה עם הקופ"ח שלך.
4. **לבעיות-מורכבות**: בקש/י הפניה דרך קופ"ח + מתאם/ת טנא-בריאות יחד.

## לעולם אל תעדיפו זה על-זה

לא תרצו "להחליף" קופ"ח לטנא בריאות — היא לא נותנת תרופות, אשפוז, או רפואה-ראשונית בעצמה.
`,
      en: `## Neither "wins" — both are essential

HMO = legally mandatory health insurance (every citizen must be a member). Tene Briut = supplementary cultural-mediation layer. They cooperate.

## How to use both

1. **Standard**: all citizens are HMO members (Clalit, Maccabi, Meuhedet, or Leumit).
2. **When cultural mediation is needed**: request a Tene Briut navigator to accompany you. Free for eligible.
3. **For chronic diseases common in the community** (diabetes, hypertension): Tene Briut runs community-level early detection ⇒ cooperates with your HMO.
4. **For complex issues**: request HMO referral + Tene Briut navigator together.

## Never replace one with the other

Tene Briut doesn't dispense meds, hospitalize, or provide primary care.
`,
      am: `## ሁለቱም አስፈላጊ ናቸው

HMO = ሕጋዊ ግዴታ። ቴኔ ብሪዩት = ተጨማሪ የባህል ድልድይ።

## ሁለቱንም መጠቀም

1. **መደበኛ**: ሁሉም ዜጎች የHMO አባል ናቸው።
2. **የባህል ድልድይ ሲፈልጉ**: የቴኔ ብሪዩት አማካሪ ይጠይቁ።
3. **ለማህበረሰብ የተለመዱ በሽታዎች**: ቴኔ ብሪዩት ቀደም ብሎ ይለያል።

ማንም በሌላው አይተካም።
`,
    },
  },

  // 5. Tebeka vs Bituach Leumi (rights claims)
  {
    slug: "tebeka-vs-bituach-leumi",
    category: "legal",
    title: {
      he: "טבקה מול ביטוח לאומי — תביעות זכויות",
      en: "Tebeka vs National Insurance — Rights Claims",
      am: "ጠበቃ በተቃራኒ ብሔራዊ ኢንሹራንስ",
    },
    shortDescription: {
      he: "ביטוח לאומי = הגוף שמחליט. טבקה = הגוף שעוזר לערער. שני שלבים שונים בתהליך.",
      en: "National Insurance = the body that decides. Tebeka = the body that helps appeal. Two stages of one process.",
      am: "ብሔራዊ ኢንሹራንስ = የሚወስነው አካል። ጠበቃ = ይግባኝ የሚረዳ።",
    },
    sideA: {
      name: { he: "טבקה", en: "Tebeka", am: "ጠበቃ" },
      link: { type: "org", slug: "tebeka" },
      tagline: {
        he: "סיוע משפטי-קהילתי",
        en: "Community legal aid",
        am: "የማህበረሰብ ሕጋዊ እርዳታ",
      },
    },
    sideB: {
      name: {
        he: "ביטוח לאומי",
        en: "National Insurance Institute",
        am: "ብሔራዊ ኢንሹራንስ ተቋም",
      },
      tagline: { he: "מוסד ממשלתי", en: "Government institution", am: "የመንግስት ተቋም" },
    },
    criteria: [
      {
        label: { he: "תפקיד", en: "Role", am: "ሚና" },
        a: { he: "סיוע למבטח/ת", en: "Assists insured", am: "ለታካሚ ድጋፍ" },
        b: { he: "מחליט מי זכאי", en: "Decides eligibility", am: "ብቁነት ይወስናል" },
      },
      {
        label: { he: "סוג-קשר", en: "Contact type", am: "የመገናኛ ዓይነት" },
        a: { he: "מתי שיש מחלוקת", en: "When there's a dispute", am: "ውዝግብ ሲኖር" },
        b: { he: "כל פעם שמגישים בקשה", en: "Every time you file", am: "ሁልጊዜ" },
      },
      {
        label: { he: "עלות", en: "Cost", am: "ወጪ" },
        a: { he: "חינם לזכאים", en: "Free for eligible", am: "ለብቁ ነጻ" },
        b: {
          he: 'אין-עלות (קצבה משולמת ע"י ביל"ל)',
          en: "No cost (NII pays the benefit)",
          am: "ወጪ የለም",
        },
      },
      {
        label: { he: "סוגי-מקרים", en: "Case types", am: "የጉዳይ ዓይነቶች" },
        a: {
          he: "ערעורים, גזענות, אכיפה משטרתית",
          en: "Appeals, racism, police accountability",
          am: "ይግባኝ፣ ዘረኝነት",
        },
        b: {
          he: "נכות, אבטלה, סיעוד, פנסיה",
          en: "Disability, unemployment, LTC, pension",
          am: "የአካል ጉዳት፣ ሥራ አጥነት",
        },
      },
      {
        label: { he: "מחזור-זמן", en: "Cycle time", am: "የጊዜ ዑደት" },
        a: {
          he: "התחלת-פעולה תוך 1-2 שבועות",
          en: "Action starts within 1-2 weeks",
          am: "ድርጊት በ1-2 ሳምንት ይጀምራል",
        },
        b: {
          he: "החלטה תוך 3-9 חודשים",
          en: "Decision within 3-9 months",
          am: "ውሳኔ በ3-9 ወር",
        },
      },
    ],
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["tebeka"],
    relatedOrgs: ["tebeka", "iaej"],
    bodies: {
      he: `## למה זו "השוואה" של דברים שונים

זה לא באמת השוואה — זו הבהרה של תפקידים. אנשים מהקהילה לפעמים מבלבלים: "טבקה החליטו שלא מגיע לי קצבה". לא. **ביטוח לאומי החליט.** **טבקה תעזור לערער.**

## רצף-עבודה נכון

1. הגישו בקשה ל-ביטוח לאומי (קצבת-נכות, אבטלה, וכו').
2. אם נדחיתם או אחוז-נכות נמוך מהמצופה — פנו לטבקה לערעור.
3. טבקה תייצג אתכם בועדה רפואית או בערעור-משפטי. **שיעור-זכייה גבוה יותר עם ייצוג.**

## מה הם **לא**

- טבקה לא משלמת קצבה. ביל"ל משלם.
- ביל"ל לא נותן ייצוג-משפטי. טבקה נותן.
- שניהם צריך לדעת — אבל לזכור איזה תפקיד לכל אחד.
`,
      en: `## Why this is "comparing" different things

It's not really a comparison — it's a clarification of roles. Community members sometimes confuse: "Tebeka decided I'm not eligible." No. **National Insurance decided.** **Tebeka helps appeal.**

## Correct workflow

1. File with National Insurance (disability, unemployment, etc.).
2. If denied or disability % lower than expected — contact Tebeka to appeal.
3. Tebeka will represent you at the medical committee or legal appeal. **Higher win rate with representation.**

## What they're **not**

- Tebeka doesn't pay benefits. NII does.
- NII doesn't provide legal representation. Tebeka does.
- Know both — but remember each role.
`,
      am: `## ይህ የተለያዩ ነገሮች "ንጽጽር" ለምንድ

ይህ በእውነቱ ንጽጽር አይደለም። የማህበረሰብ አባላት አንዳንድ ጊዜ ይደባለቃሉ: "ጠበቃ ብቁ አይደለሁም ብለው ወሰኑ።" አይደለም። **ብሔራዊ ኢንሹራንስ ወሰነ።**

## ትክክለኛ የሥራ ሂደት

1. ለብሔራዊ ኢንሹራንስ ያመልክቱ።
2. ከተከለከሉ — ለይግባኝ ጠበቃን ያግኙ።
3. ጠበቃ በሕክምና ኮሚቴ ወይም በፍርድ ቤት ይወክላል።
`,
    },
  },

  // 6. Klita-basket vs Misrad-haaliyah grant
  {
    slug: "klita-basket-vs-aliyah-grant",
    category: "absorption",
    title: {
      he: "סל קליטה מול מענק משרד-העלייה — שתי דרכי-עזרה לעולה חדש",
      en: "Klita Basket vs Aliyah Grant — Two Tracks for New Olim",
      am: "የክሊታ ቅርጫት በተቃራኒ የዐሊያህ ስጦታ",
    },
    shortDescription: {
      he: "סל-קליטה = תשלום בנתב\"ג + השלמה + 6 תשלומים חודשיים. מענק משרד העלייה = תשלום-חד-פעמי + סיוע במצבים חריגים.",
      en: "Klita basket = airport payment + top-up + 6 monthly payments. Aliyah grant = one-time payment + help in special cases.",
      am: "የክሊታ ቅርጫት = የአየር ማረፊያ ክፍያ + ማሟያ + 6 ወርሃዊ ክፍያዎች።",
    },
    sideA: {
      name: { he: "סל-קליטה", en: "Klita Basket", am: "የክሊታ ቅርጫት" },
      link: { type: "right", slug: "klita-basket" },
      tagline: { he: "תשלום-חודשי", en: "Monthly payment", am: "ወርሃዊ ክፍያ" },
    },
    sideB: {
      name: {
        he: "מענק-משרד-העלייה",
        en: "Aliyah Ministry Grant",
        am: "የዐሊያህ ሚኒስቴር ስጦታ",
      },
      tagline: { he: "תשלום-חד-פעמי", en: "One-time payment", am: "የአንድ ጊዜ ክፍያ" },
    },
    criteria: [
      {
        label: { he: "סוג-תשלום", en: "Payment type", am: "የክፍያ ዓይነት" },
        // TED-148: the ministry's own table is airport card + bank top-up +
        // 6 monthly payments, not 12 monthly payments.
        a: {
          he: "נתב\"ג + השלמה + 6 תשלומים חודשיים",
          en: "Airport + top-up + 6 monthly payments",
          am: "አየር ማረፊያ + ማሟያ + 6 ወርሃዊ ክፍያዎች",
        },
        b: { he: "תשלום-חד-פעמי", en: "One-time payment", am: "የአንድ ጊዜ ክፍያ" },
      },
      {
        label: { he: "סכום-כולל", en: "Total amount", am: "ጠቅላላ መጠን" },
        // TED-148: exact totals from the ministry's 2026 table (checked
        // 2026-08-31) rather than a rounded band.
        a: {
          he: "₪21,694 (יחיד) — ₪41,359 (זוג), לוח 2026",
          en: "₪21,694 (single) — ₪41,359 (couple), 2026 table",
          am: "₪21,694 (ነጠላ) — ₪41,359 (ጥንዶች)",
        },
        b: { he: "₪3,000-7,000", en: "₪3,000-7,000", am: "₪3,000-7,000" },
        winner: "a",
      },
      {
        label: { he: "אוכלוסיית-יעד", en: "Eligible", am: "ብቁ" },
        a: {
          he: "כל עולה זכאי — התשלום הראשון כבר בנתב\"ג",
          en: "Every eligible oleh — the first payment lands at the airport",
          am: "ብቁ የሆነ እያንዳንዱ ኦሌ — የመጀመሪያው ክፍያ በአየር ማረፊያ",
        },
        b: {
          he: "מצבי-קליטה חריגים (אם משפחה ללא הורה, וכו')",
          en: "Special situations (single parent, etc.)",
          am: "ልዩ ሁኔታዎች",
        },
      },
      {
        label: { he: "תקופת-זכאות", en: "Eligibility period", am: "የብቁነት ጊዜ" },
        // TED-148: the claim window is one year from receiving oleh status;
        // the payments themselves run over six months.
        a: {
          he: "לתבוע בתוך שנה; 6 חודשי תשלום",
          en: "Claim within a year; 6 months of payments",
          am: "በአንድ ዓመት ውስጥ ይጠይቁ፤ 6 ወር ክፍያ",
        },
        b: { he: "10 שנות-קליטה", en: "10 years post-aliyah", am: "10 ዓመታት" },
      },
      {
        label: {
          he: "אפשר לקבל את שניהם?",
          en: "Can receive both?",
          am: "ሁለቱንም መቀበል ይቻላል?",
        },
        a: { he: "כן", en: "Yes", am: "አዎ" },
        b: { he: "כן (לא חופף)", en: "Yes (non-overlapping)", am: "አዎ (አይደራረብም)" },
        winner: "both",
      },
    ],
    relatedRights: ["klita-basket"],
    relatedTerms: ["aliyah-from-ethiopia"],
    relatedOrgs: ["iaej"],
    bodies: {
      he: `## שני התשלומים, לא תחליף זה לזה

זו לא באמת "השוואה" — שניהם זמינים. סל-קליטה הוא ה-default; מענק משרד-העלייה הוא תוספת-מקרים-מיוחדים.

## רצף-פעולה

1. **בהגעה**: התשלום הראשון בנתב"ג (כרטיס נטען), ואחריו השלמה לחשבון הבנק.
2. **6 החודשים הבאים**: 6 תשלומים חודשיים. את הסל יש לתבוע בתוך שנה מקבלת מעמד עולה.
3. **בכל מצב-חריג** (אם משפחה ללא הורה, מקרה-בריאות, אובדן-עבודה): פנו ל-משרד-העלייה למענק משרד-העלייה.

## אל תחמיצו

מענק משרד-העלייה ניתן לבקש עד 10 שנים אחרי עלייה. הרבה משפחות לא יודעות עליו.
`,
      en: `## Both, not either-or

Not really a "comparison" — both are available. Klita basket is the default; the aliyah grant is a special-case supplement.

## Sequence

1. **On arrival**: the first payment at the airport (prepaid card), then a top-up to the bank account.
2. **The next 6 months**: 6 monthly payments. The basket must be claimed within a year of receiving oleh status.
3. **In any special situation** (single parent, health, job loss): contact the ministry for the aliyah grant.

## Don't miss

The aliyah grant can be requested up to 10 years after aliyah. Many families don't know about it.
`,
      am: `## ሁለቱም፣ አንዱ ወይም ሌላው አይደለም

ይህ በእውነቱ ንጽጽር አይደለም — ሁለቱም አሉ።

## ቅደም ተከተል

1. ከስደት በኋላ ወር 1-3: ምዝገባ።
2. ወር 4-15: 12 ወርሃዊ ክፍያዎች።
3. በልዩ ሁኔታ: ለስጦታ ወደ ሚኒስቴር።
`,
    },
  },

  // 7. Community mortgage vs first-home grant
  {
    slug: "community-mortgage-vs-first-home-grant",
    category: "housing",
    title: {
      he: "המשכנתא הקהילתית מול מענק-דירה-ראשונה",
      en: "Community Mortgage vs First-Home Grant",
      am: "የማህበረሰብ ብድር በተቃራኒ የመጀመሪያ ቤት ስጦታ",
    },
    shortDescription: {
      he: "המשכנתא הקהילתית = הלוואת-מדינה ל-25 שנה. מענק-דירה-ראשונה = הנחה ב-מס-רכישה למי שקונה ראשונה.",
      en: "Community mortgage = 25-year state loan. First-home grant = purchase-tax discount for first-time buyers.",
      am: "የማህበረሰብ ብድር = የ25 ዓመት የመንግስት ብድር።",
    },
    sideA: {
      name: { he: "המשכנתא הקהילתית", en: "Community Mortgage", am: "የማህበረሰብ ብድር" },
      link: { type: "right", slug: "600k-mortgage" },
      tagline: {
        // Spelled out in Hebrew — "₪600K" bidi-scrambled to "600K, 25₪" in
        // RTL context (TED-128).
        he: "600 אלף ₪, ל-25 שנה",
        en: "₪600K, 25 years",
        am: "600 ሺህ ₪፣ ለ25 ዓመት",
      },
    },
    sideB: {
      name: { he: "מענק דירה-ראשונה", en: "First-Home Grant", am: "የመጀመሪያ ቤት ስጦታ" },
      tagline: { he: "הנחה ב-מס-רכישה", en: "Purchase-tax discount", am: "የግዢ ግብር ቅናሽ" },
    },
    criteria: [
      {
        label: { he: "סוג-עזרה", en: "Aid type", am: "የእርዳታ ዓይነት" },
        a: { he: "הלוואה ארוכת-טווח", en: "Long-term loan", am: "የረዥም ጊዜ ብድር" },
        b: { he: "הנחה במס", en: "Tax discount", am: "የግብር ቅናሽ" },
      },
      {
        label: { he: "סכום", en: "Amount", am: "መጠን" },
        a: { he: "₪600,000", en: "₪600,000", am: "₪600,000" },
        b: {
          he: "5%-7% ערך-הנכס בחיסכון מ-מס",
          en: "5%-7% of property value in tax savings",
          am: "5%-7%",
        },
      },
      {
        label: { he: "אופי-תשלום", en: "Payment", am: "ክፍያ" },
        a: {
          he: "0% ריבית 10 שנים, 2% 15 שנים",
          en: "0% for 10 years, 2% for 15 years",
          am: "0% ለ10 ዓመታት፣ 2% ለ15 ዓመታት",
        },
        b: {
          he: "ללא תשלום (חוסך-מס בעת-הרכישה)",
          en: "No payment (saves at purchase)",
          am: "ክፍያ የለም",
        },
      },
      {
        label: { he: "אוכלוסיית-יעד", en: "Eligible", am: "ብቁ" },
        a: {
          he: "יוצאי אתיופיה בלבד",
          en: "Ethiopian-Israelis only",
          am: "የኢትዮጵያ-እስራኤላውያን ብቻ",
        },
        b: {
          he: "כל ישראלי הקונה ראשונה",
          en: "Any Israeli first-time buyer",
          am: "ማንኛውም የእስራኤል የመጀመሪያ ጊዜ ገዢ",
        },
      },
      {
        label: { he: "תהליך-קבלה", en: "Approval process", am: "የማጽደቅ ሂደት" },
        a: {
          he: "הגרלה שנתית (~200 זוכים)",
          en: "Annual lottery (~200 winners)",
          am: "ዓመታዊ ዕጣ",
        },
        b: { he: "אוטומטי בעת-רכישה", en: "Automatic at purchase", am: "ራሱ-ሰራሽ" },
        winner: "b",
      },
      {
        label: { he: "אפשר לקבל את שניהם?", en: "Both?", am: "ሁለቱም?" },
        a: { he: "כן", en: "Yes", am: "አዎ" },
        b: { he: "כן", en: "Yes", am: "አዎ" },
        winner: "both",
      },
    ],
    relatedRights: ["600k-mortgage"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: [],
    bodies: {
      he: `## אופן-החיים שלך — שניהם זה אם זה

קונים דירה? מגיעות שתיהן. ה-משכנתא הקהילתית = ההלוואה. מענק-דירה-ראשונה = הנחה ב-מס-רכישה. שניהם פעילים על אותה עסקה.

## חישוב-דוגמה

דירה ב-₪1.2M:
- בלי תכניות: ₪240,000 הון-עצמי + הלוואה ב-₪960,000 ב-3% ⇒ החזר חודשי ~₪4,500.
- עם משכנתא קהילתית בלבד: ₪240,000 הון-עצמי + ₪600,000 ב-0%/2% + ₪360,000 משלים ב-3% ⇒ החזר חודשי ~₪3,200.
- עם שתיהן: גם חיסכון של ~₪84,000 במס-רכישה, מקטין את ההון-העצמי הנדרש.

## תכנית-פעולה

1. **בדקו זכאות למשכנתא הקהילתית** — [מחשבון](/he/calculator/mortgage-ethiopian-immigrants).
2. **רישום להגרלה השנתית** — בנק-לאומי / דיסקונט / איגוד.
3. **כשבחרתם דירה** — בקשו מענק-דירה-ראשונה אוטומטית מ-עורך הדין.
4. **חתימת חוזה** עם שתי-העזרות בו-זמנית.
`,
      en: `## Your life — both, not either

Buying a home? Both apply. Community mortgage = the loan. First-home grant = purchase-tax discount. Both run on the same transaction.

## Example calc

₪1.2M apartment:
- No programs: ₪240K equity + ₪960K loan @ 3% ⇒ ~₪4,500/mo.
- Community mortgage only: ₪240K equity + ₪600K @ 0%/2% + ₪360K supplementary @ 3% ⇒ ~₪3,200/mo.
- With both: also ~₪84K savings on purchase tax, reducing required equity.

## Action plan

1. **Check eligibility for community mortgage** — [calculator](/en/calculator/mortgage-ethiopian-immigrants).
2. **Register for annual lottery** — Leumi/Discount/Igud.
3. **When you pick the apartment** — request first-home grant from your lawyer automatically.
4. **Sign contract** with both aids in place.
`,
      am: `## ሁለቱም፣ አንዱ ወይም ሌላው አይደለም

ቤት እየገዙ ነው? ሁለቱም ተገቢ።

## የድርጊት እቅድ

1. ለማህበረሰብ ብድር ብቁነት ያረጋግጡ።
2. ለዓመታዊ ዕጣ ይመዝገቡ።
3. የመጀመሪያ ቤት ስጦታ ከጠበቃዎ ይጠይቁ።
`,
    },
  },

  // 8. Falash-Mura absorption vs Klita-basket
  {
    slug: "falash-mura-absorption-vs-klita-basket",
    category: "absorption",
    title: {
      he: "מסלול-קליטה ייעודי לפלשמורה מול סל-קליטה רגיל",
      en: "Falash-Mura Track vs Standard Klita Basket",
      am: "የፋላሽ ሙራ መንገድ በተቃራኒ መደበኛ የክሊታ ቅርጫት",
    },
    shortDescription: {
      he: "פלשמורה מקבלים את שני המסלולים: קליטה רגילה + ליווי-קהילתי-ייעודי במרכזים. מי לא?",
      en: "Falash Mura receive both: standard klita + dedicated community-track at centers. Others?",
      am: "ፋላሽ ሙራ ሁለቱም: መደበኛ ክሊታ + የተወሰነ የማህበረሰብ መንገድ።",
    },
    sideA: {
      name: { he: "מסלול קליטה לפלשמורה", en: "Falash-Mura Track", am: "የፋላሽ ሙራ መንገድ" },
      link: { type: "right", slug: "falash-mura-direct-absorption" },
      tagline: {
        he: "ליווי-קהילתי במרכזים",
        en: "Center-based community accompaniment",
        am: "በማዕከላት ላይ የተመሰረተ",
      },
    },
    sideB: {
      name: { he: "סל-קליטה סטנדרטי", en: "Standard Klita Basket", am: "መደበኛ የክሊታ ቅርጫት" },
      link: { type: "right", slug: "klita-basket" },
      tagline: {
        he: "תשלום-חודשי לכל עולה",
        en: "Monthly payment for every immigrant",
        am: "ወርሃዊ ክፍያ",
      },
    },
    criteria: [
      {
        label: { he: "לקבלה", en: "Eligibility", am: "ብቁነት" },
        a: {
          he: "פלשמורה (אחרי גיור)",
          en: "Falash Mura (post-conversion)",
          am: "ፋላሽ ሙራ (ከመለወጥ በኋላ)",
        },
        b: { he: "כל עולה-חדש", en: "Every new immigrant", am: "ሁሉም አዲስ ስደተኛ" },
      },
      {
        label: { he: "סוג-עזרה", en: "Aid type", am: "የእርዳታ ዓይነት" },
        a: {
          he: "ליווי-מקצועי + שיכון-ראשון + שירותי-קהילה",
          en: "Professional accompaniment + initial housing + community services",
          am: "ሙያዊ አጃቢነት + የመጀመሪያ መኖሪያ",
        },
        b: { he: "תשלום-חודשי בלבד", en: "Monthly payment only", am: "ወርሃዊ ክፍያ ብቻ" },
      },
      {
        label: { he: "אורך-תקופה", en: "Duration", am: "ቆይታ" },
        a: {
          he: "12-24 חודשים במרכז-קליטה",
          en: "12-24 months in absorption center",
          am: "12-24 ወራት",
        },
        b: { he: "12 חודשים (תשלומים)", en: "12 months (payments)", am: "12 ወራት" },
      },
      {
        label: { he: "מקום", en: "Location", am: "ቦታ" },
        a: {
          he: "מרכזי-קליטה ייעודיים (מבשרת ציון, נתניה ועוד)",
          en: "Dedicated absorption centers (Mevasseret, Netanya, etc.)",
          am: "የተወሰነ ማዕከላት",
        },
        b: { he: "כל מקום בארץ", en: "Anywhere in Israel", am: "በማንኛውም ቦታ" },
      },
      {
        label: { he: "אפשר לקבל את שניהם?", en: "Both?", am: "ሁለቱም?" },
        a: { he: "כן (חוצים-משאבים)", en: "Yes (combined resources)", am: "አዎ" },
        b: { he: "כן", en: "Yes", am: "አዎ" },
        winner: "both",
      },
    ],
    relatedRights: ["falash-mura-direct-absorption", "klita-basket"],
    relatedTerms: ["falash-mura", "aliyah-from-ethiopia"],
    relatedOrgs: ["iaej"],
    bodies: {
      he: `## פלשמורה מקבלים את שני המסלולים

זה לא "אחד או השני". פלשמורה זוכים לליווי-מקצועי במרכז-קליטה ייעודי + לסל-קליטה הרגיל. הסיבה: קליטה מורכבת יותר (גיור, חוסר-מסמכים-מאתיופיה, ללא-נטוורק-בארץ).

## מי שלא פלשמורה

עולים יוצאי-אתיופיה אחרים (מבצע משה, מבצע שלמה, וכו') זכאים רק לסל-קליטה הסטנדרטי. הליווי-המקצועי מסתיים אחרי תקופת-המרכז (אם הייתם בו).

## תכנית-פעולה לפלשמורה

1. **מועד-גיור**: מסלול-גיור-מהיר ב-בית-הדין הרבני.
2. **כניסה-למרכז-קליטה**: סוכנות-יהודית מתאמת.
3. **תיק-קליטה**: יועץ-קליטה מהמרכז עוזר במלוא-הזכויות.
4. **חודש 1**: סל-קליטה מתחיל לזרום.
5. **חודש 12-24**: יציאה מהמרכז + תכנית-מעבר-לדיור-קבע.
`,
      en: `## Falash Mura get both tracks

Not "one or the other". Falash Mura receive professional accompaniment at a dedicated absorption center + the standard klita basket. The reason: more complex absorption (conversion, no Ethiopian docs, no in-country network).

## Non-Falash-Mura olim

Other Ethiopian-Israeli olim (Operation Moses, Solomon, etc.) get only the standard klita basket. Professional accompaniment ends after the center period (if you were in one).

## Action plan for Falash Mura

1. **Conversion date**: fast-track conversion at the rabbinic court.
2. **Center entry**: Jewish Agency coordinates.
3. **Absorption file**: center counselor helps with full rights.
4. **Month 1**: klita basket begins.
5. **Months 12-24**: exit from center + transition plan to permanent housing.
`,
      am: `## ፋላሽ ሙራ ሁለቱም መንገዶች ያገኛሉ

"አንዱ ወይም ሌላው" አይደለም።

## የድርጊት እቅድ ለፋላሽ ሙራ

1. የመለወጥ ቀን።
2. የመቀበያ ማዕከል መግባት።
3. ወር 1: የክሊታ ቅርጫት ይጀምራል።
4. ወር 12-24: ቋሚ መኖሪያ።
`,
    },
  },

  // 9. Sigd Jerusalem vs Netanya
  {
    slug: "sigd-jerusalem-vs-netanya",
    category: "heritage",
    title: {
      he: "סיגד בירושלים מול נתניה — איפה לחגוג?",
      en: "Sigd in Jerusalem vs Netanya — Where to Celebrate?",
      am: "ሰግድ በኢየሩሳሌም በተቃራኒ ነታንያ",
    },
    shortDescription: {
      he: "ירושלים = האירוע הלאומי המרכזי. נתניה = הפסטיבל הקהילתי-משפחתי-מקומי הגדול ביותר.",
      en: "Jerusalem = main national ceremony. Netanya = largest local family-community festival.",
      am: "ኢየሩሳሌም = ዋና ብሔራዊ ሥነ-ሥርዓት።",
    },
    sideA: {
      name: { he: "סיגד בירושלים", en: "Sigd in Jerusalem", am: "ሰግድ በኢየሩሳሌም" },
      link: { type: "glossary", slug: "sigd" },
      tagline: { he: "ארמון הנציב", en: "Armon HaNatziv promenade", am: "በአርሞን ሃናጺቭ" },
    },
    sideB: {
      name: { he: "סיגד בנתניה", en: "Sigd in Netanya", am: "ሰግድ በነታንያ" },
      tagline: { he: "פארק העירייה", en: "City park", am: "የከተማ ፓርክ" },
    },
    criteria: [
      {
        label: { he: "סטטוס", en: "Status", am: "ሁኔታ" },
        a: { he: "אירוע לאומי-רשמי", en: "Official national event", am: "ይፋዊ ብሔራዊ ክንውን" },
        b: {
          he: "אירוע-קהילתי גדול",
          en: "Major community event",
          am: "ዋነኛ የማህበረሰብ ክንውን",
        },
      },
      {
        label: { he: "משתתפים", en: "Attendance", am: "ተሳታፊዎች" },
        a: { he: "~5,000 ב-תפילה", en: "~5,000 at prayer", am: "~5,000" },
        b: { he: "~2,000-3,000", en: "~2,000-3,000", am: "~2,000-3,000" },
        winner: "a",
      },
      {
        label: { he: "אופי", en: "Character", am: "ባህሪ" },
        a: {
          he: "טקסי-מנהיגות (ראש הממשלה, נשיא, רב ראשי)",
          en: "Leadership ceremony (PM, President, Chief Rabbi)",
          am: "የመሪነት ሥነ-ሥርዓት",
        },
        b: {
          he: "אירוע-משפחתי-קהילתי, פחות פורמלי",
          en: "Family-community event, less formal",
          am: "የቤተሰብ-ማህበረሰብ ክንውን",
        },
      },
      {
        label: { he: "תפילת-קייסים", en: "Kessim prayer", am: "የቄሶች ጸሎት" },
        a: { he: "באירוע המרכזי", en: "At main event", am: "በዋናው ክንውን" },
        b: {
          he: "קבוצה גדולה של קייסים-מקומיים",
          en: "Large group of local Kessim",
          am: "ብዙ የአካባቢ ቄሶች",
        },
      },
      {
        label: { he: "קישוריות", en: "Accessibility", am: "ተደራሽነት" },
        a: {
          he: "תחבורה-ציבורית מלאה + הסעות מאזורים",
          en: "Full transit + shuttles from regions",
          am: "ሙሉ ትራንስፖርት",
        },
        b: { he: "תחבורה מקומית", en: "Local transit", am: "የአካባቢ ትራንስፖርት" },
      },
      {
        label: { he: "מתאים ל-...", en: "Best for...", am: "ለ... ምርጥ" },
        a: {
          he: "חוויה לאומית, צילומי-עיתונות, מפגש בין-דורי",
          en: "National experience, press photos, intergenerational meeting",
          am: "ብሔራዊ ልምድ",
        },
        b: {
          he: "אירועי-משפחה, חברים, אוכל-מקומי",
          en: "Family events, friends, local food",
          am: "የቤተሰብ ክንውኖች",
        },
      },
    ],
    relatedRights: ["sigd-funding"],
    relatedTerms: ["sigd", "kessim", "beta-israel"],
    relatedOrgs: ["iaej"],
    bodies: {
      he: `## אין "טוב יותר" — חוויה שונה

ירושלים = העלייה-לאלפי-עיניים, מפגש-לאומי. נתניה = הקהילה שלך, אוכל-אמהרי, הילדים מסתובבים.

## איך לבחור?

- **שנה ראשונה בארץ או חוויה לאומית**: ירושלים.
- **רוצים פשוטות, מפגש-משפחה, פחות-פורמלי**: נתניה.
- **גרים בנגב או בצפון**: ערים אחרות (באר-שבע, חיפה, רחובות, ראשון לציון) מקיימות אירועים-מקומיים יפים.

## טיפ-מעשי

חודש לפני הסיגד: בדקו את לוח-הזמנים של עיריית ירושלים ושל נתניה — לעיתים יש הסעות-קהילתיות חינמיות מ-נתניה ל-ירושלים.

## רב-עירונית

ירושלים, נתניה, רחובות, ראשון לציון, באר שבע, חיפה — כל אחד עם אופי שונה. שווה לחוות יותר מאחת לאורך השנים.
`,
      en: `## Neither "wins" — different experiences

Jerusalem = pilgrimage scale, national gathering. Netanya = your community, Ethiopian food, kids running around.

## How to choose

- **First year in Israel or seeking a national experience**: Jerusalem.
- **Want simplicity, family meeting, less formal**: Netanya.
- **Live in the Negev or north**: other cities (Beersheba, Haifa, Rehovot, Rishon LeZion) hold lovely local events.

## Tip

Month before Sigd: check Jerusalem and Netanya municipal schedules — community shuttles often run free Netanya → Jerusalem.

## Multi-city

Jerusalem, Netanya, Rehovot, Rishon LeZion, Beersheba, Haifa — each with different character. Worth experiencing more than one over years.
`,
      am: `## "የተሻለ" የለም — የተለያዩ ልምዶች

ኢየሩሳሌም = ብሔራዊ መሰብሰቢያ። ነታንያ = የቤተሰብ ክንውን።

## እንዴት ለመምረጥ

- **በእስራኤል የመጀመሪያ ዓመት**: ኢየሩሳሌም።
- **ቀላልነት፣ የቤተሰብ ስብሰባ**: ነታንያ።
- **በነጎቭ ወይም በሰሜን**: ሌሎች ከተሞች (ቤርሼባ፣ ሐይፋ፣ ሬሆቮት፣ ሪሾን ለጽዮን) የሚያምሩ ክንውኖች ያካሂዳሉ።
`,
    },
  },

  // 10. Hila vs Fidel
  {
    slug: "hila-vs-fidel",
    category: "education",
    title: {
      he: 'חיל"ה מול פידל — חינוך-יסודי בקהילה',
      en: "Hila vs Fidel — Community K-6 Education",
      am: "ሂላ በተቃራኒ ፊደል",
    },
    shortDescription: {
      he: 'שני ארגוני-חינוך-בית-ספריים. חיל"ה מתמקדת בתגבור-לימודי בכיתות; פידל מתמקדת בהורים.',
      en: "Two school-based education organizations. Hila focuses on in-class tutoring; Fidel focuses on parents.",
      am: "ሁለት የትምህርት ቤት ድርጅቶች።",
    },
    sideA: {
      name: { he: 'חיל"ה', en: "Hila", am: "ሂላ" },
      link: { type: "org", slug: "hila" },
      tagline: {
        he: "תגבור-לימודי בתוך-כיתה",
        en: "In-class academic tutoring",
        am: "በክፍል ውስጥ የአካዳሚክ ድጋፍ",
      },
    },
    sideB: {
      name: { he: "פידל", en: "Fidel", am: "ፊደል" },
      link: { type: "org", slug: "fidel" },
      tagline: {
        he: "סנגור-הורים + תכניות-בית-ספר",
        en: "Parent advocacy + school programs",
        am: "የወላጅ ጥብቅና",
      },
    },
    criteria: [
      {
        label: { he: "מודל-עבודה", en: "Work model", am: "የሥራ ሞዴል" },
        a: {
          he: "מורים-מתאמים בתוך-כיתה",
          en: "Teacher-coordinators in classrooms",
          am: "በክፍል ውስጥ መምህራን",
        },
        b: {
          he: "סדנאות-הורים + ייצוג",
          en: "Parent workshops + advocacy",
          am: "የወላጅ አውደ ጥናቶች",
        },
      },
      {
        label: { he: "טווח-גילים", en: "Age range", am: "የእድሜ ክልል" },
        a: {
          he: "כיתות א'-י\"ב (התמקדות א'-ו')",
          en: "Grades 1-12 (focus 1-6)",
          am: "1-12ኛ ክፍል",
        },
        b: { he: "כיתות א'-י\"ב", en: "Grades 1-12", am: "1-12ኛ ክፍል" },
      },
      {
        label: { he: "אוכלוסיית-יעד", en: "Target", am: "ዒላማ" },
        a: { he: "תלמידים", en: "Students", am: "ተማሪዎች" },
        b: { he: "הורים + תלמידים", en: "Parents + students", am: "ወላጆች + ተማሪዎች" },
      },
      {
        label: { he: "צוות-טבעי", en: "Natural staff", am: "የተፈጥሮ ሰራተኞች" },
        a: {
          he: "מורים-בודדים בתוך בית-ספר",
          en: "Embedded teachers",
          am: "የተወሰኑ መምህራን",
        },
        b: {
          he: "מתאמי-הורים + פעילי-קהילה",
          en: "Parent coordinators + community activists",
          am: "የወላጅ አስተባባሪዎች",
        },
      },
      {
        label: { he: "תוצאת-יעד", en: "Outcome", am: "ውጤት" },
        a: {
          he: "שיפור-ציונים, צמצום-נשירה",
          en: "Better grades, less dropout",
          am: "የተሻለ ውጤት",
        },
        b: {
          he: "מעורבות-הורים, ייצוג-קהילה",
          en: "Parent engagement, community representation",
          am: "የወላጅ ተሳትፎ",
        },
      },
    ],
    relatedRights: ["matriculation-grant"],
    relatedTerms: [],
    relatedOrgs: ["fidel", "hila", "enp"],
    bodies: {
      he: `## משלימים — לא תחליף זה לזה

חיל"ה ופידל לא בעלי תפקיד-זהה. הילד צריך גם תגבור-לימודי, וגם הורים-מעורבים. שני הארגונים פועלים בכמה בתי-ספר במקביל.

## איך לבחור?

- **לעבודה-עם-הילד שלכם**: חיל"ה — מורים-מתאמים בתוך-כיתה.
- **לעבודה-איתכם בתפקיד-הורי**: פידל — סדנאות, ייצוג, נטוורקינג.
- **שתיהן יחד?** מומלץ — בתי-ספר רבים שותפים-לשני-הארגונים.

## תכנית-פעולה

1. שאלו ב-בית-הספר אם יש מתאם/ת חיל"ה.
2. הצטרפו לוועד-הורים פידלי (אם קיים).
3. אם בית-הספר לא שותף ל-אף אחד — דברו עם המנהל/ת על הצטרפות.
`,
      en: `## Complementary — not substitutes

Hila and Fidel don't have identical roles. A child needs both in-class tutoring and engaged parents. Both organizations operate in many schools simultaneously.

## How to choose

- **For your child's work**: Hila — teacher-coordinators in class.
- **For your role as a parent**: Fidel — workshops, advocacy, networking.
- **Both?** Recommended — many schools partner with both.

## Action plan

1. Ask the school if there's a Hila coordinator.
2. Join Fidel's parent committee (if it exists).
3. If the school is in neither — talk to the principal about joining.
`,
      am: `## ተደጋጋፊ ናቸው

ሂላ እና ፊደል ተመሳሳይ ሚና የላቸውም።

## እንዴት ለመምረጥ

- **ለልጃችሁ ሥራ**: ሂላ።
- **ለወላጅ ሚናችሁ**: ፊደል።
- **ሁለቱም?** ይመከራል።
`,
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

export function getComparisonBodyForLocale(
  entry: ComparisonEntry,
  locale: Locale,
): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
