// Health Rights seed (RIN-657 — Wave 2).
//
// 7 health rights relevant to the Ethiopian-Israeli community.
// All citations reference real Israeli law.
// YMYL content: reviewed 2026-05-11.
//
// HE is source-of-truth (CLAUDE.md). EN + AM mirrored.
// Update cadence: when legislation changes.

import type { Translatable } from "../db/columns";

export interface HealthRightEntry {
  slug: string;
  title: Translatable;
  body: Translatable;
  legalBasis?: Translatable;
  /** ISO date of last editorial review. */
  lastReviewed: string;
}

export const HEALTH_RIGHTS: HealthRightEntry[] = [
  // ── 1. זכות לתרגום רפואי ──────────────────────────────────────────────────
  {
    slug: "right-to-translation",
    title: {
      he: "זכות לתרגום רפואי",
      en: "Right to Medical Translation",
      am: "የሕክምና ትርጉም መብት",
    },
    body: {
      he: `כל אדם המקבל שירות רפואי בישראל זכאי להבין ולהיות מובן. על פי חוק זכויות החולה (1996), סעיף 3, מוסד רפואי חייב להבטיח שהמטופל יוכל לתקשר ביעילות עם הצוות הרפואי — ובמידת הצורך, תוך שימוש במתרגם.

מה זה אומר בפועל? כל מטופל דובר אמהרית, טיגרינית, אנגלית, ערבית, או כל שפה אחרת, יכול לדרוש מהקופה, מהמרפאה, ומבית החולים, תרגום לשפה שהוא מבין. הבקשה יכולה להיות בעל-פה, אך מומלץ לבקש בכתב. שמרו אסמכתא.

במקרה של סירוב — פנו לאחראי הרפואי במוסד ובקשו תיעוד בכתב. לאחר מכן ניתן להתלונן בנציב קבילות הציבור של משרד הבריאות (טל': 5400*) או באמצעות אתר האינטרנט של המשרד. זכות זו תקפה בקופות חולים, מרפאות ובתי חולים ציבוריים כאחד.`,
      en: `Every person receiving healthcare in Israel has the right to understand and be understood. Under the Patient Rights Act (1996), section 3, a medical institution is obliged to ensure that a patient can communicate effectively with medical staff — including through the use of an interpreter when necessary.

In practice: any Amharic-, Tigrinya-, English-, Arabic-, or other-language-speaking patient may request interpretation from their HMO, clinic, or hospital. The request can be verbal, but a written request is strongly recommended. Keep a record.

If refused: approach the medical officer-in-charge and request written documentation of the refusal. You may then file a complaint with the Ministry of Health Public Complaints Commissioner (dial 5400*) or through the Ministry website. This right applies equally to HMOs, clinics, and public hospitals.`,
      am: `በእስራኤል ሕክምና የሚያገኝ ሁሉም ሰው የመረዳትና መረዳቱን የማረጋገጥ መብት አለው። በታካሚ መብቶች ህግ (1996)፣ አንቀጽ 3 መሠረት፣ ሕክምና ተቋሙ ታካሚው ከሕክምናው ሠራተኞች ጋር ውጤታማ ግንኙነት ማድረግ እንዲችል ማረጋገጥ አለበት — አስፈላጊ ሲሆን አስተርጓሚ ሊያቀርብ ይገባዋል።

በተግባር ምን ማለት ነው? አማርኛ፣ ትግርኛ፣ እንግሊዝኛ፣ አረብኛ ወይም ሌላ ቋንቋ ተናጋሪ ታካሚ ከጤና ድርጅቱ፣ ከሕክምና ክሊኒኩ ወይም ከሆስፒታሉ ትርጉም የመጠየቅ መብት አለው። ጥያቄው በቃልም ሊቀርብ ይችላል፣ ነገር ግን በጽሑፍ ሲቀርብ ይመከራል። ማስረጃ ይያዙ።

ፍቃዱ ቢ거ፍ፣ ሐኪሙ ሃላፊ ጋር ቅሬታዎን ያቅርቡ። ከዚያ ለጤና ሚኒስቴር የህዝብ ቅሬታ ኮሚሽነር (5400*) ወይም በሚኒስቴሩ ድረ-ገጽ ቅሬታ ማቅረብ ይችላሉ።`,
    },
    legalBasis: {
      he: "חוק זכויות החולה, תשנ\"ו-1996, סעיף 3",
      en: "Patient Rights Act 1996, section 3",
      am: "የታካሚ መብቶች ህግ 1996፣ አንቀጽ 3",
    },
    lastReviewed: "2026-05-11",
  },

  // ── 2. הסכמה מדעת ──────────────────────────────────────────────────────────
  {
    slug: "informed-consent",
    title: {
      he: "הסכמה מדעת בשפה המובנת",
      en: "Informed Consent in an Understood Language",
      am: "በሚረዳ ቋንቋ ፈቃደኝነት",
    },
    body: {
      he: `הסכמה מדעת היא אבן היסוד של הרפואה המודרנית. חוק זכויות החולה (1996), פרק ד', קובע כי כל טיפול רפואי, ניתוח, בדיקה או הליך פולשני טעון הסכמתו המפורשת של המטופל — לאחר שקיבל מידע מלא ומובן על הסיכונים, התועלות, החלופות, והשלכות אי-הטיפול.

אם אתם לא מבינים עברית, או לא הבנתם את ההסבר, יש לכם זכות מלאה לדחות את החתימה ולדרוש הסבר חוזר בשפה שאתם מבינים. אין ביטול זה עילה לסירוב לטיפול דחוף. ביטוי הסכמה יכול להיות בכתב, בעל-פה, ובמקרים מסוימים אף בהתנהגות.

הסכמה חייבת להיות: (1) חופשית — ללא לחץ, איום, או שכנוע מניפולטיבי; (2) מדעת — לאחר הסבר מלא ומובן; (3) כשירה — מתוך הנחה שהמטופל מסוגל להבין ולהחליט. לילדים מתחת לגיל 16 ולחסרי-כשרות משפטית — נדרשת הסכמת הורה או אפוטרופוס, תוך מתן מקסימום אוטונומיה לקטין בהתאם לגילו ובגרותו.`,
      en: `Informed consent is the cornerstone of modern medicine. The Patient Rights Act (1996), chapter 4, establishes that every medical treatment, surgery, examination, or invasive procedure requires the patient's explicit consent — after receiving full, comprehensible information about the risks, benefits, alternatives, and consequences of non-treatment.

If you do not understand Hebrew, or did not understand the explanation, you have the full right to refuse signing and to demand a repeated explanation in a language you understand. Refusing to sign cannot be used as a reason to withhold urgent care.

Consent must be: (1) free — without coercion; (2) informed — after a comprehensible explanation; (3) competent — the presumption being that the patient is capable of understanding. For children under 16 or legally incompetent adults — parental or guardian consent is required.`,
      am: `ፈቃደኛ መሆን ዘመናዊ ሕክምናው መሠረት ነው። በታካሚ መብቶች ህግ (1996)፣ ምዕራፍ 4 መሠረት፣ ማንኛውም ሕክምና፣ ቀዶ ጥገና፣ ምርምር ወይም ወደ ሰውነት ውስጥ የሚገባ ሂደት ከታካሚው ግልጽ ፈቃድ ይጠይቃል — ስለ አደጋዎቹ፣ ጥቅሞቹ፣ አማራጮቹ እና ሕክምና ካልተደረገ ስለሚደርሱ ውጤቶች ሙሉ ሊረዳ የሚችል መረጃ ካገኘ በኋላ።

ዕብራይስጥ ካልተረዱ፣ ወይም ማብራሪያዎን ካልተረዱ፣ ፊርማ ከመፈጸምዎ ተቆጥበው ድጋሚ ሊረዱ የሚችሉ ቋንቋ ማብራሪያ የመጠየቅ ሙሉ መብት አለዎት። ፊርማ ለመፈጸም ፍቃደኛ ካልሆኑ ድንገተኛ ሕክምናን ማገድ አይፈቀድም።`,
    },
    legalBasis: {
      he: "חוק זכויות החולה, תשנ\"ו-1996, פרק ד' (סעיפים 13–18)",
      en: "Patient Rights Act 1996, chapter 4 (sections 13–18)",
      am: "የታካሚ መብቶች ህግ 1996፣ ምዕራፍ 4 (አንቀጽ 13–18)",
    },
    lastReviewed: "2026-05-11",
  },

  // ── 3. בדיקת BRCA2 ────────────────────────────────────────────────────────
  {
    slug: "brca2-testing",
    title: {
      he: "בדיקת BRCA2 — זכאות וגישה",
      en: "BRCA2 Genetic Testing — Eligibility and Access",
      am: "BRCA2 የዘረ-መል ምርምር — ብቃት እና ተደራሽነት",
    },
    body: {
      he: `מחקרים הראו כי נשים ממוצא אתיופי נושאות שינוי ספציפי בגן BRCA2 (p.Ser1813Ter) בשכיחות גבוהה יחסית בהשוואה לאוכלוסייה הכללית. מוטציה זו מעלה באופן משמעותי את הסיכון לפתח סרטן שד ולסרטן השחלות. בספטמבר 2025, משרד הבריאות הוסיף בדיקה ממוקדת זו לסל הבריאות הרשמי — ללא עלות נוספת.

מי זכאית לבדיקה? נשים ממוצא אתיופי, בכל גיל, יכולות לבקש הפניה מהרופא המשפחה לבדיקה גנטית ממוקדת. הבדיקה מבוצעת על-ידי מכוני גנטיקה מוסמכים. תוצאות מועברות תמיד בליווי ייעוץ גנטי פרטני. מעבדות גנטיקה פועלות בבתי חולים הגדולים ברחבי הארץ.

מה ניתן לעשות עם התוצאות? נשאיות המוטציה מוזמנות לפרוטוקול מעקב מוגבר — ממוגרפיה ו-MRI בתדירות גבוהה יותר, ואפשרות לניתוח מניעתי בהתאם להחלטה אישית. כל מידע גנטי חסוי לחלוטין — אסור לחברות ביטוח, מעסיקים, או כל גורם שלישי לדרוש גישה אליו ללא הסכמת המטופלת.`,
      en: `Research has shown that women of Ethiopian descent carry a specific variant of the BRCA2 gene (p.Ser1813Ter) at a relatively elevated frequency. This mutation increases the risk of breast and ovarian cancer. In September 2025, the Ministry of Health added targeted testing to the standard health basket.

Who is eligible? Women of Ethiopian descent, at any age, can request a referral from their family physician for targeted genetic testing. Testing is carried out by accredited genetics institutes, and results are provided with genetic counselling.

What can be done with the results? Carriers are invited to an enhanced surveillance protocol — more frequent mammography and MRI, and the option of preventive surgery. All genetic information is fully confidential — insurance companies and employers may not demand access to it.`,
      am: `ጥናቶች እንደሚያሳዩት የኢትዮጵያ ዝርያ ሴቶች BRCA2 ጂን ልዩ ሚውቴሽን (p.Ser1813Ter) በአንጻራዊ ከፍተኛ ድግግሞሽ ያሏቸው ናቸው። ይህ ሚውቴሽን የጡት እና የሕዋስ ካንሰር አደጋን ይጨምራል። በሴፕቴምበር 2025 ጤና ሚኒስቴሩ ይህን ምርምር ወደ ኦፊሴላዊ የጤና ቅርጫቱ ጨምሯል።

ማን ብቁ ነው? የኢትዮጵያ ዝርያ ሴቶች፣ ምንም ዕድሜ ቢኖርቸው፣ ለዒላማ የዘረ-መል ምርምር ሪፈራል ሐኪማቸው ዘንድ ሊጠይቁ ይችላሉ። ምርምሩ ብቁ በሆኑ የጀነቲክ ማዕከሎች ይደረጋል።

ከውጤቶቹ ምን ማድረግ ይቻላል? ሚውቴሽን ያላቸው ሴቶች ጥብቅ ክትትል ፕሮቶኮልን ይጋበዛሉ — ብዙ ጊዜ ማምኖሞግራፊ እና MRI፣ እና ቀዶ-ጥገናዊ መከላከያ። ሁሉም የዘረ-መል መረጃ ሙሉ ሚስጢራዊ ነው — የቢሕናዎ ድርጅቶች እና ቀጣሪዎች ሊጠቀሙበት አይፈቀድም።`,
    },
    legalBasis: {
      he: "סל שירותי הבריאות, עדכון ספטמבר 2025; חוק גנטיקה (בדיקות ומחקר גנטי ויעוץ גנטי), תשס\"א-2000",
      en: "Health Basket Update September 2025; Genetics Act (Genetic Examination, Research and Counselling) 2000",
      am: "የጤና ቅርጫት ዝማኔ ሴፕቴምበር 2025፤ የጀነቲክ ህግ 2000",
    },
    lastReviewed: "2026-05-11",
  },

  // ── 4. בדיקת HIV — אנונימיות וסודיות ────────────────────────────────────
  {
    slug: "hiv-testing-rights",
    title: {
      he: "בדיקת HIV — אנונימיות וזכויות",
      en: "HIV Testing — Anonymity and Patient Rights",
      am: "HIV ምርምር — ስም-አልባነት እና መብቶች",
    },
    body: {
      he: `ישראל מפעילה מרכזי בדיקת HIV אנונימיים בכל מחוזות בריאות. ניתן להיבדק ללא שם, ללא תיעוד זהות, ללא דווח לקופת חולים. מרכזי הבדיקה קיימים בתל-אביב, ירושלים, חיפה, נצרת, באר-שבע ועוד. ניתן למצוא כתובות מרכזי הבדיקה באתר משרד הבריאות.

על פי הנחיות משרד הבריאות, תוצאות חיוביות מלוות בייעוץ מסיים ובהפניה לטיפול — ללא חובת גילוי מיידי. חוק העונשין קובע כי מי שידוע לו שהוא נשא HIV וקיים יחסי מין ללא הודעה לבן-זוגו עלול לשאת באחריות פלילית — אך הדיון המשפטי בסוגיה מורכב ומשתנה. מומלץ להתייעץ עם עורך דין לפני כל גילוי.

פרטיות רפואית: מידע על מצב HIV מוגן תחת חוק זכויות החולה ואסור בהחלט להעבירו למעסיק, לחברת ביטוח, לצבא, או לכל גוף שלישי — ללא הסכמת המטופל. דרישה כזו היא הפרת חוק.

טיפול: נשאי HIV זכאים לטיפול תרופתי (ARV) חינמי לחלוטין במסגרת סל הבריאות. הטיפול הנוכחי מאפשר לרוב הנשאים לנהל חיים תקינים וסיכון ההדבקה הולך ופוחת עם טיפול עקבי.`,
      en: `Israel operates anonymous HIV-testing centres in every health district. You can be tested without providing your name, with no identity documentation, and with no reporting to your HMO. Testing centres exist in Tel Aviv, Jerusalem, Haifa, Nazareth, Be'er Sheva, and elsewhere.

According to Ministry of Health guidelines, positive results are accompanied by post-test counselling and a treatment referral — with no obligation of immediate disclosure. The Penal Code provides that a person who knowingly engages in sexual intercourse without notifying their partner of HIV-positive status may incur criminal liability — though the legal discussion on this issue is complex and evolving.

Medical privacy: HIV-status information is protected under the Patient Rights Act and may absolutely not be passed to an employer, insurance company, the military, or any third party — without the patient's consent.`,
      am: `እስራኤል በሁሉም የጤና ወረዳዎች የስም-አልባ HIV ምርምር ማዕከሎች አሏት። ስምዎን ሳያስሩ፣ ምንም ሰነድ ሳያቀርቡ፣ ለጤና ድርጅቱ ሳይዘገቡ ሊፈተሹ ይችላሉ። ምርምር ማዕከሎች ቴል-አቪቭ፣ ኢየሩሳሌም፣ ሐይፋ፣ ናዝሬት፣ ቤኤርሼቫ እና ሌሎች ቦታዎች አሉ።

ምርምሩ አዎንታዊ ሆኖ ከተገኘ፣ ሕክምና ምክር እና ሪፈራል ይሰጣል — ወዲያውኑ ለሌሎች የማሳወቅ ግዴታ ሳይኖር። ሕክምና ሚስጢር፡ HIV ሁኔታ የሚያሳይ መረጃ ከቀጣሪ፣ ቢሕናዎ ድርጅት፣ ሠራዊት ወይም ሦስተኛ ወገን — ያለ ታካሚ ፈቃድ ሊተላለፍ አይፈቀድም።`,
    },
    legalBasis: {
      he: "חוק זכויות החולה, תשנ\"ו-1996; הנחיות משרד הבריאות בנושא HIV/AIDS; חוק העונשין, תשל\"ז-1977",
      en: "Patient Rights Act 1996; Ministry of Health HIV/AIDS Guidelines; Penal Code 1977",
      am: "የታካሚ መብቶች ህግ 1996፤ የጤና ሚኒስቴር HIV/AIDS መመሪያዎች፤ የወንጀለኛ ሕግ 1977",
    },
    lastReviewed: "2026-05-11",
  },

  // ── 5. אשפוז פסיכיאטרי — זכויות ─────────────────────────────────────────
  {
    slug: "mental-health-hospitalization",
    title: {
      he: "אשפוז פסיכיאטרי — זכויות ואשפוז כפוי",
      en: "Psychiatric Hospitalisation — Rights and Involuntary Admission",
      am: "የሥነ-ልቡና ሆስፒታል ሕክምና — መብቶች እና ግዳጅ መታሰር",
    },
    body: {
      he: `חוק טיפול בחולי נפש (תשנ"א-1991) מסדיר את האשפוז הפסיכיאטרי בישראל. אשפוז הוא ברירת מחדל וולונטרי — המטופל מסכים ומוחתם. אשפוז כפוי אפשרי רק בתנאים מוגדרים: הפרט מסכן את עצמו או אחרים, ומצבו מחייב אשפוז לאלתר.

צו אשפוז כפוי ניתן על-ידי פסיכיאטר מחוזי בלבד. זכויות המטופל: (1) לדעת מדוע נאשפז; (2) לקבל ייצוג משפטי; (3) לערער על הצו בפני בית משפט מחוזי תוך 72 שעות; (4) לסרב לטיפול תרופתי שאינו דחוף — אלא אם הוצא צו מיוחד; (5) לקשר עם משפחה ועורך-דין.

לקהילה האתיופית: אבחון פסיכיאטרי חייב להתחשב בהקשר תרבותי. ביטויים של מצוקה, האמנות תרבותיות, וטקסי ריפוי מסורתיים אינם כשלעצמם עילה לאשפוז. יש לקחת בחשבון גם מחסומי שפה בעת ביצוע הערכה פסיכיאטרית — ולבקש מתרגם כתנאי לאבחון מהימן.

כיצד מתלוננים? אם סברתם שאושפזתם ללא עילה מספקת, ניתן לפנות לנציב בית המשפט לענייני אשפוז פסיכיאטרי, ובמקביל — לסיוע משפטי ללא תשלום מאיגוד עורכי הדין.`,
      en: `The Mental Health Treatment Act (1991) governs psychiatric hospitalisation in Israel. Hospitalisation is voluntary by default — the patient agrees and signs. Involuntary admission is possible only under defined conditions: the individual poses a danger to themselves or others, and their condition requires immediate hospitalisation.

An involuntary admission order may be issued by a district psychiatrist only. Patient rights: (1) to know why they are hospitalised; (2) to receive legal representation; (3) to appeal the order before a district court within 72 hours; (4) to refuse non-urgent medication unless a specific order has been issued; (5) to maintain contact with family and a lawyer.

For the Ethiopian community: psychiatric diagnosis must account for cultural context. Expressions of distress, cultural beliefs, and traditional healing practices are not in themselves grounds for hospitalisation.`,
      am: `የአእምሮ ሕክምና ህግ (1991) በእስራኤል ሥነ-ልቡናዊ ሆስፒታልን ይቆጣጠራል። ሆስፒታልነቱ በነባሪ ፈቃደኝነት ላይ የተመሠረተ ነው። ግዳጅ አቀባበል የሚፈቀደው ግለሰቡ ለራሱ ወይም ለሌሎች አደጋ ሲፈጥር ብቻ ነው።

ግዳጅ ሆስፒታልነት ትዕዛዝ በወረዳ ሥነ-ልቡናዊ ሐኪም ብቻ ሊሰጥ ይችላል። የታካሚ መብቶች: (1) ለምን ታሰሩ ማወቅ; (2) ህጋዊ ውክልና ማግኘት; (3) ትዕዛዙን በ72 ሰዓት ውስጥ ወደ አውራጃ ፍርድ ቤት ማሳደግ; (4) ሕክምና ከቢሕናዎ ሚስጢሩን ያለ ፈቃዱ ሳያውቁ ሕክምና ሳይሰጠው ለሦስት ወገናት ሳያተለፍ; (5) ከቤተሰብ እና ጠበቃ ጋር ግንኙነት ያደርጋሉ።`,
    },
    legalBasis: {
      he: "חוק טיפול בחולי נפש, תשנ\"א-1991; תקנות טיפול בחולי נפש",
      en: "Mental Health Treatment Act 1991; Mental Health Treatment Regulations",
      am: "የአእምሮ ሕክምና ህግ 1991፤ የአእምሮ ሕክምና ደንቦች",
    },
    lastReviewed: "2026-05-11",
  },

  // ── 6. סקירות מניעתיות חינמיות ──────────────────────────────────────────
  {
    slug: "preventive-screening-rights",
    title: {
      he: "זכאות לסקירות מניעתיות חינמיות",
      en: "Right to Free Preventive Screening",
      am: "ነጻ ቅድመ-መከላከያ ምርምር የማግኘት መብት",
    },
    body: {
      he: `סל שירותי הבריאות כולל שורה של בדיקות מניעתיות חינמיות, הניתנות לפי גיל ומגדר. הבדיקות הרלוונטיות ביותר לקהילת יוצאי אתיופיה:

ממוגרפיה: נשים בגיל 50–74 זכאיות לממוגרפיה חינמית אחת לשנתיים. נשים עם היסטוריה משפחתית של סרטן שד (ובמיוחד נשאיות BRCA2) — מגיל מוקדם יותר ובתדיר גבוה יותר, לפי הנחיות הרופא המשפחה.

קולונוסקופיה: גברים ונשים בגיל 50–74 זכאים לקולונוסקופיה חינמית אחת לעשר שנים, ו/או לבדיקת דם סמוי בצואה אחת לשנה. גילוי מוקדם של סרטן המעי הגס מעלה משמעותית את הסיכויים להחלמה.

בדיקת לחץ דם, כולסטרול, סוכר: כחלק מביקור הבריאות השנתי — עבור כל המבוגרים. הוסף לסל ב-2021. בדיקות אלה חיוניות במיוחד לקהילה שבה שכיחות הסוכרת ולחץ הדם גבוהה.

זכרו: בדיקות אלה חינמיות אך מצריכות פנייה פעילה לקופת חולים. אל תחכו לביוזמת הרופא — בקשו. הגשת הבקשה בכתב מבטיחה מעקב ותיעוד תקין.`,
      en: `The standard health basket includes a range of free preventive screening tests, provided by age and gender. The most relevant for the community:

Mammography: women aged 50–74 are entitled to a free mammogram every two years. Women with a family history of breast cancer (and especially BRCA2 carriers) — from an earlier age and at higher frequency, per physician guidance.

Colonoscopy: men and women aged 50–74 are entitled to a free colonoscopy every ten years, and/or an annual stool occult-blood test.

Blood pressure, cholesterol, glucose: part of the annual health visit — for all adults, added to the basket in 2021.

Note: these tests are free but require you to actively approach your HMO. Do not wait for the doctor to initiate — request them.`,
      am: `ደረጃዊ የጤና ቅርጫቱ በዕድሜ እና ጾታ በሚቀርቡ ነጻ ቅድመ-መከላከያ ምርምሮችን ያካትታል። ለማህበረሰቡ እጅግ አዛምዳሚዎቹ:

ማምኖሞግራፊ: 50–74 ዓመት ሴቶች ሁለት ዓመት አንድ ጊዜ ነጻ ማምኖሞግራፊ ያገኛሉ። የጡት ካንሰር የቤተሰብ ታሪክ ያላቸው (በተለይ BRCA2 ያላቸው) — ከቀደምት ዕድሜ እና ብዙ ጊዜ።

ቅኝ ቆላሎ ምርምር: 50–74 ዓመት ወንዶችና ሴቶች አስር ዓመት አንድ ጊዜ ነጻ ቅኝ ቆላሎ ምርምር ያገኛሉ።

ደም ግፊት፣ ኮሌስትሮል፣ ስኳር: ዓመታዊ የጤና ጉብኝት ሲደረግ — ለሁሉም ጎልማሶች።

ምርምሮቹ ነጻ ናቸው ነገር ግን ወደ ጤና ድርጅቱ እርስዎ ሊሄዱ ይገባዎታል። ሐኪሙ ዕርምጃ ይወስዳሉ ብለው አይጠብቁ — ጠይቁ።`,
    },
    legalBasis: {
      he: "תקנות ביטוח בריאות ממלכתי (שירותי בריאות בסל), תשנ\"ה-1994 ועדכוניהם; הנחיות משרד הבריאות לסקר ממוגרפי",
      en: "National Health Insurance Regulations (Health Basket Services) 1994 and amendments; Ministry of Health mammography screening guidelines",
      am: "ብሔራዊ የጤና ቢሕና ደንቦች (የጤና ቅርጫት አገልግሎቶች) 1994 እና ማሻሻያዎቹ፤ የጤና ሚኒስቴር የማምኖሞግራፊ ምርምር መመሪያዎች",
    },
    lastReviewed: "2026-05-11",
  },

  // ── 7. זכות לחוות דעת שנייה ───────────────────────────────────────────────
  {
    slug: "second-opinion-right",
    title: {
      he: "זכות לחוות דעת שנייה",
      en: "Right to a Second Medical Opinion",
      am: "ሁለተኛ ሕክምናዊ አስተያየት የማግኘት መብት",
    },
    body: {
      he: `כל מטופל בישראל זכאי לבקש חוות דעת שנייה מרופא אחר, ללא צורך בנימוק. חוק זכויות החולה (1996) קובע מפורשות שהחלטה על טיפול רפואי היא של המטופל, ולשם קבלת החלטה מיודעת — הוא רשאי לפנות לרופא נוסף.

כיצד לממש: (1) בקשו מהרופא המטפל העתק של כל המסמכים הרפואיים — זוהי זכותכם (חוק זכויות החולה, סעיף 18). (2) פנו לרופא מומחה נוסף — בתוך אותה קופה או בחוץ. (3) הצגת חוות-דעת שנייה לרופא המקורי איננה ניתנת לסנקציה.

עלות: קופות חולים מכסות ייעוצים ספציפיים. ייעוץ חיצוני עשוי להיות בתשלום חלקי. בגורמי סיכון גבוהים — דרשו ייעוץ פנימי תחילה.

לחברי הקהילה: אם ניתנה לכם אבחנה שמרגישה שגויה, או שאתם לא הבנתם את ההסבר — יש לכם מלוא הזכות לחפש עוד מומחה. שאלות תמיד עדיפות על החלטות חפוזות.`,
      en: `Every patient in Israel is entitled to request a second opinion from another doctor, without needing to give a reason. The Patient Rights Act (1996) explicitly states that medical-treatment decisions belong to the patient, and in order to make an informed decision they may consult an additional doctor.

How to exercise this right: (1) Ask your treating physician for copies of all medical documents — this is your right (Patient Rights Act, section 18). (2) Approach a further specialist — within the same HMO or externally. (3) Presenting a second opinion to the original doctor cannot be sanctioned.

Cost: HMOs cover specific consultations. External consultations may involve partial payment. For high-risk conditions — request an internal consultation first.

For community members: if you received a diagnosis that feels wrong, or if you did not understand the explanation — you have every right to seek a further specialist. Questions are always preferable to hasty decisions.`,
      am: `በእስራኤል ያለ ሁሉም ታካሚ ምክንያት ሳይሰጥ ከሌላ ሐኪም ሁለተኛ አስተያየት የመጠየቅ መብት አለው። የታካሚ መብቶች ህግ (1996) ሕክምናዊ ውሳኔ የታካሚው መሆኑን ግልጽ ያደርጋል — ስለዚህ ተጨማሪ ሐኪም ማማከር ይቻላል።

ይህን መብት እንዴት ይጠቀሙ: (1) ሕክምናው ሐኪምዎ ሁሉንም ሕክምናዊ ሰነዶች ቅጅ ይጠይቁ — ይህ መብትዎ ነው (አንቀጽ 18). (2) ሌላ ሊቅ ሐኪም ያማክሩ — ከጤና ድርጅቱ ውስጥ ወይም ውጭ. (3) ሁለተኛ አስተያየት ለዋናው ሐኪምዎ ማቅረብ ቅጣት አያስከትልም።

ወጪ: ጤና ድርጅቶቹ አንዳንድ ምክሮችን ይሸፍናሉ። ውጪ ምክሮቹ ከፊል ወጪ ሊጠይቁ ይችላሉ። ለከፍተኛ-አደጋ ሁኔታዎች — ቅድሚያ ውስጣዊ ምክር ይጠይቁ።`,
    },
    legalBasis: {
      he: "חוק זכויות החולה, תשנ\"ו-1996, סעיפים 18–19",
      en: "Patient Rights Act 1996, sections 18–19",
      am: "የታካሚ መብቶች ህግ 1996፣ አንቀጽ 18–19",
    },
    lastReviewed: "2026-05-11",
  },
];

/** Compute localised title for a right. Falls back to HE. */
export function rightTitle(entry: HealthRightEntry, locale: "he" | "en" | "am"): string {
  return entry.title[locale] ?? entry.title.he;
}

/** Compute localised body for a right. Falls back to HE. */
export function rightBody(entry: HealthRightEntry, locale: "he" | "en" | "am"): string {
  return entry.body[locale] ?? entry.body.he;
}

/** Compute localised legal basis. Falls back to HE when available. */
export function rightLegalBasis(
  entry: HealthRightEntry,
  locale: "he" | "en" | "am",
): string | undefined {
  if (!entry.legalBasis) return undefined;
  return entry.legalBasis[locale] ?? entry.legalBasis.he;
}
