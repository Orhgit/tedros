// Mental-health access seed (TED-144 — Health hub wave: access in Amharic).
//
// 3 guide pages extending /health/mental-health:
//   interpreter                 — getting mental-health care with an interpreter
//   hospitalization-rights      — rights in psychiatric hospitalization, incl. involuntary
//   culturally-competent-care   — what culturally-competent care means + how to ask for it
//
// Documented problem (ynet 5076330, 2026): zero Amharic/Tigrinya-fluent
// psychiatrists or psychologists in the public system; hospitalization rate
// more than double the community's population share; misdiagnoses driven by
// language and cultural gaps. The MoH telephone interpretation center (*5144)
// exists but is largely unknown.
//
// Every factual claim below is source-verified (see `sources` per page).
// gov.il pages are linked as the official reference; where gov.il could not
// be fetched directly (Cloudflare), details were verified against kupat-holim
// pages (maccabi4u) and Kol Zchut, per the issue's verification rules.
// Hours/phones current as of 2026-08-30 — update cadence: on MoH changes.
//
// HE is source-of-truth (CLAUDE.md). EN + AM mirrored. Page 1 (interpreter)
// additionally carries a FULL standalone Amharic summary — it is the
// access-critical page. AM mirror requires human review by a native speaker
// (flagged in the PR).
//
// YMYL + legal content: rendered behind HealthDisclaimer, and the
// hospitalization page adds a "not legal advice" banner.

import type { Translatable } from "../db/columns";

export type MentalHealthAccessSlug =
  | "interpreter"
  | "hospitalization-rights"
  | "culturally-competent-care";

export const ALL_MENTAL_HEALTH_ACCESS_SLUGS: MentalHealthAccessSlug[] = [
  "interpreter",
  "hospitalization-rights",
  "culturally-competent-care",
];

export interface MentalHealthAccessSection {
  id: string;
  heading: Translatable;
  body: Translatable;
}

export interface MentalHealthAccessFaq {
  id: string;
  question: Translatable;
  answer: Translatable;
}

export interface MentalHealthAccessSource {
  name: string;
  url: string;
}

export interface MentalHealthAccessPage {
  slug: MentalHealthAccessSlug;
  sections: MentalHealthAccessSection[];
  faqs: MentalHealthAccessFaq[];
  /** Official / primary sources backing the factual claims on the page. */
  sources: MentalHealthAccessSource[];
  /**
   * Full standalone Amharic summary of the page — rendered as a highlighted
   * card so it can be read (or shown to a clinician) on its own.
   */
  amharicSummary: string;
  /** Adds the "not legal advice" banner (hospitalization-rights). */
  legalDisclaimer: boolean;
  /** ISO date of last editorial review. */
  lastReviewed: string;
}

const LAST_REVIEWED = "2026-08-30";

export const MENTAL_HEALTH_ACCESS_PAGES: MentalHealthAccessPage[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. איך מקבלים טיפול נפשי עם מתורגמן
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "interpreter",
    legalDisclaimer: false,
    lastReviewed: LAST_REVIEWED,
    sections: [
      {
        id: "your-right",
        heading: {
          he: "יש לך זכות למתורגמן — זה החוק",
          en: "You have a right to an interpreter — it's the law",
          am: "አስተርጓሚ የማግኘት መብት አለዎት — ሕግ ነው",
        },
        body: {
          he: `חוק זכויות החולה (1996), סעיף 3, מחייב כל מוסד רפואי בישראל לוודא שאתה מבין את הצוות ושהצוות מבין אותך. בטיפול נפשי זה קריטי במיוחד: אבחון פסיכיאטרי נעשה כמעט כולו דרך שיחה, וכשאין שפה משותפת — טעויות אבחון קורות. אתה לא צריך להביא בן משפחה שיתרגם, ואתה לא צריך לשלם: מותר לך לדרוש מתורגמן מקצועי, בחינם, בקופת החולים, במרפאה לבריאות הנפש ובבית החולים.`,
          en: `The Patient Rights Act (1996), section 3, obliges every medical institution in Israel to make sure you understand the staff and the staff understands you. In mental-health care this is critical: psychiatric diagnosis happens almost entirely through conversation, and without a shared language misdiagnoses happen. You do not need to bring a family member to translate, and you do not need to pay: you may demand a professional interpreter, free of charge, at the health fund, the mental-health clinic, and the hospital.`,
          am: `የታካሚ መብቶች ህግ (1996)፣ አንቀጽ 3፣ በእስራኤል ያለ እያንዳንዱ ሕክምና ተቋም እርስዎ ሠራተኞቹን እንዲረዱ እና ሠራተኞቹ እርስዎን እንዲረዱ ማረጋገጥ አለበት። በአዕምሮ ጤና ሕክምና ይህ ወሳኝ ነው፡ ሥነ-ልቡናዊ ምርመራ በዋነኝነት በንግግር ይካሄዳል፣ የጋራ ቋንቋ ከሌለ — የተሳሳተ ምርመራ ይከሰታል። ቤተሰብ አባል አስተርጓሚ ማምጣት አያስፈልግዎትም፣ መክፈልም አያስፈልግዎትም፡ በጤና ድርጅቱ፣ በአዕምሮ ጤና ክሊኒክ እና በሆስፒታሉ ሙያዊ አስተርጓሚ በነጻ የመጠየቅ መብት አለዎት።`,
        },
      },
      {
        id: "moh-5144",
        heading: {
          he: "מוקד התרגום הרפואי של משרד הבריאות — 5144*",
          en: "The Ministry of Health medical interpretation center — *5144",
          am: "የጤና ሚኒስቴር የሕክምና ትርጉም ማዕከል — *5144",
        },
        body: {
          he: `משרד הבריאות מפעיל מוקד תרגום רפואי טלפוני (5144*) עם מתורגמנים מקצועיים באמהרית, טיגרינית, ערבית, רוסית וצרפתית. כך זה עובד: המטפל (רופא, פסיכולוג, אחות) מתקשר למוקד במהלך הפגישה, והשיחה מתנהלת בשלושה — אתה, המטפל והמתורגמן על הקו. השירות חינם לחלוטין למטופל.

שעות פעילות (נכון לאוגוסט 2026): אמהרית, ערבית, רוסית וצרפתית — ימים א'–ה' 8:00–19:00, יום ו' 8:00–13:00. טיגרינית — ימים א'–ה' 8:00–16:00, יום ו' 8:00–13:00. השעות עשויות להשתנות — בדקו בעמוד הרשמי של משרד הבריאות (קישור למטה).

חשוב: את המוקד מפעיל המטפל, לא אתה. התפקיד שלך הוא לבקש — והמטפל מחויב להיענות.`,
          en: `The Ministry of Health operates a telephone medical interpretation center (*5144) with professional interpreters in Amharic, Tigrinya, Arabic, Russian, and French. How it works: the clinician (doctor, psychologist, nurse) calls the center during your appointment, and the conversation runs three-way — you, the clinician, and the interpreter on the line. The service is completely free for the patient.

Hours (as of August 2026): Amharic, Arabic, Russian, and French — Sun–Thu 8:00–19:00, Fri 8:00–13:00. Tigrinya — Sun–Thu 8:00–16:00, Fri 8:00–13:00. Hours may change — check the official Ministry of Health page (linked below).

Important: the clinician places the call, not you. Your job is to ask — and the clinician is obliged to respond.`,
          am: `የጤና ሚኒስቴር በአማርኛ፣ ትግርኛ፣ አረብኛ፣ ሩስኛ እና ፈረንሳይኛ ሙያዊ አስተርጓሚዎች ያሉት የስልክ የሕክምና ትርጉም ማዕከል (*5144) ያንቀሳቅሳል። እንዴት ይሰራል፡ ሐኪሙ (ዶክተር፣ ሳይኮሎጂስት፣ ነርስ) በቀጠሮዎ ወቅት ወደ ማዕከሉ ይደውላል፣ ንግግሩም በሶስት ይካሄዳል — እርስዎ፣ ሐኪሙ እና አስተርጓሚው በመስመሩ ላይ። አገልግሎቱ ለታካሚው ሙሉ በሙሉ ነጻ ነው።

የሥራ ሰዓቶች (እ.ኤ.አ. ነሐሴ 2026)፡ አማርኛ፣ አረብኛ፣ ሩስኛ እና ፈረንሳይኛ — እሁድ–ሐሙስ 8:00–19:00፣ አርብ 8:00–13:00። ትግርኛ — እሁድ–ሐሙስ 8:00–16:00፣ አርብ 8:00–13:00። ሰዓቶቹ ሊለወጡ ይችላሉ — በጤና ሚኒስቴር ኦፊሴላዊ ገጽ ያረጋግጡ።

አስፈላጊ፡ የሚደውለው ሐኪሙ ነው፣ እርስዎ አይደሉም። የእርስዎ ሥራ መጠየቅ ነው — ሐኪሙም መልስ የመስጠት ግዴታ አለበት።`,
        },
      },
      {
        id: "how-to-ask",
        heading: {
          he: "כך מבקשים מהקופה — משפט אחד מספיק",
          en: "How to ask your health fund — one sentence is enough",
          am: "ከጤና ድርጅትዎ እንዴት ይጠይቃሉ — አንድ ዓረፍተ ነገር በቂ ነው",
        },
        body: {
          he: `בקביעת התור אמרו: "אני צריך/ה מתורגמן לאמהרית — בבקשה תפעילו את מוקד התרגום 5144* בפגישה". אפשר לומר את זה גם בתחילת הפגישה עצמה. מומלץ לבקש גם בכתב (SMS או באפליקציה של הקופה) — כך נשארת אסמכתא.

אם המטפל מסרב או "אין זמן": בקשו את הסירוב בכתב, ופנו לאחראי במרפאה. לא נענים? מתלוננים למוקד "קול הבריאות" של משרד הבריאות — 5400* (שימו לב: 5400* הוא מוקד המידע והתלונות הכללי של המשרד — לא מוקד התרגום). זכות התרגום חלה גם על פגישות אצל פסיכיאטר, פסיכולוג ועובד סוציאלי — לא רק אצל רופא המשפחה.`,
          en: `When booking, say: "I need an Amharic interpreter — please use the *5144 interpretation center during the appointment." You can also say it at the start of the appointment itself. It is best to also ask in writing (SMS or your health fund's app) — that leaves a record.

If the clinician refuses or "has no time": ask for the refusal in writing and approach the clinic's manager. Still no answer? Complain to the Ministry of Health "Kol HaBriut" center — *5400 (note: *5400 is the Ministry's general information and complaints line — not the interpretation center). The right to interpretation applies to appointments with a psychiatrist, psychologist, and social worker — not only your family doctor.`,
          am: `ቀጠሮ ሲይዙ እንዲህ ይበሉ፡ "የአማርኛ አስተርጓሚ ያስፈልገኛል — እባክዎ በቀጠሮው ወቅት የ*5144 ትርጉም ማዕከልን ይጠቀሙ።" በቀጠሮው መጀመሪያም ሊሉት ይችላሉ። በጽሑፍም መጠየቅ ይመከራል (SMS ወይም የጤና ድርጅቱ መተግበሪያ) — ማስረጃ ይቀራል።

ሐኪሙ ቢከለክል ወይም "ጊዜ የለም" ቢል፡ እምቢታውን በጽሑፍ ይጠይቁ እና የክሊኒኩን ኃላፊ ያነጋግሩ። መልስ ከሌለ ለጤና ሚኒስቴር "ኮል ሀብሪዩት" ማዕከል — *5400 ቅሬታ ያቅርቡ (*5400 አጠቃላይ የመረጃ እና ቅሬታ መስመር ነው — የትርጉም ማዕከሉ አይደለም)። የትርጉም መብቱ ከሳይኪያትሪስት፣ ሳይኮሎጂስት እና ማህበራዊ ሠራተኛ ጋር ላሉ ቀጠሮዎችም ይሠራል — ከቤተሰብ ሐኪም ብቻ አይደለም።`,
        },
      },
      {
        id: "psychiatric-committee",
        heading: {
          he: "מתורגמן גם בוועדה הפסיכיאטרית — על חשבון המדינה",
          en: "An interpreter at the psychiatric committee too — at the state's expense",
          am: "በሥነ-ልቡና ኮሚቴም አስተርጓሚ — በመንግሥት ወጪ",
        },
        body: {
          he: `אם אתה או קרוב שלך באשפוז פסיכיאטרי והתיק נדון בוועדה פסיכיאטרית — בית המשפט קבע שמטופל שאינו דובר עברית זכאי לתרגום הדיון במימון המדינה. את התרגום אסור להטיל על עורך הדין שלך (הוא צריך לייצג, לא לתרגם). אם לא הוצע תרגום — עורך הדין או אתם רשאים לדרוש אותו מהוועדה. פרטים מלאים על זכויות באשפוז — במדריך הזכויות באשפוז שלנו.`,
          en: `If you or a relative is in psychiatric hospitalization and the case is heard by a psychiatric committee — the court has ruled that a patient who does not speak Hebrew is entitled to state-funded translation of the hearing. Translation may not be imposed on your lawyer (they are there to represent, not translate). If translation is not offered — your lawyer or you may demand it from the committee. Full details on hospitalization rights — in our hospitalization rights guide.`,
          am: `እርስዎ ወይም ዘመድዎ በሥነ-ልቡና ሆስፒታል ውስጥ ከሆኑ እና ጉዳዩ በሥነ-ልቡና ኮሚቴ ከታየ — ዕብራይስጥ የማይናገር ታካሚ የችሎቱን ትርጉም በመንግሥት ወጪ የማግኘት መብት እንዳለው ፍርድ ቤት ወስኗል። ትርጉሙ በጠበቃዎ ላይ ሊጫን አይችልም (እሱ ሊወክል ነው እንጂ ሊተረጉም አይደለም)። ትርጉም ካልቀረበ — ጠበቃዎ ወይም እርስዎ ከኮሚቴው ሊጠይቁት ይችላሉ።`,
        },
      },
      {
        id: "kol-labriut",
        heading: {
          he: '"קול לבריאות" של טנא בריאות — הוותיק שבשירותים',
          en: '"Kol La\'Briut" by Tene Briut — the veteran service',
          am: "የጤና ብሩት «ኮል ለብሪዩት» — አንጋፋው አገልግሎት",
        },
        body: {
          he: `עמותת טנא בריאות — ארגון הבריאות של יוצאי אתיופיה — מפעילה מאז 2007 את שירות המתורגמנות "קול לבריאות" לצוותים רפואיים, בטלפון 04-6331877, 24 שעות ביממה כל השבוע (נכון לאוגוסט 2026, לפי אתר העמותה). המתורגמנים עוברים הכשרה ייעודית לתרגום רפואי ופועלים לפי כללי אתיקה מקצועיים. אם המטפל שלכם לא מכיר את 5144* — אפשר להפנות אותו גם לשירות הזה. אל תתבלבלו בין השמות: "קול לבריאות" (טנא בריאות, תרגום) ו"קול הבריאות" (5400*, מוקד המידע של משרד הבריאות) הם שני שירותים שונים.`,
          en: `Tene Briut — the Ethiopian-Israeli community's health organization — has operated the "Kol La'Briut" interpretation service for medical teams since 2007, at 04-6331877, 24 hours a day, all week (as of August 2026, per the organization's website). The interpreters receive dedicated medical-interpretation training and follow professional ethics. If your clinician doesn't know *5144 — you can point them to this service too. Don't confuse the names: "Kol La'Briut" (Tene Briut, interpretation) and "Kol HaBriut" (*5400, the Ministry of Health information line) are two different services.`,
          am: `ጤና ብሩት — የኢትዮጵያ-እስራኤላውያን ማህበረሰብ የጤና ድርጅት — ከ2007 ጀምሮ ለሕክምና ቡድኖች «ኮል ለብሪዩት» የትርጉም አገልግሎትን ያንቀሳቅሳል፣ በስልክ 04-6331877፣ በቀን 24 ሰዓት፣ በሳምንቱ ሁሉ (እ.ኤ.አ. ነሐሴ 2026፣ በድርጅቱ ድህረ ገጽ መሠረት)። አስተርጓሚዎቹ ልዩ የሕክምና ትርጉም ሥልጠና ያገኛሉ። ሐኪምዎ *5144ን ካላወቀ — ወደዚህ አገልግሎትም ሊመሩት ይችላሉ።`,
        },
      },
    ],
    faqs: [
      {
        id: "cost",
        question: {
          he: "כמה עולה מתורגמן רפואי?",
          en: "How much does a medical interpreter cost?",
          am: "የሕክምና አስተርጓሚ ስንት ያስወጣል?",
        },
        answer: {
          he: "כלום. מוקד התרגום 5144* של משרד הבריאות חינם לחלוטין למטופל, בכל הקופות ובבתי החולים. גם תרגום דיוני הוועדה הפסיכיאטרית — במימון המדינה.",
          en: "Nothing. The Ministry of Health *5144 interpretation center is completely free for the patient, at all health funds and hospitals. Translation of psychiatric committee hearings is also state-funded.",
          am: "ምንም። የጤና ሚኒስቴር *5144 የትርጉም ማዕከል ለታካሚው ሙሉ በሙሉ ነጻ ነው፣ በሁሉም የጤና ድርጅቶች እና ሆስፒታሎች። የሥነ-ልቡና ኮሚቴ ችሎቶች ትርጉምም በመንግሥት ወጪ ነው።",
        },
      },
      {
        id: "who-calls",
        question: {
          he: "אני יכול להתקשר בעצמי ל-5144*?",
          en: "Can I call *5144 myself?",
          am: "እኔ ራሴ ወደ *5144 መደወል እችላለሁ?",
        },
        answer: {
          he: "המוקד בנוי לשיחה שהמטפל יוזם במהלך הפגישה — אתה מבקש, והמטפל מחייג ומצרף את המתורגמן לשיחה. אם המטפל לא מכיר את השירות, הראו לו את העמוד הרשמי באתר משרד הבריאות (מקושר למטה).",
          en: "The center is built for a call the clinician initiates during the appointment — you ask, and the clinician dials and adds the interpreter to the conversation. If the clinician doesn't know the service, show them the official Ministry of Health page (linked below).",
          am: "ማዕከሉ በቀጠሮው ወቅት ሐኪሙ ለሚጀምረው ጥሪ የተዘጋጀ ነው — እርስዎ ይጠይቃሉ፣ ሐኪሙም ደውሎ አስተርጓሚውን ወደ ንግግሩ ይጨምራል። ሐኪሙ አገልግሎቱን ካላወቀ የጤና ሚኒስቴር ኦፊሴላዊ ገጽ ያሳዩት።",
        },
      },
      {
        id: "family-translate",
        question: {
          he: "בן משפחה יכול לתרגם במקום?",
          en: "Can a family member translate instead?",
          am: "የቤተሰብ አባል በምትኩ መተርጎም ይችላል?",
        },
        answer: {
          he: "מותר, אבל בטיפול נפשי זה רעיון רע: קשה לדבר בפתיחות על מצוקה כשהילד או ההורה מתרגם, ופרטים רפואיים הולכים לאיבוד. יש לך זכות למתורגמן מקצועי וניטרלי — השתמש בה. ילדים לא צריכים לשמש מתורגמנים של הוריהם.",
          en: "It's allowed, but in mental-health care it's a bad idea: it is hard to speak openly about distress when your child or parent is translating, and clinical details get lost. You have a right to a professional, neutral interpreter — use it. Children should not serve as their parents' interpreters.",
          am: "ይፈቀዳል፣ ግን በአዕምሮ ጤና ሕክምና መጥፎ ሀሳብ ነው፡ ልጅዎ ወይም ወላጅዎ ሲተረጉም ስለ ጭንቀት በግልጽ መናገር ከባድ ነው፣ የሕክምና ዝርዝሮችም ይጠፋሉ። ሙያዊ እና ገለልተኛ አስተርጓሚ የማግኘት መብት አለዎት — ይጠቀሙበት።",
        },
      },
      {
        id: "refused",
        question: {
          he: "ביקשתי מתורגמן וסירבו לי — מה עושים?",
          en: "I asked for an interpreter and was refused — what now?",
          am: "አስተርጓሚ ጠየቅሁ እና ተከለከልኩ — ምን ማድረግ አለብኝ?",
        },
        answer: {
          he: "בקשו את הסירוב בכתב ופנו לאחראי המרפאה. אם זה לא עוזר — התלוננו במוקד קול הבריאות 5400* של משרד הבריאות או באתר המשרד. סירוב לספק תקשורת מובנת נוגד את חוק זכויות החולה.",
          en: "Ask for the refusal in writing and approach the clinic manager. If that doesn't help — complain to the Ministry of Health Kol HaBriut line *5400 or via the Ministry website. Refusing to provide comprehensible communication violates the Patient Rights Act.",
          am: "እምቢታውን በጽሑፍ ይጠይቁ እና የክሊኒኩን ኃላፊ ያነጋግሩ። ካልረዳ — ለጤና ሚኒስቴር *5400 መስመር ወይም በሚኒስቴሩ ድህረ ገጽ ቅሬታ ያቅርቡ። ግንዛቤ ያለው ግንኙነት አለመስጠት የታካሚ መብቶች ህግን ይጻረራል።",
        },
      },
    ],
    sources: [
      {
        name: "משרד הבריאות — סיוע בתרגום בעל פה ממוקד התרגום הרפואי 5144*",
        url: "https://www.gov.il/he/service/medical-interpretation-center",
      },
      {
        name: 'משרד הבריאות — מוקד "קול הבריאות" 5400*',
        url: "https://www.gov.il/he/service/kol-briut-moked",
      },
      {
        name: 'טנא בריאות — תוכנית "קול לבריאות"',
        url: "https://tene-briut.org.il/%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%95%D7%AA/kol",
      },
      {
        name: "כל-זכות — מטופל זכאי לתרגום מטעם המדינה בדיוני הוועדה הפסיכיאטרית",
        url: "https://www.kolzchut.org.il/he/%D7%9E%D7%98%D7%95%D7%A4%D7%9C_%D7%96%D7%9B%D7%90%D7%99_%D7%9C%D7%AA%D7%A8%D7%92%D7%95%D7%9D_%D7%9E%D7%98%D7%A2%D7%9D_%D7%94%D7%9E%D7%93%D7%99%D7%A0%D7%94_%D7%91%D7%93%D7%99%D7%95%D7%A0%D7%99_%D7%94%D7%95%D7%95%D7%A2%D7%93%D7%94_%D7%94%D7%A4%D7%A1%D7%99%D7%9B%D7%90%D7%98%D7%A8%D7%99%D7%AA_%D7%91%D7%A2%D7%A0%D7%99%D7%99%D7%A0%D7%95",
      },
    ],
    amharicSummary: `የአዕምሮ ጤና ሕክምና ከአስተርጓሚ ጋር — ማጠቃለያ በአማርኛ

1. በሕግ (የታካሚ መብቶች ህግ 1996፣ አንቀጽ 3) ሙያዊ አስተርጓሚ በነጻ የማግኘት መብት አለዎት — በጤና ድርጅቱ (ኩፓት ሆሊም)፣ በአዕምሮ ጤና ክሊኒክ እና በሆስፒታሉ።

2. የጤና ሚኒስቴር የስልክ ትርጉም ማዕከል *5144 በአማርኛ እና ትግርኛ ይሰራል። አማርኛ፡ እሁድ–ሐሙስ 8:00–19:00፣ አርብ 8:00–13:00። የሚደውለው ሐኪሙ ነው — እርስዎ መጠየቅ ብቻ ነው። ነጻ ነው።

3. ቀጠሮ ሲይዙ ይህን ይበሉ፡ "የአማርኛ አስተርጓሚ ያስፈልገኛል — እባክዎ *5144 ይጠቀሙ።"

4. ቢከለክሉ፡ እምቢታውን በጽሑፍ ይጠይቁ፣ ከዚያ ለጤና ሚኒስቴር *5400 ቅሬታ ያቅርቡ።

5. በሥነ-ልቡና ኮሚቴ (ግዳጅ ሆስፒታል ጉዳይ) — የችሎቱ ትርጉም በመንግሥት ወጪ መብትዎ ነው።

6. ጤና ብሩት «ኮል ለብሪዩት» ከ2007 ጀምሮ ለሐኪሞች የትርጉም አገልግሎት ይሰጣል፡ 04-6331877፣ 24/7።

አስቸኳይ የአዕምሮ ቀውስ ካለ — ERAN 1201፣ ነጻ እና ሚስጥራዊ፣ 24/7።`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. זכויות באשפוז פסיכיאטרי — כולל אשפוז כפוי
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "hospitalization-rights",
    legalDisclaimer: true,
    lastReviewed: LAST_REVIEWED,
    sections: [
      {
        id: "who-decides",
        heading: {
          he: "מי בכלל מוסמך להחליט על אשפוז כפוי",
          en: "Who is actually authorized to order involuntary hospitalization",
          am: "ግዳጅ ሆስፒታል ማዘዝ የሚችለው ማን ነው",
        },
        body: {
          he: `אשפוז פסיכיאטרי בישראל הוא כברירת מחדל וולונטרי — אתה מסכים וחותם. אשפוז כפוי מוסדר בחוק טיפול בחולי נפש, התשנ"א-1991, ורק שלושה גורמים מוסמכים להורות עליו:

1. פסיכיאטר מחוזי — עובד מדינה (לא הרופא בקופה ולא בית החולים) שרשאי להוציא הוראת בדיקה כפויה או הוראת אשפוז כפוי, דחופה או לא דחופה.

2. מנהל בית חולים פסיכיאטרי — רשאי לאשפז בכפייה עד 48 שעות בלבד, ורק כשמתקיימים כל התנאים: אדם במצב פסיכוטי, המצב יוצר סכנה לעצמו או לאחרים, הוא מסרב להתאשפז מרצון, והוא כבר נמצא בשטח בית החולים. המשך מעבר ל-48 שעות מחייב הוראת פסיכיאטר מחוזי.

3. בית משפט — בהליכים פליליים, כשמצבו הנפשי של חשוד או נאשם רלוונטי לכשירותו לעמוד לדין.

אף אחד אחר — לא משפחה, לא שכנים, לא משטרה לבדה — לא מוסמך "לאשפז" אדם.`,
          en: `Psychiatric hospitalization in Israel is voluntary by default — you agree and sign. Involuntary hospitalization is regulated by the Treatment of Mental Patients Law, 1991, and only three authorities may order it:

1. The district psychiatrist — a state official (not your health-fund doctor and not the hospital) who may issue an order for compulsory examination or compulsory hospitalization, urgent or non-urgent.

2. A psychiatric hospital director — may admit involuntarily for up to 48 hours only, and only when all conditions hold: the person is in a psychotic state, the state poses danger to self or others, they refuse voluntary admission, and they are already on hospital grounds. Anything beyond 48 hours requires a district psychiatrist's order.

3. A court — in criminal proceedings, when a suspect's or defendant's mental state is relevant to fitness to stand trial.

No one else — not family, not neighbors, not the police alone — is authorized to "hospitalize" a person.`,
          am: `በእስራኤል ሥነ-ልቡናዊ ሆስፒታልነት በነባሪ በፈቃደኝነት ነው — እርስዎ ተስማምተው ይፈርማሉ። ግዳጅ ሆስፒታልነት በአእምሮ ሕሙማን ሕክምና ህግ (1991) የተደነገገ ሲሆን ሦስት አካላት ብቻ ሊያዙት ይችላሉ፡

1. የወረዳ ሳይኪያትሪስት — የመንግሥት ሠራተኛ (የኩፓዎ ሐኪም ወይም ሆስፒታሉ አይደለም) — አስቸኳይ ወይም አስቸኳይ ያልሆነ የግዳጅ ምርመራ ወይም ሆስፒታልነት ትዕዛዝ ሊሰጥ ይችላል።

2. የሥነ-ልቡና ሆስፒታል ዳይሬክተር — እስከ 48 ሰዓት ብቻ፣ ሁሉም ሁኔታዎች ሲሟሉ ብቻ፡ ሰውየው በሳይኮቲክ ሁኔታ ውስጥ ነው፣ ሁኔታው ለራሱ ወይም ለሌሎች አደጋ ይፈጥራል፣ በፈቃደኝነት ለመግባት እምቢ ብሏል፣ እና በሆስፒታሉ ግቢ ውስጥ ይገኛል። ከ48 ሰዓት በላይ የወረዳ ሳይኪያትሪስት ትዕዛዝ ያስፈልጋል።

3. ፍርድ ቤት — በወንጀል ሂደቶች ውስጥ።

ሌላ ማንም — ቤተሰብ፣ ጎረቤቶች፣ ፖሊስ ብቻውን — ሰውን «ማስገባት» አይችልም።`,
        },
      },
      {
        id: "grounds",
        heading: {
          he: "מתי מותר לאשפז בכפייה — התנאים",
          en: "When involuntary hospitalization is allowed — the conditions",
          am: "ግዳጅ ሆስፒታልነት መቼ ይፈቀዳል — ሁኔታዎቹ",
        },
        body: {
          he: `לפי משרד הבריאות, מצבי החירום הפסיכיאטריים שמצדיקים אשפוז כפוי הם: סכנה מיידית לחיי האדם עצמו או לאחרים; אי-יכולת של אדם לדאוג לצרכים הבסיסיים שלו (אכילה, שתייה, שינה); או התנהגות אלימה ומסוכנת כלפי עצמו או אחרים. הבסיס הוא תמיד מצב נפשי שבו כושר השיפוט נפגע — ולא "התנהגות מוזרה" כשלעצמה.

חשוב לקהילה שלנו: קושי בשפה, ביטויי מצוקה תרבותיים (למשל שיח על זאר או רוחות), ואמונות מסורתיות אינם כשלעצמם עילה לאשפוז. הכתבה של ynet (2026) תיעדה מקרים שבהם פערי שפה הובילו לאבחון שגוי ולאשפוזים כפויים מיותרים של בני הקהילה. לכן: בכל בדיקה פסיכיאטרית עומדת לך זכות למתורגמן — דרשו אותה לפני שעונים על שאלות. ראו המדריך שלנו לקבלת טיפול עם מתורגמן.`,
          en: `Per the Ministry of Health, the psychiatric emergencies that justify involuntary hospitalization are: immediate danger to the person's own life or to others; inability to care for one's basic needs (eating, drinking, sleeping); or violent, dangerous behavior toward self or others. The basis is always a mental state in which judgment is impaired — not "strange behavior" as such.

Important for our community: language difficulty, cultural expressions of distress (e.g., talk of Zar or spirits), and traditional beliefs are not in themselves grounds for hospitalization. The ynet investigation (2026) documented cases where language gaps led to misdiagnosis and unnecessary involuntary hospitalizations of community members. Therefore: in every psychiatric evaluation you have the right to an interpreter — demand one before answering questions. See our guide to getting care with an interpreter.`,
          am: `በጤና ሚኒስቴር መሠረት፣ ግዳጅ ሆስፒታልነትን የሚያጸድቁ የሥነ-ልቡና ድንገተኛ ሁኔታዎች፡ ለሰውየው ራሱ ወይም ለሌሎች ሕይወት አፋጣኝ አደጋ፤ መሠረታዊ ፍላጎቶቹን (መብላት፣ መጠጣት፣ መተኛት) መንከባከብ አለመቻል፤ ወይም ለራስ ወይም ለሌሎች አደገኛ ጠበኛ ባህሪ።

ለማህበረሰባችን አስፈላጊ፡ የቋንቋ ችግር፣ ባህላዊ የጭንቀት አገላለጾች (ለምሳሌ ስለ ዛር ወይም መናፍስት ማውራት) እና ባህላዊ እምነቶች በራሳቸው ለሆስፒታልነት ምክንያት አይደሉም። የ ynet ምርመራ (2026) የቋንቋ ክፍተቶች ወደ የተሳሳተ ምርመራ እና አላስፈላጊ ግዳጅ ሆስፒታልነት እንዳመሩ መዝግቧል። ስለዚህ፡ በእያንዳንዱ የሥነ-ልቡና ምርመራ አስተርጓሚ የማግኘት መብት አለዎት — ጥያቄዎችን ከመመለስዎ በፊት ይጠይቁት።`,
        },
      },
      {
        id: "appeal",
        heading: {
          he: "זכות הערר — הוועדה הפסיכיאטרית, ואחריה בית המשפט",
          en: "The right to appeal — the psychiatric committee, then the court",
          am: "የይግባኝ መብት — የሥነ-ልቡና ኮሚቴ፣ ከዚያም ፍርድ ቤት",
        },
        body: {
          he: `על הוראת אשפוז של הפסיכיאטר המחוזי אפשר לערור בפני הוועדה הפסיכיאטרית המחוזית — גוף של שני פסיכיאטרים ומשפטן (שהוא גם יו"ר הוועדה). כל אדם רשאי להגיש את הערר — לא רק המאושפז או קרובו. הוועדה חייבת לדון בערר בתוך 5 ימים לכל היותר.

ההבדל החשוב: בהוראת אשפוז לא דחופה — הגשת ערר מעכבת את האשפוז והטיפול עד ההכרעה. בהוראה דחופה — האשפוז מבוצע מיד והערר נדון במהלכו.

על החלטת הוועדה הפסיכיאטרית אפשר לערער לבית המשפט המחוזי בתוך 45 יום מקבלת ההחלטה. בערעור לבית המשפט רשאים לערער המטופל, קרובו או היועץ המשפטי לממשלה. הבסיס החוקי: סעיפים 12, 13, 29 ו-29א לחוק טיפול בחולי נפש.`,
          en: `A district psychiatrist's hospitalization order can be appealed before the district psychiatric committee — a panel of two psychiatrists and a jurist (who chairs the committee). Any person may file the appeal — not only the patient or a relative. The committee must hear the appeal within 5 days at most.

The important distinction: for a non-urgent hospitalization order — filing an appeal suspends the hospitalization and treatment until the decision. For an urgent order — hospitalization is carried out immediately and the appeal is heard during it.

The psychiatric committee's decision can be appealed to the district court within 45 days of receiving the decision. At the court stage the patient, their relative, or the Attorney General may appeal. Legal basis: sections 12, 13, 29, and 29A of the Treatment of Mental Patients Law.`,
          am: `የወረዳ ሳይኪያትሪስት የሆስፒታልነት ትዕዛዝ በወረዳ ሥነ-ልቡና ኮሚቴ ፊት ይግባኝ ሊባል ይችላል — ሁለት ሳይኪያትሪስቶች እና አንድ የሕግ ባለሙያ (የኮሚቴው ሊቀመንበር) ያሉት አካል። ማንኛውም ሰው ይግባኙን ማቅረብ ይችላል — ታካሚው ወይም ዘመዱ ብቻ አይደለም። ኮሚቴው ቢበዛ በ5 ቀናት ውስጥ ይግባኙን ማየት አለበት።

አስፈላጊው ልዩነት፡ አስቸኳይ ላልሆነ ትዕዛዝ — ይግባኝ ማቅረብ ሆስፒታልነቱን እና ሕክምናውን እስከ ውሳኔው ያግዳል። ለአስቸኳይ ትዕዛዝ — ሆስፒታልነቱ ወዲያውኑ ይፈጸማል፣ ይግባኙም በሂደቱ ወቅት ይታያል።

የኮሚቴውን ውሳኔ ውሳኔው ከደረሰ በ45 ቀናት ውስጥ ወደ አውራጃ ፍርድ ቤት ይግባኝ ማለት ይቻላል። የሕግ መሠረት፡ የአእምሮ ሕሙማን ሕክምና ህግ አንቀጽ 12፣ 13፣ 29 እና 29ሀ።`,
        },
      },
      {
        id: "free-legal-aid",
        heading: {
          he: "ייצוג משפטי — חינם, מהמדינה, בלי לבקש טובות",
          en: "Legal representation — free, from the state, no favors needed",
          am: "የሕግ ውክልና — ነጻ፣ ከመንግሥት",
        },
        body: {
          he: `כל מי שמאושפז בכפייה או מקבל טיפול מרפאתי כפוי זכאי לייצוג משפטי מטעם המדינה, בחינם — באמצעות הסיוע המשפטי של משרד המשפטים. עורך הדין מייצג אתכם בדיוני הוועדה הפסיכיאטרית ובערעורים לבית המשפט. הזכות קבועה בחוק (סעיף 29א לחוק טיפול בחולי נפש).

בפועל: בבית החולים חייבים ליידע אתכם על הזכות. אפשר גם לפנות ישירות למחוז הסיוע המשפטי הקרוב או דרך אתר משרד המשפטים. אם אינכם דוברים עברית — זכרו שגם בדיוני הוועדה עומדת לכם זכות לתרגום במימון המדינה, ואסור שהתרגום ייפול על עורך הדין שלכם.`,
          en: `Anyone hospitalized involuntarily or under a compulsory outpatient-treatment order is entitled to state-provided legal representation, free of charge — through the Legal Aid administration of the Ministry of Justice. The lawyer represents you in psychiatric committee hearings and in court appeals. The right is set in law (section 29A of the Treatment of Mental Patients Law).

In practice: the hospital must inform you of this right. You can also approach the nearest Legal Aid district directly or via the Ministry of Justice website. If you do not speak Hebrew — remember that in committee hearings you also have a right to state-funded translation, and translation must not fall on your lawyer.`,
          am: `በግዳጅ ሆስፒታል የገባ ወይም የግዳጅ ክሊኒክ ሕክምና የሚያገኝ ማንኛውም ሰው ከመንግሥት በነጻ የሕግ ውክልና የማግኘት መብት አለው — በፍትህ ሚኒስቴር የሕግ ድጋፍ አስተዳደር በኩል። ጠበቃው በሥነ-ልቡና ኮሚቴ ችሎቶች እና በፍርድ ቤት ይግባኞች ይወክልዎታል። መብቱ በሕግ ተቀምጧል (አንቀጽ 29ሀ)።

በተግባር፡ ሆስፒታሉ ስለዚህ መብት ማሳወቅ አለበት። እንዲሁም ወደ ቅርብ የሕግ ድጋፍ ወረዳ በቀጥታ ወይም በፍትህ ሚኒስቴር ድህረ ገጽ መቅረብ ይችላሉ። ዕብራይስጥ ካልተናገሩ — በኮሚቴ ችሎቶችም በመንግሥት ወጪ የትርጉም መብት እንዳለዎት ያስታውሱ።`,
        },
      },
      {
        id: "rights-during",
        heading: {
          he: "הזכויות שלך בתוך האשפוז",
          en: "Your rights during hospitalization",
          am: "በሆስፒታል ቆይታ ወቅት ያሉ መብቶችዎ",
        },
        body: {
          he: `גם באשפוז כפוי אתה לא מאבד את זכויותיך: הזכות לדעת מדוע אושפזת ומכוח איזו הוראה; הזכות לקשר עם משפחה ועם עורך דין; הזכות שהתיק שלך ייבחן תקופתית בוועדה הפסיכיאטרית; הזכות לתרגום דיוני הוועדה במימון המדינה; והזכויות הכלליות מחוק זכויות החולה — כבוד, פרטיות וקבלת מידע בשפה מובנת.

טיפ מעשי למשפחות: רשמו הכל — תאריכים, שמות, מה נאמר ובאיזו שפה, האם היה מתורגמן. תיעוד כזה הוא הבסיס לערר אפקטיבי. ואל תחתמו על מסמכים שלא הבנתם — בקשו תרגום קודם.`,
          en: `Even in involuntary hospitalization you do not lose your rights: the right to know why you were hospitalized and under which order; the right to contact family and a lawyer; the right to periodic review of your case by the psychiatric committee; the right to state-funded translation of committee hearings; and the general rights under the Patient Rights Act — dignity, privacy, and receiving information in a language you understand.

A practical tip for families: write everything down — dates, names, what was said and in which language, whether an interpreter was present. Such documentation is the basis of an effective appeal. And do not sign documents you did not understand — ask for translation first.`,
          am: `በግዳጅ ሆስፒታልነትም መብቶችዎን አያጡም፡ ለምን እንደገቡ እና በየትኛው ትዕዛዝ ማወቅ፤ ከቤተሰብ እና ከጠበቃ ጋር መገናኘት፤ ጉዳይዎ በሥነ-ልቡና ኮሚቴ በየጊዜው መታየት፤ የኮሚቴ ችሎቶች ትርጉም በመንግሥት ወጪ፤ እና በታካሚ መብቶች ህግ ያሉት አጠቃላይ መብቶች — ክብር፣ ግላዊነት እና በሚረዱት ቋንቋ መረጃ ማግኘት።

ለቤተሰቦች ተግባራዊ ምክር፡ ሁሉንም ይመዝግቡ — ቀናት፣ ስሞች፣ ምን እንደተባለ እና በየትኛው ቋንቋ፣ አስተርጓሚ ነበር ወይ። ያልተረዱትን ሰነድ አይፈርሙ — መጀመሪያ ትርጉም ይጠይቁ።`,
        },
      },
    ],
    faqs: [
      {
        id: "how-long",
        question: {
          he: "כמה זמן אפשר להחזיק אדם באשפוז כפוי?",
          en: "How long can a person be held in involuntary hospitalization?",
          am: "ሰው በግዳጅ ሆስፒታል ስንት ጊዜ ሊቆይ ይችላል?",
        },
        answer: {
          he: "מנהל בית חולים — עד 48 שעות בלבד. מעבר לכך נדרשת הוראת פסיכיאטר מחוזי, והמשך האשפוז כפוף לביקורת תקופתית של הוועדה הפסיכיאטרית. הפרטים המלאים בעמוד משרד הבריאות המקושר למטה.",
          en: "A hospital director — up to 48 hours only. Beyond that a district psychiatrist's order is required, and continued hospitalization is subject to periodic review by the psychiatric committee. Full details on the Ministry of Health page linked below.",
          am: "የሆስፒታል ዳይሬክተር — እስከ 48 ሰዓት ብቻ። ከዚያ በላይ የወረዳ ሳይኪያትሪስት ትዕዛዝ ያስፈልጋል፣ ቀጣይ ቆይታውም በሥነ-ልቡና ኮሚቴ በየጊዜው ይገመገማል።",
        },
      },
      {
        id: "who-appeals",
        question: {
          he: "מי יכול להגיש ערר על אשפוז כפוי?",
          en: "Who can appeal an involuntary hospitalization?",
          am: "በግዳጅ ሆስፒታልነት ላይ ይግባኝ ማን ማቅረብ ይችላል?",
        },
        answer: {
          he: "כל אדם — המאושפז עצמו, בן משפחה, חבר, או כל מי שאכפת לו. הערר מוגש לוועדה הפסיכיאטרית המחוזית, והיא חייבת לדון בו בתוך 5 ימים.",
          en: "Any person — the patient, a family member, a friend, or anyone who cares. The appeal goes to the district psychiatric committee, which must hear it within 5 days.",
          am: "ማንኛውም ሰው — ታካሚው ራሱ፣ የቤተሰብ አባል፣ ጓደኛ። ይግባኙ ለወረዳ ሥነ-ልቡና ኮሚቴ ይቀርባል፣ በ5 ቀናት ውስጥ መታየት አለበት።",
        },
      },
      {
        id: "lawyer-cost",
        question: {
          he: "כמה עולה עורך הדין בוועדה הפסיכיאטרית?",
          en: "How much does the lawyer at the psychiatric committee cost?",
          am: "በሥነ-ልቡና ኮሚቴ ያለው ጠበቃ ስንት ያስወጣል?",
        },
        answer: {
          he: "כלום. הייצוג בוועדות פסיכיאטריות ובערעורים ניתן חינם על-ידי הסיוע המשפטי של משרד המשפטים, מכוח סעיף 29א לחוק. בית החולים חייב ליידע אתכם על כך.",
          en: "Nothing. Representation at psychiatric committees and appeals is provided free by the Ministry of Justice Legal Aid, under section 29A of the law. The hospital must inform you of this.",
          am: "ምንም። በሥነ-ልቡና ኮሚቴዎች እና ይግባኞች ውክልና በፍትህ ሚኒስቴር የሕግ ድጋፍ በነጻ ይሰጣል። ሆስፒታሉ ስለዚህ ማሳወቅ አለበት።",
        },
      },
      {
        id: "no-hebrew",
        question: {
          he: "קרוב משפחה שלי אושפז והוא לא דובר עברית — מה הכי דחוף לעשות?",
          en: "My relative was hospitalized and doesn't speak Hebrew — what's most urgent?",
          am: "ዘመዴ ሆስፒታል ገብቷል፣ ዕብራይስጥም አይናገርም — በጣም አስቸኳዩ ምንድን ነው?",
        },
        answer: {
          he: "שלושה צעדים: (1) ודאו שהוקצה לו עורך דין מהסיוע המשפטי — זו זכות אוטומטית; (2) דרשו מתורגמן לכל בדיקה ולדיוני הוועדה — במימון המדינה; (3) אם אתם סבורים שאין עילה — הגישו ערר לוועדה הפסיכיאטרית (כל אדם רשאי, הדיון בתוך 5 ימים).",
          en: "Three steps: (1) make sure a Legal Aid lawyer has been assigned — it's an automatic right; (2) demand an interpreter for every evaluation and for committee hearings — state-funded; (3) if you believe there are no grounds — file an appeal with the psychiatric committee (anyone may, heard within 5 days).",
          am: "ሦስት እርምጃዎች፡ (1) የሕግ ድጋፍ ጠበቃ መመደቡን ያረጋግጡ — አውቶማቲክ መብት ነው፤ (2) ለእያንዳንዱ ምርመራ እና ለኮሚቴ ችሎቶች አስተርጓሚ ይጠይቁ — በመንግሥት ወጪ፤ (3) ምክንያት የለም ብለው ካመኑ — ለሥነ-ልቡና ኮሚቴ ይግባኝ ያቅርቡ።",
        },
      },
    ],
    sources: [
      {
        name: "משרד הבריאות — אשפוז וטיפול פסיכיאטרי כפוי בבוגרים",
        url: "https://www.gov.il/he/service/involuntary-psychiatric-hospitalization",
      },
      {
        name: 'משרד הבריאות ("בנפש בריאה") — אשפוז כפוי: מצב חירום פסיכיאטרי',
        url: "https://me.health.gov.il/mental-health/therapy-rehabilitation/public-care/psychiatric-hospitalization/involuntary-hospitalization/psychiatric-emergency/",
      },
      {
        name: "כל-זכות — ערעור על אשפוז פסיכיאטרי כפוי",
        url: "https://www.kolzchut.org.il/he/%D7%A2%D7%A8%D7%A2%D7%95%D7%A8_%D7%A2%D7%9C_%D7%90%D7%A9%D7%A4%D7%95%D7%96_%D7%A4%D7%A1%D7%99%D7%9B%D7%99%D7%90%D7%98%D7%A8%D7%99_%D7%9B%D7%A4%D7%95%D7%99",
      },
      {
        name: "כל-זכות — אשפוז כפוי דחוף של מתמודדי נפש",
        url: "https://www.kolzchut.org.il/he/%D7%90%D7%A9%D7%A4%D7%95%D7%96_%D7%9B%D7%A4%D7%95%D7%99_%D7%93%D7%97%D7%95%D7%A3_%D7%A9%D7%9C_%D7%9E%D7%AA%D7%9E%D7%95%D7%93%D7%93%D7%99_%D7%A0%D7%A4%D7%A9",
      },
    ],
    amharicSummary: `በሥነ-ልቡና ሆስፒታልነት ያሉ መብቶች — ማጠቃለያ በአማርኛ

1. ግዳጅ ሆስፒታልነት ማዘዝ የሚችሉት፡ የወረዳ ሳይኪያትሪስት፣ የሆስፒታል ዳይሬክተር (እስከ 48 ሰዓት ብቻ)፣ ወይም ፍርድ ቤት። ሌላ ማንም አይችልም።

2. ምክንያቶቹ፡ ለራስ ወይም ለሌሎች አፋጣኝ አደጋ፣ ወይም መሠረታዊ ፍላጎቶችን መንከባከብ አለመቻል። የቋንቋ ችግር እና ባህላዊ እምነቶች በራሳቸው ምክንያት አይደሉም።

3. ይግባኝ፡ ማንኛውም ሰው ለወረዳ ሥነ-ልቡና ኮሚቴ ይግባኝ ማቅረብ ይችላል — በ5 ቀናት ውስጥ ይታያል። የኮሚቴውን ውሳኔ በ45 ቀናት ውስጥ ወደ አውራጃ ፍርድ ቤት ይግባኝ ማለት ይቻላል።

4. ጠበቃ፡ ከመንግሥት (የፍትህ ሚኒስቴር የሕግ ድጋፍ) በነጻ — አውቶማቲክ መብት።

5. አስተርጓሚ፡ በምርመራ እና በኮሚቴ ችሎቶች — በመንግሥት ወጪ መብትዎ ነው። ያልተረዱትን ሰነድ አይፈርሙ።

ማስታወሻ፡ ይህ መረጃ ብቻ ነው — የሕግ ምክር አይደለም።`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. מדריך טיפול רגיש-תרבות
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "culturally-competent-care",
    legalDisclaimer: false,
    lastReviewed: LAST_REVIEWED,
    sections: [
      {
        id: "what-it-is",
        heading: {
          he: "מה זה בכלל טיפול רגיש-תרבות",
          en: "What culturally-competent care actually is",
          am: "ባህል-ተኮር ሕክምና ምንድን ነው",
        },
        body: {
          he: `טיפול רגיש-תרבות הוא לא "מטפל נחמד". זה מטפל שמבין שמצוקה נפשית מתבטאת אחרת בתרבויות שונות: שבקהילה האתיופית מצוקה מסופרת לא פעם דרך הגוף (כאבי ראש, כאבי בטן, עייפות) ולא במילים כמו "דיכאון"; שאמונות על זאר ורוחות הן שפה תרבותית לתיאור סבל — לא הזיה פסיכוטית; ושיש היסטוריה של הגירה, תלישות ואפליה שמעצבת את חוויית המטופל.

מטפל כזה שואל, לא מניח. הוא עובד עם מתורגמן כשצריך, מכבד את המשפחה והקהילה כמשאב, ולא ממהר לתייג. ההבדל בין מטפל כזה למטפל רגיל יכול להיות ההבדל בין אבחון נכון לאשפוז מיותר.`,
          en: `Culturally-competent care is not "a nice therapist." It's a clinician who understands that psychological distress is expressed differently across cultures: that in the Ethiopian community distress is often told through the body (headaches, stomach aches, fatigue) rather than in words like "depression"; that beliefs about Zar and spirits are a cultural language for describing suffering — not psychotic hallucination; and that a history of migration, uprooting, and discrimination shapes the patient's experience.

Such a clinician asks rather than assumes, works with an interpreter when needed, respects family and community as a resource, and does not rush to label. The difference between such a clinician and an ordinary one can be the difference between a correct diagnosis and an unnecessary hospitalization.`,
          am: `ባህል-ተኮር ሕክምና «ጥሩ ሐኪም» ማለት ብቻ አይደለም። የአዕምሮ ጭንቀት በተለያዩ ባህሎች በተለያየ መንገድ እንደሚገለጽ የሚረዳ ሐኪም ነው፡ በኢትዮጵያ ማህበረሰብ ጭንቀት ብዙ ጊዜ በሰውነት (ራስ ምታት፣ የሆድ ህመም፣ ድካም) እንጂ እንደ «ዲፕሬሽን» ባሉ ቃላት አይነገርም፤ ስለ ዛር እና መናፍስት ያሉ እምነቶች ስቃይን ለመግለጽ ባህላዊ ቋንቋ ናቸው — የሳይኮቲክ ቅዠት አይደሉም፤ የስደት፣ የመነቀል እና የመድልዎ ታሪክም የታካሚውን ተሞክሮ ይቀርጻል።

እንደዚህ ያለ ሐኪም ይጠይቃል እንጂ አይገምትም። ትክክለኛ ምርመራ እና አላስፈላጊ ሆስፒታልነት መካከል ያለው ልዩነት ሊሆን ይችላል።`,
        },
      },
      {
        id: "why-critical",
        heading: {
          he: "למה זה קריטי — המספרים מדברים",
          en: "Why it's critical — the numbers speak",
          am: "ለምን ወሳኝ ነው — ቁጥሮቹ ይናገራሉ",
        },
        body: {
          he: `נכון לתחקיר ynet מ-2026: 637 ילידי אתיופיה ובני הדור השני מאושפזים במוסדות פסיכיאטריים — שיעור של יותר מפי שניים מחלקם באוכלוסייה. ובמערכת הציבורית — אפס פסיכיאטרים ואפס פסיכולוגים דוברי אמהרית או טיגרינית (שתי פסיכולוגיות דוברות אמהרית נמצאות בהכשרה קלינית). התחקיר תיעד מקרים של אבחון שגוי — כולל נער שאושפז בכפייה חודשים אחרי שעלה, בלי שהבין את השפה, ושוחרר בהמשך והתגייס לצנחנים.

המשמעות המעשית: כשאין שפה משותפת ואין הבנה תרבותית, הסיכון לאבחון שגוי עולה. לכן שני הכלים החשובים ביותר שלך הם מתורגמן מקצועי (זכות חוקית — ראו המדריך שלנו) ומטפל שמכיר את ההקשר התרבותי.`,
          en: `As of the 2026 ynet investigation: 637 Ethiopian-born and second-generation Israelis are hospitalized in psychiatric institutions — a rate more than double the community's share of the population. And in the public system — zero psychiatrists and zero psychologists fluent in Amharic or Tigrinya (two Amharic-speaking psychologists are in clinical training). The investigation documented misdiagnosis cases — including a teenager involuntarily hospitalized months after immigrating, without understanding the language, who was later discharged and went on to serve in the paratroopers.

The practical meaning: without a shared language and cultural understanding, the risk of misdiagnosis rises. Your two most important tools are therefore a professional interpreter (a legal right — see our guide) and a clinician who knows the cultural context.`,
          am: `በ2026 የ ynet ምርመራ መሠረት፡ 637 በኢትዮጵያ የተወለዱ እና የሁለተኛ ትውልድ እስራኤላውያን በሥነ-ልቡና ተቋማት ውስጥ ናቸው — ከሕዝብ ድርሻቸው ከሁለት እጥፍ በላይ። በሕዝብ ሥርዓቱ ውስጥ — አማርኛ ወይም ትግርኛ አቀላጥፈው የሚናገሩ ዜሮ ሳይኪያትሪስቶች እና ዜሮ ሳይኮሎጂስቶች (ሁለት አማርኛ ተናጋሪ ሳይኮሎጂስቶች በክሊኒካዊ ሥልጠና ላይ ናቸው)። ምርመራው የተሳሳተ ምርመራ ጉዳዮችን መዝግቧል።

ተግባራዊ ትርጉሙ፡ የጋራ ቋንቋ እና ባህላዊ ግንዛቤ ከሌለ የተሳሳተ ምርመራ አደጋ ይጨምራል። ሁለቱ በጣም አስፈላጊ መሣሪያዎችዎ፡ ሙያዊ አስተርጓሚ (ሕጋዊ መብት) እና ባህላዊውን ሁኔታ የሚያውቅ ሐኪም ናቸው።`,
        },
      },
      {
        id: "questions-to-ask",
        heading: {
          he: "שאלות שמותר — וכדאי — לשאול מטפל חדש",
          en: "Questions you may — and should — ask a new clinician",
          am: "አዲስ ሐኪምን መጠየቅ የሚገባዎት ጥያቄዎች",
        },
        body: {
          he: `אתה מראיין את המטפל לא פחות משהוא מראיין אותך. שאלות לגיטימיות לגמרי:

1. "טיפלת בעבר במטופלים יוצאי אתיופיה?" — ניסיון קודם חשוב.
2. "אתה עובד עם מוקד התרגום 5144* או עם מתורגמן?" — מטפל טוב יגיד כן בלי להתגונן.
3. "איך אתה מתייחס לאמונות רוחניות או מסורתיות של מטופלים?" — התשובה הנכונה היא כבוד וסקרנות, לא ביטול.
4. "אפשר לשתף בטיפול גם את המשפחה / איש דת / גורם קהילתי?" — גמישות היא סימן טוב.
5. "מה הניסיון שלך עם טראומת הגירה?" — רלוונטי במיוחד לדור העולים.

מטפל שנפגע מהשאלות האלה — כנראה לא המטפל הנכון. מטפל שעונה בכנות, גם אם התשובה היא "אין לי ניסיון אבל אשמח ללמוד" — שווה לתת לו הזדמנות.`,
          en: `You are interviewing the clinician no less than they are interviewing you. Entirely legitimate questions:

1. "Have you treated Ethiopian-Israeli patients before?" — prior experience matters.
2. "Do you work with the *5144 interpretation center or an interpreter?" — a good clinician says yes without getting defensive.
3. "How do you relate to patients' spiritual or traditional beliefs?" — the right answer is respect and curiosity, not dismissal.
4. "Can family / a religious figure / a community figure be involved in the care?" — flexibility is a good sign.
5. "What is your experience with migration trauma?" — especially relevant for the immigrant generation.

A clinician offended by these questions is probably not the right clinician. One who answers honestly — even "I lack experience but would be glad to learn" — deserves a chance.`,
          am: `እሱ እርስዎን እንደሚመረምር ሁሉ እርስዎም ሐኪሙን እየመረመሩ ነው። ሙሉ በሙሉ ተገቢ ጥያቄዎች፡

1. «ከዚህ በፊት ኢትዮጵያዊ-እስራኤላዊ ታካሚዎችን አክመዋል?»
2. «ከ*5144 የትርጉም ማዕከል ወይም ከአስተርጓሚ ጋር ይሰራሉ?»
3. «የታካሚዎችን መንፈሳዊ ወይም ባህላዊ እምነቶች እንዴት ያዩታል?» — ትክክለኛው መልስ ክብር እና ጉጉት ነው።
4. «ቤተሰብ / የሃይማኖት ሰው / የማህበረሰብ አካል በሕክምናው ሊሳተፍ ይችላል?»
5. «ከስደት ጉዳት (trauma) ጋር ያለዎት ልምድ ምንድን ነው?»

በእነዚህ ጥያቄዎች የሚከፋ ሐኪም — ትክክለኛው ሐኪም ላይሆን ይችላል።`,
        },
      },
      {
        id: "where-to-find",
        heading: {
          he: "איפה מוצאים היום מענה מותאם — שירותים מאומתים",
          en: "Where to find culturally-adapted help today — verified services",
          am: "ዛሬ ተስማሚ ዕርዳታ የት ይገኛል — የተረጋገጡ አገልግሎቶች",
        },
        body: {
          he: `אלה השירותים שאימתנו (נכון לאוגוסט 2026):

טנא בריאות — ארגון הבריאות של הקהילה מאז שנות ה-90. מפעיל את שירות התרגום "קול לבריאות" (04-6331877, 24/7) ותוכניות גישור תרבותי בין הקהילה למערכת הבריאות.

מוקד התרגום הרפואי של משרד הבריאות 5144* — מתורגמנים מקצועיים באמהרית ובטיגרינית לכל פגישה רפואית, כולל בריאות הנפש. חינם.

ער"ן 1201 — קו החירום הנפשי הארצי, 24/7, אנונימי וחינם.

אנשי מקצוע דוברי אמהרית — במאגר שלנו תמצאו אנשי מקצוע מהקהילה, כולל בתחומי הרווחה והטיפול. המאגר גדל כל הזמן — ואם אתם אנשי מקצוע, הצטרפו אליו.

בנוסף, משרד הבריאות דיווח (בתגובה לתחקיר ynet) על הכשרות תרבותיות לצוותים בבתי חולים פסיכיאטריים ועל שילוב שישה עובדים סוציאליים ילידי אתיופיה במרכזי בריאות נפש.`,
          en: `These are the services we verified (as of August 2026):

Tene Briut — the community's health organization since the 1990s. Operates the "Kol La'Briut" interpretation service (04-6331877, 24/7) and cultural-mediation programs between the community and the health system.

The Ministry of Health medical interpretation center *5144 — professional Amharic and Tigrinya interpreters for any medical appointment, including mental health. Free.

ERAN 1201 — the national emotional crisis line, 24/7, anonymous and free.

Amharic-speaking professionals — our directory lists professionals from the community, including welfare and care fields. It grows all the time — and if you are a professional, join it.

Additionally, the Ministry of Health reported (in response to the ynet investigation) cultural training for psychiatric hospital staff and the integration of six Ethiopian-born social workers into mental-health centers.`,
          am: `እነዚህ ያረጋገጥናቸው አገልግሎቶች ናቸው (እ.ኤ.አ. ነሐሴ 2026)፡

ጤና ብሩት — ከ1990ዎቹ ጀምሮ የማህበረሰቡ የጤና ድርጅት። የ«ኮል ለብሪዩት» የትርጉም አገልግሎት (04-6331877፣ 24/7) እና የባህል ሽምግልና ፕሮግራሞችን ያንቀሳቅሳል።

የጤና ሚኒስቴር የሕክምና ትርጉም ማዕከል *5144 — በአማርኛ እና ትግርኛ ሙያዊ አስተርጓሚዎች፣ የአዕምሮ ጤናን ጨምሮ። ነጻ።

ERAN 1201 — ብሔራዊ የስሜት ቀውስ መስመር፣ 24/7፣ ስም-አልባ እና ነጻ።

አማርኛ ተናጋሪ ባለሙያዎች — በእኛ ማውጫ ውስጥ ከማህበረሰቡ የመጡ ባለሙያዎችን ያገኛሉ።`,
        },
      },
      {
        id: "traditional-and-clinical",
        heading: {
          he: "מסורת וטיפול קליני — לא חייבים לבחור",
          en: "Tradition and clinical care — you don't have to choose",
          am: "ባህል እና ክሊኒካዊ ሕክምና — መምረጥ የለብዎትም",
        },
        body: {
          he: `הרבה בני קהילה חיים בשני העולמות: גם תפילה, ברכת קס או טקס מסורתי — וגם צורך בעזרה מקצועית. שני הדברים יכולים להתקיים יחד, ומטפל רגיש-תרבות לא ידרוש מכם לוותר על העולם המסורתי. מה שחשוב: כשהמצוקה מתמשכת, פוגעת בתפקוד או כוללת מחשבות אובדניות — פנייה למרפא מסורתי בלבד עלולה לעכב טיפול שמציל חיים. עוד על היחס בין רפואה מסורתית למערכת — במדריך הרפואה המסורתית שלנו.`,
          en: `Many community members live in both worlds: prayer, a Qes's blessing, or a traditional ceremony — alongside a need for professional help. Both can coexist, and a culturally-competent clinician will not demand you give up the traditional world. What matters: when distress persists, impairs functioning, or includes suicidal thoughts — turning to a traditional healer alone may delay life-saving care. More on how traditional medicine and the health system relate — in our traditional medicine guide.`,
          am: `ብዙ የማህበረሰብ አባላት በሁለቱም ዓለማት ይኖራሉ፡ ጸሎት፣ የቄስ ቡራኬ ወይም ባህላዊ ሥርዓት — እንዲሁም ሙያዊ ዕርዳታ ፍላጎት። ሁለቱም አብረው ሊኖሩ ይችላሉ፣ ባህል-ተኮር ሐኪምም ባህላዊውን ዓለም እንዲተዉ አይጠይቅም። አስፈላጊው ነገር፡ ጭንቀቱ ሲቀጥል፣ ተግባርን ሲጎዳ ወይም ራስን የማጥፋት ሀሳቦችን ሲያካትት — ወደ ባህላዊ ፈዋሽ ብቻ መሄድ ሕይወት የሚያድን ሕክምናን ሊያዘገይ ይችላል።`,
        },
      },
    ],
    faqs: [
      {
        id: "amharic-therapist-exists",
        question: {
          he: "יש בכלל פסיכולוג דובר אמהרית במערכת הציבורית?",
          en: "Is there any Amharic-speaking psychologist in the public system?",
          am: "በሕዝብ ሥርዓቱ ውስጥ አማርኛ ተናጋሪ ሳይኮሎጂስት አለ?",
        },
        answer: {
          he: "נכון לתחקיר ynet מ-2026 — לא. אין במערכת הציבורית פסיכיאטרים או פסיכולוגים דוברי אמהרית או טיגרינית, ושתי פסיכולוגיות דוברות אמהרית בהכשרה קלינית. בינתיים הפתרון הוא מטפל + מתורגמן מקצועי (5144*), ועובדים סוציאליים ומגשרים מהקהילה.",
          en: "As of the 2026 ynet investigation — no. The public system has no Amharic- or Tigrinya-fluent psychiatrists or psychologists, and two Amharic-speaking psychologists are in clinical training. For now the solution is a clinician + professional interpreter (*5144), plus community social workers and mediators.",
          am: "በ2026 የ ynet ምርመራ መሠረት — የለም። ሁለት አማርኛ ተናጋሪ ሳይኮሎጂስቶች በሥልጠና ላይ ናቸው። ለአሁን መፍትሔው ሐኪም + ሙያዊ አስተርጓሚ (*5144) እና ከማህበረሰቡ የመጡ ማህበራዊ ሠራተኞች ናቸው።",
        },
      },
      {
        id: "switch-therapist",
        question: {
          he: "המטפל שלי מבטל את הרקע התרבותי שלי — מותר להחליף?",
          en: "My clinician dismisses my cultural background — can I switch?",
          am: "ሐኪሜ ባህላዊ ዳራዬን ያቃልላል — መቀየር እችላለሁ?",
        },
        answer: {
          he: "כן. הבחירה במטפל היא שלך, ובקופות החולים מותר לבקש מעבר למטפל אחר. חוות דעת שנייה היא זכות לפי חוק זכויות החולה. מטפל שמבטל את מה שחשוב לך — פוגע בטיפול עצמו.",
          en: "Yes. The choice of clinician is yours, and health funds allow requesting a different one. A second opinion is a right under the Patient Rights Act. A clinician who dismisses what matters to you is undermining the care itself.",
          am: "አዎ። የሐኪም ምርጫ የእርስዎ ነው፣ በጤና ድርጅቶችም ሌላ ሐኪም መጠየቅ ይፈቀዳል። ሁለተኛ አስተያየት በታካሚ መብቶች ህግ መብት ነው።",
        },
      },
      {
        id: "help-parent",
        question: {
          he: "איך עוזרים להורה מבוגר שמסרב לשמוע על 'פסיכולוג'?",
          en: "How do I help an older parent who refuses to hear about a 'psychologist'?",
          am: "ስለ «ሳይኮሎጂስት» መስማት የማይፈልግ አዛውንት ወላጅን እንዴት እረዳለሁ?",
        },
        answer: {
          he: "התחילו מרופא המשפחה — פנייה 'לרופא' נושאת פחות סטיגמה, והרופא יכול להפנות הלאה. בקשו מראש מתורגמן (5144*) כדי שההורה ידבר בשפתו. אפשר גם להיעזר בטנא בריאות בגישור. ואם יש מצוקה חריפה — ער\"ן 1201 זמין גם באנונימיות מלאה.",
          en: "Start with the family doctor — seeing 'a doctor' carries less stigma, and the doctor can refer onward. Ask in advance for an interpreter (*5144) so your parent can speak their own language. Tene Briut can help mediate. And in acute distress — ERAN 1201 is available fully anonymously.",
          am: "ከቤተሰብ ሐኪም ይጀምሩ — «ሐኪም» ማየት ያነሰ መገለል አለው፣ ሐኪሙም ወደ ፊት ሊመራ ይችላል። ወላጅዎ በራሱ ቋንቋ እንዲናገር አስቀድመው አስተርጓሚ (*5144) ይጠይቁ። ጤና ብሩት በሽምግልና ሊረዳ ይችላል። አጣዳፊ ጭንቀት ካለ — ERAN 1201።",
        },
      },
    ],
    sources: [
      {
        name: "ynet — תחקיר בריאות הנפש בקרב יוצאי אתיופיה (2026)",
        url: "https://www.ynet.co.il/health/article/5076330",
      },
      {
        name: "טנא בריאות — הארגון לקידום בריאות יוצאי אתיופיה",
        url: "https://tene-briut.org.il",
      },
      {
        name: "משרד הבריאות — מוקד התרגום הרפואי 5144*",
        url: "https://www.gov.il/he/service/medical-interpretation-center",
      },
      {
        name: 'ער"ן — עזרה ראשונה נפשית 1201',
        url: "https://www.eran.org.il",
      },
    ],
    amharicSummary: `ባህል-ተኮር የአዕምሮ ጤና ሕክምና — ማጠቃለያ በአማርኛ

1. ባህል-ተኮር ሐኪም፡ ጭንቀት በባህሎች መካከል በተለያየ መንገድ እንደሚገለጽ ይረዳል፣ ይጠይቃል እንጂ አይገምትም፣ ከአስተርጓሚ ጋር ይሰራል።

2. ለምን አስፈላጊ ነው፡ 637 የማህበረሰብ አባላት በሥነ-ልቡና ተቋማት — ከሕዝብ ድርሻ ከሁለት እጥፍ በላይ፤ በሕዝብ ሥርዓቱ አማርኛ ተናጋሪ ሳይኪያትሪስት ወይም ሳይኮሎጂስት የለም (ynet 2026)።

3. ሐኪም ሲመርጡ ይጠይቁ፡ ከኢትዮጵያውያን ጋር ልምድ አለዎት? ከአስተርጓሚ ጋር ይሰራሉ? ባህላዊ እምነቶችን እንዴት ያዩታል?

4. የተረጋገጡ አገልግሎቶች፡ ጤና ብሩት (04-6331877)፣ የትርጉም ማዕከል *5144፣ ERAN 1201፣ እና የአማርኛ ተናጋሪ ባለሙያዎች ማውጫችን።

5. ባህል እና ሕክምና አብረው ሊኖሩ ይችላሉ — ግን ከባድ ጭንቀት ሲኖር ሙያዊ ዕርዳታ አይዘግዩ።`,
  },
];

// ── helpers ────────────────────────────────────────────────────────────────

export function mentalHealthAccessPageBySlug(
  slug: string,
): MentalHealthAccessPage | undefined {
  return MENTAL_HEALTH_ACCESS_PAGES.find((p) => p.slug === slug);
}

type LocaleKey = "he" | "en" | "am";

/** Localised text with HE fallback (CLAUDE.md: HE is source-of-truth). */
export function localizeAccessText(text: Translatable, locale: LocaleKey): string {
  return text[locale] ?? text.he;
}
