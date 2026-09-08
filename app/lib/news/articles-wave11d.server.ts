// Wave 11d articles — heritage, community, cities and housing (TED-165),
// researched and verified 2026-09-02.
//
// Same discipline as waves 8 and 10: every item rests on a primary source
// that was opened and read in full — the CBS release PDF was downloaded and
// its text extracted, the Tel Aviv University and Heritage Center pages were
// pulled as raw HTML and read, the Netanya municipality page likewise.
//
// Six candidates were opened and dropped rather than published:
//   * a Ynet feature on an HIT animation graduation project about Ethiopian
//     wedding customs — genuinely good material, but the page carries no
//     publication date anywhere and it could not be established whether it
//     is from 2022 or 2026;
//   * the Kiryat Malachi Chabad-neighbourhood renewal plan — the approval is
//     from 2023-2024, not news;
//   * the State Comptroller's report on local authorities and Ethiopian-
//     Israeli integration — July 2024;
//   * the Heritage Center's research-group call — its deadline was
//     20 February 2026 and has passed;
//   * the return of the "מות האבות" manuscript to the community —
//     February/March 2025;
//   * the Ethiopian Jewish heritage museum in Kiryat Yam — the page carries
//     no address, no hours and no date, and Kiryat Yam has no city page here.
import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE11D: NewsArticleEntry[] = [
  // 1 — Sigd 5787 date correction -------------------------------------------
  {
    slug: "sigd-5787-monday-9-november-2026",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["holiday", "announcement"],
    title: {
      he: 'סיגד תשפ"ז יחול ביום שני, 9 בנובמבר 2026 — ומה מגיע לכם ביום הזה',
      en: "Sigd 5787 falls on Monday, 9 November 2026 — and what you are entitled to that day",
      am: "ሰግድ 5787 ሰኞ፣ ኅዳር 9፣ 2026 ይውላል — በዚያ ቀን ምን መብት አለዎት",
    },
    excerpt: {
      he: 'כ"ט בחשוון תשפ"ז חל ביום שני, 9 בנובמבר 2026. עובדי מדינה זכאים לשני ימי בחירה בשכר בשנה, ובמגזר הפרטי הסיגד הוא יום בחירה שיורד ממכסת החופשה. תיקנו תאריך שגוי שהופיע אצלנו.',
      en: "29 Cheshvan 5787 falls on Monday, 9 November 2026. State employees are entitled to two paid choice days a year; in the private sector Sigd is a choice day deducted from annual leave. We have corrected a wrong date that appeared on our pages.",
      am: "29 ኅዳር 5787 ሰኞ፣ ኅዳር 9፣ 2026 ይውላል። የመንግሥት ሠራተኞች በዓመት ሁለት የተከፈለባቸው የምርጫ ቀናት አላቸው፤ በግል ዘርፍ ሰግድ ከዓመታዊ ዕረፍት የሚቀነስ የምርጫ ቀን ነው። በገጾቻችን ላይ የነበረውን የተሳሳተ ቀን አርመናል።",
    },
    bodies: {
      he: `## התאריך

**סיגד תשפ"ז יחול ביום שני, 9 בנובמבר 2026.**

החג חל בכ"ט בחשוון, 50 יום אחרי יום הכיפורים. יום הכיפורים תשפ"ז חל השנה ב-21 בספטמבר 2026, וכ"ט בחשוון תשפ"ז נופל ב-9 בנובמבר 2026 — יום שני. כל-זכות מנסחת זאת במפורש: "חג הסיגד חל ביום שני כ"ט בחשוון 09.11.2026".

בדקנו את ההמרה גם בשני הכיוונים במחשבון התאריכים העבריים של Hebcal: כ"ט בחשוון תשפ"ז ← 9.11.2026, ו-9.11.2026 ← כ"ט בחשוון תשפ"ז.

## תיקון

עד היום הופיע באתר הזה התאריך **19 בנובמבר 2026** — בדף מורשת הסיגד, במדריך התפריט לסיגד ובכתבה קודמת, שאף כינתה אותו "יום חמישי". זו הייתה טעות, והיא תוקנה בכל המקומות. אם תכננתם חופשה, הסעה או אירוע לפי התאריך שפרסמנו — התאריך הנכון הוא **9.11.2026**.

## השנים הבאות

| שנה עברית | כ"ט בחשוון | הערה |
|-----------|-----------|------|
| תשפ"ז | יום שני, 9.11.2026 | |
| תשפ"ח | 29.11.2027 | |
| תשפ"ט | 18.11.2028 — שבת | לפי כל-זכות, כשהתאריך חל בשבת החג מוקדם ליום חמישי, כלומר 16.11.2028 |

## מה מגיע לכם ביום הסיגד

חוק חג הסיגד, התשס"ח-2008, הפך את הסיגד לחג רשמי במדינת ישראל. מבחינת יום עבודה, כל-זכות מסכמת את המצב כך:

- **במגזר הפרטי** — הסיגד הוא **יום בחירה**. אתם רשאים לבחור אם לעבוד או להיעדר; אם נעדרתם, היום יורד ממכסת ימי החופשה השנתית שלכם.
- **עובדי מדינה** — רשאים להיעדר, לפי בחירתם, **בשני ימי בחירה בכל שנה ולקבל עבורם שכר**.
- **סטודנטים המועסקים בשירות המדינה** — שכר עבור **יום בחירה אחד בלבד** בכל שנה.

זה אומר בפועל: אם אתם עובדי מדינה, אתם לא צריכים לוותר על יום חופש כדי להגיע לירושלים. אם אתם במגזר הפרטי, כדאי להודיע למעסיק מוקדם ולתאם את היום כיום בחירה.

מקור: [כל-זכות — חג הסיגד](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · נבדק ספטמבר 2026.

## איפה מתקיים הטקס

הטקס המרכזי מתקיים בטיילת ארמון הנציב בירושלים, בהובלת הקסים, ולצדו טקסים עירוניים בערים שבהן קהילה גדולה. שעות, הסעות ותוכנייה מתפרסמות בכל שנה סמוך לחג על ידי הרשות המקומית ועל ידי הגופים המארגנים — בדקו מולם, ואל תסתמכו על לוח זמנים משנה קודמת.

## קראו גם

- [סיגד — דף המורשת](/he/heritage/events/sigd)
- [תפריט הסיגד — הצום והשבירה](/he/culinary/sigd-menu)
- [הכתבה הקודמת שלנו על מועדי הסיגד (תוקנה)](/he/news/sigd-2026-dates-and-details)

## מקורות

- [כל-זכות — חג הסיגד](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · נבדק 2.9.2026
- [Hebcal — ממיר תאריכים עבריים](https://www.hebcal.com/converter?hy=5787&hm=Cheshvan&hd=29&h2g=1) · נבדק 2.9.2026
- חוק חג הסיגד, התשס"ח-2008`,
      en: `## The date

**Sigd 5787 falls on Monday, 9 November 2026.**

The holiday falls on 29 Cheshvan, 50 days after Yom Kippur. Yom Kippur 5787 falls on 21 September 2026, and 29 Cheshvan 5787 lands on 9 November 2026 — a Monday. Kol Zchut states it explicitly: "חג הסיגד חל ביום שני כ"ט בחשוון 09.11.2026".

We checked the conversion in both directions against Hebcal's Hebrew-date converter: 29 Cheshvan 5787 → 9 Nov 2026, and 9 Nov 2026 → 29 Cheshvan 5787.

## Correction

Until today this site carried the date **19 November 2026** — on the Sigd heritage page, in the Sigd menu guide and in an earlier article, which also called it a Thursday. That was wrong, and it has been corrected everywhere. If you planned leave, a bus or an event around the date we published, the correct date is **9 November 2026**.

## The years after

| Hebrew year | 29 Cheshvan | Note |
|-------------|-------------|------|
| 5787 | Monday, 9 Nov 2026 | |
| 5788 | 29 Nov 2027 | |
| 5789 | 18 Nov 2028 — a Saturday | Per Kol Zchut, when the date falls on Shabbat the observance moves forward to the Thursday, i.e. 16 Nov 2028 |

## What you are entitled to on Sigd

The Sigd Holiday Law, 5768-2008, made Sigd an official holiday of the State of Israel. As a working day, Kol Zchut summarises the position:

- **Private sector** — Sigd is a **choice day** (יום בחירה). You may choose whether to work or take the day; if you take it, it is deducted from your annual leave entitlement.
- **State employees** — may be absent, at their choice, on **two choice days each year and be paid for them**.
- **Students employed in the state service** — paid for **one choice day only** each year.

In practice: if you are a state employee you do not have to give up a vacation day to get to Jerusalem. If you are in the private sector, tell your employer early and register the day as a choice day.

Source: [Kol Zchut — the Sigd holiday](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · verified September 2026.

## Where the ceremony is held

The main ceremony takes place on the Armon Hanatziv promenade in Jerusalem, led by the kessim, alongside municipal ceremonies in cities with a large community. Times, buses and the programme are published each year close to the holiday by the local authority and the organising bodies — check with them, and do not rely on last year's schedule.

## Read also

- [Sigd — the heritage page](/en/heritage/events/sigd)
- [The Sigd menu — the fast and the break-fast](/en/culinary/sigd-menu)
- [Our earlier article on the Sigd dates (corrected)](/en/news/sigd-2026-dates-and-details)

## Sources

- [Kol Zchut — the Sigd holiday](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · verified 2 Sep 2026
- [Hebcal — Hebrew date converter](https://www.hebcal.com/converter?hy=5787&hm=Cheshvan&hd=29&h2g=1) · verified 2 Sep 2026
- The Sigd Holiday Law, 5768-2008`,
      am: `## ቀኑ

**ሰግድ 5787 ሰኞ፣ ኅዳር 9፣ 2026 ይውላል።**

በዓሉ በ29 ኅሽዋን ይውላል፣ ከዮም ኪፑር 50 ቀናት በኋላ። የ5787 ዮም ኪፑር መስከረም 21፣ 2026 ይውላል፣ 29 ኅሽዋን 5787 ደግሞ ኅዳር 9፣ 2026 — ሰኞ ነው። ኮል-ዝኹት በግልጽ እንዲህ ይላል፦ «ሰግድ ሰኞ 29 ኅሽዋን 09.11.2026 ይውላል»።

## እርማት

እስከ ዛሬ ይህ ጣቢያ **ኅዳር 19፣ 2026** የሚል ቀን ይዞ ነበር — በሰግድ የቅርስ ገጽ፣ በሰግድ ማዕድ መመሪያና በቀድሞ ጽሑፍ ላይ። ያ ስህተት ነበር፣ በሁሉም ቦታ ተስተካክሏል። ትክክለኛው ቀን **ኅዳር 9፣ 2026** ነው።

## የሚቀጥሉት ዓመታት

| የዕብራይስጥ ዓመት | 29 ኅሽዋን | ማስታወሻ |
|---|---|---|
| 5787 | ሰኞ፣ ኅዳር 9፣ 2026 | |
| 5788 | ኅዳር 29፣ 2027 | |
| 5789 | ኅዳር 18፣ 2028 — ቅዳሜ | በኮል-ዝኹት መሠረት ቀኑ በሰንበት ሲውል በዓሉ ወደ ሐሙስ ይቀድማል፣ ማለትም ኅዳር 16፣ 2028 |

## በሰግድ ቀን ምን መብት አለዎት

የሰግድ በዓል ህግ፣ 5768-2008፣ ሰግድን የእስራኤል መንግሥት ይፋዊ በዓል አድርጎታል። እንደ የሥራ ቀን፣ ኮል-ዝኹት ሁኔታውን እንዲህ ያጠቃልላል፦

- **በግል ዘርፍ** — ሰግድ **የምርጫ ቀን** ነው። መሥራት ወይም መቅረት መምረጥ ይችላሉ፤ ከቀሩ ከዓመታዊ ዕረፍትዎ ይቀነሳል።
- **የመንግሥት ሠራተኞች** — በምርጫቸው **በዓመት ሁለት የምርጫ ቀናት ቀርተው ክፍያ የማግኘት** መብት አላቸው።
- **በመንግሥት አገልግሎት የተቀጠሩ ተማሪዎች** — በዓመት **ለአንድ የምርጫ ቀን ብቻ** ክፍያ።

ምንጭ፦ [ኮል-ዝኹት — የሰግድ በዓል](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · መስከረም 2026 ተረጋግጧል።

## ስነ-ስርዓቱ የት ይካሄዳል

ዋናው ስነ-ስርዓት በኢየሩሳሌም በአርሞን ሀናጺቭ ጎዳና ላይ በቄሶች መሪነት ይካሄዳል፣ ከዚያም ጎን ትልቅ ማህበረሰብ ባለባቸው ከተሞች የከተማ ስነ-ስርዓቶች ይኖራሉ። ሰዓቶች፣ መጓጓዣና መርሃ ግብር በየዓመቱ ከበዓሉ አጠገብ ይታተማሉ — እነሱን ያረጋግጡ።

## ተጨማሪ ያንብቡ

- [ሰግድ — የቅርስ ገጽ](/am/heritage/events/sigd)
- [የሰግድ ማዕድ — ጾሙና መሰበሩ](/am/culinary/sigd-menu)
- [ስለ ሰግድ ቀኖች የቀድሞ ጽሑፋችን (ተስተካክሏል)](/am/news/sigd-2026-dates-and-details)

## ምንጮች

- [ኮል-ዝኹት — የሰግድ በዓል](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · መስከረም 2፣ 2026 ተረጋግጧል
- [Hebcal — የዕብራይስጥ ቀን መቀየሪያ](https://www.hebcal.com/converter?hy=5787&hm=Cheshvan&hd=29&h2g=1)
- የሰግድ በዓል ህግ፣ 5768-2008`,
    },
  },

  // 2 — CBS locality table --------------------------------------------------
  {
    slug: "where-the-community-lives-cbs-locality-table",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["cities", "community"],
    title: {
      he: "איפה גרה הקהילה: הטבלה המלאה של הלמ״ס — נתניה במספרים, קריית מלאכי באחוזים",
      en: "Where the community lives: the full CBS table — Netanya by number, Kiryat Malachi by share",
      am: "ማህበረሰቡ የት ይኖራል፦ ሙሉው የCBS ሰንጠረዥ — ናታንያ በቁጥር፣ ቅርያት ማላኺ በመቶኛ",
    },
    excerpt: {
      he: "בסוף 2024 מנתה האוכלוסייה ממוצא אתיופי 177.6 אלף תושבים — 1.8% מאוכלוסיית ישראל. נתניה מובילה במספרים (13.3 אלף), קריית מלאכי באחוזים (13.8%). הטבלה המלאה של כל 23 היישובים, מתוך הודעת הלמ״ס לרגל הסיגד.",
      en: "At the end of 2024 the Ethiopian-origin population numbered 177,600 — 1.8% of Israel's population. Netanya leads by number (13,300), Kiryat Malachi by share (13.8%). The full table of all 23 localities, from the CBS Sigd release.",
      am: "በ2024 መጨረሻ የኢትዮጵያ ተወላጅ ሕዝብ 177,600 ነበር — ከእስራኤል ሕዝብ 1.8%። ናታንያ በቁጥር (13,300)፣ ቅርያት ማላኺ በመቶኛ (13.8%) ትመራለች። ከCBS የሰግድ ዘገባ የ23ቱ ከተሞች ሙሉ ሰንጠረዥ።",
    },
    bodies: {
      he: `## למה עכשיו

הלמ"ס מפרסמת מדי שנה, לקראת הסיגד, לקט נתונים על האוכלוסייה ממוצא אתיופי בישראל. הפרסום האחרון — **הודעה 367/2025, שיצאה ב-16 בנובמבר 2025** — הוא הנתון העדכני ביותר שקיים, והוא מתייחס לסוף שנת 2024. הפרסום הבא צפוי סמוך ל[סיגד תשפ"ז, 9 בנובמבר 2026](/he/news/sigd-5787-monday-9-november-2026). עד אז, אלה המספרים.

קראנו את הודעת הלמ"ס במלואה. מה שמובא כאן לקוח ממנה ישירות.

## התמונה הארצית

- **177.6 אלף תושבים** ממוצא אתיופי בסוף 2024 — **1.8%** מאוכלוסיית ישראל (10,065.5 אלף).
- מתוכם **93.4 אלף ילידי אתיופיה** (כ-53%) ו**84.2 אלף ילידי ישראל שאביהם נולד באתיופיה** (כ-47%).
- בנוסף: 6,860 ילידי ישראל שאִמם בלבד נולדה באתיופיה, ועוד 1,029 זרים בעלי תעודת זהות אתיופית.
- **בשנת 2024 עלו מאתיופיה 285 איש** — לעומת 1,812 ב-2023 ו-1,680 ב-2022.

## איפה גרים

64.6% מהאוכלוסייה מתגוררת בשני מחוזות: **המרכז (37.2%, כ-66.1 אלף איש)** ו**הדרום (27.4%, כ-48.8 אלף)**. במחוז תל אביב מתגוררים 6.4% (כ-11.3 אלף).

## הטבלה המלאה — יישובים עם 2,000 תושבים ויותר ממוצא אתיופי

| יישוב | תושבים ממוצא אתיופי (אלפים) | סה"כ תושבים (אלפים) | אחוז |
|-------|------------------------------|----------------------|------|
| [קריית מלאכי](/he/cities/kiryat-malakhi) | 3.9 | 28.0 | **13.8%** |
| [קריית גת](/he/cities/kiryat-gat) | 8.5 | 72.1 | 11.8% |
| [יבנה](/he/cities/yavne) | 3.8 | 58.1 | 6.5% |
| [עפולה](/he/cities/afula) | 4.1 | 66.4 | 6.2% |
| [אשקלון](/he/cities/ashkelon) | 10.1 | 166.9 | 6.1% |
| חדרה | 6.4 | 108.0 | 5.9% |
| [נתניה](/he/cities/netanya) | **13.3** | 234.8 | 5.6% |
| [רמלה](/he/cities/ramla) | 4.7 | 86.1 | 5.5% |
| קריית ים | 2.2 | 42.0 | 5.3% |
| [באר שבע](/he/cities/beer-sheva) | 11.4 | 223.6 | 5.1% |
| [לוד](/he/cities/lod) | 4.7 | 94.2 | 5.0% |
| [רחובות](/he/cities/rehovot) | 7.8 | 155.0 | 5.0% |
| [נתיבות](/he/cities/netivot) | 2.7 | 56.0 | 4.7% |
| [קריית ביאליק](/he/cities/kiryat-bialik) | 2.1 | 47.1 | 4.4% |
| [פתח תקווה](/he/cities/petach-tikva) | 10.5 | 270.4 | 3.9% |
| [ראשון לציון](/he/cities/rishon-lezion) | 9.9 | 259.3 | 3.8% |
| [אשדוד](/he/cities/ashdod) | 7.6 | 228.6 | 3.3% |
| [בית שמש](/he/cities/beit-shemesh) | 4.7 | 176.8 | 2.7% |
| [בת ים](/he/cities/bat-yam) | 2.7 | 129.5 | 2.1% |
| [חיפה](/he/cities/haifa) | 5.6 | 297.1 | 1.9% |
| [חולון](/he/cities/holon) | 3.1 | 191.8 | 1.6% |
| [ירושלים](/he/cities/jerusalem) | 6.5 | 1,050.2 | 0.6% |
| [תל אביב-יפו](/he/cities/tel-aviv) | 2.7 | 494.9 | 0.5% |

מקור: הלמ"ס, הודעה 367/2025, לוח א, סוף 2024.

## מה הטבלה הזאת אומרת בפועל

שני מספרים שונים מספרים שני סיפורים. **נתניה** היא היישוב עם מספר התושבים הגבוה ביותר ממוצא אתיופי — 13.3 אלף — אבל הם 5.6% מהעיר. **קריית מלאכי**, עם 3.9 אלף בלבד, היא היישוב שבו הקהילה היא החלק הגדול ביותר מהאוכלוסייה: 13.8%, כמעט שמונה פעמים הממוצע הארצי.

זה מסביר למה שירות שנפתח בקריית מלאכי מרגיש אחרת מאותו שירות בנתניה: בקריית מלאכי ובקריית גת מדובר בשירות שהעיר כולה מרגישה, ובנתניה בשירות שכונתי.

## ילודה

בשנת 2024 נולדו **4,010 תינוקות** לנשים ממוצא אתיופי, כ-71% מהם לנשים ילידות אתיופיה. מספר הילדים הממוצע לאישה עמד על **2.54**, נמוך מזה של יהודיות ואחרות (2.94).

היישובים עם מספר הילודים הרב ביותר לאימהות ממוצא אתיופי: **נתניה (311)**, **ראשון לציון (257)** ו**פתח תקווה (239)**. היישובים עם האחוז הגבוה ביותר של ילודים כאלה מכלל הילודים ביישוב: **קריית מלאכי (כ-15%)**, **קריית גת (כ-14%)** ו**קריית ים (כ-12%)**.

## גיל ומשק בית

- **26.2%** מהאוכלוסייה ממוצא אתיופי הם ילדים בני 0–14 (יותר מ-94.6% מהם ילידי ישראל) — דומה לכלל היהודים והאחרים (26.7%).
- **7.0%** בני 65 ומעלה — לעומת **15.0%** בקרב היהודים והאחרים, כמעט פי שניים. זו אוכלוסייה צעירה.
- **46.3 אלף משקי בית** (ממוצע 2022–2024), בגודל ממוצע של **3.70 נפשות** לעומת 2.99 בקרב היהודים והאחרים.

## קראו גם

- [ערים — כל דפי הערים](/he/cities)
- [דמוגרפיה — נתוני הקהילה](/he/statistics/demographics)
- [סיגד תשפ"ז — 9 בנובמבר 2026](/he/news/sigd-5787-monday-9-november-2026)

## מקורות

- [הלמ"ס — האוכלוסייה ממוצא אתיופי בישראל, לקט נתונים לרגל חג הסיגד 2025 (הודעה 367/2025)](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · פורסם 16.11.2025 · נבדק 2.9.2026`,
      en: `## Why now

Each year, ahead of Sigd, Israel's Central Bureau of Statistics publishes a data compilation on the Ethiopian-origin population. The most recent — **release 367/2025, published 16 November 2025** — is the newest figure that exists, and it describes the end of 2024. The next one is expected close to [Sigd 5787, 9 November 2026](/en/news/sigd-5787-monday-9-november-2026). Until then, these are the numbers.

We read the CBS release in full. What follows is taken from it directly.

## The national picture

- **177,600 residents** of Ethiopian origin at the end of 2024 — **1.8%** of Israel's population (10,065,500).
- Of these, **93,400 born in Ethiopia** (~53%) and **84,200 born in Israel to a father born in Ethiopia** (~47%).
- In addition: 6,860 Israel-born whose mother alone was born in Ethiopia, and 1,029 foreign nationals holding Ethiopian identity documents.
- **285 people immigrated from Ethiopia in 2024** — against 1,812 in 2023 and 1,680 in 2022.

## Where they live

64.6% live in two districts: the **Central district (37.2%, about 66,100 people)** and the **Southern district (27.4%, about 48,800)**. The Tel Aviv district holds 6.4% (about 11,300).

## The full table — localities with 2,000 or more residents of Ethiopian origin

| Locality | Ethiopian-origin residents (thousands) | Total residents (thousands) | Share |
|----------|----------------------------------------|------------------------------|-------|
| [Kiryat Malachi](/en/cities/kiryat-malakhi) | 3.9 | 28.0 | **13.8%** |
| [Kiryat Gat](/en/cities/kiryat-gat) | 8.5 | 72.1 | 11.8% |
| [Yavne](/en/cities/yavne) | 3.8 | 58.1 | 6.5% |
| [Afula](/en/cities/afula) | 4.1 | 66.4 | 6.2% |
| [Ashkelon](/en/cities/ashkelon) | 10.1 | 166.9 | 6.1% |
| Hadera | 6.4 | 108.0 | 5.9% |
| [Netanya](/en/cities/netanya) | **13.3** | 234.8 | 5.6% |
| [Ramla](/en/cities/ramla) | 4.7 | 86.1 | 5.5% |
| Kiryat Yam | 2.2 | 42.0 | 5.3% |
| [Beersheba](/en/cities/beer-sheva) | 11.4 | 223.6 | 5.1% |
| [Lod](/en/cities/lod) | 4.7 | 94.2 | 5.0% |
| [Rehovot](/en/cities/rehovot) | 7.8 | 155.0 | 5.0% |
| [Netivot](/en/cities/netivot) | 2.7 | 56.0 | 4.7% |
| [Kiryat Bialik](/en/cities/kiryat-bialik) | 2.1 | 47.1 | 4.4% |
| [Petah Tikva](/en/cities/petach-tikva) | 10.5 | 270.4 | 3.9% |
| [Rishon LeZion](/en/cities/rishon-lezion) | 9.9 | 259.3 | 3.8% |
| [Ashdod](/en/cities/ashdod) | 7.6 | 228.6 | 3.3% |
| [Beit Shemesh](/en/cities/beit-shemesh) | 4.7 | 176.8 | 2.7% |
| [Bat Yam](/en/cities/bat-yam) | 2.7 | 129.5 | 2.1% |
| [Haifa](/en/cities/haifa) | 5.6 | 297.1 | 1.9% |
| [Holon](/en/cities/holon) | 3.1 | 191.8 | 1.6% |
| [Jerusalem](/en/cities/jerusalem) | 6.5 | 1,050.2 | 0.6% |
| [Tel Aviv-Yafo](/en/cities/tel-aviv) | 2.7 | 494.9 | 0.5% |

Source: CBS release 367/2025, Table A, end of 2024.

## What the table actually says

Two different numbers tell two different stories. **Netanya** has the largest number of Ethiopian-origin residents — 13,300 — but they are 5.6% of the city. **Kiryat Malachi**, with only 3,900, is the locality where the community forms the largest share of the population: 13.8%, almost eight times the national average.

That is why a service opening in Kiryat Malachi feels different from the same service in Netanya: in Kiryat Malachi and Kiryat Gat it is a service the whole town notices; in Netanya it is a neighbourhood service.

## Births

In 2024, **4,010 babies** were born to women of Ethiopian origin, about 71% of them to women born in Ethiopia. The total fertility rate was **2.54**, below that of Jewish and other women (2.94).

Localities with the most births to mothers of Ethiopian origin: **Netanya (311)**, **Rishon LeZion (257)** and **Petah Tikva (239)**. Localities where such births are the highest share of all births in the locality: **Kiryat Malachi (~15%)**, **Kiryat Gat (~14%)** and **Kiryat Yam (~12%)**.

## Age and household

- **26.2%** of the Ethiopian-origin population are children aged 0-14 (more than 94.6% of them Israel-born) — close to the figure for Jews and others (26.7%).
- **7.0%** are 65 or over — against **15.0%** among Jews and others, nearly double. This is a young population.
- **46,300 households** (2022-2024 average), with an average size of **3.70 people** against 2.99 among Jews and others.

## Read also

- [Cities — all city pages](/en/cities)
- [Demographics — community data](/en/statistics/demographics)
- [Sigd 5787 — 9 November 2026](/en/news/sigd-5787-monday-9-november-2026)

## Sources

- [CBS — The Ethiopian Population in Israel, data compilation for the Sigd holiday 2025 (release 367/2025)](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · published 16 Nov 2025 · verified 2 Sep 2026`,
      am: `## ለምን አሁን

የእስራኤል ማዕከላዊ ስታቲስቲክስ ቢሮ (CBS) በየዓመቱ ከሰግድ በፊት ስለ ኢትዮጵያ ተወላጅ ሕዝብ መረጃ ያወጣል። የቅርቡ — **ዘገባ 367/2025፣ ኅዳር 16፣ 2025 የወጣ** — እስካሁን ያለው አዲሱ አኃዝ ሲሆን የ2024 መጨረሻን ይገልጻል።

## ብሔራዊ ስዕል

- በ2024 መጨረሻ **177,600 ነዋሪዎች** የኢትዮጵያ ተወላጅ — ከእስራኤል ሕዝብ **1.8%**።
- ከእነዚህ **93,400 በኢትዮጵያ የተወለዱ** (~53%) እና **84,200 አባታቸው በኢትዮጵያ የተወለደ በእስራኤል የተወለዱ** (~47%)።
- **በ2024 ከኢትዮጵያ 285 ሰዎች መጡ** — በ2023 1,812፣ በ2022 1,680 ነበር።

## የት ይኖራሉ

64.6% በሁለት ክፍለ ሀገር ይኖራሉ፦ **መካከለኛው (37.2%፣ ~66,100)** እና **ደቡብ (27.4%፣ ~48,800)**። በቴል አቪቭ ክፍለ ሀገር 6.4% (~11,300)።

## ዋና ከተሞች

| ከተማ | የኢትዮጵያ ተወላጅ (ሺህ) | ጠቅላላ (ሺህ) | መቶኛ |
|---|---|---|---|
| [ቅርያት ማላኺ](/am/cities/kiryat-malakhi) | 3.9 | 28.0 | **13.8%** |
| [ቅርያት ጋት](/am/cities/kiryat-gat) | 8.5 | 72.1 | 11.8% |
| [ያቭኔ](/am/cities/yavne) | 3.8 | 58.1 | 6.5% |
| [አፉላ](/am/cities/afula) | 4.1 | 66.4 | 6.2% |
| [አሽቀሎን](/am/cities/ashkelon) | 10.1 | 166.9 | 6.1% |
| ሐዴራ | 6.4 | 108.0 | 5.9% |
| [ናታንያ](/am/cities/netanya) | **13.3** | 234.8 | 5.6% |
| [ራምላ](/am/cities/ramla) | 4.7 | 86.1 | 5.5% |
| [ቤርሼቫ](/am/cities/beer-sheva) | 11.4 | 223.6 | 5.1% |
| [ሎድ](/am/cities/lod) | 4.7 | 94.2 | 5.0% |
| [ሬሆቮት](/am/cities/rehovot) | 7.8 | 155.0 | 5.0% |
| [ፔታሕ ቲቅቫ](/am/cities/petach-tikva) | 10.5 | 270.4 | 3.9% |
| [ሪሾን ለጽዮን](/am/cities/rishon-lezion) | 9.9 | 259.3 | 3.8% |
| [አሽዶድ](/am/cities/ashdod) | 7.6 | 228.6 | 3.3% |
| [ኢየሩሳሌም](/am/cities/jerusalem) | 6.5 | 1,050.2 | 0.6% |

ምንጭ፦ CBS ዘገባ 367/2025፣ ሰንጠረዥ ሀ፣ የ2024 መጨረሻ።

## ይህ ምን ማለት ነው

**ናታንያ** በቁጥር ትመራለች (13,300)፣ ግን ከከተማዋ 5.6% ብቻ ናቸው። **ቅርያት ማላኺ** 3,900 ብቻ ቢኖራትም ማህበረሰቡ ከከተማዋ ሕዝብ ትልቁን ድርሻ የያዘባት ናት፦ 13.8%፣ ከብሔራዊ አማካይ ስምንት እጥፍ ገደማ።

## ልደት

በ2024 ለኢትዮጵያ ተወላጅ ሴቶች **4,010 ሕፃናት** ተወለዱ። አማካይ የልጆች ቁጥር **2.54** ነበር። በቁጥር የመሩት ከተሞች፦ ናታንያ (311)፣ ሪሾን ለጽዮን (257)፣ ፔታሕ ቲቅቫ (239)።

## ዕድሜና ቤተሰብ

- **26.2%** ከ0-14 ዓመት ልጆች ናቸው።
- **7.0%** ብቻ 65 እና ከዚያ በላይ ናቸው — ከአይሁዶችና ሌሎች 15.0% ጋር ሲነጻጸር።
- **46,300 ቤተሰቦች**፣ አማካይ መጠን **3.70 ሰዎች** (ከ2.99 ጋር ሲነጻጸር)።

## ተጨማሪ ያንብቡ

- [ከተሞች](/am/cities)
- [ስነ-ሕዝብ](/am/statistics/demographics)
- [ሰግድ 5787 — ኅዳር 9፣ 2026](/am/news/sigd-5787-monday-9-november-2026)

## ምንጮች

- [CBS — በእስራኤል የኢትዮጵያ ተወላጅ ሕዝብ፣ ለሰግድ 2025 (ዘገባ 367/2025)](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · ኅዳር 16፣ 2025 ታተመ · መስከረም 2፣ 2026 ተረጋግጧል`,
    },
  },

  // 3 — Gideon kingdom conference -------------------------------------------
  {
    slug: "gideon-kingdom-conference-jerusalem-october-2026",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["community", "announcement"],
    title: {
      he: "400 שנה לנפילת ממלכת הגדעונים: כנס בירושלים ב-14 באוקטובר",
      en: "400 years since the fall of the Gideon kingdom: a conference in Jerusalem on 14 October",
      am: "የጊዴዎን መንግሥት ከወደቀ 400 ዓመታት፦ ጥቅምት 14 በኢየሩሳሌም ጉባኤ",
    },
    excerpt: {
      he: "המרכז למורשת יהדות אתיופיה יקיים ב-14.10.2026 כנס \"חידושים בחקר ממלכת הגדעונים\", 400 שנה אחרי שהקיסר סוסניוס הכריע סופית את השלטון העצמי היהודי בהרי סמיין. הכנס פתוח לקהל, בבנייני האומה בירושלים.",
      en: "On 14 October 2026 the Center for Ethiopian Jewish Heritage holds a conference on new research into the Kingdom of the Gideons, 400 years after Emperor Susenyos finally defeated Jewish self-rule in the Simien mountains. Open to the public, at Binyanei Ha'uma in Jerusalem.",
      am: "የኢትዮጵያ አይሁድ ቅርስ ማዕከል ጥቅምት 14፣ 2026 «በጊዴዎን መንግሥት ጥናት ላይ አዳዲስ ግኝቶች» ጉባኤ ያካሂዳል፣ ንጉሥ ሱስንዮስ በሰሜን ተራሮች የነበረውን የአይሁድ ራስን በራስ ማስተዳደር ካሸነፈ 400 ዓመታት በኋላ።",
    },
    bodies: {
      he: `## מה מתקיים

**המרכז למורשת יהדות אתיופיה** יקיים ביום **14 באוקטובר 2026, בין 14:30 ל-20:00**, כנס בשם **"חידושים בחקר ממלכת הגדעונים"**. הכנס יתקיים במשכן המרכז בירושלים.

לפי הודעת המרכז באתרו, הכנס מציין **400 שנה לנפילת ממלכת הגדעונים** — השלטון העצמי היהודי בצפון אתיופיה, שהוכרע סופית בידי הקיסר סוסניוס ב-1626 — ומטרתו להציג את חידושי המחקר בנושא בפני קהילת החוקרים ובפני הציבור הרחב.

## מה זו ממלכת הגדעונים

"ממלכת הגדעונים" הוא השם שבמסורת הקהילה ניתן לשלטון העצמי של יהודי אתיופיה בהרי סמיין — ההרים הגבוהים ביותר בקרן אפריקה. הכינוי בא על שם מלכיה, שרבים מהם נשאו את השם גדעון, על שם השופט המקראי. ההנהגה הזאת הייתה פוליטית וצבאית כאחת, והיא ניהלה עימות ממושך עם השושלת השלמונית הנוצרית ששלטה באזור.

## למה זה עניין של הקהילה, לא רק של אקדמאים

הסיפור הזה כמעט לא מופיע בהיסטוריה הישראלית שנלמדת בבית הספר, ורוב מה שנכתב עליו נכתב בידי היסטוריונים נוצרים — כלומר בידי הצד שניצח. כנס שמציג מחקר חדש על התקופה הזאת הוא, בפועל, החזרה של נרטיב שלם למקום שבו אפשר לצטט אותו.

זה גם לא כנס יחיד: המרכז מקיים כנסים אקדמיים, השקות ספרים ואירועי פולקלור לאורך השנה, וכן אירועים סביב מועדים כמו הסיגד ויום השנה למבצע שלמה. כנס קודם של המרכז באותו נושא — "ממלכת הגדעונים: האוטונומיה המדינית של יהודי אתיופיה ומאבקיה בממלכה השלמונית הנוצרית" — התקיים כבר ב-2022.

## המרכז למורשת יהדות אתיופיה

המרכז הוא גוף ידע ממלכתי לחקר תרבותה ומורשתה של יהדות אתיופיה. הוא מפעיל מכון מחקר, ארכיון ומאגר מידע, פעילות הנצחה, חינוך ותערוכות, ומאגר אתרי מורשת של ביתא ישראל באתיופיה.

- **כתובת**: שדרות שז"ר 1, בנייני האומה, ירושלים
- **טלפון**: 02-6772568

פרטי הרשמה ותוכנייה מלאה מתפרסמים בעמוד הכנסים של המרכז. מומלץ לבדוק שם לפני שיוצאים לדרך.

## קראו גם

- [סיגד תשפ"ז — 9 בנובמבר 2026](/he/news/sigd-5787-monday-9-november-2026)
- [קסים — מנהיגות רוחנית בקהילה](/he/heritage/kessim)
- [ביתא ישראל — דף המורשת](/he/heritage/events/beta-israel)

## מקורות

- [המרכז למורשת יהדות אתיופיה — עמוד הכנסים](https://ethiopianjhc.org.il/%D7%9E%D7%97%D7%A7%D7%A8/%D7%9B%D7%A0%D7%A1%D7%99%D7%9D/) · נבדק 2.9.2026
- [המרכז למורשת יהדות אתיופיה — לוח אירועים](https://ethiopianjhc.org.il/events-calendar/) · נבדק 2.9.2026`,
      en: `## What is happening

The **Center for Ethiopian Jewish Heritage** will hold a conference titled **"New directions in the study of the Kingdom of the Gideons"** on **14 October 2026, from 14:30 to 20:00**, at the Center in Jerusalem.

According to the Center's own announcement, the conference marks **400 years since the fall of the Kingdom of the Gideons** — the Jewish self-rule in northern Ethiopia, finally defeated by Emperor Susenyos in 1626 — and aims to present new research to the scholarly community and to the general public.

## What the Kingdom of the Gideons was

"The Kingdom of the Gideons" is the name given in community tradition to the self-rule of Ethiopian Jews in the Simien mountains — the highest range in the Horn of Africa. The name comes from its kings, many of whom bore the name Gideon, after the biblical judge. This leadership was both political and military, and it fought a long conflict with the Christian Solomonic dynasty that ruled the region.

## Why this is a community matter, not only an academic one

This story barely appears in the Israeli history taught in schools, and most of what was written about it was written by Christian historians — that is, by the side that won. A conference presenting new research on the period is, in practice, the return of an entire narrative to a place where it can be cited.

Nor is it a one-off: the Center holds academic conferences, book launches and folklore events through the year, plus events around dates such as Sigd and the anniversary of Operation Solomon. An earlier Center conference on the same subject — "The Kingdom of the Gideons: the political autonomy of Ethiopian Jews and its struggles with the Christian Solomonic kingdom" — was held back in 2022.

## The Center for Ethiopian Jewish Heritage

The Center is a national knowledge body for the study of the culture and heritage of Ethiopian Jewry. It runs a research institute, an archive and database, commemoration activity, education and exhibitions, and a database of Beta Israel heritage sites in Ethiopia.

- **Address**: 1 Sderot Shazar, Binyanei Ha'uma, Jerusalem
- **Phone**: 02-6772568

Registration details and the full programme are published on the Center's conferences page. Check there before setting out.

## Read also

- [Sigd 5787 — 9 November 2026](/en/news/sigd-5787-monday-9-november-2026)
- [Kessim — the community's spiritual leadership](/en/heritage/kessim)
- [Beta Israel — the heritage page](/en/heritage/events/beta-israel)

## Sources

- [Center for Ethiopian Jewish Heritage — conferences page](https://ethiopianjhc.org.il/%D7%9E%D7%97%D7%A7%D7%A8/%D7%9B%D7%A0%D7%A1%D7%99%D7%9D/) · verified 2 Sep 2026
- [Center for Ethiopian Jewish Heritage — events calendar](https://ethiopianjhc.org.il/events-calendar/) · verified 2 Sep 2026`,
      am: `## ምን ይካሄዳል

**የኢትዮጵያ አይሁድ ቅርስ ማዕከል** በ**ጥቅምት 14፣ 2026፣ ከ14:30 እስከ 20:00**፣ **«በጊዴዎን መንግሥት ጥናት ላይ አዳዲስ ግኝቶች»** የተሰኘ ጉባኤ በኢየሩሳሌም ያካሂዳል።

በማዕከሉ ማስታወቂያ መሠረት ጉባኤው **የጊዴዎን መንግሥት ከወደቀ 400 ዓመታት** መሆኑን ያከብራል — በሰሜን ኢትዮጵያ የነበረው የአይሁድ ራስን በራስ ማስተዳደር በንጉሥ ሱስንዮስ በ1626 ተሸነፈ።

## የጊዴዎን መንግሥት ምንድን ነው

«የጊዴዎን መንግሥት» በማህበረሰቡ ትውፊት ውስጥ በሰሜን ተራሮች ለነበረው የኢትዮጵያ አይሁዶች ራስን በራስ ማስተዳደር የተሰጠ ስም ነው። ስሙ የመጣው ብዙዎቹ ጊዴዎን ተብለው ከሚጠሩት ነገሥታቱ ነው። ይህ አመራር ፖለቲካዊም ወታደራዊም ነበር፣ ከክርስቲያኑ የሰሎሞናዊ ሥርወ መንግሥት ጋር ረጅም ግጭት አካሂዷል።

## ለምን የማህበረሰብ ጉዳይ ነው

ይህ ታሪክ በእስራኤል ትምህርት ቤቶች ውስጥ ብዙም አይሰጥም፣ ስለ እሱ የተጻፈውም አብዛኛው በክርስቲያን ታሪክ ጸሐፊዎች — ማለትም ባሸነፈው ወገን — የተጻፈ ነው። አዲስ ጥናት የሚያቀርብ ጉባኤ ሙሉ ትረካን ወደ ሊጠቀስበት ወደሚችል ቦታ መመለስ ነው።

## ማዕከሉ

ማዕከሉ የኢትዮጵያ አይሁድ ባህልና ቅርስ ጥናት ብሔራዊ የዕውቀት አካል ነው። የምርምር ተቋም፣ ማህደር፣ የመረጃ ቋት፣ የመታሰቢያ ሥራ፣ ትምህርትና ኤግዚቢሽኖችን ያካሂዳል።

- **አድራሻ**፦ ሽዛር ጎዳና 1፣ ቢንየኔ ሃኡማ፣ ኢየሩሳሌም
- **ስልክ**፦ 02-6772568

## ተጨማሪ ያንብቡ

- [ሰግድ 5787 — ኅዳር 9፣ 2026](/am/news/sigd-5787-monday-9-november-2026)
- [ቄሶች](/am/heritage/kessim)
- [ቤተ እስራኤል](/am/heritage/events/beta-israel)

## ምንጮች

- [የኢትዮጵያ አይሁድ ቅርስ ማዕከል — የጉባኤዎች ገጽ](https://ethiopianjhc.org.il/%D7%9E%D7%97%D7%A7%D7%A8/%D7%9B%D7%A0%D7%A1%D7%99%D7%9D/) · መስከረም 2፣ 2026 ተረጋግጧል
- [የኢትዮጵያ አይሁድ ቅርስ ማዕከል — የዝግጅቶች ቀን መቁጠሪያ](https://ethiopianjhc.org.il/events-calendar/) · መስከረም 2፣ 2026 ተረጋግጧል`,
    },
  },

  // 4 — High Holidays 5787 in Beta Israel tradition --------------------------
  {
    slug: "high-holidays-5787-beta-israel-tradition",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["holiday", "community"],
    title: {
      he: 'הימים הנוראים תשפ"ז: התאריכים, והשמות שהקהילה נושאת להם',
      en: "The High Holidays of 5787: the dates, and the names the community carries for them",
      am: "የ5787 ታላላቅ በዓላት፦ ቀኖቹና ማህበረሰቡ የሚጠራቸው ስሞች",
    },
    excerpt: {
      he: 'ראש השנה תשפ"ז ב-12–13 בספטמבר, יום כיפור ב-21 בספטמבר, סוכות מ-26 בספטמבר. במסורת ביתא ישראל לחגים האלה שמות משלהם — ברהן סרקה, אסטסריו — ותפילה בגעז שהקסים נושאים בעל פה. וממנה נספרים 50 הימים עד הסיגד.',
      en: "Rosh Hashanah 5787 on 12-13 September, Yom Kippur on 21 September, Sukkot from 26 September. In Beta Israel tradition these holidays carry their own names — Berhan Saraqa, Astasreyo — and a Ge'ez liturgy the kessim hold by heart. And from Yom Kippur the 50 days to Sigd are counted.",
      am: "የ5787 ሮሽ ሃሻና መስከረም 12-13፣ ዮም ኪፑር መስከረም 21፣ ሱኮት ከመስከረም 26። በቤተ እስራኤል ትውፊት እነዚህ በዓላት የራሳቸው ስሞች አሏቸው — ብርሃን ሠረቀ፣ አስተስርዮ — እና ቄሶች በቃላቸው የያዙት የግዕዝ ጸሎት።",
    },
    bodies: {
      he: `## התאריכים

| חג | תאריך תשפ"ז |
|----|--------------|
| ראש השנה | 12–13 בספטמבר 2026 (החג נכנס בערב 11.9) |
| יום כיפור | 21 בספטמבר 2026 |
| סוכות | 26 בספטמבר – 2 באוקטובר 2026 |
| שמיני עצרת | 3 באוקטובר 2026 |
| שמחת תורה | 4 באוקטובר 2026 |
| **סיגד** | **9 בנובמבר 2026** — 50 יום אחרי יום הכיפורים |

התאריכים נבדקו בלוח החגים של Hebcal.

## השמות שהקהילה נושאת

במסורת ביתא ישראל לחגי תשרי שמות משלהם. ראש השנה נקרא **ברהן סרקה** (ברהן שרקה) — "האור זרח"; יום הכיפורים נקרא **אסטסריו**; לסוכות שם נפרד משלו. אלה אינם תרגומים של השמות העבריים אלא שמות עצמאיים, מלוח שנה שהתפתח מאות שנים ללא מגע עם הקהילות היהודיות האחרות.

## התפילה — בגעז, ובעל פה

הרב ד"ר שרון שלום, בסקירה שפרסם במכון שלום הרטמן ב-5 בדצמבר 2024, מתאר את הליטורגיה של ביתא ישראל כמסורת יהודית עתיקה ועצמאית, ולא — כפי שגרסה הנחת עבודה מחקרית רווחת — כהשפעה של המסורת הנוצרית האתיופית.

לפי אותה סקירה:

- התפילות בנויות מ**פסוקי מקרא מפורקים** מן התורה, הנביאים והתהילים, המורכבים יחד באופן שיוצר משמעות חדשה — כלומר מדרש, לא ציטוט.
- הן **נמסרות בעל פה ונרשמות בגעז**, לשון הקודש של הקהילה.
- בתפילת **ברהן סרקה** מופיעים תכנים של מלכות, זיכרון ושופר — במבנה המקביל למלכויות, זיכרונות ושופרות שבתפילת ראש השנה.

שלום מצטט קסים שאמרו לו במפורש, על טקסטים מקודשים שבידי הנוצרים באתיופיה, "הם לקחו את זה מאיתנו".

## מה זה אומר בפועל, השנה

מי שגדל בבית שבו הקסים הובילו את התפילה בגעז, ומתפלל היום בבית כנסת שבו הנוסח הוא ספרדי או אשכנזי, מכיר את הפער הזה. הוא לא פער של "פחות" או "יותר" — הוא פער בין שתי מסורות יהודיות שהתפתחו בנפרד.

לקראת הימים הנוראים כדאי לברר מראש מה מתקיים בעיר שלכם: יש קהילות שבהן הקסים מובילים תפילה נפרדת או משולבת, ויש מקומות שבהם אין. [דף הקסים לפי עיר](/he/heritage/kessim) הוא נקודת הפתיחה.

## הערת מקורות

התאריכים הלועזיים לקוחים מלוח החגים של Hebcal. תיאור הליטורגיה לקוח מהסקירה של הרב ד"ר שרון שלום במכון שלום הרטמן. השמות ברהן סרקה ואסטסריו מופיעים גם בערך "חגים ומועדים בקהילות ביתא ישראל" בוויקיפדיה העברית — מקור משני, שאנחנו מביאים כאן לצד המקור המחקרי ולא במקומו.

## קראו גם

- [קסים לפי עיר](/he/heritage/kessim)
- [ביתא ישראל — דף המורשת](/he/heritage/events/beta-israel)
- [סיגד תשפ"ז — 9 בנובמבר 2026](/he/news/sigd-5787-monday-9-november-2026)

## מקורות

- [Hebcal — לוח החגים היהודיים 2026](https://www.hebcal.com/holidays/2026) · נבדק 2.9.2026
- [הרב ד"ר שרון שלום, "חקר הליטורגיה בקהילת ביתא ישראל — מאפיינים ייחודיים", מכון שלום הרטמן, 5.12.2024](https://heb.hartman.org.il/bete_israel_litrugy/)`,
      en: `## The dates

| Holiday | Date, 5787 |
|---------|------------|
| Rosh Hashanah | 12-13 September 2026 (begins the evening of 11 Sept) |
| Yom Kippur | 21 September 2026 |
| Sukkot | 26 September - 2 October 2026 |
| Shmini Atzeret | 3 October 2026 |
| Simchat Torah | 4 October 2026 |
| **Sigd** | **9 November 2026** — 50 days after Yom Kippur |

Dates checked against Hebcal's Jewish holiday calendar.

## The names the community carries

In Beta Israel tradition the Tishrei holidays have names of their own. Rosh Hashanah is called **Berhan Saraqa** — "the light has risen"; Yom Kippur is called **Astasreyo**; Sukkot has its own separate name. These are not translations of the Hebrew names but independent ones, from a calendar that developed for centuries without contact with other Jewish communities.

## The prayer — in Ge'ez, and by heart

Rabbi Dr. Sharon Shalom, in a survey published by the Shalom Hartman Institute on 5 December 2024, describes the Beta Israel liturgy as an ancient and autonomous Jewish tradition — and not, as a widespread scholarly working assumption had it, as an influence of Ethiopian Christian tradition.

Per that survey:

- The prayers are built from **fragmented biblical verses** from the Torah, Prophets and Psalms, assembled so as to create new meaning — midrash, not citation.
- They are **transmitted orally and recorded in Ge'ez**, the community's sacred tongue.
- The **Berhan Saraqa** liturgy carries themes of kingship, remembrance and the shofar — paralleling the malkhuyot, zikhronot and shofarot of the Rosh Hashanah service.

Shalom quotes kessim who told him plainly, about sacred texts held by Christians in Ethiopia, "they took that from us".

## What this means in practice, this year

Anyone who grew up in a home where the kessim led prayer in Ge'ez, and who today prays in a synagogue with a Sephardi or Ashkenazi rite, knows this gap. It is not a gap of "less" or "more" — it is a gap between two Jewish traditions that developed apart.

Ahead of the High Holidays it is worth finding out in advance what is happening in your city: in some communities the kessim lead a separate or a combined service, and in some places there is none. The [kessim-by-city page](/en/heritage/kessim) is the starting point.

## A note on sources

The civil dates come from Hebcal's holiday calendar. The description of the liturgy comes from Rabbi Dr. Sharon Shalom's survey at the Shalom Hartman Institute. The names Berhan Saraqa and Astasreyo also appear in the Hebrew Wikipedia entry on Beta Israel holidays — a secondary source, which we cite alongside the scholarly one rather than in place of it.

## Read also

- [Kessim by city](/en/heritage/kessim)
- [Beta Israel — the heritage page](/en/heritage/events/beta-israel)
- [Sigd 5787 — 9 November 2026](/en/news/sigd-5787-monday-9-november-2026)

## Sources

- [Hebcal — Jewish holiday calendar 2026](https://www.hebcal.com/holidays/2026) · verified 2 Sep 2026
- [Rabbi Dr. Sharon Shalom, "Research on the liturgy of the Beta Israel community — distinctive features", Shalom Hartman Institute, 5 Dec 2024](https://heb.hartman.org.il/bete_israel_litrugy/)`,
      am: `## ቀኖቹ

| በዓል | የ5787 ቀን |
|---|---|
| ሮሽ ሃሻና | መስከረም 12-13፣ 2026 (መስከረም 11 ምሽት ይጀምራል) |
| ዮም ኪፑር | መስከረም 21፣ 2026 |
| ሱኮት | መስከረም 26 - ጥቅምት 2፣ 2026 |
| ሽሚኒ ዓጼረት | ጥቅምት 3፣ 2026 |
| ስምሓት ቶራ | ጥቅምት 4፣ 2026 |
| **ሰግድ** | **ኅዳር 9፣ 2026** — ከዮም ኪፑር 50 ቀናት በኋላ |

## ማህበረሰቡ የሚጠራቸው ስሞች

በቤተ እስራኤል ትውፊት የትሽሬ በዓላት የራሳቸው ስሞች አሏቸው። ሮሽ ሃሻና **ብርሃን ሠረቀ** ይባላል፤ ዮም ኪፑር **አስተስርዮ** ይባላል። እነዚህ የዕብራይስጥ ስሞች ትርጉሞች ሳይሆኑ ራሳቸውን የቻሉ ስሞች ናቸው።

## ጸሎቱ — በግዕዝ፣ በቃል

ራቢ ዶ/ር ሻሮን ሻሎም በሻሎም ሃርትማን ተቋም ኅዳር 5፣ 2024 ባሳተመው ጥናት የቤተ እስራኤልን ጸሎት እንደ ጥንታዊና ራሱን የቻለ የአይሁድ ትውፊት ይገልጻል፣ የኢትዮጵያ ክርስቲያናዊ ተጽዕኖ እንዳልሆነ ይከራከራል።

- ጸሎቶቹ ከኦሪት፣ ከነቢያትና ከመዝሙረ ዳዊት **ከተከፋፈሉ ጥቅሶች** የተገነቡ ናቸው።
- **በቃል ይተላለፋሉ በግዕዝም ይጻፋሉ**።
- የ**ብርሃን ሠረቀ** ጸሎት የንግሥና፣ የመታሰቢያና የመለከት ጭብጦችን ይይዛል።

## በተግባር ምን ማለት ነው

ቄሶች በግዕዝ ጸሎት በሚመሩበት ቤት ያደገ ሰው፣ ዛሬ ሰፋራዲ ወይም አሽከናዚ ሥርዓት ባለው ምኩራብ የሚጸልይ ከሆነ ይህን ልዩነት ያውቀዋል። «ያነሰ» ወይም «የበለጠ» ልዩነት አይደለም — ተለያይተው ያደጉ ሁለት የአይሁድ ትውፊቶች ልዩነት ነው።

## ተጨማሪ ያንብቡ

- [ቄሶች በከተማ](/am/heritage/kessim)
- [ቤተ እስራኤል](/am/heritage/events/beta-israel)
- [ሰግድ 5787 — ኅዳር 9፣ 2026](/am/news/sigd-5787-monday-9-november-2026)

## ምንጮች

- [Hebcal — የ2026 የአይሁድ በዓላት ቀን መቁጠሪያ](https://www.hebcal.com/holidays/2026) · መስከረም 2፣ 2026 ተረጋግጧል
- [ራቢ ዶ/ር ሻሮን ሻሎም፣ ሻሎም ሃርትማን ተቋም፣ ኅዳር 5፣ 2024](https://heb.hartman.org.il/bete_israel_litrugy/)`,
    },
  },
];
