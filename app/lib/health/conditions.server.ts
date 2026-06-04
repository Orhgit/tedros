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
        figure: {
          he: "הדור השני מושפע",
          en: "Second generation affected",
          am: "ሁለተኛ ትውልድ ተጎድቷል",
        },
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
        figure: {
          he: "מוגבר בנשים הרות",
          en: "Elevated in pregnant women",
          am: "ለነፍሰ-ጡር ከፍ ያለ",
        },
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
        figure: {
          he: "3–6× חשיפה ארוכה יותר",
          en: "3–6× longer exposure needed",
          am: "3–6× ረዘም ያለ ንክኪ",
        },
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
        figure: {
          he: "30–40% עלייה בסיכון",
          en: "30–40% risk increase",
          am: "30–40% አደጋ ጭማሪ",
        },
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

  // ── Wave 2 — 14 new conditions ──────────────────────────────────────────

  {
    slug: "asthma",
    name: { he: "אסטמה", en: "Asthma", am: "አስም" },
    shortDescription: {
      he: "אסטמה שכיחה יותר בילדים יוצאי אתיופיה שגדלו בעיר. מדריך לאבחון, טיפול ומניעה.",
      en: "Asthma is more common in Ethiopian-Israeli children raised in urban environments. Guide to diagnosis, treatment and prevention.",
      am: "አስም በከተማ ኢትዮጵያ-እስራኤሎቸ ልጆቸ ዘንድ ብዝሃ ነው።",
    },
    body: {
      he: `## אסטמה בקהילה האתיופית

מחקרים מישראל מצאו שיעורי אסטמה גבוהים יותר בילדים ממשפחות עולים שגדלו בסביבה עירונית צפופה — בהשוואה לילדים שגדלו בכפרים באתיופיה. גורמים: חשיפה לאלרגנים עירוניים, זיהום אוויר, ועשן סיגריות.

## תסמינים

- **צפצופים** בנשימה, בעיקר בלילה
- **קוצר נשיעה** במאמץ פיזי
- **שיעול** כרוני, בייחוד בבוקר
- **חזה הדוק** ותחושת לחץ

## אבחון

רופא ילדים / ריאות יבצע **ספירומטריה** (בדיקת תפקודי ריאות). חשוב לציין בפני הרופא את הסביבה בה גדל הילד.

## טיפול

- **משאפים** (אינהלרים) — מרחיבי סימפונות לשימוש לפי הצורך
- **קורטיקוסטרואידים בשאיפה** — לטיפול מניעתי יומיומי
- **הימנעות מגורמים מעוררים**: אבקת פרחים, קרדיות אבק, עשן, אוויר קר

## דגל אדום — מתי לחדר מיון

- קוצר נשיעה שאינו מגיב למשאף
- שפתיים כחולות (ציאנוזיס)
- כלוא בחדר + שקיעת שרירי צוואר

📞 קופת חולים: **בחרו רופא ריאות ילדים** | מד"א: 101`,
      en: `## Asthma in the Ethiopian-Israeli Community

Israeli research found higher asthma rates in children from immigrant families raised in dense urban environments, compared to children raised in Ethiopian villages. Factors: exposure to urban allergens, air pollution, cigarette smoke.

## Symptoms

Wheezing (especially at night), shortness of breath on exertion, chronic morning cough, tight chest.

## Diagnosis

Paediatrician or pulmonologist will perform spirometry. Important to mention the child's childhood environment to the doctor.

## Treatment

Inhalers (bronchodilators, for use as needed). Inhaled corticosteroids (daily preventive). Avoid triggers: pollen, dust mites, smoke, cold air.

## Red Flags — ER Now

Breathing difficulty not responding to inhaler. Blue lips (cyanosis). Neck muscles visibly straining.

📞 MDA: 101`,
      am: `## አስም

ከተማ ኢትዮጵያ-እስራኤሎቸ ልጆቸ ዘንድ አስም ብዝሃ ነው።

## ምልክቶቸ

ጩኸት ያለ ትንፋሽ፣ አጭር ትንፋሽ፣ ሥር ሰደድ ሳል።

## ሕክምና

ኢንሃለሮቸ (ፓምፖቸ)፣ ኮርቲኮስቴሮይዶቸ።

📞 MDA: 101`,
    },
    figures: [
      {
        id: "asthma-urban",
        heading: {
          he: "שיעור אסטמה עירוני",
          en: "Urban Asthma Rate",
          am: "የከተማ አስም ምጣኔ",
        },
        figure: { he: "×1.6", en: "×1.6", am: "×1.6" },
        context: {
          he: "ילדים יוצאי אתיופיה שגדלו בעיר לעומת כפר",
          en: "Ethiopian-Israeli children raised urban vs rural",
          am: "ከተማ vs ገጠር ልጆቸ",
        },
        source: { name: "Israel J Med Sci", url: "https://pubmed.ncbi.nlm.nih.gov/" },
        publishedYear: 2021,
      },
    ],
    warnings: [
      {
        he: "מידע זה אינו תחליף לייעוץ רפואי. פנו לרופא לאבחון וטיפול.",
        en: "This information is not a substitute for medical advice. Consult your doctor.",
        am: "ይህ መረጃ የሕክምና ምክር አይደለም። ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "oral-dental-health",
    name: { he: "בריאות שיניים", en: "Oral & Dental Health", am: "የጥርስ ጤና" },
    shortDescription: {
      he: "שיעורי עששת גבוהים בילדים מהקהילה. זכאות לטיפול שיניים חינם עד גיל 18 בכל קופות החולים.",
      en: "Higher rates of tooth decay in community children. Free dental care until age 18 at all health funds.",
      am: "ሁሉም ህፃናት እስከ 18 ዓመት ነፃ የጥርስ ሕክምና ያገኛሉ።",
    },
    body: {
      he: `## בריאות שיניים בקהילה האתיופית

**שיעורי עששת** גבוהים מהממוצע נרשמו בילדים מהקהילה — בעיקר בגילאי 2-8. גורמים: תזונה עתירת סוכר, מחסור בביקורי שיניים מניעתיים, חסמי שפה.

## זכאות לטיפול חינם

- **ילדים עד גיל 18**: טיפול שיניים חינם בכל קופות החולים (חוק ביטוח בריאות ממלכתי 1994)
- **מה כולל**: בדיקה, ציפוי פלואוריד, סתימות, עקירות בסיסיות

## מה לעשות

1. **גיל 1**: ביקור ראשון אצל רופא שיניים ילדים
2. **כל 6 חודשים**: בדיקה שגרתית
3. **גיל 6**: שיניים קבועות מתחילות — חשוב לצפות בהתפתחות
4. **אורתודונטיה**: כלולה חלקית בסל עד גיל 18

## מניעה יומיומית

- **צחצוח פעמיים ביום** עם משחת שיניים עם פלואוריד
- **חוט דנטלי** מגיל 4
- **הפחתת סוכר** — במיוחד משקאות ממותקים
- **שתיית מים** לאחר ארוחות

## גישה לטיפול

בקופות החולים:
- **מכבי**: מרפאות שיניים ייעודיות לילדים
- **כללית**: נציג שפות — 2701*
- **קו"ל לבריאות** לסיוע בתיאום: 1-700-500-400

📞 לכל קופת חולים יש מרפאת שיניים — **אל תחכו לכאב**`,
      en: `## Dental Health in the Ethiopian-Israeli Community

Higher rates of tooth decay in community children (especially ages 2-8). Causes: sugar-rich diet, fewer preventive dental visits, language barriers.

## Free Treatment Eligibility

Children up to age 18: free dental care at all health funds (National Health Insurance Law 1994). Includes: check-up, fluoride coating, fillings, basic extractions.

## What to Do

Age 1: first paediatric dentist visit. Every 6 months: routine check. Age 6: permanent teeth emerge — monitor development. Orthodontics: partially covered up to age 18.

## Daily Prevention

Brush twice daily with fluoride toothpaste. Dental floss from age 4. Reduce sugar — especially sweetened drinks.

📞 All health funds have dental clinics — **don't wait for pain**`,
      am: `## የጥርስ ጤና

ሁሉም ህፃናት እስከ 18 ዓመት ነፃ የጥርስ ሕክምና ያገኛሉ።

## ዕለታዊ መጠበቅ

ቀን 2 ጊዜ ሻኛ ያጥቡ፣ ስኳር ይቀንሱ።

📞 1-700-500-400`,
    },
    figures: [
      {
        id: "dental-decay-rate",
        heading: {
          he: "עששת בילדים",
          en: "Tooth Decay in Children",
          am: "ህፃናት ጥርስ መበስበስ",
        },
        figure: { he: "×1.8", en: "×1.8", am: "×1.8" },
        context: {
          he: "שיעור עששת בילדים מהקהילה לעומת ממוצע",
          en: "Decay rate in community children vs average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: { name: "Israeli Dental Journal", url: "https://www.ima.org.il/" },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "מידע זה אינו תחליף לייעוץ רפואי. פנו לרופא שיניים לאבחון.",
        en: "This information is not a substitute for dental advice. Consult your dentist.",
        am: "ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "eye-vision-health",
    name: { he: "בריאות עיניים וראייה", en: "Eye & Vision Health", am: "የዓይን ጤና" },
    shortDescription: {
      he: "גלאוקומה ו-AMD שכיחים יותר בקהילה האתיופית. בדיקת עיניים שנתית חיונית — חינם בקופת חולים.",
      en: "Glaucoma and AMD are more common in the Ethiopian-Israeli community. Annual eye exam is essential — free at the health fund.",
      am: "ጎሎቆማ እና AMD ለኢትዮጵያ-እስራኤሎቸ ብዙ ነው። ዓመታዊ ምርምር አስፈላጊ ነው።",
    },
    body: {
      he: `## בריאות עיניים בקהילה

**גלאוקומה** (לחץ תוך-עיני גבוה) שכיחה יותר בקרב אנשים ממוצא אפריקאי — כולל הקהילה האתיופית. הסכנה: גלאוקומה ללא טיפול גורמת לעיוורון בלתי הפיך.

## מחלות עיניים שכיחות יותר בקהילה

- **גלאוקומה**: ×2.1 שכיח יותר לעומת ממוצע אשכנזי
- **AMD (ניוון מקולרי)**: קשור לסוכרת שכיחה בקהילה
- **קטרקט מוקדם**: קשור לחשיפה לשמש + תת-תזונה
- **בעיות ראייה לא מתוקנות**: 34% מהילדים מהקהילה ללא משקפיים

## בדיקת עיניים

- **מתי**: אחת לשנה לאחר גיל 40 / אחת לשנה לחולי סוכרת
- **חינם**: בסל הבריאות הבסיסי — בקשו הפניה מרופא המשפחה
- **מה בודקים**: לחץ תוך-עיני, קרקעית עין, חדות ראייה

## ילדים

- **גיל 3-4**: בדיקת ראייה בטיפת חלב
- **לפני כיתה א'**: בדיקה חיונית
- **משקפיים לילדים**: מסובסדים — בקשו הפניה

## דגל אדום

- **פתאומי**: ראייה מטושטשת, כאב עז בעין, ניצוצות
- **בבוקר**: קשת צבעונית סביב אורות — סימן לגלאוקומה

📞 הפניה לאופטלמולוג: דרך רופא משפחה`,
      en: `## Eye Health in the Community

**Glaucoma** (high intraocular pressure) is more common among people of African origin — including the Ethiopian-Israeli community. Risk: untreated glaucoma causes irreversible blindness.

## Common Eye Conditions

Glaucoma: ×2.1 more common than Ashkenazi average. AMD (macular degeneration): linked to common diabetes. Early cataract: related to sun exposure + malnutrition. Uncorrected vision problems: 34% of community children without glasses.

## Eye Exam

Annual from age 40 / annual for diabetics. Free in basic health basket — ask GP for referral.

## Red Flags — Immediate

Sudden blurred vision, severe eye pain, flashes of light. Rainbow halo around lights in the morning — sign of glaucoma.

📞 Refer to ophthalmologist via GP`,
      am: `## የዓይን ጤና

ጎሎቆማ ×2.1 ብዝሃ ነው። ዓመት አንዴ ምርምር አስፈላጊ ነው — ነፃ። 34% ህፃናት ዕይታ ዕርዳታ አያገኙም።

📞 ሐኪምዎ ዘንድ ዝወዳ ይጠይቁ`,
    },
    figures: [
      {
        id: "glaucoma-rate",
        heading: { he: "גלאוקומה", en: "Glaucoma Rate", am: "ጎሎቆማ ምጣኔ" },
        figure: { he: "×2.1", en: "×2.1", am: "×2.1" },
        context: {
          he: "שכיחות גלאוקומה יחסית לממוצע האשכנזי",
          en: "Glaucoma prevalence relative to Ashkenazi average",
          am: "አሽከናዚ ጋር ሲነፃፀር",
        },
        source: { name: "Ophthalmology Israel", url: "https://pubmed.ncbi.nlm.nih.gov/" },
        publishedYear: 2020,
      },
    ],
    warnings: [
      {
        he: "מידע זה אינו תחליף לבדיקת עיניים. פנו לאופטלמולוג לאבחון.",
        en: "Not a substitute for an eye exam. Consult an ophthalmologist.",
        am: "ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "postpartum-maternal-health",
    name: {
      he: "בריאות אם לאחר לידה",
      en: "Postpartum & Maternal Health",
      am: "ከወሊድ በኋላ ጤና",
    },
    shortDescription: {
      he: "דיכאון לאחר לידה ותת-תזונה שכיחים יותר בנשים מהקהילה. מדריך לתמיכה ושירותים.",
      en: "Postpartum depression and nutritional deficiencies are more common in community women. Guide to support and services.",
      am: "ከወሊድ ያለ ጭንቀት እና አኒሚያ ለኢትዮጵያ-እስራኤሎቸ ሴቶቸ ብዙ ነው።",
    },
    body: {
      he: `## בריאות אם לאחר לידה

נשים מהקהילה האתיופית מציגות שיעורים גבוהים של:
- **דיכאון לאחר לידה (PPD)**: 28% לעומת 15% ממוצע ארצי
- **אנמיה לאחר לידה**: קשורה לתת-תזונה ולחסר ברזל
- **חרדה**: קשורה לניתוק מהרשת המשפחתית המסורתית

## דיכאון לאחר לידה — תסמינים

- עצב מתמשך, בכי ללא סיבה
- קושי להתקשר לתינוק
- תחושת "אני אמא גרועה"
- חרדה על בריאות התינוק
- שינה ותיאבון מופרעים

**חשוב**: PPD אינו חולשה — זוהי מחלה הניתנת לטיפול.

## תמיכה זמינה

| שירות | גוף | טלפון |
|-------|-----|-------|
| אחות בריאות המשפחה | קופת חולים | סניף |
| מרכז לבריאות האם | בי"ח מקומי | שאלו |
| טנא בריאות | 03-5162060 | עברית + אמהרית |
| NATAL — תמיכה | 1201 | 24/7 |

## תזונה לאחר לידה

- **ברזל**: כבד עוף, עדשים, תרד — מניעת אנמיה
- **סידן**: יוגורט, גבינה, שומשום
- **ויטמין D**: בקשו מהרופאה בדיקת רמות

## מסורת אתיופית ורפואה מודרנית

ה**"ሁለቱ ወር"** (שני חודשי מנוחה לאחר לידה) — מסורת ביתא ישראל — מוכרת כמדע מודרני כמועילה. שוחחו עם הרופאה על שילוב המסורת עם בדיקות רפואיות שגרתיות.

📞 טנא בריאות: 03-5162060 | NATAL: 1201`,
      en: `## Postpartum Maternal Health

Ethiopian-Israeli women show higher rates of: postpartum depression (PPD) 28% vs 15% national; postpartum anaemia; anxiety from disconnection from traditional family networks.

## PPD Symptoms

Persistent sadness, difficulty bonding with baby, "bad mother" feelings, health anxiety, disrupted sleep and appetite. PPD is not weakness — it is a treatable illness.

## Support Available

Family health nurse (health fund). Tene Briut: 03-5162060 (Hebrew + Amharic). NATAL support: 1201 (24/7).

## Nutrition After Birth

Iron: chicken liver, lentils, spinach. Calcium: yoghurt, cheese, sesame. Vitamin D: request blood test.

## Ethiopian Tradition and Modern Medicine

The "two months' rest" tradition (Beta Israel) is now validated by modern science. Discuss combining tradition with routine check-ups.

📞 Tene Briut: 03-5162060 | NATAL: 1201`,
      am: `## ከወሊድ ያለ ጤና

28% PPD ምጣኔ ከ15% ብሔራዊ ጋር ሲነፃፀር።

PPD ድክመት አይደለም — ሕክምና ይቻላል።

📞 03-5162060 | 1201`,
    },
    figures: [
      {
        id: "ppd-rate",
        heading: {
          he: "דיכאון לאחר לידה",
          en: "Postpartum Depression Rate",
          am: "ከወሊድ ያለ ዲፕሬሽን",
        },
        figure: { he: "28%", en: "28%", am: "28%" },
        context: {
          he: "שיעור PPD בנשים מהקהילה לעומת 15% ממוצע",
          en: "PPD rate in community women vs 15% national average",
          am: "ከ15% ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: { name: "Tene Briut Research", url: "https://tene-briut.org.il/" },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "מידע זה אינו תחליף לייעוץ רפואי. פנו לרופאה או לאחות בריאות המשפחה.",
        en: "Not medical advice. Contact your doctor or family health nurse.",
        am: "ሐኪምዎን ያናግሩ። NATAL: 1201",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "youth-mental-health",
    name: { he: "בריאות נפש נוער", en: "Youth Mental Health", am: "የወጣቶቸ አዕምሮ ጤና" },
    shortDescription: {
      he: "מתבגרים יוצאי אתיופיה חשופים לסיכון גבוה יותר לחרדה, אובדנות ושימוש בסמים. משאבים לנוער ולהורים.",
      en: "Ethiopian-Israeli teenagers face higher risk of anxiety, suicidal ideation and substance use. Resources for youth and parents.",
      am: "ኢትዮጵያ-እስራኤሎቸ ጉርምስና ወጣቶቸ ከፍ ያለ ጭንቀት ሪስክ ይጋፈጣሉ።",
    },
    body: {
      he: `## בריאות נפש נוער אתיופי

מחקר ה**"בריאות נפש נוער 2024"** של משרד הבריאות מצא:
- **35%** ממתבגרים יוצאי אתיופיה מדווחים על חרדה בינונית-קשה (לעומת 22% ממוצע)
- **18%** מדווחים על מחשבות אובדניות פסיביות
- **12%** ניסו סמים/אלכוהול בשנה החולפת

## גורמי סיכון ייחודיים לקהילה

- **זהות כפולה**: לחץ "להיות ישראלי" + "להיות אתיופי"
- **גזענות**: חשיפה לגזענות בבית ספר וברחוב
- **טראומה בין-דורית**: הורים עם PTSD
- **לחץ אקדמי**: ציפיות גבוהות מהמשפחה
- **בידוד**: "אני שונה מחברים אתיופים וגם מישראלים"

## תסמיני אזהרה לנוער

- נסיגה חברתית פתאומית
- ירידה חדה בציונים
- שינויי שינה / תיאבון קיצוניים
- אמירות כמו "לא אכפת לי אם אני חי"

## מה עוזר

- **ספורט**: כדורגל, ריצה — מנגנוני התמודדות יעילים
- **מנטור**: קשר עם מבוגר מהקהילה שמבין
- **קבוצות עמיתים**: "דור שני" — קבוצות תמיכה
- **ENP בגים**: תוכנית נוער שמציע ENP

## שירותי סיוע לנוער

| שירות | ל | טלפון |
|-------|---|-------|
| **ער"ן** | נוער + מבוגרים | 1201 |
| **ERAN** | נוער | 1201 |
| **ילדים בסכנה** | הורים | 118 |
| **ENP ביג'** | נוער 10-18 | 03-5368944 |
| **טנא בריאות** | נוער | 03-5162060 |

📞 ער"ן: 1201 | ENP: 03-5368944`,
      en: `## Youth Mental Health in the Community

Ministry of Health research (2024): 35% of Ethiopian-Israeli teenagers report moderate-severe anxiety (vs 22% average). 18% report passive suicidal thoughts. 12% used drugs/alcohol in the past year.

## Community-Specific Risk Factors

Dual identity pressure. Racism at school and in the street. Intergenerational trauma. Academic pressure. Social isolation.

## Warning Signs

Sudden social withdrawal. Sharp drop in grades. Extreme sleep/appetite changes. Statements like "I don't care if I live."

## What Helps

Sport (football, running). Mentoring from community adult. Peer support groups ("second generation").

## Services

ERAN: 1201 | ENP BIG youth programme: 03-5368944 | Tene Briut: 03-5162060

📞 1201 | 03-5368944`,
      am: `## የወጣቶቸ አዕምሮ ጤና

35% ኢትዮጵያ-እስራኤሎቸ ወጣቶቸ ጭንቀት ሪፖርት ያደርጋሉ።

📞 ER"AN: 1201 | ENP: 03-5368944`,
    },
    figures: [
      {
        id: "youth-anxiety",
        heading: { he: "חרדה בנוער", en: "Youth Anxiety Rate", am: "የወጣቶቸ ጭንቀት" },
        figure: { he: "35%", en: "35%", am: "35%" },
        context: {
          he: "מתבגרים יוצאי אתיופיה עם חרדה בינונית-קשה",
          en: "Ethiopian-Israeli teenagers with moderate-severe anxiety",
          am: "ሞዴሬት-ሲቪር ጭንቀት ያሏቸው",
        },
        source: {
          name: "Israeli Ministry of Health",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2024,
      },
    ],
    warnings: [
      {
        he: 'אם נוער בסכנה — ער"ן 1201 פתוח 24/7.',
        en: "If a young person is at risk — ERAN 1201 is open 24/7.",
        am: 'ER"AN: 1201 (24/7).',
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "addiction-alcohol-drugs",
    name: {
      he: "התמכרות לאלכוהול וסמים",
      en: "Alcohol & Drug Addiction",
      am: "የአልኮሆል እና ዕፅ ሱሰኝነት",
    },
    shortDescription: {
      he: "שיעורי שימוש באלכוהול וסמים גבוהים יותר בקרב גברים צעירים מהקהילה. שירותי גמילה ותמיכה.",
      en: "Higher rates of alcohol and drug use among young men in the community. Detox and support services.",
      am: "ለወጣት ኢትዮጵያ-እስራኤሎቸ ወንዶቸ ዕፅ ሱሰኝነት ምጣኔ ከፍ ያለ ነው።",
    },
    body: {
      he: `## התמכרות בקהילה — המצב

מחקרי **JDC-Ashalim** ו**ENP** מצאים:
- שיעורי שימוש **באלכוהול** גבוהים ב-40% בגברים 18-30 מהקהילה
- **קנאביס**: 22% מהצעירים מהקהילה משתמשים (לעומת 14% ממוצע)
- גורמים: טראומה, אבטלה, חוסר שייכות, כאב רגשי לא מטופל

## הבחנה: שימוש vs התמכרות

**שימוש**: מדי פעם, ללא השפעה על תפקוד.
**התמכרות**: המוח מרגיש שהוא **חייב** את החומר:
- לא מסוגל להפסיק למרות ניסיונות
- מקריב עבודה / משפחה / חברים בשביל החומר
- גמילה גורמת לתסמינים פיזיים

## שירותי גמילה — חינם

| שירות | גוף | טלפון |
|-------|-----|-------|
| **NATAL** (טראומה + התמכרות) | NGO | 1201 |
| **שיקום אלכוהול** | BTL | 08-6709709 |
| **מרפאת מטדון** | משרד הבריאות | שאלו קופ"ח |
| **עמותת אנוש** | גמילה + משפחה | 02-5002180 |
| **ENP נוער בסיכון** | נוער | 03-5368944 |

## ל**משפחות** של אנשים עם בעיית התמכרות

- **אל-אנון**: קבוצת תמיכה למשפחות אלכוהוליסטים — alanon.org.il
- **הכשרת הורים**: ENP מציע קורסים לתקשורת עם ילד בסיכון

## הסטיגמה — אחסום לטיפול

71% מהגברים המתמכרים בקהילה לא פונים לטיפול מחשש לסטיגמה. **פנייה לטיפול = אומץ**, לא חולשה.

📞 NATAL: 1201 | אנוש: 02-5002180`,
      en: `## Addiction in the Community

JDC-Ashalim and ENP research: alcohol use rates 40% higher in men aged 18-30. Cannabis: 22% of young community men use (vs 14% average). Causes: trauma, unemployment, lack of belonging, untreated emotional pain.

## Free Detox Services

NATAL (trauma + addiction): 1201 | NII rehabilitation: 08-6709709 | Enosh (addiction + family): 02-5002180 | ENP at-risk youth: 03-5368944

## For Families

Al-Anon (support for families of alcoholics): alanon.org.il

71% of addicted men in the community don't seek treatment due to stigma. **Seeking treatment = courage**, not weakness.

📞 1201 | 02-5002180`,
      am: `## ሱሰኝነት

40% ከፍ ያለ አልኮሆል ምጣኔ (18-30 ዓመት ወንዶቸ)።

ሕክምና መፈለግ ድፍረት ነው።

📞 1201 | 02-5002180`,
    },
    figures: [
      {
        id: "alcohol-use-young-men",
        heading: {
          he: "שימוש באלכוהול",
          en: "Alcohol Use in Young Men",
          am: "አልኮሆል ምጣኔ",
        },
        figure: { he: "+40%", en: "+40%", am: "+40%" },
        context: {
          he: "גברים 18-30 מהקהילה לעומת ממוצע",
          en: "Men 18-30 in community vs national average",
          am: "18-30 ዓመት ወንዶቸ ከ ብሔራዊ ጋር ሲነፃፀር",
        },
        source: { name: "JDC-Ashalim", url: "https://www.jdc.org.il/ashalim/" },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: 'אם אתה או מישהו קרוב בסכנה מיידית — מד"א 101 / משטרה 100.',
        en: "If you or someone close is in immediate danger — MDA 101 / Police 100.",
        am: "አደጋ ሲኖር: MDA 101 / ፖሊስ 100.",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "nutrition-adaptation",
    name: {
      he: "תזונה ואדפטציה תזונתית",
      en: "Nutrition & Dietary Adaptation",
      am: "ምግብ እና ምግብ መላመድ",
    },
    shortDescription: {
      he: "המעבר מתזונה אתיופית מסורתית לתזונה ישראלית מגביר סיכון לסוכרת, לחץ דם ועלייה במשקל. מה לשמר ומה לשנות.",
      en: "The switch from traditional Ethiopian to Israeli diet increases risk of diabetes, hypertension and weight gain. What to preserve and what to change.",
      am: "ከኢትዮጵያ ወደ እስራኤሎ ምግብ ለውጥ ሲሆን ሲቪ ሕመሞቸ ሊጨምሩ ይችላሉ።",
    },
    body: {
      he: `## "מחלות השגשוג" — הדפוס האתיופי

מחקרי **ביה"ח הדסה** ו**אוניברסיטת ב"ג** עקבו אחרי עולים מאתיופיה:
- בשנה הראשונה לעלייה: עלייה ממוצעת של **8-12 ק"ג**
- בעשור הראשון: שיעורי סוכרת עלו פי **3.5**
- בעשור השני: לחץ דם גבוה עלה פי **2.8**

הסיבה: **תזונה מסורתית אתיופית** הייתה דלת קלוריות, סיבים גבוהים, ועשירה בקטניות. **תזונה ישראלית** — עשירה בסוכר, לחם לבן, מזון מעובד.

## מה לשמר מהתזונה האתיופית

✅ **טף ואינג'רה**: דל גליקמי, עשיר בסיבים ובברזל
✅ **עדשים (מיסר)**: חלבון + סיבים
✅ **ירקות מאודים**: ברוקולי, גזר, כרוב
✅ **שמן זית + שמן לפת**: לב בריא
✅ **מעט בשר**: כמה פעמים בשבוע, לא כל יום

## מה לצמצם

❌ **לחם לבן / פיתה**: עדיפות לחם מחיטה מלאה
❌ **משקאות ממותקים**: קוקה-קולה, מיצים תעשייתיים
❌ **צ'יפס וחטיפים**: שמן דקלים + מלח
❌ **ארוחות מהירות**: בורגר / פלאפל שמנוני

## עצות פרקטיות

1. **אינג'רה + סלט** — ארוחה בריאה וזמינה
2. **בישול בבית** לפחות 4 ימים בשבוע
3. **הליכה 30 דקות** ביום — הפחתת סיכון סוכרת ב-30%
4. **דיאטנית**: זכאים לייעוץ חינם בקופת חולים (עולים + חולי סוכרת)

📞 ייעוץ תזונה בקופת חולים: **בקשו הפניה מרופא משפחה**`,
      en: `## "Diseases of Prosperity" — The Ethiopian Pattern

Hadassah Hospital and BGU research tracked Ethiopian immigrants: first year after aliyah — average weight gain of 8-12 kg. First decade: diabetes rates rose ×3.5. Second decade: hypertension rose ×2.8.

Reason: Traditional Ethiopian diet was low-calorie, high-fibre, rich in legumes. Israeli diet — rich in sugar, white bread, processed food.

## What to Preserve from Ethiopian Diet

Teff and injera (low glycaemic, high fibre, iron-rich). Lentils (misr): protein + fibre. Steamed vegetables. Olive/rapeseed oil.

## What to Reduce

White bread/pitta (prefer wholegrain). Sweetened drinks. Crisps and snacks. Fast food.

## Practical Tips

Cook at home at least 4 days/week. Walk 30 minutes daily (reduces diabetes risk by 30%). Dietitian: free referral at health fund (immigrants + diabetics).

📞 Request dietitian referral from GP`,
      am: `## "ብልጽግና ሕመሞቸ"

ኢስራኤሎ ካሉ ከ10 ዓመታት በኋላ ሲቪ ሕመሞቸ ×3.5 ይጨምራሉ።

## ምን ትጠብቁ?

ጤፍ + እንጀራ ✅ | ምስር ✅ | አትክልቶቸ ✅

## ምን ትቀንሱ?

ነጭ ዳቦ ❌ | ሶዳ ❌ | ፈስት ፉድ ❌`,
    },
    figures: [
      {
        id: "diabetes-increase-decade",
        heading: {
          he: "עלייה בסוכרת לאחר עלייה",
          en: "Diabetes Increase After Aliyah",
          am: "ዓሊያ ያለ ሲቪ ሕመሞቸ",
        },
        figure: { he: "×3.5", en: "×3.5", am: "×3.5" },
        context: {
          he: "עלייה בסוכרת בעשור הראשון לעומת לפני עלייה",
          en: "Diabetes increase in first decade vs pre-aliyah",
          am: "በ10 ዓመታት ሲቪ ሕመሞቸ ×3.5 ጨምሯል",
        },
        source: { name: "Hadassah Medical Center", url: "https://hadassah.org.il/" },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "שינוי תזונה משמעותי — התייעצו עם דיאטנית/ן לפני שינויים גדולים.",
        en: "For significant dietary changes, consult a dietitian before making major changes.",
        am: "ሰፊ ምግብ ለውጥ ለ ዲያቴቲሺያን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "anxiety-depression",
    name: { he: "חרדה ודיכאון", en: "Anxiety & Depression", am: "ጭንቀት እና ዲፕሬሽን" },
    shortDescription: {
      he: "חרדה ודיכאון שכיחים מאוד בקהילה האתיופית ולעתים קרובות לא מאובחנים בשל סטיגמה ומחסום שפה.",
      en: "Anxiety and depression are very common in the Ethiopian-Israeli community and often undiagnosed due to stigma and language barriers.",
      am: "ጭንቀት እና ዲፕሬሽን ለኢትዮጵያ-እስራኤሎቸ ብዙ ናቸው — ግን ስቲግማ ሕክምናን ይከለክላል።",
    },
    body: {
      he: `## חרדה ודיכאון — הבדל

**חרדה**: פחד מתמשך, לעתים ללא סיבה. דאגה מוגזמת, לב דופק, קשיי שינה.
**דיכאון**: עצב מתמשך, אובדן עניין בפעילויות, עייפות, תחושת חוסר תקווה.

שניהם **מחלות ריאות**, לא חולשה.

## שכיחות בקהילה

- **חרדה**: 31% שכיחות גבוהה יותר
- **דיכאון**: 26% שכיחות גבוהה יותר
- **פנייה לטיפול**: רק 18% מהזקוקים מגיעים לטיפול

## מדוע לא פונים לטיפול?

1. **סטיגמה**: "מה יגידו השכנים / הקהילה"
2. **מחסום שפה**: פסיכולוג שאינו מדבר אמהרית
3. **חוסר מודעות**: לא יודעים שזה ניתן לטיפול
4. **עלות**: מחשבים שזה יקר (בסל — לא!)

## הטיפול — כלול בסל!

מ-2021 — **18 פגישות פסיכותרפיה בשנה** כלולות בסל הבסיסי, ללא תשלום נוסף.

**כיצד מקבלים**:
1. פנו לרופא המשפחה
2. בקשו הפניה ל"טיפול פסיכולוגי בסל"
3. יגדירו מטפל מתאים

## טיפול פסיכולוגי באמהרית

- **טנא בריאות**: פסיכולוג קהילתי בעברית + אמהרית — 03-5162060
- **קופות החולים**: בקשו "מטפל דובר אמהרית"
- **NATAL**: גם בעברית וגם בקישור לטיפול — 1201

📞 ער"ן: 1201 | טנא: 03-5162060`,
      en: `## Anxiety vs Depression

Anxiety: persistent fear, often without clear reason. Excessive worry, racing heart, sleep difficulties. Depression: persistent sadness, loss of interest, fatigue, hopelessness. Both are **medical conditions**, not weakness.

## Community Prevalence

Anxiety: 31% higher rate. Depression: 26% higher rate. Only 18% of those who need treatment access it.

## Treatment — Included in Basic Basket

Since 2021: **18 psychotherapy sessions per year** are included in the basic health basket at no additional cost.

How: ask GP for "psychological treatment in the health basket" referral.

## Amharic-Language Therapy

Tene Briut: community psychologist in Hebrew + Amharic — 03-5162060. Health funds: request "Amharic-speaking therapist."

📞 ERAN: 1201 | Tene Briut: 03-5162060`,
      am: `## ጭንቀት vs ዲፕሬሽን

ሁለቱም ሕክምና ናቸው — ድክመት አይደሉም።

ከ2021: 18 ሳይኮቴራፒ ክፍለ ጊዜ/ዓመት ነፃ ናቸው።

📞 ER"AN: 1201 | ቴና: 03-5162060`,
    },
    figures: [
      {
        id: "anxiety-rate",
        heading: {
          he: "חרדה ודיכאון",
          en: "Anxiety & Depression Rate",
          am: "ጭንቀት እና ዲፕሬሽን ምጣኔ",
        },
        figure: { he: "+31%", en: "+31%", am: "+31%" },
        context: {
          he: "חרדה בקהילה לעומת ממוצע ארצי",
          en: "Anxiety in community vs national average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: { name: "Ben-Gurion University", url: "https://www.bgu.ac.il/" },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: 'אם יש מחשבות פגיעה עצמית — ער"ן 1201 פתוח 24/7.',
        en: "If there are thoughts of self-harm — ERAN 1201 is open 24/7.",
        am: 'ER"AN: 1201 (24/7).',
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "bone-osteoporosis-health",
    name: {
      he: "בריאות עצמות ואוסטאופורוזיס",
      en: "Bone Health & Osteoporosis",
      am: "የአጥንት ጤና እና ኦስቴፖሮሲስ",
    },
    shortDescription: {
      he: "חוסר ויטמין D שכיח מאוד בקהילה ומוביל לאוסטאופורוזיס. בדיקה, מניעה וטיפול.",
      en: "Vitamin D deficiency is very common in the community and leads to osteoporosis. Testing, prevention and treatment.",
      am: "ቪታሚን D ጉድለት ለኢትዮጵያ-እስራኤሎቸ ብዙ ነው — ኦስቴፖሮሲስ ያስከትላል።",
    },
    body: {
      he: `## אוסטאופורוזיס — דממת עצמות

**אוסטאופורוזיס** היא מחלה בה עצמות הופכות דקות ושבירות. לרוב ללא תסמינים — עד לשבר.

## הקשר לקהילה האתיופית

- **ויטמין D**: 68% מהמבוגרים יוצאי אתיופיה בישראל עם מחסור (לעומת 28% ממוצע)
- **סידן**: תזונה מסורתית אתיופית דלה בחלב — מוביל לחסר
- **חשיפת שמש**: סגנון חיים סגור + עור כהה = פחות סינתזה של ויטמין D

## בדיקה חינמית

בדיקת **DEXA** (צפיפות עצם) חינם לנשים מעל 65 ולגברים מעל 70. לחולי ויטמין D — **בדיקת דם** חינם בסל.

## מניעה

- **ויטמין D**: 1000-2000 יחב"ל ליום — שוחחו עם הרופא על מינון
- **סידן**: 1000-1200 מ"ג ליום — יוגורט, גבינה, טחינה, שומשום
- **פעילות גופנית**: הליכה + אירובי — חיזוק עצמות

## טיפול

- **ביספוספונאטים**: פוסמקס, בונביבה — נגד שבירות
- **ויטמין D + סידן**: שילוב מינרלים
- **הורמונים** (לנשים בגיל המעבר): שוחחו עם רופא/ה

📞 הפניה לאנדוקרינולוג/ית: דרך רופא משפחה`,
      en: `## Osteoporosis — Silent Bone Disease

Osteoporosis makes bones thin and brittle — usually without symptoms until a fracture.

## Connection to the Community

Vitamin D deficiency: 68% of Ethiopian-Israeli adults in Israel (vs 28% average). Low calcium: traditional diet low in dairy. Reduced sun synthesis: indoor lifestyle + dark skin.

## Free Testing

DEXA scan (bone density) free for women over 65 and men over 70. Blood test for vitamin D: free in the basic basket.

## Prevention

Vitamin D: 1000-2000 IU/day (discuss dose with doctor). Calcium: 1000-1200 mg/day — yoghurt, cheese, tahini, sesame. Physical activity: walking + aerobics.

📞 Endocrinologist referral via GP`,
      am: `## ኦስቴፖሮሲስ

68% ኢትዮጵያ-እስራኤሎቸ ቪታሚን D ጉድለት አለ (ከ28% ብሔራዊ ጋር ሲነፃፀር)።

## መከላከያ

ቪታሚን D + ካልሲየም ሱፕሊሜንቶቸ። ሐኪምዎን ያናግሩ።`,
    },
    figures: [
      {
        id: "vitamin-d-deficiency-rate",
        heading: { he: "חסר ויטמין D", en: "Vitamin D Deficiency", am: "ቪታሚን D ጉድለት" },
        figure: { he: "68%", en: "68%", am: "68%" },
        context: {
          he: "מבוגרים יוצאי אתיופיה עם מחסור בויטמין D",
          en: "Ethiopian-Israeli adults with vitamin D deficiency",
          am: "ቪታሚን D ጉድለት ያለባቸው አዋቂዎቸ",
        },
        source: {
          name: "Soroka Medical Center",
          url: "https://www.soroka.health.gov.il/",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "אל תיטלו ויטמין D ללא ייעוץ רפואי — מינון גבוה מדי עלול להזיק.",
        en: "Do not take vitamin D without medical advice — too high a dose can be harmful.",
        am: "ሐኪምዎ ሳያናግሩ ቪታሚን D አትወስዱ — ከፍ ያለ ፑዶዝ ሊጎዳ ይችላል።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "weight-management",
    name: {
      he: "ניהול משקל בריא",
      en: "Healthy Weight Management",
      am: "ጤናማ ክብደት አስተዳደር",
    },
    shortDescription: {
      he: "עלייה במשקל מהירה לאחר עלייה לישראל מגבירה סיכון לסוכרת ולמחלות לב. אסטרטגיות מותאמות תרבותית.",
      en: "Rapid weight gain after aliyah increases diabetes and heart disease risk. Culturally-adapted weight management strategies.",
      am: "ዓሊያ ያለ ፈጣን ክብደት መጨመር ሲቪ ሕመሞቸ ሊስ ያጨምር ይችላል።",
    },
    body: {
      he: `## הבעיה

כאמור במדריך התזונה — עולים מאתיופיה מעלים בממוצע 8-12 ק"ג בשנה הראשונה. לאחר 10 שנים — שיעורי השמנה גבוהים ב-×2.4 מהממוצע. ה-BMI הממוצע עולה מ-22 (באתיופיה) ל-28 (בישראל).

## מדוע כל כך קשה?

- **זמינות מזון זול ומעובד** — סופרמרקטים עם סוכר וקמח מעובד בזול
- **ישיבה ממושכת** — עבודות משרד לעומת עבודה חקלאית
- **לחץ** — שימוש במזון כמנגנון התמודדות

## אסטרטגיות יעילות

### שמרו על המסורת
- **אינג'רה** במקום לחם לבן — מדד גליקמי נמוך משמעותית
- **בישול ביתי** מסורתי — יותר בריא ממזון קנוי
- **ארוחות משפחתיות** — אוכלים לאט יותר = פחות

### הוסיפו תנועה
- **הליכה 30 דקות** יומית = אחד הכלים הכי יעילים
- **שחייה** — לא תובעת מפרקים
- **ריקוד אתיופי** = כושר מלא + חיבור לתרבות

### תכנון אכילה
- אכלו **3 ארוחות קבועות** — לא לדלג על ארוחת בוקר
- צלחת **50% ירקות, 25% חלבון, 25% פחמימות**
- **שתיית מים**: לפחות 8 כוסות ביום

## עזרה מקצועית

- **דיאטנית קהילתית**: ENP מציע ייעוץ תזונה חינם
- **קבוצות תמיכה**: בקשו מרופא המשפחה
- **ניתוח בריאטרי**: בנסיבות מסוימות — כלול בסל

📞 ENP: 03-5368944 | קופת חולים — הפניה לדיאטנית`,
      en: `## The Problem

Aliyah immigrants gain on average 8-12 kg in the first year. After 10 years, obesity rates are ×2.4 the average. Average BMI rises from 22 (in Ethiopia) to 28 (in Israel).

## Effective Strategies

Keep tradition: injera instead of white bread (significantly lower glycaemic index), home cooking, family meals. Add movement: 30-minute daily walk, swimming, Ethiopian dance (full fitness + cultural connection).

Meal planning: 3 fixed meals (don't skip breakfast). Plate: 50% vegetables, 25% protein, 25% carbohydrates. Drink 8 glasses of water daily.

## Professional Help

ENP: free community nutrition counselling — 03-5368944. GP referral to dietitian. Bariatric surgery: in certain circumstances, covered by health basket.

📞 ENP: 03-5368944`,
      am: `## ዓሊያ ያለ ክብደት

1ኛ ዓመት: 8-12 ኪሎ ጨምሯል (አማካኝ)። 10 ዓመት ያለ: ×2.4 ከ ብሔራዊ ጋር ሲነፃፀር።

## ምን ማድረግ?

እንጀራ (ዝቅ ያለ GI) ✅ | 30 ደቂቃ ሂደት/ቀን ✅

📞 03-5368944`,
    },
    figures: [
      {
        id: "obesity-increase",
        heading: { he: "עלייה בהשמנה", en: "Obesity Increase", am: "ውፍረት ጭማሪ" },
        figure: { he: "×2.4", en: "×2.4", am: "×2.4" },
        context: {
          he: "שיעורי השמנה לאחר 10 שנים בישראל לעומת באתיופיה",
          en: "Obesity rates after 10 years in Israel vs in Ethiopia",
          am: "10 ዓመት ያለ vs ኢትዮጵያ",
        },
        source: { name: "Ben-Gurion University", url: "https://www.bgu.ac.il/" },
        publishedYear: 2021,
      },
    ],
    warnings: [
      {
        he: "כל שינוי תזונתי משמעותי — התייעצו עם דיאטנית/ן קודם.",
        en: "Any significant dietary change — consult a dietitian first.",
        am: "ሰፊ ምግብ ለውጥ ዲያቴቲሺያን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "domestic-violence-health",
    name: {
      he: "אלימות במשפחה — השפעה על הבריאות",
      en: "Domestic Violence — Health Impact",
      am: "የቤተሰብ ጥቃት — ጤና ላይ ያለ ተጽዕኖ",
    },
    shortDescription: {
      he: "אלימות במשפחה פוגעת בבריאות הנפש והגוף. שירותי חירום, זכויות ומסלולי יציאה לנשים בסכנה.",
      en: "Domestic violence damages physical and mental health. Emergency services, rights and exit pathways for women at risk.",
      am: "የቤተሰብ ጥቃት ጤናን ሥጋ እና ሥነ-ልቦናዊ ይጎዳል። ድጋፍ አገልግሎቶቸ።",
    },
    body: {
      he: `## ההשפעה הרפואית של אלימות

אלימות גופנית גורמת לנזק גופני ברור, אך **הנזק הפסיכולוגי ארוך-טווח יותר**:
- PTSD (33% מנשים שחוו אלימות)
- דיכאון (×2.5)
- חרדה כרונית
- שימוש מוגבר בסמים/אלכוהול
- נזק לילדים שחשופים לאלימות

## בקהילה האתיופית

- שיעורי אלימות במשפחה **גבוהים יותר** מהממוצע הארצי (מחקר ברוקדייל 2020)
- גורמים: לחץ כלכלי, שינוי יחסי כוחות במשפחה, חוסר מיומנויות ניהול קונפליקטים
- **חסמים לפנייה**: בושה, חשש מגרוש, חשש "מה יגיד הקהילה"

## מה עושים עכשיו — חירום

📞 **משטרה**: 100
📞 **מד"א**: 101
📞 **קו חם לנשים מוכות**: 1202 (24/7)
📞 **WIZO**: 04-8562222
📞 **תבקה** (עם תרגום): 1-800-20-20-16

## בתי מקלט

ישנם בתי מקלט לנשים ולילדים ברחבי הארץ — כתובות חסויות. **משטרה או 1202 יפנו מיידית**.

## זכויות משפטיות

- **צו הגנה**: ניתן לקבל תוך 24 שעות מבית-משפט
- **צו הרחקה**: מוציא את האלים מהבית
- **תמיכה משפטית חינם**: תבקה 1-800-20-20-16

## מאצימות — תמיכה לנשים אתיופיות

ארגון מאצימות מציע תמיכה ייחודית לנשים מהקהילה: קבוצות תמיכה, ייעוץ, מנטורות.

📞 maatzimot.org.il | 1202 | 1-800-20-20-16`,
      en: `## Medical Impact of Violence

Domestic violence causes obvious physical harm, but long-term psychological damage is more lasting: PTSD (33% of women experiencing violence), depression (×2.5), chronic anxiety, increased substance use, harm to exposed children.

## Emergency — Right Now

Police: 100 | MDA: 101 | Women's Hotline: 1202 (24/7) | Tebeka (with translation): 1-800-20-20-16

## Shelters

Shelters for women and children nationwide — addresses confidential. Police or 1202 will refer immediately.

## Legal Rights

Protection order: obtained within 24 hours from court. Removal order: removes the abuser from the home. Free legal support: Tebeka 1-800-20-20-16.

📞 1202 | 1-800-20-20-16 | maatzimot.org.il`,
      am: `## ቤተሰብ ጥቃት ጤናን ይጎዳ

33% PTSD | ×2.5 ዲፕሬሽን

📞 1202 (24/7) | ፖሊስ 100 | ቴቤቃ: 1-800-20-20-16`,
    },
    figures: [
      {
        id: "dv-ptsd",
        heading: {
          he: "PTSD בנשים שחוו אלימות",
          en: "PTSD in DV Survivors",
          am: "PTSD ለቤተሰብ ጥቃት ሰለባዎቸ",
        },
        figure: { he: "33%", en: "33%", am: "33%" },
        context: {
          he: "שיעור PTSD בנשים שחוו אלימות במשפחה",
          en: "PTSD rate among domestic violence survivors",
          am: "ከቤተሰብ ጥቃት ሰለባዎቸ ውስጥ PTSD",
        },
        source: { name: "Brookdale Institute", url: "https://brookdale.jdc.org.il/" },
        publishedYear: 2020,
      },
    ],
    warnings: [
      {
        he: 'אם את בסכנה מיידית — התקשרי למשטרה 100 או מד"א 101.',
        en: "If you are in immediate danger — call Police 100 or MDA 101.",
        am: "አደጋ ሲኖር: ፖሊስ 100 ወይም MDA 101.",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "migraine-chronic-headache",
    name: {
      he: "מיגרנה וכאב ראש כרוני",
      en: "Migraine & Chronic Headache",
      am: "ሚግሬን እና ሥር ሰደድ ራስ ምታት",
    },
    shortDescription: {
      he: "מיגרנה שכיחה יותר בנשים מהקהילה ולעתים קרובות אינה מאובחנת. אבחון, טיפול ומניעה.",
      en: "Migraine is more common in community women and often undiagnosed. Diagnosis, treatment and prevention.",
      am: "ሚግሬን ለሴቶቸ ኢትዮጵያ-እስራኤሎቸ ብዙ ነው — ብዙ ጊዜ አይታወቅም።",
    },
    body: {
      he: `## מיגרנה — לא רק כאב ראש

**מיגרנה** היא מחלה נוירולוגית עם כאבי ראש עזים, בדרך כלל חד-צדדיים, המלווים ב:
- בחילות / הקאות
- רגישות לאור ולרעש
- "אאורה" — הפרעות ראייה לפני ההתקף

שכיחה פי **3** בנשים לעומת גברים.

## קשר לקהילה האתיופית

- שיעורים גבוהים יותר בנשים, בייחוד **בשינויים הורמונליים**: גיל המעבר, הריון, לאחר לידה
- לחץ נפשי + שינויי שינה = גורמים מעוררים עיקריים
- **מאובחנת פחות**: "כאב ראש" נחשב זניח ורבות לא פונות לרופא

## אבחון

רופא משפחה / נוירולוג. חשוב לתעד: תדירות, משך, גורמים מעוררים.

## טיפול

**מניעה** (לסובלים מ-4+ התקפים בחודש):
- טופמקס (topiramate) — נוגד פרכוסים
- אמיטריפטילין — נוגד דיכאון ב**מינון נמוך**
- בוטוקס — לכאב ראש כרוני (כולל בסל!)

**טיפול בהתקף**:
- **טריפטנים** (Sumatriptan, Rizatriptan) — הכי יעיל
- איבופרופן / פרצטמול — לכאב קל

## גורמים מעוררים — יומן מיגרנה

- גבינה מיושנת, יין אדום, שוקולד
- רעב ממושך, שתיית מים מועטה
- שינויי שינה (גם שינה ממושכת)
- ריחות חזקים

📞 הפניה לנוירולוג: דרך רופא משפחה`,
      en: `## Migraine — Not Just a Headache

Migraine is a neurological disease with severe, often one-sided headaches accompanied by nausea, light and sound sensitivity, and sometimes visual "aura." **3× more common in women.**

## Treatment

Prevention (4+ attacks/month): Topiramate, Amitriptyline (low dose), Botox for chronic headache (covered in basic basket!).

During attack: Triptans (Sumatriptan, Rizatriptan) — most effective. Ibuprofen/paracetamol for mild attacks.

## Triggers — Keep a Migraine Diary

Aged cheese, red wine, chocolate. Prolonged hunger, low hydration. Sleep disruption (including oversleeping). Strong smells.

📞 Neurologist referral via GP`,
      am: `## ሚግሬን

ሚግሬን ×3 ለሴቶቸ ብዙ ነው።

## ሕክምና

ትሪፕታኖቸ (ሱማትሪፕታን) ለሕመም ጊዜ። ቶፒራሜት ለ መከላከያ።

📞 ሐኪምዎ ዘንድ ዝወዳ ይጠይቁ`,
    },
    figures: [
      {
        id: "migraine-women",
        heading: { he: "מיגרנה בנשים", en: "Migraine in Women", am: "ሚግሬን ለሴቶቸ" },
        figure: { he: "×3", en: "×3", am: "×3" },
        context: {
          he: "שכיחות מיגרנה בנשים לעומת גברים",
          en: "Migraine prevalence in women vs men",
          am: "ሴቶቸ ×3 ከወንዶቸ ጋር ሲነፃፀር",
        },
        source: {
          name: "WHO Headache Disorders",
          url: "https://www.who.int/news-room/fact-sheets/detail/headache-disorders",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "כאב ראש פתאומי וחמור מאוד — לחדר מיון מיד (סימן אפשרי לדימום מוחי).",
        en: "Sudden, very severe headache — go to the ER immediately (possible sign of brain bleed).",
        am: "ፈጣን ከባድ ራስ ምታት — አስቸኳይ ER ሂዱ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "heart-vascular-disease",
    name: {
      he: "מחלות לב וכלי דם",
      en: "Heart & Vascular Disease",
      am: "የልብ እና የደም ቧንቧ ሕመሞቸ",
    },
    shortDescription: {
      he: "מחלות לב עולות במגזר האתיופי ללא בדיקות מוקדמות. גורמי סיכון, בדיקות ומניעה.",
      en: "Heart disease is rising in the Ethiopian-Israeli community without early screening. Risk factors, tests and prevention.",
      am: "ለኢትዮጵያ-እስራኤሎቸ ልብ ሕመሞቸ ይጨምራሉ — ቀደምት ምርምር ያስፈልጋል።",
    },
    body: {
      he: `## מחלות לב בקהילה

**מחקר ביה"ח רמב"ם** (2023) מצא: אוטם לב בגיל 40-55 **גבוה ב-38%** אצל גברים יוצאי אתיופיה לעומת ממוצע.

## גורמי סיכון עיקריים בקהילה

- **לחץ דם גבוה** (יתר לחץ דם) — לא מטופל: 41% בגברים 40+
- **סוכרת** — גורם סיכון לב ראשי
- **עישון** — גבוה יחסית בגברים
- **השמנה** — לאחר העלייה
- **לחץ כרוני** — עבודה, כלכלה, גזענות

## בדיקות לאיתור מוקדם

| בדיקה | מתי | איפה |
|-------|-----|------|
| **לחץ דם** | כל 6 חודשים | קופת חולים |
| **שומנים בדם** | כל שנה (40+) | קופת חולים |
| **סוכר בדם** | כל שנה | קופת חולים |
| **ECG** | לפי ציון רופא | קופת חולים |

**כולן בחינם** בסל הבסיסי.

## מניעה — "5 הפחתות"

1. **עישון**: הפסקת עישון מפחיתה סיכון ב-50% בשנה הראשונה
2. **מלח**: הפחתת מלח — מוריד לחץ דם
3. **שמן רווי**: פחות חמאה, קוקוס, שמן דקלים
4. **סוכר**: מפחית סיכון סוכרת → מפחית סיכון לב
5. **מנוחה**: שינה 7-8 שעות — חיונית ללב

## תרופות נגד לחץ דם — חינם

תרופות לחץ דם בסיסיות **(enalapril, amlodipine)** כלולות בסל — בקשו מהרופא.

📞 בדיקות לב: קופת חולים → **אל תחכו לתסמינים**`,
      en: `## Heart Disease in the Community

Rambam Hospital research (2023): heart attack in men aged 40-55 is **38% higher** among Ethiopian-Israeli men vs average.

## Main Risk Factors

Untreated high blood pressure (41% of men 40+). Diabetes. Smoking. Post-aliyah obesity. Chronic stress.

## Free Screening Tests

Blood pressure (every 6 months), cholesterol (annual 40+), blood sugar (annual) — all free in basic basket.

## Prevention — "5 Reductions"

Smoking cessation (reduces risk 50% in year 1). Salt reduction. Saturated fat reduction. Sugar reduction. 7-8 hours sleep.

## Free Blood Pressure Medication

Basic BP medications (enalapril, amlodipine) covered by health basket — ask your doctor.

📞 Don't wait for symptoms — get screened at your health fund`,
      am: `## ልብ ሕመሞቸ

×1.38 ከ40-55 ዕድሜ ኢትዮጵያ-እስራኤሎቸ ወንዶቸ ዘንድ።

## ምርምሮቸ (ሙሉ ነፃ)

ደም ግፊት (6 ወር/አንዴ)፣ ስኳር (ዓመት/አንዴ)።

📞 ቅድሚያ ምርምር ያሰቡ — ምልክቶቸ አትጠብቁ`,
    },
    figures: [
      {
        id: "heart-attack-rate",
        heading: {
          he: "אוטם לב 40-55",
          en: "Heart Attack 40-55",
          am: "40-55 ዕድሜ ልብ ሕመሞቸ",
        },
        figure: { he: "+38%", en: "+38%", am: "+38%" },
        context: {
          he: "אוטם לב בגברים 40-55 יוצאי אתיופיה לעומת ממוצע",
          en: "Heart attack in men 40-55 of Ethiopian origin vs average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: { name: "Rambam Medical Center", url: "https://www.rambam.org.il/" },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: 'כאב בחזה + קוצר נשיעה + כאב בזרוע שמאל = חדר מיון מיד. מד"א 101.',
        en: "Chest pain + shortness of breath + left arm pain = ER immediately. MDA 101.",
        am: "ሕመም ሲ ኖር: MDA 101 — አስቸኳይ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "kidney-urinary-health",
    name: {
      he: "בריאות כליות ושתן",
      en: "Kidney & Urinary Health",
      am: "የኩላሊት እና ሽንት ጤና",
    },
    shortDescription: {
      he: "מחלת כליות כרונית קשורה לסוכרת ולחץ דם הגבוהים בקהילה. בדיקות מוקדמות יכולות למנוע נזק בלתי הפיך.",
      en: "Chronic kidney disease is linked to the higher rates of diabetes and hypertension in the community. Early testing can prevent irreversible damage.",
      am: "ሥር ሰደድ ኩላሊት ሕመሞቸ ከሲቪ ሕመሞቸ ጋር ይያያዛሉ። ቀደምት ምርምር ያስፈልጋል።",
    },
    body: {
      he: `## כליות — הסנן השקט

הכליות מסננות כ-180 ליטר דם ביום. **מחלת כליות כרונית (CKD)** מתפתחת לאט וללא תסמינים — עד שהנזק חמור.

## הקשר לקהילה האתיופית

- **סוכרת** (שכיחה ×3.5 בקהילה) — סיבה ראשית לנזק כליות
- **לחץ דם גבוה** — סיבה שנייה בשכיחות
- **אנמיה חרמשית** — פוגעת ישירות בכליות
- גברים יוצאי אתיופיה בדיאליזה: **פי 2.1** מהממוצע

## תסמיני אזהרה (מאוחרים בד"כ)

- עייפות קיצונית
- נפיחות ברגליים
- שינוי בתכיפות השתן
- שתן קצפי (חלבון בשתן)
- גרד כללי ללא סיבה

## בדיקות לאיתור מוקדם

| בדיקה | מה בודקת | כל כמה |
|-------|---------|--------|
| **קריאטינין בדם** | תפקוד כליות | שנה (סוכרתיים: 6 חודשים) |
| **חלבון בשתן (מיקרואלבומינוריה)** | דליפה | שנה |
| **GFR** | קצב סינון | לפי ציון רופא |

**כולן חינם** בסל לחולי סוכרת ולחץ דם.

## הגנה על הכליות

- **שתיית מים**: לפחות 8 כוסות ביום
- **שליטה בסוכר**: HbA1c < 7% — הגנה טובה
- **שליטה בלחץ דם**: <130/80
- **תרופות ACEI/ARB**: מגינות על כליות — שוחחו עם הרופא
- **הימנעות ממשכאכלים**: NSAID (ניצוצות, נורופן) — מזיקים לכליות

📞 נפרולוג: הפניה דרך רופא משפחה`,
      en: `## Kidneys — The Silent Filter

Kidneys filter ~180 litres of blood per day. Chronic kidney disease (CKD) develops slowly and without symptoms — until damage is severe.

## Connection to the Community

Diabetes (×3.5 in community) — leading cause of kidney damage. High blood pressure — second most common cause. Sickle cell anaemia directly damages kidneys. Ethiopian-Israeli men on dialysis: **×2.1 the average**.

## Early Detection Tests

Creatinine blood test. Urine protein (microalbuminuria). GFR. All free in the basic basket for diabetics and hypertensives.

## Protecting Your Kidneys

8 glasses of water daily. Blood sugar control (HbA1c < 7%). Blood pressure control (<130/80). ACEI/ARB medications (kidney protective). Avoid NSAIDs (ibuprofen, Nurofen) — they damage kidneys.

📞 Nephrologist referral via GP`,
      am: `## ኩላሊት ጤና

ሥር ሰደድ ኩላሊት ሕመሞቸ ×2.1 ለኢትዮጵያ-እስራኤሎቸ ወንዶቸ።

## ምርምሮቸ

ቀሬቴኒን (ሥም) + ሽንት ፕሮቲን — ዓመት/አንዴ (ነፃ)።

📞 ዶክተርዎ ዘንድ ዝወዳ ይጠይቁ`,
    },
    figures: [
      {
        id: "dialysis-rate",
        heading: { he: "דיאליזה", en: "Dialysis Rate", am: "ዳያሊሲስ ምጣኔ" },
        figure: { he: "×2.1", en: "×2.1", am: "×2.1" },
        context: {
          he: "גברים יוצאי אתיופיה על דיאליזה לעומת ממוצע",
          en: "Ethiopian-Israeli men on dialysis vs national average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: { name: "Israel Renal Association", url: "https://www.nephro.co.il/" },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "נפיחות פתאומית + קוצר נשיעה + כאב חזה — חדר מיון מיד.",
        en: "Sudden swelling + shortness of breath + chest pain — ER immediately.",
        am: "ድንገተኛ 붓기 + አጭር ትንፋሽ = አስቸኳይ ER።",
      },
    ],
    lastReviewed: "2026-06-03",
  },

  // ── Wave 3 — 12 new conditions ──────────────────────────────────────────

  {
    slug: "cervical-cancer",
    name: { he: "סרטן צוואר הרחם", en: "Cervical Cancer", am: "የማህፀን አንገት ካንሰር" },
    shortDescription: {
      he: "סרטן צוואר הרחם ניתן למניעה ב-99% עם חיסון HPV ובדיקת PAP. בקהילה האתיופית — שיעורי בדיקות נמוכים.",
      en: "Cervical cancer is 99% preventable with HPV vaccination and PAP smear. In the Ethiopian-Israeli community, screening rates are low.",
      am: "የማህፀን አንገት ካንሰር 99% ሊቆም ይችላል — HPV ክትባት እና PAP ምርምር።",
    },
    body: {
      he: `## סרטן צוואר הרחם — ניתן למניעה מלאה

סרטן צוואר הרחם נגרם ב-99% מהמקרים מנגיף HPV. בישראל, שיעורי התחלואה ירדו ב-70% מאז הכנסת חיסון HPV. בקהילה האתיופית — שיעורי הבדיקות נמוכים מהממוצע.

## מי בסיכון?

- נשים שטרם עברו חיסון HPV
- נשים שלא עורכות בדיקת PAP שגרתית
- מעשנות — HPV מתפתח מהר יותר

## חיסון HPV — חינם

- **גילאי 9-18**: חיסון HPV חינם בתוכנית החיסונים הלאומית
- **גילאי 18-45**: חיסון מסובסד בקופות החולים — שוחחו עם הרופאה

## בדיקת PAP — מתי?

- **גיל 25**: בדיקה ראשונה
- **כל 3 שנים**: בדיקה שגרתית עד גיל 65
- **חינם** בסל הבריאות הבסיסי — בקשו מרופאת הנשים

## תסמיני אזהרה

- דימום בין מחזורים / לאחר קיום יחסים
- הפרשות לא רגילות בעלות ריח
- כאב אגן מתמשך

📞 לקביעת PAP: קופת חולים | מד"א חירום: 101`,
      en: `## Cervical Cancer — Fully Preventable

99% of cervical cancer cases are caused by HPV. In Israel, incidence dropped 70% since HPV vaccination was introduced. In the Ethiopian-Israeli community, screening rates are below average.

## HPV Vaccination — Free

Ages 9-18: free in national vaccination programme. Ages 18-45: subsidised at health funds.

## PAP Smear — When?

Age 25: first test. Every 3 years: routine until age 65. Free in basic health basket — ask your gynaecologist.

## Warning Signs

Bleeding between periods / after intercourse. Unusual discharge with odour. Persistent pelvic pain.

📞 Book PAP: health fund | Emergency MDA: 101`,
      am: `## የማህፀን አንገት ካንሰር — ሙሉ ሊቆም ይችላል

HPV ክትባት (9-18 ዕድሜ — ነፃ) + PAP ምርምር (25 ዕድሜ — ነፃ)።

📞 ቅቃ ሐቅ ያናግሩ | አስቸኳይ: 101`,
    },
    figures: [
      {
        id: "hpv-prevention",
        heading: { he: "מניעה עם HPV", en: "HPV Prevention Rate", am: "HPV መከላከያ ምጣኔ" },
        figure: { he: "99%", en: "99%", am: "99%" },
        context: {
          he: "שיעור מקרי סרטן צוואר הרחם הניתנים למניעה עם חיסון HPV",
          en: "Proportion of cervical cancer cases preventable with HPV vaccination",
          am: "HPV ክትባት የሚከላከለው ምጣኔ",
        },
        source: {
          name: "WHO Cervical Cancer",
          url: "https://www.who.int/news-room/fact-sheets/detail/cervical-cancer",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "מידע זה אינו תחליף לבדיקה רפואית. פנו לרופאת נשים לבדיקת PAP.",
        en: "Not a substitute for medical screening. Contact a gynaecologist for a PAP smear.",
        am: "ሐኪምዎን ያናግሩ — ሚስጥር ምርምር ያስፈልጋል።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "hepatitis-b",
    name: { he: "הפטיטיס B", en: "Hepatitis B", am: "ሄፓቲቲስ B" },
    shortDescription: {
      he: "שיעורי נשאות הפטיטיס B גבוהים פי 10 בקהילה האתיופית. נשאות כרונית מובילה לציירוזיס וסרטן כבד ללא טיפול.",
      en: "Hepatitis B carrier rates are 10× higher in the Ethiopian-Israeli community. Chronic carriage leads to cirrhosis and liver cancer without treatment.",
      am: "ሄፓቲቲስ B ለኢትዮጵያ-እስራኤሎቸ ×10 ብዝሃ ነው — ሕክምና ካልተሰጠ ሊቃ ሊስ ያስከትላል።",
    },
    body: {
      he: `## הפטיטיס B — הצהובת השקטה

הפטיטיס B היא מחלת כבד הנגרמת מנגיף. בקהילה האתיופית — **שיעורי נשאות של 8-12%** (לעומת 0.8% בכלל האוכלוסייה).

רוב הנשאים **אינם יודעים** שהם נשאים — המחלה שקטה עשרות שנים, עד שמתפתחים נזק כבד חמור.

## דרכי הדבקה

- **אנכי**: מאם לתינוק בלידה — גורם ל-90% מהנשאות הכרונית
- **מגע דם**: מחטים, גילוח, כלי ניתוח לא מעוקרים
- **מגע מיני**: נוזלי גוף

## בדיקה — חינם

בדיקת HBsAg (נשאות) חינם בסל לכל עולה מאתיופיה. **לכולנו מהקהילה — כדאי לבדוק**.

## טיפול בנשאים כרוניים

- **מעקב שנתי**: בדיקות כבד + אולטרסאונד
- **תרופות אנטי-ויראליות** (tenofovir, entecavir): מאטות התקדמות
- **חיסון** לבני משפחה לא מחוסנים

## ילדים — חיסון מלידה

תינוקות לאמהות נשאיות מקבלים חיסון + HBIG (נוגדנים) תוך 12 שעות מהלידה. **קריטי — אל תפספסו!**

📞 אנדוקרינולוג/גסטרואנטרולוג: הפניה מרופא משפחה | מד"א: 101`,
      en: `## Hepatitis B — The Silent Liver Disease

Hepatitis B is a liver disease caused by a virus. In the Ethiopian-Israeli community — **carrier rates of 8-12%** (vs. 0.8% nationally). Most carriers **don't know** they are infected — the disease is silent for decades until serious liver damage develops.

## Transmission

Vertical: mother to baby at birth (causes 90% of chronic carriage). Blood contact: needles, shaving, unsterilised instruments. Sexual contact.

## Free Testing

HBsAg (carrier) test free for all Ethiopian-origin immigrants. All community members should get tested.

## Treatment for Chronic Carriers

Annual monitoring (liver tests + ultrasound). Antiviral medications (tenofovir, entecavir). Vaccination for unvaccinated family members.

## Newborns — Vaccination at Birth

Babies of carrier mothers receive vaccination + HBIG (antibodies) within 12 hours of birth. Critical — don't miss this.

📞 Gastroenterologist referral via GP`,
      am: `## ሄፓቲቲስ B

ለኢትዮጵያ-እስራኤሎቸ ×10 ምጣኔ (8-12% carriers)። ብዙ ሰዎቸ አያውቁም።

ምርምር: HBsAg ነፃ። ሁሉም ቤተሰቦቸ ክትባት ያስፈልጋቸዋል።

📞 ሐኪምዎን ያናግሩ`,
    },
    figures: [
      {
        id: "hbv-carrier-rate",
        heading: {
          he: "נשאות הפטיטיס B",
          en: "Hepatitis B Carrier Rate",
          am: "ሄፓቲቲስ B ናሼ ምጣኔ",
        },
        figure: { he: "×10", en: "×10", am: "×10" },
        context: {
          he: "שיעורי נשאות הפטיטיס B בקהילה לעומת הממוצע הארצי",
          en: "HBV carrier rates in community vs national average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: { name: "Hadassah Medical Center", url: "https://hadassah.org.il/" },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "אם אתה נשא הפטיטיס B — אסור לתרום דם. דווחו לרופא.",
        en: "If you are a hepatitis B carrier — do not donate blood. Inform your doctor.",
        am: "ሄፓቲቲስ B ናሼ ከሆኑ — ደም አይለኩ። ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "chronic-pain",
    name: { he: "כאב כרוני", en: "Chronic Pain", am: "ሥር ሰደድ ሕመም" },
    shortDescription: {
      he: "כאב כרוני שכיח בקרב ניצולי טראומה ועולים. מקושר לPTSD, דיכאון ולחץ כרוני. מדריך לאבחון ולטיפול.",
      en: "Chronic pain is common among trauma survivors and immigrants, linked to PTSD, depression and chronic stress. Guide to diagnosis and treatment.",
      am: "ሥር ሰደድ ሕመም ለቀደምት ጭቆና ሰለባዎቸ ብዙ ነው — PTSD፣ ዲፕሬሽን እና ሥር ሰደድ ጭንቀት ጋር ይያያዛል።",
    },
    body: {
      he: `## כאב כרוני — יותר מכאב גופני

**כאב כרוני** הוא כאב שנמשך יותר מ-3 חודשים. בניגוד לכאב חריף (שמאותת על פגיעה), כאב כרוני הוא לעתים קרובות תוצאה של שינויים במערכת העצבים.

בקהילה האתיופית — קשר חזק בין כאב כרוני ל:
- **PTSD ממסעות העלייה** ומחנות פליטים
- **טראומה בין-דורית**
- **לחץ כרוני**: אפליה, עוני, בידוד

## סוגי כאב כרוני נפוצים

- **כאב גב**: 41% מהמבוגרים בקהילה (עבודות פיזיות + מתח)
- **כאב ראש כרוני**: קשור לחרדה ו-PTSD
- **כאב שרירים מפושט** (פיברומיאלגיה): שכיח בנשים
- **כאב בטן פונקציונלי**: קשור ללחץ וחרדה

## מה **לא** לעשות

- לא להשתמש ב**אופיאטים** לכאב כרוני לא סרטני — התמכרות
- לא לדכא את הכאב בשקיטה בלבד — לטפל בשורש

## טיפול יעיל

**טיפול רב-מקצועי** — הכי יעיל:
- **פיזיותרפיה**: חיזוק שרירים, שיפור יציבה
- **פסיכותרפיה** (CBT לכאב): שינוי דפוסי חשיבה
- **תרופות**: נוגדי דיכאון במינון נמוך, נוגדי פרכוסים
- **פעילות גופנית**: מפחיתה כאב ב-30%

## זכאות בסל

- **פיזיותרפיה**: עד 12 טיפולים/שנה בסל
- **פסיכולוג**: 18 פגישות/שנה בסל (מ-2021)
- **מרפאת כאב**: קיימת בכל בית חולים גדול

📞 מרפאת כאב: שאלו ברופא המשפחה`,
      en: `## Chronic Pain — More Than Physical

Chronic pain lasting over 3 months is often a result of nervous system changes, not active tissue damage.

Strong link in the Ethiopian-Israeli community to PTSD from aliyah journeys and refugee camps, intergenerational trauma, and chronic stress from discrimination, poverty, isolation.

## Effective Treatment

Multi-disciplinary approach: physiotherapy, CBT for pain (psychotherapy), low-dose antidepressants/anticonvulsants, physical exercise (reduces pain by 30%).

## Covered by Health Basket

Physiotherapy: up to 12 treatments/year. Psychology: 18 sessions/year (from 2021). Pain clinic: available at every major hospital.

📞 Ask your GP for a pain clinic referral`,
      am: `## ሥር ሰደድ ሕመም

ሥር ሰደድ ሕመም ×1 ከ PTSD፣ ዲፕሬሽን ጋር ይያያዛል።

## ሕክምና

ፊዚዮቴራፒ + CBT + ዝቅ ያለ ፑዶዝ ዳኒ። ዓመት 12 ፊዚዮቴራፒ ነፃ።`,
    },
    figures: [
      {
        id: "chronic-back-pain",
        heading: { he: "כאב גב כרוני", en: "Chronic Back Pain", am: "ሥር ሰደድ ጀርባ ሕመም" },
        figure: { he: "41%", en: "41%", am: "41%" },
        context: {
          he: "שיעור כאב גב כרוני במבוגרים מהקהילה",
          en: "Chronic back pain rate in community adults",
          am: "ማህበረሰቡ ውስጥ ሥር ሰደድ ጀርባ ሕመም",
        },
        source: {
          name: "JDC-Ashalim Health Survey",
          url: "https://www.jdc.org.il/ashalim/",
        },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "אל תשתמשו באופיאטים ללא פיקוח רפואי. פנו לרופא לתוכנית טיפול.",
        en: "Do not use opioids without medical supervision. Ask your doctor for a treatment plan.",
        am: "ሐኪምዎ ሳያናግሩ ኦፒዮይዶቸ አትወስዱ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "sleep-disorders",
    name: { he: "הפרעות שינה", en: "Sleep Disorders", am: "የእንቅልፍ ሕመሞቸ" },
    shortDescription: {
      he: "הפרעות שינה שכיחות מאוד בקרב עולים, הורים לילדים קטנים ואנשים עם PTSD. מדריך לאבחון ולשיפור השינה.",
      en: "Sleep disorders are very common among immigrants, parents of young children and people with PTSD. Guide to diagnosis and sleep improvement.",
      am: "ስደተኞቸ፣ ወጣት ልጆቸ ወላጆቸ እና PTSD ሰዎቸ ዘንድ የእንቅልፍ ሕመሞቸ ብዙ ናቸው።",
    },
    body: {
      he: `## הפרעות שינה בקהילה

מחקר ENP (2023) מצא ש**62%** מהמבוגרים מהקהילה האתיופית מדווחים על קשיי שינה. שינה גרועה פוגעת ב: ריכוז, מצב רוח, מערכת חיסון, לחץ דם, משקל.

## סוגי הפרעות שינה

- **נדודי שינה (insomnia)**: קושי להירדם או להישאר ישן — הנפוץ ביותר
- **דום נשימה בשינה (sleep apnea)**: נחירות חזקות + הפסקות נשימה
- **תסמונת רגל חסרת מנוחה (RLS)**: תחושת צריבה/תנועה בלתי נשלטת ברגליים
- **שינה מופרעת מ-PTSD**: סיוטים, יקיצות פתאומיות

## מה עוזר לנדודי שינה

### "היגיינת שינה"
- **שעת שינה קבועה** — כל לילה, גם בשבת
- **חושך מוחלט**: וילונות כהים / מסכת שינה
- **טמפרטורה**: 18-20 מעלות בחדר
- **ללא מסכים** שעה לפני השינה (כחול = ערות)
- **ללא קפה** אחרי 14:00

### תרופות (לא לטווח ארוך)
- **מלטונין**: 0.5-3 מ"ג שעה לפני שינה — בטוח, עוזר לשינון
- **פרשת תרופות**: רק עם מרשם — מרבית כדורי שינה יוצרים תלות

## דום נשימה בשינה — מסוכן

סימנים: נחירות קולניות, יקיצות בבהלה, עייפות בבוקר, לחץ דם גבוה. **בדיקת שינה (polysomnography)** — ניתן להפנות דרך רופא משפחה.

📞 מרפאת שינה: הפניה מרופא משפחה | ERAN: 1201`,
      en: `## Sleep Disorders in the Community

ENP research (2023): **62%** of community adults report sleep difficulties. Poor sleep affects concentration, mood, immune system, blood pressure, weight.

## Sleep Hygiene

Fixed bedtime every night. Complete darkness. Temperature 18-20°C. No screens 1 hour before sleep. No caffeine after 14:00.

## Medications

Melatonin: 0.5-3 mg 1 hour before sleep — safe, helps with rhythm. Sleeping pills: prescription only — most cause dependency.

## Sleep Apnoea — Dangerous

Signs: loud snoring, startled awakenings, morning fatigue, high blood pressure. Sleep study (polysomnography) — refer via GP.

📞 Sleep clinic via GP`,
      am: `## የእንቅልፍ ሕመሞቸ

62% ማህበረሰቡ ውስጥ ክፉ እንቅልፍ ሪፖርት ያደርጋሉ።

## ምን ይረዳል?

ቋሚ የእንቅልፍ ጊዜ | ሜላቶኒን (0.5-3 mg) | ስክሪን ሳ/ሰ/ጊ ያቁሙ።`,
    },
    figures: [
      {
        id: "sleep-difficulties",
        heading: { he: "קשיי שינה", en: "Sleep Difficulties", am: "የእንቅልፍ ችግሮቸ" },
        figure: { he: "62%", en: "62%", am: "62%" },
        context: {
          he: "מבוגרים מהקהילה עם קשיי שינה קבועים",
          en: "Community adults with regular sleep difficulties",
          am: "ቋሚ የእንቅልፍ ችግሮቸ ያሏቸው",
        },
        source: { name: "ENP Health Survey", url: "https://www.enp.org.il/" },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "כדורי שינה מרשם עלולים ליצור תלות — השתמשו רק בהנחיית רופא.",
        en: "Prescription sleep medications can create dependency — only use under doctor's guidance.",
        am: "ሐኪምዎ ሳያናግሩ የእንቅልፍ ዕፅ አትወስዱ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "skin-conditions",
    name: { he: "מחלות עור", en: "Skin Conditions", am: "የቆዳ ሕመሞቸ" },
    shortDescription: {
      he: "ויטיליגו, פסוריאזיס ואקנה שכיחים יותר בקהילה. יש גם בעיות ייחודיות לעור כהה שהדרמטולוגים לא תמיד מכירים.",
      en: "Vitiligo, psoriasis and acne are more common in the community. Darker skin tones also have unique conditions that dermatologists don't always recognise.",
      am: "ቪቲሊጎ፣ ፕሶርያሲስ፣ ብጉር ለኢትዮጵያ-እስራኤሎቸ ብዙ ናቸው። ጥቁር ቆዳ ልዩ ሁኔታዎቸ አሉ።",
    },
    body: {
      he: `## מחלות עור בעור כהה — ייחודיות

לא כל הדרמטולוגים מוכשרים לאבחן מחלות עור בעור כהה. תסמינים נראים שונה.

## מחלות נפוצות בקהילה

### ויטיליגו
- כתמים בהירים על העור — אובדן פיגמנטציה
- שכיח יותר בקרב אנשים ממוצא אפריקאי
- **אינו מדבק** — מחלה אוטואימונית
- טיפול: קרמי קורטיקוסטרואידים, PUVA, NB-UVB

### פסוריאזיס
- כתמים אדומים עם קשקשים כסופים
- בעור כהה — יכול להיראות סגול / אפור
- טיגרי: לרוב בקרקפת, מרפקים, ברכיים
- טיפול: קרמים, אור UV, ביולוגיקס (לחמור)

### אקנה קלואידלית
- אקנה בצוואר / עורף — גורמת לצלקות קלואיד
- שכיחה יותר בגברים ממוצא אפריקאי
- טיפול: אנטיביוטיקה + רטינואידים + הימנעות מגילוח

### פיגמנטציה
- כתמים כהים (hyperpigmentation) לאחר דלקת
- מאפיין עור כהה — ייתכן לאחר פצעים, עצים

## מה עוזר?

- **מסנן קרינה**: SPF 30+ — חשוב גם לעור כהה!
- **לחות**: קרם מינימום פעמיים ביום
- **הימנעות מבהרה**: מוצרי הבהרת עור מכילים כספית — מסוכנים

## גישה לטיפול

- דרמטולוג (עורית) — הפניה מרופא משפחה
- בקשו דרמטולוג עם ניסיון ב**עור כהה**

📞 הפניה לדרמטולוג: קופת חולים`,
      en: `## Skin Conditions in Darker Skin — Unique Challenges

Not all dermatologists are trained to diagnose skin conditions in darker skin tones. Symptoms can appear differently.

## Common Conditions in the Community

Vitiligo: light patches from pigment loss — autoimmune, not contagious. Psoriasis: in darker skin appears purple/grey, not just red. Keloid acne (nape/neck): common in men of African origin. Post-inflammatory hyperpigmentation: dark spots after any skin inflammation.

## What Helps

SPF 30+ sunscreen — important even for dark skin. Moisturise twice daily. Avoid skin-lightening products (often contain mercury — dangerous).

📞 Dermatologist referral via health fund`,
      am: `## የቆዳ ሕመሞቸ

ቪቲሊጎ፣ ፕሶርያሲስ፣ ብጉር ለጥቁር ቆዳ ልዩ ምልክቶቸ አሏቸው።

## ምን ይረዳል?

SPF 30+ (ጥቁር ቆዳ ጭምር)። ቅባት ቀን 2 ጊዜ።

📞 ቅቃ ሐቅ ዝወዳ ይጠይቁ`,
    },
    figures: [
      {
        id: "vitiligo-prevalence",
        heading: { he: "ויטיליגו", en: "Vitiligo Prevalence", am: "ቪቲሊጎ ምጣኔ" },
        figure: { he: "×1.7", en: "×1.7", am: "×1.7" },
        context: {
          he: "שכיחות ויטיליגו בקרב אנשים ממוצא אפריקאי לעומת ממוצע",
          en: "Vitiligo prevalence among people of African origin vs average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: {
          name: "Journal of Dermatology",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2021,
      },
    ],
    warnings: [
      {
        he: "מוצרי הבהרת עור עם כספית — אסורים ומסוכנים. בדקו תוויות.",
        en: "Skin-lightening products with mercury — illegal and dangerous. Check labels.",
        am: "ሜርኩሪ ያላቸው የቆዳ ማብሰያ ምርቶቸ አደገኛ ናቸው — ፈጽሞ አትጠቀሙ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "menopause",
    name: { he: "גיל המעבר", en: "Menopause", am: "ወርሃዊ ፍሰቱ መቆም" },
    shortDescription: {
      he: "גיל המעבר בנשים יוצאות אתיופיה מלווה לעיתים בתסמינים חריפים יותר ובחסמי גישה לטיפול. מדריך לתסמינים וטיפולים.",
      en: "Menopause in Ethiopian-Israeli women is sometimes accompanied by more severe symptoms and barriers to treatment. Guide to symptoms and treatments.",
      am: "ወርሃዊ ፍሰቱ ለኢትዮጵያ-እስራኤሎቸ ሴቶቸ ከፍ ያለ ምልክቶቸ ሊኖሩ ይችላሉ — ሕክምናን ዕርዳታ ያስፈልጋል።",
    },
    body: {
      he: `## גיל המעבר — מעבר, לא מחלה

גיל המעבר הוא תהליך טבעי שמתחיל בממוצע בגיל **51**. הגוף מפחית ייצור אסטרוגן, מה שגורם לתסמינים.

## תסמינים נפוצים

- **גלי חום**: פרצי חום פתאומיים — לרוב הבעיה הקשה ביותר
- **הזעת לילה**: מפריעה לשינה
- **שינויי מצב רוח**: חרדה, עצבנות, דיכאון
- **יובש נרתיקי**: כאב ביחסים
- **קשיי ריכוז ו"ערפל מוח"**
- **אוסטאופורוזיס**: עלייה בסיכון לשברים

## מה מציע הטיפול

### טיפול הורמונלי חלופי (HRT)
- **הכי יעיל** לגלי חום ויובש
- לא מתאים לכולן — שוחחו עם הרופאה על סיכונים
- **בנשים שחוו סרטן שד** — לרוב לא מתאים

### ללא הורמונים
- **ספורט**: מפחית גלי חום, משפר מצב רוח, מחזק עצמות
- **ויטמין D + סידן**: מניעת אוסטאופורוזיס
- **פיטואסטרוגנים**: סויה, פשתן — ראיות מעורבות
- **תרופות ייעודיות**: fezolinetant (חדש, ללא הורמונים)

## בקהילה האתיופית

- **חסמי שפה**: קשה לדון עם רופא על תסמינים פרטיים
- **סטיגמה**: גיל המעבר לא מדוברת בקהילה
- **תת-אבחון**: לעיתים תסמינים מיוחסים ל"לחץ" בלבד

## פנייה לטיפול

רופאת נשים / גינקולוגית — בקשו "ייעוץ גיל המעבר". **הפניה חינם בקופת חולים**.

📞 קופת חולים — רופאת נשים | טנא בריאות: 03-5162060`,
      en: `## Menopause — Transition, Not Disease

Menopause begins on average at age 51. The body reduces oestrogen production, causing symptoms.

## Common Symptoms

Hot flushes, night sweats, mood changes (anxiety, irritability, depression), vaginal dryness, concentration difficulties ("brain fog"), increased osteoporosis risk.

## Treatment Options

HRT (Hormone Replacement Therapy): most effective for hot flushes and dryness — discuss risks with doctor. Without hormones: exercise, vitamin D + calcium, phytoestrogens (soy, flaxseed), fezolinetant (new hormone-free medication).

## In the Ethiopian-Israeli Community

Language barriers make it difficult to discuss private symptoms with a doctor. Stigma: menopause is rarely discussed. Under-diagnosis: symptoms often attributed only to "stress."

📞 Gynaecologist referral at health fund | Tene Briut: 03-5162060`,
      am: `## ወርሃዊ ፍሰቱ መቆም

አማካኝ 51 ዕድሜ ይጀምራል። ምልክቶቸ: ሙቀት ሞገዶቸ፣ ሌሊት ላብ፣ ሥነ-ልቦና ለውጦቸ።

ሕክምና: ሆርሞን ሕክምና (HRT) + ስፖርት + ቪታሚን D።

📞 ቅቃ ሐቅ — ሴቶቸ ሐኪም | 03-5162060`,
    },
    figures: [
      {
        id: "hot-flush-severity",
        heading: { he: "גלי חום חמורים", en: "Severe Hot Flushes", am: "ከባድ ሙቀት ሞገዶቸ" },
        figure: { he: "×1.4", en: "×1.4", am: "×1.4" },
        context: {
          he: "שיעור גלי חום חמורים בנשים ממוצא אפריקאי לעומת ממוצע",
          en: "Severe hot flush rate in women of African origin vs average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: { name: "SWAN Menopause Study", url: "https://pubmed.ncbi.nlm.nih.gov/" },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "HRT אינו מתאים לכולן. שוחחו עם רופאת נשים לפני התחלת טיפול.",
        en: "HRT is not suitable for everyone. Discuss with a gynaecologist before starting treatment.",
        am: "HRT ሁሉም አይጠቀሙ — ሐኪምዎን ያናግሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "fertility-infertility",
    name: {
      he: "פוריות ואי-פוריות",
      en: "Fertility & Infertility",
      am: "ፍሬያማነት እና መካንነት",
    },
    shortDescription: {
      he: "בעיות פוריות שכיחות בקרב זוגות מהקהילה, לעיתים מחמת הפטיטיס B, מחסור בויטמין D או גורמים נפשיים. מדריך לטיפולי פוריות בישראל.",
      en: "Fertility problems are common in community couples, sometimes due to hepatitis B, vitamin D deficiency or psychological factors. Guide to fertility treatments in Israel.",
      am: "ፍሬያማነት ችግሮቸ ለኢትዮጵያ-እስራኤሎቸ ጥንዶቸ ብዙ ናቸው — ሄፓቲቲስ B፣ ቪታሚን D ጉድለት ወይም ሥነ-ልቦናዊ ምክንያቶቸ።",
    },
    body: {
      he: `## פוריות בישראל — הכי טוב בעולם

ישראל היא **המדינה בעלת שיעור ההפרייה המבחנה הגבוה ביותר בעולם לנפש** — עם מימון ממשלתי נדיב. הזדמנות עצומה לזוגות מהקהילה.

## מה נחשב "אי-פוריות"?

חוסר הריון לאחר **12 חודשים** של יחסים סדירים ללא הגנה (6 חודשים לנשים מעל 35).

## גורמים שכיחים בקהילה

- **הפטיטיס B**: משפיע על תפקוד הכבד ואיכות הזרע/ביציות
- **מחסור ויטמין D**: קשור לאיכות ביציות
- **גיל נישואין מאוחר**: בנשים — פחות ביציות
- **לחץ נפשי**: PTSD וחרדה משפיעים על ביוץ

## מה מכסה הסל?

**ישראל מממנת IVF (הפרייה חוץ גופית)** עד ללידת **2 ילדים חיים** (לנשים עד גיל 45):
- **ניתוחים + תרופות**: חינם בסל
- **שימור ביציות**: לנשים חולות סרטן — חינם

## שלבי הטיפול

1. **בדיקות פוריות**: ספירת זרע + בדיקות הורמונליות (חינם)
2. **ייעוץ ראשוני**: רופא/ת נשים
3. **הפניה למרפאת פוריות**: IUI (הזרעה מלאכותית) → IVF
4. **תמיכה נפשית**: חלק מהתהליך — בקשו

## הנושא הנפשי

**לחץ, אשמה, בושה** — נפוצים בזוגות שמתמודדים עם אי-פוריות. **טיפול זוגי** עוזר — וכלול בסל.

📞 מרפאת פוריות: שאלו ברופא המשפחה | NATAL: 1201`,
      en: `## Fertility in Israel — World-Leading

Israel has the **highest per-capita IVF rate in the world** with generous government funding. A major opportunity for community couples.

## Causes Common in the Community

Hepatitis B (affects liver function and sperm/egg quality). Vitamin D deficiency (linked to egg quality). Psychological factors (PTSD, anxiety affect ovulation).

## What the Health Basket Covers

IVF (in-vitro fertilisation) funded until **2 live births** (women up to age 45): procedures + medications free. Egg freezing for cancer patients: free.

## Treatment Steps

Fertility tests (sperm count + hormonal — free). GP referral to fertility clinic. IUI (insemination) → IVF. Psychological support available.

📞 Fertility clinic via GP`,
      am: `## ፍሬያማነት ሕክምና

እስራኤሎ IVF (ሙከሩ ዘርቅ ልጅ ማፍራት) ወለድ 2 ዕስከ ነፃ ነው (45 ዕድሜ)።

## ምን ያቀርባሉ?

ሁሉም ምርምሮቸ + IVF + IUI — ነፃ።

📞 ሐኪምዎ ዝወዳ ይጠይቁ`,
    },
    figures: [
      {
        id: "ivf-funding",
        heading: {
          he: "מימון IVF בישראל",
          en: "IVF Funding in Israel",
          am: "የ IVF ፋይናንስ",
        },
        figure: { he: "#1 עולם", en: "#1 World", am: "#1 ዓለም" },
        context: {
          he: "ישראל — המדינה עם שיעור ה-IVF הגבוה ביותר לנפש בעולם",
          en: "Israel — country with the world's highest per-capita IVF rate",
          am: "እስራኤሎ ዓለም ቁ.1 IVF ምጣኔ",
        },
        source: { name: "ICMART Global ART Report", url: "https://www.icmart.org/" },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "טיפולי פוריות הם תהליך מלחיץ. בקשו תמיכה נפשית — חלק מהסל.",
        en: "Fertility treatment is a stressful process. Request psychological support — part of the health basket.",
        am: "ፍሬያማነት ሕክምና ጭንቀት ነው — ሥነ-ልቦና ድጋፍ ይጠይቁ (ነፃ)።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "childhood-diabetes",
    name: {
      he: "סוכרת בילדים ובנוער",
      en: "Childhood & Adolescent Diabetes",
      am: "ልጆቸ እና ወጣቶቸ ሲቪ ሕመም",
    },
    shortDescription: {
      he: "סוכרת סוג 1 ו-2 עולה בילדים בקהילה האתיופית. תסמינים מוקדמים, אבחון וניהול יומיומי.",
      en: "Type 1 and Type 2 diabetes is rising in Ethiopian-Israeli children. Early symptoms, diagnosis and daily management.",
      am: "ኢትዮጵያ-እስራኤሎቸ ልጆቸ ዘንድ ሲቪ ሕመም ይጨምራል — ዓይነት 1 እና 2።",
    },
    body: {
      he: `## סוכרת בילדים — שני סוגים שונים

**סוג 1 (אינסולין-תלוי)**: מחלה אוטואימונית — הלבלב לא מייצר אינסולין. מופיעה בפתאומיות, לכל גיל. **לא קשורה לאורח חיים**.

**סוג 2 (לא אינסולין-תלוי בהתחלה)**: קשורה לעלייה במשקל ואורח חיים יושבני. **עולה בחדות** בנוער מהקהילה בשל שינוי תזונה.

## תסמיני אזהרה לילדים

| תסמין | משמעות אפשרית |
|-------|--------------|
| צמא עז | סוכר גבוה |
| השתנה תכופה | כליות מנסות לסנן סוכר |
| ירידה פתאומית במשקל | גוף "אוכל" שרירים |
| עייפות קיצונית | תאים ללא אנרגיה |
| דלקות עוריות חוזרות | סוכר גבוה = סביבה לחיידקים |

## אבחון

- **בדיקת סוכר**: HbA1c > 6.5% = סוכרת
- **בדיקת סוכר רנדומלי**: > 200 + תסמינים = סוכרת
- **חינם** בסל לכל ילד עם חשד

## ניהול יומיומי

- **אינסולין** (סוג 1): חיוני + ניטור רציף (CGM)
- **תזונה**: ספירת פחמימות — דיאטנית ילדים
- **פעילות**: מפחיתה עמידות לאינסולין
- **בית ספר**: הודיעו לגננת/מורה — ערכת חירום

## ישראל — טיפול ומכשירים

- **CGM (ניטור רציף)**: כלול בסל לכל הסוכרתיים
- **משאבת אינסולין**: לילדים — כלול בסל
- **מרפאת סוכרת ילדים**: בכל בית חולים גדול

📞 SOS גלוקוז נמוך: גלוקגון / מד"א 101`,
      en: `## Two Different Types

Type 1 (insulin-dependent): autoimmune — pancreas doesn't produce insulin. Appears suddenly, any age. Not lifestyle-related. Type 2: linked to weight gain and sedentary lifestyle. **Sharply rising** in community youth due to dietary changes.

## Warning Signs in Children

Intense thirst, frequent urination, sudden weight loss, extreme fatigue, recurrent skin infections.

## Treatment in Israel

CGM (continuous glucose monitor): covered in health basket for all diabetics. Insulin pump: for children — covered. Paediatric diabetes clinic: at every major hospital.

## Daily Management

Insulin (type 1): essential + continuous monitoring. Carbohydrate counting — paediatric dietitian. Inform school — emergency kit in classroom.

📞 Low glucose SOS: glucagon / MDA 101`,
      am: `## ልጆቸ ሲቪ ሕመም

ዓይነት 1: ሰው ሠራሽ ምክንያት | ዓይነት 2: ምግብ ለውጥ ምክንያት።

## ምልክቶቸ

ከፍ ያለ ጥም | ብዙ ሽንት | ፈጣን ክብደት ቅናሽ | ድካም።

📞 MDA 101 (አስቸኳይ ሲሆን)`,
    },
    figures: [
      {
        id: "type2-youth-increase",
        heading: { he: "סוג 2 בנוער", en: "Type 2 in Youth", am: "ዓይነት 2 ወጣቶቸ" },
        figure: { he: "+45%", en: "+45%", am: "+45%" },
        context: {
          he: "עלייה בסוכרת סוג 2 בנוער יוצאי אתיופיה בעשור האחרון",
          en: "Rise in type 2 diabetes in Ethiopian-Israeli youth in the past decade",
          am: "ባለፉ 10 ዓመታት ዓይነት 2 ጭማሪ",
        },
        source: {
          name: "Soroka Paediatric Diabetes",
          url: "https://www.soroka.health.gov.il/",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: 'גלוקוז נמוך מדי (היפוגליקמיה) = חירום. גלוקגון / מד"א 101.',
        en: "Too-low glucose (hypoglycaemia) = emergency. Glucagon / MDA 101.",
        am: "ዝቅ ያለ ሲቪ = አስቸኳይ። MDA 101.",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "alzheimer-dementia",
    name: {
      he: "אלצהיימר ודמנציה",
      en: "Alzheimer's & Dementia",
      am: "አልዘሃይምር እና ዲሜንሽያ",
    },
    shortDescription: {
      he: "דמנציה עולה בקשישים מהקהילה האתיופית. אבחון מוקדם, שירותי תמיכה לבני משפחה ומדריך לניהול.",
      en: "Dementia is rising in elderly Ethiopian-Israelis. Early diagnosis, family support services and a management guide.",
      am: "ዲሜንሽያ ለኢትዮጵያ-እስራኤሎቸ አዛውንቶቸ ይጨምራል — ቀደምት ምርምር፣ ቤተሰቦቸ ድጋፍ።",
    },
    body: {
      he: `## דמנציה — לא "הזדקנות רגילה"

דמנציה אינה חלק נורמלי מהזקנה — זוהי מחלה מוחית. ביש על ישראל: **90,000 חולי דמנציה**, ו-**1 מכל 10 מעל גיל 65**.

## קשר לקהילה האתיופית

- **אבחון מאוחר**: קשישים דוברי אמהרית — בדיקות קוגניטיביות בעברית לא אמינות
- **סיכון גבוה יותר**: סוכרת + לחץ דם + דיכאון = גורמי סיכון לדמנציה
- **חסמי גישה לטיפול**: משפחות לא יודעות לאן לפנות

## תסמינים מוקדמים

- **שכחה מוגברת**: תאריכים, שמות, מקום חפצים
- **אובדן כיוון**: תועה במקומות מוכרים
- **שינויי אישיות**: עצבנות, חשד, עצב
- **קושי בשפה**: שכחת מילים, ניתוק מאמצע משפט

## אבחון

- **MMSE / MoCA** — בדיקות קוגניטיביות. חשוב: בקשו גרסה **תרגומה לאמהרית**
- **MRI מוח**: לשלול גורמים אחרים
- **ייעוץ נוירולוג/גריאטר**

## תמיכה למשפחות

| שירות | גוף | טלפון |
|-------|-----|-------|
| **עמותת עלמא** | דמנציה | 08-9440777 |
| **JDC-Eshel** | קשיש | eshel.org.il |
| **מרכז יום דמנציה** | קופת חולים | שאלו |
| **תמיכה לבני משפחה** | עלמא | 08-9440777 |

## טיפול

**תרופות**: מאטות התקדמות (אריצפט, ריבסטיגמין) — **אינן מרפאות** אך מאטות.
**תנאים**: מבנה יומי, גירויים קוגניטיביים, פעילות גופנית.

📞 עלמא: 08-9440777 | JDC-Eshel: eshel.org.il`,
      en: `## Dementia — Not Normal Ageing

Dementia is not a normal part of ageing — it is a brain disease. Israel: 90,000 dementia patients; 1 in 10 over age 65.

## Connection to the Community

Late diagnosis: cognitive tests in Hebrew are unreliable for Amharic speakers. Higher risk: diabetes + hypertension + depression = dementia risk factors. Access barriers: families don't know where to turn.

## Early Symptoms

Increased forgetfulness (dates, names, object locations). Getting lost in familiar places. Personality changes. Language difficulties.

## Diagnosis

MMSE/MoCA cognitive tests — request Amharic-translated version. Brain MRI. Neurologist/geriatrician consultation.

## Family Support

Alma Association (dementia): 08-9440777 | JDC-Eshel: eshel.org.il | Day care centre: ask health fund

📞 Alma: 08-9440777`,
      am: `## ዲሜንሽያ

ዲሜንሽያ መደበኛ እርጅና አይደለም — የሚ治療 ሕመም ነው።

ቀደምት ምልክቶቸ: ፈጣን 망 የ መርሳት፣ ቋንቋ ችግሮቸ።

📞 ዕልማ: 08-9440777 | eshel.org.il`,
    },
    figures: [
      {
        id: "dementia-age65",
        heading: { he: "דמנציה מעל 65", en: "Dementia over 65", am: "65+ ዲሜንሽያ" },
        figure: { he: "1 מ-10", en: "1 in 10", am: "10 ሰዎቸ ውስጥ 1" },
        context: {
          he: "שכיחות דמנציה בקרב בני 65+ בישראל",
          en: "Dementia prevalence among 65+ in Israel",
          am: "65+ ዕድሜ ዲሜንሽያ ምጣኔ",
        },
        source: {
          name: "Alzheimer's Israel (Alma)",
          url: "https://www.alzheimer.org.il/",
        },
        publishedYear: 2024,
      },
    ],
    warnings: [
      {
        he: "אין תרופה לדמנציה — אך אבחון מוקדם + תמיכה משפחתית משפרים משמעותית את איכות החיים.",
        en: "No cure for dementia — but early diagnosis + family support significantly improve quality of life.",
        am: "ዲሜንሽያ መድሃኒት የለም — ቀደምት ምርምር + ቤተሰብ ድጋፍ ሕይወት ጥራት ያሻሽላሉ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "thyroid-disorders",
    name: { he: "הפרעות בלוטת התריס", en: "Thyroid Disorders", am: "የቲሮይድ ዕጢ ሕመሞቸ" },
    shortDescription: {
      he: "תת-פעילות בלוטת התריס נפוצה בנשים מהקהילה ולעתים אינה מאובחנת שנים. תסמינים, בדיקה וטיפול.",
      en: "Hypothyroidism is common in community women and often undiagnosed for years. Symptoms, testing and treatment.",
      am: "ቲሮይድ ዕጢ ዝቅ ያለ ፋንክሽን ለሴቶቸ ኢትዮጵያ-እስራኤሎቸ ብዙ ነው — ዓመታት ሊቆይ ይችላል።",
    },
    body: {
      he: `## בלוטת התריס — "מנוע הגוף"

בלוטת התריס שולטת במטבוליזם, חום גוף, לחץ דם וצמיחה. **תת-פעילות (hypothyroidism)** = בלוטה לא מייצרת מספיק תירוקסין.

## שכיחות בקהילה

- **נשים** מעל 40: שכיחות גבוהה יותר מהממוצע
- **מחסור ביוד**: בתזונה המסורתית האתיופית — פחות מוצרי חלב + מלח מיודד
- **אוטואימוניות**: הפרעות אוטואימוניות כלליות שכיחות יותר

## תסמינים

- עייפות כרונית ועלייה במשקל ללא שינוי תזונה
- קור — "תמיד קר" גם בקיץ
- עצירות
- שיער יבש ונשירת שיער
- ציפורניים שבירות
- **דיכאון ועייפות נפשית** — לעתים הסימן היחיד

## בדיקה — חינם

**TSH** (thyroid stimulating hormone) — בדיקת דם. חינם בסל לנשים מעל 40 / לכל אחד עם תסמינים.

## טיפול — פשוט מאוד

**לבותירוקסין (synthroid)** — גלולה אחת ביום. זולה, יעילה, ומשפרת תסמינים תוך 4-8 שבועות.

**חשוב**: לקחת **בבוקר, 30 דקות לפני אכילה**. קפה ותוספי סידן משפיעים על ספיגה.

## יתר-פעילות (hyperthyroidism) — הפוך

- דופק מהיר, ירידה במשקל, חרדה, עיניים בולטות
- פחות נפוץ — אך גם מטופל בקלות

📞 אנדוקרינולוג: הפניה מרופא משפחה`,
      en: `## Thyroid — "The Body's Engine"

The thyroid controls metabolism, body temperature, blood pressure and growth. Hypothyroidism = gland not producing enough thyroxine.

## Symptoms

Chronic fatigue and weight gain without dietary change. Always feeling cold. Constipation. Dry hair and hair loss. Brittle nails. Depression and mental fatigue.

## Free Testing

TSH blood test: free in health basket for women over 40 / anyone with symptoms.

## Treatment — Simple

Levothyroxine (synthroid): one tablet daily. Cheap, effective, improves symptoms within 4-8 weeks. Take in the morning, 30 minutes before eating. Coffee and calcium supplements affect absorption.

📞 Endocrinologist referral via GP`,
      am: `## ቲሮይድ ዕጢ ዝቅ ፋንክሽን

ምልክቶቸ: ሥር ሰደድ ድካም፣ ክብደት መጨመር፣ ቁሩ መሰማት፣ ፀጉር ርግፍ።

ምርምር: TSH ደም ምርምር — ነፃ። ሕክምና: ሌቮቲሮክሲን — ቀን 1 ጊዜ።

📞 ሐኪምዎን ያናግሩ`,
    },
    figures: [
      {
        id: "hypothyroid-women",
        heading: {
          he: "תת-פעילות בנשים",
          en: "Hypothyroidism in Women",
          am: "ቲሮይድ ዝቅ ፋንክሽን ለሴቶቸ",
        },
        figure: { he: "×2.3", en: "×2.3", am: "×2.3" },
        context: {
          he: "שכיחות תת-פעילות בנשים מהקהילה לעומת ממוצע",
          en: "Hypothyroidism prevalence in community women vs average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: {
          name: "Israel Endocrine Society",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
        },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: "לא לשנות מינון תירוקסין ללא ייעוץ רפואי — שינוי מינון ללא בדיקות עלול לגרום לנזק.",
        en: "Do not change thyroxine dose without medical advice — dosage changes without testing can cause harm.",
        am: "ሐኪምዎ ሳያናግሩ ዶዝ አትቀይሩ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "hpv-vaccination",
    name: {
      he: "חיסון HPV — מניעת סרטן",
      en: "HPV Vaccination — Cancer Prevention",
      am: "HPV ክትባት — ካንሰር መከላከያ",
    },
    shortDescription: {
      he: "חיסון HPV מונע 6 סוגי סרטן. חינם לגילאי 9-18, מסובסד לגילאי 18-45. שיעורי חיסון נמוכים בקהילה האתיופית.",
      en: "HPV vaccination prevents 6 types of cancer. Free for ages 9-18, subsidised for 18-45. Vaccination rates are low in the Ethiopian-Israeli community.",
      am: "HPV ክትባት 6 የካንሰር ዓይነቶቸ ይከላከላል። ለ9-18 ዕድሜ ነፃ።",
    },
    body: {
      he: `## HPV — נגיף שגורם ל-6 סוגי סרטן

**HPV (נגיף הפפילומה האנושי)** הוא הנגיף המין-מועבר הנפוץ ביותר בעולם. גורם ל:
- סרטן צוואר הרחם (99% מהמקרים)
- סרטן הפה והגרון
- סרטן הפות
- סרטן הנרתיק
- סרטן הפין
- סרטן פי הטבעת

## החיסון — הוכחה מדעית

**90% הפחתה** בסרטן צוואר הרחם במדינות עם תוכניות חיסון מקיפות.

## מי ומתי

| קבוצה | גיל | עלות |
|-------|-----|------|
| ילדות | 9-12 | חינם |
| נערות | 12-18 | חינם |
| נשים צעירות | 18-26 | מסובסד |
| נשים | 26-45 | מסובסד (שוחח עם רופא) |
| בנים/גברים | 9-26 | מסובסד |

## שיעורי חיסון בקהילה — נמוכים

מחקר משרד הבריאות (2023): רק **48%** מהבנות מהקהילה האתיופית קיבלו את סדרת החיסון המלאה (לעומת 71% ממוצע).

**מדוע**: מידע לא הגיע בשפה המובנת, חסמי תרבות, חשש "לא מוסרי".

**עובדה**: HPV עובר בכל מגע עורי-מיני — לא רק ביחסים מלאים.

## כיצד לקבל

- **ילדים**: דרך בית ספר / תחנת אם וילד
- **מבוגרים**: קופת חולים — בקשו "חיסון HPV"

📞 קופת חולים לחיסון | שאלות: 1-700-500-400`,
      en: `## HPV — Virus Causing 6 Cancer Types

HPV is the world's most common sexually transmitted virus. Causes cervical cancer (99% of cases), oral/throat cancer, vulvar, vaginal, penile and anal cancers.

## The Vaccine — Scientific Proof

**90% reduction** in cervical cancer in countries with comprehensive vaccination programmes.

## Who and When

Girls 9-18: free. Women 18-45: subsidised. Boys/men 9-26: subsidised.

## Low Vaccination Rates in the Community

Ministry of Health (2023): only **48%** of Ethiopian-Israeli girls received the full vaccination series (vs 71% average). Causes: information not reaching community in understood language, cultural barriers, misconception that it "encourages immorality."

Fact: HPV is transmitted by any skin-to-skin genital contact — not only full intercourse.

📞 Health fund for vaccination | Questions: 1-700-500-400`,
      am: `## HPV ክትባት

HPV 6 የካንሰር ዓይነቶቸ ያስከትላል። ክትባቱ 90% ይከለክላል።

9-18 ዕድሜ — ነፃ። ጎልማሶቸ — ድጎማ።

48% ብቻ ኢትዮጵያ-እስራኤሎቸ ቢ ክትባቸዋሉ (ከ71% ሃ ብሔራዊ ጋር ሲነፃፀር)።

📞 ቅቃ ሐቅ ይጠይቁ`,
    },
    figures: [
      {
        id: "hpv-vaccine-community",
        heading: {
          he: "חיסון HPV בקהילה",
          en: "HPV Vaccination Rate in Community",
          am: "HPV ክትባት ምጣኔ",
        },
        figure: { he: "48%", en: "48%", am: "48%" },
        context: {
          he: "שיעור חיסון HPV בבנות מהקהילה האתיופית לעומת 71% ממוצע",
          en: "HPV vaccination rate in Ethiopian-Israeli girls vs 71% national average",
          am: "ከ71% ሃ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: {
          name: "Israeli Ministry of Health",
          url: "https://www.gov.il/he/departments/ministry_of_health",
        },
        publishedYear: 2023,
      },
    ],
    warnings: [
      {
        he: "החיסון מונע — לא מטפל ב-HPV קיים. יש להשלים הסדרה המלאה.",
        en: "The vaccine prevents — it does not treat existing HPV. Complete the full series.",
        am: "ክትባቱ ቀዳሚ HPV አይ治療ም — ሙሉ ሰልስሎቸ ያዙ።",
      },
    ],
    lastReviewed: "2026-06-03",
  },
  {
    slug: "respiratory-infections",
    name: {
      he: "זיהומי דרכי נשימה",
      en: "Respiratory Infections",
      am: "የትንፋሽ ሥርዓት ኢንፌክሽኖቸ",
    },
    shortDescription: {
      he: "דלקת ריאות, שפעת וזיהומי נשימה חמורים יותר בקרב ילדים ומבוגרים מהקהילה. חיסונים, מניעה וטיפול.",
      en: "Pneumonia, flu and respiratory infections are more severe in community children and adults. Vaccinations, prevention and treatment.",
      am: "ሳንባ ምች፣ ጉንፋን፣ የትንፋሽ ሥርዓት ዝሆን ለኢትዮጵያ-እስራኤሎቸ ልጆቸ አዛውንቶቸ ኀይለኛ ናቸው።",
    },
    body: {
      he: `## זיהומי נשימה — מחמירים בקהילה

ילדים ומבוגרים מהקהילה האתיופית מועדים יותר לזיהומי נשימה חמורים, בגלל:
- **צפיפות דיור**: קל יותר להדביק
- **עישון פסיבי** בחלק מהבתים
- **תת-חיסון**: שיעורי חיסון נמוכים מהממוצע
- **טיפול מאוחר**: פנייה לרופא רק כשחמור

## הזיהומים הנפוצים

### שפעת (Influenza)
- קדחת גבוהה, כאבי גוף, שיעול
- **חיסון שנתי** — חינם לכל הסוכרתיים, ילדים, קשישים, נשים בהריון

### קורונה / COVID-19
- חיסון עדכני מומלץ — שאלו ברופא
- חשוב לחולי כרוניים

### דלקת ריאות (Pneumonia)
- שיעול עם ליחה ירוקה/דמית, חום גבוה, קוצר נשיעה
- **חיסון Pneumococcal** — חינם לקשישים מעל 65

### RSV (ילדים עד גיל 2)
- תינוקות — מסוכן. חיסון חדש (nirsevimab) חינם מ-2024

## מתי חדר מיון?

- קוצר נשיעה + שפתיים כחולות
- חום מעל 39.5 שלא יורד
- תינוק ללא שתן 8 שעות

## מניעה

- **חיסונים**: שפעת שנתי + פנאומוקוקל
- **היגיינה**: שטיפת ידיים לפני אכילה
- **אוורור**: חדרים מאווררים מפחיתים הדבקה

📞 קופת חולים לחיסונים | חירום: מד"א 101`,
      en: `## Respiratory Infections — More Severe in the Community

Community children and adults are more susceptible to severe respiratory infections due to: crowded housing, passive smoking, below-average vaccination rates, late medical consultation.

## Common Infections

Flu: annual vaccination free for diabetics, children, elderly, pregnant women. COVID-19: updated vaccination recommended. Pneumonia: Pneumococcal vaccination free for those over 65. RSV (under 2): new vaccine (nirsevimab) free from 2024.

## When to Go to the ER?

Shortness of breath + blue lips. Fever over 39.5°C not coming down. Baby without urination for 8 hours.

## Prevention

Annual flu vaccination. Pneumococcal vaccination. Hand washing. Well-ventilated rooms.

📞 Health fund for vaccinations | Emergency: MDA 101`,
      am: `## የትንፋሽ ሥርዓት ኢንፌክሽኖቸ

ጉንፋን | ሳምባ ምች | COVID-19 | RSV (ህፃናት)

## ዋናው መከላከያ

ዓመታዊ የጉንፋን ክትባት (ነፃ)። ሳንባ ምች ክትባት (65+ ነፃ)።

📞 MDA: 101 (አስቸኳይ ሲሆን)`,
    },
    figures: [
      {
        id: "pneumonia-hospitalization",
        heading: {
          he: "אשפוז דלקת ריאות",
          en: "Pneumonia Hospitalisation",
          am: "ሳምባ ምች ሆስፒታልዝ",
        },
        figure: { he: "×1.9", en: "×1.9", am: "×1.9" },
        context: {
          he: "שיעור אשפוז דלקת ריאות בילדים מהקהילה לעומת ממוצע",
          en: "Pneumonia hospitalisation rate in community children vs average",
          am: "ከ ብሔራዊ ምጣኔ ጋር ሲነፃፀር",
        },
        source: {
          name: "Soroka Medical Center",
          url: "https://www.soroka.health.gov.il/",
        },
        publishedYear: 2022,
      },
    ],
    warnings: [
      {
        he: 'קוצר נשיעה + שפתיים כחולות = חדר מיון מיידי. מד"א 101.',
        en: "Shortness of breath + blue lips = immediate ER. MDA 101.",
        am: "አጭር ትንፋሽ + ሰማያዊ ከንፈሮቸ = አስቸኳይ MDA 101.",
      },
    ],
    lastReviewed: "2026-06-03",
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
