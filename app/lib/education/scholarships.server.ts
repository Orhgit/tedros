// Scholarships seed (RIN-504 / Phase 5 Education Hub Wave 1).
//
// Wave 1 + Wave 3 (TED-95 education hub — org/scholarship pages).
//
// TED-157: `scholarships-wave2.server.ts` was deleted in full — all 16 of its
// entries named scholarships their funders do not run, on top of real
// organizations (Technion, HUJI, TAU, Yad Hanadiv, Na'amat). TED-152 had
// already removed four fabricated entries from that same file, selecting on
// "does the named organization exist" — which is why the famous-org entries
// survived it. Six further Wave 1 entries went the same way here.
// TED-152: 8 fabricated entries retired (orgs/domains that do not exist) and
// 2 duplicates merged (merom-scholarship → marom-che,
// yoel-program-chiburim → biu-mechina-ethiopian) — legacy slugs 301 via
// LEGACY_SCHOLARSHIP_REDIRECTS below.
// Captures high-intent "{scholarship name}", "מלגה לבני קהילת יוצאי אתיופיה",
// "Ethiopian Israeli scholarship" queries and routes applicants to providers.
//
// HE source-of-truth (CLAUDE.md). Same render-from-seed pattern as
// `lib/orgs/orgs.server.ts` — no DB needed in V1.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { ScholarshipLevel } from "./categories";
import { SCHOLARSHIPS_WAVE3 } from "./scholarships-wave3.server";

export type { ScholarshipLevel } from "./categories";

/**
 * Registration status for the current (תשפ"ז / 2026-27) cycle (TED-139).
 * `open` is only set with a verified primary source (org / gov / university
 * site); anything unverifiable stays `tba` and renders no badge.
 */
export type ScholarshipStatus = "open" | "closed" | "tba";

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
  /**
   * "rolling", ISO date string of the next verified deadline, or null when
   * the next cycle's deadline has not been announced (TED-139).
   */
  deadline: "rolling" | string | null;
  /** Registration status for the current cycle — see ScholarshipStatus. */
  status: ScholarshipStatus;
  /** ISO date this entry's deadline/status/link were last verified (TED-139). */
  lastVerified: string;
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

/**
 * Slugs retired in TED-152 that had an indexable canonical successor.
 * Detail + city routes 301 these to the canonical slug (same pattern as the
 * careers track×city 301s, TED-132). Purely-fabricated entries were removed
 * without a redirect — they 404/410 by design.
 */
export const LEGACY_SCHOLARSHIP_REDIRECTS: Record<string, string> = {
  // Same CHE מרום program; the merom entry carried invented details (merom.org.il).
  "merom-scholarship": "marom-che",
  // Same program stack: תוכנית יואל (עמותת חיבורים) is the support wrap around
  // the Bar-Ilan dedicated mechina — merged into the BIU entry.
  "yoel-program-chiburim": "biu-mechina-ethiopian",
};

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
    // TED-157: the previous 25,000-70,000 range appears on no ISEF page. The
    // two primary sources that do publish figures disagree with each other
    // (a university dean's page and ISEF's own site), so no amount is stated
    // here — the institution sets it with ISEF.
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: 'אייס"ף אינה מפרסמת סכום אחיד. הסיוע בשכר הלימוד נקבע מול המוסד האקדמי — בררו מול דיקנט הסטודנטים.',
      en: "ISEF publishes no single figure. Tuition assistance is set with the academic institution — check with the dean of students.",
      am: "ISEF ወጥ የሆነ መጠን አያሳትምም። የትምህርት ክፍያ ድጋፍ ከተቋሙ ጋር ይወሰናል።",
    },
    deadline: "07-31",
    status: "closed",
    lastVerified: "2026-09-01",
    applicationUrl: "https://www.isef.org.il/",
    tags: ["masters", "phd", "academic", "periphery"],
    // TED-157: ISEF selects on first-generation higher education and
    // socio-economic periphery. It publishes no Ethiopian-origin criterion,
    // so flagging it as a community scholarship was a mis-framing.
    communityPriority: false,
    relatedScholarships: ["vatat-doctoral-postdoc-scholarship"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## למי המלגה?

- **אין קריטריון של מוצא.** אייס"ף פונה לסטודנטים שהם דור ראשון להשכלה גבוהה במשפחה, מהפריפריה הגיאוגרפית והחברתית. בני הקהילה זכאים כמו כל מי שעונה על התנאים — אבל זו אינה מלגה ייעודית ליוצאי אתיופיה, וכך היה כתוב כאן בטעות
- סטודנטים במוסד אקדמי מוכר בישראל
- מצב כלכלי-חברתי נשקל

## מה כלול?

- סיוע בשכר לימוד, בשותפות עם המוסד האקדמי. הסכום נקבע מול המוסד — אייס"ף אינה מפרסמת סכום אחיד, ושני מקורות רשמיים נוקבים בסכומים שונים, ולכן אין כאן מספר
- ליווי אקדמי וקריירה דרך רשת בוגרי ISEF
- גישה לרשת מנטורים בכירים מהקהילה

## איך פוני?

1. הרשמה אונליין באתר ISEF
2. הגשת מסמכים אקדמיים, מכתב מוטיבציה ו-2 המלצות
3. ראיון אישי
4. תשובה תוך 4–8 שבועות

## תאריכים חשובים

- ההרשמה נפתחת ב-1 ביוני ונסגרת בסוף יולי. המועד האחרון שמפורסם: **31 ביולי**.

מקור: [isef.org.il](https://www.isef.org.il/) · נבדק בספטמבר 2026.

## ראו גם

- [קרן ע"ש איסף — ISEF](/he/orgs/isef) — הארגון המספק

`,
      en: `## Who is it for?

- **No origin criterion.** ISEF selects first-generation higher-education students from the geographic and social periphery. Community members qualify like anyone meeting the conditions — but this is not an Ethiopian-specific scholarship, as this page previously stated in error
- Students at a recognized Israeli academic institution
- Socio-economic circumstances are weighed

## What's included?

- Tuition assistance, in partnership with the academic institution. The amount is set with the institution — ISEF publishes no single figure, and two official sources give different numbers, so none is stated here
- Academic and career mentorship via the ISEF alumni network
- Access to senior community-network mentors

## How to apply

1. Online application on ISEF website
2. Submit academic transcript, statement of purpose, 2 letters of recommendation
3. Personal interview
4. Decision within 4–8 weeks

## Important dates

- Registration opens 1 June and closes at the end of July. The published deadline is **31 July**.

Source: [isef.org.il](https://www.isef.org.il/) · checked September 2026.

## See also

- [ISEF — provider organization](/en/orgs/isef)

`,
      am: `## ለማን ነው?

- ለሁለተኛ ዲግሪ ወይም ለዶክትሬት የሚማሩ ኢትዮጵያ-እስራኤላውያን (1ኛ፣ 2ኛ ወይም 3ኛ ትውልድ)
- በእስራኤል እውቅና ያላቸው ዩኒቨርሲቲዎች (TAU፣ HUJI፣ ቴክኒዮን፣ ባር-ኢላን፣ BGU፣ ሐይፋ፣ ዊይስማን)
- **የትውልድ መስፈርት የለም** — ISEF በቤተሰብ ውስጥ የመጀመሪያ ትውልድ ተማሪዎችን ከዳርቻ ክልሎች ይመርጣል
- የገንዘብ ፍላጎት ግምት ውስጥ ይገባል (ብቻ-ምክንያት አይደለም)

## ምን ይካተታል?

- ሙሉ የዩኒቨርሲቲ ትምህርት ክፍያ
- የትምህርት ክፍያ ድጋፍ (መጠኑ ከተቋሙ ጋር ይወሰናል፤ ISEF ወጥ መጠን አያሳትምም)
- በISEF የቀድሞ ተማሪዎች አውታረ መረብ የአካዳሚክና የስራ ምክር
- ለከፍተኛ የማህበረሰብ አማካሪዎች መዳረሻ

## እንዴት ማመልከት ይቻላል?

1. በISEF ድረ-ገጽ የመስመር ላይ ምዝገባ
2. የአካዳሚክ መግለጫ፣ የተነሳሽነት ደብዳቤ፣ 2 የውጤት ደብዳቤዎች ማስረከብ
3. የግል ቃለ-መጠይቅ
4. በ4–8 ሳምንታት ውስጥ ምላሽ

## አስፈላጊ ቀናት

- ምዝገባ ሰኔ 1 ይከፈታል፤ የመጨረሻ ቀን **ጁላይ 31**። ምንጭ፦ [isef.org.il](https://www.isef.org.il/) · በሴፕቴምበር 2026 ተረጋግጧል።

## ይህንንም ይመልከቱ

- [ISEF — የሰጪው ድርጅት](/am/orgs/isef)

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
    // TED-157: PERACH publishes a flat 7,000 ILS for 100 tutoring hours, not
    // a range. The 8,000-12,000 band appeared on no PERACH page.
    amountMinIls: 7000,
    amountMaxIls: 10000,
    amountNote: {
      he: "7,000 ₪ עבור 100 שעות חונכות. מלגה כפולה עבור 6 שעות שבועיות, ומלגות מוגדלות עד 10,000 ₪.",
      en: "ILS 7,000 for 100 tutoring hours. A double stipend for 6 weekly hours, and enlarged stipends up to ILS 10,000.",
      am: "ለ100 የማስተማሪያ ሰዓታት 7,000 ₪። ለ6 ሳምንታዊ ሰዓታት እጥፍ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-09-01",
    applicationUrl: "https://www.perach.org.il/",
    tags: ["undergrad", "mentorship", "community", "side-income"],
    communityPriority: false,
    relatedScholarships: [],
    relatedRights: [],
    bodies: {
      he: `## למי המלגה?

- סטודנטים לתואר ראשון בכל מוסד אקדמי בישראל
- מוכנים להתחייב ל-100 שעות חונכות בשנה — פעמיים בשבוע, שעה וחצי כל פעם
- **אין דרישת ציון.** "פסיכומטרי 550+ או ממוצע 80+" נכתב כאן בעבר בטעות; פר"ח אינה מציבה סף אקדמי, והתנאי הזה הרתיע לשווא

## מה כלול?

- מלגה בסך **7,000 ₪** עבור 100 שעות חונכות. מלגה כפולה עבור 6 שעות שבועיות, ומלגות מוגדלות עד 10,000 ₪

מקור: [פר"ח — על המלגה](https://www.perach.org.il/about-the-scholarship.html) · נבדק בספטמבר 2026.
- הכשרת מנטור פדגוגית
- צבירת שעות עבודה מועילות לקריירה (חיוני לתעודת הוראה בעתיד)

## איך פוני?

1. רישום באתר פרח
2. השמה לתלמיד מתאים (לפי גיאוגרפיה ותחום הלימוד)
3. הסכם חניכה לשנה אקדמית

## ראו גם

- פרח — Org profile
`,
      en: `## Who is it for?

- Undergraduate students at any Israeli academic institution
- Willing to tutor one child 4 hours/week through the academic year
- Basic academic capability (psychometric 550+ or GPA 80+)

## What's included?

- A stipend of **ILS 7,000** for 100 tutoring hours; double for 6 weekly hours, and enlarged stipends up to ILS 10,000. Source: [perach.org.il](https://www.perach.org.il/about-the-scholarship.html), checked September 2026
- Pedagogical mentor training
- Career-relevant work hours (essential for future teaching license)

## How to apply

1. Register on PERACH website
2. Match with a suitable student (by geography and field)
3. Annual tutoring agreement

## See also

- PERACH — provider org

`,
      am: `## ለማን ነው?

- በማንኛውም የእስራኤል አካዳሚክ ተቋም የመጀመሪያ ዲግሪ ተማሪዎች
- በዓመት 100 የማስተማሪያ ሰዓታት — በሳምንት ሁለት ጊዜ
- **የውጤት መስፈርት የለም**

## ምን ይካተታል?

- ለ100 የማስተማሪያ ሰዓታት 7,000 ₪ (ምንጭ፦ perach.org.il፣ ሴፕቴምበር 2026)
- ፔዳጎጂካል አማካሪ ስልጠና
- ለስራ ጠቃሚ የስራ ሰዓቶች

## ይህንንም ይመልከቱ

- PERACH — የሰጪው ድርጅት
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
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.tech-career.org/items",
    tags: ["vocational", "tech", "career-shift", "community"],
    communityPriority: true,
    relatedScholarships: ["olim-beyahad-career-mentorship"],
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

- [Tech-Career — Org profile](/he/education/scholarships/tech-career-org)
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

- [Tech-Career — provider org](/en/education/scholarships/tech-career-org)

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

- [Tech-Career — የሰጪው ድርጅት](/am/education/scholarships/tech-career-org)
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
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.olim-beyahad.org.il/",
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
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.jewishagency.org/",
    tags: ["undergrad", "olim", "academic"],
    communityPriority: true,
    relatedScholarships: ["klita-tuition-grant"],
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
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl:
      "https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority",
    tags: ["undergrad", "olim", "academic", "rights"],
    communityPriority: true,
    relatedScholarships: ["jewish-agency-aliyah"],
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

  // 13. מלגת מרום CHE — slug: marom-che (TED-95: facts corrected against
  // che.org.il/scholarships/marom, verified 2026-07-26. Prior version of this
  // entry stated an income/GPA means-test and a fixed March 31 deadline that
  // do not match the published CHE terms for תשפ"ז — replaced below.)
  {
    slug: "marom-che",
    level: "undergrad",
    providerOrgSlug: "che-israel",
    name: {
      he: "מלגת מרום — המועצה להשכלה גבוהה",
      en: "Marom Scholarship — Council for Higher Education",
      am: "ማሮም ስኮላርሺፕ — ከፍተኛ ትምህርት ምክር ቤት",
    },
    shortDescription: {
      he: 'מלגה ממלכתית של המועצה להשכלה גבוהה (מל"ג/ות"ת) לתואר ראשון ושני ליוצאי אתיופיה — ₪10,000 לשנה; הרשמה לתשפ"ז נפתחת 9.9.2026.',
      en: "National scholarship from the Council for Higher Education (CHE/VATAT) for undergraduate and master's students of Ethiopian origin — ₪10,000/year; 2026-27 registration opens Sept 9, 2026.",
      am: "ከCHE/VATAT ለመጀመሪያና ለሁለተኛ ዲግሪ ኢትዮጵያ-ተወላጅ ተማሪዎች ብሔራዊ ስኮላርሺፕ — ₪10,000/ዓመት፤ ለ2026-27 ምዝገባ በሴፕቴምበር 9, 2026 ይከፈታል።",
    },
    amountMinIls: 10000,
    amountMaxIls: 10000,
    amountNote: {
      he: "₪10,000 קבועים לכל שנת לימודים, משנה א' ועד סיום שנות התואר התקניות (עודכן — לא מדורג לפי שנה או תחום כפי שנכתב בעבר).",
      en: "A flat ₪10,000 per academic year, from year 1 through the standard duration of the degree (corrected — not tiered by year or field as previously written here).",
      am: "₪10,000 ቋሚ በዓመት፣ ከ1ኛ ዓመት እስከ መደበኛ የዲግሪ ዓመታት ፍጻሜ ድረስ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://che.org.il/scholarships/marom/",
    tags: ["undergrad", "masters", "community", "government"],
    communityPriority: true,
    relatedScholarships: [
      "isef-fellowship",
      "klita-tuition-grant",
      "vatat-excellence-mentoring",
    ],
    relatedRights: ["student-aid", "klita-basket-ethiopia"],
    bodies: {
      he: `## מה זאת מלגת מרום של המועצה להשכלה גבוהה?

מלגת מרום היא תכנית מלגות ממלכתית של המועצה להשכלה גבוהה (מל"ג/ות"ת), המיועדת **אך ורק לסטודנטים ממוצא אתיופי**. החל משנת הלימודים תשפ"ז (2026–27) ניתן להגיש בקשה גם לתואר שני, לא רק תואר ראשון.

## מי זכאי?

- סטודנט/ית ממוצא אתיופי בלבד — נמצא/ת בישראל 15+ שנה, **או** נולד/ה בישראל להורים שנולדו באתיופיה
- לומד/ת בתכנית אקדמית המוכרת על-ידי מל"ג (תואר ראשון או שני)
- החל מתשפ"ז: ניתן להגיש בכל שנות הלימוד התקניות של התואר, לא רק בשנה א'
- החל מתשפ"ז: המצב הסוציו-אקונומי אינו עוד תנאי סף, אלא משוקלל בניקוד הכולל; חובת ההתנדבות שהייתה בעבר בוטלה

> **הערה לעריכה**: הסעיפים לעיל אומתו מול che.org.il/scholarships/marom (יולי 2026). תנאי סף מדויקים לתואר שני (האם יש הבדל בסכום/קריטריונים מול תואר ראשון) לא פורטו במקור שנבדק — מומלץ לוודא מול מל"ג לפני קמפיין ממומן.

## כמה מקבלים?

₪10,000 לשנת לימודים, מדי שנה עד סיום שנות התואר התקניות.

## איך פונים?

1. הרשמה מקוונת דרך che.org.il/scholarships/marom
2. ההרשמה לתשפ"ז נפתחת ב-**9 בספטמבר 2026** ונסגרת בתחילת נובמבר (מועד סגירה מדויק — לוודא כל שנה מול האתר; לא פורסם תאריך יום מדויק)
3. צירוף מסמכים: תעודת זהות, אישור לימודים/רישום אקדמי, אסמכתא על מוצא אתיופי
4. אישור הזכאות והעברת המלגה ישירות דרך המוסד האקדמי

## ראו גם

- [מלגת ISEF](/he/education/scholarships/isef-fellowship) — לתואר שני/שלישי
- [מענק שכר לימוד — משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
- [ות"ת — מצוינות ומנטורינג](/he/education/scholarships/vatat-excellence-mentoring)
`,
      en: `## What is the Marom Scholarship from the Council for Higher Education?

The Marom Scholarship is a national scholarship program of the Council for Higher Education (CHE/VATAT), designed **exclusively for students of Ethiopian origin**. Starting in the 2026-27 academic year (Hebrew: תשפ"ז), master's students can also apply — not only undergraduates.

## Who is eligible?

- Students of Ethiopian origin only — resident in Israel 15+ years, **or** born in Israel to parents born in Ethiopia
- Enrolled in a CHE-recognized academic program (undergraduate or master's)
- From 2026-27: applicants may apply in any standard year of the degree, not just year 1
- From 2026-27: socio-economic status is no longer a strict eligibility gate but is weighted into the overall score; the previous volunteering requirement has been dropped

## How much?

A flat ₪10,000 per academic year, through the standard duration of the degree.

## How to apply

1. Apply online via che.org.il/scholarships/marom
2. Registration for 2026-27 opens **September 9, 2026** and closes in early November (exact closing date not published on the page checked — verify yearly)
3. Attach documents: ID, academic enrollment confirmation, proof of Ethiopian origin
4. Eligibility confirmation and payment via the academic institution

## See also

- [ISEF Fellowship](/en/education/scholarships/isef-fellowship) — for master's/PhD
- [Ministry of Aliyah Tuition Grant](/en/education/scholarships/klita-tuition-grant)
- [VATAT — Excellence & Mentoring](/en/education/scholarships/vatat-excellence-mentoring)
`,
      am: `## ማሮም ስኮላርሺፕ (CHE/VATAT) ምንድን ነው?

ይህ ስኮላርሺፕ **ለኢትዮጵያ-ተወላጅ ተማሪዎች ብቻ** የተዘጋጀ ብሔራዊ ፕሮግራም ነው። ከ2026-27 ጀምሮ ለሁለተኛ ዲግሪ ተማሪዎችም ክፍት ነው (ከዚህ በፊት ለመጀመሪያ ዲግሪ ብቻ ነበር)።

## ለማን ይሆናል?

- ኢትዮጵያ-ተወላጅ ተማሪዎች ብቻ — ከ15+ ዓመታት በእስራኤል የኖሩ ወይም በእስራኤል የተወለዱ ለኢትዮጵያ ወላጆች
- CHE-እውቅና ያለው ፕሮግራም ውስጥ (መጀመሪያ ወይም ሁለተኛ ዲግሪ)
- ከ2026-27 ጀምሮ፦ በማንኛውም መደበኛ የዲግሪ ዓመት ማመልከት ይቻላል
- ከ2026-27 ጀምሮ፦ ማህበራዊ-ኢኮኖሚያዊ ሁኔታ ቅድመ-ሁኔታ አይደለም፣ በውጤት ውስጥ ግን ይመዘናል

*(ማስታወሻ፦ ከላይ ያለው መረጃ ከche.org.il/scholarships/marom ጋር ተረጋግጧል — ሐምሌ 2026)*

## ስንት ያገኛሉ?

₪10,000 ቋሚ በዓመት፣ እስከ ዲግሪ ፍጻሜ ድረስ።

## እንዴት ማመልከት ይቻላል?

1. በche.org.il/scholarships/marom በመስመር ላይ ማመልከት
2. ለ2026-27 ምዝገባ በሴፕቴምበር 9, 2026 ይከፈታል፣ በኖቬምበር መጀመሪያ ይዘጋል
3. ሰነዶች ማስረከብ፦ መታወቂያ፣ የትምህርት ምዝገባ ማረጋገጫ፣ የኢትዮጵያ ትውልድ ማረጋገጫ
4. ብቁነት ማረጋገጫና ክፍያ በአካዳሚክ ተቋሙ በኩል

## ይህንንም ይዩ

- [ISEF Fellowship](/am/education/scholarships/isef-fellowship)
- [VATAT — ልቀትና አማካሪነት](/am/education/scholarships/vatat-excellence-mentoring)
`,
    },
  },

  ...SCHOLARSHIPS_WAVE3,
];

// Re-export for convenience — callers may import ALL_SCHOLARSHIPS directly.
export const ALL_SCHOLARSHIPS = SCHOLARSHIPS;

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
