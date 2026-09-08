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
];
