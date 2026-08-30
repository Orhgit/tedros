// Scholarships Wave 3 — TED-95 education hub (12 entries).
//
// Follows the same ScholarshipEntry shape as scholarships.server.ts.
// Sourced from the TED-95 org/program list (Linear). Facts are used verbatim
// from the ticket brief. Internal review markers must NOT appear in bodies —
// they leaked to production once (TED-121); tests/content-markers.test.ts
// blocks them. Unverified figures carry a user-facing "verify with the
// institution" note instead. The Maccabim Fund entry was removed entirely:
// the source page did not match the described scholarship (W3-11).
//
// EN/AM bodies are drafted for structural completeness (same headings,
// shorter prose) but have NOT had native-speaker review — per CLAUDE.md
// convention (Hebrew source-of-truth, EN/AM mirrored), flag these as
// machine-assisted drafts pending human review before they are treated as
// canonical marketing copy.

import type { ScholarshipEntry } from "./scholarships.server";

export const SCHOLARSHIPS_WAVE3: ScholarshipEntry[] = [
  // W3-1. VATAT — Excellence & Mentoring
  {
    slug: "vatat-excellence-mentoring",
    level: "undergrad",
    providerOrgSlug: "vatat",
    name: {
      he: 'תוכנית ות"ת למצוינות ומנטורינג',
      en: "VATAT Excellence & Mentoring Program",
      am: "የVATAT ልቀትና አማካሪነት ፕሮግራም",
    },
    shortDescription: {
      he: 'תוכנית של ות"ת (הוועדה לתכנון ותקצוב) המצמידה מנטור מסגל אקדמי בכיר לכל סטודנט מצטיין יוצא אתיופיה — ליווי אקדמי, לא מלגה כספית גרידא.',
      en: "A VATAT (Planning and Budgeting Committee) program pairing a senior faculty mentor with every outstanding Ethiopian-Israeli student — academic mentorship, not a plain cash scholarship.",
      am: "እያንዳንዱ ላቅ ያለ ኢትዮጵያ-ተወላጅ ተማሪ ከከፍተኛ የመምህራን አባል ጋር አማካሪ የሚያገናኝ የVATAT ፕሮግራም — የገንዘብ ድጋፍ ብቻ ሳይሆን የአካዳሚክ ምክር።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "אין מרכיב כספי מובנה בתוכנית עצמה — הערך המרכזי הוא ליווי אקדמי אישי; ייתכן שילוב עם מלגות אחרות (למשל מרום) לאותו סטודנט.",
      en: "No built-in cash component — the core value is personal academic mentorship; may be combined with other scholarships (e.g. Marom) for the same student.",
      am: "ራሱ ፕሮግራሙ ውስጥ የገንዘብ ክፍል የለም — ዋናው ዋጋ የግል የአካዳሚክ ምክር ነው።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://che.org.il/qa/migvan/ethiopia/",
    tags: ["undergrad", "masters", "mentorship", "community", "government"],
    communityPriority: true,
    relatedScholarships: ["marom-che", "vatat-doctoral-postdoc-scholarship"],
    relatedRights: [],
    bodies: {
      he: `## מה זאת התוכנית?

תוכנית של ות"ת (הוועדה לתכנון ותקצוב, הזרוע התקציבית של מל"ג) המצמידה מנטור/ית מסגל אקדמי בכיר לכל סטודנט/ית מצטיין/ת יוצא/ת אתיופיה. זו **תוכנית ליווי, לא מלגה כספית** — ההבדל חשוב כדי לא ליצור ציפייה שגויה אצל מבקשים.

## מי זכאי?

- סטודנטים ממוצא אתיופי בעלי הישגים אקדמיים בולטים
- לומדים במוסד אקדמי מוכר על-ידי מל"ג/ות"ת

## מה כלול?

- הצמדת מנטור אקדמי בכיר (חבר סגל) לאורך תקופת הלימודים
- ליווי אקדמי, לא כספי — ייעוץ קריירה, כתיבה אקדמית, בחירת מסלול המשך

## איך פונים?

יש לפנות למשרד רו"ח הסטודנטים/יחידת הגיוון במוסד האקדמי בו לומדים, או ישירות דרך che.org.il — התוכנית מנוהלת ברמת המוסד ולא כהרשמה ארצית מרוכזת.

## ראו גם

- [מלגת מרום — המועצה להשכלה גבוהה](/he/education/scholarships/marom-che)
- [מלגות דוקטורנטים ובתר-דוקטורנטים — ות"ת](/he/education/scholarships/vatat-doctoral-postdoc-scholarship)
`,
      en: `## What is this program?

A VATAT (Planning and Budgeting Committee — the CHE's budgetary arm) program pairing a senior faculty mentor with every outstanding Ethiopian-Israeli student. This is a **mentorship program, not a cash scholarship** — an important distinction so applicants don't expect a stipend.

## Who is eligible?

- Students of Ethiopian origin with strong academic achievement
- Enrolled in a CHE/VATAT-recognized institution

## What's included?

- A senior faculty mentor throughout the studies
- Academic — not financial — mentorship: career advice, academic writing, choosing a follow-on track

## How to apply

Contact the Dean of Students / diversity office at your academic institution, or via che.org.il directly — the program is run at the institutional level, not as a centralized national application.

## See also

- [Marom Scholarship — Council for Higher Education](/en/education/scholarships/marom-che)
- [VATAT — Doctoral & Post-doctoral Scholarships](/en/education/scholarships/vatat-doctoral-postdoc-scholarship)
`,
      am: `## ይህ ፕሮግራም ምንድን ነው?

እያንዳንዱ ላቅ ያለ ኢትዮጵያ-ተወላጅ ተማሪ ከከፍተኛ የመምህራን አባል ጋር የሚያገናኝ የVATAT ፕሮግራም። ይህ **የምክር ፕሮግራም ነው፣ የገንዘብ ስኮላርሺፕ አይደለም**።

## ለማን ይሆናል?

- ጠንካራ የአካዳሚክ ውጤት ያላቸው ኢትዮጵያ-ተወላጅ ተማሪዎች
- በCHE/VATAT-እውቅና ባለው ተቋም የሚማሩ

*(ማስታወሻ፦ ትክክለኛ የማመልከቻ ሂደት በገለልተኝነት አልተረጋገጠም — ከመቅረብ በፊት ማጣራት ያስፈልጋል።)*

## ምን ይካተታል?

- በትምህርት ጊዜ ሁሉ ከፍተኛ የመምህራን አማካሪ
- የአካዳሚክ ምክር (የገንዘብ ድጋፍ አይደለም)

## እንዴት ማመልከት ይቻላል?

በተቋምዎ የተማሪዎች ዲን ጽ/ቤት ወይም በቀጥታ che.org.il በኩል ያነጋግሩ።

## ይህንንም ይዩ

- [ማሮም ስኮላርሺፕ](/am/education/scholarships/marom-che)
- [VATAT — የዶክትሬትና ድህረ-ዶክትሬት ድጋፎች](/am/education/scholarships/vatat-doctoral-postdoc-scholarship)
`,
    },
  },

  // W3-2. VATAT — Doctoral & Post-doctoral Scholarships
  {
    slug: "vatat-doctoral-postdoc-scholarship",
    level: "phd",
    providerOrgSlug: "vatat",
    name: {
      he: 'מלגות דוקטורנטים ובתר-דוקטורנטים — ות"ת',
      en: "VATAT Doctoral & Post-doctoral Scholarships",
      am: "የVATAT ዶክትሬትና ድህረ-ዶክትሬት ድጋፎች",
    },
    shortDescription: {
      he: 'מלגות של ות"ת לתואר שלישי ולמחקר בתר-דוקטורט עבור חוקרים יוצאי אתיופיה — פרטי הסכום המדויק דורשים אימות מול האוניברסיטה.',
      en: "VATAT scholarships for PhD and post-doctoral research for Ethiopian-Israeli researchers — exact amounts require verification with the host university.",
      am: "ለኢትዮጵያ-ተወላጅ ተመራማሪዎች ለዶክትሬትና ድህረ-ዶክትሬት VATAT ድጋፎች።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "סכום מדויק לא אומת עצמאית — מומלץ לאמת מול המוסד לפני ההגשה. מקור החיפוש: אתר הדיקנאט של האוניברסיטה העברית (social.huji.ac.il).",
      en: "Exact amount not independently verified — verify with the institution before applying. Source lead: HUJI Faculty of Social Sciences dean's office site (social.huji.ac.il).",
      am: "ትክክለኛ መጠን በገለልተኝነት አልተረጋገጠም።",
    },
    deadline: "2026-04-23",
    status: "closed",
    lastVerified: "2026-08-30",
    applicationUrl: "https://graduate.haifa.ac.il/מלגות-בתר-דוקטורט/",
    tags: ["phd", "postdoc", "academic", "community"],
    communityPriority: true,
    relatedScholarships: [
      "vatat-excellence-mentoring",
      "isef-fellowship",
      "cogito-stem-phd",
    ],
    relatedRights: [],
    bodies: {
      he: `## מה כוללת התוכנית?

מלגות של ות"ת (הוועדה לתכנון ותקצוב) לחוקרים יוצאי אתיופיה בשני מסלולים: **דוקטורט** (תואר שלישי) ו-**מחקר בתר-דוקטורט**. התוכנית מנוהלת ברמת מוסדות אקדמיים בודדים (התגלתה בעקבות חיפוש שהוביל לאתר הדיקנאט של האוניברסיטה העברית).

## מי זכאי?

- חוקרים יוצאי אתיופיה המתקבלים לתכנית דוקטורט או משרת בתר-דוקטורט באוניברסיטה מחקרית בישראל

## איך פונים?

יש לפנות לדיקנאט הסטודנטים או לביה"ס ללימודי תואר שלישי במוסד האקדמי הרלוונטי, ולציין שמדובר במלגת ות"ת ליוצאי אתיופיה.

## ראו גם

- [ות"ת — מצוינות ומנטורינג](/he/education/scholarships/vatat-excellence-mentoring)
- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
- [Cogito Scholars — דוקטורנטים STEM](/he/education/scholarships/cogito-stem-phd)
`,
      en: `## What does the program cover?

VATAT scholarships for Ethiopian-Israeli researchers across two tracks: **doctoral (PhD)** and **post-doctoral research**. The program appears to be administered at the individual-institution level (discovered via a search leading to the Hebrew University dean's office site).

## Who is eligible?

- Ethiopian-Israeli researchers accepted into a PhD program or a post-doctoral position at an Israeli research university

## How to apply

Contact the Dean of Students or the graduate school at the relevant academic institution and specify this is the VATAT scholarship for Ethiopian-Israeli researchers.

## See also

- [VATAT — Excellence & Mentoring](/en/education/scholarships/vatat-excellence-mentoring)
- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
- [Cogito Scholars — STEM PhD](/en/education/scholarships/cogito-stem-phd)
`,
      am: `## ፕሮግራሙ ምን ይሸፍናል?

ለኢትዮጵያ-ተወላጅ ተመራማሪዎች በሁለት መንገዶች የVATAT ድጋፎች፦ **ዶክትሬት** እና **ድህረ-ዶክትሬት ምርምር**።

## ለማን ይሆናል?

- በእስራኤል የምርምር ዩኒቨርሲቲ ለዶክትሬት ወይም ድህረ-ዶክትሬት የተቀበሉ ኢትዮጵያ-ተወላጅ ተመራማሪዎች

*(ማስታወሻ፦ ትክክለኛ የድጋፍ መጠንና የማመልከቻ ሂደት በገለልተኝነት አልተረጋገጠም — ከተቋሙ ዲን ጽ/ቤት ጋር ማጣራት ያስፈልጋል።)*

## እንዴት ማመልከት ይቻላል?

በተቋምዎ የተማሪዎች ዲን ጽ/ቤት ወይም የድህረ-ምረቃ ትምህርት ቤት ያነጋግሩ።

## ይህንንም ይዩ

- [VATAT — ልቀትና አማካሪነት](/am/education/scholarships/vatat-excellence-mentoring)
- [ISEF Fellowship](/am/education/scholarships/isef-fellowship)
`,
    },
  },

  // W3-3. Yoel Program (Chiburim Association)
  {
    slug: "yoel-program-chiburim",
    level: "pre-academic",
    providerOrgSlug: "chiburim",
    name: {
      he: "תוכנית יואל — עמותת חיבורים",
      en: "Yoel Program — Chiburim Association",
      am: "የዮኤል ፕሮግራም — ቺቡሪም ማህበር",
    },
    shortDescription: {
      he: "מכינה קדם-אקדמית + ליווי אישי וחברתי + מלגת מעונות לבני קהילת יוצאי אתיופיה, מטעם עמותת חיבורים.",
      en: "A pre-academic prep track + personal/social mentorship + dormitory scholarship for Ethiopian-Israeli community members, run by the Chiburim association.",
      am: "ከቺቡሪም ማህበር ለኢትዮጵያ-ተወላጅ ማህበረሰብ አባላት ቅድመ-አካዳሚክ ዝግጅት + የግልና ማህበራዊ ምክር + የመኖሪያ ድጋፍ።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "מלגת המעונות ניתנת בעין (מגורים), לא כסכום כספי מפורסם — נדרש אימות מול חיבורים.org.il לגובה מדויק אם קיים.",
      en: "The dormitory scholarship is in-kind (housing), not a published cash figure — verify with chiburim.org.il for an exact amount if one exists.",
      am: "የመኖሪያ ድጋፍ በዓይነት (መኖሪያ) እንጂ የታተመ የገንዘብ መጠን አይደለም።",
    },
    deadline: null,
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl: "https://chiburim.org.il",
    tags: ["pre-academic", "mentorship", "community", "housing"],
    communityPriority: true,
    relatedScholarships: ["atidim-pre-academic", "biu-mechina-ethiopian"],
    relatedRights: [],
    bodies: {
      he: `## מה זאת תוכנית יואל?

תוכנית של עמותת חיבורים המשלבת שלושה מרכיבים לבני קהילת יוצאי אתיופיה: **מכינה קדם-אקדמית**, **ליווי אישי וחברתי** לאורך התקופה, ו-**מלגת מעונות** (מגורים מסובסדים/בעין).

## מי זכאי?

- בני קהילת יוצאי אתיופיה בשלב מעבר מתיכון ללימודים גבוהים, הזקוקים להשלמת פערים אקדמיים לפני תואר

## מה כלול?

- שנת מכינה קדם-אקדמית
- ליווי אישי-חברתי (מנטור/ית) לאורך התקופה
- מלגת מעונות (מגורים)

## איך פונים?

הרשמה דרך chiburim.org.il.

## ראו גם

- [Atidim — מכינה קדם-אקדמית](/he/education/scholarships/atidim-pre-academic)
- [מכינה קדם-אקדמית, בר-אילן](/he/education/scholarships/biu-mechina-ethiopian)
`,
      en: `## What is the Yoel Program?

A Chiburim association program combining three elements for Ethiopian-Israeli community members: a **pre-academic prep year**, **personal/social mentorship** throughout, and a **dormitory scholarship** (subsidized/in-kind housing).

## Who is eligible?

- Ethiopian-Israeli community members transitioning from high school to higher education who need to close academic gaps before a degree

## What's included?

- A pre-academic prep year
- Personal/social mentorship throughout
- Dormitory (housing) scholarship

## How to apply

Register via chiburim.org.il.

## See also

- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
- [Bar-Ilan Pre-Academic Prep](/en/education/scholarships/biu-mechina-ethiopian)
`,
      am: `## የዮኤል ፕሮግራም ምንድን ነው?

ከቺቡሪም ማህበር ለኢትዮጵያ-ተወላጅ ማህበረሰብ አባላት ሶስት ነገሮችን የሚያጣምር ፕሮግራም፦ **ቅድመ-አካዳሚክ ዝግጅት ዓመት**፣ **የግልና ማህበራዊ ምክር**፣ እና **የመኖሪያ ድጋፍ**።

## ለማን ይሆናል?

- ከሁለተኛ ደረጃ ወደ ከፍተኛ ትምህርት የሚሸጋገሩ ኢትዮጵያ-ተወላጅ ማህበረሰብ አባላት

*(ትክክለኛ ብቁነት መስፈርቶች በገለልተኝነት አልተረጋገጡም።)*

## ምን ይካተታል?

- ቅድመ-አካዳሚክ ዝግጅት ዓመት
- የግልና ማህበራዊ ምክር
- የመኖሪያ ድጋፍ

## እንዴት ማመልከት ይቻላል?

በchiburim.org.il ይመዝገቡ።

## ይህንንም ይዩ

- [Atidim ቅድመ-አካዳሚክ](/am/education/scholarships/atidim-pre-academic)
`,
    },
  },

  // W3-4. Bar-Ilan Pre-Academic Prep for Ethiopian-Israeli students
  {
    slug: "biu-mechina-ethiopian",
    level: "pre-academic",
    providerOrgSlug: "biu",
    name: {
      he: "מכינה קדם-אקדמית ייעודית, בר-אילן",
      en: "Bar-Ilan Dedicated Pre-Academic Prep Program",
      am: "የባር-ኢላን ልዩ ቅድመ-አካዳሚክ ዝግጅት ፕሮግራም",
    },
    shortDescription: {
      he: "מכינה קדם-אקדמית של אוניברסיטת בר-אילן ליוצאי אתיופיה — תגבור אנגלית ומתמטיקה + מלגת מעונות.",
      en: "Bar-Ilan University's dedicated pre-academic program for Ethiopian-Israeli students — English/math reinforcement + dormitory scholarship.",
      am: "ለኢትዮጵያ-ተወላጅ ተማሪዎች የባር-ኢላን ዩኒቨርሲቲ ቅድመ-አካዳሚክ ፕሮግራም — እንግሊዝኛና ሂሳብ ማጠናከሪያ + የመኖሪያ ድጋፍ።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "המכינה כוללת תגבור לימודי ומלגת מעונות; לא פורסם סכום כספי ישיר לבדיקה עצמאית.",
      en: "The program includes academic reinforcement and a dormitory scholarship; no direct cash figure was published for independent verification.",
      am: "ፕሮግራሙ የትምህርት ማጠናከሪያና የመኖሪያ ድጋፍ ያካትታል።",
    },
    deadline: null,
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl: "https://mechina-kda.biu.ac.il",
    tags: ["pre-academic", "housing", "community"],
    communityPriority: true,
    relatedScholarships: ["atidim-pre-academic", "yoel-program-chiburim"],
    relatedRights: [],
    bodies: {
      he: `## מה זאת המכינה?

מכינה קדם-אקדמית ייעודית של אוניברסיטת בר-אילן, המיועדת לבני קהילת יוצאי אתיופיה הזקוקים לחיזוק לימודי לפני כניסה לתואר ראשון.

## מי זכאי?

- בוגרי תיכון יוצאי אתיופיה המעוניינים בלימודים אקדמיים בבר-אילן או במוסד אחר לאחר המכינה

## מה כלול?

- תגבור אנגלית ומתמטיקה ברמה הנדרשת לתואר ראשון
- מלגת מעונות (מגורים בקמפוס בר-אילן)

## איך פונים?

הרשמה דרך mechina-kda.biu.ac.il.

## ראו גם

- [Atidim — מכינה קדם-אקדמית](/he/education/scholarships/atidim-pre-academic)
- [תוכנית יואל — חיבורים](/he/education/scholarships/yoel-program-chiburim)
`,
      en: `## What is this program?

A dedicated pre-academic prep program at Bar-Ilan University for Ethiopian-Israeli community members who need academic reinforcement before starting an undergraduate degree.

## Who is eligible?

- Ethiopian-Israeli high-school graduates interested in academic study at Bar-Ilan or elsewhere after the prep year

## What's included?

- English and math reinforcement to the level required for an undergraduate degree
- Dormitory scholarship (housing on the Bar-Ilan campus)

## How to apply

Register via mechina-kda.biu.ac.il.

## See also

- [Atidim Pre-Academic](/en/education/scholarships/atidim-pre-academic)
- [Yoel Program — Chiburim](/en/education/scholarships/yoel-program-chiburim)
`,
      am: `## ይህ ፕሮግራም ምንድን ነው?

ከመጀመሪያ ዲግሪ በፊት የአካዳሚክ ማጠናከሪያ ለሚያስፈልጋቸው ኢትዮጵያ-ተወላጅ ማህበረሰብ አባላት የባር-ኢላን ዩኒቨርሲቲ ልዩ ቅድመ-አካዳሚክ ፕሮግራም።

## ለማን ይሆናል?

- በባር-ኢላን ወይም በሌላ ተቋም ለማጥናት ፍላጎት ያላቸው ኢትዮጵያ-ተወላጅ የሁለተኛ ደረጃ ምሩቃን

## ምን ይካተታል?

- እንግሊዝኛና ሂሳብ ማጠናከሪያ
- የመኖሪያ ድጋፍ (በባር-ኢላን ካምፓስ)

## እንዴት ማመልከት ይቻላል?

በmechina-kda.biu.ac.il ይመዝገቡ።

## ይህንንም ይዩ

- [Atidim ቅድመ-አካዳሚክ](/am/education/scholarships/atidim-pre-academic)
`,
    },
  },

  // W3-5. Tech-Career — organization profile / track catalog
  {
    slug: "tech-career-org",
    level: "vocational",
    providerOrgSlug: "tech-career",
    name: {
      he: "טק-קריירה — הכשרה טכנולוגית",
      en: "Tech-Career — Technology Training",
      am: "ቴክ-ካሪየር — የቴክኖሎጂ ስልጠና",
    },
    shortDescription: {
      he: "22 שנות פעילות, 1,300 בוגרים, 68 קורסים טכנולוגיים, כ-90% השמה בהייטק — הכשרה טכנולוגית לבני קהילת יוצאי אתיופיה.",
      en: "22 years active, 1,300 graduates, 68 tech courses, ~90% hi-tech placement — technology training for the Ethiopian-Israeli community.",
      am: "22 ዓመታት ንቁ፣ 1,300 ምሩቃን፣ 68 የቴክኖሎጂ ኮርሶች፣ ~90% የhi-tech ስራ ምደባ።",
    },
    amountMinIls: 30000,
    amountMaxIls: 50000,
    amountNote: {
      he: "הסטיפנדיה במהלך הבוטקמפ מפורטת בעמוד הספציפי של תכנית ה-bootcamp; עמוד זה מסכם את הארגון כמכלול — 68 קורסים, לא רק תכנית אחת.",
      en: "The bootcamp stipend is detailed on the specific bootcamp program page; this page summarizes the organization as a whole — 68 courses, not a single track.",
      am: "የቡት ካምፕ ድጋፍ በተለየው የቡት ካምፕ ገጽ ተብራርቷል።",
    },
    deadline: "rolling",
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.tech-career.org/items",
    tags: ["vocational", "tech", "community"],
    communityPriority: true,
    relatedScholarships: ["tech-career-bootcamp-stipend", "olim-beyachad-org"],
    relatedRights: [],
    bodies: {
      he: `## מי זה טק-קריירה?

עמותה הפועלת **22 שנה** בתחום ההכשרה הטכנולוגית לבני קהילת יוצאי אתיופיה. עד כה הכשירה **1,300 בוגרים** במסגרת **68 קורסים** שונים (Web, Mobile, Data, Cyber ותחומים נוספים), עם שיעור השמה בהייטק של **כ-90%**.

## למי מיועד?

- בני קהילה המעוניינים במעבר קריירה לתחומי טכנולוגיה, ללא צורך ברקע תכנותי קודם

## מה כלול?

- מגוון רחב של 68 קורסים טכנולוגיים
- ליווי להשמה בתעשיית ההייטק
- רשת בוגרים של 1,300 איש לאורך 22 שנות פעילות

## איך פוני?

הרשמה דרך tech-career.org — ראו גם את עמוד תכנית ה-bootcamp הספציפית עם פרטי סטיפנדיה.

## ראו גם

- [סטיפנדיית Tech-Career — Bootcamp](/he/education/scholarships/tech-career-bootcamp-stipend)
- [עולים ביחד](/he/education/scholarships/olim-beyachad-org)
`,
      en: `## Who is Tech-Career?

An association active for **22 years** in technology training for the Ethiopian-Israeli community. To date it has trained **1,300 graduates** across **68 different courses** (Web, Mobile, Data, Cyber, and more), with a hi-tech placement rate of **roughly 90%**.

## Who is it for?

- Community members seeking a career shift into technology, with no prior coding background required

## What's included?

- A wide catalog of 68 tech courses
- Hi-tech industry placement support
- A 1,300-strong alumni network built over 22 years

## How to apply

Register via tech-career.org — see also the specific bootcamp program page for stipend details.

## See also

- [Tech-Career Bootcamp Stipend](/en/education/scholarships/tech-career-bootcamp-stipend)
- [Olim Beyachad](/en/education/scholarships/olim-beyachad-org)
`,
      am: `## ቴክ-ካሪየር ማን ነው?

ለኢትዮጵያ-ተወላጅ ማህበረሰብ በቴክኖሎጂ ስልጠና ለ**22 ዓመታት** ንቁ የሆነ ማህበር። እስካሁን **1,300 ምሩቃን**ን በ**68 የተለያዩ ኮርሶች** አሰልጥኗል፣ በ~90% የhi-tech ስራ ምደባ መጠን።

## ለማን ነው?

- ወደ ቴክኖሎጂ ስራ መሸጋገር የሚፈልጉ ማህበረሰብ አባላት

## ምን ይካተታል?

- 68 የቴክኖሎጂ ኮርሶች
- የhi-tech ስራ ምደባ ድጋፍ
- 1,300 የቀድሞ ተማሪዎች መረብ

## እንዴት ማመልከት ይቻላል?

በtech-career.org ይመዝገቡ።

## ይህንንም ይዩ

- [የTech-Career Bootcamp ድጋፍ](/am/education/scholarships/tech-career-bootcamp-stipend)
`,
    },
  },

  // W3-6. Fidel Association
  {
    slug: "fidel-org",
    level: "high-school",
    providerOrgSlug: "fidel",
    name: {
      he: "עמותת פידל",
      en: "Fidel Association",
      am: "ፊደል ማህበር",
    },
    shortDescription: {
      he: "ארגון חינוך ושילוב חברתי ותיק של קהילת יוצאי אתיופיה — תכניות העשרה, ליווי חינוכי, וחיזוק זהות תרבותית.",
      en: "A long-established Ethiopian-Israeli community education and social-integration organization — enrichment programs, educational mentorship, and cultural-identity reinforcement.",
      am: "ቆየት ያለ የኢትዮጵያ-ተወላጅ ማህበረሰብ ትምህርትና ማህበራዊ ውህደት ድርጅት።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "פידל היא בעיקרה עמותת תכניות (לא קרן מלגות) — הערך המרכזי הוא תכניות חינוכיות/חברתיות, לא סכום כספי.",
      en: "Fidel is primarily a programs organization (not a scholarship fund) — the core value is educational/social programming, not a cash figure.",
      am: "ፊደል በዋናነት የፕሮግራሞች ድርጅት ነው (የስኮላርሺፕ ፈንድ አይደለም)።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.fidel.org.il",
    tags: ["high-school", "community", "identity"],
    communityPriority: true,
    relatedScholarships: ["enp-bagrut-grant"],
    relatedRights: [],
    bodies: {
      he: `## מי זאת פידל?

עמותת פידל היא ארגון חינוך ושילוב חברתי ותיק, הפועל למען בני קהילת יוצאי אתיופיה. הארגון כבר מופיע כ-profile ב-\`/he/orgs/fidel\` עם פרטי הקמה, יצירת קשר, ותכניות מלאים — עמוד זה מקשר בין אותו פרופיל לבין הקשר החינוכי הספציפי (מלגות/תכניות) ברצף ה-education hub.

## מה כלול?

- תכניות העשרה חינוכיות ותרבותיות
- ליווי חינוכי לילדים ובני נוער
- חיזוק זהות תרבותית-קהילתית

## איך פונים?

ראו את [עמוד הארגון המלא](/he/orgs/fidel) לפרטי יצירת קשר, שנת הקמה, וסניפים, או ישירות דרך fidel.org.il.

## ראו גם

- [מענק בגרות — ENP](/he/education/scholarships/enp-bagrut-grant)
- [עמוד ארגון פידל](/he/orgs/fidel)
`,
      en: `## Who is Fidel?

The Fidel association is a long-established education and social-integration organization serving the Ethiopian-Israeli community. The organization already has a full profile at \`/en/orgs/fidel\` with founding details, contact info, and programs — this page links that profile into the education-hub context (scholarships/programs).

## What's included?

- Educational and cultural enrichment programs
- Educational mentorship for children and youth
- Cultural-community identity reinforcement

## How to apply

See the [full organization profile](/en/orgs/fidel) for contact details, founding year, and branches, or go directly to fidel.org.il.

## See also

- [ENP Bagrut Grant](/en/education/scholarships/enp-bagrut-grant)
- [Fidel org profile](/en/orgs/fidel)
`,
      am: `## ፊደል ማን ነው?

ፊደል ማህበር ለኢትዮጵያ-ተወላጅ ማህበረሰብ የሚያገለግል ቆየት ያለ የትምህርትና ማህበራዊ ውህደት ድርጅት ነው። ሙሉ መገለጫ በ\`/am/orgs/fidel\` አለ።

## ምን ይካተታል?

- የትምህርትና ባህል ማበልፀጊያ ፕሮግራሞች
- ለልጆችና ወጣቶች የትምህርት ምክር

## እንዴት ማመልከት ይቻላል?

[ሙሉ የድርጅት መገለጫ](/am/orgs/fidel) ይመልከቱ ወይም በቀጥታ fidel.org.il ይጎብኙ።

## ይህንንም ይዩ

- [የENP ባግሩት ድጋፍ](/am/education/scholarships/enp-bagrut-grant)
`,
    },
  },

  // W3-7. Tebeka — Law Scholarships
  {
    slug: "tebeka-law-scholarship",
    level: "undergrad",
    providerOrgSlug: "tebeka",
    name: {
      he: "טבקה — מלגות למשפטנים",
      en: "Tebeka — Law Scholarships",
      am: "ቴቤካ — ለህግ ተማሪዎች ድጋፎች",
    },
    shortDescription: {
      he: "מלגות לסטודנטים למשפטים מקהילת יוצאי אתיופיה + תוכנית טרום-התמחות, מטעם טבקה — סיוע משפטי וקידום שוויון.",
      en: "Scholarships for Ethiopian-Israeli law students + a pre-internship program, from Tebeka — legal aid and equality advocacy.",
      am: "ከቴቤካ ለኢትዮጵያ-ተወላጅ ህግ ተማሪዎች ድጋፎች + ቅድመ-ልምምድ ፕሮግራም።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "סכום המלגה בפועל לא אומת עצמאית מול tebeka.org.il/kolzchut.org.il בזמן כתיבת עמוד זה — מומלץ לאמת מול המקור לפני ההגשה.",
      en: "The actual scholarship amount was not independently verified against tebeka.org.il/kolzchut.org.il while drafting this page — verify with the source before applying.",
      am: "ትክክለኛ የድጋፍ መጠን በገለልተኝነት አልተረጋገጠም።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.tebeka.org.il",
    tags: ["undergrad", "legal", "community", "career-shift"],
    communityPriority: true,
    relatedScholarships: ["isef-scholarship"],
    relatedRights: [],
    bodies: {
      he: `## מה כוללת התוכנית?

טבקה — עמותת סיוע משפטי וקידום שוויון לקהילת יוצאי אתיופיה — מפעילה מלגות לסטודנטים למשפטים מהקהילה, לצד **תוכנית טרום-התמחות** המכינה בוגרי משפטים להתמחות בפועל (לקראת רישיון עריכת דין).

## מי זכאי?

- סטודנטים למשפטים מקהילת יוצאי אתיופיה, בשלבי תואר או לקראת התמחות

## מה כלול?

- מלגה לסטודנטים למשפטים
- תוכנית טרום-התמחות — הכנה לקראת התמחות משפטית

## איך פונים?

דרך tebeka.org.il, או ראו את [עמוד הארגון המלא](/he/orgs/tebeka) לפרטי יצירת קשר.

## ראו גם

- [מלגת אייסף — עמיתי פוסט-דוקטורט](/he/education/scholarships/isef-scholarship)
- [עמוד ארגון טבקה](/he/orgs/tebeka)
`,
      en: `## What does the program cover?

Tebeka — a legal-aid and equality-advocacy association for the Ethiopian-Israeli community — runs scholarships for community law students, alongside a **pre-internship program** preparing law graduates for their practical internship (toward a bar license).

## Who is eligible?

- Ethiopian-Israeli law students, at any degree stage or approaching internship

## What's included?

- A scholarship for law students
- A pre-internship program preparing for the legal internship

## How to apply

Via tebeka.org.il, or see the [full org profile](/en/orgs/tebeka) for contact details.

## See also

- [ISEF Scholarship — Post-doctoral Fellows](/en/education/scholarships/isef-scholarship)
- [Tebeka org profile](/en/orgs/tebeka)
`,
      am: `## ፕሮግራሙ ምን ይሸፍናል?

ቴቤካ — ለኢትዮጵያ-ተወላጅ ማህበረሰብ የህግ እርዳታና እኩልነት ማህበር — ለማህበረሰብ ህግ ተማሪዎች ድጋፎችን ያካሂዳል፣ ከ**ቅድመ-ልምምድ ፕሮግራም** ጋር።

## ለማን ይሆናል?

- ኢትዮጵያ-ተወላጅ ህግ ተማሪዎች

## ምን ይካተታል?

- ለህግ ተማሪዎች ድጋፍ
- ቅድመ-ልምምድ ፕሮግራም

## እንዴት ማመልከት ይቻላል?

በtebeka.org.il በኩል፣ ወይም [ሙሉ የድርጅት መገለጫ](/am/orgs/tebeka) ይመልከቱ።

## ይህንንም ይዩ

- [የቴቤካ ድርጅት መገለጫ](/am/orgs/tebeka)
`,
    },
  },

  // W3-8. ISEF Fund — Scholarship + Post-doctoral Fellows
  {
    slug: "isef-scholarship",
    level: "phd",
    providerOrgSlug: "isef",
    name: {
      he: "קרן אייסף — מלגות ועמיתי פוסט-דוקטורט",
      en: "ISEF Fund — Scholarships & Post-doctoral Fellows",
      am: "የISEF ፈንድ — ድጋፎችና ድህረ-ዶክትሬት ባልደረቦች",
    },
    shortDescription: {
      he: 'מלגות אייסף לתואר ראשון/שני/דוקטורט, לצד תוכנית "עמיתי אייסף" למחקר בתר-דוקטורט בחו"ל (עד 10,000$). שונה מ"מלגת ISEF" (תואר שני/שלישי בארץ) שכבר קיימת בפורטל.',
      en: 'ISEF scholarships for bachelor\'s/master\'s/PhD, plus the "ISEF Fellows" post-doctoral research program abroad (up to $10,000). Distinct from the existing "ISEF Fellowship" page (domestic master\'s/PhD).',
      am: "ISEF ድጋፎች ለመጀመሪያ/ሁለተኛ/ዶክትሬት ዲግሪ፣ እና ለውጭ ሀገር ድህረ-ዶክትሬት ምርምር (እስከ 10,000$)።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: 'עמיתי אייסף לפוסט-דוקטורט: עד 10,000$ (דולר, לא ש"ח — לא הומר לשקלים כדי לא לעוות את הסכום המקורי). מלגות תואר ראשון/שני/דוקטורט: הסכום המדויק לא אומת עצמאית — לראות גם את "מלגת ISEF" (isef-fellowship) הקיימת לתואר שני/שלישי מקומי.',
      en: "ISEF Fellows post-doctoral: up to $10,000 (US dollars, not ILS — left unconverted to avoid distorting the original figure). Bachelor's/master's/PhD scholarships: exact amount not independently verified — see also the existing \"ISEF Fellowship\" page (isef-fellowship) for the domestic master's/PhD track.",
      am: "ድህረ-ዶክትሬት ባልደረቦች፦ እስከ 10,000$ (የአሜሪካ ዶላር)።",
    },
    deadline: null,
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl:
      "https://www.isef.org.il/%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%9C%D7%A1%D7%98%D7%95%D7%93%D7%A0%D7%98%D7%99%D7%9D/%D7%9E%D7%9C%D7%92%D7%94-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%98",
    tags: ["phd", "postdoc", "academic", "community"],
    communityPriority: true,
    relatedScholarships: ["isef-fellowship", "cogito-stem-phd"],
    relatedRights: [],
    bodies: {
      he: `## במה שונה עמוד זה מ"מלגת ISEF" הקיימת?

קרן אייסף מפעילה **יותר ממסלול אחד**. הפורטל כבר מציג את "מלגת ISEF" (\`isef-fellowship\`) — מלגת שכר לימוד וסטיפנדיה לתואר שני/שלישי בישראל. עמוד זה מתאר שני מסלולים **נוספים**:

1. **מלגות תואר ראשון/שני/דוקטורט** — מסלול רחב יותר מהמלגה הקיימת
2. **עמיתי אייסף** — תוכנית מחקר בתר-דוקטורט **בחו"ל**, עד **10,000$**

## מי זכאי?

- לתואר ראשון/שני/דוקטורט: סטודנטים יוצאי אתיופיה בישראל
- לעמיתי אייסף: חוקרים בעלי דוקטורט המבקשים לבצע מחקר בתר-דוקטורט במוסד מחקר מחוץ לישראל

## איך פונים?

הרשמה דרך isef.org.il — יש להבחין בין מסלול "עמיתי אייסף" (בתר-דוקטורט בחו"ל) לבין מלגות התואר הרגילות.

## ראו גם

- [מלגת ISEF — תואר שני/שלישי בארץ](/he/education/scholarships/isef-fellowship)
- [Cogito Scholars — דוקטורנטים STEM](/he/education/scholarships/cogito-stem-phd)
`,
      en: `## How is this different from the existing "ISEF Fellowship" page?

The ISEF Fund runs **more than one track**. The portal already has "ISEF Fellowship" (\`isef-fellowship\`) — a tuition + stipend scholarship for master's/PhD in Israel. This page describes two **additional** tracks:

1. **Bachelor's/master's/PhD scholarships** — a broader track than the existing scholarship
2. **ISEF Fellows** — a post-doctoral research program **abroad**, up to **$10,000**

## Who is eligible?

- For bachelor's/master's/PhD: Ethiopian-Israeli students in Israel
- For ISEF Fellows: PhD holders seeking to conduct post-doctoral research at a research institution outside Israel

## How to apply

Register via isef.org.il — distinguish between the "ISEF Fellows" track (post-doc abroad) and the regular degree scholarships.

## See also

- [ISEF Fellowship — domestic master's/PhD](/en/education/scholarships/isef-fellowship)
- [Cogito Scholars — STEM PhD](/en/education/scholarships/cogito-stem-phd)
`,
      am: `## ይህ ገጽ ካለው "ISEF Fellowship" እንዴት ይለያል?

የISEF ፈንድ ከአንድ በላይ መንገድ አለው። ይህ ገጽ ሁለት **ተጨማሪ** መንገዶችን ይገልጻል፦

1. **ለመጀመሪያ/ሁለተኛ/ዶክትሬት ዲግሪ ድጋፎች**
2. **የISEF ባልደረቦች** — ከእስራኤል **ውጭ** ድህረ-ዶክትሬት ምርምር፣ እስከ **$10,000**

## ለማን ይሆናል?

- ለዲግሪ ድጋፎች፦ በእስራኤል ያሉ ኢትዮጵያ-ተወላጅ ተማሪዎች
- ለባልደረቦች፦ ከእስራኤል ውጭ ድህረ-ዶክትሬት ምርምር የሚፈልጉ የዶክትሬት ያላቸው

*($10,000 የሚለው መጠን ከምንጩ (isef.org.il) እንደወጣ ነው የቀረበው፣ ወደ ሺል አልተቀየረም።)*

## እንዴት ማመልከት ይቻላል?

በisef.org.il በኩል ይመዝገቡ።

## ይህንንም ይዩ

- [ISEF Fellowship — በሀገር ውስጥ](/am/education/scholarships/isef-fellowship)
`,
    },
  },

  // W3-9. Ma'atzimot — Empowered Ethiopian Women
  {
    slug: "maatzimot-women-scholarship",
    level: "undergrad",
    providerOrgSlug: "maatzimot",
    name: {
      he: "נשים אתיופיות מעצימות",
      en: "Empowered Ethiopian Women (Ma'atzimot)",
      am: "አቅም ያላቸው ኢትዮጵያዊት ሴቶች (ማአጺሞት)",
    },
    shortDescription: {
      he: "מלגה לנשים יוצאות אתיופיה, בזווית מגדרית ייעודית — התארגנות עצמאית של נשים מהקהילה לקידום השכלה ותעסוקה.",
      en: "A scholarship for Ethiopian-Israeli women, with a dedicated gender lens — a community women-led initiative advancing education and employment.",
      am: "ለኢትዮጵያ-ተወላጅ ሴቶች ድጋፍ — በሴቶች የተመራ የማህበረሰብ ተነሳሽነት።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "סכום המלגה בפועל לא אומת עצמאית מול maatzimot.org.il בזמן כתיבת עמוד זה.",
      en: "The actual scholarship amount was not independently verified against maatzimot.org.il while drafting this page.",
      am: "ትክክለኛ የድጋፍ መጠን በገለልነት አልተረጋገጠም።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.maatzimot.org.il",
    tags: ["undergrad", "women", "community"],
    communityPriority: true,
    relatedScholarships: ["hesegim-undergraduate"],
    relatedRights: [],
    bodies: {
      he: `## מה זאת התוכנית?

"נשים אתיופיות מעצימות" (מעצימות) הוא ארגון עם זווית מגדרית ספציפית — מלגות ותמיכה לנשים יוצאות אתיופיה, מתוך הכרה בקשיים הייחודיים העומדים בפני נשים בקהילה בדרך להשכלה גבוהה ותעסוקה.

## מי זכאי?

- נשים יוצאות אתיופיה, בכל שלב לימודים (תיכון, מכינה, תואר)

## מה כלול?

- מלגה / תמיכה כלכלית לנשים מהקהילה
- קהילת תמיכה נשית ומנטורינג

## איך פונים?

דרך maatzimot.org.il.

## ראו גם

- [מלגת הסגים — תואר ראשון](/he/education/scholarships/hesegim-undergraduate)
`,
      en: `## What is this program?

"Empowered Ethiopian Women" (Ma'atzimot) is an organization with a specific gender lens — scholarships and support for Ethiopian-Israeli women, recognizing the distinct barriers women in the community face on the path to higher education and employment.

## Who is eligible?

- Ethiopian-Israeli women, at any study stage (high school, prep year, degree)

## What's included?

- A scholarship / financial support for community women
- A women's support community and mentorship

## How to apply

Via maatzimot.org.il.

## See also

- [Hesegim Undergraduate Scholarship](/en/education/scholarships/hesegim-undergraduate)
`,
      am: `## ይህ ፕሮግራም ምንድን ነው?

"አቅም ያላቸው ኢትዮጵያዊት ሴቶች" (ማአጺሞት) ለኢትዮጵያ-ተወላጅ ሴቶች ድጋፎችና ድጋፍ የሚሰጥ በሴቶች ላይ ያተኮረ ድርጅት ነው።

## ለማን ይሆናል?

- ኢትዮጵያ-ተወላጅ ሴቶች፣ በማንኛውም የትምህርት ደረጃ

## ምን ይካተታል?

- ለማህበረሰብ ሴቶች ድጋፍ
- የሴቶች ድጋፍ ማህበረሰብና ምክር

## እንዴት ማመልከት ይቻላል?

በmaatzimot.org.il በኩል።

## ይህንንም ይዩ

- [ሄሰጊም ስኮላርሺፕ](/am/education/scholarships/hesegim-undergraduate)
`,
    },
  },

  // W3-10. Olim Beyachad — organization profile (education + employment)
  {
    slug: "olim-beyachad-org",
    level: "vocational",
    providerOrgSlug: "olim-beyahad",
    name: {
      he: "עולים ביחד — תעסוקה והשכלה",
      en: "Olim Beyachad — Employment & Education",
      am: "ኦሊም ቢያካድ — ስራና ትምህርት",
    },
    shortDescription: {
      he: "ארגון תעסוקה והשכלה הפועל עם קהילת יוצאי אתיופיה, ושותף מוכר בפתח תקווה (ראו גם עמוד העיר).",
      en: "An employment-and-education organization working with the Ethiopian-Israeli community, and a recognized partner in Petach Tikva (see also the city page).",
      am: "ከኢትዮጵያ-ተወላጅ ማህበረሰብ ጋር የሚሰራ ስራና ትምህርት ድርጅት፣ በፔታህ ቲቅቫ የታወቀ አጋር።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "עמוד זה מתאר את הארגון כמכלול תעסוקה+השכלה; לפרטי מלגת ליווי הקריירה הספציפית ראו את הרשומה הקיימת olim-beyahad-career-mentorship.",
      en: "This page describes the organization as an employment+education whole; for the specific career-mentorship stipend see the existing olim-beyahad-career-mentorship entry.",
      am: "ይህ ገጽ ድርጅቱን በአጠቃላይ ይገልጻል።",
    },
    deadline: "rolling",
    status: "open",
    lastVerified: "2026-08-30",
    applicationUrl: "https://www.olim-beyahad.org.il",
    tags: ["vocational", "community", "employment", "petach-tikva"],
    communityPriority: true,
    relatedScholarships: ["olim-beyahad-career-mentorship", "tech-career-org"],
    relatedRights: [],
    bodies: {
      he: `## מי זה עולים ביחד?

עולים ביחד הוא ארגון תעסוקה והשכלה הפועל לצד קהילת יוצאי אתיופיה. הארגון הוא שותף מוכר ומוזכר בפועל בעמוד העיר [פתח תקווה](/he/cities/petach-tikva) — פתח תקווה מארחת ריכוז של אקדמאים ואנשי מקצוע בכירים מהקהילה, "בין השאר בזכות שיתוף הפעולה עם עמותת עולים ביחד" (טקסט זהה לזה שכבר מופיע בעמוד העיר, לשמירה על עקביות).

## מה כלול?

- ליווי תעסוקתי-השכלתי לבני הקהילה
- שיתוף פעולה מוסדי עם ערים בעלות ריכוז קהילתי (למשל פתח תקווה)

## מסלול ספציפי קיים בפורטל

לתוכנית ליווי הקריירה הספציפית של הארגון (מנטור אישי, חיבור למעסיקים, מלגת השלמה) — ראו [ליווי קריירה — עולים ביחד](/he/education/scholarships/olim-beyahad-career-mentorship).

## איך פונים?

דרך olim-beyahad.org.il, או ראו את [עמוד הארגון המלא](/he/orgs/olim-beyahad).

## ראו גם

- [ליווי קריירה — עולים ביחד](/he/education/scholarships/olim-beyahad-career-mentorship)
- [טק-קריירה](/he/education/scholarships/tech-career-org)
- [עיר: פתח תקווה](/he/cities/petach-tikva)
`,
      en: `## Who is Olim Beyachad?

Olim Beyachad is an employment-and-education organization working alongside the Ethiopian-Israeli community. It is a recognized partner mentioned on the [Petach Tikva city page](/en/cities/petach-tikva) — Petach Tikva hosts a concentration of senior professionals and academics from the community, "in part through collaboration with the Olim Beyahad organisation" (matching wording already on the city page, for consistency).

## What's included?

- Employment and education mentorship for community members
- Institutional partnership with cities that have a strong community presence (e.g. Petach Tikva)

## Existing specific track on the portal

For the organization's specific career-mentorship program (personal mentor, employer connections, supplementary stipend) — see [Career Mentorship — Olim Beyachad](/en/education/scholarships/olim-beyahad-career-mentorship).

## How to apply

Via olim-beyahad.org.il, or see the [full org profile](/en/orgs/olim-beyahad).

## See also

- [Career Mentorship — Olim Beyachad](/en/education/scholarships/olim-beyahad-career-mentorship)
- [Tech-Career](/en/education/scholarships/tech-career-org)
- [City: Petach Tikva](/en/cities/petach-tikva)
`,
      am: `## ኦሊም ቢያካድ ማን ነው?

ኦሊም ቢያካድ ከኢትዮጵያ-ተወላጅ ማህበረሰብ ጋር የሚሰራ ስራና ትምህርት ድርጅት ነው። በ[ፔታህ ቲቅቫ ከተማ ገጽ](/am/cities/petach-tikva) የተጠቀሰ አጋር ነው።

## ምን ይካተታል?

- ለማህበረሰብ አባላት የስራና ትምህርት ምክር
- ከከተሞች ጋር ተቋማዊ አጋርነት

## እንዴት ማመልከት ይቻላል?

በolim-beyahad.org.il በኩል፣ ወይም [ሙሉ የድርጅት መገለጫ](/am/orgs/olim-beyahad) ይመልከቱ።

## ይህንንም ይዩ

- [የስራ ምክር — ኦሊም ቢያካድ](/am/education/scholarships/olim-beyahad-career-mentorship)
`,
    },
  },

  // W3-12. HUJI Dean of Students — Ethiopian-Israeli Students Office
  {
    slug: "huji-dean-ethiopian-students",
    level: "undergrad",
    providerOrgSlug: "huji",
    name: {
      he: "דיקנאט הסטודנטים ליוצאי אתיופיה — האוניברסיטה העברית",
      en: "HUJI Dean of Students — Ethiopian-Israeli Students Office",
      am: "የHUJI ተማሪዎች ዲን — ኢትዮጵያ-ተወላጅ ተማሪዎች ጽ/ቤት",
    },
    shortDescription: {
      he: "שירות מוסדי של דיקנאט הסטודנטים באוניברסיטה העברית לבני קהילת יוצאי אתיופיה — לא מלגה כלל-ארצית, אלא תמיכה מוסדית מקומית.",
      en: "An institutional service from the Hebrew University Dean of Students for Ethiopian-Israeli students — not a nationwide scholarship, but local institutional support.",
      am: "ከHUJI ተማሪዎች ዲን ለኢትዮጵያ-ተወላጅ ተማሪዎች ተቋማዊ አገልግሎት — ብሔራዊ ድጋፍ አይደለም።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "שירות מוסדי (ליווי, ולעיתים מלגות מקומיות דרך הדיקנאט) — לא סכום ארצי אחיד; לבדוק מול studean.huji.ac.il.",
      en: "An institutional service (mentorship, and sometimes local scholarships via the dean's office) — not a uniform national figure; check studean.huji.ac.il.",
      am: "ተቋማዊ አገልግሎት እንጂ ብሔራዊ ወጥ መጠን አይደለም።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl:
      "https://studean.huji.ac.il/%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94",
    tags: ["undergrad", "masters", "community", "institutional"],
    communityPriority: true,
    relatedScholarships: ["vatat-doctoral-postdoc-scholarship", "marom-che"],
    relatedRights: [],
    bodies: {
      he: `## מה זה השירות?

דיקנאט הסטודנטים באוניברסיטה העברית מפעיל שירות ייעודי לבני קהילת יוצאי אתיופיה הלומדים בקמפוס. בשונה מרוב הרשומות האחרות בעמוד זה, **מדובר בשירות מוסדי-מקומי, לא במלגה ארצית**.

## מי זכאי?

- סטודנטים יוצאי אתיופיה הלומדים באוניברסיטה העברית (כל הקמפוסים)

## מה כלול?

- ליווי מוסדי לסטודנטים מהקהילה בקמפוס האוניברסיטה העברית
- ייתכנו מלגות/מענקים מקומיים דרך הדיקנאט (לאמת)

## איך פונים?

studean.huji.ac.il — עמוד "יוצאי אתיופיה" הספציפי בתוך אתר הדיקנאט.

## ראו גם

- [מלגות דוקטורנטים ובתר-דוקטורנטים — ות"ת](/he/education/scholarships/vatat-doctoral-postdoc-scholarship)
- [מלגת מרום — המועצה להשכלה גבוהה](/he/education/scholarships/marom-che)
`,
      en: `## What is this service?

The Hebrew University of Jerusalem's Dean of Students runs a dedicated service for Ethiopian-Israeli students on campus. Unlike most other entries on this page, **this is a local institutional service, not a nationwide scholarship**.

## Who is eligible?

- Ethiopian-Israeli students studying at the Hebrew University (any campus)

## What's included?

- Institutional support for community students on the HUJI campus
- Possibly local scholarships/grants via the dean's office (to verify)

## How to apply

studean.huji.ac.il — the specific "Ethiopian-Israeli students" page within the dean's office site.

## See also

- [VATAT — Doctoral & Post-doctoral Scholarships](/en/education/scholarships/vatat-doctoral-postdoc-scholarship)
- [Marom Scholarship — Council for Higher Education](/en/education/scholarships/marom-che)
`,
      am: `## ይህ አገልግሎት ምንድን ነው?

የHUJI ተማሪዎች ዲን ለኢትዮጵያ-ተወላጅ ተማሪዎች ልዩ አገልግሎት ያካሂዳል። ይህ **የተቋም አገልግሎት እንጂ ብሔራዊ ስኮላርሺፕ አይደለም**።

## ለማን ይሆናል?

- በHUJI የሚማሩ ኢትዮጵያ-ተወላጅ ተማሪዎች

## ምን ይካተታል?

- በካምፓስ ውስጥ ለማህበረሰብ ተማሪዎች ተቋማዊ ድጋፍ
- በዲን ጽ/ቤት በኩል የአካባቢ ድጋፎች ሊኖሩ ይችላሉ (ማጣራት ያስፈልጋል)

## እንዴት ማመልከት ይቻላል?

studean.huji.ac.il

## ይህንንም ይዩ

- [VATAT — የዶክትሬትና ድህረ-ዶክትሬት ድጋፎች](/am/education/scholarships/vatat-doctoral-postdoc-scholarship)
`,
    },
  },

  // W3-13. Open University Scholarship
  {
    slug: "openu-scholarship",
    level: "undergrad",
    providerOrgSlug: "openu",
    name: {
      he: "מלגת האוניברסיטה הפתוחה",
      en: "Open University Scholarship",
      am: "የክፍት ዩኒቨርሲቲ ድጋፍ",
    },
    shortDescription: {
      he: "מלגת האוניברסיטה הפתוחה ליוצאי אתיופיה — רלוונטית במיוחד למשפחות עובדות בזכות מודל הלימוד המרחוק/הגמיש.",
      en: "An Open University scholarship for Ethiopian-Israeli students — especially relevant for working families thanks to the remote/flexible study model.",
      am: "ለኢትዮጵያ-ተወላጅ ተማሪዎች የክፍት ዩኒቨርሲቲ ድጋፍ — ለስራተኛ ቤተሰቦች ተስማሚ የርቀት ትምህርት።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "סכום המלגה בפועל לא אומת עצמאית מול openu.ac.il/dean-students/scholarships בזמן כתיבת עמוד זה.",
      en: "The actual scholarship amount was not independently verified against openu.ac.il/dean-students/scholarships while drafting this page.",
      am: "ትክክለኛ የድጋፍ መጠን በገለልነት አልተረጋገጠም።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-08-30",
    applicationUrl:
      "https://www.openu.ac.il/dean-students/scholarships/pages/sc_for_ethiopia.aspx",
    tags: ["undergrad", "flexible-study", "community"],
    communityPriority: true,
    relatedScholarships: ["klita-tuition-grant"],
    relatedRights: [],
    bodies: {
      he: `## מה זאת המלגה?

מלגה של האוניברסיטה הפתוחה לסטודנטים יוצאי אתיופיה. הערך הייחודי כאן הוא **מודל הלימוד** של האוניברסיטה הפתוחה — למידה מרחוק וגמישה בקצב אישי — המתאימה במיוחד להורים עובדים ולבני קהילה המשלבים עבודה מלאה עם לימודים.

## מי זכאי?

- סטודנטים יוצאי אתיופיה הלומדים באוניברסיטה הפתוחה

## למה זה שונה מהתוכניות האחרות בעמוד?

בניגוד למכינות/מלגות הדורשות מגורים בקמפוס, מודל הלימוד המרחוק מתאים למי שלא יכול/ה לעזוב עבודה או משפחה לצורך לימודים מסורתיים.

## איך פונים?

openu.ac.il/dean-students/scholarships.

## ראו גם

- [מענק שכר לימוד — משרד הקליטה](/he/education/scholarships/klita-tuition-grant)
`,
      en: `## What is this scholarship?

An Open University of Israel scholarship for Ethiopian-Israeli students. The distinct value here is the Open University's **study model** — flexible, self-paced remote learning — which particularly suits working parents and community members combining full-time work with study.

## Who is eligible?

- Ethiopian-Israeli students studying at the Open University

## Why is this different from the other programs on this page?

Unlike prep programs/scholarships that require campus housing, the remote-study model suits those who cannot leave work or family for traditional in-person study.

## How to apply

openu.ac.il/dean-students/scholarships.

## See also

- [Ministry of Aliyah Tuition Grant](/en/education/scholarships/klita-tuition-grant)
`,
      am: `## ይህ ድጋፍ ምንድን ነው?

ለኢትዮጵያ-ተወላጅ ተማሪዎች የክፍት ዩኒቨርሲቲ ድጋፍ። ልዩ ዋጋው የ**ትምህርት ሞዴል** ነው — ተለዋዋጭ የርቀት ትምህርት — ለስራተኛ ወላጆችና ስራን ከትምህርት ጋር ለሚያዋህዱ ተስማሚ።

## ለማን ይሆናል?

- በክፍት ዩኒቨርሲቲ የሚማሩ ኢትዮጵያ-ተወላጅ ተማሪዎች

## ለምን ከሌሎቹ ይለያል?

የካምፓስ መኖሪያ ከሚያስፈልጋቸው መርሃ ግብሮች በተለየ፣ የርቀት ትምህርት ሞዴል ስራ ወይም ቤተሰብ መተው ለማይችሉ ተስማሚ ነው።

## እንዴት ማመልከት ይቻላል?

openu.ac.il/dean-students/scholarships

## ይህንንም ይዩ

- [የቅሊታ ሚኒስቴር ድጋፍ](/am/education/scholarships/klita-tuition-grant)
`,
    },
  },
];
