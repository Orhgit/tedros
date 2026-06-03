// Glossary Wave 2 — 20 additional entries (TED-N content expansion).
//
// Categories: tradition, organization, program, history, identity.
// All terms authored HE-first; EN + AM are factual mirrors (CLAUDE.md).
// Slugs that collide with Wave 1 (`tene-briut`, `enp`, `tebeka`, `sigd`,
// `beta-israel`, `kessim`) are avoided — new slugs used instead where needed.

import type { GlossaryEntry } from "./glossary.server";

export const GLOSSARY_WAVE2: GlossaryEntry[] = [
  // 1. אוריית — התורה של יהדות אתיופיה
  {
    slug: "orit",
    category: "tradition",
    term: { he: "אוריית", en: "Orit", am: "ኦሪት" },
    summary: {
      he: "הספר הקדוש של יהדות אתיופיה — חמשת חומשי התורה בתרגום לגעז, מרכז התפילה והקריאה של הקייסים.",
      en: "The sacred scripture of Ethiopian Jewry — the Pentateuch (and more) in the Ge'ez language, the core text the Kessim read from.",
      am: "የኢትዮጵያ አይሁዶች ቅዱስ መጽሐፍ — በግዕዝ ቋንቋ የተጻፈ ኦሪት፣ ቄሶቹ የሚያነቡት ዋና ጽሑፍ።",
    },
    relatedRights: [],
    relatedTerms: ["geez", "kessim", "beta-israel", "sigd"],
    sources: [
      {
        title: "אנציקלופדיה לתרבות יהדות אתיופיה",
        url: "https://www.gov.il/he/departments/topics/ethiopian_jewry",
      },
    ],
    bodies: {
      he: `## מה זה אוריית?

ה**אוריית** (מהמילה "אוריתא" — תורה) הוא הספר הקדוש המרכזי של יהדות אתיופיה, ביתא ישראל. בשונה מהיהדות הרבנית, ביתא ישראל לא הכירו את התלמוד, ולכן האוריית והמקרא הם מקור הסמכות ההלכתי העיקרי.

## מה כלול בו?

- **חמשת חומשי התורה** — בראשית, שמות, ויקרא, במדבר, דברים
- ספרים נוספים מהמקרא ומספרות חיצונית (כגון ספר היובלים וחנוך) שנשמרו במסורת
- הכל כתוב ב**געז** — שפת הקודש האתיופית, ולא בעברית

## מי קורא בו?

הקייסים (כוהני הדת) קוראים מן האוריית בתפילות, בשבתות ובחגים — ובמיוחד ב**סיגד**, היום בו הקהילה מאזינה לקריאה במעמד מרכזי.

## משמעות בישראל

עם העלייה לישראל החל מפגש עם היהדות הרבנית והעברית. רבים בקהילה שומרים על מסורת האוריית והגעז כחלק מזהותם, לצד לימוד עברית ומסורת רבנית. שמירה על האוריית נחשבת לעוגן זהות וגאווה תרבותית.

## ראו גם

- [געז](/he/glossary/geez) — שפת הכתיבה של האוריית
- [קייסים](/he/glossary/kessim) — הקוראים מן האוריית
- [ביתא ישראל](/he/glossary/beta-israel) — הקהילה ששמרה עליו
`,
      en: `## What is the Orit?

The **Orit** (from Aramaic "Oraita" — Torah) is the central sacred scripture of Ethiopian Jewry (Beta Israel). Unlike Rabbinic Judaism, Beta Israel did not have the Talmud, so the Orit and the Bible were the primary source of religious authority and halakha.

## What does it contain?

- **The Five Books of Moses** — Genesis, Exodus, Leviticus, Numbers, Deuteronomy
- Additional biblical and extra-biblical works preserved in tradition (e.g. Jubilees, Enoch)
- All written in **Ge'ez** — the Ethiopian liturgical language, not Hebrew

## Who reads from it?

The Kessim (religious leaders) read from the Orit during prayers, Sabbaths and festivals — especially on **Sigd**, when the community gathers to hear the reading.

## Significance in Israel

Immigration to Israel brought an encounter with Rabbinic Judaism and Hebrew. Many in the community preserve the Orit and Ge'ez tradition as part of their identity, alongside learning Hebrew. Keeping the Orit alive is seen as an anchor of identity and cultural pride.

## See also

- [Ge'ez](/en/glossary/geez) — the language the Orit is written in
- [Kessim](/en/glossary/kessim) — those who read from the Orit
- [Beta Israel](/en/glossary/beta-israel) — the community that preserved it
`,
      am: `## ኦሪት ምንድ ነው?

**ኦሪት** (ከአራማይክ "ኦራይታ" — ቶራህ) የኢትዮጵያ አይሁዶች (ቤታ እስራኤል) ዋና ቅዱስ መጽሐፍ ነው። ከረቢ አይሁድነት በተለየ ቤታ እስራኤል ታልሙድ አልነበራቸውም፣ ስለዚህ ኦሪትና መጽሐፍ ቅዱስ ዋናው የሃይማኖት ሥልጣን ምንጭ ነበሩ።

## ምን ይዟል?

- **አምስቱ የሙሴ መጻሕፍት** — ዘፍጥረት፣ ዘጸአት፣ ዘሌዋውያን፣ ዘኍልቍ፣ ዘዳግም
- በባህል የተጠበቁ ተጨማሪ መጻሕፍት
- ሁሉም በ**ግዕዝ** የተጻፈ ነው

ቄሶቹ በጸሎት፣ በሰንበትና በበዓላት — በተለይም በ**ሰግድ** — ከኦሪት ያነባሉ። ወደ እስራኤል ከመጡ በኋላም ብዙዎች የኦሪትንና የግዕዝን ባህል እንደ ማንነታቸው አካል ይጠብቃሉ።
`,
    },
  },

  // 2. געז — שפת הקודש
  {
    slug: "geez",
    category: "tradition",
    term: { he: "געז", en: "Ge'ez", am: "ግዕዝ" },
    summary: {
      he: "שפת קודש שמית עתיקה ששימשה לתפילה ולכתבי הקודש של ביתא ישראל. אינה מדוברת היום אך חיה בליטורגיה.",
      en: "An ancient Semitic liturgical language used for prayer and scripture by Beta Israel. No longer spoken, but alive in liturgy.",
      am: "የቤታ እስራኤል ጸሎትና ቅዱሳት መጻሕፍት የተጻፉበት ጥንታዊ የሴማዊ ቋንቋ። ዛሬ የማይነገር ቢሆንም በአምልኮ ሕያው ነው።",
    },
    relatedRights: [],
    relatedTerms: ["orit", "kessim", "beta-israel"],
    sources: [
      {
        title: "Britannica — Geʿez language",
        url: "https://www.britannica.com/topic/Geez-language",
      },
    ],
    bodies: {
      he: `## מה זה געז?

ה**געז** (ግዕዝ) היא שפה שמית עתיקה ממשפחת השפות האתיופיות-שמיות. שימשה כשפה המדוברת באקסום הקדומה, ובהמשך הפכה לשפת קודש וליטורגיה — בדומה למעמד הלטינית בנצרות או העברית הקלאסית.

## הקשר ליהדות אתיופיה

עבור ביתא ישראל, הגעז היא **שפת הקודש**:

- ה**אוריית** (התורה) כתובה בגעז
- התפילות והברכות נאמרות בגעז
- הקייסים לומדים לקרוא ולהתפלל בה

הגעז אינה השפה היומיומית של הקהילה — בבית דיברו **אמהרית** או **תיגרינית**, אך התפילה נשמרה בגעז כשפת הקודש.

## כתב הגעז (פידל)

הגעז נכתבת באלפבית ההברתי הנקרא **פידל**, בו כל סימן מייצג עיצור + תנועה. אותו כתב משמש גם לאמהרית ולתיגרינית.

## מעמד היום

הגעז כמעט ואינה מדוברת בשום מקום כשפת אם. בישראל היא חיה בעיקר בתפילות הקייסים ובחגים כמו הסיגד. שימור הגעז נחשב לחלק חשוב בשמירת המורשת.

## ראו גם

- [אוריית](/he/glossary/orit) — הספר הקדוש הכתוב בגעז
- [קייסים](/he/glossary/kessim) — שומרי שפת התפילה
`,
      en: `## What is Ge'ez?

**Ge'ez** (ግዕዝ) is an ancient Semitic language of the Ethiopian-Semitic family. It was the spoken language of the ancient Aksumite kingdom and later became a sacred liturgical language — comparable to the role of Latin in Christianity or Classical Hebrew.

## Relationship to Ethiopian Judaism

For Beta Israel, Ge'ez is the **language of the sacred**:

- The **Orit** (Torah) is written in Ge'ez
- Prayers and blessings are recited in Ge'ez
- The Kessim train to read and pray in it

Ge'ez was not the everyday language of the community — at home people spoke **Amharic** or **Tigrinya** — but prayer was preserved in Ge'ez.

## The Ge'ez script (Fidel)

Ge'ez is written in a syllabic alphabet called **Fidel**, where each character represents a consonant + vowel. The same script is used for Amharic and Tigrinya.

## Status today

Ge'ez is virtually no longer anyone's native tongue. In Israel it survives mainly in the Kessim's prayers and at festivals such as Sigd. Preserving Ge'ez is considered an important part of preserving heritage.

## See also

- [Orit](/en/glossary/orit) — the sacred book written in Ge'ez
- [Kessim](/en/glossary/kessim) — keepers of the prayer language
`,
      am: `## ግዕዝ ምንድ ነው?

**ግዕዝ** ጥንታዊ የሴማዊ ቋንቋ ነው። በጥንቱ የአክሱም መንግሥት ይነገር ነበር፣ በኋላም የቅዱሳት መጻሕፍትና የአምልኮ ቋንቋ ሆነ።

## ከኢትዮጵያ አይሁድነት ጋር ያለው ግንኙነት

ለቤታ እስራኤል ግዕዝ **የቅዱስ ቋንቋ** ነው፦

- **ኦሪት** በግዕዝ ተጽፏል
- ጸሎቶችና ምርቃቶች በግዕዝ ይነገራሉ
- ቄሶቹ በግዕዝ ለማንበብና ለመጸለይ ይሰለጥናሉ

በቤት ውስጥ ግን **አማርኛ** ወይም **ትግርኛ** ይነገር ነበር። ግዕዝ የሚጻፈው **ፊደል** በተባለ ፊደል ነው። ዛሬ ግዕዝ በቄሶቹ ጸሎትና በሰግድ ያህል ሕያው ነው።
`,
    },
  },

  // 3. טנא בריאות — ארגון בריאות (new slug to avoid collision with "tene-briut")
  {
    slug: "tene-health-org",
    category: "organization",
    term: { he: "טנא בריאות", en: "Tene Briut", am: "ጤና ብሪኡት" },
    summary: {
      he: "עמותה לקידום בריאות בקהילת יוצאי אתיופיה — מתאמי בריאות דוברי אמהרית, מניעת סוכרת ולחץ דם וקידום מודעות.",
      en: "A nonprofit promoting health in the Ethiopian-Israeli community — Amharic-speaking health mediators, diabetes and hypertension prevention.",
      am: "በኢትዮጵያ-እስራኤል ማህበረሰብ ጤናን የሚያስፋፋ ድርጅት — አማርኛ ተናጋሪ የጤና አስታራቂዎች፣ የስኳርና ደም ግፊት መከላከል።",
    },
    relatedRights: [],
    relatedTerms: ["hba1c", "gimlat-siud"],
    sources: [{ title: "טנא בריאות — אתר רשמי", url: "https://www.tene-briut.org.il/" }],
    bodies: {
      he: `## מה זה טנא בריאות?

**טנא בריאות** היא עמותה ותיקה הפועלת לקידום הבריאות בקרב יוצאי אתיופיה בישראל. השם "טנא" באמהרית פירושו "בריאות". העמותה גושרת בין מערכת הבריאות הישראלית לבין הקהילה, תוך התאמה תרבותית ולשונית.

## מה הם עושים?

- **מתאמי בריאות (מגשרים)** דוברי אמהרית, המלווים מטופלים מול קופות החולים והמרפאות
- תוכניות **מניעת סוכרת ולחץ דם** — שתי מחלות נפוצות בקהילה
- סדנאות תזונה, פעילות גופנית ובריאות נפש
- הכשרות לצוותי רפואה על רגישות תרבותית

## למה זה חשוב?

מחסומי שפה ופערי אמון מול הממסד הרפואי עלולים לפגוע בטיפול. מתאם בריאות דובר אמהרית מסייע להבין אבחנות, הוראות תרופתיות ומדדים כמו [HbA1c](/he/glossary/hba1c) בניהול סוכרת.

## איך פונים?

ניתן לפנות לטנא בריאות דרך האתר הרשמי, ולברר על שירותי גישור ותוכניות במחוז המגורים.

> אזהרה: המידע כאן כללי בלבד ואינו תחליף לייעוץ רפואי. בכל בעיה רפואית פנו לרופא/ה או לקופת החולים.

## ראו גם

- [HbA1c](/he/glossary/hba1c) — מדד מרכזי בניהול סוכרת
`,
      en: `## What is Tene Briut?

**Tene Briut** ("Tene" means "health" in Amharic) is a veteran nonprofit promoting health among Ethiopian-Israelis. It bridges the Israeli healthcare system and the community with cultural and linguistic adaptation.

## What do they do?

- **Amharic-speaking health mediators** who accompany patients at HMOs and clinics
- **Diabetes and hypertension prevention** programs — two conditions common in the community
- Workshops on nutrition, physical activity and mental health
- Cultural-competency training for medical staff

## Why it matters

Language barriers and mistrust of the medical establishment can harm care. An Amharic-speaking health mediator helps patients understand diagnoses, medication instructions and metrics such as [HbA1c](/en/glossary/hba1c) in diabetes management.

## How to reach them

Contact Tene Briut through their official website to ask about mediation services and programs in your district.

> Disclaimer: This information is general only and is not a substitute for medical advice. For any medical issue, consult a doctor or your HMO.

## See also

- [HbA1c](/en/glossary/hba1c) — a key metric in diabetes management
`,
      am: `## ጤና ብሪኡት ምንድ ነው?

**ጤና ብሪኡት** ("ጤና" በአማርኛ ጤንነት ማለት ነው) በኢትዮጵያ-እስራኤላውያን መካከል ጤናን የሚያስፋፋ ድርጅት ነው። የእስራኤልን የጤና ሥርዓትና ማህበረሰቡን ያገናኛል።

## ምን ይሰራሉ?

- አማርኛ ተናጋሪ **የጤና አስታራቂዎች** በሆስፒታልና ክሊኒክ ታካሚዎችን ይረዳሉ
- የ**ስኳርና ደም ግፊት** መከላከል ፕሮግራሞች
- የአመጋገብ፣ የአካል ብቃትና የአእምሮ ጤና ስልጠናዎች

ቋንቋ መሰናክልና እምነት ማጣት ሕክምናን ሊጎዳ ይችላል። አስታራቂ የ[HbA1c](/am/glossary/hba1c) ያሉ መለኪያዎችን ለመረዳት ይረዳል።

> ማስጠንቀቂያ፦ ይህ መረጃ አጠቃላይ ነው፤ የሕክምና ምክር ምትክ አይደለም።
`,
    },
  },

  // 4. IAEJ — אגודת יהודי אתיופיה
  {
    slug: "iaej",
    category: "organization",
    term: {
      he: "אגודת יהודי אתיופיה (IAEJ)",
      en: "Israeli Association for Ethiopian Jews (IAEJ)",
      am: "የእስራኤል የኢትዮጵያ አይሁዶች ማህበር (IAEJ)",
    },
    summary: {
      he: "ארגון סנגור (advocacy) הפועל לשוויון הזדמנויות ולמיצוי זכויות של יוצאי אתיופיה בחינוך, תעסוקה ושירותים.",
      en: "An advocacy organization working for equal opportunity and rights realization for Ethiopian-Israelis in education, employment and services.",
      am: "ለኢትዮጵያ-እስራኤላውያን በትምህርት፣ ሥራና አገልግሎቶች እኩል እድልና መብት የሚሟገት ድርጅት።",
    },
    relatedRights: [],
    relatedTerms: ["fair-representation", "tebeka"],
    sources: [
      {
        title: "IAEJ — Israeli Association for Ethiopian Jews",
        url: "https://www.iaej.co.il/",
      },
    ],
    bodies: {
      he: `## מה זה IAEJ?

**אגודת יהודי אתיופיה** (IAEJ — Israeli Association for Ethiopian Jews) היא ארגון סנגור ותיק הפועל לקידום שוויון הזדמנויות ולמיצוי זכויות של יוצאי אתיופיה בישראל. הארגון משלב עבודה ברמת המדיניות (סנגור מול משרדי ממשלה) עם סיוע פרטני.

## תחומי פעילות

- **חינוך** — צמצום פערים, מניעת נשירה, ליווי תלמידים ומשפחות
- **תעסוקה וכלכלה** — קידום [ייצוג הולם](/he/glossary/fair-representation) במגזר הציבורי והפרטי
- **מיצוי זכויות** — סיוע במימוש זכויות מול הביטוח הלאומי, הרשויות והשירותים
- **מדיניות** — ניירות עמדה, מחקר ושינוי חקיקה

## איך זה עוזר לי?

אם נתקלתם בקושי במימוש זכות, באפליה או בפער בשירות — ניתן לפנות לארגון לקבלת מידע, ליווי או הפניה.

## ראו גם

- [ייצוג הולם](/he/glossary/fair-representation) — עיקרון מרכזי בעבודת הארגון
- [טבקה](/he/glossary/tebeka) — סיוע משפטי משלים
`,
      en: `## What is the IAEJ?

The **Israeli Association for Ethiopian Jews (IAEJ)** is a veteran advocacy organization advancing equal opportunity and rights realization for Ethiopian-Israelis. It combines policy-level work (advocacy toward government ministries) with individual assistance.

## Areas of activity

- **Education** — closing gaps, preventing dropout, supporting students and families
- **Employment and economy** — promoting [fair representation](/en/glossary/fair-representation) in the public and private sectors
- **Rights realization** — help asserting rights with the National Insurance Institute, authorities and services
- **Policy** — position papers, research and legislative change

## How it helps me

If you have faced difficulty exercising a right, discrimination, or a service gap, you can contact the organization for information, accompaniment or referral.

## See also

- [Fair representation](/en/glossary/fair-representation) — a core principle of the organization's work
- [Tebeka](/en/glossary/tebeka) — complementary legal aid
`,
      am: `## IAEJ ምንድ ነው?

**የእስራኤል የኢትዮጵያ አይሁዶች ማህበር (IAEJ)** ለኢትዮጵያ-እስራኤላውያን እኩል እድልና መብት ማስከበር የሚሰራ ድርጅት ነው። በፖሊሲ ደረጃ ከግለሰብ እርዳታ ጋር ያጣምራል።

## የሥራ ዘርፎች

- **ትምህርት** — ክፍተት መቀነስ፣ መነጠፍ መከላከል
- **ሥራና ኢኮኖሚ** — [ተገቢ ውክልና](/am/glossary/fair-representation) ማስፋፋት
- **መብት ማስከበር** — ከብሔራዊ ኢንሹራንስና ባለሥልጣናት ጋር እርዳታ
- **ፖሊሲ** — የአቋም ሰነዶችና የሕግ ለውጥ

መብትዎን በማስከበር ቸግር ካለ ለመረጃና ለማጀብ ወደ ድርጅቱ መደወል ይችላሉ።
`,
    },
  },

  // 5. ENP — הפרויקט הלאומי (distinct slug from existing "enp")
  {
    slug: "enp-national-project",
    category: "program",
    term: {
      he: "הפרויקט הלאומי לקהילה האתיופית (ENP)",
      en: "Ethiopian National Project (ENP)",
      am: "የኢትዮጵያ ብሔራዊ ፕሮጀክት (ENP)",
    },
    summary: {
      he: "שותפות בין הממשלה, הסוכנות היהודית, הפדרציות והקהילה — מתמקדת בחיזוק בני נוער, מצוינות לימודית ומעורבות הורים.",
      en: "A partnership of government, the Jewish Agency, federations and the community — focused on youth empowerment, academic excellence and parent involvement.",
      am: "በመንግሥት፣ በአይሁድ ኤጀንሲ፣ በፌዴሬሽኖችና በማህበረሰቡ መካከል ሽርክና — በወጣቶች ማብቃት፣ በትምህርት ብቃትና በወላጆች ተሳትፎ ላይ ያተኩራል።",
    },
    relatedRights: [],
    relatedTerms: ["fidel", "fair-representation", "iaej"],
    sources: [{ title: "ENP — הפרויקט הלאומי", url: "https://www.enp.org.il/" }],
    bodies: {
      he: `## מה זה ENP?

**הפרויקט הלאומי לקהילה האתיופית** (Ethiopian National Project) הוא שותפות רחבה בין ממשלת ישראל, הסוכנות היהודית, פדרציות יהודיות בעולם, ונציגי הקהילה. מטרתו לצמצם פערים ולחזק את ההצלחה החברתית-כלכלית של בני הקהילה.

## תוכניות עיקריות

- **SPACE** — תוכנית העשרה לימודית אחר-הצהריים לחיזוק הישגים בבתי ספר
- **מרכזי נוער (Youth Outreach Centers)** — מסגרות לבני נוער בשעות הפנאי, מניעת נשירה והתנהגות סיכון
- **מעורבות הורים** — חיזוק קשר בין ההורים למערכת החינוך
- **מנהיגות צעירה** — פיתוח דור מנהיגים מהקהילה

## למי זה מתאים?

בעיקר לבני נוער ולמשפחות בערים עם קהילה גדולה. ההשתתפות לרוב דרך בית הספר, הרשות המקומית או מרכז הנוער המקומי.

## ראו גם

- [פידל](/he/glossary/fidel) — ארגון חינוך משלים
- [IAEJ](/he/glossary/iaej) — סנגור על מדיניות חינוך
`,
      en: `## What is ENP?

The **Ethiopian National Project (ENP)** is a broad partnership between the Israeli government, the Jewish Agency, Jewish federations abroad, and community representatives. Its goal is to close gaps and strengthen the social and economic success of community members.

## Main programs

- **SPACE** — an after-school academic enrichment program to boost school achievement
- **Youth Outreach Centers** — leisure-time frameworks for youth, preventing dropout and risk behavior
- **Parent involvement** — strengthening the link between parents and the education system
- **Young leadership** — developing a generation of community leaders

## Who is it for?

Mainly youth and families in cities with a sizeable community. Participation is usually via the school, the local authority or the local youth center.

## See also

- [Fidel](/en/glossary/fidel) — a complementary education organization
- [IAEJ](/en/glossary/iaej) — advocacy on education policy
`,
      am: `## ENP ምንድ ነው?

**የኢትዮጵያ ብሔራዊ ፕሮጀክት (ENP)** በእስራኤል መንግሥት፣ በአይሁድ ኤጀንሲ፣ በውጭ ፌዴሬሽኖችና በማህበረሰብ ተወካዮች መካከል ሰፊ ሽርክና ነው። ዓላማው ክፍተቶችን መቀነስና የማህበረሰቡን ስኬት ማጠናከር ነው።

## ዋና ፕሮግራሞች

- **SPACE** — ከትምህርት በኋላ የማበልጸግ ፕሮግራም
- **የወጣቶች ማዕከላት** — መነጠፍን ለመከላከል
- **የወላጆች ተሳትፎ**
- **የወጣት አመራር**

በዋናነት ለወጣቶችና ለቤተሰቦች ነው።
`,
    },
  },

  // 6. פידל — ארגון חינוך
  {
    slug: "fidel",
    category: "organization",
    term: { he: "פידל", en: "Fidel", am: "ፊደል" },
    summary: {
      he: "עמותת חינוך לקידום שילובם של יוצאי אתיופיה במערכת החינוך — ליווי תלמידים, גישור בית-ספר-משפחה והכשרת מורים.",
      en: "An education nonprofit advancing the integration of Ethiopian-Israelis in schools — student mentoring, school-family mediation and teacher training.",
      am: "የኢትዮጵያ-እስራኤላውያንን በትምህርት ሥርዓት ለማዋሃድ የሚሰራ የትምህርት ድርጅት።",
    },
    relatedRights: [],
    relatedTerms: ["enp-national-project", "iaej", "geez"],
    sources: [{ title: "פידל — שילוב במערכת החינוך", url: "https://www.fidel.org.il/" }],
    bodies: {
      he: `## מה זה פידל?

**פידל** היא עמותת חינוך הפועלת לקידום שילובם המיטבי של ילדי ובני נוער יוצאי אתיופיה במערכת החינוך הישראלית. השם "פידל" הוא שמו של אלפבית הגעז והאמהרית — סמל ללמידה ולאוריינות.

## מה הם עושים?

- **רכזי חינוך וגישור** בין בתי הספר, התלמידים והמשפחות
- ליווי אישי לתלמידים בסיכון לנשירה
- סיוע להורים בהבנת מערכת החינוך וזכויותיהם
- הכשרות לצוותי הוראה בנושא רגישות תרבותית ומאבק בגזענות

## למה גישור חשוב?

פערי שפה ותרבות בין ההורים לבין מערכת החינוך עלולים להוביל לאי-הבנות. רכז גישור דובר אמהרית מסייע להורים להשתתף בישיבות, להבין הערכות ולהיות שותפים אמיתיים בחינוך הילד.

## ראו גם

- [ENP](/he/glossary/enp-national-project) — שותפות חינוך רחבה יותר
- [געז](/he/glossary/geez) — מקור השם "פידל"
`,
      en: `## What is Fidel?

**Fidel** is an education nonprofit working to advance the integration of Ethiopian-Israeli children and youth in the Israeli education system. The name "Fidel" is the name of the Ge'ez and Amharic alphabet — a symbol of learning and literacy.

## What do they do?

- **Education coordinators and mediators** between schools, students and families
- Personal mentoring for students at risk of dropping out
- Helping parents understand the education system and their rights
- Training for teaching staff on cultural sensitivity and combating racism

## Why mediation matters

Language and cultural gaps between parents and schools can lead to misunderstandings. An Amharic-speaking mediator helps parents take part in meetings, understand assessments and become genuine partners in their child's education.

## See also

- [ENP](/en/glossary/enp-national-project) — a broader education partnership
- [Ge'ez](/en/glossary/geez) — origin of the name "Fidel"
`,
      am: `## ፊደል ምንድ ነው?

**ፊደል** የኢትዮጵያ-እስራኤላውያን ልጆችንና ወጣቶችን በትምህርት ሥርዓት ለማዋሃድ የሚሰራ ድርጅት ነው። ስሙ የግዕዝና የአማርኛ ፊደል ስም ነው — የመማርና የማንበብ ምልክት።

## ምን ይሰራሉ?

- በትምህርት ቤት፣ ተማሪዎችና ቤተሰቦች መካከል **አስታራቂዎች**
- መነጠፍ ሊገጥማቸው ለሚችሉ ተማሪዎች ድጋፍ
- ወላጆች ሥርዓቱንና መብታቸውን እንዲረዱ መርዳት
- ለመምህራን የባህል ግንዛቤ ስልጠና
`,
    },
  },

  // 7. ייצוג הולם
  {
    slug: "fair-representation",
    category: "program",
    term: { he: "ייצוג הולם", en: "Fair / Adequate Representation", am: "ተገቢ ውክልና" },
    summary: {
      he: "עיקרון משפטי המחייב ייצוג של קבוצות מסוימות — כולל יוצאי אתיופיה — בשירות הציבורי בהתאם לחלקן באוכלוסייה.",
      en: "A legal principle requiring representation of certain groups — including Ethiopian-Israelis — in the public service proportional to their share of the population.",
      am: "የተወሰኑ ቡድኖችን — የኢትዮጵያ-እስራኤላውያንን ጨምሮ — በሕዝብ አገልግሎት ውክልና እንዲኖራቸው የሚያስገድድ የሕግ መርህ።",
    },
    relatedRights: [],
    relatedTerms: ["iaej", "enp-national-project", "btl"],
    sources: [
      {
        title: "נציבות שירות המדינה — ייצוג הולם",
        url: "https://www.gov.il/he/departments/topics/proper_representation",
      },
    ],
    bodies: {
      he: `## מה זה ייצוג הולם?

**ייצוג הולם** הוא עיקרון משפטי ומדיניות לפיו על המעסיק הציבורי לפעול שקבוצות מסוימות יהיו מיוצגות בקרב עובדיו בהתאם לחלקן באוכלוסייה. בין הקבוצות הזכאיות: בני הקהילה האתיופית, ערבים, אנשים עם מוגבלות, חרדים ועוד.

## איך זה עובד?

- חוק שירות המדינה (מינויים) ותקנותיו קובעים יעדי ייצוג למשרדי הממשלה ולגופים ציבוריים
- מותר לתת **העדפה מתקנת** למועמד מקבוצה מתת-ייצוג כאשר הכישורים דומים
- חלק מהמכרזים מיועדים **ייעודית** לבני קבוצות זכאיות

## איך מממשים?

- חפשו מכרזים המסומנים "מיועד לבני הקהילה האתיופית" באתר נציבות שירות המדינה
- ציינו את זכאותכם בעת ההגשה
- ארגונים כמו [IAEJ](/he/glossary/iaej) מסייעים בליווי ובמידע

## ראו גם

- [IAEJ](/he/glossary/iaej) — סנגור לקידום ייצוג הולם
`,
      en: `## What is fair representation?

**Fair (adequate) representation** is a legal and policy principle requiring public employers to ensure that certain groups are represented among their staff in proportion to their share of the population. Eligible groups include the Ethiopian community, Arabs, people with disabilities, the ultra-Orthodox and others.

## How does it work?

- The Civil Service (Appointments) Law and its regulations set representation targets for ministries and public bodies
- **Affirmative action** is permitted — preferring a candidate from an under-represented group when qualifications are similar
- Some tenders are **designated exclusively** for members of eligible groups

## How to use it

- Look for tenders marked "designated for members of the Ethiopian community" on the Civil Service Commission website
- State your eligibility when applying
- Organizations such as [IAEJ](/en/glossary/iaej) help with guidance and information

## See also

- [IAEJ](/en/glossary/iaej) — advocacy for fair representation
`,
      am: `## ተገቢ ውክልና ምንድ ነው?

**ተገቢ ውክልና** የተወሰኑ ቡድኖች በሕዝብ አገልግሎት ሰራተኞች መካከል በሕዝብ ብዛታቸው መጠን እንዲወከሉ የሚያስገድድ የሕግ መርህ ነው። ብቁ ቡድኖች የኢትዮጵያ ማህበረሰብን፣ አረቦችን፣ አካል ጉዳተኞችን ያካትታሉ።

## እንዴት ይሰራል?

- ሕጉ ለመንግሥት መሥሪያ ቤቶች የውክልና ግቦች ያስቀምጣል
- ችሎታ ተመሳሳይ ሲሆን **ማስተካከያ ቅድሚያ** ይፈቀዳል
- አንዳንድ ጨረታዎች **በተለይ** ለብቁ ቡድኖች ናቸው

በማመልከቻ ጊዜ ብቁነትዎን ይግለጹ። ለእርዳታ [IAEJ](/am/glossary/iaej) ያነጋግሩ።
`,
    },
  },

  // 8. סל קליטה
  {
    slug: "sal-klita",
    category: "program",
    term: {
      he: "סל קליטה",
      en: "Absorption Basket (Sal Klita)",
      am: "የመቀበያ ቅርጫት (ሳል ክሊጣ)",
    },
    summary: {
      he: "סיוע כספי ראשוני שמעניקה המדינה לעולים חדשים בחודשי הקליטה הראשונים, לכיסוי הוצאות מחיה ראשוניות.",
      en: "Initial financial assistance the state grants new immigrants in the first absorption months to cover basic living costs.",
      am: "መንግሥት ለአዲስ ስደተኞች በመጀመሪያ ወራት የሚሰጥ የመጀመሪያ የገንዘብ እርዳታ።",
    },
    relatedRights: [],
    relatedTerms: ["btl", "igeret-bikur", "jewish-agency"],
    sources: [
      {
        title: "משרד העלייה והקליטה — סל קליטה",
        url: "https://www.gov.il/he/departments/topics/absorption_basket",
      },
    ],
    bodies: {
      he: `## מה זה סל קליטה?

**סל קליטה** הוא מענק כספי שמעניקה המדינה — דרך משרד העלייה והקליטה — לכל עולה חדש בחודשי הקליטה הראשונים. מטרתו לסייע בהוצאות המחיה הבסיסיות עד להשתלבות בעבודה.

## מה כולל הסל?

- **תשלום ראשון** המתקבל בנמל התעופה או סמוך לעלייה
- **תשלומים חודשיים** לאורך כ-6 חודשים, בסכום המשתנה לפי הרכב המשפחה
- זכאות נלווית לאולפן עברית, סיוע בדיור ועוד

## דברים שחשוב לדעת

- הסכומים והתנאים מתעדכנים — בדקו תמיד באתר משרד העלייה והקליטה
- יש לפתוח חשבון בנק לקבלת התשלומים
- שמרו על מסמכי העלייה ([אגרת ביקור](/he/glossary/igeret-bikur) ותעודת עולה)

## ראו גם

- [ביטוח לאומי (BTL)](/he/glossary/btl) — קצבאות נלוות לעולה
- [הסוכנות היהודית](/he/glossary/jewish-agency) — מלווה את תהליך העלייה
`,
      en: `## What is the Absorption Basket?

The **Absorption Basket (Sal Klita)** is a cash grant the state — through the Ministry of Aliyah and Integration — gives every new immigrant in the first absorption months. It helps cover basic living costs until the immigrant integrates into work.

## What does it include?

- An **initial payment** received at the airport or soon after arrival
- **Monthly payments** over roughly 6 months, varying by family composition
- Associated eligibility for Hebrew ulpan, housing assistance and more

## Things to know

- Amounts and terms are updated — always check the Ministry of Aliyah and Integration website
- A bank account must be opened to receive payments
- Keep your immigration documents (the [Visit Certificate](/en/glossary/igeret-bikur) and immigrant ID)

## See also

- [National Insurance (BTL)](/en/glossary/btl) — accompanying allowances for immigrants
- [Jewish Agency](/en/glossary/jewish-agency) — accompanies the aliyah process
`,
      am: `## ሳል ክሊጣ ምንድ ነው?

**ሳል ክሊጣ** (የመቀበያ ቅርጫት) መንግሥት ለእያንዳንዱ አዲስ ስደተኛ በመጀመሪያ ወራት የሚሰጥ የገንዘብ ድጎማ ነው። መሰረታዊ የመኖሪያ ወጪዎችን ለመሸፈን ይረዳል።

## ምን ያካትታል?

- በአውሮፕላን ማረፊያ **የመጀመሪያ ክፍያ**
- ለ6 ወራት ያህል **ወርሃዊ ክፍያዎች**
- ለዕብራይስጥ ኡልፓንና ለመኖሪያ እርዳታ ብቁነት

ክፍያ ለመቀበል የባንክ ሂሳብ መክፈት ያስፈልጋል። የስደት ሰነዶችዎን ይጠብቁ።
`,
    },
  },

  // 9. פינוי-בינוי
  {
    slug: "pinui-binui",
    category: "program",
    term: {
      he: "פינוי-בינוי",
      en: "Pinui-Binui (Evacuate-Rebuild)",
      am: "ፒኑይ-ቢኑይ (ማፍረስ-መልሶ መገንባት)",
    },
    summary: {
      he: "מסלול התחדשות עירונית שבו הורסים מבנים ישנים ובונים חדשים, והדיירים מקבלים דירה חדשה ללא תשלום.",
      en: "An urban-renewal track in which old buildings are demolished and new ones built, with residents receiving a new apartment at no cost.",
      am: "የቆዩ ሕንፃዎች ፈርሰው አዲስ የሚገነቡበት የከተማ ዕድሳት መንገድ፣ ነዋሪዎች አዲስ አፓርትመንት ያለ ክፍያ ያገኛሉ።",
    },
    relatedRights: [],
    relatedTerms: ["lotar", "sal-klita"],
    sources: [
      {
        title: "הרשות הממשלתית להתחדשות עירונית",
        url: "https://www.gov.il/he/departments/urban_renewal_authority",
      },
    ],
    bodies: {
      he: `## מה זה פינוי-בינוי?

**פינוי-בינוי** הוא אחד ממסלולי ההתחדשות העירונית בישראל. מתחם של מבנים ישנים נהרס, ובמקומו נבנה מתחם חדש וצפוף יותר. הדיירים הקיימים **מתפנים זמנית**, ומקבלים בסיום הבנייה דירה חדשה וגדולה יותר — בדרך כלל ללא תשלום מצדם.

## איך זה עובד?

1. יזם מתקשר עם רוב בעלי הדירות במתחם
2. נדרשת הסכמה של רוב מיוחס מהדיירים (לפי החוק)
3. הדיירים עוברים לדיור חלופי בתקופת הבנייה (היזם משלם שכר דירה)
4. בסיום — חזרה לדירה חדשה במגדל מודרני

## דברים שחשוב לבדוק

- מה גודל הדירה החדשה לעומת הקיימת
- מי משלם את שכר הדירה בתקופת הביניים
- האם יש ערבויות בנקאיות להבטחת הזכויות

> מומלץ להיוועץ בעורך דין מקרקעין לפני חתימה על הסכם פינוי-בינוי.

## ראו גם

- [לוט"ר](/he/glossary/lotar) — מסלול דיור משלים לזכאים
`,
      en: `## What is Pinui-Binui?

**Pinui-Binui ("Evacuate-Rebuild")** is one of Israel's urban-renewal tracks. A compound of old buildings is demolished and a new, denser compound is built in its place. Existing residents **temporarily evacuate** and, when construction finishes, receive a new, larger apartment — usually at no cost to them.

## How does it work?

1. A developer contracts with most of the apartment owners in the compound
2. A qualified majority of residents must consent (by law)
3. Residents move to alternative housing during construction (the developer pays rent)
4. On completion — they return to a new apartment in a modern tower

## Things to check

- The size of the new apartment versus the existing one
- Who pays the rent during the interim period
- Whether there are bank guarantees securing the rights

> It is advisable to consult a real-estate lawyer before signing a Pinui-Binui agreement.

## See also

- [Lottery (Lotar)](/en/glossary/lotar) — a complementary housing track for the eligible
`,
      am: `## ፒኑይ-ቢኑይ ምንድ ነው?

**ፒኑይ-ቢኑይ** የቆዩ ሕንፃዎች ፈርሰው አዲስ ይገነባሉ። ነዋሪዎች ጊዜያዊ ይነሳሉ፣ ሥራው ሲጠናቀቅ አዲስና ትልቅ አፓርትመንት — ብዙ ጊዜ ያለ ክፍያ — ይቀበላሉ።

## እንዴት ይሰራል?

1. ገንቢ ከአብዛኞቹ ባለቤቶች ጋር ይዋዋላል
2. የብዙዎች ስምምነት ያስፈልጋል
3. በግንባታ ጊዜ ወደ ሌላ መኖሪያ ይዛወራሉ (ገንቢው ኪራይ ይከፍላል)
4. ሲጠናቀቅ ወደ አዲስ አፓርትመንት ይመለሳሉ

> ከመፈረም በፊት የመሬት ጠበቃ ማማከር ይመከራል።
`,
    },
  },

  // 10. גמלת סיעוד
  {
    slug: "gimlat-siud",
    category: "program",
    term: {
      he: "גמלת סיעוד",
      en: "Long-Term Care Benefit (Gimlat Siud)",
      am: "የእንክብካቤ ጥቅማ ጥቅም (ሲኡድ)",
    },
    summary: {
      he: "קצבה מהביטוח הלאומי לזקנים התלויים בעזרת הזולת בפעולות יומיומיות — ניתנת בעיקר כשירותי טיפול בבית.",
      en: "A National Insurance benefit for elderly people dependent on others for daily activities — provided mainly as in-home care services.",
      am: "በዕለታዊ እንቅስቃሴ የሌላ ሰው እርዳታ ለሚያስፈልጋቸው አዛውንቶች ከብሔራዊ ኢንሹራንስ የሚሰጥ ጥቅም።",
    },
    relatedRights: [],
    relatedTerms: ["btl", "tene-health-org"],
    sources: [
      {
        title: "ביטוח לאומי — גמלת סיעוד",
        url: "https://www.btl.gov.il/benefits/Long_Term_Care/Pages/default.aspx",
      },
    ],
    bodies: {
      he: `## מה זה גמלת סיעוד?

**גמלת סיעוד** היא קצבה שמעניק הביטוח הלאומי לאנשים בגיל פרישה (ומעלה) שזקוקים לעזרת אדם אחר בפעולות יומיומיות — כמו רחצה, הלבשה, אכילה וניידות — או לאנשים הזקוקים להשגחה.

## מה מקבלים?

הגמלה ניתנת ברובה כ**שירותים בעין** ולא ככסף:

- **מטפל/ת בבית** למספר שעות שבועיות
- שירותי יום למבוגרים (מרכז יום)
- אביזרים ומוצרי ספיגה במקרים מסוימים
- במצבים מסוימים — אפשרות לקבל את הגמלה ככסף

## רמת הזכאות

נקבעת לפי מבחן תלות (ADL) ולפי מבחן הכנסה. ככל שהתלות גבוהה יותר — מספר השעות גדל.

## איך מגישים?

- פנייה לסניף [ביטוח לאומי](/he/glossary/btl) או דרך אתר *6050 / 1-700-50-90-00
- הביטוח הלאומי שולח להערכת תלות בבית

> המידע כללי בלבד. הסכומים והתנאים מתעדכנים — בדקו באתר הביטוח הלאומי.

## ראו גם

- [ביטוח לאומי (BTL)](/he/glossary/btl) — הגוף המשלם
`,
      en: `## What is the Long-Term Care Benefit?

The **Long-Term Care Benefit (Gimlat Siud)** is provided by the National Insurance Institute to people of retirement age (and over) who need another person's help with daily activities — such as bathing, dressing, eating and mobility — or who need supervision.

## What do you receive?

The benefit is given mostly as **in-kind services** rather than cash:

- A **home caregiver** for a set number of weekly hours
- Adult day-care services (day center)
- Aids and absorbent products in certain cases
- In some situations — the option to receive the benefit as cash

## Eligibility level

Determined by a dependency (ADL) test and an income test. The greater the dependency, the more hours are granted.

## How to apply

- Contact a [National Insurance (BTL)](/en/glossary/btl) branch or call *6050 / 1-700-50-90-00
- The Institute sends an assessor to evaluate dependency at home

> This information is general only. Amounts and terms are updated — check the National Insurance website.

## See also

- [National Insurance (BTL)](/en/glossary/btl) — the paying body
`,
      am: `## ሲኡድ (የእንክብካቤ ጥቅም) ምንድ ነው?

**ሲኡድ** በዕለታዊ እንቅስቃሴ — እንደ መታጠብ፣ መልበስ፣ መብላትና መንቀሳቀስ — የሌላ ሰው እርዳታ ለሚያስፈልጋቸው አዛውንቶች ከብሔራዊ ኢንሹራንስ የሚሰጥ ጥቅም ነው።

## ምን ይቀበላሉ?

- በቤት ውስጥ **ተንከባካቢ**
- የቀን እንክብካቤ ማዕከል
- ብቁነት በጥገኝነት ፈተናና በገቢ ፈተና ይወሰናል

ለማመልከት ወደ [ብሔራዊ ኢንሹራንስ](/am/glossary/btl) ይደውሉ።

> መረጃው አጠቃላይ ነው።
`,
    },
  },

  // 11. HbA1c
  {
    slug: "hba1c",
    category: "program",
    term: {
      he: "HbA1c — המוגלובין מסוכרר",
      en: "HbA1c (Glycated Hemoglobin)",
      am: "HbA1c (የስኳር ሄሞግሎቢን)",
    },
    summary: {
      he: "בדיקת דם המשקפת את ממוצע רמות הסוכר ב-3 החודשים האחרונים — המדד המרכזי לניהול ומעקב סוכרת.",
      en: "A blood test reflecting average blood-sugar levels over the past 3 months — the key metric for diabetes management.",
      am: "ባለፉት 3 ወራት የስኳር አማካይ መጠን የሚያሳይ የደም ምርመራ — ለስኳር በሽታ ቁጥጥር ዋናው መለኪያ።",
    },
    relatedRights: [],
    relatedTerms: ["tene-health-org", "gimlat-siud"],
    sources: [
      {
        title: "משרד הבריאות — סוכרת",
        url: "https://www.gov.il/he/departments/topics/diabetes",
      },
    ],
    bodies: {
      he: `## מה זה HbA1c?

**HbA1c** (המוגלובין מסוכרר, או "המוגלובין A1c") היא בדיקת דם שמודדת את **ממוצע רמות הסוכר בדם בשלושת החודשים האחרונים**. בניגוד לבדיקת סוכר רגעית, היא נותנת תמונה ארוכת-טווח — ולכן היא המדד המרכזי לאיזון ומעקב אחר סוכרת.

## מה המספרים אומרים?

- **מתחת ל-5.7%** — תקין
- **5.7%–6.4%** — טרום-סוכרת (קדם-סוכרת)
- **6.5% ומעלה** — מעיד על סוכרת
- חולי סוכרת בטיפול שואפים לרוב לערך מתחת ל-7% (היעד נקבע אישית עם הרופא)

## למה זה חשוב לקהילה?

שכיחות הסוכרת בקהילת יוצאי אתיופיה גבוהה יחסית, בין היתר עקב שינוי תזונתי מהיר אחרי העלייה. מעקב HbA1c סדיר מאפשר זיהוי מוקדם ומניעת סיבוכים.

## מה אפשר לעשות?

- בדיקת HbA1c תקופתית בקופת החולים
- תזונה מאוזנת, פעילות גופנית והפחתת סוכר
- ליווי של מתאם בריאות דובר אמהרית ([טנא בריאות](/he/glossary/tene-health-org))

> אזהרה: המידע כללי ואינו תחליף לייעוץ רפואי. התייעצו עם הרופא/ה לגבי היעדים האישיים שלכם.

## ראו גם

- [טנא בריאות](/he/glossary/tene-health-org) — תוכניות מניעת סוכרת בקהילה
`,
      en: `## What is HbA1c?

**HbA1c** (glycated hemoglobin, "hemoglobin A1c") is a blood test that measures the **average blood-sugar level over the past three months**. Unlike a one-time glucose reading, it gives a long-term picture — making it the key metric for diabetes control and follow-up.

## What do the numbers mean?

- **Below 5.7%** — normal
- **5.7%–6.4%** — pre-diabetes
- **6.5% and above** — indicates diabetes
- Diabetics in treatment usually aim below 7% (the target is set individually with the doctor)

## Why it matters to the community

Diabetes prevalence is relatively high among Ethiopian-Israelis, partly due to rapid dietary change after immigration. Regular HbA1c monitoring enables early detection and prevention of complications (eyes, kidneys, blood vessels).

## What you can do

- Periodic HbA1c testing at your HMO
- A balanced diet, physical activity and reduced sugar
- Support from an Amharic-speaking health mediator ([Tene Briut](/en/glossary/tene-health-org))

> Disclaimer: This information is general and not a substitute for medical advice. Consult your doctor about your personal targets.

## See also

- [Tene Briut](/en/glossary/tene-health-org) — community diabetes-prevention programs
`,
      am: `## HbA1c ምንድ ነው?

**HbA1c** **ባለፉት ሦስት ወራት የደም ስኳር አማካይ መጠንን** የሚለካ የደም ምርመራ ነው። ለስኳር በሽታ ቁጥጥር ዋናው መለኪያ ነው።

## ቁጥሮቹ ምን ይላሉ?

- **ከ5.7% በታች** — መደበኛ
- **5.7%–6.4%** — ቅድመ-ስኳር
- **6.5% እና ከዚያ በላይ** — ስኳር በሽታ
- በሕክምና ላይ ያሉ ብዙ ጊዜ ከ7% በታች ይፈልጋሉ

አማርኛ ተናጋሪ አስታራቂ ([ጤና ብሪኡት](/am/glossary/tene-health-org)) ይረዳዎታል።

> ማስጠንቀቂያ፦ የሕክምና ምክር ምትክ አይደለም።
`,
    },
  },

  // 12. מח"ש
  {
    slug: "mahash",
    category: "organization",
    term: {
      he: 'מח"ש — מחלקה לחקירות שוטרים',
      en: "Police Internal Investigations Dept. (Mahash)",
      am: "የፖሊስ ምርመራ መምሪያ (ማሐሽ)",
    },
    summary: {
      he: "מחלקה במשרד המשפטים החוקרת עבירות שביצעו שוטרים — לרבות תלונות על אלימות שוטרים ושימוש בכוח לא מוצדק.",
      en: "A Justice Ministry department investigating offenses by police officers — including complaints of police violence and unjustified use of force.",
      am: "በፍትህ ሚኒስቴር የፖሊስ መኮንኖች የፈጸሙ ጥፋቶችን — የፖሊስ ጥቃት ቅሬታዎችን ጨምሮ — የሚመረምር መምሪያ።",
    },
    relatedRights: [],
    relatedTerms: ["tebeka", "iaej"],
    sources: [
      {
        title: 'משרד המשפטים — מח"ש',
        url: "https://www.gov.il/he/departments/police_investigation_department",
      },
    ],
    bodies: {
      he: `## מה זה מח"ש?

**מח"ש** — המחלקה לחקירות שוטרים — היא יחידה במשרד המשפטים (ולא במשטרה עצמה) שתפקידה לחקור חשד לעבירות פליליות שביצעו שוטרים במהלך מילוי תפקידם. בכלל זה: שימוש לא מוצדק בכוח, אלימות, התעללות, ועבירות נוספות.

## איך מגישים תלונה?

1. ניתן להגיש תלונה ישירות למח"ש (אתר משרד המשפטים) — בכתב, במייל או בטלפון
2. תעדו ככל האפשר: תאריך, שעה, מקום, שמות/מספרי שוטרים, עדים, צילומים
3. שמרו תיעוד רפואי אם נגרמה פגיעה גופנית
4. ניתן להיעזר בעורך דין או בארגון סיוע

## ליווי וסיוע

ארגונים כמו [טבקה](/he/glossary/tebeka) ו-[IAEJ](/he/glossary/iaej) מסייעים בליווי משפטי ובמיצוי זכויות.

> חשוב: אין במידע זה ייעוץ משפטי. בכל מקרה ספציפי מומלץ לפנות לעורך דין.

## ראו גם

- [טבקה](/he/glossary/tebeka) — סיוע משפטי בתביעות אפליה
`,
      en: `## What is Mahash?

**Mahash** — the Police Internal Investigations Department — is a unit within the Justice Ministry (not the police itself) responsible for investigating suspected criminal offenses committed by police officers in the line of duty. This includes unjustified use of force, violence, abuse and other offenses.

## How to file a complaint

1. You can file directly with Mahash (Justice Ministry website) — in writing, by email or by phone
2. Document as much as possible: date, time, place, officers' names/numbers, witnesses, footage
3. Keep medical records if physical harm occurred
4. You may seek help from a lawyer or an aid organization

## Guidance and support

Organizations such as [Tebeka](/en/glossary/tebeka) and [IAEJ](/en/glossary/iaej) help with legal accompaniment and rights realization.

> Important: This is not legal advice. In any specific case it is advisable to consult a lawyer.

## See also

- [Tebeka](/en/glossary/tebeka) — legal aid in discrimination claims
`,
      am: `## ማሐሽ ምንድ ነው?

**ማሐሽ** — የፖሊስ ምርመራ መምሪያ — በፍትህ ሚኒስቴር ውስጥ ያለ ክፍል ሲሆን ፖሊሶች በሥራ ላይ የፈጸሙ ወንጀሎችን ይመረምራል።

## ቅሬታ እንዴት ይቀርባል?

1. በቀጥታ ለማሐሽ — በጽሑፍ፣ በኢሜይል ወይም በስልክ
2. ቀን፣ ሰዓት፣ ቦታ፣ የፖሊስ ቁጥር ይመዝግቡ
3. የሕክምና ሰነድ ይጠብቁ

[ጠበቃ](/am/glossary/tebeka) ይረዳዎታል። > ይህ የሕግ ምክር አይደለም።
`,
    },
  },

  // 13. BTL — ביטוח לאומי
  {
    slug: "btl",
    category: "organization",
    term: {
      he: "ביטוח לאומי (BTL)",
      en: "National Insurance Institute (BTL)",
      am: "ብሔራዊ ኢንሹራንስ (BTL)",
    },
    summary: {
      he: "המוסד לביטוח לאומי — הגוף הממשלתי המשלם קצבאות (זקנה, נכות, ילדים, סיעוד, אבטלה) ומבטיח רשת ביטחון סוציאלי.",
      en: "The National Insurance Institute — the government body paying allowances (old-age, disability, child, long-term care, unemployment) and providing a social safety net.",
      am: "የብሔራዊ ኢንሹራንስ ተቋም — ጥቅማ ጥቅሞችን (እርጅና፣ አካል ጉዳት፣ ልጆች፣ እንክብካቤ) የሚከፍል የመንግሥት አካል።",
    },
    relatedRights: [],
    relatedTerms: ["gimlat-siud", "sal-klita", "fair-representation"],
    sources: [{ title: "המוסד לביטוח לאומי", url: "https://www.btl.gov.il/" }],
    bodies: {
      he: `## מה זה ביטוח לאומי?

**המוסד לביטוח לאומי** (בקיצור **BTL** — Bituach Leumi) הוא הגוף הממשלתי האחראי על מערכת הביטחון הסוציאלי בישראל. הוא גובה דמי ביטוח ומשלם קצבאות שמהוות רשת ביטחון לתושבי המדינה.

## אילו קצבאות הוא משלם?

- **קצבת זקנה** — לאחר גיל הפרישה
- **קצבת נכות** — לאנשים עם ירידה ביכולת ההשתכרות
- **קצבת ילדים** — לכל משפחה עם ילדים
- **[גמלת סיעוד](/he/glossary/gimlat-siud)** — לקשישים תלויים
- **דמי אבטלה, דמי לידה, הבטחת הכנסה** ועוד

## איך פונים?

- מוקד טלפוני: **1201** או *6050
- אתר: btl.gov.il (אזור אישי)
- סניף ביטוח לאומי לפי אזור המגורים — מומלץ לתאם תור מראש

> המידע כללי בלבד. סכומים ותנאים מתעדכנים — בדקו באתר הביטוח הלאומי.

## ראו גם

- [גמלת סיעוד](/he/glossary/gimlat-siud) — קצבה לקשישים תלויים
- [סל קליטה](/he/glossary/sal-klita) — סיוע ראשוני לעולה
`,
      en: `## What is the National Insurance Institute?

The **National Insurance Institute** (Hebrew: Bituach Leumi, **BTL**) is the government body responsible for Israel's social-security system. It collects insurance contributions and pays allowances that form a safety net for residents.

## Which allowances does it pay?

- **Old-age pension** — after retirement age
- **Disability allowance** — for people with reduced earning capacity
- **Child allowance** — for every family with children
- **[Long-Term Care Benefit](/en/glossary/gimlat-siud)** — for dependent elderly
- **Unemployment, maternity, income support** and more

## How to reach them

- Phone center: **1201** or *6050
- Website: btl.gov.il (personal area)
- A National Insurance branch by area of residence — booking ahead is recommended

> This information is general only. Amounts and terms are updated — check the National Insurance website.

## See also

- [Long-Term Care Benefit](/en/glossary/gimlat-siud) — allowance for dependent elderly
- [Absorption Basket](/en/glossary/sal-klita) — initial assistance for immigrants
`,
      am: `## ብሔራዊ ኢንሹራንስ ምንድ ነው?

**ብሔራዊ ኢንሹራንስ ተቋም** (ቢቱዋ ሌዑሚ፣ **BTL**) የእስራኤልን ማህበራዊ ዋስትና ሥርዓት የሚያስተዳድር የመንግሥት አካል ነው።

## ምን ጥቅሞች ይከፍላል?

- **የእርጅና ጡረታ**
- **የአካል ጉዳት ጥቅም**
- **የልጆች ጥቅም**
- **[የእንክብካቤ ጥቅም](/am/glossary/gimlat-siud)**
- ሥራ አጥነት፣ የወሊድ ጥቅም

ለማነጋገር፦ **1201** ወይም *6050

> መረጃው አጠቃላይ ነው።
`,
    },
  },

  // 14. אגרת ביקור
  {
    slug: "igeret-bikur",
    category: "history",
    term: {
      he: "אגרת ביקור",
      en: "Visit Certificate (Igeret Bikur)",
      am: "የጉብኝት ሰነድ (አገሬት ቢኩር)",
    },
    summary: {
      he: "מסמך זהות זמני שהונפק לעולים מאתיופיה בתחילת תהליך העלייה, לפני קבלת תעודת זהות ישראלית קבועה.",
      en: "A temporary identity document issued to immigrants from Ethiopia at the start of the aliyah process, before receiving a permanent Israeli ID.",
      am: "ቋሚ የእስራኤል መታወቂያ ከመቀበል በፊት ለኢትዮጵያ ስደተኞች የተሰጠ ጊዜያዊ የመለያ ሰነድ።",
    },
    relatedRights: [],
    relatedTerms: ["sal-klita", "jewish-agency", "falash-mura"],
    sources: [
      {
        title: "רשות האוכלוסין וההגירה",
        url: "https://www.gov.il/he/departments/population_and_immigration_authority",
      },
    ],
    bodies: {
      he: `## מה זה אגרת ביקור?

**אגרת ביקור** הוא סוג של מסמך זהות זמני שהונפק לעולים — ובהקשר הקהילה האתיופית, לרבים מבני הקהילה ומ**הפלשמורה** — בשלבים הראשונים של תהליך העלייה והקליטה, לפני שהונפקה תעודת זהות ישראלית קבועה.

## משמעות היסטורית

המסמך מסמל את **מצב הביניים** של עולים רבים — בין יציאה מאתיופיה לבין קבלת מעמד מלא בישראל. עבור משפחות רבות, אגרת הביקור היא חלק מהזיכרון המשפחתי של מסע העלייה.

## רלוונטיות היום

מי שעדיין מחזיק במסמכי עלייה ישנים — מומלץ לשמור עליהם לצורך מיצוי זכויות, בירור ותק עלייה וזכאות לקצבאות.

## ראו גם

- [פלשמורה](/he/glossary/falash-mura) — קהילה רבים מהם עברו תהליך זה
- [הסוכנות היהודית](/he/glossary/jewish-agency) — ניהול תהליכי העלייה
- [סל קליטה](/he/glossary/sal-klita) — הסיוע בעקבות העלייה
`,
      en: `## What is the Visit Certificate?

The **Visit Certificate (Igeret Bikur)** is a type of temporary identity document issued to immigrants — and, in the Ethiopian context, to many community members and **Falash Mura** — in the early stages of the aliyah and absorption process, before a permanent Israeli ID was issued.

## Historical significance

The document symbolizes the **in-between status** of many immigrants — between leaving Ethiopia and receiving full status in Israel. For many families, the Visit Certificate is part of the family memory of the aliyah journey.

## Relevance today

Anyone still holding old immigration documents is advised to keep them for rights realization, verifying aliyah seniority and allowance eligibility.

## See also

- [Falash Mura](/en/glossary/falash-mura) — many of whom went through this process
- [Jewish Agency](/en/glossary/jewish-agency) — managing the aliyah process
- [Absorption Basket](/en/glossary/sal-klita) — assistance following aliyah
`,
      am: `## አገሬት ቢኩር ምንድ ነው?

**አገሬት ቢኩር** ቋሚ የእስራኤል መታወቂያ ከመስጠቱ በፊት ለስደተኞች — ለ**ፈላሽ ሙራን** ጨምሮ — በዓሊያ ሂደት መጀመሪያ የተሰጠ ጊዜያዊ የመለያ ሰነድ ነው።

## ታሪካዊ ትርጉም

ሰነዱ ብዙ ስደተኞች ከኢትዮጵያ መውጣትና በእስራኤል ሙሉ ደረጃ ማግኘት መካከል የነበሩበትን **መካከለኛ ሁኔታ** ያመለክታል። የቆዩ ሰነዶችዎን ይጠብቁ።
`,
    },
  },

  // 15. ועדות ממשלתיות
  {
    slug: "government-committees-history",
    category: "history",
    term: {
      he: "ועדות ממשלתיות לקהילה האתיופית",
      en: "Government Committees on the Ethiopian Community",
      am: "ስለ ኢትዮጵያ ማህበረሰብ የመንግሥት ኮሚቴዎች",
    },
    summary: {
      he: "סדרת ועדות ממשלתיות שבחנו מדיניות קליטה, אפליה ושוויון כלפי יוצאי אתיופיה והובילו לתוכניות ושינויי מדיניות.",
      en: "A series of government committees that examined absorption policy, discrimination and equality toward Ethiopian-Israelis, leading to programs and policy changes.",
      am: "የመቀበያ ፖሊሲ፣ መድልዎና እኩልነትን የመረመሩ ተከታታይ የመንግሥት ኮሚቴዎች።",
    },
    relatedRights: [],
    relatedTerms: ["fair-representation", "mahash", "iaej"],
    sources: [
      {
        title: "משרד ראש הממשלה — דוחות ועדות",
        url: "https://www.gov.il/he/departments/prime_ministers_office",
      },
    ],
    bodies: {
      he: `## על מה מדובר?

לאורך השנים מינתה ממשלת ישראל **ועדות ממשלתיות ובין-משרדיות** לבחינת מצבם של יוצאי אתיופיה — בתחומי הקליטה, החינוך, התעסוקה, ובמיוחד **מאבק בגזענות ובאפליה**.

## נושאים מרכזיים שנבחנו

- **קליטה ועלייה** — תנאי הקליטה, מרכזי קליטה, סיוע בדיור
- **חינוך** — צמצום פערים, מניעת הפרדה, מניעת נשירה
- **תעסוקה** — קידום [ייצוג הולם](/he/glossary/fair-representation)
- **גזענות ושיטור** — מאבק באפליה ובאלימות שוטרים

## דוגמה משמעותית

בעקבות מחאות בשנים 2015 ו-2019, מונה צוות בין-משרדי למיגור הגזענות נגד יוצאי אתיופיה, שפרסם המלצות בתחומי החינוך, השיטור והתעסוקה.

## ראו גם

- [ייצוג הולם](/he/glossary/fair-representation) — יעד חוזר בדוחות הוועדות
- [מח"ש](/he/glossary/mahash) — חקירת אלימות שוטרים
`,
      en: `## What is this about?

Over the years, the Israeli government has appointed **governmental and inter-ministerial committees** to examine the situation of Ethiopian-Israelis — in absorption, education, employment, and especially the **fight against racism and discrimination**.

## Key topics examined

- **Absorption and aliyah** — absorption conditions, absorption centers, housing aid
- **Education** — closing gaps, preventing segregation and dropout
- **Employment** — promoting [fair representation](/en/glossary/fair-representation)
- **Racism and policing** — combating discrimination and police violence

## A significant example

Following protests in 2015 and 2019, an inter-ministerial team to eradicate racism against Ethiopian-Israelis was appointed and published recommendations in education, policing and employment.

## See also

- [Fair representation](/en/glossary/fair-representation) — a recurring target in committee reports
- [Mahash](/en/glossary/mahash) — investigating police violence
`,
      am: `## ስለ ምንድ ነው?

በዓመታት ውስጥ የእስራኤል መንግሥት የኢትዮጵያ-እስራኤላውያንን ሁኔታ ለመመርመር **የመንግሥት ኮሚቴዎች** ሾሟል። ሪፖርቶቹ ለፖሊሲ ለውጥ አስችለዋል።

## የተመረመሩ ዋና ጉዳዮች

- **መቀበያና ዓሊያ**
- **ትምህርት** — ክፍተት መቀነስ
- **ሥራ** — [ተገቢ ውክልና](/am/glossary/fair-representation)
- **ዘረኝነትና ፖሊስ**
`,
    },
  },

  // 16. לוט"ר — הגרלת דיור
  {
    slug: "lotar",
    category: "program",
    term: {
      he: 'לוט"ר — הגרלת דיור',
      en: "Housing Lottery (Lotar)",
      am: "የመኖሪያ ቤት እጣ (ሎጣር)",
    },
    summary: {
      he: "מנגנון הגרלה לזכאות לרכישת דירה במחיר מוזל במסגרת תוכניות דיור ממשלתיות — מסלול הזדמנות לזוגות צעירים וזכאים.",
      en: "A lottery mechanism for the right to buy a discounted apartment under government housing programs — an opportunity track for young couples and the eligible.",
      am: "በመንግሥት የመኖሪያ ቤት ፕሮግራሞች የተቀነሰ ዋጋ አፓርትመንት ለመግዛት የእጣ ዘዴ።",
    },
    relatedRights: [],
    relatedTerms: ["pinui-binui", "sal-klita", "btl"],
    sources: [
      {
        title: "משרד הבינוי והשיכון — דיור מסובסד",
        url: "https://www.gov.il/he/departments/ministry_of_construction_and_housing",
      },
    ],
    bodies: {
      he: `## מה זה לוט"ר / הגרלת דיור?

במסגרת תוכניות הדיור הממשלתיות (כמו "מחיר למשתכן" וגלגוליה), המדינה משווקת דירות במחיר מוזל. כשהביקוש עולה על ההיצע, הזכאות לרכישה נקבעת ב**הגרלה** ("לוט"ר"). זהו מסלול הזדמנות לרכישת דירה ראשונה במחיר נמוך ממחיר השוק.

## איך זה עובד?

1. **בדיקת זכאות** — קבלת תעודת זכאות (לרוב למחוסרי דירה, זוגות צעירים)
2. **הרשמה להגרלה** באתר הרשמי על פרויקט ספציפי
3. **הגרלה** — הזוכים מקבלים זכות לבחור דירה
4. **רכישה** — חתימה על חוזה, לרוב בליווי משכנתא

## טיפים

- הירשמו מוקדם והכינו את תעודת הזכאות מראש
- בדקו אם אתם זכאים להטבות נוספות (מענקים, סיוע במשכנתא)

> המידע כללי. תנאי התוכניות משתנים — בדקו באתר משרד הבינוי והשיכון.

## ראו גם

- [פינוי-בינוי](/he/glossary/pinui-binui) — מסלול דיור מסוג אחר
`,
      en: `## What is the Housing Lottery (Lotar)?

Under government housing programs (such as "Mehir LaMishtaken" and its successors), the state markets apartments at a discounted price. When demand exceeds supply, the right to buy is determined by a **lottery** ("Lotar"). It is an opportunity track for buying a first apartment below market price.

## How does it work?

1. **Eligibility check** — obtaining an eligibility certificate (usually for those without an apartment, young couples)
2. **Lottery registration** on the official website for a specific project
3. **Lottery** — winners get the right to choose an apartment
4. **Purchase** — signing a contract, usually with a mortgage

## Tips

- Register early and prepare your eligibility certificate in advance
- Check whether you qualify for additional benefits (grants, mortgage assistance)

> This information is general. Program terms change — check the Ministry of Construction and Housing website.

## See also

- [Pinui-Binui](/en/glossary/pinui-binui) — a different kind of housing track
`,
      am: `## ሎጣር (የመኖሪያ ቤት እጣ) ምንድ ነው?

በመንግሥት ፕሮግራሞች አፓርትመንቶች በተቀነሰ ዋጋ ይሸጣሉ። ፍላጎት ከአቅርቦት ሲበልጥ **እጣ** ("ሎጣር") ይወሰናል።

## እንዴት ይሰራል?

1. **የብቁነት ሰነድ** ያግኙ
2. ለፕሮጀክት **ይመዝገቡ**
3. **እጣ** — አሸናፊዎች ይመርጣሉ
4. **ይግዙ**

ቀደም ብለው ይመዝገቡ። > መረጃው አጠቃላይ ነው።
`,
    },
  },

  // 17. אינג'רה — מאכל מסורתי
  {
    slug: "injera",
    category: "tradition",
    term: { he: "אינג'רה", en: "Injera", am: "እንጀራ" },
    summary: {
      he: "לחם שטוח, חמצמץ וספוגי מקמח טף — מאכל היסוד של המטבח האתיופי, מוגש כבסיס לתבשילים (ווט).",
      en: "A flat, spongy, slightly sour flatbread made from teff flour — the staple of Ethiopian cuisine, served as a base for stews (wot).",
      am: "ከጤፍ ዱቄት የሚሰራ ጠፍጣፋ፣ ስፖንጅ መሰል፣ ትንሽ ኮምጣጣ እንጀራ — የኢትዮጵያ ምግብ መሰረት።",
    },
    relatedRights: [],
    relatedTerms: ["geez", "beta-israel", "sigd"],
    sources: [
      {
        title: "אנציקלופדיה — מטבח אתיופי",
        url: "https://www.gov.il/he/departments/topics/ethiopian_jewry",
      },
    ],
    bodies: {
      he: `## מה זה אינג'רה?

ה**אינג'רה** (እንጀራ) היא לחם שטוח, רך, ספוגי ומעט חמצמץ — מאכל היסוד של המטבח האתיופי. היא נאפית על מחבת שטוחה גדולה (מיטאד), ומקבלת את מרקמה המנוקב האופייני מתהליך תסיסה.

## ממה היא עשויה?

- **קמח טף** (teff) — דגן זעיר ועשיר בברזל
- מים ותהליך **תסיסה** של מספר ימים, שמעניק את הטעם החמצמץ

## איך אוכלים?

האינג'רה מוגשת כצלחת ענקית שעליה מונחים תבשילים שונים (**ווט** — תבשילי בשר, עדשים, ירקות). אוכלים ביד: קורעים פיסת אינג'רה ועוטפים בה את האוכל. הארוחה היא חוויה **משותפת ומשפחתית** — כולם אוכלים מאותה צלחת.

## משמעות תרבותית

האינג'רה היא הרבה מעבר למזון — היא חלק מהזהות, מהאירוח ומהקהילתיות. בארוחות חג, בשמחות ובסיגד, האינג'רה במרכז השולחן.

## ראו גם

- [ביתא ישראל](/he/glossary/beta-israel) — הקהילה ששימרה את המטבח
- [סיגד](/he/glossary/sigd) — חג שבו האינג'רה מרכזית בשולחן
`,
      en: `## What is Injera?

**Injera** (እንጀራ) is a soft, spongy, slightly sour flatbread — the staple of Ethiopian cuisine. It is baked on a large flat griddle (mitad) and gets its characteristic perforated texture from a fermentation process.

## What is it made of?

- **Teff flour** — a tiny, iron-rich grain
- Water and a multi-day **fermentation** process that gives the sour taste

## How is it eaten?

Injera is served as a giant platter on which various stews are placed (**wot** — meat, lentil and vegetable stews). It is eaten by hand: you tear a piece of injera and wrap food in it. The meal is a **shared, family experience** — everyone eats from the same platter.

## Cultural significance

Injera is far more than food — it is part of identity, hospitality and communality. At festive meals, celebrations and Sigd, injera is at the center of the table.

## See also

- [Beta Israel](/en/glossary/beta-israel) — the community that preserved the cuisine
- [Sigd](/en/glossary/sigd) — a holiday where injera is central to the table
`,
      am: `## እንጀራ ምንድ ነው?

**እንጀራ** ለስላሳ፣ ስፖንጅ መሰል፣ ትንሽ ኮምጣጣ ጠፍጣፋ ምግብ ነው — የኢትዮጵያ ምግብ መሰረት። በትልቅ ምጣድ ላይ ይጋገራል።

## ከምን ይሰራል?

- **የጤፍ ዱቄት** — ብረት የበዛበት ጥራጥሬ
- ለቀናት የሚቆይ **መፍላት**

## እንዴት ይበላል?

እንጀራ ላይ **ወጥ** ይቀርባል። በእጅ ይበላል፣ ሁሉም ከአንድ ሳህን — **የጋራ የቤተሰብ** ተሞክሮ ነው።
`,
    },
  },

  // 18. הסוכנות היהודית
  {
    slug: "jewish-agency",
    category: "organization",
    term: { he: "הסוכנות היהודית", en: "The Jewish Agency for Israel", am: "የአይሁድ ኤጀንሲ" },
    summary: {
      he: "ארגון יהודי-עולמי האחראי לעודד ולנהל את העלייה לישראל — מילא תפקיד מרכזי במבצעי העלייה מאתיופיה.",
      en: "A global Jewish organization responsible for encouraging and managing aliyah to Israel — played a central role in the Ethiopian aliyah operations.",
      am: "ወደ እስራኤል ዓሊያን የሚያበረታታና የሚያስተዳድር ዓለም አቀፍ የአይሁድ ድርጅት — በኢትዮጵያ ዓሊያ ዘመቻዎች ማዕከላዊ ሚና ተጫውቷል።",
    },
    relatedRights: [],
    relatedTerms: ["operation-moses", "operation-solomon", "sal-klita", "igeret-bikur"],
    sources: [
      { title: "הסוכנות היהודית לארץ ישראל", url: "https://www.jewishagency.org/he/" },
    ],
    bodies: {
      he: `## מה זה הסוכנות היהודית?

**הסוכנות היהודית לארץ ישראל** היא ארגון יהודי-עולמי ותיק שהוקם עוד לפני קום המדינה. אחד מתפקידיה המרכזיים הוא **לעודד, לארגן ולנהל את העלייה** של יהודים מכל העולם לישראל, וללוות את קליטתם הראשונית.

## תפקידה בעליית יהודי אתיופיה

הסוכנות מילאה תפקיד מרכזי במבצעי העלייה ההיסטוריים מאתיופיה:

- **[מבצע משה](/he/glossary/operation-moses)** (1984–1985)
- **[מבצע שלמה](/he/glossary/operation-solomon)** (1991)
- העלאת בני הקהילה דרך מחנות מעבר (גונדר, אדיס אבבה) והפעלת מרכזי קליטה בישראל

## מה הסוכנות עושה עבור עולים?

- ארגון תהליך העלייה והטיסות
- הפעלת **מרכזי קליטה** — מגורים זמניים עם אולפן וליווי
- סיוע ראשוני, יחד עם משרד העלייה והקליטה ([סל קליטה](/he/glossary/sal-klita))

## ראו גם

- [מבצע משה](/he/glossary/operation-moses) ו-[מבצע שלמה](/he/glossary/operation-solomon)
- [סל קליטה](/he/glossary/sal-klita) — הסיוע לעולה החדש
`,
      en: `## What is the Jewish Agency?

**The Jewish Agency for Israel** is a veteran global Jewish organization established even before the founding of the state. One of its central roles is to **encourage, organize and manage the aliyah** of Jews from around the world to Israel, and to accompany their initial absorption.

## Its role in Ethiopian aliyah

The Agency played a central role in the historic aliyah operations from Ethiopia:

- **[Operation Moses](/en/glossary/operation-moses)** (1984–1985)
- **[Operation Solomon](/en/glossary/operation-solomon)** (1991)
- Bringing community members through transit camps (Gondar, Addis Ababa) and operating absorption centers in Israel

## What does the Agency do for immigrants?

- Organizing the aliyah process and flights
- Operating **absorption centers** — temporary housing with ulpan and guidance
- Initial assistance, together with the Ministry of Aliyah and Integration ([Absorption Basket](/en/glossary/sal-klita))

## See also

- [Operation Moses](/en/glossary/operation-moses) and [Operation Solomon](/en/glossary/operation-solomon)
- [Absorption Basket](/en/glossary/sal-klita) — assistance for the new immigrant
`,
      am: `## የአይሁድ ኤጀንሲ ምንድ ነው?

**የአይሁድ ኤጀንሲ** ከመንግሥት መመስረት በፊት የተቋቋመ ዓለም አቀፍ ድርጅት ነው። ዋና ሚናው ወደ እስራኤል **ዓሊያ ማበረታታትና ማስተዳደር** ነው።

## በኢትዮጵያ ዓሊያ ያለው ሚና

- **[ኦፐሬሽን ሙሴ](/am/glossary/operation-moses)** (1984–1985)
- **[ኦፐሬሽን ሰለሞን](/am/glossary/operation-solomon)** (1991)
- የመቀበያ ማዕከላት ማስኬድ

ዛሬም አዲስ ስደተኞችን ይረዳል።
`,
    },
  },

  // 19. גונדר
  {
    slug: "gondar",
    category: "history",
    term: { he: "גונדר", en: "Gondar", am: "ጎንደር" },
    summary: {
      he: "עיר בצפון אתיופיה ומרכז היסטורי של חיי יהודי אתיופיה; שימשה נקודת ריכוז וציפייה לעלייה לישראל.",
      en: "A city in northern Ethiopia and a historic center of Ethiopian-Jewish life; served as a gathering point of those awaiting aliyah to Israel.",
      am: "በሰሜን ኢትዮጵያ የምትገኝ ከተማና የኢትዮጵያ አይሁዶች ሕይወት ታሪካዊ ማዕከል፤ ወደ እስራኤል ዓሊያ የሚጠብቁ መሰብሰቢያ ነበረች።",
    },
    relatedRights: [],
    relatedTerms: [
      "operation-moses",
      "operation-solomon",
      "falash-mura",
      "jewish-agency",
    ],
    sources: [
      {
        title: "אנציקלופדיה — יהדות אתיופיה",
        url: "https://www.gov.il/he/departments/topics/ethiopian_jewry",
      },
    ],
    bodies: {
      he: `## מה זה גונדר?

**גונדר** (ጎንደር) היא עיר היסטורית בצפון אתיופיה, באזור אגם טאנה. סביב גונדר ובכפרים שבמחוז שכנו במשך דורות רבים מבני **ביתא ישראל** — היא אחד המרכזים החשובים ביותר של חיי הקהילה היהודית באתיופיה.

## חשיבות היסטורית

- מרכז גיאוגרפי של ריכוזי יהודים באזור אמהרה
- אזור פעילות של הקייסים, בתי הכנסת ומסורת הקהילה
- נקודת מוצא למסעות העלייה לישראל

## גונדר ומבצעי העלייה

בתקופת **[מבצע משה](/he/glossary/operation-moses)** ו-**[מבצע שלמה](/he/glossary/operation-solomon)**, רבים מבני הקהילה — כולל מ**הפלשמורה** — התרכזו בגונדר ובאדיס אבבה בהמתנה לעלייה.

## משמעות לקהילה היום

עבור משפחות רבות, גונדר היא **עיר השורשים** — המקום ממנו יצא המסע לישראל. השם נושא משמעות רגשית עמוקה של בית, מורשת וגעגוע.

## ראו גם

- [מבצע משה](/he/glossary/operation-moses) — העלייה מסודאן
- [פלשמורה](/he/glossary/falash-mura) — רבים מהם התרכזו בגונדר
- [הסוכנות היהודית](/he/glossary/jewish-agency) — ניהול ההמתנה והעלייה
`,
      en: `## What is Gondar?

**Gondar** (ጎንደር) is a historic city in northern Ethiopia, near Lake Tana. For many generations, members of **Beta Israel** lived in and around Gondar and the villages of the region — it is one of the most important centers of Jewish community life in Ethiopia.

## Historical importance

- A geographic center of Jewish concentrations in the Amhara region
- An area of activity for the Kessim, synagogues and community tradition
- A departure point for the aliyah journeys to Israel

## Gondar and the aliyah operations

During **[Operation Moses](/en/glossary/operation-moses)** and **[Operation Solomon](/en/glossary/operation-solomon)**, many community members — including **Falash Mura** — gathered in Gondar and Addis Ababa awaiting aliyah.

## Significance to the community today

For many families, Gondar is the **city of roots** — the place from which the journey to Israel began. The name carries deep emotional meaning of home, heritage and longing.

## See also

- [Operation Moses](/en/glossary/operation-moses) — the aliyah from Sudan
- [Falash Mura](/en/glossary/falash-mura) — many of whom gathered in Gondar
- [Jewish Agency](/en/glossary/jewish-agency) — managing the waiting and aliyah
`,
      am: `## ጎንደር ምንድ ናት?

**ጎንደር** በሰሜን ኢትዮጵያ፣ በጣና ሐይቅ አካባቢ የምትገኝ ታሪካዊ ከተማ ናት። ለብዙ ትውልዶች የ**ቤታ እስራኤል** አባላት በጎንደርና በአካባቢው ኖረዋል — በኢትዮጵያ የአይሁድ ማህበረሰብ ሕይወት ዋና ማዕከል ናት።

## ታሪካዊ ጠቀሜታ

- በአማራ ክልል የአይሁዶች ማዕከል
- የቄሶችና የሃይማኖት ሕይወት ቦታ
- ወደ እስራኤል ዓሊያ መነሻ

## ለማህበረሰቡ ትርጉም

ለብዙ ቤተሰቦች ጎንደር **የሥር ከተማ** ናት — የቤትና የናፍቆት ጥልቅ ትርጉም አላት።
`,
    },
  },

  // 20. שיטור יתר
  {
    slug: "over-policing",
    category: "history",
    term: { he: "שיטור יתר", en: "Over-Policing", am: "ከመጠን በላይ ፖሊስ" },
    summary: {
      he: "תופעה שבה קבוצה מסוימת חווה אכיפה משטרתית מוגברת ולא פרופורציונלית — סוגיה מרכזית בשיח של הקהילה האתיופית.",
      en: "A phenomenon in which a particular group experiences heightened, disproportionate police enforcement — a central issue in Ethiopian-Israeli discourse.",
      am: "የተወሰነ ቡድን ከመጠን በላይና ተመጣጣኝ ያልሆነ የፖሊስ ቁጥጥር የሚያጋጥመው ክስተት።",
    },
    relatedRights: [],
    relatedTerms: ["mahash", "tebeka", "iaej", "government-committees-history"],
    sources: [
      {
        title: "האגודה לזכויות האזרח (ACRI) — שיטור ואפליה",
        url: "https://www.acri.org.il/",
      },
    ],
    bodies: {
      he: `## מה זה שיטור יתר?

**שיטור יתר** (Over-Policing) מתאר מצב שבו קבוצה מסוימת באוכלוסייה חווה נוכחות משטרתית, עיכובים, חיפושים ואכיפה ב**שיעור גבוה ולא פרופורציונלי** ביחס לחלקה באוכלוסייה. זוהי אחת הסוגיות המרכזיות בשיח הציבורי של הקהילה האתיופית בישראל.

## איך זה בא לידי ביטוי?

- עיכובים ובדיקות תכופים ללא עילה ברורה
- יחס מחמיר יותר כלפי צעירים מהקהילה
- במקרים מסוימים — שימוש לא מידתי בכוח

מחאות בשנים 2015 ו-2019 העלו נושא זה למודעות הציבורית.

## מה אפשר לעשות?

1. **לתעד** — תאריך, שעה, מקום, שמות/מספרי שוטרים, עדים, צילום
2. **להגיש תלונה** ל-[מח"ש](/he/glossary/mahash) במקרה של אלימות או התנהגות אסורה
3. **לפנות לסיוע משפטי** — [טבקה](/he/glossary/tebeka), [IAEJ](/he/glossary/iaej) או [ACRI](https://www.acri.org.il/)
4. **לדעת את הזכויות** — חובת השוטר להזדהות, הזכות לדעת על מה נעצרת/עוכבת

> אין במידע זה ייעוץ משפטי. במקרה ספציפי פנו לעורך דין או לארגון סיוע.

## ראו גם

- [מח"ש](/he/glossary/mahash) — הגוף החוקר תלונות נגד שוטרים
- [טבקה](/he/glossary/tebeka) — סיוע משפטי
`,
      en: `## What is over-policing?

**Over-policing** describes a situation in which a particular population group experiences police presence, stops, searches and enforcement at a **high, disproportionate rate** relative to its share of the population. It is one of the central issues in the public discourse of the Ethiopian community in Israel.

## How does it manifest?

- Frequent stops and checks without a clear basis
- Harsher treatment toward young people from the community
- In some cases — disproportionate use of force

Protests in 2015 and 2019 raised this issue to public awareness.

## What can be done?

1. **Document** — date, time, place, officers' names/numbers, witnesses, footage
2. **File a complaint** with [Mahash](/en/glossary/mahash) in cases of violence or prohibited conduct
3. **Seek legal aid** — [Tebeka](/en/glossary/tebeka), [IAEJ](/en/glossary/iaej) or [ACRI](https://www.acri.org.il/)
4. **Know your rights** — an officer's duty to identify themselves, the right to know why you are stopped/detained

> This is not legal advice. In a specific case, contact a lawyer or an aid organization.

## See also

- [Mahash](/en/glossary/mahash) — the body investigating complaints against officers
- [Tebeka](/en/glossary/tebeka) — legal aid
`,
      am: `## ከመጠን በላይ ፖሊስ ምንድ ነው?

**ከመጠን በላይ ፖሊስ** የተወሰነ ቡድን ከፍተኛና ተመጣጣኝ ያልሆነ የፖሊስ ቁጥጥር የሚያጋጥመው ሁኔታ ነው። በ2015 እና 2019 ተቃውሞዎች ወደ ሕዝብ ግንዛቤ መጥቷል።

## ምን ማድረግ ይቻላል?

1. **ይመዝግቡ** — ቀን፣ ሰዓት፣ የፖሊስ ቁጥር
2. ለ[ማሐሽ](/am/glossary/mahash) **ቅሬታ ያቅርቡ**
3. ለ[ጠበቃ](/am/glossary/tebeka) እርዳታ ይደውሉ

> ይህ የሕግ ምክር አይደለም።
`,
    },
  },
];
