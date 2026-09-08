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
];
