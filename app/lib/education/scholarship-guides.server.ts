// Scholarship application guides (TED-168).
//
// The scholarships pillar had eighteen "here is a scholarship" pages and zero
// "here is how you apply" pages. `מלגות ליוצאי אתיופיה 2026` ranks at position
// 1.8 — the one query on this site with real volume — and every competitor
// answers it with another list. Nobody publishes the part that actually costs
// people the money: which file the ספח goes in, why a request is refused in
// December, that a doctoral scholarship cannot be applied for by a student at
// all, that two government scholarships cannot be held at once.
//
// Hand-written, not templated. ADR-024 is explicit that a page earns its URL
// by carrying content that exists nowhere else on the site; these do.
//
// EVERY factual claim below was read from the granting body's own page on
// 2026-09-15 and is attributed inline per ADR-021. Where the sources disagree
// with each other — and on מרום three official surfaces do — the guides report
// the disagreement instead of resolving it by guesswork. Where a fact is not
// published, the guides say it is not published. Nothing here is inferred from
// how these programmes "usually" work.
//
// Sources read in full, 2026-09-15:
//   - che.org.il/scholarships/מלגת-מרום
//   - perach.org.il/הגשת-מועמדות-למרום
//   - perach.org.il/על-המלגה
//   - perach-prj.weizmann.ac.il/PerachStudent/registrationmarom (the system)
//   - che.org.il/decision/עדכון-תיעדוף-תחומי-לימוד-ליוצאי-אתיופ-2
//   - che.org.il/qa/migvan/ethiopia/
//   - che.org.il/scholarships/תכנית-מלגות-ותת-לדוקטורנטים-מצטיינים/
//   - gov.il/he/pages/ethiopian_jews_students_scholarships
//   - gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority
//   - isef.org.il/מלגות-לתואר-שני/
//
// HE is source of truth (CLAUDE.md). EN and AM are mirrors; AM is
// model-written and flagged for native review.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export interface ScholarshipGuideFaq {
  question: string;
  answer: string;
}

export interface ScholarshipGuide {
  slug: string;
  title: Translatable;
  /** ~155-char summary used as the meta description and the card blurb. */
  summary: Translatable;
  /** ISO date this guide's sources were last read. Rendered on the page. */
  updated: string;
  /** Scholarship slugs this guide is about — rendered as cross-links. */
  relatedScholarships: string[];
  /** Emitted as FAQPage JSON-LD and rendered at the foot of the page. */
  faqs: Record<Locale, ScholarshipGuideFaq[]>;
  bodies: Record<Locale, string>;
}

export const SCHOLARSHIP_GUIDES: ScholarshipGuide[] = [
  // ─────────────────────────────────────────────────────────────── 1
  {
    slug: "how-to-apply",
    title: {
      he: "איך מגישים בקשה למלגה — התהליך מההתחלה ועד התשובה",
      en: "How to apply for a scholarship — the process from start to answer",
      am: "ለስኮላርሺፕ እንዴት ማመልከት — ከመጀመሪያ እስከ መልስ",
    },
    summary: {
      he: "לוח הזמנים האמיתי של עונת המלגות, מי מגיש למי, מה קורה בין ההגשה לתשובה בדצמבר, ומה עושים אם נדחיתם.",
      en: "The real calendar of the scholarship season, who applies to whom, what happens between submission and the December answer, and what to do if you are refused.",
      am: "የስኮላርሺፕ ወቅቱ እውነተኛ የጊዜ ሰሌዳ፣ ማን ለማን እንደሚያመለክት፣ እና ከተከለከሉ ምን ማድረግ እንዳለብዎ።",
    },
    updated: "2026-09-15",
    relatedScholarships: ["marom-che", "klita-tuition-grant", "perach-tutoring-stipend"],
    faqs: {
      he: [
        {
          question: "אפשר לקבל שתי מלגות ממשלתיות באותה שנה?",
          answer:
            'לא. דף המינהל לסטודנטים עולים קובע פעמיים: "לא ניתן להעניק מלגת שכר לימוד לסטודנטים המקבלים מלגה מגורם ממשלתי אחר". המל"ג היא גורם ממשלתי, ולכן מרום והמינהל אינם נערמים זה על זה.',
        },
        {
          question: "מתי מקבלים תשובה על מלגת מרום?",
          answer:
            'לפי דף פר"ח: "בחודש דצמבר מקבלים למייל הודעת זכאות/אי זכאות למלגה". במקרה של אי-זכאות, "תינתן אפשרות בחלק מהמקרים להגיש בקשת ערעור".',
        },
        {
          question: "פספסתי את המועד. אפשר להגיש באיחור?",
          answer:
            'במינהל לסטודנטים עולים — לא, והדף אומר זאת במפורש: "לא יינתן סיוע רטרואקטיבי". אין מסלול השלמה. המועד הבא הוא הסמסטר הבא.',
        },
      ],
      en: [
        {
          question: "Can I hold two government scholarships in the same year?",
          answer:
            'No. The Students Authority page states it twice: "A tuition scholarship cannot be granted to students receiving a scholarship from another government body." CHE is a government body, so Marom and the Authority do not stack.',
        },
        {
          question: "When do I get an answer on Marom?",
          answer:
            'Per Perach\'s page: "In December an eligibility or non-eligibility notice is received by email." If you are refused, "in some cases the option to file an appeal will be given".',
        },
        {
          question: "I missed the deadline. Can I apply late?",
          answer:
            'At the Students Authority, no, and the page says so explicitly: "Retroactive assistance cannot be given." There is no catch-up route. The next opportunity is the next semester.',
        },
      ],
      am: [
        {
          question: "በአንድ ዓመት ሁለት የመንግሥት ስኮላርሺፖች መያዝ ይቻላል?",
          answer:
            "አይቻልም። የኦሊም ተማሪዎች አስተዳደር ገጽ ሁለት ጊዜ ይገልጻል፦ ከሌላ የመንግሥት አካል ስኮላርሺፕ ለሚቀበሉ ተማሪዎች የትምህርት ክፍያ ስኮላርሺፕ መስጠት አይቻልም። CHE የመንግሥት አካል ነው።",
        },
        {
          question: "ስለ ማሮም መልስ መቼ ይደርሳል?",
          answer:
            "በፔራች ገጽ መሠረት፣ በታኅሣሥ ወር የብቁነት ወይም ያለመብቃት ማስታወቂያ በኢሜይል ይደርሳል። ካልተፈቀደ በአንዳንድ ሁኔታዎች ይግባኝ የማቅረብ ዕድል ይሰጣል።",
        },
        {
          question: "ቀነ-ገደቡን አመለጠኝ። በዘገየ ማመልከት ይቻላል?",
          answer:
            "በኦሊም ተማሪዎች አስተዳደር አይቻልም። ገጹ በግልጽ ይላል፦ ወደኋላ ተመልሶ ድጋፍ አይሰጥም። የሚቀጥለው ዕድል የሚቀጥለው ሴሚስተር ነው።",
        },
      ],
    },
    bodies: {
      he: `## שלושה סוגי הגשה — ורק אחד מהם הוא "טופס"

לפני שמדברים על מועדים: המלגות שפתוחות בפניכם לא מתנהלות באותו אופן, וזה משנה מה בכלל אפשר לעשות השבוע.

**1. אתם מגישים ישירות.** מרום (דרך מערכת פר"ח), המינהל לסטודנטים עולים (דרך gov.il), פר"ח, אייס"ף. יש טופס, יש מועד, ואתם ממלאים אותו.

**2. המוסד מגיש בשמכם, ואתם לא יכולים.** מלגות ההצטיינות של ות"ת לדוקטורנטים ולבתר-דוקטורנטים נקבעות כך. דף המלגה של המל"ג אומר במפורש: **"אופן הגשת בקשה: באמצעות המוסדות בלבד"**. אין טופס לסטודנט. הכתובת שלכם היא הרשות לתלמידי מחקר או משרד הרקטור במוסד שלכם, והמועד שקובע הוא המועד שהמוסד קבע לעצמו פנימה — מוקדם יותר מ-1.6 שמפורסם באתר המל"ג. אם אתם דוקטורנטים ואתם מחכים לטופס, אתם מחכים לדבר שלא יגיע.

**3. המוסד מחליט לבד.** סיוע דיקנט הסטודנטים, הנחות ומלגות פנימיות. כאן אין מחזור ארצי בכלל, והכתובת היא היחידה לשוויון הזדמנויות או דיקנט הסטודנטים אצלכם.

מקורות: [תכנית מלגות ות"ת לדוקטורנטים מצטיינים](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · נבדק ספטמבר 2026.

## הלוח של עונת תשפ"ז, נכון ל-15 בספטמבר 2026

| מתי | מה | הערה |
| --- | --- | --- |
| 2–3 בספטמבר | **פר"ח** — ההרשמה נפתחה | פתוח. הרכזים יוצרים קשר מ-14.9 |
| כבר פתוח | **המינהל לסטודנטים עולים** — הרשמה לתשפ"ז | פתוח |
| **1 באוקטובר** | המינהל — **מועד אחרון לסטודנטים ממשיכים** | זה המועד הקרוב ביותר |
| **10 בנובמבר** | המינהל — מועד אחרון לסטודנטים חדשים בסמסטר א' | |
| דצמבר | מרום — הודעות זכאות במייל | לנרשמי המחזור הקודם |
| 1 באפריל | המינהל — מתחילים בסמסטר ב' | |
| **28 בפברואר 2027** | **מרום** — מה שמערכת ההרשמה מציגה | ראו למטה |
| סוף יולי | אייס"ף — מועד אחרון שנתי | מחזור תשפ"ז נסגר |

**המקרה של מרום דורש הסבר.** דף המל"ג אומר "ההרשמה נפתחת בחודש ספטמבר ונסגרת בתחילת נובמבר". דף פר"ח אומר "תיפתח במהלך חודש ספטמבר 2026". ומערכת ההרשמה עצמה — היחידה שמקבלת בקשות — מציגה היום: **"ההרשמה למרום סגורה כעת. ההרשמה לשנת הפעילות תשפ"ז תפתח ב- 28/02/27 בשעה- 08:00."**

שלושה דפים רשמיים, שלוש תשובות. אנחנו לא יודעים מי צודק ולא ננחש. מה שכן: **הטופס סגור, ואין טעם לנסות השבוע.** מי לשאול: צוות מרום בפר"ח, milga.marom@perach-il.org · 054-7731216.

## אם אתם צריכים כסף לשנה שמתחילה עכשיו

המסקנה המעשית של הטבלה למעלה: **המינהל לסטודנטים עולים הוא המסלול היחיד עם דדליין חי בשבועות הקרובים.** 1 באוקטובר לממשיכים הוא פחות משלושה שבועות מהיום.

ואם אתם ממשיכים — שימו לב שזה לא "חידוש אוטומטי". הדף: **"על כל סטודנט להגיש מחדש בכל תחילת שנת לימודים או סמסטר בקשה מקוונת"**. סטודנט שמימנו לו שלוש שנים וששכח להגיש בשנה הרביעית מקבל אפס.

## מה קורה אחרי שלוחצים "שלח"

זה החלק שאף אחד לא מתאר, ולכן אנשים מפרשים שתיקה כדחייה ומפסיקים לטפל.

**מרום, לפי דף פר"ח:**

1. בסיום ההרשמה מגיע מייל אישור. **שמרו אותו** — באמצעותו חוזרים לטופס כדי להשלים פרטים חסרים, לשנות או להוסיף מסמכים. זה אומר שהגשה חלקית ניתנת לתיקון, וזו סיבה טובה להגיש מוקדם גם אם חסר לכם מסמך
2. הבקשות מדורגות ומנוקדות
3. **בדצמבר** מגיעה למייל הודעת זכאות או אי-זכאות
4. במקרה של אי-זכאות — "תינתן אפשרות בחלק מהמקרים להגיש בקשת ערעור". לא תמיד, ולא אוטומטית: אם קיבלתם דחייה, שאלו במפורש אם במקרה שלכם יש ערעור
5. המלגה משולמת **בשתי פעימות** לאורך השנה — לא סכום אחד בהתחלה. אל תתכננו תזרים על בסיס תשלום אחד

**המינהל לסטודנטים עולים:** הבקשה מוגשת מחדש בכל שנה, ואין סיוע רטרואקטיבי. אם הפסקתם ללמוד — **חובה להודיע מיד**. הדף מזהיר שאי-הודעה "עלולה להוביל לרישום חוב ולהפסקת כל סיוע כספי מהמשרד". זו לא אזהרה תיאורטית: מדובר בכסף שכבר קיבלתם וידרשו ממנו החזר.

## שלוש טעויות שעולות את כל הבקשה

**לחכות שהאתר יתעדכן.** דף gov.il של המינהל הפנה עד לאחרונה למרום עם תאריכי מחזור תשפ"ו ("נפתחה בתאריך 9/9/2025... עד 11/11/25"). דף פר"ח נוסח בלשון עתיד מאז אוגוסט. אתרים רשמיים מתיישנים בשקט; מערכת ההרשמה היא מה שקובע.

**לבנות על סכום שקראתם בקיץ.** דף פר"ח עצמו הודיע ש"החל משנה הבאה (תשפ"ז) ישתנו תנאי מלגת מרום עבור נרשמים חדשים" ושהפרטים "יפורסמו במסודר". עד שיפורסמו — התנאים המפורטים שעדיין מופיעים שם הם של המחזור הקודם.

**להניח שהעתקתם את הזכאות משנה שעברה.** במינהל, המשך הסיוע מותנה ב**ממוצע 60 ומעלה** ובאישור מעבר תקין, ואין מימון לשנה חוזרת — לא בכישלון ולא בשינוי מסלול. מי שנכשל בקורס ונשאר שנה נוספת מגלה את זה כשהכסף לא מגיע.

## מה כן לעשות היום

1. אם אתם בתוך 15 שנה ממתן מעמד עולה — [הגישו למינהל לסטודנטים עולים](/he/education/scholarships/klita-tuition-grant). 1 באוקטובר קרוב
2. אם אתם בארץ מעל 15 שנה או ילידי הארץ — [הכינו את התיק למרום](/he/education/scholarships/guides/documents-checklist) ושאלו את פר"ח מה התאריך האמיתי
3. בכל מקרה — [פר"ח פתוחה](/he/education/scholarships/perach-tutoring-stipend), ומתשפ"ז שעות ההתנדבות שלה יכולות לשרת גם את מרום
4. אם אתם דוקטורנטים — פנו לרשות לתלמידי מחקר שלכם עכשיו, לא ביוני

## ראו גם

- [מרום מול המינהל מול ות"ת — מי זכאי למה](/he/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [אילו מסמכים צריך, ואיך להכין אותם](/he/education/scholarships/guides/documents-checklist)
- [למה בקשות נדחות](/he/education/scholarships/guides/why-applications-are-refused)
`,
      en: `## Three kinds of application — and only one of them is a "form"

Before deadlines: the scholarships open to you do not work the same way, and that changes what you can usefully do this week.

**1. You apply directly.** Marom (through Perach's system), the Students Authority (through gov.il), Perach, ISEF. There is a form, there is a deadline, you fill it in.

**2. Your institution applies for you, and you cannot.** The VATAT excellence scholarships for doctoral and post-doctoral researchers work this way. The CHE page says it outright: **"Method of application: through the institutions only."** There is no student form. Your address is your graduate-studies authority or the rector's office, and the deadline that binds you is the institution's own internal one — earlier than the 1 June published by CHE. If you are a doctoral student waiting for a form, you are waiting for something that will not arrive.

**3. The institution decides alone.** Dean of students' assistance, internal discounts and grants. There is no national cycle here at all; the address is your equal-opportunities unit or dean of students.

Source: [VATAT doctoral excellence scholarship programme](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · verified September 2026.

## The 2026-27 season calendar, as of 15 September 2026

| When | What | Note |
| --- | --- | --- |
| 2–3 September | **Perach** — registration opened | Open. Coordinators make contact from 14.9 |
| Already open | **Students Authority** — 2026-27 registration | Open |
| **1 October** | Authority — **deadline for continuing students** | The nearest deadline of all |
| **10 November** | Authority — deadline for new students, semester A | |
| December | Marom — eligibility notices by email | For the previous round's applicants |
| 1 April | Authority — students starting in semester B | |
| **28 February 2027** | **Marom** — what the registration system displays | See below |
| End of July | ISEF — annual deadline | The 2026-27 round is closed |

**Marom needs an explanation.** The CHE page says registration "opens in September and closes in early November". Perach's page says it "will open during September 2026". And the registration system itself — the only one that accepts applications — displays today: **"Marom registration is currently closed. Registration for the 5787 activity year will open on 28/02/27 at 08:00."**

Three official pages, three answers. We do not know which is right and will not guess. What is certain: **the form is closed, and there is no point trying this week.** Who to ask: the Marom team at Perach, milga.marom@perach-il.org · 054-7731216.

## If you need money for the year starting now

The practical conclusion of the table above: **the Students Authority is the only track with a live deadline in the coming weeks.** 1 October for continuing students is less than three weeks away.

And if you are a continuing student, note that this is not an automatic renewal. The page: **"Every student must file a fresh online application at the start of each academic year or semester."** A student funded for three years who forgets to apply in the fourth receives nothing.

## What happens after you press "submit"

This is the part nobody describes, which is why people read silence as refusal and stop chasing it.

**Marom, per Perach's page:**

1. On completing registration a confirmation email arrives. **Keep it** — it is how you get back into the form to complete missing details, change things or add documents. Which means a partial submission is fixable, and that is a good reason to submit early even if a document is missing
2. Applications are ranked and scored
3. **In December** an eligibility or non-eligibility notice arrives by email
4. If refused — "in some cases the option to file an appeal will be given". Not always, and not automatically: if you are refused, ask explicitly whether an appeal exists in your case
5. The scholarship is paid **in two instalments** across the year — not one sum up front. Do not plan your cash flow around a single payment

**The Students Authority:** the application is filed afresh each year, and there is no retroactive assistance. If you stop studying you **must notify them immediately**. The page warns that failing to do so "may lead to a recorded debt and the cessation of all financial assistance from the ministry". That is not theoretical: it is money you already received, and it will be reclaimed.

## Three mistakes that cost the whole application

**Waiting for the website to update.** The Authority's gov.il page referred readers to Marom using 2025-26 cycle dates ("opened 9/9/2025... until 11/11/25"). Perach's page has been written in the future tense since August. Official sites go stale quietly; the registration system is what governs.

**Budgeting on a figure you read in the summer.** Perach's own page announced that "from next year (5787) the Marom conditions will change for new applicants" and that the details "will be published in an orderly way". Until they are, the detailed conditions still shown there are last cycle's.

**Assuming last year's eligibility carried over.** At the Authority, continued assistance is conditional on **an average of 60 or above** and confirmation of normal progression, and there is no funding for a repeated year — neither for failure nor for a change of track. Someone who failed a course and stayed an extra year discovers this when the money does not arrive.

## What to actually do today

1. If you are within 15 years of receiving oleh status — [apply to the Students Authority](/en/education/scholarships/klita-tuition-grant). 1 October is close
2. If you have been in Israel more than 15 years or were born here — [prepare the Marom file](/en/education/scholarships/guides/documents-checklist) and ask Perach what the real date is
3. Either way — [Perach is open](/en/education/scholarships/perach-tutoring-stipend), and from 2026-27 its volunteer hours can serve Marom too
4. If you are a doctoral student — contact your graduate-studies authority now, not in June

## See also

- [Marom vs the Students Authority vs VATAT — who qualifies for what](/en/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [Which documents you need, and how to prepare them](/en/education/scholarships/guides/documents-checklist)
- [Why applications are refused](/en/education/scholarships/guides/why-applications-are-refused)
`,
      am: `## ሦስት ዓይነት ማመልከቻዎች — ከእነሱ አንዱ ብቻ "ቅጽ" ነው

**1. እርስዎ በቀጥታ ያመለክታሉ።** ማሮም (በፔራች ሥርዓት)፣ የኦሊም ተማሪዎች አስተዳደር (በgov.il)፣ ፔራች፣ ISEF። ቅጽ አለ፣ ቀነ-ገደብ አለ።

**2. ተቋምዎ በእርስዎ ስም ያመለክታል፤ እርስዎ አይችሉም።** የVATAT የልቀት ስኮላርሺፖች ለዶክትሬትና ለድኅረ-ዶክትሬት እንደዚህ ይሠራሉ። የCHE ገጽ በግልጽ ይላል፦ **"የማመልከቻ ዘዴ፦ በተቋማት በኩል ብቻ።"** ለተማሪ ቅጽ የለም። አድራሻዎ የምርምር ተማሪዎች ባለሥልጣን ወይም የሬክተሩ ጽሕፈት ቤት ነው። ዶክትሬት ተማሪ ሆነው ቅጽ እየጠበቁ ከሆነ፣ የማይመጣን ነገር እየጠበቁ ነው።

**3. ተቋሙ ብቻውን ይወስናል።** የተማሪዎች ዲን ድጋፍ፣ የውስጥ ቅናሾችና ስኮላርሺፖች። ብሔራዊ ዙር የለም።

ምንጭ፦ [የVATAT የዶክትሬት ልቀት ስኮላርሺፕ](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · ሴፕቴምበር 2026 ተረጋግጧል።

## የ2026-27 ወቅት የጊዜ ሰሌዳ፣ እስከ 15 ሴፕቴምበር 2026

| መቼ | ምን | ማስታወሻ |
| --- | --- | --- |
| ሴፕቴምበር 2–3 | **ፔራች** — ምዝገባ ተከፍቷል | ክፍት። አስተባባሪዎች ከ14.9 ይደውላሉ |
| አሁን ክፍት | **የኦሊም ተማሪዎች አስተዳደር** | ክፍት |
| **ኦክቶበር 1** | አስተዳደሩ — **ለቀጣይ ተማሪዎች የመጨረሻ ቀን** | በጣም የቀረበው ቀን |
| **ኖቬምበር 10** | አስተዳደሩ — ለአዲስ ተማሪዎች፣ ሴሚስተር ሀ | |
| ታኅሣሥ | ማሮም — የብቁነት ማስታወቂያዎች በኢሜይል | |
| **28 የካቲት 2027** | **ማሮም** — የምዝገባ ሥርዓቱ የሚያሳየው | ከታች ይመልከቱ |
| የጁላይ መጨረሻ | ISEF — ዓመታዊ የመጨረሻ ቀን | የ2026-27 ዙር ተዘግቷል |

**ማሮም ማብራሪያ ይፈልጋል።** የCHE ገጽ "በሴፕቴምበር ይከፈታል በኖቬምበር መጀመሪያ ይዘጋል" ይላል። የፔራች ገጽ "በሴፕቴምበር 2026 ይከፈታል" ይላል። የምዝገባ ሥርዓቱ ግን ዛሬ ያሳያል፦ **"የማሮም ምዝገባ አሁን ተዘግቷል። ለ5787 የሥራ ዓመት ምዝገባ በ28/02/27 በ08:00 ይከፈታል።"**

ሦስት ኦፊሴላዊ ገጾች፣ ሦስት መልሶች። የቱ ትክክል እንደሆነ አናውቅም፣ አንገምትም። እርግጠኛ የሆነው፦ **ቅጹ ተዘግቷል።** ማንን መጠየቅ፦ milga.marom@perach-il.org · 054-7731216።

## አሁን ለሚጀምረው ዓመት ገንዘብ የሚያስፈልግዎት ከሆነ

**የኦሊም ተማሪዎች አስተዳደር በሚቀጥሉት ሳምንታት ሕያው ቀነ-ገደብ ያለው ብቸኛው መንገድ ነው።** ለቀጣይ ተማሪዎች ኦክቶበር 1 ከሦስት ሳምንት ባነሰ ጊዜ ውስጥ ነው።

ቀጣይ ተማሪ ከሆኑ ይህ ራስ-ሰር እድሳት አለመሆኑን ልብ ይበሉ፦ **"እያንዳንዱ ተማሪ በየትምህርት ዓመቱ ወይም ሴሚስተሩ መጀመሪያ አዲስ የመስመር ላይ ማመልከቻ ማስገባት አለበት።"**

## "ላክ" ከተጫኑ በኋላ ምን ይሆናል

**ማሮም፣ በፔራች ገጽ መሠረት፦**

1. ምዝገባው ሲጠናቀቅ የማረጋገጫ ኢሜይል ይደርሳል። **ያስቀምጡት** — ጎደሎ መረጃ ለማሟላት ወይም ሰነዶች ለመጨመር የሚመለሱበት ነው። ይህ ማለት ያልተሟላ ማመልከቻ ሊታረም ይችላል
2. ማመልከቻዎቹ ይደረደራሉ ይነጠራሉ
3. **በታኅሣሥ** የብቁነት ወይም ያለመብቃት ማስታወቂያ በኢሜይል ይደርሳል
4. ካልተፈቀደ — "በአንዳንድ ሁኔታዎች ይግባኝ የማቅረብ ዕድል ይሰጣል"። ሁልጊዜ አይደለም፤ በግልጽ ይጠይቁ
5. ስኮላርሺፑ በዓመቱ ውስጥ **በሁለት ክፍያዎች** ይከፈላል — በአንድ ጊዜ አይደለም

**የኦሊም ተማሪዎች አስተዳደር፦** በየዓመቱ አዲስ ማመልከቻ፣ ወደኋላ ተመልሶ ድጋፍ የለም። ትምህርትዎን ካቋረጡ **ወዲያውኑ ማሳወቅ ግዴታ ነው** — አለበለዚያ ዕዳ ሊመዘገብና ሁሉም ድጋፍ ሊቋረጥ ይችላል።

## ሦስት ስህተቶች

**ድረ-ገጹ እስኪዘምን መጠበቅ።** ኦፊሴላዊ ገጾች በጸጥታ ያረጃሉ፤ የምዝገባ ሥርዓቱ ነው የሚወስነው።

**በበጋ ባነበቡት መጠን ላይ በጀት መገንባት።** የፔራች ገጽ ራሱ "ከሚቀጥለው ዓመት (5787) ጀምሮ የማሮም ሁኔታዎች ይለወጣሉ" ብሎ አስታውቋል።

**የአምናው ብቁነት እንደቀጠለ ማሰብ።** በአስተዳደሩ ድጋፉ እንዲቀጥል **ከ60 በላይ አማካይ** ያስፈልጋል፣ ለተደገመ ዓመትም ድጋፍ የለም።

## ዛሬ ምን ማድረግ

1. መዕመድ ካገኙ በ15 ዓመት ውስጥ ከሆኑ — [ለኦሊም ተማሪዎች አስተዳደር ያመልክቱ](/am/education/scholarships/klita-tuition-grant)
2. ከ15 ዓመት በላይ በእስራኤል ከሆኑ — [የማሮምን ፋይል ያዘጋጁ](/am/education/scholarships/guides/documents-checklist)
3. በማንኛውም ሁኔታ — [ፔራች ክፍት ነው](/am/education/scholarships/perach-tutoring-stipend)
4. ዶክትሬት ተማሪ ከሆኑ — አሁን የምርምር ተማሪዎች ባለሥልጣንዎን ያግኙ

## ይህንንም ይመልከቱ

- [ማሮም በተቃራኒ አስተዳደሩ በተቃራኒ VATAT](/am/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [ምን ሰነዶች ያስፈልጋሉ](/am/education/scholarships/guides/documents-checklist)
- [ማመልከቻዎች ለምን ይከለከላሉ](/am/education/scholarships/guides/why-applications-are-refused)
`,
    },
  },

  // ─────────────────────────────────────────────────────────────── 2
  {
    slug: "documents-checklist",
    title: {
      he: "המסמכים: מה בדיוק להעלות, ואיפה אנשים נופלים",
      en: "The documents: exactly what to upload, and where people trip",
      am: "ሰነዶቹ፦ በትክክል ምን መጫን እንዳለብዎ",
    },
    summary: {
      he: "רשימת המסמכים לכל מסלול, לפי דפי הגופים המעניקים עצמם — כולל הדרישות הקטנות שמחזירות בקשה: ספח פתוח באותו קובץ, אישור בעלות על חשבון, תלושי הורים.",
      en: "The document list for each track, from the granting bodies' own pages — including the small requirements that get an application sent back: the open appendix in the same file, bank-account ownership, parents' payslips.",
      am: "ለእያንዳንዱ መንገድ የሰነድ ዝርዝር፣ ከሰጪዎቹ አካላት ገጾች።",
    },
    updated: "2026-09-15",
    relatedScholarships: ["marom-che", "klita-tuition-grant", "tebeka-law-scholarship"],
    faqs: {
      he: [
        {
          question: "למה מבקשים תלושי שכר של ההורים אם אני עצמאי?",
          answer:
            'דף המל"ג מפרט "תלושי שכר של הורי הסטודנט או שלו", ומציין שבמקרים מסוימים נדרשת גם תעודת הזהות של ההורים. הניקוד במרום מביא בחשבון "הכנסה ממוצעת לנפש במשפחת הסטודנט/ית", ולכן התמונה המשפחתית נדרשת גם כשאתם מתפרנסים לבד.',
        },
        {
          question: 'מה זה "ספח פתוח"?',
          answer:
            'דף המל"ג מבקש "תעודת זהות עם ספח פתוח לצידה (בקובץ אחד)" — כלומר סריקה אחת שבה תעודת הזהות והספח הפתוח נראים יחד, ולא שני קבצים נפרדים.',
        },
      ],
      en: [
        {
          question: "Why do they want my parents' payslips if I support myself?",
          answer:
            "The CHE page lists \"payslips of the student's parents or of the student\", and notes that in some cases the parents' ID is also required. Marom's scoring takes account of \"average income per person in the student's family\", so the family picture is needed even when you earn your own living.",
        },
        {
          question: 'What is an "open appendix"?',
          answer:
            'The CHE page asks for "an identity card with the open appendix beside it (in a single file)" — one scan in which the ID and the opened appendix appear together, not two separate files.',
        },
      ],
      am: [
        {
          question: "ራሴን የምደግፍ ከሆነ የወላጆቼ የደመወዝ ወረቀት ለምን ይጠየቃል?",
          answer:
            "የCHE ገጽ የተማሪውን ወይም የወላጆቹን የደመወዝ ወረቀቶች ይዘረዝራል። የማሮም ነጥብ አሰጣጥ በቤተሰብ ውስጥ አማካይ የነፍስ ወከፍ ገቢን ግምት ውስጥ ያስገባል።",
        },
        {
          question: '"የተከፈተ አባሪ" ማለት ምን ማለት ነው?',
          answer:
            "የCHE ገጽ መታወቂያውን ከተከፈተው አባሪ ጋር በአንድ ፋይል ውስጥ ይጠይቃል — ሁለት የተለያዩ ፋይሎች አይደለም።",
        },
      ],
    },
    bodies: {
      he: `## למה זה עמוד נפרד

כי רוב הבקשות לא נדחות על הגוף — הן נתקעות על הניירת. ההבדל בין בקשה שמנוקדת לבין בקשה שיושבת "ממתינה למסמכים" עד שהחלון נסגר הוא לרוב קובץ אחד. וכמעט כל הדרישות האלה אפשר להכין **לפני** שההרשמה נפתחת בכלל.

## מרום — הרשימה, בלשון דף המל"ג

1. **"תעודת זהות עם ספח פתוח לצידה (בקובץ אחד)"**, ובמקרים מסוימים גם תעודת הזהות של הורי הסטודנט/ית
2. **"אישור לימודים רשמי"** — ולסטודנטים באוניברסיטה הפתוחה נדרש דווקא **אישור "מצב לימודים"**, וזה מסמך אחר
3. **"אישור בעלות חשבון בנק"**
4. לתואר ראשון בנוסף: **"תלושי שכר של הורי הסטודנט או שלו"**

דף פר"ח מוסיף את הכלל התפעולי: **"חשוב להעלות את כל המסמכים הדרושים עד מועד זה"** — כלומר עד סגירת ההרשמה, לא אחריה.

מקורות: [מלגת מרום — המל"ג](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [פר"ח — הגשת מועמדות](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · נבדק ספטמבר 2026.

### ארבע הנפילות הנפוצות ברשימה הזאת

**"בקובץ אחד".** תעודת זהות בקובץ אחד והספח בקובץ שני היא לא מה שהתבקש. סרקו את שניהם יחד לקובץ PDF אחד.

**ספח סגור.** הספח צריך להיות פתוח בסריקה, על העמוד שמפרט את בני המשפחה. ספח מקופל לא עונה על הדרישה.

**אישור לימודים מול "מצב לימודים" באוניברסיטה הפתוחה.** אלה שני מסמכים שונים במערכת של האו"פ. אם אתם באו"פ, בקשו את זה ששמו "מצב לימודים".

**אישור בעלות על חשבון שאינו על שמכם.** אישור בעלות הוא מסמך מהבנק שמראה ששם בעל החשבון הוא שמכם — לא צילום כרטיס אשראי ולא צילום צ'ק. חשבון על שם הורה יעכב את התשלום גם אם הזכאות אושרה.

## המינהל לסטודנטים עולים — מה שונה

כאן הדרישה אינה רשימת קבצים אלא **סטטוס**, וזה משנה מה צריך להכין:

- קבלה ללימודים מן המניין במוסד ובמסלול המוכרים לסיוע על ידי המינהל — לא כל מוסד וכל מסלול
- זכאות לתעודת בגרות או תעודת סיום מכינה. **באוניברסיטה הפתוחה**, מי שהתקבל בלי בגרות זכאי לסיוע רק אחרי שסיים בהצלחה שלושה קורסים אקדמיים בהיקף 18 נקודות זכות — כלומר יש שלב מקדים שלם לפני שיש בכלל על מה להגיש
- **להמשך הסיוע**: גיליון ציונים בממוצע 60 ומעלה ואישור מעבר תקין משנה לשנה
- הבקשה נעשית דרך **מערכת ההזדהות הלאומית**, והרישום אליה הוא שלב חד-פעמי בפני עצמו. אם אין לכם משתמש — התחילו מזה, לא מהטופס
- הטופס ממולא **"בעברית או באנגלית בלבד"**
- אם שכחתם לצרף מסמך, יש מסלול השלמה נפרד להגשת מסמכים — הבקשה לא אבודה

מקור: [בקשה מקוונת לסיוע מהמינהל לסטודנטים עולים — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority) · [תנאי זכאות מורחבים](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · נבדק ספטמבר 2026.

## מלגת מיתר למשפטנים — דרישה שקל לפספס

המלגה למשפטנים יוצאי אתיופיה ע"ש עו"ד צבי מיתר ז"ל דורשת **תכנית לימודים מלאה — לפחות שלושה ימי לימודים בשבוע** בפקולטה או מכללה למשפטים במוסד מוכר, ונותנת עדיפות לשנה א' או ב'. מי שלומד במתכונת מרוכזת של יומיים בשבוע אינו עומד בתנאי הזה, וכדאי לדעת את זה לפני שבונים על המלגה. השיקולים המוצהרים: יכולת אקדמית, מוטיבציה, מצב משפחתי וסוציו-אקונומי, מעורבות חברתית, וראיון אישי. **אין סף ציונים מפורסם.**

מקור: [אוניברסיטת בר-אילן — מלגה למשפטנים יוצאי אתיופיה](https://www.biu.ac.il/scholarship/583026) · נבדק ספטמבר 2026. לא הצלחנו לטעון את אתר טבקה עצמו — אמתו מולם ישירות לפני שאתם מסתמכים.

## תיקיית "מלגות" — ההמלצה המעשית היחידה בעמוד הזה

פתחו תיקייה אחת, והכניסו אליה היום, בפורמט PDF, בשמות ברורים:

- \`ת.ז + ספח (קובץ אחד).pdf\`
- \`אישור לימודים.pdf\` — בקשו מחדש בתחילת כל שנה; אישור משנה שעברה לא קביל
- \`אישור בעלות חשבון.pdf\`
- \`תלושי שכר הורים — 3 אחרונים.pdf\`
- \`ת.ז הורים.pdf\`
- \`גיליון ציונים אחרון.pdf\`

זה כמעט כל מה שכל אחד מהגופים מבקש. ברגע שההרשמה נפתחת — בין אם ב-28 בפברואר ובין אם מוקדם יותר — ההגשה לוקחת עשרים דקות במקום שבועיים של רדיפה אחרי אישורים.

## ראו גם

- [איך מגישים — התהליך המלא](/he/education/scholarships/guides/how-to-apply)
- [למה בקשות נדחות](/he/education/scholarships/guides/why-applications-are-refused)
`,
      en: `## Why this is its own page

Because most applications are not refused on the merits — they get stuck on the paperwork. The difference between an application that gets scored and one that sits "awaiting documents" until the window closes is usually a single file. And almost all of these requirements can be prepared **before** registration opens at all.

## Marom — the list, in the CHE page's own words

1. **"An identity card with the open appendix beside it (in a single file)"**, and in some cases the parents' identity cards too
2. **"An official enrollment confirmation"** — and Open University students need specifically a **"study status"** confirmation, which is a different document
3. **"Bank account ownership confirmation"**
4. For undergraduates additionally: **"payslips of the student's parents or of the student"**

Perach's page adds the operational rule: **"It is important to upload all the required documents by this date"** — that is, by the close of registration, not after it.

Sources: [Marom — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [Perach — applying](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · verified September 2026.

### The four common failures on that list

**"In a single file".** The ID in one file and the appendix in another is not what was asked for. Scan both together into one PDF.

**A closed appendix.** The appendix must be open in the scan, on the page listing family members. A folded appendix does not meet the requirement.

**Enrollment confirmation vs "study status" at the Open University.** These are two different documents in the OU's system. If you are at the OU, request the one called "study status".

**An ownership confirmation for an account not in your name.** An ownership confirmation is a bank document showing the account holder's name is yours — not a photo of a credit card or a cheque. An account in a parent's name will hold up payment even after eligibility is approved.

## The Students Authority — what is different

Here the requirement is not a list of files but a **status**, and that changes what you prepare:

- Admission as a regular student to an institution and track recognised for assistance by the Authority — not every institution and every track
- Entitlement to a matriculation certificate or a pre-academic completion certificate. **At the Open University**, a student admitted without matriculation becomes eligible only after successfully completing three academic courses totalling 18 credit points — an entire preliminary stage before there is anything to apply for
- **For continued assistance**: a transcript averaging 60 or above and confirmation of normal progression year to year
- The application goes through the **national identification system**, and registering for it is a one-off stage in its own right. If you have no account, start there, not with the form
- The form is completed **"in Hebrew or English only"**
- If you forgot to attach a document there is a separate document-submission route — the application is not lost

Sources: [Online application to the Students Authority — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority) · [Extended eligibility conditions](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · verified September 2026.

## The Meitar law scholarship — a requirement that is easy to miss

The scholarship for Ethiopian-Israeli jurists in memory of Adv. Zvi Meitar requires **a full study programme — at least three study days a week** at a recognised law faculty or college, and gives preference to first- and second-year students. Anyone studying on a concentrated two-days-a-week timetable does not meet that condition, and it is worth knowing before counting on the money. The stated considerations: academic ability, motivation, family and socio-economic circumstances, social involvement, and a personal interview. **There is no published grade threshold.**

Source: [Bar-Ilan University — scholarship for Ethiopian-Israeli jurists](https://www.biu.ac.il/scholarship/583026) · verified September 2026. We could not load Tebeka's own site — confirm with them directly before relying on this.

## A "scholarships" folder — the one practical recommendation on this page

Open a single folder and put into it today, as PDFs, under clear names:

- \`ID + appendix (one file).pdf\`
- \`Enrollment confirmation.pdf\` — request a fresh one at the start of each year; last year's is not accepted
- \`Bank account ownership.pdf\`
- \`Parents' payslips — last 3.pdf\`
- \`Parents' ID.pdf\`
- \`Latest transcript.pdf\`

That is very nearly everything any of these bodies asks for. The moment registration opens — whether on 28 February or earlier — submission takes twenty minutes instead of a fortnight of chasing confirmations.

## See also

- [How to apply — the full process](/en/education/scholarships/guides/how-to-apply)
- [Why applications are refused](/en/education/scholarships/guides/why-applications-are-refused)
`,
      am: `## ይህ ለምን የራሱ ገጽ ሆነ

አብዛኞቹ ማመልከቻዎች በይዘታቸው አይከለከሉም — በሰነድ ላይ ይቆማሉ። የሚነጠር ማመልከቻና "ሰነድ በመጠበቅ ላይ" ተብሎ መስኮቱ እስኪዘጋ የሚቀመጥ ማመልከቻ ልዩነታቸው አንድ ፋይል ነው። እነዚህ ሁሉ መስፈርቶች ምዝገባው **ከመከፈቱ በፊት** ሊዘጋጁ ይችላሉ።

## ማሮም — ዝርዝሩ፣ በCHE ገጽ አገላለጽ

1. **"መታወቂያ ከተከፈተ አባሪ ጋር ጎን ለጎን (በአንድ ፋይል)"**፣ በአንዳንድ ሁኔታዎችም የወላጆች መታወቂያ
2. **"ኦፊሴላዊ የትምህርት ማረጋገጫ"** — በክፍት ዩኒቨርሲቲ ተማሪዎች ግን በተለይ **"የትምህርት ሁኔታ"** ማረጋገጫ ያስፈልጋል፤ ይህ የተለየ ሰነድ ነው
3. **"የባንክ ሒሳብ ባለቤትነት ማረጋገጫ"**
4. ለመጀመሪያ ዲግሪ በተጨማሪ፦ **"የተማሪው ወይም የወላጆቹ የደመወዝ ወረቀቶች"**

የፔራች ገጽ የአሠራር ሕጉን ይጨምራል፦ **"ሁሉንም አስፈላጊ ሰነዶች እስከዚህ ቀን ድረስ መጫን አስፈላጊ ነው።"**

ምንጮች፦ [ማሮም — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [ፔራች](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · ሴፕቴምበር 2026 ተረጋግጧል።

### በዚህ ዝርዝር ላይ አራቱ የተለመዱ ውድቀቶች

**"በአንድ ፋይል"።** መታወቂያ በአንድ ፋይል፣ አባሪ በሌላ ፋይል የተጠየቀው አይደለም። ሁለቱንም አንድ ላይ ወደ አንድ PDF ይቃኙ።

**የተዘጋ አባሪ።** አባሪው በቅኝቱ ውስጥ ተከፍቶ፣ የቤተሰብ አባላትን በሚዘረዝረው ገጽ ላይ መሆን አለበት።

**በክፍት ዩኒቨርሲቲ የትምህርት ማረጋገጫ በተቃራኒ "የትምህርት ሁኔታ"።** ሁለት የተለያዩ ሰነዶች ናቸው።

**በእርስዎ ስም ያልሆነ ሒሳብ ማረጋገጫ።** የባለቤትነት ማረጋገጫ የሒሳቡ ባለቤት ስም የእርስዎ መሆኑን የሚያሳይ የባንክ ሰነድ ነው — የክሬዲት ካርድ ወይም የቼክ ፎቶ አይደለም።

## የኦሊም ተማሪዎች አስተዳደር — ልዩነቱ

እዚህ የሚጠየቀው የፋይል ዝርዝር ሳይሆን **ሁኔታ** ነው፦

- በአስተዳደሩ እውቅና ባለው ተቋምና መንገድ መደበኛ ተማሪ ሆኖ መቀበል — ሁሉም ተቋም አይደለም
- የማትሪክ ሰርተፊኬት ወይም የቅድመ-አካዳሚክ ማጠናቀቂያ ብቁነት። **በክፍት ዩኒቨርሲቲ**፣ ያለ ማትሪክ የተቀበሉ 18 ክሬዲት ነጥብ የሆኑ ሦስት ኮርሶችን በተሳካ ሁኔታ ካጠናቀቁ በኋላ ብቻ ብቁ ይሆናሉ
- **ድጋፉ እንዲቀጥል**፦ ከ60 በላይ አማካይ ያለው የውጤት መግለጫ
- ማመልከቻው በ**ብሔራዊ የማንነት ማረጋገጫ ሥርዓት** በኩል ይሄዳል፤ ለእሱ መመዝገብ የራሱ የአንድ ጊዜ ደረጃ ነው። መለያ ከሌልዎት ከዚያ ይጀምሩ
- ቅጹ **"በዕብራይስጥ ወይም በእንግሊዝኛ ብቻ"** ይሞላል
- ሰነድ መጨመር ከረሱ የተለየ የሰነድ ማስገቢያ መንገድ አለ

ምንጮች፦ [gov.il የመስመር ላይ ማመልከቻ](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority) · [የተስፋፋ የብቁነት ሁኔታዎች](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · ሴፕቴምበር 2026 ተረጋግጧል።

## የሜታር የሕግ ስኮላርሺፕ — በቀላሉ የሚያመልጥ መስፈርት

ስኮላርሺፑ **ሙሉ የትምህርት ፕሮግራም — በሳምንት ቢያንስ ሦስት የትምህርት ቀናት** ይጠይቃል፣ ለ1ኛ ወይም 2ኛ ዓመት ተማሪዎችም ቅድሚያ ይሰጣል። **የታተመ የውጤት ደረጃ የለም።**

ምንጭ፦ [ባር-ኢላን ዩኒቨርሲቲ](https://www.biu.ac.il/scholarship/583026) · ሴፕቴምበር 2026 ተረጋግጧል። የጠበቃ ድርጅቱን የራሱን ድረ-ገጽ መጫን አልቻልንም።

## የ"ስኮላርሺፕ" አቃፊ

አንድ አቃፊ ይክፈቱ፣ ዛሬውኑ በPDF ቅርጸት፣ በግልጽ ስሞች ያስገቡ፦ መታወቂያ + አባሪ (አንድ ፋይል)፣ የትምህርት ማረጋገጫ (በየዓመቱ አዲስ)፣ የሒሳብ ባለቤትነት፣ የወላጆች የደመወዝ ወረቀቶች፣ የወላጆች መታወቂያ፣ የቅርብ ጊዜ የውጤት መግለጫ።

ምዝገባው በሚከፈትበት ጊዜ ማስገባቱ ከሁለት ሳምንት ሩጫ ይልቅ ሃያ ደቂቃ ይወስዳል።

## ይህንንም ይመልከቱ

- [እንዴት ማመልከት — ሙሉ ሂደቱ](/am/education/scholarships/guides/how-to-apply)
- [ማመልከቻዎች ለምን ይከለከላሉ](/am/education/scholarships/guides/why-applications-are-refused)
`,
    },
  },

  // ─────────────────────────────────────────────────────────────── 3
  {
    slug: "why-applications-are-refused",
    title: {
      he: "למה בקשות נדחות — ומה בכלל מנקדים",
      en: "Why applications are refused — and what is actually scored",
      am: "ማመልከቻዎች ለምን ይከለከላሉ — በእውነቱስ ምን ይነጠራል",
    },
    summary: {
      he: "מה הגופים המעניקים אומרים בעצמם שהם מנקדים, מה הם לא מנקדים, ואילו תנאי סף שקטים מפילים בקשות לפני שמישהו קרא אותן.",
      en: "What the granting bodies say they score, what they do not score, and which quiet threshold conditions sink an application before anyone reads it.",
      am: "ሰጪዎቹ አካላት ምን እንደሚነጥሩ የሚሉት፣ ምን እንደማይነጥሩ፣ እና ማመልከቻዎችን የሚያስወድቁ ጸጥ ያሉ ቅድመ-ሁኔታዎች።",
    },
    updated: "2026-09-15",
    relatedScholarships: ["marom-che", "klita-tuition-grant", "isef-fellowship"],
    faqs: {
      he: [
        {
          question: "ממוצע הציונים שלי משפיע על הסיכוי לקבל את מלגת מרום?",
          answer:
            'לא לפי הקריטריונים שהמל"ג מפרסמת. דף המלגה מונה שלושה קריטריונים לניקוד המועמדים: מצב סוציו-אקונומי כולל הכנסה ממוצעת לנפש, מקצועות לימוד מועדפים, ומצב משפחתי — האם הסטודנט/ית הורים. ממוצע ציונים אינו מופיע ברשימה.',
        },
        {
          question: "רמת העדיפות של התחום שלי מגדילה את סכום המלגה?",
          answer:
            'לא. ארבע רמות העדיפות (א׳–ד׳) שנקבעו בהחלטת מל"ג מ-18.6.2024 הן קריטריון ניקוד שמשפיע על מקומכם בדירוג, לא מכפיל של הסכום. דף המלגה נוקב בסכומים קבועים לפי סוג התואר.',
        },
        {
          question: "נדחיתי. יש ערעור?",
          answer:
            'במרום — לפעמים. לשון דף פר"ח: "במידה והתקבלה הודעת אי זכאות – תינתן אפשרות בחלק מהמקרים להגיש בקשת ערעור". זה לא אוטומטי, ולכן צריך לשאול במפורש אם במקרה שלכם קיים ערעור ומה המועד.',
        },
      ],
      en: [
        {
          question: "Does my grade average affect my chances at Marom?",
          answer:
            "Not according to the criteria CHE publishes. The scholarship page lists three scoring criteria: socio-economic situation including average income per person, preferred fields of study, and family status — whether the student is a parent. Grade average does not appear on the list.",
        },
        {
          question: "Does my field's priority level increase the amount?",
          answer:
            "No. The four priority levels (A–D) set by the CHE decision of 18.6.2024 are a scoring criterion affecting your place in the ranking, not a multiplier on the amount. The scholarship page states fixed amounts by degree type.",
        },
        {
          question: "I was refused. Is there an appeal?",
          answer:
            'At Marom — sometimes. Perach\'s page: "If a non-eligibility notice is received, in some cases the option to file an appeal will be given." It is not automatic, so you must ask explicitly whether an appeal exists in your case and by when.',
        },
      ],
      am: [
        {
          question: "የውጤት አማካዬ በማሮም ዕድሌ ላይ ተጽዕኖ አለው?",
          answer:
            "CHE በሚያሳትማቸው መስፈርቶች መሠረት አይደለም። የስኮላርሺፑ ገጽ ሦስት የነጥብ መስፈርቶችን ይዘረዝራል፦ ማህበራዊ-ኢኮኖሚያዊ ሁኔታ፣ ተመራጭ የትምህርት መስኮች፣ እና የቤተሰብ ሁኔታ። የውጤት አማካይ በዝርዝሩ ውስጥ የለም።",
        },
        {
          question: "የመስኬ የቅድሚያ ደረጃ መጠኑን ይጨምራል?",
          answer:
            "አይ። አራቱ የቅድሚያ ደረጃዎች የነጥብ መስፈርት እንጂ የመጠን ማባዣ አይደሉም። የስኮላርሺፑ ገጽ በዲግሪ ዓይነት ቋሚ መጠኖችን ይገልጻል።",
        },
        {
          question: "ተከልክያለሁ። ይግባኝ አለ?",
          answer:
            "በማሮም — አንዳንድ ጊዜ። የፔራች ገጽ፦ ያለመብቃት ማስታወቂያ ከደረሰ በአንዳንድ ሁኔታዎች ይግባኝ የማቅረብ ዕድል ይሰጣል። ራስ-ሰር አይደለም፤ በግልጽ መጠየቅ ያስፈልጋል።",
        },
      ],
    },
    bodies: {
      he: `## רוב הדחיות אינן שיפוט על מי שאתם

הן נופלות באחד משלושה מקומות: תנאי סף שלא ידעתם עליו, ניירת חסרה, או דירוג. רק השלישי הוא תחרות. השניים הראשונים הם מידע — וזה בדיוק מה שאף אחד לא מפרסם, ולכן העמוד הזה קיים.

## 1. תנאי סף שמפילים לפני שמישהו קרא את הבקשה

אלה תנאים שהגופים מפרסמים, אבל לא בכותרת. מי שלא עומד בהם לא מדורג נמוך — הוא לא מדורג בכלל.

**מרום — היקף הלימודים.** דף המל"ג: **"לימודים של לפחות 70% מהיקף הלימודים המצטבר הנדרש עד השנה הנוכחית, כולל שנה זו"**. דף פר"ח מנסח זאת אחרת — 60% מהמערכת השנתית לתואר ראשון, 66% לתואר שני. שני הניסוחים חיים היום בשני דפים רשמיים. **בררו מול פר"ח לפני שאתם מניחים שאתם בפנים**, במיוחד אם פרסתם קורסים על פני יותר שנים.

**מרום — הוותק בארץ.** סטודנטים יוצאי אתיופיה **הנמצאים בארץ מעל 15 שנה, או ילידי הארץ שהוריהם נולדו באתיופיה**. מי שבתוך 15 שנה אינו זכאי — ודף המל"ג עצמו מפנה אותו למינהל לסטודנטים עולים. זו לא דחייה, זו כתובת אחרת.

**המינהל לסטודנטים עולים — הגיל בתחילת הלימודים.** במסלול המורחב לעולי אתיופיה: עד 28 לתואר ראשון, הנדסאי ולימודי תעודה; עד 40 לתואר שני ולהסבה. אלה תקרות, לא המלצות.

**המינהל — תואר מקביל שכבר יש לכם.** "הסטודנט אינו בעל תואר או תעודה מקבילים או זהים לאלה שעבורם מבוקש הסיוע". תואר ראשון קיים חוסם מימון של תואר ראשון שני.

**המינהל — האוניברסיטה הפתוחה בלי בגרות.** מי שהתקבל לאו"פ בלי תעודת בגרות זכאי לסיוע **רק אחרי** שסיים בהצלחה שלושה קורסים אקדמיים בהיקף 18 נקודות זכות. הגשה לפני כן אינה מתקבלת.

**אייס"ף — יום שישי.** תנאי מפורש: **"הסטודנט/ית אינו לומד/ת בימי שישי"**, לצד נוכחות חובה בכ-10 מפגשי מנהיגות בימי שישי בתל אביב ו-60 שעות התנדבות שנתיות. תכנית לימודים עם קורס יום שישי פוסלת, ולא משנה כמה הבקשה טובה.

**מלגת מיתר למשפטנים — שלושה ימי לימוד.** נדרשת תכנית לימודים מלאה, **לפחות שלושה ימי לימודים בשבוע**. מסלול מרוכז של יומיים לא עומד בתנאי.

## 2. ניירת — הדחייה השקטה

זו לא באמת דחייה, וזה מה שהופך אותה למסוכנת: אין מכתב, יש שתיקה. הבקשה יושבת חסרת מסמך עד שהחלון נסגר.

שלוש הנפוצות: תעודת זהות והספח **בשני קבצים** במקום באחד, אישור לימודים משנה שעברה, ואישור בעלות על חשבון בנק שאינו על שם המבקש. [הרשימה המלאה, מסמך-מסמך](/he/education/scholarships/guides/documents-checklist).

**מה שמציל אותה במרום:** מייל האישור שמגיע בסיום ההרשמה. דף פר"ח: "בעזרתו תוכלו לחזור ולהיכנס שוב לטופס הרישום – להשלים את הפרטים החסרים/לשנות/להוסיף מסמכים". הגשה חלקית ניתנת לתיקון — ולכן עדיף להגיש מוקדם עם חוסר מאשר לחכות לשלמות עד הרגע האחרון.

## 3. מה באמת מנקדים — והמתמטיקה של 680 מקומות

כאן מתחילה התחרות, וכאן רוב האנשים מנחשים לא נכון.

**דף המל"ג מונה שלושה קריטריונים לניקוד המועמדים:**

1. **מצב סוציו-אקונומי**, "ובכלל זה הכנסה ממוצעת לנפש"
2. **מקצועות לימוד מועדפים** — תחומים הנדרשים לשוק העבודה הישראלי ושבהם קיים תת-ייצוג ליוצאי אתיופיה
3. **מצב משפחתי** — האם הסטודנט או הסטודנטית הורים

דף פר"ח מוסיף לקריטריון הסוציו-אקונומי גם **מספר סטודנטים נוספים במשפחה**, ומסביר את המבנה: **"המלגות לתואר ראשון יחולקו ל-680 סטודנטים בעלי הדירוג הגבוה ביותר"**. (זה מספר המחזור הקודם; פר"ח הודיעה שהתנאים לתשפ"ז משתנים ויפורסמו מחדש.)

**שימו לב למה שאין ברשימה: ממוצע ציונים.** מרום אינה מלגת הצטיינות, והיא לא מתיימרת להיות. סטודנט עם ממוצע 75 ומצב סוציו-אקונומי קשה מדורג גבוה מסטודנט עם ממוצע 95 ממשפחה מבוססת. אם הימרתם על הבקשה כעל "הוכחת מצוינות" — הימרתם על הקריטריון הלא נכון.

**ורמת העדיפות אינה מכפיל.** מל"ג חילקה את תחומי הלימוד לארבע רמות (א׳–ד׳) בהחלטתה מ-18.6.2024, לפי צורכי שוק העבודה ולפי תת-ייצוג. הרמה משפיעה על **הניקוד** — כלומר על הסיכוי להיכנס ל-680 — ולא על הסכום. הסכומים קבועים לפי סוג התואר. טבלת אחוזים שלפיה המלגה משולמת כ-100%/85%/66%/50% משכר הלימוד לפי רמת עדיפות **אינה מופיעה בשום מקור של הגוף המעניק**; היא הופיעה בעבר גם אצלנו והוסרה.

מקורות: [מלגת מרום — המל"ג](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [פר"ח — הגשת מועמדות](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · [החלטת מל"ג 18.6.2024](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/) · נבדק ספטמבר 2026.

## על מכתב המוטיבציה — האמת הלא נוחה

בשלושת הקריטריונים שלמעלה אין שורה שנקראת "מכתב". במרום, הניקוד נגזר מנתונים: הכנסה, תחום, מצב משפחתי. **מכתב מצוין לא יעלה את הניקוד שלכם**, ומכתב בינוני לא יוריד אותו.

איפה מכתב וראיון כן מכריעים: באייס"ף (**"סדנת מיון וראיון קבלה"**), במלגת מיתר למשפטנים (הקריטריונים כוללים במפורש מוטיבציה, מעורבות חברתית וראיון אישי), ובתכנית "מצוינות ומנהיגות בתעסוקה" של עולים ביחד (ראיון טלפוני ומרכז הערכה עם מבחנים קוגניטיביים ודינמיקה קבוצתית).

המסקנה המעשית: **השקיעו את הזמן שלכם לפי המסלול.** במרום — בדיוק של הניירת ובעמידה בסף ההיקף. באייס"ף ובמיתר — בהכנה לראיון. שעתיים על ניסוח מחדש של פסקת פתיחה במרום הן שעתיים שלא הלכו לוודא שהספח פתוח בסריקה.

## אם נדחיתם

1. **שאלו אם יש ערעור.** במרום זה קיים "בחלק מהמקרים" ואינו אוטומטי. שאלו גם מה המועד
2. **שאלו מה הייתה הסיבה.** תנאי סף וניירת ניתנים לתיקון לשנה הבאה; דירוג לא
3. **בדקו את המסלול השני.** אם נדחיתם ממרום בגלל ותק בארץ, ייתכן שאתם בתוך [המסלול המורחב של המינהל לסטודנטים עולים](/he/education/scholarships/klita-tuition-grant) — ולהפך
4. **מלגות שאינן מותנות בזכאות עדתית עדיין פתוחות.** [פר"ח](/he/education/scholarships/perach-tutoring-stipend) אינה מציבה סף אקדמי כלל, וההרשמה אליה פתוחה

## ראו גם

- [מרום מול המינהל מול ות"ת — מי זכאי למה](/he/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [אילו מסמכים צריך, ואיך להכין אותם](/he/education/scholarships/guides/documents-checklist)
- [איך מגישים — התהליך המלא](/he/education/scholarships/guides/how-to-apply)
`,
      en: `## Most refusals are not a judgement on who you are

They land in one of three places: a threshold condition you did not know about, missing paperwork, or the ranking. Only the third is competition. The first two are information — and that is exactly what nobody publishes, which is why this page exists.

## 1. Threshold conditions that sink you before anyone reads the application

These are conditions the bodies publish, but not in the headline. Someone who fails them is not ranked low — they are not ranked at all.

**Marom — study load.** The CHE page: **"Studying at least 70% of the cumulative required coursework up to and including the current year."** Perach's page words it differently — 60% of the annual load for a bachelor's, 66% for a master's. Both wordings are live today on two official pages. **Check with Perach before assuming you are inside it**, especially if you have spread courses over more years.

**Marom — years in Israel.** Students of Ethiopian origin **resident in Israel more than 15 years, or born in Israel to parents born in Ethiopia**. Anyone within 15 years is not eligible — and CHE's own page refers them to the Students Authority. That is not a refusal, it is a different address.

**The Students Authority — age at the start of studies.** On the extended track for olim from Ethiopia: up to 28 for a bachelor's, practical engineering and certificate studies; up to 40 for a master's and for conversion studies. These are ceilings, not guidance.

**The Authority — a parallel degree you already hold.** "The student does not already hold a parallel or identical degree or certificate to the one assistance is sought for." An existing bachelor's blocks funding for a second one.

**The Authority — the Open University without matriculation.** A student admitted to the OU without a matriculation certificate becomes eligible **only after** successfully completing three academic courses totalling 18 credit points. An application before that is not accepted.

**ISEF — Friday.** An explicit condition: **"The student does not study on Fridays"**, alongside compulsory attendance at about 10 leadership meetings on Fridays in Tel Aviv and 60 volunteer hours a year. A timetable with a Friday course disqualifies you, however good the application.

**The Meitar law scholarship — three study days.** A full study programme is required, **at least three study days a week**. A concentrated two-day timetable does not meet the condition.

## 2. Paperwork — the silent refusal

This is not really a refusal, and that is what makes it dangerous: there is no letter, there is silence. The application sits missing a document until the window closes.

The three most common: the identity card and the appendix in **two files** instead of one, an enrollment confirmation from last year, and a bank-account ownership confirmation not in the applicant's name. [The full list, document by document](/en/education/scholarships/guides/documents-checklist).

**What rescues it at Marom:** the confirmation email that arrives when you finish registering. Perach's page: "with it you can go back into the registration form — to complete missing details, change things, add documents". A partial submission is fixable — so it is better to submit early with a gap than to wait for perfection until the last moment.

## 3. What is actually scored — and the arithmetic of 680 places

Here the competition starts, and here most people guess wrong.

**The CHE page lists three criteria for scoring candidates:**

1. **Socio-economic situation**, "including average income per person"
2. **Preferred fields of study** — fields required by the Israeli labour market and in which Ethiopian-Israelis are under-represented
3. **Family status** — whether the student is a parent

Perach's page adds **the number of other students in the family** to the socio-economic criterion, and explains the structure: **"The bachelor's scholarships will be distributed to the 680 highest-ranked students."** (That is the previous cycle's number; Perach has announced that the 2026-27 conditions are changing and will be republished.)

**Note what is not on the list: grade average.** Marom is not an excellence scholarship and does not claim to be. A student with a 75 average and difficult socio-economic circumstances ranks above a student with a 95 average from a comfortable family. If you staked the application on proving excellence, you staked it on the wrong criterion.

**And the priority level is not a multiplier.** CHE divided fields into four levels (A–D) in its decision of 18.6.2024, by labour-market need and by under-representation. The level affects **the score** — that is, your chance of getting inside the 680 — not the amount. The amounts are fixed by degree type. A percentage table under which the scholarship pays 100%/85%/66%/50% of tuition by priority level **appears in no granting-body source**; it previously appeared on our own pages too and has been removed.

Sources: [Marom — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [Perach — applying](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · [CHE decision 18.6.2024](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/) · verified September 2026.

## On the motivation letter — the uncomfortable truth

Among the three criteria above there is no line called "letter". At Marom the score is derived from data: income, field, family status. **An excellent letter will not raise your score**, and a mediocre one will not lower it.

Where a letter and an interview do decide: at ISEF (**"a screening workshop and admission interview"**), at the Meitar law scholarship (the criteria explicitly include motivation, social involvement and a personal interview), and in Olim Beyahad's "Excellence and Leadership in Employment" (a telephone interview and an assessment centre with cognitive tests and group dynamics).

The practical conclusion: **spend your time according to the track.** At Marom — on the precision of the paperwork and on meeting the load threshold. At ISEF and Meitar — on preparing for the interview. Two hours rewording an opening paragraph for Marom are two hours that did not go into checking that the appendix is open in the scan.

## If you are refused

1. **Ask whether there is an appeal.** At Marom it exists "in some cases" and is not automatic. Ask the deadline too
2. **Ask what the reason was.** Threshold conditions and paperwork can be fixed for next year; a ranking cannot
3. **Check the other track.** If Marom refused you over years in Israel, you may be inside [the Students Authority's extended track](/en/education/scholarships/klita-tuition-grant) — and vice versa
4. **Scholarships with no origin condition are still open.** [Perach](/en/education/scholarships/perach-tutoring-stipend) sets no academic threshold at all, and its registration is open

## See also

- [Marom vs the Students Authority vs VATAT — who qualifies for what](/en/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [Which documents you need, and how to prepare them](/en/education/scholarships/guides/documents-checklist)
- [How to apply — the full process](/en/education/scholarships/guides/how-to-apply)
`,
      am: `## አብዛኞቹ ውድቅ ማድረጎች እርስዎ ማን እንደሆኑ የሚሰጥ ፍርድ አይደሉም

በሦስት ቦታዎች በአንዱ ይወድቃሉ፦ ያላወቁት ቅድመ-ሁኔታ፣ የጎደለ ሰነድ፣ ወይም ደረጃ አሰጣጥ። ሦስተኛው ብቻ ውድድር ነው። የመጀመሪያዎቹ ሁለቱ መረጃ ናቸው — ማንም የማያሳትመውም ያ ነው።

## 1. ማንም ማመልከቻውን ከማንበቡ በፊት የሚያስወድቁ ቅድመ-ሁኔታዎች

**ማሮም — የትምህርት ጫና።** የCHE ገጽ፦ **"እስከ አሁኑ ዓመት ድረስ ከሚያስፈልገው ድምር የትምህርት ጫና ቢያንስ 70% መማር።"** የፔራች ገጽ በተለየ ይገልጸዋል — ለመጀመሪያ ዲግሪ 60%፣ ለሁለተኛ ዲግሪ 66%። ሁለቱም ዛሬ በሁለት ኦፊሴላዊ ገጾች ላይ ሕያው ናቸው። **ውስጥ እንደሆኑ ከመገመትዎ በፊት ፔራችን ይጠይቁ።**

**ማሮም — በእስራኤል የቆይታ ዓመታት።** ኢትዮጵያ-ተወላጅ ተማሪዎች **ከ15 ዓመት በላይ በእስራኤል የኖሩ ወይም በእስራኤል የተወለዱ ወላጆቻቸው በኢትዮጵያ የተወለዱ**። ከ15 ዓመት በታች ያሉ ብቁ አይደሉም — የCHE ገጽ ራሱ ወደ ኦሊም ተማሪዎች አስተዳደር ይመራቸዋል። ይህ ውድቅ ማድረግ ሳይሆን ሌላ አድራሻ ነው።

**የኦሊም ተማሪዎች አስተዳደር — ትምህርት ሲጀምሩ ያለው ዕድሜ።** በተስፋፋው መንገድ፦ ለመጀመሪያ ዲግሪና ለሰርተፊኬት እስከ 28፤ ለሁለተኛ ዲግሪና ለሙያ ለውጥ እስከ 40። እነዚህ ጣሪያዎች ናቸው።

**አስተዳደሩ — አስቀድሞ ያለዎት ተመሳሳይ ዲግሪ።** "ተማሪው ድጋፍ ለሚጠይቅበት ዲግሪ ተመሳሳይ ወይም አቻ ዲግሪ የለውም።"

**አስተዳደሩ — ክፍት ዩኒቨርሲቲ ያለ ማትሪክ።** ያለ ማትሪክ የተቀበሉ 18 ክሬዲት ነጥብ የሆኑ ሦስት ኮርሶችን በተሳካ ሁኔታ **ካጠናቀቁ በኋላ ብቻ** ብቁ ይሆናሉ።

**ISEF — አርብ።** ግልጽ ቅድመ-ሁኔታ፦ **"ተማሪው በአርብ ቀናት አይማርም"**፣ ከዚህ ጋር በቴል አቪቭ በአርብ ቀናት 10 ያህል የአመራር ስብሰባዎች የግዴታ ተሳትፎና በዓመት 60 ሰዓት የበጎ ፈቃድ አገልግሎት።

**የሜታር የሕግ ስኮላርሺፕ — ሦስት የትምህርት ቀናት።** በሳምንት **ቢያንስ ሦስት የትምህርት ቀናት** ያለው ሙሉ ፕሮግራም ያስፈልጋል።

## 2. ሰነድ — ጸጥ ያለው ውድቅ ማድረግ

ደብዳቤ የለም፤ ዝምታ አለ። ማመልከቻው ሰነድ ጎድሎት መስኮቱ እስኪዘጋ ይቀመጣል።

ሦስቱ የተለመዱ፦ መታወቂያና አባሪ **በሁለት ፋይል** ከአንድ ይልቅ፣ የአምናው የትምህርት ማረጋገጫ፣ እና በአመልካቹ ስም ያልሆነ የባንክ ሒሳብ ማረጋገጫ። [ሙሉ ዝርዝሩ](/am/education/scholarships/guides/documents-checklist)።

**በማሮም የሚያድነው፦** ምዝገባው ሲጠናቀቅ የሚደርሰው የማረጋገጫ ኢሜይል። የፔራች ገጽ፦ "በእሱ አማካኝነት ወደ ምዝገባ ቅጹ ተመልሰው መግባት ይችላሉ — ጎደሎ መረጃ ለማሟላት፣ ለመቀየር፣ ሰነዶች ለመጨመር።" ያልተሟላ ማመልከቻ ሊታረም ይችላል።

## 3. በእውነቱ ምን ይነጠራል — እና የ680 ቦታዎች ሒሳብ

**የCHE ገጽ ሦስት የነጥብ መስፈርቶችን ይዘረዝራል፦**

1. **ማህበራዊ-ኢኮኖሚያዊ ሁኔታ**፣ "አማካይ የነፍስ ወከፍ ገቢን ጨምሮ"
2. **ተመራጭ የትምህርት መስኮች** — በእስራኤል የሥራ ገበያ የሚፈለጉና ኢትዮጵያ-ተወላጆች ዝቅተኛ ውክልና ያላቸው
3. **የቤተሰብ ሁኔታ** — ተማሪው ወላጅ መሆኑ

የፔራች ገጽ **በቤተሰቡ ውስጥ ያሉ ሌሎች ተማሪዎች ብዛትን** ይጨምራል፣ መዋቅሩንም ያስረዳል፦ **"የመጀመሪያ ዲግሪ ስኮላርሺፖች ከፍተኛ ደረጃ ላላቸው 680 ተማሪዎች ይሰራጫሉ።"** (ይህ የቀድሞው ዙር ቁጥር ነው።)

**በዝርዝሩ ውስጥ የሌለውን ልብ ይበሉ፦ የውጤት አማካይ።** ማሮም የልቀት ስኮላርሺፕ አይደለም። የ75 አማካይ ያለውና አስቸጋሪ ማህበራዊ-ኢኮኖሚያዊ ሁኔታ ያለው ተማሪ ከ95 አማካይ ካለውና ከምቹ ቤተሰብ ከመጣ ተማሪ በላይ ይደረደራል።

**የቅድሚያ ደረጃውም ማባዣ አይደለም።** ደረጃው በ**ነጥቡ** ላይ — ማለትም ወደ 680 የመግባት ዕድልዎ ላይ — እንጂ በመጠኑ ላይ ተጽዕኖ የለውም። ስኮላርሺፑ በቅድሚያ ደረጃ መሠረት ከትምህርት ክፍያ 100%/85%/66%/50% እንደሚከፍል የሚገልጽ የመቶኛ ሰንጠረዥ **በየትኛውም የሰጪው አካል ምንጭ አይገኝም**፤ ከዚህ በፊት በእኛም ገጾች ላይ ቀርቦ ነበር፣ ተወግዷል።

ምንጮች፦ [ማሮም — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [ፔራች](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D) · [የCHE ውሳኔ 18.6.2024](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/) · ሴፕቴምበር 2026 ተረጋግጧል።

## ስለ ተነሳሽነት ደብዳቤው — የማይመች እውነት

ከላይ ባሉት ሦስት መስፈርቶች ውስጥ "ደብዳቤ" የሚባል መስመር የለም። በማሮም ነጥቡ ከመረጃ ይወሰዳል፦ ገቢ፣ መስክ፣ የቤተሰብ ሁኔታ። **ግሩም ደብዳቤ ነጥብዎን አይጨምርም።**

ደብዳቤና ቃለ-መጠይቅ የሚወስኑት የት ነው፦ በISEF (**"የማጣሪያ አውደ ጥናትና የቅበላ ቃለ-መጠይቅ"**)፣ በሜታር የሕግ ስኮላርሺፕ (መስፈርቶቹ ተነሳሽነትን፣ ማህበራዊ ተሳትፎንና የግል ቃለ-መጠይቅን በግልጽ ያካትታሉ)፣ እና በOlim Beyahad "በሥራ ስምሪት ልቀትና አመራር" (የስልክ ቃለ-መጠይቅና የግምገማ ማዕከል)።

**ጊዜዎን እንደ መንገዱ ያዋሉ።** በማሮም — በሰነዱ ትክክለኛነትና የጫና ደረጃውን በማሟላት። በISEF እና በሜታር — ለቃለ-መጠይቅ በመዘጋጀት።

## ከተከለከሉ

1. **ይግባኝ መኖሩን ይጠይቁ።** በማሮም "በአንዳንድ ሁኔታዎች" አለ፤ ራስ-ሰር አይደለም
2. **ምክንያቱ ምን እንደነበር ይጠይቁ።** ቅድመ-ሁኔታዎችና ሰነዶች ለሚቀጥለው ዓመት ሊታረሙ ይችላሉ፤ ደረጃ አሰጣጥ ግን አይችልም
3. **ሌላውን መንገድ ይፈትሹ።** በቆይታ ዓመታት ምክንያት ከማሮም ከተከለከሉ [የአስተዳደሩ የተስፋፋ መንገድ](/am/education/scholarships/klita-tuition-grant) ውስጥ ሊሆኑ ይችላሉ
4. **የትውልድ ቅድመ-ሁኔታ የሌላቸው ስኮላርሺፖች አሁንም ክፍት ናቸው።** [ፔራች](/am/education/scholarships/perach-tutoring-stipend) ምንም የአካዳሚክ ደረጃ አያስቀምጥም

## ይህንንም ይመልከቱ

- [ማሮም በተቃራኒ አስተዳደሩ በተቃራኒ VATAT](/am/education/scholarships/guides/marom-vs-minhal-vs-vatat)
- [ምን ሰነዶች ያስፈልጋሉ](/am/education/scholarships/guides/documents-checklist)
- [እንዴት ማመልከት — ሙሉ ሂደቱ](/am/education/scholarships/guides/how-to-apply)
`,
    },
  },

  // ─────────────────────────────────────────────────────────────── 4
  {
    slug: "marom-vs-minhal-vs-vatat",
    title: {
      he: 'מרום מול המינהל לסטודנטים עולים מול ות"ת — מי זכאי למה, ומה אפשר לשלב',
      en: "Marom vs the Students Authority vs VATAT — who qualifies for what, and what can be combined",
      am: "ማሮም በተቃራኒ የኦሊም ተማሪዎች አስተዳደር በተቃራኒ VATAT — ማን ለምን ብቁ ነው",
    },
    summary: {
      he: "השוואה בין שלושת מסלולי המימון הממשלתיים, לפי דפי הגופים עצמם: מי נכנס לאיזה מסלול, מה כל אחד נותן, ולמה אי אפשר להחזיק בשניים.",
      en: "A comparison of the three government funding tracks, from the bodies' own pages: who falls into which, what each gives, and why you cannot hold two.",
      am: "የሦስቱ የመንግሥት የገንዘብ መንገዶች ንጽጽር፣ ከአካላቱ ገጾች፦ ማን የት እንደሚገባ፣ እያንዳንዱ ምን እንደሚሰጥ።",
    },
    updated: "2026-09-15",
    relatedScholarships: [
      "marom-che",
      "klita-tuition-grant",
      "vatat-doctoral-postdoc-scholarship",
    ],
    faqs: {
      he: [
        {
          question: "אפשר לקבל גם מרום וגם את מלגת המינהל לסטודנטים עולים?",
          answer:
            'לא. דף המינהל קובע: "לא ניתן להעניק מלגת שכר לימוד לסטודנטים המקבלים מלגה מגורם ממשלתי אחר". המל"ג היא גורם ממשלתי. שני המסלולים גם מכוונים לאוכלוסיות משלימות — מרום למי שבארץ מעל 15 שנה, המינהל למי שבתוך 15 שנה ממתן המעמד.',
        },
        {
          question: "מה כן אפשר לשלב עם מרום?",
          answer:
            'מלגות שאינן ממשלתיות. דף המל"ג מציין במפורש שחובת ההתנדבות בוטלה מתשפ"ז כדי "לאפשר בקלות לקבל את המלגה עם מלגות אחרות הדורשות התנדבות כגון מלגת פר"ח", ומפנה גם למלגת מיל-GO.',
        },
        {
          question: 'למה אני לא מוצא טופס למלגת ות"ת לדוקטורנטים?',
          answer:
            'כי אין כזה. דף המלגה קובע: "אופן הגשת בקשה: באמצעות המוסדות בלבד". המוסד מגיש מועמדים מטעמו, בדרך כלל דרך הרשות לתלמידי מחקר או משרד הרקטור.',
        },
      ],
      en: [
        {
          question: "Can I hold both Marom and the Students Authority scholarship?",
          answer:
            'No. The Authority page states: "A tuition scholarship cannot be granted to students receiving a scholarship from another government body." CHE is a government body. The two tracks also target complementary populations — Marom for those in Israel over 15 years, the Authority for those within 15 years of receiving status.',
        },
        {
          question: "What can be combined with Marom?",
          answer:
            'Non-government scholarships. The CHE page notes explicitly that the volunteering requirement was abolished from 2026-27 in order to "make it easy to hold the scholarship together with other scholarships requiring volunteering, such as the Perach scholarship", and also points to Mil-GO.',
        },
        {
          question: "Why can I not find a form for the VATAT doctoral scholarship?",
          answer:
            'Because there is none. The scholarship page states: "Method of application: through the institutions only." The institution nominates candidates, usually via the graduate-studies authority or the rector\'s office.',
        },
      ],
      am: [
        {
          question: "ማሮምንም የአስተዳደሩንም ስኮላርሺፕ በአንድ ጊዜ መያዝ ይቻላል?",
          answer:
            "አይቻልም። የአስተዳደሩ ገጽ ይላል፦ ከሌላ የመንግሥት አካል ስኮላርሺፕ ለሚቀበሉ ተማሪዎች የትምህርት ክፍያ ስኮላርሺፕ መስጠት አይቻልም። CHE የመንግሥት አካል ነው።",
        },
        {
          question: "ከማሮም ጋር ምን ማጣመር ይቻላል?",
          answer:
            "የመንግሥት ያልሆኑ ስኮላርሺፖችን። የCHE ገጽ የበጎ ፈቃድ ግዴታው ከ2026-27 የተሰረዘው ማሮምን የበጎ ፈቃድ ከሚጠይቁ ሌሎች ስኮላርሺፖች ጋር ለማጣመር እንዲቀል መሆኑን በግልጽ ይገልጻል።",
        },
        {
          question: "ለVATAT የዶክትሬት ስኮላርሺፕ ቅጽ ለምን አላገኘሁም?",
          answer: "ስለሌለ ነው። የስኮላርሺፑ ገጽ ይላል፦ የማመልከቻ ዘዴ፦ በተቋማት በኩል ብቻ። ተቋሙ ዕጩዎችን ያቀርባል።",
        },
      ],
    },
    bodies: {
      he: `## ההבדל שקובע הכל: כמה שנים אתם בארץ

לפני כל השוואה של סכומים — שני המסלולים הממשלתיים העיקריים חלוקים ביניהם את האוכלוסייה לפי קו אחד, וכמעט כל שאר ההבדלים נגזרים ממנו:

- **בארץ מעל 15 שנה, או יליד/ת הארץ שהוריכם נולדו באתיופיה** → [מרום](/he/education/scholarships/marom-che)
- **בתוך 15 שנה ממתן מעמד עולה** → [המינהל לסטודנטים עולים](/he/education/scholarships/klita-tuition-grant)

זה לא מקרי. דף המל"ג כותב במפורש שמלגות מקבילות ליוצאי אתיופיה **הנמצאים פחות מ-15 שנה** מוענקות על ידי המינהל. הם חילקו ביניהם את השדה.

**ומכאן נובע הכלל שהכי חשוב בעמוד הזה:** דף המינהל חוזר פעמיים על כך ש**"לא ניתן להעניק מלגת שכר לימוד לסטודנטים המקבלים מלגה מגורם ממשלתי אחר"**. המל"ג היא גורם ממשלתי. **אלה אינם שני מקורות שנערמים — זו שאלה של איזה מהם שלכם.**

## ההשוואה

| | **מרום** (מל"ג/ות"ת) | **המינהל לסטודנטים עולים** | **מלגות ההצטיינות של ות"ת** |
| --- | --- | --- | --- |
| מי | יוצאי אתיופיה, בארץ 15+ שנה או ילידי הארץ להורים ילידי אתיופיה | עולי אתיופיה, תימן ובני המנשה — תוך 15 שנה ממתן המעמד | דוקטורנטים ובתר-דוקטורנטים מ"אוכלוסיות הגיוון" |
| רמת הלימודים | תואר ראשון ושני | מכינה, תואר ראשון, תעודה, הנדסאים, תואר שני | דוקטורט, בתר-דוקטורט |
| גיל מרבי | לא פורסם | 28 לתואר ראשון · 40 לתואר שני | לא פורסם |
| שכר לימוד | ₪10,000 לתואר ראשון · שכר לימוד מלא לתואר שני מחקרי (₪16,490 בתשפ"ז) · ₪7,000 לתואר שני שאינו מחקרי | עד 100% מהתעריף האוניברסיטאי | — |
| מלגת קיום | אין | **₪600 לחודש, עד 9 חודשים** | כלול במלגה |
| סכום שנתי | — | — | כ-₪62,200 לדוקטורט + ₪10,000 הוצאות מחקר · $36,000 לבתר-דוקטורט |
| התנדבות | **בוטלה מתשפ"ז** | נדרשת — תוכנית שח"ק | — |
| תנאי המשך | — | ממוצע 60+ · אין מימון לשנה חוזרת | — |
| מי מגיש | אתם, דרך מערכת פר"ח | אתם, דרך gov.il | **המוסד בלבד** |
| סטטוס היום | **סגור.** המערכת מציגה פתיחה 28.2.2027 | **פתוח.** 1.10 ממשיכים · 10.11 חדשים | סגור — מועד המוסדות היה 1.6.2026 |

מקורות: [מלגת מרום — המל"ג](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [תנאי זכאות מורחבים — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · [בקשה מקוונת — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority) · [תכנית מלגות ות"ת לדוקטורנטים מצטיינים](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · כולם נקראו במלואם 15.9.2026.

## מה שהטבלה לא מראה: המינהל רחב יותר, ולא רק בכסף

מי שיש לו בחירה — כלומר מי שבתוך 15 שנה — לרוב מקבל יותר מהמינהל, ולא רק בגלל מלגת הקיום:

- **מימון תואר שני בנוסף לתואר ראשון**, מפורשות, במסלול המורחב. במסלול הכללי זה "לא, למעט חריגים"
- מימון ייעוץ והכוון בבחירת תחום הלימוד על ידי מכון מקצועי
- מימון קורסי אנגלית ועברית במסגרת חובות התואר
- מערך **"מעטפ"ת"** — שיעורי עזר, עובדים סוציאליים ומדריכים לליווי אישי

מרום, לעומת זאת, היא מלגה: סכום, ותו לא. זה לא חיסרון — זה הבדל באופי.

**אבל שימו לב לעלות הנסתרת של המינהל:** ממוצע 60 ומעלה כתנאי להמשך, חובת התנדבות בשח"ק, אין מימון לשנה חוזרת "בין אם הסטודנט נכשל ובין אם שינה מסלול לימודים", וחובת הגשה מחדש בכל שנה. מרום דורשת פחות מכם אחרי שקיבלתם אותה — ומתשפ"ז גם ביטלה את חובת ההתנדבות.

## מה כן אפשר לשלב

הכלל הוא פשוט: **ממשלתי + ממשלתי — לא. ממשלתי + לא-ממשלתי — כן.**

דף המל"ג אומר זאת כמעט במילים האלה. הוא מסביר שחובת ההתנדבות במרום בוטלה מתשפ"ז **"על מנת לאפשר בקלות לקבל את המלגה עם מלגות אחרות הדורשות התנדבות כגון מלגת פר"ח"**, ומפנה גם למלגת מיל-GO. כלומר מרום תוכננה להיערם על מלגות עמותות.

צירופים שהמקורות תומכים בהם:

- **מרום + [פר"ח](/he/education/scholarships/perach-tutoring-stipend)** — והחל מתשפ"ז אותן שעות חונכות משרתות את שתיהן, במקום שתצטרכו לבחור. זו ההטבה הכספית הגדולה ביותר בשינוי התנאים השנה
- **המינהל + פר"ח** — פר"ח היא עמותה, לא גורם ממשלתי
- **מרום או המינהל + מלגות מוסדיות** של דיקנט הסטודנטים

דף פר"ח ציין בתנאי המחזור הקודם תקרת כפל מלגות של **₪30,000 בשנה כולל מרום**. פר"ח הודיעה שהתנאים לתשפ"ז משתנים ויפורסמו מחדש, ולכן אל תבנו על המספר הזה לשנה הבאה — אבל דעו שתקרה כזו קיימת כמנגנון.

## דוקטורנטים: המסלול הזה עובד אחרת לגמרי

שתי נקודות שמפילות אנשים:

**1. המסלול הייעודי ליוצאי אתיופיה בוטל.** החלטת ות"ת מ-20.3.2024 מיזגה את התכניות הנפרדות — לחברה הערבית, לחברה החרדית, ליוצאי אתיופיה — לתכנית אחת ל"אוכלוסיות הגיוון ולפריפריה החברתית-כלכלית". יוצאי אתיופיה הם היום אחת מכמה קבוצות זכאיות בתוכה. דפים של אוניברסיטאות שעדיין מתארים מסלול ייעודי נפרד הם עותקים מיושנים.

**2. אתם לא מגישים.** דף המלגה: **"אופן הגשת בקשה: באמצעות המוסדות בלבד"**. המועד המפורסם — 1.6.2026 — הוא המועד שבו **המוסד** מגיש למל"ג. המועד שרלוונטי לכם הוא פנימי ומוקדם יותר, והוא לא מפורסם בשום מקום מרכזי.

המסקנה המעשית: אם אתם דוקטורנטים או לקראת בתר-דוקטורט, הפעולה היא לפנות **היום** לרשות לתלמידי מחקר או למשרד הרקטור במוסד שלכם ולשאול מתי הם אוספים מועמדויות. מי שמחכה לטופס באתר המל"ג מפספס מחזור שלם.

## איך לבחור, בשלושה צעדים

1. **ספרו את השנים מקבלת המעמד** — לא משנות העלייה, ולא כולל שירות צבאי או לאומי, שאינו נספר. מעל 15 → מרום. מתחת → המינהל
2. **בדקו את הגיל בתחילת הלימודים** אם אתם במסלול המינהל. 28 לתואר ראשון, 40 לתואר שני, במסלול המורחב
3. **אם יש לכם בחירה** — המינהל נותן יותר (מלגת קיום, תואר שני, מעטפת), אבל דורש יותר (ממוצע 60, שח"ק, הגשה שנתית). מרום נותנת סכום ודורשת מעט, ומתשפ"ז נערמת בקלות על מלגת פר"ח

ובכל מקרה: נכון להיום, רק אחד משני המסלולים בכלל פתוח.

## ראו גם

- [איך מגישים — התהליך המלא](/he/education/scholarships/guides/how-to-apply)
- [אילו מסמכים צריך](/he/education/scholarships/guides/documents-checklist)
- [למה בקשות נדחות](/he/education/scholarships/guides/why-applications-are-refused)
`,
      en: `## The difference that decides everything: how many years you have been in Israel

Before any comparison of amounts — the two main government tracks divide the population along a single line, and nearly every other difference follows from it:

- **In Israel more than 15 years, or born here to parents born in Ethiopia** → [Marom](/en/education/scholarships/marom-che)
- **Within 15 years of receiving oleh status** → [the Students Authority](/en/education/scholarships/klita-tuition-grant)

This is not accidental. The CHE page states explicitly that parallel scholarships for Ethiopian-Israelis **who have been here less than 15 years** are granted by the Authority. They divided the field between them.

**And from this follows the most important rule on this page:** the Authority's page repeats twice that **"a tuition scholarship cannot be granted to students receiving a scholarship from another government body"**. CHE is a government body. **These are not two sources that stack — it is a question of which one is yours.**

## The comparison

| | **Marom** (CHE/VATAT) | **Students Authority** | **VATAT excellence scholarships** |
| --- | --- | --- | --- |
| Who | Ethiopian-Israelis, 15+ years in Israel or born here to Ethiopian-born parents | Olim from Ethiopia, Yemen and Bnei Menashe — within 15 years of receiving status | Doctoral and post-doctoral researchers from the "diversity populations" |
| Level | Bachelor's and master's | Pre-academic, bachelor's, certificate, practical engineering, master's | Doctorate, post-doctorate |
| Maximum age | Not published | 28 for a bachelor's · 40 for a master's | Not published |
| Tuition | ₪10,000 for a bachelor's · full tuition for a research master's (₪16,490 in 2026-27) · ₪7,000 for a non-research master's | Up to 100% of the university tariff | — |
| Subsistence stipend | None | **₪600/month, up to 9 months** | Included in the scholarship |
| Annual amount | — | — | About ₪62,200 for a doctorate + ₪10,000 research expenses · $36,000 for a post-doctorate |
| Volunteering | **Abolished from 2026-27** | Required — the Sha'ak programme | — |
| Continuation conditions | — | Average 60+ · no funding for a repeated year | — |
| Who applies | You, through Perach's system | You, through gov.il | **The institution only** |
| Status today | **Closed.** The system shows an opening on 28.2.2027 | **Open.** 1.10 continuing · 10.11 new | Closed — the institutions' deadline was 1.6.2026 |

Sources: [Marom — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [Extended eligibility conditions — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · [Online application — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority) · [VATAT doctoral excellence scholarships](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · all read in full 15.9.2026.

## What the table does not show: the Authority is broader, and not only in money

Anyone with a choice — that is, anyone within 15 years — usually gets more from the Authority, and not only because of the subsistence stipend:

- **Funding for a master's on top of a bachelor's**, explicitly, on the extended track. On the general track this is "no, save for exceptions"
- Funded professional guidance in choosing a field of study
- Funding for English and Hebrew courses required by the degree
- The **"Ma'atefet"** support array — tutoring, social workers and personal guides

Marom, by contrast, is a scholarship: an amount, and nothing else. That is not a defect — it is a difference in kind.

**But note the Authority's hidden cost:** an average of 60 or above as a continuation condition, compulsory Sha'ak volunteering, no funding for a repeated year "whether the student failed or changed track", and a fresh application every year. Marom asks less of you after you receive it — and from 2026-27 it has dropped its volunteering requirement too.

## What can be combined

The rule is simple: **government + government — no. Government + non-government — yes.**

The CHE page says it almost in those words. It explains that Marom's volunteering requirement was abolished from 2026-27 **"in order to make it easy to hold the scholarship together with other scholarships requiring volunteering, such as the Perach scholarship"**, and also points to Mil-GO. That is, Marom was designed to stack on NGO scholarships.

Combinations the sources support:

- **Marom + [Perach](/en/education/scholarships/perach-tutoring-stipend)** — and from 2026-27 the same tutoring hours serve both, instead of forcing a choice. It is the largest financial benefit in this year's change of terms
- **The Authority + Perach** — Perach is an NGO, not a government body
- **Marom or the Authority + institutional scholarships** from the dean of students

Perach's page noted, in the previous cycle's conditions, a combined-scholarship ceiling of **₪30,000 a year including Marom**. Perach has announced that the 2026-27 conditions are changing and will be republished, so do not build on that number for next year — but know that such a ceiling exists as a mechanism.

## Doctoral students: this track works completely differently

Two points that catch people out:

**1. The dedicated Ethiopian track was abolished.** The VATAT decision of 20.3.2024 merged the separate programmes — for Arab society, for Haredi society, for Ethiopian-Israelis — into a single programme for "the diversity populations and the socio-economic periphery". Ethiopian-Israelis are now one of several eligible groups within it. University pages still describing a separate dedicated track are stale copies.

**2. You do not apply.** The scholarship page: **"Method of application: through the institutions only."** The published deadline — 1.6.2026 — is the date by which **the institution** submits to CHE. The date relevant to you is internal and earlier, and it is not published anywhere central.

The practical conclusion: if you are a doctoral student or approaching a post-doctorate, the action is to contact your graduate-studies authority or rector's office **today** and ask when they collect nominations. Anyone waiting for a form on the CHE site misses an entire cycle.

## How to choose, in three steps

1. **Count the years from receiving status** — not from the year of aliyah, and not including military or national service, which does not count. Over 15 → Marom. Under → the Authority
2. **Check your age at the start of studies** if you are on the Authority track. 28 for a bachelor's, 40 for a master's, on the extended track
3. **If you have a choice** — the Authority gives more (subsistence stipend, master's, support array) but demands more (average 60, Sha'ak, annual application). Marom gives an amount and demands little, and from 2026-27 stacks easily on the Perach scholarship

And either way: as of today, only one of the two tracks is open at all.

## See also

- [How to apply — the full process](/en/education/scholarships/guides/how-to-apply)
- [Which documents you need](/en/education/scholarships/guides/documents-checklist)
- [Why applications are refused](/en/education/scholarships/guides/why-applications-are-refused)
`,
      am: `## ሁሉንም የሚወስነው ልዩነት፦ በእስራኤል ስንት ዓመት ቆይተዋል

ማንኛውንም የመጠን ንጽጽር ከማድረግ በፊት — ሁለቱ ዋና የመንግሥት መንገዶች ሕዝቡን በአንድ መስመር ይከፋፍላሉ፦

- **ከ15 ዓመት በላይ በእስራኤል፣ ወይም እዚህ የተወለዱ ወላጆቻቸው በኢትዮጵያ የተወለዱ** → [ማሮም](/am/education/scholarships/marom-che)
- **መዕመድ ካገኙ በ15 ዓመት ውስጥ** → [የኦሊም ተማሪዎች አስተዳደር](/am/education/scholarships/klita-tuition-grant)

ይህ በአጋጣሚ አይደለም። የCHE ገጽ **ከ15 ዓመት በታች** ለቆዩ ኢትዮጵያ-ተወላጆች አቻ ስኮላርሺፖች በአስተዳደሩ እንደሚሰጡ በግልጽ ይናገራል።

**ከዚህም በዚህ ገጽ ላይ በጣም አስፈላጊው ሕግ ይከተላል፦** የአስተዳደሩ ገጽ ሁለት ጊዜ ይደግመዋል፦ **"ከሌላ የመንግሥት አካል ስኮላርሺፕ ለሚቀበሉ ተማሪዎች የትምህርት ክፍያ ስኮላርሺፕ መስጠት አይቻልም።"** CHE የመንግሥት አካል ነው። **እነዚህ የሚደራረቡ ሁለት ምንጮች አይደሉም — የትኛው የእርስዎ እንደሆነ የሚለው ጥያቄ ነው።**

## ንጽጽሩ

| | **ማሮም** (CHE/VATAT) | **የኦሊም ተማሪዎች አስተዳደር** | **የVATAT የልቀት ስኮላርሺፖች** |
| --- | --- | --- | --- |
| ማን | ኢትዮጵያ-ተወላጆች፣ ከ15+ ዓመት በእስራኤል ወይም እዚህ የተወለዱ | ከኢትዮጵያ፣ ከየመንና ቤኔ ምናሼ ኦሊም — መዕመድ ካገኙ በ15 ዓመት ውስጥ | ከ"የብዝሃነት ሕዝቦች" የዶክትሬትና የድኅረ-ዶክትሬት ተመራማሪዎች |
| ደረጃ | የመጀመሪያና ሁለተኛ ዲግሪ | ቅድመ-አካዳሚክ፣ የመጀመሪያ ዲግሪ፣ ሰርተፊኬት፣ ቴክኒሻን፣ ሁለተኛ ዲግሪ | ዶክትሬት፣ ድኅረ-ዶክትሬት |
| ከፍተኛ ዕድሜ | አልታተመም | ለመጀመሪያ ዲግሪ 28 · ለሁለተኛ ዲግሪ 40 | አልታተመም |
| የትምህርት ክፍያ | ለመጀመሪያ ዲግሪ ₪10,000 · ለምርምር ሁለተኛ ዲግሪ ሙሉ ክፍያ (₪16,490) · ምርምር ላልሆነ ₪7,000 | እስከ 100% የዩኒቨርሲቲ ታሪፍ | — |
| የኑሮ ድጋፍ | የለም | **በወር ₪600፣ እስከ 9 ወር** | በስኮላርሺፑ ውስጥ ተካቷል |
| ዓመታዊ መጠን | — | — | ለዶክትሬት ₪62,200 ያህል + ₪10,000 የምርምር ወጪ · ለድኅረ-ዶክትሬት $36,000 |
| የበጎ ፈቃድ | **ከ2026-27 ተሰርዟል** | ያስፈልጋል — የሻሕአክ ፕሮግራም | — |
| የመቀጠያ ሁኔታዎች | — | ከ60 በላይ አማካይ · ለተደገመ ዓመት ድጋፍ የለም | — |
| ማን ያመለክታል | እርስዎ፣ በፔራች ሥርዓት | እርስዎ፣ በgov.il | **ተቋሙ ብቻ** |
| ዛሬ ያለው ሁኔታ | **ተዘግቷል።** ሥርዓቱ 28.2.2027 ያሳያል | **ክፍት ነው።** 1.10 ቀጣይ · 10.11 አዲስ | ተዘግቷል — የተቋማት ቀን 1.6.2026 ነበር |

ምንጮች፦ [ማሮም — CHE](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · [የተስፋፋ የብቁነት ሁኔታዎች — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · [የመስመር ላይ ማመልከቻ — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority) · [የVATAT የዶክትሬት ስኮላርሺፖች](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · ሁሉም 15.9.2026 በሙሉ ተነበዋል።

## ሰንጠረዡ የማያሳየው፦ አስተዳደሩ ሰፋ ያለ ነው

ምርጫ ያለው ሰው — ማለትም በ15 ዓመት ውስጥ ያለ — ብዙውን ጊዜ ከአስተዳደሩ የበለጠ ያገኛል፦

- **ከመጀመሪያ ዲግሪ በተጨማሪ የሁለተኛ ዲግሪ ማስተማር**፣ በተስፋፋው መንገድ በግልጽ
- የትምህርት መስክ ምርጫ ሙያዊ ምክር ድጋፍ
- በዲግሪው ግዴታዎች ውስጥ የእንግሊዝኛና የዕብራይስጥ ኮርሶች ድጋፍ
- **"መዓቴፌት"** የድጋፍ ሥርዓት — የድጋፍ ትምህርቶች፣ ማህበራዊ ሠራተኞችና የግል አማካሪዎች

ማሮም በአንጻሩ ስኮላርሺፕ ነው፦ መጠን፣ ከዚያ ውጭ ምንም። ይህ ጉድለት አይደለም — የባህርይ ልዩነት ነው።

**ነገር ግን የአስተዳደሩን ድብቅ ወጪ ልብ ይበሉ፦** ከ60 በላይ አማካይ እንደ መቀጠያ ሁኔታ፣ የግዴታ የሻሕአክ የበጎ ፈቃድ አገልግሎት፣ ለተደገመ ዓመት ድጋፍ አለመኖር፣ እና በየዓመቱ አዲስ ማመልከቻ።

## ምን ማጣመር ይቻላል

ሕጉ ቀላል ነው፦ **መንግሥታዊ + መንግሥታዊ — አይቻልም። መንግሥታዊ + መንግሥታዊ ያልሆነ — ይቻላል።**

የCHE ገጽ ይህንን ከሞላ ጎደል በእነዚህ ቃላት ይናገራል። የማሮም የበጎ ፈቃድ ግዴታ ከ2026-27 የተሰረዘው **"ስኮላርሺፑን የበጎ ፈቃድ ከሚጠይቁ ሌሎች ስኮላርሺፖች ጋር በቀላሉ ለመያዝ እንዲቻል፣ እንደ የፔራች ስኮላርሺፕ"** መሆኑን ያስረዳል።

ምንጮቹ የሚደግፏቸው ጥምረቶች፦

- **ማሮም + [ፔራች](/am/education/scholarships/perach-tutoring-stipend)** — ከ2026-27 ጀምሮ ተመሳሳይ የማስተማሪያ ሰዓታት ሁለቱንም ያገለግላሉ። በዚህ ዓመት የሁኔታዎች ለውጥ ውስጥ ትልቁ የገንዘብ ጥቅም ይህ ነው
- **አስተዳደሩ + ፔራች** — ፔራች የበጎ አድራጎት ድርጅት እንጂ የመንግሥት አካል አይደለም
- **ማሮም ወይም አስተዳደሩ + የተቋም ስኮላርሺፖች** ከተማሪዎች ዲን

የፔራች ገጽ በቀድሞው ዙር ሁኔታዎች ውስጥ **በዓመት ₪30,000 ማሮምን ጨምሮ** የጥምር ስኮላርሺፕ ጣሪያ ጠቅሶ ነበር። ለ2026-27 ሁኔታዎች እንደሚለወጡ ስለተገለጸ በዚህ ቁጥር ላይ አይገንቡ።

## የዶክትሬት ተማሪዎች፦ ይህ መንገድ ፈጽሞ በተለየ ይሠራል

**1. ለኢትዮጵያ-ተወላጆች የተወሰነው መንገድ ተሰርዟል።** የ20.3.2024 የVATAT ውሳኔ የተለያዩ ፕሮግራሞችን — ለአረብ ማህበረሰብ፣ ለሐረዲ ማህበረሰብ፣ ለኢትዮጵያ-ተወላጆች — ወደ አንድ ፕሮግራም አዋህዷል። የተለየ መንገድ የሚገልጹ የዩኒቨርሲቲ ገጾች ያረጁ ቅጂዎች ናቸው።

**2. እርስዎ አያመለክቱም።** የስኮላርሺፑ ገጽ፦ **"የማመልከቻ ዘዴ፦ በተቋማት በኩል ብቻ።"** የታተመው ቀን — 1.6.2026 — **ተቋሙ** ለCHE የሚያስገባበት ቀን ነው። ለእርስዎ የሚመለከተው ቀን ውስጣዊና ቀደም ያለ ነው።

ተግባራዊ መደምደሚያ፦ ዶክትሬት ተማሪ ከሆኑ **ዛሬ** የምርምር ተማሪዎች ባለሥልጣንዎን ወይም የሬክተሩን ጽሕፈት ቤት ያግኙ።

## እንዴት መምረጥ፣ በሦስት ደረጃዎች

1. **መዕመድ ካገኙበት ጊዜ ዓመታቱን ይቁጠሩ** — ከዐሊያ ዓመት ሳይሆን፣ የማይቆጠረውን ወታደራዊ ወይም ብሔራዊ አገልግሎትም ሳይጨምር። ከ15 በላይ → ማሮም። ከዚያ በታች → አስተዳደሩ
2. **ትምህርት ሲጀምሩ ያለዎትን ዕድሜ ይፈትሹ** — በተስፋፋው መንገድ ለመጀመሪያ ዲግሪ 28፣ ለሁለተኛ ዲግሪ 40
3. **ምርጫ ካለዎት** — አስተዳደሩ የበለጠ ይሰጣል ግን የበለጠ ይጠይቃል። ማሮም መጠን ይሰጣል ጥቂት ይጠይቃል

በማንኛውም ሁኔታ፦ እስከ ዛሬ ድረስ ከሁለቱ መንገዶች አንዱ ብቻ ክፍት ነው።

## ይህንንም ይመልከቱ

- [እንዴት ማመልከት — ሙሉ ሂደቱ](/am/education/scholarships/guides/how-to-apply)
- [ምን ሰነዶች ያስፈልጋሉ](/am/education/scholarships/guides/documents-checklist)
- [ማመልከቻዎች ለምን ይከለከላሉ](/am/education/scholarships/guides/why-applications-are-refused)
`,
    },
  },
];

// --- Helpers ----------------------------------------------------------------

export function pickGuideLocale(t: Translatable, locale: Locale): string {
  return t[locale] ?? t[DEFAULT_LOCALE] ?? t.he;
}

export function getScholarshipGuide(slug: string): ScholarshipGuide | null {
  return SCHOLARSHIP_GUIDES.find((g) => g.slug === slug) ?? null;
}

export function allScholarshipGuideSlugs(): string[] {
  return SCHOLARSHIP_GUIDES.map((g) => g.slug);
}
