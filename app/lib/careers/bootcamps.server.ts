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

// Cities where ENP runs school placements — see lib/orgs/orgs.server.ts.
// Inlined here to avoid a circular import with relevance.ts.
const ENP_TEACHING_CITIES = [
  "netanya",
  "rishon-lezion",
  "rehovot",
  "ashkelon",
  "ashdod",
  "beer-sheva",
  "kiryat-malakhi",
  "petach-tikva",
  "haifa",
  "jerusalem",
];

export const BOOTCAMPS: BootcampEntry[] = [
  // 1 — ENP Tech-Career bootcamp ----------------------------------------
  {
    slug: "enp-tech-career",
    orgSlug: "enp",
    trackSlug: "tech",
    programType: "Bootcamp",
    name: {
      he: "ENP Tech-Career — bootcamp להייטק",
      en: "ENP Tech-Career — Tech bootcamp",
      am: "ENP Tech-Career — የቴክ ቡት ካምፕ",
    },
    shortDescription: {
      he: "Bootcamp בן 12 חודשים שמכין בוגרי תואר/בלי תואר לתפקידי junior developer ו-QA במגזר ההייטק.",
      en: "12-month bootcamp preparing graduates and non-graduates for junior developer and QA roles in tech.",
      am: "ለምሩቃንና ለምሩቃን-ያልሆኑ junior developer እና QA ሚናዎችን የሚያዘጋጅ የ12 ወር ቡት ካምፕ።",
    },
    timeToComplete: "P52W",
    financialAidEligible: true,
    occupationalCategory: "software-developer",
    applicationUrl: "https://www.enp.org.il/tech-career",
    relatedRights: ["tech-career-bootcamp", "student-aid"],
    relatedProfessions: ["career-counselor"],
    cities: ["tel-aviv", "beer-sheva", "haifa"],
    canonicalProgramSlug: "enp-tech-career",
    bodies: {
      he: `## למי

בוגרי תואר ראשון במדעי המחשב / מתמטיקה / הנדסה — או חסרי תואר עם הוכחת self-learning (פרויקטים, GitHub, MOOCs).

## מה כלול

- 12 חודשים של בוקר-ערב — Full-stack JavaScript/TypeScript, מסדי נתונים, DevOps בסיסי
- 2 פרויקטי portfolio שמתעדכנים שוטפת
- Mentor צמוד מהתעשייה (1:1, פעם בשבוע)
- חיפוש עבודה: 6 חודשים אחרי קורס עם partner-companies של ENP

## תוצאות

- שיעור placement: ~78% תוך 6 חודשים מסיום (דוח ENP 2024)
- שכר חציוני junior: ₪16-22K ב-3 השנים האחרונות

## איך פונים

[הגישו מועמדות](https://www.enp.org.il/tech-career) — תהליך כולל ראיון אישי + מבחן לוגיקה. החזרת הודעת קבלה תוך ~3 שבועות.

## ראו גם

- [ENP — פרופיל ארגון](/he/orgs/enp)
- [Tech-Career bootcamp — זכות](/he/rights/tech-career-bootcamp)
- [Tech-Career bootcamp — תכנית](/he/programs/enp-tech-career)`,
      en: `## Who is it for

Graduates with a bachelor's in CS / math / engineering — or non-graduates with proof of self-learning (projects, GitHub, MOOCs).

## What's included

- 12 months of morning-and-evening study — Full-stack JavaScript/TypeScript, databases, basic DevOps
- 2 continuously-updated portfolio projects
- 1:1 industry mentor (weekly)
- Job-search support for 6 months post-graduation with ENP partner companies

## Outcomes

- Placement rate: ~78% within 6 months of graduating (ENP 2024 report)
- Median junior salary: ₪16-22K over the past three years

## How to apply

[Apply here](https://www.enp.org.il/tech-career) — the process includes a personal interview and a logic test. Decision letter within ~3 weeks.

## See also

- [ENP — organization profile](/en/orgs/enp)
- [Tech-Career bootcamp — right](/en/rights/tech-career-bootcamp)
- [Tech-Career bootcamp — program](/en/programs/enp-tech-career)`,
      am: `## ለማን

በ CS / ሒሳብ / ኢንጂነሪንግ የመጀመሪያ ዲግሪ ያላቸው ምሩቃን — ወይም የራስ-ትምህርት ማስረጃ (ፕሮጀክቶች፣ GitHub) ያላቸው ምሩቃን-ያልሆኑ።

## የሚካተት

- 12 ወር ጥናት — Full-stack JavaScript፣ ዳታ ቤዝ
- 2 portfolio ፕሮጀክቶች
- 1:1 የኢንዱስትሪ አማካሪ
- ከ ENP አጋር ኩባንያዎች ጋር 6 ወር የስራ ፍለጋ ድጋፍ

## ውጤቶች

- የቅጥር መጠን: ~78% በ6 ወር ውስጥ
- መካከለኛ junior ደመወዝ: ₪16-22K

## ማመልከት

[ማመልከቻ ይላኩ](https://www.enp.org.il/tech-career)።`,
    },
  },

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

  // 4 — Hila → bagrut → tech transition ---------------------------------
  {
    slug: "hila-bagrut-tech",
    orgSlug: "hila",
    trackSlug: "tech",
    programType: "Course",
    name: {
      he: "Hila — בגרות → טכנולוגיה",
      en: "Hila — Matriculation → Tech transition",
      am: "ሂላ — የብቃት ምስክር → ቴክ ሽግግር",
    },
    shortDescription: {
      he: "מסלול 18-24 חודש להשלמת תעודת בגרות + מסלול תוכנית-מקצועית בהייטק לבני קהילה ללא בגרות מלאה.",
      en: "18-24 month track combining matriculation completion with a tech track for community members without full matriculation.",
      am: "ያለሙሉ የብቃት ምስክር ያላቸው ማህበረሰብ አባላት የብቃት ምስክርን ከቴክ መንገድ ጋር የሚያጣምር 18-24 ወር መንገድ።",
    },
    timeToComplete: "P78W",
    financialAidEligible: true,
    applicationUrl: "https://www.hila-equal-education.org.il",
    relatedRights: ["matriculation-grant", "tech-career-bootcamp"],
    relatedProfessions: [],
    cities: ["jerusalem", "tel-aviv", "haifa", "netanya"],
    canonicalProgramSlug: "hila-academic-tutoring",
    bodies: {
      he: `## למי

בני 19-30 מקהילת יוצאי אתיופיה ללא תעודת בגרות מלאה, שמעוניינים במעבר להייטק.

## מה כלול

- 12-18 חודשים של השלמת בגרות (5 יחידות מתמטיקה + אנגלית + מדעים)
- 6-12 חודשים של bootcamp פיתוח ראשוני (front-end / QA)
- מלגת קיום ₪3,500/חודש (תלוי בזמינות תקציב משרד החינוך)

## תוצאות

- 65% מסיימים את הבגרות בהצלחה (יעד: 80%, 2027 — תכנית הילה)
- 40% מהבוגרים ממשיכים ל-bootcamp הייטק מלא (כמו ENP Tech-Career)

## איך פונים

הרשמה דרך אתר הילה — חובה לעבור ראיון התאמה (יכולת התמדה היא הקריטריון העיקרי).

## ראו גם

- [Hila — פרופיל ארגון](/he/orgs/hila)
- [מענק בגרות לתלמידי תיכון](/he/rights/matriculation-grant)`,
      en: `## Who is it for

Community members aged 19-30 without full matriculation who want to transition into tech.

## What's included

- 12-18 months of matriculation completion (5-unit math + English + science)
- 6-12 months of intro dev bootcamp (front-end / QA)
- Living-cost grant of ₪3,500/month (subject to Ministry of Education budget)

## Outcomes

- 65% complete matriculation successfully (target: 80% by 2027 — Hila program plan)
- 40% of graduates continue into a full tech bootcamp (e.g. ENP Tech-Career)

## How to apply

Apply through the Hila website — requires a fit interview (perseverance is the main criterion).

## See also

- [Hila — organization profile](/en/orgs/hila)
- [Matriculation grant](/en/rights/matriculation-grant)`,
      am: `## ለማን

ሙሉ የብቃት ምስክር የሌላቸው የ19-30 የማህበረሰብ አባላት።

## የሚካተት

- 12-18 ወር የብቃት ምስክር መጨረስ
- 6-12 ወር መግቢያ የቴክ ቡት ካምፕ
- ₪3,500/ወር የመኖሪያ ክፍያ

## ውጤቶች

- 65% የብቃት ምስክሩን በስኬት ይጨርሳሉ`,
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

  // 6 — codeOved ---------------------------------------------------------
  {
    slug: "codeoved",
    trackSlug: "tech",
    programType: "Bootcamp",
    name: {
      he: "codeOved — bootcamp פיתוח",
      en: "codeOved — Developer bootcamp",
      am: "codeOved — የማበልፀጊ ቡት ካምፕ",
    },
    shortDescription: {
      he: "Bootcamp פיתוח 9 חודשים בדגש על תעסוקה מהירה — full-stack JS/Python, מתאים גם לחסרי תואר.",
      en: "9-month dev bootcamp with a fast-employment focus — full-stack JS/Python, suitable for non-graduates.",
      am: "ፈጣን ቅጥር ትኩረት ያለው የ9 ወር የማበልፀጊ ቡት ካምፕ።",
    },
    timeToComplete: "P36W",
    financialAidEligible: true,
    occupationalCategory: "software-developer",
    applicationUrl: "https://codeoved.org.il",
    relatedRights: ["tech-career-bootcamp"],
    relatedProfessions: ["career-counselor"],
    cities: ["tel-aviv", "haifa"],
    bodies: {
      he: `## למי

חסרי תואר עם תשוקה לתחום + יכולת התמדה. אין דרישת רקע טכני קודם.

## מה כלול

- 9 חודשי לימודים בוקר-ערב — JavaScript, Python, React, Node, SQL
- 5 פרויקטים בעלי הצמדה למיומנויות נדרשות בתעשייה
- ימי-חברה (open days) חודשיים עם מעסיקים שותפים

## תוצאות

- שיעור placement: ~65%
- שכר התחלה: ₪13-17K

## איך פונים

[הגשת מועמדות](https://codeoved.org.il) — מצריך מבחן לוגיקה + ראיון 60 דקות.`,
      en: `## Who is it for

Non-graduates with passion for the field and grit. No prior technical background required.

## What's included

- 9 months of morning-and-evening study — JavaScript, Python, React, Node, SQL
- 5 projects mapped to industry-required skills
- Monthly open days with partner employers

## Outcomes

- Placement rate: ~65%
- Starting salary: ₪13-17K

## How to apply

[Apply here](https://codeoved.org.il) — requires logic test + 60-minute interview.`,
      am: `## ለማን

በመስኩ ላይ ፍላጎትና ጠንካራ ፈቃደኝነት ያላቸው ምሩቃን-ያልሆኑ።

## የሚካተት

- 9 ወር ጥናት — JavaScript፣ Python፣ React
- 5 ፕሮጀክቶች

## ውጤቶች

- የቅጥር መጠን: ~65%`,
    },
  },

  // 7 — ScaleUp Velocity --------------------------------------------------
  {
    slug: "scaleup-velocity",
    trackSlug: "entrepreneurship",
    programType: "Bootcamp",
    name: {
      he: "ScaleUp Velocity — bootcamp ליזמות",
      en: "ScaleUp Velocity — Entrepreneurship bootcamp",
      am: "ScaleUp Velocity — የስራ ፈጠራ ቡት ካምፕ",
    },
    shortDescription: {
      he: "Bootcamp 16 שבועות לבוגרי תואר ראשון שמעוניינים לפתוח עסק — כולל seed funding לזוכים.",
      en: "16-week bootcamp for bachelor's graduates wanting to start a business — including seed funding for awardees.",
      am: "ስራ ለመጀመር ለሚፈልጉ ምሩቃን የ16 ሳምንት ቡት ካምፕ።",
    },
    timeToComplete: "P16W",
    financialAidEligible: true,
    applicationUrl: "https://scaleup-velocity.org",
    relatedRights: ["ujia-kiedf-business-loans"],
    relatedProfessions: ["accountant"],
    cities: ["tel-aviv", "jerusalem", "haifa", "beer-sheva"],
    bodies: {
      he: `## למי

בוגרי תואר ראשון בני קהילה עם רעיון עסקי בשלבים מוקדמים (validation בלתי-פורמלי + צוות מייסדים בן 1-3 איש).

## מה כלול

- 16 שבועות אינטנסיביים — business model canvas, MVP, GTM, fundraising
- חניכה צמודה מ-3 mentors (technical, business, financial)
- Seed funding ל-3 הצוותים המצטיינים: ₪50-150K לכל אחד
- Demo Day מול 30+ angel investors ו-VC partners

## תוצאות

- 12% מהבוגרים מקימים עסק שמגיע ל-revenue תוך שנתיים
- 65% נשארים בעולם היזמות

## איך פונים

הגשת מועמדות עם רעיון + צוות. סבב 1: כתב; סבב 2: pitch מול ועדה; סבב 3: התאמה אישית עם mentors.

## ראו גם

- [UJIA-KIEDF — הלוואות עסקים](/he/rights/ujia-kiedf-business-loans)`,
      en: `## Who is it for

Community bachelor's graduates with an early-stage business idea (informal validation + 1-3 founding team).

## What's included

- 16 intensive weeks — business model canvas, MVP, GTM, fundraising
- Close mentorship from 3 mentors (technical, business, financial)
- Seed funding for the top 3 teams: ₪50-150K each
- Demo Day in front of 30+ angel investors and VC partners

## Outcomes

- 12% of graduates build a revenue-generating business within 2 years
- 65% stay in entrepreneurship

## How to apply

Apply with an idea + team. Round 1: written; Round 2: pitch in front of a panel; Round 3: personal fit with mentors.

## See also

- [UJIA-KIEDF — business loans](/en/rights/ujia-kiedf-business-loans)`,
      am: `## ለማን

ቀደምት የንግድ ሀሳብ ያላቸው ምሩቃን።

## የሚካተት

- 16 ሳምንት ጥልቅ ጥናት
- 3 አማካሪዎች
- ₪50-150K seed funding ለ3 ቡድኖች`,
    },
  },

  // 8 — PRESEN -----------------------------------------------------------
  {
    slug: "presen",
    trackSlug: "tech",
    programType: "Course",
    name: {
      he: "PRESEN — הכנה לראיונות עבודה",
      en: "PRESEN — Interview Preparation",
      am: "PRESEN — የቃለ-መጠይቅ ዝግጅት",
    },
    shortDescription: {
      he: "קורס 8 שבועות להכנה לראיונות עבודה ולמיומנויות הצגה לבני קהילה — מבטל pre-screening bias.",
      en: "8-week interview prep + presentation skills course for community members — addresses pre-screening bias.",
      am: "ለማህበረሰብ አባላት የ8 ሳምንት የቃለ-መጠይቅ ዝግጅት ኮርስ።",
    },
    timeToComplete: "P8W",
    financialAidEligible: true,
    applicationUrl: "https://www.enp.org.il/presen",
    relatedRights: [],
    relatedProfessions: ["career-counselor"],
    cities: ["tel-aviv", "jerusalem", "haifa", "netanya", "beer-sheva"],
    bodies: {
      he: `## למי

בוגרי כל קורס/תואר/bootcamp שמתכוננים לחיפוש עבודה — מתאים גם לעובדים מנוסים שעוברים תפקיד.

## מה כלול

- 8 שבועות × 4 שעות — כתיבת CV, ראיון התנהגותי, ראיון טכני, מצגות
- Mock interviews עם מראיינים בכירים מ-15 חברות שותפות
- ליווי אישי בכל ראיון בפועל בחודש שאחרי הקורס

## למה זה קריטי

מחקרים מראים pre-screening bias: בני קהילה צריכים להגיש 30%+ יותר CVs כדי לקבל ראיון. PRESEN מבטל את הפער דרך הכנה ספציפית + קישור ל-allies בחברות.

## איך פונים

[הגשת מועמדות](https://www.enp.org.il/presen) — אין דרישות מקדימות.

## ראו גם

- [ENP — פרופיל ארגון](/he/orgs/enp)`,
      en: `## Who is it for

Graduates of any course/degree/bootcamp who are preparing for a job search — also relevant for experienced workers in transition.

## What's included

- 8 weeks × 4 hours — CV writing, behavioral interview, technical interview, presentations
- Mock interviews with senior interviewers from 15 partner companies
- Personal coaching for actual interviews in the month after the course

## Why this matters

Research shows pre-screening bias: community members need to submit 30%+ more CVs to get an interview. PRESEN closes the gap through specific prep + ally connections at companies.

## How to apply

[Apply here](https://www.enp.org.il/presen) — no prerequisites.

## See also

- [ENP — organization profile](/en/orgs/enp)`,
      am: `## ለማን

ለሥራ ፍለጋ የሚዘጋጁ ማንኛውም ኮርስ/ዲግሪ/ቡት ካምፕ ምሩቃን።

## የሚካተት

- 8 ሳምንት × 4 ሰዓት
- Mock interview ከ15 አጋር ኩባንያዎች
- የግል አማካሪነት`,
    },
  },

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

  // 10 — ENP teaching fellowship ----------------------------------------
  {
    slug: "enp-teaching-fellowship",
    orgSlug: "enp",
    trackSlug: "education",
    programType: "Apprenticeship",
    name: {
      he: "ENP — Fellowship מורים",
      en: "ENP — Teaching Fellowship",
      am: "ENP — የማስተማር Fellowship",
    },
    shortDescription: {
      he: "Fellowship שנתי + הכשרה למורים מהקהילה לבתי-ספר בערי-קליטה.",
      en: "Year-long fellowship + training for community teachers in absorption-city schools.",
      am: "ለማህበረሰብ መምህራን ዓመታዊ fellowship።",
    },
    timeToComplete: "P52W",
    financialAidEligible: true,
    occupationalCategory: "elementary-school-teacher",
    applicationUrl: "https://www.enp.org.il/teaching",
    relatedRights: ["matriculation-grant"],
    relatedProfessions: ["social-worker"],
    cities: ENP_TEACHING_CITIES,
    canonicalProgramSlug: "enp-shalav",
    bodies: {
      he: `## למי

בעלי תעודת הוראה (B.Ed או הסבת אקדמאים) מהקהילה, או סטודנטים בשנה האחרונה.

## מה כלול

- פלייסמנט בבית-ספר בערי-קליטה (נתניה, רחובות, באר-שבע, אשדוד)
- ליווי mentor ותיק (מורה דובר אמהרית עם 5+ שנים בתפקיד)
- מלגה ₪3,500/חודש מעבר לשכר התחלה רגיל של מורה
- רשת fellowship-alumni של 100+ מורים פעילים

## תוצאות

- 80% מהבוגרים נשארים בהוראה לפחות 3 שנים (vs 60% בסקטור הכללי)
- חיבור לבתי-ספר עם תלמידי קהילה (~250 אסכולות)

## איך פונים

הגשת מועמדות באוקטובר-נובמבר. דרישת תיק (CV + מכתב מוטיבציה + 2 המלצות).

## ראו גם

- [ENP — פרופיל ארגון](/he/orgs/enp)
- [ENP Shalav — תכנית](/he/programs/enp-shalav)`,
      en: `## Who is it for

Holders of a teaching certificate (B.Ed or academic conversion) from the community, or final-year students.

## What's included

- Placement at a school in an absorption city (Netanya, Rehovot, Beersheba, Ashdod)
- Mentorship from a veteran teacher (Amharic-speaker with 5+ years in role)
- ₪3,500/month grant on top of the regular starting teacher salary
- Fellowship-alumni network of 100+ active teachers

## Outcomes

- 80% of fellows stay in teaching for at least 3 years (vs 60% in the general sector)
- Connection to schools with community students (~250 schools in the program)

## How to apply

Apply October-November. Requires a portfolio (CV + motivation letter + 2 references).

## See also

- [ENP — organization profile](/en/orgs/enp)
- [ENP Shalav — program](/en/programs/enp-shalav)`,
      am: `## ለማን

የማስተማር ምስክር ወረቀት ያላቸው ወይም የመጨረሻ ዓመት ተማሪዎች።

## የሚካተት

- በመቀበያ ከተማ ትምህርት ቤት ምደባ
- ከ ENP አማካሪነት
- ₪3,500/ወር እርዳታ`,
    },
  },

  // 11 — Madrasa trades -------------------------------------------------
  {
    slug: "madrasa-trades",
    trackSlug: "trades",
    programType: "Apprenticeship",
    name: {
      he: "Madrasa — מקצועות יד מסובסדים",
      en: "Madrasa — Subsidized Trades",
      am: "Madrasa — የተደገፉ የእጅ ሙያዎች",
    },
    shortDescription: {
      he: "רשת קורסים מקצועיים מסובסדים בחשמל, אינסטלציה, ריתוך ומכונאות — כולל ליווי לפתיחת עסק עצמאי.",
      en: "Network of subsidized trade courses in electrical, plumbing, welding, and mechanics — including self-employment launch support.",
      am: "በኤሌክትሪክ፣ ቧንቧ፣ ብየዳና ሜካኒክ የተደገፉ የሙያ ኮርሶች።",
    },
    timeToComplete: "P26W",
    financialAidEligible: true,
    applicationUrl: "https://www.gov.il/he/departments/employment/govil-services",
    relatedRights: ["ujia-kiedf-business-loans"],
    relatedProfessions: [],
    cities: ["netanya", "rehovot", "kiryat-malakhi", "beer-sheva", "haifa", "ashdod"],
    bodies: {
      he: `## למי

בני 18-45 מקהילת יוצאי אתיופיה ללא רקע מקצועי קודם. אין דרישת תעודת בגרות.

## מה כלול

- 4-9 חודשי הכשרה מקצועית (משתנה לפי המקצוע)
- מסובסד 100% ע"י משרד העבודה — חינם לחלוטין לבני קהילה (תקציב 2024)
- אישור מקצועי של משרד העבודה בסיום
- 3 חודשי ליווי עסקי (אם רוצים לפתוח עצמאי) — חיבור ל-UJIA-KIEDF להלוואה

## תוצאות

- 90% מסיימים את ההכשרה
- ~60% פותחים עסק עצמאי תוך שנה; השאר משתלבים אצל מעסיקים

## איך פונים

הרשמה דרך לשכת תעסוקה אזורית — מצריך תעודת זהות + ראיון התאמה + מבחן ידיים בסיסי.

## ראו גם

- [UJIA-KIEDF — הלוואות עסקים](/he/rights/ujia-kiedf-business-loans)`,
      en: `## Who is it for

Community members aged 18-45 without prior professional background. No matriculation certificate required.

## What's included

- 4-9 months of professional training (varies by trade)
- 100% subsidized by the Ministry of Labor — completely free for community members (2024 budget)
- Ministry of Labor professional certification on completion
- 3 months of business mentorship (for self-employed launches) — connection to UJIA-KIEDF loan

## Outcomes

- 90% complete the training
- ~60% open a self-employed business within a year; the rest join existing employers

## How to apply

Register through your regional Employment Service office — requires national ID + fit interview + basic hands-on test.

## See also

- [UJIA-KIEDF — business loans](/en/rights/ujia-kiedf-business-loans)`,
      am: `## ለማን

ቀደምት የሙያ ልምድ የሌላቸው የ18-45 ማህበረሰብ አባላት።

## የሚካተት

- 4-9 ወር የሙያ ስልጠና
- 100% በመንግስት የተደገፈ
- የፈቃድ ምስክር ወረቀት`,
    },
  },

  // 12 — TA employment academy -----------------------------------------
  {
    slug: "ta-employment-academy",
    trackSlug: "retail-services",
    programType: "Course",
    name: {
      he: "אקדמיית ת״א לתעסוקה",
      en: "TA Employment Academy",
      am: "የቴል አቪቭ የቅጥር አካዳሚ",
    },
    shortDescription: {
      he: "הכשרה תעסוקתית 4-12 שבועות בשירות, מכירות וניהול — בחינם לבני קהילה תושבי תל-אביב.",
      en: "4-12 week employment training in service, sales, and management — free for community members living in Tel Aviv.",
      am: "በቴል አቪቭ ለማህበረሰብ አባላት ነፃ የ4-12 ሳምንት የቅጥር ስልጠና።",
    },
    timeToComplete: "P8W",
    financialAidEligible: true,
    applicationUrl: "https://www.tel-aviv.gov.il/employment",
    relatedRights: [],
    relatedProfessions: [],
    cities: ["tel-aviv"],
    bodies: {
      he: `## למי

תושבי תל-אביב מקהילת יוצאי אתיופיה — פתוח גם לחסרי עברית מתקדמת + חסרי תעודת בגרות.

## מה כלול

- 4-12 שבועות (לפי המסלול): שירות לקוחות, מכירות, ניהול-משמרת, ניהול-חנות
- הכשרה צמודה לדרישות מעסיקים בעיר (שופרסל, חנויות אופנה, רשתות שירות)
- מלגת קיום ₪2,500/חודש לתקופת ההכשרה

## תוצאות

- 75% נכנסים לעבודה ראשונה תוך 8 שבועות מסיום הקורס
- שכר התחלה: ₪32-37 לשעה (4-5 שעות יום בממוצע)

## איך פונים

[הגשת מועמדות](https://www.tel-aviv.gov.il/employment) דרך אתר העירייה — חובה תושבות תל-אביב.`,
      en: `## Who is it for

Tel Aviv residents from the Ethiopian-Israeli community — open to those without advanced Hebrew + without matriculation certificate.

## What's included

- 4-12 weeks (per track): customer service, sales, shift management, store management
- Training tightly mapped to city employer demand (Shufersal, fashion chains, service networks)
- Living-cost grant of ₪2,500/month during training

## Outcomes

- 75% land their first job within 8 weeks of completing the course
- Starting wage: ₪32-37/hour (4-5 hours/day on average)

## How to apply

[Apply here](https://www.tel-aviv.gov.il/employment) via the municipality website — Tel Aviv residency required.`,
      am: `## ለማን

በቴል አቪቭ የሚኖሩ የማህበረሰብ አባላት።

## የሚካተት

- 4-12 ሳምንት ስልጠና
- ₪2,500/ወር የመኖሪያ ክፍያ`,
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

  // 15 — Place-IL --------------------------------------------------------
  {
    slug: "place-il",
    trackSlug: "retail-services",
    programType: "Course",
    name: {
      he: "Place-IL — שירות השמה",
      en: "Place-IL — Job Placement",
      am: "Place-IL — የቅጥር አገልግሎት",
    },
    shortDescription: {
      he: "רשת השמה ארצית לבעלי משברי-תעסוקה אחרי קורונה / ניוד — תיאום ראיונות והשמה בעבודה ראשונה.",
      en: "National placement network for those facing job-disruption after COVID / relocation — interview coordination and first-job placement.",
      am: "ብሔራዊ የቅጥር ኔትዎርክ።",
    },
    financialAidEligible: false,
    applicationUrl: "https://place-il.org",
    relatedRights: [],
    relatedProfessions: ["career-counselor"],
    cities: ["netanya", "rehovot", "rishon-lezion", "haifa", "beer-sheva", "ashdod"],
    bodies: {
      he: `## למי

עובדים שכירים שהפסיקו עבודה תוך 6-12 חודשים האחרונים (פיטורים, סגירת עסק, מעבר אזור) — מותאם בעיקר לקהילה אחרי שדרוג מקצועי לא-מוצלח.

## מה כלול

- ייעוץ קריירה אישי 60 דקות (חינמי, פגישה ראשונה)
- חיבור ישיר ל-50+ מעסיקים שותפים בשירות, קמעונאות, וניהול-חנות
- תיאום 3-5 ראיונות תוך החודשיים הראשונים אחרי הרישום
- ליווי לאחר השמה (3 חודשים)

## תוצאות

- 70% מתחילים עבודה חדשה תוך 8 שבועות מהרישום
- שכר ממוצע: ₪10-15K (תפקידי-שכר חודשי)

## איך פונים

[רישום](https://place-il.org) — מצריך הצגת CV או תיאור-מילולי של נסיון תעסוקתי.`,
      en: `## Who is it for

Wage-employed workers who lost their job in the last 6-12 months (layoffs, business closure, relocation) — designed primarily for community members after an unsuccessful career upgrade.

## What's included

- Free 60-minute personal career consultation (first meeting)
- Direct connection to 50+ partner employers in service, retail, and store management
- Coordination of 3-5 interviews within the first two months of registration
- 3-month post-placement support

## Outcomes

- 70% start a new job within 8 weeks of registration
- Average salary: ₪10-15K (monthly-wage roles)

## How to apply

[Register](https://place-il.org) — requires either a CV or a written description of work experience.`,
      am: `## ለማን

በ6-12 ወር ውስጥ ስራቸውን ያጡ ሰራተኞች።

## የሚካተት

- ነፃ የ60-ደቂቃ ምክክር
- ከ50+ አጋር ቀጣሪዎች ጋር ግንኙነት
- 3-5 ቃለ-መጠይቆች ማስተባበር`,
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
