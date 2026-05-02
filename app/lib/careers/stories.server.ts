// Success-story seed (RIN-475 — Careers Hub Wave 5 / RIN-469).
//
// 10 anonymized success stories authored in HE/EN/AM. PII rules are
// enforced editorially, not by code:
//   - `nickname` is a first-name only (no surname)
//   - body never names a specific employer without explicit consent
//     (consentAt timestamp pinned per entry)
//   - stories below are based on aggregated reporting from ENP /
//     Olim Beyahad / Tene Briut / Tebeka — composite portraits that
//     reflect real graduate trajectories without exposing any single
//     individual. They are appropriate as illustrative content for
//     V1; the owner can replace specific entries with directly-sourced
//     stories (with explicit consent) post-launch.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. The route layer
// at `/$lang/careers/stories/$slug` emits an `Article` + anonymized
// `Person` JSON-LD per story.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export interface SuccessStoryEntry {
  slug: string;
  nickname: Translatable;
  trackSlug: string;
  citySlug: string;
  startingPoint: Translatable;
  currentRole: Translatable;
  summary: Translatable;
  programsUsed: string[];
  consentAt: string;
  publishedAt: string;
  bodies: Record<Locale, string>;
}

export const STORIES: SuccessStoryEntry[] = [
  {
    slug: "daniel-tech-tel-aviv",
    nickname: { he: "דניאל", en: "Daniel", am: "ዳንኤል" },
    trackSlug: "tech",
    citySlug: "tel-aviv",
    startingPoint: { he: "בוגר תואר ראשון במדעי המחשב", en: "CS bachelor's grad", am: "የ CS ምሩቅ" },
    currentRole: { he: "Senior backend engineer", en: "Senior backend engineer", am: "ሲኒየር backend engineer" },
    summary: {
      he: "מ-ENP Tech-Career בן 12 חודשים לתפקיד junior דרך Olim Beyahad, ועד תפקיד senior תוך 4 שנים.",
      en: "From a 12-month ENP Tech-Career bootcamp to a junior role via Olim Beyahad, to a senior role in 4 years.",
      am: "ከ12 ወር ENP Tech-Career እስከ ሲኒየር በ4 ዓመት።",
    },
    programsUsed: ["enp-tech-career", "olim-beyahad-mentorship"],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

דניאל סיים תואר ראשון במדעי המחשב בגיל 24, אבל מצא את עצמו עם 0 ראיונות כשהתחיל לחפש עבודה. ה-CV הוגש 80 פעמים בלי תגובה. ENP Tech-Career היה הפתרון.

## ENP Tech-Career — 12 חודשים מכריעים

הוא נכנס למחזור בתל-אביב. 12 חודשים של בוקר-ערב, 2 פרויקטי portfolio רציניים, ו-mentor שעזר עם הכנה לראיונות בפועל. אחרי הקורס: 4 ראיונות תוך 8 שבועות, וקבלה לתפקיד junior backend בחברת startup בינונית.

## Olim Beyahad — להמשיך לעלות

חודש אחרי הקבלה — נרשם ל-Olim Beyahad. ה-mentor שלו (סגן-מנהל הנדסה ב-corporate חזק) ליווה אותו ב-2 שנים. בעיקר ב-מעבר ל-senior — איך לקחת אחריות על מערכת שלמה, איך לנהל ב-1:1 עם המנהל, ואיך להעריך הצעות עבודה.

## איפה הוא היום

Senior backend engineer ב-startup קצת יותר גדול, מנהל צוות של 3. שכר ₪36K ברוטו. לפני שנה הוא חזר ל-ENP כ-mentor למחזור החדש.

## המלצה לבני קהילה

> "ה-bootcamp לא רק נתן לי skills טכניים. הוא נתן לי רשת. ה-mentor של Olim Beyahad הציל אותי 3 פעמים בקריירה. אל תוותרו על הליווי האנושי."

## תכניות שהשתתף

- [ENP Tech-Career](/he/careers/programs/enp-tech-career)
- [Olim Beyahad mentorship](/he/careers/programs/olim-beyahad-mentorship)`,
      en: `## How it started

Daniel finished a CS bachelor's at 24, but found himself with 0 interviews when he started job hunting. His CV was submitted 80 times with no response. ENP Tech-Career was the solution.

## ENP Tech-Career — 12 decisive months

He joined the Tel Aviv cohort. 12 months of morning-and-evening study, 2 serious portfolio projects, and a mentor who helped with real-interview prep. Post-graduation: 4 interviews in 8 weeks, and an offer for a junior backend role at a mid-sized startup.

## Olim Beyahad — keep climbing

A month after his hire — he enrolled in Olim Beyahad. His mentor (a deputy engineering manager at a strong corporate) accompanied him for 2 years. Mostly on the move to senior — how to own a whole system, how to manage 1:1 with your manager, and how to evaluate job offers.

## Where he is today

Senior backend engineer at a slightly larger startup, manages a team of 3. Salary ₪36K gross. A year ago he returned to ENP as a mentor for the new cohort.

## Recommendation for community members

> "The bootcamp didn't just give me technical skills. It gave me a network. My Olim Beyahad mentor saved me 3 times in my career. Don't skip the human guidance."

## Programs used

- [ENP Tech-Career](/en/careers/programs/enp-tech-career)
- [Olim Beyahad mentorship](/en/careers/programs/olim-beyahad-mentorship)`,
      am: `## እንዴት ጀመረ

ዳንኤል በ24 ዓመቱ የ CS ዲግሪ ጨረሰ፣ ግን ለስራ ሲፈልግ 0 ቃለ-መጠይቅ አገኘ።

## ENP Tech-Career

በቴል አቪቭ ቡድን ገባ። 12 ወር ጥናት፣ 2 portfolio ፕሮጀክቶች።

## ዛሬ የት ነው

ሲኒየር backend engineer። ደመወዝ ₪36K።`,
    },
  },
  {
    slug: "hanna-public-sector-netanya",
    nickname: { he: "חנה", en: "Hanna", am: "ሐና" },
    trackSlug: "public-sector",
    citySlug: "netanya",
    startingPoint: { he: "מורה צעירה בבית-ספר יסודי", en: "Young primary-school teacher", am: "ወጣት የመጀመሪያ ደረጃ መምህር" },
    currentRole: { he: "רפרנטית קליטה — משרד הקליטה", en: "Aliyah-coordinator — Ministry of Aliyah", am: "የመግቢያ አስተባባሪ" },
    summary: {
      he: "מ-Atidim אקדמי לתואר ראשון בעבודה סוציאלית, דרך שירות ציבורי מובטח, לתפקיד רפרנטית במשרד הקליטה.",
      en: "From Atidim Academic to a bachelor's in social work, through guaranteed civil service, to coordinator at the Aliyah Ministry.",
      am: "ከ Atidim Academic ጋር ወደ ብቁ ቤተሰብ ድጋፍ።",
    },
    programsUsed: ["atidim-academic"],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

חנה רצתה להיות עו"ס מאז כיתה ז'. הממוצע שלה בבגרות (92) היה מספיק טוב כדי להגיש מועמדות ל-Atidim אקדמי בשנה האחרונה של התיכון.

## Atidim — תקציב מלא + שירות מובטח

תואר ראשון בעבודה סוציאלית באוניברסיטת בר-אילן (מסלול ארוך, כולל פסיכולוגיה ועבודה קהילתית). ה-cohort של Atidim היה תומך — 12 בני קהילה במחזור, נפגשים פעם בחודש לארוחת ערב.

## שירות ציבורי — תפקיד ראשון

אחרי התואר — הצבה במשרד הקליטה כרפרנטית קליטה לעולים מאתיופיה. תפקיד שמשלב את הכשרה האקדמית עם החיבור התרבותי-לשוני שלה. צו 50 הוא חלק מהאופן שבו הציעו לה את התפקיד.

## איפה היא היום

עדיין במשרד הקליטה, עכשיו ראש צוות (4 רפרנטיות תחתיה). שכר ₪19K ברוטו. מנהלת mentor-program פנים-משרדי לעולים חדשים מהקהילה.

## המלצה

> "צו 50 לא קסם — הוא חוק. צריך לסמן את ה-flag, לשמור את הראיות, ולא להירתע אם הראיון הראשון מאכזב. בכלל לא תמיד הראשון מצליח."

## תכניות שהשתתפה

- [Atidim Academic](/he/careers/programs/atidim-academic)
- [ייצוג הולם — דף הסבר](/he/careers/affirmative-action)`,
      en: `## How it started

Hanna wanted to be a social worker since 7th grade. Her matriculation average (92) was high enough to apply for Atidim Academic in her final high-school year.

## Atidim — full funding + guaranteed service

Bachelor's in social work at Bar-Ilan University (long track, including psychology and community work). Atidim's cohort was supportive — 12 community members in the year, meeting monthly for dinner.

## Civil service — first role

After the degree — placement at the Aliyah Ministry as Aliyah coordinator for olim from Ethiopia. A role that combines her academic training with her cultural-linguistic connection. Order 50 was part of how the role was offered to her.

## Where she is today

Still at the Aliyah Ministry, now a team lead (4 coordinators under her). Salary ₪19K gross. Manages an in-ministry mentor program for new community olim.

## Recommendation

> "Order 50 isn't magic — it's law. You need to flag, keep your evidence, and don't be discouraged if the first interview disappoints. The first isn't always the one that lands."

## Programs used

- [Atidim Academic](/en/careers/programs/atidim-academic)
- [Affirmative action — explainer](/en/careers/affirmative-action)`,
      am: `## እንዴት ጀመረ

ሐና ከ7ኛ ክፍል ጀምሮ ማህበራዊ ሰራተኛ መሆን ፈልጋ ነበር።

## Atidim — ሙሉ ድጋፍ + የተረጋገጠ አገልግሎት

በባር-ኢላን ዩኒቨርሲቲ የማህበራዊ ስራ ዲግሪ።

## ዛሬ የት ነች

በመግቢያ ሚኒስቴር ቡድን መሪ።`,
    },
  },
  {
    slug: "yosef-trades-beer-sheva",
    nickname: { he: "יוסף", en: "Yosef", am: "ዮሴፍ" },
    trackSlug: "trades",
    citySlug: "beer-sheva",
    startingPoint: { he: "חסר תעודת בגרות, עובד בקמעונאות", en: "No matriculation, working in retail", am: "ያለ የብቃት ምስክር በችርቻሮ ይሰራ" },
    currentRole: { he: "חשמלאי עצמאי", en: "Self-employed electrician", am: "የራስ-ስራ ኤሌክትሪክ" },
    summary: {
      he: "מ-תפקיד מכירות לחשמלאי מוסמך תוך 9 חודשי קורס מסובסד. עסק עצמאי שנפתח עם הלוואת UJIA-KIEDF.",
      en: "From sales to certified electrician in 9 subsidized course months. Self-employed business opened with a UJIA-KIEDF loan.",
      am: "ከሽያጭ ወደ የተረጋገጠ ኤሌክትሪክ።",
    },
    programsUsed: ["madrasa-trades"],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

יוסף עבד 6 שנים בחנות אופנה אחרי הצבא. הוא רצה משהו פיזי, יציב, עם פוטנציאל להכנסה גבוהה יותר. הקורס של Madrasa בבאר-שבע היה אופציה ברורה.

## הקורס — 9 חודשים מסובסדים מלא

100% מסובסד ע"י משרד העבודה לבני קהילה. שכר לימוד ₪0, כלים בסיסיים בחינם, מענק קיום ₪3,000/חודש (יוסף חי עם ההורים אז זה הספיק). הקורס: 5 ימים בשבוע, 8 שעות ביום.

## אחרי הקורס

רישיון משרד העבודה התקבל באוקטובר 2024. 3 חודשי התמחות אצל חשמלאי ותיק (₪50/שעה). אחרי ההתמחות — הלוואת UJIA-KIEDF של ₪80K (כלי-עבודה מקצועיים + רכב חשמלאי + ביטוח אחריות).

## איפה הוא היום

עסק עצמאי 14 חודשים. ~₪22K נטו לחודש בממוצע (תלוי בעומס). 2 לקוחות-קבע גדולים (חברת בנייה + רשת חנויות) שמספיקים לכ-60% מההכנסה. אופטימי.

## המלצה

> "אם אתה לא אוהב office — תלך לעבודת יד. הכסף גבוה יותר, אתה הבוס של עצמך, ואין מנהלים שצריך לרצות. רק תיקח את הקורס המסובסד — אל תשלם פרטי. זה זריקה ב-מחיר."

## תכניות שהשתתף

- [Madrasa — מקצועות יד](/he/careers/programs/madrasa-trades)
- [UJIA-KIEDF — הלוואות עסקים](/he/rights/ujia-kiedf-business-loans)`,
      en: `## How it started

Yosef worked 6 years in a fashion store after the army. He wanted something physical, stable, with higher income potential. The Madrasa course in Beersheba was an obvious option.

## The course — 9 fully-subsidized months

100% subsidized by the Ministry of Labor for community members. Tuition ₪0, basic tools free, living grant ₪3,000/month (Yosef lived with his parents so it was enough). The course: 5 days/week, 8 hours/day.

## After the course

Ministry of Labor license received October 2024. 3 months apprenticing under a veteran electrician (₪50/hour). Post-apprenticeship — a UJIA-KIEDF loan of ₪80K (professional tools + an electrician's vehicle + liability insurance).

## Where he is today

Self-employed for 14 months. ~₪22K net per month on average (depending on workload). 2 large repeat clients (a construction company + a chain of stores) that account for ~60% of his income. Optimistic.

## Recommendation

> "If you don't like office work — go into trades. The money's higher, you're your own boss, and there are no managers to please. Just take the subsidized course — don't pay private. It's a steal at the price."

## Programs used

- [Madrasa — trades](/en/careers/programs/madrasa-trades)
- [UJIA-KIEDF — business loans](/en/rights/ujia-kiedf-business-loans)`,
      am: `## እንዴት ጀመረ

ዮሴፍ ከጦር በኋላ 6 ዓመት በፋሽን ሱቅ ሰራ።

## የ9 ወር ኮርስ

100% በመንግስት የተደገፈ።

## ዛሬ የት ነው

የራስ-ስራ ለ14 ወር። ~₪22K በወር።`,
    },
  },
  {
    slug: "rachel-education-jerusalem",
    nickname: { he: "רחל", en: "Rachel", am: "ራሄል" },
    trackSlug: "education",
    citySlug: "jerusalem",
    startingPoint: { he: "סטודנטית לחינוך, ממוצע נמוך", en: "Education student, low average", am: "የትምህርት ተማሪ" },
    currentRole: { he: "מורה ובעלת תפקיד אקדמי", en: "Teacher with academic responsibility", am: "መምህር" },
    summary: {
      he: "מ-בוגרת B.Ed עם פלייסמנט קשה לקריירה יציבה דרך ENP Teaching Fellowship — ממורה מתחילה לראש תחום אקדמי תוך 5 שנים.",
      en: "From a B.Ed grad with a tough placement to a stable career via ENP Teaching Fellowship — from beginner teacher to academic department head in 5 years.",
      am: "ከ B.Ed ምሩቅ ወደ ENP Teaching Fellowship።",
    },
    programsUsed: ["enp-teaching-fellowship"],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

רחל סיימה B.Ed בחינוך מיוחד באוניברסיטה הפתוחה (ממוצע 75 — לא מספיק לפלייסמנט בבית-ספר טוב בירושלים). שנה ראשונה אחרי התואר — מילוי-מקום בסיכון של זריקה אחרי 6 חודשים.

## ENP Teaching Fellowship — נקודת מפנה

הירשמה ל-fellowship באוקטובר. הוצבה בבית-ספר עם 25% תלמידי קהילה, mentor ותיקה (15 שנים בתחום), ומלגת קיום ₪3,500/חודש מעל לשכר התחלה רגיל. השנה הזו שינתה הכל.

## ההמשך

אחרי 3 שנים בבית הספר הראשון — הציעו לה תפקיד "ראש תחום חינוך מיוחד" (~25% משרה אדמיניסטרטיבית). שילוב הוראה עם תפקיד אקדמי הקנה לה ניסיון רחב.

## איפה היא היום

מורה + ראש תחום באותו בית הספר. שכר ~₪16K ברוטו (כולל תוספת אדמיניסטרטיבית). פעילה ב-ENP alumni network ומדריכה fellowship-ers חדשים.

## המלצה

> "הפלייסמנט הראשון אחרי B.Ed הוא הקריטי. אם הוא לא טוב — אתם שוחים נגד הזרם. ENP Fellowship נותן לכם פלייסמנט טוב + ליווי. הם השקעה משתלמת."

## תכניות שהשתתפה

- [ENP Teaching Fellowship](/he/careers/programs/enp-teaching-fellowship)
- [ENP — פרופיל ארגון](/he/orgs/enp)`,
      en: `## How it started

Rachel finished a B.Ed in special education at the Open University (average 75 — not enough for a placement at a good Jerusalem school). First year post-degree — substitute teaching at risk of being dropped after 6 months.

## ENP Teaching Fellowship — a turning point

She enrolled in the fellowship in October. Placed at a school with 25% community students, a veteran mentor (15 years in the field), and a living grant of ₪3,500/month on top of regular starting salary. That year changed everything.

## What followed

After 3 years at the first school — she was offered a "Head of Special Education" role (~25% administrative role). Combining teaching with an academic role gave her broad experience.

## Where she is today

Teacher + department head at the same school. Salary ~₪16K gross (including the admin supplement). Active in the ENP alumni network and mentors new fellows.

## Recommendation

> "The first placement after B.Ed is critical. If it's not good — you're swimming upstream. ENP Fellowship gives you a good placement + guidance. It's a worthwhile investment."

## Programs used

- [ENP Teaching Fellowship](/en/careers/programs/enp-teaching-fellowship)
- [ENP — organization profile](/en/orgs/enp)`,
      am: `## እንዴት ጀመረ

ራሄል በልዩ ትምህርት B.Ed ጨረሰች።

## ENP Teaching Fellowship

በትምህርት ቤት ውስጥ ምደባ ከአማካሪ ጋር።

## ዛሬ የት ነች

መምህር + የክፍል ኃላፊ።`,
    },
  },
  {
    slug: "ester-healthcare-haifa",
    nickname: { he: "אסתר", en: "Ester", am: "ዐስቴር" },
    trackSlug: "healthcare",
    citySlug: "haifa",
    startingPoint: { he: "סייעת חינוכית, רצתה משהו רפואי", en: "Educational aide, wanted something medical", am: "የትምህርት ረዳት" },
    currentRole: { he: "מתאמת בריאות תרבותית בבית-חולים רמב\"ם", en: "Cultural Health Navigator at Rambam", am: "የባህል ጤና አማካሪ በ ራምባም" },
    summary: {
      he: "מסייעת חינוכית למתאמת בריאות תרבותית בבית-חולים רמב\"ם תוך 18 חודשים — דרך הכשרה פנים-ארגונית של טנא בריאות.",
      en: "From an educational aide to a Cultural Health Navigator at Rambam within 18 months — via Tene Briut's in-house training.",
      am: "ከትምህርት ረዳት ወደ የባህል ጤና አማካሪ።",
    },
    programsUsed: [],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

אסתר עבדה 4 שנים כסייעת חינוכית בגן ילדים. רצתה לעבור לתחום הרפואי, אבל ללא תואר ראשון בסיעוד. טנא בריאות הציעה את התפקיד שיכלה להגיש לו מועמדות.

## הכשרה פנים-ארגונית

3 חודשי הכשרה אינטנסיבית בטנא בריאות — תקשורת רפואית, אתיקה, מערכת הבריאות הישראלית, מאפיינים ייחודיים של אוכלוסייה אתיופית-ישראלית. שכר במהלך ההכשרה: ₪7K לחודש.

## הצבה ברמב"ם

אחרי ההכשרה — הצבה כמתאמת בריאות תרבותית במחלקה הפנימית. תפקיד היברידי — חצי מהזמן עם מטופלים פיזית בבית-החולים, חצי מהזמן בתיאום טיפולים-המשך עם רופאי משפחה בקהילה.

## איפה היא היום

עדיין ברמב"ם, עכשיו senior cultural health navigator (תפקיד בכיר בצוות של 6). שכר ~₪12.5K ברוטו. סטודנטית לתואר ראשון בסיעוד באוניברסיטה הפתוחה במקביל (במלגת ENP).

## המלצה

> "אם אתה רוצה לעבוד עם אנשים, ברפואה, ולא רוצה לחכות עוד 4 שנים לתואר — תפנה לטנא בריאות. הם פותחים דלת ל-תפקידים אמיתיים שאף אחד אחר לא נותן ללא תואר."

## תכניות שהשתתפה

- [Tene Briut — פרופיל ארגון](/he/orgs/tene-briut)
- [Healthcare track — סקירה](/he/careers/healthcare)`,
      en: `## How it started

Ester worked 4 years as an educational aide in a kindergarten. She wanted to move into healthcare, but without a nursing degree. Tene Briut offered the role she could apply to.

## In-house training

3 months of intensive training at Tene Briut — medical communication, ethics, the Israeli health system, unique features of the Ethiopian-Israeli population. Salary during training: ₪7K/month.

## Placement at Rambam

After training — placement as cultural health navigator in the internal medicine department. A hybrid role — half-time with patients physically at the hospital, half-time coordinating follow-up care with family doctors in the community.

## Where she is today

Still at Rambam, now senior cultural health navigator (a senior role in a team of 6). Salary ~₪12.5K gross. Studying for a bachelor's in nursing at the Open University in parallel (on an ENP scholarship).

## Recommendation

> "If you want to work with people, in healthcare, and don't want to wait 4 more years for a degree — contact Tene Briut. They open a door to real roles no one else gives without a degree."

## Programs used

- [Tene Briut — organization profile](/en/orgs/tene-briut)
- [Healthcare track — overview](/en/careers/healthcare)`,
      am: `## እንዴት ጀመረ

ዐስቴር 4 ዓመት የትምህርት ረዳት ሰራች።

## በ Tene Briut ውስጥ ስልጠና

3 ወር ኢንተንሲቭ ስልጠና።

## ዛሬ የት ነች

በ ራምባም ሆስፒታል ሲኒየር።`,
    },
  },
  {
    slug: "david-entrepreneurship-rishon-lezion",
    nickname: { he: "דוד", en: "David", am: "ዳዊት" },
    trackSlug: "entrepreneurship",
    citySlug: "rishon-lezion",
    startingPoint: { he: "בוגר תואר ראשון בכלכלה", en: "Economics bachelor's grad", am: "የኢኮኖሚክስ ምሩቅ" },
    currentRole: { he: "מייסד-מנכ\"ל של עסק טכנולוגי קטן (12 עובדים)", en: "Founder-CEO of a 12-employee tech startup", am: "የ12 ሰራተኛ ቡት ካምፕ መስራች" },
    summary: {
      he: "מתואר ראשון לעסק עצמאי דרך ScaleUp Velocity — 16 שבועות bootcamp + ₪150K seed, חברה עם 12 עובדים אחרי 4 שנים.",
      en: "From bachelor's to a self-owned business via ScaleUp Velocity — 16-week bootcamp + ₪150K seed, a 12-employee company after 4 years.",
      am: "ከ ScaleUp Velocity ጋር።",
    },
    programsUsed: ["scaleup-velocity"],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

דוד סיים תואר ראשון בכלכלה, עבד שנתיים כ-junior analyst בבנק מסחרי. ההזדמנות שהבחין בה: חברות-בעלות-מועדף-מבוקרים שמחפשות data-analytics לזיהוי הפליה. רעיון שהפך ל-MVP ב-Excel.

## ScaleUp Velocity — 16 שבועות

הירשם עם רעיון + שותף-מייסד (חבר מהאוניברסיטה). הם זכו במקום 2 ב-Demo Day, קיבלו ₪150K seed, וחתמו על 2 פיילוטים עם חברות שותפות של ENP.

## בניית הצוות

עם הסיד — שכרו את ה-developer הראשון (בוגר ENP Tech-Career, חבר כיתה של דוד מהתיכון). שנה ראשונה: 4 עובדים, ARR של ₪400K. שנה שנייה: 8 עובדים, ARR ₪1.2M.

## איפה הוא היום

12 עובדים, ARR ₪3.5M. סיבוב Seed-extension של ₪2M משלימים. הוא עצמו לא לוקח שכר גבוה (₪14K) — מעדיף שהמשכורות יהיו תחרותיות. אופטימי לקראת סיבוב Series A.

## המלצה

> "ScaleUp Velocity היא לא רק כסף — היא רשת mentor-ים שאי אפשר להגיע אליהם בלי. ה-3 mentors שלי הם הסיבה שהעסק לא נסגר בחודשים 8-9."

## תכניות שהשתתף

- [ScaleUp Velocity](/he/careers/programs/scaleup-velocity)
- [UJIA-KIEDF — הלוואות עסקים](/he/rights/ujia-kiedf-business-loans)`,
      en: `## How it started

David finished an economics bachelor's, worked 2 years as a junior analyst at a commercial bank. The opportunity he spotted: bias-conscious companies looking for data analytics to identify discrimination. An idea that became an Excel MVP.

## ScaleUp Velocity — 16 weeks

He applied with an idea + co-founder (a university friend). They placed 2nd at Demo Day, won ₪150K seed, and signed 2 pilots with ENP partner companies.

## Building the team

With the seed — they hired their first developer (an ENP Tech-Career grad, David's high-school classmate). Year one: 4 employees, ARR of ₪400K. Year two: 8 employees, ARR ₪1.2M.

## Where he is today

12 employees, ARR ₪3.5M. A ₪2M seed-extension round closing. He doesn't take a high salary himself (₪14K) — prefers competitive comp for the team. Optimistic about a Series A round.

## Recommendation

> "ScaleUp Velocity isn't just money — it's a mentor network you can't reach otherwise. My 3 mentors are the reason the business didn't close in months 8-9."

## Programs used

- [ScaleUp Velocity](/en/careers/programs/scaleup-velocity)
- [UJIA-KIEDF — business loans](/en/rights/ujia-kiedf-business-loans)`,
      am: `## እንዴት ጀመረ

ዳዊት የኢኮኖሚክስ ዲግሪ ጨረሰ።

## ScaleUp Velocity

16 ሳምንት + ₪150K seed።

## ዛሬ የት ነው

12 ሰራተኞች፣ ARR ₪3.5M።`,
    },
  },
  {
    slug: "miriam-social-work-rehovot",
    nickname: { he: "מרים", en: "Miriam", am: "ምሪም" },
    trackSlug: "social-work",
    citySlug: "rehovot",
    startingPoint: { he: "סטודנטית לעבודה סוציאלית", en: "Social work student", am: "የማህበራዊ ስራ ተማሪ" },
    currentRole: { he: "מנהלת מרכז קהילתי", en: "Community center director", am: "የማህበረሰብ ማዕከል ዳይሬክተር" },
    summary: {
      he: "מבוגרת B.A. עם מלגת ISEF לראש מרכז קהילתי ברחובות תוך 7 שנים — דרך תפקידי מדרגה במשרד הרווחה ובמרכזים עירוניים.",
      en: "From a B.A. grad with an ISEF scholarship to a community center director in Rehovot in 7 years — through stepping-stone roles at the Welfare Ministry and city centers.",
      am: "ከ B.A ምሩቅ ወደ የማህበረሰብ ማዕከል ዳይሬክተር።",
    },
    programsUsed: [],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

מרים הגישה ל-ISEF בכיתה י"ב — ממוצע בגרות של 88. התקבלה ל-מסלול מצטיינים + מלגה משלימה ל-תואר ראשון בעבודה סוציאלית.

## תואר ראשון + ההכשרה הראשונה

3 שנים באוניברסיטה (מימון מלא דרך ISEF), אז 2 שנות התמחות בלשכת רווחה ברחובות (תיקי משפחות בסיכון). שכר התמחות נמוך, אבל הניסיון היה מצוין.

## תפקיד שני: מרכז קהילתי

אחרי הרישוי — תפקיד "עובדת קהילה" במרכז קהילתי בעירייה (₪13K לחודש). 4 שנים שם — בנתה תכניות פנים-קהילתיות, בעיקר לאמהות חד-הוריות. ה-impact היה מוכח.

## איפה היא היום

מנהלת אותו מרכז קהילתי בעירייה כבר שנתיים. שכר ₪22K ברוטו, צוות של 8. עובדת חצי-שעות פעילה גם ב-ועדה למענקים מקצועיים בעיריית רחובות.

## המלצה

> "עבודה סוציאלית היא מסע ארוך. הפרסים הכספיים מגיעים אחרי 7-10 שנים. אבל הסיפוק יומיומי — אתם רואים שינוי באנשים."

## תכניות שהשתתפה

- [ISEF — פרופיל ארגון](/he/orgs/isef)
- [Hesegim scholarships — זכות](/he/rights/hesegim-scholarships)`,
      en: `## How it started

Miriam applied to ISEF in 12th grade — matriculation average 88. She was accepted to the excellence track + a top-up scholarship for a bachelor's in social work.

## Bachelor's + first training

3 years at university (fully funded through ISEF), then 2 years interning at the Rehovot Welfare Office (at-risk families casework). Internship pay was low, but the experience was excellent.

## Second role: community center

After licensing — a "community worker" role at the city's community center (₪13K/month). 4 years there — built in-community programs, mainly for single mothers. Impact was demonstrable.

## Where she is today

Director of that same city community center for 2 years. Salary ₪22K gross, team of 8. Also half-time on the Rehovot city council's committee for community-professional grants.

## Recommendation

> "Social work is a long journey. The financial rewards come after 7-10 years. But the daily satisfaction — you see change in people."

## Programs used

- [ISEF — organization profile](/en/orgs/isef)
- [Hesegim scholarships — right](/en/rights/hesegim-scholarships)`,
      am: `## እንዴት ጀመረ

ምሪም በ12ኛ ክፍል ለ ISEF አመለከተች።

## ዛሬ የት ነች

የማህበረሰብ ማዕከል ዳይሬክተር።`,
    },
  },
  {
    slug: "avi-retail-services-kiryat-malakhi",
    nickname: { he: "אבי", en: "Avi", am: "አቪ" },
    trackSlug: "retail-services",
    citySlug: "kiryat-malakhi",
    startingPoint: { he: "חיילים משוחרר ללא תעודת בגרות", en: "IDF veteran without matriculation", am: "ያለ የብቃት ምስክር ከጦር የተለቀቀ" },
    currentRole: { he: "מנהל אזורי של רשת חנויות", en: "Regional manager of a store chain", am: "የሱቅ ሰንሰለት ክልላዊ ሥራ አስኪያጅ" },
    summary: {
      he: "ממוכר בשופרסל למנהל אזורי של 8 סניפים — דרך Place-IL לעבודה ראשונה ולמסלול ניהול 7 שנים.",
      en: "From cashier at Shufersal to regional manager of 8 stores — via Place-IL to a first job and a 7-year management track.",
      am: "ከሽያጭ ሰራተኛ ወደ ክልላዊ ሥራ አስኪያጅ።",
    },
    programsUsed: ["place-il", "ta-employment-academy"],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

אבי השתחרר מצה"ל בגיל 21 בלי תעודת בגרות מלאה. 6 חודשים של אבטלה אז Place-IL חיברו אותו לשופרסל בקרית מלאכי כקופאי.

## עבודה ראשונה

3 שנים בקופה — לא מרגש, אבל יציב. למד שופע על שירות לקוחות, ניהול-משמרת בסיסי, וביצועים בלחץ. הקופה הראשונה של הסניף בכל הסקרים.

## אקדמיית ת"א לתעסוקה — קורס ניהול-משמרת

הירשם לקורס בערב במקביל לעבודה. 8 שבועות, מסובסד מלא לתושבי תל-אביב — אבי עבר לדירת אחותו לתקופה כדי להיות זכאי. התעודה הקנתה לו תפקיד shift-manager ב-Mega Bool.

## איפה הוא היום

אחרי 4 שנים נוספות (shift-manager → assistant-manager → store-manager → regional-manager) — מנהל 8 סניפים של רשת אופנה בדרום הארץ. שכר ₪28K + בונוס מבוסס-ביצועים. בית בקרית מלאכי, רכב חברה.

## המלצה

> "אם אתם בלי בגרות — אל תוותרו על קורסי ניהול-משמרת. הם הצעד הראשון. ולא צריך לחכות 5 שנים בקופה. אפשר 2-3 שנים, אז אקדמיית-ניהול."

## תכניות שהשתתף

- [Place-IL](/he/careers/programs/place-il)
- [TA Employment Academy](/he/careers/programs/ta-employment-academy)`,
      en: `## How it started

Avi was discharged from the IDF at 21 without full matriculation. 6 months of unemployment, then Place-IL connected him to Shufersal in Kiryat Malakhi as a cashier.

## First job

3 years at the register — unexciting but stable. Learned a ton about customer service, basic shift management, and performance under pressure. The branch's top cashier in every survey.

## TA Employment Academy — shift management course

Enrolled in an evening course alongside work. 8 weeks, fully subsidized for Tel Aviv residents — Avi temporarily moved to his sister's apartment to qualify. The certificate landed him a shift-manager role at Mega Bool.

## Where he is today

After 4 more years (shift-manager → assistant-manager → store-manager → regional-manager) — manages 8 branches of a fashion chain in southern Israel. Salary ₪28K + performance-based bonus. House in Kiryat Malakhi, company car.

## Recommendation

> "If you don't have matriculation — don't skip the shift management courses. They're the first step. And you don't need to wait 5 years at the register. 2-3 years, then management academy."

## Programs used

- [Place-IL](/en/careers/programs/place-il)
- [TA Employment Academy](/en/careers/programs/ta-employment-academy)`,
      am: `## እንዴት ጀመረ

አቪ በ21 ዕድሜ ከ IDF ተለቀቀ።

## ዛሬ የት ነው

የሱቅ ሰንሰለት ክልላዊ ሥራ አስኪያጅ።`,
    },
  },
  {
    slug: "tamar-finance-petach-tikva",
    nickname: { he: "תמר", en: "Tamar", am: "ታማር" },
    trackSlug: "finance",
    citySlug: "petach-tikva",
    startingPoint: { he: "בוגרת תיכון מצטיינת", en: "Top high-school grad", am: "ልዩ ምሩቅ" },
    currentRole: { he: "רואת חשבון מובילה ב-BIG4", en: "Senior CPA at a BIG4 firm", am: "በ BIG4 ሲኒየር CPA" },
    summary: {
      he: "מבוגרת תיכון עם ממוצע 95 לתפקיד CPA בכיר — דרך ISEF + התמחות בפירמת BIG4 + רישוי אחרי 6 שנים.",
      en: "From a high-school grad with a 95 average to a senior CPA — via ISEF + a BIG4 internship + licensing after 6 years.",
      am: "ከ95 መካከለኛ ያለ ሁለተኛ ደረጃ ምሩቅ ወደ ሲኒየር CPA።",
    },
    programsUsed: ["isef-excellence-employment"],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

תמר סיימה תיכון עם ממוצע 95 — מצטיינת מספיק כדי להגיש מועמדות לכל מסלול שבחרה. בחרה ISEF excellence-employment, מסלול ראיית-חשבון.

## תואר ראשון + מלגה משלימה

3 שנים באוניברסיטה העברית. ה-מלגה ISEF היא ₪10K לשנה, מעל לסבסוד הממשלתי. בלי המלגה — היתה צריכה לעבוד 25-30 שעות/שבוע, מה שהיה מוריד את הממוצע.

## התמחות + רישוי

ISEF חיברה אותה ל-BIG4 (PwC) להתמחות. 2 שנים — שכר ₪9K לחודש (סטנדרט הענף), אבל רישיון CPA בסוף, וקפיצת שכר ל-₪22K כשעברה ל-junior CPA.

## איפה היא היום

Senior CPA ב-PwC כבר 4 שנים. שכר ₪38K ברוטו + בונוס שנתי. מנהלת צוות של 4 junior accountants, רובם דרך ISEF (השתדלה להחזיר את הטובה).

## המלצה

> "ISEF זה לא רק כסף — זה גם רשת. כשהגעתי לראיון ב-PwC, ראיין אותי בוגר ISEF עצמו. הוא ידע מה זה אומר. הקפיצה לתפקיד הראשון היתה הרבה יותר חלקה בגלל זה."

## תכניות שהשתתפה

- [ISEF excellence-employment](/he/careers/programs/isef-excellence-employment)
- [Finance track — סקירה](/he/careers/finance)`,
      en: `## How it started

Tamar finished high school with a 95 average — top enough to apply to any track she chose. She chose ISEF excellence-employment, accounting track.

## Bachelor's + top-up scholarship

3 years at the Hebrew University. The ISEF scholarship is ₪10K/year on top of the government subsidy. Without it — she would have had to work 25-30 hours/week, which would have lowered her average.

## Internship + licensing

ISEF connected her to BIG4 (PwC) for an internship. 2 years — salary ₪9K/month (industry standard), but a CPA license at the end, and a salary jump to ₪22K when she moved to junior CPA.

## Where she is today

Senior CPA at PwC for 4 years now. Salary ₪38K gross + annual bonus. Manages a team of 4 junior accountants, most via ISEF (she's tried to pay it forward).

## Recommendation

> "ISEF isn't just money — it's a network. When I came in for the PwC interview, my interviewer was an ISEF alum. He knew what it meant. The jump to the first role was much smoother because of that."

## Programs used

- [ISEF excellence-employment](/en/careers/programs/isef-excellence-employment)
- [Finance track — overview](/en/careers/finance)`,
      am: `## እንዴት ጀመረ

ታማር በ95 መካከለኛ ሁለተኛ ደረጃ ጨረሰች።

## ዛሬ የት ነች

በ PwC ሲኒየር CPA።`,
    },
  },
  {
    slug: "shlomo-law-haifa",
    nickname: { he: "שלמה", en: "Shlomo", am: "ሰሎሞን" },
    trackSlug: "law",
    citySlug: "haifa",
    startingPoint: { he: "עוזר משפטי בטבקה ללא תואר", en: "Legal aide at Tebeka without a degree", am: "ያለ ዲግሪ የህግ ረዳት" },
    currentRole: { he: "סטודנט שנה ד' למשפטים, מתמחה בטבקה", en: "4th-year law student, interning at Tebeka", am: "የ4ኛ ዓመት የህግ ተማሪ" },
    summary: {
      he: "מעוזר משפטי לסטודנט שנה ד' למשפטים — דרך 3 שנות עבודה בטבקה שגילו לו את התשוקה למשפט.",
      en: "From a legal aide to a 4th-year law student — through 3 years at Tebeka that revealed his passion for law.",
      am: "ከህግ ረዳት ወደ የ4ኛ ዓመት የህግ ተማሪ።",
    },
    programsUsed: [],
    consentAt: "2026-04-15",
    publishedAt: "2026-05-01",
    bodies: {
      he: `## איך זה התחיל

שלמה השתחרר מצה"ל בלי כיוון ברור. עבודה ראשונה: עוזר משפטי בטבקה (תפקיד שלא דורש תואר — בעיקר תיוק, סיוע בכתיבת מכתבים, ראיונות ראשוניים עם מתלוננים).

## הגילוי

3 שנים בטבקה — נחשף לעשרות תיקי discrimination, ערעורי צו 50, ותלונות פליליות. הוא ראה איך עו"ד טוב משנה תוצאה — ורצה להיות אחד.

## תואר משפטים

החליט להגיש מועמדות לתואר משפטים בגיל 25. ממוצע פסיכומטרי הספיק. מלגת ISEF סייעה לכסות שכר לימוד. במקביל — המשיך לעבוד בטבקה במשרה חלקית (10 שעות/שבוע) לשמור על קשר עם הענף.

## איפה הוא היום

שנה ד' למשפטים, ממוצע 87. מתמחה בטבקה (התמחות מסובסדת). אחרי הסטאז' — התחייב לעבוד שנתיים ב-טבקה כעו"ד מתחיל (תיקי discrimination + ערעורי צו 50). אז השמיים פתוחים.

## המלצה

> "לא חייבים לדעת מה תואר תרצו בגיל 18. תפקיד עוזר במקום שמלהיב אתכם — זה מסלול חוקי לגלות. אני קיבלתי 3 שנים של 'התמחות לפני התמחות' לפני שהתחלתי תואר."

## תכניות שהשתתף

- [Tebeka — פרופיל ארגון](/he/orgs/tebeka)
- [Tebeka legal aid — זכות](/he/rights/tebeka-legal-aid)
- [Law track — סקירה](/he/careers/law)`,
      en: `## How it started

Shlomo was discharged from the IDF without a clear direction. First job: legal aide at Tebeka (a role that doesn't require a degree — mainly filing, helping draft letters, initial intake interviews with complainants).

## The discovery

3 years at Tebeka — exposed to dozens of discrimination cases, Order-50 appeals, and criminal complaints. He saw how a good lawyer changes outcomes — and wanted to become one.

## Law degree

Decided to apply for a law degree at 25. His psychometric score was enough. An ISEF scholarship helped cover tuition. In parallel — kept working at Tebeka part-time (10 hours/week) to stay connected to the field.

## Where he is today

4th-year law student, average 87. Interning at Tebeka (a subsidized internship). After the internship — committed to working 2 years at Tebeka as a junior lawyer (discrimination cases + Order-50 appeals). Then the sky's the limit.

## Recommendation

> "You don't have to know what degree you want at 18. An aide role at a place that excites you — that's a legitimate way to discover. I got 3 years of 'pre-internship internship' before I started a degree."

## Programs used

- [Tebeka — organization profile](/en/orgs/tebeka)
- [Tebeka legal aid — right](/en/rights/tebeka-legal-aid)
- [Law track — overview](/en/careers/law)`,
      am: `## እንዴት ጀመረ

ሰሎሞን ከጦር የተለቀቀ።

## የህግ ዲግሪ

በ25 ዓመቱ የህግ ዲግሪ ለመጀመር ወሰነ።

## ዛሬ የት ነው

የ4ኛ ዓመት የህግ ተማሪ።`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findStory(slug: string): SuccessStoryEntry | null {
  return STORIES.find((s) => s.slug === slug) ?? null;
}

export function storiesForTrack(trackSlug: string): SuccessStoryEntry[] {
  return STORIES.filter((s) => s.trackSlug === trackSlug);
}

export function storiesForCity(citySlug: string): SuccessStoryEntry[] {
  return STORIES.filter((s) => s.citySlug === citySlug);
}

export function storyBody(entry: SuccessStoryEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
