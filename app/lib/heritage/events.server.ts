// Heritage-event seed (RIN-422 — Wave 3 / RIN-417).
//
// 3 community-significant heritage events: Sigd (a national Israeli
// holiday since 2008), Genna (Ethiopian Christmas, January 7), and Yom
// Aliyah (commemorating immigration from Ethiopia, 28 Iyyar). The route
// layer at `/$lang/heritage/events/$event` and the (event × city)
// programmatic cells emit `Event` JSON-LD which Google indexes as a
// dedicated SERP feature.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. Dates are
// authoritative for each event's calendar pattern; specific year
// observations land via the `nextDate` helper.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { HeritageEventSlug } from "./categories";

export interface HeritageEventEntry {
  slug: HeritageEventSlug;
  name: Translatable;
  shortDescription: Translatable;
  /**
   * Hebrew calendar fixed date (used to compute `nextDate`). For Sigd:
   * 29 Cheshvan. For Genna: Jan 7 (Gregorian). For Aliyah Day: 28 Iyyar.
   * Stored as a free-form description because we don't ship a Hebrew
   * calendar library — `nextDate` returns the next observance year as a
   * Gregorian YYYY-MM-DD string we maintain explicitly here.
   */
  dateDescription: Translatable;
  /** Future observance dates (Gregorian YYYY-MM-DD) — owner updates yearly. */
  upcomingDates: string[];
  /** Slugs of related rights / glossary terms / orgs for cross-links. */
  relatedRights: string[];
  relatedTerms: string[];
  relatedOrgs: string[];
  bodies: Record<Locale, string>;
}

export const HERITAGE_EVENTS: HeritageEventEntry[] = [
  // 1 — Sigd (the headline event) ----------------------------------------
  {
    slug: "sigd",
    name: { he: "סיגד", en: "Sigd", am: "ሰግድ" },
    shortDescription: {
      he: "החג הרשמי המרכזי של יהדות אתיופיה — חודש חשוון, אירוע ראשי בירושלים + 36 ערים.",
      en: "The Ethiopian Jewish community's headline holiday, recognized as a national holiday in 2008 — main observance in Jerusalem with parallel events in 36 cities.",
      am: "የኢትዮጵያ አይሁዳዊ ማህበረሰብ ዋና ብሔራዊ በዓል — በኢየሩሳሌም እና በ36 ከተሞች።",
    },
    dateDescription: {
      he: "29 בחשוון (סוף אוקטובר/תחילת נובמבר)",
      en: "29 Cheshvan (late October / early November)",
      am: "29 ኅዳር (የጥቅምት መጨረሻ / የኅዳር መጀመሪያ)",
    },
    // TED-169 — derived, not inherited. 29 Cheshvan 5787 = Mon 9.11.2026;
    // 5788 = Mon 29.11.2027; 5789 = *Sat* 18.11.2028, so s.1(a) of חוק חג
    // הסיגד moves it to the preceding Thursday, 16.11.2028. Cross-checks
    // against Yom Kippur 5787 (10 Tishrei = Mon 21.9.2026) + 50 days counted
    // inclusively. 19.11.2026 is 9 Kislev: it is wrong, and was removed by
    // TED-165 after shipping on three pages.
    upcomingDates: ["2026-11-09", "2027-11-29", "2028-11-16"],
    relatedRights: ["sigd-funding"],
    relatedTerms: ["sigd", "kessim"],
    relatedOrgs: ["bina", "iaej"],
    bodies: {
      he: `## מתי חל הסיגד? יום שני, 9 בנובמבר 2026

**סיגד תשפ"ז יחול ביום שני, 9 בנובמבר 2026 — כ"ט בחשוון תשפ"ז.**

כדי שתוכלו לבדוק אותנו ולא רק להאמין לנו, זו דרך החישוב:

1. **החוק קובע את היום העברי, לא את הלועזי.** סעיף 1(א) לחוק חג הסיגד: "הכנסת מכריזה בזה על יום כ"ט בחשוון כעל חג הסיגד, שיוחג מדי שנה בשנה כחג המדינה וייקרא בשם 'חג הסיגד'".
2. **כ"ט בחשוון תשפ"ז חל ביום שני, 9.11.2026** על-פי הלוח העברי.
3. **הצלבה עצמאית שנייה:** הסיגד חל חמישים יום אחרי יום הכיפורים. יום הכיפורים תשפ"ז — י' בתשרי — חל ביום שני, 21.9.2026. סופרים את יום הכיפורים עצמו כיום הראשון, ולכן היום החמישים הוא 9.11.2026 (כלומר 49 ימים מלאים אחרי הכיפורים). שתי הדרכים מגיעות לאותו יום.

> **שימו לב — 19.11.2026 הוא תאריך שגוי.** 19 בנובמבר 2026 הוא ט' בכסלו, עשרה ימים *אחרי* הסיגד. התאריך השגוי הזה הופיע גם בעמוד הזה עד 8.9.2026 ותוקן. אם תכננתם לפיו יום חופש, הסעה או אירוע קהילתי — התאריך הנכון הוא 9.11.2026.

### מתי יחול הסיגד בשנים הבאות

| שנה עברית | כ"ט בחשוון | מתי מציינים בפועל |
| --- | --- | --- |
| תשפ"ז | יום שני, 9.11.2026 | 9.11.2026 |
| תשפ"ח | יום שני, 29.11.2027 | 29.11.2027 |
| תשפ"ט | **שבת**, 18.11.2028 | יום חמישי, 16.11.2028 |
| תש"ץ | יום רביעי, 7.11.2029 | 7.11.2029 |
| תשצ"א | יום שני, 25.11.2030 | 25.11.2030 |
| תשצ"ב | **שבת**, 15.11.2031 | יום חמישי, 13.11.2031 |
| תשצ"ג | יום רביעי, 3.11.2032 | 3.11.2032 |

שתי השורות המודגשות הן המקרה שהחוק עצמו מסדיר: "חל כ"ט בחשוון בשבת, יוחג חג הסיגד ביום חמישי שלפניו" (ס' 1(א)). זו הסיבה שבשנת תשפ"ט הסיגד יצוין ביום חמישי ולא בשבת.

**מקורות**: [חוק חג הסיגד, התשס"ח-2008 — ספר החוקים 2164, ו' בתמוז התשס"ח (9.7.2008), עמ' 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [נוסח החוק — ויקיטקסט](https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · נבדק ספטמבר 2026. התאריכים הלועזיים חושבו מהלוח העברי והוצלבו מול ספירת חמישים הימים מיום הכיפורים.

## מה זה סיגד

השם **סיגד** בא מגעז — ስግድ, "סגידה", השתחוויה. זהו השם העממי שהשתרש, והוא גם השם שהחוק הישראלי אימץ. במסורת ביתא ישראל יש לחג עוד שני שמות: **מֶהֶללה** (ምህልላ, "תחינה") — השם הפורמלי — ו**עַמַתֶה סֶוֶה** (ዐመተ ሰወ, "יום הקיבוץ").

הסיגד הוא **יום חידוש הברית** בין העם לאלוהיו. המודל שלו הוא אמנת נחמיה בימי שיבת ציון: העם נאסף, הכוהנים קוראים באוזניו את התורה, העם מתוודה על מה שהשתבש ומתחייב מחדש לברית. המרכז למורשת יהדות אתיופיה מגדיר אותו כ"יום חידוש הברית, יום חשבון הנפש הכללי ויום הכיסופים לציון של יהדות אתיופיה" — שלושה דברים במקביל: דתי, מוסרי ולאומי.

הכיסופים לציון אינם קישוט. באתיופיה הסיגד היה היום שבו הקהילה הפנתה את פניה לירושלים שלא ראתה. זו הסיבה שהעברת הטקס המרכזי בישראל אל מול חומות העיר העתיקה אינה שינוי טכני של מיקום אלא סגירת מעגל.

**ולמה דווקא כ"ט בחשוון?** לא תמיד זה היה התאריך. בעבר חל החג בכ"ט בכסלו, ולאחר רפורמה בלוח השנה של ביתא ישראל באמצע המאה ה-19 הוא הועבר לכ"ט בחשוון — חמישים יום אחרי אַסְתַּסְרֶיוֹ, הוא יום הכיפורים. כלומר קשר הזמן ליום הכיפורים הוא לב התאריך, וזו בדיוק ההצלבה שאפשר לבדוק בה כל שנה מחדש.

## ההר — ומה המקורות באמת אומרים

בכל מושבותיהם באתיופיה עלו בני הקהילה בסיגד אל הר גבוה שבסביבת היישוב — חזרה על מעמד הר סיני. הכוהנים נשאו את האורית בראש התהלוכה, ואחריהם השְׁמַגְלוּץ' — זקני העדה — ואחריהם שאר הקהילה.

אבל הפרט המעניין הוא **איך נבחר ההר**: הכוהנים בחרו מדי שנה הר שיתאים לטקס, וּוידאו שהוא נקי וטהור מעצמים גדולים ומקברים. הבחירה בהר גבוה נעשתה משתי סיבות — להגביר את הדמיון למעמד הר סיני, ומתוך אמונה שמקום גבוה טהור יותר.

**הבהרה, כי שואלים על זה:** אין "הר הסיגד" אחד. המקורות הקהילתיים מתארים בחירה שנתית של הר מתאים בקרבת היישוב — הר אחר בכל כפר ובכל שנה, ולא אתר עלייה לרגל יחיד. אם נתקלתם בעמוד שמייחס לסיגד הר ספציפי בשם, שאלו איזה מקור עומד מאחוריו. אנחנו לא מצאנו כזה, ולכן אנחנו לא כותבים שם של הר.

## הצום

המרכז למורשת יהדות אתיופיה מתאר את היום כך: "בחלקו הראשון יום תענית, ובחלקו השני יום חגיגה". הצום מתחיל בבוקר ונשבר בסיום התפילות — הוא **אינו** צום של יממה כמו יום הכיפורים.

זו נקודה שחשוב להבין לפני שמגיעים: הסיגד הוא לא "עוד יום כיפור". החצי הראשון שלו חמור ושקט, והחצי השני שלו — אחרי שבירת הצום — הוא חגיגה של ממש, עם אוכל, שירה וריקוד. שני החצאים הם החג.

על משמעות הצום, מה עולה על השולחן בשבירתו, ואיפה קונים את המצרכים: [צום הסיגד ותפריט שבירת הצום — המדריך המלא](/he/culinary/sigd-menu).

## הקייסים והאורית

**הקייסים** (קֶסִּים, ביחיד קֵס) הם מנהיגי הדת של ביתא ישראל. הם מובילים את התהלוכה, נושאים את ספרי האורית, קוראים בהם וקובעים את סדר התפילה. במסורת הקהילתית הם צועדים בראש, ואחריהם הקהילה לפי סדר הגילים.

**האורית** (ኦሪት) היא כתבי הקודש של ביתא ישראל בגעז — התורה בנוסח הגעז, מרכז הטקס. באתיופיה הסיגד היה **היום היחיד בשנה שבו הוצאה האורית מבית הכנסת**; זה מסביר למה התהלוכה עצמה, ולא רק היעד, היא חלק מהטקס.

הקריאה בסיגד אינה אקראית. לפי המרכז למורשת יהדות אתיופיה, הפרקים הנקראים הם אלה שעוסקים במתן תורה ובברית: **שמות כ', דברים ה'-ו' וכ"ז, ונחמיה ח'-ט'** — כלומר בדיוק הנושא שהיום כולו סובב סביבו.

להרחבה: [קייסים — מילון מונחים](/he/glossary/kessim) · [סיגד — מילון מונחים](/he/glossary/sigd).

## סדר היום — מה קורה בפועל

לפי המקורות הקהילתיים, המבנה של היום הוא זה:

1. **עלייה אל ההר / אל הטיילת**, בצום, בתהלוכה שבראשה הקייסים נושאי האורית.
2. **קריאה באורית ותפילות** — הפרקים על מתן תורה והברית, בליווי פיוטים בגעז.
3. **דברי הקייסים** — חשבון נפש קהילתי, לא רק אישי.
4. **שבירת הצום** בסיום התפילות.
5. **החלק החגיגי** — סעודה משותפת, שירה וריקוד.

**מה שלא נכתוב כאן:** שעת פתיחה מדויקת, מספר המשתתפים הצפוי, או פרטי הסעות. נתונים כאלה משתנים משנה לשנה ומתפרסמים על-ידי המארגנים בסמוך לחג. ראו [אירועי הסיגד 2026](/he/heritage/sigd/events-2026) — שם נכנס רק מה שהמארגן עצמו פרסם, עם קישור למקור.

## הטקס בישראל — מהר ציון לטיילת ארמון הנציב

טקסי הסיגד הראשונים בישראל נערכו בתחילת שנות ה-80; באירועי 1982 השתתף נשיא המדינה דאז יצחק נבון. בתחילה נערכו העצרת והתפילות במקומות שונים, עד שהתקבע המנהג לערוך אותן ב**הר ציון**.

מהר ציון עבר הטקס אל **טיילת גבריאל שרובר — טיילת ארמון הנציב** בירושלים, שם מתכנסת הקהילה עד היום. שתי סיבות מצטרפות: הנקודה צופה ישירות אל העיר העתיקה והר הבית — אל היעד שאליו כוונו הכיסופים באתיופיה; ובנוסף, המעבר נבע גם מחוסר נחת של הכוהנים מן המעבר בסמוך לכנסיות הרבות שבהר ציון. הטיילת עצמה נחנכה ב-1989.

**הערת המשכיות:** ב-2023, בעקבות מלחמת חרבות ברזל, הוחלט לבטל את הטקס הממלכתי בארמון הנציב. כלומר טקס מרכזי בשנה נתונה אינו מובן מאליו — עוד סיבה לא להניח לוח אירועים מראש אלא לחכות לפרסום המארגנים.

## חוק חג הסיגד — ומה הוא נותן לכם בפועל

הכנסת קיבלה את חוק חג הסיגד ב-כ"ז בסיוון התשס"ח, 30 ביוני 2008, והוא פורסם בספר החוקים 2164 ביום 9.7.2008. שלוש הוראות שכדאי להכיר:

**1. הסיגד הוא "יום בחירה" של העובד.** ס' 1(ב): "חג הסיגד הוא יום בחירה; בסעיף זה, 'יום בחירה' — יום שהבחירה בידי העובד לצאת בו לחופשה או לעבוד; בחר העובד ביום כיום חופשה, יובא היום במניין ימי החופשה שלו."

כלומר: אתם רשאים לבחור לקחת את הסיגד כיום חופש, והמעסיק אינו קובע זאת במקומכם — אבל היום נספר על חשבון ימי החופשה השנתיים שלכם. זה לא יום חופש נוסף בתשלום; זו זכות בחירה. שווה להודיע למעסיק מראש.

**2. שר החינוך חייב לקבוע פעילויות חינוכיות לחג.** ס' 1(ג): "שר החינוך יקבע פעילויות חינוכיות שייוחדו לחג הסיגד." זו חובה שבחוק, לא המלצה. מה זה אומר בפועל לבית הספר של הילד שלכם ומה הורה יכול לבקש: [הסיגד בבתי הספר](/he/heritage/sigd/schools).

**3. יש עצרת מרכזית ממלכתית.** ס' 2: "שר המדע התרבות והספורט יורה על קיום עצרת מרכזית לפתיחת חג הסיגד."

הסעיפים הנוספים בחוק מסמיכים את שר התעשייה המסחר והתעסוקה לקבוע אילו עבודות ושירותים לא ייפסקו בחג (ס' 3), ואת שר המדע התרבות והספורט לקבוע סמלים לחג (ס' 4).

מקור: [חוק חג הסיגד, התשס"ח-2008 — ספר החוקים 2164, עמ' 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · נבדק ספטמבר 2026.

## מימון פעילויות סיגד מקומיות

לרשויות ולגופים קהילתיים יש מסלול תמיכה בפעילויות סיגד מקומיות. ראו [מימון סיגד — זכות](/he/rights/sigd-funding).

## ראו גם

- [אירועי הסיגד 2026 — רשימה מאומתת](/he/heritage/sigd/events-2026)
- [הסיגד בבתי הספר — מה מחייב החוק ומה הורה יכול לבקש](/he/heritage/sigd/schools)
- [באים לסיגד ולא מהקהילה? מדריך השתתפות מכבדת](/he/heritage/sigd/guests)
- [צום הסיגד ותפריט שבירת הצום](/he/culinary/sigd-menu)
- [סיגד — מילון מונחים](/he/glossary/sigd) · [קייסים — מילון מונחים](/he/glossary/kessim)
- [BINA — פרופיל ארגון](/he/orgs/bina)

**מקורות לעמוד זה**: [חוק חג הסיגד, התשס"ח-2008 (ספר החוקים 2164, עמ' 625)](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [המרכז למורשת יהדות אתיופיה — חג הסגד](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · [סיגד — ויקיפדיה העברית](https://he.wikipedia.org/wiki/%D7%A1%D7%99%D7%92%D7%93) (לאימות משני בלבד) · נבדק ספטמבר 2026.`,
      en: `## When is Sigd? Monday, 9 November 2026

**Sigd 5787 falls on Monday, 9 November 2026 — 29 Cheshvan 5787.**

So you can check us rather than take our word for it, here is the derivation:

1. **The statute fixes the Hebrew date, not the Gregorian one.** Section 1(a) of the Sigd Holiday Law: "The Knesset hereby declares the 29th of Cheshvan to be the Sigd Holiday, to be celebrated every year as a state holiday."
2. **29 Cheshvan 5787 falls on Monday, 9 November 2026** on the Hebrew calendar.
3. **A second, independent cross-check:** Sigd falls fifty days after Yom Kippur. Yom Kippur 5787 — 10 Tishrei — is Monday, 21 September 2026. Counting Yom Kippur itself as day one, day fifty is 9 November 2026 (49 full days after Yom Kippur). Both routes land on the same day.

> **Note — 19 November 2026 is wrong.** That date is 9 Kislev, ten days *after* Sigd. The wrong date appeared on this page too until 8 September 2026 and has been corrected. If you booked leave, a bus or a community event around it, the correct date is 9 November 2026.

### Sigd in the coming years

| Hebrew year | 29 Cheshvan | Observed on |
| --- | --- | --- |
| 5787 | Monday, 9 Nov 2026 | 9 Nov 2026 |
| 5788 | Monday, 29 Nov 2027 | 29 Nov 2027 |
| 5789 | **Saturday**, 18 Nov 2028 | Thursday, 16 Nov 2028 |
| 5790 | Wednesday, 7 Nov 2029 | 7 Nov 2029 |
| 5791 | Monday, 25 Nov 2030 | 25 Nov 2030 |
| 5792 | **Saturday**, 15 Nov 2031 | Thursday, 13 Nov 2031 |
| 5793 | Wednesday, 3 Nov 2032 | 3 Nov 2032 |

The two bold rows are the case the statute itself handles: "should 29 Cheshvan fall on the Sabbath, the Sigd Holiday shall be celebrated on the Thursday preceding it" (s. 1(a)). That is why in 5789 Sigd is marked on a Thursday.

**Sources**: [Sigd Holiday Law, 5768-2008 — Sefer HaChukim 2164, 9 July 2008, p. 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [statute text — Wikisource](https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%97%D7%92_%D7%94%D7%A1%D7%99%D7%92%D7%93) · verified September 2026. Gregorian dates computed from the Hebrew calendar and cross-checked against the fifty-day count from Yom Kippur.

## What Sigd is

The name **Sigd** comes from Ge'ez — ስግድ, "prostration". It is the popular name that took hold, and the one the Israeli statute adopted. Beta Israel tradition gives the holiday two further names: **Mehlella** (ምህልላ, "supplication") — the formal one — and **Amata Sew** (ዐመተ ሰወ, "the day of gathering").

Sigd is a **day of renewing the covenant** between the people and God. Its model is Nehemiah's covenant in the days of the Return to Zion: the people gather, the priests read the Torah aloud to them, the people confess what has gone wrong and recommit to the covenant. The Ethiopian Jewry Heritage Center describes it as "the day of renewing the covenant, the day of collective soul-searching, and the day of Ethiopian Jewry's longing for Zion" — three things at once: religious, moral and national.

That longing for Zion is not decoration. In Ethiopia, Sigd was the day the community turned its face toward a Jerusalem it had never seen. That is why moving the central ceremony in Israel to a point facing the walls of the Old City is not a change of venue but the closing of a circle.

**And why 29 Cheshvan?** It was not always the date. The holiday previously fell on 29 Kislev; after a reform of the Beta Israel calendar in the mid-19th century it moved to 29 Cheshvan — fifty days after Astasreyo, that is, Yom Kippur. The tie to Yom Kippur is the heart of the date, and it is exactly the cross-check you can re-run yourself every year.

## The mountain — and what the sources actually say

In every one of their settlements in Ethiopia, community members climbed on Sigd to a high mountain near the village — a re-enactment of the giving of the Torah at Sinai. The priests carried the Orit at the head of the procession, followed by the *shmagluts* — the community elders — and then the rest of the community.

The interesting detail is **how the mountain was chosen**: each year the priests selected a mountain suited to the ceremony and verified that it was clean and pure of large objects and of graves. A high place was chosen for two reasons — to heighten the resemblance to Sinai, and out of a belief that a high place is purer.

**A clarification, because people ask:** there is no single "Mount Sigd". Community sources describe an annual choice of a suitable mountain near the settlement — a different mountain in each village and each year, not one pilgrimage site. If you find a page attributing Sigd to one specific named mountain, ask what source stands behind it. We did not find one, so we do not print a name.

## The fast

The Ethiopian Jewry Heritage Center describes the day as "in its first part a fast day, and in its second part a day of celebration". The fast begins in the morning and is broken when the prayers end — it is **not** a full 24-hour fast like Yom Kippur.

This matters before you attend: Sigd is not "another Yom Kippur". Its first half is grave and quiet; its second half — after the fast is broken — is a genuine celebration with food, song and dance. Both halves are the holiday.

On the meaning of the fast, what goes on the table when it is broken, and where to shop: [The Sigd fast and the break-fast menu — the complete guide](/en/culinary/sigd-menu).

## The kessim and the Orit

The **kessim** (singular *kes*) are the religious leaders of Beta Israel. They lead the procession, carry the Orit scrolls, read from them and set the order of prayer. In the communal tradition they walk at the head, with the community behind them by age group.

The **Orit** (ኦሪት) is the Beta Israel scripture in Ge'ez — the Torah in the Ge'ez recension, and the centre of the ceremony. In Ethiopia, Sigd was **the one day of the year on which the Orit left the synagogue**; that is why the procession itself, and not only its destination, is part of the rite.

The Sigd reading is not arbitrary. Per the Ethiopian Jewry Heritage Center, the passages read are those on the giving of the Torah and the covenant: **Exodus 20, Deuteronomy 5-6 and 27, and Nehemiah 8-9** — precisely the subject the whole day turns on.

More: [Kessim — glossary](/en/glossary/kessim) · [Sigd — glossary](/en/glossary/sigd).

## The order of the day

Per community sources, the day is structured like this:

1. **The ascent** — to the mountain, or to the promenade — while fasting, in a procession headed by the kessim carrying the Orit.
2. **Reading from the Orit and prayers** — the passages on the giving of the Torah and the covenant, with liturgical poetry in Ge'ez.
3. **The kessim address the assembly** — communal soul-searching, not only personal.
4. **Breaking the fast** as the prayers end.
5. **The celebratory half** — a shared meal, singing and dancing.

**What we will not print here:** an exact start time, an expected attendance figure, or transport details. Those change year to year and are published by the organisers close to the date. See [Sigd 2026 events](/en/heritage/sigd/events-2026) — nothing enters that page unless the organiser published it, with a link to the source.

## The ceremony in Israel — from Mount Zion to the Armon Hanatziv promenade

The first Sigd ceremonies in Israel were held in the early 1980s; President Yitzhak Navon took part in the 1982 observance. At first the assembly and prayers were held in various places, until the custom settled on **Mount Zion**.

From Mount Zion the ceremony moved to the **Gabriel Sherover Promenade — the Armon Hanatziv promenade** in Jerusalem, where the community gathers to this day. Two reasons combine: the spot looks directly out at the Old City and the Temple Mount — the object of the longing expressed in Ethiopia; and the move also reflected the priests' discomfort at passing close to the many churches on Mount Zion. The promenade itself was inaugurated in 1989.

**A note on continuity:** in 2023, following the Swords of Iron war, the state ceremony at Armon Hanatziv was cancelled. A central ceremony in any given year is not a given — one more reason not to assume a programme in advance, but to wait for the organisers to publish.

## The Sigd Holiday Law — and what it actually gives you

The Knesset passed the Sigd Holiday Law on 27 Sivan 5768, 30 June 2008; it was published in Sefer HaChukim 2164 on 9 July 2008. Three provisions are worth knowing:

**1. Sigd is an employee's "day of choice".** S. 1(b): "The Sigd Holiday is a day of choice; in this section, 'day of choice' means a day on which the choice is the employee's, to take leave or to work; where the employee chose the day as a leave day, the day shall be counted among that employee's leave days."

In practice: you are entitled to choose to take Sigd off, and your employer does not make that choice for you — but the day is counted against your annual leave. It is not an extra paid day off; it is a right of choice. Tell your employer in advance.

**2. The Minister of Education must set educational activities for the holiday.** S. 1(c): "The Minister of Education shall determine educational activities dedicated to the Sigd Holiday." That is a statutory duty, not a recommendation. What it means for your child's school and what a parent can ask for: [Sigd in schools](/en/heritage/sigd/schools).

**3. There is a state opening ceremony.** S. 2: "The Minister of Science, Culture and Sport shall order the holding of a central assembly to open the Sigd Holiday."

The remaining sections empower the Minister of Industry, Trade and Employment to determine which work and services may not be halted on the holiday (s. 3), and the Minister of Science, Culture and Sport to determine symbols for the holiday (s. 4).

Source: [Sigd Holiday Law, 5768-2008 — Sefer HaChukim 2164, p. 625](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · verified September 2026.

## Funding for local Sigd activities

Municipalities and community bodies have a support track for local Sigd activities. See [Sigd funding — right](/en/rights/sigd-funding).

## See also

- [Sigd 2026 events — a verified list](/en/heritage/sigd/events-2026)
- [Sigd in schools — what the law requires and what a parent can ask for](/en/heritage/sigd/schools)
- [Attending Sigd from outside the community — a respectful-attendance guide](/en/heritage/sigd/guests)
- [The Sigd fast and the break-fast menu](/en/culinary/sigd-menu)
- [Sigd — glossary](/en/glossary/sigd) · [Kessim — glossary](/en/glossary/kessim)
- [BINA — organization profile](/en/orgs/bina)

**Sources for this page**: [Sigd Holiday Law, 5768-2008 (Sefer HaChukim 2164, p. 625)](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [Ethiopian Jewry Heritage Center — the Sigd holiday](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · [Sigd — Hebrew Wikipedia](https://he.wikipedia.org/wiki/%D7%A1%D7%99%D7%92%D7%93) (secondary corroboration only) · verified September 2026.`,
      am: `## ሰግድ መቼ ነው? ሰኞ፣ ኅዳር 9፣ 2026

**ሰግድ 5787 ሰኞ፣ ኅዳር 9 ቀን 2026 ይውላል — 29 ኅሸዋን 5787።**

ቀኑ እንዴት እንደተገኘ፦

1. **ሕጉ የሚወስነው የዕብራይስጡን ቀን ነው።** የሰግድ በዓል ሕግ አንቀጽ 1(ሀ)፦ ክነሰት 29 ኅሸዋንን የሰግድ በዓል አድርጎ ያውጃል፣ በየዓመቱ እንደ መንግሥታዊ በዓል ይከበራል።
2. **29 ኅሸዋን 5787 ሰኞ ኅዳር 9፣ 2026 ይውላል።**
3. **ሁለተኛ ገለልተኛ ማረጋገጫ፦** ሰግድ ከዮም ኪፑር በኋላ በሃምሳኛው ቀን ይውላል። የ5787 ዮም ኪፑር ሰኞ መስከረም 21፣ 2026 ነው። ዮም ኪፑርን እንደ መጀመሪያ ቀን ቆጥሮ፣ ሃምሳኛው ቀን ኅዳር 9፣ 2026 ነው።

> **ማስጠንቀቂያ — ኅዳር 19፣ 2026 የተሳሳተ ቀን ነው።** ያ ቀን 9 ኪስሌው ነው፣ ከሰግድ አሥር ቀናት በኋላ። ይህ ስህተት እስከ መስከረም 8፣ 2026 በዚህ ገጽ ላይም ነበር፤ ተስተካክሏል።

### በሚቀጥሉት ዓመታት

| የዕብራይስጥ ዓመት | 29 ኅሸዋን | የሚከበርበት ቀን |
| --- | --- | --- |
| 5787 | ሰኞ፣ ኅዳር 9፣ 2026 | ኅዳር 9፣ 2026 |
| 5788 | ሰኞ፣ ኅዳር 29፣ 2027 | ኅዳር 29፣ 2027 |
| 5789 | **ቅዳሜ**፣ ኅዳር 18፣ 2028 | ሐሙስ፣ ኅዳር 16፣ 2028 |
| 5790 | ረቡዕ፣ ኅዳር 7፣ 2029 | ኅዳር 7፣ 2029 |

29 ኅሸዋን ቅዳሜ ላይ ሲውል፣ ሕጉ በዓሉን ወደ ቀድሞው ሐሙስ ያስቀድማል (አንቀጽ 1(ሀ))።

**ምንጭ**፦ [የሰግድ በዓል ሕግ፣ 5768-2008](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · በመስከረም 2026 ተረጋግጧል።

## ሰግድ ምንድን ነው?

**ሰግድ** የሚለው ስም ከግዕዝ ስግድ — "መስገድ" — የመጣ ነው። በቤተ እስራኤል ባህል የበዓሉ መደበኛ ስም **መህለላ** ሲሆን፣ "ሰግድ" የሕዝቡ ስም ነው።

ሰግድ በሕዝቡና በእግዚአብሔር መካከል ያለውን **ቃል ኪዳን የማደስ ቀን** ነው። ምሳሌው በዕዝራና በነህምያ መጻሕፍት ውስጥ ያለው ታላቅ ጉባኤ ነው፦ ሕዝቡ ይሰበሰባል፣ ካህናቱ ኦሪትን ያነባሉ፣ ሕዝቡ ይናዘዛል እንደገናም ቃል ይገባል።

## ተራራው

በኢትዮጵያ በሚኖሩባቸው ስፍራዎች ሁሉ፣ የማህበረሰቡ አባላት በሰግድ ቀን **በአካባቢው ወዳለው ከፍተኛ ተራራ** ይወጡ ነበር — የሲና ተራራን ትውስታ። ቄሶቹ ኦሪቱን ተሸክመው በሰልፉ ፊት ይሄዱ ነበር።

**ማብራሪያ፦** የማህበረሰብ ምንጮች አንድ የተለየ ተራራ በስም አይጠቅሱም። ባህሉ "በአካባቢው ያለው ከፍተኛ ተራራ" ነው — በእያንዳንዱ መንደር የተለየ ተራራ።

## ጾሙ

የኢትዮጵያ አይሁዶች ቅርስ ማዕከል ቀኑን እንዲህ ይገልጸዋል፦ "በመጀመሪያው ክፍሉ የጾም ቀን፣ በሁለተኛው ክፍሉ የበዓል ቀን"። ጾሙ ጠዋት ይጀምራል፣ ጸሎቶቹ ሲያልቁ በቀትር አካባቢ ይሰበራል — እንደ ዮም ኪፑር የ24 ሰዓት ጾም **አይደለም**።

ተጨማሪ፦ [የሰግድ ጾም እና የጾም መስበሪያ ምግብ](/am/culinary/sigd-menu)።

## ቄሶችና ኦሪት

**ቄሶች** የቤተ እስራኤል የሃይማኖት መሪዎች ናቸው። ሰልፉን ይመራሉ፣ የኦሪት መጻሕፍትን ይሸከማሉ፣ ያነባሉ የጸሎቱንም ሥርዓት ይወስናሉ። **ኦሪት** (ኦሪት) በግዕዝ የተጻፈው የቤተ እስራኤል ቅዱስ መጽሐፍ ነው።

## የቀኑ ሥርዓት

1. በጾም ወደ ተራራው ወይም ወደ መንገዱ መውጣት፣ ቄሶቹ ኦሪቱን ተሸክመው በፊት።
2. ከኦሪት ማንበብና ጸሎት።
3. የቄሶቹ ንግግር።
4. በቀትር ጾሙን መስበር።
5. የበዓሉ ክፍል — የጋራ ምግብ፣ ዘፈንና ጭፈራ።

**እዚህ የማንጽፈው፦** ትክክለኛ የመጀመሪያ ሰዓት፣ የተሳታፊዎች ቁጥር ወይም የትራንስፖርት ዝርዝር። እነዚህ በየዓመቱ ይለዋወጣሉ። [የ2026 ሰግድ ዝግጅቶች](/am/heritage/sigd/events-2026) ይዩ።

## በእስራኤል ያለው ሥነ ሥርዓት

የመጀመሪያዎቹ የሰግድ ሥነ ሥርዓቶች በእስራኤል በ1980ዎቹ መጀመሪያ ተካሂደዋል፣ በኋላም ዋናው ሥነ ሥርዓት ወደ **የአርሞን ሃናጺቭ መንገድ** (ገብርኤል ሼሮቨር) ኢየሩሳሌም ተዛወረ፣ እዚያም ማህበረሰቡ እስከ ዛሬ ይሰበሰባል።

## የሰግድ በዓል ሕግ

ክነሰት ሕጉን ሰኔ 30፣ 2008 አጸደቀ። ሦስት ዋና ነጥቦች፦

**1. ሰግድ የሠራተኛ "የምርጫ ቀን" ነው** (አንቀጽ 1(ለ))። ፈቃድ መውሰድ ወይም መሥራት የሠራተኛው ምርጫ ነው፤ ፈቃድ ከመረጠ ግን ከዓመታዊ ፈቃድ ቀናት ይቆጠራል።

**2. የትምህርት ሚኒስትሩ ለበዓሉ የተመደቡ የትምህርት እንቅስቃሴዎችን መወሰን አለበት** (አንቀጽ 1(ሐ))። ዝርዝር፦ [ሰግድ በትምህርት ቤቶች](/am/heritage/sigd/schools)።

**3. ማዕከላዊ መንግሥታዊ ሥነ ሥርዓት አለ** (አንቀጽ 2)።

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ መገምገም ይኖርበታል።]*

## ተጨማሪ

- [የ2026 ሰግድ ዝግጅቶች](/am/heritage/sigd/events-2026)
- [ሰግድ በትምህርት ቤቶች](/am/heritage/sigd/schools)
- [ከማህበረሰቡ ውጭ ለሆኑ — በአክብሮት የመሳተፍ መመሪያ](/am/heritage/sigd/guests)
- [ሰግድ — መዝገበ ቃላት](/am/glossary/sigd) · [ቄሶች — መዝገበ ቃላት](/am/glossary/kessim)

**ምንጮች**፦ [የሰግድ በዓል ሕግ 5768-2008](https://fs.knesset.gov.il/17/law/17_lsr_300844.pdf) · [የኢትዮጵያ አይሁዶች ቅርስ ማዕከል](https://ethiopianjhc.org.il/%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%95%D7%98%D7%A7%D7%A1%D7%99%D7%9D/%D7%97%D7%92-%D7%94%D7%A1%D7%92%D7%93/) · በመስከረም 2026 ተረጋግጧል።`,
    },
  },

  // 2 — Genna (Ethiopian Christmas) -------------------------------------
  {
    slug: "genna",
    name: { he: "ג'נה — חג מולד אתיופי", en: "Genna — Ethiopian Christmas", am: "ገና" },
    shortDescription: {
      he: "חג המולד של הקהילה הנוצרית האתיופית בישראל — 7 בינואר, חוגגים בכנסיות התיאוטוקוס בירושלים, חיפה ובאר-שבע.",
      en: "Christmas for the Ethiopian Christian community in Israel — January 7, observed at Theotokos churches in Jerusalem, Haifa, and Beersheba.",
      am: "ገና — በእስራኤል ለኢትዮጵያ ክርስቲያኖች የክርስቶስ ልደት — ጥር 7።",
    },
    dateDescription: {
      he: "7 בינואר (לפי הלוח היוליאני של הכנסייה האתיופית-אורתודוקסית)",
      en: "January 7 (per the Julian calendar used by the Ethiopian Orthodox Tewahedo Church)",
      am: "ጥር 7 (በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ጁሊያን ቀን አቆጣጠር)",
    },
    upcomingDates: ["2027-01-07", "2028-01-07", "2029-01-07"],
    relatedRights: [],
    relatedTerms: [],
    relatedOrgs: [],
    bodies: {
      he: `## מה זה ג'נה

ג'נה (ቃላት: "ገና") הוא חג המולד של הכנסייה האתיופית-אורתודוקסית. הכנסייה שומרת על הלוח היוליאני (ולא הגרגוריאני), ולכן ג'נה נחגג ב-7 בינואר ולא ב-25 בדצמבר.

## איפה חוגגים בישראל

- **כנסיית התיאוטוקוס — ירושלים** — הכנסייה המרכזית ב-קומפלקס המנזר האתיופי בעיר העתיקה
- **כנסיית מריה הקדושה — חיפה** — קהילה קטנה אבל פעילה
- **כנסייה האתיופית — באר-שבע** — קהילה צעירה, פעילה בשנים האחרונות

## הטקס

יום הצום מסתיים עם תפילת חצות. אחר-כך — סעודת חג עם בשר, דובו (תבשיל ירק), וטף (דייסה).

## חשוב לדעת

החג הוא בעיקר משפחתי וקהילתי. אורחים שאינם מהקהילה — מוזמנים לתפילה הציבורית של חצות; הסעודה היא משפחתית.`,
      en: `## What is Genna

Genna ("ገና") is the Christmas celebration of the Ethiopian Orthodox Tewahedo Church. The Church follows the Julian calendar (not the Gregorian), so Genna is celebrated on January 7 rather than December 25.

## Where it's celebrated in Israel

- **Theotokos Church — Jerusalem** — the main church at the Ethiopian monastery complex in the Old City
- **Saint Mary's Church — Haifa** — a small but active community
- **Ethiopian Church — Beersheba** — a younger community, active in recent years

## The ceremony

The fast day ends with a midnight prayer. Then — a holiday meal with meat, doro wat (chicken stew), and injera.

## Good to know

The holiday is primarily a family + community affair. Visitors from outside the community are welcome at the public midnight prayer; the meal is family-only.`,
      am: `## ገና ምንድን ነው

ገና በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን የክርስቶስ ልደት ነው። ቤተ ክርስቲያኒቱ የጁሊያን ቀን አቆጣጠር ስለምትከተል ገና በጥር 7 ይከበራል።

## በእስራኤል የሚከበርባቸው ቦታዎች

- ቴዎጦቆስ ቤተ ክርስቲያን — ኢየሩሳሌም
- ቅድስት ማርያም ቤተ ክርስቲያን — ሀይፋ
- ኢትዮጵያ ቤተ ክርስቲያን — ቤርሼባ

## ስነ-ስርዓቱ

የጾም ቀኑ በመንፈቅ ሌሊት ጸሎት ይጠናቀቃል። ከዚያም የበዓል ምግብ።`,
    },
  },

  // 3 — Yom HaAliyah from Ethiopia --------------------------------------
  {
    slug: "aliyah-day",
    name: {
      he: "יום עליית יהודי אתיופיה",
      en: "Ethiopian Aliyah Memorial Day",
      am: "የኢትዮጵያ አሊያ መታሰቢያ ቀን",
    },
    shortDescription: {
      he: "יום הזיכרון הלאומי לעלייה ולנפלי הדרך מאתיופיה — 28 באייר (יום ירושלים + 1).",
      en: "National memorial day for the aliyah from Ethiopia and those who fell along the way — 28 Iyyar (Jerusalem Day + 1).",
      am: "ለኢትዮጵያ አሊያ እና በመንገድ ላይ ለሞቱት ብሔራዊ መታሰቢያ ቀን።",
    },
    dateDescription: {
      he: "28 באייר (יום אחרי יום ירושלים, סוף מאי / תחילת יוני)",
      en: "28 Iyyar (the day after Jerusalem Day, late May / early June)",
      am: "28 ኢያር (ከኢየሩሳሌም ቀን በኋላ ያለ ቀን)",
    },
    upcomingDates: ["2026-05-26", "2027-05-15", "2028-06-02"],
    relatedRights: ["falash-mura-direct-absorption", "klita-basket"],
    relatedTerms: ["aliyah-from-ethiopia", "operation-solomon", "operation-moses"],
    relatedOrgs: ["iaej", "bina"],
    bodies: {
      he: `## מה זה יום עליית יהודי אתיופיה

יום הזיכרון הלאומי שנקבע ב-2017 לציין את המסע ההיסטורי של יהדות אתיופיה לישראל — דרך סודן, ב-מבצע משה (1984) ובמבצע שלמה (1991), ועד היום. ביום הזה גם זוכרים את אלפי בני הקהילה שנפלו במהלך המסע.

## איפה מציינים

- **טקס ממלכתי בהר הרצל** — ב-חלקת חללי הדרך, מצביעים מסכמים את שמות הנופלים
- **בתי ספר** — תכניות לימוד מיוחדות, מפגשים עם עולים ותיקים
- **קהילות מקומיות** — טקסים בכל ערי הקליטה

## למה זה חשוב

מבצעי משה ושלמה הצילו ~16,000 בני קהילה. כ-4,000 נפלו במסע (רעב, מחלות, התקפות). יום הזיכרון מכיר במחיר ההיסטורי של העלייה.

## ראו גם

- [עלייה מאתיופיה — מילון](/he/glossary/aliyah-from-ethiopia)
- [מבצע שלמה — מילון](/he/glossary/operation-solomon)
- [מבצע משה — מילון](/he/glossary/operation-moses)
- [Falash Mura — קליטה ישירה](/he/rights/falash-mura-direct-absorption)`,
      en: `## What is Ethiopian Aliyah Memorial Day

A national memorial day established in 2017 to mark the historic journey of Ethiopian Jewry to Israel — through Sudan, in Operation Moses (1984) and Operation Solomon (1991), and to the present. The day also commemorates the thousands of community members who fell during the journey.

## Where it's observed

- **State ceremony at Mount Herzl** — at the section for those who fell on the way; the names of the fallen are read out
- **Schools** — special curricula, meetings with veteran olim
- **Local communities** — ceremonies in every absorption city

## Why it matters

Operations Moses and Solomon saved ~16,000 community members. About 4,000 fell during the journey (hunger, disease, attacks). The memorial day acknowledges the historic price of the aliyah.

## See also

- [Aliyah from Ethiopia — glossary](/en/glossary/aliyah-from-ethiopia)
- [Operation Solomon — glossary](/en/glossary/operation-solomon)
- [Operation Moses — glossary](/en/glossary/operation-moses)
- [Falash Mura — direct absorption](/en/rights/falash-mura-direct-absorption)`,
      am: `## የኢትዮጵያ አሊያ መታሰቢያ ቀን

በ2017 የተቋቋመ ብሔራዊ መታሰቢያ ቀን — ለኢትዮጵያ አይሁዳዊነት ወደ እስራኤል ታሪካዊ ጉዞ — በሙሴ ኦፕሬሽን (1984) እና በሰሎሞን ኦፕሬሽን (1991)። በመንገድ ላይ የወደቁ የማህበረሰብ አባላትም ይታወሳሉ።

## የት ይከበራል

- በሄርዝል ተራራ ብሔራዊ ስነ-ስርዓት
- በትምህርት ቤቶች ልዩ ፕሮግራሞች
- በመቀበያ ከተሞች የአካባቢ ስነ-ስርዓቶች

## ለምን አስፈላጊ ነው

የሙሴና የሰሎሞን ኦፕሬሽኖች ~16,000 የማህበረሰብ አባላትን አዳኑ። በመንገድ ላይ ~4,000 ወድቀዋል። መታሰቢያ ቀኑ የአሊያ ታሪካዊ ዋጋ ያውቃል።`,
    },
  },

  // 4 — Beta Israel --------------------------------------------------------
  {
    slug: "beta-israel",
    name: { he: "ביתא ישראל", en: "Beta Israel", am: "ቤተ እስራኤል" },
    shortDescription: {
      he: "קהילת יהדות אתיופיה — ההיסטוריה, התרבות, ועלייתם לישראל במבצעי משה ושלמה.",
      en: "The Ethiopian Jewish community — history, culture, and their aliyah in Operations Moses and Solomon.",
      am: "የኢትዮጵያ አይሁዳዊ ማህበረሰብ — ታሪክ፣ ባህል እና ወደ እስራኤል ጉዞ።",
    },
    dateDescription: {
      he: "אין תאריך חג קבוע — ביתא ישראל היא קהילה, לא חג.",
      en: "No fixed holiday date — Beta Israel refers to the community identity, not a single observance.",
      am: "ቋሚ የበዓል ቀን የለም — ቤተ እስራኤል ማህበረሰብን ያመለክታል፣ አንድ ብቻ ክብረ-በዓልን አይደለም።",
    },
    upcomingDates: ["2026-11-09", "2027-11-29", "2028-11-16"],
    relatedRights: ["klita-basket-ethiopia", "falash-mura-direct-absorption"],
    relatedTerms: ["aliyah-from-ethiopia", "sal-klita"],
    relatedOrgs: ["iaej", "tebeka"],
    bodies: {
      he: `## ביתא ישראל — יהדות אתיופיה

ביתא ישראל (גֵּעֵז: בֵּיתַ אִסְרָאֵל, "בית ישראל") הוא שמה של קהילת יהודי אתיופיה, שהתקיימה באמצע הרמה האתיופית — בעיקר באזור גונדר — במשך מאות שנים. הם שמרו על תורה, שבת, כשרות ומרכיבים ייחודיים של מנהג יהודי שנתעצבו ללא קשר לדיאספורה הרבנית.

## מוצא ומסורות

מסורות שונות מנסות להסביר את מוצאם:
- **צאצאי שלמה ושבא** — מסורת מפורסמת המקשרת אותם לצאצאי מלכה שבא ושלמה המלך.
- **צאצאי שבט דן** — מסורת רבנית מקובלת (רבי עובדיה יוסף, 1973) המכירה בהם כיהודים לכל דבר.
- **צאצאי גלות בית ראשון** — עלו לאתיופיה לאחר חורבן בית המקדש הראשון (586 לפנה"ס).

## דת ומנהג

הקהילה שמרה על **אורח חיים דתי עצמאי** מבוסס על:
- **אורית** — חמשת חומשי התורה בתרגום גֵּעֵז.
- **כהנים (קֵסוֹת)** — מנהיגות דתית שבירתה ישנה מדגם הרבנות.
- **בֵּית-מַסְקַל** — חגי עלייה לרגל ייחודיים.
- הקפדה על שבת, כשרות וטהרת המשפחה.

## עלייה לישראל

| מבצע | שנה | עולים |
|------|-----|--------|
| מבצע משה | 1984–1985 | ~8,000 |
| מבצע שבא | 1985 | ~500 |
| מבצע שלמה | 1991 | ~14,300 |
| עלייה שוטפת + פלשמורה | 1991–היום | ~60,000+ |

**סה"כ**: כ-165,000 יוצאי אתיופיה וצאצאיהם חיים היום בישראל.

## פלשמורה

פלשמורה הם יהודים אתיופים שאבותיהם התנצרו בכפייה בתקופות שונות. לאחר שנים של מאבק, המדינה הכירה בזכותם לעלות, ותהליך העלייה שלהם נמשך עד היום.

## קהילה בישראל

- **ריכוזי אוכלוסין עיקריים**: נתניה, ראשון לציון, רחובות, אשקלון, פתח תקווה.
- **מוסדות תרבות**: מוזיאון קסם — יהדות אתיופיה (תל אביב), מרכזי קהילה ייעודיים.
- **ארגוני נציגות**: האגודה לקידום מעמד האתיופים (אמ"א), טבקה — סיוע משפטי.

## קישורים רלוונטיים

- [זכויות עולים — סל קליטה](/he/rights/klita-basket-ethiopia)
- [זכות עלייה לפלשמורה](/he/rights/falash-mura-direct-absorption)`,

      en: `## Beta Israel — Ethiopian Jewry

Beta Israel (Ge'ez: ቤተ እስራኤል, "House of Israel") is the name of the Ethiopian Jewish community, which lived for centuries in the highlands of Ethiopia — primarily in the Gondar region. They maintained Torah, Shabbat, kashrut, and unique Jewish customs shaped independently from the Rabbinic diaspora.

## Origins and Traditions

Several traditions explain their origins:
- **Descendants of Solomon and Sheba** — a celebrated tradition linking them to the offspring of the Queen of Sheba and King Solomon.
- **Tribe of Dan** — the widely accepted rabbinic view (Rabbi Ovadia Yosef, 1973) recognizing them as fully Jewish.
- **Exiles of the First Temple** — said to have reached Ethiopia after the destruction in 586 BCE.

## Religion and Practice

The community maintained an **independent religious lifestyle** based on:
- **Orit** — the Pentateuch in Ge'ez translation.
- **Kesim (singular: Kes)** — priestly religious leadership, predating the Rabbinic model.
- **Beit-Maskal** — unique pilgrimage festivals.
- Strict observance of Shabbat, kashrut, and family purity laws.

## Aliyah to Israel

| Operation | Year | Olim |
|-----------|------|------|
| Operation Moses | 1984–1985 | ~8,000 |
| Operation Sheba | 1985 | ~500 |
| Operation Solomon | 1991 | ~14,300 |
| Ongoing + Falash Mura | 1991–present | ~60,000+ |

**Total**: Approximately 165,000 Ethiopian-Israelis and their descendants live in Israel today.

## Falash Mura

Falash Mura are Ethiopian Jews whose ancestors converted to Christianity under coercion at various points in history. After years of advocacy, the Israeli government recognized their right of return, and their aliyah process continues to this day.

## Community in Israel

- **Main population centers**: Netanya, Rishon LeZion, Rehovot, Ashkelon, Petah Tikva.
- **Cultural institutions**: Museum of Ethiopian Jews (Tel Aviv), dedicated community centers.
- **Advocacy organizations**: IAEJ, TEBEKA — legal aid organization.

## Related Rights

- [Olim rights — Klita basket](/en/rights/klita-basket-ethiopia)
- [Falash Mura right of return](/en/rights/falash-mura-direct-absorption)`,

      am: `## ቤተ እስራኤል — የኢትዮጵያ አይሁዶች

ቤተ እስራኤል (ግዕዝ: ቤተ እስራኤል፣ "የእስራኤል ቤት") የኢትዮጵያ አይሁዳዊ ማህበረሰብ ስም ነው። ለብዙ ምዕተ-ዓመታት በኢትዮጵያ ደጋዎች — ዋናነቱ በጎንደር ክልል — ኖሩ። ቶራ፣ ሰንበት፣ ካሽሩት እና ከሬቢናዊ ዲያስፖራ ተለይቶ የቆመ ልዩ አይሁዳዊ ወጉን ጠበቁ።

## ዋና ጉዳዮች

- **ኦሪት** — ፔንታቱክ በግዕዝ ቋንቋ።
- **ቀሶች** — የሃይማኖት መሪዎች (ከሬቢናዊ ሞዴል በፊት)።
- **ሰንበት፣ ካሽሩት እና የቤተሰብ ንጽህና** ጥብቅ ክትትል።

## ወደ እስራኤል ጉዞ

| ኦፕሬሽን | ዓ.ም | ቁጥር |
|---------|------|------|
| ሙሴ ኦፕሬሽን | 1984–1985 | ~8,000 |
| ሰሎሞን ኦፕሬሽን | 1991 | ~14,300 |
| ፍላሽ ሙራ + ተከታዩ | 1991–ዛሬ | ~60,000+ |

ዛሬ **~165,000** የኢትዮጵያ-እስራኤሎች በእስራኤል ይኖራሉ።

## ፍላሽ ሙራ

ፍላሽ ሙራ ቀደም ሲል ወደ ክርስትና የተቀሩ የኢትዮጵያ አይሁዶች ናቸው። ዓመታት ታግለው በኋላ ወደ እስራኤል የመመለስ መብት ተሰጣቸው፣ ሂደቱ ዛሬም ቀጥሏል።

## ተያያዥ መብቶች

- [የኦሊም መብቶች — ሰል ቅሊታ](/am/rights/klita-basket-ethiopia)
- [ፍላሽ ሙራ — የተሰጠ ወደ ሃገር ምለሻ](/am/rights/falash-mura-direct-absorption)`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findHeritageEvent(slug: string): HeritageEventEntry | null {
  return HERITAGE_EVENTS.find((e) => e.slug === slug) ?? null;
}

export function heritageEventBody(entry: HeritageEventEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}

/** Next observance date (YYYY-MM-DD) or null if all upcomingDates are past. */
export function nextDate(
  entry: HeritageEventEntry,
  now: Date = new Date(),
): string | null {
  const today = now.toISOString().slice(0, 10);
  for (const d of entry.upcomingDates) {
    if (d >= today) return d;
  }
  return null;
}
