// Wave 12 articles — the first week of the sustained news cadence (TED-171),
// researched and verified 2026-09-16.
//
// Same discipline as waves 8, 10 and 11: every item rests on a primary source
// that was opened and read in full, never a search-result snippet, and every
// source's own publication date was checked before the claim was written.
// Where a page carried no date, that is said out loud in the copy instead of
// being papered over.
//
// What was read in full for this wave:
//   * the candidate lists themselves, as published by the parties and
//     reproduced in full by Kipa (ישר! 7.9, ביחד 6.9, כחול לבן 8.9) and mako
//     (הליכוד 8.9) — the names were counted, not skimmed;
//   * the statutory text of חוק-יסוד: הכנסת ס' 10 and חוק הבחירות לכנסת
//     [נוסח משולב] ס' 133, 134א, 136, pulled as raw HTML and read;
//   * Leumit's Tishrei opening-hours page, whose dates were cross-checked
//     against the Hebrew calendar before being republished;
//   * the Ethiopian Jewry Heritage Center's Sigd page and the Western Wall
//     Heritage Foundation's Sigd page, both of which still show 5786/2025;
//   * Tech-Career's own course page, pulled as raw HTML and read.
//
// Candidates opened and DROPPED rather than published:
//   * the Students Authority tuition-funding deadlines (new students 10.11,
//     continuing students 1.10). Genuinely actionable, but gov.il and Kol
//     Zchut both refused every request from this environment (HTTP 403 via
//     two independent clients), so the deadline could not be read at source.
//     ADR-021 says an unverifiable number is removed, not softened. It will
//     ship the week it can be opened;
//   * a Tech-Career cohort said to open on 20.10.2026 — Tech-Career's own
//     course page lists two courses and neither carries that date;
//   * the Knesset Research and Information Center paper on Ethiopian-Israelis
//     and housing assistance — dated 10 August 2025, a year old;
//   * the State Comptroller's announcement that he would audit the aliyah of
//     the remnant of Ethiopian Jewry — 10 February 2026, and no findings have
//     been published since;
//   * Government Resolution 3243 and the ENP SPACE expansion — the ENP news
//     items carry a day and a month but no year, so neither could be dated;
//   * the placement / entitlement-and-characterisation committee season — the
//     submission deadline it turns on was 20 April 2026 and has passed.
import type { NewsArticleEntry } from "./articles.server";

const AM_NOTICE = "*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ መገምገም ይኖርበታል።]*";

export const ARTICLES_WAVE12: NewsArticleEntry[] = [
  // 1 — the completed representation picture ---------------------------------
  {
    slug: "community-representation-final-lists-knesset-26",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    tags: ["civic", "community"],
    title: {
      he: "התמונה המלאה: אלה בני הקהילה שמופיעים ברשימות לכנסת ה-26, ובאיזה מקום",
      en: "The complete picture: the community members on the lists for the 26th Knesset, and where",
      am: "ሙሉ ምስሉ፦ ለ26ኛው ኔሴት በዝርዝሮች ውስጥ የሚገኙ የማህበረሰቡ አባላትና ቦታቸው",
    },
    excerpt: {
      he: "הבטחנו לשוב לנושא כשההגשה תסתיים. 38 רשימות הוגשו, וספרנו את השמות ברשימות המרכזיות: פנינה תמנו-שטה במקום 2 בכחול לבן, יפה טבג'ה במקום 21 בישר!, מהרטה ברוך-רון במקום 26 בדמוקרטים. ברשימות הליכוד וביחד — אף שם מהקהילה ב-35 המקומות שפורסמו.",
      en: "We promised to return when submission closed. 38 lists were submitted, and we counted the names on the main ones: Pnina Tamano-Shata at 2 on Blue and White, Yafa Tabja at 21 on Yashar!, Mehereta Baruch-Ron at 26 on the Democrats. On the Likud and Beyahad lists, no community name appears in the 35 published slots.",
      am: "ማቅረቡ ሲጠናቀቅ እንደምንመለስ ቃል ገብተን ነበር። 38 ዝርዝሮች ቀርበዋል፤ በዋና ዋናዎቹ ውስጥ ስሞቹን ቆጥረናል፦ ፒኒና ታማኖ-ሻታ በሰማያዊና ነጭ 2ኛ፣ ያፋ ታብጃ በያሻር! 21ኛ፣ መሀረታ ባሩክ-ሮን በዴሞክራቶች 26ኛ። በሊኩድና በብያሐድ ዝርዝሮች በታተሙት 35 ቦታዎች ውስጥ የማህበረሰቡ ስም የለም።",
    },
    bodies: {
      he: `## למה חזרנו לזה

ב-8.9.2026 פרסמנו כאן [כתבה על מהרטה ברוך-רון במקום ה-26 ברשימת הדמוקרטים](/he/news/mehereta-baruch-ron-democrats-list-2026), וכתבנו בה במפורש שזו תמונה חלקית של יום אחד, כי יום ההגשה השני טרם הסתיים, ושנשוב לנושא כשהתמונה תושלם. התמונה הושלמה. זו הכתבה הזו.

## איפה הדברים עומדים

לפי דיווח של אתר החדשות דבר (8.9.2026), הליך הגשת הרשימות הסתיים בערב אותו יום עם **38 רשימות שהוגשו**. ועדת הבחירות המרכזית מסרה:

> "עם סיום שלב ההגשה יימשך הליך בדיקת הרשימות, הכינויים והאותיות המבוקשים בהתאם לדין. אישור סופי של רשימות המועמדים יהיה ב-27 בספטמבר".

הבחירות עצמן נקבעו ל-**27.10.2026**.

## מי מופיע, ואיפה

עברנו על הרשימות המלאות כפי שפורסמו, ולא על כותרות. אלה הממצאים:

| מועמדת | רשימה | מקום | מתי פורסמה הרשימה |
| --- | --- | --- | --- |
| פנינה תמנו-שטה | כחול לבן בראשות בני גנץ | 2 | 8.9.2026 |
| יפה טבג'ה | ישר! בראשות גדי איזנקוט | 21 | 7.9.2026 |
| מהרטה ברוך-רון | הדמוקרטים בראשות יאיר גולן | 26 | 7.9.2026 |

**פנינה תמנו-שטה** היא ח"כ מכהנת ויו"ר הסיעה. לפי הרשימה שפרסמה כיפה ב-8.9.2026, היא משובצת במקום השני אחרי בני גנץ, ולצדה ד"ר עליזה בלוך במקום השלישי. מי שהגישו את הרשימה לוועדת הבחירות היו תמנו-שטה ובלוך.

**יפה טבג'ה** מופיעה במקום ה-21 ברשימת ישר! בראשות גדי איזנקוט, לפי הרשימה המלאה של 40 השמות שפרסמה כיפה ב-7.9.2026 בשעה 15:12.

**מהרטה ברוך-רון** — סגנית ראש עיריית תל אביב-יפו לשעבר — מופיעה במקום ה-26 ברשימת הדמוקרטים, כפי שדיווחנו בשבוע שעבר מתוך פרסום ועדת הבחירות.

## ואיפה אין

ספרנו גם את מה שאין, כי זה חלק מהתמונה:

- **הליכוד** — ברשימה בת 35 השמות שפרסם mako ב-8.9.2026 בשעה 18:38 לא מופיע שם מהקהילה. הרקע לכך תועד כאן בעבר: [ח"כ צגה מלכו פרשה מהפריימריז](/he/news/tsega-melaku-withdraws-likud-primaries-2026), ואחר כך [32 קסים חתמו על מכתב לנתניהו בבקשה לשריין לה מקום](/he/news/likud-reserved-slots-kessim-letter-2026).
- **ביחד** בראשות נפתלי בנט — ברשימה בת 35 השמות שפרסמה כיפה ב-6.9.2026 בשעה 20:11 לא מופיע שם מהקהילה. על מה שקדם לכך כתבנו בנפרד.

## ההערכה שפורסמה, וההסתייגות שלנו ממנה

ב-ynet התפרסם ניתוח מאת סער הס על הרכבה הצפוי של הכנסת הבאה, שקובע:

> "גם לעלייה האתיופית נציגה אחת בלבד במקום ריאלי - יפה טבג'ה (21 בישר!)".

שתי הסתייגויות, ושתיהן חשובות:

1. **זו הערכה, לא עובדה.** "מקום ריאלי" נגזר ממספר המנדטים שרשימה תקבל, וזה ייוודע ב-27.10.2026. טדרוס אינו מפרסם תחזיות מנדטים ואינו מביע עמדה על מפלגה כלשהי.
2. **לא הצלחנו לאתר תאריך פרסום** על עמוד הניתוח הזה. אנחנו מביאים אותו כהערכה שפורסמה ומיוחסת לכותב, ולא כעובדה מתוארכת. כך גם כדאי לקרוא אותו.

## מה עוד לא סופי

הרשימות שהוגשו **טרם אושרו**. אישור רשימות המועמדים נקבע ל-27.9.2026 ופרסומן הרשמי ל-18.10.2026. עד אז ייתכנו שינויים — מועמד שנפסל, רשימה שמושכת שם, ערעור שמתקבל. נעדכן אם זה יקרה.

## קראו גם

- [לוח הזמנים של הבחירות לכנסת ה-26](/he/news/knesset-26-elections-timetable-2026)
- [18 הרשימות שהוגשו ביום הראשון](/he/news/candidate-lists-day-one-2026)
- [איתור הקלפי שלכם, גם באמהרית](/he/news/polling-station-lookup-amharic-2026)

## מקורות

- [אתר החדשות דבר — "38 מפלגות יתמודדו: הסתיימה הגשת הרשימות לכנסת ה-26", ‏8.9.2026](https://www.davar1.co.il/696375/) · נבדק 16.9.2026
- [כיפה — "טרופר במקום השישי: הרשימה המלאה של איזנקוט לכנסת", ‏7.9.2026 15:12](https://www.kipa.co.il/%D7%97%D7%93%D7%A9%D7%95%D7%AA/1231179-0/) · נבדק 16.9.2026
- [כיפה — "עליזה בלוך במקום ה-3: הרשימה של בני גנץ לבחירות לכנסת", ‏8.9.2026 20:06](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231292-0/) · נבדק 16.9.2026
- [כיפה — "בנט במקום הראשון, לפיד אחריו: הרשימה המלאה של מפלגת ביחד", ‏6.9.2026 20:11](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231118-0/) · נבדק 16.9.2026
- [mako — "זו הרשימה הסופית של הליכוד לבחירות 2026", ‏8.9.2026 18:38](https://www.mako.co.il/news-politics/2026_q3/Article-2ddf4a5b99180a1027.htm) · נבדק 16.9.2026
- [ynet — ניתוח מאת סער הס על הרכב הכנסת הבאה](https://www.ynet.co.il/news/elections2026/article/sjemqwwyfx) · לא נמצא תאריך פרסום על העמוד · נבדק 16.9.2026`,
      en: `## Why we came back to this

On 8 September 2026 we published [a piece on Mehereta Baruch-Ron at number 26 on the Democrats list](/en/news/mehereta-baruch-ron-democrats-list-2026), and said in it plainly that this was a partial, one-day picture, because the second submission day had not yet finished, and that we would return when the picture was complete. It is complete. This is that piece.

## Where things stand

Per a report by the Davar news site (8 September 2026), the submission process closed that evening with **38 lists submitted**. The Central Elections Committee stated:

> "Upon completion of the submission stage, the process of examining the lists, names and requested letters will continue in accordance with the law. Final approval of the candidate lists will be on 27 September."

The election itself is set for **27 October 2026**.

## Who appears, and where

We went through the full published lists, not the headlines. The findings:

| Candidate | List | Slot | List published |
| --- | --- | --- | --- |
| Pnina Tamano-Shata | Blue and White, led by Benny Gantz | 2 | 8 Sep 2026 |
| Yafa Tabja | Yashar!, led by Gadi Eisenkot | 21 | 7 Sep 2026 |
| Mehereta Baruch-Ron | The Democrats, led by Yair Golan | 26 | 7 Sep 2026 |

**Pnina Tamano-Shata** is a sitting MK and faction chair. Per the list Kipa published on 8 September 2026, she is placed second after Benny Gantz, with Dr Aliza Bloch third. It was Tamano-Shata and Bloch who filed the list with the Elections Committee.

**Yafa Tabja** appears at number 21 on the Yashar! list led by Gadi Eisenkot, per the full 40-name list Kipa published on 7 September 2026 at 15:12.

**Mehereta Baruch-Ron** — a former deputy mayor of Tel Aviv-Yafo — appears at number 26 on the Democrats list, as we reported last week from the Elections Committee's own publication.

## And where there is nobody

We counted the absences too, because they are part of the picture:

- **Likud** — no community name appears in the 35-name list mako published on 8 September 2026 at 18:38. The background was documented here before: [MK Tsega Melaku withdrew from the primaries](/en/news/tsega-melaku-withdraws-likud-primaries-2026), and then [32 kessim signed a letter to Netanyahu asking that a slot be reserved for her](/en/news/likud-reserved-slots-kessim-letter-2026).
- **Beyahad**, led by Naftali Bennett — no community name appears in the 35-name list Kipa published on 6 September 2026 at 20:11. We cover what led up to that separately.

## The published assessment, and our reservation about it

Ynet carried an analysis by Saar Hess on the likely composition of the next Knesset, which states:

> "The Ethiopian aliyah too has only one representative in a realistic slot — Yafa Tabja (21 on Yashar!)."

Two reservations, both of which matter:

1. **This is an assessment, not a fact.** A "realistic slot" is derived from how many seats a list wins, and that will be known on 27 October 2026. Tedros publishes no seat forecasts and takes no position on any party.
2. **We could not find a publication date** on that analysis page. We bring it as a published assessment attributed to its author, not as a dated fact. Read it that way.

## What is still not final

The submitted lists have **not yet been approved**. Approval of the candidate lists is set for 27 September 2026 and official publication for 18 October 2026. Until then things can change — a candidate disqualified, a list withdrawing a name, an appeal upheld. We will update if that happens.

## Read also

- [The election timetable for the 26th Knesset](/en/news/knesset-26-elections-timetable-2026)
- [The 18 lists submitted on day one](/en/news/candidate-lists-day-one-2026)
- [Finding your polling station, in Amharic too](/en/news/polling-station-lookup-amharic-2026)

## Sources

- [Davar — "38 parties will run: submission of lists for the 26th Knesset has closed", 8 Sep 2026](https://www.davar1.co.il/696375/) · verified 16 Sep 2026
- [Kipa — "Trooper sixth: Eisenkot's full Knesset list", 7 Sep 2026 15:12](https://www.kipa.co.il/%D7%97%D7%93%D7%A9%D7%95%D7%AA/1231179-0/) · verified 16 Sep 2026
- [Kipa — "Aliza Bloch third: Benny Gantz's list for the Knesset election", 8 Sep 2026 20:06](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231292-0/) · verified 16 Sep 2026
- [Kipa — "Bennett first, Lapid after him: the full Beyahad list", 6 Sep 2026 20:11](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231118-0/) · verified 16 Sep 2026
- [mako — "This is Likud's final list for the 2026 election", 8 Sep 2026 18:38](https://www.mako.co.il/news-politics/2026_q3/Article-2ddf4a5b99180a1027.htm) · verified 16 Sep 2026
- [ynet — analysis by Saar Hess on the composition of the next Knesset](https://www.ynet.co.il/news/elections2026/article/sjemqwwyfx) · no publication date found on the page · verified 16 Sep 2026`,
      am: `## ወደዚህ ለምን ተመለስን

መስከረም 8 ቀን 2026 [መሀረታ ባሩክ-ሮን በዴሞክራቶች ዝርዝር 26ኛ ቦታ ላይ ስለመሆኗ](/am/news/mehereta-baruch-ron-democrats-list-2026) ጽሑፍ አሳትመን ነበር፤ በዚያም ውስጥ ይህ የአንድ ቀን ከፊል ምስል እንደሆነ በግልጽ ተናግረን፣ ሁለተኛው የማቅረቢያ ቀን ሲጠናቀቅ እንደምንመለስ ቃል ገብተናል። ምስሉ ተጠናቋል። ይህ ያ ጽሑፍ ነው።

## ሁኔታው የት ደርሷል

የዳቫር የዜና ጣቢያ ዘገባ (መስከረም 8፣ 2026) መሠረት፣ የዝርዝር ማቅረቢያ ሂደቱ በዚያኑ ምሽት **38 ዝርዝሮች ቀርበው** ተጠናቋል። ማዕከላዊ ምርጫ ኮሚቴ እንዲህ ብሏል፦

> «የማቅረቢያ ደረጃው ሲጠናቀቅ የዝርዝሮቹ፣ የስሞቹና የተጠየቁት ፊደላት ምርመራ በሕግ መሠረት ይቀጥላል። የዕጩዎች ዝርዝር የመጨረሻ ማጽደቅ መስከረም 27 ይሆናል።»

ምርጫው ራሱ **ጥቅምት 27፣ 2026** ተወስኗል።

## ማን አለ፣ በየትኛው ቦታ

ርዕሶችን ሳይሆን የታተሙትን ሙሉ ዝርዝሮች አልፈናል። ግኝቶቹ፦

| ዕጩ | ዝርዝር | ቦታ | ዝርዝሩ የታተመበት |
| --- | --- | --- | --- |
| ፒኒና ታማኖ-ሻታ | ሰማያዊና ነጭ፣ በቤኒ ጋንትስ የሚመራ | 2 | መስከረም 8፣ 2026 |
| ያፋ ታብጃ | ያሻር!፣ በጋዲ አይዘንኮት የሚመራ | 21 | መስከረም 7፣ 2026 |
| መሀረታ ባሩክ-ሮን | ዴሞክራቶች፣ በያኢር ጎላን የሚመራ | 26 | መስከረም 7፣ 2026 |

**ፒኒና ታማኖ-ሻታ** በሥራ ላይ ያለች የኔሴት አባልና የቡድን ሊቀመንበር ናት። ኪፓ መስከረም 8 ቀን 2026 ባሳተመው ዝርዝር መሠረት ከቤኒ ጋንትስ ቀጥላ በሁለተኛ ቦታ ተቀምጣለች።

**ያፋ ታብጃ** ኪፓ መስከረም 7 ቀን 2026 በ15:12 ባሳተመው የ40 ስሞች ሙሉ ዝርዝር መሠረት በያሻር! ዝርዝር 21ኛ ቦታ ላይ ትገኛለች።

**መሀረታ ባሩክ-ሮን** — የቀድሞ የቴል አቪቭ-ያፎ ምክትል ከንቲባ — ባለፈው ሳምንት እንደዘገብነው በዴሞክራቶች ዝርዝር 26ኛ ቦታ ላይ ትገኛለች።

## ማንም የሌለበት የት ነው

አለመኖሩም የምስሉ አካል ስለሆነ ቆጥረነዋል፦

- **ሊኩድ** — mako መስከረም 8 ቀን 2026 በ18:38 ባሳተመው የ35 ስሞች ዝርዝር ውስጥ የማህበረሰቡ ስም የለም። ዳራው ቀደም ብሎ እዚህ ተመዝግቧል፦ [የኔሴት አባል ጼጋ መላኩ ከፕራይመሪ መውጣቷ](/am/news/tsega-melaku-withdraws-likud-primaries-2026)፣ ከዚያም [32 ቀሲሶች ለኔታንያሁ ደብዳቤ መፈረማቸው](/am/news/likud-reserved-slots-kessim-letter-2026)።
- **ብያሐድ**፣ በናፍታሊ ቤኔት የሚመራ — ኪፓ መስከረም 6 ቀን 2026 በ20:11 ባሳተመው የ35 ስሞች ዝርዝር ውስጥ የማህበረሰቡ ስም የለም።

## የታተመው ግምገማና በእሱ ላይ ያለን ጥንቃቄ

ynet በሳር ሄስ የተጻፈ የሚቀጥለው ኔሴት ስብጥር ትንተና አትሟል፤ እንዲህ ይላል፦

> «ለኢትዮጵያ ዐሊያም በተጨባጭ ቦታ አንዲት ተወካይ ብቻ ናት — ያፋ ታብጃ (በያሻር! 21)።»

ሁለት ጥንቃቄዎች፣ ሁለቱም አስፈላጊ ናቸው፦

1. **ይህ ግምገማ ነው እንጂ እውነታ አይደለም።** «ተጨባጭ ቦታ» ዝርዝሩ ከሚያገኘው መቀመጫ ብዛት የሚመነጭ ሲሆን ይህ ጥቅምት 27፣ 2026 ይታወቃል። ቴድሮስ የመቀመጫ ትንበያ አያሳትምም በየትኛውም ፓርቲ ላይም አቋም አይገልጽም።
2. **በዚያ የትንተና ገጽ ላይ የታተመበትን ቀን ማግኘት አልቻልንም።** እንደ ተጻፈለት ጸሐፊ የተሰጠ የታተመ ግምገማ እንጂ እንደ ተመዘገበ እውነታ አናቀርበውም።

## ገና የማይጠናቀቀው

የቀረቡት ዝርዝሮች **ገና አልጸደቁም**። የዕጩዎች ዝርዝር ማጽደቅ መስከረም 27፣ 2026፣ ይፋዊ ህትመቱ ደግሞ ጥቅምት 18፣ 2026 ተወስኗል። እስከዚያ ድረስ ለውጥ ሊኖር ይችላል።

## ተጨማሪ ያንብቡ

- [ለ26ኛው ኔሴት የምርጫ የጊዜ ሰሌዳ](/am/news/knesset-26-elections-timetable-2026)
- [በመጀመሪያው ቀን የቀረቡት 18 ዝርዝሮች](/am/news/candidate-lists-day-one-2026)
- [የምርጫ ጣቢያዎን መፈለግ፣ በአማርኛም](/am/news/polling-station-lookup-amharic-2026)

${AM_NOTICE}

## ምንጮች

- [ዳቫር — «38 ፓርቲዎች ይወዳደራሉ፦ ለ26ኛው ኔሴት የዝርዝር ማቅረብ ተጠናቋል»፣ መስከረም 8፣ 2026](https://www.davar1.co.il/696375/) · መስከረም 16፣ 2026 ተረጋግጧል
- [ኪፓ — የአይዘንኮት ሙሉ ዝርዝር፣ መስከረም 7፣ 2026 15:12](https://www.kipa.co.il/%D7%97%D7%93%D7%A9%D7%95%D7%AA/1231179-0/) · መስከረም 16፣ 2026 ተረጋግጧል
- [ኪፓ — የቤኒ ጋንትስ ዝርዝር፣ መስከረም 8፣ 2026 20:06](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231292-0/) · መስከረም 16፣ 2026 ተረጋግጧል
- [ኪፓ — የብያሐድ ሙሉ ዝርዝር፣ መስከረም 6፣ 2026 20:11](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231118-0/) · መስከረም 16፣ 2026 ተረጋግጧል
- [mako — የሊኩድ የመጨረሻ ዝርዝር፣ መስከረም 8፣ 2026 18:38](https://www.mako.co.il/news-politics/2026_q3/Article-2ddf4a5b99180a1027.htm) · መስከረም 16፣ 2026 ተረጋግጧል
- [ynet — በሳር ሄስ ትንተና](https://www.ynet.co.il/news/elections2026/article/sjemqwwyfx) · በገጹ ላይ የታተመበት ቀን አልተገኘም · መስከረም 16፣ 2026 ተረጋግጧል`,
    },
  },

  // 2 — the Beyahad Ethiopian HQ and the slot that did not come --------------
  {
    slug: "beyahad-ethiopian-hq-representation-demand-2026",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    tags: ["civic", "community"],
    title: {
      he: "מטה יוצאי אתיופיה של ביחד דרש ייצוג — וברשימה שהוגשה אין שם מהקהילה",
      en: "Beyahad's Ethiopian-Israeli HQ demanded representation — and the submitted list carries no community name",
      am: "የብያሐድ የኢትዮጵያ ተወላጆች መምሪያ ውክልና ጠየቀ — በቀረበው ዝርዝር ግን የማህበረሰቡ ስም የለም",
    },
    excerpt: {
      he: "ב-30.8.2026 דיווח N12 שפעילי מטה יוצאי אתיופיה של מפלגת ביחד מאיימים לעזוב אם ראש המטה, אללי אדמסו, לא ישובץ ברשימה. הרשימה פורסמה ב-6.9 — 35 שמות, ושמו אינו מופיע בהם.",
      en: "On 30 August 2026 N12 reported that activists in the Ethiopian-Israeli HQ of the Beyahad party were threatening to leave if its head, Alali Admasu, were not placed on the list. The list was published on 6 September — 35 names, and his is not among them.",
      am: "ነሐሴ 30፣ 2026 N12 የብያሐድ ፓርቲ የኢትዮጵያ ተወላጆች መምሪያ አባላት የመምሪያው ኃላፊ አላሊ አድማሱ በዝርዝሩ ካልተካተተ ለመልቀቅ እንደሚያስፈራሩ ዘግቧል። ዝርዝሩ መስከረም 6 ታትሟል — 35 ስሞች፣ የእሱ ግን የለበትም።",
    },
    bodies: {
      he: `## מה דווח

ב-**30.8.2026 בשעה 12:29** פרסם N12 דיווח שלפיו מטה יוצאי אתיופיה של מפלגת ביחד בראשות נפתלי בנט מאיים לעזוב את המפלגה, אם ראש המטה **אללי אדמסו** לא ישובץ ברשימת המועמדים לכנסת.

לפי הדיווח, הפעילים עבדו כשנה בהתנדבות למען המפלגה — עצרות, מפגשי בית, ובניית מאגר של כ-50,000 בני קהילה — ודרשו בתמורה ייצוג פוליטי.

אדמסו עצמו נמסר בדיווח כמי שכיהן כשגריר ישראל במדינות אפריקה, כחבר כנסת מטעם הליכוד וכיועץ לראש הממשלה. את סירוב המפלגה הוא כינה, לפי הדיווח, **"יריקה בפרצוף"**, ואמר:

> "אחרי כל מה שעשינו, המטרה היא לקדם אג'נדה. כל עוד אין ייצוג — אנחנו עוזבים".

מגורם המקורב למפלגה נמסר באותו דיווח שלא ניתן להבטיח לו מקום ריאלי ברשימה. מפלגתו של בנט לא הגיבה לכתבה.

## מה קרה מאז

הרשימה של ביחד פורסמה ב-**6.9.2026 בשעה 20:11**. עברנו על כל 35 השמות שבה, אחד-אחד. **השם אללי אדמסו אינו מופיע ברשימה**.

זו האמירה המדויקת שאפשר לעשות, והיא הגבול שלנו: השם לא נמצא ב-35 המקומות שפורסמו. אין בכך כדי לומר מה סוכם או לא סוכם בין הצדדים, אם המטה אכן עזב, או מה יקרה הלאה. ביקשנו הודעה עדכנית מהמפלגה או מהמטה ולא מצאנו כזו.

## למה זה בכתבה נפרדת

כי זו לא רק שאלה של שם אחד. זו התבנית שחזרה על עצמה בשלוש מפלגות לפחות בסבב הזה: פעילות קהילתית מאורגנת לקראת בחירות, בקשה למקום ברשימה, ותשובה שאינה מגיעה. תיעדנו את אותה תבנית גם [בליכוד](/he/news/likud-reserved-slots-kessim-letter-2026), ובכתבה הנפרדת שלנו על [מפת הייצוג המלאה](/he/news/community-representation-final-lists-knesset-26).

טדרוס מדווח על כך כעובדה פוליטית, ואינו מביע עמדה על מפלגה, על מועמד או על הטענות של מי מהצדדים.

## מה אפשר לעשות עם זה

אם ייצוג הקהילה ברשימות חשוב לכם כשיקול הצבעה — הרשימות המלאות מתפרסמות באתר ועדת הבחירות המרכזית, ואישורן הסופי נקבע ל-27.9.2026. אפשר לקרוא את השמות בעצמכם ולא להסתמך על כותרות, בדיוק כפי שעשינו כאן.

## מקורות

- [N12 — "מכה לבנט? יריקה בפרצוף. שוקלים לעזוב את המפלגה", ‏30.8.2026 12:29](https://www.mako.co.il/news-israel-elections/2026/Article-d07b3b4a76150a1027.htm) · נבדק 16.9.2026
- [כיפה — "בנט במקום הראשון, לפיד אחריו: הרשימה המלאה של מפלגת ביחד לבחירות", ‏6.9.2026 20:11](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231118-0/) · נבדק 16.9.2026`,
      en: `## What was reported

On **30 August 2026 at 12:29**, N12 published a report that the Ethiopian-Israeli HQ of the Beyahad party, led by Naftali Bennett, was threatening to leave the party if the head of the HQ, **Alali Admasu**, were not placed on its Knesset candidate list.

Per the report, the activists had worked for the party as volunteers for about a year — rallies, home gatherings, and building a database of some 50,000 community members — and demanded political representation in return.

Admasu is described in the report as a former Israeli ambassador to African states, a former Likud MK and an adviser to the prime minister. He called the party's refusal, per the report, **"a spit in the face"**, and said:

> "After everything we did, the aim is to advance an agenda. As long as there is no representation — we are leaving."

A source close to the party said in that same report that a realistic slot on the list could not be guaranteed to him. Bennett's party did not comment on the article.

## What happened since

Beyahad's list was published on **6 September 2026 at 20:11**. We went through all 35 names on it, one by one. **The name Alali Admasu does not appear on the list.**

That is the precise statement available, and it is our limit: the name is not among the 35 published slots. It says nothing about what was or was not agreed between the parties, whether the HQ in fact left, or what happens next. We looked for a more recent statement from the party or the HQ and found none.

## Why this is a separate article

Because it is not only a question of one name. It is a pattern that has repeated in at least three parties this cycle: organised community activity ahead of an election, a request for a slot, and an answer that does not come. We documented the same pattern [at Likud](/en/news/likud-reserved-slots-kessim-letter-2026), and in our separate piece on [the complete representation map](/en/news/community-representation-final-lists-knesset-26).

Tedros reports this as political fact, and takes no position on any party, any candidate, or the claims of either side.

## What you can do with this

If the community's representation on the lists matters to you as a voting consideration, the full lists are published on the Central Elections Committee's site, and final approval is set for 27 September 2026. You can read the names yourself rather than rely on headlines — exactly as we did here.

## Sources

- [N12 — "A blow to Bennett? A spit in the face. Considering leaving the party", 30 Aug 2026 12:29](https://www.mako.co.il/news-israel-elections/2026/Article-d07b3b4a76150a1027.htm) · verified 16 Sep 2026
- [Kipa — "Bennett first, Lapid after him: the full Beyahad list for the election", 6 Sep 2026 20:11](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231118-0/) · verified 16 Sep 2026`,
      am: `## ምን ተዘገበ

**ነሐሴ 30፣ 2026 በ12:29** N12 ዘገባ አሳተመ፤ በናፍታሊ ቤኔት የሚመራው የብያሐድ ፓርቲ የኢትዮጵያ ተወላጆች መምሪያ፣ የመምሪያው ኃላፊ **አላሊ አድማሱ** በዕጩዎች ዝርዝር ካልተካተተ ፓርቲውን ለመልቀቅ እንደሚያስፈራራ።

በዘገባው መሠረት አባላቱ ለአንድ ዓመት ያህል በበጎ ፈቃድ ለፓርቲው ሠርተዋል — ስብሰባዎች፣ የቤት ውይይቶች፣ እና የ50,000 ያህል የማህበረሰብ አባላት መረጃ ቋት መገንባት — በምላሹም የፖለቲካ ውክልና ጠይቀዋል።

አድማሱ በዘገባው በአፍሪካ አገራት የእስራኤል አምባሳደር፣ የቀድሞ የሊኩድ የኔሴት አባልና የጠቅላይ ሚኒስትር አማካሪ እንደነበረ ተገልጿል። የፓርቲውን እምቢታ **«በፊት ላይ መትፋት»** ብሎ ጠርቶታል፤ እንዲህም ብሏል፦

> «ካደረግነው ሁሉ በኋላ፣ ዓላማው አጀንዳ ማራመድ ነው። ውክልና እስከሌለ ድረስ — እንወጣለን።»

በዚያው ዘገባ ለፓርቲው ቅርብ የሆነ ምንጭ በዝርዝሩ ተጨባጭ ቦታ ሊረጋገጥለት እንደማይችል ተናግሯል። የቤኔት ፓርቲ ለጽሑፉ አስተያየት አልሰጠም።

## ከዚያ ወዲህ ምን ሆነ

የብያሐድ ዝርዝር **መስከረም 6፣ 2026 በ20:11** ታትሟል። በውስጡ ያሉትን 35 ስሞች በሙሉ አንድ በአንድ አልፈናል። **የአላሊ አድማሱ ስም በዝርዝሩ ውስጥ አይገኝም።**

ይህ ሊባል የሚችለው ትክክለኛ ነገር ነው፤ ወሰናችንም ይኸው ነው፦ ስሙ በታተሙት 35 ቦታዎች ውስጥ የለም። በወገኖቹ መካከል ምን እንደተስማማ ወይም እንዳልተስማማ፣ መምሪያው በእውነት መልቀቁን ወይም ቀጥሎ ምን እንደሚሆን አይናገርም። ከፓርቲው ወይም ከመምሪያው የቅርብ መግለጫ ፈልገን አላገኘንም።

## ለምን የተለየ ጽሑፍ ሆነ

ምክንያቱም የአንድ ስም ጥያቄ ብቻ አይደለም። በዚህ ዙር ቢያንስ በሦስት ፓርቲዎች የተደጋገመ ዘይቤ ነው፦ ከምርጫ በፊት የተደራጀ የማህበረሰብ እንቅስቃሴ፣ በዝርዝር ቦታ መጠየቅ፣ እና የማይመጣ መልስ። ተመሳሳዩን ዘይቤ [በሊኩድም](/am/news/likud-reserved-slots-kessim-letter-2026) እና በተለየ ጽሑፋችን [ሙሉ የውክልና ካርታ](/am/news/community-representation-final-lists-knesset-26) ላይ መዝግበናል።

ቴድሮስ ይህን እንደ ፖለቲካዊ እውነታ ይዘግባል፤ በየትኛውም ፓርቲ፣ ዕጩ ወይም የወገኖች ክስ ላይ አቋም አይገልጽም።

## በዚህ ምን ማድረግ ይቻላል

የማህበረሰቡ ውክልና ለምርጫ ውሳኔዎ አስፈላጊ ከሆነ፣ ሙሉ ዝርዝሮቹ በማዕከላዊ ምርጫ ኮሚቴ ድረ ገጽ ይታተማሉ፤ የመጨረሻ ማጽደቁም መስከረም 27፣ 2026 ተወስኗል። ርዕሶችን ከመመርኮዝ ይልቅ ስሞቹን ራስዎ ማንበብ ይችላሉ።

${AM_NOTICE}

## ምንጮች

- [N12 — «ለቤኔት ምት? በፊት ላይ መትፋት። ፓርቲውን ለመልቀቅ እያሰቡ ነው»፣ ነሐሴ 30፣ 2026 12:29](https://www.mako.co.il/news-israel-elections/2026/Article-d07b3b4a76150a1027.htm) · መስከረም 16፣ 2026 ተረጋግጧል
- [ኪፓ — «ቤኔት አንደኛ፣ ላፒድ ተከትሎ፦ የብያሐድ ፓርቲ ሙሉ ዝርዝር»፣ መስከረም 6፣ 2026 20:11](https://www.kipa.co.il/%d7%97%d7%93%d7%a9%d7%95%d7%aa/1231118-0/) · መስከረም 16፣ 2026 ተረጋግጧል`,
    },
  },

  // 3 — what the statute actually gives you on election day ------------------
  {
    slug: "election-day-shabbaton-what-the-law-says-2026",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    tags: ["rights", "civic"],
    title: {
      he: "27.10 הוא יום שבתון — מה החוק באמת אומר על השכר שלכם, ומה הוא לא אומר",
      en: "27 October is a statutory day of rest — what the law actually says about your pay, and what it does not",
      am: "ጥቅምት 27 የዕረፍት ቀን ነው — ሕጉ ስለ ደመወዝዎ በእውነት ምን ይላል፣ ምንስ አይልም",
    },
    excerpt: {
      he: 'קראנו את נוסח החוק עצמו. חוק-יסוד: הכנסת קובע שיום הבחירות הוא שבתון, אך שירותי תחבורה ושירותים ציבוריים פועלים כסדרם. סעיף 136 לחוק הבחירות מזכה בשכר עובד שעבד 14 ימים רצופים סמוך ליום הבחירות. את המספר "200%" לא מצאנו בחוק — והנה מה שכן כתוב.',
      en: 'We read the statutory text itself. Basic Law: The Knesset makes election day a day of rest, but transport and other public services operate as usual. Section 136 of the Elections Law entitles an employee who worked 14 consecutive days near election day to that day\'s pay. The figure "200%" is not in the statute — here is what is.',
      am: "የሕጉን ጽሑፍ ራሱን አንብበናል። መሠረታዊ ሕግ፦ ኔሴት የምርጫ ቀንን የዕረፍት ቀን ያደርገዋል፤ የትራንስፖርትና ሌሎች የሕዝብ አገልግሎቶች ግን እንደተለመደው ይሠራሉ። የምርጫ ሕግ አንቀጽ 136 ከምርጫ ቀን አጠገብ 14 ተከታታይ ቀናት የሠራን ሠራተኛ ለዚያ ቀን ደመወዝ ያስከብራል።",
    },
    bodies: {
      he: `## למה כתבנו את זה מנוסח החוק

לקראת כל מערכת בחירות מתפרסמים עשרות מדריכי "זכויות עובדים ביום הבחירות", רובם מאתרי שכר ומשרדי עורכי דין, ורובם מצטטים זה את זה. חלק מהמספרים שמופיעים בהם אינם בחוק אלא בפסיקה או בנוהג. לכן פתחנו את נוסח החוק עצמו וקראנו אותו. זה מה שכתוב שם.

## השבתון עצמו

**חוק-יסוד: הכנסת, סעיף 10** (נוסח מעודכן נכון ל-22.12.2025):

> "יום הבחירות יהיה יום שבתון, אך שירותי תחבורה ושאר שירותים ציבוריים יפעלו כסדרם".

זה כל הסעיף. שתי מסקנות ישירות ממנו:

- יום הבחירות, **27.10.2026**, הוא יום שבתון.
- מי שעובד בשירותי תחבורה או בשירותים ציבוריים אחרים — השבתון אינו חל עליו באותו אופן, כי החוק קובע במפורש שהשירותים האלה "יפעלו כסדרם".

## הזכות לשכר

**חוק הבחירות לכנסת [נוסח משולב], תשכ"ט-1969, סעיף 136 — "זכות לשכר ליום הבחירות"**:

> "עובד שעבד אצל מעסיק לפחות 14 ימים רצופים סמוך ליום הבחירות, וכן עובד שעבד בעבודות יזומות אצל אחד המוסדות הציבוריים לפחות 14 ימים מתוך החדשיים שלפני יום הבחירות, ישלם לו המעסיק את השכר שהעובד היה משתכר אצלו ביום הבחירות אילולא שבת".

מה זה אומר בפועל:

- התנאי הוא **14 ימים רצופים** אצל אותו מעסיק, סמוך ליום הבחירות. לא ותק של שנה, לא היקף משרה מסוים.
- מה שמשולם הוא **השכר שהייתם משתכרים באותו יום אילולא השבתון**. כלומר: מי שממילא לא היה עובד ב-27.10 אינו מרוויח יום נוסף מכוח הסעיף.
- לעובדי "עבודות יזומות" אצל מוסד ציבורי יש מסלול משלו: 14 ימים מתוך החודשיים שלפני.

## מה החוק לא אומר

**הסעיף אינו קובע תעריף למי שכן עובד ביום הבחירות.** המספר "200%" שמופיע במדריכי שכר רבים אינו כתוב בסעיף 136 ואינו כתוב בסעיף 10 לחוק-היסוד. הוא מיוחס לנוהג במשק ולפסיקה, ואנחנו לא פתחנו את פסקי הדין עצמם — ולכן לא נפרסם אותו כאן כמספר מחייב. אם אתם נדרשים לעבוד ב-27.10 ושואלים כמה מגיע לכם, זו שאלה למי שמייצג אתכם — ארגון עובדים, ועד, או עורך דין לדיני עבודה — ולא לכתבה.

זה בדיוק סוג המספר שאנחנו מעדיפים לא לפרסם מאשר לפרסם ולטעות בו. קוראים שנשלחים לדרוש סכום שגוי משלמים על זה, ואנחנו לא.

## שני סעיפים שכמעט אף אחד לא מכיר

בזמן שקראנו את החוק נתקלנו בשני סעיפים שרלוונטיים ישירות לקהילה ולעולים, ושכמעט לא מדברים עליהם:

**סעיף 134א — הסעת בוחרים.** הסעת בעלי זכות הצבעה מיישוב אחד למשנהו וחזרה לשם הצבעה **ממומנת מאוצר המדינה** באמצעות ועדת הבחירות המרכזית, בקווים ולמרחקים שהוועדה קובעת. זה לא שירות של מפלגה — זה מנגנון ממלכתי. מי שרשום בקלפי ביישוב אחר ממקום מגוריו בפועל צריך לבדוק מול הוועדה אם הקו שלו נכלל.

**סעיף 133 — מרכזי קליטה לעולים.** האולמות הציבוריים במרכזי קליטה שבהם נוהגים לכנס אסיפות יועמדו על ידי הממונים על המרכזים **לרשות כל הסיעות ורשימות המועמדים** לעריכת אסיפות בחירות; הממונים יקציבו לכל הרשימות מקום להדבקת מצעיהן; ובנוגע לחופש הכניסה ולחופש התעמולה, "דינם של מרכזי קליטה לעולים כדין שאר ישובים".

כלומר: מרכז קליטה אינו רשות של מנהל המרכז לעניין תעמולת בחירות. המקום שייך לכולם או לאף אחד — לא למפלגה אחת.

## קראו גם

- [מפת ייצוג הקהילה ברשימות לכנסת ה-26](/he/news/community-representation-final-lists-knesset-26)
- [לוח הזמנים של הבחירות](/he/news/knesset-26-elections-timetable-2026)
- [איתור הקלפי שלכם](/he/news/polling-station-lookup-amharic-2026)

## מקורות

- [חוק-יסוד: הכנסת, סעיף 10 — נוסח מעודכן נכון ל-22.12.2025](https://www.nevo.co.il/law_html/law01/190_001.htm) · נקרא במלואו 16.9.2026
- [חוק הבחירות לכנסת [נוסח משולב], תשכ"ט-1969, סעיפים 133, 134א, 136](https://www.nevo.co.il/law_html/law01/190_026.htm) · נקרא במלואו 16.9.2026
- [אתר החדשות דבר — מועד אישור הרשימות ומועד הבחירות, 8.9.2026](https://www.davar1.co.il/696375/) · נבדק 16.9.2026`,
      en: `## Why we wrote this from the statute

Ahead of every election, dozens of "workers' rights on election day" guides appear, mostly from payroll sites and law firms, mostly quoting each other. Some of the figures in them are not in the statute at all but in case law or in custom. So we opened the statutory text itself and read it. This is what it says.

## The day of rest itself

**Basic Law: The Knesset, section 10** (text current as of 22 December 2025):

> "Election day shall be a day of rest, but transport services and other public services shall operate as usual."

That is the whole section. Two direct conclusions:

- Election day, **27 October 2026**, is a statutory day of rest.
- Someone working in transport services or other public services is not covered in the same way, because the law expressly provides that those services "shall operate as usual".

## The right to pay

**Knesset Elections Law [Consolidated Version], 5729-1969, section 136 — "Right to wages for election day"**:

> "An employee who worked for an employer for at least 14 consecutive days close to election day, and likewise an employee who worked on initiated works at one of the public institutions for at least 14 days out of the two months preceding election day, shall be paid by the employer the wage the employee would have earned there on election day had it not been a day of rest."

What that means in practice:

- The condition is **14 consecutive days** with the same employer, close to election day. Not a year of seniority, not a particular contract size.
- What is paid is **the wage you would have earned that day but for the day of rest**. So someone who would not have been working on 27 October anyway does not gain an extra day from this section.
- Workers on "initiated works" at a public institution have their own track: 14 days out of the preceding two months.

## What the law does not say

**The section sets no rate for someone who does work on election day.** The "200%" figure that appears in many payroll guides is not written in section 136 and is not written in section 10 of the Basic Law. It is attributed to custom and case law, and we did not open the judgments themselves — so we will not publish it here as a binding number. If you are required to work on 27 October and want to know what you are owed, that is a question for whoever represents you — a union, a works committee, or an employment lawyer — not for an article.

This is exactly the kind of number we would rather withhold than get wrong. Readers sent to demand the wrong sum pay for it, and we do not.

## Two sections almost nobody knows

While reading the law we came across two sections directly relevant to this community and to olim, and almost never discussed:

**Section 134a — transporting voters.** Transporting people entitled to vote from one locality to another and back, for the purpose of voting, is **funded from the state treasury** through the Central Elections Committee, on routes and for distances the committee determines. This is not a party service — it is a state mechanism. Anyone registered at a polling station in a locality other than where they actually live should check with the committee whether their route is included.

**Section 133 — absorption centres.** The public halls in absorption centres where meetings are customarily held shall be made available by those in charge of the centres **to all factions and candidate lists** for election meetings; those in charge shall allot every list space to post its platform; and as regards freedom of entry and freedom of campaigning, "absorption centres shall be treated as any other locality".

In other words: for election-campaign purposes, an absorption centre is not the centre director's private domain. The space belongs to everyone or to nobody — not to one party.

## Read also

- [The map of community representation on the lists for the 26th Knesset](/en/news/community-representation-final-lists-knesset-26)
- [The election timetable](/en/news/knesset-26-elections-timetable-2026)
- [Finding your polling station](/en/news/polling-station-lookup-amharic-2026)

## Sources

- [Basic Law: The Knesset, section 10 — text current as of 22 Dec 2025](https://www.nevo.co.il/law_html/law01/190_001.htm) · read in full 16 Sep 2026
- [Knesset Elections Law [Consolidated Version], 5729-1969, sections 133, 134a, 136](https://www.nevo.co.il/law_html/law01/190_026.htm) · read in full 16 Sep 2026
- [Davar — list-approval date and election date, 8 Sep 2026](https://www.davar1.co.il/696375/) · verified 16 Sep 2026`,
      am: `## ይህን ከሕጉ ጽሑፍ ለምን ጻፍነው

ከእያንዳንዱ ምርጫ በፊት በደርዘን የሚቆጠሩ «በምርጫ ቀን የሠራተኞች መብት» መመሪያዎች ይወጣሉ፤ አብዛኞቹም እርስ በርስ ይጠቃቀሳሉ። በውስጣቸው ያሉ አንዳንድ ቁጥሮች በሕጉ ውስጥ ሳይሆኑ በፍርድ ወይም በልማድ ውስጥ ናቸው። ስለዚህ የሕጉን ጽሑፍ ራሱን ከፍተን አነበብነው።

## የዕረፍት ቀኑ ራሱ

**መሠረታዊ ሕግ፦ ኔሴት፣ አንቀጽ 10** (እስከ ታኅሣሥ 22፣ 2025 የተዘመነ ጽሑፍ)፦

> «የምርጫ ቀን የዕረፍት ቀን ይሆናል፤ የትራንስፖርት አገልግሎቶችና ሌሎች የሕዝብ አገልግሎቶች ግን እንደተለመደው ይሠራሉ።»

አንቀጹ በሙሉ ይኸው ነው። ሁለት ቀጥተኛ መደምደሚያዎች፦

- የምርጫ ቀን፣ **ጥቅምት 27፣ 2026**፣ የዕረፍት ቀን ነው።
- በትራንስፖርት ወይም በሌሎች የሕዝብ አገልግሎቶች የሚሠራ ሰው በተመሳሳይ መንገድ አይሸፈንም፤ ሕጉ እነዚያ አገልግሎቶች «እንደተለመደው ይሠራሉ» ብሎ በግልጽ ስለሚደነግግ።

## የደመወዝ መብት

**የኔሴት ምርጫ ሕግ [የተዋሐደ ጽሑፍ]፣ 5729-1969፣ አንቀጽ 136 — «ለምርጫ ቀን የደመወዝ መብት»**፦

> «ከምርጫ ቀን አጠገብ ቢያንስ 14 ተከታታይ ቀናት ለአንድ አሠሪ የሠራ ሠራተኛ፣ እንዲሁም ከምርጫ ቀን በፊት ባሉት ሁለት ወራት ውስጥ ቢያንስ 14 ቀናት በአንዱ የሕዝብ ተቋም በተጀመሩ ሥራዎች የሠራ ሠራተኛ፣ የዕረፍት ቀን ባይሆን ኖሮ በዚያ ቀን ያገኘው የነበረውን ደመወዝ አሠሪው ይክፈለው።»

በተግባር ምን ማለት ነው፦

- ሁኔታው ከአንድ አሠሪ ጋር **14 ተከታታይ ቀናት** ነው። የአንድ ዓመት አገልግሎት አይደለም።
- የሚከፈለው **የዕረፍት ቀኑ ባይሆን ኖሮ በዚያ ቀን ያገኙት የነበረው ደመወዝ** ነው።
- በሕዝብ ተቋም «በተጀመሩ ሥራዎች» ለሚሠሩ የራሱ መንገድ አለ፦ ካለፉት ሁለት ወራት 14 ቀናት።

## ሕጉ የማይለው

**አንቀጹ በምርጫ ቀን ለሚሠራ ሰው ተመን አይወስንም።** በብዙ የደመወዝ መመሪያዎች የሚታየው «200%» በአንቀጽ 136 ውስጥም ሆነ በመሠረታዊ ሕጉ አንቀጽ 10 ውስጥ አልተጻፈም። ለልማድና ለፍርድ የተሰጠ ነው፤ እኛም ፍርዶቹን ራሳቸውን አልከፈትንም — ስለዚህ እዚህ እንደ አስገዳጅ ቁጥር አናሳትመውም። ጥቅምት 27 እንዲሠሩ ከተጠየቁና ስንት እንደሚገባዎ ማወቅ ከፈለጉ፣ ይህ ለሚወክልዎ አካል — የሠራተኞች ማኅበር፣ የሠራተኛ ኮሚቴ ወይም የሠራተኛ ሕግ ጠበቃ — የሚቀርብ ጥያቄ ነው።

## ጥቂት ሰዎች የሚያውቁት ሁለት አንቀጽ

**አንቀጽ 134ሀ — መራጮችን ማጓጓዝ።** የመምረጥ መብት ያላቸውን ሰዎች ለመምረጥ ከአንድ ሰፈር ወደ ሌላ ማጓጓዝና መመለስ በማዕከላዊ ምርጫ ኮሚቴ በኩል **ከመንግሥት ግምጃ ቤት ይሸፈናል**። ይህ የፓርቲ አገልግሎት አይደለም — የመንግሥት ዘዴ ነው።

**አንቀጽ 133 — የስደተኞች መቀበያ ማዕከላት።** ስብሰባዎች በሚደረግባቸው የመቀበያ ማዕከላት የሕዝብ አዳራሾች በኃላፊዎቹ **ለሁሉም ቡድኖችና የዕጩዎች ዝርዝሮች** ለምርጫ ስብሰባ ይሰጣሉ፤ ለሁሉም ዝርዝሮችም መርሃ ግብራቸውን የሚለጥፉበት ቦታ ይመደባል፤ ስለ መግቢያ ነጻነትና የቅስቀሳ ነጻነትም «የመቀበያ ማዕከላት እንደ ሌሎቹ ሰፈሮች ይቆጠራሉ»።

## ተጨማሪ ያንብቡ

- [ለ26ኛው ኔሴት የማህበረሰቡ ውክልና ካርታ](/am/news/community-representation-final-lists-knesset-26)
- [የምርጫ የጊዜ ሰሌዳ](/am/news/knesset-26-elections-timetable-2026)
- [የምርጫ ጣቢያዎን መፈለግ](/am/news/polling-station-lookup-amharic-2026)

${AM_NOTICE}

## ምንጮች

- [መሠረታዊ ሕግ፦ ኔሴት፣ አንቀጽ 10 — እስከ ታኅሣሥ 22፣ 2025 የተዘመነ](https://www.nevo.co.il/law_html/law01/190_001.htm) · መስከረም 16፣ 2026 በሙሉ ተነቧል
- [የኔሴት ምርጫ ሕግ [የተዋሐደ ጽሑፍ]፣ 5729-1969፣ አንቀጽ 133፣ 134ሀ፣ 136](https://www.nevo.co.il/law_html/law01/190_026.htm) · መስከረም 16፣ 2026 በሙሉ ተነቧል
- [ዳቫር — የዝርዝር ማጽደቂያና የምርጫ ቀን፣ መስከረም 8፣ 2026](https://www.davar1.co.il/696375/) · መስከረም 16፣ 2026 ተረጋግጧል`,
    },
  },
];
