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

  // ── TED-168 ───────────────────────────────────────────────────────────────
  // Six more entries retired after a re-verification sweep against each
  // granting body's own current page (2026-09-15). Each redirects to the entry
  // that actually answers the intent it was ranking for, rather than 404ing
  // demand the portal can serve.
  //
  // The Jewish Agency publishes no study-scholarship program: no eligibility,
  // no amounts, no application route; jewishagency.org/scholarships/ is a 404
  // and its own site search for "מלגה" returns no program. The ₪8,000–₪18,000
  // and the "within 5 years of aliyah" window were invented. The real
  // government study aid for olim is the Students Authority grant.
  "jewish-agency-aliyah": "klita-tuition-grant",
  // Duplicate of tech-career-org, and every number in it was unsourced: the
  // ₪30,000–₪50,000 range, the ₪3,500–₪5,000 monthly stipend, "bootcamp
  // בחינם", the 22–45 age band, "90% placement" (the org says 88%) and "250+
  // partner companies" appear on no page of tech-career.org.
  "tech-career-bootcamp-stipend": "tech-career-org",
  // Duplicate of isef-fellowship. Its program name "עמיתי אייסף" appears
  // nowhere on ISEF's site and its applicationUrl was a hard 404.
  "isef-scholarship": "isef-fellowship",
  // An org profile filed as a scholarship — no amount, no deadline, and
  // /orgs/olim-beyahad already exists.
  "olim-beyachad-org": "olim-beyahad-career-mentorship",
  // The Open University awards no scholarship of its own. Its page is a
  // support program that routes students to מינהל הסטודנטים and מרום.
  "openu-scholarship": "marom-che",
  // "תוכנית ות"ת למצוינות ומנטורינג" is not a name ות"ת uses. The instrument
  // is a 2018 budget line with no student application route at all, and the
  // URL cited for it contains no occurrence of מנטור/מנטורינג/חונכות/ליווי.
  "vatat-excellence-mentoring": "marom-che",
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
    // TED-168: TED-157 zeroed these on the reasoning that "אייס"ף אינה מפרסמת
    // סכום אחיד". That was a false negative — ISEF publishes a per-track range
    // on its own pages, and did when TED-157 ran. Master's track, read verbatim
    // from isef.org.il/מלגות-לתואר-שני today: "מלגה בגובה שבין 21,000 ₪ ל-
    // 23,500 ₪, מדי שנה בשיתוף המוסדות האקדמאיים ושותפים נוספים". The
    // bachelor's track page states ₪23,000–₪28,000. The fund reserves the right
    // to change both.
    amountMinIls: 21000,
    amountMaxIls: 23500,
    amountNote: {
      he: "תואר שני: ₪21,000–₪23,500 לשנה, בשיתוף המוסד האקדמי. תואר ראשון: ₪23,000–₪28,000 לשנה. הקרן שומרת לעצמה את הזכות לשנות. מקור: isef.org.il · נבדק ספטמבר 2026.",
      en: "Master's: ₪21,000–₪23,500 a year, jointly with the academic institution. Bachelor's: ₪23,000–₪28,000 a year. The fund reserves the right to change both. Source: isef.org.il · verified September 2026.",
      am: "ሁለተኛ ዲግሪ፦ በዓመት ₪21,000–₪23,500፤ የመጀመሪያ ዲግሪ፦ ₪23,000–₪28,000። ምንጭ፦ isef.org.il · ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    // "ולא יאוחר מסוף יולי" — isef.org.il/מלגות-לתואר-שני. The תשפ"ז round is
    // over: the homepage says "ההרשמה לתכנית הדוקטורנטים ולתואר השני הסתיימה".
    deadline: "2026-07-31",
    status: "closed",
    lastVerified: "2026-09-15",
    applicationUrl:
      "https://www.isef.org.il/%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%9C%D7%AA%D7%95%D7%90%D7%A8-%D7%A9%D7%A0%D7%99/",
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

- **תואר שני: ₪21,000–₪23,500 לשנה**, "בשיתוף המוסדות האקדמאיים ושותפים נוספים" — לשון אתר הקרן. תואר ראשון: ₪23,000–₪28,000 לשנה. הקרן שומרת לעצמה את הזכות לשנות סכומים
- ליווי אקדמי וקריירה דרך רשת בוגרי אייס"ף

## מה שחייבים לדעת לפני שמגישים — התנאים שמפילים מועמדים

אלה תנאים שאייס"ף מפרסמת בעצמה, והם מפילים אנשים שלא קראו אותם:

- **נוכחות חובה** בתכנית ארצית למנהיגות חברתית — כ-10 מפגשים בשנה, **בימי שישי, בתל אביב**. אם אתם גרים בצפון או בדרום, זה עשרה ימי נסיעה
- **60 שעות התנדבות בשנה** בפרויקט חינוכי-חברתי של הקרן
- **"הסטודנט/ית אינו לומד/ת בימי שישי"** — תנאי מפורש. תכנית לימודים עם קורס יום שישי פוסלת
- מסלול התואר השני פתוח רק במוסדות שבהם הקרן פועלת
- התחייבות שלא לפעול נגד ערכי הקרן, המגדירה עצמה "קרן א-פוליטית, יהודית וציונית"

## איך פונים?

1. עם הקבלה ללימודים באחד המוסדות שבהם הקרן פועלת, **ולא יאוחר מסוף יולי**, ממלאים את טפסי המועמדות באתר
2. מי שנמצא מתאים מוזמן ל**סדנת מיון וראיון קבלה**

(מספר ההמלצות הנדרש וזמן התשובה לא מופיעים בשום דף של הקרן. מה שהיה כתוב כאן בעבר — "2 המלצות", "תשובה תוך 4–8 שבועות" — הוסר.)

## תאריכים חשובים

ההרשמה השנתית נסגרת **בסוף יולי**. נכון ל-15.9.2026 דף הבית של הקרן מודיע: **"ההרשמה לתכנית הדוקטורנטים ולתואר השני הסתיימה"** — מחזור תשפ"ז נסגר.

מקור: [אייס"ף — מלגות לתואר שני](https://www.isef.org.il/%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%9C%D7%AA%D7%95%D7%90%D7%A8-%D7%A9%D7%A0%D7%99/) · נבדק ספטמבר 2026.

## ראו גם

- [קרן ע"ש איסף — ISEF](/he/orgs/isef) — הארגון המספק

`,
      en: `## Who is it for?

- **No origin criterion.** ISEF selects first-generation higher-education students from the geographic and social periphery. Community members qualify like anyone meeting the conditions — but this is not an Ethiopian-specific scholarship, as this page previously stated in error
- Students at a recognized Israeli academic institution
- Socio-economic circumstances are weighed

## What's included?

- **Master's: ₪21,000–₪23,500 a year**, "jointly with the academic institutions and further partners" — the fund's own wording. Bachelor's: ₪23,000–₪28,000 a year. The fund reserves the right to change amounts
- Academic and career mentorship through the ISEF alumni network

## What to know before applying — the conditions that disqualify people

These are conditions ISEF publishes itself, and they catch applicants who did not read them:

- **Compulsory attendance** at a national social-leadership program — about 10 meetings a year, **on Fridays, in Tel Aviv**. If you live in the north or the south, that is ten travel days
- **60 volunteer hours a year** on an educational or social project of the fund
- **"The student does not study on Fridays"** — an explicit condition. A timetable with a Friday course disqualifies you
- The master's track runs only at the institutions where the fund operates
- An undertaking not to act against the values of a fund that defines itself as "a non-political, Jewish and Zionist fund"

## How to apply

1. On admission to one of the institutions where the fund operates, **and no later than the end of July**, complete the application forms on the site
2. Suitable candidates are invited to a **screening workshop and admission interview**

(The number of recommendation letters required and the decision turnaround appear on no page of the fund. What previously stood here — "2 letters of recommendation", "decision within 4–8 weeks" — has been removed.)

## Important dates

The annual round closes at the **end of July**. As of 15.9.2026 the fund's homepage announces: **"registration for the doctoral program and the master's has ended"** — the 2026-27 round is closed.

Source: [ISEF — master's scholarships](https://www.isef.org.il/%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%9C%D7%AA%D7%95%D7%90%D7%A8-%D7%A9%D7%A0%D7%99/) · verified September 2026.

## See also

- [ISEF — provider organization](/en/orgs/isef)

`,
      am: `## ለማን ነው?

- ለሁለተኛ ዲግሪ ወይም ለዶክትሬት የሚማሩ ኢትዮጵያ-እስራኤላውያን (1ኛ፣ 2ኛ ወይም 3ኛ ትውልድ)
- በእስራኤል እውቅና ያላቸው ዩኒቨርሲቲዎች (TAU፣ HUJI፣ ቴክኒዮን፣ ባር-ኢላን፣ BGU፣ ሐይፋ፣ ዊይስማን)
- **የትውልድ መስፈርት የለም** — ISEF በቤተሰብ ውስጥ የመጀመሪያ ትውልድ ተማሪዎችን ከዳርቻ ክልሎች ይመርጣል
- የገንዘብ ፍላጎት ግምት ውስጥ ይገባል (ብቻ-ምክንያት አይደለም)

## ምን ይካተታል?

- **ሁለተኛ ዲግሪ፦ በዓመት ₪21,000–₪23,500**፣ "ከአካዳሚክ ተቋማትና ከሌሎች አጋሮች ጋር በጋራ" — የፈንዱ ራሱ አገላለጽ። የመጀመሪያ ዲግሪ፦ በዓመት ₪23,000–₪28,000
- በISEF የቀድሞ ተማሪዎች አውታረ መረብ የአካዳሚክና የሥራ ድጋፍ

## ከማመልከትዎ በፊት ማወቅ ያለብዎ — አመልካቾችን የሚያስወድቁ ሁኔታዎች

- በዓመት **10 ያህል ስብሰባዎች በአርብ ቀናት በቴል አቪቭ** የግዴታ ተሳትፎ
- በዓመት **60 ሰዓት የበጎ ፈቃድ አገልግሎት**
- **"ተማሪው በአርብ ቀናት አይማርም"** — ግልጽ ቅድመ ሁኔታ
- የሁለተኛ ዲግሪ መንገዱ ፈንዱ በሚሠራባቸው ተቋማት ብቻ ነው

## እንዴት ማመልከት ይቻላል?

1. ፈንዱ በሚሠራበት ተቋም ተቀባይነት ሲያገኙ፣ **ከጁላይ መጨረሻ ባልበለጠ**፣ በድረ-ገጹ ያሉትን የዕጩነት ቅጾች ይሙሉ
2. ተስማሚ ከሆኑ ወደ **የማጣሪያ አውደ ጥናትና የቅበላ ቃለ-መጠይቅ** ይጠራሉ

(የሚያስፈልገው የምክር ደብዳቤ ብዛትና የምላሽ ጊዜ በየትኛውም የፈንዱ ገጽ ላይ አይገኙም። ከዚህ በፊት እዚህ የነበረው — "2 የምክር ደብዳቤዎች"፣ "በ4–8 ሳምንታት ውስጥ ምላሽ" — ተወግዷል።)

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
    // TED-168: the ₪10,000 ceiling is conditional and the entry stated it
    // flat — "אפשרות למלגה בגובה 10,000 ש"ח, לעומדים בקריטריונים של הרשות
    // המקומית". Added the ₪2,600 reserve-duty top-up the entry omitted.
    amountMinIls: 7000,
    amountMaxIls: 10000,
    amountNote: {
      he: '₪7,000 עבור 100 שעות חונכות. עד ₪10,000 בחלק מהרשויות — "לעומדים בקריטריונים של הרשות המקומית". ועוד כ-₪2,600 למשרתי מילואים שעמדו בתנאים. מקור: פר"ח · נבדק ספטמבר 2026.',
      en: 'ILS 7,000 for 100 tutoring hours. Up to ILS 10,000 in some municipalities — "for those meeting the local authority\'s criteria". Plus about ILS 2,600 for qualifying reservists. Source: Perach · verified September 2026.',
      am: "ለ100 የማስተማሪያ ሰዓታት ₪7,000። በአንዳንድ ማዘጋጃ ቤቶች እስከ ₪10,000። ለተጠባባቂ አገልጋዮች ተጨማሪ ₪2,600። ምንጭ፦ ፔራች · ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    // TED-168: was `tba`. פר"ח's own page: "ההרשמה לתשפ"ז תפתח ב-2 ספטמבר 2026
    // למינהלות הצפון וליתר המינהלות ב-3 בספטמבר." No closing date published.
    deadline: null,
    status: "open",
    lastVerified: "2026-09-15",
    applicationUrl:
      "https://www.perach.org.il/%D7%AA%D7%94%D7%9C%D7%99%D7%9A-%D7%94%D7%94%D7%A8%D7%A9%D7%9E%D7%94-%D7%9C%D7%A4%D7%A8-%D7%97",
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

- **₪7,000** עבור 100 שעות חונכות — "מלגה בסך של 7,000₪ בביצוע של 100 שעות בלבד", לשון פר"ח
- **עד ₪10,000** בפרויקטים בשיתוף רשויות מקומיות ומוסדות לימוד. שימו לב לתנאי: זה "לעומדים בקריטריונים של הרשות המקומית", ויש לברר מול רכז הפרויקט. זו אינה מלגה שכל חונך מקבל
- **מלגה כפולה** עבור 6 שעות שבועיות — "בכפוף למכסות ולזמינות הסטודנטים"
- **כ-₪2,600 נוספים** למשרתי מילואים שסיימו את החובות ועמדו בתנאים. המענק נכנס ישירות לחשבון הבנק במהלך ספטמבר
- הכשרה פדגוגית

מקור: [פר"ח — על המלגה](https://www.perach.org.il/%D7%A2%D7%9C-%D7%94%D7%9E%D7%9C%D7%92%D7%94) · נבדק ספטמבר 2026.
(הקישור שהופיע כאן בעבר — perach.org.il/about-the-scholarship.html — מחזיר שגיאה 404 ולא ייתכן שנבדק. הוחלף.)

## מתי נפתחת ההרשמה

ההרשמה לתשפ"ז **פתוחה**. לשון פר"ח: "ההרשמה לתשפ"ז תפתח ב-2 ספטמבר 2026 למינהלות הצפון וליתר המינהלות ב-3 בספטמבר", ו"הרכזים יצרו עמכם קשר החל מה-14.9.2026". מועד סגירה לא פורסם.

## איך פונים?

1. רישום דרך מערכת ההרשמה של פר"ח
2. השמה לתלמיד מתאים (לפי גיאוגרפיה ותחום הלימוד)
3. הסכם חונכות לשנה אקדמית

## ראו גם

- [איך מגישים בקשה למלגה — המדריך המלא](/he/education/scholarships/guides/how-to-apply)
- [מלגת מרום](/he/education/scholarships/marom-che) — מתשפ"ז אפשר לצבור את שתיהן על אותן שעות התנדבות
`,
      en: `## Who is it for?

- Undergraduate students at any Israeli academic institution
- Willing to commit to 100 tutoring hours a year — twice a week, an hour and a half each time
- **No grade requirement.** "Psychometric 550+ or GPA 80+" stood here in error; Perach sets no academic threshold, and that condition deterred people for nothing

## What's included?

- **ILS 7,000** for 100 tutoring hours — Perach's own wording is "a stipend of ₪7,000 for performing 100 hours only"
- **Up to ILS 10,000** in projects run with local authorities and institutions. Note the condition: this is "for those meeting the local authority's criteria", and you must check with the project coordinator. It is not a stipend every tutor receives
- **A double stipend** for 6 weekly hours — "subject to quotas and student availability"
- **About ILS 2,600 more** for reservists who completed their obligations and met the conditions; paid straight into the bank account during September
- Pedagogical training

Source: [Perach — about the scholarship](https://www.perach.org.il/%D7%A2%D7%9C-%D7%94%D7%9E%D7%9C%D7%92%D7%94) · verified September 2026.
(The link that stood here before — perach.org.il/about-the-scholarship.html — returns a 404 and cannot have been checked. Replaced.)

## When registration opens

Registration for 2026-27 is **open**. Perach's wording: "registration for 5787 will open on 2 September 2026 for the northern administrations and on 3 September for the rest", and "coordinators will contact you from 14.9.2026". No closing date is published.

## How to apply

1. Register through Perach's registration system
2. Match with a suitable pupil (by geography and field)
3. Annual tutoring agreement

## See also

- [How to apply for a scholarship — the full guide](/en/education/scholarships/guides/how-to-apply)
- [The Marom scholarship](/en/education/scholarships/marom-che) — from 2026-27 the same volunteer hours can serve both

`,
      am: `## ለማን ነው?

- በማንኛውም የእስራኤል አካዳሚክ ተቋም የመጀመሪያ ዲግሪ ተማሪዎች
- በዓመት 100 የማስተማሪያ ሰዓታት — በሳምንት ሁለት ጊዜ
- **የውጤት መስፈርት የለም**

## ምን ይካተታል?

- ለ100 የማስተማሪያ ሰዓታት **₪7,000**
- በአንዳንድ ማዘጋጃ ቤቶች **እስከ ₪10,000** — ነገር ግን "የማዘጋጃ ቤቱን መስፈርቶች ለሚያሟሉ" ብቻ ነው፤ ከፕሮጀክት አስተባባሪው ጋር ማረጋገጥ ያስፈልጋል
- ለ6 ሳምንታዊ ሰዓታት **እጥፍ ድጋፍ**
- ግዴታቸውን ላጠናቀቁ ተጠባባቂ አገልጋዮች **ተጨማሪ ₪2,600 ያህል**
- ፔዳጎጂካል ስልጠና

ምንጭ፦ [ፔራች — ስለ ስኮላርሺፑ](https://www.perach.org.il/%D7%A2%D7%9C-%D7%94%D7%9E%D7%9C%D7%92%D7%94) · ሴፕቴምበር 2026 ተረጋግጧል።

## ምዝገባው መቼ ይከፈታል

ለ2026-27 ምዝገባው **ክፍት ነው**። የፔራች አገላለጽ፦ "ለ5787 ምዝገባ በሴፕቴምበር 2፣ 2026 ይከፈታል"። የመዝጊያ ቀን አልታተመም።

## ይህንንም ይመልከቱ

- [ለስኮላርሺፕ እንዴት ማመልከት — ሙሉ መመሪያ](/am/education/scholarships/guides/how-to-apply)
- [የማሮም ስኮላርሺፕ](/am/education/scholarships/marom-che)
`,
    },
  },

  // 9. Olim Beyahad Career Mentorship
  {
    slug: "olim-beyahad-career-mentorship",
    level: "undergrad",
    providerOrgSlug: "olim-beyahad",
    // TED-168: the organisation runs no program called "ליווי קריירה". Its
    // employment program is "מצוינות ומנהיגות בתעסוקה", run with האגף לתעסוקת
    // אוכלוסיות מגוונות at משרד העבודה. Renamed to what the org calls it.
    name: {
      he: "מצוינות ומנהיגות בתעסוקה — עולים ביחד",
      en: "Excellence & Leadership in Employment — Olim Beyahad",
      am: "በሥራ ስምሪት ልቀትና አመራር — Olim Beyahad",
    },
    shortDescription: {
      he: "תכנית תעסוקה בת 10 חודשים לאקדמאים ולסטודנטים בסמסטר אחרון מהקהילה — מפגשים קבוצתיים, ליווי אישי ומרכז הערכה. אין מלגה כספית.",
      en: "A 10-month employment program for community graduates and final-semester students — group sessions, personal accompaniment and an assessment centre. There is no cash stipend.",
      am: "ለማህበረሰቡ ምሩቃንና በመጨረሻ ሴሚስተር ላሉ ተማሪዎች የ10 ወር የሥራ ስምሪት ፕሮግራም። የገንዘብ ድጋፍ የለም።",
    },
    // TED-168: the ₪6,000–₪12,000 "מלגת השלמה בעת תחילת תפקיד" appears on no
    // page of olim-beyahad.org.il, in any amount. Removed, not softened.
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "אין מלגה כספית. התכנית היא הכשרה, יועץ קריירה וליווי אישי. הסכום שהופיע כאן בעבר לא נמצא בשום דף של העמותה והוסר.",
      en: "There is no cash stipend. The program is training, a career counsellor and personal accompaniment. The amount previously stated here appears on no page of the organisation and was removed.",
      am: "የገንዘብ ድጋፍ የለም። ፕሮግራሙ ስልጠና፣ የሥራ አማካሪና የግል ድጋፍ ነው።",
    },
    // "תאריך פתיחה: התוכנית נפתחת אחת ל 3 חודשים על פי פרסום מקדים." Cohort
    // based with no currently published date — not rolling, not open.
    deadline: null,
    status: "tba",
    lastVerified: "2026-09-15",
    applicationUrl: "https://www.olim-beyahad.org.il/employment",
    tags: ["undergrad", "career-shift", "community", "mentorship"],
    communityPriority: true,
    relatedScholarships: ["tech-career-org", "isef-fellowship"],
    relatedRights: [],
    bodies: {
      he: `## מה זו התכנית באמת

העמותה אינה מפעילה תכנית בשם "ליווי קריירה". התכנית התעסוקתית שלה נקראת **"מצוינות ומנהיגות בתעסוקה"**, ומופעלת בשיתוף האגף לתעסוקת אוכלוסיות מגוונות במשרד העבודה.

## למי היא מיועדת

לשון העמותה: **"הגשת מועמדות לתכנית מתאפשרת לאקדמאים או סטודנטים בסמסטר האחרון ללימודיהם, מכל תחומי הלימוד"**.

- **אין חלון של 5 שנים מסיום התואר.** זה נכתב כאן בעבר ואינו מופיע בשום מקום באתר העמותה. סטודנטים בסמסטר אחרון והנדסאים מצטיינים נכללים
- **יש סף ציונים, והוא לא הופיע כאן:** העמותה כותבת שהמועמדים "בעלי ממוצע ציונים של 70" ומעלה
- הקבלה אינה אוטומטית: **"רישום לתוכנית, ראיון טלפוני ומרכז הערכה הכולל: ראיון אישי, מבחנים קוגניטיביים ודינמיקה קבוצתית"**

## כמה זמן, ומה יש בפנים

לשון העמותה: **"התכנית פועלת לאורך 10 חודשים, כאשר כחודשיים במתכונת של מפגשים קבוצתיים אחת לשבוע — 7 מפגשים מלאים — ו-6 חודשים נוספים של ליווי אישי"**. לא שישה חודשים, ולא שש פגישות מנטור, כפי שנכתב כאן בעבר.

## מה **אין** בתכנית

**אין מלגה כספית.** הסכום "₪6,000–₪12,000 מלגת השלמה בעת תחילת תפקיד" שהופיע כאן אינו מופיע בשום דף של העמותה, בשום סכום. הוא הוסר. גם "300+ מעסיקים שותפים" ו"90% השמה תוך 9 חודשים" אינם מפורסמים על ידי העמותה — היא מציינת ניסיון מצטבר של 18 שנה ושיעור השתלבות גבוה, בלי חלון זמן.

אם אתם צריכים כסף ולא הכשרה, זו אינה הכתובת. ראו את [ההשוואה בין מסלולי המימון](/he/education/scholarships/guides/marom-vs-minhal-vs-vatat).

## מתי אפשר להירשם

**"תאריך פתיחה: התוכנית נפתחת אחת ל-3 חודשים על פי פרסום מקדים."** אין מחזור עם תאריך מפורסם נכון ל-15.9.2026.

מקור: [עולים ביחד — תעסוקה](https://www.olim-beyahad.org.il/employment) · נבדק ספטמבר 2026.

## ראו גם

- [עולים ביחד — פרופיל הארגון](/he/orgs/olim-beyahad)
- [Tech-Career](/he/education/scholarships/tech-career-org)
`,
      en: `## What the program actually is

The organisation runs no program called "career mentorship". Its employment program is **"Excellence and Leadership in Employment"**, run with the Diverse Populations Employment Division of the Ministry of Labour.

## Who it is for

The organisation's wording: **"Applications are open to graduates or students in their final semester of study, from all fields."**

- **There is no 5-year-since-graduation window.** That stood here before and appears nowhere on the organisation's site. Final-semester students and outstanding practical engineers are included
- **There is a grade threshold, and it was missing here:** the organisation states candidates hold a grade average of 70 or above
- Admission is not automatic: **"registration, a telephone interview, and an assessment centre comprising a personal interview, cognitive tests and group dynamics"**

## How long, and what is in it

The organisation's wording: **"The program runs over 10 months, of which about two months are weekly group sessions — 7 full sessions — and a further 6 months of personal accompaniment."** Not six months, and not six mentor meetings, as stood here before.

## What the program does **not** include

**There is no cash stipend.** The "₪6,000–₪12,000 supplementary stipend on job start" that stood here appears on no page of the organisation, in any amount. It has been removed. "300+ partner employers" and "90% placement within 9 months" are likewise not published by the organisation — it states 18 years of accumulated experience and a high integration rate, with no time window.

If you need money rather than training, this is not the address. See [the comparison of the funding tracks](/en/education/scholarships/guides/marom-vs-minhal-vs-vatat).

## When you can register

**"Opening date: the program opens once every 3 months, subject to prior announcement."** There is no cohort with a published date as of 15.9.2026.

Source: [Olim Beyahad — employment](https://www.olim-beyahad.org.il/employment) · verified September 2026.

## See also

- [Olim Beyahad — organisation profile](/en/orgs/olim-beyahad)
- [Tech-Career](/en/education/scholarships/tech-career-org)
`,
      am: `## ፕሮግራሙ በእውነቱ ምንድን ነው

ድርጅቱ "የሥራ ምክር" የሚባል ፕሮግራም አያካሂድም። የሥራ ስምሪት ፕሮግራሙ **"በሥራ ስምሪት ልቀትና አመራር"** ይባላል፤ ከሠራተኛ ሚኒስቴር የተለያዩ ሕዝቦች የሥራ ስምሪት ክፍል ጋር በጋራ ይሠራል።

## ለማን ነው

የድርጅቱ አገላለጽ፦ **"ማመልከት የሚችሉት ምሩቃን ወይም በመጨረሻ ሴሚስተር ላይ ያሉ ተማሪዎች ናቸው፣ ከሁሉም የትምህርት መስኮች።"**

- **ካጠናቀቁ የ5 ዓመት መስኮት የለም።** ከዚህ በፊት እዚህ ተጽፎ ነበር፤ በድርጅቱ ድረ-ገጽ በየትኛውም ቦታ አይገኝም
- **የውጤት ደረጃ አለ፣ እዚህም ጠፍቶ ነበር፦** ድርጅቱ አመልካቾች የ70 እና ከዚያ በላይ አማካይ ውጤት እንዳላቸው ይገልጻል
- ቅበላው ራስ-ሰር አይደለም፦ **ምዝገባ፣ የስልክ ቃለ-መጠይቅ፣ እና የግል ቃለ-መጠይቅ፣ የግንዛቤ ፈተናዎችና የቡድን ተለዋዋጭነት ያካተተ የግምገማ ማዕከል**

## ምን ያህል ጊዜ፣ ምንስ አለው

**"ፕሮግራሙ በ10 ወራት ይካሄዳል፤ ከዚህ ውስጥ ሁለት ወር ያህል ሳምንታዊ የቡድን ስብሰባዎች — 7 ሙሉ ስብሰባዎች — እና ተጨማሪ 6 ወር የግል ድጋፍ።"** ከዚህ በፊት እንደተጻፈው ስድስት ወር ወይም ስድስት የአማካሪ ስብሰባዎች አይደለም።

## ፕሮግራሙ **የሌለው**

**የገንዘብ ድጋፍ የለም።** እዚህ የነበረው "₪6,000–₪12,000" በየትኛውም የድርጅቱ ገጽ ላይ አይገኝም። ተወግዷል። "300+ አጋር አሰሪዎች" እና "በ9 ወር ውስጥ 90% ምደባ" እንዲሁ በድርጅቱ አልታተሙም።

## መቼ መመዝገብ ይቻላል

**"የመክፈቻ ቀን፦ ፕሮግራሙ በየ3 ወሩ ይከፈታል፣ በቅድሚያ ማስታወቂያ መሠረት።"** እስከ 15.9.2026 ድረስ የታተመ ቀን ያለው ዙር የለም።

ምንጭ፦ [Olim Beyahad — ሥራ ስምሪት](https://www.olim-beyahad.org.il/employment) · ሴፕቴምበር 2026 ተረጋግጧል።

## ይህንንም ይመልከቱ

- [Olim Beyahad — የሰጪው ድርጅት](/am/orgs/olim-beyahad)
`,
    },
  },

  // 12. Ministry of Aliyah — Tuition Grant
  {
    slug: "klita-tuition-grant",
    level: "undergrad",
    providerOrgSlug: "ministry-aliyah",
    // TED-168: this entry carried the single highest-harm error in the file.
    // It said eligibility runs "תוך 10 שנים מעלייה". There is no such rule.
    // The general track requires starting studies within 36 MONTHS of
    // receiving status; the EXTENDED track for olim from Ethiopia, Yemen and
    // Bnei Menashe — the one this entry is about — runs to 15 YEARS, with age
    // caps the entry omitted entirely. Someone reading the old page could have
    // been refused at the counter having been told by us that they qualified.
    // Verified against gov.il/he/pages/ethiopian_jews_students_scholarships
    // and gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority,
    // both read in full 2026-09-15.
    name: {
      he: "מלגת שכר לימוד — המינהל לסטודנטים עולים",
      en: "Tuition Scholarship — Students Authority (Ministry of Aliyah)",
      am: "የትምህርት ክፍያ ስኮላርሺፕ — የኦሊም ተማሪዎች አስተዳደር",
    },
    shortDescription: {
      he: 'מסלול הזכאות המורחב לעולי אתיופיה: שכר לימוד עד 100% מהתעריף האוניברסיטאי ומלגת קיום ₪600 לחודש. ההרשמה לתשפ"ז פתוחה — 1.10 לממשיכים, 10.11 לחדשים.',
      en: "The extended eligibility track for olim from Ethiopia: tuition up to 100% of the university tariff plus a ₪600/month subsistence stipend. 2026-27 registration is open — 1 Oct for continuing students, 10 Nov for new ones.",
      am: "ለኢትዮጵያ ኦሊም የተስፋፋው የብቁነት መንገድ፦ እስከ 100% የትምህርት ክፍያና በወር ₪600 የኑሮ ድጋፍ። ለ2026-27 ምዝገባ ክፍት ነው።",
    },
    // No shekel figure for tuition is published: the Authority pays "עד לגובה
    // מלגה מלאה בתעריף אוניברסיטאי (100% שכר לימוד)", a tariff set annually.
    // The ₪12,000–₪22,000 range that stood here appears on no gov.il page.
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: 'שכר לימוד "עד לגובה מלגה מלאה בתעריף אוניברסיטאי (100% שכר לימוד)" — אין סכום קבוע, התעריף מתעדכן שנתית. בנוסף מלגת קיום ₪600 לחודש עד 9 חודשים. מקור: gov.il · נבדק ספטמבר 2026.',
      en: 'Tuition "up to a full scholarship at the university tariff (100% of tuition)" — there is no fixed figure; the tariff is updated annually. Plus a subsistence stipend of ₪600 a month for up to 9 months. Source: gov.il · verified September 2026.',
      am: "የትምህርት ክፍያ እስከ ሙሉ የዩኒቨርሲቲ ታሪፍ (100%) — ቋሚ መጠን የለም። በተጨማሪ በወር ₪600 የኑሮ ድጋፍ እስከ 9 ወር። ምንጭ፦ gov.il · ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    // "ההרשמה לשנת הלימודים תשפ"ז (2026-2027) נפתחה". New students in
    // semester A: 10 November. Continuing students: 1 October — the nearer
    // deadline, stated in the body.
    deadline: "2026-11-10",
    status: "open",
    lastVerified: "2026-09-15",
    applicationUrl:
      "https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority",
    tags: ["undergrad", "olim", "academic", "rights"],
    communityPriority: true,
    relatedScholarships: ["marom-che", "perach-tutoring-stipend"],
    relatedRights: ["klita-basket-ethiopia"],
    bodies: {
      he: `## ההרשמה פתוחה, ושני מועדים כבר קרובים

דף השירות של המינהל אומר היום: **"ההרשמה לשנת הלימודים תשפ"ז (2026-2027) נפתחה"**. המועדים, בלשון הדף:

- **סטודנטים ממשיכים** בסמסטר א' — עד **1 באוקטובר**.
- **סטודנטים חדשים** בסמסטר א' — עד **10 בנובמבר**.
- מתחילים בסמסטר ב' — עד 1 באפריל. מתחילים בסמסטר קיץ — עד 15 באוגוסט.

לצד זה הדף קובע: **"לא יינתן סיוע רטרואקטיבי"**, ויש להגיש בקשה מקוונת מחדש בכל שנה או סמסטר. דחייה של שבועיים בטיפול בניירת עלולה לעלות שנה שלמה של מימון.

## תיקון: אין "10 שנים מהעלייה"

בעמוד הזה נכתב בעבר שהזכאות היא "תוך 10 שנים מעלייה". **אין כלל כזה בשום מקום.** מה שקיים בפועל:

| | המסלול הכללי | **המסלול המורחב** — עולי אתיופיה, יוצאי תימן ובני המנשה |
| --- | --- | --- |
| מקבלת המעמד ועד תחילת הלימודים | 36 חודשים | **15 שנים** |
| גיל מרבי — תואר ראשון / הנדסאי / תעודה | עד 27 | **עד 28** |
| גיל מרבי — תואר שני / הסבה לבעלי תואר | עד 30 | **עד 40** |
| מימון תואר שני בנוסף לתואר ראשון | לא, למעט חריגים | **כן, מפורשות** |
| מלגת קיום | לא נכללת בתנאים הכלליים | **כן** |

בשני המסלולים תקופת שירות צבאי או לאומי **אינה נספרת** בתוך חלון הזמן. ההרחבה מ-36 חודשים ל-15 שנים היא ההבדל שמכריע: מי שעלה כילד, שירת, עבד כמה שנים ורק אז החליט ללמוד — במסלול הכללי כבר איבד את הזכאות, ובמסלול המורחב הוא בתוכה.

## מה כלול

- **שכר לימוד**: "בכל שנה גובה המלגה יהיה עד לגובה מלגה מלאה בתעריף אוניברסיטאי (100% שכר לימוד), ובהתאם למערכת הלימודים של הסטודנט בפועל". במוסדות ששכר הלימוד בהם גבוה מהתעריף — המינהל משלים עד התעריף, והיתרה על הסטודנט
- **מלגת קיום — ₪600 לחודש, עד 9 חודשים בשנה**, בחודשי הלימוד בלבד. מותנית בתכנית לימודים בהיקף של לפחות 50%. באוניברסיטה הפתוחה — לפחות שני קורסים בהיקף 12 נקודות זכות בסמסטר. סטודנטים לרפואה זכאים בכל שנות הלימוד
- **אינם זכאים למלגת קיום**: מי שלומד פחות מ-50%, מי שלומד לתואר מתקדם (כולל תואר שני, הסבה או תעודה לאחר תואר), ומי שלומד בסמסטר קיץ
- מימון ייעוץ והכוון בבחירת תחום הלימוד, מימון קורסי אנגלית ועברית במסגרת חובות התואר, ומערך "מעטפ"ת" — שיעורי עזר, ליווי עובדים סוציאליים ומדריכים

הסכום ₪12,000–₪22,000 שהופיע כאן בעבר אינו מופיע בשום דף של המשרד והוסר.

מקור: [תנאי זכאות מורחבים לעולים מאתיופיה, יוצאי תימן ובני המנשה — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · נבדק ספטמבר 2026.

## התנאים האקדמיים — ומה מפיל אנשים בפועל

- קבלה ללימודים מן המניין במוסד ובמסלול המוכרים לסיוע על ידי המינהל
- הסטודנט אינו בעל תואר או תעודה מקבילים או זהים לאלה שעבורם מבוקש הסיוע
- זכאות לתעודת בגרות או תעודת סיום מכינה. **באוניברסיטה הפתוחה**, מי שהתקבל בלי בגרות זכאי לסיוע רק אחרי שסיים בהצלחה שלושה קורסים אקדמיים בהיקף 18 נקודות זכות
- **להמשך הסיוע נדרש ממוצע 60 ומעלה** ואישור מעבר תקין משנה לשנה. הכניסה למסלול אינה לפי הישגים; ההישארות בו כן
- **אין מימון לשנה חוזרת** — לא בכישלון ולא בשינוי מסלול
- מותרת הפסקת לימודים של עד שנתיים אקדמיות בכל תקופת הזכאות
- מי שמפסיק ללמוד חייב להודיע מיד. אי-הודעה עלולה להוביל לרישום חוב ולהפסקת כל סיוע כספי מהמשרד
- מקבל הסיוע נדרש לשעות התנדבות בקהילה במסגרת תוכנית שח"ק

## שתי מלגות ממשלתיות — לא בבת אחת

הדף חוזר על כך פעמיים: **"לא ניתן להעניק מלגת שכר לימוד לסטודנטים המקבלים מלגה מגורם ממשלתי אחר".** המל"ג היא גורם ממשלתי, ולכן המסלול הזה ו[מלגת מרום](/he/education/scholarships/marom-che) אינם נערמים זה על זה. הם מכוונים לאוכלוסיות משלימות: מרום — למי שבארץ מעל 15 שנה או יליד הארץ; המינהל — למי שבתוך 15 שנה ממתן המעמד. [ההשוואה המלאה בין המסלולים](/he/education/scholarships/guides/marom-vs-minhal-vs-vatat).

שימו לב: דף gov.il עצמו מפנה למרום עם **תאריכים של מחזור תשפ"ו** ("נפתחה בתאריך 9/9/2025... עד 11/11/25"). אל תסתמכו עליהם.

## סייג שהמינהל עצמו כותב

"כל האמור לעיל הינו תמצית הכללים, ובכל מקרה קובעים הנוהל והוראת השעה. הסיוע מותנה בקיום תקציב ובחידוש הוראת השעה בכל שנה." הזכאות תלויה בהוראת שעה שמתחדשת שנה-שנה — כדאי לדעת את זה לפני שבונים עליה תכנית של ארבע שנים.

## ראו גם

- [איך מגישים בקשה למלגה — המדריך המלא](/he/education/scholarships/guides/how-to-apply)
- [אילו מסמכים צריך, ואיך להכין אותם](/he/education/scholarships/guides/documents-checklist)
- [סל קליטה לעולים מאתיופיה](/he/rights/klita-basket-ethiopia)

`,
      en: `## Registration is open, and two deadlines are already close

The Authority's service page says today: **"Registration for the 2026-2027 academic year has opened."** The deadlines, in the page's own words:

- **Continuing students** in semester A — by **1 October**.
- **New students** in semester A — by **10 November**.
- Starting in semester B — by 1 April. Starting in the summer semester — by 15 August.

Alongside this the page states: **"Retroactive assistance cannot be given"**, and an online application must be filed afresh every year or semester. Two weeks' delay on paperwork can cost a whole year of funding.

## Correction: there is no "within 10 years of aliyah" rule

This page previously said eligibility runs "within 10 years of aliyah". **No such rule exists anywhere.** What actually exists:

| | General track | **Extended track** — olim from Ethiopia, from Yemen, and Bnei Menashe |
| --- | --- | --- |
| From receiving status to starting studies | 36 months | **15 years** |
| Maximum age — bachelor's / practical engineer / certificate | 27 | **28** |
| Maximum age — master's / conversion for degree holders | 30 | **40** |
| Funding a master's on top of a bachelor's | No, save for exceptions | **Yes, explicitly** |
| Subsistence stipend | Not part of the general conditions | **Yes** |

In both tracks, military or national service **does not count** inside the time window. The extension from 36 months to 15 years is the decisive difference: someone who arrived as a child, served, worked a few years and only then decided to study has already lost eligibility on the general track, and is inside it on the extended one.

## What is included

- **Tuition**: "each year the scholarship will be up to a full scholarship at the university tariff (100% of tuition), in accordance with the student's actual timetable". At institutions whose tuition exceeds the tariff, the Authority pays up to the tariff and the balance is the student's
- **Subsistence stipend — ₪600 a month, up to 9 months a year**, in study months only. Conditional on a study program of at least 50%. At the Open University — at least two courses totalling 12 credit points a semester. Medical students are eligible throughout their studies
- **Not eligible for the subsistence stipend**: anyone studying less than 50%, anyone studying for an advanced degree (including a master's, a conversion or a post-degree certificate), and anyone studying in the summer semester
- Funded guidance in choosing a field of study, funding for English and Hebrew courses required by the degree, and the "Ma'atefet" support array — tutoring, social workers and personal guides

The ₪12,000–₪22,000 range that stood here appears on no page of the ministry and has been removed.

Source: [Extended eligibility conditions for olim from Ethiopia, from Yemen and Bnei Menashe — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · verified September 2026.

## The academic conditions — and what actually trips people up

- Admission as a regular student to an institution and track recognised for assistance by the Authority
- The student does not already hold a parallel or identical degree or certificate to the one assistance is sought for
- Entitlement to a matriculation certificate or a pre-academic completion certificate. **At the Open University**, a student admitted without matriculation becomes eligible only after successfully completing three academic courses totalling 18 credit points
- **Continued assistance requires an average of 60 or above** and confirmation of normal progression year to year. Entry to the track is not merit-based; staying in it is
- **No funding for a repeated year** — neither for failure nor for a change of track
- A break of up to two academic years is permitted across the eligibility period
- A student who stops studying must notify the Authority immediately. Failure to do so can lead to a recorded debt and the cessation of all financial assistance from the ministry
- Recipients must perform community volunteer hours under the Sha'ak program

## Two government scholarships — not at once

The page repeats it twice: **"A tuition scholarship cannot be granted to students receiving a scholarship from another government body."** CHE is a government body, so this track and [the Marom scholarship](/en/education/scholarships/marom-che) do not stack. They target complementary populations: Marom — for those in Israel more than 15 years or Israeli-born; the Authority — for those within 15 years of receiving status. [The full comparison of the tracks](/en/education/scholarships/guides/marom-vs-minhal-vs-vatat).

Note: the gov.il page itself refers readers to Marom using **2025-26 cycle dates** ("opened on 9/9/2025... until 11/11/25"). Do not rely on them.

## A caveat the Authority writes itself

"All of the above is a summary of the rules, and in every case the procedure and the temporary order govern. Assistance is conditional on budget and on the renewal of the temporary order each year." Eligibility depends on a temporary order renewed year by year — worth knowing before building a four-year plan on it.

## See also

- [How to apply for a scholarship — the full guide](/en/education/scholarships/guides/how-to-apply)
- [Which documents you need, and how to prepare them](/en/education/scholarships/guides/documents-checklist)
- [Absorption basket for olim from Ethiopia](/en/rights/klita-basket-ethiopia)

`,
      am: `## ምዝገባው ክፍት ነው፣ ሁለት ቀነ-ገደቦችም ቀርበዋል

የአስተዳደሩ የአገልግሎት ገጽ ዛሬ ይላል፦ **"ለ2026-2027 የትምህርት ዓመት ምዝገባ ተከፍቷል።"** ቀነ-ገደቦቹ፦

- **ቀጣይ ተማሪዎች** በሴሚስተር ሀ — እስከ **ኦክቶበር 1**።
- **አዲስ ተማሪዎች** በሴሚስተር ሀ — እስከ **ኖቬምበር 10**።
- በሴሚስተር ለ የሚጀምሩ — እስከ ኤፕሪል 1። በበጋ ሴሚስተር — እስከ ኦገስት 15።

ገጹ በተጨማሪ ይላል፦ **"ወደኋላ ተመልሶ ድጋፍ አይሰጥም"**። በየዓመቱ ወይም በየሴሚስተሩ አዲስ ማመልከቻ ማስገባት ያስፈልጋል።

## እርማት፦ "ከዐሊያ በ10 ዓመት ውስጥ" የሚል ሕግ የለም

በዚህ ገጽ ላይ ከዚህ በፊት "ከዐሊያ በ10 ዓመት ውስጥ" ተብሎ ተጽፎ ነበር። **እንደዚህ ያለ ሕግ በየትኛውም ቦታ የለም።** በእውነቱ ያለው፦

| | አጠቃላይ መንገድ | **የተስፋፋው መንገድ** — ከኢትዮጵያ፣ ከየመንና ቤኔ ምናሼ |
| --- | --- | --- |
| መዕመድ ካገኙ እስከ ትምህርት መጀመሪያ | 36 ወር | **15 ዓመት** |
| ከፍተኛ ዕድሜ — የመጀመሪያ ዲግሪ / ቴክኒሻን / ሰርተፊኬት | እስከ 27 | **እስከ 28** |
| ከፍተኛ ዕድሜ — ሁለተኛ ዲግሪ / ሙያ ለውጥ | እስከ 30 | **እስከ 40** |
| ከመጀመሪያ ዲግሪ በተጨማሪ ሁለተኛ ዲግሪ ማስተማር | አይ | **አዎ፣ በግልጽ** |
| የኑሮ ድጋፍ | በአጠቃላይ ሁኔታዎች አይካተትም | **አዎ** |

በሁለቱም መንገዶች የወታደራዊ ወይም የብሔራዊ አገልግሎት ጊዜ **አይቆጠርም**።

## ምን ይካተታል

- **የትምህርት ክፍያ**፦ "በየዓመቱ የስኮላርሺፑ መጠን እስከ ሙሉ የዩኒቨርሲቲ ታሪፍ (100% የትምህርት ክፍያ) ይሆናል"። ከታሪፉ በላይ ክፍያ ባላቸው ተቋማት ቀሪው በተማሪው ላይ ነው
- **የኑሮ ድጋፍ — በወር ₪600፣ በዓመት እስከ 9 ወር**፣ በትምህርት ወራት ብቻ። ቢያንስ 50% የትምህርት ጫና ይጠይቃል። የሕክምና ተማሪዎች በሁሉም ዓመታት ብቁ ናቸው
- **ለኑሮ ድጋፍ ብቁ ያልሆኑ**፦ ከ50% በታች የሚማሩ፣ ለከፍተኛ ዲግሪ የሚማሩ፣ በበጋ ሴሚስተር የሚማሩ
- የትምህርት መስክ ምርጫ ምክር፣ የእንግሊዝኛና የዕብራይስጥ ኮርሶች ድጋፍ፣ እና "መዓቴፌት" የድጋፍ ሥርዓት

ከዚህ በፊት እዚህ የነበረው ₪12,000–₪22,000 በየትኛውም የሚኒስቴሩ ገጽ ላይ አይገኝም፤ ተወግዷል።

ምንጭ፦ [የተስፋፋ የብቁነት ሁኔታዎች — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · ሴፕቴምበር 2026 ተረጋግጧል።

## የአካዳሚክ ሁኔታዎች

- በአስተዳደሩ እውቅና ባለው ተቋምና መንገድ መደበኛ ተማሪ ሆኖ መቀበል
- **ድጋፉ እንዲቀጥል ከ60 በላይ አማካይ ውጤት ያስፈልጋል**
- **ለተደገመ ዓመት ድጋፍ የለም**
- ትምህርታቸውን የሚያቋርጡ ወዲያውኑ ማሳወቅ አለባቸው፤ አለበለዚያ ዕዳ ሊመዘገብ ይችላል
- ተቀባዮች በሻሕአክ ፕሮግራም የማህበረሰብ የበጎ ፈቃድ ሰዓታት ይጠበቅባቸዋል

## ሁለት የመንግሥት ስኮላርሺፖች — በአንድ ጊዜ አይደለም

ገጹ ሁለት ጊዜ ይደግመዋል፦ **"ከሌላ የመንግሥት አካል ስኮላርሺፕ ለሚቀበሉ ተማሪዎች የትምህርት ክፍያ ስኮላርሺፕ መስጠት አይቻልም።"** CHE የመንግሥት አካል ነው፤ ስለዚህ ይህ መንገድና [የማሮም ስኮላርሺፕ](/am/education/scholarships/marom-che) አይደራረቡም። [ሙሉ ንጽጽሩ](/am/education/scholarships/guides/marom-vs-minhal-vs-vatat)።

## ይህንንም ይመልከቱ

- [ለስኮላርሺፕ እንዴት ማመልከት — ሙሉ መመሪያ](/am/education/scholarships/guides/how-to-apply)
- [ምን ሰነዶች ያስፈልጋሉ](/am/education/scholarships/guides/documents-checklist)
- [ለኢትዮጵያ ኦሊም መግባት ቅርጫት](/am/rights/klita-basket-ethiopia)
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
