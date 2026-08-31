// Learning Amharic — hub + Hebrew-ulpan guide (TED-147).
//
// Two surfaces:
//   /education/amharic        the hub: why, the fidel, family phrases, where to study
//   /education/amharic/ulpan  Hebrew ulpan for adult olim, and what to ask about Amharic
//
// ── Demand ────────────────────────────────────────────────────────────────
// Identity-driven and documented (`docs/seo/keywords.md` §10): second- and
// third-generation Ethiopian-Israelis who grew up refusing Amharic and now
// want it back, and parents who want to be understood by their own children.
// Supply is scattered and unindexed; nothing in Hebrew gathers it in one place.
//
// ── Verification rules applied here (the TED-152 precedent) ───────────────
// Every course, app and program below was fetched and read during authoring
// (2026-08-31). Anything that could not be confirmed live and described
// accurately was DROPPED rather than guessed at. Specifically dropped:
//
//   * Municipal / community-centre (מתנ"ס) Amharic courses. Targeted searches
//     across the cities with the largest Ethiopian-Israeli populations found
//     no course page that is live and dated. The hub says so in as many words
//     rather than implying a supply that we could not confirm exists.
//   * goethe-verlag / 50LANGUAGES Hebrew→Amharic. Almost certainly real, but
//     the site returns 403 to automated fetches, so it could not be read and
//     described. Not listed.
//   * The גפ"ן programme catalogue number quoted in keywords.md §10. The
//     Tegest programme itself is confirmed; the code is not, so it is omitted.
//
// ── The ulpan page and its rejected spec ──────────────────────────────────
// `docs/seo/pages/2026-08-05-bilingual-ulpan-hebrew-amharic.md` specced a
// "bilingual Hebrew-Amharic ulpan" page and was then marked REJECTED by its
// own §9 follow-up research: the two-teacher model it describes was tried in
// "individual classrooms" and never rolled out nationally for budget reasons
// (Hed HaUlpan 102, 2014), and no ulpan running it today could be found. The
// page below therefore does NOT present that model as an available service.
// It is built around what IS verifiable — the Ministry's national ulpan list,
// the documented history stated as history, and the questions a learner should
// actually ask when they call. See the PR for the full deviation note.
//
// ADR-020: prose lives here, resolved for one locale in the loader. The fidel
// chart data is the one thing that reaches the browser, and it lives in the
// client-safe `./fidel.ts` for the reasons documented there.

import type { Locale } from "../i18n/config";
import type {
  GuideCrosslink,
  GuideFaqItem,
  GuideResource,
  GuideSource,
  GuideStep,
} from "~/components/sections/guide-page";
import { amharicHubPath, amharicUlpanPath } from "./links";

type L = Record<Locale, string>;

/** First published — bump on substantive edits. */
export const AMHARIC_PUBLISHED_AT = "2026-08-31";

// ═══════════════════════════════════════════════════════════════════════════
// Shared: the verified places to learn
// ═══════════════════════════════════════════════════════════════════════════

export interface AmharicCourse {
  id: string;
  name: L;
  url: string;
  /** Who it is for, in one line. */
  audience: L;
  description: L;
  /** Cost in plain language — never a number we did not read on the page. */
  cost: L;
  /** Contact detail published on the provider's own site, if any. */
  contact?: string;
}

/**
 * Verified 2026-08-31. Each entry was fetched and read; the description below
 * says only what the provider's own page says.
 */
export const AMHARIC_COURSES: AmharicCourse[] = [
  {
    id: "tegest",
    name: {
      he: "לומדים אמהרית בכיף (ትዕግሥት / Tegest)",
      en: "Learning Amharic with Joy (ትዕግሥት / Tegest)",
      am: "አማርኛን በደስታ መማር (ትዕግሥት)",
    },
    url: "https://tegest.co.il/",
    audience: {
      he: "ילדים דוברי עברית, משפחות ובתי ספר יסודיים",
      en: "Hebrew-speaking children, families and elementary schools",
      am: "ዕብራይስጥ የሚናገሩ ልጆች፣ ቤተሰቦችና የመጀመሪያ ደረጃ ትምህርት ቤቶች",
    },
    description: {
      he: "יוזמה חינוכית שמלמדת אמהרית לילדים דוברי עברית. באתר: ערכות לימוד להכרת האותיות ואוצר מילים, סדנאות ופעילויות בבתי ספר, קורס דיגיטלי עם משחקים, וחומרים חינמיים להורדה — דפי צביעה, פעילויות למשפחה וחומרים לאנשי חינוך. התוכנית „אמהרית ספרי לי תרבות” מיועדת לבתי ספר יסודיים ומשלבת שפה עם היכרות עם התרבות האתיופית. הוקמה על ידי תגסט פלקאה, בעלת תואר שני בחינוך ומעל 17 שנות ותק במערכת החינוך.",
      en: "An educational initiative teaching Amharic to Hebrew-speaking children. The site offers learning kits for letter recognition and vocabulary, school workshops and activities, a digital course with games, and free downloads — colouring pages, family activities and materials for educators. Its “Amharic, Tell Me Culture” programme is aimed at elementary schools and combines language with Ethiopian culture. Founded by Tegest Felkea, who holds a master's in education and has over 17 years in the Israeli school system.",
      am: "ዕብራይስጥ ለሚናገሩ ልጆች አማርኛ የሚያስተምር የትምህርት ተነሳሽነት። በድረ-ገጹ ላይ የፊደልና የቃላት መማሪያ ኪቶች፣ በትምህርት ቤቶች ውስጥ አውደ ጥናቶች፣ ጨዋታ ያለው ዲጂታል ኮርስ፣ እና ነጻ የሚወርዱ ቁሳቁሶች አሉ። በትዕግሥት ፈልቃ የተመሠረተ።",
    },
    contact: "learningt100@gmail.com",
    cost: {
      he: "חלק מהחומרים חינם להורדה; ערכות, סדנאות והקורס הדיגיטלי בתשלום — המחיר לא מפורסם באתר, יש לפנות ישירות.",
      en: "Some materials are free to download; kits, workshops and the digital course are paid — the price is not published on the site, so ask directly.",
      am: "አንዳንድ ቁሳቁሶች ነጻ ናቸው፤ ኪቶችና ኮርሶች የሚከፈልባቸው ናቸው — ዋጋው በድረ-ገጹ ላይ አልተጻፈም።",
    },
  },
  {
    id: "mulu",
    name: {
      he: "MuluApp — קורסי אמהרית מקוונים",
      en: "MuluApp — online Amharic courses",
      am: "MuluApp — የመስመር ላይ የአማርኛ ኮርሶች",
    },
    url: "https://muluapp.com/",
    audience: {
      he: "מתחילים ומתקדמים, לימוד עצמי בקצב אישי",
      en: "Beginners and up, self-paced independent study",
      am: "ጀማሪዎችና ከዚያ በላይ፣ በራስ ፍጥነት የሚማሩ",
    },
    description: {
      he: "פלטפורמת לימוד מקוונת לשפה האמהרית ולתרבות יהודי אתיופיה. באתר מוצעים קורס חינמי „מבוא לשפה האמהרית” וקורס בתשלום „יסודות האמהרית — חלק 1” המתמקד בקריאה וכתיבה. הלימוד כולל תרגילים ובחנים אחרי כל שיעור, בניית אוצר מילים ותכנים תרבותיים, והוא מקוון ובקצב אישי.",
      en: "An online platform for the Amharic language and Ethiopian-Jewish culture. It offers a free “Introduction to Amharic” course and a paid “Fundamentals of Amharic — Part 1” focused on reading and writing. Lessons include exercises and quizzes, vocabulary building and cultural content, studied online at your own pace.",
      am: "ለአማርኛ ቋንቋና ለኢትዮጵያ-አይሁድ ባህል የተዘጋጀ የመስመር ላይ መድረክ። ነጻ የመግቢያ ኮርስና የሚከፈልበት “የአማርኛ መሠረታዊያን — ክፍል 1” ይሰጣል።",
    },
    contact: "053-9739184",
    cost: {
      he: "קורס המבוא חינם; הקורס המתקדם בתשלום.",
      en: "The introductory course is free; the advanced course is paid.",
      am: "የመግቢያ ኮርሱ ነጻ ነው፤ የላቀው ኮርስ የሚከፈልበት ነው።",
    },
  },
  {
    id: "moe-bagrut",
    name: {
      he: "אמהרית כמקצוע בגרות — משרד החינוך",
      en: "Amharic as a bagrut subject — Ministry of Education",
      am: "አማርኛ እንደ የመመረቂያ ትምህርት — የትምህርት ሚኒስቴር",
    },
    url: "https://pop.education.gov.il/tchumey_daat/amharic/",
    audience: {
      he: "תלמידי חטיבה עליונה (כיתות י–יב) — כולל תלמידים שבבית ספרם לא מלמדים אמהרית",
      en: "Upper-secondary students (grades 10–12) — including those whose school does not teach Amharic",
      am: "የሁለተኛ ደረጃ ተማሪዎች (10–12ኛ ክፍል)",
    },
    description: {
      he: "אמהרית היא מקצוע בחירה מוכר לבגרות בהיקף 5 יחידות לימוד, בחטיבה העליונה. חוזר המנכ“ל קובע שבית ספר רשאי להגיש תלמיד לבחינה גם אם המקצוע לא נלמד בו, ותלמיד יחיד יכול להיבחן — ואז ציון הבחינה הוא הציון הסופי. הפורטל הפדגוגי מרכז את תוכנית הלימודים, חומרי הוראה ולמידה, והפדגוגיה של המקצוע.",
      en: "Amharic is a recognised elective bagrut subject at the 5-unit level in upper-secondary school. The director-general's circular states that a school may enter a student for the exam even if the subject is not taught there, and an individual student may sit it — in which case the exam mark is the final grade. The pedagogical portal collects the curriculum, teaching materials and subject pedagogy.",
      am: "አማርኛ በሁለተኛ ደረጃ ትምህርት ቤት የ5 ዩኒት የመመረቂያ ምርጫ ትምህርት ነው። ትምህርት ቤቱ ባያስተምረውም ተማሪ ፈተናውን መውሰድ ይችላል።",
    },
    cost: {
      he: "ללא עלות — במסגרת מערכת החינוך הציבורית.",
      en: "No cost — within the public education system.",
      am: "ያለ ክፍያ — በሕዝብ ትምህርት ሥርዓት ውስጥ።",
    },
  },
  {
    id: "tau",
    name: {
      he: "אמהרית למתחילים — אוניברסיטת תל אביב",
      en: "Amharic for Beginners — Tel Aviv University",
      am: "አማርኛ ለጀማሪዎች — የቴል አቪቭ ዩኒቨርሲቲ",
    },
    url: "https://humanities.tau.ac.il/hebrew/semitic/program",
    audience: {
      he: "סטודנטים — לימודים אקדמיים בשפה",
      en: "Students — academic study of the language",
      am: "ተማሪዎች — የቋንቋው አካዳሚያዊ ጥናት",
    },
    description: {
      he: "החוג ללשון העברית ולבלשנות שמית מציע לימודי שפות אתיופיות — געז ואמהרית. הקורס „אמהרית למתחילים” (0624-3003-01) עוסק בפונולוגיה, מורפולוגיה ותחביר, ומשלב קריאת טקסטים והאזנה להקלטות של הלשון המדוברת. הנוכחות בקורס חובה.",
      en: "The Department of Hebrew Language and Semitic Linguistics offers Ethiopian-language studies — Ge'ez and Amharic. The course “Amharic for Beginners” (0624-3003-01) covers phonology, morphology and syntax, with text reading and recordings of the spoken language. Attendance is mandatory.",
      am: "የዕብራይስጥ ቋንቋና የሴማዊ ቋንቋዎች ጥናት ክፍል የግዕዝና የአማርኛ ትምህርት ይሰጣል።",
    },
    cost: {
      he: "במסגרת שכר לימוד אקדמי. הצעת הקורס משתנה משנה לשנה — יש לבדוק בידיעון של שנת הלימודים הנוכחית.",
      en: "Within academic tuition. Course offerings change year to year — check the current-year course catalogue.",
      am: "በአካዳሚያዊ የትምህርት ክፍያ ውስጥ። በየዓመቱ ይለዋወጣል።",
    },
  },
];

/**
 * The gap we did not fill. Stated on the page rather than papered over, so a
 * reader does not assume a local course exists just because we did not list one.
 */
export const AMHARIC_SUPPLY_GAP: L = {
  he: "חיפשנו קורסי אמהרית של עיריות, מתנ“סים ומרכזים קהילתיים בערים עם ריכוזי אוכלוסייה גדולים של יוצאי אתיופיה — ולא מצאנו אף עמוד קורס חי ומתוארך שאפשר להפנות אליו בביטחון. ייתכן שקורסים כאלה מתקיימים ופשוט לא מפורסמים ברשת. אם אתם מכירים אחד, או מפעילים אחד — ספרו לנו ונוסיף אותו לרשימה אחרי בדיקה. אנחנו מעדיפים רשימה קצרה ונכונה על רשימה ארוכה שחלקה מוביל לשום מקום.",
  en: "We searched for Amharic courses run by municipalities and community centres in the cities with the largest Ethiopian-Israeli populations, and found no live, dated course page we could point to with confidence. Such courses may well run without being published online. If you know of one — or run one — tell us and we will add it after verifying. We would rather publish a short accurate list than a long one where half the links go nowhere.",
  am: "ብዙ የኢትዮጵያ-እስራኤላውያን በሚኖሩባቸው ከተሞች የማዘጋጃ ቤት የአማርኛ ኮርሶችን ፈልገናል፤ ነገር ግን በእርግጠኝነት ልንጠቁመው የምንችለው ሕያው ገጽ አላገኘንም። እንደዚህ ያለ ኮርስ ካወቁ ንገሩን።",
};

// ═══════════════════════════════════════════════════════════════════════════
// Hub: /education/amharic
// ═══════════════════════════════════════════════════════════════════════════

export const AMHARIC_HUB_TITLE: L = {
  he: "ללמוד אמהרית — האלפבית, מילים למשפחה, ואיפה לומדים",
  en: "Learning Amharic — the alphabet, family words, and where to study",
  am: "አማርኛ መማር — ፊደሉ፣ የቤተሰብ ቃላት፣ እና የት እንደሚማሩ",
};

export const AMHARIC_HUB_SUBTITLE: L = {
  he: "טבלת הפידל המלאה, מילים שאפשר להגיד להורים ולסבתא כבר היום, ורשימה מאומתת של המקומות שבהם באמת אפשר ללמוד. גם הבגרות ב-5 יחידות — ואיך ניגשים אליה גם אם בבית הספר שלכם לא מלמדים אמהרית.",
  en: "The full fidel chart, words you can say to your parents and grandmother today, and a verified list of the places you can actually study. Plus the 5-unit bagrut — and how to sit it even if your school does not teach Amharic.",
  am: "ሙሉ የፊደል ሰንጠረዥ፣ ዛሬውኑ ለወላጆችዎና ለአያትዎ ሊሉዋቸው የሚችሉ ቃላት፣ እና በእውነት ሊማሩባቸው የሚችሉ ቦታዎች የተረጋገጠ ዝርዝር።",
};

/**
 * Standalone Amharic summary — the same text in every locale, so a reader can
 * show it to a parent or grandparent who reads Amharic and not Hebrew.
 */
export const AMHARIC_HUB_SUMMARY = `አማርኛ መማር ወይም መልሶ ማግኘት ትፈልጋላችሁ? ይህ ገጽ ሦስት ነገሮችን ይሰጣል።

አንደኛ — ሙሉ የፊደል ሰንጠረዥ። 34 ተነባቢዎች በ7 ቅርጾች፤ በአጠቃላይ 238 ምልክቶች። እያንዳንዱን ምልክት ተጭነው አነባበቡን ማየት ትችላላችሁ።

ሁለተኛ — ለቤተሰብ የሚሆኑ መሠረታዊ ቃላትና ሰላምታዎች፣ በአማርኛ ፊደልና በላቲን ፊደል ተጽፈው።

ሦስተኛ — በእስራኤል አማርኛ የሚያስተምሩ የተረጋገጡ ቦታዎች ዝርዝር። አማርኛ በሁለተኛ ደረጃ ትምህርት ቤት የ5 ዩኒት የመመረቂያ ትምህርት ነው፤ ትምህርት ቤታችሁ ባያስተምረውም ፈተናውን መውሰድ ትችላላችሁ።`;

export interface AmharicSection {
  id: string;
  heading: L;
  body: L;
}

export const AMHARIC_HUB_SECTIONS: AmharicSection[] = [
  {
    id: "why",
    heading: {
      he: "„אמא, אל תדברי איתי באמהרית” — ואיך חוזרים מזה",
      en: "“Mum, don't speak Amharic to me” — and how you come back from it",
      am: "“እናቴ፣ በአማርኛ አታናግሪኝ” — እና ከዚያ እንዴት እንደሚመለሱ",
    },
    body: {
      he: `הרבה ילדים שגדלו בישראל להורים יוצאי אתיופיה ביקשו, בשלב כלשהו, שההורים לא ידברו איתם אמהרית בציבור. זה כמעט תמיד לא היה על השפה — זה היה על הרצון לא לבלוט. השפה שילמה את המחיר.

התוצאה מוכרת: דור שמבין הרבה יותר משהוא מדבר, ודור הורים שמגלה שהוא לא יכול לנהל שיחה עמוקה עם הילדים שלו בשפה שבה הוא הכי מדויק. אצל הסבים והסבתות הפער גדול עוד יותר — לפעמים אין שפה משותפת בכלל.

הבשורה היא ש“הבנה פסיבית” היא נקודת פתיחה טובה במיוחד. מי שגדל לשמוע אמהרית בבית כבר מחזיק את המערכת הצלילית ואת הקצב — הדברים שהכי קשה לרכוש מאוחר. מה שחסר הוא בדרך כלל האותיות ואוצר המילים האקטיבי, ואלה נלמדים.

הדף הזה נבנה לשלוש קבוצות: מי שרוצה להתחיל לקרוא, מי שרוצה משפטים לומר בבית כבר השבוע, ומי שרוצה מסגרת לימוד מסודרת.`,
      en: `Many children who grew up in Israel to Ethiopian-born parents asked, at some point, that their parents not speak Amharic to them in public. It was almost never about the language — it was about not standing out. The language paid the price.

The result is familiar: a generation that understands far more than it speaks, and a generation of parents who find they cannot have a deep conversation with their own children in the language they are most precise in. With grandparents the gap is wider still — sometimes there is no shared language at all.

The good news is that "passive comprehension" is an unusually good starting point. Anyone who grew up hearing Amharic at home already holds the sound system and the rhythm — the parts that are hardest to acquire later. What is usually missing is the letters and active vocabulary, and those can be learned.

This page is built for three groups: people who want to start reading, people who want sentences to use at home this week, and people who want a structured course.`,
      am: `በእስራኤል ያደጉ ብዙ ልጆች በአንድ ወቅት ወላጆቻቸው በሕዝብ ፊት በአማርኛ እንዳያናግሯቸው ጠይቀዋል። ይህ ስለ ቋንቋው አልነበረም — ጎልቶ ላለመታየት ነበር። ዋጋውን የከፈለው ግን ቋንቋው ነው።

ውጤቱ የታወቀ ነው፦ ከሚናገረው በላይ የሚረዳ ትውልድ፣ እና ከልጆቻቸው ጋር በጥልቀት መነጋገር የማይችሉ ወላጆች።

መልካሙ ዜና ግን በቤት ውስጥ አማርኛ ሰምቶ ያደገ ሰው የድምጹን ሥርዓትና ምትን አስቀድሞ ይዟል — በኋላ ለመማር በጣም የሚከብዱት እነዚህ ናቸው። የሚጎድለው ፊደሉና ንቁ የቃላት ክምችት ነው፤ እነዚህ ደግሞ ይማራሉ።`,
    },
  },
  {
    id: "how-fidel-works",
    heading: {
      he: "איך הפידל עובד — ולמה זה קל יותר משנראה",
      en: "How the fidel works — and why it is easier than it looks",
      am: "ፊደሉ እንዴት እንደሚሠራ — እና ከሚመስለው ለምን ቀላል እንደሆነ",
    },
    body: {
      he: `טבלה של 238 סימנים נראית מפחידה, אבל היא לא 238 דברים ללמוד. הפידל הוא אבוגידה: כל סימן הוא הברה — עיצור ותנועה ביחד — ולא אות בודדת.

המבנה הוא רשת. יש 34 עיצורי בסיס, ולכל אחד שבע צורות לפי התנועה שנלווית אליו. הצורה הבסיסית נקראת גֶּעז (ግዕዝ) ונהגית עם התנועה “ä”, ואחריה שש צורות נוספות: u, i, a, e, ə, o. השינוי בין הצורות הוא שיטתי — תוספת קו, לולאה או שינוי כיוון של רגל.

כלומר: לומדים 34 עיצורים ושבעה כללי שינוי, ומקבלים 238 הברות. זו הסיבה שילדים באתיופיה קוראים מוקדם יחסית — ברגע שהמערכת מובנת, הקריאה כמעט חד-חד-ערכית: מה שכתוב הוא מה שנהגה.

אותו כתב משמש לשלוש שפות: געז — שפת התפילה של ביתא ישראל, אמהרית, ותיגרינית. מי שלמד לקרוא אמהרית יכול גם לעקוב אחרי הקריאה בסיגד.`,
      en: `A table of 238 characters looks intimidating, but it is not 238 things to learn. The fidel is an abugida: each character is a syllable — a consonant and a vowel together — not a single letter.

The structure is a grid. There are 34 base consonants, and each has seven forms according to the vowel attached to it. The base form is called gəʿəz (ግዕዝ) and is pronounced with the vowel "ä", followed by six more: u, i, a, e, ə, o. The change between forms is systematic — an added stroke, a loop, or a change in the direction of a leg.

So: you learn 34 consonants and seven modification patterns, and you get 238 syllables. This is why children in Ethiopia read relatively early — once the system clicks, reading is almost one-to-one: what is written is what is said.

The same script serves three languages: Ge'ez — the prayer language of Beta Israel, Amharic, and Tigrinya. Someone who learns to read Amharic can also follow the reading at Sigd.`,
      am: `የ238 ምልክቶች ሰንጠረዥ አስፈሪ ይመስላል፤ ግን 238 የተለያዩ ነገሮች አይደሉም። ፊደል አቡጊዳ ነው፦ እያንዳንዱ ምልክት ተነባቢና አናባቢ አንድ ላይ ያለው ክፍለ-ቃል ነው።

34 መሠረታዊ ተነባቢዎች አሉ፤ እያንዳንዳቸው በአናባቢው መሠረት ሰባት ቅርጾች አሏቸው። መሠረታዊው ቅርጽ ግዕዝ ይባላል፤ ከዚያም ካዕብ፣ ሣልስ፣ ራብዕ፣ ኃምስ፣ ሳድስ፣ ሳብዕ ይከተላሉ።

ስለዚህ 34 ተነባቢዎችንና ሰባት የለውጥ ሕጎችን ተምረው 238 ክፍለ-ቃላት ያገኛሉ። ተመሳሳዩ ፊደል ለሦስት ቋንቋዎች ያገለግላል፦ ግዕዝ፣ አማርኛና ትግርኛ።`,
    },
  },
  {
    id: "bagrut",
    heading: {
      he: "בגרות באמהרית — 5 יחידות, גם אם בבית הספר לא מלמדים",
      en: "Bagrut in Amharic — 5 units, even if your school does not teach it",
      am: "የአማርኛ መመረቂያ ፈተና — 5 ዩኒት፣ ትምህርት ቤቱ ባያስተምረውም",
    },
    body: {
      he: `זו הזכות שהכי מעט אנשים מכירים מבין כל מה שבדף הזה: אמהרית היא מקצוע בחירה מוכר לבגרות בהיקף של 5 יחידות לימוד, בחטיבה העליונה (כיתות י–יב).

מה שחשוב במיוחד: חוזר המנכ“ל מנחה את מנהלי בתי הספר כיצד לאפשר גם לתלמיד יחיד להיבחן כאשר המקצוע אינו נלמד בבית הספר. במקרה כזה ציון הבחינה הוא הציון הסופי במקצוע. כלומר — היעדר מורה לאמהרית בבית הספר שלכם אינו סוף הדרך.

עוד מהחוזר:

• המקצוע נלמד בחטיבה העליונה כמקצוע מורחב, בהיקף מומלץ של כ-15 שעות שבועיות פרוסות על פני שלוש שנים.
• ההערכה מחולקת לידע ליבה בהערכה חיצונית ולתכני העשרה בהערכה בית-ספרית.
• את המקצוע רשאים ללמד רק מורים בעלי תואר אקדמי ותעודת הוראה באמהרית, המוכרים על ידי הפיקוח על הוראת האמהרית.

הצעד המעשי: פנו ליועץ/ת או לרכז/ת הבחינות בבית הספר, הציגו את חוזר המנכ“ל, ובקשו שיבדקו את ההגשה לבחינה. אם נתקלתם בסירוב, זו בדיוק הסיטואציה שבה כדאי לצרף את החוזר עצמו לפנייה בכתב.`,
      en: `This is the least-known entitlement on this page: Amharic is a recognised elective bagrut subject at the 5-unit level in upper-secondary school (grades 10–12).

What matters most: the director-general's circular instructs principals on how to let even a single student sit the exam when the subject is not taught at the school. In that case the exam mark becomes the final grade in the subject. In other words — the absence of an Amharic teacher at your school is not the end of the road.

Also from the circular:

• The subject is studied in upper-secondary as an expanded subject, at a recommended scope of roughly 15 weekly hours spread over three years.
• Assessment splits into externally assessed core knowledge and school-assessed enrichment content.
• Only teachers holding an academic degree and a teaching certificate in Amharic, recognised by the Amharic-teaching inspectorate, may teach it.

The practical step: go to the school counsellor or exams coordinator, show them the circular, and ask them to look into entering you for the exam. If you are refused, this is exactly the situation where you attach the circular itself to a written request.`,
      am: `በዚህ ገጽ ላይ ካሉት ሁሉ በጣም ጥቂት ሰዎች የሚያውቁት መብት ይህ ነው፦ አማርኛ በሁለተኛ ደረጃ ትምህርት ቤት (10–12ኛ ክፍል) የ5 ዩኒት የመመረቂያ ምርጫ ትምህርት ነው።

ዋናው ነጥብ፦ የሚኒስቴሩ ማስታወቂያ ትምህርቱ በትምህርት ቤቱ ባይሰጥም አንድ ተማሪ ፈተናውን እንዲወስድ እንዴት ማድረግ እንደሚቻል ለርእሰ መምህራን ያሳያል። በዚህ ጊዜ የፈተናው ውጤት የመጨረሻው ውጤት ይሆናል።

ተግባራዊ እርምጃ፦ በትምህርት ቤቱ ወደሚገኘው አማካሪ ወይም የፈተና አስተባባሪ ሂዱ፣ ማስታወቂያውን አሳዩዋቸው፣ ለፈተና እንዲያስመዘግቧችሁ ጠይቁ።`,
    },
  },
];

export interface AmharicPhrase {
  id: string;
  /** Amharic in Ge'ez script — same in every locale. */
  am: string;
  /** Scholarly romanisation. */
  translit: string;
  meaning: L;
  /** When to use it / who to say it to. */
  note?: L;
}

export interface AmharicPhraseGroup {
  id: string;
  heading: L;
  phrases: AmharicPhrase[];
}

/**
 * Family-first vocabulary: the words most likely to be said to a parent or
 * grandparent, not the words a textbook opens with. Romanisation follows the
 * same scholarly system as the fidel chart (ə for the sixth order, ḫ/ṭ/ṣ for
 * the ejectives), so the two halves of the page read consistently.
 *
 * Amharic marks the gender of the person addressed, so where a phrase changes
 * by addressee both forms are given — getting this wrong is the single most
 * common beginner mistake and the one a grandparent will notice.
 */
export const AMHARIC_PHRASES: AmharicPhraseGroup[] = [
  {
    id: "family",
    heading: {
      he: "המשפחה",
      en: "The family",
      am: "ቤተሰብ",
    },
    phrases: [
      {
        id: "family-word",
        am: "ቤተሰብ",
        translit: "betäsäb",
        meaning: { he: "משפחה", en: "family", am: "ቤተሰብ" },
      },
      {
        id: "mother",
        am: "እናት",
        translit: "ənnat",
        meaning: { he: "אמא (המילה)", en: "mother (the noun)", am: "እናት" },
        note: {
          he: "לפנייה ישירה אומרים אֶמָּיֵה (እማዬ) — “אמא שלי”, כמו “אמאל’ה”.",
          en: "To address her directly you say əmmayé (እማዬ) — “my mum”.",
          am: "በቀጥታ ለመጥራት እማዬ ይባላል።",
        },
      },
      {
        id: "father",
        am: "አባት",
        translit: "abbat",
        meaning: { he: "אבא (המילה)", en: "father (the noun)", am: "አባት" },
        note: {
          he: "לפנייה ישירה: אַבָּיֵה (አባዬ).",
          en: "To address him directly: abbayé (አባዬ).",
          am: "በቀጥታ ለመጥራት አባዬ።",
        },
      },
      {
        id: "grandmother",
        am: "ሴት አያት",
        translit: "set ayat",
        meaning: { he: "סבתא", en: "grandmother", am: "ሴት አያት" },
        note: {
          he: "אָיָת (አያት) לבד = סב או סבתא; סֵת (ሴት) = אישה, וֶנְד (ወንድ) = גבר.",
          en: "ayat alone = grandparent; set = female, wänd = male.",
          am: "አያት ብቻውን አያት ማለት ነው፤ ሴት እና ወንድ ይለያሉ።",
        },
      },
      {
        id: "grandfather",
        am: "ወንድ አያት",
        translit: "wänd ayat",
        meaning: { he: "סבא", en: "grandfather", am: "ወንድ አያት" },
      },
      {
        id: "brother",
        am: "ወንድም",
        translit: "wändəmm",
        meaning: { he: "אח", en: "brother", am: "ወንድም" },
      },
      {
        id: "sister",
        am: "እህት",
        translit: "əhət",
        meaning: { he: "אחות", en: "sister", am: "እህት" },
      },
      {
        id: "child",
        am: "ልጅ",
        translit: "ləj",
        meaning: { he: "ילד / ילדה", en: "child", am: "ልጅ" },
      },
    ],
  },
  {
    id: "greetings",
    heading: {
      he: "ברכות ונימוס",
      en: "Greetings and courtesy",
      am: "ሰላምታና ጨዋነት",
    },
    phrases: [
      {
        id: "selam",
        am: "ሰላም",
        translit: "sälam",
        meaning: { he: "שלום", en: "hello / peace", am: "ሰላም" },
        note: {
          he: "מתאים לכל שעה ולכל אדם — הפתיחה הבטוחה ביותר.",
          en: "Works at any hour with anyone — the safest opener.",
          am: "በማንኛውም ሰዓት ለማንኛውም ሰው ይሠራል።",
        },
      },
      {
        id: "tena",
        am: "ጤና ይስጥልኝ",
        translit: "ṭena yəsṭəlləñ",
        meaning: {
          he: "ברכה מנומסת ומכובדת (“שייתן לך בריאות”)",
          en: "a respectful formal greeting (“may he grant you health”)",
          am: "ጤና ይስጥልኝ",
        },
        note: {
          he: "הברכה שכדאי להגיד לקייס, לזקני הקהילה ולאורחים מבוגרים.",
          en: "The greeting to use with a Kes, community elders and older guests.",
          am: "ለቄስ፣ ለሽማግሌዎችና ለአረጋውያን እንግዶች የሚነገር።",
        },
      },
      {
        id: "morning-f",
        am: "እንደምን አደርሽ",
        translit: "əndämən addärš",
        meaning: { he: "בוקר טוב — לאישה", en: "good morning — to a woman", am: "ለሴት" },
      },
      {
        id: "morning-m",
        am: "እንደምን አደርክ",
        translit: "əndämən addärk",
        meaning: { he: "בוקר טוב — לגבר", en: "good morning — to a man", am: "ለወንድ" },
      },
      {
        id: "thanks",
        am: "አመሰግናለሁ",
        translit: "amäsäggənallähu",
        meaning: { he: "תודה", en: "thank you", am: "አመሰግናለሁ" },
      },
      {
        id: "welcome-f",
        am: "እንኳን ደህና መጣሽ",
        translit: "ənkʷan dähna mäṭṭaš",
        meaning: {
          he: "ברוכה הבאה — לאישה",
          en: "welcome — to a woman",
          am: "እንኳን ደህና መጣሽ",
        },
      },
      {
        id: "welcome-m",
        am: "እንኳን ደህና መጣህ",
        translit: "ənkʷan dähna mäṭṭah",
        meaning: { he: "ברוך הבא — לגבר", en: "welcome — to a man", am: "እንኳን ደህና መጣህ" },
      },
      {
        id: "yes",
        am: "አዎ",
        translit: "awo",
        meaning: { he: "כן", en: "yes", am: "አዎ" },
      },
      {
        id: "no",
        am: "የለም",
        translit: "yälläm",
        meaning: { he: "לא / אין", en: "no / there isn't", am: "የለም" },
      },
    ],
  },
  {
    id: "at-home",
    heading: {
      he: "משפטים להגיד בבית",
      en: "Sentences to say at home",
      am: "በቤት ውስጥ የሚነገሩ ዓረፍተ ነገሮች",
    },
    phrases: [
      {
        id: "love-f",
        am: "እወድሻለሁ",
        translit: "əwäddəšallähu",
        meaning: {
          he: "אני אוהב/ת אותך — לאישה",
          en: "I love you — to a woman",
          am: "ለሴት",
        },
        note: {
          he: "המשפט שהכי שווה לתרגל. לאמא, לסבתא, לאחות.",
          en: "The sentence most worth practising. To a mother, a grandmother, a sister.",
          am: "ለእናት፣ ለአያት፣ ለእህት።",
        },
      },
      {
        id: "love-m",
        am: "እወድሃለሁ",
        translit: "əwäddəhallähu",
        meaning: {
          he: "אני אוהב/ת אותך — לגבר",
          en: "I love you — to a man",
          am: "ለወንድ",
        },
      },
      {
        id: "how-are-you-f",
        am: "ደህና ነሽ",
        translit: "dähna näš",
        meaning: { he: "מה שלומך? — לאישה", en: "how are you? — to a woman", am: "ለሴት" },
      },
      {
        id: "how-are-you-m",
        am: "ደህና ነህ",
        translit: "dähna näh",
        meaning: { he: "מה שלומך? — לגבר", en: "how are you? — to a man", am: "ለወንድ" },
      },
      {
        id: "im-learning",
        am: "አማርኛ እየተማርኩ ነው",
        translit: "amarəñña əyyätämarku näw",
        meaning: {
          he: "אני לומד/ת אמהרית",
          en: "I am learning Amharic",
          am: "አማርኛ እየተማርኩ ነው",
        },
        note: {
          he: "המשפט שפותח את השיחה. הוא גם מסביר מראש למה ההגייה עדיין לא מושלמת.",
          en: "The sentence that opens the conversation — and explains in advance why the pronunciation is not there yet.",
          am: "ንግግሩን የሚከፍት ዓረፍተ ነገር።",
        },
      },
      {
        id: "slowly",
        am: "ቀስ ብለሽ ንገሪኝ",
        translit: "qäss bläš nägäriñ",
        meaning: {
          he: "תגידי לי לאט — לאישה",
          en: "tell me slowly — to a woman",
          am: "ቀስ ብለሽ ንገሪኝ",
        },
        note: {
          he: "לגבר: קֶס בְּלֶהּ נְגֶרֵן (ቀስ ብለህ ንገረኝ).",
          en: "To a man: qäss bläh nägäräñ (ቀስ ብለህ ንገረኝ).",
          am: "ለወንድ፦ ቀስ ብለህ ንገረኝ።",
        },
      },
      {
        id: "goodbye",
        am: "ደህና ሁኚ",
        translit: "dähna huñi",
        meaning: { he: "להתראות — לאישה", en: "goodbye — to a woman", am: "ለሴት" },
        note: {
          he: "לגבר: דֶהְנָה הוּן (ደህና ሁን).",
          en: "To a man: dähna hun (ደህና ሁን).",
          am: "ለወንድ፦ ደህና ሁን።",
        },
      },
    ],
  },
];

export const AMHARIC_HUB_FAQ: Array<{ id: string; question: L; answer: L }> = [
  {
    id: "how-many-letters",
    question: {
      he: "כמה אותיות יש באמהרית?",
      en: "How many letters does Amharic have?",
      am: "አማርኛ ስንት ፊደላት አሉት?",
    },
    answer: {
      he: "המספר שנהוג לצטט הוא 238, אבל זו לא ספירה של אותיות במובן העברי או הלטיני. הפידל הוא אבוגידה: 34 עיצורי בסיס, שלכל אחד שבע צורות לפי התנועה — 34 כפול 7. לומדים 34 עיצורים ושבעה דפוסי שינוי, לא 238 סימנים נפרדים.",
      en: "The number usually quoted is 238, but that is not a count of letters in the Hebrew or Latin sense. The fidel is an abugida: 34 base consonants, each with seven forms according to the vowel — 34 × 7. You learn 34 consonants and seven modification patterns, not 238 separate characters.",
      am: "ብዙ ጊዜ የሚጠቀሰው ቁጥር 238 ነው። ፊደል አቡጊዳ ነው፦ 34 መሠረታዊ ተነባቢዎች እያንዳንዳቸው ሰባት ቅርጾች አሏቸው።",
    },
  },
  {
    id: "geez-vs-amharic",
    question: {
      he: "מה ההבדל בין געז לאמהרית?",
      en: "What is the difference between Ge'ez and Amharic?",
      am: "በግዕዝና በአማርኛ መካከል ያለው ልዩነት ምንድን ነው?",
    },
    answer: {
      he: "געז היא שפה שמית עתיקה ששימשה באקסום ונשארה שפת קודש — האוריית והתפילות של ביתא ישראל כתובות בה, והקייסים לומדים לקרוא ולהתפלל בה. היא כמעט אינה מדוברת כשפת אם. אמהרית היא שפה חיה ומדוברת. השתיים חולקות את אותו כתב — הפידל — ולכן מי שלמד לקרוא אמהרית יכול גם לעקוב אחרי הקריאה בגעז, גם בלי להבין את כל המילים.",
      en: "Ge'ez is an ancient Semitic language used in Aksum that became a sacred language — the Orit and the prayers of Beta Israel are written in it, and the Kessim train to read and pray in it. It is virtually no one's native tongue. Amharic is a living, spoken language. The two share the same script — the fidel — so someone who can read Amharic can also follow a Ge'ez reading, even without understanding every word.",
      am: "ግዕዝ ጥንታዊ የሴማዊ ቋንቋ ሲሆን የቅዱሳት መጻሕፍትና የጸሎት ቋንቋ ነው። አማርኛ ሕያውና የሚነገር ቋንቋ ነው። ሁለቱም ተመሳሳይ ፊደል ይጠቀማሉ።",
    },
  },
  {
    id: "bagrut-no-teacher",
    question: {
      he: "בבית הספר שלי לא מלמדים אמהרית — אפשר בכל זאת להיבחן בבגרות?",
      en: "My school does not teach Amharic — can I still sit the bagrut?",
      am: "ትምህርት ቤቴ አማርኛ አያስተምርም — ፈተናውን መውሰድ እችላለሁ?",
    },
    answer: {
      he: "כן. חוזר המנכ“ל של משרד החינוך מנחה את מנהלי בתי הספר כיצד לאפשר גם לתלמיד יחיד להיבחן במקצוע שאינו נלמד בבית הספר. במקרה כזה ציון הבחינה הוא הציון הסופי במקצוע, ללא ציון בית-ספרי. פנו ליועץ/ת או לרכז/ת הבחינות והציגו את החוזר.",
      en: "Yes. The Ministry of Education's director-general circular instructs principals on how to let even a single student sit an exam in a subject not taught at the school. In that case the exam mark is the final grade in the subject, with no school-assessed component. Go to your counsellor or exams coordinator and show them the circular.",
      am: "አዎ። የትምህርት ሚኒስቴር ማስታወቂያ ትምህርቱ ባይሰጥም አንድ ተማሪ እንዲፈተን እንዴት ማድረግ እንደሚቻል ያመለክታል። የፈተናው ውጤት የመጨረሻው ውጤት ይሆናል።",
    },
  },
  {
    id: "understand-not-speak",
    question: {
      he: "אני מבין/ה אמהרית אבל לא מדבר/ת. מאיפה מתחילים?",
      en: "I understand Amharic but do not speak it. Where do I start?",
      am: "አማርኛ እረዳለሁ ግን አልናገርም። ከየት ልጀምር?",
    },
    answer: {
      he: "מנקודת פתיחה טובה מאוד. אתם כבר מחזיקים את הצלילים ואת הקצב — החלקים הקשים ביותר לרכישה מאוחרת. שני צעדים מעשיים: ראשית האותיות, כי הן פותחות גישה לכל חומר כתוב ומייצבות את אוצר המילים; שנית משפטים קצרים שאתם אומרים בפועל בבית, גם אם עם שגיאות. ההורים והסבים כמעט תמיד עוזרים לתקן ברגע שמבינים שאתם מנסים ברצינות.",
      en: "From a very good starting point. You already hold the sounds and the rhythm — the hardest parts to acquire later. Two practical steps: first the letters, because they unlock every written source and anchor vocabulary; second, short sentences you actually use at home, mistakes and all. Parents and grandparents almost always help correct once they see you are seriously trying.",
      am: "በጣም ጥሩ መነሻ ላይ ናችሁ። ድምጹንና ምቱን አስቀድማችሁ ይዛችኋል። መጀመሪያ ፊደሉን ተማሩ፤ ከዚያም በቤት ውስጥ አጫጭር ዓረፍተ ነገሮችን ተጠቀሙ።",
    },
  },
  {
    id: "gender-forms",
    question: {
      he: "למה לחלק מהמשפטים יש שתי גרסאות?",
      en: "Why do some phrases have two versions?",
      am: "አንዳንድ ሐረጎች ለምን ሁለት ቅርጾች አሏቸው?",
    },
    answer: {
      he: "כי באמהרית הפועל משתנה לפי מין הנמען — למי אתם פונים, לא מי אתם. “אני אוהב/ת אותך” לאישה הוא אֶוֶדִּשָׁלֶהוּ ולגבר אֶוֶדִּהָלֶהוּ. זו הטעות הנפוצה ביותר של מתחילים, וגם זו שסבתא תשמע מיד. ברשימה למעלה מופיעות שתי הצורות בכל מקום שבו הן שונות.",
      en: "Because in Amharic the verb changes according to the gender of the person addressed — who you are speaking to, not who you are. “I love you” to a woman is əwäddəšallähu and to a man əwäddəhallähu. It is the most common beginner mistake, and the one a grandmother notices instantly. Both forms are given above wherever they differ.",
      am: "በአማርኛ ግሱ በሚነገርለት ሰው ጾታ መሠረት ይለወጣል። ስለዚህ ሁለቱም ቅርጾች ተሰጥተዋል።",
    },
  },
];

export interface AmharicSourceRef {
  name: L;
  url: string;
}

export const AMHARIC_HUB_SOURCES: AmharicSourceRef[] = [
  {
    name: {
      he: "משרד החינוך — חוזר מנכ“ל: לימודי השפה האמהרית במערכת החינוך",
      en: "Ministry of Education — director-general circular: Amharic language studies in the education system",
      am: "የትምህርት ሚኒስቴር — የአማርኛ ቋንቋ ትምህርት ማስታወቂያ",
    },
    url: "https://apps.education.gov.il/mankal/Horaa.aspx?siduri=340",
  },
  {
    name: {
      he: "משרד החינוך — המרחב הפדגוגי, אמהרית (תוכנית לימודים וחומרי הוראה)",
      en: "Ministry of Education — pedagogical portal, Amharic (curriculum and teaching materials)",
      am: "የትምህርት ሚኒስቴር — የአማርኛ ትምህርታዊ መድረክ",
    },
    url: "https://pop.education.gov.il/tchumey_daat/amharic/",
  },
  {
    name: {
      he: "אוניברסיטת תל אביב — החוג ללשון העברית ולבלשנות שמית (געז ואמהרית)",
      en: "Tel Aviv University — Hebrew Language and Semitic Linguistics (Ge'ez and Amharic)",
      am: "የቴል አቪቭ ዩኒቨርሲቲ — የሴማዊ ቋንቋዎች ጥናት ክፍል",
    },
    url: "https://humanities.tau.ac.il/hebrew/semitic/program",
  },
  {
    name: {
      he: "Unicode — טבלת הקודים של הכתב האתיופי (U+1200–U+137F)",
      en: "Unicode — the Ethiopic script code chart (U+1200–U+137F)",
      am: "ዩኒኮድ — የኢትዮጵያ ፊደል ኮድ ሰንጠረዥ",
    },
    url: "https://www.unicode.org/charts/PDF/U1200.pdf",
  },
];

/** Short UI labels for the hub. Kept here, not in `messages/*` — page-specific. */
export const AMHARIC_HUB_COPY: Record<string, L> = {
  summaryHeading: {
    he: "בקצרה, באמהרית",
    en: "In brief, in Amharic",
    am: "በአጭሩ፣ በአማርኛ",
  },
  fidelHeading: {
    he: "טבלת הפידל המלאה",
    en: "The full fidel chart",
    am: "ሙሉ የፊደል ሰንጠረዥ",
  },
  fidelIntro: {
    he: "34 עיצורים, שבע תנועות, 238 הברות. לחצו על סימן כדי לראות אותו גדול, עם התעתיק ושם הצורה.",
    en: "34 consonants, seven vowels, 238 syllables. Tap a character to see it large, with its romanisation and the name of its order.",
    am: "34 ተነባቢዎች፣ ሰባት አናባቢዎች፣ 238 ክፍለ-ቃላት። ምልክቱን ተጭነው በትልቁ ይዩት።",
  },
  fidelHint: {
    he: "בחרו סימן בטבלה",
    en: "Pick a character from the chart",
    am: "ከሰንጠረዡ ምልክት ይምረጡ",
  },
  fidelConsonantLabel: {
    he: "עיצור",
    en: "Consonant",
    am: "ተነባቢ",
  },
  fidelOrderLabel: {
    he: "צורה",
    en: "Order",
    am: "ቅርጽ",
  },
  fidelRowHeaderLabel: {
    he: "עיצור בסיס",
    en: "Base consonant",
    am: "መሠረታዊ ተነባቢ",
  },
  phrasesHeading: {
    he: "מילים ומשפטים למשפחה",
    en: "Words and sentences for the family",
    am: "ለቤተሰብ የሚሆኑ ቃላትና ሐረጎች",
  },
  phrasesIntro: {
    he: "התעתיק הלטיני הוא תעתיק מדעי ולא הגייה מדויקת — ə היא תנועה קצרה וסתומה, ו-ṭ, ṣ, q הם עיצורים נחצים שאין להם מקבילה בעברית. הדרך הטובה ביותר ללמוד את ההגייה היא לבקש מדובר/ת שיקריאו לכם.",
    en: "The Latin transliteration is a scholarly romanisation, not a pronunciation guide — ə is a short central vowel, and ṭ, ṣ, q are ejective consonants with no Hebrew equivalent. The best way to learn the pronunciation is to ask a speaker to read them to you.",
    am: "የላቲን ፊደል ጽሑፉ ሳይንሳዊ ግልባጭ እንጂ ትክክለኛ አነባበብ አይደለም። አነባበቡን ለመማር ተናጋሪ እንዲያነብልዎ ይጠይቁ።",
  },
  coursesHeading: {
    he: "איפה לומדים — רשימה מאומתת",
    en: "Where to study — a verified list",
    am: "የት እንደሚማሩ — የተረጋገጠ ዝርዝር",
  },
  coursesIntro: {
    he: "כל מקום ברשימה נבדק ונקרא בתאריך הפרסום. אנחנו כותבים רק מה שכתוב באתר של הגוף עצמו.",
    en: "Every entry here was checked and read on the publication date. We state only what the provider's own site says.",
    am: "እያንዳንዱ ግቤት በታተመበት ቀን ተረጋግጧል።",
  },
  audienceLabel: { he: "למי מיועד", en: "Who it is for", am: "ለማን" },
  costLabel: { he: "עלות", en: "Cost", am: "ዋጋ" },
  contactLabel: { he: "יצירת קשר", en: "Contact", am: "ግንኙነት" },
  visitLabel: { he: "לאתר", en: "Visit site", am: "ወደ ድረ-ገጽ" },
  gapHeading: {
    he: "מה לא מצאנו",
    en: "What we did not find",
    am: "ያላገኘነው",
  },
  faqHeading: { he: "שאלות נפוצות", en: "Frequently asked questions", am: "ተደጋጋሚ ጥያቄዎች" },
  sourcesHeading: { he: "מקורות", en: "Sources", am: "ምንጮች" },
  relatedHeading: {
    he: "קשור לעמוד הזה",
    en: "Related to this page",
    am: "ተዛማጅ",
  },
  lastReviewedLabel: { he: "עודכן לאחרונה", en: "Last reviewed", am: "የመጨረሻ ክለሳ" },
};

export function amharicHubCopy(
  key: keyof typeof AMHARIC_HUB_COPY,
  locale: Locale,
): string {
  return AMHARIC_HUB_COPY[key]![locale];
}

/** Cross-links out of the hub — the glossary link is the reciprocal of TED-147's brief. */
export const AMHARIC_HUB_CROSSLINKS: Array<{ path: string; label: L }> = [
  {
    path: "/glossary/geez",
    label: {
      he: "געז — שפת התפילה של ביתא ישראל",
      en: "Ge'ez — the prayer language of Beta Israel",
      am: "ግዕዝ — የቤታ እስራኤል የጸሎት ቋንቋ",
    },
  },
  {
    path: "/glossary/orit",
    label: {
      he: "אוריית — הספר הקדוש הכתוב בגעז",
      en: "Orit — the sacred book written in Ge'ez",
      am: "ኦሪት — በግዕዝ የተጻፈው ቅዱስ መጽሐፍ",
    },
  },
  {
    path: "/glossary",
    label: {
      he: "מילון המושגים — כל המונחים של הקהילה",
      en: "The glossary — every term the community uses",
      am: "የቃላት መዝገብ",
    },
  },
  {
    path: amharicUlpanPath(),
    label: {
      he: "אולפן עברית להורים ולסבים — הכיוון ההפוך",
      en: "Hebrew ulpan for parents and grandparents — the other direction",
      am: "ለወላጆች የዕብራይስጥ ኡልፓን",
    },
  },
  {
    path: "/professionals/amharic",
    label: {
      he: "אנשי מקצוע דוברי אמהרית",
      en: "Amharic-speaking professionals",
      am: "አማርኛ ተናጋሪ ባለሙያዎች",
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Ulpan: /education/amharic/ulpan
// ═══════════════════════════════════════════════════════════════════════════

export const ULPAN_TITLE: L = {
  he: "אולפן עברית להורים ולסבים יוצאי אתיופיה — ומה לשאול לפני שנרשמים",
  en: "Hebrew ulpan for Ethiopian-Israeli parents and grandparents — and what to ask before enrolling",
  am: "ለኢትዮጵያ-እስራኤላውያን ወላጆች የዕብራይስጥ ኡልፓን — ከመመዝገብዎ በፊት ምን መጠየቅ እንዳለብዎ",
};

export const ULPAN_SUBTITLE: L = {
  he: "אולפני עברית למבוגרים פועלים בכל הארץ בניהול משרד החינוך, ויש רשימה רשמית. מה שאין הוא מידע מרוכז על תמיכה באמהרית — לכן הדף הזה נותן את הרשימה, ואת השאלות המדויקות שכדאי לשאול בטלפון.",
  en: "Adult Hebrew ulpanim run nationwide under the Ministry of Education, and there is an official list. What does not exist is centralised information about Amharic support — so this page gives you the list, and the exact questions worth asking on the phone.",
  am: "የአዋቂዎች የዕብራይስጥ ኡልፓኖች በትምህርት ሚኒስቴር ሥር በመላ አገሪቱ ይሠራሉ። ይህ ገጽ ዝርዝሩንና በስልክ መጠየቅ ያለብዎትን ጥያቄዎች ይሰጣል።",
};

export const ULPAN_AMHARIC_SUMMARY = `ዕብራይስጥ መማር ትፈልጋላችሁ? በእስራኤል ውስጥ ለአዋቂዎች የዕብራይስጥ ኡልፓኖች በትምህርት ሚኒስቴር ሥር በመላ አገሪቱ ይሠራሉ። ሚኒስቴሩ በአራት አውራጃዎች የተከፋፈለ ብሔራዊ ዝርዝር ያሳትማል፤ የእያንዳንዱ ኡልፓን የመገናኛ መረጃ በዝርዝሩ ውስጥ አለ።

አማርኛ የሚናገር መምህር ወይም ረዳት በኡልፓኑ ውስጥ አለ ወይ የሚለው በአንድ ቦታ ተጠቃሎ አልተጻፈም። ስለዚህ በቀጥታ ወደ ኡልፓኑ መደወልና መጠየቅ ያስፈልጋል። ወጪውና የምዝገባው ሂደትም ከኡልፓን ኡልፓን ይለያያል።

በዚህ ገጽ ላይ በስልክ መጠየቅ ያለባችሁን ጥያቄዎች አዘጋጅተናል።`;

export const ULPAN_BODY: L = {
  he: `אולפן הוא מסגרת ללימוד עברית למבוגרים, בניהול אגף החינוך למבוגרים במשרד החינוך. אולפנים פועלים ברחבי הארץ, והמשרד מפרסם רשימה ארצית מחולקת לארבעה מחוזות — תל אביב והמרכז, ירושלים, חיפה והצפון, והדרום — עם פרטי קשר לכל אולפן.

מה שהרשימה הרשמית לא אומרת הוא איזו תמיכה בשפת אם קיימת בכל אולפן. אין באתר משרד החינוך מידע מרוכז על כך, ולכן אין דרך לדעת מראש אם באולפן מסוים יש מורה או סייע/ת דובר/ת אמהרית. הדרך היחידה לברר היא להתקשר ולשאול.

## מה כן מתועד — וכהיסטוריה, לא כשירות זמין

לאורך השנים משרד החינוך תיעד וסקר מודלי הוראה ייעודיים לעולים בוגרים יוצאי אתיופיה. אחד מהם שילב שני מורים בכיתה במקביל: מורה יוצא/ת אתיופיה דובר/ת אמהרית שלימד/ה אוצר מילים ויצר/ה גשר תרבותי, לצד מורה ותיק/ה שהוביל/ה את רכישת העברית.

חשוב להיות מדויקים לגבי המעמד של המודל הזה היום. מאמר של אגף החינוך למבוגרים משנת 2014, שסקר את השינויים בתוכנית הלימודים לעולי אתיופיה בין 1988 ל-2014, קובע במפורש: “בכיתות בודדות לימדו במקביל שני מורים, מורה בן העדה ומורה ותיק, אלא שלא ניתן היה להטמיע דרך זו בכל המערכת, מחמת אילוצי תקציב”.

כלומר — המודל נוסה בכיתות בודדות ולא הפך לתקן ארצי. בבדיקה שערכנו לא אותר אף אולפן שמפעיל אותו כיום. אנחנו מביאים אותו כאן כרקע היסטורי בלבד, ולא כשירות שאפשר לבקש בשמו. אם תגיעו לאולפן ותבקשו “אולפן דו-לשוני”, סביר שלא יידעו על מה אתם מדברים. השאלות בהמשך הדף מנוסחות בלשון שכן תעבוד בטלפון.

## למה זה בכל זאת שווה לשאול

תמיכה בשפת אם באולפן אינה מותרות. עולים בוגרים יוצאי אתיופיה מתמודדים עם חסמים שאינם קיימים אצל לומדים מרקעים אחרים — לעיתים פער אוריינות בשפת האם עצמה, מרחק מהשיטה הפרונטלית-כתובה המקובלת, וקושי להיעזר בחומרי לימוד עצמאיים בעברית מהיום הראשון. גם סייע/ת דובר/ת אמהרית בשעות מסוימות, או קבוצה שבה יש עוד לומדים דוברי אמהרית, משנים את החוויה.

לכן שווה להתקשר ליותר מאולפן אחד לפני שנרשמים, גם אם אחד מהם קרוב יותר לבית.

## מה עוד כדאי לדעת

עלות, תהליך ההרשמה המדויק ותנאי הקבלה משתנים בין אולפן לאולפן ואינם מפורטים במרוכז באתר משרד החינוך. יש לברר אותם ישירות מול האולפן שבחרתם.

אם אתם בני משפחה שעוזרים להורה או לסב/סבתא — הצעד המועיל ביותר הוא בדרך כלל לעשות את שיחות הטלפון האלה יחד איתם, ולא במקומם.`,
  en: `An ulpan is a Hebrew-learning framework for adults, run by the Adult Education Division of the Ministry of Education. Ulpanim operate nationwide, and the ministry publishes a national list divided into four districts — Tel Aviv and Centre, Jerusalem, Haifa and the North, and the South — with contact details for each ulpan.

What the official list does not say is what mother-tongue support each ulpan offers. The ministry's site carries no centralised information about this, so there is no way to know in advance whether a given ulpan has an Amharic-speaking teacher or aide. The only way to find out is to call and ask.

## What is documented — and as history, not as an available service

Over the years the Ministry of Education documented and reviewed dedicated teaching models for adult Ethiopian-born immigrants. One of them placed two teachers in the classroom at once: an Ethiopian-born, Amharic-speaking teacher who taught vocabulary and built a cultural bridge, alongside a veteran teacher who led the Hebrew acquisition itself.

It matters to be precise about that model's status today. A 2014 article by the Adult Education Division, reviewing changes to the curriculum for Ethiopian immigrants between 1988 and 2014, states explicitly: "in individual classrooms two teachers taught in parallel, a teacher from the community and a veteran teacher, but it was not possible to embed this approach across the system, owing to budget constraints."

So the model was tried in individual classrooms and never became a national standard. Our own check found no ulpan running it today. We present it here as historical background only, not as a service you can request by name. If you walk into an ulpan and ask for a "bilingual ulpan", they will most likely not know what you mean. The questions further down this page are phrased in language that will actually work on the phone.

## Why it is still worth asking

Mother-tongue support at an ulpan is not a luxury. Adult Ethiopian-born immigrants face barriers that learners from other backgrounds do not — sometimes a literacy gap in the mother tongue itself, distance from the standard frontal, text-based method, and difficulty using independent Hebrew study materials from day one. Even an Amharic-speaking aide for part of the week, or a group with other Amharic-speaking learners in it, changes the experience.

So it is worth calling more than one ulpan before enrolling, even if one of them is closer to home.

## What else to know

Cost, the exact registration process and admission terms vary between ulpanim and are not listed centrally on the ministry's site. Check them directly with the ulpan you choose.

If you are a family member helping a parent or grandparent — the most useful thing you can usually do is make these phone calls together with them, rather than instead of them.`,
  am: `ኡልፓን በትምህርት ሚኒስቴር የአዋቂዎች ትምህርት ክፍል ሥር የሚተዳደር የአዋቂዎች የዕብራይስጥ መማሪያ ማዕቀፍ ነው። ኡልፓኖች በመላ አገሪቱ ይሠራሉ፤ ሚኒስቴሩም በአራት አውራጃዎች የተከፋፈለ ብሔራዊ ዝርዝር ያሳትማል።

ኦፊሴላዊው ዝርዝር የማይናገረው እያንዳንዱ ኡልፓን ምን ዓይነት የአፍ መፍቻ ቋንቋ ድጋፍ እንደሚሰጥ ነው። ስለዚህ አስቀድሞ ማወቅ አይቻልም — መደወልና መጠየቅ ብቻ ነው መንገዱ።

## የተመዘገበው — እንደ ታሪክ እንጂ እንደ ተገኝ አገልግሎት አይደለም

በዓመታት ውስጥ ሚኒስቴሩ ለኢትዮጵያ ተወላጅ አዋቂ ስደተኞች የተለዩ የማስተማሪያ ሞዴሎችን መዝግቧል። ከእነሱ አንዱ በአንድ ክፍል ውስጥ ሁለት መምህራንን አስቀምጦ ነበር፦ አማርኛ የሚናገር የማህበረሰቡ አባልና ልምድ ያለው መምህር።

ይሁን እንጂ በ2014 የወጣ የሚኒስቴሩ ጽሑፍ ይህ ሞዴል “በጥቂት ክፍሎች ብቻ” እንደተሞከረና በበጀት እጥረት ምክንያት በመላው ሥርዓት ሊተገበር እንዳልቻለ በግልጽ ይናገራል። ዛሬ ይህን ሞዴል የሚያሠራ ኡልፓን አላገኘንም። ስለዚህ እዚህ የቀረበው እንደ ታሪካዊ ዳራ ብቻ ነው።

## ለምን አሁንም መጠየቅ እንደሚያስፈልግ

የአፍ መፍቻ ቋንቋ ድጋፍ ቅንጦት አይደለም። ስለዚህ ከመመዝገብዎ በፊት ከአንድ በላይ ኡልፓን ይደውሉ።

ወጪው፣ የምዝገባው ሂደትና የመግቢያ ሁኔታዎች ከኡልፓን ኡልፓን ይለያያሉ፤ በቀጥታ ይጠይቁ።`,
};

interface LocalizedStep {
  id: string;
  title: L;
  detail: L;
  officialUrl?: string;
  officialLabel?: L;
  internalPath?: string;
  internalLabel?: L;
}

export const ULPAN_STEPS: LocalizedStep[] = [
  {
    id: "find-list",
    title: {
      he: "פתחו את רשימת האולפנים הרשמית",
      en: "Open the official ulpan list",
      am: "ኦፊሴላዊውን የኡልፓን ዝርዝር ይክፈቱ",
    },
    detail: {
      he: "משרד החינוך מפרסם רשימה ארצית מחולקת לארבעה מחוזות, עם פרטי קשר לכל אולפן. בחרו שניים או שלושה קרובים אליכם — לא רק אחד.",
      en: "The Ministry of Education publishes a national list divided into four districts, with contact details for each ulpan. Pick two or three near you — not just one.",
      am: "ሚኒስቴሩ በአራት አውራጃዎች የተከፋፈለ ዝርዝር ያሳትማል። ሁለት ወይም ሦስት ቅርብ የሆኑትን ይምረጡ።",
    },
    officialUrl: "https://adult-education.education.gov.il/inheritance_language/olpanim/",
    officialLabel: {
      he: "רשימת האולפנים — משרד החינוך",
      en: "Ulpan list — Ministry of Education",
      am: "የኡልፓን ዝርዝር — የትምህርት ሚኒስቴር",
    },
  },
  {
    id: "ask-amharic",
    title: {
      he: "שאלו: יש מורה או סייע/ת דובר/ת אמהרית?",
      en: "Ask: is there an Amharic-speaking teacher or aide?",
      am: "ይጠይቁ፦ አማርኛ የሚናገር መምህር ወይም ረዳት አለ?",
    },
    detail: {
      he: "זו השאלה המרכזית, וכדאי לשאול אותה בדיוק כך ולא לבקש “אולפן דו-לשוני” — מונח שלא בהכרח מוכר להם. אם התשובה שלילית, שאלו גם אם יש בקבוצה לומדים נוספים דוברי אמהרית.",
      en: "This is the central question, and it is worth asking it in exactly those words rather than requesting a “bilingual ulpan” — a term they will not necessarily recognise. If the answer is no, also ask whether the group has other Amharic-speaking learners in it.",
      am: "ዋናው ጥያቄ ይህ ነው። “ሁለት ቋንቋ ኡልፓን” ብለው አይጠይቁ — ላያውቁት ይችላሉ። መልሱ አይ ከሆነ በቡድኑ ውስጥ ሌሎች አማርኛ ተናጋሪዎች እንዳሉ ይጠይቁ።",
    },
  },
  {
    id: "ask-level",
    title: {
      he: "שאלו באיזו רמה מתאים להתחיל",
      en: "Ask which level is the right starting point",
      am: "ከየትኛው ደረጃ መጀመር እንዳለብዎ ይጠይቁ",
    },
    detail: {
      he: "אולפן א' הוא רמת המתחילים ואולפן ב' ההמשך. אם יש פער אוריינות גם באמהרית — אמרו את זה בשיחה. זה משנה את ההמלצה, וזו לא בושה.",
      en: "Ulpan Aleph is the beginners' level and Ulpan Bet the continuation. If there is a literacy gap in Amharic too — say so on the call. It changes the recommendation, and it is nothing to be ashamed of.",
      am: "ኡልፓን አሌፍ የጀማሪዎች ደረጃ ነው። በአማርኛም የማንበብ ችግር ካለ በስልኩ ላይ ይናገሩ።",
    },
  },
  {
    id: "ask-practical",
    title: {
      he: "בררו שעות, משך, עלות ותנאי הרשמה",
      en: "Check hours, length, cost and registration terms",
      am: "ሰዓት፣ ቆይታ፣ ወጪና የምዝገባ ሁኔታዎችን ይጠይቁ",
    },
    detail: {
      he: "אלה משתנים בין אולפנים ואינם מפורסמים במרוכז. שאלו גם על שעות הלימוד — אולפן בשעות שלא מסתדרות עם העבודה או עם הנכדים לא יחזיק מעמד.",
      en: "These vary between ulpanim and are not published centrally. Ask about class hours too — an ulpan at hours that clash with work or with the grandchildren will not last.",
      am: "እነዚህ ከኡልፓን ኡልፓን ይለያያሉ። ስለ ትምህርት ሰዓቱም ይጠይቁ።",
    },
  },
  {
    id: "compare",
    title: {
      he: "השוו בין שניים לפני שנרשמים",
      en: "Compare two before enrolling",
      am: "ከመመዝገብዎ በፊት ሁለቱን ያወዳድሩ",
    },
    detail: {
      he: "ההבדל בין אולפנים בתמיכה בשפת אם ובהרכב הקבוצה גדול, והוא לא מופיע בשום רשימה. חמש-עשרה דקות של שיחות טלפון חוסכות שנה של תסכול.",
      en: "The difference between ulpanim in mother-tongue support and group composition is large, and appears on no list. Fifteen minutes of phone calls saves a year of frustration.",
      am: "በኡልፓኖች መካከል ያለው ልዩነት ትልቅ ነው፤ በየትኛውም ዝርዝር ላይ አይታይም። አሥራ አምስት ደቂቃ የስልክ ጥሪ አንድ ዓመት ብስጭት ያድናል።",
    },
  },
];

export const ULPAN_FAQ: Array<{ id: string; question: L; answer: L }> = [
  {
    id: "is-there-bilingual",
    question: {
      he: "יש אולפן דו-לשוני עברית-אמהרית?",
      en: "Is there a bilingual Hebrew-Amharic ulpan?",
      am: "የዕብራይስጥ-አማርኛ ሁለት ቋንቋ ኡልፓን አለ?",
    },
    answer: {
      he: "לא כשירות שאפשר להירשם אליו בשם הזה. מודל של שני מורים במקביל — אחד דובר אמהרית ואחד ותיק — מתועד בפרסומי משרד החינוך, אבל מאמר של אגף החינוך למבוגרים מ-2014 קובע שהוא נוסה בכיתות בודדות ולא הוטמע בכל המערכת מחמת אילוצי תקציב. בבדיקה שערכנו לא אותר אף אולפן שמפעיל אותו כיום. מה שכן קיים הוא אולפנים רבים ברחבי הארץ שבחלקם יש צוות דובר אמהרית — וזה מה שכדאי לברר בטלפון.",
      en: "Not as a service you can enrol in under that name. A two-teacher model — one Amharic-speaking, one veteran — is documented in Ministry of Education publications, but a 2014 article by the Adult Education Division states that it was tried in individual classrooms and never embedded across the system, owing to budget constraints. Our own check found no ulpan running it today. What does exist is many ulpanim nationwide, some of which have Amharic-speaking staff — and that is what to check on the phone.",
      am: "በዚያ ስም መመዝገብ የሚቻል አገልግሎት የለም። የሁለት መምህራን ሞዴል በሚኒስቴሩ ጽሑፎች ተመዝግቧል፤ ግን በ2014 ጽሑፍ መሠረት በጥቂት ክፍሎች ብቻ ተሞክሮ በበጀት እጥረት አልተስፋፋም። ዛሬ የሚያሠራው ኡልፓን አላገኘንም።",
    },
  },
  {
    id: "cost",
    question: {
      he: "כמה עולה אולפן?",
      en: "How much does an ulpan cost?",
      am: "ኡልፓን ስንት ያስከፍላል?",
    },
    answer: {
      he: "העלות משתנה בין אולפן לאולפן ואינה מפורסמת במרוכז באתר משרד החינוך, ולכן אנחנו לא נוקבים במספר. שאלו על כך בשיחת הטלפון, ושאלו במפורש גם אם יש הנחה או פטור למי שעומד בתנאים מסוימים.",
      en: "The cost varies between ulpanim and is not published centrally on the ministry's site, so we do not quote a figure. Ask about it on the call, and ask explicitly whether there is a discount or exemption for those who meet certain conditions.",
      am: "ወጪው ከኡልፓን ኡልፓን ይለያያል፤ በማዕከል አልታተመም። በስልኩ ላይ ይጠይቁ።",
    },
  },
  {
    id: "too-old",
    question: {
      he: "ההורה שלי בן 70. זה לא מאוחר מדי?",
      en: "My parent is 70. Is it too late?",
      am: "ወላጄ 70 ዓመቱ ነው። አልረፈደም?",
    },
    answer: {
      he: "אולפנים למבוגרים אינם מוגבלים בגיל. מה שכן משנה בגיל מבוגר הוא ההתאמה של המסגרת: קצב, גודל קבוצה, שעות, ותמיכה בשפת אם. אלה בדיוק הדברים שהשאלות בדף הזה נועדו לברר. שווה גם לשאול אם יש קבוצה שבה רוב הלומדים בגיל דומה.",
      en: "Adult ulpanim have no age limit. What does matter at an older age is the fit of the framework: pace, group size, hours, and mother-tongue support. Those are exactly what the questions on this page are for. It is also worth asking whether there is a group where most learners are of a similar age.",
      am: "የአዋቂዎች ኡልፓኖች የዕድሜ ገደብ የላቸውም። በዕድሜ የሚለወጠው የማዕቀፉ ተስማሚነት ነው፦ ፍጥነት፣ የቡድን መጠን፣ ሰዓትና የአፍ መፍቻ ቋንቋ ድጋፍ።",
    },
  },
  {
    id: "help-parent",
    question: {
      he: "אני רוצה לעזור להורה שלי להירשם. מה הכי מועיל?",
      en: "I want to help my parent enrol. What helps most?",
      am: "ወላጄን ለመመዝገብ መርዳት እፈልጋለሁ። ምን ይጠቅማል?",
    },
    answer: {
      he: "לעשות את שיחות הטלפון יחד איתם ולא במקומם. הם אלה שילמדו שם, והם אלה שצריכים להתרשם מהאדם שעונה. התפקיד שלכם הוא בדרך כלל להכין את הרשימה, לשבת לידם בשיחה, ולרשום את התשובות.",
      en: "Make the phone calls together with them, not instead of them. They are the ones who will study there, and they are the ones who need to form an impression of whoever answers. Your role is usually to prepare the list, sit beside them during the call, and write down the answers.",
      am: "ጥሪዎቹን ከእነሱ ጋር ያድርጉ እንጂ በእነሱ ምትክ አይደለም። እነሱ ናቸው የሚማሩት። ሚናዎ ዝርዝሩን ማዘጋጀትና መልሶቹን መጻፍ ነው።",
    },
  },
];

export const ULPAN_RESOURCES: Array<{
  name: L;
  url: string;
  description: L;
  phone?: string;
}> = [
  {
    name: {
      he: "רשימת האולפנים הארצית — משרד החינוך",
      en: "National ulpan list — Ministry of Education",
      am: "ብሔራዊ የኡልፓን ዝርዝር — የትምህርት ሚኒስቴር",
    },
    url: "https://adult-education.education.gov.il/inheritance_language/olpanim/",
    description: {
      he: "הרשימה הרשמית, מחולקת לארבעה מחוזות עם פרטי קשר לכל אולפן. זו נקודת ההתחלה.",
      en: "The official list, divided into four districts with contact details for each ulpan. This is the starting point.",
      am: "ኦፊሴላዊው ዝርዝር፣ በአራት አውራጃዎች የተከፋፈለ።",
    },
  },
  {
    name: {
      he: "המרחב הפדגוגי — עולים חדשים, משרד החינוך",
      en: "Pedagogical portal — new immigrants, Ministry of Education",
      am: "የትምህርት መድረክ — አዲስ ስደተኞች",
    },
    url: "https://pop.education.gov.il/new-immigrants/",
    description: {
      he: "מידע כללי של משרד החינוך על לימודי עברית ועל קליטת עולים במערכת החינוך.",
      en: "General Ministry of Education information on Hebrew studies and immigrant absorption in the education system.",
      am: "ስለ ዕብራይስጥ ትምህርት አጠቃላይ መረጃ።",
    },
  },
];

export const ULPAN_SOURCES: AmharicSourceRef[] = [
  {
    name: {
      he: "משרד החינוך — רשימת אולפנים ארצית",
      en: "Ministry of Education — national ulpan list",
      am: "የትምህርት ሚኒስቴር — ብሔራዊ የኡልፓን ዝርዝር",
    },
    url: "https://adult-education.education.gov.il/inheritance_language/olpanim/",
  },
  {
    name: {
      he: "משרד החינוך — עלייה וקליטה של יהודי אתיופיה: אתגרי קליטתם הלשונית של עולים מבוגרים, 1998–2013 (הד האולפן החדש 102, 2014)",
      en: "Ministry of Education — Immigration and absorption of Ethiopian Jews: linguistic absorption challenges of adult immigrants, 1998–2013 (Hed HaUlpan HeHadash 102, 2014)",
      am: "የትምህርት ሚኒስቴር — የኢትዮጵያ አይሁዶች ፍልሰትና ውህደት (2014)",
    },
    url: "https://meyda.education.gov.il/files/AdultEducation/hed_haulpan/hed_1_102_sara_rubinshtain.pdf",
  },
  {
    name: {
      he: "משרד החינוך — קליטת עולי אתיופיה בהיבט לשוני, חברתי וחינוכי (הד האולפן החדש 99, 2012)",
      en: "Ministry of Education — Absorbing Ethiopian immigrants: linguistic, social and educational aspects (Hed HaUlpan HeHadash 99, 2012)",
      am: "የትምህርት ሚኒስቴር — የኢትዮጵያ ስደተኞች ውህደት (2012)",
    },
    url: "https://meyda.education.gov.il/files/AdultEducation/hed_haulpan/hed_1_99_einat_ben_yehuda.pdf",
  },
];

export const ULPAN_COPY: Record<string, L> = {
  summaryHeading: { he: "בקצרה, באמהרית", en: "In brief, in Amharic", am: "በአጭሩ፣ በአማርኛ" },
  stepsHeading: {
    he: "מה לעשות — חמישה צעדים",
    en: "What to do — five steps",
    am: "ምን ማድረግ — አምስት እርምጃዎች",
  },
  bodyHeading: {
    he: "המדריך המלא",
    en: "The full guide",
    am: "ሙሉ መመሪያ",
  },
  faqHeading: { he: "שאלות נפוצות", en: "Frequently asked questions", am: "ተደጋጋሚ ጥያቄዎች" },
  crosslinkHeading: {
    he: "והכיוון ההפוך",
    en: "And the other direction",
    am: "እና ተቃራኒው አቅጣጫ",
  },
  crosslinkBody: {
    he: "שפה במשפחה זורמת לשני הכיוונים: ההורים לומדים עברית, והילדים והנכדים לומדים אמהרית.",
    en: "Language in a family flows both ways: the parents learn Hebrew, and the children and grandchildren learn Amharic.",
    am: "በቤተሰብ ውስጥ ቋንቋ በሁለቱም አቅጣጫ ይፈስሳል።",
  },
  resourcesHeading: { he: "קישורים רשמיים", en: "Official links", am: "ኦፊሴላዊ አገናኞች" },
  sourcesHeading: { he: "מקורות", en: "Sources", am: "ምንጮች" },
  websiteLabel: { he: "לאתר", en: "Visit site", am: "ወደ ድረ-ገጽ" },
  disclaimer: {
    he: "המידע בדף זה נכון לתאריך העדכון ומבוסס על פרסומי משרד החינוך. תנאי הרשמה, עלויות והרכב הצוות משתנים בין אולפנים — יש לאמת מול האולפן עצמו לפני הרשמה.",
    en: "The information on this page is current as of the review date and is based on Ministry of Education publications. Registration terms, costs and staffing vary between ulpanim — verify with the ulpan itself before enrolling.",
    am: "በዚህ ገጽ ላይ ያለው መረጃ በክለሳው ቀን ትክክል ነው። ከመመዝገብዎ በፊት ከኡልፓኑ ጋር ያረጋግጡ።",
  },
};

export function ulpanCopy(key: keyof typeof ULPAN_COPY, locale: Locale): string {
  return ULPAN_COPY[key]![locale];
}

export function ulpanSteps(locale: Locale): GuideStep[] {
  return ULPAN_STEPS.map((s) => ({
    id: s.id,
    title: s.title[locale],
    detail: s.detail[locale],
    officialUrl: s.officialUrl,
    officialLabel: s.officialLabel?.[locale],
    internalPath: s.internalPath,
    internalLabel: s.internalLabel?.[locale],
  }));
}

export function ulpanFaq(locale: Locale): GuideFaqItem[] {
  return ULPAN_FAQ.map((f) => ({
    id: f.id,
    question: f.question[locale],
    answer: f.answer[locale],
  }));
}

export function ulpanResources(locale: Locale): GuideResource[] {
  return ULPAN_RESOURCES.map((r) => ({
    name: r.name[locale],
    url: r.url,
    description: r.description[locale],
    phone: r.phone,
  }));
}

export function ulpanSources(locale: Locale): GuideSource[] {
  return ULPAN_SOURCES.map((s) => ({ name: s.name[locale], url: s.url }));
}

export function ulpanCrosslinks(locale: Locale): GuideCrosslink[] {
  return [
    {
      path: amharicHubPath(),
      label: {
        he: "ללמוד אמהרית — האלפבית, מילים למשפחה, ואיפה לומדים",
        en: "Learning Amharic — the alphabet, family words, and where to study",
        am: "አማርኛ መማር",
      }[locale],
    },
    {
      path: "/glossary/geez",
      label: {
        he: "געז — שפת התפילה של ביתא ישראל",
        en: "Ge'ez — the prayer language of Beta Israel",
        am: "ግዕዝ",
      }[locale],
    },
    {
      path: "/professionals/amharic",
      label: {
        he: "אנשי מקצוע דוברי אמהרית",
        en: "Amharic-speaking professionals",
        am: "አማርኛ ተናጋሪ ባለሙያዎች",
      }[locale],
    },
  ];
}
