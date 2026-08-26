// Family & Support pillar — typed topic data for the 3 sub-pages.
//
// HE is the source-of-truth locale (CLAUDE.md). EN + AM are mirrors.
// Server-only module — do not import in client bundles.

import type { Locale } from "../i18n/config";

export interface FamilyResource {
  name: string;
  phone?: string;
  url?: string;
  description: Record<Locale, string>;
}

export interface FamilyTopic {
  slug:
    | "domestic-violence"
    | "elderly"
    | "women-empowerment"
    | "emergency-lines-by-city"
    | "single-parents"
    | "elderly-home-care"
    | "children-at-risk"
    | "divorce-rights"
    | "child-support"
    | "daycare-subsidy"
    | "parenting-workshops"
    | "youth-clubs"
    | "community-services-netanya"
    | "community-services-beer-sheva"
    | "community-services-kiryat-malachi"
    | "community-services-lod-ramla"
    | "community-services-jerusalem"
    | "community-services-hadera"
    | "intergenerational-support"
    | "grandmothers-raising-grandchildren"
    | "child-rights-guide"
    | "adoption-foster-care"
    | "child-protection-law"
    | "rent-assistance"
    | "welfare-services-overview"
    | "community-kiryat-gat-paz"
    | "community-services-ashkelon"
    | "community-services-rishon-lezion";
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  body: Record<Locale, string>;
  resources: FamilyResource[];
}

// ── 1. Domestic Violence ───────────────────────────────────────────────────

const DOMESTIC_VIOLENCE: FamilyTopic = {
  slug: "domestic-violence",
  title: {
    he: "אלימות במשפחה — עזרה ותמיכה",
    en: "Domestic Violence — Help and Support",
    am: "የቤት ውስጥ ጥቃት — እርዳታ እና ድጋፍ",
  },
  subtitle: {
    he: "כתובות לשעת חירום, מקלטים, וזכויות משפטיות לנשים מקהילת יוצאי אתיופיה בישראל.",
    en: "Emergency contacts, shelters, and legal rights for Ethiopian women facing domestic violence in Israel.",
    am: "ለኢትዮጵያ ሴቶች በእስራኤል — የቤት ውስጥ ጥቃት ሲያጋጥም፡ ድንገተኛ ስልኮች፣ መጠለያዎች፣ እና ህጋዊ መብቶች።",
  },
  body: {
    he: `אלימות במשפחה היא עבירה פלילית בישראל — ללא קשר לרקע תרבותי או מסורת. חוק מניעת אלימות במשפחה (1991) מאפשר להוציא צו הגנה תוך שעות. אם את בסכנה — חייגי מיד 100 (משטרה) או 1‑800‑22‑0000 (WIZO — קו חינם 24/7).

מחקרים מראים שנשים מקהילת יוצאי אתיופיה מדווחות פחות על אלימות מחשש מסטיגמה קהילתית ומאי ידיעת הזכויות. פנייה לעזרה היא מעשה אומץ ואחריות — לא בגידה. כל הפניות לגורמי הסיוע חסויות.

לפי מרכז המחקר והמידע של הכנסת, שיעור המשפחות ממוצא אתיופי הפונות למרכזי הטיפול באלימות במשפחה, ושיעור הנשים ממוצא אתיופי ששהו במקלטים לנשים מוכות, גבוהים משמעותית מחלקה של הקהילה באוכלוסייה הכללית — נתון המחזק את החשיבות שבפנייה מוקדמת לעזרה, ולא סימן לכך שהתופעה נפוצה יותר בקהילה עצמה.

זכויות בסיסיות:
• זכות לצו הגנה — ניתן לבקש בבית משפט לענייני משפחה או במשטרה. הצו יכול להרחיק את המתעלל מהבית.
• זכות לייצוג משפטי חינם — לנשים שאינן יכולות לממן עורך דין, הלשכה לסיוע משפטי מספקת ייצוג.
• זכות למקלט — מקלטים מספקים לינה, תמיכה נפשית, ייעוץ משפטי, וסיוע בשיקום.
• ילדים עם נשים במקלט — ניתן להגיע עם ילדים; המקלט ידאג גם לצורכיהם.`,
    en: `Domestic violence is a criminal offence in Israel — regardless of cultural background or tradition. The Prevention of Family Violence Law (1991) allows obtaining a protection order within hours. If you are in danger, call the police immediately at 100 or WIZO at 1-800-22-0000 (free line, 24/7).

Research shows that women from the Ethiopian-Israeli community under-report domestic violence due to fear of community stigma and lack of awareness of their rights. Seeking help is an act of courage and responsibility — not betrayal. All referrals to support services are confidential.

According to the Knesset Research and Information Center, the share of Ethiopian-origin families referred to family-violence treatment centers, and the share of Ethiopian-origin women who have stayed in shelters for abused women, are significantly higher than the community's share of the general population — a figure that underscores the importance of seeking help early, not evidence that the phenomenon itself is more common within the community.

Basic rights:
• Right to a protection order — can be requested at the family court or police station. The order can remove the abuser from the home.
• Right to free legal representation — the Legal Aid Bureau provides free representation for women who cannot afford a lawyer.
• Right to a shelter — shelters provide accommodation, psychological support, legal advice, and rehabilitation assistance.
• Children with women in shelters — you may arrive with children; the shelter will care for their needs as well.`,
    am: `የቤት ውስጥ ጥቃት በእስራኤል ወንጀል ነው — ባህላዊ ወይም ሃይማኖታዊ ምክንያቶች ምንም ቢሆኑ። የቤተሰብ ጥቃት መከላከያ ህግ (1991) በጥቂት ሰዓታት ውስጥ የጥበቃ ትዕዛዝ ለማውጣት ያስችላል። አደጋ ውስጥ ከሆኑ — ወዲያው 100 (ፖሊስ) ወይም 1-800-22-0000 (WIZO — ነፃ 24/7) ይደውሉ።

ጥናቶች እንደሚያሳዩ ከኢትዮጵያ ማህበረሰብ የሆኑ ሴቶች ስለ ማህበረሰብ ስቃይ ፍርሃት እና ስለ መብቶቻቸው ስለ ማወቅ ማጣት ጥቃቱን ሪፖርት ማድረጊያ ይቸገራሉ። እርዳታ መጠየቅ ድፍረት እና ሃላፊነት ነው — ክህደት አይደለም።

በክነሴት የምርምር እና መረጃ ማዕከል መሠረት፣ ወደ ቤተሰብ-ጥቃት ህክምና ማዕከሎች የሚላኩ የኢትዮጵያ-ትውልድ ቤተሰቦች ድርሻ፣ እና በተጎዱ ሴቶች መጠለያዎች ውስጥ የቆዩ የኢትዮጵያ-ትውልድ ሴቶች ድርሻ፣ ከጠቅላላ ህዝብ ውስጥ ካለው የማህበረሰቡ ድርሻ በእጅጉ ከፍ ያለ ነው።

መሠረታዊ መብቶች:
• የጥበቃ ትዕዛዝ መብት — ከቤተሰብ ፍርድ ቤት ወይም ፖሊስ ጣቢያ ሊጠየቅ ይችላል።
• ነፃ የህግ ምክር መብት — ጠበቃ ለማምጣት ዕድሉ ለሌላቸው ሴቶች ህጋዊ እርዳታ ቢሮ ነፃ ወኪልነት ያቀርባል።
• ወደ መጠለያ መብት — መጠለያዎች ማደሪያ፣ የስነ-ልቦና ድጋፍ፣ የህግ ምክር፣ እና የመልሶ ማቋቋም ድጋፍ ያቀርባሉ።`,
  },
  resources: [
    {
      name: "WIZO — קו חירום לנשים",
      phone: "1-800-22-0000",
      url: "https://www.wizo.org.il",
      description: {
        he: "קו חירום חינמי לנשים במצוקה, 24 שעות ביממה. ייעוץ, הפניה למקלטים, וסיוע משפטי.",
        en: "Free emergency line for women in crisis, 24/7. Counselling, shelter referrals, and legal assistance.",
        am: "ለጭንቀት ውስጥ ላሉ ሴቶች ነፃ አደጋ መስመር፣ 24/7። ምክር፣ ወደ መጠለያ ምንባብ፣ እና የህግ ድጋፍ።",
      },
    },
    {
      name: "Na'amat — נעמ\"ת",
      phone: "03-6922022",
      url: "https://www.naamat.org.il",
      description: {
        he: "ארגון נשים המספק מקלטים, ייעוץ משפטי, ותמיכה לנשים שנפגעו מאלימות.",
        en: "Women's organisation providing shelters, legal counsel, and support for survivors of violence.",
        am: "ሴቶች ድርጅት — መጠለያዎች፣ የህግ ምክር፣ እና ለጥቃት ሰለባ ሴቶች ድጋፍ ያቀርባል።",
      },
    },
    {
      name: "ERAN — קו רגשי לשעת משבר",
      phone: "1201",
      url: "https://www.eran.org.il",
      description: {
        he: "קו חירום רגשי אנונימי, 24 שעות. ניתן לפנות גם בצ'אט.",
        en: "Anonymous emotional crisis line, 24 hours. Chat also available at eran.org.il.",
        am: "ስም-አልባ የስሜት ቀውስ መስመር፣ 24 ሰዓት። ቻት በ eran.org.il ላይ ይቻላል።",
      },
    },
    {
      name: "משטרת ישראל — חירום",
      phone: "100",
      description: {
        he: "מספר חירום של המשטרה. בסכנה מיידית — חייגי 100.",
        en: "Police emergency number. If in immediate danger — call 100.",
        am: "የፖሊስ አደጋ ቁጥር። ቅጽበታዊ አደጋ ሲገጥም — 100 ይደውሉ።",
      },
    },
    {
      name: "שירות הרווחה — פקיד סעד",
      description: {
        he: "כל עיריה ומועצה מקומית מציעה שירותי רווחה. פקיד הסעד יכול לסייע בהוצאת צו הגנה.",
        en: "Every municipality offers welfare services. The welfare officer can help obtain a protection order.",
        am: "እያንዳንዱ ከተማ የማህበራዊ አገልግሎቶች ያቀርባል። የሶሻል ወርከሩ የጥበቃ ትዕዛዝ ለማውጣት ሊረዳ ይችላል።",
      },
    },
  ],
};

// ── 2. Elderly ────────────────────────────────────────────────────────────

const ELDERLY: FamilyTopic = {
  slug: "elderly",
  title: {
    he: "גיל הזהב — זכויות ותמיכה",
    en: "Senior Welfare — Rights and Support",
    am: "የአዛውንት ደህንነት — መብቶች እና ድጋፍ",
  },
  subtitle: {
    he: "קצבת זקנה, ביטוח סיעודי, מרכזי יום, ותחבורה מיוחדת לבני 75+ מקהילת יוצאי אתיופיה.",
    en: "Old-age allowance, long-term care insurance, day centres, and transport allowance for seniors 75+ in the Ethiopian-Israeli community.",
    am: "ለኢትዮጵያ-እስራኤላዊ ማህበረሰብ አዛውንቶች — የጡረታ አበል፣ የረዥም ጊዜ ሰርቪስ ዋስትና፣ የቀን ማዕከሎች፣ እና ለ75+ ትራንስፖርት ድጋፍ።",
  },
  body: {
    he: `רבים מבני הדור הראשון שעלו לישראל הגיעו לגיל הפנסיה ומתמודדים עם מחסומי שפה ובירוקרטיה. ביטוח לאומי מספק מספר זכויות מרכזיות — חשוב לדעת שכל אחת מהן דורשת הגשת בקשה פעילה.

קצבת זקנה (Old-Age Allowance):
קצבת זקנה משולמת לכל מי שהגיע לגיל פרישה (67 לגברים, 62–67 לנשים בהתאם לשנת לידה) ואינו מרוויח מעבר לתקרה. הקצבה משולמת אוטומטית רק לאחר הגשת תביעה. הסכום: כ-1,800–2,400 ₪/חודש (2026). ניתן להגדיל על ידי הכנסה נוספת נמוכה.

ביטוח סיעודי:
ביטוח סיעודי מיועד לאנשים שאינם מסוגלים לתפקד בעצמאות — כגון קשיי ניידות או שיטיון (דמנציה). הגמלה כוללת עד 16 שעות שבועיות של עזרה ביתית. יש להגיש בקשה ולעבור הערכת תפקוד.

מרכזי יום:
מרכזי יום לקשישים מציעים פעילויות חברתיות, ארוחות, ופיזיותרפיה. הרישום מתבצע דרך עיריה/מועצה מקומית. עלות מסובסדת עבור בעלי הכנסה נמוכה.

תחבורה מיוחדת לבני 75+:
בני 75 ומעלה זכאים לנסיעה חינם בתחבורה ציבורית בכל הארץ (כולל רכבת) בהצגת תעודת זהות.`,
    en: `Many first-generation immigrants to Israel have reached retirement age and face language and bureaucratic barriers. The National Insurance Institute (Bituach Leumi) provides several key entitlements — it is important to know that each one requires an active application.

Old-Age Allowance (קצבת זקנה):
Paid to all who have reached retirement age (67 for men, 62–67 for women depending on birth year) and do not earn above the ceiling. The allowance is paid automatically only after submitting a claim. Amount: approx. ₪1,800–2,400/month (2026). Can be increased with low additional income.

Long-Term Care Insurance (ביטוח סיעודי):
Designed for people who are unable to function independently — such as mobility difficulties or dementia. The benefit includes up to 16 hours per week of home assistance. An application and functional assessment are required.

Day Centres:
Day centres for the elderly offer social activities, meals, and physiotherapy. Registration is through the municipality or local council. Subsidised cost for low-income individuals.

Transport Allowance for ages 75+:
People aged 75 and above are entitled to free rides on all public transport nationwide (including trains) upon presentation of their ID card.`,
    am: `ወደ እስራኤል የተሰደዱ አብዛኛዎቹ ደረጃ አንድ ትውልዶች ጡረታ ዕድሜ ላይ ደርሰዋል እና የቋንቋ እና ቢሮክራሲ እንቅፋቶች ያጋጥሟቸዋል። ብሔራዊ ኢንሹራንስ ኢንስቲቱት (ቢቱዓ ሌዑሚ) ብዙ ቁልፍ መብቶችን ያቀርባል — እያንዳንዱ ንቁ ጥያቄ እንደሚፈልግ ማወቅ አስፈላጊ ነው።

የዕድሜ አበል (קצבת זקנה):
ጡረታ ዕድሜ (ለወንዶች 67፣ ለሴቶች 62–67 እንደ ልደት ዓመት) የደረሱ ሁሉ ተሰጥቷቸዋል። ጥያቄ ካቀረቡ በኋላ ብቻ ይከፈላል። መጠን: ወደ 1,800–2,400 ₪/ወር (2026)።

የረዥም ጊዜ አገልግሎት ዋስትና (ביטוח סיעודי):
ለዝቅተኛ ተንቀሳቃሽነት ወይም ዲሜንሺያ ሰዎች። ሳምንታዊ 16 ሰዓቶች ቤት ውስጥ እርዳታ። ጥያቄ እና ተግባራዊ ምዘና ያስፈልጋሉ።

የቀን ማዕከሎች:
ለአዛውንቶች — ማህበራዊ እንቅስቃሴዎች፣ ምግቦች፣ እና ፊዚዮቴራፒ። ምዝገባ ከቴምፓ/ከተማ ምክር ቤት ነው።

ለ75+ ትራንስፖርት:
75 ዓመት እና ከዚያ በላይ ሰዎች መታወቂያ ካርዳቸውን ካሳዩ በሁሉም ህዝባዊ ትራንስፖርት (ባቡር ጨምሮ) ነፃ ይጓዛሉ።`,
  },
  resources: [
    {
      name: "ביטוח לאומי — קצבת זקנה",
      phone: "*6050",
      url: "https://www.btl.gov.il",
      description: {
        he: "הגשת תביעה לקצבת זקנה, ביטוח סיעודי, ותמיכה בקשישים.",
        en: "Submitting claims for old-age allowance, long-term care insurance, and support for the elderly.",
        am: "የዕድሜ አበል፣ የረዥም ጊዜ ሰርቪስ ዋስትና፣ እና ለአዛውንቶች ድጋፍ ጥያቄዎችን ማቅረብ።",
      },
    },
    {
      name: "ג'וינט ישראל — מרכזי שירות לקשיש",
      url: "https://www.jointisrael.org.il",
      description: {
        he: "JDC מפעיל מרכזי יום ומרכזי שירות לקשישים בכל הארץ, כולל בערים עם ריכוז גבוה של קהילת יוצאי אתיופיה.",
        en: "JDC operates day centres and service hubs for the elderly nationwide, including in cities with high concentrations of the Ethiopian-Israeli community.",
        am: "JDC በሀገር ሙሉ ለአዛውንቶች የቀን ማዕከሎች እና አገልግሎት ማዕከሎችን ያካሂዳል — ከፍተኛ የኢትዮጵያ ማህበረሰብ ትኩረት ያላቸው ከተሞች ጨምሮ።",
      },
    },
    {
      name: "עמותת מגן — ייעוץ לקשישים",
      phone: "1-800-500-850",
      description: {
        he: "ייעוץ וסיוע לקשישים ולמשפחותיהם בנושא זכויות, שיכון, ומוסדות סיעוד.",
        en: "Counselling and assistance for the elderly and their families on rights, housing, and care facilities.",
        am: "ለአዛውንቶች እና ቤተሰቦቻቸው — ስለ መብቶች፣ መኖሪያ፣ እና የእንክብካቤ ተቋሞች ምክር።",
      },
    },
    {
      name: "הלשכה לסיוע משפטי — זכויות קשישים",
      url: "https://www.justice.gov.il/LegalAid",
      description: {
        he: "ייעוץ משפטי חינם לקשישים בענייני צוואה, אפוטרופסות, ועזיבה מוסד.",
        en: "Free legal advice for the elderly on matters of wills, guardianship, and leaving care facilities.",
        am: "ለአዛውንቶች ነፃ የህግ ምክር — ኑዛዜ፣ አሳዳጊነት፣ እና ከእንክብካቤ ተቋም መውጣት ጉዳዮች።",
      },
    },
  ],
};

// ── 3. Women's Empowerment ────────────────────────────────────────────────

const WOMEN_EMPOWERMENT: FamilyTopic = {
  slug: "women-empowerment",
  title: {
    he: "העצמת נשים — תוכניות, מלגות, ומעונות",
    en: "Women's Empowerment — Programmes, Scholarships and Childcare",
    am: "የሴቶች ማጠናከሪያ — ፕሮግራሞች፣ ስኮላርሺፖች፣ እና የሕፃን ቤቶች",
  },
  subtitle: {
    he: "תוכניות העצמה, מלגות לאמהות, סובסידיות לשמרטפות (שעוני ילדים), ומרכזים קהילתיים לנשים מקהילת יוצאי אתיופיה.",
    en: "Empowerment programmes, scholarships for mothers, childcare subsidies (שעוני ילדים), and community centres for Ethiopian-Israeli women.",
    am: "ለኢትዮጵያ-እስራኤላዊ ሴቶች — ማጠናከሪያ ፕሮግራሞች፣ ለእናቶች ስኮላርሺፖች፣ የሕፃን ዕቅፍ ድጋፍ (שעוני ילדים)፣ እና ማህበረሰብ ማዕከሎች።",
  },
  body: {
    he: `נשים מקהילת יוצאי אתיופיה בישראל מדורגות גבוה מאוד בתחום ההשכלה — שיעור הסטודנטיות גבוה מהממוצע הלאומי. עם זאת, הן מתמודדות עם חסמים ייחודיים: מחסורי שפה, עומס טיפול ממשפחות גדולות, ופער בין ציפיות מסורתיות לבין הזדמנויות מודרניות.

שעוני ילדים — סובסידיה למעון:
משרד הרווחה מממן חלק מעלות המעון (שעוני ילדים) לאמהות עובדות או לומדות. הסובסידיה מחושבת לפי הכנסת המשפחה — ובמשפחות ברמת הכנסה נמוכה יכולה להגיע לכיסוי מלא. הגשת הבקשה דרך אגף הרווחה בעיריה.

מלגות לאמהות לומדות:
• מלגות ע"ש ליאונרד דייויס — ייעודיות לסטודנטיות מקהילת יוצאי אתיופיה.
• קרן יד הנדיב — מלגות לנשים בגיל לא שגרתי (מעל 30).
• מנהל סטודנטים — מענקי מחיה שאינם מוחזרים לסטודנטיות עם ילדים.

מרכזי קהילה לנשים:
רשת הנשים הלאומית של ג'וינט-אשל (JDC-Eshel) מפעילה מרכזים בבאר שבע, נתניה, ראשון לציון, ואשקלון עם מסגרות מיוחדות לנשים מקהילת יוצאי אתיופיה — כולל שיעורי עברית, ליווי להכוון מקצועי, וחוגים.

האגודה לקידום המעמד האישה (Na'amat):
מציעה ייעוץ משפטי, גישור, וסדנאות העצמה ייעודיות לנשים מקהילות מוחלשות.`,
    en: `Women from the Ethiopian-Israeli community rank highly in education — the proportion of female students exceeds the national average. Yet they face unique barriers: language gaps, the burden of caring for larger families, and a tension between traditional expectations and modern opportunities.

Childcare Subsidies (שעוני ילדים):
The Ministry of Welfare subsidises part of the daycare cost for working or studying mothers. The subsidy is calculated based on family income — for low-income families it can cover the full cost. Applications are submitted through the municipal welfare department.

Scholarships for Studying Mothers:
• Leonard Davis Scholarships — targeted at female students from the Ethiopian-Israeli community.
• Yad Hanadiv Foundation — scholarships for women of non-traditional study age (over 30).
• Student Administration — non-repayable living grants for students with children.

Women's Community Centres:
The JDC-Eshel National Women's Network operates centres in Be'er Sheva, Netanya, Rishon LeZion, and Ashkelon with dedicated frameworks for Ethiopian-Israeli women — including Hebrew lessons, vocational guidance, and workshops.

Na'amat:
Offers legal counselling, mediation, and dedicated empowerment workshops for women from disadvantaged communities.`,
    am: `ከኢትዮጵያ-እስራኤላዊ ማህበረሰብ የሆኑ ሴቶች በትምህርት ረገድ ከሀገራዊ ምጣኔ ይልቅ ከፍ ያለ ቦታ ይይዛሉ። ሆኖም ግን ልዩ እንቅፋቶች ይጋጥሟቸዋል፡ የቋንቋ ክፍተቶች፣ ትልልቅ ቤተሰቦችን የማስተዳደር ሸክም፣ እና ባህላዊ ሁኔታዎች።

የሕፃን ዕቅፍ ድጋፍ (שעוני ילדים):
የፋይናንስ ሚኒስቴር ለሰርቲና ወይም ለሚማሩ እናቶች የዕቅፍ ቤት ዋጋ ክፍልን ያዋጣል። ድጋፉ በቤተሰቡ ገቢ ይሰላል — ዝቅተኛ ገቢ ለሚኖሯቸው ቤተሰቦች ሙሉ ሽፋን ሊሰጥ ይችላል።

ለሚማሩ እናቶች ስኮላርሺፖች:
• ሊዮናርድ ዴቪስ ስኮላርሺፖች — ከኢትዮጵያ ማህበረሰብ ለሴት ተማሪዎች ዒላማ።
• ያድ ሃናዲቭ ፋውንዴሽን — ከ30 ዓመት በላይ ሴቶችን ለሚማሩ ስኮላርሺፖች።
• ተማሪ አስተዳደር — ለልጆች ያሏቸው ተማሪዎች የማይመለሱ የኑሮ ድጎማዎች።

የሴቶች ማህበረሰብ ማዕከሎች:
JDC-Eshel ሴቶች ብሔራዊ ኔትወርክ — ቤርሼባ፣ ኔታንያ፣ ሪሾን ለዚዮን፣ እና አሽቀሎን ውስጥ ማዕከሎችን ያካሂዳል — የዕብራይስጥ ትምህርቶች፣ ሙያዊ ምሪት፣ እና ወርክሾፖችን ጨምሮ።`,
  },
  resources: [
    {
      name: "ג'וינט-אשל — מרכז נשים",
      url: "https://www.jdc.org.il/eshel",
      description: {
        he: "תוכניות העצמה ותמיכה לנשים מקהילת יוצאי אתיופיה — לרבות שיעורי עברית וליווי מקצועי.",
        en: "Empowerment and support programmes for Ethiopian-Israeli women — including Hebrew classes and vocational guidance.",
        am: "ለኢትዮጵያ-እስራኤላዊ ሴቶች ማጠናከሪያ እና ድጋፍ ፕሮግራሞች — የዕብራይስጥ ትምህርቶችን እና ሙያዊ ምሪቱን ጨምሮ።",
      },
    },
    {
      name: "Na'amat — נעמ\"ת",
      phone: "03-6922022",
      url: "https://www.naamat.org.il",
      description: {
        he: "ייעוץ משפטי, גישור וסדנאות העצמה לנשים.",
        en: "Legal counselling, mediation, and empowerment workshops for women.",
        am: "ለሴቶች — የህግ ምክር፣ ሽምግልና፣ እና ማጠናከሪያ ወርክሾፖች።",
      },
    },
    {
      name: "מלגות ליאונרד דייויס",
      url: "https://www.jdc.org.il",
      description: {
        he: "מלגות ייעודיות לסטודנטיות מקהילת יוצאי אתיופיה. פנייה דרך ג'וינט ישראל.",
        en: "Targeted scholarships for female students from the Ethiopian-Israeli community. Apply through JDC Israel.",
        am: "ከኢትዮጵያ ማህበረሰብ ለሴት ተማሪዎች ዒላማ ስኮላርሺፖች። ጥያቄ ከ JDC ኢስራኤል ነው።",
      },
    },
    {
      name: "אגף הרווחה — שעוני ילדים",
      description: {
        he: "להגשת בקשה לסובסידיית מעון, יש לפנות לאגף הרווחה של הרשות המקומית.",
        en: "To apply for childcare subsidies, contact the welfare department of your local authority.",
        am: "ለሕፃን ዕቅፍ ድጋፍ ለማመልከት — ወደ ሀገር ቤት ባለስልጣን የፋይናንስ ክፍል ያነጋግሩ።",
      },
    },
    {
      name: "WIZO — תוכניות לנשים",
      url: "https://www.wizo.org.il",
      description: {
        he: "WIZO מפעילה מרכזי יום, גני ילדים, ותוכניות השכלה לנשים בכל הארץ.",
        en: "WIZO operates day centres, kindergartens, and education programmes for women nationwide.",
        am: "WIZO በሀገር ሙሉ ለሴቶች የቀን ማዕከሎች፣ ሕፃናት ትምህርት ቤቶች፣ እና የትምህርት ፕሮግራሞችን ያካሂዳል።",
      },
    },
  ],
};

// ── exported collection ────────────────────────────────────────────────────

export const FAMILY_TOPICS: FamilyTopic[] = [
  DOMESTIC_VIOLENCE,
  ELDERLY,
  WOMEN_EMPOWERMENT,
];

export function getFamilyTopic(slug: string): FamilyTopic | undefined {
  return FAMILY_TOPICS.find((t) => t.slug === slug);
}
