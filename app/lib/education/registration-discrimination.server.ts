// Guide: discrimination in school registration (TED-145).
//
// What סעיף 5 לחוק זכויות התלמיד actually prohibits, which institutions it
// binds (including מוסדות מוכרים שאינם רשמיים — the point most parents get
// wrong), and the escalation ladder with its real, regulation-backed
// deadlines.
//
// HE is source-of-truth (CLAUDE.md). EN + AM are full mirrors, and an Amharic
// summary renders on every locale of the page.
//
// VERIFIED against primary sources. Every claim below traces to one of:
//   - חוק זכויות התלמיד, התשס"א-2000 (ויקיטקסט consolidated text, cross-checked
//     against Nevo): §5(א) — the five prohibited grounds and the four
//     prohibited acts, "בין של הילד ובין של הוריו"; §5(ב) — one year's
//     imprisonment or a fine under §61(א)(3) לחוק העונשין; §16(ב) — the law
//     applies to a מוסד חינוך מוכר שאינו רשמי except §§6, 7 and 13, so §5
//     DOES bind them; §17 — the law adds to, and does not derogate from,
//     other laws.
//   - תקנות חינוך ממלכתי (מוסדות מוכרים), תשי"ד-1953, תקנה 3(א)(8) — absence of
//     discrimination "לרבות בהליך קבלתם" is a condition of recognition.
//   - חוק פיקוח על בתי ספר, התשכ"ט-1969, §15 — written warning, then licence
//     revocation if the condition is not met within three months.
//   - חוק לימוד חובה, התש"ט-1949: §3(א)/(אא) — where a child is registered;
//     §3(ב)(3) — an עולה child is registered within 30 days of aliyah;
//     §3א(ב) — the Minister may CANCEL a registration conducted unlawfully
//     and order it redone at the authority's expense; §7 — the State and the
//     local authority are jointly responsible.
//   - חוק חינוך ממלכתי, התשי"ג-1953: §20 — registration at the institution
//     nearest the residence; §21 — regulations govern רישום חריג.
//   - תקנות לימוד חובה וחינוך ממלכתי (רישום), תשי"ט-1959: תקנה 30 — 7-day
//     request for reconsideration, and the authority must consult מנהל המחוז
//     before rejecting; תקנה 7ד — a principal must report a freed place within
//     48 hours.
//   - תקנות חינוך ממלכתי (העברה), תשי"ט-1959: תקנה 8(ג) — a refusal must state
//     its reasons in writing; תקנה 11(א)-(ב) — 7-day appeal to מנהל המחוז,
//     decided within 7 days; תקנה 11(ד) — further appeal to the מנהל הכללי.
//   - מרכז המחקר והמידע של הכנסת: אתי וייסבלאי, "השתלבותם של יוצאי אתיופיה
//     במערכת החינוך", 12.8.2010 (the 42/11-school concentration figures and
//     the 1993 quota directive cancelled in December 2002); אתי וייסבלאי,
//     "נתונים על תלמידים יוצאי אתיופיה הזכאים לשירותי חינוך מיוחדים",
//     11.8.2022 (17.2% vs 12%).
//   - Ministry of Education contact channels verified live: *6552 and the
//     public-inquiries portal pnzportal.education.gov.il.
//   - היחידה הממשלתית לתיאום המאבק בגזענות: *3406, antiracismunit@justice.gov.il,
//     and the govforms complaint form, which is offered in Amharic.
//   - Tebeka's own contact page: 072-2424622, general@tebeka.org.il, Rehovot.
//
// DELIBERATELY EXCLUDED as unverifiable at the time of writing:
//   - The holdings, panel, date, school names and number of children in
//     בג"ץ 7426/08 טבקה נ' שרת החינוך ועיריית פתח-תקווה. The Supreme Court's
//     document server was unreachable, and every account of the ruling's
//     content traced only to secondary sources. The case is named here as a
//     docket reference for the fact that the matter was litigated — nothing
//     is asserted about what the Court held.
//   - Any claim that discrimination is a "עבירת משמעת" for a state employee
//     under חוק זכויות התלמיד. No such provision exists in the statute.
//   - Whether מוסדות פטור are bound by חוק זכויות התלמיד — §16 addresses only
//     רשמי and מוכר שאינו רשמי, and the question is left open here.
//   - The "קו פתוח לתלמידים" phone numbers, which could not be confirmed on a
//     live official page after the Ministry's site migration.
//   - Registration dates for a specific school year, which change annually and
//     are published in the חוזר מנכ"ל — the official page is linked instead.
//   - ENP's school-mediator coverage (number of schools, cities or mediators).
//     ENP does not publish it.
//
// Tone note (TED-145): this page describes procedure and rights. It does not
// editorialise about motives, and it does not tell a parent what happened to
// them — it tells them what the law says and what they can do next.
//
// Server-only module — do not import in client bundles.

import type { Locale } from "../i18n/config";
import type {
  GuideCrosslink,
  GuideFaqItem,
  GuideResource,
  GuideSource,
  GuideStep,
} from "../../components/sections/guide-page";
import { eligibilityCommitteePath, parentRightsPath } from "./links";

export interface LocalizedStep {
  id: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
  officialUrl?: string;
  officialLabel?: Record<Locale, string>;
  internalPath?: string;
  internalLabel?: Record<Locale, string>;
}

export interface LocalizedFaq {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export interface LocalizedResource {
  name: string;
  phone?: string;
  url: string;
  description: Record<Locale, string>;
}

export interface LocalizedSource {
  name: Record<Locale, string>;
  url: string;
}

export const DISCRIMINATION_TITLE: Record<Locale, string> = {
  he: "אפליה ברישום לבית ספר — מה נחשב אפליה, ומה עושים",
  en: "Discrimination in School Registration — What Counts, and What to Do",
  am: "በትምህርት ቤት ምዝገባ ላይ አድሎ — ምን እንደሚቆጠርና ምን ማድረግ እንደሚገባ",
};

export const DISCRIMINATION_SUBTITLE: Record<Locale, string> = {
  he: 'סעיף 5 לחוק זכויות התלמיד אוסר על אפליה ברישום "מטעמים עדתיים" ו"מטעמים של ארץ מוצא" — גם בבתי ספר מוכרים שאינם רשמיים. כאן מה בדיוק אסור, אילו מועדי ערר קצובים בתקנות, ולמי פונים.',
  en: 'Section 5 of the Student Rights Law prohibits discrimination in registration on communal and country-of-origin grounds — in recognised non-official schools too. Here is exactly what is prohibited, the appeal deadlines set in the regulations, and whom to contact.',
  am: "የተማሪ መብቶች ሕግ አንቀጽ 5 በምዝገባ ላይ በጎሳና በትውልድ ሀገር ምክንያት አድሎ ማድረግን ይከለክላል — በተመዘገቡ የግል ትምህርት ቤቶችም ጭምር። እዚህ ላይ በትክክል የተከለከለው ምንድን ነው፣ በደንቦቹ የተቀመጡት የይግባኝ ጊዜያት፣ እና ማንን ማነጋገር እንዳለብዎ።",
};

/** Rendered on every locale of the page — older parents rely on it. */
export const DISCRIMINATION_AMHARIC_SUMMARY = `ልጅዎ ወደ ትምህርት ቤት እንዳይመዘገብ ከተከለከለ፣ ወይም ምዝገባው በጎሳዎ ወይም በትውልድ ሀገርዎ ምክንያት እንደዘገየ ከተሰማዎት — ሕጉ ከጎንዎ ነው።

የተማሪ መብቶች ሕግ (2000) አንቀጽ 5 የአካባቢው የትምህርት ባለሥልጣን፣ የትምህርት ተቋሙ ወይም በእነሱ ስም የሚሠራ ማንኛውም ሰው በአራት ነገሮች ላይ አድሎ ማድረግን ይከለክላል፦ (1) ተማሪን በመመዝገብ፣ በመቀበል ወይም ከተቋሙ በማባረር፤ (2) በአንድ ተቋም ውስጥ የተለያዩ የትምህርት ፕሮግራሞችና የዕድገት መንገዶች በማበጀት፤ (3) በአንድ ተቋም ውስጥ የተለያዩ ክፍሎች በማቋቋም፤ (4) በተማሪዎች መብቶችና ግዴታዎች እንዲሁም በዲሲፕሊን ደንቦች ላይ።

የተከለከሉት ምክንያቶች ጎሳ፣ የትውልድ ሀገር፣ ማኅበራዊ-ኢኮኖሚያዊ ዳራ፣ ጾታዊ ዝንባሌ ወይም የጾታ ማንነት፣ እና የፖለቲካ አመለካከት ናቸው — **የልጁም ሆነ የወላጆቹ**። ይህን መጣስ በአንድ ዓመት እስራት ወይም በገንዘብ ቅጣት የሚያስቀጣ የወንጀል ድርጊት ነው (አንቀጽ 5(ב))።

ብዙ ወላጆች የሚሳሳቱበት ነጥብ፦ ይህ ሕግ **በተመዘገቡ ግን ይፋዊ ባልሆኑ ትምህርት ቤቶችም (מוסד מוכר שאינו רשמי) ላይ ይሠራል**። አንቀጽ 16(ב) አንቀጽ 5ን ከተፈጻሚነት አላገለለም። ከዚህም በላይ አድሎ አለመኖሩ — "በመቀበል ሂደታቸውም ጭምር" — ተቋሙ ዕውቅና እንዲኖረው ቅድመ ሁኔታ ነው፣ እና ቅድመ ሁኔታው ካልተሟላ ዋና ዳይሬክተሩ በጽሑፍ አስጠንቅቆ ከሦስት ወር በኋላ ፈቃዱን ሊሰርዝ ይችላል።

**ምን ማድረግ እንዳለብዎ፦** (1) አለመቀበሉን **በጽሑፍ ከነምክንያቱ** ይጠይቁ። (2) በ**7 ቀናት** ውስጥ ባለሥልጣኑ ውሳኔውን እንደገና እንዲያጤን ይጠይቁ። (3) በ**7 ቀናት** ውስጥ ለትምህርት ሚኒስቴር **የአውራጃ ኃላፊ** ይግባኝ ያቅርቡ፤ እሱም በ7 ቀናት ውስጥ መወሰን አለበት። (4) በተመሳሳይ ጊዜ በ***6552** ወይም በሚኒስቴሩ የሕዝብ አቤቱታ ፖርታል ቅሬታ ያስገቡ። (5) ዘረኝነት ከሆነ፣ **የመንግሥት ጸረ-ዘረኝነት ማስተባበሪያ ክፍል** ላይ ቅሬታ ያቅርቡ — ***3406**፤ የቅሬታ ማቅረቢያ ቅጹ **በአማርኛ** ይገኛል። (6) ነጻ የሕግ ምክር ለማግኘት **ቴቤካን** በ072-2424622 ያነጋግሩ።

ሁሉንም ነገር በጽሑፍ ያስቀምጡ፦ ቀኖችን፣ ስሞችን፣ የተባለውን። ያለ ሰነድ ይግባኝ ማቅረብ ከባድ ነው።

*[⚠️ የAI ትርጉም — ከመታተሙ በፊት በአማርኛ ተወላጅ ተናጋሪ እንዲገመገም እንመክራለን።]*`;

// ── the guide body ─────────────────────────────────────────────────────────

export const DISCRIMINATION_BODY: Record<Locale, string> = {
  he: `מה החוק אוסר, במילים שלו
סעיף 5 לחוק זכויות התלמיד, התשס"א-2000, נושא את הכותרת "איסור הפליה". הוא קובע שרשות חינוך מקומית, מוסד חינוך או אדם הפועל מטעמם לא יפלו תלמיד מטעמים עדתיים, מטעמים של ארץ מוצא, מטעמים של רקע חברתי-כלכלי, מטעמים של נטייה מינית או זהות מגדרית, או מטעמים של השקפה פוליטית — "בין של הילד ובין של הוריו" — בארבעה עניינים: ברישום התלמיד, בקבלתו או בהרחקתו ממוסד חינוך; בקביעת תכניות לימודים ומסלולי קידום נפרדים באותו מוסד; בקיום כיתות נפרדות באותו מוסד; ובזכויות ובחובות של תלמידים, לרבות כללי המשמעת והפעלתם. שימו לב לשני דברים. ראשית, שתי העילות שנוגעות ישירות לקהילה הן "מטעמים עדתיים" ו"מטעמים של ארץ מוצא". שנית, החוק מתייחס במפורש גם למאפיינים של ההורים, לא רק של הילד — כלומר "בגלל מי שאתם" היא עילה, לא רק "בגלל מי שהילד".

זו עבירה פלילית
סעיף 5(ב) קובע שהעובר על הוראות הסעיף דינו מאסר שנה או קנס לפי סעיף 61(א)(3) לחוק העונשין. זה לא כלל אתי ולא הנחיה פנימית של המשרד — זו עבירה שקבועה בחוק.

הנקודה שהכי הרבה הורים לא יודעים: זה חל גם על בתי ספר מוכרים שאינם רשמיים
התחושה הרווחת היא ש"בית ספר פרטי או מוכר יכול לבחור את התלמידים שלו". זו טעות משפטית. סעיף 16(ב) לחוק קובע שעל מוסד חינוך מוכר שאינו רשמי חלות הוראות החוק — למעט סעיפים 6, 7 ו-13. סעיף 5 אינו ברשימת החריגים, ולכן איסור ההפליה חל עליו במלואו. בנוסף, תקנה 3(א)(8) לתקנות חינוך ממלכתי (מוסדות מוכרים), תשי"ד-1953, קובעת שאחד התנאים להכרה במוסד הוא שלא קיימת בו הפליית תלמידים כמשמעותה בסעיף 5 לחוק זכויות התלמיד — "לרבות בהליך קבלתם". ההכרה עצמה מותנית באי-הפליה בקבלה.

ומה קורה כשמוסד לא עומד בתנאי? סעיף 15 לחוק פיקוח על בתי ספר, התשכ"ט-1969, מסמיך את מנכ"ל משרד החינוך להתרות בכתב בבעל הרישיון, ואם התנאי לא קוים בתוך שלושה חודשים מיום ההתראה — לבטל את הרישיון. זהו הכלי שקיים בחוק. הוא אינו מופעל אוטומטית, אבל הוא קיים, וכדאי להזכיר אותו בפנייה בכתב למחוז.

איפה הילד אמור להירשם מלכתחילה
לפי סעיף 3(א) לחוק לימוד חובה, התש"ט-1949, הורים לילד בגיל 3 עד 5 רושמים אותו ברשות החינוך המקומית שבתחום שיפוטה הוא גר. מגיל 6 ומעלה הרישום נעשה לפי סעיפים 20 ו-21 לחוק חינוך ממלכתי: התלמיד נרשם למוסד ממלכתי או ממלכתי-דתי הקרוב למקום מגוריו, וכללי הרישום — לרבות התנאים שבהם אפשר להירשם אחרת, מה שמכונה בשפת היומיום רישום חריג — נקבעים בתקנות. אם הילד יקבל חינוך חובה במוסד מוכר שאינו רשמי, הרישום נעשה באותו מוסד.

שתי נקודות שרלוונטיות במיוחד למשפחות עולות: סעיף 3(ב)(3) קובע שילד שעלה לישראל יירשם בתוך 30 יום מיום העלייה, וסעיף 3(ב)(4) קובע 30 יום גם למעבר בין רשויות. ואם רשות מקומית ניהלה רישום שלא לפי החוק והתקנות — סעיף 3א(ב) לחוק לימוד חובה מסמיך את שר החינוך לבטל את הרישום ולהורות לערוך אותו מחדש, על חשבון הרשות.

לוחות הזמנים שקצובים בתקנות — כאן נמצא הכוח שלכם
זה החלק שהכי כדאי לדעת, כי המועדים קצרים ומתחילים לרוץ מרגע ההודעה.

סירוב חייב להיות מנומק בכתב. תקנה 8(ג) לתקנות חינוך ממלכתי (העברה), תשי"ט-1959, קובעת שאם הרשות מסרבת, עליה לציין את נימוקיה בהודעה. אל תסתפקו ב"אין מקום" בעל פה.

בקשה לעיון מחדש — 7 ימים. תקנה 30 לתקנות לימוד חובה וחינוך ממלכתי (רישום), תשי"ט-1959, מאפשרת להורים לבקש מהרשות לשקול מחדש את המוסד שנקבע, בתוך 7 ימים מההודעה. חשוב: אם הרשות מתכוונת לדחות את הבקשה, עליה להיוועץ תחילה במנהל המחוז.

ערר למנהל המחוז — 7 ימים, והחלטה בתוך 7 ימים. תקנה 11(א)-(ב) לתקנות ההעברה קובעת שהורים רשאים לערור בכתב למנהל המחוז בתוך 7 ימים, ועליו להחליט בתוך 7 ימים בהתייעצות עם הרשות המקומית. תקנה 11(ד) מוסיפה מסלול ערר נוסף למנהל הכללי, בתוך 7 ימים, כשמדובר בסירוב הנוגע להעברה ממוסד רשמי למוסד פרטי.

עוד כלי קטן ושימושי: תקנה 7ד לתקנות הרישום מחייבת מנהל מוסד להודיע לרשות בתוך 48 שעות כשמתפנה מקום. אם נאמר לכם "אין מקום" והמקום התפנה — יש חובת דיווח.

מה ההקשר הרחב, לפי מסמכי הכנסת
מרכז המחקר והמידע של הכנסת עסק בסוגיה יותר מפעם אחת. מסמך שכתבה אתי וייסבלאי בשנת 2010 עבור הוועדה לזכויות הילד מצא, על בסיס נתוני משרד החינוך, ש-ב-42 מוסדות חינוך שיעור התלמידים יוצאי אתיופיה עלה על 40%, וב-11 מוסדות עלה על 70%. אותו מסמך מתעד גם הנחיה משנת 1993 שנועדה למנוע ריכוזים מעל 30% בבית ספר ו-25% בכיתה — הנחיה שמשרד החינוך ביטל בדצמבר 2002, בעקבות עתירה לבג"ץ של אב עולה שבנו לא התקבל בשל אותה מדיניות מכסות, ובעקבות חוות דעת של היועץ המשפטי לממשלה. מסמך מוקדם יותר, שכתב יובל וורגן ב-2006, תיאר טענות בדבר מגמות של ריכוז והסללה של תלמידים יוצאי אתיופיה, ובכלל זה כיתות נפרדות. מסמך משנת 2022 מצא ש-17.2% מהתלמידים יוצאי אתיופיה זכאים לשירותי חינוך מיוחדים, לעומת 12% במערכת כולה.

סוגיית סירובם של מוסדות חינוך מוכרים שאינם רשמיים בפתח-תקווה לרשום תלמידים יוצאי אתיופיה נדונה בבג"ץ 7426/08, טבקה — משפט וצדק לעולי אתיופיה נ' שרת החינוך ועיריית פתח-תקווה, וכן בוועדת החינוך של הכנסת. אנחנו מציינים את קיומו של ההליך; איננו מתארים כאן את שנפסק בו, משום שלא הצלחנו לאמת את נוסח פסק הדין ממקור ראשוני.

מה שכדאי לעשות עוד לפני שיש בעיה
תעדו. בקשו כל דבר בכתב, ואם נאמר לכם משהו בעל פה — שלחו מייל קצר שמסכם את מה שנאמר, למי, ומתי. שמרו את אישורי המסירה. אם עברית אינה שפת האם שלכם, אתם רשאים לבקש שהתשובה תימסר בכתב כדי שתוכלו להיעזר במישהו בקריאתה. תיעוד הוא ההבדל בין תחושה שקשה להוכיח לבין ערר שאפשר להגיש.

והערה חשובה על כתובת שגויה: נציבות שוויון ההזדמנויות בעבודה עוסקת בשוויון בעבודה בלבד — לא בחינוך. הורים נשלחים לשם לא פעם ומאבדים זמן. הכתובות הנכונות מפורטות בהמשך העמוד.

הבהרה
המידע כאן כללי ואינו ייעוץ משפטי. נהלים, מועדי רישום וכתובות משתנים — אמתו מול הרשות המקומית ומול המחוז, ולמקרה קונקרטי פנו לעורך דין או לטבקה.`,

  en: `What the law prohibits, in its own words
Section 5 of the Student Rights Law, 5761-2000, is headed "prohibition of discrimination". It provides that a local education authority, an educational institution, or a person acting on their behalf shall not discriminate against a student on communal grounds, grounds of country of origin, socio-economic background, sexual orientation or gender identity, or political outlook — "whether of the child or of their parents" — in four matters: registering a student, admitting or expelling them from an institution; setting separate curricula and advancement tracks within the same institution; maintaining separate classes within the same institution; and students' rights and duties, including disciplinary rules and their application. Note two things. First, the two grounds that bear directly on this community are communal grounds and country of origin. Second, the law expressly covers the parents' characteristics too — "because of who you are" is a ground, not only "because of who the child is".

This is a criminal offence
Section 5(b) provides that a person who contravenes the section is liable to one year's imprisonment or a fine under section 61(a)(3) of the Penal Law. This is not an ethical norm or an internal ministry guideline — it is an offence set out in statute.

The point most parents do not know: it binds recognised non-official schools too
The common intuition is that "a private or recognised school can choose its pupils". That is legally wrong. Section 16(b) provides that the law's provisions apply to a recognised non-official institution — except sections 6, 7 and 13. Section 5 is not among the exclusions, so the prohibition on discrimination applies to it in full. Further, regulation 3(a)(8) of the State Education (Recognised Institutions) Regulations, 5714-1953, makes it a condition of recognition that no discrimination as defined in section 5 exists at the institution — "including in the admission process". Recognition itself is conditioned on non-discrimination in admissions.

And when an institution fails a condition? Section 15 of the Supervision of Schools Law, 5729-1969, empowers the Ministry's director-general to warn the licence holder in writing, and if the condition is not met within three months of the warning — to revoke the licence. That is the tool the statute provides. It is not applied automatically, but it exists, and it is worth citing in a written approach to the district.

Where the child should be registered in the first place
Under section 3(a) of the Compulsory Education Law, 5709-1949, parents of a child aged 3 to 5 register them with the local education authority in whose area the child lives. From age 6 registration follows sections 20 and 21 of the State Education Law: the pupil is registered at a state or state-religious institution nearest their residence, and the registration rules — including the conditions for registering otherwise, colloquially an exceptional registration — are set in regulations. If the child will receive compulsory education at a recognised non-official institution, registration is at that institution.

Two points bear particularly on immigrant families: section 3(b)(3) requires a child who made aliyah to be registered within 30 days of arrival, and section 3(b)(4) sets the same 30 days for a move between authorities. And where a local authority has conducted a registration otherwise than in accordance with the law and regulations, section 3a(b) empowers the Minister of Education to cancel that registration and order it redone, at the authority's expense.

The deadlines set in the regulations — this is where your leverage sits
These clocks are short and start running from the notice.

A refusal must be reasoned in writing. Regulation 8(c) of the State Education (Transfer) Regulations, 5719-1959, requires the authority, if it refuses, to state its reasons in the notice. Do not settle for a verbal "there is no room".

Request for reconsideration — 7 days. Regulation 30 of the Compulsory and State Education (Registration) Regulations, 5719-1959, lets parents ask the authority to reconsider the institution assigned, within 7 days of the notice. Importantly: if the authority intends to reject the request, it must first consult the district director.

Appeal to the district director — 7 days, decided within 7 days. Regulation 11(a)-(b) of the Transfer Regulations lets parents appeal in writing to the district director within 7 days, and he must decide within 7 days in consultation with the local authority. Regulation 11(d) adds a further appeal to the director-general, within 7 days, on a refusal concerning a transfer from an official to a private institution.

One more small, useful tool: regulation 7d of the Registration Regulations requires a principal to notify the authority within 48 hours when a place frees up. If you were told "there is no room" and a place opened, there is a duty to report it.

The wider context, per Knesset documents
The Knesset Research and Information Center has addressed this more than once. A 2010 document by Eti Weissblai, prepared for the Committee on the Rights of the Child, found on Ministry of Education data that in 42 institutions the share of Ethiopian-Israeli pupils exceeded 40%, and in 11 institutions exceeded 70%. The same document records a 1993 directive intended to prevent concentrations above 30% of a school and 25% of a class — a directive the Ministry cancelled in December 2002, following a Supreme Court petition by an immigrant father whose son was refused admission under that quota policy, and an opinion of the Attorney General. An earlier document by Yuval Vurgan (2006) described claims of concentration and tracking of Ethiopian-Israeli pupils, including separate classes. A 2022 document found 17.2% of Ethiopian-Israeli pupils entitled to special education services, against 12% system-wide.

The refusal of recognised non-official institutions in Petah Tikva to register Ethiopian-Israeli pupils was litigated in HCJ 7426/08, Tebeka v. Minister of Education and Petah Tikva Municipality, and discussed in the Knesset Education Committee. We note that the proceeding took place; we do not describe what was held in it, because we could not verify the judgment's text from a primary source.

What to do before there is a problem
Document. Ask for everything in writing, and where something was said verbally, send a short email summarising what was said, by whom, and when. Keep delivery confirmations. If Hebrew is not your first language, you may ask for the answer in writing so someone can help you read it. Documentation is the difference between a feeling that is hard to prove and an appeal you can actually file.

An important note on a wrong address: the Equal Employment Opportunities Commission deals with equality at work only — not education. Parents are often sent there and lose time. The correct addresses are listed further down this page.

Disclaimer
This is general information, not legal advice. Procedures, registration dates and addresses change — verify with the local authority and the district, and for a concrete case consult a lawyer or Tebeka.`,

  am: `ሕጉ የሚከለክለው ምንድን ነው
የተማሪ መብቶች ሕግ (2000) አንቀጽ 5 "አድሎ መከልከል" የሚል ርዕስ አለው። የአካባቢው የትምህርት ባለሥልጣን፣ የትምህርት ተቋም ወይም በእነሱ ስም የሚሠራ ሰው በጎሳ፣ በትውልድ ሀገር፣ በማኅበራዊ-ኢኮኖሚያዊ ዳራ፣ በጾታዊ ዝንባሌ ወይም በጾታ ማንነት፣ ወይም በፖለቲካ አመለካከት — "የልጁም ሆነ የወላጆቹ" — በአራት ጉዳዮች ላይ አድሎ ማድረግ እንደማይችል ይደነግጋል፦ ተማሪን በመመዝገብ፣ በመቀበል ወይም በማባረር፤ በአንድ ተቋም ውስጥ የተለያዩ የትምህርት ፕሮግራሞችና የዕድገት መንገዶች በማበጀት፤ በአንድ ተቋም ውስጥ የተለያዩ ክፍሎች በማቋቋም፤ እና በተማሪዎች መብቶችና ግዴታዎች እንዲሁም በዲሲፕሊን ደንቦች ላይ። ለዚህ ማኅበረሰብ በቀጥታ የሚመለከቱት ሁለቱ ምክንያቶች ጎሳና የትውልድ ሀገር ናቸው። ሕጉ የወላጆችንም ባህርያት በግልጽ ይሸፍናል።

ይህ የወንጀል ድርጊት ነው
አንቀጽ 5(ב) የዚህን አንቀጽ ድንጋጌ የሚጥስ ሰው በአንድ ዓመት እስራት ወይም በገንዘብ ቅጣት እንደሚቀጣ ይደነግጋል። ይህ የሥነ ምግባር መመሪያ ሳይሆን በሕግ የተቀመጠ ወንጀል ነው።

ብዙ ወላጆች የማያውቁት ነጥብ፦ በተመዘገቡ ግን ይፋዊ ባልሆኑ ትምህርት ቤቶችም ላይ ይሠራል
"የግል ወይም የተመዘገበ ትምህርት ቤት ተማሪዎቹን መምረጥ ይችላል" የሚለው የተለመደ ግምት በሕግ ስህተት ነው። አንቀጽ 16(ב) የሕጉ ድንጋጌዎች በተመዘገበ ይፋዊ ባልሆነ ተቋም ላይ እንደሚሠሩ ይደነግጋል — ከአንቀጽ 6፣ 7 እና 13 በስተቀር። አንቀጽ 5 በተገለሉት ውስጥ የለም። ከዚህም በላይ የመንግሥት ትምህርት (የተመዘገቡ ተቋማት) ደንቦች 1953 ደንብ 3(א)(8) ተቋሙ ዕውቅና እንዲያገኝ አድሎ አለመኖሩን — "በመቀበል ሂደታቸውም ጭምር" — እንደ ቅድመ ሁኔታ ያስቀምጣል።

አንድ ተቋም ቅድመ ሁኔታውን ካላሟላ? የትምህርት ቤቶች ቁጥጥር ሕግ 1969 አንቀጽ 15 የሚኒስቴሩ ዋና ዳይሬክተር የፈቃድ ባለቤቱን በጽሑፍ እንዲያስጠነቅቅ፣ እና ከማስጠንቀቂያው ከሦስት ወራት በኋላ ቅድመ ሁኔታው ካልተሟላ ፈቃዱን እንዲሰርዝ ሥልጣን ይሰጠዋል።

ልጁ በመጀመሪያ የት መመዝገብ አለበት
የግዴታ ትምህርት ሕግ 1949 አንቀጽ 3(א) መሠረት ከ3 እስከ 5 ዓመት ዕድሜ ያለው ልጅ ወላጆች ልጃቸው በሚኖርበት አካባቢ ባለው የትምህርት ባለሥልጣን ይመዘግባሉ። ከ6 ዓመት ጀምሮ ምዝገባው በመንግሥት ትምህርት ሕግ አንቀጽ 20 እና 21 መሠረት ይሆናል፦ ተማሪው ከመኖሪያው በቅርብ ወዳለው ተቋም ይመዘገባል።

ለስደተኛ ቤተሰቦች የሚመለከቱ ሁለት ነጥቦች፦ አንቀጽ 3(ב)(3) ወደ እስራኤል የመጣ ልጅ ከመድረሱ በ30 ቀናት ውስጥ እንዲመዘገብ ይጠይቃል፤ አንቀጽ 3(ב)(4) ደግሞ በባለሥልጣናት መካከል ለሚደረግ ዝውውር ተመሳሳይ 30 ቀናት ያስቀምጣል። አንድ ባለሥልጣን ምዝገባን ከሕጉ ውጭ ካካሄደ፣ አንቀጽ 3א(ב) የትምህርት ሚኒስትሩ ያንን ምዝገባ እንዲሰርዝና በባለሥልጣኑ ወጪ እንደገና እንዲካሄድ እንዲያዝ ሥልጣን ይሰጠዋል።

በደንቦቹ የተቀመጡት የጊዜ ገደቦች — ኃይልዎ ያለው እዚህ ነው
አለመቀበል በጽሑፍ ከነምክንያቱ መሆን አለበት። የመንግሥት ትምህርት (ዝውውር) ደንቦች 1959 ደንብ 8(ג) ባለሥልጣኑ ሲከለክል ምክንያቶቹን በማስታወቂያው ላይ እንዲገልጽ ይጠይቃል። በቃል በሚነገር "ቦታ የለም" አይረኩ።

እንደገና እንዲታይ ጥያቄ — 7 ቀናት። የግዴታና የመንግሥት ትምህርት (ምዝገባ) ደንቦች 1959 ደንብ 30 ወላጆች የተመደበውን ተቋም ባለሥልጣኑ እንደገና እንዲያጤን ከማስታወቂያው በ7 ቀናት ውስጥ እንዲጠይቁ ይፈቅዳል። አስፈላጊ ነጥብ፦ ባለሥልጣኑ ጥያቄውን ውድቅ ለማድረግ ካሰበ አስቀድሞ የአውራጃውን ኃላፊ ማማከር አለበት።

ለአውራጃ ኃላፊ ይግባኝ — 7 ቀናት፣ በ7 ቀናት ውስጥ ውሳኔ። የዝውውር ደንቦች ደንብ 11(א)-(ב) ወላጆች በ7 ቀናት ውስጥ በጽሑፍ ለአውራጃው ኃላፊ ይግባኝ እንዲያቀርቡ ይፈቅዳል፤ እሱም ከአካባቢው ባለሥልጣን ጋር በመመካከር በ7 ቀናት ውስጥ መወሰን አለበት። ደንብ 11(ד) ወደ ዋና ዳይሬክተሩ ተጨማሪ የይግባኝ መንገድ ይጨምራል።

ሌላ ትንሽ ጠቃሚ መሣሪያ፦ የምዝገባ ደንቦች ደንብ 7ד የተቋም ኃላፊ ቦታ ሲለቀቅ በ48 ሰዓታት ውስጥ ለባለሥልጣኑ እንዲያሳውቅ ያስገድዳል።

ሰፋ ያለው አውድ፣ በክነሴት ሰነዶች መሠረት
የክነሴት ምርምርና መረጃ ማዕከል ይህን ጉዳይ ከአንድ ጊዜ በላይ ተመልክቶታል። በ2010 አቲ ዋይስብላይ ለሕፃናት መብቶች ኮሚቴ ያዘጋጀችው ሰነድ በትምህርት ሚኒስቴር መረጃ መሠረት በ42 ተቋማት የኢትዮጵያ ተወላጅ ተማሪዎች ድርሻ ከ40% በላይ፣ በ11 ተቋማት ደግሞ ከ70% በላይ እንደነበር አግኝቷል። ተመሳሳዩ ሰነድ በትምህርት ቤት ከ30% እና በክፍል ከ25% በላይ መከማቸትን ለመከላከል የወጣውን የ1993 መመሪያ ይመዘግባል — ይህ መመሪያ በታኅሣሥ 2002 በሚኒስቴሩ ተሰርዟል። በ2022 የወጣ ሰነድ ደግሞ ከኢትዮጵያ ተወላጅ ተማሪዎች 17.2% ለልዩ ትምህርት አገልግሎቶች ብቁ እንደሆኑ አግኝቷል፣ በአጠቃላይ ሥርዓቱ ውስጥ ካለው 12% ጋር ሲነጻጸር።

በፔታህ ቲክቫ የተመዘገቡ ይፋዊ ያልሆኑ ተቋማት የኢትዮጵያ ተወላጅ ተማሪዎችን ለመመዝገብ ፈቃደኛ አለመሆናቸው ጉዳይ በጠቅላይ ፍርድ ቤት (בג"ץ 7426/08) እና በክነሴት የትምህርት ኮሚቴ ተመልክቷል። ሂደቱ መካሄዱን እንጠቅሳለን፤ በውስጡ የተወሰነውን ግን እዚህ አንገልጽም፣ ምክንያቱም የፍርዱን ጽሑፍ ከዋና ምንጭ ማረጋገጥ አልቻልንም።

ችግር ከመፈጠሩ በፊት ማድረግ የሚገባ
ይመዝግቡ። ሁሉንም ነገር በጽሑፍ ይጠይቁ፤ በቃል የተነገረዎት ነገር ካለ የተባለውን፣ ማን እንደተናገረውና መቼ እንደሆነ የሚያጠቃልል አጭር ኢሜይል ይላኩ። ዕብራይስጥ የመጀመሪያ ቋንቋዎ ካልሆነ፣ አንድ ሰው እንዲያነብልዎ መልሱ በጽሑፍ እንዲሰጥዎ መጠየቅ ይችላሉ። ሰነድ ማስረጃ ማቅረብ ከሚከብድ ስሜትና ማቅረብ ከሚቻል ይግባኝ መካከል ያለው ልዩነት ነው።

ስለ የተሳሳተ አድራሻ አስፈላጊ ማስታወሻ፦ የሥራ ዕድል እኩልነት ኮሚሽን በሥራ ላይ ያለን እኩልነት ብቻ ይመለከታል — ትምህርትን አይደለም። ወላጆች ብዙ ጊዜ ወደዚያ ተልከው ጊዜ ያጣሉ። ትክክለኞቹ አድራሻዎች ከዚህ በታች ተዘርዝረዋል።

ማብራሪያ
ይህ አጠቃላይ መረጃ ነው፣ የሕግ ምክር አይደለም። ሂደቶች፣ የምዝገባ ቀኖችና አድራሻዎች ይለወጣሉ — ከአካባቢው ባለሥልጣንና ከአውራጃው ያረጋግጡ።`,
};

// ── the escalation ladder ──────────────────────────────────────────────────

export const DISCRIMINATION_STEPS: LocalizedStep[] = [
  {
    id: "written-reasons",
    title: {
      he: "בקשו את הסירוב בכתב, עם נימוקים",
      en: "Ask for the refusal in writing, with reasons",
      am: "አለመቀበሉን በጽሑፍ ከነምክንያቱ ይጠይቁ",
    },
    detail: {
      he: 'תקנה 8(ג) לתקנות חינוך ממלכתי (העברה) מחייבת את הרשות לציין את נימוקי הסירוב בהודעה. אל תסתפקו בתשובה בעל פה. שלחו מייל קצר: "בהמשך לשיחתנו ביום X עם Y, נמסר לי ש… אבקש את ההחלטה ואת נימוקיה בכתב." שמרו עותק.',
      en: 'Regulation 8(c) of the State Education (Transfer) Regulations requires the authority to state the reasons for a refusal in its notice. Do not settle for a verbal answer. Send a short email: "Further to our conversation on X with Y, I was told that… I request the decision and its reasons in writing." Keep a copy.',
      am: "የመንግሥት ትምህርት (ዝውውር) ደንቦች ደንብ 8(ג) ባለሥልጣኑ የአለመቀበሉን ምክንያቶች በማስታወቂያው እንዲገልጽ ያስገድዳል። በቃል በሚሰጥ መልስ አይረኩ። አጭር ኢሜይል ይላኩና ቅጂ ይያዙ።",
    },
  },
  {
    id: "reconsideration",
    title: {
      he: "בקשת עיון מחדש ברשות המקומית — תוך 7 ימים",
      en: "Request reconsideration from the local authority — within 7 days",
      am: "በአካባቢው ባለሥልጣን እንደገና እንዲታይ ይጠይቁ — በ7 ቀናት ውስጥ",
    },
    detail: {
      he: "תקנה 30 לתקנות הרישום מאפשרת לבקש מהרשות לשקול מחדש את המוסד שנקבע, תוך 7 ימים מההודעה. אם הרשות מתכוונת לדחות — עליה להיוועץ תחילה במנהל המחוז. ציינו זאת בבקשה.",
      en: "Regulation 30 of the Registration Regulations lets you ask the authority to reconsider the institution assigned, within 7 days of the notice. If the authority intends to reject, it must first consult the district director. Say so in your request.",
      am: "የምዝገባ ደንቦች ደንብ 30 የተመደበውን ተቋም ባለሥልጣኑ እንደገና እንዲያጤን ከማስታወቂያው በ7 ቀናት ውስጥ እንዲጠይቁ ይፈቅዳል። ባለሥልጣኑ ውድቅ ለማድረግ ካሰበ አስቀድሞ የአውራጃውን ኃላፊ ማማከር አለበት።",
    },
  },
  {
    id: "district-appeal",
    title: {
      he: "ערר בכתב למנהל המחוז — תוך 7 ימים",
      en: "Written appeal to the district director — within 7 days",
      am: "ለአውራጃ ኃላፊ የጽሑፍ ይግባኝ — በ7 ቀናት ውስጥ",
    },
    detail: {
      he: "תקנה 11(א)-(ב) לתקנות ההעברה: ערר בכתב למנהל המחוז תוך 7 ימים, והוא חייב להחליט תוך 7 ימים בהתייעצות עם הרשות. בסירוב הנוגע להעברה ממוסד רשמי למוסד פרטי — תקנה 11(ד) פותחת ערר נוסף למנהל הכללי, גם הוא תוך 7 ימים.",
      en: "Regulation 11(a)-(b) of the Transfer Regulations: a written appeal to the district director within 7 days, which he must decide within 7 days in consultation with the authority. On a refusal concerning a transfer from an official to a private institution, regulation 11(d) opens a further appeal to the director-general, also within 7 days.",
      am: "የዝውውር ደንቦች ደንብ 11(א)-(ב)፦ በ7 ቀናት ውስጥ ለአውራጃው ኃላፊ የጽሑፍ ይግባኝ፤ እሱም በ7 ቀናት ውስጥ መወሰን አለበት። ደንብ 11(ד) ወደ ዋና ዳይሬክተሩ ተጨማሪ ይግባኝ ይከፍታል።",
    },
  },
  {
    id: "ministry-complaint",
    title: {
      he: "במקביל: תלונה לפניות הציבור של משרד החינוך",
      en: "In parallel: a complaint to the Ministry of Education's public-inquiries unit",
      am: "በተመሳሳይ ጊዜ፦ ለትምህርት ሚኒስቴር የሕዝብ አቤቱታ ክፍል ቅሬታ",
    },
    detail: {
      he: 'רישום תלמידים הוא נושא מפורש בפניות הציבור המחוזיות. הגישו בפורטל הפניות, בחרו את המחוז שלכם, וצרפו את ההתכתבות. אפשר גם להתקשר למוקד השירות והמידע הארצי להורים ב-6552*. הטופס שואל אם כבר פניתם להנהלת בית הספר — לכן שלב 1 חשוב.',
      en: 'Student registration is an explicitly listed topic for district public inquiries. File through the inquiries portal, choose your district, and attach the correspondence. You can also call the national parents\' service and information line at *6552. The form asks whether you already approached the school administration — which is why step 1 matters.',
      am: "የተማሪ ምዝገባ በአውራጃ የሕዝብ አቤቱታዎች ውስጥ በግልጽ የተዘረዘረ ርዕስ ነው። በአቤቱታ ፖርታሉ ያስገቡ፣ አውራጃዎን ይምረጡ፣ እና ደብዳቤዎቹን ያያይዙ። በ*6552 መደወልም ይችላሉ።",
    },
    officialUrl: "https://pnzportal.education.gov.il/?machoz",
    officialLabel: {
      he: "פורטל פניות הציבור — משרד החינוך",
      en: "Public inquiries portal — Ministry of Education",
      am: "የሕዝብ አቤቱታ ፖርታል — የትምህርት ሚኒስቴር",
    },
  },
  {
    id: "racism-unit",
    title: {
      he: "תלונה ליחידה לתיאום המאבק בגזענות — הטופס קיים באמהרית",
      en: "Complaint to the Government Unit for Coordinating the Fight against Racism — the form exists in Amharic",
      am: "ለመንግሥት ጸረ-ዘረኝነት ማስተባበሪያ ክፍል ቅሬታ — ቅጹ በአማርኛ አለ",
    },
    detail: {
      he: "היחידה במשרד המשפטים מקבלת תלונות על אפליה על רקע גזעני, ואפליה במערכת החינוך היא דוגמה מפורשת בתחומי טיפולה. הטופס המקוון זמין בעברית, אנגלית, ערבית, רוסית ואמהרית. חשוב לדעת: היחידה מנתבת את התלונה לגורם המוסמך ועוקבת אחר הטיפול — היא אינה גוף שיפוטי ואינה נותנת סעד מחייב.",
      en: "The unit at the Ministry of Justice receives complaints of racially motivated discrimination, and discrimination in the education system is an express example within its remit. The online form is available in Hebrew, English, Arabic, Russian and Amharic. Note: the unit routes the complaint to the competent body and tracks its handling — it is not an adjudicator and does not grant a binding remedy.",
      am: "በፍትሕ ሚኒስቴር ያለው ክፍል በዘር ላይ የተመሠረተ አድሎ ቅሬታዎችን ይቀበላል፤ በትምህርት ሥርዓት ውስጥ ያለ አድሎ በሥራው ወሰን ውስጥ ግልጽ ምሳሌ ነው። የመስመር ላይ ቅጹ በአማርኛም ይገኛል። ክፍሉ ቅሬታውን ወደ ሥልጣን ወዳለው አካል ይመራል እንጂ ራሱ ውሳኔ ሰጪ አይደለም።",
    },
    officialUrl: "https://www.gov.il/he/service/complaint-about-racism",
    officialLabel: {
      he: "הגשת תלונה על גזענות — gov.il",
      en: "File a racism complaint — gov.il",
      am: "የዘረኝነት ቅሬታ ማቅረቢያ — gov.il",
    },
  },
  {
    id: "legal-help",
    title: {
      he: "ייעוץ משפטי חינם — טבקה",
      en: "Free legal advice — Tebeka",
      am: "ነጻ የሕግ ምክር — ቴቤካ",
    },
    detail: {
      he: "טבקה — משפט וצדק לעולי אתיופיה מייצגת ומייעצת חינם בתחומי אפליה וגזענות, ובכללם חינוך, ונותנת שירות בעברית ובאמהרית. פנו מוקדם ככל האפשר — המועדים בתקנות קצרים.",
      en: "Tebeka — Advocacy for Equality and Justice for Ethiopian Israelis represents and advises free of charge on discrimination and racism, education included, and serves clients in Hebrew and Amharic. Approach them as early as possible — the regulatory deadlines are short.",
      am: "ቴቤካ በአድሎና በዘረኝነት ጉዳዮች — ትምህርትን ጨምሮ — ነጻ ውክልናና ምክር ይሰጣል፣ በዕብራይስጥና በአማርኛ። በተቻለ ፍጥነት ያነጋግሩ — በደንቦቹ ያሉት ጊዜያት አጭር ናቸው።",
    },
    officialUrl: "https://www.tebeka.org.il",
    officialLabel: { he: "tebeka.org.il", en: "tebeka.org.il", am: "tebeka.org.il" },
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────

export const DISCRIMINATION_FAQ: LocalizedFaq[] = [
  {
    id: "private-school-can-choose",
    question: {
      he: "בית הספר אמר שהוא מוסד מוכר ולכן רשאי לבחור תלמידים. זה נכון?",
      en: "The school said it is a recognised institution and may therefore choose its pupils. Is that right?",
      am: "ትምህርት ቤቱ የተመዘገበ ተቋም ስለሆነ ተማሪዎቹን መምረጥ እንደሚችል ተናግሯል። ትክክል ነው?",
    },
    answer: {
      he: 'לא, לא בכל הנוגע לאפליה. סעיף 16(ב) לחוק זכויות התלמיד מחיל את החוק על מוסד חינוך מוכר שאינו רשמי, למעט סעיפים 6, 7 ו-13 — וסעיף 5, איסור ההפליה, אינו ברשימת החריגים. יתרה מזו, תקנה 3(א)(8) לתקנות מוסדות מוכרים מתנה את עצם ההכרה בכך שאין במוסד הפליה "לרבות בהליך קבלתם". למוסד יש שיקול דעת בקבלה, אבל לא שיקול דעת להפלות מטעמים עדתיים או מטעמי ארץ מוצא.',
      en: 'Not where discrimination is concerned. Section 16(b) applies the Student Rights Law to a recognised non-official institution except sections 6, 7 and 13 — and section 5, the prohibition on discrimination, is not among the exclusions. Moreover, regulation 3(a)(8) of the Recognised Institutions Regulations conditions recognition itself on there being no discrimination "including in the admission process". An institution has discretion in admissions, but no discretion to discriminate on communal or country-of-origin grounds.',
      am: "አድሎን በሚመለከት አይደለም። አንቀጽ 16(ב) ሕጉን በተመዘገበ ይፋዊ ባልሆነ ተቋም ላይ ተፈጻሚ ያደርጋል — ከአንቀጽ 6፣ 7 እና 13 በስተቀር፤ አንቀጽ 5 ደግሞ በተገለሉት ውስጥ የለም። ተቋሙ በመቀበል ላይ ውሳኔ የመስጠት ነጻነት አለው፣ ነገር ግን በጎሳ ወይም በትውልድ ሀገር አድሎ የማድረግ ነጻነት የለውም።",
    },
  },
  {
    id: "no-room",
    question: {
      he: 'אמרו לי "אין מקום". איך אני יודע אם זו אפליה?',
      en: 'I was told "there is no room". How do I know whether it is discrimination?',
      am: '"ቦታ የለም" ተባልኩ። አድሎ መሆኑን እንዴት ማወቅ እችላለሁ?',
    },
    answer: {
      he: "אתם לא צריכים להוכיח כוונה כדי להתחיל את התהליך. בקשו את הסירוב בכתב עם נימוקיו — זו חובה לפי תקנה 8(ג) — ואת נימוקי חלוקת המקומות. אם התפנה מקום, תקנה 7ד לתקנות הרישום מחייבת את מנהל המוסד להודיע על כך לרשות תוך 48 שעות. שתי הבקשות האלה, בכתב, הופכות תחושה למסמך. את שאלת האפליה יבחנו המחוז, פניות הציבור, או היחידה לתיאום המאבק בגזענות.",
      en: "You do not need to prove intent to start the process. Ask for the refusal in writing with its reasons — required by regulation 8(c) — and for the reasoning behind the allocation of places. If a place frees up, regulation 7d of the Registration Regulations requires the principal to notify the authority within 48 hours. Those two written requests turn a feeling into a document. The discrimination question is then examined by the district, the public-inquiries unit, or the anti-racism unit.",
      am: "ሂደቱን ለመጀመር ሆን ተብሎ መደረጉን ማረጋገጥ አያስፈልግዎትም። አለመቀበሉን በጽሑፍ ከነምክንያቱ ይጠይቁ — በደንብ 8(ג) የተጣለ ግዴታ ነው። ቦታ ከተለቀቀ፣ ደንብ 7ד የተቋሙ ኃላፊ በ48 ሰዓታት ውስጥ እንዲያሳውቅ ያስገድዳል። እነዚህ ሁለት የጽሑፍ ጥያቄዎች ስሜትን ወደ ሰነድ ይለውጣሉ።",
    },
  },
  {
    id: "separate-class",
    question: {
      he: "בבית הספר יש כיתה שרוב התלמידים בה יוצאי אתיופיה. זה חוקי?",
      en: "The school has a class in which most pupils are Ethiopian-Israeli. Is that lawful?",
      am: "በትምህርት ቤቱ አብዛኞቹ ተማሪዎች የኢትዮጵያ ተወላጆች የሆኑበት ክፍል አለ። ሕጋዊ ነው?",
    },
    answer: {
      he: "סעיף 5(א)(3) לחוק אוסר במפורש על קיום כיתות נפרדות באותו מוסד חינוך מהטעמים המנויים בסעיף, וסעיף 5(א)(2) אוסר על מסלולי קידום ותכניות לימודים נפרדים. מסמכי מרכז המחקר והמידע של הכנסת מ-2006 ומ-2010 עסקו בדיוק בטענות מסוג זה. אם זה המצב בבית הספר של ילדכם — בקשו הסבר בכתב על אופן חלוקת התלמידים לכיתות, ופנו למפקח הכולל ולפניות הציבור במחוז.",
      en: "Section 5(a)(3) expressly prohibits maintaining separate classes within the same institution on the grounds listed in the section, and section 5(a)(2) prohibits separate advancement tracks and curricula. Knesset Research Center documents from 2006 and 2010 addressed precisely such claims. If this is the situation at your child's school, ask in writing how pupils were allocated to classes, and approach the general inspector and the district public-inquiries unit.",
      am: "አንቀጽ 5(א)(3) በአንድ ተቋም ውስጥ የተለያዩ ክፍሎችን ማቋቋም በግልጽ ይከለክላል፣ አንቀጽ 5(א)(2) ደግሞ የተለያዩ የዕድገት መንገዶችንና ሥርዓተ ትምህርቶችን ይከለክላል። ተማሪዎቹ ወደ ክፍሎች እንዴት እንደተከፋፈሉ በጽሑፍ ማብራሪያ ይጠይቁ።",
    },
  },
  {
    id: "olim-30-days",
    question: {
      he: "עלינו לישראל לאחרונה. מתי צריך לרשום את הילד?",
      en: "We recently made aliyah. When must the child be registered?",
      am: "በቅርቡ ወደ እስራኤል መጥተናል። ልጁ መቼ መመዝገብ አለበት?",
    },
    answer: {
      he: "סעיף 3(ב)(3) לחוק לימוד חובה קובע רישום תוך 30 יום מיום העלייה. אותם 30 יום חלים גם על מעבר בין רשויות מקומיות (סעיף 3(ב)(4)). האחריות למתן חינוך חובה חינם מוטלת על המדינה, והחזקת מוסדות חינוך רשמיים לילדי הרשות מוטלת על המדינה ועל הרשות המקומית יחד (סעיף 7).",
      en: "Section 3(b)(3) of the Compulsory Education Law requires registration within 30 days of aliyah. The same 30 days apply to a move between local authorities (section 3(b)(4)). Responsibility for free compulsory education rests with the State, and maintaining official institutions for an authority's children rests jointly on the State and that authority (section 7).",
      am: "የግዴታ ትምህርት ሕግ አንቀጽ 3(ב)(3) ከመድረሱ በ30 ቀናት ውስጥ ምዝገባ እንዲደረግ ይጠይቃል። በአካባቢ ባለሥልጣናት መካከል ለሚደረግ ዝውውርም ተመሳሳይ 30 ቀናት ይሠራል።",
    },
  },
  {
    id: "wrong-address",
    question: {
      he: "שלחו אותי לנציבות שוויון הזדמנויות. זו הכתובת הנכונה?",
      en: "I was sent to the Equal Opportunities Commission. Is that the right address?",
      am: "ወደ የእኩል ዕድል ኮሚሽን ተልኬ ነበር። ትክክለኛው አድራሻ ነው?",
    },
    answer: {
      he: "לא. נציבות שוויון ההזדמנויות בעבודה עוסקת בשוויון בעולם העבודה בלבד ואינה מטפלת בחינוך. הכתובות הרלוונטיות הן פניות הציבור של משרד החינוך והמחוז, היחידה הממשלתית לתיאום המאבק בגזענות במשרד המשפטים, וייעוץ משפטי בטבקה.",
      en: "No. The Equal Employment Opportunities Commission deals with equality in the world of work only and does not handle education. The relevant addresses are the Ministry of Education's public-inquiries unit and district, the Government Unit for Coordinating the Fight against Racism at the Ministry of Justice, and legal advice from Tebeka.",
      am: "አይደለም። የሥራ ዕድል እኩልነት ኮሚሽን በሥራ ዓለም ውስጥ ያለን እኩልነት ብቻ ይመለከታል። ተገቢዎቹ አድራሻዎች የትምህርት ሚኒስቴር የሕዝብ አቤቱታ ክፍልና አውራጃው፣ የፍትሕ ሚኒስቴር ጸረ-ዘረኝነት ማስተባበሪያ ክፍል፣ እና ቴቤካ ናቸው።",
    },
  },
  {
    id: "special-ed-confusion",
    question: {
      he: "אמרו לי שהילד יירשם רק אם יעבור ועדה. זה קשור?",
      en: "I was told the child will only be registered if they go through a committee. Is that related?",
      am: "ልጁ በኮሚቴ ካላለፈ እንደማይመዘገብ ተነግሮኛል። ተያያዥ ነው?",
    },
    answer: {
      he: "אלה שני הליכים נפרדים שלא כדאי לערבב. רישום לבית ספר מוסדר בחוק לימוד חובה ובתקנות הרישום. זכאות לשירותי חינוך מיוחדים נקבעת בוועדת זכאות ואפיון לפי חוק חינוך מיוחד, ולה לוחות זמנים וזכויות משלה — כולל זכותכם לבחור את סוג המסגרת ולהגיש השגה תוך 21 יום. אם הפנו את ילדכם לוועדה, ראו את המדריך הנפרד בנושא.",
      en: "These are two separate procedures that should not be conflated. Registration for school is governed by the Compulsory Education Law and the Registration Regulations. Entitlement to special education services is determined by an eligibility and characterization committee under the Special Education Law, with its own timelines and rights — including your right to choose the type of framework and to object within 21 days. If your child was referred to a committee, see the separate guide.",
      am: "እነዚህ ሁለት የተለያዩ ሂደቶች ናቸው። የትምህርት ቤት ምዝገባ በግዴታ ትምህርት ሕግ ይመራል። ለልዩ ትምህርት አገልግሎቶች ብቁነት ደግሞ በልዩ ትምህርት ሕግ መሠረት በብቁነትና አፈጻጸም ኮሚቴ ይወሰናል — የራሱ የጊዜ ገደቦችና መብቶች አሉት። ልጅዎ ወደ ኮሚቴ ከተላከ የተለየውን መመሪያ ይመልከቱ።",
    },
  },
];

// ── resources ─────────────────────────────────────────────────────────────

export const DISCRIMINATION_RESOURCES: LocalizedResource[] = [
  {
    name: "היחידה הממשלתית לתיאום המאבק בגזענות — משרד המשפטים",
    phone: "*3406",
    url: "https://www.gov.il/he/service/complaint-about-racism",
    description: {
      he: "תלונות על אפליה על רקע גזעני, ובכללן במערכת החינוך. הטופס המקוון קיים גם באמהרית. דוא\"ל: antiracismunit@justice.gov.il. היחידה מנתבת את התלונה לגורם המוסמך ועוקבת אחר הטיפול.",
      en: "Complaints of racially motivated discrimination, including in the education system. The online form is also available in Amharic. Email: antiracismunit@justice.gov.il. The unit routes the complaint to the competent body and tracks its handling.",
      am: "በዘር ላይ የተመሠረተ አድሎ ቅሬታዎች፣ በትምህርት ሥርዓት ውስጥ ያሉትንም ጨምሮ። የመስመር ላይ ቅጹ በአማርኛም አለ። ኢሜይል፦ antiracismunit@justice.gov.il።",
    },
  },
  {
    name: "מוקד השירות והמידע הארצי להורים — משרד החינוך",
    phone: "*6552",
    url: "https://parents.education.gov.il/prhnet/contact-us/ptichat-pniya",
    description: {
      he: "מוקד ארצי להורים, שלוחה 2. ימים א׳–ה׳ 7:30–17:00, ו׳ 7:30–13:00. אפשר גם לפתוח פנייה מקוונת בקישור.",
      en: "National line for parents, extension 2. Sunday–Thursday 7:30–17:00, Friday 7:30–13:00. An online enquiry can also be opened at the link.",
      am: "ለወላጆች ብሔራዊ መስመር፣ ቅጥያ 2። እሑድ–ሐሙስ 7:30–17:00፣ ዓርብ 7:30–13:00። በአገናኙ የመስመር ላይ አቤቱታም መክፈት ይቻላል።",
    },
  },
  {
    name: "פורטל פניות הציבור — משרד החינוך (לפי מחוז)",
    url: "https://pnzportal.education.gov.il/?machoz",
    description: {
      he: 'הגשת תלונה רשמית למחוז. "רישום תלמידים" הוא נושא מפורש בפניות הציבור המחוזיות. הטופס שואל אם כבר פניתם להנהלת המוסד — צרפו את ההתכתבות.',
      en: 'Filing a formal complaint with the district. "Student registration" is an expressly listed topic for district public inquiries. The form asks whether you already approached the institution\'s administration — attach the correspondence.',
      am: "ለአውራጃው መደበኛ ቅሬታ ማቅረቢያ። \"የተማሪ ምዝገባ\" በአውራጃ የሕዝብ አቤቱታዎች ውስጥ ግልጽ ርዕስ ነው። ደብዳቤዎቹን ያያይዙ።",
    },
  },
  {
    name: "טבקה — משפט וצדק לעולי אתיופיה",
    phone: "072-2424622",
    url: "https://www.tebeka.org.il",
    description: {
      he: "ייצוג וייעוץ משפטי חינם בתחומי אפליה וגזענות, ובכללם חינוך. שירות בעברית ובאמהרית. דוא\"ל: general@tebeka.org.il. גיבורי ישראל 2, רחובות.",
      en: "Free legal representation and advice on discrimination and racism, education included. Service in Hebrew and Amharic. Email: general@tebeka.org.il. Giborei Israel 2, Rehovot.",
      am: "በአድሎና በዘረኝነት ጉዳዮች ነጻ የሕግ ውክልናና ምክር፣ ትምህርትንም ጨምሮ። በዕብራይስጥና በአማርኛ አገልግሎት። ኢሜይል፦ general@tebeka.org.il።",
    },
  },
  {
    name: "מגשרים בבתי ספר — הפרויקט הלאומי לקהילה האתיופית בישראל (ENP)",
    url: "https://www.enp.org.il/he/programs/School_Cultural_Mediators/",
    description: {
      he: "מגשרים יוצאי אתיופיה, בעלי הכשרה בחינוך, בעבודה סוציאלית ובגישור תרבותי, הפועלים בבתי ספר עם ריכוז גבוה של תלמידים יוצאי אתיופיה — מקדמים מעורבות הורים ומתווכים בין המשפחה לבית הספר. התוכנית אינה פועלת בכל בית ספר; בררו מול בית הספר או מול ENP.",
      en: "Mediators of Ethiopian descent, trained in education, social work and cultural mediation, working in schools with high concentrations of Ethiopian-Israeli pupils — promoting parental involvement and mediating between family and school. The programme does not operate in every school; check with the school or with ENP.",
      am: "በትምህርት፣ በማኅበራዊ ሥራና በባህል ሽምግልና የሠለጠኑ የኢትዮጵያ ተወላጅ አስታራቂዎች፣ የኢትዮጵያ ተወላጅ ተማሪዎች በብዛት ባሉባቸው ትምህርት ቤቶች የሚሠሩ — የወላጆችን ተሳትፎ ያበረታታሉ። ፕሮግራሙ በሁሉም ትምህርት ቤት አይሠራም።",
    },
  },
];

// ── sources ────────────────────────────────────────────────────────────────

export const DISCRIMINATION_SOURCES: LocalizedSource[] = [
  {
    name: {
      he: 'חוק זכויות התלמיד, התשס"א-2000 — נוסח מלא (נבו)',
      en: "Student Rights Law, 5761-2000 — full text (Nevo, Hebrew)",
      am: "የተማሪ መብቶች ሕግ 2000 — ሙሉ ጽሑፍ (ነቮ)",
    },
    url: "https://www.nevo.co.il/law_html/law00/71830.htm",
  },
  {
    name: {
      he: "חוק זכויות התלמיד — נוסח מלא (ויקיטקסט)",
      en: "Student Rights Law — full text (Wikisource, Hebrew)",
      am: "የተማሪ መብቶች ሕግ — ሙሉ ጽሑፍ (ዊኪምንጭ)",
    },
    url: "https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%96%D7%9B%D7%95%D7%99%D7%95%D7%AA_%D7%94%D7%AA%D7%9C%D7%9E%D7%99%D7%93",
  },
  {
    name: {
      he: 'חוק לימוד חובה, התש"ט-1949 (ויקיטקסט)',
      en: "Compulsory Education Law, 5709-1949 (Wikisource, Hebrew)",
      am: "የግዴታ ትምህርት ሕግ 1949 (ዊኪምንጭ)",
    },
    url: "https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%9C%D7%99%D7%9E%D7%95%D7%93_%D7%97%D7%95%D7%91%D7%94",
  },
  {
    name: {
      he: 'תקנות לימוד חובה וחינוך ממלכתי (רישום), תשי"ט-1959 (ויקיטקסט)',
      en: "Compulsory and State Education (Registration) Regulations, 5719-1959 (Wikisource, Hebrew)",
      am: "የግዴታና የመንግሥት ትምህርት (ምዝገባ) ደንቦች 1959 (ዊኪምንጭ)",
    },
    url: "https://he.wikisource.org/wiki/%D7%AA%D7%A7%D7%A0%D7%95%D7%AA_%D7%9C%D7%99%D7%9E%D7%95%D7%93_%D7%97%D7%95%D7%91%D7%94_%D7%95%D7%97%D7%99%D7%A0%D7%95%D7%9A_%D7%9E%D7%9E%D7%9C%D7%9B%D7%AA%D7%99_(%D7%A8%D7%99%D7%A9%D7%95%D7%9D)",
  },
  {
    name: {
      he: 'תקנות חינוך ממלכתי (העברה), תשי"ט-1959 (ויקיטקסט)',
      en: "State Education (Transfer) Regulations, 5719-1959 (Wikisource, Hebrew)",
      am: "የመንግሥት ትምህርት (ዝውውር) ደንቦች 1959 (ዊኪምንጭ)",
    },
    url: "https://he.wikisource.org/wiki/%D7%AA%D7%A7%D7%A0%D7%95%D7%AA_%D7%97%D7%99%D7%A0%D7%95%D7%9A_%D7%9E%D7%9E%D7%9C%D7%9B%D7%AA%D7%99_(%D7%94%D7%A2%D7%91%D7%A8%D7%94)",
  },
  {
    name: {
      he: 'תקנות חינוך ממלכתי (מוסדות מוכרים), תשי"ד-1953 (ויקיטקסט)',
      en: "State Education (Recognised Institutions) Regulations, 5714-1953 (Wikisource, Hebrew)",
      am: "የመንግሥት ትምህርት (የተመዘገቡ ተቋማት) ደንቦች 1953 (ዊኪምንጭ)",
    },
    url: "https://he.wikisource.org/wiki/%D7%AA%D7%A7%D7%A0%D7%95%D7%AA_%D7%97%D7%99%D7%A0%D7%95%D7%9A_%D7%9E%D7%9E%D7%9C%D7%9B%D7%AA%D7%99_(%D7%9E%D7%95%D7%A1%D7%93%D7%95%D7%AA_%D7%9E%D7%95%D7%9B%D7%A8%D7%99%D7%9D)",
  },
  {
    name: {
      he: 'חוק פיקוח על בתי ספר, התשכ"ט-1969 (ויקיטקסט)',
      en: "Supervision of Schools Law, 5729-1969 (Wikisource, Hebrew)",
      am: "የትምህርት ቤቶች ቁጥጥር ሕግ 1969 (ዊኪምንጭ)",
    },
    url: "https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%A4%D7%99%D7%A7%D7%95%D7%97_%D7%A2%D7%9C_%D7%91%D7%AA%D7%99_%D7%A1%D7%A4%D7%A8",
  },
  {
    name: {
      he: 'מרכז המחקר והמידע של הכנסת — אתי וייסבלאי, "השתלבותם של יוצאי אתיופיה במערכת החינוך" (12.8.2010)',
      en: 'Knesset Research and Information Center — Eti Weissblai, "The integration of Ethiopian-Israelis in the education system" (12.8.2010)',
      am: "የክነሴት ምርምርና መረጃ ማዕከል — አቲ ዋይስብላይ (12.8.2010)",
    },
    url: "https://fs.knesset.gov.il/globaldocs/MMM/c0cd81db-49cd-e911-80fe-00155d0a9536/2_c0cd81db-49cd-e911-80fe-00155d0a9536_11_13510.pdf",
  },
  {
    name: {
      he: 'מרכז המחקר והמידע של הכנסת — יובל וורגן, "שילוב תלמידים יוצאי אתיופיה במערכת החינוך" (12.6.2006)',
      en: 'Knesset Research and Information Center — Yuval Vurgan, "Integrating Ethiopian-Israeli pupils in the education system" (12.6.2006)',
      am: "የክነሴት ምርምርና መረጃ ማዕከል — ዩቫል ቩርገን (12.6.2006)",
    },
    url: "https://fs.knesset.gov.il/globaldocs/MMM/9b5a6b58-e9f7-e411-80c8-00155d010977/2_9b5a6b58-e9f7-e411-80c8-00155d010977_11_13509.pdf",
  },
  {
    name: {
      he: 'מרכז המחקר והמידע של הכנסת — "נתונים על תלמידים יוצאי אתיופיה הזכאים לשירותי חינוך מיוחדים" (11.8.2022)',
      en: 'Knesset Research and Information Center — "Data on Ethiopian-Israeli pupils entitled to special education services" (11.8.2022)',
      am: "የክነሴት ምርምርና መረጃ ማዕከል — ለልዩ ትምህርት ብቁ ስለሆኑ የኢትዮጵያ ተወላጅ ተማሪዎች መረጃ (11.8.2022)",
    },
    url: "https://fs.knesset.gov.il/globaldocs/MMM/49051bab-f3f5-ec11-8149-005056aac6c3/2_49051bab-f3f5-ec11-8149-005056aac6c3_11_19618.pdf",
  },
  {
    name: {
      he: "רישום לבית ספר יסודי — כל-זכות",
      en: "Registration for primary school — Kol Zchut",
      am: "የመጀመሪያ ደረጃ ትምህርት ቤት ምዝገባ — ኮል ዝኹት",
    },
    url: "https://www.kolzchut.org.il/he/%D7%A8%D7%99%D7%A9%D7%95%D7%9D_%D7%9C%D7%91%D7%99%D7%AA_%D7%A1%D7%A4%D7%A8_%D7%99%D7%A1%D7%95%D7%93%D7%99",
  },
];

// ── short route copy (headings, labels, disclaimer) ────────────────────────

export const DISCRIMINATION_COPY: Record<string, Record<Locale, string>> = {
  summaryHeading: {
    he: "סיכום באמהרית — ማጠቃለያ በአማርኛ",
    en: "Summary in Amharic — ማጠቃለያ በአማርኛ",
    am: "ማጠቃለያ በአማርኛ",
  },
  stepsHeading: {
    he: "מה עושים — צעד אחר צעד",
    en: "What to do — step by step",
    am: "ምን ማድረግ እንዳለብዎ — ደረጃ በደረጃ",
  },
  bodyHeading: {
    he: "המדריך המלא",
    en: "The full guide",
    am: "ሙሉ መመሪያው",
  },
  faqHeading: {
    he: "שאלות נפוצות",
    en: "Frequently asked questions",
    am: "በተደጋጋሚ የሚጠየቁ ጥያቄዎች",
  },
  crosslinkHeading: {
    he: "קשור לעניין",
    en: "Related",
    am: "ተዛማጅ",
  },
  crosslinkBody: {
    he: "אפליה ברישום היא לרוב חלק מתמונה רחבה יותר של יחסי הורים–מערכת. שלושת העמודים האלה משלימים זה את זה.",
    en: "Registration discrimination is usually part of a wider picture of the parent–system relationship. These three pages complement one another.",
    am: "በምዝገባ ላይ ያለ አድሎ ብዙውን ጊዜ የወላጅ–ሥርዓት ግንኙነት ሰፊ ምስል አካል ነው። እነዚህ ሦስት ገጾች እርስ በርስ ይሟሉላሉ።",
  },
  resourcesHeading: {
    he: "למי פונים",
    en: "Whom to contact",
    am: "ማንን ማነጋገር",
  },
  sourcesHeading: { he: "מקורות", en: "Sources", am: "ምንጮች" },
  websiteLabel: { he: "לאתר", en: "Website", am: "ድህረ ገጽ" },
  disclaimer: {
    he: "המדריך מתאר את הדין ואת הנהלים כפי שהם מפורסמים במקורות רשמיים, ואינו ייעוץ משפטי. מועדי רישום, כתובות ונהלים משתנים — אמתו מול הרשות המקומית ומול מחוז משרד החינוך. תוכן פסק הדין בבג\"ץ 7426/08 לא אומת ממקור ראשוני ולכן אינו מתואר כאן.",
    en: "This guide describes the law and procedures as published in official sources and is not legal advice. Registration dates, addresses and procedures change — verify with the local authority and the Ministry of Education district. The content of the judgment in HCJ 7426/08 was not verified from a primary source and is therefore not described here.",
    am: "ይህ መመሪያ ሕጉንና ሂደቶቹን በይፋዊ ምንጮች እንደታተሙት ይገልጻል እንጂ የሕግ ምክር አይደለም። የምዝገባ ቀኖች፣ አድራሻዎችና ሂደቶች ይለወጣሉ — ከአካባቢው ባለሥልጣንና ከትምህርት ሚኒስቴር አውራጃ ያረጋግጡ።",
  },
};

export function discriminationCopy(
  key: keyof typeof DISCRIMINATION_COPY,
  locale: Locale,
): string {
  return DISCRIMINATION_COPY[key]![locale];
}

// ── loader payload builders ───────────────────────────────────────────────

export function discriminationSteps(locale: Locale): GuideStep[] {
  return DISCRIMINATION_STEPS.map((s) => ({
    id: s.id,
    title: s.title[locale],
    detail: s.detail[locale],
    officialUrl: s.officialUrl,
    officialLabel: s.officialLabel?.[locale],
    internalPath: s.internalPath,
    internalLabel: s.internalLabel?.[locale],
  }));
}

export function discriminationFaq(locale: Locale): GuideFaqItem[] {
  return DISCRIMINATION_FAQ.map((f) => ({
    id: f.id,
    question: f.question[locale],
    answer: f.answer[locale],
  }));
}

export function discriminationResources(locale: Locale): GuideResource[] {
  return DISCRIMINATION_RESOURCES.map((r) => ({
    name: r.name,
    phone: r.phone,
    url: r.url,
    description: r.description[locale],
  }));
}

export function discriminationSources(locale: Locale): GuideSource[] {
  return DISCRIMINATION_SOURCES.map((s) => ({ name: s.name[locale], url: s.url }));
}

export function discriminationCrosslinks(locale: Locale): GuideCrosslink[] {
  return [
    {
      path: eligibilityCommitteePath(),
      label: {
        he: 'הופנה לוועדת השמה? מה זו ועדת זכאות ואפיון ואיך מגישים השגה',
        en: "Referred to a placement committee? The eligibility committee and how to object",
        am: "ወደ ኮሚቴ ተልኳል? የብቁነት ኮሚቴውና አቤቱታ እንዴት ማቅረብ እንደሚቻል",
      }[locale],
    },
    {
      path: parentRightsPath(),
      label: {
        he: "אסיפת הורים ראשונה — הזכויות שלכם בבית הספר",
        en: "The first parents' meeting — your rights at school",
        am: "የመጀመሪያው የወላጆች ስብሰባ — በትምህርት ቤት ያሉዎት መብቶች",
      }[locale],
    },
    {
      path: "/voice",
      label: {
        he: "קול ופעולה — התמודדות עם גזענות ואפליה",
        en: "Voice and action — confronting racism and discrimination",
        am: "ድምጽና እርምጃ — ዘረኝነትንና አድሎን መጋፈጥ",
      }[locale],
    },
  ];
}
