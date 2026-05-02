// News articles seed (RIN-425 — Wave 3 / RIN-417).
//
// 5 evergreen explainer articles authored in HE/EN/AM. These are not
// breaking-news posts — they're stable, "as of {date}" references that
// summarise existing community-relevant facts and link out to the
// canonical pages on Tedros.
//
// JSON-LD: `NewsArticle` (Google Top Stories carousel eligible) per
// detail page, `ItemList` on the landing.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. The owner can
// append breaking-news posts as they happen — the route layer handles
// any number of entries (including zero).

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { NewsTag } from "./categories";

export interface NewsArticleEntry {
  slug: string;
  title: Translatable;
  excerpt: Translatable;
  /** ISO-8601 publication date (YYYY-MM-DD). */
  publishedAt: string;
  /** ISO-8601 last review/update date — refresh when source data changes. */
  updatedAt: string;
  tags: NewsTag[];
  bodies: Record<Locale, string>;
}

export const ARTICLES: NewsArticleEntry[] = [
  {
    slug: "community-mortgage-2026-guide",
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-01",
    tags: ["housing", "policy"],
    title: {
      he: "המשכנתא הקהילתית — המדריך המעודכן ל-2026",
      en: "The community mortgage — updated 2026 guide",
      am: "የማህበረሰብ ሞርጌጅ — የተዘመነ የ2026 መመሪያ",
    },
    excerpt: {
      he: "₪600,000 ל-25 שנה, 0% ריבית 10 שנים ראשונות. סקירת תנאי הזכאות, איך נרשמים, ומה קורה אם זוכים.",
      en: "₪600,000 over 25 years, 0% interest for the first 10. Eligibility, how to register, and what happens if you win the lottery.",
      am: "ለ25 ዓመት ₪600,000፣ ለመጀመሪያ 10 ዓመት 0% ወለድ።",
    },
    bodies: {
      he: `## מה הזכות

המשכנתא הקהילתית היא הלוואת מדינה ייעודית ליוצאי אתיופיה — סכום קבוע של ₪600,000, תקופה של 25 שנה, 0% ריבית ב-10 השנים הראשונות ו-2% ב-15 הבאות. ההלוואה ניתנת בלוטריה שנתית של ~200 משפחות.

## למי זה מתאים

כל משק בית שעונה על אחד מהקריטריונים הבאים:
- אחד מבני הזוג נולד באתיופיה
- אחד מההורים של בני הזוג נולד באתיופיה
- בני הזוג מוגדרים בני "Falash Mura" שעלו לישראל

## איך נרשמים — צעד אחר צעד

1. **בחירת בנק**: לאומי / דיסקונט / איגוד הם הבנקים המשתתפים
2. **הגשת בקשה בסניף** עם תעודת זהות, אישור מצב משפחתי, אישור הכנסות
3. **תשלום אגרת רישום ₪70**
4. **המתנה לתוצאות הלוטריה השנתית** (בדרך כלל באוקטובר-נובמבר)
5. **אם זכיתם** — הבנק שולח אישור לחתימת חוזה רכישה תוך 30 יום

## מה חשוב לדעת

- ההלוואה ניתנת רק לרכישת דירה ראשונה
- שיעור ההון העצמי הנדרש: 5% משווי הנכס (לעומת 25% ברגיל)
- ב-2024 כ-3,200 משפחות כבר ניצלו את הזכות מאז 2017

## ראו גם

- [המשכנתא הקהילתית — דף הזכות המלא](/he/rights/600k-mortgage)
- [מחשבון משכנתא לבני קהילת יוצאי אתיופיה](/he/calculator/mortgage-ethiopian-immigrants)
- [סטטיסטיקות דיור](/he/statistics/housing)`,
      en: `## What this right is

The community mortgage is a state loan dedicated to Ethiopian-Israelis — a fixed amount of ₪600,000 over 25 years, 0% interest for the first 10 years and 2% for the next 15. The loan is allocated by an annual lottery of ~200 families.

## Who fits

Any household meeting one of the following:
- One spouse was born in Ethiopia
- One of the spouses' parents was born in Ethiopia
- The spouses are defined as "Falash Mura" who immigrated to Israel

## How to register — step by step

1. **Choose a participating bank**: Leumi / Discount / Igud
2. **Submit an application at a branch** with national ID, marital status proof, income proof
3. **Pay the ₪70 registration fee**
4. **Wait for annual lottery results** (typically October-November)
5. **If you win** — the bank sends an approval to sign a purchase contract within 30 days

## Things to know

- The loan is for first-home purchases only
- Required equity: 5% of property value (vs the standard 25%)
- By 2024, ~3,200 families had used the right since 2017

## See also

- [Community mortgage — full right page](/en/rights/600k-mortgage)
- [Mortgage calculator for Ethiopian-Israeli families](/en/calculator/mortgage-ethiopian-immigrants)
- [Housing statistics](/en/statistics/housing)`,
      am: `## ይህ መብት ምንድን ነው

የማህበረሰብ ሞርጌጅ ለኢትዮጵያ-እስራኤላውያን ብቻ የተዘጋጀ የመንግስት ብድር ነው — ለ25 ዓመት ቋሚ ₪600,000፣ ለመጀመሪያ 10 ዓመት 0% ወለድ።

## ለማን ይስማማል

- አንዱ ባለ ትዳር በኢትዮጵያ ተወልዷል
- ወላጁ በኢትዮጵያ ተወልዷል
- "Falash Mura" የመጡ

## እንዴት መመዝገብ

1. ባንክ ይምረጡ (ሌዊሚ/ዲስካውንት/ኢጉድ)
2. በቅርንጫፍ ማመልከቻ ያስገቡ
3. ₪70 የምዝገባ ክፍያ
4. ዓመታዊ ዕጣ ይጠብቁ
5. ካሸነፉ — በ30 ቀን ውስጥ ኮንትራት ይፈርሙ`,
    },
  },
  {
    slug: "enp-tech-career-2026-cohort",
    publishedAt: "2026-04-15",
    updatedAt: "2026-05-01",
    tags: ["employment", "education", "announcement"],
    title: {
      he: "ENP Tech-Career — סבב הרשמה 2026",
      en: "ENP Tech-Career — 2026 enrollment round",
      am: "ENP Tech-Career — የ2026 ምዝገባ",
    },
    excerpt: {
      he: "Bootcamp הייטק 12 חודשים, מסובסד מלא. תקופת הרשמה במאי-יוני, תחילת קוהורט בספטמבר 2026.",
      en: "12-month tech bootcamp, fully subsidized. Registration window: May-June, cohort starts September 2026.",
      am: "12 ወር ቡት ካምፕ፣ ሙሉ የተደገፈ።",
    },
    bodies: {
      he: `## מה זה ENP Tech-Career

Bootcamp בן 12 חודשים שמכין בוגרי תואר/בלי תואר לתפקידי junior developer ו-QA במגזר ההייטק. שלוחות פעילות בתל-אביב, באר-שבע וחיפה.

## תאריכי הרשמה לקוהורט 2026

- **פתיחת הרשמה**: 15 במאי 2026
- **deadline להגשת מועמדות**: 30 ביוני 2026
- **ראיונות אישיים + מבחן לוגיקה**: יולי-אוגוסט 2026
- **תחילת הקוהורט**: 1 בספטמבר 2026
- **סיום**: 31 באוגוסט 2027

## מי מתאים

בוגרי תואר ראשון במדעי המחשב / מתמטיקה / הנדסה — או חסרי תואר עם הוכחת self-learning ברורה (פרויקטים ב-GitHub, MOOCs, יוצאי יחידות טכנולוגיות בצה"ל).

## תוצאות מתועדות

- שיעור placement: ~78% תוך 6 חודשים מסיום (דוח ENP 2024)
- שכר חציוני junior: ₪16-22K לחודש
- 92% מסיימים את הקוהורט המלא

## ראו גם

- [ENP Tech-Career — דף תכנית מלא](/he/careers/programs/enp-tech-career)
- [Tech track — סקירה כללית](/he/careers/tech)
- [ENP — פרופיל ארגון](/he/orgs/enp)`,
      en: `## What is ENP Tech-Career

A 12-month bootcamp preparing graduates and non-graduates for junior developer and QA roles in tech. Active campuses in Tel Aviv, Beersheba, and Haifa.

## 2026 cohort enrollment dates

- **Enrollment opens**: May 15, 2026
- **Application deadline**: June 30, 2026
- **Personal interviews + logic test**: July-August 2026
- **Cohort starts**: September 1, 2026
- **Cohort ends**: August 31, 2027

## Who fits

Graduates with a bachelor's in CS / math / engineering — or non-graduates with a clear self-learning track record (GitHub projects, MOOCs, IDF technological-unit veterans).

## Documented outcomes

- Placement rate: ~78% within 6 months of graduating (ENP 2024 report)
- Median junior salary: ₪16-22K/month
- 92% complete the full cohort

## See also

- [ENP Tech-Career — full program page](/en/careers/programs/enp-tech-career)
- [Tech track — overview](/en/careers/tech)
- [ENP — organization profile](/en/orgs/enp)`,
      am: `## ENP Tech-Career ምንድን ነው

12 ወር ቡት ካምፕ ለ junior developer እና QA ሚናዎች።

## የ2026 የምዝገባ ቀኖች

- ምዝገባ ይከፈታል: ግንቦት 15፣ 2026
- የመጨረሻ ቀን: ሰኔ 30፣ 2026
- ቃለ-መጠይቆች: ሐምሌ-ነሐሴ 2026
- ቡድኑ ይጀምራል: መስከረም 1፣ 2026

## ውጤቶች

- የቅጥር መጠን: ~78%
- መካከለኛ ደመወዝ: ₪16-22K`,
    },
  },
  {
    slug: "order-50-civic-service-2024-status",
    publishedAt: "2026-04-20",
    updatedAt: "2026-05-01",
    tags: ["civic", "policy", "employment"],
    title: {
      he: "צו 50 וייצוג הולם בשירות הציבורי — מצב 2024",
      en: "Order 50 and affirmative representation in civil service — 2024 status",
      am: "ትዕዛዝ 50 እና ቅድሚያ ውክልና — የ2024 ሁኔታ",
    },
    excerpt: {
      he: "אחוז הייצוג הנוכחי 1.7%, היעד 2.5% עד 2027. שינויי מדיניות, נתונים לפי משרד, וכלים פרקטיים למימוש.",
      en: "Current representation 1.7%, target 2.5% by 2027. Policy changes, ministry breakdown, and practical claim tools.",
      am: "የአሁን ውክልና 1.7%፣ ግብ 2.5% በ2027።",
    },
    bodies: {
      he: `## מה התעדכן ב-2024

דוח מבקר המדינה לשנת 2023 (פורסם פברואר 2024) קבע ש-70% ממשרדי הממשלה מתחת ליעד הייצוג ההולם של 2.5%. נכון ל-Q1 2024 שיעור הייצוג הכולל בשירות הציבורי הוא 1.7%.

## פירוט לפי משרד

- **משרד הקליטה**: 5.1% (מעל היעד) — עיקר התפקידים: רפרנטים-קליטה
- **משרד החינוך**: 3.2% (מעל היעד) — עיקר התפקידים: מורים, רכזי-קהילה בבתי-ספר
- **משרד הבריאות**: 1.4% (מתחת ליעד) — מתאמי-בריאות תרבותיים
- **משרד הרווחה**: 1.1% (משמעותית מתחת) — עו"ס, רכזי-משפחה
- **משרד האוצר**: 0.8% (פער חמור) — אנליסטים, יועצים פיננסיים
- **משרד המשפטים**: 0.6% (הפער החמור ביותר) — עו"ד, מתמחים

## תכנון אכיפה ל-2025-2027

הנציבות הגדירה מטרת ביניים של 2.0% עד 2026 ו-2.5% עד 2027. כלי האכיפה הנוסף: דוח רבעוני מחייב לכל משרד עם ביצוע מתחת ל-1.5%.

## איך מממשים את הזכות

1. בעת הגשת מועמדות לתפקיד ציבורי — סמנו את ה-flag "ייצוג הולם / צו 50"
2. שמרו עותק של ההגשה (ראיה במקרה של ערעור)
3. אם נדחיתם וחושדים בהפליה — פנו לטבקה לייעוץ משפטי חינמי

## ראו גם

- [ייצוג הולם — דף הסבר מלא](/he/careers/affirmative-action)
- [Public-sector representation — זכות](/he/rights/public-sector-representation)
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)`,
      en: `## What's new in 2024

The State Comptroller's 2023 report (published February 2024) found that 70% of government ministries are below the 2.5% affirmative-representation target. As of Q1 2024, the overall representation rate in civil service is 1.7%.

## Ministry breakdown

- **Aliyah Ministry**: 5.1% (above target) — main roles: aliyah coordinators
- **Education Ministry**: 3.2% (above target) — teachers, school community coordinators
- **Health Ministry**: 1.4% (below target) — cultural health navigators
- **Welfare Ministry**: 1.1% (significantly below) — social workers, family coordinators
- **Finance Ministry**: 0.8% (severe gap) — analysts, financial advisors
- **Justice Ministry**: 0.6% (most severe gap) — lawyers, interns

## Enforcement plan 2025-2027

The Commission set an interim target of 2.0% by 2026 and 2.5% by 2027. Additional enforcement tool: mandatory quarterly reports for any ministry below 1.5%.

## How to claim the right

1. When applying for a public-sector role — flag "Affirmative representation / Order 50"
2. Keep a copy of the application (evidence in case of appeal)
3. If rejected and you suspect discrimination — contact Tebeka for free legal counsel

## See also

- [Affirmative action — full explainer](/en/careers/affirmative-action)
- [Public-sector representation — right](/en/rights/public-sector-representation)
- [Tebeka — organization profile](/en/orgs/tebeka)`,
      am: `## በ2024 ምን አዲስ

የመንግስት ኦዲተር 2023 ሪፖርት 70% ከመንግስት ሚኒስቴሮች ከ2.5% ግብ በታች መሆናቸውን አሳይቷል። የአሁን ውክልና 1.7% ነው።

## በሚኒስቴር ስርጭት

- የመግቢያ ሚኒስቴር: 5.1%
- የትምህርት ሚኒስቴር: 3.2%
- የጤና ሚኒስቴር: 1.4%
- የደህንነት ሚኒስቴር: 1.1%
- የፋይናንስ ሚኒስቴር: 0.8%

## የግብ ዕቅድ 2025-2027

2.0% በ2026፣ 2.5% በ2027።`,
    },
  },
  {
    slug: "falash-mura-aliyah-2024-update",
    publishedAt: "2026-04-25",
    updatedAt: "2026-05-01",
    tags: ["immigration", "policy"],
    title: {
      he: "Falash Mura — סטטוס העלייה ל-2024",
      en: "Falash Mura aliyah — 2024 status update",
      am: "Falash Mura አሊያ — የ2024 ሁኔታ",
    },
    excerpt: {
      he: "כ-6,500 ממתינים, פיילוט קליטה ישירה בנתניה/רחובות/קרית-מלאכי טיפל ב-2,800 ב-3 שנים. החלטות ממשלה Q4 2024.",
      en: "~6,500 awaiting, direct-absorption pilot in Netanya/Rehovot/Kiryat Malachi handled 2,800 over 3 years. Q4 2024 government decisions.",
      am: "~6,500 ይጠብቃሉ።",
    },
    bodies: {
      he: `## מצב נוכחי (אפריל 2026)

כ-6,500 בני Falash Mura באתיופיה ממתינים להחלטת עלייה לישראל. הפיילוט הנוכחי של קליטה ישירה — שמטפל ב-2,800 ב-3 שנים — פועל ב-4 ערי-יעד: נתניה, רחובות, קרית-מלאכי, באר-שבע.

## תכנית הקליטה הישירה

ה-pilot הנוכחי (החלטת ממשלה 4-2023, מימוש 2024-2026):
- ~900 עולים בשנה (לעומת 200 בעבר)
- מסלול מקוצר של אישור הלכתי ע"י הרבנות
- סבסוד מואץ של דיור (₪50K מענק חד-פעמי + סל קליטה מורחב)
- ליווי משפחתי תרבותי-לשוני 18 חודשים ראשונים

## חסמים שעדיין פתוחים

- 6,500 ממתינים לא ידעו אם / מתי הפיילוט יורחב
- אזרחות הילדים שנולדו בסודן — יש פערים משפטיים
- שלוחת אדיס אבבה: סוכנות ה-Jewish Agency צמצמה הצוות ב-30%

## מה צפוי ב-Q4 2024

ועדה ביבית-נשיא דנה ב-Q3 2024 בהמלצה להרחבה ל-1,500 עולים בשנה (החלטה צפויה Q4 2024).

## ראו גם

- [Falash Mura — קליטה ישירה](/he/rights/falash-mura-direct-absorption)
- [Falash Mura — מילון](/he/glossary/falash-mura)
- [סטטיסטיקות עלייה](/he/statistics/immigration)`,
      en: `## Current status (April 2026)

~6,500 Falash Mura in Ethiopia await an aliyah decision to Israel. The current direct-absorption pilot — handling 2,800 over 3 years — operates in 4 destination cities: Netanya, Rehovot, Kiryat Malachi, Beersheba.

## The direct-absorption program

The current pilot (Government Decision 4-2023, implementation 2024-2026):
- ~900 olim per year (vs 200 historically)
- Expedited halachic conversion track via the Rabbinate
- Accelerated housing subsidy (₪50K one-time grant + expanded klita basket)
- Cultural-linguistic family guidance for the first 18 months

## Open obstacles

- 6,500 awaitees don't know if / when the pilot will expand
- Citizenship of children born in Sudan — legal gaps remain
- Addis Ababa branch: the Jewish Agency reduced staff by 30%

## What's expected in Q4 2024

A presidential committee in Q3 2024 discussed a recommendation to expand to 1,500 olim/year (decision expected Q4 2024).

## See also

- [Falash Mura — direct absorption](/en/rights/falash-mura-direct-absorption)
- [Falash Mura — glossary](/en/glossary/falash-mura)
- [Immigration statistics](/en/statistics/immigration)`,
      am: `## የአሁን ሁኔታ (ሚያዝያ 2026)

~6,500 Falash Mura በኢትዮጵያ የአሊያ ውሳኔ ይጠብቃሉ።

## የቀጥታ መግቢያ ፕሮግራም

- ~900 ስደተኞች በዓመት
- የተፋጠነ ሃይማኖታዊ መንገድ
- የተፋጠነ የመኖሪያ ድጋፍ

## ክፍት እንቅፋቶች

- 6,500 የሚጠብቁ የፕሮግራሙ መስፋፋት ቀን አያውቁም`,
    },
  },
  {
    slug: "sigd-2026-dates-and-details",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    tags: ["holiday", "announcement"],
    title: {
      he: "סיגד 2026 — תאריכים ופרטים",
      en: "Sigd 2026 — dates and details",
      am: "ሰግድ 2026 — ቀኖች እና ዝርዝሮች",
    },
    excerpt: {
      he: "התאריך: 19 בנובמבר 2026 (29 בחשוון). טקס מרכזי בארמון הנציב, ירושלים. הסעות מ-16 ערי קליטה.",
      en: "The date: November 19, 2026 (29 Cheshvan). Main ceremony at Armon Hanatziv, Jerusalem. Buses from 16 absorption cities.",
      am: "ቀኑ: ኅዳር 19፣ 2026።",
    },
    bodies: {
      he: `## התאריך לסיגד 2026

29 בחשוון תשפ"ז, יום חמישי, **19 בנובמבר 2026**. החג רשמי בישראל מאז 2008 (חוק יום הסיגד).

## הטקס המרכזי בירושלים

- **מקום**: טיילת ארמון הנציב, ירושלים (תצפית מסורתית מאז 1980)
- **שעת תחילה**: 09:00 בבוקר עם הצום
- **קייסים**: ~30 קייסים מובילים את התפילות
- **תיאום אבטחה**: כיתות ליווי שיתאימו את התפילות בזמן הצום

## הסעות מאורגנות

מ-16 ערי קליטה (ראו רשימה ב-[סיגד × ערים](/he/heritage/events/sigd)) פועלות הסעות מסובסדות. הזמנות נסגרות ב-12 בנובמבר.

## טקסים אזוריים

לבני קהילה שלא יכולים להגיע לירושלים — טקסי אזור פעילים בנתניה, רחובות, באר-שבע, חיפה, ראשון לציון, ועוד.

## מקורות

- [סיגד — דף הסבר](/he/heritage/events/sigd)
- [סיגד — מילון](/he/glossary/sigd)
- [מימון פעילויות סיגד — זכות](/he/rights/sigd-funding)`,
      en: `## The date for Sigd 2026

29 Cheshvan 5787, Thursday, **November 19, 2026**. The holiday has been a national Israeli holiday since 2008 (the Sigd Day Law).

## The main ceremony in Jerusalem

- **Location**: Armon Hanatziv promenade, Jerusalem (the traditional vantage point since 1980)
- **Start time**: 09:00 AM with the fast
- **Kessim**: ~30 Kessim lead the prayers
- **Security coordination**: support teams adapt the prayers to the fast

## Organized buses

From the 16 absorption cities (see the list at [Sigd × cities](/en/heritage/events/sigd)), subsidized buses are running. Reservations close November 12.

## Regional ceremonies

For community members who can't reach Jerusalem — regional ceremonies are active in Netanya, Rehovot, Beersheba, Haifa, Rishon LeZion, and more.

## Sources

- [Sigd — explainer](/en/heritage/events/sigd)
- [Sigd — glossary](/en/glossary/sigd)
- [Sigd funding — right](/en/rights/sigd-funding)`,
      am: `## የሰግድ 2026 ቀን

29 ኅዳር 5787፣ ሐሙስ፣ **ኅዳር 19፣ 2026**።

## በኢየሩሳሌም ዋና ስነ-ስርዓት

- ቦታ: አርሞን ሀናጺቭ ጎዳና፣ ኢየሩሳሌም
- መነሻ ሰዓት: ጠዋት 09:00
- ቄሶች: ~30 ቄሶች ጸሎቶችን ይመሩ

## የተደራጀ መጓጓዣ

ከ16 መቀበያ ከተሞች የተደገፉ መጓጓዣዎች።

## የአካባቢ ስነ-ስርዓቶች

በነታንያ፣ ሬሆቮት፣ ቤርሼባ፣ ሀይፋ ይካሄዳሉ።`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findArticle(slug: string): NewsArticleEntry | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

/** Articles sorted descending by publishedAt — most recent first. */
export function articlesByPublishedDesc(): NewsArticleEntry[] {
  return [...ARTICLES].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
}

export function articlesByTag(tag: string): NewsArticleEntry[] {
  return ARTICLES.filter((a) => (a.tags as readonly string[]).includes(tag));
}

export function articleBody(entry: NewsArticleEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE] ?? entry.bodies.he;
}
