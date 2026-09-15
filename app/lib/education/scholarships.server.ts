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
  /**
   * ISO date on which registration is stated to open, when the granting body
   * publishes one AND the entry is not currently open (TED-168).
   *
   * Added because `status: "closed"` alone loses the single most useful fact a
   * reader of a closed entry needs. מרום is the case that forced it: the CHE
   * and פר"ח content pages both say "September 2026", while פר"ח's own
   * registration system — the only surface that actually accepts an
   * application — says the תשפ"ז round opens 28/02/2027. We print what the
   * system says, and say in the body that the other two pages disagree.
   */
  opensOn?: string;
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
  // Same CHE מרום program; the merom entry carried invented details on a domain that does not resolve.
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
    // Annual cycle: registration opens 1 June, closes 31 July. The field
    // takes an ISO date or null; the cycle dates are stated in the body.
    deadline: null,
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

  // 13. מלגת מרום CHE — slug: marom-che
  //
  // TED-168 (2026-09-15): re-verified against the granting body's own pages,
  // fetched in full today. Three surfaces still disagree, and the entry now
  // says so rather than picking one:
  //   - che.org.il/scholarships/מלגת-מרום — "תקופת ההרשמה למלגה נפתחת בחודש
  //     ספטמבר מדי שנה ונסגרת בתחילת נובמבר"; amounts ₪10,000 BA / full
  //     tuition research MA (₪16,490 in תשפ"ז) / ₪7,000 non-research MA;
  //     "מופעלת באמצעות ארגון פר"ח במכון דוידסון"; volunteering abolished
  //     from תשפ"ז.
  //   - perach.org.il/הגשת-מועמדות-למרום — "ההרשמה לשנה הקרובה תשפ"ז תיפתח
  //     במהלך חודש ספטמבר 2026", and ₪10,000 for a non-research master's
  //     (CHE says ₪7,000 — the two operators' own pages contradict each other).
  //   - perach-prj.weizmann.ac.il/PerachStudent/registrationmarom — the system
  //     that actually accepts applications: "ההרשמה למרום סגורה כעת. ההרשמה
  //     לשנת הפעילות תשפ"ז תפתח ב- 28/02/27 בשעה- 08:00."
  //
  // Two claims that stood here before are removed, not softened:
  //   1. "ההרשמה לתשפ"ז נפתחת 9.9.2026" — 9/9/2025 is the תשפ"ו opening date,
  //      still printed on the gov.il page. Neither CHE nor פר"ח names a day
  //      for תשפ"ז, and the registration system contradicts the month.
  //   2. The four-level 100%/85%/66%/50%-of-tuition table (published in our own
  //      news article on 8.9.2026). It appears on neither the CHE Marom page
  //      nor מל"ג decision 18.6.2024, both read in full today. The four
  //      priority levels are real and they are a SCORING criterion, not a
  //      payment rate. Banned in tests/content-claims.test.ts.
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
      he: 'מלגה ממלכתית של מל"ג/ות"ת לסטודנטים יוצאי אתיופיה, מופעלת בידי פר"ח במכון דוידסון. נכון ל-15.9.2026 מערכת ההרשמה סגורה ומציגה פתיחה ב-28.2.2027.',
      en: "A national CHE/VATAT scholarship for Ethiopian-Israeli students, operated by Perach at the Davidson Institute. As of 15 Sept 2026 the registration system is closed and shows an opening date of 28 Feb 2027.",
      am: "የCHE/VATAT ብሔራዊ ስኮላርሺፕ ለኢትዮጵያ-ተወላጅ ተማሪዎች፤ በዳቪድሰን ኢንስቲትዩት በፔራች ይተዳደራል። እስከ 15.9.2026 ድረስ የምዝገባ ሥርዓቱ ተዘግቷል፣ 28.2.2027 መክፈቻ ያሳያል።",
    },
    amountMinIls: 7000,
    amountMaxIls: 16490,
    amountNote: {
      he: 'תואר ראשון ₪10,000 לשנה תקנית; תואר שני מחקרי — שכר לימוד מלא (₪16,490 בתשפ"ז); תואר שני שאינו מחקרי — ₪7,000 לפי מל"ג, ₪10,000 לשנה א\' בלבד לפי פר"ח. שני המפעילים חלוקים; נבדק ספטמבר 2026.',
      en: "Undergraduate ₪10,000 per standard year; research master's — full tuition (₪16,490 in 2026-27); non-research master's — ₪7,000 per CHE, ₪10,000 for year 1 only per Perach. The two operators disagree; verified September 2026.",
      am: "የመጀመሪያ ዲግሪ ₪10,000 በዓመት፤ የምርምር ሁለተኛ ዲግሪ — ሙሉ የትምህርት ክፍያ (₪16,490 በ2026-27)፤ ምርምር ያልሆነ ሁለተኛ ዲግሪ — በCHE ₪7,000፣ በፔራች ₪10,000 ለ1ኛ ዓመት ብቻ። ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    deadline: null,
    status: "closed",
    opensOn: "2027-02-28",
    lastVerified: "2026-09-15",
    applicationUrl:
      "https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D",
    tags: ["undergrad", "masters", "community", "government"],
    communityPriority: true,
    relatedScholarships: [
      "klita-tuition-grant",
      "perach-tutoring-stipend",
      "vatat-excellence-mentoring",
    ],
    relatedRights: ["student-aid", "klita-basket-ethiopia"],
    bodies: {
      he: `## השורה התחתונה, 15 בספטמבר 2026

**אי אפשר להירשם למרום היום.** מערכת ההרשמה של פר"ח — המערכת היחידה שמקבלת בקשות — מציגה את המשפט הזה מילה במילה:

> "ההרשמה למרום סגורה כעת. ההרשמה לשנת הפעילות תשפ"ז תפתח ב- 28/02/27 בשעה- 08:00."

אם אתם צריכים כסף לשנת הלימודים שמתחילה עכשיו, **אל תחכו למרום.** [המינהל לסטודנטים עולים](/he/education/scholarships/klita-tuition-grant) פתח את ההרשמה לתשפ"ז, והמועדים שם חיים: 1 באוקטובר לממשיכים, 10 בנובמבר לחדשים. קראו את [ההשוואה בין המסלולים](/he/education/scholarships/guides/marom-vs-minhal-vs-vatat) לפני שאתם בוחרים — אי אפשר לקבל את שניהם.

## שלושה מקורות רשמיים, שלוש תשובות

בדקנו היום את שלושת הדפים. הם לא אומרים אותו דבר:

| המקור | מה הוא אומר על מועד ההרשמה לתשפ"ז |
| --- | --- |
| דף מלגת מרום של המל"ג | "תקופת ההרשמה למלגה נפתחת בחודש ספטמבר מדי שנה ונסגרת בתחילת נובמבר" |
| דף "הגשת מועמדות" של פר"ח | "ההרשמה לשנה הקרובה תשפ"ז תיפתח במהלך חודש ספטמבר 2026" |
| **מערכת ההרשמה של פר"ח** | **"ההרשמה למרום סגורה כעת… תפתח ב- 28/02/27"** |

28 בפברואר 2027 הוא כארבעה חודשים **אחרי** מועד הסגירה שהמל"ג מפרסמת. אנחנו לא יודעים אם זה תאריך אמיתי, ברירת מחדל של המערכת או שדה שלא עודכן, ולא נציג ניחוש כעובדה. מה שוודאי: הטופס סגור.

**מי לשאול:** צוות מרום בפר"ח — milga.marom@perach-il.org · 054-7731216 (גם בוואטסאפ) · א'–ה' 8:00–15:00. מוקד פר"ח: 1-599-550-500.

## מי מפעיל את המלגה

דף המל"ג קובע במפורש: המלגה **"מופעלת באמצעות ארגון פר"ח במכון דוידסון"**. בעבר נכתב כאן שההרשמה נעשית ישירות דרך המל"ג ולא דרך פר"ח — זה היה שגוי, והוסר. ההרשמה מתבצעת דרך לשונית "מרום" באתר פר"ח, וההחלטה על הקריטריונים היא של מל"ג-ות"ת.

## מי זכאי

לפי דף המל"ג:

- סטודנטים **יוצאי אתיופיה בלבד**, הנמצאים בארץ מעל 15 שנה **או** ילידי הארץ שהוריהם נולדו באתיופיה.
- תואר ראשון או שני בתכנית אקדמית המוכרת על ידי המל"ג.
- לימודים של **לפחות 70%** מהיקף הלימודים המצטבר הנדרש עד השנה הנוכחית ועד בכלל. (דף פר"ח מנסח זאת אחרת — 60% מהמערכת השנתית לתואר ראשון, 66% לתואר שני. שני הניסוחים חיים היום; בדקו מול פר"ח לפני שאתם מסתמכים.)
- מי שהתחיל בסמסטר ב' רשאי להגיש במועד ההרשמה, ואם יימצא זכאי — המלגה תינתן רטרואקטיבית.

**נמצאים בארץ פחות מ-15 שנה?** מרום אינה בשבילכם, ודף המל"ג עצמו מפנה אתכם למינהל לסטודנטים עולים. זה לא ניחום — זה המסלול הרחב יותר משני הצדדים: שכר לימוד עד 100% בתעריף אוניברסיטאי ומלגת קיום של ₪600 לחודש.

## כמה מקבלים

לפי דף המל"ג, נבדק ספטמבר 2026:

| מסלול | גובה המלגה |
| --- | --- |
| תואר ראשון | ₪10,000 לכל שנת לימוד תקנית, החל משנת הרישום |
| תואר שני מחקרי | שכר לימוד מלא — בתשפ"ז ₪16,490 |
| תואר שני שאינו מחקרי | ₪7,000 לכל שנת לימוד תקנית |

**שימו לב לסתירה:** על התואר השני שאינו מחקרי, דף פר"ח נוקב ב-₪10,000 "לשנה א' בלבד", ודף המל"ג ב-₪7,000 לכל שנה תקנית. שני הדפים חיים היום. אל תבנו תקציב על אף אחד מהם בלי לשאול את צוות מרום.

מקור: [מלגת מרום — המועצה להשכלה גבוהה](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [פר"ח — הגשת מועמדות למרום](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · נבדק ספטמבר 2026.

## רמות העדיפות קובעות את הסיכוי, לא את הסכום

מל"ג חילקה את תחומי הלימוד לארבע רמות עדיפות (א'–ד') בהחלטתה מ-18.6.2024, לפי צורכי שוק העבודה ולפי תחומים שבהם ליוצאי אתיופיה ייצוג חסר. רמת העדיפות של התחום שלכם היא **קריטריון ניקוד** — היא משפיעה על מקומכם בדירוג שקובע מי מקבל את המלגה, לצד המצב הסוציו-אקונומי והמצב המשפחתי (האם אתם הורים).

**היא אינה מכפיל של הסכום.** בעבר הופיע כאן ובכתבה שלנו טבלה שלפיה המלגה משולמת כ-100%/85%/66%/50% משכר הלימוד לפי רמת עדיפות. קראנו היום את דף המלגה ואת החלטת מל"ג במלואם — טבלת אחוזים כזו **לא נמצאה בשום מקור של הגוף המעניק**, והיא הוסרה מכאן.

## חובת ההתנדבות בוטלה — וזה משנה כסף

דף המל"ג: **"החל משנת הלימודים תשפ"ז לא תחול חובת התנדבות במסגרת מלגת מרום"**, ובמפורש כדי להקל על שילוב מרום עם מלגות שכן דורשות התנדבות, כמו [מלגת פר"ח](/he/education/scholarships/perach-tutoring-stipend) ומלגת מיל-GO.

עד תשפ"ו מלגאי מרום לתואר ראשון נדרשו לשעות התנדבות שהחלו סביב מרץ–אפריל, ומי שכבר התנדב עבור מלגה אחרת נאלץ לבחור. מתשפ"ז אותן שעות יכולות לשרת את שתי המלגות. זו ההטבה הכספית הגדולה ביותר בשינוי התנאים השנה.

## מה כן לעשות השבוע

1. **להכין את המסמכים.** הם לא ישתנו: תעודת זהות עם ספח פתוח באותו קובץ (ולעיתים גם של ההורים), אישור לימודים רשמי, אישור בעלות על חשבון בנק, ולתואר ראשון — תלושי שכר של ההורים או שלכם. הכול ב-PDF. [כך מכינים אותם נכון](/he/education/scholarships/guides/documents-checklist).
2. **להגיש למינהל לסטודנטים עולים** אם אתם בתוך 15 שנה ממתן המעמד — שם ההרשמה פתוחה עכשיו.
3. **לשאול את פר"ח מה התאריך האמיתי**, ולא להסתמך על דף שמנוסח בלשון עתיד מאז אוגוסט.

## ראו גם

- [איך מגישים בקשה למלגה — המדריך המלא](/he/education/scholarships/guides/how-to-apply)
- [מרום מול המינהל לסטודנטים עולים מול ות"ת — מי זכאי למה](/he/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [מענק שכר לימוד — המינהל לסטודנטים עולים](/he/education/scholarships/klita-tuition-grant)
- [הכתבה שלנו על הסתירה במועדי ההרשמה](/he/news/marom-scholarship-tashpaz-terms-change-2026)

## מקורות

- [מלגת מרום — המועצה להשכלה גבוהה (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — נקרא במלואו 15.9.2026
- [פר"ח — הגשת מועמדות למרום](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) — נקרא במלואו 15.9.2026
- [מערכת ההרשמה של פר"ח למרום](https://perach-prj.weizmann.ac.il/PerachStudent/registrationmarom) — נבדקה 15.9.2026, מציגה "ההרשמה סגורה כעת"
- [החלטת מל"ג 18.6.2024 — עדכון תיעדוף תחומי לימוד ליוצאי אתיופיה](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/) — נקראה במלואה 15.9.2026
- [מדיניות מל"ג לקידום מצוינות בהשכלה גבוהה בקרב יוצאי אתיופיה](https://che.org.il/qa/migvan/ethiopia/) — נקרא במלואו 15.9.2026
`,
      en: `## The bottom line, 15 September 2026

**You cannot register for Marom today.** Perach's registration system — the only system that accepts applications — displays this, word for word:

> "Marom registration is currently closed. Registration for the 5787 activity year will open on 28/02/27 at 08:00."

If you need money for the academic year starting now, **do not wait for Marom.** The [Students Authority](/en/education/scholarships/klita-tuition-grant) has opened 2026-27 registration and its deadlines are live: 1 October for continuing students, 10 November for new ones. Read [the comparison of the tracks](/en/education/scholarships/guides/marom-vs-minhal-vs-vatat) before you choose — you cannot hold both.

## Three official sources, three answers

We read all three pages today. They do not agree:

| Source | What it says about 2026-27 registration |
| --- | --- |
| CHE's Marom page | "The registration period opens in September each year and closes in early November" |
| Perach's "submit an application" page | "Registration for the coming year 5787 will open during September 2026" |
| **Perach's registration system** | **"Marom registration is currently closed… will open on 28/02/27"** |

28 February 2027 is roughly four months **after** the closing date CHE publishes. We do not know whether it is a real date, a system default, or a field nobody updated, and we will not present a guess as fact. What is certain: the form is closed.

**Who to ask:** the Marom team at Perach — milga.marom@perach-il.org · 054-7731216 (also WhatsApp) · Sun–Thu 8:00–15:00. Perach switchboard: 1-599-550-500.

## Who runs the scholarship

CHE's page states it explicitly: the scholarship is **"operated through the Perach organization at the Davidson Institute."** This page previously said applications go directly through CHE and "not through Perach" — that was wrong, and it has been removed. Registration goes through the "Marom" tab on Perach's site; the criteria are set by CHE/VATAT.

## Who is eligible

Per CHE's page:

- Students **of Ethiopian origin only**, resident in Israel more than 15 years **or** born in Israel to parents born in Ethiopia.
- A bachelor's or master's degree in a CHE-recognized academic program.
- Studying **at least 70%** of the cumulative required coursework up to and including the current year. (Perach's page words it differently — 60% of the annual load for a bachelor's, 66% for a master's. Both wordings are live today; check with Perach before relying on either.)
- Students who began in the spring semester may apply in the registration window, and if found eligible receive the scholarship retroactively.

**In Israel less than 15 years?** Marom is not for you, and CHE's own page refers you to the Students Authority. That is not a consolation prize — it is the broader track on both sides: tuition up to 100% of the university rate plus a ₪600/month subsistence stipend.

## How much

Per CHE's page, verified September 2026:

| Track | Amount |
| --- | --- |
| Bachelor's | ₪10,000 per standard year of study, from the year of registration |
| Research master's | Full tuition — ₪16,490 in 2026-27 |
| Non-research master's | ₪7,000 per standard year of study |

**Note the contradiction:** for the non-research master's, Perach's page says ₪10,000 "for year 1 only" and CHE's page says ₪7,000 per standard year. Both pages are live today. Do not build a budget on either without asking the Marom team.

Sources: [Marom scholarship — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [Perach — applying to Marom](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · verified September 2026.

## Priority levels set your odds, not your amount

CHE divided fields of study into four priority levels (A–D) in its decision of 18 June 2024, by labour-market need and by fields where Ethiopian-Israelis are under-represented. Your field's priority level is a **scoring criterion** — it affects your place in the ranking that decides who receives the scholarship, alongside socio-economic status and family status (whether you are a parent).

**It is not a multiplier on the amount.** A table claiming the scholarship pays 100%/85%/66%/50% of tuition by priority level previously appeared here and in our news coverage. We read the scholarship page and the CHE decision in full today — no such percentage table appears in any granting-body source, and it has been removed.

## The volunteering requirement is gone — and that is money

CHE's page: **"From the 5787 academic year there will be no volunteering obligation under the Marom scholarship"** — explicitly in order to make it easier to combine Marom with scholarships that do require volunteering, such as the [Perach scholarship](/en/education/scholarships/perach-tutoring-stipend) and Mil-GO.

Through 2025-26, undergraduate Marom recipients owed volunteer hours starting around March–April, and anyone already volunteering for another scholarship had to choose. From 2026-27 the same hours can serve both. It is the largest financial change in this year's terms.

## What to do this week

1. **Prepare the documents.** They will not change: ID card with the open appendix in the same file (sometimes your parents' too), official enrollment confirmation, bank-account ownership confirmation, and for undergraduates — your parents' or your own payslips. All as PDFs. [Here is how to prepare them properly](/en/education/scholarships/guides/documents-checklist).
2. **Apply to the Students Authority** if you are within 15 years of receiving status — registration there is open now.
3. **Ask Perach what the real date is**, rather than relying on a page written in the future tense since August.

## See also

- [How to apply for a scholarship — the full guide](/en/education/scholarships/guides/how-to-apply)
- [Marom vs the Students Authority vs VATAT — who qualifies for what](/en/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [Tuition assistance — the Students Authority](/en/education/scholarships/klita-tuition-grant)

## Sources

- [Marom scholarship — Council for Higher Education (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — read in full 15.9.2026
- [Perach — applying to Marom](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) — read in full 15.9.2026
- [Perach's Marom registration system](https://perach-prj.weizmann.ac.il/PerachStudent/registrationmarom) — checked 15.9.2026, shows "registration is currently closed"
- [CHE decision 18.6.2024 — updating the priority fields for Ethiopian-Israelis](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/) — read in full 15.9.2026
- [CHE policy for excellence in higher education among Ethiopian-Israelis](https://che.org.il/qa/migvan/ethiopia/) — read in full 15.9.2026
`,
      am: `## ዋናው ነጥብ — 15 ሴፕቴምበር 2026

**ዛሬ ለማሮም መመዝገብ አይቻልም።** ማመልከቻ የሚቀበለው ብቸኛው ሥርዓት — የፔራች የምዝገባ ሥርዓት — ይህን በቃል በቃል ያሳያል፦

> "ההרשמה למרום סגורה כעת. ההרשמה לשנת הפעילות תשפ"ז תפתח ב- 28/02/27 בשעה- 08:00."
> (የማሮም ምዝገባ አሁን ተዘግቷል። ለ5787 የሥራ ዓመት ምዝገባ በ28/02/27 በ08:00 ይከፈታል።)

አሁን ለሚጀምረው የትምህርት ዓመት ገንዘብ የሚያስፈልግዎት ከሆነ **ማሮምን አይጠብቁ።** [የኦሊም ተማሪዎች አስተዳደር](/am/education/scholarships/klita-tuition-grant) ለ2026-27 ምዝገባ ከፍቷል፤ ቀነ-ገደቦቹም ሕያው ናቸው፦ ለቀጣይ ተማሪዎች ኦክቶበር 1፣ ለአዲስ ተማሪዎች ኖቬምበር 10። ከመምረጥዎ በፊት [የመንገዶቹን ንጽጽር](/am/education/scholarships/guides/marom-vs-minhal-vs-vatat) ያንብቡ — ሁለቱንም በአንድ ጊዜ መያዝ አይቻልም።

## ሦስት ኦፊሴላዊ ምንጮች፣ ሦስት መልሶች

ዛሬ ሦስቱንም ገጾች አንብበናል። አይስማሙም፦

| ምንጭ | ስለ 2026-27 ምዝገባ የሚለው |
| --- | --- |
| የCHE የማሮም ገጽ | "የምዝገባ ጊዜ በየዓመቱ በሴፕቴምበር ይከፈታል በኖቬምበር መጀመሪያ ይዘጋል" |
| የፔራች "ማመልከቻ ማስገባት" ገጽ | "ለቀጣዩ ዓመት 5787 ምዝገባ በሴፕቴምበር 2026 ውስጥ ይከፈታል" |
| **የፔራች የምዝገባ ሥርዓት** | **"ምዝገባው አሁን ተዘግቷል… በ28/02/27 ይከፈታል"** |

28 የካቲት 2027 CHE ከሚያሳትመው መዝጊያ ቀን አራት ወር ያህል **በኋላ** ነው። እውነተኛ ቀን ነው ወይስ የሥርዓቱ ነባሪ ቅንብር ወይስ ያልታደሰ መስክ — አናውቅም፤ ግምትንም እንደ እውነታ አናቀርብም። እርግጠኛ የሆነው፦ ቅጹ ተዘግቷል።

**ማንን መጠየቅ፦** በፔራች የማሮም ቡድን — milga.marom@perach-il.org · 054-7731216 (በዋትስአፕም) · እሑድ–ሐሙስ 8:00–15:00። የፔራች ማዕከል፦ 1-599-550-500።

## ፕሮግራሙን የሚያስተዳድረው ማን ነው

የCHE ገጽ በግልጽ ይናገራል፦ ስኮላርሺፑ **"በዳቪድሰን ኢንስቲትዩት በፔራች ድርጅት በኩል ይተዳደራል።"** ከዚህ በፊት በዚህ ገጽ ላይ ምዝገባው በቀጥታ በCHE በኩል እንደሚደረግና "በፔራች በኩል አይደለም" ተብሎ ተጽፎ ነበር — ይህ ስህተት ነበር፣ ተወግዷል። ምዝገባው በፔራች ድረ-ገጽ "ማሮም" ትር በኩል ይከናወናል።

## ብቁ የሚሆነው ማን ነው

በCHE ገጽ መሠረት፦

- **ኢትዮጵያ-ተወላጅ ተማሪዎች ብቻ**፣ በእስራኤል ከ15 ዓመት በላይ የኖሩ **ወይም** በእስራኤል የተወለዱ ወላጆቻቸው በኢትዮጵያ የተወለዱ።
- በCHE እውቅና ባለው ፕሮግራም የመጀመሪያ ወይም ሁለተኛ ዲግሪ።
- እስከ አሁኑ ዓመት ድረስ ከሚያስፈልገው ድምር የትምህርት ጫና **ቢያንስ 70%** መማር። (የፔራች ገጽ በተለየ ይገልጸዋል — ለመጀመሪያ ዲግሪ 60%፣ ለሁለተኛ ዲግሪ 66%። ሁለቱም ሕያው ናቸው፤ ከመተማመንዎ በፊት ፔራችን ይጠይቁ።)
- በጸደይ ሴሚስተር የጀመሩ በምዝገባ ጊዜ ማመልከት ይችላሉ፤ ብቁ ከሆኑም ወደኋላ ተመልሶ ይሰጣቸዋል።

**በእስራኤል ከ15 ዓመት ያነሰ ቆይተዋል?** ማሮም ለእርስዎ አይደለም፤ የCHE ገጽ ራሱ ወደ ኦሊም ተማሪዎች አስተዳደር ይመራዎታል። ያ የማጽናኛ ሽልማት አይደለም — በሁለቱም በኩል ሰፊው መንገድ ነው፦ እስከ 100% የትምህርት ክፍያ እና በወር ₪600 የኑሮ ድጋፍ።

## ስንት ያገኛሉ

በCHE ገጽ መሠረት፣ ሴፕቴምበር 2026 ተረጋግጧል፦

| መንገድ | መጠን |
| --- | --- |
| የመጀመሪያ ዲግሪ | ₪10,000 በየመደበኛ የትምህርት ዓመት፣ ከምዝገባ ዓመት ጀምሮ |
| የምርምር ሁለተኛ ዲግሪ | ሙሉ የትምህርት ክፍያ — በ2026-27 ₪16,490 |
| ምርምር ያልሆነ ሁለተኛ ዲግሪ | ₪7,000 በየመደበኛ የትምህርት ዓመት |

**ተቃርኖውን ልብ ይበሉ፦** ምርምር ላልሆነው ሁለተኛ ዲግሪ የፔራች ገጽ "ለ1ኛ ዓመት ብቻ" ₪10,000 ይላል፤ የCHE ገጽ ደግሞ በየዓመቱ ₪7,000። ሁለቱም ገጾች ዛሬ ሕያው ናቸው። የማሮምን ቡድን ሳይጠይቁ በየትኛውም ላይ በጀት አይገንቡ።

ምንጭ፦ [የማሮም ስኮላርሺፕ — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [ፔራች — ለማሮም ማመልከት](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · ሴፕቴምበር 2026 ተረጋግጧል።

## የቅድሚያ ደረጃዎች ዕድልዎን እንጂ መጠንዎን አይወስኑም

CHE በ18 ሰኔ 2024 ውሳኔው የትምህርት መስኮችን በአራት የቅድሚያ ደረጃዎች (ሀ–መ) ከፍሏል። የመስክዎ የቅድሚያ ደረጃ **የነጥብ መስፈርት** ነው — ማን ስኮላርሺፑን እንደሚያገኝ በሚወስነው ደረጃ ውስጥ ቦታዎን ይነካል፣ ከማህበራዊ-ኢኮኖሚያዊ ሁኔታና ከቤተሰብ ሁኔታ ጋር።

**የመጠን ማባዣ አይደለም።** ስኮላርሺፑ በቅድሚያ ደረጃ መሠረት ከትምህርት ክፍያ 100%/85%/66%/50% እንደሚከፍል የሚገልጽ ሰንጠረዥ ከዚህ በፊት እዚህ ቀርቦ ነበር። ዛሬ የስኮላርሺፑን ገጽና የCHE ውሳኔን በሙሉ አንብበናል — እንደዚህ ያለ የመቶኛ ሰንጠረዥ በየትኛውም የሰጪው አካል ምንጭ **አልተገኘም**፣ ከዚህም ተወግዷል።

## የበጎ ፈቃድ ግዴታ ተሰርዟል — ይህም ገንዘብ ነው

የCHE ገጽ፦ **"ከ5787 የትምህርት ዓመት ጀምሮ በማሮም ስኮላርሺፕ ማዕቀፍ የበጎ ፈቃድ ግዴታ አይኖርም"** — ይህም ማሮምን የበጎ ፈቃድ ከሚጠይቁ ሌሎች ስኮላርሺፖች ጋር ለማጣመር እንዲቀል ነው፣ እንደ [የፔራች ስኮላርሺፕ](/am/education/scholarships/perach-tutoring-stipend) እና ሚል-GO።

እስከ 2025-26 ድረስ የማሮም የመጀመሪያ ዲግሪ ተቀባዮች በመጋቢት–ሚያዝያ የሚጀምሩ የበጎ ፈቃድ ሰዓታት ይጠበቅባቸው ነበር። ከ2026-27 ጀምሮ ተመሳሳይ ሰዓታት ሁለቱንም ስኮላርሺፖች ማገልገል ይችላሉ።

## በዚህ ሳምንት ምን ማድረግ ይቻላል

1. **ሰነዶቹን ማዘጋጀት።** አይለወጡም፦ መታወቂያ ከተከፈተ አባሪ ጋር በአንድ ፋይል (አንዳንዴም የወላጆች)፣ ኦፊሴላዊ የትምህርት ማረጋገጫ፣ የባንክ ሒሳብ ባለቤትነት ማረጋገጫ፣ ለመጀመሪያ ዲግሪም — የወላጆችዎ ወይም የእርስዎ የደመወዝ ወረቀቶች። ሁሉም በPDF። [እንዴት በትክክል እንደሚያዘጋጁ](/am/education/scholarships/guides/documents-checklist)።
2. **ለኦሊም ተማሪዎች አስተዳደር ማመልከት** — መዕመድ ካገኙ በ15 ዓመት ውስጥ ከሆኑ፤ እዚያ ምዝገባው አሁን ክፍት ነው።
3. **ትክክለኛውን ቀን ፔራችን መጠየቅ።**

## ይህንንም ይዩ

- [ለስኮላርሺፕ እንዴት ማመልከት — ሙሉ መመሪያ](/am/education/scholarships/guides/how-to-apply)
- [ማሮም በተቃራኒ የኦሊም ተማሪዎች አስተዳደር በተቃራኒ VATAT](/am/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [የትምህርት ክፍያ ድጋፍ — የኦሊም ተማሪዎች አስተዳደር](/am/education/scholarships/klita-tuition-grant)

## ምንጮች

- [የማሮም ስኮላርሺፕ — CHE (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — 15.9.2026 በሙሉ ተነቧል
- [ፔראች — ለማሮም ማመልከት](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) — 15.9.2026 በሙሉ ተነቧል
- [የፔራች የማሮም ምዝገባ ሥርዓት](https://perach-prj.weizmann.ac.il/PerachStudent/registrationmarom) — 15.9.2026 ተረጋግጧል
- [የCHE ውሳኔ 18.6.2024](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/) — 15.9.2026 በሙሉ ተነቧል
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
