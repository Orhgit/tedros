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
import type { WizardSchema } from "../../rights/wizard-engine";

export interface RightSeed {
  title: Translatable;
  slug: Translatable;
  govUrl: string;
  eligibilitySummary: Translatable;
  tags: string[];
  bodies: Record<Locale, string>;
  // Optional wizard. When present, the detail route renders an inline
  // eligibility check (RIN-338) below the body.
  wizard?: WizardSchema;
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
    wizard: {
      questions: [
        {
          id: "registeredWithin12Months",
          type: "boolean",
          label: {
            he: "נרשמתם במשרד הקליטה תוך 12 חודשים מיום העלייה?",
            en: "Did you register with the Ministry of Aliyah within 12 months of arrival?",
            am: "ከደረሱ በ12 ወራት ውስጥ በመሰብሰብ ሚኒስቴር ተመዘገቡ?",
          },
        },
        {
          id: "hasOlehId",
          type: "boolean",
          label: {
            he: "ברשותכם תעודת עולה תקפה?",
            en: "Do you have a valid immigrant ID (Te'udat Oleh)?",
            am: "ትክክለኛ የስደተኛ መታወቂያ (የኡለ መታወቂያ) አለዎት?",
          },
        },
        {
          id: "enrolledInUlpan",
          type: "boolean",
          label: {
            he: "נרשמתם / מתכוונים להירשם לאולפן עברית?",
            en: "Are you enrolled (or planning to enroll) in a Hebrew ulpan?",
            am: "በዕብራይስጥ ኡልፓን ተመዝግበዋል (ወይም ለመመዝገብ ያስባሉ)?",
          },
        },
      ],
      rules: [
        {
          kind: "require-true",
          questionId: "registeredWithin12Months",
          reason: {
            he: "סל הקליטה דורש הרשמה תוך 12 חודשים מהעלייה. אחרי המועד הזכאות פגה.",
            en: "The klita basket requires registration within 12 months of aliyah. After this window the entitlement expires.",
            am: "የመመለሻ ቅርጫት ከአሊያ በ12 ወራት ውስጥ ምዝገባ ይጠይቃል። ከዚህ መስኮት በኋላ ብቁነቱ ያበቃል።",
          },
        },
        {
          kind: "require-true",
          questionId: "hasOlehId",
          reason: {
            he: "תעודת עולה היא תנאי הכרחי. אם אבדה — לפנות למשרד הקליטה לקבלת עותק.",
            en: "An immigrant ID is a hard requirement. If lost — contact the Ministry of Aliyah for a replacement.",
            am: "የስደተኛ መታወቂያ ግዴታ ነው። ከጠፋ — ወደ መሰብሰብ ሚኒስቴር ይደውሉ።",
          },
        },
        {
          kind: "require-true",
          questionId: "enrolledInUlpan",
          reason: {
            he: "תשלום מלא של סל הקליטה מותנה בלימוד באולפן.",
            en: "Full klita-basket payment is conditional on ulpan enrollment.",
            am: "የመመለሻ ቅርጫት ሙሉ ክፍያ በኡልፓን ምዝገባ ላይ የተመሰረተ ነው።",
          },
        },
      ],
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
      he: "public-sector-representation",
      en: "public-sector-representation",
      am: "public-sector-representation",
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
    wizard: {
      questions: [
        {
          id: "ethiopianDescent",
          type: "boolean",
          label: {
            he: "אתם ממוצא אתיופי (אתם / ההורה / בן.בת זוג)?",
            en: "Are you of Ethiopian descent (self / parent / spouse)?",
            am: "ከኢትዮጵያዊ መነሻ (እርስዎ / ወላጅ / አጋር) ነዎት?",
          },
        },
        {
          id: "activeUndergrad",
          type: "boolean",
          label: {
            he: "אתם סטודנטים פעילים בתואר ראשון (שנים 1-3)?",
            en: "Are you an active undergraduate student (years 1-3)?",
            am: "ንቁ ቅዳሜ ተማሪ ነዎት (1-3 ዓመታት)?",
          },
        },
        {
          id: "communityServiceCommit",
          type: "boolean",
          label: {
            he: "מוכנים להתחייב ל-5-10 שעות שירות קהילתי שבועיות במהלך התואר?",
            en: "Are you willing to commit to 5-10 weekly community-service hours during your studies?",
            am: "በትምህርት ጊዜ ለ5-10 ሳምንታዊ የማህበረሰብ አገልግሎት ሰዓታት ቁርጠኝነት ለመስጠት ይዘጋጃሉ?",
          },
        },
        {
          id: "incomeTier",
          type: "radio",
          label: {
            he: "מצב סוציו-אקונומי משפחתי",
            en: "Family socioeconomic status",
            am: "የቤተሰብ ማህበራዊ-ኢኮኖሚያዊ ሁኔታ",
          },
          options: [
            {
              value: "low",
              label: {
                he: "נמוך — מתחת לחציון",
                en: "Low — below median",
                am: "ዝቅተኛ — ከመካከለኛ በታች",
              },
            },
            {
              value: "medium",
              label: {
                he: "בינוני — סביב חציון",
                en: "Medium — around median",
                am: "መካከለኛ — መካከለኛ አካባቢ",
              },
            },
            {
              value: "high",
              label: {
                he: "גבוה — מעל חציון",
                en: "High — above median",
                am: "ከፍተኛ — ከመካከለኛ በላይ",
              },
            },
          ],
        },
      ],
      rules: [
        {
          kind: "require-true",
          questionId: "ethiopianDescent",
          reason: {
            he: "מלגות ISEF / Hesegim מיועדות לקהילת יוצאי אתיופיה.",
            en: "ISEF / Hesegim scholarships are for the Ethiopian-Israeli community.",
            am: "ISEF / Hesegim ስኮላርሺፖች ለኢትዮጵያ-እስራኤላውያን ማህበረሰብ ናቸው።",
          },
        },
        {
          kind: "require-true",
          questionId: "activeUndergrad",
          reason: {
            he: "Hesegim מתמקדת בתואר ראשון; ISEF מתחיל מתואר שני (ראו אופציה זו בדף).",
            en: "Hesegim focuses on undergraduate studies; ISEF starts at graduate level (see that option on the page).",
            am: "Hesegim በቅዳሜ ትምህርት ላይ ያተኩራል፤ ISEF ከማስተርስ ይጀምራል (ይህን አማራጭ በገጹ ይመልከቱ)።",
          },
        },
        {
          kind: "require-true",
          questionId: "communityServiceCommit",
          reason: {
            he: "מחויבות לשירות קהילתי היא תנאי לקבלת המלגה.",
            en: "Community-service commitment is a scholarship requirement.",
            am: "የማህበረሰብ አገልግሎት ቁርጠኝነት የስኮላርሺፕ መስፈርት ነው።",
          },
        },
        {
          kind: "require-not",
          questionId: "incomeTier",
          values: ["high"],
          reason: {
            he: "המלגות מקצות לפי צורך סוציו-אקונומי. במצב גבוה — בדקו אופציות אחרות בדף.",
            en: "Scholarships are need-based. With high income, see alternative options on the page.",
            am: "ስኮላርሺፖች በፍላጎት ላይ የተመሰረቱ ናቸው። በከፍተኛ ገቢ — በገጹ ሌሎች አማራጮችን ይመልከቱ።",
          },
        },
      ],
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
    wizard: {
      questions: [
        {
          id: "bothParentsWork",
          type: "boolean",
          label: {
            he: "שני בני הזוג עובדים?",
            en: "Are both partners employed?",
            am: "ሁለቱም አጋሮች ይሰራሉ?",
          },
        },
        {
          id: "sufficientHours",
          type: "boolean",
          label: {
            he: "אחד מבני הזוג עובד 30+ שעות שבועיות, השני 24+ שעות?",
            en: "Does one partner work 30+ weekly hours and the other 24+?",
            am: "አንድ አጋር በሳምንት 30+ ሰዓታት፣ ሌላው 24+ ይሰራል?",
          },
        },
        {
          id: "childAge",
          type: "boolean",
          label: {
            he: "הילד.ה בגיל 3 חודשים — 3 שנים?",
            en: "Is the child between 3 months and 3 years old?",
            am: "ልጁ ከ3 ወራት – 3 ዓመት ዕድሜ ነው?",
          },
        },
        {
          id: "recognizedDaycare",
          type: "boolean",
          label: {
            he: "המעון מוכר על ידי משרד הכלכלה?",
            en: "Is the daycare recognized by the Ministry of Economy?",
            am: "የቀን እንክብካቤ በኢኮኖሚ ሚኒስቴር የተወከለ ነው?",
          },
        },
      ],
      rules: [
        {
          kind: "require-true",
          questionId: "bothParentsWork",
          reason: {
            he: "התכנית מיועדת רק למשפחות בהן שני בני הזוג עובדים.",
            en: "The program is for families where both partners work.",
            am: "ፕሮግራሙ ሁለቱም አጋሮች ለሚሰሩባቸው ቤተሰቦች ብቻ ነው።",
          },
        },
        {
          kind: "require-true",
          questionId: "sufficientHours",
          reason: {
            he: "סף שעות עבודה: 30+ לאחד, 24+ לשני. אחרת אין סבסוד.",
            en: "Work-hour threshold: 30+ for one, 24+ for the other. Below this — no subsidy.",
            am: "የስራ ሰዓት ጣሪያ፦ ለአንዱ 30+፣ ለሌላው 24+። ከዚህ በታች ድጋፍ የለም።",
          },
        },
        {
          kind: "require-true",
          questionId: "childAge",
          reason: {
            he: "התכנית מיועדת לגילאי 3 חודשים — 3 שנים. אחרי גיל 3 בדקו צהרונים מסובסדים.",
            en: "The program covers ages 3 months to 3 years. For ages 3+ check subsidized after-school programs.",
            am: "ፕሮግራሙ ከ3 ወራት – 3 ዓመት ዕድሜ ይሸፍናል። ከ3 ዓመት በላይ የተደገፉ ከት/ቤት በኋላ ፕሮግራሞችን ይፈትሹ።",
          },
        },
        {
          kind: "require-true",
          questionId: "recognizedDaycare",
          reason: {
            he: "רק מעונות מוכרים על ידי משרד הכלכלה זכאים לסבסוד.",
            en: "Only daycares recognized by the Ministry of Economy qualify.",
            am: "በኢኮኖሚ ሚኒስቴር የተወከሉ የቀን እንክብካቤዎች ብቻ ብቁ ናቸው።",
          },
        },
      ],
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
    wizard: {
      questions: [
        {
          id: "isCitizen",
          type: "boolean",
          label: {
            he: "אתם אזרחים או תושבים קבועים בישראל?",
            en: "Are you an Israeli citizen or permanent resident?",
            am: "የእስራኤል ዜጋ ወይም ቋሚ ነዋሪ ነዎት?",
          },
        },
        {
          id: "ownsProperty",
          type: "boolean",
          label: {
            he: "האם אתם או בן.בת הזוג בעלים של דירה / נכס?",
            en: "Do you (or your partner) own an apartment or property?",
            am: "እርስዎ (ወይም አጋርዎ) አፓርትመንት ወይም ንብረት አለዎት?",
          },
        },
        {
          id: "incomeBelowCeiling",
          type: "boolean",
          label: {
            he: "הכנסת המשפחה החודשית מתחת לתקרה (משתנה לפי גודל משפחה)?",
            en: "Is your family monthly income below the ceiling (varies by family size)?",
            am: "የቤተሰብ ወርሃዊ ገቢ ከጣሪያ በታች ነው (በቤተሰብ መጠን ይለያያል)?",
          },
        },
        {
          id: "familyStatus",
          type: "radio",
          label: {
            he: "מצב משפחתי",
            en: "Family status",
            am: "የቤተሰብ ሁኔታ",
          },
          options: [
            {
              value: "married_5y",
              label: {
                he: "נשואים 5+ שנים",
                en: "Married 5+ years",
                am: "ከ5+ ዓመታት ያገቡ",
              },
            },
            {
              value: "single_parent_2",
              label: {
                he: "הורה יחיד עם 2+ ילדים",
                en: "Single parent with 2+ children",
                am: "ብቸኛ ወላጅ ከ2+ ልጆች ጋር",
              },
            },
            {
              value: "senior_no_housing",
              label: {
                he: "בן 60+ ללא דיור",
                en: "Age 60+ without housing",
                am: "60+ ዕድሜ ያለ መኖሪያ",
              },
            },
            {
              value: "single_no_dependents",
              label: {
                he: "רווק.ה ללא ילדים",
                en: "Single without dependents",
                am: "ያላገባ/ች ያለ ጥገኛ",
              },
            },
          ],
        },
      ],
      rules: [
        {
          kind: "require-true",
          questionId: "isCitizen",
          reason: {
            he: "דיור ציבורי מיועד לאזרחי ותושבי ישראל בלבד.",
            en: "Public housing is for Israeli citizens and residents only.",
            am: "የሕዝብ መኖሪያ ቤት ለእስራኤል ዜጎች እና ነዋሪዎች ብቻ ነው።",
          },
        },
        {
          kind: "require-false",
          questionId: "ownsProperty",
          reason: {
            he: "התכנית מיועדת למשפחות ללא בעלות בנכס.",
            en: "The program is for families without property ownership.",
            am: "ፕሮግራሙ ያለ ንብረት ባለቤትነት ለቤተሰቦች ነው።",
          },
        },
        {
          kind: "require-true",
          questionId: "incomeBelowCeiling",
          reason: {
            he: "הכנסה מעל התקרה מוציאה את הזכאות.",
            en: "Income above the ceiling disqualifies.",
            am: "ከጣሪያ በላይ ገቢ ብቁነትን ያስቆማል።",
          },
        },
        {
          kind: "require-not",
          questionId: "familyStatus",
          values: ["single_no_dependents"],
          reason: {
            he: "רווקים/ות ללא ילדים אינם זכאים בדרך כלל. בדקו עדיפויות מיוחדות (נכות, ניצולי שואה).",
            en: "Single without dependents are typically not eligible. Check special priorities (disability, Holocaust survivors).",
            am: "ያላገባ ያለ ጥገኛ አብዛኛውን ጊዜ ብቁ አይደለም። ልዩ ቅድሚያዎችን (ጉዳት፣ ሆሎኮስት የተረፉ) ይፈትሹ።",
          },
        },
      ],
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
      he: "falash-mura-direct-absorption",
      en: "falash-mura-direct-absorption",
      am: "falash-mura-direct-absorption",
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

  // 9 — Senior pension supplement (Bituach Leumi)
  {
    title: {
      he: "השלמת הכנסה לגיל זהב — ביטוח לאומי",
      en: "Senior Pension Supplement — National Insurance",
      am: "የአዛውንት የጡረታ ማሟያ — ብሔራዊ ኢንሹራንስ",
    },
    slug: { he: "senior-pension", en: "senior-pension", am: "senior-pension" },
    govUrl: "https://www.btl.gov.il/benefits/old_age/Pages/default.aspx",
    eligibilitySummary: {
      he: "תוספת הכנסה חודשית מביטוח לאומי לאזרחים בני 67+ עם הכנסות נמוכות. שיעור ההשלמה תלוי במצב משפחתי, גיל, ושנות תושבות.",
      en: "Monthly income supplement from National Insurance for citizens 67+ with low income. Amount depends on family status, age, and years of residency.",
      am: "ዝቅተኛ ገቢ ላላቸው 67+ ዕድሜ ላላቸው ዜጎች ከብሔራዊ ኢንሹራንስ ወርሃዊ የገቢ ማሟያ። መጠኑ በቤተሰብ ሁኔታ፣ በዕድሜ እና በነዋሪነት ዓመታት ይወሰናል።",
    },
    tags: ["senior", "monthly_payment", "welfare"],
    bodies: {
      he: `## למי מיועד?

- אזרחי ישראל בני 67 ומעלה (גברים 67, נשים 65 — בהדרגה עולה)
- 10+ שנות תושבות בישראל לפני הגשה
- הכנסה משפחתית נמוכה מתקרה משתנה (משולב פנסיה + מקורות אחרים)

## מה כולל?

- **קצבת זקנה בסיסית**: לפי שנות תושבות
- **תוספת השלמת הכנסה**: למי שאין לו פנסיה כלל או פנסיה נמוכה
- **תוספת ותק**: לכל שנת תושבות מעבר ל-10
- **תוספת בן/בת זוג**: עבור בן זוג בלי קצבה משלו

## איך מגישים?

1. נכנסים ל-[btl.gov.il](https://www.btl.gov.il) — אזור אישי
2. ממלאים טופס "תביעה לקצבת זקנה" + מצרפים תעודת זהות + אישורי הכנסה
3. במידת הצורך — פנייה לסניף הסמוך
4. בני קהילה שעלו בגיל מבוגר — תקופת תושבות נצברת **כולל** תקופות באתיופיה לעיתים (לפי הסכמים בילטרליים)

📞 **קו זקנה ביטוח לאומי**: 02-6463555 | *6050
`,
      en: `## Who is eligible?

- Israeli citizens aged 67+ (men 67, women 65 — gradually rising)
- 10+ years of residency in Israel before applying
- Family income below a calibrated ceiling (combined pension + other sources)

## What's included?

- **Basic old-age pension**: scaled by years of residency
- **Income supplement**: for those without pension or with low pension
- **Seniority bonus**: per year of residency beyond 10
- **Spouse supplement**: for a partner without their own pension

## How to apply

1. Login to [btl.gov.il](https://www.btl.gov.il) — personal account
2. File "Old-age pension claim" + attach ID + income proofs
3. If needed — visit the nearest branch
4. Community members who immigrated late in life — residency periods may include time in Ethiopia in some cases (per bilateral agreements)

📞 **National Insurance senior line**: 02-6463555 | *6050
`,
      am: `## ለማን ይሆናል?

- 67+ ዕድሜ ያላቸው የእስራኤል ዜጎች (ወንዶች 67፣ ሴቶች 65 — ቀስ በቀስ ይነሳል)
- ከማመልከታቸው በፊት በእስራኤል 10+ ዓመታት የነዋሪነት
- ከተወሰነ ጣሪያ በታች የሆነ የቤተሰብ ገቢ (የተደመረ ጡረታ + ሌሎች ምንጮች)

## ምን ይካተታል?

- **መሠረታዊ የእርጅና ጡረታ**: በነዋሪነት ዓመታት የተደረደረ
- **የገቢ ማሟያ**: ጡረታ ለሌላቸው ወይም ዝቅተኛ ጡረታ ላላቸው
- **የስራ ጥቅል ጥቅማጥቅም**: ከ10 በላይ በነዋሪነት ለእያንዳንዱ ዓመት
- **የትዳር አጋር ማሟያ**: የራሱ ጡረታ ለሌለው አጋር

## እንዴት ማመልከት ይቻላል

1. ወደ [btl.gov.il](https://www.btl.gov.il) ይግቡ — የግል አካውንት
2. "የእርጅና ጡረታ ጥያቄ" ይሙሉ + መታወቂያ + የገቢ ማስረጃ ያያይዙ
3. አስፈላጊ ከሆነ — ወደ ቅርብ ቅርንጫፍ ይሂዱ
4. ዘግይተው የተሰደዱ የማህበረሰብ አባላት — የመኖሪያ ጊዜዎች በኢትዮጵያ የነበረን ጊዜ ሊካተት ይችላል (በሁለትዮሽ ስምምነቶች መሠረት)

📞 **የብሔራዊ ኢንሹራንስ የአዛውንት መስመር**: 02-6463555 | *6050
`,
    },
  },

  // 10 — Excellence employment programs (Olim Beyahad / Tech-Career)
  {
    title: {
      he: "תכניות מצוינות תעסוקתיות — עולים-ביחד וטק-קריירה",
      en: "Excellence Employment Programs — Olim Beyahad & Tech-Career",
      am: "የተግባር ብቃት የስራ ፕሮግራሞች — ኦሊም በያሃድ እና ቴክ-ካሪየር",
    },
    slug: {
      he: "excellence-employment",
      en: "excellence-employment",
      am: "excellence-employment",
    },
    govUrl: "https://www.olim-beyahad.org.il",
    eligibilitySummary: {
      he: "השמת אקדמאים בהייטק וניהול דרך עולים-ביחד (700+ אקדמאים, 90% החזקה) וטק-קריירה (bootcamps להייטק). חינם, מבוסס מצוינות.",
      en: "Placement of academics in tech and management via Olim Beyahad (700+ placed, 90% retention) and Tech-Career (tech bootcamps). Free, merit-based.",
      am: "በኦሊም በያሃድ (700+ የተመደቡ፣ 90% መቆያነት) እና ቴክ-ካሪየር (ቴክ ቡት ካምፖች) በኩል በቴክ እና በአስተዳደር አካዳሚክ ምደባ። ነፃ፣ በብቃት ላይ የተመሰረተ።",
    },
    tags: ["employment", "mentorship", "anchor_partner"],
    bodies: {
      he: `## מי הארגונים?

- **עולים-ביחד**: השמת אקדמאים יוצאי אתיופיה במשרות הייטק וניהול. 650+ חברות שותפות. 90% המשך-עבודה אחרי שנה.
- **טק-קריירה**: בית ספר חינם להייטק (cybersecurity, data, dev). 6-12 חודשי תכנית, 80%+ השמה.

## תנאי כניסה

**עולים-ביחד**:
- תואר ראשון לפחות
- שאיפה למשרת הייטק או ניהול בכיר

**טק-קריירה**:
- בגרות מלאה
- 18-35 בדרך כלל (לא נוקשה)
- מבחני קבלה (לוגיקה + מוטיבציה)

## איך מגישים?

1. **עולים-ביחד**: [olim-beyahad.org.il](http://www.olim-beyahad.org.il) → "הצטרף" → טופס + קו"ח
2. **טק-קריירה**: [tech-career.org](https://www.tech-career.org) → "תכניות" → לוח קוהורטות (פתיחה כל 3-4 חודשים)
3. ראיון אישי + מבחני התאמה
4. אישור → תחילת תכנית

**ערך מוסף**: רשת alumni (1,200+) של אקדמאים יוצאי קהילה במגוון תפקידים.
`,
      en: `## What are these orgs?

- **Olim Beyahad**: Places Ethiopian-Israeli academics in tech and senior management roles. 650+ partner companies. 90% retention after one year.
- **Tech-Career**: Free tech bootcamp school (cybersecurity, data, dev). 6-12 month programs, 80%+ placement.

## Entry requirements

**Olim Beyahad**:
- Bachelor's degree minimum
- Career aspirations in tech or senior management

**Tech-Career**:
- Full matriculation
- Typically 18-35 (not strict)
- Entrance exams (logic + motivation)

## How to apply

1. **Olim Beyahad**: [olim-beyahad.org.il](http://www.olim-beyahad.org.il) → "Join" → form + CV
2. **Tech-Career**: [tech-career.org](https://www.tech-career.org) → "Programs" → cohort calendar (new cohorts every 3-4 months)
3. Personal interview + assessment exams
4. Acceptance → program starts

**Bonus value**: 1,200+ alumni network of community academics across roles.
`,
      am: `## ድርጅቶቹ ምን ናቸው?

- **ኦሊም በያሃድ**: በቴክ እና በከፍተኛ አስተዳደር ሚናዎች የኢትዮጵያ-እስራኤላውያን አካዳሚክ ሰዎችን ይመድባል። 650+ የአጋር ኩባንያዎች። ከአንድ ዓመት በኋላ 90% መቆያነት።
- **ቴክ-ካሪየር**: ነፃ የቴክ ቡት ካምፕ ት/ቤት (ሳይበርሰኩሪቲ፣ ዳታ፣ ዴቭ)። ከ6-12 ወራት ፕሮግራሞች፣ 80%+ ምደባ።

## የመግቢያ መስፈርቶች

**ኦሊም በያሃድ**:
- ቢያንስ የመጀመሪያ ዲግሪ
- በቴክ ወይም በከፍተኛ አስተዳደር የስራ ምኞት

**ቴክ-ካሪየር**:
- ሙሉ ማትሪክ
- አብዛኛውን ጊዜ 18-35 (ጥብቅ አይደለም)
- የመግቢያ ፈተናዎች (አመክንዮ + ተነሳሽነት)

## እንዴት ማመልከት ይቻላል

1. **ኦሊም በያሃድ**: [olim-beyahad.org.il](http://www.olim-beyahad.org.il) → "ተቀላቀል" → ቅጽ + የግል ታሪክ
2. **ቴክ-ካሪየር**: [tech-career.org](https://www.tech-career.org) → "ፕሮግራሞች" → የቡድን ካላንደር
3. የግል ቃለ መጠይቅ + የብቃት ፈተናዎች
4. ተቀባይነት → ፕሮግራሙ ይጀምራል

**የተጨማሪ እሴት**: በተለያዩ ሚናዎች 1,200+ የማህበረሰብ ምሁራን አለማዊ አውታር።
`,
    },
  },

  // 11 — Youth mentorship (PERACH + ENP-style)
  {
    title: {
      he: "חונכות נוער — פר״ח, ENP, פידל",
      en: "Youth Mentorship — PERACH, ENP, Fidel",
      am: "የወጣቶች የአማካሪ ድጋፍ — PERACH፣ ENP፣ ፊደል",
    },
    slug: { he: "youth-mentorship", en: "youth-mentorship", am: "youth-mentorship" },
    govUrl: "https://www.enp.org.il/he/",
    eligibilitySummary: {
      he: "תכניות חונכות אקדמית/חברתית לנוער יוצא אתיופיה. PERACH (סטודנטים-תלמידים), ENP (32 ערים, בית-ספרי), Fidel (משפחות + מתווכים).",
      en: "Academic/social mentorship programs for Ethiopian-Israeli youth. PERACH (university student → school pupil), ENP (32 cities, school-based), Fidel (families + mediators).",
      am: "ለኢትዮጵያ-እስራኤላውያን ወጣቶች የአካዳሚክ/ማህበራዊ የአማካሪ ፕሮግራሞች። PERACH (ዩኒቨርሲቲ ተማሪ → ት/ቤት ተማሪ)፣ ENP (32 ከተሞች፣ ት/ቤት-ተኮር)፣ ፊደል (ቤተሰቦች + አስታራቂዎች)።",
    },
    tags: ["youth", "mentorship", "education"],
    bodies: {
      he: `## תכניות מומלצות

- **פר״ח (PERACH)**: סטודנט/ית מקבלים מלגה (כ-5,000₪/שנה) תמורת חונכות 4 שעות שבועיות לתלמיד/ה. מתאים לבני 7-18.
- **ENP — Ethiopian National Project**: תכניות בית-ספריות (SPACE) ב-32 ערים. תוספת לימוד אחר הצהריים, הכנה לבגרות, מנטורים מהקהילה.
- **Fidel**: מתמקדת במשפחה — מתווכים בבתי ספר, מועדוני נוער, ליווי הורים.

## למי מיועד?

- **PERACH**: כל תלמיד/ה מהקהילה שמורה צריך תגבור (אישי, ספציפי) — בקשה דרך יועצ/ת בית הספר
- **ENP**: דרך בית הספר עצמו — אם הוא ברשימת 32 הערים. בדוק עם המורה.
- **Fidel**: דרך מועדון נוער קהילתי או רשם בית הספר.

## איך מתחילים?

1. דבר עם **המורה / יועצ/ת בית הספר** הראשון/ה
2. ENP: [enp.org.il/he](https://www.enp.org.il/he/) → "מי אנחנו" → סניפים
3. PERACH: דרך אגף הסטודנטים באוניברסיטה (אם יש סטודנט במשפחה שיוכל להיות חונך)
4. Fidel: [fidel.org.il](https://fidel.org.il) → "פנו אלינו"

**טיפ**: שילוב של 2 מהתכניות (ENP + PERACH למשל) נפוץ ויעיל.
`,
      en: `## Recommended programs

- **PERACH**: A student receives a stipend (~₪5,000/year) in exchange for 4 weekly hours of mentoring a younger pupil. For ages 7-18.
- **ENP — Ethiopian National Project**: School-based programs (SPACE) across 32 cities. After-school tutoring, matriculation prep, community mentors.
- **Fidel**: Family-focused — school mediators, youth clubs, parent guidance.

## Who is eligible?

- **PERACH**: Any community pupil whose teacher recommends targeted tutoring — request via school counselor
- **ENP**: Through the school itself — if it's in the 32-city network. Ask the teacher.
- **Fidel**: Via a community youth club or school registrar.

## How to start

1. Talk to the **teacher / school counselor** first
2. ENP: [enp.org.il/he](https://www.enp.org.il/he/) → "About" → branches
3. PERACH: via the dean-of-students office at the local university (if a family member can be the mentor)
4. Fidel: [fidel.org.il](https://fidel.org.il) → "Contact"

**Tip**: combining 2 programs (ENP + PERACH for example) is common and effective.
`,
      am: `## የተመከሩ ፕሮግራሞች

- **PERACH**: አንድ ተማሪ ለታናሽ ተማሪ በሳምንት 4 ሰዓታት የአማካሪነት አገልግሎት ሲሰጥ ስቲፐንድ (~5,000 ሺ"ል/ዓመት) ይቀበላል። ከ7-18 ዕድሜ ላሉ።
- **ENP — Ethiopian National Project**: በ32 ከተሞች ት/ቤት-ተኮር ፕሮግራሞች (SPACE)። ከት/ቤት በኋላ ትምህርት፣ ማትሪክ ዝግጅት፣ ማህበረሰብ አማካሪዎች።
- **ፊደል**: በቤተሰብ ላይ ያተኩራል — የት/ቤት አስታራቂዎች፣ የወጣት ክለቦች፣ የወላጅ መመሪያ።

## ለማን ይሆናል?

- **PERACH**: ት/ቤት አማካሪ ያስፈለገው ማንኛውም የማህበረሰብ ተማሪ
- **ENP**: በት/ቤቱ በኩል — በ32 ከተሞች አውታር ካለ
- **ፊደል**: በማህበረሰብ ወጣት ክለብ ወይም በት/ቤት መዝገብ ቤት በኩል

## እንዴት መጀመር ይቻላል

1. በመጀመሪያ ለ**መምህር / የት/ቤት አማካሪ** ይነጋገሩ
2. ENP: [enp.org.il/he](https://www.enp.org.il/he/)
3. PERACH: በአካባቢው ዩኒቨርሲቲ የተማሪዎች ዲን ቢሮ
4. ፊደል: [fidel.org.il](https://fidel.org.il) → "ያነጋግሩን"

**ምክር**: 2 ፕሮግራሞችን ማቀላቀል (ENP + PERACH) የተለመደ እና ውጤታማ ነው።
`,
    },
  },

  // 12 — Tene Briut (mental health, anchor partner)
  {
    title: {
      he: "סיוע נפשי דובר אמהרית — טנא בריאות",
      en: "Amharic-Speaking Mental Health Support — Tene Briut",
      am: "የአማርኛ ተናጋሪ የአእምሮ ጤና ድጋፍ — ጤና ብርሃት",
    },
    slug: {
      he: "tene-briut-mental-health",
      en: "tene-briut-mental-health",
      am: "tene-briut-mental-health",
    },
    govUrl: "https://tene-briut.org.il",
    eligibilitySummary: {
      he: "טנא בריאות — עמותה ארצית של אנשי מקצוע מהקהילה. שירות בריאות הנפש דובר אמהרית, מניעת מחלות כרוניות, ומגשרי תרבות. שותף-עוגן לפילר הבריאות.",
      en: "Tene Briut — national NGO of community health professionals. Amharic-speaking mental health services, chronic-disease prevention, cultural mediators. Anchor partner for the Health pillar.",
      am: "ጤና ብርሃት — የማህበረሰብ የጤና ባለሙያዎች ብሔራዊ ድርጅት። የአማርኛ የአእምሮ ጤና አገልግሎቶች፣ ሥር የሰደደ በሽታ መከላከል፣ የባህል አስታራቂዎች።",
    },
    tags: ["mental_health", "anchor_partner", "health"],
    bodies: {
      he: `## מה הם מציעים?

- **בריאות הנפש**: ייעוץ פסיכולוגי דובר-אמהרית, ליווי במצבי משבר, התמודדות עם טראומה (אקטואלי במיוחד אחרי ה-7.10).
- **מניעת מחלות כרוניות**: סוכרת, יתר לחץ דם — תכנים בעברית/אמהרית, סדנאות קהילתיות.
- **מגשרי תרבות**: בקופות חולים ובבתי חולים, מסייעים בתקשורת בין מטופלים לרופאים.
- **ליווי משפחות**: עם מחלות כרוניות, סוף החיים, אבל.

## איך פונים?

1. **קו חם**: 03-7383937 (ראשון-חמישי 9:00-17:00, אמהרית/עברית)
2. **אתר**: [tene-briut.org.il](https://tene-briut.org.il) — פרטי קשר לסניפים אזוריים
3. **WhatsApp**: ישירות עם רכז.ת בריאות הנפש (מספר באתר)
4. **דרך קופ"ח**: בקש "מתורגמן/מגשר תרבות לאמהרית" — טנא בריאות מספקים את השירות

## למי מיועד?

- כל בן/ת קהילה — הילדים, הורים, סבים. אין הגבלת גיל.
- מצבי משבר אקוטיים מטופלים בעדיפות.
- שירות חינמי או בעלות סמלית.

🚨 **במקרה משבר חריף**: ERAN 1201 (24/7), או חדר מיון בית חולים סמוך.
`,
      en: `## What they offer

- **Mental health**: Amharic-speaking psychological counseling, crisis support, trauma response (especially relevant post-Oct 7).
- **Chronic-disease prevention**: diabetes, hypertension — Hebrew/Amharic content, community workshops.
- **Cultural mediators**: at HMOs and hospitals, help patients communicate with doctors.
- **Family support**: chronic illness, end-of-life, bereavement.

## How to reach Tene Briut

1. **Hotline**: 03-7383937 (Sun-Thu 9:00-17:00, Amharic/Hebrew)
2. **Web**: [tene-briut.org.il](https://tene-briut.org.il) — regional branch contact info
3. **WhatsApp**: directly with mental-health coordinator (number on website)
4. **Via HMO**: ask for "Amharic translator/cultural mediator" — Tene Briut staffs the service

## Who is eligible?

- Any community member — children, parents, grandparents. No age restriction.
- Acute crises prioritized.
- Free or symbolic cost.

🚨 **In acute crisis**: ERAN 1201 (24/7), or nearest hospital ER.
`,
      am: `## የሚያቀርቡት

- **የአእምሮ ጤና**: የአማርኛ ሳይኮሎጂካል ምክር፣ የችግር ጊዜ ድጋፍ፣ የጤና ቁስል ምላሽ (ከ10/7 በኋላ በተለይ ጠቃሚ)።
- **ሥር የሰደደ በሽታ መከላከል**: ስኳር በሽታ፣ የደም ግፊት — የዕብራይስጥ/አማርኛ ይዘት፣ የማህበረሰብ ወርክሾፖች።
- **የባህል አስታራቂዎች**: በሕክምና ድርጅቶች እና ሆስፒታሎች፣ ታካሚዎች ከሐኪሞች ጋር እንዲገናኙ ይረዳሉ።
- **የቤተሰብ ድጋፍ**: ሥር የሰደደ ሕመም፣ የሕይወት መጨረሻ፣ ሐዘን።

## ጤና ብርሃትን እንዴት መድረስ ይቻላል

1. **የስልክ መስመር**: 03-7383937 (እሁድ-ሐሙስ 9:00-17:00፣ አማርኛ/ዕብራይስጥ)
2. **ድረ-ገጽ**: [tene-briut.org.il](https://tene-briut.org.il)
3. **WhatsApp**: በቀጥታ ከአእምሮ ጤና አስተባባሪ ጋር (ቁጥር በድረ-ገጹ)
4. **በሕክምና ድርጅት በኩል**: "የአማርኛ ተርጓሚ/የባህል አስታራቂ" ይጠይቁ

## ለማን ይሆናል?

- ማንኛውም የማህበረሰብ አባል — ልጆች፣ ወላጆች፣ አያቶች
- ከባድ ችግሮች ቅድሚያ ያገኛሉ
- ነፃ ወይም በምልክት ወጪ

🚨 **በከባድ ችግር ጊዜ**: ERAN 1201 (24/7)፣ ወይም በቅርብ ሆስፒታል ER።
`,
    },
  },

  // 13 — Tax relief for new immigrants
  {
    title: {
      he: "הטבות מס לעולים חדשים (5/10 שנים)",
      en: "Tax Benefits for New Immigrants (5/10 years)",
      am: "ለአዲስ ስደተኞች የግብር ጥቅም (5/10 ዓመታት)",
    },
    slug: {
      he: "immigrant-tax-relief",
      en: "immigrant-tax-relief",
      am: "immigrant-tax-relief",
    },
    govUrl: "https://www.gov.il/he/departments/topics/olim_tax_benefits",
    eligibilitySummary: {
      he: 'פטור ממס הכנסה על הכנסות מחו"ל ל-10 שנים, נקודות זיכוי מוגדלות במס הכנסה ל-5 שנים, פטור ממכס על מטלטלין. חל על כל עולה — כולל יוצאי אתיופיה.',
      en: "10-year income tax exemption on foreign income, enhanced tax credits for 5 years, customs exemption on personal effects. Applies to all olim — including Ethiopian-Israelis.",
      am: "ለ10 ዓመታት በውጭ ገቢ የገቢ ግብር ነፃነት፣ ለ5 ዓመታት የተሻሻሉ የግብር ክሬዲቶች፣ በግል ንብረት ጉምሩክ ነፃነት። ለሁሉም ስደተኞች ይተገበራል።",
    },
    tags: ["tax_relief", "new_immigrant", "grants"],
    bodies: {
      he: `## מה כלול?

### פטורי מס (10 שנים מהעלייה)
- **פטור על הכנסות מחו"ל**: שכר, ריבית, דיבידנדים, רווחי הון ממקור זר
- **פטור על פנסיה זרה**: עד תקרה
- **דיווח מצומצם**: בשנים הראשונות, פטור מהדיווח על נכסים בחו"ל

### נקודות זיכוי מוגדלות (5 שנים)
- שנה ראשונה: 3 נקודות זיכוי נוספות (~9,000 ₪)
- שנה שנייה: 2 נקודות
- שנים 3-5: נקודה אחת לשנה

### פטורי מכס (3 שנים)
- מטלטלין אישיים, רכב (תנאים), ציוד מקצועי
- חישוב לפי שווי שיא

## איך מממשים?

1. **רשום עלייה**: ת"ז עולה, אישור עלייה ממשרד הקליטה
2. **פתיחת תיק במס הכנסה**: כעולה — אוטומטי
3. **הגשת בקשה לנקודות זיכוי**: דרך המעסיק (טופס 101) או רואה חשבון
4. **מטלטלין**: דיווח לרשות המכס תוך 3 שנים

📞 **רשות המסים**: 4954*
`,
      en: `## What's included?

### Tax exemptions (10 years from aliyah)
- **Exemption on foreign income**: salary, interest, dividends, capital gains from foreign source
- **Foreign pension exemption**: up to a ceiling
- **Reduced reporting**: in the early years, exempt from reporting foreign assets

### Enhanced tax credits (5 years)
- Year 1: 3 extra credit points (~₪9,000)
- Year 2: 2 points
- Years 3-5: 1 point per year

### Customs exemptions (3 years)
- Personal effects, vehicle (with conditions), professional equipment
- Calculated at peak value

## How to claim

1. **Register aliyah**: immigrant ID + aliyah confirmation from Ministry of Aliyah
2. **Open Tax Authority file**: as oleh — automatic
3. **Apply for credit points**: via employer (form 101) or accountant
4. **Personal effects**: declare to Customs Authority within 3 years

📞 **Israel Tax Authority**: *4954
`,
      am: `## ምን ይካተታል?

### የግብር ነፃነቶች (ከአሊያ 10 ዓመታት)
- **በውጭ ገቢ ነፃነት**: ደመወዝ፣ ወለድ፣ ድርሻ፣ ካፒታል ጥቅም ከውጭ ምንጭ
- **የውጭ ጡረታ ነፃነት**: ከተወሰነ ጣሪያ ድረስ
- **የቀለለ ሪፖርት**: በመጀመሪያ ዓመታት፣ የውጭ ንብረት ሪፖርት ከማድረግ ነፃ

### የተሻሻሉ የግብር ክሬዲቶች (5 ዓመታት)
- 1ኛ ዓመት: 3 ተጨማሪ ክሬዲት ነጥቦች (~9,000 ሺ"ል)
- 2ኛ ዓመት: 2 ነጥቦች
- 3-5 ዓመታት: በዓመት 1 ነጥብ

### የጉምሩክ ነፃነቶች (3 ዓመታት)
- የግል ንብረት፣ ተሽከርካሪ (በሁኔታዎች)፣ የሙያ መሳሪያ
- በከፍተኛ ዋጋ ይሰላል

## እንዴት ማግኘት ይቻላል

1. **አሊያን ይመዝገቡ**: የስደተኛ መታወቂያ + ከመመለሻ ሚኒስቴር የአሊያ ማረጋገጫ
2. **የግብር ባለሥልጣን ፋይል ይክፈቱ**: እንደ ስደተኛ — በራስ ሰር
3. **የክሬዲት ነጥቦች ይጠይቁ**: በቀጣሪ (ቅጽ 101) ወይም በሂሳብ ባለሙያ
4. **የግል ንብረት**: በ3 ዓመታት ውስጥ ለጉምሩክ ባለሥልጣን ያሳውቁ

📞 **የእስራኤል የግብር ባለሥልጣን**: *4954
`,
    },
  },

  // 14 — Small business loans (UJIA-KIEDF)
  {
    title: {
      he: "הלוואות לעסקים קטנים — UJIA-KIEDF",
      en: "Small Business Loans — UJIA-KIEDF",
      am: "ለትንሽ ንግዶች ብድር — UJIA-KIEDF",
    },
    slug: {
      he: "ujia-kiedf-business-loans",
      en: "ujia-kiedf-business-loans",
      am: "ujia-kiedf-business-loans",
    },
    govUrl: "https://ujia.org/connect/supporting-israel/business/",
    eligibilitySummary: {
      he: "קרן הלוואות חברתית לבעלי עסקים קטנים מהקהילה. עד 200,000 ₪, ריבית מסובסדת, ללא בטחונות בנקאיים. UJIA-KIEDF במימון בריטי-יהודי.",
      en: "Social loan fund for community small-business owners. Up to ₪200,000, subsidized interest, no bank collateral. UJIA-KIEDF funded by British-Jewish community.",
      am: "ለማህበረሰብ ትንሽ-ንግድ ባለቤቶች ማህበራዊ የብድር ፈንድ። እስከ 200,000 ₪፣ የተደገፈ ወለድ፣ የባንክ ዋስትና አያስፈልግም።",
    },
    tags: ["small_business", "entrepreneurship", "grants"],
    bodies: {
      he: `## מה הקרן מציעה?

- **סכום**: עד ₪200,000 לעסק
- **ריבית מסובסדת**: סביב פריים-2% (משתנה)
- **תקופת החזר**: עד 5 שנים
- **בלי בטחונות בנקאיים**: הקרן עובדת על ערבים אישיים בלבד
- **ליווי עסקי**: מנטור עסקי בחינם לכל לווה

## למי מיועד?

- בעלי עסק קיים (1+ שנת פעילות) — או תכנית עסקית מוצקה לעסק חדש
- חברי הקהילה (יוצאי אתיופיה / Falash Mura)
- עסק רשום בישראל — ת"ז מס + ע"מ
- ללא רישום פלילי בעבירות מס

## תהליך

1. **בקשה ראשונית**: דרך [ujia.org](https://ujia.org/connect/supporting-israel/business/) → טופס + תכנית עסקית
2. **ראיון**: עם רכז.ת הקרן + מנטור עסקי מוצמד
3. **ועדת אשראי**: דנה במקרה (תוך ~3 שבועות)
4. **חתימה**: חוזה הלוואה + ערבים
5. **משיכה**: כספים בחשבון תוך שבוע

**טיפ**: מנטור Kurat (ארגון נוסף) זמין לחברי קהילה לפני הגשת בקשה — מסייע בכתיבת תכנית עסקית.
`,
      en: `## What the fund offers

- **Amount**: up to ₪200,000 per business
- **Subsidized interest**: prime - 2% (varies)
- **Repayment period**: up to 5 years
- **No bank collateral**: only personal guarantors
- **Business mentorship**: free mentor for every borrower

## Who is eligible?

- Existing business owners (1+ year operating) — OR a solid business plan for a new venture
- Community members (Ethiopian-Israeli / Falash Mura)
- Israeli-registered business — VAT + corporate ID
- No criminal record for tax offenses

## Process

1. **Initial application**: via [ujia.org](https://ujia.org/connect/supporting-israel/business/) → form + business plan
2. **Interview**: with fund coordinator + assigned business mentor
3. **Credit committee**: reviews case (~3 weeks)
4. **Signing**: loan contract + guarantors
5. **Disbursement**: funds in account within a week

**Tip**: Kurat (another community org) provides mentorship to community members BEFORE application — helps with business plan writing.
`,
      am: `## ፈንዱ የሚያቀርበው

- **መጠን**: በንግድ እስከ 200,000 ሺ"ል
- **የተደገፈ ወለድ**: prime - 2% (ይለያያል)
- **የመክፈያ ጊዜ**: እስከ 5 ዓመታት
- **የባንክ ዋስትና የለም**: የግል ዋስ ብቻ
- **የንግድ የአማካሪ ድጋፍ**: ለእያንዳንዱ ተበዳሪ ነፃ አማካሪ

## ለማን ይሆናል?

- የነበረ ንግድ ባለቤቶች (1+ ዓመት ሲሰራ) — ወይም ለአዲስ ቬንቸር ጠንካራ የንግድ እቅድ
- የማህበረሰብ አባላት
- በእስራኤል የተመዘገበ ንግድ — VAT + የድርጅት መታወቂያ
- በግብር ጥፋቶች የወንጀል መዝገብ የለም

## ሂደት

1. **የመጀመሪያ ማመልከቻ**: በ [ujia.org](https://ujia.org/connect/supporting-israel/business/)
2. **ቃለ መጠይቅ**: ከፈንድ አስተባባሪ + የተመደበ የንግድ አማካሪ ጋር
3. **የብድር ኮሚቴ**: ጉዳዩን ይመረምራል (~3 ሳምንታት)
4. **መፈረም**: የብድር ኮንትራት + ዋሶች
5. **መለቀቅ**: ገንዘቦች በአንድ ሳምንት ውስጥ በአካውንት

**ምክር**: Kurat (ሌላ የማህበረሰብ ድርጅት) ማመልከት ከመፈለግ በፊት ለማህበረሰብ አባላት የአማካሪ ድጋፍ ይሰጣል።
`,
    },
  },

  // 15 — National civic service for community youth
  {
    title: {
      he: "שירות לאומי-אזרחי לבני קהילה",
      en: "National-Civic Service for Community Youth",
      am: "ለማህበረሰብ ወጣቶች ሀገራዊ-ሲቪል አገልግሎት",
    },
    slug: {
      he: "national-civic-service",
      en: "national-civic-service",
      am: "national-civic-service",
    },
    govUrl: "https://www.sherut-leumi.co.il",
    eligibilitySummary: {
      he: "אלטרנטיבה לצבא: שנה-שנתיים שירות בקהילה (חינוך, רווחה, בריאות), עם הטבות זהות לחיילי קבע — שכר, מלגת לימוד, פטור ממס.",
      en: "Alternative to army: 1-2 years serving the community (education, welfare, health), with benefits identical to standing-army soldiers — stipend, study grant, tax exemption.",
      am: "ለሰራዊት አማራጭ: ማህበረሰቡን (ትምህርት፣ ደህንነት፣ ጤና) የማገልገል 1-2 ዓመታት፣ ከቋሚ ሰራዊት ወታደሮች ጋር አንድ ዓይነት ጥቅሞች።",
    },
    tags: ["civic_service", "youth", "education"],
    bodies: {
      he: `## מתי משתלם?

- **כשהצבא לא מתאים** (פטור רפואי, נפשי, או דתי) — או כשמעדיפים מסלול שירות אזרחי.
- **לבחורות** — חוקית קלה יותר להגיע, אם הן רוצות שירות בקהילה במקום צבא.
- **לעולים מבוגרים** — שגויסו אבל רוצים שירות בעיר מולדת.

## הטבות

- **מלגה**: ~5,000 ₪/חודש (משתנה לפי תפקיד)
- **דיור**: סובסידיה לדיור או דיור משותף
- **מלגת לימוד**: עד 5 שנים אחרי השירות לתואר
- **פטור ממס**: שלוש שנות עבודה ראשונות אחרי שחרור
- **שירות מוכר** ל-Bituach Leumi וגם לתפקידים ציבוריים

## איך מתחילים?

1. **רישום**: דרך [sherut-leumi.co.il](https://www.sherut-leumi.co.il) → "מועמדים"
2. **בחירת תפקיד**: רשימת ארגונים שותפים — ENP, Tene Briut, Tebeka, Olim Beyahad הם רובם
3. **ראיון**: עם הארגון
4. **התחלה**: בדרך כלל ב-1 בחודש הקרוב

**רעיון לחבר/ה**: שירות ב-ENP/Fidel/Tene Briut = עבודה ישירה עם הקהילה + פיתוח קריירה במקצועות חינוך/רווחה/בריאות.
`,
      en: `## When is it the right path?

- **When the army doesn't fit** (medical, psychological, or religious exemption) — or when civic-service track is preferred.
- **For women** — legally easier to enter civic over military.
- **For older immigrants** — drafted but prefer service in their hometown.

## Benefits

- **Stipend**: ~₪5,000/month (varies by role)
- **Housing**: rental subsidy or shared housing
- **Study grant**: up to 5 years after service for tertiary education
- **Tax exemption**: first three working years post-release
- **Recognized service** for Bituach Leumi + public-sector roles

## How to start

1. **Registration**: via [sherut-leumi.co.il](https://www.sherut-leumi.co.il) → "Candidates"
2. **Choose a role**: list of partner orgs — ENP, Tene Briut, Tebeka, Olim Beyahad are most of them
3. **Interview**: with the host organization
4. **Start**: usually 1st of the next month

**Idea for community youth**: Service at ENP/Fidel/Tene Briut = direct community work + career development in education/welfare/health.
`,
      am: `## መቼ ትክክለኛ መንገድ ነው?

- **ሰራዊቱ ካልተስማማ** (የሕክምና፣ የስነ ልቦና ወይም የሃይማኖት ነፃነት) — ወይም የሲቪል አገልግሎት መንገድ ሲመረጥ።
- **ለሴቶች** — ከወታደራዊ ይልቅ ሲቪል ለመግባት በሕግ ቀላል ነው።
- **ለትልልቅ ስደተኞች** — የተመለመሉ ግን በትውልድ ከተማቸው ማገልገል ሲመርጡ።

## ጥቅሞች

- **ስቲፐንድ**: በወር ~5,000 ሺ"ል (በሚና ይለያያል)
- **መኖሪያ**: የኪራይ ድጋፍ ወይም ጋራ መኖሪያ
- **የጥናት ስጦታ**: ከአገልግሎት በኋላ እስከ 5 ዓመታት ለከፍተኛ ትምህርት
- **የግብር ነፃነት**: ከመለቀቅ በኋላ የመጀመሪያ ሦስት የስራ ዓመታት
- **የተወከለ አገልግሎት** ለብሔራዊ ኢንሹራንስ + የሕዝብ-ዘርፍ ሚናዎች

## እንዴት መጀመር ይቻላል

1. **ምዝገባ**: በ [sherut-leumi.co.il](https://www.sherut-leumi.co.il)
2. **ሚና ይምረጡ**: የአጋር ድርጅቶች ዝርዝር — ENP፣ ጤና ብርሃት፣ ቴቤካ፣ ኦሊም በያሃድ ብዙዎቹ ናቸው
3. **ቃለ መጠይቅ**: ከአስተናጋጅ ድርጅት ጋር
4. **መጀመር**: አብዛኛውን ጊዜ የቀጣዩ ወር 1ኛ

**ለማህበረሰብ ወጣቶች ሀሳብ**: በ ENP/ፊደል/ጤና ብርሃት ማገልገል = ቀጥተኛ የማህበረሰብ ስራ + የሙያ ዕድገት።
`,
    },
  },

  // 16 — Hesegim scholarships
  {
    title: {
      he: "מלגות הסגים — מצוינות אקדמית",
      en: "Hesegim Scholarships — Academic Excellence",
      am: "የሄሰግም ስኮላርሺፕ — የአካዳሚክ ብቃት",
    },
    slug: {
      he: "hesegim-scholarships",
      en: "hesegim-scholarships",
      am: "hesegim-scholarships",
    },
    govUrl: "https://hesegim.org.il",
    eligibilitySummary: {
      he: "מלגות סטיפנדיה לסטודנטים יוצאי אתיופיה במגוון אוניברסיטאות, כולל ליווי אישי וסדנאות מצוינות. שונה ממלגות ISEF (תואר שני+) — Hesegim מתמקדת בתואר ראשון.",
      en: "Stipend scholarships for Ethiopian-Israeli undergraduate students at multiple universities, with personal mentoring and excellence workshops. Distinct from ISEF (graduate+) — Hesegim focuses on undergraduates.",
      am: "ለኢትዮጵያ-እስራኤላውያን ቅዳሜ ተማሪዎች በተለያዩ ዩኒቨርሲቲዎች የስቲፐንድ ስኮላርሺፕ፣ የግል አማካሪነት ጋር።",
    },
    tags: ["scholarship", "education", "student"],
    bodies: {
      he: `## מה כולל?

- **סטיפנדיה חודשית**: 1,500-3,000 ₪ (משתנה לפי שנה ומצב)
- **ליווי אישי**: רכז/ת מוצמד/ת לכל סטודנט/ית
- **סדנאות מצוינות**: כתיבה אקדמית, אנגלית, מנהיגות, יזמות
- **התקבעות בקריירה**: שיתופי-פעולה עם Olim Beyahad לאחרי התואר
- **רשת alumni**: 500+ בוגרים בתעשייה ואקדמיה

## תנאי כניסה

- סטודנט/ית פעיל/ה בתואר ראשון (לפני שנה 4)
- ממוצע ציונים תקין (לרוב 80+, בתחומים תחרותיים גבוה יותר)
- מצב סוציו-אקונומי שמצדיק
- מחויבות לשירות קהילתי במהלך התואר (5-10 שעות שבועיות)

## איך מגישים?

1. **באתר**: [hesegim.org.il](https://hesegim.org.il) → "מועמדות"
2. **טופס + מסמכים**: גליון ציונים, אישור סטודנט, מצב סוציו-אקונומי
3. **ראיון**: עם ועדת קבלה (~30 דק')
4. **תוצאות**: תוך 4-6 שבועות

**חשוב**: הגשה פתוחה רק פעם בשנה — בדוק תאריכים. לרוב מאי-יוני להלימה הבאה.
`,
      en: `## What's included

- **Monthly stipend**: ₪1,500-3,000 (varies by year and circumstances)
- **Personal mentor**: a coordinator assigned to each student
- **Excellence workshops**: academic writing, English, leadership, entrepreneurship
- **Career placement**: partnerships with Olim Beyahad post-graduation
- **Alumni network**: 500+ graduates in industry and academia

## Entry requirements

- Active undergraduate student (before year 4)
- Adequate GPA (typically 80+, higher in competitive fields)
- Socioeconomic status that justifies aid
- Community-service commitment during studies (5-10 hours weekly)

## How to apply

1. **Online**: [hesegim.org.il](https://hesegim.org.il) → "Candidacy"
2. **Form + documents**: transcript, student confirmation, socioeconomic data
3. **Interview**: with admissions committee (~30 min)
4. **Results**: within 4-6 weeks

**Important**: Applications open once a year — check dates. Usually May-June for the next academic year.
`,
      am: `## ምን ይካተታል

- **ወርሃዊ ስቲፐንድ**: ከ1,500-3,000 ሺ"ል (በዓመት እና በሁኔታ ይለያያል)
- **የግል አማካሪ**: ለእያንዳንዱ ተማሪ የተመደበ አስተባባሪ
- **የብቃት ወርክሾፖች**: የአካዳሚክ ጽሑፍ፣ እንግሊዝኛ፣ መሪነት፣ ስራ ፈጠራ
- **የሙያ ምደባ**: ከኦሊም በያሃድ ጋር ሽርክና
- **የተመራቂ አውታር**: በዘርፉ እና በአካዳሚ 500+ ተመራቂዎች

## የመግቢያ መስፈርቶች

- ንቁ ቅዳሜ ተማሪ (ከ4ኛ ዓመት በፊት)
- በቂ GPA (ብዙውን ጊዜ 80+)
- እርዳታ የሚያስፈልገው ማህበራዊ-ኢኮኖሚያዊ ሁኔታ
- በትምህርት ጊዜ ለማህበረሰብ አገልግሎት ቁርጠኝነት (በሳምንት ከ5-10 ሰዓት)

## እንዴት ማመልከት ይቻላል

1. **በመስመር ላይ**: [hesegim.org.il](https://hesegim.org.il)
2. **ቅጽ + ሰነዶች**: የድርሻ ሰነድ፣ የተማሪ ማረጋገጫ
3. **ቃለ መጠይቅ**: ከመግቢያ ኮሚቴ ጋር
4. **ውጤቶች**: በ4-6 ሳምንታት ውስጥ

**ጠቃሚ**: ማመልከቻ በዓመት አንድ ጊዜ ይከፈታል — ቀኖችን ይፈትሹ።
`,
    },
  },

  // 17 — Urban renewal — Kiryat Moshe (Rehovot priority neighborhood)
  {
    title: {
      he: "התחדשות עירונית — קריית משה (רחובות)",
      en: "Urban Renewal — Kiryat Moshe (Rehovot)",
      am: "የከተማ ዳግም-ግንባታ — ቂርያት ሞሼ (ረሆቮት)",
    },
    slug: {
      he: "urban-renewal-kiryat-moshe",
      en: "urban-renewal-kiryat-moshe",
      am: "urban-renewal-kiryat-moshe",
    },
    govUrl: "https://www.gov.il/he/departments/topics/urban_renewal",
    eligibilitySummary: {
      he: 'תוכנית התחדשות עירונית בקריית משה (רחובות) — אחד מ-5 השכונות בעדיפות עליונה לקהילה. דיירים מקבלים דירה חדשה תחת הסכם פינוי-בינוי או תמ"א 38.',
      en: "Urban renewal program in Kiryat Moshe (Rehovot) — one of 5 priority neighborhoods for the community. Residents receive a new apartment under evacuation-rebuild or TAMA 38 agreement.",
      am: "በቂርያት ሞሼ (ረሆቮት) የከተማ ዳግም-ግንባታ ፕሮግራም — ለማህበረሰብ ቅድሚያ ከሚሰጡ 5 ሰፈሮች አንዱ።",
    },
    tags: ["urban_renewal", "housing", "family"],
    bodies: {
      he: `## למי רלוונטי?

דיירים נוכחיים של דירות בקריית משה ברחובות (בעלי או שוכרים בנכס מוגן). אזור זה מסומן כעדיפות עליונה ב-2024 עם מינהלת התחדשות עירונית ייעודית עם מנדט גישור-תרבותי.

## מה כלול בתוכנית?

- **דירה חדשה במקום**: כפי שהייתה הקיימת + תוספת שטח (10-25% תלוי בפרויקט)
- **דמי שכירות זמני**: בזמן הבנייה (כ-2-3 שנים)
- **מס רכישה מופחת**: דירה חדשה — מס רכישה כדירה ראשונה
- **שמירה על הקהילה**: עיקרון מנחה — הדיירים חוזרים לאותה שכונה
- **שיפור בתשתיות**: דרכים, חינוך, רווחה — בתקציב נפרד

## מה לעשות עכשיו?

1. **בדיקת זכאות**: לבדוק במינהלת ההתחדשות (משרד הבינוי והשיכון)
2. **חתימה על הסכם**: רוב הדיירים בבניין צריכים לחתום (66%-80% תלוי בסוג ההסכם)
3. **הסכם משפטי**: עו"ד מטעם הדיירים (Tebeka יכולים לסייע)
4. **ועדה מקומית**: אישור התוכנית
5. **בנייה**: 2-3 שנים, חזרה לדירה חדשה

**שכונות נוספות בעדיפות**: רמת אליהו (ראשון לציון), דורה=רמת ידין / נאות שקד / קריית נורדאו (נתניה).

⚠️ **לפני חתימה**: התייעץ עם עו"ד עצמאי. יש מקרים של חוזים פוגעניים.
`,
      en: `## Who is eligible?

Current residents of apartments in Kiryat Moshe, Rehovot (owners or protected tenants). This area is marked top-priority in 2024 with a dedicated urban-renewal administration with a cultural-bridge mandate.

## What's included

- **New apartment in place**: same size as existing + extra area (10-25% depending on project)
- **Temporary rent**: during construction (~2-3 years)
- **Reduced purchase tax**: new apartment treated as first-home for tax
- **Community preservation**: guiding principle — residents return to the same neighborhood
- **Infrastructure upgrades**: roads, education, welfare — under separate budget

## What to do now

1. **Eligibility check**: with the urban-renewal admin (Ministry of Construction)
2. **Sign agreement**: most building residents must sign (66%-80% depending on agreement type)
3. **Legal agreement**: independent attorney for residents (Tebeka can assist)
4. **Local committee**: approves the plan
5. **Construction**: 2-3 years, return to new apartment

**Other priority neighborhoods**: Ramat Eliyahu (Rishon LeZion), Dora=Ramat Yadin / Neot Shaked / Kiryat Nordau (Netanya).

⚠️ **Before signing**: consult an independent attorney. There are cases of unfair contracts.
`,
      am: `## ለማን ይተገበራል?

በቂርያት ሞሼ ረሆቮት የአፓርትመንቶች የአሁን ነዋሪዎች (ባለቤቶች ወይም የተጠበቁ ተከራዮች)። ይህ አካባቢ በ2024 ቅድሚያ ተብሎ ምልክት ተሰጥቷል።

## ምን ይካተታል

- **አዲስ አፓርትመንት በቦታው**: ከነበረው ጋር አንድ ዓይነት + ተጨማሪ ስፋት (10-25%)
- **ጊዜያዊ ኪራይ**: በግንባታ ጊዜ (~2-3 ዓመታት)
- **የተቀነሰ የግዢ ግብር**: አዲሱ አፓርትመንት እንደ መጀመሪያ-ቤት ይታያል
- **የማህበረሰብ ጥበቃ**: መሪ መርህ — ነዋሪዎች ወደ ተመሳሳይ ሰፈር ይመለሳሉ
- **የመሰረተ ልማት ማሻሻያ**: መንገዶች፣ ትምህርት፣ ደህንነት

## አሁን ምን ማድረግ አለብዎ

1. **የብቁነት ምርመራ**: በከተማ ዳግም-ግንባታ አስተዳደር
2. **ስምምነት መፈረም**: አብዛኛዎቹ የህንፃ ነዋሪዎች መፈረም አለባቸው (66%-80%)
3. **ሕጋዊ ስምምነት**: ለነዋሪዎች ራሱን የቻለ ጠበቃ (ቴቤካ ሊረዳ ይችላል)
4. **የአካባቢ ኮሚቴ**: እቅዱን ያጸድቃል
5. **ግንባታ**: ከ2-3 ዓመታት፣ ወደ አዲስ አፓርትመንት መመለስ

**ሌሎች ቅድሚያ ሰፈሮች**: ራማት ኤሊያሁ (ሪሾን ለጽዮን)፣ ዶራ=ራማት ያዲን / ኖት ሻከድ / ቂርያት ኖርዳው (ነታንያ)።

⚠️ **ከመፈረም በፊት**: ራሱን የቻለ ጠበቃ ያማክሩ።
`,
    },
  },

  // 18 — "Aharai!" pre-army leadership program
  {
    title: {
      he: "אחריי! — תכנית מנהיגות וקדם-צבא",
      en: "Aharai! — Pre-Army Leadership Program",
      am: "Aharai! — የቅድመ-ሰራዊት የመሪነት ፕሮግራም",
    },
    slug: { he: "aharai-pre-army", en: "aharai-pre-army", am: "aharai-pre-army" },
    govUrl: "https://aharai.org.il",
    eligibilitySummary: {
      he: "תכנית מנהיגות לבני נוער 14-19 לפני גיוס. מקנה כלים לחיים, מסלול תעסוקה, ולקראת תפקיד צבאי ראוי. שיתוף פעולה הדוק עם הקהילה האתיופית-ישראלית.",
      en: "Leadership program for youth 14-19 pre-draft. Provides life skills, career path, and aim toward a worthy military role. Strong collaboration with the Ethiopian-Israeli community.",
      am: "ለ14-19 ዓመት ወጣቶች ከሰራዊት በፊት የመሪነት ፕሮግራም። የሕይወት ክህሎቶችን፣ የሙያ መንገድ ይሰጣል።",
    },
    tags: ["youth", "mentorship", "civic_service"],
    bodies: {
      he: `## מה כוללת התכנית?

- **סדנאות שבועיות**: שיח קבוצתי, מנהיגות, ערכים, תכנון עתיד
- **מסלולי קצונה**: הכנה לקצונה צבאית — מבחנים, ראיון, פסיכוטכני
- **מסלולי קריירה**: התאמה לתפקידים בצה"ל לפי כישרון (טכנולוגיה, מודיעין, פיקוד)
- **מנטור אישי**: כל חניך/ה מוצמד/ת למלווה אישי לכל התהליך
- **קהילה**: שייכות לקבוצה רב-עירונית של נוער מובילה

## למי מיועד?

- בני נוער **14-19** (בית ספר תיכון, ובחלק מהתכניות 12 ומעלה)
- מוטיבציה לתרום (לא דורש מצוינות אקדמית)
- אתגר קהילתי — מי שמתעניין במנהיגות בקרב הקהילה במקביל לצה"ל

## איך מצטרפים?

1. **רישום**: [aharai.org.il](https://aharai.org.il) → "הצטרף"
2. **ראיון אישי**: + קבוצתי
3. **תקופת ניסיון**: 1-2 חודשים
4. **השתתפות**: בדרך כלל 1-2 פעמים בשבוע + סופ"ש לפעילויות מיוחדות

**ערך מוסף**: רשת alumni של מפקדים, אנשי הייטק, ופעילים חברתיים. קישור משמעותי בקהילה.
`,
      en: `## What the program includes

- **Weekly workshops**: group dialogue, leadership, values, future planning
- **Officer tracks**: prep for IDF officer school — exams, interviews, psycho-technical
- **Career paths**: matching to IDF roles by talent (tech, intelligence, command)
- **Personal mentor**: each participant assigned a personal mentor for the whole process
- **Community**: belonging to a multi-city group of leading youth

## Who is eligible?

- Youth **14-19** (high school, in some tracks ages 12+)
- Motivation to contribute (academic excellence not required)
- Community-engaged — interested in leadership within the community alongside IDF

## How to join

1. **Registration**: [aharai.org.il](https://aharai.org.il) → "Join"
2. **Interview**: personal + group
3. **Trial period**: 1-2 months
4. **Participation**: usually 1-2 times per week + weekend events

**Bonus value**: alumni network of commanders, tech professionals, and social activists. Meaningful community connections.
`,
      am: `## ፕሮግራሙ የሚያካትተው

- **ሳምንታዊ ወርክሾፖች**: የቡድን ውይይት፣ መሪነት፣ እሴቶች፣ የወደፊት እቅድ
- **የመኮንን መንገዶች**: ለ IDF ኦፊሰር ት/ቤት ዝግጅት — ፈተናዎች፣ ቃለ መጠይቆች
- **የሙያ መንገዶች**: በተሰጥኦ ለ IDF ሚናዎች ማዛመድ
- **የግል አማካሪ**: ለእያንዳንዱ ተሳታፊ የተመደበ የግል አማካሪ
- **ማህበረሰብ**: በብዙ ከተሞች የሚገኙ መሪ ወጣቶች ቡድን አባልነት

## ለማን ይሆናል?

- **14-19** ዓመት ወጣቶች
- ለመስጠት ተነሳሽነት (የአካዳሚክ ብቃት አያስፈልግም)
- ለማህበረሰብ ተሰጥቷል — ከ IDF ጋር ባለ መሪነት

## እንዴት መቀላቀል ይቻላል

1. **ምዝገባ**: [aharai.org.il](https://aharai.org.il)
2. **ቃለ መጠይቅ**: የግል + ቡድን
3. **የሙከራ ጊዜ**: 1-2 ወራት
4. **ተሳትፎ**: በሳምንት 1-2 ጊዜ + የሳምንት መጨረሻ ዝግጅቶች

**የተጨማሪ እሴት**: የመኮንኖች፣ የቴክ ባለሙያዎች እና የማህበራዊ ተግባር-ፈጻሚዎች የተመራቂ አውታር።
`,
    },
  },

  // 19 — Matriculation grant for HS students
  {
    title: {
      he: "מענק בגרות לתלמידי תיכון יוצאי אתיופיה",
      en: "Matriculation Grant for Ethiopian-Israeli HS Students",
      am: "ለኢትዮጵያ-እስራኤላውያን የሁለተኛ ደረጃ ተማሪዎች የማትሪክ ስጦታ",
    },
    slug: {
      he: "matriculation-grant",
      en: "matriculation-grant",
      am: "matriculation-grant",
    },
    govUrl: "https://www.enp.org.il/he/",
    eligibilitySummary: {
      he: "תוספת תקציבית לתיכוניסטים לקראת בגרות. כיסוי שיעורי תגבור, אגרות בחינה, וציוד לימודי. זמין דרך ENP בבתי ספר ב-32 ערים.",
      en: "Budget supplement for HS students preparing for matriculation. Covers tutoring, exam fees, and study materials. Available via ENP in schools across 32 cities.",
      am: "ለማትሪክ ለሚዘጋጁ የሁለተኛ ደረጃ ተማሪዎች የበጀት ማሟያ።",
    },
    tags: ["matriculation", "education", "scholarship"],
    bodies: {
      he: `## למי מיועד?

תלמידי תיכון בכיתות י-יב יוצאי אתיופיה הלומדים בבתי ספר משתתפים בתכנית ENP (32 ערים, כולל נתניה, ראשון, רחובות, באר שבע).

## מה כולל?

- כיסוי שיעורי תגבור (מתמטיקה, אנגלית, מקצועות מורחבים)
- אגרות בחינות בגרות
- ספרים וציוד לימודי
- מנטור אישי מהקהילה
- סדנאות הכנה לבגרות

## איך מגישים?

1. דבר עם **יועץ.ת בית הספר** — לבדוק אם הוא משתתף ב-ENP
2. אם כן — מילוי טופס ENP (דרך בית הספר)
3. אישור תוך 4 שבועות
4. מתחילים לקבל סיוע מיד

🔗 [enp.org.il](https://www.enp.org.il/he/)
`,
      en: `## Who is eligible?

Ethiopian-Israeli high-school students in grades 10-12 attending schools participating in ENP (32 cities, including Netanya, Rishon, Rehovot, Be'er Sheva).

## What's included?

- Tutoring (math, English, advanced subjects)
- Matriculation exam fees
- Books and study materials
- Personal community mentor
- Matriculation prep workshops

## How to apply

1. Talk to **school counselor** — check if school participates in ENP
2. If yes — fill out ENP form (via school)
3. Approval within 4 weeks
4. Aid begins immediately

🔗 [enp.org.il](https://www.enp.org.il/he/)
`,
      am: `## ለማን ይሆናል?

በ ENP በተሳተፉ ት/ቤቶች የሚማሩ የ10-12ኛ ክፍል የኢትዮጵያ-እስራኤላውያን ተማሪዎች።

## ምን ይካተታል?

- ተጨማሪ ትምህርት (ሒሳብ፣ እንግሊዝኛ፣ ከፍተኛ ርዕሰ ጉዳዮች)
- የማትሪክ ፈተና ክፍያዎች
- መጻሕፍት እና የጥናት መሳሪያዎች
- የግል የማህበረሰብ አማካሪ
- የማትሪክ ዝግጅት ወርክሾፖች

## እንዴት ማመልከት ይቻላል

1. ለ**ት/ቤት አማካሪ** ይነጋገሩ
2. ት/ቤቱ በ ENP ከሆነ — ቅጹን ይሙሉ
3. በ4 ሳምንታት ውስጥ ይጸድቃል

🔗 [enp.org.il](https://www.enp.org.il/he/)
`,
    },
  },

  // 20 — Tech-Career bootcamp (separate from Olim Beyahad excellence track)
  {
    title: {
      he: "Tech-Career — Bootcamp הייטק חינם",
      en: "Tech-Career — Free Tech Bootcamp",
      am: "Tech-Career — ነፃ የቴክ ቡት ካምፕ",
    },
    slug: {
      he: "tech-career-bootcamp",
      en: "tech-career-bootcamp",
      am: "tech-career-bootcamp",
    },
    govUrl: "https://www.tech-career.org/",
    eligibilitySummary: {
      he: "Bootcamp ל-cybersecurity, data, ופיתוח, חינם, 6-12 חודשים. 80%+ השמה. אלטרנטיבה למסלול אקדמי.",
      en: "Bootcamp in cybersecurity, data, and development. Free, 6-12 months. 80%+ placement. An alternative to the academic track.",
      am: "በሳይበርሰኩሪቲ፣ ዳታ እና ዴቭሎፕመንት ቡት ካምፕ። ነፃ፣ ከ6-12 ወራት።",
    },
    tags: ["bootcamp", "tech", "employment"],
    bodies: {
      he: `## תכניות זמינות

- **Cybersecurity** (12 חודשים): SOC analyst, ethical hacking, GRC
- **Data** (10 חודשים): Data Analyst, Data Engineer
- **Full-Stack Developer** (6 חודשים): React, Node, PostgreSQL
- **Product/UX** (4 חודשים): קצר, להחלפת תפקיד

## תנאי כניסה

- בגרות מלאה
- אנגלית טובה (לא שפת אם)
- מבחני קבלה: לוגיקה + מוטיבציה + ראיון
- בלי דרישה לתואר

## ערך מוסף

- חיבור ל-650+ חברות הייטק שותפות
- מנטור צמוד לאחר סיום
- רשת alumni של 1,200+ בוגרים
- חינם — ללא שכר לימוד

## איך מתחילים?

1. הרשמה ב-[tech-career.org](https://www.tech-career.org/)
2. מבחני קבלה (יום או יומיים)
3. ראיון אישי
4. תחילת קוהורט הקרוב (כל 3-4 חודשים)
`,
      en: `## Available tracks

- **Cybersecurity** (12 months): SOC analyst, ethical hacking, GRC
- **Data** (10 months): Data Analyst, Data Engineer
- **Full-Stack Developer** (6 months): React, Node, PostgreSQL
- **Product/UX** (4 months): short, role-switch focused

## Entry requirements

- Full matriculation
- Good English (not native)
- Entrance exams: logic + motivation + interview
- No degree required

## Bonus value

- Connection to 650+ partner tech companies
- Mentor through post-graduation
- 1,200+ alumni network
- Free — no tuition

## How to start

1. Register at [tech-career.org](https://www.tech-career.org/)
2. Entrance exams (1-2 days)
3. Personal interview
4. Start of next cohort (every 3-4 months)
`,
      am: `## ያሉ መንገዶች

- **ሳይበርሰኩሪቲ** (12 ወራት)
- **ዳታ** (10 ወራት)
- **ሙሉ-ስታክ ዴቨሎፐር** (6 ወራት)
- **ምርት/UX** (4 ወራት)

## የመግቢያ መስፈርቶች

- ሙሉ ማትሪክ
- ጥሩ እንግሊዝኛ
- የመግቢያ ፈተናዎች
- ዲግሪ አያስፈልግም

## የተጨማሪ እሴት

- ከ650+ የቴክ ኩባንያዎች ጋር ግንኙነት
- ከትምህርት በኋላ አማካሪ
- 1,200+ ተመራቂዎች
- ነፃ — የትምህርት ክፍያ የለም

## እንዴት መጀመር ይቻላል

1. በ [tech-career.org](https://www.tech-career.org/) ይመዝገቡ
2. የመግቢያ ፈተናዎች
3. ቃለ መጠይቅ
4. የቀጣይ ቡድን መጀመሪያ
`,
    },
  },

  // 21 — Urban renewal Ramat Eliyahu (Rishon LeZion)
  {
    title: {
      he: "התחדשות עירונית — רמת אליהו (ראשון לציון)",
      en: "Urban Renewal — Ramat Eliyahu (Rishon LeZion)",
      am: "የከተማ ዳግም-ግንባታ — ራማት ኤሊያሁ (ሪሾን ለጽዮን)",
    },
    slug: {
      he: "urban-renewal-ramat-eliyahu",
      en: "urban-renewal-ramat-eliyahu",
      am: "urban-renewal-ramat-eliyahu",
    },
    govUrl: "https://www.gov.il/he/departments/topics/urban_renewal",
    eligibilitySummary: {
      he: "תכנית פינוי-בינוי בשכונת רמת אליהו (ראשון לציון) — אחת מ-5 השכונות בעדיפות עליונה לקהילה האתיופית. דיירים מקבלים דירה חדשה תחת ההסכם.",
      en: "Evacuation-rebuild program in Ramat Eliyahu (Rishon LeZion) — one of 5 priority neighborhoods for the Ethiopian community. Residents receive a new apartment.",
      am: "የመፈናቀል-መልሶ ግንባታ ፕሮግራም በራማት ኤሊያሁ (ሪሾን ለጽዮን) — ለማህበረሰቡ ቅድሚያ የተሰጡ 5 ሰፈሮች አንዱ።",
    },
    tags: ["urban_renewal", "housing", "family"],
    bodies: {
      he: `## למי רלוונטי?

דיירים נוכחיים של בניינים ברמת אליהו, ראשון לציון. השכונה סומנה ב-2024 כ-priority neighborhood עם מנהלת ייעודית ומנדט גישור-תרבותי לקהילה.

## מה כלול?

- דירה חדשה במיקום (לרוב מורחבת ב-15-25%)
- שכר דירה זמני בזמן הבנייה (~30 חודשים)
- מס רכישה כדירה ראשונה
- שיפור תשתיות שכונתי בנפרד

## תהליך

1. בדיקת זכאות במנהלת
2. חתימה על הסכם דיירים (66%-80% מהדיירים בבניין)
3. עו"ד מטעם דיירים (Tebeka יכול לסייע במשפט)
4. ועדה מקומית מאשרת
5. בנייה 2-3 שנים → חזרה

⚠️ **התייעצו עם עו"ד עצמאי** לפני חתימה.

📞 **מנהלת התחדשות ראשון**: עירייה 9740-040
`,
      en: `## Who is eligible?

Current residents of buildings in Ramat Eliyahu, Rishon LeZion. The neighborhood was marked priority in 2024 with a dedicated administration and community-bridge mandate.

## What's included

- New apartment in place (typically 15-25% larger)
- Temporary rent during construction (~30 months)
- Purchase tax treated as first-home
- Separate budget for neighborhood infrastructure

## Process

1. Eligibility check at the administration
2. Sign resident agreement (66%-80% of building residents)
3. Independent attorney for residents (Tebeka can assist)
4. Local committee approves
5. Construction 2-3 years → return

⚠️ **Consult independent attorney** before signing.
`,
      am: `## ለማን ይተገበራል?

በራማት ኤሊያሁ ሪሾን ለጽዮን ህንጻዎች የአሁን ነዋሪዎች።

## ምን ይካተታል

- አዲስ አፓርትመንት (ብዙውን ጊዜ 15-25% ትልቅ)
- በግንባታ ጊዜ ጊዜያዊ ኪራይ (~30 ወራት)
- እንደ መጀመሪያ-ቤት የግዢ ግብር
- ለሰፈር መሰረተ ልማት የተለየ በጀት

## ሂደት

1. የብቁነት ምርመራ
2. የነዋሪ ስምምነት መፈረም
3. ለነዋሪዎች ራሱን የቻለ ጠበቃ
4. የአካባቢ ኮሚቴ ያጸድቃል
5. 2-3 ዓመታት ግንባታ → መመለስ

⚠️ **ራሱን የቻለ ጠበቃ** ከመፈረም በፊት ያማክሩ።
`,
    },
  },

  // 22 — Urban renewal Netanya (Dora area)
  {
    title: {
      he: "התחדשות עירונית — נתניה (דורה / רמת ידין / נאות שקד)",
      en: "Urban Renewal — Netanya (Dora / Ramat Yadin / Neot Shaked)",
      am: "የከተማ ዳግም-ግንባታ — ነታንያ (ዶራ / ራማት ያዲን / ኖት ሻከድ)",
    },
    slug: {
      he: "urban-renewal-netanya",
      en: "urban-renewal-netanya",
      am: "urban-renewal-netanya",
    },
    govUrl: "https://www.gov.il/he/departments/topics/urban_renewal",
    eligibilitySummary: {
      he: "פינוי-בינוי בשלוש שכונות בנתניה: דורה (=רמת ידין), נאות שקד, וקריית נורדאו. אזורים בעדיפות עליונה. נתניה היא העיר עם הקהילה הוותיקה הגדולה ביותר.",
      en: "Evacuation-rebuild in three Netanya neighborhoods: Dora (=Ramat Yadin), Neot Shaked, and Kiryat Nordau. Priority areas. Netanya hosts the largest veteran Ethiopian community.",
      am: "በሦስት የነታንያ ሰፈሮች የመፈናቀል-መልሶ ግንባታ።",
    },
    tags: ["urban_renewal", "housing", "family"],
    bodies: {
      he: `## למי רלוונטי?

דיירי דורה (נקראת גם רמת ידין), נאות שקד, וקריית נורדאו בנתניה. נתניה היא העיר עם הקהילה האתיופית הגדולה ביותר בישראל (35,000+).

## מה ייחודי בנתניה?

- 3 שכונות במקביל = pipeline ארוך טווח (10+ שנים)
- מועצת קהילה ייעודית ב-עירייה
- שותפויות עם Tene Briut + ENP לליווי תושבים
- משקל גבוה לשמירה על הרכב הקהילתי בשכונה

## הליך

1. **שיחה ראשונית** עם מנהלת ההתחדשות (עיריית נתניה)
2. **התארגנות בניין**: 66-80% מהדיירים מסכימים
3. **חוזה משפטי**: עו"ד עצמאי חובה (לא יזם!)
4. **תקופת בנייה**: 2-3 שנים, שכר דירה זמני
5. **חזרה**: דירה גדולה ב-15-30%

🚨 **דרישה קריטית**: לוודא שהחוזה כולל ערבות בנקאית ל-5 שנים אחרי החזרה.

📞 **מנהלת התחדשות נתניה**: 09-8603333
`,
      en: `## Who is eligible?

Residents of Dora (=Ramat Yadin), Neot Shaked, and Kiryat Nordau in Netanya. Netanya hosts the largest Ethiopian community in Israel (35,000+).

## What's unique about Netanya?

- 3 neighborhoods in parallel = long pipeline (10+ years)
- Dedicated community council in the municipality
- Partnerships with Tene Briut + ENP for resident accompaniment
- High weight given to preserving community composition

## Process

1. **Initial conversation** with renewal administration (Netanya municipality)
2. **Building organization**: 66-80% of residents agree
3. **Legal contract**: independent attorney mandatory (NOT developer's!)
4. **Construction**: 2-3 years, temporary rent
5. **Return**: 15-30% larger apartment

🚨 **Critical requirement**: ensure contract includes 5-year bank guarantee after return.

📞 **Netanya renewal admin**: 09-8603333
`,
      am: `## ለማን ይተገበራል?

በነታንያ ዶራ (ራማት ያዲን ተብሎም ይጠራል)፣ ኖት ሻከድ እና ቂርያት ኖርዳው ነዋሪዎች። ነታንያ በእስራኤል ትልቁን የኢትዮጵያ ማህበረሰብ ይዛለች።

## ሂደት

1. ከእድሳት አስተዳደር ጋር መነጋገር
2. የህንጻ ድርጅት
3. ሕጋዊ ኮንትራት — ራሱን የቻለ ጠበቃ ግዴታ
4. 2-3 ዓመታት ግንባታ
5. መመለስ — ከ15-30% ትልቅ አፓርትመንት

🚨 **ወሳኝ መስፈርት**: ኮንትራቱ ከተመለሰ በኋላ ለ5 ዓመታት የባንክ ዋስትና ማካተቱን ያረጋግጡ።

📞 **የነታንያ የእድሳት አስተዳደር**: 09-8603333
`,
    },
  },

  // 23 — Chronic disease prevention (Tene Briut)
  {
    title: {
      he: "מניעת מחלות כרוניות — טנא בריאות",
      en: "Chronic Disease Prevention — Tene Briut",
      am: "ሥር የሰደደ በሽታ መከላከል — ጤና ብርሃት",
    },
    slug: {
      he: "chronic-disease-prevention",
      en: "chronic-disease-prevention",
      am: "chronic-disease-prevention",
    },
    govUrl: "https://tene-briut.org.il",
    eligibilitySummary: {
      he: "תכניות מניעה לסוכרת, יתר לחץ דם, ומחלות לב — מותאמות תרבותית לקהילה. סדנאות בעברית/אמהרית, ליווי דיאטטי, ומדריכי ספורט. דרך טנא בריאות.",
      en: "Prevention programs for diabetes, hypertension, and heart disease — culturally adapted for the community. Hebrew/Amharic workshops, dietary guidance, exercise instructors. Via Tene Briut.",
      am: "ለስኳር በሽታ፣ ለደም ግፊት እና ለልብ በሽታ የመከላከያ ፕሮግራሞች — ለማህበረሰቡ በተስማማ ሁኔታ።",
    },
    tags: ["chronic_disease", "health", "anchor_partner"],
    bodies: {
      he: `## למי מיועד?

- בני קהילה בני 40+ עם גורמי סיכון (משפחה, BMI, אורח חיים)
- חולים סוכרת או יתר לחץ דם — ליווי קבוע
- בני נוער במשפחות עם היסטוריה מחלתית

## מה כולל?

- **סדנאות תזונה**: דובר אמהרית, דגש על מאכלי קהילה (אינג'רה, ברברה, מתבחה)
- **תכנית הליכה קהילתית**: 3 פעמים שבוע, חינם
- **בדיקות סקר**: שטח קהילתי, חינם
- **ייעוץ דיאטטי אישי**: לחולים מאובחנים
- **קבוצות תמיכה**: לחולים במחלות כרוניות

## איך מצטרפים?

1. **טלפון**: 03-7383937 (אמהרית/עברית)
2. **דרך קופ"ח**: בקש "תכנית מניעה דובר אמהרית" — Tene Briut מספקת
3. **דרך מרפאה ביישוב**: בקש פנייה (סניפים בנתניה, רחובות, ראשון, ב"ש)
4. **באתר**: [tene-briut.org.il](https://tene-briut.org.il)

**עלות**: חינם או סמלי (5-30 ₪ לסדנה).
`,
      en: `## Who is eligible?

- Community members 40+ with risk factors (family, BMI, lifestyle)
- Patients with diabetes or hypertension — ongoing support
- Youth in families with disease history

## What's included?

- **Nutrition workshops**: Amharic-speaking, focused on community foods (injera, berbere, mitmita)
- **Community walking program**: 3x/week, free
- **Screening tests**: in community settings, free
- **Personal dietary counseling**: for diagnosed patients
- **Support groups**: for those with chronic conditions

## How to join

1. **Phone**: 03-7383937 (Amharic/Hebrew)
2. **Via HMO**: ask for "Amharic-speaking prevention program" — Tene Briut provides
3. **Via local clinic**: branches in Netanya, Rehovot, Rishon, Be'er Sheva
4. **Online**: [tene-briut.org.il](https://tene-briut.org.il)

**Cost**: free or symbolic (₪5-30 per workshop).
`,
      am: `## ለማን ይሆናል?

- 40+ ዕድሜ ያላቸው የማህበረሰብ አባላት
- የስኳር በሽታ ወይም የደም ግፊት ታካሚዎች
- የበሽታ ታሪክ ባለ ቤተሰቦች ውስጥ ያሉ ወጣቶች

## ምን ይካተታል?

- **የአመጋገብ ወርክሾፖች**: በአማርኛ
- **የማህበረሰብ የእግር ጉዞ ፕሮግራም**: በሳምንት 3 ጊዜ
- **የመጥላት ምርመራዎች**: በማህበረሰብ ቦታዎች፣ ነፃ
- **የግል የአመጋገብ ምክር**
- **የድጋፍ ቡድኖች**

## እንዴት መቀላቀል ይቻላል

1. **ስልክ**: 03-7383937 (አማርኛ/ዕብራይስጥ)
2. **በሕክምና ድርጅት በኩል**: "የአማርኛ ተናጋሪ የመከላከያ ፕሮግራም" ይጠይቁ
3. **በአካባቢ ክሊኒክ በኩል**: ቅርንጫፎች ያሉበት
4. **በመስመር**: [tene-briut.org.il](https://tene-briut.org.il)

**ወጪ**: ነፃ ወይም ምልክት ('ሺ"ል 5-30 በወርክሾፕ).
`,
    },
  },

  // 24 — Medical translation services
  {
    title: {
      he: "שירותי תרגום רפואי דובר אמהרית",
      en: "Amharic Medical Translation Services",
      am: "የአማርኛ የሕክምና ትርጉም አገልግሎቶች",
    },
    slug: {
      he: "medical-translation",
      en: "medical-translation",
      am: "medical-translation",
    },
    govUrl: "https://tene-briut.org.il",
    eligibilitySummary: {
      he: "מתורגמנים ומגשרי תרבות דוברי אמהרית בקופות חולים, בתי חולים, ומרפאות יועצים. חינם — שירות מובטח לפי חוק זכויות החולה.",
      en: "Amharic-speaking translators and cultural mediators at HMOs, hospitals, and specialist clinics. Free — guaranteed under the Patient Rights Law.",
      am: "በሕክምና ድርጅቶች፣ ሆስፒታሎች እና በልዩ ክሊኒኮች የአማርኛ ተናጋሪ ተርጓሚዎች።",
    },
    tags: ["translation", "health", "anchor_partner"],
    bodies: {
      he: `## למי מיועד?

כל מטופל/ת דובר אמהרית — בעיקר בני המעמד הוותיק (גיל 50+). השירות זמין גם לבני המשפחה המתלוונים.

## מה זמין?

- **מתורגמנים בקופות חולים**: כללית, מכבי, מאוחדת, לאומית
- **בבתי חולים**: רמב"ם, סורוקה, איכילוב, רבין, וולפסון
- **מומחים מתמחים**: גסטרו, סוכרת, נשים, נפש
- **שירות 24/7 דיגיטלי**: שיחת וידאו עם מתורגמן (Tene Briut + Manarah)

## איך מבקשים?

1. **בקופ"ח**: בעת קביעת תור — בקש "מתורגמן לאמהרית"
2. **בבית חולים**: בעת קבלה — דרוש מגשר תרבות
3. **ב-ER**: זכות מיידית
4. **בטלמדיסין**: באפליקציית קופ"ח, סנן "אמהרית"

🚨 **חוק זכויות החולה (סעיף 13)**: זכותך הבסיסית. אם דחו — פנה ל-Tebeka או למשרד הבריאות.
`,
      en: `## Who is eligible?

Any Amharic-speaking patient — primarily veteran community members (age 50+). The service is also available to accompanying family members.

## What's available?

- **Translators at HMOs**: Clalit, Maccabi, Meuhedet, Leumit
- **At hospitals**: Rambam, Soroka, Ichilov, Rabin, Wolfson
- **Specialist clinics**: gastro, diabetes, OB-GYN, mental health
- **24/7 digital service**: video call with translator (Tene Briut + Manarah)

## How to request

1. **At HMO**: when booking — request "Amharic translator"
2. **At hospital**: at admission — demand a cultural mediator
3. **In ER**: an immediate right
4. **In telemedicine**: in HMO app, filter "Amharic"

🚨 **Patient Rights Law (§13)**: this is a basic right. If denied — contact Tebeka or Ministry of Health.
`,
      am: `## ለማን ይሆናል?

ማንኛውም የአማርኛ ተናጋሪ ታካሚ — በዋናነት ቀደምት ማህበረሰብ አባላት (50+ ዕድሜ)።

## ያለ ምንድን ነው?

- **በሕክምና ድርጅቶች ተርጓሚዎች**
- **በሆስፒታሎች**
- **የልዩ ባለሙያ ክሊኒኮች**
- **24/7 ዲጂታል አገልግሎት**: ከተርጓሚ ጋር የቪዲዮ ጥሪ

## እንዴት መጠየቅ ይቻላል

1. **በሕክምና ድርጅት**: ቀጠሮ ሲይዙ — "የአማርኛ ተርጓሚ" ይጠይቁ
2. **በሆስፒታል**: ሲቀበሉ — የባህል አስታራቂ ይጠይቁ
3. **በ ER**: ወዲያውኑ መብት
4. **በቴሌሕክምና**: በሕክምና ድርጅት መተግበሪያ "አማርኛ" ያጣሩ

🚨 **የታካሚ መብቶች ሕግ (§13)**: ይህ መሰረታዊ መብት ነው።
`,
    },
  },

  // 25 — Kessim community religious support
  {
    title: {
      he: "תמיכה בקהילות דתיות — קייסים",
      en: "Religious Community Support — Kessim",
      am: "የሃይማኖት ማህበረሰብ ድጋፍ — ቄሶች",
    },
    slug: {
      he: "kessim-religious-support",
      en: "kessim-religious-support",
      am: "kessim-religious-support",
    },
    govUrl: "https://www.gov.il/he/departments/ministry_of_religious_services",
    eligibilitySummary: {
      he: 'קייסים — מנהיגי דת ביתא ישראל הוכרו רשמית ב-2018. שני בתי מדרש (אשקלון, ב"ש). תמיכה ממשלתית למימון פעילות, חופות, וטקסי חיים.',
      en: "Kessim — Beta Israel religious leaders, officially recognized in 2018. Two seminaries (Ashkelon, Be'er Sheva). Government support for activities, weddings, and life-cycle ceremonies.",
      am: "ቄሶች — የቤታ እስራኤል ሃይማኖት መሪዎች በ2018 በይፋ ታውቀዋል። ሁለት የሃይማኖት ት/ቤቶች (አሽከሎን፣ ቤር ሼቫ)።",
    },
    tags: ["religion", "heritage", "community"],
    bodies: {
      he: `## מי הם הקייסים?

מנהיגי דת ביתא ישראל. בעלי סמכות בטקסי חיים: ברית, חופה, אבל. הוכרו רשמית ב-2018 ע"י משרד הדתות. שני בתי מדרש פעילים.

## מה כלול?

- **שירותי דת**: חופה, ברית, פדיון הבן, אבל — דרך קייס מקומי
- **טקסי חיים**: סיגד (29 חשוון), דקס (יום אבל קהילתי)
- **תמיכה לקייסים**: שכר חודשי ממשרד הדתות, ביטוח, פנסיה
- **שני בתי מדרש**: אשקלון (לימוד מסורת ביתא ישראל) + ב"ש (השכלה רבנית)

## איך מוצאים קייס?

1. **מועצת הקייסים**: רכזות אזוריות (נתניה, ראשון, ב"ש, אשדוד, רחובות)
2. **בית הכנסת הקהילתי**: ברוב הערים יש מבנה ייעודי
3. **דרך IAEJ**: רשימת קייסים פעילים
4. **לטקס פרטי**: הזמנה דרך תמ"ת (תיאום מוסדי) או מועצה דתית מקומית

📞 **מועצה דתית — אגף הקייסים**: 02-5311111
`,
      en: `## Who are the Kessim?

Beta Israel religious leaders. Authorized to officiate life-cycle ceremonies: brit milah, wedding, mourning. Officially recognized in 2018 by the Ministry of Religious Services. Two active seminaries.

## What's included?

- **Religious services**: weddings, brit, redemption-of-firstborn, mourning — via local kes
- **Life-cycle ceremonies**: Sigd (29 Cheshvan), Dakas (community memorial day)
- **Kessim support**: monthly salary from Ministry of Religious Services, insurance, pension
- **Two seminaries**: Ashkelon (Beta Israel tradition) + Be'er Sheva (rabbinical education)

## Finding a Kes

1. **Council of Kessim**: regional coordinators (Netanya, Rishon, Be'er Sheva, Ashdod, Rehovot)
2. **Community synagogue**: most cities have a dedicated building
3. **Via IAEJ**: list of active kessim
4. **For private ceremonies**: book via local religious council

📞 **Religious Council — Kessim Division**: 02-5311111
`,
      am: `## ቄሶች ማን ናቸው?

የቤታ እስራኤል የሃይማኖት መሪዎች። ለሕይወት ስነ ስርዓቶች ስልጣን ያላቸው፦ ብርየት ሚላ፣ ሠርግ፣ ሐዘን። በ2018 በይፋ የተወከሉ።

## ምን ይካተታል?

- **የሃይማኖት አገልግሎቶች**: ሠርግ፣ ብርየት፣ የበኩር መግዛት፣ ሐዘን
- **የሕይወት ስነ ስርዓቶች**: ሲግድ (29 ቸሽቫን)፣ ዳካስ
- **ለቄሶች ድጋፍ**: ወርሃዊ ደመወዝ፣ ኢንሹራንስ፣ ጡረታ
- **ሁለት የሃይማኖት ት/ቤቶች**: አሽከሎን + ቤር ሼቫ

## ቄስ እንዴት ማግኘት ይቻላል

1. **የቄሶች ምክር ቤት**: የክልል አስተባባሪዎች
2. **የማህበረሰብ ምኩራብ**: በአብዛኞቹ ከተሞች
3. **በ IAEJ በኩል**: ያሉ ቄሶች ዝርዝር

📞 **የሃይማኖት ምክር ቤት — የቄሶች ክፍል**: 02-5311111
`,
    },
  },

  // 26 — Sigd events funding
  {
    title: {
      he: "מימון אירועי סיגד — חג קהילתי",
      en: "Sigd Event Funding — Community Holiday",
      am: "የሲግድ ዝግጅቶች ድጋፍ — የማህበረሰብ በዓል",
    },
    slug: { he: "sigd-funding", en: "sigd-funding", am: "sigd-funding" },
    govUrl: "https://www.gov.il/he/departments/ministry_of_culture_and_sport",
    eligibilitySummary: {
      he: "סיגד (29 חשוון) — חג ביתא ישראל המוכר רשמית כחג מדינה. תקציב למימון אירועים בערים, בתי ספר, ומכינות. דרך משרד התרבות + עיריות.",
      en: "Sigd (29 Cheshvan) — Beta Israel holiday officially recognized as a state holiday. Budget for funding events in cities, schools, and pre-army academies. Via Ministry of Culture + municipalities.",
      am: "ሲግድ (29 ቸሽቫን) — በይፋ የተወከለ የቤታ እስራኤል በዓል። በከተሞች፣ ት/ቤቶች እና ማትሪክ ት/ቤቶች ለዝግጅት ድጋፍ።",
    },
    tags: ["sigd", "heritage", "community"],
    bodies: {
      he: `## מה זה סיגד?

חג ביתא ישראל המתקיים ב-29 חשוון (~50 יום אחרי יום כיפור). מציין את חידוש הברית עם האלוהים והכמיהה לציון. הוכר ב-2008 כחג מדינה רשמי. ירושלים — מרכז החגיגה הארצית.

## מי זכאי לתקציב?

- **בתי ספר**: יום עיון סיגד למורים + תכנים לתלמידים — תקציב משרד החינוך
- **רשויות מקומיות**: מימון אירועי שכונה
- **ארגונים קהילתיים**: IAEJ, Heritage Center, מועצות מקומיות
- **מכינות + ישיבות**: סדנאות סיגד למסיימי תיכון
- **תרבות עירונית**: קונצרטים, תערוכות

## תקציב טיפוסי

- **אירוע שכונתי**: עד ₪10,000 (בית ספר/קהילה)
- **אירוע עירוני**: ₪30,000-100,000 (לרוב בשכונות מרובות-קהילה)
- **אירוע ארצי**: ₪500,000+ (טקס המרכזי בירושלים)

## איך מקבלים?

1. **קריאה לקול קורא**: באתר משרד התרבות (יוני-יולי כל שנה)
2. **הגשה דרך עירייה**: תכנית אירוע + תקציב
3. **שותפות עם IAEJ**: לליווי תרבותי וקהל יעד
4. **דדליין**: ספטמבר (לחג בנובמבר)
`,
      en: `## What is Sigd?

A Beta Israel holiday on 29 Cheshvan (~50 days after Yom Kippur). Marks renewing the covenant with God and yearning for Zion. Recognized in 2008 as an official state holiday. Jerusalem — center of national celebration.

## Who is eligible for funding?

- **Schools**: Sigd-themed teacher training + student content — Ministry of Education budget
- **Municipalities**: neighborhood event funding
- **Community orgs**: IAEJ, Heritage Center, local councils
- **Pre-army academies & yeshivas**: Sigd workshops for HS graduates
- **Urban culture**: concerts, exhibitions

## Typical budgets

- **Neighborhood event**: up to ₪10,000 (school/community)
- **City event**: ₪30,000-100,000 (mainly in mixed-community neighborhoods)
- **National event**: ₪500,000+ (central ceremony in Jerusalem)

## How to apply

1. **RFP launch**: on Ministry of Culture website (June-July annually)
2. **Submit via municipality**: event plan + budget
3. **Partnership with IAEJ**: cultural accompaniment and audience
4. **Deadline**: September (for November holiday)
`,
      am: `## ሲግድ ምንድን ነው?

በ29 ቸሽቫን የሚከበር የቤታ እስራኤል በዓል። በ2008 በይፋ የተወከለ የመንግስት በዓል።

## ለማን ድጋፍ ይሰጣል?

- **ት/ቤቶች**
- **ማዘጋጃ ቤቶች**
- **የማህበረሰብ ድርጅቶች**: IAEJ፣ Heritage Center
- **ቅድመ-ሰራዊት እና የሕክምና ት/ቤቶች**
- **የከተማ ባህል**: ኮንሰርቶች፣ ኤግዚቢሽኖች

## ዓይነተኛ በጀቶች

- **የሰፈር ዝግጅት**: እስከ 10,000 ₪
- **የከተማ ዝግጅት**: 30,000-100,000 ₪
- **ብሔራዊ ዝግጅት**: 500,000+ ₪

## እንዴት ማመልከት ይቻላል

1. **የጥሪ መለቀቅ**: በባህል ሚኒስቴር ድረ-ገጽ
2. **በማዘጋጃ ቤት በኩል ማቅረብ**
3. **ከ IAEJ ጋር ሽርክና**
4. **ጊዜ ገደብ**: መስከረም
`,
    },
  },

  // 27 — Family counseling Amharic-speaking
  {
    title: {
      he: "ייעוץ זוגי-משפחתי דובר אמהרית",
      en: "Amharic-Speaking Family & Couples Counseling",
      am: "የአማርኛ ተናጋሪ የቤተሰብ-ጥንዶች ምክር",
    },
    slug: { he: "family-counseling", en: "family-counseling", am: "family-counseling" },
    govUrl: "https://tene-briut.org.il",
    eligibilitySummary: {
      he: "ייעוץ לזוגות ומשפחות עם רגישות תרבותית — להתמודדות עם פערי דורות, התאמת תפקידים משפחתיים, ומשברי זוגיות. דרך טנא בריאות + עובדות סוציאליות בקהילה.",
      en: "Couples and family counseling with cultural sensitivity — addressing generational gaps, evolving family roles, and relationship crises. Via Tene Briut + community social workers.",
      am: "ለጥንዶች እና ቤተሰቦች በባህል ስሜታዊነት ምክር — የትውልድ ክፍተቶችን፣ የቤተሰብ ሚና ለውጥን ለመፍታት።",
    },
    tags: ["family", "mental_health", "anchor_partner"],
    bodies: {
      he: `## למי מיועד?

- **זוגות**: עם פערי דורות (אחד עולה ותיק, השני ישראלי-יליד), משברי תקשורת, התאמה תרבותית
- **משפחות**: סכסוכי הורים-ילדים, פערי שפה, חינוך
- **גירושים**: ליווי תרבותי-קהילתי + משפטי
- **לאחר אבל**: סיוע לאחר פטירה במשפחה

## רגישות תרבותית

הייעוץ מותאם להבנת:
- **תפקידים משפחתיים מסורתיים** של ביתא ישראל
- **קוד הכבוד ההורי** וההשפעה שלו
- **הבושה הקהילתית** מטיפול נפשי
- **קייסים כסמכות מקבילה** בקהילה

## איך פונים?

1. **טנא בריאות — מחלקת משפחה**: 03-7383937 → "ייעוץ משפחה"
2. **עובדת סוציאלית בקהילה**: דרך לשכת רווחה ביישוב — בקשו "מתמחה בקהילה אתיופית"
3. **WIZO + נעמת**: סניפים אזוריים עם רכזות דוברות אמהרית
4. **בקופ"ח**: שירותי הנפש — בקשו "מטפל אמהרית" או "תרגום"

**עלות**: סבסוד עירוני, לרוב סמלי או חינם.
`,
      en: `## Who is eligible?

- **Couples**: with generational gaps, communication crises, cultural adjustment
- **Families**: parent-child conflicts, language gaps, education
- **Divorces**: cultural-community + legal support
- **After bereavement**: post-loss support

## Cultural sensitivity

Counseling adapted to understand:
- **Traditional family roles** of Beta Israel
- **Parental honor codes** and their influence
- **Community shame** around mental health treatment
- **Kessim as parallel authority** in the community

## How to reach out

1. **Tene Briut family unit**: 03-7383937 → "family counseling"
2. **Community social worker**: via local welfare office — ask for "specialist in Ethiopian community"
3. **WIZO + Na'amat**: regional branches with Amharic-speaking coordinators
4. **At HMO**: mental health services — ask for "Amharic therapist" or "translation"

**Cost**: municipally subsidized, usually symbolic or free.
`,
      am: `## ለማን ይሆናል?

- **ጥንዶች**: የትውልድ ክፍተቶች ያላቸው፣ የግንኙነት ችግር
- **ቤተሰቦች**: የወላጅ-ልጅ ግጭት፣ የቋንቋ ክፍተት
- **ፍቺ**: የባህል-ማህበረሰብ + ሕጋዊ ድጋፍ
- **ከሀዘን በኋላ**

## የባህል ስሜታዊነት

ምክሩ ለመረዳት ተስማምቷል፦
- **ባህላዊ የቤተሰብ ሚናዎች**
- **የወላጅ ክብር ኮድ**
- **ስለ የአእምሮ ጤና ሕክምና ማህበረሰባዊ ሐፍረት**
- **ቄሶች እንደ ትይዩ ስልጣን**

## እንዴት ማግኘት ይቻላል

1. **የጤና ብርሃት የቤተሰብ ክፍል**: 03-7383937
2. **የማህበረሰብ ሶሻል ሰራተኛ**
3. **WIZO + Na'amat**
4. **በሕክምና ድርጅት**

**ወጪ**: ብዙውን ጊዜ ምልክት ወይም ነፃ።
`,
    },
  },

  // 28 — Domestic violence support
  {
    title: {
      he: "סיוע במצבי אלימות במשפחה",
      en: "Domestic Violence Support",
      am: "የቤት ውስጥ አመፅ ድጋፍ",
    },
    slug: {
      he: "domestic-violence-support",
      en: "domestic-violence-support",
      am: "domestic-violence-support",
    },
    govUrl: "https://www.gov.il/he/departments/topics/dv_help",
    eligibilitySummary: {
      he: "סיוע מיידי במקרי אלימות במשפחה — מקלטים, ליווי משפטי, ייעוץ פסיכולוגי. שירותים דוברי אמהרית. אנונימיות מובטחת. WIZO + Tebeka + Tene Briut.",
      en: "Immediate help for domestic violence cases — shelters, legal accompaniment, psychological counseling. Amharic-speaking services. Anonymity guaranteed. WIZO + Tebeka + Tene Briut.",
      am: "በቤት ውስጥ አመፅ ጉዳዮች ወዲያውኑ ድጋፍ — መጠለያዎች፣ ሕጋዊ አጃቢነት፣ ሳይኮሎጂካል ምክር።",
    },
    tags: ["domestic_violence", "family", "anchor_partner"],
    bodies: {
      he: `## 🚨 במצב חירום

- **105**: קו חירום ארצי לאלימות במשפחה — 24/7, אנונימי
- **משטרה**: 100 (אם בסכנת חיים)
- **ERAN**: 1201 (תמיכה רגשית)

## למי מיועד?

- נשים וגברים בני קהילה במצבי אלימות (פיזית, מינית, נפשית, כלכלית)
- ילדים ובני נוער החשופים לאלימות
- בני משפחה דאגונים שמלווים נפגע

## שירותים זמינים

- **מקלטים לנשים**: רשת WIZO/נעמת/דרכים — מקלטים עם רכזות דוברות אמהרית בנתניה ורחובות
- **ליווי משפטי חינם**: דרך Tebeka — צו הגנה, גירושים, משמורת
- **ייעוץ פסיכולוגי**: Tene Briut + מרפאות עירוניות
- **ליווי כלכלי**: סיוע במציאת דיור, עבודה, בית ספר לילדים

## דיסקרטיות

כל הפניות הן **אנונימיות** ולא נמסרות לקייסים, רבנים, או הקהילה. ה-confidentiality מוחלטת.

## איך מתחילים בלי סכנה?

- **טלפון**: 105 (קו ארצי) או 03-5240479 (WIZO)
- **WhatsApp**: שלח הודעה לרכזת קהילתית (מספרים ב-WIZO.org.il)
- **דרך מורה / רופאה**: גם הם חייבים בדיווח אם יש סכנה לקטין
- **דרך Tene Briut**: ליווי תרבותי בלי דיווח אוטומטי
`,
      en: `## 🚨 In emergency

- **105**: national domestic violence hotline — 24/7, anonymous
- **Police**: 100 (if life-threatening)
- **ERAN**: 1201 (emotional support)

## Who is eligible?

- Community members in violent situations (physical, sexual, psychological, economic)
- Children and youth exposed to violence
- Concerned family supporting a victim

## Available services

- **Women's shelters**: WIZO/Na'amat/Drachim network — shelters with Amharic-speaking coordinators in Netanya and Rehovot
- **Free legal accompaniment**: via Tebeka — protection orders, divorce, custody
- **Psychological counseling**: Tene Briut + municipal clinics
- **Economic accompaniment**: help finding housing, work, school for children

## Confidentiality

All inquiries are **anonymous** and not reported to kessim, rabbis, or the community. Confidentiality is absolute.

## How to start safely?

- **Phone**: 105 (national) or 03-5240479 (WIZO)
- **WhatsApp**: message a community coordinator (numbers at WIZO.org.il)
- **Via teacher / doctor**: they also have a duty to report if a minor is in danger
- **Via Tene Briut**: cultural accompaniment without automatic reporting
`,
      am: `## 🚨 በአደጋ ጊዜ

- **105**: ብሔራዊ የቤት ውስጥ አመፅ መስመር — 24/7
- **ፖሊስ**: 100
- **ERAN**: 1201

## ለማን ይሆናል?

- በአመፅ ሁኔታ ውስጥ ያሉ የማህበረሰብ አባላት
- ለአመፅ የተጋለጡ ልጆች እና ወጣቶች
- ሰለ ተጎጂ የሚጨነቁ ቤተሰቦች

## ያሉ አገልግሎቶች

- **የሴቶች መጠለያዎች**: በነታንያ እና ረሆቮት የአማርኛ ተናጋሪ አስተባባሪዎች ጋር
- **ነፃ ሕጋዊ አጃቢነት**: በቴቤካ በኩል
- **ሳይኮሎጂካል ምክር**: ጤና ብርሃት
- **የኢኮኖሚ አጃቢነት**: ቤት፣ ሥራ፣ ት/ቤት ማግኘት

## ሚስጥራዊነት

ሁሉም ጥያቄዎች **ስም-አልባ** ናቸው። ለቄሶች፣ ለራቢዎች ወይም ለማህበረሰቡ ሪፖርት አይደረጉም።

## በደህንነት እንዴት መጀመር ይቻላል

- **ስልክ**: 105
- **WhatsApp**: ለማህበረሰብ አስተባባሪ
- **በመምህር / ሐኪም በኩል**
- **በጤና ብርሃት በኩል**: ራስ-ሰር ሪፖርት ሳይደረግ
`,
    },
  },

  // 29 — Subsidized summer camps
  {
    title: {
      he: "קייטנות קיץ סובסידיות — משרד החינוך",
      en: "Subsidized Summer Camps — Ministry of Education",
      am: "የተደገፉ የበጋ ካምፖች — የትምህርት ሚኒስቴር",
    },
    slug: {
      he: "summer-camps-subsidy",
      en: "summer-camps-subsidy",
      am: "summer-camps-subsidy",
    },
    govUrl: "https://www.gov.il/he/departments/ministry_of_education",
    eligibilitySummary: {
      he: "סבסוד קייטנות קיץ לילדי בית ספר (גילאי 6-14) ממשפחות זכאיות. עד 80% הנחה. רישום דרך בית הספר או עירייה.",
      en: "Summer camp subsidies for school-age children (6-14) from eligible families. Up to 80% discount. Register via school or municipality.",
      am: "ለ6-14 ዕድሜ ት/ቤት ልጆች የበጋ ካምፕ ድጋፍ።",
    },
    tags: ["summer_camp", "youth", "subsidy"],
    bodies: {
      he: `## למי מיועד?

- ילדי בית ספר יסודי וחטיבת ביניים (6-14)
- משפחות עם הכנסה מתחת לתקרה (משולב אוטומטית עם זכאות לסיוע מעון)
- עולים חדשים בשנים ראשונות (5 שנים)
- משפחות עם 3+ ילדים
- בני המעמד הוותיק עם הכנסה נמוכה

## מה כולל?

- **קייטנת בית ספר**: 3-4 שבועות באוגוסט, סבסוד עד 80%
- **קייטנות ENP**: ייעודיות לקהילה — אוגוסט, באזורי קהילה. דגש על מצוינות + מורשת.
- **קייטנות מתנ"ס עירוני**: עד 60% הנחה
- **תכניות סטר תרבות**: סדנאות סיגד, אמהרית, אומנות אתיופית

## איך נרשמים?

1. **דרך בית הספר**: יועצ.ת או מנהל.ת בית הספר — מילוי טופס סבסוד
2. **דרך עירייה**: אגף החינוך — רישום מקוון, מאי-יוני
3. **דרך ENP**: רכזת ENP אזורית
4. **קופון מותנה**: לעיתים מקבלים שובר באמצע השנה

## עלויות מוערכות

- **קייטנה רגילה**: ₪400-800 לשבוע (ללא סבסוד)
- **בסבסוד 80%**: ₪80-160 לשבוע
- **חינם**: למשפחות בעדיפות גבוהה
`,
      en: `## Who is eligible?

- Elementary and middle-school children (6-14)
- Families with income below the ceiling (auto-aligned with daycare-subsidy eligibility)
- New immigrants in their first 5 years
- Families with 3+ children
- Veteran community members with low income

## What's included?

- **School camp**: 3-4 weeks in August, up to 80% subsidy
- **ENP camps**: community-dedicated — August, in community areas. Focus on excellence + heritage.
- **Community center camps**: up to 60% discount
- **Heritage tracks**: Sigd workshops, Amharic, Ethiopian art

## How to register

1. **Via school**: counselor or principal — fill subsidy form
2. **Via municipality**: education department — online registration, May-June
3. **Via ENP**: regional ENP coordinator
4. **Conditional voucher**: sometimes received mid-year

## Estimated costs

- **Standard camp**: ₪400-800/week (unsubsidized)
- **At 80% subsidy**: ₪80-160/week
- **Free**: for high-priority families
`,
      am: `## ለማን ይሆናል?

- 6-14 ዕድሜ ላሉ ት/ቤት ልጆች
- ከጣሪያ በታች ገቢ ላላቸው ቤተሰቦች
- በመጀመሪያ 5 ዓመቶቻቸው ላሉ አዲስ ስደተኞች
- 3+ ልጆች ላላቸው ቤተሰቦች

## ምን ይካተታል?

- **የት/ቤት ካምፕ**: በነሐሴ 3-4 ሳምንታት፣ እስከ 80% ድጋፍ
- **የ ENP ካምፖች**: በማህበረሰብ አካባቢዎች
- **የማህበረሰብ ማዕከል ካምፖች**: እስከ 60% ቅናሽ
- **የቅርስ ትራኮች**: የሲግድ ወርክሾፖች፣ አማርኛ

## እንዴት መመዝገብ ይቻላል

1. **በት/ቤት በኩል**
2. **በማዘጋጃ ቤት በኩል**
3. **በ ENP በኩል**

## የተገመቱ ወጪዎች

- **መደበኛ ካምፕ**: በሳምንት 400-800 ₪
- **በ80% ድጋፍ**: በሳምንት 80-160 ₪
- **ነፃ**: ለከፍተኛ ቅድሚያ ቤተሰቦች
`,
    },
  },

  // 30 — Advanced ulpan grants
  {
    title: {
      he: "אולפן מתקדם (ב' / ג') — לימוד עברית מעל הבסיס",
      en: "Advanced Ulpan (Bet / Gimmel) — Hebrew Beyond Basics",
      am: "ከፍተኛ ኡልፓን (ቤት / ጊመል) — ከመሰረታዊ ባለፈ ዕብራይስጥ",
    },
    slug: { he: "advanced-ulpan", en: "advanced-ulpan", am: "advanced-ulpan" },
    govUrl: "https://www.gov.il/he/departments/integration_program/govil-landing-page",
    eligibilitySummary: {
      he: "המשך לימוד עברית מעבר לאולפן א' (בסיסי). אולפן ב' (יומיומי), ג' (אקדמי). חינם / מסובסד דרך משרד הקליטה. כל עולה זכאי במהלך 10 שנים מהעלייה.",
      en: "Continued Hebrew studies beyond basic ulpan. Ulpan Bet (everyday), Gimmel (academic). Free / subsidized via Ministry of Aliyah. Every immigrant is eligible during the first 10 years.",
      am: "ከመሰረታዊ ኡልፓን ባለፈ የዕብራይስጥ ጥናት መቀጠል። ኡልፓን ቤት (ዕለታዊ)፣ ጊመል (አካዳሚክ)።",
    },
    tags: ["language_learning", "new_immigrant", "education"],
    bodies: {
      he: `## למי מיועד?

- כל עולה — בני קהילה ותיקים שעלו בילדות יכולים גם הם להגיש (10 שנים מהעלייה)
- מועמדים לתואר אקדמי — אולפן ג' מקנה רמה אקדמית
- עובדים שמעוניינים לקדם קריירה — אולפן ב' לעברית מקצועית

## רמות זמינות

- **אולפן ב' (Bet)**: 5 חודשים, יומיומי. דקדוק, אוצר מילים יומיומי, כתיבה. **חינם** דרך מתנ"ס/בית הספר התיכון העירוני
- **אולפן ג' (Gimmel)**: 4 חודשים, מתקדם. עברית עיתונאית, ספרותית, אקדמית. **מסובסד 50%** דרך משרד הקליטה
- **אולפן עיצוב**: למקצועות (משפט, רפואה, חינוך) — תכניות מתמחות
- **לימוד מקוון**: Hebrew Online, eTeacher — מתאים למבוגרים עובדים

## איך מתחילים?

1. **בדיקת רמה**: מבחן באולפן עירוני (10 דק' שיחה + טקסט קצר)
2. **רישום**: בית הספר התיכון העירוני, או דרך משרד הקליטה
3. **תזמון**: אולפן ב' מתחיל ספטמבר ופברואר; ג' מתחיל אוקטובר ומרץ
4. **שילוב עם אולפן עוצמה**: מותאם לעובדים — שעות ערב/בוקר

🔗 **משרד הקליטה — אולפן**: [gov.il/integration_program](https://www.gov.il/he/departments/integration_program/govil-landing-page)
`,
      en: `## Who is eligible?

- Every oleh — even veteran community members who immigrated as children can apply (10 years from aliyah)
- Academic-degree candidates — Ulpan Gimmel teaches at academic level
- Workers wanting career advancement — Ulpan Bet for professional Hebrew

## Available levels

- **Ulpan Bet**: 5 months, daily. Grammar, daily vocabulary, writing. **Free** via community center / municipal HS
- **Ulpan Gimmel**: 4 months, advanced. Journalistic, literary, academic Hebrew. **50% subsidy** via Ministry of Aliyah
- **Specialized ulpan**: for professions (law, medicine, education) — dedicated programs
- **Online study**: Hebrew Online, eTeacher — suitable for working adults

## How to start

1. **Level assessment**: test at a municipal ulpan (10-min conversation + short text)
2. **Registration**: municipal HS, or via Ministry of Aliyah
3. **Timing**: Ulpan Bet starts September and February; Gimmel starts October and March
4. **Combine with Ulpan Otzma**: tailored for workers — evening/morning hours

🔗 **Ministry of Aliyah — Ulpan**: [gov.il/integration_program](https://www.gov.il/he/departments/integration_program/govil-landing-page)
`,
      am: `## ለማን ይሆናል?

- ሁሉም ስደተኛ — በልጅነት የተሰደዱ ቀደምት የማህበረሰብ አባላትም ማመልከት ይችላሉ
- የአካዳሚክ ዲግሪ ዕጩዎች
- የሙያ ዕድገት የሚፈልጉ ሰራተኞች

## ያሉ ደረጃዎች

- **ኡልፓን ቤት**: 5 ወራት፣ ዕለታዊ። ሰዋስው፣ ዕለታዊ ቃላት፣ ጽሑፍ። **ነፃ**
- **ኡልፓን ጊመል**: 4 ወራት፣ ከፍተኛ። ጋዜጠኝነት፣ ስነ ጽሑፍ፣ አካዳሚክ ዕብራይስጥ። **50% ድጋፍ**
- **ልዩ ኡልፓን**: ለሙያዎች (ሕግ፣ ሕክምና፣ ትምህርት)
- **የመስመር ላይ ጥናት**: ለሚሰሩ አዋቂዎች ተስማሚ

## እንዴት መጀመር ይቻላል

1. **የደረጃ ግምገማ**: በማዘጋጃ ቤት ኡልፓን ፈተና
2. **ምዝገባ**: በማዘጋጃ ቤት ሁለተኛ ደረጃ ት/ቤት
3. **ጊዜ**: ኡልፓን ቤት በመስከረም እና በየካቲት ይጀምራል፤ ጊመል በጥቅምት እና በመጋቢት
4. **ከኡልፓን ኦዝማ ጋር ማቀላቀል**: ለሚሰሩ የተዘጋጀ — የምሽት/የጠዋት ሰዓታት

🔗 **የመመለሻ ሚኒስቴር — ኡልፓን**: [gov.il/integration_program](https://www.gov.il/he/departments/integration_program/govil-landing-page)
`,
    },
  },
];
