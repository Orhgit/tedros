// Wave 11a articles — civic / policy / elections / immigration (TED-162).
//
// Same discipline as wave 10: every item below rests on a primary source that
// was opened and read in full, not on a search-result snippet, and the
// publication date of each source was checked before it was used.
//
// Two candidates were opened and DROPPED for exactly that reason:
//   * ynet "המדינה לבג\"ץ: ההחלטה לאפשר את המשך העלייה מאתיופיה ניתנה כדין"
//     (ynet.co.il/news/article/hyjwxeqg9) — turned out to be from 28.2.2022.
//   * gov.il "שאלות ותשובות לציבור הבוחרים" (gov.il/he/pages/vote_qna) — still
//     describes the 2023 MUNICIPAL elections (register cut-off 14.9.2023,
//     call-centre hours since superseded). Not used; the Knesset-26 pages
//     (knesset-elections-2026, time--table-26, candidates-lists-26) were used
//     instead.
//
// gov.il HTML 403s automated fetches; every gov.il page cited here was read
// through the r.jina.ai text proxy.
//
// Political material is reported as fact. Tedros takes no position.
import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE11A: NewsArticleEntry[] = [
  {
    slug: "voter-register-in-force-address-deadline-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["civic", "policy"],
    title: {
      he: "פנקס הבוחרים נכנס לתוקף — המועד לשינוי כתובת חלף. מה עדיין אפשר לעשות",
      en: "The voter register is now in force — the address-change deadline has passed. What you can still do",
      am: "የመራጮች መዝገብ ሥራ ላይ ዋለ — አድራሻ የመቀየሪያው ቀነ ገደብ አልፏል። አሁንም ማድረግ የሚችሉት",
    },
    excerpt: {
      he: "המועד האחרון לעדכון כתובת לצורך פנקס הבוחרים לכנסת ה-26 היה 3.9.2026, והפנקס נכנס לתוקף ב-6.9.2026. אם עברת דירה אחרי המועד — עדיין יש לך זכות הצבעה, אך היא תהיה בקלפי הרשומה בכתובת הישנה. כך בודקים איפה נרשמת.",
      en: "The last day to update your address for the 26th Knesset voter register was 3 September 2026, and the register came into force on 6 September 2026. If you moved after that date you can still vote — but at the polling station tied to your old address. Here is how to check where you are registered.",
      am: "ለ26ኛው ኔሴት የመራጮች መዝገብ አድራሻ ለማዘመን የመጨረሻው ቀን መስከረም 3 ቀን 2026 ነበር፤ መዝገቡም መስከረም 6 ቀን 2026 ሥራ ላይ ዋለ። ከዚያ ቀን በኋላ ከተዛወሩ አሁንም መምረጥ ይችላሉ — ነገር ግን በአሮጌው አድራሻዎ በተመዘገበው ምርጫ ጣቢያ ነው። የት እንደተመዘገቡ እንዴት እንደሚያረጋግጡ ይኸውና።",
    },
    bodies: {
      he: `## מה קרה

הבחירות לכנסת ה-26 ייערכו ביום שלישי, ט"ז בחשוון תשפ"ז, **27 באוקטובר 2026**. כדי שההצבעה תתבצע בקלפי הקרובה לבית, הכתובת שלך צריכה להיות מעודכנת במרשם האוכלוסין לפני שנגזר פנקס הבוחרים.

לפי הודעת משרד הפנים, שדווחה ב-ynet ב-29.7.2026, **המועד האחרון לעדכון כתובת לצורך פנקס הבוחרים היה 3 בספטמבר 2026** — כל שינוי שאושר ברשות האוכלוסין וההגירה עד לאותו יום נכלל בפנקס.

בלוח הזמנים הרשמי של ועדת הבחירות המרכזית מופיע השלב הבא: **כניסת פנקס הבוחרים לתוקף ב-6.9.2026** (סעיף 26(ד) לחוק הבחירות לכנסת).

כלומר — נכון להיום, הפנקס סגור ובתוקף.

## מה זה אומר בפועל

- **זכות ההצבעה שלך לא נפגעה.** אם אתה אזרח ישראלי, רשום במרשם האוכלוסין, ויום הולדתך ה-18 חל לא יאוחר מיום הבחירות — אתה בפנקס.
- **מה שנקבע זה המקום.** אם עברת דירה אחרי 3.9.2026, הקלפי שלך תישאר זו שמשויכת לכתובת הקודמת. תצטרך להגיע לשם ביום הבחירות.
- **שינוי כתובת עכשיו עדיין כדאי** לכל שאר הצרכים (דואר, ארנונה, רישום לגן ולבית ספר) — הוא פשוט לא ישנה את הקלפי בבחירות האלה. הבקשה מוגשת ללא עלות דרך [רשות האוכלוסין וההגירה](https://www.gov.il/he/service/changing_address).

## איפה אתה רשום — בדיקה בעברית או באמהרית

משרד הפנים מפעיל מוקד ארצי לבדיקת היכללות בפנקס הבוחרים ומקום ההצבעה:

- **טלפון: 1-800-101975 או 073-2458358.** המוקד נותן מידע גם בשירות עצמי וגם במענה אנושי, בימים א'–ה' בין 08:30 ל-21:00 וביום ו' בין 08:30 ל-13:00.
- **SMS או WhatsApp: 053-3801464**, שירות עצמי, 24 שעות ביממה.

לפי ועדת הבחירות המרכזית, **המענה במוקד ניתן בעברית, ערבית, רוסית, אמהרית ואנגלית**. אם נוח לך יותר לברר את הפרטים באמהרית — בקש זאת בתחילת השיחה.

שים לב: המידע על מיקומי הקלפיות שהתפרסם עד 6.9.2026 היה ראשוני בלבד. המידע הסופי מתפרסם החל מ-7.9.2026, ופרסום רשמי של מקומות הקלפי נקבע בחוק ליום 20.10.2026.

## אם אתה חושב שנגרעת מהפנקס

לחוק יש מסלול לכך, והוא נסגר בקרוב — פירטנו אותו בכתבה נפרדת: [11.9.2026 הוא המועד האחרון לעתור על אי-הכללה בפנקס הבוחרים](/he/news/voter-register-petition-deadline-2026).

## מקורות

- [ועדת הבחירות המרכזית / משרד הפנים — "בחירות לכנסת ה-26", gov.il, עודכן 7.9.2026](https://www.gov.il/he/pages/knesset-elections-2026)
- [ועדת הבחירות המרכזית — לוח זמנים לפעילות הוועדה, gov.il](https://www.gov.il/he/pages/time--table-26)
- [ynet, ‏29.7.2026 — "לקראת הבחירות: משרד הפנים עדכן את ערוצי השירות לבדיקת פנקס הבוחרים ומקום ההצבעה"](https://www.ynet.co.il/news/article/skwlitpbzg)
- [רשות האוכלוסין וההגירה — בקשה לשינוי כתובת (ללא עלות)](https://www.gov.il/he/service/changing_address)`,
      en: `## What happened

The election for the 26th Knesset will be held on Tuesday, **27 October 2026**. To vote at the polling station nearest your home, your address must be up to date in the population registry before the voter register is drawn.

Per the Interior Ministry announcement reported by ynet on 29 July 2026, **the last day to update your address for the voter register was 3 September 2026** — any change approved by the Population and Immigration Authority by that day is in the register.

The Central Elections Committee's statutory timetable sets the next step: **the voter register came into force on 6 September 2026** (section 26(d) of the Knesset Elections Law).

In other words, as of today the register is closed and in force.

## What this means in practice

- **Your right to vote is not affected.** If you are an Israeli citizen, registered in the population registry, and turn 18 no later than election day, you are in the register.
- **What is fixed is the place.** If you moved after 3 September 2026, your polling station remains the one tied to your previous address. You will need to go there on election day.
- **Changing your address now is still worth doing** for everything else (mail, municipal tax, school and kindergarten registration) — it simply will not change your polling station for this election. The request is free, via the [Population and Immigration Authority](https://www.gov.il/en/service/changing_address).

## Where you are registered — checking in Hebrew or Amharic

The Interior Ministry runs a national line for checking your inclusion in the register and your polling place:

- **Phone: 1-800-101975 or 073-2458358.** Both self-service and a human answer, Sunday–Thursday 08:30–21:00 and Friday 08:30–13:00.
- **SMS or WhatsApp: 053-3801464**, self-service, 24 hours a day.

Per the Central Elections Committee, **the line answers in Hebrew, Arabic, Russian, Amharic and English**. If Amharic is easier for you, ask for it at the start of the call.

Note: polling-station locations published before 6 September 2026 were preliminary. Final information is published from 7 September 2026, and the statutory publication of polling places is set for 20 October 2026.

## If you think you were left out of the register

The law provides a route, and it closes shortly — we covered it separately: [11 September 2026 is the last day to petition over exclusion from the voter register](/en/news/voter-register-petition-deadline-2026).

## Sources

- [Central Elections Committee / Interior Ministry — "Elections to the 26th Knesset", gov.il, updated 7 Sept 2026](https://www.gov.il/he/pages/knesset-elections-2026)
- [Central Elections Committee — statutory activity timetable, gov.il](https://www.gov.il/he/pages/time--table-26)
- [ynet, 29 July 2026 — "Ahead of the elections: the Interior Ministry updated its service channels for checking the voter register and polling place"](https://www.ynet.co.il/news/article/skwlitpbzg)
- [Population and Immigration Authority — free address-change request](https://www.gov.il/he/service/changing_address)`,
      am: `## ምን ተከሰተ

የ26ኛው ኔሴት ምርጫ ማክሰኞ **ጥቅምት 27 ቀን 2026** ይካሄዳል። ወደ ቤትዎ በቅርብ ባለው ምርጫ ጣቢያ ለመምረጥ፣ የመራጮች መዝገብ ከመዘጋጀቱ በፊት አድራሻዎ በሕዝብ መዝገብ ውስጥ የተዘመነ መሆን አለበት።

ynet ሐምሌ 29 ቀን 2026 እንደዘገበው የውስጥ ጉዳይ ሚኒስቴር ማስታወቂያ መሠረት፣ **ለመራጮች መዝገብ አድራሻ ለማዘመን የመጨረሻው ቀን መስከረም 3 ቀን 2026 ነበር** — እስከዚያ ቀን በሕዝብና ኢሚግሬሽን ባለሥልጣን የጸደቀ ማንኛውም ለውጥ በመዝገቡ ውስጥ ገብቷል።

የማዕከላዊ ምርጫ ኮሚቴ ሕጋዊ የጊዜ ሰሌዳ ቀጣዩን ደረጃ ያስቀምጣል፦ **የመራጮች መዝገብ መስከረም 6 ቀን 2026 ሥራ ላይ ዋለ** (የኔሴት ምርጫ ሕግ አንቀጽ 26(መ))።

በሌላ አነጋገር፣ ዛሬ መዝገቡ ተዘግቷል እና ሥራ ላይ ውሏል።

## በተግባር ምን ማለት ነው

- **የመምረጥ መብትዎ አልተነካም።** የእስራኤል ዜጋ ከሆኑ፣ በሕዝብ መዝገብ ከተመዘገቡ እና ከምርጫው ቀን ባልዘገየ 18 ዓመት የሚሞላዎት ከሆነ፣ በመዝገቡ ውስጥ ነዎት።
- **የተወሰነው ቦታው ነው።** ከመስከረም 3 ቀን 2026 በኋላ ከተዛወሩ፣ የምርጫ ጣቢያዎ ከቀድሞ አድራሻዎ ጋር የተያያዘው ሆኖ ይቀራል። በምርጫው ቀን ወደዚያ መሄድ ይኖርብዎታል።
- **አሁን አድራሻ መቀየር አሁንም ጠቃሚ ነው** ለሌሎች ሁሉ ነገሮች (ፖስታ፣ የማዘጋጃ ቤት ግብር፣ የመዋዕለ ሕፃናትና የትምህርት ቤት ምዝገባ) — ለዚህ ምርጫ የምርጫ ጣቢያዎን ብቻ አይቀይርም። ጥያቄው ያለክፍያ በ[ሕዝብና ኢሚግሬሽን ባለሥልጣን](https://www.gov.il/he/service/changing_address) በኩል ይቀርባል።

## የት እንደተመዘገቡ — በዕብራይስጥ ወይም በአማርኛ ማረጋገጥ

የውስጥ ጉዳይ ሚኒስቴር በመዝገቡ ውስጥ መካተትዎንና የምርጫ ቦታዎን ለማረጋገጥ ብሔራዊ መስመር ያንቀሳቅሳል፦

- **ስልክ፦ 1-800-101975 ወይም 073-2458358።** በራስ-አገልግሎትም በሰው ምላሽም፣ እሁድ–ሐሙስ 08:30–21:00 እና ዓርብ 08:30–13:00።
- **SMS ወይም WhatsApp፦ 053-3801464**፣ በራስ-አገልግሎት፣ በቀን 24 ሰዓት።

በማዕከላዊ ምርጫ ኮሚቴ መሠረት፣ **መስመሩ በዕብራይስጥ፣ በአረብኛ፣ በሩስያኛ፣ በአማርኛ እና በእንግሊዝኛ ምላሽ ይሰጣል**። አማርኛ ለእርስዎ የቀለለ ከሆነ በጥሪው መጀመሪያ ላይ ይጠይቁ።

ማስታወሻ፦ ከመስከረም 6 ቀን 2026 በፊት የታተመው የምርጫ ጣቢያ መረጃ የመጀመሪያ ደረጃ ብቻ ነበር። የመጨረሻው መረጃ ከመስከረም 7 ቀን 2026 ጀምሮ ይታተማል፤ ሕጋዊው የምርጫ ቦታዎች ማስታወቂያ ደግሞ ለጥቅምት 20 ቀን 2026 ተወስኗል።

## ከመዝገቡ ተትተዋል ብለው ካሰቡ

ሕጉ መንገድ አለው፣ ብዙም ሳይቆይ ይዘጋል — በተለየ ዘገባ አቅርበናል፦ [መስከረም 11 ቀን 2026 ከመራጮች መዝገብ ስለመተው አቤቱታ ለማቅረብ የመጨረሻው ቀን ነው](/am/news/voter-register-petition-deadline-2026)።

## ምንጮች

- [ማዕከላዊ ምርጫ ኮሚቴ / የውስጥ ጉዳይ ሚኒስቴር — «ለ26ኛው ኔሴት ምርጫ»፣ gov.il፣ መስከረም 7 ቀን 2026 ተዘምኗል](https://www.gov.il/he/pages/knesset-elections-2026)
- [ማዕከላዊ ምርጫ ኮሚቴ — ሕጋዊ የእንቅስቃሴ የጊዜ ሰሌዳ፣ gov.il](https://www.gov.il/he/pages/time--table-26)
- [ynet፣ ሐምሌ 29 ቀን 2026](https://www.ynet.co.il/news/article/skwlitpbzg)
- [ሕዝብና ኢሚግሬሽን ባለሥልጣን — ያለክፍያ የአድራሻ ለውጥ ጥያቄ](https://www.gov.il/he/service/changing_address)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "polling-station-lookup-amharic-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["civic", "rights"],
    title: {
      he: "מידע סופי על מקום ההצבעה מתפרסם החל מ-7.9 — ואפשר לברר אותו באמהרית",
      en: "Final polling-place information is published from 7 September — and you can check it in Amharic",
      am: "የመጨረሻው የምርጫ ቦታ መረጃ ከመስከረም 7 ጀምሮ ይታተማል — በአማርኛም ማጣራት ይችላሉ",
    },
    excerpt: {
      he: "עד עכשיו המידע על מיקומי הקלפיות היה ראשוני. ועדת הבחירות המרכזית קובעת שהמידע הסופי מתפרסם החל מ-7.9.2026. המוקד הארצי של משרד הפנים נותן מענה אנושי בעברית, ערבית, רוסית, אמהרית ואנגלית — כך משתמשים בו.",
      en: "Until now, polling-station information was preliminary. The Central Elections Committee states that final information is published from 7 September 2026. The Interior Ministry's national line answers in Hebrew, Arabic, Russian, Amharic and English — here is how to use it.",
      am: "እስካሁን የምርጫ ጣቢያ መረጃ የመጀመሪያ ደረጃ ነበር። ማዕከላዊ ምርጫ ኮሚቴ የመጨረሻው መረጃ ከመስከረም 7 ቀን 2026 ጀምሮ እንደሚታተም ይገልጻል። የውስጥ ጉዳይ ሚኒስቴር ብሔራዊ መስመር በዕብራይስጥ፣ በአረብኛ፣ በሩስያኛ፣ በአማርኛ እና በእንግሊዝኛ ምላሽ ይሰጣል — እንዴት እንደሚጠቀሙበት ይኸውና።",
    },
    bodies: {
      he: `## מה השתנה השבוע

בעמוד הרשמי של ועדת הבחירות המרכזית לבחירות לכנסת ה-26 מופיעה הערה מפורשת:

> "המידע לגבי מיקומי הקלפיות בשלב זה הינו ראשוני. מידע סופי יפורסם החל מיום 7.9.2026."

כלומר, אם בדקת את מקום ההצבעה שלך לפני התאריך הזה — כדאי לבדוק שוב.

צריך להבחין בין שני דברים:

- **המידע הסופי מתפרסם החל מ-7.9.2026** — זה מה שהמוקד ומערכות המשרד מציגים מעכשיו.
- **הפרסום הרשמי של מקומות הקלפי** קבוע בלוח הזמנים של הוועדה, לפי סעיף 68(ד) לחוק, ליום **20.10.2026** — שבוע לפני הבחירות.
- **ההודעה לבוחר** נשלחת לפי סעיף 55ב ביום **6.10.2026**.

ההודעה לבוחר נוחה, אבל היא לא תנאי להצבעה. אין חובה להגיע איתה לקלפי.

## איך בודקים — כולל באמהרית

משרד הפנים מפעיל מוקד ארצי לבדיקת היכללות בפנקס הבוחרים ומקום ההצבעה:

| ערוץ | פרטים | שעות |
| --- | --- | --- |
| טלפון | **1-800-101975** או **073-2458358** | א'–ה' 08:30–21:00; ו' 08:30–13:00 |
| SMS / WhatsApp | **053-3801464** | 24 שעות ביממה, שירות עצמי |

לפי ועדת הבחירות המרכזית, המוקד מספק מידע **גם בשירות עצמי וגם במענה אנושי**, ו**המענה יינתן במגוון שפות: עברית, ערבית, רוסית, אמהרית ואנגלית**.

זו נקודה שכדאי לדעת ולהעביר הלאה — במיוחד להורים ולסבים שנוח להם יותר לברר פרטים בירוקרטיים באמהרית מאשר בעברית. בקשת מענה באמהרית נעשית בתחילת השיחה.

לקראת יום הבחירות המוקד מרחיב שעות: בין **19.10.2026 ל-26.10.2026** הוא פעיל עד 23:00, וב-**27.10.2026, יום הבחירות**, הוא פעיל מ-06:30 עד 22:30.

## מה כדאי לבדוק עכשיו

1. שאתה מופיע בפנקס הבוחרים.
2. באיזו קלפי ובאיזו כתובת אתה רשום — במיוחד אם עברת דירה בשנה האחרונה.
3. שהמסמך המזהה שבידך מתאים. חשוב לדעת ש**ספח תעודת הזהות לבדו אינו מסמך מזהה**.

אם הבדיקה מעלה שאינך מופיע בפנקס, יש מסלול משפטי — והוא נסגר ב-11.9.2026. ראו [המועד האחרון לעתור על אי-הכללה בפנקס הבוחרים](/he/news/voter-register-petition-deadline-2026).

## מקורות

- [ועדת הבחירות המרכזית — "בחירות לכנסת ה-26", gov.il, עודכן 7.9.2026](https://www.gov.il/he/pages/knesset-elections-2026)
- [ועדת הבחירות המרכזית — לוח זמנים לפעילות הוועדה, gov.il](https://www.gov.il/he/pages/time--table-26)
- [ynet, ‏29.7.2026 — הודעת משרד הפנים על ערוצי השירות](https://www.ynet.co.il/news/article/skwlitpbzg)`,
      en: `## What changed this week

The Central Elections Committee's official page for the 26th Knesset elections carries an explicit note:

> "Information on polling-station locations is at this stage preliminary. Final information will be published from 7.9.2026."

So if you checked your polling place before that date, check again.

Three things should be kept apart:

- **Final information is published from 7 September 2026** — this is what the call centre and the ministry's systems now show.
- **The statutory publication of polling places** is set in the committee's timetable, under section 68(d) of the law, for **20 October 2026** — a week before the election.
- **The voter notification** is mailed under section 55b on **6 October 2026**.

The voter notification is convenient, but it is not a condition for voting. You are not required to bring it to the polling station.

## How to check — including in Amharic

The Interior Ministry runs a national line for checking your inclusion in the register and your polling place:

| Channel | Details | Hours |
| --- | --- | --- |
| Phone | **1-800-101975** or **073-2458358** | Sun–Thu 08:30–21:00; Fri 08:30–13:00 |
| SMS / WhatsApp | **053-3801464** | 24 hours a day, self-service |

Per the Central Elections Committee, the line provides information **both by self-service and with a human answer**, and **the answer is given in a range of languages: Hebrew, Arabic, Russian, Amharic and English**.

That is worth knowing and worth passing on — especially to parents and grandparents who find it easier to handle a bureaucratic question in Amharic than in Hebrew. Ask for Amharic at the start of the call.

Approaching election day the line extends its hours: between **19 and 26 October 2026** it operates until 23:00, and on **27 October 2026, election day**, from 06:30 to 22:30.

## What to check now

1. That you appear in the voter register.
2. Which polling station and which address you are registered at — especially if you moved in the past year.
3. That the ID document you hold is suitable. Note that **the ID card's detachable appendix alone is not an identifying document**.

If the check shows you are not in the register, there is a legal route — and it closes on 11 September 2026. See [the last day to petition over exclusion from the voter register](/en/news/voter-register-petition-deadline-2026).

## Sources

- [Central Elections Committee — "Elections to the 26th Knesset", gov.il, updated 7 Sept 2026](https://www.gov.il/he/pages/knesset-elections-2026)
- [Central Elections Committee — statutory activity timetable, gov.il](https://www.gov.il/he/pages/time--table-26)
- [ynet, 29 July 2026 — Interior Ministry statement on service channels](https://www.ynet.co.il/news/article/skwlitpbzg)`,
      am: `## በዚህ ሳምንት ምን ተለወጠ

ለ26ኛው ኔሴት ምርጫ የማዕከላዊ ምርጫ ኮሚቴ ኦፊሴላዊ ገጽ ግልጽ ማስታወሻ ይዟል፦

> «በዚህ ደረጃ ስለ ምርጫ ጣቢያዎች አካባቢ ያለው መረጃ የመጀመሪያ ደረጃ ነው። የመጨረሻው መረጃ ከመስከረም 7 ቀን 2026 ጀምሮ ይታተማል።»

ስለዚህ ከዚያ ቀን በፊት የምርጫ ቦታዎን ካረጋገጡ፣ እንደገና ያረጋግጡ።

ሦስት ነገሮች መለያየት አለባቸው፦

- **የመጨረሻው መረጃ ከመስከረም 7 ቀን 2026 ጀምሮ ይታተማል** — አሁን የጥሪ ማዕከሉና የሚኒስቴሩ ሥርዓቶች የሚያሳዩት ይህ ነው።
- **ሕጋዊው የምርጫ ቦታዎች ማስታወቂያ** በኮሚቴው የጊዜ ሰሌዳ፣ በሕጉ አንቀጽ 68(መ) መሠረት፣ ለ**ጥቅምት 20 ቀን 2026** ተወስኗል — ከምርጫው አንድ ሳምንት በፊት።
- **ለመራጩ የሚላከው ማስታወቂያ** በአንቀጽ 55ለ መሠረት **ጥቅምት 6 ቀን 2026** ይላካል።

ለመራጩ የሚላከው ማስታወቂያ ምቹ ነው፣ ነገር ግን ለመምረጥ ቅድመ ሁኔታ አይደለም። ወደ ምርጫ ጣቢያው ይዘውት መምጣት አይጠበቅብዎትም።

## እንዴት ማረጋገጥ እንደሚቻል — በአማርኛም ጭምር

የውስጥ ጉዳይ ሚኒስቴር በመዝገቡ ውስጥ መካተትዎንና የምርጫ ቦታዎን ለማረጋገጥ ብሔራዊ መስመር ያንቀሳቅሳል፦

| መንገድ | ዝርዝር | ሰዓታት |
| --- | --- | --- |
| ስልክ | **1-800-101975** ወይም **073-2458358** | እሁድ–ሐሙስ 08:30–21:00፤ ዓርብ 08:30–13:00 |
| SMS / WhatsApp | **053-3801464** | በቀን 24 ሰዓት፣ በራስ-አገልግሎት |

በማዕከላዊ ምርጫ ኮሚቴ መሠረት፣ መስመሩ **በራስ-አገልግሎትም በሰው ምላሽም** መረጃ ይሰጣል፤ እና **ምላሹ በተለያዩ ቋንቋዎች ይሰጣል፦ ዕብራይስጥ፣ አረብኛ፣ ሩስያኛ፣ አማርኛ እና እንግሊዝኛ**።

ይህ ማወቅና ማስተላለፍ የሚገባው ነጥብ ነው — በተለይ የቢሮክራሲ ጥያቄን በዕብራይስጥ ከመያዝ በአማርኛ መያዝ ለሚቀላቸው ወላጆችና አያቶች። በጥሪው መጀመሪያ ላይ አማርኛ ይጠይቁ።

የምርጫው ቀን ሲቃረብ መስመሩ ሰዓቱን ያራዝማል፦ ከ**ጥቅምት 19 እስከ 26 ቀን 2026** እስከ 23:00 ይሠራል፤ በ**ጥቅምት 27 ቀን 2026፣ የምርጫ ቀን**፣ ከ06:30 እስከ 22:30።

## አሁን ምን ማረጋገጥ አለብዎት

1. በመራጮች መዝገብ ውስጥ መገኘትዎን።
2. በየትኛው ምርጫ ጣቢያና በየትኛው አድራሻ እንደተመዘገቡ — በተለይ ባለፈው ዓመት ከተዛወሩ።
3. በእጅዎ ያለው መታወቂያ ተስማሚ መሆኑን። **የመታወቂያ ካርዱ ተነቃይ ተጨማሪ ወረቀት ብቻውን መታወቂያ ሰነድ አይደለም**።

ማረጋገጫው በመዝገቡ ውስጥ አለመሆንዎን ካሳየ፣ ሕጋዊ መንገድ አለ — መስከረም 11 ቀን 2026 ይዘጋል። [ከመራጮች መዝገብ ስለመተው አቤቱታ የማቅረቢያ የመጨረሻ ቀን](/am/news/voter-register-petition-deadline-2026) ይመልከቱ።

## ምንጮች

- [ማዕከላዊ ምርጫ ኮሚቴ — «ለ26ኛው ኔሴት ምርጫ»፣ gov.il፣ መስከረም 7 ቀን 2026 ተዘምኗል](https://www.gov.il/he/pages/knesset-elections-2026)
- [ማዕከላዊ ምርጫ ኮሚቴ — ሕጋዊ የእንቅስቃሴ የጊዜ ሰሌዳ፣ gov.il](https://www.gov.il/he/pages/time--table-26)
- [ynet፣ ሐምሌ 29 ቀን 2026](https://www.ynet.co.il/news/article/skwlitpbzg)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "voter-register-petition-deadline-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["civic", "rights"],
    title: {
      he: "11.9.2026: המועד האחרון לעתור על אי-הכללה בפנקס הבוחרים",
      en: "11 September 2026: the last day to petition over exclusion from the voter register",
      am: "መስከረም 11 ቀን 2026፦ ከመራጮች መዝገብ ስለመተው አቤቱታ የማቅረቢያ የመጨረሻ ቀን",
    },
    excerpt: {
      he: "בלוח הזמנים הרשמי של ועדת הבחירות המרכזית מופיע סעיף 53א: המועד האחרון להגשת עתירה על אי-הכללה בפנקס הבוחרים הוא יום ו', 11.9.2026 — 46 יום לפני הבחירות. ההחלטה בעתירות תינתן עד 2.10.2026.",
      en: "The Central Elections Committee's statutory timetable lists section 53a: the last day to file a petition over exclusion from the voter register is Friday, 11 September 2026 — 46 days before the election. Decisions on those petitions are due by 2 October 2026.",
      am: "የማዕከላዊ ምርጫ ኮሚቴ ሕጋዊ የጊዜ ሰሌዳ አንቀጽ 53ሀን ይዘረዝራል፦ ከመራጮች መዝገብ ስለመተው አቤቱታ ለማቅረብ የመጨረሻው ቀን ዓርብ፣ መስከረም 11 ቀን 2026 ነው — ከምርጫው 46 ቀናት በፊት። በእነዚህ አቤቱታዎች ላይ ውሳኔ እስከ ጥቅምት 2 ቀን 2026 ይሰጣል።",
    },
    bodies: {
      he: `## למה זה דחוף

פנקס הבוחרים לבחירות לכנסת ה-26 **נכנס לתוקף ב-6.9.2026**. מרגע זה הוא סגור — אבל החוק משאיר חלון קצר אחד למי שסבור שהוא נגרע ממנו שלא כדין.

בלוח הזמנים הסטטוטורי שמפרסמת ועדת הבחירות המרכזית מופיעה שורה מפורשת:

> **סעיף 53א — עתירה על אי-הכללה בפנקס הבוחרים — 46 יום לפני הבחירות — 11/09/2026, כ"ט אלול תשפ"ו, יום ו'.**

באותו לוח מופיע גם המשך ההליך: **סעיף 53א(ב) — החלטה בעתירה על אי-הכללה בפנקס — 2.10.2026**.

11.9.2026 הוא גם ערב ראש השנה. מי שצריך לפעול, כדאי שיעשה זאת מוקדם ביום ולא יסתמך על שעות אחר הצהריים.

## למי זה רלוונטי

הדרישות להיכללות בפנקס הבוחרים, לפי חוק הבחירות לכנסת [נוסח משולב], תשכ"ט-1969, הן:

- להיות **אזרח ישראלי** ביום שליפת הפנקס;
- להיות רשום, **הוא ומענו**, במרשם האוכלוסין כתושב;
- שיום ההולדת ה-18 יחול **לא יאוחר מיום הבחירות**.

התנאי השני הוא זה שמכשיל אנשים בפועל. מי שאין לו מען רשום ותקין במרשם — למשל אחרי מעבר דירה שלא דווח, אחרי תקופה בחו"ל, או בעקבות אי-התאמה ברישום — עלול לגלות שאינו מופיע בפנקס.

## מה לעשות, לפי הסדר

1. **קודם כול, לבדוק.** מוקד משרד הפנים: **1-800-101975** או **073-2458358**, א'–ה' 08:30–21:00, ו' 08:30–13:00. שירות עצמי ב-SMS או WhatsApp: **053-3801464**, 24 שעות. המענה ניתן גם **באמהרית**.
2. **אם אתה מופיע בפנקס** — אין מה לעשות בערוץ הזה. ודא רק שהקלפי מתאימה לך.
3. **אם אינך מופיע ואתה סבור שאתה זכאי** — זה המסלול של סעיף 53א, והוא נסגר ב-11.9.2026.
4. **אם אינך בטוח מה מעמדך** — כדאי להתייעץ. אפשר לפנות לגורם משפטי או לארגון סיוע; ראו את [מדריכי הזכויות שלנו](/he/rights) ואת [עמוד הקול הקהילתי](/he/voice).

טדרוס אינו נותן ייעוץ משפטי. המידע כאן הוא תיאור של לוח הזמנים הרשמי; לפעולה עצמה כדאי ליווי מקצועי.

## מקורות

- [ועדת הבחירות המרכזית — לוח זמנים לפעילות הוועדה (סעיף 53א ו-53א(ב)), gov.il](https://www.gov.il/he/pages/time--table-26)
- [ועדת הבחירות המרכזית — "בחירות לכנסת ה-26" (תנאי ההיכללות בפנקס), gov.il, עודכן 7.9.2026](https://www.gov.il/he/pages/knesset-elections-2026)`,
      en: `## Why this is urgent

The voter register for the 26th Knesset elections **came into force on 6 September 2026**. From that moment it is closed — but the law leaves one short window for anyone who believes they were wrongly left out of it.

The statutory timetable published by the Central Elections Committee carries an explicit line:

> **Section 53a — petition over exclusion from the voter register — 46 days before the election — 11/09/2026, Friday.**

The same timetable sets the next step: **section 53a(b) — decision on a petition over exclusion from the register — 2 October 2026**.

11 September 2026 is also the eve of Rosh Hashanah. Anyone who needs to act should do so early in the day rather than count on the afternoon.

## Who this concerns

The requirements for inclusion in the register, under the Knesset Elections Law [Consolidated Version], 1969, are:

- to be an **Israeli citizen** on the day the register is drawn;
- to be registered, **together with your address**, in the population registry as a resident;
- that your 18th birthday falls **no later than election day**.

The second condition is the one that trips people up in practice. Someone without a valid registered address — after an unreported move, after a period abroad, or through a registration mismatch — may find they do not appear in the register.

## What to do, in order

1. **First, check.** Interior Ministry line: **1-800-101975** or **073-2458358**, Sun–Thu 08:30–21:00, Fri 08:30–13:00. Self-service by SMS or WhatsApp: **053-3801464**, 24 hours. The line also answers **in Amharic**.
2. **If you are in the register** — nothing to do through this channel. Just confirm the polling station suits you.
3. **If you are not, and you believe you are eligible** — this is the section 53a route, and it closes on 11 September 2026.
4. **If you are unsure of your status** — get advice. You can approach a legal body or an aid organisation; see our [rights guides](/en/rights) and the [community voice page](/en/voice).

Tedros does not give legal advice. What is described here is the official timetable; for the step itself, professional support is worth having.

## Sources

- [Central Elections Committee — statutory activity timetable (sections 53a and 53a(b)), gov.il](https://www.gov.il/he/pages/time--table-26)
- [Central Elections Committee — "Elections to the 26th Knesset" (register eligibility conditions), gov.il, updated 7 Sept 2026](https://www.gov.il/he/pages/knesset-elections-2026)`,
      am: `## ለምን አጣዳፊ ሆነ

ለ26ኛው ኔሴት ምርጫ የመራጮች መዝገብ **መስከረም 6 ቀን 2026 ሥራ ላይ ዋለ**። ከዚያ ቅጽበት ጀምሮ ተዘግቷል — ነገር ግን ሕጉ ያለአግባብ ተትቻለሁ ብሎ ለሚያምን ሰው አንድ አጭር መስኮት ይተዋል።

ማዕከላዊ ምርጫ ኮሚቴ የሚያሳትመው ሕጋዊ የጊዜ ሰሌዳ ግልጽ መስመር ይዟል፦

> **አንቀጽ 53ሀ — ከመራጮች መዝገብ ስለመተው አቤቱታ — ከምርጫው 46 ቀናት በፊት — 11/09/2026፣ ዓርብ።**

ተመሳሳዩ የጊዜ ሰሌዳ ቀጣዩን ደረጃ ያስቀምጣል፦ **አንቀጽ 53ሀ(ለ) — ከመዝገብ ስለመተው በቀረበ አቤቱታ ላይ ውሳኔ — ጥቅምት 2 ቀን 2026**።

መስከረም 11 ቀን 2026 የሮሽ ሀሻና ዋዜማም ነው። እርምጃ መውሰድ የሚያስፈልገው ሰው በቀኑ መጀመሪያ ላይ ያድርገው እንጂ በከሰዓት በኋላ ላይ አይመካ።

## ይህ ማንን ይመለከታል

በኔሴት ምርጫ ሕግ [የተጠናከረ ቅጅ]፣ 1969 መሠረት በመዝገቡ ውስጥ ለመካተት የሚያስፈልጉት፦

- መዝገቡ በሚዘጋጅበት ቀን **የእስራኤል ዜጋ** መሆን፤
- **ከአድራሻዎ ጋር** በሕዝብ መዝገብ ውስጥ እንደ ነዋሪ መመዝገብ፤
- 18ኛ ልደትዎ **ከምርጫው ቀን ባልዘገየ** መዋሉ።

በተግባር ሰዎችን የሚያሰናክለው ሁለተኛው ሁኔታ ነው። ትክክለኛ የተመዘገበ አድራሻ የሌለው ሰው — ሳይነገር ከተደረገ ዝውውር በኋላ፣ በውጭ አገር ከቆየ በኋላ፣ ወይም በምዝገባ አለመጣጣም ምክንያት — በመዝገቡ ውስጥ አለመኖሩን ሊያገኝ ይችላል።

## በቅደም ተከተል ምን ማድረግ

1. **በመጀመሪያ፣ ያረጋግጡ።** የውስጥ ጉዳይ ሚኒስቴር መስመር፦ **1-800-101975** ወይም **073-2458358**፣ እሁድ–ሐሙስ 08:30–21:00፣ ዓርብ 08:30–13:00። በSMS ወይም WhatsApp በራስ-አገልግሎት፦ **053-3801464**፣ 24 ሰዓት። መስመሩ **በአማርኛም** ምላሽ ይሰጣል።
2. **በመዝገቡ ውስጥ ከሆኑ** — በዚህ መንገድ የሚደረግ ነገር የለም። የምርጫ ጣቢያው እንደሚስማማዎት ብቻ ያረጋግጡ።
3. **ካልሆኑ እና ብቁ ነኝ ብለው ካመኑ** — ይህ የአንቀጽ 53ሀ መንገድ ነው፤ መስከረም 11 ቀን 2026 ይዘጋል።
4. **ስለ ሁኔታዎ እርግጠኛ ካልሆኑ** — ምክር ይጠይቁ። ወደ ሕግ አካል ወይም ወደ ድጋፍ ድርጅት መቅረብ ይችላሉ፤ የእኛን [የመብቶች መመሪያዎች](/am/rights) እና [የማህበረሰብ ድምፅ ገጽ](/am/voice) ይመልከቱ።

ትድሮስ የሕግ ምክር አይሰጥም። እዚህ የተገለጸው ኦፊሴላዊው የጊዜ ሰሌዳ ነው፤ ለእርምጃው ራሱ ሙያዊ ድጋፍ ጠቃሚ ነው።

## ምንጮች

- [ማዕከላዊ ምርጫ ኮሚቴ — ሕጋዊ የእንቅስቃሴ የጊዜ ሰሌዳ (አንቀጽ 53ሀ እና 53ሀ(ለ))፣ gov.il](https://www.gov.il/he/pages/time--table-26)
- [ማዕከላዊ ምርጫ ኮሚቴ — «ለ26ኛው ኔሴት ምርጫ»፣ gov.il፣ መስከረም 7 ቀን 2026 ተዘምኗል](https://www.gov.il/he/pages/knesset-elections-2026)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "knesset-26-elections-timetable-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["civic", "policy"],
    title: {
      he: "לוח הזמנים לבחירות 27.10.2026 — התאריכים שנוגעים לך כבוחר",
      en: "The timetable to 27 October 2026 — the dates that concern you as a voter",
      am: "ወደ ጥቅምት 27 ቀን 2026 የሚወስደው የጊዜ ሰሌዳ — እንደ መራጭ የሚመለከቱዎት ቀናት",
    },
    excerpt: {
      he: "ועדת הבחירות המרכזית מפרסמת לוח זמנים סטטוטורי מלא לבחירות לכנסת ה-26. רובו נוגע למפלגות ולוועדות, אבל שמונה תאריכים בו נוגעים ישירות לבוחר — מהמועד לעתירה על הפנקס ועד פרסום התוצאות.",
      en: "The Central Elections Committee publishes a full statutory timetable for the 26th Knesset elections. Most of it concerns parties and committees, but eight dates in it concern the voter directly — from the register-petition deadline to the publication of results.",
      am: "ማዕከላዊ ምርጫ ኮሚቴ ለ26ኛው ኔሴት ምርጫ ሙሉ ሕጋዊ የጊዜ ሰሌዳ ያሳትማል። አብዛኛው ፓርቲዎችንና ኮሚቴዎችን ይመለከታል፣ ነገር ግን ስምንት ቀናት መራጩን በቀጥታ ይመለከታሉ — ከመዝገብ አቤቱታ ቀነ ገደብ እስከ ውጤት ማሳተም።",
    },
    bodies: {
      he: `## התאריכים שחשובים לבוחר

ועדת הבחירות המרכזית מפרסמת לוח זמנים סטטוטורי מלא — עשרות שורות, כל אחת עם סעיף החוק שמכוחו היא נקבעה וספירת הימים לאחור עד יום הבחירות. רובו הגדול מיועד למפלגות, לוועדות האזוריות ולוועדות הקלפי. אלה השורות שנוגעות ישירות לך:

| תאריך | מה קורה | סעיף |
| --- | --- | --- |
| 6.9.2026 | כניסת פנקס הבוחרים לתוקף | 26(ד) |
| 7–8.9.2026 | הגשת רשימות המועמדים לוועדה המרכזית (ימים 1 ו-2) | 57(ט) |
| **11.9.2026** | **מועד אחרון לעתירה על אי-הכללה בפנקס הבוחרים** | 53א |
| 22.9.2026 | פרסום הודעת הוועדה בדבר שירותים ציבוריים שיפעלו ביום הבחירות | 71א |
| 27.9.2026 | הודעה על אישור רשימות מועמדים | 63 |
| 2.10.2026 | החלטה בעתירה על אי-הכללה בפנקס | 53א(ב) |
| 6.10.2026 | משלוח ההודעה לבוחר | 55ב |
| 13.10.2026 | תחילת שידורי תעמולה בטלוויזיה וברדיו | 15, 15א |
| 18.10.2026 | פרסום רשימות המועמדים | 65 |
| 20.10.2026 | פרסום הודעה על מקומות הקלפי | 68(ד) |
| **27.10.2026** | **יום הבחירות** | — |
| 4.11.2026 | פרסום תוצאות הבחירות | 11 לחוק-יסוד: הכנסת |
| 18.11.2026 | מועד אחרון לערעור על התוצאות לבית המשפט לעניינים מנהליים בירושלים | 86(ב) |

## שלוש הערות שכדאי לשים לב אליהן

**החגים בתוך המערכה.** לוח הזמנים עצמו מסמן אותם: ערב ראש השנה חל ב-11.9.2026 — אותו יום שבו נסגר המועד לעתירה על הפנקס; ראש השנה ב-12–13.9; יום כיפור ב-21.9; סוכות מ-25.9; ושמחת תורה ב-3.10. מי שמתכנן פעולה בירוקרטית בתקופה הזו צריך לקחת בחשבון ימי סגירה.

**הרשימות עוד לא סופיות.** הגשה אינה אישור. אישור רשימות המועמדים נקבע ל-27.9.2026, ופרסומן ל-18.10.2026. עד אז יכולים לחול שינויים, כולל מחיקת מועמד או סירוב לאשר רשימה.

**מקום הקלפי מתפרסם רשמית רק ב-20.10.2026.** המידע הזמין קודם לכן — כולל מה שהמוקד מוסר — הוא מידע מקדים, ומ-7.9.2026 הוא כבר סופי ברמת המשרד. פירטנו זאת ב[כתבה על בדיקת מקום ההצבעה](/he/news/polling-station-lookup-amharic-2026).

## מקורות

- [ועדת הבחירות המרכזית — לוח זמנים לפעילות הוועדה, gov.il](https://www.gov.il/he/pages/time--table-26)
- [ועדת הבחירות המרכזית — "בחירות לכנסת ה-26", gov.il, עודכן 7.9.2026](https://www.gov.il/he/pages/knesset-elections-2026)`,
      en: `## The dates that matter to a voter

The Central Elections Committee publishes a full statutory timetable — dozens of rows, each with the section of law it derives from and a countdown to election day. Most of it is addressed to parties, regional committees and polling committees. These are the rows that concern you directly:

| Date | What happens | Section |
| --- | --- | --- |
| 6 Sept 2026 | The voter register comes into force | 26(d) |
| 7–8 Sept 2026 | Submission of candidate lists to the Central Committee (days 1 and 2) | 57(i) |
| **11 Sept 2026** | **Last day to petition over exclusion from the voter register** | 53a |
| 22 Sept 2026 | Publication of the committee's notice on public services operating on election day | 71a |
| 27 Sept 2026 | Notice of approval of candidate lists | 63 |
| 2 Oct 2026 | Decision on petitions over exclusion from the register | 53a(b) |
| 6 Oct 2026 | The voter notification is mailed | 55b |
| 13 Oct 2026 | Campaign broadcasts begin on television and radio | 15, 15a |
| 18 Oct 2026 | Publication of the candidate lists | 65 |
| 20 Oct 2026 | Publication of polling-place locations | 68(d) |
| **27 Oct 2026** | **Election day** | — |
| 4 Nov 2026 | Publication of the election results | 11, Basic Law: The Knesset |
| 18 Nov 2026 | Last day to appeal the results to the Jerusalem Administrative Court | 86(b) |

## Three things worth noticing

**The holidays fall inside the campaign.** The timetable marks them itself: the eve of Rosh Hashanah is 11 September 2026 — the same day the register-petition window closes; Rosh Hashanah 12–13 September; Yom Kippur 21 September; Sukkot from 25 September; and Simchat Torah 3 October. Anyone planning a bureaucratic step in this period should account for closures.

**The lists are not final yet.** Submission is not approval. Approval of candidate lists is set for 27 September 2026, and their publication for 18 October 2026. Until then changes can occur, including the deletion of a candidate or a refusal to approve a list.

**Polling places are formally published only on 20 October 2026.** The information available earlier — including what the call centre gives out — is preliminary, and from 7 September 2026 it is final at ministry level. We covered this in [the article on checking your polling place](/en/news/polling-station-lookup-amharic-2026).

## Sources

- [Central Elections Committee — statutory activity timetable, gov.il](https://www.gov.il/he/pages/time--table-26)
- [Central Elections Committee — "Elections to the 26th Knesset", gov.il, updated 7 Sept 2026](https://www.gov.il/he/pages/knesset-elections-2026)`,
      am: `## ለመራጭ የሚያስፈልጉት ቀናት

ማዕከላዊ ምርጫ ኮሚቴ ሙሉ ሕጋዊ የጊዜ ሰሌዳ ያሳትማል — በደርዘን የሚቆጠሩ መስመሮች፣ እያንዳንዳቸው ከወጡበት የሕግ አንቀጽና እስከ ምርጫው ቀን ካለው ቆጠራ ጋር። አብዛኛው ለፓርቲዎች፣ ለክልል ኮሚቴዎችና ለምርጫ ጣቢያ ኮሚቴዎች ነው። እርስዎን በቀጥታ የሚመለከቱት እነዚህ ናቸው፦

| ቀን | ምን ይሆናል | አንቀጽ |
| --- | --- | --- |
| መስከረም 6 ቀን 2026 | የመራጮች መዝገብ ሥራ ላይ ይውላል | 26(መ) |
| መስከረም 7–8 ቀን 2026 | የዕጩዎች ዝርዝር ለማዕከላዊ ኮሚቴ ማቅረብ (ቀን 1 እና 2) | 57(ት) |
| **መስከረም 11 ቀን 2026** | **ከመራጮች መዝገብ ስለመተው አቤቱታ የማቅረቢያ የመጨረሻ ቀን** | 53ሀ |
| መስከረም 22 ቀን 2026 | በምርጫው ቀን ስለሚሠሩ የሕዝብ አገልግሎቶች የኮሚቴው ማስታወቂያ ማሳተም | 71ሀ |
| መስከረም 27 ቀን 2026 | የዕጩዎች ዝርዝር ስለመጽደቁ ማስታወቂያ | 63 |
| ጥቅምት 2 ቀን 2026 | ከመዝገብ ስለመተው በቀረቡ አቤቱታዎች ላይ ውሳኔ | 53ሀ(ለ) |
| ጥቅምት 6 ቀን 2026 | ለመራጩ ማስታወቂያ ይላካል | 55ለ |
| ጥቅምት 13 ቀን 2026 | የቅስቀሳ ስርጭት በቴሌቪዥንና በሬዲዮ ይጀምራል | 15፣ 15ሀ |
| ጥቅምት 18 ቀን 2026 | የዕጩዎች ዝርዝር ማሳተም | 65 |
| ጥቅምት 20 ቀን 2026 | የምርጫ ቦታዎች ማስታወቂያ ማሳተም | 68(መ) |
| **ጥቅምት 27 ቀን 2026** | **የምርጫ ቀን** | — |
| ኅዳር 4 ቀን 2026 | የምርጫ ውጤት ማሳተም | 11፣ መሠረታዊ ሕግ፦ ኔሴት |
| ኅዳር 18 ቀን 2026 | ውጤቱን ለኢየሩሳሌም አስተዳደራዊ ፍርድ ቤት ለመቃወም የመጨረሻ ቀን | 86(ለ) |

## ትኩረት የሚሹ ሦስት ነጥቦች

**በዓላቱ በዘመቻው ውስጥ ይወድቃሉ።** የጊዜ ሰሌዳው ራሱ ያመለክታቸዋል፦ የሮሽ ሀሻና ዋዜማ መስከረም 11 ቀን 2026 ነው — የመዝገብ አቤቱታ መስኮቱ የሚዘጋበት ቀን፤ ሮሽ ሀሻና መስከረም 12–13፤ ዮም ኪፑር መስከረም 21፤ ሱኮት ከመስከረም 25፤ ስምሃት ቶራ ጥቅምት 3። በዚህ ወቅት የቢሮክራሲ እርምጃ የሚያቅድ ሰው የመዘጋት ቀናትን ማገናዘብ አለበት።

**ዝርዝሮቹ ገና የመጨረሻ አይደሉም።** ማቅረብ ማጽደቅ አይደለም። የዕጩዎች ዝርዝር ማጽደቅ ለመስከረም 27 ቀን 2026፣ ማሳተማቸው ደግሞ ለጥቅምት 18 ቀን 2026 ተወስኗል። እስከዚያ ድረስ ለውጦች ሊከሰቱ ይችላሉ፣ ዕጩን መሰረዝ ወይም ዝርዝርን ላለማጽደቅ መወሰንን ጨምሮ።

**የምርጫ ቦታዎች በይፋ የሚታተሙት ጥቅምት 20 ቀን 2026 ብቻ ነው።** ከዚያ በፊት የሚገኘው መረጃ — የጥሪ ማዕከሉ የሚሰጠውን ጨምሮ — የመጀመሪያ ደረጃ ነው፤ ከመስከረም 7 ቀን 2026 ጀምሮ ግን በሚኒስቴር ደረጃ የመጨረሻ ነው። ይህንን በ[የምርጫ ቦታዎን ስለማረጋገጥ ባቀረብነው ዘገባ](/am/news/polling-station-lookup-amharic-2026) ዘርዝረናል።

## ምንጮች

- [ማዕከላዊ ምርጫ ኮሚቴ — ሕጋዊ የእንቅስቃሴ የጊዜ ሰሌዳ፣ gov.il](https://www.gov.il/he/pages/time--table-26)
- [ማዕከላዊ ምርጫ ኮሚቴ — «ለ26ኛው ኔሴት ምርጫ»፣ gov.il፣ መስከረም 7 ቀን 2026 ተዘምኗል](https://www.gov.il/he/pages/knesset-elections-2026)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "candidate-lists-day-one-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["civic", "policy"],
    title: {
      he: "18 רשימות הוגשו ביום הראשון — והוועדה מדגישה: הגשה אינה אישור",
      en: "18 lists submitted on day one — and the committee stresses: submission is not approval",
      am: "በመጀመሪያው ቀን 18 ዝርዝሮች ቀረቡ — ኮሚቴውም ያሰምርበታል፦ ማቅረብ ማጽደቅ አይደለም",
    },
    excerpt: {
      he: "הליך הגשת רשימות המועמדים לכנסת ה-26 נפתח ב-7.9.2026 במשכן הכנסת. עד תום היום הראשון הוגשו 18 רשימות. ועדת הבחירות המרכזית מפרסמת אותן באתרה, עם הבהרה מפורשת שהן טרם אושרו.",
      en: "The process of submitting candidate lists for the 26th Knesset opened on 7 September 2026 at the Knesset. By the end of day one, 18 lists had been submitted. The Central Elections Committee publishes them on its site, with an explicit clarification that they have not yet been approved.",
      am: "ለ26ኛው ኔሴት የዕጩዎች ዝርዝር የማቅረብ ሂደት መስከረም 7 ቀን 2026 በኔሴት ተጀመረ። እስከ መጀመሪያው ቀን መጨረሻ 18 ዝርዝሮች ቀርበዋል። ማዕከላዊ ምርጫ ኮሚቴ ገና እንዳልጸደቁ ግልጽ በማድረግ በድረ ገጹ ላይ ያሳትማቸዋል።",
    },
    bodies: {
      he: `## מה קרה

הליך הגשת רשימות המועמדים לכנסת ה-26 יצא לדרך ביום שני, **7.9.2026**, במשכן הכנסת, תחת פיקוחו של יו"ר ועדת הבחירות המרכזית, שופט בית המשפט העליון **נעם סולברג**. לפי דיווח של אמיר אטינגר ב-ynet (7.9.2026), ההליך נמשך עד סמוך לשעה 19:00.

עם תום היום הראשון פרסמה ועדת הבחירות כי **הוגשו 18 רשימות מועמדים**, והבהירה:

> "הגשת הרשימות אינה מהווה אישור שלהן. הרשימות, הכינויים והאותיות המבוקשים ייבדקו על ידי ועדת הבחירות המרכזית בהתאם להוראות הדין".

לפי לוח הזמנים של הוועדה, **8.9.2026 הוא יום ההגשה השני והאחרון** (סעיף 57(ט)).

## הרשימות שהוגשו ביום הראשון

באתר ועדת הבחירות המרכזית, בעמוד שעודכן ב-7.9.2026, מופיעות 18 הרשימות עם האותיות שביקשו:

| אותיות | כינוי הרשימה |
| --- | --- |
| ב / רק | ביחד בראשות נפתלי בנט |
| דרך | ישר! עם איזנקוט לראשות הממשלה מאחדים את ישראל |
| צדק | שרשר לאהבה ואחדות העם |
| ד / דק | השותפות לכולם |
| צף / ף / ר / ףז | הפיראטים צפים לטוב |
| ך | עמך ישראל |
| י / ר | ישראל תחילה - בראשות שרן השכל |
| יה / ה | גן עדן בראשות ישוע בן דוד |
| קה / צח / נא | קול הנשים |
| בד / בי / בנ / רץ | ביחד נצליח - רשימה משותפת ערבית יהודית |
| ל | ישראל ביתנו בראשות אביגדור ליברמן |
| קץ | משפט צדק |
| נף | שמע בראשות נפתלי גולדמן |
| ב | עוצמה יהודית |
| קך | סדר חדש |
| די / צ / י | המילואימניקים והכלכלית בראשות יועז הנדל וירון זליכה |
| אמת | הדמוקרטים בראשות יאיר גולן |
| עם | רע"ם - הרשימה הערבית המאוחדת |

הוועדה מציינת במפורש: "רשימות אלה אינן סופיות וועדת הבחירות המרכזית טרם אישרה אותן". אישור הרשימות נקבע ל-**27.9.2026** ופרסומן ל-**18.10.2026**.

## למה זה חשוב לקורא

זו הנקודה שבה נסגרות האפשרויות. מרגע ההגשה, שמות המועמדים וסדרם ברשימה כבר אינם נתונים למשא ומתן פנים-מפלגתי — ומכאן ואילך ההליך הוא בדיקה משפטית של הוועדה. מי שרוצה לדעת אם יש ייצוג לקהילה ברשימה מסוימת, זה המסמך לבדוק בו, וכל רשימה מתפרסמת בעמוד נפרד באתר הוועדה.

מהרשימות שהוגשו ביום הראשון בדקנו את שמות המועמדים; על מה שמצאנו כתבנו בנפרד ב[כתבה על ייצוג הקהילה ברשימות](/he/news/mehereta-baruch-ron-democrats-list-2026).

טדרוס מדווח על הדברים כעובדה פוליטית ואינו מביע עמדה.

## מקורות

- [ועדת הבחירות המרכזית — "רשימות המועמדים לכנסת", gov.il, עודכן 7.9.2026](https://www.gov.il/he/pages/candidates-lists-26)
- [ynet, ‏7.9.2026 — אמיר אטינגר, "השמות והרשימות: אלה המועמדים של בחירות 2026"](https://www.ynet.co.il/news/elections2026/article/hkqbeu3dgx)
- [ועדת הבחירות המרכזית — לוח זמנים לפעילות הוועדה, gov.il](https://www.gov.il/he/pages/time--table-26)`,
      en: `## What happened

The process of submitting candidate lists for the 26th Knesset began on Monday, **7 September 2026**, at the Knesset, supervised by the chairman of the Central Elections Committee, Supreme Court Justice **Noam Sohlberg**. Per a report by Amir Ettinger in ynet (7 September 2026), the process ran until shortly before 19:00.

At the end of day one the Elections Committee announced that **18 candidate lists had been submitted**, and clarified:

> "The submission of the lists does not constitute their approval. The lists, the names and the letters requested will be examined by the Central Elections Committee in accordance with the provisions of the law."

Per the committee's timetable, **8 September 2026 is the second and final submission day** (section 57(i)).

## The lists submitted on day one

On the Central Elections Committee's site, on a page updated 7 September 2026, the 18 lists appear with the ballot letters they requested:

| Letters | List name |
| --- | --- |
| ב / רק | Beyahad, led by Naftali Bennett |
| דרך | Yashar! With Eisenkot for prime minister, uniting Israel |
| צדק | Sharshar for love and the unity of the people |
| ד / דק | The Partnership for All |
| צף / ף / ר / ףז | The Pirates Float to the Good |
| ך | Amcha Israel |
| י / ר | Israel First — led by Sharren Haskel |
| יה / ה | Gan Eden, led by Yeshua Ben David |
| קה / צח / נא | The Women's Voice |
| בד / בי / בנ / רץ | Beyachad Natzliah — a joint Arab-Jewish list |
| ל | Yisrael Beiteinu, led by Avigdor Lieberman |
| קץ | Mishpat Tzedek |
| נף | Shema, led by Naftali Goldman |
| ב | Otzma Yehudit |
| קך | Seder Chadash |
| די / צ / י | The Reservists and the Economic, led by Yoaz Hendel and Yaron Zelekha |
| אמת | The Democrats, led by Yair Golan |
| עם | Ra'am — the United Arab List |

The committee states explicitly: "These lists are not final and the Central Elections Committee has not yet approved them." Approval of the lists is set for **27 September 2026** and their publication for **18 October 2026**.

## Why this matters to a reader

This is the point at which options close. From submission onward, the candidates' names and their order on a list are no longer subject to internal party negotiation — from here the process is the committee's legal review. Anyone who wants to know whether a given list carries community representation, this is the document to check, and each list is published on its own page on the committee's site.

We checked the candidate names on the lists submitted on day one; we wrote separately about what we found, in [the article on community representation on the lists](/en/news/mehereta-baruch-ron-democrats-list-2026).

Tedros reports this as political fact and takes no position.

## Sources

- [Central Elections Committee — "Candidate lists for the Knesset", gov.il, updated 7 Sept 2026](https://www.gov.il/he/pages/candidates-lists-26)
- [ynet, 7 Sept 2026 — Amir Ettinger, "The names and the lists: these are the candidates of the 2026 elections"](https://www.ynet.co.il/news/elections2026/article/hkqbeu3dgx)
- [Central Elections Committee — statutory activity timetable, gov.il](https://www.gov.il/he/pages/time--table-26)`,
      am: `## ምን ተከሰተ

ለ26ኛው ኔሴት የዕጩዎች ዝርዝር የማቅረብ ሂደት ሰኞ፣ **መስከረም 7 ቀን 2026**፣ በኔሴት ተጀመረ፤ በማዕከላዊ ምርጫ ኮሚቴ ሊቀመንበር፣ የጠቅላይ ፍርድ ቤት ዳኛ **ኖአም ሶልበርግ** ቁጥጥር ሥር። አሚር ኤቲንገር በynet (መስከረም 7 ቀን 2026) እንደዘገበው፣ ሂደቱ እስከ 19:00 አካባቢ ቀጥሏል።

በመጀመሪያው ቀን መጨረሻ ላይ ምርጫ ኮሚቴው **18 የዕጩዎች ዝርዝሮች መቅረባቸውን** አስታውቆ አብራርቷል፦

> «ዝርዝሮቹን ማቅረብ ማጽደቃቸውን አያመለክትም። የተጠየቁት ዝርዝሮች፣ ስሞችና ፊደላት በማዕከላዊ ምርጫ ኮሚቴ በሕጉ ድንጋጌዎች መሠረት ይመረመራሉ።»

በኮሚቴው የጊዜ ሰሌዳ መሠረት፣ **መስከረም 8 ቀን 2026 ሁለተኛውና የመጨረሻው የማቅረቢያ ቀን ነው** (አንቀጽ 57(ት))።

## በመጀመሪያው ቀን የቀረቡት ዝርዝሮች

በማዕከላዊ ምርጫ ኮሚቴ ድረ ገጽ፣ መስከረም 7 ቀን 2026 በተዘመነ ገጽ ላይ፣ 18ቱ ዝርዝሮች ከጠየቁት የምርጫ ወረቀት ፊደላት ጋር ይታያሉ፦

| ፊደላት | የዝርዝሩ ስም |
| --- | --- |
| ב / רק | ቤያሃድ፣ በናፍታሊ ቤኔት የሚመራ |
| דרך | ያሻር! ከአይዘንኮት ጋር ለጠቅላይ ሚኒስትርነት |
| צדק | ሻርሻር ለፍቅርና ለሕዝብ አንድነት |
| ד / דק | ሽርክና ለሁሉም |
| צף / ף / ר / ףז | ወንበዴዎቹ ወደ በጎ ይንሳፈፋሉ |
| ך | አምቻ እስራኤል |
| י / ר | እስራኤል መጀመሪያ — በሻረን ሃስቀል የሚመራ |
| יה / ה | ጋን ኤደን፣ በየሹዋ ቤን ዳዊት የሚመራ |
| קה / צח / נא | የሴቶች ድምፅ |
| בד / בי / בנ / רץ | ቤያሃድ ናጽሊያህ — የጋራ የአረብ-አይሁድ ዝርዝር |
| ל | እስራኤል ቤቴኑ፣ በአቪግዶር ሊበርማን የሚመራ |
| קץ | ሚሽፓት ጼዴቅ |
| נף | ሸማ፣ በናፍታሊ ጎልድማን የሚመራ |
| ב | ኦጽማ የሁዲት |
| קך | ሴደር ሃዳሽ |
| די / צ / י | ተጠባባቂዎቹና ኢኮኖሚው፣ በዮአዝ ሄንደልና ያሮን ዘሌካ የሚመራ |
| אמת | ዴሞክራቶቹ፣ በያኢር ጎላን የሚመራ |
| עם | ራአም — የተባበረው የአረብ ዝርዝር |

ኮሚቴው በግልጽ ይናገራል፦ «እነዚህ ዝርዝሮች የመጨረሻ አይደሉም፤ ማዕከላዊ ምርጫ ኮሚቴም ገና አላጸደቃቸውም።» ዝርዝሮቹን ማጽደቅ ለ**መስከረም 27 ቀን 2026**፣ ማሳተማቸው ደግሞ ለ**ጥቅምት 18 ቀን 2026** ተወስኗል።

## ለአንባቢ ለምን አስፈላጊ ሆነ

አማራጮች የሚዘጉበት ነጥብ ይህ ነው። ከቀረበ በኋላ የዕጩዎቹ ስሞችና በዝርዝሩ ውስጥ ያላቸው ቅደም ተከተል ከውስጠ-ፓርቲ ድርድር ውጭ ይሆናሉ — ከዚህ በኋላ ሂደቱ የኮሚቴው ሕጋዊ ምርመራ ነው። አንድ ዝርዝር የማህበረሰብ ውክልና ይዞ እንደሆነ ማወቅ የሚፈልግ ሰው፣ የሚመረምረው ሰነድ ይህ ነው፤ እያንዳንዱ ዝርዝርም በኮሚቴው ድረ ገጽ በራሱ ገጽ ላይ ይታተማል።

በመጀመሪያው ቀን በቀረቡት ዝርዝሮች ውስጥ የዕጩዎችን ስሞች መርምረናል፤ ስላገኘነው ነገር በተለየ ዘገባ ጽፈናል፦ [በዝርዝሮቹ ውስጥ ስለ ማህበረሰቡ ውክልና](/am/news/mehereta-baruch-ron-democrats-list-2026)።

ትድሮስ ይህንን እንደ ፖለቲካዊ እውነታ ብቻ ይዘግባል፣ አቋም አይይዝም።

## ምንጮች

- [ማዕከላዊ ምርጫ ኮሚቴ — «የኔሴት ዕጩዎች ዝርዝር»፣ gov.il፣ መስከረም 7 ቀን 2026 ተዘምኗል](https://www.gov.il/he/pages/candidates-lists-26)
- [ynet፣ መስከረም 7 ቀን 2026 — አሚር ኤቲንገር](https://www.ynet.co.il/news/elections2026/article/hkqbeu3dgx)
- [ማዕከላዊ ምርጫ ኮሚቴ — ሕጋዊ የእንቅስቃሴ የጊዜ ሰሌዳ፣ gov.il](https://www.gov.il/he/pages/time--table-26)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "mehereta-baruch-ron-democrats-list-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["civic", "community"],
    title: {
      he: "מהרטה ברוך-רון במקום ה-26 ברשימת הדמוקרטים שהוגשה לוועדת הבחירות",
      en: "Mehereta Baruch-Ron placed 26th on the Democrats list submitted to the Elections Committee",
      am: "መሀረታ ባሩክ-ሮን ለምርጫ ኮሚቴ በቀረበው የዴሞክራቶች ዝርዝር 26ኛ ቦታ ላይ",
    },
    excerpt: {
      he: "ברשימת הדמוקרטים בראשות יאיר גולן, כפי שהוגשה לוועדת הבחירות המרכזית ופורסמה באתרה ב-7.9.2026, מופיעה מהרטה ברוך-רון במקום ה-26 — סגנית ראש עיריית תל אביב-יפו לשעבר, הראשונה מיוצאי הקהילה שכיהנה בתפקיד.",
      en: "On the Democrats list led by Yair Golan, as submitted to the Central Elections Committee and published on its site on 7 September 2026, Mehereta Baruch-Ron appears at number 26 — a former deputy mayor of Tel Aviv-Yafo, the first member of the community to hold that post.",
      am: "በያኢር ጎላን በሚመራው የዴሞክራቶች ዝርዝር፣ ለማዕከላዊ ምርጫ ኮሚቴ ቀርቦ መስከረም 7 ቀን 2026 በድረ ገጹ በታተመው መሠረት፣ መሀረታ ባሩክ-ሮን በ26ኛ ቦታ ላይ ትገኛለች — የቀድሞ የቴል አቪቭ-ያፎ ምክትል ከንቲባ፣ ይህን ሹመት የያዘች የመጀመሪያዋ የማህበረሰቡ አባል።",
    },
    bodies: {
      he: `## הממצא

ועדת הבחירות המרכזית מפרסמת באתרה כל רשימת מועמדים שהוגשה, על מלוא שמות המועמדים וסדרם. עברנו על שמות המועמדים ב-18 הרשימות שהוגשו ביום הראשון, 7.9.2026.

ברשימת **הדמוקרטים בראשות יאיר גולן** (אותיות אמת), בעמוד שפרסמה הוועדה ב-7.9.2026, מופיעה במקום ה-**26**:

> "26. ברוך רון מהרטה — מטעם מפלגת הדמוקרטים מיסודה של תנועת העבודה"

## מי היא

מהרטה ברוך-רון היא פוליטיקאית, שחקנית ומגישת טלוויזיה. היא כיהנה כסגנית ראש עיריית תל אביב-יפו מטעם מרצ, והיא **הראשונה מיוצאי הקהילה האתיופית-ישראלית שנבחרה למועצת העיר תל אביב-יפו והראשונה שכיהנה כסגנית ראש העיר**.

## מה זה אומר, ומה זה לא אומר

**מה שאפשר לומר בוודאות:** היא מופיעה במקום 26 ברשימה שהוגשה לוועדה.

**מה שאי אפשר לומר:** אם המקום ריאלי. זו שאלה של תוצאות, לא של עובדות — ותלויה במספר המנדטים שהרשימה תקבל ב-27.10.2026. טדרוס אינו מפרסם תחזיות מנדטים ואינו מביע עמדה על מפלגה כלשהי.

**וגם זה חשוב:** הרשימות שהוגשו **טרם אושרו**. אישור רשימות המועמדים נקבע ל-27.9.2026 ופרסומן הרשמי ל-18.10.2026, ועד אז ייתכנו שינויים.

## הערת שקיפות על היקף הבדיקה

בדקנו את שמות המועמדים ב-18 הרשימות שהוגשו ב-7.9.2026 בלבד. **יום ההגשה השני הוא 8.9.2026**, ומפלגות גדולות — ובהן הליכוד — טרם הגישו את רשימותיהן כשעמוד הוועדה עודכן. לכן אין לקרוא את הכתבה הזו כמפה מלאה של ייצוג הקהילה בבחירות האלה; זו תמונת מצב חלקית של יום אחד. נשוב לנושא כשהתמונה תושלם.

על הרקע בליכוד כתבנו בעבר: [32 קסים חתמו על מכתב לנתניהו](/he/news/likud-reserved-slots-kessim-letter-2026) ו[מאמר הדעה של שמואל לגסה](/he/news/legesse-oped-gabi-worku-realistic-slot-2026).

## מקורות

- [ועדת הבחירות המרכזית — "הדמוקרטים בראשות יאיר גולן", רשימת המועמדים כפי שהוגשה, gov.il, פורסם 7.9.2026](https://www.gov.il/he/pages/hademokratim_list17)
- [ועדת הבחירות המרכזית — "רשימות המועמדים לכנסת", gov.il, עודכן 7.9.2026](https://www.gov.il/he/pages/candidates-lists-26)
- [ויקיפדיה העברית — מהרטה ברוך-רון (לרקע הביוגרפי)](https://he.wikipedia.org/wiki/%D7%9E%D7%94%D7%A8%D7%98%D7%94_%D7%91%D7%A8%D7%95%D7%9A-%D7%A8%D7%95%D7%9F)`,
      en: `## The finding

The Central Elections Committee publishes on its site every candidate list submitted, with the full names of the candidates and their order. We went through the candidate names on the 18 lists submitted on day one, 7 September 2026.

On the list of **The Democrats, led by Yair Golan** (ballot letters אמת), on the page the committee published on 7 September 2026, at number **26**:

> "26. Baruch Ron Mehereta — on behalf of the Democrats party, founded by the Labour movement"

## Who she is

Mehereta Baruch-Ron is a politician, actress and television presenter. She served as deputy mayor of Tel Aviv-Yafo on behalf of Meretz, and she is **the first member of the Ethiopian-Israeli community elected to the Tel Aviv-Yafo city council and the first to serve as deputy mayor of the city**.

## What this says, and what it does not

**What can be said with certainty:** she appears at number 26 on the list submitted to the committee.

**What cannot be said:** whether the slot is realistic. That is a question of results, not of facts — it depends on how many seats the list wins on 27 October 2026. Tedros does not publish seat projections and takes no position on any party.

**Also important:** the submitted lists have **not yet been approved**. Approval of candidate lists is set for 27 September 2026 and their formal publication for 18 October 2026; changes are possible until then.

## A transparency note on the scope of this check

We checked the candidate names on the 18 lists submitted on 7 September 2026 only. **The second submission day is 8 September 2026**, and large parties — Likud among them — had not yet submitted their lists when the committee's page was updated. This article should therefore not be read as a complete map of community representation in this election; it is a partial snapshot of a single day. We will return to the subject once the picture is complete.

On the Likud background we have written before: [32 kessim signed a letter to Netanyahu](/en/news/likud-reserved-slots-kessim-letter-2026) and [Shmuel Legesse's op-ed](/en/news/legesse-oped-gabi-worku-realistic-slot-2026).

## Sources

- [Central Elections Committee — "The Democrats, led by Yair Golan", candidate list as submitted, gov.il, published 7 Sept 2026](https://www.gov.il/he/pages/hademokratim_list17)
- [Central Elections Committee — "Candidate lists for the Knesset", gov.il, updated 7 Sept 2026](https://www.gov.il/he/pages/candidates-lists-26)
- [Hebrew Wikipedia — Mehereta Baruch-Ron (biographical background)](https://he.wikipedia.org/wiki/%D7%9E%D7%94%D7%A8%D7%98%D7%94_%D7%91%D7%A8%D7%95%D7%9A-%D7%A8%D7%95%D7%9F)`,
      am: `## ግኝቱ

ማዕከላዊ ምርጫ ኮሚቴ የቀረበውን እያንዳንዱን የዕጩዎች ዝርዝር፣ ከሙሉ የዕጩዎች ስሞችና ቅደም ተከተላቸው ጋር፣ በድረ ገጹ ላይ ያሳትማል። በመጀመሪያው ቀን፣ መስከረም 7 ቀን 2026፣ በቀረቡት 18 ዝርዝሮች ውስጥ ያሉትን የዕጩዎች ስሞች መርምረናል።

በ**ያኢር ጎላን በሚመራው የዴሞክራቶች** ዝርዝር (የምርጫ ወረቀት ፊደላት አמת)፣ ኮሚቴው መስከረም 7 ቀን 2026 ባሳተመው ገጽ ላይ፣ በ**26**ኛ ቁጥር፦

> «26. ባሩክ ሮን መሀረታ — ከሌበር እንቅስቃሴ በተመሠረተው የዴሞክራቶች ፓርቲ ስም»

## እርሷ ማን ናት

መሀረታ ባሩክ-ሮን ፖለቲከኛ፣ ተዋናይትና የቴሌቪዥን አቅራቢ ናት። በሜሬጽ ስም የቴል አቪቭ-ያፎ ምክትል ከንቲባ ሆና አገልግላለች፤ እንዲሁም **ወደ ቴል አቪቭ-ያፎ ከተማ ምክር ቤት የተመረጠች የመጀመሪያዋ የኢትዮጵያ-እስራኤላውያን ማህበረሰብ አባልና የከተማዋ ምክትል ከንቲባ ሆና ያገለገለች የመጀመሪያዋ** ናት።

## ይህ ምን ይላል፣ ምንስ አይልም

**በእርግጠኝነት ሊባል የሚችለው፦** ለኮሚቴው በቀረበው ዝርዝር ውስጥ በ26ኛ ቁጥር ላይ ትገኛለች።

**ሊባል የማይችለው፦** ቦታው ተጨባጭ መሆን አለመሆኑ። ይህ የውጤት ጥያቄ እንጂ የእውነታ አይደለም — ዝርዝሩ ጥቅምት 27 ቀን 2026 በሚያገኘው መቀመጫ ብዛት ላይ የተመሠረተ ነው። ትድሮስ የመቀመጫ ትንበያ አያሳትምም፤ በማንኛውም ፓርቲ ላይ አቋም አይይዝም።

**ይህም አስፈላጊ ነው፦** የቀረቡት ዝርዝሮች **ገና አልጸደቁም**። የዕጩዎች ዝርዝር ማጽደቅ ለመስከረም 27 ቀን 2026፣ ኦፊሴላዊ ማሳተማቸው ደግሞ ለጥቅምት 18 ቀን 2026 ተወስኗል፤ እስከዚያ ድረስ ለውጦች ሊኖሩ ይችላሉ።

## ስለ ምርመራው ስፋት የግልጽነት ማስታወሻ

መስከረም 7 ቀን 2026 በቀረቡት 18 ዝርዝሮች ውስጥ ያሉትን ስሞች ብቻ ነው የመረመርነው። **ሁለተኛው የማቅረቢያ ቀን መስከረም 8 ቀን 2026 ነው**፤ ትላልቅ ፓርቲዎችም — ሊኩድን ጨምሮ — የኮሚቴው ገጽ በተዘመነበት ጊዜ ዝርዝራቸውን ገና አላቀረቡም ነበር። ስለዚህ ይህ ዘገባ በዚህ ምርጫ የማህበረሰቡ ውክልና ሙሉ ካርታ ተደርጎ መነበብ የለበትም፤ የአንድ ቀን ከፊል ገጽታ ነው። ምስሉ ሲሟላ ወደ ጉዳዩ እንመለሳለን።

ስለ ሊኩድ ዳራ ከዚህ በፊት ጽፈናል፦ [32 ቀሲሶች ለኔታንያሁ ደብዳቤ ፈረሙ](/am/news/likud-reserved-slots-kessim-letter-2026) እና [የሽሙኤል ለገሰ አስተያየት](/am/news/legesse-oped-gabi-worku-realistic-slot-2026)።

## ምንጮች

- [ማዕከላዊ ምርጫ ኮሚቴ — «ዴሞክራቶቹ፣ በያኢር ጎላን የሚመራ»፣ የቀረበው የዕጩዎች ዝርዝር፣ gov.il፣ መስከረም 7 ቀን 2026 ታትሟል](https://www.gov.il/he/pages/hademokratim_list17)
- [ማዕከላዊ ምርጫ ኮሚቴ — «የኔሴት ዕጩዎች ዝርዝር»፣ gov.il፣ መስከረም 7 ቀን 2026 ተዘምኗል](https://www.gov.il/he/pages/candidates-lists-26)
- [የዕብራይስጥ ውክፔዲያ — መሀረታ ባሩክ-ሮን (የሕይወት ታሪክ ዳራ)](https://he.wikipedia.org/wiki/%D7%9E%D7%94%D7%A8%D7%98%D7%94_%D7%91%D7%A8%D7%95%D7%9A-%D7%A8%D7%95%D7%9F)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "aliyah-committee-tigray-law-of-return-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["immigration", "policy"],
    title: {
      he: "בוועדת העלייה נחשף: משלחת מצאה זכאי חוק השבות באתיופיה — 21 בקשות אושרו מתוך 146",
      en: "Revealed at the Aliyah Committee: a delegation found Law of Return eligibles in Ethiopia — 21 of 146 applications approved",
      am: "በዓሊያ ኮሚቴ ተገለጸ፦ ልዑክ በኢትዮጵያ የመመለሻ ሕግ ብቁዎችን አገኘ — ከ146 ማመልከቻዎች 21 ጸደቁ",
    },
    excerpt: {
      he: "בדיון בוועדת העלייה והקליטה של הכנסת ב-7.9.2026 נחשף שמשלחת של רשות האוכלוסין והסוכנות היהודית יצאה לאדיס אבבה ביולי 2026 לבחון 146 בקשות לעלייה מכוח חוק השבות. 21 אושרו, אחת נדחתה, והשאר בבדיקות. יו\"ר הוועדה: הנתונים סותרים את עמדת המדינה משנת 2013.",
      en: "At a session of the Knesset Aliyah and Absorption Committee on 7 September 2026 it emerged that a delegation of the Population Authority and the Jewish Agency travelled to Addis Ababa in July 2026 to examine 146 applications for aliyah under the Law of Return. 21 were approved, one rejected, the rest under review. The committee chair: the data contradicts the state's 2013 position.",
      am: "መስከረም 7 ቀን 2026 በኔሴት የዓሊያና የመቀበል ኮሚቴ ስብሰባ ላይ፣ የሕዝብ ባለሥልጣንና የአይሁድ ኤጀንሲ ልዑክ በሐምሌ 2026 ወደ አዲስ አበባ ሄዶ በመመለሻ ሕግ 146 የዓሊያ ማመልከቻዎችን እንደመረመረ ተገለጸ። 21 ጸደቁ፣ አንዱ ተቀባይነት አላገኘም፣ የቀሩት በምርመራ ላይ ናቸው።",
    },
    bodies: {
      he: `## מה נחשף בדיון

**ועדת העלייה, הקליטה והתפוצות של הכנסת** קיימה דיון ב-**7.9.2026**, בראשות ח"כ **גלעד קריב** (הדמוקרטים). בדיון נחשף שמשלחת של **רשות האוכלוסין וההגירה והסוכנות היהודית** יצאה לאתיופיה ביולי 2026 כדי לבחון **146 בקשות** של משפחות לעלות מכוח **חוק השבות**.

הדיווח הוא של **יהל פרג', כתבת הרווחה של "דבר"**, שפורסם ב-7.9.2026.

## המספרים

לפי הדיווח מהדיון:

- **146 בקשות** נבחנו על ידי המשלחת.
- **21 בקשות אושרו.**
- **בקשה אחת נדחתה.**
- **השאר נמצאות בבדיקות שונות**, לרבות בדיקות DNA.
- **עם 23 משפחות מתוך ה-146 לא ניתן היה ליצור קשר**, ולכן לא התקיימו ראיונות.

הראיונות התקיימו **באדיס אבבה בלבד**, בשל מצב ביטחוני באזורי גונדר וטיגראי.

## למה זה משמעותי

הנקודה המרכזית היא שהממצאים סותרים עמדה רשמית ותיקה. מדינת ישראל הצהירה בשנת 2013 שלא נותרו באתיופיה זכאי חוק השבות. הבדיקה בשטח העלתה תמונה אחרת.

יו"ר הוועדה, ח"כ גלעד קריב, אמר בדיון:

> "קיבלתי את הרושם שמדינת ישראל אומרת שאין זכאי חוק השבות באתיופיה אבל הנתונים מוכיחים אחרת".

עוד נמסר בדיון שאחת המסקנות מהמשלחת היא שקיימים יהודים וזכאי חוק השבות **בטיגראי**. ח"כ **משה סולומון** (הבית היהודי) אמר שזכאים אינם צריכים להמתין להחלטות ממשלה כדי לעלות.

ההבחנה חשובה: **חוק השבות** הוא מסלול זכאות שאינו תלוי בהחלטת ממשלה נפרדת — בשונה ממסלול הפלאש מורה, שהעלאתם מוסדרת בהחלטות ממשלה ייעודיות ובתקצוב נפרד.

## הדסק שעדיין לא עומד

בדיון הובעה גם ביקורת על עיכוב בהקמת **דסק אתיופיה** ברשות האוכלוסין. לפי הדיווח, **אושרו עשרה תקנים** של עובדי הרשות שכל תפקידם יהיה מענה לבקשות — אך רק **שמונה מתוך העשרה אוישו**, וטרם אותר מקום עבודה פיזי עבורם.

## מה הלאה

הבקשות שנמצאות "בבדיקות שונות" הן עכשיו הנתון שכדאי לעקוב אחריו, וכן השאלה אם תצא משלחת נוספת לאזורים שלא נבדקו. על הרקע התקציבי והביקורתי כתבנו בנפרד: [תקציב 2026, ועדת קנפו וביקורת המדינה](/he/news/ethiopia-aliyah-budget-comptroller-2026).

טדרוס מדווח על הדברים כעובדה ואינו מביע עמדה.

## מקורות

- ["דבר", ‏7.9.2026 — יהל פרג', "'אולי נגלה שגיירנו יהודים': בוועדת העלייה נחשף שיש עוד יהודים באתיופיה שזכאים לעלייה"](https://www.davar1.co.il/696294/)`,
      en: `## What emerged at the session

The **Knesset Committee on Aliyah, Absorption and Diaspora Affairs** held a session on **7 September 2026**, chaired by MK **Gilad Kariv** (The Democrats). It emerged that a delegation of the **Population and Immigration Authority and the Jewish Agency** travelled to Ethiopia in July 2026 to examine **146 applications** from families to immigrate under the **Law of Return**.

The report is by **Yahel Farag, welfare correspondent for Davar**, published on 7 September 2026.

## The numbers

Per the report from the session:

- **146 applications** were examined by the delegation.
- **21 applications were approved.**
- **One was rejected.**
- **The rest are under various reviews**, including DNA testing.
- **23 of the 146 families could not be contacted**, so no interviews took place.

The interviews were held **in Addis Ababa only**, because of the security situation in the Gondar and Tigray regions.

## Why this matters

The central point is that the findings contradict a long-standing official position. The State of Israel declared in 2013 that no Law of Return eligibles remained in Ethiopia. The assessment on the ground produced a different picture.

The committee chair, MK Gilad Kariv, said at the session:

> "I got the impression that the State of Israel says there are no Law of Return eligibles in Ethiopia, but the data proves otherwise."

It was further stated at the session that one conclusion from the delegation is that Jews and Law of Return eligibles exist **in Tigray**. MK **Moshe Solomon** (Habayit Hayehudi) said that eligible people should not have to wait for government decisions in order to immigrate.

The distinction matters: **the Law of Return** is an eligibility route that does not depend on a separate government decision — unlike the Falash Mura track, whose immigration is governed by dedicated government decisions and separate budgeting.

## The desk that is still not standing

The session also heard criticism of the delay in establishing an **Ethiopia desk** at the Population Authority. Per the report, **ten civil service positions were approved** for authority staff whose entire role would be handling applications — but only **eight of the ten were filled**, and no physical workspace had yet been found for them.

## What comes next

The applications "under various reviews" are now the figure to watch, along with whether a further delegation will travel to the regions that were not assessed. We wrote separately on the budgetary and audit background: [the 2026 budget, the Kanfo committee and the State Comptroller](/en/news/ethiopia-aliyah-budget-comptroller-2026).

Tedros reports this as fact and takes no position.

## Sources

- [Davar, 7 Sept 2026 — Yahel Farag, "'Maybe we will discover we converted Jews': the Aliyah Committee heard there are more Jews in Ethiopia eligible to immigrate"](https://www.davar1.co.il/696294/)`,
      am: `## በስብሰባው ላይ የተገለጸው

የ**ኔሴት የዓሊያ፣ የመቀበልና የዲያስፖራ ጉዳዮች ኮሚቴ** መስከረም **7 ቀን 2026** ስብሰባ አካሂዷል፤ በኔሴት አባል **ጊላድ ካሪቭ** (ዴሞክራቶቹ) ሊቀመንበርነት። የ**ሕዝብና ኢሚግሬሽን ባለሥልጣንና የአይሁድ ኤጀንሲ** ልዑክ በሐምሌ 2026 ወደ ኢትዮጵያ ሄዶ በ**መመለሻ ሕግ** ለመሰደድ የቀረቡ **146 የቤተሰብ ማመልከቻዎችን** እንደመረመረ ተገለጸ።

ዘገባው የ**ያሄል ፋራግ፣ የዳቫር የበጎ አድራጎት ዘጋቢ** ነው፤ መስከረም 7 ቀን 2026 ታትሟል።

## ቁጥሮቹ

ከስብሰባው ዘገባ መሠረት፦

- **146 ማመልከቻዎች** በልዑኩ ተመርምረዋል።
- **21 ማመልከቻዎች ጸድቀዋል።**
- **አንዱ ተቀባይነት አላገኘም።**
- **የቀሩት በተለያዩ ምርመራዎች ላይ ናቸው**፣ የDNA ምርመራን ጨምሮ።
- **ከ146ቱ 23 ቤተሰቦች ጋር መገናኘት አልተቻለም**፣ ስለሆነም ቃለ መጠይቅ አልተካሄደም።

ቃለ መጠይቆቹ የተካሄዱት **በአዲስ አበባ ብቻ** ነው፤ በጎንደርና በትግራይ አካባቢዎች ባለው የጸጥታ ሁኔታ ምክንያት።

## ለምን አስፈላጊ ሆነ

ዋናው ነጥብ ግኝቶቹ ለረጅም ጊዜ የቆየን ኦፊሴላዊ አቋም መቃረናቸው ነው። የእስራኤል መንግሥት በ2013 በኢትዮጵያ የመመለሻ ሕግ ብቁዎች እንዳልቀሩ አውጇል። በመስክ የተደረገው ግምገማ ግን የተለየ ምስል አሳይቷል።

የኮሚቴው ሊቀመንበር፣ የኔሴት አባል ጊላድ ካሪቭ በስብሰባው ላይ እንዲህ ብለዋል፦

> «የእስራኤል መንግሥት በኢትዮጵያ የመመለሻ ሕግ ብቁዎች የሉም እንደሚል ስሜት አግኝቻለሁ፤ መረጃው ግን ሌላ ያረጋግጣል።»

በስብሰባው ላይ ከልዑኩ ከተገኙ መደምደሚያዎች አንዱ **በትግራይ** አይሁዶችና የመመለሻ ሕግ ብቁዎች መኖራቸው እንደሆነ ተገልጿል። የኔሴት አባል **ሞሼ ሰለሞን** (ሃባይት ሃየሁዲ) ብቁ የሆኑ ሰዎች ለመሰደድ የመንግሥት ውሳኔዎችን መጠበቅ የለባቸውም ብለዋል።

ልዩነቱ አስፈላጊ ነው፦ **የመመለሻ ሕግ** በተለየ የመንግሥት ውሳኔ ላይ የማይመሠረት የብቁነት መንገድ ነው — ከፈላሽ ሙራ መስመር በተለየ፣ የእነሱ ስደት በተለዩ የመንግሥት ውሳኔዎችና በተለየ በጀት የሚመራ ነው።

## ገና ያልቆመው ዴስክ

ስብሰባው በሕዝብ ባለሥልጣን ውስጥ **የኢትዮጵያ ዴስክ** ማቋቋም መዘግየቱን የሚተች ሐሳብም ሰምቷል። በዘገባው መሠረት፣ ሙሉ ሥራቸው ማመልከቻዎችን መያዝ ለሚሆን የባለሥልጣኑ ሠራተኞች **አሥር የሠራተኛ መደቦች ጸድቀዋል** — ነገር ግን ከአሥሩ **ስምንቱ ብቻ ተሞልተዋል**፣ ለእነሱም አካላዊ የሥራ ቦታ ገና አልተገኘም።

## ቀጥሎ ምን ይሆናል

«በተለያዩ ምርመራዎች ላይ» ያሉት ማመልከቻዎች አሁን ሊከታተሉት የሚገባ ቁጥር ናቸው፤ እንዲሁም ያልተገመገሙትን አካባቢዎች የሚሸፍን ተጨማሪ ልዑክ ይሄድ እንደሆነ። ስለ በጀትና ኦዲት ዳራ በተለየ ጽፈናል፦ [የ2026 በጀት፣ የካንፎ ኮሚቴና የመንግሥት ኦዲተር](/am/news/ethiopia-aliyah-budget-comptroller-2026)።

ትድሮስ ይህንን እንደ እውነታ ይዘግባል፣ አቋም አይይዝም።

## ምንጮች

- [ዳቫር፣ መስከረም 7 ቀን 2026 — ያሄል ፋራግ](https://www.davar1.co.il/696294/)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "ethiopia-aliyah-budget-comptroller-2026",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    tags: ["immigration", "policy"],
    title: {
      he: "הרקע לדיון: תקציב 2026 ללא הקצאה לעלייה מאתיופיה, דוח קנפו שלא נדון, וביקורת מדינה שנפתחה",
      en: "The background to the session: a 2026 budget with no allocation for Ethiopian aliyah, an undiscussed Kanfo report, and an audit that was opened",
      am: "የስብሰባው ዳራ፦ ለኢትዮጵያ ዓሊያ ምንም ድልድል የሌለው የ2026 በጀት፣ ያልተወያዩበት የካንፎ ሪፖርት፣ እና የተከፈተ ኦዲት",
    },
    excerpt: {
      he: "כדי להבין את דיון ועדת העלייה מ-7.9.2026 צריך את מה שקדם לו. שלושה דיווחים של \"דבר\" מינואר ומפברואר 2026 מתעדים תקציב שנתי רביעי ברציפות ללא הקצאה לעלייה מאתיופיה, 1,226 מאושרי עלייה שממתינים, ופתיחת ביקורת של מבקר המדינה.",
      en: "To understand the Aliyah Committee session of 7 September 2026, you need what preceded it. Three Davar reports from January and February 2026 document a fourth consecutive annual budget with no allocation for Ethiopian aliyah, 1,226 approved immigrants still waiting, and the opening of a State Comptroller audit.",
      am: "የመስከረም 7 ቀን 2026ን የዓሊያ ኮሚቴ ስብሰባ ለመረዳት ከዚያ በፊት የነበረውን ማወቅ ያስፈልጋል። ከጥር እና የካቲት 2026 የወጡ ሦስት የዳቫር ዘገባዎች ለኢትዮጵያ ዓሊያ ድልድል የሌለው አራተኛ ተከታታይ ዓመታዊ በጀት፣ 1,226 የጸደቀላቸው ተጠባባቂዎች፣ እና የመንግሥት ኦዲተር ኦዲት መከፈትን ይመዘግባሉ።",
    },
    bodies: {
      he: `## למה כתבה על מה שקרה לפני שבעה חודשים

ב-7.9.2026 התקיים דיון בוועדת העלייה של הכנסת, שבו נחשף שמשלחת מצאה זכאי חוק השבות באתיופיה — [כתבנו עליו בנפרד](/he/news/aliyah-committee-tigray-law-of-return-2026). הדיון הזה לא מתרחש בחלל ריק, ובלי הרקע קשה להבין למה חברי כנסת הגיבו אליו כפי שהגיבו.

הכתבה הזו מרכזת את מה שקדם. **הדיווחים שבבסיסה הם מינואר ומפברואר 2026** — הם אינם חדשות מהשבוע, והם מסומנים ככאלה בכוונה.

## התקציב

לפי דיווח של **יהל פרג' ב"דבר", 28.1.2026**, תקציב משרד העלייה והקליטה לשנת 2026 אינו כולל הקצאה ייעודית לעלייה מאתיופיה — **השנה הרביעית ברציפות**.

באותו דיווח: **כ-1,226 אנשים שעלייתם כבר אושרה** אינם יכולים לעלות בשל מגבלות תקציב, בעוד אלפים ממתינים במחנות בגונדר ובאדיס אבבה.

לפי הדיווח, המשרד כן הקצה משאבים לעידוד עלייה ממדינות דוברות אנגלית, ובכלל זה **עשרה תקנים** שעניינם גיוס עולים מצפון אמריקה.

לשכת השר **אופיר סופר** מסרה בתגובה שמשלחת תבחן בקרוב זכאות לפי חוק השבות, ואמרה: "אם יימצאו זכאי חוק שבות, לא יהיה מחסום תקציבי לעלייתם". המשלחת הזו היא בדיוק זו שדוחותיה נדונו בכנסת ב-7.9.2026.

## דוח קנפו

לפי אותו דיווח, ועדה בראשות **סגן אלוף הראל קנפו**, שהוקמה לבקשת השר סופר, הגישה ביוני 2024 דוח שהציג **ארבע חלופות** להמשך העלייה מאתיופיה. הדוח לא הובא לדיון בממשלה.

## ביקורת המדינה

ב-**11.2.2026** דיווחה "דבר" (יהל פרג') שמבקר המדינה **מתניהו אנגלמן** הודיע על פתיחת ביקורת שתבחן את יישום החלטות הממשלה בנוגע לעלייתם של שארית יהדות אתיופיה וזרע ישראל, "במטרה להציג לכנסת תמונה מלאה ולהניע לפעולה". ההודעה נמסרה בדיון בוועדה לענייני ביקורת המדינה של הכנסת. לפי הדיווח, אנגלמן לא התחייב ללוח זמנים להגשת הממצאים.

מאז סיום מבצע "צור ישראל" ביולי 2023, נמסר באותו דיווח, לא עלו עולים מאתיופיה.

## מה עוד לא ידוע

- **מתי יוגשו ממצאי ביקורת המדינה.** לא נקבע מועד.
- **אם ומתי תידון חלופה מארבע חלופות ועדת קנפו** בממשלה.
- **מה ייעשה עם 1,226 מאושרי העלייה** הממתינים.

נעקוב ונעדכן. אם מצבך או מצב בן משפחה קשור לאחת השאלות האלה, ראו את [מדריכי הזכויות](/he/rights) ואת [רשימת הארגונים](/he/orgs) שלנו.

טדרוס מדווח על הדברים כעובדה ואינו מביע עמדה.

## מקורות

- ["דבר", ‏28.1.2026 — יהל פרג', "תקציב העלייה: מיליונים ליהודי צפון אמריקה, אפס לממתינים לעלייה מאתיופיה"](https://www.davar1.co.il/651520/)
- ["דבר", ‏11.2.2026 — יהל פרג', "מבקר המדינה: פותח בביקורת על העיכוב בהעלאת יהודי אתיופיה"](https://www.davar1.co.il/653569/)
- [משרד מבקר המדינה — "נבדוק את העלאת שארית יהדות אתיופיה וזרע ישראל", 10.2.2026](https://www.mevaker.gov.il/newsroom/2026-02-10)
- [הכתבה שלנו על דיון ועדת העלייה, 7.9.2026](/he/news/aliyah-committee-tigray-law-of-return-2026)`,
      en: `## Why an article about something seven months old

On 7 September 2026 the Knesset Aliyah Committee held a session at which it emerged that a delegation had found Law of Return eligibles in Ethiopia — [we covered it separately](/en/news/aliyah-committee-tigray-law-of-return-2026). That session does not take place in a vacuum, and without the background it is hard to understand why MKs reacted to it as they did.

This article gathers what came before. **The reports it rests on are from January and February 2026** — they are not this week's news, and they are marked as such deliberately.

## The budget

Per a report by **Yahel Farag in Davar, 28 January 2026**, the Ministry of Aliyah and Integration's 2026 budget contains no dedicated allocation for aliyah from Ethiopia — **the fourth consecutive year**.

In the same report: **roughly 1,226 people whose aliyah has already been approved** cannot immigrate because of budget constraints, while thousands wait in camps in Gondar and Addis Ababa.

Per the report, the ministry did allocate resources to encourage immigration from English-speaking countries, including **ten positions** dedicated to recruitment in North America.

The office of Minister **Ofir Sofer** responded that a delegation would shortly examine eligibility under the Law of Return, saying: "If Law of Return eligibles are found, there will be no budgetary obstacle to their aliyah." That delegation is precisely the one whose findings were discussed in the Knesset on 7 September 2026.

## The Kanfo report

Per the same report, a committee headed by **Lt. Col. Harel Kanfo**, established at Minister Sofer's request, submitted a report in June 2024 presenting **four alternatives** for continuing aliyah from Ethiopia. The report was not brought before the government for discussion.

## The State Comptroller audit

On **11 February 2026** Davar (Yahel Farag) reported that State Comptroller **Matanyahu Englman** announced the opening of an audit examining the implementation of government decisions on the aliyah of the remnant of Ethiopian Jewry and Zera Israel, "with the aim of presenting the Knesset a complete picture and spurring action". The announcement was made at a session of the Knesset State Control Committee. Per the report, Englman did not commit to a timeline for submitting the findings.

Since Operation Tzur Israel ended in July 2023, the same report stated, no immigrants have come from Ethiopia.

## What is still unknown

- **When the comptroller's findings will be submitted.** No date has been set.
- **Whether and when one of the Kanfo committee's four alternatives** will be discussed by the government.
- **What will be done about the 1,226 approved immigrants** still waiting.

We will follow and update. If your situation or a family member's touches on one of these questions, see our [rights guides](/en/rights) and our [organisations directory](/en/orgs).

Tedros reports this as fact and takes no position.

## Sources

- [Davar, 28 Jan 2026 — Yahel Farag, "The aliyah budget: millions for North American Jews, zero for those waiting to immigrate from Ethiopia"](https://www.davar1.co.il/651520/)
- [Davar, 11 Feb 2026 — Yahel Farag, "State Comptroller: opening an audit into the delay in bringing Ethiopian Jews"](https://www.davar1.co.il/653569/)
- [Office of the State Comptroller — "We will audit the aliyah of the remnant of Ethiopian Jewry and Zera Israel", 10 Feb 2026](https://www.mevaker.gov.il/newsroom/2026-02-10)
- [Our article on the Aliyah Committee session, 7 Sept 2026](/en/news/aliyah-committee-tigray-law-of-return-2026)`,
      am: `## ከሰባት ወር በፊት ስለተከሰተ ነገር ለምን ዘገባ

መስከረም 7 ቀን 2026 የኔሴት የዓሊያ ኮሚቴ ስብሰባ አካሂዷል፤ በዚያም ልዑክ በኢትዮጵያ የመመለሻ ሕግ ብቁዎችን ማግኘቱ ተገለጸ — [በተለየ ዘግበናል](/am/news/aliyah-committee-tigray-law-of-return-2026)። ያ ስብሰባ በባዶ ቦታ ላይ አይካሄድም፤ ዳራው ከሌለም የኔሴት አባላት ለምን እንደዚያ እንደመለሱ መረዳት ከባድ ነው።

ይህ ዘገባ ከዚያ በፊት የነበረውን ያሰባስባል። **የተመሠረተባቸው ዘገባዎች ከጥር እና ከየካቲት 2026 ናቸው** — የዚህ ሳምንት ዜና አይደሉም፣ ሆን ተብሎም እንደዚያ ተለይተዋል።

## በጀቱ

**ያሄል ፋራግ በዳቫር፣ ጥር 28 ቀን 2026** ባቀረበው ዘገባ መሠረት፣ የዓሊያና የመቀበል ሚኒስቴር የ2026 በጀት ለኢትዮጵያ ዓሊያ የተለየ ድልድል አልያዘም — **አራተኛው ተከታታይ ዓመት**።

በዚያው ዘገባ፦ **ዓሊያቸው አስቀድሞ የጸደቀላቸው 1,226 ሰዎች** በበጀት እጥረት ምክንያት መሰደድ አይችሉም፤ በዚህ ጊዜ ሺዎች በጎንደርና በአዲስ አበባ ካምፖች ይጠባበቃሉ።

በዘገባው መሠረት፣ ሚኒስቴሩ እንግሊዝኛ ተናጋሪ ከሆኑ አገሮች ስደትን ለማበረታታት ሀብት መድቧል፣ በሰሜን አሜሪካ ለሚደረግ ምልመላ የተመደቡ **አሥር መደቦችን** ጨምሮ።

የሚኒስትር **ኦፊር ሶፈር** ጽሕፈት ቤት ልዑክ በቅርቡ በመመለሻ ሕግ ብቁነትን እንደሚመረምር መልስ ሰጥቷል፦ «የመመለሻ ሕግ ብቁዎች ከተገኙ፣ ለዓሊያቸው የበጀት እንቅፋት አይኖርም።» ያ ልዑክ መስከረም 7 ቀን 2026 በኔሴት ግኝቶቹ የተወያዩበት ልክ ያው ነው።

## የካንፎ ሪፖርት

በዚያው ዘገባ መሠረት፣ በሚኒስትር ሶፈር ጥያቄ የተቋቋመ በ**ሌተና ኮሎኔል ሃረል ካንፎ** የሚመራ ኮሚቴ በሰኔ 2024 ከኢትዮጵያ ዓሊያን ለመቀጠል **አራት አማራጮችን** ያቀረበ ሪፖርት አስረክቧል። ሪፖርቱ ለመንግሥት ውይይት አልቀረበም።

## የመንግሥት ኦዲት

**የካቲት 11 ቀን 2026** ዳቫር (ያሄል ፋራግ) እንደዘገበው፣ የመንግሥት ኦዲተር **ማታንያሁ እንግልማን** የቀሩት የኢትዮጵያ አይሁዶችና የዘራ እስራኤል ዓሊያን በተመለከተ የመንግሥት ውሳኔዎችን አፈጻጸም የሚመረምር ኦዲት መከፈቱን አስታውቀዋል፤ «ለኔሴት ሙሉ ምስል ለማቅረብና እርምጃ ለማነሳሳት በማሰብ»። ማስታወቂያው በኔሴት የመንግሥት ቁጥጥር ኮሚቴ ስብሰባ ላይ ተሰጥቷል። በዘገባው መሠረት፣ እንግልማን ግኝቶቹን ለማቅረብ የጊዜ ገደብ አልገቡም።

የጹር እስራኤል ዘመቻ በሐምሌ 2023 ካበቃ በኋላ፣ በዚያው ዘገባ እንደተገለጸው፣ ከኢትዮጵያ ስደተኞች አልመጡም።

## ገና ያልታወቀው

- **የኦዲተሩ ግኝቶች መቼ እንደሚቀርቡ።** ቀን አልተወሰነም።
- **ከካንፎ ኮሚቴ አራት አማራጮች አንዱ በመንግሥት ይወያይ እንደሆነና መቼ**።
- **ስለሚጠባበቁት 1,226 የጸደቀላቸው ስደተኞች ምን እንደሚደረግ**።

እንከታተላለን፣ እናዘምናለን። የእርስዎ ወይም የቤተሰብ አባልዎ ሁኔታ ከእነዚህ ጥያቄዎች አንዱን የሚነካ ከሆነ፣ የእኛን [የመብቶች መመሪያዎች](/am/rights) እና [የድርጅቶች ማውጫ](/am/orgs) ይመልከቱ።

ትድሮስ ይህንን እንደ እውነታ ይዘግባል፣ አቋም አይይዝም።

## ምንጮች

- [ዳቫር፣ ጥር 28 ቀን 2026 — ያሄል ፋራግ](https://www.davar1.co.il/651520/)
- [ዳቫር፣ የካቲት 11 ቀን 2026 — ያሄል ፋራግ](https://www.davar1.co.il/653569/)
- [የመንግሥት ኦዲተር ጽሕፈት ቤት፣ የካቲት 10 ቀን 2026](https://www.mevaker.gov.il/newsroom/2026-02-10)
- [ስለ ዓሊያ ኮሚቴ ስብሰባ የእኛ ዘገባ፣ መስከረም 7 ቀን 2026](/am/news/aliyah-committee-tigray-law-of-return-2026)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
];
