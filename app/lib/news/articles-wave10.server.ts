// Wave 10 articles — manually researched and verified (2026-08-30), TED-134.
// Owner request: fresh news for the new week. Same discipline as wave 8:
// every item is based on a primary source actually opened and read in full
// (not a search-result snippet) — see inline sources per article. A fourth
// candidate (a Maariv piece on "ending aliyah from Ethiopia") was opened,
// turned out to be from May 2023, and was dropped rather than published as
// current news.
import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE10: NewsArticleEntry[] = [
  {
    slug: "likud-reserved-slots-kessim-letter-2026",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    tags: ["civic"],
    title: {
      he: "32 קסים חתמו על מכתב לנתניהו: שריינו מקום לנציגות הקהילה ברשימת הליכוד",
      en: "32 kessim sign a letter to Netanyahu: reserve a slot for the community on the Likud list",
      am: "32 ቀሲሶች ለኔታንያሁ ደብዳቤ ፈረሙ፦ በሊኩድ ዝርዝር ለማህበረሰቡ ውክልና ቦታ ይጠበቅ",
    },
    excerpt: {
      he: 'לאחר פרישת ח"כ צגה מלכו מהפריימריז, 32 מנהיגים רוחניים של הקהילה חתמו על מכתב לראש הממשלה בבקשה להבטיח לה מקום משוריין. לפי סקרים פנימיים בליכוד, מלכו עשויה להביא תמיכה בהיקף של כחצי מנדט מהקהילה האתיופית-ישראלית.',
      en: "After MK Tsega Melaku withdrew from the primaries, 32 spiritual leaders of the community signed a letter asking the prime minister to guarantee her a reserved slot. Internal Likud polling suggests Melaku could bring support worth roughly half a Knesset seat from the Ethiopian-Israeli community.",
      am: "የኔሴት አባል ጼጋ መላኩ ከፕራይመሪው ከወጣች በኋላ፣ 32 የማህበረሰቡ መንፈሳዊ መሪዎች ለጠቅላይ ሚኒስትሩ የተጠበቀ ቦታ እንዲያረጋግጡላት የሚጠይቅ ደብዳቤ ፈረሙ። የሊኩድ ውስጣዊ ጥናቶች መላኩ ከማህበረሰቡ ግማሽ የኔሴት መቀመጫ የሚያህል ድጋፍ ልታመጣ እንደምትችል ያሳያሉ።",
    },
    bodies: {
      he: `## הרקע

לפני כשבועיים דיווחנו על [פרישתה של ח"כ צגה מלכו ממרוץ הפריימריז בליכוד](/he/news/tsega-melaku-withdraws-likud-primaries-2026), לאחר שלדבריה "המושב המשוריין לעולים חסום". כעת מתברר שהמאבק על ייצוג הקהילה ברשימה לא הסתיים.

## המכתב

לפי דיווח של אנה ברסקי בג'רוזלם פוסט (18.8.2026), **32 קסים** — מנהיגים רוחניים של הקהילה האתיופית-ישראלית — חתמו על מכתב לראש הממשלה בנימין נתניהו, בבקשה להבטיח לח"כ מלכו מקום משוריין ברשימת הליכוד לכנסת הבאה.

## המספרים שמאחורי הבקשה

על פי אותו דיווח, סקרים פנימיים בליכוד מעריכים שמלכו עשויה להביא למפלגה תמיכה בהיקף של **כחצי מנדט** מקרב הקהילה האתיופית-ישראלית.

## איפה זה עומד

לנתניהו שמורים לפי הדיווח שמונה מקומות שריון להשפעה על הרכב הרשימה אחרי הפריימריז, אך גורמים במפלגה מעריכים שבסופו של דבר ישתמש רק באחד או שניים נוספים, ויעדיף מועמדים עם משיכה אלקטורלית ברורה. בין השמות הנוספים שהוזכרו בהקשר השריונים: שר האוצר לשעבר משה כחלון, שטרם החליט אם לשוב לפוליטיקה.

טדרוס מדווח על הדברים כעובדה פוליטית ואינו מביע עמדה.

## מקורות

- [The Jerusalem Post, ‏18.8.2026 — Anna Barsky](https://www.jpost.com/israel-election-2026/article-905843)
- [הכתבה הקודמת שלנו על פרישת מלכו](/he/news/tsega-melaku-withdraws-likud-primaries-2026)`,
      en: `## Background

About two weeks ago we reported on [MK Tsega Melaku's withdrawal from the Likud primaries](/en/news/tsega-melaku-withdraws-likud-primaries-2026), after she said "the immigrant-reserved seat is blocked". It now turns out the fight over the community's place on the list is not over.

## The letter

According to a report by Anna Barsky in The Jerusalem Post (August 18, 2026), **32 kessim** — spiritual leaders of the Ethiopian-Israeli community — signed a letter to Prime Minister Benjamin Netanyahu, asking him to guarantee MK Melaku a reserved slot on Likud's list for the next Knesset.

## The numbers behind the request

Per the same report, internal Likud polling estimates Melaku could bring the party support worth roughly **half a Knesset seat** from the Ethiopian-Israeli community.

## Where it stands

Netanyahu reportedly holds eight reserved slots to shape the list after the primaries, but party officials estimate he will ultimately use only one or two more, prioritizing candidates with clear electoral appeal. Also mentioned in the reserved-slot context: former finance minister Moshe Kahlon, who has not yet decided whether to return to politics.

Tedros reports this as political fact and takes no position.

## Sources

- [The Jerusalem Post, Aug 18, 2026 — Anna Barsky](https://www.jpost.com/israel-election-2026/article-905843)
- [Our earlier report on Melaku's withdrawal](/en/news/tsega-melaku-withdraws-likud-primaries-2026)`,
      am: `## ዳራ

ከሁለት ሳምንት በፊት [የኔሴት አባል ጼጋ መላኩ ከሊኩድ ፕራይመሪ መውጣቷን](/am/news/tsega-melaku-withdraws-likud-primaries-2026) ዘግበን ነበር — «ለስደተኞች የተጠበቀው መቀመጫ ተዘግቷል» ካለች በኋላ። አሁን በዝርዝሩ ላይ ስለ ማህበረሰቡ ውክልና የሚደረገው ትግል እንዳላበቃ ታይቷል።

## ደብዳቤው

በጀሩሳሌም ፖስት (ነሐሴ 18, 2026፣ አና ባርስኪ) ዘገባ መሠረት፣ **32 ቀሲሶች** — የኢትዮጵያ-እስራኤላውያን ማህበረሰብ መንፈሳዊ መሪዎች — ለጠቅላይ ሚኒስትር ቤንያሚን ኔታንያሁ ደብዳቤ ፈርመው፣ ለኔሴት አባል መላኩ በሊኩድ ዝርዝር የተጠበቀ ቦታ እንዲያረጋግጡ ጠይቀዋል።

## ከጥያቄው ጀርባ ያሉ ቁጥሮች

በዚያው ዘገባ መሠረት፣ የሊኩድ ውስጣዊ ጥናቶች መላኩ ከማህበረሰቡ **ግማሽ የኔሴት መቀመጫ** የሚያህል ድጋፍ ለፓርቲው ልታመጣ እንደምትችል ይገምታሉ።

## አሁን የት ደርሷል

ኔታንያሁ ከፕራይመሪው በኋላ ዝርዝሩን ለመቅረጽ ስምንት የተጠበቁ ቦታዎች እንዳሉት ተዘግቧል፤ ነገር ግን የፓርቲ ባለስልጣናት በመጨረሻ አንድ ወይም ሁለት ብቻ እንደሚጠቀም ይገምታሉ። በዚሁ አውድ የቀድሞ የገንዘብ ሚኒስትር ሞሼ ካህሎንም ተጠቅሷል — ወደ ፖለቲካ መመለስ አለመመለሱን ገና አልወሰነም።

ትድሮስ ይህንን እንደ ፖለቲካዊ እውነታ ብቻ ይዘግባል፣ አቋም አይይዝም።

## ምንጮች

- [The Jerusalem Post, ነሐሴ 18, 2026 — አና ባርስኪ](https://www.jpost.com/israel-election-2026/article-905843)
- [ስለ መላኩ መውጣት የቀድሞ ዘገባችን](/am/news/tsega-melaku-withdraws-likud-primaries-2026)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "legesse-oped-gabi-worku-realistic-slot-2026",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    tags: ["civic", "community"],
    title: {
      he: "מאמר דעה בג'רוזלם פוסט: תנו לגבי וורקו, זוכה מרוץ העולים בפריימריז, מקום ריאלי",
      en: "Jerusalem Post opinion: give Gabi Worku, winner of the primaries' immigrants' race, a realistic slot",
      am: "የጀሩሳሌም ፖስት አስተያየት፦ በፕራይመሪው የስደተኞች ውድድር ላሸነፈው ገቢ ወርቁ ተጨባጭ ቦታ ይሰጠው",
    },
    excerpt: {
      he: 'שמואל לגסה, שמאמרו הקודם סוקר אצלנו, קורא הפעם לראש הממשלה לשבץ את גבי וורקו — פעיל ליכוד ותיק מחיפה שזכה במרוץ העולים בפריימריז — במקום ריאלי ברשימה: "פריימריז מאבדים משמעות אם הבחירה של המתפקדים נקברת תחת מינויים".',
      en: "Shmuel Legesse, whose previous op-ed we covered, now calls on the prime minister to place Gabi Worku — a veteran Likud activist from Haifa who won the primaries' immigrants' race — in a realistic list position: \"primaries become meaningless if members' choices are buried beneath appointments\".",
      am: "ሽሙኤል ለገሰ በዚህ ጊዜ ጠቅላይ ሚኒስትሩ ገቢ ወርቁን — በፕራይመሪው የስደተኞች ውድድር ያሸነፈውን የሐይፋ የሊኩድ አባል — በተጨባጭ ቦታ እንዲያስቀምጡ ይጠይቃል፦ «የአባላት ምርጫ በሹመቶች ስር ከተቀበረ ፕራይመሪ ትርጉም የለውም»።",
    },
    bodies: {
      he: `## חשוב להבהיר: זהו מאמר דעה

הכתבה הזו מסכמת **מאמר דעה** (Op-Ed) שפורסם בג'רוזלם פוסט ב-23.8.2026 — לא ידיעה עיתונאית. הדעות המובעות בו הן של הכותב, שמואל לגסה, ולא עמדה של טדרוס.

## מי זה גבי וורקו

לפי המאמר, וורקו הוא חבר ליכוד ותיק ופעיל קהילתי מחיפה, שעבד בעבר כיועץ פוליטי של חבר הכנסת לשעבר ד"ר אברהם נגוסה. הוא פעיל בתחומי קליטת עולים ובמאמצים להעלאת שארית יהודי אתיופיה — ובפריימריז האחרונים של הליכוד **זכה במרוץ על מקום העולים**.

## הטענה המרכזית

לגסה — שאת [מאמרו הקודם על מנהיגות יוצאי אתיופיה](/he/news/jpost-opinion-ethiopian-israeli-leadership-2026) סיקרנו — טוען שנתניהו צריך לשבץ את וורקו במקום ריאלי ברשימה, רצוי בין 23 המקומות הראשונים:

> "וורקו נכנס לפריימריז, התייצב מול הבוחרים, וזכה במרוץ העולים. עכשיו מגיעה לו הזדמנות ריאלית לשרת."

לדבריו, זהו מבחן של הוגנות דמוקרטית: "פריימריז מאבדים משמעות אם הבחירה של המתפקדים נקברת תחת מינויים" — וגם מבחן לשאלה האם קולות הקהילה האתיופית-ישראלית "נחשבים" בליכוד.

## ההקשר

המאמר מתפרסם על רקע [המכתב של 32 הקסים לנתניהו](/he/news/likud-reserved-slots-kessim-letter-2026) והדיון על מקומות השריון ברשימה.

## מקורות

- [The Jerusalem Post — Opinion, ‏23.8.2026 — Shmuel Legesse](https://www.jpost.com/opinion/article-906104)`,
      en: `## Important: this is an opinion piece

This article summarizes an **op-ed** published in The Jerusalem Post on August 23, 2026 — not a news report. The views are the author's, Shmuel Legesse, not Tedros's position.

## Who is Gabi Worku

Per the piece, Worku is a longtime Likud member and community activist from Haifa who previously worked as a political aide to former MK Dr. Avraham Neguise. He is active in immigrant integration and in efforts to bring the remaining Jews of Ethiopia to Israel — and in Likud's latest primaries he **won the race for the immigrants' slot**.

## The core argument

Legesse — whose [previous op-ed on Ethiopian-Israeli leadership](/en/news/jpost-opinion-ethiopian-israeli-leadership-2026) we covered — argues Netanyahu should place Worku in a realistic list position, preferably within the first 23:

> "Worku entered the primary, faced the voters, and won the immigrants' contest. Now he deserves a realistic opportunity to serve."

He frames it as a test of democratic fairness — "primaries become meaningless if members' choices are buried beneath appointments" — and of whether Ethiopian-Israeli votes "matter" to Likud.

## Context

The piece runs against the backdrop of [the 32 kessim's letter to Netanyahu](/en/news/likud-reserved-slots-kessim-letter-2026) and the reserved-slots debate.

## Sources

- [The Jerusalem Post — Opinion, Aug 23, 2026 — Shmuel Legesse](https://www.jpost.com/opinion/article-906104)`,
      am: `## አስፈላጊ ማብራሪያ፦ ይህ የአስተያየት ጽሑፍ ነው

ይህ ጽሑፍ በጀሩሳሌም ፖስት ነሐሴ 23, 2026 የታተመ **የአስተያየት ጽሑፍ** ማጠቃለያ ነው — የዜና ዘገባ አይደለም። አስተያየቶቹ የጸሐፊው የሽሙኤል ለገሰ ናቸው፣ የትድሮስ አቋም አይደሉም።

## ገቢ ወርቁ ማን ነው

በጽሑፉ መሠረት፣ ወርቁ ከሐይፋ የመጣ የቆየ የሊኩድ አባልና የማህበረሰብ አክቲቪስት ሲሆን፣ ቀደም ሲል የቀድሞ የኔሴት አባል ዶ/ር አብረሃም ነጉሴ የፖለቲካ አማካሪ ሆኖ ሰርቷል። በስደተኞች ውህደትና የቀሩትን የኢትዮጵያ አይሁዶች ወደ እስራኤል በማምጣት ጥረቶች ንቁ ነው — በመጨረሻው የሊኩድ ፕራይመሪ **የስደተኞችን ቦታ ውድድር አሸንፏል**።

## ዋናው ክርክር

ለገሰ — [ስለ ኢትዮጵያ-እስራኤላውያን መሪነት የጻፈውን የቀድሞ ጽሑፍ](/am/news/jpost-opinion-ethiopian-israeli-leadership-2026) ዘግበን ነበር — ኔታንያሁ ወርቁን በዝርዝሩ ተጨባጭ ቦታ (በተለይ በመጀመሪያዎቹ 23 ውስጥ) እንዲያስቀምጡ ይከራከራል፦

> «ወርቁ ፕራይመሪ ገባ፣ መራጮችን ተጋፈጠ፣ የስደተኞችንም ውድድር አሸነፈ። አሁን ለማገልገል ተጨባጭ እድል ይገባዋል።»

ይህንን የዲሞክራሲያዊ ፍትሃዊነት ፈተና አድርጎ ያቀርባል — «የአባላት ምርጫ በሹመቶች ስር ከተቀበረ ፕራይመሪ ትርጉም የለውም»።

## አውድ

ጽሑፉ [የ32 ቀሲሶች ደብዳቤ ለኔታንያሁ](/am/news/likud-reserved-slots-kessim-letter-2026) እና በተጠበቁ ቦታዎች ዙሪያ ያለው ክርክር ዳራ ላይ ነው የወጣው።

## ምንጮች

- [The Jerusalem Post — Opinion, ነሐሴ 23, 2026 — ሽሙኤል ለገሰ](https://www.jpost.com/opinion/article-906104)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "hit-animation-ethiopian-wedding-traditions-2026",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    tags: ["community", "family"],
    title: {
      he: '"בת של מי את?": פרויקט הגמר שמנפיש את מסורות החתונה האתיופית',
      en: '"Whose daughter are you?": the graduation project animating Ethiopian wedding traditions',
      am: "«የማን ልጅ ነሽ?»፦ የኢትዮጵያ የሰርግ ወጎችን በአኒሜሽን የሚያሳይ የምረቃ ፕሮጀክት",
    },
    excerpt: {
      he: 'בת"ם אינאו, בת 27 מבית שמש ובוגרת הפקולטה לעיצוב ב-HIT חולון, הקדישה את פרויקט הגמר שלה — שלושה סרטוני אנימציה — למפגש בין מסורות החתונה של יוצאי אתיופיה לחתונה ישראלית: הזמנות עם שמות הסבים, רשימת אורחים שמגיעה לאלף, וקהילה שלמה שמתגייסת לבישול.',
      en: "Batem Ainao, 27, from Beit Shemesh and a graduate of HIT Holon's design faculty, devoted her graduation project — three short animations — to the meeting between Ethiopian-Israeli wedding traditions and an Israeli wedding: invitations carrying the grandparents' names, guest lists that reach a thousand, and a whole community that mobilizes to cook.",
      am: "ባተም አይናኦ፣ 27፣ ከቤት ሸመሽ እና የHIT ሆሎን የዲዛይን ፋኩልቲ ተመራቂ፣ የምረቃ ፕሮጀክቷን — ሶስት አጫጭር አኒሜሽኖች — ለኢትዮጵያ-እስራኤላውያን የሰርግ ወጎችና ለእስራኤላዊ ሰርግ መገናኘት ሰጥታለች።",
    },
    bodies: {
      he: `## הפרויקט

**בת"ם אינאו**, בת 27 מבית שמש, סיימה את לימודיה בפקולטה לעיצוב במכון הטכנולוגי חולון (HIT) עם פרויקט גמר בשם **"בת של מי את?"** — שלושה סרטוני אנימציה קצרים. הפרויקט, שסוקר בכתבה של ניצן פינקו ב-ynet (3.8.2026), עוסק במפגש (ולעיתים בהתנגשות) בין מסורות החתונה של הקהילה האתיופית לבין חתונה ישראלית — דרך תכנון חתונתה שלה עם ליאם, ישראלי ממוצא פולני-תימני.

## המסורות שהסרטונים מתעדים

- **הזמנה עם שמות הסבים והסבתות** — ההזמנה נושאת את שמות הדורות הקודמים, כביטוי של כבוד.
- **רשימת אורחים קהילתית** — "לחתונה אתיופית כולם מוזמנים": מספר האורחים יכול להגיע לאלף, כי ההזמנה היא קהילתית ולא אישית.
- **הזמנות שלושה חודשים מראש** — כדי שכל הקהילה תספיק להתארגן.
- **כבוד לחמות** — הכלה אינה פונה לחמותה בשמה הפרטי.
- **חתונה כבניית בית** — הקהילה משתתפת בהכנות, כולל בישול משותף.

## למה זה מעניין

הפרויקט של אינאו מצטרף לגל של יוצרים צעירים מהקהילה שמביאים את מורשת ביתא ישראל לקדמת הבמה התרבותית בישראל — הפעם דרך אנימציה, ומתוך סיפור אישי של דור שני שמתרגם בין העולמות.

## מתכננים חתונה?

המנהגים שהסרטונים מתעדים הם רק חלק מהרצף. [מדריך החתונה והחינה האתיופית](/he/heritage/wedding) מפרט את השלבים לפי הסדר — מבקשת יד הכלה ועד הימים שאחרי החופה — ומרכז ספקים מאומתים לחינה, לשמלות ולקייטרינג. את הצד הבירוקרטי מכסה [המדריך לרישום נישואין ברבנות](/he/heritage/marriage).

## מקורות

- [ynet — ניצן פינקו, ‏3.8.2026](https://www.ynet.co.il/dating/weddings/article/rkqnx003rmg)`,
      en: `## The project

**Batem Ainao**, 27, from Beit Shemesh, graduated from the design faculty at the Holon Institute of Technology (HIT) with a final project titled **"Whose daughter are you?"** — three short animated films. The project, covered by Nitzan Pinko on ynet (August 3, 2026), explores the meeting — and sometimes collision — between Ethiopian-Israeli wedding traditions and an Israeli wedding, through planning her own wedding with Liam, an Israeli of Polish-Yemenite descent.

## The traditions the films document

- **Invitations carrying the grandparents' names** — earlier generations appear on the invitation as a mark of honor.
- **A communal guest list** — "everyone is invited to an Ethiopian wedding": guest counts can reach a thousand, because the invitation is communal, not personal.
- **Invitations three months in advance** — so the whole community can organize.
- **Respect for the mother-in-law** — the bride does not address her by her first name.
- **A wedding as building a home** — the community joins the preparations, including cooking together.

## Why it matters

Ainao's project joins a wave of young creators from the community bringing Beta Israel heritage to the front of Israel's cultural stage — this time through animation, and through a second-generation story of translating between worlds.

## Planning a wedding?

The customs the films document are only part of the sequence. [The Ethiopian wedding and henna guide](/en/heritage/wedding) sets out the stages in order — from the request for the bride's hand to the days after the chuppah — and collects verified suppliers for the henna, the dresses and the catering. The bureaucratic side is covered by [the Rabbanut marriage-registration guide](/en/heritage/marriage).

## Sources

- [ynet — Nitzan Pinko, Aug 3, 2026](https://www.ynet.co.il/dating/weddings/article/rkqnx003rmg)`,
      am: `## ፕሮጀክቱ

**ባተም አይናኦ**፣ 27፣ ከቤት ሸመሽ፣ በሆሎን የቴክኖሎጂ ተቋም (HIT) የዲዛይን ፋኩልቲ **«የማን ልጅ ነሽ?»** በሚል ርዕስ የምረቃ ፕሮጀክት — ሶስት አጫጭር የአኒሜሽን ፊልሞች — ተመርቃለች። ፕሮጀክቱ (በኒጻን ፒንኮ በynet፣ ነሐሴ 3, 2026 የተዘገበ) የኢትዮጵያ-እስራኤላውያን የሰርግ ወጎችና የእስራኤላዊ ሰርግ መገናኘትን — አንዳንዴም መጋጨትን — ይዳስሳል፣ ከሊአም (የፖላንድ-የመን ዝርያ ያለው እስራኤላዊ) ጋር የራሷን ሰርግ በማቀድ በኩል።

## ፊልሞቹ የሚመዘግቧቸው ወጎች

- **የአያቶች ስም ያለበት ግብዣ** — የቀድሞ ትውልዶች ስም በግብዣው ላይ እንደ ክብር ምልክት ይታያል።
- **የማህበረሰብ የእንግዶች ዝርዝር** — «ወደ ኢትዮጵያ ሰርግ ሁሉም ተጋብዟል»፦ የእንግዶች ቁጥር ሺህ ሊደርስ ይችላል።
- **ከሶስት ወር በፊት ግብዣ** — መላው ማህበረሰብ እንዲዘጋጅ።
- **ለአማት ክብር** — ሙሽራዋ አማቷን በስሟ አትጠራም።
- **ሰርግ ቤት እንደ መገንባት** — ማህበረሰቡ በዝግጅቱ ይሳተፋል፣ አብሮ ማብሰልንም ጨምሮ።

## ለምን ያስደስታል

የአይናኦ ፕሮጀክት የቤታ እስራኤልን ቅርስ ወደ እስራኤል የባህል መድረክ ፊት የሚያመጡ ወጣት ፈጣሪዎች ማዕበል ይቀላቀላል — በዚህ ጊዜ በአኒሜሽን።

## ሰርግ እያቀዱ ነው?

ፊልሞቹ የሚመዘግቧቸው ወጎች የሂደቱ አካል ብቻ ናቸው። [የኢትዮጵያ ሰርግና ሒና መመሪያ](/am/heritage/wedding) ደረጃዎቹን በቅደም ተከተል ያቀርባል፣ ለሒና፣ ለቀሚሶችና ለምግብ አገልግሎት የተረጋገጡ አቅራቢዎችንም ያሰባስባል። የቢሮክራሲውን ጎን [የረቢነት የጋብቻ ምዝገባ መመሪያ](/am/heritage/marriage) ይሸፍናል።

## ምንጮች

- [ynet — ኒጻን ፒንኮ, ነሐሴ 3, 2026](https://www.ynet.co.il/dating/weddings/article/rkqnx003rmg)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "back-to-school-2026-community-checklist",
    publishedAt: "2026-08-30",
    updatedAt: "2026-08-30",
    tags: ["education", "announcement"],
    title: {
      he: "שנת הלימודים תשפ\"ז נפתחת השבוע: צ'ק-ליסט מלגות וזכויות למשפחות הקהילה",
      en: "The school year opens this week: a scholarships-and-rights checklist for community families",
      am: "የትምህርት ዓመቱ በዚህ ሳምንት ይከፈታል፦ ለማህበረሰቡ ቤተሰቦች የስኮላርሺፕና የመብቶች ማረጋገጫ ዝርዝር",
    },
    excerpt: {
      he: "ביום שלישי, 1 בספטמבר, נפתחת שנת הלימודים. זה הזמן לבדוק מלגות שההרשמה אליהן מתרכזת בתחילת השנה האקדמית, זכויות חינוך לילדים, ומסלולי הכשרה — ריכזנו את נקודות הפתיחה החשובות במקום אחד.",
      en: "The school year opens on Tuesday, September 1. It's the moment to check scholarships whose application windows cluster around the start of the academic year, education rights for children, and training tracks — here are the key starting points in one place.",
      am: "የትምህርት ዓመቱ ማክሰኞ፣ መስከረም 1 ይከፈታል። የስኮላርሺፕ ማመልከቻዎችን፣ የልጆች የትምህርት መብቶችን እና የስልጠና መስመሮችን ለመፈተሽ ጊዜው አሁን ነው።",
    },
    bodies: {
      he: `## השבוע זה קורה

ביום שלישי, **1 בספטמבר 2026**, נפתחת שנת הלימודים תשפ"ז — בגנים, בבתי הספר ובהמשך גם במוסדות האקדמיים. ריכזנו כאן את נקודות הפתיחה החשובות למשפחות ולסטודנטים מהקהילה, עם קישורים למדריכים המלאים באתר.

## סטודנטים: תקופת המלגות מתחילה

חלונות ההרשמה של רבות מהמלגות לסטודנטים יוצאי אתיופיה מתרכזים סביב פתיחת השנה האקדמית. שווה לבדוק כבר עכשיו:

- **[מרכז המלגות המלא שלנו](/he/education/scholarships)** — עשרות מלגות ותוכניות ליווי, עם תנאי זכאות ופרטי הגשה לכל אחת.
- **[מלגת מרום של המל"ג](/he/education/scholarships/marom-che)** — אחת המרכזיות לסטודנטים מהקהילה.
- חשוב: מועדי ההגשה משתנים בין תוכניות ומתעדכנים כל שנה — בדקו את המועד המדויק מול אתר כל תוכנית לפני ההגשה.

## הורים: זכויות שכדאי להכיר

- **[מרכז הזכויות שלנו](/he/rights)** — כולל זכויות בתחומי חינוך, מענקים וסבסוד לילדים ולנוער; אפשר לסנן לפי תגית "חינוך".
- אם הילד או הילדה זקוקים לתמיכה לימודית או רגשית — פנו ליועצת בית הספר כבר בשבועות הראשונים; פנייה מוקדמת מונעת פערים.

## מבוגרים: גם לכם יש התחלה חדשה

תחילת שנה היא נקודת כניסה טבעית גם להכשרות מקצועיות:

- **[מרכז הקריירה שלנו](/he/careers)** — 10 מסלולים, כולל bootcamps במימון מלא, מסלולי הסבה ותוכניות ליווי.

## שנה טובה!

טדרוס מאחל לכל התלמידות, התלמידים, הסטודנטיות והסטודנטים מהקהילה שנת לימודים מוצלחת. אם נתקלתם בקושי במימוש זכות חינוכית — [כתבו לנו](/he/about).`,
      en: `## This week it begins

On Tuesday, **September 1, 2026**, the school year opens — kindergartens, schools, and later the academic institutions. Here are the key starting points for community families and students, with links to the full guides on the site.

## Students: scholarship season begins

Application windows for many scholarships for Ethiopian-Israeli students cluster around the start of the academic year. Worth checking now:

- **[Our full scholarships center](/en/education/scholarships)** — dozens of scholarships and mentoring programs, with eligibility and application details for each.
- **[The CHE's Marom scholarship](/en/education/scholarships/marom-che)** — one of the central programs for students from the community.
- Important: application deadlines differ between programs and change every year — verify the exact date on each program's own site before applying.

## Parents: rights worth knowing

- **[Our rights center](/en/rights)** — including education rights, grants and subsidies for children and teens; filter by the "education" tag.
- If your child needs learning or emotional support — approach the school counselor in the first weeks; early requests prevent gaps.

## Adults: a new start for you too

The start of the year is a natural entry point for professional training:

- **[Our careers center](/en/careers)** — 10 tracks, including fully funded bootcamps, career-change routes and mentoring programs.

## Have a great year!

Tedros wishes all the community's pupils and students a successful school year. If you hit a wall exercising an education right — [write to us](/en/about).`,
      am: `## በዚህ ሳምንት ይጀምራል

ማክሰኞ፣ **መስከረም 1, 2026**፣ የትምህርት ዓመቱ ይከፈታል — መዋእለ ህጻናት፣ ትምህርት ቤቶች፣ በኋላም የከፍተኛ ትምህርት ተቋማት። ለማህበረሰቡ ቤተሰቦችና ተማሪዎች ዋና ዋና መነሻ ነጥቦች እነሆ።

## ተማሪዎች፦ የስኮላርሺፕ ወቅት ይጀምራል

ለኢትዮጵያ-እስራኤላውያን ተማሪዎች የብዙ ስኮላርሺፕ ማመልከቻ መስኮቶች በትምህርት ዓመቱ መጀመሪያ ዙሪያ ናቸው፦

- **[የስኮላርሺፕ ማዕከላችን](/am/education/scholarships)** — በደርዘኖች የሚቆጠሩ ስኮላርሺፖችና የድጋፍ ፕሮግራሞች።
- **[የCHE ማሮም ስኮላርሺፕ](/am/education/scholarships/marom-che)** — ለማህበረሰቡ ተማሪዎች ከዋናዎቹ አንዱ።
- አስፈላጊ፦ የማመልከቻ ቀነ-ገደቦች በፕሮግራሞች መካከል ይለያያሉ — ከማመልከትዎ በፊት በእያንዳንዱ ፕሮግራም ድህረ ገጽ ትክክለኛውን ቀን ያረጋግጡ።

## ወላጆች፦ ማወቅ ያለባቸው መብቶች

- **[የመብቶች ማዕከላችን](/am/rights)** — የትምህርት መብቶችን፣ ስጦታዎችንና ድጎማዎችን ጨምሮ።
- ልጅዎ የትምህርት ወይም የስሜት ድጋፍ ከፈለገ — በመጀመሪያዎቹ ሳምንታት የትምህርት ቤቱን አማካሪ ያነጋግሩ።

## ለአዋቂዎች፦ ለእናንተም አዲስ ጅምር

- **[የስራ ማዕከላችን](/am/careers)** — 10 መስመሮች፣ ሙሉ በሙሉ የገንዘብ ድጋፍ ያላቸው bootcamps ጨምሮ።

## መልካም ዓመት!

ትድሮስ ለሁሉም የማህበረሰቡ ተማሪዎች የተሳካ የትምህርት ዓመት ይመኛል።

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
];
