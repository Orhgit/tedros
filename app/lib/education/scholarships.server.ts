// Scholarships seed (RIN-504 / Phase 5 Education Hub Wave 1).
//
// 12 scholarships authored in HE/EN/AM. Captures high-intent
// "{scholarship name}", "מלגה לבני קהילת יוצאי אתיופיה", "Ethiopian
// Israeli scholarship" queries and routes applicants to providers.
//
// HE source-of-truth (CLAUDE.md). Same render-from-seed pattern as
// `lib/orgs/orgs.server.ts` — no DB needed in V1.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { ScholarshipLevel } from "./categories";

export type { ScholarshipLevel } from "./categories";

export interface ScholarshipEntry {
  slug: string;
  level: ScholarshipLevel;
  /** Slug of the providing organization (FK to /lib/orgs). */
  providerOrgSlug: string;
  /** Display name in 3 locales. */
  name: Translatable;
  /** ~140-char summary used in cards + meta description. */
  shortDescription: Translatable;
  /** ILS — minimum award per recipient per year. 0 = no monetary award (mentorship-only). */
  amountMinIls: number;
  amountMaxIls: number;
  /** Free-text amount note when range alone is misleading (e.g. "tuition + stipend"). */
  amountNote: Translatable;
  /** "rolling" or ISO date string of the next deadline. */
  deadline: "rolling" | string;
  /** External application URL — opens in new tab. */
  applicationUrl: string;
  /** Tags for cross-linking + filtering. */
  tags: string[];
  /** True when explicitly targeted at the Ethiopian-Israeli community. */
  communityPriority: boolean;
  /** Slugs of related scholarships in `see also`. */
  relatedScholarships: string[];
  /** Slugs of related rights (under `/rights/{slug}`). */
  relatedRights: string[];
  bodies: Record<Locale, string>;
}

export const SCHOLARSHIPS: ScholarshipEntry[] = [
  // 1. ISEF Fellowship
  {
    slug: "isef-fellowship",
    level: "masters",
    providerOrgSlug: "isef",
    name: { he: "מלגת ISEF", en: "ISEF Fellowship", am: "የISEF ህብረት" },
    shortDescription: {
      he: "מלגות שכר לימוד ומחיה לסטודנטים יוצאי אתיופיה לתואר שני ושלישי באוניברסיטאות בישראל.",
      en: "Tuition and living-cost scholarships for Ethiopian-Israeli students in master's and PhD programs at Israeli universities.",
      am: "ለሁለተኛ ዲግሪና ለዶክትሬት ለሚማሩ የኢትዮጵያ-እስራኤል ተማሪዎች የትምህርት ክፍያና የኑሮ ወጪ ድጋፍ።",
    },
    amountMinIls: 25000,
    amountMaxIls: 70000,
    amountNote: {
      he: "שכר לימוד מלא + סטיפנדיה שנתית; משתנה לפי תכנית.",
      en: "Full tuition + annual stipend; varies by program.",
      am: "ሙሉ የትምህርት ክፍያ + ዓመታዊ የኑሮ ድጋፍ፤ እንደ ፕሮግራሙ ይለያያል።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.isef.org.il/he/apply",
    tags: ["masters", "phd", "academic", "community"],
    communityPriority: true,
    relatedScholarships: ["hesegim-undergraduate", "cogito-stem-phd"],
    relatedRights: ["academic-tuition-grant"],
    bodies: {
      he: `## למי המלגה?

- סטודנטים יוצאי אתיופיה (דור 1, 2 או 3) הלומדים לתואר שני או שלישי
- אוניברסיטה מוכרת בישראל (תל אביב, האוניברסיטה העברית, טכניון, בר-אילן, BGU, חיפה, ויצמן)
- ממוצע ציונים לפחות 80 בתואר ראשון
- מצב כלכלי המוגדר על-ידי הקרן (לא בלעדי, אבל משוקלל)

## מה כלול?

- שכר לימוד מלא לאוניברסיטה
- סטיפנדיית מחיה שנתית (~₪40,000–60,000 בהתאם לתכנית)
- ליווי אקדמי וקריירה דרך רשת בוגרי ISEF
- גישה לרשת מנטורים בכירים מהקהילה

## איך פוני?

1. הרשמה אונליין באתר ISEF
2. הגשת מסמכים אקדמיים, מכתב מוטיבציה ו-2 המלצות
3. ראיון אישי
4. תשובה תוך 4–8 שבועות

## תאריכים חשובים

- הגשה פתוחה כל השנה (rolling) — מומלץ להגיש לפחות חודשיים לפני תחילת השנה האקדמית

## ראו גם

- [קרן ע"ש איסף — ISEF](/he/orgs/isef) — הארגון המספק
- [הסגים — מלגות תואר ראשון](/he/education/scholarships/hesegim-undergraduate)
- [קוגיטו — מלגת דוקטורנטים STEM](/he/education/scholarships/cogito-stem-phd)
`,
      en: `## Who is it for?

- Ethiopian-Israeli students (1st, 2nd or 3rd generation) in master's or PhD programs
- Recognized Israeli universities (TAU, HUJI, Technion, Bar-Ilan, BGU, Haifa, Weizmann)
- Minimum 80 GPA in undergraduate degree
- Financial-need consideration (not exclusive, but weighted)

## What's included?

- Full university tuition
- Annual living stipend (~₪40,000–60,000 depending on program)
- Academic and career mentorship via the ISEF alumni network
- Access to senior community-network mentors

## How to apply

1. Online application on ISEF website
2. Submit academic transcript, statement of purpose, 2 letters of recommendation
3. Personal interview
4. Decision within 4–8 weeks

## Important dates

- Rolling admissions — apply at least 2 months before the academic year starts

## See also

- [ISEF — provider organization](/en/orgs/isef)
- [Hesegim undergraduate scholarship](/en/education/scholarships/hesegim-undergraduate)
- [Cogito STEM PhD scholarship](/en/education/scholarships/cogito-stem-phd)
`,
      am: `## ለማን ነው?

- ለሁለተኛ ዲግሪ ወይም ለዶክትሬት የሚማሩ ኢትዮጵያ-እስራኤላውያን (1ኛ፣ 2ኛ ወይም 3ኛ ትውልድ)
- በእስራኤል እውቅና ያላቸው ዩኒቨርሲቲዎች (TAU፣ HUJI፣ ቴክኒዮን፣ ባር-ኢላን፣ BGU፣ ሐይፋ፣ ዊይስማን)
- በመጀመሪያ ዲግሪ ቢያንስ 80 GPA
- የገንዘብ ፍላጎት ግምት ውስጥ ይገባል (ብቻ-ምክንያት አይደለም)

## ምን ይካተታል?

- ሙሉ የዩኒቨርሲቲ ትምህርት ክፍያ
- ዓመታዊ የኑሮ ድጋፍ (~₪40,000–60,000)
- በISEF የቀድሞ ተማሪዎች አውታረ መረብ የአካዳሚክና የስራ ምክር
- ለከፍተኛ የማህበረሰብ አማካሪዎች መዳረሻ

## እንዴት ማመልከት ይቻላል?

1. በISEF ድረ-ገጽ የመስመር ላይ ምዝገባ
2. የአካዳሚክ መግለጫ፣ የተነሳሽነት ደብዳቤ፣ 2 የውጤት ደብዳቤዎች ማስረከብ
3. የግል ቃለ-መጠይቅ
4. በ4–8 ሳምንታት ውስጥ ምላሽ

## አስፈላጊ ቀናት

- ምዝገባ ዓመቱን ሙሉ ክፍት ነው — ቢያንስ ከትምህርት ዓመት መጀመሪያ 2 ወር በፊት ማመልከት ይመከራል

## ይህንንም ይመልከቱ

- [ISEF — የሰጪው ድርጅት](/am/orgs/isef)
- [ሄሰጊም የመጀመሪያ ዲግሪ ድጋፍ](/am/education/scholarships/hesegim-undergraduate)
- [ኮጊቶ STEM ዶክትሬት ድጋፍ](/am/education/scholarships/cogito-stem-phd)
`,
    },
  },

  // 2. Hesegim Undergraduate
  {
    slug: "hesegim-undergraduate",
    level: "undergrad",
    providerOrgSlug: "hesegim",
    name: {
      he: "מלגת הסגים — תואר ראשון",
      en: "Hesegim Undergraduate Scholarship",
      am: "የሄሰጊም የመጀመሪያ ዲግሪ ድጋፍ",
    },
    shortDescription: {
      he: "מלגות תואר ראשון לבני הקהילה: שכר לימוד, סטיפנדיה ולווי אקדמי לאורך כל שנות התואר.",
      en: "Undergraduate scholarships for community members: tuition, stipend, and academic mentorship through graduation.",
      am: "ለማህበረሰቡ አባላት የመጀመሪያ ዲግሪ ድጋፍ፦ የትምህርት ክፍያ፣ የኑሮ ድጋፍና በዲግሪ ጊዜ ሁሉ የአካዳሚክ ምክር።",
    },
    amountMinIls: 15000,
    amountMaxIls: 35000,
    amountNote: {
      he: "מלגה שנתית לאורך 3–4 שנות התואר; כוללת סטיפנדיית מחיה.",
      en: "Annual scholarship for 3–4 years of the degree; includes living stipend.",
      am: "ለ3–4 ዓመታት ዲግሪ ዓመታዊ ድጋፍ፤ የኑሮ ድጋፍ ያካትታል።",
    },
    deadline: "rolling",
    applicationUrl: "https://hesegim.org.il/apply",
    tags: ["undergrad", "academic", "community", "mentorship"],
    communityPriority: true,
    relatedScholarships: ["isef-fellowship", "atidim-pre-academic"],
    relatedRights: ["academic-tuition-grant"],
    bodies: {
      he: `## למי המלגה?

- סטודנטים יוצאי אתיופיה ב-3 שנות התואר הראשון
- כל מוסד אקדמי מוכר בישראל (אוניברסיטה או מכללה אקדמית)
- בעלי הישגים אקדמיים בולטים (פסיכומטרי / בגרות מוצלחים)
- מחויבות לפעילות חברתית-קהילתית במהלך הלימודים

## מה כלול?

- מלגת לימודים שנתית של ₪15,000–₪35,000
- סטיפנדיית מחיה
- ליווי אישי של מנטור (בוגר הסגים) לאורך כל שנות התואר
- שילוב באירועי קהילת בוגרי הסגים — networking וגיוס לקריירה

## איך פוני?

1. מילוי טופס ראשוני באתר הסגים
2. הגשת מסמכים: גליון ציונים, מכתב מוטיבציה, פרטי לימודים
3. ראיון
4. בעת קבלה — חתימה על התחייבות לפעילות חברתית

## תאריכים חשובים

- פתוח כל השנה — מועדים מומלצים: יוני (לפני סמסטר א') וינואר (לפני סמסטר ב')

## ראו גם

- [הסגים — Org profile](/he/orgs/hesegim)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship) — לתואר שני/שלישי
- [Atidim — מכינה אקדמית](/he/education/scholarships/atidim-pre-academic)
`,
      en: `## Who is it for?

- Ethiopian-Israeli students in 3 years of undergraduate study
- Any recognized Israeli academic institution (university or college)
- Strong academic record (psychometric / matriculation)
- Commitment to community-social work during studies

## What's included?

- Annual scholarship of ₪15,000–₪35,000
- Living stipend
- Personal mentor (Hesegim alum) throughout the degree
- Integration into Hesegim alumni network — networking and career placement

## How to apply

1. Initial form on Hesegim website
2. Submit transcript, statement of purpose, study program details
3. Interview
4. Upon acceptance — sign commitment to community service

## Important dates

- Open year-round — recommended: June (before semester 1) and January (before semester 2)

## See also

- [Hesegim — provider org](/en/orgs/hesegim)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship) — for master's/PhD
- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
`,
      am: `## ለማን ነው?

- በ3 ዓመታት የመጀመሪያ ዲግሪ ለሚማሩ ኢትዮጵያ-እስራኤላውያን
- በእስራኤል እውቅና ባለው ማንኛውም አካዳሚክ ተቋም
- ጠንካራ የአካዳሚክ ሰነድ
- በትምህርት ጊዜ የማህበረሰብ-ማህበራዊ ስራ ቁርጠኝነት

## ምን ይካተታል?

- ዓመታዊ ድጋፍ ₪15,000–₪35,000
- የኑሮ ድጋፍ
- በዲግሪ ሁሉ የግል አማካሪ (የሄሰጊም ቀድሞ ተማሪ)
- በሄሰጊም የቀድሞ ተማሪዎች አውታረ መረብ ውስጥ ማካተት

## እንዴት ማመልከት ይቻላል?

1. በሄሰጊም ድረ-ገጽ የመጀመሪያ ቅጽ መሙላት
2. ምልክቶችን፣ የተነሳሽነት ደብዳቤና የትምህርት ፕሮግራም ዝርዝር ማስረከብ
3. ቃለ-መጠይቅ
4. ሲቀበሉ — ለማህበረሰብ አገልግሎት ቁርጠኝነት መፈረም

## አስፈላጊ ቀናት

- ዓመቱን ሙሉ ክፍት — የሚመከር፦ ሰኔ (ከ1ኛ ሴሚስተር በፊት) እና ጥር (ከ2ኛ ሴሚስተር በፊት)

## ይህንንም ይመልከቱ

- [ሄሰጊም — የሰጪው ድርጅት](/am/orgs/hesegim)
- [የISEF ህብረት](/am/education/scholarships/isef-fellowship)
- [Atidim ቅድመ-አካዳሚክ](/am/education/scholarships/atidim-pre-academic)
`,
    },
  },

  // 3. ENP Bagrut Grant
  {
    slug: "enp-bagrut-grant",
    level: "high-school",
    providerOrgSlug: "enp",
    name: {
      he: "מענק בגרות — ENP",
      en: "ENP Bagrut Grant",
      am: "የENP ባግሩት ድጋፍ",
    },
    shortDescription: {
      he: "מענק כספי לתלמידי תיכון יוצאי אתיופיה שמשלימים בגרות איכותית — חיזוק שיעור הזכאות בקהילה.",
      en: "Cash grant for Ethiopian-Israeli high-school students completing high-quality matriculation — boosting community pass rates.",
      am: "ጥራት ያለው ባግሩት ለሚያጠናቅቁ ኢትዮጵያ-እስራኤላውያን የሁለተኛ ደረጃ ተማሪዎች የገንዘብ ድጋፍ።",
    },
    amountMinIls: 3000,
    amountMaxIls: 8000,
    amountNote: {
      he: "מענק חד-פעמי בסיום הבגרות; סכום משתנה לפי הישגים.",
      en: "One-time grant on matriculation completion; amount varies with achievement.",
      am: "ባግሩት ሲጠናቀቅ የአንድ ጊዜ ድጋፍ፤ መጠን እንደ ውጤት ይለያያል።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.enp.org.il/he/apply-bagrut",
    tags: ["high-school", "community", "rights"],
    communityPriority: true,
    relatedScholarships: ["atidim-pre-academic"],
    relatedRights: ["bagrut-completion-bonus"],
    bodies: {
      he: `## למי המלגה?

- תלמידי תיכון יוצאי אתיופיה בכיתות י"א–י"ב
- מסיימים בגרות איכותית: לפחות 5 יחידות במתמטיקה או באנגלית, או יחידות מוגברות במקצוע אחר
- משוקלל אוטומטית עם תכניות ENP בית-ספר (SPACE, תגבור)

## מה כלול?

- מענק חד-פעמי של ₪3,000–₪8,000
- ייעוץ קריירה ומכינה אקדמית בחינם
- חיבור לרשת בוגרי ENP — מנטורים מתחומי הקריירה הרלוונטיים

## איך פוני?

1. הרשמה דרך הצוות החינוכי בבית הספר (אם יש שיתוף פעולה עם ENP)
2. או בקשה ישירה דרך טופס ENP
3. אישור הזכאות בעת קבלת תעודת בגרות

## תאריכים חשובים

- הגשה: עד 30 בנובמבר בשנה שאחרי קבלת הבגרות

## ראו גם

- [ENP — שותפות לאומית לקהילה](/he/orgs/enp)
- [מכינת אתידים](/he/education/scholarships/atidim-pre-academic) — צעד הבא לאחר הבגרות
- [מענק בגרות לתלמידי תיכון — ממשלתי](/he/rights/bagrut-completion-bonus)
`,
      en: `## Who is it for?

- Ethiopian-Israeli students in 11th–12th grade
- Completing high-quality matriculation: 5 units in math/English, or extended units in another subject
- Auto-eligible if enrolled in ENP school programs (SPACE, tutoring)

## What's included?

- One-time grant of ₪3,000–₪8,000
- Free career counseling and pre-academic preparation
- Connection to ENP alumni network — career mentors

## How to apply

1. Through the school's educational team (if partnered with ENP)
2. Or direct request via ENP form
3. Eligibility confirmed upon matriculation certificate receipt

## Important dates

- Apply by November 30 of the year after matriculation

## See also

- [ENP — provider organization](/en/orgs/enp)
- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
- [Bagrut completion bonus — government](/en/rights/bagrut-completion-bonus)
`,
      am: `## ለማን ነው?

- በ11ኛ–12ኛ ክፍል ላሉ ኢትዮጵያ-እስራኤላውያን
- ጥራት ያለው ባግሩት የሚያጠናቅቁ
- በENP ት/ቤት ፕሮግራም (SPACE፣ ድጋፍ ትምህርት) ላሉ ራስ-ገዝ ብቁ

## ምን ይካተታል?

- የአንድ ጊዜ ድጋፍ ₪3,000–₪8,000
- ነጻ የስራ ምክርና ቅድመ-አካዳሚክ ዝግጅት
- ለENP የቀድሞ ተማሪዎች አውታረ መረብ መገናኘት

## እንዴት ማመልከት ይቻላል?

1. በት/ቤት የትምህርት ቡድን (ከENP ጋር አጋርነት ካለ)
2. ወይም በቀጥታ በENP ቅጽ
3. የባግሩት ሰርተፊኬት ሲቀበሉ ብቁነት ያረጋግጣል

## ይህንንም ይመልከቱ

- [ENP — የሰጪው ድርጅት](/am/orgs/enp)
- [Atidim ቅድመ-አካዳሚክ](/am/education/scholarships/atidim-pre-academic)
`,
    },
  },

  // 4. Mossad Maxim Lefael
  {
    slug: "mossad-maxim-academic",
    level: "undergrad",
    providerOrgSlug: "mossad-maxim",
    name: {
      he: "מלגת מקסים לפעל",
      en: "Mossad Maxim Lefael Scholarship",
      am: "የMossad Maxim Lefael ድጋፍ",
    },
    shortDescription: {
      he: "מלגות שכר לימוד לסטודנטים מצטיינים מהקהילה במגוון תחומי לימוד באוניברסיטאות בארץ.",
      en: "Tuition scholarships for outstanding community students across study fields at Israeli universities.",
      am: "ለላቁ የማህበረሰብ ተማሪዎች በተለያዩ የጥናት ዘርፎች በእስራኤል ዩኒቨርሲቲዎች የትምህርት ክፍያ ድጋፍ።",
    },
    amountMinIls: 10000,
    amountMaxIls: 25000,
    amountNote: {
      he: "מלגת שכר לימוד שנתית; ניתן לחדש לפי הישגים.",
      en: "Annual tuition scholarship; renewable based on academic performance.",
      am: "ዓመታዊ የትምህርት ክፍያ ድጋፍ፤ በአካዳሚክ አፈጻጸም ላይ የሚታደስ።",
    },
    deadline: "rolling",
    applicationUrl: "https://maximlefael.org.il/scholarships",
    tags: ["undergrad", "academic", "community"],
    communityPriority: true,
    relatedScholarships: ["isef-fellowship", "hesegim-undergraduate"],
    relatedRights: ["academic-tuition-grant"],
    bodies: {
      he: `## למי המלגה?

- סטודנטים יוצאי אתיופיה לתואר ראשון או שני
- ממוצע גבוה (תלוי תחום) — בדרך כלל 85+
- מצב סוציו-אקונומי משוקלל

## מה כלול?

- מלגת שכר לימוד שנתית ₪10,000–₪25,000
- אפשרות חידוש בכל שנה לפי הישגים
- אירועי networking של בוגרי הקרן

## איך פוני?

1. טופס באתר הקרן
2. גליון ציונים אקדמי + מכתב מוטיבציה
3. ראיון (לעיתים)

## ראו גם

- [Mossad Maxim — Org profile](/he/orgs/mossad-maxim)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate)
`,
      en: `## Who is it for?

- Ethiopian-Israeli undergraduate or master's students
- Strong GPA (typically 85+, varies by field)
- Socio-economic factors weighted

## What's included?

- Annual tuition scholarship ₪10,000–₪25,000
- Renewable per year based on performance
- Networking events with foundation alumni

## How to apply

1. Application on foundation website
2. Academic transcript + statement of purpose
3. Interview (sometimes)

## See also

- [Mossad Maxim — provider org](/en/orgs/mossad-maxim)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
- [Hesegim Undergraduate](/en/education/scholarships/hesegim-undergraduate)
`,
      am: `## ለማን ነው?

- ለመጀመሪያ ወይም ሁለተኛ ዲግሪ የሚማሩ ኢትዮጵያ-እስራኤላውያን
- ጠንካራ GPA (በተለምዶ 85+)
- ማህበራዊ-ኢኮኖሚያዊ ሁኔታ ይመዘናል

## ምን ይካተታል?

- ዓመታዊ የትምህርት ክፍያ ድጋፍ ₪10,000–₪25,000
- በዓመት የሚታደስ
- ከፋውንዴሽን የቀድሞ ተማሪዎች ጋር የመረብ ግንኙነት

## ይህንንም ይመልከቱ

- [Mossad Maxim — የሰጪው ድርጅት](/am/orgs/mossad-maxim)
`,
    },
  },

  // 5. Atidim Pre-Academic
  {
    slug: "atidim-pre-academic",
    level: "pre-academic",
    providerOrgSlug: "atidim",
    name: {
      he: "מכינת אתידים — קדם-אקדמי",
      en: "Atidim Pre-Academic Year",
      am: "Atidim ቅድመ-አካዳሚክ ዓመት",
    },
    shortDescription: {
      he: "שנת מכינה אקדמית מסובסדת לסטודנטים מהקהילה לפני תחילת תואר ראשון בטכניון, BGU או הטכניון.",
      en: "Subsidized pre-academic year for community students before starting an undergraduate degree at Technion, BGU, or similar.",
      am: "የመጀመሪያ ዲግሪ ከመጀመሩ በፊት ለማህበረሰብ ተማሪዎች ድጎማ የተደረገበት ቅድመ-አካዳሚክ ዓመት።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "המכינה חינם לזכאים; כוללת מגורים, ארוחות וסטיפנדיית כיס.",
      en: "Free for eligible students; includes housing, meals, and pocket stipend.",
      am: "ለብቁዎች ነጻ ነው፤ መኖሪያ፣ ምግብና ኪስ ድጋፍ ያካትታል።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.atidim.org/apply-pre-academic",
    tags: ["pre-academic", "community", "academic"],
    communityPriority: true,
    relatedScholarships: ["enp-bagrut-grant", "tech-career-bootcamp-stipend"],
    relatedRights: ["academic-prep-grant"],
    bodies: {
      he: `## למי המכינה?

- בוגרי תיכון יוצאי אתיופיה (תוך שנתיים מסיום בית הספר)
- בעלי בגרות חלקית או לא מספקת לדרישות אוניברסיטה
- מעוניינים להשתלב במקצועות הנדסה / מדעים / רפואה

## מה כלול?

- שנת מכינה במוסד אקדמי שותף (אוניברסיטת בן-גוריון, הטכניון, ועוד)
- מגורים בקמפוס + 3 ארוחות ביום
- סטיפנדיית כיס שנתית
- ליווי אישי לאורך השנה
- "Soft landing" לתואר ראשון בסיומה

## איך פוני?

1. רישום באתר אתידים
2. מבחני התאמה
3. ראיון אישי
4. הזמנה למכינה לפני שנת לימודים אקדמית

## תאריכים חשובים

- הגשה: ינואר–יוני בשנה שלפני המכינה

## ראו גם

- [Atidim — Org profile](/he/orgs/atidim)
- [מענק בגרות ENP](/he/education/scholarships/enp-bagrut-grant)
- [Tech-Career bootcamp](/he/education/scholarships/tech-career-bootcamp-stipend) — מסלול חלופי לקריירה
`,
      en: `## Who is it for?

- Ethiopian-Israeli high-school graduates (within 2 years of finishing)
- Partial or insufficient matriculation for university requirements
- Interest in engineering, sciences, or medicine

## What's included?

- Pre-academic year at partner institution (BGU, Technion, others)
- Campus housing + 3 meals/day
- Annual pocket stipend
- Personal mentorship throughout the year
- "Soft landing" into an undergraduate program at year-end

## How to apply

1. Registration on Atidim website
2. Placement tests
3. Personal interview
4. Invitation to the year before academic start

## Important dates

- Apply: January–June of the year before the program

## See also

- [Atidim — provider org](/en/orgs/atidim)
- [ENP Bagrut Grant](/en/education/scholarships/enp-bagrut-grant)
- [Tech-Career bootcamp](/en/education/scholarships/tech-career-bootcamp-stipend)
`,
      am: `## ለማን ነው?

- ኢትዮጵያ-እስራኤላዊ የሁለተኛ ደረጃ ምሩቅ (ካጠናቀቀ 2 ዓመት ውስጥ)
- ለዩኒቨርሲቲ ፍላጎት ያላሟላ ባግሩት
- ኢንጂነሪንግ፣ ሳይንስ ወይም ህክምና ፍላጎት

## ምን ይካተታል?

- በአጋር ተቋም ቅድመ-አካዳሚክ ዓመት
- የካምፓስ መኖሪያ + በቀን 3 ምግቦች
- ዓመታዊ የኪስ ድጋፍ
- በዓመቱ ሁሉ የግል ምክር
- ለመጀመሪያ ዲግሪ "ለስላሳ ማረፊያ"

## ይህንንም ይመልከቱ

- [Atidim — የሰጪው ድርጅት](/am/orgs/atidim)
- [የENP ባግሩት ድጋፍ](/am/education/scholarships/enp-bagrut-grant)
`,
    },
  },

  // 6. Cogito STEM PhD
  {
    slug: "cogito-stem-phd",
    level: "phd",
    providerOrgSlug: "cogito",
    name: {
      he: "Cogito Scholars — דוקטורנטים STEM",
      en: "Cogito Scholars — STEM PhD",
      am: "Cogito Scholars — STEM ዶክትሬት",
    },
    shortDescription: {
      he: "מלגות דוקטורט בתחומי STEM (מדעים, טכנולוגיה, הנדסה, מתמטיקה) לחוקרים מהקהילה.",
      en: "PhD scholarships in STEM fields (sciences, technology, engineering, math) for community researchers.",
      am: "በSTEM ዘርፎች ለማህበረሰብ ተመራማሪዎች የዶክትሬት ድጋፍ።",
    },
    amountMinIls: 60000,
    amountMaxIls: 120000,
    amountNote: {
      he: "סטיפנדיה שנתית מלאה למשך 4 שנות דוקטורט; שכר לימוד מלא בנפרד.",
      en: "Full annual stipend for 4 years of PhD; tuition covered separately.",
      am: "ለ4 ዓመት ዶክትሬት ሙሉ ዓመታዊ ድጋፍ፤ የትምህርት ክፍያ በተናጥል።",
    },
    deadline: "rolling",
    applicationUrl: "https://cogito.org.il/apply",
    tags: ["phd", "stem", "academic", "community"],
    communityPriority: true,
    relatedScholarships: ["isef-fellowship"],
    relatedRights: ["academic-tuition-grant"],
    bodies: {
      he: `## למי המלגה?

- חוקרים יוצאי אתיופיה לדוקטורט בתחומי STEM
- מועמדים מאושרים בתכנית דוקטורט באוניברסיטה מחקרית בישראל
- בעלי תזה מאושרת על-ידי מנחה מוכר

## מה כלול?

- סטיפנדיית דוקטורט מלאה (~₪80,000–₪120,000 לשנה)
- שכר לימוד מלא
- כיסוי הוצאות כנסים אקדמיים
- חיבור לרשת חוקרים מהקהילה

## איך פוני?

1. אישור קבלה לדוקטורט באוניברסיטה ראשון
2. הגשת בקשה לקרן Cogito עם תזה ומכתב מנחה
3. ראיון
4. אישור תוך 4–6 שבועות

## ראו גם

- [Cogito — Org profile](/he/orgs/cogito)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
`,
      en: `## Who is it for?

- Ethiopian-Israeli PhD researchers in STEM fields
- Accepted to a PhD program at an Israeli research university
- Thesis approved by recognized advisor

## What's included?

- Full PhD stipend (~₪80,000–₪120,000/year)
- Full tuition
- Conference travel coverage
- Connection to community researcher network

## How to apply

1. Get accepted to the PhD program first
2. Apply to Cogito with thesis + advisor letter
3. Interview
4. Decision within 4–6 weeks

## See also

- [Cogito — provider org](/en/orgs/cogito)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለማን ነው?

- በSTEM ዘርፎች ለሚሰሩ ኢትዮጵያ-እስራኤላዊ የዶክትሬት ተመራማሪዎች
- በእስራኤል የምርምር ዩኒቨርሲቲ የዶክትሬት ፕሮግራም ተቀብለዋል
- በታወቀ አማካሪ የጸደቀ ቴዚስ

## ምን ይካተታል?

- ሙሉ የዶክትሬት ድጋፍ (~₪80,000–₪120,000/ዓመት)
- ሙሉ የትምህርት ክፍያ
- የጉባኤ ጉዞ ሽፋን

## ይህንንም ይመልከቱ

- [Cogito — የሰጪው ድርጅት](/am/orgs/cogito)
- [የISEF ህብረት](/am/education/scholarships/isef-fellowship)
`,
    },
  },

  // 7. PERACH Tutoring Stipend
  {
    slug: "perach-tutoring-stipend",
    level: "undergrad",
    providerOrgSlug: "perach",
    name: {
      he: "סטיפנדיית פרח — חניכה",
      en: "PERACH Tutoring Stipend",
      am: "የPERACH የማስተማር ድጋፍ",
    },
    shortDescription: {
      he: "סטיפנדיה לסטודנטים שמחנכים תלמידים בקהילה במשך השנה האקדמית. תעסוקה צד שמתאימה ללימודים.",
      en: "Stipend for students who tutor community children during the academic year. Side employment that fits study schedules.",
      am: "በትምህርት ዓመት ውስጥ የማህበረሰብ ልጆችን ለሚያስተምሩ ተማሪዎች ድጋፍ።",
    },
    amountMinIls: 8000,
    amountMaxIls: 12000,
    amountNote: {
      he: "סטיפנדיה שנתית לכל שעת חניכה (~4 שעות שבוע × 30 שבועות).",
      en: "Annual stipend per tutoring hour (~4 hours/week × 30 weeks).",
      am: "በማስተማሪያ ሰዓት ዓመታዊ ድጋፍ።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.perach.org.il/apply",
    tags: ["undergrad", "mentorship", "community", "side-income"],
    communityPriority: false,
    relatedScholarships: ["hesegim-undergraduate"],
    relatedRights: [],
    bodies: {
      he: `## למי המלגה?

- סטודנטים לתואר ראשון בכל מוסד אקדמי בישראל
- מוכנים להתחייב לחניכה של תלמיד אחד 4 שעות שבועיות לאורך שנת הלימודים
- בעלי יכולת ואקדמית בסיסית (פסיכומטרי 550+ או ממוצע 80+)

## מה כלול?

- סטיפנדיה שנתית של ₪8,000–₪12,000
- הכשרת מנטור פדגוגית
- צבירת שעות עבודה מועילות לקריירה (חיוני לתעודת הוראה בעתיד)

## איך פוני?

1. רישום באתר פרח
2. השמה לתלמיד מתאים (לפי גיאוגרפיה ותחום הלימוד)
3. הסכם חניכה לשנה אקדמית

## ראו גם

- [פרח — Org profile](/he/orgs/perach)
- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate) — מלגת תואר ראשון מקבילה
`,
      en: `## Who is it for?

- Undergraduate students at any Israeli academic institution
- Willing to tutor one child 4 hours/week through the academic year
- Basic academic capability (psychometric 550+ or GPA 80+)

## What's included?

- Annual stipend of ₪8,000–₪12,000
- Pedagogical mentor training
- Career-relevant work hours (essential for future teaching license)

## How to apply

1. Register on PERACH website
2. Match with a suitable student (by geography and field)
3. Annual tutoring agreement

## See also

- [PERACH — provider org](/en/orgs/perach)
- [Hesegim Undergraduate](/en/education/scholarships/hesegim-undergraduate)
`,
      am: `## ለማን ነው?

- በማንኛውም የእስራኤል አካዳሚክ ተቋም የመጀመሪያ ዲግሪ ተማሪዎች
- በትምህርት ዓመት አንድ ልጅ በሳምንት 4 ሰዓት ለማስተማር ቁርጠኛ
- መሰረታዊ የአካዳሚክ ችሎታ

## ምን ይካተታል?

- ዓመታዊ ድጋፍ ₪8,000–₪12,000
- ፔዳጎጂካል አማካሪ ስልጠና
- ለስራ ጠቃሚ የስራ ሰዓቶች

## ይህንንም ይመልከቱ

- [PERACH — የሰጪው ድርጅት](/am/orgs/perach)
`,
    },
  },

  // 8. Tech-Career Bootcamp Stipend
  {
    slug: "tech-career-bootcamp-stipend",
    level: "vocational",
    providerOrgSlug: "tech-career",
    name: {
      he: "סטיפנדיית Tech-Career — Bootcamp",
      en: "Tech-Career Bootcamp Stipend",
      am: "የTech-Career Bootcamp ድጋፍ",
    },
    shortDescription: {
      he: "Bootcamp תכנותי בחינם + סטיפנדיית מחיה לבני קהילה — מסלול הסבה מהיר לתעסוקת hi-tech.",
      en: "Free coding bootcamp + living stipend for community members — fast-track to hi-tech employment.",
      am: "ለማህበረሰቡ ነጻ የኮድ ቡት ካምፕ + የኑሮ ድጋፍ — ወደ hi-tech ስራ ፈጣን መንገድ።",
    },
    amountMinIls: 30000,
    amountMaxIls: 50000,
    amountNote: {
      he: "Bootcamp 6–9 חודשים בחינם + סטיפנדיית מחיה לאורכם.",
      en: "6–9 month bootcamp free of charge + living stipend throughout.",
      am: "6–9 ወር ቡት ካምፕ ነጻ + በሙሉ ጊዜ የኑሮ ድጋፍ።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.tech-career.org/apply",
    tags: ["vocational", "tech", "career-shift", "community"],
    communityPriority: true,
    relatedScholarships: ["atidim-pre-academic", "olim-beyahad-career-mentorship"],
    relatedRights: ["tech-career-bootcamp"],
    bodies: {
      he: `## למי המלגה?

- בני קהילה בני 22–45 ללא רקע תכנותי קודם
- לא לימדו תואר רלוונטי או אינם מעוניינים בו
- מחויבים ל-bootcamp מלא של 6–9 חודשים

## מה כלול?

- Bootcamp תכנותי בחינם (Web, Mobile, Data, Cyber)
- סטיפנדיית מחיה ₪3,500–₪5,000 לחודש
- הכוונה לקריירה + השמה ב-90% מהבוגרים
- 250+ חברות שותפות (Wix, Microsoft, Amazon, וכד')

## איך פוני?

1. רישום באתר Tech-Career
2. מבחן התאמה לוגי (אין דרישת רקע תכנותי)
3. ראיון
4. תחילת bootcamp בקבוצה הבאה

## ראו גם

- [Tech-Career — Org profile](/he/orgs/tech-career)
- [Atidim מכינה](/he/education/scholarships/atidim-pre-academic) — מסלול אקדמי חלופי
- [ייעוץ קריירה — Olim Beyahad](/he/education/scholarships/olim-beyahad-career-mentorship)
`,
      en: `## Who is it for?

- Community members aged 22–45 with no prior coding background
- Did not study a relevant degree or not interested in academic path
- Committed to a full 6–9 month bootcamp

## What's included?

- Free coding bootcamp (Web, Mobile, Data, Cyber)
- Living stipend ₪3,500–₪5,000/month
- Career placement + 90% placement rate
- 250+ partner companies (Wix, Microsoft, Amazon, etc.)

## How to apply

1. Register on Tech-Career website
2. Logical aptitude test (no coding background required)
3. Interview
4. Start with the next bootcamp cohort

## See also

- [Tech-Career — provider org](/en/orgs/tech-career)
- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
- [Olim Beyahad Career Mentorship](/en/education/scholarships/olim-beyahad-career-mentorship)
`,
      am: `## ለማን ነው?

- ቀደም ያለ የኮዲንግ ዳራ የሌላቸው 22–45 ዓመት የማህበረሰብ አባላት
- ተዛማጅ ዲግሪ ያላጠኑ ወይም በአካዳሚክ መንገድ ፍላጎት የሌላቸው
- ለ6–9 ወር ሙሉ ቡት ካምፕ ቁርጠኛ

## ምን ይካተታል?

- ነጻ የኮድ ቡት ካምፕ
- የኑሮ ድጋፍ ₪3,500–₪5,000/ወር
- 90% የስራ ምደባ መጠን
- 250+ አጋር ኩባንያዎች

## ይህንንም ይመልከቱ

- [Tech-Career — የሰጪው ድርጅት](/am/orgs/tech-career)
`,
    },
  },

  // 9. Olim Beyahad Career Mentorship
  {
    slug: "olim-beyahad-career-mentorship",
    level: "undergrad",
    providerOrgSlug: "olim-beyahad",
    name: {
      he: "ליווי קריירה — עולים ביחד",
      en: "Olim Beyahad Career Mentorship",
      am: "የOlim Beyahad የስራ ምክር",
    },
    shortDescription: {
      he: "ליווי השמה לקריירה לבוגרי תואר ראשון מהקהילה — מנטורינג, חיבור למעסיקים, מלגת השלמה.",
      en: "Career placement support for community undergraduate graduates — mentoring, employer connections, supplementary stipend.",
      am: "ለማህበረሰብ የመጀመሪያ ዲግሪ ምሩቃን የስራ ምደባ ድጋፍ።",
    },
    amountMinIls: 6000,
    amountMaxIls: 12000,
    amountNote: {
      he: "מלגת השלמה חד-פעמית בעת תחילת תפקיד; ליווי שירותי חינם.",
      en: "One-time supplementary stipend on job start; ancillary services free.",
      am: "ስራ ሲጀምሩ የአንድ ጊዜ ተጨማሪ ድጋፍ፤ ተጓዳኝ አገልግሎቶች ነጻ።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.olim-beyahad.org.il/apply",
    tags: ["undergrad", "career-shift", "community", "mentorship"],
    communityPriority: true,
    relatedScholarships: ["tech-career-bootcamp-stipend", "isef-fellowship"],
    relatedRights: [],
    bodies: {
      he: `## למי הליווי?

- בוגרי תואר ראשון יוצאי אתיופיה (תוך 5 שנים מסיום)
- מחפשים תפקיד ראשון או הסבה לתחום חדש
- מוכנים למחויבות 6 חודשי ליווי

## מה כלול?

- מנטור אישי (בכיר ב-תחום הרלוונטי) — 6 פגישות
- חיבור ישיר ל-300+ מעסיקים שותפים (Bank Leumi, Microsoft, KPMG, ועוד)
- סדנת CV + ראיונות
- מלגת השלמה ₪6,000–₪12,000 בעת תחילת תפקיד מאושר
- 90% השמה תוך 9 חודשים

## איך פוני?

1. הרשמה אונליין
2. שאלון התאמה
3. ראיון אישי + שיוך מנטור
4. תחילת תכנית 6 חודשים

## ראו גם

- [Olim Beyahad — Org profile](/he/orgs/olim-beyahad)
- [Tech-Career bootcamp](/he/education/scholarships/tech-career-bootcamp-stipend)
- [מלגת ISEF — תואר שני](/he/education/scholarships/isef-fellowship)
`,
      en: `## Who is it for?

- Ethiopian-Israeli undergraduate graduates (within 5 years of finishing)
- Seeking first role or career transition
- Committed to 6 months of mentorship

## What's included?

- Personal mentor (senior in your field) — 6 sessions
- Direct connection to 300+ partner employers (Bank Leumi, Microsoft, KPMG, etc.)
- CV + interview workshop
- Supplementary stipend ₪6,000–₪12,000 on job start
- 90% placement within 9 months

## How to apply

1. Online registration
2. Compatibility questionnaire
3. Personal interview + mentor matching
4. Start the 6-month program

## See also

- [Olim Beyahad — provider org](/en/orgs/olim-beyahad)
- [Tech-Career bootcamp](/en/education/scholarships/tech-career-bootcamp-stipend)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለማን ነው?

- ኢትዮጵያ-እስራኤላዊ የመጀመሪያ ዲግሪ ምሩቃን (ካጠናቀቁ 5 ዓመት ውስጥ)
- የመጀመሪያ ስራ ወይም የስራ ሽግግር ይፈልጋሉ
- ለ6 ወር ምክር ቁርጠኛ

## ምን ይካተታል?

- የግል አማካሪ — 6 ስብሰባዎች
- ከ300+ አጋር አሰሪዎች ጋር ቀጥተኛ ግንኙነት
- CV + ቃለ-መጠይቅ ወርክሾፕ
- ስራ ሲጀምሩ ተጨማሪ ድጋፍ ₪6,000–₪12,000

## ይህንንም ይመልከቱ

- [Olim Beyahad — የሰጪው ድርጅት](/am/orgs/olim-beyahad)
`,
    },
  },

  // 10. Jewish Agency Aliyah Scholarship
  {
    slug: "jewish-agency-aliyah",
    level: "undergrad",
    providerOrgSlug: "jewish-agency",
    name: {
      he: "מלגת לימודים — סוכנות יהודית",
      en: "Jewish Agency Study Scholarship",
      am: "የአይሁድ ኤጀንሲ የጥናት ድጋፍ",
    },
    shortDescription: {
      he: "מלגות שכר לימוד אוניברסיטאי לעולים מאתיופיה (5 שנים מהעלייה) במגוון תחומי לימוד.",
      en: "University tuition scholarships for new immigrants from Ethiopia (within 5 years of aliyah) across study fields.",
      am: "ከኢትዮጵያ ለመጡ አዳዲስ ኦሊም (በ5 ዓመት ውስጥ) የዩኒቨርሲቲ ትምህርት ድጋፍ።",
    },
    amountMinIls: 8000,
    amountMaxIls: 18000,
    amountNote: {
      he: "מלגת שכר לימוד שנתית; ניתנת בנוסף לסל קליטה רגיל.",
      en: "Annual tuition scholarship; in addition to standard absorption basket.",
      am: "ዓመታዊ የትምህርት ክፍያ ድጋፍ፤ ከተለመደው የመግባት ቅርጫት በተጨማሪ።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.jewishagency.org/il/aliyah/scholarships",
    tags: ["undergrad", "olim", "academic"],
    communityPriority: true,
    relatedScholarships: ["klita-tuition-grant", "atidim-pre-academic"],
    relatedRights: ["klita-basket-ethiopia"],
    bodies: {
      he: `## למי המלגה?

- עולים חדשים מאתיופיה (תוך 5 שנים מתאריך עלייה)
- לומדים בתואר ראשון במוסד אקדמי מוכר
- בעלי תעודת בגרות / מכינה מאושרת

## מה כלול?

- מלגת שכר לימוד שנתית ₪8,000–₪18,000
- בנוסף לסל קליטה רגיל ולמלגת משרד הקליטה
- ליווי קליטה לימודי

## איך פוני?

1. אישור עלייה (תעודת זהות חדשה)
2. רישום אקדמי
3. בקשה דרך אתר הסוכנות

## ראו גם

- [סל קליטה לעולים מאתיופיה](/he/rights/klita-basket-ethiopia)
- [מלגת משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
- [Atidim — מכינה](/he/education/scholarships/atidim-pre-academic)
`,
      en: `## Who is it for?

- New immigrants from Ethiopia (within 5 years of aliyah date)
- Studying for an undergraduate degree at a recognized institution
- Holding matriculation or approved pre-academic certificate

## What's included?

- Annual tuition scholarship ₪8,000–₪18,000
- In addition to absorption basket and Ministry of Aliyah scholarship
- Academic absorption mentorship

## How to apply

1. Aliyah confirmation (new ID card)
2. Academic registration
3. Application via Jewish Agency website

## See also

- [Klita Basket for Ethiopian Olim](/en/rights/klita-basket-ethiopia)
- [Ministry of Aliyah Scholarship](/en/education/scholarships/klita-tuition-grant)
- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
`,
      am: `## ለማን ነው?

- ከኢትዮጵያ የመጡ አዳዲስ ኦሊም (ከዐሊያ ቀን 5 ዓመት ውስጥ)
- በታወቀ ተቋም የመጀመሪያ ዲግሪ የሚማሩ
- ባግሩት ወይም የጸደቀ የቅድመ-አካዳሚክ ሰርተፊኬት ያላቸው

## ምን ይካተታል?

- ዓመታዊ የትምህርት ድጋፍ ₪8,000–₪18,000
- ከመግባት ቅርጫት በተጨማሪ
- የአካዳሚክ መግባት ምክር

## ይህንንም ይመልከቱ

- [ለኢትዮጵያ ኦሊም መግባት ቅርጫት](/am/rights/klita-basket-ethiopia)
- [የቅሊታ ሚኒስቴር ድጋፍ](/am/education/scholarships/klita-tuition-grant)
`,
    },
  },

  // 11. Falash Mura Yeshiva Stipend
  {
    slug: "falash-mura-yeshiva-stipend",
    level: "vocational",
    providerOrgSlug: "ministry-religious-services",
    name: {
      he: "מלגת ישיבת קליטה — פלשמורה",
      en: "Falash Mura Absorption-Yeshiva Stipend",
      am: "የፋላሽ ሙራ ቅዳሴ-ሥልጠና ድጋፍ",
    },
    shortDescription: {
      he: "סטיפנדיית מחיה ללומדים בישיבת קליטה במסגרת תהליך קליטה דתי לפלשמורה החדשים.",
      en: "Living stipend for those studying in absorption-yeshivot as part of religious-absorption for new Falash Mura.",
      am: "በቅዳሴ-ሥልጠና ለሚማሩ የኑሮ ድጋፍ።",
    },
    amountMinIls: 12000,
    amountMaxIls: 24000,
    amountNote: {
      he: "סטיפנדיה חודשית של ₪1,000–₪2,000 לאורך תקופת הלימודים בישיבה.",
      en: "Monthly stipend of ₪1,000–₪2,000 throughout yeshiva studies.",
      am: "በቅዳሴ-ሥልጠና ጊዜ ሁሉ ወርሃዊ ድጋፍ ₪1,000–₪2,000።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.dat.gov.il/he/scholarships",
    tags: ["vocational", "religious", "olim", "falash-mura"],
    communityPriority: true,
    relatedScholarships: ["jewish-agency-aliyah"],
    relatedRights: ["falash-mura-aliyah-completion"],
    bodies: {
      he: `## למי המלגה?

- פלשמורה שעלו לאחרונה ובמסגרת תהליך השלמת גיור
- לומדים בישיבת קליטה מוכרת על-ידי הרבנות הראשית
- ללא הכנסה אחרת מספקת

## מה כלול?

- סטיפנדיה חודשית ₪1,000–₪2,000
- כיסוי הוצאות לימודים בישיבה
- ליווי דתי-תרבותי

## איך פוני?

1. הרשמה לישיבה מוכרת
2. בקשה דרך משרד השירותים הדתיים
3. אישור הזכאות

## ראו גם

- [פלשמורה — מילון](/he/glossary/falash-mura)
- [סוכנות יהודית — מלגת לימודים](/he/education/scholarships/jewish-agency-aliyah)
`,
      en: `## Who is it for?

- Falash Mura who recently made aliyah and are completing conversion
- Studying in an absorption-yeshiva recognized by the Chief Rabbinate
- Without sufficient alternative income

## What's included?

- Monthly stipend ₪1,000–₪2,000
- Yeshiva tuition coverage
- Religious-cultural mentorship

## How to apply

1. Register at a recognized yeshiva
2. Apply through Ministry of Religious Services
3. Eligibility confirmation

## See also

- [Falash Mura — glossary](/en/glossary/falash-mura)
- [Jewish Agency Study Scholarship](/en/education/scholarships/jewish-agency-aliyah)
`,
      am: `## ለማን ነው?

- ቅርብ ጊዜ የመጡ ፋላሽ ሙራ
- በዋናው ራቢናት የተቀበለች ቅዳሴ-ሥልጠና ያሉ
- በቂ ሌላ ገቢ የሌላቸው

## ምን ይካተታል?

- ወርሃዊ ድጋፍ ₪1,000–₪2,000
- የቅዳሴ-ሥልጠና ሽፋን
- ሃይማኖታዊ-ባህላዊ ምክር

## ይህንንም ይመልከቱ

- [ፋላሽ ሙራ — መዝገብ](/am/glossary/falash-mura)
`,
    },
  },

  // 12. Ministry of Aliyah — Tuition Grant
  {
    slug: "klita-tuition-grant",
    level: "undergrad",
    providerOrgSlug: "ministry-aliyah",
    name: {
      he: "מענק שכר לימוד — משרד הקליטה",
      en: "Ministry of Aliyah — Tuition Grant",
      am: "የቅሊታ ሚኒስቴር — የትምህርት ክፍያ ድጋፍ",
    },
    shortDescription: {
      he: "מענק ממשלתי לכיסוי שכר לימוד לסטודנטים עולים מאתיופיה במוסדות אקדמיים בארץ.",
      en: "Government grant covering tuition for Ethiopian olim students at Israeli academic institutions.",
      am: "ለኢትዮጵያ ኦሊም በእስራኤል አካዳሚክ ተቋማት የትምህርት ክፍያ የሚሸፍን የመንግስት ድጋፍ።",
    },
    amountMinIls: 12000,
    amountMaxIls: 22000,
    amountNote: {
      he: "מענק שנתי לכיסוי 100% משכר הלימוד; אינו מוטה לפי הישגים.",
      en: "Annual grant covering 100% of tuition; not merit-based.",
      am: "100% የትምህርት ክፍያ የሚሸፍን ዓመታዊ ድጋፍ።",
    },
    deadline: "rolling",
    applicationUrl: "https://www.gov.il/he/departments/integration_program/scholarship",
    tags: ["undergrad", "olim", "academic", "rights"],
    communityPriority: true,
    relatedScholarships: ["jewish-agency-aliyah", "atidim-pre-academic"],
    relatedRights: ["klita-basket-ethiopia"],
    bodies: {
      he: `## למי המלגה?

- עולים חדשים מאתיופיה (תוך 10 שנים מעלייה — בניגוד לסוכנות יהודית, חלון רחב יותר)
- סטודנטים בתואר ראשון או שני במוסד אקדמי מוכר
- אינם מקבלים מלגת שכר לימוד מלא ממקור אחר

## מה כלול?

- כיסוי 100% משכר הלימוד השנתי
- ניתנת בנוסף לסל קליטה רגיל
- אפשרות חידוש בכל שנה אקדמית

## איך פוני?

1. הצהרת עולה תקפה (תעודת עולה / זהות עולה)
2. אישור רישום אקדמי
3. בקשה דרך פורטל gov.il של משרד הקליטה
4. אישור תוך 4–6 שבועות

## ראו גם

- [סל קליטה לעולים מאתיופיה](/he/rights/klita-basket-ethiopia)
- [סוכנות יהודית — מלגת לימודים](/he/education/scholarships/jewish-agency-aliyah)
- [Atidim — מכינה](/he/education/scholarships/atidim-pre-academic)
`,
      en: `## Who is it for?

- New immigrants from Ethiopia (within 10 years of aliyah — wider window than Jewish Agency)
- Undergraduate or master's students at recognized institutions
- Not receiving a full tuition scholarship from another source

## What's included?

- 100% coverage of annual tuition
- In addition to standard absorption basket
- Renewable each academic year

## How to apply

1. Valid olim status (olim certificate / ID)
2. Academic registration confirmation
3. Apply via Ministry of Aliyah portal on gov.il
4. Decision within 4–6 weeks

## See also

- [Klita Basket for Ethiopian Olim](/en/rights/klita-basket-ethiopia)
- [Jewish Agency Study Scholarship](/en/education/scholarships/jewish-agency-aliyah)
- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
`,
      am: `## ለማን ነው?

- ከኢትዮጵያ የመጡ አዳዲስ ኦሊም (ከዐሊያ 10 ዓመት ውስጥ)
- በታወቁ ተቋማት የመጀመሪያ ወይም የሁለተኛ ዲግሪ ተማሪዎች
- ከሌላ ምንጭ ሙሉ የትምህርት ድጋፍ የማይቀበሉ

## ምን ይካተታል?

- 100% ዓመታዊ የትምህርት ክፍያ ሽፋን
- ከመግባት ቅርጫት በተጨማሪ
- በየአካዳሚክ ዓመቱ የሚታደስ

## እንዴት ማመልከት ይቻላል?

1. የተረጋገጠ የኦሊም ሁኔታ
2. የአካዳሚክ ምዝገባ ማረጋገጫ
3. በgov.il የቅሊታ ሚኒስቴር ፖርታል ማመልከት

## ይህንንም ይመልከቱ

- [ለኢትዮጵያ ኦሊም መግባት ቅርጫት](/am/rights/klita-basket-ethiopia)
- [የአይሁድ ኤጀንሲ የጥናት ድጋፍ](/am/education/scholarships/jewish-agency-aliyah)
`,
    },
  },
];

// --- Helpers ----------------------------------------------------------------

export function pickLocale(t: Translatable, locale: Locale): string {
  return t[locale] ?? t[DEFAULT_LOCALE] ?? t.he;
}

export function getScholarshipBodyForLocale(
  entry: ScholarshipEntry,
  locale: Locale,
): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE] ?? entry.bodies.he;
}
