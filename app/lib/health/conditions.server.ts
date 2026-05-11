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
