// Sigd season content (TED-169) — the three pages that sit alongside the
// Sigd guide at `/heritage/events/sigd`:
//
//   /heritage/sigd/events-2026 — the verified events list
//   /heritage/sigd/schools     — what the statute obliges, what a parent can ask
//   /heritage/sigd/guests      — attending from outside the community
//
// Deliberately NOT a (city × Sigd) matrix. TED-172 measured the previous
// `heritage/events/sigd/<city>` cells at 1.000 pairwise similarity and 301'd
// all of them; ADR-024 is the standing rule. These are four distinct pages
// answering four distinct questions.
//
// Sourcing: ADR-021. Every factual claim here comes from a source that was
// opened and read, and the source line is printed in the copy.
//
// HE is the source-of-truth locale. EN mirrored, AM model-written and
// flagged in-copy for native review. Server-only module.

import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export const SIGD_SEASON_PUBLISHED = "2026-09-15";

/**
 * Sigd 5787, derived rather than inherited (TED-165 shipped 19.11.2026 in
 * three places before this was checked).
 *
 * 1. `חוק חג הסיגד, התשס"ח-2008` s.1(a) fixes the holiday to כ"ט בחשוון.
 * 2. 29 Cheshvan 5787 is Monday 9 November 2026 on the Hebrew calendar.
 * 3. Independent cross-check: Sigd is the fiftieth day counting Yom Kippur
 *    as day one. Yom Kippur 5787 (10 Tishrei) is Monday 21 September 2026;
 *    49 elapsed days later is Monday 9 November 2026.
 *
 * 19 November 2026 is 9 Kislev — ten days late — and is the retired date.
 */
export const SIGD_5787_DATE = "2026-11-09";
export const SIGD_5787_HEBREW_DATE = 'כ"ט בחשוון תשפ"ז';

/**
 * A Sigd event this site is willing to publish.
 *
 * The bar, and it is the whole point of the page: `sourceUrl` must be the
 * ORGANISER'S OWN publication of this event — a municipality's events page,
 * a ministry release, the operating body's announcement. Not a news write-up
 * of it, not an aggregator, and never a search-result snippet. `verifiedOn`
 * is the day someone opened that URL and read it.
 *
 * Empty is a correct state. In September 5787 nothing had been published by
 * anyone, and an empty list with an honest explanation is the accurate page.
 */
export interface SigdEvent {
  id: string;
  /** Event name as the organiser calls it. */
  name: Record<Locale, string>;
  /** Who is running it, as named on the source page. */
  organizer: Record<Locale, string>;
  /** Venue as the organiser states it. */
  location: Record<Locale, string>;
  /** City slug from `lib/cities/registry`, when the city has a hub. */
  citySlug?: string;
  /** ISO date (YYYY-MM-DD) exactly as the organiser published it. */
  date: string;
  /** Start time, ONLY if the organiser published one. Never inferred. */
  startTime?: string;
  /** The organiser's own page for this event. */
  sourceUrl: string;
  sourceLabel: Record<Locale, string>;
  /** The day the source URL was opened and read (YYYY-MM-DD). */
  verifiedOn: string;
  notes?: Record<Locale, string>;
}

/**
 * Verified Sigd 5787 events.
 *
 * Empty as of 2026-09-15. A sweep of the Jerusalem, Netanya, Rehovot,
 * Beer Sheva, Haifa, Ashdod, Kiryat Gat, Lod and Ramla municipal sites, of
 * gov.il, of the Ethiopian Jewry Heritage Center, of thekotel.org and of
 * iaej.co.il found no 5787 announcement. Several of those hosts also refuse
 * automated fetches (403), so nothing could be confirmed from them either
 * way — which is a reason to publish nothing, not a reason to guess.
 *
 * Re-check dates are in `SIGD_EVENTS_RECHECK`.
 */
export const SIGD_EVENTS_2026: SigdEvent[] = [];

/** When to sweep organiser sites again. The 5786 cycle published mid-month. */
export const SIGD_EVENTS_RECHECK = ["2026-10-04", "2026-10-20", "2026-11-01"];

export interface SigdPage {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  body: Record<Locale, string>;
}

// ── /heritage/sigd/events-2026 ─────────────────────────────────────────────

export const SIGD_EVENTS_PAGE: SigdPage = {
  title: {
    he: "אירועי הסיגד 2026 — רשימה מאומתת, מתעדכנת",
    en: "Sigd 2026 events — a verified, updating list",
    am: "የ2026 ሰግድ ዝግጅቶች — የተረጋገጠ፣ የሚዘመን ዝርዝር",
  },
  description: {
    he: "טקסי ואירועי הסיגד 2026 (9.11) — רק מה שהמארגן עצמו פרסם, עם קישור למקור ותאריך בדיקה. נכון להיום טרם פורסמו אירועים; העמוד מתעדכן.",
    en: "Sigd 2026 ceremonies and events (9 Nov) — only what the organiser published, each with its source link and check date. Nothing published yet; this page updates.",
    am: "የ2026 ሰግድ ሥነ ሥርዓቶችና ዝግጅቶች (ኅዳር 9) — አዘጋጁ ራሱ ያሳተመው ብቻ፣ ከምንጭ ማገናኛ ጋር።",
  },
  body: {
    he: `## הסיגד יחול ביום שני, 9 בנובמבר 2026

${SIGD_5787_HEBREW_DATE}. התאריך הזה נגזר משני כיוונים בלתי תלויים — סעיף 1(א) לחוק חג הסיגד ולוח השנה העברי מצד אחד, וספירת חמישים הימים מיום הכיפורים מצד שני. ההסבר המלא, כולל טבלת השנים הבאות: [מדריך הסיגד](/he/heritage/events/sigd).

## מה מצב האירועים כרגע

**נכון ל-15 בספטמבר 2026 — לא פורסם עדיין שום אירוע סיגד לתשפ"ז.**

זו לא רשלנות שלנו ולא מחסור במידע אצלכם: בשלב הזה של השנה המארגנים פשוט עוד לא פרסמו. במחזור הקודם פורסמו פרטי האירועים בסמוך לחג, באמצע נובמבר. אנחנו סורקים מחדש את אתרי המארגנים ב-4 באוקטובר, ב-20 באוקטובר ושוב ב-1 בנובמבר, והעמוד הזה יתעדכן עם כל אירוע שיפורסם.

מה שכן ידוע כבר עכשיו:

- **התאריך** — יום שני, 9.11.2026.
- **המקום שבו מתכנסת הקהילה בירושלים** — טיילת גבריאל שרובר (טיילת ארמון הנציב). זה המקום שבו נערך הטקס המרכזי מאז שעבר מהר ציון.
- **שיש עצרת מרכזית ממלכתית** — ס' 2 לחוק: "שר המדע התרבות והספורט יורה על קיום עצרת מרכזית לפתיחת חג הסיגד". שימו לב: זו חובה על השר, ולא ערובה שהטקס יתקיים בכל שנה בפועל — ב-2023, בעקבות מלחמת חרבות ברזל, הטקס הממלכתי בארמון הנציב בוטל.

## למה העמוד הזה ריק — וזה בכוונה

אפשר היה למלא את העמוד הזה בשבע שורות טבלה: "ירושלים — טקס מרכזי", "נתניה — טקס עירוני + שוק מסורתי", "אשדוד — פסטיבל סיגד". גרסה קודמת של האתר הזה עשתה בדיוק את זה, ואף אחת מהשורות לא נשענה על מקור.

זה נראה תמים. הוא לא. אדם שמתכנן יום חופש — והסיגד, לפי החוק, נלקח על חשבון ימי החופשה שלו — נוסע לעיר אחרת עם ילדים על סמך שורה בטבלה שהמציא אתר. אותה גרסה קודמת גם פרסמה שעת פתיחה מדויקת, מספר משתתפים צפוי, הסעות מסובסדות מ-16 ערי קליטה ומועד סגירת הרשמה. שום מקור לא תמך באף אחד מאלה, והם נמחקו.

**הכלל בעמוד הזה:** אירוע נכנס רק אם המארגן עצמו פרסם אותו, הקישור לפרסום מופיע לצידו, ורשום התאריך שבו מישהו פתח את הקישור וקרא. פחות אירועים ונכונים — עדיף על רשימה מלאה ומומצאת.

## מה לעשות בינתיים

- **בדקו מול העירייה שלכם ישירות.** אתר העירייה ומחלקת התרבות/קליטה הם המקור הראשון שמפרסם. אם מצאתם פרסום — שלחו לנו את הקישור ונוסיף אותו לכאן.
- **אם אתם שכירים** — הסיגד הוא "יום בחירה" לפי ס' 1(ב) לחוק, כלומר הבחירה לצאת לחופשה או לעבוד היא שלכם, והיום נספר על חשבון ימי החופשה. כדאי להודיע למעסיק מראש ולא ביום עצמו. הפירוט: [מדריך הסיגד](/he/heritage/events/sigd).
- **אם יש לכם ילדים במערכת החינוך** — שר החינוך מחויב בחוק לקבוע פעילויות חינוכיות לחג. מה זה אומר ומה אפשר לבקש: [הסיגד בבתי הספר](/he/heritage/sigd/schools).
- **אם אתם מתכננים לבוא ואינכם מהקהילה** — [מדריך השתתפות מכבדת](/he/heritage/sigd/guests).
- **ואם אתם מארחים ארוחת שבירת צום** — [תפריט הסיגד ומשמעות הצום](/he/culinary/sigd-menu).

## מארגנים אירוע סיגד?

אם אתם רשות מקומית, בית ספר, עמותה או קהילה ופרסמתם אירוע סיגד לתשפ"ז — שלחו לנו את הקישור לפרסום שלכם ונוסיף אותו. אנחנו לא גובים על זה ולא מקדמים אף אחד; התנאי היחיד הוא שהפרסום יהיה שלכם ויהיה פומבי, כדי שנוכל לקשר אליו. [צרו קשר](/he/about).

**מקורות**: [חוק חג הסיגד, התשס"ח-2008 — ספר החוקים 2164, עמ' 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [המרכז למורשת יהדות אתיופיה — חג הסגד](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · נבדק 15 בספטמבר 2026.`,
    en: `## Sigd falls on Monday, 9 November 2026

29 Cheshvan 5787. The date is derived from two independent directions — s. 1(a) of the Sigd Holiday Law plus the Hebrew calendar on one side, and the fifty-day count from Yom Kippur on the other. The full explanation, including a table of the coming years: [the Sigd guide](/en/heritage/events/sigd).

## Where the events stand right now

**As of 15 September 2026, no Sigd event for 5787 has been published by anyone.**

That is not an oversight on our part and not a gap on yours: at this point in the year the organisers simply have not published. In the previous cycle event details went up close to the holiday, in mid-November. We re-sweep the organisers' sites on 4 October, 20 October and again on 1 November, and this page updates with every event that is published.

What is already known:

- **The date** — Monday, 9 November 2026.
- **Where the community gathers in Jerusalem** — the Gabriel Sherover Promenade (the Armon Hanatziv promenade). That is where the central ceremony has been held since it moved from Mount Zion.
- **That a state opening ceremony is mandated** — s. 2 of the law: "The Minister of Science, Culture and Sport shall order the holding of a central assembly to open the Sigd Holiday." Note: that is a duty on the minister, not a guarantee the ceremony happens in any given year — in 2023, following the Swords of Iron war, the state ceremony at Armon Hanatziv was cancelled.

## Why this page is empty — on purpose

We could fill it with seven table rows: "Jerusalem — central ceremony", "Netanya — municipal ceremony and traditional market", "Ashdod — Sigd festival". An earlier version of this site did exactly that, and not one of those rows rested on a source.

It looks harmless. It is not. Someone planning a day off — and under the statute Sigd comes out of their annual leave — drives to another city with children on the strength of a row a website invented. That same earlier version also published an exact start time, an expected attendance figure, subsidised buses from 16 absorption cities and a registration deadline. No source supported any of them, and they were deleted.

**The rule on this page:** an event is listed only if the organiser published it, the link to that publication sits next to it, and the date someone opened and read that link is recorded. Fewer events, correct — over a full list that is invented.

## What to do in the meantime

- **Check with your municipality directly.** The municipal site and its culture or absorption department are the first to publish. If you find a published event, send us the link and we will add it.
- **If you are an employee** — Sigd is a "day of choice" under s. 1(b): the choice to take leave or to work is yours, and the day is counted against your annual leave. Tell your employer in advance rather than on the day. Details: [the Sigd guide](/en/heritage/events/sigd).
- **If you have children in school** — the Minister of Education is required by statute to set educational activities for the holiday. What that means and what you can ask for: [Sigd in schools](/en/heritage/sigd/schools).
- **If you are planning to attend from outside the community** — [the respectful-attendance guide](/en/heritage/sigd/guests).
- **And if you are hosting a break-fast meal** — [the Sigd menu and the meaning of the fast](/en/culinary/sigd-menu).

## Organising a Sigd event?

If you are a local authority, a school, a non-profit or a community group and you have published a Sigd 5787 event, send us the link to your publication and we will add it. We charge nothing for this and promote no one; the only condition is that the publication is yours and is public, so that we can link to it. [Get in touch](/en/about).

**Sources**: [Sigd Holiday Law, 5768-2008 — Sefer HaChukim 2164, p. 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [Ethiopian Jewry Heritage Center — the Sigd holiday](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · verified 15 September 2026.`,
    am: `## ሰግድ ሰኞ ኅዳር 9፣ 2026 ይውላል

29 ኅሸዋን 5787። ቀኑ በሁለት ገለልተኛ መንገዶች ተረጋግጧል — የሰግድ በዓል ሕግ አንቀጽ 1(ሀ) እና የዕብራይስጥ የቀን መቁጠሪያ በአንድ በኩል፣ ከዮም ኪፑር የሃምሳ ቀናት ቆጠራ በሌላ በኩል። ሙሉ ማብራሪያ፦ [የሰግድ መመሪያ](/am/heritage/events/sigd)።

## የዝግጅቶቹ ሁኔታ አሁን

**እስከ መስከረም 15፣ 2026 ድረስ ለ5787 ማንኛውም የሰግድ ዝግጅት አልታተመም።**

በዚህ የዓመቱ ወቅት አዘጋጆቹ ገና አላሳተሙም። ባለፈው ዓመት የዝግጅት ዝርዝሮች ከበዓሉ አቅራቢያ፣ በኅዳር አጋማሽ ወጥተዋል። የአዘጋጆቹን ድረ-ገጾች በጥቅምት 4፣ በጥቅምት 20 እና በኅዳር 1 እንደገና እንመረምራለን፤ ይህ ገጽም ይዘመናል።

አሁን የሚታወቀው፦

- **ቀኑ** — ሰኞ፣ ኅዳር 9፣ 2026።
- **ማህበረሰቡ በኢየሩሳሌም የሚሰበሰብበት ቦታ** — የገብርኤል ሼሮቨር መንገድ (የአርሞን ሃናጺቭ መንገድ)።
- **ማዕከላዊ መንግሥታዊ ሥነ ሥርዓት በሕግ የታዘዘ መሆኑ** — አንቀጽ 2። ነገር ግን በ2023 በጦርነቱ ምክንያት በአርሞን ሃናጺቭ የነበረው መንግሥታዊ ሥነ ሥርዓት ተሰርዟል።

## ይህ ገጽ ለምን ባዶ ነው — ሆን ተብሎ

ይህን ገጽ በሰባት የሰንጠረዥ መስመሮች መሙላት ይቻል ነበር። የዚህ ድረ-ገጽ ቀደም ያለ ቅጂ በትክክል ያንን አድርጓል፣ ከመስመሮቹም አንዳቸውም በምንጭ ላይ አልተመሠረቱም።

ጉዳት የሌለው ይመስላል። አይደለም። የዕረፍት ቀን የሚያቅድ ሰው — በሕጉ መሠረት ሰግድ ከዓመታዊ ፈቃዱ ይቀነሳል — ድረ-ገጽ በፈጠረው መስመር ላይ ተመስርቶ ከልጆቹ ጋር ወደ ሌላ ከተማ ይጓዛል።

**የዚህ ገጽ ደንብ፦** ዝግጅት የሚዘረዘረው አዘጋጁ ራሱ ካሳተመው፣ የህትመቱ ማገናኛ ከጎኑ ካለ፣ እና ማገናኛው የተከፈተበት ቀን ከተመዘገበ ብቻ ነው።

## እስከዚያው ምን ማድረግ

- **በቀጥታ ከከተማዎ ማዘጋጃ ቤት ጋር ያረጋግጡ።** ህትመት ካገኙ ማገናኛውን ይላኩልን።
- **ሠራተኛ ከሆኑ** — ሰግድ በአንቀጽ 1(ለ) መሠረት "የምርጫ ቀን" ነው። [የሰግድ መመሪያ](/am/heritage/events/sigd)።
- **ልጆች በትምህርት ቤት ካሉዎት** — [ሰግድ በትምህርት ቤቶች](/am/heritage/sigd/schools)።
- **ከማህበረሰቡ ውጭ ሆነው ለመሳተፍ ካቀዱ** — [በአክብሮት የመሳተፍ መመሪያ](/am/heritage/sigd/guests)።
- **የጾም መስበሪያ ምግብ የሚያዘጋጁ ከሆነ** — [የሰግድ ምግብና የጾሙ ትርጉም](/am/culinary/sigd-menu)።

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ መገምገም ይኖርበታል።]*

**ምንጮች**፦ [የሰግድ በዓል ሕግ 5768-2008](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [የኢትዮጵያ አይሁዶች ቅርስ ማዕከል](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · መስከረም 15፣ 2026 ተረጋግጧል።`,
  },
};

// ── /heritage/sigd/schools ─────────────────────────────────────────────────

export const SIGD_SCHOOLS_PAGE: SigdPage = {
  title: {
    he: "הסיגד בבית הספר — מה מחייב החוק ומה הורה יכול לבקש",
    en: "Sigd at school — what the law requires and what a parent can ask for",
    am: "ሰግድ በትምህርት ቤት — ሕጉ የሚያስገድደው እና ወላጅ ሊጠይቅ የሚችለው",
  },
  description: {
    he: "חוק חג הסיגד מחייב את שר החינוך לקבוע פעילויות חינוכיות לחג. מה זה אומר בבית הספר של הילד שלכם, ואיך לבקש — בלי להתנצל.",
    en: "The Sigd Holiday Law obliges the Education Minister to set educational activities for the holiday. What that means at your child's school, and how to ask — without apologising.",
    am: "የሰግድ በዓል ሕግ የትምህርት ሚኒስትሩ ለበዓሉ የትምህርት እንቅስቃሴዎችን እንዲወስን ያስገድዳል። ይህ በልጅዎ ትምህርት ቤት ምን ማለት ነው።",
  },
  body: {
    he: `## הנקודה שכדאי להתחיל ממנה

הסיגד הוא **חג מדינה**, לא "אירוע של קהילה מסוימת". וחוק חג הסיגד, התשס"ח-2008 אומר על מערכת החינוך דבר אחד, קצר וברור:

> "שר החינוך יקבע פעילויות חינוכיות שייוחדו לחג הסיגד." (ס' 1(ג))

ההבדל בין "יקבע" ל"רשאי לקבוע" הוא כל ההבדל. בשני סעיפים אחרים באותו חוק הנוסח הוא "רשאי" — שר התעשייה המסחר והתעסוקה **רשאי** לקבוע אילו שירותים לא ייפסקו (ס' 3), ושר המדע התרבות והספורט **רשאי** לקבוע סמלים לחג (ס' 4). בסעיף שנוגע לחינוך הנוסח הוא **"יקבע"**. זו חובה.

המשמעות המעשית להורה: כשאתם פונים לבית הספר בנוגע לסיגד, אתם לא מבקשים טובה ולא מציעים העשרה אופציונלית. אתם מבקשים שהחג יקבל את מה שהמדינה כבר קבעה בחוק שיקבל.

מקור: [חוק חג הסיגד, התשס"ח-2008 — ספר החוקים 2164, ו' בתמוז התשס"ח (9.7.2008), עמ' 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · נבדק ספטמבר 2026.

## מה יש למשרד החינוך בפועל

למשרד החינוך יש חומרי סיגד באתר "מרחב פדגוגי" שלו, תחת מעגל השנה — חגים וימים מיוחדים. נכון לספטמבר 2026 קיימים שם דפי סיגד לגילאים ולמסגרות שונות (גן, שעת חינוך, חינוך מיוחד, עולים חדשים).

**גילוי נאות, כי ADR-021 מחייב אותנו:** אתר משרד החינוך חוסם גישה אוטומטית, ולא הצלחנו לפתוח את דפי התוכן עצמם כדי לקרוא ולסכם מה בדיוק יש בכל אחד. לכן אנחנו מקשרים אליהם ולא מתארים את תוכנם. אל תיקחו מאיתנו מה כתוב שם — קחו את הקישור ותפתחו אותו:

- [חג הסיגד, כ"ט בחשוון — מעגל השנה, מרחב פדגוגי, משרד החינוך](https://pop.education.gov.il/maagal_hashana/hagim_yamim_meyuchadim/sigd/)

אם אתם מורים או רכזי שכבה — זו נקודת ההתחלה, והיא רשמית.

## מה הורה יכול לבקש — רשימה שאפשר להקריא בטלפון

הפנייה נכונה יותר כשהיא קונקרטית. במקום "אולי תעשו משהו לסיגד", אלה בקשות שאפשר לשים על השולחן:

1. **שיעור או פעילות ייעודית ביום עצמו או בסמוך לו**, בהסתמך על ס' 1(ג) לחוק ועל חומרי משרד החינוך הקיימים.
2. **שהחומר יהיה נכון עובדתית** — התאריך הוא כ"ט בחשוון; השנה יום שני, 9.11.2026. שווה לוודא שבמצגת של בית הספר לא זחל תאריך שגוי.
3. **שהתוכן יסופר מתוך הקהילה ולא עליה** — הזמנת קס, ותיק קהילה או הורה שיספר, ולא רק דף מידע.
4. **שהחג לא יוצג רק כ"עלייה וקליטה"** — הסיגד הוא חג דתי בן מאות שנים עם תוכן משלו: חידוש הברית, הצום, האורית. סיפור העלייה הוא נושא אחר.
5. **התחשבות בילדים שצמים** — בבתי ספר על-יסודיים, תלמידים עשויים לצום בחלקו הראשון של היום. בקשה סבירה: לא לקבוע מבחן או פעילות גופנית מאומצת באותו בוקר.
6. **הכרה בהיעדרות** — הסיגד הוא חג מדינה; משפחה שבוחרת להשתתף בטקס אינה "מבריזה". שווה לתאם מראש עם המחנך ולבקש שההיעדרות תירשם ככזו.
7. **שלא יהיה זה רק לילדי הקהילה** — פעילות לכל הכיתה היא בדיוק מה שהחוק מתאר: פעילות חינוכית לחג מדינה.

## אם אתם עובדים ורוצים להיות שם

הסיגד הוא **"יום בחירה"** לפי ס' 1(ב) לחוק: "יום שהבחירה בידי העובד לצאת בו לחופשה או לעבוד; בחר העובד ביום כיום חופשה, יובא היום במניין ימי החופשה שלו".

כלומר הבחירה שלכם, אבל על חשבון ימי החופשה. תודיעו למעסיק מראש ובכתב — זה מקצר ויכוחים.

## מה לא נכתוב כאן

לא נפרט כאן "תוכנית לימודים רשמית של X שיעורים" ולא נצטט ממסמכי משרד החינוך שלא הצלחנו לפתוח. אם מצאתם חוזר מנכ"ל או תוכנית מחייבת שכן מפרטת — שלחו לנו את הקישור ונרחיב את העמוד עם מקור.

## ראו גם

- [מדריך הסיגד — מה החג, ההר, הצום, החוק](/he/heritage/events/sigd)
- [אירועי הסיגד 2026 — רשימה מאומתת](/he/heritage/sigd/events-2026)
- [באים לסיגד ולא מהקהילה? מדריך השתתפות מכבדת](/he/heritage/sigd/guests)
- [זכויות הורים במערכת החינוך](/he/education/parent-rights)

**מקורות**: [חוק חג הסיגד, התשס"ח-2008 — ספר החוקים 2164, עמ' 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [משרד החינוך — חג הסיגד, מעגל השנה](https://pop.education.gov.il/maagal_hashana/hagim_yamim_meyuchadim/sigd/) (קישור בלבד; הדף חוסם גישה אוטומטית ולא נקרא על ידינו) · נבדק ספטמבר 2026.`,
    en: `## The point to start from

Sigd is a **state holiday**, not "one community's event". And the Sigd Holiday Law, 5768-2008 says one short, clear thing about the education system:

> "The Minister of Education shall determine educational activities dedicated to the Sigd Holiday." (s. 1(c))

The difference between "shall determine" and "may determine" is the whole difference. Two other sections of the same statute say "may" — the Minister of Industry, Trade and Employment **may** determine which services are not halted (s. 3), and the Minister of Science, Culture and Sport **may** determine symbols for the holiday (s. 4). The education provision says **shall**. It is a duty.

What that means for a parent: when you approach the school about Sigd, you are not asking a favour and not proposing optional enrichment. You are asking that the holiday get what the state has already legislated it should get.

Source: [Sigd Holiday Law, 5768-2008 — Sefer HaChukim 2164, 9 July 2008, p. 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · verified September 2026.

## What the Ministry of Education actually has

The Ministry hosts Sigd material on its pedagogical portal, under the calendar-year section for holidays and special days. As of September 2026 there are Sigd pages there for several ages and settings (kindergarten, homeroom, special education, new immigrants).

**Full disclosure, because ADR-021 requires it of us:** the Ministry's site blocks automated access, and we could not open the content pages themselves to read and summarise exactly what each contains. So we link to them and do not describe them. Do not take from us what is written there — take the link and open it:

- [The Sigd holiday, 29 Cheshvan — Ministry of Education pedagogical portal](https://pop.education.gov.il/maagal_hashana/hagim_yamim_meyuchadim/sigd/)

If you are a teacher or a year-group coordinator, that is the starting point, and it is official.

## What a parent can ask for — a list you can read down the phone

The request lands better when it is concrete. Instead of "maybe do something for Sigd", these are asks you can put on the table:

1. **A dedicated lesson or activity on the day or near it**, resting on s. 1(c) of the statute and on the Ministry's existing materials.
2. **That the material be factually right** — the date is 29 Cheshvan; this year, Monday 9 November 2026. Worth checking that no wrong date has crept into the school's slides.
3. **That the content be told from inside the community, not about it** — invite a kes, a community elder or a parent to speak, rather than handing out an information sheet.
4. **That the holiday not be presented only as "aliyah and absorption"** — Sigd is a centuries-old religious holiday with its own content: renewing the covenant, the fast, the Orit. The immigration story is a different subject.
5. **Consideration for children who fast** — in secondary schools, students may fast through the first half of the day. A reasonable ask: no exam or strenuous PE that morning.
6. **Recognised absence** — Sigd is a state holiday; a family that chooses to attend the ceremony is not skipping school. Worth arranging with the homeroom teacher in advance and asking that the absence be recorded as such.
7. **That it not be only for the community's children** — an activity for the whole class is exactly what the statute describes: an educational activity for a state holiday.

## If you work and want to be there

Sigd is a **"day of choice"** under s. 1(b): "a day on which the choice is the employee's, to take leave or to work; where the employee chose the day as a leave day, the day shall be counted among that employee's leave days."

So the choice is yours, but it comes out of your annual leave. Tell your employer in advance and in writing — it shortens arguments.

## What we will not print here

We will not detail an "official curriculum of X lessons", and we will not quote from Ministry documents we could not open. If you have found a director-general circular or a binding programme that does spell this out, send us the link and we will expand this page with a source.

## See also

- [The Sigd guide — the holiday, the mountain, the fast, the law](/en/heritage/events/sigd)
- [Sigd 2026 events — a verified list](/en/heritage/sigd/events-2026)
- [Attending Sigd from outside the community](/en/heritage/sigd/guests)
- [Parents' rights in the education system](/en/education/parent-rights)

**Sources**: [Sigd Holiday Law, 5768-2008 — Sefer HaChukim 2164, p. 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [Ministry of Education — the Sigd holiday](https://pop.education.gov.il/maagal_hashana/hagim_yamim_meyuchadim/sigd/) (link only; the page blocks automated access and was not read by us) · verified September 2026.`,
    am: `## ከየት መጀመር

ሰግድ **መንግሥታዊ በዓል** ነው፣ "የአንድ ማህበረሰብ ዝግጅት" አይደለም። የሰግድ በዓል ሕግ 5768-2008 ስለ ትምህርት ሥርዓቱ አንድ አጭርና ግልጽ ነገር ይላል፦

> "የትምህርት ሚኒስትሩ ለሰግድ በዓል የተመደቡ የትምህርት እንቅስቃሴዎችን ይወስናል።" (አንቀጽ 1(ሐ))

"ይወስናል" እና "ሊወስን ይችላል" መካከል ያለው ልዩነት ሁሉንም ነገር ይለውጣል። በዚሁ ሕግ ውስጥ ሁለት ሌሎች አንቀጾች "ሊወስን ይችላል" ይላሉ (አንቀጽ 3 እና 4)። የትምህርቱ አንቀጽ ግን **"ይወስናል"** ይላል። ግዴታ ነው።

ለወላጅ ትርጉሙ፦ ስለ ሰግድ ትምህርት ቤቱን ሲያነጋግሩ፣ ውለታ እየጠየቁ አይደለም። መንግሥት በሕግ ያስቀመጠውን እየጠየቁ ነው።

ምንጭ፦ [የሰግድ በዓል ሕግ 5768-2008 — ሴፈር ሀሑኪም 2164፣ ገጽ 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · በመስከረም 2026 ተረጋግጧል።

## የትምህርት ሚኒስቴር ምን አለው

ሚኒስቴሩ በትምህርታዊ ፖርታሉ ላይ የሰግድ ቁሳቁስ አለው። እስከ መስከረም 2026 ድረስ ለተለያዩ ዕድሜዎችና ሁኔታዎች የሰግድ ገጾች አሉ።

**ግልጽነት፦** የሚኒስቴሩ ድረ-ገጽ አውቶማቲክ መዳረሻን ይዘጋል፣ እኛም የይዘት ገጾቹን ከፍተን ማንበብ አልቻልንም። ስለዚህ እናገናኛቸዋለን እንጂ አንገልጻቸውም፦

- [የሰግድ በዓል፣ 29 ኅሸዋን — የትምህርት ሚኒስቴር](https://pop.education.gov.il/maagal_hashana/hagim_yamim_meyuchadim/sigd/)

## ወላጅ ሊጠይቅ የሚችለው

1. **በዕለቱ ወይም በአቅራቢያው የተመደበ ትምህርት ወይም እንቅስቃሴ** — በአንቀጽ 1(ሐ) መሠረት።
2. **ቁሳቁሱ በእውነታ ትክክል እንዲሆን** — ቀኑ 29 ኅሸዋን ነው፤ ዘንድሮ ሰኞ ኅዳር 9፣ 2026።
3. **ይዘቱ ከማህበረሰቡ ውስጥ እንዲተረክ** — ቄስ፣ የማህበረሰብ ሽማግሌ ወይም ወላጅ እንዲናገር መጋበዝ።
4. **በዓሉ እንደ "ዓሊያና ውህደት" ብቻ እንዳይቀርብ** — ሰግድ የራሱ ይዘት ያለው የዘመናት ሃይማኖታዊ በዓል ነው።
5. **ለሚጾሙ ልጆች ግምት** — በዚያ ጠዋት ፈተና ወይም ከባድ የአካል ብቃት እንቅስቃሴ አለመመደብ።
6. **የታወቀ መቅረት** — ሰግድ መንግሥታዊ በዓል ነው፤ በሥነ ሥርዓቱ ለመሳተፍ የመረጠ ቤተሰብ ትምህርት እየቀረ አይደለም።
7. **ለማህበረሰቡ ልጆች ብቻ እንዳይሆን** — ለጠቅላላው ክፍል የሚሆን እንቅስቃሴ።

## ሠራተኛ ከሆኑ

ሰግድ በአንቀጽ 1(ለ) መሠረት **"የምርጫ ቀን"** ነው፦ ፈቃድ መውሰድ ወይም መሥራት የእርስዎ ምርጫ ነው፤ ፈቃድ ከመረጡ ግን ከዓመታዊ ፈቃድ ቀናትዎ ይቆጠራል። ለአሠሪዎ አስቀድመው በጽሑፍ ያሳውቁ።

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ መገምገም ይኖርበታል።]*

## ተጨማሪ

- [የሰግድ መመሪያ](/am/heritage/events/sigd)
- [የ2026 ሰግድ ዝግጅቶች](/am/heritage/sigd/events-2026)
- [ከማህበረሰቡ ውጭ ለሆኑ መመሪያ](/am/heritage/sigd/guests)

**ምንጮች**፦ [የሰግድ በዓል ሕግ 5768-2008](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [የትምህርት ሚኒስቴር](https://pop.education.gov.il/maagal_hashana/hagim_yamim_meyuchadim/sigd/) (ማገናኛ ብቻ፤ ገጹ አልተነበበም) · በመስከረም 2026 ተረጋግጧል።`,
  },
};

// ── /heritage/sigd/guests ──────────────────────────────────────────────────

export const SIGD_GUESTS_PAGE: SigdPage = {
  title: {
    he: "באים לסיגד ולא מהקהילה — מדריך השתתפות מכבדת",
    en: "Attending Sigd from outside the community — a respectful-attendance guide",
    am: "ከማህበረሰቡ ውጭ ሆኖ ሰግድን መሳተፍ — በአክብሮት የመሳተፍ መመሪያ",
  },
  description: {
    he: "כן, אתם מוזמנים. מה מתאים ללבוש, מתי לצלם ומתי לא, איך להתנהג בזמן התפילה, ומה לא להגיד — מדריך ישיר לאורחים בטקס הסיגד.",
    en: "Yes, you are welcome. What to wear, when to photograph and when not to, how to behave during the prayers, and what not to say — a direct guide for guests at a Sigd ceremony.",
    am: "አዎ፣ ተጋብዘዋል። ምን መልበስ፣ መቼ ፎቶ ማንሳት እንደሚቻልና እንደማይቻል፣ በጸሎት ጊዜ እንዴት መሆን እንዳለበት።",
  },
  body: {
    he: `## כן, אתם מוזמנים

הסיגד הוא חג מדינה מכוח חוק, והעצרת המרכזית שלו מתקיימת במרחב ציבורי פתוח בירושלים. אין "כרטיס כניסה" ואין צורך באישור. אתם מוזמנים.

אבל "פתוח לציבור" ו"אירוע ראווה" הם לא אותו דבר, וזה בדיוק הפער שהמדריך הזה מנסה לסגור. הסיגד הוא, בחלקו הראשון, **טקס דתי בצום** — לא פסטיבל תרבות. הבנת ההבדל הזה היא כל מה שצריך כדי להיות אורח טוב.

## הדבר האחד שחשוב להבין לפני שמגיעים

היום מחולק לשניים. המרכז למורשת יהדות אתיופיה מנסח זאת כך: "בחלקו הראשון יום תענית, ובחלקו השני יום חגיגה".

- **החלק הראשון** — תהלוכה, קריאה באורית, תפילות ודברי הקייסים, בצום. שקט, כבד ומרוכז. זה החלק שבו אתם צופים, לא משתתפים.
- **החלק השני** — אחרי שבירת הצום. אוכל, שירה וריקוד, ושמחה גדולה. זה החלק שבו הזמנה להצטרף היא אמיתית, ומקובל להיענות לה.

מי שמגיע באמצע היום ורואה רק ריקודים, מפספס את החג. מי שמגיע בבוקר ומתנהג כמו בפסטיבל, פוגע בו.

## מה ללבוש

- **לבן הוא הצבע המסורתי** של הקהילה בטקסים, ולבוש בהיר מתאים. אינכם חייבים לבוש מסורתי — ואם אתם לא מהקהילה, עדיף שלא ללבוש תלבושת מסורתית מלאה כתחפושת.
- **לבוש צנוע** — כתפיים מכוסות, בגדים לא חושפניים. זה טקס דתי.
- **נעליים לעמידה ארוכה**, וכיסוי ראש או מים בחום.

## צילום — הכלל הפשוט

הטקס מצולם באופן רשמי ומסוקר בתקשורת, וצילום כשלעצמו מקובל. שלושה סייגים:

1. **אל תעמדו בין הקהל לבין הקייסים** כדי להשיג זווית. התהלוכה והאורית הם לב הטקס, לא רקע.
2. **אל תצלמו אנשים בתפילה מקרוב בלי לשאול.** פנים של אדם מתפלל אינן "צבע מקומי".
3. **בזמן קריאת האורית — הניחו את הטלפון.** זה הרגע הכי קדוש ביום.

אם ביקשו מכם להפסיק לצלם — מפסיקים, בלי משא ומתן.

## איך להתנהג בזמן התפילה

- **עמידה בשקט** בזמן הקריאה ודברי הקייסים. אין צורך להשתתף בתפילה, אבל אין לנהל שיחה במקביל.
- **אל תאכלו ואל תשתו בגלוי** בשעות הצום, גם אם אתם עצמכם לא צמים. שתייה דיסקרטית בחום היא עניין אחר — פשוט לא במרכז הקהל.
- **הקייסים אינם אטרקציה.** אם רוצים לשאול אותם משהו, מחכים לחלק השני של היום ושואלים דרך מישהו מהקהילה.

## מה לא להגיד

זה החלק שאף מדריך אחר לא כותב, אז נכתוב אותו:

- **אל תגידו "כמה אקזוטי"** על טקס דתי. זה מרחיק ולא מחמיא.
- **אל תשאלו "מתי עלית לארץ?"** כשאלת פתיחה. חלק גדול מהמשתתפים נולדו בישראל, וחלקם דור שלישי.
- **אל תתייחסו לסיגד כאל "חג של עולים".** הוא נחגג מאות שנים לפני העלייה, ומאז 2008 הוא חג מדינה של כולם.
- **אל תשאלו לגעת באורית** ואל תתקרבו אליה בלי שהוזמנתם. באתיופיה זה היה היום היחיד בשנה שבו היא יצאה מבית הכנסת.
- **"אז זה כמו יום כיפור?"** — לא. יש דמיון בצום ובחשבון הנפש, אבל הסיגד הוא חידוש ברית, החצי השני שלו חגיגי, והצום בו אינו של יממה.

## ומה כן להגיד

"חג שמח" עובד מצוין. אם רוצים באמהרית: **መልካም በዓል** (מלכם בעאל) — חג שמח.

ואם הוזמנתם לשבור צום עם משפחה — אמרו כן. הכנסת אורחים היא חלק מהחג עצמו, לא נימוס שמסביבו.

## לפני שאתם מתכננים נסיעה

התאריך: **יום שני, 9 בנובמבר 2026**. פרטי אירועים, מיקומים ושעות מתפרסמים על-ידי המארגנים בסמוך לחג — ראו [אירועי הסיגד 2026](/he/heritage/sigd/events-2026), שם מופיע רק מה שפורסם רשמית, עם מקור. אל תתכננו נסיעה על סמך שעה שראיתם באתר שלא מציין מאיפה היא.

## ראו גם

- [מדריך הסיגד המלא — מה החג, ההר, הצום, החוק](/he/heritage/events/sigd)
- [תפריט שבירת הצום ומשמעות הצום](/he/culinary/sigd-menu)
- [קייסים — מילון מונחים](/he/glossary/kessim)
- [סיגד — מילון מונחים](/he/glossary/sigd)

**מקורות**: [המרכז למורשת יהדות אתיופיה — חג הסגד](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · [חוק חג הסיגד, התשס"ח-2008](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · נבדק ספטמבר 2026. ההנחיות להתנהגות אורחים הן המלצות עריכה הנגזרות מאופיו של הטקס כפי שהמקורות מתארים אותו, ולא כלל דתי פסוק.`,
    en: `## Yes, you are welcome

Sigd is a state holiday by statute, and its central assembly takes place in open public space in Jerusalem. There is no ticket and no permission needed. You are welcome.

But "open to the public" and "a spectacle" are not the same thing, and that gap is what this guide is for. Sigd is, in its first half, **a religious ceremony held while fasting** — not a culture festival. Understanding that difference is most of what it takes to be a good guest.

## The one thing to understand before you come

The day is in two halves. The Ethiopian Jewry Heritage Center puts it this way: "in its first part a fast day, and in its second part a day of celebration".

- **The first half** — the procession, the reading from the Orit, the prayers and the kessim's address, while fasting. Quiet, weighty, concentrated. This is the half you watch, not the half you join.
- **The second half** — after the fast is broken. Food, singing, dancing, real joy. Here an invitation to join is genuine, and accepting it is the normal thing to do.

Someone who arrives midday and sees only dancing has missed the holiday. Someone who arrives in the morning and behaves as though at a festival damages it.

## What to wear

- **White is the traditional colour** for the community at these ceremonies, and light clothing fits. Traditional dress is not required — and if you are not from the community, it is better not to wear full traditional dress as a costume.
- **Modest clothing** — shoulders covered, nothing revealing. It is a religious ceremony.
- **Shoes for standing a long time**, and a hat or water if it is hot.

## Photography — the simple rule

The ceremony is officially photographed and covered by the press, and photography as such is accepted. Three caveats:

1. **Do not stand between the congregation and the kessim** to get an angle. The procession and the Orit are the heart of the rite, not a backdrop.
2. **Do not photograph people at prayer up close without asking.** A praying person's face is not local colour.
3. **During the reading from the Orit, put the phone away.** It is the most sacred moment of the day.

If you are asked to stop photographing, stop — without negotiating.

## How to behave during the prayers

- **Stand quietly** during the reading and the kessim's address. You need not join the prayer, but do not hold a conversation alongside it.
- **Do not eat or drink openly** during the fasting hours, even if you are not fasting yourself. Discreet water in the heat is a different matter — simply not in the middle of the congregation.
- **The kessim are not an attraction.** If you want to ask them something, wait for the second half of the day and ask through someone from the community.

## What not to say

This is the part no other guide writes, so we will:

- **Do not say "how exotic"** about a religious ceremony. It distances rather than flatters.
- **Do not open with "when did you immigrate?"** Many of those present were born in Israel, some of them third generation.
- **Do not treat Sigd as "an immigrants' holiday".** It was observed for centuries before the aliyah, and since 2008 it is a state holiday belonging to everyone.
- **Do not ask to touch the Orit** and do not approach it uninvited. In Ethiopia this was the one day of the year it left the synagogue.
- **"So it's like Yom Kippur?"** — no. There is a resemblance in the fast and the soul-searching, but Sigd is a covenant renewal, its second half is celebratory, and its fast is not a full day.

## And what to say

"Chag sameach" works perfectly. In Amharic: **መልካም በዓል** (melkam be'al) — happy holiday.

And if you are invited to break the fast with a family, say yes. Hospitality is part of the holiday itself, not a courtesy around it.

## Before you plan a trip

The date: **Monday, 9 November 2026**. Event details, locations and times are published by the organisers close to the holiday — see [Sigd 2026 events](/en/heritage/sigd/events-2026), which lists only what has been officially published, with its source. Do not plan a journey around a time you saw on a site that does not say where it got it.

## See also

- [The complete Sigd guide — the holiday, the mountain, the fast, the law](/en/heritage/events/sigd)
- [The break-fast menu and the meaning of the fast](/en/culinary/sigd-menu)
- [Kessim — glossary](/en/glossary/kessim)
- [Sigd — glossary](/en/glossary/sigd)

**Sources**: [Ethiopian Jewry Heritage Center — the Sigd holiday](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · [Sigd Holiday Law, 5768-2008](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · verified September 2026. The guest-conduct guidance is editorial advice derived from the character of the ceremony as the sources describe it, not a ruled religious requirement.`,
    am: `## አዎ፣ ተጋብዘዋል

ሰግድ በሕግ መንግሥታዊ በዓል ነው፣ ማዕከላዊ ጉባኤውም በኢየሩሳሌም ክፍት በሆነ የሕዝብ ቦታ ይካሄዳል። ትኬትም ፈቃድም አያስፈልግም። ተጋብዘዋል።

ነገር ግን "ለሕዝብ ክፍት" እና "ትርዒት" አንድ አይደሉም። ሰግድ በመጀመሪያ ክፍሉ **በጾም የሚከናወን ሃይማኖታዊ ሥነ ሥርዓት** ነው — የባህል ፌስቲቫል አይደለም።

## ከመምጣትዎ በፊት መረዳት ያለብዎት አንድ ነገር

ቀኑ በሁለት ይከፈላል። የኢትዮጵያ አይሁዶች ቅርስ ማዕከል እንዲህ ይገልጸዋል፦ "በመጀመሪያው ክፍሉ የጾም ቀን፣ በሁለተኛው ክፍሉ የበዓል ቀን"።

- **የመጀመሪያው ክፍል** — ሰልፍ፣ ከኦሪት ማንበብ፣ ጸሎትና የቄሶች ንግግር፣ በጾም። ጸጥታ የሰፈነበት። ይህ የሚመለከቱበት እንጂ የሚቀላቀሉበት አይደለም።
- **ሁለተኛው ክፍል** — ጾሙ ከተሰበረ በኋላ። ምግብ፣ ዘፈን፣ ጭፈራ። እዚህ ላይ የመቀላቀል ግብዣ እውነተኛ ነው።

## ምን መልበስ

- **ነጭ ባህላዊው ቀለም ነው**። ባህላዊ ልብስ ግዴታ አይደለም — ከማህበረሰቡ ውጭ ከሆኑ ሙሉ ባህላዊ ልብስ እንደ አልባሳት አለመልበስ ይሻላል።
- **ልከኛ ልብስ** — ትከሻ የተሸፈነ። ሃይማኖታዊ ሥነ ሥርዓት ነው።
- **ረጅም ጊዜ ለመቆም የሚያገለግል ጫማ**።

## ፎቶግራፍ — ቀላሉ ደንብ

1. **በሕዝቡና በቄሶቹ መካከል አይቁሙ።**
2. **በጸሎት ላይ ያሉ ሰዎችን ሳይጠይቁ በቅርበት አይቅረጹ።**
3. **ኦሪት በሚነበብበት ጊዜ ስልኩን ያስቀምጡ።** የቀኑ እጅግ ቅዱስ ጊዜ ነው።

እንዲያቆሙ ከተጠየቁ — ያቁሙ።

## በጸሎት ጊዜ

- **በጸጥታ መቆም**። በጸሎቱ መሳተፍ ግዴታ አይደለም፣ ነገር ግን ጎን ለጎን ማውራት አይገባም።
- **በጾም ሰዓት በግልጽ አይብሉ አይጠጡ**፣ እርስዎ ባይጾሙም።
- **ቄሶቹ መስህብ አይደሉም።** ጥያቄ ካለዎት ለሁለተኛው የቀኑ ክፍል ይጠብቁ።

## ምን አለማለት

- **"እንዴት ያልተለመደ ነው" አይበሉ።**
- **"መቼ ነው ወደ እስራኤል የመጡት?" በሚል አይጀምሩ።** ብዙዎቹ በእስራኤል ተወልደዋል።
- **ሰግድን "የስደተኞች በዓል" አድርገው አይያዙት።** ከዓሊያው በፊት ለዘመናት ተከብሯል፤ ከ2008 ጀምሮም የሁሉም መንግሥታዊ በዓል ነው።
- **ኦሪትን ለመንካት አይጠይቁ።**
- **"ታዲያ እንደ ዮም ኪፑር ነው?"** — አይደለም።

## ምን ማለት ይቻላል

**መልካም በዓል** ይሠራል።

የጾም መስበሪያ ከቤተሰብ ጋር ከተጋበዙ — አዎ ይበሉ። እንግዳ ተቀባይነት የበዓሉ አካል ነው።

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ መገምገም ይኖርበታል።]*

## ጉዞ ከማቀድዎ በፊት

ቀኑ፦ **ሰኞ፣ ኅዳር 9፣ 2026**። የዝግጅት ዝርዝሮች፣ ቦታዎችና ሰዓቶች በአዘጋጆቹ ከበዓሉ አቅራቢያ ይታተማሉ — [የ2026 ሰግድ ዝግጅቶች](/am/heritage/sigd/events-2026) ይዩ።

## ተጨማሪ

- [ሙሉ የሰግድ መመሪያ](/am/heritage/events/sigd)
- [የጾም መስበሪያ ምግብ](/am/culinary/sigd-menu)
- [ቄሶች — መዝገበ ቃላት](/am/glossary/kessim)

**ምንጮች**፦ [የኢትዮጵያ አይሁዶች ቅርስ ማዕከል](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · [የሰግድ በዓል ሕግ 5768-2008](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · በመስከረም 2026 ተረጋግጧል።`,
  },
};

function pick(page: SigdPage, field: keyof SigdPage, locale: Locale): string {
  return page[field][locale] ?? page[field][DEFAULT_LOCALE];
}

export function sigdPageTitle(page: SigdPage, locale: Locale): string {
  return pick(page, "title", locale);
}

export function sigdPageDescription(page: SigdPage, locale: Locale): string {
  return pick(page, "description", locale);
}

export function sigdPageBody(page: SigdPage, locale: Locale): string {
  return pick(page, "body", locale);
}
