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

  // 4 — Tishrei 5787 clinic hours -------------------------------------------
  {
    slug: "tishrei-5787-clinic-hours-yom-kippur-sukkot",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    tags: ["health", "holiday"],
    title: {
      he: "יום כיפור ב-21.9 וסוכות מ-26.9: מתי המרפאה סגורה, ולמי מתקשרים במקום",
      en: "Yom Kippur on 21.9 and Sukkot from 26.9: when the clinic is shut, and whom to call instead",
      am: "ዮም ኪፑር መስከረም 21 እና ሱኮት ከመስከረም 26፦ ክሊኒኩ መቼ ይዘጋል፣ በምትኩስ ለማን ይደውሉ",
    },
    excerpt: {
      he: "ערב יום כיפור, 20.9, המרפאות נסגרות בצהריים; ב-21.9 הן סגורות. בחול המועד סוכות הן פועלות שעות מקוצרות. פתחנו את לוח החגים שפרסמה לאומית, בדקנו שהתאריכים מתיישבים עם הלוח העברי, וריכזנו מה לעשות אם צריך רופא בכל זאת.",
      en: "On the eve of Yom Kippur, 20 September, clinics close at midday; on 21 September they are shut. During the intermediate days of Sukkot they run shortened hours. We opened the holiday timetable Leumit published, checked the dates against the Hebrew calendar, and set out what to do if you need a doctor anyway.",
      am: "በዮም ኪፑር ዋዜማ መስከረም 20 ክሊኒኮች እኩለ ቀን ይዘጋሉ፤ መስከረም 21 ዝግ ናቸው። በሱኮት መካከለኛ ቀናት በአጭር ሰዓት ይሠራሉ። ሌኡሚት ያሳተመውን የበዓል የጊዜ ሰሌዳ ከፍተን ቀኖቹን ከዕብራይስጥ ቀን መቁጠሪያ ጋር አረጋግጠናል።",
    },
    bodies: {
      he: `## למה זו כתבה ולא תזכורת

חגי תשרי מרוכזים השנה בשלושה שבועות, ובתוכם יום שבו כל מערכת הבריאות הקהילתית סגורה. מי שמנהל מחלה כרונית, מחכה לתרופה או מטפל בהורה מבוגר צריך לדעת את זה מראש ולא ביום עצמו. לכן בדקנו תאריכים, ולא רק ציטטנו הודעה.

## מה בדקנו, ואיך

פתחנו את עמוד שעות הפעילות בחגי תשרי של **לאומית שירותי בריאות** וקראנו אותו במלואו. העמוד עצמו אינו נושא תאריך פרסום — וזו בעיה מוכרת בעמודי חגים, שנשארים באוויר משנה לשנה. לכן לא הסתפקנו בו: הצלבנו כל תאריך מול הלוח העברי.

| מועד | התאריך בעמוד | מה זה בלוח העברי | מתיישב? |
| --- | --- | --- | --- |
| ראש השנה | 11-13.9.2026 | א' בתשרי תשפ"ז חל ב-12.9.2026 | כן |
| יום כיפור | 20-21.9.2026 | י' בתשרי חל ב-21.9.2026 | כן |
| סוכות | 25.9-3.10.2026 | ט"ו בתשרי חל ב-26.9.2026 | כן |
| שמחת תורה | 3.10.2026 | כ"ב בתשרי חל ב-3.10.2026 | כן |

ארבעה מתוך ארבעה. זה עמוד של תשפ"ז, לא שריד משנה שעברה.

## מה שכתוב שם

לפי אותו עמוד, במרכזים הרפואיים של לאומית:

- **ערב יום כיפור, 20.9** — פתוח עד השעה 12:00.
- **יום כיפור, 21.9** — סגור.
- **ערב סוכות, 25.9** — פתוח עד 12:00.
- **יום א' של סוכות, 26.9** — סגור.
- **חול המועד סוכות, 27.9-1.10** — פתוח עד 13:00.
- **ערב שמחת תורה, 2.10** — פתוח עד 12:00.
- **שמחת תורה, 3.10** — סגור.

בנוגע למעבדות, העמוד מציין שבערב יום כיפור יתקבלו **פניות דחופות בלבד ובתיאום מראש**.

מספר שירות הלקוחות שמופיע באותו עמוד: **507\\***.

העמוד גם מפנה לשלושה נותני שירות חיצוניים לרפואה דחופה — טרם, ביקור רופא ואסיא — ומבקש במפורש לוודא מולם שעות לפני שמגיעים.

## ההסתייגות החשובה

זה לוח של **קופה אחת**. אם אתם בכללית, במכבי או במאוחדת — השעות אצלכם שונות, וגם המספרים שונים. המסר שמועבר כאן הוא הדפוס, לא השעה המדויקת: ערב חג עד הצהריים, חג סגור, חול המועד מקוצר.

**מה לעשות בפועל:** היכנסו לאתר הקופה שלכם או התקשרו למוקד שלה **לפני** ערב החג, בדקו מתי הסניף שלכם סגור, ואם אתם על תרופת מרשם קבועה — חדשו אותה השבוע, לא ביום חמישי אחר הצהריים.

במצב חירום רפואי מתקשרים ל-**101** (מד"א), בכל שעה ובכל חג.

## קראו גם

- [שירותי הבריאות — מי נותן מה ואיך ניגשים](/he/health/services)
- [זכויות בריאות](/he/health/rights)

## מקורות

- [לאומית שירותי בריאות — שעות הפעילות בחגי תשרי](https://leumit.co.il/leumit-general/hours-rosh-hashana/) · לעמוד אין תאריך פרסום; התאריכים שבו הוצלבו מול הלוח העברי · נבדק 16.9.2026
- מועדי החגים הוצלבו מול חישוב הלוח העברי לתשפ"ז — י' בתשרי תשפ"ז = 21.9.2026, ט"ו בתשרי = 26.9.2026`,
      en: `## Why this is an article and not a reminder

The Tishrei holidays are packed into three weeks this year, and inside them is a day on which the entire community health system is closed. Anyone managing a chronic illness, waiting on a medication or caring for an elderly parent needs to know that in advance, not on the day. So we checked dates rather than merely quoting a notice.

## What we checked, and how

We opened the Tishrei opening-hours page of **Leumit Health Services** and read it in full. The page itself carries no publication date — a familiar problem with holiday pages, which tend to linger from year to year. So we did not stop there: we cross-checked every date against the Hebrew calendar.

| Occasion | Date on the page | In the Hebrew calendar | Consistent? |
| --- | --- | --- | --- |
| Rosh Hashanah | 11-13 Sep 2026 | 1 Tishrei 5787 falls on 12 Sep 2026 | Yes |
| Yom Kippur | 20-21 Sep 2026 | 10 Tishrei falls on 21 Sep 2026 | Yes |
| Sukkot | 25 Sep - 3 Oct 2026 | 15 Tishrei falls on 26 Sep 2026 | Yes |
| Simchat Torah | 3 Oct 2026 | 22 Tishrei falls on 3 Oct 2026 | Yes |

Four out of four. This is a 5787 page, not a leftover from last year.

## What it says

Per that page, at Leumit's medical centres:

- **Eve of Yom Kippur, 20 Sep** — open until 12:00.
- **Yom Kippur, 21 Sep** — closed.
- **Eve of Sukkot, 25 Sep** — open until 12:00.
- **First day of Sukkot, 26 Sep** — closed.
- **Intermediate days of Sukkot, 27 Sep - 1 Oct** — open until 13:00.
- **Eve of Shemini Atzeret, 2 Oct** — open until 12:00.
- **Simchat Torah, 3 Oct** — closed.

For laboratories, the page states that on the eve of Yom Kippur **only urgent requests, by prior arrangement**, will be accepted.

The customer-service number given on that page: **\\*507**.

The page also points to three external urgent-care providers — Terem, Bikur Rofe and Assia — and expressly asks readers to confirm their hours before setting out.

## The important caveat

This is **one HMO's** timetable. If you are with Clalit, Maccabi or Meuhedet, your hours differ and so do the numbers. What carries over is the pattern, not the exact hour: holiday eve until midday, holiday closed, intermediate days shortened.

**What to actually do:** go to your own HMO's site or call its hotline **before** the holiday eve, check when your branch is shut, and if you are on a regular prescription, renew it this week rather than on Thursday afternoon.

In a medical emergency, call **101** (Magen David Adom), at any hour and on any holiday.

## Read also

- [Health services — who provides what and how to access it](/en/health/services)
- [Health rights](/en/health/rights)

## Sources

- [Leumit Health Services — Tishrei holiday opening hours](https://leumit.co.il/leumit-general/hours-rosh-hashana/) · the page carries no publication date; its dates were cross-checked against the Hebrew calendar · verified 16 Sep 2026
- Holiday dates cross-checked against the Hebrew calendar for 5787 — 10 Tishrei 5787 = 21 Sep 2026, 15 Tishrei = 26 Sep 2026`,
      am: `## ይህ ለምን ጽሑፍ ሆነ

የትሽሬ በዓላት በዚህ ዓመት በሦስት ሳምንት ውስጥ ተጠቃለዋል፤ በውስጣቸውም መላው የማህበረሰብ ጤና ሥርዓት የሚዘጋበት ቀን አለ። ሥር የሰደደ በሽታ የሚያስተዳድር፣ መድኃኒት የሚጠብቅ ወይም አረጋዊ ወላጅ የሚንከባከብ ሰው ይህን አስቀድሞ ማወቅ አለበት።

## ምን አረጋገጥን፣ እንዴትም

የ**ሌኡሚት የጤና አገልግሎቶች** የትሽሬ በዓላት የሥራ ሰዓት ገጽ ከፍተን በሙሉ አነበብነው። ገጹ ራሱ የታተመበት ቀን የለውም። ስለዚህ እዚያ አላቆምንም፦ እያንዳንዱን ቀን ከዕብራይስጥ ቀን መቁጠሪያ ጋር አገናዝበናል።

| በዓል | በገጹ ላይ ያለው ቀን | በዕብራይስጥ ቀን መቁጠሪያ | ይስማማል? |
| --- | --- | --- | --- |
| ሮሽ ሃሻና | መስከረም 11-13፣ 2026 | 1 ትሽሬ 5787 መስከረም 12፣ 2026 | አዎ |
| ዮም ኪፑር | መስከረም 20-21፣ 2026 | 10 ትሽሬ መስከረም 21፣ 2026 | አዎ |
| ሱኮት | መስከረም 25 - ጥቅምት 3፣ 2026 | 15 ትሽሬ መስከረም 26፣ 2026 | አዎ |
| ስምሓት ቶራ | ጥቅምት 3፣ 2026 | 22 ትሽሬ ጥቅምት 3፣ 2026 | አዎ |

ከአራት አራቱ። ይህ የ5787 ገጽ ነው እንጂ ካለፈው ዓመት የቀረ አይደለም።

## በገጹ ላይ የተጻፈው

በሌኡሚት የሕክምና ማዕከላት፦

- **የዮም ኪፑር ዋዜማ፣ መስከረም 20** — እስከ 12:00 ክፍት።
- **ዮም ኪፑር፣ መስከረም 21** — ዝግ።
- **የሱኮት ዋዜማ፣ መስከረም 25** — እስከ 12:00 ክፍት።
- **የሱኮት የመጀመሪያ ቀን፣ መስከረም 26** — ዝግ።
- **የሱኮት መካከለኛ ቀናት፣ መስከረም 27 - ጥቅምት 1** — እስከ 13:00 ክፍት።
- **የሽሚኒ አጼሬት ዋዜማ፣ ጥቅምት 2** — እስከ 12:00 ክፍት።
- **ስምሓት ቶራ፣ ጥቅምት 3** — ዝግ።

ስለ ላቦራቶሪዎች ገጹ በዮም ኪፑር ዋዜማ **አስቸኳይ ጥያቄዎች ብቻ፣ አስቀድሞ በመስማማት** እንደሚቀበሉ ይገልጻል።

በዚያው ገጽ ላይ ያለው የደንበኞች አገልግሎት ቁጥር፦ **507\\***።

ገጹ ለአስቸኳይ ሕክምና ሦስት ውጫዊ አቅራቢዎችንም ይጠቁማል — ቴሬም፣ ቢኩር ሮፌና አስያ — ከመሄድ በፊት ሰዓታቸውን እንዲያረጋግጡ በግልጽ ይጠይቃል።

## አስፈላጊው ጥንቃቄ

ይህ የ**አንድ ኩባንያ** የጊዜ ሰሌዳ ነው። በክላሊት፣ በማካቢ ወይም በመኡሔደት ከሆኑ ሰዓታቱም ቁጥሮቹም ይለያያሉ። የሚሸጋገረው ዘይቤው ነው እንጂ ትክክለኛው ሰዓት አይደለም፦ የበዓል ዋዜማ እስከ እኩለ ቀን፣ በዓል ዝግ፣ መካከለኛ ቀናት አጭር።

**በተግባር ምን ያድርጉ፦** ከበዓሉ ዋዜማ **በፊት** ወደ ኩባንያዎ ድረ ገጽ ይግቡ ወይም ወደ መስመሩ ይደውሉ፤ ቅርንጫፍዎ መቼ እንደሚዘጋ ያረጋግጡ፤ መደበኛ የሐኪም ትዕዛዝ መድኃኒት ላይ ከሆኑም በዚህ ሳምንት ያድሱት።

በሕክምና አስቸኳይ ሁኔታ በማንኛውም ሰዓትና በማንኛውም በዓል **101** (ማገን ዳቪድ አዶም) ይደውሉ።

## ተጨማሪ ያንብቡ

- [የጤና አገልግሎቶች](/am/health/services)
- [የጤና መብቶች](/am/health/rights)

${AM_NOTICE}

## ምንጮች

- [ሌኡሚት የጤና አገልግሎቶች — የትሽሬ በዓላት የሥራ ሰዓት](https://leumit.co.il/leumit-general/hours-rosh-hashana/) · ገጹ የታተመበት ቀን የለውም፤ ቀኖቹ ከዕብራይስጥ ቀን መቁጠሪያ ጋር ተገናዝበዋል · መስከረም 16፣ 2026 ተረጋግጧል
- የበዓል ቀናት ለ5787 ከዕብራይስጥ ቀን መቁጠሪያ ጋር ተገናዝበዋል — 10 ትሽሬ 5787 = መስከረም 21፣ 2026`,
    },
  },

  // 5 — the Sigd season opens with nothing published yet ---------------------
  {
    slug: "sigd-5787-no-published-events-yet-2026",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    tags: ["holiday", "community"],
    title: {
      he: 'פחות מחודשיים לסיגד תשפ"ז, ואף אירוע לא פורסם — מה זה אומר למי שמתכנן',
      en: "Under two months to Sigd 5787 and not one event has been published — what that means if you are planning",
      am: "ለሰግድ 5787 ከሁለት ወር ያነሰ ቀርቷል፣ አንድም ዝግጅት ግን አልታተመም — ለሚያቅዱ ምን ማለት ነው",
    },
    excerpt: {
      he: 'סיגד תשפ"ז חל ב-9.11.2026. בדקנו היום את שני העמודים שמפרסמים בדרך כלל את הטקס — המרכז למורשת יהדות אתיופיה והקרן למורשת הכותל — ושניהם עדיין מציגים את אירוע תשפ"ו מנובמבר 2025. אל תזמינו הסעה או חופשה לפי לוח של שנה שעברה.',
      en: "Sigd 5787 falls on 9 November 2026. We checked today the two pages that normally publish the ceremony — the Ethiopian Jewry Heritage Center and the Western Wall Heritage Foundation — and both still show the 5786 event from November 2025. Do not book travel or leave off last year's schedule.",
      am: "ሰግድ 5787 ኅዳር 9፣ 2026 ይውላል። ዛሬ ስነ-ስርዓቱን የሚያሳትሙትን ሁለቱን ገጾች አረጋግጠናል — የኢትዮጵያ አይሁድ ቅርስ ማዕከልና የምዕራብ ግንብ ቅርስ ፋውንዴሽን — ሁለቱም አሁንም የኅዳር 2025ን የ5786 ዝግጅት ያሳያሉ።",
    },
    bodies: {
      he: `## התאריך, קודם כול

**סיגד תשפ"ז חל ביום שני, 9 בנובמבר 2026.** התאריך הזה מבוסס על כ"ט בחשוון תשפ"ז, ועל כך כתבנו בנפרד ובהרחבה, כולל תיקון של תאריך שגוי שהופיע אצלנו בעבר: [סיגד תשפ"ז יחול ביום שני, 9 בנובמבר 2026](/he/news/sigd-5787-monday-9-november-2026).

מהיום ועד החג נותרו פחות מחודשיים.

## מה בדקנו היום

פתחנו וקראנו את שני העמודים שמפרסמים בפועל, שנה אחר שנה, את פרטי הטקס:

**המרכז למורשת יהדות אתיופיה — עמוד חג הסגד.** האירוע המופיע בו הוא עדיין **אירוע תשפ"ו, מ-20 בנובמבר 2025**, על מיקומו ושעותיו. לא מופיע בעמוד אירוע לתשפ"ז, ולא מופיע בו תאריך עדכון.

**הקרן למורשת הכותל המערבי — עמוד חג הסיגד.** העמוד מסביר את החג ומציין שהוא חל בכ"ט בחשוון, 50 יום אחרי יום כיפור, אך **אינו נוקב בתאריך ל-2026** ואינו מכריז על אירוע. הפריט האחרון שמופיע בו קשור לסיגד תשפ"ו, בנובמבר 2025.

כלומר: נכון ל-16.9.2026, **אין אירוע סיגד תשפ"ז שפורסם** באף אחד משני המקורות האלה.

## מה זה אומר, ומה זה לא אומר

**מה שזה לא אומר:** שלא יהיה טקס. הטקס המרכזי מתקיים מדי שנה, והפרטים מתפרסמים בדרך כלל סמוך יותר לחג.

**מה שזה כן אומר:** שכל לוח זמנים לסיגד 2026 שאתם רואים עכשיו איפשהו — שעות, מקום, סדר יום — הוא או ניחוש, או העתקה של אירוע 2025. אנחנו לא מפרסמים לוח זמנים שאיננו יכולים לפתוח במקור, ואנחנו ממליצים לכם לא להסתמך על אחד כזה.

זו לא זהירות תיאורטית. בעבר התפרסמו באתר הזה פרטי לוגיסטיקה לסיגד שלא נמצא להם שום מקור, והם הוסרו. לא נחזור על זה.

## מה כן לעשות עכשיו

1. **סמנו את התאריך** — יום שני, 9.11.2026.
2. **אם אתם עובדי מדינה** — זכרו שיש לכם ימי בחירה בשכר, ואין צורך לוותר על יום חופש. הפירוט בכתבה שלנו על התאריך.
3. **אם אתם מתכננים נסיעה או לינה** — חכו לפרסום הרשמי לפני שאתם משלמים על משהו שתלוי בשעה מדויקת.
4. **עקבו אחרי הגופים המארגנים עצמם**, ולא אחרי עמודים שמעתיקים מהם.

אנחנו נעדכן את [דף אירועי הסיגד 2026](/he/heritage/sigd/events-2026) ברגע שיפורסם אירוע עם מקור שאפשר לפתוח.

## קראו גם

- [מדריך הסיגד](/he/heritage/sigd)
- [סיגד — דף המורשת](/he/heritage/events/sigd)
- [תפריט הסיגד — הצום והשבירה](/he/culinary/sigd-menu)
- [אירועי סיגד 2026](/he/heritage/sigd/events-2026)

## מקורות

- [המרכז למורשת יהדות אתיופיה — חג הסגד](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · האירוע המוצג הוא מ-20.11.2025; אין תאריך עדכון בעמוד · נבדק 16.9.2026
- [הקרן למורשת הכותל המערבי — חג הסיגד](https://thekotel.org/en/uncategorized-en/holidays-and-festivals/sigd-holiday/) · הפריט האחרון בעמוד מנובמבר 2025 · נבדק 16.9.2026
- [הכתבה שלנו על תאריך סיגד תשפ"ז](/he/news/sigd-5787-monday-9-november-2026)`,
      en: `## The date, first

**Sigd 5787 falls on Monday, 9 November 2026.** That date rests on 29 Cheshvan 5787, and we wrote about it separately and at length, including a correction of a wrong date that once appeared here: [Sigd 5787 falls on Monday, 9 November 2026](/en/news/sigd-5787-monday-9-november-2026).

From today, less than two months remain.

## What we checked today

We opened and read the two pages that actually publish the ceremony details, year after year:

**The Ethiopian Jewry Heritage Center — Sigd page.** The event shown on it is still the **5786 event, from 20 November 2025**, with its location and hours. No 5787 event appears on the page, and no update date appears either.

**The Western Wall Heritage Foundation — Sigd page.** The page explains the holiday and notes that it falls on 29 Cheshvan, 50 days after Yom Kippur, but **gives no date for 2026** and announces no event. The most recent item on it relates to Sigd 5786, in November 2025.

In other words: as of 16 September 2026, **no Sigd 5787 event has been published** by either of these sources.

## What that means, and what it does not

**What it does not mean:** that there will be no ceremony. The main ceremony is held every year, and the details are usually published closer to the holiday.

**What it does mean:** that any Sigd 2026 schedule you see anywhere right now — times, place, running order — is either a guess or a copy of the 2025 event. A schedule we cannot open at source never reaches this site, and we advise you not to rely on one either.

This is not theoretical caution. Sigd logistics for which no source could be found were once published on this site, and they were removed. We are not doing it again.

## What to do now

1. **Mark the date** — Monday, 9 November 2026.
2. **If you are a state employee**, remember you have paid choice days and do not need to give up a vacation day. The detail is in our article on the date.
3. **If you are planning travel or a stay**, wait for the official publication before paying for anything that depends on an exact hour.
4. **Follow the organising bodies themselves**, not pages that copy from them.

We will update [the Sigd 2026 events page](/en/heritage/sigd/events-2026) the moment an event is published with a source that can be opened.

## Read also

- [The Sigd guide](/en/heritage/sigd)
- [Sigd — the heritage page](/en/heritage/events/sigd)
- [The Sigd menu — the fast and the break-fast](/en/culinary/sigd-menu)
- [Sigd 2026 events](/en/heritage/sigd/events-2026)

## Sources

- [Ethiopian Jewry Heritage Center — the Sigd holiday](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · the event shown is from 20 Nov 2025; no update date on the page · verified 16 Sep 2026
- [Western Wall Heritage Foundation — the Sigd holiday](https://thekotel.org/en/uncategorized-en/holidays-and-festivals/sigd-holiday/) · the most recent item on the page is from November 2025 · verified 16 Sep 2026
- [Our article on the date of Sigd 5787](/en/news/sigd-5787-monday-9-november-2026)`,
      am: `## በመጀመሪያ ቀኑ

**ሰግድ 5787 ሰኞ፣ ኅዳር 9፣ 2026 ይውላል።** ይህ ቀን በ29 ኅሽዋን 5787 ላይ የተመሠረተ ነው፤ ስለዚህም በተለየ ጽሑፍ በሰፊው ጽፈናል፦ [ሰግድ 5787 ሰኞ፣ ኅዳር 9፣ 2026 ይውላል](/am/news/sigd-5787-monday-9-november-2026)።

ከዛሬ ጀምሮ ከሁለት ወር ያነሰ ቀርቷል።

## ዛሬ ምን አረጋገጥን

የስነ-ስርዓቱን ዝርዝር በየዓመቱ የሚያሳትሙትን ሁለቱን ገጾች ከፍተን አነበብን፦

**የኢትዮጵያ አይሁድ ቅርስ ማዕከል — የሰግድ ገጽ።** በላዩ ላይ የሚታየው ዝግጅት አሁንም **የ5786 ዝግጅት፣ ከኅዳር 20፣ 2025** ነው። የ5787 ዝግጅት በገጹ ላይ አይታይም፤ የዘመነበትም ቀን የለም።

**የምዕራብ ግንብ ቅርስ ፋውንዴሽን — የሰግድ ገጽ።** ገጹ በዓሉን ያብራራል፤ በ29 ኅሽዋን፣ ከዮም ኪፑር 50 ቀናት በኋላ እንደሚውል ይገልጻል፤ ነገር ግን **ለ2026 ቀን አይሰጥም** ዝግጅትም አያስታውቅም። በላዩ ላይ ያለው የቅርብ ጊዜ ጽሑፍ የኅዳር 2025 ነው።

ማለትም፦ እስከ መስከረም 16፣ 2026 ድረስ በእነዚህ ሁለት ምንጮች **የታተመ የሰግድ 5787 ዝግጅት የለም**።

## ምን ማለት ነው፣ ምንስ ማለት አይደለም

**ማለት የማይሆነው፦** ስነ-ስርዓት አይኖርም ማለት አይደለም። ዋናው ስነ-ስርዓት በየዓመቱ ይካሄዳል፤ ዝርዝሮቹም ብዙውን ጊዜ ወደ በዓሉ ሲቀርብ ይታተማሉ።

**ማለት የሆነው፦** አሁን የሚያዩት ማንኛውም የ2026 የሰግድ የጊዜ ሰሌዳ — ሰዓት፣ ቦታ፣ መርሃ ግብር — ወይ ግምት ነው ወይም የ2025 ዝግጅት ቅጂ ነው። ከምንጭ ልንከፍተው የማንችለውን የጊዜ ሰሌዳ አናሳትምም፤ እርስዎም እንዳይመኩበት እንመክራለን።

ይህ የንድፈ ሐሳብ ጥንቃቄ አይደለም። ምንም ምንጭ ያልተገኘላቸው የሰግድ ዝርዝሮች ቀደም ሲል በዚህ ጣቢያ ታትመው ነበር፤ ተወግደዋልም። ድጋሚ አናደርገውም።

## አሁን ምን ያድርጉ

1. **ቀኑን ይመዝግቡ** — ሰኞ፣ ኅዳር 9፣ 2026።
2. **የመንግሥት ሠራተኛ ከሆኑ**፣ የተከፈለባቸው የምርጫ ቀናት እንዳሉዎት ያስታውሱ።
3. **ጉዞ ወይም ማረፊያ እያቀዱ ከሆነ**፣ ይፋዊው ህትመት እስኪወጣ ይጠብቁ።
4. **አዘጋጅ አካላትን ራሳቸውን ይከታተሉ**፣ ከእነሱ የሚገለብጡ ገጾችን ሳይሆን።

ሊከፈት የሚችል ምንጭ ያለው ዝግጅት እንደታተመ [የሰግድ 2026 ዝግጅቶች ገጽ](/am/heritage/sigd/events-2026) እናዘምናለን።

## ተጨማሪ ያንብቡ

- [የሰግድ መመሪያ](/am/heritage/sigd)
- [ሰግድ — የቅርስ ገጽ](/am/heritage/events/sigd)
- [የሰግድ ማዕድ](/am/culinary/sigd-menu)
- [የሰግድ 2026 ዝግጅቶች](/am/heritage/sigd/events-2026)

${AM_NOTICE}

## ምንጮች

- [የኢትዮጵያ አይሁድ ቅርስ ማዕከል — የሰግድ በዓል](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · የሚታየው ዝግጅት ከኅዳር 20፣ 2025 ነው · መስከረም 16፣ 2026 ተረጋግጧል
- [የምዕራብ ግንብ ቅርስ ፋውንዴሽን — የሰግድ በዓል](https://thekotel.org/en/uncategorized-en/holidays-and-festivals/sigd-holiday/) · በገጹ ላይ ያለው የቅርብ ጽሑፍ ከኅዳር 2025 ነው · መስከረም 16፣ 2026 ተረጋግጧል
- [ስለ ሰግድ 5787 ቀን የእኛ ጽሑፍ](/am/news/sigd-5787-monday-9-november-2026)`,
    },
  },

  // 6 — what Tech-Career's course page actually shows ------------------------
  {
    slug: "tech-career-course-page-september-2026",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    tags: ["employment", "education"],
    title: {
      he: "טק-קריירה: שני הקורסים שמפורסמים באתר כבר נפתחו — כך נרשמים למחזור הבא",
      en: "Tech-Career: both courses listed on the site have already started — how to get into the next cohort",
      am: "ቴክ-ካሪየር፦ በጣቢያው የተዘረዘሩት ሁለቱም ኮርሶች ጀምረዋል — ወደ ቀጣዩ ዙር እንዴት እንደሚገቡ",
    },
    excerpt: {
      he: "פתחנו את עמוד ההכשרות של טק-קריירה וקראנו אותו במלואו. מופיעים בו שני קורסים בלוד, בתאריכי פתיחה 30.8.2026 ו-14.9.2026 — שניהם כבר עברו. אין באתר מועד פתיחה עתידי מפורסם, ולכן זו לא כתבה על דדליין אלא על מה כן אפשר לעשות השבוע.",
      en: "We opened Tech-Career's training page and read it in full. It lists two courses in Lod, with start dates of 30 August 2026 and 14 September 2026 — both already past. No future start date is published on the site, so this is not a deadline piece but a piece on what you can actually do this week.",
      am: "የቴክ-ካሪየርን የሥልጠና ገጽ ከፍተን በሙሉ አነበብነው። በሎድ ሁለት ኮርሶች ተዘርዝረዋል፤ የመጀመሪያ ቀናቸው ነሐሴ 30፣ 2026 እና መስከረም 14፣ 2026 — ሁለቱም አልፈዋል። በጣቢያው የታተመ የወደፊት መጀመሪያ ቀን የለም።",
    },
    bodies: {
      he: `## מה יש בעמוד, מילה במילה

טק-קריירה היא עמותה שמכשירה צעירות וצעירים יוצאי אתיופיה למקצועות ההייטק, ולפי הכתוב באתרה היא פועלת 22 שנה. פתחנו את עמוד ההכשרות שלה וקראנו אותו במלואו. אלה שני הקורסים המופיעים בו:

| קורס | מיקום | מתכונת | משך | תאריך פתיחה |
| --- | --- | --- | --- | --- |
| Cyber-Network Analyst (תקשורת + אבטחה) | לוד | היברידי/פנימייה | 6 חודשים | 14 בספטמבר 2026 |
| Cloud-Network Engineer (סיסקו + ענן) | לוד | היברידי/פנימייה | 6 חודשים | 30 באוגוסט 2026 |

בשני הקורסים כתוב שניתן לשלב עבודה תוך כדי הלימודים.

## ולמה זו כתבה

כי שני התאריכים האלה **כבר עברו**. העמוד מזמין את הקורא "להתרשם מסוגי ההכשרות שייפתחו בשנה הקרובה" — כלומר מציג את סוגי ההכשרות, לא בהכרח מחזור שנפתח מחר. **לא מופיע בעמוד מועד פתיחה עתידי, ולא מופיע בו דדליין הרשמה.**

ראינו במקום אחר אזכור של מחזור שאמור להיפתח ב-20.10.2026. בדקנו — התאריך הזה **אינו מופיע** באתר של טק-קריירה עצמה. לכן לא נפרסם אותו כאן כעובדה. זה בדיוק המקום שבו קורא מפספס דדליין אמיתי כי סמך על תאריך שמישהו העתיק.

## מה כן לעשות השבוע

אם אתם רוצים להיכנס למחזור הבא:

1. **פנו ישירות לעמותה** דרך עמוד יצירת הקשר באתרה, ושאלו מתי נפתח המחזור הבא ומתי נסגרת ההרשמה אליו. זו השאלה שכדאי לשאול, ובדיוק במילים האלה.
2. **הירשמו לניוזלטר** שבתחתית אתר העמותה — זה הערוץ שבו הם עצמם מודיעים על פעילויות.
3. **בינתיים התכוננו למיון.** תהליכי המיון לתוכניות הכשרה מסוג זה בוחנים התאמה ולא רק רקע טכני, והעמוד עצמו מדגיש שהמודל מבוסס על מחויבות מלאה ללימודים.

## ההסתייגות שלנו

זו תמונת מצב של עמוד אחד ביום אחד — **16.9.2026**. עמודי הכשרות מתעדכנים, ויכול להיות שמחר יופיע שם מחזור חדש עם תאריך. אל תסיקו מכאן שאין מחזור; הסיקו מכאן שצריך לשאול, ולא להניח.

## קראו גם

- [מסלולי קריירה](/he/careers)
- [איך מתחילים קריירה בהייטק](/he/careers/faq/how-to-start-tech-career-ethiopian)
- [בוטקמפים ותוכניות השמה](/he/careers/programs/itworks-israel)

## מקורות

- [טק-קריירה — עמוד ההכשרות](https://www.tech-career.org/items) · נקרא במלואו · נבדק 16.9.2026
- [טק-קריירה — עמוד הבית](https://www.tech-career.org/) · נבדק 16.9.2026`,
      en: `## What the page says, word for word

Tech-Career is a non-profit that trains young Ethiopian-Israelis for hi-tech roles, and per its own site it has been operating for 22 years. We opened its training page and read it in full. These are the two courses on it:

| Course | Location | Format | Length | Start date |
| --- | --- | --- | --- | --- |
| Cyber-Network Analyst (networking + security) | Lod | Hybrid / residential | 6 months | 14 September 2026 |
| Cloud-Network Engineer (Cisco + cloud) | Lod | Hybrid / residential | 6 months | 30 August 2026 |

Both courses state that students can combine work with study.

## And why this is an article

Because both of those dates have **already passed**. The page invites the reader to "get a sense of the kinds of training that will open in the coming year" — that is, it shows the types of training, not necessarily a cohort opening tomorrow. **No future start date appears on the page, and no registration deadline appears either.**

We saw a reference elsewhere to a cohort said to open on 20 October 2026. We checked — that date **does not appear** on Tech-Career's own site. So we will not publish it here as fact. This is precisely where a reader misses a real deadline because they relied on a date somebody copied.

## What to actually do this week

If you want to get into the next cohort:

1. **Contact the organisation directly** through the contact page on its site, and ask when the next cohort opens and when registration for it closes. That is the question worth asking, in those words.
2. **Sign up for the newsletter** at the foot of the organisation's site — that is the channel through which they themselves announce activities.
3. **Prepare for selection in the meantime.** Selection for training programmes of this kind tests fit and not only technical background, and the page itself stresses that the model rests on full commitment to study.

## Our caveat

This is a snapshot of one page on one day — **16 September 2026**. Training pages get updated, and a new cohort with a date may appear there tomorrow. Do not conclude from this that there is no cohort; conclude that you should ask rather than assume.

## Read also

- [Career tracks](/en/careers)
- [How to start a career in hi-tech](/en/careers/faq/how-to-start-tech-career-ethiopian)
- [Bootcamps and placement programmes](/en/careers/programs/itworks-israel)

## Sources

- [Tech-Career — training page](https://www.tech-career.org/items) · read in full · verified 16 Sep 2026
- [Tech-Career — home page](https://www.tech-career.org/) · verified 16 Sep 2026`,
      am: `## በገጹ ላይ ያለው፣ ቃል በቃል

ቴክ-ካሪየር የኢትዮጵያ ተወላጅ ወጣቶችን ለሃይቴክ ሙያዎች የሚያሠለጥን ድርጅት ነው፤ በራሱ ጣቢያ መሠረት ለ22 ዓመታት ሲሠራ ቆይቷል። የሥልጠና ገጹን ከፍተን በሙሉ አነበብነው። በውስጡ ያሉት ሁለት ኮርሶች እነዚህ ናቸው፦

| ኮርስ | ቦታ | ዓይነት | ርዝመት | የመጀመሪያ ቀን |
| --- | --- | --- | --- | --- |
| Cyber-Network Analyst | ሎድ | ድብልቅ / አዳሪ | 6 ወር | መስከረም 14፣ 2026 |
| Cloud-Network Engineer | ሎድ | ድብልቅ / አዳሪ | 6 ወር | ነሐሴ 30፣ 2026 |

ሁለቱም ኮርሶች ከትምህርት ጎን ለጎን መሥራት እንደሚቻል ይገልጻሉ።

## ይህ ለምን ጽሑፍ ሆነ

ሁለቱም ቀናት **አልፈዋል** ስለዚህ። ገጹ አንባቢውን «በሚመጣው ዓመት የሚከፈቱትን የሥልጠና ዓይነቶች ይመልከቱ» ይላል — ማለትም የሥልጠና ዓይነቶችን ያሳያል እንጂ ነገ የሚከፈት ዙር አይደለም። **በገጹ ላይ የወደፊት የመጀመሪያ ቀንም ሆነ የምዝገባ ገደብ አይታይም።**

በሌላ ቦታ ጥቅምት 20፣ 2026 ይከፈታል የተባለ ዙር ተጠቅሶ አይተናል። አረጋግጠናል — ያ ቀን በቴክ-ካሪየር ጣቢያ ራሱ ላይ **አይገኝም**። ስለዚህ እዚህ እንደ እውነታ አናሳትመውም።

## በዚህ ሳምንት ምን ያድርጉ

1. **በቀጥታ ወደ ድርጅቱ ይደውሉ** በጣቢያው የመገናኛ ገጽ በኩል፤ ቀጣዩ ዙር መቼ እንደሚከፈትና ምዝገባው መቼ እንደሚዘጋ ይጠይቁ።
2. **ለዜና መጽሔቱ ይመዝገቡ** በድርጅቱ ጣቢያ ግርጌ — እነሱ ራሳቸው እንቅስቃሴዎቻቸውን የሚያስታውቁበት መንገድ ነው።
3. **በዚህ መካከል ለምርጫ ይዘጋጁ።** ገጹ ራሱ ሞዴሉ በሙሉ የትምህርት ቁርጠኝነት ላይ እንደተመሠረተ ያሰምርበታል።

## የእኛ ጥንቃቄ

ይህ የአንድ ገጽ የአንድ ቀን ምስል ነው — **መስከረም 16፣ 2026**። የሥልጠና ገጾች ይዘመናሉ። ዙር የለም ብለው አይደምድሙ፤ መገመት ሳይሆን መጠየቅ እንደሚያስፈልግ ይደምድሙ።

## ተጨማሪ ያንብቡ

- [የሙያ መንገዶች](/am/careers)
- [በሃይቴክ ሙያ እንዴት እንደሚጀምሩ](/am/careers/faq/how-to-start-tech-career-ethiopian)
- [ቡትካምፖችና የምደባ ፕሮግራሞች](/am/careers/programs/itworks-israel)

${AM_NOTICE}

## ምንጮች

- [ቴክ-ካሪየር — የሥልጠና ገጽ](https://www.tech-career.org/items) · በሙሉ ተነቧል · መስከረም 16፣ 2026 ተረጋግጧል
- [ቴክ-ካሪየር — መነሻ ገጽ](https://www.tech-career.org/) · መስከረም 16፣ 2026 ተረጋግጧል`,
    },
  },
];
