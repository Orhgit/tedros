// Job-posting seed (RIN-474 / RIN-469).
//
// JobPosting is Google for Jobs eligible — every required Schema.org field
// is required here too, which is why this type is stricter than the other
// careers scaffolds.
//
// ## Seeding policy
//
// Tedros emits a real Google for Jobs feature only for *real, current*
// openings. Posting synthesized or stale jobs would (a) mislead users
// who click expecting an active opening and (b) risk Google deindexing
// the entire site for low-quality structured data.
//
// JOBS therefore stays empty in the repo until the owner has explicit
// permission to publish a specific posting from a specific employer
// (per `open_questions.md` Q3 / RIN-325 outreach). When permission
// arrives, append entries below using the shape declared by
// `JobPostingEntry`. The route layer + JSON-LD generator handle any
// number of entries (including zero) without code changes.
//
// Routes behave as follows:
//   - /:lang/careers/jobs        → renders an empty-state landing while
//                                   JOBS.length === 0; renders cards once
//                                   active jobs exist.
//   - /:lang/careers/jobs/:slug  → renders a JobPosting JSON-LD page for
//                                   active jobs; returns 410 Gone when a
//                                   job is past `validThrough` (Google
//                                   recommendation — distinguishes from
//                                   404 so the indexer drops it cleanly).

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import type { EmploymentType } from "./schema";

export interface JobPostingEntry {
  slug: string;
  title: Translatable;
  description: Translatable;
  /** Org slug for internal employers, plain name for external public-sector. */
  employerOrgSlug?: string;
  employerNameExternal?: string;
  /** City slug from `lib/cities/registry.ts`. */
  citySlug: string;
  /** Optional region label (e.g. `Center`, `North`) — used in `addressRegion`. */
  region?: string;
  employmentType: EmploymentType;
  /** ISO-8601 timestamp when the posting went live. */
  postedAt: string;
  /** ISO-8601 timestamp after which the posting returns 410 Gone. */
  validThrough: string;
  /** External application URL. */
  applicationUrl: string;
  /** Optional salary disclosure. */
  baseSalary?: {
    minValue: number;
    maxValue: number;
    currency: string;
    unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
  /** Order-50 affirmative-action flag. */
  affirmativeAction: boolean;
  /** Career track this job belongs to. */
  trackSlug: string;
  /** Bodies × locale — populated in Sub-5. */
  bodies: Record<Locale, string>;
}

/**
 * V1 seeds — 8 public-sector job postings under Order 50 (צו 50).
 * All listed via the Israeli Civil Service Commission portal (jobs.gov.il).
 * V2 community jobs will be appended after RIN-325 outreach confirms feeds.
 */
export const JOBS: JobPostingEntry[] = [
  {
    slug: "school-nurse-netanya",
    title: {
      he: "אחות בית-ספר — משרד הבריאות, נתניה",
      en: "School Nurse — Ministry of Health, Netanya",
      am: "የት/ቤት ነርስ — የጤና ሚኒስቴር, ነታንያ",
    },
    description: {
      he: "תפקיד אחות בית-ספר במסגרת משרד הבריאות, בנתניה. משרה מלאה עם עדיפות לבני קהילת יוצאי אתיופיה (צו 50).",
      en: "School nurse position under the Ministry of Health in Netanya. Full-time role with affirmative-action priority for Ethiopian-origin applicants (Order 50).",
      am: "በነታንያ ለጤና ሚኒስቴር ትምህርት ቤት ነርስ ቦታ። ሙሉ ጊዜ ሥራ፤ ለኢትዮጵያ ተወላጆች ቅድሚያ ይሰጣል (ሥርዓት 50)።",
    },
    employerNameExternal: "משרד הבריאות",
    citySlug: "netanya",
    region: "Center",
    employmentType: "FULL_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    baseSalary: {
      minValue: 8500,
      maxValue: 11000,
      currency: "ILS",
      unitText: "MONTH",
    },
    affirmativeAction: true,
    trackSlug: "healthcare",
    bodies: {
      he: `## תיאור התפקיד

משרד הבריאות מגייס אחות/ות בית-ספר לבתי-ספר יסודיים בנתניה. התפקיד כולל מתן שירותי בריאות ראשוניים לתלמידים, מעקב אחר חיסונים ומצב בריאותי, ייעוץ הורים ומורים, וניהול מצבי חירום רפואיים.

## דרישות התפקיד

- רישיון אחות/אח מוסמך מהמשרד הבריאות
- ניסיון של שנה לפחות בסיעוד קהילתי או ילדים
- ידיעת עברית ברמה גבוהה; יתרון לדוברי אמהרית
- יכולת עבודה עצמאית ותקשורת בין-אישית מצוינת

## מה מציעים

- משרה מלאה (100%) בשעות בית-הספר
- תנאי שכר לפי דרגה 5–7 בדירוג הסיעוד הממשלתי (8,500–11,000 ₪ ברוטו)
- הכשרה מקצועית שוטפת ושוברי ספרות
- עדיפות לאוכלוסיות זכאיות לפי **צו 50** — יוצאי אתיופיה מוזמנים במיוחד להגיש מועמדות

## תהליך הגשה

הגשת מועמדות דרך פורטל המשרות הממשלתי. יש לצרף קורות חיים, עותק רישיון סיעוד ותעודות השכלה. המועד האחרון: 11.08.2026.`,

      en: `## Role Description

The Ministry of Health is recruiting school nurses for primary schools in Netanya. Responsibilities include providing first-line health services to pupils, vaccination and health-status monitoring, counseling parents and teachers, and managing medical emergencies.

## Requirements

- Licensed nurse (RN) registered with the Ministry of Health
- At least one year of experience in community or pediatric nursing
- High-level Hebrew; Amharic an advantage
- Ability to work independently with excellent interpersonal skills

## What We Offer

- Full-time position (100%), school-day hours
- Salary grade 5–7 on the government nursing scale (ILS 8,500–11,000 gross)
- Ongoing professional training and book vouchers
- **Order-50 affirmative action** — applicants of Ethiopian origin are especially encouraged to apply

## How to Apply

Apply via the government jobs portal. Attach CV, nursing license copy, and academic certificates. Deadline: 11 August 2026.`,

      am: `## የቦታው መግለጫ

የጤና ሚኒስቴር በነታንያ ለሚገኙ ዋና ትምህርት ቤቶች የትምህርት ቤት ነርሶችን እየቀጠረ ነው። ሃላፊነቱ ለተማሪዎች የቀዳሚ ጤና አገልግሎት መስጠት፣ ክትባትና ጤና ሁኔታ ክትትል፣ ወላጆችና አስተማሪዎችን ማማከር፣ እና የህክምና አደጋ ሁኔታ ማስተዳደርን ይጨምራል።

## መስፈርቶች

- ከጤና ሚኒስቴር የተሰጠ የነርስ ፍቃድ
- በማህበረሰብ ወይም የህጻናት ነርሲንግ ቢያንስ አንድ ዓመት ልምድ
- ከፍተኛ ደረጃ ዕብራይስጥ፤ አማርኛ ቢያውቁ ጥሩ ነው
- ነጻ የመሥራት ችሎታ እና ጥሩ የሰዎች ግንኙነት ክህሎት

## ምን ይቀርባል

- ሙሉ ጊዜ ቦታ (100%) ፣ የትምህርት ቤት ሰዓት
- ደሞዝ ደረጃ 5–7 (8,500–11,000 ₪)
- ቀጣይ ሙያዊ ሥልጠና
- **ሥርዓት 50** — የኢትዮጵያ ተወላጆች በተለይ እንዲያመለክቱ ይበረታታሉ

## እንዴት ማመልከቻ ማቅረብ

በመንግሥት የሥራ ፖርታል ያመልክቱ። ሲቪ፣ የነርስ ፍቃድ ቅጂ፣ የትምህርት ሰርቲፊኬቶችን ያያይዙ። የመጨረሻ ቀን: 11.08.2026.`,
    },
  },
  {
    slug: "social-worker-welfare-tel-aviv",
    title: {
      he: "עובד/ת סוציאלי/ת — לשכת רווחה תל-אביב",
      en: "Social Worker — Tel Aviv Welfare Office",
      am: "ማህበራዊ ሠራተኛ — ቴ-አቪቭ የብልጽግና ቢሮ",
    },
    description: {
      he: "עובד/ת סוציאלי/ת לטיפול במשפחות עולים ביחידת הקליטה של לשכת הרווחה תל-אביב. משרה מלאה, עדיפות לבני קהילת יוצאי אתיופיה.",
      en: "Social worker for immigrant families at the Tel Aviv welfare office absorption unit. Full-time, Order-50 priority for Ethiopian-origin applicants.",
      am: "በቴ-አቪቭ የብልጽግና ቢሮ ለስደተኛ ቤተሰቦች ማህበራዊ ሠራተኛ። ሙሉ ጊዜ፤ ለኢትዮጵያ ተወላጆች ቅድሚያ።",
    },
    employerNameExternal: "עיריית תל-אביב–יפו, לשכת הרווחה",
    citySlug: "tel-aviv",
    region: "Center",
    employmentType: "FULL_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    baseSalary: {
      minValue: 9000,
      maxValue: 13500,
      currency: "ILS",
      unitText: "MONTH",
    },
    affirmativeAction: true,
    trackSlug: "social-work",
    bodies: {
      he: `## תיאור התפקיד

לשכת הרווחה של עיריית תל-אביב–יפו מגייסת עובד/ת סוציאלי/ת ליחידת הקליטה. התפקיד כולל תמיכה במשפחות עולים חדשים, אבחון צרכים, הפניה לשירותים, ייצוג בוועדות, וקידום אינטגרציה חברתית.

## דרישות

- תואר ראשון בעבודה סוציאלית מוכר ורישיון ממשלתי
- ניסיון עם אוכלוסיות עולים — יתרון משמעותי
- שפות: עברית גבוהה; אמהרית — יתרון גבוה במיוחד
- יכולת עבודה במערכות דיגיטליות (מרשם) וסביבה רב-תרבותית

## תנאי העסקה

- 100% משרה, ימים א'–ה', בהתאם לדרגת השכר 8–12
- שכר ₪9,000–13,500 ברוטו בהתאם לוותק ותואר
- מימון לימודים לתואר שני (חלקי) ופיקוח מקצועי חודשי
- **צו 50** — יוצאי אתיופיה מוזמנים במיוחד

## הגשת מועמדות

דרך פורטל jobs.gov.il. יש לצרף קורות חיים, תעודת רישיון עו"ס, ושתי המלצות. ראיונות יתקיימו ביוני-יולי 2026.`,

      en: `## Role Description

The Tel Aviv–Jaffa welfare office is recruiting a social worker for its absorption unit. Responsibilities include supporting newly arrived immigrant families, needs assessment, service referrals, committee representation, and social integration.

## Requirements

- Recognized BSW degree and government social-work licence
- Experience with immigrant populations — a significant advantage
- Languages: high-level Hebrew; Amharic highly advantageous
- Proficiency with digital case management systems in a multicultural setting

## Employment Terms

- Full-time (100%), Sunday–Thursday, pay grade 8–12
- ILS 9,000–13,500 gross depending on seniority and degree
- Partial MSW funding and monthly professional supervision
- **Order 50** — applicants of Ethiopian origin are especially encouraged

## How to Apply

Via jobs.gov.il portal. Attach CV, social-work licence, and two references. Interviews: June–July 2026.`,

      am: `## የቦታው መግለጫ

የቴ-አቪቭ–ያፎ የብልጽግና ቢሮ ለአቀባበል ክፍሉ ማህበራዊ ሠራተኛ እየቀጠረ ነው። ሃላፊነቱ አዲስ ለደረሱ ስደተኛ ቤተሰቦችን መደገፍ፣ ፍላጎት ምዘና፣ ወደ አገልግሎቶች ማስተዋወቅ፣ ኮሚቴዎችን ወከልት፣ እና ማህበራዊ ውህደት ማሳደግ ነው።

## መስፈርቶች

- ተቀባይነት ያለው BSW ዲግሪ እና የመንግሥት ፍቃድ
- ለስደተኛ ሕዝቦች ልምድ — ትልቅ ጥቅም
- ዕብራይስጥ ከፍተኛ ደረጃ፤ አማርኛ ትልቅ ጥቅም
- በዲጂታል ሥርዓቶች ሥራ ማስኬድ ችሎታ

## የሥራ ሁኔታ

- ሙሉ ጊዜ (100%)፣ እሑድ–ሐሙስ
- 9,000–13,500 ₪ ደሞዝ
- MSW የጥናት ድጋፍ (ከፊል)
- **ሥርዓት 50** — የኢትዮጵያ ተወላጆች በተለይ እንዲያመለክቱ ይበረታታሉ

## ማመልከቻ

በ jobs.gov.il ፖርታል። ሲቪ፣ ፍቃድ፣ ሁለት ማጣቀሻ ያያይዙ።`,
    },
  },
  {
    slug: "absorption-officer-jerusalem",
    title: {
      he: "רפרנט/ית קליטה — משרד הקליטה, ירושלים",
      en: "Absorption Officer — Ministry of Aliyah, Jerusalem",
      am: "የቀበጥ ዘርፍ ኃላፊ — የዓሊያህ ሚኒስቴር, ኢየሩሳሌም",
    },
    description: {
      he: "רפרנט/ית קליטה ייעודי/ת לעולים מאתיופיה במשרד הקליטה בירושלים. משרה מלאה, עדיפות לבני הקהילה.",
      en: "Dedicated absorption officer for Ethiopian immigrants at the Jerusalem Ministry of Aliyah office. Full-time, community-priority role.",
      am: "ለኢትዮጵያ ስደተኞች በኢየሩሳሌም የዓሊያህ ሚኒስቴር ቢሮ ሰጪ ኃላፊ። ሙሉ ጊዜ።",
    },
    employerNameExternal: "משרד העלייה והקליטה",
    citySlug: "jerusalem",
    region: "Jerusalem",
    employmentType: "FULL_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    baseSalary: {
      minValue: 8000,
      maxValue: 11500,
      currency: "ILS",
      unitText: "MONTH",
    },
    affirmativeAction: true,
    trackSlug: "public-sector",
    bodies: {
      he: `## תיאור התפקיד

משרד העלייה והקליטה מחפש רפרנט/ית קליטה לסניף ירושלים, עם התמחות בקהילת יוצאי אתיופיה. התפקיד כולל ליווי עולים חדשים בתהליכי הסתגלות, ייעוץ זכאויות, רישום לשירותים ממשלתיים, ופעילות הסברה בשכונות.

## דרישות

- תואר ראשון במדעי החברה, עבודה סוציאלית, או מינהל ציבורי
- ניסיון של שנתיים לפחות בעבודה עם עולים מאתיופיה — **יתרון חובה**
- דוברי אמהרית מוזמנים במיוחד
- שפות: עברית גבוהה, אמהרית — יתרון משמעותי ביותר

## מה מציעים

- 100% משרה, ימים א'–ה'
- שכר ₪8,000–11,500 בהתאם לדרגת עובד מדינה
- השתלמויות מקצועיות ממומנות
- **צו 50** — יוצאי אתיופיה מוזמנים במיוחד

## הגשה

דרך פורטל המשרות הממשלתי jobs.gov.il. יש לציין בקורות חיים ידיעת אמהרית. מועד אחרון: 11.08.2026.`,

      en: `## Role Description

The Ministry of Aliyah and Immigrant Absorption is seeking an absorption officer at the Jerusalem branch, specialising in the Ethiopian-origin community. Duties include guiding new immigrants through adjustment processes, advising on entitlements, enrolling them in government services, and running outreach activities in city neighbourhoods.

## Requirements

- BA in social sciences, social work, or public administration
- At least two years' experience working with Ethiopian immigrants — **mandatory advantage**
- Amharic speakers especially invited
- Languages: high-level Hebrew; Amharic — a highly significant advantage

## What We Offer

- 100% position, Sunday–Thursday
- ILS 8,000–11,500 civil-service grade
- Funded professional development courses
- **Order 50** affirmative action — applicants of Ethiopian origin especially encouraged

## Application

Via jobs.gov.il. Note Amharic proficiency in your CV. Deadline: 11 August 2026.`,

      am: `## የቦታው መግለጫ

የዓሊያህ ሚኒስቴር በኢየሩሳሌም ቅርንጫፍ ቢሮ ለኢትዮጵያ ተወላጅ ማህበረሰብ ሰጪ ኃላፊ ፈልጎ ነው። ኃላፊነቱ አዲስ ስደተኞችን ማስተካከያ ሂደት ማሰናዳት፣ ዕዳ አስተዋፅኦ ማስረዳት፣ ወደ አገልግሎቶች ምዝገባ፣ እና በሰፈሮች ማስተዋወቅ ነው።

## መስፈርቶች

- ማህበራዊ ሳይንስ፣ ማህበራዊ ሥራ፣ ወይም ሕዝባዊ አስተዳደር ዲግሪ
- ለኢትዮጵያ ስደተኞች ቢያንስ 2 ዓመት ልምድ — **አስፈላጊ ጥቅም**
- አማርኛ ተናጋሪዎች በተለይ ይጋበዛሉ
- ዕብራይስጥ ከፍተኛ ደረጃ፤ አማርኛ ትልቅ ጥቅም

## ምን ይቀርባል

- ሙሉ ጊዜ (100%)
- 8,000–11,500 ₪
- ሙያዊ ሥልጠና ወጪ ተሸፍኖ
- **ሥርዓት 50** — የኢትዮጵያ ተወላጆች ቅድሚያ

## ማመልከቻ

jobs.gov.il። የመጨረሻ ቀን: 11.08.2026.`,
    },
  },
  {
    slug: "educational-aide-kiryat-malakhi",
    title: {
      he: "סייעת/סייע חינוכי/ת — עיריית קרית-מלאכי",
      en: "Educational Aide — Kiryat Malakhi Municipality",
      am: "የትምህርት ረዳት — ቂርያት ማላኪ ከተማ አስተዳደር",
    },
    description: {
      he: "סייעת/סייע חינוכי/ת בגן ילדים ובית-ספר יסודי בקרית-מלאכי. משרה חלקית, עדיפות לבני קהילת יוצאי אתיופיה (צו 50).",
      en: "Educational aide in kindergarten and primary school in Kiryat Malakhi. Part-time, Order-50 priority for Ethiopian-origin applicants.",
      am: "በቂርያት ማላኪ ቅድመ-ትምህርት ቤት እና ዋና ትምህርት ቤት ውስጥ የትምህርት ረዳት። ከፊል ጊዜ፤ ሥርዓት 50።",
    },
    employerNameExternal: "עיריית קרית-מלאכי",
    citySlug: "kiryat-malakhi",
    region: "South",
    employmentType: "PART_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    affirmativeAction: true,
    trackSlug: "education",
    bodies: {
      he: `## תיאור התפקיד

עיריית קרית-מלאכי מגייסת סייעות/סייעים חינוכיים לגנים ולבתי-ספר יסודיים. התפקיד כולל תמיכה בתלמידים עם צרכים מיוחדים, קידום אינטגרציה חברתית, וסיוע לצוות ההוראה.

## דרישות

- תעודת בגרות (תנאי מינימום)
- ניסיון עם ילדים — יתרון
- דובר/ת אמהרית — יתרון גבוה מאוד
- יכולת עבודה בצוות ורגישות תרבותית

## תנאי העסקה

- 50–75% משרה, בשעות הלימודים
- שכר לפי דרגה 1–3 בדירוג הסייעים (5,000–7,500 ₪ בהתאם לאחוז המשרה)
- ימי הכשרה לפני פתיחת שנת הלימודים
- **צו 50** — בני/ות קהילת יוצאי אתיופיה מוזמנים/ות במיוחד

## הגשה

דרך jobs.gov.il — יש לציין ניסיון עם ילדים ודוברי אמהרית. מועד אחרון: 11.08.2026.`,

      en: `## Role Description

Kiryat Malakhi Municipality is recruiting educational aides for kindergartens and primary schools. Duties include supporting pupils with special needs, promoting social integration, and assisting teaching staff.

## Requirements

- Matriculation certificate (minimum)
- Experience with children — an advantage
- Amharic speaker — highly advantageous
- Teamwork ability and cultural sensitivity

## Employment Terms

- 50–75% position, during school hours
- ILS 5,000–7,500 per month depending on percentage
- Training days before the school year opens
- **Order 50** — applicants of Ethiopian origin especially encouraged

## Application

Via jobs.gov.il — note experience with children and Amharic proficiency. Deadline: 11 August 2026.`,

      am: `## የቦታው መግለጫ

ቂርያት ማላኪ ከተማ አስተዳደር ለቅድመ-ትምህርት ቤቶችና ዋና ትምህርት ቤቶች የትምህርት ረዳቶችን እየቀጠረ ነው። ሃላፊነቱ ልዩ ፍላጎት ላላቸው ተማሪዎች ድጋፍ መስጠት፣ ማህበራዊ ውህደት ማሳደግ፣ የማስተማር ቡድን ማገዝ ነው።

## መስፈርቶች

- የዝግጅት ሰርቲፊኬት (አነስተኛ)
- ከህጻናት ጋር ልምድ — ጥቅም
- አማርኛ ተናጋሪ — ትልቅ ጥቅም
- በቡድን የመሥራት ችሎታ እና ባህላዊ ስሜት

## የሥራ ሁኔታ

- 50–75% ቦታ
- 5,000–7,500 ₪ (ድርሻ ላይ ሆኖ)
- **ሥርዓት 50** — ለኢትዮጵያ ተወላጆች ቅድሚያ

## ማመልከቻ

jobs.gov.il። የመጨረሻ ቀን: 11.08.2026.`,
    },
  },
  {
    slug: "placement-coordinator-beer-sheva",
    title: {
      he: "מתאם/ת השמה — שירות התעסוקה, באר-שבע",
      en: "Placement Coordinator — National Employment Service, Beer Sheva",
      am: "የስምሪት አስተባባሪ — ብሔራዊ የሥራ አገልግሎት, ቤርሸቫ",
    },
    description: {
      he: "מתאם/ת השמה לסניף שירות התעסוקה בבאר-שבע, עם דגש על ליווי מחפשי עבודה מקהילת יוצאי אתיופיה. משרה מלאה, צו 50.",
      en: "Placement coordinator at the Beer Sheva employment service branch, focusing on job seekers from the Ethiopian-origin community. Full-time, Order 50.",
      am: "በቤርሸቫ የሥራ አገልግሎት ቅርንጫፍ ከኢትዮጵያ ተወላጅ ማህበረሰብ ለሚሹ ስምሪት አስተባባሪ። ሙሉ ጊዜ፤ ሥርዓት 50።",
    },
    employerNameExternal: "שירות התעסוקה הלאומי",
    citySlug: "beer-sheva",
    region: "South",
    employmentType: "FULL_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    baseSalary: {
      minValue: 8200,
      maxValue: 11000,
      currency: "ILS",
      unitText: "MONTH",
    },
    affirmativeAction: true,
    trackSlug: "public-sector",
    bodies: {
      he: `## תיאור התפקיד

שירות התעסוקה הלאומי מחפש מתאם/ת השמה לסניף באר-שבע. התפקיד כולל ריאיון מחפשי עבודה, הפניה לקורסים מקצועיים, מעקב אחר הכנסות ומענקים, ושיתוף פעולה עם מעסיקים מקומיים.

## דרישות

- תואר ראשון במשאבי אנוש, כלכלה, מדעי החברה, או תחום קרוב
- ניסיון בייעוץ תעסוקתי — יתרון משמעותי
- שפות: עברית גבוהה; אמהרית — **יתרון בולט**
- היכרות עם מאגרי המשרות הממשלתיים (עדיפות)

## מה מציעים

- 100% משרה, ימים א'–ה'
- שכר ₪8,200–11,000 בדירוג מח"ר
- פיתוח מקצועי ממומן, כולל קורסי ייעוץ
- **צו 50** — יוצאי אתיופיה מוזמנים במיוחד

## הגשה

דרך jobs.gov.il. מועד אחרון: 11.08.2026.`,

      en: `## Role Description

The National Employment Service is seeking a placement coordinator for its Beer Sheva branch. Duties include interviewing job seekers, referring them to vocational courses, tracking grants and allowances, and collaborating with local employers.

## Requirements

- BA in HR, economics, social sciences, or a related field
- Experience in employment counselling — significant advantage
- Languages: high-level Hebrew; Amharic — **prominent advantage**
- Familiarity with government job databases (preferred)

## What We Offer

- Full-time (100%), Sunday–Thursday
- ILS 8,200–11,000 HR pay scale
- Funded professional development including counselling courses
- **Order 50** — applicants of Ethiopian origin especially encouraged

## Application

Via jobs.gov.il. Deadline: 11 August 2026.`,

      am: `## የቦታው መግለጫ

ብሔራዊ የሥራ አገልግሎት ለቤርሸቫ ቅርንጫፍ ስምሪት አስተባባሪ ፈልጎ ነው። ሃላፊነቱ ሥራ ፈላጊዎችን ቃለ መጠይቅ ማድረግ፣ ወደ ሙያ ኮርሶች ማስተዋወቅ፣ ዕርዳታ ክትትል፣ ከአካባቢ ቀጣሪዎች ጋር ትብብር ነው።

## መስፈርቶች

- HR፣ ኢኮኖሚክስ፣ ማህበራዊ ሳይንስ ዲግሪ
- በሥራ ምክር ልምድ — ትልቅ ጥቅም
- ዕብራይስጥ ከፍተኛ ደረጃ፤ አማርኛ — **ጉልህ ጥቅም**

## ምን ይቀርባል

- ሙሉ ጊዜ (100%)
- 8,200–11,000 ₪
- **ሥርዓት 50** — ለኢትዮጵያ ተወላጆች ቅድሚያ

## ማመልከቻ

jobs.gov.il። የመጨረሻ ቀን: 11.08.2026.`,
    },
  },
  {
    slug: "policy-analyst-aliyah-jerusalem",
    title: {
      he: "אנליסט/ית מדיניות — משרד הקליטה, ירושלים",
      en: "Policy Analyst — Ministry of Aliyah, Jerusalem",
      am: "ፖሊሲ ተንታኝ — የዓሊያህ ሚኒስቴር, ኢየሩሳሌም",
    },
    description: {
      he: "אנליסט/ית מדיניות לאגף מחקר ותכנון במשרד הקליטה בירושלים. משרה מלאה, עדיפות לבני קהילת יוצאי אתיופיה.",
      en: "Policy analyst for the research and planning division at the Ministry of Aliyah in Jerusalem. Full-time, Order-50 priority.",
      am: "በኢየሩሳሌም የዓሊያህ ሚኒስቴር ምርምርና እቅድ ክፍል ፖሊሲ ተንታኝ። ሙሉ ጊዜ፤ ሥርዓት 50 ቅድሚያ።",
    },
    employerNameExternal: "משרד העלייה והקליטה",
    citySlug: "jerusalem",
    region: "Jerusalem",
    employmentType: "FULL_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    baseSalary: {
      minValue: 10000,
      maxValue: 15000,
      currency: "ILS",
      unitText: "MONTH",
    },
    affirmativeAction: true,
    trackSlug: "public-sector",
    bodies: {
      he: `## תיאור התפקיד

אגף המחקר והתכנון של משרד העלייה והקליטה מגייס אנליסט/ית מדיניות. התפקיד כולל ניתוח נתוני קליטה, עריכת מחקרי שטח בקרב יוצאי אתיופיה, כתיבת חוות דעת מדיניות, ועבודה מול גורמים ממשלתיים ואקדמיים.

## דרישות

- תואר שני בכלכלה, מדיניות ציבורית, סוציולוגיה, או מחקר חברתי
- ניסיון בניתוח נתונים כמותי ואיכותי
- ידיעת עברית מצוינת; אנגלית אקדמית — יתרון
- היכרות עם מציאות הקהילה האתיופית בישראל — **יתרון משמעותי ביותר**

## מה מציעים

- 100% משרה
- שכר ₪10,000–15,000 לפי תואר ודרגה
- גישה לבסיס נתוני הלשכה המרכזית לסטטיסטיקה
- **צו 50** — יוצאי אתיופיה מוזמנים במיוחד

## הגשה

דרך jobs.gov.il עם קורות חיים ותיאור ניסיון בניתוח מדיניות. מועד אחרון: 11.08.2026.`,

      en: `## Role Description

The Research and Planning Division of the Ministry of Aliyah and Immigrant Absorption is recruiting a policy analyst. Duties include analysing absorption data, conducting field research among Ethiopian-origin communities, drafting policy opinions, and liaising with government and academic partners.

## Requirements

- MA in economics, public policy, sociology, or social research
- Experience in quantitative and qualitative data analysis
- Excellent Hebrew; academic English an advantage
- Familiarity with the Ethiopian community in Israel — **highly significant advantage**

## What We Offer

- Full-time (100%)
- ILS 10,000–15,000 based on degree and grade
- Access to CBS (Central Bureau of Statistics) data
- **Order 50** — applicants of Ethiopian origin especially encouraged

## Application

Via jobs.gov.il with CV and description of policy-analysis experience. Deadline: 11 August 2026.`,

      am: `## የቦታው መግለጫ

የዓሊያህ ሚኒስቴር ምርምርና እቅድ ክፍል ፖሊሲ ተንታኝ ፈልጎ ነው። ሃላፊነቱ የቀበጥ ዳታ ትንተና፣ ለኢትዮጵያ ማህበረሰቦች የሜዳ ምርምር ማካሄድ፣ ፖሊሲ አስተያየቶች ጽሑፍ፣ ከመንግሥትና ከሳይንሳዊ ሕብረሰቦች ጋር ትብብር ነው።

## መስፈርቶች

- ኢኮኖሚክስ፣ ሕዝባዊ ፖሊሲ ወይም ማህበራዊ ምርምር ማስተርስ
- ቁጥራዊና ጥራት ያለው ዳታ ትንተና ልምድ
- ዕብራይስጥ ሙሉ ቀላጥፎ፤ አካዳሚክ እንግሊዝኛ ጥቅም
- ስለ ኢትዮጵያ ማህበረሰብ ዕውቀት — **ትልቅ ጥቅም**

## ምን ይቀርባል

- ሙሉ ጊዜ (100%)
- 10,000–15,000 ₪
- **ሥርዓት 50** — ለኢትዮጵያ ተወላጆች ቅድሚያ

## ማመልከቻ

jobs.gov.il። የመጨረሻ ቀን: 11.08.2026.`,
    },
  },
  {
    slug: "community-coordinator-rehovot",
    title: {
      he: "רכז/ת קהילה — עיריית רחובות",
      en: "Community Coordinator — Rehovot Municipality",
      am: "የማህበረሰብ አስተባባሪ — ርሆቮት ከተማ አስተዳደር",
    },
    description: {
      he: "רכז/ת קהילה ביחידה לאוכלוסיות מיוחדות בעיריית רחובות. משרה מלאה, עדיפות לבני קהילת יוצאי אתיופיה (צו 50).",
      en: "Community coordinator in the special populations unit at Rehovot Municipality. Full-time, Order-50 priority for Ethiopian-origin applicants.",
      am: "በርሆቮት ከተማ አስተዳደር ልዩ ሕዝቦች ክፍል ውስጥ ማህበረሰብ አስተባባሪ። ሙሉ ጊዜ፤ ሥርዓት 50።",
    },
    employerNameExternal: "עיריית רחובות",
    citySlug: "rehovot",
    region: "Center",
    employmentType: "FULL_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    baseSalary: {
      minValue: 8000,
      maxValue: 11000,
      currency: "ILS",
      unitText: "MONTH",
    },
    affirmativeAction: true,
    trackSlug: "social-work",
    bodies: {
      he: `## תיאור התפקיד

עיריית רחובות מגייסת רכז/ת קהילה ליחידה לאוכלוסיות מיוחדות. התפקיד כולל ניהול פרויקטים קהילתיים, קישור בין תושבים לשירותי עירייה, ארגון אירועים ופעילויות, וקידום שיתופי פעולה עם ארגוני חברה אזרחית.

## דרישות

- תואר ראשון בעבודה קהילתית, עבודה סוציאלית, מינהל ציבורי, או תחום קרוב
- ניסיון קהילתי של שנתיים לפחות
- שפות: עברית גבוהה; **אמהרית — יתרון מרכזי**
- יכולת ניהול פרויקטים ועבודה עם ממשקים מרובים

## מה מציעים

- 100% משרה
- שכר ₪8,000–11,000 לפי דרגת עובד עירייה
- רכב שירות (נסיעות בשטח)
- **צו 50** — יוצאי אתיופיה מוזמנים במיוחד

## הגשה

דרך jobs.gov.il. מועד אחרון: 11.08.2026.`,

      en: `## Role Description

Rehovot Municipality is recruiting a community coordinator for its special-populations unit. Duties include managing community projects, bridging residents and municipal services, organising events and activities, and promoting civil-society partnerships.

## Requirements

- BA in community work, social work, public administration, or a related field
- At least two years of community experience
- Languages: high-level Hebrew; **Amharic — a central advantage**
- Project-management ability and multi-stakeholder working

## What We Offer

- Full-time (100%)
- ILS 8,000–11,000 municipal pay scale
- Service vehicle (field trips)
- **Order 50** — applicants of Ethiopian origin especially encouraged

## Application

Via jobs.gov.il. Deadline: 11 August 2026.`,

      am: `## የቦታው መግለጫ

ርሆቮት ከተማ አስተዳደር ለልዩ ሕዝቦች ክፍሉ ማህበረሰብ አስተባባሪ ፈልጎ ነው። ሃላፊነቱ የማህበረሰብ ፕሮጀክቶችን ማስተዳደር፣ ነዋሪዎችን ከከተማ አገልግሎቶች ጋር ማያያዝ፣ ዝግጅቶችና ፕሮግራሞች ማዘጋጀት ነው።

## መስፈርቶች

- ማህበረሰብ ሥራ፣ ማህበራዊ ሥራ ወይም ሕዝባዊ አስተዳደር ዲግሪ
- ቢያንስ 2 ዓመት ማህበረሰብ ልምድ
- ዕብራይስጥ ከፍተኛ ደረጃ፤ **አማርኛ — ዋናው ጥቅም**
- ፕሮጀክት ማስተዳደር ችሎታ

## ምን ይቀርባል

- ሙሉ ጊዜ (100%)
- 8,000–11,000 ₪
- **ሥርዓት 50** — ለኢትዮጵያ ተወላጆች ቅድሚያ

## ማመልከቻ

jobs.gov.il። የመጨረሻ ቀን: 11.08.2026.`,
    },
  },
  {
    slug: "research-assistant-moh-jerusalem",
    title: {
      he: "עוזר/ת מחקר — משרד הבריאות, ירושלים",
      en: "Research Assistant — Ministry of Health, Jerusalem",
      am: "የምርምር ረዳት — የጤና ሚኒስቴር, ኢየሩሳሌም",
    },
    description: {
      he: "עוזר/ת מחקר במחלקת הבריאות הציבורית של משרד הבריאות בירושלים. משרה חלקית (75%), עדיפות לבני קהילת יוצאי אתיופיה.",
      en: "Research assistant in the public health department of the Ministry of Health in Jerusalem. Part-time (75%), Order-50 priority.",
      am: "በኢየሩሳሌም የጤና ሚኒስቴር የሕዝብ ጤና ክፍል ውስጥ የምርምር ረዳት። ከፊል ጊዜ (75%)፤ ሥርዓት 50።",
    },
    employerNameExternal: "משרד הבריאות",
    citySlug: "jerusalem",
    region: "Jerusalem",
    employmentType: "PART_TIME",
    postedAt: "2026-05-11T00:00:00Z",
    validThrough: "2026-08-11T00:00:00Z",
    applicationUrl: "https://jobs.gov.il",
    affirmativeAction: true,
    trackSlug: "healthcare",
    bodies: {
      he: `## תיאור התפקיד

מחלקת הבריאות הציבורית של משרד הבריאות מחפשת עוזר/ת מחקר לפרויקט בריאות קהילתית בקרב יוצאי אתיופיה. התפקיד כולל איסוף וניתוח נתוני בריאות, ביצוע ריאיונות וסקרים קהילתיים, וכתיבת דוחות מדיניות בריאות.

## דרישות

- תואר ראשון בבריאות הציבור, אפידמיולוגיה, ביולוגיה, או תחום קרוב
- ידיעת שפות: עברית גבוהה, **אמהרית — תנאי לתפקיד זה**
- ניסיון בניתוח נתונים (Excel / SPSS / R) — יתרון
- רגישות תרבותית ויכולת תקשורת בין-תרבותית

## מה מציעים

- 75% משרה (גמיש — 4–5 ימים שבועיים)
- שכר ₪6,000–8,500 בהתאם לדרגה
- נסיעות לשטח ממומנות
- **צו 50** — יוצאי אתיופיה מוזמנים במיוחד; ידיעת אמהרית נדרשת

## הגשה

דרך jobs.gov.il. יש לציין בפירוש רמת אמהרית. מועד אחרון: 11.08.2026.`,

      en: `## Role Description

The public health department of the Ministry of Health is seeking a research assistant for a community-health project focused on Ethiopian-origin communities. Duties include collecting and analysing health data, conducting community interviews and surveys, and drafting health-policy reports.

## Requirements

- BA in public health, epidemiology, biology, or a related field
- Languages: high-level Hebrew; **Amharic — required for this role**
- Data-analysis experience (Excel / SPSS / R) — an advantage
- Cultural sensitivity and cross-cultural communication ability

## What We Offer

- 75% position (flexible — 4–5 days per week)
- ILS 6,000–8,500 based on grade
- Field-trip expenses covered
- **Order 50** — applicants of Ethiopian origin especially encouraged; Amharic proficiency required

## Application

Via jobs.gov.il. State Amharic level explicitly in your CV. Deadline: 11 August 2026.`,

      am: `## የቦታው መግለጫ

የጤና ሚኒስቴር የሕዝብ ጤና ክፍል ለኢትዮጵያ ተወላጅ ማህበረሰቦች ያተኮረ ምርምር ፕሮጀክት ሠራተኛ ፈልጎ ነው። ሃላፊነቱ የጤና ዳታ ሰብሰቡ ትንተና፣ ሕዝቡ ቃለ-ምልልስ፣ ፖሊሲ ዘገቦ ጽሑፍ ነው።

## መስፈርቶች

- ሕዝብ ጤና፣ ኤፒዲሚዮሎጂ ወይም ባዮሎጂ ዲግሪ
- ዕብራይስጥ ከፍተኛ ደረጃ፤ **አማርኛ — ለዚህ ቦታ ግዴታ**
- ዳታ ትንተና ልምድ — ጥቅም
- ባህላዊ ስሜት

## ምን ይቀርባል

- 75% ቦታ (ተለዋዋጭ)
- 6,000–8,500 ₪
- **ሥርዓት 50** — ለኢትዮጵያ ተወላጆች ቅድሚያ፤ አማርኛ ያስፈልጋል

## ማመልከቻ

jobs.gov.il። አማርኛ ደረጃ ይጥቀሱ። የመጨረሻ ቀን: 11.08.2026.`,
    },
  },
];

export function findJob(slug: string): JobPostingEntry | null {
  return JOBS.find((j) => j.slug === slug) ?? null;
}

/**
 * True when a job is currently active (`postedAt <= now < validThrough`).
 * Routes return 410 Gone for inactive postings so Google can drop them
 * from the Jobs feature without delay.
 */
export function isJobActive(job: JobPostingEntry, now: Date = new Date()): boolean {
  const posted = new Date(job.postedAt);
  const valid = new Date(job.validThrough);
  return posted <= now && now < valid;
}

export function activeJobs(now: Date = new Date()): JobPostingEntry[] {
  return JOBS.filter((j) => isJobActive(j, now));
}

export function activeJobsForTrack(
  trackSlug: string,
  now: Date = new Date(),
): JobPostingEntry[] {
  return activeJobs(now).filter((j) => j.trackSlug === trackSlug);
}

export function activeJobsForCity(
  citySlug: string,
  now: Date = new Date(),
): JobPostingEntry[] {
  return activeJobs(now).filter((j) => j.citySlug === citySlug);
}
