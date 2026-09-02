// Voice & Action pillar — topic data for the 3 sub-pages.
//
// HE is source-of-truth (CLAUDE.md). EN + AM mirrored.
// Content reviewed: 2026-05-12. Wave 2 (18 topics) added: 2026-06-02.
// Legal + factual audit: TED-158, 2026-09-02. See docs/adr/021-sourced-claims.md.
//
// VERIFIED AGAINST PRIMARY SOURCES
//   - חוק סדר הדין הפלילי (סמכויות אכיפה — מעצרים), התשנ"ו-1996 —
//     nevo.co.il/law_html/law00/98568.htm. פרק ג' (עיכוב) = ס' 66-75:
//     עילות ס' 67, משך העיכוב ס' 73(ב), חובת הזדהות ונימוק ס' 72(א)
//     בהפניה לס' 24(א), העברה לתחנה ס' 67(ב), דוח עיכוב ס' 74.
//     היוועדות עם עו"ד ס' 34, הודעה לקרוב ס' 33(א).
//   - חוק סדר הדין הפלילי (חקירת חשודים), התשס"ב-2002, ס' 2 — חקירה
//     בשפת החשוד. This is the real basis of the interpreter right.
//   - ס' 144ב לחוק העונשין — הסתה לגזענות, מאסר חמש שנים.
//   - חוק איסור הפליה במוצרים, בשירותים ובכניסה למקומות בידור ולמקומות
//     ציבוריים, התשס"א-2000, ס' 5 — nevo.co.il/law_html/law00/74365.htm.
//   - חוק הגנה על עובדים (חשיפת עבירות ופגיעה בטוהר המידות או במינהל
//     התקין), התשנ"ז-1997 — nevo.co.il/law_html/law00/71697.htm.
//   - הצוות למיגור הגזענות נגד יוצאי אתיופיה (המכונה "ועדת פלמור"),
//     הוקם בהחלטת ממשלה 1107 מ-4.2.2016, המלצותיו אומצו בהחלטה 1958
//     מ-16.8.2016.
//   - למ"ס, "האוכלוסייה ממוצא אתיופי בישראל", הודעה 367/2025 (16.11.2025).
//   - טבקה: 072-2424622 ו"ללא תשלום" — מאתר הארגון עצמו.
//
// DELIBERATELY EXCLUDED — investigated, not published
//   - "חוק הגנת המעוקין (2001)": no statute of that name exists in any
//     form. It was published as the basis of whistleblower protection.
//   - "חוק שוויון זכויות (2000)": not the name of an Israeli statute — a
//     collision of the 1998 disability-rights law with the 2000
//     anti-discrimination law.
//   - "חוק סדר הדין הפלילי (1982)" as the law governing a street stop:
//     wrong act, and it contradicted our own street-stop guide.
//   - "חוק המעצרים (1996), סעיף 32" for the rights on arrest: s.32 is the
//     duty to explain rights after arrest, not their source. Three of the
//     four rights we hung on it live elsewhere and one is not in that
//     statute at all.
//   - "עלבון עובד ציבור" as a charge a racism complainant can bring: ס' 288
//     protects the public servant and carries six months. It is what
//     people in this community get charged with in these encounters — the
//     opposite of a remedy. Removed as actively dangerous.
//   - "מומלץ להתלונן תוך 6 חודשים" למח"ש: no published limitation or
//     recommendation could be found. Removed rather than softened.
//   - "ועדת ליבאי" as the national report on discrimination: no such
//     committee on this subject.
//   - "תנועת אמונה" (amona.co.il): NXDOMAIN — never registered.
//   - "IPMF (Israel-Policy-Ministry-Forum)": no organisation of that name.
//   - Checking a voter's address "ברשות מקרקעי ישראל": fabricated; רמ"י is
//     the Land Authority. The register address is held by מרשם האוכלוסין.
//   - A precise count of the Palmor recommendations: the report prints
//     none and secondary sources disagree (51 / 60 / "over 50").
//   - Any rule on filming officers: not verifiable from a primary source.

import type { Translatable } from "../db/columns";
import { STREET_STOP_TOPIC } from "./street-stop.server";
import { VOICE_TOPICS_WAVE2 } from "./topics-wave2.server";

// ── Shared types ─────────────────────────────────────────────────────────────

export interface VoiceResource {
  name: string;
  phone?: string;
  url?: string;
  description: Translatable;
}

export interface VoiceTopic {
  slug: string;
  title: Translatable;
  subtitle: Translatable;
  body: Translatable;
  resources: VoiceResource[];
  lastReviewed: string;
}

// ── 1. Racism Report ─────────────────────────────────────────────────────────

export const RACISM_REPORT_TOPIC: VoiceTopic = {
  slug: "racism-report",
  title: {
    he: "דיווח על גזענות — מדריך מעשי",
    en: "Reporting Racism — A Practical Guide",
    am: "ዘረኝነት ሪፖርት ማድረግ — ተግባራዊ መምሪያ",
  },
  subtitle: {
    he: "כיצד לתעד אירוע גזעני ולהגיש תלונה — לטבקה, לאגודה לזכויות האזרח, או למשטרה.",
    en: "How to document a racist incident and file a complaint — with Tebeka, ACRI, or the police.",
    am: "የዘረኝነት ክስተት እንዴት መዘገብ እና ቅሬታ ማቅረብ — ቴቤካ፣ ACRI ወይም ፖሊስ ዘንድ።",
  },
  body: {
    he: `גזענות היא פגיעה בכבוד האדם — ובחלק מהמקרים גם עבירה פלילית. הסתה לגזענות היא עבירה לפי **סעיף 144ב לחוק העונשין** שעונשה עד חמש שנות מאסר. אפליה במתן שירות או בכניסה למקום ציבורי אסורה לפי **חוק איסור הפליה במוצרים, בשירותים ובכניסה למקומות בידור ולמקומות ציבוריים, התשס"א-2000**, ועקרונות חוק-יסוד: כבוד האדם וחירותו הם המסגרת החוקתית.

**מה להגדיר כגזענות?**
גזענות כוללת אמירות, כתיבה, הפגנות, סרטונים, הטרדה, הדרה ממקומות ציבוריים, ואפליה בשירות — כל אלה על בסיס מוצא אתני, לאום, צבע עור, ודת.

**שלב 1 — תיעוד מיידי**
תעדו את האירוע מיד: תאריך, שעה, מיקום מדויק, שמות עדים (אם יש), וכל מידע על הפוגע. אם מדובר בסרטון ברשתות — צלמו צילום מסך לפני שייורד. אל תמחקו שום דבר.

**שלב 2 — הגשת תלונה**
ניתן להגיש תלונה פלילית למשטרת ישראל — למשל על הסתה לגזענות (ס' 144ב לחוק העונשין) או על תקיפה ואיומים ממניע גזעני. את התלונה מגישים בתחנת המשטרה או דרך האתר הממשלתי. במקביל אפשר להגיש **תביעה אזרחית** לפי חוק איסור הפליה — ראו "הגנה משפטית" למטה.

**שלב 3 — פנייה לארגוני סיוע**
טבקה — ארגון זכויות לקהילה האתיופית — מציעה ייעוץ משפטי חינם ותמיכה בהגשת תלונה. האגודה לזכויות האזרח (ACRI) מטפלת בתיקים של אפליה שיטתית ויכולה ללוות אתכם לאורך ההליך.

**הגנה משפטית**
**חוק איסור הפליה (2000), סעיף 5** מאפשר לתבוע פיצוי **ללא הוכחת נזק** — עד 50,000 ₪, צמוד למדד (בסיס אוקטובר 2000). אם מדובר בגזענות מצד מעסיק — חוק שוויון ההזדמנויות בעבודה (1988) מאפשר פנייה לבית-הדין לעבודה. עובד שחשף עבירות במקום העבודה מוגן מפיטורים ומפגיעה בתנאי עבודתו לפי **חוק הגנה על עובדים (חשיפת עבירות ופגיעה בטוהר המידות או במינהל התקין), התשנ"ז-1997**.

מקורות: [ס' 144ב לחוק העונשין](https://www.nevo.co.il/law_html/law01/073_002.htm) · [חוק איסור הפליה](https://www.nevo.co.il/law_html/law00/74365.htm) · [חוק הגנה על עובדים](https://www.nevo.co.il/law_html/law00/71697.htm) · נבדק ספטמבר 2026.`,
    en: `Racism is an affront to human dignity — and in some cases a criminal offence. Incitement to racism is an offence under **section 144B of the Penal Code**, carrying up to five years' imprisonment. Discrimination in providing a service or in admission to a public place is prohibited by the **Prohibition of Discrimination in Products, Services and Entry to Places of Entertainment and Public Places Law, 2000**, and the Basic Law: Human Dignity and Liberty is the constitutional framework.

**What counts as racism?**
Racism includes statements, writing, demonstrations, videos, harassment, exclusion from public spaces, and discriminatory service — all based on ethnic origin, nationality, skin colour, or religion.

**Step 1 — Immediate documentation**
Document the incident immediately: date, time, exact location, witness names (if any), and any information about the perpetrator. If it is a video on social media — take a screenshot before it is removed. Do not delete anything.

**Step 2 — Filing a complaint**
You may file a criminal complaint with the Israel Police — for example incitement to racism (s.144B of the Penal Code), or assault and threats with a racist motive. File at a police station or through the government website. In parallel you can bring a **civil claim** under the 2000 anti-discrimination act — see "Legal protection" below.

**Step 3 — Contact support organisations**
Tebeka — a rights organisation for the Ethiopian community — offers free legal advice and support in filing complaints. The Association for Civil Rights in Israel (ACRI) handles cases of systemic discrimination and can accompany you throughout the process.

**Legal protection**
**Section 5 of the 2000 anti-discrimination act** allows a claim for damages **without proving damage** — up to ₪50,000, index-linked (October 2000 base). For racism by an employer, the Equal Opportunity in Employment Act (1988) allows recourse to the labour court. An employee who exposed offences at work is protected from dismissal and from harm to their conditions under the **Protection of Employees (Exposure of Offences of Unethical Conduct and Improper Administration) Law, 1997**.

Sources: [Penal Code s.144B](https://www.nevo.co.il/law_html/law01/073_002.htm) · [anti-discrimination act](https://www.nevo.co.il/law_html/law00/74365.htm) · [protection of employees](https://www.nevo.co.il/law_html/law00/71697.htm) · verified September 2026.`,
    am: `ዘረኝነት የሰው ክብርን መጣስ ነው — በአንዳንድ ሁኔታዎችም ወንጀል ነው። ወደ ዘረኝነት ማነሳሳት በ**የወንጀል ሕግ ክፍል 144ב** መሠረት እስከ አምስት ዓመት እስራት የሚያስቀጣ ወንጀል ነው። በአገልግሎት አሰጣጥ ወይም ወደ ሕዝባዊ ቦታ በመግባት ላይ አድሎ በ**የ2000 ዓ.ም. የአድሎ ክልከላ ሕግ** የተከለከለ ነው።

**ምን ዘረኝነት ተብሎ ይቆጠራል?**
ዘረኝነት ንግግሮችን፣ ጽሑፎችን፣ ሠልፎችን፣ ቪዲዮዎችን፣ ማሸማቀቅን፣ ከሕዝባዊ ቦታዎች ማስወጣትን እና አድሎ አገልግሎትን ያካትታል — ሁሉም በዘር ፣ ሀገረ-ምድር፣ የቆዳ ቀለም ወይም ሃይማኖት ላይ ተመርኩዘው።

**ደረጃ 1 — ወዲያውኑ ማስረጃ ይሰብስቡ**
ክስተቱን ወዲያውኑ ይዘግቡ: ቀን፣ ሰዓት፣ ትክክለኛ ቦታ፣ የምስክሮች ስሞች (ካሉ)፣ እና ስለ ጠቃሚ ሰው ማንኛውም መረጃ። ቪዲዮ ሶሻል ሚዲያ ላይ ካለ — ከመወሰዱ በፊት ቅጂ ያንሱ።

**ደረጃ 2 — ቅሬታ ማቅረብ**
ቅሬታ ለእስራኤል ፖሊስ ማቅረብ ይቻላል። ቅሬታ ማቅረቢያ ቦታ ወይም የመንግሥት ድረ-ገጽ ይጠቀሙ።

**ደረጃ 3 — ድጋፍ ድርጅቶችን ያነጋግሩ**
ቴቤካ — ለኢትዮጵያ ማህበረሰብ የሚሰራ የሕግ ድጋፍ ድርጅት — ነጻ የሕግ ምክር እና ቅሬታ ለማቅረብ ድጋፍ ይሰጣሉ። ACRI ሥርዓታዊ አድሎ ጉዳዮችን ያስተናግዳሉ።

**ሕጋዊ ጥበቃ**
የ2000 ዓ.ም. የአድሎ ክልከላ ሕግ ክፍል 5 ጉዳት ሳያረጋግጡ ካሳ መጠየቅ ያስችላል — እስከ 50,000 ₪ (ከጥቅምት 2000 መሠረት ጋር የተስተካከለ)። በአሠሪ ዘረኝነት ሲፈጸም የ1988 የሥራ ዕድል እኩልነት ሕግ ወደ ሠራተኛ ፍርድ ቤት መሄድ ያስችላል። በሥራ ቦታ ወንጀል የገለጸ ሠራተኛ በ**የ1997 የሠራተኞች ጥበቃ ሕግ** ከመባረር ይጠበቃል።

ምንጮች: [የወንጀል ሕግ 144ב](https://www.nevo.co.il/law_html/law01/073_002.htm) · [የአድሎ ክልከላ ሕግ](https://www.nevo.co.il/law_html/law00/74365.htm) · በመስከረም 2026 ተረጋግጧል።`,
  },
  resources: [
    {
      name: "טבקה — ארגון זכויות לקהילה האתיופית",
      phone: "072-2424622",
      url: "https://www.tebeka.org.il",
      description: {
        he: "ייעוץ משפטי חינמי ולוחמה בהפלייה — קו ישיר לקהילה האתיופית.",
        en: "Free legal advice and anti-discrimination advocacy — direct line for the Ethiopian community.",
        am: "ነጻ የሕግ ምክር እና ፀረ-አድሎ ተሟጋቾች — ለኢትዮጵያ ማህበረሰብ ቀጥተኛ መስመር።",
      },
    },
    {
      name: "האגודה לזכויות האזרח (ACRI)",
      url: "https://www.acri.org.il",
      description: {
        he: "ארגון לזכויות אדם שמטפל בתיקים של אפליה שיטתית ופגיעה בזכויות חוקתיות.",
        en: "Human rights organisation handling cases of systemic discrimination and constitutional rights violations.",
        am: "ሥርዓታዊ አድሎ እና ሕገ-መንግሥታዊ መብቶች ጥሰት ጉዳዮችን የሚያስተናግድ የሰብዓዊ መብቶች ድርጅት።",
      },
    },
    {
      name: "משטרת ישראל — הגשת תלונה מקוונת",
      url: "https://www.gov.il/he/departments/israel_police",
      description: {
        he: "ניתן להגיש תלונה פלילית על גזענות, הסתה, ואפליה דרך האתר הממשלתי או בתחנת המשטרה הקרובה.",
        en: "Criminal complaints for racism, incitement, and discrimination can be filed online or at the nearest police station.",
        am: "ለዘረኝነት፣ ቅስቀሳ እና አድሎ የወንጀል ቅሬታ በድረ-ገጽ ወይም ቅርብ የፖሊስ ጣቢያ ማቅረብ ይቻላል።",
      },
    },
  ],
  lastReviewed: "2026-09-02",
};

// ── 2. Police Conduct ─────────────────────────────────────────────────────────

export const POLICE_CONDUCT_TOPIC: VoiceTopic = {
  slug: "police-conduct",
  title: {
    he: "זכויות מול המשטרה וכיצד להתלונן",
    en: "Rights in Police Encounters and How to Complain",
    am: "ከፖሊስ ጋር ባለ ግንኙነት ያሉ መብቶች እና ቅሬታ ማቅረብ",
  },
  subtitle: {
    he: 'זכויות בעצירה, חיפוש ומעצר — ותהליך הגשת תלונה למחלקת החקירות הפנימיות (מח"ש).',
    en: "Rights during a stop, search, or arrest — and how to file a complaint with the Internal Investigations Department (MAHASH).",
    am: 'ማቆሚያ፣ ፍተሻ ወይም እስር ጊዜ ያሉ መብቶች — እና ለውስጥ ምርምር ክፍል (מח"ש) ቅሬታ እንዴት ማቅረብ።',
  },
  body: {
    he: `יוצאי אתיופיה בישראל מדווחים על שכיחות גבוהה יותר של עצירות, חיפושים, ואף אלימות משטרתית. הכרת הזכויות החוקיות היא כלי הגנה עצמי.

**זכויות בזמן עיכוב**
עיכוב מוסדר ב**פרק ג' לחוק סדר הדין הפלילי (סמכויות אכיפה — מעצרים), התשנ"ו-1996** (ס' 66-75). שוטר רשאי לעכב אדם רק כשיש **יסוד סביר לחשד** שעבר עבירה או עומד לעבור עבירה (ס' 67). העברה לתחנה מותרת רק כאשר מתקיימים **גם** החשד הסביר **וגם** אי-אפשרות לברר את הזהות או לחקור במקום (ס' 67(ב)). שאלו: "האם אני מעוכב? מה הסיבה? האם אני חופשי ללכת?" — על השוטר לענות.

**דוח עיכוב — כלי מעשי**
לפי **ס' 74**, השוטר חייב לערוך דוח עיכוב (שם, סיבה, משך) בכל מקרה שבו הועברתם לתחנה **או** שהעיכוב נמשך **20 דקות ומעלה**. אפשר לבקש לדעת שנרשם.

**זכויות בחיפוש גוף**
חיפוש גוף מחייב הסכמה מפורשת, צו שופט, או חשד סביר קונקרטי. אם שוטר מבקש לחפש — שאלו לאיזה סמכות הוא נשען. אל תתנגדו פיזית — אבל אמרו בקול: "איני מסכים לחיפוש." תיעדו את זה.

**זכויות במעצר**
במעצר: (1) **זכות שתיקה** — אינכם חייבים להפליל את עצמכם, ואמירה שלכם עלולה לשמש נגדכם; (2) **זכות להיוועד עם עורך-דין** (ס' 34 לחוק המעצרים) — הזכות קיימת, אך החוק מאפשר לדחות את הפגישה בנסיבות מוגדרות, ולכן בקשו לממש אותה מיד ובכתב; (3) **הודעה לקרוב משפחה** — החוק קובע שההודעה תימסר **"ללא דיחוי"** (ס' 33(א)), לא "תוך שעות"; (4) **חקירה בשפה שאתם מבינים** — לפי **חוק סדר הדין הפלילי (חקירת חשודים), התשס"ב-2002, ס' 2**, חקירת חשוד תתנהל בשפתו או בשפה שהוא מבין ודובר. זו הזכות הרלוונטית לדוברי אמהרית.

**כיצד מתלוננים — מח"ש**
מחלקת חקירות שוטרים (מח"ש) במשרד המשפטים חוקרת תלונות על שוטרים. ניתן להגיש תלונה: (1) בטופס המקוון של משרד המשפטים; (2) בתחנת משטרה; (3) ישירות במח"ש. תעדו הכל בכתב והגישו מוקדם ככל האפשר — ראיות ותיעוד מצלמות נעלמים עם הזמן.

מקורות: [חוק המעצרים התשנ"ו-1996](https://www.nevo.co.il/law_html/law00/98568.htm) · [טופס תלונה נגד שוטר](https://mojforms.justice.gov.il/mojaemformstateattorney/complaintagainstpolice.html) · נבדק ספטמבר 2026.

**ליווי משפטי**
טבקה מציעה ייעוץ חינמי בתיקי אלימות משטרתית ואפליה על רקע עדתי. יש לפנות מוקדם — לפני שהתיק ייסגר.`,
    en: `Ethiopian Israelis report a higher incidence of stops, searches, and even police violence. Knowing your legal rights is a form of self-defence.

**Rights during a stop (עיכוב)**
Stops are governed by **Chapter C of the Criminal Procedure (Enforcement Powers — Arrests) Law, 1996** (ss.66-75). An officer may detain a person only with **reasonable grounds to suspect** they committed or are about to commit an offence (s.67). Transfer to a station is permitted only where there are **both** reasonable grounds **and** an inability to establish identity or question you on the spot (s.67(b)). Ask: "Am I being detained? What is the reason? Am I free to go?" — the officer must answer.

**The stop report — a practical tool**
Under **s.74** the officer must file a stop report (name, reason, duration) whenever you were taken to a station **or** detained for **20 minutes or more**. You may ask whether one was recorded.

**Rights during a body search**
A body search requires explicit consent, a judicial warrant, or concrete reasonable suspicion. If an officer asks to search you — ask what authority they are relying on. Do not physically resist — but say clearly: "I do not consent to this search." Document it.

**Rights on arrest**
On arrest: (1) **right to silence** — you are not required to incriminate yourself, and what you say can be used against you; (2) **right to consult a lawyer** (s.34 of the Arrests Law) — the right exists, but the law permits the meeting to be postponed in defined circumstances, so ask to exercise it immediately and in writing; (3) **notification of a relative** — the law says notice is given **"without delay"** (s.33(a)), not "within a few hours"; (4) **questioning in a language you understand** — under the **Criminal Procedure (Interrogation of Suspects) Law, 2002, s.2**, a suspect's interrogation is conducted in their language or a language they understand and speak. This is the provision that matters for Amharic speakers.

**How to complain — MAHASH**
The Police Investigations Department (MAHASH) at the Ministry of Justice investigates complaints against officers. File: (1) via the Ministry of Justice online form; (2) at a police station; (3) directly with MAHASH. Keep everything in writing and file as early as you can — evidence and camera footage disappear over time.

Sources: [Arrests Law 1996](https://www.nevo.co.il/law_html/law00/98568.htm) · [complaint form against a police officer](https://mojforms.justice.gov.il/mojaemformstateattorney/complaintagainstpolice.html) · verified September 2026.

**Legal accompaniment**
Tebeka offers free advice in cases of police violence and ethnic-based discrimination. Contact them early — before the case is closed.`,
    am: `ኢትዮጵያ-እስራኤላዊ ሰዎች ከፍ ባለ ምጣኔ ማቆሚያዎችን፣ ፍተሻዎችን፣ እና ፖሊስ ጥቃቶችን ያጋጫሉ። ሕጋዊ መብቶቾን ማወቅ ራስ-ጥበቃ ዘዴ ነው።

**ማቆሚያ ጊዜ ያሉ መብቶች**
ማቆም በ**1996 የወንጀል ሥነ-ሥርዓት (የአስፈጻሚ ሥልጣኖች — እስራት) ሕግ ምዕራፍ ג** (ክፍሎች 66-75) ይተዳደራል። ፖሊስ ሊያቆምዎ የሚችለው ምክንያታዊ ጥርጣሬ ሲኖር ብቻ ነው (ክፍል 67)። ወደ ጣቢያ መውሰድ የሚፈቀደው ጥርጣሬውም ሆነ በቦታው መጠየቅ አለመቻል **ሁለቱም** ሲኖሩ ብቻ ነው (ክፍል 67(ב))። "ተቆሜያለሁ? ምክንያቱ ምንድን ነው? መሄድ እችላለሁ?" ብለው ይጠይቁ።

**የማቆም ሪፖርት**
በክፍል 74 መሠረት ወደ ጣቢያ ከተወሰዱ **ወይም** ማቆሙ **20 ደቂቃ እና ከዚያ በላይ** ከቆየ ፖሊሱ የማቆም ሪፖርት (ስም፣ ምክንያት፣ ቆይታ) ማዘጋጀት አለበት።

**የሰውነት ፍተሻ ጊዜ ያሉ መብቶች**
የሰውነት ፍተሻ ግልጽ ፈቃድ፣ የዳኛ ትዕዛዝ ወይም ትክክለኛ ምክንያት ይጠይቃሉ። ፍቃዱ ካልሰጡ በቃልዎ ይናገሩ: "ፍተሻ አልፈቅድም።" አካላዊ ተቃውሞ አይኖሩ — ነገር ግን ሰሚ ሰው ባለበት ቃልዎን ይናገሩ።

**በእስር ጊዜ ያሉ መብቶች**
(1) **የዝምታ መብት** — ራስዎን የመወንጀል ግዴታ የለብዎትም፤ የሚናገሩት በእርስዎ ላይ ሊውል ይችላል፤ (2) **ከጠበቃ ጋር የመገናኘት መብት** (ክፍል 34) — መብቱ አለ፣ ነገር ግን ሕጉ በተወሰኑ ሁኔታዎች ስብሰባውን ማዘግየት ይፈቅዳል፤ ስለዚህ ወዲያውኑ እና በጽሑፍ ይጠይቁ፤ (3) **ለዘመድ ማሳወቅ** — ሕጉ ማሳወቂያው **"ያለ መዘግየት"** እንደሚሰጥ ይደነግጋል (ክፍል 33(א))፤ (4) **በሚረዱት ቋንቋ መጠየቅ** — በ**2002 የተጠርጣሪዎች ምርመራ ሕግ ክፍል 2** መሠረት ምርመራው በተጠርጣሪው ቋንቋ ወይም በሚረዳውና በሚናገረው ቋንቋ ይካሄዳል። ለአማርኛ ተናጋሪዎች ጠቃሚው መብት ይህ ነው።

**ቅሬታ ማቅረቢያ — מח"ש**
በፍትህ ሚኒስቴር ያለው የፖሊስ ምርመራ ክፍል (מח"ש) በፖሊሶች ላይ ቅሬታዎችን ይመረምራል። ማቅረቢያ መንገዶች: (1) የፍትህ ሚኒስቴር የመስመር ላይ ቅጽ፤ (2) በፖሊስ ጣቢያ፤ (3) በቀጥታ ወደ מח"ש። ሁሉንም በጽሑፍ ይመዝግቡ እና በተቻለ ፍጥነት ያቅርቡ።

**ሕጋዊ ድጋፍ**
ቴቤካ ነጻ ምክር ለፖሊስ ጥቃት እና ዘር-ተኮር አድሎ ይሰጣሉ። ቶሎ ያናግሩ — ጉዳዩ ከመዘጋቱ በፊት።`,
  },
  resources: [
    {
      name: 'מח"ש — מחלקת חקירות פנימיות של המשטרה',
      url: "https://www.gov.il/he/departments/units/mahash",
      description: {
        he: "הגוף הרשמי לחקירת תלונות נגד שוטרים. ניתן לפנות ישירות.",
        en: "The official body for investigating complaints against police officers. Direct referrals accepted.",
        am: "ፖሊስ ቅሬታዎችን ለምርምር ኦፊሴላዊ አካል። ቀጥተኛ ቅሬታ ይቀበላሉ።",
      },
    },
    {
      name: "טבקה — ארגון זכויות לקהילה האתיופית",
      phone: "072-2424622",
      url: "https://www.tebeka.org.il",
      description: {
        he: "ייעוץ משפטי חינמי בתיקי אלימות משטרתית ואפליה עדתית — קו ישיר לקהילה.",
        en: "Free legal advice on police violence and ethnic-based discrimination — direct line for the community.",
        am: "ለፖሊስ ጥቃት እና ዘር-ተኮር አድሎ ነጻ የሕግ ምክር — ለማህበረሰቡ ቀጥተኛ መስመር።",
      },
    },
    {
      name: "פרקליטות המדינה — פניית ציבור",
      url: "https://www.gov.il/he/departments/ministry_of_justice",
      description: {
        he: "ניתן להגיש תלונה על מחדל משטרתי גם דרך משרד המשפטים.",
        en: "Complaints about police negligence can also be submitted via the Ministry of Justice.",
        am: "የፖሊስ ቸልተኝነት ቅሬታ ለፍትህ ሚኒስቴርም ማቅረብ ይቻላል።",
      },
    },
  ],
  lastReviewed: "2026-09-02",
};

// ── 3. Community Action ───────────────────────────────────────────────────────

export const COMMUNITY_ACTION_TOPIC: VoiceTopic = {
  slug: "community-action",
  title: {
    he: "פעולה קהילתית ושיתוף פוליטי",
    en: "Community Action and Political Participation",
    am: "ማህበረሰባዊ እርምጃ እና ፖለቲካዊ ተሳትፎ",
  },
  subtitle: {
    he: "ארגון קהילתי, זכויות הצבעה, ייצוג במועצות מקומיות, וארגוני עדה פעילים.",
    en: "Community organising, voting rights, local council representation, and active advocacy organisations.",
    am: "ማህበረሰብ ማደራጀት፣ ምርጫ መብቶች፣ የአካባቢ ምክር ቤት ውክልና እና ተሟጋቾ ድርጅቶች።",
  },
  body: {
    he: `לפי הלשכה המרכזית לסטטיסטיקה, בסוף 2024 מנתה האוכלוסייה ממוצא אתיופי בישראל **177.6 אלף נפש** — 93.4 אלף ילידי אתיופיה ו-84.2 אלף ילידי ישראל לאבות ילידי אתיופיה. (ההגדרה הרשמית נגזרת ממוצא האב, ולכן הקהילה בפועל גדולה מכך.) שינוי חברתי דורש קול, ייצוג, ופעולה.

**זכויות הצבעה**
כל אזרח ישראלי שמלאו לו 18 ביום הבחירות זכאי להצביע לכנסת, לרשויות המקומיות ולמועצות האזוריות (חוק-יסוד: הכנסת, ס' 5). התנאי הוא **אזרחות**, לא מגורים בישראל — אבל ההצבעה היא פיזית בקלפי בישראל בלבד, ואין הצבעה כללית מחו"ל: אזרח שנמצא בחו"ל ביום הבחירות אינו יכול להצביע.

הרישום לפנקס הבוחרים אוטומטי — אך הכתובת בפנקס נלקחת מ**מרשם האוכלוסין** (רשות האוכלוסין וההגירה, משרד הפנים). מי שעלה לאחרונה או עבר דירה ולא עדכן את כתובתו יישלח לקלפי הישנה. [עדכון כתובת במשרד הפנים](https://www.gov.il/he/service/changing_address).

**ייצוג במועצות מקומיות**
הקהילה האתיופית מתרכזת בעיקר בנתניה, ראשון-לציון, ירושלים, חדרה, אשדוד, ובאר-שבע. הגברת הנוכחות בבחירות המקומיות — הצבעה ומועמדות — היא הדרך לשנות תקצובים ומדיניות חינוך, שיכון ורווחה ברמה המיידית ביותר.

**ארגון קהילתי**
ארגונים כמו **גוונים** ו**טבקה** פועלים להגברת הייצוג ולמאבק באפליה. ניתן להצטרף כמתנדב, לתרום, או לפנות אליהם בבקשה לליווי. ועד הרבנים האתיופים בישראל ממלא תפקיד חברתי-דתי מרכזי בחיי הקהילה.

**השתתפות מדינית**
פנו לחברי הכנסת מהקהילה עם דרישות קונקרטיות בנושאים כגון: גיוס שוויוני, ייצוג בשירות הציבורי, גישה להשכלה גבוהה, ומימון ארגוני הקהילה. מכתב מנומק, ביקור בלשכה, ותיאום עם ארגון מקומי — הם כלים אפקטיביים.

**שמירה על הזיכרון הקהילתי**
פעולה קולקטיבית כוללת גם שמירה על הנרטיב: לספר את הסיפור האתיופי-ישראלי בבתי-ספר, במדיה, ובבתי-משפט. הנכחת הסיפור היא חלק בלתי-נפרד מהמאבק לשוויון.

מקורות: [למ"ס — האוכלוסייה ממוצא אתיופי בישראל, הודעה 367/2025](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · [חוק-יסוד: הכנסת](https://www.nevo.co.il/law_html/law01/184_001.htm) · [עדכון כתובת](https://www.gov.il/he/service/changing_address) · נבדק ספטמבר 2026.`,
    en: `According to the Central Bureau of Statistics, at the end of 2024 the Ethiopian-origin population in Israel stood at **177,600** — 93,400 born in Ethiopia and 84,200 born in Israel to Ethiopian-born fathers. (The official definition follows the father's origin, so the community in practice is larger.) Social change requires voice, representation, and action.

**Voting rights**
Every Israeli citizen who is 18 on election day may vote in Knesset, municipal, and regional council elections (Basic Law: The Knesset, s.5). The condition is **citizenship**, not residence — but voting is in person at a polling station in Israel only, and there is no general absentee ballot: a citizen abroad on election day cannot vote.

Voter registration is automatic — but the address on the register comes from the **Population Registry** (Population and Immigration Authority, Ministry of the Interior). Anyone who recently made aliyah or moved without updating their address will be assigned to their old polling station. [Update your address](https://www.gov.il/he/service/changing_address).

**Representation in local councils**
The Ethiopian community is concentrated mainly in Netanya, Rishon LeZion, Jerusalem, Hadera, Ashdod, and Be'er Sheva. Increasing presence in local elections — through voting and candidacy — is the most immediate path to changing budgets and policies on education, housing, and welfare.

**Community organising**
Organisations such as **Gvanim** and **Tebeka** work to increase representation and fight discrimination. You can join as a volunteer, donate, or approach them for accompaniment. The Ethiopian Rabbinical Council in Israel plays a central social-religious role in community life.

**Political participation**
Contact Knesset members from the community with concrete demands on issues such as: equitable conscription, representation in public service, access to higher education, and funding for community organisations. A reasoned letter, an office visit, and coordination with a local organisation are effective tools.

**Preserving communal memory**
Collective action also includes guarding the narrative: telling the Ethiopian-Israeli story in schools, media, and courts. Making the story present is an inseparable part of the struggle for equality.

Sources: [CBS — Ethiopian-origin population, release 367/2025](https://www.cbs.gov.il/he/mediarelease/DocLib/2025/367/11_25_367b.pdf) · [Basic Law: The Knesset](https://www.nevo.co.il/law_html/law01/184_001.htm) · [address update](https://www.gov.il/he/service/changing_address) · verified September 2026.`,
    am: `በማዕከላዊ የስታቲስቲክስ ቢሮ መሠረት፣ በ2024 መጨረሻ በእስራኤል ከኢትዮጵያ ተወላጅ የሆነው ሕዝብ **177,600** ደርሷል — 93,400 በኢትዮጵያ የተወለዱ እና 84,200 በኢትዮጵያ ከተወለዱ አባቶች በእስራኤል የተወለዱ። (ኦፊሴላዊው ትርጓሜ የአባትን ተወላጅነት ስለሚከተል፣ ማህበረሰቡ በተግባር ከዚህ ይበልጣል።)

**የምርጫ መብቶች**
በምርጫው ቀን 18 ዓመት የሞላው እያንዳንዱ እስራኤላዊ ዜጋ የመምረጥ መብት አለው (የክነሰት መሠረታዊ ሕግ ክፍል 5)። መስፈርቱ **ዜግነት** ነው እንጂ በእስራኤል መኖር አይደለም — ነገር ግን ምርጫው በእስራኤል ውስጥ በአካል ብቻ ነው፤ በምርጫው ቀን ውጭ አገር ያለ ዜጋ መምረጥ አይችልም።

በመራጮች መዝገብ ውስጥ ያለው አድራሻ ከ**የሕዝብ መዝገብ** (የውስጥ ጉዳይ ሚኒስቴር) ይወሰዳል። በቅርቡ የመጣ ወይም የተዛወረ ሰው አድራሻውን ካላዘመነ ወደ አሮጌው ምርጫ ጣቢያ ይላካል። [አድራሻ ማዘመን](https://www.gov.il/he/service/changing_address)።

**በአካባቢ ምክር ቤቶች ያለ ውክልና**
ኢትዮጵያ ማህበረሰብ በዋነኛነት ቤናታንያ፣ ሪሾን ሌዚዮን፣ ኢየሩሳሌም፣ ሐደራ፣ አሽዶድ እና ቤኤርሼቫ ነዋሪዎች ናቸው። በአካባቢ ምርጫዎቹ ተሳትፎ — ምርጫ እና እጩ — ለትምህርት፣ መኖሪያ ቤት እና ደህንነት ቡድጄቶች እና ፖሊሲዎች ለመቀየር ፈጣን መንገድ ነው።

**ማህበረሰብ ማደራጀት**
**ጋቫኒም** እና **ቴቤካ** ያሉ ድርጅቶች ውክልናን ለማሳደግ እና አድሎን ለመዋጋት ይሰራሉ። እንደ በጎ ፈቃደኛ ሊቀላቀሉ፣ ሊለግሱ ወይም ድጋፍ ሊጠይቁ ይችላሉ።

**ፖለቲካዊ ተሳትፎ**
ከማህበረሰቡ ለሚገኙ የኮሃሴት አባላት ዕኩሌ ወሰቃ፣ ሕዝባዊ አገልግሎት ውክልና፣ ወደ ከፍተኛ ትምህርት ተደራሽነት እና ለማህበረሰብ ድርጅቶች የሚውል ገንዘብ ሊጠይቁ ይችላሉ።

**ታሪካዊ ትዝታ ጠብቃ ማቆም**
የጋራ እርምጃ ናሬቲቭን መጠበቅንም ያካትታሉ: ኢትዮጵያ-እስራኤላዊ ታሪክ በትምህርት ቤቶች፣ ሚዲያ እና ፍርድ ቤቶቹ ማቅረብ። ታሪኩ እንዲታወቅ ማድረግ ለእኩልነት ትግሉ አካል ነው።`,
  },
  resources: [
    // TED-158: "תנועת אמונה" removed — its cited domain (amona.co.il) is
    // NXDOMAIN, never registered, and no Ethiopian-community organisation
    // of that name could be established. Same removal in wave 2, topics 9
    // and 10.
    {
      name: "גוונים — מרכז לשילוב וקידום",
      url: "https://www.gvanim.org.il",
      description: {
        he: "ארגון הפועל לשילוב ייצוג של יוצאי אתיופיה במגזר הציבורי ובמוסדות המדינה.",
        en: "Organisation working to integrate Ethiopian-Israeli representation in the public sector and state institutions.",
        am: "ኢትዮጵያ-እስራኤላዊ ውክልናን ሕዝባዊ ዘርፍ እና የሀገር ተቋሞች ውስጥ ለማዋሀድ የሚሰራ ድርጅት።",
      },
    },
    {
      name: "ועד הרבנים האתיופים בישראל",
      description: {
        he: "גוף דתי-חברתי המייצג את הקהילה בפני הרבנות הראשית ומשמר את מסורות הקייס.",
        en: "A religious-social body representing the community before the Chief Rabbinate and preserving Kes traditions.",
        am: "ዋና ሃይማኖቶቹ ፊት ማህበረሰቡን የሚወክልና የቀስ ወጎችን የሚጠብቅ ሃይማኖታዊ-ማህበራዊ አካል።",
      },
    },
    {
      name: 'הצוות למיגור הגזענות נגד יוצאי אתיופיה (המכונה "ועדת פלמור")',
      url: "https://www.gov.il/he/departments/publications/reports/racism_report_2016",
      description: {
        he: 'הצוות בראשות עו"ד אמי פלמור הוקם בהחלטת ממשלה 1107 (4.2.2016). דוחו, מיולי 2016, כלל למעלה מ-50 המלצות, והממשלה אימצה אותן בהחלטה 1958 (16.8.2016) — ההכרה הרשמית בקיומה של אפליה שיטתית. בעקבותיו הוקמה היחידה הממשלתית לתיאום המאבק בגזענות.',
        en: "The team chaired by Emi Palmor was established by Government Decision 1107 (4.2.2016). Its July 2016 report made more than 50 recommendations, adopted by Government Decision 1958 (16.8.2016) — the formal recognition that systematic discrimination exists. It led to the creation of the Government Unit for Coordinating the Fight Against Racism.",
        am: "በጠበቃ ኤሚ ፓልሞር የሚመራው ቡድን በመንግሥት ውሳኔ 1107 (4.2.2016) ተቋቋመ። የሐምሌ 2016 ሪፖርቱ ከ50 በላይ ምክረ ሐሳቦችን ያካተተ ሲሆን በውሳኔ 1958 (16.8.2016) ጸድቋል።",
      },
    },
  ],
  lastReviewed: "2026-09-02",
};

// ── Accessors ─────────────────────────────────────────────────────────────────

export function topicTitle(topic: VoiceTopic, locale: "he" | "en" | "am"): string {
  return topic.title[locale] ?? topic.title.he;
}

export function topicSubtitle(topic: VoiceTopic, locale: "he" | "en" | "am"): string {
  return topic.subtitle[locale] ?? topic.subtitle.he;
}

export function topicBody(topic: VoiceTopic, locale: "he" | "en" | "am"): string {
  return topic.body[locale] ?? topic.body.he;
}

export function resourceDescription(
  resource: VoiceResource,
  locale: "he" | "en" | "am",
): string {
  return resource.description[locale] ?? resource.description.he;
}

// ── All topics — wave 1 + street-stop (TED-137) + wave 2 ─────────────────────

export const ALL_VOICE_TOPICS: VoiceTopic[] = [
  RACISM_REPORT_TOPIC,
  POLICE_CONDUCT_TOPIC,
  COMMUNITY_ACTION_TOPIC,
  STREET_STOP_TOPIC,
  ...VOICE_TOPICS_WAVE2,
];

export { VOICE_TOPICS_WAVE2 };
