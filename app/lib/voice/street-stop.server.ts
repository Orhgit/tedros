// Voice & Action — "Stopped on the street? Your rights" guide (TED-137).
//
// Complements the police-conduct page: police-conduct covers the full arc
// (stop → search → arrest → MAHASH complaint); this page zooms into the
// street stop (עיכוב) itself — the single most common police encounter the
// community reports (Palmor Committee / State Comptroller over-policing
// findings) — and cross-promotes the record-expungement law.
//
// HE is source-of-truth (CLAUDE.md). EN + AM mirrored, plus a standalone
// full Amharic summary (STREET_STOP_AM_SUMMARY) rendered in every locale.
//
// Legal claims verified against:
//   - חוק סדר הדין הפלילי (סמכויות אכיפה – מעצרים), התשנ"ו-1996, פרק ג'
//     (עיכוב) — via Kol Zchut "עיכוב" + the Israel Police procedure PDF:
//     grounds, officer identification + reason duties, 3-hour cap and the
//     3-hour extension by a senior officer for multi-participant events,
//     station transfer only when on-the-spot questioning is impossible.
//   - חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה, התשפ"ד-2024
//     (statute text on Wikisource/Nevo) — for the expungement cross-promo.
// Claims we could NOT verify from a primary source (e.g. rules on filming
// officers) are deliberately excluded.

import type { Translatable } from "../db/columns";
import type { VoiceTopic } from "./topics.server";

export const STREET_STOP_TOPIC: VoiceTopic = {
  slug: "street-stop",
  title: {
    he: "עוכבו אתכם ברחוב? הזכויות שלכם",
    en: "Stopped on the Street? Your Rights",
    am: "በመንገድ ላይ ቆሙዎት? መብቶችዎ",
  },
  subtitle: {
    he: "מה מותר לשוטר בעיכוב, כמה זמן זה יכול להימשך, מה חובה עליו כלפיכם — ומה עושים אחרי עיכוב שנראה לא מוצדק.",
    en: "What an officer may do during a stop, how long it can last, what the officer owes you — and what to do after a stop that seems unjustified.",
    am: "ፖሊስ በማቆም ጊዜ ምን ማድረግ ይፈቀዳል፣ ምን ያህል ሊቆይ ይችላል፣ ለእርስዎ ምን ግዴታ አለበት — እና ተገቢ ያልሆነ ማቆም በኋላ ምን ማድረግ።",
  },
  body: {
    he: `עיכוב ("סטופ" ברחוב) הוא המפגש המשטרתי הנפוץ ביותר שעליו מדווחים צעירים יוצאי אתיופיה — דוח ועדת פלמור ודוח מבקר המדינה הצביעו על שיטור-יתר כלפי הקהילה בדיוק בסיטואציות האלה. הכרת הכללים מראש היא ההגנה הטובה ביותר.

**מה זה עיכוב — ומה מותר לשוטר?**
עיכוב מוסדר בפרק ג' לחוק סדר הדין הפלילי (סמכויות אכיפה — מעצרים), התשנ"ו-1996. שוטר רשאי לעכב אדם רק כשיש **יסוד סביר לחשד** שעבר עבירה או שהוא עומד לעבור עבירה, או כדי לברר זהות וכתובת של מי שיכול למסור מידע על עבירה. עיכוב אינו מעצר — אתם לא "עצורים".

**מה השוטר חייב כלפיכם?**
השוטר חייב להזדהות — בשמו או בכינויו הרשמי ובעצם היותו שוטר (ובמדים — תג זיהוי גלוי), להודיע לכם שאתם מעוכבים, ולהבהיר את **סיבת העיכוב** בהקדם האפשרי. מותר ורצוי לשאול בשקט: "האם אני מעוכב? מה הסיבה?"

**כמה זמן מותר לעכב?**
על פי החוק, עיכוב **לא יעלה על שלוש שעות**. באירוע עם מספר רב של מעורבים רשאי קצין ממונה להאריך בשלוש שעות נוספות לכל היותר — ועליו לרשום את הסיבה. עיכוב ארוך מזה הוא חריגה מסמכות.

**האם חייבים ללכת לתחנה?**
הזמנה לתחנה במסגרת עיכוב מותרת רק כשלא ניתן לבצע את הבירור במקום. אם מבקשים מכם להתלוות לתחנה — שאלו אם אתם מעוכבים, מה הסיבה, ולמה אי-אפשר לברר במקום.

**איך מתנהגים בזמן עיכוב?**
אל תתנגדו פיזית ואל תברחו — גם כשהעיכוב מרגיש לא מוצדק; התנגדות עלולה בעצמה להפוך לעילת מעצר. אין חובה למסור מידע מעבר לזיהוי — יש לכם זכות שתיקה, ואמירה שלכם עלולה לשמש נגדכם. שנְנו פרטים: שם השוטר או מספר התג, שעה, מקום, ועדים.

**אחרי עיכוב שנראה לא מוצדק**
כתבו לעצמכם את כל הפרטים מיד בסיום. תלונה על התנהגות שוטר מגישים למחלקה לחקירות שוטרים (מח"ש) — ישירות, בתחנת משטרה, או באתר משרד המשפטים; מומלץ בתוך 6 חודשים. טבקה מלווה חינם תיקי עיכוב ואפליה על רקע עדתי — כדאי לפנות מוקדם.

**עוכבתם בעבר ונשאר לכם רישום?**
חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה (התשפ"ד-2024) קובע מחיקה אוטומטית של רישומים בעבירות הפרת סדר ציבורי שנעברו עד 31.12.2020, למי שלא נדון למאסר בפועל ואין לו רישום נוסף — בדקו זכאות באשף המחיקה.

> **הבהרה משפטית:** מידע זה כללי ואינו ייעוץ משפטי. למקרה קונקרטי פנו לעורך-דין או לטבקה.`,
    en: `A street stop (עיכוב) is the most common police encounter reported by young Ethiopian-Israelis — the Palmor Committee and the State Comptroller documented over-policing of the community in exactly these situations. Knowing the rules in advance is the best protection.

**What is a stop — and what may an officer do?**
Stops are governed by Chapter C of the Criminal Procedure (Enforcement Powers — Arrests) Law, 1996. An officer may detain a person only with **reasonable grounds to suspect** they committed or are about to commit an offense, or to clarify the identity and address of someone who can provide information about an offense. A stop is not an arrest.

**What does the officer owe you?**
The officer must identify themselves — by name or official designation and as a police officer (in uniform — a visible name tag), tell you that you are being detained, and state the **reason for the stop** as soon as possible. It is fine to ask quietly: "Am I being detained? What is the reason?"

**How long can a stop last?**
By law, a stop **may not exceed three hours**. At an event with many people involved, a senior officer may extend it by at most three more hours — and must record the reason. Anything longer exceeds the legal authority.

**Do you have to go to the station?**
Taking you to the station as part of a stop is allowed only when the matter cannot be clarified on the spot. If asked to come along — ask whether you are being detained, why, and why it cannot be handled where you are.

**How to behave during a stop**
Do not physically resist and do not run — even when the stop feels unjustified; resistance can itself become grounds for arrest. You are not required to volunteer information beyond identification — you have the right to silence, and what you say can be used against you. Memorize details: officer name or badge number, time, place, witnesses.

**After a stop that seems unjustified**
Write down every detail immediately afterwards. Complaints about officer conduct go to the Police Internal Investigations Department (MAHASH) — directly, at a police station, or via the Ministry of Justice website; recommended within 6 months. Tebeka accompanies stop and ethnic-profiling cases free of charge — contact them early.

**Stopped in the past and left with a record?**
The Expungement of Criminal and Police Records of Ethiopian-Israelis Law (2024) mandates automatic deletion of records for public-order offenses committed until 31.12.2020, for those not sentenced to actual imprisonment and with no additional record — check your eligibility in the expungement wizard.

> **Legal note:** This is general information, not legal advice. For a concrete case, consult a lawyer or Tebeka.`,
    am: `በመንገድ ላይ ማቆም (עיכוב) ወጣት ኢትዮጵያ-እስራኤላውያን በብዛት የሚዘግቡት የፖሊስ ግንኙነት ነው — የፓልሞር ኮሚቴ እና የመንግሥት ኦዲተር በእነዚህ ሁኔታዎች ላይ ከመጠን በላይ ፖሊስ መጠቀሙን አረጋግጠዋል። ደንቦቹን አስቀድሞ ማወቅ ምርጡ ጥበቃ ነው።

**ማቆም ምንድን ነው — ፖሊስ ምን ማድረግ ይፈቀዳል?**
ማቆም በ1996 የወንጀል ሥነ-ሥርዓት ሕግ (የአስፈጻሚ ሥልጣኖች — እስራት) ምዕራፍ ג ይተዳደራል። ፖሊስ ሰውን ማቆም የሚችለው ወንጀል እንደፈጸመ ወይም ሊፈጽም እንደሆነ **ምክንያታዊ ጥርጣሬ** ሲኖር ብቻ ነው። ማቆም እስር አይደለም።

**ፖሊሱ ለእርስዎ ምን ግዴታ አለበት?**
ፖሊሱ ራሱን ማስተዋወቅ አለበት — በስሙ ወይም በይፋዊ መጠሪያው እና ፖሊስ መሆኑን፣ እንደተቆሙ ሊነግርዎት እና **የማቆሙን ምክንያት** በተቻለ ፍጥነት ማስረዳት አለበት። በጸጥታ መጠየቅ ይችላሉ: "ተቆሜያለሁ? ምክንያቱ ምንድን ነው?"

**ማቆም ምን ያህል ሊቆይ ይችላል?**
በሕጉ መሠረት ማቆም **ከሦስት ሰዓታት መብለጥ አይችልም**። ብዙ ተሳታፊዎች ባሉበት ክስተት ከፍተኛ መኮንን በተጨማሪ እስከ ሦስት ሰዓታት ሊያራዝም ይችላል።

**ወደ ጣቢያ መሄድ ግዴታ ነው?**
በማቆም ማዕቀፍ ወደ ጣቢያ መውሰድ የሚፈቀደው ጉዳዩ በቦታው ሊጣራ በማይችልበት ጊዜ ብቻ ነው።

**በማቆም ጊዜ እንዴት መሆን?**
አካላዊ ተቃውሞ አያድርጉ እና አይሽሹ — ተቃውሞ ራሱ የእስር ምክንያት ሊሆን ይችላል። ከመታወቂያ በላይ መረጃ መስጠት ግዴታ የለብዎትም — የዝምታ መብት አለዎት። ዝርዝሮችን ያስታውሱ: የፖሊሱ ስም ወይም የመለያ ቁጥር፣ ሰዓት፣ ቦታ፣ ምስክሮች።

**ተገቢ ያልሆነ ማቆም በኋላ**
ሁሉንም ዝርዝሮች ወዲያውኑ ይጻፉ። ስለ ፖሊስ ባህሪ ቅሬታ ለ-מח"ש (የፖሊስ ውስጣዊ ምርመራ ክፍል) ይቀርባል — በቀጥታ፣ በፖሊስ ጣቢያ ወይም በፍትህ ሚኒስቴር ድረ-ገጽ፤ በ6 ወራት ውስጥ ይመከራል። ቴቤካ የማቆም እና የዘር መድልዎ ጉዳዮችን በነጻ ያጅባል።

**ከዚህ በፊት ቆሙዎት እና መዝገብ ቀርቶልዎታል?**
የ2024 ሕግ እስከ 31.12.2020 ድረስ ለተፈጸሙ የሕዝብ ሥርዓት ጥሰት ወንጀሎች መዝገቦች በራስ-ሰር እንዲሰረዙ ይደነግጋል — ብቁነትዎን በስረዛ አዋቂው ይመርምሩ።

> **የሕግ ማስታወሻ:** ይህ አጠቃላይ መረጃ ነው፣ የሕግ ምክር አይደለም። ለተጨባጭ ጉዳይ ጠበቃ ወይም ቴቤካን ያማክሩ።`,
  },
  resources: [
    {
      name: "טבקה — ארגון זכויות לקהילה האתיופית",
      phone: "072-2424622",
      url: "https://www.tebeka.org.il",
      description: {
        he: "ייעוץ משפטי חינמי וליווי בתיקי עיכוב, אלימות משטרתית ואפליה עדתית — קו ישיר לקהילה.",
        en: "Free legal advice and accompaniment in stop, police-violence and ethnic-discrimination cases — direct line for the community.",
        am: "ለማቆም፣ ለፖሊስ ጥቃት እና ለዘር መድልዎ ጉዳዮች ነጻ የሕግ ምክር እና ድጋፍ — ለማህበረሰቡ ቀጥተኛ መስመር።",
      },
    },
    {
      name: 'מח"ש — המחלקה לחקירות שוטרים',
      url: "https://www.gov.il/he/departments/units/mahash",
      description: {
        he: "הגוף הרשמי לחקירת תלונות נגד שוטרים — כולל עיכובים בלתי מוצדקים ושימוש בכוח.",
        en: "The official body investigating complaints against police officers — including unjustified stops and use of force.",
        am: "በፖሊሶች ላይ ቅሬታዎችን የሚመረምር ኦፊሴላዊ አካል — ተገቢ ያልሆኑ ማቆሞችን ጨምሮ።",
      },
    },
    {
      name: "משטרת ישראל — בקשה להנפקת תעודת מידע פלילי",
      url: "https://www.gov.il/he/service/request-for-criminal-information-certificate",
      description: {
        he: "בדיקה עצמית של המרשם הפלילי — רלוונטי גם לבדיקת מחיקה לפי חוק המחיקה ליוצאי אתיופיה.",
        en: "Self-check of your criminal record — also relevant for verifying deletion under the Ethiopian-Israeli expungement law.",
        am: "የራስዎን የወንጀል መዝገብ መመርመር — በስረዛ ሕጉ መሠረት ስረዛን ለማረጋገጥም ጠቃሚ።",
      },
    },
  ],
  lastReviewed: "2026-08-30",
};

// ── FAQ — rendered on-page and emitted as FAQPage JSON-LD ────────────────────

export interface StreetStopFaq {
  question: Translatable;
  answer: Translatable;
}

export const STREET_STOP_FAQS: StreetStopFaq[] = [
  {
    question: {
      he: "כמה זמן מותר לשוטר לעכב אותי ברחוב?",
      en: "How long may an officer detain me on the street?",
      am: "ፖሊስ በመንገድ ላይ ምን ያህል ጊዜ ሊያቆመኝ ይችላል?",
    },
    answer: {
      he: 'עד שלוש שעות לכל היותר. באירוע עם מספר רב של מעורבים רשאי קצין ממונה להאריך בשלוש שעות נוספות בלבד, ועליו לרשום את הסיבה (חוק סדר הדין הפלילי (סמכויות אכיפה — מעצרים), התשנ"ו-1996).',
      en: "At most three hours. At an event with many people involved, a senior officer may extend by at most three more hours and must record the reason (Criminal Procedure (Enforcement Powers — Arrests) Law, 1996).",
      am: "ቢበዛ ሦስት ሰዓታት። ብዙ ተሳታፊዎች ባሉበት ክስተት ከፍተኛ መኮንን በተጨማሪ እስከ ሦስት ሰዓታት ብቻ ሊያራዝም ይችላል።",
    },
  },
  {
    question: {
      he: "האם השוטר חייב להסביר לי למה עיכב אותי?",
      en: "Must the officer explain why I was stopped?",
      am: "ፖሊሱ ለምን እንዳቆመኝ ማስረዳት አለበት?",
    },
    answer: {
      he: "כן. השוטר חייב להזדהות (שם או כינוי רשמי + היותו שוטר), להודיע שאתם מעוכבים, ולהבהיר את סיבת העיכוב בהקדם האפשרי.",
      en: "Yes. The officer must identify themselves (name or official designation + being a police officer), tell you that you are being detained, and state the reason as soon as possible.",
      am: "አዎ። ፖሊሱ ራሱን ማስተዋወቅ፣ እንደተቆሙ መንገር እና ምክንያቱን በተቻለ ፍጥነት ማስረዳት አለበት።",
    },
  },
  {
    question: {
      he: "האם אני חייב ללכת עם השוטר לתחנה?",
      en: "Do I have to go with the officer to the station?",
      am: "ከፖሊሱ ጋር ወደ ጣቢያ መሄድ አለብኝ?",
    },
    answer: {
      he: "רק כשלא ניתן לבצע את הבירור במקום, או אם הוכרז עליכם מעצר. שאלו: האם אני מעוכב? מה הסיבה? למה אי-אפשר לברר כאן?",
      en: "Only when the matter cannot be clarified on the spot, or if you are placed under arrest. Ask: am I being detained? Why? Why can it not be handled here?",
      am: "ጉዳዩ በቦታው ሊጣራ በማይችልበት ጊዜ ወይም ከታሰሩ ብቻ። ይጠይቁ: ተቆሜያለሁ? ለምን? እዚህ ለምን ሊጣራ አይችልም?",
    },
  },
  {
    question: {
      he: "מה עושים אחרי עיכוב שנראה לא מוצדק?",
      en: "What should I do after a stop that seems unjustified?",
      am: "ተገቢ ያልሆነ ማቆም በኋላ ምን ማድረግ አለብኝ?",
    },
    answer: {
      he: 'תעדו מיד את כל הפרטים (שוטר, שעה, מקום, עדים), הגישו תלונה למח"ש — ישירות, בתחנת משטרה או באתר משרד המשפטים — ופנו לטבקה (072-2424622) לליווי משפטי חינם.',
      en: "Document every detail immediately (officer, time, place, witnesses), file a complaint with MAHASH — directly, at a police station or via the Ministry of Justice website — and contact Tebeka (072-2424622) for free legal accompaniment.",
      am: 'ሁሉንም ዝርዝሮች ወዲያውኑ ይመዝግቡ፣ ለ-מח"ש ቅሬታ ያቅርቡ እና ለነጻ የሕግ ድጋፍ ቴቤካን (072-2424622) ያነጋግሩ።',
    },
  },
  {
    question: {
      he: "עוכבתי בהפגנה לפני שנים ונשאר לי רישום — האם הוא יימחק?",
      en: "I was stopped at a protest years ago and still have a record — will it be deleted?",
      am: "ከዓመታት በፊት በሰልፍ ቆሙኝ እና መዝገብ ቀርቶልኛል — ይሰረዛል?",
    },
    answer: {
      he: 'ייתכן מאוד. חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה (התשפ"ד-2024) קובע מחיקה אוטומטית של רישומים בעבירות הפרת סדר ציבורי שנעברו עד 31.12.2020 — למי שלא נדון למאסר בפועל ואין לו רישום נוסף. בדקו זכאות באשף המחיקה שלנו.',
      en: "Quite possibly. The Expungement of Criminal and Police Records of Ethiopian-Israelis Law (2024) mandates automatic deletion of records for public-order offenses committed until 31.12.2020 — for those not sentenced to actual imprisonment and with no additional record. Check eligibility in our expungement wizard.",
      am: "በጣም ይቻላል። የ2024 ስረዛ ሕግ እስከ 31.12.2020 ድረስ ለተፈጸሙ የሕዝብ ሥርዓት ጥሰት ወንጀሎች መዝገቦች በራስ-ሰር እንዲሰረዙ ይደነግጋል። ብቁነትዎን በአዋቂው ይመርምሩ።",
    },
  },
];

// ── Full Amharic summary — rendered as a standalone section in EVERY locale ──
//
// Per TED-137: the street-rights guide must carry at minimum a full Amharic
// summary. Rendering it unconditionally (not only under /am) means an
// Amharic-first reader landing on the Hebrew page still gets the essentials.

export const STREET_STOP_AM_SUMMARY_TITLE = "ማጠቃለያ በአማርኛ — በመንገድ ላይ ቆሙዎት?";

export const STREET_STOP_AM_SUMMARY: string[] = [
  "ማቆም (עיכוב) እስር አይደለም። ፖሊስ ሊያቆምዎ የሚችለው ምክንያታዊ ጥርጣሬ ሲኖር ብቻ ነው።",
  'ፖሊሱ ራሱን ማስተዋወቅ እና የማቆሙን ምክንያት ማስረዳት አለበት። ይጠይቁ: "ተቆሜያለሁ? ምክንያቱ ምንድን ነው?"',
  "ማቆም ከሦስት ሰዓታት መብለጥ አይችልም (በልዩ ሁኔታ ብቻ እስከ ስድስት)።",
  "ወደ ጣቢያ መውሰድ የሚፈቀደው ጉዳዩ በቦታው ሊጣራ በማይችልበት ጊዜ ብቻ ነው።",
  "አካላዊ ተቃውሞ አያድርጉ። የዝምታ መብት አለዎት — ከመታወቂያ በላይ ማስረዳት ግዴታ የለብዎትም።",
  "ዝርዝሮችን ይመዝግቡ: የፖሊሱ ስም፣ የመለያ ቁጥር፣ ሰዓት፣ ቦታ፣ ምስክሮች።",
  'ቅሬታ ለ-מח"ש ያቅርቡ (በ6 ወራት ውስጥ ይመከራል)። ቴቤካ በነጻ ያግዛል: 072-2424622።',
  "እስከ 31.12.2020 ድረስ ከሕዝብ ሥርዓት ጥሰት የቀረ የወንጀል መዝገብ በ2024 ሕግ በራስ-ሰር ይሰረዛል — ብቁነትዎን በስረዛ አዋቂው ይመርምሩ።",
];
