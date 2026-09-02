// Career-FAQ seed (RIN-475 — Careers Hub Wave 5 / RIN-469).
//
// 18 long-tail Q&A entries authored in HE/EN/AM. Each FAQ targets a
// specific community-relevant search query and links into the existing
// verticals (rights, orgs, bootcamps, professionals).
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. The route layer at
// `/$lang/careers/faq/$question` emits a `FAQPage` JSON-LD per entry —
// rich snippet eligible (Google may render the Q&A inline in SERP).
//
// AUDIT: TED-158, 2026-09-02. See docs/adr/021-sourced-claims.md.
//
// This file entered the audit with ~25 percentage claims, a dozen shekel
// figures, and ZERO source URLs — while emitting FAQPage structured data,
// i.e. asking Google to surface unsourced numbers as answers. It was also
// missing from CLAIM_REGISTRIES in tests/content-claims.test.ts, so the
// ADR-021 sourcing rule had never applied to it. That gap is closed in
// the same commit.
//
// VERIFIED AGAINST THE OPERATOR'S OWN SITE
//   - טק-קריירה (tech-career.org): 88% השתלבות בתעשייה, 97% סיום הקורס,
//     1,300 בוגרים, 40% נשים. עמותה עצמאית.
//   - עולים ביחד (olim-beyahad.org.il): 87% השתלבות בתעסוקה איכותית,
//     יותר מ-1,500 בוגרים.
//   - תוכנית שוברים להכשרה מקצועית (משרד העבודה): יוצאי אתיופיה נמנים
//     עם קבוצה א' — 90% למקצועות בביקוש גבוה, 80% לביקוש בינוני,
//     בתקרה של כ-6,000-12,000 ₪ לקורס. תמיד בהשתתפות עצמית.
//   - נקודות זיכוי לעולה (ס' 35 לפקודת מס הכנסה, עלייה מ-1.1.2022):
//     חודשים 1-12 נקודה אחת; 13-30 ארבע וחצי; 31-42 שתיים; 43-54 אחת.
//     שווי נקודה 2026: 242 ₪ לחודש.
//   - סל קליטה 2026: יחיד 21,694 ₪, הורה עצמאי 35,071 ₪, זוג 41,359 ₪ —
//     תשלום ראשון בנתב"ג ושישה תשלומים חודשיים בשנה הראשונה.
//   - ייצוג הולם: חוק שירות המדינה (מינויים), ס' 15א.
//
// DELIBERATELY EXCLUDED — investigated, not published
//   - "PRESEN של ENP": no such course. ENP runs no employment programme
//     at all. One FAQ built entirely on it was deleted.
//   - "Hila", an 18-24 month bagrut+bootcamp track paying ₪3,500/month:
//     no such programme. Three real bodies are named Hila/היל"ה and none
//     matches. That FAQ was deleted too.
//   - "codeOved": no organisation, no site, no domain.
//   - "JDC-Ashalim Strong Families" and its four regional centres: not a
//     programme JDC publishes. Their real Ethiopian-family work is PACT.
//   - "Tech-Career is an ENP bootcamp": Tech-Career is an independent
//     עמותה. ENP works with ages 13-18 and runs no bootcamp.
//   - "ENP 2024 report" as the source of a 78% placement rate: no such
//     report; ENP publishes no placement data.
//   - "Madrasa מנהלת את הרשת" of Ministry-of-Labour trades courses:
//     Madrasa teaches spoken Arabic online.
//   - ScaleUp Velocity "16 weeks + ₪50-150K seed to 3 teams": the
//     organisation is real and is a training body, not an investor.
//   - "צו 50": no instrument of that name. The basis is ס' 15א.
//   - "סבסוד צהרון עד 80% לבני קהילה" and "28 שבועות חופשת לידה,
//     שבועיים יותר מהסטנדרט": the exclusivity-fabrication pattern of
//     TED-148 and TED-157. Daycare subsidy is means-tested with no
//     ethnic criterion; statutory leave is 26 weeks (15 paid) with no
//     28-week or community-specific variant anywhere.
//   - Unpublished statistics, all removed rather than softened: Atidim
//     95% / 100% / 70%; Olim Beyahad 70%-after-5-years; trades 90%
//     completion and 60% self-employment; junior salary ₪16-22K;
//     "30%+ more CVs"; ISEF ₪8-12K; "excellence-employment ₪3-5K".
//   - "הישגים" as a full three-year government scholarship: TED-157
//     established it is a grades 7-12 guidance programme awarding no
//     money. Removed here, where it had survived.
//   - The UJIA-KIEDF loan ceiling: the fund is real, neither UJIA nor
//     KIEDF publishes a borrower cap, and our two files disagreed
//     (₪200,000 vs ₪150,000). Both figures removed.
//   - A living stipend figure for מלגת הכשרה / BOOST: the programme is
//     real, the amount is not published by a primary source.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export interface CareerFaqEntry {
  slug: string;
  question: Translatable;
  shortAnswer: Translatable;
  trackSlug?: string;
  orderIndex: number;
  reviewedAt: string;
  bodies: Record<Locale, string>;
}

export const FAQS: CareerFaqEntry[] = [
  {
    slug: "how-to-start-tech-career-ethiopian",
    orderIndex: 1,
    trackSlug: "tech",
    reviewedAt: "2026-09-02",
    question: {
      he: "איך להתחיל קריירה בהייטק כיוצא אתיופיה?",
      en: "How to start a tech career as an Ethiopian-Israeli?",
      am: "እንደ ኢትዮጵያ-እስራኤላዊ የቴክ ሙያ እንዴት ይጀመራል?",
    },
    shortAnswer: {
      he: "המסלול הנפוץ הוא bootcamp שאינו דורש תואר. טק-קריירה היא העמותה הוותיקה שמתמחה בקהילה, ומדווחת באתרה על 88% השתלבות בתעשייה.",
      en: "The common route is a bootcamp with no degree requirement. Tech-Career is the veteran nonprofit specialising in the community, and reports 88% integration into the industry on its own site.",
      am: "የተለመደው መንገድ ዲግሪ የማይጠይቅ ቡት ካምፕ ነው። ቴክ-ካሪየር በድረ-ገጹ 88% የኢንዱስትሪ ውህደት ይዘግባል።",
    },
    bodies: {
      he: `## הצעד הראשון

bootcamp שאינו דורש תואר ראשון. הארגון הוותיק שמתמחה בקהילה הוא **טק-קריירה** — עמותה עצמאית (לא תוכנית של ENP, כפי שנכתב כאן בעבר).

## מה טק-קריירה מפרסמת על עצמה

- **88%** מהבוגרות והבוגרים השתלבו בתעשיית ההייטק
- **97%** מהסטודנטים מסיימים את הקורס
- כ-**1,300** בוגרים מאז 2002, מהם **40%** נשים

שימו לב: הארגון אינו מפרסם חלון זמן להשתלבות, ואינו מבטיח השמה. הנתונים הם דיווח עצמי שלו.

## אם יש לכם כבר תואר ראשון רלוונטי

**עולים ביחד** מפעילה תוכנית ליווי לאקדמאים יוצאי אתיופיה, ומדווחת על **87%** השתלבות בתעסוקה איכותית (ללא חלון זמן מפורסם).

## ראו גם

- [Olim Beyahad Mentorship](/he/careers/programs/olim-beyahad-mentorship)
- [Tech track — סקירה כללית](/he/careers/tech)

מקורות: [טק-קריירה](https://www.tech-career.org/) · [עולים ביחד](https://www.olim-beyahad.org.il/) · נבדק ספטמבר 2026.`,
      en: `## The first step

A bootcamp with no bachelor's requirement. The veteran organisation specialising in the community is **Tech-Career** — an independent nonprofit (not an ENP programme, as this page previously stated).

## What Tech-Career publishes about itself

- **88%** of graduates integrated into the high-tech industry
- **97%** of students complete the course
- around **1,300** graduates since 2002, **40%** of them women

Note: the organisation publishes no time window for integration and does not guarantee placement. These are its own self-reported figures.

## If you already have a relevant bachelor's

**Olim Beyahad** runs a mentorship programme for Ethiopian-Israeli graduates and reports **87%** integration into quality employment (no published time window).

## See also

- [Olim Beyahad Mentorship](/en/careers/programs/olim-beyahad-mentorship)
- [Tech track — overview](/en/careers/tech)

Sources: [Tech-Career](https://www.tech-career.org/) · [Olim Beyahad](https://www.olim-beyahad.org.il/) · verified September 2026.`,
      am: `## የመጀመሪያ ደረጃ

ዲግሪ የማይጠይቅ ቡት ካምፕ። በማህበረሰቡ ላይ የተካነው ጥንታዊ ድርጅት **ቴክ-ካሪየር** ነው — ራሱን የቻለ ማህበር እንጂ የ ENP ፕሮግራም አይደለም።

## ቴክ-ካሪየር ስለ ራሱ የሚያትመው

- **88%** ምሩቃን በሃይ-ቴክ ኢንዱስትሪ ተቀላቅለዋል
- **97%** ኮርሱን ያጠናቅቃሉ
- ከ2002 ጀምሮ ወደ **1,300** ምሩቃን

ማስታወሻ: ድርጅቱ የጊዜ ገደብ አያትምም እና ቅጥርን አያረጋግጥም።

## ዲግሪ ካለዎት

**ኦሊም በያሐድ** **87%** የጥራት ቅጥር ውህደት ይዘግባል።

ምንጮች: [ቴክ-ካሪየር](https://www.tech-career.org/) · በመስከረም 2026 ተረጋግጧል።`,
    },
  },
  {
    slug: "what-is-tech-career-bootcamp-enp",
    orderIndex: 2,
    trackSlug: "tech",
    reviewedAt: "2026-09-02",
    question: {
      he: "מה זה טק-קריירה — והאם זו תוכנית של ENP?",
      en: "What is Tech-Career — and is it an ENP programme?",
      am: "ቴክ-ካሪየር ምንድን ነው — የ ENP ፕሮግራም ነው?",
    },
    shortAnswer: {
      he: "טק-קריירה היא עמותה עצמאית, לא תוכנית של ENP. היא מכשירה יוצאי אתיופיה למקצועות הייטק מאז 2002 ומדווחת על 88% השתלבות בתעשייה.",
      en: "Tech-Career is an independent nonprofit, not an ENP programme. It has trained Ethiopian-Israelis for tech roles since 2002 and reports 88% integration into the industry.",
      am: "ቴክ-ካሪየር ራሱን የቻለ ማህበር ነው እንጂ የ ENP ፕሮግራም አይደለም።",
    },
    bodies: {
      he: `## קודם כול — הבהרה

דף זה קבע בעבר שטק-קריירה היא bootcamp של **ENP**. זו טעות: **טק-קריירה היא עמותה עצמאית** עם הנהלה וצוות משלה. ENP (הפרויקט הלאומי לקהילה האתיופית) עובד עם גילאי 13-18 ואינו מפעיל bootcamp או תוכנית תעסוקה כלשהי.

## מה הארגון מפרסם

- **88%** מהבוגרות והבוגרים השתלבו בתעשיית ההייטק
- **97%** מסיימים את הקורס
- כ-**1,300** בוגרים מאז 2002, מהם **40%** נשים

הארגון אינו מפרסם חלון זמן להשתלבות ואינו מבטיח השמה.

## מי מתאים

הקורס מיועד למי שמפגין יכולת אנליטית גבוהה — עם או בלי תואר. תנאי הקבלה, משך הקורס והשלוחות הפעילות מתעדכנים; בדקו באתר הארגון.

## ראו גם

- [ENP — פרופיל ארגון](/he/orgs/enp)
- [Tech-Career bootcamp — זכות ממשלתית](/he/rights/tech-career-bootcamp)`,
      en: `## First, a correction

This page previously described Tech-Career as an **ENP** bootcamp. That is wrong: **Tech-Career is an independent nonprofit** with its own board and staff. ENP (the Ethiopian National Project) works with ages 13-18 and runs no bootcamp or employment programme of any kind.

## What the organisation publishes

- **88%** of graduates integrated into the high-tech industry
- **97%** complete the course
- around **1,300** graduates since 2002, **40%** of them women

The organisation publishes no time window for integration and does not guarantee placement.

## Who fits

The course is aimed at people who show strong analytical ability — with or without a degree. Admission conditions, course length and active campuses change; check the organisation's own site.

## See also

- [ENP — organization profile](/en/orgs/enp)
- [Tech-Career bootcamp — government right](/en/rights/tech-career-bootcamp)

Source: [Tech-Career](https://www.tech-career.org/) · verified September 2026.`,
      am: `## መጀመሪያ — ማስተካከያ

ይህ ገጽ ቀደም ሲል ቴክ-ካሪየርን የ **ENP** ቡት ካምፕ ብሎ ገልጾ ነበር። ይህ ስህተት ነው: **ቴክ-ካሪየር ራሱን የቻለ ማህበር ነው**። ENP ከ13-18 ዓመት ወጣቶች ጋር ይሰራል፤ ቡት ካምፕ አያካሂድም።

## ድርጅቱ የሚያትመው

- **88%** በሃይ-ቴክ ኢንዱስትሪ ተቀላቅለዋል
- **97%** ኮርሱን ያጠናቅቃሉ
- ከ2002 ጀምሮ ወደ **1,300** ምሩቃን

ምንጭ: [ቴክ-ካሪየር](https://www.tech-career.org/) · በመስከረም 2026 ተረጋግጧል።`,
    },
  },
  {
    slug: "are-there-employment-scholarships",
    orderIndex: 3,
    trackSlug: "tech",
    reviewedAt: "2026-09-02",
    question: {
      he: "האם יש מלגות תעסוקה לבני העדה האתיופית?",
      en: "Are there employment scholarships for community members?",
      am: "ለማህበረሰብ አባላት የቅጥር ስኮላርሺፕ አለ?",
    },
    shortAnswer: {
      he: "כן, אבל הסכומים משתנים ואינם מפורסמים במקום אחד. אל תסתמכו על סכום שראיתם באתר שאינו של הקרן עצמה — בקשו את התנאים בכתב מהקרן.",
      en: "Yes, but the amounts vary and are not published in one place. Do not rely on a figure from anywhere other than the fund itself — ask the fund for its terms in writing.",
      am: "አዎ፣ ነገር ግን መጠኖቹ ይለያያሉ እና በአንድ ቦታ አይታተሙም። ከፈንዱ ራሱ ውጭ ባለ ቦታ ያዩትን መጠን አይመኑ።",
    },
    bodies: {
      he: `## מה באמת קיים

- **ISEF** — קרן מלגות ותיקה. הקרן בוחרת על בסיס דור ראשון להשכלה גבוהה ופריפריה, **לא** על בסיס מוצא אתיופי. הסכום נקבע מול המוסד ואינו מפורסם כמספר אחיד — פנו לקרן.
- **טק-קריירה** — הכשרת הייטק לבני הקהילה, בעמותה עצמאית (לא ENP).
- **תוכנית שוברים להכשרה מקצועית** (משרד העבודה) — יוצאי אתיופיה נמנים עם קבוצה א', הזכאית לשיעור הסבסוד הגבוה. פירוט בשאלה על מקצועות היד.
- **מלגות המוסדות עצמם** — לכל אוניברסיטה ומכללה דקאנט סטודנטים עם מלגות סיוע וקרנות ייעודיות. זה המקור שהכי כדאי להתחיל בו, והוא הנשכח ביותר.

## שני דברים שהוסרו מהדף הזה

בעבר הופיעו כאן "Hesegim — תקצוב מלא ל-3 שנים" ותוספת "excellence-employment של ₪3-5K לשנה". **"הישגים" אינה מלגה** — זו תוכנית ליווי והכוונה לתלמידי כיתות ז'-י"ב שאינה מעניקה כסף. תוספת ה-₪3-5K לא נמצאה בשום מקור. שניהם הוסרו.

## איך פונים

לכל קרן תהליך נפרד ומועדים משלה. בקשו תמיד את **תנאי הזכאות והסכום בכתב מהקרן עצמה** לפני שאתם בונים על סכום כלשהו.

## ראו גם

- [Student aid — זכות](/he/rights/student-aid)

מקורות: [ISEF](https://www.isef.org.il/) · [טק-קריירה](https://www.tech-career.org/) · [תוכנית שוברים — משרד העבודה](https://www.gov.il/he/departments/units/manpower-training-bureau) · נבדק ספטמבר 2026.`,
      en: `## What actually exists

- **ISEF** — a veteran scholarship fund. It selects on first-generation-to-higher-education and periphery criteria, **not** on Ethiopian origin. The amount is set with the institution and is not published as a single figure — ask the fund.
- **Tech-Career** — tech training for community members, run by an independent nonprofit (not ENP).
- **The vocational training voucher scheme** (Ministry of Labour) — Ethiopian-origin applicants are in Group A, which carries the higher subsidy rate. Details in the trades question.
- **The institutions' own scholarships** — every university and college has a dean of students with aid scholarships and dedicated funds. This is the best place to start and the most overlooked.

## Two things removed from this page

It previously listed "Hesegim — full 3-year funding" and an "excellence-employment" top-up of ₪3-5K/year. **"Hesegim" is not a scholarship** — it is a guidance programme for grades 7-12 that awards no money. The ₪3-5K top-up appears in no source. Both were removed.

## How to apply

Each fund has its own process and deadlines. Always ask for the **eligibility terms and the amount in writing from the fund itself** before counting on any figure.

## See also

- [Student aid — right](/en/rights/student-aid)`,
      am: `## በእውነት ያለው

- **ISEF** — ጥንታዊ የስኮላርሺፕ ፈንድ። ምርጫው በመጀመሪያ ትውልድ ከፍተኛ ትምህርት እና በዳርቻ አካባቢ ላይ የተመሠረተ ነው እንጂ በኢትዮጵያ ተወላጅነት **አይደለም**።
- **ቴክ-ካሪየር** — ራሱን የቻለ ማህበር።
- **የሙያ ስልጠና ቫውቸር ፕሮግራም** (የሥራ ሚኒስቴር) — የኢትዮጵያ ተወላጆች በቡድን א ውስጥ ናቸው።
- **የተቋማቱ የራሳቸው ስኮላርሺፖች** — ማንኛውም ዩኒቨርሲቲ የተማሪዎች ዲን አለው። ይህ ምርጡ መነሻ ነው።

## ከዚህ ገጽ የተወገዱ ሁለት ነገሮች

"ሄሰግም — የ3 ዓመት ሙሉ ድጋፍ" እና "የ₪3-5K ተጨማሪ" ቀደም ሲል እዚህ ነበሩ። **"ሄሰግም" ስኮላርሺፕ አይደለም** — ገንዘብ የማይሰጥ የ7-12 ክፍል መመሪያ ፕሮግራም ነው። ሁለቱም ተወግደዋል።`,
    },
  },
  {
    slug: "what-is-affirmative-representation-public-sector",
    orderIndex: 4,
    trackSlug: "public-sector",
    reviewedAt: "2026-09-02",
    question: {
      he: "ייצוג הולם בשירות הציבורי — מה זה אומר בפועל?",
      en: "Affirmative representation in the civil service — what does it mean in practice?",
      am: "በመንግስት አገልግሎት ቅድሚያ ውክልና — በተግባር ምን ማለት ነው?",
    },
    shortAnswer: {
      he: 'הבסיס הוא סעיף 15א לחוק שירות המדינה (מינויים) — לא "צו 50", שאינו קיים. כשכישורי המועמדים דומים, ניתן להעדיף מועמד מקבוצה שאינה מיוצגת כראוי.',
      en: 'The basis is s.15A of the Civil Service (Appointments) Law — not "Order 50", which does not exist. Where qualifications are similar, preference may be given to a candidate from an under-represented group.',
      am: 'መሠረቱ የመንግሥት አገልግሎት (ሹመቶች) ሕግ ክፍል 15א ነው — "ትዕዛዝ 50" የሚባል የለም።',
    },
    bodies: {
      he: `## מה הבסיס החוקי

**סעיף 15א לחוק שירות המדינה (מינויים)**. אין מסמך בשם "צו 50" — הדף הזה השתמש בשם הזה בעבר, וזו הייתה טעות.

## איך זה עובד בפועל — ומה ההבדל שחשוב להכיר

הניסוח בחוק הוא **"כישורים דומים"**, לא "שני מועמדים שווים". זה סף נמוך יותר וטוב יותר עבורכם: אינכם צריכים להיות זהים למועמד אחר, אלא בעלי כישורים דומים.

לצד זאת — **ההעדפה היא סמכות שבשיקול דעת, לא חובה אוטומטית**. ועדה רשאית להעדיף מועמד מקבוצה שאינה מיוצגת כראוי; היא אינה מחויבת לעשות זאת בכל מקרה. חשוב לדעת את זה מראש כדי לא להסתמך על תוצאה שאינה מובטחת.

## איך מסמנים

בטופסי המכרז של שירות המדינה יש סעיף המתייחס לייצוג הולם. אם אינכם מוצאים אותו — פנו לגורם המגייס ובקשו שהשתייכותכם תירשם, ושמרו עותק של הפנייה.

## ערעור

אם נדחיתם ויש לכם בסיס לחשד שהצו לא יושם — פנו ל-טבקה לייעוץ משפטי חינמי.

## ראו גם

- [ייצוג הולם — דף הסבר מלא](/he/careers/affirmative-action)
- [Public-sector representation — זכות](/he/rights/public-sector-representation)
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)`,
      en: `## The legal basis

**Section 15A of the Civil Service (Appointments) Law.** There is no document called "Order 50" — this page used that name, and it was wrong.

## How it works in practice — and the distinction that matters

The statutory wording is **"similar qualifications"**, not "two equally qualified candidates". That is a lower and more favourable threshold: you do not have to be identical to another candidate, only similarly qualified.

At the same time, **the preference is discretionary, not an automatic duty**. A committee may prefer a candidate from an under-represented group; it is not obliged to in every case. Knowing that in advance keeps you from relying on an outcome that is not guaranteed.

## How to flag it

Civil-service tender forms carry a clause on affirmative representation. If you cannot find it, ask the recruiting officer to record your status, and keep a copy of that request.

## Appeals

If rejected and you suspect the order wasn't applied — contact Tebeka for free legal counsel.

## See also

- [Affirmative action — full explainer](/en/careers/affirmative-action)
- [Public-sector representation — right](/en/rights/public-sector-representation)
- [Tebeka — organization profile](/en/orgs/tebeka)`,
      am: `## የሕግ መሠረቱ

**የመንግሥት አገልግሎት (ሹመቶች) ሕግ ክፍል 15א**። "ትዕዛዝ 50" የሚባል ሰነድ የለም።

## በተግባር እንዴት ይሰራል

በሕጉ ውስጥ ያለው አገላለጽ **"ተመሳሳይ ብቃት"** ነው እንጂ "እኩል ብቁ" አይደለም — ይህ ለእርስዎ የተሻለ ዝቅተኛ መስፈርት ነው። ነገር ግን **ቅድሚያ መስጠቱ በውሳኔ ላይ የተመሠረተ ነው እንጂ ራስ-ሰር ግዴታ አይደለም**።

## እንዴት ምልክት ማድረግ

በጨረታ ቅጾች ውስጥ ስለ ተመጣጣኝ ውክልና አንቀጽ አለ። ካላገኙት አመልማዩን ይጠይቁ እና ቅጂ ይያዙ።`,
    },
  },
  {
    slug: "order-50-eligibility",
    orderIndex: 5,
    trackSlug: "public-sector",
    reviewedAt: "2026-09-02",
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
- מוצא אתיופי
- הייצוג ההולם מעוגן ב**סעיף 15א לחוק שירות המדינה (מינויים)** — לא ב"צו 50", שאינו קיים

## איך מממשים

1. בחנו ב-[דף ייצוג הולם](/he/careers/affirmative-action) את הזכויות הספציפיות
2. בעת הגשת מועמדות לתפקיד ציבורי — ציינו את השתייכותכם בסעיף הייצוג ההולם שבטופס. אם אין סעיף כזה, פנו לגורם המגייס בכתב
3. שמרו עותק של ההגשה כראיה (במקרה של ערעור)

**חשוב:** ההעדפה חלה כשהכישורים **דומים**, והיא סמכות שבשיקול דעת — לא תוצאה מובטחת.

## ראו גם

- [ייצוג הולם — דף הסבר](/he/careers/affirmative-action)
- [Public-sector — סקירה כללית](/he/careers/public-sector)`,
      en: `## Eligibility

- Israeli citizenship
- Ethiopian descent
- Affirmative representation rests on **s.15A of the Civil Service (Appointments) Law** — not on "Order 50", which does not exist

## How to claim

1. Check the [affirmative-action page](/en/careers/affirmative-action) for specific rights
2. When applying for a public-sector role, state your status in the affirmative-representation clause of the form. If the form has none, write to the recruiting officer
3. Keep a copy of the application as evidence (in case of appeal)

**Important:** the preference applies where qualifications are **similar**, and it is discretionary — not a guaranteed outcome.

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
    reviewedAt: "2026-09-02",
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
    reviewedAt: "2026-09-02",
    question: {
      he: "תעסוקה לעולים חדשים מאתיופיה (2020+)",
      en: "Employment for new olim from Ethiopia (2020+)",
      am: "ለ2020+ የመጡ ለአዳዲስ ስደተኞች ቅጥር",
    },
    shortAnswer: {
      he: 'סל הקליטה משולם בתשלום ראשון בנתב"ג ועוד שישה תשלומים חודשיים בשנה הראשונה — לא כמענק חודשי לאורך כל השנה. האולפן הוא זכאות, לא חובה.',
      en: "The absorption basket is paid as a first payment at the airport plus six monthly payments in the first year — not as a monthly grant across the whole year. Ulpan is an entitlement, not a requirement.",
      am: "የመግቢያ ቅርጫት በአውሮፕላን ማረፊያ የመጀመሪያ ክፍያ እና በመጀመሪያው ዓመት ስድስት ወርሃዊ ክፍያዎች ይከፈላል። አልፓን ግዴታ ሳይሆን መብት ነው።",
    },
    bodies: {
      he: `## הסיוע שמגיע אוטומטית

**סל קליטה** — סכומי 2026, לכל תקופת הזכאות (לא לחודש):

- יחיד — **21,694 ₪**
- הורה עצמאי — **35,071 ₪**
- זוג — **41,359 ₪**

בתוספת תוספות לילדים ולגמלאים. התשלום הראשון ניתן בנתב"ג, ואחריו **שישה תשלומים חודשיים** במהלך השנה הראשונה. הסל אינו מותנה בהכנסה.

*הדף הזה קבע בעבר "מענק חודשי בשנה הראשונה (~₪3,000-4,500)". זה היה שגוי גם במבנה וגם בסכום.*

**אולפן** — אולפן א' ניתן ללא תשלום. זו **זכאות, לא חובה** (הדף קבע קודם "חובה"). לעולים מאתיופיה חלון המימוש ארוך מהרגיל — בדקו במשרד העלייה והקליטה.

**דיור זמני** — מרכזי קליטה.

## תכניות תעסוקה

- **Place-IL** — לא שירות השמה כללי: זו פלטפורמת התמחות בין-חברתית לסטודנטים ובוגרי מקצועות STEM, המיועדת לשש קבוצות בתת-ייצוג שיוצאי אתיופיה הם אחת מהן.
- **ITWorks** — עמותה אמיתית, אך קבוצות היעד שהיא מפרסמת הן נשים שנפגעו מהמלחמה, ערבים אזרחי ישראל ועולים מרוסיה ואוקראינה. היא אינה מציינת את הקהילה האתיופית — בדקו מולה ישירות אם אתם מתאימים.
- **עתידים** — מפעילה מסלולים בצה"ל ובתעשייה. שימו לב שהשמות "עתידים אקדמי" ו"עתידים צה"לי" שהופיעו כאן אינם שמות התוכניות שלה.

## ראו גם

- [סל קליטה — זכות](/he/rights/klita-basket)
- [ITWorks Israel — תכנית](/he/careers/programs/itworks-israel)

מקור: [משרד העלייה והקליטה — סל קליטה](https://www.gov.il/he/pages/absorption_basket) · נבדק ספטמבר 2026.
`,
      en: `## What you get automatically

**Absorption basket** — 2026 amounts, for the whole entitlement period (not per month):

- single — **₪21,694**
- single parent — **₪35,071**
- couple — **₪41,359**

Plus supplements for children and for pensioners. The first payment is made at the airport, followed by **six monthly payments** during the first year. The basket is not income-tested.

*This page previously said "monthly grant in the first year (~₪3,000-4,500)". That was wrong in both structure and amount.*

**Ulpan** — Ulpan Aleph is free. It is an **entitlement, not a requirement** (the page previously said "mandatory"). Olim from Ethiopia have a longer window to use it — check with the Ministry of Aliyah and Integration.

**Temporary housing** — absorption centres.

## Employment programmes

- **Place-IL** — not a general placement service: it is a cross-company internship platform for STEM students and graduates, aimed at six under-represented groups of which Ethiopian-Israelis are one.
- **ITWorks** — a real nonprofit, but the target groups it publishes are women affected by the war, Arab citizens of Israel, and olim from Russia and Ukraine. It does not name the Ethiopian community — check with them directly whether you fit.
- **Atidim** — runs IDF and industry tracks. Note that "Atidim Academic" and "Atidim Military", which appeared here, are not the names of its programmes.

## See also

- [Klita basket — right](/en/rights/klita-basket)
- [ITWorks Israel — program](/en/careers/programs/itworks-israel)

Source: [Ministry of Aliyah and Integration — absorption basket](https://www.gov.il/he/pages/absorption_basket) · verified September 2026.
`,
      am: `## ራስ-ሰር የሚያገኙት

**የመግቢያ ቅርጫት** — የ2026 መጠኖች፣ ለጠቅላላው የመብት ጊዜ (በወር አይደለም):

- ነጠላ — **21,694 ₪**
- ብቸኛ ወላጅ — **35,071 ₪**
- ጥንዶች — **41,359 ₪**

የመጀመሪያው ክፍያ በአውሮፕላን ማረፊያ ይሰጣል፤ ከዚያም በመጀመሪያው ዓመት **ስድስት ወርሃዊ ክፍያዎች**።

**አልፓን** — አልፓን א ያለ ክፍያ ነው። **መብት እንጂ ግዴታ አይደለም**።

## የቅጥር ፕሮግራሞች

- **Place-IL** — አጠቃላይ የቅጥር አገልግሎት አይደለም፤ ለ STEM ተማሪዎች የኩባንያዎች መካከል የልምምድ መድረክ ነው።
- **ITWorks** — እውነተኛ ማህበር ነው፣ ነገር ግን የሚያትማቸው ዒላማ ቡድኖች የኢትዮጵያ ማህበረሰብን አያካትቱም።

ምንጭ: [የስደት ሚኒስቴር](https://www.gov.il/he/pages/absorption_basket) · በመስከረም 2026 ተረጋግጧል።`,
    },
  },
  {
    slug: "first-job-after-army-ethiopian",
    orderIndex: 8,
    reviewedAt: "2026-09-02",
    question: {
      he: "חיפוש עבודה ראשון אחרי צבא — בני קהילה אתיופית",
      en: "First job search after IDF — Ethiopian-Israeli community",
      am: "ከ IDF በኋላ የመጀመሪያ ሥራ ፍለጋ",
    },
    shortAnswer: {
      he: "התחילו בפגישת ייעוץ קריירה חינמית ובבניית רשת קשרים. האפליה בשלב הסינון היא אמיתית ומתועדת — ולכן ערוץ פנייה אנושי שווה יותר מהגשה עיוורת.",
      en: "Start with a free career consultation and with building a network. Screening-stage discrimination is real and documented — which is why a human route in is worth more than a blind application.",
      am: "በነፃ የሙያ ምክክር እና አውታረ መረብ በመገንባት ይጀምሩ። በማጣሪያ ደረጃ ያለው አድሎ እውነተኛ ነው።",
    },
    bodies: {
      he: `## הסדר המומלץ

1. **פגישת ייעוץ קריירה** (חינמי) — מיפוי תחומי עניין ויכולות
2. **חיפוש עבודה פעיל** — עולים ביחד (אם יש תואר ראשון), Place-IL (למקצועות STEM)

## למה רשת קשרים חשובה כאן במיוחד

סקר מעסיקים של משרד הכלכלה מצא ש**רק 5.6% מהמעסיקים הביעו נכונות להעסיק יוצאי אתיופיה** — השיעור הנמוך ביותר מבין כל הקבוצות שנבדקו (חרדים 8.7%, ערבים 7.4%). המשמעות המעשית: החסם הגדול הוא **שלב הסינון**, לפני שמישהו בכלל קרא את קורות החיים לעומק.

לכן פנייה דרך אדם — מנטור, בוגר, ממליץ — שווה יותר מהגשה עיוורת דרך אתר. זה לא טיפ "רך"; זו התאמה של האסטרטגיה לחסם האמיתי.

*הערה: דף זה קבע בעבר שבני הקהילה "צריכים להגיש 30%+ יותר קורות חיים". הנתון הזה לא נמצא בשום מחקר על יוצאי אתיופיה. מחקר קורות החיים הישראלי הידוע השווה שמות אשכנזיים ומזרחיים, לא יוצאי אתיופיה.*

## ראו גם

- [רשת יועצי קריירה](/he/careers/programs/career-counselors-network)
- [Olim Beyahad — תכנית](/he/careers/programs/olim-beyahad-mentorship)`,
      en: `## Recommended order

1. **Free career consultation** — interest mapping and skill assessment
2. **Active job search** — Olim Beyahad (with a bachelor's), Place-IL (STEM fields)

## Why a network matters especially here

A Ministry of Economy employer survey found that **only 5.6% of employers expressed willingness to employ Ethiopian-Israelis** — the lowest of any group surveyed (Haredim 8.7%, Arabs 7.4%). What that means in practice: the biggest barrier is the **screening stage**, before anyone has read your CV properly.

So an approach through a person — a mentor, an alum, a referrer — is worth more than a blind application through a jobs site. That is not soft advice; it is matching the strategy to where the barrier actually is.

*Note: this page previously said community members must "submit 30%+ more CVs". That figure appears in no study of Ethiopian-Israelis. The well-known Israeli CV experiment compared Ashkenazi and Mizrahi names, not Ethiopian-Israelis.*

## See also

- [Career counselors network](/en/careers/programs/career-counselors-network)
- [Olim Beyahad — program](/en/careers/programs/olim-beyahad-mentorship)`,
      am: `## የሚመከር ቅደም ተከተል

1. ነፃ የሙያ ምክክር
2. ንቁ ስራ ፍለጋ — ኦሊም በያሐድ (ዲግሪ ካለ)፣ Place-IL (ለ STEM)

## አውታረ መረብ ለምን አስፈላጊ ነው

የኢኮኖሚ ሚኒስቴር ጥናት **5.6% አሠሪዎች ብቻ** የኢትዮጵያ ተወላጆችን ለመቅጠር ፈቃደኛ መሆናቸውን አግኝቷል — ከሁሉም ቡድኖች ዝቅተኛው። ትልቁ እንቅፋት **የማጣሪያ ደረጃ** ነው። ስለዚህ በሰው በኩል መቅረብ ከዓይነ ስውር ማመልከቻ ይሻላል።`,
    },
  },
  {
    slug: "subsidized-career-pivot-tracks",
    orderIndex: 9,
    reviewedAt: "2026-09-02",
    question: {
      he: "מסלולי הסבה מקצועית מסובסדים",
      en: "Subsidized career-pivot tracks",
      am: "የተደገፉ የሙያ መለወጫ መንገዶች",
    },
    shortAnswer: {
      he: "משרד העבודה מסבסד הכשרה מקצועית בשוברים. יוצאי אתיופיה נמנים עם קבוצה א' — 90% למקצועות בביקוש גבוה, 80% לביקוש בינוני. תמיד בהשתתפות עצמית.",
      en: "The Ministry of Labour subsidises vocational training through vouchers. Ethiopian-origin applicants are in Group A — 90% for high-demand trades, 80% for medium-demand. There is always a co-payment.",
      am: "የሥራ ሚኒስቴር በቫውቸር ይደግፋል። የኢትዮጵያ ተወላጆች በቡድን א ውስጥ ናቸው — 90% ወይም 80%። ሁልጊዜ የራስ መዋጮ አለ።",
    },
    bodies: {
      he: `## מקצועות יד מסובסדים

- **חשמלאי** — קורס 6-9 חודשים, רישיון משרד העבודה
- **אינסטלטור** — 4-6 חודשים, רישיון
- **ריתוך** — 3-6 חודשים
- **מכונאי** — 4-8 חודשים

## כמה זה עולה

ההכשרה מסובסדת דרך **תוכנית השוברים** של משרד העבודה. יוצאי אתיופיה — מי שנולד באתיופיה או שאחד מהוריו נולד שם — נמנים עם **קבוצה א'**, בעלת שיעור הסבסוד הגבוה:

- **90%** למקצועות בביקוש גבוה
- **80%** למקצועות בביקוש בינוני

בתקרה של כ-6,000-12,000 ₪ לקורס, ותמיד **בהשתתפות עצמית** — אין מסלול של 100%, כפי שנכתב כאן בעבר.

בנוסף קיימת **מלגת הכשרה (BOOST)** של משרד העבודה עם הג'וינט, לעד 6 חודשים, המותנית בקריטריון נוסף מעבר להשתייכות הקבוצתית. הסכום אינו מפורסם במקור ראשוני, ולכן איננו נוקבים בו כאן.

## אחרי הקורס

ענפי הבנייה והאחזקה זקוקים לאנשי מקצוע באופן קבוע. *(שיעורי הסיום וההשתלבות שהופיעו כאן בעבר — 90% ו-60% — אינם מפורסמים על ידי משרד העבודה ולא נמצא להם מקור, ולכן הוסרו.)*

## ראו גם

- [Trades — סקירה כללית](/he/careers/trades)
- [UJIA-KIEDF — הלוואות עסקים](/he/rights/ujia-kiedf-business-loans)

מקור: [מינהל הכשרות מקצועיות, משרד העבודה](https://www.gov.il/he/departments/units/manpower-training-bureau) · נבדק ספטמבר 2026.`,
      en: `## Subsidized trades

- **Electrician** — 6-9 month course, Ministry of Labor license
- **Plumber** — 4-6 months, license
- **Welder** — 3-6 months
- **Mechanic** — 4-8 months

## What it costs

Training is subsidised through the Ministry of Labour's **voucher scheme**. Ethiopian-origin applicants — born in Ethiopia, or with one parent born there — are in **Group A**, which carries the higher subsidy rate:

- **90%** for high-demand trades
- **80%** for medium-demand trades

capped at roughly ₪6,000-12,000 per course, and always with a **co-payment** — there is no 100% track, as this page previously stated.

There is also a **training stipend (BOOST)**, run by the Ministry of Labour with JDC, for up to 6 months, conditional on a further criterion beyond group membership. Its amount is not published by a primary source, so we do not state one here.

## After the course

Construction and maintenance have steady demand for qualified tradespeople. *(The completion and self-employment rates previously shown here — 90% and 60% — are not published by the Ministry of Labour and no source could be found, so they were removed.)*

## See also

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
    reviewedAt: "2026-09-02",
    question: {
      he: "מנטור בהייטק לבני קהילה אתיופית",
      en: "A tech mentor for Ethiopian-Israeli community members",
      am: "ለማህበረሰብ አባላት የቴክ አማካሪ",
    },
    shortAnswer: {
      he: "עולים ביחד מספקת ליווי 1:1 לאקדמאים. מנטור מהתעשייה (מתנדב), פגישה שבועית או דו-שבועית, ורשת של יותר מ-1,500 בוגרים.",
      en: "Olim Beyahad provides 1:1 mentorship for graduates. An industry mentor (a volunteer), weekly or bi-weekly meetings, and a network of more than 1,500 alumni.",
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

- הארגון מדווח באתרו על **87%** השתלבות בתעסוקה איכותית (ללא חלון זמן מפורסם)
- **יותר מ-1,500 בוגרים**

*שיעור "70% נשארים בקריירה אחרי 5 שנים" שהופיע כאן אינו מפורסם על ידי הארגון והוסר.*

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

- The organisation reports **87%** integration into quality employment on its own site (no published time window)
- **More than 1,500 alumni**

*The "70% stay in their career after 5 years" figure that appeared here is not published by the organisation and was removed.*

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
  // TED-158: FAQ "interview-prep-basic-hebrew" deleted. The entire
  // entry described "PRESEN של ENP" — an 8-week interview-prep course
  // with "mock interviews with interviewers from 15 partner companies".
  // No such course exists. ENP runs no employment programme at all, and
  // the course is not attributable to any other operator.
  {
    slug: "civil-service-via-atidim",
    orderIndex: 11,
    trackSlug: "public-sector",
    reviewedAt: "2026-09-02",
    question: {
      he: "כניסה לשירות הציבורי דרך עתידים",
      en: "Civil-service entry via Atidim",
      am: "በ Atidim በኩል ወደ መንግስት አገልግሎት መግቢያ",
    },
    shortAnswer: {
      he: 'עתידים מפעילה מסלולים בצה"ל ובתעשייה. אך הכניסה לשירות המדינה עוברת דרך תוכנית אחרת — "צוערים לשירות המדינה".',
      en: "Atidim runs IDF and industry tracks. But entry into the civil service runs through a different programme — the Civil Service Cadets.",
      am: "አቲዲም በ IDF እና በኢንዱስትሪ መንገዶችን ያካሂዳል። ወደ መንግሥት አገልግሎት መግቢያ ግን በሌላ ፕሮግራም በኩል ነው።",
    },
    bodies: {
      he: `## תיקון חשוב לדף הזה

הדף תיאר בעבר "עתידים אקדמי" ו"עתידים צה"לי" כמסלולים המובילים לשירות הציבורי. שני השמות אינם שמות התוכניות של עתידים, וההנחה עצמה שגויה: **מסלולי עתידים בצה"ל מובילים ליחידות טכנולוגיות בצה"ל, לא לשירות המדינה.** הצינור לשירות המדינה הוא תוכנית נפרדת — **"צוערים לשירות המדינה"**.

## מה עתידים באמת מפעילה

- **עתידים בצה"ל** — ובתוכה העתודה האקדמית, מכינות קדם-אקדמיות, ו"פעמי עתידים"
- **עתידים לתעשייה ולהייטק**
- **לוחמים להייטק**
- **עתידים להתגייס**

## תנאי קבלה — מה שכן ומה שלא

עתידים **אינה מפרסמת סף ממוצע בגרות מספרי**. הקבלה היא הערכה אישית, ולארגון יש מכינה קדם-אקדמית ייעודית למועמדים שצריכים לשפר את הרקע הלימודי שלהם — מה שסותר את הרעיון של רף קשיח.

*"ממוצע 90+" ו"מימון של ₪40-60K לשנה" שהופיעו כאן אינם מפורסמים בשום מקום באתר הארגון והוסרו. כך גם השיעורים "95% / 100% / 70%" — עתידים אינה מפרסמת שיעורי סיום, השמה או שימור כלל.*

## ראו גם

- [Atidim Academic — תכנית](/he/careers/programs/atidim-academic)
- [Atidim Military — תכנית](/he/careers/programs/atidim-military)
- [ייצוג הולם — דף הסבר](/he/careers/affirmative-action)

מקורות: [עתידים](https://www.atidim.org/) · [צוערים לשירות המדינה](https://www.gov.il/he/departments/general/cadets_for_state_service) · נבדק ספטמבר 2026.`,
      en: `## An important correction to this page

The page previously described "Atidim Academic" and "Atidim Military" as tracks leading to the civil service. Neither is the name of an Atidim programme, and the premise is wrong: **Atidim's IDF tracks lead to IDF technological units, not to the civil service.** The pipeline into the civil service is a separate programme — the **Civil Service Cadets** (צוערים לשירות המדינה).

## What Atidim actually runs

- **Atidim in the IDF** — including the academic reserve, pre-academic mechinot, and Pa'amei Atidim
- **Atidim for Industry and High-Tech**
- **Combat Soldiers to High-Tech**
- **Atidim to Enlist**

## Admission — what is and is not published

Atidim **publishes no numeric matriculation threshold**. Admission is a personal assessment, and the organisation runs a pre-academic mechina specifically for candidates who need to improve their academic record — which cuts against the idea of a hard bar.

*The "90+ average" and the "~₪40-60K/year" sponsorship figure that appeared here are published nowhere on the organisation's site and were removed. So were the "95% / 100% / 70%" rates — Atidim publishes no completion, placement or retention figures at all.*

## See also

- [Atidim Academic — program](/en/careers/programs/atidim-academic)
- [Atidim Military — program](/en/careers/programs/atidim-military)
- [Affirmative action — explainer](/en/careers/affirmative-action)`,
      am: `## ለዚህ ገጽ አስፈላጊ ማስተካከያ

"Atidim Academic" እና "Atidim Military" የአቲዲም ፕሮግራሞች ስሞች አይደሉም። **የአቲዲም የ IDF መንገዶች ወደ IDF ቴክኖሎጂ ክፍሎች ይመራሉ እንጂ ወደ መንግሥት አገልግሎት አይደለም።** ወደ መንግሥት አገልግሎት የሚወስደው የተለየ ፕሮግራም ነው።

## አቲዲም በእውነት የሚያካሂደው

- **አቲዲም በ IDF**
- **አቲዲም ለኢንዱስትሪ እና ሃይ-ቴክ**
- **ተዋጊዎች ወደ ሃይ-ቴክ**

## የመግቢያ መስፈርት

አቲዲም **የቁጥር የባግሩት መስፈርት አያትምም**። መግቢያው የግል ግምገማ ነው። እዚህ የነበሩት "90+" እና "₪40-60K" እንዲሁም "95% / 100% / 70%" መጠኖች የትም አይታተሙም፤ ተወግደዋል።`,
    },
  },
  {
    slug: "entrepreneurship-funding-community",
    orderIndex: 12,
    trackSlug: "entrepreneurship",
    reviewedAt: "2026-09-02",
    question: {
      he: "יזמות לבני העדה — תוכניות ומימון",
      en: "Entrepreneurship for the community — programs and funding",
      am: "ለማህበረሰብ ስራ ፈጠራ — ፕሮግራሞችና ገንዘብ",
    },
    shortAnswer: {
      he: "קרן ההלוואות של UJIA-KIEDF לעסקים בקהילה קיימת, אך אף אחד מהגופים אינו מפרסם תקרת הלוואה — בקשו את התנאים מהקרן. הסכומים שהופיעו כאן הוסרו.",
      en: "The UJIA-KIEDF loan fund for community businesses is real, but neither body publishes a loan ceiling — ask the fund for its terms. The figures that appeared here were removed.",
      am: "የ UJIA-KIEDF ብድር ፈንድ አለ፣ ነገር ግን የብድር ጣሪያ የትም አይታተምም። ከፈንዱ ራሱ ውሉን ይጠይቁ።",
    },
    bodies: {
      he: `## אופציות מימון

**קרן ההלוואות UJIA-KIEDF** — קרן הלוואות לעסקים של בני הקהילה, בשיתוף KIEDF (קרן קורת) וזרוע ההשקעות של UJIA. הקרן קיימת ופעילה.

**מה איננו יכולים לומר לכם:** לא UJIA ולא KIEDF מפרסמים תקרת הלוואה ללווה. האתר הזה נקב בעבר ב-₪200,000 בעמוד אחד וב-₪150,000 בעמוד אחר — שני מספרים סותרים, שאף אחד מהם לא נמצא במקור של הקרן. שניהם הוסרו. **בקשו את התקרה, הריבית ותנאי הערבויות ישירות מהקרן, בכתב.**

**מסלולי משרד הכלכלה והסוכנות לעסקים קטנים ובינוניים** — קיימות תוכניות סיוע והלוואות בערבות מדינה. התנאים משתנים לפי מסלול; בדקו באתר הסוכנות.

## מה הוסר מהדף הזה

"ScaleUp Velocity — 16 שבועות + seed funding של ₪50-150K ל-3 צוותים". הארגון **קיים** — זו זרוע ההון האנושי הקשורה ל-Start-Up Nation Central, והיא מפעילה תוכניות הכשרה כמו Excellenteam ו-Cyber4s. אבל **היא גוף הכשרה, לא משקיע**: אין bootcamp של 16 שבועות, אין seed funding ואין "צוותים זוכים". גם "מענק עסק קטן עד ₪40K" לא נמצא במקור ראשוני.

## ראו גם

- [UJIA-KIEDF — זכות](/he/rights/ujia-kiedf-business-loans)
- [Entrepreneurship — סקירה](/he/careers/entrepreneurship)

מקורות: [UJIA — תמיכה בעסקים בישראל](https://ujia.org/connect/supporting-israel/business/) · [הסוכנות לעסקים קטנים ובינוניים](https://www.gov.il/he/departments/small_and_medium_business_agency) · נבדק ספטמבר 2026.`,
      en: `## Funding options

**The UJIA-KIEDF loan fund** — a loan fund for community-owned businesses, run with KIEDF (the Koret Israel Economic Development Funds) and UJIA's investment arm. The fund is real and operating.

**What we cannot tell you:** neither UJIA nor KIEDF publishes a borrower ceiling. This site previously stated ₪200,000 on one page and ₪150,000 on another — two contradictory numbers, neither of which appears in any fund source. Both were removed. **Ask the fund directly, in writing, for the ceiling, the interest rate and the guarantor terms.**

**Ministry of Economy and Small and Medium Business Agency tracks** — assistance programmes and state-guaranteed loans exist. Terms vary by track; check the agency's own site.

## What was removed from this page

"ScaleUp Velocity — 16 weeks + ₪50-150K seed funding for 3 top teams". The organisation **exists** — it is the human-capital arm affiliated with Start-Up Nation Central, running training programmes such as Excellenteam and Cyber4s. But **it is a training body, not an investor**: there is no 16-week bootcamp, no seed funding and no "winning teams". The "small business grant up to ₪40K" was also not found in any primary source.

## See also

- [UJIA-KIEDF — right](/en/rights/ujia-kiedf-business-loans)
- [Entrepreneurship — overview](/en/careers/entrepreneurship)`,
      am: `## የገንዘብ አማራጮች

**የ UJIA-KIEDF ብድር ፈንድ** — ለማህበረሰቡ ንግዶች እውነተኛ እና ንቁ ፈንድ ነው።

**ልንነግርዎት የማንችለው:** UJIA ወይም KIEDF የብድር ጣሪያ አያትሙም። ይህ ገጽ ቀደም ሲል ₪200,000 እና ₪150,000 — ሁለት የሚጋጩ ቁጥሮች — ገልጾ ነበር። ሁለቱም ተወግደዋል። **ውሉን በጽሑፍ ከፈንዱ ራሱ ይጠይቁ።**

## ከዚህ ገጽ የተወገደው

"ScaleUp Velocity — 16 ሳምንት + seed funding"። ድርጅቱ **አለ**፣ ነገር ግን **የስልጠና አካል ነው እንጂ ባለሀብት አይደለም**።`,
    },
  },
  {
    slug: "subsidized-trades-electrician-plumber",
    orderIndex: 13,
    trackSlug: "trades",
    reviewedAt: "2026-09-02",
    question: {
      he: "מקצועות יד מסובסדים — חשמל/אינסטלציה",
      en: "Subsidized trades — electrical/plumbing",
      am: "የተደገፉ ሙያዎች — ኤሌክትሪክ/ቧንቧ",
    },
    shortAnswer: {
      he: "מסובסד בשיעור 90% או 80% דרך תוכנית השוברים, לפי רמת הביקוש למקצוע. רישום דרך לשכת תעסוקה אזורית.",
      en: "Subsidised at 90% or 80% through the voucher scheme, depending on how in-demand the trade is. Register through your regional Employment Service office.",
      am: "በቫውቸር ፕሮግራም 90% ወይም 80% የተደገፈ።",
    },
    bodies: {
      he: `## מה כלול

- **סבסוד שכר הלימוד** — 90% למקצוע בביקוש גבוה, 80% לביקוש בינוני, בתקרה של כ-6,000-12,000 ₪. יש תמיד השתתפות עצמית
- אישור רשמי של משרד העבודה בסיום
- ייתכן שתהיו זכאים גם ל**מלגת הכשרה (BOOST)** לעד 6 חודשים — נדרש קריטריון נוסף (למשל מגורים באשכול 1-4 או באזור עדיפות). הסכום אינו מפורסם במקור ראשוני

*הדף קבע בעבר "שכר לימוד מלא (₪0 לסטודנט)" ו"מענק קיום ₪2,500-3,500 לחודש". שניהם היו שגויים.*

## תקופת ההכשרה

- חשמלאי: 6-9 חודשים
- אינסטלטור: 4-6 חודשים

## איך פונים

הרשמה דרך לשכת תעסוקה אזורית — מצריך תעודת זהות + ראיון התאמה + מבחן ידיים בסיסי.

## ראו גם

- [Trades — סקירה](/he/careers/trades)

מקור: [מינהל הכשרות מקצועיות, משרד העבודה](https://www.gov.il/he/departments/units/manpower-training-bureau) · נבדק ספטמבר 2026.`,
      en: `## What is covered

- **Tuition subsidy** — 90% for a high-demand trade, 80% for medium-demand, capped at roughly ₪6,000-12,000. There is always a co-payment
- Official Ministry of Labour certification at completion
- You may also qualify for the **BOOST training stipend** for up to 6 months — this requires a further criterion (for example residence in socioeconomic clusters 1-4 or a priority area). Its amount is not published by a primary source

*This page previously said "full tuition (₪0 to the student)" and a "living grant of ₪2,500-3,500/month". Both were wrong.*

## Training duration

- Electrician: 6-9 months
- Plumber: 4-6 months

## How to apply

Register through your regional Employment Service office — requires national ID + fit interview + basic hands-on test.

## See also

- [Trades — overview](/en/careers/trades)`,
      am: `## የሚካተት

- **የትምህርት ክፍያ ድጋፍ** — ለከፍተኛ ፍላጎት ሙያ 90%፣ ለመካከለኛ 80%፣ ጣሪያው ወደ 6,000-12,000 ₪። ሁልጊዜ የራስ መዋጮ አለ
- በመጨረሻ የሥራ ሚኒስቴር ኦፊሴላዊ ማረጋገጫ
- ለ**BOOST የስልጠና ስኮላርሺፕ** እስከ 6 ወር ብቁ ሊሆኑ ይችላሉ — ተጨማሪ መስፈርት ይጠይቃል። መጠኑ በዋና ምንጭ አይታተምም`,
    },
  },
  {
    slug: "single-mothers-employment-community",
    orderIndex: 14,
    reviewedAt: "2026-09-02",
    question: {
      he: "תעסוקה לאמהות חד-הוריות מהקהילה",
      en: "Employment for single mothers in the community",
      am: "ለማህበረሰቡ ብቸኛ እናቶች ቅጥር",
    },
    shortAnswer: {
      he: "הזכויות הרלוונטיות קיימות — אך הן נקבעות לפי הכנסה והרכב משפחה, לא לפי מוצא. הסבסוד לצהרון ולמעון הוא המשמעותי ביותר, וכדאי לבדוק דרגה מדי שנה.",
      en: "The relevant benefits exist — but they are set by income and family composition, not by origin. The daycare subsidy is the most significant, and it is worth checking your grade each year.",
      am: "ጠቃሚዎቹ መብቶች አሉ — ነገር ግን በገቢ እና በቤተሰብ ስብጥር ይወሰናሉ እንጂ በተወላጅነት አይደለም።",
    },
    bodies: {
      he: `## הזכויות הזמינות — ואיך הן באמת נקבעות

**סבסוד מעון יום וצהרון** — הזכות המשמעותית ביותר כאן. הדרגה נקבעת לפי **הכנסה לנפש ולפי היקף העבודה או הלימודים של ההורה** (לפחות 32 שעות שבועיות), בסולם של 15 דרגות. להורה עצמאי ההכנסה מחושבת לפי 50% מהברוטו חלקי מספר הנפשות ועוד אחד — חישוב שמיטיב עם משפחות חד-הוריות.

**חשוב:** אין בסבסוד הזה **שום קריטריון של מוצא**. דף זה קבע בעבר "סבסוד צהרון עד 80% לבני קהילה", כאילו מדובר בזכות עדתית. זו אינה זכות עדתית אלא זכות שנקבעת לפי הכנסה — ולכן כדאי לבדוק את הדרגה שלכם כל שנה, גם אם בשנה שעברה לא הייתם זכאים.

**סל קליטה להורה עצמאי** — סכום הסל להורה עצמאי גבוה יותר (35,071 ₪ לעומת 21,694 ₪ ליחיד). זה **תעריף גבוה יותר, לא מענק נפרד**.

**קצבת ילדים** — נקבעת לפי מספר הילדים בלבד. **אין בה תוספת להורה עצמאי.**

**הבטחת הכנסה ומענק לימודים** — למי שזכאי: תעריפי הבטחת הכנסה גבוהים יותר להורה עצמאי, ומענק לימודים שנתי לכל ילד באוגוסט.

## מה הוסר מהדף הזה

- "תקנת חופשת לידה ארוכה — 28 שבועות (שבועיים יותר מסטנדרט)". **אין דבר כזה.** חופשת הלידה היא 26 שבועות (15 בתשלום מביטוח לאומי), ואין וריאנט של 28 שבועות, לא לחד-הוריות ולא לבני הקהילה.
- "תכנית JDC-Ashalim Strong Families" ומרכזיה בנתניה, רחובות, באר-שבע וחיפה. תוכנית בשם הזה אינה מופיעה אצל הג'וינט. עבודתו עם משפחות יוצאות אתיופיה מתנהלת בתוכנית **PACT (פאקט)**, שעוברת ל"התחלה טובה".

## ראו גם

- [Daycare subsidy — זכות](/he/rights/daycare-subsidy)
- [Family counseling — זכות](/he/rights/family-counseling)
- [JDC-Ashalim — פרופיל ארגון](/he/orgs/jdc-ashalim)

מקורות: [משרד העלייה והקליטה — סל קליטה](https://www.gov.il/he/pages/absorption_basket) · [ביטוח לאומי — קצבת ילדים](https://www.btl.gov.il/benefits/children/Pages/default.aspx) · [ביטוח לאומי — דמי לידה](https://www.btl.gov.il/benefits/maternity/Pages/default.aspx) · נבדק ספטמבר 2026.`,
      en: `## Available benefits — and how they are actually set

**Daycare and after-school subsidy** — the most significant benefit here. The grade is set by **per-capita family income and by the parent's working or study hours** (at least 32 a week), on a 15-grade scale. For a single parent, income is calculated as 50% of gross divided by the number of family members plus one — a calculation that favours single-parent families.

**Important:** this subsidy has **no origin criterion of any kind**. This page previously said "daycare subsidy — up to 80% of cost for community members", framing it as an ethnic entitlement. It is not; it is income-based — which is why it is worth rechecking your grade every year, even if you did not qualify last year.

**Absorption basket for a single parent** — the single-parent rate is higher (₪35,071 against ₪21,694 for a single person). That is a **higher rate, not a separate grant**.

**Child allowance** — set solely by the number of children. **It carries no single-parent supplement.**

**Income support and the study grant** — for those eligible: higher income-support rates for a single parent, and an annual study grant per child each August.

## What was removed from this page

- "Extended parental leave — 28 weeks (2 weeks longer than standard)". **No such thing exists.** Statutory leave is 26 weeks (15 paid by National Insurance), and there is no 28-week variant, for single parents or for community members.
- "JDC-Ashalim Strong Families" and its centres in Netanya, Rehovot, Beersheba and Haifa. No programme by that name appears at JDC. Its work with Ethiopian-Israeli families runs through **PACT**, which is transitioning to "A Good Start".

## See also

- [Daycare subsidy — right](/en/rights/daycare-subsidy)
- [Family counseling — right](/en/rights/family-counseling)
- [JDC-Ashalim — organization profile](/en/orgs/jdc-ashalim)`,
      am: `## ያሉ መብቶች — እና እንዴት እንደሚወሰኑ

**የመዋዕለ ሕፃናት ድጋፍ** — እዚህ ትልቁ መብት። ደረጃው በ**የነፍስ ወከፍ የቤተሰብ ገቢ እና በወላጁ የሥራ ሰዓት** (በሳምንት ቢያንስ 32) ይወሰናል። **ምንም የተወላጅነት መስፈርት የለውም።** ይህ ገጽ ቀደም ሲል "ለማህበረሰብ አባላት እስከ 80%" ብሎ ነበር — ስህተት ነው። በገቢ ላይ የተመሠረተ ስለሆነ በየዓመቱ ደረጃዎን ይመርምሩ።

**የመግቢያ ቅርጫት ለብቸኛ ወላጅ** — 35,071 ₪ (ከ21,694 ₪ ይልቅ)። ይህ **ከፍ ያለ ተመን ነው እንጂ የተለየ ስጦታ አይደለም**።

**የልጆች አበል** — በልጆች ብዛት ብቻ ይወሰናል። **የብቸኛ ወላጅ ተጨማሪ የለውም።**

## የተወገደው

- "28 ሳምንት የወሊድ ፈቃድ"። **እንዲህ ያለ ነገር የለም** — ሕጋዊው 26 ሳምንት ነው (15 የሚከፈልበት)።
- "JDC-Ashalim Strong Families" — በዚህ ስም ፕሮግራም የለም። የጆይንት ሥራ በ **PACT** በኩል ነው።`,
    },
  },
  // TED-158: FAQ "matriculation-and-vocational-training-parallel"
  // deleted. It described an 18-24 month "Hila" track combining bagrut
  // completion with a tech bootcamp and paying a ₪3,500/month living
  // grant, with 65% and 40% outcome rates. No such programme exists.
  // Three real bodies are named Hila/היל"ה — a Ministry of Education
  // dropout-education programme, a parent-advocacy NGO, and a dissolved
  // עמותה — and none of them matches any part of the description.
  {
    slug: "military-tracks-with-career-employment",
    orderIndex: 15,
    trackSlug: "public-sector",
    reviewedAt: "2026-09-02",
    question: {
      he: "תוכניות צבאיות עם מסלול תעסוקתי",
      en: "Military tracks with a career path",
      am: "የሙያ መንገድ ያለው ወታደራዊ ፕሮግራሞች",
    },
    shortAnswer: {
      he: 'אחרי! מפעילה מכינות קדם-צבאיות, ועתידים מפעילה מסלולים בצה"ט ובתעשייה. אך זה אינו מסלול רציף מובטח לשירות המדינה, כפי שנכתב כאן בעבר.',
      en: "Aharai! runs pre-military mechinot and Atidim runs IDF and industry tracks. But this is not a guaranteed continuous pipeline into the civil service, as this page previously said.",
      am: "አኻራይ! ቅድመ-ወታደራዊ ማሰልጠኛዎችን ያካሂዳል፤ አቲዲም በ IDF እና በኢንዱስትሪ መንገዶችን ያካሂዳል። ነገር ግን ወደ መንግሥት አገልግሎት የተረጋገጠ ተከታታይ መንገድ አይደለም።",
    },
    bodies: {
      he: `## מה קיים באמת

**אחרי! (Aharai)** — עמותה שהוקמה ב-1997 ומפעילה "מכינות אור", חמש מכינות עירוניות של חצי שנה (יבנה, ירושלים, שלומי, לוד, דימונה), כ-250 משתתפים בשנה.

**חשוב לדעת:** הארגון **אינו מפרסם מסלול ייעודי ליוצאי אתיופיה**. גורמים שלישיים מזכירים מסלול כזה, אך הארגון עצמו לא — ולכן איננו מפרסמים זאת כזכות. פנו אליו ישירות ובררו.

**עתידים** — מפעילה את "עתידים בצה"ל" (ובתוכה העתודה האקדמית ומכינות קדם-אקדמיות), "עתידים לתעשייה ולהייטק", "לוחמים להייטק" ו"עתידים להתגייס".

## התיקון החשוב

הדף הציג בעבר שרשרת של שלושה שלבים — מכינה, "עתידים צה"לי", ואז "עתידים אקדמי" — שמובילה לתפקיד ציבורי בכיר. **זו אינה שרשרת קיימת.** מסלולי עתידים בצה"ל מובילים ליחידות טכנולוגיות בצה"ל; הצינור לשירות המדינה הוא תוכנית נפרדת, **"צוערים לשירות המדינה"**. גם הקביעה ש"רוב הבכירים בשירות הציבורי הישראלי עברו מסלול דומה" לא נמצאה בשום מקור והוסרה.

## ראו גם

- [Atidim Academic — תכנית](/he/careers/programs/atidim-academic)
- [Atidim Military — תכנית](/he/careers/programs/atidim-military)`,
      en: `## What actually exists

**Aharai!** — a nonprofit founded in 1997 running "Mechinot Or", five half-year urban pre-military academies (Yavne, Jerusalem, Shlomi, Lod, Dimona), with around 250 participants a year.

**Worth knowing:** the organisation **publishes no Ethiopian-Israeli-specific track**. Third parties mention one; the operator itself does not — so it is not stated here as an entitlement. Approach them directly and ask.

**Atidim** — runs "Atidim in the IDF" (including the academic reserve and pre-academic mechinot), "Atidim for Industry and High-Tech", "Combat Soldiers to High-Tech" and "Atidim to Enlist".

## The correction that matters

This page previously presented a three-stage chain — mechina, "Atidim Military", then "Atidim Academic" — leading to a senior public-sector role. **That chain does not exist.** Atidim's IDF tracks lead to IDF technological units; the pipeline into the civil service is a separate programme, the **Civil Service Cadets**. The claim that "most senior figures in Israeli civil service went through a similar pipeline" was found in no source and was removed.

## See also

- [Atidim Academic — program](/en/careers/programs/atidim-academic)
- [Atidim Military — program](/en/careers/programs/atidim-military)`,
      am: `## በእውነት ያለው

**አኻራይ!** — በ1997 የተቋቋመ ማህበር፤ አምስት የግማሽ ዓመት የከተማ ቅድመ-ወታደራዊ ማሰልጠኛዎችን ያካሂዳል። ድርጅቱ **ለኢትዮጵያ ተወላጆች የተለየ መንገድ አያትምም**።

**አቲዲም** — በ IDF እና በኢንዱስትሪ መንገዶችን ያካሂዳል።

## አስፈላጊው ማስተካከያ

ይህ ገጽ ቀደም ሲል ወደ ከፍተኛ የመንግሥት ሚና የሚያደርስ የሦስት ደረጃ ሰንሰለት አቅርቦ ነበር። **ይህ ሰንሰለት የለም።** የአቲዲም የ IDF መንገዶች ወደ IDF ቴክኖሎጂ ክፍሎች ይመራሉ።`,
    },
  },
  {
    slug: "apprenticeship-which-sectors",
    orderIndex: 16,
    trackSlug: "trades",
    reviewedAt: "2026-09-02",
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
    orderIndex: 17,
    reviewedAt: "2026-09-02",
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
      he: `## ההקשר — מה שכדאי לדעת מראש

סקר מעסיקים של משרד הכלכלה מצא ש**רק 5.6% מהמעסיקים הביעו נכונות להעסיק יוצאי אתיופיה** — השיעור הנמוך ביותר מבין הקבוצות שנבדקו. זה לא נאמר כדי לייאש, אלא כדי למקד: החסם מרוכז ב**שלב הסינון**, ולכן פנייה דרך אדם — מנטור, בוגר, ממליץ — יעילה יותר מהגשה עיוורת.

## אם אתם חושדים בהפליה

1. תיעדו: שמרו את ההגשה, את ההודעה, את ה-CV ששלחתם
2. בקשו פירוט של הסיבה לדחייה (זכאי בחוק)
3. אם הסיבה לא משכנעת או נראית מפלה — פנו ל-טבקה לייעוץ משפטי חינמי
4. במקרים חמורים — תלונה לנציבות שוויון הזדמנויות בעבודה

## ראו גם

- [טבקה — פרופיל ארגון](/he/orgs/tebeka)
- [Tebeka legal aid — זכות](/he/rights/tebeka-legal-aid)`,
      en: `## The context — worth knowing in advance

A Ministry of Economy employer survey found that **only 5.6% of employers expressed willingness to employ Ethiopian-Israelis** — the lowest of the groups surveyed. That is not said to discourage but to focus: the barrier is concentrated at the **screening stage**, which is why an approach through a person — a mentor, an alum, a referrer — works better than a blind application.

## If you suspect discrimination

1. Document: keep the application, the message, the CV you sent
2. Ask for a detailed reason for rejection (legal right)
3. If the reason is unconvincing or appears discriminatory — contact Tebeka for free legal counsel
4. In severe cases — file a complaint with the Equal Employment Opportunities Commission

## See also

- [Tebeka — organization profile](/en/orgs/tebeka)
- [Tebeka legal aid — right](/en/rights/tebeka-legal-aid)`,
      am: `## አውድ

የኢኮኖሚ ሚኒስቴር ጥናት **5.6% አሠሪዎች ብቻ** የኢትዮጵያ ተወላጆችን ለመቅጠር ፈቃደኛ መሆናቸውን አግኝቷል። እንቅፋቱ በ**የማጣሪያ ደረጃ** ላይ ያተኮረ ነው፤ ስለዚህ በሰው በኩል መቅረብ ይሻላል።

## መድልዎ ከጠረጠሩ

1. ይመዝግቡ
2. የተብራራ ምክንያት ይጠይቁ
3. ጤቤካን ያነጋግሩ`,
    },
  },
  {
    slug: "tax-relief-new-immigrant-impact-salary",
    orderIndex: 18,
    trackSlug: "finance",
    reviewedAt: "2026-09-02",
    question: {
      he: "מס הכנסה + פטור לעולה חדש — איך משפיע על משכורת",
      en: "Income tax + new immigrant exemption — impact on salary",
      am: "ገቢ ግብር + የስደተኛ ነፃ — በደመወዝ ላይ ያለው ተጽእኖ",
    },
    shortAnswer: {
      he: "עולה חדש מקבל נקודות זיכוי נוספות לפי לוח קבוע לאורך 54 חודשים. ההשפעה על הנטו אמיתית אך צנועה — כמה מאות שקלים בחודש, לא אלפים.",
      en: "A new oleh receives extra tax credit points on a fixed schedule over 54 months. The effect on net pay is real but modest — a few hundred shekels a month, not thousands.",
      am: "አዲስ ስደተኛ በ54 ወራት ውስጥ በተወሰነ ሰሌዳ ተጨማሪ የክሬዲት ነጥቦች ያገኛል። በተጣራ ደመወዝ ላይ ያለው ተጽዕኖ እውነተኛ ግን መጠነኛ ነው።",
    },
    bodies: {
      he: `## נקודות זיכוי — הלוח המלא

לעולה מ-1.1.2022 ואילך, לפי סעיף 35 לפקודת מס הכנסה:

| חודשים מהעלייה | נקודות זיכוי |
| --- | --- |
| 1-12 | 1 |
| 13-30 | 4.5 |
| 31-42 | 2 |
| 43-54 | 1 |

שווי נקודת זיכוי ב-2026: **242 ₪ לחודש** (2,904 ₪ לשנה). סך ההטבה לאורך 54 החודשים: **כ-24,700 ₪**.

*הדף קבע בעבר "נקודה אחת + 0.5 נקודה נוספת ל-3 שנים ראשונות". לוח כזה אינו קיים.*

## משמעות מעשית — במספרים

בשכר של 10,000 ₪ ברוטו (2026):

- אזרח ותיק — נטו של כ-**8,816 ₪**
- עולה בשנה הראשונה — כ-**9,058 ₪** (הפרש של 242 ₪)
- עולה בחודשים 13-30 — כ-**9,392 ₪** (הפרש של 575 ₪, כי מס ההכנסה מתאפס)

**זו התקרה.** אזרח ותיק בשכר כזה משלם 575 ₪ מס הכנסה בסך הכול, ולכן אי-אפשר לחסוך יותר מזה. הדף קבע בעבר "נטו ~9,200 ₪ לעומת ~7,800 ₪" ו"גבוה ב-15-25%" — פער של 1,400 ₪ אינו אפשרי אריתמטית.

## פטור ממס על הכנסה מחו"ל

הפטור ל-10 שנים על הכנסה מחו"ל **עדיין חל** על מי שעולה היום. תיקון 272 (2024) ביטל את הפטור מ**דיווח** החל משנת המס 2026 — אבל הפטור ממס עצמו נשאר.

## דירה ראשונה — תיקון

לעולים **אין פטור ממס שבח** על דירה ראשונה. ההטבה האמיתית היא **מס רכישה מופחת**, בחלון של שנה לפני העלייה עד תום השנה השביעית אחריה, לדירה יחידה למגורי העולה. המדרגות משתנות לפי מועד הכניסה לתקנה — בדקו מול רשות המסים לפני רכישה.

## איך מממשים

נקודות הזיכוי ניתנות דרך טופס **101** אצל המעסיק. לתיקון רטרואקטיבי — **טופס 135** (דוח שנתי מקוצר), עד שש שנים אחורה. *(טופס 116 שהופיע כאן הוא בקשה לתיאום מס — מסמך אחר לגמרי.)*

## ראו גם

- [Immigrant tax relief — זכות](/he/rights/immigrant-tax-relief)
- [Klita basket — זכות](/he/rights/klita-basket)

מקורות: [ס' 35 לפקודת מס הכנסה](https://www.nevo.co.il/law_html/law01/255_001.htm) · [רשות המסים — הטבות לעולים](https://www.gov.il/he/departments/israel_tax_authority) · נבדק ספטמבר 2026.`,
      en: `## Credit points — the full schedule

For aliyah from 1.1.2022, under s.35 of the Income Tax Ordinance:

| Months since aliyah | Credit points |
| --- | --- |
| 1-12 | 1 |
| 13-30 | 4.5 |
| 31-42 | 2 |
| 43-54 | 1 |

The value of a credit point in 2026 is **₪242 per month** (₪2,904 a year). Total benefit across the 54 months: **about ₪24,700**.

*This page previously said "1 point + 0.5 extra for the first 3 years". No such schedule exists.*

## What it actually means, in numbers

On ₪10,000 gross (2026):

- an established resident nets about **₪8,816**
- an oleh in year one, about **₪9,058** (a ₪242 difference)
- an oleh in months 13-30, about **₪9,392** (a ₪575 difference, because income tax falls to zero)

**That is the ceiling.** An established resident on that salary pays ₪575 in income tax in total, so no larger saving is arithmetically possible. This page previously claimed "~₪9,200 net vs ~₪7,800" and "15-25% higher" — a ₪1,400 gap cannot happen.

## Foreign-income exemption

The 10-year exemption on foreign income **still applies** to someone making aliyah today. Amendment 272 (2024) removed only the exemption from **reporting**, from tax year 2026 — the tax exemption itself remains.

## First home — a correction

Olim have **no capital-gains (מס שבח) exemption** on a first home. The real benefit is a **reduced purchase tax (מס רכישה)**, in a window running from one year before aliyah to the end of the seventh year after, for a single apartment for the oleh's own residence. The brackets differ by when you entered the scheme — check with the Tax Authority before buying.

## How to claim

Credit points are claimed through form **101** with your employer. For a retroactive correction, file **form 135** (short annual return), up to six years back. *(Form 116, which this page named, is a tax-coordination request — a different document entirely.)*

## See also

- [Immigrant tax relief — right](/en/rights/immigrant-tax-relief)
- [Klita basket — right](/en/rights/klita-basket)`,
      am: `## የክሬዲት ነጥቦች — ሙሉ ሰሌዳ

ከ1.1.2022 ጀምሮ ለመጣ ስደተኛ: ወራት 1-12 → 1 ነጥብ፤ 13-30 → 4.5፤ 31-42 → 2፤ 43-54 → 1። የነጥብ ዋጋ በ2026: **242 ₪ በወር**። በ54 ወራት ጠቅላላ ጥቅም: **ወደ 24,700 ₪**።

## በተግባር ምን ማለት ነው

በ10,000 ₪ ጠቅላላ ደመወዝ: የቆየ ነዋሪ ወደ **8,816 ₪**፤ በመጀመሪያ ዓመት ስደተኛ ወደ **9,058 ₪**፤ በወራት 13-30 ወደ **9,392 ₪**። **ይህ ጣሪያው ነው።** ቀደም ሲል የተጻፈው "15-25% ከፍ ያለ" በሂሳብ የማይቻል ነው።

## የመጀመሪያ ቤት — ማስተካከያ

ስደተኞች በመጀመሪያ ቤት ላይ **የካፒታል ትርፍ ግብር ነፃነት የላቸውም**። እውነተኛው ጥቅም **የተቀነሰ የግዢ ግብር** ነው።

## እንዴት ማግኘት

በ**ቅጽ 101** በአሠሪው በኩል። ወደ ኋላ ለማስተካከል **ቅጽ 135** — እስከ ስድስት ዓመት።`,
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

export function faqBody(entry: CareerFaqEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
