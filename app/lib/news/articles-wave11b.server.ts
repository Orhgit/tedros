// Wave 11b articles — education and employment, manually researched and
// verified (2026-09-02), TED-163.
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
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["education"],
    title: {
      he: 'מלגת מרום נפתחת החודש — ובתשפ"ז תנאיה משתנים: חובת ההתנדבות מבוטלת, והסכום נקבע לפי תחום הלימוד',
      en: "The Marom scholarship opens this month — and its terms change for 5787: the volunteering requirement is abolished and the amount is set by field of study",
      am: "የማሮም ስኮላርሺፕ በዚህ ወር ይከፈታል — በ5787 ደግሞ ሁኔታዎቹ ይለወጣሉ፦ የበጎ ፈቃድ ግዴታ ይሰረዛል፣ መጠኑም በጥናት መስክ ይወሰናል",
    },
    excerpt: {
      he: 'ההרשמה למלגת מרום לשנת הלימודים תשפ"ז נפתחת במהלך ספטמבר 2026 ונסגרת בתחילת נובמבר. לפי דף המלגה של המל"ג, החל מתשפ"ז מבוטלת חובת ההתנדבות, וגובה המלגה נקבע כאחוז משכר הלימוד לפי רמת העדיפות של תחום הלימוד. זה מתקן פרט שפרסמנו בפברואר.',
      en: "Registration for the Marom scholarship for the 2026-27 academic year opens during September 2026 and closes in early November. Per the Council for Higher Education's own scholarship page, from 5787 the volunteering requirement is abolished and the amount is set as a percentage of tuition according to the priority level of the field of study. This corrects a detail we published in February.",
      am: "ለ2026-27 የትምህርት ዓመት የማሮም ስኮላርሺፕ ምዝገባ በሴፕቴምበር 2026 ውስጥ ይከፈታል፣ በኖቬምበር መጀመሪያ ይዘጋል። በከፍተኛ ትምህርት ምክር ቤት ገጽ መሠረት፣ ከ5787 ጀምሮ የበጎ ፈቃድ ግዴታ ይሰረዛል፣ መጠኑም በጥናት መስኩ ቅድሚያ ደረጃ መሠረት ከትምህርት ክፍያ በመቶኛ ይወሰናል። ይህ በየካቲት ያሳተምነውን ዝርዝር ያስተካክላል።",
    },
    bodies: {
      he: `## מה נפתח, ומתי

**ההרשמה למלגת מרום לשנת הלימודים תשפ"ז נפתחת במהלך חודש ספטמבר 2026.** כך כתוב, בלשון הזאת, בדף "הגשת מועמדות למלגה" באתר פר"ח — הגוף שמפעיל את התכנית. דף המלגה של המועצה להשכלה גבוהה (מל"ג) מוסיף את מועד הסגירה: "תקופת ההרשמה למלגה נפתחת בחודש ספטמבר מדי שנה ונסגרת בתחילת נובמבר".

זהו חלון של כשמונה שבועות, פעם בשנה. מי שמחמיץ אותו ממתין שנה.

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

## הלוח, בקצרה

- **ספטמבר 2026** — ההרשמה נפתחת, דרך לשונית "מרום" באתר פר"ח.
- **תחילת נובמבר** — ההרשמה נסגרת.
- **דצמבר** — הודעת זכאות או אי-זכאות במייל. במקרה של דחייה, בחלק מהמקרים אפשר להגיש ערעור.
- המלגה משולמת בשתי פעימות לאורך השנה.

**להכין מראש** (לפי דף המל"ג): תעודת זהות עם ספח, אישור לימודים רשמי, אישור בעלות על חשבון בנק, תעודות זהות של ההורים, תלושי שכר, ואישור לימודים של אח או אחות סטודנטים אם יש. הכול ב-PDF.

**ליצירת קשר עם צוות מרום בפר"ח:** milga.marom@perach-il.org · 054-7731216 (גם בוואטסאפ) · מענה טלפוני א'–ה' 8:00–15:00.

## מקורות

- [מלגת מרום — המועצה להשכלה גבוהה (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — נקרא במלואו 2.9.2026
- [החלטת מל"ג 18.6.2024 — עדכון תיעדוף תחומי לימוד ליוצאי אתיופיה](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/)
- [פר"ח — פרטים נוספים בהרשמה למלגת מרום](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D)
- [הכתבה שלנו מפברואר 2026, שפרטים בה מתוקנים כאן](/he/news/marom-scholarship-tashpav-cycle)
- [דף הזכות המלא של מלגת מרום באתר טדרוס](/he/education/scholarships/marom-che)`,
      en: `## What opens, and when

**Registration for the Marom scholarship for the 2026-27 academic year opens during September 2026.** That is the wording on the "submitting a candidacy" page of Perach, the organization that operates the programme. The Council for Higher Education's (CHE) scholarship page adds the closing date: "the registration period opens in September each year and closes in early November."

That is roughly an eight-week window, once a year. Miss it and you wait a year.

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

## The timeline, briefly

- **September 2026** — registration opens, through the "Marom" tab on Perach's site.
- **Early November** — registration closes.
- **December** — an eligibility or non-eligibility notice by email. If rejected, an appeal is possible in some cases.
- The scholarship is paid in two instalments over the year.

**Prepare in advance** (per the CHE page): ID card with the attached page, an official enrolment confirmation, proof of bank account ownership, parents' ID cards, payslips, and an enrolment confirmation for a sibling who is also a student, if there is one. All in PDF.

**To contact the Marom team at Perach:** milga.marom@perach-il.org · 054-7731216 (also WhatsApp) · phone Sun–Thu 8:00–15:00.

## Sources

- [Marom scholarship — Council for Higher Education (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — read in full 2.9.2026
- [CHE decision, June 18, 2024 — updating the prioritization of fields of study for Ethiopian-Israelis](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/)
- [Perach — further details on registering for Marom](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D)
- [Our February 2026 article, details of which are corrected here](/en/news/marom-scholarship-tashpav-cycle)
- [The full Marom rights page on Tedros](/en/education/scholarships/marom-che)`,
      am: `## ምን ይከፈታል፣ መቼም

**ለ2026-27 የትምህርት ዓመት የማሮም ስኮላርሺፕ ምዝገባ በሴፕቴምበር 2026 ውስጥ ይከፈታል።** ይህ ቃል በቃል ፕሮግራሙን በሚያንቀሳቅሰው በፔራች ድረ-ገጽ «ለስኮላርሺፑ ማመልከቻ ማቅረብ» ገጽ ላይ ተጽፏል። የከፍተኛ ትምህርት ምክር ቤት (CHE) ገጽ የመዝጊያውን ቀን ይጨምራል፦ «የምዝገባ ጊዜው በየዓመቱ በሴፕቴምበር ይከፈታል በኖቬምበር መጀመሪያ ይዘጋል»።

ይህ በዓመት አንድ ጊዜ የሚከፈት የስምንት ሳምንት ያህል መስኮት ነው። ያመለጠው አንድ ዓመት ይጠብቃል።

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

## የጊዜ ሰሌዳው በአጭሩ

- **ሴፕቴምበር 2026** — ምዝገባ ይከፈታል፣ በፔራች ድረ-ገጽ «ማሮም» ትር።
- **የኖቬምበር መጀመሪያ** — ምዝገባ ይዘጋል።
- **ዲሴምበር** — የብቁነት ወይም ብቁ ያለመሆን ማሳወቂያ በኢሜይል። ውድቅ ከሆነ በአንዳንድ ሁኔታዎች ይግባኝ ይቻላል።
- ስኮላርሺፑ በዓመቱ ውስጥ በሁለት ክፍያ ይሰጣል።

**አስቀድመው ያዘጋጁ** (በCHE ገጽ መሠረት)፦ መታወቂያ ከተያያዘው ወረቀት ጋር፣ ኦፊሴላዊ የትምህርት ማረጋገጫ፣ የባንክ ሒሳብ ባለቤትነት ማረጋገጫ፣ የወላጆች መታወቂያ፣ የደመወዝ ወረቀቶች፣ እና ተማሪ የሆነ ወንድም/እህት ካለ የእሱ/የእሷ የትምህርት ማረጋገጫ። ሁሉም በPDF።

**በፔራች የማሮም ቡድንን ለማግኘት፦** milga.marom@perach-il.org · 054-7731216 (በዋትስአፕም) · ስልክ እሑድ–ሐሙስ 8:00–15:00።

## ምንጮች

- [ማሮም ስኮላርሺፕ — የከፍተኛ ትምህርት ምክር ቤት (che.org.il)](https://che.org.il/scholarships/%D7%9E%D7%9C%D7%92%D7%AA-%D7%9E%D7%A8%D7%95%D7%9D/) — ሙሉ በሙሉ የተነበበ 2.9.2026
- [የCHE ውሳኔ፣ ሰኔ 18, 2024 — ለኢትዮጵያ-እስራኤላውያን የጥናት መስኮች ቅድሚያ ማዘመን](https://che.org.il/decision/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%99%D7%A2%D7%93%D7%95%D7%A3-%D7%AA%D7%97%D7%95%D7%9E%D7%99-%D7%9C%D7%99%D7%9E%D7%95%D7%93-%D7%9C%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4-2/)
- [ፔራች — ለማሮም ስለ መመዝገብ ተጨማሪ ዝርዝሮች](https://www.perach.org.il/%D7%94%D7%92%D7%A9%D7%AA-%D7%9E%D7%95%D7%A2%D7%9E%D7%93%D7%95%D7%AA-%D7%9C%D7%9E%D7%A8%D7%95%D7%9D)
- [የየካቲት 2026 ጽሑፋችን፣ ዝርዝሮቹ እዚህ የተስተካከሉ](/am/news/marom-scholarship-tashpav-cycle)
- [በትድሮስ ላይ ያለው ሙሉ የማሮም መብት ገጽ](/am/education/scholarships/marom-che)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
];
