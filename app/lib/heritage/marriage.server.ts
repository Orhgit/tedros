// Marriage registration guide for Ethiopian-Israelis (TED-140).
//
// The Rabbanut track step by step: opening a marriage file, when a birur
// yahadut (Jewish-status verification) is required, which documents to
// bring, the role of the kes, and where to get free help.
//
// HE is the source-of-truth locale (CLAUDE.md). EN + AM are full mirrors —
// the Amharic summary is deliberately complete, since older community
// members rely on it.
//
// Every claim below is traceable to an official or primary source:
// - kolzchut.org.il — "בירור יהדות ליוצאי אתיופיה": who must undergo the
//   process, the designated expert-rabbi track, the form, ~1 month to a
//   decision, no fee, escalation to the Chief Rabbi of Ethiopian Jewry.
// - kolzchut.org.il — "בירור יהדות": file opened at the regional rabbinical
//   court (yahadut@rbc.gov.il, *5889), investigator meeting, dayan hearing,
//   free of charge, 30-day appeal to the Supreme Rabbinical Court.
// - kolzchut.org.il — "הנחה בתשלום אגרת רישום נישואין ברבנות": 40% fee
//   discount for soldiers, national service, students under 30, olim in
//   their first two years, and other listed groups.
// - Religious council of Rishon LeZion (mdrl.org.il) — registration window
//   (3 months to 45 days before the wedding), the document list, edei
//   ravakut, and the referral of olim to the rabbinical court.
// - itim.org.il — Interior-Ministry registration alone does not prove
//   Jewish status at the Rabbanut; Itim's free helpline (*8083).
// - Government decision of 19.02.2018 (reported by Ynet) — recognition of
//   the kessim, their integration into religious councils, and their
//   authority to officiate weddings.
//
// Deliberately EXCLUDED as unverifiable at the time of writing: the exact
// shekel amount of the marriage-registration fee (published only in a
// regulation appendix that changes), any per-city list of designated
// verification rabbis (the count changes between publications), and any
// claim about how long a specific religious council takes.
//
// Tone note (TED-140): the kes track and the Rabbanut track are presented
// side by side, factually and without ranking one above the other.
//
// Server-only module — do not import in client bundles.

import type { Locale } from "../i18n/config";

/** First published — bump `dateModified` in the route on substantive edits. */
export const MARRIAGE_PUBLISHED_AT = "2026-08-30";

export interface MarriageGuideStep {
  id: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
  /** Official (gov / kol-zchut) link for this step, if any. */
  officialUrl?: string;
  officialLabel?: Record<Locale, string>;
  /** Locale-relative internal path, e.g. "/heritage/kessim". */
  internalPath?: string;
  internalLabel?: Record<Locale, string>;
}

export interface MarriageFaqItem {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export interface MarriageResource {
  name: string;
  phone?: string;
  url: string;
  description: Record<Locale, string>;
}

export interface MarriageSource {
  name: Record<Locale, string>;
  url: string;
}

export const MARRIAGE_TITLE: Record<Locale, string> = {
  he: "רישום נישואין ליוצאי אתיופיה — מדריך שלב-אחר-שלב",
  en: "Marriage Registration for Ethiopian-Israelis — A Step-by-Step Guide",
  am: "ለኢትዮጵያ-እስራኤላውያን የጋብቻ ምዝገባ — ደረጃ በደረጃ መመሪያ",
};

export const MARRIAGE_SUBTITLE: Record<Locale, string> = {
  he: "פתיחת תיק נישואין ברבנות, מתי נדרש בירור יהדות ואיך הוא מתנהל, אילו מסמכים להביא, מה תפקידו של הקס — ואיפה מקבלים עזרה חינם.",
  en: "Opening a marriage file at the Rabbanut, when a birur yahadut is required and how it works, which documents to bring, the role of the kes — and where to get free help.",
  am: "በረቢነት የጋብቻ መዝገብ መክፈት፣ የይሁዲነት ማጣራት (ቢሩር የሁዱት) መቼ እንደሚያስፈልግና እንዴት እንደሚካሄድ፣ የትኞቹን ሰነዶች ማምጣት እንዳለብዎ፣ የቄሱ ሚና — እና ነፃ እርዳታ የት እንደሚያገኙ።",
};

// ── the guide body ─────────────────────────────────────────────────────────

export const MARRIAGE_BODY: Record<Locale, string> = {
  he: `בישראל נישואין בין יהודים נערכים דרך הרבנות, ולכן כל זוג מתחיל באותו מקום: פתיחת תיק נישואין במועצה הדתית. אצל חלק מבני הקהילה התהליך פשוט ומהיר; אצל אחרים — בעיקר כשההורים לא נישאו ברבנות בישראל — נדרש קודם בירור יהדות. המדריך הזה מסביר את שני המסלולים בלי הפתעות.

מתי צריך בירור יהדות ומתי לא
אם להורים שלכם יש תעודת נישואין או כתובה מהרבנות בישראל — לרוב זה מספיק, ואפשר לגשת ישירות לפתיחת תיק. כך גם כאשר אח או אחות שלכם כבר עברו בירור יהדות ואושרו: לשכת הרישום יכולה להסתמך על התיק הקיים. אם ההורים נישאו באתיופיה או בטקס קהילתי שלא נרשם ברבנות בישראל — תידרשו להוציא אישור יהדות לפני פתיחת תיק הנישואין. חשוב לדעת: רישום "יהודי" בתעודת הזהות ובמשרד הפנים אינו נחשב הוכחת יהדות לצורכי הרבנות — זה כלל ארצי שחל על כל מי שנרשם לנישואין בלי מסמכי רבנות של המשפחה, לא כלל ייחודי לקהילה.

איך מתנהל בירור יהדות ליוצאי אתיופיה
ליוצאי אתיופיה נקבע מסלול ייעודי: הפנייה היא לרב מומחה ליהדות אתיופיה שמשרת את אזור המגורים שלכם, ולא לבירור הרגיל. ממלאים טופס בירור יהדות לבני העדה האתיופית — הטופס זמין בלשכות רישום הנישואין ובאתר המשרד לשירותי דת — ומצרפים תעודות לידה מקוריות (שלכם, של האם ושל הסבתא מצד האם), תעודות זהות, ומסמכים המעידים על קרבת המשפחה. הרב רשאי לבקש מסמכים נוספים או פגישה עם קרובי משפחה. אחרי הפגישה מתקבל אישור היהדות — לרוב בתוך כחודש. במקרים מורכבים התיק מועבר ללשכת הרב הראשי ליהודי אתיופיה בירושלים. ההליך אינו כרוך בתשלום.

בירור יהדות "רגיל" — כשהתיק נפתח בבית הדין הרבני
כאשר הבירור מתנהל בבית הדין הרבני האזורי (המסלול הכללי), פותחים תיק בפנייה לבית הדין הקרוב למקום המגורים — בדוא"ל yahadut@rbc.gov.il או בטלפון *5889 (שלוחה 3). לאחר מכן נקבעת פגישה עם בודק, שאוסף ראיות ליהדות האם: תעודות לידה מקוריות, תעודות נישואין של ההורים, תמונות משפחתיות שיש בהן סממנים יהודיים, ומסמכי קהילה. בסיום מתקיים דיון קצר בפני דיין, ומומלץ להביא את האם או הסבתא. גם הליך זה חינם. על החלטה אפשר לערער תוך 30 יום לבית הדין הרבני הגדול בירושלים.

זרע ביתא ישראל ויוצאי פלשמורה
לבני משפחות שעלו במסגרת פלשמורה, או שבמשפחתם היו מי שהתנצרו בעבר, הבירור עשוי לכלול גם מסמכי גיור או השבה ליהדות. אם עברתם או עברו הורים גיור לחומרה בארץ — שמרו את מעשה בית הדין המקורי; זה המסמך שהרבנות מבקשת. נושא מעמדם של זרע ביתא ישראל הוא רגיש ושנוי במחלוקת ציבורית; המדריך הזה מתאר את הנוהל כפי שהוא מתנהל בפועל, ולא את הוויכוח סביבו. אם נתקלתם בעיכוב, בדרישה חריגה או בסירוב — אתם לא לבד, ויש גופים שמלווים בחינם (ראו בהמשך).

פתיחת תיק נישואין — הצד הפרקטי
את התיק פותחים במועצה הדתית במקום המגורים של אחד מבני הזוג, בדרך כלל בין שלושה חודשים ל-45 יום לפני החתונה (פתיחה מחוץ לחלון הזה מחייבת אישור חריג). מביאים תעודות זהות עם הספח, תמונות, ואת תעודת הנישואין של ההורים מהרבנות — או את אישור היהדות, אם נדרש בירור. נדרשים גם עדי רווקות: שני עדים בגירים שמכירים אתכם ואינם קרובי משפחה מדרגה ראשונה, המאשרים שאתם פנויים להינשא. אם אחד מבני הזוג גרוש או אלמן — יש להביא את מסמכי הגירושין או תעודת הפטירה המקוריים. על רישום הנישואין משלמים אגרה; מי שאחד מבני הזוג הוא חייל בשירות חובה, בשירות לאומי, סטודנט עד גיל 30, עולה בשנתיים הראשונות לעלייה, מקבל תעודת נכות או מטופל ברווחה — זכאי להנחה של 40% באגרה. שאלו על ההנחה יזומה; לא תמיד מציעים אותה.

תפקידו של הקס לצד הרבנות
מאז החלטת הממשלה מפברואר 2018 הוכר מעמדם של הקייסים, הם משולבים במועצות הדתיות ומוסמכים לערוך חופה וקידושין — ומי שרוצה, יכול לבקש שהקס יערוך את הטקס עצמו. בפועל רבים בקהילה משלבים: הרישום והכתובה מתנהלים מול המועצה הדתית, והקס מלווה את הטקס, הברכות והמסורת המשפחתית. שני המסלולים לגיטימיים ורשמיים — אין כאן "נכון" ו"פחות נכון", אלא בחירה של המשפחה. אם אתם רוצים קס — אמרו זאת כבר בפתיחת התיק ובררו מול המועצה הדתית מי מהקייסים באזור רשום כעורך חופה וקידושין.

אם משהו נתקע
עיכובים בבירור יהדות הם התסכול המוכר ביותר בתהליך. שמרו עותקים של כל מסמך שהגשתם, בקשו כל החלטה בכתב, ורשמו תאריכים ושמות. אפשר לערער תוך 30 יום, ואפשר להיעזר בליווי חינם: מכון עתים מלווה מול הרבנות ובתי הדין, טבקה מסייעת משפטית לבני הקהילה, והמוקד הממשלתי של היחידה לתיאום המאבק בגזענות מקבל תלונות על יחס מפלה. כל הפרטים בהמשך העמוד.`,
  en: `In Israel, marriages between Jews are conducted through the Rabbanut, so every couple starts in the same place: opening a marriage file at the religious council. For some community members the process is quick; for others — mainly when the parents did not marry through the Rabbanut in Israel — a birur yahadut (Jewish-status verification) comes first. This guide walks through both tracks without surprises.

When a birur yahadut is required — and when it isn't
If your parents hold a marriage certificate or ketubah from the Rabbanut in Israel, that is usually enough and you can go straight to opening a file. The same applies when a sibling has already completed a birur yahadut and been approved: the registration office can rely on the existing file. If your parents married in Ethiopia, or in a community ceremony never registered with the Rabbanut in Israel, you will need a Jewish-status certificate before opening the marriage file. Important to know: being registered as "Jewish" on your ID card and at the Interior Ministry does not count as proof of Jewish status for the Rabbanut — a nationwide rule that applies to anyone registering to marry without family Rabbanut documents, not a rule specific to this community.

How the birur yahadut works for Ethiopian-Israelis
Ethiopian-Israelis have a dedicated track: you apply to a rabbi who is an expert in Ethiopian Jewry and serves your area of residence, rather than through the general procedure. You fill in the Jewish-status verification form for the Ethiopian community — available at marriage registration offices and on the Ministry of Religious Services website — and attach original birth certificates (yours, your mother's, and your maternal grandmother's), identity documents, and papers establishing the family relationship. The rabbi may request further documents or a meeting with relatives. After the meeting the Jewish-status certificate is issued, usually within about a month. Complex cases are referred to the Bureau of the Chief Rabbi of Ethiopian Jewry in Jerusalem. The procedure is free of charge.

The "general" birur yahadut — when the file is opened at the rabbinical court
When the verification runs through the regional rabbinical court (the general track), you open a file with the court nearest your home — by email at yahadut@rbc.gov.il or by phone at *5889 (extension 3). You are then scheduled with an investigator, who gathers evidence of the mother's Jewish status: original birth certificates, the parents' marriage documents, family photographs showing Jewish elements, and community records. It concludes with a short hearing before a dayan, and bringing your mother or grandmother is recommended. This procedure is likewise free. A decision can be appealed within 30 days to the Supreme Rabbinical Court in Jerusalem.

Zera Beta Israel and Falash Mura families
For families who immigrated under the Falash Mura framework, or whose relatives converted to Christianity in the past, the verification may also involve conversion or return-to-Judaism documents. If you or your parents underwent a stringency conversion (giyur le-chumra) in Israel, keep the original rabbinical-court record — that is the document the Rabbanut asks for. The status of zera Beta Israel is a sensitive and publicly contested subject; this guide describes the procedure as it is actually conducted, not the debate around it. If you encounter a delay, an unusual demand, or a refusal — you are not alone, and there are bodies that accompany you free of charge (see below).

Opening the marriage file — the practical side
The file is opened at the religious council where one of the partners lives, generally between three months and 45 days before the wedding (opening outside that window requires special approval). Bring identity cards with the addendum, photographs, and your parents' Rabbanut marriage certificate — or the Jewish-status certificate, if a verification was required. You also need edei ravakut (single-status witnesses): two adults who know you, are not first-degree relatives, and confirm you are free to marry. If either partner is divorced or widowed, bring the original divorce papers or death certificate. A registration fee applies; if one partner is a conscript soldier, in national service, a student under 30, an oleh within the first two years of aliyah, a disability-certificate holder, or supported by welfare services, you are entitled to a 40% discount on the fee. Ask for the discount — it is not always offered.

The role of the kes alongside the Rabbanut
Since the government decision of February 2018, the status of the kessim has been recognized, they are integrated into the religious councils, and they are authorized to officiate weddings — so a couple who wishes can ask a kes to conduct the ceremony itself. In practice many families combine the two: registration and the ketubah are handled with the religious council, while the kes leads the ceremony, the blessings, and the family tradition. Both tracks are legitimate and official — this is not a matter of "correct" versus "less correct" but a family's choice. If you want a kes, say so when opening the file and check with the religious council which kessim in your area are registered to officiate.

If something gets stuck
Delays in the birur yahadut are the most familiar frustration in the process. Keep copies of every document you submit, ask for every decision in writing, and note dates and names. You may appeal within 30 days, and free accompaniment is available: Itim guides applicants through the Rabbanut and the rabbinical courts, Tebeka provides legal aid to community members, and the government hotline of the Unit for Coordinating the Struggle Against Racism receives complaints about discriminatory treatment. Full details further down this page.`,
  am: `በእስራኤል በአይሁዶች መካከል ጋብቻ የሚፈጸመው በረቢነት (ራባኑት) በኩል ነው፤ ስለዚህ ሁሉም ጥንዶች የሚጀምሩት ከአንድ ቦታ ነው፡ በሃይማኖት ምክር ቤት የጋብቻ መዝገብ (ቲክ ኒሱኢን) መክፈት። ለአንዳንድ የማኅበረሰቡ አባላት ሂደቱ ፈጣን ነው፤ ለሌሎች — በተለይ ወላጆቻቸው በእስራኤል በረቢነት ካላገቡ — በመጀመሪያ የይሁዲነት ማጣራት (ቢሩር የሁዱት) ያስፈልጋል። ይህ መመሪያ ሁለቱንም መንገዶች ያለ አስገራሚ ነገር ያብራራል።

ማጣራት መቼ ያስፈልጋል መቼስ አያስፈልግም
ወላጆችዎ በእስራኤል ከረቢነት የተሰጠ የጋብቻ ምስክር ወረቀት ወይም ኩቱባ ካላቸው በአብዛኛው ይበቃል፣ በቀጥታ መዝገብ መክፈት ይችላሉ። ወንድምዎ ወይም እህትዎ ማጣራቱን አልፎ ጸድቆ ከሆነም እንዲሁ — የምዝገባ ቢሮው ባለው መዝገብ ላይ መመርኮዝ ይችላል። ወላጆችዎ በኢትዮጵያ ወይም በእስራኤል በረቢነት ባልተመዘገበ የማኅበረሰብ ሥነ ሥርዓት ካገቡ ግን፣ መዝገቡን ከመክፈትዎ በፊት የይሁዲነት ማረጋገጫ ማውጣት ይኖርብዎታል። ማወቅ ጠቃሚ ነው፡ በመታወቂያዎና በአገር ውስጥ ሚኒስቴር "አይሁዳዊ" ተብሎ መመዝገብ ለረቢነት እንደ የይሁዲነት ማስረጃ አይቆጠርም — ይህ የቤተሰብ የረቢነት ሰነድ ሳይዙ ለጋብቻ የሚመዘገብ ሁሉ ላይ የሚሠራ ሀገር አቀፍ ሕግ ነው እንጂ ለዚህ ማኅበረሰብ ብቻ የተለየ አይደለም።

ለኢትዮጵያ ተወላጆች ማጣራቱ እንዴት ይካሄዳል
ለኢትዮጵያ ተወላጆች የተለየ መንገድ አለ፡ ጥያቄው የሚቀርበው በአካባቢዎ ለሚያገለግለውና በኢትዮጵያ አይሁዳዊነት ላይ ልዩ እውቀት ላለው ረቢ ነው እንጂ በጠቅላላው ሂደት አይደለም። የኢትዮጵያ ማኅበረሰብ የይሁዲነት ማጣሪያ ቅጽ ይሞላሉ — ቅጹ በጋብቻ ምዝገባ ቢሮዎችና በሃይማኖት አገልግሎት ሚኒስቴር ድረ-ገጽ ይገኛል — ከዚያም ዋና የልደት ምስክር ወረቀቶች (የእርስዎ፣ የእናትዎና የእናትዎ እናት)፣ የመታወቂያ ሰነዶችና የቤተሰብ ዝምድናን የሚያሳዩ ሰነዶች ያያይዛሉ። ረቢው ተጨማሪ ሰነድ ወይም ከዘመዶች ጋር ስብሰባ ሊጠይቅ ይችላል። ከስብሰባው በኋላ የይሁዲነት ማረጋገጫው ይሰጣል — በአብዛኛው በአንድ ወር ገደማ ውስጥ። ውስብስብ ጉዳዮች በኢየሩሳሌም ወደሚገኘው የኢትዮጵያ አይሁዶች ዋና ረቢ ጽሕፈት ቤት ይተላለፋሉ። ሂደቱ ክፍያ የለውም።

"አጠቃላዩ" ማጣራት — መዝገቡ በረቢ ፍርድ ቤት ሲከፈት
ማጣራቱ በክልል የረቢ ፍርድ ቤት ሲካሄድ (አጠቃላዩ መንገድ)፣ ከመኖሪያዎ ቅርብ በሆነው ፍርድ ቤት መዝገብ ይከፍታሉ — በኢሜይል yahadut@rbc.gov.il ወይም በስልክ *5889 (ቅጥያ 3)። ከዚያ ከመርማሪ ጋር ቀጠሮ ይያዛል፤ መርማሪው የእናትን የይሁዲነት ማስረጃ ይሰበስባል፡ ዋና የልደት ምስክር ወረቀቶች፣ የወላጆች የጋብቻ ሰነዶች፣ የአይሁድ ምልክቶች የሚታዩባቸው የቤተሰብ ፎቶዎችና የማኅበረሰብ መዝገቦች። በመጨረሻ በዳያን (ዳኛ) ፊት አጭር ችሎት ይካሄዳል፤ እናትዎን ወይም አያትዎን ማምጣት ይመከራል። ይህም ሂደት ነፃ ነው። በውሳኔ ላይ በ30 ቀናት ውስጥ በኢየሩሳሌም ላለው ከፍተኛ የረቢ ፍርድ ቤት ይግባኝ ማለት ይቻላል።

ዘራ ቤተ እስራኤልና የፈላሽ ሙራ ቤተሰቦች
በፈላሽ ሙራ ማዕቀፍ ለመጡ ወይም በቤተሰባቸው ውስጥ ቀደም ሲል ወደ ክርስትና የተቀየሩ ላሉ፣ ማጣራቱ የመለወጥ (ጊዩር) ወይም ወደ አይሁድነት የመመለስ ሰነዶችንም ሊያካትት ይችላል። እርስዎ ወይም ወላጆችዎ በእስራኤል ጊዩር ለሑምራ ካደረጉ — ዋናውን የፍርድ ቤት ሰነድ ይያዙ፤ ረቢነቱ የሚጠይቀው ያንን ነው። የዘራ ቤተ እስራኤል ሁኔታ ስሜታዊና በሕዝብ ዘንድ አከራካሪ ጉዳይ ነው፤ ይህ መመሪያ በተግባር የሚካሄደውን ሂደት ይገልጻል እንጂ በዙሪያው ያለውን ክርክር አይደለም። መዘግየት፣ ያልተለመደ ጥያቄ ወይም እምቢታ ካጋጠመዎ — ብቻዎን አይደሉም፤ በነፃ የሚያጅቡ አካላት አሉ (ከዚህ በታች ይመልከቱ)።

የጋብቻ መዝገብ መክፈት — ተግባራዊው ጎን
መዝገቡ የሚከፈተው ከጥንዶቹ አንዱ በሚኖርበት ቦታ ባለው የሃይማኖት ምክር ቤት ነው፣ በአብዛኛው ከሠርጉ ከሦስት ወር በፊት እስከ 45 ቀናት ባለው ጊዜ ውስጥ (ከዚህ ውጭ መክፈት ልዩ ፈቃድ ይጠይቃል)። መታወቂያዎችን ከአባሪው ጋር፣ ፎቶዎችን፣ እና የወላጆችዎን የረቢነት የጋብቻ ምስክር ወረቀት — ወይም ማጣራት አስፈልጎ ከነበረ የይሁዲነት ማረጋገጫውን — ይዘው ይምጡ። እንዲሁም ዔዴ ራቫኩት (የነጠላነት ምስክሮች) ያስፈልጋሉ፡ የሚያውቅዎት፣ የመጀመሪያ ደረጃ ዘመድ ያልሆኑ ሁለት ጎልማሶች ለጋብቻ ነጻ መሆንዎን ያረጋግጣሉ። ከጥንዶቹ አንዱ የተፋታ ወይም ባል/ሚስት የሞተበት ከሆነ ዋናውን የፍቺ ሰነድ ወይም የሞት ምስክር ወረቀት ማምጣት ያስፈልጋል። ለምዝገባው ክፍያ (አግራ) አለ፤ ከጥንዶቹ አንዱ የግዴታ ውትድርና ወታደር፣ በብሔራዊ አገልግሎት ላይ፣ ከ30 ዓመት በታች ተማሪ፣ በመጀመሪያዎቹ ሁለት የዓሊያ ዓመታት ውስጥ ያለ ኦሌ፣ የአካል ጉዳት ምስክር ወረቀት ያለው ወይም በማኅበራዊ አገልግሎት የሚደገፍ ከሆነ — 40% የክፍያ ቅናሽ የማግኘት መብት አለው። ቅናሹን ጠይቁ፤ ሁልጊዜ በራሳቸው አያቀርቡትም።

የቄሱ ሚና ከረቢነቱ ጎን
ከየካቲት 2018 የመንግሥት ውሳኔ ጀምሮ የቄሶች ደረጃ ታውቋል፣ በሃይማኖት ምክር ቤቶች ውስጥ ተካተዋል፣ ሠርግ የመፈጸምም ሥልጣን አላቸው — ስለዚህ የሚፈልግ ጥንድ ሥነ ሥርዓቱን ራሱ ቄስ እንዲመራው መጠየቅ ይችላል። በተግባር ብዙ ቤተሰቦች ሁለቱን ያዋህዳሉ፡ ምዝገባውና ኩቱባው ከሃይማኖት ምክር ቤቱ ጋር ይከናወናሉ፣ ቄሱ ደግሞ ሥነ ሥርዓቱን፣ ቡራኬዎቹንና የቤተሰቡን ባህል ይመራል። ሁለቱም መንገዶች ሕጋዊና ይፋዊ ናቸው — "ትክክለኛ" እና "ያነሰ ትክክለኛ" የሚባል ነገር የለም፤ የቤተሰብ ምርጫ ነው። ቄስ ከፈለጉ መዝገቡን ሲከፍቱ ይናገሩ፣ በአካባቢዎ የትኞቹ ቄሶች ሠርግ ለመፈጸም እንደተመዘገቡ ከሃይማኖት ምክር ቤቱ ያጣሩ።

አንድ ነገር ከተጣበቀ
በማጣራቱ ሂደት መዘግየት በጣም የታወቀው ብስጭት ነው። ያስገቡትን እያንዳንዱን ሰነድ ቅጂ ይያዙ፣ እያንዳንዱን ውሳኔ በጽሑፍ ይጠይቁ፣ ቀኖችንና ስሞችን ይመዝግቡ። በ30 ቀናት ውስጥ ይግባኝ ማለት ይችላሉ፣ ነፃ አጃቢነትም አለ፡ የዒቲም ተቋም በረቢነትና በረቢ ፍርድ ቤቶች ያጅባል፣ ጠበቃ (ተቤካ) ለማኅበረሰቡ አባላት የሕግ ድጋፍ ይሰጣል፣ የዘረኝነትን ትግል የማስተባበር መንግሥታዊ ክፍል መስመርም አድሏዊ አያያዝ ላይ ቅሬታ ይቀበላል። ሙሉ ዝርዝሩ ከዚህ ገጽ በታች ይገኛል።`,
};
