// Career-FAQ seed scaffold (RIN-470 → RIN-475 / RIN-469).
//
// Sub-6 (RIN-475) fills FAQS with 20 long-tail Q&A entries. Sub-1
// declares the shape so the route loader and FAQPage schema validator
// can compile against the type today.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";

export interface CareerFaqEntry {
  slug: string;
  /** The question text — H1 of the FAQ page. */
  question: Translatable;
  /** TL;DR (1-2 sentences) — used as `description` and TL;DR box. */
  shortAnswer: Translatable;
  /** Track this FAQ relates to (optional — some are cross-track). */
  trackSlug?: string;
  /** Order in which to display under `/careers/faq`. */
  orderIndex: number;
  /** ISO-8601 date the answer was last reviewed by content team (E-E-A-T). */
  reviewedAt: string;
  /** Bodies × locale — populated in Sub-6 (~250-400 words HE). */
  bodies: Record<Locale, string>;
}

export const FAQS: CareerFaqEntry[] = [
  {
    slug: "how-to-start-tech-career-ethiopian",
    orderIndex: 1,
    trackSlug: "tech",
    reviewedAt: "2026-05-01",
    question: {
      he: "איך להתחיל קריירה בהייטק כיוצא אתיופיה?",
      en: "How to start a tech career as an Ethiopian-Israeli?",
      am: "እንደ ኢትዮጵያ-እስራኤላዊ የቴክ ሙያ እንዴት ይጀመራል?",
    },
    shortAnswer: {
      he: "השלב הראשון הוא bootcamp 6-12 חודשים — ENP Tech-Career או ITWorks. הכניסה לתפקיד junior תוך 6-9 חודשים אחרי קורס ב-78%-70% מהבוגרים.",
      en: "The first step is a 6-12 month bootcamp — ENP Tech-Career or ITWorks. Entry into a junior role within 6-9 months post-graduation in 70-78% of cases.",
      am: "የመጀመሪያ ደረጃ የ6-12 ወር ቡት ካምፕ ነው።",
    },
    bodies: {
      he: `## הצעד הראשון

ל-bootcamp בלי דרישת תואר ראשון — ENP Tech-Career, ITWorks, codeOved. הם מסובסדים לגמרי או בעיקר לבני קהילה.

## איך לבחור bootcamp

- **ENP Tech-Career** — הכי סלקטיבי, שיעור placement הגבוה ביותר (~78%)
- **ITWorks** — מתאים לעולים ולבני דור 1 שלא דוברים עברית ברמה אקדמית
- **codeOved** — פתוח יותר, פחות סלקטיבי, מתאים לחסרי-תואר

## אם יש לך כבר תואר ראשון רלוונטי

עדיף להירשם ל-Mentorship של Olim Beyahad — שיעור placement של 85% תוך 6 חודשים.

## ראו גם

- [ENP Tech-Career](/he/careers/programs/enp-tech-career)
- [Olim Beyahad Mentorship](/he/careers/programs/olim-beyahad-mentorship)
- [Tech track — סקירה כללית](/he/careers/tech)`,
      en: `## The first step

A bootcamp with no bachelor's requirement — ENP Tech-Career, ITWorks, codeOved. They are fully or mostly subsidized for community members.

## How to choose a bootcamp

- **ENP Tech-Career** — most selective, highest placement rate (~78%)
- **ITWorks** — fits olim and 1st-generation members without academic-level Hebrew
- **codeOved** — more open, less selective, fits non-graduates

## If you already have a relevant bachelor's

Prefer Olim Beyahad's Mentorship — 85% placement within 6 months.

## See also

- [ENP Tech-Career](/en/careers/programs/enp-tech-career)
- [Olim Beyahad Mentorship](/en/careers/programs/olim-beyahad-mentorship)
- [Tech track — overview](/en/careers/tech)`,
      am: `## የመጀመሪያ ደረጃ

ዲግሪ የማይጠይቅ ቡት ካምፕ — ENP Tech-Career፣ ITWorks፣ codeOved።

## ቡት ካምፑን እንዴት መምረጥ

- ENP Tech-Career — ከፍተኛ የቅጥር መጠን (~78%)
- ITWorks — ለስደተኞችና ለ1ኛ ትውልድ
- codeOved — ለምሩቃን-ያልሆኑ`,
    },
  },
  {
    slug: "what-is-tech-career-bootcamp-enp",
    orderIndex: 2,
    trackSlug: "tech",
    reviewedAt: "2026-05-01",
    question: {
      he: "מה זה Tech-Career bootcamp של ENP?",
      en: "What is the ENP Tech-Career bootcamp?",
      am: "የ ENP Tech-Career ቡት ካምፕ ምንድን ነው?",
    },
    shortAnswer: {
      he: "Bootcamp 12 חודשים של עמותת ENP, מסובסד לבני קהילה — מכין לתפקידי junior developer ו-QA. שלוחות ב-תל-אביב, באר-שבע, חיפה.",
      en: "12-month bootcamp by ENP, subsidized for community members — preparing for junior developer and QA roles. Campuses in Tel Aviv, Beersheba, Haifa.",
      am: "ENP የ12 ወር ቡት ካምፕ ነው።",
    },
    bodies: {
      he: `## תוכן הקורס

- **6 חודשים ראשונים:** Full-stack JavaScript/TypeScript, מסדי נתונים, ניהול גרסאות, DevOps בסיסי
- **6 חודשים אחרונים:** 2 פרויקטי portfolio בעלי לקוח-קצה, mock interviews, חיפוש עבודה

## מי מתאים

בוגרי תואר ראשון במדעי המחשב/מתמטיקה/הנדסה — או חסרי-תואר עם רקע self-learning ברור (פרויקטים ב-GitHub, MOOCs).

## תוצאות מתועדות

- שיעור placement: ~78% תוך 6 חודשים מסיום (דוח ENP 2024)
- שכר חציוני junior: ₪16-22K בשנים האחרונות

## ראו גם

- [Tech-Career bootcamp — דף תכנית מלא](/he/careers/programs/enp-tech-career)
- [ENP — פרופיל ארגון](/he/orgs/enp)
- [Tech-Career bootcamp — זכות ממשלתית](/he/rights/tech-career-bootcamp)`,
      en: `## Course content

- **First 6 months:** Full-stack JavaScript/TypeScript, databases, version control, basic DevOps
- **Last 6 months:** 2 client-end portfolio projects, mock interviews, job search

## Who fits

Bachelor's grads in CS/math/engineering — or non-graduates with a clear self-learning track record (GitHub projects, MOOCs).

## Documented outcomes

- Placement rate: ~78% within 6 months of graduating (ENP 2024 report)
- Median junior salary: ₪16-22K in recent years

## See also

- [Tech-Career bootcamp — full program page](/en/careers/programs/enp-tech-career)
- [ENP — organization profile](/en/orgs/enp)
- [Tech-Career bootcamp — government right](/en/rights/tech-career-bootcamp)`,
      am: `## የኮርሱ ይዘት

- የመጀመሪያ 6 ወር: Full-stack JavaScript፣ ዳታ ቤዝ
- የመጨረሻ 6 ወር: 2 portfolio ፕሮጀክቶች

## ውጤቶች

- የቅጥር መጠን: ~78%
- መካከለኛ ደመወዝ: ₪16-22K`,
    },
  },
  {
    slug: "are-there-employment-scholarships",
    orderIndex: 3,
    trackSlug: "tech",
    reviewedAt: "2026-05-01",
    question: {
      he: "האם יש מלגות תעסוקה לבני העדה האתיופית?",
      en: "Are there employment scholarships for community members?",
      am: "ለማህበረሰብ አባላት የቅጥር ስኮላርሺፕ አለ?",
    },
    shortAnswer: {
      he: "כן — מספר מלגות זמינות. הגדולות: ISEF (BA/MA, ~₪8-12K לשנה), Hesegim (תקצוב מלא ל-3 שנים), ENP Tech-Career (bootcamp חינם).",
      en: "Yes — several scholarships are available. The biggest: ISEF (BA/MA, ~₪8-12K/year), Hesegim (full 3-year funding), ENP Tech-Career (free bootcamp).",
      am: "አዎ — ብዙ ስኮላርሺፕዎች አሉ።",
    },
    bodies: {
      he: `## המלגות העיקריות

- **ISEF excellence-employment** — מלגה משלימה ₪8-12K לשנה לתואר ראשון בחשבונאות/מימון/כלכלה
- **Hesegim scholarships** — תקצוב מלא ל-3 שנים (זכות ממשלתית, מעל הסף הרגיל)
- **ENP Tech-Career** — bootcamp 12 חודשים מסובסד מלא לבני קהילה
- **excellence-employment** — תוספת ₪3-5K/שנה למצטיינים בענף הפיננסי

## איך פונים

לכל מלגה תהליך נפרד. ה-deadline המוקדם ביותר במאי-יוני (ISEF + Hesegim). הבטיחו ראיון אישי + תיק מסמכים.

## ראו גם

- [ISEF excellence-employment — תכנית](/he/careers/programs/isef-excellence-employment)
- [Hesegim scholarships — זכות](/he/rights/hesegim-scholarships)
- [Student aid — זכות](/he/rights/student-aid)`,
      en: `## Main scholarships

- **ISEF excellence-employment** — top-up of ₪8-12K/year for bachelor's in accounting/finance/economics
- **Hesegim scholarships** — full 3-year funding (government right, above the regular threshold)
- **ENP Tech-Career** — 12-month bootcamp fully subsidized for community members
- **excellence-employment** — additional ₪3-5K/year for high-performers in finance

## How to apply

Each scholarship has a separate process. Earliest deadline in May-June (ISEF + Hesegim). Personal interview + portfolio required.

## See also

- [ISEF excellence-employment — program](/en/careers/programs/isef-excellence-employment)
- [Hesegim scholarships — right](/en/rights/hesegim-scholarships)
- [Student aid — right](/en/rights/student-aid)`,
      am: `## ዋና ስኮላርሺፖች

- **ISEF** — ₪8-12K በዓመት
- **Hesegim** — የ3 ዓመት ሙሉ ድጋፍ
- **ENP Tech-Career** — ሙሉ ለሙሉ የተደገፈ ቡት ካምፕ`,
    },
  },
  {
    slug: "what-is-affirmative-representation-public-sector",
    orderIndex: 4,
    trackSlug: "public-sector",
    reviewedAt: "2026-05-01",
    question: {
      he: "ייצוג הולם בשירות הציבורי — מה זה אומר בפועל?",
      en: "Affirmative representation in the civil service — what does it mean in practice?",
      am: "በመንግስት አገልግሎት ቅድሚያ ውክልና — በተግባር ምን ማለት ነው?",
    },
    shortAnswer: {
      he: "צו 50 מחייב משרדים ממשלתיים לעדף בני קהילה כשיש שני מועמדים שווים. סימון flag צו-50 בעת הגשת מועמדות הוא המפתח.",
      en: "Order 50 requires ministries to prefer community members when two candidates are equally qualified. Flagging Order-50 status when applying is the key.",
      am: "ትዕዛዝ 50 በሁለት እኩል ብቁ አመልካቾች መካከል ቅድሚያ ይሰጣል።",
    },
    bodies: {
      he: `## איך זה עובד בפועל

ועדת קבלה משווה מועמדים. כשהיא מגיעה למצב של "שני שווים", סעיף הייצוג ההולם מחייב להעדיף את המועמד מקבוצת היעד (יוצאי אתיופיה).

## איך מסמנים

בטופס המקוון של מסלול שירות המדינה — חפשו תיבת "ייצוג הולם / צו 50". לעיתים זה opt-in נסתר, פנו לאחראית הגיוס אם לא מוצאים.

## ערעור

אם נדחיתם ויש לכם בסיס לחשד שהצו לא יושם — פנו ל-טבקה לייעוץ משפטי חינמי.

## ראו גם

- [ייצוג הולם — דף הסבר מלא](/he/careers/affirmative-action)
- [Public-sector representation — זכות](/he/rights/public-sector-representation)
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)`,
      en: `## How it works in practice

Selection committees compare candidates. When they reach a "two equally qualified" point, the affirmative-representation clause requires preference for the target-group candidate (Ethiopian-Israelis).

## How to flag

In civil-service online application forms — look for an "Affirmative representation / Order 50" checkbox. It's often opt-in and hidden; ask the recruiter if not visible.

## Appeals

If rejected and you suspect the order wasn't applied — contact Tebeka for free legal counsel.

## See also

- [Affirmative action — full explainer](/en/careers/affirmative-action)
- [Public-sector representation — right](/en/rights/public-sector-representation)
- [Tebeka — organization profile](/en/orgs/tebeka)`,
      am: `## በተግባር እንዴት ይሰራል

ኮሚቴ አመልካቾችን ያወዳድራል። እኩል ብቁ ሲሆኑ ለማህበረሰብ አባል ቅድሚያ ይሰጣል።

## እንዴት ምልክት ማድረግ

በማመልከቻ ቅጽ "ትዕዛዝ 50" አማራጭ ይፈልጉ።`,
    },
  },
  {
    slug: "order-50-eligibility",
    orderIndex: 5,
    trackSlug: "public-sector",
    reviewedAt: "2026-05-01",
    question: {
      he: "צו 50 — מי זכאי, איך מממשים?",
      en: "Order 50 — who's eligible, how to claim it?",
      am: "ትዕዛዝ 50 — ማን ብቁ ነው፣ እንዴት ይከፈላል?",
    },
    shortAnswer: {
      he: "כל אזרח/ית ישראלי/ת ממוצא אתיופי — דור 1, 2 או 3. הזיהוי על-בסיס דקלרציה עצמית בעת הגשת מועמדות.",
      en: "Any Israeli citizen of Ethiopian descent — 1st, 2nd, or 3rd generation. Identification by self-declaration at application time.",
      am: "ማንኛውም የኢትዮጵያ ዘር ያለው የእስራኤል ዜጋ።",
    },
    bodies: {
      he: `## זכאות

- אזרחות ישראלית
- מוצא אתיופי (כל הדורות)
- אין צורך להוכיח גנאלוגיה — הזיהוי הוא declaration עצמי

## איך מממשים

1. בחנו ב-[דף ייצוג הולם](/he/careers/affirmative-action) את הזכויות הספציפיות
2. בעת הגשת מועמדות לתפקיד ציבורי — סמנו את ה-flag
3. שמרו עותק של ההגשה כראיה (במקרה של ערעור)

## ראו גם

- [ייצוג הולם — דף הסבר](/he/careers/affirmative-action)
- [Public-sector — סקירה כללית](/he/careers/public-sector)`,
      en: `## Eligibility

- Israeli citizenship
- Ethiopian descent (any generation)
- No need to prove genealogy — identification is self-declaration

## How to claim

1. Check the [affirmative-action page](/en/careers/affirmative-action) for specific rights
2. When applying for a public-sector role — flag your status
3. Keep a copy of the application as evidence (in case of appeal)

## See also

- [Affirmative action — explainer](/en/careers/affirmative-action)
- [Public-sector — overview](/en/careers/public-sector)`,
      am: `## ብቁነት

- የእስራኤል ዜግነት
- የኢትዮጵያ ዘር
- ጄኔዮሎጂ ማረጋገጥ አያስፈልግም`,
    },
  },
  {
    slug: "amharic-speaking-career-counselor-near-me",
    orderIndex: 6,
    reviewedAt: "2026-05-01",
    question: {
      he: "יועץ קריירה דובר אמהרית בקרבתי",
      en: "Amharic-speaking career counselor near me",
      am: "በአቅራቢያዬ አማርኛ ተናጋሪ የሙያ አማካሪ",
    },
    shortAnswer: {
      he: "Tedros מאגד יועצי קריירה דוברי אמהרית בכל הארץ. פגישת ייעוץ ראשונה חינמית. בחרו עיר ב-directory של בני מקצוע.",
      en: "Tedros aggregates Amharic-speaking career counselors across Israel. Free first consultation. Pick a city in the professionals directory.",
      am: "Tedros አማርኛ ተናጋሪ የሙያ አማካሪዎችን ያሰባስባል።",
    },
    bodies: {
      he: `## איך לבחור יועץ קריירה

- בני קהילה מבוגרים יותר מעדיפים יועץ דובר אמהרית
- בני 25-35 בעיקר רוצים מומחיות בתחום ספציפי (הייטק, פיננסים, יזמות)
- כל היועצים שעולים ל-Tedros עוברים תהליך אימות

## פגישה ראשונה

חינמית עד 60 דקות. כוללת אבחון נטיות + מיפוי מסלולי קריירה רלוונטיים + חיבור לתכניות ספציפיות (bootcamps, מלגות) לפי הצורך.

## ראו גם

- [יועצי קריירה — directory](/he/professionals/career-counselor)
- [רשת יועצי קריירה — תכנית](/he/careers/programs/career-counselors-network)`,
      en: `## How to choose a career counselor

- Older community members prefer Amharic-speaking counselors
- Those aged 25-35 mostly want subject-matter expertise (tech, finance, entrepreneurship)
- All counselors on Tedros go through a verification process

## First meeting

Free up to 60 minutes. Includes aptitude assessment + mapping of relevant career paths + connection to specific programs (bootcamps, scholarships) as needed.

## See also

- [Career counselors — directory](/en/professionals/career-counselor)
- [Career counselors network — program](/en/careers/programs/career-counselors-network)`,
      am: `## የሙያ አማካሪ እንዴት መምረጥ

- ሁሉም በ Tedros ያሉት የሙያ አማካሪዎች የተረጋገጡ ናቸው።
- የመጀመሪያ ስብሰባ እስከ 60 ደቂቃ ነፃ።`,
    },
  },
  {
    slug: "employment-for-new-olim-2020-plus",
    orderIndex: 7,
    reviewedAt: "2026-05-01",
    question: {
      he: "תעסוקה לעולים חדשים מאתיופיה (2020+)",
      en: "Employment for new olim from Ethiopia (2020+)",
      am: "ለ2020+ የመጡ ለአዳዲስ ስደተኞች ቅጥር",
    },
    shortAnswer: {
      he: "ITWorks הוא ה-bootcamp הייטק המוכוון לעולים חדשים — תמיכה בעברית בסיסית. סל קליטה מספק רשת ביטחון 18 חודשים ראשונים.",
      en: "ITWorks is the tech bootcamp targeted at new olim — basic-Hebrew support. Klita basket provides a safety net for the first 18 months.",
      am: "ITWorks ለአዳዲስ ስደተኞች የተዘጋጀ ቡት ካምፕ ነው።",
    },
    bodies: {
      he: `## הסיוע שמגיע אוטומטית

- **סל קליטה** — מענק חודשי בשנה הראשונה (~₪3,000-4,500)
- **אולפן** — 5 חודשים מסובסדים, חובה
- **בית מגורים זמני** — מרכזי קליטה אזוריים

## תכניות תעסוקה ייעודיות

- **ITWorks** — bootcamp הייטק עם תמיכה בעברית בסיסית
- **Place-IL** — השמה לתפקידי שירות, מתאים מאד לחודשים ראשונים
- **Atidim צה"לי** — לבני 18 שעלו עם הוריהם

## ראו גם

- [סל קליטה — זכות](/he/rights/klita-basket)
- [ITWorks Israel — תכנית](/he/careers/programs/itworks-israel)
- [Place-IL — תכנית](/he/careers/programs/place-il)`,
      en: `## What you get automatically

- **Klita basket** — monthly grant in the first year (~₪3,000-4,500)
- **Ulpan** — 5 subsidized months, mandatory
- **Temporary housing** — regional absorption centers

## Targeted employment programs

- **ITWorks** — tech bootcamp with basic-Hebrew support
- **Place-IL** — placement into service roles, fits early-month olim well
- **Atidim Military** — for 18-year-olds who arrived with their families

## See also

- [Klita basket — right](/en/rights/klita-basket)
- [ITWorks Israel — program](/en/careers/programs/itworks-israel)
- [Place-IL — program](/en/careers/programs/place-il)`,
      am: `## ራስ-ሰር የሚያገኙት

- **የመግቢያ ቅርጫት** — በመጀመሪያ ዓመት ወርሃዊ ስጦታ
- **አልፋን** — 5 ወር የተደገፈ

## ልዩ ፕሮግራሞች

- **ITWorks** — የቴክ ቡት ካምፕ
- **Place-IL** — የቅጥር አገልግሎት`,
    },
  },
  {
    slug: "first-job-after-army-ethiopian",
    orderIndex: 8,
    reviewedAt: "2026-05-01",
    question: {
      he: "חיפוש עבודה ראשון אחרי צבא — בני קהילה אתיופית",
      en: "First job search after IDF — Ethiopian-Israeli community",
      am: "ከ IDF በኋላ የመጀመሪያ ሥራ ፍለጋ",
    },
    shortAnswer: {
      he: "מומלץ להתחיל עם פגישת ייעוץ קריירה (חינמי), אז להירשם ל-PRESEN לקורס הכנה לראיונות. אחרי PRESEN — שוק העבודה פתוח עם 30%+ פחות bias.",
      en: "Recommended: start with a free career consultation, then enroll in PRESEN for interview prep. After PRESEN — the job market opens with 30%+ less bias.",
      am: "በነፃ ምክክር ይጀምሩ፣ ከዚያም PRESEN ኮርስ ይውሰዱ።",
    },
    bodies: {
      he: `## הסדר המומלץ

1. **פגישת ייעוץ קריירה** (חינמי) — מיפוי תחומי עניין + יכולות
2. **PRESEN** — קורס 8 שבועות להכנה לראיונות + מיומנויות הצגה
3. **חיפוש עבודה פעיל** — Olim Beyahad mentor (אם יש תואר ראשון), Place-IL (אם לא)

## למה זה חשוב

מחקרים מראים pre-screening bias — בני קהילה צריכים להגיש 30%+ יותר CVs כדי לקבל ראיון. PRESEN מבטל את הפער בעיקר דרך הכנה ספציפית + רשת קשרים.

## ראו גם

- [PRESEN — תכנית](/he/careers/programs/presen)
- [רשת יועצי קריירה](/he/careers/programs/career-counselors-network)
- [Olim Beyahad — תכנית](/he/careers/programs/olim-beyahad-mentorship)`,
      en: `## Recommended order

1. **Free career consultation** — interest mapping + skill assessment
2. **PRESEN** — 8-week interview prep + presentation skills
3. **Active job search** — Olim Beyahad mentor (with bachelor's), Place-IL (without)

## Why this matters

Research shows pre-screening bias — community members need to submit 30%+ more CVs to get an interview. PRESEN closes the gap mainly through specific prep + ally connections.

## See also

- [PRESEN — program](/en/careers/programs/presen)
- [Career counselors network](/en/careers/programs/career-counselors-network)
- [Olim Beyahad — program](/en/careers/programs/olim-beyahad-mentorship)`,
      am: `## የሚመከር ቅደም ተከተል

1. ነፃ የሙያ ምክክር
2. PRESEN — የቃለ-መጠይቅ ዝግጅት
3. ንቁ ስራ ፍለጋ`,
    },
  },
  {
    slug: "subsidized-career-pivot-tracks",
    orderIndex: 9,
    reviewedAt: "2026-05-01",
    question: {
      he: "מסלולי הסבה מקצועית מסובסדים",
      en: "Subsidized career-pivot tracks",
      am: "የተደገፉ የሙያ መለወጫ መንገዶች",
    },
    shortAnswer: {
      he: "משרד העבודה מסבסד 100% של מקצועות יד (חשמל, אינסטלציה, ריתוך, מכונאות) לבני קהילה. תכנית Madrasa מנהלת את הרשת.",
      en: "The Ministry of Labor 100%-subsidizes trades (electrical, plumbing, welding, mechanics) for community members. The Madrasa program runs the network.",
      am: "የስራ ሚኒስቴር 100% የእጅ ሙያዎችን ይደግፋል።",
    },
    bodies: {
      he: `## מקצועות יד מסובסדים

- **חשמלאי** — קורס 6-9 חודשים, רישיון משרד העבודה
- **אינסטלטור** — 4-6 חודשים, רישיון
- **ריתוך** — 3-6 חודשים
- **מכונאי** — 4-8 חודשים

## אחרי הקורס

90% מסיימים את ההכשרה. ~60% פותחים עסק עצמאי תוך שנה (קישור ל-UJIA-KIEDF להלוואה). השאר משתלבים אצל מעסיקים — ענפי הבנייה והאחזקה דרושים אנשי מקצוע באופן קבוע.

## ראו גם

- [Madrasa — תכנית](/he/careers/programs/madrasa-trades)
- [Trades — סקירה כללית](/he/careers/trades)
- [UJIA-KIEDF — הלוואות עסקים](/he/rights/ujia-kiedf-business-loans)`,
      en: `## Subsidized trades

- **Electrician** — 6-9 month course, Ministry of Labor license
- **Plumber** — 4-6 months, license
- **Welder** — 3-6 months
- **Mechanic** — 4-8 months

## After the course

90% complete the training. ~60% open a self-employed business within a year (link to UJIA-KIEDF loan). The rest join existing employers — construction and maintenance sectors have steady demand.

## See also

- [Madrasa — program](/en/careers/programs/madrasa-trades)
- [Trades — overview](/en/careers/trades)
- [UJIA-KIEDF — business loans](/en/rights/ujia-kiedf-business-loans)`,
      am: `## የተደገፉ ሙያዎች

- **ኤሌክትሪክ** — 6-9 ወር
- **ቧንቧ** — 4-6 ወር
- **ብየዳ** — 3-6 ወር`,
    },
  },
  {
    slug: "tech-mentor-community-ethiopian",
    orderIndex: 10,
    trackSlug: "tech",
    reviewedAt: "2026-05-01",
    question: {
      he: "מנטור בהייטק לבני קהילה אתיופית",
      en: "A tech mentor for Ethiopian-Israeli community members",
      am: "ለማህበረሰብ አባላት የቴክ አማካሪ",
    },
    shortAnswer: {
      he: "Olim Beyahad מספקת mentorship 1:1 לבוגרי תואר. Mentor מהתעשייה (לא staff), פגישה שבועית/דו-שבועית, רשת alumni של 1,500+.",
      en: "Olim Beyahad provides 1:1 mentorship for bachelor's grads. Industry mentor (not staff), weekly/bi-weekly meetings, 1,500+ alumni network.",
      am: "ኦሊም በያሐድ ለምሩቃን 1:1 አማካሪነት ይሰጣል።",
    },
    bodies: {
      he: `## מי מתאים

בוגרי תואר ראשון/שני בתחומים טכנולוגיים — מדעי המחשב, מתמטיקה, סטטיסטיקה, הנדסה.

## מה כלול

- Mentor אישי מתעשייה (VC/startup/corporate) — מתנדב/ת, לא staff
- פגישה שבועית או דו-שבועית
- ליווי בקריירה: בחירת תפקיד, הכנה לראיונות, משא-ומתן על שכר
- רשת alumni של 1,500+ בוגרים פעילים בתעשייה

## תוצאות

- שיעור placement: ~85% תוך 6 חודשים
- 70% מהבוגרים נשארים בקריירה אחרי 5 שנים

## ראו גם

- [Olim Beyahad mentorship — תכנית](/he/careers/programs/olim-beyahad-mentorship)
- [Olim Beyahad — פרופיל ארגון](/he/orgs/olim-beyahad)`,
      en: `## Who fits

Bachelor's/master's grads in technological fields — CS, math, statistics, engineering.

## What's included

- Personal mentor from industry (VC/startup/corporate) — volunteer, not staff
- Weekly or bi-weekly meeting
- Career guidance: role selection, interview prep, salary negotiation
- 1,500+ alumni network active in industry

## Outcomes

- Placement rate: ~85% within 6 months
- 70% of alumni stay in their career after 5 years

## See also

- [Olim Beyahad mentorship — program](/en/careers/programs/olim-beyahad-mentorship)
- [Olim Beyahad — organization profile](/en/orgs/olim-beyahad)`,
      am: `## ለማን ነው

በቴክኖሎጂ መስኮች ምሩቃን።

## የሚካተት

- ግላዊ የኢንዱስትሪ አማካሪ
- ሳምንታዊ/ሁለት-ሳምንታዊ ስብሰባ`,
    },
  },
  {
    slug: "interview-prep-basic-hebrew",
    orderIndex: 11,
    reviewedAt: "2026-05-01",
    question: {
      he: "קורס ראיונות עבודה בעברית בסיסית",
      en: "Job interview prep in basic Hebrew",
      am: "በመሰረታዊ ዕብራይስጥ የቃለ-መጠይቅ ኮርስ",
    },
    shortAnswer: {
      he: "PRESEN של ENP — קורס 8 שבועות מתאים גם לעולים חדשים שלא דוברים עברית מתקדמת. כולל mock interviews עם מראיינים בכירים.",
      en: "ENP's PRESEN — 8-week course suitable also for new olim without advanced Hebrew. Includes mock interviews with senior interviewers.",
      am: "የ ENP PRESEN — የ8 ሳምንት ኮርስ።",
    },
    bodies: {
      he: `## למי

בוגרי כל קורס/תואר/bootcamp שמתכוננים לחיפוש עבודה. מתאים גם לעולים חדשים — מקובל פתיחת שיחה בעברית בסיסית + עברית טכנית מקצועית.

## מה כלול

- 8 שבועות × 4 שעות
- כתיבת CV מותאם לתפקיד
- ראיון התנהגותי + ראיון טכני
- מצגות
- Mock interviews עם מראיינים מ-15 חברות שותפות
- ליווי אישי בכל ראיון בפועל בחודש שאחרי הקורס

## ראו גם

- [PRESEN — תכנית](/he/careers/programs/presen)`,
      en: `## Who fits

Graduates of any course/degree/bootcamp preparing for job search. Suitable also for new olim — basic Hebrew + technical/professional Hebrew is enough.

## What's included

- 8 weeks × 4 hours
- Role-specific CV writing
- Behavioral + technical interview
- Presentations
- Mock interviews with interviewers from 15 partner companies
- Personal coaching for each real interview in the month following the course

## See also

- [PRESEN — program](/en/careers/programs/presen)`,
      am: `## ለማን

ለሥራ ፍለጋ የሚዘጋጁ ሁሉ።

## የሚካተት

- 8 ሳምንት × 4 ሰዓት
- Mock interviews ከ15 አጋር ኩባንያዎች ጋር`,
    },
  },
  {
    slug: "civil-service-via-atidim",
    orderIndex: 12,
    trackSlug: "public-sector",
    reviewedAt: "2026-05-01",
    question: {
      he: "כניסה לשירות הציבורי דרך עתידים",
      en: "Civil-service entry via Atidim",
      am: "በ Atidim በኩል ወደ መንግስት አገልግሎት መግቢያ",
    },
    shortAnswer: {
      he: "עתידים אקדמי — מסלול יוקרתי לבוגרי תיכון מצטיינים (90+ ממוצע). תקצוב מלא של תואר + 3 שנות שירות מובטחות במשרד מרכזי.",
      en: "Atidim Academic — prestigious track for top high-school grads (90+ average). Full degree funding + 3 guaranteed years in a central ministry.",
      am: "Atidim Academic — ለልዩ ምሩቃን (90+ መካከለኛ)።",
    },
    bodies: {
      he: `## מסלולי עתידים

- **עתידים אקדמי** — תואר ראשון/שני בחסות מלאה (~₪40-60K לשנה) + 3 שנות שירות ציבורי מובטחות
- **עתידים צה"לי** — תפקיד טכנולוגי בצה"ל (Mamram, 8200) → תואר אחרי שחרור → שירות ציבורי

## תוצאות מתועדות

- 95% מסיימים את התואר במועד
- 100% משולבים בשירות ציבורי תוך 6 חודשים מסיום הלימודים
- 70% נשארים בשירות גם אחרי תקופת ההתחייבות

## ראו גם

- [Atidim Academic — תכנית](/he/careers/programs/atidim-academic)
- [Atidim Military — תכנית](/he/careers/programs/atidim-military)
- [ייצוג הולם — דף הסבר](/he/careers/affirmative-action)`,
      en: `## Atidim tracks

- **Atidim Academic** — fully-sponsored bachelor's/master's (~₪40-60K/year) + 3 guaranteed years of civil service
- **Atidim Military** — technological role in IDF (Mamram, 8200) → degree post-release → civil service

## Documented outcomes

- 95% complete their degree on time
- 100% placed in civil service within 6 months of graduating
- 70% stay in service after the commitment period

## See also

- [Atidim Academic — program](/en/careers/programs/atidim-academic)
- [Atidim Military — program](/en/careers/programs/atidim-military)
- [Affirmative action — explainer](/en/careers/affirmative-action)`,
      am: `## የ Atidim መንገዶች

- Atidim Academic — ሙሉ የተደገፈ ዲግሪ + 3 ዓመት የመንግስት አገልግሎት
- Atidim Military — በ IDF ቴክኖሎጂ ሚና`,
    },
  },
  {
    slug: "entrepreneurship-funding-community",
    orderIndex: 13,
    trackSlug: "entrepreneurship",
    reviewedAt: "2026-05-01",
    question: {
      he: "יזמות לבני העדה — תוכניות ומימון",
      en: "Entrepreneurship for the community — programs and funding",
      am: "ለማህበረሰብ ስራ ፈጠራ — ፕሮግራሞችና ገንዘብ",
    },
    shortAnswer: {
      he: "UJIA-KIEDF מספקת הלוואות עד ₪150K עם ריבית סובסידית. ScaleUp Velocity מציעה bootcamp 16 שבועות עם seed funding לזוכים.",
      en: "UJIA-KIEDF offers loans up to ₪150K with subsidized interest. ScaleUp Velocity runs a 16-week bootcamp with seed funding for awardees.",
      am: "UJIA-KIEDF እስከ ₪150K ብድር ይሰጣል።",
    },
    bodies: {
      he: `## אופציות מימון עיקריות

- **UJIA-KIEDF הלוואה** — עד ₪150K, ריבית סובסידית, ליווי 12 חודשים
- **ScaleUp Velocity** — 16 שבועות + seed funding ל-3 צוותים מצטיינים: ₪50-150K לכל אחד
- **מענק עסק קטן (משרד הכלכלה)** — עד ₪40K לעסק חדש בעל פוטנציאל גידול

## איך לבחור

- אם יש לך כבר עסק עם הוכחת הכנסה → UJIA-KIEDF (הלוואה זולה)
- אם אתה בשלב רעיון בלבד → ScaleUp Velocity (תכנית הכשרה + מימון אם תזכה)
- אם אתה מובטל ומחפש להתחיל קטן → מענק עסק קטן

## ראו גם

- [UJIA-KIEDF — זכות](/he/rights/ujia-kiedf-business-loans)
- [ScaleUp Velocity — תכנית](/he/careers/programs/scaleup-velocity)
- [Entrepreneurship — סקירה](/he/careers/entrepreneurship)`,
      en: `## Main funding options

- **UJIA-KIEDF loan** — up to ₪150K, subsidized interest, 12-month mentorship
- **ScaleUp Velocity** — 16 weeks + seed funding for 3 top teams: ₪50-150K each
- **Small business grant (Ministry of Economy)** — up to ₪40K for a new business with growth potential

## How to choose

- If you have an active business with proven revenue → UJIA-KIEDF (cheap loan)
- If at idea stage → ScaleUp Velocity (training + funding if you win)
- If unemployed and starting small → small business grant

## See also

- [UJIA-KIEDF — right](/en/rights/ujia-kiedf-business-loans)
- [ScaleUp Velocity — program](/en/careers/programs/scaleup-velocity)
- [Entrepreneurship — overview](/en/careers/entrepreneurship)`,
      am: `## ዋና የገንዘብ አማራጮች

- UJIA-KIEDF — እስከ ₪150K
- ScaleUp Velocity — 16 ሳምንት + seed funding`,
    },
  },
  {
    slug: "subsidized-trades-electrician-plumber",
    orderIndex: 14,
    trackSlug: "trades",
    reviewedAt: "2026-05-01",
    question: {
      he: "מקצועות יד מסובסדים — חשמל/אינסטלציה",
      en: "Subsidized trades — electrical/plumbing",
      am: "የተደገፉ ሙያዎች — ኤሌክትሪክ/ቧንቧ",
    },
    shortAnswer: {
      he: "100% מסובסד ע״י משרד העבודה לבני קהילה. תקציב פתוח 2024. רישום דרך לשכת תעסוקה אזורית.",
      en: "100% subsidized by the Ministry of Labor for community members. 2024 budget is open. Register through your regional Employment Service office.",
      am: "በስራ ሚኒስቴር 100% የተደገፈ።",
    },
    bodies: {
      he: `## מה כלול במלגה

- שכר לימוד מלא (₪0 לסטודנט)
- ספרי לימוד וכלים בסיסיים
- מענק קיום ₪2,500-3,500 לחודש (תלוי במצב משפחתי)
- אישור רשמי של משרד העבודה בסיום

## תקופת ההכשרה

- חשמלאי: 6-9 חודשים
- אינסטלטור: 4-6 חודשים

## איך פונים

הרשמה דרך לשכת תעסוקה אזורית — מצריך תעודת זהות + ראיון התאמה + מבחן ידיים בסיסי.

## ראו גם

- [Madrasa — תכנית](/he/careers/programs/madrasa-trades)
- [Trades — סקירה](/he/careers/trades)`,
      en: `## What the scholarship covers

- Full tuition (₪0 to the student)
- Textbooks and basic tools
- Living grant of ₪2,500-3,500/month (family-status dependent)
- Official Ministry of Labor certification at completion

## Training duration

- Electrician: 6-9 months
- Plumber: 4-6 months

## How to apply

Register through your regional Employment Service office — requires national ID + fit interview + basic hands-on test.

## See also

- [Madrasa — program](/en/careers/programs/madrasa-trades)
- [Trades — overview](/en/careers/trades)`,
      am: `## በስኮላርሺፕ የሚካተት

- ሙሉ የማስተማሪያ ክፍያ
- መጻሕፍትና መሳሪያዎች
- የመኖሪያ ስጦታ`,
    },
  },
  {
    slug: "single-mothers-employment-community",
    orderIndex: 15,
    reviewedAt: "2026-05-01",
    question: {
      he: "תעסוקה לאמהות חד-הוריות מהקהילה",
      en: "Employment for single mothers in the community",
      am: "ለማህበረሰቡ ብቸኛ እናቶች ቅጥር",
    },
    shortAnswer: {
      he: "שילוב של מענק חודשי, סבסוד צהרון, וקורסי הכשרה בשעות גמישות. JDC-Ashalim Strong Families היא התכנית המרכזית.",
      en: "Combination of monthly grant, daycare subsidy, and flexible-hour training courses. JDC-Ashalim Strong Families is the main program.",
      am: "ወርሃዊ ስጦታ + ጁምጁምታ ድጋፍ + ተመጣጣኝ ሰዓት ስልጠናዎች።",
    },
    bodies: {
      he: `## הזכויות הזמינות

- **מענק חד-הורית** — תוספת לסל קליטה / לקצבת ילדים
- **סבסוד צהרון** — עד 80% מהעלות לבני קהילה
- **תקנת חופשת לידה ארוכה** — 28 שבועות (שבועיים יותר מסטנדרט)

## תכנית JDC-Ashalim Strong Families

ליווי משפחתי + תעסוקה — מרכזי-ארץ ב-נתניה, רחובות, באר-שבע, חיפה. כולל בנק זמנים גמיש, מנטורית קהילתית, וחיבור לעבודה הולמת.

## ראו גם

- [Daycare subsidy — זכות](/he/rights/daycare-subsidy)
- [Family counseling — זכות](/he/rights/family-counseling)
- [JDC-Ashalim — פרופיל ארגון](/he/orgs/jdc-ashalim)`,
      en: `## Available rights

- **Single-parent grant** — addition to klita basket / child allowance
- **Daycare subsidy** — up to 80% of cost for community members
- **Extended parental leave** — 28 weeks (2 weeks longer than standard)

## JDC-Ashalim Strong Families

Family + employment guidance — regional centers in Netanya, Rehovot, Beersheba, Haifa. Includes flexible-time bank, community mentor, and matching to suitable work.

## See also

- [Daycare subsidy — right](/en/rights/daycare-subsidy)
- [Family counseling — right](/en/rights/family-counseling)
- [JDC-Ashalim — organization profile](/en/orgs/jdc-ashalim)`,
      am: `## ያሉ መብቶች

- ብቸኛ ወላጅ ስጦታ
- የጁምጁምታ ድጋፍ
- ረዥም ወላጅ ፈቃድ`,
    },
  },
  {
    slug: "matriculation-and-vocational-training-parallel",
    orderIndex: 16,
    trackSlug: "tech",
    reviewedAt: "2026-05-01",
    question: {
      he: "השלמת בגרות + הכשרה מקצועית במקביל",
      en: "Matriculation completion + vocational training in parallel",
      am: "የብቃት ምስክር መጨረስ + የሙያ ስልጠና በትይዩ",
    },
    shortAnswer: {
      he: "Hila מציעה מסלול 18-24 חודש המשלב השלמת בגרות עם bootcamp הייטק ראשוני. המסלול מקצר זמן עד שתעסוקה ב-12+ חודשים.",
      en: "Hila offers an 18-24 month track combining matriculation completion with an initial tech bootcamp. The track shortens time-to-employment by 12+ months.",
      am: "ሂላ የብቃት ምስክርን ከቴክ ቡት ካምፕ ጋር ያጣምራል።",
    },
    bodies: {
      he: `## איך זה עובד

12-18 חודשים של השלמת בגרות (5 יחידות מתמטיקה + אנגלית + מדעים) — במקביל ל-6-12 חודשי bootcamp פיתוח ראשוני (front-end / QA).

## תוצאות מתועדות

- 65% מסיימים את הבגרות בהצלחה (יעד: 80% עד 2027)
- 40% מהבוגרים ממשיכים ל-bootcamp הייטק מלא (כמו ENP Tech-Career)

## כסף

מלגת קיום ₪3,500/חודש (תלוי בזמינות תקציב משרד החינוך).

## ראו גם

- [Hila bagrut-tech — תכנית](/he/careers/programs/hila-bagrut-tech)
- [Matriculation grant — זכות](/he/rights/matriculation-grant)`,
      en: `## How it works

12-18 months of matriculation completion (5-unit math + English + science) — in parallel with 6-12 months of intro dev bootcamp (front-end / QA).

## Documented outcomes

- 65% complete matriculation successfully (target: 80% by 2027)
- 40% continue into a full tech bootcamp (e.g. ENP Tech-Career)

## Money

Living grant of ₪3,500/month (subject to Ministry of Education budget).

## See also

- [Hila bagrut-tech — program](/en/careers/programs/hila-bagrut-tech)
- [Matriculation grant — right](/en/rights/matriculation-grant)`,
      am: `## እንዴት ይሰራል

12-18 ወር የብቃት ምስክር መጨረስ — ከ6-12 ወር ቴክ ቡት ካምፕ ጋር በትይዩ።`,
    },
  },
  {
    slug: "military-tracks-with-career-employment",
    orderIndex: 17,
    trackSlug: "public-sector",
    reviewedAt: "2026-05-01",
    question: {
      he: "תוכניות צבאיות עם מסלול תעסוקתי",
      en: "Military tracks with a career path",
      am: "የሙያ መንገድ ያለው ወታደራዊ ፕሮግራሞች",
    },
    shortAnswer: {
      he: "Aharai pre-army (לפני הצבא) → עתידים צה״לי (במהלך השירות) → עתידים אקדמי (אחרי השחרור). שלושה שלבים שמובילים לתפקיד ציבורי בכיר.",
      en: "Aharai pre-army → Atidim Military (during service) → Atidim Academic (after release). Three stages leading to a senior public-sector role.",
      am: "Aharai → Atidim Military → Atidim Academic።",
    },
    bodies: {
      he: `## שלוש שלבים

1. **Aharai pre-army** — מכינה צבאית לבני 17-18 (כיתה י"ב). מכינה לתפקיד יחידה איכותית
2. **Atidim צה"לי** — תפקיד טכנולוגי בצה"ל (mamram, 8200, מודיעין) — 4 שנות שירות
3. **Atidim Academic** — תואר ראשון/שני בחסות + שירות ציבורי 3 שנים מובטחות

## למה זה מסלול חזק

הזיהוי "מסלול שירות מלא" פותח דלתות לתפקידי ניהול ב-30+ שנות הקריירה הראשונה. רוב הבכירים בשירות הציבורי הישראלי עברו מסלול דומה.

## ראו גם

- [Aharai pre-army — זכות](/he/rights/aharai-pre-army)
- [Atidim Academic — תכנית](/he/careers/programs/atidim-academic)
- [Atidim Military — תכנית](/he/careers/programs/atidim-military)`,
      en: `## Three stages

1. **Aharai pre-army** — pre-military mechina for 17-18-year-olds. Prepares for elite-unit roles
2. **Atidim Military** — technological role in IDF (Mamram, 8200, Intelligence) — 4 years of service
3. **Atidim Academic** — fully-sponsored BA/MA + guaranteed 3-year civil service

## Why it's a strong track

Identifying as "full service path" opens doors to management roles for 30+ years of career. Most senior figures in Israeli civil service went through a similar pipeline.

## See also

- [Aharai pre-army — right](/en/rights/aharai-pre-army)
- [Atidim Academic — program](/en/careers/programs/atidim-academic)
- [Atidim Military — program](/en/careers/programs/atidim-military)`,
      am: `## ሦስት ደረጃዎች

1. Aharai pre-army
2. Atidim Military
3. Atidim Academic`,
    },
  },
  {
    slug: "apprenticeship-which-sectors",
    orderIndex: 18,
    trackSlug: "trades",
    reviewedAt: "2026-05-01",
    question: {
      he: "Apprenticeship/חניכות תעסוקתית — אילו סקטורים",
      en: "Apprenticeship — which sectors",
      am: "ስልጠና — የትኞቹ ዘርፎች",
    },
    shortAnswer: {
      he: "סקטורים עיקריים: בנייה ותחזוקה, רכב ומכאניקה, אלקטרוניקה, ייצור, וחקלאות מוקטנת. כולם מסובסדים ע״י משרד העבודה.",
      en: "Main sectors: construction and maintenance, automotive and mechanics, electronics, manufacturing, and small-scale agriculture. All subsidized by the Ministry of Labor.",
      am: "ግንባታ፣ ሞተር፣ ኤሌክትሮኒክስ፣ ምርትና እርሻ።",
    },
    bodies: {
      he: `## סקטורים עיקריים

- **בנייה ותחזוקה** — חשמל, אינסטלציה, ריצוף, צבע
- **רכב ומכאניקה** — מכונאי, גלגלי
- **אלקטרוניקה** — תיקון מוצרי חשמל, פתרונות ביתיים
- **ייצור** — הפעלת מכונות, איכות בקרה
- **חקלאות** — תכניות בעמק, מתאים למי שאוהב עבודת שטח

## איך מצליחים

תחילה רישיון מקצועי (3-9 חודשים), אז התמחות אצל איש מקצוע ותיק (6-12 חודשים), אז עצמאות.

## ראו גם

- [Madrasa — תכנית](/he/careers/programs/madrasa-trades)
- [Trades — סקירה](/he/careers/trades)`,
      en: `## Main sectors

- **Construction and maintenance** — electrical, plumbing, tiling, painting
- **Automotive and mechanics** — mechanic, bicycle
- **Electronics** — appliance repair, home solutions
- **Manufacturing** — machine operation, quality control
- **Agriculture** — Emek programs, suits those who like field work

## How to succeed

First, get the professional license (3-9 months), then apprentice with a veteran (6-12 months), then go independent.

## See also

- [Madrasa — program](/en/careers/programs/madrasa-trades)
- [Trades — overview](/en/careers/trades)`,
      am: `## ዋና ዘርፎች

- ግንባታ
- ሞተር
- ኤሌክትሮኒክስ
- ምርት
- እርሻ`,
    },
  },
  {
    slug: "interview-stigma-handling",
    orderIndex: 19,
    reviewedAt: "2026-05-01",
    question: {
      he: "סטיגמה בראיונות עבודה — איך מתמודדים",
      en: "Stigma in job interviews — how to handle it",
      am: "በቃለ-መጠይቅ ላይ መድልዎ — እንዴት መቋቋም",
    },
    shortAnswer: {
      he: "חשוב להכיר את הזכויות (חוק שיוויון הזדמנויות), להתעד מקרים חשודים, ובמקרי הפליה ברורה — לפנות לטבקה לייעוץ משפטי.",
      en: "Know your rights (Equal Employment Opportunities Law), document suspicious cases, and in clear discrimination cases — contact Tebeka for legal counsel.",
      am: "መብቶችዎን ይወቁ፣ ጉዳዮችን ይመዝግቡ፣ በግልጽ መድልዎ ሲኖር ጤቤካን ያነጋግሩ።",
    },
    bodies: {
      he: `## ההכנה

PRESEN של ENP מטפלת בנושא ספציפית — מלמדת איך להתמקד במיומנויות ולנסות הסחת דעת מ-bias מוקדם. שיעור הצלחה ראיון עולה ב-30%+ אחרי הקורס.

## אם אתם חושדים בהפליה

1. תיעדו: שמרו את ההגשה, את ההודעה, את ה-CV ששלחתם
2. בקשו פירוט של הסיבה לדחייה (זכאי בחוק)
3. אם הסיבה לא משכנעת או נראית מפלה — פנו ל-טבקה לייעוץ משפטי חינמי
4. במקרים חמורים — תלונה לנציבות שוויון הזדמנויות בעבודה

## ראו גם

- [PRESEN — תכנית](/he/careers/programs/presen)
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)
- [Tebeka legal aid — זכות](/he/rights/tebeka-legal-aid)`,
      en: `## Preparation

ENP's PRESEN handles this specifically — teaches how to focus on skills and divert attention from early bias. Interview success rate rises 30%+ after the course.

## If you suspect discrimination

1. Document: keep the application, the message, the CV you sent
2. Ask for a detailed reason for rejection (legal right)
3. If the reason is unconvincing or appears discriminatory — contact Tebeka for free legal counsel
4. In severe cases — file a complaint with the Equal Employment Opportunities Commission

## See also

- [PRESEN — program](/en/careers/programs/presen)
- [Tebeka — organization profile](/en/orgs/tebeka)
- [Tebeka legal aid — right](/en/rights/tebeka-legal-aid)`,
      am: `## ዝግጅት

PRESEN ይረዳል። የስኬት መጠን በ30%+ ይነሳል።

## መድልዎ ከጠረጠሩ

1. ይመዝግቡ
2. የተብራራ ምክንያት ይጠይቁ
3. ጤቤካን ያነጋግሩ`,
    },
  },
  {
    slug: "tax-relief-new-immigrant-impact-salary",
    orderIndex: 20,
    trackSlug: "finance",
    reviewedAt: "2026-05-01",
    question: {
      he: "מס הכנסה + פטור לעולה חדש — איך משפיע על משכורת",
      en: "Income tax + new immigrant exemption — impact on salary",
      am: "ገቢ ግብር + የስደተኛ ነፃ — በደመወዝ ላይ ያለው ተጽእኖ",
    },
    shortAnswer: {
      he: "עולה חדש זוכה לפטור ממס על הכנסה זרה ל-10 שנים + נקודות זיכוי נוספות. נטו של עולה חדש בעבודה מקומית גבוה ב-15-25% מאזרח רגיל באותה משכורת ברוטו.",
      en: "A new oleh gets foreign-income tax exemption for 10 years + extra credit points. A new oleh's net pay from local work is 15-25% higher than a regular citizen at the same gross salary.",
      am: "አዲስ ስደተኛ ለ10 ዓመት የውጭ ገቢ ነፃ + ተጨማሪ ክሬዲት ነጥቦች ያገኛል።",
    },
    bodies: {
      he: `## ההטבות העיקריות

- **פטור ממס על הכנסה זרה** — 10 שנים מיום העלייה
- **נקודות זיכוי נוספות** — 1 נקודת זיכוי לעולה (~₪3,000 בשנה) + 0.5 נקודה נוספת ל-3 שנים ראשונות
- **פטור ממס שבח על דירה ראשונה** — אם נרכשה תוך 7 שנים מהעלייה

## משמעות מעשית

עולה חדש בשכר ₪10,000 ברוטו לחודש מקבל נטו של ~₪9,200 (לעומת ~₪7,800 לאזרח רגיל).

## איך מממשים

הפטור אוטומטי דרך מס הכנסה אם רשמתם את העלייה בעת ההגעה. אם נשכח — הגישו טופס 116 (תיקון אחורה).

## ראו גם

- [Immigrant tax relief — זכות](/he/rights/immigrant-tax-relief)
- [Klita basket — זכות](/he/rights/klita-basket)`,
      en: `## Main benefits

- **Foreign-income tax exemption** — 10 years from aliyah date
- **Additional credit points** — 1 credit point per oleh (~₪3,000/year) + 0.5 extra point for the first 3 years
- **Capital-gains tax exemption on first home** — if purchased within 7 years of aliyah

## Practical meaning

A new oleh on ₪10,000 monthly gross receives ~₪9,200 net (vs ~₪7,800 for a regular citizen).

## How to claim

The exemption is automatic through the Tax Authority if you registered your aliyah on arrival. If forgotten — file form 116 (retroactive correction).

## See also

- [Immigrant tax relief — right](/en/rights/immigrant-tax-relief)
- [Klita basket — right](/en/rights/klita-basket)`,
      am: `## ዋና ጥቅሞች

- የውጭ ገቢ ነፃ — 10 ዓመት
- ተጨማሪ ክሬዲት ነጥቦች
- የመጀመሪያ ቤት ካፒታል-ጋይን ነፃ`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findFaq(slug: string): CareerFaqEntry | null {
  return FAQS.find((f) => f.slug === slug) ?? null;
}

export function faqsForTrack(trackSlug: string): CareerFaqEntry[] {
  return FAQS.filter((f) => f.trackSlug === trackSlug);
}

export function faqsByOrder(): CareerFaqEntry[] {
  return [...FAQS].sort((a, b) => a.orderIndex - b.orderIndex);
}
