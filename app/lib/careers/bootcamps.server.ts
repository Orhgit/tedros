// Bootcamp / program seed (RIN-472 — Careers Hub Wave 2 / RIN-469).
//
// 15 entry-into-career programs authored in HE/EN/AM, framed as routes
// **into** a `CareerTrack`. This is a curated SEO surface separate from
// the generic `lib/programs/programs.server.ts` (RIN-424): a bootcamp here
// lives at `/careers/programs/$slug` and emits an
// `EducationalOccupationalProgram` JSON-LD or a `Service` for mentorships
// (semantic match for unstructured 1:1 programs).
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. Slugs match the
// canonical list pinned by `tests/careers-links.test.ts` so a typo never
// produces a dead `recommendedBootcamps` reference from a track seed.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { BootcampProgramType } from "./schema";

export interface BootcampEntry {
  slug: string;
  /** Org slug from `lib/orgs/orgs.server.ts`. Optional for cross-org bootcamps. */
  orgSlug?: string;
  /** Career track this bootcamp leads into (matches `CareerTrack`). */
  trackSlug: string;
  programType: BootcampProgramType;
  name: Translatable;
  shortDescription: Translatable;
  /** ISO-8601 duration, e.g. `P12W` for 12 weeks. */
  timeToComplete?: string;
  /** True when financial aid / subsidies cover community-member tuition. */
  financialAidEligible: boolean;
  /** Free-form occupational category (BLS code or plain text). */
  occupationalCategory?: string;
  applicationUrl: string;
  /** Right slugs satisfied by this bootcamp's eligibility. */
  relatedRights: string[];
  /** Profession slugs (RIN-444). */
  relatedProfessions: string[];
  /** City slugs where the bootcamp has a physical campus. */
  cities: string[];
  /** Optional canonical link into the generic /programs/$slug surface. */
  canonicalProgramSlug?: string;
  bodies: Record<Locale, string>;
}

export const BOOTCAMPS: BootcampEntry[] = [
  // 2 — Olim Beyahad mentorship -----------------------------------------
  {
    slug: "olim-beyahad-mentorship",
    orgSlug: "olim-beyahad",
    trackSlug: "tech",
    programType: "Mentorship",
    name: {
      he: "עולים ביחד — Mentorship 1:1",
      en: "Olim Beyahad — 1:1 Mentorship",
      am: "ኦሊም በያሐድ — 1:1 አማካሪነት",
    },
    shortDescription: {
      he: "Mentorship שנתי 1:1 לבוגרי תואר במדעי המחשב, מתמטיקה והנדסה — שילוב אקדמיה לתעשייה.",
      en: "Year-long 1:1 mentorship for graduates in CS, math, and engineering — bridging academia to industry.",
      am: "ለ CS፣ ሒሳብና ኢንጂነሪንግ ምሩቃን ዓመታዊ 1:1 አማካሪነት።",
    },
    financialAidEligible: false,
    applicationUrl: "https://www.olimbeyahad.org.il/programs",
    relatedRights: ["student-aid"],
    relatedProfessions: ["career-counselor"],
    cities: ["tel-aviv", "haifa", "jerusalem"],
    canonicalProgramSlug: "olim-beyahad-1on1-mentorship",
    bodies: {
      he: `## למי

בוגרי תואר ראשון/שני בני קהילת יוצאי אתיופיה, בעיקר במדעי המחשב, מתמטיקה, סטטיסטיקה והנדסה.

## מה כלול

- Mentor אישי מהתעשייה (לא ENP staff — מתנדבים ב-VC/startups/corporates)
- פגישה שבועית/דו-שבועית, וידאו או פנים-מול-פנים
- ליווי בקריירה: בחירת תפקיד, הכנה לראיונות, משא-ומתן על שכר
- רשת alumni של 1,500+ בוגרים פעילים

## תוצאות

- שיעור placement: ~85% מהבוגרים בעבודה רלוונטית תוך 6 חודשים
- 70% מעלים-ביחד נשארים בקריירה אחרי 5 שנים

## איך פונים

הגשת מועמדות בסתיו (אוקטובר-נובמבר). תהליך כולל מילוי טופס + ראיון 30 דקות.

## ראו גם

- [Olim Beyahad — פרופיל ארגון](/he/orgs/olim-beyahad)
- [Olim Beyahad mentorship — תכנית](/he/programs/olim-beyahad-1on1-mentorship)`,
      en: `## Who is it for

BA/MA graduates from the Ethiopian-Israeli community, primarily in CS, math, statistics, and engineering.

## What's included

- Personal industry mentor (not ENP staff — volunteers from VCs/startups/corporates)
- Weekly or bi-weekly meetings, video or in-person
- Career guidance: role selection, interview prep, salary negotiation
- Alumni network of 1,500+ active graduates

## Outcomes

- Placement rate: ~85% in relevant employment within 6 months
- 70% of Olim Beyahad alumni stay in their career after 5 years

## How to apply

Applications open in autumn (Oct-Nov). Includes a form + 30-minute interview.

## See also

- [Olim Beyahad — organization profile](/en/orgs/olim-beyahad)
- [Olim Beyahad mentorship — program](/en/programs/olim-beyahad-1on1-mentorship)`,
      am: `## ለማን

በ CS፣ ሒሳብ፣ ስታቲስቲክስና ኢንጂነሪንግ የመጀመሪያ/ሁለተኛ ዲግሪ ምሩቃን።

## የሚካተት

- ግላዊ የኢንዱስትሪ አማካሪ
- ሳምንታዊ/ሁለት-ሳምንታዊ ስብሰባዎች
- የስራ መመሪያ
- ከ1,500+ ምሩቃን ኔትዎርክ

## ውጤቶች

- የቅጥር መጠን: ~85% በ6 ወር ውስጥ`,
    },
  },

  // 3 — ISEF excellence + employment ------------------------------------
  {
    slug: "isef-excellence-employment",
    orgSlug: "isef",
    trackSlug: "finance",
    programType: "Course",
    name: {
      he: "ISEF — מסלול מצטיינים → תעסוקה",
      en: "ISEF — Excellence-to-Employment Track",
      am: "ISEF — የብቃት-ወደ-ቅጥር መንገድ",
    },
    shortDescription: {
      he: "מלגות מצטיינים BA/MA + הכנה לתפקידי entry-level בבנקים, פירמות ראיית-חשבון וחברות פיננסיות.",
      en: "BA/MA excellence scholarships paired with entry-level role prep at banks, accounting firms, and finance companies.",
      am: "BA/MA የብቃት እርዳታዎች ከ banks፣ የሂሳብ ኩባንያዎችና የፋይናንስ ኩባንያዎች መግቢያ ሚናዎች ጋር።",
    },
    financialAidEligible: true,
    applicationUrl: "https://www.isef.org.il",
    relatedRights: ["hesegim-scholarships", "excellence-employment", "student-aid"],
    relatedProfessions: ["accountant", "mortgage-advisor"],
    cities: ["tel-aviv", "jerusalem", "haifa", "beer-sheva"],
    canonicalProgramSlug: "isef-ba-scholarship",
    bodies: {
      he: `## למי

מועמדים מהקהילה לתואר ראשון בחשבונאות / מימון / כלכלה — עם ממוצע אקדמי גבוה (סף ~85).

## מה כלול

- מלגה משלימה (₪8,000-12,000 לשנה) על-גבי הסף הממשלתי
- הכנה ייעודית לראיונות + בחינות הסמכה (CPA/CFA-track)
- חיבור לפירמות שותפות (BIG4 + 4 הבנקים) להתמחויות
- Networking שנתי עם בוגרים בכירים בענף

## תוצאות

- 60%+ מהבוגרים מתחילים בפירמת BIG4 או בנק תוך שנה מסיום הלימודים
- שכר התחלה: ₪12-18K (junior accountant), עליה ל-₪22-30K אחרי הסמכה

## איך פונים

הגשת מועמדות במאי-יוני לפני שנת הלימודים. מצריך אישור על קבלה לאוניברסיטה + ציוני בגרות + ראיון.

## ראו גם

- [ISEF — פרופיל ארגון](/he/orgs/isef)
- [Hesegim — מלגות](/he/rights/hesegim-scholarships)`,
      en: `## Who is it for

Community applicants pursuing a bachelor's in accounting / finance / economics — with a high academic average (~85+ threshold).

## What's included

- Top-up scholarship (₪8,000-12,000/year) layered on top of the government threshold
- Targeted interview prep + certification exam support (CPA/CFA-track)
- Connection to partner firms (BIG4 + the 4 major banks) for internships
- Annual networking with senior alumni in the industry

## Outcomes

- 60%+ of graduates start at a BIG4 firm or bank within a year of graduating
- Starting salary: ₪12-18K (junior accountant), rising to ₪22-30K post-certification

## How to apply

Applications open in May-June before the academic year. Requires university acceptance + matriculation grades + interview.

## See also

- [ISEF — organization profile](/en/orgs/isef)
- [Hesegim — scholarships](/en/rights/hesegim-scholarships)`,
      am: `## ለማን

በሂሳብ / ፋይናንስ / ኢኮኖሚክስ የመጀመሪያ ዲግሪ የሚማሩ የማህበረሰብ አመልካቾች።

## የሚካተት

- ተጨማሪ እርዳታ (₪8,000-12,000 በዓመት)
- የቃለ-መጠይቅ ዝግጅት + የምስክር ወረቀት ድጋፍ
- ከአጋር ኩባንያዎች ጋር ግንኙነት

## ውጤቶች

- 60%+ በ BIG4 ወይም ባንክ ውስጥ ይጀምራሉ
- መነሻ ደመወዝ: ₪12-18K`,
    },
  },

  // 5 — ITWorks Israel ---------------------------------------------------
  {
    slug: "itworks-israel",
    trackSlug: "tech",
    programType: "Bootcamp",
    name: {
      he: "ITWorks Israel — bootcamp לעולים",
      en: "ITWorks Israel — Bootcamp for Olim",
      am: "ITWorks Israel — ለስደተኞች ቡት ካምፕ",
    },
    shortDescription: {
      he: "Bootcamp הייטק 6-12 חודשים שמיועד לעולים חדשים (כולל בני קהילה דור 1) — תמיכה בעברית בסיסית + מסלול מואץ.",
      en: "6-12 month tech bootcamp for new olim (including 1st-gen community members) — basic-Hebrew support + accelerated track.",
      am: "ለአዳዲስ ስደተኞች የ6-12 ወር የቴክ ቡት ካምፕ።",
    },
    timeToComplete: "P36W",
    financialAidEligible: true,
    occupationalCategory: "software-developer",
    applicationUrl: "https://itworks.org.il",
    relatedRights: ["tech-career-bootcamp", "klita-basket"],
    relatedProfessions: ["career-counselor"],
    cities: ["tel-aviv", "jerusalem", "haifa"],
    bodies: {
      he: `## למי

עולים חדשים — כולל בני קהילה דור 1 שעלו ב-2020+ — שלא דוברים עברית ברמה אקדמית.

## מה כלול

- 6-12 חודשים — Full-stack development, JavaScript/Python, מסדי נתונים
- שיעורי עברית טכנית במקביל (לא ulpan כללי)
- חיבור למעסיקים שמחפשים דוברי-שפות-זרות (~50 חברות-שותפות)

## תוצאות

- שיעור placement: ~70% תוך 6 חודשים מסיום
- שכר ראשון: ₪14-19K

## איך פונים

[הגשת מועמדות](https://itworks.org.il) — מצריך הוכחת רקע טכני בסיסי + מבחן עברית-אנגלית.

## ראו גם

- [Tech-Career bootcamp — זכות](/he/rights/tech-career-bootcamp)
- [סל קליטה](/he/rights/klita-basket)`,
      en: `## Who is it for

New olim — including 1st-gen community members who arrived in 2020+ — without academic-level Hebrew.

## What's included

- 6-12 months — Full-stack development, JavaScript/Python, databases
- Technical-Hebrew classes alongside (not generic ulpan)
- Connection to employers seeking foreign-language speakers (~50 partner companies)

## Outcomes

- Placement rate: ~70% within 6 months of graduating
- Starting salary: ₪14-19K

## How to apply

[Apply here](https://itworks.org.il) — requires basic technical background + Hebrew/English test.

## See also

- [Tech-Career bootcamp — right](/en/rights/tech-career-bootcamp)
- [Klita basket](/en/rights/klita-basket)`,
      am: `## ለማን

በ2020+ የመጡ 1ኛ ትውልድ የማህበረሰብ አባላትን ጨምሮ አዲስ ስደተኞች።

## የሚካተት

- 6-12 ወር — Full-stack development
- ጎን ለጎን የቴክኒክ ዕብራይስጥ ትምህርት

## ውጤቶች

- የቅጥር መጠን: ~70%`,
    },
  },

  // TED-158: the "codeOved" bootcamp entry was removed. No organisation,
  // site or domain of that name could be found — it appears to be a
  // garbling of KodCode (kodcode.org.il), which is a different operator
  // with different terms. A published placement rate ("~65%") was
  // attached to it.

  // 9 — Career counselors network (cross-org) ---------------------------
  {
    slug: "career-counselors-network",
    trackSlug: "social-work",
    programType: "Mentorship",
    name: {
      he: "רשת יועצי קריירה",
      en: "Career Counselors Network",
      am: "የሙያ አማካሪዎች ኔትዎርክ",
    },
    shortDescription: {
      he: "רשת יועצי קריירה דוברי אמהרית — קישור חינמי לפגישת ייעוץ אישית, מתאים לכל שלב בקריירה.",
      en: "Network of Amharic-speaking career counselors — free personal consultation, relevant at any career stage.",
      am: "የነፃ የግል ምክክር — በማንኛውም የሙያ ደረጃ።",
    },
    financialAidEligible: true,
    applicationUrl: "/he/professionals/career-counselor",
    relatedRights: [],
    relatedProfessions: ["career-counselor"],
    cities: [
      "netanya",
      "rishon-lezion",
      "rehovot",
      "jerusalem",
      "haifa",
      "beer-sheva",
      "tel-aviv",
    ],
    bodies: {
      he: `## למי

כל בן/בת קהילה — מתלמידי תיכון השוקלים מסלול אקדמי, דרך בוגרי תואר שמחפשים עבודה ראשונה, ועד מקצוענים בעלי-ניסיון בנקודות-מפנה.

## מה כלול

- פגישת ייעוץ ראשונה חינמית (60 דק') עם יועץ דובר אמהרית
- אבחון נטיות + מיפוי מסלולי קריירה רלוונטיים
- חיבור לתכניות ספציפיות (bootcamps, מלגות, ייעוץ משפטי) לפי הצורך
- מעקב 3-6 חודשים אחרי הפגישה הראשונה

## איך פונים

חיפוש יועץ קריירה ב-[directory של בני מקצוע](/he/professionals/career-counselor) ו-בוקינג ישיר. כל היועצים אומתו ע"י Tedros.`,
      en: `## Who is it for

Any community member — from high-school students considering an academic track, through bachelor's grads looking for a first job, to experienced professionals at career inflection points.

## What's included

- Free initial 60-minute consultation with an Amharic-speaking counselor
- Aptitude assessment + mapping of relevant career paths
- Connection to specific programs (bootcamps, scholarships, legal aid) as needed
- 3-6 month follow-up after the first session

## How to apply

Find a career counselor in the [professionals directory](/en/professionals/career-counselor) and book directly. All counselors are vetted by Tedros.`,
      am: `## ለማን

ሁሉም የማህበረሰብ አባል።

## የሚካተት

- ነፃ የመጀመሪያ 60-ደቂቃ ምክክር
- የክህሎት ግምገማ
- ወደ ልዩ ፕሮግራሞች ግንኙነት
- ከ3-6 ወር ክትትል`,
    },
  },

  // 13 — Atidim academic ------------------------------------------------
  {
    slug: "atidim-academic",
    trackSlug: "public-sector",
    programType: "Apprenticeship",
    name: {
      he: "עתידים אקדמי",
      en: "Atidim Academic",
      am: "Atidim Academic",
    },
    shortDescription: {
      he: "מסלול אקדמי + שירות ציבורי מובטח לזוכים — תואר ראשון/שני בחסות עתידים, אז 3 שנות שירות במשרד ממשלתי.",
      en: "Academic track with guaranteed civil-service placement for awardees — BA/MA under Atidim sponsorship, then 3 years of ministry service.",
      am: "ለተሸላሚዎች የተረጋገጠ የመንግስት አገልግሎት ቦታ ያለው የአካዳሚክ መንገድ።",
    },
    financialAidEligible: true,
    applicationUrl: "https://www.atidim.org",
    relatedRights: ["public-sector-representation", "student-aid"],
    relatedProfessions: ["lawyer", "social-worker", "career-counselor"],
    cities: ["jerusalem", "tel-aviv", "haifa"],
    bodies: {
      he: `## למי

בוגרי תיכון מצטיינים מקהילת יוצאי אתיופיה (ממוצע בגרות 90+). מסלול נדיר ויוקרתי.

## מה כלול

- תואר ראשון/שני בחסות מלאה של עתידים (~₪40K-60K לשנה — שכר לימוד, מגורים, מלגה)
- ליווי mentor אישי + group cohort
- שירות ציבורי מובטח 3 שנים אחרי סיום (משרד מרכזי לפי בחירה)
- שכר ראשון בשירות הציבורי: ~₪14-18K (דרגה 4-5)

## תוצאות

- 95% מסיימים את התואר במועד
- 100% משולבים בשירות ציבורי תוך 6 חודשים מסיום הלימודים
- 70% נשארים בשירות גם אחרי תקופת ההתחייבות

## איך פונים

הגשת מועמדות בכיתה י"ב — תהליך ארוך כולל מבחני סינון, ראיון אישי + ועדה.

## ראו גם

- [ייצוג הולם בשירות הציבורי](/he/rights/public-sector-representation)
- [תעסוקה — affirmative action](/he/careers/affirmative-action)`,
      en: `## Who is it for

Top-tier high school graduates from the Ethiopian-Israeli community (matriculation average 90+). A rare and prestigious track.

## What's included

- Fully-sponsored BA/MA (~₪40K-60K/year — tuition, housing, stipend)
- Personal mentor + cohort group
- Guaranteed 3-year civil-service placement after graduation (central ministry of choice)
- Starting civil-service salary: ~₪14-18K (grades 4-5)

## Outcomes

- 95% complete their degree on time
- 100% placed in civil service within 6 months of graduating
- 70% stay in service after the commitment period

## How to apply

Apply in 12th grade — a long process including screening tests, personal interview + panel.

## See also

- [Affirmative-action public-sector right](/en/rights/public-sector-representation)
- [Careers — affirmative action](/en/careers/affirmative-action)`,
      am: `## ለማን

ከፍተኛ ነጥብ ያላቸው የሁለተኛ ደረጃ ምሩቃን (90+ መካከለኛ)።

## የሚካተት

- ሙሉ የተደገፈ BA/MA
- ግላዊ አማካሪ
- ከስኬት በኋላ የተረጋገጠ 3 ዓመት የመንግስት አገልግሎት`,
    },
  },

  // 14 — Atidim military ------------------------------------------------
  {
    slug: "atidim-military",
    trackSlug: "public-sector",
    programType: "Apprenticeship",
    name: {
      he: "עתידים צה״לי",
      en: "Atidim Military",
      am: "Atidim Military",
    },
    shortDescription: {
      he: "מסלול צה״לי לבני קהילה — תפקיד טכנולוגי בצבא + מסלול תעסוקה בשירות הציבורי לאחר השחרור.",
      en: "IDF track for community members — technological role in the military + civil-service career path after release.",
      am: "ለማህበረሰብ አባላት የ IDF መንገድ።",
    },
    financialAidEligible: true,
    applicationUrl: "https://www.atidim.org/military",
    relatedRights: ["public-sector-representation", "aharai-pre-army"],
    relatedProfessions: ["career-counselor"],
    cities: ["tel-aviv", "haifa", "beer-sheva"],
    bodies: {
      he: `## למי

תלמידי תיכון בני קהילה (כיתות י-י"ב) שזכאים למיון 9300+ + ראיון מסלול אקדמיה.

## מה כלול

- 4 שנות שירות בצה״ל בתפקידים טכנולוגיים (mamram, יחידת 8200, מודיעין)
- חניכה צמודה במהלך השירות — קהילת cohort של 30 חיילים מהקהילה
- מלגת תואר ראשון אחרי השחרור (₪30K)
- חיבור ישיר לתפקיד ראשון בשירות הציבורי דרך עתידים academic

## תוצאות

- 95% מסיימים שירות מלא ב-תפקיד טכנולוגי
- 80% נכנסים לאוניברסיטה בתואר רלוונטי תוך 18 חודשים מהשחרור

## איך פונים

תהליך מתחיל בכיתה י' עם הרשמה ל-מסלול. מצריך מבחני קב"א גבוהים + ראיונות + הסכמת הורים.

## ראו גם

- [Aharai pre-army](/he/rights/aharai-pre-army)`,
      en: `## Who is it for

Community high-school students (grades 10-12) eligible for IDF screening 9300+ and academia-track interview.

## What's included

- 4 years of IDF service in technological roles (Mamram, Unit 8200, Intelligence)
- Close mentorship during service — cohort community of 30 community soldiers
- Bachelor's scholarship after release (₪30K)
- Direct connection to first civil-service role through Atidim academic

## Outcomes

- 95% complete full service in their technological role
- 80% enroll in a relevant university degree within 18 months of release

## How to apply

The process starts in 10th grade with registration to the track. Requires high IDF screening scores + interviews + parental consent.

## See also

- [Aharai pre-army](/en/rights/aharai-pre-army)`,
      am: `## ለማን

ለ IDF ምርጫ 9300+ ብቁ የሁለተኛ ደረጃ ተማሪዎች።

## የሚካተት

- 4 ዓመት የቴክኖሎጂ ሚና በ IDF
- ከመለቀቅ በኋላ የ₪30K የዲግሪ እርዳታ`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findBootcamp(slug: string): BootcampEntry | null {
  return BOOTCAMPS.find((b) => b.slug === slug) ?? null;
}

export function bootcampsForTrack(trackSlug: string): BootcampEntry[] {
  return BOOTCAMPS.filter((b) => b.trackSlug === trackSlug);
}

export function bootcampsForOrg(orgSlug: string): BootcampEntry[] {
  return BOOTCAMPS.filter((b) => b.orgSlug === orgSlug);
}

export function bootcampsForCity(citySlug: string): BootcampEntry[] {
  return BOOTCAMPS.filter((b) => b.cities.includes(citySlug));
}

export function bootcampBody(entry: BootcampEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
