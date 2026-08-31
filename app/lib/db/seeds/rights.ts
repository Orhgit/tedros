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
      he: "משכנתא ליוצאי אתיופיה — המשכנתא הקהילתית, 600,000 ₪",
      en: "Mortgage for Ethiopian Israelis — Community Mortgage, 600,000 ILS",
      am: "ለኢትዮጵያ-እስራኤላውያን ሞርጌጅ — የማህበረሰብ ብድር, 600,000 ሺ" + "ል",
    },
    slug: { he: "600k-mortgage", en: "600k-mortgage", am: "600k-mortgage" },
    govUrl: "https://www.gov.il/he/departments/integration_program/govil-landing-page",
    eligibilitySummary: {
      he: "משכנתא ליוצאי אתיופיה: הלוואת מדינה בסך ₪600,000 ל-25 שנה, 0% ריבית ב-10 שנים הראשונות, 2% ב-15 הבאות. הקצאה בהגרלה שנתית של כ-200 משפחות.",
      en: "Mortgage for Ethiopian Israelis: govt loan of ₪600,000 over 25 years, 0% interest for the first 10, 2% for the next 15. Allocated by annual lottery (~200 families).",
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

  // 2 — Absorption basket (RIN-336; corrected TED-148).
  //
  // TED-148 audit: the original body listed basket components that do not
  // appear on the Ministry of Aliyah and Integration's own page — a
  // "one-time first-home grant", "transportation cost coverage in the first
  // year" and "extended health coverage for six months" — and described the
  // payment as running for a year. Per
  // https://www.gov.il/he/Departments/General/absorption_basket (fetched
  // 2026-08-31) the basket is subsistence money for the six-month ulpan
  // period, paid as an airport prepaid card, a bank top-up and 6 monthly
  // payments. Unverifiable components removed; structure, the 24-month
  // prior-residence rule, the one-year claim window and the
  // income-independence of eligibility taken from that page. The 2026
  // amounts live on the sibling entry `klita-basket-ethiopia` rather than
  // being duplicated here. Hotline corrected from "*2994" (not the
  // Ministry's number) to *2994 / 03-9733333.
  {
    title: {
      he: "סל קליטה לעולים חדשים",
      en: "Klita Basket — Absorption Aid for New Immigrants",
      am: "የመመለሻ ቅርጫት — ለአዲስ ስደተኞች",
    },
    slug: { he: "klita-basket", en: "klita-basket", am: "klita-basket" },
    govUrl: "https://www.gov.il/he/Departments/General/absorption_basket",
    eligibilitySummary: {
      he: "סיוע כספי של משרד העלייה והקליטה לתקופת ההתארגנות הראשונה — תשלום ראשון בנתב\"ג, השלמה לחשבון הבנק ועוד 6 תשלומים חודשיים. הסכום נקבע לפי מצב משפחתי, גיל ומספר ילדים.",
      en: "Financial aid from the Ministry of Aliyah and Integration for an oleh's first period in Israel — a first payment at the airport, a bank top-up and 6 further monthly payments. The amount is set by family status, age and number of children.",
      am: "በእስራኤል ለመጀመሪያው ጊዜ ከዓሊያና መቀበያ ሚኒስቴር የሚሰጥ የገንዘብ ድጋፍ — በአየር ማረፊያ የመጀመሪያ ክፍያ፣ የባንክ ማሟያ እና ተጨማሪ 6 ወርሃዊ ክፍያዎች። መጠኑ በቤተሰብ ሁኔታ፣ ዕድሜና የልጆች ብዛት ይወሰናል።",
    },
    tags: ["new_immigrant", "grants", "monthly_payment"],
    bodies: {
      he: `## למי מיועד?

- הנכנסים לראשונה לישראל באשרת "עולה", בעלי זכאות מלאה כעולים
- מי ששהו בישראל **לא יותר מ-24 חודשים** רצופים או מצטברים בשלוש השנים שקדמו לקבלת מעמד עולה
- וכן מי שנקבע לפי נוהלי המשרד כי דינו כדין עולה

הזכאות **אינה תלויה בגובה ההכנסה**.

## מה כולל הסל?

סל הקליטה הוא **דמי מחיה** לתקופת ההתארגנות הראשונה — הסיוע ניתן לתקופת הלימודים באולפן, במשך שישה חודשים. הוא משולם כך:

1. **תשלום ראשון** — למגיעים באשרת עלייה מחו"ל, ב[כרטיס נטען](https://www.gov.il/he/pages/sal-klita-card) בנמל התעופה. למי שמשנה מעמד בארץ — בהפקדה בנקאית.
2. **השלמה** לחשבון הבנק.
3. **6 תשלומים חודשיים** נוספים.

בתום ששת החודשים אפשר לבדוק זכאות להבטחת הכנסה בביטוח לאומי כהמשך סיוע לצרכי קיום.

הסכומים המדויקים לפי מצב משפחתי, גיל ומספר ילדים מתפרסמים בלוחות הרשמיים — ראו [סל קליטה לעולים מאתיופיה — הסכומים והתהליך](/he/rights/klita-basket-ethiopia) לפירוט לוח 2026, או ישירות ב[אתר המשרד](https://www.gov.il/he/Departments/General/absorption_basket).

## חלון הזמן

את הסל אפשר לקבל **בתוך שנה** מיום קבלת מעמד עולה. **יציאה לחו"ל עוצרת את התשלומים** — חידוש אפשרי רק למי ששב בתוך שנת העלייה הראשונה, ויש לפנות ללשכת המשרד כדי לוודא את חידושם.

## איך מגישים?

1. פותחים **חשבון בנק משותף לשני בני הזוג** באחד הבנקים המסחריים — נדרשת נוכחות של שניהם. מומלץ לעשות זאת בימים הראשונים בארץ.
2. מוסרים את פרטי החשבון בלשכת משרד העלייה והקליטה באזור מגוריכם.
3. לא משנים את מספר החשבון בשנים הראשונות לעלייה; אם בכל זאת — מדווחים למשרד מיד.

📞 **מוקד משרד העלייה והקליטה**: *2994 או 03-9733333 — א׳–ה׳, 8:30–16:00. השירות ניתן גם **באמהרית**.
`,
      en: `## Who is eligible?

- Those entering Israel for the first time on an "oleh" visa, with full oleh entitlement
- Those who stayed in Israel **no more than 24 months**, consecutive or cumulative, in the three years before receiving oleh status
- Plus anyone the Ministry's procedures treat as an oleh

Eligibility **does not depend on income**.

## What does the basket include?

The absorption basket is **subsistence money** for the first period in Israel — aid for the six-month ulpan study period. It is paid as:

1. A **first payment** — for those arriving from abroad on an aliyah visa, on a [prepaid card](https://www.gov.il/he/pages/sal-klita-card) at the airport. For those changing status in Israel — by bank deposit.
2. A **top-up** to the bank account.
3. **6 further monthly payments.**

After the six months you can check eligibility for income support (הבטחת הכנסה) at the National Insurance Institute as continued subsistence aid.

Exact amounts by family status, age and number of children are published in the official tables — see [absorption basket for Ethiopian olim — amounts and process](/en/rights/klita-basket-ethiopia) for the 2026 table, or the [Ministry's page](https://www.gov.il/he/Departments/General/absorption_basket) directly.

## The time window

The basket must be claimed **within one year** of receiving oleh status. **Leaving the country stops the payments** — renewal is possible only for those returning within the first aliyah year, and you must contact a Ministry bureau to confirm it.

## How to apply

1. Open a **joint bank account for both spouses** at a commercial bank — both must be present. Do this in your first days in the country.
2. Give the account details to the Ministry of Aliyah and Integration bureau in your area.
3. Do not change the account number in the first years after aliyah; if you must, report it to the Ministry immediately.

📞 **Ministry of Aliyah and Integration hotline**: *2994 or 03-9733333 — Sun–Thu, 8:30–16:00. Service is also available **in Amharic**.
`,
      am: `## ማን ብቁ ነው?

- በ"ኦሌ" ቪዛ ለመጀመሪያ ጊዜ ወደ እስራኤል የሚገቡ፣ ሙሉ የኦሌ ብቁነት ያላቸው
- የኦሌ ደረጃ ከማግኘታቸው በፊት በነበሩት ሦስት ዓመታት በእስራኤል **ከ24 ወራት ያልበለጠ** የቆዩ
- እንዲሁም በሚኒስቴሩ ሥርዓት እንደ ኦሌ የሚቆጠር ማንኛውም ሰው

ብቁነቱ **በገቢ መጠን ላይ አይመሠረትም**።

## ቅርጫቱ ምን ይዟል?

የመቀበያ ቅርጫት በእስራኤል ለመጀመሪያው ጊዜ የሚሰጥ **የመተዳደሪያ ገንዘብ** ነው — ለስድስት ወር የኡልፓን ትምህርት ጊዜ። እንዲህ ይከፈላል፦

1. **የመጀመሪያ ክፍያ** — ከውጭ በዓሊያ ቪዛ ለሚደርሱ፣ በአየር ማረፊያ በቅድመ-ክፍያ ካርድ። በእስራኤል ውስጥ ደረጃቸውን ለሚቀይሩ — በባንክ ተቀማጭ።
2. ወደ ባንክ ሂሳብ **ማሟያ**።
3. ተጨማሪ **6 ወርሃዊ ክፍያዎች**።

ከስድስቱ ወራት በኋላ በብሔራዊ መድን ተቋም የገቢ ድጋፍ ብቁነትዎን ማረጋገጥ ይችላሉ።

በቤተሰብ ሁኔታ፣ ዕድሜና የልጆች ብዛት የተወሰኑ ትክክለኛ መጠኖች በኦፊሴላዊ ሰንጠረዦች ይታተማሉ — የ2026 ሰንጠረዥ [ለኢትዮጵያ ኦሊሞች የመቀበያ ቅርጫት](/am/rights/klita-basket-ethiopia) ላይ ይመልከቱ።

## የጊዜ መስኮት

ቅርጫቱ የኦሌ ደረጃ ካገኙበት ቀን ጀምሮ **በአንድ ዓመት ውስጥ** መጠየቅ አለበት። **ወደ ውጭ ሀገር መሄድ ክፍያዎቹን ያቆማል** — እንደገና መጀመር የሚቻለው በመጀመሪያው የዓሊያ ዓመት ውስጥ ለሚመለሱ ብቻ ነው።

## እንዴት ማመልከት

1. በንግድ ባንክ **ለሁለቱም ባለትዳሮች የጋራ የባንክ ሂሳብ** ይክፈቱ — ሁለቱም መገኘት አለባቸው።
2. የሂሳብ ዝርዝሮችን በአካባቢዎ ላለው የሚኒስቴሩ ቢሮ ይስጡ።
3. በመጀመሪያዎቹ ዓመታት የሂሳብ ቁጥሩን አይቀይሩ፤ ከቀየሩ ወዲያውኑ ያሳውቁ።

📞 **የዓሊያና መቀበያ ሚኒስቴር መስመር**፦ *2994 ወይም 03-9733333 — እሁድ–ሐሙስ፣ 8:30–16:00። አገልግሎቱ **በአማርኛም** ይሰጣል።

*[የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግመው ይመከራል።]*
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
        // TED-148: replaced an "are you enrolled in ulpan?" require-true
        // rule. The Ministry describes the basket as subsistence money *for*
        // the ulpan period but nowhere makes enrolment a condition of
        // payment, so gating eligibility on it was inventing a requirement.
        // The 24-month prior-residence rule below is stated on the official
        // page and is a genuine hard condition.
        {
          id: "under24MonthsPriorResidence",
          type: "boolean",
          label: {
            he: 'שהיתם בישראל פחות מ-24 חודשים (רצופים או מצטברים) בשלוש השנים שקדמו לקבלת מעמד "עולה"?',
            en: 'Were you in Israel for less than 24 months (consecutive or cumulative) in the three years before receiving "oleh" status?',
            am: 'የ"ኦሌ" ደረጃ ከማግኘትዎ በፊት በነበሩት ሦስት ዓመታት በእስራኤል ከ24 ወራት ያነሰ (ተከታታይ ወይም ተደማሪ) ቆይተዋል?',
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
          questionId: "under24MonthsPriorResidence",
          reason: {
            he: 'מי ששהה בישראל יותר מ-24 חודשים בשלוש השנים שקדמו לקבלת מעמד "עולה" אינו זכאי לסל קליטה.',
            en: 'Those who were in Israel more than 24 months in the three years before receiving "oleh" status are not eligible for the absorption basket.',
            am: 'የ"ኦሌ" ደረጃ ከማግኘታቸው በፊት በነበሩት ሦስት ዓመታት በእስራኤል ከ24 ወራት በላይ የቆዩ ለመቀበያ ቅርጫት ብቁ አይደሉም።',
          },
        },
      ],
    },
  },

  // NEW 14 — Police rights guide
  {
    title: {
      he: "זכויות מול משטרה — מה מותר ומה אסור",
      en: "Your Rights With Police — What Is and Isn't Allowed",
      am: "ከፖሊስ ጋር ያሉ መብቶች — ምን ተፈቅዶ ምን ተከልክሏል",
    },
    slug: {
      he: "police-rights-guide",
      en: "police-rights-guide",
      am: "police-rights-guide",
    },
    govUrl: "https://www.gov.il/he/departments/ministry-of-public-security",
    eligibilitySummary: {
      he: "כל אזרח ותושב ישראל זכאי לדעת מדוע הוא נעצר או נחקר, לשתוק, ולקבל ייעוץ משפטי. אלה זכויות חוקתיות — לא טובות לב של שוטר.",
      en: "Every citizen and resident of Israel has the right to know why they are being stopped or investigated, to remain silent, and to receive legal counsel. These are constitutional rights.",
      am: "በእስራኤል ያለ ሁሉም ዜጋ እና ነዋሪ ለምን እንደሚቆሙ ወይም እንደሚጠየቁ የማወቅ፣침ን የመጠበቅ እና የሕግ ምክር የማግኘት መብት አለው።",
    },
    tags: ["legal"],
    bodies: {
      he: `## למה הדף הזה חשוב ליוצאי אתיופיה?

נתונים של עמותת תבקה ושל המרכז לרב-תרבותיות ודמוקרטיה מציגים תמונה עקבית: צעירים יוצאי אתיופיה מדווחים על בדיקות שוטרים יזומות (profiling) בשיעור גבוה באופן לא-פרופורציונלי ביחס לנתח האוכלוסייה שלהם. מחאות 2015 ו-2019 יצאו בדיוק מהצטברות אירועים כאלה. הדרך הטובה ביותר להגן על עצמך היא לדעת את זכויותיך לפני שתצטרך להשתמש בהן.

---

## זכות 1 — לדעת מדוע עוצרים אותך

על-פי סעיף 23 לחוק סדר הדין הפלילי (סמכויות אכיפה — חיפוש בגוף ובגופה), שוטר שמבקש לבדוק אותך חייב להציג את תעודתו ולהסביר את הסיבה. אתה רשאי לשאול בשקט: **"מה הסיבה לעצירה?"** — זה לא התנגדות, זה מימוש זכות.

אם השוטר מסרב להסביר ועדיין מדרוש שתישאר במקום, לא ניתן לדעת בדיוק אם מדובר ב"חיפוש וולונטרי" או "עצור לחקירה". במקרה של ספק — ציין בקול: "אני מממש את זכותי להישאר שקט עד שאדבר עם עורך דין."

---

## זכות 2 — הזכות לשתוק

חוק יסוד: כבוד האדם וחירותו + פקודת מעצר וחיפוש קובעים שאדם אינו חייב להפליל את עצמו. בפועל:

- **אל תסביר, תצדיק, תתנצל** — כל מה שתאמר עלול לשמש ראיה.
- ציין בפה מלא: "אני מבקש לשתוק עד שעורך הדין שלי יגיע."
- שתיקה אינה ראיה לאשמה — שום שופט ישראלי אינו רשאי להסיק מסקנה שלילית משתיקה בחקירה.

---

## זכות 3 — ייעוץ משפטי לפני חקירה

על-פי חוק סדר הדין הפלילי (נוסח משולב), כל נחקר זכאי לפגישה עם עורך דין **לפני** שהחקירה מתחילה. המשטרה חייבת לאפשר זאת, למעט מקרים חריגים (ביטחון המדינה, פגיעה בחקירה בהסכמת קצין בכיר).

**אם אין לך עורך דין**: התקשר לתורן הלילה של לשכת עורכי הדין: **03-6200600** (24/7).
**תבקה** — עמותת יוצאי אתיופיה: **1-800-20-20-16** (שעות משרד).

---

## זכות 4 — חיפוש גוף ורכב

חיפוש גוף מלא דורש **צו שופט** — אלא אם יש חשד סביר ומיידי. חיפוש שטחי (מישוש חיצוני) מותר לשוטר בשטח, אך **חייב**:
1. להיות מבוצע על-ידי שוטר מאותו מין.
2. לא להשפיל או לגרום לסבל מיותר.
3. להיות מתועד ברשומת הפעולה.

לגבי רכב: שוטר רשאי לבקש לפתוח תא-מטען, אך פתיחה בכוח דורשת חשד סביר מוגדר. לא חובה להסכים לחיפוש "וולונטרי" — אמור בבירור: "אני אינו מסכים לחיפוש."

---

## זכות 5 — מעצר: מה קורה?

אם נעצרת:
1. **הודעה על עילת המעצר** — חובה על-פי חוק.
2. **הבאה לשופט תוך 24 שעות** — אם לא הוארך המעצר, חובה לשחרר.
3. **זכות לטלפן** — להודיע לבן-משפחה או עורך-דין.
4. **זכות לתרגום** — אם אינך דובר עברית, המשטרה חייבת להמציא מתורגמן (ראה גם: **זכות למתורגמן בבית-משפט**).

רשום מיד: שם השוטר, מספר האפודה, שעת העצירה, מיקום. אם יש עדים — בקש שמות.

---

## מה לעשות אם השוטר חרג?

1. **אל תתעמת פיזית** — זה מסוכן ולא יועיל.
2. **תעד** — צלם (מותר בשטח ציבורי), שמור הודעות.
3. **הגש תלונה במח"ש** — [mahash.gov.il](https://www.mahash.gov.il) (ראה גם דף "איך מגישים תלונה על שוטר").
4. **פנה לתבקה** — 1-800-20-20-16 / tebeka.org.il
5. **עמותת האגודה לזכויות האזרח (עכ"א)** — 1-800-20-20-16 | acri.org.il

---

## טבלת זכויות מהירה

| מצב | הזכות שלך |
|-----|-----------|
| שוטר עוצר אותך | לדעת את הסיבה |
| חקירה מתחילה | לשתוק, לדרוש עורך-דין |
| חיפוש גוף | לדרוש שיהיה מאותו מין, לא להסכים לוולונטרי |
| מעצר | הבאה לשופט תוך 24 שעות, טלפון לעו"ד |
| חוסר הבנה בשפה | מתורגמן על-חשבון המדינה |

---

## מספרי חירום

- **מח"ש (תלונות על שוטרים)**: 1553 | mahash.gov.il
- **תבקה**: 1-800-20-20-16 | [tebeka.org.il](https://tebeka.org.il)
- **עכ"א**: 1-800-20-20-16 | [acri.org.il](https://www.acri.org.il)
- **לשכת עורכי הדין (תורן 24/7)**: 03-6200600
`,
      en: `## Why This Matters for Ethiopian-Israelis

Studies and reports by TEBEKA and human-rights organisations document disproportionate rates of police stops targeting Ethiopian-Israeli youth. The 2015 and 2019 protest movements arose directly from these experiences. Knowing your rights is the most effective protection before you ever need it.

## Core Rights

**Right to know why you are stopped.** Under Israeli law a police officer must identify themselves and state the reason for a stop or search. Ask calmly: "What is the reason for this stop?"

**Right to remain silent.** You are never required to answer questions that could incriminate you. State clearly: "I am exercising my right to remain silent until my lawyer arrives." Silence cannot be used as evidence of guilt in Israeli courts.

**Right to legal counsel.** Before any interrogation you are entitled to consult a lawyer. The police must facilitate this except in narrow national-security exceptions. If you have no lawyer, call the Bar Association duty line: 03-6200600 (24/7).

**Right to dignity during searches.** A full body search requires a judicial warrant or specific immediate suspicion. Strip searches must be conducted by an officer of the same gender. You may refuse a "voluntary" search — say clearly: "I do not consent to a search."

**If arrested.** The police must tell you why, bring you before a judge within 24 hours, allow you to call a family member or lawyer, and provide an interpreter if you do not speak Hebrew.

## Complaint Hotlines

- **MAHASH (police complaints)**: 1553 | mahash.gov.il
- **TEBEKA**: 1-800-20-20-16 | tebeka.org.il
- **ACRI**: acri.org.il
- **Bar Association duty lawyer**: 03-6200600
`,
      am: `## ዋና መብቶች

**ለምን እንደሚቆሙ የማወቅ መብት።** ፖሊስ ማንነቱን ማሳየት እና ምክንያቱን መግለጽ አለበት።

**ዝምታን የመጠበቅ መብት።** ምንም ጥያቄ መመለስ አለብዎትም። ይበሉ፦ "ጠበቃዬ እስኪደርስ ምንም አልናገርም።"

**የሕግ ምክር የማግኘት መብት።** ቃለ-ምልልስ ከመጀመሩ በፊት ጠበቃ የማማከር መብት አለዎት። ጠበቃ ከሌለዎት ይደውሉ፦ 03-6200600 (24/7)።

**ፍተሻ።** ሙሉ የሰውነት ፍተሻ የዳኛ ትዕዛዝ ይፈልጋል። ፍተሻን "ለፈቃደኝነት" አትቀበሉ — ይበሉ፦ "ፍተሻን አልፈቅድም።"

**ከተያዙ።** ፖሊስ ምክንያቱን መንገር፣ በ24 ሰዓት ፊት ለዳኛ ማቅረብ እና አስተርጓሚ ማቅረብ አለበት።

## አስቸኳይ ስልኮች

- **MAHASH**: 1553 | mahash.gov.il
- **TEBEKA**: 1-800-20-20-16 | tebeka.org.il
- **የጠበቃ ፍርድ ቤት ተረኛ**: 03-6200600
`,
    },
  },

  // NEW 15 — Police complaint guide
  {
    title: {
      he: "איך מגישים תלונה על שוטר — מדריך שלב אחר שלב",
      en: "How to File a Complaint Against a Police Officer — Step by Step",
      am: "በፖሊስ ላይ ቅሬታ እንዴት እናቀርባለን — ደረጃ በደረጃ",
    },
    slug: {
      he: "police-complaint-guide",
      en: "police-complaint-guide",
      am: "police-complaint-guide",
    },
    govUrl: "https://www.mahash.gov.il",
    eligibilitySummary: {
      he: 'כל מי שחש שנפגע מהתנהגות שוטר — יכול להגיש תלונה למח"ש (מחלקת חקירות שוטרים) או לנציב תלונות הציבור על המשטרה. אין עלות, אין צורך בעורך-דין.',
      en: "Anyone who believes they were harmed by police conduct can file a complaint with MAHASH (Police Investigations Department) or the Public Complaints Commissioner — free, no lawyer required.",
      am: "የፖሊስ ባህሪ ጎድቶናል የሚል ማንኛውም ሰው ለMAHASH ወይም ለህዝብ ቅሬታ ኮሚሽነር ቅሬታ ማቅረብ ይችላል — ነፃ ነው።",
    },
    tags: ["legal"],
    bodies: {
      he: `## מה הם מח"ש ונציב תלונות הציבור?

**מח"ש — מחלקת חקירות שוטרים** היא יחידה בתוך המשטרה שמטפלת בחשד לעבירות פליליות של שוטרים (תקיפה, שימוש מופרז בכוח, גביית שוחד וכדומה). מח"ש פועל תחת פיקוח משרד המשפטים.

**נציב תלונות הציבור על המשטרה** — גוף חיצוני ועצמאי שדן בתלונות על התנהגות לא-ראויה שאינה עולה לכדי עבירה פלילית (אדיבות, הפעלת שיקול-דעת, איחור למקרה וכדומה).

לעתים רצוי להגיש לשניהם — הם מטפלים בזוויות שונות.

---

## שלב 1 — איסוף ראיות

לפני שמגישים, אסוף כמה שיותר מהפרטים הבאים:

- **שם ומספר אפודה** של השוטר (או צילום)
- **תאריך, שעה, מיקום מדויק**
- **עדים** — שמות ומספרי טלפון
- **צילומים/סרטונים** מסמרטפון (מותר לצלם בשטח ציבורי)
- **מסמכים**: טופס מעצר, קבלה, כל ניר שקיבלת
- **עדות רפואית**: אם נפגעת — לתעד אצל רופא באותו יום

---

## שלב 2 — הגשת תלונה למח"ש

### אפיק A — אינטרנט (מהיר ביותר)
1. גש לאתר [mahash.gov.il](https://www.mahash.gov.il)
2. בחר "הגשת תלונה"
3. מלא את הטופס המקוון — שמות, תיאור, תאריך
4. צרף קבצים (צילומים, סרטונים)
5. תקבל מספר תיק — שמור אותו

### אפיק B — פנייה ישירה
פנה למשרד מח"ש הקרוב אליך (יש משרדים בתל-אביב, ירושלים, חיפה, באר-שבע). אפשר להגיע ללא תיאום מראש בשעות קבלת קהל.

### מגבלת זמן
לפי תקנות המשטרה — **30 ימים** לתלונה על אירוע פנימי (אפשר לבקש הארכה עם נימוק).

---

## שלב 3 — הגשת תלונה לנציב

1. כנס לאתר [ombudsman.gov.il](https://www.ombudsman.gov.il) (או חפש "נציב תלונות הציבור")
2. ניתן להגיש בדואר אלקטרוני, בפקס, בדואר רשום, או פנייה אישית
3. הנציב אינו מחויב לפתוח חקירה בכל תלונה — אך חייב להודיע לך על ההחלטה ועל הנימוק

---

## תבקה — ליווי חינם

עמותת **תבקה** (האגודה הישראלית ליהודים אתיופים) מספקת ליווי חינמי בתלונות על שוטרים, כולל:
- ניסוח כתב התלונה
- ייצוג בפני מח"ש
- ניטור התיק

📞 **1-800-20-20-16** | [tebeka.org.il](https://tebeka.org.il)

---

## מה אפשר לצפות?

| תוצאה | שכיחות |
|-------|--------|
| סגירת תיק ללא נקיטת פעולה | שכיחה (אך יש ערעור) |
| עיצום כספי / השעיית שוטר | קיים בעקבות ראיות חזקות |
| הגשת כתב-אישום פלילי | נדיר — בעיקר בתקיפה |
| פיצוי אזרחי (תביעה נפרדת) | אפשרי דרך בית-משפט |

גם תלונה "שנסגרה" בונה תיעוד — שני אירועים תחת אותו שוטר עשויים להגיע לדיוויזיה פנימית.

---

## ערעור על החלטת מח"ש

אם התיק נסגר ואתה לא מסכים:
1. פנה בכתב לראש מח"ש לביקורת הפיקוח
2. פנה לנציב תלונות הציבור (הוא עצמאי ממח"ש)
3. שקול תביעה אזרחית — תבקה יכולה להעריך סיכויים

---

## קישורים ישירים

- מח"ש: [mahash.gov.il](https://www.mahash.gov.il)
- נציב תלונות הציבור: [ombudsman.gov.il](https://www.ombudsman.gov.il)
- תבקה: [tebeka.org.il](https://tebeka.org.il)
- עכ"א: [acri.org.il](https://www.acri.org.il)
`,
      en: `## Two Complaint Bodies

**MAHASH** (Police Investigations Department) handles suspected criminal misconduct — assault, excessive force, bribery. It operates under Justice Ministry oversight.

**The Public Complaints Commissioner** is an independent external body for non-criminal misconduct — rudeness, poor judgment, delayed response.

Filing with both is often advisable.

## Step-by-Step

**Step 1 — Collect evidence.** Officer name and badge number, exact date/time/location, witness names and phones, photos or video (legal in public spaces), any documents received, and a same-day medical record if you were injured.

**Step 2 — File with MAHASH.** Online at mahash.gov.il (fastest) or in person at a MAHASH office in Tel Aviv, Jerusalem, Haifa, or Be'er Sheva. Time limit: 30 days (extensions available with justification).

**Step 3 — File with the Ombudsman.** Online or by registered mail at ombudsman.gov.il. The Ombudsman must notify you of any decision and its reasoning.

**Free support from TEBEKA.** TEBEKA provides free complaint drafting, representation before MAHASH, and case monitoring. Call 1-800-20-20-16 or visit tebeka.org.il.

## Realistic Outcomes

Most files are closed without action, but documented complaints build a record. Two incidents against the same officer can trigger internal affairs review. Criminal charges are rare but possible with strong evidence. Civil lawsuits are a parallel option for damages.
`,
      am: `## ቅሬታ የሚቀበሉ ሁለት አካላት

**MAHASH** — የወንጀል ጥቃት፣ ከልክ ያለፈ ኃይል ወይም ጉቦ ጉዳዮችን ይዳኛል።
**የህዝብ ቅሬታ ኮሚሽነር** — ወንጀለኛ ያልሆኑ ጉዳዮችን (ጨዋነት ጉድለት፣ ዘግይቶ መምጣት) ይዳኛል።

## ደረጃዎች

1. ማስረጃ ያሰባስቡ፦ የፖሊሱ ስም፣ ቁጥር፣ ቀን፣ ቦታ፣ ምስክሮች፣ ፎቶዎች።
2. MAHASH ላይ ያቅርቡ፦ mahash.gov.il ወይም ቢሮ። ጊዜ ገደብ፦ 30 ቀናት።
3. ለኮሚሽነሩ ያቅርቡ፦ ombudsman.gov.il

**TEBEKA ነፃ እርዳታ ይሰጣል።** 1-800-20-20-16 | tebeka.org.il
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
      he: "דיור ציבורי ליוצאי אתיופיה ולכלל הזכאים: לפי הכנסה, גודל משפחה, ומצב נכסים. זכות עולה חדש מקנה עדיפות עד כ-15 שנה מהעלייה. נדחיתם? אפשר לערער בפני ועדת חריגים.",
      en: "Public housing for Ethiopian-Israelis and all eligible applicants: by income, family size, and asset status. New-immigrant priority applies for up to ~15 years from aliyah. Rejected? You can appeal to an exceptions committee.",
      am: "የሕዝብ መኖሪያ ቤት ለኢትዮጵያ-እስራኤላውያን እና ለሁሉም ብቁ አመልካቾች፦ በገቢ፣ በቤተሰብ መጠን እና በንብረት ሁኔታ። የአዲስ ስደተኛ ቅድሚያ እስከ ~15 ዓመታት ይሠራል። ካልተቀበሉ ወደ ልዩ ጉዳዮች ኮሚቴ ይግባኝ ማለት ይችላሉ።",
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

## מי מנהל את הדירות בפועל?

חברות הדיור הציבורי (עמידר, עמיגור, חלמיש, שיקמונה) מנהלות את מלאי הדירות בשם משרד הבינוי והשיכון — פנייה לחברה הרלוונטית באזורכם מזרזת בירורים על סטטוס הבקשה.

## ליוצאי אתיופיה — נקודות שכדאי לדעת

- זכות "עולה חדש" (הכוללת בני הקהילה שעלו לישראל) מקנה עדיפות מוגברת עד כ-15 שנה מהעלייה — לפי אותה זכות עלייה כללית, ולא מסלול ייעודי נפרד ליוצאי אתיופיה.
- תעודת הזכאות תקפה ל-4 שנים — יש לחדש לפני פקיעתה כדי לא לאבד את המקום ברשימת ההמתנה.
- אם השפה או הבירוקרטיה מהוות חסם — ארגוני קהילה (למשל דרך Tebeka, ראו הזכות "סיוע משפטי חינם") יכולים לסייע בליווי הפנייה.

## מה עושים אם נדחיתם?

1. מבקשים בכתב את נימוקי הדחייה ממשרד הבינוי והשיכון או מחברת הדיור המנהלת
2. ניתן לערער בפני **ועדת חריגים** — ועדה פנימית הבוחנת מקרים שאינם עומדים בקריטריונים הרגילים אך מצדיקים חריגה
3. אם הערעור נדחה גם הוא — מומלץ לפנות לעורך דין המתמחה בדיור ציבורי, או לסיוע המשפטי החינמי של Tebeka
4. אפשר גם לפנות ל-kolzchut.org.il לבדיקת עדכני זכויות והליכי הערעור המלאים

🔗 **עמידר**: [amidar.co.il](https://www.amidar.co.il)
🔗 **מידע מלא על זכויות וערעור**: [kolzchut.org.il](https://www.kolzchut.org.il)
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

## Who actually manages the apartments?

Public-housing companies (Amidar, Amigor, Halamish, Shikmona) manage the apartment stock on behalf of the Ministry of Construction & Housing — contacting the relevant company for your area speeds up status inquiries.

## For Ethiopian-Israelis — worth knowing

- The general "new immigrant" priority (which covers community members who made aliyah) grants a priority bump for up to ~15 years from aliyah — this is the same general oleh right, not a dedicated Ethiopian-specific track.
- The eligibility certificate is valid for 4 years — renew before it expires or you lose your place on the waitlist.
- If language or bureaucracy is a barrier, community organizations (e.g. via Tebeka — see the "Free Legal Aid" right) can help with the application.

## What to do if you're rejected

1. Request the rejection reasons in writing from the Ministry of Construction & Housing or the managing housing company
2. You can appeal to a **Va'adat Chariggim** ("exceptions committee") — an internal committee reviewing cases that don't meet standard criteria but justify an exception
3. If the appeal is also rejected — consider a lawyer specializing in public housing, or Tebeka's free legal aid
4. kolzchut.org.il maintains an up-to-date explainer of rights and the full appeal process

🔗 **Amidar**: [amidar.co.il](https://www.amidar.co.il)
🔗 **Full rights & appeal info**: [kolzchut.org.il](https://www.kolzchut.org.il)
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

## ቤቶቹን በተግባር የሚያስተዳድረው ማን ነው?

የሕዝብ መኖሪያ ቤት ኩባንያዎች (ዓሚዳር፣ ዓሚጎር፣ ሃላሚሽ፣ ሺቅሞና) ለግንባታ እና ቤት ሚኒስቴር ወክለው ቤቶቹን ያስተዳድራሉ — በአካባቢዎ ላለው ኩባንያ በቀጥታ መደወል ስለ ሁኔታው ፈጣን መልስ ይሰጣል።

## ለኢትዮጵያ-እስራኤላውያን — ጠቃሚ መረጃ

- አጠቃላይ "አዲስ ስደተኛ" ቅድሚያ (ማህበረሰብ አባላትንም የሚያካትት) ከአሊያ በኋላ እስከ ~15 ዓመታት ቅድሚያ ይሰጣል — ይህ አጠቃላይ የኦሊ መብት ነው፣ ለኢትዮጵያውያን ብቻ ልዩ መንገድ አይደለም።
- የብቁነት ሰርተፍኬት ለ4 ዓመታት ዋጋ አለው — ከማብቃቱ በፊት ያድሱት፣ አለበለዚያ በጥበቃ ዝርዝር ላይ ያለዎትን ቦታ ያጣሉ።
- ቋንቋ ወይም ቢሮክራሲ እንቅፋት ከሆነ፣ የማህበረሰብ ድርጅቶች (ለምሳሌ ቴቤካ — "ነፃ የህግ ድጋፍ" መብቱን ይመልከቱ) በማመልከቻው ሊረዱ ይችላሉ።

## ካልተቀበሉ ምን ማድረግ ይቻላል?

1. ከግንባታ እና ቤት ሚኒስቴር ወይም ከሚያስተዳድረው ኩባንያ የመናቅ ምክንያቶችን በጽሑፍ ይጠይቁ
2. ወደ **የተለየ ጉዳዮች ኮሚቴ** (ועדת חריגים) ይግባኝ ማለት ይችላሉ — መደበኛ መስፈርቶችን የማያሟሉ ግን ልዩ ሁኔታ የሚያስፈልጋቸውን ጉዳዮች የሚመረምር ውስጣዊ ኮሚቴ
3. ይግባኙም ካልተቀበለ — በሕዝብ መኖሪያ ቤት ጉዳይ የተካነ ጠበቃ ወይም የቴቤካ ነፃ የህግ ድጋፍ ያማክሩ
4. kolzchut.org.il ስለ መብቶች እና ሙሉ የይግባኝ ሂደት ወቅታዊ መረጃ ይይዛል

🔗 **ዓሚዳር**: [amidar.co.il](https://www.amidar.co.il)
🔗 **ሙሉ የመብት እና ይግባኝ መረጃ**: [kolzchut.org.il](https://www.kolzchut.org.il)
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

📞 **מוקד הקליטה**: *2994
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

📞 **Aliyah hotline**: *2994
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

📞 **የመመለሻ መስመር**: *2994
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

## פערי מעמד ושכר

לפי דיווחים (עיתון "דבר", 2024), הקייסים עדיין מקבלים שכר נמוך משמעותית משל רבני קהילה רשמיים, ואינם משולבים באופן מלא במערך הרבנות הראשית — חרף ההכרה הרשמית מ-2018 ותוספת 20 התקנים ברבנות.

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

## Status and pay gap

According to reporting (Davar newspaper, 2024), kessim still earn significantly less than official community rabbis and are not fully integrated into the Chief Rabbinate's structure — despite the official 2018 recognition and the addition of 20 rabbinate posts.

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

## ደረጃ እና የደመወዝ ልዩነት

በ2024 ዘገባ (ዳቫር ጋዜጣ) መሠረት፣ ቄሶች ከይፋዊ የማህበረሰብ ራቢዎች ያነሰ ደመወዝ ያገኛሉ፣ እና በ2018 ይፋዊ እውቅና ቢኖራቸውም ሙሉ በሙሉ ወደ ዋና ራቢነት መዋቅር አልተካተቱም።

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

  // 23 — Vocational training vouchers for immigrants (TED-66)
  {
    title: {
      he: "שוברי הכשרה מקצועית לעולים",
      en: "Vocational Training Vouchers for New Immigrants",
      am: "ለስደተኞች ሙያ ስልጠና ቫዎቸሮች",
    },
    slug: {
      he: "vocational-training-vouchers-immigrants",
      en: "vocational-training-vouchers-immigrants",
      am: "vocational-training-vouchers-immigrants",
    },
    govUrl:
      "https://www.gov.il/he/departments/topics/vocational_training/govil-landing-page",
    eligibilitySummary: {
      he: "עולים חדשים זכאים לשוברי הכשרה מקצועית של עד ₪12,000 לקורסים מוכרים — לרכישת מקצוע ושילוב בשוק העבודה הישראלי.",
      en: "New immigrants are entitled to vocational training vouchers worth up to ₪12,000 for accredited courses — to acquire a trade and integrate into the Israeli labour market.",
      am: 'አዲስ ስደተኞች ለታወቁ ኮርሶች እስከ 12,000 ሺ"ል ሙያ ስልጠና ቫዎቸሮች ያገኛሉ — ሙያ ለማዳበርና ወደ ሥራ ገበያ ለመቀላቀል።',
    },
    tags: ["employment", "education", "new_immigrant"],
    bodies: {
      he: `## מה הם שוברי הכשרה מקצועית?

שוברי הכשרה מקצועית (שבי"ם) הם כלי של משרד הקליטה ומשרד הכלכלה המאפשר לעולים חדשים לממן קורסים מקצועיים מוכרים — בלי לשלם מכיסם.

## כמה שווה השובר?

- עד **₪12,000** לקורס אחד או מספר קורסים קצרים
- ניתן לנצל ב-**4 שנים** מיום העלייה
- כיסוי מלא או חלקי לפי סוג הקורס

## אילו קורסים מוכרים?

- מקצועות בנייה ותשתיות (חשמלאי, אינסטלטור, צבעי)
- תחום הייטק מקדים (QA, ניהול מוצר, UX)
- ספרות ואסתטיקה
- טיפול בילדים ובקשישים
- נהיגה (רישיון כבד / מונית / אוטובוס)

## מי זכאי?

- עולה חדש שעלה ב-4 השנים האחרונות
- רשום במשרד הקליטה
- אין הגבלת גיל

## איך מממשים?

1. **בחרו קורס** ברשימת הקורסים המוכרים (gov.il → שוברי הכשרה)
2. **בקשו אישור** ממשרד הקליטה — ניתן אונליין
3. **הירשמו למוסד ההכשרה** עם אישור השובר
4. **המוסד מקבל את התשלום** ישירות ממשרד הקליטה

## שאלות נפוצות

**האם ניתן לנצל את השובר לקורס שמתקיים בערב?**
כן — מרבית קורסי הישובים המוכרים מציעים מסלולי ערב.

**מה אם הקורס עולה יותר מ-₪12,000?**
ניתן להשלים את ההפרש באמצעות מלגת מרום, קרן מיוחדת, או תשלום עצמי.

**האם שובר מכסה גם רישיון נהיגה?**
כן — קורסי נהיגה מקצועיים (כבד/מונית) כלולים ברשימה.

📞 **מוקד משרד הקליטה**: *2994
🔗 [gov.il — שוברי הכשרה](https://www.gov.il/he/departments/topics/vocational_training/govil-landing-page)
`,
      en: `## What are vocational training vouchers?

Vocational training vouchers (Shabbim) are a tool of the Ministry of Aliyah and the Ministry of Economy that allows new immigrants to fund accredited vocational courses — without paying out of pocket.

## How much is the voucher worth?

- Up to **₪12,000** for one course or several short courses
- Can be used within **4 years** of aliyah
- Full or partial coverage depending on the course type

## Which courses are accredited?

- Construction and infrastructure trades (electrician, plumber, painter)
- Entry-level tech (QA, product management, UX)
- Hairdressing and aesthetics
- Childcare and elderly care
- Driving (heavy vehicle / taxi / bus licence)

## Who is eligible?

- A new immigrant who has made aliyah in the last 4 years
- Registered with the Ministry of Aliyah
- No age restriction

## How to redeem

1. **Choose a course** from the accredited-course list (gov.il → vocational vouchers)
2. **Request approval** from the Ministry of Aliyah — available online
3. **Register with the training institution** using the voucher approval
4. **The institution receives payment** directly from the Ministry of Aliyah

## FAQ

**Can the voucher be used for an evening course?**
Yes — most accredited vocational courses offer evening tracks.

**What if the course costs more than ₪12,000?**
You can cover the difference through the Marom scholarship, a special fund, or personal payment.

📞 **Ministry of Aliyah hotline**: *2994
`,
      am: `## ሙያ ስልጠና ቫዎቸሮች ምንድን ናቸው?

ሙያ ስልጠና ቫዎቸሮች (ሻቢም) የዓሊያ ሚኒስቴር ቫዎቸሮች ሲሆኑ ከኪሳቸው ሳይከፍሉ ታወቁ ኮርሶችን ለመከፈል ያስችላሉ።

## ምን ያህል ይሸፍናሉ?

- እስከ **12,000 ሺ"ል** ለአንድ ወይም ለብዙ ኮርሶች
- ከዓሊያ ቀን ጀምሮ **4 ዓመታት** ውስጥ ሊውሉ ይችላሉ

## ምን ኮርሶች?

- ኤሌክትሪሺያን፣ ፓምፕ ሰሪ፣ ቀለም አቃቂ
- ቴክ መሰናዶ (QA፣ UX)
- ፀጉር ቁረጥ እና ውበት
- የሕጻናት ወይም ሽማግሌ እንክብካቤ
- ሙያ ማሽከርከር ፍቃድ

## ማን ብቁ ነው?

- ከ4 ዓመታት ውስጥ ዓሊያ ያደረጉ
- ሚኒስቴሩ ተመዝጋቢ
- ዕድሜ ገደብ የለም

📞 **ሚኒስቴሩ ሞቅዳ**: *2994
`,
    },
  },

  // 24 — Absorption basket, Ethiopian-oleh angle (TED-60; corrected TED-148).
  //
  // TED-148 audit: the TED-60 version of this entry published a detailed
  // "extended basket for Ethiopian olim" — ~₪3,500/mo single, ₪6,200/mo
  // couple, a ₪2,500 "cultural adjustment grant (unique to immigrants from
  // Africa)", a ₪3,000–7,500 furniture grant, 500 free ulpan hours, 12 free
  // employment-counselling sessions, ₪12,000 vocational vouchers, and a
  // 24-month Falash Mura basket. **None of it appears on the Ministry of
  // Aliyah and Integration's own page**, and the framing itself (an
  // origin-dependent basket) is contradicted by that page, which states the
  // basket is paid "לעולים ... מכל מדינות העולם" with amounts set by family
  // status and age. Treated as fabricated per the TED-152 precedent and
  // removed wholesale.
  //
  // Replacement figures are transcribed from the official 2026 tables at
  // https://www.gov.il/he/Departments/General/absorption_basket (fetched
  // 2026-08-31; gov.il 403s WebFetch/curl, so it was read through a reader
  // proxy). Structure (airport prepaid card → bank top-up → 6 monthly
  // payments), the 24-month prior-residence rule, the one-year claim window
  // and the income-independence of eligibility all come from that page.
  // Hotline *2994 / 03-9733333 verified on the Ministry's own appointment
  // service page — the "*2994" this entry used to print is not the
  // Ministry's number. The body states its own verification month so a
  // future reader can tell how stale the figures are.
  //
  // AM is AI-translated and not yet reviewed by a native Amharic speaker —
  // see the in-body disclaimer. This is money-related copy; native review is
  // a prerequisite before treating the AM text as final.
  {
    title: {
      he: "סל קליטה לעולים מאתיופיה — הסכומים והתהליך (2026)",
      en: "Absorption Basket for Ethiopian Olim — Amounts and Process (2026)",
      am: "ለኢትዮጵያ ኦሊሞች የመቀበያ ቅርጫት — መጠኖችና ሂደት (2026)",
    },
    slug: {
      he: "klita-basket-ethiopia",
      en: "klita-basket-ethiopia",
      am: "klita-basket-ethiopia",
    },
    govUrl: "https://www.gov.il/he/Departments/General/absorption_basket",
    eligibilitySummary: {
      he: "סל הקליטה ניתן לעולים מכל מדינות העולם; הסכום נקבע לפי מצב משפחתי, גיל ומספר ילדים — לא לפי ארץ מוצא. יחיד: 21,694 ₪ בסך הכל (לוח רשמי 2026). לעולי אתיופיה יש מסלולים נוספים סביב מרכזי הקליטה.",
      en: "The absorption basket is paid to olim from every country; the amount is set by family status, age and number of children — not by country of origin. Single: ₪21,694 in total (official 2026 table). Ethiopian olim have additional tracks around absorption centres.",
      am: "የመቀበያ ቅርጫት ከዓለም ሁሉ ሀገራት ለመጡ ኦሊሞች ይከፈላል፤ መጠኑ በቤተሰብ ሁኔታ፣ ዕድሜና የልጆች ብዛት ይወሰናል — በትውልድ ሀገር አይደለም። ነጠላ፦ በጠቅላላ 21,694 ₪ (ኦፊሴላዊ የ2026 ሰንጠረዥ)።",
    },
    tags: ["new_immigrant", "grants", "monthly_payment", "employment"],
    bodies: {
      he: `## סל הקליטה — סיוע לאומי, לא מסלול נפרד לקהילה

סל הקליטה הוא סיוע כספי של **משרד העלייה והקליטה** לתקופת ההתארגנות הראשונה בארץ. לפי הפרסום הרשמי של המשרד, הסל ניתן לעולים שנמצאו זכאים על פי נוהל המשרד **מכל מדינות העולם**, וסכומיו נקבעים לפי **מצב משפחתי, גיל ומספר הילדים** — לא לפי ארץ המוצא.

**חשוב לדעת:** מסתובבים ברשת פירוטים של "סל מורחב ליוצאי אתיופיה" הכוללים מענקים כמו "מענק הסתגלות תרבותית" או "מענק ריהוט". **הפירוטים האלה אינם מופיעים בלוחות הרשמיים של משרד העלייה והקליטה** ואין להסתמך עליהם. מה שכן ייחודי לעולי אתיופיה — קליטה במרכזי קליטה ומענקי הדיור ביציאה מהם — מפורט בהמשך העמוד.

## הסכומים הרשמיים לשנת 2026

לפי [לוח הסיוע הכספי בסל הקליטה](https://www.gov.il/he/Departments/General/absorption_basket) באתר משרד העלייה והקליטה:

| תשלום | יחיד | משפחה חד-הורית | זוג |
| --- | --- | --- | --- |
| נתב"ג (כרטיס נטען) | 1,250 ₪ | 2,300 ₪ | 2,500 ₪ |
| השלמה לחשבון בנק | 1,544 ₪ | 1,631 ₪ | 4,023 ₪ |
| כל אחד מ-6 התשלומים החודשיים | 3,150 ₪ | 5,190 ₪ | 5,806 ₪ |
| **סך הכל** | **21,694 ₪** | **35,071 ₪** | **41,359 ₪** |

**תוספות לילדים (סך הכל לכל ילד/ה):** ילד/ה עד גיל 4 — 12,831 ₪; ילד/ה 4–18 — 8,521 ₪; בן/בת 18–21 — 11,039 ₪; תוספת למשפחה בת 6 נפשות ומעלה — 5,918 ₪.

קיימים לוחות נפרדים ל**גמלאים** ול**טרום־פנסיה** (מי שיגיע לגיל פרישה בתוך 5 שנים מהעלייה) — הסכומים שם גבוהים יותר. בדקו את הלוח הרלוונטי לכם בקישור למעלה.

**הסכומים מתעדכנים.** נבדקו מול האתר הרשמי באוגוסט 2026 — לפני שאתם מתכננים תקציב, ודאו את הסכום העדכני בלוח הרשמי או מול לשכת המשרד.

## איך משולם הסל?

- **תשלום ראשון** — למגיעים באשרת עלייה מחו"ל, ב[כרטיס נטען](https://www.gov.il/he/pages/sal-klita-card) בנמל התעופה. למי שמשנה מעמד בארץ — בהפקדה בנקאית.
- **השלמה** לחשבון הבנק.
- **6 תשלומים חודשיים** נוספים.

בתום ששת החודשים אפשר לבדוק זכאות ל[הבטחת הכנסה](https://www.btl.gov.il) כהמשך סיוע לצרכי קיום.

## מי זכאי?

- הנכנסים לראשונה לישראל באשרת "עולה", בעלי זכאות מלאה כעולים
- מי ששהו בישראל **לא יותר מ-24 חודשים** רצופים או מצטברים בשלוש השנים שקדמו לקבלת מעמד עולה
- הזכאות **אינה תלויה בגובה ההכנסה**

**חלון הזמן:** את הסל אפשר לקבל **בתוך שנה** מיום קבלת מעמד עולה. יציאה לחו"ל עוצרת את התשלומים; חידוש אפשרי רק למי ששב בתוך שנת העלייה הראשונה.

## מה שכן ייחודי לעולים מאתיופיה

- **קליטה במרכז קליטה** — בשונה מרוב העולים הנקלטים קליטה ישירה, עולים מאתיופיה נקלטים דרך מרכזי קליטה. ראו [קליטה ישירה לעולי פלשמורה](/he/rights/falash-mura-direct-absorption).
- **מענקי דיור ביציאה ממרכז קליטה** — תוכנית ייעודית של משרד הבינוי והשיכון. ראו [מענקי דיור לעולים מאתיופיה במרכזי קליטה](/he/rights/housing-grant-klita-centers).
- **סל קליטה לתלמידים** (אגרת חינוך) — סיוע נפרד של משרד החינוך. ראו [סל קליטה לתלמידים עולים](/he/rights/student-absorption-basket).

## איך פונים?

1. פותחים **חשבון בנק משותף לשני בני הזוג** בבנק מסחרי — נדרשת נוכחות של שניהם. מומלץ לעשות זאת בימים הראשונים בארץ.
2. מוסרים את פרטי החשבון בלשכת משרד העלייה והקליטה באזור מגוריכם.
3. לא משנים את מספר החשבון בשנים הראשונות; אם שיניתם — מדווחים מיד למשרד.

## קישורים רשמיים

- [משרד העלייה והקליטה — סל קליטה (כולל לוחות הסכומים)](https://www.gov.il/he/Departments/General/absorption_basket)
- [זימון תור ליועץ קליטה](https://www.gov.il/he/service/scheduling_an_appointment_to_the_ministry_of_aliyah_and_integration)

📞 **מוקד משרד העלייה והקליטה**: *2994 או 03-9733333 — א׳–ה׳, 8:30–16:00. השירות ניתן גם **באמהרית**.
`,
      en: `## The absorption basket is national — not a separate community track

The absorption basket (סל קליטה) is financial support from the **Ministry of Aliyah and Integration** for an oleh's first period in Israel. Per the Ministry's own publication, it is given to olim found eligible under Ministry procedure **from every country in the world**, and the amounts are set by **family status, age and number of children** — not by country of origin.

**Important:** breakdowns of an "extended basket for Ethiopian olim" circulate online, listing grants such as a "cultural adjustment grant" or a "furniture grant". **Those items do not appear in the Ministry of Aliyah and Integration's official tables** and should not be relied on. What genuinely is community-specific — absorption-centre intake and the housing grants paid on leaving one — is set out further down this page.

## The official 2026 amounts

Per the [absorption basket financial-aid table](https://www.gov.il/he/Departments/General/absorption_basket) on the Ministry's site:

| Payment | Single | Single-parent family | Couple |
| --- | --- | --- | --- |
| Ben Gurion Airport (prepaid card) | ₪1,250 | ₪2,300 | ₪2,500 |
| Bank-account top-up | ₪1,544 | ₪1,631 | ₪4,023 |
| Each of the 6 monthly payments | ₪3,150 | ₪5,190 | ₪5,806 |
| **Total** | **₪21,694** | **₪35,071** | **₪41,359** |

**Per-child additions (total per child):** child under 4 — ₪12,831; child 4–18 — ₪8,521; young adult 18–21 — ₪11,039; addition for a household of 6+ — ₪5,918.

Separate tables exist for **pensioners** and **pre-pension** olim (those reaching retirement age within 5 years of aliyah), where amounts are higher. Check the table that applies to you via the link above.

**These amounts change.** They were checked against the official site in August 2026 — before budgeting, confirm the current figure in the official table or with a Ministry bureau.

## How the basket is paid

- **First payment** — for those arriving from abroad on an aliyah visa, on a [prepaid card](https://www.gov.il/he/pages/sal-klita-card) at the airport. For those changing status in Israel — by bank deposit.
- A **top-up** to the bank account.
- **6 further monthly payments.**

After the six months you can check eligibility for income support (הבטחת הכנסה) at the National Insurance Institute as continued subsistence aid.

## Who is eligible?

- Those entering Israel for the first time on an "oleh" visa, with full oleh entitlement
- Those who stayed in Israel **no more than 24 months**, consecutive or cumulative, in the three years before receiving oleh status
- Eligibility **does not depend on income**

**The time window:** the basket must be claimed **within one year** of receiving oleh status. Leaving the country stops the payments; renewal is possible only for those returning within the first aliyah year.

## What genuinely is specific to Ethiopian olim

- **Absorption-centre intake** — unlike most olim, who go through direct absorption, olim from Ethiopia are absorbed via absorption centres. See [direct absorption for Falash Mura olim](/en/rights/falash-mura-direct-absorption).
- **Housing grants on leaving an absorption centre** — a dedicated Ministry of Construction and Housing programme. See [housing grants for Ethiopian olim in absorption centres](/en/rights/housing-grant-klita-centers).
- **The student absorption basket** (education fee) — separate support from the Ministry of Education. See [absorption basket for immigrant students](/en/rights/student-absorption-basket).

## How to apply

1. Open a **joint bank account for both spouses** at a commercial bank — both must be present. Do this in your first days in the country.
2. Give the account details to the Ministry of Aliyah and Integration bureau in your area.
3. Do not change the account number in the first years; if you must, report it to the Ministry immediately.

## Official links

- [Ministry of Aliyah and Integration — absorption basket (incl. amount tables)](https://www.gov.il/he/Departments/General/absorption_basket)
- [Book an appointment with an absorption adviser](https://www.gov.il/he/service/scheduling_an_appointment_to_the_ministry_of_aliyah_and_integration)

📞 **Ministry of Aliyah and Integration hotline**: *2994 or 03-9733333 — Sun–Thu, 8:30–16:00. Service is also available **in Amharic**.
`,
      am: `## የመቀበያ ቅርጫት — ብሔራዊ ድጋፍ እንጂ የተለየ የማህበረሰብ መስመር አይደለም

የመቀበያ ቅርጫት (סל קליטה) በእስራኤል ለመጀመሪያው ጊዜ ለሚደረግ ዝግጅት **በዓሊያና መቀበያ ሚኒስቴር** የሚሰጥ የገንዘብ ድጋፍ ነው። በሚኒስቴሩ ኦፊሴላዊ ህትመት መሠረት፣ በሚኒስቴሩ ሥርዓት ብቁ ሆነው ለተገኙ **ከዓለም ሁሉ ሀገራት** ለመጡ ኦሊሞች ይሰጣል፣ መጠኖቹም በ**የቤተሰብ ሁኔታ፣ ዕድሜና የልጆች ብዛት** ይወሰናሉ — በትውልድ ሀገር አይደለም።

**አስፈላጊ፦** "ለኢትዮጵያ ኦሊሞች የተስፋፋ ቅርጫት" የሚሉ ዝርዝሮች በበይነመረብ ይሰራጫሉ — እንደ "የባህል ማስተካከያ ስጦታ" ወይም "የቤት ዕቃ ስጦታ" ያሉ። **እነዚህ ነገሮች በዓሊያና መቀበያ ሚኒስቴር ኦፊሴላዊ ሰንጠረዦች ውስጥ የሉም** እና በእነሱ ላይ መተማመን የለብዎትም።

## ኦፊሴላዊ የ2026 መጠኖች

| ክፍያ | ነጠላ | ነጠላ ወላጅ ቤተሰብ | ጥንዶች |
| --- | --- | --- | --- |
| ቤን ጉሪዮን አየር ማረፊያ (ካርድ) | 1,250 ₪ | 2,300 ₪ | 2,500 ₪ |
| የባንክ ሂሳብ ማሟያ | 1,544 ₪ | 1,631 ₪ | 4,023 ₪ |
| ከ6ቱ ወርሃዊ ክፍያዎች እያንዳንዱ | 3,150 ₪ | 5,190 ₪ | 5,806 ₪ |
| **ጠቅላላ** | **21,694 ₪** | **35,071 ₪** | **41,359 ₪** |

**ለልጆች ተጨማሪ (ለእያንዳንዱ ልጅ ጠቅላላ)፦** ከ4 ዓመት በታች — 12,831 ₪፤ 4–18 — 8,521 ₪፤ 18–21 — 11,039 ₪፤ ለ6+ ሰው ቤተሰብ ተጨማሪ — 5,918 ₪።

ለ**ጡረተኞች** እና ለ**ቅድመ-ጡረታ** የተለዩ ሰንጠረዦች አሉ። **መጠኖቹ ይለወጣሉ** — በነሐሴ 2026 ተረጋግጠዋል፤ ከማቀድዎ በፊት ወቅታዊውን መጠን ያረጋግጡ።

## ቅርጫቱ እንዴት ይከፈላል?

- **የመጀመሪያ ክፍያ** — በአየር ማረፊያ በቅድመ-ክፍያ ካርድ (ከውጭ በዓሊያ ቪዛ ለሚደርሱ)፤ በእስራኤል ውስጥ ደረጃቸውን ለሚቀይሩ — በባንክ ተቀማጭ።
- ወደ ባንክ ሂሳብ **ማሟያ**።
- ተጨማሪ **6 ወርሃዊ ክፍያዎች**።

## ማን ብቁ ነው?

- በ"ኦሌ" ቪዛ ለመጀመሪያ ጊዜ ወደ እስራኤል የሚገቡ፣ ሙሉ የኦሌ ብቁነት ያላቸው
- የኦሌ ደረጃ ከማግኘታቸው በፊት በነበሩት ሦስት ዓመታት በእስራኤል **ከ24 ወራት ያልበለጠ** የቆዩ
- ብቁነቱ **በገቢ መጠን ላይ አይመሠረትም**

**የጊዜ መስኮት፦** ቅርጫቱ የኦሌ ደረጃ ካገኙበት ቀን ጀምሮ **በአንድ ዓመት ውስጥ** መጠየቅ አለበት።

## ለኢትዮጵያ ኦሊሞች በእውነት ልዩ የሆነው

- **በመቀበያ ማዕከል መቀበል** — ከኢትዮጵያ የመጡ ኦሊሞች በመቀበያ ማዕከላት በኩል ይቀበላሉ። [ለፋላሽ ሙራ ቀጥተኛ መቀበያ](/am/rights/falash-mura-direct-absorption) ይመልከቱ።
- **ከመቀበያ ማዕከል ሲወጡ የመኖሪያ ቤት ድጎማዎች** — [የመኖሪያ ቤት ድጎማዎች](/am/rights/housing-grant-klita-centers) ይመልከቱ።
- **የተማሪ መቀበያ ቅርጫት** — [ለስደተኛ ተማሪዎች መቀበያ ቅርጫት](/am/rights/student-absorption-basket) ይመልከቱ።

## እንዴት ማመልከት

1. በንግድ ባንክ **ለሁለቱም ባለትዳሮች የጋራ የባንክ ሂሳብ** ይክፈቱ — ሁለቱም መገኘት አለባቸው።
2. የሂሳብ ዝርዝሮችን በአካባቢዎ ላለው የዓሊያና መቀበያ ሚኒስቴር ቢሮ ይስጡ።
3. በመጀመሪያዎቹ ዓመታት የሂሳብ ቁጥሩን አይቀይሩ፤ ከቀየሩ ወዲያውኑ ለሚኒስቴሩ ያሳውቁ።

## ኦፊሴላዊ አገናኞች

- [የዓሊያና መቀበያ ሚኒስቴር — መቀበያ ቅርጫት](https://www.gov.il/he/Departments/General/absorption_basket)

📞 **የዓሊያና መቀበያ ሚኒስቴር መስመር**፦ *2994 ወይም 03-9733333 — እሁድ–ሐሙስ፣ 8:30–16:00። አገልግሎቱ **በአማርኛም** ይሰጣል።

*[የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግመው ይመከራል።]*
`,
    },
  },

  // 25 — Employment discrimination rights (TED-68) -------------------------
  {
    slug: {
      he: "employment-discrimination-rights",
      en: "employment-discrimination-rights",
      am: "employment-discrimination-rights",
    },
    title: {
      he: "זכויות נגד אפליה בעבודה",
      en: "Rights Against Employment Discrimination",
      am: "በሥራ ላይ አድልዎ ከሚደርስ ጥበቃ መብቶች",
    },
    govUrl: "https://www.gov.il/he/departments/topics/equal-employment-opportunity",
    eligibilitySummary: {
      he: "כל עובד ישראלי — כולל עולים חדשים ויוצאי אתיופיה — מוגן מפני אפליה בשל גזע, לאום, מוצא ועוד.",
      en: "Every employee in Israel — including new immigrants and Ethiopian-Israelis — is protected against discrimination based on race, nationality, origin, and more.",
      am: "በእስራኤል ያሉ ሁሉም ሠራተኞች — አዲስ ዓሊያዎች እና ኢትዮጵያ-እስራኤሎችን ጨምሮ — ከዘር፣ ዜግነት ወይም መሠረት ላይ ባለ አድልዎ የተጠበቁ ናቸው።",
    },
    tags: ["employment", "legal"],
    bodies: {
      he: `## חוק שוויון הזדמנויות בעבודה

**חוק שוויון הזדמנויות בעבודה, תשמ"ח-1988** אוסר על מעסיקים להפלות עובדים או מועמדים לעבודה על בסיס:

- **גזע, לאום, מוצא** — רלוונטי ביחוד ליוצאי אתיופיה
- מין, נטייה מינית, מצב משפחתי
- גיל, דת, השקפה פוליטית, מוגבלות

האיסור חל על: גיוס וסיום עבודה, תנאי שכר, קידום, הכשרה מקצועית ותנאי עבודה.

## מה מהווה אפליה?

דוגמאות נפוצות ליוצאי אתיופיה:
- סירוב גיוס בגלל מבטא, שם, או צבע עור.
- שכר נמוך יותר בתפקיד זהה לעובדים ממוצאים אחרים.
- אי-קידום למרות הכשרה שווה.
- הצקה, לעג או הערות גזעניות בסביבת העבודה.

## כיצד להגיש תלונה?

### מסלול 1 — הממונה על שוויון הזדמנויות
**משרד העבודה** מינה ממונה (חינם):
1. פנייה בכתב למשרד הממונה.
2. הממונה רשאית לפתוח חקירה ולהוציא צווים.
3. מידע: gov.il → שוויון הזדמנויות בעבודה.

### מסלול 2 — בית הדין לעבודה
- ניתן להגיש תביעה עצמאית — ממליצים להיוועץ עם עורך דין.
- **פיצוי**: עד 120,000 ₪ ללא הוכחת נזק ממשי.
- **תבקה** — מחלקת עבודה: [tebeka.org.il](https://tebeka.org.il)

### מסלול 3 — ההסתדרות
חברות בהסתדרות מקנה ייצוג וסיוע משפטי בסכסוכי עבודה.

## סמכויות הממונה

- ביקור בעסק וחקירת מסמכים.
- הוצאת צו מניעה או תיקון.
- הגשת כתב אישום פלילי נגד מעסיק מפר.

## ארגונים שיכולים לעזור

| ארגון | שירות | קשר |
|-------|--------|------|
| **תבקה** | ייעוץ משפטי חינמי | tebeka.org.il |
| **ממונה שוויון הזדמנויות** | חקירה ממלכתית | gov.il |
| **הסתדרות** | ייצוג עובד | histadrut.org.il |
| **IAEJ** | ליווי קהילתי | iaej.org.il |

## קישורים רלוונטיים

- זכויות עובד — שכר מינימום
- [זכויות עולה — סל קליטה](/he/rights/klita-basket-ethiopia)`,

      en: `## Equal Employment Opportunity Law

**Israel's Equal Employment Opportunity Law (1988)** prohibits employers from discriminating against employees or job applicants based on:

- **Race, nationality, or origin** — directly relevant to Ethiopian-Israelis
- Gender, sexual orientation, marital status
- Age, religion, political views, disability

The prohibition covers: hiring, termination, wages, promotion, training, and working conditions.

## What Counts as Discrimination?

Common examples for Ethiopian-Israelis:
- Rejection based on accent, name, or skin color.
- Lower pay for the same role compared to colleagues of other backgrounds.
- Blocked promotion despite equal qualifications.
- Harassment, mockery, or racist remarks in the workplace.

## How to File a Complaint?

### Track 1 — Equal Opportunity Commissioner
The **Ministry of Labor** has appointed a Commissioner (free of charge):
1. Submit a written complaint to the Commissioner's office.
2. The Commissioner may open an investigation and issue orders.
3. Info: gov.il → Equal Employment Opportunity.

### Track 2 — Labor Court
- You may file an independent lawsuit — consult a lawyer first.
- **Compensation**: up to ₪120,000 without proving actual damages.
- **TEBEKA** — Employment department: [tebeka.org.il](https://tebeka.org.il)

### Track 3 — Histadrut (Labor Federation)
Histadrut membership grants representation and legal support in labor disputes.

## Commissioner's Powers

- Inspect workplaces and review documents.
- Issue injunctions or correction orders.
- File criminal charges against employers who violate the law.

## Organizations That Can Help

| Organization | Service | Contact |
|--------------|---------|---------|
| **TEBEKA** | Free legal consultation | tebeka.org.il |
| **Equal Opportunity Commissioner** | State investigation | gov.il |
| **Histadrut** | Worker representation | histadrut.org.il |
| **IAEJ** | Community support | iaej.org.il |

## Related Rights

- Worker's rights — minimum wage
- [Olim rights — klita basket](/en/rights/klita-basket-ethiopia)`,

      am: `## የሥራ ዕድል እኩልነት ሕግ

**የእስራኤል የሥራ ዕድል እኩልነት ሕግ (1988)** አሠሪዎች ሠራተኞቻቸውን ወይም ሥራ ፈላጊዎቻቸውን እንዲህ ባሉ ምክንያቶች እንዳያዳሉ ይከለክላል:

- **ዘር፣ ዜግነት ወይም ምንጭ** — ለኢትዮጵያ-እስራኤሎች ቀጥታ ተዛማጅ
- ፆታ፣ ዕድሜ፣ ሃይማኖት፣ አካል ጉዳት

ክልከላው የሚሸፍነው: ቅጥር፣ ሥራ ማቋረጥ፣ ደመወዝ፣ ዕድገት እና የሥራ ሁኔታ ነው።

## ቅሬታ ለማቅረብ

### ምልክት 1 — የሥራ ዕድል እኩልነት ኮሚሽነር
- ለሚኒስቴሩ ኮሚሽነር ጽሑፍ ቅሬታ ያቅርቡ።
- ኮሚሽነሩ ምርመራ ሊጀምር ይችላል።

### ምልክት 2 — የሥራ ፍ/ቤት
- ፍ/ቤት ድረስ ሊሄዱ ይችላሉ — እስከ 120,000 ሺ"ል ካሳ ሊያገኙ ይችላሉ።
- **TEBEKA**: [tebeka.org.il](https://tebeka.org.il)

## ሊረዱ የሚችሉ ድርጅቶች

| ድርጅት | አገልግሎት |
|-------|---------|
| **TEBEKA** | ነፃ የሕግ ምክር |
| **ኮሚሽነሩ** | የመንግሥት ምርመራ |
| **IAEJ** | ማህበረሰባዊ ድጋፍ |

## ተያያዥ መብቶች

- የሠራተኛ መብቶች
- [የዓሊያ ሰል ቅሊታ](/am/rights/klita-basket-ethiopia)`,
    },
  },

  // NEW 16 — Disability benefit for Ethiopian immigrants
  {
    title: {
      he: "גמלת נכות לעולים מאתיופיה — זכויות וכיצד מגישים",
      en: "Disability Benefit for Ethiopian Immigrants — Rights and How to Apply",
      am: "ለኢትዮጵያ ስደተኞች የአካል ጉዳት ጥቅማ-ጥቅም — መብቶች እና ማመልከቻ",
    },
    slug: {
      he: "disability-benefit-ethiopians",
      en: "disability-benefit-ethiopians",
      am: "disability-benefit-ethiopians",
    },
    govUrl: "https://www.btl.gov.il/Benefits/Disability/Pages/disability_general.aspx",
    eligibilitySummary: {
      he: "עולים מאתיופיה עם נכות רפואית מוכרת זכאים לגמלת נכות מהמוסד לביטוח לאומי. תקופת המתנה עשויה לחול בשנה הראשונה. גמלה מלאה לנכות 75%+ עומדת על כ-4,500 ₪ לחודש (2025).",
      en: "Ethiopian immigrants with a recognised medical disability are entitled to BTL disability benefit. A waiting period may apply in the first year. Full benefit for 75%+ disability is approximately ₪4,500/month (2025).",
      am: 'እውቅና ያገኘ ሕክምናዊ አካል ጉዳት ያላቸው የኢትዮጵያ ስደተኞች የBTL የአካል ጉዳት ጥቅማ-ጥቅም የማግኘት መብት አላቸው። 75%+ አካል ጉዳት ለ2025 ወርሃዊ ወደ 4,500 ሺ"ል ነው።',
    },
    tags: ["health", "immigration"],
    bodies: {
      he: `## מה היא גמלת נכות?

גמלת נכות כללית (ביטוח לאומי) היא תשלום חודשי למי שנכותו מפחיתה את כושר ההשתכרות שלו בשיעור משמעותי. היא נועדה להחליף — ולו חלקית — הכנסה שאדם עם מוגבלות אינו יכול להרוויח.

---

## מי זכאי — תנאים לעולים

**לעולים שהגיעו אחרי 1.1.2000**: תקופת מתנה של **6 חודשים** מרישום בביטוח לאומי לפני הזכאות הראשונה לגמלה (למעט מקרים דחופים).

**תנאים כלליים**:
- גיל עבודה (18 עד גיל פרישה)
- נכות רפואית מוכרת של **25% לפחות** (לפי תקנות)
- ירידה בכושר השתכרות של **50% לפחות**
- לא עובד (או מרוויח מתחת לתקרה שנקבעה בחוק)

---

## דרגות הנכות וסכומי הגמלה (2025)

| דרגת נכות | סוג גמלה | סכום חודשי משוער |
|-----------|---------|----------------|
| 25–49% | גמלת נכות חלקית | ~2,200 ₪ |
| 50–74% | גמלת נכות מלאה | ~3,500 ₪ |
| 75–100% | גמלת נכות מלאה + תוספות | ~4,500–6,200 ₪ |

בנוסף ניתן לקבל: **תוספת שירותים מיוחדים** (אם דורשים עזרה), **תוספת תלויים** (בן/בת זוג, ילדים) ו**השלמת הכנסה** אם הגמלה נמוכה.

---

## שלב 1 — הגשת תביעה (טופס 211)

1. הורד **טופס תביעה לגמלת נכות (211)** מאתר ביטוח לאומי: [btl.gov.il](https://www.btl.gov.il)
2. מלא ביד / בעברית — אם אינך קורא עברית, פנה לעובד-סוציאלי בביטוח לאומי (ראה להלן).
3. צרף **מסמכים רפואיים**: אישורי רופאים, בדיקות, אשפוזים, תרופות קבועות.
4. הגש בסניף הביטוח הלאומי הקרוב אליך **או** דרך האתר (אם יש לך חשבון אישי).

**חשוב**: כלול **כל** האבחנות — גם נפשיות, גם פיזיות. אל תמעט בתיאור הקושי.

---

## שלב 2 — ועדה רפואית

הביטוח הלאומי מזמין אותך לוועדה רפואית שבה רופא (ולעתים ועדה של שניים-שלושה) קובעים את אחוז הנכות. טיפים:

- **הגע עם מסמכים מלאים** — כולל מסמכים בשפה אחרת (תוך הסבר בעברית על ידי עורך-דין/מתורגמן).
- **תאר את הגרוע ביותר** — כיצד הנכות מתבטאת ביום הקשה, לא ביום הטוב.
- **מותר להביא מלווה** — בן-משפחה, עובד-סוציאלי, עורך-דין.
- **ניתן לדרוש מתורגמן** — המדינה חייבת לספק (ראה: **זכות למתורגמן**).

---

## שלב 3 — ערעור על ההחלטה

אם הועדה קבעה אחוז נמוך מהצפוי, יש לך **60 יום** להגיש ערעור לוועדה רפואית לעררים. לאחר מכן ניתן לפנות לבית-דין לעבודה.

**תבקה** מסייעת בייצוג מול ביטוח לאומי: 1-800-20-20-16.

---

## עובדים סוציאליים בקהילה האתיופית

הביטוח הלאומי מעסיק **עובדים סוציאליים דוברי אמהרית** במספר ערים (תל-אביב, ירושלים, נתניה, באר-שבע, חדרה). מומלץ לבקש פגישה עם עובד סוציאלי מהקהילה לפני הגשת התביעה — הם מכירים את התהליך ומסייעים בניסוח.

📞 **ביטוח לאומי**: *6050 (שלח ב-אמהרית אפשרי)
🔗 [btl.gov.il](https://www.btl.gov.il)
`,
      en: `## Who Is Eligible

Ethiopian immigrants with a recognised medical disability of at least 25% that reduces earning capacity by 50% or more. A 6-month waiting period applies for immigrants who arrived after 1 January 2000.

## Disability Levels and Amounts (2025)

- 25–49%: approx. ₪2,200/month
- 50–74%: approx. ₪3,500/month
- 75–100%: approx. ₪4,500–6,200/month (including supplements for dependants and care)

## How to Apply

1. Download **Form 211** from btl.gov.il.
2. Attach all medical records — diagnoses, hospitalizations, regular medications.
3. Submit at your nearest BTL branch or online.
4. Attend the medical committee — bring a companion, all documents, and request an Amharic interpreter if needed.

## Appeal Rights

If the committee sets too low a percentage, you have 60 days to appeal to the Medical Appeals Committee, then to the Labour Court. TEBEKA offers free representation: 1-800-20-20-16.
`,
      am: `## ብቁ የሆኑት ማን ናቸው?

ቢያንስ 25% እውቅና ያለው ሕክምናዊ አካል ጉዳት ያለው፣ ከሥራ አቅም ቢያንስ 50% የቀነሰ ሁሉ ብቁ ነው። ከ1 ጃኑዋሪ 2000 በኋላ ለደረሱ ስደተኞች 6 ወራት የጥበቃ ጊዜ አለ።

## ማመልከቻ

1. btl.gov.il ላይ ቅጽ 211 ያውርዱ።
2. ሁሉም የሕክምና ሰነዶች ያያዙ።
3. ወደ ቅርቡ BTL ቅርንጫፍ ወይም ኦንላይን ያስገቡ።
4. ለሕክምና ኮሚቴ ይሂዱ — አስተርጓሚ ይጠይቁ።

**ቅሬታ:** 60 ቀናት ውስጥ ይቃወሙ። TEBEKA ይረዳዎታል፦ 1-800-20-20-16።
`,
    },
  },

  // NEW 17 — Veterans rights
  {
    title: {
      he: "זכויות חיילים משוחררים יוצאי אתיופיה — המדריך המלא",
      en: "Rights for Ethiopian-Israeli Veterans — The Complete Guide",
      am: "የኢትዮጵያ-እስራኤላዊ ቀድሞ ወታደሮች መብቶች — ሙሉ መመሪያ",
    },
    slug: {
      he: "veterans-rights-ethiopians",
      en: "veterans-rights-ethiopians",
      am: "veterans-rights-ethiopians",
    },
    govUrl: "https://www.gov.il/he/departments/ministry-of-defense/govil-landing-page",
    eligibilitySummary: {
      he: "חיילים יוצאי אתיופיה זכאים למענק שחרור מוגדל (150% ממענק הבסיס), תוכניות הכשרה מקצועית ייעודיות, מלגות לימוד ועדיפות בתורי דיור. כל הזכויות פעילות — חשוב לדעת לתבוע אותן.",
      en: "Ethiopian-Israeli soldiers are entitled to an enhanced discharge grant (150% of the base grant), dedicated vocational-training programs, study scholarships, and priority on housing waiting lists.",
      am: "የኢትዮጵያ-እስራኤላዊ ወታደሮች ከፍ ያለ የስራ ፈቃጃ ስጦታ (150%)፣ ሙያዊ ስልጠና ፕሮግራሞች፣ ትምህርት ምርጫ እና ቅደምተከተል በቤት ጥበቃ ዝርዝሮች ላይ የማግኘት መብት አላቸው።",
    },
    tags: ["employment", "education"],
    bodies: {
      he: `## מה ייחודי לחיילים יוצאי אתיופיה?

על-פי החלטת ממשלה המבוססת על תוכנית הייחוד לקהילה האתיופית, חיילים שזוהו כיוצאי אתיופיה (יילידי אתיופיה, ילדי יילידים, ועולי פלשמורה) זכאים למסלולי זכויות ייחודיים שאינם קיימים לשאר החיילים. הידע על זכויות אלו נמוך בקרב הקהילה, ורבים לא ממשים אותן.

---

## 1. מענק שחרור מוגדל — 150%

**מענק שחרור רגיל**: מחושב לפי חודשי שירות × נקודת שכר.
**מענק לחייל יוצא אתיופיה**: **150%** מהסכום הבסיסי — כלומר 50% תוספת.

**איך לתבוע את ה-50% הנוספים?**
1. לפני השחרור — ציין בפני קצין הסגל שאתה יוצא אתיופיה ושאתה מודע לזכות.
2. מלא **טופס ב.ל.87** (בקשה להגדלת מענק שחרור).
3. הגש לממ"ג (מרכז מיון ומידע לגיוס) שאחראי על קצבתך.
4. אם נדחית — פנה לאגף כ"א (כוח אדם) ולממשיל.

**מגבלת זמן**: יש להגיש תוך **שנה** מיום השחרור. לאחר מכן הזכאות פוקעת.

---

## 2. תוכניות הכשרה מקצועית ייעודיות

**תוכניות ייחודיות לחיילים יוצאי אתיופיה**:

| תוכנית | תחום | גוף מנהל |
|--------|------|---------|
| "נתיב לעתיד" | הייטק, פיתוח תוכנה | IEWA + משרד הקליטה |
| "הכשרות קיבוץ" | חקלאות, תיירות | תנועות קיבוציות |
| "מסלול בטחון" | שמירה, לוגיסטיקה | NESS Technologies / G4S |
| "מהנדסים בהתהוות" | מכונאות, חשמל | עמותת תבקה + ORT |

לרשימת תוכניות עדכנית: פנה לממשיל משרד הקליטה בעיר מגוריך.

---

## 3. מלגות לימוד לחיילים משוחררים

**מלגת קרן ירושלים לחיילים אתיופים**: עד 20,000 ₪ לשנת לימודים ראשונה.
**מלגת מפא"ל**: לבוגרי יחידות קרביות מהקהילה האתיופית.
**מלגות האחד-עשר**: ממנות את שנת ההכנה (מכינה) לאוניברסיטה חינם.

**תנאי כשירות משותפים**:
- שחרור לאחר שירות מלא (עד גיל 35 בד"כ)
- ממוצע בגרות / ציון פסיכומטרי (רמה משתנה לפי קרן)
- אישור ממשיל יוצאי אתיופיה

---

## 4. עדיפות בתורי דיור

על-פי נוהל משרד הבינוי, חיילים משוחררים יוצאי אתיופיה זכאים **לנקודות עדיפות** בתורי דיור ציבורי ובתוכנית הדיור הממלכתית. בפועל:

1. פנה ל**ממשיל יוצאי אתיופיה** בעירייה שלך.
2. בקש **אישור חייל משוחרר** מלשכת גיוס.
3. הגש בצירוף ת"ז, אישור שחרור, ואישור מצב משפחתי.

---

## ארגונים שמסייעים לחיילים משוחררים

| ארגון | שירות | קשר |
|-------|-------|-----|
| **IEWA** (עמותה ישראלית יהודים אתיופים) | ייעוץ, מלגות, הכשרות | iewa.org.il |
| **עמותת "בצלאל"** | אמנויות, עיצוב, מדיה | צרו קשר ישיר |
| **תבקה** | ייעוץ משפטי, תביעת זכויות | 1-800-20-20-16 |
| **ממשיל משרד הקליטה** | רכז יוצאי אתיופיה בעיר | *2994 |

---

## לוח זמנים חשוב

| פעולה | מועד אחרון |
|-------|-----------|
| תביעת מענק מוגדל | שנה מיום שחרור |
| הגשת בקשה לתוכנית הכשרה | 3 חודשים לאחר שחרור (לרוב) |
| מלגות אקדמיות | לפני מועד הגשה של המוסד |
| בקשה לעדיפות דיור | ניתן בכל עת |
`,
      en: `## What Is Unique to Ethiopian-Israeli Soldiers?

Government resolutions establish special benefit tracks for soldiers of Ethiopian origin. Awareness is low and many do not claim what they are entitled to.

**Enhanced discharge grant:** 150% of the standard base grant — 50% more. Submit Form B.L.87 before discharge, or within one year of release.

**Dedicated vocational programs:** Tech training (Nativ LaAtid), logistics, agriculture, engineering — run jointly by IEWA, the Ministry of Aliyah, and partner organisations.

**Study scholarships:** Jerusalem Foundation grants (up to ₪20,000/year), Mapal grants for combat veterans, and free university-prep year programs.

**Housing priority:** Ethiopian-Israeli veterans receive priority points on public-housing and state housing-program waiting lists. Apply via your city's Ethiopian-community liaison (Mamshil) with your discharge certificate.

Contact IEWA (iewa.org.il) or TEBEKA (1-800-20-20-16) for guidance.
`,
      am: `## ምን ልዩ ነው?

የኢትዮጵያ-እስራኤላዊ ወታደሮች ከፍ ያለ የስራ ፈቃጃ ስጦታ (150%)፣ ሙያዊ ስልጠና ፕሮግራሞች፣ ትምህርት ምርጫ እና ቅደምተከተል ዝርዝሮች ላይ ቤት የማግኘት መብት አላቸው።

**ስጦታ:** 150% ማለት 50% ተጨማሪ ነው። ከፈቃጃ ሐ/ቀን ከ1 ዓመት ውስጥ ቅጽ B.L.87 ያስገቡ።

**ስልጠና:** Nativ LaAtid (ሃይቴክ)፣ ሎጂስቲክስ፣ ምህንድስና — IEWA እና ተሳታፊ ድርጅቶች ያሄዳሉ።

**ቤት ቅደምተከተል:** ከተማዎ ማምሺል (Mamshil) ጋር ይቀናጁ።

IEWA (iewa.org.il) ወይም TEBEKA (1-800-20-20-16) ያነጋግሩ።
`,
    },
  },

  // NEW 19 — Social security for new immigrants
  {
    title: {
      he: "ביטוח לאומי לעולים מאתיופיה — מה מגיע ומתי",
      en: "National Insurance for Ethiopian Immigrants — What You Get and When",
      am: "ለኢትዮጵያ ስደተኞች ብሔራዊ ዋስትና — ምን ያገኛሉ እና መቼ",
    },
    slug: {
      he: "social-security-new-immigrants",
      en: "social-security-new-immigrants",
      am: "social-security-new-immigrants",
    },
    govUrl: "https://www.btl.gov.il/Benefits/Immigrants/Pages/default.aspx",
    eligibilitySummary: {
      he: "עולים מאתיופיה זכאים לקצבאות ילדים מיד עם העלייה. קצבת אמהות, נכות ואבטלה כפופות לתקופות המתנה. חשוב להירשם בביטוח הלאומי תוך 3 חודשים.",
      en: "Ethiopian immigrants receive child allowance from day one of aliyah. Maternity, disability, and unemployment benefits have waiting periods. Register at BTL within 3 months of arrival.",
      am: "የኢትዮጵያ ስደተኞች ከደረሱ ቀን አንስቶ የህፃናት አበል ይቀበላሉ። ለወሊድ፣ አካል ጉዳት እና ስራ አጥ ጥቅማ-ጥቅሞች የጥበቃ ጊዜ አለ። ከ3 ወራት ውስጥ ተመዝገቡ።",
    },
    tags: ["immigration", "health"],
    bodies: {
      he: `## מדוע חשוב להירשם מהר?

כל יום שאינך רשום בביטוח הלאומי הוא יום שאינו נצבר לזכויותיך. הרישום אינו אוטומטי — עליך להגיע פיזית לסניף ביטוח לאומי הקרוב **תוך 3 חודשים** מיום העלייה כדי להבטיח רצף זכאות מלא.

---

## מה מגיע מהיום הראשון?

### קצבת ילדים
**ללא תקופת המתנה** — הזכאות מתחילה מיום עליית הילד. הסכום:
- ילד ראשון: ~180 ₪/חודש
- ילד שני: ~180 ₪/חודש
- ילד שלישי ומעלה: ~245 ₪/חודש (2025)

להגשה: בקשה לקצבת ילדים (טופס 707) תוך 12 חודשים מלידה/עלייה.

---

## תקופות המתנה לקצבאות נבחרות

| קצבה | תקופת המתנה לעולה | הערות |
|------|------------------|-------|
| ילדים | אפס | מיידי |
| לידה/אמהות | 6 חודשים ממועד ביטוח | גם לנשים שכבר עלו בהיריון |
| נכות | 6 חודשים ממועד ביטוח | למעט מקרים חריגים |
| אבטלה | 6 חודשים + 12 חודשי עבודה | ראה דף "דמי אבטלה" |
| הכנסה (גמלה לשמירת הריון) | 6 חודשים | לנשים ב"שמירת הריון" |
| השלמת הכנסה | אין המתנה לעולים עם ילדים | פנה לסניף לבדיקה |

---

## מסמכים נדרשים לרישום

1. **תעודת עולה** (תעודת זהות עולה — מסופקת על-ידי משרד הקליטה)
2. **תעודת זהות ישראלית** (אם כבר הוצאה)
3. **מספר חשבון בנק ישראלי** (לתשלומים)
4. **אישור ינשוף / בדיקת דם** לרישום ילדים (אם רלוונטי)
5. **אישור מגורים** (חוזה שכירות או חשבון חשמל)

---

## קצבת אמהות לעולות

עולה שעלתה בהיריון או ילדה תוך 6 חודשים מהעלייה:
- זכאית לדמי לידה **אם** עבדה לפני הלידה (גם בחו"ל — ניתן לבדוק הכרה)
- קיימת **מענק לידה** חד-פעמי (כ-1,750 ₪) גם ללא עבודה

לעולות שלא עבדו: פנה לעובד-סוציאלי בביטוח הלאומי לבירור זכאות להשלמת הכנסה.

---

## השלמת הכנסה (גמלה לשמירת מינימום חיים)

עולים שאינם יכולים לפרנס את עצמם ואין להם הכנסה מינימלית — זכאים ל**הבטחת הכנסה** (השלמת הכנסה). בפועל הסכומים נמוכים (~3,100–4,800 ₪ לחודש לפי הרכב משפחה), אך מהווים רשת ביטחון בתקופת קליטה.

---

## מה לעשות אם סניף הביטוח הלאומי לא עונה?

- בקש פגישה עם **עובד-סוציאלי דובר אמהרית** (קיים בסניפי תל-אביב, ירושלים, נתניה, ב"ש).
- פנה ל**ממשיל יוצאי אתיופיה** בעירייה — הם יכולים להפנות ולהאיץ.
- תבקה יכולה לסייע בייצוג מול ביטוח לאומי: **1-800-20-20-16**.

📞 **ביטוח לאומי**: *6050
🔗 [btl.gov.il](https://www.btl.gov.il)
`,
      en: `## Register Within 3 Months

Registration at the National Insurance Institute (BTL) is not automatic. You must appear in person within 3 months of aliyah to protect your full benefit entitlement. Bring your teudat oleh, Israeli ID (if issued), and an Israeli bank account number.

## What You Get From Day One

**Child allowance** — no waiting period. Approximately ₪180–245/month per child (2025). Submit Form 707 within 12 months of the child's birth or aliyah.

## Waiting Periods

- Child allowance: zero (immediate)
- Maternity/birth grant: 6 months of insurance coverage
- Disability benefit: 6 months
- Unemployment benefit: 6 months + 12 months of prior work

## Maternity Benefits for New Immigrants

New-immigrant women who give birth are entitled to a one-time birth grant (approx. ₪1,750) even without prior employment. Maternity-leave pay requires prior employment in Israel or qualifying employment abroad.

## Income Support

Immigrants with no minimum income are entitled to income-support (Havtachat Hachnasah) — approx. ₪3,100–4,800/month depending on family composition.

Contact BTL: *6050 | btl.gov.il | TEBEKA: 1-800-20-20-16
`,
      am: `## ከ3 ወራት ውስጥ ይመዝገቡ

የBTL ምዝገባ ራሱ አይከናወንም። ሙሉ ጥቅማ-ጥቅም ለማረጋገጥ ከደረሱ ከ3 ወራት ውስጥ ቢሮ ይሂዱ። ይዘናቸው ይምጡ፦ የዓሊያ ሰነድ፣ እስራኤላዊ ID (ካለ)፣ ባንክ አካውንት ቁጥር።

## ከቀን 1 ምን ያገኛሉ?

**የህፃናት አበል** — ምንም ጥበቃ ጊዜ የለም። ወደ 180–245 ሺ"ል/ወር ለእያንዳንዱ ልጅ (2025)። ቅጽ 707 ከ12 ወራት ውስጥ ያስገቡ።

## የጥበቃ ጊዜዎች

- ህፃናት አበል፦ አለ
- ወሊድ፦ 6 ወራት ዋስትና
- አካል ጉዳት፦ 6 ወራት
- ስራ አጥ፦ 6 ወራት + 12 ወራት ሥራ

BTL፦ *6050 | btl.gov.il | TEBEKA፦ 1-800-20-20-16
`,
    },
  },

  // NEW 20 — Health insurance rights
  {
    title: {
      he: "ביטוח בריאות ממלכתי לעולים — שיניים, עיניים ותרופות",
      en: "National Health Insurance for Immigrants — Dental, Vision, and Medications",
      am: "ለስደተኞች ብሔራዊ የጤና ዋስትና — ጥርስ፣ ዓይን እና መድሃኒቶች",
    },
    slug: {
      he: "health-insurance-rights",
      en: "health-insurance-rights",
      am: "health-insurance-rights",
    },
    govUrl: "https://www.gov.il/he/departments/ministry-of-health/govil-landing-page",
    eligibilitySummary: {
      he: "כל עולה חדש חייב בחוק הבריאות הממלכתי מיום העלייה. לעולים בשנה הראשונה יש זכות לטיפול שיניים חינמי ועיניים מוזל. מאז 2015 — בריאות הנפש כלולה בסל הבסיסי.",
      en: "Every new immigrant is covered by the National Health Insurance Law from day one of aliyah. In the first year, immigrants receive free dental care and subsidised vision care. Mental health has been in the basic basket since 2015.",
      am: "ሁሉም አዲስ ስደተኛ ከደረሰ ቀን አንስቶ የብሔራዊ ጤና ዋስትና ሕግ ይሸፍናቸዋል። በመጀመሪያ ዓመት ነፃ የጥርስ ህክምና እና ቀናሽ ዓይን ህክምና አለ።",
    },
    tags: ["health", "immigration"],
    bodies: {
      he: `## חוק ביטוח בריאות ממלכתי — הבסיס

על-פי **חוק ביטוח בריאות ממלכתי (1994)**, כל תושב ישראל — כולל עולה חדש — זכאי לסל שירותי הבריאות הבסיסי **מיום עלייתו** ללא תקופת המתנה. אין צורך לחכות, אין צורך לשלם פרמיה ראשונה לפני הטיפול.

---

## בחירת קופת-חולים

קיימות ארבע קופות חולים בישראל:

| קופה | חוזק לקהילה האתיופית |
|------|---------------------|
| **כללית** | הקופה הגדולה, מרפאות בכל עיר, ניסיון עם קהילה אתיופית |
| **מכבי** | שירותים דיגיטליים מפותחים, אפליקציה טובה |
| **מאוחדת** | מחירים תחרותיים לתרופות, נוכחות בפריפריה |
| **לאומית** | רשת מרפאות רחבה |

**המלצה לעולים חדשים**: כללית — בזכות נוכחות בכל עיר ו**תוכנית "תנא בריאות"** שמכוונת לקהילה האתיופית ומציעה אחיות קהילה דוברות אמהרית.

---

## זכויות ייחודיות לעולים בשנה הראשונה

### טיפול שיניים
עולים בשנה הראשונה זכאים ל**פשה שיניים ציורית** (בסיסית) חינם בקופת-חולים. הסל כולל:
- בדיקת שיניים שנתית
- ניקוי וצילום
- עקירות וסתימות בסיסיות

לאחר שנה — השיניים עוברים לביטוח שיניים פרטי (משלימים), מה שמייקר משמעותית.

### ראייה ועיניים
עולים בשנה הראשונה זכאים ל**בדיקת עיניים חינמית** אחת ול**הנחה בקנייה משקפיים** (30–50% דרך קופת-חולים).

---

## בריאות הנפש — מהפכת 2015

מאז **ינואר 2015**, טיפול בבריאות הנפש הוכנס לסל הבסיסי של כל קופות-החולים. כל מבוטח זכאי ל:
- **15 פגישות שנתיות** עם פסיכולוג/פסיכיאטר ללא תשלום נוסף (חלקן בתשלום עצמי נמוך)
- תרופות פסיכיאטריות כחלק מהסל

**לקהילה האתיופית**: חשוב מאוד. שיעורי PTSD (מנסיון המסע לישראל, אבדן קרובים, טראומת קהילה) גבוהים — ופנייה לעזרה היא זכות, לא חולשה.

---

## תנא בריאות ואחיות קהילה

**תנא בריאות** הוא שירות בריאות ייחודי לקהילה האתיופית, פועל דרך כללית. מציע:
- **אחיות קהילה דוברות אמהרית** שמבקרות בבית ומסייעות בניווט המערכת
- **תוכנית "גשר לבריאות"** — סיוע בפגישות ראשוניות
- חינוך בריאות בהתאמה תרבותית
- ליווי לידה ולפני לידה

לבירור: [kupa.health.gov.il](https://www.kupa.health.gov.il) — חפש "תנא בריאות".

---

## רופאים דוברי אמהרית

ניתן לבקש רופא או אחות ספציפי בקופה. מומלץ לבקש בפה מלא: "יש לי קושי עם עברית, האם יש רופא/אחות דוברת אמהרית במרפאה?" — לעתים קרובות התשובה חיובית.

**מאגר רופאים אתיופים** — תבקה עובדת על פרסום רשימה. ניתן לשאול ישירות.

---

## תרופות ועלויות השתתפות

גם בסל הבסיסי יש השתתפות עצמית (תשלום בכיס). לעולים עם הכנסה נמוכה ניתן לקבל **פטור/הנחה** — פנה לקופת-חולים ובקש "כרטיס ממעמד נמוך" (ניסוח לפי קופה).

---

## איך נרשמים?

1. הגע לסניף כל אחת מקופות-החולים
2. הצג **תעודת עולה** + **ת"ז**
3. ביקורת ראשונה ניתן לקבוע מיד
4. ילדים: הירשמו גם אותם — ייתכן שצריך רישום נפרד

📞 **כללית**: 03-7472010 | **מכבי**: *3555 | **מאוחדת**: *3833 | **לאומית**: *507
`,
      en: `## Coverage From Day One

The National Health Insurance Law (1994) covers every Israeli resident — including new immigrants — from the day of aliyah. No waiting period, no initial premium required.

## Choosing a Sick Fund

Four sick funds operate in Israel. For new immigrants from Ethiopia, **Clalit** is often recommended because of its wide clinic network and the **Tene Briut** program, which provides Amharic-speaking community nurses.

## Special First-Year Rights

- **Dental:** Basic dental care (check-up, cleaning, X-rays, basic fillings and extractions) is free for immigrants in their first year.
- **Vision:** One free eye exam and a 30–50% discount on glasses in the first year.
- **Mental health:** Since January 2015, mental health is in the basic basket — 15 annual sessions with a psychologist or psychiatrist at low or no co-pay. Psychiatric medications are covered.

## Tene Briut

Tene Briut (תנא בריאות) is a Clalit program specifically for the Ethiopian community, offering Amharic-speaking nurses who make home visits and help navigate the healthcare system.

## How to Register

1. Visit any sick-fund branch with your teudat oleh and Israeli ID.
2. First appointment can be scheduled immediately.
3. Register children separately if needed.
`,
      am: `## ከቀን 1 ሽፋን

ሁሉም ስደተኞች ከደረሱ ቀን አንስቶ ያለ ጥበቃ ጊዜ ተሸፍነዋል።

**ከሚሸፈኑ አገልግሎቶች፦**
- **ጥርስ:** ነፃ መሰረታዊ የጥርስ ህክምና (ምርመራ፣ ማጽጃ፣ ቅደምተከተሎች) — 1ኛ ዓመት
- **ዓይን:** አንድ ነፃ ምርመራ + 30–50% ቅናሽ በመነጽር — 1ኛ ዓመት
- **የአዕምሮ ጤና:** ከ2015 ጀምሮ ዋስትናው ውስጥ ተካቷል — 15 ዓመታዊ ስብሰባዎች

**Tene Briut (תנא בריאות):** Clalit በኢትዮጵያ ማህበረሰብ ለሚሰጠው ፕሮግራም — አማርኛ ተናጋሪ ነርሶች።

ለምዝገባ፦ ማንኛውም የሕክምና ቅርንጫፍ ይሂዱ — የዓሊያ ሰነድ + ID ያምጡ።
`,
    },
  },

  // NEW 21 — Domestic violence legal protection
  {
    title: {
      he: "הגנה משפטית מאלימות במשפחה — מדריך לנשים יוצאות אתיופיה",
      en: "Legal Protection From Domestic Violence — Guide for Ethiopian-Israeli Women",
      am: "ከቤተሰብ ጥቃት የሕግ ጥበቃ — ለኢትዮጵያ-እስራኤላዊ ሴቶች መመሪያ",
    },
    slug: {
      he: "domestic-violence-legal-protection",
      en: "domestic-violence-legal-protection",
      am: "domestic-violence-legal-protection",
    },
    govUrl: "https://www.gov.il/he/departments/units/domestic-violence-unit",
    eligibilitySummary: {
      he: "כל אישה שנפגעת מאלימות בית יכולה לקבל צו הגנה באותו יום — ללא קשר למעמד ויזה, מספר שנות נישואין או מצב כלכלי. הממשלה מחויבת לספק מגורים ודמי מחייה בשלב החירום.",
      en: "Any woman suffering domestic violence can receive a protection order the same day — regardless of visa status, length of marriage, or financial situation. The state must provide emergency housing and living expenses.",
      am: "ማንኛውም ሴት የቤተሰብ ጥቃት ሲደርስባት ያን ዕለት የጥበቃ ትዕዛዝ ልታገኝ ትችላለች — ከቪዛ ሁኔታ፣ ዓመታት ጋብቻ ወይም ኢኮኖሚ ሁኔታ ሳይዘዘ።",
    },
    tags: ["family", "legal"],
    bodies: {
      he: `## חשיבות מיוחדת לקהילה האתיופית

ועדת-מומחים בין-משרדית שהוקמה בעקבות שורת רציחות של נשים יוצאות אתיופיה (2014–2020) הכירה בכשל מערכתי: חסמי שפה, בושה תרבותית, חשש ממשטרה, ובידוד מקהילה — כולם מונעים מנשים לבקש עזרה בזמן. הדף הזה נועד לשנות זאת.

---

## צו הגנה — הכלי המהיר ביותר

**צו הגנה** הוא צו שיפוטי שמחייב את המתעלל לעזוב את הבית, לא להתקרב לאישה ולא ליצור קשר. ניתן לקבל ב**אותו יום** על-ידי:

1. פנייה לקב"ס (קצין/ת בטחון סוציאלי) בלשכת הרווחה בעירייה
2. **בית-משפט לענייני משפחה** — ניתן להגיע ישירות ולבקש צו דחוף ללא עורך-דין

**מה הצו יכול לכלול?**
- פינוי הבעל מהבית (גם אם הבית על שמו)
- איסור התקרבות פיזית
- איסור תקשורת כלשהי (טלפון, הודעות, שליחים)
- הסדרת משמורת זמנית על הילדים

---

## מקלטים זמינים לנשים מהקהילה האתיופית

| גוף | שירות | טלפון |
|-----|-------|-------|
| **ויצ"ו (WIZO)** | מקלטים בערים גדולות | 1-800-500-550 |
| **נעמת** | מקלטים + ייעוץ | 1-800-505-360 |
| **ל.א.ה (ארגון נשים אתיופיות)** | מלווה אמהרית | ירושלים, ת"א |
| **ELEM** | מקלטי נוער (מתחת לגיל 18) | 1201 |

**קו חירום ארצי לאלימות במשפחה**: **118** (פועל 24/7, ניתן לשוחח באמהרית)

---

## המצב המשפטי בעת פרידה

**מעמד ויזה**: אם את תושבת ישראל (מתושבת ארעית ועלייה) — הגירושין אינם פוגעים במעמדך. אם את בתהליך גיור/אזרחות — פנה מיד לעורך-דין לפני עזיבה.

**מזונות ילדים**: בישראל אישה נפרדת זכאית לתשלומי מזונות מהאב — ראה "זכויות אמהות חד-הוריות".

**רכוש**: בישראל חל **עקרון שיתוף הנכסים** — כל נכס שנצבר בנישואין שייך לשני הצדדים. גם אם הדירה על שם הבעל.

---

## שלבי פעולה מיידיים

**שלב 1 — ביטחון מיידי**:
- התקשרי ל**118** (חם לאלימות)
- אם בסכנה מיידית — **100** (משטרה)
- צאי מהבית עם ילדים, ת"ז, ומסמכי הבנק

**שלב 2 — תיעוד**:
- צלמי פציעות (בנוכחות עדה)
- שמרי הודעות, ציינו תאריכים
- בקרי רופא — לבקש תיעוד רפואי מפורש על הסיבה

**שלב 3 — דיווח**:
- לעו"ס בלשכת הרווחה (קב"ס) — היא זו שפותחת תיק ומתאמת עם בית-המשפט
- לאגף הסיוע המשפטי (חינם לפי הכנסה)

---

## ועדה בין-משרדית ועינויים מיוחדים

ועדת גדות (2022) קבעה שיש הקצות תקציב לתוכניות ייחודיות לנשים מהקהילה האתיופית, כולל:
- קציני קשר דוברי אמהרית במשטרה
- עובדות סוציאליות מהקהילה בכל עיר עם אוכלוסייה אתיופית משמעותית
- מקלטי חירום עם דוברת אמהרית

---

## ארגונים שמסייעים

- **תבקה**: 1-800-20-20-16 — ייצוג בגירושין, צווי הגנה, מזונות
- **קו חם ל-118**: 24/7, כולל אמהרית
- **ל.א.ה**: ארגון ייחודי לנשים יוצאות אתיופיה — ירושלים ות"א
- **הסיוע המשפטי הממשלתי**: 1-700-706-060
`,
      en: `## Why Ethiopian-Israeli Women Face Special Barriers

An inter-ministerial expert committee established following a series of murders of Ethiopian-origin women (2014–2020) identified systemic failures: language barriers, cultural shame, fear of police, and community isolation all prevent women from seeking timely help.

## The Protection Order — Fastest Legal Tool

A protection order (Tzav Hagana) is a court order requiring the abuser to vacate the home, maintain distance, and cease all contact. It can be obtained the same day by:
1. Contacting the Social Welfare Officer (Kabit'z) at your municipality's welfare office.
2. Applying directly at a Family Court — no lawyer needed for an emergency order.

The order can include eviction of the abuser (even if the home is in his name), prohibition on any contact, and temporary child-custody arrangements.

## Emergency Resources

- **National domestic-violence hotline: 118** (24/7, Amharic available)
- **Police: 100**
- **WIZO shelters: 1-800-500-550**
- **Na'amat shelters: 1-800-505-360**
- **TEBEKA (legal):** 1-800-20-20-16

## Financial Safety Net During Separation

When leaving, you are entitled to emergency housing, alimony (if children are involved), and property rights over any assets accumulated during marriage. Visa status does not affect these rights for Israeli residents.
`,
      am: `## ዋና መሳሪያ — የጥበቃ ትዕዛዝ

የጥበቃ ትዕዛዝ ተበዳዩ ቤቱን ለቆ እንዲወጣ፣ ቅርበትን እና ማናኛውም ግንኙነትን ይከለክላል። ያን ዕለቱ ልታገኝ ትችያለሽ፦
1. ማዘጋጃ ቤቱ ሶሻል ዌልፌር ቢሮ ወደ ቃቢዝ ቅደሚ።
2. ወደ ቤተሰብ ፍ/ቤት ሂጂ — ጠበቃ ሳያስፈልግ።

## አስቸኳይ ቁጥሮች

- **የቤተሰብ ጥቃት ስልክ: 118** (24/7፣ አማርኛ አለ)
- **ፖሊስ: 100**
- **WIZO: 1-800-500-550**
- **TEBEKA: 1-800-20-20-16**

## ልዩነቶቹ

ጋብቻ ጊዜ የተሰበሰበ ማናኛውም ንብረት ለሁለቱም ባልና ሚስት ነው — ቤቱ ባሏ ስም ቢሆን እንኳ። ቪዛ ሁኔታ ለእስራኤሎች ነዋሪዎቻቸው መብቶቻቸውን አይነካም።
`,
    },
  },

  // NEW 22 — Single mothers rights
  {
    title: {
      he: "זכויות אמהות חד-הוריות יוצאות אתיופיה",
      en: "Rights for Ethiopian-Israeli Single Mothers",
      am: "ለኢትዮጵያ-እስራኤላዊ አንድ-ወላጅ እናቶች መብቶች",
    },
    slug: {
      he: "rights-for-single-mothers",
      en: "rights-for-single-mothers",
      am: "rights-for-single-mothers",
    },
    govUrl: "https://www.btl.gov.il/Benefits/Alimony/Pages/default.aspx",
    eligibilitySummary: {
      he: "אם חד-הורית יוצאת אתיופיה זכאית: למזונות מובטחים מביטוח לאומי, למעון מסובסד (80–100%), לדיור בעדיפות, ולסיוע בהכשרה מקצועית. אין צורך להמתין לגירושין רשמיים בחלק מהמקרים.",
      en: "Single mothers receive guaranteed alimony from BTL, subsidised daycare (80–100%), priority housing, and professional retraining support. Some benefits do not require finalised divorce proceedings.",
      am: "አንድ-ወላጅ እናቶች ከBTL የተረጋገጠ ምግብ ድጎማ፣ ቀናሽ የህፃናት መጠበቅ (80–100%)፣ ቅደምተከተሉ ቤት እና ሙያዊ ስልጠና ድጋፍ ያገኛሉ።",
    },
    tags: ["family", "employment"],
    bodies: {
      he: `## הקונטקסט: למה הדף הזה חשוב?

אמהות חד-הוריות מהקהילה האתיופית מתמודדות עם שכבת אתגרים נוספת: חלק גדול מהאבות נמצאים מחוץ לישראל (אתיופיה, ארה"ב), ניהול מאבק מזונות בינלאומי מורכב, ו**חוסר מידע** על הזכויות הקיימות בישראל. מטרת הדף הזה: לתת את כל המידע במקום אחד.

---

## 1. מזונות מובטחים מביטוח לאומי

**מזונות מובטחים** הוא מנגנון שבו **ביטוח לאומי משלם לאישה** את המזונות הקבועים בפסיקת בית-משפט — ואחר-כך גובה מהאב.

**מי זכאית?**
- אישה שיש לה פסיקת מזונות מבית-משפט
- האב **לא משלם** בפועל (בין אם בישראל ובין אם בחו"ל)
- היא **לא חיה עם האב**

**סכום**: עד **~1,520 ₪ לחודש** לילד (2025) — ביטוח לאומי ישלם עד לסכום שנפסק, ולא יותר.

**הגשה**: בקשת גמלת מזונות (טופס 551) + העתק פסק-הדין + אישור שהאב לא שילם.

---

## 2. מעון מסובסד — 80% עד 100%

ילדים של אמהות חד-הוריות בעלי הכנסה נמוכה זכאים ל**מעון מסובסד מלא** (100%) דרך משרד העבודה.

**תנאים**:
- ההכנסה החודשית נטו **מתחת לתקרה** (משתנה מדי שנה — בדוק מחשבון משרד העבודה)
- הילד בגיל 3 חודשים עד 3 שנים
- האם **עובדת, לומדת, או מוכרת כמחפשת עבודה**

**הגשה**: לשכת עבודה + אישור מצב משפחתי + הכנסות.

---

## 3. עדיפות בתורי דיור ציבורי

אמהות חד-הוריות מהקהילה האתיופית צוברות **נקודות עדיפות כפולות**: נקודות כחד-הורית + נקודות כיוצאת אתיופיה. בפועל:

1. הרשמי ב**עמידר** (החברה הממשלתית לדיור) — פתח תיק ציבורי
2. הגישי אישור: חד-הוריות + ממצב משפחתי + אתיופית
3. בקשי ייעוץ ממשיל יוצאי אתיופיה בעירייה

---

## 4. הכשרה מקצועית ומימון לימודים

**שירות התעסוקה** מציע לאמהות חד-הוריות:
- **מסלול "אמהות"** — הכשרה מקצועית בזמן שהילד במעון
- מימון חלקי ללימודים אקדמיים (מסלול שיקום)
- **תמיכה בתקופת הסבה** — קצבה חודשית להכשרה

פנה ללשכת שירות התעסוקה הקרובה + בקש "מסלול אמא חד-הורית".

---

## 5. מצב כשהאב מחוץ לישראל

**ייגוי מזונות בינלאומי** — ישראל חתומה על האמנה להכרה הדדית בפסקי-מזונות עם מספר מדינות. עבור אב באתיופיה — האמנה אינה פעילה ישירות, אך:
- **ביטוח לאומי ישלם את המזונות** ויפעל בעצמו לגביית החוב
- **לא** תצטרכי לנהל מאבק בינלאומי לבד

---

## ארגונים תומכים

| ארגון | שירות | קשר |
|-------|-------|-----|
| **IEWA (נשים יוצאות אתיופיה)** | ייעוץ, ליווי, קהילה | iewa.org.il |
| **תבקה** | ייעוץ משפטי, מזונות, גירושין | 1-800-20-20-16 |
| **ויצ"ו** | מרכזי הורים, עזרה לגננות | 1-800-500-550 |
| **ביטוח לאומי** | מזונות מובטחים, קצבת ילדים | *6050 |
| **שירות התעסוקה** | הכשרות, קצבאות | המשרד הקרוב |

---

## זכויות שאמהות רבות לא מממשות

- **הפחתת מס הכנסה** לאם חד-הורית — 2 נקודות זיכוי נוספות
- **ביטוח חיים/בריאות** מוזל דרך ההסתדרות
- **סל תרבות** — כרטיסי תיאטרון/קולנוע בסיוע (בחלק מהערים)
- **ייעוץ פסיכולוגי** — 15 פגישות בשנה בסל הבסיסי, חינם
`,
      en: `## Guaranteed Alimony

If you have a court order for child support and the father is not paying — whether in Israel or abroad — the National Insurance Institute (BTL) will pay you directly and then pursue the father for repayment. Submit Form 551 with a copy of the court order and proof of non-payment. Amount: up to approx. ₪1,520/month per child (2025).

## Subsidised Daycare

Children of low-income single mothers are eligible for 80–100% subsidised daycare for children aged 3 months to 3 years. The mother must be working, studying, or registered as a job-seeker. Apply at the Employment Service office with proof of family status and income.

## Housing Priority

Single Ethiopian-Israeli mothers accumulate double priority points — as single mothers and as Ethiopian-origin. Register with Amidar (the state housing company) and request the combined priority assessment.

## When the Father Is Abroad

If the father is in Ethiopia or elsewhere, BTL will advance the court-ordered amounts and independently pursue the debt. You do not need to manage international collection yourself.

## Key Contacts

- **BTL guaranteed alimony (Form 551):** btl.gov.il | *6050
- **IEWA (Ethiopian women):** iewa.org.il
- **TEBEKA (legal aid):** 1-800-20-20-16
- **Employment Service (retraining):** your nearest branch
`,
      am: `## ዋስትና ያለው ምግብ ድጎማ

የፍ/ቤት ትዕዛዝ ካለዎት እና አባት ካልከፈለ — BTL ቀጥታ ይከፍሉዎታል (እስከ ~1,520 ሺ"ል/ወር ለልጅ) ከዚያ አባቱ ላይ ይጠይቃል። ቅጽ 551 + ትዕዛዙ + ያልተከፈለ ማስረጃ ያቅርቡ።

## ቀናሽ የህፃናት ቤት

3 ወራት እስከ 3 ዓመት ህፃናት ለ80–100% ቀናሽ ብቁ ናቸው። ለሥራ አገልግሎት ቢሮ ያስገቡ።

## ቤት ቅደምተከተሉ

አንድ-ወላጅ + ኢትዮጵያዊ = ድርብ ቅደምተከተሉ ነጥቦች። Amidar ይመዝገቡ።

ዋና ቁጥሮች፦ BTL *6050 | TEBEKA 1-800-20-20-16 | IEWA iewa.org.il
`,
    },
  },

  // NEW 23 — Unemployment benefit guide
  {
    title: {
      he: "דמי אבטלה — מדריך מלא ליוצאי אתיופיה",
      en: "Unemployment Benefit — Complete Guide for Ethiopian-Israelis",
      am: "የስራ አጥ አበል — ለኢትዮጵያ-እስራኤሎች ሙሉ መመሪያ",
    },
    slug: {
      he: "unemployment-benefit-guide",
      en: "unemployment-benefit-guide",
      am: "unemployment-benefit-guide",
    },
    govUrl: "https://www.btl.gov.il/Benefits/Unemployment/Pages/general.aspx",
    eligibilitySummary: {
      he: "מי שעבד לפחות 12 חודשים ב-18 החודשים האחרונים ואיבד עבודה — זכאי לדמי אבטלה. חובה להירשם בשירות התעסוקה תוך 14 יום מסיום העבודה. הגמלה: 45–80% מהשכר האחרון.",
      en: "Anyone who worked at least 12 months in the last 18 months and lost their job is entitled to unemployment benefit. You must register at the Employment Service within 14 days of job loss. Benefit: 45–80% of last salary.",
      am: "ባለፉት 18 ወራት ቢያንስ 12 ወራት የሰራ እና ሥራ ያጣ ሁሉ የስራ አጥ አበል ይገባዋል። ሥራ ካጡ ከ14 ቀናት ውስጥ ይመዝገቡ። ጥቅማ-ጥቅም፦ ከመጨረሻ ደሞዝ 45–80%።",
    },
    tags: ["employment"],
    bodies: {
      he: `## למי מגיע?

**תנאי הזכאות הבסיסיים**:
1. **עבד לפחות 12 חודשים** מתוך 18 החודשים שלפני האבטלה (בתשלום ביטוח לאומי)
2. **אבד מקום העבודה שלא באשמתו** — פיטורין, סגירת עסק, פקיעת חוזה. **לא תקף**: התפטרות ללא עילה מוצדקת
3. **נרשם בשירות התעסוקה** תוך **14 ימים** מסיום העבודה
4. גיל **18–67** (מתחת לגיל פרישה)

---

## שיעור הגמלה

שיעור דמי האבטלה תלוי במשך שעות עבודה ובמצב משפחתי:

| מצב | שיעור מהשכר |
|-----|------------|
| רווק/ה, ללא ילדים, 3 חודשים ראשונים | 50% |
| מחודש 4 ואילך | 45% |
| עם ילדים / פרנס יחיד | 60–80% |

**תקרת גמלה**: מחושבת עד שכר מקסימלי מוגדר — לא ניתן לקבל יותר מ~800 ₪/יום (2025).

---

## כיצד נרשמים?

### שלב 1 — רישום בשירות התעסוקה (14 ימים!)
1. הגע ל**לשכת שירות התעסוקה** הקרובה אליך
2. הצג: **ת"ז, מכתב פיטורין, תלושי שכר** (3 אחרונים לפחות), **אישור תקופת עבודה** מהמעביד האחרון
3. תקבל מועד לדיווח חודשי

**חשוב**: אם לא נרשמת תוך 14 יום — תאבד ימים מהגמלה לכל יום איחור.

### שלב 2 — הגשת תביעה לביטוח לאומי
הרישום בשירות התעסוקה מפעיל אוטומטית את הזכאות לביטוח לאומי — **אין צורך להגיש תביעה נפרדת** בד"כ.

---

## משך הגמלה

| גיל | משך מקסימלי |
|-----|-----------|
| 25–35 | 70 ימים (תקופה ראשונה) |
| 35–45 | 100 ימים |
| 45–67 | 138 ימים |
| עם 5+ ילדים | תוספת |

---

## חובות הדיווח

**מדי חודש** יש לדווח לשירות התעסוקה:
- שהמשכת לחפש עבודה
- שלא עבדת (אפילו יום אחד) ללא דיווח
- שלא יצאת לחו"ל ביום יש לך זכאות

**עבודה חלקית**: ניתן לעבוד עד ימים מסוימים בחודש ועדיין לקבל גמלה — לשאול על "ביום-העבודה" בלשכה.

---

## ערעור על דחיית תביעה

אם הביטוח הלאומי דחה את תביעתך:
1. תוך **30 ימים**: הגש **ערעור לביטוח לאומי** (בכתב + הסבר)
2. אם נדחה שנית: **בית-דין לעבודה** (חינם להגשה)
3. **תבקה** מסייעת בייצוג: 1-800-20-20-16

**סיבות נפוצות לדחייה**:
- נרשמת מאוחר מ-14 יום — ניתן לערער על נסיבות
- פיטורין תוך 6 חודשים מעלייה (תקופת המתנה עדיין חלה)
- מכתב פיטורין חסר — ניתן לבקש ממעביד בכתב

---

## הכשרה מקצועית תוך קבלת אבטלה

כשאתה מקבל דמי אבטלה, אתה זכאי להיכנס ל**תוכנית הכשרה מקצועית מסובסדת** — לא מפסיקים את הגמלה, ויכולים גם להאריך אותה.

לבקש ב**לשכת שירות התעסוקה**: "אני רוצה להצטרף לתוכנית הכשרה." יש ריכוז מסלולים ייחודיים לקהילה האתיופית (ראה: **זכויות חיילים משוחררים**).

📞 **ביטוח לאומי**: *6050
📞 **שירות התעסוקה**: *8631
`,
      en: `## Who Is Eligible?

Anyone who worked at least 12 of the last 18 months (with National Insurance contributions), lost their job without fault (dismissal, contract expiry, business closure — not voluntary resignation), and registered at the Employment Service within 14 days of job loss.

## Benefit Rate

- Single, no children (months 1–3): 50% of last salary
- From month 4: 45%
- With children or sole breadwinner: 60–80%
- Daily cap: approx. ₪800 (2025)

## Duration

- Age 25–35: 70 days
- Age 35–45: 100 days
- Age 45–67: 138 days

## How to Apply

1. Go to the nearest Employment Service office within 14 days — every late day means lost benefit.
2. Bring: ID, termination letter, last 3 salary slips, employment-period confirmation.
3. BTL entitlement activates automatically — no separate claim needed in most cases.

## Appeal

If rejected: appeal in writing within 30 days. TEBEKA (1-800-20-20-16) can assist with representation before BTL and the Labour Court.
`,
      am: `## ብቁ ማን ነው?

ያለፉ 18 ወራት ቢያንስ 12 ወራት ሰርቶ ያለ ጥፋቱ ሥራ ያጣ እና ከ14 ቀናት ውስጥ የሥራ አገልግሎት ቢሮ ተመዝግቦ።

## የጥቅማ-ጥቅም ደረጃ

- ሦስቱ የመጀመሪያ ወራት (ብቸኛ)፦ ከደሞዝ 50%
- ከ4ኛ ወር፦ 45%
- ልጆች ካሉ / ብቸኛ አስተዳዳሪ፦ 60–80%

## እንዴት ይቀርቡ?

1. ከ14 ቀናት ውስጥ ወደ ሥራ አገልግሎት ቢሮ ሂዱ — እያንዳንዱ ዘገዬ ቀን ጥቅማ-ጥቅሙን ያጣል።
2. ID፣ ማሰናበቻ ደብዳቤ፣ ለ3 ወር የደሞዝ ሰነዶች ያምጡ።

ቅሬታ ካለ፦ TEBEKA 1-800-20-20-16
`,
    },
  },

  // NEW 24 — Nursing benefit for elderly
  {
    title: {
      he: "גמלת סיעוד לקשישים — זכויות הורים קשישים יוצאי אתיופיה",
      en: "Nursing Benefit for the Elderly — Rights of Elderly Ethiopian-Israeli Parents",
      am: "ለሽማግሌ ወላጆች የነርሲንግ ጥቅማ-ጥቅም — የኢትዮጵያ-እስራኤላዊ ሽማግሌዎች መብቶች",
    },
    slug: {
      he: "nursing-benefit-elderly",
      en: "nursing-benefit-elderly",
      am: "nursing-benefit-elderly",
    },
    govUrl: "https://www.btl.gov.il/Benefits/Nursing/Pages/default.aspx",
    eligibilitySummary: {
      he: "קשישים יוצאי אתיופיה שמתקשים בפעולות יומיומיות זכאים לגמלת סיעוד מביטוח לאומי — 4,000 עד 9,000 ₪ לחודש, בהתאם לרמת הסיעוד. עובדים סוציאליים של ביטוח לאומי מגיעים הביתה לבדיקה.",
      en: "Elderly Ethiopian-Israelis who need help with daily activities are entitled to a nursing benefit from BTL — ₪4,000 to ₪9,000/month depending on care level. BTL social workers can conduct home visits.",
      am: 'ዕለታዊ ተግባራትን ለማከናወን እርዳታ የሚያስፈልጋቸው የኢትዮጵያ-እስራኤላዊ ሽማግሌዎች ከBTL የነርሲንግ ጥቅማ-ጥቅም የማግኘት መብት አላቸው — 4,000 እስከ 9,000 ሺ"ል/ወር።',
    },
    tags: ["health", "family"],
    bodies: {
      he: `## מה היא גמלת סיעוד?

גמלת סיעוד (ביטוח לאומי) מיועדת לקשישים הזקוקים לסיוע בפעולות חיי היומיום. היא **אינה** תלויה בהכנסה — כל קשיש שעומד בתנאים זכאי, ללא קשר לחסכונות.

---

## תנאי זכאות בסיסיים

| תנאי | פרט |
|------|-----|
| **גיל** | נשים מגיל 60 / גברים מגיל 65 |
| **תושבות** | תושב ישראל רשום |
| **צורך בסיוע** | קושי ב-2 פעולות לפחות מתוך 6 (לבישה, אכילה, ניידות, היגיינה, שליטה בצרכים, תקשורת) |
| **בדיקה רפואית** | ממוצעת ביטוח לאומי — ביקור בית |

---

## רמות הסיעוד וסכומי הגמלה (2025)

| רמה | קושי | שווי גמלה בחודש |
|-----|------|----------------|
| 1 (קל) | 2 פעולות | ~4,200 ₪ |
| 2 (בינוני) | 3–4 פעולות | ~5,800 ₪ |
| 3 (כבד) | 5–6 פעולות | ~7,500 ₪ |
| סיעוד מלא | 6 פעולות + בית אבות | ~9,000 ₪ |

הגמלה ניתנת **בצורת שירות** — מטפל/ת ביתי שנשלח דרך חברה מאושרת — ולא כמזומן בד"כ.

---

## אתגרים ייחודיים לקהילה האתיופית

### חסם שפה
קשיש שאינו דובר עברית מתקשה לתאר מצבו לפני הוועדה. **יש לדרוש מתורגמן לאמהרית** מראש. ביטוח לאומי מחויב לספק — ראה דף "זכות למתורגמן".

### צרכים תרבותיים
הגמלה אמורה להותאם לצרכי המטופל. ניתן לבקש **מטפלת ביתית מהקהילה האתיופית** המכירה:
- תזונה ייחודית (אינג'רה, ירקות מסורתיים)
- שפה (אמהרית, תיגריניה)
- מנהגים דתיים (חגים, ניקוי, תפילות)

לדרוש בכתב מחברת הסיעוד: "אבקש מטפלת מהקהילה האתיופית."

---

## שלבי הגשה

1. **הגשת בקשה**: לסניף ביטוח לאומי — טופס "תביעה לגמלת סיעוד" (טופס 510 או דיגיטלי)
2. **ביקור בית**: עובד/ת סוציאלי/ת מטעם ביטוח לאומי יגיע לבדוק את מצב הקשיש בביתו
3. **החלטה**: תוך 30 ימים (בד"כ)
4. **בחירת מטפל**: הקשיש בוחר מחברה רשומה ברשימה מאושרת

---

## ביקורי בית לקהילה האתיופית

**ביטוח לאומי משתדל** לשלוח עובד/ת סוציאלי/ת מהקהילה כשזה אפשרי. לא תמיד אפשרי — אך ניתן לבקש. הסבר: "ההורה שלי לא מדבר עברית ויצטרך לתאר קשיים — אבקש עובד/ת סוציאלי/ת דובר/ת אמהרית."

---

## שדרוג רמת הסיעוד

אם המצב הבריאותי הידרדר — **ניתן לבקש הערכה מחדש** בכל עת. חשוב לבצע זאת לפני שהמצב הופך לחמור יותר ממה שהגמלה הנוכחית מכסה.

---

## בית-אבות ועמותות

כאשר הטיפול הביתי אינו מספיק, ניתן לבקש **סיעוד מוסדי** (בית-אבות). ביטוח לאומי משתתף בעלות. עמותת **ניצן ירוק** פועלת עם קשישים מהקהילה האתיופית בירושלים, ב"ש, ות"א.

📞 **ביטוח לאומי**: *6050 | [btl.gov.il](https://www.btl.gov.il)
`,
      en: `## Who Is Eligible?

Elderly Israelis (women 60+, men 65+) who need help with at least 2 of 6 daily activities (dressing, eating, mobility, hygiene, toileting, communication). No income test — savings do not affect eligibility.

## Benefit Amounts (2025)

- Level 1 (2 activities): approx. ₪4,200/month
- Level 2 (3–4 activities): approx. ₪5,800/month
- Level 3 (5–6 activities): approx. ₪7,500/month
- Full nursing home: approx. ₪9,000/month

Benefits are typically paid as in-home care hours rather than cash.

## Cultural Needs

Ethiopian elderly may need an Amharic-speaking carer familiar with traditional food, language, and religious customs. You can request this in writing from the care company. Request an Amharic-speaking BTL social worker for the home assessment visit.

## How to Apply

1. Submit Form 510 (nursing benefit claim) at any BTL branch.
2. BTL sends a social worker for a home assessment within 30 days.
3. On approval, choose a licensed home-care provider from the approved list.

Contact BTL: *6050 | btl.gov.il
`,
      am: `## ብቁ ማን ነው?

ሴቶች 60+፣ ወንዶች 65+፣ ቢያንስ 2 ዕለታዊ ተግባራት (መልበስ፣ መብላት፣ እንቅስቃሴ፣ ንጽህና፣ መጸዳጃ፣ ትርጉም ያለው ግንኙነት) ለማከናወን እርዳታ የሚያስፈልጋቸው። ለቁጠባ ወይም ገቢ ሳይመረኮዝ።

## ጥቅማ-ጥቅም (2025)

- ደረጃ 1፦ ~4,200 ሺ"ል/ወር
- ደረጃ 2፦ ~5,800 ሺ"ል/ወር
- ደረጃ 3፦ ~7,500 ሺ"ል/ወር

## ማመልከቻ

ቅጽ 510 ወደ BTL ቅርንጫፍ ያስገቡ። BTL ወደ ቤት ሶሻል ዎርከር ይልካሉ። ለአማርኛ ተናጋሪ ሶሻል ዎርከር ይጠይቁ።

BTL፦ *6050 | btl.gov.il
`,
    },
  },

  // NEW 25 — Court interpreter rights
  {
    title: {
      he: "זכות למתורגמן בבית משפט ובמשרדי הממשלה",
      en: "Right to an Interpreter in Court and Government Offices",
      am: "በፍ/ቤት እና በመንግስት ቢሮዎች አስተርጓሚ የማግኘት መብት",
    },
    slug: {
      he: "court-interpreter-rights",
      en: "court-interpreter-rights",
      am: "court-interpreter-rights",
    },
    govUrl: "https://www.gov.il/he/departments/ministry-of-justice",
    eligibilitySummary: {
      he: "כל אדם שאינו דובר עברית זכאי למתורגמן בכל הליך משפטי — זכות חוקתית. גם במשרדי ממשלה (ביטוח לאומי, פנים, קליטה) יש חובה לספק תרגום. הזכות חינמית ועל חשבון המדינה.",
      en: "Anyone who does not speak Hebrew is entitled to an interpreter in any legal proceeding — a constitutional right. Government offices (BTL, Interior Ministry, Aliyah Ministry) must also provide translation. The right is free and at state expense.",
      am: "ዕብራይስጥ የማይናገር ማንኛውም ሰው በማናኛውም የሕግ ሂደት አስተርጓሚ የማግኘት መብት አለው — ይህ ሕገ-መንግስታዊ መብት ነው። ቢሮዎችም (BTL፣ ውስጣዊ ጉዳዮች፣ ቅያሴ) ትርጓሜ ማቅረብ አለባቸው።",
    },
    tags: ["legal", "immigration"],
    bodies: {
      he: `## הזכות: יסוד חוקתי

**חוק יסוד: כבוד האדם וחירותו** מגן על זכות ההליך ההוגן. פרשנות בתי-המשפט ישראליים: הגנה זו כוללת את הזכות להבין ולהיות מובן בהליך שמשפיע על חיי אדם. ועדת שרנסקי (2017) קבעה מפורשות שמדינת ישראל אינה רשאית לנהל הליכים פליליים או אזרחיים משמעותיים מבלי להציע תרגום לנחקרים שאינם דוברי עברית.

---

## בתי-משפט — כיצד לדרוש מתורגמן

### הכנה מראש (מומלץ)
1. **לפני הדיון**: שלח מכתב (בפקס/אימייל) לכתב בית-המשפט: "אני מגיש/ה בקשה למתורגמן לאמהרית לדיון ביום ____. מספר תיק: ____"
2. **בבית-המשפט**: הגיע מוקדם ואמור לפקיד: "אני זקוק/ה למתורגמן, אנא ודא/י שהוא כאן."

### בזמן הדיון
אם הגעת בלי מתורגמן ולא אחד הגיע:
- **אמור לשופט**: "הגשתי בקשה למתורגמן ולא קיבלתי. איני יכול/ה להמשיך ללא תרגום."
- השופט **חייב** לדחות את הדיון ולהסדיר מתורגמן — לא ניתן לנהל הליך פלילי ללא הבנה מלאה.

---

## מאגר המתורגמנים לאמהרית

**מינהלת בתי-המשפט** מנהלת רשימת מתורגמנים מוסמכים. לאמהרית יש מספר מתורגמנים מוסמכים מוכרים על-ידי המדינה. לשאול ישירות ממזכירות בית-המשפט: "יש לכם מתורגמן לאמהרית ברשימה?"

**אם המתורגמן לא זמין מיידית** — ניתן לבקש דחיית הדיון, וזה לגיטימי לחלוטין.

---

## סוגי הליכים בהם הזכות חלה

| הליך | זכאות למתורגמן |
|------|----------------|
| **פלילי** (חקירה, משפט, גזר-דין) | **חובה מוחלטת** — ללא חריגים |
| **אזרחי** (חוזה, נזיקין, קניין) | זכאות — יש לבקש מראש |
| **משפחה** (גירושין, משמורת) | זכאות — חשוב במיוחד |
| **מנהלי** (בית-דין לעבודה, ביהמ"ש לעניינים מנהליים) | זכאות |
| **חקירה משטרתית** (לפני הגשת כתב-אישום) | **חובה** — ראה "זכויות מול משטרה" |

---

## משרדי ממשלה — ביטוח לאומי, פנים, קליטה

**חוק שירות הציבור (תלונות הציבור)** וניהולי הוראות שירות לקוחות מחייבים:

### ביטוח לאומי (*6050)
- יש שירות טלפוני **באמהרית** דרך *6050 — לבחור "שירות לדוברי אמהרית"
- בסניפים: ניתן לבקש מזכיר/ה לעזור במציאת עובד/ת דובר/ת אמהרית

### משרד הפנים
- **מרכז עולים**: ניתן לבקש פגישה עם מתורגמן — להודיע מראש
- **תעודת זהות, דרכון, רישום**: ניתן להביא מלווה דובר עברית

### משרד הקליטה (*2994)
- יש נציגים דוברי אמהרית — לציין בפנייה

---

## אם סירבו לספק מתורגמן

**בבית-משפט**: אמור ישירות לשופט. רשום את ההצהרה. שמור עותק פרוטוקול.

**במשרד ממשלתי**:
1. ביקש בכתב ממנהל הסניף
2. פנה לנציב תלונות הציבור: [ombudsman.gov.il](https://www.ombudsman.gov.il)
3. **תבקה** — יטפל בתלונה: 1-800-20-20-16

---

## שירות הפרשנות הקהילתי

**שירות פרשנות קהילתי** הוא שירות וולונטרי (וחלקית ממשלתי) המספק מתורגמנים מאומנים לקהילה האתיופית. ניתן להזמין לפגישות רפואיות, בית-ספר, ומפגשים עם רשויות. לפנות דרך ממשיל יוצאי אתיופיה בעיר.

---

## עלות

**הזכות חינמית** — המדינה משלמת למתורגמן בהליכים משפטיים. בחלק מהמשרדים — אין תשלום. אם ביקשו ממך לשלם למתורגמן בהליך משפטי — **סרב** ופנה לתבקה.

---

## הכנה לדיון עם מתורגמן

- **הגע מוקדם** — הכר את המתורגמן לפני הדיון
- **דבר בקצרה ובמשפטים פשוטים** — קל יותר לתרגם
- **בקש אישור** שהמתורגמן תרגם במדויק אם אינך בטוח
- **שמור עותק** מהפרוטוקול — זכות שלך

📞 **תבקה**: 1-800-20-20-16
🔗 **מינהלת בתי-המשפט**: [court.gov.il](https://www.court.gov.il)
`,
      en: `## The Constitutional Basis

The right to an interpreter in legal proceedings is derived from the Basic Law: Human Dignity and Liberty. It applies in all criminal proceedings without exception, and in civil, family, and administrative cases on request. Israel's state cannot conduct significant proceedings against a person who does not understand the language.

## In Court

Request an interpreter in advance: write to the court clerk specifying the case number, hearing date, and that you need Amharic. At the hearing, if no interpreter is present, tell the judge directly. The judge must postpone the hearing — a criminal trial cannot proceed without full comprehension.

The Courts Administration maintains a registry of certified Amharic interpreters. Ask the court secretary: "Do you have a certified Amharic interpreter on the list?"

## Government Offices

- **BTL (*6050):** Amharic telephone service available — select "Amharic service."
- **Ministry of Aliyah (*2994):** Amharic-speaking representatives — specify when calling.
- **Ministry of Interior:** Request an appointment with an interpreter in advance.

## If an Interpreter Is Refused

In court — state the objection on the record to the judge. In a government office — request in writing, then escalate to the Public Ombudsman (ombudsman.gov.il) or TEBEKA (1-800-20-20-16).

## Cost

The right is free — the state pays for court interpreters. If you are ever asked to pay for an interpreter in a legal proceeding, refuse and contact TEBEKA.
`,
      am: `## ሕገ-መንግስታዊ መሠረት

ዕብራይስጥ ለማይናገሩ ሰዎች ሁሉ ሕጋዊ ሂደቶች ውስጥ አስተርጓሚ የማግኘት መብት አለ። ለወንጀላዊ ሂደቶች ያለ ምንም ልዩነት፤ ሲቪል፣ ቤተሰብ እና አስተዳደራዊ ጉዳዮች ለምዝገባ።

## በፍ/ቤት

አስቀድሞ ይጠይቁ — ለፍ/ቤት ፀሐፊ ይጻፉ (ጉዳይ ቁጥር፣ ቀን፣ አማርኛ ያስፈልጋል)። አስተርጓሚ ካልመጣ — ለዳኛ ቀጥታ ይናገሩ። ዳኛ ሂደቱን ማዘናጋት አለበት።

## የመንግስት ቢሮዎች

- **BTL (*6050):** "የአማርኛ አገልግሎት" ምረጡ
- **ቅያሴ ሚኒስቴር (*2994):** አስቀድሞ ይጠቁሙ

## ወጪ

ነፃ ነው። ለሕጋዊ ሂደት ለአስተርጓሚ ሊከፈሉ ቢጠየቁ — ፈቃደኛ አትሁኑ፤ TEBEKA ያነጋግሩ፦ 1-800-20-20-16
`,
    },
  },

  // NEW 18 — Free legal aid
  {
    title: {
      he: "סיוע משפטי חינמי ליוצאי אתיופיה — מי מספק ואיך פונים",
      en: "Free Legal Aid for Ethiopian-Israelis — Who Provides It and How to Access",
      am: "ለኢትዮጵያ-እስራኤሎች ነፃ የሕግ እርዳታ — ማን ይሰጣል እና እንዴት ይደርሳሉ",
    },
    slug: {
      he: "free-legal-aid",
      en: "free-legal-aid",
      am: "free-legal-aid",
    },
    govUrl: "https://tebeka.org.il",
    eligibilitySummary: {
      he: "עמותת תבקה, הסיוע המשפטי הממשלתי, וקליניקות משפטיות באוניברסיטאות מספקים ייצוג ויעוץ חינמיים ליוצאי אתיופיה. אין צורך בהכנסה מוגדרת לפנייה לתבקה.",
      en: "TEBEKA association, the Government Legal Aid Bureau, and university law clinics provide free representation and advice to Ethiopian-Israelis. TEBEKA has no income test.",
      am: "TEBEKA ማህበር፣ የመንግስት የሕግ እርዳታ ቢሮ፣ እና የዩኒቨርሲቲ ሕግ ክሊኒኮች ለኢትዮጵያ-እስራኤሎች ነፃ ውክልና እና ምክር ይሰጣሉ።",
    },
    tags: ["legal"],
    bodies: {
      he: `## למה ייעוץ משפטי חשוב?

עולים רבים מאתיופיה נמנעים מפנייה לעורך-דין מחשש לעלות, חוסר היכרות עם מערכת המשפט הישראלית, או חסם שפה. בפועל קיים מעטפת שלמה של שירותים חינמיים — שלא כולם מכירים.

---

## 1. תבקה — האגודה הישראלית ליהודים אתיופים

**תבקה** היא הארגון המרכזי למשפט ליוצאי אתיופיה בישראל. הם עוסקים ב:

- **דיני עבודה**: אפליה, פיטורין שלא כדין, שכר לא שולם
- **דיני ביטוח לאומי**: ערעורים על קצבאות
- **דיני משפחה**: גירושין, מחלוקות משמורת, ירושה
- **זכויות אזרחיות**: פגיעה בידי משטרה, אפליה במוסדות ציבוריים
- **הגנה מפני פינוי**: עזרה בסכסוכי דיור ורשויות

**פנייה לתבקה**:
- טלפון: **1-800-20-20-16** (שעות משרד — ראשון עד חמישי)
- אתר: [tebeka.org.il](https://tebeka.org.il)
- פגישה ראשונה חינמית תמיד — ללא תנאי הכנסה

---

## 2. הסיוע המשפטי הממשלתי

**הסיוע המשפטי** (מנהלת הסיוע המשפטי, משרד המשפטים) מספק ייעוץ וייצוג חינמי לזכאים לפי **מבחן הכנסה**. ב-2025:
- יחיד: הכנסה נטו עד ~7,000 ₪/חודש
- זוג: עד ~10,500 ₪/חודש
- ילדים: תוספת לכל ילד

**תחומים מכוסים**: פלילי (חובה), אזרחי (בשיקול-דעת), מנהלי, דיני משפחה.

**כיצד פונים**:
1. פנה ללשכת הסיוע המשפטי הקרובה (בכל בית-משפט מחוזי)
2. הצג ת"ז + אישור הכנסה
3. אם אתה עולה חדש — הכנסה מסל הקליטה נחשבת

📞 **מרכז השיחות**: 1-700-706-060

---

## 3. קליניקות משפטיות באוניברסיטאות

קליניקות משפטיות מנוהלות על-ידי סטודנטים לתואר שני במשפטים, בפיקוח מרצים. הן מספקות ייעוץ ולעתים ייצוג **חינמי**:

| אוניברסיטה | קליניקה | מוקד |
|------------|---------|------|
| תל-אביב | קליניקת זכויות אדם | זכויות מהגרים ועולים |
| עברית (ירושלים) | קליניקת עניים בדין | עוני, דיור, סעד |
| בר-אילן | קליניקת משפחה | גירושין, ירושה |
| חיפה | קליניקת הלאום | עקירה, זכויות קהילתיות |

לפרטי קשר — אתר האוניברסיטה או גוגל "קליניקה משפטית [שם עיר]".

---

## 4. ארגוני זכויות נוספים

**עכ"א — האגודה לזכויות האזרח**: פועלת בעיקר בתביעות ציבוריות ועל-עקרוניות. מייעצת חינם במקרים של הפרת זכויות אדם. acri.org.il | 03-7621111

**המוקד להגנת הפרט (HaMoked)**: מתמחה בזכויות אזרחיות מול רשויות המדינה. hamoked.org.il

**עדאלה — המרכז המשפטי לזכויות המיעוט הערבי**: עוסק גם בסוגיות כלל-מיעוטים, לעיתים בשיתוף עם תבקה.

---

## מה להביא לפגישה ראשונה?

- **ת"ז / תעודת עולה**
- **כל מסמך רלוונטי לתיק**: חוזה, מכתב פיטורין, הודעת ביטוח לאומי, פסיקת בית-משפט
- **כרונולוגיה קצרה** — תאריכים ואירועים בסדר
- **שאלות מוכנות** — מה אתה רוצה לדעת ומה אתה מצפה שיקרה

---

## לוח זמנים: דברים שלא אפשר להחמיץ

| סוג תיק | מגבלת זמן |
|---------|-----------|
| תביעת עבודה | 7 שנים (אך מהר יותר = טוב יותר) |
| ערעור על קצבת ביטוח לאומי | 12 חודשים מהחלטה |
| תלונה על שוטר (מח"ש) | 30 יום |
| תביעה אזרחית לנזיקין | 7 שנים (מקרים מיוחדים — פחות) |
`,
      en: `## TEBEKA — The Primary Resource

TEBEKA (the Israeli Association for Ethiopian Jews) is the main legal organisation for Ethiopian-Israelis. They handle employment discrimination, BTL benefit appeals, family law, civil-rights cases, and housing disputes. The first meeting is always free with no income test. Call 1-800-20-20-16 or visit tebeka.org.il.

## Government Legal Aid Bureau

The Ministry of Justice Legal Aid Bureau provides free advice and representation based on an income test (single earner up to approx. ₪7,000 net/month in 2025). Covers criminal (mandatory), civil, administrative, and family law. Contact via any District Court or call 1-700-706-060.

## University Law Clinics

Tel Aviv, Hebrew University, Bar-Ilan, and Haifa universities run free supervised clinics covering human rights, poverty law, family, and housing. Search "קליניקה משפטית [city]" for contact details.

## What to Bring

Bring your ID/teudat oleh, all relevant documents (contract, termination letter, BTL notice), a brief timeline of events, and prepared questions.
`,
      am: `## TEBEKA — ዋናው ምንጭ

TEBEKA ለኢትዮጵያ-እስራኤሎች ዋናው የሕግ ድርጅት ነው። የሥራ አድልዎ፣ BTL ቅሬታዎች፣ የቤተሰብ ሕግ፣ የሲቪል መብቶች እና የቤት ሙግቶችን ይዳኛሉ። የመጀመሪያ ስብሰባ ሁሌም ነፃ ነው። 1-800-20-20-16 | tebeka.org.il

## የመንግስት የሕግ እርዳታ ቢሮ

በሕክምና ሚኒስቴር የሕግ እርዳታ ቢሮ በገቢ ምርምር ነፃ ምክር እና ውክልና ይሰጣል (2025 ለ7,000 ሺ"ል/ወር ወይም ከዚያ ያነሰ ደሞዝ)። 1-700-706-060 ይደውሉ።

## ምን ማምጣት አለብዎ?

መታወቂያዎ/የዓሊያ ሰነድ፣ ሁሉም ተዛማጅ ሰነዶች (ኮንትራት፣ የቢሮ ደብዳቤ)፣ አጭር የሁኔታ ታሪክ።
`,
    },
  },

  // ── Wave 4 additions — content plan P1 gaps ─────────────────────────────

  {
    title: {
      he: "מדריך משכנתא ליוצאי אתיופיה 2026",
      en: "Mortgage Guide for Ethiopian-Israelis 2026",
      am: "የቤት ብድር መመሪያ ለኢትዮጵያ-እስራኤሎች 2026",
    },
    slug: {
      he: "mashkanta-guide-ethiopians",
      en: "mashkanta-guide-ethiopians",
      am: "mashkanta-guide-ethiopians",
    },
    govUrl: "https://www.gov.il/he/departments/topics/housing-grants",
    eligibilitySummary: {
      he: "מדריך מקיף לכל תוכניות המשכנתא הזמינות ליוצאי אתיופיה: תוכנית ה-600,000 ₪, מענק הומות, זכאות ל-90% מימון, ומסלולי ריבית מיוחדים.",
      en: "Complete guide to all mortgage programs available to Ethiopian-Israelis: the 600K loan, Homot grant, 90% financing eligibility, and special interest tracks.",
      am: "ለኢትዮጵያ-እስራኤሎች ለሚገኙ ሁሉም የቤት ብድር ፕሮግራሞች ሙሉ መመሪያ።",
    },
    tags: ["housing", "mortgage", "grants", "new_immigrant"],
    bodies: {
      he: `## תוכניות המשכנתא לקהילה האתיופית

ליוצאי אתיופיה עומדות מספר תוכניות ייחודיות שאינן קיימות לאוכלוסייה הכללית:

### 1. הלוואת 600,000 ₪ (הגרלה שנתית)
הלוואת מדינה ב-0% ריבית ל-10 שנים ראשונות, 2% ב-15 השנים הבאות. כ-200 משפחות זוכות מדי שנה. רישום בסניפי בנק לאומי, דיסקונט ואיגוד בינואר-פברואר.

### 2. מענק "הומות" (משרד הבינוי)
מענק חד-פעמי של 120,000–200,000 ₪ לרכישת דירה ראשונה. תנאים: הכנסה משפחתית עד ~18,000 ₪/חודש, דירה ראשונה, גיל 21+. ניתן לשלב עם הלוואת 600K.

### 3. זכאות ל-90% מימון
בנקים מוסמכים (לאומי, מזרחי, הפועלים) מאשרים עד 90% ערך הנכס — במקום 75% הסטנדרטי — לזכאים בתוכניות הממשלתיות.

### 4. נקודות זיכוי משכנתא לחיילים
שירות צבאי מזכה בנקודות ריבית נוספות ובגמישות בתנאי ההחזר.

## שלבי הגשה
1. בדיקת זכאות: gov.il/he/service/first-time-homebuyers
2. פגישה ביועץ משכנתאות מוסמך (קהילתי — ראו [/he/professionals])
3. הגשת בקשה לבנק עם: ת"ז, תלושי שכר 3 חודשים, אישור ביטוח לאומי
4. אישור עקרוני → חתימת חוזה רכישה → שחרור כספים

## שימו לב
- **לא מחמיצים מועד הגרלה**: הרישום לתוכנית 600K נפתח בינואר בלבד
- **יועץ מוסמך**: בחרו יועץ שמכיר את הזכאויות הקהילתיות — טעות עולה עשרות אלפי שקלים
- **אין להתחיל בחיפוש דירה** לפני שיש אישור עקרוני

📞 לשאלות: מרכז קבלת קהל של משרד הבינוי — 5442* | משרד הקליטה — 3450*`,
      en: `## Mortgage Programs for the Ethiopian-Israeli Community

Ethiopian-Israelis have access to several preferential programs not available to the general public:

### 1. The 600,000 ILS State Loan (Annual Lottery)
0% interest for the first 10 years, 2% for the next 15. Approx. 200 families win per year. Register at Bank Leumi, Discount, or Igud branches in January–February.

### 2. "Homot" Grant (Ministry of Construction)
One-time grant of 120,000–200,000 ILS for first-home purchase. Conditions: family income up to ~18,000 ILS/month, first apartment, age 21+. Can be combined with the 600K loan.

### 3. Up to 90% Financing
Approved banks (Leumi, Mizrahi, HaPoalim) approve up to 90% of property value — vs. the standard 75% — for government-program eligible applicants.

### 4. Military Service Mortgage Points
Army service qualifies for additional interest-rate points and more flexible repayment terms.

## Application Steps
1. Check eligibility: gov.il/he/service/first-time-homebuyers
2. Meet with a certified mortgage advisor (community-familiar — see /en/professionals)
3. Submit to bank: ID, 3 months pay slips, NII confirmation
4. Preliminary approval → sign purchase contract → release of funds

📞 Ministry of Construction hotline: *5442 | Ministry of Aliya: *3450`,
      am: `## ለኢትዮጵያ-እስራኤሎች የቤት ብድር ፕሮግራሞች

ኢትዮጵያ-እስራኤሎች ለሌሎች ህዝቦች የማይገኙ ልዩ ፕሮግራሞች አሏቸው፦

### 1. የ600,000 ሺ"ል ብድር (ዓመታዊ ዕጣ)
ለመጀመሪያ 10 ዓመታት 0% ወለድ። በዓመት ~200 ቤተሰቦች ይመረጣሉ። በጥር ወር ይመዘገቡ።

### 2. "ሆሞት" ድጎማ
ለመጀመሪያ ቤት 120,000–200,000 ሺ"ል ነጠላ ስጦታ። ቤተሰቡ ወርሃዊ ገቢ እስከ 18,000 ሺ"ል።

### 3. እስከ 90% ፋይናንስ
ለተፈቀደላቸው አመልካቾች ባንኮች እስከ 90% ይሰጣሉ።

## አቅምዎን ያረጋግጡ
gov.il/he/service/first-time-homebuyers ወይም *5442 ይደውሉ።`,
    },
  },

  {
    title: {
      he: "זכויות דיירים בפינוי-בינוי",
      en: "Tenant Rights in Demolish-Rebuild (Pinui-Binui) Projects",
      am: "ቤቶችን ማፍረስና መገንባት — የተከራዮች መብቶች",
    },
    slug: {
      he: "pinui-binui-tenant-rights",
      en: "pinui-binui-tenant-rights",
      am: "pinui-binui-tenant-rights",
    },
    govUrl: "https://www.gov.il/he/departments/topics/urban_renewal",
    eligibilitySummary: {
      he: "בעל דירה בפרויקט פינוי-בינוי זכאי לדירה חדשה גדולה יותר, פיצוי שכירות בתקופת הבנייה, ופטור ממס שבח. מדריך לזיהוי זכויותיך.",
      en: "Apartment owners in pinui-binui projects are entitled to a larger new apartment, rental compensation during construction, and capital-gains tax exemption.",
      am: "በፒנואይ-ቢנואይ ፕሮጀክቶች ውስጥ ያሉ የቤት ባለቤቶች ትልቅ አዲስ ቤት፣ ወቅታዊ የኪራይ ካሳ እና ከቀረጥ ነፃ የሆነ ሽያጭ ይፈቀድላቸዋል።",
    },
    tags: ["housing", "urban_renewal", "legal"],
    bodies: {
      he: `## מה זה פינוי-בינוי?

פינוי-בינוי הוא תוכנית ממשלתית להריסת בניינים ישנים ובנייה מחדש של בניינים גבוהים יותר. בתמורה, בעלי הדירות מקבלים דירות חדשות גדולות יותר — ללא עלות נוספת.

## הזכויות שלך כבעל דירה

### 1. דירה חדשה גדולה יותר
החוק מחייב שהדירה החדשה תהיה לפחות **12 מ"ר גדולה יותר** מהדירה הנוכחית (או 25% גדולה יותר — הגדול מביניהם).

### 2. פיצוי שכירות בתקופת הבנייה
הקבלן מחויב לשלם דמי שכירות חודשיים בזמן שאתם גרים בדירה חלופית. הסכום מחושב לפי שוק השכירות המקומי.

### 3. פטור ממס שבח
עסקת פינוי-בינוי פטורה ממס שבח (capital gains tax) — חיסכון של עשרות עד מאות אלפי ₪.

### 4. הזכות לסרב
אתם לא חייבים להסכים. אולם, אם 80% מבעלי הדירות מסכימים, בית המשפט יכול לאכוף את ההסכמה גם על המסרבים (תיקון 2006).

### 5. ייצוג משפטי עצמאי
אתם זכאים לעורך דין **משלכם** — בנפרד מעורך הדין של הקבלן. הקבלן חייב לממן את שכר הטרחה.

## שלבים לפני חתימה
1. **אל תחתמו** על שום מסמך לפני שהתייעצתם עם עו"ד עצמאי
2. בדקו שהדירה החדשה כוללת: חניה, מחסן, ממ"ד
3. ודאו שהפרויקט רשום ברשות להתחדשות עירונית: ir.gov.il
4. בדקו מוניטין הקבלן ב-רשם הקבלנים

📞 רשות להתחדשות עירונית: 03-7385777 | תבקה (ייעוץ משפטי חינם): 1-800-20-20-16`,
      en: `## What is Pinui-Binui?

Pinui-binui (demolish-rebuild) is a government programme that demolishes old buildings and rebuilds taller modern ones. In return, apartment owners receive larger new apartments at no extra cost.

## Your Rights as an Owner

**Larger new apartment**: The law requires the new apartment to be at least 12 sqm larger (or 25% larger — whichever is greater).

**Rental compensation**: The developer must pay monthly rent while you live elsewhere during construction, calculated at local market rates.

**Capital-gains tax exemption**: Pinui-binui transactions are exempt from capital-gains tax — savings of tens to hundreds of thousands of ILS.

**Right to refuse**: You can refuse. However, if 80% of owners agree, the court can override refusers (2006 amendment).

**Independent legal representation**: You are entitled to your own lawyer — separate from the developer's. The developer must cover the legal fees.

## Before Signing
1. Never sign any document before consulting an independent lawyer
2. Confirm the new apartment includes: parking, storage room, safe room (mamad)
3. Verify the project is registered at ir.gov.il

📞 Urban Renewal Authority: 03-7385777 | Tebeka (free legal): 1-800-20-20-16`,
      am: `## ፒንואይ-ቢንዋይ ምንድን ነው?

ፒንዋይ-ቢንዋይ ያሮጋቸ ሕንፃዎችን አፍርሶ አዲስ ለመገንባት የሚያስችል የመንግስት ፕሮግራም ነው። የቤት ባለቤቶቹ አዲስ ትልቅ ቤት ያገኛሉ።

## ዋና መብቶቸ

- **ትልቅ አዲስ ቤት**: ቢያንስ 12 ሜ"ር ትልቅ
- **የኪራይ ካሳ**: ግንባታ ወቅት ወርሃዊ ካሳ
- **ቀረጥ ነፃ**: ከካፒታል ጌን ቀረጥ ነፃ
- **የራስ ጠበቃ**: ልዩ ጠበቃ የማጣር መብት (ዴቬሎፐሩ ይከፍላል)

📞 ir.gov.il | 03-7385777`,
    },
  },

  {
    title: {
      he: "החלפת קופת חולים — מדריך לזכויות",
      en: "Switching Health Fund (Kupat Holim) — Your Rights",
      am: "የጤና ፈንድ መቀየሪያ — መብቶችዎ",
    },
    slug: {
      he: "kupat-holim-switch-rights",
      en: "kupat-holim-switch-rights",
      am: "kupat-holim-switch-rights",
    },
    govUrl: "https://www.gov.il/he/departments/topics/health-basket",
    eligibilitySummary: {
      he: "כל אזרח רשאי להחליף קופת חולים פעם אחת בשנה, בחינם, ללא הגבלת גיל או מצב בריאותי. החלפה נכנסת לתוקף ב-1 בינואר.",
      en: "Every citizen can switch health funds once a year, free of charge, with no age or health restrictions. The switch takes effect on January 1st.",
      am: "ሁሉም ዜጋ በዓመት አንድ ጊዜ የጤና ፈንዱን መቀየር ይችላል — ምንም ወጪ የለም።",
    },
    tags: ["health", "rights", "insurance"],
    bodies: {
      he: `## הזכות להחליף קופת חולים

על-פי חוק ביטוח בריאות ממלכתי, כל תושב ישראל זכאי לקבל שירותי בריאות מאחת מ-4 קופות החולים ולהחליף ביניהן. ההחלפה היא **חינם**, **ללא בדיקות רפואיות**, **ללא הגבלת גיל** וללא קשר למצב בריאותי.

## איך מחליפים?

1. **מועד**: ניתן להגיש בקשה לאורך כל השנה, אך ההחלפה נכנסת לתוקף ב-**1 בינואר** בלבד
2. **הגשה**: בסניף הקופה החדשה, באתר ביטוח בריאות (btl.gov.il), או בדואר
3. **מסמכים**: ת"ז בלבד
4. **אישור**: תקבלו אישור תוך 30 יום

## זכויות מיוחדות לקהילה האתיופית

**שירות באמהרית**: קופות החולים מחויבות לספק תרגום בשפות מיעוט. בקשו מתורגמן או שירות בטלפון באמהרית.

**בריאות הנפש בסל הבסיסי**: מ-2021 נכללת בריאות הנפש בסל הבסיסי — כולל 18 פגישות טיפול בשנה ללא עלות נוספת.

**ילדים עד 18**: שירותי שיניים חינם עד גיל 18 בכל קופה.

**תרופות מסובסדות**: כל הקופות חייבות לספק את תרופות הסל באותו מחיר — השוו את השירותים המורחבים (שב"ן) בלבד.

## כיצד לבחור קופה?

בדקו:
- **נגישות**: האם יש סניף/קליניקה קרוב לביתכם?
- **רופא משפחה**: האם הרופא שאתם מעוניינים בו הוא חבר בקופה?
- **שב"ן (שירותי בריאות נוספים)**: עלות הביטוח המשלים ומה הוא כולל
- **שירות באמהרית**: האם יש נציג דובר אמהרית?

📞 ממונה על הביטוח בריאות: 02-5002738 | ביטוח לאומי: 08-6709709`,
      en: `## Your Right to Switch Health Funds

Under the National Health Insurance Law, every Israeli resident is entitled to receive healthcare from one of 4 health funds and to switch between them. The switch is **free**, requires **no medical tests**, has **no age limit**, and is independent of health status.

## How to Switch

1. Submit a request at any time during the year, but the change only takes effect on **January 1st**
2. Apply at: a branch of the new health fund, btl.gov.il, or by mail
3. Documents needed: ID card only
4. You'll receive confirmation within 30 days

## Special Rights for the Ethiopian-Israeli Community

**Amharic services**: Health funds must provide translation. Request an interpreter or Amharic telephone service.

**Mental health in the basic basket**: Since 2021, mental health is included in the basic basket — including 18 free therapy sessions per year.

**Children under 18**: Free dental care until age 18 at every health fund.

📞 Health Insurance Commissioner: 02-5002738`,
      am: `## የጤና ፈንድ የመቀየር መብትዎ

እያንዳንዱ የእስራኤል ነዋሪ 4 ጤና ፈንዶች ውስጥ ከአንዱ ወደ ሌላ ነፃ በሆነ መንገድ መቀያየር ይችላል።

**እንዴት?** ጥር 1 ቀን ይፀናል። ዓመቱን ሙሉ ማመልከት ይችላሉ።

**ለህፃናት**: እስከ 18 ዓመት ድረስ ነፃ ጥርስ ህክምና።

**የአዕምሮ ጤና**: ዓመቱን 18 ነፃ ክፍለ ጊዜ ይፈቀዳል (ከ2021 ጀምሮ)።

📞 02-5002738`,
    },
  },

  {
    title: {
      he: "סיוע בשכר דירה לעולים — מדריך 2026",
      en: "Rental Assistance for New Immigrants — Guide 2026",
      am: "ለአዲስ ስደተኞች የኪራይ ድጎማ — 2026 መመሪያ",
    },
    slug: {
      he: "rent-assistance-new-olim",
      en: "rent-assistance-new-olim",
      am: "rent-assistance-new-olim",
    },
    govUrl: "https://www.gov.il/he/departments/topics/housing-new-immigrants",
    eligibilitySummary: {
      he: "עולים חדשים זכאים לסיוע בשכר דירה עד 36 חודשים: יחיד 2,000 ₪/ח׳, זוג 3,100 ₪/ח׳, משפחה עם ילדים עד 4,400 ₪/ח׳. מגישים בסוכנות היהודית או משרד הקליטה.",
      en: "New immigrants are entitled to rental assistance for up to 36 months: single 2,000 ILS/month, couple 3,100, family with children up to 4,400 ILS/month.",
      am: 'አዲስ ስደተኞች እስከ 36 ወር የኪራይ ድጎማ ያገኛሉ። ነጠላ 2,000 ሺ"ል/ወር፣ ጥንዶች 3,100፣ ቤተሰቦች እስከ 4,400።',
    },
    tags: ["housing", "new_immigrant", "grants"],
    bodies: {
      he: `## מי זכאי לסיוע בשכר דירה?

כל עולה חדש שעלה לישראל זכאי לסיוע בשכר דירה ממשרד הקליטה. הסיוע ניתן **במקום** גרות בדיור קליטה ממשלתי (מרכז קליטה), לא בנוסף לו.

## הסכומים ל-2026 (בשקלים לחודש)

| הרכב משפחה | סכום חודשי |
|------------|------------|
| יחיד | 2,000 ₪ |
| זוג ללא ילדים | 3,100 ₪ |
| זוג + ילד אחד | 3,700 ₪ |
| זוג + 2 ילדים | 4,100 ₪ |
| זוג + 3 ילדים ומעלה | 4,400 ₪ |

הסכומים משתנים לפי מדד — בדקו עדכון ב-gov.il.

## משך הסיוע

- **שנה ראשונה**: סכום מלא
- **שנה שנייה**: 75% מהסכום
- **שנה שלישית**: 50% מהסכום
- לאחר 36 חודשים: הסיוע מסתיים

## איך מגישים?

1. **פנו לסוכנות היהודית** (Jewish Agency) עוד לפני הגעה לישראל — או לסניף משרד הקליטה בישראל תוך 30 יום מהעלייה
2. **מסמכים**: תעודת עולה, חוזה שכירות חתום, פרטי חשבון בנק
3. **חשוב**: חוזה השכירות חייב להיות על שמכם ולכלול כתובת מלאה
4. **ועדת דיור**: עולים עם 4+ ילדים או נכות יכולים לבקש תוספת

## לא לדחות את הבקשה!
הסיוע מחושב מיום העלייה — כל חודש שמחמיצים הוא חודש אבוד.

📞 משרד הקליטה: 3450* | שעות פעילות: א'-ה' 8:00-16:00`,
      en: `## Who is Eligible?

Every new immigrant (oleh) is entitled to rental assistance from the Ministry of Aliya and Integration. The assistance is given **instead of** staying in a government absorption centre, not in addition to it.

## 2026 Monthly Amounts (ILS)

| Household | Monthly Amount |
|-----------|---------------|
| Single | 2,000 |
| Couple, no children | 3,100 |
| Couple + 1 child | 3,700 |
| Couple + 2 children | 4,100 |
| Couple + 3+ children | 4,400 |

## Duration

Year 1: full amount | Year 2: 75% | Year 3: 50% | After 36 months: ends.

## How to Apply

1. Contact the Jewish Agency before arriving, or the Ministry of Aliya branch within 30 days of aliya
2. Documents: teudat oleh, signed rental contract, bank account details
3. The lease must be in your name with a full address

📞 Ministry of Aliya: *3450`,
      am: `## ማን ይፈቀዳል?

ሁሉም አዲስ ስደተኞች (ኦሊም) ከቀጠቃ ሚኒስቴር የኪራይ ድጎማ ያገኛሉ።

## ወርሃዊ መጠን (2026)

- ነጠላ: 2,000 ሺ"ል
- ጥንዶች: 3,100 ሺ"ል
- ቤተሰቦች: እስከ 4,400 ሺ"ል

## ጊዜ
1ኛ ዓመት: ሙሉ | 2ኛ ዓመት: 75% | 3ኛ ዓመት: 50%

📞 *3450`,
    },
  },

  {
    title: {
      he: "זכויות גמלאות צבאיות ליוצאי אתיופיה",
      en: "Military Discharge Benefits for Ethiopian-Israeli Veterans",
      am: "ለኢትዮጵያ-እስራኤሎች ወታደራዊ ቀናዳ",
    },
    slug: {
      he: "army-discharge-benefits-ethiopians",
      en: "army-discharge-benefits-ethiopians",
      am: "army-discharge-benefits-ethiopians",
    },
    govUrl: "https://www.btl.gov.il/benefits/Rehabilitation/Pages/default.aspx",
    eligibilitySummary: {
      he: "חייל משוחרר יוצא אתיופיה זכאי למענק שחרור של עד 120,000 ₪, מלגת השכלה, נקודות משכנתא וזכויות מיוחדות בשירות הממשלתי. מי שסיים קרבי מקבל בונוס נוסף.",
      en: "Ethiopian-Israeli discharged soldiers are entitled to a discharge grant of up to 120,000 ILS, an education scholarship, mortgage points, and preference in civil service.",
      am: 'ኢትዮጵያ-እስራኤሎች ወታደሮች እስከ 120,000 ሺ"ል ቅናሽ ድጎማ፣ ትምህርት ዕድል እና ቤት ብድር ነጥቦች ያገኛሉ።',
    },
    tags: ["army", "grants", "education", "housing"],
    bodies: {
      he: `## מענק שחרור (פיצויי שחרור)

משרד הביטחון — אגף שיקום נכים ומשוחררים מעניק מענק שחרור בהתאם לתקופת השירות:

- **שירות סדיר (2-3 שנים)**: 60,000–80,000 ₪
- **שירות מוארך (4+ שנים)**: עד 120,000 ₪
- **יחידות מיוחדות (יהלום, מטכ"ל)**: בונוס נוסף

## מלגת השכלה לאחר שחרור

כל משוחרר זכאי להשתתפות מדינה בלימודים אקדמיים:
- **מוסד ציבורי (אוניברסיטה/מכללה)**: עד 80% מהשכר לימוד
- **מוסד מוכר**: עד 60%
- **תקופה**: 4 שנים ממועד השחרור (5 שנים לקרבי)

## נקודות משכנתא

שירות צבאי מזכה בנקודות אחוז ריבית למשכנתא — ומשפר את תנאי ההלוואה. ניתן לשלב עם תוכנית 600K.

## עדיפות בשירות הממשלתי

חוק ייצוג הולם מחייב העדפה ליוצאי אתיופיה. שירות צבאי מוסיף נקודות בציון לאיוש תפקידים ממשלתיים.

## PTSD והכרה בנכות

חיילים שפיתחו PTSD (הפרעת דחק פוסט-טראומטית) במהלך השירות זכאים להכרה כנכה צה"ל. זה כולל: קצבה חודשית, שיקום, כיסוי רפואי מלא.

## איך מגישים?

1. פנו ל-**אגף שיקום** (משרד הביטחון) תוך 90 יום מהשחרור: rehab.mod.gov.il
2. עבור PTSD: פנו ליחידת בריאות הנפש של ביה"ח הצבאי
3. לייעוץ מקדמי: **ותיקי צה"ל** — 03-7381111

📞 אגף שיקום: 03-7381111 | ניצן — תמיכה בנפגעי טראומה: 1201`,
      en: `## Discharge Grant

The Ministry of Defense — Rehabilitation Division grants a discharge payment based on service length:
- Regular service (2-3 years): 60,000–80,000 ILS
- Extended service (4+ years): up to 120,000 ILS

## Post-Discharge Education Grant

All discharged soldiers receive state funding for academic studies: up to 80% of tuition at public universities, up to 60% at recognised colleges. Valid for 4 years (5 for combat veterans).

## Mortgage Points

Military service qualifies for favourable mortgage rate adjustments. Can be combined with the 600K programme.

## Civil Service Preference

The Affirmative Representation Law requires preference for Ethiopian-Israelis in government hiring. Military service adds points in civil service scoring.

## PTSD and Disability Recognition

Soldiers who developed PTSD during service qualify for IDF disability recognition, including monthly pension, rehabilitation, and full medical coverage.

📞 Rehabilitation Division: 03-7381111`,
      am: `## የቅናሽ ድጎማ

2-3 ዓመት አገልጋዮች: 60,000–80,000 ሺ"ል
4+ ዓመት አገልጋዮች: እስከ 120,000 ሺ"ል

## ትምህርት ዕድል

ለ4 ዓመታት የዩኒቨርሲቲ ክፍያ እስከ 80% ይሸፈናል።

## PTSD

በጦርነት ወቅት PTSD ያጠቃቸው ወታደሮች ወርሃዊ ካሳ ያገኛሉ።

📞 03-7381111`,
    },
  },

  {
    title: {
      he: "רישום בטאבו — מדריך לקהילה האתיופית",
      en: "Land Registry (Tabo) — Guide for the Ethiopian-Israeli Community",
      am: "የመሬት ምዝገባ (ታቦ) — ለኢትዮጵያ-እስራኤሎች መመሪያ",
    },
    slug: {
      he: "land-registration-tabo",
      en: "land-registration-tabo",
      am: "land-registration-tabo",
    },
    govUrl: "https://www.gov.il/he/departments/topics/land-registration",
    eligibilitySummary: {
      he: "רישום נכס בטאבו (לשכת רישום המקרקעין) הוא הדרך היחידה להגן על הבעלות שלכם. מדריך לתהליך, עלויות, ובעיות נפוצות בקהילה האתיופית.",
      en: "Registering property in the Tabo (Land Registry) is the only way to legally protect your ownership. Guide to the process, costs, and common issues for Ethiopian-Israelis.",
      am: "ንብረትዎን በታቦ (የመሬት ምዝገባ) ማስቀመጥ ብቸኛው ሕጋዊ ጥበቃ ነው።",
    },
    tags: ["housing", "legal", "property"],
    bodies: {
      he: `## מה זה טאבו?

לשכת רישום המקרקעין (טאבו) היא הגוף הממשלתי שמנהל את מרשם הנכסים בישראל. כל עסקת נדל"ן (קנייה, מכירה, ירושה, מתנה) חייבת להיות רשומה בטאבו כדי להיות תקפה מבחינה משפטית.

## למה רישום בטאבו חשוב?

ללא רישום — **אין לכם הגנה משפטית** על הדירה שלכם, גם אם שילמתם עליה. מקרים ידועים בקהילה האתיופית:
- משפחה שגרה בדירה 15 שנה ללא רישום, ולאחר מכן הקבלן מכר אותה לאדם אחר
- ירושה שלא נרשמה — יורשים אחרים תובעים בית משפט
- עיקול על הנכס בגלל חוב של המוכר הקודם

## תהליך הרישום

1. **הסכם מכר/מתנה/ירושה** — חייב לכלול מספר גוש וחלקה
2. **תשלום מס שבח/מס רכישה** — אישור ממשרד מיסוי מקרקעין
3. **הגשה ללשכת רישום** — עם כל המסמכים (ת"ז, נסח טאבו נוכחי, חוזה, אישורים)
4. **תשלום אגרה**: כ-700-2,000 ₪ תלוי בעסקה
5. **רישום**: 2-8 שבועות

## בעיות נפוצות בקהילה

**שם שגוי**: שמות מתורגמים מאמהרית שונו בתעודת הזהות אך לא בטאבו. פנו ללשכה עם תצהיר נוטריוני של שינוי שם.

**ירושה ללא צוואה**: לפי חוק הירושה, ניתן לרשום ירושה גם ללא צוואה — עם צו ירושה מבית המשפט לענייני משפחה.

**רכישה מ"קבלן"**: אם קניתם מקבלן ועדיין לא רשומים — מהרו! בנייה שלא נרשמה בתוך 7 שנים עלולה ליצור בעיות.

## עלויות

| שירות | עלות משוערת |
|-------|------------|
| נסח טאבו | 70 ₪ |
| אגרת רישום בסיסית | 720 ₪ |
| עו"ד נדל"ן | 0.5-1% מהעסקה |
| נוטריון (אם נדרש) | 400-800 ₪ |

📞 לשכת רישום מקרקעין: 02-5028000 | לסיוע חינם: תבקה 1-800-20-20-16`,
      en: `## What is the Tabo?

The Land Registry (Tabo) is the government body that manages Israel's property register. Every real estate transaction — buying, selling, inheriting, gifting — must be registered to be legally valid.

## Why Registration Matters

Without registration, you have **no legal protection** on your apartment, even if you paid for it. Known cases in the Ethiopian-Israeli community: families living unregistered for 15 years, only for the developer to sell to someone else; unregistered inheritances contested in court.

## Registration Process

1. Purchase/gift/inheritance agreement — must include parcel numbers
2. Pay capital gains / purchase tax — get clearance from the Tax Authority
3. Submit to Land Registry with all documents
4. Fee: approx. 700–2,000 ILS
5. Processing: 2–8 weeks

## Common Issues in the Community

**Wrong name**: Names transliterated from Amharic may differ between ID and registry. Bring a notarised name-change affidavit.

**Inheritance without a will**: Register via a family-court inheritance order.

📞 Land Registry: 02-5028000 | Free advice: Tebeka 1-800-20-20-16`,
      am: `## ታቦ ምንድን ነው?

ታቦ ሁሉም የንብረት ልውውጦች የሚመዘገቡበት የመንግስት ቢሮ ነው። ምዝገባ ካልተደረገ ሕጋዊ ጥበቃ የለም።

## ዋና ጉዳዮች

- ምዝገባ ያልተደረገ ቤት — ሌላ ሰው ሊሸጥ ይችላል
- ያልተመዘገበ ውርስ — ክርክር ሊፈጠር ይችላል

📞 02-5028000 | ታቤቃ: 1-800-20-20-16`,
    },
  },

  {
    title: {
      he: "הבטחת הכנסה — מדריך לקהילה האתיופית",
      en: "Income Support (Havtaat Hakhnasa) — Guide for the Ethiopian-Israeli Community",
      am: "የገቢ ዋስትና — ለኢትዮጵያ-እስራኤሎች መመሪያ",
    },
    slug: {
      he: "income-support-btl",
      en: "income-support-btl",
      am: "income-support-btl",
    },
    govUrl: "https://www.btl.gov.il/benefits/income_support/Pages/default.aspx",
    eligibilitySummary: {
      he: "הבטחת הכנסה היא קצבה חודשית לאנשים שהכנסתם נמוכה מהמינימום. ב-2026: יחיד 2,887 ₪, זוג 4,303 ₪. מגישים בסניף ביטוח לאומי.",
      en: "Income support is a monthly benefit for people with income below the minimum. 2026 amounts: single 2,887 ILS, couple 4,303 ILS. Apply at your NII branch.",
      am: 'የገቢ ዋስትና ዝቅተኛ ገቢ ላላቸው ሰዎች ወርሃዊ ክፍያ ነው። 2026: ነጠላ 2,887 ሺ"ል፣ ጥንዶች 4,303 ሺ"ል።',
    },
    tags: ["social_welfare", "btl", "income"],
    bodies: {
      he: `## מה היא הבטחת הכנסה?

הבטחת הכנסה (נקראת גם "סעד") היא גמלה שמבטיחה לכל אדם הכנסה מינימלית לקיום. ביטוח לאומי משלים את ההכנסה עד לסף הקבוע בחוק.

## תנאי זכאות

כדי לקבל הבטחת הכנסה צריך לעמוד בכל התנאים:

**1. תושבות**: תושב ישראל שגר בפועל בישראל

**2. גיל**: 25 ומעלה (יחיד ללא ילדים); 20 ומעלה (הורה לילד / נשוי)

**3. הכנסה**: ההכנסה החודשית מכל המקורות נמוכה מהסף הקבוע

**4. נכסים**: ערך הנכסים (דירה, חסכונות) אינו עולה על הגבול המותר

**5. עבודה**: לא עובד (או עובד בחלקיות מוגבלת) ורשום כמחפש עבודה בלשכת התעסוקה

## סכומים חודשיים (2026)

| הרכב | סכום |
|------|------|
| יחיד | 2,887 ₪ |
| יחיד + ילד | 3,615 ₪ |
| זוג | 4,303 ₪ |
| זוג + ילד | 4,737 ₪ |

הסכומים עולים עם כל ילד נוסף.

## מה לא נחשב כהכנסה?

- קצבת ילדים
- מלגות לימודים
- מתנות חד-פעמיות
- חלק מהכנסה מעבודה חלקית

## איך מגישים?

1. פנו לסניף ביטוח לאומי הקרוב (עם ת"ז)
2. מלאו טופס תביעה (ניתן גם באתר btl.gov.il)
3. הציגו מסמכי הכנסה: תלושי שכר / אישורי הכנסה / חשבונות בנק
4. ועדת השמה תבדוק את הבקשה — מחליטה תוך 30 יום

## שימו לב

הגשת הבקשה **לא פוגעת** בזכויות אחרות כגון קצבת ילדים, ביטוח בריאות וכו'. בקשו מהפקיד לבדוק **כל** הגמלאות שאתם זכאים להן.

📞 ביטוח לאומי: 08-6709709 | BTL לסיוע אישי: סניף מקומי`,
      en: `## What is Income Support?

Income support (havtaat hakhnasa) guarantees everyone a minimum income. The NII tops up income to the legally-set threshold.

## Eligibility Conditions

- Israeli resident living in Israel
- Age 25+ (single without children); 20+ (parent or married)
- Monthly income below the threshold
- Assets (apartment, savings) below the permitted limit
- Not working full-time; registered as job-seeker at Employment Service

## 2026 Monthly Amounts (ILS)

| Household | Amount |
|-----------|--------|
| Single | 2,887 |
| Single + child | 3,615 |
| Couple | 4,303 |
| Couple + child | 4,737 |

## How to Apply

1. Visit your nearest NII branch (bring ID)
2. Fill in claim form (also available at btl.gov.il)
3. Provide income documents: pay slips, bank statements
4. Decision within 30 days

📞 NII: 08-6709709`,
      am: `## የገቢ ዋስትና ምንድን ነው?

ዝቅተኛ ገቢ ላላቸው ሰዎች ቢቲኤል (ብሔራዊ ኢንሹራንስ) ወርሃዊ ክፍያ ይሰጣል።

## 2026 ወርሃዊ መጠን

- ነጠላ: 2,887 ሺ"ል
- ጥንዶች: 4,303 ሺ"ል

## ማመልከቻ
በቅርብ ቢቲኤል ቅርንጫፍ ወይም btl.gov.il

📞 08-6709709`,
    },
  },

  {
    title: {
      he: "זכויות אנשים עם מוגבלות בתעסוקה",
      en: "Employment Rights for People with Disabilities",
      am: "ለአካል ጉዳተኞች የሥራ መብቶች",
    },
    slug: {
      he: "disability-rights-employment",
      en: "disability-rights-employment",
      am: "disability-rights-employment",
    },
    govUrl:
      "https://www.gov.il/he/departments/topics/equal-rights-persons-with-disabilities",
    eligibilitySummary: {
      he: "חוק שוויון זכויות לאנשים עם מוגבלות מחייב מעסיקים להתאים את סביבת העבודה. זכאות לקצבת ניידות, הטבות מס, ופטור מחלק מעלות ביטוח הלאומי.",
      en: "The Equal Rights for Persons with Disabilities Law requires employers to make reasonable accommodations. Entitlements include a mobility allowance, tax benefits, and NII cost reduction.",
      am: "አካል ጉዳተኞች ሕጋዊ ጥበቃ ይፈቀድላቸዋል። ቀጣሪዎቹ ምቹ ሁኔታ ማዘጋጀት ይጠበቅባቸዋል።",
    },
    tags: ["disability", "employment", "legal"],
    bodies: {
      he: `## חוק שוויון זכויות לאנשים עם מוגבלות

חוק 5758-1998 (ותיקוניו) אוסר על אפליה של אנשים עם מוגבלות בתעסוקה ומחייב מעסיקים לבצע **התאמות סבירות** לאדם עם מוגבלות.

## מה הן "התאמות סבירות"?

- **התאמה פיזית**: כסא מיוחד, גובה שולחן, נגישות למקום העבודה
- **שעות עבודה**: גמישות לצורכי טיפול רפואי
- **ציוד מיוחד**: מחשב עם תוכנת קריאה, כלי שמיעה
- **עמדת עבודה**: קרבה לשירותים, מעלית

מעסיק **לא רשאי** לדחות מועמד מוכשר בגלל מוגבלות אם ניתן לבצע התאמה סבירה.

## קצבת ניידות (ביטוח לאומי)

אדם עם מוגבלות תנועתית זכאי לקצבת ניידות חודשית + הלוואה לרכישת רכב. תנאים: מוגבלות שאינה מאפשרת שימוש בתחבורה ציבורית.

## הטבות מס

- **נקודת זיכוי**: בעל מוגבלות מוכרת זכאי ל-2 נקודות זיכוי נוספות מס הכנסה
- **פטור ממס**: הכנסה מגמלת נכות פטורה ממס
- **מעסיק**: קיבל החזר 50% על תשלומי ביטוח לאומי

## ייעוץ ותלונות

- **נציב שוויון זכויות**: אם פוטרתם בגלל מוגבלות — הגישו תלונה בתוך 90 יום
- **תבקה**: ייעוץ חינם לאנשים עם מוגבלות בקהילה האתיופית
- **המוקד לזכויות נכים** (ביטוח לאומי): בדקו זכאות לכל הגמלאות

📞 נציב שוויון זכויות: 02-6664444 | ביטוח לאומי: 08-6709709 | תבקה: 1-800-20-20-16`,
      en: `## Equal Rights Law for Persons with Disabilities

Law 5758-1998 prohibits discrimination against people with disabilities in employment and requires employers to make **reasonable accommodations**.

## What are "Reasonable Accommodations"?

Physical adaptations (chair, desk height, accessibility), flexible hours for medical appointments, special equipment (screen reader, hearing aids), proximity to toilets, elevator access.

An employer **may not** reject a qualified candidate due to disability if reasonable accommodation is possible.

## Mobility Allowance (NII)

People with movement disabilities are entitled to a monthly mobility allowance + loan for vehicle purchase.

## Tax Benefits

- 2 additional income-tax credit points for recognised disability
- Disability benefit income is tax-exempt
- Employers receive 50% reimbursement on NII costs

## Complaints

If dismissed due to disability — file a complaint with the Equal Rights Commissioner within 90 days.

📞 Equal Rights Commissioner: 02-6664444 | NII: 08-6709709 | Tebeka: 1-800-20-20-16`,
      am: `## የአካል ጉዳተኞች የሥራ ሕግ

ሕጉ 5758 የሥራ ቦታ አድሎ ይከለክላል። ቀጣሪዎቹ ምቹ ሁኔታ ማዘጋጀት ይጠበቅባቸዋል።

## ዋና ጥቅሞቸ

- ወርሃዊ የሞባይል ቸነፈር
- ተጨማሪ 2 የቀረጥ ነጥቦቸ
- ቅሬታ ካለ: 02-6664444

📞 02-6664444 | tebeka.org.il`,
    },
  },

  // ── Wave 5 — 15 new rights entries ──────────────────────────────────────

  {
    title: {
      he: "קצבת ילדים — זכויות מלאות 2026",
      en: "Child Allowance — Full Rights 2026",
      am: "የልጆቸ ቅናሽ — ሙሉ መብቶቸ 2026",
    },
    slug: {
      he: "child-allowance-full-guide",
      en: "child-allowance-full-guide",
      am: "child-allowance-full-guide",
    },
    govUrl: "https://www.btl.gov.il/benefits/Child_Allowance/Pages/default.aspx",
    eligibilitySummary: {
      he: "כל ילד עד גיל 18 זכאי לקצבת ילדים. ב-2026: 162 ₪/חודש לילד ראשון, עולה עם כל ילד נוסף. מגישים בביטוח לאומי.",
      en: "Every child up to age 18 is entitled to child allowance. 2026: 162 ILS/month for the first child, increasing with each additional child.",
      am: 'ሁሉም ልጅ እስከ 18 ዓመት ቅናሽ ያገኛሉ። 2026: 162 ሺ"ל/ወር ለቀዳሚ ልጅ።',
    },
    tags: ["family", "btl", "benefits"],
    bodies: {
      he: `## מה זה קצבת ילדים?

קצבת ילדים היא תשלום חודשי לכל ילד עד גיל 18. מדינת ישראל מכירה בחשיבות גידול הילד ומסייעת לכל משפחה ללא קשר להכנסה.

## סכומים 2026

| סדר הילד | סכום חודשי |
|---------|-----------|
| ילד ראשון | 162 ₪ |
| ילד שני | 162 ₪ |
| ילד שלישי | 162 ₪ |
| ילד רביעי+ | 162 ₪ + תוספת |

## תוספות מיוחדות

- **ילד עם מוגבלות**: תוספת של עד 1,600 ₪/חודש
- **ילד לאם חד-הורית**: תוספת 100 ₪/חודש
- **ילד בפנימייה**: מחצית מהקצבה הרגילה

## איך מגישים?

1. **לאחר לידה**: הגישו ב-BTL תוך 12 חודשים (בדיעבד רטרואקטיבי)
2. **מסמכים**: תעודת לידה + ת"ז הורה + פרטי חשבון בנק
3. **אונליין**: btl.gov.il → "תביעות" → "קצבת ילדים"
4. **סניף**: סניף BTL הקרוב לבית

## מה לדעת על עולים חדשים

עולים חדשים זכאים לקצבה **מיום הרישום במרשם האוכלוסין** — לא מיום הלידה בחו"ל. הגישו מיד עם הגעה.

📞 BTL: 08-6709709 | btl.gov.il`,
      en: `## What is Child Allowance?

A monthly payment for every child up to age 18. 2026: 162 ILS/month per child (additional supplements for disabled children, single-parent families).

## How to Apply

Apply at BTL within 12 months of birth (retroactive payment available). Online: btl.gov.il → Claims → Child Allowance. Documents: birth certificate + parent ID + bank details.

## New Immigrants

Entitled from the date of registration in the population registry — not from birth abroad. Apply immediately upon arrival.

📞 BTL: 08-6709709`,
      am: `## ምን ነው?

ሁሉም ልጅ እስከ 18 ዓመት ወርሃዊ ቅናሽ ያገኛሉ።

📞 08-6709709 | btl.gov.il`,
    },
  },
  {
    title: {
      he: "גמלת שמירת היריון — זכויות אישה עובדת",
      en: "High-Risk Pregnancy Benefit — Rights for Working Women",
      am: "ከፍ ያለ ሪስክ ፅንስ ጥቅም — ለሠሪ ሴቶቸ",
    },
    slug: {
      he: "high-risk-pregnancy-benefit",
      en: "high-risk-pregnancy-benefit",
      am: "high-risk-pregnancy-benefit",
    },
    govUrl: "https://www.btl.gov.il/benefits/Maternity/Pages/default.aspx",
    eligibilitySummary: {
      he: "אישה שרופא ציווה עליה שמירת היריון זכאית לגמלה של 100% משכרה, ישירות מביטוח לאומי. אין צורך באישור מעסיק.",
      en: "A woman ordered to bed rest by a doctor is entitled to 100% of her salary from NII directly. No employer approval needed.",
      am: "ሐኪም ዕረፍት ያዘዘ ሴት 100% ደሞዝ ከቢቲኤል ያገኛሉ።",
    },
    tags: ["family", "btl", "health", "employment"],
    bodies: {
      he: `## מהי שמירת היריון?

כאשר רופא מחליט שאישה הרה לא יכולה לעבוד מסיבות רפואיות — היא זכאית ל"גמלת שמירת היריון" מביטוח לאומי. הגמלה מחליפה את השכר שהיא מפסידה.

## כמה מקבלים?

**100% משכר העבודה** — עד תקרה של כ-1,750 ₪/יום (נכון 2026). אין ימי המתנה.

## תנאי זכאות

- **אישור רפואי** מרופא/ה מוסמך לפחות: "שמירת היריון ל-X ימים"
- **עבדה לפחות 10 חודשים** ב-14 החודשים האחרונים
- **לא מקבלת שכר** מהמעסיק בתקופת השמירה

## תהליך הגשה

1. קבלת אישור רפואי (מטפל ראשוני, מומחה, ביה"ח)
2. הגשת תביעה ל-BTL תוך **7 ימים** מתחילת השמירה
3. BTL מעביר תשלום ישירות לחשבון הבנק
4. **לא צריך אישור מהמעסיק** — מגישים ישירות

## זכויות נוספות בהיריון

- **מניעת פיטורים**: אסור לפטר אישה הרה ללא אישור ועדה
- **ירידה בשכר**: אסור להוריד שכר בגלל היריון
- **תנאים מסוכנים**: ניתן לדרוש העברה לתפקיד בטוח יותר

📞 BTL: 08-6709709 | קו נשים: 1-800-200-800`,
      en: `## What is High-Risk Pregnancy Benefit?

When a doctor orders a pregnant woman to rest for medical reasons, she is entitled to a high-risk pregnancy benefit from NII — replacing the salary she is losing.

## Amount

**100% of salary** — up to approximately 1,750 ILS/day (2026). No waiting days.

## How to Apply

Get medical certificate stating "bed rest for X days." Submit claim to BTL within **7 days** of starting rest. BTL pays directly to bank account. **No employer approval needed.**

## Additional Pregnancy Rights

Prohibition on dismissal while pregnant (requires committee approval). Prohibition on salary reduction due to pregnancy. Right to transfer to safer role if current work is hazardous.

📞 BTL: 08-6709709`,
      am: `## ምን ነው?

ሐኪም ዕረፍት ያዘዘ ሴት 100% ደሞዝ ቀጥተኛ ከቢቲኤል ያገኛሉ።

📞 08-6709709`,
    },
  },
  {
    title: {
      he: "זכויות עובד זר — גם לעובדים בלתי מסמכים",
      en: "Foreign Worker Rights — Including Undocumented Workers",
      am: "የውጭ ሠራተኛ መብቶቸ — ሰነድ ለሌሉም ጭምር",
    },
    slug: {
      he: "foreign-worker-rights-undocumented",
      en: "foreign-worker-rights-undocumented",
      am: "foreign-worker-rights-undocumented",
    },
    govUrl: "https://www.gov.il/he/departments/topics/foreign-workers",
    eligibilitySummary: {
      he: "עובדים ללא מסמכים זכאים לשכר מינימום, תנאי עבודה בסיסיים ואינם ניתנים לגירוש בגלל הגשת תלונה. גם אם הם שוהים שלא כחוק.",
      en: "Undocumented workers are entitled to minimum wage, basic working conditions and cannot be deported for filing a complaint — even if residing illegally.",
      am: "ሰነድ ሌሉ ሠራተኞቸ ዝቅተኛ ደሞዝ ይፈቀዳቸዋል — ቅሬታ ቢቀርቡ አይባረሩም።",
    },
    tags: ["employment", "rights", "immigration"],
    bodies: {
      he: `## חשוב לדעת

בישראל, **זכויות עבודה חלות על כל עובד** — ללא קשר למעמד החוקי. גם מי שנמצא בישראל ללא אשרת שהייה תקפה זכאי לזכויות עבודה בסיסיות.

## זכויות בסיסיות

- **שכר מינימום**: 35.17 ₪/שעה (2026) — אף מעסיק לא רשאי לשלם פחות
- **ימי חופשה**: 12-24 ימים/שנה (תלוי ותק)
- **מחלה**: 1.5 ימי מחלה לכל חודש עבודה
- **פיצויי פיטורים**: לאחר שנה — חודש לכל שנת עבודה
- **שעות עבודה**: מקסימום 45 שעות/שבוע

## מניעת גירוש בגלל תלונה

**חוק עובדים זרים** מגן על עובד שמגיש תלונה — לא ניתן לגרשו בתקופת הבירור.

## למי לפנות?

| גוף | טלפון | נושא |
|-----|-------|------|
| **קו לעובד** | 1-800-354-354 | ייעוץ חינם |
| **רשות האוכלוסין** | 3450* | מעמד חוקי |
- **הסתדרות** | 03-6921111 | ייצוג עובדים |
| **תבקה** | 1-800-20-20-16 | ייצוג משפטי |

## לעובדים אתיופים ספציפית

חלק מהמהגרים הבלתי-חוקיים מאתיופיה — פלאשמורה שלא עלו רשמית — נמצאים בישראל במעמד לא מוסדר. הם זכאים לפנות ל-UNHCR ולבקש מעמד פליט.

📞 קו לעובד: 1-800-354-354 | UNHCR: unhcr.org.il`,
      en: `## Key Principle

In Israel, **labour rights apply to every worker** — regardless of legal status. Even those residing illegally are entitled to basic employment rights.

## Basic Rights

Minimum wage: 35.17 ILS/hour (2026). Annual leave: 12-24 days/year. Sick pay: 1.5 days/month worked. Severance: after 1 year — 1 month per year worked. Maximum hours: 45/week.

## Protection from Deportation

The Foreign Workers Law protects anyone filing a labour complaint — they cannot be deported during investigation proceedings.

## Who to Contact

Kav LaOved (free advice): 1-800-354-354 | Tebeka: 1-800-20-20-16 | UNHCR (refugee status): unhcr.org.il

📞 1-800-354-354`,
      am: `## ዋና ሕግ

ሁሉም ሠራተኞቸ — ሰነድ ቢሆን ባይሆን — መሠረታዊ የሥራ መብቶቸ ይፈቀዳቸዋል።

📞 1-800-354-354`,
    },
  },
  {
    title: {
      he: "זכות לתרגום משפטי — ניווט בתי המשפט בעברית",
      en: "Right to Legal Translation — Navigating Courts in Hebrew",
      am: "ሕጋዊ ትርጉም መብት — ዕብራይስጥ ፍርድ ቤቶቸ",
    },
    slug: {
      he: "legal-translation-court-rights",
      en: "legal-translation-court-rights",
      am: "legal-translation-court-rights",
    },
    govUrl: "https://www.gov.il/he/departments/topics/court-interpreter",
    eligibilitySummary: {
      he: "כל נאשם שאינו שולט בעברית זכאי למתרגם בחינם בכל הליך משפטי. זו זכות חוקתית שרבים אינם יודעים עליה.",
      en: "Every defendant who does not have command of Hebrew is entitled to a free interpreter in all court proceedings. A constitutional right many are unaware of.",
      am: "ዕብራይስጥ የማይችሉ ሁሉ — ነፃ ፍርድ ቤት ተርጓሚ የማግኘት ሕጋዊ መብት አላቸው።",
    },
    tags: ["legal", "rights", "civic"],
    bodies: {
      he: `## הזכות לתרגום

**חוק סדר הדין הפלילי** ו**פסיקת בית המשפט העליון** קובעים: כל אדם שאינו שולט בעברית זכאי למתרגם בחינם בכל הליך פלילי, אזרחי או מנהלי.

## מה כוללת הזכות?

- **חקירה במשטרה**: זכות לתרגום — בקשו "אני דורש מתרגם לאמהרית"
- **דיונים בבית-משפט**: שופט חייב לדאוג לתרגום
- **חתימה על מסמכים**: לא לחתום בלי הבנה מלאה
- **כתב אישום**: זכות לתרגום של מסמכים
- **גזר דין**: זכות להסבר בשפה המובנת

## מה לעשות אם מסרבים?

1. **אל תחתמו** על שום מסמך שלא הבנתם
2. אמרו: "אני מסרב להמשיך ללא מתרגם"
3. **ערעור**: פסיקה ללא תרגום ניתנת לביטול
4. **תלונה**: לנציב תלונות הציבור על שופטים

## עם מי לדבר

- **תבקה**: ייצוג חינם בפלילים — 1-800-20-20-16
- **הסנגוריה הציבורית**: ייצוג חינם לנאשמים ללא אמצעים — 02-5453555
- **ACRI**: תלונות על הפרת זכויות — 03-6936893

## מתרגמים מוסמכים

רשימת מתרגמים לאמהרית מאושרים על-ידי בתי-המשפט: בקשו מהמזכירות.

📞 תבקה: 1-800-20-20-16 | סנגוריה: 02-5453555`,
      en: `## The Right to Translation

The Code of Criminal Procedure and Supreme Court rulings establish: every person without command of Hebrew is entitled to a **free interpreter** in all criminal, civil and administrative proceedings.

## What the Right Covers

Police investigation (demand "interpreter for Amharic"). Court hearings. Signing documents (never sign without full understanding). Indictment documents. Sentencing (right to explanation in your language).

## What If Refused?

Don't sign any document you haven't understood. Say: "I refuse to continue without an interpreter." Rulings without translation can be appealed.

## Who to Contact

Tebeka (free criminal defence): 1-800-20-20-16 | Public Defender (free): 02-5453555 | ACRI (rights violations): 03-6936893

📞 1-800-20-20-16`,
      am: `## ትርጉም መብት

ዕብራይስጥ የማይችሉ ሁሉ ነፃ ፍርድ ቤት ተርጓሚ ይፈቀዳቸዋል — ህጋዊ መብት።

📞 ቴቤቃ: 1-800-20-20-16`,
    },
  },
  {
    title: {
      he: "ביטוח אבטלה — כל מה שצריך לדעת 2026",
      en: "Unemployment Insurance — Everything You Need to Know 2026",
      am: "የሥራ አጥነት ኢንሹራንስ — 2026 ሁሉ ምን ማወቅ ያስፈልጋል",
    },
    slug: {
      he: "unemployment-insurance-full-guide",
      en: "unemployment-insurance-full-guide",
      am: "unemployment-insurance-full-guide",
    },
    govUrl: "https://www.btl.gov.il/benefits/unemployment/Pages/default.aspx",
    eligibilitySummary: {
      he: "נרשמת ביום הראשון לאחר הפיטורים בלשכת התעסוקה. ביטוח אבטלה: עד 70% משכרך, עד 175 יום, עם ניכויים יומיים בעד עבודה.",
      en: "Register on the first day after dismissal at the Employment Service. Unemployment insurance: up to 70% of your salary, up to 175 days.",
      am: "ከሥራ ከወጡ በቀዳሚ ቀን ይመዝገቡ። እስከ 70% ደሞዝ፣ እስከ 175 ቀናት።",
    },
    tags: ["employment", "btl", "rights"],
    bodies: {
      he: `## מה זה דמי אבטלה?

**דמי אבטלה** הם תשלום מביטוח לאומי למי שאיבד עבודתו ומחפש עבודה חדשה. מדינת ישראל מאמינה שאדם מובטל ראוי לרשת ביטחון בזמן החיפוש.

## כמה מקבלים?

| תקופה | אחוז משכר |
|-------|-----------|
| חודש 1-4 | 70% |
| חודש 5+ | 60% |
| מקסימום יומי (2026) | 340 ₪ |
| ימים מקסימליים | 175 ימים |

## תנאי זכאות

- **שכיר** שפוטר (לא התפטר) — **חשוב!** אם התפטרתם מרצון ייתכן שלא תהיו זכאים
- עבדתם לפחות **12 חודשים** ב-18 האחרונים
- **נרשמתם בלשכת התעסוקה** (חובה — ביום הראשון!)
- לא עובדים ולא מרוויחים (מעל תקרה)

## שלבים קריטיים

1. **יום הפיטורים** — קבלו "אישור סיום עבודה" מהמעסיק
2. **יום למחרת** — הירשמו בלשכת התעסוקה (לא דחיה!)
3. **תוך שבועיים** — הגישו תביעה ב-BTL
4. **כל חודש** — חתמו על "הצהרת מובטל" ב-BTL

## אם פוטרתם בגלל קיצוצים

גם אם החברה קרסה — זכאים לדמי אבטלה. הגישו מיד.

## אם עבדתם בשתי עבודות

דמי אבטלה מחושבים לפי סכום כל השכר — לא רק עבודה אחת.

📞 BTL: 08-6709709 | לשכת תעסוקה: 1-800-300-026`,
      en: `## What is Unemployment Insurance?

An NII payment for people who have lost their job and are searching for new employment. Up to 70% of salary (months 1-4), 60% (month 5+). Maximum 175 days. Maximum daily: 340 ILS (2026).

## Key Conditions

Salaried employee dismissed (not resigned — critical!). Worked at least 12 months in the past 18. **Registered with Employment Service on the first day after dismissal.** Not working / not earning above threshold.

## Critical Steps

1. Day of dismissal: get "end of employment confirmation" from employer
2. **Next day**: register with Employment Service (no delay!)
3. Within two weeks: file claim at BTL
4. Monthly: sign "unemployed declaration" at BTL

📞 BTL: 08-6709709 | Employment Service: 1-800-300-026`,
      am: `## ምን ነው?

ከሥራ ከወጡ: ቀዳሚ ቀን ይመዝገቡ። 70% ደሞዝ (ወር 1-4)፣ 175 ቀናት ከፍ ያለ።

📞 08-6709709 | 1-800-300-026`,
    },
  },
  {
    title: {
      he: "ייעוץ משכנתא חינם — מדריך לזכאים",
      en: "Free Mortgage Counselling — Guide for Those Entitled",
      am: "ነፃ ሞርጌጅ ምክር — ለዘብታ ለሚፈቀዱ",
    },
    slug: {
      he: "free-mortgage-counselling",
      en: "free-mortgage-counselling",
      am: "free-mortgage-counselling",
    },
    govUrl: "https://www.gov.il/he/departments/topics/mortgage-counselling",
    eligibilitySummary: {
      he: "משרד השיכון מממן ייעוץ משכנתא חינמי לזכאי דיור. יועץ מוסמך עוזר לבחור משכנתא נכונה — חיסכון של עשרות אלפי שקלים.",
      en: "The Ministry of Housing funds free mortgage counselling for housing benefit recipients. A certified adviser saves tens of thousands of ILS in interest.",
      am: 'ቤት ድጎማ ዘብቶቸ ነፃ ሞርጌጅ ምክር ያገኛሉ — ከሺ ሺ ሺ"ሎቸ ወለድ ይቆጥባሉ።',
    },
    tags: ["housing", "mortgage", "rights"],
    bodies: {
      he: `## למה ייעוץ מקצועי?

רוב האנשים בוחרים משכנתא לבד — ומפסידים עשרות אלפי שקלים בריבית גבוהה מיותרת. יועץ משכנתאות מוסמך:
- משווה בין הצעות כל הבנקים
- מסביר את מסלולי הריבית (קבועה, משתנה, פריים)
- מוודא שתנצלו את כל ההטבות לזכאים

## הייעוץ החינמי — מי זכאי?

**ייעוץ חינם ממשרד השיכון** ניתן למי שמגיש בקשה לאחת מהתוכניות:
- זכאי **הלוואת 600,000 ₪**
- זכאי **מענק הומות**
- **עולים חדשים** עד 5 שנים מעלייה
- **אזרחים ותיקים** (גיל 67+)
- **עמידר/עמיגור** — דיירי דיור ציבורי הקונים דירה

**כיצד לקבל**: פנו למשרד השיכון האזורי → בקשו "ייעוץ משכנתאות" → תוקצה לכם יועץ מוסמך ללא עלות.

## מה לשאול את היועץ?

1. "מהי ריבית הפריים כיום ואיך היא משפיעה עליי?"
2. "מהו המסלול המתאים לי — קבוע, משתנה, או שילוב?"
3. "האם ניתן לשלב תוכנית 600K עם הלוואה בנקאית?"
4. "מתי כדאי לבצע מחזור?"

## יועצים קהילתיים

מספר יועצים מהקהילה האתיופית עצמה מציעים ייעוץ ראשוני חינם:
- חפשו ב-LinkedIn: "יועץ משכנתאות אתיופי"
- פורטל Tedros → [/he/professionals] — יועצי משכנתאות מהקהילה

📞 משרד השיכון: 5442* | sivan.housing.gov.il`,
      en: `## Why Professional Advice?

Most people choose mortgages alone — and lose tens of thousands of ILS in unnecessary high interest. A certified mortgage adviser compares all bank offers, explains interest tracks (fixed, variable, prime), and ensures you use all eligible benefits.

## Free Counselling — Who Qualifies?

Ministry of Housing free counselling for: 600K loan applicants, Homot grant applicants, new immigrants (up to 5 years), senior citizens (67+), public housing tenants buying an apartment.

How to access: Contact regional Housing Ministry → request "mortgage counselling" → free certified adviser assigned.

📞 Ministry of Housing: *5442`,
      am: `## ነፃ ምክር ምን ያደርጋል?

ሁሉም ባንኮቸ ያወዳድራሉ — ሺ ሺ ሺ"ሎቸ ወለድ ይቆጥባሉ።

📞 *5442`,
    },
  },
  {
    title: {
      he: "פיצויי פיטורים — הזכות שכולם צריכים לדעת",
      en: "Severance Pay — The Right Everyone Needs to Know",
      am: "የሥራ ማቋረጫ ካሳ — ሁሉም ሊያውቅ የሚገባ",
    },
    slug: {
      he: "severance-pay-guide",
      en: "severance-pay-guide",
      am: "severance-pay-guide",
    },
    govUrl: "https://www.gov.il/he/departments/topics/severance-pay",
    eligibilitySummary: {
      he: "כל עובד שפוטר לאחר שנת עבודה אחת מלאה זכאי לפיצויי פיטורים: חודש שכר לכל שנת עבודה. גם ממשכורת אחרונה, לא ממוצע.",
      en: "Every employee dismissed after one full year of work is entitled to severance: one month's last salary per year of work — calculated on last salary, not average.",
      am: "ሙሉ 1 ዓመት ከሠሩ በኋላ ከስንብት ካሳ ይፈቀዳቸዋል: ለዓመት ወር ደሞዝ።",
    },
    tags: ["employment", "rights", "legal"],
    bodies: {
      he: `## מה זה פיצויי פיטורים?

**פיצויי פיטורים** הם תשלום שמעסיק חייב לשלם לעובד שפיטר אותו. הם מטרתם לאפשר לעובד "ריפוד" כלכלי עד למציאת עבודה חדשה.

## החישוב

**נוסחה**: שכר חודשי אחרון × שנות עבודה

**דוגמה**: עבדתם 5 שנים בשכר של 8,000 ₪/חודש:
8,000 × 5 = **40,000 ₪**

**שימו לב**: מחשבים לפי **שכר אחרון** — לא ממוצע. אם השכר עלה — יותר טוב לכם.

## מתי מגיע?

- **פיטורים**: תמיד (אחרי שנה)
- **מוות**: לשאירים
- **נכות**: לא יכול להמשיך לעבוד
- **עזיבה מרצון**: לרוב לא (חריגים: מחלה, הטרדה)
- **פנסיה**: לרוב כלול בקרן הפנסיה

## היכן הכסף?

מאז 2008, מעסיקים חייבים לשלם לקרן פנסיה — חלק מהפקדות הן "פיצויים". בדקו בתלוש: שורת "פיצויים".

## מה אם מסרבים לשלם?

1. **תלונה בממונה על חוק עבודה**: 02-6667222
2. **תביעה בבית-דין לעבודה**: ניתן לתבוע ללא עורך דין
3. **קו לעובד**: 1-800-354-354

## טיפ לאתיופים

אם עבדתם "בשחור" (ללא תלוש) — עדיין זכאים! אפשר להוכיח עבודה עם: העברות בנק, עדים, הודעות וואטסאפ.

📞 קו לעובד: 1-800-354-354 | ממונה: 02-6667222`,
      en: `## What is Severance Pay?

Payment that an employer must make to a dismissed employee. Formula: **last monthly salary × years worked**.

Example: 5 years at 8,000 ILS/month = **40,000 ILS**. Calculated on **last salary** — not average. If your salary increased, this helps you.

## When Are You Entitled?

Dismissal (always, after 1 year). Death (to heirs). Disability (cannot continue working). Resignation (usually not — exceptions: illness, harassment).

## Where Is the Money?

Since 2008, employers must pay pension fund contributions — part of these are "severance." Check your pay slip: "pitzuim" (severance) line.

## If Refused

Complaint to Labour Commissioner: 02-6667222 | Labour Court claim (no lawyer needed) | Kav LaOved: 1-800-354-354

## Tip for Ethiopian-Israelis

If you worked "off the books" (no pay slip) — you are still entitled. Prove employment with: bank transfers, witnesses, WhatsApp messages.

📞 1-800-354-354`,
      am: `## ምን ነው?

ከሥራ ከወጡ: ለዓመት ወር ደሞዝ ካሳ ይፈቀዳቸዋል።

ቁጥር: ዕለታዊ ደሞዝ × ዓመቶቸ = ካሳ

📞 1-800-354-354`,
    },
  },
  {
    title: {
      he: "זכות לדיור ציבורי — רשימת ממתינים ואיך מגישים",
      en: "Right to Public Housing — Waiting List and How to Apply",
      am: "የህዝብ ቤት መብት — መጠበቂያ ዝርዝር እና ማመልከቻ",
    },
    slug: {
      he: "public-housing-waiting-list",
      en: "public-housing-waiting-list",
      am: "public-housing-waiting-list",
    },
    govUrl: "https://www.gov.il/he/departments/topics/public-housing",
    eligibilitySummary: {
      he: "משפחות בעלות הכנסה נמוכה ותושבות ותיקה יכולות להגיש לדיור ציבורי. ממוצע המתנה: 8-15 שנים, אך יש עדיפויות לזכאים מיוחדים.",
      en: "Low-income families with long residency can apply for public housing. Average wait: 8-15 years, but special eligible groups receive priority.",
      am: "ዝቅተኛ ገቢ ያላቸው ቤተሰቦቸ ለህዝብ ቤት ማመልከት ይችላሉ። አማካኝ ጊዜ: 8-15 ዓመታት።",
    },
    tags: ["housing", "rights", "social_welfare"],
    bodies: {
      he: `## מה זה דיור ציבורי?

**דיור ציבורי** הוא דירה בבעלות המדינה (עמידר/עמיגור) שמושכרת במחיר מסובסד (כ-20-30% משוק) למשפחות בעלות הכנסה נמוכה.

## מי זכאי?

**תנאים בסיסיים:**
- תושב ישראל לפחות **12 שנים**
- אין בבעלותך דירה (או חלק מדירה)
- הכנסה חודשית מתחת לתקרה (לפי גודל משפחה)

**עדיפות ראשונה:**
- נכה עם מוגבלות פיזית קשה
- קשיש חסר דיור
- משפחה עם ילד נכה

## ממוצע המתנה

- **בכלל**: 8-15 שנים
- **קריית מלאכי**: 12-16 שנים
- **נתניה**: 10-14 שנים

## איך מגישים?

1. פנו לסניף **עמידר** הקרוב (עמיגור בצפון): amigour.co.il
2. מלאו טופס בקשה
3. הוכיחו: הכנסה (תלושים), תושבות (ת"ז+חוזה שכירות), מצב מגורים
4. ממתינים ברשימה

## עדיפות לעולים חדשים

עולי אתיופיה (פלאשמורה ומבצע שלמה) זכאים ל**עדיפות** על רשימת ממתינים לפי צו מיוחד — בדקו עם משרד הקליטה.

📞 עמידר: 03-9533333 | עמיגור: 04-8507777 | משרד השיכון: 5442*`,
      en: `## What is Public Housing?

State-owned apartments (Amidar/Amigour) rented at subsidised prices (~20-30% of market rate) to low-income families.

## Who Qualifies?

Israeli resident for at least **12 years**; no property ownership; income below threshold (by family size). Priority: severe physical disability, homeless elderly, family with disabled child.

## Average Wait Time

8-15 years nationally. Apply regardless — the clock starts from application date.

## Special Priority for Ethiopian Immigrants

Falashmura and Operation Solomon olim may have **priority** on the waiting list under special government decree — check with Ministry of Aliyah.

📞 Amidar: 03-9533333 | Ministry of Housing: *5442`,
      am: `## ምን ነው?

መንግስት ቤቶቸ (20-30% ከ ገበያ ዋጋ) ዝቅተኛ ደሞዝ ቤተሰቦቸ ይሰጣቸዋል።

ቀጠሮ: 8-15 ዓመት — ዛሬ ያመልክቱ!

📞 03-9533333`,
    },
  },
  {
    title: {
      he: "ביטוח לאומי לחייל משוחרר — כל הגמלאות",
      en: "NII Benefits for Discharged Soldiers — All Allowances",
      am: "ለተሰናበቱ ወታደሮቸ ቢቲኤል ጥቅሞቸ",
    },
    slug: {
      he: "nii-benefits-discharged-soldiers",
      en: "nii-benefits-discharged-soldiers",
      am: "nii-benefits-discharged-soldiers",
    },
    govUrl: "https://www.btl.gov.il/benefits/rehabilitation/Pages/default.aspx",
    eligibilitySummary: {
      he: "חייל שהשתחרר זכאי לגמלאות BTL: ביטוח בריאות, אבטלה ל-30 ימים ראשונים, ועוד תלוי מצב. חשוב לפנות ביום הראשון.",
      en: "A discharged soldier is entitled to NII benefits: health insurance, 30-day unemployment buffer and more depending on circumstances. Contact NII on day one.",
      am: "የተሰናበቱ ወታደሮቸ ቢቲኤል ጥቅሞቸ ያለቸው: ጤና ኢንሹራንስ፣ 30 ቀን የሥራ አጥነት ቸናፈ።",
    },
    tags: ["army", "btl", "rights", "employment"],
    bodies: {
      he: `## ביום השחרור

חייל שמשתחרר מצה"ל מקבל "תעודת שחרור" — זהו מסמך קריטי. **לא לאבד!**

## גמלאות BTL לחיילים משוחררים

### 1. ביטוח בריאות מיידי
מיום השחרור — ביטוח בריאות מלא עד שתירשמו לקופת חולים (30 יום). **לא צריך לעשות כלום** — אוטומטי.

### 2. דמי אבטלה ל-30 הימים הראשונים
בשונה מעובד רגיל — חייל משוחרר **לא צריך להוכיח** שחיפש עבודה ב-30 הימים הראשונים. מקבל דמי אבטלה אוטומטית.

**כיצד לקבל**: הירשמו בלשכת תעסוקה ביום השחרור.

### 3. שיפוי על לימודים

חיילים שהחלו לימודים תוך 3 חודשים מהשחרור זכאים להחזר על שכר הלימוד — בדקו עם המוסד האקדמי.

### 4. מענק לשיקום

חיילים שפיתחו בעיה רפואית במהלך השירות (גב, פגיעת ראש, PTSD) — הגישו ל**אגף השיקום** תוך שנה מהשחרור.

## לוח הפעולות

| יום | מה לעשות |
|-----|---------|
| יום 1 | הירשמו בלשכת תעסוקה |
| שבוע 1 | בחרו קופת חולים |
| שבוע 2 | הגישו בקשת מלגה לאקדמיה |
| חודש 1 | בדקו זכאות לאגף שיקום |
| חודש 3 | בדיקת נסיבות לפיצויים |

📞 BTL: 08-6709709 | אגף שיקום: 03-7381111`,
      en: `## On Discharge Day

A discharged IDF soldier receives a "discharge certificate" — a critical document. Don't lose it.

## NII Benefits for Discharged Soldiers

**Immediate health insurance**: from discharge day, full coverage until registering with a health fund (30 days). Automatic — no action needed.

**30-day unemployment**: unlike regular employees, discharged soldiers don't need to prove job-seeking for the first 30 days. Register at Employment Service on discharge day.

**Academic study reimbursement**: soldiers starting studies within 3 months of discharge may receive tuition reimbursement — check with the academic institution.

**Rehabilitation grant**: soldiers who developed medical issues during service (back, head injury, PTSD) — apply to the Rehabilitation Division within 1 year.

📞 BTL: 08-6709709 | Rehabilitation Division: 03-7381111`,
      am: `## ቀዳሚ ቀን

ቢቲኤልን ይመዝገቡ — 30 ቀን ዝቅ ያለ ጥቅሞቸ ይፈቀዳቸዋል።

📞 08-6709709 | 03-7381111`,
    },
  },
  {
    title: {
      he: "מלגות ללא תנאים — 7 מקורות פחות מוכרים",
      en: "Unconditional Scholarships — 7 Lesser-Known Sources",
      am: "ያለ ቅድመ ሁኔታ ዕርዳታ — 7 ያልታወቁ ምንጮቸ",
    },
    slug: {
      he: "unconditional-scholarships-7-sources",
      en: "unconditional-scholarships-7-sources",
      am: "unconditional-scholarships-7-sources",
    },
    govUrl: "https://che.org.il/scholarships",
    eligibilitySummary: {
      he: "מלגות שלרוב לא ידועות: JDC, מנחם בגין, ברכה, ג'וינט, קרן שלם ועוד. חלקן ייחודיות ליוצאי אתיופיה.",
      en: "Lesser-known scholarships: JDC, Menachem Begin, Bracha, Joint, Shalem Fund and more. Some are specific to Ethiopian-Israelis.",
      am: "ብዙ ሰዎቸ የማያውቁ ዕርዳታዎቸ: JDC፣ Begin፣ ጆይንት፣ ሻሌም ፈንድ።",
    },
    tags: ["education", "rights", "community"],
    bodies: {
      he: `## למה מלגות "בלי תנאים"?

רוב המלגות דורשות: ציון גבוה, מוצא ספציפי, שדה לימוד ספציפי. כאן — מלגות שפחות ידועות ודורשות פחות תנאים.

## 7 מקורות מלגות

### 1. JDC-Ashalim — מלגת "כישורים ייחודיים"
עד **20,000 ₪/שנה** לסטודנטים מהפריפריה הסוציו-אקונומית. לא דורשת ציון מינימלי — דורשת מוטיבציה ומעורבות קהילתית.
📞 jdc.org.il/ashalim | 03-9533420

### 2. קרן שלם — מלגת מנהיגות
**12,000 ₪/שנה** למנהיגים צעירים בני 18-25 עם פוטנציאל הנהגה. מדגישה מגוון — יוצאי אתיופיה מועדפים.
📞 shalemfund.org.il

### 3. מלגת "ראשית" — אוניברסיטת ת"א
**10,000 ₪/שנה** לסטודנטים מצטיינים מהפריפריה. אין מחויבות לתחום לימוד.
📞 tau.ac.il/scholarships

### 4. קרן מנחם בגין
**8,000 ₪/שנה** לסטודנטים מהפריפריה בכלל התחומים. אחת הגדולות — וסלקטיבית פחות.
📞 beginheritage.co.il

### 5. JNF (קק"ל) — מלגות פיתוח
**6,000-12,000 ₪/שנה** לתחומים: חקלאות, מדעי הסביבה, תכנון עירוני, הנדסה.
📞 kkl-jnf.org.il

### 6. פנינה — מלגת ברכה
מלגת **5,000 ₪** ספציפית ליוצאות אתיופיה לתואר ראשון. הגשה: אפריל בכל שנה.
📞 brachafund.org.il

### 7. מלגות המוסד האקדמי עצמו
כל אוניברסיטה מקיימת מלגות פנימיות שלא מפורסמות — פנו **ישירות לרפרנט הסוציאלי** של המוסד.

## איך להגיש?

1. בדקו תנאים ב: milgapo.co.il (מאגר מלגות)
2. הכינו: ת.ז, תלוש הורים, אישור לימודים, מכתב מוטיבציה
3. הגישו **מוקדם** — מרבית המלגות על בסיס "ראשון-ראשון"

📞 milgapo.co.il | che.org.il`,
      en: `## 7 Lesser-Known Scholarship Sources

1. **JDC-Ashalim**: up to 20,000 ILS/year. No minimum grade required — requires community involvement. jdc.org.il/ashalim
2. **Shalem Fund**: 12,000 ILS/year for young leaders aged 18-25. Ethiopian-Israelis preferred. shalemfund.org.il
3. **Reshit (TAU)**: 10,000 ILS/year for high-achieving periphery students. No field restriction. tau.ac.il/scholarships
4. **Menachem Begin Fund**: 8,000 ILS/year, all fields. beginheritage.co.il
5. **JNF/KKL**: 6,000-12,000 ILS/year for agriculture, environment, engineering. kkl-jnf.org.il
6. **Penina-Bracha Fund**: 5,000 ILS specifically for Ethiopian-Israeli women, first degree. brachafund.org.il
7. **Internal university scholarships**: Every university has unpublicised internal grants — contact the social worker at your institution directly.

Scholarship database: milgapo.co.il | che.org.il`,
      am: `## 7 ዕርዳታ ምንጮቸ

1. JDC-Ashalim: 20,000 ሺ"ል/ዓ | jdc.org.il
2. Shalem Fund: 12,000 ሺ"ል | shalemfund.org.il
3. Begin Fund: 8,000 ሺ"ል | beginheritage.co.il
4. Bracha Fund (ሴቶቸ): 5,000 ሺ"ል | brachafund.org.il

📞 milgapo.co.il`,
    },
  },
  {
    title: {
      he: "נגישות לשירותי ממשלה באמהרית — מדריך מלא",
      en: "Access to Government Services in Amharic — Complete Guide",
      am: "በአምሃርኛ የመንግስት አገልግሎቶቸ ተደራሽነት — ሙሉ መመሪያ",
    },
    slug: {
      he: "government-services-amharic-access",
      en: "government-services-amharic-access",
      am: "government-services-amharic-access",
    },
    govUrl: "https://www.gov.il/he",
    eligibilitySummary: {
      he: "לפי חוק — כל גוף ציבורי חייב לספק שירותים בשפות מיעוט. מדריך לכל הגופים הממשלתיים עם שירות באמהרית.",
      en: "By law — every public body must provide services in minority languages. Guide to all government agencies offering Amharic service.",
      am: "ሕጉ: ሁሉም የህዝብ ዘርፎቸ በአናሳ ቋንቋዎቸ አገልግሎት ይስጣሉ — በአምሃርኛ ጨምሮ።",
    },
    tags: ["rights", "civic", "immigration"],
    bodies: {
      he: `## הזכות לשירות בשפת האם

חוק שוויון זכויות האזרח ופסיקות בית-המשפט העליון קובעים: גופים ציבוריים חייבים לספק שירות לדוברי שפות מיעוט, כולל אמהרית.

## שירותי ממשלה עם אמהרית

| גוף | שירות אמהרית | טלפון |
|-----|-------------|-------|
| **ביטוח לאומי (BTL)** | נציג דובר אמהרית | 08-6709709 |
| **משרד הקליטה** | מרכז קליטה + קו | 3450* |
| **משרד הבריאות** | קו"ל לבריאות | 1-700-500-400 |
| **משרד החינוך** | שירות עולים | 02-5602222 |
| **מכבי שירותי בריאות** | נציג אמהרית | 3555* |
| **כללית** | מרכז שפות | 2701* |
| **אגודת בני-ברית** | מרכז שפות | שאלו |

## זכויות שאינן ידועות

**בדיון משפטי**: זכות למתרגם (ראו מדריך ייעודי).
**בבית החולים**: כל ביה"ח חייב לספק מתרגם — בקשו "מתרגם לאמהרית".
**בבית-ספר ילדים**: הורים זכאים לתקשורת בשפה מובנת.

## אפליקציות ממשלה

- **myisrael.gov.il**: שירותים ממשלתיים דיגיטליים — לרוב בעברית בלבד
- **Gov.il**: אתר ממשלתי — בעברית, ערבית, אנגלית
- **BTL אפליקציה**: גישה לכל הגמלאות — ממשק עברי + ייעוץ טלפוני אמהרית

## טיפ לשימוש בשירות ממשלה

כשמתקשרים לכל גוף ממשלתי, אמרו מיד:
**"שלום, אני דורש/ת שירות באמהרית — Amharic please"**

רוב הגופים יעבירו לנציג מתאים תוך דקות.

📞 BTL: 08-6709709 | משרד הקליטה: 3450*`,
      en: `## The Right to Service in Your Language

Civil Rights Equality Law and Supreme Court rulings require public bodies to provide service to minority language speakers, including Amharic.

## Government Services with Amharic

NII (BTL): Amharic-speaking agent — 08-6709709. Ministry of Aliyah: absorption centre + line — *3450. Ministry of Health: Kol LaBriut — 1-700-500-400. Maccabi: Amharic agent — *3555. Clalit: language centre — *2701.

## Unknown Rights

Court proceedings: right to interpreter. Hospital: every hospital must provide a translator — request "Amharic translator." School (for your children): parents entitled to communication in understandable language.

## Tip

When calling any government body, say immediately: **"Amharic please"** — most will transfer to a suitable agent within minutes.

📞 BTL: 08-6709709 | Ministry of Aliyah: *3450`,
      am: `## የቋንቋ አገልግሎት መብት

ሕጉ ሁሉም የህዝብ ዘርፎቸ በአምሃርኛ ጨምሮ አናሳ ቋንቋዎቸ አገልግሎት ይስጣሉ ይላል።

## ዋና ቁጥሮቸ

- ቢቲኤሎ: 08-6709709
- ቆሊያህ: 3450*
- ቆሎ ለብሪዩት: 1-700-500-400`,
    },
  },

  // ── Wave 6 — sourced from Ministry of Education (mosdot.education.gov.il),
  // Kol-Zchut and the Freedom-of-Information portal (foi.gov.il). The exact
  // shekel amount is NOT published here: it varies per student by aliyah
  // date, education stage and country of origin (per all three sources),
  // and the only concrete figures we found in search (626/907/1,125 ₪) trace
  // back to a 2015–2016 Director-General circular — not current, so they are
  // deliberately omitted per the "no fabricated/stale numbers" policy. Users
  // are pointed to the school/Ministry of Education to get the current,
  // correct figure for their case. AM fields are AI-translated (not yet
  // reviewed by a native Amharic speaker) — see in-body disclaimer.
  {
    title: {
      he: "סל קליטה לתלמידים עולים",
      en: "Absorption Basket for Immigrant Students",
      am: "የመቀበያ ቅርጫት ለስደተኛ ተማሪዎች",
    },
    slug: {
      he: "student-absorption-basket",
      en: "student-absorption-basket",
      am: "student-absorption-basket",
    },
    govUrl: "https://mosdot.education.gov.il/students/immigrants/absorption_basket",
    eligibilitySummary: {
      he: "לכל תלמיד/ה עולה חדש/ה, כולל יוצאי אתיופיה. הסכום משתנה לפי תאריך העלייה, שכבת הגיל וארץ המוצא — בדקו את הסכום המדויק מול בית הספר או משרד החינוך.",
      en: "For every new immigrant student, including Ethiopian-Israelis. The amount varies by aliyah date, age group and country of origin — check the exact figure with the school or Ministry of Education.",
      am: "ኢትዮጵያዊ ተወላጆችን ጨምሮ ለሁሉም አዲስ ስደተኛ ተማሪ። መጠኑ እንደ የዓሊያ ቀን፣ የትምህርት ደረጃ እና የትውልድ ሀገር ይለያያል — ትክክለኛውን መጠን ከትምህርት ቤቱ ወይም ከትምህርት ሚኒስቴር ያረጋግጡ።",
    },
    tags: ["new_immigrant", "education"],
    bodies: {
      he: `## מה זה סל קליטה?

סל קליטה — הנקרא גם "אגרת חינוך" — הוא סיוע כספי שמעביר משרד החינוך למוסד הלימודים של כל תלמיד/ה עולה, כדי לסייע במימון הוצאות חינוך בתחילת השנה: ספרי לימוד, פעילויות תרבות, טיולים ואירועים שהורים של תלמידים ותיקים בדרך כלל נדרשים לממן בעצמם.

## למי זה מיועד?

לכל תלמיד/ה עולה חדש/ה במערכת החינוך הישראלית, כולל תלמידים יוצאי אתיופיה. גובה הסיוע נקבע לכל תלמיד/ה **באופן פרטני**, לפי שלושה משתנים:

- **תאריך העלייה** ארצה
- **שכבת הגיל/החינוך** — יסודי, חטיבת ביניים או חטיבה עליונה
- **ארץ המוצא**

בשל כך, אין סכום אחיד שמתאים לכולם — והוא גם משתנה משנה לשנה.

## מה כלול בסל?

- מימון ספרי לימוד לקראת תחילת שנת הלימודים
- מימון פעילויות שבבתי ספר רבים ההורים נדרשים לממן בעצמם — טיולים, סל תרבות, אירועים בית-ספריים
- הכסף מועבר מהמדינה לרשות המקומית / לבעלות על בית הספר, שמעבירה אותו הלאה לבית הספר עבור התלמיד/ה

**חשוב:** הסכום המדויק בשקלים תלוי בתאריך העלייה, בשכבת הגיל ובארץ המוצא של כל תלמיד/ה — יש לבדוק את הסכום הרלוונטי מול בית הספר או משרד החינוך, ולא להסתמך על מספר קבוע שמופיע באתר כלשהו (כולל מספרים ישנים שעדיין מסתובבים ברשת מחוזרי עבר).

## איך פונים ובודקים זכאות?

1. ברוב המקרים אין צורך בהגשת בקשה נפרדת — בית הספר מקבל את הסל ומחויב ליידע את ההורים על הסכום שהתקבל ועל מה הוא הוצא, וההורים חותמים על קבלתו.
2. אם בית הספר גבה מכם כסף מראש (על טיולים, ספרים וכד') ולאחר קבלת סל הקליטה נותרה יתרה לזכות התלמיד/ה — בית הספר **חייב** להחזיר את היתרה להורים.
3. לבירור הזכאות והסכום המדויק לתלמיד/ה שלכם — פנו למזכירות בית הספר, למחוז משרד החינוך, או עיינו במקורות הרשמיים:
   - משרד החינוך: [סל קליטה לתלמידים עולים](https://mosdot.education.gov.il/students/immigrants/absorption_basket)
   - כל-זכות: [תשלום אגרת חינוך (סל קליטה) לתלמידים יוצאי אתיופיה](https://www.kolzchut.org.il/he/%D7%AA%D7%A9%D7%9C%D7%95%D7%9D_%D7%90%D7%92%D7%A8%D7%AA_%D7%97%D7%99%D7%A0%D7%95%D7%9A_(%D7%A1%D7%9C_%D7%A7%D7%9C%D7%99%D7%98%D7%94)_%D7%9C%D7%AA%D7%9C%D7%9E%D7%99%D7%93%D7%99%D7%9D_%D7%99%D7%95%D7%A6%D7%90%D7%99_%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94)
   - חוק חופש המידע: [סל קליטה לעולים יוצאי אתיופיה](https://foi.gov.il/he/node/1780)`,
      en: `## What is the absorption basket?

The absorption basket — also called "education fee" — is financial support the Ministry of Education transfers to every immigrant student's school, to help cover start-of-year education costs: textbooks, cultural activities, trips and events that parents of veteran students usually have to pay for themselves.

## Who is it for?

Every new immigrant student in the Israeli education system, including Ethiopian-Israelis. The support amount is set **individually per student**, based on three factors:

- **Aliyah (immigration) date**
- **Education stage** — elementary, middle school or high school
- **Country of origin**

Because of this, there is no single amount that applies to everyone, and it also changes from year to year.

## What's included?

- Funding for textbooks at the start of the school year
- Funding for activities that parents at many schools are otherwise expected to pay for themselves — trips, cultural programs, school events
- The money is transferred from the state to the local authority / school ownership entity, which passes it on to the school for the student

**Important:** the exact shekel amount depends on the student's aliyah date, education stage and country of origin — check the relevant figure with the school or Ministry of Education directly, rather than relying on a fixed number found online (including outdated figures still circulating from old circulars).

## How to apply / check eligibility

1. In most cases there's no separate application — the school receives the basket and is required to inform parents of the amount received and what it was spent on; parents sign to acknowledge receipt.
2. If the school charged you in advance (for trips, books, etc.) and a balance remains after the basket is received, the school **must** refund the balance to parents.
3. To check eligibility and the exact amount for your child — contact the school office, the local Ministry of Education district, or the official sources:
   - Ministry of Education: [Absorption basket for immigrant students](https://mosdot.education.gov.il/students/immigrants/absorption_basket)
   - Kol-Zchut: [Education fee (absorption basket) for Ethiopian-Israeli students](https://www.kolzchut.org.il/he/%D7%AA%D7%A9%D7%9C%D7%95%D7%9D_%D7%90%D7%92%D7%A8%D7%AA_%D7%97%D7%99%D7%A0%D7%95%D7%9A_(%D7%A1%D7%9C_%D7%A7%D7%9C%D7%99%D7%98%D7%94)_%D7%9C%D7%AA%D7%9C%D7%9E%D7%99%D7%93%D7%99%D7%9D_%D7%99%D7%95%D7%A6%D7%90%D7%99_%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94)
   - Freedom of Information portal: [Absorption basket for Ethiopian-Israeli immigrants](https://foi.gov.il/he/node/1780)`,
      am: `## የመቀበያ ቅርጫት ምንድን ነው?

የመቀበያ ቅርጫት — "የትምህርት ክፍያ" ተብሎም ይጠራል — የትምህርት ሚኒስቴር ለእያንዳንዱ ስደተኛ ተማሪ ትምህርት ቤት የሚያስተላልፈው የገንዘብ ድጋፍ ነው፣ በዓመቱ መጀመሪያ የትምህርት ወጪዎችን ለመሸፈን የሚረዳ፦ የመማሪያ መጻሕፍት፣ የባህል እንቅስቃሴዎች፣ ጉዞዎች እና ዝግጅቶች — በተለምዶ የቆዩ ተማሪዎች ወላጆች ራሳቸው የሚከፍሏቸው ወጪዎች።

## ለማን የተዘጋጀ ነው?

በእስራኤል የትምህርት ሥርዓት ውስጥ ላለ ለማንኛውም አዲስ ስደተኛ ተማሪ፣ የኢትዮጵያ ተወላጆችን ጨምሮ። የድጋፉ መጠን ለእያንዳንዱ ተማሪ **በተናጠል** በሦስት ተለዋዋጮች መሠረት ይወሰናል፦

- **የዓሊያ (ስደት) ቀን**
- **የትምህርት ደረጃ** — አንደኛ ደረጃ፣ መካከለኛ ወይም ሁለተኛ ደረጃ
- **የትውልድ ሀገር**

በዚህ ምክንያት፣ ለሁሉም የሚስማማ አንድ ወጥ መጠን የለም — እና ከዓመት ወደ ዓመትም ይለያያል።

## ምን ይካተታል?

- ለትምህርት ዓመት መጀመሪያ የመማሪያ መጻሕፍት ፋይናንስ
- በብዙ ትምህርት ቤቶች ወላጆች ራሳቸው እንዲከፍሉ የሚጠየቁ እንቅስቃሴዎች ፋይናንስ — ጉዞዎች፣ የባህል ፕሮግራሞች፣ የትምህርት ቤት ዝግጅቶች
- ገንዘቡ ከመንግስት ወደ አካባቢው ባለስልጣን / የትምህርት ቤት ባለቤትነት አካል ይተላለፋል፣ እሱም ለተማሪው ወደ ትምህርት ቤቱ ያስተላልፋል

**አስፈላጊ፦** ትክክለኛው የሸቀል መጠን እንደ ተማሪው የዓሊያ ቀን፣ የትምህርት ደረጃ እና የትውልድ ሀገር ይወሰናል — ትክክለኛውን መጠን ከትምህርት ቤቱ ወይም ከትምህርት ሚኒስቴር ጋር በቀጥታ ያረጋግጡ፣ በመስመር ላይ በሚገኝ ቋሚ ቁጥር ላይ (ከአሮጌ ዑደቶች የቀሩ ቁጥሮችን ጨምሮ) አይተማመኑ።

## እንዴት ማመልከት / ብቁነትን ማረጋገጥ

1. በአብዛኛዎቹ ሁኔታዎች የተለየ ማመልከቻ አያስፈልግም — ትምህርት ቤቱ ቅርጫቱን ይቀበላል እና የተቀበለውን መጠን እና በምን እንደ ወጣ ወላጆችን የማሳወቅ ግዴታ አለበት፤ ወላጆች መቀበላቸውን ለማረጋገጥ ይፈርማሉ።
2. ትምህርት ቤቱ አስቀድሞ ገንዘብ ከጠየቀዎት (ለጉዞዎች፣ መጻሕፍት፣ ወዘተ) እና ቅርጫቱ ከተቀበለ በኋላ ለተማሪው ቀሪ ገንዘብ ካለ — ትምህርት ቤቱ ቀሪውን ለወላጆች **መመለስ አለበት**።
3. ለልጅዎ ትክክለኛውን ብቁነት እና መጠን ለማረጋገጥ — ወደ ትምህርት ቤት ጽሕፈት ቤት፣ የትምህርት ሚኒስቴር ወረዳ ይደውሉ፣ ወይም ኦፊሴላዊ ምንጮችን ይመልከቱ፦
   - የትምህርት ሚኒስቴር፦ mosdot.education.gov.il/students/immigrants/absorption_basket
   - ኮል-ዝኹት (Kol-Zchut)፦ ለኢትዮጵያ ተወላጅ ተማሪዎች የትምህርት ክፍያ (የመቀበያ ቅርጫት)
   - የመረጃ ነጻነት ፖርታል፦ foi.gov.il/he/node/1780

*[የAI ትርጉም — ከንግድ/ገንዘብ ጋር በተያያዙ ዝርዝሮች ላይ ከመተማመንዎ በፊት በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግመው ይመከራል።]*`,
    },
  },

  // ── Wave 6 (cont'd) — sourced from the Employment Service (מינהל
  // התעסוקה, משרד העבודה) official briefing page for the "Lamerchak"
  // ("Toward Distance") program, and a gov.il tender that confirms the
  // program is an active, ongoing national initiative (not a one-off
  // pilot). The briefing page is aimed at program operators/managers, not
  // participants, and has no explicit "last updated" date, no direct
  // registration flow and no published stipend/budget figures — none of
  // these are invented here. Users are pointed to the Employment Service
  // (מינהל תעסוקת אוכלוסיות ייחודיות) to ask about enrollment in their
  // area. AM field is AI-translated (not yet reviewed by a native Amharic
  // speaker) — see in-body disclaimer.
  {
    title: {
      he: 'תוכנית "למרחק" — הכוון תעסוקתי ליוצאי אתיופיה',
      en: '"Lamerchak" — Employment Guidance for Ethiopian-Israeli Youth',
      am: 'ፕሮግራም "ላመርቻክ" — የስራ ስምሪት መመሪያ ለኢትዮጵያ ተወላጅ ወጣቶች',
    },
    slug: { he: "lamerchak", en: "lamerchak", am: "lamerchak" },
    govUrl:
      "https://www.taasukada.labor.gov.il/itam/42221b5c-92cd-4b80-b550-dd9720637ae5",
    eligibilitySummary: {
      he: "לצעירים יוצאי אתיופיה החותרים לקידום תעסוקתי ולרכישת השכלה מקצועית. התוכנית מופעלת באמצעות מרכזי הכוון תעסוקתי, בהפעלת מינהל התעסוקה במשרד העבודה.",
      en: "For young Ethiopian-Israelis seeking career advancement and professional education. The program runs through employment-guidance centers, operated by the Employment Service at the Ministry of Labor.",
      am: "ለስራ እድገት እና ሙያዊ ትምህርት የሚፈልጉ ኢትዮጵያዊ ተወላጅ ወጣቶች። ፕሮግራሙ በስራ ስምሪት መመሪያ ማዕከላት አማካኝነት፣ በስራ ሚኒስቴር የስራ ስምሪት አስተዳደር ይመራል።",
    },
    tags: ["employment", "youth"],
    bodies: {
      he: `## מה זה "למרחק"?

"למרחק" היא תוכנית תעסוקה ייעודית של מינהל התעסוקה במשרד העבודה, שמטרתה לסייע לצעירים יוצאי אתיופיה לפתח קריירה, לרכוש השכלה מקצועית ולהשתלב בתפקידים מתגמלים בשוק העבודה הישראלי. התוכנית פועלת באמצעות **מרכזי הכוון תעסוקתי** ייעודיים.

## למי זה מיועד?

לצעירים יוצאי אתיופיה החותרים לקידום תעסוקתי — מי שמעוניינים לבנות מסלול קריירה, לרכוש הכשרה מקצועית ולהתמקם בתפקידים איכותיים ובעלי סיכויי קידום.

## מה כוללת התוכנית?

התוכנית מבוססת על רשת של מרכזי הכוון תעסוקתי, שתפקידם ללוות את המשתתפים בתהליך של פיתוח קריירה והשכלה מקצועית לקראת שילוב בתפקידים מתגמלים. פרטים מלאים על תוכן הליווי, משך התוכנית והמענים הספציפיים במרכז הקרוב אליכם מתפרסמים דרך מרכזי ההכוון עצמם ואינם מפורטים באתר מינהל התעסוקה.

**לתשומת לבכם:** אין באתר הרשמי פירוט של סכומי סיוע, מלגות או תאריכי הרשמה — אם נתקלתם במידע כזה במקור אחר, כדאי לוודא אותו ישירות מול הגורם המפעיל לפני שאתם מסתמכים עליו.

## איך פונים?

התוכנית אינה כוללת טופס הרשמה מקוון ישיר באתר. לבירור זכאות, מיקום מרכזי ההכוון הפעילים ותהליך ההצטרפות בפועל — פנו ישירות למינהל תעסוקת אוכלוסיות ייחודיות באתר gov.il, או למרכז ההכוון התעסוקתי הקרוב לאזור מגוריכם:

- מינהל התעסוקה — דף התוכנית: [taasukada.labor.gov.il](https://www.taasukada.labor.gov.il/itam/42221b5c-92cd-4b80-b550-dd9720637ae5)
- לפנייה כללית למינהל תעסוקת אוכלוסיות ייחודיות: אתר [gov.il](https://www.gov.il)`,
      en: `## What is "Lamerchak"?

"Lamerchak" is a dedicated employment program run by Israel's Employment Service (מינהל התעסוקה) at the Ministry of Labor, designed to help young Ethiopian-Israelis build a career, acquire professional education and move into rewarding positions in the Israeli labor market. The program operates through dedicated **employment-guidance centers**.

## Who is it for?

Young Ethiopian-Israelis seeking career advancement — people who want to build a career path, gain professional training and move into quality positions with real advancement potential.

## What does the program include?

The program is built around a network of employment-guidance centers, whose role is to accompany participants through career development and professional education toward placement in rewarding positions. Full details on the guidance content, program duration, and the specific offerings at the center nearest you are published by the guidance centers themselves and are not detailed on the Employment Service's page.

**Note:** the official page does not publish support amounts, stipends or registration dates — if you come across such figures elsewhere, verify them directly with the operating body before relying on them.

## How to apply

The program has no direct online registration form on its official page. To check eligibility, find your nearest active guidance center, and learn the actual enrollment process — contact the Employment Service for unique populations (מינהל תעסוקת אוכלוסיות ייחודיות) directly via gov.il, or reach out to the employment-guidance center nearest your area:

- Employment Service — program page: [taasukada.labor.gov.il](https://www.taasukada.labor.gov.il/itam/42221b5c-92cd-4b80-b550-dd9720637ae5)
- General inquiries to the Employment Service for unique populations: [gov.il](https://www.gov.il)`,
      am: `## "ላመርቻክ" ምንድን ነው?

"ላመርቻክ" በስራ ሚኒስቴር የስራ ስምሪት አስተዳደር የሚመራ ልዩ የስራ ስምሪት ፕሮግራም ሲሆን፣ ኢትዮጵያዊ ተወላጅ ወጣቶች ስራቸውን እንዲያሳድጉ፣ ሙያዊ ትምህርት እንዲያገኙ እና በእስራኤል የስራ ገበያ ውስጥ ጠቃሚ ቦታዎች ላይ እንዲሰማሩ ለመርዳት የተነደፈ ነው። ፕሮግራሙ ልዩ **የስራ ስምሪት መመሪያ ማዕከላት** በኩል ይሰራል።

## ለማን የተዘጋጀ ነው?

ለስራ እድገት የሚፈልጉ ኢትዮጵያዊ ተወላጅ ወጣቶች — የስራ መንገድ መገንባት፣ ሙያዊ ስልጠና ማግኘት እና በጥራት ያላቸው እና የእድገት እድል ያላቸው ቦታዎች ላይ መስፈር የሚፈልጉ ሰዎች።

## ፕሮግራሙ ምን ያካትታል?

ፕሮግራሙ በስራ ስምሪት መመሪያ ማዕከላት አውታረ መረብ ላይ የተመሰረተ ነው፣ ተሳታፊዎችን በስራ እድገት እና ሙያዊ ትምህርት ሂደት ውስጥ ወደ ጠቃሚ ቦታዎች ውህደት እንዲደርሱ የመምራት ሚና አላቸው። ስለ አጃቢነቱ ይዘት፣ የፕሮግራሙ ርዝመት እና ወደ እርስዎ ቅርብ በሆነው ማዕከል ስላሉ ልዩ አቅርቦቶች ሙሉ ዝርዝሮች በራሳቸው በመመሪያ ማዕከላት ይታተማሉ እንጂ በስራ ስምሪት አስተዳደር ገጽ ላይ በዝርዝር አልተገለጹም።

**ማስታወሻ፦** ኦፊሴላዊው ገጽ የድጋፍ መጠኖችን፣ ስቲፕንዶችን ወይም የምዝገባ ቀናትን አያትምም — በሌላ ቦታ እንደዚህ ዓይነት ቁጥሮች ካጋጠሙዎት፣ በእነሱ ላይ ከመተማመንዎ በፊት በቀጥታ ከሚያንቀሳቅሰው አካል ጋር ያረጋግጡ።

## እንዴት ማመልከት

ፕሮግራሙ በኦፊሴላዊ ገጹ ላይ ቀጥተኛ የመስመር ላይ ምዝገባ ቅጽ የለውም። ብቁነትን ለማረጋገጥ፣ ወደ እርስዎ ቅርብ የሆነውን ንቁ የመመሪያ ማዕከል ለማግኘት እና ትክክለኛውን የምዝገባ ሂደት ለማወቅ — በቀጥታ ወደ ልዩ ህዝቦች የስራ ስምሪት አስተዳደር (מינהל תעסוקת אוכלוסיות ייחודיות) በ gov.il በኩል ያግኙ፣ ወይም ወደ አካባቢዎ ቅርብ የሆነውን የስራ ስምሪት መመሪያ ማዕከል ያነጋግሩ፦

- የስራ ስምሪት አስተዳደር — የፕሮግራም ገጽ፦ taasukada.labor.gov.il
- ለልዩ ህዝቦች የስራ ስምሪት አስተዳደር አጠቃላይ ጥያቄዎች፦ gov.il

📞 የስራ ስምሪት አስተዳደር፣ የስራ ሚኒስቴር

*[የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግመው ይመከራል።]*`,
    },
  },

  // ── Wave 6 (cont'd) — sourced from the Small and Medium Business Authority
  // (sba.org.il/hb/AidPrograms/Pages/pr4.aspx and
  // sba.org.il/hb/MaofServices/courses/Pages/9910.aspx). This is a GENERAL
  // entrepreneurship course open to any Israeli citizen — NOT a
  // community-specific track. Kol-Zchut and several AI-generated summaries
  // describe it as "dedicated to Ethiopian-Israelis" and cite a discounted
  // price of ₪336; neither claim is confirmed by the primary source, so
  // both are deliberately omitted here per the "no fabricated/unverified
  // data" policy. The community angle is phrased softly as "open to every
  // citizen, including members of the Ethiopian-Israeli community" without
  // implying an exclusive track or discount that doesn't exist. AM field is
  // AI-translated (not yet reviewed by a native Amharic speaker) — see
  // in-body disclaimer.
  {
    title: {
      he: "יוזמים עסק — קורס יזמות עסקית (הסוכנות לעסקים קטנים ובינוניים)",
      en: "Yozmim Esek — Business Entrepreneurship Course (Small & Medium Business Authority)",
      am: '"ዮዝሚም ኤሴክ" — የንግድ ስራ ፈጠራ ኮርስ (ለአነስተኛና መካከለኛ ንግድ ድርጅት)',
    },
    slug: {
      he: "yozmim-esek-business-course",
      en: "yozmim-esek-business-course",
      am: "yozmim-esek-business-course",
    },
    govUrl: "https://www.sba.org.il/hb/AidPrograms/Pages/pr4.aspx",
    eligibilitySummary: {
      he: "קורס יזמות כללי ליזמים בתחילת דרכם — 70 שעות (14 מפגשים), עלות 728 ₪. פתוח לכל אזרח/ית, כולל יוצאי הקהילה האתיופית-ישראלית המעוניינים לפתוח עסק.",
      en: "General entrepreneurship course for early-stage entrepreneurs — 70 hours (14 sessions), cost ₪728. Open to every citizen, including members of the Ethiopian-Israeli community who want to start a business.",
      am: "ስራቸውን ገና ለጀመሩ ስራ ፈጣሪዎች የተዘጋጀ አጠቃላይ የስራ ፈጠራ ኮርስ — 70 ሰዓታት (14 ስብሰባዎች)፣ ዋጋ 728 ₪። ለሁሉም ዜጋ ክፍት፣ ንግድ ለመክፈት የሚፈልጉ የኢትዮጵያ-እስራኤል ማህበረሰብ አባላትን ጨምሮ።",
    },
    tags: ["small_business", "entrepreneurship", "employment"],
    bodies: {
      he: `## מה זה "יוזמים עסק"?

"יוזמים עסק" הוא קורס יזמות עסקית של הסוכנות לעסקים קטנים ובינוניים (מעוף), המיועד למי שנמצא/ת בתחילת הדרך בהקמת עסק. הקורס מלמד חשיבה עסקית ויזמותית, ומסייע למשתתפים לבחון את כדאיות הרעיון העסקי שלהם לפני שמשקיעים בו זמן וכסף.

## למי זה מיועד?

לכל מי שיש לו/ה "חלום או רעיון לפתיחת עסק" — אין דרישות קדם מיוחדות. הקורס פתוח לכל אזרח/ית ישראלי/ת, כולל יוצאי הקהילה האתיופית-ישראלית המעוניינים לפתוח עסק. אין מסלול נפרד או הנחה ייעודית לקבוצת אוכלוסייה מסוימת — התנאים זהים לכל הנרשמים.

## מה כולל הקורס?

- **היקף**: 70 שעות אקדמיות, פרוסות על פני 14 מפגשים
- **עלות**: 728 ₪ לכלל הקורס
- **תוכן**: גיבוש רעיון עסקי ממוקד (כולל שימוש בכלים כמו Business Model Canvas), אסטרטגיית שיווק, זיהוי קהל לקוחות, ניהול פיננסי ותזרים מזומנים, ושיווק דיגיטלי
- **מיומנויות**: חשיבה עסקית, יזמות, יצירתיות, קבלת החלטות ופתרון בעיות
- **פורמט**: המפגשים מתקיימים בסניפי הסוכנות ברחבי הארץ (חלקם באמצעות Zoom); הפורמט המדויק, הימים והשעות משתנים בין סניף לסניף — יש לבדוק מול הסניף הרלוונטי לפני ההרשמה

## איך נרשמים?

1. נכנסים למערכת הלמידה המקוונת של הסוכנות בכתובת [lms.sba.org.il](https://lms.sba.org.il), או
2. פונים ישירות לסניף הסוכנות לעסקים קטנים ובינוניים הקרוב אליכם
3. בטרם ההרשמה כדאי לוודא מול הסניף את התאריכים, הפורמט (פרונטלי / Zoom) והזמינות למחזור הקרוב

מקור: [הסוכנות לעסקים קטנים ובינוניים — יוזמים עסק](https://www.sba.org.il/hb/AidPrograms/Pages/pr4.aspx)`,
      en: `## What is "Yozmim Esek"?

"Yozmim Esek" (Business Initiators) is a business entrepreneurship course run by Israel's Small and Medium Business Authority (Maof), designed for people who are at the very start of setting up a business. The course teaches business and entrepreneurial thinking and helps participants assess the viability of their business idea before investing time and money in it.

## Who is it for?

Anyone with "a dream or an idea for opening a business" — there are no special prerequisites. The course is open to every Israeli citizen, including members of the Ethiopian-Israeli community who want to start a business. There is no separate track or dedicated discount for any specific population group — the terms are the same for all registrants.

## What does the course include?

- **Scope**: 70 academic hours, spread over 14 sessions
- **Cost**: ₪728 for the full course
- **Content**: shaping a focused business idea (including tools such as the Business Model Canvas), marketing strategy, identifying your customer base, financial management and cash flow, and digital marketing
- **Skills**: business thinking, entrepreneurship, creativity, decision-making and problem-solving
- **Format**: sessions run at Authority branches around the country (some via Zoom); the exact format, days and hours vary by branch — check with the relevant branch before registering

## How to register

1. Go to the Authority's online learning system at [lms.sba.org.il](https://lms.sba.org.il), or
2. Contact your nearest Small and Medium Business Authority branch directly
3. Before registering, confirm dates, format (in-person / Zoom) and availability for the upcoming cohort with the branch

Source: [Small and Medium Business Authority — Yozmim Esek](https://www.sba.org.il/hb/AidPrograms/Pages/pr4.aspx)`,
      am: `## "ዮዝሚም ኤሴክ" ምንድን ነው?

"ዮዝሚም ኤሴክ" (የንግድ ጀማሪዎች) በአነስተኛና መካከለኛ ንግድ ድርጅት (מעוף) የሚመራ የንግድ ስራ ፈጠራ ኮርስ ሲሆን፣ ንግድ ማቋቋም በጀመሩበት መጀመሪያ ደረጃ ላይ ላሉ ሰዎች የተዘጋጀ ነው። ኮርሱ የንግድ እና የስራ ፈጠራ አስተሳሰብን ያስተምራል፣ ተሳታፊዎች ጊዜ እና ገንዘብ ከማፍሰሳቸው በፊት የንግድ ሃሳባቸውን ተግባራዊነት እንዲመዝኑ ይረዳል።

## ለማን የተዘጋጀ ነው?

ንግድ ለመክፈት "ህልም ወይም ሃሳብ" ላለው ለማንኛውም ሰው — ልዩ ቅድመ ሁኔታዎች የሉም። ኮርሱ ለሁሉም እስራኤላዊ ዜጋ ክፍት ነው፣ ንግድ ለመክፈት የሚፈልጉ የኢትዮጵያ-እስራኤል ማህበረሰብ አባላትን ጨምሮ። ለተወሰነ የህዝብ ቡድን የተለየ መስመር ወይም ልዩ ቅናሽ የለም — ሁኔታዎቹ ለሁሉም ተመዝጋቢዎች እኩል ናቸው።

## ኮርሱ ምን ያካትታል?

- **ስፋት**፦ 70 የትምህርት ሰዓታት፣ በ14 ስብሰባዎች ውስጥ
- **ዋጋ**፦ ለጠቅላላ ኮርሱ 728 ₪
- **ይዘት**፦ ትኩረት ያለው የንግድ ሃሳብ መቅረጽ (እንደ Business Model Canvas ያሉ መሳሪያዎችን መጠቀምን ጨምሮ)፣ የግብይት ስትራቴጂ፣ የደንበኛ ቡድን መለየት፣ የገንዘብ አስተዳደር እና የገንዘብ ፍሰት፣ እና ዲጂታል ግብይት
- **ክህሎቶች**፦ የንግድ አስተሳሰብ፣ ስራ ፈጠራ፣ ፈጠራ፣ ውሳኔ አሰጣጥ እና ችግር መፍታት
- **ቅርፀት**፦ ስብሰባዎቹ በሀገር ዙሪያ ባሉ የድርጅቱ ቅርንጫፎች ይካሄዳሉ (አንዳንዶቹ በ Zoom)፤ ትክክለኛው ቅርፀት፣ ቀናት እና ሰዓቶች እንደ ቅርንጫፉ ይለያያሉ — ከመመዝገብዎ በፊት ከሚመለከተው ቅርንጫፍ ጋር ያረጋግጡ

## እንዴት መመዝገብ

1. በ lms.sba.org.il ወደ ድርጅቱ የመስመር ላይ ትምህርት ስርዓት ይግቡ፣ ወይም
2. ወደ እርስዎ ቅርብ ወደ አነስተኛና መካከለኛ ንግድ ድርጅት ቅርንጫፍ በቀጥታ ያግኙ
3. ከመመዝገብዎ በፊት ቀናትን፣ ቅርፀትን (በአካል / Zoom) እና ለሚቀጥለው ዙር ያለውን ተገኝነት ከቅርንጫፉ ጋር ያረጋግጡ

ምንጭ፦ አነስተኛና መካከለኛ ንግድ ድርጅት — ዮዝሚም ኤሴክ (sba.org.il)

*[የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግመው ይመከራል።]*`,
    },
  },

  // ── Wave 6 (cont'd) — sourced from the Knesset Research and Information
  // Center ("נתונים על יוצאי אתיופיה וסקירת תכניות סיוע בדיור", 10.8.2025,
  // pp. 4-5): https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf
  // Verified facts from the source:
  //   - Operating body: Ministry of Construction and Housing (משרד הבינוי
  //     והשיכון) — NOT the Jewish Agency. The Knesset doc's own footnote 12
  //     cites the primary publication: "משרד הבינוי והשיכון, תוכנית מענקי
  //     הדיור לעולים מאתיופיה המתגוררים במרכזי קליטה או אתרי קליטה,
  //     26 באפריל 2022."
  //   - Legal basis: Government Decision 1103 of the 36th government,
  //     10.2.2022 (footnote 11, citing the PM's Office).
  //   - Valid through end of 2031.
  //   - Eligibility: a family, a senior citizen, or an individual who
  //     immigrated from Ethiopia and is leaving an absorption center/site,
  //     and who meets the Ministry of Construction and Housing's "lacking
  //     housing" (חסרי דירה) definition.
  //   - INTERNAL ONLY — do not surface in public copy: the source states a
  //     grant range of ₪235,000 (couple, no children) to ₪650,000 (couples
  //     with 9+ children), as of the source's 10.8.2025 publication date.
  //     Per explicit user instruction, the exact figures are deliberately
  //     omitted from all public-facing text below (risk of the range
  //     changing without the site being updated). If re-verifying later,
  //     check this figure against a fresh primary source before republishing
  //     it. Public copy instead points users to the Ministry to confirm the
  //     current amount for their family composition.
  //   - A gov.il page with a similar name ("Government Decision 1668") was
  //     found via search but could not be accessed directly (WebFetch/curl
  //     blocked by gov.il) — its content is NOT quoted here, only its
  //     existence is softly acknowledged in the body text.
  //   - No specific gov.il program URL could be independently verified
  //     (gov.il returns 403 to automated fetches), so govUrl below points to
  //     the verified Knesset source document rather than a guessed ministry
  //     URL that might not resolve. AM field is AI-translated, NOT yet
  //     reviewed by a native Amharic speaker — this is a sensitive,
  //     money-related topic where an imprecise community-language
  //     translation could cause real harm; native review is a hard
  //     prerequisite before treating this AM copy as final.
  {
    title: {
      he: "מענקי דיור לעולים מאתיופיה המתגוררים במרכזי קליטה או אתרי קליטה",
      en: "Housing Grants for Ethiopian Immigrants Living in Absorption Centers or Absorption Sites",
      am: "ከመቀበያ ማዕከላት ወይም ጣቢያዎች ለሚወጡ ከኢትዮጵያ ለመጡ ስደተኞች የመኖሪያ ቤት ድጎማዎች",
    },
    slug: {
      he: "housing-grant-klita-centers",
      en: "housing-grant-klita-centers",
      am: "housing-grant-klita-centers",
    },
    govUrl:
      "https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf",
    eligibilitySummary: {
      he: 'למשפחה, אזרח ותיק או יחיד שעלו מאתיופיה ומתפנים ממרכז קליטה או אתר קליטה, ועונים להגדרת "חסרי דירה" לפי כללי משרד הבינוי והשיכון. התוכנית מבוססת על החלטת ממשלה 1103 (10.2.2022) ובתוקף עד סוף 2031.',
      en: 'For a family, senior citizen or individual who immigrated from Ethiopia and is leaving an absorption center or absorption site, and meets the Ministry of Construction and Housing\'s "lacking housing" definition. Based on Government Decision 1103 (10.2.2022), valid through end of 2031.',
      am: "ከኢትዮጵያ የመጡ እና ከመቀበያ ማዕከል ወይም ጣቢያ ለሚወጡ ቤተሰብ፣ አዛውንት ወይም ግለሰብ፣ በግንባታና ቤቶች ሚኒስቴር ደንብ መሰረት 'ቤት የሌላቸው' በሚል ትርጉም ውስጥ ለሚገቡ። መርሃ ግብሩ በመንግስት ውሳኔ 1103 (10.2.2022) ላይ የተመሰረተ ሲሆን እስከ 2031 መጨረሻ ድረስ የሚቆይ ነው።",
    },
    tags: ["housing", "new_immigrant", "grants", "family"],
    bodies: {
      he: `## מה זה המענק?

מענק דיור ייעודי לעולים מאתיופיה המתגוררים במרכזי קליטה או באתרי קליטה, שנועד לסייע לכם לרכוש דירה בבעלות פרטית בעת היציאה מהמרכז/אתר. התוכנית מבוססת על **החלטת ממשלה מס' 1103** של הממשלה ה-36 (10 בפברואר 2022), ובתוקף **עד סוף שנת 2031**.

## למי זה מיועד? (הבהרה חשובה)

התוכנית מופעלת על ידי **משרד הבינוי והשיכון** — לא הסוכנות היהודית. יש בלבול נפוץ בין שני הגופים: הסוכנות היהודית מלווה את תהליך העלייה ואת החיים במרכזי הקליטה עצמם, אך את מענק הדיור לרכישת דירה מעניק ומנהל משרד הבינוי והשיכון, לפי כללי הזכאות שלו.

זכאים למענק: **משפחה, אזרח/ית ותיק/ה או יחיד/ה** שעלו מאתיופיה ומתפנים ממרכז קליטה או מאתר קליטה, ועונים להגדרת **"חסרי דירה"** לפי כללי משרד הבינוי והשיכון.

## מה כלול במענק?

סכום המענק **משמעותי ונקבע לפי הרכב המשפחה** (בין היתר מספר הילדים ומצב משפחתי) — לבדיקת הסכום המדויק והעדכני ביותר עבור המצב האישי שלכם, יש לפנות ישירות למשרד הבינוי והשיכון. בנוסף למענק, ייתכן שתהיו זכאים גם להלוואה משלימה מבנק למשכנתאות, בהתאם לכללי הבנק.

יש גם עמוד רשמי נוסף באתר gov.il המתייחס לתוכנית זו (במסגרת החלטת ממשלה אחרת) — אם נתקלתם בו, מומלץ לוודא את הפרטים מול משרד הבינוי והשיכון ישירות, שכן לא כל המידע המקוון תמיד מעודכן.

## איך פונים ובודקים זכאות?

התוכנית אינה כוללת טופס הרשמה מקוון פומבי. לבדיקת זכאות, קבלת הסכום המדויק לפי הרכב המשפחה שלכם, ופרטים על המסמכים הנדרשים — יש לפנות ישירות ל**משרד הבינוי והשיכון** (לא לסוכנות היהודית), דרך נציג המשרד באזור מרכז/אתר הקליטה שבו אתם מתגוררים, או דרך אתר [gov.il](https://www.gov.il).

מקור: [מרכז המחקר והמידע של הכנסת — נתונים על יוצאי אתיופיה וסקירת תכניות סיוע בדיור (10.8.2025)](https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf)`,
      en: `## What is this grant?

A dedicated housing grant for Ethiopian immigrants living in absorption centers or absorption sites, designed to help you purchase a privately-owned apartment when you leave the center/site. The program is based on **Government Decision 1103** of the 36th government (February 10, 2022), and is valid **through the end of 2031**.

## Who is it for? (Important clarification)

The program is run by the **Ministry of Construction and Housing** — not the Jewish Agency. There is common confusion between the two bodies: the Jewish Agency accompanies the aliyah process and life at the absorption centers themselves, but the housing-purchase grant is awarded and managed by the Ministry of Construction and Housing, under its own eligibility rules.

Eligible: a **family, a senior citizen, or an individual** who immigrated from Ethiopia and is leaving an absorption center or absorption site, and who meets the Ministry of Construction and Housing's **"lacking housing"** (חסרי דירה) definition.

## What does the grant include?

The grant amount is **significant and is set according to family composition** (among other factors, number of children and family status) — to check the exact, current amount for your personal situation, contact the Ministry of Construction and Housing directly. In addition to the grant, you may also be eligible for a supplementary mortgage loan from a bank, subject to the bank's own rules.

There is also an additional official gov.il page referencing this program (under a different government decision) — if you come across it, we recommend verifying the details directly with the Ministry of Construction and Housing, since not all online information is always current.

## How to apply and check eligibility

The program has no public online registration form. To check eligibility, get the exact amount for your family composition, and learn what documents are required — contact the **Ministry of Construction and Housing** directly (not the Jewish Agency), through the ministry representative in the area of the absorption center/site where you live, or via [gov.il](https://www.gov.il).

Source: [Knesset Research and Information Center — Data on Ethiopian Israelis and a Review of Housing Assistance Programs (10.8.2025)](https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf)`,
      am: `## ይህ ድጎማ ምንድን ነው?

በመቀበያ ማዕከላት ወይም በመቀበያ ጣቢያዎች ውስጥ ለሚኖሩ ከኢትዮጵያ ለመጡ ስደተኞች የተዘጋጀ ልዩ የመኖሪያ ቤት ድጎማ ሲሆን፣ ከማዕከሉ/ጣቢያው ሲወጡ የግል ባለቤትነት ያለው ቤት እንዲገዙ ለመርዳት የተነደፈ ነው። መርሃ ግብሩ የ36ኛው መንግስት **የመንግስት ውሳኔ ቁጥር 1103**ን (የካቲት 10፣ 2022) መሰረት ያደረገ ሲሆን፣ **እስከ 2031 መጨረሻ ድረስ** የሚቆይ ነው።

## ለማን የተዘጋጀ ነው? (አስፈላጊ ማብራሪያ)

ፕሮግራሙ የሚመራው በ**ግንባታና ቤቶች ሚኒስቴር** ነው — በአይሁድ ኤጀንሲ አይደለም። በሁለቱ አካላት መካከል የተለመደ ግራ መጋባት አለ፦ የአይሁድ ኤጀንሲ የዓሊያ ሂደትን እና በመቀበያ ማዕከላት ውስጥ ያለውን ኑሮ ይታጀባል፣ ነገር ግን ቤት ለመግዛት የሚሆነው ድጎማ የሚሰጠውና የሚተዳደረው በግንባታና ቤቶች ሚኒስቴር ነው፣ በራሱ የብቁነት ደንቦች መሰረት።

ብቁ የሆኑት፦ ከኢትዮጵያ የመጡ እና ከመቀበያ ማዕከል ወይም ከመቀበያ ጣቢያ የሚወጡ **ቤተሰብ፣ አዛውንት ወይም ግለሰብ**፣ በግንባታና ቤቶች ሚኒስቴር ደንብ መሰረት **"ቤት የሌላቸው"** በሚል ትርጉም ውስጥ የሚገቡ።

## ድጎማው ምን ያካትታል?

የድጎማው መጠን **ከፍተኛ እና እንደ ቤተሰብ አወቃቀር** (ከሌሎች ነገሮች መካከል የልጆች ብዛት እና የቤተሰብ ሁኔታ) የሚወሰን ነው — ለግል ሁኔታዎ ትክክለኛውን እና የቅርብ ጊዜውን መጠን ለማወቅ በቀጥታ ወደ ግንባታና ቤቶች ሚኒስቴር ያግኙ። ከድጎማው በተጨማሪ፣ እንደ ባንኩ ደንቦች ተጨማሪ የሞርጌጅ ብድር ብቁ ሊሆኑ ይችላሉ።

ስለዚህ ፕሮግራም (በሌላ የመንግስት ውሳኔ ስር) የሚያመለክት ተጨማሪ ኦፊሴላዊ የ gov.il ገጽ አለ — ካጋጠመዎት፣ ሁሉም የመስመር ላይ መረጃ ሁልጊዜ የቅርብ ጊዜ ስላልሆነ በቀጥታ ከግንባታና ቤቶች ሚኒስቴር ጋር ዝርዝሮቹን እንዲያረጋግጡ እንመክራለን።

## እንዴት ማመልከት እና ብቁነትን ማረጋገጥ

ፕሮግራሙ የህዝብ የመስመር ላይ ምዝገባ ቅጽ የለውም። ብቁነትን ለማረጋገጥ፣ እንደ ቤተሰብ አወቃቀርዎ ትክክለኛውን መጠን ለማግኘት እና ስለሚያስፈልጉ ሰነዶች ለማወቅ — በቀጥታ ወደ **ግንባታና ቤቶች ሚኒስቴር** ያግኙ (ወደ አይሁድ ኤጀንሲ አይደለም)፣ በሚኖሩበት የመቀበያ ማዕከል/ጣቢያ አካባቢ በሚገኝ የሚኒስቴሩ ተወካይ በኩል፣ ወይም በ gov.il በኩል።

ምንጭ፦ የክኔሴት ምርምርና መረጃ ማዕከል — ስለ ኢትዮጵያ ተወላጆች መረጃ እና የመኖሪያ ቤት ድጋፍ ፕሮግራሞች ግምገማ (10.8.2025)

📞 ግንባታና ቤቶች ሚኒስቴር

*[⚠️ የAI ትርጉም — ይህ ስሜታዊ እና ከገንዘብ ጋር የተያያዘ ርዕስ ነው። እባክዎ ከመታተሙ በፊት በአማርኛ ቋንቋ ተወላጅ ተናጋሪ በጥንቃቄ እንዲገመግመው እንመክራለን።]*`,
    },
  },

  // TED-137 — Criminal/police record expungement for Ethiopian-Israelis.
  //
  // Legal basis verified against the statute text itself (Wikisource + Nevo
  // copies of חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה,
  // התשפ"ד-2024, ס"ח התשפ"ד עמ' 1094). Key verified facts:
  //   - definition: the person or one of their parents was born in Ethiopia (§1)
  //   - offenses: only those in the חוק's תוספת (Penal Law §§151–158, 216,
  //     275, 287(א), 288, 288א, 382א(א); CPO (Arrest & Search) §47(א);
  //     Police Ordinance §79(1)(ב))
  //   - committed until 31.12.2020 (ט"ז בטבת התשפ"א) (§2)
  //   - no actual imprisonment for that offense + no additional record (§2)
  //   - deletion is AUTOMATIC (no application); police report to the Knesset
  //     Constitution Committee within six months (§3)
  // Assault of a police officer (חוק העונשין §273) is NOT in the schedule.
  {
    title: {
      he: "מחיקת רישום פלילי ומשטרתי ליוצאי אתיופיה — בדיקת זכאות",
      en: "Criminal & Police Record Expungement for Ethiopian-Israelis — Eligibility Check",
      am: "ለኢትዮጵያ-እስራኤላውያን የወንጀል እና የፖሊስ መዝገብ ስረዛ — የብቁነት ምርመራ",
    },
    slug: {
      he: "criminal-record-expungement",
      en: "criminal-record-expungement",
      am: "criminal-record-expungement",
    },
    govUrl: "https://www.gov.il/he/service/request-for-criminal-information-certificate",
    eligibilitySummary: {
      he: 'חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה (התשפ"ד-2024) קובע מחיקה אוטומטית של רישומים בעבירות הפרת סדר ציבורי שנעברו עד 31.12.2020 — למי שלא נדון למאסר בפועל ואין לו רישום נוסף.',
      en: "The Expungement of Criminal and Police Records of Ethiopian-Israelis Law (2024) mandates automatic deletion of records for public-order offenses committed until 31.12.2020 — for those not sentenced to actual imprisonment and with no additional record.",
      am: "የኢትዮጵያ-እስራኤላውያን የወንጀል እና የፖሊስ መዝገቦች ስረዛ ሕግ (2024) እስከ 31.12.2020 ድረስ ለተፈጸሙ የሕዝብ ሥርዓት ጥሰት ወንጀሎች መዝገቦች በራስ-ሰር እንዲሰረዙ ይደነግጋል — ለታሰሩ ላልተፈረደባቸው እና ተጨማሪ መዝገብ ለሌላቸው።",
    },
    tags: ["legal"],
    bodies: {
      he: `## מה קובע החוק?

בשנת 2024 עבר בכנסת **חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה, התשפ"ד-2024** (ס"ח התשפ"ד, עמ' 1094). החוק נחקק בעקבות דוח ועדת פלמור ודוח מבקר המדינה, שהצביעו על שיטור-יתר כלפי הקהילה האתיופית בעבירות הפרת סדר ציבורי — בין היתר סביב מחאות 2015 ו-2019.

החוק קובע: פרט רישום פלילי של יוצא אתיופיה בעבירה של הפרת סדר ציבורי המנויה בתוספת לחוק, שנעברה **עד יום ט"ז בטבת התשפ"א (31 בדצמבר 2020)** — יימחק מהמרשם הפלילי, ורישום משטרתי מקביל יבוטל.

## מי נחשב "יוצא אתיופיה"?

לפי סעיף 1 לחוק: מי **שהוא או אחד מהוריו נולדו באתיופיה**.

## תנאי הזכאות

המחיקה חלה כשמתקיימים כל התנאים:

1. העבירה היא עבירת הפרת סדר ציבורי **המנויה בתוספת לחוק** (ראו בהמשך)
2. העבירה נעברה **עד 31 בדצמבר 2020**
3. **לא הוטל** בשל אותה עבירה עונש **מאסר בפועל**
4. **אין רישום פלילי או משטרתי נוסף**

## אילו עבירות נמחקות?

התוספת לחוק מונה עבירות לפי סעיפי חוק מדויקים:

- **חוק העונשין, התשל"ז-1977**: סעיפים 151 עד 158, 216, 275, 287(א), 288, 288א ו-382א(א) — ובהן התקהלות אסורה, התפרעות, הפרעה לשוטר במילוי תפקידו, העלבת עובד ציבור והפרעה לעובד ציבור
- **פקודת סדר הדין הפלילי (מעצר וחיפוש) [נוסח חדש], התשכ"ט-1969**: סעיף 47(א)
- **פקודת המשטרה [נוסח חדש], התשל"א-1971**: סעיף 79(1)(ב)

**חשוב**: עבירת **תקיפת שוטר** אינה מנויה בתוספת — רישום בגינה אינו נמחק מכוח החוק הזה.

## איך זה עובד בפועל?

**המחיקה אוטומטית — אין צורך להגיש בקשה.** משטרת ישראל היא שמבצעת את המחיקה, והחוק מחייב אותה לדווח לוועדת החוקה, חוק ומשפט של הכנסת בתוך שישה חודשים על היישום ועל מספר הרישומים שנמחקו או בוטלו (סעיף 3).

## איך בודקים שהרישום אכן נמחק?

1. כל אדם רשאי **לעיין במידע הפלילי על עצמו** — ללא תשלום, בתחנת משטרה, לאחר הזדהות
2. אפשר גם להגיש [בקשה להנפקת תעודת מידע פלילי](https://www.gov.il/he/service/request-for-criminal-information-certificate) באתר משטרת ישראל ב-gov.il
3. אם הרישום עדיין מופיע ולדעתכם הוא עומד בתנאי החוק — פנו לייעוץ משפטי (ראו בהמשך)

## הרישום לא נמחק? לא בטוחים?

**טבקה — מרכז הסיוע המשפטי לקהילה האתיופית** מציעה ייעוץ משפטי חינם: 03-5103538, [tebeka.org.il](https://www.tebeka.org.il). כדאי לפנות גם אם אינכם בטוחים אם העבירה שלכם כלולה בתוספת, או אם יש לכם רישום נוסף שמונע מחיקה — ייתכנו מסלולים אחרים (למשל בקשת חנינה או התיישנות ומחיקה לפי חוק המרשם הפלילי הכללי).

עוכבתם או נעצרתם ברחוב? הכירו את הזכויות שלכם — [עוכבו אתכם ברחוב? הזכויות שלכם](/he/voice/street-stop) ו[זכויות מול המשטרה וכיצד להתלונן](/he/voice/police-conduct).

> **הבהרה משפטית:** מידע זה כללי ואינו ייעוץ משפטי. בדיקת הזכאות באשף שלמטה מבוססת על לשון החוק בלבד ואינה קביעה מחייבת. למקרה קונקרטי פנו לעורך-דין או לטבקה.

## מקורות

- [חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה — נוסח החוק (ויקיטקסט)](https://he.wikisource.org/wiki/חוק_מחיקת_רישומים_פליליים_ומשטרתיים_של_יוצאי_אתיופיה)
- [נוסח החוק — נבו](https://www.nevo.co.il/law_html/law00/228942.htm)
- [בקשה להנפקת תעודת מידע פלילי — משטרת ישראל, gov.il](https://www.gov.il/he/service/request-for-criminal-information-certificate)
- [מידע פלילי (מרשם פלילי, מרשם משטרתי) — כל-זכות](https://www.kolzchut.org.il/he/מידע_פלילי_(מרשם_פלילי,_מרשם_משטרתי))
`,
      en: `## What does the law say?

In 2024 the Knesset passed the **Expungement of Criminal and Police Records of Ethiopian-Israelis Law, 5784-2024** (Sefer HaChukim 5784, p. 1094). The law followed the Palmor Committee report and a State Comptroller report that documented over-policing of the Ethiopian community in public-order offenses — including around the 2015 and 2019 protests.

The law establishes: a criminal-record entry of an Ethiopian-Israeli for a public-order offense listed in the law's schedule, committed **until December 31, 2020 (16 Tevet 5781)** — shall be deleted from the criminal register, and the parallel police record shall be cancelled.

## Who counts as an "Ethiopian-Israeli"?

Per section 1 of the law: a person **who was born in Ethiopia, or one of whose parents was born in Ethiopia**.

## Eligibility conditions

The deletion applies when all of the following hold:

1. The offense is a public-order offense **listed in the law's schedule** (see below)
2. The offense was committed **until December 31, 2020**
3. **No actual imprisonment** was imposed for that offense
4. **There is no additional criminal or police record**

## Which offenses are deleted?

The schedule lists offenses by exact statutory sections:

- **Penal Law, 5737-1977**: sections 151-158, 216, 275, 287(a), 288, 288a and 382a(a) — including unlawful assembly, rioting, obstructing a police officer, insulting a public servant and obstructing a public servant
- **Criminal Procedure Ordinance (Arrest and Search) [New Version], 5729-1969**: section 47(a)
- **Police Ordinance [New Version], 5731-1971**: section 79(1)(b)

**Important**: **assault of a police officer** is not listed in the schedule — such a record is not deleted under this law.

## How does it work in practice?

**Deletion is automatic — no application is required.** The Israel Police carries out the deletion, and the law requires it to report to the Knesset's Constitution, Law and Justice Committee within six months on implementation and the number of records deleted or cancelled (section 3).

## How to verify your record was deleted

1. Every person may **review their own criminal information** — free of charge, at a police station, after identification
2. You can also submit a [request for a criminal information certificate](https://www.gov.il/he/service/request-for-criminal-information-certificate) via the Israel Police page on gov.il
3. If the record still appears and you believe it meets the law's conditions — seek legal advice (below)

## Record not deleted? Not sure?

**Tebeka — the legal-aid center for the Ethiopian community** offers free legal advice: 03-5103538, [tebeka.org.il](https://www.tebeka.org.il). Contact them also if you are unsure whether your offense is in the schedule, or if an additional record blocks deletion — other tracks may exist (e.g. a pardon request, or expiry and deletion under the general Criminal Register Law).

Stopped or detained on the street? Know your rights — [Stopped on the street? Your rights](/en/voice/street-stop) and [Rights in police encounters and how to complain](/en/voice/police-conduct).

> **Legal note:** This is general information, not legal advice. The eligibility check below follows the statute's wording only and is not a binding determination. For a concrete case, consult a lawyer or Tebeka.

## Sources

- [The law's text (Wikisource, Hebrew)](https://he.wikisource.org/wiki/חוק_מחיקת_רישומים_פליליים_ומשטרתיים_של_יוצאי_אתיופיה)
- [The law's text — Nevo](https://www.nevo.co.il/law_html/law00/228942.htm)
- [Criminal information certificate request — Israel Police, gov.il](https://www.gov.il/he/service/request-for-criminal-information-certificate)
- [Criminal information (criminal & police registers) — Kol Zchut](https://www.kolzchut.org.il/he/מידע_פלילי_(מרשם_פלילי,_מרשם_משטרתי))
`,
      am: `## ሕጉ ምን ይላል?

በ2024 ክነሴቱ **የኢትዮጵያ-እስራኤላውያን የወንጀል እና የፖሊስ መዝገቦች ስረዛ ሕግ (2024)** አጽድቋል። ሕጉ የፓልሞር ኮሚቴ ሪፖርት እና የመንግሥት ኦዲተር ሪፖርት ተከትሎ የመጣ ነው — በኢትዮጵያ ማህበረሰብ ላይ በሕዝብ ሥርዓት ጥሰት ወንጀሎች ከመጠን በላይ ፖሊስ መጠቀሙን ያሳዩ ሪፖርቶች፣ በተለይ በ2015 እና 2019 ሰልፎች ዙሪያ።

ሕጉ ይደነግጋል: በሕጉ ዝርዝር (ተጨማሪ ሰንጠረዥ) ውስጥ የተጠቀሰ የሕዝብ ሥርዓት ጥሰት ወንጀል፣ **እስከ ታኅሣሥ 31፣ 2020 ድረስ** የተፈጸመ — ከወንጀል መዝገብ ይሰረዛል፣ እና ተመሳሳዩ የፖሊስ መዝገብ ይሰረዛል።

## "የኢትዮጵያ ተወላጅ" ማን ነው?

በሕጉ አንቀጽ 1 መሠረት: **እሱ ራሱ ወይም ከወላጆቹ አንዱ በኢትዮጵያ የተወለደ** ሰው።

## የብቁነት ሁኔታዎች

ስረዛው የሚፈጸመው እነዚህ ሁሉ ሲሟሉ ነው:

1. ወንጀሉ **በሕጉ ዝርዝር ውስጥ የተጠቀሰ** የሕዝብ ሥርዓት ጥሰት ወንጀል ነው
2. ወንጀሉ **እስከ ታኅሣሥ 31፣ 2020 ድረስ** ተፈጽሟል
3. ለዚያ ወንጀል **የእስር ቅጣት አልተፈረደም**
4. **ተጨማሪ የወንጀል ወይም የፖሊስ መዝገብ የለም**

## የትኞቹ ወንጀሎች ይሰረዛሉ?

ዝርዝሩ በትክክለኛ የሕግ አንቀጾች ወንጀሎችን ይጠቅሳል — ከእነሱም መካከል: ሕገ-ወጥ ስብሰባ፣ ሁከት፣ ፖሊስን በሥራው ማደናቀፍ፣ የሕዝብ ሠራተኛን መስደብ እና የሕዝብ ሠራተኛን ማደናቀፍ (የቅጣት ሕግ አንቀጾች 151–158፣ 216፣ 275፣ 287(א)፣ 288፣ 288א፣ 382א(א) እና ተጨማሪ ሁለት አንቀጾች)።

**አስፈላጊ**: **ፖሊስን ማጥቃት** በዝርዝሩ ውስጥ የለም — በዚህ ሕግ አይሰረዝም።

## በተግባር እንዴት ይሰራል?

**ስረዛው በራስ-ሰር ነው — ማመልከቻ ማቅረብ አያስፈልግም።** የእስራኤል ፖሊስ ስረዛውን ይፈጽማል፣ እና በስድስት ወራት ውስጥ ለክነሴት ሕገ-መንግሥት ኮሚቴ ስለ ትግበራው ሪፖርት ማቅረብ አለበት።

## መዝገብዎ እንደተሰረዘ እንዴት ማረጋገጥ ይቻላል?

1. እያንዳንዱ ሰው **ስለራሱ ያለውን የወንጀል መረጃ ማየት** ይችላል — ያለ ክፍያ፣ በፖሊስ ጣቢያ፣ ከመታወቂያ ማረጋገጫ በኋላ
2. በ-gov.il በኩል [የወንጀል መረጃ የምስክር ወረቀት ጥያቄ](https://www.gov.il/he/service/request-for-criminal-information-certificate) ማቅረብም ይቻላል
3. መዝገቡ አሁንም ከታየ እና የሕጉን ሁኔታዎች እንደሚያሟላ ካመኑ — የሕግ ምክር ይጠይቁ

## መዝገቡ አልተሰረዘም? እርግጠኛ አይደሉም?

**ቴቤካ — ለኢትዮጵያ ማህበረሰብ የሕግ ድጋፍ ማዕከል** ነጻ የሕግ ምክር ይሰጣል: 03-5103538፣ [tebeka.org.il](https://www.tebeka.org.il)።

በመንገድ ላይ ቆሙዎት? መብቶችዎን ይወቁ — [በመንገድ ላይ ቆሙዎት? መብቶችዎ](/am/voice/street-stop) እና [ከፖሊስ ጋር ባለ ግንኙነት ያሉ መብቶች](/am/voice/police-conduct)።

> **የሕግ ማስታወሻ:** ይህ አጠቃላይ መረጃ ነው፣ የሕግ ምክር አይደለም። ለተጨባጭ ጉዳይ ጠበቃ ወይም ቴቤካን ያማክሩ።

## ምንጮች

- [የሕጉ ጽሑፍ (Wikisource፣ በዕብራይስጥ)](https://he.wikisource.org/wiki/חוק_מחיקת_רישומים_פליליים_ומשטרתיים_של_יוצאי_אתיופיה)
- [የወንጀል መረጃ የምስክር ወረቀት — የእስራኤል ፖሊስ፣ gov.il](https://www.gov.il/he/service/request-for-criminal-information-certificate)

*[⚠️ የAI ትርጉም — ይህ ስሜታዊ የሕግ ርዕስ ነው። እባክዎ ከመታተሙ በፊት በአማርኛ ቋንቋ ተወላጅ ተናጋሪ በጥንቃቄ እንዲገመግመው እንመክራለን።]*`,
    },
    wizard: {
      questions: [
        {
          id: "ethiopianOrigin",
          type: "boolean",
          label: {
            he: "האם אתם, או לפחות אחד מהוריכם, נולדתם באתיופיה?",
            en: "Were you, or at least one of your parents, born in Ethiopia?",
            am: "እርስዎ ወይም ቢያንስ ከወላጆችዎ አንዱ በኢትዮጵያ ተወልደዋል?",
          },
        },
        {
          id: "offenseType",
          type: "radio",
          label: {
            he: "מה סוג העבירה שבגינה קיים הרישום?",
            en: "What kind of offense is the record for?",
            am: "መዝገቡ ለየትኛው ዓይነት ወንጀል ነው?",
          },
          options: [
            {
              value: "public-order",
              label: {
                he: "עבירת הפרת סדר ציבורי — למשל התקהלות אסורה, התפרעות, הפרעה לשוטר, העלבת עובד ציבור",
                en: "A public-order offense — e.g. unlawful assembly, rioting, obstructing a police officer, insulting a public servant",
                am: "የሕዝብ ሥርዓት ጥሰት ወንጀል — ለምሳሌ ሕገ-ወጥ ስብሰባ፣ ሁከት፣ ፖሊስን ማደናቀፍ",
              },
            },
            {
              value: "police-assault",
              label: {
                he: "תקיפת שוטר",
                en: "Assault of a police officer",
                am: "ፖሊስን ማጥቃት",
              },
            },
            {
              value: "other",
              label: {
                he: "עבירה אחרת (רכוש, אלימות, סמים וכדומה)",
                en: "Another offense (property, violence, drugs, etc.)",
                am: "ሌላ ወንጀል (ንብረት፣ ጥቃት፣ አደንዛዥ ዕፅ ወዘተ)",
              },
            },
          ],
        },
        {
          id: "offenseBefore2021",
          type: "boolean",
          label: {
            he: "האם העבירה נעברה עד 31 בדצמבר 2020 (כולל)?",
            en: "Was the offense committed on or before December 31, 2020?",
            am: "ወንጀሉ እስከ ታኅሣሥ 31፣ 2020 ድረስ ተፈጽሟል?",
          },
        },
        {
          id: "sentencedToPrison",
          type: "boolean",
          label: {
            he: "האם הוטל עליכם עונש מאסר בפועל בשל אותה עבירה?",
            en: "Was actual imprisonment imposed on you for that offense?",
            am: "ለዚያ ወንጀል የእስር ቅጣት ተፈርዶብዎታል?",
          },
        },
        {
          id: "hasOtherRecords",
          type: "boolean",
          label: {
            he: "האם יש לכם פרטי רישום נוספים במרשם הפלילי או המשטרתי?",
            en: "Do you have additional entries in the criminal or police register?",
            am: "በወንጀል ወይም በፖሊስ መዝገብ ውስጥ ተጨማሪ ምዝገባዎች አሉዎት?",
          },
        },
      ],
      rules: [
        {
          kind: "require-true",
          questionId: "ethiopianOrigin",
          reason: {
            he: 'החוק חל רק על "יוצא אתיופיה" — מי שהוא או אחד מהוריו נולדו באתיופיה (סעיף 1 לחוק).',
            en: 'The law applies only to an "Ethiopian-Israeli" — a person who was born in Ethiopia or one of whose parents was (section 1).',
            am: "ሕጉ የሚመለከተው እሱ ራሱ ወይም ከወላጆቹ አንዱ በኢትዮጵያ የተወለደን ሰው ብቻ ነው (አንቀጽ 1)።",
          },
        },
        {
          kind: "require-one-of",
          questionId: "offenseType",
          values: ["public-order"],
          reason: {
            he: "החוק מוחק רק עבירות הפרת סדר ציבורי המנויות בתוספת. תקיפת שוטר ועבירות אחרות אינן כלולות — התייעצו עם טבקה על מסלולים אחרים (חנינה, מחיקה לפי חוק המרשם הפלילי).",
            en: "The law deletes only public-order offenses listed in its schedule. Assault of a police officer and other offenses are not included — consult Tebeka about other tracks (pardon, deletion under the general Criminal Register Law).",
            am: "ሕጉ የሚሰርዘው በዝርዝሩ ውስጥ የተጠቀሱ የሕዝብ ሥርዓት ጥሰት ወንጀሎችን ብቻ ነው። ፖሊስን ማጥቃት አይካተትም — ስለ ሌሎች መንገዶች ቴቤካን ያማክሩ።",
          },
        },
        {
          kind: "require-true",
          questionId: "offenseBefore2021",
          reason: {
            he: 'החוק חל רק על עבירות שנעברו עד יום 31 בדצמבר 2020 (ט"ז בטבת התשפ"א) — סעיף 2 לחוק.',
            en: "The law covers only offenses committed until December 31, 2020 (section 2).",
            am: "ሕጉ የሚሸፍነው እስከ ታኅሣሥ 31፣ 2020 ድረስ የተፈጸሙ ወንጀሎችን ብቻ ነው (አንቀጽ 2)።",
          },
        },
        {
          kind: "require-false",
          questionId: "sentencedToPrison",
          reason: {
            he: "המחיקה חלה רק כשלא הוטל מאסר בפועל בשל העבירה (סעיף 2 לחוק). אם נדונתם למאסר — התייעצו עם עורך-דין על מסלול חנינה.",
            en: "Deletion applies only when no actual imprisonment was imposed for the offense (section 2). If you were sentenced to prison — consult a lawyer about a pardon track.",
            am: "ስረዛው የሚፈጸመው ለወንጀሉ የእስር ቅጣት ካልተፈረደ ብቻ ነው (አንቀጽ 2)። እስር ከተፈረደ — ስለ ይቅርታ መንገድ ጠበቃ ያማክሩ።",
          },
        },
        {
          kind: "require-false",
          questionId: "hasOtherRecords",
          reason: {
            he: "המחיקה מותנית בכך שאין רישום פלילי או משטרתי נוסף (סעיף 2 לחוק). אם יש רישום נוסף — פנו לטבקה לבדיקת המקרה הפרטני.",
            en: "Deletion is conditional on there being no additional criminal or police record (section 2). If you have one — contact Tebeka to review your specific case.",
            am: "ስረዛው ተጨማሪ የወንጀል ወይም የፖሊስ መዝገብ አለመኖሩ ላይ የተመሠረተ ነው (አንቀጽ 2)። ተጨማሪ መዝገብ ካለ — ቴቤካን ያነጋግሩ።",
          },
        },
      ],
    },
  },

  // 10 — תשמ"ש / תשלומי משפחה, with the ת"ש wizard (TED-142).
  //
  // DESIGN NOTE — this wizard is a ROUTER, not a calculator, and that is a
  // deliberate constraint rather than a shortcut. The substantive means-test
  // for תשמ"ש lives inside פקודת מטכ"ל 35.0210, whose text is not public.
  // Kol Zchut states only that the level of support is set by the army "לאור
  // המצב הכלכלי והסוציאלי של המבקש ומשפחתו", and explicitly notes that no
  // thresholds are published. Verification turned up no income ceiling, no
  // per-capita formula, and no documented weight for sibling count, lone
  // parenthood, or parental unemployment.
  //
  // The required-documents list (payslips, bank statements, credit-card
  // statements, vehicle ownership) implies that income and assets are
  // assessed — but implication is not documentation, and turning a document
  // checklist into a scoring rule would be inventing law. So the wizard
  // encodes only the two conditions that ARE documented:
  //   1. service type — תשמ"ש is for מלש"בים and compulsory service only
  //   2. a qualifying situation — "קשיים כלכליים או סוציאליים", לרבות היעדר
  //      תמיכה הורית (חייל בודד) או תלויים (בן/בת זוג, ילדים, אחים באפוטרופסות)
  // and then routes the user to the משק"ית ת"ש with the document checklist.
  // An "eligible" result therefore means "you may apply", never "you will
  // receive X" — the body says so in every locale.
  {
    title: {
      he: 'תשלומי משפחה לחיילים (ת"ש / תשמ"ש) — סיוע כלכלי בשירות חובה',
      en: 'Family Payments for Soldiers (ת"ש / תשמ"ש) — Financial Support in Compulsory Service',
      am: 'የወታደሮች የቤተሰብ ክፍያዎች (ת"ש / תשמ"ש) — በግዴታ አገልግሎት የገንዘብ ድጋፍ',
    },
    slug: {
      he: "idf-family-support",
      en: "idf-family-support",
      am: "idf-family-support",
    },
    govUrl: "https://www.idf.il/media/rlel3g1f/350210.pdf",
    eligibilitySummary: {
      he: 'תשמ"ש הוא תשלום חודשי שנועד להבטיח את קיומה המינימלי של משפחת החייל. זכאים לבקש מלש"בים וחיילים בשירות חובה שהם או משפחתם נתונים בקשיים כלכליים או סוציאליים. הבקשה מוגשת למש"קית ת"ש — בלשכת הגיוס לפני הגיוס, וביחידה במהלך השירות.',
      en: "תשמ\"ש is a monthly payment intended to secure the minimum subsistence of a soldier's family. Pre-recruits and compulsory-service soldiers who — or whose families — face financial or social difficulties may apply. The application goes to the family-support NCO: at the recruitment office before enlistment, and in the unit during service.",
      am: 'תשמ"ש የወታደሩን ቤተሰብ ዝቅተኛ ኑሮ ለማረጋገጥ የታሰበ ወርሃዊ ክፍያ ነው። እነሱ ወይም ቤተሰባቸው በገንዘብ ወይም በማህበራዊ ችግር ውስጥ ያሉ ተመዝጋቢዎችና የግዴታ አገልግሎት ወታደሮች ማመልከት ይችላሉ። ማመልከቻው ለמש"קית ת"ש ይቀርባል።',
    },
    tags: ["family", "grants", "army"],
    bodies: {
      he: `## למה זה חשוב דווקא בקהילה שלנו

מסמך שהוכן במרכז המחקר והמידע של הכנסת לקראת דיון בוועדת העלייה, הקליטה והתפוצות (דצמבר 2015) קבע: **"רקע כלכלי — חלק ניכר מהחיילים סובלים מבעיות כלכליות בבתיהם ונאלצים לסייע בפרנסת המשפחה"**. זהו הרקע השכיח לנפקדות, ומשם לכליאה. פתיחת תיק ת"ש בזמן היא הדרך המוסדרת לשבור את השרשרת הזו — לפני שהיא מתחילה.

## מה זה תשמ"ש

תשמ"ש (תשלומי משפחה) הוא תשלום חודשי שנועד להבטיח את קיומה המינימלי של משפחת החייל. הוא מוסדר בפקודת מטכ"ל 35.0210, "חוקת התשלומים למשפחות חיילים בשירות חובה".

## מי יכול לבקש

מלש"בים (מיועדים לשירות ביטחון) וחיילים בשירות חובה **שהם או משפחתם נתונים בקשיים כלכליים או סוציאליים**. אפשר לבקש תשלום עבור:

- ההורים — שניהם או אחד מהם
- בן או בת זוג
- ילדים
- אחים ואחיות — אם החייל הוא האפוטרופוס שלהם

למלש"בים התשלום ניתן רק לאחר הגיוס בפועל. חיילים בשירות קבע אינם בגדר הזכאות הזו.

## איך מגישים — וזה לא טופס להורדה

הבקשה מוגשת ל**מש"קית ת"ש**: בלשכת הגיוס לפני הגיוס, וביחידה במהלך השירות. קיים גם ערוץ דיגיטלי באזור האישי, אך **בקשה ראשונה מחייבת את מעורבות המש"קית**. אין טופס שממלאים לבד ושולחים — מתחילים בשיחה.

## מה להביא

- תלושי שכר של ההורים או בן/בת הזוג — שלושה חודשים
- דפי חשבון בנק — שלושה חודשים
- אישורי קצבאות מביטוח לאומי, אם יש
- צילום תעודת זהות עם הספח שבו רשומים הילדים
- דוח עובד סוציאלי, אם רלוונטי
- אישור אפוטרופסות, אם רלוונטי
- פרטי הלוואות ופיקדונות
- דפי כרטיס אשראי — שלושה חודשים
- אישור בעלות על רכב, אם יש

ייתכן גם ביקור בית במסגרת בדיקת הבקשה.

## מה כולל הסיוע

מעבר לתשלום החודשי להורים או לבן/בת הזוג: תווי חג פעמיים בשנה (ראש השנה ופסח), מענקי ציוד ומוצרי חשמל, מענקים חד-פעמיים במצבי מצוקה דחופה, הלוואות, וחופשה מיוחדת. חיילים בודדים הזכאים לתשמ"ש מקבלים גם תווי מזון חודשיים.

## נדחיתם?

יש זכות ערעור — דרך לשכת הגיוס לפני השירות, או דרך המש"קית ת"ש ביחידה במהלכו.

## מה לא כתוב כאן — ולמה

**לא פירטנו סכומים.** המקורות הרשמיים הזמינים נותנים מספרים סותרים לאותם רכיבים, וחלקם ללא תאריך עדכון. **לא פירטנו תנאי סף כלכליים** — תקרות הכנסה, חישוב לנפש, או משקל של מספר האחים — משום שהקריטריונים המהותיים נמצאים בפקודת המטכ"ל, שאינה פומבית. כל-זכות מציין במפורש שהיקף הסיוע נקבע "לאור המצב הכלכלי והסוציאלי של המבקש ומשפחתו" ושלא מתפרסמים ספים.

לכן האשף שלמטה בודק **אם פתוחה בפניכם הדרך להגיש בקשה** — לא אם תאושרו ולא כמה תקבלו. הגורם המוסמך היחיד לכך הוא המש"קית ת"ש.

## קשור

- [חייל נעצר או נכלא — מה עושים](/he/family/soldiers/detention)
- [חייל בודד וחייל ממשפחה מתקשה](/he/family/soldiers/lone-soldier)

> **הבהרה:** מידע זה כללי ואינו ייעוץ משפטי או פיננסי. תוצאת האשף מבוססת על התנאים המתועדים בלבד ואינה קביעה מחייבת.

## מקורות

- [פקודת מטכ"ל 35.0210 — חוקת התשלומים למשפחות חיילים בשירות חובה](https://www.idf.il/media/rlel3g1f/350210.pdf)
- [תשמ"ש — תשלומי משפחה (סיוע כלכלי לחיילים), כל-זכות](https://www.kolzchut.org.il/he/תשמ%22ש_-_תשלומי_משפחה_(סיוע_כלכלי_לחיילים))
- [ת"ש (תנאי שירות) — משרד הביטחון](https://9779.mod.gov.il/info/ת״ש-(תנאי-שירות))
`,
      en: `## Why this matters especially in our community

A paper prepared by the Knesset Research and Information Center ahead of a session of the Immigration, Absorption and Diaspora Affairs Committee (December 2015) stated: **"Economic background — a considerable share of the soldiers suffer from financial problems at home and are compelled to help support the family."** This is the common backdrop to going AWOL, and from there to incarceration. Opening a family-support case in time is the formal way to break that chain — before it starts.

## What תשמ"ש is

תשמ"ש (family payments) is a monthly payment intended to secure the minimum subsistence of a soldier's family. It is governed by General Staff Order 35.0210, "The payments code for families of compulsory-service soldiers".

## Who may apply

Pre-recruits and compulsory-service soldiers **who, or whose families, face financial or social difficulties**. Payment may be requested for:

- The parents — both or one of them
- A spouse
- Children
- Siblings — where the soldier is their guardian

For pre-recruits the payment is released only after actual enlistment. Career-service soldiers are outside this entitlement.

## How to apply — and it is not a downloadable form

The application goes to the **family-support NCO**: at the recruitment office before enlistment, and in the unit during service. A digital channel exists in the personal area, but **a first application requires the coordinator's involvement**. There is no form you fill in alone and send — it starts with a conversation.

## What to bring

- Payslips for the parents or spouse — three months
- Bank statements — three months
- National Insurance benefit confirmations, if any
- A copy of the ID card with the appendix listing children
- A social worker's report, if relevant
- Guardianship confirmation, if relevant
- Loan and deposit details
- Credit-card statements — three months
- Proof of vehicle ownership, if any

A home visit may also form part of the assessment.

## What the support includes

Beyond the monthly payment to parents or spouse: holiday vouchers twice a year (Rosh Hashanah and Passover), equipment and electrical-appliance grants, one-off payments in urgent hardship, loans, and special leave. Lone soldiers eligible for תשמ"ש also receive monthly food vouchers.

## Rejected?

There is a right of appeal — through the recruitment office before service, or through the unit's family-support NCO during it.

## What is not written here — and why

**We have not listed amounts.** The available official sources give conflicting numbers for the same components, and some carry no update date. **We have not listed financial thresholds** — income ceilings, per-capita calculations, or the weight given to the number of siblings — because the substantive criteria sit in the General Staff order, which is not public. Kol Zchut states explicitly that the scope of support is set "in light of the economic and social situation of the applicant and their family" and that no thresholds are published.

The wizard below therefore checks **whether the route to apply is open to you** — not whether you will be approved, and not how much you would receive. The only authoritative party for that is the family-support NCO.

## Related

- [A soldier was detained or jailed — what to do](/en/family/soldiers/detention)
- [Lone soldiers and soldiers from struggling families](/en/family/soldiers/lone-soldier)

> **Note:** This is general information, not legal or financial advice. The wizard's result reflects the documented conditions only and is not a binding determination.

## Sources

- [General Staff Order 35.0210 — the payments code for families of compulsory-service soldiers](https://www.idf.il/media/rlel3g1f/350210.pdf)
- [תשמ"ש — family payments, Kol Zchut](https://www.kolzchut.org.il/he/תשמ%22ש_-_תשלומי_משפחה_(סיוע_כלכלי_לחיילים))
- [ת"ש (service conditions) — Ministry of Defense](https://9779.mod.gov.il/info/ת״ש-(תנאי-שירות))
`,
      am: `## ይህ በተለይ በማህበረሰባችን ውስጥ ለምን አስፈላጊ ነው

በክነሴት የምርምር እና መረጃ ማዕከል የተዘጋጀ ሰነድ (ታኅሣሥ 2015) እንዲህ ብሏል: **"የኢኮኖሚ ዳራ — ከወታደሮቹ ጉልህ ክፍል በቤታቸው የገንዘብ ችግር ይሰቃያሉ እና ቤተሰቡን ለመርዳት ይገደዳሉ"**። ይህ ለנפקדות የተለመደው ዳራ ነው፣ ከዚያም ወደ እስር። የת"ש መዝገብን በጊዜ መክፈት ይህን ሰንሰለት ለመስበር የተደራጀው መንገድ ነው።

## תשמ"ש ምንድን ነው

תשמ"ש (የቤተሰብ ክፍያዎች) የወታደሩን ቤተሰብ ዝቅተኛ ኑሮ ለማረጋገጥ የታሰበ ወርሃዊ ክፍያ ነው። በጠቅላይ ኤታማዦር ትዕዛዝ 35.0210 ይተዳደራል።

## ማን ማመልከት ይችላል

ተመዝጋቢዎች እና የግዴታ አገልግሎት ወታደሮች **እነሱ ወይም ቤተሰባቸው በገንዘብ ወይም በማህበራዊ ችግር ውስጥ ያሉ**። ክፍያ መጠየቅ የሚቻለው ለ:

- ወላጆች — ለሁለቱም ወይም ለአንዱ
- የትዳር አጋር
- ልጆች
- ወንድሞችና እህቶች — ወታደሩ አሳዳጊያቸው ከሆነ

ለተመዝጋቢዎች ክፍያው የሚለቀቀው ከተመዘገቡ በኋላ ብቻ ነው። የቋሚ አገልግሎት ወታደሮች በዚህ መብት ውስጥ አይካተቱም።

## እንዴት ማመልከት — የሚወርድ ቅጽ አይደለም

ማመልከቻው ለ**מש"קית ת"ש** ይቀርባል: ከምዝገባ በፊት በምልመላ ጽሕፈት ቤት፣ በአገልግሎት ወቅት በክፍሉ። በግል አካባቢ ዲጂታል መንገድ አለ፣ ግን **የመጀመሪያው ማመልከቻ የአስተባባሪውን ተሳትፎ ይጠይቃል**። ብቻዎን ሞልተው የሚልኩት ቅጽ የለም — በንግግር ይጀምራል።

## ምን ማምጣት

- የወላጆች ወይም የትዳር አጋር የደመወዝ ወረቀቶች — ሦስት ወር
- የባንክ ሂሳብ ወረቀቶች — ሦስት ወር
- ካሉ የብሔራዊ ኢንሹራንስ አበል ማረጋገጫዎች
- ልጆች የተመዘገቡበት ሰፍሕ ያለው የመታወቂያ ቅጂ
- አግባብ ካለው የማህበራዊ ሠራተኛ ሪፖርት
- አግባብ ካለው የአሳዳጊነት ማረጋገጫ
- የብድርና የተቀማጭ ዝርዝሮች
- የክሬዲት ካርድ ወረቀቶች — ሦስት ወር
- ካለ የተሽከርካሪ ባለቤትነት ማረጋገጫ

የቤት ጉብኝትም የግምገማው አካል ሊሆን ይችላል።

## ድጋፉ ምን ያካትታል

ከወርሃዊው ክፍያ በተጨማሪ: በዓመት ሁለት ጊዜ የበዓል ቫውቸሮች፣ የዕቃና የኤሌክትሪክ ዕቃ ድጎማዎች፣ በአስቸኳይ ችግር ጊዜ አንድ ጊዜ ክፍያዎች፣ ብድሮች፣ እና ልዩ ፈቃድ። ለתשמ"ש ብቁ የሆኑ ብቸኛ ወታደሮች ወርሃዊ የምግብ ቫውቸሮችም ያገኛሉ።

## ውድቅ ተደረጉ?

የይግባኝ መብት አለ — ከአገልግሎት በፊት በምልመላ ጽሕፈት ቤት፣ በአገልግሎት ወቅት በክፍሉ በמש"קית ת"ש በኩል።

## እዚህ ያልተጻፈው — እና ለምን

**መጠኖችን አልዘረዘርንም።** የሚገኙት ኦፊሴላዊ ምንጮች ለተመሳሳይ አካላት የሚጋጩ ቁጥሮች ይሰጣሉ። **የገንዘብ ገደቦችንም አልዘረዘርንም** — የገቢ ጣሪያዎች ወይም የነፍስ ወከፍ ስሌት — ምክንያቱም መሠረታዊዎቹ መስፈርቶች ይፋ ባልሆነው የጠቅላይ ኤታማዦር ትዕዛዝ ውስጥ ናቸው።

ስለዚህ ከታች ያለው አዋቂ የሚመረምረው **ማመልከቻ የማቅረብ መንገዱ ለእርስዎ ክፍት መሆኑን** ነው — እንደሚጸድቅልዎት ወይም ስንት እንደሚያገኙ አይደለም። ለዚያ ሥልጣን ያለው ብቸኛው አካል የמש"קית ת"ש ናት።

## ተዛማጅ

- [ወታደር ታሰረ ወይም ተከሰረ — ምን ማድረግ](/am/family/soldiers/detention)
- [ብቸኛ ወታደር እና ከተቸገረ ቤተሰብ የመጣ ወታደር](/am/family/soldiers/lone-soldier)

> **ማስታወሻ:** ይህ አጠቃላይ መረጃ ነው፣ የሕግ ወይም የገንዘብ ምክር አይደለም። የአዋቂው ውጤት የተመዘገቡትን ሁኔታዎች ብቻ የሚያንጸባርቅ ነው።

## ምንጮች

- [የጠቅላይ ኤታማዦር ትዕዛዝ 35.0210](https://www.idf.il/media/rlel3g1f/350210.pdf)
- [תשמ"ש — የቤተሰብ ክፍያዎች, כל-זכות](https://www.kolzchut.org.il/he/תשמ%22ש_-_תשלומי_משפחה_(סיוע_כלכלי_לחיילים))
`,
    },
    wizard: {
      questions: [
        {
          id: "serviceType",
          type: "radio",
          label: {
            he: "מה סוג השירות שלכם כרגע?",
            en: "What is your service status right now?",
            am: "አሁን የአገልግሎት ሁኔታዎ ምንድን ነው?",
          },
          options: [
            {
              value: "conscript",
              label: {
                he: "שירות חובה (סדיר)",
                en: "Compulsory service",
                am: "የግዴታ አገልግሎት",
              },
            },
            {
              value: "pre-enlist",
              label: {
                he: 'מלש"ב — לפני גיוס',
                en: "Pre-recruit — before enlistment",
                am: "ተመዝጋቢ — ከምዝገባ በፊት",
              },
            },
            {
              value: "career",
              label: {
                he: "שירות קבע",
                en: "Career service",
                am: "የቋሚ አገልግሎት",
              },
            },
            {
              value: "reserves",
              label: {
                he: "מילואים",
                en: "Reserves",
                am: "የመጠባበቂያ",
              },
            },
            {
              value: "discharged",
              label: {
                he: "משוחרר",
                en: "Discharged",
                am: "የተሰናበተ",
              },
            },
          ],
        },
        {
          id: "financialHardship",
          type: "boolean",
          label: {
            he: "האם אתם או משפחתכם נתונים בקשיים כלכליים או סוציאליים?",
            en: "Are you or your family facing financial or social difficulties?",
            am: "እርስዎ ወይም ቤተሰብዎ በገንዘብ ወይም በማህበራዊ ችግር ውስጥ ናችሁ?",
          },
        },
        {
          id: "noParentalSupport",
          type: "boolean",
          label: {
            he: 'האם אין לכם תמיכה הורית בארץ — הורים בחו"ל, ניתוק קשר, או יתמות?',
            en: "Do you have no parental support in Israel — parents abroad, no contact, or orphanhood?",
            am: "በአገር ውስጥ የወላጅ ድጋፍ የለዎትም — ወላጆች በውጭ አገር፣ ግንኙነት መቋረጥ፣ ወይም ወላጅ አልባነት?",
          },
        },
        {
          id: "hasDependents",
          type: "boolean",
          label: {
            he: "האם יש לכם תלויים — בן/בת זוג, ילדים, או אחים שאתם האפוטרופוס שלהם?",
            en: "Do you have dependents — a spouse, children, or siblings for whom you are the guardian?",
            am: "ጥገኞች አሉዎት — የትዳር አጋር፣ ልጆች፣ ወይም አሳዳጊያቸው የሆኑ ወንድሞች/እህቶች?",
          },
        },
      ],
      rules: [
        {
          kind: "require-one-of",
          questionId: "serviceType",
          values: ["conscript", "pre-enlist"],
          reason: {
            he: 'תשמ"ש מיועד למלש"בים ולחיילים בשירות חובה בלבד (פ"מ 35.0210). לשירות קבע, מילואים ומשוחררים קיימים מסלולים אחרים — למשוחררים ראו הפיקדון האישי ומענק השחרור.',
            en: 'תשמ"ש is for pre-recruits and compulsory-service soldiers only (Order 35.0210). Career service, reserves and discharged soldiers have other tracks — for the discharged, see the personal deposit and discharge grant.',
            am: 'תשמ"ש ለተመዝጋቢዎችና ለግዴታ አገልግሎት ወታደሮች ብቻ ነው (ትዕዛዝ 35.0210)። ለቋሚ አገልግሎት፣ ለመጠባበቂያና ለተሰናበቱ ሌሎች መንገዶች አሉ።',
          },
        },
        {
          kind: "require-any",
          questionIds: ["financialHardship", "noParentalSupport", "hasDependents"],
          reason: {
            he: 'הבקשה נפתחת כאשר החייל או משפחתו נתונים בקשיים כלכליים או סוציאליים, או כשיש היעדר תמיכה הורית או תלויים. אם המצב משתנה — אפשר לפנות למש"קית ת"ש בכל שלב של השירות.',
            en: "The application opens where the soldier or their family faces financial or social difficulties, or where there is no parental support or there are dependents. If circumstances change, you may approach the family-support NCO at any stage of service.",
            am: 'ማመልከቻው የሚከፈተው ወታደሩ ወይም ቤተሰቡ በገንዘብ ወይም በማህበራዊ ችግር ውስጥ ሲሆኑ፣ ወይም የወላጅ ድጋፍ ሲጠፋ ወይም ጥገኞች ሲኖሩ ነው። ሁኔታው ከተለወጠ በማንኛውም ጊዜ ወደ מש"קית ת"ש መቅረብ ይችላሉ።',
          },
        },
      ],
    },
  },
  // TED-145 — Special-education eligibility committee ("ועדת השמה" in the
  // old, pre-2018 name) and the parent's right to object.
  //
  // Verified against the statute text and the Ministry's own parent booklet:
  //   - חוק חינוך מיוחד, התשמ"ח-1988, consolidated text on Nevo
  //     (www.nevo.co.il/law_html/law00/71999.htm), as amended by תיקון 11,
  //     התשע"ח-2018. Section numbers used below are from that text:
  //       §5   — the Minister appoints ועדות זכאות ואפיון
  //       §6(א) — six-member composition, incl. a parent representative
  //       §7(א) — the committee determines זכאות, רמת תפקוד, היקף סל השירותים
  //       §7(ב)(1) — written information on the services available in each of
  //                  the three framework types
  //       §7(ב)(2) — THE PARENTS choose the framework, notifying within 14 days
  //       §8   — who may refer a student to the committee
  //       §9(ב)(3) — the committee must invite parents + student and let them
  //                  (or their representative) argue; documents at least
  //                  14 days before the hearing
  //       §9(ג)(2) — protocol + decision within 14 days
  //       §10(א) — דיון חוזר once every three years
  //       §11  — quorum of four
  //       §12(ב) — ועדת השגה composition, chaired by the district director
  //       §13(א) — השגה within 21 days, by the student, a parent, or a public
  //                organisation's representative
  //       §13(ב) — powers: accept / return for re-hearing / reject
  //       §13(ג) — the השגה is decided within 21 days
  //   - משרד החינוך, המינהל הפדגוגי, אגף א' חינוך מיוחד — "יישום תיקון 11
  //     לחוק החינוך המיוחד — דפי מידע להורים" (Feb 2020), which confirms:
  //     referral by 31 March, hearings 1 Nov–15 May, the 14/14/21-day clocks,
  //     the three framework types, the multi-professional-team route and its
  //     own 21-day השגה heard by a ועדת השגה sitting as a ועדת זכאות ואפיון,
  //     the district ועדת השגה chaired by the מנהל מחוז, the right to bring
  //     one's own representatives, and — directly relevant here — that
  //     "הורים הזקוקים להנגשה או לתרגום שפה, יודיעו על כך מראש לוועדה".
  //   - חוזר מנכ"ל 0287, "יישום חוק החינוך המיוחד — ועדות מתוקף חוק"
  //     (apps.education.gov.il/mankal/horaa.aspx?siduri=385), verified from the
  //     circular text itself. Three provisions used here: linguistic accessibility
  //     must be arranged IN ADVANCE for parents who do not speak Hebrew, and if it
  //     was not provided a new date is set which does not count towards the
  //     postponement limit; the student and parents may bring their own
  //     interpreter to the ועדת השגה; and a new-immigrant student in their first
  //     year is referred only on admissible evidence of a disability, "ולא על רקע
  //     של קשיי קליטה ושפה בלבד".
  //   - מרכז המחקר והמידע של הכנסת (11.8.2022) — 17.2% of Ethiopian-Israeli pupils
  //     entitled to special-education services vs 12% system-wide.
  //   - כל-זכות — ועדת זכאות ואפיון, ועדת שיבוץ (the latter for the fact that
  //     the local authority's placement committee, not the eligibility
  //     committee, assigns the specific institution, and that parents are not
  //     invited to it).
  //
  // DELIBERATELY EXCLUDED as unverifiable or time-limited: the 2020 booklet's
  // disability × function-level table of who does and does not get a framework
  // choice (published as a transitional arrangement for תש"ף/תשפ"א); any
  // per-district contact person (the booklet's name list is from 2020); and
  // any claim about how long a specific local authority takes in practice.
  {
    title: {
      he: 'הילד שלי הופנה ל"ועדת השמה" — מה זו ועדת זכאות ואפיון ומה הזכויות שלכם',
      en: "My child was referred to a placement committee — what the eligibility and characterization committee is, and your rights",
      am: 'ልጄ ወደ "ኮሚቴ" ተላከ — የብቁነትና የአፈጻጸም ኮሚቴ ምንድን ነው እና መብቶችዎ ምንድናቸው',
    },
    slug: {
      he: "special-education-eligibility-committee",
      en: "special-education-eligibility-committee",
      am: "special-education-eligibility-committee",
    },
    govUrl: "https://www.gov.il/he/pages/guide_rights_committees_special_ed_law",
    eligibilitySummary: {
      he: 'מאז תיקון 11 לחוק חינוך מיוחד (2018) אין יותר "ועדת השמה": הוועדה נקראת ועדת זכאות ואפיון, היא קובעת זכאות ורמת תפקוד — ואתם ההורים בוחרים את סוג המסגרת. על ההחלטה אפשר להגיש השגה תוך 21 יום.',
      en: 'Since Amendment 11 to the Special Education Law (2018) there is no "placement committee": it is an eligibility and characterization committee, it determines entitlement and function level — and you, the parents, choose the type of framework. Its decision can be objected to within 21 days.',
      am: "ከ2018 የልዩ ትምህርት ሕግ ማሻሻያ 11 ጀምሮ ኮሚቴው ብቁነትንና የአፈጻጸም ደረጃን ይወስናል — የትምህርት ማዕቀፉን ግን እናንተ ወላጆች ትመርጣላችሁ። በውሳኔው ላይ በ21 ቀናት ውስጥ አቤቱታ (השגה) ማቅረብ ይቻላል።",
    },
    tags: ["education"],
    bodies: {
      he: `## קודם כול — השם השתנה, והמשמעות איתו

הרבה הורים עדיין מקבלים טלפון מבית הספר ושומעים "הילד מופנה לוועדת השמה". השם הזה כבר לא קיים בחוק. **תיקון מס' 11 לחוק חינוך מיוחד, התשע"ח-2018** שינה את השמות ואת מאזן הכוחות:

| השם הישן | השם היום |
| --- | --- |
| ועדת השמה / ועדת שילוב | **ועדת זכאות ואפיון** |
| ועדת ערר | **ועדת השגה** |

העיקרון שמשרד החינוך עצמו מנסח בדפי המידע להורים: **"חינוך מיוחד — שירות ולא מקום."** הוועדה כבר לא "משימה" את הילד למקום. היא קובעת שהילד **זכאי** לשירותי חינוך מיוחדים ובאיזה **היקף** — ואתם בוחרים את סוג המסגרת שבה הוא ילמד.

זה השינוי החשוב ביותר שאתם צריכים לדעת עליו לפני שאתם נכנסים לחדר.

## מי מחליט מה — שלושה גופים שונים

בלבול בין שלושת הגופים האלה הוא המקור הנפוץ ביותר לתסכול. הם אינם אותו דבר:

1. **צוות רב-מקצועי** — מתכנס **בגן או בבית הספר** עצמו. יושב הראש הוא מנהל המוסד, ומשתתפים בו המחנך/ת, פסיכולוג או יועץ חינוכי, עובד הוראה מהחינוך המיוחד — ואתם, ההורים (סעיף 20ד לחוק). הוא דן בתמיכות מתוך "סל השילוב המוסדי" ובבניית התוכנית האישית.
2. **ועדת זכאות ואפיון** — מתכנסת **ברשות המקומית** שבה הילד רשום. היא קובעת זכאות לשירותי חינוך מיוחדים, את רמת התפקוד ואת היקף סל השירותים.
3. **ועדת שיבוץ** — של הרשות המקומית. **אחרי** שנקבעה הזכאות ואתם בחרתם סוג מסגרת, היא קובעת באיזה מוסד ספציפי הילד ילמד, לפי מקום פנוי, מרחק נסיעה והרכב הכיתה. **הורים אינם מוזמנים לוועדת שיבוץ** — ולכן חשוב לומר את שם המוסד שאתם מעדיפים כבר בוועדת הזכאות והאפיון, ולבקש שזה יירשם בפרוטוקול.

## מה ועדת הזכאות והאפיון קובעת — ומה לא

לפי **סעיף 7(א)** לחוק הוועדה קובעת שלושה דברים בלבד:

- **זכאות** לשירותי חינוך מיוחדים — לילד עם מוגבלות מהמפורטות בתוספת הראשונה לחוק, המגבילה את תפקודו
- **רמת התפקוד** של הילד (בתחומים לימודי, שפתי-תקשורתי, חברתי, רגשי ועצמאות אישית)
- **היקף סל השירותים** שיינתן לו, בהתאם לרמת התפקוד

היא **אינה** קובעת באיזה בית ספר הילד ילמד (זו ועדת שיבוץ), והיא **אינה** קובעת את הרכב התמיכות בפועל — כמה שעות הוראה, כמה טיפול, כמה סייעת. את פילוח הסל האישי קובע הצוות הרב-מקצועי בבית הספר, יחד אתכם.

## הזכות המרכזית: אתם בוחרים את סוג המסגרת

**סעיף 7(ב) לחוק** קובע שהוועדה חייבת למסור לכם **מידע בכתב** על השירותים שהילד יקבל בכל אחת משלוש האפשרויות:

1. גן או כיתה רגילה במוסד חינוך רגיל
2. כיתה לחינוך מיוחד בתוך מוסד חינוך רגיל
3. גן או בית ספר לחינוך מיוחד

**ואז אתם בוחרים.** סעיף 7(ב)(2): "הורי התלמיד יבחרו את המסגרת החינוכית... ויודיעו על בחירתם... בתוך 14 ימים."

שלוש הסתייגויות שחשוב להכיר, כדי שלא תופתעו:

- אם **לא הודעתם** על בחירתכם תוך 14 יום — הסמכות לבחור עוברת לוועדה, שתיתן עדיפות לשילוב בחינוך הרגיל.
- יש צירופים של סוג מוגבלות ורמת תפקוד שבהם החוק וההנחיות אינם מקנים זכות בחירה, אלא קובעים לימודים בחינוך הרגיל עם תמיכה מהסל המוסדי. שאלו את יושב ראש הוועדה במפורש: "האם במקרה של הילד שלי יש לנו זכות בחירה?" — ובקשו שהתשובה תירשם בפרוטוקול.
- במקרים שבהם קיים **חשש ממשי** שהמסגרת שבחרתם תביא לפגיעה ממשית בשלום הילד או בשלום אחרים, הדיון בזכות הבחירה מועבר למנהל/ת האגף לחינוך מיוחד במשרד החינוך. גם על החלטה כזו אפשר להגיש השגה.

## הזכויות שלכם בתוך הדיון

אלה זכויות מכוח החוק וההנחיות, לא טובות שמישהו עושה לכם:

- **להיות מוזמנים ולהיות נוכחים.** הוועדה חייבת להזמין אתכם ואת התלמיד, ולאפשר לכם — או למי מטעמכם — להשמיע את טיעוניכם (סעיף 9(ב)(3)).
- **להביא אנשים מטעמכם.** אתם רשאים להזמין לדיון מלווה, עורך דין, איש מקצוע פרטי, נציג ארגון או בן משפחה. אין צורך בהיתר.
- **לקבל את כל המסמכים מראש.** כל מסמך שנמצא בידי הוועדה ועשוי לשמש בדיון — לפחות **14 ימים לפני** התכנסותה. אם לא קיבלתם, בקשו בכתב ובקשו לדחות את הדיון.
- **לצרף מסמכים משלכם.** אבחונים, דוחות טיפוליים, חוות דעת פרטיות, מכתב חופשי. מילוי שאלון ההורים אינו חובה — אפשר להגיש מכתב בנוסח שלכם.
- **לדבר ביחידות.** אתם והתלמיד רשאים לבקש להשמיע את דבריכם בפני חברי הוועדה בלבד, בלי שאר המוזמנים בחדר.
- **לתרגום ולהנגשה — וזו זכות חזקה מכפי שרוב ההורים מניחים.** חוזר מנכ"ל 0287, "יישום חוק החינוך המיוחד — ועדות מתוקף חוק", קובע: "בדיון שמשתתפים בו הורים עם מוגבלות, **הורים שאינם דוברי עברית**, או הורים הזקוקים לתיווך של התהליך, ידאג יו"ר הצוות הרב-מקצועי **מראש** להנגשה הנדרשת… כגון הנגשה פיזית של מקום המפגש, תרגום לשפת הסימנים, הקראת המסמכים, **תרגום לשפה המובנת להורים** וגישור. **אם לא סופקה ההנגשה, ייקבע מועד חדש** בתיאום עם ההורים, ובו יתקיים הדיון עם ההנגשה הנדרשת. דחיית הדיון במקרה זה **לא תיכלל במניין הדחיות**." כלומר: אם הגעתם ולא היה תרגום — אתם רשאים לבקש שהדיון יידחה, וזה לא ייזקף לחובתכם. הודיעו מראש ובכתב, וציינו זאת גם בשאלון ההורים.
- **להביא מתורגמן משלכם לוועדת ההשגה.** אותו חוזר קובע שהתלמיד וההורים רשאים להביא לדיון בוועדת ההשגה מומחים או אנשים אחרים מטעמם, לרבות עורך דין, "**וכן מתורגמן מטעמם**".
- **לדעת מי יושב מולכם.** בוועדה שישה חברים (סעיף 6(א)): נציג משרד החינוך כיושב ראש, נציג הרשות המקומית, פסיכולוג חינוכי, מפקח לחינוך מיוחד, מפקח לחינוך רגיל — **ונציג הורים**, שהוא בעצמו הורה לילד עם מוגבלות, ממונה על ידי שר החינוך. אתם רשאים לפנות לרכז נציגי ההורים באזורכם ולהיפגש עם נציג ההורים עוד לפני הדיון.
- **לקבל פרוטוקול והחלטה בכתב** — תוך **14 ימים** (סעיף 9(ג)(2)). בלי פרוטוקול אין על מה להשיג, אז אל תוותרו עליו.

## לוח הזמנים השנתי

- **הפניה לוועדה: עד 31 במרץ** בכל שנה. הורים שהילד שלהם בתהליך אבחון ימציאו על כך אישור עד אותו תאריך.
- **הדיונים מתקיימים** בין 1 בנובמבר ל-15 במאי באותה שנת לימודים, למעט מקרים חריגים.
- **מי רשאי להפנות** (סעיף 8): ההורים, התלמיד, הצוות הרב-מקצועי, מוסד חינוך מוכר, הרשות המקומית, ארגון ציבורי או גורם שהוסמך לכך. **ההורים רשאים לפנות לוועדה בכל שלב** — אינכם תלויים בבית הספר.
- **תוקף ההחלטה: שלוש שנים**, ודיון חוזר מתקיים אחת לשלוש שנים (סעיף 10(א)). אפשר לבקש דיון חוזר מוקדם יותר לאחר שחלפה שנה.

## חשוב במיוחד: קשיי שפה וקליטה אינם עילה להפניה

זו אולי השורה החשובה ביותר בעמוד הזה. חוזר מנכ"ל 0287 קובע במפורש: "**תלמיד עולה חדש בשנה הראשונה לעלייתו יופנה לדיון בצוות הרב-מקצועי כל עוד יש בידי הגורם המפנה מסמכים עדכניים וקבילים המעידים על מוגבלותו, ולא על רקע של קשיי קליטה ושפה בלבד.**"

במילים אחרות: ילד שמתקשה בעברית, שהגיע לא מזמן, או שמתקשה להסתגל — אינו אמור להיות מופנה לוועדה בגלל זה. הפניה מחייבת מסמך קביל על אבחנת מוגבלות.

זו לא נקודה תיאורטית. מסמך של מרכז המחקר והמידע של הכנסת משנת 2022 מצא ש-17.2% מהתלמידים יוצאי אתיופיה זכאים לשירותי חינוך מיוחדים, לעומת 12% בקרב כלל התלמידים — ושבארבע השנים שקדמו לו שיעור התלמידים יוצאי אתיופיה המשולבים בחינוך הרגיל ירד במידה ניכרת.

לכן, אם הופנה ילדכם — שאלו במפורש, ובקשו שהתשובה תירשם בפרוטוקול: **על סמך איזה מסמך אבחנתי נעשתה ההפניה?** אם התשובה נוגעת לעברית, להסתגלות או להתנהגות בלבד — ציינו את הוראת החוזר.

## איך מגישים השגה

זהו החלק שהורים מפספסים לרוב, כי השעון קצר.

**מי רשאי** (סעיף 13(א)): התלמיד, הורה, או נציג של ארגון ציבורי.

**תוך כמה זמן: 21 ימים** מקבלת ההחלטה **בכתב**. השעון מתחיל מהקבלה בכתב — לא מיום הדיון. אם עברו שבועיים ולא קיבלתם החלטה בכתב, דרשו אותה.

**על מה אפשר להשיג**: על ההחלטה כולה או על חלק ממנה. אפשר להשיג רק על רמת התפקוד, או רק על היקף הסל, ולהשאיר את השאר.

**מי דן**: ועדת השגה **מחוזית**, בראשות מנהל המחוז של משרד החינוך או מי מטעמו (סעיף 12(ב)). בוועדה יושבים גם פסיכולוג חינוכי מחוזי, מפקח לחינוך מיוחד, מפקח לחינוך רגיל, הורה לתלמיד עם צרכים מיוחדים ונציג ארגון ציבורי. **אתם רשאים להזמין נציגים מטעמכם.**

**מה היא רשאית להחליט** (סעיף 13(ב)): לקבל את ההשגה ולשנות את ההחלטה, להחזיר את העניין לדיון חוזר בוועדת הזכאות והאפיון, או לדחות את ההשגה.

**תוך כמה זמן היא מחליטה**: 21 ימים (סעיף 13(ג)).

**איך מגישים בפועל**: ההשגה מוגשת למשרד החינוך — דרך [עמוד ההשגות ב-gov.il](https://www.gov.il/he/departments/general/special_education_appeals) ופורטל ההורים. הגישו **בכתב ומנומק**, וצרפו כל מסמך רלוונטי — כולל מסמכים חדשים שלא היו בפני הוועדה הראשונה. בקשו אישור על כך שההשגה התקבלה, ושמרו עותק.

**גם על החלטת הצוות הרב-מקצועי** אפשר להגיש השגה, תוך 21 ימים מקבלתה בכתב. השגה כזו נדונה בוועדת השגה שמתכנסת במעמד ועדת זכאות ואפיון.

## מה עושים כדי להיכנס מוכנים

1. בקשו בכתב את כל מסמכי הוועדה — ובדקו שקיבלתם אותם 14 יום מראש.
2. אם אתם צריכים מתורגמן לאמהרית — בקשו בכתב, מראש.
3. רכזו מראש: אבחונים, דוחות טיפוליים, הערכות, בדיקות שמיעה וראייה עדכניות (נדרשות בהפניה ראשונה).
4. כתבו מראש שלוש-חמש נקודות שאתם רוצים שייאמרו — ובקשו שיירשמו בפרוטוקול.
5. שאלו במפורש: מהי רמת התפקוד שנקבעה? מהו היקף הסל? האם יש לנו זכות בחירת מסגרת?
6. אל תחתמו על ויתור על נוכחות אלא אם אתם באמת מבינים על מה אתם מוותרים.
7. סמנו ביומן את היום שבו קיבלתם את ההחלטה בכתב — ואת היום ה-21 אחריו.

## אם אתם מרגישים שהיחס אליכם היה שונה

תחושה של הורים שהם לא נשמעו, שדיברו מעל ראשם, או שההחלטה הייתה סגורה מראש — היא תחושה מוכרת ולגיטימית, ויש לה מסלולי טיפול. הליך ההשגה הוא המסלול הפורמלי לתקוף את ההחלטה עצמה. אם מדובר ביחס מפלה ולא רק בהחלטה שגויה — ראו את [המדריך לאפליה ברישום לבית ספר](/he/education/registration-discrimination) ואת [זכויות ההורה בבית הספר](/he/education/parent-rights), ואפשר לפנות ל[טבקה](https://www.tebeka.org.il) בטלפון 072-2424622.

> **הבהרה משפטית:** המידע כאן כללי ואינו ייעוץ משפטי. בדיקת ההשגה באשף שלמטה מבוססת על לשון החוק והנחיות משרד החינוך בלבד, ואינה קביעה מחייבת. נהלים ותאריכים משתנים — אמתו מול הוועדה ומול המחוז.

## מקורות

- [חוק חינוך מיוחד, התשמ"ח-1988 — נוסח מלא (נבו)](https://www.nevo.co.il/law_html/law00/71999.htm)
- [משרד החינוך — יישום תיקון 11 לחוק החינוך המיוחד, דפי מידע להורים (PDF)](https://meyda.education.gov.il/files/special/lows/parentsinformationtashaf.pdf)
- [מדריך למימוש זכויות מתוקף חוק חינוך מיוחד — gov.il](https://www.gov.il/he/pages/guide_rights_committees_special_ed_law)
- [חוזר מנכ"ל 0287 — יישום חוק החינוך המיוחד, ועדות מתוקף חוק](https://apps.education.gov.il/mankal/horaa.aspx?siduri=385)
- [השגה על החלטות בעניין זכאות ילד לשירותי חינוך מיוחד — gov.il](https://www.gov.il/he/departments/general/special_education_appeals)
- [ועדת זכאות ואפיון — פורטל ההורים של משרד החינוך](https://parents.education.gov.il/prhnet/special-education/committees/entitelment-committee)
- [ועדת זכאות ואפיון לשירותי חינוך מיוחדים — כל-זכות](https://www.kolzchut.org.il/he/%D7%95%D7%A2%D7%93%D7%AA_%D7%96%D7%9B%D7%90%D7%95%D7%AA_%D7%95%D7%90%D7%A4%D7%99%D7%95%D7%9F_%D7%9C%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99_%D7%97%D7%99%D7%A0%D7%95%D7%9A_%D7%9E%D7%99%D7%95%D7%97%D7%93%D7%99%D7%9D)
- [ועדת שיבוץ לחינוך המיוחד — כל-זכות](https://www.kolzchut.org.il/he/%D7%95%D7%A2%D7%93%D7%AA_%D7%A9%D7%99%D7%91%D7%95%D7%A5_%D7%9C%D7%97%D7%99%D7%A0%D7%95%D7%9A_%D7%94%D7%9E%D7%99%D7%95%D7%97%D7%93)
`,
      en: `## First — the name changed, and so did the balance of power

Many parents still get a call from school saying "your child is being referred to a placement committee" (ועדת השמה). That body no longer exists under that name. **Amendment 11 to the Special Education Law, 5778-2018** renamed the committees and shifted the decision:

| Old name | Name today |
| --- | --- |
| Placement committee / integration committee | **Eligibility and characterization committee** (ועדת זכאות ואפיון) |
| Appeals committee (ערר) | **Objection committee** (ועדת השגה) |

The principle the Ministry of Education states in its own parent booklet: **"special education is a service, not a place."** The committee no longer *places* the child. It determines that the child is **entitled** to special education services and at what **scope** — and you choose the type of framework.

## Three different bodies — do not confuse them

1. **Multi-professional team (צוות רב-מקצועי)** — convenes at the kindergarten or school itself, chaired by the principal, with the homeroom teacher, a psychologist or counsellor, a special-education teacher — and you, the parents (section 20d). It handles support from the institutional integration budget and builds the individual programme.
2. **Eligibility and characterization committee** — convenes at the local authority where the child is registered. It determines entitlement, function level and the scope of the service basket.
3. **Placement committee (ועדת שיבוץ)** — run by the local authority. *After* entitlement is set and you have chosen a framework type, it decides which specific institution, based on available places, travel distance and class composition. **Parents are not invited to it** — so name your preferred institution during the eligibility committee and ask for it to be recorded in the protocol.

## What the committee decides — and what it does not

Per **section 7(a)**, it determines exactly three things: **entitlement** to special education services; the child's **function level** (academic, language/communication, social, emotional, personal autonomy); and the **scope of the service basket**.

It does **not** decide which school the child attends (that is the placement committee), and it does **not** decide the actual mix of support — how many teaching hours, how much therapy, how much aide time. The school's multi-professional team sets that with you.

## The central right: you choose the type of framework

**Section 7(b)** requires the committee to give you **written information** about the services available in each of three options: a regular kindergarten/class in a mainstream institution; a special-education class inside a mainstream institution; or a special-education kindergarten/school.

**Then you choose.** Section 7(b)(2): the parents choose the framework and notify the committee **within 14 days**.

Three caveats worth knowing:

- If you do **not** notify within 14 days, the choice passes to the committee, which gives preference to integration in mainstream education.
- Certain combinations of disability type and function level carry no choice under the law and directives. Ask the chair explicitly: "in my child's case, do we have a right of choice?" — and ask for the answer to go in the protocol.
- Where there is a **substantial concern** that the framework you chose would cause real harm to the child or others, the question of your right to choose is referred to the head of the Special Education Division at the Ministry. That decision, too, can be objected to.

## Your rights inside the hearing

- **To be invited and present.** The committee must invite you and the student and let you — or your representative — present your arguments (section 9(b)(3)).
- **To bring people of your choosing.** An escort, a lawyer, a private professional, an organisation's representative, a family member. No permission needed.
- **To receive all documents in advance** — at least **14 days** before the hearing. If you did not, ask in writing and ask to postpone.
- **To submit your own material.** Assessments, therapy reports, private opinions, a free-form letter. The parent questionnaire is not mandatory.
- **To speak privately.** You and the student may ask to address the committee members alone, without the other invitees.
- **To interpretation and accessibility — a stronger right than most parents assume.** Ministry circular 0287, "Implementing the Special Education Law — statutory committees", provides that where a hearing involves parents with a disability, **parents who do not speak Hebrew**, or parents who need the process mediated, the chair shall arrange the required accessibility **in advance** — including reading the documents aloud, **translation into a language the parents understand**, and mediation. **If the accessibility was not provided, a new date shall be set** and the hearing held with it — and that postponement **does not count towards the limit on postponements**. So if you arrived and there was no interpreter, you may ask for the hearing to be rescheduled, and it will not be held against you. Give notice in advance and in writing.
- **To bring your own interpreter to the objection committee.** The same circular provides that the student and parents may bring experts or other people of their own to the objection hearing, including a lawyer, "**and an interpreter of their own**".
- **To know who is across the table.** Six members (section 6(a)): a Ministry representative as chair, a local-authority representative, an educational psychologist, a special-education inspector, a mainstream-education inspector — and a **parent representative**, themselves a parent of a child with a disability, appointed by the Minister. You may contact the regional parent-representative coordinator and meet them before the hearing.
- **To a written protocol and decision** — within **14 days** (section 9(c)(2)). Without the protocol there is nothing to object to.

## The annual timetable

- **Referral: by 31 March** each year. If the child is mid-assessment, provide confirmation of that by the same date.
- **Hearings** run from 1 November to 15 May of that school year, save exceptional cases.
- **Who may refer** (section 8): the parents, the student, the multi-professional team, a recognised educational institution, the local authority, a public organisation, or an authorised body. **Parents may approach the committee at any stage** — you are not dependent on the school.
- **The decision is valid for three years**, with a review hearing every three years (section 10(a)). An earlier review may be requested once a year has passed.

## Especially important: language and absorption difficulties are not grounds for referral

This may be the most important line on this page. Ministry circular 0287 provides expressly that a new-immigrant student in their first year after aliyah shall be referred to a multi-professional team discussion **only** where the referring party holds current, admissible documents evidencing a disability — **and not on the basis of absorption and language difficulties alone**.

In other words: a child who struggles with Hebrew, arrived recently, or is having trouble settling in should not be referred for that reason. A referral requires an admissible document of a diagnosed disability.

This is not theoretical. A 2022 Knesset Research Center document found that 17.2% of Ethiopian-Israeli pupils are entitled to special education services, against 12% among pupils generally — and that over the preceding four years the share of Ethiopian-Israeli pupils integrated into mainstream education had fallen considerably.

So if your child has been referred, ask explicitly, and ask for the answer to be recorded in the protocol: **on the basis of which diagnostic document was this referral made?** If the answer concerns Hebrew, adjustment or behaviour alone — cite the circular's provision.

## How to file an objection (השגה)

**Who may file** (section 13(a)): the student, a parent, or a public organisation's representative.

**By when: 21 days** from receiving the decision **in writing**. The clock runs from written receipt, not from the hearing date.

**Against what**: the decision in whole or in part — you may contest only the function level, or only the basket scope.

**Who hears it**: a **district** objection committee chaired by the Ministry's district director or their delegate (section 12(b)), alongside a district educational psychologist, a special-education inspector, a mainstream-education inspector, a parent of a child with special needs, and a public-organisation representative. **You may bring your own representatives.**

**What it may decide** (section 13(b)): accept the objection and change the decision, return the matter to the eligibility committee for re-hearing, or reject it.

**By when**: 21 days (section 13(c)).

**How, in practice**: through the Ministry of Education — see the [gov.il objections page](https://www.gov.il/he/departments/general/special_education_appeals) and the parents' portal. File **in writing, with reasons**, attaching every relevant document, including new material the first committee did not see. Ask for confirmation of receipt and keep a copy.

**A multi-professional team decision** may also be objected to, within 21 days of receiving it in writing; that objection is heard by an objection committee sitting as an eligibility and characterization committee.

## Walking in prepared

1. Ask in writing for all committee documents — check they arrived 14 days ahead.
2. If you need an Amharic interpreter, request one in writing, in advance.
3. Gather assessments, therapy reports, evaluations, and current hearing and vision tests (required on a first referral).
4. Write down three to five points you want said — and ask for them to be recorded.
5. Ask explicitly: what function level was set? what is the basket scope? do we have a right of framework choice?
6. Do not sign a waiver of attendance unless you understand what you are waiving.
7. Diary the date you received the written decision — and day 21 after it.

## If you felt you were treated differently

Feeling unheard, talked over, or that the decision was made in advance is a familiar and legitimate experience, and there are routes for it. The objection procedure is the formal way to challenge the decision itself. Where the issue is discriminatory treatment rather than a wrong decision — see the [school registration discrimination guide](/en/education/registration-discrimination) and [parent rights at school](/en/education/parent-rights), and you can contact [Tebeka](https://www.tebeka.org.il) at 072-2424622.

> **Legal note:** general information, not legal advice. The check below follows the statute and the Ministry's directives only and is not a binding determination. Procedures and dates change — verify with the committee and the district.

## Sources

- [Special Education Law, 5748-1988 — full text (Nevo, Hebrew)](https://www.nevo.co.il/law_html/law00/71999.htm)
- [Ministry of Education — implementing Amendment 11, parent information pages (PDF, Hebrew)](https://meyda.education.gov.il/files/special/lows/parentsinformationtashaf.pdf)
- [Guide to exercising rights under the Special Education Law — gov.il](https://www.gov.il/he/pages/guide_rights_committees_special_ed_law)
- [Ministry circular 0287 — implementing the Special Education Law, statutory committees (Hebrew)](https://apps.education.gov.il/mankal/horaa.aspx?siduri=385)
- [Objections on special-education entitlement decisions — gov.il](https://www.gov.il/he/departments/general/special_education_appeals)
- [Eligibility and characterization committee — Ministry of Education parents' portal](https://parents.education.gov.il/prhnet/special-education/committees/entitelment-committee)
`,
      am: `## በመጀመሪያ — ስሙ ተቀይሯል፣ ከሱም ጋር ትርጉሙ

ብዙ ወላጆች ከትምህርት ቤት ስልክ ደውሎላቸው "ልጅዎ ወደ ኮሚቴ (ועדת השמה) እየተላከ ነው" ይባላሉ። ያ ስም በሕግ ውስጥ የለም። **የልዩ ትምህርት ሕግ ማሻሻያ ቁጥር 11 (2018)** ስሞቹንም ሆነ የውሳኔውን ሚዛን ቀይሯል፦

- የቀድሞ "ועדת השמה" → ዛሬ **ועדת זכאות ואפיון** (የብቁነትና የአፈጻጸም ኮሚቴ)
- የቀድሞ "ועדת ערר" → ዛሬ **ועדת השגה** (የአቤቱታ ኮሚቴ)

የትምህርት ሚኒስቴር ራሱ በወላጆች መረጃ ገጾቹ ላይ የሚያስቀምጠው መርህ፦ **"ልዩ ትምህርት — አገልግሎት እንጂ ቦታ አይደለም።"** ኮሚቴው ልጁን ወደ አንድ ቦታ አይመድብም። ልጁ ለልዩ ትምህርት አገልግሎቶች **ብቁ** መሆኑንና በምን ያህል **መጠን** እንደሆነ ይወስናል — **የማዕቀፉን ዓይነት ግን እናንተ ትመርጣላችሁ።**

## ሦስት የተለያዩ አካላት

1. **ባለብዙ-ሙያ ቡድን (צוות רב-מקצועי)** — በትምህርት ቤቱ ወይም በሕፃናት ማቆያው ውስጥ ይሰበሰባል፤ ሊቀመንበሩ የተቋሙ ኃላፊ ነው፣ እናንተም ወላጆች አባል ናችሁ (አንቀጽ 20ד)።
2. **የብቁነትና የአፈጻጸም ኮሚቴ** — ልጁ በተመዘገበበት **የአካባቢው ማዘጋጃ ቤት** ይሰበሰባል። ብቁነትን፣ የአፈጻጸም ደረጃንና የአገልግሎት ቅርጫቱን መጠን ይወስናል።
3. **የምደባ ኮሚቴ (ועדת שיבוץ)** — የማዘጋጃ ቤቱ ነው። ብቁነቱ ከተወሰነና እናንተ ማዕቀፍ ከመረጣችሁ **በኋላ**፣ የትኛው ተቋም እንደሚሆን ይወስናል። **ወላጆች ወደዚህ ኮሚቴ አይጋበዙም** — ስለዚህ የምትመርጡትን ተቋም ስም በብቁነት ኮሚቴው ውስጥ ተናገሩና በቃለ ጉባኤው እንዲመዘገብ ጠይቁ።

## ኮሚቴው የሚወስነው

በ**አንቀጽ 7(א)** መሠረት ሦስት ነገሮችን ብቻ፦ **ብቁነት**፣ የልጁ **የአፈጻጸም ደረጃ**፣ እና **የአገልግሎት ቅርጫቱ መጠን**።

የትኛው ትምህርት ቤት እንደሚሆን **አይወስንም**፤ የድጋፎቹን ስብጥር (ስንት የማስተማሪያ ሰዓት፣ ስንት ሕክምና፣ ስንት ረዳት) **አይወስንም** — ያንን በትምህርት ቤቱ ያለው ባለብዙ-ሙያ ቡድን ከእናንተ ጋር ይወስናል።

## ዋናው መብት፦ ማዕቀፉን እናንተ ትመርጣላችሁ

**አንቀጽ 7(ב)** ኮሚቴው ስለ ሦስቱ አማራጮች **የጽሑፍ መረጃ** እንዲሰጣችሁ ያስገድዳል፦ (1) በመደበኛ ተቋም ውስጥ መደበኛ ክፍል፤ (2) በመደበኛ ተቋም ውስጥ የልዩ ትምህርት ክፍል፤ (3) የልዩ ትምህርት ትምህርት ቤት።

**ከዚያም እናንተ ትመርጣላችሁ።** አንቀጽ 7(ב)(2)፦ ወላጆች ማዕቀፉን መርጠው **በ14 ቀናት ውስጥ** ማሳወቅ አለባቸው።

በ14 ቀናት ውስጥ ካላሳወቃችሁ፣ የመምረጥ ሥልጣኑ ወደ ኮሚቴው ይተላለፋል። እንዲሁም በአንዳንድ የአካል ጉዳት ዓይነትና የአፈጻጸም ደረጃ ጥምረቶች የመምረጥ መብት የለም — ሊቀመንበሩን በግልጽ ጠይቁ፦ "በልጄ ሁኔታ የመምረጥ መብት አለን?"

## በስብሰባው ውስጥ ያሏችሁ መብቶች

- **መጋበዝና መገኘት** — ኮሚቴው እናንተንና ተማሪውን መጋበዝና ክርክራችሁን እንድታሰሙ መፍቀድ አለበት (አንቀጽ 9(ב)(3))።
- **የራሳችሁን ሰዎች ማምጣት** — አጃቢ፣ ጠበቃ፣ የግል ባለሙያ፣ የድርጅት ተወካይ ወይም የቤተሰብ አባል። ፈቃድ አያስፈልግም።
- **ሁሉንም ሰነዶች አስቀድሞ መቀበል** — ስብሰባው **ቢያንስ 14 ቀናት** በፊት።
- **የራሳችሁን ሰነዶች ማቅረብ** — ምርመራዎች፣ የሕክምና ሪፖርቶች፣ የግል የባለሙያ አስተያየቶች፣ ወይም በራሳችሁ ቃል የተጻፈ ደብዳቤ።
- **በተናጠል መናገር** — ሌሎቹ ተጋባዦች ሳይኖሩ ለኮሚቴው አባላት ብቻ መናገር መጠየቅ ትችላላችሁ።
- **ትርጉምና ተደራሽነት — ብዙ ወላጆች ከሚገምቱት የበለጠ ጠንካራ መብት ነው።** የሚኒስቴሩ ሰርኩላር 0287 ይደነግጋል፦ የአካል ጉዳት ያለባቸው ወላጆች፣ **ዕብራይስጥ የማይናገሩ ወላጆች**፣ ወይም ሂደቱ እንዲተረጎምላቸው የሚያስፈልጋቸው ወላጆች በሚሳተፉበት ስብሰባ ላይ ሊቀመንበሩ **አስቀድሞ** የሚያስፈልገውን ተደራሽነት ማዘጋጀት አለበት — ሰነዶቹን ጮክ ብሎ ማንበብን፣ **ወላጆች ወደሚረዱት ቋንቋ መተርጎምን** እና ሽምግልናን ጨምሮ። **ተደራሽነቱ ካልተሰጠ አዲስ ቀን ይወሰናል**፣ እና ይህ መዘግየት **በመዘግየቶች ቁጥር ውስጥ አይካተትም**። ስለዚህ ደርሳችሁ አስተርጓሚ ካልነበረ፣ ስብሰባው እንዲተላለፍ መጠየቅ ትችላላችሁ። አስቀድማችሁ በጽሑፍ አሳውቁ።
- **ወደ አቤቱታ ኮሚቴው የራሳችሁን አስተርጓሚ ማምጣት።** ተመሳሳዩ ሰርኩላር ተማሪውና ወላጆች ወደ አቤቱታ ስብሰባው ባለሙያዎችን ወይም ሌሎች ሰዎችን — ጠበቃንም ጨምሮ — "**እንዲሁም የራሳቸውን አስተርጓሚ**" ማምጣት እንደሚችሉ ይደነግጋል።
- **ማን እንደተቀመጠ ማወቅ** — ስድስት አባላት (አንቀጽ 6(א))፣ ከእነሱም አንዱ ራሱ የአካል ጉዳተኛ ልጅ ወላጅ የሆነ **የወላጆች ተወካይ** ነው። ከስብሰባው በፊት ልታገኙት ትችላላችሁ።
- **ቃለ ጉባኤና ውሳኔ በጽሑፍ መቀበል** — በ**14 ቀናት** ውስጥ (አንቀጽ 9(ג)(2))። ያለ ቃለ ጉባኤ አቤቱታ ማቅረብ አይቻልም።

## ዓመታዊ የጊዜ ሰሌዳ

- **ወደ ኮሚቴው መላክ፦ እስከ መጋቢት 31** ድረስ በየዓመቱ።
- **ስብሰባዎቹ** ከኅዳር 1 እስከ ግንቦት 15 ይካሄዳሉ።
- **ወላጆች በማንኛውም ደረጃ ወደ ኮሚቴው መቅረብ ይችላሉ** — በትምህርት ቤቱ ላይ ጥገኛ አይደላችሁም (አንቀጽ 8)።
- **ውሳኔው ለሦስት ዓመታት ይሠራል**፤ በየሦስት ዓመቱ ዳግም ውይይት ይካሄዳል (አንቀጽ 10(א))።

## በተለይ አስፈላጊ፦ የቋንቋና የመቀላቀል ችግሮች ለመላክ ምክንያት አይደሉም

ይህ በዚህ ገጽ ላይ ካሉት ሁሉ በጣም አስፈላጊው መስመር ሊሆን ይችላል። የሚኒስቴሩ ሰርኩላር 0287 በግልጽ ይደነግጋል፦ አዲስ የመጣ ተማሪ በመጀመሪያው ዓመቱ ወደ ባለብዙ-ሙያ ቡድን ውይይት የሚላከው የአካል ጉዳቱን የሚያረጋግጡ ወቅታዊና ተቀባይነት ያላቸው ሰነዶች ሲኖሩ ብቻ ነው — **በመቀላቀልና በቋንቋ ችግሮች ምክንያት ብቻ አይደለም**።

በሌላ አነጋገር፦ በዕብራይስጥ የሚቸገር፣ በቅርቡ የመጣ፣ ወይም ለመላመድ የሚቸገር ልጅ በዚህ ምክንያት መላክ የለበትም። መላክ የአካል ጉዳት ምርመራ ተቀባይነት ያለው ሰነድ ይጠይቃል።

ይህ ንድፈ ሐሳባዊ አይደለም። የ2022 የክነሴት ምርምር ማዕከል ሰነድ ከኢትዮጵያ ተወላጅ ተማሪዎች 17.2% ለልዩ ትምህርት አገልግሎቶች ብቁ እንደሆኑ አግኝቷል — በአጠቃላይ ካሉት ተማሪዎች ካለው 12% ጋር ሲነጻጸር።

ስለዚህ ልጅዎ ከተላከ በግልጽ ይጠይቁ፣ መልሱም በቃለ ጉባኤው እንዲመዘገብ ይጠይቁ፦ **ይህ መላክ የተደረገው በየትኛው የምርመራ ሰነድ መሠረት ነው?** መልሱ ስለ ዕብራይስጥ፣ ስለ መላመድ ወይም ስለ ባህሪ ብቻ ከሆነ — የሰርኩላሩን ድንጋጌ ይጥቀሱ።

## አቤቱታ (השגה) እንዴት ማቅረብ ይቻላል

- **ማን** (አንቀጽ 13(א))፦ ተማሪው፣ ወላጅ፣ ወይም የሕዝብ ድርጅት ተወካይ።
- **በስንት ጊዜ፦ 21 ቀናት** ውሳኔውን **በጽሑፍ** ከተቀበሉበት ቀን ጀምሮ። ሰዓቱ የሚጀምረው ከስብሰባው ቀን ሳይሆን ጽሑፉን ከተቀበላችሁበት ቀን ነው።
- **በምን ላይ**፦ በሙሉ ውሳኔው ወይም በከፊሉ ላይ።
- **ማን ይሰማዋል**፦ በትምህርት ሚኒስቴር የአውራጃ ኃላፊ የሚመራ **የአውራጃ የአቤቱታ ኮሚቴ** (አንቀጽ 12(ב))። **የራሳችሁን ተወካዮች ማምጣት ትችላላችሁ።**
- **ምን ሊወስን ይችላል** (አንቀጽ 13(ב))፦ አቤቱታውን ተቀብሎ ውሳኔውን መለወጥ፣ ጉዳዩን ወደ ብቁነት ኮሚቴው ለዳግም ውይይት መመለስ፣ ወይም አቤቱታውን ውድቅ ማድረግ።
- **በስንት ጊዜ ይወስናል**፦ 21 ቀናት (አንቀጽ 13(ג))።
- **በተግባር እንዴት**፦ በትምህርት ሚኒስቴር በኩል — [የ-gov.il የአቤቱታ ገጽ](https://www.gov.il/he/departments/general/special_education_appeals)። **በጽሑፍና በምክንያት** አቅርቡ፣ ሁሉንም ሰነዶች አያይዙ፣ የደረሰኝ ማረጋገጫ ጠይቁና ቅጂ ያዙ።

**የባለብዙ-ሙያ ቡድኑ ውሳኔም** በ21 ቀናት ውስጥ አቤቱታ ሊቀርብበት ይችላል።

## ተዘጋጅታችሁ ለመግባት

1. ሁሉንም የኮሚቴ ሰነዶች በጽሑፍ ጠይቁ — 14 ቀናት አስቀድመው መድረሳቸውን አረጋግጡ።
2. የአማርኛ አስተርጓሚ የሚያስፈልጋችሁ ከሆነ — አስቀድማችሁ በጽሑፍ ጠይቁ።
3. ምርመራዎችን፣ ሪፖርቶችንና ወቅታዊ የመስማትና የማየት ምርመራዎችን አሰባስቡ።
4. ሊነገሩ የምትፈልጓቸውን ከሦስት እስከ አምስት ነጥቦች አስቀድማችሁ ጻፉ — በቃለ ጉባኤው እንዲመዘገቡ ጠይቁ።
5. የተቀበላችሁበትን የጽሑፍ ውሳኔ ቀንና ከዚያ በኋላ ያለውን 21ኛ ቀን በቀን መቁጠሪያ ምልክት አድርጉ።

## የተለየ አያያዝ እንደተደረገባችሁ ከተሰማችሁ

ያልተደመጣችሁ መስሎ መሰማት የተለመደና ትክክለኛ ስሜት ነው፣ መንገዶችም አሉት። አድሎ ከሆነ — [የትምህርት ቤት ምዝገባ አድሎ መመሪያ](/am/education/registration-discrimination) እና [በትምህርት ቤት ውስጥ የወላጅ መብቶች](/am/education/parent-rights) ይመልከቱ፣ ወይም [ቴቤካን](https://www.tebeka.org.il) በ072-2424622 ያነጋግሩ።

> **የሕግ ማስታወሻ፦** ይህ አጠቃላይ መረጃ ነው፣ የሕግ ምክር አይደለም። ከታች ያለው ምርመራ በሕጉና በሚኒስቴሩ መመሪያዎች ላይ ብቻ የተመሠረተ ሲሆን አስገዳጅ ውሳኔ አይደለም።

## ምንጮች

- [የልዩ ትምህርት ሕግ 1988 — ሙሉ ጽሑፍ (ነቮ፣ በዕብራይስጥ)](https://www.nevo.co.il/law_html/law00/71999.htm)
- [የሚኒስቴሩ ሰርኩላር 0287 — የልዩ ትምህርት ሕግ ትግበራ፣ በሕግ የተቋቋሙ ኮሚቴዎች](https://apps.education.gov.il/mankal/horaa.aspx?siduri=385)
- [የትምህርት ሚኒስቴር — ማሻሻያ 11 ትግበራ፣ ለወላጆች የመረጃ ገጾች (PDF)](https://meyda.education.gov.il/files/special/lows/parentsinformationtashaf.pdf)
- [በልዩ ትምህርት ብቁነት ውሳኔዎች ላይ አቤቱታ — gov.il](https://www.gov.il/he/departments/general/special_education_appeals)

*[⚠️ የAI ትርጉም — ይህ ሕጋዊ ርዕስ ነው። ከመታተሙ በፊት በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግመው እንመክራለን።]*`,
    },
    wizard: {
      questions: [
        {
          id: "decisionInWriting",
          type: "boolean",
          label: {
            he: "האם קיבלתם את החלטת הוועדה בכתב (פרוטוקול או הודעת החלטה)?",
            en: "Have you received the committee's decision in writing (protocol or decision notice)?",
            am: "የኮሚቴውን ውሳኔ በጽሑፍ ተቀብለዋል (ቃለ ጉባኤ ወይም የውሳኔ ማስታወቂያ)?",
          },
        },
        {
          id: "decidingBody",
          type: "radio",
          label: {
            he: "איזה גוף קיבל את ההחלטה שאתם רוצים להשיג עליה?",
            en: "Which body made the decision you want to object to?",
            am: "አቤቱታ ማቅረብ የምትፈልጉበትን ውሳኔ የወሰነው የትኛው አካል ነው?",
          },
          options: [
            {
              value: "eligibility-committee",
              label: {
                he: "ועדת זכאות ואפיון (לשעבר ועדת השמה) — ברשות המקומית",
                en: "Eligibility and characterization committee (formerly the placement committee) — at the local authority",
                am: "የብቁነትና የአፈጻጸም ኮሚቴ (የቀድሞው ועדת השמה) — በማዘጋጃ ቤቱ",
              },
            },
            {
              value: "multi-professional-team",
              label: {
                he: "צוות רב-מקצועי — בגן או בבית הספר",
                en: "Multi-professional team — at the kindergarten or school",
                am: "ባለብዙ-ሙያ ቡድን — በሕፃናት ማቆያ ወይም በትምህርት ቤት",
              },
            },
            {
              value: "placement-committee",
              label: {
                he: "ועדת שיבוץ — הקצאת מוסד ספציפי על ידי הרשות המקומית",
                en: "Placement committee — assignment to a specific institution by the local authority",
                am: "የምደባ ኮሚቴ — በማዘጋጃ ቤቱ ወደ አንድ የተወሰነ ተቋም መመደብ",
              },
            },
          ],
        },
        {
          id: "filedBy",
          type: "radio",
          label: {
            he: "מי מגיש את ההשגה?",
            en: "Who is filing the objection?",
            am: "አቤቱታውን የሚያቀርበው ማን ነው?",
          },
          options: [
            {
              value: "parent",
              label: {
                he: "הורה או אפוטרופוס של התלמיד",
                en: "A parent or the student's guardian",
                am: "የተማሪው ወላጅ ወይም አሳዳጊ",
              },
            },
            {
              value: "student",
              label: { he: "התלמיד עצמו", en: "The student themselves", am: "ተማሪው ራሱ" },
            },
            {
              value: "public-organisation",
              label: {
                he: "נציג של ארגון ציבורי",
                en: "A public organisation's representative",
                am: "የሕዝብ ድርጅት ተወካይ",
              },
            },
            {
              value: "other",
              label: {
                he: "גורם אחר (שכן, מורה פרטי, מכר של המשפחה)",
                en: "Someone else (a neighbour, a private tutor, a family acquaintance)",
                am: "ሌላ ሰው (ጎረቤት፣ የግል አስተማሪ፣ የቤተሰብ ወዳጅ)",
              },
            },
          ],
        },
        {
          id: "within21Days",
          type: "boolean",
          label: {
            he: "האם עברו פחות מ-21 ימים מהיום שבו קיבלתם את ההחלטה בכתב?",
            en: "Have fewer than 21 days passed since you received the decision in writing?",
            am: "ውሳኔውን በጽሑፍ ከተቀበሉበት ቀን ጀምሮ ከ21 ቀናት ያነሰ አልፏል?",
          },
        },
      ],
      rules: [
        {
          kind: "require-true",
          questionId: "decisionInWriting",
          reason: {
            he: "מניין 21 הימים להשגה מתחיל מקבלת ההחלטה בכתב (סעיף 13(א) לחוק). הוועדה חייבת למסור לכם פרוטוקול והחלטה תוך 14 ימים (סעיף 9(ג)(2)) — דרשו אותם בכתב מיושב ראש הוועדה או מהרשות המקומית לפני שתגישו.",
            en: "The 21-day objection clock runs from receiving the decision in writing (section 13(a)). The committee must give you the protocol and decision within 14 days (section 9(c)(2)) — request them in writing from the chair or the local authority before filing.",
            am: "የ21 ቀናት ጊዜ የሚጀምረው ውሳኔውን በጽሑፍ ከተቀበሉበት ነው (አንቀጽ 13(א))። ኮሚቴው ቃለ ጉባኤውንና ውሳኔውን በ14 ቀናት ውስጥ መስጠት አለበት (አንቀጽ 9(ג)(2)) — ከማቅረብዎ በፊት በጽሑፍ ይጠይቁ።",
          },
        },
        {
          kind: "require-not",
          questionId: "decidingBody",
          values: ["placement-committee"],
          reason: {
            he: "ההשגה לפי סעיף 13 לחוק היא על החלטת ועדת זכאות ואפיון (וכן על החלטת צוות רב-מקצועי, לפי הנחיות משרד החינוך). שיבוץ למוסד ספציפי נקבע בוועדת שיבוץ של הרשות המקומית, שאינה פועלת במסלול הזה — פנו למחלקת החינוך ברשות ולמפקח/ת הכולל/ת במחוז, ובקשו את נימוקי השיבוץ בכתב.",
            en: "The section 13 objection covers eligibility-committee decisions (and, per the Ministry's directives, multi-professional-team decisions). Assignment to a specific institution is made by the local authority's placement committee, which is outside this track — approach the authority's education department and the district inspector, and ask for the placement reasoning in writing.",
            am: "በአንቀጽ 13 መሠረት ያለው አቤቱታ የብቁነት ኮሚቴውን (እንዲሁም የባለብዙ-ሙያ ቡድኑን) ውሳኔ ይመለከታል። ወደ አንድ የተወሰነ ተቋም መመደብ በማዘጋጃ ቤቱ የምደባ ኮሚቴ ይወሰናል፣ ይህም ከዚህ መንገድ ውጭ ነው — የማዘጋጃ ቤቱን የትምህርት ክፍልና የአውራጃውን ተቆጣጣሪ ያነጋግሩ።",
          },
        },
        {
          kind: "require-not",
          questionId: "filedBy",
          values: ["other"],
          reason: {
            he: "סעיף 13(א) לחוק מקנה את זכות ההשגה לתלמיד, להורה ולנציג של ארגון ציבורי בלבד. מי שאינו אחד מאלה יכול ללוות אתכם לדיון ולסייע בהכנת המסמכים — אך ההשגה עצמה צריכה להיות מוגשת על ידי ההורה, התלמיד או ארגון ציבורי.",
            en: "Section 13(a) grants the right to object to the student, a parent, and a public organisation's representative only. Anyone else may accompany you to the hearing and help prepare the material — but the objection itself must be filed by the parent, the student, or a public organisation.",
            am: "አንቀጽ 13(א) የአቤቱታ መብቱን ለተማሪው፣ ለወላጅና ለሕዝብ ድርጅት ተወካይ ብቻ ይሰጣል። ሌላ ሰው ሊያጅብዎና ሰነዶችን ሊያዘጋጅ ይችላል — አቤቱታው ግን በወላጅ፣ በተማሪው ወይም በሕዝብ ድርጅት መቅረብ አለበት።",
          },
        },
        {
          kind: "require-true",
          questionId: "within21Days",
          reason: {
            he: "המועד להגשת השגה הוא 21 ימים מקבלת ההחלטה בכתב (סעיף 13(א) לחוק). אם המועד חלף — עדיין אפשר לבקש דיון חוזר בוועדת זכאות ואפיון (סעיף 10 לחוק מאפשר בקשת דיון חוזר לאחר שחלפה שנה, ובנסיבות מסוימות מוקדם יותר באישור המחוז), ואפשר לפנות למחוז ולהתייעץ עם עורך דין או עם טבקה בטלפון 072-2424622.",
            en: "The deadline for an objection is 21 days from receiving the decision in writing (section 13(a)). If it has passed, you can still request a review hearing at the eligibility committee (section 10 allows a request once a year has passed, and earlier in certain circumstances with district approval), approach the district, and consult a lawyer or Tebeka at 072-2424622.",
            am: "አቤቱታ የማቅረቢያ ጊዜው ውሳኔውን በጽሑፍ ከተቀበሉ 21 ቀናት ነው (አንቀጽ 13(א))። ጊዜው ካለፈ — አሁንም በብቁነት ኮሚቴው ዳግም ውይይት መጠየቅ ይቻላል (አንቀጽ 10)፣ አውራጃውን ማነጋገርና ጠበቃ ወይም ቴቤካን በ072-2424622 ማማከር ይችላሉ።",
          },
        },
      ],
    },
  },
];
