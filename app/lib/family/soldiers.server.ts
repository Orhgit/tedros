// Family & Support — Soldiers & Families hub (TED-142).
//
// Server-only content module. Per the .server-content convention the client
// bundle carries none of these strings: routes read them here and pass the
// active locale's slice through their loader. That includes the section
// chrome, which TED-137 left in the route file (see PR notes).
//
// HE is source-of-truth (CLAUDE.md). EN + AM are mirrors, and each guide
// additionally renders a standalone full Amharic summary aimed at PARENTS in
// every locale — the parent reading this is often the family member who must
// act, and is least likely to be reading Hebrew.
//
// ── VERIFICATION (TED-142 requires a primary source per procedural claim) ──
//
// Verified against:
//   - הסנגוריה הצבאית, idf.il (הפרקליטות הצבאית) — free representation, 24/7
//     including Shabbat/holidays, consultation before AND during a מצ"ח
//     interrogation at no cost, representation continues into the court, the
//     defender is not subordinate to the soldier's commanders, and the office
//     explicitly serves family members too.
//   - idf.il, עדכון מדיניות אכיפה — נפקדים ועריקים (28.11.2023) — the כלא 10
//     self-presentation route, and the rule that a soldier absent for fewer
//     than 30 days is judged in the unit rather than taken into the prison.
//     Flagged on-page as WARTIME policy, which is what the order says.
//   - idf.il, חיל המשטרה הצבאית (08.03.2021) — כלא 4 and כלא 6 closed
//     permanently and replaced by the "נווה צדק" facility outside בית ליד,
//     which includes a dedicated family-visit building, a מש"קית ת"ש per
//     company, and the מרכז "חוסן".
//   - idf.il, מוקד קפ"ץ (19.02.2024) — 1111 extension 5 then 4, staffed 24/7,
//     explicitly the address for soldiers' parents.
//   - נציב קבילות החיילים (mod.gov.il + Kol Zchut) — family members aged 16+
//     may file for a soldier who cannot, AND the commissioner may NOT handle
//     disciplinary matters or suspected criminal offenses.
//   - מבקר המדינה דוח 63ג (May 2013), as summarized by מרכז המחקר והמידע של
//     הכנסת, "סוגיות בתחומי עלייה, קליטה והתפוצות", June 2015, p. 21.
//
// DELIBERATELY EXCLUDED — no primary source found (see the PR body):
//   - Military-prison visiting days, hours, visitor limits, what may be
//     brought, and any visit-coordination phone number. Law-firm blogs give
//     confident numbers; none trace to an IDF or gov.il page. Publishing a
//     wrong visiting day would send a parent on a wasted trip across the
//     country, so the guide tells families to phone and ask instead.
//   - Whether/how a jailed soldier may make phone calls, and whether the
//     family is notified when a soldier is jailed.
//   - The maximum punishment a commander may impose in שיפוט משמעתי, the
//     right to demand trial before a בית דין צבאי instead, and appeal
//     windows — the numbers circulating online could not be traced to the
//     statute.
//   - Any statutory day-count defining נפקדות vs עריקות (the 30/21/14-day
//     figures in the IDF order are operational thresholds, not definitions).
//   - The claim that 11–15% of Ethiopian-Israeli soldiers are jailed during
//     service. No source supports it in that form; see the PR body.

import type { Locale } from "../i18n/config";

export interface SoldierResource {
  name: string;
  phone?: string;
  url?: string;
  description: Record<Locale, string>;
}

export interface SoldierTopic {
  slug: "detention" | "lone-soldier";
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  body: Record<Locale, string>;
  resources: SoldierResource[];
  /** ISO date — surfaced on-page and as Article.dateModified. */
  lastReviewed: string;
}

export interface SoldierFaq {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

const LAST_REVIEWED = "2026-08-31";

// ═══════════════════════════════════════════════════════════════════════════
// 1. חייל נעצר או נכלא — מה עושים
// ═══════════════════════════════════════════════════════════════════════════

export const DETENTION_TOPIC: SoldierTopic = {
  slug: "detention",
  title: {
    he: "חייל נעצר או נכלא — מה עושים",
    en: "A Soldier Was Detained or Jailed — What to Do",
    am: "ወታደር ታሰረ ወይም ተከሰረ — ምን ማድረግ",
  },
  subtitle: {
    he: "סניגור צבאי חינם 24 שעות ביממה, מה לעשות עוד לפני החקירה, מסלול ההתייצבות בנפקדות, ומה בדיוק המשפחה יכולה לעשות היום.",
    en: "A free military defender around the clock, what to do before the interrogation even starts, the self-presentation route for AWOL, and exactly what the family can do today.",
    am: "ነጻ የወታደራዊ ጠበቃ 24 ሰዓት፣ ምርመራው ከመጀመሩ በፊት ምን ማድረግ፣ ለנפקדות የራስን ማቅረቢያ መንገድ፣ እና ቤተሰቡ ዛሬ ምን ማድረግ እንደሚችል።",
  },
  body: {
    he: `אם בן או בת המשפחה שלכם נעצרו, נחקרו או נכלאו — יש לכם זכות אחת שחשוב להפעיל מיד, והיא חינמית: **סניגור צבאי**. הדף הזה מסביר מה מגיע לכם, למי פונים, ומה אנחנו לא יודעים בוודאות ולכן לא נכתוב כאן.

**למה דווקא הקהילה שלנו צריכה את המידע הזה**
שיעור הגיוס בקרב יוצאי אתיופיה גבוה מהממוצע הארצי — 86% בשנת 2012 לעומת 74% בכלל צה"ל. אלא שאחרי הגיוס, כלשון מבקר המדינה, "חל שבר". בדוח מבקר המדינה 63ג נמצא כי מבין החיילים שנכלאו ב-2010 היו **53% מיוצאי אתיופיה לעומת 25% מכלל צה"ל**, וכי שיעור הנפקדות והעריקות בקרבם היה גבוה **פי שלושה ויותר** מהשיעור בכלל צה"ל. המבקר הדגיש כי "נתונים אלה מדליקים נורת אזהרה חברתית". גם שנים אחר כך התמונה דומה: בשנת 2017 היוו יוצאי אתיופיה כ-4% מחיילי צה"ל — אך 15.07% מהחיילות הכלואות ו-10.78% מהחיילים הכלואים.

**והסיבה מתועדת.** מסמך שהוכן במרכז המחקר והמידע של הכנסת לקראת דיון בוועדת העלייה, הקליטה והתפוצות (דצמבר 2015) קובע במפורש: "רקע כלכלי — חלק ניכר מהחיילים סובלים מבעיות כלכליות בבתיהם ונאלצים לסייע בפרנסת המשפחה". במילים אחרות: חייל שנשאר בבית כדי לעזור לפרנסה, ומשם מתגלגל לנפקדות ולכליאה. זה לא גזירת גורל — יש לכך מענה מוסדר שהמדינה מחויבת לתת, והוא מתחיל במש"קית ת"ש. ראו את אשף ת"ש בהמשך.

**הזכות הראשונה: סניגור צבאי — חינם, בכל שעה**
הסנגוריה הצבאית מתמחה בהגנה על חיילים במשפט הפלילי-הצבאי. היא מעניקה ייעוץ משפטי בזמן אמת **בכל יום בשבוע ובכל שעות היממה — גם בשבתות ובחגים**. חייל שנחקר על ידי המשטרה הצבאית החוקרת (מצ"ח) או על ידי משטרת ישראל ומבקש להתייעץ עם סנגור — רשאי להתייעץ **גם קודם לחקירה וגם במהלכה**, ואם יבקש, יועמד לרשותו עורך דין מטעם הסנגוריה **ללא חיוב בעלות כספית כלשהי**. אם יוגש כתב אישום או יתבקש מעצר, הסנגוריה ממשיכה בייצוג בבית הדין.

**שתי נקודות שכדאי לדעת מראש**
ראשית, סנגור צבאי **אינו נתון למרות מפקדיו** — "ותעמוד לנגד עיניו טובת הנאשם בלבד". הוא לא "הצבא"; הוא הצד שלכם. שנית, הפנייה **דיסקרטית לחלוטין וחסויה על פי חוק, ואינה מעידה על אשמה או מעוררת חשד**. אין שום מחיר לכך שמתייעצים — יש מחיר לכך שלא.

**חשוב: הסנגוריה עונה גם לבני משפחה.** אחד מתפקידיה המוגדרים הוא "מתן מענה לחיילים הנתונים בחקירה או עומדים למשפט ולבני משפחותיהם, בכל שעות היממה". אתם לא צריכים לחכות שהחייל יתקשר.

**נעדר מהשירות? מסלול ההתייצבות**
לפי עדכון מדיניות האכיפה של צה"ל מנובמבר 2023, כל עריק מתייצב במתקן הכליאה **"כלא 10"** לשם הסדרת מעמד וסגירת ההיעדרות. באותו עדכון נקבע כי חייל שטרם נגרע לעריקות **ייקלט בכלא רק אם נעדר מהשירות 30 יום או יותר** — יתר החיילים יישפטו בדין משמעתי ביחידה. המשמעות המעשית: ככל שמתייצבים מוקדם יותר, כך התיק קטן יותר. התייעצו עם הסנגוריה **לפני** ההתייצבות.

> שימו לב: זו מדיניות שנקבעה לתקופת המלחמה — בלשון הפקודה, "מדיניות זו תקפה לאורך כל תקופת המלחמה ועד לביטולה או עדכונה". בדקו מול הסנגוריה מה תקף היום.

**איפה נמצא מתקן הכליאה**
כלא 4 וכלא 6 **נסגרו לצמיתות** והוחלפו במתקן "נווה צדק", שהוקם מחוץ לבסיס "בית ליד". מדריכים ישנים רבים עדיין מפנים לכלא 4 ו-6 — אל תיסעו לשם. במתקן קיים **מבנה ייעודי לביקורי משפחות**, וכן מש"קית ת"ש צמודה בכל פלוגה ומרכז "חוסן" הכולל מערך ת"ש, רפואה ובריאות הנפש.

**מה אנחנו לא יודעים — ולכן לא נכתוב**
לא מצאנו מקור רשמי לימי הביקור ולשעות הביקור במתקן הכליאה, למספר המבקרים המותר, למה שמותר להביא, או למספר טלפון לתיאום ביקור. באינטרנט מסתובבים מספרים בטוחים למראה — חלקם למעשה הכללים של **שירות בתי הסוהר האזרחי**, שאינם חלים על כליאה צבאית. במקום לנחש: התקשרו לסנגוריה הצבאית (073-310-3300) או למוקד קפ"ץ (1111, שלוחה 5 ואז 4) ושאלו. שניהם עונים גם להורים.

**מי הכתובת הנכונה — וזו טעות נפוצה**
נציב קבילות החיילים פועל מכוח פרק י"א לחוק השיפוט הצבאי, והוא כתובת מצוינת לעוולות בשירות. זכות ההגשה רחבה: לא רק החייל אלא גם **הורים, בן או בת זוג, ואחים או ילדים מגיל 16** — או כל אדם שהחייל ביקש ממנו. אבל שימו לב: **הנציב אינו מוסמך לטפל בעניינים משמעתיים או בעבירות פליליות** — כלומר, בדיוק בשאלה אם החייל אשם. שם הכתובת היא הסנגוריה הצבאית. ההבחנה הזו חוסכת שבועות.

**זכות שכמעט אף אחד לא מכיר: המעטפה הסגורה**
סעיף 545(ב) לחוק השיפוט הצבאי מקנה לחייל **כלוא או עצור** ערוץ קבילה ייעודי: הקבילה נמסרת למפקד בית הכלא, והוא חייב להעבירה אל הנציב **מבלי לפותחה**. כלומר — חייל שנמצא בכליאה יכול להתלונן על תנאי הכליאה או על היחס אליו בלי שהתלונה תיקרא על ידי מי שהיא נוגעת לו. אם בנכם או בתכם מספרים על יחס פוגעני בכליאה, זו הדרך. (על אשמה או על העונש עצמו — עדיין הסנגוריה.)

**מה לעשות היום — לפי הסדר**
1. התקשרו לסנגוריה הצבאית: 073-310-3300 או sanegorya@idf.il. אפשר גם לפני שיש כתב אישום, וגם אם אתם ההורים.
2. אם אינכם יודעים היכן החייל נמצא או מה מצבו — מוקד קפ"ץ, 1111 שלוחה 5 ואז 4, פועל 24/7 ומיועד גם לאזרחים ולהורים.
3. אם ברקע יש מצוקה כלכלית במשפחה — פתחו תיק ת"ש. זו הסיבה השכיחה לנפקדות, ויש לה פתרון מוסדר.
4. אם העניין אינו משמעתי או פלילי אלא עוול בשירות — נציב קבילות החיילים, 03-6977374.

> **הבהרה משפטית:** מידע זה כללי ואינו ייעוץ משפטי. למקרה קונקרטי פנו לסנגוריה הצבאית — הייצוג חינם — או לעורך-דין.`,
    en: `If a member of your family has been detained, interrogated or jailed, there is one right worth exercising immediately, and it costs nothing: **a military defender**. This page explains what you are entitled to, whom to call, and what we could not verify and therefore will not state here.

**Why our community especially needs this**
Enlistment among Ethiopian-Israelis is above the national average — 86% in 2012 versus 74% across the IDF. But after enlistment, in the State Comptroller's words, "a rupture occurs". State Comptroller report 63c found that of the soldiers jailed in 2010, **53% were of Ethiopian origin versus 25% across the IDF**, and that their AWOL and desertion rate was **more than three times** the IDF-wide rate. The Comptroller stressed that "these figures light a social warning lamp". Years later the picture is similar: in 2017 Ethiopian-Israelis were some 4% of IDF soldiers — but 15.07% of jailed female soldiers and 10.78% of jailed male soldiers.

**And the cause is documented.** A paper prepared by the Knesset Research and Information Center ahead of a session of the Immigration, Absorption and Diaspora Affairs Committee (December 2015) states explicitly: "Economic background — a considerable share of the soldiers suffer from financial problems at home and are compelled to help support the family." In other words: a soldier who stays home to help make ends meet, and from there slides into absence and incarceration. This is not fate — there is a formal remedy the state is obliged to provide, and it starts with the family-support NCO. See the family-support wizard below.

**The first right: a military defender — free, at any hour**
The Military Public Defender's Office specializes in defending soldiers in military criminal law. It provides real-time legal advice **every day of the week and at all hours — including Shabbat and holidays**. A soldier questioned by the Military Police CID (מצ"ח) or by the Israel Police who asks to consult a defender may do so **both before and during the interrogation**, and on request will be assigned a lawyer from the office **at no financial cost whatsoever**. If an indictment is filed or detention is sought, the office continues the representation in court.

**Two things worth knowing in advance**
First, a military defender **is not subordinate to the soldier's commanders** — "the defendant's interest alone shall guide them". The defender is not "the army"; they are your side. Second, approaching them is **entirely discreet and confidential by law, and neither indicates guilt nor arouses suspicion**. There is no price for consulting — there is a price for not consulting.

**Important: the office answers family members too.** One of its defined duties is "providing a response to soldiers under investigation or standing trial, and to their family members, at all hours". You do not need to wait for the soldier to call.

**Absent from service? The self-presentation route**
Under the IDF's enforcement-policy update of November 2023, a deserter presents at the **"כלא 10"** detention facility to regularize their status and close the absence. That same update provides that a soldier not yet classified as a deserter **will be taken into the prison only if absent for 30 days or more** — other soldiers are judged in a disciplinary proceeding in their unit. The practical meaning: the earlier you present, the smaller the case. Consult the defender's office **before** presenting.

> Note: this policy was set for the wartime period — in the order's words, "this policy is valid throughout the war period and until cancelled or updated". Check with the defender's office what applies today.

**Where the detention facility is**
Prison 4 and Prison 6 were **permanently closed** and replaced by the "Neve Tzedek" facility built outside the Beit Lid base. Many older guides still direct families to Prisons 4 and 6 — do not travel there. The facility includes a **dedicated family-visit building**, a family-support NCO attached to every company, and a "Hosen" centre covering family support, medicine and mental health.

**What we do not know — and therefore will not state**
We found no official source for visiting days or hours at the military detention facility, the permitted number of visitors, what may be brought in, or a phone number for coordinating a visit. Confident-looking numbers circulate online — some are in fact the rules of the **civilian Israel Prison Service**, which do not apply to military detention. Rather than guess: call the Military Public Defender (073-310-3300) or the KAPATZ centre (1111, extension 5 then 4) and ask. Both answer parents too.

**Who the right address is — a common mistake**
The Soldiers' Complaints Commissioner operates under Chapter XI of the Military Justice Law and is an excellent address for service grievances. The right to file is broad: not only the soldier but also **parents, a spouse, and siblings or children aged 16+** — or anyone the soldier asks. But note: **the Commissioner is not authorized to handle disciplinary matters or criminal offenses** — that is, precisely the question of whether the soldier is guilty. There, the address is the Military Public Defender. This distinction saves weeks.

**A right almost nobody knows: the sealed envelope**
Section 545(b) of the Military Justice Law gives an **imprisoned or detained** soldier a dedicated complaint channel: the complaint is handed to the prison commander, who must forward it to the Commissioner **without opening it**. That means a soldier in custody can complain about conditions or about how they are being treated without the complaint being read by the very people it concerns. If your son or daughter describes abusive treatment in detention, this is the route. (On guilt or the punishment itself — still the defender's office.)

**What to do today — in order**
1. Call the Military Public Defender: 073-310-3300 or sanegorya@idf.il. You may call before any indictment exists, and you may call as the parent.
2. If you do not know where the soldier is or how they are — the KAPATZ centre, 1111 extension 5 then 4, operates 24/7 and is intended for civilians and parents as well.
3. If family financial hardship is in the background — open a family-support (ת"ש) case. It is the common cause of AWOL, and it has a formal remedy.
4. If the matter is not disciplinary or criminal but a service grievance — the Soldiers' Complaints Commissioner, 03-6977374.

> **Legal note:** This is general information, not legal advice. For a concrete case contact the Military Public Defender — representation is free — or a lawyer.`,
    am: `የቤተሰብዎ አባል ከታሰረ፣ ከተመረመረ ወይም ከተከሰረ — ወዲያውኑ ሊጠቀሙበት የሚገባ አንድ መብት አለ፣ እና ነጻ ነው: **የወታደራዊ ጠበቃ**። ይህ ገጽ ምን መብት እንዳለዎት፣ ለማን መደወል እንዳለብዎት፣ እና ማረጋገጥ ስላልቻልነው ነገር እዚህ የማንጽፈውን ያስረዳል።

**ማህበረሰባችን ይህን መረጃ በተለይ ለምን ይፈልጋል**
በኢትዮጵያ ተወላጆች መካከል የውትድርና ምዝገባ ከሀገራዊ አማካይ ከፍ ያለ ነው — በ2012 86% ከጠቅላላ ጦር ኃይሉ 74% ጋር ሲነጻጸር። ነገር ግን ከምዝገባ በኋላ፣ በመንግሥት ኦዲተር አገላለጽ፣ "ስብራት ይከሰታል"። የመንግሥት ኦዲተር ሪፖርት 63ג እንዳገኘው በ2010 ከታሰሩት ወታደሮች መካከል **53% የኢትዮጵያ ተወላጆች ነበሩ፣ በጠቅላላ ጦር ኃይሉ ካለው 25% ጋር ሲነጻጸር**፣ እና የנפקדות እና የעריקות መጠናቸው ከጠቅላላ ጦር ኃይሉ **ከሦስት እጥፍ በላይ** ከፍ ያለ ነበር። ኦዲተሩ "እነዚህ መረጃዎች ማህበራዊ የማስጠንቀቂያ መብራት ያበራሉ" ሲል አጽንዖት ሰጥቷል። ከዓመታት በኋላም ምስሉ ተመሳሳይ ነው: በ2017 የኢትዮጵያ ተወላጆች ከጦር ኃይሉ ወታደሮች 4% ያህል ነበሩ — ነገር ግን ከታሰሩት ሴት ወታደሮች 15.07% እና ከታሰሩት ወንድ ወታደሮች 10.78% ነበሩ።

**ምክንያቱም ተመዝግቧል።** በክነሴት የምርምር እና መረጃ ማዕከል ለዕልቀት፣ ለመቀበል እና ለስደተኞች ኮሚቴ ስብሰባ የተዘጋጀ ሰነድ (ታኅሣሥ 2015) በግልጽ ይላል: "የኢኮኖሚ ዳራ — ከወታደሮቹ ጉልህ ክፍል በቤታቸው የገንዘብ ችግር ይሰቃያሉ እና ቤተሰቡን ለመርዳት ይገደዳሉ"። በሌላ አነጋገር: ወታደሩ ለቤተሰቡ ገቢ ለመርዳት ቤት ይቀራል፣ ከዚያም ወደ נפקדות እና ወደ እስር ይንሸራተታል። ይህ ዕጣ ፈንታ አይደለም — መንግሥት ሊሰጥ የሚገባው የተደራጀ መፍትሔ አለ፣ እና የሚጀምረው ከמש"קית ת"ש ነው። ከታች ያለውን የת"ש አዋቂ ይመልከቱ።

**የመጀመሪያው መብት: የወታደራዊ ጠበቃ — ነጻ፣ በማንኛውም ሰዓት**
የወታደራዊ ጠበቃ ጽሕፈት ቤት ወታደሮችን በወታደራዊ የወንጀል ሕግ በመከላከል ላይ የተካነ ነው። **በሳምንቱ በሁሉም ቀናት እና በሁሉም የቀኑ ሰዓታት — በሰንበትና በበዓላትም ጭምር** በቅጽበት የሕግ ምክር ይሰጣል። በወታደራዊ ፖሊስ መርማሪ (מצ"ח) ወይም በእስራኤል ፖሊስ የሚመረመር ወታደር ጠበቃ ማማከር ከጠየቀ — **ከምርመራው በፊትም ሆነ በምርመራው ወቅት** ማማከር ይችላል፣ እና ከጠየቀ ከጽሕፈት ቤቱ ጠበቃ **ያለ ምንም የገንዘብ ክፍያ** ይመደብለታል። ክስ ከቀረበ ወይም እስር ከተጠየቀ ጽሕፈት ቤቱ በፍርድ ቤት ውክልናውን ይቀጥላል።

**አስቀድሞ ማወቅ የሚገባቸው ሁለት ነጥቦች**
አንደኛ፣ የወታደራዊ ጠበቃ **ለወታደሩ አዛዦች ተገዥ አይደለም** — "የተከሳሹ ጥቅም ብቻ በዓይኑ ፊት ይቆማል"። ጠበቃው "ሠራዊቱ" አይደለም፤ የእርስዎ ወገን ነው። ሁለተኛ፣ ወደ እነሱ መቅረብ **ሙሉ በሙሉ ሚስጥራዊ ነው እና በሕግ የተጠበቀ ነው፣ ጥፋተኛነትን አያመለክትም ጥርጣሬንም አያስነሳም**። ማማከር ዋጋ የለውም — ያለማማከር ግን ዋጋ አለው።

**አስፈላጊ: ጽሕፈት ቤቱ ለቤተሰብ አባላትም ይመልሳል።** ከተግባሮቹ አንዱ "በምርመራ ላይ ላሉ ወይም ለፍርድ ለቀረቡ ወታደሮች **እና ለቤተሰቦቻቸው**፣ በሁሉም የቀኑ ሰዓታት ምላሽ መስጠት" ነው። ወታደሩ እስኪደውል መጠበቅ የለብዎትም።

**ከአገልግሎት ቀርቷል? የራስን ማቅረቢያ መንገድ**
በኅዳር 2023 በወጣው የጦር ኃይሉ የአፈጻጸም ፖሊሲ ማሻሻያ መሠረት፣ እያንዳንዱ ሸሽቶ የቀረ ሰው ሁኔታውን ለማስተካከል በ**"כלא 10"** የእስር ተቋም ራሱን ያቀርባል። በዚያው ማሻሻያ ውስጥ ገና እንደ ሸሽቶ ያልተመዘገበ ወታደር **ከአገልግሎት 30 ቀናት ወይም ከዚያ በላይ ከቀረ ብቻ** ወደ እስር ቤት እንደሚገባ ተወስኗል — ሌሎቹ ወታደሮች በክፍላቸው ውስጥ በዲሲፕሊን ይዳኛሉ። ተግባራዊ ትርጉሙ: ቶሎ ራስን ባቀረቡ ቁጥር መዝገቡ ያንሳል። ራስዎን **ከማቅረብዎ በፊት** ጠበቃውን ያማክሩ።

> ልብ ይበሉ: ይህ ለጦርነቱ ጊዜ የተወሰነ ፖሊሲ ነው — በትዕዛዙ አገላለጽ "ይህ ፖሊሲ በጦርነቱ ጊዜ ሁሉ እስኪሰረዝ ወይም እስኪሻሻል ድረስ የጸና ነው"። ዛሬ ምን እንደሚሠራ ከጠበቃው ጽሕፈት ቤት ያረጋግጡ።

**የእስር ተቋሙ የት ነው**
כלא 4 እና כלא 6 **ለዘለቄታው ተዘግተዋል** እና ከ"בית ליד" ሰፈር ውጭ በተሠራው "נווה צדק" ተቋም ተተክተዋል። ብዙ አሮጌ መመሪያዎች አሁንም ወደ כלא 4 እና 6 ይመራሉ — ወደዚያ አይሂዱ። በተቋሙ ውስጥ **ለቤተሰብ ጉብኝት የተለየ ሕንጻ** አለ፣ እንዲሁም በእያንዳንዱ ሻለቃ የת"ש ኃላፊ እና የת"ש፣ የሕክምና እና የአእምሮ ጤና አገልግሎት የያዘ "חוסן" ማዕከል አለ።

**የማናውቀው — ስለዚህ የማንጽፈው**
በእስር ተቋሙ ውስጥ ስለ ጉብኝት ቀናትና ሰዓታት፣ ስለሚፈቀደው የጎብኚዎች ብዛት፣ ስለሚገባው ዕቃ ወይም ጉብኝት ለማስተባበር ስለሚያገለግል የስልክ ቁጥር ኦፊሴላዊ ምንጭ አላገኘንም። በኢንተርኔት ላይ እርግጠኛ የሚመስሉ ቁጥሮች ይዘዋወራሉ — አንዳንዶቹ በእውነቱ የ**ሲቪል የእስር ቤቶች አገልግሎት** ደንቦች ናቸው፣ እነሱም በወታደራዊ እስር ላይ አይሠሩም። ከመገመት ይልቅ: ለወታደራዊ ጠበቃ (073-310-3300) ወይም ለ-קפ"ץ ማዕከል (1111፣ ቅጥያ 5 ከዚያ 4) ደውለው ይጠይቁ። ሁለቱም ለወላጆችም ይመልሳሉ።

**ትክክለኛው አድራሻ ማን ነው — የተለመደ ስህተት**
የወታደሮች ቅሬታ ኮሚሽነር በወታደራዊ የፍትሕ ሕግ ምዕራፍ י"א መሠረት ይሠራል፣ እና በአገልግሎት ውስጥ ላሉ በደሎች በጣም ጥሩ አድራሻ ነው። የማቅረብ መብቱ ሰፊ ነው: ወታደሩ ብቻ ሳይሆን **ወላጆች፣ የትዳር አጋር፣ እና ከ16 ዓመት በላይ የሆኑ ወንድሞች/እህቶች ወይም ልጆች** — ወይም ወታደሩ የጠየቀው ማንኛውም ሰው። ነገር ግን ልብ ይበሉ: **ኮሚሽነሩ የዲሲፕሊን ጉዳዮችን ወይም የወንጀል ጥፋቶችን ለማስተናገድ ሥልጣን የለውም** — ማለትም ወታደሩ ጥፋተኛ ስለመሆኑ ጥያቄ። እዚያ አድራሻው የወታደራዊ ጠበቃ ነው። ይህ ልዩነት ሳምንታትን ያድናል።

**ማንም የማያውቀው መብት: የታሸገ ፖስታ**
የወታደራዊ የፍትሕ ሕግ አንቀጽ 545(ב) **ለታሰረ ወይም ለተከሰረ** ወታደር የተለየ የቅሬታ መንገድ ይሰጣል: ቅሬታው ለእስር ቤቱ አዛዥ ይሰጣል፣ እሱም **ሳይከፍተው** ወደ ኮሚሽነሩ ማስተላለፍ አለበት። ይህ ማለት በእስር ላይ ያለ ወታደር ስለ እስር ሁኔታው ወይም ስለሚደረግለት አያያዝ ቅሬታ ማቅረብ ይችላል፣ ቅሬታውም ጉዳዩ በሚመለከታቸው ሰዎች ሳይነበብ። ልጅዎ በእስር ውስጥ ስለ ጎጂ አያያዝ ከነገረዎት፣ መንገዱ ይህ ነው። (ስለ ጥፋተኛነት ወይም ስለ ቅጣቱ ራሱ — አሁንም ጠበቃው ነው።)

**ዛሬ ምን ማድረግ — በቅደም ተከተል**
1. ለወታደራዊ ጠበቃ ይደውሉ: 073-310-3300 ወይም sanegorya@idf.il። ክስ ከመቅረቡ በፊትም መደወል ይችላሉ፣ እንደ ወላጅም መደወል ይችላሉ።
2. ወታደሩ የት እንዳለ ወይም ሁኔታው ምን እንደሆነ ካላወቁ — የקפ"ץ ማዕከል፣ 1111 ቅጥያ 5 ከዚያ 4፣ 24/7 ይሠራል እና ለሲቪሎችና ለወላጆችም የተዘጋጀ ነው።
3. ከበስተጀርባ የቤተሰብ የገንዘብ ችግር ካለ — የת"ש መዝገብ ይክፈቱ። ይህ የנפקדות የተለመደ ምክንያት ነው፣ እና የተደራጀ መፍትሔ አለው።
4. ጉዳዩ የዲሲፕሊን ወይም የወንጀል ሳይሆን የአገልግሎት በደል ከሆነ — የወታደሮች ቅሬታ ኮሚሽነር፣ 03-6977374።

> **የሕግ ማስታወሻ:** ይህ አጠቃላይ መረጃ ነው፣ የሕግ ምክር አይደለም። ለተጨባጭ ጉዳይ ወደ ወታደራዊ ጠበቃ — ውክልናው ነጻ ነው — ወይም ወደ ጠበቃ ይሂዱ።`,
  },
  resources: [
    {
      name: "הסנגוריה הצבאית",
      phone: "073-310-3300",
      url: "https://www.idf.il/אתרי-יחידות/הפרקליטות-הצבאית/הסנגוריה-הצבאית/",
      description: {
        he: "ייצוג והגנה על חיילים במשפט הפלילי-הצבאי — חינם, בכל שעות היממה כולל שבתות וחגים, גם לפני החקירה ובמהלכה. עונה גם לבני משפחה. דוא\"ל: sanegorya@idf.il",
        en: "Representation and defence of soldiers in military criminal law — free, around the clock including Shabbat and holidays, before and during interrogation. Answers family members too. Email: sanegorya@idf.il",
        am: "ወታደሮችን በወታደራዊ የወንጀል ሕግ መከላከል — ነጻ፣ 24 ሰዓት በሰንበትና በበዓላትም፣ ከምርመራ በፊትና በምርመራ ወቅት። ለቤተሰብ አባላትም ይመልሳል። ኢሜይል: sanegorya@idf.il",
      },
    },
    {
      name: 'מוקד קפ"ץ — קצינת פניות הציבור',
      phone: "1111",
      description: {
        he: 'מוקד צה"ל לפניות הציבור, 24/7 — שלוחה 5 ואז שלוחה 4. הכתובת גם להורים ולאזרחים שרוצים לברר מה קורה עם חייל. דוא"ל: Kapatz@digital.idf.il',
        en: "The IDF public-inquiries centre, 24/7 — extension 5 then extension 4. Also the address for parents and civilians seeking to find out what is happening with a soldier. Email: Kapatz@digital.idf.il",
        am: "የጦር ኃይሉ የሕዝብ ጥያቄዎች ማዕከል፣ 24/7 — ቅጥያ 5 ከዚያ ቅጥያ 4። ስለ ወታደር ለማወቅ ለሚፈልጉ ወላጆችና ሲቪሎችም አድራሻ ነው። ኢሜይል: Kapatz@digital.idf.il",
      },
    },
    {
      name: "נציב קבילות החיילים",
      phone: "03-6977374",
      url: "https://form.mod.gov.il/NakhalComplaint/form",
      description: {
        he: 'קבילות על עוולות בשירות, מכוח פרק י"א לחוק השיפוט הצבאי. רשאים להגיש גם הורים, בן/בת זוג ואחים או ילדים מגיל 16. לחייל כלוא או עצור — ערוץ "מעטפה סגורה" לפי סעיף 545(ב): הקבילה מועברת לנציב מבלי שתיפתח. הנציב אינו מטפל בעניינים משמעתיים או פליליים. דוא"ל: nakhal@mod.gov.il',
        en: "Complaints about service grievances, under Chapter XI of the Military Justice Law. Parents, a spouse, and siblings or children aged 16+ may also file. For an imprisoned or detained soldier — a \"sealed envelope\" channel under section 545(b): the complaint reaches the Commissioner unopened. The Commissioner does not handle disciplinary or criminal matters. Email: nakhal@mod.gov.il",
        am: "በአገልግሎት ውስጥ ስላሉ በደሎች ቅሬታ። ወላጆች፣ የትዳር አጋር እና ከ16 ዓመት በላይ ወንድሞች/እህቶች ወይም ልጆችም ማቅረብ ይችላሉ። ለታሰረ ወታደር — በአንቀጽ 545(ב) መሠረት የ\"ታሸገ ፖስታ\" መንገድ: ቅሬታው ሳይከፈት ወደ ኮሚሽነሩ ይደርሳል። ኢሜይል: nakhal@mod.gov.il",
      },
    },
    {
      name: "האגודה למען החייל",
      phone: "072-2702222",
      url: "https://www.ufis.org.il/",
      description: {
        he: 'סיוע חומרי לחיילים ממשפחות מעוטות יכולה ולחיילים בודדים — "קופת הידידות" (ריהוט ומוצרי חשמל) ותווי חג. הבקשה מוגשת דרך מש"קית ת"ש ביחידה, לא ישירות.',
        en: 'Material assistance for soldiers from low-income families and lone soldiers — the "Kupat HaYedidut" fund (furniture and appliances) and holiday vouchers. Requests are submitted through the unit\'s family-support NCO, not directly.',
        am: "ከዝቅተኛ ገቢ ቤተሰቦች ለሆኑ ወታደሮች እና ለብቸኛ ወታደሮች ቁሳዊ እርዳታ — የቤት ዕቃና የኤሌክትሪክ ዕቃዎች እና የበዓል ቫውቸሮች። ጥያቄው በክፍሉ በኩል በמש\"קית ת\"ש ይቀርባል፣ በቀጥታ አይደለም።",
      },
    },
  ],
  lastReviewed: LAST_REVIEWED,
};

export const DETENTION_FAQS: SoldierFaq[] = [
  {
    question: {
      he: "כמה עולה סניגור צבאי?",
      en: "How much does a military defender cost?",
      am: "የወታደራዊ ጠበቃ ስንት ያስከፍላል?",
    },
    answer: {
      he: "כלום. חייל שנחקר על ידי מצ\"ח או משטרת ישראל ומבקש סנגור — יועמד לרשותו עורך דין מטעם הסנגוריה הצבאית ללא חיוב בעלות כספית כלשהי, והייצוג ממשיך גם בבית הדין אם יוגש כתב אישום.",
      en: "Nothing. A soldier questioned by the Military Police CID or the Israel Police who requests a defender will be assigned a lawyer from the Military Public Defender's Office at no financial cost whatsoever, and the representation continues in court if an indictment is filed.",
      am: "ምንም። በמצ\"ח ወይም በእስራኤል ፖሊስ የሚመረመር ወታደር ጠበቃ ከጠየቀ ያለ ምንም ክፍያ ይመደብለታል፣ ክስ ከቀረበም ውክልናው በፍርድ ቤት ይቀጥላል።",
    },
  },
  {
    question: {
      he: "אני ההורה — האם הסנגוריה תדבר איתי בכלל?",
      en: "I am the parent — will the defender's office even speak with me?",
      am: "እኔ ወላጅ ነኝ — የጠበቃው ጽሕፈት ቤት ከእኔ ጋር ይነጋገራል?",
    },
    answer: {
      he: "כן. אחד מתפקידיה המוגדרים של הסנגוריה הצבאית הוא מתן מענה לחיילים הנתונים בחקירה או עומדים למשפט ולבני משפחותיהם, בכל שעות היממה. אינכם צריכים לחכות שהחייל יתקשר. חייגו 073-310-3300.",
      en: "Yes. One of the office's defined duties is providing a response to soldiers under investigation or standing trial and to their family members, at all hours. You do not need to wait for the soldier to call. Dial 073-310-3300.",
      am: "አዎ። ከጽሕፈት ቤቱ ተግባራት አንዱ በምርመራ ላይ ላሉ ወታደሮች እና ለቤተሰቦቻቸው በሁሉም ሰዓታት ምላሽ መስጠት ነው። ወታደሩ እስኪደውል መጠበቅ የለብዎትም። 073-310-3300 ይደውሉ።",
    },
  },
  {
    question: {
      he: "מתי כדאי להתייעץ — לפני החקירה או אחריה?",
      en: "When should we consult — before or after the interrogation?",
      am: "መቼ ማማከር አለብን — ከምርመራው በፊት ወይስ በኋላ?",
    },
    answer: {
      he: "לפני. הזכות להתייעץ עם סנגור קיימת גם קודם לחקירה וגם במהלכה, והסנגוריה זמינה בכל יום ובכל שעה, כולל שבתות וחגים. הפנייה דיסקרטית וחסויה על פי חוק ואינה מעידה על אשמה.",
      en: "Before. The right to consult a defender exists both before and during the interrogation, and the office is available every day at any hour, including Shabbat and holidays. The approach is discreet and confidential by law and does not indicate guilt.",
      am: "ከበፊቱ። ጠበቃ የማማከር መብት ከምርመራው በፊትም በምርመራው ወቅትም አለ፣ ጽሕፈት ቤቱም በየቀኑ በማንኛውም ሰዓት ይገኛል። ጥያቄው ሚስጥራዊ ነው እና ጥፋተኛነትን አያመለክትም።",
    },
  },
  {
    question: {
      he: "החייל נעדר מהשירות — עדיף להתייצב או לחכות?",
      en: "The soldier is absent from service — is it better to present or to wait?",
      am: "ወታደሩ ከአገልግሎት ቀርቷል — ራስን ማቅረብ ይሻላል ወይስ መጠበቅ?",
    },
    answer: {
      he: 'להתייצב, ורצוי אחרי שיחה עם הסנגוריה. לפי עדכון מדיניות האכיפה מנובמבר 2023, חייל שטרם נגרע לעריקות ייקלט בכלא רק אם נעדר 30 יום או יותר; יתר החיילים נשפטים בדין משמעתי ביחידה. מדובר במדיניות שנקבעה לתקופת המלחמה — בדקו מה תקף היום.',
      en: "Present, preferably after speaking with the defender's office. Under the November 2023 enforcement-policy update, a soldier not yet classified as a deserter is taken into the prison only if absent for 30 days or more; other soldiers are judged in a disciplinary proceeding in their unit. This policy was set for the wartime period — check what applies today.",
      am: "ራስን ማቅረብ፣ በተለይም ከጠበቃው ጋር ከተነጋገሩ በኋላ። በኅዳር 2023 ማሻሻያ መሠረት ገና እንደ ሸሽቶ ያልተመዘገበ ወታደር 30 ቀናት ወይም ከዚያ በላይ ከቀረ ብቻ ወደ እስር ቤት ይገባል። ይህ የጦርነት ጊዜ ፖሊሲ ነው — ዛሬ ምን እንደሚሠራ ያረጋግጡ።",
    },
  },
  {
    question: {
      he: "לאיזה כלא נוסעים לבקר?",
      en: "Which prison do we travel to for a visit?",
      am: "ለጉብኝት ወደ የትኛው እስር ቤት እንሄዳለን?",
    },
    answer: {
      he: 'לא לכלא 4 ולא לכלא 6 — שניהם נסגרו לצמיתות והוחלפו במתקן "נווה צדק" שמחוץ לבסיס בית ליד, שבו יש מבנה ייעודי לביקורי משפחות. את ימי ושעות הביקור עצמם לא פרסמנו כאן משום שלא מצאנו להם מקור רשמי — התקשרו לסנגוריה (073-310-3300) או לקפ"ץ (1111 שלוחה 5 ואז 4) ותאמו.',
      en: 'Not Prison 4 and not Prison 6 — both were permanently closed and replaced by the "Neve Tzedek" facility outside the Beit Lid base, which has a dedicated family-visit building. We have not published the visiting days and hours themselves because we found no official source for them — call the defender\'s office (073-310-3300) or KAPATZ (1111 ext. 5 then 4) and arrange it.',
      am: 'ወደ כלא 4 ወይም כלא 6 አይደለም — ሁለቱም ለዘለቄታው ተዘግተው ከבית ליד ሰፈር ውጭ ባለው "נווה צדק" ተቋም ተተክተዋል፣ እዚያም ለቤተሰብ ጉብኝት የተለየ ሕንጻ አለ። የጉብኝት ቀናትና ሰዓታት ኦፊሴላዊ ምንጭ ስላላገኘንላቸው እዚህ አላሳተምንም — ደውለው ያስተባብሩ።',
    },
  },
  {
    question: {
      he: "פנינו לנציב קבילות החיילים והופנינו הלאה — למה?",
      en: "We contacted the Soldiers' Complaints Commissioner and were redirected — why?",
      am: "ወደ የወታደሮች ቅሬታ ኮሚሽነር ቀርበን ተመለስን — ለምን?",
    },
    answer: {
      he: "משום שהנציב אינו מוסמך לטפל בעניינים משמעתיים או בעבירות פליליות. לחייל שנעצר, נחקר או נכלא — הכתובת היא הסנגוריה הצבאית. הנציב כן הכתובת לעוולות אחרות בשירות, ובני משפחה מגיל 16 רשאים להגיש קבילה עבור חייל שאינו יכול להגיש בעצמו.",
      en: "Because the Commissioner is not authorized to handle disciplinary matters or criminal offenses. For a soldier detained, interrogated or jailed, the address is the Military Public Defender. The Commissioner is the address for other service grievances, and family members aged 16+ may file for a soldier who cannot file themselves.",
      am: "ኮሚሽነሩ የዲሲፕሊን ጉዳዮችን ወይም የወንጀል ጥፋቶችን ለማስተናገድ ሥልጣን ስለሌለው ነው። ለታሰረ ወይም ለተከሰረ ወታደር አድራሻው የወታደራዊ ጠበቃ ነው። ኮሚሽነሩ ለሌሎች የአገልግሎት በደሎች አድራሻ ነው።",
    },
  },
];

export const DETENTION_AM_SUMMARY_TITLE = "ማጠቃለያ በአማርኛ ለወላጆች — ወታደር ታሰረ ወይም ተከሰረ";

export const DETENTION_AM_SUMMARY: string[] = [
  "የወታደራዊ ጠበቃ (הסניגוריה הצבאית) ነጻ ነው። ምንም አይከፍሉም። ደውሉ: 073-310-3300።",
  "ጽሕፈት ቤቱ 24 ሰዓት፣ በሳምንቱ ሁሉ ቀናት፣ በሰንበትና በበዓላትም ይሠራል።",
  "ጠበቃው ለወላጆችም ይመልሳል። ልጅዎ እስኪደውል መጠበቅ የለብዎትም።",
  "ምርመራው **ከመጀመሩ በፊት** ማማከር ይቻላል — እና ይሻላል። ጥያቄው ሚስጥራዊ ነው እና ጥፋተኛነትን አያመለክትም።",
  "ጠበቃው ለአዛዦቹ ተገዥ አይደለም — የልጅዎ ወገን ነው።",
  "ልጅዎ ከአገልግሎት ከቀረ: ራሱን ቶሎ ማቅረብ መዝገቡን ያሳንሳል። ግን አስቀድመው ጠበቃውን ያማክሩ።",
  "כלא 4 እና כלא 6 ተዘግተዋል። ተቋሙ አሁን \"נווה צדק\" ይባላል፣ ከבית ליד አጠገብ።",
  "የጉብኝት ቀናትና ሰዓታት እርግጠኛ ኦፊሴላዊ ምንጭ ስለሌለን አልጻፍንም — ደውለው ይጠይቁ።",
  "የወታደሮች ቅሬታ ኮሚሽነር (03-6977374) የዲሲፕሊን ወይም የወንጀል ጉዳዮችን አያስተናግድም — ለእነዚያ ጠበቃው ነው።",
  "የገንዘብ ችግር ከቤት ጀርባ ካለ: የת\"ש መዝገብ ይክፈቱ። ይህ በጣም የተለመደው ምክንያት ነው።",
  "ልጅዎ በእስር ላይ ሆኖ ስለ አያያዝ ቅሬታ ካለው: በ\"ታሸገ ፖስታ\" መንገድ ወደ ኮሚሽነሩ መላክ ይችላል — ማንም ሳይከፍተው።",
];

// ═══════════════════════════════════════════════════════════════════════════
// Section chrome — per locale, resolved in the loader
// ═══════════════════════════════════════════════════════════════════════════
//
// These live here rather than in the route files on purpose. `messages/*.json`
// is imported by `~/lib/i18n/messages`, which every route component pulls in,
// so all three dictionaries ship to the client — each added key costs 3x in a
// bundle with ~2.5 kB of headroom. Chrome authored here is read in the loader
// and only the active locale's slice crosses to the client.

export interface GuideChrome {
  glanceTitle: string;
  glanceItems: readonly string[];
  bodyHeading: string;
  faqHeading: string;
  resourcesHeading: string;
  relatedHeading: string;
  backLabel: string;
  lastReviewedLabel: string;
  promoLead: string;
  promoCta: string;
  /** Labels for the two sibling guides + the wizard, used in "related". */
  relatedDetention: string;
  relatedLoneSoldier: string;
  relatedWizard: string;
  breadcrumbHome: string;
  breadcrumbParent: string;
}

export const DETENTION_CHROME: Record<Locale, GuideChrome> = {
  he: {
    glanceTitle: "בקצרה — מה לעשות עכשיו",
    glanceItems: [
      "סניגור צבאי הוא חינם, 24/7, כולל שבתות וחגים: 073-310-3300.",
      "מותר ורצוי להתייעץ עוד לפני החקירה — הפנייה חסויה ואינה מעידה על אשמה.",
      "הסנגוריה עונה גם להורים. אל תחכו שהחייל יתקשר.",
      "נעדר מהשירות? התייצבות מוקדמת מקטינה את התיק — התייעצו לפני.",
      "כלא 4 וכלא 6 נסגרו. המתקן היום הוא 'נווה צדק' ליד בית ליד.",
      "נציב קבילות החיילים אינו מטפל במשמעת ובפלילים — שם פונים לסנגוריה.",
    ],
    bodyHeading: "המדריך המלא",
    faqHeading: "שאלות נפוצות",
    resourcesHeading: "למי פונים",
    relatedHeading: "מדריכים קשורים",
    backLabel: "חזרה למרכז חיילים ומשפחות",
    lastReviewedLabel: "נסקר לאחרונה",
    promoLead: "מצוקה כלכלית במשפחה היא הסיבה השכיחה לנפקדות. ",
    promoCta: 'בדקו זכאות לתשלומי משפחה באשף ת"ש',
    relatedDetention: "חייל נעצר או נכלא — מה עושים",
    relatedLoneSoldier: "חייל בודד וחייל ממשפחה מתקשה",
    relatedWizard: 'אשף ת"ש — תשלומי משפחה',
    breadcrumbHome: "דף הבית",
    breadcrumbParent: "חיילים ומשפחות",
  },
  en: {
    glanceTitle: "In brief — what to do now",
    glanceItems: [
      "A military defender is free, 24/7, including Shabbat and holidays: 073-310-3300.",
      "You may and should consult before the interrogation — it is confidential and does not indicate guilt.",
      "The defender's office answers parents too. Do not wait for the soldier to call.",
      "Absent from service? Presenting early shrinks the case — consult first.",
      "Prisons 4 and 6 are closed. The facility today is 'Neve Tzedek' near Beit Lid.",
      "The Complaints Commissioner does not handle discipline or criminal matters — the defender does.",
    ],
    bodyHeading: "The full guide",
    faqHeading: "Frequently asked questions",
    resourcesHeading: "Who to contact",
    relatedHeading: "Related guides",
    backLabel: "Back to Soldiers & Families",
    lastReviewedLabel: "Last reviewed",
    promoLead: "Family financial hardship is the common cause of going AWOL. ",
    promoCta: "Check your family-payments eligibility in the wizard",
    relatedDetention: "A soldier was detained or jailed",
    relatedLoneSoldier: "Lone soldiers and struggling families",
    relatedWizard: "Family-payments wizard",
    breadcrumbHome: "Home",
    breadcrumbParent: "Soldiers & Families",
  },
  am: {
    glanceTitle: "በአጭሩ — አሁን ምን ማድረግ",
    glanceItems: [
      "የወታደራዊ ጠበቃ ነጻ ነው፣ 24/7፣ በሰንበትና በበዓላትም: 073-310-3300።",
      "ምርመራው ከመጀመሩ በፊት ማማከር ይቻላል — ሚስጥራዊ ነው እና ጥፋተኛነትን አያመለክትም።",
      "ጽሕፈት ቤቱ ለወላጆችም ይመልሳል። ወታደሩ እስኪደውል አይጠብቁ።",
      "ከአገልግሎት ቀርቷል? ቶሎ ራስን ማቅረብ መዝገቡን ያሳንሳል — በፊት ያማክሩ።",
      "כלא 4 እና 6 ተዘግተዋል። ተቋሙ ዛሬ ከבית ליד አጠገብ 'נווה צדק' ነው።",
      "የቅሬታ ኮሚሽነሩ የዲሲፕሊን ወይም የወንጀል ጉዳዮችን አያስተናግድም — ጠበቃው ነው።",
    ],
    bodyHeading: "ሙሉ መመሪያ",
    faqHeading: "ተደጋጋሚ ጥያቄዎች",
    resourcesHeading: "ለማን መደወል",
    relatedHeading: "ተዛማጅ መመሪያዎች",
    backLabel: "ወደ ወታደሮች እና ቤተሰቦች ተመለስ",
    lastReviewedLabel: "የተገመገመው",
    promoLead: "የቤተሰብ የገንዘብ ችግር ለנפקדות የተለመደው ምክንያት ነው። ",
    promoCta: 'የቤተሰብ ክፍያ ብቁነትዎን በת"ש አዋቂ ይመርምሩ',
    relatedDetention: "ወታደር ታሰረ ወይም ተከሰረ",
    relatedLoneSoldier: "ብቸኛ ወታደር እና የተቸገሩ ቤተሰቦች",
    relatedWizard: 'የת"ש አዋቂ — የቤተሰብ ክፍያዎች',
    breadcrumbHome: "መነሻ",
    breadcrumbParent: "ወታደሮች እና ቤተሰቦች",
  },
};

export const LONE_SOLDIER_CHROME: Record<Locale, GuideChrome> = {
  he: {
    glanceTitle: "בקצרה — הכתובת אחת",
    glanceItems: [
      'לכל בקשה — הכרה, תשמ"ש, דיור — פונים למש"קית ת"ש.',
      "חייל בודד = אין תמיכה הורית בארץ. שלוש קטגוריות מוכרות.",
      "הורים שירדו מהארץ, עלייה לבד, או יתמות — אין צורך במסמכים בכלל.",
      "טופס 7304 לפני הגיוס; טופס 62 במהלך השירות.",
      "המענק החודשי ניתן אוטומטית למי שהוכר.",
      'משפחה בארץ במצוקה? המסלול הוא תשמ"ש, לא "חייל בודד".',
      "נדחיתם? יש זכות ערעור.",
    ],
    bodyHeading: "המדריך המלא",
    faqHeading: "שאלות נפוצות",
    resourcesHeading: "למי פונים",
    relatedHeading: "מדריכים קשורים",
    backLabel: "חזרה למרכז חיילים ומשפחות",
    lastReviewedLabel: "נסקר לאחרונה",
    promoLead: "לא בטוחים אם מגיע לכם? ",
    promoCta: 'בדקו זכאות באשף ת"ש',
    relatedDetention: "חייל נעצר או נכלא — מה עושים",
    relatedLoneSoldier: "חייל בודד וחייל ממשפחה מתקשה",
    relatedWizard: 'אשף ת"ש — תשלומי משפחה',
    breadcrumbHome: "דף הבית",
    breadcrumbParent: "חיילים ומשפחות",
  },
  en: {
    glanceTitle: "In brief — one address",
    glanceItems: [
      "For every request — recognition, family payments, housing — go to the family-support NCO.",
      "Lone soldier = no parental support in Israel. Three recognized categories.",
      "Parents who emigrated, immigrating alone, or orphanhood — no documents needed at all.",
      "Form 7304 before enlistment; Form 62 during service.",
      "The monthly grant is given automatically once recognized.",
      'Family in Israel and struggling? The track is family payments, not "lone soldier".',
      "Rejected? There is a right of appeal.",
    ],
    bodyHeading: "The full guide",
    faqHeading: "Frequently asked questions",
    resourcesHeading: "Who to contact",
    relatedHeading: "Related guides",
    backLabel: "Back to Soldiers & Families",
    lastReviewedLabel: "Last reviewed",
    promoLead: "Not sure whether you qualify? ",
    promoCta: "Check eligibility in the family-payments wizard",
    relatedDetention: "A soldier was detained or jailed",
    relatedLoneSoldier: "Lone soldiers and struggling families",
    relatedWizard: "Family-payments wizard",
    breadcrumbHome: "Home",
    breadcrumbParent: "Soldiers & Families",
  },
  am: {
    glanceTitle: "በአጭሩ — አንድ አድራሻ",
    glanceItems: [
      'ለሁሉም ጥያቄ — ዕውቅና፣ תשמ"ש፣ መኖሪያ — ወደ מש"קית ת"ש ይሂዱ።',
      "ብቸኛ ወታደር = በአገር ውስጥ የወላጅ ድጋፍ የለም። ሦስት የታወቁ ምድቦች።",
      "ወላጆች ከአገር ከወጡ፣ ብቻውን ከመጣ፣ ወይም ወላጅ አልባ ከሆነ — ምንም ሰነድ አያስፈልግም።",
      "ከምዝገባ በፊት ቅጽ 7304፤ በአገልግሎት ወቅት ቅጽ 62።",
      "ዕውቅና ካገኘ ወርሃዊው ድጎማ በራስ-ሰር ይሰጣል።",
      'ቤተሰቡ በአገር ውስጥ ተቸግሯል? መንገዱ תשמ"ש ነው፣ "ብቸኛ ወታደር" አይደለም።',
      "ውድቅ ተደረጉ? የይግባኝ መብት አለ።",
    ],
    bodyHeading: "ሙሉ መመሪያ",
    faqHeading: "ተደጋጋሚ ጥያቄዎች",
    resourcesHeading: "ለማን መደወል",
    relatedHeading: "ተዛማጅ መመሪያዎች",
    backLabel: "ወደ ወታደሮች እና ቤተሰቦች ተመለስ",
    lastReviewedLabel: "የተገመገመው",
    promoLead: "ብቁ መሆንዎን እርግጠኛ አይደሉም? ",
    promoCta: 'በת"ש አዋቂ ብቁነትዎን ይመርምሩ',
    relatedDetention: "ወታደር ታሰረ ወይም ተከሰረ",
    relatedLoneSoldier: "ብቸኛ ወታደር እና የተቸገሩ ቤተሰቦች",
    relatedWizard: 'የת"ש አዋቂ — የቤተሰብ ክፍያዎች',
    breadcrumbHome: "መነሻ",
    breadcrumbParent: "ወታደሮች እና ቤተሰቦች",
  },
};

// ── Hub landing chrome ─────────────────────────────────────────────────────

export interface HubCard {
  /** "detention" | "lone-soldier" | "wizard" — drives the link target. */
  key: "detention" | "lone-soldier" | "wizard";
  title: string;
  description: string;
  icon: string;
}

export interface HubChrome {
  title: string;
  subtitle: string;
  intro: string;
  cardsHeading: string;
  cardCta: string;
  breadcrumbHome: string;
  breadcrumbFamily: string;
  cards: HubCard[];
}

export const HUB_CHROME: Record<Locale, HubChrome> = {
  he: {
    title: "חיילים ומשפחות — כליאה, תשלומי משפחה, חייל בודד",
    subtitle:
      "מה עושים כשחייל נעצר או נכלא, איך פותחים תיק ת\"ש לפני שהמצב מידרדר, ומה מגיע לחייל בודד ולחייל ממשפחה מתקשה.",
    intro:
      'שיעור הגיוס בקהילה גבוה מהממוצע הארצי — ודווקא אחרי הגיוס נפתח פער. מבקר המדינה תיאר את נתוני הכליאה של חיילים יוצאי אתיופיה כ"נורת אזהרה חברתית", והרקע השכיח מתועד: קשיים כלכליים בבית שמובילים לנפקדות. שלושת הדפים כאן נועדו לתת מענה מעשי — לפני שזה קורה, ואחרי.',
    cardsHeading: "שלושה מדריכים",
    cardCta: "למידע נוסף",
    breadcrumbHome: "דף הבית",
    breadcrumbFamily: "משפחה ותמיכה",
    cards: [
      {
        key: "detention",
        title: "חייל נעצר או נכלא — מה עושים",
        description:
          'סניגור צבאי חינם 24/7, מה לעשות לפני החקירה, מסלול ההתייצבות, ולמי פונים — כולל ערוץ "המעטפה הסגורה" לחייל כלוא.',
        icon: "⚖️",
      },
      {
        key: "wizard",
        title: 'אשף ת"ש — תשלומי משפחה',
        description:
          "בדיקה קצרה שאומרת אם אפשר להגיש בקשה לתשמ\"ש, ומה להביא למש\"קית ת\"ש.",
        icon: "🧭",
      },
      {
        key: "lone-soldier",
        title: "חייל בודד וחייל ממשפחה מתקשה",
        description:
          "מי מוכר כחייל בודד, אילו מסמכים באמת נדרשים (לרוב — אף אחד), מה מקבלים, והזכות הייעודית ליוצאי אתיופיה.",
        icon: "🎗️",
      },
    ],
  },
  en: {
    title: "Soldiers & Families — Detention, Family Payments, Lone Soldiers",
    subtitle:
      "What to do when a soldier is detained or jailed, how to open a family-support case before things deteriorate, and what a lone soldier or a soldier from a struggling family is entitled to.",
    intro:
      'Enlistment in the community is above the national average — and it is precisely after enlistment that a gap opens. The State Comptroller described the incarceration figures for Ethiopian-Israeli soldiers as "a social warning lamp", and the common backdrop is documented: financial hardship at home leading to absence from service. The three guides here aim to give a practical answer — before it happens, and after.',
    cardsHeading: "Three guides",
    cardCta: "Learn more",
    breadcrumbHome: "Home",
    breadcrumbFamily: "Family & Support",
    cards: [
      {
        key: "detention",
        title: "A soldier was detained or jailed",
        description:
          'A free military defender 24/7, what to do before the interrogation, the self-presentation route, and who to contact — including the "sealed envelope" channel for a soldier in custody.',
        icon: "⚖️",
      },
      {
        key: "wizard",
        title: "Family-payments wizard",
        description:
          "A short check that tells you whether a family-payments application is open to you, and what to bring to the family-support NCO.",
        icon: "🧭",
      },
      {
        key: "lone-soldier",
        title: "Lone soldiers and struggling families",
        description:
          "Who is recognized as a lone soldier, which documents are actually required (usually none), what you receive, and the dedicated entitlement for Ethiopian-Israelis.",
        icon: "🎗️",
      },
    ],
  },
  am: {
    title: "ወታደሮች እና ቤተሰቦች — እስር፣ የቤተሰብ ክፍያዎች፣ ብቸኛ ወታደር",
    subtitle:
      'ወታደር ሲታሰር ወይም ሲከሰር ምን ማድረግ፣ ሁኔታው ከመባባሱ በፊት የת"ש መዝገብ እንዴት መክፈት፣ እና ለብቸኛ ወታደር እና ከተቸገረ ቤተሰብ ለመጣ ወታደር ምን እንደሚገባ።',
    intro:
      'በማህበረሰቡ ውስጥ የውትድርና ምዝገባ ከሀገራዊ አማካይ ከፍ ያለ ነው — ክፍተቱ የሚከፈተው ከምዝገባ በኋላ ነው። የመንግሥት ኦዲተር የኢትዮጵያ ተወላጅ ወታደሮችን የእስር መረጃ "ማህበራዊ የማስጠንቀቂያ መብራት" ብሎ ገልጾታል፣ የተለመደው ዳራም ተመዝግቧል: በቤት ውስጥ ያለ የገንዘብ ችግር ወደ נפקדות ይመራል። እዚህ ያሉት ሦስት መመሪያዎች ተግባራዊ ምላሽ ለመስጠት ነው — ከመከሰቱ በፊትም በኋላም።',
    cardsHeading: "ሦስት መመሪያዎች",
    cardCta: "ተጨማሪ",
    breadcrumbHome: "መነሻ",
    breadcrumbFamily: "ቤተሰብ እና ድጋፍ",
    cards: [
      {
        key: "detention",
        title: "ወታደር ታሰረ ወይም ተከሰረ",
        description:
          'ነጻ የወታደራዊ ጠበቃ 24/7፣ ከምርመራው በፊት ምን ማድረግ፣ የራስን ማቅረቢያ መንገድ፣ እና ለማን መደወል — ለታሰረ ወታደር የ"ታሸገ ፖስታ" መንገድን ጨምሮ።',
        icon: "⚖️",
      },
      {
        key: "wizard",
        title: 'የת"ש አዋቂ — የቤተሰብ ክፍያዎች',
        description:
          'የתשמ"ש ማመልከቻ ማቅረብ እንደሚችሉ የሚነግርዎት አጭር ምርመራ፣ እና ለמש"קית ת"ש ምን ማምጣት እንዳለብዎት።',
        icon: "🧭",
      },
      {
        key: "lone-soldier",
        title: "ብቸኛ ወታደር እና የተቸገሩ ቤተሰቦች",
        description:
          "ማን እንደ ብቸኛ ወታደር ይታወቃል፣ በእውነት የሚያስፈልጉ ሰነዶች (ብዙ ጊዜ — ምንም)፣ ምን እንደሚያገኙ፣ እና ለኢትዮጵያ ተወላጆች የተለየ መብት።",
        icon: "🎗️",
      },
    ],
  },
};
