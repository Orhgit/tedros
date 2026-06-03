// Voice & Action pillar — topic data for the 3 sub-pages.
//
// HE is source-of-truth (CLAUDE.md). EN + AM mirrored.
// Content reviewed: 2026-05-12.
// Wave 2 (18 topics) added: 2026-06-02.

import type { Translatable } from "../db/columns";
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
    he: `גזענות היא פגיעה בכבוד האדם — וגם עבירה פלילית על פי חוק איסור לשון הרע ועל פי עקרון השוויון. חוק שוויון זכויות (2000) ועקרונות חוק-יסוד: כבוד האדם וחירותו מגנים על כל אדם מהתנהגות מפלה.

**מה להגדיר כגזענות?**
גזענות כוללת אמירות, כתיבה, הפגנות, סרטונים, הטרדה, הדרה ממקומות ציבוריים, ואפליה בשירות — כל אלה על בסיס מוצא אתני, לאום, צבע עור, ודת.

**שלב 1 — תיעוד מיידי**
תעדו את האירוע מיד: תאריך, שעה, מיקום מדויק, שמות עדים (אם יש), וכל מידע על הפוגע. אם מדובר בסרטון ברשתות — צלמו צילום מסך לפני שייורד. אל תמחקו שום דבר.

**שלב 2 — הגשת תלונה**
ניתן להגיש תלונה למשטרת ישראל (נאשמות: הסתה לגזענות, עלבון עובד ציבור, הפרת שוויון). את התלונה ניתן להגיש במתחם של משטרה מקומית או דרך האתר הממשלתי.

**שלב 3 — פנייה לארגוני סיוע**
טבקה — ארגון זכויות לקהילה האתיופית — מציעה ייעוץ משפטי חינם ותמיכה בהגשת תלונה. האגודה לזכויות האזרח (ACRI) מטפלת בתיקים של אפליה שיטתית ויכולה ללוות אתכם לאורך ההליך.

**הגנה משפטית**
מגיש תלונה מוגן מפני תביעת-נגד בתום-לב. חוק הגנת המעוקין (2001) מגן על מי שמדווח על עבירות. אם מדובר בגזענות מצד מעסיק — חוק שוויון ההזדמנויות בעבודה (1988) מאפשר פנייה לבית-הדין לעבודה.`,
    en: `Racism is an affront to human dignity — and also a criminal offence under defamation law and the principle of equality. The Equal Rights Act (2000) and the Basic Law: Human Dignity and Liberty protect every person from discriminatory conduct.

**What counts as racism?**
Racism includes statements, writing, demonstrations, videos, harassment, exclusion from public spaces, and discriminatory service — all based on ethnic origin, nationality, skin colour, or religion.

**Step 1 — Immediate documentation**
Document the incident immediately: date, time, exact location, witness names (if any), and any information about the perpetrator. If it is a video on social media — take a screenshot before it is removed. Do not delete anything.

**Step 2 — Filing a complaint**
You may file a complaint with the Israel Police (charges: incitement to racism, insulting a public official, breach of equality). Complaints can be submitted at a local police station or through the government website.

**Step 3 — Contact support organisations**
Tebeka — a rights organisation for the Ethiopian community — offers free legal advice and support in filing complaints. The Association for Civil Rights in Israel (ACRI) handles cases of systemic discrimination and can accompany you throughout the process.

**Legal protection**
A complainant in good faith is protected from counter-suits. The Whistleblower Protection Act (2001) protects those who report offences. For racism by an employer — the Equal Opportunity in Employment Act (1988) allows recourse to the labour court.`,
    am: `ዘረኝነት የሰው ክብርን መጣስ ነው — እና በሕግ መሠረት ወንጀልም ነው። የእኩልነት መብቶች ህግ (2000) እና የሰው ክብር እና ነጻነት መሠረታዊ ህግ ሁሉንም ሰዎች ከአድሎ ድርጊት ይጠብቃሉ።

**ምን ዘረኝነት ተብሎ ይቆጠራል?**
ዘረኝነት ንግግሮችን፣ ጽሑፎችን፣ ሠልፎችን፣ ቪዲዮዎችን፣ ማሸማቀቅን፣ ከሕዝባዊ ቦታዎች ማስወጣትን እና አድሎ አገልግሎትን ያካትታል — ሁሉም በዘር ፣ ሀገረ-ምድር፣ የቆዳ ቀለም ወይም ሃይማኖት ላይ ተመርኩዘው።

**ደረጃ 1 — ወዲያውኑ ማስረጃ ይሰብስቡ**
ክስተቱን ወዲያውኑ ይዘግቡ: ቀን፣ ሰዓት፣ ትክክለኛ ቦታ፣ የምስክሮች ስሞች (ካሉ)፣ እና ስለ ጠቃሚ ሰው ማንኛውም መረጃ። ቪዲዮ ሶሻል ሚዲያ ላይ ካለ — ከመወሰዱ በፊት ቅጂ ያንሱ።

**ደረጃ 2 — ቅሬታ ማቅረብ**
ቅሬታ ለእስራኤል ፖሊስ ማቅረብ ይቻላል። ቅሬታ ማቅረቢያ ቦታ ወይም የመንግሥት ድረ-ገጽ ይጠቀሙ።

**ደረጃ 3 — ድጋፍ ድርጅቶችን ያነጋግሩ**
ቴቤካ — ለኢትዮጵያ ማህበረሰብ የሚሰራ የሕግ ድጋፍ ድርጅት — ነጻ የሕግ ምክር እና ቅሬታ ለማቅረብ ድጋፍ ይሰጣሉ። ACRI ሥርዓታዊ አድሎ ጉዳዮችን ያስተናግዳሉ።

**ሕጋዊ ጥበቃ**
ቅሬታ አቅራቢ ሰላማዊ ሲሆን ከተቃራኒ ክስ ይጠበቃሉ። ሕጉ ሪፖርት አቅራቢዎችን ይጠብቃቸዋል።`,
  },
  resources: [
    {
      name: "טבקה — ארגון זכויות לקהילה האתיופית",
      phone: "03-5103538",
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
  lastReviewed: "2026-05-12",
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

**זכויות בזמן עצירה (עצירה זמנית)**
חוק סדר הדין הפלילי (1982) קובע: שוטר רשאי לעצור אדם לבדיקת זהות רק אם יש חשד סביר לעבירה. אין חובה חוקית לנסוע עם שוטר שלא הציג צו. שאלו: "האם אני עצור? האם אני חופשי ללכת?" — על השוטר לענות ישירות.

**זכויות בחיפוש גוף**
חיפוש גוף מחייב הסכמה מפורשת, צו שופט, או חשד סביר קונקרטי. אם שוטר מבקש לחפש — שאלו לאיזה סמכות הוא נשען. אל תתנגדו פיזית — אבל אמרו בקול: "איני מסכים לחיפוש." תיעדו את זה.

**זכויות במעצר**
במעצר: (1) זכות לשתיקה — הזכות לא להפליל את עצמכם; (2) זכות לעורך-דין לפני חקירה; (3) זכות להודיע לקרוב משפחה תוך שעות ספורות; (4) זכות לתרגום — אם אינכם דוברי עברית, המשטרה חייבת לספק מתרגם. חוק המעצרים (1996), סעיף 32.

**כיצד מתלוננים — מח"ש**
מחלקת החקירות הפנימיות של המשטרה (מח"ש) חוקרת תלונות על שוטרים. ניתן להגיש תלונה: (1) ישירות במח"ש; (2) בתחנת משטרה (השוטר חייב לתעד את התלונה); (3) לפניית הציבור באתר משרד המשפטים. מומלץ להתלונן תוך 6 חודשים מהאירוע. שמרו הכל בכתב.

**ליווי משפטי**
טבקה מציעה ייעוץ חינמי בתיקי אלימות משטרתית ואפליה על רקע עדתי. יש לפנות מוקדם — לפני שהתיק ייסגר.`,
    en: `Ethiopian Israelis report a higher incidence of stops, searches, and even police violence. Knowing your legal rights is a form of self-defence.

**Rights during a stop (temporary detention)**
The Code of Criminal Procedure (1982) establishes: a police officer may detain a person for identity checks only if there is reasonable suspicion of an offence. There is no legal obligation to accompany an officer who has not presented a warrant. Ask: "Am I under arrest? Am I free to go?" — the officer must answer directly.

**Rights during a body search**
A body search requires explicit consent, a judicial warrant, or concrete reasonable suspicion. If an officer asks to search you — ask what authority they are relying on. Do not physically resist — but say clearly: "I do not consent to this search." Document it.

**Rights on arrest**
On arrest: (1) right to silence — the right not to incriminate yourself; (2) right to a lawyer before interrogation; (3) right to notify a family member within a few hours; (4) right to interpretation — if you do not speak Hebrew, the police must provide an interpreter. Arrest Law (1996), section 32.

**How to complain — MAHASH**
The Police Internal Investigations Department (MAHASH) investigates complaints against officers. You can file a complaint: (1) directly with MAHASH; (2) at a police station (the officer must record the complaint); (3) through the Ministry of Justice public-enquiries portal. Recommended within 6 months of the incident. Keep everything in writing.

**Legal accompaniment**
Tebeka offers free advice in cases of police violence and ethnic-based discrimination. Contact them early — before the case is closed.`,
    am: `ኢትዮጵያ-እስራኤላዊ ሰዎች ከፍ ባለ ምጣኔ ማቆሚያዎችን፣ ፍተሻዎችን፣ እና ፖሊስ ጥቃቶችን ያጋጫሉ። ሕጋዊ መብቶቾን ማወቅ ራስ-ጥበቃ ዘዴ ነው።

**ማቆሚያ ጊዜ ያሉ መብቶች**
ሰነድ ምርምር ሕጉ (1982) ይቆጣጠራሉ: ፖሊስ ምክንያታዊ ጥርጣሬ ሲኖር ብቻ ሊያቆምዎ ይችላሉ። "ተያዝኩ? ሄድ ይፈቀደኛልን?" ብለው ይጠይቁ — ፖሊሱ ቀጥተኛ መልስ ሊሰጥ ይገባዋል።

**የሰውነት ፍተሻ ጊዜ ያሉ መብቶች**
የሰውነት ፍተሻ ግልጽ ፈቃድ፣ የዳኛ ትዕዛዝ ወይም ትክክለኛ ምክንያት ይጠይቃሉ። ፍቃዱ ካልሰጡ በቃልዎ ይናገሩ: "ፍተሻ አልፈቅድም።" አካላዊ ተቃውሞ አይኖሩ — ነገር ግን ሰሚ ሰው ባለበት ቃልዎን ይናገሩ።

**በእስር ጊዜ ያሉ መብቶች**
(1) 침黙 የማቆሚያ መብት — ራስዎን አትውሰኑ; (2) ምርምር ከመጀመሩ በፊት ጠበቃ ማናገር; (3) ቤተሰብዎ ጉዳዩን ማሳወቅ; (4) ትርጉም — ዕብራይስጥ ካልተናገሩ ፖሊሱ አስተርጓሚ ማቅረብ ይገባዋል።

**ቅሬታ ማቅረቢያ — מח"ש**
የፖሊስ ውስጣዊ ምርምር ክፍል (מח"ש) ለፖሊስ ቅሬታዎች ምርምር ያደርጋሉ። ቅሬታ ማቅረቢያ ቦታዎች: (1) ቀጥተኛ ወደ מח"ש; (2) በፖሊስ ጣቢያ; (3) የፍትህ ሚኒስቴር ድረ-ገጽ። ክስተቱ ከተፈጸመ ከ6 ወር ውስጥ ቅሬታ ያቅርቡ።

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
      phone: "03-5103538",
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
  lastReviewed: "2026-05-12",
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
    he: `קהילת יוצאי אתיופיה מונה כ-165,000 אנשים בישראל — אחת הקהילות הצעירות, הגדלות, והפעילות ביותר. שינוי חברתי דורש קול, ייצוג, ופעולה.

**זכויות הצבעה**
כל אזרח ישראלי מגיל 18 זכאי להצביע בבחירות לכנסת, לרשויות המקומיות ולמועצות האזוריות. הבחירות הם ההזדמנות הממשית ביותר להשפיע על מדיניות ממשלתית. הרשמה לרשימת הבוחרים מתבצעת אוטומטית לאזרחים — אך כדאי לבדוק את פרטי הכתובת ברשות מקרקעי ישראל (רמ"י) כדי להבטיח שהאפשרות הנכונה.

**ייצוג במועצות מקומיות**
הקהילה האתיופית מתרכזת בעיקר בנתניה, ראשון-לציון, ירושלים, חדרה, אשדוד, ובאר-שבע. הגברת הנוכחות בבחירות המקומיות — הצבעה ומועמדות — היא הדרך לשנות תקצובים ומדיניות חינוך, שיכון ורווחה ברמה המיידית ביותר.

**ארגון קהילתי**
ארגונים כמו אמונה, גוונים, ו-IPMF (Israel-Policy-Ministry-Forum) פועלים להגביר ייצוג. ניתן להצטרף כמתנדב, לתרום, או להתמנות לתפקיד. ועד הרבנים האתיופים בישראל ממלא תפקיד חברתי-דתי מרכזי בחיי הקהילה.

**השתתפות מדינית**
פנו לחברי הכנסת מהקהילה עם דרישות קונקרטיות בנושאים כגון: גיוס שוויוני, ייצוג בשירות הציבורי, גישה להשכלה גבוהה, ומימון ארגוני הקהילה. מכתב מנומק, ביקור בלשכה, ותיאום עם ארגון מקומי — הם כלים אפקטיביים.

**שמירה על הזיכרון הקהילתי**
פעולה קולקטיבית כוללת גם שמירה על הנרטיב: לספר את הסיפור האתיופי-ישראלי בבתי-ספר, במדיה, ובבתי-משפט. הנכחת הסיפור היא חלק בלתי-נפרד מהמאבק לשוויון.`,
    en: `The Ethiopian-Israeli community numbers around 165,000 people — one of the youngest, fastest-growing, and most active communities in Israel. Social change requires voice, representation, and action.

**Voting rights**
Every Israeli citizen aged 18 and above is entitled to vote in Knesset elections, municipal elections, and regional council elections. Elections are the most direct opportunity to influence government policy. Voter registration is automatic for citizens — but verify your address with the Israel Land Authority to ensure it is correct.

**Representation in local councils**
The Ethiopian community is concentrated mainly in Netanya, Rishon LeZion, Jerusalem, Hadera, Ashdod, and Be'er Sheva. Increasing presence in local elections — through voting and candidacy — is the most immediate path to changing budgets and policies on education, housing, and welfare.

**Community organising**
Organisations such as Amona, Gvanim, and IPMF work to increase representation. You can join as a volunteer, donate, or seek a position. The Ethiopian Rabbinical Council in Israel plays a central social-religious role in community life.

**Political participation**
Contact Knesset members from the community with concrete demands on issues such as: equitable conscription, representation in public service, access to higher education, and funding for community organisations. A reasoned letter, an office visit, and coordination with a local organisation are effective tools.

**Preserving communal memory**
Collective action also includes guarding the narrative: telling the Ethiopian-Israeli story in schools, media, and courts. Making the story present is an inseparable part of the struggle for equality.`,
    am: `ኢትዮጵያ-እስራኤላዊ ማህበረሰብ ወደ 165,000 ሰዎች ይቆጠራሉ — ከወጣቶቹ፣ ፈጣን ዕድገት ካላቸው እና ንቁ ማህበረሰቦቹ አንዱ። ማህበራዊ ለውጥ ድምጽ፣ ውክልና እና እርምጃ ይጠይቃሉ።

**የምርጫ መብቶች**
ከ18 ዓመት በላይ ያሉ እያንዳንዱ እስራኤላዊ ዜጋ ለክነሰት፣ ለከተማ ምርጫ እና ለክልል ምክር ቤት ምርጫ የመምረጥ መብት አለው። ምርጫ የመንግሥት ፖሊሲ ለማሳወቅ ምርጡ ዕድል ነው።

**በአካባቢ ምክር ቤቶች ያለ ውክልና**
ኢትዮጵያ ማህበረሰብ በዋነኛነት ቤናታንያ፣ ሪሾን ሌዚዮን፣ ኢየሩሳሌም፣ ሐደራ፣ አሽዶድ እና ቤኤርሼቫ ነዋሪዎች ናቸው። በአካባቢ ምርጫዎቹ ተሳትፎ — ምርጫ እና እጩ — ለትምህርት፣ መኖሪያ ቤት እና ደህንነት ቡድጄቶች እና ፖሊሲዎች ለመቀየር ፈጣን መንገድ ነው።

**ማህበረሰብ ማደራጀት**
አሞና፣ ጋቫኒም እና IPMF ያሉ ድርጅቶች ውክልናን ለማሳደግ ይሰራሉ። እንደ በጎ ፈቃደኛ ሊቀላቀሉ፣ ሊለግሱ ወይም ቦታ ሊሹ ይችላሉ።

**ፖለቲካዊ ተሳትፎ**
ከማህበረሰቡ ለሚገኙ የኮሃሴት አባላት ዕኩሌ ወሰቃ፣ ሕዝባዊ አገልግሎት ውክልና፣ ወደ ከፍተኛ ትምህርት ተደራሽነት እና ለማህበረሰብ ድርጅቶች የሚውል ገንዘብ ሊጠይቁ ይችላሉ።

**ታሪካዊ ትዝታ ጠብቃ ማቆም**
የጋራ እርምጃ ናሬቲቭን መጠበቅንም ያካትታሉ: ኢትዮጵያ-እስራኤላዊ ታሪክ በትምህርት ቤቶች፣ ሚዲያ እና ፍርድ ቤቶቹ ማቅረብ። ታሪኩ እንዲታወቅ ማድረግ ለእኩልነት ትግሉ አካል ነው።`,
  },
  resources: [
    {
      name: "תנועת אמונה",
      url: "https://www.amona.co.il",
      description: {
        he: "תנועה חברתית פעילה לצמצום פערים ולשיפור מעמד הקהילה האתיופית בישראל.",
        en: "An active social movement for closing gaps and improving the status of the Ethiopian community in Israel.",
        am: "ልዩነቶችን ለዘጋት እና ለኢትዮጵያ ማህበረሰብ ደረጃ ለማሻሻል ንቁ ማህበራዊ ንቅናቄ።",
      },
    },
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
      name: "ועדת ליבאי — מסמך לאומי על אפליה (המלצות לממשלה)",
      url: "https://www.gov.il",
      description: {
        he: "ממשלת ישראל הכירה רשמית בקיום אפליה שיטתית כלפי יוצאי אתיופיה. דרישות יישום מאפשרות פנייה לממשלה.",
        en: "The Israeli government formally recognised the existence of systematic discrimination against Ethiopians. Implementation demands allow petitioning the government.",
        am: "የእስራኤል መንግሥት ለኢትዮጵያ ዜጎች ሥርዓታዊ አድሎ ኦፊሴላዊ ተቀብሎታሉ። ትግበራ ጥያቄዎች ለመንግሥት ቅሬታ ማቅረብ ያስፈቅዳሉ።",
      },
    },
  ],
  lastReviewed: "2026-05-12",
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

// ── All topics — wave 1 + wave 2 ─────────────────────────────────────────────

export const ALL_VOICE_TOPICS: VoiceTopic[] = [
  RACISM_REPORT_TOPIC,
  POLICE_CONDUCT_TOPIC,
  COMMUNITY_ACTION_TOPIC,
  ...VOICE_TOPICS_WAVE2,
];

export { VOICE_TOPICS_WAVE2 };
