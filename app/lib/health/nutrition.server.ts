// Health Hub Wave 3 — Nutrition Hub (RIN-659).
//
// 5 nutrition tips covering the dietary transition experienced by
// Ethiopian Israelis — with community-specific data on diabetes risk,
// fasting practices, and the health value of traditional foods.
//
// HE is the source-of-truth locale (CLAUDE.md). EN + AM are mirrors.
// YMYL: all content emphasises consulting a doctor or dietitian.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export type NutritionCategory = "preserve" | "limit" | "transition";

export interface NutritionTipEntry {
  slug: string;
  title: Translatable;
  body: Translatable;
  category: NutritionCategory;
  lastReviewed: string;
}

export const NUTRITION_TIPS: NutritionTipEntry[] = [
  // ── 1. Injera benefits (preserve) ──────────────────────────────────────────
  {
    slug: "injera-benefits",
    title: {
      he: "יתרונות האינג׳רה — שמרו על הלחם המסורתי",
      en: "The benefits of injera — keep the traditional bread",
      am: "የእንጀራ ጥቅሞች — ባህላዊ ምግቡን ይጠብቁ",
    },
    body: {
      he: `האינג׳רה — לחם טפה מותסס — הוא אחד ממזוני הדגל של התרבות האתיופית, ומסתבר שהוא גם בריאותי ביחס ללחמים אחרים. הטפה (teff) הוא דגן עתיר ערך תזונתי: הוא מכיל כמות גבוהה של סיבים תזונתיים, ברזל, סידן, ואנטיאוקסידנטים. בשל תהליך ההתססה, האינג׳רה בעלת אינדקס גליקמי נמוך — כלומר היא מעלה את רמת הסוכר בדם לאט יותר מלחם לבן, מה שמועיל במיוחד לאנשים עם סוכרת או סיכון לסוכרת.

מחקרים מראים שבסמוך לאחר העלייה לישראל, בני הקהילה שהמשיכו לאכול אינג׳רה ומזון מסורתי נמצאו בסיכון נמוך יותר לפתח סוכרת — לעומת אלה שעברו מהר לתזונה מערבית עתירת פחמימות מעובדות. הירידה ב-consumption של האינג׳רה לאחר העלייה מקושרת חלקית לעלייה בשיעורי הסוכרת.

המסר: אל תוותרו על האינג׳רה. אם אתם מגדלים ילדים — הכירו להם את המזון המסורתי. האינג׳רה זמינה בחנויות אתיופיות בערים הגדולות בישראל. שמירה על מאכלים מסורתיים בריאים כמו אינג׳רה, עדשים, וירקות היא חלק חשוב מאסטרטגיית בריאות לטווח ארוך.`,
      en: `Injera — fermented teff flatbread — is a cornerstone of Ethiopian culture and also happens to be nutritionally superior to many common breads. Teff is a highly nutritious grain: it contains elevated levels of dietary fiber, iron, calcium, and antioxidants. Due to the fermentation process, injera has a low glycemic index — meaning it raises blood sugar more slowly than white bread, which is especially beneficial for people with or at risk for diabetes.

Research shows that in the period following immigration to Israel, community members who continued eating injera and traditional foods were at lower risk of developing diabetes than those who rapidly transitioned to a Western diet high in refined carbohydrates. The decline in injera consumption after immigration is partly linked to rising diabetes rates.

The message: do not give up injera. If you are raising children, introduce them to traditional foods. Injera is available at Ethiopian stores in Israel's major cities. Maintaining healthy traditional foods like injera, lentils, and vegetables is an important part of any long-term health strategy.`,
      am: `እንጀራ — የተፈሰሰ ጤፍ — ከሌሎች ዳቦዎች ይልቅ ጤናማ ነው። ጤፍ ምግብ ሸካራ፣ ብረት፣ ካልሲየም፣ እና ፀረ-ኦክሲዳንት ይዟል። ዝቅተኛ glycemic index አለው — ደም ስኳርን ቀስ ብሎ ያወጣዋል።

ምርምር እንደሚያሳይ ኢሚግሬሽን ከጀበ ዛሬ እስካሁን እንጀራ ሲበሉ ሰዎች ዝቅተኛ ስኳር ህመም አደጋ ተጋጥሟቸዋል። እንጀራዎን አያቆሙ — ለህፃናትዎ ቀዩ።`,
    },
    category: "preserve",
    lastReviewed: "2026-05-11",
  },

  // ── 2. Legumes and Lentils (preserve) ──────────────────────────────────────
  {
    slug: "legumes-lentils",
    title: {
      he: "קטניות ועדשים — נשק סודי לבריאות",
      en: "Legumes and lentils — a secret weapon for health",
      am: "ጥቅም ያለው ቀስ ቅሊቶ እና ምስር — ጤናን ለማስጠበቅ",
    },
    body: {
      he: `המטבח האתיופי עשיר בקטניות ועדשים — מיסיר (עדשים אדומות), ሽሮ (ציר עדשים מעובד), ברቡרה, ועוד. אלה הם ממקורות חלבון צמחי מדרגה ראשונה, ועשירים בסיבים תזונתיים, ברזל, חומצה פולית, ואשלגן. מחקרים גדולים מראים שצריכה סדירה של קטניות מפחיתה את הסיכון למחלות לב, סוכרת סוג 2, ומחלות מעיים.

היתרון של הקטניות האתיופיות הוא כפול: הן מזינות ובמקביל בעלות עלות נמוכה יחסית בישראל. הן מהוות תחליף מצוין לבשר מעובד ולשומן רווי, ומרכיבות ארוחות מאוזנות שמתאימות לימי צום אורתודוקסים ולאורח חיים בריא בכלל.

מסר לקהילה: כאשר אתם עוברים לאורח חיים ישראלי יומיומי, שימרו על הבישול הקטניות המסורתי. מסיר, שירו, וכיסרה אינם רק חלק מהמורשת — הם חלק בסיסי מתזונה בריאה ומונעת מחלות. פגישה עם דיאטנית קלינית, שאפשר לקבל הפנייה אליה מרופא משפחה, יכולה לעזור לשלב את המאכלים האלה בצורה מיטבית בתוך תזונה מאוזנת.`,
      en: `Ethiopian cuisine is rich in legumes and lentils — misir (red lentils), shiro (processed lentil paste), berbere preparations, and more. These are first-class sources of plant protein, and are rich in dietary fiber, iron, folate, and potassium. Large studies show that regular legume consumption reduces the risk of heart disease, type 2 diabetes, and bowel disease.

The advantage of Ethiopian legumes is twofold: they are nutritious and relatively affordable in Israel. They provide an excellent alternative to processed meats and saturated fats, and form balanced meals that suit Orthodox fasting days and a healthy lifestyle in general.

Message for the community: as you adapt to everyday Israeli life, preserve traditional legume cooking. Misir, shiro, and kisra are not just part of heritage — they are a foundational part of a healthy, disease-preventive diet. A referral to a clinical dietitian (available through a family doctor) can help integrate these foods optimally within a balanced meal plan.`,
      am: `የኢትዮጵያ ምግብ ምስር — ሙስር (ቀይ ምስር)፣ ሽሮ፣ ወዘተ — ሙሉ ነው። ዕፅዋት ፕሮቲን፣ ምግብ ሸካራ፣ ብረት፣ ፎሌት ይዘዋል። ምርምር ልብ ሕመም፣ ስኳር ህመም፣ እና የሆድ ህመም አደጋን ይቀንሳሉ ይላል።

ኢሚግሬሽን ሆዳምዎን ቦታ ቀይ ምስር፣ ሽሮ ምግብ ያቆዩ — ዕብራ ምሉ ቅርፅ ብቻ ሳይሆን ጤናን ሊያጠብቁ ይችላሉ። ዲዬቲሺያን ሐኪምዎ ዘንድ ሊያስፈሩ ይቻለዎ።`,
    },
    category: "preserve",
    lastReviewed: "2026-05-11",
  },

  // ── 3. Limit Processed Food (limit) ────────────────────────────────────────
  {
    slug: "limit-processed-food",
    title: {
      he: "להגביל מזון מעובד — הקשר לסוכרת",
      en: "Limit processed food — the link to diabetes",
      am: "ሂደት ምግብ ይቀንሱ — ከስኳር ህመም ጋር ያለ ግንኙነት",
    },
    body: {
      he: `אחד הממצאים המדאיגים ביותר בבריאות קהילת יוצאי אתיופיה הוא הקשר הישיר בין שינוי התזונה לאחר העלייה לבין שיעור הסוכרת. בזמן העלייה — שיעור הסוכרת בקהילה עמד על 0.4% בלבד. לאחר 10-16 שנות מגורים בישראל, שיעור זה זינק ל-17.7%. אחד הגורמים המרכזיים לקפיצה הזאת הוא מעבר ממזון מסורתי מלא לתזונה ישראלית/מערבית עשירה במזון מעובד.

מזון מעובד כולל: לחם לבן, בורקס, קרואסון, שתייה ממותקת (קולה, מיצים תעשייתיים), חטיפים מלוחים, ונקניקיות. הבעיה: מזונות אלה עשירים בסוכר מהיר, שומן טראנס, ומלח — וגורמים לעלייה חדה ברמת הסוכר בדם לאחר האכילה. לאורך זמן, הדבר מוביל לעמידות לאינסולין ולסוכרת.

צעדים ממשיים: הפחיתו לחם לבן — החליפו בלחם שיפון, קמח מלא, או אינג׳רה. הגבילו שתייה ממותקת לאוקזיה. הכינו נשנושים מבית — אגוזים, פירות, ירקות חתוכים. קראו תוויות מזון — אם הרכיב הראשון הוא סוכר או קמח לבן, בחרו אחרת. שינויים קטנים ועקביים עדיפים על דיאטות קיצוניות שאי אפשר לקיים לאורך זמן.`,
      en: `One of the most concerning findings in Ethiopian-Israeli community health is the direct link between dietary change after immigration and diabetes rates. At the time of immigration, the community's diabetes rate stood at just 0.4%. After 10-16 years of living in Israel, this rate surged to 17.7%. A central factor driving this increase is the shift from traditional whole foods to an Israeli/Western diet high in processed foods.

Processed foods include: white bread, burekas, croissants, sugary drinks (cola, commercial juices), salty snacks, and processed deli meats. The problem: these foods are rich in fast sugars, trans fats, and salt, causing sharp post-meal blood sugar spikes. Over time, this leads to insulin resistance and diabetes.

Practical steps: reduce white bread — substitute rye bread, whole grain, or injera. Limit sugary drinks to occasional consumption. Prepare homemade snacks — nuts, fruits, cut vegetables. Read food labels — if the first ingredient is sugar or white flour, choose a different product. Small, consistent changes are better than extreme diets that cannot be maintained long-term.`,
      am: `ዋናው ምርምር: ኢሚግሬሽን ጊዜ 0.4% ስኳር ህመም ነበር — 10-16 ዓመት ቆይቶ 17.7% ሆነ። ዋናው ምክንያት: ሂደት ምግብ ወደ ሥሩ ቀይ ብዙ።

ሂደት ምግብ ወይም ምን ይወሰዳሉ: ነጭ ዳቦ፣ ሶዳ፣ ሂደት ሥጋ። ይቀንሱ — ይህ ስኳር ህመምን ያቆያል። ትንሽ ትንሽ ቀውጢ ለዘለቄታ ይሻላል።`,
    },
    category: "limit",
    lastReviewed: "2026-05-11",
  },

  // ── 4. Fasting and Medication (transition) ─────────────────────────────────
  {
    slug: "fasting-medication",
    title: {
      he: "צום ותרופות — חשוב לדעת",
      en: "Fasting and medication — important to know",
      am: "ጾምና መድሃኒቶች — ማወቅ ያስፈልጋል",
    },
    body: {
      he: `הצום האתיופי-אורתודוקסי מחייב כ-180 ימים בשנה של הימנעות ממוצרים מן החי. לרוב אנשים הצום בריא ומחזק. אולם, אנשים הנוטלים תרופות כרוניות — לסוכרת, לחץ דם, אפילפסיה, בריאות הנפש, ו-HIV — עלולים להיתקל בסיכונים רפואיים משמעותיים אם ממשיכים לצום בלי להתאים את הטיפול.

מה יכול לקרות: תרופות לסוכרת הנלקחות ללא אכילה (בעיקר אינסולין ומטפורמין) עלולות לגרום להיפוגליקמיה — סוכר נמוך מסוכן שגורם להתעלפות וחרדה. תרופות לחץ דם הנלקחות בצום ממושך עלולות לגרום לנפילת לחץ. תרופות ל-HIV שצריכות להילקח עם אוכל — עלולות לגרום לתופעות לוואי חמורות בצום.

הפתרון פשוט ואינו דורש ויתור על הצום: שיחה עם רופא המשפחה לפני הצום הגדול (סביב אפריל-מאי) ולפני כל תקופת צום ממושכת. הרופא יכול להתאים מינון, לשנות זמן נטילה, ולהמליץ על פרוטוקול צום-בריא. בישראל, הרופאים מכירים את הצום האתיופי — אל תהססו לפנות ולבקש.`,
      en: `Ethiopian Orthodox fasting requires approximately 180 days per year of abstaining from animal products. For most people, fasting is healthy and spiritually enriching. However, people taking ongoing medications — for diabetes, blood pressure, epilepsy, mental health, and HIV — may face significant medical risks if they continue fasting without adjusting their treatment.

What can happen: diabetes medications taken without food (especially insulin and metformin) can cause hypoglycemia — dangerously low blood sugar that causes fainting and distress. Blood pressure medications taken during prolonged fasting can cause pressure drops. HIV medications that need to be taken with food can cause severe side effects when taken while fasting.

The solution is simple and does not require giving up fasting: speak with your family doctor before the Great Fast (approximately April-May) and before any extended fasting period. The doctor can adjust dosages, change timing of doses, and recommend a safe-fasting protocol. In Israel, doctors are familiar with Ethiopian fasting — do not hesitate to ask.`,
      am: `ኢትዮጵያ ኦርቶዶክስ ጾም ~180 ቀናት ዓመት ያካሂዳል። ለብዙ ሰዎች ጾሙ ጤናማ ነው። ግን ሥር የሰደዱ መድሃኒቶች የሚወስዱ ሰዎች — ስኳር ህመም፣ ደም ግፊት፣ HIV — አደጋ ሊያጋጥሟቸው ይችሉ።

ምን ሊሆን ይችላል: ስኳር ህመም መድሃኒት ያለ ምግብ ሲወሰድ ዝቅተኛ ደም ስኳር ሊያስከትል ይችላል። ሐኪምዎን ቀዱሞ ጾምዎ ያሳውቁ — ጾምዎን ሳያቆሙ ምናልባት የሚወስዱት ጊዜ ሊለወጥ ይችላል።`,
    },
    category: "transition",
    lastReviewed: "2026-05-11",
  },

  // ── 5. Dietary Transition (transition) ─────────────────────────────────────
  {
    slug: "dietary-transition",
    title: {
      he: "מעבר תזונתי הדרגתי — איך לשמור על הטוב",
      en: "Gradual dietary transition — how to keep the good",
      am: "ቀስ ያለ የምግብ ሽግግር — ጥሩዎቹን እንዴት ማቆየት",
    },
    body: {
      he: `מעבר לחברה חדשה כרוך לעיתים קרובות בשינוי תזונתי חד. עבור יוצאי אתיופיה בישראל, השינוי הזה עלול להיות דרמטי — ממזון מסורתי מלא (אינג׳רה, קטניות, ירקות, שמן זית) לתזונה ישראלית מהירה ומעובדת. הנתונים מדברים בעד עצמם: עלייה של פי 44 בשיעור הסוכרת במהלך שנות הקליטה.

הגישה המומלצת היא הדרגתיות: אל תנסו לשנות הכול בבת-אחת. שימרו רכיבים מהמטבח האתיופי שאתם אוהבים — אינג׳רה, טיבס, מיסיר, שירו — ושלבו בהדרגה מאכלים ישראלים בריאים (ירקות שורש, חומוס, לחמים מדגניים מלאים). תכננו ארוחת שבוע אחת לפחות שהיא ארוחה אתיופית מסורתית.

עצות מעשיות לשמירה על בריאות בתוך התרבות החדשה: בשוק, בחרו בירקות ובפירות טריים על פני מוצרים ארוזים. אפו לחם בבית כאשר אפשר — תהליך ההתססה של האינג׳רה פשוט ומשתלם. הגבילו ארוחות מהירות לפעמיים שלוש בשבוע לכל היותר. שתו מים, לא שתייה ממותקת. ובכל שאלה תזונתית — דיאטנית קלינית היא הכתובת.`,
      en: `Moving to a new society often involves abrupt dietary change. For Ethiopian Israelis, this transition can be dramatic — from traditional whole foods (injera, legumes, vegetables, olive oil) to fast, processed Israeli food. The data speak for themselves: a 44-fold increase in diabetes rates over the years of absorption.

The recommended approach is gradual: do not try to change everything at once. Preserve elements of the Ethiopian kitchen you enjoy — injera, tibs, misir, shiro — and gradually integrate healthy Israeli foods (root vegetables, hummus, whole-grain breads). Plan at least one meal per week that is a traditional Ethiopian meal.

Practical tips for maintaining health within the new culture: at the market, choose fresh vegetables and fruits over packaged products. Bake bread at home when possible — the injera fermentation process is simple and rewarding. Limit fast food to two or three times per week at most. Drink water, not sugary beverages. And for any nutritional questions — a clinical dietitian is the right address.`,
      am: `አዲስ ሀገር ሲደርሱ ምግብ ብዙ ጊዜ ይቀየራል። ለኢትዮጵያ-እስራኤላውያን ይህ ዓብይ ለውጥ ሊሆን ይችላል — ሂደት ምግብ ወደ ሥሩ ከቀየሩ 44 እጥፍ ስኳር ህመም ጨምሯል።

ቀስ ለውጥ ይሻላል። ሙሉ ለሙሉ አዲስ ምግብ አቅጣጫ አይሂዱ — አስናው ቀስ ቅሊቶ፣ ሽሮ፣ ምስር ምግብ ጨምሮ ይቀጥሉ። ሳምንቱ አንዴ ቢያንስ ባህላዊ ምግብ ይብሉ። ለምግብ ጥያቄዎ ዲዬቲሺያን ሐኪምዎ ዘንድ ሊያስፈሩ ይቻለዎ።`,
    },
    category: "transition",
    lastReviewed: "2026-05-11",
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findTip(slug: string): NutritionTipEntry | undefined {
  return NUTRITION_TIPS.find((t) => t.slug === slug);
}

export function tipTitle(entry: NutritionTipEntry, locale: Locale): string {
  return entry.title[locale] ?? entry.title[DEFAULT_LOCALE] ?? entry.title.he;
}

export function tipBody(entry: NutritionTipEntry, locale: Locale): string {
  return entry.body[locale] ?? entry.body[DEFAULT_LOCALE] ?? entry.body.he;
}
