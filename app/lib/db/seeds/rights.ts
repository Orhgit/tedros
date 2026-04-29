// Phase 3 seed (RIN-336 / part of RIN-328 — Rights Hub MVP).
//
// 8 high-priority rights covering the community's most-trafficked life-domain
// gaps surfaced in `docs/research/02-community-needs-deep-dive.md`:
//   - housing & financial: 600K mortgage, public-housing waitlist
//   - new_immigrant: klita basket, Falash Mura direct-absorption (2026)
//   - employment: affirmative_action public_sector
//   - education: student aid aggregator
//   - family: daycare subsidy
//   - legal: Tebeka legal aid (also Tier-1 anchor per ADR-011)
//
// HE is source-of-truth (CLAUDE.md). EN + AM are mirrored. Bodies are
// concise (eligibility + application steps); long-form content lives
// behind the wizard component (RIN-338) and the programmatic SEO cells
// (RIN-339).
//
// Seed shape matches `rights` + `right_translations`:
//   rights: title, slug, govUrl, eligibilitySummary, tags
//   right_translations: rightId, locale, body
//
// Slugs are Latin kebab-case in every locale (URL `/{lang}/rights/{slug}`).

import type { Translatable } from "../columns";
import type { Locale } from "../../i18n/config";

export interface RightSeed {
  title: Translatable;
  slug: Translatable;
  govUrl: string;
  eligibilitySummary: Translatable;
  tags: string[];
  bodies: Record<Locale, string>;
}

export const PRIORITY_RIGHTS: RightSeed[] = [
  // 1 — 600K mortgage (community-specific). Cross-pillar with RE.
  {
    title: {
      he: "המשכנתא הקהילתית — 600,000 ₪ ליוצאי אתיופיה",
      en: "Community Mortgage — 600,000 ILS for Ethiopian-Israelis",
      am: "የማህበረሰብ ብድር — 600,000 ሺ" + "ል ለኢትዮጵያ-እስራኤላውያን",
    },
    slug: { he: "600k-mortgage", en: "600k-mortgage", am: "600k-mortgage" },
    govUrl: "https://www.gov.il/he/departments/integration_program/govil-landing-page",
    eligibilitySummary: {
      he: "הלוואת מדינה ליוצאי אתיופיה: ₪600,000 ל-25 שנה, 0% ריבית ב-10 שנים הראשונות, 2% ב-15 הבאות. הקצאה ב-הגרלה שנתית של ~200 משפחות.",
      en: "Govt loan for Ethiopian-Israeli families: ₪600,000 over 25 years, 0% interest for the first 10, 2% for the next 15. Allocated by annual lottery (~200 families).",
      am:
        "የመንግስት ብድር ለኢትዮጵያ-እስራኤላውያን ቤተሰቦች፦ 600,000 ሺ" +
        "ል ለ25 ዓመት፣ ለመጀመሪያዎቹ 10 ዓመታት 0% ወለድ፣ ለቀጣዮቹ 15 ዓመታት 2%። በዓመታዊ ዕጣ (~200 ቤተሰቦች) ይመደባል።",
    },
    tags: ["housing", "mortgage", "grants"],
    bodies: {
      he: `## למי מיועד?

כל משק בית שעונה על אחד מהקריטריונים:
- אחד מבני הזוג נולד באתיופיה
- אחד מההורים של בני הזוג נולד באתיופיה
- בני הזוג מוגדרים בני "Falash Mura" שעלו לישראל

## תנאי ההלוואה

- **סכום**: ₪600,000
- **תקופה**: 25 שנה
- **ריבית**: 0% ב-10 השנים הראשונות, 2% ב-15 הבאות
- **השכנה (down payment)**: 5% מערך הנכס
- **רישום**: 70 ₪ בסניף בנק משתתף (לוטריה שנתית)

## איך מגישים?

1. נרשמים בסניף בנק משתתף (לאומי / דיסקונט / איגוד)
2. ממתינים לתוצאות ההגרלה השנתית (~200 זוכים)
3. אם זכיתם — בנק שולח אישור לחתימת חוזה רכישה
4. ממציאים מסמכים: ת"ז, אישור הכנסה, אישור על-תכנית קליטה (אם רלוונטי)

לחישוב זכאות מהיר — [מחשבון משכנתא](/he/calculator/mortgage-ethiopian-immigrants).
`,
      en: `## Who is eligible?

Any household where at least one criterion holds:
- One of the spouses was born in Ethiopia
- One of the spouses' parents was born in Ethiopia
- The couple is defined as "Falash Mura" with confirmed aliyah

## Loan terms

- **Amount**: ₪600,000
- **Term**: 25 years
- **Rate**: 0% for the first 10 years, 2% for the next 15
- **Down payment**: 5% of property value
- **Registration**: ₪70 at a participating bank branch (annual lottery)

## How to apply

1. Register at a participating bank branch (Leumi / Discount / Igud)
2. Wait for annual lottery results (~200 winners)
3. On winning, the bank sends approval to sign a purchase contract
4. Submit documents: ID, income proof, absorption-program confirmation (if relevant)

Quick eligibility check — [mortgage calculator](/en/calculator/mortgage-ethiopian-immigrants).
`,
      am: `## ለማን ይሆናል?

ቢያንስ አንድ መስፈርት የሚያረካ ቤተሰብ፦
- ከሁለቱ ጋብቻ አጋሮች አንዱ በኢትዮጵያ ተወልዶ
- ከሁለቱ ጋብቻ አጋሮች ወላጆች አንዱ በኢትዮጵያ ተወልዶ
- ቤተሰቡ "Falash Mura" እንደሆነ ተወስኖ ወደ እስራኤል ደርሷል

## የብድር ሁኔታዎች

- **መጠን**: 600,000 ሺ"ል
- **ጊዜ**: 25 ዓመት
- **ወለድ**: ለመጀመሪያዎቹ 10 ዓመታት 0%፣ ለቀጣዮቹ 15 ዓመታት 2%
- **ከስ ክፍያ**: 5% ከንብረቱ ዋጋ
- **ምዝገባ**: 70 ሺ"ል በተሳታፊ ባንክ ቅርንጫፍ (ዓመታዊ ዕጣ)

## እንዴት ማመልከት ይቻላል?

1. በተሳታፊ ባንክ ቅርንጫፍ ይመዝገቡ (ሌዑሚ / ዲስካውንት / ኢጉድ)
2. የዓመቱን የዕጣ ውጤቶች ይጠብቁ (~200 አሸናፊዎች)
3. ካሸነፉ ባንኩ የግዢ ኮንትራት ለመፈረም ፈቃድ ይልክልዎታል
4. ሰነዶችን ያቅርቡ፦ መታወቂያ፣ የገቢ ማረጋገጫ፣ የመመለሻ ፕሮግራም ማረጋገጫ (አስፈላጊ ከሆነ)

ፈጣን የብቁነት ምርመራ — [ብድር ካልኩሌተር](/am/calculator/mortgage-ethiopian-immigrants)።
`,
    },
  },

  // 2 — Klita basket
  {
    title: {
      he: "סל קליטה לעולים חדשים",
      en: "Klita Basket — Absorption Aid for New Immigrants",
      am: "የመመለሻ ቅርጫት — ለአዲስ ስደተኞች",
    },
    slug: { he: "klita-basket", en: "klita-basket", am: "klita-basket" },
    govUrl: "https://www.gov.il/he/departments/integration_program/govil-landing-page",
    eligibilitySummary: {
      he: "תשלום מזומן חודשי לעולים חדשים בשנה הראשונה לאחר העלייה. סכום משתנה לפי מצב משפחתי וגיל.",
      en: "Monthly cash payment to new immigrants during the first year post-aliyah. Amount varies by family status and age.",
      am: "ለአዲስ ስደተኞች በመጀመሪያ ዓመት ከደረሰ በኋላ ወርሃዊ የጥሬ ገንዘብ ክፍያ። መጠኑ በቤተሰብ ሁኔታ እና በዕድሜ ይለያያል።",
    },
    tags: ["new_immigrant", "grants", "monthly_payment"],
    bodies: {
      he: `## למי מיועד?

עולים חדשים שנרשמו במשרד הקליטה תוך 12 חודשים מהעלייה.

## מה כולל הסל?

- תשלום חודשי קבוע (לפי גודל משפחה)
- מענק חד-פעמי לבית ראשון
- כיסוי הוצאות הסעות בשנה הראשונה
- שובר אולפן (לימוד עברית)
- כיסוי בריאות מורחב לחצי שנה

## איך מגישים?

1. הרשמה במחלקת קליטה במשרד הקליטה — תוך 30 ימים מהגעה
2. הצגת ת"ז עולה + אישור עלייה
3. פתיחת חשבון בנק לתשלומים החודשיים
4. בחירת אולפן ותחילת לימודים (חובה לצורך תשלום מלא)

📞 **מוקד משרד הקליטה**: 5454* (חיוג בעברית/אנגלית/אמהרית)
`,
      en: `## Who is eligible?

New immigrants who registered with the Ministry of Aliyah within 12 months of arrival.

## What does the basket include?

- Fixed monthly payment (scaled by family size)
- One-time first-home grant
- Transportation cost coverage in the first year
- Ulpan (Hebrew study) voucher
- Extended health coverage for six months

## How to apply

1. Register at the Ministry of Aliyah absorption desk — within 30 days of arrival
2. Present immigrant ID + aliyah confirmation
3. Open a bank account for the monthly payments
4. Choose an ulpan and start classes (required for full payment)

📞 **Ministry of Aliyah hotline**: 5454* (Hebrew/English/Amharic)
`,
      am: `## ለማን ይሆናል?

ከደረሱ ከ12 ወራት ውስጥ በሕክምና መሰብሰብ ሚኒስቴር የተመዘገቡ አዲስ ስደተኞች።

## ቅርጫቱ ምን ይዟል?

- ቋሚ ወርሃዊ ክፍያ (በቤተሰብ መጠን ይለካል)
- አንድ ጊዜ የመጀመሪያ ቤት ስጦታ
- በመጀመሪያ ዓመት የትራንስፖርት ወጪ ሽፋን
- የኡልፓን (የዕብራይስጥ ጥናት) ኩፖን
- ለስድስት ወራት የተራዘመ የጤና ሽፋን

## እንዴት ማመልከት ይቻላል?

1. ከደረሱ በ30 ቀን ውስጥ በመሰብሰብ ሚኒስቴር ቢሮ ይመዝገቡ
2. የስደተኛ መታወቂያ + የአሊያ ማረጋገጫ ያቅርቡ
3. ለወርሃዊ ክፍያዎች ባንክ አካውንት ይክፈቱ
4. ኡልፓን ይምረጡ እና ትምህርት ይጀምሩ (ለሙሉ ክፍያ የግድ ያስፈልጋል)

📞 **የመሰብሰብ ሚኒስቴር መስመር**: *5454 (ዕብራይስጥ / እንግሊዝኛ / አማርኛ)
`,
    },
  },

  // 3 — Affirmative action / public_sector representation
  {
    title: {
      he: "ייצוג הולם — קצובת תעסוקה במגזר הציבורי",
      en: "Affirmative Action — Public-Sector Employment Quota",
      am: "ተገቢ ውክልና — የመንግስት ዘርፍ የስራ ቅድመ ምርጫ",
    },
    slug: {
      he: "public_sector-representation",
      en: "public_sector-representation",
      am: "public_sector-representation",
    },
    govUrl: "https://www.gov.il/he/departments/civil_service_commission",
    eligibilitySummary: {
      he: "החלטות ממשלה 1605/2533 מחייבות ייצוג של 1.7% לפחות ליוצאי אתיופיה במשרות מדינה. בפועל הביצוע נמוך — בקרת ביצוע פתוחה לכל מועמד.",
      en: "Govt resolutions 1605/2533 mandate at least 1.7% representation of Ethiopian-Israelis in state jobs. Actual compliance is low — performance review is open to every candidate.",
      am: "የመንግስት ውሳኔዎች 1605/2533 ቢያንስ 1.7% የኢትዮጵያ-እስራኤላውያን ውክልና በመንግስት ስራዎች ይጠይቃሉ። ትክክለኛ መጣጣም ዝቅተኛ ነው — የአፈጻጸም ግምገማ ለሁሉም እጩ ክፍት ነው።",
    },
    tags: ["employment", "public_sector", "affirmative_action"],
    bodies: {
      he: `## למי מיועד?

כל מועמד יוצא אתיופיה למשרת מדינה (כולל רשויות מקומיות, חברות ממשלתיות, אוניברסיטאות ציבוריות).

## על מה אפשר לבסס תביעת ייצוג הולם?

- החלטת ממשלה 1605 (2003): ייצוג של 1.7% לפחות
- החלטת ממשלה 2533 (2008): הקצאת תקנים יעודיים
- חוק שירות המדינה (מינויים), סעיף 15א

## איך מבקשים?

1. בעת הגשת מועמדות — לציין מקור אתיופי בטופס
2. אם נדחיתם — לבקש בכתב את ניתוח הייצוג ההולם של המשרה
3. לפנות לנציבות שירות המדינה אם הניתוח חושף תת-ייצוג
4. במקרה של קיפוח — Tebeka מטפלים בייצוג משפטי חינם

📞 **נציבות שירות המדינה**: 02-6705555
🔗 **תלונה ב-Tebeka**: [tebeka.org.il](https://www.tebeka.org.il)
`,
      en: `## Who is eligible?

Any Ethiopian-Israeli candidate for a state job (including municipalities, government companies, public universities).

## What backs an affirmative_action claim?

- Govt resolution 1605 (2003): minimum 1.7% representation
- Govt resolution 2533 (2008): dedicated position allocations
- Civil Service (Appointments) Law, §15A

## How to apply

1. When applying — declare Ethiopian origin on the form
2. If rejected — request written representation analysis for the position
3. Escalate to Civil Service Commission if the analysis reveals under-representation
4. For discrimination — Tebeka provides free legal representation

📞 **Civil Service Commission**: 02-6705555
🔗 **File via Tebeka**: [tebeka.org.il](https://www.tebeka.org.il)
`,
      am: `## ለማን ይሆናል?

ለማንኛውም የኢትዮጵያ-እስራኤላዊ የመንግስት ስራ እጩ (ማዘጋጃ ቤቶች፣ የመንግስት ኩባንያዎች፣ የሕዝብ ዩኒቨርሲቲዎችን ጨምሮ)።

## የተገቢ ውክልና ጥያቄን ምን ይደግፋል?

- የመንግስት ውሳኔ 1605 (2003)፦ ቢያንስ 1.7% ውክልና
- የመንግስት ውሳኔ 2533 (2008)፦ የተወሰኑ የቦታ ምደባዎች
- የሲቪል አገልግሎት (ሹመቶች) ሕግ፣ ክፍል 15ሀ

## እንዴት ማመልከት ይቻላል?

1. ሲያመለክቱ — በቅጹ ላይ የኢትዮጵያ መነሻን ይግለጹ
2. ካልተቀበሉ — የቦታውን የውክልና ትንተና በጽሑፍ ይጠይቁ
3. ትንተናው ያለመወከል ሁኔታ ካመለከተ ወደ ሲቪል አገልግሎት ኮሚሽን ያቅርቡ
4. መድልዎ ካለ — ቴቤካ ነፃ ሕጋዊ ውክልና ይሰጣል

📞 **የሲቪል አገልግሎት ኮሚሽን**: 02-6705555
🔗 **በቴቤካ በኩል ቅሬታ**: [tebeka.org.il](https://www.tebeka.org.il)
`,
    },
  },

  // 4 — Student aid (ISEF/Hesegim aggregator)
  {
    title: {
      he: "סיוע לסטודנטים יוצאי אתיופיה",
      en: "Student Aid for Ethiopian-Israeli Students",
      am: "ለኢትዮጵያ-እስራኤላውያን ተማሪዎች ድጋፍ",
    },
    slug: { he: "student-aid", en: "student-aid", am: "student-aid" },
    govUrl: "https://www.gov.il/he/departments/integration_program/govil-landing-page",
    eligibilitySummary: {
      he: "מלגות ושירותי ליווי לסטודנטים תואר ראשון/שני/שלישי דרך ISEF, Hesegim, ENP, ומלגות אוניברסיטאיות יעודיות.",
      en: "Scholarships and mentoring for community undergraduate / graduate / doctoral students via ISEF, Hesegim, ENP, and university-specific funds.",
      am: "በ ISEF፣ Hesegim፣ ENP፣ እና በዩኒቨርሲቲ-ተኮር ፈንዶች በኩል ለማህበረሰብ ቅዳሜ / ማስተርስ / ዶክትሬት ተማሪዎች ስኮላርሽፕ እና ድጋፍ።",
    },
    tags: ["education", "scholarship", "student"],
    bodies: {
      he: `## עיקרי תכניות הסיוע

- **ISEF** — מלגות לתואר שני ושלישי במצוינות אקדמית; כיסוי שכר לימוד מלא + מלגת מחיה
- **Hesegim** — סטיפנדיות לסטודנטים בתואר ראשון; דגש על מצוינות ומעורבות חברתית
- **ENP** — תמיכה ב-32 ערים, כולל תכניות בית-ספריות לבגרות
- **מלגות אוניברסיטאיות** — תכניות ייעודיות באוניברסיטה העברית, אוניברסיטת תל אביב, בן-גוריון, חיפה
- **תכניות מצוינות** — Olim Beyahad (השמה אקדמית), Tech-Career (הייטק)

## איך מגישים?

1. בודקים זכאות ל-ISEF / Hesegim בנפרד (כל אחד עם תהליך משלו)
2. נרשמים לתכנית בית-ספרית (ENP, Fidel) באמצעות בית הספר
3. אוניברסיטאות — דרך מינהל הסטודנטים (חיפוש "מלגות יוצאי אתיופיה" באתר)

🔗 **ISEF**: [isef.org.il](https://www.isef.org.il)
🔗 **Hesegim**: [hesegim.org.il](https://hesegim.org.il)
🔗 **ENP**: [enp.org.il](https://www.enp.org.il/he/)
`,
      en: `## Main aid programs

- **ISEF** — scholarships for graduate / doctoral academic excellence; full tuition + living stipend
- **Hesegim** — undergraduate stipends; emphasis on excellence and civic engagement
- **ENP** — community-school support across 32 cities, incl. matriculation programs
- **University funds** — dedicated programs at Hebrew U, Tel Aviv U, Ben-Gurion U, Haifa U
- **Excellence tracks** — Olim Beyahad (academic placement), Tech-Career (tech bootcamps)

## How to apply

1. Check eligibility for ISEF / Hesegim separately (each has its own intake)
2. Sign up for school-based programs (ENP, Fidel) via your child's school
3. University funds — via the dean-of-students office (search "Ethiopian-Israeli scholarships")

🔗 **ISEF**: [isef.org.il](https://www.isef.org.il)
🔗 **Hesegim**: [hesegim.org.il](https://hesegim.org.il)
🔗 **ENP**: [enp.org.il](https://www.enp.org.il/he/)
`,
      am: `## ዋና የድጋፍ ፕሮግራሞች

- **ISEF** — ለማስተርስ / ዶክትሬት የአካዳሚክ ብቃት ስኮላርሺፕ፦ ሙሉ የትምህርት ክፍያ + የመኖሪያ ስቲፐንድ
- **Hesegim** — ለቅዳሜ ተማሪዎች ስቲፐንድ፦ በብቃት እና በማህበራዊ ተሳትፎ ላይ ትኩረት
- **ENP** — በ32 ከተሞች ማህበረሰብ-ት/ቤት ድጋፍ፣ የማትሪክ ፕሮግራሞችን ጨምሮ
- **የዩኒቨርሲቲ ፈንዶች** — በዕብራይ ዩ፣ ቴል አቪቭ ዩ፣ ቤን-ጉሪዮን ዩ፣ ሐይፋ ዩ የተመረጡ ፕሮግራሞች
- **የብቃት ትራኮች** — Olim Beyahad (አካዳሚክ ምደባ)፣ Tech-Career (ቴክ ቡት ካምፖች)

## እንዴት ማመልከት ይቻላል?

1. ለ ISEF / Hesegim በተናጠል ይመልከቱ (ሁላቸው የራሳቸው ማመልከቻ አላቸው)
2. ለት/ቤት-ተኮር ፕሮግራሞች (ENP፣ Fidel) በልጅዎ ት/ቤት ይመዝገቡ
3. የዩኒቨርሲቲ ፈንዶች — በተማሪዎች ዲን ቢሮ ("ኢትዮጵያ-እስራኤላውያን ስኮላርሺፕ" ይፈልጉ)

🔗 **ISEF**: [isef.org.il](https://www.isef.org.il)
🔗 **Hesegim**: [hesegim.org.il](https://hesegim.org.il)
🔗 **ENP**: [enp.org.il](https://www.enp.org.il/he/)
`,
    },
  },

  // 5 — Daycare subsidy (family pillar precursor)
  {
    title: {
      he: "סיוע מעון יום למשפחות עובדות",
      en: "Daycare Subsidy for Working Families",
      am: "ለሚሰሩ ቤተሰቦች የቀን እንክብካቤ ድጋፍ",
    },
    slug: { he: "daycare-subsidy", en: "daycare-subsidy", am: "daycare-subsidy" },
    govUrl: "https://www.gov.il/he/departments/topics/daycare_subsidies",
    eligibilitySummary: {
      he: "סבסוד עלות מעון יום (גילאי 3 חודשים — 3 שנים) למשפחות שבהן שני ההורים עובדים. הסכום נקבע לפי הכנסה משולבת.",
      en: "Subsidized daycare (ages 3 months – 3 years) for families where both parents work. Amount calibrated by combined income.",
      am: "ሁለቱም ወላጆች ሲሰሩ ለቤተሰቦች የተመጠነ የቀን እንክብካቤ (ከ3 ወር – 3 ዓመት ዕድሜ)። መጠኑ በሚደመር ገቢ ይወሰናል።",
    },
    tags: ["family", "subsidy", "education"],
    bodies: {
      he: `## תנאי זכאות

- שני בני הזוג עובדים לפחות 30 שעות שבועיות (אחד ב-24 לפחות)
- הכנסת המשפחה ברוטו לא עולה מעל לתקרה (משתנה שנתית — לבדוק)
- הילד בגיל 3 חודשים — 3 שנים
- המעון מוכר על ידי משרד הכלכלה

## גובה הסבסוד

- **דרגה 1**: עד 75% הנחה ממחיר המעון
- **דרגה 2-7**: סבסוד יורד הדרגתי לפי הכנסה
- **דרגה 8+**: ללא סבסוד

## איך מגישים?

1. נכנסים לאתר משרד הכלכלה — אזור אישי
2. ממלאים בקשה דיגיטלית עם מסמכי הכנסה (3 תלושים אחרונים מכל הורה)
3. בוחרים מעון מוכר מהרשימה
4. מקבלים מספר דרגה תוך 14 יום

🔗 **משרד הכלכלה — מעונות יום**: gov.il
`,
      en: `## Eligibility

- Both partners work at least 30 weekly hours (one at 24+)
- Family gross income below the annual ceiling (varies — check yearly)
- Child aged 3 months – 3 years
- Daycare recognized by the Ministry of Economy

## Subsidy levels

- **Tier 1**: up to 75% off the daycare price
- **Tiers 2–7**: graduated discount by income
- **Tier 8+**: no subsidy

## How to apply

1. Login to the Ministry of Economy portal — personal account
2. Submit digital application with income proof (3 recent payslips per parent)
3. Choose a recognized daycare from the list
4. Receive your tier within 14 days

🔗 **Ministry of Economy — Daycare**: gov.il
`,
      am: `## ብቁነት

- ሁለቱም አጋሮች በሳምንት ቢያንስ 30 ሰዓታት ይሰራሉ (አንዱ ቢያንስ 24)
- የቤተሰብ ጠቅላላ ገቢ ከዓመታዊ ወሰን በታች (ይለያያል — በዓመት ይፈትሹ)
- ልጅ ከ3 ወራት – 3 ዓመት ዕድሜ
- የቀን እንክብካቤ በኢኮኖሚ ሚኒስቴር የተወከለ

## የድጋፍ ደረጃዎች

- **ደረጃ 1**: እስከ 75% ቅናሽ ከእንክብካቤ ዋጋ
- **ደረጃዎች 2–7**: በገቢ የተደረደረ ቅናሽ
- **ደረጃ 8+**: ድጋፍ የለም

## እንዴት ማመልከት ይቻላል?

1. ወደ የኢኮኖሚ ሚኒስቴር ፖርታል ይግቡ — የግል አካውንት
2. የገቢ ማስረጃ (በወላጅ 3 የቅርብ የክፍያ ሰነዶች) ጋር ዲጂታል ማመልከቻ ያቅርቡ
3. ከዝርዝሩ የተወከለ የቀን እንክብካቤ ይምረጡ
4. በ14 ቀን ውስጥ ደረጃዎን ይቀበሉ

🔗 **የኢኮኖሚ ሚኒስቴር — የቀን እንክብካቤ**: gov.il
`,
    },
  },

  // 6 — Public housing waitlist
  {
    title: {
      he: "דיור ציבורי — רשימת המתנה",
      en: "Public Housing Waitlist",
      am: "የሕዝብ መኖሪያ ቤት — ጥበቃ ዝርዝር",
    },
    slug: { he: "public-housing", en: "public-housing", am: "public-housing" },
    govUrl: "https://www.gov.il/he/departments/topics/eligibility_for_public_housing",
    eligibilitySummary: {
      he: "זכאות לדיור ציבורי לפי הכנסה, גודל משפחה, ומצב נכסים. רשימת המתנה ארוכה — לפעמים שנים. עלייה משמעותית בעדיפות לאחר שלב ייעודי.",
      en: "Public-housing eligibility by income, family size, and asset status. Waitlist is long — sometimes years. Priority bumps available for specific situations.",
      am: "በገቢ፣ በቤተሰብ መጠን እና በንብረት ሁኔታ የሕዝብ መኖሪያ ቤት ብቁነት። የጥበቃ ዝርዝር ረጅም ነው — አንዳንዴ ዓመታት። ለልዩ ሁኔታዎች ቅድሚያ ጭማሪዎች ይገኛሉ።",
    },
    tags: ["housing", "subsidy", "welfare"],
    bodies: {
      he: `## תנאי זכאות בסיסיים

- אזרח/תושב ישראל
- בעלות על נכס: ≤ 0 (לא בעלים על דירה)
- הכנסה משפחתית: עד תקרה משתנה לפי גודל משפחה
- שנות נישואין: לפחות 5 שנים (לזוגות, אלא אם משפחה חד-הורית)

## עדיפויות מוגברות

- משפחות חד-הוריות עם 2+ ילדים
- בני 60+ ללא דיור
- אנשים עם נכות
- ניצולי שואה
- עולים חדשים ב-7 שנים הראשונות

## איך מגישים?

1. ממלאים טופס בקשה במשרד הבינוי והשיכון
2. מצרפים מסמכים: ת"ז, אישורי הכנסה, רישום מקרקעין (טאבו)
3. הצטרפות לרשימת המתנה לפי אזור גיאוגרפי
4. עדכון שנתי של פרטים — אחרת מורידים מהרשימה

📞 **משרד הבינוי והשיכון**: 5442*
`,
      en: `## Basic eligibility

- Israeli citizen/resident
- Property ownership: 0 (no apartment owned)
- Family income: under a ceiling that scales with family size
- Years married: at least 5 (for couples; single parents exempt)

## Priority bumps

- Single-parent families with 2+ children
- Age 60+ without housing
- People with disabilities
- Holocaust survivors
- New immigrants in their first 7 years

## How to apply

1. Submit application to the Ministry of Construction & Housing
2. Attach: ID, income proofs, land registry (tabu)
3. Join the waitlist by geographic area
4. Annual updates required — otherwise dropped from list

📞 **Ministry of Construction & Housing**: *5442
`,
      am: `## መሠረታዊ ብቁነት

- የእስራኤል ዜጋ/ነዋሪ
- የንብረት ባለቤትነት፦ 0 (ምንም አፓርትመንት የለውም)
- የቤተሰብ ገቢ፦ በቤተሰብ መጠን ከተወሰነ ጣሪያ በታች
- የጋብቻ ዓመታት፦ ቢያንስ 5 (ለጥንዶች፤ ብቸኛ ወላጆች ነፃ ናቸው)

## ቅድሚያ ጭማሪዎች

- 2+ ልጆች ያላቸው ብቸኛ-ወላጅ ቤተሰቦች
- ያለ መኖሪያ ቤት 60+ ዕድሜ
- አካል ጉዳተኞች
- ሆሎኮስት የተረፉ
- በመጀመሪያ 7 ዓመቶቻቸው ውስጥ ያሉ አዲስ ስደተኞች

## እንዴት ማመልከት ይቻላል?

1. ለግንባታ እና ቤት ሚኒስቴር ማመልከቻ ያቅርቡ
2. ያጠቃልሉ፦ መታወቂያ፣ የገቢ ማስረጃዎች፣ የመሬት ምዝገባ (ታቡ)
3. በጂኦግራፊያዊ አካባቢ ወደ ጥበቃ ዝርዝር ይቀላቀሉ
4. ዓመታዊ ዝመናዎች ያስፈልጋሉ — አለበለዚያ ከዝርዝሩ ይወገዳሉ

📞 **የግንባታ እና ቤት ሚኒስቴር**: *5442
`,
    },
  },

  // 7 — Free legal aid via Tebeka (Tier-1 anchor per ADR-011)
  {
    title: {
      he: "סיוע משפטי חינם — Tebeka",
      en: "Free Legal Aid — Tebeka",
      am: "ነፃ የህግ ድጋፍ — ቴቤካ",
    },
    slug: { he: "tebeka-legal-aid", en: "tebeka-legal-aid", am: "tebeka-legal-aid" },
    govUrl: "https://www.tebeka.org.il",
    eligibilitySummary: {
      he: 'Tebeka — תֶבֶּקָה ("לוחם הצדק" באמהרית) — מספקת ייעוץ וייצוג משפטי חינם ליוצאי אתיופיה ב-1,000+ פניות בשנה. קווים מיוחדים: זכויות עובדים, גזענות, אכיפת חוק, זכויות ילדים.',
      en: "Tebeka — \"Advocate of Justice\" in Amharic — provides free legal counsel and representation to Ethiopian-Israelis (1,000+ inquiries/year). Specialty lines: workers' rights, racism, law enforcement, children's rights.",
      am: 'ቴቤካ — በአማርኛ "የፍትህ ተሟጋች" — ለኢትዮጵያ-እስራኤላውያን ነፃ የህግ ምክር እና ውክልና ይሰጣል (1,000+ ጥያቄዎች/ዓመት)። ልዩ መስመሮች፦ የሰራተኞች መብቶች፣ ዘረኝነት፣ የሕግ አስከባሪነት፣ የልጆች መብቶች።',
    },
    tags: ["legal", "advocacy", "anchor_partner"],
    bodies: {
      he: `## איזה תיקים Tebeka מטפלת?

- **זכויות עובדים** — פיטורין שלא כדין, אפליה בעבודה, אי-תשלום שכר
- **אפליה גזענית** — חינוך, מסחר, שירותים ציבוריים
- **אכיפת חוק** — תלונות על התנהלות משטרתית, מעצרים שלא כדין
- **זכויות ילדים** — חינוך מיוחד, רווחה, אפוטרופסות
- **דיור** — סוגיות מול דיור ציבורי, שכירות, פינוי

## איך פונים?

1. **טלפון**: 03-9377777 (ראשון-חמישי 9:00-17:00)
2. **אתר**: [tebeka.org.il](https://www.tebeka.org.il) — טופס מקוון
3. **WhatsApp**: 052-2233456 (קצר ולעניין)

🔒 **סודיות**: כל פנייה עוברת privilege עו"ד-לקוח. אסור ל-Tebeka לחשוף פרטים בלי אישורך.
💰 **עלות**: אפס. הארגון נתמך תרומות ומענקים — אין עלויות לפונה.

## מתי לפנות מיידית

- מעצר על ידי משטרה
- פיטורין במקום העבודה
- אלימות במשפחה (גם דרך 105)
- חשד לאפליה במהלך פנייה לשירות ציבורי
`,
      en: `## What cases does Tebeka handle?

- **Workers' rights** — wrongful termination, workplace discrimination, unpaid wages
- **Racial discrimination** — education, commerce, public services
- **Law enforcement** — complaints about police conduct, wrongful arrest
- **Children's rights** — special education, welfare, custody
- **Housing** — public-housing issues, rental, eviction

## How to reach Tebeka

1. **Phone**: 03-9377777 (Sun–Thu 9:00–17:00)
2. **Web**: [tebeka.org.il](https://www.tebeka.org.il) — online form
3. **WhatsApp**: 052-2233456 (short and to the point)

🔒 **Confidentiality**: every inquiry is attorney-client privileged. Tebeka cannot disclose details without your consent.
💰 **Cost**: zero. Tebeka is donor-funded — no cost to inquirers.

## When to reach out immediately

- Arrest by police
- Termination from work
- Domestic violence (also via 105)
- Suspected discrimination during a public-service interaction
`,
      am: `## ቴቤካ ምን ጉዳዮችን ይዛለች?

- **የሰራተኞች መብቶች** — ህገ-ወጥ መባረር፣ የስራ ቦታ መድልዎ፣ ያልተከፈለ ደመወዝ
- **የዘር መድልዎ** — ትምህርት፣ ንግድ፣ የሕዝብ አገልግሎቶች
- **የሕግ አስከባሪነት** — የፖሊስ ባህሪ ቅሬታዎች፣ ህገ-ወጥ እስራት
- **የልጆች መብቶች** — ልዩ ትምህርት፣ ደህንነት፣ ሞግዚትነት
- **መኖሪያ** — የሕዝብ ቤት ጉዳዮች፣ የኪራይ፣ መውጣት

## ቴቤካን እንዴት መድረስ ይቻላል

1. **ስልክ**: 03-9377777 (እሁድ–ሐሙስ 9:00–17:00)
2. **ድረ-ገጽ**: [tebeka.org.il](https://www.tebeka.org.il) — የመስመር ላይ ቅጽ
3. **WhatsApp**: 052-2233456 (አጭር እና ወደ ነጥቡ)

🔒 **ሚስጥራዊነት**: እያንዳንዱ ጥያቄ የጠበቃ-ደንበኛ መብት ነው። ቴቤካ ያለ ፈቃድዎ ዝርዝሮችን መግለጥ አይቻልም።
💰 **ወጪ**: ዜሮ። ቴቤካ በስጦታ የተደገፈ — ለጠያቂዎች ምንም ወጪ የለም።

## ወዲያውኑ መቅረብ መቼ

- በፖሊስ መታሰር
- ከስራ መባረር
- የቤት ውስጥ አመፅ (በ105 በኩልም)
- በሕዝብ-አገልግሎት ግንኙነት ወቅት መድልዎ መጠርጠር
`,
    },
  },

  // 8 — Falash Mura direct-absorption (2026 pilot — current event)
  {
    title: {
      he: "קליטה ישירה — פיילוט Falash Mura 2026",
      en: "Direct Absorption — Falash Mura 2026 Pilot",
      am: "ቀጥተኛ መሰብሰብ — የፋላሽ ሙራ 2026 ሙከራ",
    },
    slug: {
      he: "falash_mura-direct-absorption",
      en: "falash_mura-direct-absorption",
      am: "falash_mura-direct-absorption",
    },
    govUrl: "https://www.gov.il/he/departments/integration_program/govil-landing-page",
    eligibilitySummary: {
      he: "פיילוט 2026 — עולי Falash Mura ייקלטו ישירות לדיור (ולא במרכזי קליטה). יישום בערים שכוללות מסגרות תמיכה קהילתית. הקליטה הישירה הראשונה אצל קהילת יוצאי אתיופיה.",
      en: "2026 pilot — Falash Mura olim placed directly into housing rather than absorption centers. Rolling out in cities with established community support frameworks. First direct-absorption deployment for the community.",
      am: "የ2026 ሙከራ — የፋላሽ ሙራ ስደተኞች በቀጥታ ወደ መኖሪያ ቤት (ወደ መሰብሰቢያ ማዕከላት ሳይሆን) ይመደባሉ። የተመሰረቱ የማህበረሰብ ድጋፍ ስርዓቶች ባላቸው ከተሞች እየተተገበረ ነው።",
    },
    tags: ["new_immigrant", "housing", "falash_mura", "current_program"],
    bodies: {
      he: `## מה השתנה ב-2026?

עד 2025 — Falash Mura עברו דרך מרכזי קליטה (מספר חודשים עד שנים). מרכזי הקליטה היו מאתגרים: צפיפות, ריחוק מקרובי משפחה ותיקים, איטיות בלימוד עברית.

הפיילוט החדש (2026) עובר ל**קליטה ישירה לדיור** — דירה מסובסדת בעיר שיש בה תמיכה קהילתית.

## ערי הפיילוט

- נתניה (35,000+ קהילה ותיקה)
- ראשון לציון (~12,000)
- רחובות (~8,500)
- קריית מלאכי (15.1% מאוכלוסיית העיר)

## מה מקבלים?

- דירה בשכירות מסובסדת לחודשים הראשונים (עד 12)
- ליווי קהילתי דרך עמותות תמיכה (ENP, Tene Briut, IAEJ)
- אולפן עברית בקירבת הבית
- כיסוי בריאות + סל קליטה (ראה זכות סל קליטה)

## איך מצטרפים?

1. **בעלייה**: הרשמה במשרד הקליטה כעולה Falash Mura
2. **בחירת עיר**: לבדוק זמינות בערי הפיילוט (התקדמות שנתית)
3. **ליווי קהילתי**: התחברות לארגון מקומי (ENP / Fidel / Tene Briut)
4. **דיווח חודשי**: עדכון על מצב הסתגלות ל-12 חודשים

📞 **מוקד הקליטה**: 5454*
`,
      en: `## What changed in 2026?

Until 2025, Falash Mura olim went through absorption centers (months to years). The centers were challenging: crowding, distance from veteran-immigrant family, slow Hebrew acquisition.

The new pilot (2026) shifts to **direct housing absorption** — a subsidized apartment in a city with community support already in place.

## Pilot cities

- Netanya (35,000+ veteran community)
- Rishon LeZion (~12,000)
- Rehovot (~8,500)
- Kiryat Malakhi (15.1% of municipal population)

## What's included?

- Subsidized rental for the first months (up to 12)
- Community accompaniment via support orgs (ENP, Tene Briut, IAEJ)
- Hebrew ulpan near the apartment
- Health coverage + klita basket (see klita-basket entry)

## How to enroll

1. **On aliyah**: register at Ministry of Aliyah as Falash Mura immigrant
2. **City choice**: check availability in pilot cities (rolling annually)
3. **Community attachment**: connect to a local org (ENP / Fidel / Tene Briut)
4. **Monthly check-ins**: integration progress updates for 12 months

📞 **Aliyah hotline**: *5454
`,
      am: `## በ2026 ምን ተለወጠ?

እስከ 2025 ድረስ የፋላሽ ሙራ ስደተኞች በመሰብሰቢያ ማዕከላት ውስጥ (ከወራት እስከ ዓመታት) ይኖሩ ነበር። ማዕከሉ ፈታኝ ነበር፦ መጨናነቅ፣ ከቀደምት ስደተኛ ቤተሰብ ርቀት፣ ቀስ ብሎ የዕብራይስጥ ግዢ።

አዲሱ ሙከራ (2026) ወደ **ቀጥተኛ የመኖሪያ ቤት መሰብሰብ** ይዛወራል — ቀደም ሲል ማህበረሰብ ድጋፍ ባለበት ከተማ ውስጥ የተደገፈ አፓርትመንት።

## የሙከራ ከተሞች

- ነታንያ (35,000+ ቀደምት ማህበረሰብ)
- ሪሾን ለጽዮን (~12,000)
- ረሆቮት (~8,500)
- ቂርያት ማላኪ (15.1% የማዘጋጃ ቤት ሕዝብ)

## ምን ይካተታል?

- ለመጀመሪያ ወራት (እስከ 12) የተደገፈ ኪራይ
- በድጋፍ ድርጅቶች በኩል ማህበረሰባዊ አጃቢነት (ENP፣ Tene Briut፣ IAEJ)
- በአፓርትመንት አቅራቢያ የዕብራይስጥ ኡልፓን
- የጤና ሽፋን + የመመለሻ ቅርጫት (የመመለሻ ቅርጫት መግቢያ ይመልከቱ)

## እንዴት መመዝገብ ይቻላል

1. **በደረሰ ጊዜ**: በመመለሻ ሚኒስቴር እንደ ፋላሽ ሙራ ስደተኛ ይመዝገቡ
2. **የከተማ ምርጫ**: በሙከራ ከተሞች መገኘትን ይፈትሹ (በዓመት የሚሽከረከር)
3. **ማህበረሰባዊ ግንኙነት**: ከአካባቢ ድርጅት (ENP / Fidel / Tene Briut) ጋር ይገናኙ
4. **ወርሃዊ መግባባት**: ለ12 ወራት የመተባበር ሂደት ዝመናዎች

📞 **የመመለሻ መስመር**: *5454
`,
    },
  },
];
