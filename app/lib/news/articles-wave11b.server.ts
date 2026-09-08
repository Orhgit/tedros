// Wave 11b articles — education and employment, manually researched and
// verified (2026-09-08), TED-163.
//
// Same discipline as waves 8 and 10: every item below rests on a primary
// source that was opened and read in full — the granting body's own page, a
// ministry circular, a CBS release PDF, a Knesset MMM PDF — not on a search
// snippet. Where two official pages disagree (Marom's amount, below), both are
// quoted and the granting body's current page wins, per ADR-021.
//
// Dropped rather than published: a civil-service representation piece built on
// the "3.9% / 0.3% senior posts (Dec 2024)" figures. Those numbers are widely
// repeated but the only carriers found were aggregators; the Civil Service
// Commission's own 2025 annual report describes the diversity unit's work and
// its public BI site without printing the community's representation rate, so
// the figures could not be traced to the source that produces them.
import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE11B: NewsArticleEntry[] = [
  {
    slug: "marom-scholarship-tashpaz-terms-change-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["education"],
    title: {
      he: 'מלגת מרום: מערכת ההרשמה סגורה ומציגה פתיחה בפברואר 2027 — בזמן ששני דפים רשמיים אומרים "ספטמבר 2026"',
      en: 'The Marom scholarship: the registration system is closed and shows an opening date of February 2027 — while two official pages say "September 2026"',
      am: "የማሮም ስኮላርሺፕ፦ የምዝገባ ሥርዓቱ ተዘግቷል የካቲት 2027 መክፈቻ ያሳያል — ሁለት ኦፊሴላዊ ገጾች ግን «ሴፕቴምበር 2026» ይላሉ",
    },
    excerpt: {
      he: 'שבוע לתוך ספטמבר, ההרשמה למלגת מרום עדיין לא נפתחה. מערכת ההרשמה של פר"ח מציגה "ההרשמה למרום סגורה כעת" ותאריך פתיחה 28.2.2027, בעוד דף המל"ג ודף פר"ח אומרים ספטמבר 2026. מה שכן מאומת: מתשפ"ז מבוטלת חובת ההתנדבות, והמלגה נקבעת כאחוז משכר הלימוד לפי תחום הלימוד.',
      en: 'A week into September, registration for the Marom scholarship has still not opened. Perach\'s registration system displays "Marom registration is currently closed" and an opening date of 28.2.2027, while the CHE page and the Perach content page both say September 2026. What is verified: from 5787 the volunteering requirement is abolished, and the scholarship is set as a percentage of tuition by field of study.',
      am: "ወደ ሴፕቴምበር አንድ ሳምንት ገብቷል፤ የማሮም ስኮላርሺፕ ምዝገባ ገና አልተከፈተም። የፔራች የምዝገባ ሥርዓት «የማሮም ምዝገባ አሁን ተዘግቷል» እና የመክፈቻ ቀን 28.2.2027 ያሳያል፤ የCHE ገጽና የፔራች ገጽ ግን ሴፕቴምበር 2026 ይላሉ። የተረጋገጠው፦ ከ5787 ጀምሮ የበጎ ፈቃድ ግዴታ ይሰረዛል፣ ስኮላርሺፑም በጥናት መስክ መሠረት ከትምህርት ክፍያ በመቶኛ ይወሰናል።",
    },
    bodies: {
      he: `## מה בדקנו, ומה מצאנו

בדקנו היום (8.9.2026) שלושה מקורות רשמיים של אותה מלגה. הם אינם אומרים את אותו דבר.

**1. דף מלגת מרום של המועצה להשכלה גבוהה (מל"ג):** "תקופת ההרשמה למלגה נפתחת בחודש ספטמבר מדי שנה ונסגרת בתחילת נובמבר".

**2. דף "הגשת מועמדות" של פר"ח**, הגוף שמפעיל את התכנית: "ההרשמה לשנה הקרובה תשפ"ז תיפתח במהלך חודש ספטמבר 2026".

**3. מערכת ההרשמה עצמה** — זו שאליה שני הדפים האלה שולחים אתכם. נכון להיום היא מציגה:

> **"ההרשמה למרום סגורה כעת. ההרשמה לשנת הפעילות תשפ"ז תפתח ב-28/02/27 בשעה 08:00."**

זו לא אי-הבנה של תאריך: 28 בפברואר 2027 הוא כחמישה חודשים וחצי אחרי החלון שהדפים מבטיחים, וארבעה חודשים אחרי מועד הסגירה שהמל"ג מפרסמת.

## מה זה אומר בפועל

**נכון ל-8 בספטמבר 2026, אי אפשר להירשם למלגת מרום.** אם שמעתם ש"ההרשמה נפתחת בספטמבר" — זה נכון כמדיניות כתובה, ולא נכון כרגע כמצב בפועל.

אנחנו לא יודעים אם 28.2.27 הוא מועד אמיתי, ברירת מחדל של המערכת, או תאריך שטרם עודכן. **לא נציג ניחוש כעובדה.** מה שכן ברור: אין טעם לפתוח את טופס ההרשמה השבוע, ויש טעם לשאול.

**מי לשאול:** צוות מרום בפר"ח — milga.marom@perach-il.org · 054-7731216 (גם בוואטסאפ) · מענה טלפוני א'–ה' 8:00–15:00. מוקד פר"ח הכללי: 1-599-550-500.

אנחנו נבדוק שוב ונעדכן את הכתבה הזאת.

## השינוי המרכזי: חובת ההתנדבות מבוטלת

בדף מלגת מרום של המל"ג נכתב במפורש: **"החל מתשפ"ז תבוטל חובת ההתנדבות במלגה, וזאת על מנת לאפשר בקלות לקבל את המלגה עם מלגות אחרות הדורשות התנדבות כגון מלגת פר"ח."**

המשמעות המעשית ישירה: עד כה מלגאי מרום לתואר ראשון נדרשו לשעות התנדבות בקהילה שהחלו סביב מרץ–אפריל. מי שכבר התנדב במסגרת מלגה אחרת נאלץ לבחור. מתשפ"ז אפשר לצבור את שתיהן על אותן שעות.

## גובה המלגה — אחוז משכר הלימוד, לפי תחום הלימוד

לפי טבלת גובה המלגה בדף המל"ג, המלגה לתואר ראשון משולמת כאחוז משכר הלימוד, לפי **רמת העדיפות** של מקצוע הלימודים:

| רמת עדיפות | אחוז משכר הלימוד |
| ---------- | ---------------- |
| א'         | 100%             |
| ב'         | 85%              |
| ג'         | 66%              |
| ד'         | 50%              |

לתואר שני: **תואר שני מחקרי — 100%** משכר הלימוד; **תואר שני שאינו מחקרי — 85%**. הדף מוסיף שסוג התואר השני נבחן בכל שנה בנפרד.

מקור: [מלגת מרום — המועצה להשכלה גבוהה](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · נבדק ספטמבר 2026.

## מהי "רמת עדיפות"

זו אינה שאלה של ציונים אלא של תחום. המל"ג החליטה ב-18.6.2024, בעקבות המלצות ועדת ההיגוי לקידום מצוינות בהשכלה הגבוהה בקרב יוצאי אתיופיה, לעדכן את סיווג תחומי הלימוד לארבע רמות עדיפות. אמות המידה, כלשון ההחלטה: צורכי המשק ושוק העבודה, תחומים שבהם סיכויי הבוגרים לתעסוקה איכותית גבוהים יחסית, ותחומים שבהם קיים ייצוג חסר ליוצאי אתיופיה.

באותה החלטה נקבע גם מדד הצלחה: שיעור הסטודנטים יוצאי אתיופיה לתואר ראשון ברמות עדיפות א' ו-ב' יגדל ב-5 נקודות אחוז — **מ-45% ל-50%** — בלי ששיעור הלומדים ברמה ג' יקטן.

הטבלה המלאה, תחום אחר תחום, מופיעה בגוף ההחלטה. אנחנו לא משכפלים אותה כאן: הסיווג נקבע לפי תכנית ולפי מוסד, ורמת עדיפות שגויה שווה כאן הפרש של עשרות אחוזים משכר לימוד. **בדקו את התחום שלכם בטבלה עצמה** לפני שאתם מסתמכים על סכום.

## מי זכאי להירשם

לפי דף המל"ג:

- **סטודנטים יוצאי אתיופיה בלבד**, הנמצאים בארץ מעל 15 שנה או ילידי הארץ שהוריהם נולדו באתיופיה.
- לימודים בהיקף של **לפחות 70%** מהיקף הלימודים המצטבר הנדרש עד השנה הנוכחית ועד בכלל.
- תכנית אקדמית המוכרת על ידי המל"ג.
- מי שהתחיל בסמסטר ב' יכול להירשם במועד זה, ואם יימצא זכאי — יקבל את המלגה רטרואקטיבית.

**מי שנמצא בארץ פחות מ-15 שנה אינו מחוץ לתמונה.** דף המל"ג מפנה אותו למלגות המקבילות של [המינהל לסטודנטים עולים במשרד העלייה והקליטה](/he/news/student-authority-ethiopian-extended-eligibility-2026) — מסלול נפרד עם תנאים משלו, שגם הרשמתו פתוחה כעת.

## תיקון לכתבה קודמת שלנו

בפברואר 2026 פרסמנו כתבה על [מלגת מרום לקראת מחזור תשפ"ז](/he/news/marom-scholarship-tashpav-cycle). שני פרטים בה אינם עומדים מול המקורות שקראנו כעת, ואנחנו מתקנים אותם:

1. **הסכום.** כתבנו "₪10,000 קבועים לשנת לימודים". דף המל"ג הנוכחי אינו נוקב בסכום קבוע לתואר ראשון אלא באחוז משכר הלימוד לפי רמת עדיפות. הסכום הקבוע של ₪10,000 מופיע היום רק בדף פר"ח, ורק לתואר שני שאינו מחקרי — ואותו דף עצמו מכריז שהתנאים משתנים. הלכנו לפי דף הגוף המעניק.
2. **ערוץ ההרשמה.** כתבנו שההרשמה נעשית ישירות דרך המל"ג ו"לא דרך פר"ח". זה שגוי: דף המל"ג קובע ש**"התכנית מופעלת על ידי ארגון פר"ח במכון דוידסון"**, וההרשמה בפועל מתבצעת דרך לשונית "מרום" באתר פר"ח.

גם התאריך "9 בספטמבר" שהופיע שם דורש זהירות: 9.9.2025 הוא מועד הפתיחה של מחזור **תשפ"ו**, כפי שמופיע עד היום בדף של משרד העלייה והקליטה. לתשפ"ז שני המקורות אומרים "ספטמבר 2026" בלי לנקוב ביום.

## מה שעדיין לא פורסם — ושווה להמתין לו

דף פר"ח מודיע: "החל משנה הבאה (תשפ"ז) ישתנו תנאי מלגת מרום עבור נרשמים חדשים... המידע המפורט לגבי תנאי ההרשמה, חישוב הזכאות וגובה המלגה יפורסם במסודר לקראת ההרשמה בתחילת תשפ"ז (ספטמבר 2026)".

עד לפרסום הזה, התנאים המפורטים שעדיין מופיעים באותו דף — 680 מקומות לתואר ראשון, ניקוד לפי מצב סוציו-אקונומי ותחום לימוד, כפל מלגות עד ₪30,000 בשנה, ₪10,000 לתואר שני לא מחקרי — הם תנאי המחזור הקודם. אל תבנו עליהם תכנית כלכלית לשנה הבאה.

## מה כן אפשר לעשות השבוע

1. **להכין את המסמכים.** הם לא ישתנו, ולפי דף פר"ח יש להעלות את כולם בזמן ההרשמה.
2. **לבדוק זכאות למסלול אחר שההרשמה אליו פתוחה עכשיו.** אם אתם בתוך 15 שנה מקבלת מעמד עולה, [המינהל לסטודנטים עולים פתח את ההרשמה לתשפ"ז](/he/news/student-authority-ethiopian-extended-eligibility-2026), עם מועד של 1 באוקטובר לסטודנטים ממשיכים ו-10 בנובמבר לחדשים. שם המועדים חיים.
3. **לשאול את פר"ח מה התאריך האמיתי**, ולא להסתמך על דף שמנוסח בלשון עתיד מאז אוגוסט.

## הלוח כפי שהמדיניות מתארת אותו

זהו התהליך כפי שהוא כתוב — לא לוח מאושר למחזור הזה:

- **ספטמבר** — ההרשמה אמורה להיפתח, דרך לשונית "מרום" באתר פר"ח.
- **תחילת נובמבר** — ההרשמה אמורה להיסגר.
- **דצמבר** — הודעת זכאות או אי-זכאות במייל. במקרה של דחייה, בחלק מהמקרים אפשר להגיש ערעור.
- המלגה משולמת בשתי פעימות לאורך השנה.

**להכין מראש** (לפי דף המל"ג): תעודת זהות עם ספח, אישור לימודים רשמי, אישור בעלות על חשבון בנק, תעודות זהות של ההורים, תלושי שכר, ואישור לימודים של אח או אחות סטודנטים אם יש. הכול ב-PDF.

**ליצירת קשר עם צוות מרום בפר"ח:** milga.marom@perach-il.org · 054-7731216 (גם בוואטסאפ) · מענה טלפוני א'–ה' 8:00–15:00.

## מקורות

- [מלגת מרום — המועצה להשכלה גבוהה (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — נקרא במלואו 8.9.2026
- [החלטת מל"ג 18.6.2024 — עדכון תיעדוף תחומי לימוד ליוצאי אתיופיה](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/)
- [פר"ח — פרטים נוספים בהרשמה למלגת מרום](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D)
- [מערכת ההרשמה של פר"ח למרום — מציגה "ההרשמה סגורה כעת" ופתיחה ב-28/02/27](https://perach-prj.weizmann.ac.il/PerachStudent/registrationmarom) — נבדקה 8.9.2026
- [הכתבה שלנו מפברואר 2026, שפרטים בה מתוקנים כאן](/he/news/marom-scholarship-tashpav-cycle)
- [דף הזכות המלא של מלגת מרום באתר טדרוס](/he/education/scholarships/marom-che)`,
      en: `## What we checked, and what we found

Today (8.9.2026) we checked three official sources on the same scholarship. They do not say the same thing.

**1. The Council for Higher Education's (CHE) Marom page:** "the registration period opens in September each year and closes in early November."

**2. Perach's "submitting a candidacy" page**, Perach being the organization that operates the programme: "registration for the coming year, 5787, will open during September 2026."

**3. The registration system itself** — the one both of those pages send you to. As of today it displays:

> **"Marom registration is currently closed. Registration for the 5787 activity year will open on 28/02/27 at 08:00."**

This is not a misreading of a date: February 28, 2027 is some five and a half months after the window the pages promise, and four months after the closing date the CHE publishes.

## What this means in practice

**As of September 8, 2026, you cannot register for the Marom scholarship.** If you heard that "registration opens in September" — that is correct as written policy, and not correct right now as a state of affairs.

We do not know whether 28.2.27 is a real date, a system default, or a date that has simply not been updated. **We will not present a guess as a fact.** What is clear: there is no point opening the registration form this week, and there is a point in asking.

**Who to ask:** the Marom team at Perach — milga.marom@perach-il.org · 054-7731216 (also WhatsApp) · phone Sun–Thu 8:00–15:00. Perach's general line: 1-599-550-500.

We will check again and update this article.

## The main change: the volunteering requirement is abolished

The CHE's Marom page states plainly: **"From 5787 the scholarship's volunteering requirement will be abolished, in order to make it easy to hold this scholarship together with other scholarships that require volunteering, such as the Perach scholarship."**

The practical meaning is direct. Until now, Marom undergraduates owed community volunteering hours starting around March–April. Anyone already volunteering for another scholarship had to choose. From 5787 the same hours can carry both.

## The amount — a percentage of tuition, by field of study

Per the amounts table on the CHE page, the undergraduate scholarship is paid as a percentage of tuition, according to the **priority level** of the field of study:

| Priority level | Share of tuition |
| -------------- | ---------------- |
| A              | 100%             |
| B              | 85%              |
| C              | 66%              |
| D              | 50%              |

For master's degrees: **research master's — 100%** of tuition; **non-research master's — 85%**. The page adds that the type of master's degree is assessed separately each year.

Source: [Marom scholarship — Council for Higher Education](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · verified September 2026.

## What a "priority level" is

This is not about grades; it is about the field. On June 18, 2024, following the recommendations of the steering committee for advancing academic excellence among Ethiopian-Israelis, the CHE decided to update the classification of fields of study into four priority levels. The criteria, in the decision's own words: the needs of the economy and the labour market, fields where graduates' chances of quality employment are relatively high, and fields in which Ethiopian-Israelis are under-represented.

The same decision set a success measure: the share of Ethiopian-Israeli undergraduates in priority levels A and B is to rise by 5 percentage points — **from 45% to 50%** — without the share in level C falling.

The full field-by-field table is in the body of the decision. We are not reproducing it here: the classification depends on the programme and the institution, and a wrong priority level is worth tens of percent of tuition. **Check your own field in the table itself** before relying on a number.

## Who may register

Per the CHE page:

- **Students of Ethiopian origin only**, in Israel more than 15 years, or Israeli-born to parents born in Ethiopia.
- A course load of **at least 70%** of the cumulative study requirement up to and including the current year.
- A programme recognized by the CHE.
- Students who began in the spring semester may register in this round and, if found eligible, receive the scholarship retroactively.

**Those in Israel less than 15 years are not out of the picture.** The CHE page directs them to the parallel scholarships of the [Students Authority at the Ministry of Aliyah and Integration](/en/news/student-authority-ethiopian-extended-eligibility-2026) — a separate track with its own terms, also open for applications right now.

## A correction to an earlier article of ours

In February 2026 we published an article on [the Marom scholarship ahead of the 5787 cycle](/en/news/marom-scholarship-tashpav-cycle). Two details in it do not survive the sources we have now read, and we are correcting them:

1. **The amount.** We wrote "a flat ₪10,000 per academic year." The current CHE page names no flat undergraduate sum; it names a percentage of tuition by priority level. The ₪10,000 figure appears today only on the Perach page, and only for a non-research master's — and that same page announces that the terms are changing. We follow the granting body's own page.
2. **The registration channel.** We wrote that registration is done directly through the CHE and "not through Perach." That is wrong: the CHE page states that **"the programme is operated by the Perach organization at the Davidson Institute,"** and registration is in fact done through the "Marom" tab on Perach's site.

The date "September 9" that appeared there also needs care: 9.9.2025 was the opening date of the **5786** cycle, as the Ministry of Aliyah and Integration's page still shows today. For 5787 both sources say "September 2026" without naming a day.

## What has not been published yet — and is worth waiting for

The Perach page announces: "From next year (5787) the terms of the Marom scholarship will change for new applicants... Detailed information on the registration terms, the eligibility calculation and the amount of the scholarship will be published in an orderly way ahead of registration at the start of 5787 (September 2026)."

Until that publication, the detailed terms still shown on that same page — 680 undergraduate places, scoring by socio-economic status and field of study, stacked scholarships up to ₪30,000 a year, ₪10,000 for a non-research master's — are the previous cycle's terms. Do not build next year's budget on them.

## What you can do this week

1. **Get the documents ready.** They will not change, and per the Perach page all of them must be uploaded at the time of registration.
2. **Check eligibility for another track that is open right now.** If you are within 15 years of receiving oleh status, [the Students Authority has opened applications for 5787](/en/news/student-authority-ethiopian-extended-eligibility-2026), with October 1 for continuing students and November 10 for new ones. Those deadlines are live.
3. **Ask Perach what the real date is**, rather than relying on a page that has been written in the future tense since August.

## The timeline as the policy describes it

This is the process as written — not a confirmed schedule for this cycle:

- **September** — registration is supposed to open, through the "Marom" tab on Perach's site.
- **Early November** — registration is supposed to close.
- **December** — an eligibility or non-eligibility notice by email. If rejected, an appeal is possible in some cases.
- The scholarship is paid in two instalments over the year.

**Prepare in advance** (per the CHE page): ID card with the attached page, an official enrolment confirmation, proof of bank account ownership, parents' ID cards, payslips, and an enrolment confirmation for a sibling who is also a student, if there is one. All in PDF.

**To contact the Marom team at Perach:** milga.marom@perach-il.org · 054-7731216 (also WhatsApp) · phone Sun–Thu 8:00–15:00.

## Sources

- [Marom scholarship — Council for Higher Education (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — read in full 8.9.2026
- [CHE decision, June 18, 2024 — updating the prioritization of fields of study for Ethiopian-Israelis](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/)
- [Perach — further details on registering for Marom](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D)
- [Perach's Marom registration system — displays "registration is currently closed" and an opening on 28/02/27](https://perach-prj.weizmann.ac.il/PerachStudent/registrationmarom) — checked 8.9.2026
- [Our February 2026 article, details of which are corrected here](/en/news/marom-scholarship-tashpav-cycle)
- [The full Marom rights page on Tedros](/en/education/scholarships/marom-che)`,
      am: `## ምን መረመርን፣ ምንስ አገኘን

ዛሬ (8.9.2026) ስለ አንድ ስኮላርሺፕ ሦስት ኦፊሴላዊ ምንጮችን መርምረናል። አንድ ዓይነት ነገር አይሉም።

**1. የከፍተኛ ትምህርት ምክር ቤት (CHE) የማሮም ገጽ፦** «የምዝገባ ጊዜው በየዓመቱ በሴፕቴምበር ይከፈታል በኖቬምበር መጀመሪያ ይዘጋል»።

**2. ፕሮግራሙን የሚያንቀሳቅሰው የፔራች «ማመልከቻ ማቅረብ» ገጽ፦** «ለሚመጣው 5787 ዓመት ምዝገባ በሴፕቴምበር 2026 ውስጥ ይከፈታል»።

**3. የምዝገባ ሥርዓቱ ራሱ** — ሁለቱም ገጾች የሚልኩበት። ዛሬ እንደሚያሳየው፦

> **«የማሮም ምዝገባ አሁን ተዘግቷል። ለ5787 የእንቅስቃሴ ዓመት ምዝገባ በ28/02/27 ከጠዋቱ 08:00 ይከፈታል።»**

ይህ የቀን አለመረዳት አይደለም፦ የካቲት 28, 2027 ገጾቹ ከሚሉት መስኮት አምስት ወር ተኩል ገደማ በኋላ ነው፣ CHE ከሚያሳውቀው የመዝጊያ ቀንም አራት ወር በኋላ።

## በተግባር ምን ማለት ነው

**እስከ ሴፕቴምበር 8, 2026 ድረስ ለማሮም ስኮላርሺፕ መመዝገብ አይቻልም።** «ምዝገባ በሴፕቴምበር ይከፈታል» የሚል ከሰሙ — እንደ የተጻፈ ፖሊሲ ትክክል ነው፣ አሁን ባለው ተጨባጭ ሁኔታ ግን ትክክል አይደለም።

28.2.27 እውነተኛ ቀን፣ የሥርዓቱ ነባሪ ወይም ያልተዘመነ ቀን መሆኑን አናውቅም። **ግምትን እንደ እውነት አናቀርብም።** ግልጽ የሆነው፦ በዚህ ሳምንት የምዝገባ ቅጹን መክፈት ትርጉም የለውም፤ መጠየቅ ግን ትርጉም አለው።

**ማንን መጠየቅ፦** በፔራች የማሮም ቡድን — milga.marom@perach-il.org · 054-7731216 (በዋትስአፕም) · ስልክ እሑድ–ሐሙስ 8:00–15:00። የፔራች አጠቃላይ መስመር፦ 1-599-550-500።

እንደገና መርምረን ይህን ጽሑፍ እናዘምናለን።

## ዋናው ለውጥ፦ የበጎ ፈቃድ ግዴታ ይሰረዛል

የCHE የማሮም ገጽ በግልጽ ይላል፦ **«ከ5787 ጀምሮ የስኮላርሺፑ የበጎ ፈቃድ ግዴታ ይሰረዛል፤ ይህም እንደ ፔራች ስኮላርሺፕ ያሉ በጎ ፈቃድ ከሚጠይቁ ሌሎች ስኮላርሺፖች ጋር በቀላሉ ለመያዝ እንዲቻል ነው።»**

ተግባራዊ ትርጉሙ ቀጥተኛ ነው። እስከ አሁን የመጀመሪያ ዲግሪ የማሮም ተማሪዎች ከመጋቢት–ሚያዝያ ገደማ ጀምሮ የማህበረሰብ የበጎ ፈቃድ ሰዓታት ይጠበቅባቸው ነበር። በሌላ ስኮላርሺፕ ስር አስቀድሞ በጎ ፈቃድ ሲሠራ የነበረ መምረጥ ነበረበት። ከ5787 ጀምሮ ተመሳሳይ ሰዓታት ለሁለቱም ሊቆጠሩ ይችላሉ።

## መጠኑ — በጥናት መስክ መሠረት ከትምህርት ክፍያ በመቶኛ

በCHE ገጽ ላይ ባለው ሠንጠረዥ መሠረት፣ የመጀመሪያ ዲግሪ ስኮላርሺፕ በጥናት መስኩ **ቅድሚያ ደረጃ** መሠረት ከትምህርት ክፍያ በመቶኛ ይከፈላል፦

| ቅድሚያ ደረጃ | ከትምህርት ክፍያ ድርሻ |
| --------- | ---------------- |
| ሀ         | 100%             |
| ለ         | 85%              |
| ሐ         | 66%              |
| መ         | 50%              |

ለሁለተኛ ዲግሪ፦ **የምርምር ሁለተኛ ዲግሪ — 100%**፤ **የምርምር ያልሆነ ሁለተኛ ዲግሪ — 85%**። ገጹ የሁለተኛ ዲግሪው ዓይነት በየዓመቱ በተናጠል እንደሚመረመር ይጨምራል።

ምንጭ፦ [ማሮም ስኮላርሺፕ — የከፍተኛ ትምህርት ምክር ቤት](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) · በሴፕቴምበር 2026 ተረጋግጧል።

## «ቅድሚያ ደረጃ» ማለት ምን ማለት ነው

ይህ ስለ ውጤት ሳይሆን ስለ መስክ ነው። CHE በሰኔ 18, 2024 በኢትዮጵያ-እስራኤላውያን መካከል የአካዳሚ ብቃትን ለማሳደግ የሚሠራው መሪ ኮሚቴ ምክረ ሐሳብ ተከትሎ የጥናት መስኮችን ወደ አራት ቅድሚያ ደረጃዎች መከፋፈል አዘምኗል። መስፈርቶቹ በውሳኔው ቃል፦ የኢኮኖሚና የሥራ ገበያ ፍላጎቶች፣ ተመራቂዎች ጥራት ያለው ሥራ የማግኘት ዕድላቸው ከፍ ያለባቸው መስኮች፣ እና ኢትዮጵያ-እስራኤላውያን ውክልና የሚያንሳቸው መስኮች።

ያው ውሳኔ የስኬት መለኪያም አስቀምጧል፦ በቅድሚያ ደረጃ ሀ እና ለ ያሉ የመጀመሪያ ዲግሪ ኢትዮጵያ-እስራኤላውያን ተማሪዎች ድርሻ በ5 በመቶ ነጥብ — **ከ45% ወደ 50%** — እንዲያድግ፣ የደረጃ ሐ ድርሻ ሳይቀንስ።

ሙሉው መስክ-በ-መስክ ሠንጠረዥ በውሳኔው ውስጥ አለ። እዚህ አንደግመውም፦ ምደባው በፕሮግራምና በተቋም ይወሰናል፣ የተሳሳተ ደረጃ ደግሞ በአስር በመቶዎች የሚቆጠር የትምህርት ክፍያ ልዩነት ያስከትላል። በቁጥር ላይ ከመመሥረትዎ በፊት **የራስዎን መስክ በሠንጠረዡ ውስጥ ይመልከቱ**።

## ማን መመዝገብ ይችላል

በCHE ገጽ መሠረት፦

- **የኢትዮጵያ ተወላጅ ተማሪዎች ብቻ**፣ በእስራኤል ከ15 ዓመት በላይ የቆዩ ወይም በእስራኤል የተወለዱ ወላጆቻቸው በኢትዮጵያ የተወለዱ።
- እስከ አሁኑ ዓመት ድረስ ከሚጠበቀው ጠቅላላ የጥናት መጠን **ቢያንስ 70%**።
- በCHE የታወቀ የአካዳሚ ፕሮግራም።
- በጸደይ ሴሚስተር የጀመሩ በዚህ ዙር መመዝገብ ይችላሉ፤ ብቁ ከሆኑም ስኮላርሺፑን በኋላ ቀር ይቀበላሉ።

**በእስራኤል ከ15 ዓመት በታች የቆዩ ከሥዕሉ ውጪ አይደሉም።** የCHE ገጽ ወደ [የዓሊያና ውህደት ሚኒስቴር የስደተኛ ተማሪዎች አስተዳደር](/am/news/student-authority-ethiopian-extended-eligibility-2026) ትይዩ ስኮላርሺፖች ይመራቸዋል — የራሱ ሁኔታዎች ያሉት የተለየ መስመር፣ እሱም አሁን ክፍት ነው።

## ለቀድሞ ጽሑፋችን ማስተካከያ

በየካቲት 2026 [ስለ ማሮም ስኮላርሺፕ ለ5787 ዙር](/am/news/marom-scholarship-tashpav-cycle) ጽሑፍ አሳትመናል። ሁለት ዝርዝሮች አሁን ካነበብናቸው ምንጮች ጋር አይጣጣሙም፤ እናስተካክላቸዋለን፦

1. **መጠኑ።** «በዓመት ቋሚ ₪10,000» ብለን ጽፈን ነበር። አሁን ያለው የCHE ገጽ ለመጀመሪያ ዲግሪ ቋሚ ገንዘብ አይጠቅስም፤ በቅድሚያ ደረጃ መሠረት ከትምህርት ክፍያ በመቶኛ ይጠቅሳል። የ₪10,000 ቁጥር ዛሬ የሚታየው በፔራች ገጽ ላይ ብቻ ነው፣ ለምርምር ላልሆነ ሁለተኛ ዲግሪ ብቻ — ያውም ገጽ ራሱ ሁኔታዎቹ እየተለወጡ መሆኑን ያሳውቃል። የሰጪውን አካል ገጽ ተከትለናል።
2. **የምዝገባ መንገዱ።** ምዝገባው በቀጥታ በCHE በኩል እንደሆነና «በፔራች በኩል አይደለም» ብለን ጽፈን ነበር። ይህ ስህተት ነው፦ የCHE ገጽ **«ፕሮግራሙ በዳቪድሰን ኢንስቲትዩት በሚገኘው የፔራች ድርጅት ይንቀሳቀሳል»** ይላል፣ ምዝገባውም በፔራች ድረ-ገጽ «ማሮም» ትር ይከናወናል።

እዚያ የታየው «ሴፕቴምበር 9» ቀንም ጥንቃቄ ይፈልጋል፦ 9.9.2025 የ**5786** ዙር መክፈቻ ቀን ነበር፣ የዓሊያና ውህደት ሚኒስቴር ገጽ ዛሬም እንደሚያሳየው። ለ5787 ሁለቱም ምንጮች ቀን ሳይጠቅሱ «ሴፕቴምበር 2026» ይላሉ።

## ገና ያልታተመው — መጠበቅ የሚገባው

የፔራች ገጽ ያሳውቃል፦ «ከሚቀጥለው ዓመት (5787) ጀምሮ የማሮም ስኮላርሺፕ ሁኔታዎች ለአዲስ ተመዝጋቢዎች ይለወጣሉ... ስለ ምዝገባ ሁኔታዎች፣ የብቁነት ስሌትና የስኮላርሺፑ መጠን ዝርዝር መረጃ በ5787 መጀመሪያ (ሴፕቴምበር 2026) ከምዝገባው በፊት በሥርዓት ይታተማል»።

እስከዚያ ድረስ በዚያው ገጽ ላይ የሚታዩት ዝርዝር ሁኔታዎች — 680 የመጀመሪያ ዲግሪ ቦታዎች፣ በማህበራዊ-ኢኮኖሚያዊ ሁኔታና በጥናት መስክ የሚሰጥ ነጥብ፣ በዓመት እስከ ₪30,000 የተደራረቡ ስኮላርሺፖች፣ ለምርምር ላልሆነ ሁለተኛ ዲግሪ ₪10,000 — የቀድሞው ዙር ሁኔታዎች ናቸው። የሚቀጥለውን ዓመት በጀትዎን በእነሱ ላይ አይመሥርቱ።

## በዚህ ሳምንት ምን ማድረግ ይቻላል

1. **ሰነዶቹን ያዘጋጁ።** አይለወጡም፤ በፔራች ገጽ መሠረትም ሁሉም በምዝገባ ጊዜ መጫን አለባቸው።
2. **አሁን ክፍት የሆነ ሌላ መስመር ብቁነትዎን ይፈትሹ።** የስደተኛ መቀበያ ከተሰጠዎት በ15 ዓመት ውስጥ ከሆኑ፣ [የስደተኛ ተማሪዎች አስተዳደር ለ5787 ምዝገባ ከፍቷል](/am/news/student-authority-ethiopian-extended-eligibility-2026)፤ ለቀጣይ ተማሪዎች ኦክቶበር 1፣ ለአዲሶች ኖቬምበር 10። እነዚያ ቀነ ገደቦች በሥራ ላይ ናቸው።
3. **ትክክለኛው ቀን ምን እንደሆነ ፔራችን ይጠይቁ** — ከኦገስት ጀምሮ በመጪ ጊዜ ቅርጽ በተጻፈ ገጽ ላይ አይመኩ።

## ፖሊሲው እንደሚገልጸው የጊዜ ሰሌዳ

ይህ እንደተጻፈው ሂደት ነው — ለዚህ ዙር የጸደቀ መርሐ ግብር አይደለም፦

- **ሴፕቴምበር** — ምዝገባ መከፈት ነበረበት፣ በፔራች ድረ-ገጽ «ማሮም» ትር።
- **የኖቬምበር መጀመሪያ** — ምዝገባ መዘጋት ነበረበት።
- **ዲሴምበር** — የብቁነት ወይም ብቁ ያለመሆን ማሳወቂያ በኢሜይል። ውድቅ ከሆነ በአንዳንድ ሁኔታዎች ይግባኝ ይቻላል።
- ስኮላርሺፑ በዓመቱ ውስጥ በሁለት ክፍያ ይሰጣል።

**አስቀድመው ያዘጋጁ** (በCHE ገጽ መሠረት)፦ መታወቂያ ከተያያዘው ወረቀት ጋር፣ ኦፊሴላዊ የትምህርት ማረጋገጫ፣ የባንክ ሒሳብ ባለቤትነት ማረጋገጫ፣ የወላጆች መታወቂያ፣ የደመወዝ ወረቀቶች፣ እና ተማሪ የሆነ ወንድም/እህት ካለ የእሱ/የእሷ የትምህርት ማረጋገጫ። ሁሉም በPDF።

**በፔራች የማሮም ቡድንን ለማግኘት፦** milga.marom@perach-il.org · 054-7731216 (በዋትስአፕም) · ስልክ እሑድ–ሐሙስ 8:00–15:00።

## ምንጮች

- [ማሮም ስኮላርሺፕ — የከፍተኛ ትምህርት ምክር ቤት (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — ሙሉ በሙሉ የተነበበ 8.9.2026
- [የCHE ውሳኔ፣ ሰኔ 18, 2024 — ለኢትዮጵያ-እስራኤላውያን የጥናት መስኮች ቅድሚያ ማዘመን](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/)
- [ፔራች — ለማሮም ስለ መመዝገብ ተጨማሪ ዝርዝሮች](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D)
- [የፔራች የማሮም ምዝገባ ሥርዓት — «ምዝገባ አሁን ተዘግቷል» እና በ28/02/27 መከፈቻ ያሳያል](https://perach-prj.weizmann.ac.il/PerachStudent/registrationmarom) — በ8.9.2026 ተመርምሯል
- [የየካቲት 2026 ጽሑፋችን፣ ዝርዝሮቹ እዚህ የተስተካከሉ](/am/news/marom-scholarship-tashpav-cycle)
- [በትድሮስ ላይ ያለው ሙሉ የማሮም መብት ገጽ](/am/education/scholarships/marom-che)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "student-authority-ethiopian-extended-eligibility-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["education"],
    title: {
      he: 'ההרשמה למינהל לסטודנטים עולים לתשפ"ז פתוחה — ולעולי אתיופיה יש תנאי זכאות מורחבים. אלה ההבדלים',
      en: "Applications to the Students Authority for 5787 are open — and olim from Ethiopia have extended eligibility. Here are the differences",
      am: "ለ5787 የስደተኛ ተማሪዎች አስተዳደር ምዝገባ ክፍት ነው — ከኢትዮጵያ ለመጡ ደግሞ የተስፋፋ ብቁነት አለ። ልዩነቶቹ እነሆ",
    },
    excerpt: {
      he: 'המינהל לסטודנטים עולים פתח את ההרשמה לתשפ"ז. לעולים מאתיופיה, מתימן ולבני המנשה יש מסלול זכאות מורחב: 15 שנה מקבלת המעמד לתחילת הלימודים במקום 36 חודשים, גיל מרבי גבוה יותר, מימון תואר שני בנוסף לראשון, ומלגת קיום של ₪600 לחודש. סטודנטים ממשיכים — עד 1 באוקטובר.',
      en: "The Students Authority has opened applications for 5787. Olim from Ethiopia, from Yemen, and Bnei Menashe have an extended eligibility track: 15 years from receiving status to the start of studies instead of 36 months, higher age ceilings, master's funding on top of a bachelor's, and a ₪600 monthly living stipend. Continuing students: by October 1.",
      am: "የስደተኛ ተማሪዎች አስተዳደር ለ5787 ምዝገባ ከፍቷል። ከኢትዮጵያ፣ ከየመንና ቤኔ ምናሼ ለመጡ የተስፋፋ የብቁነት መስመር አለ፦ ትምህርት ለመጀመር ከ36 ወር ይልቅ ከመቀበያ ቀን 15 ዓመት፣ ከፍ ያለ የዕድሜ ጣሪያ፣ ከመጀመሪያ ዲግሪ በተጨማሪ የሁለተኛ ዲግሪ ድጋፍ፣ እና በወር ₪600 የመተዳደሪያ ስኮላርሺፕ። ቀጣይ ተማሪዎች፦ እስከ ኦክቶበር 1።",
    },
    bodies: {
      he: `## ההרשמה פתוחה — ושני מועדים כבר קרובים

בדף השירות של המינהל לסטודנטים עולים כתוב היום: **"ההרשמה לשנת הלימודים תשפ"ז (2026-2027) נפתחה".** המועדים, כלשון הדף:

- **סטודנטים ממשיכים** בסמסטר א' — עד **1 באוקטובר**.
- **סטודנטים חדשים** בסמסטר א' — עד **10 בנובמבר**.
- מתחילים בסמסטר ב' — עד 1 באפריל. מתחילים בסמסטר קיץ — עד 15 באוגוסט.

לצד זה הדף קובע שורה שכדאי לקרוא לפני שדוחים את הטיפול: **"לא ניתן לקבל סיוע רטרואקטיבי"**, ושיש להגיש בקשה מקוונת מחדש בכל שנה או סמסטר.

## מה מורחב, בדיוק

למינהל יש דף ייעודי בשם "תנאי זכאות מורחבים לעולים מאתיופיה, יוצאי תימן ובני המנשה". קראנו אותו לצד דף תנאי הזכאות הכלליים, כדי לבדוק מה באמת שונה — ולא להציג הטבה כללית כאילו היא ייחודית לקהילה. ההבדלים אמיתיים, והם אלה:

| | המסלול הכללי | המסלול המורחב |
| --- | --- | --- |
| חלון הזמן מקבלת המעמד עד תחילת הלימודים | **36 חודשים** | **15 שנים** |
| גיל מרבי בתחילת הלימודים — תואר ראשון / הנדסאי / לימודי תעודה | עד 27 | **עד 28** |
| גיל מרבי — תואר שני / הסבה לבעלי תואר | עד 30 | **עד 40** |
| מימון תואר שני בנוסף לתואר ראשון | לא, למעט חריגים | **כן, מפורשות** |
| מלגת קיום | לא נכללת בתנאים הכלליים | **כן** |

בשני המסלולים תקופת שירות צבאי או לאומי אינה נספרת בתוך חלון הזמן.

ההרחבה של 36 חודשים ל-15 שנים היא ההבדל המשמעותי ביותר. מי שעלה כילד, שירת, עבד כמה שנים ורק אז החליט ללמוד — במסלול הכללי כבר איבד את הזכאות. במסלול המורחב הוא בתוכה.

## מלגת הקיום

לפי הדף:

- **₪600 לחודש, עד 9 חודשים בשנה**, בחודשי הלימוד בלבד.
- מותנית בתכנית לימודים בהיקף של **לפחות 50%** שנתי או סמסטריאלי.
- באוניברסיטה הפתוחה — לפחות שני קורסים, בהיקף של לפחות 12 נקודות זכות בסמסטר.
- **סטודנטים לרפואה זכאים למלגות קיום בכל שנות לימודיהם.**
- **אינם זכאים:** מי שלומד פחות מ-50%, מי שלומד לתואר מתקדם (כולל תואר שני, הסבה או תעודה לאחר תואר), ומי שלומד בסמסטר קיץ.

מקור: [תנאי זכאות מורחבים לעולים מאתיופיה, יוצאי תימן ובני המנשה — משרד העלייה והקליטה](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · נבדק ספטמבר 2026.

## מה עוד כלול

מימון ייעוץ והכוון בבחירת תחום הלימוד על ידי מכון מקצועי; מימון שכר לימוד לפי משך הלימודים במסלול; מימון קורסי אנגלית ועברית במסגרת החובות לתואר; ומערך "מעטפ"ת" — שיעורי עזר, פעולות חברה ותרבות, אירועים וסמינרים, שירותי תמיכה של עובדים סוציאליים ומדריכים לליווי אישי-חברתי.

בשכר לימוד: "בכל שנה גובה המלגה יהיה עד לגובה מלגה מלאה בתעריף אוניברסיטאי (100% שכר לימוד), ובהתאם למערכת הלימודים של הסטודנט בפועל". במוסדות ששכר הלימוד בהם גבוה מהתעריף הממשלתי, המינהל משלים עד התעריף והיתרה על הסטודנט.

## התנאים האקדמיים — ומה מפיל אנשים בפועל

- קבלה ללימודים מן המניין במוסד ובמסלול המוכרים לסיוע על ידי המינהל.
- הסטודנט אינו בעל תואר או תעודה מקבילים או זהים לאלה שעבורם מבוקש הסיוע.
- זכאות לתעודת בגרות או תעודת סיום מכינה. **באוניברסיטה הפתוחה**, מי שהתקבל בלי בגרות יהיה זכאי לסיוע רק אחרי שיסיים בהצלחה שלושה קורסים אקדמיים בהיקף 18 נקודות זכות.
- **להמשך הסיוע נדרש ממוצע 60 ומעלה** ואישור מעבר תקין משנה לשנה.
- **אין מימון לשנה חוזרת** — לא בכישלון ולא בשינוי מסלול.
- מותרת הפסקת לימודים של עד שנתיים אקדמיות בכל תקופת הזכאות.
- מי שמפסיק ללמוד חייב להודיע מיד. אי-הודעה עלולה להוביל לרישום חוב ולהפסקת כל סיוע כספי מהמשרד.
- מקבל הסיוע נדרש לשעות התנדבות בקהילה במסגרת תוכנית שח"ק (שירות חברתי קהילתי).

## שתי מלגות ממשלתיות — לא בבת אחת

הדף חוזר על כך פעמיים: **"לא ניתן להעניק מלגת שכר לימוד לסטודנטים המקבלים מלגה מגורם ממשלתי אחר".** זו נקודה מעשית מול [מלגת מרום של המל"ג](/he/news/marom-scholarship-tashpaz-terms-change-2026), שההרשמה אליה טרם נפתחה. שני המסלולים לא נועדו להיערם זה על זה, והם מכוונים לאוכלוסיות משלימות: מרום — למי שבארץ מעל 15 שנה או יליד הארץ; המינהל — למי שבתוך 15 שנה ממתן המעמד.

הדף עצמו מפנה את מי שאינו זכאי לסיוע המינהל לבדוק זכאות למרום — אבל **התאריכים שמופיעים שם ("נפתחה בתאריך 9/9/2025... עד 11/11/25") הם של מחזור תשפ"ו**, לא של המחזור הנפתח כעת. אל תסתמכו עליהם.

## סייג שהמינהל עצמו כותב

"כל האמור לעיל הינו תמצית הכללים, ובכל מקרה קובעים הנוהל והוראת השעה. הסיוע מותנה בקיום תקציב ובחידוש הוראת השעה בכל שנה."

זו לא הסתייגות פורמלית בלבד: הזכאות תלויה בהוראת שעה שמתחדשת שנה-שנה. לפני שמבססים תכנית של ארבע שנים על המסלול הזה, כדאי לדעת את זה.

## מקורות

- [תנאי זכאות מורחבים לעולים מאתיופיה, יוצאי תימן ובני המנשה — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) — נקרא במלואו 8.9.2026
- [תנאי זכאות לקבלת סיוע ומלגת לימודים (המסלול הכללי) — gov.il](https://www.gov.il/he/pages/students-eligibility-conditions) — עודכן 11.6.2026
- [בקשה מקוונת לסיוע מהמינהל לסטודנטים עולים — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority)
- [מלגת מרום — הכתבה שלנו על מחזור תשפ"ז](/he/news/marom-scholarship-tashpaz-terms-change-2026)
- [מלגות והשכלה גבוהה — המדריך המלא בטדרוס](/he/education/scholarships)`,
      en: `## Applications are open — and two deadlines are already close

The Students Authority's service page says today: **"Registration for the 2026-2027 academic year has opened."** The deadlines, in the page's own words:

- **Continuing students** in the first semester — by **October 1**.
- **New students** in the first semester — by **November 10**.
- Starting in the second semester — by April 1. Starting in the summer semester — by August 15.

Alongside this the page sets out a line worth reading before you put the paperwork off: **"Retroactive assistance cannot be given"**, and an online application must be filed afresh every year or semester.

## What exactly is extended

The Authority has a dedicated page titled "Extended eligibility conditions for olim from Ethiopia, from Yemen, and Bnei Menashe." We read it alongside the general eligibility page, in order to check what genuinely differs — and not to present a general benefit as though it were community-specific. The differences are real, and these are they:

| | General track | Extended track |
| --- | --- | --- |
| Window from receiving status to the start of studies | **36 months** | **15 years** |
| Maximum age at the start of studies — bachelor's / practical engineer / certificate studies | up to 27 | **up to 28** |
| Maximum age — master's / conversion for degree holders | up to 30 | **up to 40** |
| Master's funding on top of a bachelor's | no, apart from exceptions | **yes, explicitly** |
| Living stipend | not part of the general conditions | **yes** |

In both tracks, a period of military or national service is not counted inside the window.

Extending 36 months to 15 years is the most consequential difference. Someone who made aliyah as a child, served, worked a few years and only then decided to study has already lost eligibility under the general track. Under the extended track they are inside it.

## The living stipend

Per the page:

- **₪600 a month, for up to 9 months a year**, in study months only.
- Conditional on a course load of **at least 50%** annually or per semester.
- At the Open University — at least two courses, at least 12 credits in the semester.
- **Medical students are entitled to living stipends throughout all their years of study.**
- **Not entitled:** anyone studying less than 50%, anyone studying for an advanced degree (including a master's, a conversion or a post-degree certificate), and anyone studying in the summer semester.

Source: [Extended eligibility conditions for olim from Ethiopia, Yemen and Bnei Menashe — Ministry of Aliyah and Integration](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · verified September 2026.

## What else is included

Funding for professional counselling and guidance in choosing a field of study; tuition funding according to the standard length of the track; funding for English and Hebrew courses required for the degree; and the "Ma'atefet" support system — tutoring, social and cultural activities, events and seminars, social-worker support services, and mentors for personal and social accompaniment.

On tuition: "each year the scholarship will be up to the level of a full scholarship at the university rate (100% of tuition), and in accordance with the student's actual course load." At institutions whose tuition exceeds the government rate, the Authority pays up to the rate and the balance is on the student.

## The academic conditions — and what actually trips people up

- Admission as a regular student to an institution and track recognized by the Authority.
- The student does not already hold a degree or certificate equivalent or identical to the one for which assistance is sought.
- Matriculation certificate eligibility or a preparatory-programme completion certificate. **At the Open University**, someone admitted without matriculation becomes eligible only after successfully completing three academic courses totalling 18 credits.
- **Continued assistance requires an average of 60 or above** and confirmation of proper year-to-year progression.
- **No funding for a repeated year** — neither after a failure nor after a change of track.
- A break in studies of up to two academic years is permitted across the whole eligibility period.
- Anyone who stops studying must notify immediately. Failure to do so can lead to a debt being recorded and all financial assistance from the ministry being stopped.
- Recipients are required to perform community volunteering hours under the Shachak programme (social-community service).

## Two government scholarships — not at once

The page repeats it twice: **"A tuition scholarship cannot be granted to students receiving a scholarship from another government body."** This matters in practice against [the CHE's Marom scholarship](/en/news/marom-scholarship-tashpaz-terms-change-2026), whose registration has not yet opened. The two tracks were not designed to stack, and they target complementary populations: Marom — those in Israel more than 15 years or Israeli-born; the Authority — those within 15 years of receiving status.

The page itself directs anyone not eligible for Authority assistance to check Marom — but **the dates shown there ("opened on 9/9/2025... until 11/11/25") belong to the 5786 cycle**, not to the cycle opening now. Do not rely on them.

## A caveat the Authority itself writes

"All of the above is a summary of the rules, and in any event the procedure and the temporary order govern. Assistance is conditional on budget availability and on the annual renewal of the temporary order."

This is not merely formal boilerplate: eligibility depends on a temporary order renewed year by year. Worth knowing before you build a four-year plan on this track.

## Sources

- [Extended eligibility conditions for olim from Ethiopia, Yemen and Bnei Menashe — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) — read in full 8.9.2026
- [Eligibility conditions for assistance and a study scholarship (the general track) — gov.il](https://www.gov.il/he/pages/students-eligibility-conditions) — updated 11.6.2026
- [Online application for assistance from the Students Authority — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority)
- [Marom scholarship — our article on the 5787 cycle](/en/news/marom-scholarship-tashpaz-terms-change-2026)
- [Scholarships and higher education — the full Tedros guide](/en/education/scholarships)`,
      am: `## ምዝገባ ክፍት ነው — ሁለት የመጨረሻ ቀኖችም ተቃርበዋል

የስደተኛ ተማሪዎች አስተዳደር የአገልግሎት ገጽ ዛሬ ይላል፦ **«ለ2026-2027 የትምህርት ዓመት ምዝገባ ተከፍቷል»።** የመጨረሻ ቀኖቹ በገጹ ቃል፦

- በመጀመሪያ ሴሚስተር **ቀጣይ ተማሪዎች** — እስከ **ኦክቶበር 1**።
- በመጀመሪያ ሴሚስተር **አዲስ ተማሪዎች** — እስከ **ኖቬምበር 10**።
- በሁለተኛ ሴሚስተር የሚጀምሩ — እስከ ኤፕሪል 1። በበጋ ሴሚስተር የሚጀምሩ — እስከ ኦገስት 15።

ከዚህ ጎን ገጹ ወረቀቱን ከማዘግየትዎ በፊት ማንበብ የሚገባ መስመር ያስቀምጣል፦ **«ኋላ ቀር ድጋፍ መስጠት አይቻልም»**፣ እንዲሁም በየዓመቱ ወይም በየሴሚስተሩ አዲስ የመስመር ላይ ማመልከቻ መቅረብ አለበት።

## በትክክል ምን ተስፋፍቷል

አስተዳደሩ «ከኢትዮጵያ ለመጡ ስደተኞች፣ ለየመን ተወላጆችና ለቤኔ ምናሼ የተስፋፉ የብቁነት ሁኔታዎች» የሚል ልዩ ገጽ አለው። በእውነት ምን እንደሚለያይ ለመፈተሽ — እና አጠቃላይ ጥቅምን የማህበረሰብ ብቻ አድርጎ ላለማቅረብ — ከአጠቃላዩ የብቁነት ገጽ ጎን አንብበነዋል። ልዩነቶቹ እውነተኛ ናቸው፣ እነሆም፦

| | አጠቃላይ መስመር | የተስፋፋ መስመር |
| --- | --- | --- |
| መቀበያ ከተሰጠ ጀምሮ ትምህርት እስከሚጀመር ያለው መስኮት | **36 ወር** | **15 ዓመት** |
| ትምህርት ሲጀመር ከፍተኛ ዕድሜ — መጀመሪያ ዲግሪ / ተግባራዊ መሐንዲስ / የምስክር ወረቀት ትምህርት | እስከ 27 | **እስከ 28** |
| ከፍተኛ ዕድሜ — ሁለተኛ ዲግሪ / ለዲግሪ ባለቤቶች የሙያ ለውጥ | እስከ 30 | **እስከ 40** |
| ከመጀመሪያ ዲግሪ በተጨማሪ የሁለተኛ ዲግሪ ድጋፍ | አይ፣ ከልዩ ሁኔታዎች በስተቀር | **አዎ፣ በግልጽ** |
| የመተዳደሪያ ስኮላርሺፕ | በአጠቃላዩ ሁኔታዎች ውስጥ የለም | **አዎ** |

በሁለቱም መስመሮች የውትድርና ወይም የብሔራዊ አገልግሎት ጊዜ በመስኮቱ ውስጥ አይቆጠርም።

ከ36 ወር ወደ 15 ዓመት መስፋቱ በጣም ወሳኙ ልዩነት ነው። በልጅነት የመጣ፣ ያገለገለ፣ ጥቂት ዓመታት የሠራና ከዚያ በኋላ ብቻ ለመማር የወሰነ ሰው በአጠቃላዩ መስመር ብቁነቱን አጥቷል። በተስፋፋው መስመር ግን በውስጡ ነው።

## የመተዳደሪያ ስኮላርሺፑ

በገጹ መሠረት፦

- **በወር ₪600፣ በዓመት እስከ 9 ወር**፣ በትምህርት ወራት ብቻ።
- **ቢያንስ 50%** ዓመታዊ ወይም ሴሚስተራዊ የትምህርት ጫና ይጠይቃል።
- በክፍት ዩኒቨርሲቲ — ቢያንስ ሁለት ኮርሶች፣ በሴሚስተር ቢያንስ 12 ክሬዲት።
- **የሕክምና ተማሪዎች በሁሉም የትምህርት ዓመታቸው የመተዳደሪያ ስኮላርሺፕ ይገባቸዋል።**
- **ብቁ ያልሆኑ፦** ከ50% በታች የሚማሩ፣ ለከፍተኛ ዲግሪ የሚማሩ (ሁለተኛ ዲግሪ፣ የሙያ ለውጥ ወይም ከዲግሪ በኋላ የምስክር ወረቀት ጨምሮ)፣ እና በበጋ ሴሚስተር የሚማሩ።

ምንጭ፦ [ከኢትዮጵያ፣ ከየመንና ቤኔ ምናሼ ለመጡ የተስፋፉ የብቁነት ሁኔታዎች — የዓሊያና ውህደት ሚኒስቴር](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) · በሴፕቴምበር 2026 ተረጋግጧል።

## ሌላ ምን ተካቷል

የጥናት መስክ በመምረጥ ረገድ በሙያዊ ተቋም የሚሰጥ ምክርና አቅጣጫ ድጋፍ፤ በመስመሩ መደበኛ ርዝመት መሠረት የትምህርት ክፍያ ድጋፍ፤ ለዲግሪው የሚያስፈልጉ የእንግሊዝኛና የዕብራይስጥ ኮርሶች ድጋፍ፤ እና «ማአቴፌት» የድጋፍ ሥርዓት — የማጠናከሪያ ትምህርት፣ ማህበራዊና ባህላዊ እንቅስቃሴዎች፣ ዝግጅቶችና ሴሚናሮች፣ የማህበራዊ ሠራተኞች ድጋፍ፣ እና ለግልና ማህበራዊ አጃቢነት አማካሪዎች።

ስለ ትምህርት ክፍያ፦ «በየዓመቱ የስኮላርሺፑ መጠን በዩኒቨርሲቲ ተመን እስከ ሙሉ ስኮላርሺፕ (100% የትምህርት ክፍያ) ድረስ ይሆናል፣ በተማሪው ትክክለኛ የትምህርት ጫና መሠረት»። የትምህርት ክፍያቸው ከመንግሥት ተመን በሚበልጥ ተቋማት አስተዳደሩ እስከ ተመኑ ይሸፍናል፣ ቀሪው በተማሪው ላይ ነው።

## የአካዳሚ ሁኔታዎች — በተግባር ሰዎችን የሚጥለው

- በአስተዳደሩ በታወቀ ተቋምና መስመር እንደ መደበኛ ተማሪ መቀበል።
- ተማሪው ድጋፍ ለሚጠይቅበት ዲግሪ ተመሳሳይ ወይም እኩል የሆነ ዲግሪ ወይም የምስክር ወረቀት የለውም።
- የማትሪክ ወይም የቅድመ-አካዳሚ ማጠናቀቂያ ምስክር። **በክፍት ዩኒቨርሲቲ**፣ ያለ ማትሪክ የተቀበለ ሰው 18 ክሬዲት የሚያህሉ ሦስት የአካዳሚ ኮርሶችን በተሳካ ሁኔታ ካጠናቀቀ በኋላ ብቻ ብቁ ይሆናል።
- **ድጋፉ እንዲቀጥል ከ60 በላይ አማካይ** እና ከዓመት ወደ ዓመት ትክክለኛ የመሸጋገር ማረጋገጫ ያስፈልጋል።
- **ለተደጋገመ ዓመት ድጋፍ የለም** — በውድቀትም ሆነ በመስመር ለውጥ።
- በጠቅላላው የብቁነት ጊዜ እስከ ሁለት የአካዳሚ ዓመት ማቋረጥ ይፈቀዳል።
- ትምህርቱን የሚያቋርጥ ወዲያውኑ ማሳወቅ አለበት። አለማሳወቅ ዕዳ እንዲመዘገብና ከሚኒስቴሩ የሚሰጥ ማንኛውም የገንዘብ ድጋፍ እንዲቋረጥ ሊያደርግ ይችላል።
- ተጠቃሚው በሻሓቅ ፕሮግራም (ማህበራዊ-ማህበረሰብ አገልግሎት) ስር የማህበረሰብ የበጎ ፈቃድ ሰዓታት ይጠበቅበታል።

## ሁለት የመንግሥት ስኮላርሺፖች — በአንድ ጊዜ አይደለም

ገጹ ሁለት ጊዜ ይደግመዋል፦ **«ከሌላ የመንግሥት አካል ስኮላርሺፕ ለሚቀበሉ ተማሪዎች የትምህርት ክፍያ ስኮላርሺፕ መስጠት አይቻልም»።** ይህ ምዝገባው ገና ካልተከፈተው [የCHE ማሮም ስኮላርሺፕ](/am/news/marom-scholarship-tashpaz-terms-change-2026) አንጻር ተግባራዊ ጠቀሜታ አለው። ሁለቱ መስመሮች እንዲደራረቡ አልተነደፉም፣ የሚያገለግሉትም የሚደጋገፉ ሕዝቦችን ነው፦ ማሮም — በእስራኤል ከ15 ዓመት በላይ የቆዩ ወይም በእስራኤል የተወለዱ፤ አስተዳደሩ — መቀበያ ከተሰጠ በ15 ዓመት ውስጥ ያሉ።

ገጹ ራሱ ለአስተዳደሩ ድጋፍ ብቁ ያልሆነውን ማሮምን እንዲፈትሽ ይመራዋል — ነገር ግን **እዚያ የሚታዩት ቀኖች («በ9/9/2025 ተከፍቷል... እስከ 11/11/25») የ5786 ዙር ናቸው**፣ አሁን የሚከፈተው ዙር አይደሉም። በእነሱ አይመኩ።

## አስተዳደሩ ራሱ የሚጽፈው ማስጠንቀቂያ

«ከላይ የተጠቀሰው ሁሉ የደንቦቹ ማጠቃለያ ነው፣ በማንኛውም ሁኔታ ደንቡና ጊዜያዊ ትዕዛዙ ይወስናሉ። ድጋፉ በበጀት መኖርና ጊዜያዊ ትዕዛዙ በየዓመቱ በመታደስ ላይ የተመሠረተ ነው።»

ይህ የቅርጽ ማስጠንቀቂያ ብቻ አይደለም፦ ብቁነቱ ዓመት በዓመት በሚታደስ ጊዜያዊ ትዕዛዝ ላይ የተመሠረተ ነው። በዚህ መስመር ላይ የአራት ዓመት ዕቅድ ከመመሥረትዎ በፊት ማወቅ ተገቢ ነው።

## ምንጮች

- [ከኢትዮጵያ፣ ከየመንና ቤኔ ምናሼ ለመጡ የተስፋፉ የብቁነት ሁኔታዎች — gov.il](https://www.gov.il/he/pages/ethiopian_jews_students_scholarships) — ሙሉ በሙሉ የተነበበ 8.9.2026
- [ለድጋፍና ለትምህርት ስኮላርሺፕ የብቁነት ሁኔታዎች (አጠቃላይ መስመር) — gov.il](https://www.gov.il/he/pages/students-eligibility-conditions) — በ11.6.2026 ተዘምኗል
- [ከስደተኛ ተማሪዎች አስተዳደር ድጋፍ የመስመር ላይ ማመልከቻ — gov.il](https://www.gov.il/he/service/apply-online-for-a-scholarship-from-the-student-authority)
- [ማሮም ስኮላርሺፕ — ስለ 5787 ዙር ጽሑፋችን](/am/news/marom-scholarship-tashpaz-terms-change-2026)
- [ስኮላርሺፖችና ከፍተኛ ትምህርት — ሙሉው የትድሮስ መመሪያ](/am/education/scholarships)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "parent-payments-tashpaz-maximum-amounts-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["education"],
    title: {
      he: 'שנת הלימודים נפתחה: אלה הסכומים המרביים שמותר לגבות מכם בתשפ"ז — ומה שאסור לגבות בכלל',
      en: "The school year has opened: these are the maximum amounts a school may charge you in 5787 — and what may not be charged at all",
      am: "የትምህርት ዓመቱ ተከፍቷል፦ በ5787 ትምህርት ቤት ሊያስከፍልዎ የሚችለው ከፍተኛ መጠን — እና በጭራሽ ሊያስከፍል የማይችለው",
    },
    excerpt: {
      he: 'משרד החינוך פרסם ב-10.8.2026 את הודעה 0379 — הסכומים המרביים לגביית תשלומי הורים בתשפ"ז, שאישרה ועדת החינוך של הכנסת. תשלום החובה היחיד הוא ביטוח תאונות אישיות, ₪69. הסכום הכולל נע בין ₪253 בגן ל-₪1,372 בכיתה י"ב. ובלי אישור במערכת "אפיק" — אין לשלם.',
      en: "On August 10, 2026 the Ministry of Education published Notice 0379 — the maximum parent-payment amounts for 5787, approved by the Knesset Education Committee. The only compulsory payment is personal accident insurance, ₪69. The overall total ranges from ₪253 in kindergarten to ₪1,372 in twelfth grade. And with no approval in the \"Afik\" system — do not pay.",
      am: "የትምህርት ሚኒስቴር በኦገስት 10, 2026 ማስታወቂያ 0379 አሳተመ — በክኔሴት የትምህርት ኮሚቴ የጸደቀው የ5787 ከፍተኛ የወላጅ ክፍያ መጠን። ብቸኛው ግዴታዊ ክፍያ የግል አደጋ መድን ነው፣ ₪69። አጠቃላዩ ድምር በመዋለ ሕፃናት ከ₪253 እስከ በ12ኛ ክፍል ₪1,372 ይደርሳል። በ«አፊቅ» ሥርዓት ፈቃድ ከሌለ ደግሞ — አይክፈሉ።",
    },
    bodies: {
      he: `## למה זה חשוב עכשיו

שנת הלימודים תשפ"ז נפתחה לפני שבוע, ב-1.9.2026. בימים ובשבועות הקרובים יגיעו הביתה חוזרי תשלומים, טפסים ובקשות. **הסכומים אינם נתונים לשיקול דעת של בית הספר** — הם מאושרים בוועדת החינוך, התרבות והספורט של הכנסת ומתפרסמים בחוזר מנכ"ל.

ב-**10 באוגוסט 2026** (כ"ז באב תשפ"ו) פרסם משרד החינוך את **הודעה מס' 0379, "תשלומי הורים לשנת הלימודים התשפ"ז"**. אלה המספרים.

## הסכום הכולל המרבי, לפי שכבה

| שכבה | סך תשלומי חובה ורשות |
| --- | --- |
| גני ילדים | ₪253 |
| כיתות א'–ב' | ₪540 |
| כיתות ג'–ד' | ₪565 |
| כיתה ה' | ₪691 |
| כיתה ו' | ₪901 |
| כיתות ז'–ח' | ₪1,026 |
| כיתה ח' (בית ספר א'–ח') | ₪1,151 |
| כיתה ט' (שש-שנתי) | ₪1,042 |
| כיתה ט' (חט"ב עצמאית) | ₪1,167 |
| כיתות י'–י"א | ₪1,219 |
| כיתה י"ב | ₪1,372 |

מקור: [הודעה 0379 — תשלומי הורים לשנת הלימודים התשפ"ז, משרד החינוך, 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377) · נבדק ספטמבר 2026.

**הסכומים האלה אינם כוללים תל"ן** (תוכנית לימודים נוספת) **ורכישת שירותים מרצון**, שמוגבלים בנפרד באותו חוזר ודורשים חתימה אישית של כל הורה בנפרד.

## מה חובה ומה לא

**תשלום החובה היחיד הוא ביטוח תאונות אישיות לתלמידים — ₪69 לשנה, בכל שכבה מהגן ועד י"ב.** "חובה" כאן פירושה שההורה משלם גם אם אינו נהנה מהשירות.

כל השאר — **תשלומי רשות**. הורה רשאי להחליט שילדו לא יצרוך את השירות, ואז לא ישלם עבורו. בכלל זה סל תרבות (₪67 בגן עד ₪164 בי"ב), טיולים, מסיבות סיום, השאלת ספרי לימוד (₪280–₪320), של"ח, וועד הורים יישובי והנהגת הורים ארצית (₪1.5 כל אחד).

שימו לב לשורה אחת בטבלה: **מסיבות כיתתיות — 0 בכל השכבות.** אסור לגבות עבורן.

השנה הופחתה הגבייה המרבית עבור סל תרבות ב-12 שקלים לתלמיד; לפי החוזר, משרד החינוך יעביר את הסכום הזה בסוף דצמבר 2026 לרשויות ולבעלויות עבור כל תלמיד מתוקצב.

## הכלל שהכי כדאי להכיר: "אפיק"

זהו הכלל המעשי ביותר בחוזר, והוא פשוט:

> **"אין לגבות כספים מההורים בטרם אושר חוזר התשלומים המוסדי על ידי המפקח או גורם מוסמך אחר במחוז באמצעות מערכת 'אפיק'."**

פורטל ההורים של משרד החינוך מנסח זאת עוד יותר ישירות: **"אם אין חוזר באפיק — משמע שאין אישור לגבייה, ועל כן אין לשלם."**

חוזר התשלומים המוסדי חייב להיחתם על ידי מנהל בית הספר **ועל ידי יו"ר הנהגת ההורים המוסדית**, וטבלת התשלומים המאושרת מופקת ממערכת אפיק ומצורפת אליו. אם קיבלתם דרישת תשלום בלי הטבלה הזאת — יש לכם שאלה לגיטימית לשאול.

ועוד: **הגבייה מותרת רק על ידי מוסד החינוך, הרשות המקומית או הבעלות.** גבייה באמצעות עמותה או ועד הורים אינה מותרת.

## אי-תשלום מסיבה כלכלית — הכלל מפורש

החוזר קובע: **"אין למנוע מתלמידים להשתתף בפעילויות בשל אי-תשלום עקב קשיים כלכליים, ויש למצוא פתרונות לשיתופם באמצעות הרשות המקומית והנהלת בית הספר."**

לכך יש גם תקציב ייעודי — מלגות משרד החינוך לתלמידים שהוריהם מתקשים לשלם. הרחבנו עליהן ב[כתבה נפרדת, כולל הסכומים ולוח הזמנים](/he/news/education-ministry-scholarships-parent-payments-2026).

## פטור מלא מתשלומי רשות — למי

החוזר קובע שאין לגבות תשלומי רשות מ**תלמידים שפונו בהחלטת ממשלה וטרם הוחלט להשיבם לביתם**, מ**תלמידים ששבו מן השבי**, ומ**בני משפחה מדרגה ראשונה של חטופים**. תשלום החובה, תל"ן ורכישה מרצון כן נגבים, והרשות המקומית רשאית לסייע במלגות עד גובה תשלומי ההורים שאושר באפיק.

## תרומות

ועד ההורים רשאי לפנות מיוזמתו בבקשת תרומה. **מנהל בית הספר אינו רשאי** להתרים הורים או לפנות אליהם בבקשת תרומה. אין לבקש כתרומה שירותים שכלולים בתשלומי החובה או הרשות, אין לחייב הורה לתרום, ואין למנוע שירות מתלמיד בעקבות אי-מתן תרומה.

## אם משהו לא מסתדר

- בקשו לראות את **חוזר התשלומים המוסדי המאושר** ואת טבלת אפיק המצורפת אליו.
- השוו לסכומים שבטבלה למעלה. **אין לגבות מעבר לסכום המרבי.**
- פנו למזכירות בית הספר, ואם צריך — למפקח הכולל במחוז.
- מוקד שירות ותמיכה להורים: **6552\\*** (שלוחה 2 ואז 2), א'–ה' 7:30–17:00, ו' 7:30–13:00.

לזכויות ההורים במערכת החינוך בהרחבה — [המדריך שלנו](/he/education/parent-rights).

## מקורות

- [הודעה 0379 — תשלומי הורים לשנת הלימודים התשפ"ז, מאגר חוזרי מנכ"ל, פורסמה 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377) — נקראה במלואה 8.9.2026
- [תשלומי הורים — פורטל ההורים, משרד החינוך](https://parents.education.gov.il/gov-education/school/payments/)
- [חוק לימוד חובה, תש"ט-1949](https://fs.knesset.gov.il/%5C1%5Claw%5C1_lsr_203716.PDF)
- [זכויות הורים במערכת החינוך — טדרוס](/he/education/parent-rights)`,
      en: `## Why this matters now

The 5787 school year opened a week ago, on September 1, 2026. Over the coming days and weeks, payment circulars, forms and requests will arrive at home. **The amounts are not at the school's discretion** — they are approved by the Knesset's Education, Culture and Sport Committee and published in a director-general's circular.

On **August 10, 2026** the Ministry of Education published **Notice no. 0379, "Parent payments for the 5787 school year."** These are the numbers.

## The maximum total, by grade

| Grade | Total compulsory + optional payments |
| --- | --- |
| Kindergarten | ₪253 |
| Grades 1–2 | ₪540 |
| Grades 3–4 | ₪565 |
| Grade 5 | ₪691 |
| Grade 6 | ₪901 |
| Grades 7–8 | ₪1,026 |
| Grade 8 (in a 1–8 school) | ₪1,151 |
| Grade 9 (six-year school) | ₪1,042 |
| Grade 9 (independent middle school) | ₪1,167 |
| Grades 10–11 | ₪1,219 |
| Grade 12 | ₪1,372 |

Source: [Notice 0379 — parent payments for the 5787 school year, Ministry of Education, 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377) · verified September 2026.

**These amounts do not include "TaLaN"** (a supplementary curriculum) **or voluntary purchase of services**, which are capped separately in the same circular and require each parent's individual signature.

## What is compulsory and what is not

**The only compulsory payment is personal accident insurance for pupils — ₪69 a year, at every level from kindergarten through grade 12.** "Compulsory" here means the parent pays it even if they derive no benefit from the service.

Everything else is an **optional-services payment**. A parent may decide their child will not consume the service, and then does not pay for it. That includes the culture basket (₪67 in kindergarten up to ₪164 in grade 12), trips, graduation parties, textbook lending (₪280–₪320), the field-studies programme, and the municipal parents' committee and national parents' body (₪1.5 each).

Note one line in the table: **class parties — 0 at every level.** They may not be charged for.

This year the maximum charge for the culture basket was reduced by 12 shekels per pupil; per the circular, the Ministry of Education will transfer that sum at the end of December 2026 to the local authorities and school owners for every duly budgeted pupil.

## The rule most worth knowing: "Afik"

This is the most practical rule in the circular, and it is simple:

> **"Money may not be collected from parents before the institutional payments circular has been approved by the inspector or another authorized official in the district through the 'Afik' system."**

The Ministry of Education's parents' portal puts it even more directly: **"If there is no circular on Afik, it means there is no approval to collect, and therefore you should not pay."**

The institutional payments circular must be signed by the school principal **and by the chair of the institutional parents' body**, and the approved payments table is generated from Afik and attached to it. If you received a payment demand without that table, you have a legitimate question to ask.

Also: **collection is permitted only by the educational institution, the local authority, or the school's owner.** Collection through an association or a parents' committee is not permitted.

## Non-payment for financial reasons — the rule is explicit

The circular states: **"Pupils may not be prevented from taking part in activities because of non-payment due to financial difficulty, and solutions for including them must be found through the local authority and the school management."**

There is also a dedicated budget for this — Ministry of Education scholarships for pupils whose parents struggle to pay. We covered them in [a separate article, with the amounts and the timetable](/en/news/education-ministry-scholarships-parent-payments-2026).

## Full exemption from optional payments — for whom

The circular states that optional-services payments may not be collected from **pupils evacuated by government decision whose return home has not yet been decided**, from **pupils who have returned from captivity**, and from **first-degree family members of hostages**. The compulsory payment, TaLaN and voluntary purchases are still collected, and the local authority may assist with scholarships up to the parent-payment level approved on Afik.

## Donations

The parents' committee may, on its own initiative, ask parents for a donation. **The school principal may not** solicit donations from parents. Services already included in the compulsory or optional payments may not be requested as a donation, no parent may be compelled to donate, and no service may be withheld from a pupil because a donation was not given.

## If something doesn't add up

- Ask to see the **approved institutional payments circular** and the Afik table attached to it.
- Compare against the amounts in the table above. **Nothing above the maximum may be collected.**
- Approach the school office, and if needed the district's inspector.
- Parents' service and support line: **\\*6552** (extension 2, then 2), Sun–Thu 7:30–17:00, Fri 7:30–13:00.

For parents' rights in the education system in depth — [our guide](/en/education/parent-rights).

## Sources

- [Notice 0379 — parent payments for the 5787 school year, director-general circulars database, published 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377) — read in full 8.9.2026
- [Parent payments — parents' portal, Ministry of Education](https://parents.education.gov.il/gov-education/school/payments/)
- [Compulsory Education Law, 1949](https://fs.knesset.gov.il/%5C1%5Claw%5C1_lsr_203716.PDF)
- [Parents' rights in the education system — Tedros](/en/education/parent-rights)`,
      am: `## ይህ አሁን ለምን አስፈለገ

የ5787 የትምህርት ዓመት ከሳምንት በፊት፣ በሴፕቴምበር 1, 2026 ተከፍቷል። በሚቀጥሉት ቀናትና ሳምንታት የክፍያ ማስታወቂያዎች፣ ቅጾችና ጥያቄዎች ወደ ቤት ይደርሳሉ። **መጠኖቹ በትምህርት ቤቱ ውሳኔ ላይ የተመሠረቱ አይደሉም** — በክኔሴት የትምህርት፣ ባህልና ስፖርት ኮሚቴ ይጸድቃሉ፣ በዋና ዳይሬክተር ማስታወቂያም ይታተማሉ።

በ**ኦገስት 10, 2026** የትምህርት ሚኒስቴር **ማስታወቂያ ቁጥር 0379፣ «ለ5787 የትምህርት ዓመት የወላጅ ክፍያዎች»** አሳተመ። ቁጥሮቹ እነሆ።

## ከፍተኛው ጠቅላላ መጠን በክፍል ደረጃ

| ክፍል | ጠቅላላ ግዴታዊ + አማራጭ ክፍያ |
| --- | --- |
| መዋለ ሕፃናት | ₪253 |
| 1–2ኛ ክፍል | ₪540 |
| 3–4ኛ ክፍል | ₪565 |
| 5ኛ ክፍል | ₪691 |
| 6ኛ ክፍል | ₪901 |
| 7–8ኛ ክፍል | ₪1,026 |
| 8ኛ ክፍል (በ1–8 ትምህርት ቤት) | ₪1,151 |
| 9ኛ ክፍል (የስድስት ዓመት ትምህርት ቤት) | ₪1,042 |
| 9ኛ ክፍል (ራሱን የቻለ መካከለኛ ደረጃ) | ₪1,167 |
| 10–11ኛ ክፍል | ₪1,219 |
| 12ኛ ክፍል | ₪1,372 |

ምንጭ፦ [ማስታወቂያ 0379 — ለ5787 የትምህርት ዓመት የወላጅ ክፍያዎች፣ የትምህርት ሚኒስቴር፣ 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377) · በሴፕቴምበር 2026 ተረጋግጧል።

**እነዚህ መጠኖች «ተላን»** (ተጨማሪ ሥርዓተ ትምህርት) **እና በፈቃደኝነት የአገልግሎት ግዢን አያካትቱም**፤ እነሱ በዚያው ማስታወቂያ ተለይተው የተገደቡ ሲሆኑ የእያንዳንዱን ወላጅ የግል ፊርማ ይጠይቃሉ።

## ግዴታዊው ምንድን ነው፣ ያልሆነውስ

**ብቸኛው ግዴታዊ ክፍያ የተማሪዎች የግል አደጋ መድን ነው — በዓመት ₪69፣ ከመዋለ ሕፃናት እስከ 12ኛ ክፍል በሁሉም ደረጃ።** «ግዴታዊ» ማለት ወላጁ ከአገልግሎቱ ጥቅም ባያገኝም ይከፍላል ማለት ነው።

ሌላው ሁሉ **የአማራጭ አገልግሎት ክፍያ** ነው። ወላጅ ልጁ አገልግሎቱን እንዳይጠቀም መወሰን ይችላል፣ ከዚያም አይከፍልም። ይህ የባህል ቅርጫትን (በመዋለ ሕፃናት ₪67 እስከ በ12ኛ ክፍል ₪164)፣ ጉዞዎችን፣ የምረቃ ድግሶችን፣ የመማሪያ መጽሐፍ ውሰትን (₪280–₪320)፣ የመስክ ጥናት ፕሮግራምን፣ የከተማ የወላጅ ኮሚቴንና ብሔራዊ የወላጅ አካልን (እያንዳንዱ ₪1.5) ያካትታል።

በሠንጠረዡ ውስጥ አንድ መስመር ልብ ይበሉ፦ **የክፍል ድግሶች — በሁሉም ደረጃ 0።** ለእነሱ ማስከፈል አይፈቀድም።

በዚህ ዓመት ለባህል ቅርጫት ከፍተኛው ክፍያ በአንድ ተማሪ በ12 ሸቀል ቀንሷል፤ በማስታወቂያው መሠረት የትምህርት ሚኒስቴር ይህን ገንዘብ በዲሴምበር 2026 መጨረሻ በአግባቡ ለተመዘገበ ለእያንዳንዱ ተማሪ ለአካባቢ አስተዳደሮችና ለባለቤቶች ያስተላልፋል።

## ማወቅ የሚገባው ዋና ደንብ፦ «አፊቅ»

በማስታወቂያው ውስጥ በጣም ተግባራዊው ደንብ ይህ ነው፣ ቀላልም ነው፦

> **«የተቋሙ የክፍያ ማስታወቂያ በ‹አፊቅ› ሥርዓት በኩል በተቆጣጣሪው ወይም በአውራጃው በሌላ ስልጣን ባለው ባለሥልጣን ሳይጸድቅ ከወላጆች ገንዘብ መሰብሰብ አይቻልም።»**

የትምህርት ሚኒስቴር የወላጆች ፖርታል ይበልጥ በቀጥታ ያስቀምጠዋል፦ **«በአፊቅ ላይ ማስታወቂያ ከሌለ፣ የመሰብሰብ ፈቃድ የለም ማለት ነው፣ ስለዚህ መክፈል የለብዎትም።»**

የተቋሙ የክፍያ ማስታወቂያ በትምህርት ቤቱ ርዕሰ መምህር **እና በተቋሙ የወላጆች አካል ሊቀመንበር** መፈረም አለበት፤ የጸደቀው የክፍያ ሠንጠረዥም ከአፊቅ ወጥቶ ይያያዛል። ያለዚያ ሠንጠረዥ የክፍያ ጥያቄ ከደረሰዎት፣ የሚጠይቁት ትክክለኛ ጥያቄ አለዎት።

እንዲሁም፦ **መሰብሰብ የሚፈቀደው ለትምህርት ተቋሙ፣ ለአካባቢው አስተዳደር ወይም ለትምህርት ቤቱ ባለቤት ብቻ ነው።** በማህበር ወይም በወላጅ ኮሚቴ በኩል መሰብሰብ አይፈቀድም።

## በኢኮኖሚ ምክንያት አለመክፈል — ደንቡ ግልጽ ነው

ማስታወቂያው ይላል፦ **«በኢኮኖሚ ችግር ምክንያት ባለመክፈላቸው ተማሪዎች በእንቅስቃሴዎች እንዳይሳተፉ መከልከል አይቻልም፤ በአካባቢው አስተዳደርና በትምህርት ቤቱ አመራር በኩል እንዲሳተፉ የሚያደርግ መፍትሔ መፈለግ አለበት።»**

ለዚህ የተመደበ በጀትም አለ — ወላጆቻቸው ለመክፈል ለሚቸገሩ ተማሪዎች የትምህርት ሚኒስቴር ስኮላርሺፖች። በ[የተለየ ጽሑፍ ውስጥ ከመጠኖቹና ከጊዜ ሰሌዳው ጋር](/am/news/education-ministry-scholarships-parent-payments-2026) አስፍተነዋል።

## ከአማራጭ ክፍያዎች ሙሉ ነጻ መሆን — ለማን

ማስታወቂያው እንደሚለው ከ**በመንግሥት ውሳኔ ተፈናቅለው ወደ ቤታቸው መመለሳቸው ገና ካልተወሰነ ተማሪዎች**፣ ከ**ከምርኮ ከተመለሱ ተማሪዎች**፣ እና ከ**የታገቱ ሰዎች የመጀመሪያ ደረጃ የቤተሰብ አባላት** የአማራጭ አገልግሎት ክፍያ መሰብሰብ አይቻልም። ግዴታዊው ክፍያ፣ ተላንና በፈቃደኝነት ግዢ ግን ይሰበሰባሉ፤ የአካባቢው አስተዳደርም በአፊቅ እስከጸደቀው የወላጅ ክፍያ ደረጃ በስኮላርሺፕ ሊረዳ ይችላል።

## ልገሳዎች

የወላጆች ኮሚቴ በራሱ ተነሳሽነት ወላጆችን ልገሳ መጠየቅ ይችላል። **የትምህርት ቤቱ ርዕሰ መምህር** ከወላጆች ልገሳ መጠየቅ **አይችልም**። በግዴታዊ ወይም በአማራጭ ክፍያዎች ውስጥ የተካተቱ አገልግሎቶች እንደ ልገሳ መጠየቅ አይቻልም፣ ማንም ወላጅ እንዲለግስ መገደድ የለበትም፣ ልገሳ ባለመስጠቱም ከተማሪ አገልግሎት መከልከል የለበትም።

## የሆነ ነገር ካልተስተካከለ

- **የጸደቀውን የተቋም የክፍያ ማስታወቂያ** እና ከእሱ ጋር የተያያዘውን የአፊቅ ሠንጠረዥ እንዲያሳዩዎት ይጠይቁ።
- ከላይ ካለው ሠንጠረዥ ጋር ያወዳድሩ። **ከከፍተኛው መጠን በላይ መሰብሰብ አይቻልም።**
- ወደ ትምህርት ቤቱ ጽሕፈት ቤት፣ አስፈላጊ ከሆነም ወደ አውራጃው ተቆጣጣሪ ይሂዱ።
- የወላጆች አገልግሎትና ድጋፍ መስመር፦ **\\*6552** (ቅጥያ 2፣ ከዚያ 2)፣ እሑድ–ሐሙስ 7:30–17:00፣ ዓርብ 7:30–13:00።

በትምህርት ሥርዓት ውስጥ ስለ ወላጆች መብቶች በሰፊው — [መመሪያችን](/am/education/parent-rights)።

## ምንጮች

- [ማስታወቂያ 0379 — ለ5787 የትምህርት ዓመት የወላጅ ክፍያዎች፣ የዋና ዳይሬክተር ማስታወቂያዎች ማከማቻ፣ በ10.8.2026 ታትሟል](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377) — ሙሉ በሙሉ የተነበበ 8.9.2026
- [የወላጅ ክፍያዎች — የወላጆች ፖርታል፣ የትምህርት ሚኒስቴር](https://parents.education.gov.il/gov-education/school/payments/)
- [የግዴታ ትምህርት ሕግ፣ 1949](https://fs.knesset.gov.il/%5C1%5Claw%5C1_lsr_203716.PDF)
- [በትምህርት ሥርዓት ውስጥ የወላጆች መብቶች — ትድሮስ](/am/education/parent-rights)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "education-ministry-scholarships-parent-payments-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["education"],
    title: {
      he: "יש תקציב מלגות לתשלומי הורים — ובית הספר חייב ליידע אתכם שהוא קיים",
      en: "There is a scholarship budget for parent payments — and the school is obliged to tell you it exists",
      am: "ለወላጅ ክፍያዎች የስኮላርሺፕ በጀት አለ — ትምህርት ቤቱም መኖሩን የማሳወቅ ግዴታ አለበት",
    },
    excerpt: {
      he: 'משרד החינוך מקצה לבתי ספר תקציב מלגות לתלמידים שהוריהם מתקשים לשלם עבור ספרים, אביזרי לימוד ופעילויות. ₪100–750 ביסודי, ₪100–1,200 בעל-יסודי. ההחלטה בידי ועדת מלגות בית-ספרית, המועדים נקבעים בבית הספר — ועל ההנהלה חלה חובה מפורשת לפרסם שהתקציב קיים.',
      en: "The Ministry of Education allocates schools a scholarship budget for pupils whose parents struggle to pay for books, learning materials and activities. ₪100–750 in primary school, ₪100–1,200 in secondary. The decision sits with a school scholarship committee, the dates are set by the school — and management is under an explicit duty to publicize that the budget exists.",
      am: "የትምህርት ሚኒስቴር ወላጆቻቸው ለመጻሕፍት፣ ለመማሪያ ቁሳቁስና ለእንቅስቃሴዎች ለመክፈል ለሚቸገሩ ተማሪዎች ለትምህርት ቤቶች የስኮላርሺፕ በጀት ይመድባል። በአንደኛ ደረጃ ₪100–750፣ በሁለተኛ ደረጃ ₪100–1,200። ውሳኔው በትምህርት ቤቱ የስኮላርሺፕ ኮሚቴ እጅ ነው፣ ቀኖቹም በትምህርት ቤቱ ይወሰናሉ — አመራሩም በጀቱ መኖሩን የማስታወቅ ግልጽ ግዴታ አለበት።",
    },
    bodies: {
      he: `## הזכות שמעטים יודעים עליה

בכתבה על [הסכומים המרביים בתשפ"ז](/he/news/parent-payments-tashpaz-maximum-amounts-2026) הזכרנו שאין למנוע מתלמיד להשתתף בפעילות בגלל אי-תשלום מסיבה כלכלית. הכתבה הזאת עוסקת במה שקיים **בנוסף** לכלל הזה: תקציב מלגות אמיתי, שמשרד החינוך מקצה לבתי ספר בדיוק למטרה הזו.

ההוראה המסדירה אותו היא **הוראת קבע 0406, "הענקת מלגות לתלמידים שהוריהם מתקשים לשלם עבור אביזרי לימוד ופעילויות חינוכיות וחברתיות"**, שפורסמה ב-1 בספטמבר 2023 והיא בתוקף מאותו יום. היא מבטלת כל הוראה קודמת בנושא.

## הסכומים

- **בחינוך היסודי: ₪100–750 לתלמיד.**
- **בחינוך העל-יסודי: ₪100–1,200 לתלמיד.**

מקור: [חוזר הוראות קבע 0406, משרד החינוך, 1.9.2023, בתוקף](https://apps.education.gov.il/Mankal/horaa.aspx?siduri=507) · נבדק ספטמבר 2026.

ההוראה מציינת שהטווח הזה הורחב לעומת ההוראה הקודמת (מס' 222, משנת תשע"ט) "כדי לאפשר למוסדות גמישות מרבית".

## למי זה מיועד

לתלמידים בבתי ספר בפיקוח ממלכתי וממלכתי-דתי, וכן לתלמידי רשתות החינוך העצמאי ומעיין החינוך התורני המלמדות על פי תוכנית הליבה — בחינוך היסודי, בחטיבות הביניים ובחטיבות העליונות, במגזר היהודי, הערבי, הדרוזי והבדואי.

התקציב מוקצה לבית הספר **על פי תבחינים סוציו-אקונומיים**: לפי שכבת הגיל ולפי העשירון שבו בית הספר נמצא במדד הטיפוח, ביחס למספר התלמידים.

## שני תנאי סף שכדאי להכיר

1. **בית ספר בלי אישור אפיק לא יכול לחלק מלגות.** ההוראה קובעת: "תנאי סף להקצאת תקציב מלגות לבית ספר הוא קבלת אישור במערכת אפיק לגביית תשלומי הורים וקיום גבייה בפועל". גובה המלגה לא יעלה על גובה תשלומי ההורים שאושרו באפיק לאותה שנה.
2. **בית ספר שגובה פחות מ-₪100 בשנה אינו רשאי להעניק מלגות כלל.**

עוד קובעת ההוראה: **אין לשלם במזומן להורים.** המחאות יינתנו רק במקרים חריגים.

## איך ההחלטה מתקבלת

ההחלטה בידי **ועדת מלגות בית-ספרית**. ההוראה מסבירה את ההיגיון בכנות: "מאחר שאין אפשרות לסייע לכלל התלמידים המתקשים בתשלום... ממונה ועדת מלגות שמטרתה לאתר את הנצרכים ביותר ולסייע להם, ולו באופן חלקי".

הניקוד בנוי משני חלקים:

- **משקל ההכנסה החודשית לנפש — 85%.** ההוראה מביאה טבלת מדרגות לדוגמה, שבה הכנסה לנפש של עד ₪1,299 מקבלת את הניקוד הגבוה ביותר, והכנסה של ₪2,781 ומעלה את הנמוך ביותר.
- **ניקוד פרטני — 15%.** הוועדה רשאית להוסיף **עד 15 נקודות** לפי שיקול דעתה, עבור נתונים שאינם באים לידי ביטוי בהכנסה לנפש — ההוראה נותנת כדוגמאות "הוצאות רפואיות חריגות עבור התלמיד או בני משפחתו, נסיבות משפחתיות מורכבות וכדומה". על הוועדה לפרט את הנימוקים.

זה משנה את מה שכדאי לכתוב בטופס. אם יש בבית הוצאה חריגה שאינה נראית בתלוש — **כתבו אותה.** יש לה מקום בניקוד.

## המועדים — נקבעים בבית הספר, לא בירושלים

ההוראה מטילה על הוועדה לקבוע מועדים להגשת הבקשות ומועדים לדיון בהשגות על החלטותיה, ולפרסמם להורים. כלומר: **אין תאריך ארצי אחיד.** התאריך שרלוונטי לכם הוא זה שבית הספר שלכם פרסם, ובדרך כלל הוא נופל בשבועות הראשונים של השנה.

חוזר תשלומי ההורים לתשפ"ז מוסיף שבתי ספר שבתוכנית הגפ"ן מקצים מלגות לפי הנוהל שבמדריך הגפ"ן; מוסדות שאינם בגפ"ן מקבלים את התקציב באמצעות ספק חיצוני.

**פרוטוקולי הוועדה חסויים** ונשמרים בבית הספר. פנייה ישירה של הורה למשרד החינוך בבקשת מלגה תועבר בחזרה למנהל בית הספר, שיפנה אותה לוועדה — כך שאין טעם לעקוף את המסלול.

## חובת הפרסום — והיא זו שנשענים עליה

זו הנקודה החשובה ביותר להורים. שני מקורות אומרים את זה במפורש:

- הוראה 0406: "על הנהלת בית הספר לוודא שכל התלמידים הזקוקים לסיוע יהיו מודעים לקיומו של תקציב המלגות. הפרסום ייעשה במצורף למכתב הבקשה לתשלומי הורים וכן על לוחות המודעות במשרדי בית הספר."
- הודעה 0379 (תשלומי הורים תשפ"ז): "המנהלים מתבקשים לפעול להקצאת תקציב המלגות בהתאם להנחיות אלה וליידע את התלמידים ואת הוריהם על אודותיו."

**אם לא קיבלתם שום מידע על תקציב המלגות יחד עם דרישת התשלום — זו לא טעות שלכם.** אפשר לבקש את הפרטים ואת מועד ההגשה במזכירות.

## מה לעשות מחר

1. בקשו במזכירות את **טופס הבקשה למלגת סיוע בתשלומי הורים** ואת המועד האחרון להגשה.
2. מלאו גם את הסעיפים על נסיבות חריגות — שם נמצאות 15 הנקודות.
3. אם נדחיתם — לוועדה יש מועד קבוע לדיון בהשגות. בקשו אותו.

הטופס מפורסם גם באתר משרד החינוך, בעברית ובערבית.

## מקורות

- [חוזר הוראות קבע 0406 — הענקת מלגות לתלמידים שהוריהם מתקשים לשלם, משרד החינוך, 1.9.2023](https://apps.education.gov.il/Mankal/horaa.aspx?siduri=507) — נקרא במלואו 8.9.2026
- [הודעה 0379 — תשלומי הורים לשנת הלימודים התשפ"ז, 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377)
- [טופס בקשה לקבלת מלגת סיוע בתשלומי הורים (PDF)](https://meyda.education.gov.il/files/Prh/Parents/RightsObligationsRegulations/application-scholarship-form.pdf)
- [הכתבה שלנו על הסכומים המרביים בתשפ"ז](/he/news/parent-payments-tashpaz-maximum-amounts-2026)
- [זכויות הורים במערכת החינוך — טדרוס](/he/education/parent-rights)`,
      en: `## The entitlement few people know about

In our article on [the maximum amounts for 5787](/en/news/parent-payments-tashpaz-maximum-amounts-2026) we noted that a pupil may not be barred from an activity because of non-payment due to financial difficulty. This article is about what exists **in addition** to that rule: a real scholarship budget, which the Ministry of Education allocates to schools for exactly this purpose.

The instrument governing it is **Permanent Instruction 0406, "Granting scholarships to pupils whose parents struggle to pay for learning materials and educational and social activities,"** published on September 1, 2023 and in force from that day. It cancels every earlier instruction on the subject.

## The amounts

- **In primary school: ₪100–750 per pupil.**
- **In secondary school: ₪100–1,200 per pupil.**

Source: [Permanent Instructions circular 0406, Ministry of Education, 1.9.2023, in force](https://apps.education.gov.il/Mankal/horaa.aspx?siduri=507) · verified September 2026.

The instruction notes that this range was widened relative to the previous instruction (no. 222, from 5779) "in order to give institutions maximum flexibility."

## Who it is for

Pupils in state and state-religious schools, and pupils of the Independent Education and Ma'ayan HaChinuch HaTorani networks that teach the core curriculum — in primary schools, middle schools and high schools, across the Jewish, Arab, Druze and Bedouin sectors.

The budget is allocated to the school **according to socio-economic criteria**: by age level and by the school's decile on the nurture index, proportionally to the number of pupils.

## Two thresholds worth knowing

1. **A school without Afik approval cannot distribute scholarships.** The instruction states: "a threshold condition for allocating a scholarship budget to a school is receiving approval in the Afik system for collecting parent payments and actually collecting them." The scholarship may not exceed the parent payments approved on Afik for that year.
2. **A school that collects less than ₪100 a year may not award scholarships at all.**

The instruction adds: **no cash payments to parents.** Cheques only in exceptional cases.

## How the decision is made

The decision rests with a **school scholarship committee**. The instruction explains the logic candidly: "since it is not possible to help all the pupils who struggle to pay... a scholarship committee is appointed whose purpose is to identify those in greatest need and to help them, even if only partially."

The scoring has two parts:

- **Monthly income per capita — 85% of the weight.** The instruction gives a sample bracket table in which an income per capita of up to ₪1,299 receives the highest score, and ₪2,781 and above the lowest.
- **Individual scoring — 15%.** The committee may add **up to 15 points** at its discretion for facts that income per capita does not capture — the instruction gives as examples "exceptional medical expenses for the pupil or their family members, complex family circumstances and the like." The committee must set out its reasons.

This changes what is worth writing on the form. If the household carries an exceptional expense that does not show on a payslip — **write it down.** It has a place in the score.

## The deadlines — set by the school, not by Jerusalem

The instruction requires the committee to set dates for submitting applications and dates for hearing objections to its decisions, and to publish them to parents. In other words: **there is no single national date.** The date that matters to you is the one your school published, and it usually falls in the first weeks of the year.

The 5787 parent-payments circular adds that schools in the GPN programme allocate scholarships per the procedure in the GPN guide; institutions outside GPN receive the budget through an external contractor.

**The committee's minutes are confidential** and are kept at the school. A parent's direct approach to the Ministry of Education requesting a scholarship is routed back to the school principal, who refers it to the committee — so there is no point in trying to bypass the route.

## The duty to publicize — and it is the one to lean on

This is the most important point for parents. Two sources say it explicitly:

- Instruction 0406: "The school management must ensure that all pupils in need of assistance are aware of the existence of the scholarship budget. Publication shall be made together with the parent-payments request letter and on the notice boards in the school offices."
- Notice 0379 (parent payments 5787): "Principals are asked to act on allocating the scholarship budget in accordance with these guidelines and to inform pupils and their parents about it."

**If you received no information at all about the scholarship budget alongside the payment demand — that is not your mistake.** You may ask the school office for the details and the submission date.

## What to do tomorrow

1. Ask the school office for the **application form for parent-payment assistance** and the submission deadline.
2. Fill in the sections on exceptional circumstances too — that is where the 15 points live.
3. If you are refused — the committee has a set date for hearing objections. Ask for it.

The form is also published on the Ministry of Education's site, in Hebrew and in Arabic.

## Sources

- [Permanent Instructions circular 0406 — granting scholarships to pupils whose parents struggle to pay, Ministry of Education, 1.9.2023](https://apps.education.gov.il/Mankal/horaa.aspx?siduri=507) — read in full 8.9.2026
- [Notice 0379 — parent payments for the 5787 school year, 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377)
- [Application form for parent-payment assistance (PDF)](https://meyda.education.gov.il/files/Prh/Parents/RightsObligationsRegulations/application-scholarship-form.pdf)
- [Our article on the maximum amounts for 5787](/en/news/parent-payments-tashpaz-maximum-amounts-2026)
- [Parents' rights in the education system — Tedros](/en/education/parent-rights)`,
      am: `## ጥቂቶች የሚያውቁት መብት

በ[የ5787 ከፍተኛ መጠኖች](/am/news/parent-payments-tashpaz-maximum-amounts-2026) ጽሑፋችን በኢኮኖሚ ችግር ምክንያት ባለመክፈሉ ተማሪ ከእንቅስቃሴ መከልከል እንደማይቻል ገልጸናል። ይህ ጽሑፍ ከዚያ ደንብ **በተጨማሪ** ስላለው ነው፦ የትምህርት ሚኒስቴር ለዚሁ ዓላማ ለትምህርት ቤቶች የሚመድበው እውነተኛ የስኮላርሺፕ በጀት።

የሚያስተዳድረው መመሪያ **ቋሚ መመሪያ 0406፣ «ወላጆቻቸው ለመማሪያ ቁሳቁስና ለትምህርታዊና ማህበራዊ እንቅስቃሴዎች ለመክፈል ለሚቸገሩ ተማሪዎች ስኮላርሺፕ ስለ መስጠት»** ሲሆን በሴፕቴምበር 1, 2023 ታትሞ ከዚያ ቀን ጀምሮ በሥራ ላይ ነው። በዚህ ጉዳይ የነበረውን ማንኛውንም ቀደም ያለ መመሪያ ይሰርዛል።

## መጠኖቹ

- **በአንደኛ ደረጃ ትምህርት፦ በተማሪ ₪100–750።**
- **በሁለተኛ ደረጃ ትምህርት፦ በተማሪ ₪100–1,200።**

ምንጭ፦ [የቋሚ መመሪያዎች ማስታወቂያ 0406፣ የትምህርት ሚኒስቴር፣ 1.9.2023፣ በሥራ ላይ](https://apps.education.gov.il/Mankal/horaa.aspx?siduri=507) · በሴፕቴምበር 2026 ተረጋግጧል።

መመሪያው ይህ ክልል «ለተቋማት ከፍተኛ ተለዋዋጭነት ለመስጠት» ከቀድሞው መመሪያ (ቁጥር 222፣ ከ5779) አንጻር መስፋቱን ይገልጻል።

## ለማን ነው

በመንግሥትና በመንግሥት-ሃይማኖታዊ ቁጥጥር ላሉ ትምህርት ቤቶች ተማሪዎች፣ እንዲሁም የመሠረታዊ ሥርዓተ ትምህርቱን ለሚያስተምሩ የነጻ ትምህርትና የማዕያን ሃሒኑኽ ሃቶራኒ መረቦች ተማሪዎች — በአንደኛ ደረጃ፣ በመካከለኛ ደረጃና በሁለተኛ ደረጃ፣ በአይሁድ፣ በአረብ፣ በድሩዝና በቤዱዊን ዘርፎች።

በጀቱ ለትምህርት ቤቱ የሚመደበው **በማህበራዊ-ኢኮኖሚያዊ መስፈርቶች** ነው፦ በዕድሜ ደረጃና ትምህርት ቤቱ በእንክብካቤ መለኪያ ላይ ባለው አስረኛ ደረጃ፣ ከተማሪዎች ብዛት ጋር በተመጣጣኝ።

## ማወቅ የሚገባቸው ሁለት መስፈርቶች

1. **የአፊቅ ፈቃድ የሌለው ትምህርት ቤት ስኮላርሺፕ ማከፋፈል አይችልም።** መመሪያው ይላል፦ «ለትምህርት ቤት የስኮላርሺፕ በጀት ለመመደብ የመግቢያ ሁኔታው የወላጅ ክፍያ ለመሰብሰብ በአፊቅ ሥርዓት ፈቃድ ማግኘትና በተግባርም መሰብሰብ ነው»። የስኮላርሺፑ መጠን ለዚያ ዓመት በአፊቅ ከጸደቀው የወላጅ ክፍያ መብለጥ አይችልም።
2. **በዓመት ከ₪100 በታች የሚሰበስብ ትምህርት ቤት በጭራሽ ስኮላርሺፕ መስጠት አይችልም።**

መመሪያው ይጨምራል፦ **ለወላጆች በጥሬ ገንዘብ መክፈል አይቻልም።** ቼክ የሚሰጠው በልዩ ሁኔታዎች ብቻ ነው።

## ውሳኔው እንዴት ይሰጣል

ውሳኔው በ**የትምህርት ቤቱ የስኮላርሺፕ ኮሚቴ** እጅ ነው። መመሪያው አመክንዮውን በግልጽ ያስረዳል፦ «ለመክፈል የሚቸገሩትን ተማሪዎች ሁሉ መርዳት ስለማይቻል... በጣም የተቸገሩትን ለይቶ ለመርዳት፣ ቢያንስ በከፊል፣ የስኮላርሺፕ ኮሚቴ ይሾማል»።

ነጥቡ ሁለት ክፍል አለው፦

- **በነፍስ ወከፍ ወርሃዊ ገቢ — 85% ክብደት።** መመሪያው የናሙና ደረጃ ሠንጠረዥ ያቀርባል፤ በዚህም እስከ ₪1,299 ያለው በነፍስ ወከፍ ገቢ ከፍተኛውን ነጥብ፣ ₪2,781 እና ከዚያ በላይ ደግሞ ዝቅተኛውን ያገኛል።
- **የግል ነጥብ — 15%።** ኮሚቴው በነፍስ ወከፍ ገቢ የማይገለጹ ሁኔታዎችን ግምት ውስጥ በማስገባት **እስከ 15 ነጥብ** በራሱ ውሳኔ መጨመር ይችላል — መመሪያው «ለተማሪው ወይም ለቤተሰቡ አባላት ያልተለመደ የሕክምና ወጪ፣ ውስብስብ የቤተሰብ ሁኔታዎችና የመሳሰሉት» የሚሉ ምሳሌዎችን ይሰጣል። ኮሚቴው ምክንያቶቹን ማብራራት አለበት።

ይህ በቅጹ ላይ ምን መጻፍ እንደሚገባ ይለውጣል። በቤት ውስጥ በደመወዝ ወረቀት የማይታይ ያልተለመደ ወጪ ካለ — **ይጻፉት።** በነጥቡ ውስጥ ቦታ አለው።

## ቀነ ገደቦቹ — በትምህርት ቤቱ እንጂ በኢየሩሳሌም አይወሰኑም

መመሪያው ኮሚቴው ማመልከቻ የሚቀርብበትን ቀንና በውሳኔዎቹ ላይ ተቃውሞ የሚሰማበትን ቀን እንዲወስንና ለወላጆች እንዲያሳውቅ ያስገድዳል። ማለትም፦ **አንድ ወጥ ብሔራዊ ቀን የለም።** ለእርስዎ የሚመለከተው ቀን ትምህርት ቤትዎ ያሳወቀው ነው፣ አብዛኛውን ጊዜም በዓመቱ የመጀመሪያ ሳምንታት ይወድቃል።

የ5787 የወላጅ ክፍያ ማስታወቂያ ይጨምራል፦ በጋፓን ፕሮግራም ውስጥ ያሉ ትምህርት ቤቶች በጋፓን መመሪያ ደንብ መሠረት ስኮላርሺፕ ይመድባሉ፤ ከጋፓን ውጪ ያሉ ተቋማት በጀቱን በውጭ አቅራቢ በኩል ይቀበላሉ።

**የኮሚቴው ቃለ ጉባኤ ሚስጥራዊ ነው** በትምህርት ቤቱም ይቀመጣል። ወላጅ ስኮላርሺፕ ጠይቆ በቀጥታ ወደ ትምህርት ሚኒስቴር ቢሄድ ጉዳዩ ወደ ትምህርት ቤቱ ርዕሰ መምህር ይመለሳል፣ እሱም ወደ ኮሚቴው ይመራዋል — ስለዚህ መንገዱን ለማለፍ መሞከር ትርጉም የለውም።

## የማሳወቅ ግዴታ — መደገፍ የሚገባው ይህ ነው

ለወላጆች ዋነኛው ነጥብ ይህ ነው። ሁለት ምንጮች በግልጽ ይሉታል፦

- መመሪያ 0406፦ «የትምህርት ቤቱ አመራር ድጋፍ የሚያስፈልጋቸው ተማሪዎች ሁሉ የስኮላርሺፕ በጀቱ መኖሩን እንዲያውቁ ማረጋገጥ አለበት። ማሳወቂያው ከወላጅ ክፍያ ጥያቄ ደብዳቤ ጋር እንዲሁም በትምህርት ቤቱ ጽሕፈት ቤቶች ማስታወቂያ ሰሌዳ ላይ ይሆናል።»
- ማስታወቂያ 0379 (የ5787 የወላጅ ክፍያ)፦ «ርዕሳነ መምህራን በእነዚህ መመሪያዎች መሠረት የስኮላርሺፕ በጀቱን እንዲመድቡና ተማሪዎችንና ወላጆቻቸውን እንዲያሳውቁ ይጠየቃሉ።»

**ከክፍያ ጥያቄው ጋር ስለ ስኮላርሺፕ በጀቱ ምንም መረጃ ካልደረሰዎት — የእርስዎ ስህተት አይደለም።** ዝርዝሩንና የማስረከቢያ ቀኑን በጽሕፈት ቤቱ መጠየቅ ይችላሉ።

## ነገ ምን ማድረግ

1. በጽሕፈት ቤቱ **የወላጅ ክፍያ ድጋፍ ማመልከቻ ቅጽ**ንና የመጨረሻውን የማስረከቢያ ቀን ይጠይቁ።
2. ስለ ልዩ ሁኔታዎች ያሉትን ክፍሎችም ይሙሉ — 15ቱ ነጥቦች የሚገኙት እዚያ ነው።
3. ውድቅ ከተደረጉ — ኮሚቴው ተቃውሞ የሚሰማበት የተወሰነ ቀን አለው። ይጠይቁት።

ቅጹ በትምህርት ሚኒስቴር ድረ-ገጽ ላይም በዕብራይስጥና በአረብኛ ታትሟል።

## ምንጮች

- [የቋሚ መመሪያዎች ማስታወቂያ 0406 — ወላጆቻቸው ለመክፈል ለሚቸገሩ ተማሪዎች ስኮላርሺፕ ስለ መስጠት፣ የትምህርት ሚኒስቴር፣ 1.9.2023](https://apps.education.gov.il/Mankal/horaa.aspx?siduri=507) — ሙሉ በሙሉ የተነበበ 8.9.2026
- [ማስታወቂያ 0379 — ለ5787 የትምህርት ዓመት የወላጅ ክፍያዎች፣ 10.8.2026](https://apps.education.gov.il/Mankal/Hodaa.aspx?siduri=377)
- [የወላጅ ክፍያ ድጋፍ ማመልከቻ ቅጽ (PDF)](https://meyda.education.gov.il/files/Prh/Parents/RightsObligationsRegulations/application-scholarship-form.pdf)
- [ስለ የ5787 ከፍተኛ መጠኖች ጽሑፋችን](/am/news/parent-payments-tashpaz-maximum-amounts-2026)
- [በትምህርት ሥርዓት ውስጥ የወላጆች መብቶች — ትድሮስ](/am/education/parent-rights)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
];
