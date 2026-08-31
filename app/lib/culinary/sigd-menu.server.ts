// Sigd menu + fast-meaning guide (TED-146).
//
// A natural extension of the existing Sigd heritage pillar
// (app/lib/heritage/events.server.ts) per the keyword research: the open
// niche is "menu + religious meaning" — no competitor combines the two.
// Timed for Sigd 2026 (19 November 2026, 29 Cheshvan 5787); the heritage
// module is the source of truth for observance dates.
//
// HE is the source-of-truth locale. Server-only module.

import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export const SIGD_MENU_PUBLISHED = "2026-08-30";

export interface SigdMenuGuide {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  body: Record<Locale, string>;
}

export const SIGD_MENU_GUIDE: SigdMenuGuide = {
  title: {
    he: "צום הסיגד ותפריט שבירת הצום — המדריך המלא",
    en: "The Sigd fast and the break-fast menu — the complete guide",
    am: "የሰግድ ጾም እና የጾም መስበሪያ ምግብ — ሙሉ መመሪያ",
  },
  description: {
    he: "למה צמים בסיגד, מתי שוברים את הצום, ומה עולה על השולחן — דאבו, אינג'רה, דורו ואט ועוד. כולל לוח זמנים לסיגד 2026 (19.11).",
    en: "Why the community fasts on Sigd, when the fast is broken, and what goes on the table — dabo, injera, doro wat and more. Includes the Sigd 2026 schedule (Nov 19).",
    am: "በሰግድ ለምን እንደሚጾም፣ ጾሙ መቼ እንደሚሰበር እና በማዕዱ ላይ ምን እንደሚቀርብ — ዳቦ፣ እንጀራ፣ ዶሮ ወጥ። የሰግድ 2026 መርሃ ግብር (ህዳር 19) ያካትታል።",
  },
  body: {
    he: `## למה בכלל צמים בסיגד?

הסיגד — שיחול ב-**19 בנובמבר 2026** (כ"ט בחשוון תשפ"ז) — הוא יום של חידוש הברית בין העם לאלוהיו, על-פי המודל של מעמד שיבת ציון בספרי עזרא ונחמיה: העם מתכנס, שומע את התורה, מתוודה ומתחייב מחדש. הצום הוא לב העניין הדתי של החג: כמו ביום הכיפורים, ההימנעות מאכילה מבטאת תשובה, הזדככות וכיסופים לירושלים.

באתיופיה היו בני הקהילה עולים בצום אל ראש הר גבוה — זכר להר סיני — כשהקייסים נושאים את האורית (התורה בגעז). בישראל עולים אל טיילת ארמון הנציב בירושלים, מול העיר העתיקה. הצום נמשך מהבוקר ועד לסיום התפילות בצהריים — לא יממה שלמה — וילדים, נשים בהיריון וחולים פטורים ממנו, כמקובל.

מי שרוצה להעמיק בטקס עצמו — לוח האירועים המלא, ההסעות ומה להביא — ימצא הכול ב[עמוד הסיגד המרכזי](/he/heritage/events/sigd).

## מתי שוברים את הצום?

בטקס המרכזי בירושלים, התפילות מסתיימות סביב הצהריים (12:00 בקירוב), ואז נשברים הצום — במקום, יחד. מסורתית נושאים המשתתפים צידה מהבית: בכפרים באתיופיה חתמו את היום בסעודת מצווה קהילתית, וההקפדה על הכנסת אורחים סביב הסיגד היא חלק מהותי מהחג. מי שחוגג בעירו — באירוע עירוני או בבית — שובר את הצום בדרך כלל אחרי טקס התפילה המקומי.

חשוב לומר: אין "תפריט רשמי" של הסיגד. המנהגים משתנים ממשפחה למשפחה ומקהילה לקהילה — מה שמשותף הוא הרעיון: מהצום אל השולחן המשותף.

## מה עולה על השולחן — מנה אחר מנה

- **דאבו** — לחם השבת והחג של ביתא ישראל, עגול ומעט מתקתק. במשפחות רבות הוא הדבר הראשון שטועמים בשבירת הצום, לאחר ברכה. [על הדאבו ומעמדו הדתי](/he/culinary#dabo).
- **אינג'רה** — הבסיס של הסעודה החגיגית: לחם הטף המותסס משמש צלחת משותפת לכל המסובים. [על האינג'רה והאכילה המשותפת](/he/culinary#injera-teff).
- **דורו ואט** — תבשיל העוף החגיגי בברברה, לרוב עם ביצים קשות; במטבח האתיופי זו מנת הכבוד השמורה לאירועים גדולים.
- **קיי מסר ואט** — תבשיל עדשים אדומות חריף; גרסה מסורתית וזמינה שמכבדת גם שולחנות צמחוניים.
- **אלִיצָ'ה** — תבשיל ירקות עדין בכורכום, בלי ברברה — האיזון של השולחן, ומתאים גם לילדים.
- **קייסר ואגוואט** — בקהילות מסוימות מוגשים גם תבשיל סלק (קייסר) וגבינה ביתית (אגוואט).
- **בּוּנָה** — ובסוף, כמעט תמיד: טקס קפה. שלושה סיבובים — אבול, טונה, ברקה. [על טקס הבונה](/he/culinary#buna).

## מכינים מראש: קניות לסיגד

את הברברה, קמח הטף, השירו ופולי הקפה קונים בחנויות אתיופיות בערי הקהילה — והביקוש לקראת החג גבוה, אז כדאי להקדים. ריכזנו [נקודות מכירה מאומתות לפי עיר](/he/culinary), כולל מוכרים אונליין ששולחים לכל הארץ.

## למי שצם וזקוק לתשומת לב רפואית

צום הסיגד קצר יחסית, אבל מי שנוטל תרופות קבועות — לסוכרת, ללחץ דם או אחרות — כדאי שיקרא את [ההנחיות על צום ותרופות](/he/health/nutrition) ויתייעץ עם רופא המשפחה, בלי לוותר על החג.

## ראו גם

- [סיגד — העמוד המרכזי: טקס, הסעות, לוח אירועים](/he/heritage/events/sigd)
- [סיגד — מילון מונחים](/he/glossary/sigd)
- [מימון פעילויות סיגד מקומיות — זכות ממשלתית](/he/rights/sigd-funding)

**מקורות**: [חוק יום הסיגד, 2008 — הכנסת](https://main.knesset.gov.il/); [הלמ"ס — לקט נתונים לקראת חג הסיגד](https://www.cbs.gov.il/); [ynet — מאכלי חג הסיגד](https://www.ynet.co.il/articles/0,7340,L-5623579,00.html).`,
    en: `## Why fast on Sigd at all?

Sigd — falling on **19 November 2026** (29 Cheshvan 5787) — is a day of renewing the covenant between the people and God, modelled on the Return-to-Zion assembly in the books of Ezra and Nehemiah: the people gather, hear the Torah, confess and recommit. The fast is the religious heart of the holiday: as on Yom Kippur, abstaining from food expresses repentance, purification and longing for Jerusalem.

In Ethiopia, community members would ascend a high mountain while fasting — a remembrance of Mount Sinai — with the Kessim carrying the Orit (the Torah in Ge'ez). In Israel, the ascent is to the Armon Hanatziv promenade in Jerusalem, facing the Old City. The fast runs from morning until prayers end at midday — not a full day — and children, pregnant women and the ill are exempt, as is customary.

For the ceremony itself — the full events calendar, transport and what to bring — see [the main Sigd page](/en/heritage/events/sigd).

## When is the fast broken?

At the main Jerusalem ceremony, prayers end around midday (roughly 12:00), and the fast is broken — on the spot, together. Traditionally participants carry provisions from home: in Ethiopia's villages the day closed with a communal festive meal, and hospitality around Sigd is an essential part of the holiday. Those celebrating in their own city — at a municipal event or at home — usually break the fast after the local prayer ceremony.

Worth saying clearly: there is no "official" Sigd menu. Customs vary between families and communities — what is shared is the idea: from the fast to the shared table.

## What goes on the table — dish by dish

- **Dabo** — the Shabbat and holiday bread of Beta Israel, round and slightly sweet. In many families it is the first thing tasted when breaking the fast, after a blessing. [On dabo and its religious status](/en/culinary#dabo).
- **Injera** — the base of the festive meal: the fermented teff flatbread serves as a shared plate for everyone at the table. [On injera and communal eating](/en/culinary#injera-teff).
- **Doro wat** — the festive chicken stew in berbere, usually with hard-boiled eggs; in Ethiopian cuisine this is the dish of honour reserved for great occasions.
- **Kai misir wat** — a spicy red-lentil stew; a traditional, accessible dish that honours vegetarian tables too.
- **Alicha** — a mild turmeric vegetable stew, without berbere — the table's balance, suitable for children as well.
- **Kaysar and agwat** — in some communities a beet stew (kaysar) and homemade cheese (agwat) are also served.
- **Buna** — and at the end, almost always: a coffee ceremony. Three rounds — abol, tona, baraka. [On the buna ceremony](/en/culinary#buna).

## Prepare ahead: shopping for Sigd

Berbere, teff flour, shiro and coffee beans are bought at Ethiopian shops in community cities — and demand rises before the holiday, so shop early. We have collected [verified points of sale by city](/en/culinary), including online sellers that ship nationwide.

## If you fast and need medical attention

The Sigd fast is relatively short, but anyone on regular medication — for diabetes, blood pressure or otherwise — should read [the guidance on fasting and medication](/en/health/nutrition) and consult their family doctor, without giving up the holiday.

## See also

- [Sigd — the main page: ceremony, transport, events calendar](/en/heritage/events/sigd)
- [Sigd — glossary](/en/glossary/sigd)
- [Funding for local Sigd activities — a government right](/en/rights/sigd-funding)

**Sources**: [The Sigd Day Law, 2008 — the Knesset](https://main.knesset.gov.il/); [CBS — annual Sigd data digest](https://www.cbs.gov.il/); [ynet — Sigd holiday dishes](https://www.ynet.co.il/articles/0,7340,L-5623579,00.html).`,
    am: `## በሰግድ ለምን ይጾማል?

ሰግድ — **ህዳር 19፣ 2026** (29 ኅዳር 5787) የሚውለው — በሕዝቡና በእግዚአብሔር መካከል ያለው ቃል ኪዳን የሚታደስበት ቀን ነው፣ በዕዝራና በነህምያ መጻሕፍት የጽዮን መመለስ ስብሰባ ሞዴል። ጾሙ የበዓሉ ሃይማኖታዊ ልብ ነው፡ እንደ ዮም ኪፑር፣ ከምግብ መከልከል ንስሐን፣ መንጻትንና ወደ ኢየሩሳሌም መናፈቅን ይገልጻል።

በኢትዮጵያ የማህበረሰቡ አባላት እየጾሙ ወደ ከፍተኛ ተራራ ይወጡ ነበር — የሲና ተራራ መታሰቢያ — ቄሶቹ ኦሪትን ተሸክመው። በእስራኤል ወደ ኢየሩሳሌም አርሞን ሃናጺቭ መመልከቻ ይወጣል። ጾሙ ከጠዋት እስከ ቀትር ጸሎቶች መጨረሻ ይቆያል — ሙሉ ቀን አይደለም — ልጆች፣ እርጉዞችና ህሙማን ነጻ ናቸው።

ስለ ስነ-ስርዓቱ ራሱ — [ዋናውን የሰግድ ገጽ](/am/heritage/events/sigd) ይመልከቱ።

## ጾሙ መቼ ይሰበራል?

በኢየሩሳሌም ዋና ስነ-ስርዓት ጸሎቶቹ በግምት ከቀትር (12:00) ላይ ይጠናቀቃሉ፣ ጾሙም እዚያው በጋራ ይሰበራል። በባህል ተሳታፊዎች ስንቅ ከቤት ይዘው ይመጣሉ። በራሳቸው ከተማ የሚያከብሩ — ከአካባቢው ጸሎት በኋላ ይሰብራሉ።

ግልጽ ማድረግ ያለብን፡ "ኦፊሴላዊ" የሰግድ ምግብ ዝርዝር የለም። ወጎች ከቤተሰብ ወደ ቤተሰብ ይለያያሉ — የሚያመሳስለው ሃሳቡ ነው፡ ከጾም ወደ የጋራ ማዕድ።

## በማዕዱ ላይ ምን ይቀርባል

- **ዳቦ** — የቤተ እስራኤል የሰንበትና የበዓል ዳቦ። በብዙ ቤተሰቦች ጾም ሲሰበር ከበረከት በኋላ መጀመሪያ የሚቀመስ ነው። [ስለ ዳቦ](/am/culinary#dabo)።
- **እንጀራ** — የበዓሉ ምግብ መሰረት፤ ለሁሉም የጋራ ሳህን ነው። [ስለ እንጀራ](/am/culinary#injera-teff)።
- **ዶሮ ወጥ** — በበርበሬ የተሰራ የበዓል ወጥ፣ ብዙ ጊዜ ከቅቅል እንቁላል ጋር።
- **ቀይ ምስር ወጥ** — ቅመም ያለበት የምስር ወጥ።
- **አልጫ** — ለስላሳ የአትክልት ወጥ ያለ በርበሬ — ለልጆችም ተስማሚ።
- **ካይሰርና አጓት** — በአንዳንድ ማህበረሰቦች የቀይ ስር ወጥና የቤት አይብም ይቀርባሉ።
- **ቡና** — በመጨረሻ ሁልጊዜ ማለት ይቻላል፡ የቡና ስነ-ስርዓት — አቦል፣ ቶና፣ በረካ። [ስለ ቡና ስነ-ስርዓት](/am/culinary#buna)።

## አስቀድመው ይግዙ

በርበሬ፣ የጤፍ ዱቄት፣ ሽሮና ቡና በማህበረሰብ ከተሞች የኢትዮጵያ ሱቆች ይገዛሉ — ከበዓሉ በፊት ፍላጎቱ ከፍ ይላል። [የተረጋገጡ የመሸጫ ቦታዎች በከተማ](/am/culinary) አዘጋጅተናል።

## ለሚጾሙና መድሃኒት ለሚወስዱ

የሰግድ ጾም አጭር ነው፣ ግን ቋሚ መድሃኒት የሚወስዱ — [ስለ ጾምና መድሃኒት](/am/health/nutrition) ያንብቡ፣ ሐኪምዎን ያማክሩ።

## ተጨማሪ

- [ሰግድ — ዋና ገጽ](/am/heritage/events/sigd)
- [ሰግድ — መዝገበ ቃላት](/am/glossary/sigd)
- [የሰግድ ዝግጅቶች ገንዘብ ድጋፍ](/am/rights/sigd-funding)`,
  },
};

export function sigdMenuTitle(locale: Locale): string {
  return SIGD_MENU_GUIDE.title[locale] ?? SIGD_MENU_GUIDE.title[DEFAULT_LOCALE];
}

export function sigdMenuDescription(locale: Locale): string {
  return (
    SIGD_MENU_GUIDE.description[locale] ?? SIGD_MENU_GUIDE.description[DEFAULT_LOCALE]
  );
}

export function sigdMenuBody(locale: Locale): string {
  return SIGD_MENU_GUIDE.body[locale] ?? SIGD_MENU_GUIDE.body[DEFAULT_LOCALE];
}
