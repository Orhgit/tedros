// Wave 11d articles — heritage, community, cities and housing (TED-165),
// researched and verified 2026-09-08.
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
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
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

- [כל-זכות — חג הסיגד](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · נבדק 8.9.2026
- [Hebcal — ממיר תאריכים עבריים](https://www.hebcal.com/converter?hy=5787&hm=Cheshvan&hd=29&h2g=1) · נבדק 8.9.2026
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

- [Kol Zchut — the Sigd holiday](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · verified 8 Sep 2026
- [Hebcal — Hebrew date converter](https://www.hebcal.com/converter?hy=5787&hm=Cheshvan&hd=29&h2g=1) · verified 8 Sep 2026
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

- [ኮል-ዝኹት — የሰግድ በዓል](https://www.kolzchut.org.il/he/%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · መስከረም 8፣ 2026 ተረጋግጧል
- [Hebcal — የዕብራይስጥ ቀን መቀየሪያ](https://www.hebcal.com/converter?hy=5787&hm=Cheshvan&hd=29&h2g=1)
- የሰግድ በዓል ህግ፣ 5768-2008`,
    },
  },

  // 2 — CBS locality table --------------------------------------------------
  {
    slug: "where-the-community-lives-cbs-locality-table",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
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

- [הלמ"ס — האוכלוסייה ממוצא אתיופי בישראל, לקט נתונים לרגל חג הסיגד 2025 (הודעה 367/2025)](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · פורסם 16.11.2025 · נבדק 8.9.2026`,
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

- [CBS — The Ethiopian Population in Israel, data compilation for the Sigd holiday 2025 (release 367/2025)](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · published 16 Nov 2025 · verified 8 Sep 2026`,
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

- [CBS — በእስራኤል የኢትዮጵያ ተወላጅ ሕዝብ፣ ለሰግድ 2025 (ዘገባ 367/2025)](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · ኅዳር 16፣ 2025 ታተመ · መስከረም 8፣ 2026 ተረጋግጧል`,
    },
  },

  // 3 — Gideon kingdom conference -------------------------------------------
  {
    slug: "gideon-kingdom-conference-jerusalem-october-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["community", "announcement"],
    title: {
      he: "400 שנה לנפילת ממלכת הגדעונים: כנס בירושלים ב-14 באוקטובר",
      en: "400 years since the fall of the Gideon kingdom: a conference in Jerusalem on 14 October",
      am: "የጊዴዎን መንግሥት ከወደቀ 400 ዓመታት፦ ጥቅምት 14 በኢየሩሳሌም ጉባኤ",
    },
    excerpt: {
      he: 'המרכז למורשת יהדות אתיופיה יקיים ב-14.10.2026 כנס "חידושים בחקר ממלכת הגדעונים", 400 שנה אחרי שהקיסר סוסניוס הכריע סופית את השלטון העצמי היהודי בהרי סמיין. הכנס פתוח לקהל, בבנייני האומה בירושלים.',
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

- [המרכז למורשת יהדות אתיופיה — עמוד הכנסים](https://ethiopianjhc.org.il/%D7%9E%D7%97%D7%A7%D7%A8/%D7%9B%D7%A0%D7%A1%D7%99%D7%9D/) · נבדק 8.9.2026
- [המרכז למורשת יהדות אתיופיה — לוח אירועים](https://ethiopianjhc.org.il/events-calendar/) · נבדק 8.9.2026`,
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

- [Center for Ethiopian Jewish Heritage — conferences page](https://ethiopianjhc.org.il/%D7%9E%D7%97%D7%A7%D7%A8/%D7%9B%D7%A0%D7%A1%D7%99%D7%9D/) · verified 8 Sep 2026
- [Center for Ethiopian Jewish Heritage — events calendar](https://ethiopianjhc.org.il/events-calendar/) · verified 8 Sep 2026`,
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

- [የኢትዮጵያ አይሁድ ቅርስ ማዕከል — የጉባኤዎች ገጽ](https://ethiopianjhc.org.il/%D7%9E%D7%97%D7%A7%D7%A8/%D7%9B%D7%A0%D7%A1%D7%99%D7%9D/) · መስከረም 8፣ 2026 ተረጋግጧል
- [የኢትዮጵያ አይሁድ ቅርስ ማዕከል — የዝግጅቶች ቀን መቁጠሪያ](https://ethiopianjhc.org.il/events-calendar/) · መስከረም 8፣ 2026 ተረጋግጧል`,
    },
  },

  // 4 — High Holidays 5787 in Beta Israel tradition --------------------------
  {
    slug: "high-holidays-5787-beta-israel-tradition",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
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

- [Hebcal — לוח החגים היהודיים 2026](https://www.hebcal.com/holidays/2026) · נבדק 8.9.2026
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

- [Hebcal — Jewish holiday calendar 2026](https://www.hebcal.com/holidays/2026) · verified 8 Sep 2026
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

- [Hebcal — የ2026 የአይሁድ በዓላት ቀን መቁጠሪያ](https://www.hebcal.com/holidays/2026) · መስከረም 8፣ 2026 ተረጋግጧል
- [ራቢ ዶ/ር ሻሮን ሻሎም፣ ሻሎም ሃርትማን ተቋም፣ ኅዳር 5፣ 2024](https://heb.hartman.org.il/bete_israel_litrugy/)`,
    },
  },

  // 5 — TAMA 38 expiry ------------------------------------------------------
  {
    slug: "tama-38-expired-what-replaces-it-in-our-cities",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["housing", "cities"],
    title: {
      he: 'תמ"א 38 פקעה ב-18 במאי. בערים שלנו — מי כבר החליף אותה ומי עוד לא',
      en: "TAMA 38 expired on 18 May. In our cities — who already has a replacement and who does not",
      am: "ታማ 38 ግንቦት 18 አበቃ። በከተሞቻችን — ማን ተኪ አለው ማን የለውም",
    },
    excerpt: {
      he: "התוכנית הארצית לחיזוק מבנים פקעה סופית ב-18.5.2026, ואי אפשר עוד להגיש בקשות להיתר מכוחה. במקומה — תוכניות עירוניות. ברמלה, ביבנה, בפתח תקווה ובבאר שבע כבר יש תוכנית מאושרת; בראשון לציון, באשקלון, בבית שמש ובחיפה עדיין לא. פינוי-בינוי הוא מסלול נפרד ולא הושפע.",
      en: "The national plan for structural reinforcement expired for good on 18 May 2026, and permit applications can no longer be filed under it. Municipal plans replace it. Ramla, Yavne, Petah Tikva and Beersheba already have an approved plan; Rishon LeZion, Ashkelon, Beit Shemesh and Haifa do not. Pinui-binui is a separate track and is unaffected.",
      am: "የሕንፃ ማጠናከሪያ ብሔራዊ ዕቅድ ግንቦት 18፣ 2026 በመጨረሻ አበቃ። በምትኩ የከተማ ዕቅዶች መጡ። ራምላ፣ ያቭኔ፣ ፔታሕ ቲቅቫና ቤርሼቫ የጸደቀ ዕቅድ አላቸው፤ ሪሾን ለጽዮን፣ አሽቀሎን፣ ቤት ሼመሽና ሐይፋ የላቸውም።",
    },
    bodies: {
      he: `## מה קרה

**תמ"א 38 — התוכנית הארצית לחיזוק מבנים מפני רעידות אדמה — פקעה סופית ב-18 במאי 2026.** מאותו יום אי אפשר להגיש בקשות חדשות להיתר בנייה מכוחה בשום מקום בארץ.

זה לא היה פתאומי. המועצה הארצית לתכנון ובנייה אישרה את ביטול התוכנית באפריל 2024, וב-31 ביולי 2024 היא פקעה עבור רוב הרשויות. חמש-עשרה רשויות שהגישו למוסדות התכנון תוכנית "התחדשות בניינית" מחליפה קיבלו הארכה — עד מאי 2026, או עד אישור התוכנית החדשה, המוקדם מביניהם. ההארכה הזאת נגמרה עכשיו.

## מה בא במקום

שני מסלולים:

1. **תוכניות התחדשות בניינית עירוניות** — כל עיר מגבשת תוכנית משלה, מותאמת לתשתיות, למרקם ולאופי הבנייה שלה, במקום תוכנית ארצית אחת גורפת.
2. **"חלופת שקד"** — מסלול מקביל שמאפשר להוציא היתרים בזמן שהתוכניות עדיין בהליך אישור.

## איפה זה עומד בערים שבהן קהילה גדולה

לפי סקירה של נמרוד בוסו במרכז הנדל"ן מ-10 ביוני 2026, זה המצב:

**תוכנית מחליפה כבר אושרה** — [רמלה](/he/cities/ramla), [יבנה](/he/cities/yavne), רעננה, חדרה, כפר סבא, [פתח תקווה](/he/cities/petach-tikva), [באר שבע](/he/cities/beer-sheva), גבעתיים.

**התוכנית עדיין בהליך** — תל אביב, ירושלים, [חיפה](/he/cities/haifa), רמת גן, [ראשון לציון](/he/cities/rishon-lezion), [בית שמש](/he/cities/beit-shemesh), [אשקלון](/he/cities/ashkelon) ואחרות.

שלוש ערים בחרו כבר ב-2024 לא לבקש הארכה כלל: [לוד](/he/cities/lod), [בת ים](/he/cities/bat-yam) ובני ברק. תל אביב-יפו הודיעה שלא תקדם תוכנית מחליפה, ותסתמך על חלופת שקד ועל תוכניות התחדשות מחוזיות.

בוסו מצטט את ראש אגף התכנון ברשות להתחדשות עירונית: "בשנת 2022 כשהתחלנו לעבוד על התוכניות, לא חשבנו שארבע שנים מאוחר יותר חלק ניכר מהן עדיין לא תהיינה בתוקף". לפי אותה סקירה, עד מועד הפרסום טרם הוצא ולו היתר בנייה אחד במסלול חלופת שקד.

## מה זה אומר לכם

- **אם יש לכם כבר היתר בנייה תקף מכוח תמ"א 38** — הפרויקט ממשיך. הפקיעה נוגעת להגשת בקשות חדשות.
- **אם הבניין שלכם באמצע מו"מ עם יזם על תמ"א 38** — בדקו מול הוועדה המקומית באיזה מסלול הפרויקט יכול להתקדם עכשיו. בערים שבהן אין עדיין תוכנית מאושרת, ייתכן עיכוב ממשי.
- **אם אתם בפינוי-בינוי** — זה מסלול חוקי אחר לגמרי. פקיעת תמ"א 38 לא נוגעת אליו.

**אזהרה מעשית**: זה בדיוק סוג המצב שבו מגיעים ל-ווטסאפ של דיירים "מסרים" עם חצי מידע. אל תחתמו על מסמך מול יזם על סמך מה שנאמר בעל פה על מצב תכנוני. בקשו את מספר התוכנית ובדקו אותו מול הוועדה המקומית או באתר מינהל התכנון.

## קראו גם

- [התחדשות עירונית — כל השכונות](/he/urban-renewal)
- [ערים — כל דפי הערים](/he/cities)
- [דיור — נתוני הקהילה](/he/statistics/housing)

## מקורות

- [נמרוד בוסו, "וואקום מסוכן: תמ"א 38 פקעה סופית, וברוב הערים אין לה מחליפה", מרכז הנדל"ן, 10.6.2026](https://www.nadlancenter.co.il/article/14694)
- [הילה ציון, "הסוף לתמ"א 38: מה יחליף אותה ואיפה היא בכל זאת תימשך? הרשימה המלאה", ynet, 31.7.2024](https://www.ynet.co.il/economy/article/rjbuacikr)`,
      en: `## What happened

**TAMA 38 — the national outline plan for reinforcing buildings against earthquakes — expired for good on 18 May 2026.** From that day, no new building-permit application can be filed under it anywhere in the country.

This was not sudden. The National Planning and Building Council approved discontinuing the plan in April 2024, and on 31 July 2024 it lapsed for most authorities. Fifteen authorities that had filed a replacement "building renewal" plan with the planning institutions received an extension — until May 2026, or until their new plan was approved, whichever came first. That extension has now run out.

## What replaces it

Two tracks:

1. **Municipal building-renewal plans** — each city drafts its own plan, fitted to its infrastructure, urban fabric and building character, instead of one sweeping national plan.
2. **The "Shaked alternative"** — a parallel track that allows permits to be issued while the plans are still in approval.

## Where this stands in cities with a large community

Per a review by Nimrod Buso at Nadlan Center published 10 June 2026:

**Replacement plan already approved** — [Ramla](/en/cities/ramla), [Yavne](/en/cities/yavne), Ra'anana, Hadera, Kfar Saba, [Petah Tikva](/en/cities/petach-tikva), [Beersheba](/en/cities/beer-sheva), Givatayim.

**Plan still in process** — Tel Aviv, Jerusalem, [Haifa](/en/cities/haifa), Ramat Gan, [Rishon LeZion](/en/cities/rishon-lezion), [Beit Shemesh](/en/cities/beit-shemesh), [Ashkelon](/en/cities/ashkelon) and others.

Three cities chose back in 2024 not to seek an extension at all: [Lod](/en/cities/lod), [Bat Yam](/en/cities/bat-yam) and Bnei Brak. Tel Aviv-Yafo announced it would not promote a replacement plan, relying instead on the Shaked amendment and district renewal plans.

Buso quotes the head of planning at the Urban Renewal Authority: "In 2022, when we started working on the plans, we did not think that four years later a substantial part of them would still not be in force." Per the same review, not a single building permit had yet been issued under the Shaked alternative as of publication.

## What this means for you

- **If you already hold a valid TAMA 38 building permit** — your project continues. The expiry concerns new applications.
- **If your building is mid-negotiation with a developer over TAMA 38** — check with the local planning committee which track the project can now advance under. In cities with no approved plan yet, expect real delay.
- **If you are in a pinui-binui project** — that is an entirely separate legal track. The TAMA 38 expiry does not touch it.

**A practical warning**: this is exactly the kind of moment when half-information circulates in residents' WhatsApp groups. Do not sign anything with a developer on the strength of what someone said about the planning situation. Ask for the plan number and check it with the local committee or on the Planning Administration site.

## Read also

- [Urban renewal — all neighbourhoods](/en/urban-renewal)
- [Cities — all city pages](/en/cities)
- [Housing — community data](/en/statistics/housing)

## Sources

- [Nimrod Buso, "A dangerous vacuum: TAMA 38 has finally expired, and most cities have no replacement", Nadlan Center, 10 June 2026](https://www.nadlancenter.co.il/article/14694)
- [Hila Tzion, "The end of TAMA 38: what will replace it and where it will nonetheless continue — the full list", ynet, 31 July 2024](https://www.ynet.co.il/economy/article/rjbuacikr)`,
      am: `## ምን ሆነ

**ታማ 38 — ሕንፃዎችን ከመሬት መንቀጥቀጥ ለማጠናከር የወጣው ብሔራዊ ዕቅድ — ግንቦት 18፣ 2026 በመጨረሻ አበቃ።** ከዚያ ቀን ጀምሮ በእሱ ሥር አዲስ የግንባታ ፈቃድ ማመልከቻ ማቅረብ አይቻልም።

## በምትኩ ምን መጣ

ሁለት መንገዶች፦

1. **የከተማ የሕንፃ ማደሻ ዕቅዶች** — እያንዳንዷ ከተማ የራሷን ዕቅድ ታዘጋጃለች።
2. **«የሻቀድ አማራጭ»** — ዕቅዶቹ በማጽደቅ ሂደት ላይ እያሉ ፈቃድ እንዲሰጥ የሚያስችል ትይዩ መንገድ።

## ትልቅ ማህበረሰብ ባለባቸው ከተሞች ያለው ሁኔታ

በንምሮድ ቡሶ (ናድላን ሴንተር፣ ሰኔ 10፣ 2026) ዘገባ መሠረት፦

**ተኪ ዕቅድ የጸደቀላቸው** — [ራምላ](/am/cities/ramla)፣ [ያቭኔ](/am/cities/yavne)፣ ራአናና፣ ሐዴራ፣ ክፋር ሳባ፣ [ፔታሕ ቲቅቫ](/am/cities/petach-tikva)፣ [ቤርሼቫ](/am/cities/beer-sheva)፣ ጊቫታይም።

**ዕቅዱ ገና በሂደት ላይ ያለ** — ቴል አቪቭ፣ ኢየሩሳሌም፣ [ሐይፋ](/am/cities/haifa)፣ ራማት ጋን፣ [ሪሾን ለጽዮን](/am/cities/rishon-lezion)፣ [ቤት ሼመሽ](/am/cities/beit-shemesh)፣ [አሽቀሎን](/am/cities/ashkelon)።

[ሎድ](/am/cities/lod)፣ [ባት ያም](/am/cities/bat-yam) እና ብኔ ብራቅ በ2024 ማራዘሚያ ላለመጠየቅ መርጠዋል።

## ለእርስዎ ምን ማለት ነው

- **ቀድሞ የጸና የታማ 38 ፈቃድ ካለዎት** — ፕሮጀክቱ ይቀጥላል።
- **ሕንፃዎ ከአልሚ ጋር በድርድር ላይ ከሆነ** — በየትኛው መንገድ መቀጠል እንደሚቻል ከአካባቢው ኮሚቴ ያረጋግጡ።
- **በፒኑይ-ቢኑይ ውስጥ ከሆኑ** — ይህ ፍጹም የተለየ የሕግ መንገድ ነው፣ አልተነካም።

**ተግባራዊ ማስጠንቀቂያ**፦ በቃል በተባለ የዕቅድ ሁኔታ ላይ ተመስርተው ከአልሚ ጋር ሰነድ አይፈርሙ። የዕቅዱን ቁጥር ጠይቀው ከአካባቢው ኮሚቴ ያረጋግጡ።

## ተጨማሪ ያንብቡ

- [የከተማ ማደስ](/am/urban-renewal)
- [ከተሞች](/am/cities)
- [መኖሪያ ቤት — መረጃ](/am/statistics/housing)

## ምንጮች

- [ንምሮድ ቡሶ፣ ናድላን ሴንተር፣ ሰኔ 10፣ 2026](https://www.nadlancenter.co.il/article/14694)
- [ሂላ ጽዮን፣ ynet፣ ሐምሌ 31፣ 2024](https://www.ynet.co.il/economy/article/rjbuacikr)`,
    },
  },

  // 6 — Kiryat Nordau, Netanya ----------------------------------------------
  {
    slug: "kiryat-nordau-netanya-korczak-complex-approved",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["housing", "cities"],
    title: {
      he: "קריית נורדאו: מתחם קורצ'אק אושר — 304 דירות ייהרסו, 1,155 ייבנו",
      en: "Kiryat Nordau: the Korczak complex is approved — 304 flats to be demolished, 1,155 built",
      am: "ቅርያት ኖርዳው፦ የኮርቻክ ሕንጻ ስብስብ ጸደቀ — 304 ቤቶች ይፈርሳሉ፣ 1,155 ይሠራሉ",
    },
    excerpt: {
      he: "בשכונה שבה, לפי מסמכי התוכנית, כשליש מהתושבים הם עולי אתיופיה וברית המועצות לשעבר, אושרה בדצמבר 2025 תב\"ע מפורטת לפינוי-בינוי במתחם עגנון-קורצ'אק. כ-87% מבעלי הזכויות כבר חתמו. הבנייה אמורה להתחיל בתוך שלוש שנים.",
      en: "In a neighbourhood where, per the plan documents, about a third of residents are olim from Ethiopia and the former Soviet Union, a detailed pinui-binui plan for the Agnon-Korczak complex was approved in December 2025. About 87% of rights holders have signed. Construction is due to begin within three years.",
      am: "በዕቅድ ሰነዶች መሠረት ከነዋሪዎቹ አንድ ሦስተኛ ገደማ ከኢትዮጵያና ከቀድሞ ሶቪየት ኅብረት የመጡ ኦሊም በሆኑበት ሰፈር፣ በታኅሣሥ 2025 ዝርዝር የፒኑይ-ቢኑይ ዕቅድ ጸደቀ። 87% ገደማ የመብት ባለቤቶች ፈርመዋል።",
    },
    bodies: {
      he: `## מה אושר

בדצמבר 2025 אושרה תב"ע מפורטת שנותנת תוקף לתוכנית פינוי-בינוי במתחם **ש"י עגנון–יאנוש קורצ'אק** בשכונת קריית נורדאו בנתניה.

לפי הדיווח, התוכנית כוללת:

- **הריסה של 304 יחידות דיור קיימות**
- **בנייה של כ-1,155 יחידות דיור** בתשעה בנייני מגורים — שילוב של בנייה רבת-קומות ובנייה מרקמית
- **כ-10,000 מ"ר מסחר**, חזית מסחרית בקומת הקרקע, תעסוקה ומוסדות ציבור
- כ-**87% מבעלי הזכויות** כבר חתמו על הסכמים עם היזם, רוטשטיין נדל"ן
- תחילת בנייה של השלב הראשון — **בתוך שלוש שנים**

מנכ"ל החברה, אבישי בן-חיים, נמסר כאומר: "זה פרויקט שעתיד לחולל שינוי של ממש במרקם השכונתי".

## ההקשר: תוכנית המתאר לכל השכונה

מתחם קורצ'אק הוא חלק מתוכנית גדולה בהרבה. תוכנית המתאר להתחדשות עירונית בקריית נורדאו (**נת/401**) הוגשה על ידי הרשות הממשלתית להתחדשות עירונית יחד עם הוועדה המקומית נתניה, ומשתרעת על **כ-967 דונם**. היא הופקדה ב-2021, והוועדה המחוזית מרכז החליטה לאשר אותה למתן תוקף.

התוכנית מגדילה את השכונה מכ-6,319 יחידות דיור (כולל 664 שאושרו קודם במתחם ש"י עגנון) ל**כ-11,344 יחידות דיור** ועוד 210 יחידות מיוחדות — תוספת של כ-4,900 דירות. לצדן: כ-124 דונם למבני ציבור, כ-30,000 מ"ר מסחר וכ-107 דונם שטחים פתוחים.

## למה זה נוגע לקהילה

קריית נורדאו הוקמה בשנות ה-50. לפי מסמכי התוכנית כפי שדווחו, בסוף 2013 התגוררו בה כ-19,500 תושבים, ו**כשליש מהם הם עולי אתיופיה ועולי ברית המועצות לשעבר**. מסמכי התוכנית מתארים את מצבה הפיזי של השכונה כירוד, ואת מאפייניה החברתיים-כלכליים כנמוכים במקצת מממוצע העיר.

[נתניה](/he/cities/netanya) היא היישוב עם מספר התושבים ממוצא אתיופי הגבוה בישראל — 13.3 אלף, לפי [נתוני הלמ"ס](/he/news/where-the-community-lives-cbs-locality-table). כשמפנים 304 משפחות ובונים 1,155 דירות במקומן, ההרכב של מי שחוזר לשכונה הוא שאלה שנקבעת בחוזים — לא בתוכנית.

## מה לבדוק אם אתם בעלי דירה שם

- **באיזה מתחם אתם** — התוכנית הכללית משתרעת על כל השכונה, אבל התב"ע המפורטת שאושרה נוגעת למתחם עגנון-קורצ'אק בלבד. אלה שני דברים שונים.
- **מה בדיוק חתמתם** — 87% חתימות זה נתון של היזם. אם לא חתמתם, אתם עדיין בעלי זכות, ואינכם חייבים לחתום על מה שהוצע לכם עד היום.
- **ליווי משפטי** — בפינוי-בינוי היזם משלם לעורך הדין של הדיירים, ולא אתם. אל תוותרו על ייעוץ עצמאי.
- **דיירים בשכירות** — התוכנית מדברת על בעלי זכויות. אם אתם שוכרים, מעמדכם שונה לגמרי; בררו אותו מוקדם.

## קראו גם

- [קריית נורדאו — דף השכונה](/he/urban-renewal/kiryat-nordau-netanya)
- [נתניה — דף העיר](/he/cities/netanya)
- [תמ"א 38 פקעה — מה זה אומר בערים שלנו](/he/news/tama-38-expired-what-replaces-it-in-our-cities)

## מקורות

- ["בתוך שלוש שנים תחל התחדשות הענק בקריית נורדאו בנתניה", מגדילים, 16.12.2025](https://magdilim.co.il/161220250913/)
- ["הופקדה תוכנית ההתחדשות העירונית לשכונת קריית נורדאו בנתניה", מרכז הנדל"ן, 19.9.2021](https://www.nadlancenter.co.il/article/4335)
- ["בדרך ל-11 אלף יח\\"ד: אושרה סופית תוכנית המתאר להתחדשות עירונית בקריית נורדאו נתניה", מרכז הנדל"ן, 30.3.2022 (עודכן 30.7.2023)](https://www.nadlancenter.co.il/article/5402)`,
      en: `## What was approved

In December 2025 a detailed plan was approved giving legal force to the pinui-binui scheme for the **S.Y. Agnon–Janusz Korczak** complex in the Kiryat Nordau neighbourhood of Netanya.

Per the report, the plan covers:

- **Demolition of 304 existing housing units**
- **Construction of about 1,155 units** across nine residential buildings — a mix of high-rise and mid-rise
- **About 10,000 m² of commercial space**, ground-floor retail frontage, employment and public institutions
- About **87% of rights holders** have already signed agreements with the developer, Rothstein Real Estate
- First-phase construction to begin **within three years**

The company's CEO, Avishai Ben-Chaim, is quoted saying: "This is a project that will bring genuine change to the neighbourhood fabric."

## The context: the master plan for the whole neighbourhood

The Korczak complex is part of something much larger. The urban-renewal master plan for Kiryat Nordau (**NT/401**) was filed by the Government Authority for Urban Renewal together with Netanya's local planning committee, and covers **about 967 dunams**. It was deposited in 2021, and the Central District Committee resolved to approve it for validity.

The plan grows the neighbourhood from about 6,319 units (including 664 previously approved in the S.Y. Agnon complex) to **about 11,344 units** plus 210 special-purpose units — an addition of roughly 4,900 flats. Alongside them: about 124 dunams for public buildings, about 30,000 m² of commercial space and about 107 dunams of open space.

## Why this concerns the community

Kiryat Nordau was built in the 1950s. Per the plan documents as reported, at the end of 2013 it had about 19,500 residents, and **about a third of them are olim from Ethiopia and the former Soviet Union**. The plan documents describe the neighbourhood's physical condition as poor, and its socioeconomic characteristics as somewhat below the city average.

[Netanya](/en/cities/netanya) has the largest number of Ethiopian-origin residents of any locality in Israel — 13,300, per [the CBS figures](/en/news/where-the-community-lives-cbs-locality-table). When 304 families are moved out and 1,155 flats are built in their place, who comes back to the neighbourhood is settled in the contracts, not in the plan.

## What to check if you own a flat there

- **Which complex you are in** — the master plan covers the whole neighbourhood, but the detailed plan just approved covers only the Agnon-Korczak complex. These are two different things.
- **What exactly you signed** — 87% is the developer's figure. If you have not signed, you are still a rights holder, and you are not obliged to accept what has been offered so far.
- **Legal representation** — in pinui-binui the developer pays for the residents' lawyer, not you. Do not give up independent advice.
- **Tenants renting** — the plan speaks of rights holders. If you rent, your position is entirely different; find out what it is early.

## Read also

- [Kiryat Nordau — the neighbourhood page](/en/urban-renewal/kiryat-nordau-netanya)
- [Netanya — the city page](/en/cities/netanya)
- [TAMA 38 expired — what it means in our cities](/en/news/tama-38-expired-what-replaces-it-in-our-cities)

## Sources

- ["Within three years the giant renewal in Kiryat Nordau, Netanya will begin", Magdilim, 16 Dec 2025](https://magdilim.co.il/161220250913/)
- ["The urban renewal plan for the Kiryat Nordau neighbourhood in Netanya has been deposited", Nadlan Center, 19 Sep 2021](https://www.nadlancenter.co.il/article/4335)
- ["Towards 11,000 units: the urban renewal master plan for Kiryat Nordau, Netanya has been finally approved", Nadlan Center, 30 Mar 2022 (updated 30 Jul 2023)](https://www.nadlancenter.co.il/article/5402)`,
      am: `## ምን ጸደቀ

በታኅሣሥ 2025 በናታንያ ቅርያት ኖርዳው ሰፈር ውስጥ ለ**ሽ.ይ. አግኖን–ያኑሽ ኮርቻክ** ሕንጻ ስብስብ የፒኑይ-ቢኑይ ዕቅድ ሕጋዊ ኃይል የሚሰጥ ዝርዝር ዕቅድ ጸደቀ።

- **304 ነባር የመኖሪያ ቤቶች ይፈርሳሉ**
- **1,155 ገደማ ቤቶች** በዘጠኝ የመኖሪያ ሕንፃዎች ይሠራሉ
- **10,000 ካሬ ሜትር ገደማ የንግድ ቦታ**
- **87% ገደማ የመብት ባለቤቶች** ከአልሚው ሮትሽታይን ጋር ተፈራርመዋል
- የመጀመሪያ ደረጃ ግንባታ **በሦስት ዓመታት ውስጥ** ይጀምራል

## ሰፊው ዕቅድ

የቅርያት ኖርዳው የከተማ ማደሻ ዋና ዕቅድ (**ንት/401**) **967 ዱናም ገደማ** ይሸፍናል። ሰፈሩን ከ6,319 ቤቶች ወደ **11,344 ገደማ** ያሳድጋል።

## ለምን ማህበረሰቡን ይመለከታል

ቅርያት ኖርዳው በ1950ዎቹ ተገነባ። በዕቅድ ሰነዶች መሠረት በ2013 መጨረሻ 19,500 ገደማ ነዋሪዎች ነበሩት፣ **አንድ ሦስተኛ ገደማቸው ከኢትዮጵያና ከቀድሞ ሶቪየት ኅብረት የመጡ ኦሊም** ናቸው።

[ናታንያ](/am/cities/netanya) በእስራኤል ውስጥ ከፍተኛ ቁጥር ያለው የኢትዮጵያ ተወላጅ ነዋሪ ያላት ከተማ ናት — 13,300።

## ባለቤት ከሆኑ ምን ያረጋግጡ

- **በየትኛው ስብስብ ውስጥ ነዎት** — ዋናው ዕቅድ ሰፈሩን በሙሉ ይሸፍናል፤ የጸደቀው ዝርዝር ዕቅድ ግን የአግኖን-ኮርቻክ ስብስብን ብቻ ነው።
- **ምን እንደፈረሙ** — 87% የአልሚው አኃዝ ነው። ካልፈረሙ አሁንም የመብት ባለቤት ነዎት።
- **የሕግ ድጋፍ** — በፒኑይ-ቢኑይ የነዋሪዎችን ጠበቃ አልሚው ይከፍላል፣ እርስዎ አይደሉም።
- **ተከራዮች** — ዕቅዱ ስለ መብት ባለቤቶች ይናገራል። ተከራይ ከሆኑ ሁኔታዎ ፍጹም የተለየ ነው።

## ተጨማሪ ያንብቡ

- [ቅርያት ኖርዳው](/am/urban-renewal/kiryat-nordau-netanya)
- [ናታንያ](/am/cities/netanya)
- [ታማ 38 አበቃ](/am/news/tama-38-expired-what-replaces-it-in-our-cities)

## ምንጮች

- [ማግዲሊም፣ ታኅሣሥ 16፣ 2025](https://magdilim.co.il/161220250913/)
- [ናድላን ሴንተር፣ መስከረም 19፣ 2021](https://www.nadlancenter.co.il/article/4335)
- [ናድላን ሴንተር፣ መጋቢት 30፣ 2022](https://www.nadlancenter.co.il/article/5402)`,
    },
  },

  // 7 — Tofsei HaOrit, TAU --------------------------------------------------
  {
    slug: "tofsei-haorit-tau-tashpaz-registration-open",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["community", "announcement"],
    title: {
      he: '"תופסי האורית": ההרשמה למחזור תשפ"ז נפתחה — עד חמש מלגות לבני הקהילה',
      en: '"Tofsei HaOrit": registration for the 5787 cohort is open — up to five scholarships for community members',
      am: "«ተፎሴ ሃኦሪት»፦ የ5787 ዙር ምዝገባ ተከፍቷል — እስከ አምስት ስኮላርሺፖች ለማህበረሰቡ አባላት",
    },
    excerpt: {
      he: 'תוכנית מ"א ייחודית בחוג למקרא באוניברסיטת תל אביב מכשירה חוקרים לקרוא את האורית — כתבי הקודש של ביתא ישראל בגעז — ולתעד את מסורות הקסים בעל פה. ההרשמה לתשפ"ז נפתחה. התוכנית מציעה עד חמש מלגות לבני ובנות הקהילה.',
      en: "A distinctive MA track in Tel Aviv University's Bible department trains researchers to read the Orit — Beta Israel's sacred texts in Ge'ez — and to document the kessim's oral traditions. Registration for 5787 is open. The programme offers up to five scholarships for community members.",
      am: "በቴል አቪቭ ዩኒቨርሲቲ የመጽሐፍ ቅዱስ ክፍል ልዩ የማስተርስ መርሃ ግብር ተመራማሪዎችን ኦሪትን — የቤተ እስራኤል በግዕዝ የተጻፉ ቅዱሳት መጻሕፍት — እንዲያነቡ ያሠለጥናል። የ5787 ምዝገባ ተከፍቷል።",
    },
    bodies: {
      he: `## מה זה

**"תופסי האורית"** היא תוכנית דגש במסגרת לימודי המ"א בחוג למקרא באוניברסיטת תל אביב. היא מכשירה סטודנטים — מן הציבור הכללי ומבני ובנות קהילת ביתא ישראל — לחקור בעצמם את כתבי הקודש של הקהילה ואת מסורותיה שבעל פה.

השם בא, לפי אתר החוג, על משקל "תֹּפְשֵׂי הַתּוֹרָה" (ירמיהו ב, ח) — הכוהנים שהיו בעלי הידע בתורה. החוג מבהיר במפורש: "לא, אנחנו איננו מסמיכים קסים… אלא מכשירים חוקרים וחוקרות לעסוק בכתבי הקודש".

## מה זו האורית

**האורית** (מארמית: אורייתא) הוא השם לשמונת הספרים הראשונים בתנ"ך האתיופי — חמישה חומשי תורה, ועוד יהושע, שופטים ורות. אלה כתבי הקודש החשובים ביותר לקהילת ביתא ישראל. האורית כתובה **בגעז**, לשון קודש המובנת רק לקסים, לקומץ חוקרים ולמעט ישראלים ממוצא אתיופי.

## מה לומדים

לפי אתר החוג, הלימודים משלבים שלושה תחומים:

- **מקרא** — מסורות נוסח, ובכללן מסורת הנוסח האתיופית, ושיטות תרגום ופרשנות.
- **שפות** — געז ואמהרית, אצל **פרופ' אנבסה טפרה** מהחוג ללשון העברית ולבלשנות שמית, במטרה לרכוש מיומנות בקריאת האורית.
- **אנתרופולוגיה** — שיטות לאיסוף ושימור מסורות בעל פה, אצל **פרופ' אריקה וייס**, לצורך עבודת שדה: מפגשים וראיונות עם הקסים הבכירים והמבוגרים ביותר בקהילה.

התוכנית בראשות **פרופ' דלית רום-שילוני**.

## למה זה דחוף

מספר הקסים שהוכשרו עוד באתיופיה הולך וקטן. הידע שבידיהם — כיצד קוראים את האורית, כיצד מתרגמים אותה, ומה הפרשנות שנמסרה בעל פה — אינו כתוב בשום ספר. תוכנית שמוציאה סטודנטים לשטח כדי לראיין אותם היא, בפועל, מרוץ מול לוח זמנים.

מה שכבר יצא מזה: **מאגר דיגיטלי לכתבי הקודש של ביתא ישראל**, שהוקם באפריל 2024 בשיתוף **הספרייה הלאומית** ו**המרכז למורשת יהדות אתיופיה**. במאי 2024 התקיימה סדנה נודדת ברחבי הארץ עם חוקרים בינלאומיים, ובה נמצאו **19 כתבי קודש מיוחדים במינם** — בהם **שתי אוריות מהמאה החמש-עשרה**, העתיקות ביותר שהתגלו עד היום בקרב ביתא ישראל. כתבי הקודש נשארים בידי בעליהם ומצולמים בבתי התפילה של הקסים לצורכי מחקר בלבד; הצילומים מיועדים להיפתח לציבור באתר הספרייה הלאומית.

## התנאים

- **למי מיועד**: בוגרות ובוגרי ב"א/בא"ד בציון ממוצע 80 לפחות.
- **מבנה**: שנת השלמות (בימי א'), ואחריה שתי שנות מ"א (בימי ד') — כשלוש שנים, יום לימודים אחד ארוך בשבוע.
- **מלגות**: **עד חמש מלגות לסטודנטים בני ובנות קהילת ביתא ישראל**, הכוללות שכר לימוד ומלגת קיום שהחוג מגדיר "צנועה אך משמעותית". סכומים אינם מפורסמים בעמוד — בררו ישירות.
- **הרשמה**: דורשת ראיון וקבלה.
- **פרטים**: מזכירות החוג למקרא, 03-6409787; פרופ' דלית רום-שילוני, 050-33321005, dromshil@tauex.tau.ac.il.

מקור: [עמוד התוכנית באתר החוג למקרא, אוניברסיטת תל אביב](https://humanities.tau.ac.il/bible/bbl20) · נבדק ספטמבר 2026.

## קראו גם

- [קסים לפי עיר](/he/heritage/kessim)
- [הימים הנוראים תשפ"ז והתפילה בגעז](/he/news/high-holidays-5787-beta-israel-tradition)
- [400 שנה לממלכת הגדעונים — כנס באוקטובר](/he/news/gideon-kingdom-conference-jerusalem-october-2026)

## מקורות

- ["תופסי האורית" — לימוד ומחקר של כתבי הקודש של ביתא ישראל, החוג למקרא, אוניברסיטת תל אביב](https://humanities.tau.ac.il/bible/bbl20) · נבדק 8.9.2026
- [אוניברסיטת תל אביב — "לראשונה: כתבי הקודש הקדומים ביותר של יהדות אתיופיה נחשפו"](https://www.tau.ac.il/research/old-ethiopian-bible-discovery) · נבדק 8.9.2026
- סיקור בעברית שהחוג עצמו מפנה אליו: יפעת ארליך, "לחשוף את הקלפים", ישראל היום, 30.5.2025; ynet, 3.7.2025`,
      en: `## What it is

**"Tofsei HaOrit"** ("those who hold the Orit") is a specialised track within the MA programme of Tel Aviv University's Bible department. It trains students — from the general public and from the Beta Israel community — to research the community's sacred texts and oral traditions themselves.

The name echoes "tofsei ha-Torah" (Jeremiah 2:8), the priests who held knowledge of the Torah. The department is explicit: "No, we do not ordain kessim… we train researchers to work on the sacred texts."

## What the Orit is

The **Orit** (from the Aramaic *oraita*) is the name for the first eight books of the Ethiopian Bible — the five books of the Torah plus Joshua, Judges and Ruth. These are the most important sacred texts for the Beta Israel community. The Orit is written in **Ge'ez**, a sacred language understood only by the kessim, a handful of scholars, and a few Israelis of Ethiopian origin.

## What is studied

Per the department's page, the studies combine three fields:

- **Bible** — textual traditions, including the Ethiopic textual tradition, and methods of translation and interpretation.
- **Languages** — Ge'ez and Amharic, with **Prof. Anbessa Teferra** of the Hebrew Language and Semitic Linguistics department, aiming at real competence in reading the Orit.
- **Anthropology** — methods for collecting and preserving oral traditions, with **Prof. Erika Weiss**, for fieldwork: meeting and interviewing the community's most senior and eldest kessim.

The programme is headed by **Prof. Dalit Rom-Shiloni**.

## Why it is urgent

The number of kessim trained back in Ethiopia keeps shrinking. What they hold — how the Orit is read, how it is translated, and what interpretation was passed on orally — is written in no book. A programme that sends students into the field to interview them is, in practice, a race against a clock.

What has already come out of it: a **digital repository of Beta Israel sacred manuscripts**, established in April 2024 together with the **National Library of Israel** and the **Center for Ethiopian Jewish Heritage**. In May 2024 a travelling workshop was held around the country with international scholars, and it located **19 uniquely important sacred manuscripts** — among them **two Orit manuscripts from the 15th century**, the oldest ever found among Beta Israel. The manuscripts stay with their owners and are photographed in the kessim's prayer houses for research only; the images are intended to open to the public on the National Library's site.

## The terms

- **Who it is for**: BA graduates with an average of at least 80.
- **Structure**: a completion year (Sundays), then two MA years (Wednesdays) — about three years, one long study day a week.
- **Scholarships**: **up to five scholarships for students from the Beta Israel community**, covering tuition and a living stipend the department describes as "modest but meaningful". Amounts are not published on the page — ask directly.
- **Registration**: requires an interview and acceptance.
- **Details**: Bible department secretariat, 03-6409787; Prof. Dalit Rom-Shiloni, 050-33321005, dromshil@tauex.tau.ac.il.

Source: [the programme page at the Bible department, Tel Aviv University](https://humanities.tau.ac.il/bible/bbl20) · verified September 2026.

## Read also

- [Kessim by city](/en/heritage/kessim)
- [The High Holidays of 5787 and prayer in Ge'ez](/en/news/high-holidays-5787-beta-israel-tradition)
- [400 years since the Gideon kingdom — a conference in October](/en/news/gideon-kingdom-conference-jerusalem-october-2026)

## Sources

- ["Tofsei HaOrit" — study and research of the sacred texts of Beta Israel, Bible department, Tel Aviv University](https://humanities.tau.ac.il/bible/bbl20) · verified 8 Sep 2026
- [Tel Aviv University — "For the first time: the oldest sacred texts of Ethiopian Jewry revealed"](https://www.tau.ac.il/research/old-ethiopian-bible-discovery) · verified 8 Sep 2026
- Hebrew coverage the department itself links to: Yifat Erlich, "Laying the cards on the table", Israel Hayom, 30 May 2025; ynet, 3 July 2025`,
      am: `## ምንድን ነው

**«ተፎሴ ሃኦሪት»** በቴል አቪቭ ዩኒቨርሲቲ የመጽሐፍ ቅዱስ ክፍል ውስጥ ያለ ልዩ የማስተርስ መስመር ነው። ተማሪዎችን — ከጠቅላላው ሕዝብና ከቤተ እስራኤል ማህበረሰብ — የማህበረሰቡን ቅዱሳት መጻሕፍትና የቃል ትውፊቶች ራሳቸው እንዲመረምሩ ያሠለጥናል።

## ኦሪት ምንድን ነው

**ኦሪት** በኢትዮጵያ መጽሐፍ ቅዱስ ውስጥ ላሉት የመጀመሪያዎቹ ስምንት መጻሕፍት የተሰጠ ስም ነው — አምስቱ የኦሪት መጻሕፍት፣ ኢያሱ፣ መሳፍንትና ሩት። **በግዕዝ** ተጽፏል፣ ይህም ቋንቋ የሚገባቸው ቄሶች፣ ጥቂት ተመራማሪዎችና ጥቂት የኢትዮጵያ ተወላጅ እስራኤላውያን ብቻ ናቸው።

## ምን ይማራሉ

- **መጽሐፍ ቅዱስ** — የጽሑፍ ትውፊቶች፣ የትርጉምና የትርጓሜ ዘዴዎች።
- **ቋንቋዎች** — ግዕዝና አማርኛ፣ ከ**ፕሮፌሰር አንበሳ ተፈራ** ጋር።
- **አንትሮፖሎጂ** — የቃል ትውፊቶችን የመሰብሰብ ዘዴዎች፣ ከ**ፕሮፌሰር ኤሪካ ዋይስ** ጋር፣ ከከፍተኛ ቄሶች ጋር ለሚደረግ የመስክ ሥራ።

መርሃ ግብሩን **ፕሮፌሰር ዳሊት ሮም-ሺሎኒ** ይመራሉ።

## ለምን አጣዳፊ ነው

በኢትዮጵያ የሠለጠኑ ቄሶች ቁጥር እየቀነሰ ነው። በእጃቸው ያለው ዕውቀት በምንም መጽሐፍ ውስጥ አልተጻፈም።

በሚያዝያ 2024 ከ**ብሔራዊ ቤተ መጻሕፍት**ና ከ**የኢትዮጵያ አይሁድ ቅርስ ማዕከል** ጋር **ዲጂታል ማከማቻ** ተቋቁሟል። በግንቦት 2024 በተካሄደ ጉዞ አውደ ጥናት **19 ልዩ ቅዱሳት መጻሕፍት** ተገኝተዋል — ከእነሱም መካከል **ከ15ኛው ክፍለ ዘመን ሁለት ኦሪቶች**፣ በቤተ እስራኤል ውስጥ እስካሁን የተገኙት ጥንታዊዎቹ።

## ሁኔታዎቹ

- **ለማን**: የመጀመሪያ ዲግሪ ምሩቃን፣ ቢያንስ የ80 አማካይ ውጤት።
- **አወቃቀር**: የማሟያ ዓመት (እሑድ)፣ ከዚያም ሁለት የማስተርስ ዓመታት (ረቡዕ) — ሦስት ዓመት ገደማ።
- **ስኮላርሺፖች**: **እስከ አምስት ስኮላርሺፖች ለቤተ እስራኤል ማህበረሰብ አባላት**፣ የትምህርት ክፍያና የኑሮ ድጎማ። መጠኑ በገጹ ላይ አልታተመም — በቀጥታ ይጠይቁ።
- **ዝርዝር**: 03-6409787፤ ፕሮፌሰር ዳሊት ሮም-ሺሎኒ፣ 050-33321005፣ dromshil@tauex.tau.ac.il።

## ተጨማሪ ያንብቡ

- [ቄሶች በከተማ](/am/heritage/kessim)
- [የ5787 ታላላቅ በዓላት](/am/news/high-holidays-5787-beta-israel-tradition)
- [የጊዴዎን መንግሥት ጉባኤ](/am/news/gideon-kingdom-conference-jerusalem-october-2026)

## ምንጮች

- [የመርሃ ግብሩ ገጽ፣ የመጽሐፍ ቅዱስ ክፍል፣ ቴል አቪቭ ዩኒቨርሲቲ](https://humanities.tau.ac.il/bible/bbl20) · መስከረም 8፣ 2026 ተረጋግጧል
- [ቴል አቪቭ ዩኒቨርሲቲ — ጥንታዊዎቹ ቅዱሳት መጻሕፍት ተገለጡ](https://www.tau.ac.il/research/old-ethiopian-bible-discovery) · መስከረም 8፣ 2026 ተረጋግጧል`,
    },
  },

  // 8 — "HaDerech HaHadasha", Netanya ---------------------------------------
  {
    slug: "derech-hahadasha-netanya-what-the-page-says",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["cities", "community"],
    title: {
      he: '"הדרך החדשה" בנתניה: מה העירייה עדיין מפרסמת, ומה כדאי לשאול לפני שהולכים',
      en: '"HaDerech HaHadasha" in Netanya: what the municipality still publishes, and what to ask before you go',
      am: "«ሃደረኽ ሃሓዳሻ» በናታንያ፦ ማዘጋጃ ቤቱ አሁንም የሚያሳትመው፣ እና ከመሄድዎ በፊት ምን ይጠይቁ",
    },
    excerpt: {
      he: 'עיריית נתניה — העיר עם מספר התושבים ממוצא אתיופי הגבוה בישראל — מפרסמת דף שירות לתוכנית "הדרך החדשה": ליווי משפחות בידי עובדים סוציאליים ומלווים דוברי אמהרית, בשלושה מסלולים. הטקסט עצמו מגדיר את התוכנית "עד לשנת 2020". בדקו לפני שיוצאים.',
      en: 'Netanya municipality — the city with the largest Ethiopian-origin population in Israel — publishes a service page for the "HaDerech HaHadasha" programme: family accompaniment by social workers and Amharic-speaking guides, in three tracks. The page\'s own text describes the programme as running "until 2020". Check before you set out.',
      am: "የናታንያ ማዘጋጃ ቤት — በእስራኤል ከፍተኛ የኢትዮጵያ ተወላጅ ሕዝብ ያላት ከተማ — ለ«ሃደረኽ ሃሓዳሻ» መርሃ ግብር የአገልግሎት ገጽ ያሳትማል። የገጹ ጽሑፍ ግን መርሃ ግብሩን «እስከ 2020» ይለዋል። ከመሄድዎ በፊት ያረጋግጡ።",
    },
    bodies: {
      he: `## למה נתניה

[נתניה](/he/cities/netanya) היא היישוב עם מספר התושבים ממוצא אתיופי הגבוה בישראל — 13.3 אלף איש, לפי [נתוני הלמ"ס](/he/news/where-the-community-lives-cbs-locality-table). מה שהעירייה מפעילה שם נוגע ליותר אנשים מאשר בכל עיר אחרת.

## מה כתוב בדף

באתר עיריית נתניה, תחת אגף הרווחה והביטחון החברתי, יש דף שירות לתוכנית **"הדרך החדשה"**. לפי הדף, זו "תוכנית ממשלתית המיועדת לסייע בשילוב מיטבי של יוצאי אתיופיה בחברה", והיא מפעילה **צוות של עובדים סוציאליים ומלווים דוברי אמהרית**.

השירותים שהדף מונה: ליווי אישי למשפחה, שילוב בתוכניות קבוצתיות וקהילתיות, ייעוץ תעסוקתי, תגבור לימודים, חונכות, הדרכת הורים, ליווי והכוונה במיצוי זכויות, וקשר עם גורמים בקהילה.

**ההפניה לתוכנית נעשית על ידי עובד סוציאלי משפחה** — לא בפנייה ישירה.

## שלושת המסלולים

| מסלול | למי | דרך ההפניה |
|-------|-----|-------------|
| **משפחה תומכת** | משפחות יוצאות אתיופיה שאחד מילדיהן מטופל בשירות מבחן לנוער — הכוונה למימוש זכויות, תיווך מול נותני שירותים, וכלים למעורבות בחיי המתבגר | שירות מבחן לנוער |
| **התוכנית הביתית** | אמהות לילדים בגילאי 0–3 שאינם שוהים במסגרת — הדרכה אישית בבית עם מדריכה דוברת אמהרית, בתחום התפתחות הילד והקשר בין הילד להורה, והיכרות עם שירותי הגיל הרך | עובד סוציאלי משפחה, מרכזים לגיל הרך, טיפות חלב |
| **מעטפת** | נערים בני הקהילה בגילאי 13–18 עם קשיים תפקודיים בסיכון גבוה — שיקום והשארה בקהילה | עובד סוציאלי משפחה |

## הכתובת

הדף רושם את כתובת השירות: **יונה בוגולה 2, נתניה**, ומשייך אותו לאזור **רמת ידין**.

(הרחוב קרוי על שם יונה בוגלה, ממנהיגי יהדות אתיופיה ומחלוצי החינוך בקהילה. שם רחוב הוא דבר קטן, וגם הוא לא מובן מאליו.)

## ההסתייגות — וזאת הסיבה שאנחנו כותבים על זה

הטקסט על הדף עצמו מגדיר את התוכנית כמיועדת לסייע "**עד לשנת 2020**". כלומר: הדף חי, אבל הניסוח שבו מתאר אופק שחלף לפני שש שנים.

זה לא אומר שהשירות לא קיים. זה כן אומר שאסור להסתמך על הדף כאילו הוא מעודכן. **לפני שנוסעים** — התקשרו למוקד העירוני 106 או לאגף הרווחה, אמרו את שם התוכנית ואת שם המסלול שרלוונטי לכם, ושאלו שלוש שאלות:

1. האם התוכנית או המסלול פעילים היום?
2. אם לא — מה החליף אותם, ומי מפעיל את זה עכשיו?
3. מי העובד הסוציאלי שדרכו עוברת ההפניה, ואיך קובעים איתו?

ואם התשובה היא שהתוכנית נסגרה — זו עדיין תשובה שימושית, כי היא חוסכת נסיעה.

## למה זה חוזר על עצמו

תוכניות ממשלתיות ליוצאי אתיופיה מגיעות עם אופק תקציבי ומתחלפות בשמן. דפי השירות העירוניים שנכתבו לפי אותן תוכניות נשארים באוויר הרבה אחרי שהתקציב נגמר. התוצאה היא אנשים שנוסעים לכתובת עם שם תוכנית שכבר לא קיים. הכלל הפשוט: **טלפון לפני נסיעה, תמיד.**

## קראו גם

- [נתניה — דף העיר](/he/cities/netanya)
- [איפה גרה הקהילה — נתוני הלמ"ס](/he/news/where-the-community-lives-cbs-locality-table)
- [קריית נורדאו — התחדשות עירונית בנתניה](/he/urban-renewal/kiryat-nordau-netanya)

## מקורות

- [עיריית נתניה — "הדרך החדשה": תוכנית ממשלתית לטיפול ביוצאי אתיופיה](https://www.netanya.muni.il/Residents/Welfare/Administration/Pages/NewPath.aspx) · נבדק 8.9.2026
- [הלמ"ס, הודעה 367/2025, 16.11.2025](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf)`,
      en: `## Why Netanya

[Netanya](/en/cities/netanya) has the largest Ethiopian-origin population of any locality in Israel — 13,300 people, per [the CBS figures](/en/news/where-the-community-lives-cbs-locality-table). What the municipality runs there reaches more people than in any other city.

## What the page says

On Netanya municipality's site, under the welfare and social security division, there is a service page for the **"HaDerech HaHadasha"** ("the new path") programme. Per the page, it is "a government programme intended to assist the optimal integration of Ethiopian-Israelis into society", and it operates **a team of social workers and Amharic-speaking guides**.

The services the page lists: personal accompaniment for the family, inclusion in group and community programmes, employment counselling, academic reinforcement, mentoring, parenting guidance, guidance in realising entitlements, and connection to community bodies.

**Referral to the programme is made by a family social worker** — not by applying directly.

## The three tracks

| Track | For whom | Route of referral |
|-------|----------|-------------------|
| **Supportive family** | Ethiopian-Israeli families with a child under the care of the juvenile probation service — guidance on realising entitlements, mediation with service providers, and tools for involvement in the adolescent's life | Juvenile probation service |
| **The home programme** | Mothers of children aged 0-3 who are not in any framework — personal guidance at home with an Amharic-speaking guide, on child development and the parent-child relationship, plus an introduction to early-childhood services | Family social worker, early-childhood centres, tipat halav clinics |
| **Wraparound** | Community boys aged 13-18 with functional difficulties at high risk — rehabilitation and keeping them in the community | Family social worker |

## The address

The page records the service address: **2 Yona Bogola Street, Netanya**, in the **Ramat Yadin** area.

(The street is named after Yona Bogale, a leader of Ethiopian Jewry and a pioneer of education in the community. A street name is a small thing, and it is not self-evident either.)

## The caveat — and this is why we are writing about it

The text on the page itself describes the programme as intended to assist "**until the year 2020**". That is: the page is live, but its wording describes a horizon that passed six years ago.

That does not mean the service does not exist. It does mean the page must not be relied on as current. **Before you travel** — call the municipal hotline 106 or the welfare division, give the programme name and the track relevant to you, and ask three questions:

1. Is the programme, or that track, operating today?
2. If not — what replaced it, and who runs that now?
3. Who is the social worker the referral goes through, and how do I get an appointment?

And if the answer is that the programme closed — that is still a useful answer, because it saves the trip.

## Why this keeps happening

Government programmes for Ethiopian-Israelis come with a budget horizon and change names. The municipal service pages written around those programmes stay up long after the budget ends. The result is people travelling to an address with a programme name that no longer exists. The simple rule: **phone before you travel, always.**

## Read also

- [Netanya — the city page](/en/cities/netanya)
- [Where the community lives — the CBS figures](/en/news/where-the-community-lives-cbs-locality-table)
- [Kiryat Nordau — urban renewal in Netanya](/en/urban-renewal/kiryat-nordau-netanya)

## Sources

- [Netanya municipality — "HaDerech HaHadasha": a government programme for Ethiopian-Israelis](https://www.netanya.muni.il/Residents/Welfare/Administration/Pages/NewPath.aspx) · verified 8 Sep 2026
- [CBS release 367/2025, 16 Nov 2025](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf)`,
      am: `## ለምን ናታንያ

[ናታንያ](/am/cities/netanya) በእስራኤል ውስጥ ከፍተኛ የኢትዮጵያ ተወላጅ ሕዝብ ያላት ከተማ ናት — 13,300 ሰዎች።

## ገጹ ምን ይላል

በናታንያ ማዘጋጃ ቤት ድረ-ገጽ፣ በማህበራዊ ደህንነት ክፍል ሥር፣ ለ**«ሃደረኽ ሃሓዳሻ»** መርሃ ግብር የአገልግሎት ገጽ አለ። በገጹ መሠረት ይህ «የኢትዮጵያ ተወላጆችን በኅብረተሰቡ ውስጥ ለማዋሃድ የተዘጋጀ የመንግሥት መርሃ ግብር» ሲሆን **የማህበራዊ ሠራተኞችና አማርኛ ተናጋሪ አጃቢዎች ቡድን** ያሠራል።

አገልግሎቶቹ፦ የቤተሰብ ግላዊ አጃቢነት፣ በቡድንና በማህበረሰብ መርሃ ግብሮች ውስጥ ማካተት፣ የሥራ ምክር፣ የትምህርት ማጠናከሪያ፣ አማካሪነት፣ የወላጅነት መመሪያ፣ መብቶችን በማስከበር ላይ አጃቢነት።

**ወደ መርሃ ግብሩ የሚደረገው ሪፈራል በቤተሰብ ማህበራዊ ሠራተኛ ነው** — በቀጥታ በማመልከት አይደለም።

## ሦስቱ መስመሮች

| መስመር | ለማን | የሪፈራል መንገድ |
|---|---|---|
| **ደጋፊ ቤተሰብ** | ከልጆቻቸው አንዱ በወጣቶች የሙከራ አገልግሎት የሚታይ ቤተሰቦች | የወጣቶች የሙከራ አገልግሎት |
| **የቤት መርሃ ግብር** | ከ0-3 ዓመት ልጆች ያሏቸው በተቋም ውስጥ ያልሆኑ እናቶች — በቤት ውስጥ ከአማርኛ ተናጋሪ አሠልጣኝ ጋር | የቤተሰብ ማህበራዊ ሠራተኛ፣ የሕፃናት ማዕከላት፣ ጠብታ ወተት |
| **መጠቅለያ** | ከ13-18 ዓመት ከፍተኛ አደጋ ላይ ያሉ የማህበረሰቡ ወጣቶች | የቤተሰብ ማህበራዊ ሠራተኛ |

## አድራሻው

ገጹ የአገልግሎቱን አድራሻ ይመዘግባል፦ **ዮና ቦጎላ ጎዳና 2፣ ናታንያ**፣ በ**ራማት ያዲን** አካባቢ።

(ጎዳናው የተሰየመው በዮና ቦጋለ ስም ነው፣ የኢትዮጵያ አይሁድ መሪና በማህበረሰቡ የትምህርት ፈር ቀዳጅ።)

## ማስጠንቀቂያው

በገጹ ላይ ያለው ጽሑፍ መርሃ ግብሩን «**እስከ 2020 ዓ.ም.**» ለመርዳት የታሰበ ብሎ ይገልጻል። ገጹ በሕይወት አለ፣ ግን ቃላቱ ከስድስት ዓመት በፊት ያለፈ አድማስ ይገልጻሉ።

ይህ አገልግሎቱ የለም ማለት አይደለም። ግን ገጹን እንደ ወቅታዊ መቁጠር አይገባም ማለት ነው። **ከመሄድዎ በፊት** የከተማውን መስመር 106 ወይም የማህበራዊ ደህንነት ክፍሉን ይደውሉ፣ ሦስት ጥያቄዎችን ይጠይቁ፦

1. መርሃ ግብሩ ወይም መስመሩ ዛሬ እየሠራ ነው?
2. ካልሆነ — ምን ተካው፣ አሁን ማን ያሠራዋል?
3. ሪፈራሉ የሚያልፍበት ማህበራዊ ሠራተኛ ማን ነው?

መርሃ ግብሩ እንደተዘጋ የሚል መልስ ቢሆንም እንኳ ጠቃሚ ነው — ጉዞን ያድናል።

## ተጨማሪ ያንብቡ

- [ናታንያ](/am/cities/netanya)
- [ማህበረሰቡ የት ይኖራል](/am/news/where-the-community-lives-cbs-locality-table)
- [ቅርያት ኖርዳው](/am/urban-renewal/kiryat-nordau-netanya)

## ምንጮች

- [የናታንያ ማዘጋጃ ቤት — «ሃደረኽ ሃሓዳሻ»](https://www.netanya.muni.il/Residents/Welfare/Administration/Pages/NewPath.aspx) · መስከረም 8፣ 2026 ተረጋግጧል
- [CBS ዘገባ 367/2025፣ ኅዳር 16፣ 2025](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf)`,
    },
  },
];
