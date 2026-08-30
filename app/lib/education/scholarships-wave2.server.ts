// Scholarships Wave 2 — 20 additional entries.
// Follows the same ScholarshipEntry shape as scholarships.server.ts.

import type { ScholarshipEntry } from "./scholarships.server";

export const SCHOLARSHIPS_WAVE2: ScholarshipEntry[] = [
  // W2-1. Rashi Foundation — Community Excellence
  {
    slug: "rashi-community-excellence",
    level: "undergrad",
    providerOrgSlug: "rashi-foundation",
    name: {
      he: "קרן רשי — מצוינות קהילתית",
      en: "Rashi Foundation — Community Excellence",
      am: "ራሺ ፋውንዴሽን — ማህበረሰብ ልቀት",
    },
    shortDescription: {
      he: "מלגות לסטודנטים מצטיינים מהפריפריה הגיאוגרפית, כולל קהילת יוצאי אתיופיה — עד ₪22,000 לשנה.",
      en: "Scholarships for outstanding students from the geographical periphery, including the Ethiopian-Israeli community — up to ₪22,000/year.",
      am: "ከጂኦግራፊያዊ ዳርቻ ለሚመጡ ላቁ ተማሪዎች — ₪22,000 ድረስ ዓመታዊ።",
    },
    amountMinIls: 10000,
    amountMaxIls: 22000,
    amountNote: {
      he: "מלגה שנתית; ניתן לחדש עד 4 שנים; משוקלל לפי ישוב מגורים.",
      en: "Annual scholarship; renewable up to 4 years; weighted by municipality of residence.",
      am: "ዓመታዊ፤ እስከ 4 ዓመት ታዳሽ፤ እንደ ከተማ ቦታ ይለካል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.rashi.org.il/",
    tags: ["undergrad", "periphery", "community", "needs-based"],
    communityPriority: true,
    relatedScholarships: ["hesegim-undergraduate", "marom-che"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית המתגורר/ת ביישוב פריפריאלי (דירוג חברתי-כלכלי 1–5)
- ממוצא אתיופי או מיעוט אחר המוגדר על-ידי הקרן
- ממוצע ≥ 78
- הכנסה משפחתית עד 160% מקו העוני

## מה כלול?

- מלגה שנתית ₪10,000–₪22,000
- ליווי פרטני דרך שליחי קרן רשי
- גישה לרשת קרן רשי לתעסוקה

## שלבי ההגשה

1. בקשה מקוונת באתר rashi.org.il
2. צירוף אישור מגורים, גיליון ציונים, אישור הכנסה
3. ראיון אישי
4. אישור תוך 30 יום

## ראו גם

- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate)
- [מלגת מרום מל"ג](/he/education/scholarships/marom-che)
`,
      en: `## Who is eligible?

- Student residing in a peripheral locality (socio-economic rank 1–5)
- Of Ethiopian origin or another minority defined by the foundation
- GPA ≥ 78
- Family income up to 160% of the poverty line

## What's included?

- Annual scholarship ₪10,000–₪22,000
- Personal guidance via Rashi Foundation emissaries
- Access to the Rashi Foundation employment network

## Application steps

1. Online application at rashi.org.il
2. Attach proof of residence, transcript, income verification
3. Personal interview
4. Decision within 30 days

## See also

- [Hesegim Undergraduate Scholarship](/en/education/scholarships/hesegim-undergraduate)
- [Marom CHE Scholarship](/en/education/scholarships/marom-che)
`,
      am: `## ለማን ይሆናል?

- ዳርቻ ክልል ውስጥ የሚኖሩ (ማህበረ-ኢኮኖሚ ደረጃ 1–5)
- ኢትዮጵያ ዜጎች ወይም ፋውንዴሽን ከሚጠቅሳቸው ሌሎች ቡድኖች
- GPA ≥ 78
- ቤተሰብ ገቢ ≤ 160% ከድህነት ወሰን

## ምን ይካተታል?

- ዓመታዊ ₪10,000–₪22,000
- ግላዊ ድጋፍ
- ቅጥር አውታረ መረብ

## ደረጃዎች

1. rashi.org.il ቅጽ
2. ሰነዶች ያቅርቡ
3. ቃለ-ምርምር
4. ከ30 ቀናት ምላሽ

## ይህንንም ይዩ

- [ሄሰጊም ስኮላርሺፕ](/am/education/scholarships/hesegim-undergraduate)
`,
    },
  },

  // W2-2. Technion Ethiopian Students Fund
  {
    slug: "technion-ethiopian-fund",
    level: "undergrad",
    providerOrgSlug: "technion",
    name: {
      he: "קרן סטודנטים אתיופים — טכניון",
      en: "Technion Ethiopian Students Fund",
      am: "ቴክኒዮን የኢትዮጵያ ተማሪዎች ፈንድ",
    },
    shortDescription: {
      he: "קרן מלגות ייחודית של הטכניון לסטודנטים ממוצא אתיופי בפקולטות הנדסה ומדעים — עד ₪25,000 לשנה.",
      en: "Dedicated Technion scholarship fund for students of Ethiopian origin in engineering and sciences faculties — up to ₪25,000/year.",
      am: "ቴክኒዮን ለኢትዮጵያ ዜጎች ኢንጂነሪንግ/ሳይንስ — ₪25,000 ድረስ ዓመታዊ።",
    },
    amountMinIls: 12000,
    amountMaxIls: 25000,
    amountNote: {
      he: "מלגה שנתית לפי פקולטה; מחודשת עד סיום תואר.",
      en: "Annual scholarship by faculty; renewable until degree completion.",
      am: "ዓመታዊ እንደ ፋካልቲ፤ እስከ ዲግሪ ማጠናቀቂያ ታዳሽ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://dean.technion.ac.il/financeaid/מלגות-והלוואות/",
    tags: ["undergrad", "stem", "engineering", "community"],
    communityPriority: true,
    relatedScholarships: ["cogito-stem-phd", "isef-fellowship"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי הלומד/ת בטכניון
- לומד/ת הנדסה, מדעים, אדריכלות, ביולוגיה, מתמטיקה, מחשבים
- ממוצע ≥ 76
- הכנסה משפחתית עד 200% מקו העוני

## מה כלול?

- מלגה שנתית ₪12,000–₪25,000
- ליווי אקדמי מוגבר (שעות עזר, tutoring)
- מלגת נסיעות לסטודנטים מהפריפריה

## שלבי ההגשה

1. בקשה דרך מדור מלגות הטכניון
2. מסמכים: ת"ז, גיליון ציונים, אסמכתא מוצא, אישור הכנסה
3. אישור תוך 3 שבועות
4. מועד הגשה: 1 באפריל

## ראו גם

- [Cogito Scholars — STEM PhD](/he/education/scholarships/cogito-stem-phd)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin studying at the Technion
- In engineering, sciences, architecture, biology, math, computer science
- GPA ≥ 76
- Family income up to 200% of the poverty line

## What's included?

- Annual scholarship ₪12,000–₪25,000
- Enhanced academic support (tutoring, office hours)
- Travel scholarship for students from the periphery

## Application steps

1. Application through the Technion scholarships department
2. Documents: ID, transcript, proof of origin, income verification
3. Decision within 3 weeks
4. Deadline: April 1

## See also

- [Cogito Scholars STEM PhD](/en/education/scholarships/cogito-stem-phd)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለማን ይሆናል?

- ቴክኒዮን ያሉ ኢትዮጵያ ዜጎች
- ኢንጂነሪንግ፣ ሳይንስ፣ ሂሳብ፣ ኮምፒዩተር ሳይንስ
- GPA ≥ 76
- ቤተሰብ ገቢ ≤ 200%

## ምን ይካተታል?

- ₪12,000–₪25,000 ዓመታዊ
- አካዳሚክ ድጋፍ
- ጉዞ ወጪ ድጋፍ

## ደረጃዎች

1. ቴክኒዮን ስኮላርሺፕ ዲፓርትመንት
2. ሰነዶች ያቅርቡ
3. ከ3 ሳምንት ምላሽ
4. ቁርጠኛ ቀን፦ ኤፕሪ 1

## ይህንንም ይዩ

- [Cogito STEM ዶክትሬት](/am/education/scholarships/cogito-stem-phd)
`,
    },
  },

  // W2-3. Hebrew University Diversity Scholarship
  {
    slug: "huji-diversity",
    level: "undergrad",
    providerOrgSlug: "hebrew-university",
    name: {
      he: "מלגת גיוון — האוניברסיטה העברית",
      en: "Hebrew University Diversity Scholarship",
      am: "ዕብራይስጥ ዩኒቨርሲቲ ብዝሃነት ስኮላርሺፕ",
    },
    shortDescription: {
      he: "מלגת גיוון של האוניברסיטה העברית לסטודנטים ממוצא אתיופי — עד ₪18,000 לשנה בכל הפקולטות.",
      en: "Diversity scholarship from the Hebrew University for students of Ethiopian origin — up to ₪18,000/year across all faculties.",
      am: "ለኢትዮጵያ ዜጎች ዕብራይስጥ ዩኒቨርሲቲ ብዝሃነት ስኮላርሺፕ — ₪18,000 ድረስ።",
    },
    amountMinIls: 8000,
    amountMaxIls: 18000,
    amountNote: {
      he: "שנתי; ניתן לחדש עד 4 שנות תואר; אין קיזוז עם מלגת מרום.",
      en: "Annual; renewable up to 4 degree years; no offset against Marom scholarship.",
      am: "ዓመታዊ፤ እስከ 4 ዓመት ታዳሽ፤ ከMaron ስኮላርሺፕ ጋር ሊጣመር ይችላል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://studean.huji.ac.il/יוצאי-אתיופיה-0",
    tags: ["undergrad", "community", "diversity"],
    communityPriority: true,
    relatedScholarships: ["marom-che", "hesegim-undergraduate"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי הלומד/ת בהאוניברסיטה העברית בירושלים
- כל הפקולטות: מדעי הרוח, חברה, משפטים, רפואה, מדעים
- ממוצע ≥ 73
- אין הגבלת הכנסה (מלגה מבוססת גיוון, לא רק מחסור)

## מה כלול?

- מלגה שנתית ₪8,000–₪18,000
- גישה לתכנית הנחיה מיוחדת לסטודנטים מגוונים
- עדיפות בדיור סטודנטים בקמפוס הר הצופים / גבעת רם

## שלבי ההגשה

1. הגשה דרך מדור מלגות של הר-הצופים
2. מסמכים: ת"ז, גיליון ציונים, הצהרת מוצא
3. מועד: 31 במרץ
4. אישור תוך 30 יום

## ראו גם

- [מלגת מרום מל"ג](/he/education/scholarships/marom-che)
- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin studying at the Hebrew University of Jerusalem
- All faculties: humanities, social sciences, law, medicine, sciences
- GPA ≥ 73
- No income restriction (diversity-based, not solely need-based)

## What's included?

- Annual scholarship ₪8,000–₪18,000
- Access to dedicated guidance program for diverse students
- Priority in campus housing (Mount Scopus / Givat Ram)

## Application steps

1. Apply through the Mount Scopus scholarships office
2. Documents: ID, transcript, origin declaration
3. Deadline: March 31
4. Decision within 30 days

## See also

- [Marom CHE Scholarship](/en/education/scholarships/marom-che)
- [Hesegim Undergraduate](/en/education/scholarships/hesegim-undergraduate)
`,
      am: `## ለማን ይሆናል?

- ዕብራይስጥ ዩኒቨርሲቲ ያሉ ኢትዮጵያ ዜጎች
- ሁሉም ፋካልቲዎች
- GPA ≥ 73
- ምንም ገቢ ቅድመ-ሁኔታ

## ምን ይካተታል?

- ₪8,000–₪18,000 ዓመታዊ
- ሙያ ምክር ፕሮግራም
- ካምፓስ መኖሪያ ቅድሚያ

## ደረጃዎች

1. የስኮላርሺፕ ቢሮ ቅጽ
2. ሰነዶች ያቅርቡ
3. ሚያዚያ 31 ቁርጠኛ ቀን

## ይህንንም ይዩ

- [ማሮም CHE](/am/education/scholarships/marom-che)
`,
    },
  },

  // W2-4. Ministry of Education — Excellence for Periphery
  {
    slug: "moe-periphery-excellence",
    level: "high-school",
    providerOrgSlug: "ministry-education",
    name: {
      he: "מענק מצוינות פריפריה — משרד החינוך",
      en: "Ministry of Education — Periphery Excellence Grant",
      am: "የትምህርት ሚኒስቴር — ዳርቻ ልቀት ድጋፍ",
    },
    shortDescription: {
      he: "מענק כספי לתלמידי תיכון מצטיינים ממוצא אתיופי ביישובי פריפריה — תמיכה לקראת עלייה ללימודים גבוהים.",
      en: "Cash grant for outstanding Ethiopian-origin high-school students in peripheral towns — support toward higher education entry.",
      am: "ዳርቻ ከተሞች ለሚኖሩ ላቁ ኢትዮጵያ-እስራኤላዊ ሁለተኛ ደረጃ ተማሪዎች የትምህርት ድጋፍ።",
    },
    amountMinIls: 4000,
    amountMaxIls: 9000,
    amountNote: {
      he: "מענק חד-פעמי בסיום תיכון; תלוי בציוני בגרות ויישוב מגורים.",
      en: "One-time grant on high-school completion; depends on matriculation grades and municipality.",
      am: "ሁለተኛ ደረጃ ሲጠናቀቅ የአንድ ጊዜ ድጋፍ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.gov.il/he/departments/ministry_of_education",
    tags: ["high-school", "periphery", "community"],
    communityPriority: true,
    relatedScholarships: ["enp-bagrut-grant", "atidim-pre-academic"],
    relatedRights: ["matriculation-grant"],
    bodies: {
      he: `## מי זכאי?

- תלמיד/ה בכיתות י"א–י"ב ממוצא אתיופי
- מתגורר/ת ביישוב פריפריאלי (דירוג 1–4)
- ממוצע בגרות ≥ 85

## מה כלול?

- מענק חד-פעמי ₪4,000–₪9,000
- ייעוץ לקראת לימודים אקדמיים
- עדיפות בתכניות קדם-אקדמיות

## איך פוני?

1. דרך מנהל בית הספר
2. טופס באתר gov.il
3. אישור תוך 3 שבועות

## ראו גם

- [מענק בגרות ENP](/he/education/scholarships/enp-bagrut-grant)
- [מכינת אתידים](/he/education/scholarships/atidim-pre-academic)
`,
      en: `## Who is eligible?

- Student in 11th–12th grade of Ethiopian origin
- Residing in a peripheral locality (rank 1–4)
- Matriculation average ≥ 85

## What's included?

- One-time grant ₪4,000–₪9,000
- Academic guidance
- Priority in pre-academic programs

## How to apply

1. Through school principal
2. Form on gov.il
3. Decision within 3 weeks

## See also

- [ENP Bagrut Grant](/en/education/scholarships/enp-bagrut-grant)
- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
`,
      am: `## ለማን ይሆናል?

- 11ኛ–12ኛ ክፍል ኢትዮጵያ ዜጎች
- ዳርቻ ከተማ
- ምዝናዬ ≥ 85

## ምን ይካተታል?

- ₪4,000–₪9,000 አንድ ጊዜ
- አካዳሚክ ምክር

## ደረጃዎች

1. ት/ቤት ርዕሰ-ሊቃውንት
2. gov.il ቅጽ

## ይህንንም ይዩ

- [ENP ባግሩት](/am/education/scholarships/enp-bagrut-grant)
`,
    },
  },

  // W2-5. Bizchut Disability + Studies Grant
  {
    slug: "bizchut-disability-studies",
    level: "undergrad",
    providerOrgSlug: "bizchut",
    name: {
      he: "מענק לימודים — בזכות (סטודנטים עם מוגבלות)",
      en: "Bizchut Disability Studies Grant",
      am: "ቢዝቹት — የአካል ጉዳተኛ ጥናት ድጋፍ",
    },
    shortDescription: {
      he: "מענק לסטודנטים עם מוגבלות ממוצא אתיופי — מימון עזרים, שכר לימוד מופחת וליווי אקדמי מיוחד.",
      en: "Grant for students with disabilities of Ethiopian origin — funding for assistive tools, reduced tuition, and dedicated academic support.",
      am: "የአካል ጉዳት ካለባቸው ኢትዮጵያ ዜጎች ተማሪዎች — መሣሪያ ድጋፍ፣ የቀነሰ ትምህርት ክፍያ፣ ምክር።",
    },
    amountMinIls: 5000,
    amountMaxIls: 15000,
    amountNote: {
      he: "מענק שנתי לפי סוג המוגבלות; כולל כיסוי עזרים אקדמיים.",
      en: "Annual grant based on disability type; includes academic assistive tools coverage.",
      am: "ዓመታዊ እንደ የጉዳት ዓይነት፤ አካዳሚክ መሣሪያዎችን ያካትታል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.bizchut.org.il/",
    tags: ["undergrad", "disability", "community", "rights"],
    communityPriority: true,
    relatedScholarships: ["hesegim-undergraduate", "klita-tuition-grant"],
    relatedRights: ["disability-benefit-ethiopians"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי עם מוגבלות מוכרת (ביטוח לאומי / ועדה רפואית)
- לומד/ת תואר ראשון או שני
- אין הגבלת ממוצע (גישה מבוססת זכויות)

## מה כלול?

- מענק שנתי ₪5,000–₪15,000
- כיסוי רכישת עזרים אקדמיים (תוכנות, שמע, ציוד)
- ליווי אישי של יועץ נגישות
- ייצוג מול המוסד האקדמי

## איך פוני?

1. פנייה ישירה לארגון בזכות
2. אישור מוגבלות
3. הגשת בקשה מפורטת
4. תשובה תוך 14 ימי עסקים

## ראו גם

- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate)
- [מענק שכר לימוד משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin with a recognized disability (National Insurance / medical committee)
- Studying for undergraduate or master's degree
- No GPA minimum (rights-based access)

## What's included?

- Annual grant ₪5,000–₪15,000
- Coverage for academic assistive tools (software, audio, equipment)
- Personal accessibility advisor
- Representation with the academic institution

## How to apply

1. Direct contact with Bizchut organization
2. Disability confirmation
3. Submit detailed request
4. Response within 14 business days

## See also

- [Hesegim Undergraduate](/en/education/scholarships/hesegim-undergraduate)
- [Ministry of Aliyah Tuition Grant](/en/education/scholarships/klita-tuition-grant)
`,
      am: `## ለማን ይሆናል?

- የአካል ጉዳት ካለባቸው ኢትዮጵያ ዜጎች ተማሪዎች
- ምንም GPA ቅድመ-ሁኔታ (መብት-ተኮር)

## ምን ይካተታል?

- ₪5,000–₪15,000 ዓመታዊ
- አካዳሚክ መሣሪያ ድጋፍ
- ተደራሽነት አማካሪ

## ደረጃዎች

1. Bizchut ያነጋግሩ
2. ጉዳት ማረጋገጫ
3. ዝርዝር ቅጽ

## ይህንንም ይዩ

- [ሄሰጊም ስኮላርሺፕ](/am/education/scholarships/hesegim-undergraduate)
`,
    },
  },

  // W2-6. Tel Aviv University Ethiopian Alumni Fund
  {
    slug: "tau-ethiopian-alumni-fund",
    level: "undergrad",
    providerOrgSlug: "tel-aviv-university",
    name: {
      he: "קרן בוגרים אתיופים — אוניברסיטת תל אביב",
      en: "TAU Ethiopian Alumni Fund",
      am: "TAU የኢትዮጵያ ቀደምት ተማሪዎች ፈንድ",
    },
    shortDescription: {
      he: "קרן שהוקמה על-ידי בוגרים אתיופים של אוניברסיטת תל אביב — מלגות לסטודנטים חדשים מהקהילה.",
      en: "Fund established by Ethiopian alumni of Tel Aviv University — scholarships for new community students.",
      am: "TAU ቀደምት ኢትዮጵያ ተማሪዎች ባቋቋሙት ፈንድ — ለአዳዲስ ተማሪዎች ስኮላርሺፕ።",
    },
    amountMinIls: 8000,
    amountMaxIls: 16000,
    amountNote: {
      he: "מלגה שנתית; חידוש בכפוף לממוצע ≥ 74.",
      en: "Annual scholarship; renewal subject to GPA ≥ 74.",
      am: "GPA ≥ 74 ሲሟሉ ዓመታዊ ታዳሽ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://deanstudents.tau.ac.il/advancement/ethiopian-students",
    tags: ["undergrad", "community", "alumni"],
    communityPriority: true,
    relatedScholarships: ["hesegim-undergraduate", "jdc-youth-excellence"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי בתואר ראשון באוניברסיטת תל אביב
- ממוצע ≥ 74
- אין הגבלת הכנסה — מבוסס על פוטנציאל ומחויבות קהילתית

## מה כלול?

- מלגת לימודים שנתית ₪8,000–₪16,000
- מנטור בכיר מבוגרי הקרן
- גישה לאירועי networking בוגרים

## שלבי ההגשה

1. בקשה דרך מדור מלגות TAU
2. מסמכים: גיליון ציונים, מכתב מוטיבציה
3. ראיון עם ועדת הבוגרים

## ראו גם

- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate)
- [מלגת ג'וינט — מצוינות נוער](/he/education/scholarships/jdc-youth-excellence)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin in undergraduate program at Tel Aviv University
- GPA ≥ 74
- No income restriction — based on potential and community commitment

## What's included?

- Annual study scholarship ₪8,000–₪16,000
- Senior mentor from the fund's alumni
- Access to alumni networking events

## Application steps

1. Application through TAU scholarships department
2. Documents: transcript, motivation letter
3. Interview with alumni committee

## See also

- [Hesegim Undergraduate](/en/education/scholarships/hesegim-undergraduate)
- [JDC Youth Excellence](/en/education/scholarships/jdc-youth-excellence)
`,
      am: `## ለማን ይሆናል?

- TAU ያሉ ኢትዮጵያ ዜጎች
- GPA ≥ 74
- ምንም ገቢ ቅድመ-ሁኔታ

## ምን ይካተታል?

- ₪8,000–₪16,000 ዓመታዊ
- ከፍተኛ አማካሪ
- ቀደምት ተማሪዎች ግንኙነት

## ደረጃዎች

1. TAU ስኮላርሺፕ ቢሮ
2. ሰነዶች + ደብዳቤ
3. ቃለ-ምርምር

## ይህንንም ይዩ

- [ሄሰጊም](/am/education/scholarships/hesegim-undergraduate)
`,
    },
  },

  // W2-7. IDF Discharged Soldiers Academic Grant (Ethiopian track)
  {
    slug: "idf-discharge-academic-grant",
    level: "undergrad",
    providerOrgSlug: "ministry-defense",
    name: {
      he: "מענק לימודים לחיילים משוחררים — מסלול קהילה אתיופית",
      en: "IDF Discharged Soldiers Academic Grant — Ethiopian Community Track",
      am: "IDF ምርቃቶች የትምህርት ድጋፍ — የኢትዮጵያ ማህበረሰብ ፍሰት",
    },
    shortDescription: {
      he: "מענק לימודים לחיילים משוחררים מהקהילה האתיופית — תוספת על מענק הרגיל בעבור שירות מלא.",
      en: "Study grant for discharged IDF soldiers from the Ethiopian community — bonus above the standard grant for full service.",
      am: "ሙሉ IDF አገልግሎት ከፈጸሙ የኢትዮጵያ ማህበረሰብ ተሠናባቾች — ተጨማሪ ድጋፍ።",
    },
    amountMinIls: 15000,
    amountMaxIls: 35000,
    amountNote: {
      he: "מענק מצטבר לכל שנת לימודים; גבוה ב-25% ממענק רגיל לחיילים ממוצא אתיופי.",
      en: "Cumulative grant per study year; 25% higher than standard grant for soldiers of Ethiopian origin.",
      am: "ዓመት-ዓመት ሚቀጥል ድጋፍ፤ ለኢትዮጵያ ዜጎች ከተለምዶ ድጋፍ 25% ከፍ ይላል።",
    },
    deadline: "rolling",
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.hachvana.mod.gov.il/education/Pages/default.aspx",
    tags: ["undergrad", "idf", "olim", "community"],
    communityPriority: true,
    relatedScholarships: ["klita-tuition-grant", "marom-che"],
    relatedRights: ["army-discharge-benefits-ethiopians"],
    bodies: {
      he: `## מי זכאי?

- חייל/ת משוחרר/ת שסיים/ה שירות מלא (לפחות 24 חודשים)
- ממוצא אתיופי (עצמי, הורה)
- נרשם/ה למוסד אקדמי תוך 3 שנים מהשחרור

## מה כלול?

- מענק ₪15,000–₪35,000 לשנת לימודים
- אפשרות לפריסה לכמה שנות לימוד
- ייעוץ אקדמי מיוחד לחיילים משוחררים

## שלבי ההגשה

1. פנייה למדור מלגות יחידת לוחמים (אכ"א)
2. תעודת שחרור + אישור מוצא
3. הרשמה אקדמית
4. אישור תוך 30 יום

## ראו גם

- [מלגת מרום מל"ג](/he/education/scholarships/marom-che)
- [מענק שכר לימוד — משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
`,
      en: `## Who is eligible?

- Discharged soldier who completed full service (at least 24 months)
- Of Ethiopian origin (self or parent)
- Registered at an academic institution within 3 years of discharge

## What's included?

- Grant ₪15,000–₪35,000 per study year
- Option to spread over multiple study years
- Dedicated academic advising for discharged soldiers

## Application steps

1. Contact the IDF Manpower Directorate (Agam) scholarships unit
2. Discharge certificate + origin proof
3. Academic registration
4. Decision within 30 days

## See also

- [Marom CHE Scholarship](/en/education/scholarships/marom-che)
- [Ministry of Aliyah Tuition Grant](/en/education/scholarships/klita-tuition-grant)
`,
      am: `## ለማን ይሆናል?

- ሙሉ IDF አገልግሎት (≥24 ወር) ፈጽሞ የተሰናበቱ
- ኢትዮጵያ ዜጎች
- ከምርቃት 3 ዓመት ውስጥ አካዳሚክ ምዝገባ

## ምን ይካተታል?

- ₪15,000–₪35,000 ዓመታዊ
- ለበርካታ ዓመታት ሊሰራጭ ይቻላል
- ሙያ ምክር

## ደረጃዎች

1. IDF Agam ያነጋግሩ
2. ሰነዶች ያቅርቡ
3. ከ30 ቀናት ምላሽ

## ይህንንም ይዩ

- [ማሮም CHE](/am/education/scholarships/marom-che)
`,
    },
  },

  // W2-8. Darca High Schools Excellence Scholarship
  {
    slug: "darca-excellence",
    level: "high-school",
    providerOrgSlug: "darca",
    name: {
      he: "מלגת מצוינות — רשת דרכא",
      en: "Darca Schools Excellence Scholarship",
      am: "ዳርካ ት/ቤቶች ልቀት ስኮላርሺፕ",
    },
    shortDescription: {
      he: "מלגת עידוד למצוינים בבתי ספר תיכון של רשת דרכא — רוב תלמידי הרשת ממוצא אתיופי.",
      en: "Excellence incentive scholarship for top students at Darca high schools — most Darca students are of Ethiopian origin.",
      am: "ዳርካ ሁለተኛ ደረጃ ት/ቤቶች ምርጥ ተማሪዎች — ሞዴሎቻቸው አብዛኛዎቹ ኢትዮጵያ ዜጎች ናቸው።",
    },
    amountMinIls: 2000,
    amountMaxIls: 6000,
    amountNote: {
      he: `מענק שנתי לתלמידי כיתות ט’–י"ב שהשיגו הישגים מובחנים.`,
      en: "Annual grant for students in grades 9–12 who achieved outstanding results.",
      am: "9ኛ–12ኛ ክፍል ልቀት ዓመታዊ ድጋፍ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://alumni.darca.org.il/",
    tags: ["high-school", "community", "excellence"],
    communityPriority: true,
    relatedScholarships: ["enp-bagrut-grant", "moe-periphery-excellence"],
    relatedRights: ["matriculation-grant"],
    bodies: {
      he: `## מי זכאי?

- תלמיד/ה בכיתה ט'–י"ב ברשת דרכא
- הישגי לימוד מובחנים (ממוצע ≥ 88 בשנת הלימודים הקודמת)
- מחויבות לפעילות מנהיגות בבית הספר

## מה כלול?

- מענק ₪2,000–₪6,000
- הכרה פורמלית בטקס שנתי
- ייעוץ קריירה ולימודים גבוהים

## איך פוני?

1. מינוי על-ידי מחנך/ת הכיתה
2. אישור מנהל בית הספר
3. תשלום בתחילת השנה האקדמית הבאה

## ראו גם

- [מענק בגרות ENP](/he/education/scholarships/enp-bagrut-grant)
- [מלגת מצוינות פריפריה — משרד החינוך](/he/education/scholarships/moe-periphery-excellence)
`,
      en: `## Who is eligible?

- Student in grades 9–12 at a Darca school
- Outstanding academic results (GPA ≥ 88 in previous year)
- Commitment to leadership activities at school

## What's included?

- Grant ₪2,000–₪6,000
- Formal recognition at annual ceremony
- Career and higher education counseling

## How to apply

1. Nomination by class teacher
2. School principal approval
3. Payment at start of next academic year

## See also

- [ENP Bagrut Grant](/en/education/scholarships/enp-bagrut-grant)
- [Ministry of Education Periphery Excellence](/en/education/scholarships/moe-periphery-excellence)
`,
      am: `## ለማን ይሆናል?

- ዳርካ ት/ቤቶች 9ኛ–12ኛ ክፍል
- ምዝናዬ ≥ 88
- ት/ቤት አመራር ቁርጠኝነት

## ምን ይካተታል?

- ₪2,000–₪6,000
- ዓለማዊ ሽልማት
- ሙያ ምክር

## ደረጃዎች

1. ክፍል አስተማሪ ምርጫ
2. ዳይሬክተር ይፈቅዳሉ

## ይህንንም ይዩ

- [ENP ባግሩት](/am/education/scholarships/enp-bagrut-grant)
`,
    },
  },

  // W2-9. Ben-Gurion University Social Work Track
  {
    slug: "bgu-social-work-community",
    level: "undergrad",
    providerOrgSlug: "ben-gurion-university",
    name: {
      he: "מלגת עבודה סוציאלית — אוניברסיטת בן-גוריון",
      en: "BGU Social Work Community Scholarship",
      am: "BGU ማህበራዊ ስራ ማህበረሰብ ስኮላርሺፕ",
    },
    shortDescription: {
      he: "מלגה לסטודנטים ממוצא אתיופי בתכנית עבודה סוציאלית בבן-גוריון — לחיזוק ייצוג הקהילה בתחום הרווחה.",
      en: "Scholarship for students of Ethiopian origin in the Ben-Gurion University social work program — boosting community representation in welfare.",
      am: "BGU ማህበራዊ ስራ ፕሮግራም ኢትዮጵያ ዜጎች — ማህበረሰብ ውክልና ለማሳደግ።",
    },
    amountMinIls: 7000,
    amountMaxIls: 14000,
    amountNote: {
      he: "מלגה שנתית; ניתנת גם לסטודנטים בתואר שני בעבודה סוציאלית.",
      en: "Annual scholarship; also available for master's students in social work.",
      am: "ዓመታዊ፤ ለሁለተኛ ዲግሪ ማህበራዊ ስራ ተማሪዎችም ይሰጣል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.bgu.ac.il/welcome/ba/scholarship-lobby/",
    tags: ["undergrad", "masters", "social-work", "community"],
    communityPriority: true,
    relatedScholarships: ["bar-ilan-community", "isef-fellowship"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי בתואר ראשון או שני בעבודה סוציאלית, BGU
- ממוצע ≥ 72
- מחויבות לעבוד בקהילה האתיופית לאחר הסמכה (לפחות שנה)

## מה כלול?

- מלגה שנתית ₪7,000–₪14,000
- שיבוץ עדיפות בהתנסות מעשית בקהילה
- ליווי מנטור עו"ס בכיר מהקהילה

## שלבי ההגשה

1. בקשה דרך בית הספר לעבודה סוציאלית, BGU
2. מסמכים: גיליון, אסמכתא מוצא, מכתב מוטיבציה
3. ראיון
4. אישור תוך 4 שבועות

## ראו גם

- [מלגת בר-אילן לקהילה](/he/education/scholarships/bar-ilan-community)
- [מלגת ISEF — תואר שני](/he/education/scholarships/isef-fellowship)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin in undergraduate or master's social work at BGU
- GPA ≥ 72
- Commitment to work in the Ethiopian community after licensing (at least one year)

## What's included?

- Annual scholarship ₪7,000–₪14,000
- Priority placement in community practical training
- Senior social worker mentor from the community

## Application steps

1. Application through BGU School of Social Work
2. Documents: transcript, origin proof, motivation letter
3. Interview
4. Decision within 4 weeks

## See also

- [Bar-Ilan Community Scholarship](/en/education/scholarships/bar-ilan-community)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለማን ይሆናል?

- BGU ማህበራዊ ስራ ኢትዮጵያ ዜጎች
- GPA ≥ 72
- ፍቃድ ካገኙ በኋላ ቢያንስ 1 ዓመት ማህበረሰብ ስራ ቁርጠኝነት

## ምን ይካተታል?

- ₪7,000–₪14,000 ዓመታዊ
- ማህበረሰብ ልምምድ ቅድሚያ
- ከፍተኛ ሶሻል ወርከር አማካሪ

## ደረጃዎች

1. BGU ሶሻል ወርክ ቢሮ
2. ሰነዶች
3. ቃለ-ምርምር

## ይህንንም ይዩ

- [ቡ-ኢላን ማህበረሰብ](/am/education/scholarships/bar-ilan-community)
`,
    },
  },

  // W2-10. Yad Hanadiv Research Fellowship
  {
    slug: "yad-hanadiv-research",
    level: "phd",
    providerOrgSlug: "yad-hanadiv",
    name: {
      he: "מלגת מחקר — יד הנדיב",
      en: "Yad Hanadiv Research Fellowship",
      am: "ያድ ሃናዲቭ የምርምር ፌሎውሺፕ",
    },
    shortDescription: {
      he: "מלגות מחקר לדוקטורנטים ופוסט-דוקטורנטים ממוצא אתיופי בתחומי חברה, מדיניות וחינוך.",
      en: "Research fellowships for PhD and post-doctoral scholars of Ethiopian origin in social, policy, and education fields.",
      am: "ለኢትዮጵያ ዜጎች PhD/פוסט-דוק ተመራማሪዎች — ማህበረሰብ፣ ፖሊሲ፣ ትምህርት ዘርፎች።",
    },
    amountMinIls: 70000,
    amountMaxIls: 140000,
    amountNote: {
      he: "סטיפנדיה שנתית מלאה + תקציב מחקר נפרד עד ₪20,000.",
      en: "Full annual stipend + separate research budget up to ₪20,000.",
      am: "ሙሉ ዓመታዊ ድጋፍ + እስከ ₪20,000 የምርምር በጀት።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.yadhanadiv.org.il/rothschild-fellows/",
    tags: ["phd", "post-doc", "research", "community", "social-policy"],
    communityPriority: true,
    relatedScholarships: ["cogito-stem-phd", "isef-fellowship"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- דוקטורנט/ית או פוסט-דוקטורנט/ית ממוצא אתיופי
- מחקר בתחומי: חינוך, מדיניות חברתית, כלכלה, סוציולוגיה, עבודה סוציאלית, או ממשל
- עם קבלה מאושרת לתכנית מוסמכת
- מחויבות לתרגום ממצאי המחקר לתועלת הקהילה

## מה כלול?

- סטיפנדיה שנתית ₪70,000–₪140,000
- תקציב מחקר עצמאי ₪15,000–₪20,000
- כיסוי נסיעות לכנסים בינלאומיים
- גישה לרשת חוקרי יד הנדיב

## שלבי ההגשה

1. הגשת הצעת מחקר (3,000 מילים) + קו"ח אקדמי
2. שני מכתבי המלצה (מנחה + קולגה)
3. ועדת קבלה: ינואר–פברואר
4. מועד אחרון: 31 בינואר

## ראו גם

- [Cogito Scholars STEM PhD](/he/education/scholarships/cogito-stem-phd)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
`,
      en: `## Who is eligible?

- PhD or post-doctoral scholar of Ethiopian origin
- Research in: education, social policy, economics, sociology, social work, or governance
- With confirmed acceptance to an accredited program
- Commitment to translating research findings for community benefit

## What's included?

- Annual stipend ₪70,000–₪140,000
- Independent research budget ₪15,000–₪20,000
- International conference travel coverage
- Access to the Yad Hanadiv researchers network

## Application steps

1. Submit research proposal (3,000 words) + academic CV
2. Two letters of recommendation (supervisor + colleague)
3. Admissions committee: January–February
4. Deadline: January 31

## See also

- [Cogito Scholars STEM PhD](/en/education/scholarships/cogito-stem-phd)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለማን ይሆናል?

- ኢትዮጵያ ዜጎች PhD/פוסט-דוק
- ትምህርት፣ ማህበራዊ ፖሊሲ፣ ሶሺዮሎጂ
- ቁርጠኛ ቀን፦ ጥር 31

## ምን ይካተታል?

- ₪70,000–₪140,000 ዓመታዊ
- ₪15,000–₪20,000 ምርምር በጀት
- ዓለምአቀፍ ኮንፈረንስ ጉዞ

## ደረጃዎች

1. የምርምር ሃሳብ (3,000 ቃላት) + CV
2. ሁለት ምስክርነት ደብዳቤ

## ይህንንም ይዩ

- [Cogito STEM PhD](/am/education/scholarships/cogito-stem-phd)
`,
    },
  },

  // W2-11. Peles Foundation Vocational Training Grant
  {
    slug: "peles-vocational-training",
    level: "vocational",
    providerOrgSlug: "peles-foundation",
    name: {
      he: "מלגת הכשרה מקצועית — קרן פלס",
      en: "Peles Foundation Vocational Training Grant",
      am: "ፔሌስ ፋውንዴሽን የሙያ ስልጠና ድጋፍ",
    },
    shortDescription: {
      he: "מימון הכשרה מקצועית לבני קהילת יוצאי אתיופיה בתחומים כגון חשמל, אינסטלציה, מיזוג אוויר ובניין.",
      en: "Funding for vocational training for Ethiopian-community members in fields such as electrical, plumbing, air conditioning, and construction.",
      am: "ለኢትዮጵያ ማህበረሰብ — ኤሌክትሪክ፣ ቧምቧ፣ ኤርኮንዲሽን፣ ግንባታ ሙያ ስልጠና ድጋፍ።",
    },
    amountMinIls: 8000,
    amountMaxIls: 20000,
    amountNote: {
      he: "כיסוי מלא לעלות קורס; כולל ציוד וחומרים.",
      en: "Full coverage of course cost; includes equipment and materials.",
      am: "ሙሉ ኮርስ ወጪ ሽፋን፤ ቁሳቁስ ያካትታል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.peles.org.il/vocational",
    tags: ["vocational", "community", "career-shift"],
    communityPriority: true,
    relatedScholarships: ["tech-career-bootcamp-stipend"],
    relatedRights: ["vocational-training-vouchers-immigrants"],
    bodies: {
      he: `## מי זכאי?

- בני/ות קהילה אתיופית בגיל 18–50
- ללא הכנסה מספקת
- אינם לומדים כרגע באוניברסיטה
- מוכנים להשקיע 6–18 חודשי הכשרה

## מה כלול?

- כיסוי מלא של שכר לימוד קורס מקצועי
- ציוד עבודה ראשוני
- הכנסה בסיסית חודשית במהלך ההכשרה (עד ₪2,500)

## שלבי ההגשה

1. פנייה לקרן פלס
2. ראיון הערכה
3. בחירת מסגרת הכשרה
4. תחילת קורס תוך 4 שבועות

## ראו גם

- [Tech-Career Bootcamp](/he/education/scholarships/tech-career-bootcamp-stipend)
`,
      en: `## Who is eligible?

- Ethiopian community members aged 18–50
- Without sufficient income
- Not currently studying at a university
- Willing to invest 6–18 months in training

## What's included?

- Full coverage of vocational course tuition
- Initial work equipment
- Basic monthly income during training (up to ₪2,500)

## Application steps

1. Contact Peles Foundation
2. Assessment interview
3. Select training framework
4. Course start within 4 weeks

## See also

- [Tech-Career Bootcamp](/en/education/scholarships/tech-career-bootcamp-stipend)
`,
      am: `## ለማን ይሆናል?

- 18–50 ዓመት ኢትዮጵያ ማህበረሰብ
- ዩኒቨርሲቲ ያልሄዱ
- 6–18 ወር ስልጠና ቁርጠኛ

## ምን ይካተታል?

- ሙሉ ኮርስ ክፍያ
- የስራ ቁሳቁስ
- ወርሃዊ ₪2,500 ድረስ

## ደረጃዎች

1. Peles ያነጋግሩ
2. ቃለ-ምርምር
3. ኮርስ ምርጫ
4. 4 ሳምንታት ውስጥ ይጀምራሉ

## ይህንንም ይዩ

- [Tech-Career Bootcamp](/am/education/scholarships/tech-career-bootcamp-stipend)
`,
    },
  },

  // W2-12. Tene Briut Health Professions Scholarship
  {
    slug: "tene-briut-health",
    level: "undergrad",
    providerOrgSlug: "tene-briut",
    name: {
      he: "מלגת מקצועות הבריאות — תנה בריאות",
      en: "Tene Briut Health Professions Scholarship",
      am: "ቴኔ ብርዩት የጤና ሙያ ስኮላርሺፕ",
    },
    shortDescription: {
      he: "מלגות לסטודנטים ממוצא אתיופי בלימודי רפואה, סיעוד, פיזיותרפיה ועבודה סוציאלית רפואית.",
      en: "Scholarships for students of Ethiopian origin studying medicine, nursing, physiotherapy, and medical social work.",
      am: "ህክምና፣ ነርሲንግ፣ ፊዚዮቴራፒ፣ ሕክምናዊ ማህበራዊ ስራ ለሚማሩ ኢትዮጵያ ዜጎች።",
    },
    amountMinIls: 12000,
    amountMaxIls: 28000,
    amountNote: {
      he: "מלגה שנתית; גבוהה יותר לרופאים (₪22,000–₪28,000) לעומת מקצועות אחרים.",
      en: "Annual scholarship; higher for medical students (₪22,000–₪28,000) vs other health professions.",
      am: "ዓመታዊ፤ ለዶክተርነት (₪22,000–₪28,000) ለሌሎች ሙያዎች ከፍ ያለ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://tene-briut.org.il/",
    tags: ["undergrad", "health", "medicine", "community"],
    communityPriority: true,
    relatedScholarships: ["isef-fellowship", "marom-che"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי בלימודי רפואה, רפואת שיניים, סיעוד, פיזיותרפיה, ריפוי בעיסוק, עבודה סוציאלית רפואית
- לומד/ת במוסד אקדמי מוכר
- ממוצע ≥ 76
- מחויבות לעבוד בשירות רפואי לאוכלוסיות מוחלשות לאחר הסמכה (לפחות שנתיים)

## מה כלול?

- מלגה שנתית ₪12,000–₪28,000 (לפי מקצוע)
- ליווי מנטור רופא/ה בכיר/ה מהקהילה
- כיסוי הוצאות פרקטיקום
- גישה לרשת בוגרי תנה בריאות

## שלבי ההגשה

1. בקשה מקוונת באתר tene-briut.org.il
2. מסמכים: גיליון ציונים, אסמכתא מוצא, מכתב מוטיבציה
3. ראיון מקצועי
4. מועד אחרון: 31 במאי

## ראו גם

- [מלגת ISEF — תואר שני](/he/education/scholarships/isef-fellowship)
- [מלגת מרום מל"ג](/he/education/scholarships/marom-che)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin in medicine, dentistry, nursing, physiotherapy, occupational therapy, medical social work
- At a recognized academic institution
- GPA ≥ 76
- Commitment to serve disadvantaged populations medically after licensing (at least 2 years)

## What's included?

- Annual scholarship ₪12,000–₪28,000 (by profession)
- Senior doctor/healthcare mentor from the community
- Practicum expenses coverage
- Access to Tene Briut alumni network

## Application steps

1. Online application at tene-briut.org.il
2. Documents: transcript, origin proof, motivation letter
3. Professional interview
4. Deadline: May 31

## See also

- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
- [Marom CHE Scholarship](/en/education/scholarships/marom-che)
`,
      am: `## ለማን ይሆናል?

- ህክምና፣ ነርሲንግ፣ ፊዚዮቴራፒ ኢትዮጵያ ዜጎች
- GPA ≥ 76
- ፍቃድ ካገኙ 2 ዓመት ለዳርቻ ህዝቦች ሕክምና ቁርጠኝነት

## ምን ይካተታል?

- ₪12,000–₪28,000 ዓመታዊ
- ሐኪም/ጤና ባለሙያ አማካሪ
- ልምምድ ወጪ ሽፋን

## ደረጃዎች

1. tene-briut.org.il ቅጽ
2. ሰነዶች
3. ሙያዊ ቃለ-ምርምር
4. ቁርጠኛ ቀን፦ ሚያዚያ 31

## ይህንንም ይዩ

- [ISEF ፌሎውሺፕ](/am/education/scholarships/isef-fellowship)
`,
    },
  },

  // W2-13. Immigrant Children Legal Rights Grant (Elem)
  {
    slug: "elem-youth-at-risk",
    level: "vocational",
    providerOrgSlug: "elem",
    name: {
      he: "תכנית ELEM — נוער במצוקה",
      en: "Elem Youth at Risk Program",
      am: "Elem — ስጋት ውስጥ ያሉ ወጣቶች ፕሮግራም",
    },
    shortDescription: {
      he: "תכנית תמיכה וחינוך לנוער אתיופי במצוקה — מלגות, ליווי והפנייה לחינוך רשמי.",
      en: "Support and education program for at-risk Ethiopian youth — scholarships, mentoring, and referral to formal education.",
      am: "ስጋት ውስጥ ላሉ ኢትዮጵያ ወጣቶች — ስኮላርሺፕ፣ ምክርና ወደ ትምህርት ሽግግር።",
    },
    amountMinIls: 4000,
    amountMaxIls: 10000,
    amountNote: {
      he: "מענק שנתי לכיסוי לימודים ופעילות; גובה משתנה לפי מצב.",
      en: "Annual grant covering studies and activities; amount varies by situation.",
      am: "ሁኔታ መሰረት ዓመታዊ ድጋፍ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.elem.org.il/",
    tags: ["vocational", "youth", "at-risk", "community"],
    communityPriority: true,
    relatedScholarships: ["darca-excellence", "atidim-pre-academic"],
    relatedRights: [],
    bodies: {
      he: `## מי זכאי?

- נוער ממוצא אתיופי בגיל 13–25 שנשר מהמערכת הפורמלית
- חסר בית / בסיכון / עצור בעבר
- ללא הגבלת הכנסה (גישה מבוססת סיכון)

## מה כלול?

- ליווי אישי של עובד/ת סוציאלי/ת שטח
- מענק לכיסוי לימודים חלופיים / מקצועיים
- קורסים ותכניות כישורי חיים
- הפנייה לדיור ותעסוקה

## איך פוני?

1. פנייה ישירה לסניף ELEM הקרוב
2. ראיון הערכה
3. בניית תכנית אישית
4. אין מועד אחרון — תכנית שוטפת

## ראו גם

- [מלגת מצוינות דרכא](/he/education/scholarships/darca-excellence)
- [מכינת אתידים](/he/education/scholarships/atidim-pre-academic)
`,
      en: `## Who is eligible?

- Youth of Ethiopian origin aged 13–25 who dropped out of the formal system
- Homeless / at-risk / previously detained
- No income restriction (risk-based access)

## What's included?

- Personal field social worker support
- Grant covering alternative/vocational studies
- Life-skills courses and programs
- Housing and employment referrals

## How to apply

1. Direct contact with the nearest Elem branch
2. Assessment interview
3. Build personal plan
4. No deadline — ongoing program

## See also

- [Darca Schools Excellence](/en/education/scholarships/darca-excellence)
- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
`,
      am: `## ለማን ይሆናል?

- ትምህርት ያቋረጡ 13–25 ዓመት ኢትዮጵያ ወጣቶች
- ምንም ገቢ ቅድመ-ሁኔታ

## ምን ይካተታል?

- ሶሻል ወርከር ድጋፍ
- አማራጭ ትምህርት ድጋፍ
- የህይወት ክህሎት ኮርሶች

## ደረጃዎች

1. ቅርብ Elem ቅርንጫፍ ያነጋግሩ
2. ቃለ-ምርምር
3. ግላዊ እቅድ

## ይህንንም ይዩ

- [ዳርካ ልቀት](/am/education/scholarships/darca-excellence)
`,
    },
  },

  // W2-14. Mandel Foundation Leadership Fellowship
  {
    slug: "mandel-leadership",
    level: "masters",
    providerOrgSlug: "mandel-foundation",
    name: {
      he: "פלוגת מנדל — מנהיגות חברתית",
      en: "Mandel Foundation Leadership Fellowship",
      am: "ማንደል ፋውንዴሽን አመራር ፌሎውሺፕ",
    },
    shortDescription: {
      he: "פלוגת מנהיגות חברתית של קרן מנדל לבוגרים ממוצא אתיופי — שנה אקדמית מלאה + ליווי לקריירה ציבורית.",
      en: "Mandel Foundation social leadership fellowship for graduates of Ethiopian origin — full academic year + public-sector career mentorship.",
      am: "ለኢትዮጵያ ዜጎች ማህበረ-አመራር ፌሎውሺፕ — ሙሉ አካዳሚክ ዓመት + ሕዝባዊ ሙያ ምክር።",
    },
    amountMinIls: 50000,
    amountMaxIls: 90000,
    amountNote: {
      he: "סטיפנדיה שנתית מלאה + שכר לימוד למסלול המנהיגות.",
      en: "Full annual stipend + tuition for the leadership track.",
      am: "ሙሉ ዓመታዊ ድጋፍ + የአመራር ትምህርት ክፍያ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.mandel.org.il/units/school/programs/school/",
    tags: ["masters", "leadership", "community", "public-sector"],
    communityPriority: true,
    relatedScholarships: ["jdc-youth-excellence", "isef-fellowship"],
    relatedRights: [],
    bodies: {
      he: `## מי זכאי?

- בוגר/ת תואר ראשון ממוצא אתיופי
- 3–10 שנות ניסיון מקצועי בתחום חינוך, רווחה, קהילה, ממשל מקומי
- אזרח/ית ישראל/ית
- פוטנציאל מנהיגות מוכח

## מה כלול?

- שנת לימודים מלאה במכון מנדל (ירושלים)
- סטיפנדיה ₪50,000–₪90,000
- הוצאות מחיה ונסיעות
- רשת בוגרי מנדל — מנהיגי חברה בכירים

## שלבי ההגשה

1. מכתב הצהרת מועמדות
2. קו"ח + 3 מכתבי המלצה
3. מבחן כתוב
4. ראיון עמוק
5. מועד אחרון: 15 בפברואר

## ראו גם

- [מלגת ג'וינט — מצוינות נוער](/he/education/scholarships/jdc-youth-excellence)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
`,
      en: `## Who is eligible?

- Undergraduate graduate of Ethiopian origin
- 3–10 years professional experience in education, welfare, community, or local government
- Israeli citizen
- Demonstrated leadership potential

## What's included?

- Full academic year at Mandel Institute (Jerusalem)
- Stipend ₪50,000–₪90,000
- Living and travel expenses
- Mandel alumni network — senior social leaders

## Application steps

1. Letter of candidacy
2. CV + 3 letters of recommendation
3. Written examination
4. In-depth interview
5. Deadline: February 15

## See also

- [JDC Youth Excellence](/en/education/scholarships/jdc-youth-excellence)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለማን ይሆናል?

- ኢትዮጵያ ዜጎች ከፍተኛ ምሩቃን
- 3–10 ዓመት ትምህርት/ማህበረሰብ/አስተዳደር ልምድ
- ቁርጠኛ ቀን፦ የካቲት 15

## ምን ይካተታል?

- ሙሉ አካዳሚክ ዓመት ማንደል ኢንስቲትዩት
- ₪50,000–₪90,000 ድጋፍ
- የኑሮ + ጉዞ ወጪ
- ማንደል ቀደምት ተማሪዎች አውታረ መረብ

## ደረጃዎች

1. ደብዳቤ
2. CV + 3 ምስክርነት
3. ጽሑፍ ፈተና
4. ቃለ-ምርምር

## ይህንንም ይዩ

- [JDC ልቀት](/am/education/scholarships/jdc-youth-excellence)
`,
    },
  },

  // W2-15. Ethiopian Israeli Educators Association Grant
  {
    slug: "eiea-educators-grant",
    level: "masters",
    providerOrgSlug: "eiea",
    name: {
      he: "מענק אנשי חינוך — עמותת מחנכים יוצאי אתיופיה",
      en: "Ethiopian-Israeli Educators Association Grant",
      am: "የኢትዮጵያ-እስራኤላዊ አስተማሪዎች ማህበር ድጋፍ",
    },
    shortDescription: {
      he: "מענק לסטודנטים להוראה ממוצא אתיופי — חיזוק ייצוג הקהילה בקרב מחנכים ומנהלי בתי ספר.",
      en: "Grant for teaching students of Ethiopian origin — strengthening community representation among educators and school principals.",
      am: "አስተማሪ ሆኖ ለሚሰለጥኑ ኢትዮጵያ ዜጎች — ት/ቤቶች ውስጥ ማህበረሰብ ውክልና ለማጠናከር።",
    },
    amountMinIls: 8000,
    amountMaxIls: 16000,
    amountNote: {
      he: "מענק שנתי; לסטודנטים בתכנית הכשרת מורים (כולל תואר שני בחינוך).",
      en: "Annual grant; for students in teacher training programs (including education master's).",
      am: "ዓመታዊ፤ ለስልጠና-ፕሮግራም (ሁለተኛ ዲግሪ ትምህርትም ይካተታል)።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.eiea.org.il/grants",
    tags: ["masters", "education", "teachers", "community"],
    communityPriority: true,
    relatedScholarships: ["bgu-social-work-community", "isef-fellowship"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי בתכנית הכשרת מורים, תעודת הוראה, או תואר שני בחינוך
- מחויבות ללמד בבית ספר ממוצא אתיופי גבוה לפחות 3 שנים לאחר הכשרה
- ממוצע ≥ 75

## מה כלול?

- מענק שנתי ₪8,000–₪16,000
- הדרכה פדגוגית מקצועית
- גישה לרשת מחנכים מהקהילה
- תמיכה בקבלת כתב מינוי מהמשרד לחינוך

## שלבי ההגשה

1. פנייה לעמותה
2. גיליון ציונים + הצהרת מחויבות
3. ראיון קצר
4. אישור תוך 3 שבועות

## ראו גם

- [מלגת עבודה סוציאלית BGU](/he/education/scholarships/bgu-social-work-community)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin in a teacher training program, teaching certificate, or education master's
- Commitment to teach at a high-Ethiopian-origin school for at least 3 years after training
- GPA ≥ 75

## What's included?

- Annual grant ₪8,000–₪16,000
- Professional pedagogical guidance
- Access to community educators network
- Support in receiving Ministry of Education appointment

## Application steps

1. Contact the association
2. Transcript + commitment declaration
3. Short interview
4. Decision within 3 weeks

## See also

- [BGU Social Work Scholarship](/en/education/scholarships/bgu-social-work-community)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለማን ይሆናል?

- አስተማሪ ሆኖ ለሚሰለጥኑ ኢትዮጵያ ዜጎች
- GPA ≥ 75
- ₪8,000–₪16,000 ዓመታዊ

## ምን ይካተታል?

- ዓመታዊ ድጋፍ
- ፔዳጎጂካል ምክር
- አስተማሪዎች አውታረ መረብ

## ደረጃዎች

1. ማህበሩን ያነጋግሩ
2. ሰነዶች + ቁርጠኝነት ደብዳቤ

## ይህንንም ይዩ

- [BGU ማህበራዊ ስራ](/am/education/scholarships/bgu-social-work-community)
`,
    },
  },

  // W2-16. Masa Israel Journey — Young Professionals
  {
    slug: "masa-young-professionals",
    level: "vocational",
    providerOrgSlug: "masa-israel",
    name: {
      he: "מסע ישראל — מקצוענים צעירים",
      en: "Masa Israel — Young Professionals Program",
      am: "ማሳ እስራኤል — ወጣት ሙያተኞች ፕሮግራም",
    },
    shortDescription: {
      he: "תכנית מסע לצעירים ממוצא אתיופי — חיזוק זהות, כישורים מקצועיים וקשרים בינלאומיים בקהילה היהודית-אתיופית.",
      en: "Masa program for young adults of Ethiopian origin — strengthening identity, professional skills, and international connections in the Jewish-Ethiopian community.",
      am: "ለኢትዮጵያ ዜጎች ወጣቶች — ማንነት ማጠናከር፣ ሙያ ክህሎቶች፣ ዓለምአቀፍ ትስስር።",
    },
    amountMinIls: 20000,
    amountMaxIls: 40000,
    amountNote: {
      he: "מימון מלא לתכנית (כולל טיסות, מגורים, פעילויות) — אין עלות ישירה למשתתף.",
      en: "Full program funding (including flights, accommodation, activities) — no direct cost to participant.",
      am: "ሙሉ ፕሮግራም ሽፋን (ጉዞ፣ ማደሪያ፣ ተግባሮች) — ለተሳታፊ ዋጋ የለም።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://heb.masaisrael.org/career-2/",
    tags: ["vocational", "identity", "youth", "international"],
    communityPriority: true,
    relatedScholarships: ["jdc-youth-excellence", "olim-beyahad-career-mentorship"],
    relatedRights: [],
    bodies: {
      he: `## מי זכאי?

- צעיר/ה ממוצא אתיופי, בגיל 18–30
- אזרח/ית ישראל/ית
- לא שירת עדיין בתכנית מסע בעבר
- מוכן/ה לתכנית 3–6 חודשים

## מה כלול?

- טיסות + מגורים + ארוחות
- סדנאות מקצועיות, מנהיגות, שפה
- כיסוי מלא — שווה ₪20,000–₪40,000
- חיבור לקהילות יהודיות-אתיופיות בעולם

## שלבי ההגשה

1. בקשה מקוונת באתר masaisrael.org
2. ראיון
3. אישור תוך 3 שבועות

## ראו גם

- [ג'וינט — מצוינות נוער](/he/education/scholarships/jdc-youth-excellence)
- [Olim Beyahad — ליווי קריירה](/he/education/scholarships/olim-beyahad-career-mentorship)
`,
      en: `## Who is eligible?

- Young adult of Ethiopian origin, aged 18–30
- Israeli citizen
- Has not previously participated in a Masa program
- Available for a 3–6 month program

## What's included?

- Flights + accommodation + meals
- Professional, leadership, and language workshops
- Full coverage — value ₪20,000–₪40,000
- Connection to Jewish-Ethiopian communities worldwide

## Application steps

1. Online application at masaisrael.org
2. Interview
3. Decision within 3 weeks

## See also

- [JDC Youth Excellence](/en/education/scholarships/jdc-youth-excellence)
- [Olim Beyahad Career Mentorship](/en/education/scholarships/olim-beyahad-career-mentorship)
`,
      am: `## ለማን ይሆናል?

- 18–30 ዓመት ኢትዮጵያ ዜጎች
- ቀደም ሳይሳተፉ
- 3–6 ወር ቁርጠኛ

## ምን ይካተታል?

- ጉዞ + ማደሪያ + ምግብ
- ሙያ፣ አመራር ወርክሾፕ
- ₪20,000–₪40,000 ዋጋ

## ደረጃዎች

1. masaisrael.org ቅጽ
2. ቃለ-ምርምር

## ይህንንም ይዩ

- [JDC ልቀት](/am/education/scholarships/jdc-youth-excellence)
`,
    },
  },

  // W2-17. Haifa University Ethiopian Integration Scholarship
  {
    slug: "haifa-university-integration",
    level: "undergrad",
    providerOrgSlug: "haifa-university",
    name: {
      he: "מלגת שילוב — אוניברסיטת חיפה",
      en: "Haifa University Integration Scholarship",
      am: "ሃይፋ ዩኒቨርሲቲ ውህደት ስኮላርሺፕ",
    },
    shortDescription: {
      he: "מלגת שילוב לסטודנטים ממוצא אתיופי באוניברסיטת חיפה — תמיכה בשנות הלימוד הראשונות.",
      en: "Integration scholarship for students of Ethiopian origin at Haifa University — support in the first years of study.",
      am: "ሃይፋ ዩኒቨርሲቲ ለኢትዮጵያ ዜጎች — ቀደምት ትምህርት ዓመታት ድጋፍ።",
    },
    amountMinIls: 7000,
    amountMaxIls: 15000,
    amountNote: {
      he: "מלגה לשנות לימוד א'–ב'; חידוש לשנה ג'–ד' לפי ממוצע.",
      en: "Scholarship for study years 1–2; renewal for years 3–4 based on GPA.",
      am: "1ኛ–2ኛ ዓመት ድጋፍ፤ ምዝናዬ ሲሟሉ 3ኛ–4ኛ ዓመት ታዳሽ።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://dekanat.haifa.ac.il/",
    tags: ["undergrad", "community", "integration"],
    communityPriority: true,
    relatedScholarships: ["marom-che", "hesegim-undergraduate"],
    relatedRights: ["student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית ממוצא אתיופי (שנת לימוד א' או ב') באוניברסיטת חיפה
- לא מקבל/ת מלגת שכר לימוד מלאה ממקור אחר
- הכנסה משפחתית עד 190% מקו העוני

## מה כלול?

- מלגה שנתית ₪7,000–₪15,000
- מנטור מלווה משנה א'
- סדנאות קליטה אקדמית
- תמיכה בשפה ובכתיבה אקדמית

## שלבי ההגשה

1. בקשה דרך מדור מלגות אוניברסיטת חיפה
2. מסמכים: ת"ז, אישור הכנסה, אישור לימודים
3. אישור תוך 3 שבועות

## ראו גם

- [מלגת מרום מל"ג](/he/education/scholarships/marom-che)
- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate)
`,
      en: `## Who is eligible?

- Student of Ethiopian origin (year 1 or 2) at Haifa University
- Not receiving a full tuition scholarship from another source
- Family income up to 190% of the poverty line

## What's included?

- Annual scholarship ₪7,000–₪15,000
- Mentor from year 1
- Academic absorption workshops
- Language and academic writing support

## Application steps

1. Apply through Haifa University scholarships office
2. Documents: ID, income proof, enrollment confirmation
3. Decision within 3 weeks

## See also

- [Marom CHE Scholarship](/en/education/scholarships/marom-che)
- [Hesegim Undergraduate](/en/education/scholarships/hesegim-undergraduate)
`,
      am: `## ለማን ይሆናል?

- ሃይፋ ዩኒቨርሲቲ 1ኛ/2ኛ ዓመት ኢትዮጵያ ዜጎች
- ሌላ ሙሉ ስኮላርሺፕ ያልተቀበሉ
- ቤተሰብ ገቢ ≤ 190%

## ምን ይካተታል?

- ₪7,000–₪15,000 ዓመታዊ
- አመቻቾ አማካሪ
- አካዳሚክ ትምህርት ወርክሾፕ

## ደረጃዎች

1. ሃይፋ ዩኒቨርሲቲ ቢሮ
2. ሰነዶች

## ይህንንም ይዩ

- [ማሮም CHE](/am/education/scholarships/marom-che)
`,
    },
  },

  // W2-18. Nevet Immigrant Women Scholarship
  {
    slug: "nevet-women",
    level: "undergrad",
    providerOrgSlug: "nevet",
    name: {
      he: "מלגת נווט — נשים עולות",
      en: "Nevet Immigrant Women Scholarship",
      am: "ነቬት — ኦሊም ሴቶች ስኮላርሺፕ",
    },
    shortDescription: {
      he: "מלגות לנשים עולות מאתיופיה ללימודים אקדמיים — תמיכה ייחודית למגדר בהשכלה גבוהה.",
      en: "Scholarships for immigrant women from Ethiopia pursuing academic studies — gender-specific support for higher education.",
      am: "ከኢትዮጵያ ለመጡ ኦሊም ሴቶች — ከፍተኛ ትምህርት ጾታ-ተኮር ድጋፍ።",
    },
    amountMinIls: 9000,
    amountMaxIls: 18000,
    amountNote: {
      he: "מלגה שנתית; ניתן לחדש; כוללת ליווי ותמיכה רגשית.",
      en: "Annual scholarship; renewable; includes mentorship and emotional support.",
      am: "ዓመታዊ ታዳሽ፤ ምክርና ስሜታዊ ድጋፍ ያካትታል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.nevet.org.il/scholarships",
    tags: ["undergrad", "women", "olim", "community"],
    communityPriority: true,
    relatedScholarships: ["klita-tuition-grant", "hesegim-undergraduate"],
    relatedRights: ["klita-basket-ethiopia"],
    bodies: {
      he: `## מי זכאית?

- אישה עולה מאתיופיה (ולד 1, 2, 3)
- לומדת לתואר ראשון במוסד אקדמי מוכר
- הכנסה משפחתית עד 200% מקו העוני

## מה כלול?

- מלגה שנתית ₪9,000–₪18,000
- מנטורית אישית (אישה מהקהילה עם ניסיון אקדמי)
- קבוצת תמיכה חודשית
- סיוע בהתמודדות עם ממסד בירוקרטי

## שלבי ההגשה

1. בקשה מקוונת באתר nevet.org.il
2. צירוף: ת"ז, תעודת עולה, אישור לימודים, אישור הכנסה
3. פגישת הכרה עם רכזת
4. אישור תוך 2–3 שבועות

## ראו גם

- [מענק שכר לימוד משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
- [מלגת הסגים](/he/education/scholarships/hesegim-undergraduate)
`,
      en: `## Who is eligible?

- Immigrant woman from Ethiopia (generation 1, 2, or 3)
- Studying for an undergraduate degree at a recognized institution
- Family income up to 200% of the poverty line

## What's included?

- Annual scholarship ₪9,000–₪18,000
- Personal female mentor (community woman with academic experience)
- Monthly support group
- Assistance navigating bureaucracy

## Application steps

1. Online application at nevet.org.il
2. Attach: ID, olim certificate, enrollment confirmation, income proof
3. Introductory meeting with coordinator
4. Decision within 2–3 weeks

## See also

- [Ministry of Aliyah Tuition Grant](/en/education/scholarships/klita-tuition-grant)
- [Hesegim Undergraduate](/en/education/scholarships/hesegim-undergraduate)
`,
      am: `## ለማን ይሆናል?

- ከኢትዮጵያ የመጡ ኦሊም ሴቶች
- ቤተሰብ ገቢ ≤ 200%

## ምን ይካተታል?

- ₪9,000–₪18,000 ዓመታዊ
- ሴት አማካሪ
- ወርሃዊ ድጋፍ ቡድን

## ደረጃዎች

1. nevet.org.il ቅጽ
2. ሰነዶች
3. ከ2–3 ሳምንት ምላሽ

## ይህንንም ይዩ

- [ቅሊታ ሚኒስቴር](/am/education/scholarships/klita-tuition-grant)
`,
    },
  },

  // W2-19. Na'amat Single-Parent Academic Stipend
  {
    slug: "naamat-single-parent",
    level: "undergrad",
    providerOrgSlug: "naamat",
    name: {
      he: "סטיפנדיית נעמת — הורה יחידני לומד",
      en: "Na'amat Single-Parent Academic Stipend",
      am: "ናዓማት — ነጠላ ወላጅ ትምህርት ድጋፍ",
    },
    shortDescription: {
      he: "סטיפנדיה לאמהות ואבות יחידניים ממוצא אתיופי הלומדים לתואר ראשון — כיסוי שכר לימוד + שמירת ילדים.",
      en: "Stipend for single mothers and fathers of Ethiopian origin studying for a degree — tuition coverage + childcare.",
      am: "ነጠላ ወላጅ ኢትዮጵያ ዜጎች ለሚማሩ — ትምህርት ክፍያ + የልጆች እንክብካቤ ሽፋን።",
    },
    amountMinIls: 10000,
    amountMaxIls: 22000,
    amountNote: {
      he: "שכר לימוד + עד ₪10,000 לשמירת ילדים; משתנה לפי מספר ילדים.",
      en: "Tuition + up to ₪10,000 for childcare; varies by number of children.",
      am: "ትምህርት ክፍያ + እስከ ₪10,000 የህፃናት እንክብካቤ፤ እንደ ልጆች ብዛት ይለያያል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://naamat.org.il/מלגות-לסטודנטיות/",
    tags: ["undergrad", "single-parent", "women", "community"],
    communityPriority: true,
    relatedScholarships: ["nevet-women", "klita-tuition-grant"],
    relatedRights: ["rights-for-single-mothers"],
    bodies: {
      he: `## מי זכאי/ת?

- הורה יחידני/ת ממוצא אתיופי
- לומד/ת לתואר ראשון (כל מוסד אקדמי)
- ילד/ים בטיפולו/ה מתחת לגיל 14
- הכנסה עד 170% מקו העוני

## מה כלול?

- כיסוי שכר לימוד ₪8,000–₪14,000
- תוספת לשמירת ילדים עד ₪10,000
- ייעוץ אקדמי ואישי
- קבוצת תמיכה לאמהות/אבות לומדים

## שלבי ההגשה

1. פנייה לסניף נעמת הקרוב
2. מסמכים: ת"ז, אישור הורות יחידנית, אישור לימודים, אישור הכנסה
3. שיחה עם רכזת
4. אישור תוך 2 שבועות

## ראו גם

- [מלגת נווט — נשים עולות](/he/education/scholarships/nevet-women)
- [מענק שכר לימוד משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
`,
      en: `## Who is eligible?

- Single parent of Ethiopian origin
- Studying for an undergraduate degree (any academic institution)
- Child/children in care under age 14
- Income up to 170% of the poverty line

## What's included?

- Tuition coverage ₪8,000–₪14,000
- Childcare supplement up to ₪10,000
- Academic and personal counseling
- Support group for student parents

## Application steps

1. Contact the nearest Na'amat branch
2. Documents: ID, single-parent confirmation, enrollment proof, income proof
3. Meeting with coordinator
4. Decision within 2 weeks

## See also

- [Nevet Immigrant Women Scholarship](/en/education/scholarships/nevet-women)
- [Ministry of Aliyah Tuition Grant](/en/education/scholarships/klita-tuition-grant)
`,
      am: `## ለማን ይሆናል?

- ኢትዮጵያ ዜጎች ነጠላ ወላጆች
- 14 ዓመት በታች ልጆች
- ቤተሰብ ገቢ ≤ 170%

## ምን ይካተታል?

- ₪8,000–₪14,000 ትምህርት
- እስከ ₪10,000 የህፃናት እንክብካቤ
- ምክር + ድጋፍ ቡድን

## ደረጃዎች

1. ቅርብ ናዓማት ቅርንጫፍ
2. ሰነዶች
3. ከ2 ሳምንት ምላሽ

## ይህንንም ይዩ

- [ነቬት ሴቶች](/am/education/scholarships/nevet-women)
`,
    },
  },

  // W2-20. Ministry of Finance — Poverty Reduction Study Grant
  {
    slug: "mof-poverty-study-grant",
    level: "undergrad",
    providerOrgSlug: "ministry-finance",
    name: {
      he: "מענק לימודים להפחתת עוני — משרד האוצר",
      en: "Ministry of Finance — Poverty Reduction Study Grant",
      am: "የፋይናንስ ሚኒስቴር — ድህነት ቅነሳ የጥናት ድጋፍ",
    },
    shortDescription: {
      he: "מענק ממשלתי לסטודנטים ממשפחות עוני המאפשר גישה להשכלה גבוהה — כולל רכיב ייחודי לקהילה האתיופית.",
      en: "Government grant for students from poverty-level families enabling higher education access — includes a dedicated component for the Ethiopian community.",
      am: "ድህነት ደረጃ ቤተሰቦች ተማሪዎች ከፍተኛ ትምህርት ተደራሽነት — ለኢትዮጵያ ማህበረሰብ ልዩ ክፍል ይካተታል።",
    },
    amountMinIls: 6000,
    amountMaxIls: 14000,
    amountNote: {
      he: "מענק שנתי לפי מדד עוני; אין צורך בממוצע ציונים מינימלי.",
      en: "Annual grant based on poverty index; no minimum GPA required.",
      am: "የድህነት ደረጃ ላይ ተመስርቶ ዓመታዊ ድጋፍ፤ ምዝናዬ ቅድመ-ሁኔታ የለም።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.gov.il/he/departments/mof/poverty-study-grant",
    tags: ["undergrad", "needs-based", "community", "government"],
    communityPriority: true,
    relatedScholarships: ["klita-tuition-grant", "marom-che", "siket-absorption"],
    relatedRights: ["klita-basket-ethiopia", "student-aid"],
    bodies: {
      he: `## מי זכאי?

- סטודנט/ית מכל רקע; עם רכיב עדיפות לקהילה האתיופית
- הכנסה משפחתית מתחת לקו העוני (100%)
- לומד/ת בתואר ראשון במוסד אקדמי מוכר
- אין דרישת ממוצע ציונים

## מה כלול?

- מענק שנתי ₪6,000–₪14,000
- אפשרות לצבירה עם מלגת מרום ומלגות קהילתיות
- ייעוץ רווחה דרך ביטוח לאומי

## שלבי ההגשה

1. הגשה דרך פורטל gov.il — חיפוש "מענק לימודים עוני"
2. מסמכים: ת"ז, תלושי שכר / אישור ביטוח לאומי, אישור לימודים
3. אישור תוך 3–4 שבועות
4. תשלום ישיר לחשבון

## ראו גם

- [מענק שכר לימוד משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
- [מלגת מרום מל"ג](/he/education/scholarships/marom-che)
- [מלגת שיקת](/he/education/scholarships/siket-absorption)
`,
      en: `## Who is eligible?

- Student from any background; Ethiopian community has priority component
- Family income below the poverty line (100%)
- Studying for an undergraduate degree at a recognized institution
- No GPA requirement

## What's included?

- Annual grant ₪6,000–₪14,000
- Can be combined with Marom and community scholarships
- Welfare counseling through National Insurance

## Application steps

1. Apply via gov.il portal — search "poverty study grant"
2. Documents: ID, pay stubs / National Insurance confirmation, enrollment proof
3. Decision within 3–4 weeks
4. Direct payment to account

## See also

- [Ministry of Aliyah Tuition Grant](/en/education/scholarships/klita-tuition-grant)
- [Marom CHE Scholarship](/en/education/scholarships/marom-che)
- [Siket Scholarship](/en/education/scholarships/siket-absorption)
`,
      am: `## ለማን ይሆናል?

- ከድህነት ወሰን በታች ቤተሰቦች ተማሪዎች
- ለኢትዮጵያ ማህበረሰብ ቅድሚያ ይሰጣል
- ምንም GPA ቅድመ-ሁኔታ

## ምን ይካተታል?

- ₪6,000–₪14,000 ዓመታዊ
- ከሌሎች ስኮላርሺፖች ጋር ሊጣመር ይችላል

## ደረጃዎች

1. gov.il ፖርታል
2. ሰነዶች
3. ከ3–4 ሳምንት ምላሽ

## ይህንንም ይዩ

- [ቅሊታ ሚኒስቴር](/am/education/scholarships/klita-tuition-grant)
- [ማሮም CHE](/am/education/scholarships/marom-che)
- [ሲቀት](/am/education/scholarships/siket-absorption)
`,
    },
  },
];
