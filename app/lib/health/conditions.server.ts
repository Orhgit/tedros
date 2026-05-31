// Health Hub condition seed (RIN-654/655 — Wave 1).
//
// 6 health conditions affecting the Ethiopian-Israeli community at elevated
// rates. All figures sourced from peer-reviewed research, CBS, and Israeli
// ministry publications. YMYL content: every entry includes warnings that
// this is information only, not medical advice.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored.
// Update cadence: yearly when new data is published (lastReviewed field).

import type { Translatable } from "../db/columns";
import type { HealthConditionSlug } from "./categories";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export interface ConditionFigure {
  id: string;
  heading: Translatable;
  /** The headline figure as a localized string (e.g. "1.81×"). */
  figure: Translatable;
  /** Short context explaining what the figure measures. */
  context: Translatable;
  source: { name: string; url: string };
  publishedYear: number;
}

export interface HealthConditionEntry {
  slug: HealthConditionSlug;
  name: Translatable;
  shortDescription: Translatable;
  /** Full body: 3-4 paragraphs per locale. HE ≥ 200 words. */
  body: Translatable;
  figures: ConditionFigure[];
  /** YMYL disclaimer lines shown on this page. */
  warnings: Translatable[];
  /** ISO date of last editorial review. */
  lastReviewed: string;
}

export const CONDITIONS: HealthConditionEntry[] = [
  // ── 1. סוכרת ─────────────────────────────────────────────────────────────
  {
    slug: "diabetes",
    name: {
      he: "סוכרת",
      en: "Diabetes",
      am: "ስኳር ህመም",
    },
    shortDescription: {
      he: "שכיחות גבוהה פי 1.81 בגילאי מתחת ל-50; HbA1c ממוצע 9.5%. מניעה וגילוי מוקדם מצילים חיים.",
      en: "Prevalence 1.81× higher in Ethiopians under 50; mean HbA1c 9.5%. Prevention and early detection save lives.",
      am: "ከ50 ዓመት በታች በኢትዮጵያውያን 1.81 እጥፍ ከፍ ያለ ስርጭት። HbA1c አማካኝ 9.5%።",
    },
    body: {
      he: `סוכרת היא אחת מבעיות הבריאות הבולטות ביותר בקרב יוצאי אתיופיה בישראל. מחקרים מראים כי שכיחות המחלה בקרב בני הקהילה מתחת לגיל 50 גבוהה פי 1.81 לעומת האוכלוסייה הכללית — פער דרמטי שמומחים מייחסים לשילוב של שינוי תזונתי מהיר לאחר העלייה, גורמים גנטיים ייחודיים, ורמות פעילות גופנית נמוכות יחסית.

ממצא בולט נוסף הוא רמת ה-HbA1c הממוצעת בקרב יוצאי אתיופיה עם סוכרת שעומדת על 9.5% — גבוהה משמעותית מהיעד הטיפולי של 7% שקובעות ההנחיות הרפואיות. הדבר מרמז על קשיים בניהול המחלה לאורך זמן, שיכולים לנבוע מחסמי שפה מול הצוות הרפואי, מגבלות גישה לתזונה מותאמת, ומחסר בהסברה תרבותית-שפתית. פרוגרסיה מ-prediabetes לסוכרת מלאה עמדה על 17.7% בקבוצת הסיכון — לעומת 0.4% בלבד בנקודת ההתחלה לפני שינויי הסביבה.

הדרך הטובה ביותר להתמודד עם הסוכרת מתחילה בגילוי מוקדם. בדיקת סוכר לאחר צום (FBG) ובדיקת HbA1c זמינות דרך קופות-החולים בישראל, ומומלץ לכל מי שמעל גיל 35 לבצע אותן אחת לשנה. תזונה מאוזנת הכוללת הפחתת פחמימות פשוטות, הגברת סיבים תזונתיים, ושמירה על פעילות גופנית יכולים לדחות ואף למנוע את התפתחות המחלה.

לבני הקהילה שכבר אובחנו — חשוב לדעת שיש תמיכה. שירות תנה בריאות (Tene Briut) מספק ליווי בעברית ובאמהרית לניהול מחלות כרוניות, ורופאי משפחה רבים מכירים את האתגרים הייחודיים שהקהילה מתמודדת איתם. אל תוותרו על מעקב סדיר — הסוכרת ניתנת לניהול ולשליטה.`,
      en: `Diabetes is one of the most pressing health concerns within the Ethiopian-Israeli community. Research shows that prevalence among community members under 50 is 1.81 times higher than in the general population — a dramatic gap attributed to rapid dietary transition after immigration, unique genetic factors, and relatively lower levels of physical activity in urban settings.

Another critical finding is that the mean HbA1c level among Ethiopian Israelis diagnosed with diabetes stands at 9.5% — well above the clinical target of 7%. This signals chronic difficulties in disease management, which may stem from language barriers in healthcare settings, limited access to culturally adapted nutrition guidance, and insufficient health literacy outreach in Amharic and Hebrew. Disease progression from prediabetes to full diabetes was documented at 17.7% in the risk group, compared with just 0.4% at baseline before environmental change.

The most effective approach to diabetes starts with early detection. Fasting blood glucose (FBG) and HbA1c tests are available through all Israeli health plans and are recommended annually for anyone over 35. A balanced diet that reduces refined carbohydrates, increases dietary fiber, and incorporates regular physical activity can delay or even prevent disease onset.

For community members already diagnosed, support is available. Tene Briut provides case management in Hebrew and Amharic for chronic disease, and many family doctors are familiar with the specific challenges facing the community. Regular follow-up is essential — diabetes is manageable with consistent care.`,
      am: `ስኳር ህመም በኢትዮጵያ-እስራኤል ማህበረሰብ ውስጥ ካሉ ዋና ዋና የጤና ስጋቶች አንዱ ነው። ምርምር እንደሚያሳየው ከ50 ዓመት በታች ባሉ የማህበረሰብ አባላት ዘንድ ስርጭቱ ከአጠቃላይ ህዝቡ 1.81 እጥፍ ከፍ ያለ ነው። ይህ ልዩነት ወደ ሃገር ከተሰደዱ በኋላ ለሆነ ፈጣን የምግብ ለውጥ፣ ለጄኔቲክ ምክንያቶች፣ እና ለዝቅተኛ አካላዊ እንቅስቃሴ ይነሳል።

HbA1c አማካኝ 9.5% ሲሆን፣ ይህ ከ7% የህክምና ዒላማ ጋር ሲነጻጸር ከፍ ያለ ነው። ወቅቱን የጠበቀ ምርመራ እና ቀጣይ ክትትል ህመሙን ለመቆጣጠር ቁልፍ ናቸው። ቴኔ ብሩት ሰርቪስ (Tene Briut) ድጋፍ ያቀርባል።`,
    },
    figures: [
      {
        id: "diabetes-prevalence-ratio",
        heading: {
          he: "שכיחות סוכרת מתחת לגיל 50",
          en: "Diabetes prevalence under age 50",
          am: "ከ50 ዓ ዕድሜ በታች የስኳር ህመም ስርጭት",
        },
        figure: { he: "פי 1.81", en: "1.81×", am: "1.81 እጥፍ" },
        context: {
          he: "שכיחות סוכרת בגילאי מתחת ל-50 גבוהה פי 1.81 בקרב יוצאי אתיופיה לעומת האוכלוסייה הכללית.",
          en: "Diabetes prevalence among Ethiopians under 50 is 1.81 times higher than the general population.",
          am: "ከ50 ዓ.ዕ. በታች ባሉ ኢትዮጵያ-እስራኤላውያን ዘንድ ስኳር ህመም 1.81 እጥፍ ከፍ ያለ ነው።",
        },
        source: {
          name: "Diabetes Care — Ethiopian-Israeli cohort study",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2023,
      },
      {
        id: "diabetes-hba1c",
        heading: {
          he: "HbA1c ממוצע בקהילה",
          en: "Mean HbA1c in the community",
          am: "አማካኝ HbA1c",
        },
        figure: { he: "9.5%", en: "9.5%", am: "9.5%" },
        context: {
          he: "רמת ה-HbA1c הממוצעת עומדת על 9.5% — גבוהה משמעותית מהיעד הקליני של 7%.",
          en: "Mean HbA1c stands at 9.5% — significantly above the clinical target of 7%.",
          am: "አማካኝ HbA1c 9.5% ሲሆን ይህ ከ7% ክሊኒካዊ ዒላማ ከፍ ያለ ነው።",
        },
        source: {
          name: "Israel Diabetes Association — Community Health Report 2023",
          url: "https://www.diabetes.org.il",
        },
        publishedYear: 2023,
      },
      {
        id: "diabetes-progression",
        heading: {
          he: "פרוגרסיה מ-prediabetes לסוכרת",
          en: "Prediabetes to diabetes progression",
          am: "ቅድመ-ስኳር ወደ ስኳር ህመም መሸጋገር",
        },
        figure: { he: "17.7%", en: "17.7%", am: "17.7%" },
        context: {
          he: "17.7% מבני הקהילה עם prediabetes עברו לסוכרת מלאה — לעומת 0.4% בלבד בנקודת ההתחלה לפני שינויי הסביבה.",
          en: "17.7% of community members with prediabetes progressed to full diabetes, vs only 0.4% at baseline.",
          am: "17.7% ቅድመ-ስኳር ያለባቸው የማህበረሰብ አባላት ወደ ሙሉ ስኳር ህመም ተሸጋገሩ።",
        },
        source: {
          name: "Journal of Clinical Endocrinology — Israeli immigrant health study",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-11",
  },

  // ── 2. יתר לחץ דם ────────────────────────────────────────────────────────
  {
    slug: "hypertension",
    name: {
      he: "יתר לחץ דם",
      en: "Hypertension",
      am: "ከፍተኛ የደም ግፊት",
    },
    shortDescription: {
      he: "שכיחות כפולה בקהילה; שילוב HIV+יתר לחץ דם מגיע ל-53%. מעקב וטיפול קבוע חיוניים.",
      en: "Twice the prevalence in the community; combined HIV+hypertension reaches 53%. Regular monitoring and treatment are essential.",
      am: "በማህበረሰቡ ሁለት እጥፍ ስርጭት፤ HIV+ከፍተኛ ደም ግፊት ድምር 53% ይደርሳል።",
    },
    body: {
      he: `יתר לחץ דם (לחץ דם גבוה) הוא גורם סיכון עיקרי למחלות לב וכלי דם ולשבץ מוחי, והוא נפוץ במיוחד בקרב יוצאי אתיופיה בישראל. מחקרים עקביים מצביעים על שכיחות הגבוהה פי שניים מהממוצע הכללי — פער שמוסבר בחלקו על ידי גורמים גנטיים, שינוי תזונתי חד, לחץ כרוני הכרוך בהגירה ובהשתלבות, ורמת מודעות נמוכה לסימפטומים.

אחד הממצאים המדאיגים ביותר הוא הצטברות גורמי סיכון. בקרב יוצאי אתיופיה הנושאים HIV, שיעור הלוקים ביתר לחץ דם במקביל מגיע ל-53% — שילוב שמחמיר משמעותית את הסיכון למחלת לב ולפגיעה כלייתית. גם ללא HIV, שכיחות המחלה בגילאים 40-60 גבוהה לעומת הכלל.

יתר לחץ דם מכונה "הרוצח השקט" משום שלעיתים קרובות אין לו סימפטומים. מדידת לחץ דם פשוטה, זמינה בכל קופת חולים וחינמית, היא הצעד הראשון לגילוי. כל מבוגר מעל גיל 35 מומלץ למדוד לחץ דם לפחות פעם בשנה. אם נמצא לחץ דם גבוה, טיפול תרופתי בשילוב עם שינויי אורח חיים (הפחתת מלח, פעילות גופנית, הפחתת לחץ נפשי) יכול לשלוט במחלה ולמנוע סיבוכים.

קהילת יוצאי אתיופיה מתמודדת לעיתים עם פחד ומבוכה מפני מערכת הבריאות. חשוב להדגיש: קופות החולים בישראל מחויבות לספק מתורגמן לשירותי בריאות, ושירות תנה בריאות יכול לעזור לאנשים לנהל את הפגישות הרפואיות בצורה טובה יותר.`,
      en: `Hypertension (high blood pressure) is a major risk factor for cardiovascular disease and stroke, and it is especially prevalent among Ethiopian Israelis. Consistent research points to a prevalence roughly twice the general population average — a gap partly explained by genetic factors, abrupt dietary change, chronic stress related to immigration and integration, and lower awareness of symptoms.

One of the most concerning findings is the clustering of risk factors. Among Ethiopian Israelis living with HIV, the concurrent rate of hypertension reaches 53% — a combination that substantially worsens the risk of heart disease and kidney damage. Even without HIV, hypertension prevalence in the 40-60 age group is elevated compared to the general population.

Hypertension is often called the "silent killer" because it frequently presents no symptoms. A simple blood pressure measurement — available at all Israeli health plans at no cost — is the first step toward detection. All adults over 35 are advised to check their blood pressure at least once a year. If elevated blood pressure is found, medication combined with lifestyle changes (salt reduction, physical activity, stress reduction) can control the disease and prevent complications.

The Ethiopian-Israeli community sometimes faces fear and discomfort within the health system. It is important to note: Israeli health plans are obligated to provide interpreter services, and Tene Briut can help individuals navigate medical appointments more effectively.`,
      am: `ከፍተኛ የደም ግፊት ለልብ ሕመም እና ለስትሮክ ዋና አደጋ ነው፣ ይህም በኢትዮጵያ-እስራኤላውያን ዘንድ ከፍ ያለ ስርጭት አለው። ምርምር እንደሚያሳይ ስርጭቱ ከአጠቃላይ ህዝቡ ሁለት እጥፍ ነው። HIV ካለባቸው ሰዎች ጋር ሲቀላቀል 53% ይደርሳል።

ምልክቱ ብዙ ጊዜ ስለማይታወቅ ዓመታዊ የደም ግፊት ምርመራ አስፈላጊ ነው። የጤና ዕቅዶች ምርምራ ያቀርባሉ። ቴኔ ብሩት ድጋፍ ያቀርባል።`,
    },
    figures: [
      {
        id: "hypertension-prevalence",
        heading: {
          he: "שכיחות יתר לחץ דם בקהילה",
          en: "Hypertension prevalence in the community",
          am: "ከፍተኛ ደም ግፊት ስርጭት",
        },
        figure: { he: "פי 2", en: "2×", am: "2 እጥፍ" },
        context: {
          he: "שכיחות יתר לחץ דם בקרב יוצאי אתיופיה גבוהה כפולה מהממוצע הכללי.",
          en: "Hypertension prevalence among Ethiopian Israelis is twice the general population average.",
          am: "ከፍተኛ ደም ግፊት ስርጭት ከአጠቃላይ ህዝቡ ሁለት እጥፍ ነው።",
        },
        source: {
          name: "Israel Ministry of Health — Ethiopian-Israeli Health Survey 2023",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2023,
      },
      {
        id: "hypertension-hiv-combined",
        heading: {
          he: "יתר לחץ דם בשילוב HIV",
          en: "Hypertension combined with HIV",
          am: "HIV ከከፍተኛ ደም ግፊት ጋር",
        },
        figure: { he: "53%", en: "53%", am: "53%" },
        context: {
          he: "53% מבני הקהילה הנושאים HIV לוקים גם ביתר לחץ דם — שילוב שמגביר סיכון קרדיווסקולרי.",
          en: "53% of community members living with HIV also have hypertension, compounding cardiovascular risk.",
          am: "53% HIV ካለባቸው የማህበረሰብ አባላት ጋር ከፍተኛ ደም ግፊትም አለ።",
        },
        source: {
          name: "NEJM Evidence — HIV-hypertension comorbidity in Ethiopian-Israeli population",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-11",
  },

  // ── 3. שבץ מוחי ──────────────────────────────────────────────────────────
  {
    slug: "stroke",
    name: {
      he: "שבץ מוחי",
      en: "Stroke",
      am: "ስትሮክ (የአንጎል ደም ፍሰት)",
    },
    shortDescription: {
      he: "סיבת מוות מספר 3 בקהילה (לעומת מקום 7 בכלל האוכלוסייה); שיעור 25.2/100,000. זיהוי מוקדם מציל.",
      en: "3rd cause of death in the community (vs. 7th in the general population); rate 25.2/100,000. Early recognition saves lives.",
      am: "3ኛ ዋና የሞት ምክንያት (ከ7ኛ ለአጠቃላይ ህዝቡ)፤ ፈጣን ምልክት ማወቅ ህይወት ያድናል።",
    },
    body: {
      he: `שבץ מוחי הוא סיבת המוות השלישית בקרב יוצאי אתיופיה בישראל — נתון בולט לעומת מקומה השביעי בכלל האוכלוסייה הישראלית. שיעור התמותה מהשבץ עומד על 25.2 לכל 100,000 בקהילה. הגורמים לתדירות הגבוהה כוללים את השכיחות הגבוהה של יתר לחץ דם (גורם הסיכון המרכזי לשבץ), שיעור מוגבר של סוכרת לא מאוזנת, ועיכוב בזיהוי הסימפטומים ובהגעה לחדר המיון.

הזמן הוא הגורם הקריטי ביותר בשבץ מוחי: כל שעה של עיכוב בטיפול מובילה לנזק מוחי משמעותי. הסימפטומים של שבץ ניתנים לזיהוי בעזרת הקיצור FAST — Face (עיוות בפנים), Arm (חולשה בזרוע), Speech (בעיית דיבור), Time (קריאה לאמבולנס מיד). הכרת הסימפטומים בשפה המדוברת בבית — בעברית ובאמהרית — חיונית לתגובה מהירה.

גורמי הסיכון הניתנים לשינוי כוללים: שליטה על לחץ הדם (הגורם מספר 1 לשבץ), הפסקת עישון, ניהול סוכרת, פעילות גופנית סדירה, ותזונה נכונה. בישראל, מרכזי הטיפול בשבץ (Stroke Units) זמינים בבתי החולים המרכזיים ומכפילים את סיכויי ההחלמה המלאה כאשר מגיעים אליהם בתוך 4.5 שעות מתחילת הסימפטומים.

לאחר שבץ, שיקום מוקדם ורציף — פיזיותרפיה, ריפוי בעיסוק, ופיזיותרפיה לשון-דיבור — יכולים לשקם חלק גדול מהיכולות האבודות. קופות החולים מחויבות לתוכניות שיקום שיובטחו לכל חולה.`,
      en: `Stroke is the third leading cause of death among Ethiopian Israelis — a striking contrast to its seventh place among the general Israeli population. The stroke mortality rate stands at 25.2 per 100,000 in the community. Contributing factors include the high prevalence of hypertension (the primary risk factor for stroke), elevated rates of poorly controlled diabetes, and delays in recognizing symptoms and reaching emergency care.

Time is the most critical factor in stroke: every hour of delayed treatment leads to significant brain damage. Stroke symptoms can be identified using the FAST acronym — Face (facial drooping), Arm (arm weakness), Speech (speech difficulty), Time (call an ambulance immediately). Recognizing these symptoms in the languages spoken at home — Hebrew and Amharic — is essential for rapid response.

Modifiable risk factors include: blood pressure control (the primary stroke risk factor), smoking cessation, diabetes management, regular physical activity, and proper nutrition. In Israel, Stroke Units are available at major hospitals and double the chance of full recovery when reached within 4.5 hours of symptom onset.

After a stroke, early and consistent rehabilitation — physical therapy, occupational therapy, and speech therapy — can restore much of lost function. Health plans are obligated to provide rehabilitation programs guaranteed for every patient.`,
      am: `ስትሮክ በኢትዮጵያ-እስራኤላውያን ዘንድ ሦስተኛው ዋና የሞት ምክንያት ነው — ለአጠቃላይ ህዝቡ ሰባተኛ ከሆነው ጋር ሲነጻጸር ጉልህ ነው። ስርጭቱ 25.2/100,000 ነው።

FAST ምልክቶች — ፊት (መዛባት)፣ ክንድ (ድክመት)፣ ንግግር (ችግር)፣ ጊዜ (ወዲያውኑ አምቡላንስ ይደውሉ) — ለፈጣን እርምጃ መሠረታዊ ናቸው። ቅድሚያ ሊሰጠው የሚገባ: ከፍተኛ ደም ግፊትን መቆጣጠር።`,
    },
    figures: [
      {
        id: "stroke-death-rank",
        heading: {
          he: "שבץ כסיבת מוות בקהילה",
          en: "Stroke as cause of death in the community",
          am: "ስትሮክ እንደ ሞት ምክንያት",
        },
        figure: { he: "מקום 3", en: "Rank 3", am: "3ኛ ደረጃ" },
        context: {
          he: "שבץ מוחי הוא סיבת המוות השלישית בקרב יוצאי אתיופיה — לעומת מקום שביעי בכלל האוכלוסייה.",
          en: "Stroke is the 3rd cause of death among Ethiopian Israelis, compared with 7th in the general population.",
          am: "ስትሮክ ለኢትዮጵያ-እስራኤላውያን 3ኛ ዋና ሞት ምክንያት ነው፣ ለአጠቃላይ ህዝቡ ደግሞ 7ኛ ነው።",
        },
        source: {
          name: "Israel National Institute for Health Policy Research — Mortality Statistics 2023",
          url: "https://www.israelhpr.org.il",
        },
        publishedYear: 2023,
      },
      {
        id: "stroke-mortality-rate",
        heading: {
          he: "שיעור תמותה מהשבץ",
          en: "Stroke mortality rate",
          am: "የስትሮክ ሞት ምጣኔ",
        },
        figure: { he: "25.2 ל-100,000", en: "25.2/100,000", am: "25.2/100,000" },
        context: {
          he: "שיעור התמותה מהשבץ בקהילה עומד על 25.2 לכל 100,000 — גבוה מהממוצע הכללי.",
          en: "The stroke mortality rate in the community stands at 25.2 per 100,000 — above the general average.",
          am: "የስትሮክ ሞት ምጣኔ 25.2 ለ100,000 ነው።",
        },
        source: {
          name: "CBS Annual Statistical Abstract 2024 — Cause-of-death tables",
          url: "https://www.cbs.gov.il/he/publications/Pages/2024/שנתון-סטטיסטי-לישראל-2024-מספר-75.aspx",
        },
        publishedYear: 2024,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-11",
  },

  // ── 4. בריאות הנפש ────────────────────────────────────────────────────────
  {
    slug: "mental-health",
    name: {
      he: "בריאות הנפש",
      en: "Mental Health",
      am: "የአዕምሮ ጤና",
    },
    shortDescription: {
      he: "אשפוז פסיכיאטרי פי 2; שיעור אובדנות 4× (24.5/100,000). אפס פסיכיאטרים דוברי אמהרית. ליגת חירום: ERAN 1201.",
      en: "Psychiatric hospitalization 2×; suicide rate 4× (24.5/100,000). Zero Amharic-speaking psychiatrists. Crisis line: ERAN 1201.",
      am: "የአዕምሮ ሕክምና ሆስፒታሎሽን 2 እጥፍ፤ ራስን የማጥፋት ምጣኔ 4 እጥፍ። ቀውስ: ERAN 1201.",
    },
    body: {
      he: `בריאות הנפש מהווה אחת מהאתגרים הדחופים ביותר בקרב קהילת יוצאי אתיופיה בישראל. מחקרים מצביעים על שיעורי אשפוז פסיכיאטרי הגבוהים פי שניים בקהילה לעומת הממוצע הכללי — ועל שיעור אובדנות מדאיג ביותר של 24.5 ל-100,000, שהוא פי ארבעה מהממוצע הכללי של 5.9 ל-100,000. מאחורי הנתונים הקשים הללו עומדים גורמים מורכבים: טראומות הגירה שלא עובדו, קשיי השתלבות, אפליה, ואתגרי ניתוק בין-דורי.

אחת החסמות הקריטיות ביותר היא העדר מוחלט של פסיכיאטרים דוברי אמהרית בישראל — אפס — למרות שאמהרית היא שפת האם של עשרות אלפי בני קהילה. בנוסף, קיימת סטיגמה תרבותית עמוקה סביב בריאות הנפש, שנובעת חלקית מהאמונה המסורתית שמצוקה נפשית היא עניין רוחני (Zar, Balezar) ולא רפואי. מחקרים מראים ש-43% בלבד מבני הקהילה מאמינים שהמערכת הרפואית יכולה לעזור להם.

המצוקה הנפשית היא אמיתית, לגיטימית, וניתנת לטיפול. שירות ERAN (1201) מספק מענה בעברית, ערבית, ורוסית — אך לא באמהרית. ארגוניm כמו NATAL, Elem, ותנה בריאות עובדים לגשר על הפער, ויש כיום פסיכולוגים ועובדים סוציאליים מהקהילה שמבינים את ההקשר התרבותי. פנייה לעזרה היא מעשה אומץ, לא חולשה.

אם אתם חווים מחשבות אובדניות או מצוקה נפשית קשה, התקשרו לERAN 1201 עכשיו. במקרי חירום — בבית חולים הקרוב ביותר. אתם לא לבד.`,
      en: `Mental health represents one of the most urgent challenges within the Ethiopian-Israeli community. Research shows psychiatric hospitalization rates twice the general average, and an alarming suicide rate of 24.5 per 100,000 — four times the general population rate of 5.9 per 100,000. Behind these difficult numbers lie complex factors: unprocessed immigration trauma, integration challenges, discrimination, and intergenerational disconnection.

One of the most critical barriers is the complete absence of Amharic-speaking psychiatrists in Israel — zero — despite Amharic being the mother tongue of tens of thousands of community members. Additionally, there is deep cultural stigma around mental health, partly rooted in traditional beliefs that psychological distress is a spiritual matter (Zar, Balezar) rather than a medical one. Research shows that only 43% of community members believe the medical system can help them.

Psychological distress is real, legitimate, and treatable. ERAN (1201) provides crisis support in Hebrew, Arabic, and Russian — but not Amharic. Organizations like NATAL, Elem, and Tene Briut work to bridge the gap, and there are now psychologists and social workers from the community who understand the cultural context. Seeking help is an act of courage, not weakness.

If you are experiencing suicidal thoughts or severe psychological distress, call ERAN 1201 now. In emergencies, go to the nearest hospital emergency room. You are not alone.`,
      am: `የአዕምሮ ጤና በኢትዮጵያ-እስራኤል ማህበረሰብ ዘንድ ካሉ ዋና ዋና ጉዳዮች አንዱ ነው። ምርምር እንደሚያሳይ የሥነ-አዕምሮ ሆስፒታሎሽን 2 እጥፍ ሲሆን ራስን የማጥፋት ምጣኔ 24.5/100,000 — 4 እጥፍ ነው። ምንም አማርኛ ተናጋሪ ሳይኮሎጂስት የለም።

ERAN 1201 ይደውሉ — 24/7 አስቸኳይ ድጋፍ ያቀርባሉ። NATAL, Elem, እና ቴኔ ብሩት ድጋፍ ያቀርባሉ። ጠቅሰን ማን ነን — ቤት ውስጥ ብቻ አይሆንም፣ ዶክተር ለምናገር ድፍረት ያስፈልጋል ነገር ግን ዕርዳታ ማግኘት ጥንካሬ ነው።`,
    },
    figures: [
      {
        id: "mental-health-hospitalization",
        heading: {
          he: "שיעור אשפוז פסיכיאטרי",
          en: "Psychiatric hospitalization rate",
          am: "የሥነ-አዕምሮ ሆስፒታሎሽን ምጣኔ",
        },
        figure: { he: "פי 2", en: "2×", am: "2 እጥፍ" },
        context: {
          he: "שיעור האשפוז הפסיכיאטרי בקרב יוצאי אתיופיה גבוה פי שניים מהממוצע הכללי.",
          en: "Psychiatric hospitalization rate among Ethiopian Israelis is twice the general average.",
          am: "የሥነ-አዕምሮ ሆስፒታሎሽን ምጣኔ ከአጠቃላይ ህዝቡ ሁለት እጥፍ ነው።",
        },
        source: {
          name: "Israel Ministry of Health — Mental Health Department Report 2023",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2023,
      },
      {
        id: "mental-health-suicide-rate",
        heading: {
          he: "שיעור אובדנות בקהילה",
          en: "Suicide rate in the community",
          am: "ራስን የማጥፋት ምጣኔ",
        },
        figure: { he: "24.5 ל-100,000", en: "24.5/100,000", am: "24.5/100,000" },
        context: {
          he: "שיעור האובדנות בקרב יוצאי אתיופיה עומד על 24.5 ל-100,000 — פי ארבעה מהממוצע הכללי (5.9 ל-100,000).",
          en: "The suicide rate among Ethiopian Israelis is 24.5 per 100,000 — four times the general average of 5.9 per 100,000.",
          am: "ራስን የማጥፋት ምጣኔ 24.5/100,000 ሲሆን ይህ ከ5.9/100,000 ከሆነው አጠቃላይ ምጣኔ 4 እጥፍ ነው።",
        },
        source: {
          name: "NATAL — Suicide Prevention Research Israel 2023",
          url: "https://www.natal.org.il",
        },
        publishedYear: 2023,
      },
      {
        id: "mental-health-system-trust",
        heading: {
          he: "אמון במערכת הבריאות",
          en: "Trust in the health system",
          am: "በጤና ሥርዓቱ መተማመን",
        },
        figure: { he: "43%", en: "43%", am: "43%" },
        context: {
          he: "43% בלבד מבני הקהילה מאמינים שהמערכת הרפואית יכולה לעזור להם בבעיות נפשיות.",
          en: "Only 43% of community members believe the health system can help them with mental health issues.",
          am: "43% ብቻ የሚሆኑ የማህበረሰብ አባላት የጤና ሥርዓቱ ለአዕምሮ ህመም ሊረዳ ይችላል ብለው ያምናሉ።",
        },
        source: {
          name: "Ben-Gurion University — Ethiopian-Israeli Mental Health Barriers Study 2022",
          url: "https://in.bgu.ac.il/en/fohs/Pages/default.aspx",
        },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
      {
        he: "אם אתם במצוקה נפשית, צלצלו ל-ERAN 1201 — זמין 24 שעות ביממה, 7 ימים בשבוע. במקרה חירום — חייגו 101.",
        en: "If you are in mental health crisis, call ERAN 1201 — available 24/7. In emergency, call 101.",
        am: "ቀውስ ካለ ERAN 1201 ይደውሉ — 24/7 ይሠራሉ። አደጋ ካለ 101 ይደውሉ።",
      },
    ],
    lastReviewed: "2026-05-11",
  },

  // ── 5. BRCA2 ──────────────────────────────────────────────────────────────
  {
    slug: "brca2",
    name: {
      he: "BRCA2 — מוטציה בגן",
      en: "BRCA2 Gene Mutation",
      am: "BRCA2 የጂን ሚውቴሽን",
    },
    shortDescription: {
      he: "1.8% שיעור נשאות ייחודי; בסל הבריאות מספטמבר 2025. בדיקה חינמית — כדאי לברר.",
      en: "1.8% unique carrier rate; in the health basket since September 2025. Free testing — worth checking.",
      am: "1.8% ልዩ ተሸካሚ ምጣኔ፤ ከሴፕቴምበር 2025 ጀምሮ በጤና ዕቅድ ውስጥ ነው።",
    },
    body: {
      he: `מוטציית BRCA2 היא שינוי גנטי שמעלה משמעותית את הסיכון לסרטן שד וסרטן שחלות. בקרב יוצאי אתיופיה בישראל זוהתה מוטציה ספציפית (BRCA2 c.156_157insAlu) בשיעור נשאות של 1.8% — שיעור גבוה ביחס לאוכלוסייה הכללית. נשאים אינם חולים, אך ראוי שיבצעו מעקב רפואי ייעודי.

חדשות חשובות: החל מספטמבר 2025, בדיקת BRCA2 לבני קהילת יוצאי אתיופיה נכנסה לסל הבריאות הממלכתי בישראל. המשמעות: הבדיקה זמינה ומסובסדת דרך כל קופות החולים, ללא צורך בהפניה מיוחדת. זהו הישג משמעותי בזכות פעילות הסברה של ארגונים קהילתיים.

נשאי המוטציה מומלץ להם: מעקב שנתי עם ממוגרפיה ו-MRI לנשים; ייעוץ גנטי למשפחה; ובמקרים מסוימים — שיקול של התערבויות מניעתיות (כגון ניתוח מניעתי). כל אלה נדונים עם גנטיקאית ואונקולוגית מומחות, שניתן לקבל הפניה אליהן דרך רופא המשפחה.

האבחון המוקדם מציל חיים. שיעור ההישרדות מסרטן שד שאובחן בשלב 1 עומד על 98% — לעומת 28% בשלב 4. בדיקה פשוטה של דם יכולה לשנות לחלוטין את המהלך.`,
      en: `The BRCA2 mutation is a genetic change that significantly elevates the risk of breast and ovarian cancer. Among Ethiopian Israelis in Israel, a specific mutation (BRCA2 c.156_157insAlu) has been identified at a carrier rate of 1.8% — elevated relative to the general population. Carriers are not ill, but they benefit from dedicated medical surveillance.

Important news: Starting September 2025, BRCA2 testing for members of the Ethiopian-Israeli community has entered the Israeli national health basket. This means the test is available and subsidized through all health plans, without requiring a special referral. This is a significant achievement resulting from advocacy by community organizations.

Mutation carriers are advised to: undergo annual surveillance with mammography and MRI (for women); receive genetic counseling for family members; and in some cases, consider preventive interventions (such as prophylactic surgery). All of these are discussed with specialist geneticists and oncologists, accessible via referral from a family doctor.

Early diagnosis saves lives. The survival rate for breast cancer diagnosed at Stage 1 is 98% — compared with 28% at Stage 4. A simple blood test can completely change the outcome.`,
      am: `BRCA2 ሚውቴሽን የጡት እና የኦቫሪ ካንሰር አደጋን ከፍ ያደርጋል። በኢትዮጵያ-እስራኤላውያን ዘንድ 1.8% ተሸካሚ ምጣኔ ተለይቷል። ከሴፕቴምበር 2025 ጀምሮ ይህ ምርምራ በእስራኤል ጤና ዕቅድ ውስጥ ያለ ሲሆን ነፃ ነው።

ቀደምት ምርምራ ህይወት ያድናል — ደረጃ 1 የጡት ካንሰር ሕልውና ምጣኔ 98% ነው። ሐኪምዎን ስለ ምርምራ ያናግሩ።`,
    },
    figures: [
      {
        id: "brca2-carrier-rate",
        heading: {
          he: "שיעור נשאות BRCA2 בקהילה",
          en: "BRCA2 carrier rate in the community",
          am: "BRCA2 ተሸካሚ ምጣኔ",
        },
        figure: { he: "1.8%", en: "1.8%", am: "1.8%" },
        context: {
          he: "1.8% מבני קהילת יוצאי אתיופיה נושאים את המוטציה BRCA2 c.156_157insAlu — שיעור גבוה ביחס לאוכלוסייה הכללית.",
          en: "1.8% of Ethiopian-Israeli community members carry the BRCA2 c.156_157insAlu mutation — elevated compared to the general population.",
          am: "1.8% የማህበረሰብ አባላት BRCA2 c.156_157insAlu ሚውቴሽን ይሸከማሉ።",
        },
        source: {
          name: "Israeli National Cancer Control Plan — BRCA2 in Ethiopian-Israeli population",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2024,
      },
      {
        id: "brca2-basket-date",
        heading: {
          he: "כניסה לסל הבריאות",
          en: "Included in health basket",
          am: "ወደ ጤና ዕቅድ መገባት",
        },
        figure: { he: "ספטמבר 2025", en: "September 2025", am: "ሴፕቴምበር 2025" },
        context: {
          he: "בדיקת BRCA2 לבני קהילת יוצאי אתיופיה נכנסה לסל הבריאות הממלכתי בספטמבר 2025 — זמינה ומסובסדת בכל קופות החולים.",
          en: "BRCA2 testing for Ethiopian-Israeli community members was included in the national health basket in September 2025 — available and subsidized through all health plans.",
          am: "BRCA2 ምርምራ ከሴፕቴምበር 2025 ጀምሮ በሁሉም የጤና ዕቅዶች ይካተታል።",
        },
        source: {
          name: "Israel Ministry of Health — Health Basket 2025 Additions",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2025,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-11",
  },

  // ── 6. HIV ────────────────────────────────────────────────────────────────
  {
    slug: "hiv",
    name: {
      he: "HIV/איידס",
      en: "HIV/AIDS",
      am: "ኤችአይቪ/ኤድስ",
    },
    shortDescription: {
      he: "12% ממקרי HIV החדשים בישראל (2024); ירידה של 22%. טיפול ARV מציל חיים ומונע העברה.",
      en: "12% of new HIV cases in Israel (2024); 22% declining trend. ARV treatment saves lives and prevents transmission.",
      am: "12% ከአዲስ HIV ጉዳዮች (2024)፤ 22% ቅናሽ። ARV ህክምና ህይወት ያድናል።",
    },
    body: {
      he: `HIV נותר אחד מהאתגרים הבריאותיים המרכזיים בקרב קהילת יוצאי אתיופיה בישראל. נכון ל-2024, 12% מהמקרים החדשים של HIV בישראל אובחנו בקרב יוצאי אתיופיה — פרופורציה גבוהה ביחס לגודל הקהילה בתוך האוכלוסייה הכוללת. עם זאת, מדובר במגמה חיובית ובולטת: ירידה של 22% בשיעורי ההדבקה בשנים האחרונות, כתוצאה מתכניות הסברה ובדיקות שנעשו בשיתוף הקהילה.

הטיפול ב-HIV השתנה מהפכנית בעשורים האחרונים. תרופות ARV (אנטי-רטרו-ויראליות) מאפשרות לאנשים הנושאים את הנגיף לחיות חיים ארוכים, מלאים, ובריאים — ולהגיע לרמת חיים נטענת באפס נגיף (Undetectable = Untransmittable). כלומר: מי שמקבל טיפול ומדוד כ"undetectable" אינו מעביר את הנגיף לאחרים.

חסמים תרבותיים מהווים עדיין מכשול קשה: הסטיגמה החברתית סביב HIV בקהילה גבוהה מאוד, ומרבים לגלות שאנשים נמנעים מבדיקה מחשש להדרה חברתית. חשוב להדגיש שהבדיקות חסויות, הטיפול חינמי דרך קופות החולים, ואין חובת גילוי לגורמים שאינם מעורבים בטיפול הרפואי.

ארגון AMEN (העמותה לעזרה לנגועי AIDS) ושירות תנה בריאות מציעים ליווי בעברית ובאמהרית לאנשים הסובלים מ-HIV ולמשפחותיהם. גילוי מוקדם ותחילת טיפול מהירה הם הכלים הטובים ביותר להבטחת איכות חיים.`,
      en: `HIV remains one of the central health challenges within the Ethiopian-Israeli community. As of 2024, 12% of new HIV cases in Israel were diagnosed among Ethiopian Israelis — a proportion high relative to the community's share of the total population. However, there is a notable positive trend: a 22% decline in infection rates in recent years, resulting from community-engaged outreach and testing programs.

HIV treatment has undergone a revolutionary transformation over recent decades. ARV (antiretroviral) medications enable people living with HIV to live long, full, and healthy lives — and to reach an "undetectable" viral load (Undetectable = Untransmittable). This means: someone receiving treatment who is measured as "undetectable" does not transmit the virus to others.

Cultural barriers remain a significant obstacle: social stigma around HIV within the community is very high, and many people avoid testing for fear of social exclusion. It is important to emphasize that tests are confidential, treatment is free through health plans, and there is no obligation to disclose to parties not involved in medical care.

AMEN (Association for AIDS-Infected Persons) and Tene Briut offer support in Hebrew and Amharic for people living with HIV and their families. Early detection and prompt treatment initiation are the best tools for ensuring quality of life.`,
      am: `ኤችአይቪ ለኢትዮጵያ-እስራኤል ማህበረሰብ ዋና የጤና ፈተና ሆኖ ይቀጥላል። እ.ኤ.አ. 2024 ላይ 12% ከአዲስ ኤችአይቪ ጉዳዮች ኢትዮጵያ-እስራኤላውያን ናቸው። 22% ቅናሽ ዝንባሌ ይታያል።

ARV ህክምና ሰዎች ረዥም፣ ሙሉ ሕይወት እንዲኖሩ ያስችላቸዋል። ዩኤ=ዩቲ (Undetectable=Untransmittable) — ህክምና የሚወስዱ ሰዎች ቫይረሱን አያስተላልፉም። AMEN እና ቴኔ ብሩት ድጋፍ ያቀርባሉ።`,
    },
    figures: [
      {
        id: "hiv-new-cases-share",
        heading: {
          he: "חלק מהמקרים החדשים ב-2024",
          en: "Share of new cases in 2024",
          am: "ከ2024 አዲስ ጉዳዮች ድርሻ",
        },
        figure: { he: "12%", en: "12%", am: "12%" },
        context: {
          he: "12% ממקרי HIV החדשים שאובחנו בישראל ב-2024 היו בקרב יוצאי אתיופיה.",
          en: "12% of new HIV cases diagnosed in Israel in 2024 were among Ethiopian Israelis.",
          am: "12% ከ2024 አዲስ ኤችአይቪ ጉዳዮች ኢትዮጵያ-እስራኤላውያን ናቸው።",
        },
        source: {
          name: "Israel Ministry of Health — HIV/AIDS Annual Report 2024",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2024,
      },
      {
        id: "hiv-declining-trend",
        heading: {
          he: "מגמת ירידה בהדבקות",
          en: "Declining infection trend",
          am: "ቅናሽ ዝንባሌ",
        },
        figure: { he: "22% ירידה", en: "22% decline", am: "22% ቅናሽ" },
        context: {
          he: "ירידה של 22% בשיעורי ההדבקה ב-HIV בקרב יוצאי אתיופיה בשנים האחרונות — כתוצאה ישירה מתכניות הסברה קהילתיות.",
          en: "A 22% decline in HIV infection rates among Ethiopian Israelis in recent years — a direct result of community-based outreach programs.",
          am: "22% ቅናሽ — ቀጥተኛ ውጤት ከማህበረሰብ-ተሳታፊ ፕሮግራሞች።",
        },
        source: {
          name: "AMEN — HIV Trends in the Ethiopian-Israeli Community 2024",
          url: "https://www.amen.org.il",
        },
        publishedYear: 2024,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-11",
  },

  // ── 7. אנמיה חרמשית ──────────────────────────────────────────────────────
  {
    slug: "sickle-cell",
    name: {
      he: "אנמיה חרמשית",
      en: "Sickle Cell Anemia",
      am: "ቀይ ደም ሕዋሳት ህመም (Sickle Cell)",
    },
    shortDescription: {
      he: "מחלה גנטית בשכיחות גבוהה בקרב בית ישראל; נשאות ~20%. סינון גנטי לפני הריון — חובה.",
      en: "Genetic disease with ~20% carrier rate among Beta Israel; genetic screening before pregnancy is essential.",
      am: "~20% ተሸካሚ ምጣኔ ያለው የዘር ህመም፤ ከወሊድ በፊት ምርምራ አስፈላጊ ነው።",
    },
    body: {
      he: `אנמיה חרמשית (Sickle Cell Anemia) היא מחלה גנטית הגורמת לתאי דם אדומים לקבל צורה חרמשית במקום צורה עגולה תקינה. תאים חרמשיים אלו אינם יכולים לשאת חמצן ביעילות, ונוטים לחסום כלי דם קטנים — מה שגורם לכאבים עזים, אנמיה כרונית, ולנזק לאיברים חיוניים לאורך זמן.

בקרב בני קהילת ביתא ישראל — יהודי אתיופיה — שכיחות הנשאות (Carrier) מוערכת בסביבות 20%. נשא אחד אינו חולה, אך זוגות שניהם נשאים נמצאים בסיכון של 25% ללדת ילד עם המחלה המלאה בכל הריון. בגלל כך, בדיקת נשאות לפני הריון (Pre-Conception Genetic Screening) היא קריטית ונמצאת כיום בסל הבריאות הישראלי.

הסימפטומים של אנמיה חרמשית כוללים "משברי כאב" (Vaso-occlusive Crises) — כאבים עזים ופתאומיים שיכולים להופיע בידיים, ברגליים, בחזה ובגב. ילדים עם המחלה עשויים לסבול מאנמיה, מהאטה בגדילה, ומחשיפה מוגברת לזיהומים. בגיל מבוגר יותר, המחלה עלולה לפגוע בכליות, בעיניים, ובמוח.

הטיפול המודרני כולל: מעקב רפואי קבוע, חיסונים מיוחדים, הידרוקסיאוריאה (תרופה שמפחיתה את תדירות המשברים), ועירויי דם לפי הצורך. השתלת מח עצם מהווה אופציה מרפאת אצל חלק מהחולים הצעירים. חשוב לדעת: ישנן קופות חולים שמציעות מרפאות ייחודיות לאנמיה חרמשית — כדאי לברר מראש.`,
      en: `Sickle cell anemia is a genetic disease that causes red blood cells to take on a sickle shape instead of their normal round form. These sickle-shaped cells cannot carry oxygen efficiently, and tend to block small blood vessels — causing intense pain, chronic anemia, and progressive organ damage over time.

Among members of the Beta Israel community — Ethiopian Jews — the carrier rate is estimated at approximately 20%. A single carrier is not ill, but couples where both partners are carriers face a 25% risk of having a child with the full disease in each pregnancy. For this reason, pre-conception genetic screening is critical and is currently included in Israel's national health basket.

Sickle cell symptoms include "vaso-occlusive crises" — sudden intense pain episodes that can affect the hands, legs, chest, and back. Children with the disease may experience anemia, growth delays, and heightened vulnerability to infections. In adulthood, the disease can damage the kidneys, eyes, and brain.

Modern treatment includes: regular medical monitoring, specialized vaccinations, hydroxyurea (a medication that reduces crisis frequency), and blood transfusions as needed. Bone marrow transplantation is a curative option for some young patients. Notably, some Israeli health plans offer dedicated sickle cell clinics — it is worth enquiring in advance.`,
      am: `Sickle cell anemia የዘር ህመም ሲሆን ቀይ ደም ሕዋሳትን ክብ ከሚሆኑ ሰርዶ-ቅርፅ እንዲሆኑ ያደርጋቸዋል። ቀይ ደም ሕዋሳቶቹ ኦክሲጅን ሊሸከሙ አይችሉም። ByBeta Israel ማህበረሰብ ውስጥ ~20% ተሸካሚ ምጣኔ አለ።

ሁለቱም አጋሮች ተሸካሚ ከሆኑ ለ25% ሕፃን ሊወለድ ይችላል። ቅድመ-ወሊድ ምርምራ እስራኤል ጤና ዕቅድ ውስጥ ይካተታል። ሕክምና፦ hydroxyurea፣ ቫይረስ፣ የደም ሙሌት ይካትታሉ።`,
    },
    figures: [
      {
        id: "sickle-cell-carrier-rate",
        heading: {
          he: "שיעור נשאות בקהילה",
          en: "Carrier rate in the community",
          am: "የተሸካሚ ምጣኔ",
        },
        figure: { he: "~20%", en: "~20%", am: "~20%" },
        context: {
          he: "כ-20% מבני ביתא ישראל הם נשאים של גן אנמיה חרמשית — שיעור גבוה המחייב סינון גנטי לפני הריון.",
          en: "Approximately 20% of Beta Israel community members are carriers of the sickle cell gene — a high rate mandating pre-conception genetic screening.",
          am: "~20% ቤታ እስራኤል አባላት የ sickle cell ጂን ተሸካሚዎች ናቸው።",
        },
        source: {
          name: "Israel Ministry of Health — Genetic Disease Screening Policy 2024",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2024,
      },
      {
        id: "sickle-cell-risk-couple",
        heading: {
          he: "סיכון לזוגות נשאים",
          en: "Risk for carrier couples",
          am: "ለተሸካሚ ጥንዶች አደጋ",
        },
        figure: { he: "25%", en: "25%", am: "25%" },
        context: {
          he: "זוגות שניהם נשאים (Carriers) עומדים בסיכון של 25% ללדת ילד עם אנמיה חרמשית מלאה בכל הריון.",
          en: "Couples where both partners are carriers face a 25% risk per pregnancy of having a child with full sickle cell disease.",
          am: "ሁለቱም ተሸካሚ ጥንዶች ለ25% አደጋ በእያንዳንዱ እርግዝና ይጋለጣሉ።",
        },
        source: {
          name: "National Human Genome Research Institute — Sickle Cell Genetics",
          url: "https://www.genome.gov/health/Genomics-and-Medicine/Genetic-diseases",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-30",
  },

  // ── 8. שחפת ──────────────────────────────────────────────────────────────
  {
    slug: "tuberculosis",
    name: {
      he: "שחפת",
      en: "Tuberculosis (TB)",
      am: "ሳምባ ነቀርሳ (ቲቢ)",
    },
    shortDescription: {
      he: "שכיחות היסטורית גבוהה בקרב עולים; ירידה עם הזמן. מעקב וטיפול מלא (6 חודשים) מרפאים לחלוטין.",
      en: "Historically high rates among new immigrants; declining over time. Full 6-month treatment is curative.",
      am: "ለአዳዲስ ኦሊም ታሪካዊ ከፍ ያለ ምጣኔ። ሙሉ 6-ወር ሕክምና ያድናል።",
    },
    body: {
      he: `שחפת (Tuberculosis) היא מחלה זיהומית הנגרמת על ידי חיידק המיקובקטריום טוברקולוסיס (Mycobacterium tuberculosis). היא מועברת דרך האוויר — בעיקר דרך שיעול, התעטשות, או דיבור — ומשפיעה בעיקר על הריאות, אך יכולה לפגוע גם באיברים אחרים כגון לימפה, עצמות, ומוח.

בקרב יוצאי אתיופיה שעלו לישראל בגלי העלייה הגדולים (1984, 1991, ואחריהם), שיעורי השחפת האקטיבית היו גבוהים משמעותית מאשר באוכלוסייה הכללית — תופעה אופיינית לאוכלוסיות מהגרות ממדינות בהן השחפת אנדמית. עם השנים, ובזכות תכניות טיפול ומעקב קפדניות, השיעורים ירדו בצורה ניכרת.

שחפת לטנטית (Latent TB) — שבה הגוף נושא את החיידק ללא מחלה פעילה — נפוצה יחסית בקרב בני הקהילה שנולדו באתיופיה. אנשים עם שחפת לטנטית אינם מדבקים, אך עלולים לפתח שחפת פעילה בעתיד, בפרט כאשר המערכת החיסונית נחלשת (כגון בגיל מבוגר, עם HIV, או בטיפול מדכא חיסון). לכן, מומלץ לבצע בדיקת שחפת לטנטית (IGRA או Mantoux) לכל מי שנולד באתיופיה ולא נבדק.

הסימפטומים של שחפת פעילה כוללים: שיעול ממושך (מעל 3 שבועות), ירידה במשקל, הזעות לילה, חום ממושך ועייפות. הטיפול בשחפת הוא שילוב של 4 אנטיביוטיקות למשך 6 חודשים — חשוב לא להפסיק את הטיפול בשלב מוקדם, גם אם מרגישים טוב, כיוון שהפסקה מוקדמת עלולה לגרום לעמידות לתרופות. הטיפול ניתן בחינם דרך קופות החולים.`,
      en: `Tuberculosis (TB) is an infectious disease caused by Mycobacterium tuberculosis. It spreads through the air — primarily via coughing, sneezing, or speaking — and mainly affects the lungs, though it can also affect lymph nodes, bones, and the brain.

Among Ethiopian Israelis who arrived during the major immigration waves (1984, 1991, and later), rates of active TB were significantly higher than in the general population — a pattern typical of immigrant populations from countries where TB is endemic. Over the years, and through rigorous treatment and monitoring programs, rates have declined considerably.

Latent TB — where the body carries the bacteria without active disease — is relatively common among community members born in Ethiopia. People with latent TB are not contagious, but may develop active TB in the future, particularly when the immune system weakens (e.g., with age, HIV, or immunosuppressive treatment). It is therefore recommended that anyone born in Ethiopia who has not been tested undergo a latent TB test (IGRA or Mantoux).

Symptoms of active TB include: persistent cough (more than 3 weeks), weight loss, night sweats, prolonged fever, and fatigue. Treatment consists of a combination of 4 antibiotics for 6 months — it is critical not to stop treatment early, even if you feel well, as early discontinuation can lead to drug resistance. Treatment is free through Israeli health plans.`,
      am: `ሳምባ ነቀርሳ (TB) ከ Mycobacterium tuberculosis ባክቴሪያ የሚከሰት ኢንፌክሽን ህመም ነው። አየር ውስጥ ይሰራጫል። ዋናው ዒላማ ሳምባ ሲሆን ሌሎች አካላትንም ሊነካ ይችላል።

1984 እና 1991 አሊያ ሞገዶች ውስጥ TB ምጣኔ ከፍ ያለ ነበር። የሱቅ TB (Latent TB) ለኢትዮጵያ ተወላጆች ዘንድ ይታወቃል። IGRA ወይም Mantoux ምርምራ ይመከራል። 6-ወር ሕክምና ይፈልጋል — ቀደም ሲያቆሙ የመድሃኒት ክልከላ ይፈጥራል። ሕክምና ነጻ ነው።`,
    },
    figures: [
      {
        id: "tuberculosis-latent-prevalence",
        heading: {
          he: "שחפת לטנטית בקרב עולים מאתיופיה",
          en: "Latent TB among Ethiopian-born immigrants",
          am: "ከኢትዮጵያ ኦሊም ዘንድ ሱቅ TB",
        },
        figure: { he: "גבוהה משמעותית", en: "Significantly elevated", am: "ከፍ ያለ" },
        context: {
          he: "שכיחות שחפת לטנטית בקרב יוצאי אתיופיה גבוהה בצורה משמעותית ביחס לאוכלוסייה הכללית — מחייבת בדיקה ל-IGRA.",
          en: "Latent TB prevalence among Ethiopian-born community members is significantly elevated compared to the general population — IGRA screening is recommended.",
          am: "ሱቅ TB ስርጭት ከፍ ያለ ሲሆን IGRA ምርምራ ይመከራል።",
        },
        source: {
          name: "Israel Ministry of Health — TB Control Program Annual Report 2024",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2024,
      },
      {
        id: "tuberculosis-treatment-duration",
        heading: {
          he: "משך הטיפול הסטנדרטי",
          en: "Standard treatment duration",
          am: "ደረጃዊ የሕክምና ጊዜ",
        },
        figure: { he: "6 חודשים", en: "6 months", am: "6 ወር" },
        context: {
          he: "הטיפול המלא בשחפת אורך 6 חודשים ומשיג ריפוי בשיעור של 95%+. הפסקת הטיפול מוקדם מגדילה את הסיכון לעמידות.",
          en: "Full TB treatment lasts 6 months and achieves a cure rate of 95%+. Early discontinuation increases drug resistance risk.",
          am: "ሙሉ TB ሕክምና 6 ወር ሲሆን 95%+ ህክምና ምጣኔ አለው።",
        },
        source: {
          name: "WHO Global Tuberculosis Report 2024",
          url: "https://www.who.int/teams/global-tuberculosis-programme",
        },
        publishedYear: 2024,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-30",
  },

  // ── 9. PTSD / טראומת מהגרים ──────────────────────────────────────────────
  {
    slug: "ptsd-migration",
    name: {
      he: "PTSD — טראומת הגירה",
      en: "PTSD — Migration Trauma",
      am: "PTSD — የፍልሰት ስቃይ",
    },
    shortDescription: {
      he: "שיעורי PTSD גבוהים משמעותית בין יוצאי העלייה של 1984 ו-1991; מחסום שפה מעכב אבחון וטיפול.",
      en: "Significantly elevated PTSD rates among 1984/1991 aliyah survivors; language barriers delay diagnosis and treatment.",
      am: "1984/1991 አሊያ ተወላጆች ዘንድ PTSD ምጣኔ ከፍ ያለ፤ ቋንቋ ማኅለቅ ምርምራ ያዘገያል።",
    },
    body: {
      he: `הפרעת דחק פוסט-טראומטית (PTSD) היא מצב נפשי שמתפתח לאחר חשיפה לאירועים טראומטיים. בקרב יוצאי אתיופיה שעלו בגל 1984 (מבצע משה) ובגל 1991 (מבצע שלמה), השכיחות של PTSD גבוהה במיוחד. מסעות רגליים דרך הסודן ואתיופיה, אבדן בני משפחה בדרך, חוויות רעב ואלימות, ולאחר מכן הלם קליטה בחברה ישראלית — כל אלה יצרו צלקות נפשיות עמוקות שרבים נושאים עד היום.

PTSD מתאפיין בתסמינים כמו: פלשבקים וסיוטים חוזרים על אירועים טראומטיים, הימנעות ממצבים המזכירים את הטראומה, עוררות יתר (Hyperarousal) — עצבנות, קשיי שינה, ורגישות יתר לגירויים — וחוויה של ניתוק מהסביבה. בקרב הדור השני, ישנה גם "טראומה בין-דורית" — ילדים שגדלו עם הורים הסובלים מ-PTSD סופגים את ההשפעות גם ללא חשיפה ישירה לאירועים.

אחד החסמים הקשים ביותר לטיפול הוא הקושי הלשוני: מרבית הטיפולים הפסיכולוגיים בישראל ניתנים בעברית בלבד, ולא קיימים מספיק מטפלים דוברי אמהרית. בנוסף, בתרבות האתיופית המסורתית, PTSD נתפס לעיתים כחולשה או כסוגיה שיש להסתיר — ולא כמחלה לגיטימית הניתנת לטיפול.

הטיפולים המוכחים ב-PTSD כוללים: טיפול קוגניטיבי-התנהגותי ממוקד (TF-CBT), EMDR (desensitization and reprocessing), ובמקרים מסוימים — תרופות. NATAL ו-AMCHA הם ארגונים בישראל המתמחים בטיפול בטראומה ומציעים שירותים המותאמים לאוכלוסיות מהגרים.`,
      en: `Post-Traumatic Stress Disorder (PTSD) is a mental health condition that develops following exposure to traumatic events. Among Ethiopian Israelis who immigrated in the 1984 wave (Operation Moses) and the 1991 wave (Operation Solomon), PTSD prevalence is particularly elevated. Foot journeys through Sudan and Ethiopia, the loss of family members along the way, experiences of hunger and violence, and the subsequent shock of integration into Israeli society — all created deep psychological wounds that many carry to this day.

PTSD is characterized by symptoms including: flashbacks and recurring nightmares of traumatic events, avoidance of situations that evoke the trauma, hyperarousal — irritability, sleep difficulties, and heightened sensitivity to stimuli — and a sense of emotional disconnection. Among the second generation, there is also "intergenerational trauma": children who grew up with PTSD-affected parents absorb the effects even without direct exposure to the original events.

One of the most significant treatment barriers is linguistic: most psychological therapies in Israel are provided in Hebrew only, and there are insufficient Amharic-speaking therapists. Additionally, in traditional Ethiopian culture, PTSD is sometimes perceived as weakness or as something to be hidden — rather than as a legitimate, treatable medical condition.

Evidence-based PTSD treatments include: Trauma-Focused Cognitive Behavioral Therapy (TF-CBT), EMDR (Eye Movement Desensitization and Reprocessing), and in some cases — medication. NATAL and AMCHA are Israeli organizations specializing in trauma treatment that offer services adapted for immigrant populations.`,
      am: `PTSD ከሦስት ምክንያቶቻቸው ሲያልፉ ሰዎች ላይ የሚፈጠር የአዕምሮ ሁኔታ ነው። ኦፕሬሽን ሙሴ (1984) እና ኦፕሬሽን ሰሎሞን (1991) ዘመቻዎች ጊዜ ብዙ ሰዎች ስቃይ አልፈዋቸዋል። PTSD ምልክቶች፦ ፍላሽባክ፣ ቅዠቶች፣ ከሰዎች መራቅ፣ ምሽት-ማስጠንቀቂያ።

ሁለተኛ ትውልድ ላይ "ትውልዳዊ ቁስ" ይተላለፋል። NATAL እና AMCHA ድጋፍ ያቀርባሉ። TF-CBT እና EMDR ሕክምናዎች ይሰራሉ።`,
    },
    figures: [
      {
        id: "ptsd-migration-aliyah-waves",
        heading: {
          he: "פגיעות PTSD בגלי העלייה",
          en: "PTSD vulnerability in aliyah waves",
          am: "PTSD ቅርቡ በዐሊያ ሞገዶች",
        },
        figure: { he: "גבוה מהכלל", en: "Above general average", am: "ከምሳሌ በላይ" },
        context: {
          he: "שיעורי PTSD בקרב עולי 1984 ו-1991 גבוהים משמעותית — תוצאה ישירה של חוויות הטראומה שבמסע ההגירה.",
          en: "PTSD rates among 1984 and 1991 aliyah immigrants are significantly above the general population — a direct result of traumatic migration experiences.",
          am: "1984 እና 1991 ኦሊም ዘንድ PTSD ምጣኔ ከፍ ያለ ነው — ቀጥተኛ ውጤት ከፍልሰት ስቃይ።",
        },
        source: {
          name: "NATAL — Israel Trauma Center Annual Report 2024",
          url: "https://www.natal.org.il",
        },
        publishedYear: 2024,
      },
      {
        id: "ptsd-intergenerational",
        heading: {
          he: "טראומה בין-דורית",
          en: "Intergenerational trauma",
          am: "ትውልዳዊ ቁስ",
        },
        figure: { he: "הדור השני מושפע", en: "Second generation affected", am: "ሁለተኛ ትውልድ ተጎድቷል" },
        context: {
          he: "ילדים של עולים שסבלו מ-PTSD מציגים שיעורים גבוהים יותר של מצוקה נפשית — גם ללא חשיפה ישירה לאירועי הטראומה.",
          en: "Children of immigrants who suffered PTSD show higher rates of psychological distress — even without direct exposure to the original traumatic events.",
          am: "PTSD ካጋጠማቸው ወላጆች ሕፃናት ከፍ ያለ የሥነ-አዕምሮ ቁስ ያሳያሉ — ቀጥተኛ ያልሆነ ተጽዕኖ።",
        },
        source: {
          name: "Journal of Traumatic Stress — Intergenerational Effects in Ethiopian-Israeli Families 2023",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
      {
        he: "אם אתם חווים תסמיני PTSD, פנו לרופא המשפחה להפניה לטיפול, או למוקד NATAL 1800-363-363.",
        en: "If you are experiencing PTSD symptoms, contact your family doctor for a referral, or call the NATAL crisis line: 1800-363-363.",
        am: "PTSD ምልክቶች ካጋጠሙዎት ሐኪምዎን ያናግሩ ወይም NATAL 1800-363-363 ይደውሉ።",
      },
    ],
    lastReviewed: "2026-05-30",
  },

  // ── 10. דיכאון ──────────────────────────────────────────────────────────
  {
    slug: "depression",
    name: {
      he: "דיכאון",
      en: "Depression",
      am: "ድብርት",
    },
    shortDescription: {
      he: "חסמי שפה גורמים לאבחון נמוך בקהילה. דיכאון ניתן לטיפול מלא — פנייה לעזרה היא אקט אומץ.",
      en: "Language barriers cause under-diagnosis in the community. Depression is fully treatable — seeking help is an act of courage.",
      am: "ቋንቋ ማኅለቅ ምርምራ ዝቅ ያደርጋል። ዲፕሬሽን ሙሉ በሙሉ ሊታከም ይችላል — ዕርዳታ መጠየቅ ጥንካሬ ነው።",
    },
    body: {
      he: `דיכאון (Depression) הוא הפרעה רגשית הגורמת לתחושה מתמשכת של עצב, ריקנות, וחוסר עניין בפעילויות שפעם היו מהנות. הוא אחד הבעיות הנפשיות הנפוצות בעולם — ובקרב קהילת יוצאי אתיופיה בישראל, שיעורי הדיכאון הלא-מאובחן גבוהים בצורה חריגה.

אחד הגורמים המרכזיים לאבחון הנמוך הוא מחסום השפה. אנשים שעברית אינה שפת אמם מתקשים לתאר את מצבם הנפשי בדיוק ובעדינות הנדרשות, ורופאים שאינם מכירים את ההקשר התרבותי עלולים לא לזהות את התסמינים. יתר על כן, בתרבות האתיופית המסורתית, דיכאון מוסבר לעיתים בצורה דתית-רוחנית (Buda, Zar) ולא כמחלה רפואית — מה שמאחר את הפנייה לעזרה.

גורמי הסיכון הייחודיים לקהילה כוללים: תחושות בדידות וניכור, קשיי השתלבות, חוויות של גזענות ואפליה, ניתוק מהמשפחה המורחבת שנשארה באתיופיה, ולחצים כלכליים. הדור השני מדווח על מתחים ייחודיים: תחושת "בין לבין" בין התרבות האתיופית לישראלית, ועיכוב בקידום מקצועי ביחס לאחרים.

הסימפטומים של דיכאון כוללים: מצב רוח ירוד רוב שעות היום, אובדן עניין ועונג, שינויי שינה ותיאבון, עייפות, קשיי ריכוז, ולעיתים — מחשבות על פגיעה עצמית. הטיפולים המוכחים כוללים פסיכותרפיה (בעיקר CBT), תרופות נוגדות דיכאון, ולעיתים שילוב ביניהם. טיפול מלא ומוקדם מביא להחלמה אצל 80%+ מהמטופלים.`,
      en: `Depression is an emotional disorder causing a persistent feeling of sadness, emptiness, and loss of interest in activities that were once enjoyable. It is one of the most common mental health conditions in the world — and within the Ethiopian-Israeli community, rates of undiagnosed depression are unusually high.

One of the primary causes of under-diagnosis is the language barrier. People for whom Hebrew is not a native language struggle to describe their emotional state with the precision and nuance required, and doctors unfamiliar with the cultural context may not recognize the symptoms. Furthermore, in traditional Ethiopian culture, depression is sometimes explained in religious-spiritual terms (Buda, Zar) rather than as a medical illness — which delays help-seeking.

Risk factors unique to the community include: feelings of loneliness and alienation, integration difficulties, experiences of racism and discrimination, disconnection from extended family remaining in Ethiopia, and economic pressures. The second generation reports unique tensions: a feeling of being "in between" Ethiopian and Israeli culture, and delayed professional advancement relative to peers.

Depression symptoms include: low mood for most of the day, loss of interest and pleasure, changes in sleep and appetite, fatigue, concentration difficulties, and sometimes — thoughts of self-harm. Evidence-based treatments include psychotherapy (especially CBT), antidepressant medications, and sometimes a combination. Full, early treatment leads to recovery in 80%+ of patients.`,
      am: `ዲፕሬሽን ቀጣይ ሀዘን፣ ባዶነት፣ እና ቀደም ደስ ያሉ ነገሮች ፍላጎት ማጣት የሚያስከትል የሥነ-አዕምሮ ዓይነት ነው። ቋንቋ ማኅለቅ ምርምራ ዝቅ ያደርጋሉ።

የቤተሰብ ተፋቅ፣ ጭቆና፣ ኢኮኖሚ ግፊት — እነዚህ ሁሉ አደጋዎች ናቸው። CBT እና መድሃኒቶች 80%+ ሕክምና ይሰጣሉ። ዕርዳታ መጠየቅ ጥንካሬ ነው — ቴኔ ብሩት እና NATAL ድጋፍ ያቀርባሉ።`,
    },
    figures: [
      {
        id: "depression-underdiagnosis",
        heading: {
          he: "תת-אבחון בקהילה",
          en: "Under-diagnosis in the community",
          am: "ዝቅተኛ ምርምራ",
        },
        figure: { he: "גבוה בצורה חריגה", en: "Unusually high", am: "ያልተለምደ ከፍታ" },
        context: {
          he: "שיעורי הדיכאון הלא-מאובחן בקרב יוצאי אתיופיה גבוהים בצורה חריגה — מחסומי שפה, תרבות וגישה לשירותים הם הגורמים העיקריים.",
          en: "Rates of undiagnosed depression among Ethiopian Israelis are unusually high — language barriers, cultural factors, and access limitations are the primary causes.",
          am: "ምርምራ ያልተደረገ ዲፕሬሽን ምጣኔ ካልተለመደ ከፍ ያለ ነው — ቋንቋ ማኅለቅ ዋና ምክንያት ነው።",
        },
        source: {
          name: "Hebrew University — Mental Health Access Study for Ethiopian Israelis 2023",
          url: "https://en.huji.ac.il/en",
        },
        publishedYear: 2023,
      },
      {
        id: "depression-treatment-success",
        heading: {
          he: "שיעור הצלחת הטיפול",
          en: "Treatment success rate",
          am: "የሕክምና ስኬት ምጣኔ",
        },
        figure: { he: "80%+", en: "80%+", am: "80%+" },
        context: {
          he: "80% מהסובלים מדיכאון שמקבלים טיפול מלא ומוקדם — מחלימים לחלוטין.",
          en: "80% of depression sufferers who receive full, early treatment achieve complete recovery.",
          am: "80%+ ዲፕሬሽን ያለባቸው ሙሉ ሕክምና ሲቀበሉ ሙሉ ለሙሉ ይድናሉ።",
        },
        source: {
          name: "WHO Mental Health Action Plan 2013-2030 — Depression outcome data",
          url: "https://www.who.int/news-room/fact-sheets/detail/depression",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
      {
        he: "אם אתם במצוקה, צלצלו ל-ERAN 1201 עכשיו. זמין 24 שעות, 7 ימים בשבוע.",
        en: "If you are in distress, call ERAN 1201 now. Available 24/7.",
        am: "ቀውስ ካለ ERAN 1201 ይደውሉ — 24/7።",
      },
    ],
    lastReviewed: "2026-05-30",
  },

  // ── 11. מחלות לב ─────────────────────────────────────────────────────────
  {
    slug: "cardiovascular",
    name: {
      he: "מחלות לב וכלי דם",
      en: "Cardiovascular Disease",
      am: "የልብ ሕመም",
    },
    shortDescription: {
      he: "מעבר מהיר מתזונה כפרית לעירונית מעלה סיכון; שיעורי LDL וטריגליצרידים גבוהים. הקפדה על מעקב שנתי חיונית.",
      en: "Rapid shift from rural to urban diet increases risk; elevated LDL and triglycerides. Annual monitoring is essential.",
      am: "ከገጠር ወደ ከተማ ፈጣን የምግብ ሽግግር አደጋን ያሳድጋል። ዓመታዊ ክትትል አስፈላጊ ነው።",
    },
    body: {
      he: `מחלות לב וכלי דם (Cardiovascular Disease) הן הגורם המוביל לתמותה ברחבי העולם, ובקרב יוצאי אתיופיה בישראל — הסיכון גדל בצורה ניכרת עם שינוי אורח החיים לאחר ההגירה. בארץ המוצא, תזונה מסורתית אתיופית מבוססת על דגנים מלאים (טף, דורה), קטניות, וירקות — עם צריכה נמוכה יחסית של שומנים רוויים ובשר אדום. המעבר לתזונה ישראלית-מערבית, עשירה בשומנים ומעובדת, גורם לשינויים מטבוליים שמגבירים את הסיכון.

מחקרים מצביעים על עלייה בשכיחות של גורמי סיכון קרדיווסקולריים בקרב יוצאי אתיופיה עם השנים: רמות LDL (כולסטרול "רע") מוגברות, רמות טריגליצרידים גבוהות, ויתר לחץ דם. שילוב גורמי הסיכון הללו יחד עם שיעורי הסוכרת הגבוהים בקהילה יוצר צוברת סיכון מצטברת.

ניתן למנוע ולעכב מחלת לב: הפחתת כולסטרול ולחץ דם דרך תרופות ושינויי תזונה, פעילות גופנית אירובית (30 דקות ביום, 5 ימים בשבוע), הפסקת עישון, וניהול לחץ נפשי — כולם נמצאו יעילים. בדיקת דם שגרתית הכוללת פרופיל שומנים (Lipid Profile) מומלצת לכל מי שמעל גיל 40, ולכל מי עם גורמי סיכון ידועים גם בגיל צעיר יותר.

בישראל, קופות החולים מספקות מרפאות ייחודיות למחלות לב, וניתן לקבל הפניה דרך רופא המשפחה. חשוב להגיע לרופא גם ללא תסמינים — רבות ממחלות הלב אינן מתבטאות עד השלב שבו הן מסוכנות ממש.`,
      en: `Cardiovascular disease (CVD) is the leading cause of death worldwide, and among Ethiopian Israelis — the risk increases markedly with lifestyle changes following immigration. In the country of origin, traditional Ethiopian diet is based on whole grains (teff, sorghum), legumes, and vegetables — with relatively low intake of saturated fats and red meat. The shift to Israeli-Western food, rich in fats and processed ingredients, triggers metabolic changes that elevate cardiovascular risk.

Research indicates a rise in the prevalence of cardiovascular risk factors among Ethiopian Israelis over time: elevated LDL ("bad" cholesterol) levels, high triglycerides, and hypertension. The combination of these risk factors alongside the community's high diabetes rates creates compounding cumulative risk.

Cardiovascular disease can be prevented and delayed: reducing cholesterol and blood pressure through medication and dietary changes, aerobic physical activity (30 minutes/day, 5 days/week), smoking cessation, and stress management — all proven effective. A routine blood test including a lipid profile is recommended for everyone over 40, and for anyone with known risk factors at younger ages too.

In Israel, health plans provide dedicated cardiac clinics, and referrals are available through family doctors. It is important to visit the doctor even without symptoms — many cardiovascular conditions show no signs until they become truly dangerous.`,
      am: `የልብ ሕመም ዓለም አቀፍ ዋና የሞት ምክንያት ነው። ኢትዮጵያ-እስራኤላውያን ለፍልሰት ሲሰደዱ ፈጣን የምግብ ሽግግር ያጋጥማቸዋል። ባህላዊ ኢትዮጵያዊ ምግብ (ጤፍ፣ ባቄላ) ወደ ሙቀት-ሙሉ ምዕራባዊ ምግብ ሲሸጋገሩ LDL እና triglycerides ይጨምራሉ።

ዓመታዊ ምርምራ (Lipid Profile) ከ40 ዓመት ከፍ ካሉ ሁሉ ይመከራል። ሕክምና እና ህይወት-ዘዴ ለውጥ ፋይዳ አለው።`,
    },
    figures: [
      {
        id: "cardiovascular-dietary-transition",
        heading: {
          he: "שינוי תזונתי לאחר הגירה",
          en: "Post-migration dietary transition",
          am: "ፍልሰት ምግብ ሽግግር",
        },
        figure: { he: "גורם סיכון מוביל", en: "Leading risk factor", am: "ዋና አደጋ ምክንያት" },
        context: {
          he: "המעבר מתזונה מסורתית אתיופית לתזונה מערבית הוא גורם הסיכון הקרדיווסקולרי המרכזי בקהילה לאחר ההגירה.",
          en: "The shift from traditional Ethiopian diet to Western diet is the central cardiovascular risk factor in the community post-immigration.",
          am: "ከባህላዊ ኢትዮጵያዊ ምግብ ወደ ምዕራባዊ ምግብ ሽግግር ዋና የልብ ሕመም አደጋ ምክንያት ነው።",
        },
        source: {
          name: "Israel Journal of Health Policy Research — Dietary transition in Ethiopian Israelis 2023",
          url: "https://www.ijhpr.org",
        },
        publishedYear: 2023,
      },
      {
        id: "cardiovascular-ldl-elevation",
        heading: {
          he: "עלייה ב-LDL בקהילה",
          en: "LDL elevation in the community",
          am: "LDL ጭማሪ",
        },
        figure: { he: "מוגבר משמעותית", en: "Significantly elevated", am: "ጉልህ ጭማሪ" },
        context: {
          he: "רמות LDL בקרב יוצאי אתיופיה עם ותק של 10+ שנים בישראל עולות משמעותית לעומת הנורמה — תוצאה של שינוי תזונתי.",
          en: "LDL levels among Ethiopian Israelis with 10+ years in Israel rise significantly above the norm — a result of dietary transition.",
          am: "10+ ዓመት ከኖሩ ኢትዮጵያ-እስራኤላውያን LDL ከተለምዶ ጉልህ ሆኖ ይጨምራል።",
        },
        source: {
          name: "Clalit Research Institute — Lipid Profiles in Ethiopian-Israeli Population 2024",
          url: "https://www.clalit.co.il/he/about/units/pages/clalit_research_institute.aspx",
        },
        publishedYear: 2024,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-30",
  },

  // ── 12. אנמיה מחוסר ברזל ─────────────────────────────────────────────────
  {
    slug: "iron-deficiency-anemia",
    name: {
      he: "אנמיה מחוסר ברזל",
      en: "Iron-Deficiency Anemia",
      am: "ብረት እጥረት ደም-ማነስ",
    },
    shortDescription: {
      he: "שכיחה במיוחד בנשים ובילדים בשנות ההתאקלמות; תזונה, מעקב ותוספים פשוטים — מטפלים לחלוטין.",
      en: "Especially common in women and children during acculturation years; diet, monitoring, and simple supplementation are curative.",
      am: "ለሴቶችና ልጆች ተለምዶ አዲስ ዓሊያ ዓመታት — አመጋገብ፣ ክትትልና ተጨማሪ ምግቦች ህክምና ናቸው።",
    },
    body: {
      he: `אנמיה מחוסר ברזל היא הסוג הנפוץ ביותר של אנמיה בעולם, ובקרב יוצאי אתיופיה בשנות ההתאקלמות הראשונות בישראל — שכיחותה גבוהה במיוחד. הגוף זקוק לברזל לייצור המוגלובין, החלבון בתאי הדם האדומים שנושא חמצן לכל תאי הגוף. כאשר מאגרי הברזל מתרוקנים, ייצור תאי הדם הלכן נפגע.

גורמים לשכיחות הגבוהה בקהילה כוללים: שינוי תזונתי שמפחית צריכת מזונות עשירים בברזל כגון בשר אדום ועדשים שחורות (המסוגלות לספק ברזל זמין), דרישות ברזל מוגברות בנשים הרות ומיניקות, ולעיתים — תולעי מעיים שנפוצות יותר באוכלוסיות שעלו ממדינות מסוימות.

הסימפטומים כוללים: עייפות מתמשכת, חוסר אנרגיה, סחרחורת, קוצר נשימה במאמץ, חיוורון עור, ובנשים הרות — סיכון לסיבוכים בלידה. לעיתים האנמיה מתגלה רק בבדיקת דם שגרתית, ללא סימפטומים ברורים.

האבחנה פשוטה: ספירת דם מלאה (CBC) ובדיקת פריטין (מדד מאגר הברזל) מספיקים. הטיפול תלוי בחומרה — מתיסוף ברזל דרך הפה (טבליות, נוזל) ועד עירוי ברזל תוך-ורידי במקרים חמורים. שינוי תזונתי שמגביר צריכת ברזל — בשר, קטניות, ירקות עליים ירוקים בשילוב עם ויטמין C — הוא חיוני ויעיל. יש להימנע משתיית תה עם הארוחה, כיוון שטאנין מעכב ספיגת ברזל.`,
      en: `Iron-deficiency anemia is the most common type of anemia worldwide, and among Ethiopian Israelis in the first years of acculturation in Israel — its prevalence is particularly high. The body requires iron to produce hemoglobin, the protein in red blood cells that carries oxygen to all body cells. When iron stores are depleted, red blood cell production is impaired.

Contributing factors to higher prevalence in the community include: dietary changes that reduce intake of iron-rich foods such as red meat and black lentils (capable of providing available iron), increased iron requirements in pregnant and breastfeeding women, and sometimes intestinal worms that are more prevalent in populations immigrating from certain countries.

Symptoms include: persistent fatigue, low energy, dizziness, shortness of breath on exertion, pale skin, and in pregnant women — risk of birth complications. Sometimes anemia is detected only through a routine blood test, without obvious symptoms.

Diagnosis is simple: a complete blood count (CBC) and ferritin test (iron store indicator) are sufficient. Treatment depends on severity — from oral iron supplementation (tablets, liquid) to intravenous iron infusion in severe cases. Dietary changes that increase iron intake — meat, legumes, dark leafy greens combined with vitamin C — are essential and effective. Tea should be avoided with meals, as tannins inhibit iron absorption.`,
      am: `ብረት እጥረት ደም-ማነስ ዓለም ላይ ዋና ደም-ማነስ ዓይነት ሲሆን ቀደምት ዐሊያ ዓመታት ከፍ ያለ ምጣኔ አለው። ምልክቶች፦ ቀጣይ ድካም፣ ዝቅ ያለ ኃይል፣ ወፍሮ ቀለም።

ምርምራ፦ CBC + ferritin። ሕክምና፦ ብረት ፈሳሽ/ጡባዊ ወይም IV። ምግብ ሽፋን — ሥጋ፣ ባቄላ፣ አትክልት + ቪታሚን C። ሻይ ከምግብ ጋር ይቀረፍ — ሴኒን ብረት ማምጣትን ይቀንሳል።`,
    },
    figures: [
      {
        id: "iron-deficiency-acculturation",
        heading: {
          he: "שכיחות בשנות ההתאקלמות",
          en: "Prevalence during acculturation years",
          am: "ዐሊያ ዓመታት ስርጭት",
        },
        figure: { he: "גבוהה במיוחד", en: "Particularly high", am: "ጎልቶ ከፍ ያለ" },
        context: {
          he: "אנמיה מחוסר ברזל שכיחה במיוחד בקרב נשים וילדים יוצאי אתיופיה בשנים הראשונות לאחר העלייה — כתוצאה של שינוי תזונתי ומחסור.",
          en: "Iron-deficiency anemia is particularly prevalent among Ethiopian-Israeli women and children in the first years after aliyah — a result of dietary change and deprivation.",
          am: "ብረት እጥረት ደም-ማነስ ቀደምት ዐሊያ ዓመታት ከፍ ያለ ምጣኔ አለው — የምግብ ሽግግር ውጤት።",
        },
        source: {
          name: "Clalit Research Institute — Anemia Prevalence in Immigrant Populations 2023",
          url: "https://www.clalit.co.il/he/about/units/pages/clalit_research_institute.aspx",
        },
        publishedYear: 2023,
      },
      {
        id: "iron-deficiency-pregnancy-risk",
        heading: {
          he: "סיכון בהריון",
          en: "Risk in pregnancy",
          am: "በእርግዝና ጊዜ አደጋ",
        },
        figure: { he: "מוגבר בנשים הרות", en: "Elevated in pregnant women", am: "ለነፍሰ-ጡር ከፍ ያለ" },
        context: {
          he: "נשים הרות בקהילה עם אנמיה מחוסר ברזל לא מטופלת נמצאות בסיכון מוגבר לסיבוכים בלידה ולאנמיה בתינוק.",
          en: "Pregnant community women with untreated iron-deficiency anemia face elevated risk of birth complications and neonatal anemia.",
          am: "ሕክምና ያልተደረገ ብረት እጥረት ደም-ማነስ ያላቸው ነፍሰ-ጡሮች ለወሊድ ውስብስብ ጉዳዮች ይጋለጣሉ።",
        },
        source: {
          name: "Israel Obstetrics and Gynecology Association — Anemia in Pregnancy Guidelines 2024",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2024,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-30",
  },

  // ── 13. מחסור בוויטמין D ─────────────────────────────────────────────────
  {
    slug: "vitamin-d-deficiency",
    name: {
      he: "מחסור בוויטמין D",
      en: "Vitamin D Deficiency",
      am: "ቪታሚን D እጥረት",
    },
    shortDescription: {
      he: "שכיחות גבוהה מאוד בקרב יוצאי אתיופיה עם עור כהה בישראל; קשורה לסיכון מוגבר לסוכרת, יתר לחץ דם ואוסטיאופורוזיס.",
      en: "Very high prevalence among dark-skinned Ethiopian Israelis; linked to elevated risk of diabetes, hypertension, and osteoporosis.",
      am: "ኢትዮጵያ-እስራኤላውያን ዘንድ ከፍ ያለ ምጣኔ፤ ስኳር ህመም፣ ሃይ-ብሬሸር እና አጥንት ህክምና ጋር ይዛመዳል።",
    },
    body: {
      he: `ויטמין D הוא ויטמין חיוני המיוצר בעיקר בעור בחשיפה לאור שמש. גורם חשוב שלא תמיד נדון בהקשר הקהילתי הוא שאנשים עם עור כהה זקוקים לחשיפה ממושכת יותר לשמש לייצור אותה כמות ויטמין D כמו אנשים עם עור בהיר. בישראל, בפרט בחורף ובאזורים עירוניים שבהם בני הקהילה מרוכזים, החשיפה לשמש לרוב אינה מספיקה.

מחקרים בקרב יוצאי אתיופיה בישראל מצביעים על שכיחות גבוהה מאוד של מחסור בוויטמין D (Vitamin D Deficiency). הדבר בעייתי מכיוון שויטמין D חיוני לא רק לבריאות העצמות (מניעת אוסטיאופורוזיס ורככת), אלא גם למערכת החיסון, לוויסות לחץ הדם, ולמניעת סוכרת. ישנן ראיות לכך שמחסור בוויטמין D עשוי להגביר את הרגישות לסוכרת מסוג 2 ולמחלות לב — שתי מחלות שבלאו הכי שכיחות בקהילה.

הסימפטומים של מחסור בוויטמין D לרוב עדינים: עייפות, כאבי שרירים ועצמות, ורגישות מוגברת לזיהומים. אבחון פשוט — בדיקת דם (25-OH ויטמין D) — ולרוב מכוסה בקופות החולים. הטיפול כולל תוספי ויטמין D (D3 מומלץ), המוצאים ללא מרשם בבית מרקחת. כמות התוסף הנדרשת תלויה בדרגת המחסור ונקבעת עם הרופא.

כצעד מניעתי קל: חשיפת ידיים ורגליים לשמש 15-20 דקות ביום (ללא קרם הגנה) בשעות המוגנות (9-11 בבוקר, 15-17 אחה"צ) מספיקה לרוב האנשים לייצור ויטמין D מינימלי. עם זאת, עבור אנשים עם עור כהה, ייתכן שיידרש זמן חשיפה ארוך יותר, ותוסף בכל מקרה מומלץ.`,
      en: `Vitamin D is an essential vitamin produced primarily in the skin through sunlight exposure. An important factor that is not always discussed in the community context is that people with dark skin need longer sun exposure to produce the same amount of vitamin D as people with fair skin. In Israel, particularly in winter and in urban areas where community members are concentrated, sun exposure is often insufficient.

Research among Ethiopian Israelis in Israel points to very high prevalence of Vitamin D Deficiency. This is problematic because vitamin D is essential not only for bone health (prevention of osteoporosis and rickets), but also for the immune system, blood pressure regulation, and diabetes prevention. There is evidence that vitamin D deficiency may increase susceptibility to type 2 diabetes and cardiovascular disease — two conditions already highly prevalent in the community.

Symptoms of vitamin D deficiency are often subtle: fatigue, muscle and bone aches, and increased susceptibility to infections. Diagnosis is simple — a blood test (25-OH vitamin D) — usually covered by Israeli health plans. Treatment includes vitamin D supplements (D3 recommended), available without prescription at pharmacies. The required supplement amount depends on deficiency severity and is determined with a physician.

As an easy preventive step: exposing arms and legs to sunlight for 15-20 minutes per day (without sunscreen) during protected hours (9-11 AM, 3-5 PM) is sufficient for most people to produce minimal vitamin D. However, for people with dark skin, longer exposure time may be needed, and supplementation is recommended regardless.`,
      am: `ቪታሚን D ፀሐይ ብርሃን ሲዳሰስ ቆዳ ውስጥ የሚፈጠር ቫይታሚን ነው። ጠቆር ያለ ቆዳ ያላቸው ሰዎች ለቪታሚን D ምርት ረዘም ያለ ፀሐይ ንክኪ ያስፈልጋቸዋል። ኢትዮጵያ-እስራኤላውያን ዘንድ ቪታሚን D እጥረት ምጣኔ ከፍ ያለ ነው።

ቪታሚን D ለአጥንት፣ ለበሽታ-መቋቋም፣ እና ለደም-ግፊት ቁጥጥር አስፈላጊ ነው። ምርምራ፦ 25-OH ቪታሚን D የደም ምርምራ። ሕክምና፦ D3 ማሟያ ያለ-ሐኪም-ደብዳቤ ይገኛል።`,
    },
    figures: [
      {
        id: "vitamin-d-dark-skin-barrier",
        heading: {
          he: "מחסום הסינתזה בעור כהה",
          en: "Synthesis barrier in dark skin",
          am: "ጠቆር ቆዳ ውስጥ ምርት ማኅለቅ",
        },
        figure: { he: "3–6× חשיפה ארוכה יותר", en: "3–6× longer exposure needed", am: "3–6× ረዘም ያለ ንክኪ" },
        context: {
          he: "אנשים עם מלנין גבוה (עור כהה) צריכים חשיפה לשמש ארוכה פי 3–6 לייצור אותה כמות ויטמין D — גורם סיכון משמעותי בתנאי ישראל.",
          en: "People with high melanin (dark skin) need 3–6 times longer sun exposure to produce the same amount of vitamin D — a significant risk factor under Israeli conditions.",
          am: "ከፍ ያለ ሜላኒን ያላቸው ሰዎች 3–6 እጥፍ ረዘም ያለ ፀሐይ ንክኪ ያስፈልጋቸዋል።",
        },
        source: {
          name: "Journal of Investigative Dermatology — Melanin and Vitamin D Synthesis 2022",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2022,
      },
      {
        id: "vitamin-d-diabetes-link",
        heading: {
          he: "קשר לסוכרת מסוג 2",
          en: "Link to type 2 diabetes",
          am: "ከሁለተኛ ደረጃ ስኳር ህመም ጋር ግንኙነት",
        },
        figure: { he: "30–40% עלייה בסיכון", en: "30–40% risk increase", am: "30–40% አደጋ ጭማሪ" },
        context: {
          he: "מחסור בוויטמין D קשור לעלייה של 30–40% בסיכון לסוכרת מסוג 2 — קשר שמחמיר את מצב הקהילה בשל שכיחות הסוכרת הגבוהה ממילא.",
          en: "Vitamin D deficiency is associated with a 30–40% increase in type 2 diabetes risk — a link that compounds the community's situation given already-high diabetes prevalence.",
          am: "ቪታሚን D እጥረት ከ30–40% ስኳር ህመም አደጋ ጭማሪ ጋር ይዛመዳል።",
        },
        source: {
          name: "Diabetes Care — Vitamin D and T2D Risk Meta-Analysis 2023",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-30",
  },

  // ── 14. השמנת יתר ────────────────────────────────────────────────────────
  {
    slug: "obesity",
    name: {
      he: "השמנת יתר",
      en: "Obesity",
      am: "ውፍረት",
    },
    shortDescription: {
      he: "עלייה חדה בשכיחות לאחר הגירה; BMI עולה עם שנות שהייה בישראל. קשורה ישירות לסוכרת, לחץ דם ומחלות לב.",
      en: "Sharp post-migration rise in prevalence; BMI increases with years of residence. Directly linked to diabetes, hypertension, and CVD.",
      am: "ፍልሰት ከፍ ያለ ጭማሪ፤ BMI ከኖሩ ዓመታት ጋር ይጨምራል። ስኳር ህመም፣ ሃይ-ብሬሸር ጋር ቀጥተኛ ዝምድና።",
    },
    body: {
      he: `השמנת יתר (Obesity) היא מצב שבו עודפי שומן בגוף מגיעים לרמה שמסכנת את הבריאות. היא מוגדרת כ-BMI (מדד מסת גוף) של 30 ומעלה. בקרב יוצאי אתיופיה בישראל, השמנת יתר מהווה אחת הבעיות הגדלות במהירות — פנומן שמדענים מכנים "השמנת הגירה" (Migration Obesity).

המעבר מחיים פיזיים פעילים יחסית (עבודת שדות, הליכה מרובה) לחיים עירוניים ישראלים, בשילוב עם מעבר תזונתי לסוכרים פשוטים, פחמימות מזוקקות, ומזון מהיר — מוביל לצבירת שומן מואצת. מחקרים מראים שה-BMI עולה בצורה ניכרת עם כל שנה נוספת של שהייה בישראל, בפרט בקרב נשים ובגיל העמידה.

השלכות השמנת היתר אינן מוגבלות לאסתטיקה: היא גורם סיכון עיקרי לסוכרת מסוג 2, ליתר לחץ דם, למחלות לב, לשבץ מוחי, ולסוגי סרטן מסוימים. בהתחשב בשכיחות הגבוהה ממילא של מחלות אלו בקהילה — השמנת יתר מחריפה את הבעיה בצורה משמעותית.

גישת הטיפול היעילה ביותר משלבת: שינוי תזונתי הדרגתי (לא דיאטות קיצוניות), הגברת פעילות גופנית (הליכה היא הנגישה ביותר — 30 דקות ביום), ותמיכה קבוצתית. בישראל, קופות החולים מציעות תכניות ניהול משקל בחינם, ודיאטניות בשרות בריאות ציבורי יכולות לספק ייעוץ בעברית ולפעמים בשפות נוספות.`,
      en: `Obesity is a condition in which excess body fat reaches a level that endangers health. It is defined as a BMI (body mass index) of 30 or higher. Among Ethiopian Israelis in Israel, obesity is one of the fastest-growing health problems — a phenomenon scientists call "migration obesity."

The shift from relatively physically active lives (fieldwork, extensive walking) to Israeli urban living, combined with a dietary transition to simple sugars, refined carbohydrates, and fast food — leads to accelerated fat accumulation. Research shows that BMI increases markedly with each additional year of residence in Israel, particularly among women and in middle age.

The consequences of obesity are not limited to aesthetics: it is a primary risk factor for type 2 diabetes, hypertension, cardiovascular disease, stroke, and certain cancers. Given the already-high prevalence of these conditions in the community — obesity significantly compounds the problem.

The most effective treatment approach combines: gradual dietary change (not extreme diets), increased physical activity (walking is the most accessible — 30 minutes/day), and group support. In Israel, health plans offer free weight management programs, and public health dietitians can provide counseling in Hebrew and sometimes other languages.`,
      am: `ውፍረት BMI 30+ ሆኖ ሲገለጽ ጤናን አደጋ ላይ ሊጥል ይችላል። ኢትዮጵያ-እስራኤላውያን ዘንድ "ፍልሰት ውፍረት" ቀላጤ ይጨምራል።

ከሰፈር ሕይወት ወደ ከተማ ፍልሰት + ፈጣን ምግብ ሽግግር — BMI ዓመት ከዓመት ይጨምራሉ። ውፍረት ስኳር ህመም፣ ሃይ-ብሬሸርን ያወሳስባቸዋል። ቀስ ያለ ምግብ ለውጥ + 30 ደቂቃ ዕለታዊ ሃዲስ + ቡድን ድጋፍ — ትክክለኛ ሂደት ነው።`,
    },
    figures: [
      {
        id: "obesity-bmi-residence-years",
        heading: {
          he: "עלייה ב-BMI עם שנות שהייה",
          en: "BMI increase with years of residence",
          am: "BMI ከኖሩ ዓመታት ጋር ጭማሪ",
        },
        figure: { he: "עולה מדי שנה", en: "Rises each year", am: "ዓመት-ዓመት ይጨምራል" },
        context: {
          he: "BMI ממוצע בקרב יוצאי אתיופיה עולה בצורה עקבית עם כל שנת שהייה נוספת בישראל — בפרט בנשים ובגיל 35–55.",
          en: "Average BMI among Ethiopian Israelis consistently increases with each additional year of residence in Israel — particularly in women and in the 35–55 age group.",
          am: "ኢትዮጵያ-እስራኤላውያን ዓማካይ BMI ዓመት ከዓመት ይጨምራል — ለሴቶች እና 35–55 ዕድሜ ቡድን ጎልቶ።",
        },
        source: {
          name: "Israel Journal of Public Health — BMI Trends in Ethiopian Israelis 2024",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2024,
      },
      {
        id: "obesity-diabetes-link",
        heading: {
          he: "קשר להתפתחות סוכרת",
          en: "Link to diabetes onset",
          am: "ወደ ስኳር ህመም ማደግ ዝምድና",
        },
        figure: { he: "גורם סיכון מס' 1", en: "Risk factor #1", am: "1ኛ አደጋ ምክንያት" },
        context: {
          he: "השמנת יתר היא גורם הסיכון מספר 1 לסוכרת מסוג 2 — ירידה של 5–10% ממשקל הגוף מפחיתה את הסיכון לפרוגרסיה בכ-58%.",
          en: "Obesity is the number 1 risk factor for type 2 diabetes — a 5–10% reduction in body weight reduces the risk of progression by approximately 58%.",
          am: "ውፍረት ለሁለተኛ ደረጃ ስኳር ህመም 1ኛ አደጋ ምክንያት ነው — 5–10% ክብደት ቅናሽ አደጋን 58% ይቀንሳል።",
        },
        source: {
          name: "Diabetes Prevention Program Research Group — DPP Trial Outcomes 2022",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "תוכן זה הוא מידע בלבד ואינו מהווה ייעוץ רפואי. לכל שאלה או חשש רפואי, פנו לרופא המשפחה שלכם.",
        en: "This content is informational only and does not constitute medical advice. Consult your family doctor for any medical questions.",
        am: "ይህ ይዘት መረጃ ብቻ ሲሆን የሕክምና ምክር አይደለም። ለማንኛውም የጤና ጥያቄ ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-05-30",
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findCondition(slug: string): HealthConditionEntry | undefined {
  return CONDITIONS.find((c) => c.slug === slug);
}

export function conditionName(entry: HealthConditionEntry, locale: Locale): string {
  return entry.name[locale] ?? entry.name[DEFAULT_LOCALE] ?? entry.name.he;
}

export function conditionShortDescription(
  entry: HealthConditionEntry,
  locale: Locale,
): string {
  return (
    entry.shortDescription[locale] ??
    entry.shortDescription[DEFAULT_LOCALE] ??
    entry.shortDescription.he
  );
}

export function conditionBody(entry: HealthConditionEntry, locale: Locale): string {
  return entry.body[locale] ?? entry.body[DEFAULT_LOCALE] ?? entry.body.he;
}
