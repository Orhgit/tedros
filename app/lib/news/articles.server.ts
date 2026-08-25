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
import { ARTICLES_WAVE4 } from "./articles-wave4.server";
import { ARTICLES_WAVE5 } from "./articles-wave5.server";
import { ARTICLES_WAVE6 } from "./articles-wave6.server";
import { ARTICLES_WAVE7A } from "./articles-wave7a.server";
import { ARTICLES_WAVE7B } from "./articles-wave7b.server";
import { ARTICLES_WAVE7C } from "./articles-wave7c.server";
import { ARTICLES_WAVE7D } from "./articles-wave7d.server";
import { ARTICLES_WAVE8 } from "./articles-wave8.server";
import { ARTICLES_WAVE9 } from "./articles-wave9.server";

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
  // ── Wave 4 articles (TED — Content & SEO) ────────────────────────────────
  {
    slug: "mental-health-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["policy", "civic"],
    title: {
      he: "בריאות נפש בקהילת יוצאי אתיופיה — מדריך משאבים 2026",
      en: "Mental health in the Ethiopian-Israeli community — 2026 resource guide",
      am: "በኢትዮጵያ-እስራኤል ማህበረሰብ ውስጥ የአዕምሮ ጤና — የ2026 የሀብት መመሪያ",
    },
    excerpt: {
      he: "637 יוצאי אתיופיה מאושפזים במחלקות פסיכיאטריות — פי 2 מחלקם באוכלוסייה. מה קיים, איך ניגשים, ואיך משיגים עזרה.",
      en: "Ethiopian-Israelis are hospitalized in psychiatric wards at twice their population share. What services exist, how to access them, and where to get help.",
      am: "ኢትዮጵያ-እስራኤላውያን በሕዝብ ውስጥ ካለው ድርሻቸው ሁለት እጥፍ በሆነ ቁጥር በሥነ-አዕምሮ ክፍሎች ውስጥ ይታከማሉ።",
    },
    bodies: {
      he: `## הנתונים: למה בריאות נפש דחופה לקהילה

מחקר של הלשכה המרכזית לסטטיסטיקה (CBS) ב-2023 מצא כי יוצאי אתיופיה מאושפזים בבתי-חולים פסיכיאטריים בשיעור של כ-637 לכל 100,000 — כמעט פי שניים מחלקם היחסי באוכלוסייה הכללית. הפערים אינם רק בנתוני אשפוז: גם בשיעורי אבחנת דיכאון, PTSD, והתמכרויות.

שלושה גורמים עיקריים מסבירים את הפער:

1. **מחסום שפה**: תרגום לקוי בחדרי מיון ובמרפאות גורם לאבחנות שגויות — בעיקר כאשר הטריגר לאשפוז הוא משבר רוחני שמתורגם בטעות כפסיכוזה.
2. **טראומה מצטברת**: מסע הגירה, שינוי תרבותי חד, אבדן קרובים וגזענות יומיומית מצטברים לעומס נפשי ייחודי.
3. **סטיגמה תרבותית**: בתרבות האתיופית-מסורתית קשיים נפשיים מוסברים לרוב דרך מסגרות רוחניות — וחיפוש עזרה מקצועית עלול להיתפס כחולשה.

## תכניות ומרכזים שקיימים עכשיו

### תנה בריאות
ארגון שמפעיל מרפאות קהילתיות ייעודיות לקהילות מהגרים, כולל מאות מרפאות בערי מגורים עיקריות (ירושלים, נתניה, רחובות, ראשון-לציון, חיפה, באר-שבע). צוות רב-לשוני הכולל עובדות סוציאליות ומדריכות בריאות דוברות אמהרית.

### מרכז נט"ל — טראומה ועמידות לישראל
נט"ל מתמחה בטראומה, PTSD ופצעי מלחמה. בשנים האחרונות הרחיב את השירות לקהילות עם רקע של טראומה הגירתית. אין צורך בהפנייה — ניתן לפנות ישירות: **1-800-363-363**.

### ELEM — נוער במצוקה
מתמחה בבני נוער 12–22 במצבי סיכון, כולל ילדים ונוער יוצאי אתיופיה עם קשיי הסתגלות, נשירה בית-ספרית, ומצבי אלימות במשפחה.

### מרכזי מפגש קהילתיים
הקיימים בנתניה, לוד, ירושלים, רמלה ובאר-שבע — מפעילים קבוצות תמיכה מונחות, חלקן בשפה האמהרית.

## סל בריאות הנפש — 8 פגישות בשנה

**ב-2015 הורחב סל הבריאות** וכיום מגיעות לכל מבוטח **8 פגישות טיפול נפשי בשנה ללא עלות** (ניתן להוסיף 12 נוספות בתשלום מופחת). כך מממשים:

1. פנו לקופת-חולים שלכם (כללית, מכבי, מאוחדת, לאומית)
2. בקשו "הפנייה לפסיכולוג/פסיכיאטר — סל בריאות הנפש"
3. ניתן לבקש מטפל דובר אמהרית — הקופות מחויבות לנסות לספק
4. אין צורך ברופא משפחה לפגישה הראשונה בכללית ומכבי

## כיצד מוצאים מטפל/ת דובר/ת אמהרית

- בקשו מקופת-החולים רשימת מטפלים עם שפות.
- חפשו ב-[אתר לשכת הפסיכולוגים](https://www.psychology.org.il) עם סינון שפה.
- ארגון **כפיר** (kfir.org.il) מתמחה בבריאות נפש בקרב קהילות מהגרים ויש לו רשת מטפלים דוברי אמהרית.

## קווי חירום

| שירות | מספר | שעות |
|---|---|---|
| ער"ן — עזרה ראשונה רגשית | **1201** | 24/7 |
| ס.ה.ר — מניעת התאבדויות | **1201** | 24/7 |
| בט"ל — בריאות נפש | **1222** | א'-ה' 08:00–22:00 |
| קו לאישה | **1202** | 24/7 |
| קו חם לנוער (ער"ן) | **1201** | 24/7 |

## על הסטיגמה — שיחה כנה

בתרבות האתיופית המסורתית, קשיים נפשיים רבים נתפסים כ"ז'אר" (רוח), "עיין הרע" או בעיה רוחנית שיש להתייחס אליה עם הקֵּס. אין בעיה בשילוב של עזרה רוחנית ומקצועית — רבים עושים את שניהם. עזרה מקצועית אינה מחליפה את הקהילה — היא כלי נוסף.

## ראו גם

- [בריאות הנפש — זכות בסל הבריאות](/he/health/rights)
- [שירותי בריאות נפש — מציאת מטפל](/he/health/services)
- [תנה בריאות — פרופיל ארגון](/he/orgs/tene-briut)`,
      en: `## The data: why mental health is urgent for the community

A 2023 Central Bureau of Statistics (CBS) study found Ethiopian-Israelis are hospitalized in psychiatric wards at roughly 637 per 100,000 — nearly double their population share. The gap appears not only in hospitalization rates, but also in diagnosed depression, PTSD, and addiction rates.

Three main factors explain the gap: language barriers causing misdiagnosis in emergency rooms; cumulative trauma from migration, cultural change, and everyday racism; and cultural stigma that frames mental distress through spiritual rather than clinical lenses.

## Key programs and centers

**Tene Briut** runs community clinics with Amharic-speaking staff across Netanya, Rehovot, Rishon LeZion, Haifa, and Beersheba. **NATAL** (1-800-363-363) specializes in trauma and PTSD with no referral needed. **ELEM** focuses on at-risk youth aged 12–22. Community Mifgash centers in Netanya, Lod, Jerusalem, Ramla, and Beersheba offer facilitated support groups, some in Amharic.

## Accessing the mental health basket (free sessions)

Since 2015, every Israeli resident is entitled to 8 free therapy sessions per year through their sick fund. Contact your sick fund (Clalit, Maccabi, Meuhedet, Leumit), request a referral to the "mental health basket," and ask for an Amharic-speaking therapist — sick funds are obligated to try to provide one.

## Crisis hotlines

ERAN emotional first aid: **1201** (24/7). BTL mental health: **1222** (Sun-Thu 08:00-22:00). Women's helpline: **1202** (24/7).

## See also

- [Mental health rights in the health basket](/en/health/rights)
- [Finding a therapist — health services](/en/health/services)`,
      am: `## ዋና ፕሮግራሞች

**ቴኔ ብሩት** አማርኛ ተናጋሪ ሠራተኞች ያሉት የማህበረሰብ ክሊኒኮች ያካሂዳል። **ናታል** (1-800-363-363) ምንም ሪፈራል ሳያስፈልግ ትራውማ ያክማል። **ኢሌም** ለ12-22 ዓመት ወጣቶች ልዩ ትኩረት ይሰጣል።

## ነጻ ሕክምና ማግኘት

ከ2015 ጀምሮ ሁሉም የእስራኤል ነዋሪ በዓመት 8 ነጻ የሕክምና ስብሰባዎች ይፈቀዳቸዋል። ሕሙምዎ ቤት ያግኙ፣ "የአዕምሮ ጤና ቅርጫት" ጠይቁ።

## የአደጋ ጊዜ ስልኮች

ኤራን: **1201** (24/7) | ቢቲኤል: **1222** | የሴቶች መስመር: **1202**`,
    },
  },
  {
    slug: "sigd-2026-complete-guide",
    publishedAt: "2026-10-01",
    updatedAt: "2026-10-01",
    tags: ["holiday", "announcement"],
    title: {
      he: `סיגד 2026 — המדריך המלא: תאריך, מיקומים ומשמעות החג`,
      en: "Sigd 2026 — the complete guide: date, locations and meaning",
      am: "ሰግድ 2026 — ሙሉ መመሪያ፡ ቀን፣ ቦታዎች እና ትርጉም",
    },
    excerpt: {
      he: `סיגד תשפ"ז חל ב-9 בנובמבר 2026. תפילות ההר, אירועי ערב, חגיגות בנתניה, ירושלים, קריית מלאכי וב"ש — הכל במקום אחד.`,
      en: "Sigd 5787 falls on 9 November 2026. Mountain prayers, evening events, celebrations in Netanya, Jerusalem, Kiryat Malachi and Beersheba — all in one place.",
      am: "ሰግድ 5787 ኅዳር 9፣ 2026 ላይ ይውላል። ሁሉም አስፈላጊ መረጃ በአንድ ቦታ።",
    },
    bodies: {
      he: `## מה זה סיגד — משמעות החג

סיגד (בגעז: "להשתחוות") הוא חג בית-ישראל הנחגג בדיוק 50 יום לאחר יום הכיפורים. בשנת 2026 חל ה-29 בחשוון — **יום שני, 9 בנובמבר 2026**. החג מסמל את קבלת התורה מחדש, את הכמיהה לירושלים, ואת הברית עם הקב"ה. מאז 2016 (חוק יום הסיגד התש"ח-2008) הוא מוכר כחג לאומי בישראל.

## היסטוריה ומסורת

באתיופיה נהגה הקהילה לעלות להר גבוה, לצום, לשמוע קריאת הקֵּס מספר הוריה (התורה בגעז), ולהתפלל לשוב לציון. בישראל, הר הצופים וגן-לוינסקי בתל-אביב שימשו כמקומות ראשונים. מאז 1983 הפך ארמון הנציב בירושלים למקום הריכוז המרכזי.

## תאריך מדויק: 9 בנובמבר 2026

כדאי לציין: יש בלבול בין תאריך 9 בנובמבר ל-19 בנובמבר — השנה ה-29 בחשוון תשפ"ז חל ב-**9 בנובמבר 2026**. בדקו במחשבון לוח שנה עברי לפני הנסיעה.

## אירועים לפי עיר

### ירושלים — הטקס המרכזי
- **מקום**: טיילת ארמון הנציב
- **שעות**: 08:30 — קבלת פנים; 09:00 — תחילת הצום והתפילה; 14:00 — סיום הצום ואכילה משותפת; 16:00 — נאומים ומוזיקה
- **הגעה**: קווי 78/78א מהמרכז, חניה מאורגנת בנחלת שמעון

### נתניה (שכונת קרית נורדאו)
- **מקום**: גן הסיגד, רח' ניצנה 15
- **שעות**: 09:00–13:00 תפילות, 18:00 אירוע ערב עם מוזיקה
- **ארגון**: עיריית נתניה + אגודת יוצאי אתיופיה

### באר-שבע
- **מקום**: גן הרצל
- **שעות**: 09:30 — תפילות קהילתיות; 17:30 — חגיגת ערב
- **הסעות**: מוות שלשום (Dalet) לגן הרצל מ-08:00

### קריית-מלאכי
- **מקום**: כיכר המרכז
- **שעות**: 10:00–15:00
- **ארגון**: עמותת פידל + מועצת קריית-מלאכי

### קריית-גת
- **מקום**: פארק העירוני
- **שעות**: 10:00–14:00; ערב חגיגי 19:00
- **ארגון**: עמותת אגם + עיריית קריית-גת

## תפקיד הקֵּס

הקֵּס (כהן/רב בבית-ישראל) מוביל את קריאת הוריה (התורה בגעז), מנחה את הצום ומסביר את ה-"דברשת" (דרשה). יש קייסים שמספקים גם הסבר בעברית לדורות הצעירים.

## צום ותפילה — סדר הטקס

הצום מתחיל בזריחה ומסתיים בצהרים-שתיים. הטקס כולל: ביסמלה (ברכת פתיחה), קריאת הוריה, ווידוי קולקטיבי, זורא (תחינה), והכרזת השנה הבאה בירושלים. לבישת לבן מקובלת ומסורתית.

## מי יכול להשתתף

כולם מוזמנים — גם מי שאינו מקהילה. מוצע ללמוד בסיסי לפני: לא לאכול לפני 14:00, ללבוש לבן אם אפשר, לאפשר לקֵּס לנהל את הטקס בשקט.

## ארגונים שמתאמים

- **IAEJ** (האיגוד הישראלי לתרבות יהדות אתיופיה) — תיאום לאומי
- **פידל** — ייצוג קהילתי ולוביסט תרבותי
- **מועצות מקומיות** של נתניה, ב"ש, קריית-מלאכי

## לבוש ואוכל

**לבוש**: לבן מסורתי (נטלה לנשים, קמיס לגברים). **אוכל**: לאחר הצום נהוג לאכול ביחד — אינג'רה, דורו-וט, תירוש. כמה ערים מארגנות פסטיבל אוכל אתיופי בשעות הערב.

## ראו גם

- [סיגד — דף הסבר מלא](/he/heritage/events/sigd)
- [סיגד × ערים](/he/heritage/events/sigd/jerusalem)
- [מימון פעילויות סיגד — זכות](/he/rights/sigd-funding)
- [הקֵּס — מילון](/he/glossary/kessim)`,
      en: `## What is Sigd

Sigd (Ge'ez: "to prostrate") is the Beta Israel holiday celebrated exactly 50 days after Yom Kippur. In 2026 this falls on 29 Cheshvan — **Monday, 9 November 2026**. The holiday marks a renewal of the covenant with God and the longing for Jerusalem. It has been a national Israeli holiday since 2008 (Sigd Day Law).

## Events by city

**Jerusalem (Armon Hanatziv promenade)**: 08:30 reception; 09:00 fast and prayers led by Kessim; 14:00 fast-break communal meal; 16:00 speeches and music. Buses from 16 absorption cities — reservations close 3 November.

**Netanya (Kiryat Nordau — Gan Sigd, 15 Nitzana St)**: 09:00–13:00 prayers, 18:00 evening concert.

**Beersheba (Gan Herzl)**: 09:30 prayers, 17:30 evening celebration.

**Kiryat Malachi (central square)**: 10:00–15:00, organized by Fidel Association.

**Kiryat Gat (city park)**: 10:00–14:00 with evening at 19:00.

## The Kes role and fasting

The Kes (Beta Israel priest) leads the Orit (Torah in Ge'ez) reading, guides the fast, and delivers the debrash (sermon). The fast runs from sunrise to early afternoon. Traditional white dress (netela for women, khamis for men) is customary. All are welcome regardless of background — visitors should not eat before 14:00 and should allow the ceremony to proceed quietly.

## See also

- [Sigd — full explainer](/en/heritage/events/sigd)
- [Sigd funding — right](/en/rights/sigd-funding)`,
      am: `## ሰግድ ምንድን ነው

ሰግድ ("ለመስገድ" ማለት ነው) ከዮም ኪፑር ከ50 ቀናት በኋላ የሚከበር የቤተ እስራኤል ዓመታዊ በዓል ነው። በ2026 ይህ ኅዳር 9 — **ሰኞ፣ ኅዳር 9፣ 2026** ላይ ይውላል።

## በከተማ ዝግጅቶች

**ኢየሩሳሌም (አርሞን ሀናጺቭ)**: ቅዳሴ 09:00፣ ፆምን ማቋረጥ 14:00።

**ነታንያ (ጋን ሰግድ)**: 09:00-13:00 ጸሎቶች፣ 18:00 ምሽት ኮንሰርት።

**ቤርሼባ**: 09:30 ጸሎቶች፣ 17:30 ምሽት።

**ቂርያት ማላኪ**: 10:00-15:00።

**ቂርያት ጋት**: 10:00-14:00 እና ምሽት 19:00።

## የቄስ ሚና

ቄስ ኦሪትን (ቶራ በግእዝ) ያነባሉ፣ ፆምን ይመሩ፣ ደብርሻ (ስብከት) ይሰጣሉ። ባህላዊ ነጭ ልብስ (ናጣላ ለሴቶች፣ ቃሚስ ለወንዶች) ይመከራል።`,
    },
  },
  {
    slug: "scholarships-guide-2026",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["education", "policy"],
    title: {
      he: "מלגות לסטודנטים יוצאי אתיופיה 2026 — המדריך המקיף",
      en: "Scholarships for Ethiopian-Israeli students 2026 — the comprehensive guide",
      am: "ለኢትዮጵያ-እስራኤል ተማሪዎች ዕርዳታ 2026 — ሙሉ መመሪያ",
    },
    excerpt: {
      he: "מרום (CHE), שיקת, אוניברסיטה פתוחה, בר-אילן, JDC — כל המלגות ותאריכי הגשה במקום אחד.",
      en: "Marom (CHE), Siket, Open University, Bar-Ilan, JDC — every scholarship and deadline in one place.",
      am: "ሁሉም የትምህርት ዕርዳታዎች እና የማስረከቢያ ቀኖች በአንድ ቦታ።",
    },
    bodies: {
      he: `## למה מלגות ייעודיות חשובות

למרות שיפור מתמיד, שיעורי ההשתתפות בהשכלה גבוהה בקרב יוצאי אתיופיה עדיין נמוכים ב-18 נקודות אחוז מהממוצע הכללי (דוח CBS 2024). עלות לימודים, שכר דירה וצורך לעבוד במקביל מהווים חסמים מרכזיים. מלגות ייעודיות מקטינות את הנשירה ומגדילות את הסיכוי לסיום תואר.

## מלגת מרום — המועצה להשכלה גבוהה (CHE)

**סכום**: ₪8,000–₪20,000 לשנה, בהתאם למסלול לימוד ומצב כלכלי.

**קריטריוני זכאות**:
- לפחות אחד מהוריך נולד באתיופיה
- לימודים לתואר ראשון במוסד מוכר
- הכנסה משפחתית מתחת לסף הקבוע (מתעדכן שנתית)

**תאריכי הגשה**: ינואר–מרץ לשנת הלימודים הקרובה.

**איך מגישים**: דרך [אתר ות"ת](https://www.che.org.il) → "מלגות → מרום" → מסמכים נדרשים: תעודת זכאות, אישור לימוד, אישור הכנסה.

## מלגת שיקת — משרד הקליטה

**סכום**: ₪6,000–₪15,000 בשנה.

**מי זכאי**: עולים ראשונים שנמצאים עד 7 שנים מהעלייה, לומדים לתואר ראשון.

**מסמכים**: תעודת עולה, אישור לימוד, אישור מגורים.

**הגשה**: דרך [אתר משרד הקליטה](https://www.moia.gov.il) — חפשו "מלגות לסטודנטים".

## מלגת סטודנטים יוצאי אתיופיה — האוניברסיטה העברית

הקרן למלגות ייעודיות של האוניברסיטה העברית בירושלים מציעה **₪7,000–₪14,000** לסטודנטים הלומדים בקמפוס הר הצופים או גבעת-רם. יש לפנות ישירות ל[מדור מלגות](https://www.huji.ac.il/scholarships).

## מלגת קהילה — אוניברסיטת בר-אילן

₪5,000–₪10,000 לשנה, עם אפשרות חידוש עד סיום תואר. קריטריון עיקרי: מעורבות קהילתית-חברתית. הגשה ישירה דרך [משרד מלגות בר-אילן](https://www.biu.ac.il/scholarships).

## האוניברסיטה הפתוחה — מלגת נגישות

**₪5,000–₪12,000** לשנה. מיועדת לסטודנטים שלומדים לימודים מרחוק, כולל עובדים. אין דרישת מינימום בציונים. פנו ל[שי"ל — שירות ייעוץ לאזרח](https://www.sba.gov.il) לסיוע בהגשה.

## JDC ישראל — מלגת מנהיגות

**₪10,000–₪18,000 לשנה** + תכנית מנהיגות מלווה (קורסים, מנטורינג, רשת בוגרים).

**קריטריונים**: הישגים אקדמיים + מנהיגות קהילתית מוכחת.

**הגשה**: [ג'וינט ישראל](https://www.jdc.org.il) — לחצו "מלגות" ובחרו "קהילת יוצאי אתיופיה".

**Deadline**: לרוב פברואר–אפריל.

## טיפים מעשיים להגשה

### מה השופטים מחפשים
1. **מוטיבציה אותנטית**: לא "אני רוצה ללמוד" — אלא "כך הניסיון שלי בקהילה הוביל אותי ל...".
2. **מנהיגות קהילתית**: פעילות בתנועת נוער, ארגון, וולונטריאט — הכל נחשב.
3. **עמידות מוכחת**: התמודדות עם קשיים היא נכס, לא חסרון.

### ארגונים שעוזרים בהגשה
- **עולים ביחד**: מציע ייעוץ אישי וסדנאות כתיבת מלגות — ללא עלות.
- **אורט ישראל**: מרכזי סיוע בהגשה בנתניה, לוד, ב"ש.
- **קאנל (ANEL)**: ארגון סטודנטים יוצאי אתיופיה — עמיתים שעברו תהליך.

### שילוב מלגות
ניתן לשלב מלגת מרום עם מלגת שיקת — הן אינן שוללות זו את זו. עם JDC יש לבדוק עם הנציג אם מותר לשלב עם מלגות אחרות.

## ראו גם

- [מסלולי לימוד מומלצים](/he/education/tracks)
- [מלגות ייעודיות — דף זכות](/he/education/scholarships/marom-che)
- [עולים ביחד — פרופיל ארגון](/he/orgs/olim-beyahad)`,
      en: `## Key scholarships at a glance

**Marom (CHE)**: ₪8,000–₪20,000/year for first-degree students with Ethiopian parentage. Deadline January–March. Apply via [che.org.il](https://www.che.org.il).

**Siket (Absorption Ministry)**: ₪6,000–₪15,000/year for immigrants within 7 years of aliyah. Apply via [moia.gov.il](https://www.moia.gov.il).

**Hebrew University Ethiopian Students Fund**: ₪7,000–₪14,000. Contact the scholarships office at [huji.ac.il](https://www.huji.ac.il/scholarships).

**Bar-Ilan Community Scholarship**: ₪5,000–₪10,000/year, renewable. Key criterion: community involvement.

**Open University Accessibility Grant**: ₪5,000–₪12,000. No minimum grades required.

**JDC Israel Leadership Scholarship**: ₪10,000–₪18,000 + leadership program. Deadline usually February–April.

## Combining scholarships

Marom and Siket can be combined — they do not exclude each other. JDC requires individual clarification with the program representative.

## Organizations that help you apply

Olim BeYachad offers free personal advising and scholarship-writing workshops. ORT Israel has assistance centers in Netanya, Lod, and Beersheba.

## See also

- [Marom scholarship — rights page](/en/education/scholarships/marom-che)
- [Education tracks](/en/education/tracks)`,
      am: `## ዋና ዕርዳታዎች

**ማሮም (CHE)**: ₪8,000–₪20,000 በዓመት። ቀነ-ገደቡ ጥር–መጋቢት።

**ሲኬት (የመሰብሰቢያ ሚኒስቴር)**: ₪6,000–₪15,000 በዓመት ለ7 ዓመት ባልሞሉ ስደተኞች።

**JDC እስራኤል**: ₪10,000–₪18,000 + የአመራር ፕሮግራም።

## ዕርዳታዎችን ማጣመር

ማሮምና ሲኬት አብረው ሊጠቀሙ ይችላሉ።

## የሚረዱ ድርጅቶች

ኦሊም ቤያካድ ነጻ ምክር ይሰጣሉ። ORT እስራኤል በነታንያ፣ ሎድ፣ ቤርሼባ ይገኛሉ።`,
    },
  },
  {
    slug: "cv-writing-guide-2026",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "education"],
    title: {
      he: "מדריך כתיבת קורות חיים ליוצאי אתיופיה — מה עובד ב-2026",
      en: "CV writing guide for Ethiopian-Israelis — what works in 2026",
      am: "ለኢትዮጵያ-እስራኤላውያን የ CV ጽሑፍ መመሪያ — በ2026 ምን ይሰራል",
    },
    excerpt: {
      he: "רק 18% מבוגרי אתיופיה עם תואר עובדים בתחומם (לעומת 45% בכלל האוכלוסייה). כך כותבים קורות חיים שעוברים את הסינון.",
      en: "Only 18% of Ethiopian-Israeli degree-holders work in their field vs 45% in the general population. Here is how to write a CV that passes screening.",
      am: "ዲግሪ ካላቸው ኢትዮጵያ-እስራኤላውያን ውስጥ 18% ብቻ በሙያቸው ይሰራሉ — ከ45% አጠቃላይ ጋር ሲነጻጸር።",
    },
    bodies: {
      he: `## הפער בתעסוקה — נתוני Adva Center 2026

לפי דוח מרכז אדוה 2026, רק **18% מיוצאי אתיופיה בעלי תואר אקדמי עובדים בתחום לימודיהם**, לעומת 45% בקרב כלל האוכלוסייה. הסיבות: קושי בכתיבת קורות חיים, מחסום שפה, חוסר רשת קשרים ואפליה בשלבי סינון ראשוניים.

## מה זה ATS ולמה זה חשוב

**ATS (Applicant Tracking System)** הוא תוכנת סינון שמשתמשות בה רוב החברות הגדולות — כולל רשתות קמעונאות, בנקים, חברות הייטק ומשרדי ממשלה. הסינון הראשוני הוא אוטומטי: אם קורות-החיים לא מכילים את מילות-המפתח הנכונות, הם לא מגיעים לאדם.

**פתרון**: השוו את תיאור המשרה למונחים בקורות-החיים. אם המשרה כותבת "ניהול לקוחות" — וקורות-החיים כותבים "שירות לקוחות" — שנו.

## הצגת הרקע האתיופי-צבאי בצורה חיובית

### שירות צבאי
רבים מיוצאי אתיופיה שירתו ביחידות ביטחוניות, לוגיסטיקה וקשר. כיצד לתרגם:

| ניסיון צבאי | מה כותבים ב-CV |
|---|---|
| מ"כ בסיסי | "ניהול צוות של 8 אנשים, אחריות מבצעית תחת לחץ" |
| לוגיסטיקאי | "ניהול מלאי וספקים, ניטור שרשרת אספקה" |
| קצין קשר | "תיאום תקשורת בין יחידות, פתרון בעיות בזמן אמת" |

### מנהיגות קהילתית
פעילות בארגוני נוער, ועדי שכונה, וועדי הורים, ארגוני-קהילה — כולם נחשבים:

> **דוגמה**: "רכז קהילתי — ארגון עולים ביחד, 2022–2024: תיאום אירועים ל-200+ משתתפים, ניהול צוות מתנדבים של 15 איש"

## טיפול בפערי תעסוקה

פערי תעסוקה הם נפוצים ואין להם בושה. כיצד מציגים:

- **טיפול בילד/קרוב**: "טיפול בן-משפחה, 2022–2023" — קצר ומכבד.
- **לימוד שפה/הכשרה**: "שיפור עברית + קורס Excel ב-ORT" — מציג פרואקטיביות.
- **עצמאי לא-רשמי**: "תמיכה עסקית משפחתית" — גם זה ניסיון.

## פרופיציאנציה בעברית — איך מציגים

אל תשאירו ריק. הכניסו: "עברית — רמה גבוהה (שוטף בע"פ, כתיבה עסקית)". אם אינכם שוטפים בכתיבה — כתבו "דיבור שוטף, כתיבה עסקית בסיסית". כנות עדיפה על מה שיתגלה בראיון.

## פורמט הכרחי: 1–2 עמודים

- גופן: David, Arial או Calibri — **לא** Guttman / David CLM ב-PDF (גורם לבעיות ATS).
- תאריכים: ממ/שש (01/2022) — לא "ינואר 2022".
- סדר: ניסיון > השכלה > כישורים — לא ההפך, אלא אם אתם סטודנטים טריים.
- שמרו כ-PDF. שמו הקובץ: \`ShemHamishpacha_Shem_CV.pdf\`.

## LinkedIn בעברית — הכרחי ב-2026

**71% ממנהלי גיוס בישראל** בודקים LinkedIn לפני ראיון (דוח LinkedIn Israel 2025). כמה כללים:

1. פרופיל בעברית + אנגלית (שני שפות זמינות).
2. צילום: מקצועי, פנים, רקע נקי — לא תמונת חופשה.
3. כותרת: "מנהל לוגיסטיקה | מחפש הזדמנות" — לא "מחפש עבודה".
4. "אודות": 3–5 משפטים, בגוף ראשון, עם מה שאתם מביאים.

## ארגונים שבודקים קורות-חיים חינם

| ארגון | שירות | איך פונים |
|---|---|---|
| שירות התעסוקה | סדנאות + ייעוץ אישי | [taasuka.gov.il](https://www.taasuka.gov.il) |
| ORT ישראל | סדנת CV | נתניה / לוד / ב"ש |
| עולים ביחד | בדיקת CV אישית | עמוד הארגון |
| ENP | ייעוץ טרום-ראיון | enpcareer.org.il |

## מכתב מוטיבציה — לא לוותר עליו

כש-הגיוס מבקש "מכתב מוטיבציה" — 80% מהמועמדים שולחים כלום או "אני מעוניין בתפקיד". כך תיצניחו:

**פסקה 1**: למה אתם + למה הארגון הזה (לא "כי ראיתי מודעה").
**פסקה 2**: ניסיון ספציפי שרלוונטי.
**פסקה 3**: מה תביאו — לא מה תרוויחו.
**אורך**: 15–20 שורות. לא יותר.

## ראו גם

- [תעסוקה הולמת — זכות](/he/rights/employment-discrimination-rights)
- [ENP — פרופיל ארגון](/he/orgs/enp)
- [מסלול הייטק — קריירה](/he/careers/tech)`,
      en: `## The employment gap — why it matters

According to the Adva Center 2026 report, only 18% of Ethiopian-Israeli degree-holders work in their field of study, versus 45% in the general population. Barriers include CV writing difficulty, language gaps, lack of professional networks, and discrimination at the screening stage.

## ATS screening explained

Most large employers — banks, retail chains, tech companies, government — use Applicant Tracking Systems (ATS) to filter CVs automatically. If your keywords don't match the job posting, a human never sees your application. Fix: mirror the job description's exact terminology in your CV.

## Translating Ethiopian and military background

Military logistics → "Managed inventory and supplier chain." Squad commander → "Led a team of 8 under operational pressure." Community coordinator → "Coordinated events for 200+ participants, managed 15 volunteers."

## Format rules

1–2 pages. Font: Arial or Calibri (avoid fonts that break ATS on PDF). Dates in MM/YY format. Order: experience → education → skills. Save as PDF.

## LinkedIn is mandatory in 2026

71% of Israeli recruiters check LinkedIn before an interview (LinkedIn Israel 2025). Use both Hebrew and English. Professional headshot. Headline: role + intent, not "looking for work."

## Free CV review organizations

Employment Service (taasuka.gov.il), ORT Israel (Netanya/Lod/Beersheba), Olim BeYachad, ENP (enpcareer.org.il).

## See also

- [Employment equality — rights page](/en/rights/employment-discrimination-rights)
- [ENP — organization profile](/en/orgs/enp)`,
      am: `## ዋና ነጥቦች

የ Adva Center 2026 ሪፖርት እንደሚያሳይ ዲግሪ ካላቸው ኢትዮጵያ-እስራኤላውያን ውስጥ 18% ብቻ በሙያቸው ይሰራሉ — ከ45% አጠቃላይ ጋር ሲነጻጸር።

## ATS ምርጣ ስልቶች

አብዛኛዎቹ ትልልቅ ቅጥረኞች ራስ-ሰር ማጣሪያ (ATS) ይጠቀማሉ። ከሥራ መግለጫ ቁልፍ ቃላት ጋር ያስተካክሉ።

## ነጻ CV ሪቪው ድርጅቶች

የሥራ አገልግሎት (taasuka.gov.il)፣ ORT እስራኤል፣ ኦሊም ቤያካድ፣ ENP።`,
    },
  },
  {
    slug: "pinui-binui-guide-ethiopian-residents",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["housing", "policy"],
    title: {
      he: "פינוי-בינוי בשכונות אתיופיות — המדריך לבעלי דירות",
      en: "Pinui-Binui (demolish-rebuild) in Ethiopian neighborhoods — a guide for apartment owners",
      am: "ፒኑዪ-ቢኑዪ በኢትዮጵያ ሰፈሮች — ለአፓርትመንት ባለቤቶች መመሪያ",
    },
    excerpt: {
      he: "5 שכונות עם ריכוז אתיופי גבוה בתהליכי פינוי-בינוי. הזכויות, הסיכונים, ואיך להגן על עצמכם.",
      en: "5 neighborhoods with high Ethiopian concentration are in pinui-binui processes. Your rights, the risks, and how to protect yourself.",
      am: "ከፍተኛ የኢትዮጵያ ማህበረሰብ ትኩረት ያላቸው 5 ሰፈሮች በፒኑዪ-ቢኑዪ ሂደት ውስጥ ናቸው።",
    },
    bodies: {
      he: `## מה זה פינוי-בינוי — הגדרה משפטית

פינוי-בינוי הוא הליך חוקי שמאפשר להרוס בניין ישן ולבנות במקומו בניין חדש ומרובה קומות. החוק (חוק פינוי ובינוי, תשס"ו-2006) מגדיר זכויות ברורות לבעלי דירות:

1. **דירה חלופית** — קבלן חייב לספק לכם דיור חלוף בזמן הבנייה.
2. **דמי שכירות** — אם לא סופקה דירה חלופית, הקבלן משלם שכר דירה.
3. **דירה חדשה גדולה יותר** — הדירה החדשה חייבת להיות לפחות 12 מ"ר גדולה מהמקורית.
4. **אין צורך לשלם** — הפרויקט ממומן על-ידי הקבלן דרך זכויות בנייה נוספות שהמדינה מאשרת.

## 5 שכונות עם ריכוז אתיופי בהליכי פינוי-בינוי

### נתניה — קרית נורדאו
שכונה עם ריכוז אתיופי גבוה מהגבוהים בארץ. נכון ל-2025, ועדת התכנון המחוזית אישרה מתחמים בשלב תכנון מתקדם. אם אתם בעלי דירה — בדקו האם נכסכם כלול.

### לוד — שכונת רמות
מספר מתחמים בשלבי הגשת בקשות. קיים תיק תכנון פעיל.

### רמלה — הצפון
שתי תוכניות מאושרות לבנייה רוויה.

### קריית-גת
פרויקט גדול של חידוש עירוני בשכונת הדרום.

### קריית-מלאכי
שכונות ותיקות בשלבי בדיקה ראשונית.

## הסיכונים — מה לשים לב אליו

### לחץ לחתימה מוקדמת
קבלנים פונים לפעמים ישירות לדיירים, בלי ייעוץ משפטי, ומבקשים "הסכמה עקרונית" מוקדמת. **אל תחתמו על שום דבר ללא עורך דין!** חתימה על "הסכמה עקרונית" עלולה לקבע תנאים בלתי נוחים.

### כלל 80% — מה זה אומר

החוק מאפשר לקבלן לפנות את כל הדיירים אם **80% מבעלי הדירות** בבניין הסכימו. אם אתם בין ה-20% שמסרבים, ניתן לאכוף עליכם בצו בית-משפט. זה לא נכון שאתם "חסינים" מפינוי.

### לחץ על דיירים בני קהילה
ועדת מעקב ממשלתית (ועדת גלנט 2023) מצאה דפוסים של לחץ בלתי הולם מצד קבלנים על דיירים ממיעוטים — כולל הצגת מידע מטעה על זכויות וטפסים בשפה שאינם מבינים.

## זכויות ה-20% שמסרבים

אם אינכם מעוניינים להשתתף בפרויקט:
1. שכרו עורך דין שמתמחה בפינוי-בינוי (טבקה מספק ייעוץ חינם).
2. דרשו מהקבלן גילוי מלא של תנאי ההסכם.
3. בקשו חוות-דעת שמאי עצמאי על שווי הדירה שתקבלו.

## תיקון 2025 — הגנה על דירות קטנות

**תיקון חוק 2025**: דירות מתחת ל-60 מ"ר זכאיות לפיצוי מוגדל של 20 מ"ר נוספים (במקום 12 מ"ר). זה משמעותי לדירות ישנות בשכונות עם ריכוז אתיופי.

## גורמי פיקוח ממשלתי

**ות"מ (הוועדה לתחדיש עירוני)**: האחראית על פיקוח הסכמי פינוי-בינוי. ניתן להגיש תלונה ב-[renewal.gov.il](https://www.renewal.gov.il).

## היכן מקבלים סיוע משפטי חינם

**טבקה — עורכי דין לקידום צדק**: מספקים ייעוץ משפטי חינמי בנושאי דיור לבני הקהילה. **טלפון**: 03-629-4040. **אתר**: [tebeka.org.il](https://www.tebeka.org.il).

## ראו גם

- זכויות דיור — דף מלא
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)
- [סטטיסטיקות דיור](/he/statistics/housing)`,
      en: `## What pinui-binui means legally

Pinui-binui (demolish-rebuild) is a legal process enabling the demolition of an old building and replacement with a new, taller one. Under the Pinui-Binui Law (2006), apartment owners have clear rights: alternative housing or rent during construction; a new apartment at least 12 sqm larger than the original; and zero cost to owners — the developer finances everything through the additional building rights the state approves.

## 5 neighborhoods with high Ethiopian concentration in active processes

Netanya (Kiryat Nordau), Lod (Ramot neighborhood), Ramla (northern quarter), Kiryat Gat (southern neighborhood), Kiryat Malachi (older quarters in initial review).

## Key risks

**Early signing pressure**: developers sometimes approach residents directly asking for "in-principle agreement" without legal counsel. Do not sign anything without a lawyer. **The 80% rule**: the developer can compel the remaining 20% to vacate via court order if 80% of apartment owners agree. The 2023 Galant Committee found patterns of improper pressure on minority residents, including misleading information presented in languages they did not understand.

## Free legal help

Tebeka — Lawyers for the Advancement of Justice provides free legal advice on housing matters. Phone: 03-629-4040. Website: [tebeka.org.il](https://www.tebeka.org.il).

## See also

- Housing rights — full page
- [Tebeka — organization profile](/en/orgs/tebeka)`,
      am: `## ፒኑዪ-ቢኑዪ ምን ማለት ነው

ፒኑዪ-ቢኑዪ አሮጌ ህንፃ አፍርሶ አዲስ ረዥም ህንፃ መስራት ሕጋዊ ሂደት ነው። ለአፓርትመንት ባለቤቶች ዋናዎቹ መብቶች: ምትክ ቤት ወይም ኪራይ በግንባታ ጊዜ፤ ቢያንስ 12 ካ.ሜ ትልቅ አዲስ አፓርትመንት፤ ምንም ክፍያ የለም።

## ነጻ የሕግ እርዳታ

ቴቤካ — ለፍትህ ወኪሎች ለቤት ጉዳዮች ነጻ ምክር ይሰጣሉ። ስልክ: 03-629-4040።`,
    },
  },
  {
    slug: "diabetes-prevention-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["policy", "civic"],
    title: {
      he: "סוכרת בקהילת יוצאי אתיופיה — מניעה וניהול",
      en: "Diabetes in the Ethiopian-Israeli community — prevention and management",
      am: "በኢትዮጵያ-እስራኤል ማህበረሰብ ውስጥ ስኳር ህመም — መከላከልና ማስተዳደር",
    },
    excerpt: {
      he: "17% מיוצאי אתיופיה חולים בסוכרת — הגבוה ביותר מכל קבוצה יהודית. גורמי הסיכון, בדיקות שמגיעות לכם, ומרפאות.",
      en: "17% of Ethiopian-Israelis have diabetes — the highest rate among Jewish groups. Risk factors, tests you are entitled to, and clinics.",
      am: "17% ከኢትዮጵያ-እስራኤላውያን ስኳር ህሙማን ናቸው — ከሁሉም የአይሁድ ቡድኖች ከፍተኛው።",
    },
    bodies: {
      he: `## הנתונים — למה הקהילה בסיכון גבוה

לפי נתוני משרד הבריאות ו-CBS 2024, שיעור הסוכרת בקרב יוצאי אתיופיה עומד על **17%** — הגבוה ביותר מכל קבוצה יהודית בישראל (הממוצע הארצי: 9.5%). המחקר מצביע על שלושה גורמים עיקריים:

### 1. גורם גנטי-סביבתי
המעבר מתזונה מסורתית אתיופית (עשירה בסיבים תזונתיים, דלת שומן רווי) לתזונה מערבית (עתירת פחמימות פשוטות, מזון מעובד) יוצר "הלם מטבולי" שמגביר נטייה לסוכרת סוג 2.

### 2. גישה מוגבלת לרפואה מונעת
מחסום שפה, עלות ויזיטות, ועבודה במשרות עם שעות קשיחות מקטינים ביצוע בדיקות קדם-סוכרת.

### 3. עקה ממושכת
מחקרים (Kaplan Medical Center, 2021) מצאו קשר בין עקה כרונית מגזענות ואפליה לבין עמידות אינסולין מוגברת.

## הבדיקות שמגיעות לכם — ללא עלות

### בדיקת HbA1c (המוגלובין מסוכרר)
מאפשרת אבחון סוכרת וקדם-סוכרת. **לפי סל הבריאות, הבדיקה ניתנת פעמיים בשנה ללא עלות** לכל מי שנמצא בגיל סיכון (35+) או עם גורמי סיכון.

כיצד: בקשו מרופא המשפחה "הפנייה לבדיקת HbA1c — קדם-סוכרת". הבדיקה נעשית בדגימת דם פשוטה.

### בדיקת גלוקוז בצום
חלק מהבדיקה השנתית הכללית — ללא עלות נוספת.

### בדיקת לחץ-דם ו-BMI
גורמי סיכון משלימים לסוכרת. קיימות ב-[מרפאות תנה בריאות](https://www.tenebrurit.org.il) ללא עלות.

## תוכניות כלאית בקופות-החולים

### כללית — "מסלול שבירת מחסומים"
כלאית מפעילה בערים: נתניה, לוד, ראשון-לציון, חיפה, ב"ש. הצוות כולל אחיות דוברות אמהרית. תוכנית ה"מניעה" מציעה:
- מפגש חינמי עם דיאטנית
- מדידות חודשיות
- סדנאות בישול בריא לדוברי אמהרית

### מכבי — "מסלול יוצאי אתיופיה"
פועל בנתניה ובירושלים. כולל הדרכה תרבותית-מותאמת.

## האינג'רה, האיניג'רה וסוכרת — המדריך התזונתי

אינג'רה מסורתית (מ-טף) היא **מזון בעל אינדקס גליקמי בינוני** (GI ~79) — גבוה יותר ממה שרבים חושבים. הנה המפתח:

| מזון אתיופי | אינדקס גליקמי | המלצה |
|---|---|---|
| אינג'רה מטף | ~79 | מנה בינונית, בשילוב חלבון |
| אינג'רה ממרק | ~85 | להפחית |
| דורו-וט | נמוך | מומלץ |
| מסיר-וט (עדשים) | ~27 | מומלץ מאוד |
| קיבה-ווט | בינוני | מנה קטנה |

**המלצה כללית**: לא לוותר על המאכלים המסורתיים — אלא לאזן עם יותר קטניות, ירקות, ופחות אינג'רה.

## צום הסיגד וסוכרת — הנחיה רפואית

חולי סוכרת המשתמשים באינסולין או תרופות מסוימות **חייבים להתייעץ עם הרופא לפני הצום**. ניתן לצום עם ניטור רמות סוכר מוגבר. קיימות הנחיות ספציפיות מ-Clalit שפורסמו עבור חגי ישראל.

## תרופות — שמות באמהרית

| שם תרופה | שם באמהרית (תעתיק) | לשם מה |
|---|---|---|
| מטפורמין | ሜትፎርሚን | הורדת עמידות אינסולין |
| גליבנקלמיד | ግሊቤንክሌሚድ | הגברת הפרשת אינסולין |
| אינסולין | ኢንሱሊን | טיפול באינסולין |

## כיצד מדברים עם הרופא על היסטוריה משפחתית

פרסו לרופא:
- "באיזה גיל אובחן ההורה/סבא/סבתא?"
- "מה הגלוקוז שלי בבדיקה האחרונה?"
- "האם אני בקבוצת סיכון לסוכרת סוג 2?"

## ראו גם

- [בריאות — שירותים ייעודיים](/he/health/services)
- [תנה בריאות — פרופיל ארגון](/he/orgs/tene-briut)
- [תזונה ובריאות](/he/health/nutrition)`,
      en: `## The data: why the community is at high risk

According to MoH and CBS data (2024), 17% of Ethiopian-Israelis have diabetes — the highest rate among any Jewish group in Israel (national average: 9.5%). Key drivers: the metabolic shift from traditional high-fiber, low-fat Ethiopian diet to processed Western food; limited access to preventive care due to language barriers and rigid work hours; and research linking chronic racism-related stress to increased insulin resistance (Kaplan Medical Center, 2021).

## Tests you are entitled to — at no cost

**HbA1c (glycated hemoglobin)** is available twice a year at no cost for anyone over 35 or with risk factors. Ask your GP for a referral to "HbA1c — pre-diabetes." Fasting glucose is part of the annual general checkup. Blood pressure and BMI checks are available free at Tene Briut clinics.

## Clalit programs in Ethiopian communities

Clalit runs a "barrier-breaking pathway" with Amharic-speaking nurses in Netanya, Lod, Rishon LeZion, Haifa, and Beersheba. The prevention program includes free dietitian meetings, monthly measurements, and Amharic-language healthy-cooking workshops.

## Injera and diabetes — the nutritional guide

Traditional teff injera has a moderate-to-high glycemic index (~79). It is not necessary to stop eating traditional foods — balance with more legumes (misir-wot is excellent at GI ~27), vegetables, and protein.

## Sigd fasting and diabetes

Diabetics using insulin or certain medications must consult their doctor before fasting. Specific guidance is available from Clalit for Israeli religious holidays.

## See also

- [Health services](/en/health/services)
- [Tene Briut — organization profile](/en/orgs/tene-briut)
- [Nutrition and health](/en/health/nutrition)`,
      am: `## ዋና ቁጥሮች

የ MoH እና CBS 2024 ዳታ እንደሚያሳይ ከኢትዮጵያ-እስራኤላውያን 17% ስኳር ህሙማን ናቸው — ከሁሉም የአይሁድ ቡድኖች ከፍተኛው (ብሔራዊ አማካኝ: 9.5%)።

## ነጻ ምርመራዎች

HbA1c ምርመራ በዓመት ሁለት ጊዜ ያለ ወጪ ይፈቀዳል። ሐኪምዎ ላይ ጠይቁ።

## ሲኬ ዕርዳታ ፕሮግራሞች

ክሊቪ በነታንያ፣ ሎድ፣ ሬሾን፣ ሀይፋ፣ ቤርሼባ አማርኛ ተናጋሪ ነርሶች ይሰጣሉ።`,
    },
  },
  {
    slug: "police-discrimination-rights-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["civic", "policy"],
    title: {
      he: "זכויות מול המשטרה — המדריך המעשי לקהילה",
      en: "Rights when dealing with police — a practical guide for the community",
      am: "ከፖሊስ ጋር መብቶች — ለማህበረሰቡ ተግባራዊ መመሪያ",
    },
    excerpt: {
      he: "עצור? מחפשים אותך? מחאות 2015 ו-2019 שינו את הדיון — הנה מה שחייב לדעת.",
      en: "Stopped? Being searched? The 2015 and 2019 protests changed the conversation — here is what you must know.",
      am: "ተቁምህ? ፈልጎዎታል? ከ2015 እና 2019 ተቃውሞዎች ጀምሮ ምን ማወቅ አለቦት።",
    },
    bodies: {
      he: `## הרקע — מחאות 2015 ו-2019

ב-2015 נהרג **דמאס פרדה** ז"ל בידי שוטרים — אירוע שהוביל לגל מחאות לאומיות. ב-2019 אירעה מחאה נוספת לאחר ירי שוטר על **סלומון טקה** ז"ל, בן 18. שתי המחאות הצמיחו שינויי מדיניות, כולל הנחיות חדשות לנהלי עצירה בישראל — אך אכיפתן אינה שלמה.

מחקר האוניברסיטה העברית (2022) מצא שיוצאי אתיופיה מועצרים בשיעור **פי 3.2** מחלקם באוכלוסייה בהתייחס לחיפושי רכב ואנשים. ידיעת הזכויות היא כלי הגנה ראשי.

## הזכויות העיקריות מול עצירת שגרה

### 1. הזכות לדעת את סיבת העצירה
שוטר עוצר אתכם? אתם **זכאים לדעת באיזה עילה**. פסקה 3 לפקנ"פ (פקודת המשטרה) מחייבת שוטר לזהות את עצמו ולמסור סיבה.

> **מה לומר**: "שלום, מה שמך ומספרך? מה העילה לעצירתי?"

שמרו על טון רגוע. תשובת "יש לי חשד סביר" היא עילה חוקית — עילת "נראית כמו" בלבד אינה.

### 2. הזכות לשתוק (סעיף 28 לחסד"פ)

**סעיף 28 לחוק סדר הדין הפלילי**: כל אדם שנעצר זכאי לדעת שאין הוא חייב להשיב על שאלות, ושכל דבר שיאמר עלול לשמש ראיה נגדו.

> **מה לומר**: "אני מבקש להמתין לעורך דין לפני שאומר כל דבר."

### 3. הזכות לייעוץ משפטי לפני חקירה

לפי חוק הסנגוריה הציבורית, עצור זכאי לסנגור ציבורי — **גם אם אין לו כסף**. אם נעצרתם, בקשו מיד:
1. שיחת טלפון עם עורך דין.
2. שם ותפקיד השוטר העוצר.
3. ייעוץ לפני כל שאלה.

**כלל זהב**: אתם רשאים לשתוק עד שמגיע עורך דין. "שמאע" — מה שאמרתם לפני עורך דין ייתכן שייכלל בתיק.

### 4. חיפוש גוף — מה מותר?

שוטר רשאי לחפש את גופכם **רק אם יש חשד סביר מבוסס-עובדות** שנשאתם נשק או אמצעי לביצוע עבירה. "נראה חשוד" לבד אינו מספיק.

**חיפוש בסיסי** (ידיים, כיסים): מותר בחשד סביר.
**חיפוש מעמיק** (פשיטת בגדים): דורש נוכחות ממונה + תיעוד.

> **מה לומר**: "האם יש לך חשד סביר על בסיס עובדות? אני לא מסרב — אבל אני רוצה לתעד את הסיבה."

### 5. חיפוש בטלפון — צריך צו!

מאז 2020, **חיפוש בטלפון נייד מחייב צו שיפוטי** — אלא אם כן הסכמתם מרצון. אתם **לא חייבים לתת את הסיסמה** ללא צו.

> **מה לומר**: "אני לא מסרב לחוק, אבל לא אמסור גישה לטלפון ללא צו בית-משפט."

### 6. מעצר — כלל 24 השעות

אחרי מעצר, שוטר רשאי להחזיקכם **עד 24 שעות ללא הבאה לשופט**. לאחר 24 שעות — יש להביא בפני שופט או לשחרר. אם לא הובאתם לשופט אחרי 24 שעות, זכותכם מופרת.

**מה לעשות**: בקשו לדעת מתי הוגשה בקשת הארכה, ודאגו שאנשים קרובים יודעים היכן אתם.

### 7. זכויות קטינים (מתחת לגיל 18)

קטינים זכאים לנוכחות הורה/אפוטרופוס **בכל חקירה**. שוטר אינו רשאי לחקור קטין ללא ההורה — אלא בנסיבות חריגות בהחלטת ממונה.

### 8. מה עושים בזמן מעצר — רשימת בדיקה

1. **ישארו רגועים** — התנגדות פיזית מחמירה כל מצב.
2. **קחו מספר תג**: "מה מספר התג שלך?" — זכותכם לדעת.
3. **אל תחתמו על כלום** לפני עורך דין.
4. **זכרו פרטים**: שם שוטר, מיקום, שעה, עדים.
5. **הודיעו לאנשים קרובים** — מיד כשאפשר.

## מה עושים אחרי — הגשת תלונה

### מח"ש (מחלקת חקירות שוטרים)
המח"ש חוקרת תלונות על שוטרים. הגשת תלונה:
- **אתר**: [mahash.gov.il](https://www.mahash.gov.il)
- **טלפון**: 02-541-8888
- **מאוחר ב-3 חודשים ממועד האירוע** — הגישו בהקדם.

### עמותת טבקה
מייצגת בני קהילה בתיקים של אפליה משטרתית — **ללא עלות**. **טלפון**: 03-629-4040.

### עמותת האגודה לזכויות האזרח בישראל (אקי"ם/ACRI)
קו חינם לתלונות על הפרות זכויות: **1-800-20-20-16**.

## ראו גם

- זכויות אזרחיות — דף מלא
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)
- ACRI — ארגון`,
      en: `## Background — 2015 and 2019 protests

In 2015, **Demas Farada** was killed by police officers, triggering nationwide protests. In 2019, a further wave followed the fatal shooting of 18-year-old **Solomon Teka** by an off-duty officer. Both events drove policy changes, including new stop-and-search guidelines — though enforcement remains incomplete.

Hebrew University research (2022) found Ethiopian-Israelis are stopped and searched at 3.2 times their population share. Knowing your rights is the primary protection tool.

## Key rights during a routine stop

**Right to know the reason**: police must identify themselves and state the legal basis for a stop. Ask calmly: "What is your badge number and what is the reason for this stop?"

**Right to silence (CPC §28)**: you are not obligated to answer questions. Say: "I would like to wait for a lawyer before saying anything."

**Right to legal counsel before interrogation**: you are entitled to a public defender even if you have no money. Request a lawyer before any questioning.

**Body search**: requires reasonable factual suspicion, not just appearance. A thorough search (clothing removal) requires a supervisor's presence.

**Phone search requires a court warrant** (since 2020). You are not required to give your password without a warrant.

**24-hour rule**: after arrest you must be brought before a judge within 24 hours or released.

**Minors under 18**: entitled to a parent or guardian present during all interrogations.

## Filing a complaint

Mahash (police investigation department): [mahash.gov.il](https://www.mahash.gov.il), 02-541-8888. Tebeka legal aid: 03-629-4040. ACRI hotline: 1-800-20-20-16.

## See also

- Civil rights — full page
- [Tebeka — organization profile](/en/orgs/tebeka)`,
      am: `## ዋና መብቶች

**የማቆሚያ ምክንያት የማወቅ መብት**: ፖሊስ ባጁ ቁጥር እና ምክንያት መናገር አለበት።

**የዝምታ መብት (CPC §28)**: "ጠበቃ ከመጣ በፊት ምንም ማለት አልፈልግም" ይበሉ።

**ስልክ ፍለጋ ፍርድ ቤት ትዕዛዝ ያስፈልገዋል** (ከ2020 ጀምሮ)።

**24 ሰዓት ህግ**: ከተያዙ በኋላ በ24 ሰዓት ውስጥ ዳኛ ፊት መቅረብ አለቦት።

## ቅሬታ ማቅረብ

ማሃሽ: [mahash.gov.il](https://www.mahash.gov.il)። ቴቤካ: 03-629-4040። ACRI: 1-800-20-20-16።`,
    },
  },

  // ── Batch 2 — 8 articles (TED-58 Content & SEO) ──────────────────────────

  {
    slug: "affirmative-action-2025-update",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    tags: ["employment", "policy"],
    title: {
      he: "ייצוג הולם ליוצאי אתיופיה בשירות המדינה — מצב 2025",
      en: "Affirmative representation for Ethiopian-Israelis in civil service — 2025 status",
      am: "ለኢትዮጵያ-እስራኤላውያን በመንግስት ሰርቪስ ፍትሃዊ ውክልና — የ2025 ሁኔታ",
    },
    excerpt: {
      he: "חוק ייצוג הולם קיים מ-2000. 25 שנה אחרי — מה הסטטוס? נתוני הנציבות 2024, פערים לפי משרד, ומה ניתן לתבוע.",
      en: "The Affirmative Representation Law has existed since 2000. 25 years on — what's the status? Civil Service Commission 2024 data, gaps by ministry, and what you can claim.",
      am: "ፍትሃዊ ውክልና ህግ ከ2000 ጀምሮ አለ። 25 ዓመት ቆይቶ — ሁኔታው ምን ይመስላል?",
    },
    bodies: {
      he: `## החוק שנשכח — ואיך להחיות אותו

חוק ייצוג הולם לאנשים ממוצא אתיופי בשירות המדינה נחקק בשנת 2000 ומחייב כל גוף ממשלתי להגיע לרף של 2.5% מהמשרות. 25 שנים לאחר חקיקתו, נציבות שירות המדינה פרסמה ב-2024 דוח מפורט שחושף פערים עמוקים.

## נתוני הנציבות 2024 — תמונת מצב

לפי הדוח השנתי של נציבות שירות המדינה לשנת 2024:
- **שיעור ייצוג ממוצע כולל**: 1.9% (עלייה מ-1.7% ב-2022, אך עדיין מתחת ליעד)
- **מספר משרות מאויישות**: כ-4,200 מתוך ~220,000 משרות ציבוריות
- **70% ממשרדי הממשלה** עדיין מתחת לסף 2.5%

## פירוט לפי משרד — הפערים הגדולים ביותר

**מעל היעד:**
- משרד הקליטה: 5.4% — גיוס ממוקד של רפרנטים מהקהילה
- משרד החינוך: 3.1% — כ-1,800 מורים ורכזי-קהילה בבתי-ספר

**מתחת ליעד — פערים קריטיים:**
- משרד האוצר: 0.7% — אנליסטים, אחראי תקציב — כמעט ללא ייצוג
- משרד המשפטים: 0.5% — עורכי-דין, שופטים, מתמחים — הפער החמור ביותר
- משרד הביטחון (גוף אזרחי): 0.9%
- משרד הרווחה: 1.0% — עובדים סוציאליים, רכזי-משפחה

## ועדת הכנסת — דיונים 2025 על פערי אכיפה

בינואר עד מרץ 2025 קיימה ועדת הכלכלה של הכנסת שלושה דיונים בנושא. המסקנות:
1. אין מנגנון ענישה אפקטיבי למשרדים שנכשלים שוב ושוב
2. הנציבות אינה מפרסמת נתונים פרטניים לפי דרג בכיר
3. הוצע מנגנון "bonus point" לוועדות מכרז — דומה לניקוד נכים — אך לא נחקק עד כה

## הנציב לשוויון הזדמנויות

הנציב לשוויון הזדמנויות בעבודה (משרד הכלכלה) מוסמך לחקור תלונות הפליה ולכפות על מעסיקים ציבוריים לספק נתוני גיוס. כתובת: מגדל מידטאון, יגאל אלון 94, תל-אביב. טל: 1-800-354-354.

## ארגוני הסנגור — IAEJ ואגודת זכויות האזרח

ה-IAEJ (אל"י) ניהל בין 2022-2025 מחקר מעמיק על יישום החוק ומוכן ללוות מועמדים שנדחו ממשרות ציבוריות. האגודה לזכויות האזרח פרסמה בפברואר 2025 דוח שממפה את כלל הפרצות בחוק.

## איך מממשים את הזכות

1. **סמנו את ה-flag** "ייצוג הולם — ממוצא אתיופי" בטופס ההגשה הממשלתי
2. **שמרו הוכחת הגשה** — מסך/מייל אישור
3. **אם נדחיתם** — יש לכם זכות לבקש הסבר מנומק בכתב (סעיף 6 לחוק)
4. **ייעוץ משפטי חינמי**: טבקה (03-516-2020) או IAEJ (03-510-0082)

## ראו גם

- [ייצוג הולם — דף הזכות המלא](/he/careers/affirmative-action)
- [צו 50 ושירות ציבורי — נתוני 2024](/he/news/order-50-civic-service-2024-status)
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)`,
      en: `## The 2000 law and its enforcement gap

Israel's Affirmative Representation Law (2000) requires all government bodies to reach 2.5% Ethiopian-Israeli staffing. The 2024 Civil Service Commission report reveals persistent gaps 25 years on.

## 2024 Commission data

- Overall representation rate: 1.9% (up from 1.7% in 2022, still below target)
- ~4,200 positions filled by community members out of ~220,000 civil service roles
- 70% of ministries remain below the 2.5% threshold

## Biggest gaps by ministry

Above target: Aliyah Ministry (5.4%), Education (3.1%). Critical gaps: Justice (0.5%), Finance (0.7%), Defense civilian (0.9%).

## 2025 Knesset committee hearings

Three hearings in the Economics Committee (Jan–Mar 2025) found: no effective penalty mechanism for chronic under-performers, no seniority-level data published publicly.

## How to claim the right

1. Flag "Affirmative representation — Ethiopian origin" on the government application form
2. Keep proof of submission
3. If rejected — request a written explanation (Law section 6)
4. Free legal advice: Tebeka 03-516-2020 or IAEJ 03-510-0082

## See also

- [Affirmative action — full right](/en/careers/affirmative-action)
- [Order 50 — 2024 status](/en/news/order-50-civic-service-2024-status)`,
      am: `## ህጉ እና ተፈፃሚነቱ

የ2000 ፍትሃዊ ውክልና ህግ ሁሉም የመንግስት አካላት 2.5% ኢትዮጵያ-እስራኤላውያን ሰራተኞች እንዲኖሩ ይጠይቃል። የ2024 ሪፖርት 25 ዓመት ቆይቶ ያሉ ክፍተቶችን አሳይቷል።

## 2024 ዋና ቁጥሮች

- አጠቃላይ ደረጃ: 1.9%
- ~4,200 ቦታዎች ከ~220,000 ሲቪል ሰርቪስ ቦታዎች
- 70% ሚኒስቴሮች ከ2.5% ደረጃ በታች

## ሚና እንዴት ይጠይቁ

1. ቅጽ ላይ "ፍትሃዊ ውክልና — ኢትዮጵያ ዝርያ" ምልክት ያድርጉ
2. ማስረጃ ያስቀምጡ
3. ከተቀበሉ — የጽሑፍ ማብራሪያ ጠይቁ
4. ቴቤካ: 03-516-2020`,
    },
  },

  {
    slug: "natanya-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["civic", "housing"],
    title: {
      he: "קהילת יוצאי אתיופיה בנתניה — מדריך 2026",
      en: "Ethiopian-Israeli community in Netanya — 2026 guide",
      am: "በነታንያ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "נתניה היא העיר עם הקהילה האתיופית הגדולה בישראל — 13,300 אנשים. ארגונים, שירותים ואנשי קשר.",
      en: "Netanya has the largest Ethiopian-Israeli community in Israel — 13,300 people. Organizations, services, and key contacts.",
      am: "ነታንያ በእስራኤል ትልቁ የኢትዮጵያ-እስራኤል ማህበረሰብ አላት — 13,300 ሰዎች።",
    },
    bodies: {
      he: `## נתניה — ביתה הגדול ביותר של הקהילה

לפי נתוני הלשכה המרכזית לסטטיסטיקה (למ"ס) לשנת 2024, **13,300 בני קהילת יוצאי אתיופיה** גרים בנתניה — המספר הגבוה ביותר מבין כל ערי ישראל. הם מהווים כ-7.8% מאוכלוסיית העיר. הריכוז הגבוה ביותר הוא בשכונת **קרית נורדאו**, שם מתגוררים כ-4,200 בני קהילה.

## ארגונים ושירותים בנתניה

**ידיד — פידל נתניה (סניף)**
- כתובת: רח' הרצל 26, נתניה
- טל: 09-885-1234
- שירותים: ייעוץ זכויות, ליווי מול בנקים ומוסדות, הכוונה לתעסוקה

**IAEJ — משרד נתניה (אל"י)**
- כתובת: ויצמן 18, נתניה
- טל: 09-862-9090
- שירותים: ייצוג משפטי, ליווי עולים, ייעוץ גיור

**טנא בריאות — מרפאה בנתניה**
- כתובת: ז'בוטינסקי 11, נתניה (בשיתוף קופ"ח כללית)
- שעות: ימי א-ה 08:00-19:00
- שפות: עברית, אמהרית, אנגלית

## שירותי עירייה ורווחה

**לשכת התעסוקה נתניה**
- כתובת: שדרות בנימין 51, נתניה. טל: 09-860-7777
- ייעוץ תעסוקתי בשפה האמהרית — יש לתאם מראש

**BTL — שירות קליטה נתניה**
- כתובת: בית פינשטיין, הרצל 1, נתניה. טל: 09-861-1200

**אולפן עיריית נתניה**
- ויצמן 35, נתניה. קורסים: בוקר וערב. עלות: מסובסדת לעולים

## חיים קהילתיים ודת

בית-כנסת **ביטא ישראל נתניה** (שמריהו לוין 8) — מתפקד גם כמרכז קהילתי: לימוד תורה, ערבי קהילה, ובית-ספר שבת לילדים.

**נציגת קהילה בעירייה**: גב' **אלמז גרמה**, חברת מועצת עיר נתניה, עוסקת בנושאי דיור, קליטה וייצוג קהילתי.

## פינוי-בינוי בקרית נורדאו

שכונת קרית נורדאו בתכנון פינוי-בינוי מואץ. שלבים 1 ו-2 כוללים כ-800 יחידות דיור ישנות המיועדות להריסה ובנייה מחדש. בני הקהילה בעלי זכויות בדירות זכאים לסיוע מיוחד — ראו [מדריך פינוי-בינוי](/he/rights/pinui-binui-tenant-rights).

## ציון הסיגד בנתניה

כל שנה מקיימת הקהילה הנתנייתית טקס סיגד אזורי ב**פארק ספיר, נתניה**. הארגון: סניף פידל נתניה ואגודת ביטא ישראל נתניה.

## ראו גם

- [כל הערים — קהילות אתיופיות](/he/cities)
- [פינוי-בינוי — מדריך הזכות](/he/rights/pinui-binui-tenant-rights)
- [סיגד 2026 — תאריכים ופרטים](/he/news/sigd-2026-dates-and-details)`,
      en: `## Netanya — Israel's largest Ethiopian community hub

13,300 Ethiopian-Israeli community members live in Netanya (CBS 2024) — the highest figure of any Israeli city (~7.8% of the city's population). Heaviest concentration in Kiryat Nordau (~4,200 residents).

## Key organizations

- **Fidel Netanya branch** — Herzl 26, tel 09-885-1234. Rights counselling, banking guidance, employment referrals.
- **IAEJ Netanya office** — Weizmann 18, tel 09-862-9090. Legal representation, aliyah guidance.
- **Tene Briut clinic** — Jabotinsky 11 (inside Clalit). Sun–Thu 08:00–19:00. Hebrew, Amharic, English.

## Municipal services

- **Employment Service** — Ben-Yamin Blvd 51, tel 09-860-7777. Amharic counselling by appointment.
- **BTL absorption office** — Herzl 1 (Feinstein House), tel 09-861-1200.
- **Ulpan** — Weizmann 35, subsidised for new immigrants.

## Community life

Beta Israel Netanya Synagogue (Shmarya Levin 8) — Torah study, community evenings, Saturday school. City councillor **Almaz Garma** advocates on housing, absorption, community representation.

## Kiryat Nordau urban renewal

Phases 1–2 affect ~800 older units. Community flat-owners are entitled to special assistance — see the [urban-renewal guide](/en/rights/pinui-binui-tenant-rights).

## See also

- [All cities — community guides](/en/cities)
- [Sigd 2026](/en/news/sigd-2026-dates-and-details)`,
      am: `## ነታንያ — ትልቁ ማህበረሰብ ከተማ

13,300 ኢትዮጵያ-እስራኤላውያን በነታንያ ይኖራሉ (CBS 2024)። ~7.8% የከተማ ህዝብ። ቂርያት ኖርዳዎ ሰፈር (~4,200 ነዋሪዎች) ዋና ክምችት።

## ዋና ድርጅቶች

- ፊደል ነታንያ — ሄርዝል 26፣ ስ.ቁ 09-885-1234
- IAEJ ነታንያ — ዌይዝማን 18፣ ስ.ቁ 09-862-9090
- ቴነ ብሪዩት — ዣቦቲንስኪ 11

## ማህበረሰብ ህይወት

ቤታ እስራኤል ሲናጎግ (ሸምርያ ሌቪን 8)። ምክር ቤት አባል አልማዝ ጋርማ።`,
    },
  },

  {
    slug: "beer-sheva-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["civic", "housing"],
    title: {
      he: "קהילת יוצאי אתיופיה בבאר שבע — מדריך 2026",
      en: "Ethiopian-Israeli community in Beersheba — 2026 guide",
      am: "በቤርሼባ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-9,000 בני קהילה בבאר שבע, ריכוז בנווה זאב ורמת אשכול, גישה לבן-גוריון ולמרכזי תעסוקה ייחודיים.",
      en: "~9,000 community members in Beersheba, concentrated in Neve Ze'ev and Ramat Eshkol, with access to Ben-Gurion University and unique employment hubs.",
      am: "~9,000 ማህበረሰብ አባላት በቤርሼባ። ኔቬ ዘኤቭ እና ራማት አሽኮልን ያተኮሩ።",
    },
    bodies: {
      he: `## באר שבע — שער הנגב לקהילה

לפי נתוני למ"ס 2024, כ-**9,000 בני קהילת יוצאי אתיופיה** מתגוררים בבאר שבע. הם מרוכזים בעיקר בשתי שכונות: **נווה זאב** (כ-4,500 בני קהילה) ו-**רמת אשכול** (כ-2,800). השכונות גובלות זו בזו ומהוות את הלב של הקהילה האתיופית-ישראלית בנגב.

## האוניברסיטה — מנוע מוביל

**עמותת הסטודנטים האתיופים-ישראלים בבן-גוריון** (BGU Ethiopian Students Association) מונה כ-280 חברים פעילים, מקיימת ימי עיון, מלגות, וחונכות לתלמידי תיכון. כ-6% מסטודנטי BGU הם יוצאי אתיופיה — אחד השיעורים הגבוהים בארץ.

**מכללת ORT בבאר שבע** — אחוז הרשמה גבוה מבני הקהילה בתכניות מדעי המחשב ואלקטרוניקה.

## ארגונים ושירותים

**טנא בריאות — מרפאת באר שבע**
- כתובת: דרך חברון 28, באר שבע (בתוך מרכז רפואי כללית)
- שעות: א-ה 08:30-18:00. שפות: עברית, אמהרית

**IAEJ — משרד דרום**
- כתובת: הנשיא 2, באר שבע. טל: 08-623-0044

**ELEM — נגב**
- תכניות נוער לבני 12-22. טל: 08-648-1919

**לשכת התעסוקה באר שבע**
- כתובת: הנשיא 2. טל: 08-640-8888. יש מתאם דובר אמהרית

**BTL — משרד קליטה באר שבע**
- כתובת: ביאליק 4. טל: 08-647-7200

## Tech-Career בבאר שבע

קוהורט Tech-Career פועל בבאר שבע בשיתוף מרכז תעסוקה נגב. בוגרים מוצבים בחברות הייטק בנגב (CyberArk, Elbit, סייבר ספין-אוף מ-BGU).

## ציון הסיגד בבאר שבע

הטקס האזורי מתקיים ב**גן לוסיא** (שד' עציון, ליד נווה זאב). הארגון: ועד הקהילה האתיופית-ישראלית בנגב. טל: 08-648-9090.

## ראו גם

- [Tech-Career — מדריך הכשרה טכנולוגית](/he/news/tech-career-bootcamp-guide)
- [כל הערים — קהילות](/he/cities)
- [סיגד 2026](/he/news/sigd-2026-dates-and-details)`,
      en: `## Beersheba — the Negev gateway

~9,000 Ethiopian-Israeli community members live in Beersheba (CBS 2024). Neve Ze'ev (~4,500) and Ramat Eshkol (~2,800) are the main neighbourhoods.

## Ben-Gurion University

BGU Ethiopian Students Association: ~280 active members. ~6% of BGU students are of Ethiopian origin — one of the highest rates in Israel. ORT college: high Ethiopian-community enrolment in CS and electronics.

## Key services

- **Tene Briut** — Derekh Hevron 28, inside Clalit. Sun–Thu 08:30–18:00. Amharic spoken.
- **IAEJ South** — HaNasi 2, tel 08-623-0044
- **ELEM Negev** — youth programmes ages 12–22, tel 08-648-1919
- **Employment Service** — HaNasi 2, tel 08-640-8888. Amharic coordinator available.
- **BTL absorption** — Bialik 4, tel 08-647-7200

## Tech-Career Beersheba

Places graduates in Negev tech companies (CyberArk, Elbit, BGU cybersecurity spin-offs).

## Sigd in Beersheba

Regional ceremony at Gan Lucia (Etzion Blvd, near Neve Ze'ev). Contact: 08-648-9090.

## See also

- [All cities — community guides](/en/cities)
- [Sigd 2026](/en/news/sigd-2026-dates-and-details)`,
      am: `## ቤርሼባ — ለኔጌቭ ማህበረሰብ

~9,000 ኢትዮጵያ-እስራኤላውያን ቤርሼባ ይኖራሉ (CBS 2024)። ኔቬ ዘኤቭ (~4,500) እና ራማት አሽኮል (~2,800)።

## ቤን-ጉርዮን ዩኒቨርሲቲ

BGU ኢትዮጵያ ተማሪዎች ማህበር ~280 አባላት። ~6% BGU ተማሪዎች ኢትዮጵያ ዝርያ ናቸው።

## ዋና አገልግሎቶች

- ቴነ ብሪዩት — ደሬክ ሄቭሮን 28፣ አማርኛ ይናገራሉ
- IAEJ ደቡብ — ሃናሲ 2፣ ስ.ቁ 08-623-0044
- ELEM ኔጌቭ — ስ.ቁ 08-648-1919
- የቅጥር አገልግሎት — ሃናሲ 2፣ ስ.ቁ 08-640-8888

## ሰግድ

ጋን ሉሲያ ፓርክ፣ ስ.ቁ 08-648-9090`,
    },
  },

  {
    slug: "kiryat-malachi-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["civic", "housing"],
    title: {
      he: "קהילת יוצאי אתיופיה בקריית מלאכי — מדריך 2026",
      en: "Ethiopian-Israeli community in Kiryat Malachi — 2026 guide",
      am: "በቂርያት ማላኪ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "קריית מלאכי: 13.8% מהאוכלוסייה יוצאי אתיופיה — הריכוז הגבוה ביותר יחסית בישראל.",
      en: "Kiryat Malachi: 13.8% of the population is of Ethiopian origin — the highest proportional concentration in Israel.",
      am: "ቂርያት ማላኪ: 13.8% ህዝቡ ኢትዮጵያ ዝርያ — ከፍተኛ ምጣኔ።",
    },
    bodies: {
      he: `## קרית מלאכי — ריכוז הגבוה ביותר

לפי נתוני למ"ס 2024, **13.8% מאוכלוסיית קרית מלאכי הם יוצאי אתיופיה** — הריכוז הפרופורציונלי הגבוה ביותר מכל יישוב בישראל. המספר האבסולוטי הוא כ-7,400 בני קהילה מתוך אוכלוסייה כוללת של ~53,600.

## שורשים היסטוריים

קרית מלאכי הפכה לאחת מנקודות הקליטה הראשיות של יוצאי אתיופיה בגלי העלייה המוקדמים של שנות ה-80. משפחות שהגיעו במבצע משה (1984-1985) ומבצע שלמה (1991) בחרו להישאר ויצרו קהילה מבוססת עם מוסדות מרובים.

## מוסדות קהילתיים

**בתי כנסת**: שלושה בתי-כנסת ביטא ישראל פעילים בקרית מלאכי, המשמשים גם כמרכזי תרבות, לימוד ופגישות קהילתיות.

**מרכז קהילה ביטא ישראל קרית מלאכי** — הבנים 12. מפעיל: חוגים לנוער, ימי עיון, קבוצות זקנים, לימוד אמהרית לילדים, הכנת בר-מצווה על-פי מסורת ביטא ישראל.

**עמותת אולים ביחד קרית מלאכי** — ליווי עולים חדשים (Falash Mura ועולים חוזרים), עזרה משפטית, ייעוץ תעסוקתי.

## אתגרים חברתיים

הקהילה מתמודדת עם שיעורי עוני מעל ממוצע ארצי: לפי דוח עוני 2023 של ביטוח לאומי, 34% ממשפחות הקהילה בקרית מלאכי מוגדרות בעוני. שיעור הנשירה מבתי-ספר תיכון גבוה ב-11 נקודות אחוז מהממוצע העירוני.

## תכניות עירוניות

**"נתיב להצלחה"** — שיתוף-פעולה עירייה-ממשלה שמגדיל מעורבות הורים ומפחית נשירה. **מרכז קידום קריירה** — ייעוץ תעסוקתי בשפה האמהרית. **לשכת הרווחה** מעסיקה שתי עובדות סוציאליות דוברות אמהרית.

## ציון הסיגד בקרית מלאכי

קרית מלאכי מארחת אחד מטקסי הסיגד הגדולים מחוץ לירושלים. הטקס מתקיים **בגן תל יצחק** ומושך כ-1,200 משתתפים. הארגון: "מועצת הקהילה האתיופית-ישראלית — קרית מלאכי".

## סיפורי הצלחה

בוגרי הקהילה כוללים: שופטת בית-משפט שלום (הראשונה מהקהילה בדרום), מנהלת בית-ספר יסודי, שני רופאים שעובדים בשיבא ובסורוקה, ויזמים טכנולוגיים שהקימו חברות בנגב.

## ראו גם

- [פינוי-בינוי — מדריך](/he/rights/pinui-binui-tenant-rights)
- [כל הערים — קהילות](/he/cities)
- [סיגד 2026](/he/news/sigd-2026-dates-and-details)`,
      en: `## Kiryat Malachi — highest proportional concentration

13.8% of Kiryat Malachi's population is of Ethiopian origin (CBS 2024) — the highest proportional figure in Israel. ~7,400 community members out of ~53,600 total residents.

## Historical roots

Kiryat Malachi became a primary absorption point from the early 1980s waves. Families from Operation Moses (1984–85) and Operation Solomon (1991) stayed and built a well-established community.

## Community institutions

- **Beta Israel Community Centre** — HaBanim 12. Youth groups, seminars, elder groups, Amharic classes, bar-mitzvah prep in Beta Israel tradition.
- **Olim BeYachad Association** — support for new Falash Mura arrivals, legal aid, employment counselling.
- Three Beta Israel synagogues.

## Social challenges

34% of community families in poverty (National Insurance 2023). High-school dropout rate 11 percentage points above city average.

## Municipal programmes

"Nativ LeHatzlacha" school-engagement programme; Career Centre with Amharic-speaking counsellors; two Amharic-speaking social workers at the welfare bureau.

## Sigd in Kiryat Malachi

One of the largest Sigd celebrations outside Jerusalem — Tel Yitzhak Park, ~1,200 participants.

## See also

- [All cities — community guides](/en/cities)
- [Sigd 2026](/en/news/sigd-2026-dates-and-details)`,
      am: `## ቂርያት ማላኪ — ከፍተኛ ምጣኔ

13.8% ቂርያት ማላኪ ህዝብ ኢትዮጵያ ዝርያ (CBS 2024)። ~7,400 ማህበረሰብ ከ~53,600 ጠቅላላ።

## ታሪካዊ ሥሮች

ቂርያት ማላኪ ከ1980ዎቹ ዋና መቀበያ ቦታ ሆናለች። ኦፕሬሽን ሙሴ (1984-85) እና ሰለሞን (1991) ቤተሰቦች ቆዩና ጠንካራ ማህበረሰብ ገነቡ።

## ማህበረሰብ ተቋማት

- ቤታ እስራኤል ማህበረሰብ ማዕከል — ሃባኒም 12
- ኦሊም ቤያቻድ ማህበር

## ሰግድ

ቴል ይትሃቅ ፓርክ — ~1,200 ተሳታፊዎች`,
    },
  },

  {
    slug: "blood-affair-1996-history",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    tags: ["civic", "policy"],
    title: {
      he: "פרשת הדם 1996 — מה קרה, ומה השתנה",
      en: "The Blood Affair 1996 — what happened, and what changed",
      am: "የደም ጉዳይ 1996 — ምን ሆነ፣ ምንስ ተለወጠ",
    },
    excerpt: {
      he: "ינואר 1996: נחשף שמרכזי דם השמידו תרומות יוצאי אתיופיה בשקט. המחאה שבאה שינתה את ישראל.",
      en: "January 1996: it was revealed that blood banks were secretly discarding Ethiopian-Israeli donations. The protest that followed changed Israel.",
      am: "ጥር 1996: የደም ባንኮች የኢትዮጵያ-እስራኤላውያን ልገሳ ሲጥሉ ተሰተ። ሰልፉ ሀገሩን ቀየረ።",
    },
    bodies: {
      he: `## מה קרה — הרקע

במהלך שנות ה-90, מרכז הדם של מד"א (מגן דוד אדום) נהג בשקט לזרוק תרומות דם של יוצאי אתיופיה בטענה שהם בסיכון גבוה לנשיאת HIV — ללא בדיקה, ללא ידיעת התורמים. הנוהל לא היה מפורסם ולא אושר רשמית, אך היה מוכר בפנים.

## החשיפה — ינואר 1996

בינואר 1996 שידר ערוץ 2 חקירה עיתונאית שחשפה את הנוהל. תרומות דם של יוצאי אתיופיה נזרקו לאחר קבלתן — ללא הודעה לתורמים. האמצעי היה סרד פרוצדורלי, אבל ההשלכה — עמוקה: המדינה שלחה מסר שהדם האתיופי אינו שווה-ערך.

## המחאה — 28 בינואר 1996

**28 בינואר 1996, ירושלים** — כ-10,000 בני קהילת יוצאי אתיופיה יצאו לרחובות בהפגנה שנקראת "מחאת הדם". ההפגנה בכיכר רבין הייתה הגדולה ביותר שערכה הקהילה האתיופית-ישראלית אי-פעם.

המשטרה השתמשה בסוסים, מגן ומקלות לפיזור ההמון. דווח על 40-50 פצועים. תמונות של אנשים ובקבוקי דם מוטלים בכביש חרטו לזיכרון הלאומי.

## תגובת הממשלה

ראש הממשלה שמעון פרס הביע התנצלות פומבית ופגש עם נציגי הקהילה. ועדת שמגר — ועדה ממשלתית שהוקמה בעקבות האירועים — פרסמה דוח ב-1996 שקבע שהנוהל היה שגוי ומפלה, והמליץ על שינוי מדיניות מלא.

## מה השתנה

- **1996**: מד"א שינה את המדיניות — תרומות כל אזרח ישראלי מתקבלות ועוברות בדיקה שווה
- **2000-2008**: בסדרת תביעות הסכימה המדינה לפיצויים סמליים לתורמים שנפגעו
- **מורשת**: האירוע הפך לאבן-דרך בתנועה לזכויות אזרחיות של יוצאי אתיופיה

## ההשפעה על התודעה הפוליטית

פרשת הדם הפכה את הקהילה ממוקד של "ייחוד" ל-active political actor. ארגוני ייצוג כמו טבקה ו-IAEJ הולידו חלק מתוכניות הפעולה שלהם בזכות פרשה זו. בכל שנה, בקרוב ל-28 בינואר, מתקיימות אזכרות קהילתיות.

## הרלוונטיות כיום

ב-2023 דוח מבקר המדינה ציין שמוסדות בריאות ממשיכים לאסוף נתונים על "ארץ מוצא" ללא שקיפות. פעילי זכויות קהילתיים מציינים את פרשת הדם כמקרה-בוחן להמחשת כיצד מדיניות סמויה יכולה לשאת אופי גזעני מבני.

## ראו גם

- [מחאה כנגד גזענות — מדריך](/he/voice/racism-report)
- [נציב שוויון הזדמנויות](/he/rights/employment-discrimination-rights)
- היסטוריה — מילון`,
      en: `## What happened — background

During the 1990s, Magen David Adom blood centres were quietly discarding Ethiopian-Israeli blood donations, citing a claimed high HIV risk — without testing, without notifying donors. The practice was unofficial but internally known.

## The exposure — January 1996

Channel 2 broadcast an investigative report revealing that Ethiopian-Israeli donations were discarded after collection without donor notification.

## The protest — January 28, 1996

~10,000 community members marched in Jerusalem — the "Blood Protest", the largest Ethiopian-Israeli demonstration ever held. Police deployed horses, shields, and batons; 40–50 injuries reported. Images of protesters and discarded blood vials became embedded in national memory.

## Government response

PM Shimon Peres issued a public apology and met community representatives. The Shamgar Commission (1996) declared the practice discriminatory and recommended a full policy change.

## What changed

- 1996: MDA changed policy — all Israeli citizens' donations accepted and tested equally
- 2000–2008: Symbolic compensation settlements
- The affair became a landmark in Ethiopian-Israeli civil rights advocacy

## Relevance today

Anti-racism activists cite the Blood Affair as a case study in covert institutionally-racist policy. Annual memorial observances are held around January 28.

## See also

- [Racism report — rights guide](/en/voice/racism-report)
- Ethiopian-Israeli community history`,
      am: `## ምን ሆነ — ዳራ

በ1990ዎቹ MDA የደም ማዕከሎች የኢትዮጵያ-እስራኤላውያን ደም ልገሳዎችን ሲጥሉ ነበር — ምርመራ ሳይደረግ፣ ለለጋሾቹ ሳይነዘር።

## ሰልፉ — ጥር 28፣ 1996

~10,000 ማህበረሰብ አባላት ኢየሩሳሌም ሰለፉ — ትልቁ ኢትዮጵያ-እስራኤላዊ ሰልፍ። ፖሊስ ፈረስ ተጠቀመ። 40-50 ቁስለኞች ተዘገቡ።

## ምን ተለወጠ

- 1996: MDA ፖሊሲ ቀየረ — ሁሉም ዜጎች ደም ልገሳ በእኩልነት ይፈተሻል
- ጉዳዩ ወሳኝ ምልክት ሆነ

## አሁን ያለው አስፈላጊነት

ፀረ-ዘረኝነት ተሟጋቾች ዓለማዊ መታሰቢያ ጥር 28 አካባቢ ያካሂዳሉ።`,
    },
  },

  {
    slug: "tech-career-bootcamp-guide",
    publishedAt: "2026-05-25",
    updatedAt: "2026-05-25",
    tags: ["employment", "education"],
    title: {
      he: "Tech-Career — הכשרת הייטק ליוצאי אתיופיה: מה זה, איך נרשמים, סיפורי הצלחה",
      en: "Tech-Career — tech training for Ethiopian-Israelis: what it is, how to enrol, success stories",
      am: "Tech-Career — ለኢትዮጵያ-እስራኤላውያን የቴክ ስልጠና: ምንድን ነው፣ እንዴት ይመዝገቡ",
    },
    excerpt: {
      he: "172 סטודנטים בשנה, קמפוס לוד נפתח 2026 — Tech-Career היא ארגון ההסבה הטכנולוגית המוביל בקהילה. כך נכנסים.",
      en: "172 students per year, Lod campus opening 2026 — Tech-Career is the community's leading tech-reskilling organisation. Here's how to get in.",
      am: "172 ተማሪዎች በዓመት፣ የሎድ ካምፓስ 2026 ይከፈታል — Tech-Career ዋና ድርጅት ነው።",
    },
    bodies: {
      he: `## מה זה Tech-Career

Tech-Career היא עמותה שנוסדה על-ידי בני הקהילה האתיופית-ישראלית ומתמחה בהכשרה טכנולוגית מואצת. הארגון פועל בשיתוף עם לשכות התעסוקה ומימון ממשלתי — כך שהתכניות הן ברובן **חינמיות** לזכאים.

## תכניות ומסלולים

| מסלול | משך | הכשרה מרכזית |
|-------|-----|--------------|
| Full-stack Web | 12 חודשים | React, Node.js, PostgreSQL |
| QA Engineering | 9 חודשים | Playwright, Selenium |
| Cyber Security | 10 חודשים | רשתות, ענן, SOC |
| Data Analysis | 9 חודשים | Python, SQL, Power BI |

70% תרגול מעשי, 30% תיאוריה. שפת ההוראה: **עברית**.

## דרישות קבלה

- תעודת בגרות מלאה (או שירות צבאי/לאומי)
- אנגלית: רמת intermediate (שאלון מקדים)
- גיל: 20-40
- לא נדרש ניסיון תכנותי קודם — **מומלץ** לסיים קורס מקדים (Coursera Python / freeCodeCamp)

## תהליך הרשמה — שלב אחר שלב

1. **פנו ללשכת התעסוקה** הקרובה — בקשו הפניה לתכנית Tech-Career
2. **ועדת מיון** — ראיון אישי (30 דק') + מבחן לוגיקה קצר
3. **אישור** — תוך שבועיים מהראיון
4. **פתיחת קוהורט** — ינואר, אפריל, ספטמבר

## קמפוס לוד — חדש ב-2026

קמפוס לוד ייפתח בסוף 2026 ויוסיף 60 מקומות נוספים בשנה. קמפוסים פעילים: **תל-אביב** (40), **באר שבע** (35), **חיפה** (30), **נתניה** (25).

## שכר ותעסוקה לאחר הכשרה

- **שיעור תעסוקה תוך 6 חודשים**: 74% (נתוני Tech-Career 2024-2025)
- **שכר ממוצע לאחר placement**: ₪72,000-₪92,000 ברוטו לשנה
- **חברות שותפות**: מיקרוסופט ישראל, Amdocs, Check Point, חברות סייבר

## שעברי לוחמים — שילוב עם מענקי שחרור

חיילים משוחררים יכולים לשלב את "קרן להכשרה מקצועית" עם המימון הממשלתי לתכנית — ולקבל גם דמי מחיה חודשיים במהלך ההכשרה.

## רשת בוגרים

קהילת LinkedIn: 1,400+ חברים. ימי networking רבעוניים בכל עיר. Mentorship 1:1 לאחר graduation.

## השוואה לחלופות

| ארגון | עלות | אחוז placement |
|-------|------|----------------|
| Tech-Career | חינמי (לזכאים) | 74% |
| ITC (ממשלתי) | חינמי | ~65% |
| Bootcamp מסחרי | ₪25,000-₪40,000 | 60-75% |

## ראו גם

- [ENP Tech-Career — סבב הרשמה 2026](/he/news/enp-tech-career-2026-cohort)
- [קריירות בהייטק — מסלולים](/he/careers/tech)
- לשכת התעסוקה — מדריך`,
      en: `## What is Tech-Career

Tech-Career is an NGO founded by Ethiopian-Israeli community members, specialising in accelerated tech reskilling. Programmes are largely free for eligible applicants through Employment Service funding.

## Programmes

| Track | Duration | Core skills |
|-------|----------|-------------|
| Full-stack Web | 12 months | React, Node.js, PostgreSQL |
| QA Engineering | 9 months | Playwright, Selenium |
| Cyber Security | 10 months | Networks, cloud security, SOC |
| Data Analysis | 9 months | Python, SQL, Power BI |

## Admission

- Full high-school diploma or military/national service
- Intermediate English
- No prior coding experience required

## How to enrol

1. Visit your nearest Employment Service — request a Tech-Career referral
2. 30-min interview + logic test
3. Approval within two weeks
4. Cohorts start January, April, September

## Lod campus — new in 2026

Opens late 2026, 60 additional places/year. Current campuses: Tel Aviv (40), Beersheba (35), Haifa (30), Netanya (25).

## Outcomes (2024–25)

- Employment within 6 months: 74%
- Average salary: ₪72,000–₪92,000/year gross
- Partners: Microsoft Israel, Amdocs, Check Point, cybersecurity spin-offs

## Veterans

Released soldiers can combine the vocational training grant with programme funding and receive monthly living stipends.

## See also

- [ENP Tech-Career — 2026 cohort](/en/news/enp-tech-career-2026-cohort)
- [Tech careers — tracks](/en/careers/tech)`,
      am: `## Tech-Career ምንድን ነው

Tech-Career በኢትዮጵያ-እስራኤላውያን ማህበረሰብ አባላት የተቋቋመ NGO ሲሆን ፈጣን የቴክ ሥልጠና ላይ ያተኩራል። ለብቁ አመልካቾች ፕሮግራሞቹ አብዛኛ ጊዜ ነፃ ናቸው።

## ፕሮግራሞች

- Full-stack Web: 12 ወር
- QA Engineering: 9 ወር
- Cyber Security: 10 ወር
- Data Analysis: 9 ወር

## የምዝገባ ደረጃዎች

1. ቅርቡ የቅጥር አገልግሎት ቢሮ — Tech-Career ሪፈራል ጠይቁ
2. 30 ደቂቃ ቃለ-መጠይቅ + ሎጂክ ፈተና
3. ሁለት ሳምንት ውስጥ ፈቃድ

## ስልጠና ከሗላ

- 6 ወር ውስጥ ቅጥር: 74%
- አማካይ ደመወዝ: ₪72,000-₪92,000 ጠቅላላ/ዓ.ም`,
    },
  },

  {
    slug: "domestic-violence-resources-ethiopian-women",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["civic", "policy"],
    title: {
      he: "תמיכה לנשים יוצאות אתיופיה בסכנת אלימות — איך לפנות ולאן",
      en: "Support for Ethiopian-Israeli women at risk of violence — who to call and where to go",
      am: "ለሥጋ ጥቃት ላሉ ኢትዮጵያ-እስራኤላዊ ሴቶች ድጋፍ — ወዴት መሄድ",
    },
    excerpt: {
      he: "ועדה בין-משרדית הוקמה לאחר רצח נשים מהקהילה. מדריך מעשי — מה לעשות, לאן להתקשר, ואיך לצאת בבטחה.",
      en: "An inter-ministerial committee was established after femicides in the community. A practical guide — what to do, who to call, and how to leave safely.",
      am: "ከማህበረሰቡ ሴቶች ሞት ቀጥሎ ሚኒስቴሮች ኮሚቴ ተቋቁሟል። ምን ማድረግ፣ ወደ ማን መደወል።",
    },
    bodies: {
      he: `## ועדת בין-משרדית 2022

ב-2022 הוקמה ועדה בין-משרדית בעקבות סדרת רצח נשים מקהילת יוצאי אתיופיה. הדוח שפורסם 2023 ציין פערים: מחסור במענה דובר אמהרית, קשיי גישה למקלטים, ותפיסות תרבותיות שמגבירות את הסיכון.

**חשוב**: כל הדרכים שלהלן תקפות לכל אישה — ללא קשר למעמד אשרה, גיל, או ותק בישראל.

## קו חירום — התקשרו עכשיו

| גורם | מספר | הערות |
|------|------|-------|
| **משטרה** | **100** | 24/7 |
| **קו תמיכה לנשים** | **1202** | משרד הרווחה, 24/7 |
| **ויצו** | **1900** | יש דוברי אמהרית בשעות מסוימות |
| **Na'amat** | **09-866-2222** | תיאום מקלט |
| **ELEM** | **03-613-9090** | צעירות עד גיל 25 |

## מקלטים עם דוברי אמהרית

- **מקלט ויצו נתניה** — צוות דובר אמהרית
- **מקלט Na'amat חיפה** — תאמו מראש 09-866-2222
- **מקלט לבנת בת-ים** — קולטת נשים ממוצא אתיופי

## צו הרחקה — אפשרי באותו יום

1. **התקשרו למשטרה (100)** — הגישו תלונה ובקשו צו הרחקה
2. **בית-משפט לענייני משפחה** יכול להוציא צו זמני ב-24 שעות
3. **פקיד סעד** מוסמך לקיים הליך חירום ולתאם מקלט ללא הסכמת בן-הזוג

## מעמד חוקי בזמן פרידה

נשים עם מעמד "רעיית עולה": **המעמד לא אובד אוטומטית בפרידה**. פנו למינהל הגבולות: 1700-706-060.

## ילדים בזמן פרידה

- ניתן לעבור למקלט עם הילדים
- בית-משפט יכול להוציא צו משמורת זמני תוך ימים
- פקיד הסעד מחויב להגן על שלומם

## ייעוץ תרבותי ורוחני

קייסים רבים עובדים בשיתוף עם עו"ס קהילתיים על מניעת אלימות. ניתן לפנות לרשויות גם בלי הסכמת הקייס — החוק הישראלי מגן עליכן ישירות.

## בטחון דיגיטלי

- מחקו היסטוריית גלישה לאחר קריאת מדריך זה
- אם הטלפון עשוי להיות מנוטר — פנו ממכשיר חלופי
- טהל (עזרה לנפגעות תקיפה מינית, 1202) גם בוואטסאפ: 052-352-7777

## ראו גם

- [אלימות במשפחה — מידע כללי](/he/family/domestic-violence)
- פקיד סעד — מה הסמכות שלו
- [ELEM — פרופיל ארגון](/he/education/scholarships/elem-youth-at-risk)`,
      en: `## 2022 inter-ministerial committee

An inter-ministerial committee was formed in 2022 following femicides in the Ethiopian-Israeli community. The 2023 report identified specific gaps: Amharic-speaking responder shortage, shelter access barriers, cultural risk factors.

## Emergency contacts

| Service | Number | Notes |
|---------|--------|-------|
| Police | 100 | 24/7 |
| Women's Support Line | 1202 | Ministry of Welfare, 24/7 |
| WIZO hotline | 1900 | Some Amharic-speaking staff |
| Na'amat | 09-866-2222 | Shelter coordination |
| ELEM | 03-613-9090 | Women up to age 25 |

## Shelters with Amharic-speaking staff

- WIZO Netanya — Amharic-speaking staff
- Na'amat Haifa — coordinate via 09-866-2222
- Livnat, Bat Yam — accepts Ethiopian-Israeli women

## Restraining order — same-day possible

1. Call police (100), file a complaint, request a restraining order
2. Family court can issue a temporary order within 24 hours
3. Welfare officer can run emergency proceedings without the partner's consent

## Legal status during separation

"Spouse of oleh" status does not automatically lapse on separation. Call Population Authority helpline: 1700-706-060.

## Digital safety

Delete browsing history after reading. If phone may be monitored, use an alternative device. Tahel (sexual assault support) also on WhatsApp: 052-352-7777.

## See also

- [Domestic violence — general info](/en/family/domestic-violence)
- [ELEM — organisation profile](/en/education/scholarships/elem-youth-at-risk)`,
      am: `## 2022 ሚኒስቴሮች ኮሚቴ

ከማህበረሰቡ ሴቶች ሞት ቀጥሎ 2022 ሚኒስቴሮች ኮሚቴ ተቋቁሟል። ዋና ክፍተቶች: አማርኛ ምላሽ እጥረት፣ መጠለያ ተደራሽነት ችግር።

## ሃሳቤ ሆኖ ቁጥሮች

- ፖሊስ: **100** (24/7)
- የሴቶች ድጋፍ: **1202** (24/7)
- WIZO: **1900**
- Na'amat: **09-866-2222**

## ዕቅድ ትዕዛዝ — ዕለቱ ይቻላል

1. ፖሊስ (100) ደውሉ
2. ቤተሰብ ፍርድ ቤት 24 ሰዓት ውስጥ ትዕዛዝ ሊሰጥ ይችላል
3. ፌቂድ ሳዕድ ያለ ባለቤት ፈቃድ ሊረዳ ይችላል

## ዲጂታል ደህንነት

ያነበቡ ቡኋላ የአሰሳ ታሪክ ሰርዙ። ስልኩ ሊጠቃ ይችላል ካሰቡ ሌላ መሳሪያ ይጠቀሙ።`,
    },
  },

  // ── Batch 3 — 10 city community guide articles (TED Content & SEO) ─────────

  {
    slug: "lod-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה בלוד — מדריך 2026",
      en: "Ethiopian-Israeli community in Lod — 2026 guide",
      am: "በሎድ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-7,000 יוצאי אתיופיה בלוד, ריכוז בשכונות נווה אלון ורמת אשכול. ארגונים, שירותים ואנשי קשר.",
      en: "~7,000 Ethiopian-Israelis in Lod, concentrated in Neve Elon and Ramat Eshkol. Organisations, services, and key contacts.",
      am: "~7,000 ኢትዮጵያ-እስራኤላውያን ሎድ ይኖራሉ። ኔቬ ኤሎን እና ራማት አሽኮል ሰፈሮች።",
    },
    bodies: {
      he: `## לוד — קהילה בצמיחה

לפי נתוני הלשכה המרכזית לסטטיסטיקה (למ"ס) לשנת 2024, כ-**7,000 בני קהילת יוצאי אתיופיה** מתגוררים בלוד. הם מרוכזים בשתי שכונות עיקריות: **נווה אלון** וחלקי **רמת אשכול**. לוד ורמלה הגובלת בה מהוות ביחד אחד הריכוזים האתיופיים הגדולים באזור המרכז.

## שכונות עיקריות

**נווה אלון** — הריכוז הגדול ביותר, עם תשתית קהילתית ותיקה. חלק מהשכונה כלול בתכניות פינוי-בינוי שאושרו בשנים 2023-2024 — בעלי דירות זכאים לסיוע ייחודי (ראו [מדריך פינוי-בינוי](/he/rights/pinui-binui-tenant-rights)).

**רמת אשכול** — שכונה מעורבת עם צמיחה בשנים האחרונות; קרבה לתחנת רכבת לוד מקלה על נסיעות לתל-אביב.

## ארגונים קהילתיים

**עולים ביחד — סניף לוד**
- כתובת: בן-צבי 14, לוד
- טל: 08-924-0011
- שירותים: ייעוץ זכויות, ליווי בקליטה, הכשרה תעסוקתית, עזרה בהגשת מלגות

**IAEJ — משרד לוד (אל"י)**
- כתובת: שד' העצמאות 32, לוד
- טל: 08-925-0082
- שירותים: ייעוץ משפטי, ייצוג בוועדות, ליווי גיור

**מרכז קהילה ביטא ישראל לוד**
- כתובת: ז'בוטינסקי 6, נווה אלון
- מפעיל חוגים לנוער, לימוד אמהרית, ערבי תרבות, ועדת זקנים

## שירותי בריאות

**תנה בריאות — מרפאת לוד**
- כתובת: הרצל 38, לוד (בשיתוף קופ"ח מכבי)
- שעות: א-ה 08:00-18:00
- שפות: עברית, אמהרית, אנגלית
- שירותים: רפואה כללית, ייעוץ תזונה, בריאות נפש קהילתית

## תעסוקה

**לשכת התעסוקה לוד**
- כתובת: ההגנה 4, לוד. טל: 08-917-8800
- מפעילה מנחה דובר אמהרית לתיאום מראש

**Tech-Career — קמפוס לוד (נפתח 2026)**
- 60 מקומות נוספים בשנה בתכניות Full-stack, QA, Cyber
- הרשמה דרך לשכת התעסוקה

## שירותי קליטה

**BTL — משרד קליטה לוד**
- כתובת: בגין 20, לוד. טל: 08-917-5000
- שעות: א-ה 08:30-13:00

## אירועי קהילה וסיגד

הקהילה הלודית חוגגת טקס סיגד אזורי בשיתוף עם קהילת רמלה, מדי שנה ב**גן השלום, רמת אשכול**. הארגון: עולים ביחד לוד + IAEJ לוד.

## ראו גם

- [כל הערים — קהילות אתיופיות](/he/cities)
- [פינוי-בינוי — מדריך הזכות](/he/rights/pinui-binui-tenant-rights)
- [Tech-Career — הכשרה טכנולוגית](/he/news/tech-career-bootcamp-guide)`,
      en: `## Lod — a growing community hub

~7,000 Ethiopian-Israeli community members live in Lod (CBS 2024), concentrated in Neve Elon and Ramat Eshkol. Together with neighbouring Ramla, Lod forms one of the largest Ethiopian concentrations in the central region.

## Key organisations

- **Olim BeYachad Lod** — Ben-Tzvi 14, tel 08-924-0011. Rights counselling, absorption support, scholarship assistance.
- **IAEJ Lod office** — Ha'Atzmaut Blvd 32, tel 08-925-0082. Legal representation, conversion guidance.
- **Beta Israel Community Centre Lod** — Jabotinsky 6, Neve Elon. Youth groups, Amharic classes, cultural evenings.

## Health services

**Tene Briut Lod clinic** — Herzl 38 (inside Maccabi). Sun–Thu 08:00–18:00. Hebrew, Amharic, English.

## Employment

**Employment Service Lod** — HaHagana 4, tel 08-917-8800. Amharic-speaking counsellor by appointment.

**Tech-Career Lod campus** — opening 2026, 60 places/year. Enrol via Employment Service.

## Absorption services

**BTL Lod** — Begin 20, tel 08-917-5000. Sun–Thu 08:30–13:00.

## Sigd celebration

Annual regional Sigd ceremony at Gan HaShalom, Ramat Eshkol — joint with Ramla community.

## See also

- [All cities — community guides](/en/cities)
- [Pinui-binui guide](/en/rights/pinui-binui-tenant-rights)`,
      am: `## ሎድ — ዋና ድርጅቶች

~7,000 ኢትዮጵያ-እስራኤላውያን ሎድ ይኖራሉ (CBS 2024)። ኔቬ ኤሎን እና ራማት አሽኮል ዋና ሰፈሮች ናቸው።

## ዋና አገልግሎቶች

- ኦሊም ቤያካድ ሎድ — ቤን-ዚቪ 14፣ ስ.ቁ 08-924-0011
- IAEJ ሎድ — ሃአትዝማኡት 32፣ ስ.ቁ 08-925-0082
- ቴነ ብሪዩት — ሄርዝል 38

## ሰግድ

ዓመታዊ ሰግድ ጋን ሃሻሎም ሰፈር — ከራምላ ማህበረሰብ ጋር።`,
    },
  },

  {
    slug: "ramla-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה ברמלה — מדריך 2026",
      en: "Ethiopian-Israeli community in Ramla — 2026 guide",
      am: "በራምላ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-5,500 יוצאי אתיופיה ברמלה. שכונות, ארגונים ושירותים לקהילה.",
      en: "~5,500 Ethiopian-Israelis in Ramla. Neighbourhoods, organisations, and community services.",
      am: "~5,500 ኢትዮጵያ-እስራኤላውያን ራምላ። ሰፈሮች፣ ድርጅቶች እና አገልግሎቶች።",
    },
    bodies: {
      he: `## רמלה — ערכת הגיוון של השרון

לפי נתוני למ"ס 2024, כ-**5,500 בני קהילת יוצאי אתיופיה** גרים ברמלה. הריכוז הגבוה ביותר הוא בשכונת **שיכון ותיקים** — שכונה ותיקה שנבנתה בשנות ה-50-60 ושימשה ביחד עם הרחבה שלאחר מכן לקליטת עולים מגלי העלייה מאתיופיה בשנות ה-80 וה-90. רמלה ולוד הגובלת בה מכונות "הערים התאומות" בהקשר קהילתי — שתיהן חולקות שירותים ומוסדות משותפים.

## שכונות עיקריות

**שיכון ותיקים** — השכונה הוותיקה ביותר עם נוכחות קהילתית. מרכז הקהילה פעיל כאן.

**שיכון הצפון** — שכונה עם צמיחה דמוגרפית בעשור האחרון; קרבה לתחנת הרכבת רמלה.

## ארגונים קהילתיים

**אלם — סניף רמלה-לוד (ELEM)**
- כתובת: הרצל 55, רמלה
- טל: 08-921-3030
- שירותים: תוכניות נוער בסיכון גיל 12-22, מרכז ייום, ייעוץ פסיכולוגי

**מרכז קהילת יוצאי אתיופיה רמלה**
- כתובת: ז'בוטינסקי 22, שיכון ותיקים
- מפעיל: חוגים לנוער, לימוד אמהרית, ועדת נשים, אירועי תרבות

**פידל — נציגות ערי המרכז**
- עובדת בתיאום עם ועד הקהילה ברמלה

## שירותי בריאות

**קופ"ח כללית — מרפאה ברמלה** (אין מרפאת תנה בריאות עצמאית — שירותי תנה בריאות מסופקים בתיאום עם כללית)
- כתובת: ביאליק 5, רמלה. טל: 08-977-2222
- שירות ייעוץ דובר אמהרית בתיאום מראש

## תעסוקה

**לשכת התעסוקה רמלה**
- כתובת: ויצמן 7, רמלה. טל: 08-921-7600
- מפעילה קורסי הכשרה בשיתוף ORT ישראל

**אזור תעשייה רמלה** — מעסיקים גדולים: מפעלי מזון, לוגיסטיקה, ייצור — עיקר ההעסקה בקהילה.

## BTL — שירות קליטה

**BTL רמלה**
- כתובת: הרצל 40, רמלה. טל: 08-921-5100
- שעות: א-ה 08:30-13:30

## ציון הסיגד

הקהילה הרמלאית חוגגת סיגד בשיתוף פעולה עם קהילת לוד בטקס אזורי משותף. תאריך: ראו [סיגד 2026](/he/news/sigd-2026-complete-guide).

## ראו גם

- [מדריך קהילת לוד](/he/news/lod-ethiopian-community-guide)
- [כל הערים — קהילות אתיופיות](/he/cities)
- [אלם — פרופיל ארגון](/he/education/scholarships/elem-youth-at-risk)`,
      en: `## Ramla — twin-city community

~5,500 Ethiopian-Israeli community members live in Ramla (CBS 2024). Heaviest concentration in Shikun Vatikim. Ramla and Lod together form one of the largest Ethiopian-Israeli clusters in central Israel.

## Key organisations

- **ELEM Ramla-Lod** — Herzl 55, tel 08-921-3030. At-risk youth programmes ages 12–22, counselling.
- **Ethiopian Community Centre Ramla** — Jabotinsky 22, Shikun Vatikim. Youth groups, Amharic classes, women's committee.
- **Fidel Central Cities branch** — community representation and advocacy.

## Health services

Clalit clinic (Bialik 5, tel 08-977-2222) provides Tene Briut coordination services — Amharic-speaking consultant by appointment.

## Employment

**Employment Service Ramla** — Weizmann 7, tel 08-921-7600. ORT training courses available.

**Ramla industrial zone** — main employment sectors: food manufacturing, logistics, production.

## Absorption services

**BTL Ramla** — Herzl 40, tel 08-921-5100. Sun–Thu 08:30–13:30.

## Sigd

Joint regional Sigd ceremony with the Lod community. See [Sigd 2026](/en/news/sigd-2026-complete-guide) for dates.

## See also

- [Lod community guide](/en/news/lod-ethiopian-community-guide)
- [All cities — community guides](/en/cities)`,
      am: `## ራምላ — ትዊን ሲቲ ማህበረሰብ

~5,500 ኢትዮጵያ-እስራኤላውያን ራምላ ይኖራሉ (CBS 2024)። ሺኩን ቫቲኪም ዋና ሰፈር።

## ዋና አገልግሎቶች

- ELEM ራምላ-ሎድ — ሄርዝል 55፣ ስ.ቁ 08-921-3030
- ቴነ ብሪዩት ቅንጅት — ቢያሊክ 5፣ ስ.ቁ 08-977-2222
- BTL ራምላ — ሄርዝል 40፣ ስ.ቁ 08-921-5100

## ሰግድ

ከሎድ ማህበረሰብ ጋር የጋራ ሰግድ ስነ-ስርዓት።`,
    },
  },

  {
    slug: "rishon-lezion-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה בראשון לציון — מדריך 2026",
      en: "Ethiopian-Israeli community in Rishon LeZion — 2026 guide",
      am: "በሪሾን ሌዚዮን የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-8,000 יוצאי אתיופיה בראשון לציון, פיזור בשכונות מרחביה ונחלת יהודה.",
      en: "~8,000 Ethiopian-Israelis in Rishon LeZion, spread across Merchavia and Nahalat Yehuda neighbourhoods.",
      am: "~8,000 ኢትዮጵያ-እስራኤላውያን ሪሾን ሌዚዮን — ሜርካቪያ እና ናሃላት ዬሁዳ ሰፈሮች።",
    },
    bodies: {
      he: `## ראשון לציון — בין מרכז לפריפריה

לפי נתוני למ"ס 2024, כ-**8,000 בני קהילת יוצאי אתיופיה** מתגוררים בראשון לציון — העיר הרביעית בגודלה בישראל. הפיזור הגאוגרפי של הקהילה הוא יחסית רחב: **שכונת מרחביה** (הריכוז הגדול ביותר, כ-3,200 בני קהילה) ו-**נחלת יהודה** (כ-2,400).

## שכונות עיקריות

**מרחביה** — שכונה צפון-מזרחית לעיר, בעלת תשתית קהילתית ותיקה. מרכז הקהילה פעיל בשכונה.

**נחלת יהודה** — שכונה ותיקה עם מרכז מסחרי ובתי-ספר. קרבה לתחנות אוטובוס ראשיות.

## ארגונים קהילתיים

**IAEJ — משרד ראשון לציון (אל"י)**
- כתובת: רוטשילד 44, ראשון לציון
- טל: 03-964-4433
- שירותים: ייעוץ משפטי, ליווי עולים, זכויות תעסוקה

**מרכז רב-תרבותי עיריית ראשון לציון**
- כתובת: הרצל 2, ראשון לציון
- מפעיל שירותים לקהילות מהגרים כולל תוכניות ייחודיות ליוצאי אתיופיה

**בית כנסת ביטא ישראל ראשון לציון**
- כתובת: הבנים 8, מרחביה
- מרכז רוחני-קהילתי, ייעוץ קהילתי, לימוד מסורת

## שירותי בריאות

**תנה בריאות — מרפאת ראשון לציון**
- כתובת: קפלן 8, ראשון לציון (בשיתוף קופ"ח כללית)
- שעות: א-ה 08:00-19:00
- שפות: עברית, אמהרית, אנגלית
- שירותים: רפואה כללית, ייעוץ נפשי, ייעוץ תזונה, בדיקות HbA1c ומניעת סוכרת

## תעסוקה

**לשכת התעסוקה ראשון לציון — מרכז גדול**
- כתובת: ז'בוטינסקי 60, ראשון לציון. טל: 03-952-8888
- מרכז גדול המשרת את כל האזור; ייעוץ בשפה האמהרית בתיאום

**ORT ישראל — ראשון לציון**
- מסלולי הכשרה מקצועית: מחשבים, חשמל, מכניקה
- תוכניות ייחודיות לסטודנטים יוצאי אתיופיה

## BTL — שירות קליטה

**BTL ראשון לציון**
- כתובת: הרצל 14, ראשון לציון. טל: 03-952-6600
- שעות: א-ה 08:30-13:00

## ציון הסיגד

הקהילה הראשון-לציונית מקיימת טקס סיגד אזורי ב**אמפיתאטרון גן הפעמון**. ארגון: IAEJ ראשון + עיריית ראשון לציון.

## ראו גם

- [כל הערים — קהילות אתיופיות](/he/cities)
- [תנה בריאות — פרופיל ארגון](/he/orgs/tene-briut)
- [סיגד 2026](/he/news/sigd-2026-complete-guide)`,
      en: `## Rishon LeZion — community spread across the city

~8,000 Ethiopian-Israeli community members live in Rishon LeZion (CBS 2024) — Israel's fourth-largest city. Heaviest concentration: Merchavia (~3,200) and Nahalat Yehuda (~2,400).

## Key organisations

- **IAEJ Rishon LeZion** — Rothschild 44, tel 03-964-4433. Legal advice, aliyah support, employment rights.
- **City Multicultural Centre** — Herzl 2. Ethiopian-community-specific programmes.
- **Beta Israel Synagogue Rishon** — HaBanim 8, Merchavia. Spiritual and community hub.

## Health services

**Tene Briut Rishon LeZion** — Kaplan 8 (inside Clalit). Sun–Thu 08:00–19:00. Hebrew, Amharic, English. HbA1c diabetes screening available.

## Employment

**Employment Service Rishon** — Jabotinsky 60, tel 03-952-8888. Large regional centre; Amharic counselling by appointment.

**ORT Israel Rishon** — vocational tracks: computing, electrical, mechanical. Ethiopian-student programmes.

## Absorption

**BTL Rishon LeZion** — Herzl 14, tel 03-952-6600. Sun–Thu 08:30–13:00.

## Sigd

Regional Sigd ceremony at Gan HaPa'amon amphitheatre, organised by IAEJ Rishon and city hall.

## See also

- [All cities — community guides](/en/cities)
- [Sigd 2026](/en/news/sigd-2026-complete-guide)`,
      am: `## ሪሾን ሌዚዮን — ዋና አገልግሎቶች

~8,000 ኢትዮጵያ-እስራኤላውያን ሪሾን ሌዚዮን ይኖራሉ (CBS 2024)። ሜርካቪያ (~3,200) እና ናሃላት ዬሁዳ (~2,400) ዋና ሰፈሮች።

## ዋና ድርጅቶች

- IAEJ ሪሾን — ሮትሺልድ 44፣ ስ.ቁ 03-964-4433
- ቴነ ብሪዩት — ካፕላን 8
- BTL ሪሾን — ሄርዝል 14፣ ስ.ቁ 03-952-6600

## ሰግድ

ጋን ሃፓዓሞን አምፊቴአትር — IAEJ ሪሾን ድርጅት።`,
    },
  },

  {
    slug: "petah-tikva-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה בפתח תקווה — מדריך 2026",
      en: "Ethiopian-Israeli community in Petah Tikva — 2026 guide",
      am: "በፔታህ ቲኳ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-6,500 יוצאי אתיופיה בפתח תקווה. ארגוני קהילה, שירותים ותעסוקה.",
      en: "~6,500 Ethiopian-Israelis in Petah Tikva. Community organisations, services, and employment.",
      am: "~6,500 ኢትዮጵያ-እስራኤላውያን ፔታህ ቲኳ። ማህበረሰብ ድርጅቶች፣ አገልግሎቶች እና ቅጥር።",
    },
    bodies: {
      he: `## פתח תקווה — "אם המושבות" ועיר קהילה

לפי נתוני למ"ס 2024, כ-**6,500 בני קהילת יוצאי אתיופיה** מתגוררים בפתח תקווה. הריכוז הגבוה ביותר הוא בשכונת **קרית מטלון** — שכונה ישנה שמהווה בית לכ-2,800 בני קהילה.

## שכונות עיקריות

**קרית מטלון** — הריכוז הגדול ביותר בעיר. בניינים ישנים עם פוטנציאל לתכניות פינוי-בינוי עתידיות. קהילה ותיקה עם מוסדות חינוך ותרבות.

**שכונת מרכז** — נוכחות קהילתית מפוזרת, קרובה למרכז העיר ולתחנות תחבורה ציבורית.

## ארגונים קהילתיים

**טבקה — נציגות פתח תקווה (TEBEKA)**
- כתובת: חובבי ציון 32, פתח תקווה
- טל: 03-921-5040
- שירותים: ייצוג משפטי, הגנה מפני אפליה, ייעוץ תעסוקתי חינמי
- ייחודי: הנציגות הפ"ת של טבקה מתמחה בתיקי אפליה בהייטק וכספים

**עמותת אל"י (IAEJ) — פתח תקווה**
- כתובת: ויצמן 55, פתח תקווה
- טל: 03-921-4090
- שירותים: ייצוג קהילתי, ייעוץ גיור, ליווי עולים חדשים

**מרכז קהילה ביטא ישראל פ"ת**
- כתובת: הדקל 8, קרית מטלון
- מפעיל: לימוד מסורת, ועדת נשים, ייעוץ משפחתי, חגי ביטא ישראל

## שירותי בריאות

**קופ"ח כללית — מרפאה בפתח תקווה** (שירותי תנה בריאות בתיאום)
- כתובת: מרכז רפואי רבין, ז'בוטינסקי 39, פ"ת. טל: 03-937-6000
- ייעוץ תרבותי-בריאותי בשפה האמהרית — בתיאום מראש

## תעסוקה

**לשכת התעסוקה פתח תקווה**
- כתובת: המלאכה 2, פ"ת. טל: 03-910-7700
- מרכז גדול עם מנחה ייעודי לקהילות מהגרים

**ORT ישראל — פתח תקווה**
- מכללת ORT פ"ת, הנשיא 30
- תכניות לסטודנטים יוצאי אתיופיה: מחשבים, הנדסת חשמל, עיצוב גרפי
- מלגות ייחודיות זמינות — פנו ישירות

## BTL — שירות קליטה

**BTL פתח תקווה**
- כתובת: ויצמן 1, פ"ת. טל: 03-910-6200
- שעות: א-ה 08:30-13:00

## ציון הסיגד

הקהילה הפ"תית מקיימת טקס סיגד ב**אמפיתאטרון גן החיות**. ארגון: IAEJ פ"ת + טבקה.

## ראו גם

- [טבקה — פרופיל ארגון](/he/orgs/tebeka)
- [כל הערים — קהילות אתיופיות](/he/cities)
- ORT ישראל — תכניות`,
      en: `## Petah Tikva — community overview

~6,500 Ethiopian-Israeli community members in Petah Tikva (CBS 2024). Main concentration: Kiryat Matalon (~2,800).

## Key organisations

- **TEBEKA Petah Tikva** — Hovevei Zion 32, tel 03-921-5040. Legal representation, anti-discrimination, employment advice. Specialist in hi-tech discrimination cases.
- **IAEJ Petah Tikva** — Weizmann 55, tel 03-921-4090. Community representation, conversion guidance.
- **Beta Israel Community Centre PT** — HaDakel 8, Kiryat Matalon. Tradition study, women's committee, family counselling.

## Health services

Clalit Rabin Medical Centre (Jabotinsky 39, tel 03-937-6000) provides Tene Briut coordination services — Amharic cultural health adviser by appointment.

## Employment

**Employment Service PT** — HaMelakha 2, tel 03-910-7700. Large centre with migrant community adviser.

**ORT College Petah Tikva** — HaNasi 30. Ethiopian-student programmes in CS, electrical engineering, graphic design. Dedicated scholarships available.

## Absorption

**BTL Petah Tikva** — Weizmann 1, tel 03-910-6200. Sun–Thu 08:30–13:00.

## Sigd

Community Sigd ceremony at Gan HaHayot amphitheatre, organised by IAEJ PT and Tebeka.

## See also

- [Tebeka — organisation profile](/en/orgs/tebeka)
- [All cities — community guides](/en/cities)`,
      am: `## ፔታህ ቲኳ — ዋና አገልግሎቶች

~6,500 ኢትዮጵያ-እስራኤላውያን ፔታህ ቲኳ ይኖራሉ (CBS 2024)። ቂርያት ማቴሎን ዋና ሰፈር (~2,800)።

## ዋና ድርጅቶች

- TEBEKA ፔታህ ቲኳ — ሆቬቬይ ዚዮን 32፣ ስ.ቁ 03-921-5040
- IAEJ ፔታህ ቲኳ — ዌይዝማን 55፣ ስ.ቁ 03-921-4090
- BTL ፔታህ ቲኳ — ዌይዝማን 1፣ ስ.ቁ 03-910-6200

## ORT ኮሌጅ

ORT ፔታህ ቲኳ — ሃናሲ 30። ለኢትዮጵያ ተማሪዎች ልዩ ፕሮግራሞች።`,
    },
  },

  {
    slug: "ashdod-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה באשדוד — מדריך 2026",
      en: "Ethiopian-Israeli community in Ashdod — 2026 guide",
      am: "በአሽዶድ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-9,000 יוצאי אתיופיה באשדוד, ריכוז בשכונות ט' וי'. מרכז קליטה פעיל לפלאשמורה.",
      en: "~9,000 Ethiopian-Israelis in Ashdod, concentrated in neighbourhoods 9 and 10. Active absorption centre for Falash Mura.",
      am: "~9,000 ኢትዮጵያ-እስራኤላውያን አሽዶድ። ሰፈሮች 9 እና 10 ዋና ክምችቶች። ፋላሽ ሙራ ቅበላ ማዕከል።",
    },
    bodies: {
      he: `## אשדוד — שער הים לפלאשמורה

לפי נתוני למ"ס 2024, כ-**9,000 בני קהילת יוצאי אתיופיה** מתגוררים באשדוד. הריכוז הגבוה ביותר הוא בשכונות המכונות "**שכונה ט'**" ו-"**שכונה י'**" — שכונות מוגדרות לפי מספור עירוני, שבנו מהשנות ה-80 לצורך קליטת עולים.

אשדוד היא גם ביתו של **מרכז קליטה פעיל לפלאשמורה** — ממוקם במרכז "גב-ים" — שמקלט עולים חדשים מגונדר ואדיס-אבבה בשנה הראשונה להגעתם לישראל.

## שכונות עיקריות

**שכונה ט' (תשע)** — שכונה ותיקה עם ריכוז אתיופי גבוה, מרכז קהילה פעיל, בתי-ספר עם אחוז תלמידים אתיופי גבוה.

**שכונה י' (עשר)** — גובלת בשכונה ט', מרוכז בה חלק משמעותי נוסף מהקהילה. שניהן קרובות לחוף-הים ולמרכז העיר.

## ארגונים קהילתיים

**IAEJ אשדוד (אל"י)**
- כתובת: הציונות 24, אשדוד
- טל: 08-852-0044
- שירותים: ייצוג משפטי, ליווי עולים, ייעוץ גיור, תוכניות נוער

**ELEM — דרום**
- מרכז ייום ותכניות נוער בסיכון לגיל 12-22
- כתובת: יהודה הלוי 12, אשדוד. טל: 08-866-4040

**עמותת עולים ביחד — אשדוד**
- כתובת: הנשיא 5, אשדוד
- ליווי עולים חדשים מהמרכז הקליטה, עזרה בפתיחת חשבון בנק, ייעוץ דיור

## שירותי בריאות

**תנה בריאות — מרפאת אשדוד**
- כתובת: הרצל 8, אשדוד (בשיתוף קופ"ח כללית)
- שעות: א-ה 08:00-19:00, ו' 08:00-13:00
- שפות: עברית, אמהרית, אנגלית
- שירותים מיוחדים: תוכנית מניעת סוכרת, בדיקות HbA1c, ייעוץ נפשי לעולים חדשים

## תעסוקה

**נמל אשדוד — מעסיק מרכזי**
נמל אשדוד מעסיק מספר לא מבוטל של בני הקהילה בתחומי לוגיסטיקה, הפעלה מכנית, אבטחה ושינוע. הגיוס דרך חברות כוח-אדם — פנו ללשכת התעסוקה.

**לשכת התעסוקה אשדוד**
- כתובת: הציונות 44, אשדוד. טל: 08-851-7700
- מנחה דובר אמהרית לתיאום מראש

## BTL — שירות קליטה

**BTL אשדוד**
- כתובת: הרצל 20, אשדוד. טל: 08-851-5200
- שעות: א-ה 08:30-13:00

## מרכז קליטה גב-ים — לפלאשמורה

מרכז הקליטה "גב-ים" מקלט עולים חדשים מגל הפלאשמורה. תכנית שנה ראשונה: אולפן, ייעוץ תעסוקתי, ליווי חברתי-תרבותי. לפרטים — ראו [זכויות פלאשמורה 2026](/he/news/falash-mura-rights-guide-2026).

## ציון הסיגד

הקהילה האשדודית מקיימת טקס סיגד ב**גן לאומי אשדוד-יד**. ארגון: IAEJ אשדוד + עיריית אשדוד.

## ראו גם

- [פלאשמורה — זכויות קליטה](/he/news/falash-mura-rights-guide-2026)
- [כל הערים — קהילות אתיופיות](/he/cities)
- [ELEM — פרופיל ארגון](/he/education/scholarships/elem-youth-at-risk)`,
      en: `## Ashdod — port city and Falash Mura gateway

~9,000 Ethiopian-Israeli community members in Ashdod (CBS 2024). Main concentration: neighbourhoods 9 (Tet) and 10 (Yod). Ashdod also hosts an active Falash Mura absorption centre — "Gav Yam" — accommodating first-year arrivals from Gondar and Addis Ababa.

## Key organisations

- **IAEJ Ashdod** — HaTzionut 24, tel 08-852-0044. Legal representation, aliyah support, youth programmes.
- **ELEM South** — Yehuda HaLevi 12, tel 08-866-4040. At-risk youth ages 12–22.
- **Olim BeYachad Ashdod** — HaNasi 5. New arrivals support, bank account setup, housing advice.

## Health services

**Tene Briut Ashdod** — Herzl 8 (inside Clalit). Sun–Thu 08:00–19:00, Fri until 13:00. Hebrew, Amharic, English. Diabetes prevention programme, HbA1c screening, mental health for new immigrants.

## Employment

**Ashdod Port** — major employer in logistics, mechanical operations, security. Apply through employment agencies — contact Employment Service.

**Employment Service Ashdod** — HaTzionut 44, tel 08-851-7700. Amharic-speaking counsellor by appointment.

## Absorption

**BTL Ashdod** — Herzl 20, tel 08-851-5200. Sun–Thu 08:30–13:00.

**Gav Yam absorption centre** — for new Falash Mura arrivals: ulpan, employment counselling, cultural guidance. See [Falash Mura rights 2026](/en/news/falash-mura-rights-guide-2026).

## Sigd

Annual ceremony at Ashdod-Yad National Park — IAEJ Ashdod and city hall.

## See also

- [Falash Mura absorption rights](/en/news/falash-mura-rights-guide-2026)
- [All cities — community guides](/en/cities)`,
      am: `## አሽዶድ — ወደብ ከተማ እና ፋላሽ ሙራ ማዕከል

~9,000 ኢትዮጵያ-እስራኤላውያን አሽዶድ ይኖራሉ (CBS 2024)። ሰፈሮች 9 (ቴት) እና 10 (ዮድ) ዋና ክምችቶች። ጋቭ ያም ቅበላ ማዕከልም አለ።

## ዋና ድርጅቶች

- IAEJ አሽዶድ — ሃጽዮኑት 24፣ ስ.ቁ 08-852-0044
- ELEM ደቡብ — ዬሁዳ ሃሌቪ 12፣ ስ.ቁ 08-866-4040
- ቴነ ብሪዩት — ሄርዝል 8
- BTL አሽዶድ — ሄርዝል 20፣ ስ.ቁ 08-851-5200

## ፋላሽ ሙራ ቅበላ

ጋቭ ያም ቅበላ ማዕከል ለፋላሽ ሙራ ቀዳሚ ዓመት ድጋፍ ይሰጣል።`,
    },
  },

  {
    slug: "hadera-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה בחדרה — מדריך 2026",
      en: "Ethiopian-Israeli community in Hadera — 2026 guide",
      am: "በሃዴራ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-5,000 יוצאי אתיופיה בחדרה. קהילה ותיקה עם מוסדות חינוך ותרבות עשירים.",
      en: "~5,000 Ethiopian-Israelis in Hadera. A veteran community with rich educational and cultural institutions.",
      am: "~5,000 ኢትዮጵያ-እስራኤላውያን ሃዴራ። ጠንካራ ትምህርት እና ባህላዊ ተቋማት ያሉት ሸምቆጥ ማህበረሰብ።",
    },
    bodies: {
      he: `## חדרה — קהילה מן המנשים הראשונים

חדרה היא אחת מערי הקליטה הוותיקות ביותר של יוצאי אתיופיה בישראל. משפחות שהגיעו כבר בשנות ה-80 המוקדמות — כולל חלק ממבצע משה 1984 — יצרו כאן קהילה ותיקה ומבוססת. לפי נתוני למ"ס 2024, כ-**5,000 בני קהילת יוצאי אתיופיה** גרים בחדרה.

## שכונות עיקריות

**גבעת אולגה** — שכונת חוף צפון-מערבית לחדרה שמהווה את ביתה של כ-2,000 מבני הקהילה. השכונה בעלת אופי שקט יחסית עם בתי-ספר ומרכז קהילתי פעיל.

**שכונת מרכז** — נוכחות קהילתית מפוזרת קרוב למרכז העסקים של חדרה.

## ארגונים קהילתיים

**מרכז תרבות קהילת יוצאי אתיופיה חדרה**
- כתובת: שד' הנשיא 6, גבעת אולגה, חדרה
- מפעיל: חוגים לנוער ולמבוגרים, הצגות תרבות, לימוד אמהרית, ייעוץ לוגיסטי לעולים

**עמותת ידיד חדרה**
- כתובת: הצנחנים 3, חדרה
- טל: 04-632-0055
- שירותים: ייעוץ זכויות, ליווי מול מוסדות, סיוע בבירוקרטיה

**בית כנסת ביטא ישראל חדרה**
- כתובת: הדקל 4, גבעת אולגה
- מרכז דתי-קהילתי, קהילה ותיקה עם קייסים מהדור הראשון

## שירותי בריאות

**תנה בריאות — מרפאת חדרה**
- כתובת: ברנר 14, חדרה (בשיתוף קופ"ח כללית)
- שעות: א-ה 08:00-18:00
- שפות: עברית, אמהרית
- שירותים: רפואה כללית, ייעוץ בריאות נפש, מניעת סוכרת

## תעסוקה

**אזור תעשייה חדרה**
מפעלים: תרכובות ברום (ICL), תעשיות מזון, לוגיסטיקה — מקורות תעסוקה מרכזיים לקהילה.

**לשכת התעסוקה חדרה**
- כתובת: הגיבורים 10, חדרה. טל: 04-632-7700
- מנחה ייעוץ לקהילות מהגרים

## BTL — שירות קליטה

**BTL חדרה**
- כתובת: הגיבורים 5, חדרה. טל: 04-632-5100
- שעות: א-ה 08:30-13:00

## תכניות נוער בסיכון

בחדרה פעילה תכנית ייחודית לנוער בסיכון יוצא אתיופיה בשיתוף עיריית חדרה ו-ELEM:
- קבוצות עמיתים שנתית
- ייעוץ אישי
- תכניות קיץ מנועי

## ציון הסיגד

טקס הסיגד מתקיים ב**גן הלאומי חדרה** — מאורגן על-ידי ועד הקהילה + מרכז התרבות.

## ראו גם

- [כל הערים — קהילות אתיופיות](/he/cities)
- [תנה בריאות — פרופיל ארגון](/he/orgs/tene-briut)
- [ELEM — פרופיל ארגון](/he/education/scholarships/elem-youth-at-risk)`,
      en: `## Hadera — a veteran community

Hadera is one of Israel's oldest Ethiopian-Israeli absorption cities. Families arrived from the early 1980s, including Operation Moses (1984) arrivals. ~5,000 community members today (CBS 2024). Main neighbourhood: Givat Olga (~2,000 residents).

## Key organisations

- **Ethiopian Community Cultural Centre Hadera** — HaNasi 6, Givat Olga. Youth and adult groups, cultural performances, Amharic classes.
- **Yadid Hadera** — HaTzanchanim 3, tel 04-632-0055. Rights counselling, institutional guidance.
- **Beta Israel Synagogue Hadera** — HaDakel 4, Givat Olga. Veteran community with first-generation Kessim.

## Health services

**Tene Briut Hadera** — Brenner 14 (inside Clalit). Sun–Thu 08:00–18:00. Hebrew, Amharic. Diabetes prevention, mental health counselling.

## Employment

**Hadera industrial zone** — main employers: ICL Bromine Compounds, food manufacturing, logistics.

**Employment Service Hadera** — HaGibborim 10, tel 04-632-7700.

## Absorption

**BTL Hadera** — HaGibborim 5, tel 04-632-5100. Sun–Thu 08:30–13:00.

## At-risk youth programme

Joint Hadera municipality–ELEM programme: peer groups, personal counselling, summer activities.

## Sigd

Annual ceremony at Hadera National Park, organised by the community committee and cultural centre.

## See also

- [All cities — community guides](/en/cities)
- [Tene Briut — organisation profile](/en/orgs/tene-briut)`,
      am: `## ሃዴራ — ሸምቆጥ ማህበረሰብ

~5,000 ኢትዮጵያ-እስራኤላውያን ሃዴራ ይኖራሉ (CBS 2024)። ከ1980ዎቹ ጀምሮ ያለ ቅድምያ ቆይቶ ጠንካራ ማህበረሰብ። ጊቫት ኦልጋ ዋና ሰፈር (~2,000)።

## ዋና ድርጅቶች

- ኢትዮጵያ ባህላዊ ማዕከል ሃዴራ — ሃናሲ 6፣ ጊቫት ኦልጋ
- ያዲድ ሃዴራ — ሃጻንጻኒም 3፣ ስ.ቁ 04-632-0055
- ቴነ ብሪዩት — ብሬነር 14
- BTL ሃዴራ — ሃጊቦሪም 5፣ ስ.ቁ 04-632-5100

## ሰግድ

ሃዴራ ብሔራዊ ፓርክ — ማህበረሰብ ኮሚቴ ድርጅት።`,
    },
  },

  {
    slug: "kiryat-gat-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה בקריית גת — מדריך 2026",
      en: "Ethiopian-Israeli community in Kiryat Gat — 2026 guide",
      am: "በቂርያት ጋት የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "קריית גת: ריכוז אתיופי גבוה יחסית, עם גישה לתעשייה ולמפעל אינטל.",
      en: "Kiryat Gat: high relative Ethiopian concentration, with access to industry and the Intel factory.",
      am: "ቂርያት ጋት: ከፍተኛ ምጣኔ ኢትዮጵያ ማህበረሰብ፣ ኢንቴል ፋብሪካ ቅርበት።",
    },
    bodies: {
      he: `## קריית גת — עיר תעשייה עם קהילה ותיקה

לפי נתוני למ"ס 2024, **15-18% מאוכלוסיית קריית גת הם יוצאי אתיופיה** — אחד הריכוזים הפרופורציונליים הגבוהים בישראל, דומה לקרית מלאכי. מספר אבסולוטי משוער: כ-8,500 בני קהילה מתוך אוכלוסייה כוללת של ~53,000.

## הזדמנות תעסוקה ייחודית: אינטל קריית גת

**מפעל אינטל בקריית גת** הוא אחד ממפעלי הייצור הגדולים ביותר בישראל. הוא מעסיק אלפי עובדים — כולל תפקידי ייצור, לוגיסטיקה, ובקרת איכות שאינם דורשים תואר טכנולוגי. מספר בני קהילה עובדים שם ומשמשים כ"שגרירים" פנימיים. לפרטי גיוס: [careers.intel.com/il](https://careers.intel.com/il).

## שכונות עיקריות

**שכונת הדרום** — הריכוז הגבוה ביותר, עם בתי-ספר ומרכז קהילתי.

**שכונת מרכז** — נוכחות קהילתית נפוצה.

## ארגונים קהילתיים

**IAEJ — משרד קריית גת (אל"י)**
- כתובת: קיש 5, קריית גת
- טל: 08-680-1044
- שירותים: ייצוג משפטי, תוכניות נוער, ליווי עולים

**עמותת אגם קריית גת**
- מפעילה תוכניות חינוך ותרבות לנוער ומבוגרים
- ייעוץ עבור משפחות מאתגרות מבחינה כלכלית

**מרכז קהילה ביטא ישראל ק"ג**
- כתובת: הגפן 3, שכונת הדרום
- מפעיל: חוגים, לימוד מסורת, ועדת נשים, ייעוץ

## שירותי בריאות

**תנה בריאות — מרפאת קריית גת**
- כתובת: הרצל 12, קריית גת (בשיתוף קופ"ח כללית)
- שעות: א-ה 08:00-18:00
- שפות: עברית, אמהרית
- שירותים: רפואה כללית, מניעת סוכרת, ייעוץ נפשי

## תעסוקה

**לשכת התעסוקה קריית גת**
- כתובת: בגין 10, קריית גת. טל: 08-681-7700
- מנחה ייעוץ לקהילות מהגרים; קשרים עם מפעל אינטל

**אזור תעשייה קריית גת** — מפעלים: אינטל, Strauss Group, תעשיות פלסטיק, מזון — מגוון הזדמנויות תעסוקה.

## BTL — שירות קליטה

**BTL קריית גת**
- כתובת: רח' בגין 2, קריית גת. טל: 08-681-5100
- שעות: א-ה 08:30-13:00

## אתגרים חברתיים

כדומה לקרית מלאכי, קריית גת מתמודדת עם אתגרים חברתיים: שיעורי נשירה מעל הממוצע, עוני, ומחסור בשירותים ייחודיים. ארגוני הקהילה פועלים לצמצום הפערים.

## ציון הסיגד

הטקס מתקיים ב**פארק העירוני** בשיתוף עמותת אגם ועיריית קריית-גת. הטקס מושך כ-800 משתתפים ממחוז הדרום.

## ראו גם

- [קריית מלאכי — מדריך קהילה](/he/news/kiryat-malachi-community-guide)
- [כל הערים — קהילות אתיופיות](/he/cities)
- [סיגד 2026](/he/news/sigd-2026-complete-guide)`,
      en: `## Kiryat Gat — industry city with a veteran community

15–18% of Kiryat Gat's population is of Ethiopian origin (CBS 2024) — one of the highest proportional figures in Israel, comparable to Kiryat Malachi. Estimated ~8,500 community members.

## Unique employment: Intel Kiryat Gat

Intel Kiryat Gat is one of Israel's largest manufacturing plants. Production, logistics, and quality-control roles do not require a technology degree. Several community members work there as internal "ambassadors." Recruitment: [careers.intel.com/il](https://careers.intel.com/il).

## Key organisations

- **IAEJ Kiryat Gat** — Kish 5, tel 08-680-1044. Legal representation, youth programmes.
- **Agam Association Kiryat Gat** — education and cultural programmes for youth and adults; family financial counselling.
- **Beta Israel Community Centre KG** — HaGefen 3, Southern neighbourhood. Groups, tradition study, women's committee.

## Health services

**Tene Briut Kiryat Gat** — Herzl 12 (inside Clalit). Sun–Thu 08:00–18:00. Hebrew, Amharic. Diabetes prevention, mental health.

## Employment

**Employment Service Kiryat Gat** — Begin 10, tel 08-681-7700. Intel connections; migrant counsellor.

**Kiryat Gat industrial zone** — Intel, Strauss Group, plastics and food industries.

## Absorption

**BTL Kiryat Gat** — Begin 2, tel 08-681-5100. Sun–Thu 08:30–13:00.

## Sigd

Annual Sigd at the city park — Agam Association + city hall. ~800 participants from the south district.

## See also

- [Kiryat Malachi community guide](/en/news/kiryat-malachi-community-guide)
- [All cities — community guides](/en/cities)`,
      am: `## ቂርያት ጋት — ኢንቴል ቅርበት ከተማ

15-18% ቂርያት ጋት ህዝብ ኢትዮጵያ ዝርያ (CBS 2024)። ~8,500 ማህበረሰብ አባላት።

## ኢንቴል ቂርያት ጋት

ኢንቴል ፋብሪካ ዋና ቀጣሪ — ምርት፣ ሎጂስቲክስ፣ ጥራት ቁጥጥር ሚናዎች። careers.intel.com/il

## ዋና ድርጅቶች

- IAEJ ቂርያት ጋት — ቂሽ 5፣ ስ.ቁ 08-680-1044
- አጋም ማህበር ቂርያት ጋት — ትምህርት እና ባህላዊ ፕሮግራሞች
- ቴነ ብሪዩት — ሄርዝል 12
- BTL ቂርያት ጋት — ቤጊን 2፣ ስ.ቁ 08-681-5100

## ሰግድ

ከተማ ፓርክ — አጋም ማህበር + ከተማ አስተዳደር — ~800 ተሳታፊዎች።`,
    },
  },

  {
    slug: "rehovot-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה ברחובות — מדריך 2026",
      en: "Ethiopian-Israeli community in Rehovot — 2026 guide",
      am: "በሬሆቮት የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-5,500 יוצאי אתיופיה ברחובות. גישה לוייצמן ולמוסדות אקדמיים.",
      en: "~5,500 Ethiopian-Israelis in Rehovot. Access to Weizmann Institute and academic institutions.",
      am: "~5,500 ኢትዮጵያ-እስራኤላውያን ሬሆቮት። ዌይዝማን ኢንስቲቲዩት እና አካዳሚክ ተቋማት ቅርበት።",
    },
    bodies: {
      he: `## רחובות — עיר מדע עם קהילה חזקה

לפי נתוני למ"ס 2024, כ-**5,500 בני קהילת יוצאי אתיופיה** מתגוררים ברחובות. העיר מאופיינת בקרבה למוסדות אקדמיים: **מכון ויצמן למדע** ו**הפקולטה לחקלאות של האוניברסיטה העברית** שניהם ממוקמים ברחובות — מה שיוצר הזדמנויות ייחודיות לבני הקהילה בתחומי מדע, חקלאות וטכנולוגיה.

## שכונות עיקריות

**שכונה ד'** — הריכוז הגבוה ביותר בקהילה הרחובותית, עם מרכז קהילתי פעיל.

**שכונה ג'** — ריכוז משמעותי נוסף, קרוב לתחנות רכבת ואוטובוס.

## ארגונים קהילתיים

**עמותת ידיד — רחובות**
- כתובת: הרצל 40, רחובות
- טל: 08-934-0011
- שירותים: ייעוץ זכויות, ליווי מול מוסדות, עזרה בהגשת מלגות

**IAEJ — נציגות רחובות (אל"י)**
- כתובת: ביאליק 12, רחובות
- טל: 08-934-5060
- שירותים: ייצוג משפטי, ייעוץ תעסוקה, תוכניות נוער

**בית כנסת ביטא ישראל רחובות**
- כתובת: הדקל 3, שכונה ד'
- מרכז רוחני-קהילתי, לימוד מסורת ביטא ישראל

## שירותי בריאות

**תנה בריאות — מרפאת רחובות**
- כתובת: חרצית 5, רחובות (בשיתוף קופ"ח מכבי)
- שעות: א-ה 08:00-18:30
- שפות: עברית, אמהרית, אנגלית
- שירותים: רפואה כללית, בדיקות HbA1c, ייעוץ תזונה, ייעוץ נפשי

## הזדמנויות בחקלאות ומדע

**הפקולטה לחקלאות, מזון וסביבה — האוניברסיטה העברית**
הפקולטה מציעה תכנית חונכות ייחודית לסטודנטים מקהילות מוחלשות. בני קהילה יוצאי אתיופיה השתתפו בפרויקטי מחקר חקלאי עם קשרים לחקלאות בת-קיימא.

**מכון ויצמן** — הציע בעבר תוכניות "Open Weizmann" לבני נוער. פנו ל[מרכז ויצמן לנוער](https://www.weizmann.ac.il/youth) לפרטים.

## תעסוקה

**לשכת התעסוקה רחובות**
- כתובת: ז'בוטינסקי 8, רחובות. טל: 08-940-7700
- ייעוץ בשפה האמהרית בתיאום מראש

**ORT ישראל — רחובות**
- מכללה מקצועית עם תכניות לסטודנטים יוצאי אתיופיה

**חקלאות ואגרו-טכנולוגיה** — מקור תעסוקה ייחודי לאזור: חוות השפלה, חממות, חברות אגרו-טק.

## BTL — שירות קליטה

**BTL רחובות**
- כתובת: הרצל 12, רחובות. טל: 08-934-5200
- שעות: א-ה 08:30-13:00

## ציון הסיגד

הקהילה הרחובותית מקיימת טקס סיגד ב**פארק ויצמן**. ארגון: IAEJ רחובות + ידיד רחובות.

## ראו גם

- [כל הערים — קהילות אתיופיות](/he/cities)
- [מלגות לסטודנטים 2026](/he/news/scholarships-guide-2026)
- [תנה בריאות — פרופיל ארגון](/he/orgs/tene-briut)`,
      en: `## Rehovot — science city with a strong community

~5,500 Ethiopian-Israeli community members in Rehovot (CBS 2024). Proximity to the Weizmann Institute and the Hebrew University Faculty of Agriculture creates unique opportunities in science, agriculture, and technology.

## Key organisations

- **Yadid Rehovot** — Herzl 40, tel 08-934-0011. Rights counselling, institutional support, scholarship assistance.
- **IAEJ Rehovot** — Bialik 12, tel 08-934-5060. Legal representation, employment counselling, youth programmes.
- **Beta Israel Synagogue Rehovot** — HaDakel 3, Neighbourhood D. Tradition study and community hub.

## Health services

**Tene Briut Rehovot** — Hartzit 5 (inside Maccabi). Sun–Thu 08:00–18:30. Hebrew, Amharic, English. HbA1c screening, nutrition, mental health.

## Agriculture and science opportunities

**Hebrew University Faculty of Agriculture** — mentoring programme for students from underserved communities. Ethiopian-Israeli students have participated in sustainable agriculture research.

**Weizmann Institute Open Weizmann** — youth science programmes. Details: weizmann.ac.il/youth.

## Employment

**Employment Service Rehovot** — Jabotinsky 8, tel 08-940-7700. Amharic counselling by appointment.

**Agro-technology sector** — unique to the area: farms, greenhouses, agri-tech companies.

## Absorption

**BTL Rehovot** — Herzl 12, tel 08-934-5200. Sun–Thu 08:30–13:00.

## Sigd

Annual ceremony at Weizmann Park — IAEJ Rehovot and Yadid Rehovot.

## See also

- [All cities — community guides](/en/cities)
- [Scholarships guide 2026](/en/news/scholarships-guide-2026)`,
      am: `## ሬሆቮት — ሳይንስ ከተማ

~5,500 ኢትዮጵያ-እስራኤላውያን ሬሆቮት ይኖራሉ (CBS 2024)። ዌይዝማን ኢንስቲቲዩት እና HU ግብርና ፋኩልቲ ቅርቦች።

## ዋና ድርጅቶች

- ያዲድ ሬሆቮት — ሄርዝል 40፣ ስ.ቁ 08-934-0011
- IAEJ ሬሆቮት — ቢያሊክ 12፣ ስ.ቁ 08-934-5060
- ቴነ ብሪዩት — ሃርዚት 5
- BTL ሬሆቮት — ሄርዝል 12፣ ስ.ቁ 08-934-5200

## ሰግድ

ዌይዝማን ፓርክ — IAEJ ሬሆቮት ድርጅት።`,
    },
  },

  {
    slug: "bat-yam-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה בבת ים — מדריך 2026",
      en: "Ethiopian-Israeli community in Bat Yam — 2026 guide",
      am: "በባት ያም የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-4,500 יוצאי אתיופיה בבת ים, בסמוך לתל אביב. שירותים ועבודה במטרופולין.",
      en: "~4,500 Ethiopian-Israelis in Bat Yam, close to Tel Aviv. Services and metropolitan employment.",
      am: "~4,500 ኢትዮጵያ-እስራኤላውያን ባት ያም — ቴል አቪቭ ቅርብ። ሜትሮፖሊታን ስራ ዕድሎች።",
    },
    bodies: {
      he: `## בת ים — שכנה לגוש דן

לפי נתוני למ"ס 2024, כ-**4,500 בני קהילת יוצאי אתיופיה** מתגוררים בבת ים. העיר, הממוקמת ממש מדרום לתל-אביב, מציעה לקהילה גישה נוחה למטרופולין גוש דן — שוק העבודה הגדול ביותר בישראל — תוך שמירה על עלויות מגורים נמוכות יחסית מתל-אביב עצמה.

## שכונות עיקריות

**שכונת רמת הנשיא** — הריכוז הגבוה ביותר, קרוב לחוף הים ולמרכז העיר.

**שכונת קרית שרת** — ריכוז קהילתי נוסף; קרבה לתחנות אוטובוס לתל-אביב.

## ארגונים קהילתיים

**ELEM — תל אביב דרום (משרת גם בת ים)**
- כתובת: פינסקר 14, תל-אביב
- טל: 03-613-9090
- שירותים: תוכניות נוער בסיכון גיל 12-22, ייעוץ פסיכולוגי, קבוצות תמיכה

**מרכז רב-תרבותי עיריית בת ים**
- כתובת: בן גוריון 4, בת ים
- מפעיל: תכניות לקהילות מהגרים, שיעורי עברית, ייעוץ קהילתי

**ידיד — נציגות בת ים**
- שירותי ייעוץ זכויות בתיאום עם סניף ת"א
- טל: 03-561-0011

## שירותי בריאות

**תנה בריאות — מרפאת בת ים**
- כתובת: הרצל 60, בת ים (בשיתוף קופ"ח כללית)
- שעות: א-ה 08:00-18:00
- שפות: עברית, אמהרית, אנגלית
- שירותים: רפואה כללית, מניעת סוכרת, ייעוץ נפשי

## יתרון גוש דן — תעסוקה

**לשכת התעסוקה בת ים**
- כתובת: ביאליק 3, בת ים. טל: 03-613-7700
- גישה מהירה לתפקידים בתל-אביב, יפו, חולון

**תחבורה ציבורית** — מספר בני קהילה נוסעים לתל-אביב ויפו לעבודה; קו רכבת בת-ים–ת"א פועל בתדירות גבוהה.

**קווי תעסוקה עיקריים**:
- לוגיסטיקה ומחסנאות (חולון, אזור תעשייה)
- ניקיון ושמירה (מגדלי תל-אביב)
- סיעוד ועזרה לקשישים (ביקוש גבוה בגוש דן)
- בנייה ותשתיות (אתרי בנייה בת"א-יפו)

## BTL — שירות קליטה

**BTL בת ים**
- כתובת: הרצל 20, בת ים. טל: 03-613-5200
- שעות: א-ה 08:30-13:00

## שירותי הרווחה העירוניים

לשכת הרווחה של בת ים כוללת עובדת סוציאלית דוברת אמהרית (בתיאום מראש). לפנייה: 03-613-8000.

## ציון הסיגד

הקהילה הבת-ימית משתתפת בדרך כלל בטקס הסיגד המרכזי בגוש דן ב**פארק הירקון, תל-אביב**. ארגון משותף: ELEM תל-אביב + ועד קהילת בת ים.

## ראו גם

- [כל הערים — קהילות אתיופיות](/he/cities)
- [ELEM — פרופיל ארגון](/he/education/scholarships/elem-youth-at-risk)
- [תנה בריאות — פרופיל ארגון](/he/orgs/tene-briut)`,
      en: `## Bat Yam — metropolitan advantage

~4,500 Ethiopian-Israeli community members in Bat Yam (CBS 2024). Bat Yam sits immediately south of Tel Aviv, giving the community easy access to the Gush Dan metro labour market while maintaining relatively lower housing costs.

## Key organisations

- **ELEM Tel Aviv South** (serves Bat Yam) — Pinsker 14, Tel Aviv, tel 03-613-9090. At-risk youth 12–22, psychological counselling.
- **Bat Yam Multicultural Centre** — Ben Gurion 4. Migrant community programmes, Hebrew classes, community counselling.
- **Yadid Bat Yam representative** — rights counselling via Tel Aviv branch, tel 03-561-0011.

## Health services

**Tene Briut Bat Yam** — Herzl 60 (inside Clalit). Sun–Thu 08:00–18:00. Hebrew, Amharic, English. Diabetes prevention, mental health.

## Metropolitan employment advantage

**Employment Service Bat Yam** — Bialik 3, tel 03-613-7700. Access to Tel Aviv, Jaffa, and Holon positions.

Main employment streams: logistics/warehousing (Holon industrial zone), cleaning/security (Tel Aviv towers), elderly care (high demand in Gush Dan), construction (Tel Aviv-Jaffa sites).

## Absorption

**BTL Bat Yam** — Herzl 20, tel 03-613-5200. Sun–Thu 08:30–13:00.

**City welfare office** — Amharic-speaking social worker by appointment: 03-613-8000.

## Sigd

Bat Yam community participates in the central Gush Dan Sigd at Yarkon Park, Tel Aviv — joint ELEM Tel Aviv and Bat Yam community committee.

## See also

- [All cities — community guides](/en/cities)
- [ELEM — organisation profile](/en/education/scholarships/elem-youth-at-risk)`,
      am: `## ባት ያም — ሜትሮፖሊታን ጠቀሜታ

~4,500 ኢትዮጵያ-እስራኤላውያን ባት ያም ይኖራሉ (CBS 2024)። ቴል አቪቭ ደቡባዊ ጎረቤት — የጉሽ ዳን ሥራ ገበያ ቀላል ተደራሽነት።

## ዋና ድርጅቶች

- ELEM ቴል አቪቭ ደቡብ — ፒንስከር 14፣ ስ.ቁ 03-613-9090
- ባት ያም ሁለገብ ማዕከል — ቤን ጉሪዮን 4
- ቴነ ብሪዩት — ሄርዝል 60
- BTL ባት ያም — ሄርዝል 20፣ ስ.ቁ 03-613-5200

## ሰግድ

ያርቆን ፓርክ ቴል አቪቭ — ELEM ቴል አቪቭ ጋር ጋራ ስነ-ስርዓት።`,
    },
  },

  {
    slug: "or-yehuda-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["cities", "community"],
    title: {
      he: "קהילת יוצאי אתיופיה באור יהודה — מדריך 2026",
      en: "Ethiopian-Israeli community in Or Yehuda — 2026 guide",
      am: "በኦር ዬሁዳ የኢትዮጵያ-እስራኤል ማህበረሰብ — የ2026 መመሪያ",
    },
    excerpt: {
      he: "כ-3,500 יוצאי אתיופיה באור יהודה, קהילה מגובשת עם מרכז תרבות פעיל.",
      en: "~3,500 Ethiopian-Israelis in Or Yehuda, a cohesive community with an active cultural centre.",
      am: "~3,500 ኢትዮጵያ-እስራኤላውያን ኦር ዬሁዳ — ሕብረ-ሰዓት ማህበረሰብ፣ ፈעቃ ባህላዊ ማዕከል።",
    },
    bodies: {
      he: `## אור יהודה — קהילה מגובשת בלב גוש דן

לפי נתוני למ"ס 2024, כ-**3,500 בני קהילת יוצאי אתיופיה** מתגוררים באור יהודה — עיר קטנה הממוקמת בין תל-אביב לבן-גוריון. גודלה הקטן יחסי של העיר (כ-38,000 תושבים) הופך את הקהילה לפרופורציונלית ומשמעותית: בני הקהילה מהווים כ-9% מאוכלוסיית העיר.

## שכונות עיקריות

**שכונה ב'** — ריכוז הגבוה ביותר של הקהילה בעיר. בית-ספר יסודי "גלים" שבשכונה מונה אחוז תלמידים יוצאי אתיופיה גבוה מהממוצע הארצי.

**שכונת ותיקים** — קהילה ותיקה שמגיעה מגל העלייה הראשון בשנות ה-80.

## הזדמנות תעסוקה ייחודית: שדה התעופה בן-גוריון

**נמל התעופה בן-גוריון** ממוקם במרחק נסיעה קצר מאוד מאור יהודה — כ-5 קילומטרים. הנמל מעסיק אלפי עובדים בתחומים: אבטחה, לוגיסטיקה, שירותי קרקע, ניקיון ושמירה. קהילת אור יהודה נהנה מפריבילגיה גיאוגרפית מובהקת: נגישות מהירה ועלויות נסיעה נמוכות לתפקידים בנמל.

**גיוס לנמל**: דרך חברות אבטחה (ICM Security, ICTS) ולוגיסטיקה — פנו ללשכת התעסוקה אור יהודה לרשימה מעודכנת.

## ארגונים קהילתיים

**מרכז תרבות קהילת יוצאי אתיופיה אור יהודה**
- כתובת: הדר 6, שכונה ב', אור יהודה
- טל: 03-535-0022
- מפעיל: חוגים לנוער ומבוגרים, ימי עיון, לימוד אמהרית, ועדת נשים, ועדת זקנים
- **ייחודי**: המרכז מפעיל גם "קבוצת גשר" — מפגשים בין-דוריים בין הדור הראשון לדור השני

**ידיד — נציגות אור יהודה**
- שירות ייעוץ זכויות בתיאום עם ידיד תל-אביב
- טל: 03-561-0011

**בית כנסת ביטא ישראל אור יהודה**
- כתובת: הדר 4, שכונה ב'
- מרכז רוחני-קהילתי; מיחוד: קיסים מקוריים שעלו בגל הראשון עדיין מנהיגים את הקהילה

## שירותי בריאות

**תנה בריאות — מרפאת אור יהודה**
- כתובת: ז'בוטינסקי 22, אור יהודה (בשיתוף קופ"ח מכבי)
- שעות: א-ה 08:00-18:00
- שפות: עברית, אמהרית
- שירותים: רפואה כללית, בדיקות HbA1c, מניעת סוכרת, ייעוץ נפשי

## תעסוקה

**לשכת התעסוקה אור יהודה**
- כתובת: העצמאות 10, אור יהודה. טל: 03-535-7700
- קשרים עם מעסיקי נמל בן-גוריון ואזור התעשייה

**תחומי תעסוקה עיקריים**:
- אבטחה ושמירה (נמל בן-גוריון)
- לוגיסטיקה ומחסנאות (אזורי תעשייה סמוכים)
- בנייה ושיפוצים (גוש דן)

## BTL — שירות קליטה

**BTL אור יהודה**
- כתובת: סוקולוב 5, אור יהודה. טל: 03-535-5200
- שעות: א-ה 08:30-13:00

## חינוך — בית-ספר "גלים"

בית-ספר יסודי "גלים" בשכונה ב' — כ-35% מהתלמידים יוצאי אתיופיה. בית-הספר משתתף בתוכנית "גשר" הלאומית לשיפור הישגים לימודיים לבני קהילה.

## ציון הסיגד

הקהילה האור-יהודית מקיימת טקס סיגד ב**פארק העירוני** — הקהילה הקטנה אך מגובשת מושכת כ-500 משתתפים. ארגון: מרכז התרבות + בית-הכנסת ביטא ישראל.

## ראו גם

- [כל הערים — קהילות אתיופיות](/he/cities)
- [סיגד 2026](/he/news/sigd-2026-complete-guide)
- [תנה בריאות — פרופיל ארגון](/he/orgs/tene-briut)`,
      en: `## Or Yehuda — cohesive community near Ben Gurion Airport

~3,500 Ethiopian-Israeli community members in Or Yehuda (CBS 2024) — ~9% of the city's total population. Small city size makes the community proportionally significant and cohesive.

## Unique employment advantage: Ben Gurion Airport

Ben Gurion International Airport is approximately 5 km from Or Yehuda. The airport employs thousands in security, logistics, ground services, and maintenance. The community benefits from a clear geographic advantage — fast commute, low travel cost. Apply through security firms (ICM Security, ICTS) and logistics companies via the Employment Service.

## Key organisations

- **Ethiopian Community Cultural Centre Or Yehuda** — HaDar 6, Neighbourhood B, tel 03-535-0022. Youth and adult groups, Amharic classes, women's committee, elders' committee. Special: "Gesher (Bridge) Group" — intergenerational meetings between first and second generation.
- **Yadid Or Yehuda representative** — rights counselling via Tel Aviv branch, tel 03-561-0011.
- **Beta Israel Synagogue Or Yehuda** — HaDar 4, Neighbourhood B. Original Kessim from the first aliyah wave still lead the community.

## Health services

**Tene Briut Or Yehuda** — Jabotinsky 22 (inside Maccabi). Sun–Thu 08:00–18:00. Hebrew, Amharic. HbA1c screening, diabetes prevention, mental health.

## Employment

**Employment Service Or Yehuda** — HaAtzmaut 10, tel 03-535-7700. Airport employer connections; industrial zone referrals.

Main employment streams: airport security and maintenance, logistics/warehousing, construction/renovation.

## Absorption

**BTL Or Yehuda** — Sokolov 5, tel 03-535-5200. Sun–Thu 08:30–13:00.

## Education: "Galim" elementary school

"Galim" school in Neighbourhood B — ~35% Ethiopian-Israeli students. Participates in the national "Gesher" achievement-improvement programme.

## Sigd

Annual ceremony at the city park — ~500 participants. Cultural centre and Beta Israel Synagogue organise together.

## See also

- [All cities — community guides](/en/cities)
- [Sigd 2026](/en/news/sigd-2026-complete-guide)`,
      am: `## ኦር ዬሁዳ — ቤን ጉሪዮን ማዕከለ-አየር ቅርብ

~3,500 ኢትዮጵያ-እስራኤላውያን ኦር ዬሁዳ ይኖራሉ (CBS 2024)። ~9% ከሕዝቡ። ቤን ጉሪዮን ማዕከለ-አየር ~5 ኪ.ሜ — ዋና የሥራ ዕድል።

## ዋና ድርጅቶች

- ኢትዮጵያ ባህላዊ ማዕከል ኦር ዬሁዳ — ሃዳር 6፣ ስ.ቁ 03-535-0022
- ያዲድ ኦር ዬሁዳ — ስ.ቁ 03-561-0011
- ቴነ ብሪዩት — ዣቦቲንስኪ 22
- BTL ኦር ዬሁዳ — ሶኮሎቭ 5፣ ስ.ቁ 03-535-5200

## ሰግድ

ከተማ ፓርክ — ~500 ተሳታፊዎች። ባህላዊ ማዕከል + ቤታ እስራኤል ሲናጎግ ድርጅት።`,
    },
  },

  {
    slug: "falash-mura-rights-guide-2026",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    tags: ["immigration", "policy"],
    title: {
      he: "פלאשמורה 2026 — זכויות הקליטה ומסלול העלייה",
      en: "Falash Mura 2026 — absorption rights and the aliyah track",
      am: "ፋላሽ ሙራ 2026 — የቅበላ መብቶች እና የአሊያ መንገድ",
    },
    excerpt: {
      he: "ממשלת ישראל אישרה המשך הבאת פלאשמורה מגונדר. 7,000 בתהליך — עדכון על זכויות, חידוש הגיור ומי זכאי.",
      en: "The Israeli government approved continued Falash Mura aliyah from Gondar. 7,000 in process — update on rights, conversion procedure, and who qualifies.",
      am: "እስራኤል ፋላሽ ሙራ ከጎንደር ቀጠሮ አሊያ አፀደቀ። 7,000 በሂደት — ስለ መብቶች፣ ጥምቀት እና ብቁ ለሆኑ ዝማኔ።",
    },
    bodies: {
      he: `## מי הם הפלאשמורה

פלאשמורה הם צאצאי יהודים אתיופים (ביטא ישראל) שהומרו לנצרות — חלקם בכפיית המיסיון בתקופת השלטון האיטלקי ובתקופות לחץ שונות — ומבקשים לחזור לזהותם היהודית ולעלות לישראל. המונח שנוי במחלוקת (יש המעדיפים "בני ביטא ישראל" או "עולים מגונדר").

## מה אישרה הממשלה ב-2024-2026

ממשלת ישראל אישרה בהחלטה מ-2024 המשך העלאת פלאשמורה ממחנות גונדר ואדיס אבבה. קצב ההגעה המאושר: **כ-1,400 עולים בשנה** עד 2027. נכון לאפריל 2026, כ-**7,000 אנשים** נמצאים בשלבי עיבוד שונים.

## מסלול העלייה — איך זה עובד

1. **רישום ב-NACOEJ / סוכנות היהודית** בגונדר/אדיס אבבה — אישור זיקה למשפחה בישראל
2. **בדיקת רקע** על-ידי הסוכנות + משרד הפנים הישראלי
3. **אשרת כניסה** — תהליך מדורג (לא "עלייה" מלאה אוטומטית)
4. **קליטה במרכז קליטה מיוחד** — רוב המגיעים ל-אשקלון (מרכז קליטה "גב-ים") או נתניה, תוכנית 12 חודשים

## זכויות הקליטה — מסלול שונה

הפלאשמורה אינם מגיעים תחת חוק השבות האוטומטי (אלא אם הם בני זוג/ילדים של עולים שכבר עלו). הם מגיעים תחת **החלטת ממשלה** ייעודית:

- **סל קליטה**: ₪9,000 לנפש (לעומת ₪12,500 לעולה רגיל)
- **מענק דיור**: ₪50,000 חד-פעמי
- **אולפן**: 6 חודשים מסובסד — עם אפשרות הארכה
- **ביטוח לאומי**: זכאות מלאה לאחר 6 חודשים

## גיור וחזרה ביהדות — ההליך

הרבנות הראשית קבעה שפלאשמורה שהומרו לנצרות זקוקים **לגיור או חזרה ביהדות** לפני הכרה מלאה:
- אורך ממוצע: 18-24 חודש
- כולל: לימוד יהדות, שמירת מצוות, טבילה במקווה, הופעה בפני בית-דין
- **ילדים עד גיל 13** — מועמדים לגיור מזורז עם ההורים

## שאלה נפוצה: "האם הפלאשמורה יהודים?"

**תשובה הלכתית**: פלאשמורה שהוריהם/סביהם היו יהודים אינם מוגדרים יהודים עד השלמת גיור — אולם ה**זיקה ההיסטורית** מוכרת ומשמשת בסיס לאפשרות הגיור. קהילת ביטא ישראל (יהודים אתיופים שלא הומרו) הכירה באחיה ומשפחותיה שחזרו.

## מתח בתוך הקהילה

יש מתח בין עולים ותיקים לבין המגיעים החדשים — בחלקו נוגע לתפיסות "מי יהודי", ובחלקו לחצים על שוק הדיור ושירותי הרווחה. ארגונים כמו IAEJ ופידל קוראים לדיאלוג קהילתי על כך.

## NACOEJ ו-JAFI — מי עוזר

- **NACOEJ** — מסייע לפלאשמורה בגונדר: בתי-ספר, תמיכה, תיעוד. nacoej.org
- **הסוכנות היהודית (JAFI)** — מתאמת את העלאה בפועל. משרד גונדר: +251-58-111-3xxx

## ראו גם

- [Falash Mura — עדכון עלייה 2024](/he/news/falash-mura-aliyah-2024-update)
- [Falash Mura — מילון](/he/glossary/falash-mura)
- [זכויות עולים — מסלולים](/he/rights/falash-mura-direct-absorption)`,
      en: `## Who are the Falash Mura

The Falash Mura are descendants of Ethiopian Jews (Beta Israel) who converted to Christianity under missionary coercion and now seek to return to their Jewish identity and make aliyah.

## Government approval 2024–2026

Israel approved continued Falash Mura aliyah at ~1,400/year until 2027. As of April 2026, ~7,000 individuals are at various processing stages.

## The aliyah track

1. Register with NACOEJ / Jewish Agency in Gondar/Addis Ababa — confirm family ties in Israel
2. Background check
3. Entry visa (staged process, not automatic full aliyah)
4. Absorption at a dedicated centre — most go to Ashkelon (Giv'im) or Netanya, 12-month programme

## Absorption rights — a different track

Falash Mura arrive under a dedicated government decision, not automatic Law of Return:
- Absorption basket: ₪9,000/person (vs ₪12,500 standard oleh)
- Housing grant: ₪50,000 one-time
- Ulpan: 6-month subsidised Hebrew, extendable
- National Insurance: full eligibility after 6 months

## Conversion / return to Judaism

The Chief Rabbinate requires formal conversion or "return to Judaism" (18–24 months): Jewish studies, mitzvah observance, mikveh immersion, rabbinical court. Children under 13 can undergo expedited conversion with parents.

## FAQ: "Are Falash Mura Jewish?"

Under Halacha: not defined as Jewish until conversion is complete, but historical connection is recognised as the basis for conversion eligibility. The Beta Israel community has largely welcomed returning family members.

## NACOEJ and JAFI

- **NACOEJ**: supports Falash Mura in Gondar. nacoej.org
- **Jewish Agency (JAFI)**: coordinates aliyah. Gondar office: +251-58-111-3xxx

## See also

- [Falash Mura aliyah — 2024 update](/en/news/falash-mura-aliyah-2024-update)
- [Falash Mura — glossary](/en/glossary/falash-mura)`,
      am: `## ፋላሽ ሙራ ማን ናቸው

ፋላሽ ሙራ ወደ ክርስትና የተቀየሩ የቤታ እስራኤል ዝርያ ናቸው። ወደ አይሁዳዊ ማንነታቸው ተመልሰው ወደ እስራኤል ለመሄድ ይፈልጋሉ።

## ምን ተፈቀደ 2024-2026

~1,400 በዓመት እስከ 2027። ሚያዝያ 2026 ~7,000 ሰዎች ሂደት ውስጥ ናቸው።

## የቅበላ መብቶች

- ₪9,000/ሰው
- ₪50,000 አንድ ጊዜ የቤት እርዳታ
- 6 ወር ኡልፓን
- ከ6 ወር ቡኋላ ብሄራዊ ኢንሹራንስ

## ጥምቀት ሂደት

18-24 ወር፣ የአይሁዳዊ ትምህርት ያካትታል፣ ሚቅቬ፣ ሃይማኖታዊ ፍርድ ቤት።

## NACOEJ እና JAFI

- NACOEJ — ጎንደር ፋላሽ ሙራ ይደግፋል — nacoej.org
- JAFI — አሊያ ያስተባብራል`,
    },
  },

  // ── Batch 4 — 10 employment-focused articles (TED Content & SEO) ──────────

  {
    slug: "nursing-career-guide-ethiopian",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "education"],
    title: {
      he: "מסלול סיעוד לנשים יוצאות אתיופיה — המדריך המלא",
      en: "Nursing career guide for Ethiopian-Israeli women — the complete guide",
      am: "ለኢትዮጵያ-እስራኤላዊ ሴቶች የነርሲንግ ሙያ መመሪያ — ሙሉ መመሪያ",
    },
    excerpt: {
      he: "סיעוד הוא אחד מהמסלולים עם הביקוש הגבוה ביותר בקהילה. ממה מתחילים, כמה מרוויחים, ואיפה לומדים.",
      en: "Nursing is one of the most in-demand career paths in the community. Where to start, salary expectations, and where to study.",
      am: "ነርሲንግ ከማህበረሰቡ በጣም ፈላጊ ሙያዎች አንዱ ነው። ከምን ይጀምሩ፣ ምን ያህል ያገኛሉ።",
    },
    bodies: {
      he: `## למה סיעוד מתאים לנשים מהקהילה

סיעוד הוא אחד מהמקצועות שבהם נשים מקהילת יוצאי אתיופיה מוצאות את עצמן בצורה הטבעית ביותר. המקצוע מתואם עם ערכים תרבותיים של טיפול ודאגה, מציע שעות גמישות לאמהות, ומספק שכר יציב משמעותית מעל לממוצע במשק.

לפי נתוני לשכת הסיעוד של משרד הבריאות (2024), ישראל זקוקה ל-**18,000 אחיות נוספות** עד 2030 — ויש ביקוש גבוה במיוחד לאחיות דוברות אמהרית בערים עם ריכוז קהילתי.

## שתי רמות — LPN ו-RN

### LPN — פרקליט מעשי מוסמך
- **משך לימודים**: שנה אחת (1,500 שעות)
- **מסגרת**: מכללות ORT, אולפני בריאות
- **שכר ממוצע**: ₪6,500–₪8,500 לחודש
- **תחומי עבודה**: בתי-אבות, מרפאות קהילתיות, שירותי בית

### RN — אחות/אח רשום/ה
- **משך לימודים**: שנתיים–שלוש
- **מסגרות לימוד**:
  - **מכללת הדסה ירושלים** — תכנית סיעוד 2.5 שנה, כ-180 מקומות בשנה
  - **בית-הספר לסיעוד רמב"ם, חיפה** — תכנית 3 שנים, שיתוף עם אוניברסיטת חיפה
  - **אורט ישראל** — מסלול LPN ו-RN בנתניה, לוד, ב"ש
- **שכר ממוצע RN**: ₪9,000–₪13,000 לחודש (עולה עם ניסיון)

## מימון הלימודים — שירות התעסוקה

שירות התעסוקה (taasuka.gov.il) ממן הכשרות לסיעוד לזכאים:
1. היכנסו ללשכת התעסוקה הקרובה
2. בקשו "הפנייה להכשרה מקצועית — סיעוד"
3. הגישו תכנית לימודים ואישור קבלה ממוסד מוכר
4. לשכת התעסוקה מכסה שכר לימוד + דמי מחיה במהלך ההכשרה

## עבודה בזמן לימודים

מסלולי לימוד ערב ב-ORT מאפשרים לעבוד כ-LPN ולהתקדם ל-RN בלי לוותר על הכנסה. חלקן עובדות 5–6 משמרות לילה בחודש כ-LPN תוך כדי לימודים.

## אחיות דוברות אמהרית — ביקוש ייחודי

בבתי-חולים וקופות-חולים בערים עם ריכוז קהילתי גבוה (נתניה, לוד, ב"ש, קרית מלאכי) יש ביקוש לאחיות דוברות אמהרית. אחיות דוברות-שתי-שפות מקבלות לעיתים תוספת תפקיד של **מתאמת תרבות** (Cultural Liaison) — תוספת שכר ₪800–₪1,500/חודש.

## קידום לראש צוות ואחות מחלקה

- **ראש צוות (Charge Nurse)**: ₪13,000–₪18,000, לאחר 3-5 שנות ניסיון
- **אחות מחלקה (Head Nurse)**: ₪18,000–₪25,000, לאחר 8-10 שנות ניסיון
- **Master's in Nursing**: האוניברסיטה העברית ובר-אילן מציעות מסלולי הנהלת סיעוד

## תמיכת טבקה מפני הפליה

אם נתקלתם בהפליה בתהליך קבלה ללימודים או לעבודה — טבקה מספק ייעוץ משפטי חינמי. טל: 03-629-4040.

## שקילות השכלת סיעוד מחו"ל

אחיות שהוכשרו מחוץ לישראל יכולות לבקש הכרה: משרד הבריאות — לשכת הסיעוד, טל: 02-5082100. יש צורך בקורס השלמה (6-12 חודשים) ובבחינת רישוי.

## ראו גם

- [מסלולי קריירה — בריאות](/he/careers/healthcare)
- [שירות התעסוקה — הכשרות מסובסדות](/he/rights/vocational-training-vouchers-immigrants)
- [טבקה — פרופיל ארגון](/he/orgs/tebeka)`,
      en: `## Why nursing fits the community

Nursing aligns naturally with care-oriented cultural values, offers flexible shift scheduling compatible with family life, and delivers significantly above-average wages. Israel's Ministry of Health (2024) projects a shortage of 18,000 nurses by 2030, with especially high demand for Amharic-speaking nurses in Ethiopian-concentrated cities.

## LPN vs RN

LPN (practical nurse): 1-year programme (~1,500 hours), salary ₪6,500–₪8,500/month. Studies at ORT Israel or health colleges. RN (registered nurse): 2–3 year programme. Key schools: Hadassah College Jerusalem (2.5 years, ~180 places/year), Rambam Nursing School Haifa (3 years, joint with Haifa University), ORT Israel (Netanya, Lod, Beersheba). Average RN salary: ₪9,000–₪13,000/month.

## Employment Service funding

The Employment Service (taasuka.gov.il) funds nursing training for eligible applicants. Bring a study plan and acceptance letter from an accredited institution. Funding covers tuition plus monthly living stipend.

## Amharic-speaking nurses in demand

Hospitals and sick funds in high-community cities specifically seek Amharic-speaking nurses. Bilingual nurses can receive a Cultural Liaison supplement of ₪800–₪1,500/month.

## Career ladder

Charge Nurse (3–5 years): ₪13,000–₪18,000. Head Nurse (8–10 years): ₪18,000–₪25,000. Tebeka provides free discrimination support: 03-629-4040.

## See also

- [Career paths — health](/en/careers/healthcare)
- [Employment Service — subsidised training](/en/rights/vocational-training-vouchers-immigrants)`,
      am: `## ስለምን ነርሲንግ

ነርሲንግ ለቤተሰብ ሕይወት ተስማሚ ፈረቃ፣ ጠንካራ ደመወዝ፣ እና ከፍተኛ ፍላጎት ይሰጣል። የጤና ሚኒስቴር 2024 እስከ 2030 18,000 ነርሶች ያስፈልጋሉ ይላል።

## LPN vs RN

LPN: 1 ዓመት ስልጠና — ₪6,500-8,500/ወር። RN: 2-3 ዓመት — ₪9,000-13,000/ወር። ዋና ትምህርት ቤቶች: ሃዳሳ ኮሌጅ፣ ራምባም ሃይፋ፣ ORT እስራኤል።

## ስልጠና ክፍያ

የቅጥር አገልግሎት ለብቁ ጠያቂዎች ስልጠና ይሸፍናል። taasuka.gov.il ይጎብኙ።

## አማርኛ ተናጋሪ ነርሶች

አማርኛ ተናጋሪ ነርሶች ₪800-1,500/ወር ባህላዊ ድልድይ ተጨማሪ ያገኛሉ།`,
    },
  },

  {
    slug: "education-teaching-career-ethiopian",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "education"],
    title: {
      he: "מסלול הוראה ועבודה עם נוער לבוגרי הקהילה",
      en: "Teaching and youth work career paths for community graduates",
      am: "ለማህበረሰቡ ምሩቃን የማስተማር እና የወጣቶች ሥራ ሙያ መንገዶች",
    },
    excerpt: {
      he: "מורה, יועץ חינוכי, מחנך — תפקידים עם ביקוש גבוה בבתי הספר עם תלמידים יוצאי אתיופיה.",
      en: "Teacher, educational counsellor, homeroom teacher — roles in high demand at schools with Ethiopian-Israeli students.",
      am: "አስተማሪ፣ ትምህርት አማካሪ — ለኢትዮጵያ-እስራኤላዊ ተማሪዎች ካሉ ትምህርት ቤቶች ፈላጊ ሚናዎች።",
    },
    bodies: {
      he: `## למה יש ביקוש גבוה למורים מהקהילה

בישראל פועלים כיום כ-320 בתי-ספר יסודיים ותיכוניים עם ריכוז של 20%+ תלמידים ממוצא אתיופי (נתוני משרד החינוך 2024). בתי-ספר אלה מדווחים על **מחסור חמור במורים ויועצים ממוצא אתיופי** — דמויות מודל ומתווכי תרבות שמסייעים בשמירת תלמידים ומניעת נשירה.

משרד החינוך נתן **עדיפות רשמית בגיוס** לבוגרי המקצוע ממוצא אתיופי לתפקידים בבתי-ספר עם ריכוז קהילתי.

## מסלול הכשרה למורים — מכון מופת

### הסמכה להוראה לאחר תואר ראשון
- **גוף מסמיך**: מכון מופת (האוניברסיטאות ומכללות-חינוך)
- **אורך**: שנה אחת
- **מוסדות**: אוניברסיטת בר-אילן, מכללת סמינר הקיבוצים, מכללת בית ברל, לווינסקי-וינגייט

### סולם שכר מורים
- **שנה 1–3**: ₪7,500–₪9,500 ברוטו
- **שנה 5–10**: ₪10,000–₪13,500
- **עם תואר שני + ניסיון**: ₪14,000–₪18,000
- **מחנך כיתה**: ₪12,000–₪15,000

## תפקיד יועץ חינוכי

יועץ חינוכי: ייעוץ אישי לתלמידים, עבודה עם הורים, שת"פ עם שירותי רווחה, מניעת נשירה. הכשרה: 2 שנים (MA / Diploma). **שכר**: ₪10,000–₪15,000 לחודש.

## עובד נוער — נקודת כניסה מהירה

ניתן להתחיל ללא תואר — הסמכה מקוצרת 6-8 חודשים:
- **ELEM** — הסמכה לעובדי נוער דוברי אמהרית
- **אהרי** — מעסיק עו"נ בקהילות פגיעות, כולל שכונות אתיופיות
- **שכר**: ₪7,000–₪10,000 לחודש

## תכנית "אבני ראשה" — מנהיגות חינוכית

מנהלי-בתי-ספר שסיימו אבני ראשה: **שכר ₪20,000-₪30,000** לחודש.

## ELEM ואהרי — הזדמנויות ישירות

ELEM מעסיק 90+ מטפלים ועובדי נוער. אהרי מפעיל תכניות מנטורינג ב-40+ בתי-ספר ומגייס מנטורים ממוצא אתיופי.

## מסלול קריירה שלם

1. עובד נוער (ELEM / אהרי) — 1-3 שנים
2. תואר ראשון בחינוך (בלמידה מרחוק)
3. הסמכה להוראה — שנה מואצת
4. מורה מחנך בבי"ס עם ריכוז קהילתי
5. יועץ חינוכי — 5+ שנות ניסיון
6. מנהל בי"ס — אבני ראשה + ניסיון

## ראו גם

- [ייצוג הולם — הוראה](/he/careers/affirmative-action)
- [ELEM — פרופיל ארגון](/he/education/scholarships/elem-youth-at-risk)
- [אהרי — פרופיל ארגון](/he/rights/aharai-pre-army)`,
      en: `## Why the community is needed in education

Around 320 Israeli schools have 20%+ Ethiopian-Israeli students (Education Ministry 2024). These schools report a critical shortage of Ethiopian-origin teachers and counsellors who serve as cultural role models and reduce dropout rates. The Ministry of Education gives official recruitment preference to Ethiopian-origin graduates for community-concentrated schools.

## Teaching certification after a bachelor's degree

Mofet Institute: 1-year post-BA certification. Institutions: Bar-Ilan, Kibbutzim College, Beit Berl, Levinsky-Wingate. Salary: ₪7,500–₪9,500 (years 1–3), up to ₪14,000–₪18,000 with master's and seniority.

## Educational counsellor

2-year MA or diploma. Salary ₪10,000–₪15,000/month.

## Youth worker — fast entry

ELEM: 6–8 month Amharic-speaker certification, no degree required. Salary ₪7,000–₪10,000/month.

## Career ladder

Youth worker → BA in Education → teaching certification → homeroom teacher → counsellor → Avnei Rosha principal programme (₪20,000–₪30,000/month).

## See also

- [Affirmative action — education](/en/careers/affirmative-action)
- [ELEM — organisation profile](/en/education/scholarships/elem-youth-at-risk)`,
      am: `## ማህበረሰቡ ለምን ያስፈልጋል

~320 ትምህርት ቤቶች 20%+ ኢትዮጵያ-እስራኤላዊ ተማሪዎች አሏቸው። ሁሉም የኢትዮጵያ ዝርያ አስተማሪዎች ከፍተኛ ፍላጎት ይፈለጋሉ።

## ስልጠና

ሞፊቭ ተቋም — 1 ዓመት ። ደመወዝ: ₪7,500-18,000/ወር።

## ወጣት ሠራተኛ

ELEM 6-8 ወር ስልጠና — ዲግሪ አያስፈልግም። ₪7,000-10,000/ወር།`,
    },
  },

  {
    slug: "tech-jobs-salary-benchmark-2026",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "education"],
    title: {
      he: "משכורות בהייטק לבוגרי הקשרת אתיופית — נתוני 2026",
      en: "Tech salaries for Ethiopian-Israeli graduates — 2026 benchmarks",
      am: "ለኢትዮጵያ-እስራኤላዊ ምሩቃን የቴክ ደመወዝ — የ2026 ቅጥር",
    },
    excerpt: {
      he: "כמה מרוויחים בוגרי Tech-Career, ENP ו-Mamram לאחר שנתיים? נתוני שכר עדכניים לתפקידי פיתוח, QA וסייבר.",
      en: "What do Tech-Career, ENP and Mamram graduates earn after two years? Current salary data for dev, QA and cyber roles.",
      am: "Tech-Career፣ ENP እና Mamram ምሩቃን ሁለት ዓመት ቆይቶ ምን ያገኛሉ? ወቅታዊ ደመወዝ ዳታ።",
    },
    bodies: {
      he: `## הפער הנוכחי — נתוני Adva Center

מרכז אדוה פרסם ב-2025 דוח על תעסוקה בהייטק לפי מוצא. **רק 3%** מהעובדים ממוצא אתיופי מועסקים בהייטק לעומת **12%** באוכלוסייה הכללית.

## נתוני שכר לפי תפקיד — 2026

| תפקיד | שנה 1 | אחרי 3 שנים |
|-------|--------|-------------|
| Junior Developer | ₪12,000–₪16,000 | ₪18,000–₪26,000 |
| QA Engineer | ₪10,000–₪14,000 | ₪15,000–₪22,000 |
| Cyber Analyst | ₪13,000–₪18,000 | ₪20,000–₪32,000 |
| Data Analyst | ₪12,000–₪16,000 | ₪18,000–₪28,000 |
| DevOps | ₪15,000–₪20,000 | ₪22,000–₪35,000 |

מקורות: Glassdoor ישראל 2026, AllJobs Q1 2026, נתוני Tech-Career.

## שכר בירושלים לעומת תל-אביב

חברות תל-אביב משלמות בממוצע **18-22% יותר** מירושלים. חברות ב"ש: 10-15% פחות ממרכז, אך גם יוקר המחיה נמוך יותר.

## חברות עם עובדים ממוצא אתיופי

- **Amdocs** — בוגרי Tech-Career בצוותי פיתוח ו-QA
- **Matrix IT** — תמיכה ופיתוח
- **Sela Systems** — ידועה כסביבה נוחה לעובדים ממיעוטים
- **CyberArk** (ב"ש) — בוגרי ENP ו-Tech-Career
- **Check Point** (תל-אביב) — בוגרי Mamram ו-8200

## RSU ואופציות — מה לשאול

חברות ציבוריות נותנות RSU — מניות שמשתחררות לאורך 4 שנים. שאלו בראיון: גודל מנה, לוח זמנים, cliff. אל תוותרו על המשא ומתן.

## עבודה מרחוק

30-40% מתפקידי ההייטק כ-Remote/Hybrid. עובדים בנתניה, ב"ש, לוד יכולים לקבל שכר מרכז עם יוקר מחיה נמוך יותר.

## טיפים למשא-ומתן

1. חקרו שכר שוק (Glassdoor, AllJobs, LinkedIn Salary) לפני הראיון
2. אל תציינו סכום ראשונים
3. הדגישו ניסיון צבאי רלוונטי
4. נהלו משא-ומתן כולל: שכר + RSU + WFH
5. Tech-Career ו-ENP מציעים הכנה למשא-ומתן

## ראו גם

- [Tech-Career — מדריך הכשרה](/he/news/tech-career-bootcamp-guide)
- [ENP Tech-Career — סבב 2026](/he/news/enp-tech-career-2026-cohort)
- [מסלול הייטק](/he/careers/tech)`,
      en: `## The employment gap

Adva Center's 2025 report found only 3% of Ethiopian-origin workers are in high-tech versus 12% for the general population.

## 2026 salary benchmarks

Junior Developer: ₪12,000–₪16,000 (year 1) to ₪18,000–₪26,000 (year 3+). QA Engineer: ₪10,000–₪14,000 to ₪15,000–₪22,000. Cyber Analyst: ₪13,000–₪18,000 to ₪20,000–₪32,000. Data Analyst: ₪12,000–₪16,000 to ₪18,000–₪28,000. Sources: Glassdoor Israel 2026, AllJobs Q1 2026.

## Tel Aviv vs Jerusalem

Tel Aviv pays 18–22% more. Beersheba pays 10–15% less than centre, with proportionally lower cost of living.

## Companies with known Ethiopian-Israeli employees

Amdocs, Matrix IT, Sela Systems, CyberArk (Beersheba), Check Point (Tel Aviv).

## RSUs and negotiation tips

Never quote first. Research Glassdoor/LinkedIn Salary. Negotiate base + RSU + WFH days. Tech-Career and ENP offer pre-offer coaching.

## See also

- [Tech-Career — training guide](/en/news/tech-career-bootcamp-guide)
- [Tech career track](/en/careers/tech)`,
      am: `## የቅጥር ክፍተት

Adva Center 2025: 3% ብቻ ኢትዮጵያ ዝርያ ሃይ-ቴክ — 12% አጠቃላይ ህዝብ ጋር ሲነጻጸር።

## 2026 ደመወዝ

Junior Dev: ₪12,000-16,000 → ₪18,000-26,000. QA: ₪10,000-14,000 → ₪15,000-22,000. Cyber: ₪13,000-18,000 → ₪20,000-32,000.

## ደመወዝ ድርድር

ቁጥር ቀድሞ አይናገሩ። Glassdoor/AllJobs ያጠኑ። RSU + WFH ቀናት ጨምሮ ይደራደሩ།`,
    },
  },

  {
    slug: "army-to-tech-career-path",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "education"],
    title: {
      he: "מהצבא לקריירת הייטק — המסלול לבוגרי יחידות טכנולוגיות",
      en: "From the IDF to a tech career — the path for graduates of technological units",
      am: "ከሰራዊት ወደ ቴክ ሙያ — ለቴክኖሎጂ ክፍሎች ምሩቃን መንገድ",
    },
    excerpt: {
      he: 'ממרחם, מח"ממ, יחידת 8200 — איך בוגרי שירות צבאי טכנולוגי ממנפים את הניסיון לקריירה.',
      en: "From Mamram, Lotem, Unit 8200 — how IDF tech-unit veterans leverage their service into a career.",
      am: "ማምራም፣ ሎቴም፣ ክፍል 8200 — ወታደራዊ ቴክ ምሩቃን ልምዳቸውን ሙያ ያደርጋሉ።",
    },
    bodies: {
      he: `## למה הצבא הוא נקודת פתיחה מצוינת

לפי נתוני ENP ו-Tech-Career (2025), בוגרי יחידות צבאיות טכנולוגיות ממוצא אתיופי מגיעים לתעסוקה בהייטק בשיעור **פי 2.3** מעמיתיהם ללא שירות טכנולוגי. הצבא נותן: כישורי צוות, עבודה תחת לחץ, היכרות עם IT/סייבר, ולעיתים Security Clearance שמקצר דרך לתפקידים.

## יחידות טכנולוגיות רלוונטיות

- **מח"מ (מרחם)** — מחשוב צבאי. ניהול מערכות, IT, networking
- **לותם** — אינטליגנציה ומחשבים. data analysis, אינטגרציה
- **יחידת 8200** — סייבר. פתוחה לבוגרי בגרות עם ניסיון טכני
- **יחידות שידור** — networking, תשתיות

## ניצול מענקי שחרור

בוגרי 3 שנות שירות:
- **מענק בסיס**: ₪8,000–₪12,000
- **מענק מיוחד לשירות טכנולוגי**: +₪15,000 לבוגרי יחידה טכנולוגית
- ניתן לשלב עם מימון Tech-Career / ENP — לימודים ממומנים + דמי מחיה

## כיצד כותבים ניסיון צבאי ב-CV

| ניסיון צבאי | תרגום לעולם האזרחי |
|-------------|---------------------|
| מנהל מערכות במח"מ | Systems Administrator — managed enterprise IT infrastructure |
| מנהל רשת בשידור | Network Engineer — configured communications infrastructure |
| אנליסט מודיעין | Data Analyst — pattern recognition in large datasets |
| קצין 8200 | Cyber / Security Researcher — vulnerability assessment |

הימנעו ממינוחים מסווגים — תרגמו לתיאורים אזרחיים גנריים.

## לוח זמנים: צבא לעבודה ראשונה

| שלב | משך | פעולה |
|-----|-----|--------|
| שחרור | — | בקשה לקרן הכשרה מקצועית |
| חודשים 1–2 | 2 חודשים | Bootcamp prep (freeCodeCamp / LeetCode) |
| חודשים 3–8 | 6 חודשים | Tech-Career / ENP cohort |
| חודשים 9–12 | 3-4 חודשים | Job search, ראיונות |
| **שנה 1** | **12 חודשים** | **Junior role תוך שנה מהשחרור** |

## חברות שמגייסות מיחידות טכנולוגיות

תל-אביב: CyberArk, Check Point, Palo Alto Networks (IL). ב"ש: Elbit Systems, Rafael (spin-offs), BGU startups.

## ראו גם

- [Tech-Career — מדריך הכשרה](/he/news/tech-career-bootcamp-guide)
- [משכורות הייטק 2026](/he/news/tech-jobs-salary-benchmark-2026)
- [ENP Tech-Career — סבב 2026](/he/news/enp-tech-career-2026-cohort)`,
      en: `## Why IDF service is a strong starting point

ENP and Tech-Career data (2025): Ethiopian-Israeli tech-unit veterans enter high-tech at 2.3x the rate of peers without tech service. Key assets: team skills, pressure management, IT/cyber familiarity, and potential Security Clearance.

## Relevant IDF tech units

Mamram (military computing): Systems Admin, IT, networking. Lotem (intelligence and computers): data analysis, integration. Unit 8200 (cyber): security research, vulnerability assessment.

## Discharge grants

3-year service: ₪8,000–₪12,000 base grant, plus ₪15,000 additional for tech-unit graduates. Combinable with Tech-Career/ENP funding for fully-funded training plus monthly stipend.

## CV translation

Mamram systems manager → "Systems Administrator — managed enterprise IT infrastructure." Unit 8200 officer → "Cyber/Security Researcher — vulnerability assessment." Avoid classified terms.

## Timeline

Months 1–2: bootcamp prep. Months 3–8: Tech-Career/ENP. Months 9–12: job search. Target: junior role within 12 months of discharge.

## See also

- [Tech-Career — training guide](/en/news/tech-career-bootcamp-guide)
- [Tech salaries 2026](/en/news/tech-jobs-salary-benchmark-2026)`,
      am: `## ለምን ሰራዊት ጥሩ ጅምር ነው

ENP እና Tech-Career 2025: ቴክ ክፍሎች ምሩቃን 2.3 እጥፍ ፈጥነው ቴክ ሙያ ያገኛሉ።

## ዋና IDF ቴክ ክፍሎች

ማምራም → Systems Admin/IT. ሎቴም → ዳታ ትንታኔ. ክፍል 8200 → ሳይበር.

## የወጪ ምርቶች

₪8,000-12,000 + ₪15,000 ለቴክ ክፍሎች ምሩቃን።

## ወደ ሥራ ጊዜ ሰሌዳ

ወር 1-2: ቡት ካምፕ ዝግጅት. ወር 3-8: Tech-Career/ENP. ወር 9-12: ቅጥር ፍለጋ.`,
    },
  },

  {
    slug: "public-sector-careers-ethiopian",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "policy"],
    title: {
      he: "עבודה בשירות המדינה — מדריך ייצוג הולם ליוצאי אתיופיה",
      en: "Civil service careers — affirmative representation guide for Ethiopian-Israelis",
      am: "የሲቪል ሰርቪስ ሙያ — ለኢትዮጵያ-እስራኤላውያን ፍትሃዊ ውክልና መመሪያ",
    },
    excerpt: {
      he: "חוק ייצוג הולם מבטיח העדפה ליוצאי אתיופיה בשירות המדינה. אלו משרות מתאימות ואיך מגישים מועמדות.",
      en: "The Affirmative Representation Law guarantees preference for Ethiopian-Israelis in civil service. Which roles to target and how to apply.",
      am: "ፍትሃዊ ውክልና ህግ ለኢትዮጵያ-እስራኤላውያን ቅድሚያ ይሰጣል። ምን ሙያዎች ያነጣጥሩ እና እንዴት ያመለክቱ።",
    },
    bodies: {
      he: `## כיצד ייצוג הולם עובד בפועל

חוק ייצוג הולם (2000) מחייב כל גוף ממשלתי לתת **עדיפות** לממוצא אתיופי כשיש שני מועמדים שקולים. ועדות מכרז מחויבות גם לפרסם מודעות בפלטפורמות המיועדות לקהילה.

החוק אינו מבטיח קבלה אוטומטית — אלא עדיפות שקולה.

## פורטל המשרות הממשלתי — pras.gov.il

1. בטופס ההגשה — סמנו "מוצא אתיופי" תחת "ייצוג הולם"
2. שמרו אישור הגשה — זה הוכחתכם
3. אם נדחיתם — יש זכות לבקש הסבר מנומק בכתב (סעיף 6 לחוק)

## משרדים עם ייצוג גבוה — ממליצים להגיש

- **משרד הקליטה (5.4%)**: רפרנטים לקליטה, מנהלי מרכזי קליטה, מתאמי שפה
- **משרד החינוך (3.1%)**: מפקחים, מנהלי בתי-ספר, רכזי שכבה
- **משרד הרווחה (1.0% — מגייס אקטיבית)**: עו"ס, רכזי-משפחה, מנהלי מרכזי קהילה

## תפקידים ייעודיים עם ייצוג הולם אקטיבי

שירות התעסוקה מגייס יועצים ממוצא אתיופי בערים עם ריכוז קהילתי. מפקחי חינוך נדרשים לבתי-ספר עם ריכוז קהילתי (5+ שנות הוראה). רשויות בנתניה, לוד, קרית מלאכי, ב"ש מגייסות עו"ס דוברי אמהרית.

## סולם שכר עובדי מדינה

- **כניסה (דרגה 38-40)**: ₪7,500–₪10,000
- **5-8 שנות ניסיון (דרגה 42-45)**: ₪12,000–₪18,000
- **פנסיה תקציבית**: שיעור צבירה גבוה, יציבות מלאה
- **ביטחון תעסוקתי**: פיטורים דורשים הליך חוקי ארוך לאחר 6 חודשי שירות

## הכנה לבחינות

- **kurs.gov.il** — קורסי הכנה מסובסדים לעובדי מדינה עתידיים
- **נציבות שוויון הזדמנויות**: 02-640-3000

## ייעוץ משפטי אם נדחיתם

טבקה: 03-629-4040. IAEJ (אל"י): 03-510-0082.

## ראו גם

- [ייצוג הולם — מצב 2025](/he/news/affirmative-action-2025-update)
- [ייצוג הולם — דף הזכות המלא](/he/careers/affirmative-action)
- שירות התעסוקה — מדריך`,
      en: `## How affirmative representation works

The 2000 Affirmative Representation Law requires government bodies to give preference to Ethiopian-origin candidates when two candidates are equally qualified. Committees must also actively advertise in community-facing channels.

## Civil service jobs portal

All government vacancies at pras.gov.il. On the form, mark "Ethiopian origin" under "affirmative representation." Keep the submission confirmation.

## Top ministries

Aliyah Ministry (5.4%): absorption coordinators, centre managers. Education Ministry (3.1%): inspectors, school principals. Welfare Ministry (1.0%, actively recruiting): social workers, family coordinators.

## Pay scale

Entry (grade 38–40): ₪7,500–₪10,000. After 5–8 years (grade 42–45): ₪12,000–₪18,000. Full budgetary pension.

## Free legal support if rejected

Tebeka: 03-629-4040. IAEJ: 03-510-0082.

## See also

- [Affirmative representation — 2025 status](/en/news/affirmative-action-2025-update)
- [Affirmative action — full rights page](/en/careers/affirmative-action)`,
      am: `## ፍትሃዊ ውክልና እንዴት ይሰራል

2000 ፍትሃዊ ውክልና ህግ ሁለት እኩል ምሩቃን ሲኖሩ ኢትዮጵያ ዝርያ ቀድሚያ ይሰጣሉ።

## pras.gov.il

ቅጽ ላይ "ፍትሃዊ ውክልና — ኢትዮጵያ ዝርያ" ምልክት ያድርጉ። ማረጋገጫ ይቀምጡ።

## ደመወዝ

ቅጥር: ₪7,500-10,000. 5-8 ዓመት: ₪12,000-18,000. ሙሉ ጡረታ።`,
    },
  },

  {
    slug: "entrepreneurship-guide-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "policy"],
    title: {
      he: "יזמות עסקית ליוצאי אתיופיה — מקורות מימון וסיפורי הצלחה",
      en: "Business entrepreneurship for Ethiopian-Israelis — funding sources and success stories",
      am: "ለኢትዮጵያ-እስራኤላውያን ሥራ ፈጠራ — የፋይናንስ ምንጮች እና ስኬት ታሪኮች",
    },
    excerpt: {
      he: "סיפורי הצלחה: עסקים אתיופיים בישראל. קרנות, אינקובטורים ותוכניות שמתאימות לקהילה.",
      en: "Success stories of Ethiopian-owned businesses in Israel. Grants, incubators, and programmes tailored to the community.",
      am: "ኢትዮጵያ ባለቤትነት ያላቸው ሥራዎች ስኬት ታሪኮች። ለማህበረሰቡ አግባብ ያላቸው ፕሮግራሞች።",
    },
    bodies: {
      he: `## עסקים אתיופיים בישראל — ענפים מובילים

בשנים האחרונות קמו מאות עסקים בבעלות יוצאי אתיופיה בישראל. ענפים מובילים:

- **קייטרינג ומסעדנות**: מאכלים אתיופיים (אינג'רה, דורו-וט) זוכים לביקוש גבוה
- **בנייה ושיפוצים**: קבלני משנה שהצמיחו עסקים עצמאיים
- **שירותי תרגום ותיווך תרבותי**: יועצים לגופי ממשלה, בתי-חולים, בתי-משפט
- **IT ומחשבים**: טכנאים שפתחו עסקים עצמאיים

## רשות הנגר"ש — מענקים עד ₪50,000

**רשות עסקים קטנים ובינוניים** (economy.gov.il):
- **מענק הקמה**: עד ₪50,000 לעסק חדש (עד 3 שנים)
- **הלוואה מוכוונת**: עד ₪500,000 בערבות מדינה
- **קריטריוני זכאות**: תכנית עסקית מאושרת + הכשרת יזמות (15-30 שעות)

## JDC ישראל — תכנית יזמות

- **ליווי עסקי**: 12 חודשים מנטורינג + ייעוץ פיננסי
- **מענקי זרע**: ₪10,000–₪25,000 לרעיון מוכח
- **כתובת**: jdc.org.il — "יזמות — קהילות"

## עולים ביחד — Bizmax Mentors

מחברת יזמים מהקהילה עם מנטורים עסקיים מהמגזר הפרטי. חינם.

## BizMax ו-HUB TLV

BizMax ירושלים: אינקובטור לעסקים חברתיים — 70% סובסידיה על ייעוץ. HUB TLV Social Impact: ב-Tel Aviv וב"ש עם JDC.

## אתגרים — מה צריך לדעת

חוזים בעברית — השתמשו במרפאות משפטיות חינמיות (ירושלים, ת"א, חיפה). רשמו עסק לפני שמקבלים תשלום ראשון (ביטוח לאומי + מע"מ + פתיחת תיק במס הכנסה).

## רשת B2B בקהילה

אירועים, חתונות, ברית מילה, ימי שישי — שוק ייחודי לשירותים עסקיים מהקהילה.

## ראו גם

- שירות התעסוקה — מדריך לעצמאים
- [עולים ביחד — פרופיל ארגון](/he/orgs/olim-beyahad)
- [JDC ישראל — פרופיל](/he/orgs/jdc-ashalim)`,
      en: `## Ethiopian-owned businesses in Israel

Leading sectors: catering and restaurants (injera, doro-wot), construction subcontracting, translation and cultural mediation, IT services.

## SME Authority — grants up to ₪50,000

economy.gov.il: start-up grants up to ₪50,000 (businesses under 3 years); state-guaranteed loans up to ₪500,000. Requires approved business plan and 15–30 hours of entrepreneurship training.

## JDC Israel entrepreneurship programme

12-month business mentoring and financial advisory; seed grants ₪10,000–₪25,000. Find at jdc.org.il.

## Olim BeYachad — Bizmax Mentors

Free programme connecting community entrepreneurs with private-sector mentors.

## Key challenges

Hebrew contracts — use Bar Association legal clinics for free review. Register as self-employed before first payment.

## See also

- [Olim BeYachad — organisation profile](/en/orgs/olim-beyahad)
- [JDC Israel — profile](/en/orgs/jdc-ashalim)`,
      am: `## ኢትዮጵያ ባለቤቶች ዋና ዘርፎች

ምግብ አቅርቦት (ኢንጀራ፣ ዶሮ ወጥ)፣ ግንባታ፣ ትርጉም፣ IT።

## ትንሽ ሥራ ባለስልጣን

economy.gov.il — ₪50,000 ድጎማ ለ3 ዓመት ያልሞሉ. ₪500,000 ዋስትና ብድር።

## JDC እስራኤል

12 ወር ምክር + ₪10,000-25,000 ዘር ድጎማ። jdc.org.il።`,
    },
  },

  {
    slug: "lamarkhak-joint-program-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "policy"],
    title: {
      he: "תוכנית למרחק — הג'וינט: מה זה, מי זכאי, ואיך נרשמים",
      en: "JDC Lamarkhak programme — what it is, who qualifies, and how to register",
      am: "JDC ላምርሃቅ ፕሮግራም — ምንድን ነው፣ ማን ብቁ ነው፣ እንዴት ይመዘገባሉ",
    },
    excerpt: {
      he: "תוכנית 'למרחק' של הג'וינט פועלת ב-11 מרכזים ברחבי הארץ. מדריך מלא לרישום ולקבלת הכוונה מקצועית.",
      en: "The JDC 'Lamarkhak' programme operates in 11 centres nationwide. Complete guide to registration and vocational guidance.",
      am: "JDC 'ላምርሃቅ' ፕሮግራም በ11 ማዕከሎች ይሰራል። ምዝገባ እና ሙያ ምክር ሙሉ መመሪያ።",
    },
    bodies: {
      he: `## מה זה למרחק

"למרחק" היא תכנית של ג'וינט ישראל שמסייעת לאנשים בגיל עבודה מחוץ לשוק העבודה — או בתת-תעסוקה — לחזור לתעסוקה מלאה. לקהילת יוצאי אתיופיה יש מסלול מותאם תרבותית.

## 11 מרכזים פעילים

| עיר | כתובת | טלפון |
|-----|-------|-------|
| נתניה | הרצל 52 | 09-866-3330 |
| לוד | ביאליק 12 | 08-924-5050 |
| קרית גת | שדרות 8 | 08-680-2222 |
| קרית מלאכי | האגוז 5 | 08-858-6060 |
| ירושלים | יפו 224 | 02-652-8888 |
| חיפה | שד' הנשיא 22 | 04-811-2233 |
| באר שבע | שד' רגר 84 | 08-623-7777 |
| ראשון לציון | רוטשילד 12 | 03-966-4411 |
| רמלה | הרצל 35 | 08-925-1010 |
| אשדוד | שד' בן-גוריון 9 | 08-857-9090 |
| עכו | שד' בן-עמי 32 | 04-956-1234 |

## מי זכאי

- מובטלים 6 חודשים ומעלה
- מועסקים בתת-תעסוקה (משרה חלקית בניגוד לרצון)
- חוזרים לשוק לאחר הפסקה (לידה, טיפול, מחלה)
- בני 18-65 המחפשים שינוי מקצועי

## מה קורה בפגישה הראשונה

1. **שיחת אבחון** — 60-90 דקות עם יועץ תעסוקה (יועצים דוברי אמהרית בחלק מהמרכזים)
2. **הערכת כישורים** — כישורים קיימים, עניין, פערים
3. **תכנית פעולה אישית**: הכשרה + חיפוש עבודה + מעקב
4. **מנטור תעסוקתי** לליווי 12 חודשים

## שיעור הצלחה — ג'וינט 2024

- **68%** מוצאים עבודה תוך 9 חודשים
- **79%** שומרים על העבודה אחרי 12 חודשים
- **84%** שביעות רצון

## מסלול מיוחד לנשים

- קבוצות תמיכה בשפה האמהרית בנתניה ולוד
- הכשרות בשעות מותאמות לאמהות
- סיוע בסידורי ילדים בזמן ראיונות ולימודים

## ההבדל בין למרחק לשירות התעסוקה

| | למרחק (ג'וינט) | שירות התעסוקה |
|--|---------------|---------------|
| מיקוד | ייעוץ אישי עמוק | מימון הכשרות + דמי אבטלה |
| זמן ליווי | 12 חודשים | עד 6 חודשים |
| עלות | חינמי | חינמי |

השניים משלימים — ניתן לפנות לשניהם בו-זמנית.

## אין צורך בהפנייה

פנו ישירות לכל מרכז — או קבלו הפנייה מ: שירות התעסוקה, עו"ס, מחלקת רווחה, פידל/IAEJ.

## ראו גם

- שירות התעסוקה — מדריך
- [מצב אבטלה לתעסוקה](/he/news/unemployment-to-employment-roadmap)
- [JDC ישראל — פרופיל ארגון](/he/orgs/jdc-ashalim)`,
      en: `## What is Lamarkhak

Lamarkhak is a JDC Israel programme helping working-age adults who are unemployed or underemployed return to suitable full employment. A culturally-adapted track exists for the Ethiopian-Israeli community.

## 11 active centres

Netanya (09-866-3330), Lod (08-924-5050), Kiryat Gat (08-680-2222), Kiryat Malachi (08-858-6060), Jerusalem (02-652-8888), Haifa (04-811-2233), Beersheba (08-623-7777), Rishon LeZion (03-966-4411), Ramla (08-925-1010), Ashdod (08-857-9090), Akko (04-956-1234).

## Who qualifies

Unemployed 6+ months; underemployed (involuntary part-time); returning after a break; ages 18–65 seeking a career change.

## First appointment

60–90 minute diagnostic session (Amharic-speaking counsellors at some centres). Skills assessment. Personal action plan. Employment mentor for 12 months.

## Success data (JDC 2024)

68% find employment within 9 months. 79% retain employment after 12 months. 84% satisfaction rate.

## No referral needed

Walk in directly or get a referral from the Employment Service, social worker, welfare department, or Fidel/IAEJ.

## See also

- Employment Service guide
- [Unemployment-to-employment roadmap](/en/news/unemployment-to-employment-roadmap)`,
      am: `## ላምርሃቅ ምንድን ነው

JDC እስራኤል ፕሮግራም ሥራ ዕድሜ ያሉ ሰዎች ሙሉ ሥራ ለማግኘት ይረዳሉ።

## 11 ማዕከሎች

ነታንያ (09-866-3330)፣ ሎድ (08-924-5050)፣ ቂርያት ጋት፣ ቂርያት ማላኪ፣ ኢየሩሳሌም፣ ሀይፋ፣ ቤርሼባ፣ ሬሾን ሌዚዮን፣ ራምሎ፣ አሽዶድ፣ አኮ።

## ስኬት ዳታ (JDC 2024)

68% 9 ወር ውስጥ ሥራ ያገኛሉ። 79% 12 ወር ሥራ ይዘው ይቆያሉ።`,
    },
  },

  {
    slug: "construction-trades-career-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "policy"],
    title: {
      he: "מקצועות בנייה ותשתיות — קריירה יציבה לגברים מהקהילה",
      en: "Construction and infrastructure trades — stable careers for men in the community",
      am: "ግንባታ እና መሠረተ ልማት ሙያዎች — ለማህበረሰቡ ወንዶች የተረጋጋ ሙያ",
    },
    excerpt: {
      he: "אחד המגזרים עם ביקוש הגבוה ביותר בישראל. אלו הכשרות, רישיונות ושכר לפי מקצוע.",
      en: "One of Israel's highest-demand sectors. Training programmes, licences, and salary by trade.",
      am: "እስራኤል ከፍተኛ ፍላጎት ካላቸው ዘርፎች አንዱ። ሥልጠና፣ ፈቃዶች፣ እና ደመወዝ።",
    },
    bodies: {
      he: `## נתוני תעסוקה

לפי CBS 2024, **למעלה מ-20% מהגברים ממוצא אתיופי** עובדים בבנייה, תשתיות ושיפוצים — הריכוז הגבוה ביותר מכל מגזר. ניסיון זה הוא בסיס מצוין לקריירה מתקדמת ולפתיחת עסק עצמאי.

## שכר לפי מקצוע — 2026

| מקצוע | שכר שכיר | שכר קבלן |
|-------|----------|-----------|
| חשמלאי (מוסמך) | ₪15,000–₪22,000 | ₪20,000–₪40,000 |
| אינסטלטור (מוסמך) | ₪12,000–₪18,000 | ₪18,000–₪35,000 |
| מזגנאי/HVAC | ₪13,000–₪20,000 | ₪20,000–₪38,000 |
| מנופאי | ₪18,000–₪25,000 | — |
| בנאי/טייח מוסמך | ₪10,000–₪15,000 | ₪15,000–₪30,000 |
| נגר בנין | ₪11,000–₪16,000 | ₪16,000–₪28,000 |

## רישיונות — כיצד מוסמכים

**חשמלאי**: 2 שנות ORT / מכמ"ת + שנת התמחות + בחינת משרד העבודה. עלות ~₪5,000–₪8,000 (סובסידיה מלשכת תעסוקה אפשרית).

**אינסטלטור**: שנה ORT / מכמ"ת + 500 שעות התמחות + בחינה.

**מנופאי**: קורס 3-6 חודשים + 100 שעות נהיגה מודרכת, גוף מוסמך: משרד התחבורה.

## ORT ישראל — ההכשרה המובילה

ORT מפעיל מסלולי בנייה בנתניה, לוד, ב"ש וירושלים. עלות: מסובסדת לזכאי שירות תעסוקה. ort.org.il.

## זכויות בטיחות באתר

- ביגוד בטיחות: חובה (נעלי פלדה, קסדה, וסט)
- שעות עבודה מרביות: 8 + 2 נוספות לפי חוק
- שעות נוספות: 125% לשעות 9-10, 150% לאחריהן
- ביטוח תאונות: חובה מהמעסיק — וודאו לפני עלייה לאתר

## מסלול מפועל לקבלן

1. **פועל** (3-5 שנים): לימוד המקצוע בעבודה
2. **פועל מוסמך**: קורס + בחינת ORT
3. **קבלן משנה**: רישוי ממשרד השיכון (קבלן 1 — עד ₪1.5M)
4. **קבלן ראשי**: רישוי מלא, עסק עצמאי + עובדים

## הסתדרות הפועלים

חברות: ~₪50/חודש. יתרונות: ייצוג בסכסוכים, ביטוח מקצועי, קרן השתלמות.

## ראו גם

- ORT ישראל — פרופיל ארגון
- זכויות עובד — מדריך
- [יזמות — פתיחת עסק](/he/news/entrepreneurship-guide-ethiopian-community)`,
      en: `## Employment data

CBS 2024: over 20% of Ethiopian-origin men work in construction, infrastructure, and renovation — the highest concentration of any sector.

## Salary by trade (2026)

Electrician (licensed): ₪15,000–₪22,000 employed, up to ₪40,000 as contractor. Plumber: ₪12,000–₪18,000 employed, up to ₪35,000. HVAC tech: ₪13,000–₪20,000 employed, up to ₪38,000. Crane operator: ₪18,000–₪25,000.

## Licensing

Electrician: 2-year ORT + 1-year apprenticeship + Ministry of Labour exam (~₪5,000–₪8,000, Employment Service subsidy possible). Plumber: 1-year ORT + 500-hour internship. Crane operator: 3–6 month course, Ministry of Transport.

## ORT Israel training

Programmes in Netanya, Lod, Beersheba, Jerusalem. Employment Service subsidies available. ort.org.il.

## Path from worker to contractor

Worker → qualified tradesperson (ORT cert) → sub-contractor (Housing Ministry Class-1 licence, up to ₪1.5M) → full contractor.

## See also

- ORT Israel — organisation profile
- Worker rights guide`,
      am: `## ደመወዝ (2026)

ኤሌክትሪሺያን: ₪15,000-22,000 ሠራተኛ. ሳንቴሪ: ₪12,000-18,000. HVAC: ₪13,000-20,000. ክሬን: ₪18,000-25,000.

## ORT እስራኤል ስልጠና

ነታንያ፣ ሎድ፣ ቤርሼባ፣ ኢየሩሳሌም። ort.org.il ይጎብኙ።

## ሠራተኛ ወደ ተቋራጭ

ሠራተኛ → ብቁ ሙያ (ORT) → ንዑስ ተቋራጭ → ዋና ተቋራጭ።`,
    },
  },

  {
    slug: "legal-career-path-ethiopian",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "education"],
    title: {
      he: "קריירה משפטית — עורכי דין ועובדים סוציאליים מהקהילה",
      en: "Legal and social work careers — from the Ethiopian-Israeli community",
      am: "ህጋዊ እና ማህበራዊ ሥራ ሙያ — ከኢትዮጵያ-እስራኤላዊ ማህበረሰብ",
    },
    excerpt: {
      he: "TEBEKA ומשרדי עורכי דין שמגייסים מהקהילה. המסלול האקדמי, עלויות ושכר.",
      en: "TEBEKA and law firms that recruit from the community. Academic track, costs, and salary.",
      am: "TEBEKA እና ከማህበረሰቡ ሚቀጥሩ የህግ ቢሮዎች። የትምህርት መንገድ፣ ወጪዎች፣ እና ደመወዝ።",
    },
    bodies: {
      he: `## עורכי דין ממוצא אתיופי בישראל

בשנת 2024 מנתה לשכת עורכי הדין כ-**780 עורכי דין ממוצא אתיופי** — עלייה של 40% מאז 2019. רובם עובדים בתחומי משפחה, דיור, זכויות סוציאליות ועבודה. הייצוג עדיין נמוך ביחס לחלק הקהילה (0.8% מהלשכה לעומת 1.9% באוכלוסייה).

## מסלול אקדמי — בחירת מוסד

- **האוניברסיטה העברית (הר הצופים)**: חזקה בזכויות אדם וחוק ציבורי — מומלצת לעבודה בארגוני קהילה
- **בר-אילן**: תוצאות תעסוקה טובות למשרדים מסחריים
- **רייכמן (IDC)**: קשרי תעשייה בדיני עסקים ומיסוי
- **משך LL.B**: 3 שנים (בוגרי תואר) עד 5 שנים (מבגרות)
- **עלות**: ₪50,000–₪80,000 סך הכול

## מלגות לסטודנטים משפט

- **מרום (CHE)**: ₪8,000–₪20,000/שנה לממוצא אתיופי
- **האוניברסיטה העברית — לקידום חברתי**: ₪10,000–₪14,000/שנה
- **JDC מנהיגות**: ₪10,000–₪18,000 + תכנית מנהיגות

## בחינת הלשכה ושנת התמחות

1. **שנת התמחות**: 12 חודשים במשרד, שכר ₪4,000–₪7,000/חודש
2. **בחינת הלשכה**: ~70% עוברים בפעם ראשונה
3. **קבלה ללשכה**: ~₪2,000 דמי קבלה

## התמחות בארגוני קהילה

- **טבקה**: tebeka.org.il — מקבל מתמחים ממוצא אתיופי
- **ACRI**: זכויות אדם
- **בית-הדין לעבודה**: דיני עבודה

## שכר עורך דין

| שלב | שכר ממוצע |
|-----|-----------|
| מתמחה | ₪4,000–₪7,000 |
| שנה 1-2 | ₪8,000–₪12,000 |
| אחרי 5 שנים | ₪15,000–₪30,000 |
| שותף | ₪30,000+ |

## מסלול חלופי — עבודה סוציאלית

- **תואר ראשון**: 3 שנים (כולל סמינר מעשי בשנה ג' — ניתן לעבוד)
- **שכר**: ₪7,000–₪12,000 בתחילה, ₪14,000–₪22,000 עם ניסיון
- **מוסדות**: אוניברסיטת חיפה, בר-אילן, האוניברסיטה העברית

## עבודה פרו-בונו

רבים מעורכי הדין ממוצא אתיופי מבצעים ייעוץ חינמי לבני קהילה. טבקה מרכזת בריכה — פנו להצטרף.

## ראו גם

- [טבקה — פרופיל ארגון](/he/orgs/tebeka)
- [מלגות לסטודנטים 2026](/he/news/scholarships-guide-2026)
- [ייצוג הולם — שירות המדינה](/he/news/affirmative-action-2025-update)`,
      en: `## Ethiopian-Israeli lawyers

780 Ethiopian-origin lawyers in the Israeli Bar Association in 2024 — 40% increase since 2019. Most practise family law, housing, social rights, employment.

## Academic track

Hebrew University: strong in human rights and public law. Bar-Ilan: best commercial-firm employment outcomes. Reichman (IDC): business and tax law. LL.B costs: ₪50,000–₪80,000 total.

## Scholarships

Marom (CHE): ₪8,000–₪20,000/year. Hebrew U social advancement: ₪10,000–₪14,000. JDC Leadership: ₪10,000–₪18,000.

## Bar exam and internship

1-year clerkship (₪4,000–₪7,000/month). Bar exam (~70% first-time pass). ₪2,000 enrolment fee.

## Internships at community organisations

Tebeka (tebeka.org.il), ACRI (human rights), Labour Court.

## Salary ladder

Intern: ₪4,000–₪7,000. Year 1–2: ₪8,000–₪12,000. After 5 years: ₪15,000–₪30,000. Partner: ₪30,000+.

## Social work as alternative

3-year BA. Work during third-year practicum. Starting ₪7,000–₪12,000, rising to ₪14,000–₪22,000.

## See also

- [Tebeka — organisation profile](/en/orgs/tebeka)
- [Scholarships guide 2026](/en/news/scholarships-guide-2026)`,
      am: `## ኢትዮጵያ-እስራኤላዊ ጠበቆች

2024: 780 ጠበቆች — ከ2019 40% ጭማሪ። LL.B: ₪50,000-80,000።

## ደመወዝ

ሞካሪ: ₪4,000-7,000. ዓ.1-2: ₪8,000-12,000. 5 ዓመት: ₪15,000-30,000.

## ማህበራዊ ሥራ አማራጭ

3 ዓመት ዲግሪ። ₪7,000-12,000 → ₪14,000-22,000.`,
    },
  },

  {
    slug: "unemployment-to-employment-roadmap",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "policy"],
    title: {
      he: "מצב אבטלה לתעסוקה — מפת הדרכים לחוזרים לשוק העבודה",
      en: "From unemployment to employment — the roadmap for returning to the labour market",
      am: "ከሥራ አጥነት ወደ ቅጥር — ወደ ሥራ ገበያ ለሚመለሱ ጠቋሚ",
    },
    excerpt: {
      he: "6 חודשים ויותר ללא עבודה? מדריך שלב-אחר-שלב: זכויות, הכשרות, ואיך חוזרים במהירות.",
      en: "6 months or more without work? Step-by-step guide: rights, training programmes, and how to return quickly.",
      am: "ከ6 ወር+ ሥራ ሳይኖር? ደረጃ-በደረጃ መመሪያ: መብቶች፣ ሥልጠናዎች፣ እንዴት ፈጥኖ ይመለሳሉ።",
    },
    bodies: {
      he: `## שלב 1 — רישום בשירות התעסוקה (תוך 14 ימים)

הצעד הראשון והחשוב ביותר: תוך **14 יום** מסיום העבודה — הירשמו בלשכת התעסוקה הקרובה. כל יום שמאחרים = ימי המתנה נוספים על דמי האבטלה.

- **אתר**: [taasuka.gov.il](https://www.taasuka.gov.il) — איתור לשכה קרובה
- **מה צריך**: תעודת זהות + טופס 161 מהמעסיק

### דמי אבטלה — כמה ולכמה זמן (2026)

| שנות ותק | תקופה מרבית |
|---------|------------|
| עד 3 שנים | 50 ימים |
| 3-5 שנים | 100 ימים |
| 5+ שנים | 138 ימים |

שיעור: 80% מהשכר (חודשיים ראשונים), 75% לאחר מכן. תקרה: ~₪13,500/חודש.

## שלב 2 — BTL (ביטחון הכנסה) אם זכאים

לא זכאים לדמי אבטלה? בדקו BTL: הכנסה פחות מ-₪4,500 לנפש. פנייה: ביטוח לאומי. סכום: ₪2,200–₪4,500/חודש (תלוי בגודל משפחה).

## שלב 3 — הערכת כישורים חינמית

בקשו ביום הרישום: "אני רוצה להירשם לתהליך הערכת כישורים". 2-3 פגישות עם יועץ → תכנית מותאמת אישית.

## שלב 4 — הכשרה מקצועית ממומנת (עד 12 חודשים)

מימון מלא: שכר לימוד + דמי מחיה ₪3,000–₪5,500/חודש.

### מסלולים עיקריים
- **Tech-Career / ENP** — הייטק (junior dev, QA, סייבר)
- **ORT ישראל** — בנייה, חשמל, מזגנים
- **מכללות בריאות** — סיעוד, עזרה לזקן

## שלב 5 — סיוע בחיפוש עבודה

- **שירות התעסוקה**: יועץ אישי — CV, חיפוש, הכנה לראיון
- **למרחק (ג'וינט)**: 11 מרכזים, ליווי 12 חודשים, ללא הפנייה
- **ORT ישראל**: רשת מעסיקים + ימי נטוורקינג

## טעויות נפוצות — מה להימנע

1. חתימה על מסמכים ללא קריאה — קראו לפני כל חתימה
2. פספוס תורים בלשכה — קנס ~₪360 לפספוס
3. לא לסמן ייצוג הולם בהגשות ציבוריות
4. לא לנצל הכשרות ממומנות — הזדמנות חינמית לשינוי קריירה
5. בידוד רגשי — קבוצות תמיכה בלמרחק ובתנה בריאות

## תמיכה רגשית

- **ג'וינט / למרחק**: קבוצות אמהרית בנתניה ולוד
- **תנה בריאות**: ייעוץ נפשי למובטלים
- **ער"ן**: 1201 (24/7)

## לוח זמנים ממוצע — מניסיון הקהילה

לפי מחקר ג'וינט 2024:
- **ממועד רישום לעבודה**: 4-7 חודשים ממוצע
- **עם הכשרה**: 9-14 חודשים (שכר גבוה יותר לאחר מכן)
- **ללא הכשרה**: 2-4 חודשים (עבודה קיימת)

## ראו גם

- [תוכנית למרחק — הג'וינט](/he/news/lamarkhak-joint-program-guide)
- [Tech-Career — מדריך הכשרה](/he/news/tech-career-bootcamp-guide)
- [שירות התעסוקה — זכויות](/he/rights/unemployment-benefit-guide)`,
      en: `## Step 1 — register at the Employment Service (within 14 days)

Register within 14 days of job loss at taasuka.gov.il. Every day of delay means additional waiting days on unemployment benefits. Bring national ID and Form 161 from employer.

## Unemployment benefits (2026)

Up to 3 years seniority: 50 days. 3–5 years: 100 days. 5+: 138 days. Rate: 80% for first 2 months, then 75%. Cap: ~₪13,500/month.

## Step 2 — BTL income support

If not entitled to unemployment benefits, check BTL eligibility: income under ₪4,500/person. Amount: ₪2,200–₪4,500/month. Apply at National Insurance Institute.

## Step 3 — free vocational assessment

Request on registration day. 2–3 sessions with a counsellor produce a personal action plan.

## Step 4 — funded training up to 12 months

Full tuition plus monthly stipend ₪3,000–₪5,500. Main tracks: Tech-Career/ENP (junior dev, QA, cyber), ORT Israel (construction trades), health colleges (nursing).

## Step 5 — job placement assistance

Employment Service personal counsellor for CV, job search, interview prep. Lamarkhak (JDC) — 11 centres, 12-month mentor, no referral needed.

## Common mistakes

Missing Employment Service appointments (₪360 fine per miss). Not flagging affirmative representation on public-sector applications. Not using funded training.

## Average timeline (JDC 2024 community data)

Without training: 2–4 months. With training: 9–14 months (but higher salary outcome). Average: 4–7 months from registration to employment.

## See also

- [Lamarkhak — JDC programme guide](/en/news/lamarkhak-joint-program-guide)
- [Tech-Career — training guide](/en/news/tech-career-bootcamp-guide)
- [Employment Service — rights](/en/rights/unemployment-benefit-guide)`,
      am: `## ደረጃ 1 — በ14 ቀናት ውስጥ ይመዝገቡ

taasuka.gov.il ወይም ቅርቡ ቢሮ። ምዝገባ ሳይኖር = ደሞዝ ድጋፍ የለም።

## ደሞዝ ድጋፍ (2026)

3 ዓመት: 50 ቀናት. 3-5 ዓመት: 100 ቀናት. 5+: 138 ቀናት. 80% (2 ወር)፣ ከዛ 75%.

## ደረጃ 4 — እስከ 12 ወር ሥልጠና

ሙሉ ክፍያ + ₪3,000-5,500/ወር. Tech-Career/ENP፣ ORT፣ የጤና ኮሌጆች።

## አማካኝ ጊዜ (JDC 2024)

ሳይሰለጥኑ: 2-4 ወር. ሰልጥነው: 9-14 ወር. አማካኝ: 4-7 ወር.`,
    },
  },

  // ── Wave 4 employment articles ────────────────────────────────────────────

  {
    slug: "employment-gap-report-2026",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "rights"],
    title: {
      he: "פערי תעסוקה בקהילה האתיופית 2026 — הנתונים המלאים",
      en: "Ethiopian-Israeli Employment Gap Report 2026 — Full Data",
      am: "ኢትዮጵያ-እስራኤሎች የሥራ ክፍተት 2026 — ሙሉ ሪፖርት",
    },
    excerpt: {
      he: "רק 18% מבוגרי הקהילה עובדים בתחום שלמדו. פערי שכר, שיעורי אבטלה ותמונת המצב לפי CBS ומרכז אדוה — וכך אפשר לשנות את זה.",
      en: "Only 18% of Ethiopian-Israeli graduates work in their field. Wage gaps, unemployment rates, and what the data says — with actionable next steps.",
      am: "ከኢትዮጵያ-እስራኤሎች ምሩቃን 18% ብቻ በትምህርታቸው መስክ ይሠራሉ። ሪፖርቱ ዋና ግኝቶቹን ይዳስሳል።",
    },
    bodies: {
      he: `## עיקרי הנתונים (CBS + מרכז אדוה, 2024-2025)

הדוח השנתי של מרכז אדוה ונתוני הלמ"ס מצביעים על תמונה מורכבת:

**תעסוקה**
- שיעור תעסוקה כולל: 68% (לעומת 79% ביהודים-לא-חרדים)
- גברים: 74% | נשים: 62%
- בוגרי אקדמיה שעובדים בתחום לימודיהם: **18% בלבד**

**שכר**
- שכר ממוצע בקהילה: 8,200 ₪/חודש (לעומת 12,400 ₪ ממוצע ארצי)
- פער שכר גברים: 28% מתחת לממוצע הארצי
- פער שכר נשים: 34% מתחת לממוצע הארצי
- תחומים עם פחות פערים: הייטק (ממוצע 14,800 ₪), סיעוד (10,200 ₪)

**השכלה**
- שיעור בגרות: 52% (לעומת 69% בכלל האוכלוסייה)
- לימודי תואר ראשון: 21% (לעומת 37%)
- תואר שני ומעלה: 6% (לעומת 18%)

## הסיבות המובילות לפערים

1. **מחסור בהכנסה בתקופת הלימודים**: 61% מסטודנטים מהקהילה עובדים במהלך הלימודים, מה שמוריד ממוצע ציונים
2. **חסמי שפה**: קורסי אקדמיה בעברית גבוהה — מאתגרים לבוגרי קהילה שחינוכם בית-ספרי היה בעברית שנייה
3. **רשתות מקצועיות**: פחות "חיבורים" לשוק העבודה המקצועי — חשיבות מנטורינג
4. **אפליה סמויה**: 31% מהמעסיקים דיווחו על "העדפה" לשמות לא-אתיופיים בסינון קורות חיים (מחקר IDI 2023)

## מה אפשר לעשות — צעדים מעשיים

- **Tech-Career**: תוכנית הסבה לשוק ההייטק עם 82% שיעור השמה — ראו [/he/rights/tech-career-bootcamp]
- **ENP** (מרכז קידום השכלה): מלגות והכנה לבגרויות — 03-5368944
- **מנטורינג קהילתי**: כ-200 מנטורים מהקהילה ברשת "מנהיגות אתיופית" — LinkedIn: Ethiopian Leadership IL
- **קורות חיים**: שנו שם לגרסה "אנונימית" בסינון ראשוני, ועצרו זאת בשלב הראיון כשיש כבר קשר אנושי

📊 דוח מלא: adva.org.il | btl.gov.il/statistics`,
      en: `## Key Data (CBS + Adva Center, 2024-2025)

**Employment**
- Overall employment rate: 68% (vs. 79% among non-Haredi Jews)
- Men: 74% | Women: 62%
- Academic graduates working in their field: **only 18%**

**Wages**
- Average monthly wage in community: 8,200 ILS (vs. national average 12,400)
- Men's wage gap: 28% below national average
- Women's wage gap: 34% below national average
- Sectors with smaller gaps: hi-tech (avg. 14,800 ILS), nursing (10,200 ILS)

**Education**
- Matriculation rate: 52% (vs. 69% nationally)
- Bachelor's degree: 21% (vs. 37%)

## Top Causes

1. Need to work during studies (61% of community students work, depressing grades)
2. Language barriers in advanced Hebrew academic content
3. Weaker professional networks — mentoring is critical
4. Hidden bias: 31% of employers showed preference for non-Ethiopian-sounding names (IDI 2023 study)

## What You Can Do

- **Tech-Career**: 82% job placement rate → /en/rights/tech-career-bootcamp
- **ENP** scholarships and exam prep: 03-5368944
- Community mentoring: Ethiopian Leadership IL on LinkedIn

📊 Full report: adva.org.il`,
      am: `## ዋና ግኝቶቸ (CBS + አድቫ ሴንተር, 2024-2025)

- ሥራ ፈጣሪ ደረጃ: 68% (ከ79% ብሔራዊ ክፍያ ጋር ሲነፃፀር)
- ምሩቃን ትምህርታቸው ቦታ ላይ ሠሪዎቸ: **18% ብቻ**
- አማካኝ ወርሃዊ ደሞዝ: 8,200 ሺ"ል (ብሔራዊ 12,400 ሺ"ል)

## ምን ማድረግ ይቻላል?

- Tech-Career: 82% የሥራ ማስቀመጥ ደረጃ
- ENP ዕድሎቸ: 03-5368944

📊 adva.org.il`,
    },
  },

  {
    slug: "cv-writing-guide-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "community"],
    title: {
      he: "מדריך כתיבת קורות חיים לקהילה האתיופית — ATS ועברית",
      en: "CV Writing Guide for the Ethiopian-Israeli Community — ATS & Hebrew",
      am: "ሲቪ ጻፍ መመሪያ ለኢትዮጵያ-እስራኤሎች",
    },
    excerpt: {
      he: "70% מקורות החיים נפסלים על ידי מערכת ATS לפני שמגיעים לאדם. מדריך מעשי: פורמט, מילות מפתח, שפה, ומה להימנע ממנו בקורות חיים ישראלי.",
      en: "70% of CVs are filtered out by ATS systems before reaching a human. A practical guide: format, keywords, language, and what to avoid in Israeli CVs.",
      am: "70% ሲቪዎቸ ወደ ሰው ሳይደርሱ ይሰረዛሉ። ተግባራዊ መመሪያ።",
    },
    bodies: {
      he: `## מה זה ATS ולמה חשוב?

**ATS** (Applicant Tracking System) היא תוכנה שמיין ות קורות חיים אוטומטית לפני שמגיעים לעיניים אנושיות. חברות עם מעל 50 עובדים משתמשות כמעט תמיד ב-ATS. אם קו"ח שלכם לא עובר את הסינון — אף אחד לא יראה אותו.

## כללי הזהב לקו"ח ישראלי מנצח

### מבנה (הכי חשוב)
- **1 עמוד בלבד** (עד 10 שנות ניסיון) / 2 עמודים (מעל)
- **פורמט**: Word (.docx) או PDF פשוט — לא מעוצב יתר על המידה, לא עם טבלאות מורכבות
- **גופן**: Arial, Calibri או David — גדול מ-10, רווח שורות 1.15

### מה חייב להיות בעמוד הראשון
1. שם מלא (ללא תמונה — לא חובה בישראל)
2. טלפון + מייל + לינקדאין (אם יש)
3. תפקיד מבוקש / כותרת מקצועית — **מילת מפתח!**
4. תקציר מנהלים: 3-4 שורות
5. ניסיון תעסוקתי: מהחדש לישן

### מילות מפתח — הסוד של ATS
העתיקו מהמודעה את המילים המדויקות שמופיעות בדרישות. אם מודעה כוללת "ניהול פרויקטים" — השתמשו בדיוק בביטוי הזה, לא ב"ניהול עבודה".

### שפה
- **עברית תקנית** — בדקו הגהה! שגיאות כתיב = קו"ח בפח
- **ניסוחים פעילים**: "ניהלתי", "הוביל", "שיפרתי" — לא "אחראי על"
- **נתונים**: "הגדלתי מכירות ב-23%", לא "שיפרתי מכירות"

### מה להימנע
- תמונה (לא חובה, ועלולה לגרום לאפליה לא מודעת)
- "סיבת עזיבה" — לא בקו"ח
- גיל (לא חובה)
- מספר ת"ז
- Canva-style עיצובים — ATS לא קורא טבלאות

## קו"ח לשוק ההייטק (מיוחד לקהילה)
אם אתם עוברים הסבה (Tech-Career, ENP, הייטק), הדגישו:
- **פרויקטים**: GitHub link, אפליקציה בנויה, תיק עבודות
- **סטאק טכנולוגי**: Python, React, SQL — פרטו גרסאות
- **סיבת מעבר**: "5 שנות ניסיון ב-[תחום], מסיים/מת הסבת Tech-Career — מחפש/ת תפקיד junior fullstack"

## לקבל עזרה חינם
- **ENP** (מרכז קידום השכלה): סדנאות קו"ח חינם, 03-5368944
- **Tech-Career**: כולל הכנה לראיונות ואופטימיזציה לקו"ח
- **LinkedIn מנטורינג**: "Ethiopian Leadership IL" — כ-200 מנטורים מהקהילה`,
      en: `## What is ATS and Why Does It Matter?

**ATS** (Applicant Tracking System) software automatically filters CVs before any human sees them. Companies with 50+ employees almost always use ATS. If your CV doesn't pass — no one sees it.

## Golden Rules for an Israeli CV

**Structure**: 1 page (up to 10 years experience); 2 pages (beyond). Format: clean Word (.docx) or simple PDF — no complex tables, no Canva designs.

**Keywords**: Copy exact phrases from the job ad. If it says "project management" — use those exact words.

**Language**: Active verbs: "managed", "led", "improved". Numbers: "grew sales by 23%", not "improved sales".

**Avoid**: Age, ID number, photo (not required, can cause unconscious bias), complex graphic designs (ATS can't read tables).

## For the Tech Sector
If you're in a bootcamp (Tech-Career, ENP): include GitHub link, built projects, technology stack (Python, React, SQL).

## Free Help
- ENP CV workshops: 03-5368944
- Tech-Career: includes interview prep and CV optimisation
- LinkedIn: Ethiopian Leadership IL mentors (~200 volunteers)`,
      am: `## ATS ምንድን ነው?

ATS ሲቪዎቸን ወደ ሰው ሳይደርሱ በራስ ሰር ያጣራ ሶፍትዌር ነው።

## ዋና ሕጎቸ

- **1 ገጽ** ብቻ (እስከ 10 ዓመት ልምድ)
- **ቁልፍ ቃሎቸ**: ከሥራ ማስታወቂያ ቃሎቸን ቀዳ
- **ቋንቋ**: ንቁ ግሦቸ: "መራ"፣ "አሻሻለ"፣ "ጨመረ"
- **ምስል አያስፈልግም** (ከሥነ ጥበብ ሰነዶቸ ጋር ATS ጎድሉ)

**ነፃ ዕርዳታ**: ENP 03-5368944`,
    },
  },

  {
    slug: "salary-benchmarks-ethiopian-community-2026",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "health"],
    title: {
      he: "סקר שכר קהילה אתיופית 2026 — כמה מרוויחים בכל תחום?",
      en: "Ethiopian-Israeli Salary Benchmarks 2026 — What Do People Earn by Sector?",
      am: "የኢትዮጵያ-እስራኤሎች ደሞዝ ሰንጠረዥ 2026",
    },
    excerpt: {
      he: "הייטק, סיעוד, חינוך, עבודה סוציאלית — כמה מרוויחים בוגרי הקהילה בכל תחום? נתוני CBS ומרכז אדוה לשנת 2025-2026.",
      en: "Hi-tech, nursing, education, social work — how much do community members earn in each sector? CBS and Adva Center data for 2025-2026.",
      am: "ሃይቴክ፣ ነርሲንግ፣ ትምህርት — በእያንዳንዱ ሴክተር ምን ያህል ደሞዝ ይጠበቃል?",
    },
    bodies: {
      he: `## שכר לפי תחום — נתוני 2025-2026

נתונים מבוססים על: CBS (הלמ"ס), מרכז אדוה, סקרי JDC-Ashalim ומשרד הכלכלה.

### הייטק (Software / Data)
| תפקיד | שכר חציוני |
|--------|-----------|
| Junior Developer | 13,000–16,000 ₪ |
| Mid-Level Developer | 18,000–25,000 ₪ |
| Senior Developer | 28,000–40,000 ₪ |
| Data Analyst | 14,000–20,000 ₪ |
| Product Manager | 22,000–35,000 ₪ |

**ממוצע לבוגרי Tech-Career בשנה ראשונה**: 14,800 ₪

### סיעוד ובריאות
| תפקיד | שכר חציוני |
|--------|-----------|
| אח/אחות סדיר | 9,500–12,000 ₪ |
| אח/אחות מומחה | 13,000–17,000 ₪ |
| עוזר סיעודי | 6,800–8,500 ₪ |
| פיזיותרפיסט | 11,000–16,000 ₪ |

**ממוצע בקהילה האתיופית (סיעוד)**: 10,200 ₪

### חינוך
| תפקיד | שכר חציוני |
|--------|-----------|
| מורה (תיכון) | 8,500–12,000 ₪ |
| מחנך/ת מוביל/ה | 10,000–14,000 ₪ |
| מנהל/ת בית ספר | 14,000–20,000 ₪ |
| יועץ/ת חינוכי/ת | 9,000–13,000 ₪ |

### עבודה סוציאלית
| תפקיד | שכר חציוני |
|--------|-----------|
| עו"ס שדה | 8,000–11,000 ₪ |
| עו"ס בכיר | 12,000–16,000 ₪ |
| מנהל/ת מחלקת רווחה | 15,000–22,000 ₪ |

### משפטים
| תפקיד | שכר חציוני |
|--------|-----------|
| עו"ד שכיר (0-3 שנות ניסיון) | 8,500–13,000 ₪ |
| עו"ד עצמאי | תלוי תיקים |
| שופט/ת (בית משפט שלום) | 22,000–28,000 ₪ |

## פערי שכר לפי מגזר — תמונה כוללת

- **הייטק**: פער של 14% בלבד מהממוצע הארצי — ה**מגזר הטוב ביותר** לצמצום פערים
- **שירות ציבורי**: פער 21% — יציב אך נמוך
- **מסחר ושירותים**: פער 38% — הגרוע ביותר

## המלצות להגדלת שכר

1. **מיון לפי שכר**: השתמשו ב-AllJobs/Glassdoor לבדוק שכר לפני ראיון
2. **משא ומתן**: 67% מהמחפשים לא מנהלים משא ומתן — זה טעות. כל דרישת שכר ניתנת למשא ומתן
3. **הסבה**: Tech-Career / Big Data / Data Science מעלות שכר ב-40-80% בתוך שנה
4. **השכלה נוספת**: תואר שני מעלה שכר ב-28% בממוצע בקהילה`,
      en: `## Salary by Sector — 2025-2026 Data

Based on: CBS, Adva Center, JDC-Ashalim surveys.

### Hi-Tech (Software / Data)
| Role | Median |
|------|--------|
| Junior Developer | 13,000–16,000 ILS |
| Mid-Level Developer | 18,000–25,000 ILS |
| Senior Developer | 28,000–40,000 ILS |

**Average for Tech-Career graduates in year 1**: 14,800 ILS

### Nursing & Health
| Role | Median |
|------|--------|
| Registered Nurse | 9,500–12,000 ILS |
| Specialist Nurse | 13,000–17,000 ILS |

### Education
| Role | Median |
|------|--------|
| High school teacher | 8,500–12,000 ILS |
| School principal | 14,000–20,000 ILS |

### Wage Gap Summary
- Hi-tech: only 14% below national average — **best sector** for closing the gap
- Public sector: 21% gap
- Commerce & services: 38% gap — worst

## How to Increase Salary
1. Research salaries on AllJobs/Glassdoor before interviews
2. Negotiate — 67% of job-seekers don't, and it's a mistake
3. Career switch to tech or data science raises salary 40-80% within a year`,
      am: `## ደሞዝ በሴክተር (2025-2026)

**ሃይቴክ (Software)**
- ጀማሪ: 13,000–16,000 ሺ"ል
- ሲኒዮር: 28,000–40,000 ሺ"ል

**ነርሲንግ**
- ኦዲናሪ: 9,500–12,000 ሺ"ል

**ትምህርት**
- አስተማሪ: 8,500–12,000 ሺ"ል

**ክፍተት ማሽቆልቆያ**
ሃይቴክ ሴክተር ለክፍተት ቅነሳ ምርጥ ዕድል ነው።`,
    },
  },

  {
    slug: "civil-service-exam-guide-ethiopian",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "rights"],
    title: {
      he: "מבחן מיון לשירות המדינה — מדריך ייחודי לקהילה האתיופית",
      en: "Civil Service Selection Exam — Guide for the Ethiopian-Israeli Community",
      am: "የሲቪል ሰርቪስ ፈተና — ለኢትዮጵያ-እስራኤሎች መመሪያ",
    },
    excerpt: {
      he: "מבחן שוהם, הגנת מקרים, ועדת ייצוג הולם — הכל על האפשרויות להיכנס לשירות המדינה עם ייצוג הולם ליוצאי אתיופיה.",
      en: "Shoham test, special accommodations, and the Affirmative Representation Committee — everything about entering civil service with Ethiopian-Israeli preference.",
      am: "የሾሃም ፈተና፣ ልዩ ድጋፍ፣ እና ሃሳዊ ውክልና ኮሚቴ — ወደ ሲቪል ሰርቪስ ስለ መግባት ሁሉ።",
    },
    bodies: {
      he: `## מהו מבחן שוהם?

מבחן שוהם הוא בחינת כניסה לשירות המדינה הישראלי. הוא מבחן קוגניטיבי-כישורי הכולל:
- **חשיבה מילולית** (עברית): הבנת הנקרא, השלמת משפטים, אנלוגיות
- **חשיבה כמותית**: חשבון, סטטיסטיקה בסיסית, לוגיקה
- **אנגלית**: בסיסי-בינוני (לפי הדרגה)
- **ידע כללי**: שלטון, חברה, אקטואליה ישראלית

הציון בשוהם מהווה 30-50% מציון הסינון הכולל.

## הזכויות שלכם כיוצאי אתיופיה

### חוק ייצוג הולם
על-פי חוק, לפחות 2% ממשרות השירות הציבורי חייבות להיות מאוישות על ידי יוצאי אתיופיה. בפועל — כיום עומדים על ~1.2% בלבד, כלומר **עדיין יש עדיפות**.

### ועדת ייצוג הולם
לכל משרד ממשלתי יש ועדת שוויון הזדמנויות. אם קיבלתם ציון גבולי — תוכלו לבקש **בחינה מחדש** בפני הוועדה תוך הפניה לייצוג הולם.

### התאמות מיוחדות
- ניתן לבקש **זמן מוארך** (20-30%) בגלל שפת אם שאינה עברית
- **מהדורת שאלות פשוטה**: ניסוח מפושט של שאלות (לא תמיד מוצעת, כדאי לשאול)
- **מיקום**: בקשו לנגיש לכם מרכז בדיקה קרוב לבית

## איך מתכוננים?

**חינם**:
- אתר נבחנים.co.il — שאלות לדוגמה חינם
- קורסים ב-Coursera על חשיבה לוגית (אנגלית)
- קבוצת פייסבוק "מתכוננים לשוהם 2026" — אלפי חברים

**בתשלום (ומומלץ)**:
- רב-מבחן: קורס מרוכז 35 שעות — ~1,200 ₪
- Shoham Academy: ~1,500 ₪
- Maor: ~1,000 ₪ + אחריות להחזר אם לא עוברים

## לאחר המבחן — שלבי הגיוס

1. ציון שוהם → 2. ועדת מינוי → 3. ראיון מקצועי → 4. המלצות → 5. בדיקת ביטחון → 6. מינוי

**משך זמן ממוצע** מהגשה למינוי: 4-9 חודשים.

📞 נציבות שירות המדינה: 02-6400123 | NALA (ייצוג הולם): 02-6402020`,
      en: `## What is the Shoham Test?

The Shoham exam is the entry test for Israeli civil service. It tests:
- **Verbal reasoning** (Hebrew): reading comprehension, sentence completion, analogies
- **Quantitative reasoning**: arithmetic, basic statistics, logic
- **English**: basic-intermediate (grade-dependent)
- **General knowledge**: government, society, Israeli current affairs

## Your Rights as an Ethiopian-Israeli

**Affirmative Representation Law**: At least 2% of civil service positions must be filled by Ethiopian-Israelis. Currently at ~1.2%, so **preference still applies**.

**Special Accommodations**: You can request extended time (20-30%) due to non-native Hebrew, and a simplified question version (ask proactively).

## How to Prepare

**Free**: nivchanim.co.il (sample questions), Coursera logical thinking courses, Facebook group "מתכוננים לשוהם 2026"

**Paid (recommended)**: Rav-Mivhan course (~1,200 ILS), Shoham Academy (~1,500 ILS)

📞 Civil Service Commission: 02-6400123`,
      am: `## የሾሃም ፈተና ምንድን ነው?

ሾሃም ለሲቪል ሰርቪስ የመግቢያ ፈተና ነው። ቃላዊ አስተሳሰብ፣ ቁጥራዊ አስተሳሰብ እና አጠቃላይ እውቀትን ይሸፍናል።

## ዋና መብቶቸ

- **ሃሳዊ ውክልና**: 2% ኢትዮጵያ-እስራኤሎች ሲቪል ሰርቪስ ሊይዙ ይገባቸዋል
- **ልዩ ጊዜ**: ዕድሜ አባቱ ዕብራይስጥ ካልሆነ 20-30% ተጨማሪ ጊዜ

📞 02-6400123`,
    },
  },

  {
    slug: "teaching-career-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "education"],
    title: {
      he: "קריירה בהוראה לבוגרי הקהילה האתיופית — המדריך המלא",
      en: "Teaching Career for Ethiopian-Israeli Graduates — The Complete Guide",
      am: "ለኢትዮጵያ-እስራኤሎች ትምህርት ሙያ — ሙሉ መመሪያ",
    },
    excerpt: {
      he: "ישראל במחסור חריף במורים — בייחוד בערים עם ריכוז אתיופי. מה נדרש להסמכה, אילו מלגות קיימות, ולמה ההוראה היא ההשקעה הטובה ביותר לקהילה.",
      en: "Israel faces a severe teacher shortage — especially in cities with high Ethiopian-Israeli populations. Certification requirements, scholarships, and why teaching is the community's best investment.",
      am: "እስራኤል ከፍ ያለ አስተማሪ እጥረት አለ። ፍቃደኝነት ደረጃዎቸ፣ ዕድሎቸ እና ለምን ማስተማር ጥሩ ሙያ እንደሆነ።",
    },
    bodies: {
      he: `## למה הוראה? — נתונים שיש לדעת

- ישראל חסרה **8,000 מורים** (2025-2026) — בעיקר במתמטיקה, מדעים, ועברית כשפה שנייה
- בערים עם ריכוז אתיופי גבוה (נתניה, קריית מלאכי, לוד, רמלה) — המחסור **פי 2** מהממוצע
- מורה מהקהילה = **מודל הזדהות** לתלמידים אתיופים — מחקרים מראים שיפור ב-23% בשיעורי גמר בגרות
- **שכר**: בית ספר תיכון, 6 שנות ותק — 11,500–14,000 ₪ + תוספות

## דרישות הסמכה

### מסלול סטנדרטי (4 שנים)
- תואר ראשון (B.Ed) מכללת חינוך מוכרת
- מכללות מומלצות לקהילה: **מכללת אורנים** (חיפה), **מכללת לוינסקי** (ת"א), **בית ברל** (מרכז)
- עלות: 12,000–22,000 ₪/שנה (עם מלגות: 4,000–8,000 ₪/שנה)

### מסלול לבעלי תואר (2 שנים)
- אם כבר יש לכם תואר ראשון בכל תחום — ניתן ללמוד תעודת הוראה (2 שנים) + חצי שנה התמחות
- הסמכה מקוצרת: קורס MOFET — 18 חודשים
- מתאים במיוחד לתחומי מתמטיקה, מדעים, אנגלית

### הוראת עברית כשפה שנייה (מבוקש מאוד!)
- תעודה ייחודית ל-"עברית כשפה שנייה" — 2 סמסטרים
- מדינה משלמת **בונוס 800 ₪/חודש** למורי עברית שנייה
- הקהילה האתיופית מכירה את קשיי שפה שנייה מניסיון — יתרון אמיתי

## מלגות להוראה

| מלגה | גוף מממן | סכום | קישור |
|------|----------|------|-------|
| מלגת חוזי הוראה | משרד החינוך | 14,000–20,000 ₪/שנה | education.gov.il |
| "מלגת מחנכים" | MIF | 25,000 ₪ לשנה | mif.org.il |
| מלגת ENP | ENP | 8,000–15,000 ₪ | enp.org.il |
| מלגת אורנים-קהילה | אורנים | 6,000 ₪ | oranim.ac.il |

## שירות מדינה + פטור חלקי מהלוואות

מורים שמתחייבים ל-3 שנות שירות בבתי ספר בפריפריה מקבלים:
- מחיקת 30-50% מהלוואת הסטודנטים
- עדיפות בדיור ציבורי
- תוספת שכר 800-1,200 ₪/חודש (בונוס פריפריה)

📞 משרד החינוך: 02-5602222 | ENP: 03-5368944`,
      en: `## Why Teaching? Key Data

Israel faces a shortage of **8,000 teachers** (2025-2026) — especially in mathematics, sciences, and Hebrew as a second language. In cities with high Ethiopian-Israeli populations (Netanya, Kiryat Malachi, Lod, Ramla), the shortage is **double** the national average.

Ethiopian-Israeli teachers serve as **role models** — research shows a 23% improvement in matriculation rates when students have teachers from their own community.

**Salary**: High school, 6 years' seniority — 11,500–14,000 ILS + supplements.

## Certification Requirements

**Standard path (4 years)**: Bachelor's in Education (B.Ed) from a recognised college.

**For degree holders (2 years)**: If you already have a bachelor's in any field, you can get a teaching certificate in 2 years + 6-month internship. MOFET accelerated programme: 18 months.

**Hebrew as a second language (high demand!)**: 2-semester certificate, state pays 800 ILS/month bonus. The community's bilingual background is a genuine advantage.

## Scholarships

| Grant | Funder | Amount |
|-------|--------|--------|
| Teaching Contract | Ministry of Education | 14,000–20,000 ILS/yr |
| "Educators Scholarship" | MIF | 25,000 ILS/yr |
| ENP Grant | ENP | 8,000–15,000 ILS |

📞 Ministry of Education: 02-5602222 | ENP: 03-5368944`,
      am: `## ለምን ማስተማር?

እስራኤሎ 8,000 አስተማሪ ጎድለዋታል (2025-2026)። ከኢትዮጵያ-እስራኤሎች ዕጥፍ ያለ ከሚደለ ከፍ ያለ ቦታ።

## ፍቃደኝነት

- መደበኛ: 4 ዓመት B.Ed
- ምሩቃን: 2 ዓመት ሰርተፍኬት

## ዕድሎቸ

- የትምህርት ሚኒስቴር ዕርዳታ: 14,000–20,000 ሺ"ል/ዓመት
- ENP: 8,000–15,000 ሺ"ል

📞 02-5602222 | 03-5368944`,
    },
  },

  {
    slug: "social-work-career-ethiopian-community",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "community"],
    title: {
      he: "קריירה בעבודה סוציאלית — מסלול לבוגרי הקהילה האתיופית",
      en: "Social Work Career — A Path for Ethiopian-Israeli Graduates",
      am: "የማኅበራዊ ሥራ ሙያ — ለኢትዮጵያ-እስራኤሎች",
    },
    excerpt: {
      he: "ביקוש גבוה לעובדים סוציאליים דוברי אמהרית — ושכר של 8,000-16,000 ₪. מה נדרש, איפה לומדים, ואיך להתחיל.",
      en: "High demand for Amharic-speaking social workers — and salaries of 8,000-16,000 ILS. Requirements, where to study, and how to start.",
      am: 'አማርኛ ለሚናገሩ ማኅበራዊ ሠራተኞቸ ከፍ ያለ ፍላጎት አለ — 8,000-16,000 ሺ"ል ደሞዝ።',
    },
    bodies: {
      he: `## למה עבודה סוציאלית מתאימה לקהילה?

1. **ביקוש גבוה לדוברי אמהרית**: מחלקות רווחה בערים עם ריכוז אתיופי (קריית מלאכי, נתניה, לוד, רחובות) מחפשות בדחיפות עו"ס דוברי אמהרית
2. **הבנה תרבותית**: עו"ס מהקהילה מסוגל לעזור לטיפוס מגישים שלא מגיעים אחרת לשירותים
3. **שכר סביר + יציבות**: 8,000-16,000 ₪ (תלוי ניסיון) + קביעות בשירות הממשלתי

## דרישות הסמכה

### תואר ראשון (B.S.W) — 4 שנים
- מוסדות מובילים: **האוניברסיטה העברית** (ירושלים), **אוניברסיטת בר-אילן** (רמת גן), **אוניברסיטת חיפה**
- עלות: 15,000–25,000 ₪/שנה (עם מלגות: 5,000–12,000 ₪)
- כולל: 600 שעות התמחות מעשית בשנה ג'-ד'

### בשירות הציבורי
- רישיון מהמועצה לעבודה סוציאלית (חובה)
- חידוש מדי 5 שנות השתלמות: 30 שעות/שנה
- ייחוד ל"עו"ס בקהילה": ניתן לעבוד ברובד ראשוני עם תעודת הוראה ותוספת קורס

## מסלולי ייחוד

- **עו"ס לנוער בסיכון**: ביקוש גבוה בקהילה, שכר 10,000-14,000 ₪
- **עו"ס גריאטרי**: לטיפול בזקנים — ביקוש גבוה מאוד ופחות מועמדים
- **עו"ס קהילתי**: עבודה ברמת שכונה/עיר — מתאים מאוד לעבודה בקהילה האתיופית

## מלגות

- **מלגת JDC-Ashalim**: עד 20,000 ₪/שנה לסטודנטים מהפריפריה
- **מלגת אוניברסיטה עברית — מגוון**: 8,000-15,000 ₪ לסטודנטים מהפריפריה הגיאוגרפית והחברתית
- **מלגת "אדוה לשינוי"**: 6,000 ₪ לסטודנטים בעבודה סוציאלית מקהילות מגוונות

## ניסיון מעשי לפני הלימודים

מומלץ להתנדב 6-12 חודשים במחלקת רווחה מקומית (ניסיון שיעזור גם בראיון הלימודים). חפשו התנדבות ב-JDC-Ashalim, מגן דוד אדום, או עמותות קהילתיות.

📞 המועצה לעבודה סוציאלית: 03-5120011 | JDC-Ashalim: 03-6933900`,
      en: `## Why Social Work Suits the Community?

1. **High demand for Amharic speakers**: Welfare departments in cities with Ethiopian-Israeli populations urgently seek Amharic-speaking social workers
2. **Cultural competency**: Community social workers reach clients who don't access services otherwise
3. **Stable salary**: 8,000-16,000 ILS (based on experience) + civil service tenure

## Qualification Requirements

**Bachelor's (B.S.W) — 4 years**: Hebrew University (Jerusalem), Bar-Ilan University (Ramat Gan), Haifa University. Includes 600 hours of supervised practical placement in years 3-4.

## Specialisations

- **Youth at risk**: High demand, 10,000-14,000 ILS salary
- **Geriatric social work**: Very high demand, fewer candidates
- **Community social work**: Ideal for working within the Ethiopian-Israeli community

## Scholarships

- JDC-Ashalim scholarship: up to 20,000 ILS/year
- Hebrew University diversity scholarship: 8,000-15,000 ILS

📞 Social Work Council: 03-5120011`,
      am: `## ለምን ማኅበራዊ ሥራ?

አማርኛ ለሚናገሩ ማኅበራዊ ሠራተኞቸ ከፍ ያለ ፍላጎት ይጠበቃል። ከ8,000 እስከ 16,000 ሺ"ል ደሞዝ።

## ዲግሪ (4 ዓመት)

ዕብራይስጥ ዩኒቨርሲቲ፣ ባር-ኢላን፣ ሃይፋ ዩኒቨርሲቲ

## ዕድሎቸ

JDC-Ashalim: እስከ 20,000 ሺ"ል/ዓመት

📞 03-5120011`,
    },
  },

  {
    slug: "entrepreneurship-ethiopian-community-2026",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "community"],
    title: {
      he: "יזמות בקהילה האתיופית — קרנות, תוכניות ועסקי מופת",
      en: "Entrepreneurship in the Ethiopian-Israeli Community — Funds, Programmes & Success Stories",
      am: "ለኢትዮጵያ-እስራኤሎች ሥራ ፈጠራ — ፈንዶቸ፣ ፕሮግራሞቸ እና ስኬቶቸ",
    },
    excerpt: {
      he: "קרן מאוף, הלוואות ISOC, ותוכנית ESOC — עשרות עסקים יהודי-אתיופים פועלים בישראל. כך תתחילו.",
      en: "Maof fund, ISOC loans, ESOC programme — dozens of Ethiopian-Israeli businesses operate in Israel. Here's how to start.",
      am: "ማዖፍ ፈንድ፣ ISOC ብድሮቸ፣ ESOC ፕሮግራም — እንዴት ሥራ ፈጠራ ይጀምሩ።",
    },
    bodies: {
      he: `## מצב היזמות בקהילה

נכון ל-2025, פועלים בישראל **מעל 300 עסקים** שבעליהם יוצאי אתיופיה. מרביתם: מסעדות (מטבח אתיופי), טכסטיל ואופנה, תיירות, ושירותי טכנולוגיה. אולם, שיעור הישרדות העסקים בשנה הראשונה עומד על 54% — נמוך מ-71% הממוצע הארצי. הפתרון: ייעוץ עסקי מקצועי וגישה לאשראי.

## קרנות ואשראי

### קרן מאוף — הכלי המרכזי
**קרן מאוף** (לשעבר "קרן רמלה") היא קרן ממשלתית לפיתוח עסקים בקהילות מיעוט. הלוואות של 30,000-500,000 ₪ בריבית מסובסדת.
- **זכאות**: עסק עם ותק עד 7 שנים, יזם מקהילה מיעוט
- **ריבית**: פריים + 1.5% בלבד (לעומת פריים + 4-6% בבנקים)
- **ייעוץ נלווה**: חובה — 6-12 חודשי ייעוץ עסקי

📞 קרן מאוף: 03-5121000 | maof.org.il

### ISOC — הלוואות לאינטרנט ו-IT
**ISOC** (אגודת האינטרנט הישראלית) מעניקה מענקים של עד 50,000 ₪ לעסקים בתחום הטכנולוגיה שבבעלות יזמים מקהילות מגוונות.

### בנק הפועלים — מסלול "קשת"
הלוואות של 10,000-150,000 ₪ לעסקים קטנים מקהילות מיעוט, עם ליווי ייעוץ.

## תוכניות האצה וייעוץ

### ESOC — תוכנית יזמות חברתית
תוכנית 6 חודשים לפיתוח רעיון עסקי-חברתי. כוללת: מנטור, גישה ל-hub, תמיכה משפטית ראשונית. קהל: 21-40, מכל הרקעות. Contact: esoc.org.il

### Tachlit — יזמות לנוער
תוכנית ייחודית לנוער יוצא אתיופיה גילאי 16-22: 3 ימי בוטקמפ, מענק קמה-קמה של 5,000 ₪.

## 3 מודלים מהקהילה

**1. מסעדת "אוריתה" (ירושלים)**: יזמת Selamawit Tesfaye פתחה ב-2019 עם הלוואת מאוף. כיום 3 סניפים, 18 עובדים — 70% מהקהילה.

**2. Tech.IL (תל אביב)**: Yosef Mengiste, בוגר Tech-Career, פתח סטארטאפ SaaS ב-2022. גייס 600K מ-Angels, 4 עובדים.

**3. Bridal by Miriam (רחובות)**: מעצבת שמלות כלה Miriam Alemu — פתחה עם קרן מאוף, מחזור שנתי מעל 1 מיליון ₪.

📞 קרן מאוף: 03-5121000 | ESOC: esoc.org.il`,
      en: `## State of Entrepreneurship in the Community

As of 2025, **over 300 businesses** in Israel are owned by Ethiopian-Israelis. Most common: restaurants (Ethiopian cuisine), textiles, tourism, tech services. However, the year-1 survival rate is 54% — below the 71% national average. The fix: professional business advice and access to credit.

## Funds and Credit

### Maof Fund — The Main Tool
**Maof Fund** gives loans of 30,000–500,000 ILS at subsidised rates (prime + 1.5%) for businesses in minority communities up to 7 years old. Comes with mandatory 6-12 months of business coaching.
📞 03-5121000 | maof.org.il

### ISOC — Grants for Tech/IT
Grants of up to 50,000 ILS for tech businesses owned by founders from diverse communities.

## 3 Community Models

**Oritha Restaurant (Jerusalem)**: Selamawit Tesfaye opened in 2019 with a Maof loan. Now 3 branches, 18 employees — 70% from the community.

**Tech.IL (Tel Aviv)**: Yosef Mengiste, Tech-Career graduate, launched a SaaS startup in 2022. Raised 600K from angels.

📞 Maof: 03-5121000 | ESOC: esoc.org.il`,
      am: `## የሥራ ፈጠራ ሁኔታ

ከ300 በላይ ኢትዮጵያ-እስራኤላዊ ባለሥልጣናት ያሏቸው ድርጅቶቸ ይሠራሉ።

## ፈንዶቸ

- **ማዖፍ ፈንድ**: 30,000–500,000 ሺ"ል ዝቅ ያለ ወለድ | 03-5121000
- **ISOC**: ለቴክ ድርጅቶቸ እስከ 50,000 ሺ"ል ድጎማ

📞 maof.org.il`,
    },
  },

  {
    slug: "army-to-civilian-career-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "community"],
    title: {
      he: "ממסלול קרבי לקריירה אזרחית — מדריך ליוצאי אתיופיה",
      en: "From Combat Service to Civilian Career — Guide for Ethiopian-Israeli Veterans",
      am: "ከጦር ሰርቪስ ወደ ሲቪል ሙያ — ለኢትዮጵያ-እስራኤሎች ወታደሮቸ",
    },
    excerpt: {
      he: "3 מתוך 4 חיילים קרביים יוצאי אתיופיה אינם מנצלים את מלוא זכויות השחרור שלהם. המדריך: מענקים, מלגות, תוכניות מעבר ועצות לשוק העבודה.",
      en: "3 in 4 Ethiopian-Israeli combat veterans don't claim their full discharge rights. The guide: grants, scholarships, transition programmes and job market tips.",
      am: "4 ኢትዮጵያ-እስራኤሎች ወታደሮቸ ውስጥ 3 ሰዎቸ ሙሉ ቅናሽ መብቶቻቸውን አይጠቀሙም። መመሪያ: ድጎማዎቸ፣ ትምህርት ዕድሎቸ፣ ሽግግር ፕሮግራሞቸ።",
    },
    bodies: {
      he: `## הנתונים שלא יודעים

- **78%** מחיילי צה"ל יוצאי אתיופיה משרתים בתפקידים קרביים (לעומת 46% בממוצע)
- **62%** אינם מנצלים מלגת השחרור שלהם תוך 4 שנים (היא פגה!)
- **41%** אינם יודעים על הלוואת דיור לחיילים משוחררים

## מה מגיע לך — רשימה מלאה

### 1. מענק שחרור
מחושב לפי: תפקיד × תקופת שירות × יחידה.
- **שירות סדיר קרבי (2.5-3 שנות)**: 70,000–85,000 ₪
- **שירות מוארך (4+)**: עד 120,000 ₪
- **יחידות מיוחדות** (יהלום, מגלן, שלדג): בונוס 15,000-30,000 ₪ נוסף

**חשוב**: יש להגיש בקשה **תוך 90 יום מהשחרור**. לאחר מכן — תצטרכו ערעור.

### 2. מלגת השכלה ("מענק לימודים")
- **אוניברסיטה / מכללה**: עד 80% שכר לימוד, עד 4 שנים
- **לקרביים**: עד 5 שנים ועד 90%
- **תוקף**: 5 שנים מהשחרור

### 3. נקודות משכנתא
שירות קרבי מזכה בנקודות ריבית מיוחדות — ניתן לשלב עם תוכנית 600K.

### 4. עדיפות בשירות ציבורי
נקודות בונוס בסינון למשרות ממשלתיות. שירות קרבי = 5 נקודות נוספות.

## תוכניות מעבר מומלצות

### Yalad — תוכנית מעבר לתעסוקה (ביטוח לאומי)
6 חודשי ליווי מקצועי: הגדרת יעד תעסוקתי → עדכון קו"ח → הכנה לראיונות → הצבה. חינם לכל משוחרר צה"ל.
📞 ביטוח לאומי: 08-6709709 → שאלו על "תוכנית יל"ד"

### Tech-Career — לקרביים עם רקע טכנולוגי
מי שירת ביחידות 8200, ממרם, או יהלום — זכאי למסלול מהיר (10 שבועות) לקריירת הייטק.
📞 tech-career.co.il

### Yahalom Alumni Network
בוגרי יחידת יהלום (מיוחדת לקהילה האתיופית) — רשת של מעל 300 בוגרים, חיבורים לתעסוקה.

## שגיאות נפוצות לאחר שחרור

1. **לא לשחרר מלגה**: המלגה פגה אחרי 5 שנים — גם אם לא לומדים עכשיו, קבעו פגישה ב-BAMAHANEH
2. **לפתוח תיק בסוכנות תעסוקה מיד**: ביומן ראשון לאחר שחרור — נרשמים בלשכת התעסוקה לקבל אחוז אבטלה אם צריך
3. **לא להיטפל ל-PTSD**: אם יש תסמינים — הפנייה לפסיכיאטר צבאי ניתנת עד 5 שנים לאחר שחרור

📞 אגף שיקום (משרד הביטחון): 03-7381111 | Yalad: 08-6709709`,
      en: `## The Data People Don't Know

- **78%** of Ethiopian-Israeli IDF soldiers serve in combat roles (vs. 46% average)
- **62%** don't claim their education scholarship within the 4-year window (it expires!)
- **41%** don't know about the post-discharge housing loan

## What You're Entitled To

**Discharge grant**: Combat service (2.5-3 years): 70,000–85,000 ILS. Extended service (4+): up to 120,000 ILS. **Must apply within 90 days of discharge.**

**Education scholarship**: Up to 80% of tuition for 4 years (5 years and 90% for combat veterans). Valid for 5 years post-discharge.

**Mortgage points**: Combat service qualifies for special mortgage rate benefits.

## Recommended Transition Programmes

- **Yalad** (NII): 6-month professional transition support: free for all IDF veterans. 📞 08-6709709
- **Tech-Career**: Fast track (10 weeks) for veterans with tech background (8200, Mamram, Yahalom)
- **Yahalom Alumni Network**: 300+ alumni, employment connections

## Common Post-Discharge Mistakes

1. Not collecting the scholarship — it expires after 5 years
2. Not registering with the Employment Service on day 1 (for unemployment benefits if needed)
3. Not treating PTSD — referral to military psychiatrist available up to 5 years post-discharge

📞 Rehabilitation Division: 03-7381111`,
      am: `## ምን ይፈቀዳል?

- **ቅናሽ ድጎማ**: 70,000–120,000 ሺ"ል (ከ90 ቀን ውስጥ ማመልከት)
- **ትምህርት ዕድሎቸ**: እስከ 80% ለ4 ዓመታት

## ዋና ፕሮግራሞቸ

- **Yalad**: ነፃ 6 ወር ሙያ ሽግግር | 08-6709709
- **Tech-Career**: ለቴክ ሙያ ፈጣን ትምህርት

📞 03-7381111`,
    },
  },

  {
    slug: "nursing-career-ethiopian-community-guide",
    publishedAt: "2026-05-31",
    updatedAt: "2026-05-31",
    tags: ["employment", "health"],
    title: {
      he: "קריירה בסיעוד לקהילה האתיופית — ביקוש גבוה, שכר טוב",
      en: "Nursing Career for the Ethiopian-Israeli Community — High Demand, Good Pay",
      am: "ለኢትዮጵያ-እስራኤሎች ነርሲንግ ሙያ — ከፍ ያለ ፍላጎት",
    },
    excerpt: {
      he: "ישראל חסרה 4,000 אחיות. בוגרי הקהילה שמסיימים לימודי סיעוד — שיעור ההשמה הוא 97%. שכר ממוצע 11,000 ₪ ואפשרות לקידום מהיר.",
      en: "Israel lacks 4,000 nurses. Ethiopian-Israeli nursing graduates have a 97% placement rate. Average salary 11,000 ILS with fast advancement opportunities.",
      am: "እስራኤሎ 4,000 ነርሶቸ ጎድሏቸዋቸ። ምሩቃን 97% ሥራ ያገኛሉ።",
    },
    bodies: {
      he: `## למה סיעוד?

- ישראל חסרה **4,000 אחיות** כיום (2026) — ואחת לשנה, 800 חדשות מסיימות לימודים
- שיעור ההשמה לאחר הלימודים: **97%**
- שכר ממוצע: 11,000 ₪/חודש (אח/ת שנת ניסיון 1), עד 17,000 ₪ (אח/ת מומחה)
- **ביקוש גבוה לדוברי אמהרית**: מטופלים מהקהילה מרגישים בנוח יותר עם דוברי אמהרית
- **יציבות**: שירות הממשלה מציע קביעות + קרן פנסיה + 36 ימי חופשה/שנה

## מסלולי הסמכה

### לימודי סיעוד (3 שנים) — מסלול סטנדרטי
- **מכללות עם עדיפות לקהילה**: מכללת רופין (חדרה), מכללת הדסה (ירושלים), מגן דוד אדום
- עלות: 18,000–28,000 ₪/שנה (עם מלגות: 7,000–15,000 ₪)
- כוללת 700 שעות פרקטיקה קלינית

### מסלול מהיר — עוזר סיעוד (10 חודשים)
- מתאים למי שרוצה להיכנס לשוק מהר
- שכר: 7,500–9,000 ₪ + אפשרות להמשך ללימודי אח/ת

### אח/ות מתמחה (לאחר 3+ שנות ניסיון)
- ייחוד: פגיעות ראש, אונקולוגיה, ICU, לידה
- שכר: 13,000–17,000 ₪

## מלגות ייחודיות לסיעוד

| מלגה | גוף | סכום | הערות |
|------|-----|------|-------|
| מלגת "חיזוק סיעוד" | משרד הבריאות | 15,000 ₪/שנה | + מחויבות 2 שנות עבודה |
| מלגת הדסה-קהילה | בי"ח הדסה | 10,000 ₪/שנה | + עדיפות בקבלה לעבודה |
| מלגת JDC-Ashalim | JDC | 8,000–12,000 ₪ | לפריפריה |
| מלגת ENP | ENP | 6,000–10,000 ₪ | כלל-אקדמי |

## תהליך הגשה

1. תיק מועמדות: תעודת בגרות + ציוני בגרות + מכתב מוטיבציה + ראיון
2. מבחן קבלה: עברית, חשבון, ראיון מוסר
3. לימודים: 3 שנים + בחינות רישוי משרד הבריאות
4. רישוי: עמידה בבחינות הסמכה ממלכתיות

📞 משרד הבריאות — אגף סיעוד: 02-5081408 | ENP: 03-5368944`,
      en: `## Why Nursing?

Israel faces a shortage of **4,000 nurses** (2026). Placement rate after studies: **97%**. Average salary: 11,000 ILS/month (year-1 nurse), up to 17,000 ILS (specialist nurse).

High demand for Amharic speakers — Ethiopian-Israeli patients feel more comfortable with Amharic-speaking nurses.

## Certification Paths

**Nursing degree (3 years)**: Ruppin College, Hadassah College, Magen David Adom. Includes 700 clinical practice hours.

**Nursing assistant (10 months)**: Fast entry path, salary 7,500–9,000 ILS.

## Key Scholarships

| Grant | Amount |
|-------|--------|
| Ministry of Health — Nursing Boost | 15,000 ILS/yr |
| Hadassah Community | 10,000 ILS/yr |
| JDC-Ashalim | 8,000-12,000 ILS |

📞 Ministry of Health — Nursing Division: 02-5081408`,
      am: `## ለምን ነርሲንግ?

**97% ምሩቃን ሥራ ያገኛሉ**። አማካኝ ደሞዝ: 11,000 ሺ"ል/ወር።

## ፕሮግራሞቸ

- **ሙሉ ነርሲንግ**: 3 ዓመት
- **ረዳት ነርስ**: 10 ወር

## ዋና ዕድሎቸ

- ጤና ሚኒስቴር ዕርዳታ: 15,000 ሺ"ል/ዓመት

📞 02-5081408 | 03-5368944`,
    },
  },
  {
    slug: "tech-innovation-authority-funding-lod-campus-2026",
    publishedAt: "2026-07-28",
    updatedAt: "2026-07-28",
    tags: ["employment", "cities"],
    title: {
      he: "מימון רשות החדשנות להכשרה טכנולוגית + קמפוס חדש בלוד — מה חדש ב-2026",
      en: "Israel Innovation Authority tech-training funding + new Lod campus — what's new in 2026",
      am: "የእስራኤል ኢኖቬሽን ባለስልጣን የቴክኖሎጂ ስልጠና ፈንድ + አዲስ የሎድ ካምፓስ — በ2026 ምን አዲስ ነገር አለ",
    },
    excerpt: {
      he: "משרד העבודה ורשות החדשנות מממנים תוכנית הכשרה טכנולוגית ייעודית לקהילה בתקציב 10 מיליון ₪, לצד קמפוס טכנולוגי חדש בלוד וזווית יזמות/ניהול לבוגרי יחידה 8200.",
      en: "The Ministry of Labor and the Israel Innovation Authority are funding a dedicated tech-training program for the community with a 10M ILS budget, alongside a new tech campus in Lod and an entrepreneurship/management track for Unit 8200 alumni.",
      am: 'የስራ ሚኒስቴር እና የእስራኤል ኢኖቬሽን ባለስልጣን ለማህበረሰቡ ልዩ የቴክኖሎጂ ስልጠና ፕሮግራም በ10 ሚሊዮን ሺ"ል በጀት ይደግፋሉ፣ ከአዲስ የሎድ ቴክኖሎጂ ካምፓስ ጎን ለጎን።',
    },
    bodies: {
      he: `## מימון ממשלתי ייעודי להכשרה טכנולוגית

משרד העבודה ורשות החדשנות משיקים תוכנית הכשרה טכנולוגית ממוקדת קהילה, בתקציב של **10 מיליון ₪**, ביעד להכשיר **כ-500 גברים ונשים** מקהילת יוצאי אתיופיה בתוך שנתיים. התוכנית שונה מתוכניות ההכשרה הפרטיות הקיימות (כמו טק-קריירה) — זהו תקצוב ממשלתי-רוחבי ולא תוכנית של ארגון בודד.

## קמפוס טכנולוגי חדש בלוד

לצד התקצוב, נבנה בלוד קמפוס הכשרה ויזמות טכנולוגית ייעודי, עם סיום בנייה מתוכנן לסוף 2026. לוד היא גם אחת מערי היעד המרכזיות בתוכנית ההתחדשות העירונית של הקהילה (ראו [התחדשות עירונית ברמת אשכול, לוד](/he/urban-renewal/ramat-ashkol-lod)) — הקמת הקמפוס בעיר יוצרת זיקה ישירה בין שיפור הדיור לשיפור ההזדמנויות התעסוקתיות באותה עיר.

## תוכנית יזמות וניהול — בוגרי יחידה 8200

עמותת בוגרי יחידת 8200 מפעילה תוכנית ייעודית לקידום יזמות וניהול (לא רק הכשרה טכנית) בקרב יוצאי אתיופיה — זווית שונה מהמסלולים הטכניים הקיימים, בהתמקדות בכישורי ניהול, בניית סטארטאפים, וחיבור למנטורים בכירים בהייטק.

## ראו גם

- [טק-קריירה — מדריך הכשרה טכנולוגית](/he/news/tech-career-bootcamp-guide)
- [התחדשות עירונית בלוד](/he/urban-renewal/ramat-ashkol-lod)`,
      en: `## Dedicated government funding for tech training

The Ministry of Labor and the Israel Innovation Authority are launching a community-focused tech-training program with a **10 million ILS** budget, aiming to train roughly **500 men and women** from the Ethiopian-Israeli community within two years. This differs from existing private training programs (like Tech-Career) — it is a cross-cutting government allocation, not a single organization's program.

## New tech campus in Lod

Alongside the funding, a dedicated tech training and entrepreneurship campus is being built in Lod, with construction completion planned for the end of 2026. Lod is also one of the key target cities in the community's urban-renewal plan (see [urban renewal in Ramat Ashkol, Lod](/en/urban-renewal/ramat-ashkol-lod)) — the campus creates a direct link between improved housing and improved employment opportunities in the same city.

## Entrepreneurship and management track — Unit 8200 alumni

The Unit 8200 alumni association runs a dedicated program advancing entrepreneurship and management (not just technical training) among Ethiopian-Israelis — a different angle from the existing technical tracks, focused on management skills, building startups, and connections to senior hi-tech mentors.

## See also

- [Tech-Career — training guide](/en/news/tech-career-bootcamp-guide)
- [Urban renewal in Lod](/en/urban-renewal/ramat-ashkol-lod)`,
      am: `## ልዩ የመንግስት የቴክኖሎጂ ስልጠና ፈንድ

የስራ ሚኒስቴር እና የእስራኤል ኢኖቬሽን ባለስልጣን በ**10 ሚሊዮን ሺ"ል** በጀት ለማህበረሰቡ ልዩ የቴክኖሎጂ ስልጠና ፕሮግራም እያስጀመሩ ነው፣ በ2 ዓመት ውስጥ ወደ **500 ወንዶች እና ሴቶች** ለማሰልጠን ያለመ።

## በሎድ አዲስ የቴክኖሎጂ ካምፓስ

ከፈንዱ ጎን ለጎን፣ በሎድ ልዩ የቴክኖሎጂ ስልጠና እና ስራ ፈጠራ ካምፓስ እየተገነባ ነው፣ ግንባታው በ2026 መጨረሻ ይጠናቀቃል ተብሎ ይጠበቃል። ሎድ ደግሞ ለማህበረሰቡ የከተማ ዕድሳት ዕቅድ ካሉት ዋና ዋና ከተሞች አንዷ ናት።

## የስራ ፈጠራ እና አመራር ትራክ — የ8200 ክፍል ምሩቃን

የ8200 ክፍል ምሩቃን ማህበር ለኢትዮጵያ-እስራኤላውያን የስራ ፈጠራ እና አመራር ልዩ ፕሮግራም ያካሂዳል — ከነባር የቴክኒክ ትራኮች የተለየ አቅጣጫ፣ በአመራር ክህሎቶች እና በስታርትአፕ ግንባታ ላይ ያተኮረ።`,
    },
  },
  {
    slug: "police-traffic-light-model-2026-investigation",
    publishedAt: "2026-06-19",
    updatedAt: "2026-06-19",
    tags: ["civic", "policy"],
    title: {
      he: 'חקירת "7 ימים": המשטרה מיינה תחנות לפי "מודל רמזור" — 5 תחנות סווגו "אדום"',
      en: '"7 Days" investigation: police sorted stations by a "traffic-light model" — 5 stations rated "red"',
      am: 'የ"7 ቀናት" ምርመራ፦ ፖሊስ ጣቢያዎችን በ"ትራፊክ መብራት ሞዴል" መድቧል — 5 ጣቢያዎች "ቀይ" ተብለው ተመድበዋል',
    },
    excerpt: {
      he: 'חקירה עיתונאית של ynet חשפה שהמשטרה מיינה 26 תחנות עם אוכלוסיית יוצאי אתיופיה משמעותית לפי "מודל רמזור" — 5 מהן, כולל קריית גת וקריית מלאכי, סווגו "אדום". נתוני אכיפה לא פורסמו מאז 2023.',
      en: 'A ynet investigation revealed police sorted 26 stations with significant Ethiopian-Israeli populations by a "traffic-light model" — 5, including Kiryat Gat and Kiryat Malakhi, rated "red." Enforcement data hasn\'t been published since 2023.',
      am: 'የynet ምርመራ እንደገለጸው ፖሊስ ጉልህ የኢትዮጵያ-እስራኤላውያን ህዝብ ባላቸው 26 ጣቢያዎች ላይ "ትራፊክ መብራት ሞዴል" ተጠቅሟል — ቂርያት ጋት እና ቂርያት ማላኪን ጨምሮ 5ቱ "ቀይ" ተብለው ተመድበዋል።',
    },
    bodies: {
      he: `## מה חשפה החקירה

חקירה עיתונאית של מדור "7 ימים" ב-ynet (19.6.2026) חשפה שמשטרת ישראל מיינה 26 תחנות משטרה עם אוכלוסיית יוצאי אתיופיה משמעותית לפי "מודל רמזור" פנימי — ירוק, צהוב, אדום — לפי הערכת רמת המתח בין השוטרים לקהילה. **5 תחנות סווגו "אדום"**, המחייבות התערבות מעמיקה יותר: קריית גת, רחובות, יבנה, עפולה, וקריית מלאכי — כולן ערים עם ריכוזי קהילה משמעותיים, חלקן כבר מוכרות מפרויקטי ההתחדשות העירונית באתר זה.

## הפער בנתונים

נקודה מרכזית שעלתה בחקירה: **נתוני האכיפה כלפי יוצאי אתיופיה לא פורסמו מאז 2023** — מה שהקשה על נציגי המשטרה שהגיעו לדיון בכנסת (בראשות ח"כ מיכאל ביטון) להציג תמונה עדכנית. היעדר שקיפות בנתונים הוא עצמו נושא לביקורת חוזרת מצד ארגוני הקהילה.

## מה זה אומר עבורך

אם אתה מתגורר באחת מהערים שסווגו "אדום" — קריית גת, רחובות, יבנה, עפולה, קריית מלאכי — כדאי להכיר את הזכויות שלך מול המשטרה. ראו [הדרכה מלאה בעמוד Voice](/he/voice/police-conduct): מה מותר/אסור לשוטר לבקש, איך מגישים תלונה, וקו הסיוע המשפטי החינמי של תבקה (1-800-20-20-16).

## ראו גם

- [זכויות מול משטרה — מדריך אזרחי](/he/voice/police-conduct)
- [קול הקהילה — דיווח על גזענות](/he/voice)`,
      en: `## What the investigation found

A ynet "7 Days" investigative report (19.6.2026) revealed that Israel Police sorted 26 stations with significant Ethiopian-Israeli populations using an internal "traffic-light model" — green, yellow, red — based on assessed tension levels between officers and the community. **5 stations were rated "red,"** requiring deeper intervention: Kiryat Gat, Rehovot, Yavne, Afula, and Kiryat Malakhi — all cities with significant community concentrations, several already familiar from this site's urban-renewal coverage.

## The data gap

A key point raised in the investigation: **enforcement data regarding Ethiopian-Israelis hasn't been published since 2023** — making it difficult for police representatives who appeared before a Knesset discussion (chaired by MK Michael Biton) to present an up-to-date picture. This lack of data transparency is itself a recurring point of criticism from community organizations.

## What this means for you

If you live in one of the "red"-rated cities — Kiryat Gat, Rehovot, Yavne, Afula, Kiryat Malakhi — it's worth knowing your rights when dealing with police. See the [full guide on the Voice page](/en/voice/police-conduct): what an officer can and can't ask, how to file a complaint, and Tebeka's free legal-aid line (1-800-20-20-16).

## See also

- [Rights vs. police — civic guide](/en/voice/police-conduct)
- [Community Voice — report racism](/en/voice)`,
      am: `## ምርመራው ምን አሳየ

የynet "7 ቀናት" የምርመራ ዘገባ (19.6.2026) እንደገለጸው የእስራኤል ፖሊስ ጉልህ የኢትዮጵያ-እስራኤላውያን ህዝብ ባላቸው 26 ጣቢያዎች ላይ የውስጥ "ትራፊክ መብራት ሞዴል" — አረንጓዴ፣ ቢጫ፣ ቀይ — ተጠቅሟል፣ በፖሊሶች እና በማህበረሰቡ መካከል ባለው ውጥረት ደረጃ ግምገማ ላይ ተመስርቶ። **5 ጣቢያዎች "ቀይ"** ተብለው ተመድበዋል፣ ጥልቅ ጣልቃ ገብነት የሚያስፈልጋቸው፦ ቂርያት ጋት፣ ረሆቮት፣ ያቭኔ፣ አፉላ እና ቂርያት ማላኪ።

## የመረጃ ክፍተት

በምርመራው የተነሳ ቁልፍ ነጥብ፦ ስለ ኢትዮጵያ-እስራኤላውያን የአፈጻጸም መረጃ ከ2023 ወዲህ አልታተመም።

## ይህ ለእርስዎ ምን ማለት ነው

ከ"ቀይ" ከተሞች በአንዷ የሚኖሩ ከሆነ፣ ከፖሊስ ጋር በተያያዘ መብቶችዎን ማወቅ ጠቃሚ ነው። [በVoice ገጽ ላይ ያለውን ሙሉ መመሪያ ይመልከቱ](/am/voice/police-conduct)።

## ተመልከቱ

- [ከፖሊስ ጋር መብቶች — የዜግነት መመሪያ](/am/voice/police-conduct)
- [የማህበረሰብ ድምጽ — ዘረኝነት ሪፖርት ያድርጉ](/am/voice)`,
    },
  },
  {
    slug: "holegav-festival-17-2026",
    publishedAt: "2026-06-25",
    updatedAt: "2026-06-25",
    tags: ["community", "cities"],
    title: {
      he: 'פסטיבל "הולגאב" ה-17 ליצירה ישראלית-אתיופית — הדור הצעיר עולה לבמה',
      en: "The 17th Holegav Festival of Ethiopian-Israeli creativity — the younger generation takes the stage",
      am: "17ኛው የሆለጋቭ ፌስቲቫል የኢትዮጵያ-እስራኤላዊ ፈጠራ — ወጣቱ ትውልድ መድረክ ላይ ወጣ",
    },
    excerpt: {
      he: "המהדורה ה-17 של פסטיבל הולגאב (23–25.6.2026, בית הקונפדרציה בירושלים) התמקדה השנה ביוצרים הצעירים של הקהילה — היפ-הופ, רגאיי, אפרוביטס ודאנסהול, ב-15 מופעים.",
      en: "The 17th edition of the Holegav Festival (23–25.6.2026, Confederation House, Jerusalem) focused this year on the community's younger creators — hip-hop, reggae, afrobeats and dancehall, across 15 performances.",
      am: "17ኛው የሆለጋቭ ፌስቲቫል (23–25.6.2026, ኮንፌደሬሽን ሃውስ ኢየሩሳሌም) በዚህ ዓመት በማህበረሰቡ ወጣት ፈጣሪዎች ላይ አተኩሮ ነበር።",
    },
    bodies: {
      he: `## מה זה הולגאב

הולגאב הוא פסטיבל התרבות המרכזי המוקדש ליצירה ישראלית-אתיופית — מוזיקה, מחול, אמנות חזותית וספרות. המהדורה ה-17 (23–25.6.2026) התקיימה בבית הקונפדרציה בירושלים, עם מופעים נוספים בצוללת הצהובה, המזקקה ופרגמון.

## דגש על הדור הצעיר

בניגוד למהדורות קודמות שהתמקדו במורשת ובמוזיקה מסורתית, מהדורת 2026 שמה דגש מובהק על יוצרים צעירים מהדור השני והשלישי של הקהילה — עם 15 מופעים בשלושה ימים בז'אנרים עכשוויים: היפ-הופ, רגאיי, אפרוביטס ודאנסהול. זו נקודת מפנה: תרבות הקהילה לא נשארת "ארכיונית" אלא ממשיכה להתפתח דרך אמנים צעירים שיוצרים משהו חדש.

## למה זה חשוב

פסטיבלים כמו הולגאב הם חלק ממה שמחזיק את הזהות התרבותית של הקהילה חיה עבור הדורות הצעירים יותר — לצד אירועים רשמיים כמו סיגד. אם אתם מחפשים דרך להתחבר לתרבות הקהילה מעבר להיסטוריה, זה בדיוק סוג האירוע לעקוב אחריו.

## ראו גם

- [מורשת יהדות אתיופיה](/he/heritage/events)
- [סיגד 2026](/he/heritage/events/sigd)`,
      en: `## What is Holegav

Holegav is the flagship cultural festival dedicated to Ethiopian-Israeli creativity — music, dance, visual art, and literature. The 17th edition (23–25.6.2026) took place at Confederation House in Jerusalem, with additional performances at the Yellow Submarine, HaMazkeka, and Pargod.

## A focus on the younger generation

Unlike previous editions centered on heritage and traditional music, the 2026 edition placed a clear emphasis on young second- and third-generation creators — 15 performances over three days spanning contemporary genres: hip-hop, reggae, afrobeats, and dancehall. This marks a turning point: the community's culture isn't staying "archival" — it keeps evolving through young artists creating something new.

## Why it matters

Festivals like Holegav are part of what keeps the community's cultural identity alive for younger generations, alongside official events like Sigd. If you're looking for a way to connect with the community's culture beyond its history, this is exactly the kind of event to follow.

## See also

- [Ethiopian-Jewish heritage](/en/heritage/events)
- [Sigd 2026](/en/heritage/events/sigd)`,
      am: `## ሆለጋቭ ምንድን ነው

ሆለጋቭ ለኢትዮጵያ-እስራኤላዊ ፈጠራ የተወሰነ ዋና የባህል ፌስቲቫል ነው — ሙዚቃ፣ ዳንስ፣ የእይታ ጥበብ እና ስነ-ጽሁፍ። 17ኛው ዕትም (23–25.6.2026) በኢየሩሳሌም ኮንፌደሬሽን ሃውስ ተካሂዷል።

## በወጣት ትውልድ ላይ ትኩረት

የ2026 ዕትም በማህበረሰቡ ወጣት ፈጣሪዎች ላይ ግልጽ ትኩረት አድርጓል — በ3 ቀናት 15 ትርኢቶች በዘመናዊ ዘውጎች፦ ሂፕ-ሆፕ፣ ሬጌ፣ አፍሮቢትስ እና ዳንስሆል።

## ለምን አስፈላጊ ነው

እንደ ሆለጋቭ ያሉ ፌስቲቫሎች ለወጣት ትውልዶች የማህበረሰቡን የባህል ማንነት ህያው ከሚያደርጉት አካል ናቸው።

## ተመልከቱ

- [የኢትዮጵያ አይሁድ ቅርስ](/am/heritage/events)
- [ሲግድ 2026](/am/heritage/events/sigd)`,
    },
  },
  {
    slug: "kiryat-gat-court-annuls-will-no-amharic-translation",
    publishedAt: "2026-07-28",
    updatedAt: "2026-07-28",
    tags: ["rights", "family"],
    title: {
      he: "בית משפט בקריית גת ביטל צוואה של עולה מאתיופיה — כי לא תורגמה לה לאמהרית",
      en: "Kiryat Gat court annuls an Ethiopian immigrant's will — because it was never actually translated to Amharic for her",
      am: "የቂርያት ጋት ፍርድ ቤት የኢትዮጵያ ተወላጅ ኑዛዜን ሰረዘ — ወደ አማርኛ ስላልተተረጎመላት",
    },
    excerpt: {
      he: 'בית המשפט לענייני משפחה בקריית גת ביטל צוואה של עולה מאתיופיה (עלתה 1998, נפטרה 2021 בגיל 93) אחרי שהעד שהוצג כ"מתרגם" הודה בעדותו שרק חתם ולא באמת תרגם לה את המסמך. השופטת חייבה את הנכד הזוכה ב-35,000 ₪ הוצאות.',
      en: 'The Kiryat Gat family court annulled the will of an Ethiopian immigrant (arrived 1998, died 2021 at 93) after the witness listed as "translator" admitted in testimony that he only signed and never actually translated the document to her. The judge ordered the beneficiary grandchild to pay 35,000 ILS in costs.',
      am: 'የቂርያት ጋት የቤተሰብ ፍርድ ቤት የኢትዮጵያ ተወላጅ ኑዛዜን ሰረዘ፣ "ተርጓሚ" ተብሎ የተቀመጠው ምስክር በምስክርነቱ ብቻ እንደፈረመ እና በትክክል እንዳልተረጎመላት ካመነ በኋላ።',
    },
    bodies: {
      he: `## מה קרה

בית המשפט לענייני משפחה בקריית גת, בפסיקת השופטת דיאנה פסו-ואגו, ביטל צוואה שערכה עולה מאתיופיה — אם לחמישה ילדים שעלתה ב-1998 ונפטרה בדצמבר 2021 בגיל 93. הצוואה, שנערכה במאי 2015, הורישה את רכוש המנוחה לטובת נכד אחד בלבד, תוך נישול שאר הילדים והנכדים.

## למה הצוואה בוטלה

הנקודה המכריעה: העד שהוצג בעת עריכת הצוואה כ"מתרגם" לאמהרית — כדי לוודא שהמנוחה מבינה את מה שהיא חותמת עליו — **הודה בעדותו בבית המשפט שהוא רק חתם על המסמך ולא באמת תרגם** אותו בעל-פה עבורה. בית המשפט קיבל את ההתנגדות שהגישו יתר היורשים, ביטל את הצוואה במלואה, וחייב את הנכד שהיה אמור להיות הזוכה היחיד ב-35,000 ₪ הוצאות משפט.

## למה זה חשוב לקהילה

המקרה מדגיש סיכון אמיתי וחוזר: מסמכים משפטיים (צוואות, חוזים, הסכמים) הנחתמים ללא תרגום אמיתי ומלא לאמהרית עלולים להתבטל בדיעבד — גם שנים אחרי החתימה — אם מתברר שהחותם/ת לא הבינ/ה בפועל את תוכנם. זו תזכורת לחשיבות של **תרגום משפטי אמיתי, לא פורמלי בלבד**, בכל מסמך מחייב.

## מה עושים

אם את/ה עורך/ת צוואה, חוזה, או כל מסמך משפטי מחייב, ודא/י:
- תרגום בעל-פה מלא ומובן, לא רק חתימה של "מתרגם" פורמלי
- אפשר לבקש נוכחות עורך דין דובר אמהרית או מתורגמן מוסמך
- תבקה (1-800-20-20-16) מספקת סיוע משפטי חינם, כולל בנושאי ירושה וצוואות

## ראו גם

- [תבקה — סיוע משפטי חינם](/he/orgs/tebeka)
- [זכויות דוברי אמהרית מול הרשויות](/he/rights)`,
      en: `## What happened

The Kiryat Gat family court, in a ruling by Judge Diana Passo-Vago, annulled a will made by an Ethiopian immigrant — a mother of five who arrived in Israel in 1998 and died in December 2021 at 93. The will, drawn up in May 2015, left the deceased's estate to a single grandchild, disinheriting the other children and grandchildren.

## Why the will was annulled

The decisive point: the witness listed at the time of drafting as the Amharic "translator" — meant to ensure the deceased understood what she was signing — **admitted in court testimony that he only signed the document and never actually translated it** for her verbally. The court accepted the objection filed by the other heirs, fully annulled the will, and ordered the grandchild who stood to be sole beneficiary to pay 35,000 ILS in legal costs.

## Why this matters for the community

The case highlights a real, recurring risk: legal documents (wills, contracts, agreements) signed without a genuine, full Amharic translation can later be annulled — even years after signing — if it turns out the signer didn't actually understand their content. It's a reminder of the importance of **real legal translation, not merely formal sign-off**, for any binding document.

## What to do

If you're drafting a will, contract, or any binding legal document, make sure:
- There's a full, understood verbal translation — not just a formal "translator" signature
- You can request the presence of an Amharic-speaking lawyer or certified interpreter
- Tebeka (1-800-20-20-16) provides free legal aid, including on inheritance and wills

## See also

- [Tebeka — free legal aid](/en/orgs/tebeka)
- [Amharic-speakers' rights with authorities](/en/rights)`,
      am: `## ምን ተከሰተ

የቂርያት ጋት የቤተሰብ ፍርድ ቤት፣ በዳኛ ዲያና ፓሶ-ቫጎ ውሳኔ፣ በ1998 ወደ እስራኤል የመጣች እና በ2021 በ93 ዓመቷ የሞተች የኢትዮጵያ ተወላጅ ኑዛዜን ሰረዘ። ኑዛዜው ንብረቷን ለአንድ የልጅ ልጅ ብቻ ትቶ ነበር።

## ኑዛዜው ለምን ተሰረዘ

ወሳኙ ነጥብ፦ "ተርጓሚ" ተብሎ የቀረበው ምስክር በፍርድ ቤት ምስክርነቱ ብቻ እንደፈረመ እና በትክክል እንዳልተረጎመላት አምኗል። ፍርድ ቤቱ ኑዛዜውን ሙሉ በሙሉ ሰርዞ የልጅ ልጁ 35,000 ሺ"ል ወጪ እንዲከፍል አዟል።

## ለማህበረሰቡ ለምን አስፈላጊ ነው

ይህ ጉዳይ ትክክለኛ አደጋን ያጎላል፦ ያለ ትክክለኛ የአማርኛ ትርጉም የተፈረሙ ህጋዊ ሰነዶች (ኑዛዜዎች፣ ውሎች) በኋላ ላይ ሊሰረዙ ይችላሉ።

## ተመልከቱ

- [ተቤካ — ነፃ የህግ ድጋፍ](/am/orgs/tebeka)
- [የአማርኛ ተናጋሪዎች መብቶች](/am/rights)`,
    },
  },
  ...ARTICLES_WAVE4,
  ...ARTICLES_WAVE5,
  ...ARTICLES_WAVE6,
  ...ARTICLES_WAVE7A,
  ...ARTICLES_WAVE7B,
  ...ARTICLES_WAVE7C,
  ...ARTICLES_WAVE7D,
  ...ARTICLES_WAVE8,
  ...ARTICLES_WAVE9,
];

// TODO(data/architect): the "Marom" scholarship entry embedded above (~line
// 733, slug-less section titled "מלגת מרום — המועצה להשכלה גבוהה (CHE)", and
// its EN mirror at ~line 800 with "₪8,000–₪20,000/year... Deadline
// January–March") predates the verified `marom-che` rights page
// (app/lib/education/scholarships.server.ts) and contradicts it: the
// verified page states a flat ₪10,000/year with registration opening
// 2026-09-09 directly via che.org.il/scholarships/marom (verified 2026-07,
// per TED-95). This old wave5-era block was NOT touched here (out of scope
// for the wave7 wiring task) — it should be corrected or removed to match
// the verified `marom-che` page. See also the new wave7d article
// `marom-scholarship-tashpav-cycle`, which correctly defers to `marom-che`.

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
