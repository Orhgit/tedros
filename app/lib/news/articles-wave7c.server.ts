// Wave 7c articles — Content & SEO batch (TED).
// 6 short news items (150-300 words per language): 2 documented racism
// cases handled by Tebeka, the 2025 Sigd central prayer gathering, a
// Knesset protest demanding Aliyah resume, a Herzog-Abiy Ahmed diplomatic
// meeting, and a Tebeka scholarship/mentorship announcement.
//
// All facts sourced from materials supplied in the task brief — no
// additional research was performed. Racist slurs are described, not
// quoted, per the brief's guidance.
import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE7C: NewsArticleEntry[] = [
  {
    slug: "gas-station-racism-case-veteran-soldier",
    publishedAt: "2026-02-05",
    updatedAt: "2026-02-05",
    tags: ["civic", "rights"],
    title: {
      he: "גזענות בתחנת דלק: חייל קרבי משוחרר יוצא אתיופיה פנה לטבקה",
      en: "Racism at a gas station: a discharged combat veteran of Ethiopian descent turns to Tebeka",
      am: "በነዳጅ ማደያ ዘረኝነት፦ የኢትዮጵያ ተወላጅ የቀድሞ ተዋጊ ወታደር ወደ ቴቤካ ተመለሰ",
    },
    excerpt: {
      he: "לקוחה בתחנת דלק פנתה בכינויי גנאי גזעניים חמורים לצעיר יוצא אתיופיה, חייל קרבי משוחרר, כשביקש שתמתין. מנהל התחנה תמך בו, וטבקה פתחה בהליך משפטי.",
      en: "A customer at a gas station used severe racist slurs against a young discharged combat veteran of Ethiopian descent who asked her to wait her turn. The station manager backed him, and Tebeka opened a legal process.",
      am: "በነዳጅ ማደያ ደንበኛ የኢትዮጵያ ተወላጅ የቀድሞ ተዋጊ ወታደርን በዘረኝነት ተሳደበች። የማደያው ሥራ አስኪያጅ ደገፈው፣ ቴቤካም የሕግ ሂደት ጀመረ።",
    },
    bodies: {
      he: `צעיר בן 21, יוצא אתיופיה ששירת כלוחם ושוחרר לאחרונה משירות צבאי, פנה לעמותת טבקה לאחר אירוע גזענות שחווה במקום עבודתו — תחנת דלק.

לפי הפנייה לטבקה, לקוחה שהמתינה בתור כעסה כאשר התבקשה להמתין עד שהצעיר יסיים לשרת לקוח שהגיע לפניה, ובתגובה פנתה אליו בשימוש בכינויי גנאי גזעניים חמורים. הצעיר תיאר את הפגיעה שחש מהאירוע, בפרט לאחר ששירת את המדינה כלוחם.

מנהל תחנת הדלק תמך בעובד באירוע ותיעד את פרטי הלקוחה ואת נסיבות המקרה, מה שאפשר לעמותת טבקה — הפועלת למיצוי זכויות ולמאבק בגזענות נגד יוצאי אתיופיה בישראל — לפתוח בהליך משפטי בעניין.

המקרה מצטרף לשורת פניות דומות המתועדות אצל טבקה, ומדגים כיצד תיעוד מיידי של המעסיק בזמן אמת יכול לתמוך בעובד שנפגע ולסייע בהמשך ההליך המשפטי.

## מקור

- [טבקה — "אחרי כל מה שנתתי למדינה, לא האמנתי שאשמע"](https://www.tebeka.org.il/public/אחרי-כל-מה-שנתתי-למדינה-לא-האמנתי-שאשמע/)

## ראו גם

- [חדשות נוספות](/he/news)`,
      en: `A 21-year-old man of Ethiopian descent, a discharged combat veteran, turned to the Tebeka association after a racist incident at his workplace — a gas station.

According to his complaint to Tebeka, a customer waiting in line grew angry when asked to wait until he finished serving another customer who had arrived before her, and responded by directing severe racist slurs at him. The young man described how hurt he felt by the incident, particularly after having served the country as a combat soldier.

The gas station manager backed the employee during the incident and documented the customer's details and the circumstances of the case, which allowed Tebeka — an organization working to advance the rights of, and fight racism against, Ethiopian-Israelis — to open a legal process on the matter.

The case joins a series of similar complaints documented by Tebeka, and illustrates how an employer's real-time documentation can support an employee who was harmed and assist in the subsequent legal process.

## Source

- [Tebeka — "After everything I gave the state, I didn't believe I'd hear this"](https://www.tebeka.org.il/public/אחרי-כל-מה-שנתתי-למדינה-לא-האמנתי-שאשמע/)

## See also

- [More news](/en/news)`,
      am: `21 ዓመት የሆነው የኢትዮጵያ ተወላጅ ወጣት፣ የቀድሞ ተዋጊ ወታደር፣ በሥራ ቦታው — በነዳጅ ማደያ — ካጋጠመው የዘረኝነት ክስተት በኋላ ወደ ቴቤካ ማህበር ተመለሰ።

ወደ ቴቤካ በቀረበው ቅሬታ መሰረት፣ በተራ የቆመች ደንበኛ ከእሱ በፊት የደረሰን ሌላ ደንበኛ እስኪያገለግል መጠበቅ ስትጠየቅ ተቆጣች፣ በምላሹም ከባድ የዘረኝነት ስድቦችን ሰነዘረችበት። ወጣቱ ለሀገር እንደ ተዋጊ ወታደር ካገለገለ በኋላ በተለይ ምን ያህል እንደተጎዳ ገልጿል።

የነዳጅ ማደያው ሥራ አስኪያጅ በክስተቱ ወቅት ሠራተኛውን ደግፎ የደንበኛዋን ዝርዝሮች እና የክስተቱን ሁኔታ መዝግቧል፣ ይህም ለኢትዮጵያ ተወላጆች መብት ማስከበር እና ዘረኝነትን የመታገል ሥራ ለምትሠራው ቴቤካ ማህበር የሕግ ሂደት እንድትጀምር አስችሏታል።

## ምንጭ

- [ቴቤካ](https://www.tebeka.org.il/public/אחרי-כל-מה-שנתתי-למדינה-לא-האמנתי-שאשמע/)

## ይመልከቱ

- [ተጨማሪ ዜናዎች](/am/news)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "clothing-store-racism-case",
    publishedAt: "2026-04-12",
    updatedAt: "2026-04-12",
    tags: ["civic", "rights"],
    title: {
      he: "גזענות בחנות בגדים כלפי אישה יוצאת אתיופיה — טבקה מטפלת בפרשה",
      en: "Racism at a clothing store toward a woman of Ethiopian descent — Tebeka takes up the case",
      am: "በልብስ ሱቅ ዘረኝነት በኢትዮጵያ ተወላጅ ሴት ላይ — ቴቤካ ጉዳዩን ትከታተላለች",
    },
    excerpt: {
      he: "אישה יוצאת אתיופיה שנכנסה לחנות בגדים לרכישה רגילה הותעלמה על ידי המוכרת ובהמשך זכתה לתגובה משפילה עם אמירות גזעניות. היא פנתה לטבקה לתיעוד וטיפול משפטי.",
      en: "A woman of Ethiopian descent who entered a clothing store for a routine purchase was ignored by the salesperson and later met with a humiliating response involving racist remarks. She turned to Tebeka for documentation and legal handling.",
      am: "ወደ ልብስ ሱቅ ለተለመደ ግዢ የገባች የኢትዮጵያ ተወላጅ ሴት በሻጭዋ ችላ ተባለች፣ ቀጥሎም አዋራጅ ምላሽ ከዘረኝነት ንግግር ጋር ደረሳት። ወደ ቴቤካ ተመለሰች።",
    },
    bodies: {
      he: `אישה יוצאת אתיופיה שנכנסה לחנות בגדים לרכישה רגילה פנתה לעמותת טבקה לאחר שחוותה בה יחס גזעני.

לפי הפנייה, המוכרת בחנות התעלמה ממנה תחילה, ובהמשך — כאשר האישה ניסתה לקבל שירות — הגיבה בתגובה משפילה שכללה אמירות גזעניות כלפיה. האישה תיארה את התחושה הקשה שנותרה אצלה מהאירוע, שהתרחש במסגרת פעולה יומיומית פשוטה כמו קנייה בחנות בגדים.

האישה פנתה לעמותת טבקה, המתעדת ומטפלת משפטית במקרי גזענות נגד יוצאי אתיופיה בישראל, לצורך תיעוד האירוע וקידום טיפול משפטי בפרשה.

המקרה, כמו מקרים דומים שתיעדה טבקה בעבר, ממחיש כיצד גזענות יכולה לבוא לידי ביטוי גם באינטראקציות יומיומיות שגרתיות לכאורה, ואת החשיבות של פנייה מיידית לגורם מטפל לצורך תיעוד ומיצוי זכויות.

## מקור

- [טבקה — "מה את עושה פה בכלל? אתיופית... תחזרי"](https://www.tebeka.org.il/public/מה-את-עושה-פה-בכלל-אתיופית-מסריחה-תחזרי/)

## ראו גם

- [חדשות נוספות](/he/news)`,
      en: `A woman of Ethiopian descent who entered a clothing store for a routine purchase turned to Tebeka after experiencing racist treatment there.

According to her complaint, the store's salesperson initially ignored her, and later — when the woman tried to get service — responded with a humiliating reply that included racist remarks directed at her. She described the difficult feeling that stayed with her from the incident, which occurred during a simple, everyday activity like shopping at a clothing store.

She turned to Tebeka, which documents and provides legal handling for racism cases against Ethiopian-Israelis, to document the incident and pursue legal action.

The case, like similar ones documented by Tebeka in the past, illustrates how racism can surface even in seemingly routine, everyday interactions, and underscores the importance of reaching out to a support organization promptly for documentation and to pursue one's rights.

## Source

- [Tebeka — "What are you even doing here? Go back..."](https://www.tebeka.org.il/public/מה-את-עושה-פה-בכלל-אתיופית-מסריחה-תחזרי/)

## See also

- [More news](/en/news)`,
      am: `ወደ ልብስ ሱቅ ለተለመደ ግዢ የገባች የኢትዮጵያ ተወላጅ ሴት በሱቁ ውስጥ ዘረኛ አያያዝ ካጋጠማት በኋላ ወደ ቴቤካ ማህበር ተመለሰች።

በቅሬታዋ መሰረት፣ በሱቁ ውስጥ ያለችው ሻጭ በመጀመሪያ ችላ ብላታለች፣ ቀጥሎም — ሴትዮዋ አገልግሎት ለማግኘት ስትሞክር — ዘረኛ ንግግርን ያካተተ አዋራጅ ምላሽ ሰጠቻት። ሴትዮዋ ከክስተቱ የተረፋትን ከባድ ስሜት ገልጻለች፣ ክስተቱ በልብስ ሱቅ ግዢ ያለ ተራ ዕለታዊ ተግባር ውስጥ የተከሰተ ነው።

ክስተቱን ለመዝግብ እና የሕግ ክትትል ለማድረግ ወደ ቴቤካ ማህበር ተመለሰች፣ ማህበሩ በኢትዮጵያ ተወላጆች ላይ የሚደርሱ የዘረኝነት ጉዳዮችን የሚመዘግብ እና በሕግ የሚከታተል ነው።

## ምንጭ

- [ቴቤካ](https://www.tebeka.org.il/public/מה-את-עושה-פה-בכלל-אתיופית-מסריחה-תחזרי/)

## ይመልከቱ

- [ተጨማሪ ዜናዎች](/am/news)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "sigd-2025-central-prayer-jerusalem",
    publishedAt: "2025-11-20",
    updatedAt: "2025-11-20",
    tags: ["holiday", "community"],
    title: {
      he: "עצרת התפילה המרכזית של חג הסיגד 2025 בירושלים",
      en: "The 2025 Sigd central prayer gathering in Jerusalem",
      am: "የ2025 ሲግድ በዓል ማዕከላዊ የጸሎት ስብሰባ በኢየሩሳሌም",
    },
    excerpt: {
      he: "עצרת התפילה המרכזית של חג הסיגד נערכה בירושלים בטיילת שרובר, עם ברכת המדינה ב-12:30 וסיום הצום ב-14:00. הכתבה סקרה גם את השתלבות יוצאי אתיופיה בשירותי הביטחון.",
      en: "The central Sigd prayer gathering was held in Jerusalem on the Sherover Promenade, with a state blessing at 12:30 and the fast ending at 14:00. Coverage also addressed Ethiopian-Israeli integration into security services.",
      am: "የሲግድ ማዕከላዊ የጸሎት ስብሰባ በኢየሩሳሌም ሸሮቨር ፕሮሜናድ ተካሂዷል፣ በ12:30 የመንግስት ቡራኬ እና በ14:00 ጾም ፍጻሜ ጋር።",
    },
    bodies: {
      he: `עצרת התפילה המרכזית של חג הסיגד 2025 נערכה בירושלים, בטיילת שרובר, במסגרת אירועי החג המסורתי לקהילה האתיופית שמציין את הכמיהה לירושלים.

לפי סדר האירועים, ברכת המדינה נישאה בשעה 12:30, וצום החג הסתיים בשעה 14:00 — כמקובל במסגרת מנהגי החג, שבו הצום נשבר לאחר סיום התפילות המרכזיות.

הסיקור התייחס גם להשתלבות יוצאי אתיופיה בשירותי הביטחון בישראל — במשטרה, בשירות בתי הסוהר (שב"ס) ובשירותי כיבוי האש — עם התייחסות מצד שר הביטחון הפנים איתמר בן גביר לנושא.

חג הסיגד, המצוין כ-50 ימים לאחר יום הכיפורים, הוא אחד ממועדי החג המרכזיים של יהדות אתיופיה, ומאז 2008 מוכר בישראל כחג רשמי המצוין באירועים ציבוריים ברחבי הארץ.

## מקור

- [ahlla.co.il](https://ahlla.co.il/news/17389/)

## ראו גם

- [חדשות נוספות](/he/news)`,
      en: `The central prayer gathering of the 2025 Sigd holiday was held in Jerusalem, on the Sherover Promenade, as part of the traditional holiday's events for the Ethiopian-Israeli community, which marks the community's yearning for Jerusalem.

Per the event schedule, the state's blessing was delivered at 12:30, and the holiday fast ended at 14:00 — in line with the holiday's customs, where the fast is broken after the central prayers conclude.

Coverage also addressed the integration of Ethiopian-Israelis into Israel's security services — the police, the Israel Prison Service, and firefighting services — with Public Security Minister Itamar Ben Gvir addressing the topic.

Sigd, marked 50 days after Yom Kippur, is one of the central holidays of Ethiopian Jewry, and since 2008 has been officially recognized in Israel, marked with public events around the country.

## Source

- [ahlla.co.il](https://ahlla.co.il/news/17389/)

## See also

- [More news](/en/news)`,
      am: `የ2025 ሲግድ በዓል ማዕከላዊ የጸሎት ስብሰባ በኢየሩሳሌም፣ በሸሮቨር ፕሮሜናድ ተካሂዷል፣ ለኢትዮጵያ ማህበረሰብ ወደ ኢየሩሳሌም ያለውን ናፍቆት የሚያመለክት ባህላዊ በዓል አካል ሆኖ።

እንደ ክንውኖቹ ቅደም ተከተል፣ የመንግስት ቡራኬ በ12:30 ተነግሯል፣ የበዓሉ ጾምም በ14:00 ተጠናቋል — ማዕከላዊ ጸሎቶች ካለቁ በኋላ ጾሙ እንደሚፈታ በሚያዘው የበዓሉ ልማድ መሰረት።

ዘገባው በእስራኤል የፀጥታ አገልግሎቶች — በፖሊስ፣ በእስር ቤቶች አገልግሎት እና በእሳት አደጋ አገልግሎቶች — ውስጥ የኢትዮጵያ ተወላጆች ውህደትንም ዳስሷል፣ የውስጥ ደህንነት ሚኒስትር ኢታማር ቤን ግቪር በርዕሱ ላይ ካደረጉት አስተያየት ጋር።

ሲግድ፣ ከዮም ኪፑር በኋላ በ50ኛው ቀን የሚከበር፣ ከኢትዮጵያ አይሁድ ማዕከላዊ በዓላት አንዱ ነው፣ ከ2008 ጀምሮም በእስራኤል ውስጥ በይፋ የተከበረ ብሔራዊ በዓል ሆኖ ይታወቃል።

## ምንጭ

- [ahlla.co.il](https://ahlla.co.il/news/17389/)

## ይመልከቱ

- [ተጨማሪ ዜናዎች](/am/news)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "knesset-protest-2000-demand-aliyah-resume",
    publishedAt: "2026-02-01",
    updatedAt: "2026-02-01",
    tags: ["immigration", "civic", "policy"],
    title: {
      he: "כ-2,000 מפגינים יוצאי אתיופיה מול הכנסת: דרישה לחדש את העלייה",
      en: "About 2,000 Ethiopian-Israeli protesters rally at the Knesset, demanding Aliyah resume",
      am: "ወደ 2,000 የሚጠጉ ኢትዮጵያ-እስራኤላውያን ተቃዋሚዎች በክኔሴት ፊት፦ ዓሊያ እንዲቀጥል ጠየቁ",
    },
    excerpt: {
      he: "ארגון 'כוח לעלייה' ארגן הפגנה מול הכנסת בדרישה שהממשלה תגדיל את התקציב לעלייה ותביא ארצה קרובי משפחה, על רקע כ-10,000 ממתינים באתיופיה ומלחמת אזרחים מדרדרת.",
      en: "The 'Koach LaAliyah' organization staged a protest at the Knesset demanding the government increase the Aliyah budget and bring family members to Israel, amid roughly 10,000 waiting in Ethiopia and a worsening civil war.",
      am: "'ኮች ላአሊያ' ድርጅት መንግስት ለዓሊያ በጀት እንዲጨምር እና ቤተሰቦችን ወደ እስራኤል እንዲያመጣ በመጠየቅ በክኔሴት ፊት ተቃውሞ አካሄደ።",
    },
    bodies: {
      he: `כ-2,000 מפגינים מהקהילה האתיופית בישראל התקבצו מחוץ לכנסת בהפגנה שאירגן ארגון "כוח לעלייה", בדרישה שהממשלה תגדיל את התקציב המוקצה לתהליך העלייה מאתיופיה ותפעל להבאת קרובי משפחה של ישראלים יוצאי אתיופיה ארצה.

לפי הכתבה, הדרישה מגיעה על רקע הידרדרות מצבם של קרובי המשפחה שנותרו באתיופיה, זאת בהקשר של המלחמה האזרחית המתמשכת במדינה. לפי הכתבה, כ-10,000 בני משפחות של ישראלים ממוצא אתיופי ממתינים כיום באתיופיה לעלייה ארצה.

עוד צוין בכתבה כי מאז יולי 2023 לא בוצעה כל פעולת עלייה חדשה מאתיופיה, כך שהמתנת המשפחות נמשכת ללא התקדמות מוצהרת מצד הרשויות.

המפגינים קראו לממשלה לפעול באופן דחוף להאצת התהליך ולהגדלת המשאבים המוקצים לו.

## מקור

- [The Times of Israel](https://www.timesofisrael.com/protesters-gather-at-knesset-to-demand-government-facilitate-ethiopian-immigration/)

## ראו גם

- [חדשות נוספות](/he/news)`,
      en: `About 2,000 protesters from Israel's Ethiopian-Israeli community gathered outside the Knesset in a demonstration organized by the "Koach LaAliyah" organization, demanding the government increase the budget allocated to the Aliyah process from Ethiopia and act to bring the family members of Ethiopian-Israelis to the country.

According to the report, the demand comes amid a worsening situation for family members who remain in Ethiopia, in the context of the country's ongoing civil war. Per the report, roughly 10,000 family members of Israelis of Ethiopian descent are currently waiting in Ethiopia for Aliyah.

The report also noted that no new Aliyah operation from Ethiopia has taken place since July 2023, meaning families' wait has continued without a stated advance by the authorities.

The protesters called on the government to act urgently to speed up the process and increase the resources allocated to it.

## Source

- [The Times of Israel](https://www.timesofisrael.com/protesters-gather-at-knesset-to-demand-government-facilitate-ethiopian-immigration/)

## See also

- [More news](/en/news)`,
      am: `ወደ 2,000 የሚጠጉ ከኢትዮጵያ-እስራኤል ማህበረሰብ የመጡ ተቃዋሚዎች በ"ኮች ላአሊያ" ድርጅት በተዘጋጀ ተቃውሞ በክኔሴት ፊት ተሰበሰቡ፣ መንግስት ከኢትዮጵያ ለሚደረገው የዓሊያ ሂደት የተመደበውን በጀት እንዲጨምር እና የኢትዮጵያ ተወላጅ እስራኤላውያን ቤተሰብ አባላትን ወደ ሀገር ውስጥ ለማምጣት እንዲሠራ ጠይቀዋል።

እንደ ዘገባው፣ ጥያቄው በኢትዮጵያ ውስጥ ባለው ተከታታይ የእርስ በርስ ጦርነት ምክንያት በኢትዮጵያ የቀሩ ቤተሰብ አባላት ሁኔታ እየተባባሰ በመምጣቱ አውድ ውስጥ ነው። እንደ ዘገባው፣ በአሁኑ ጊዜ ወደ 10,000 የሚጠጉ የኢትዮጵያ ተወላጅ እስራኤላውያን ቤተሰብ አባላት በኢትዮጵያ ለዓሊያ እየጠበቁ ናቸው።

ዘገባው ደግሞ ከጁላይ 2023 ጀምሮ ከኢትዮጵያ አዲስ የዓሊያ ስራ እንዳልተካሄደ ገልጿል፣ ይህም ማለት የቤተሰቦች መጠበቅ ከባለስልጣናት በኩል ምንም የተገለጸ እድገት ሳይኖር ቀጥሏል ማለት ነው።

## ምንጭ

- [The Times of Israel](https://www.timesofisrael.com/protesters-gather-at-knesset-to-demand-government-facilitate-ethiopian-immigration/)

## ይመልከቱ

- [ተጨማሪ ዜናዎች](/am/news)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "herzog-abiy-ahmed-meeting-addis-ababa",
    publishedAt: "2026-02-25",
    updatedAt: "2026-02-25",
    tags: ["civic", "immigration"],
    title: {
      he: "הנשיא הרצוג נפגש עם ראש ממשלת אתיופיה אבי אחמד באדיס אבבה",
      en: "President Herzog meets Ethiopian PM Abiy Ahmed in Addis Ababa",
      am: "ፕሬዝዳንት ኸርዞግ ከኢትዮጵያ ጠቅላይ ሚኒስትር ዐቢይ አህመድ ጋር በአዲስ አበባ ተገናኙ",
    },
    excerpt: {
      he: "הרצוג ואבי אחמד נפגשו באדיס אבבה ודנו בשיפור שיתוף הפעולה בתחומי עניין הדדיים, ימים אחרי שנתניהו הציע ברית אזורית ('hexagon'). כיום חיים בישראל כ-160,000 יהודים ממוצא אתיופי.",
      en: "Herzog and Abiy Ahmed met in Addis Ababa and discussed improving cooperation on issues of mutual interest, days after Netanyahu proposed a regional 'hexagon' alliance. About 160,000 Jews of Ethiopian descent currently live in Israel.",
      am: "ኸርዞግ እና ዐቢይ አህመድ በአዲስ አበባ ተገናኝተው ስለ ትብብር ማሻሻያ ተወያዩ፣ ኔትንያሁ 'ሄክሳጎን' የክልል ጥምረት ካቀረቡ ጥቂት ቀናት በኋላ።",
    },
    bodies: {
      he: `נשיא המדינה יצחק הרצוג נפגש עם ראש ממשלת אתיופיה אבי אחמד באדיס אבבה, ולפי הדיווח דנו השניים ב"דרכים לשיפור שיתוף הפעולה בתחומי עניין הדדיים" בין שתי המדינות.

הפגישה נערכת ימים אחדים לאחר שראש הממשלה בנימין נתניהו הציע הקמת ברית אזורית — המכונה "hexagon" — שמטרתה להתמודד מול יריבים המתוארים כ"רדיקליים" באזור.

הכתבה מזכירה את הקשר ההיסטורי הארוך בין ישראל לאתיופיה, הנשען בין היתר על קהילת בית ישראל — יהודי אתיופיה שעלו לישראל לאורך העשורים האחרונים. לפי הכתבה, כיום חיים בישראל כ-160,000 יהודים ממוצא אתיופי.

הכתבה אינה מפרטת החלטות קונקרטיות שהתקבלו בפגישה, והדיווח מתמקד באופייה הדיפלומטי של הפגישה ובהקשר הרחב יותר של יחסי ישראל-אתיופיה ומדיניות האזור.

## מקור

- [Al Jazeera](https://www.aljazeera.com/news/2026/2/25/will-ethiopia-be-part-of-israels-hexagon-alliance-rivalling-its-enemies)

## ראו גם

- [חדשות נוספות](/he/news)`,
      en: `President Isaac Herzog met with Ethiopian Prime Minister Abiy Ahmed in Addis Ababa, and per the report, the two discussed "ways to improve cooperation on issues of mutual interest" between the two countries.

The meeting took place days after Prime Minister Benjamin Netanyahu proposed establishing a regional alliance — referred to as a "hexagon" — aimed at countering rivals described as "radical" in the region.

The report notes the long historical connection between Israel and Ethiopia, resting in part on the Beta Israel community — Ethiopian Jews who immigrated to Israel over recent decades. Per the report, about 160,000 Jews of Ethiopian descent currently live in Israel.

The report does not detail concrete decisions reached at the meeting, and coverage focuses on the diplomatic nature of the meeting and the broader context of Israel-Ethiopia relations and regional policy.

## Source

- [Al Jazeera](https://www.aljazeera.com/news/2026/2/25/will-ethiopia-be-part-of-israels-hexagon-alliance-rivalling-its-enemies)

## See also

- [More news](/en/news)`,
      am: `ፕሬዝዳንት ይስሐቅ ኸርዞግ ከኢትዮጵያ ጠቅላይ ሚኒስትር ዐቢይ አህመድ ጋር በአዲስ አበባ ተገናኝተዋል፣ እንደ ዘገባው ሁለቱም በሁለቱ ሀገራት መካከል ስላለ የጋራ ጥቅም ጉዳዮች ትብብር ማሻሻያ መንገዶች ተወያይተዋል።

ስብሰባው የተካሄደው ጠቅላይ ሚኒስትር ቢንያሚን ኔትንያሁ በአካባቢው "ሬዲካል" ተብለው የተገለጹ ተቀናቃኞችን ለመቋቋም ያለመ "ሄክሳጎን" የተባለ የክልል ጥምረት ካቀረቡ ከጥቂት ቀናት በኋላ ነው።

ዘገባው በእስራኤልና በኢትዮጵያ መካከል ያለውን የረዥም ጊዜ ታሪካዊ ትስስር ያስታውሳል፣ ይህም በከፊል በቤታ እስራኤል ማህበረሰብ — በቅርብ አስርት ዓመታት ወደ እስራኤል በተሰደዱ የኢትዮጵያ አይሁዶች — ላይ የተመሰረተ ነው። እንደ ዘገባው፣ በአሁኑ ጊዜ ወደ 160,000 የሚጠጉ የኢትዮጵያ ተወላጅ አይሁዶች በእስራኤል ይኖራሉ።

## ምንጭ

- [Al Jazeera](https://www.aljazeera.com/news/2026/2/25/will-ethiopia-be-part-of-israels-hexagon-alliance-rivalling-its-enemies)

## ይመልከቱ

- [ተጨማሪ ዜናዎች](/am/news)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "tebeka-scholarship-24-law-mentorship",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    tags: ["education", "employment", "announcement"],
    title: {
      he: "טבקה פותחת הרשמה למלגה ה-24 ולפרויקט חניכה למשפטנים יוצאי אתיופיה",
      en: "Tebeka opens registration for its 24th scholarship and mentorship project for Ethiopian-Israeli law students",
      am: "ቴቤካ ለ24ኛው ስኮላርሺፕ እና ለኢትዮጵያ ተወላጅ ጠበቆች የአማካሪነት ፕሮጀክት ምዝገባ ከፈተ",
    },
    excerpt: {
      he: "עמותת טבקה, בשיתוף משרד עורכי הדין מיתר, פתחה הרשמה למלגות ולתוכנית חניכה למשפטנים/יות יוצאי אתיופיה לתשפ״ו — השנה ה-24 למלגה והתשיעית לפרויקט החניכה. מועד ההגשה שצוין: 15.6.2026.",
      en: "Tebeka, in partnership with the Meitar law firm, opened registration for scholarships and a mentorship program for Ethiopian-Israeli law students for the 2025/26 academic year — the 24th year of the scholarship and the ninth of the mentorship project. Stated deadline: June 15, 2026.",
      am: "ቴቤካ ማህበር ከሜይታር ጠበቆች ድርጅት ጋር በመተባበር ለኢትዮጵያ ተወላጅ ጠበቆች ስኮላርሺፕ እና የአማካሪነት ፕሮግራም ምዝገባ ከፈተ።",
    },
    bodies: {
      he: `עמותת טבקה, בשיתוף משרד עורכי הדין מיתר, פתחה הרשמה למלגות ולתוכנית חניכה אישית למשפטנים/יות יוצאי אתיופיה לשנת הלימודים תשפ"ו.

מדובר בשנה ה-24 לחלוקת המלגה — הנקראת על שם עו"ד צבי מיתר ז"ל — ובשנה התשיעית לפרויקט החניכה, שמטרתו לחבר סטודנטים/יות למשפטים ומשפטנים/יות צעירים/ות יוצאי אתיופיה עם עורכי דין מנוסים במסגרת אישית.

לפי ההודעה שפורסמה באתר טבקה, מועד ההגשה האחרון למלגה ולתוכנית החניכה נקבע ל-15.6.2026.

**הערה חשובה**: נכון למועד כתיבת כתבה זו, מועד ההגשה שצוין (15.6.2026) כבר חלף. אם אתם משפטנים/יות יוצאי אתיופיה ומעוניינים במלגה או בתוכנית החניכה, מומלץ לפנות ישירות לעמותת טבקה כדי לברר אם נפתח מחזור הרשמה נוסף לשנה הנוכחית או לשנה הבאה.

## מקור

- [עמותת טבקה — מלגה והשתתפות בפרויקט החניכה למשפטנים](https://www.tebeka.org.il/news/מלגה-והשתתפות-בפרויקט-החניכה-למשפטנים/)

## ראו גם

- [חדשות נוספות](/he/news)`,
      en: `Tebeka, in partnership with the Meitar law firm, opened registration for scholarships and a personal mentorship program for Ethiopian-Israeli law students and young lawyers for the 2025/26 academic year.

This marks the 24th year of the scholarship — named for the late attorney Zvi Meitar — and the ninth year of the mentorship project, which pairs law students and young Ethiopian-Israeli lawyers with experienced attorneys in a one-on-one framework.

Per the announcement published on Tebeka's site, the stated deadline for applying to the scholarship and mentorship program was set at June 15, 2026.

**Important note**: as of the writing of this article, the stated deadline (June 15, 2026) has already passed. If you are an Ethiopian-Israeli law student or lawyer interested in the scholarship or mentorship program, it's recommended to contact Tebeka directly to check whether an additional registration round has opened for the current or upcoming year.

## Source

- [Tebeka — scholarship and mentorship project for lawyers](https://www.tebeka.org.il/news/מלגה-והשתתפות-בפרויקט-החניכה-למשפטנים/)

## See also

- [More news](/en/news)`,
      am: `ቴቤካ ማህበር ከሜይታር ጠበቆች ድርጅት ጋር በመተባበር ለ2025/26 ትምህርት ዓመት ለኢትዮጵያ ተወላጅ የሕግ ተማሪዎችና ወጣት ጠበቆች ስኮላርሺፕ እና የግል የአማካሪነት ፕሮግራም ምዝገባ ከፈተ።

ይህ ለስኮላርሺፑ 24ኛ ዓመት ነው — በተቀዳሚው ጠበቃ ዝቪ ሜይታር ስም የተሰየመ — እና ለአማካሪነት ፕሮጀክቱ ዘጠነኛ ዓመት፣ ዓላማውም የሕግ ተማሪዎችንና ወጣት የኢትዮጵያ ተወላጅ ጠበቆችን ልምድ ካላቸው ጠበቆች ጋር በግል ማገናኘት ነው።

በቴቤካ ድረ-ገጽ በወጣው ማስታወቂያ መሰረት፣ ለስኮላርሺፑ እና ለአማካሪነት ፕሮግራሙ ማመልከቻ የመጨረሻ ቀን ሰኔ 15, 2026 ተብሎ ተወስኗል።

**አስፈላጊ ማሳሰቢያ**፦ ይህ ጽሑፍ በተጻፈበት ጊዜ፣ የተጠቀሰው የመጨረሻ ቀን (ሰኔ 15, 2026) አልፏል። የኢትዮጵያ ተወላጅ የሕግ ተማሪ ወይም ጠበቃ ከሆኑ እና ስኮላርሺፑ ወይም የአማካሪነት ፕሮግራሙ ላይ ፍላጎት ካላችሁ፣ ለአሁኑ ወይም ለሚቀጥለው ዓመት ተጨማሪ የምዝገባ ዙር ተከፍቶ እንደሆነ በቀጥታ ከቴቤካ ጋር እንድትገናኙ ይመከራል።

## ምንጭ

- [ቴቤካ](https://www.tebeka.org.il/news/מלגה-והשתתפות-בפרויקט-החניכה-למשפטנים/)

## ይመልከቱ

- [ተጨማሪ ዜናዎች](/am/news)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
];
