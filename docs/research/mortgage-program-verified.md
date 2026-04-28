# הלוואת המדינה ליוצאי אתיופיה — אימות פרמטרים מול מקורות רשמיים

**Issue**: TED-23 — Phase 3.1.1 Mortgage calc research-grade refinement
**Author**: Tedros Researcher
**Date**: 2026-04-27
**Source language**: Hebrew (HE) — primary; English (EN) — secondary
**Status**: Ready for Architect review

---

## Executive Summary

המודל הנוכחי ב-`app/lib/mortgage/eligibility.ts` (PR #3) הוא **MVP heuristic** ולא משקף את התוכנית הרשמית. הוא ממציא tiers (`standard`/`enhanced`/`single_parent`), per-child top-ups (₪25K/ילד), subsidy share שמשתנה לפי הכנסה (15-70%), ו-grants לא-קיימים (₪25-75K). **אף אחד מאלה לא נמצא במקור רשמי.**

התוכנית הרשמית פשוטה הרבה יותר: **בינארית** (זכאי / לא זכאי). מי שזכאי ונבחר בהגרלה מקבל הלוואה בסכום קבוע **600,000 ₪** ל-25 שנה — 0% ריבית ב-10 שנים הראשונות, 2% ב-15 שנים הבאות. לא תיירים. אין tiers. אין מענק נפרד. אין תקרת הכנסה.

**ההמלצה**: להחליף את המודל הקיים ב-eligibility check בינארי, להציג את התהליך הרשמי (רישום → תעודה → הגרלה → 4 חודשים למימוש), ולהפנות לטופס פנייה ל-lead.

---

## Findings — פרמטרים מאומתים

### 1. גוף מבצע

- **משרד הבינוי והשיכון** (משכ"ה) הוא הגוף המנהל את התוכנית.
- בשיתוף משרד העלייה והקליטה (במשפחות עולות) ומשרד האוצר (במימון משלים).

### 2. סכום ותנאי ההלוואה ✅

| פרמטר                    | ערך מאומת                                     |
| ------------------------ | --------------------------------------------- |
| סכום הלוואה              | **600,000 ₪** (לכל משפחה זוכה)                |
| תקופה                    | **25 שנה**                                    |
| ריבית — 10 שנים ראשונות  | **0%**, ללא הצמדה                             |
| ריבית — 15 שנים נותרות   | **2%** שנתי, צמוד למדד                        |
| תקרה כוללת מול מחיר הנכס | עד **99% ממחיר הדירה** (כולל הלוואות משלימות) |

> מקור: [כל-זכות — קבלת משכנתא לזכאים](https://www.kolzchut.org.il/he/קבלת_משכנתא_לזכאים), [Calcalist — אישור התוכנית](https://www.calcalist.co.il/real_estate/articles/0,7340,L-3704300,00.html), [Bizportal — תנאי ההגרלה](https://www.bizportal.co.il/realestates/news/article/481577).

### 3. הון עצמי ✅

| מסלול                  | דרישת הון עצמי     |
| ---------------------- | ------------------ |
| הלוואה משלימה ≤ 600K ₪ | **5%** ממחיר הנכס  |
| הלוואה משלימה > 600K ₪ | **25%** ממחיר הנכס |

> מקור: [כל-זכות — יוצאי אתיופיה](https://www.kolzchut.org.il/he/יוצאי_אתיופיה), [bizportal](https://www.bizportal.co.il/realestates/news/article/481577).

### 4. גיל — אין הגבלה ✅

- **אין גיל מינימום או מקסימום** מוגדר בתוכנית הרשמית.
- ה-`MIN_AGE = 21` שב-PR #3 הוא heuristic לא רשמי שצריך להיעלם.
- (יש דרישה משנית: הורה יחיד צריך ילד מתחת לגיל 21 שגר איתו — זו דרישת **הילד**, לא הורה.)

> מקור: [כל-זכות](https://www.kolzchut.org.il/he/קבלת_משכנתא_לזכאים), [Calcalist](https://www.calcalist.co.il/real_estate/articles/0,7340,L-3704300,00.html).

### 5. הגדרת "יוצא אתיופיה" ✅

- מי שנולד באתיופיה, **או** שאחד מהוריו נולד באתיופיה / עלה משם.
- אזרח ישראל בהווה — אין דרישה להיות "עולה חדש".
- במשפחה — **די שאחד מבני הזוג** עומד בהגדרה.

> מקור: [Tsuott — סקירת התוכנית](https://www.tsuott.co.il/משכנתא-ליוצאי-אתיופיה/), [Vider](https://www.vider.co.il/articles/mortgage-for-ethiopians/), [bizportal](https://www.bizportal.co.il/realestates/news/article/481577).

### 6. סטטוס משפחתי — מה נחשב "משפחה" ✅

התוכנית מיועדת ל**משפחות בלבד**. שלושה מסלולים מותרים:

1. **נשואים** (עם או בלי ילדים)
2. **ידועים בציבור** החולקים משק בית משותף (עם או בלי ילדים)
3. **הורים יחידים** (רווק/גרוש/אלמן) שיש להם **ילד מתחת לגיל 21 החי איתם**

→ רווק/ה ללא ילדים — **לא זכאי**.

> מקור: [Mashkanta-Til](https://mashkanta-til.co.il/משכנתא-ליוצאי-אתיופיה/), [Mashkantaline](https://mashkantaline.co.il/משכנתא-ליוצאי-אתיופיה/סוגי-משכנתא/).

### 7. דרישת מחוסר דיור (אי-בעלות) ✅

מועמד נחשב "מחוסר דיור" אם:

- **לא הייתה לו בעלות בנדל"ן ב-10 השנים האחרונות**, **או**
- רכש בשנה האחרונה דירה יד-שנייה / ב-3 השנים האחרונות דירה חדשה מקבלן, **בלי** שלקח משכנתא ממשלתית, **ועדיין** משלם תמורתה.

> מקור: [Tsuott](https://www.tsuott.co.il/משכנתא-ליוצאי-אתיופיה/), [כל-זכות](https://www.kolzchut.org.il/he/יוצאי_אתיופיה).

### 8. מכסה והגרלה ✅

- **200 משפחות** זוכות בהגרלה השנתית (במחזורים מסוימים — 220–300 בפועל).
- ההגרלה היא **ברמה ארצית**, ללא הקצאה גיאוגרפית מוקדמת.
- מי שזוכה — חייב לממש את ההלוואה תוך **4 חודשים** מההודעה.

> מקור: [bizportal](https://www.bizportal.co.il/realestates/news/article/481577), [BE106 — תוצאות הגרלה](http://www.be106.net/55/25389), [כל-זכות](https://www.kolzchut.org.il/he/קבלת_משכנתא_לזכאים).

### 9. תהליך רישום ✅

1. משרד השיכון מפרסם מועדי הרשמה (פעם בשנה).
2. המבקש מגיע **פיזית לסניף בנק משכנתאות** עם:
   - תעודת זהות של בני הזוג (או של ההורה היחיד)
   - תעודת נישואין / הצהרה על ידועים-בציבור / מסמכי הורה יחיד
3. בסניף הבנק ינפיקו **תעודת זכאות**, חותמים על טופס מידע + הצהרה.
4. **עלות הנפקה: כ-70 ₪** (בסניף בנק או חברה מוסמכת).
5. אחרי כל הזכאים נרשמו — מתבצעת ההגרלה.

> מקור: [Calcalist — חובת התייצבות פיזית בסניף](https://www.calcalist.co.il/real_estate/articles/0,7340,L-3709617,00.html), [Tsuott](https://www.tsuott.co.il/משכנתא-ליוצאי-אתיופיה/), [Aviv Sheli](https://avivsheli.co.il/lottery-registration-4/).

### 10. סטטוס פעילות התוכנית ⚠️

- התוכנית הוצגה ב-2017 כ**תוכנית חומש** (5 שנים) של ~800 משפחות.
- הגרלות שנתיות בוצעו לפחות בשנים 2017, 2018, 2019, 2020 (220 משפחות בשנה אחת, 300 באחרת).
- **לא הצלחתי לאמת ב-100% שהתוכנית פעילה היום (2026)**: מקורות שניוניים מתייחסים אליה כ"פעילה" אבל ללא תאריכי הגרלה ספציפיים ל-2024-2026.
- דף gov.il (`https://www.gov.il/he/departments/general/immigrants_families_assistance`) מחזיר 403 ל-WebFetch הזה — צריך אדם לפתוח דפדפן ולאשר.

**→ פעולה ל-Engineer/Content**: ה-UI חייב להציג disclaimer:

> _"הגרלות מתפרסמות מעת לעת באתר משרד הבינוי והשיכון. בדקו זמינות הגרלה פעילה לפני הרשמה."_

עם **קישור ישיר** ל-`https://www.gov.il/he/departments/topics/mortgage_assistance_new_immigrant/govil-landing-page`.

---

## פרמטרים שב-PR #3 שאינם נתמכים בשום מקור רשמי ❌

יש להסיר אותם מהקוד:

| פרמטר ב-`eligibility.ts`                                | סטטוס                                                   |
| ------------------------------------------------------- | ------------------------------------------------------- |
| `MIN_AGE = 21`                                          | ❌ אין גיל מינימום בתוכנית                              |
| `INCOME_CEILING = 35_000`                               | ❌ אין תקרת הכנסה רשמית להגרלה                          |
| `tier: standard / enhanced / single_parent`             | ❌ אין tiers — כולם מקבלים אותו סכום                    |
| `baseByTier` (320K / 460K / 500K)                       | ❌ הסכום הוא תמיד 600K לזוכים                           |
| `perChild = 25_000`                                     | ❌ אין top-up לפי ילד                                   |
| `subsidyRate` (0.15–0.7 לפי הכנסה)                      | ❌ אין מדרגת סבסוד — 100% ההלוואה ב-0%/2%               |
| `grantByTier` (25K / 50K / 75K)                         | ❌ אין מענק נפרד מההלוואה                               |
| `subsidisedRateAnnual / marketRateAnnual` (0.5% / 4.5%) | ❌ הריבית ה"מסובסדת" היא 0% ל-10 שנים, ואז 2% ל-15 שנים |

---

## המודל המומלץ — Binary Eligibility

### Pseudocode

```ts
type Input = {
  bornInEthiopia: boolean;
  parentBornInEthiopia: boolean;
  spouseBornInEthiopia: boolean;
  spouseParentBornInEthiopia: boolean;
  familyStatus: "married" | "common_law" | "single_parent" | "single";
  hasChildUnder21LivingWithApplicant: boolean;
  ownedRealEstateLast10Years: boolean;
  recentPurchaseStillPaying: boolean; // see rule #7
};

type Result =
  | {
      eligible: true;
      loan: { amount: 600_000; termYears: 25; rate0to10: 0; rate10to25: 0.02 };
      equityRequired: { ifLoanAtMax: 0.05; ifLoanAbove600K: 0.25 };
    }
  | { eligible: false; reasons: Reason[] };

type Reason =
  | "not_ethiopian_origin" // לא נולד הוא או אחד מהוריו / בן-זוג באתיופיה
  | "not_a_family" // רווק ללא ילדים
  | "single_parent_no_eligible_child" // הורה יחיד ללא ילד < 21 בבית
  | "owned_property_within_10y" // בעלות בעשור האחרון
  | "recent_purchase_disqualifies"; // רכישה אחרונה שמדיסקווליפיקציה
```

### חישוב

1. **בודקים מוצא**: `bornInEthiopia || parentBornInEthiopia || spouseBornInEthiopia || spouseParentBornInEthiopia` → אחרת `not_ethiopian_origin`.
2. **בודקים מבנה משפחה**:
   - `married || common_law` → ✅
   - `single_parent && hasChildUnder21LivingWithApplicant` → ✅
   - אחרת → `not_a_family` או `single_parent_no_eligible_child`
3. **בודקים אי-בעלות**: אם `ownedRealEstateLast10Years && !recentPurchaseStillPaying-exception` → `owned_property_within_10y`
4. **אם הכל עבר** → זכאי. הסכום הוא תמיד 600K, הריביות קבועות, ההון העצמי 5%/25% תלוי בהיקף ההלוואה הסופי.

### UI flow מוצע (5–7 שאלות, לא 5–7 פרמטרים מספריים)

1. האם נולדת באתיופיה? _(כן/לא)_
2. האם אחד מהוריך נולד באתיופיה? _(כן/לא)_ — מוצג רק אם 1 = לא
3. סטטוס משפחתי _(נשוי/ידועים בציבור/הורה יחיד/רווק ללא ילדים)_
4. אם הורה יחיד — האם יש לך ילד מתחת לגיל 21 שגר איתך? _(כן/לא)_
5. אם נשוי/ידועים — אותן שאלות 1+2 על בן/בת הזוג _(כן/לא)_
6. האם יש או הייתה לך בעלות על נדל"ן ב-10 השנים האחרונות? _(כן/לא + הסבר 3 שאלות משנה לחריגים)_

→ **תוצאה**: זכאי / לא זכאי + הסבר התהליך + טופס פנייה ל-lead.

---

## Recommendations

### לארכיטקט (Tedros Architect)

1. **לאשר את המודל הבינארי** המתואר למעלה.
2. להחליט: האם להסיר את `monthlyIncome` מה-input לחלוטין, או לשמור אותו כשדה רשות "כדי שמשרד התיווך יוכל ליצור קשר רלוונטי" (לא ל-eligibility).
3. להגדיר structure ל-`reasons[]` — התרגום שלהן ל-HE/EN/AM צריך להיות מילולי וברור (זה החלק שלא יביא לידים — אם הסיבה לא ברורה, יוצרים תסכול).

### למהנדס (Tedros Engineer)

1. שכתוב מלא של `app/lib/mortgage/eligibility.ts` לפי המודל הבינארי.
2. עדכון `app/routes/$lang.calculator.mortgage-ethiopian-immigrants.tsx`:
   - 5–7 שאלות בינאריות → תוצאת זכאות + פאנל "איך זה עובד בפועל" (4 שלבים: רישום → תעודה → הגרלה → 4 חודשים למימוש)
   - הוספת קישור ל-gov.il למידע מעודכן על הגרלות
   - חיבור ל-Lead form (תלוי TED-21)
3. מחיקת בדיקות שמתקפות tiers/grants/perChild/incomeCeiling וכתיבת בדיקות חדשות לפי המודל הבינארי.

### ל-Content & SEO

1. עדכון `mortgage_seo_keywords` — מומלץ לכלול: "משכנתא ליוצאי אתיופיה", "הגרלת משכנתא 600 אלף", "תוכנית חומש דיור אתיופים", "הון עצמי 5% עולים אתיופיה".
2. עדכון disclaimer עם תאריך עדכון אחרון של המידע + לינק ל-gov.il.
3. הוספת FAQ סקציה (נדרש גם ל-PR #4): שאלות מומלצות:
   - "כמה כסף אקבל בהגרלה?"
   - "כמה הון עצמי אני צריך?"
   - "מי נחשב 'יוצא אתיופיה'?"
   - "מה אם רק בן-זוגי יוצא אתיופיה?"
   - "האם יש הגבלת גיל?"
   - "איך נרשמים?"
   - "כמה עולה הרישום?"

---

## Sources

### מקורות ראשוניים (gov.il / Knesset)

- [gov.il — סיוע במשכנתא למשפחות עולים, משרד הבינוי והשיכון](https://www.gov.il/he/departments/general/immigrants_families_assistance) _(403 ב-WebFetch — לאמת ידנית)_
- [gov.il — דף נחיתה: עולים, סיוע משכנתא](https://www.gov.il/he/departments/topics/mortgage_assistance_new_immigrant/govil-landing-page)
- [gov.il — שאלות ותשובות על תוכנית המשכנתא ליוצאי אתיופיה](https://www.gov.il/he/departments/faq/2-stions-and-answers-about-mortgage-program-for-ethiopians) _(403 ב-WebFetch — לאמת ידנית)_
- [gov.il — התכנית הממשלתית לשילוב יוצאי אתיופיה](https://www.gov.il/he/departments/integration_program/govil-landing-page)
- [Knesset RIC — נתונים על יוצאי אתיופיה וסקירת תכניות סיוע בדיור (PDF)](https://fs.knesset.gov.il/globaldocs/MMM/e9906a60-7f76-f011-a863-005056aa9911/2_e9906a60-7f76-f011-a863-005056aa9911_11_21096.pdf) _(PDF סרוק — חסר תמלול)_
- [Knesset older RIC — הטבות לעולים מבריה"מ, אתיופיה ועוד (PDF)](https://fs.knesset.gov.il/globaldocs/MMM/0938117a-9632-e811-80de-00155d0a0235/2_0938117a-9632-e811-80de-00155d0a0235_11_6775.pdf)

### מקורות שניוניים מהימנים (משפטיים / כלכליים)

- [כל-זכות — יוצאי אתיופיה (פורטל זכויות מטעם המדינה)](https://www.kolzchut.org.il/he/יוצאי_אתיופיה)
- [כל-זכות — קבלת משכנתא לזכאים](https://www.kolzchut.org.il/he/קבלת_משכנתא_לזכאים)
- [Calcalist — אישור התוכנית, פירוט ריביות וקדנציה](https://www.calcalist.co.il/real_estate/articles/0,7340,L-3704300,00.html)
- [Calcalist — חובת התייצבות פיזית בסניף בנק](https://www.calcalist.co.il/real_estate/articles/0,7340,L-3709617,00.html)
- [Bizportal — 600K ₪, 200 משפחות, 0% / 2%](https://www.bizportal.co.il/realestates/news/article/481577)
- [Globes — אישור התוכנית](https://www.globes.co.il/news/article.aspx?did=1001179218)

### מקורות מקצועיים (יועצי משכנתאות — להצלבה)

- [Tsuott Financial — סקירה מלאה](https://www.tsuott.co.il/משכנתא-ליוצאי-אתיופיה/)
- [Mashkanta Guru](https://mashkantaguru.co.il/mortgage-ethiopian-immigrants/)
- [Tripi — תוכנית חומש](https://www.tripi.co.il/משכנתא-ליוצאי-אתיופיה-תוכנית-חומש/)
- [Vider Mortgages](https://www.vider.co.il/articles/mortgage-for-ethiopians/)
- [Iris Schuster — הרשמה להגרלה](https://isaving.co.il/הרשמה-להגרלת-הלוואות-מיוחדות-ליוצאי-א/)
- [Aviv Sheli — תהליך הרשמה](https://avivsheli.co.il/lottery-registration-4/)

### עיתונות קהילתית

- [BE106 — תוצאות הגרלת 12.7](http://www.be106.net/55/25389) — אישור 300 משפחות במחזור מסוים
- [BE106 — קריאה לרישום](https://www.be106.net/231/24194)

---

## Open questions — להעביר ל-PM / Architect

1. **סטטוס פעיל היום (2026)** — האם תוכנית החומש שאושרה ב-2017 הוארכה? צריך לאמת ידנית ב-gov.il בדפדפן (פתחו 403 ב-fetch).
2. **חיבור ל-Lead form (TED-21)** — האם הטופס שולח גם למשרד התיווך הספציפי? ומה השדות הנוספים שצריך מעבר ל-output הזכאות?
3. **הצגת "לא זכאי"** — האם להציע למי שלא זכאי מסלולים חלופיים (למשל: הלוואת זכאות רגילה לזוגות צעירים)? אם כן, זה scope נוסף שצריך מחקר נפרד.
4. **שפה** — נכון לעכשיו המקורות הראשוניים בעברית בלבד. תרגום לאמהרית/אנגלית של ה-FAQ נופל על Content & SEO, לא חלק מאיתור הזה.

---

_המסמך הזה הוא ה-source-of-truth לכל פרמטרי התוכנית עד שהאתר עולה לאוויר. כל שינוי בקוד `eligibility.ts` שלא תואם למסמך הזה — צריך להיות מלווה בעדכון של המסמך + מקור._
