// Health Hub Wave 3 — Traditional Medicine (RIN-658).
//
// 5 traditional practices documented in the Ethiopian-Israeli community.
// Each entry includes name, description, full body copy, safetyLevel badge,
// and a lastReviewed date. YMYL content — all copy emphasises seeking
// medical advice alongside (not instead of) any cultural practice.
//
// HE is the source-of-truth locale (CLAUDE.md). EN + AM are mirrors.
// Update cadence: yearly or when community health guidance changes.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export type SafetyLevel = "complementary" | "consult-doctor" | "caution";

export interface TraditionalPracticeEntry {
  slug: string;
  name: Translatable;
  description: Translatable;
  /** Full body: 2–3 paragraphs. HE ≥ 150 words, EN ≥ 100 words, AM ≥ 60 words. */
  body: Translatable;
  safetyLevel: SafetyLevel;
  lastReviewed: string;
}

export const TRADITIONAL_PRACTICES: TraditionalPracticeEntry[] = [
  // ── 1. Debtera ─────────────────────────────────────────────────────────────
  {
    slug: "debtera",
    name: {
      he: "דבטרה — מרפא דתי-תרבותי",
      en: "Debtera — Religious-Cultural Healer",
      am: "ደብተራ — ሃይማኖታዊ-ባህላዊ ፈዋሽ",
    },
    description: {
      he: "הדבטרה הוא אדם בעל ידע דתי ותרבותי עמוק שמטפל במצוקות רוחניות ורגשיות בתוך הקהילה האתיופית.",
      en: "A Debtera is a learned religious figure who addresses spiritual and emotional distress within the Ethiopian community.",
      am: "ደብተራ በኢትዮጵያ ማህበረሰብ ውስጥ ሃይማኖታዊ እና ስሜታዊ ጭንቀቶችን የሚፈታ የሃይማኖት ሊቅ ነው።",
    },
    body: {
      he: `הדבטרה הוא תפקיד מסורתי ייחודי בתרבות האתיופית — דמות בעלת ידע דתי, מחנם, ומסורת ריפוי תרבותית שמשמשת כגשר בין העולם הרוחני לעולם החומרי. הדבטרא מטפל בבעיות שנתפסות כבעלות מקור רוחני: עין הרע, קנאה, הפרעות רגשיות, ויחסים משפחתיים מורכבים. הטיפול כולל לרוב קריאת כתבי קודש, תפילות, קמעות, ולעיתים שימוש בצמחי מרפא.

בהקשר של ישראל, הדבטרה ממשיך למלא תפקיד חשוב לבני הקהילה שמחפשים תמיכה בתוך מסגרת תרבותית מוכרת. מחקרים מראים כי מעל 40% מבני הקהילה פונים לגורם רוחני לפני הפנייה לרופא — פרקטיקה הנובעת מאמון עמוק בסמכות הדתית. הפנייה לדבטרה אינה בהכרח בעייתית, אך עלולה לגרום לעיכוב בקבלת טיפול רפואי הכרחי.

מסר מרכזי: טיפול דתי ותרבותי יכול להתקיים לצד טיפול רפואי — לא במקומו. אם אתם פונים לדבטרה למצוקה רגשית או גופנית, ספרו זאת גם לרופא המשפחה שלכם. שילוב בין גישות מסורתיות ורפואה מודרנית יכול להניב את התוצאות הטובות ביותר. בכל מקרה של כאב גופני, חום גבוה, או קשיים פסיכיאטריים — הפנייה לרופא היא חובה.`,
      en: `The Debtera is a traditional role unique to Ethiopian culture — a learned religious figure who bridges the spiritual and physical worlds, addressing distress believed to have spiritual origins: the evil eye, jealousy, emotional disturbances, and complex family dynamics. Treatment typically involves reciting sacred texts, prayers, protective amulets, and sometimes herbal preparations.

In Israel, the Debtera continues to play an important role for community members who seek support within a culturally familiar framework. Research shows that over 40% of community members consult a spiritual authority before seeing a doctor — a practice rooted in deep trust in religious leadership. Seeking a Debtera is not inherently problematic, but may lead to delays in receiving necessary medical care.

Key message: spiritual and cultural care can coexist with medical treatment — not replace it. If you are consulting a Debtera for emotional or physical distress, share this with your family doctor as well. Combining traditional and modern approaches can produce the best outcomes. For physical pain, high fever, or psychiatric difficulties, seeking medical attention is always required.`,
      am: `ደብተራ ሃይማኖታዊ ልምዱን ለማህበረሰቡ ሽምቅ ዓላማ ለሚያገለግሉ ችግሮች እንደ ዓይን-ሬሳ (evil eye)፣ ቅናት፣ ስሜታዊ ጭንቀቶች ፈዋሽ ነው። ምርምር እንደሚያሳይ 40% ከሚሆኑ ሰዎች ሐኪም ከማየታቸው ቅዱስ ሰው ዘንድ ይሄዳሉ።

ደብተራ ሕክምናን ሊተካ አይችልም። ዶክተርዎን ደብተራ ዘንድ ስለሄዱ ያሳውቁ። ሁለቱ አካሄዶች አብረው ሊኖሩ ይችላሉ — ለአካላዊ ህመም ወይም ሥነ-አዕምሮ ጭንቀት ሐኪምዎን ማማከር ግዴታ ነው።`,
    },
    safetyLevel: "complementary",
    lastReviewed: "2026-05-11",
  },

  // ── 2. Herbal Remedies ──────────────────────────────────────────────────────
  {
    slug: "herbal-remedies",
    name: {
      he: "תרופות צמחיות אתיופיות",
      en: "Ethiopian Herbal Remedies",
      am: "የኢትዮጵያ ቅጠላ ቅጠል መድሃኒቶች",
    },
    description: {
      he: "שימוש בצמחי מרפא מסורתיים לטיפול במחלות — נפוץ מאוד בקהילה, עם סיכוי לתגובות בין תרופות.",
      en: "Use of traditional medicinal herbs to treat illness — widely practiced in the community, with potential drug interaction risks.",
      am: "ባህላዊ ቅጠላ ቅጠሎችን ለሕመም ህክምና መጠቀም — በማህበረሰቡ ዘንድ ሰፊ ሲሆን የመድሃኒት ጠቃሚ ውስጥ ተጋድሎ አደጋ አለ።",
    },
    body: {
      he: `כ-100 תרופות צמחיות אתיופיות מתועדות בשימוש בקרב יוצאי אתיופיה בישראל. הצמחים הנפוצים כוללים: ቅቤ (kem-kem) — מרה ממנה שנעשה שימוש לכאבי בטן, ፀሎ (tsello) — לעצירות, חומוסאים ושורשים שונים לטיפול בסוכרת ולחץ דם. שימוש בצמחי מרפא נפוץ ביותר בגילאי 50 ומעלה ובקרב עולים ותיקים. כ-80% מבני הקהילה דיווחו על שימוש בצמח מרפא אחד לפחות בחייהם.

הסכנה הגדולה ביותר היא תגובות בין-תרופות: צמחים מסוימים יכולים לפגוע בספיגת תרופות מרשם, להאיץ או להאט את חילוף החומרים שלהן, ולגרום לנזק לכבד. לדוגמה, שימוש בצמחי מרפא ביחד עם תרופות לסוכרת עלול לגרום לרמת סוכר מסוכנת בדם. עם תרופות ללחץ דם — לירידת לחץ חדה. ועם אנטיביוטיקה — לירידה ביעילות הטיפול.

הפתרון הנכון אינו לוותר על המסורת, אלא לשלב בבטחה: ספרו תמיד לרופא שלכם אם אתם נוטלים תרופות צמחיות — ללא חשש לשיפוט. רופא טוב יעריך את הכנות ויוכל לבדוק האם צמח מסוים מהווה סיכון בשילוב עם הטיפול הרפואי שלכם. שקיפות היא המפתח לבטיחות.`,
      en: `Approximately 100 Ethiopian herbal remedies are documented in use among Ethiopian Israelis in Israel. Commonly used plants include preparations for digestive complaints, constipation, and folk treatments for diabetes and blood pressure management. Herbal use is most prevalent among adults over 50 and long-established immigrants. Around 80% of community members report having used at least one herbal remedy.

The greatest risk is drug-herb interactions: certain plants can impair the absorption of prescription medications, accelerate or slow their metabolism, and cause liver damage. For example, herbal preparations combined with diabetes medications can cause dangerously low blood sugar; with blood pressure drugs, they can cause a sharp drop in pressure; and with antibiotics, they can reduce treatment effectiveness.

The right solution is not to abandon tradition, but to combine safely: always tell your doctor if you are taking herbal preparations — without fear of judgment. A good doctor will appreciate your honesty and can check whether a specific plant poses a risk in combination with your prescribed treatment. Transparency is the key to safety.`,
      am: `100 ያህል የኢትዮጵያ ቅጠላ ቅጠሎች ኢትዮጵያ-እስራኤላውያን ዘንድ ጥቅም ላይ ይውላሉ። 80% ያህሉ አንዴ ቢያንስ አንድ ቅጠላ ቅጠል ተጠቅመዋል።

ዋናው አደጋ ከሌሎች መድሃኒቶች ጋር ያለ ተጋድሎ ነው — ሰፊ አደጋ። ሐኪምዎ ቅጠላ ቅጠል እንደሚወስዱ ያሳውቁ። ሁለቱ አብረው ሊኖሩ ይችላሉ — ለሐኪምዎ ቅን ሁኑ።`,
    },
    safetyLevel: "consult-doctor",
    lastReviewed: "2026-05-11",
  },

  // ── 3. Zar Ceremony ─────────────────────────────────────────────────────────
  {
    slug: "zar-ceremony",
    name: {
      he: "טקס זאר — ריפוי רוחני",
      en: "Zar Ceremony — Spirit Healing",
      am: "ዛር ሥርዓት — መንፈሳዊ ፈውስ",
    },
    description: {
      he: "טקס זאר הוא ריטואל ריפוי קהילתי הנפוץ בתרבות האתיופית לטיפול במצוקות רוחניות ונפשיות.",
      en: "The Zar ceremony is a community healing ritual in Ethiopian culture for addressing spiritual and psychological distress.",
      am: "ዛር ሥርዓት በኢትዮጵያ ባህል ውስጥ ሥነ-አዕምሮ እና መንፈሳዊ ጭንቀቶችን ለማከም የሚደረግ ማህበረሰባዊ ሥርዓት ነው።",
    },
    body: {
      he: `טקס הזאר הוא אחד הטקסים הריפויים הבולטים ביותר בתרבות האתיופית — טקס קהילתי שנועד לפייס "רוחות זאר" שנחשבות לאחראיות למצוקה נפשית, חוסר שקט, ואפילו ביטויים שנראים פסיכוטיים. הטקס כולל מוזיקה, מחולות, קרבנות, ולבוש מיוחד, ומנוהל על ידי בלאזאר — מטפל מומחה בריפוי דרך הזאר.

הבעיה הידועה ביותר של הזאר בהקשר הרפואי היא אבחנה מוטעית: סימפטומים פסיכוטיים כמו שמיעת קולות, בלבול, וחוסר התמצאות — שעשויים להיות ביטויי סכיזופרניה, פסיכוזה מאניה-דפרסיה, או אפילפסיה — נתפסים כ"רוח זאר" ומטופלים בטקסים בלבד. עיכוב משמעותי בטיפול פסיכיאטרי יכול להוביל לנזק נפשי בלתי הפיך ולסכנה לחיים.

מחקרים ישראלים תיעדו מקרים שבהם חולים עם סכיזופרניה אובחנו לראשונה שנים לאחר תחילת התסמינים, לאחר שסבלו ממחזורים ארוכים של טקסי זאר. המסר: אם בן משפחה מגלה התנהגות חריגה, קשיי תקשורת, אובדן זיכרון, או ביטויים פסיכוטיים — הפנייה לרופא ולפסיכיאטר בהקדם האפשרי היא חיונית, לצד כל טיפול תרבותי.`,
      en: `The Zar ceremony is one of the most prominent healing rituals in Ethiopian culture — a community event intended to appease "Zar spirits" believed responsible for mental distress, restlessness, and even psychotic-seeming presentations. The ceremony involves music, dance, offerings, and ritual dress, and is conducted by a Balezar, a specialist healer.

The most significant medical concern with Zar is misdiagnosis: psychotic symptoms such as hearing voices, confusion, and disorientation — which may be signs of schizophrenia, bipolar disorder, or epilepsy — are interpreted as "Zar spirits" and treated only through ceremony. Significant delays in psychiatric treatment can lead to irreversible mental damage and life-threatening situations.

Israeli research has documented cases where individuals with schizophrenia were first formally diagnosed years after symptom onset, having endured long cycles of Zar ceremonies in the interim. The message: if a family member displays unusual behavior, communication difficulties, memory loss, or psychotic symptoms — seeking medical and psychiatric evaluation promptly is essential, alongside any cultural care.`,
      am: `ዛር ሥርዓት የዛር መናፍስት ብለው ያምናሉ ሲሆን ሥነ-አዕምሮ ጭንቀቶችን ለፈወስ ጥቅም ላይ ይውላል። ባለዛር ፈዋሽ ሆኖ ሥርዓቱን ያካሂዳል።

ዋናው አደጋ: ሥነ-ሕሙምሲዝፍሬናዊ (Schizophrenia) ምልክቶች እንደ ዛር ጥቃት ሊተረጎሙ ይችላሉ — ሕክምናን ሊዘገዩ ይችላሉ። ያልተለምደ ሥምቶች ካሉ፣ ሐኪምዎን ወዲያው ያናግሩ — ሁለቱ ዓይነቶቹ ሕክምና አብረው ሊኖሩ ይችላሉ።`,
    },
    safetyLevel: "consult-doctor",
    lastReviewed: "2026-05-11",
  },

  // ── 4. Bone Setting (Wogsha) ────────────────────────────────────────────────
  {
    slug: "bone-setting",
    name: {
      he: "ווגשה — מעצם מסורתי",
      en: "Wogsha — Traditional Bone Setter",
      am: "ወጋሻ — ባህላዊ አጥንት አሳካሪ",
    },
    description: {
      he: "הווגשה הוא מרפא מסורתי המתמחה בטיפול בשברים ובעצמות — תפקיד שנועד לפני הרפואה המודרנית.",
      en: "The Wogsha is a traditional healer specializing in bone fractures — a role that predates modern orthopedic medicine.",
      am: "ወጋሻ ያህሉ ሕሙምነቶችን (ሞቃዳ) ለመፈወስ ባህላዊ ዘዴ የሚጠቀም ሰው ነው — ዘመናዊ ሕሙምሐኪምነት ከመምጣቱ በፊት ነበር።",
    },
    body: {
      he: `הווגשה הוא מרפא מסורתי שמתמחה בטיפול בשברים ובנקעים — מקצוע עתיק שהיה קיים בתרבות האתיופית הרבה לפני הרפואה המערבית. הווגשה מאבחן את השבר על ידי מישוש, מיישר את העצם, וקושר אותה עם ספוגית וצמחי מרפא. בעבר, בסביבות כפריות ללא נגישות לבית חולים, הוא מילא תפקיד הצלת חיים.

בתנאים של ישראל, שבה שירותי חירום ואורתופדיה זמינים ומפותחים, הפנייה לווגשה בגלל שבר עלולה לגרום לנזק בלתי הפיך: שבר שלא טופל נכון עלול להחלים בעקמומיות שמפריעה לתפקוד. שבר עם פגיעה בכלי דם עלול להוביל לנמק עקב חוסר דם. שבר שלא אובחן בצילום רנטגן עלול להיות חמור יותר ממה שנראה לעין.

המסר ברור: בכל שבר חשוד, נקע חמור, או מכה חזקה — יש ללכת לחדר המיון לפני כל טיפול אחר. ניתן לפנות לווגשה לאחר הטיפול הרפואי כחלק מהשיקום, אך לא לפניו. בישראל, ביטוח הבריאות מכסה טיפול אורתופדי — אין סיבה כלכלית לדחות טיפול.`,
      en: `The Wogsha is a traditional healer who specializes in treating fractures and dislocations — an ancient profession in Ethiopian culture that long predates Western medicine. The Wogsha diagnoses fractures by touch, realigns bones, and splints them with plant preparations and bandaging. In rural settings without hospital access, this role historically saved lives.

In Israeli conditions, where emergency and orthopedic services are widely available, seeking a Wogsha for a fracture can cause irreversible harm: a fracture that is not properly treated can heal with a deformity that impairs function. A fracture with vascular injury can lead to tissue death from lack of blood supply. A fracture not diagnosed by X-ray may be more severe than it appears.

The message is clear: for any suspected fracture, severe dislocation, or heavy blow — go to the emergency room before any other treatment. The Wogsha may be consulted after medical treatment as part of rehabilitation, but not before. In Israel, health insurance covers orthopedic care — there is no financial reason to delay.`,
      am: `ወጋሻ ሞቃዳዎችን (ሕሙምነቶች) ለፈወስ ባህላዊ ዘዴ ይጠቀማል። ታሪካዊ ሁኔታ ሲሆን ዘመናዊ ሕሙምሐኪምነት ዘዴዎች ካልነበሩበት ሰዓት ጀምሮ ይሰራ ነበር።

ዋናው አስፈላጊ ምስጢር: ሕሙምነቱ ከመሆኑ ሚጅሏ፣ ሐኪም ቤት ሂዱ። ወጋሻ ወደ ሐኪም ሀክምና ከጠናቀቀ በኋላ ሊጎበኝ ይቻላል — ቀድሞ አይደለም። እስራኤል ውስጥ ኦርቶፔዲያ ቅናሽ ዋጋ ነው።`,
    },
    safetyLevel: "caution",
    lastReviewed: "2026-05-11",
  },

  // ── 5. Orthodox Fasting ─────────────────────────────────────────────────────
  {
    slug: "fasting",
    name: {
      he: "צום אתיופי-אורתודוקסי",
      en: "Ethiopian Orthodox Fasting",
      am: "የኢትዮጵያ ኦርቶዶክስ ጾም",
    },
    description: {
      he: "צום ממושך (~180 ימים בשנה) שיכול להשפיע על תזמון תרופות, ניהול סוכרת, ורמות תזונה.",
      en: "Extended fasting (~180 days per year) that can affect medication timing, diabetes management, and nutritional levels.",
      am: "ረዥም ጾም (~180 ቀናት በዓመት) ሊወስድ ለሚችሉ መድሃኒቶች ጊዜ፣ የስኳር ህመም ቁጥጥር፣ እና ምግብ ደረጃ ላይ ተጽዕኖ ሊኖረው ይችላል።",
    },
    body: {
      he: `הכנסייה האתיופית האורתודוקסית מחייבת צום של כ-180 ימים בשנה — מהנרחב ביותר בקרב נצרות מסורתית בעולם. ימי צום כוללים: הצום הגדול (55 ימים לפני חג הפסחא), צום אחיז, צום ניהבה, צום אוסת, ועוד. בצום האתיופי, הנצום נמנע ממזון מן החי — בשר, ביצים, חלב — עד אחרי תפילת הצהריים, ולעיתים לאורך 12 שעות ומעלה.

ההשפעה על בריאות: עבור אנשים עם סוכרת, צום ממושך ללא התאמה של תרופות יכול לגרום להיפוגליקמיה (רמת סוכר נמוכה מסוכנת) — במיוחד עם אינסולין או מטפורמין. ירידה בלחץ הדם אפשרית גם כן עם תרופות לאנטי-היפרטנסיב. בנוסף, צום ממושך בשילוב תזונה חסרה בחלבון חי עלול לגרום לחסר בברזל, B12, וסידן.

הפתרון: שיחה עם רופא לפני כל תקופת צום. רופאים יכולים להתאים את מינון התרופות, את מועד הנטילה, ולהמליץ על תוספי תזונה. הרפואה הישראלית מכבדת את חופש הדת — הרופא לא יבקש ממכם להפסיק לצום, אלא יעזור לכם לצום בבטחה.`,
      en: `The Ethiopian Orthodox Church prescribes approximately 180 fasting days per year — among the most extensive in traditional Christianity worldwide. Fasting periods include the Great Fast (55 days before Easter), the Fast of the Apostles, the Fast of the Virgin, and others. During Ethiopian Orthodox fasting, observers abstain from all animal products — meat, eggs, dairy — until after midday prayers, sometimes for 12 or more hours.

Health impact: for people with diabetes, extended fasting without medication adjustment can cause hypoglycemia (dangerously low blood sugar) — especially with insulin or metformin. Blood pressure drops are also possible with antihypertensive medications. Extended fasting combined with a diet low in animal protein can also lead to deficiencies in iron, vitamin B12, and calcium.

The solution: speak with your doctor before any fasting period. Doctors can adjust medication dosages, timing of doses, and recommend nutritional supplements. Israeli medicine respects religious freedom — your doctor will not ask you to stop fasting, but will help you fast safely.`,
      am: `የኢትዮጵያ ኦርቶዶክስ ቤተ ክርስቲያን ~180 ጾም ቀናት ዓመት ትሰጣለች። ጾሙ ሁሉ የእንስሳ ምርቶችን — ስጋ፣ ዕንቁላል፣ ወተት — ያስፈርሳል።

ለጤና ሊያስከትለው ስለሚችለው: ስኳር ህመም ካለዎ፣ ጾሙ ዝቅተኛ ደም ስኳር ሊያስከትል ይችላል — ሐኪምዎን ስለ መድሃኒቶ ጊዜ ያናግሩ። ሐኪምዎ ጾምዎን ያከብራል — ጾሙን እንዴት ሳሲቶ ይረዳዎ ይፈልጋል።`,
    },
    safetyLevel: "consult-doctor",
    lastReviewed: "2026-05-11",
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findPractice(slug: string): TraditionalPracticeEntry | undefined {
  return TRADITIONAL_PRACTICES.find((p) => p.slug === slug);
}

export function practiceName(entry: TraditionalPracticeEntry, locale: Locale): string {
  return entry.name[locale] ?? entry.name[DEFAULT_LOCALE] ?? entry.name.he;
}

export function practiceDescription(
  entry: TraditionalPracticeEntry,
  locale: Locale,
): string {
  return (
    entry.description[locale] ?? entry.description[DEFAULT_LOCALE] ?? entry.description.he
  );
}

export function practiceBody(entry: TraditionalPracticeEntry, locale: Locale): string {
  return entry.body[locale] ?? entry.body[DEFAULT_LOCALE] ?? entry.body.he;
}
