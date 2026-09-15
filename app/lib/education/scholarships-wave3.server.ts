// Scholarships Wave 3 — TED-95 education hub (7 entries).
//
// Follows the same ScholarshipEntry shape as scholarships.server.ts.
// Internal review markers must NOT appear in bodies — they leaked to
// production once (TED-121); tests/content-markers.test.ts blocks them.
// Per ADR-021, any entry stating a shekel amount carries a source URL and a
// visible verification date inside the entry itself.
//
// TED-168 verification sweep (2026-09-15), against each granting body's own
// current page. Five entries were deleted outright rather than softened:
//   - isef-scholarship          duplicate of isef-fellowship; its programme
//                               name appears nowhere on ISEF's site and its
//                               applicationUrl is a hard 404.
//   - olim-beyachad-org         an org profile, not a scholarship; duplicate
//                               of olim-beyahad-career-mentorship.
//   - openu-scholarship         the Open University awards no scholarship of
//                               its own; its page routes students elsewhere.
//   - vatat-excellence-mentoring  the programme name was invented; the real
//                               instrument is an institution-level budget
//                               line with no student application route.
//   (The Maccabim Fund entry was removed in an earlier wave, W3-11.)
// The five surviving entries were rewritten against primary sources.
//
// EN/AM bodies mirror the Hebrew (source of truth). Amharic is model-written
// and has NOT had native-speaker review — flag before treating as canonical.

import type { ScholarshipEntry } from "./scholarships.server";

export const SCHOLARSHIPS_WAVE3: ScholarshipEntry[] = [
  // W3-2. VATAT — Doctoral & Post-doctoral Scholarships (diversity populations)
  {
    slug: "vatat-doctoral-postdoc-scholarship",
    level: "phd",
    providerOrgSlug: "vatat",
    name: {
      he: 'מלגות ות"ת לדוקטורנטים ולבתר-דוקטורנטים מאוכלוסיות הגיוון',
      en: "VATAT Doctoral & Post-doctoral Scholarships (diversity populations)",
      am: "የVATAT የዶክትሬትና ድህረ-ዶክትሬት ድጋፎች (የብዝኃነት ሕዝቦች)",
    },
    shortDescription: {
      he: 'המסלול הייעודי ליוצאי אתיופיה בוטל. מ-20.3.2024 יוצאי אתיופיה הם אחת מקבוצות "אוכלוסיות הגיוון" בתכנית מאוחדת אחת — והגשה אפשרית רק דרך המוסד, לא ישירות.',
      en: "The Ethiopian-specific track was abolished. Since 20.3.2024 Ethiopian-Israelis are one of several eligible diversity groups in a single merged programme — and applications go through your institution only, never directly.",
      am: "ለኢትዮጵያ ተወላጆች የተለየው መስመር ተሰርዟል። ከ20.3.2024 ጀምሮ በአንድ የተዋሃደ ፕሮግራም ውስጥ ከብዝኃነት ሕዝቦች አንዱ ናቸው — ማመልከቻም በተቋሙ በኩል ብቻ ነው።",
    },
    amountMinIls: 62200,
    amountMaxIls: 62200,
    amountNote: {
      he: 'דוקטורט: כ-62,200 ₪ לשנה לשלוש שנים (52,200 ₪ מות"ת + 10,000 ₪ מהמוסד), ובנוסף 10,000 ₪ לשנה להוצאות מחקר; עד 37 מלגות. בתר-דוקטורט: 36,000$ לשנה (במחירי תשפ"ו) לשנתיים; עד 19 מלגות. מקור: che.org.il · נבדק ספטמבר 2026.',
      en: "Doctoral: about ₪62,200 a year for three years (₪52,200 from VATAT + ₪10,000 from the institution), plus ₪10,000 a year for research expenses; up to 37 scholarships. Post-doctoral: $36,000 a year (2025-26 prices) for two years; up to 19 scholarships. Source: che.org.il · verified September 2026.",
      am: "ዶክትሬት፦ በዓመት ወደ ₪62,200 ለሦስት ዓመታት (ከVATAT ₪52,200 + ከተቋሙ ₪10,000)፣ በተጨማሪም ለምርምር ወጪ በዓመት ₪10,000፤ እስከ 37 ድጋፎች። ድህረ-ዶክትሬት፦ በዓመት $36,000 ለሁለት ዓመታት፤ እስከ 19 ድጋፎች። ምንጭ፦ che.org.il · ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    deadline: "2026-06-01",
    status: "closed",
    lastVerified: "2026-09-15",
    applicationUrl:
      "https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/",
    tags: ["phd", "postdoc", "academic", "community"],
    communityPriority: true,
    relatedScholarships: ["isef-fellowship"],
    relatedRights: [],
    bodies: {
      he: `## מה קרה למסלול הייעודי ליוצאי אתיופיה?

הוא בוטל. בהחלטת ות"ת מ-20.3.2024 אוחדו התכניות הנפרדות — לחברה הערבית, לחברה החרדית, ליוצאי אתיופיה ומלגת לבציון — לתכנית אחת. יוצאי אתיופיה הם כיום אחת מכמה קבוצות הנכללות ב"אוכלוסיות הגיוון" הזכאיות, ולא אוכלוסיית יעד נפרדת עם מכסה משלה.

המשמעות המעשית: אם מצאתם באתר של אוניברסיטה עמוד שעדיין מתאר "מלגת ות"ת ליוצאי אתיופיה" כתכנית נפרדת — זה עמוד ישן שלא עודכן מאז האיחוד. אל תסתמכו עליו.

## שני המסלולים שקיימים היום

### דוקטורט

השם המלא: "תכנית מלגות ות"ת לדוקטורנטים מצטיינים מאוכלוסיות הגיוון ומהפריפריה החברתית-כלכלית (במקום התכניות הנפרדות לחברה ערבית, חברה חרדית, יוצאי אתיופיה ומלגת לבציון)".

- כ-62,200 ₪ לשנה, לשלוש שנים — 52,200 ₪ מות"ת ועוד 10,000 ₪ מהמוסד
- בנוסף: 10,000 ₪ לשנה להוצאות מחקר
- עד 37 מלגות

### בתר-דוקטורט

- 36,000$ לשנה (במחירי תשפ"ו), לשנתיים
- עד 19 מלגות

מקור: [ות"ת — תכנית מלגות לדוקטורנטים מצטיינים](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · נבדק ספטמבר 2026.
מקור: [ות"ת — מלגות בתר-דוקטורט](https://che.org.il/?post_type=scholarships&p=737887) · נבדק ספטמבר 2026.

## איך פונים? לא דרך טופס

זה הדבר החשוב ביותר לדעת כאן. הפרסום אומר במפורש: "אופן הגשת בקשה: באמצעות המוסדות בלבד". **אתם לא יכולים להגיש מועמדות בעצמכם.**

מה שכן עושים: פונים לרשות לתלמידי מחקר או למשרד הרקטור במוסד שבו אתם לומדים, מבררים מי אחראי שם על ההגשה לות"ת, ומגישים דרכם. אם אתם רק עכשיו מתקבלים לדוקטורט — שאלו על זה כבר בשיחת הקבלה.

**מועד סופי להגשת מועמדות ע"י המוסדות – 01.06.2026.** המוסד צריך את החומרים שלכם הרבה לפני התאריך הזה, אז אל תתחילו ביוני.

## ראו גם

- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
`,
      en: `## What happened to the Ethiopian-specific track?

It was abolished. A VATAT decision of 20.3.2024 merged the separate programmes — for Arab society, Haredi society, Ethiopian-Israelis, and the Levtzion scholarship — into one. Ethiopian-Israelis are now one of several eligible "diversity populations" groups, not a separate target population with its own quota.

In practice: if you find a university page still describing a separate "VATAT scholarship for Ethiopian-Israelis", that page has not been updated since the merger. Do not rely on it.

## The two tracks that exist today

### Doctoral

Full title: "VATAT scholarship programme for outstanding doctoral students from diversity populations and the socio-economic periphery (replacing the separate programmes for Arab society, Haredi society, Ethiopian-Israelis, and the Levtzion scholarship)".

- About ₪62,200 a year, for three years — ₪52,200 from VATAT plus ₪10,000 from the institution
- Plus ₪10,000 a year for research expenses
- Up to 37 scholarships

### Post-doctoral

- $36,000 a year (2025-26 prices), for two years
- Up to 19 scholarships

Source: [VATAT — outstanding doctoral students scholarship programme](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · verified September 2026.
Source: [VATAT — post-doctoral scholarships](https://che.org.il/?post_type=scholarships&p=737887) · verified September 2026.

## How to apply — not through a form

This is the single most useful thing to know. The call states explicitly: "Method of application: through the institutions only". **You cannot submit a candidacy yourself.**

What you do instead: contact the research-students authority or the rector's office at the institution where you study, find out who there handles the VATAT submission, and apply through them. If you are only now being accepted to a doctorate, raise it in your admission conversation.

**Final date for institutions to submit candidacies – 01.06.2026.** Your institution needs your materials well before that date, so do not start in June.

## See also

- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
`,
      am: `## ለኢትዮጵያ ተወላጆች የተለየው መስመር ምን ሆነ?

ተሰርዟል። በ20.3.2024 የVATAT ውሳኔ የተለያዩ ፕሮግራሞች — ለአረብ ማህበረሰብ፣ ለሐሬዲ ማህበረሰብ፣ ለኢትዮጵያ ተወላጆችና የሌቭጽዮን ድጋፍ — ወደ አንድ ተዋህደዋል። ኢትዮጵያ ተወላጆች ዛሬ ከ"ብዝኃነት ሕዝቦች" አንዱ ቡድን ናቸው እንጂ የተለየ ኮታ ያለው ሕዝብ አይደሉም።

የተለየ "የVATAT ድጋፍ ለኢትዮጵያ ተወላጆች" የሚል የዩኒቨርሲቲ ገጽ ካገኙ፣ ከውህደቱ ወዲህ ያልተሻሻለ አሮጌ ገጽ ነው። አይመኩበት።

## ዛሬ ያሉት ሁለት መስመሮች

### ዶክትሬት

- በዓመት ወደ ₪62,200፣ ለሦስት ዓመታት — ከVATAT ₪52,200 እና ከተቋሙ ₪10,000
- በተጨማሪም ለምርምር ወጪ በዓመት ₪10,000
- እስከ 37 ድጋፎች

### ድህረ-ዶክትሬት

- በዓመት $36,000 (የ2025-26 ዋጋ)፣ ለሁለት ዓመታት
- እስከ 19 ድጋፎች

ምንጭ፦ [VATAT — ለላቁ ዶክትሬት ተማሪዎች የድጋፍ ፕሮግራም](https://che.org.il/scholarships/%D7%AA%D7%9B%D7%A0%D7%99%D7%AA-%D7%9E%D7%9C%D7%92%D7%95%D7%AA-%D7%95%D7%AA%D7%AA-%D7%9C%D7%93%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%A0%D7%98%D7%99%D7%9D-%D7%9E%D7%A6%D7%98%D7%99%D7%99%D7%A0%D7%99%D7%9D/) · ሴፕቴምበር 2026 ተረጋግጧል።
ምንጭ፦ [VATAT — የድህረ-ዶክትሬት ድጋፎች](https://che.org.il/?post_type=scholarships&p=737887) · ሴፕቴምበር 2026 ተረጋግጧል።

## እንዴት ማመልከት ይቻላል — በቅጽ አይደለም

ጥሪው በግልጽ ይላል፦ "የማመልከቻ መንገድ፦ በተቋማት በኩል ብቻ"። **እርስዎ በራስዎ ማመልከት አይችሉም።**

በምትኩ፦ በሚማሩበት ተቋም ያለውን የምርምር ተማሪዎች ባለሥልጣን ወይም የሬክተር ጽ/ቤት ያነጋግሩ፣ የVATAT ማመልከቻን ማን እንደሚያስተናግድ ይወቁ፣ በእነሱ በኩል ያመልክቱ።

**ተቋማት ዕጩዎችን የሚያቀርቡበት የመጨረሻ ቀን – 01.06.2026።** ተቋሙ ሰነዶችዎን ከዚያ ቀን አስቀድሞ ይፈልጋል።

## ይህንንም ይዩ

- [ISEF Fellowship](/am/education/scholarships/isef-fellowship)
`,
    },
  },

  // W3-4. The Yoel Program (Chiburim), alongside the Bar-Ilan mechina
  {
    slug: "biu-mechina-ethiopian",
    level: "pre-academic",
    providerOrgSlug: "biu",
    name: {
      he: "תוכנית יואל — יוצאי אתיופיה לאקדמיה איכותית",
      en: "The Yoel Program — Ethiopian-Israelis to Quality Academia",
      am: "የዮኤል ፕሮግራም — ኢትዮጵያ ተወላጆች ወደ ጥራት ያለው አካዳሚ",
    },
    shortDescription: {
      he: "תוכנית מלווה לתלמידי המכינה הקדם-אקדמית בבר-אילן, שהוקמה ומופעלת על ידי עמותת חיבורים — מלגת מעונות, תגבור יומיומי וליווי מנטור במהלך התואר.",
      en: "A support programme for students of the Bar-Ilan pre-academic mechina, established and operated by the Chiburim association — a dormitory scholarship, daily reinforcement, and a mentor during the degree.",
      am: "በባር-ኢላን ቅድመ-አካዳሚክ መኪና ለሚማሩ ተማሪዎች የድጋፍ ፕሮግራም፣ በቺቡሪም ማህበር የተቋቋመና የሚንቀሳቀስ — የመኖሪያ ድጋፍ፣ ዕለታዊ ማጠናከሪያና በዲግሪ ጊዜ አማካሪ።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: 'לא פורסם סכום: התוכנית מציינת "מלגה לסיוע במימון המעונות" בלי לנקוב בסכום. מקור: mechina-kda.biu.ac.il · נבדק ספטמבר 2026.',
      en: 'No figure is published: the programme lists "a scholarship to help finance the dormitories" without stating an amount. Source: mechina-kda.biu.ac.il · verified September 2026.',
      am: 'መጠን አልታተመም፦ ፕሮግራሙ "የመኖሪያ ወጪን ለመደገፍ ስኮላርሺፕ" ይላል እንጂ መጠን አይጠቅስም። ምንጭ፦ mechina-kda.biu.ac.il · ሴፕቴምበር 2026 ተረጋግጧል።',
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-09-15",
    applicationUrl: "https://mechina-kda.biu.ac.il/Ethiopian_immigrants_in_academy",
    tags: ["pre-academic", "housing", "community"],
    communityPriority: true,
    relatedScholarships: [],
    relatedRights: [],
    bodies: {
      he: `## אין מכינה ייעודית — יש תוכנית מלווה

חשוב להתחיל מזה: בבר-אילן **אין מכינה קדם-אקדמית ייעודית ליוצאי אתיופיה**. המכינות הייעודיות שם מוגדרות לפי תחום לימוד — הנדסה ומדעים מדויקים, מטרו-טק, Tech Leaders, מדעי הטבע והחיים, מדעי החברה והרוח — ולא לפי קהילה.

מה שכן קיים, ומופיע באתר המכינה תחת "תוכניות מלוות", הוא **תוכנית יואל — "יוצאי אתיופיה לאקדמיה איכותית"**. בלשון האתר: "הוקמה ומופעלת על ידי עמותת 'חיבורים – חינוך בונה חברה'". כלומר זו תוכנית של עמותת חיבורים, שפועלת לצד המכינה של בר-אילן — לא מסלול של האוניברסיטה עצמה.

## מי זכאי?

כאן הטעות הנפוצה. התוכנית **לא** מיועדת לבוגרי תיכון באופן כללי — אתם צריכים כבר להיות תלמידי המכינה. ההגדרה באתר: "סטודנטים במכינה, בעלי שאיפות אקדמיות גבוהות… בעלי נתוני פתיחה טובים".

כלומר: קודם נרשמים למכינה של בר-אילן, ורק אז תוכנית יואל רלוונטית לכם.

## מה כלול?

- "מלגה לסיוע במימון המעונות"
- "תגבור לימודי יומיומי אחרי שעות הלימודים במכינה"
- "ליווי מנטור במהלך התואר"

בשלב א' התגבור כולל "אנגלית, מתמטיקה ומקצועות נוספים".

לא פורסם סכום למלגת המעונות. אם הסכום קריטי לתכנון שלכם — שאלו עליו לפני שאתם מסתמכים עליו.

## מתי נפתחת ההרשמה?

אין חלון הרשמה מפורסם, והאתר מסייג במפורש: "*** פתיחת התוכנית מותנית במס' המשתתפים." לכן הסטטוס כאן הוא "טרם נקבע" ולא "פתוח" — התוכנית עשויה לא להיפתח בכלל בשנה נתונה.

## איך פונים?

דרך [עמוד התוכנית באתר המכינה](https://mechina-kda.biu.ac.il/Ethiopian_immigrants_in_academy) (עודכן לאחרונה 08/01/2026), או ישירות לאיש הקשר המפורסם: רוני מוהר, 052-2649021.

מקור: [תוכנית יואל — המכינה הקדם-אקדמית, בר-אילן](https://mechina-kda.biu.ac.il/Ethiopian_immigrants_in_academy) · נבדק ספטמבר 2026.

## ראו גם

`,
      en: `## There is no dedicated mechina — there is a support programme

Start here: Bar-Ilan has **no dedicated pre-academic mechina for Ethiopian-Israelis**. Its dedicated mechinot are defined by subject — engineering and exact sciences, Metro-Tech, Tech Leaders, natural and life sciences, social sciences and humanities — not by community.

What does exist, listed on the mechina site under "accompanying programmes", is **the Yoel Program — "Ethiopian-Israelis to quality academia"**. In the site's own words: "established and operated by the 'Chiburim – Education Building Society' association". It is a Chiburim programme hosted alongside the Bar-Ilan mechina, not a track of the university itself.

## Who is eligible?

This is where people get it wrong. The programme is **not** for high-school graduates generally — you must already be a mechina student. The site's definition: "students in the mechina, with high academic aspirations… with good starting data".

So: you register for the Bar-Ilan mechina first, and only then does the Yoel Program become relevant to you.

## What's included?

- "A scholarship to help finance the dormitories"
- "Daily academic reinforcement after mechina hours"
- "Mentor support during the degree"

In stage A, the reinforcement covers "English, mathematics and additional subjects".

No figure is published for the dormitory scholarship. If the amount matters to your planning, ask before you rely on it.

## When does registration open?

There is no published registration window, and the page states explicitly: "*** Opening of the programme is conditional on the number of participants." That is why the status here is "to be announced" rather than "open" — the programme may not open at all in a given year.

## How to apply

Via the [programme page on the mechina site](https://mechina-kda.biu.ac.il/Ethiopian_immigrants_in_academy) (its own last-updated date: 08/01/2026), or directly to the published contact: Roni Mohar, 052-2649021.

Source: [The Yoel Program — Bar-Ilan pre-academic mechina](https://mechina-kda.biu.ac.il/Ethiopian_immigrants_in_academy) · verified September 2026.

## See also

`,
      am: `## የተለየ መኪና የለም — የድጋፍ ፕሮግራም ግን አለ

በባር-ኢላን ለኢትዮጵያ ተወላጆች **የተለየ ቅድመ-አካዳሚክ መኪና የለም**። እዚያ ያሉት የተለዩ መኪናዎች በትምህርት መስክ ነው የሚከፋፈሉት — ኢንጂነሪንግና ትክክለኛ ሳይንሶች፣ ሜትሮ-ቴክ፣ Tech Leaders፣ የተፈጥሮና የሕይወት ሳይንሶች፣ የማህበራዊና ሰብዓዊ ሳይንሶች — በማህበረሰብ አይደለም።

ያለው ነገር በመኪናው ድረ-ገጽ "አጃቢ ፕሮግራሞች" ሥር የተዘረዘረው **የዮኤል ፕሮግራም — "ኢትዮጵያ ተወላጆች ወደ ጥራት ያለው አካዳሚ"** ነው። በድረ-ገጹ ቃል፦ "በ'ቺቡሪም – ትምህርት ማህበረሰብ ገንቢ' ማህበር የተቋቋመና የሚንቀሳቀስ"። ይህም የቺቡሪም ፕሮግራም ነው፣ ከባር-ኢላን መኪና ጎን የሚሰራ እንጂ የዩኒቨርሲቲው መስመር አይደለም።

## ለማን ይሆናል?

ፕሮግራሙ በአጠቃላይ ለሁለተኛ ደረጃ ምሩቃን **አይደለም** — አስቀድመው የመኪና ተማሪ መሆን አለብዎት። የድረ-ገጹ ትርጓሜ፦ "በመኪና ውስጥ ያሉ ተማሪዎች፣ ከፍተኛ የአካዳሚክ ምኞት ያላቸው… ጥሩ የመነሻ መረጃ ያላቸው"።

ስለዚህ፦ በመጀመሪያ ለባር-ኢላን መኪና ይመዝገቡ፤ ከዚያ በኋላ ነው የዮኤል ፕሮግራም የሚመለከትዎት።

## ምን ይካተታል?

- "የመኖሪያ ወጪን ለመደገፍ ስኮላርሺፕ"
- "ከመኪና ሰዓታት በኋላ ዕለታዊ የትምህርት ማጠናከሪያ"
- "በዲግሪ ጊዜ የአማካሪ ድጋፍ"

በደረጃ አንድ ማጠናከሪያው "እንግሊዝኛ፣ ሂሳብና ተጨማሪ ትምህርቶች" ይሸፍናል።

ለመኖሪያ ስኮላርሺፑ መጠን አልታተመም።

## ምዝገባ መቼ ይከፈታል?

የታተመ የምዝገባ መስኮት የለም፣ ገጹም በግልጽ ይላል፦ "*** የፕሮግራሙ መከፈት በተሳታፊዎች ቁጥር ላይ የተመሰረተ ነው።" ስለዚህ ሁኔታው "ገና አልተወሰነም" ነው።

## እንዴት ማመልከት ይቻላል?

በ[የፕሮግራሙ ገጽ](https://mechina-kda.biu.ac.il/Ethiopian_immigrants_in_academy) በኩል (የገጹ የመጨረሻ ማሻሻያ ቀን፦ 08/01/2026)፣ ወይም በታተመው አድራሻ፦ ሮኒ ሞሃር፣ 052-2649021።

ምንጭ፦ [የዮኤል ፕሮግራም — የባር-ኢላን ቅድመ-አካዳሚክ መኪና](https://mechina-kda.biu.ac.il/Ethiopian_immigrants_in_academy) · ሴፕቴምበር 2026 ተረጋግጧል።

## ይህንንም ይዩ

`,
    },
  },

  // W3-5. Tech-Career — organization profile / course catalog
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
      he: "מרכז הכשרה טכנולוגי לצעירים יוצאי אתיופיה, פועל מעל 20 שנים. מעל 88% מהבוגרות והבוגרים משתלבים בהייטק. הלימודים אחר הצהריים, פעמיים בשבוע — אפשר לשלב עבודה.",
      en: "A technology training centre for young Ethiopian-Israelis, running for over 20 years. Over 88% of graduates go into hi-tech. Classes are afternoons, twice a week — you can keep working.",
      am: "ለወጣት ኢትዮጵያ ተወላጆች የቴክኖሎጂ ስልጠና ማዕከል፣ ከ20 ዓመታት በላይ የሰራ። ከ88% በላይ ምሩቃን ወደ ሃይቴክ ይገባሉ። ትምህርቱ ከሰዓት በኋላ፣ በሳምንት ሁለት ጊዜ ነው።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "הארגון אינו מפרסם באתרו סכום סטיפנדיה, וגם עלות הקורס אינה מצוינת שם — יש לברר את שניהם ישירות מול טק-קריירה. מקור: tech-career.org · נבדק ספטמבר 2026.",
      en: "The organisation publishes no stipend figure on its site, and the cost of a course is not stated there either — ask Tech-Career directly about both. Source: tech-career.org · verified September 2026.",
      am: "ድርጅቱ በድረ-ገጹ የድጋፍ መጠን አያትምም፣ የኮርሱም ዋጋ እዚያ አልተጠቀሰም — ሁለቱንም በቀጥታ ይጠይቁ። ምንጭ፦ tech-career.org · ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    deadline: "2026-10-20",
    status: "open",
    lastVerified: "2026-09-15",
    applicationUrl: "https://www.tech-career.org/items",
    tags: ["vocational", "tech", "community"],
    communityPriority: true,
    relatedScholarships: ["olim-beyahad-career-mentorship"],
    relatedRights: [],
    bodies: {
      he: `## מי זה טק-קריירה?

"Tech-Career מרכז הכשרה טכנולוגי לצעירים יוצאי אתיופיה", שפועל לפי אתרו "כבר מעל 20 שנים".

הנתון שהארגון מפרסם על עצמו: **"מעל 88% מהבוגרות והבוגרים משתלבים במשרות נחשקות בתעשיית ההייטק"**.

## למי זה מיועד?

האתר מגדיר קהל רחב יותר משנהוג להניח: "צעירות וצעירים, אימהות, מילואמניקים ומילואמניקיות, אנשים שנפגעו במלחמת חרבות ברזל". לא מפורסם קריטריון גיל.

## מה נדרש מכם

התנאים המפורסמים הם שלושה בלבד:

- למידה עצמית
- מעבר מבחן מיון
- נוכחות קורס של 80%

## הקורסים שמופיעים היום

- **Cloud-Network Engineer** — לוד, נפתח 30.08.2026 (המחזור כבר התחיל)
- **Cyber-Network Analyst** — לוד, נפתח 14.09.2026
- **QA Automation** — חיפה, נפתח 20.10.2026

אלה תאריכי פתיחת מחזור, לא הרשמה מתגלגלת. מי שמפספס מחזור ממתין לזה שאחריו — לכן כדאי לפנות מוקדם ולא ביום הפתיחה.

## פורמט הלימודים

"א'-ד' אחה"צ פעמיים בשבוע 17:00–21:00" — היברידי, אחר הצהריים, במתכונת חלקית. לשאלה "האם ניתן לשלב עבודה?" האתר עונה: "כן".

## כמה זה עולה, וכמה מקבלים?

הארגון אינו מפרסם באתרו לא סכום סטיפנדיה ולא את עלות הקורס. אל תניחו סכום — שאלו אותם.

## איך פונים?

דרך [עמוד הקורסים](https://www.tech-career.org/items).

מקור: [Tech-Career — קורסים](https://www.tech-career.org/items) · נבדק ספטמבר 2026.

## ראו גם

- [מצוינות ומנהיגות בתעסוקה — עולים ביחד](/he/education/scholarships/olim-beyahad-career-mentorship)
`,
      en: `## Who is Tech-Career?

"Tech-Career, a technology training centre for young Ethiopian-Israelis", which per its own site has been running "for over 20 years already".

The figure the organisation publishes about itself: **"over 88% of graduates go into sought-after roles in the hi-tech industry"**.

## Who is it for?

The site defines a broader audience than people assume: "young women and men, mothers, reservists, and people injured in the Iron Swords war". No age criterion is published.

## What is required of you

The published requirements are only three:

- Self-directed learning
- Passing a screening test
- 80% course attendance

## The courses listed today

- **Cloud-Network Engineer** — Lod, started 30.08.2026 (this cohort has already begun)
- **Cyber-Network Analyst** — Lod, starts 14.09.2026
- **QA Automation** — Haifa, starts 20.10.2026

These are cohort start dates, not rolling admission. Miss a cohort and you wait for the next one — so approach early, not on the start date.

## Study format

"Sun-Wed afternoons, twice a week, 17:00–21:00" — hybrid, afternoons, part-time. To the question "can this be combined with work?" the site answers: "yes".

## What does it cost, and what do you get?

The organisation publishes neither a stipend figure nor a course cost on its site. Do not assume an amount — ask them.

## How to apply

Via the [courses page](https://www.tech-career.org/items).

Source: [Tech-Career — courses](https://www.tech-career.org/items) · verified September 2026.

## See also

- [Excellence & Leadership in Employment — Olim Beyahad](/en/education/scholarships/olim-beyahad-career-mentorship)
`,
      am: `## ቴክ-ካሪየር ማን ነው?

"ቴክ-ካሪየር፣ ለወጣት ኢትዮጵያ ተወላጆች የቴክኖሎጂ ስልጠና ማዕከል"፣ በራሱ ድረ-ገጽ መሰረት "ከ20 ዓመታት በላይ" የሰራ።

ድርጅቱ ስለራሱ የሚያትመው አኃዝ፦ **"ከ88% በላይ ምሩቃን በሃይቴክ ኢንዱስትሪ ተፈላጊ ሥራዎች ይቀላቀላሉ"**።

## ለማን ነው?

ድረ-ገጹ ሰፊ ተሳታፊ ይገልጻል፦ "ወጣት ሴቶችና ወንዶች፣ እናቶች፣ የተጠባባቂ ሠራዊት አባላት፣ በብረት ሰይፍ ጦርነት የተጎዱ ሰዎች"። የዕድሜ መስፈርት አልታተመም።

## ከእርስዎ የሚጠበቀው

የታተሙት መስፈርቶች ሦስት ብቻ ናቸው፦

- ራስን የማስተማር ችሎታ
- የመለያ ፈተና ማለፍ
- የ80% የኮርስ ተገኝነት

## ዛሬ የተዘረዘሩት ኮርሶች

- **Cloud-Network Engineer** — ሎድ፣ በ30.08.2026 ተጀምሯል
- **Cyber-Network Analyst** — ሎድ፣ በ14.09.2026 ይጀምራል
- **QA Automation** — ሃይፋ፣ በ20.10.2026 ይጀምራል

እነዚህ የዙር መጀመሪያ ቀኖች ናቸው እንጂ ቀጣይ ምዝገባ አይደለም። ዙር ካመለጠዎት ቀጣዩን ይጠብቃሉ።

## የትምህርት አወቃቀር

"እሑድ-ረቡዕ ከሰዓት በኋላ፣ በሳምንት ሁለት ጊዜ፣ 17:00–21:00" — ድብልቅ፣ ከሰዓት በኋላ፣ በትርፍ ሰዓት። "ከሥራ ጋር ማዋሃድ ይቻላል?" ለሚለው ጥያቄ ድረ-ገጹ "አዎ" ይላል።

## ዋጋውና ድጋፉ ስንት ነው?

ድርጅቱ በድረ-ገጹ የድጋፍ መጠንም የኮርስ ዋጋም አያትምም። መጠን አይገምቱ — ይጠይቋቸው።

## እንዴት ማመልከት ይቻላል?

በ[የኮርሶች ገጽ](https://www.tech-career.org/items) በኩል።

ምንጭ፦ [Tech-Career — ኮርሶች](https://www.tech-career.org/items) · ሴፕቴምበር 2026 ተረጋግጧል።

## ይህንንም ይዩ

- [በሥራ ስምሪት ልቀትና አመራር — Olim Beyahad](/am/education/scholarships/olim-beyahad-career-mentorship)
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
      he: "עמותה לחינוך ושילוב חברתי של יוצאי אתיופיה, שהוקמה ב-1997 — מרכזי נוער, מנהיגות צעירה, STEP UP, סדנאות להורים ועוד.",
      en: "An association for the education and social integration of Ethiopian-Israelis, founded in 1997 — youth centres, young leadership, STEP UP, parent workshops and more.",
      am: "የኢትዮጵያ ተወላጆችን ትምህርትና ማህበራዊ ውህደት የሚያገለግል ማህበር፣ በ1997 የተቋቋመ — የወጣቶች ማዕከላት፣ የወጣት አመራር፣ STEP UP፣ ለወላጆች ወርክሾፖች እና ሌሎችም።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "פידל היא עמותת תכניות ולא קרן מלגות — אין לה קול קורא למלגה ואין סכום לפרסם. מקור: fidel.org.il · נבדק ספטמבר 2026.",
      en: "Fidel is a programmes association, not a scholarship fund — it runs no scholarship call and publishes no amount. Source: fidel.org.il · verified September 2026.",
      am: "ፊደል የፕሮግራሞች ማህበር ነው እንጂ የስኮላርሺፕ ፈንድ አይደለም — የስኮላርሺፕ ጥሪም መጠንም የለውም። ምንጭ፦ fidel.org.il · ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-09-15",
    applicationUrl: "https://www.fidel.org.il",
    tags: ["high-school", "community", "identity"],
    communityPriority: true,
    relatedScholarships: [],
    relatedRights: [],
    bodies: {
      he: `## מי זאת פידל?

בלשון העמותה עצמה: "פידל (פירוש פידל: א-ב באמהרית), עמותה לחינוך ושילוב חברתי של יוצאי אתיופיה… עמותת פידל הוקמה בשנת 1997 ע"י יוצאי אתיופיה וישראלים ותיקים."

## התכניות של פידל

- מרכזי נוער
- מנהיגות צעירה
- STEP UP
- סדנאות להורים
- חינוך לבריאות
- אופק לבוגרים
- מגשרים חינוכיים

## למי זה מיועד?

הרשומה מסווגת כאן תחת שלב "תיכון", וזה צר מהמציאות: תכנית "אופק לבוגרים" פונה לבוגרים, לא לתלמידי תיכון. אם אתם מחוץ לגיל בית הספר — עדיין יש כאן מה לבדוק.

## האם יש מועד הגשה?

לא. לפידל אין מחזור הגשה ואין טופס מלגה — פונים לעמותה ישירות ומבררים איזו תכנית רלוונטית לכם.

## איך פונים?

ראו את [עמוד הארגון המלא](/he/orgs/fidel) לפרטי יצירת קשר וסניפים, או ישירות דרך fidel.org.il.

מקור: [עמותת פידל](https://www.fidel.org.il) · נבדק ספטמבר 2026.

## ראו גם

- [עמוד ארגון פידל](/he/orgs/fidel)
`,
      en: `## Who is Fidel?

In the association's own words: "Fidel (the meaning of 'fidel': the alphabet in Amharic), an association for the education and social integration of Ethiopian-Israelis… The Fidel association was founded in 1997 by Ethiopian-Israelis and veteran Israelis."

## Fidel's programmes

- Youth centres
- Young leadership
- STEP UP
- Parent workshops
- Health education
- Ofek for adults
- Educational mediators

## Who is it for?

This entry is filed under the "high school" stage, and that is narrower than reality: the "Ofek for adults" programme serves adults, not high-school students. If you are past school age, there is still something here to check.

## Is there a deadline?

No. Fidel has no application cycle and no scholarship form — you contact the association directly and find out which programme fits you.

## How to apply

See the [full organization profile](/en/orgs/fidel) for contact details and branches, or go directly to fidel.org.il.

Source: [Fidel Association](https://www.fidel.org.il) · verified September 2026.

## See also

- [Fidel org profile](/en/orgs/fidel)
`,
      am: `## ፊደል ማን ነው?

በማህበሩ ቃል፦ "ፊደል (የፊደል ትርጉም፦ በአማርኛ ፊደል)፣ የኢትዮጵያ ተወላጆችን ትምህርትና ማህበራዊ ውህደት የሚያገለግል ማህበር… የፊደል ማህበር በ1997 ዓ.ም. በኢትዮጵያ ተወላጆችና በአንጋፋ እስራኤላውያን ተቋቋመ።"

## የፊደል ፕሮግራሞች

- የወጣቶች ማዕከላት
- የወጣት አመራር
- STEP UP
- ለወላጆች ወርክሾፖች
- የጤና ትምህርት
- ኦፌክ ለአዋቂዎች
- የትምህርት አስታራቂዎች

## ለማን ነው?

ይህ መዝገብ በ"ሁለተኛ ደረጃ" ደረጃ ተመድቧል፣ ይህ ግን ከእውነታው ጠባብ ነው፦ "ኦፌክ ለአዋቂዎች" ለአዋቂዎች ያገለግላል።

## የማስገቢያ ቀን አለ?

የለም። ፊደል የማመልከቻ ዙርም የስኮላርሺፕ ቅጽም የለውም — ማህበሩን በቀጥታ ያነጋግሩ።

## እንዴት ማመልከት ይቻላል?

[ሙሉ የድርጅት መገለጫ](/am/orgs/fidel) ይመልከቱ ወይም በቀጥታ fidel.org.il ይጎብኙ።

ምንጭ፦ [ፊደል ማህበር](https://www.fidel.org.il) · ሴፕቴምበር 2026 ተረጋግጧል።

## ይህንንም ይዩ

- [የፊደል ድርጅት መገለጫ](/am/orgs/fidel)
`,
    },
  },

  // W3-7. Scholarship for Ethiopian-Israeli law students in memory of Adv. Zvi Meitar
  {
    slug: "tebeka-law-scholarship",
    level: "undergrad",
    providerOrgSlug: "tebeka",
    name: {
      he: 'מלגה למשפטנים יוצאי אתיופיה ע"ש עו"ד צבי מיתר ז"ל',
      en: "Scholarship for Ethiopian-Israeli Law Students in memory of Adv. Zvi Meitar",
      am: "በጠበቃ ዝቪ ሜይታር መታሰቢያ ለኢትዮጵያ ተወላጅ የሕግ ተማሪዎች ስኮላርሺፕ",
    },
    shortDescription: {
      he: "מלגה של 5,000 ₪ לסטודנטים למשפטים יוצאי אתיופיה, בניהול טבקה ובמימון קרן משפחת מיתר ומשרד מיתר עורכי דין. המחזור האחרון שפורסם נסגר ב-30.4.2025.",
      en: "A ₪5,000 scholarship for Ethiopian-Israeli law students, administered by Tebeka and funded by the Meitar family foundation and the Meitar law firm. The last published cycle closed on 30.4.2025.",
      am: "ለኢትዮጵያ ተወላጅ የሕግ ተማሪዎች የ₪5,000 ስኮላርሺፕ፣ በቴቤካ የሚመራና በሜይታር ቤተሰብ ፈንድና በሜይታር የሕግ ቢሮ የሚደገፍ። የመጨረሻው የታተመ ዙር በ30.4.2025 ተዘግቷል።",
    },
    amountMinIls: 5000,
    amountMaxIls: 5000,
    amountNote: {
      he: 'גובה המלגה 5,000 ₪, ו"ועדת המלגות רשאית להעניק מלגה גבוהה יותר… על פי שיקול דעתה". מקור: אתר המלגות של אוניברסיטת בר-אילן (biu.ac.il/scholarship/583026) · נבדק ספטמבר 2026.',
      en: 'The scholarship is ₪5,000, and "the scholarship committee may award a higher scholarship… at its discretion". Source: Bar-Ilan University scholarships page (biu.ac.il/scholarship/583026) · verified September 2026.',
      am: 'የስኮላርሺፑ መጠን ₪5,000 ነው፣ "የስኮላርሺፕ ኮሚቴው በራሱ ውሳኔ ከፍ ያለ ስኮላርሺፕ ሊሰጥ ይችላል"። ምንጭ፦ የባር-ኢላን ዩኒቨርሲቲ የስኮላርሺፕ ገጽ (biu.ac.il/scholarship/583026) · ሴፕቴምበር 2026 ተረጋግጧል።',
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-09-15",
    applicationUrl: "https://www.tebeka.org.il",
    tags: ["undergrad", "legal", "community", "career-shift"],
    communityPriority: true,
    relatedScholarships: ["isef-fellowship"],
    relatedRights: [],
    bodies: {
      he: `## קראו את זה קודם

אתר טבקה (tebeka.org.il) **לא נטען** אצלנו באף שיטת בדיקה בספטמבר 2026. כל מה שכתוב בעמוד הזה לקוח מעמודי מלגות של מוסדות אקדמיים, לא מהארגון עצמו.

המשמעות: הסכומים והתאריכים כאן נכונים לקול הקורא כפי שהמוסדות פרסמו אותו — אבל אנחנו לא יכולים לאשר מול טבקה שזה עדיין המצב. אמתו מולם ישירות לפני שאתם בונים על זה.

## מי נותן את המלגה?

השם המלא הוא **"מלגה למשפטנים יוצאי אתיופיה ע"ש עו"ד צבי מיתר ז"ל"**, וכאן יש בלבול נפוץ: טבקה מנהלת את הקול הקורא, אבל לא היא המממנת. בלשון הפרסום: "יחולקו ע"י קרן משפחת צבי ז"ל ועפרה מיתר ומשרד מיתר | עורכי דין, מלגות לסטודנטים למשפטים יוצאי אתיופיה".

## כמה?

5,000 ₪ למלגה. בנוסף: "ועדת המלגות רשאית להעניק מלגה גבוהה יותר… על פי שיקול דעתה".

מקור: [אוניברסיטת בר-אילן — מלגות](https://www.biu.ac.il/scholarship/583026) · נבדק ספטמבר 2026.

## מי זכאי?

- תכנית לימודים מלאה — לפחות שלושה ימי לימודים בשבוע — בפקולטה או במכללה למשפטים במוסד מוכר
- עדיפות לסטודנטים בשנה א' או ב'

השיקולים בבחירה: יכולת אקדמית, מוטיבציה, מצב משפחתי וסוציו-אקונומי, מעורבות חברתית, וראיון אישי.

שימו לב: **לא מפורסם סף ציונים.** אם ראיתם במקום כלשהו ממוצע מינימלי למלגה הזו — הוא לא מופיע בקול הקורא.

## מה מקבלים מעבר לכסף

"כל מלגאי ילווה על ידי עורך דין ממשרד מיתר… לפחות מפגש אחד בחודש". נכון ל-2025 הפרויקט מתקיים בפעם השמינית. זה ליווי במהלך התואר — לא הכנה לשלב ההתמחות שאחריו.

## מתי מגישים?

הקול הקורא האחרון שפורסם הוא לשנת תשפ"ה: "מועד הגשה מ-02.02.25 עד 30.04.25 — מועד עבר", בסגירה ב-30 באפריל 2025 בשעה 12:00 בצוהריים.

**לא פורסם קול קורא לתשפ"ו או לתשפ"ז באף מקור שאיתרנו.** לכן הסטטוס כאן הוא "טרם נקבע". אם אתם מתכננים להגיש — צרו קשר עם טבקה ובררו אם נפתח מחזור חדש, ובמקביל שאלו בדיקנט הסטודנטים שלכם, שאליו הקול הקורא נשלח.

## ראו גם

- [מלגת ISEF](/he/education/scholarships/isef-fellowship)
- [עמוד ארגון טבקה](/he/orgs/tebeka)
`,
      en: `## Read this first

Tebeka's website (tebeka.org.il) **would not load** for us by any fetch method in September 2026. Everything on this page comes from academic institutions' scholarship pages, not from the organisation itself.

What that means: the amounts and dates here are correct for the call as institutions published it — but we cannot confirm with Tebeka that this is still the position. Verify with them directly before you build on it.

## Who funds this scholarship?

The full name is **"Scholarship for Ethiopian-Israeli law students in memory of Adv. Zvi Meitar"**, and there is a common confusion here: Tebeka administers the call, but it is not the funder. In the published wording: "to be distributed by the foundation of the family of Zvi (z"l) and Ofra Meitar and the firm Meitar | Law Offices, scholarships for Ethiopian-Israeli law students".

## How much?

₪5,000 per scholarship. In addition: "the scholarship committee may award a higher scholarship… at its discretion".

Source: [Bar-Ilan University — scholarships](https://www.biu.ac.il/scholarship/583026) · verified September 2026.

## Who is eligible?

- A full study programme — at least three study days a week — at a law faculty or law college in a recognised institution
- Preference for students in year 1 or year 2

Selection considerations: academic ability, motivation, family and socio-economic situation, social involvement, and a personal interview.

Note: **no GPA threshold is published.** If you have seen a minimum average quoted for this scholarship somewhere, it does not appear in the call.

## What you get beyond the money

"Each scholarship recipient will be accompanied by a lawyer from the Meitar firm… at least one meeting a month". As of 2025 the project is running for the eighth time. This is mentorship during the degree — not preparation for the internship stage that follows it.

## When do you apply?

The most recent published call is for the 2024-25 academic year: "submission from 02.02.25 to 30.04.25 — date passed", closing 30 April 2025 at 12:00 noon.

**No call for 2025-26 or 2026-27 exists in any source we could find.** That is why the status here is "to be announced". If you plan to apply, contact Tebeka to ask whether a new cycle has opened, and in parallel ask your dean of students' office, which is where the call is sent.

## See also

- [ISEF Fellowship](/en/education/scholarships/isef-fellowship)
- [Tebeka org profile](/en/orgs/tebeka)
`,
      am: `## በመጀመሪያ ይህንን ያንብቡ

የቴቤካ ድረ-ገጽ (tebeka.org.il) በሴፕቴምበር 2026 በምንም መንገድ **አልተከፈተልንም**። በዚህ ገጽ ያለው ሁሉ ከአካዳሚክ ተቋማት የስኮላርሺፕ ገጾች የተወሰደ ነው እንጂ ከድርጅቱ ራሱ አይደለም።

ትርጉሙ፦ እዚህ ያሉት መጠኖችና ቀኖች ተቋማት ባተሙት ጥሪ መሰረት ትክክል ናቸው — ነገር ግን አሁንም እንደዚያ መሆኑን ከቴቤካ ጋር ማረጋገጥ አልቻልንም። ከመተማመንዎ በፊት በቀጥታ ያረጋግጡ።

## ስኮላርሺፑን የሚሰጠው ማን ነው?

ሙሉ ስሙ **"በጠበቃ ዝቪ ሜይታር መታሰቢያ ለኢትዮጵያ ተወላጅ የሕግ ተማሪዎች ስኮላርሺፕ"** ነው። እዚህ የተለመደ ግራ መጋባት አለ፦ ቴቤካ ጥሪውን ያስተዳድራል እንጂ ገንዘቡን የሚሰጥ አይደለም። በታተመው ቃል፦ "በዝቪ (ዘ"ል) እና ኦፍራ ሜይታር ቤተሰብ ፈንድና በሜይታር | የሕግ ቢሮዎች የሚሰጡ፣ ለኢትዮጵያ ተወላጅ የሕግ ተማሪዎች ስኮላርሺፖች"።

## ስንት ነው?

በአንድ ስኮላርሺፕ ₪5,000። በተጨማሪም፦ "የስኮላርሺፕ ኮሚቴው በራሱ ውሳኔ ከፍ ያለ ስኮላርሺፕ ሊሰጥ ይችላል"።

ምንጭ፦ [የባር-ኢላን ዩኒቨርሲቲ — ስኮላርሺፖች](https://www.biu.ac.il/scholarship/583026) · ሴፕቴምበር 2026 ተረጋግጧል።

## ለማን ይሆናል?

- ሙሉ የትምህርት ፕሮግራም — በሳምንት ቢያንስ ሦስት የትምህርት ቀናት — በእውቅና ባለው ተቋም የሕግ ፋኩልቲ ወይም ኮሌጅ
- ለ1ኛ ወይም 2ኛ ዓመት ተማሪዎች ቅድሚያ

የምርጫ ግምቶች፦ የአካዳሚክ ችሎታ፣ ተነሳሽነት፣ የቤተሰብና ማህበራዊ-ኢኮኖሚያዊ ሁኔታ፣ ማህበራዊ ተሳትፎ፣ የግል ቃለ-መጠይቅ።

ልብ ይበሉ፦ **የውጤት ደረጃ ገደብ አልታተመም።**

## ከገንዘቡ ባሻገር

"እያንዳንዱ ተጠቃሚ ከሜይታር ቢሮ በጠበቃ ይታጀባል… በወር ቢያንስ አንድ ስብሰባ"። እስከ 2025 ድረስ ፕሮጀክቱ ለስምንተኛ ጊዜ እየተካሄደ ነው። ይህ በዲግሪ ጊዜ የሚደረግ አጃቢነት ነው እንጂ ለቀጣዩ የልምምድ ደረጃ ዝግጅት አይደለም።

## መቼ ማመልከት ይቻላል?

የመጨረሻው የታተመ ጥሪ ለ2024-25 የትምህርት ዓመት ነው፦ "ማስገቢያ ከ02.02.25 እስከ 30.04.25 — ቀኑ አልፏል"፣ በ30 ሚያዝያ 2025 በ12:00 ቀትር ይዘጋል።

**ለ2025-26 ወይም ለ2026-27 ጥሪ ባገኘነው ምንጭ ሁሉ የለም።** ስለዚህ ሁኔታው "ገና አልተወሰነም" ነው። ማመልከት ካሰቡ ቴቤካን ያነጋግሩ፣ በተጓዳኝም የተማሪዎች ዲን ጽ/ቤትዎን ይጠይቁ።

## ይህንንም ይዩ

- [ISEF Fellowship](/am/education/scholarships/isef-fellowship)
- [የቴቤካ ድርጅት መገለጫ](/am/orgs/tebeka)
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
    // TED-168: the amount is now sourced. The org's own page describes a past
    // ceremony — "טקס מלגות ל-15 סטודנטיות יוצאות אתיופיה מרחבי הארץ, שכל אחת
    // קיבלה מלגה על סך 4,000 ש״ח" — but names no year, so the figure is stated
    // as what one past cycle paid, not as a current entitlement.
    amountMinIls: 4000,
    amountMaxIls: 4000,
    amountNote: {
      he: "₪4,000 לכל מלגאית ב-15 מלגות, לפי תיאור טקס שהעמותה מפרסמת בלי לציין שנה. אין מחזור פתוח ואין קריטריוני זכאות מפורסמים. מקור: maatzimot.org.il · נבדק ספטמבר 2026.",
      en: "₪4,000 per recipient across 15 scholarships, per a ceremony the organisation describes without naming a year. There is no open cycle and no published eligibility criteria. Source: maatzimot.org.il · verified September 2026.",
      am: "በ15 ስኮላርሺፖች ለእያንዳንዷ ተቀባይ ₪4,000፣ ድርጅቱ ዓመት ሳይጠቅስ በሚገልጸው ሥነ ሥርዓት መሠረት። ምንጭ፦ maatzimot.org.il · ሴፕቴምበር 2026 ተረጋግጧል።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-09-15",
    applicationUrl: "https://www.maatzimot.org.il",
    tags: ["undergrad", "women", "community"],
    communityPriority: true,
    relatedScholarships: [],
    relatedRights: [],
    bodies: {
      he: `> **אזהרה על מקור.** באתר העמותה יש שני דפים שכותרתם "מלגות" שהם **מדריך למלגות של גופים אחרים**, והוא התיישן: הוא מצטט סכום "נכון ל-2014", מפנה לכתובות שכבר אינן קיימות, ונוקב בתנאי סף שאינם מופיעים אצל הגופים עצמם. אל תסתמכו על הנתונים שבאותם דפים — לא אצלם ולא דרכנו. מה שכתוב כאן נלקח מהדפים שבהם העמותה מתארת את **הפעילות שלה עצמה**.

## מה זאת התוכנית?

"נשים אתיופיות מעצימות" (מעצימות) הוא ארגון עם זווית מגדרית ספציפית — מלגות ותמיכה לנשים יוצאות אתיופיה, מתוך הכרה בקשיים הייחודיים העומדים בפני נשים בקהילה בדרך להשכלה גבוהה ותעסוקה.

## מי זכאי?

- נשים יוצאות אתיופיה, בכל שלב לימודים (תיכון, מכינה, תואר)

## מה כלול?

- מלגה / תמיכה כלכלית לנשים מהקהילה
- קהילת תמיכה נשית ומנטורינג

## איך פונים?

דרך maatzimot.org.il.

## ראו גם

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

`,
    },
  },

  // W3-12. HUJI Dean of Students — Ethiopian-Israeli Students Office
  {
    slug: "huji-dean-ethiopian-students",
    level: "undergrad",
    providerOrgSlug: "huji",
    name: {
      he: "דיקנט הסטודנטים ליוצאי אתיופיה — האוניברסיטה העברית",
      en: "HUJI Dean of Students — Ethiopian-Israeli Students Office",
      am: "የHUJI ተማሪዎች ዲን — ኢትዮጵያ-ተወላጅ ተማሪዎች ጽ/ቤት",
    },
    shortDescription: {
      he: "שירות מוסדי של דיקנט הסטודנטים באוניברסיטה העברית לבני קהילת יוצאי אתיופיה — לא מלגה כלל-ארצית, אלא תמיכה מוסדית מקומית.",
      en: "An institutional service from the Hebrew University Dean of Students for Ethiopian-Israeli students — not a nationwide scholarship, but local institutional support.",
      am: "ከHUJI ተማሪዎች ዲን ለኢትዮጵያ-ተወላጅ ተማሪዎች ተቋማዊ አገልግሎት — ብሔራዊ ድጋፍ አይደለም።",
    },
    amountMinIls: 0,
    amountMaxIls: 0,
    amountNote: {
      he: "שירות מוסדי (ליווי, ולעיתים מלגות מקומיות דרך הדיקנט) — לא סכום ארצי אחיד; לבדוק מול studean.huji.ac.il.",
      en: "An institutional service (mentorship, and sometimes local scholarships via the dean's office) — not a uniform national figure; check studean.huji.ac.il.",
      am: "ተቋማዊ አገልግሎት እንጂ ብሔራዊ ወጥ መጠን አይደለም።",
    },
    deadline: null,
    status: "tba",
    lastVerified: "2026-09-15",
    applicationUrl:
      "https://studean.huji.ac.il/%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94",
    tags: ["undergrad", "masters", "community", "institutional"],
    communityPriority: true,
    relatedScholarships: ["vatat-doctoral-postdoc-scholarship", "marom-che"],
    relatedRights: [],
    bodies: {
      he: `## מה זה השירות?

דיקנט הסטודנטים באוניברסיטה העברית מפעיל שירות ייעודי לבני קהילת יוצאי אתיופיה הלומדים בקמפוס. בשונה מרוב הרשומות האחרות בעמוד זה, **מדובר בשירות מוסדי-מקומי, לא במלגה ארצית**.

## מי זכאי?

- סטודנטים יוצאי אתיופיה הלומדים באוניברסיטה העברית (כל הקמפוסים)

## מה כלול?

- ליווי מוסדי לסטודנטים מהקהילה בקמפוס האוניברסיטה העברית
- ייתכנו מלגות/מענקים מקומיים דרך הדיקנט (לאמת)

## איך פונים?

studean.huji.ac.il — עמוד "יוצאי אתיופיה" הספציפי בתוך אתר הדיקנט.

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
];
