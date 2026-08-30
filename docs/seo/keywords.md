# Tedros — Keyword Research (Real Estate, Phase 3)

> **Owner**: Tedros Content & SEO. **Cadence**: רענון רבעוני, Top‑20 שבועי דרך Google Search Console (Autopilot).
> **Last update**: 2026‑04‑27. **Scope**: זרוע נדל"ן בלבד; זכויות/תרבות/אנשי-מקצוע — ב-`keywords-rights.md` / `keywords-pros.md` (TBD).

## 0. תקציר מנהלים

הקהילה האתיופית-ישראלית (~177K, ריכוז במרכז ובדרום) מחפשת בגוגל בעיקר **בעברית**. שאילתות נדל"ן מתחלקות לשלוש שכבות:

1. **Transactional ⭐** — Head-terms תחרותיים אבל "warm" כי המשתמש מחפש פעולה (משכנתא, מחיר למשתכן, התחדשות עירונית). כאן ה-ROI הגבוה ביותר; SERPs נשלטים ע"י Kol-Zchut, gov.il, ו-3-5 ברוקרים פרטיים — ניתן לשבור עם E‑E‑A‑T + תוכן אקטיבי + schema.
2. **Mid informational** — שאילתות "מה זה" / "מי זכאי" / "סיגד 2026". תחרות נמוכה‑בינונית מ-Wikipedia, Kol-Zchut. ניצחון אפשרי דרך FAQPage + עומק לוקאלי.
3. **Long-tail programmatic** — `[מקצוע] [עיר]` × `[שכונה] התחדשות עירונית` × `דירות למכירה [עיר]`. נפח קטן פר-ביטוי אבל מאות שאילתות מצטברות. שם המנוע ה-programmatic של פאזה 3 צובר נפח.

**הימור עיקרי:** עמודי עיר ושכונה ייחודיים שאף אחד אחר לא בנה לקהילה (ראמ"י + Kol-Zchut + Yad2 לא יוצרים פילוח קהילתי). זהו ה-defensible moat.

---

## 1. מתודולוגיה

> אין תקציב חודשי ל-Ahrefs/SEMrush (CLAUDE.md, Cost discipline). הניתוח עכשיו מבוסס מקורות חינמיים + הערכות. אם המשתמש יאשר ניסיון Ahrefs (~$99/חודש, חד-פעמי), נחליף את עמודות הנפח/קושי בנתונים אמיתיים.

### מקורות בשימוש (חינמיים)

| כלי                                                      | מטרה                                                          | תדירות            |
| -------------------------------------------------------- | ------------------------------------------------------------- | ----------------- |
| Google Trends                                            | אימות ביקוש יחסי (HE), עונתיות, ערים מובילות                  | פר‑מילה לפני שיוך |
| Google Auto-suggest                                      | קצירת long-tail (`google.com/search?q=…&hl=he`)               | פר‑מילה           |
| AnswerThePublic (free)                                   | שאלות 5W1H סביב head-term                                     | פר‑pillar         |
| Google Search Console                                    | אחרי השקה: queries + impressions + position (source of truth) | יומי              |
| Bing Webmaster Tools                                     | Keyword Research מספק נפחים מוערכים בחינם                     | חד‑פעמי + רבעוני  |
| `site:gov.il`, `site:kolzchut.org.il`, `site:yad2.co.il` | מיפוי המתחרים בפועל ב-SERP                                    | פר‑מילה           |

### עמודות הטבלה (להלן)

- **Volume** — חיפושים/חודש, ישראל, עברית. סולם: `S` <100, `M` 100‑1K, `L` 1K‑10K, `XL` >10K. עד שיש Ahrefs, ההערכה מבוססת Trends + Bing + heuristic.
- **Intent** — `T`=transactional / `I`=informational / `N`=navigational / `C`=commercial-investigation.
- **KD** (Keyword Difficulty) — סולם אישי 1‑5 על בסיס שילוב: כמה מהמתחרים top‑10 הם DA>70 (`5`=כל top‑10 DA70+, `1`=top‑10 פתוח לאתר חדש).
- **Top SERP** — 1‑2 מתחרים בולטים (לדעת מי לאגף).
- **Tedros angle** — מה הזווית שתיתן לנו עדיפות (לא להעתיק את kol‑zchut).
- **Page** — סוג הדף שיירק את המילה: `pillar` / `cluster` / `programmatic` / `listing` / `landing` / `calc`.
- **URL slug (HE)** — slug מתוכנן (canonical HE; EN/AM ב-Paraglide).
- **Status** — `target` / `drafting` / `live` / `ranked`.

---

## 2. Tier 1 — Transactional ⭐ (Phase 3, M0–M3)

| #   | Keyword (HE)                      | Volume | Intent | KD  | Top SERP                             | Tedros angle                                                                                                                  | Page          | URL slug (HE)                                | Status |
| --- | --------------------------------- | ------ | ------ | --- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------- | ------ |
| 1   | משכנתא ליוצאי אתיופיה             | M      | T      | 2   | kolzchut, מתווכי משכנתאות פרטיים     | מחשבון זכאות אינטראקטיבי + 2026 ע"ע + סיפורי קייסים אנושיים. **לא** PDF. CTA → ליד.                                           | calc + pillar | `/calculator/mashkanta-yotzei-etiopiya`      | target |
| 2   | תוכנית הדיור יוצאי אתיופיה        | S/M    | I→T    | 2   | gov.il, kolzchut                     | מדריך 2026 פעיל: צעדים, טפסים, מועדים. Schema: GovernmentService.                                                             | pillar        | `/zchuyot/diur/tochnit-diur-yotzei-etiopiya` | target |
| 3   | הגרלה משכנתא 2026                 | L      | T      | 4   | gov.il (mh.gov.il), Globes/TheMarker | "האם אתה זכאי בהגרלה הזו?" + מחשבון התאמה + תזכורת מועד הרשמה (email capture).                                                | landing       | `/diur/hagrala-mashkanta-2026`               | target |
| 4   | התחדשות עירונית רמת אליהו         | S      | I→T    | 2   | רשות מקומית, Madlan, Yad2            | מפת פרויקטים חיה + מינהלת + סיוע משפטי + איש קשר קהילתי. Schema: GovernmentService + Place.                                   | programmatic  | `/hitchadshut-ironit/ramat-eliyahu`          | target |
| 5   | התחדשות עירונית קרית משה רחובות   | S      | I→T    | 2   | עיריית רחובות, Madlan                | זהה — פר-שכונה.                                                                                                               | programmatic  | `/hitchadshut-ironit/kiryat-moshe-rehovot`   | target |
| 6   | התחדשות עירונית דורה נתניה        | S      | I→T    | 2   | עיריית נתניה                         | זהה.                                                                                                                          | programmatic  | `/hitchadshut-ironit/dora-netanya`           | target |
| 7   | התחדשות עירונית נאות שקד נתניה    | S      | I→T    | 2   | עיריית נתניה                         | זהה.                                                                                                                          | programmatic  | `/hitchadshut-ironit/neot-shaked-netanya`    | target |
| 8   | התחדשות עירונית קרית נורדאו נתניה | S      | I→T    | 2   | עיריית נתניה                         | זהה.                                                                                                                          | programmatic  | `/hitchadshut-ironit/kiryat-nordau-netanya`  | target |
| 9   | דירות למכירה נתניה                | XL     | T      | 5   | Yad2, Madlan, Homeless               | לא מנסים להכות את Yad2 head‑on. דף "דירות למכירה לקהילה" עם פילוח: שכונות בעלות נוכחות אתיופית, מימון מותאם, מתווכים מהקהילה. | listing-hub   | `/listings/netanya/sale`                     | target |
| 10  | דירות למכירה ראשון לציון          | XL     | T      | 5   | Yad2, Madlan                         | זהה (פילוח קהילתי, ראמת אליהו).                                                                                               | listing-hub   | `/listings/rishon-letzion/sale`              | target |
| 11  | דירות למכירה רחובות               | L      | T      | 5   | Yad2, Madlan                         | זהה.                                                                                                                          | listing-hub   | `/listings/rehovot/sale`                     | target |
| 12  | דירות למכירה אשקלון               | L      | T      | 4   | Yad2, Madlan                         | זהה.                                                                                                                          | listing-hub   | `/listings/ashkelon/sale`                    | target |
| 13  | דירות למכירה קריית גת             | M      | T      | 3   | Yad2                                 | תחרות נמוכה יותר → הזדמנות מהירה.                                                                                             | listing-hub   | `/listings/kiryat-gat/sale`                  | target |
| 14  | מחיר למשתכן יוצאי אתיופיה         | S      | I→T    | 1   | kolzchut, gov.il                     | "האם משתלם לך מחיר למשתכן בהגרלות הקרובות?" + השוואה מול הגרלת ייעודית.                                                       | pillar        | `/diur/mehir-le-mishtaken-yotzei-etiopiya`   | target |
| 15  | דיור ציבורי יוצאי אתיופיה         | S      | I→T    | 2   | gov.il (moch.gov.il), kolzchut       | מי זכאי, איך לערער על סירוב, איש קשר במשרד הבינוי.                                                                            | pillar        | `/diur/diur-tziburi-yotzei-etiopiya`         | target |

**הערות:**

- שורות 9‑13 (דירות למכירה [עיר]) הן head terms עם DA70+ ב-top‑10. הריבוע שלנו: index של ליסטינגים אמיתיים בכל עיר + טאב "מותאם לקהילה" + עומק שכונה + עמודי שכונה לינקיניים פנימיים. Phase 3 — לא נכוון לעמוד 1 ב-90 יום על "דירות למכירה נתניה" head-term; נכוון על long-tail variants (שורות 4‑8) שמופיעים גם בתוך ה-clustering.
- שורה 3 (הגרלה משכנתא 2026) — **timely**, צריכה landing לפני פתיחת הרשמה. לוודא תאריך פתיחה רשמי לפני פרסום.

---

## 3. Tier 2 — Mid Informational (Phase 3 supporting + Phase 4 pillars)

| #   | Keyword (HE)         | Volume | Intent | KD  | Top SERP                  | Tedros angle                                                                                                         | Page    | URL slug (HE)                | Status |
| --- | -------------------- | ------ | ------ | --- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------- | ------ |
| 16  | חג סיגד 2026         | M      | I      | 2   | Wikipedia, gov.il, חב"ד   | מתי בדיוק (ע"פ לוח עברי), איפה חוגגים השנה (ירושלים + ערים נוספות), היסטוריה אוטנטית מסיפורי קייסים. עברית + אמהרית. | pillar  | `/sigd-2026`                 | target |
| 17  | ביתא ישראל           | L      | I      | 4   | Wikipedia, ynet, kolzchut | סיפור קהילה מנקודת מבט פנימית — לא אנציקלופדי. ראיונות, שמירת מורשת, גשר הצלה.                                       | pillar  | `/beta-israel`               | target |
| 18  | קייסים יהודי אתיופיה | M      | I      | 2   | מאמרים, Wikipedia         | קייסים פעילים היום + תפקיד הלכתי + יצירת קשר.                                                                        | cluster | `/beta-israel/keysim`        | target |
| 19  | זכויות יוצאי אתיופיה | M      | I→T    | 3   | kolzchut, gov.il, ENP     | אקטיבי: "אתה זכאי, וכך תפעל" — לא רשימה כמו Kol‑Zchut.                                                               | pillar  | `/zchuyot`                   | target |
| 20  | סיגד מתי             | M      | I      | 1   | Wikipedia, גלובס          | snippet-bait: "סיגד 2026 ייחגג בתאריך X" + featured snippet markup.                                                  | snippet | (חלק מ-#16)                  | target |
| 21  | מבצע משה             | L      | I      | 3   | Wikipedia                 | היסטוריה דרך עיני קייסים + עדכוני דור שני‑שלישי.                                                                     | cluster | `/beta-israel/mivtza-moshe`  | target |
| 22  | מבצע שלמה            | L      | I      | 3   | Wikipedia                 | זהה.                                                                                                                 | cluster | `/beta-israel/mivtza-shlomo` | target |

---

## 4. Tier 3 — Long-tail Programmatic (Phase 3+, מנוע)

מנוע ה-programmatic מייצר דפים ע"פ axes. כל דף = אובייקט DB + template + ≥800 מילים (gate ב-`programmatic_pages.word_count`, ADR-005). שלוש משפחות:

### 4.1 `[מקצוע] [עיר]` (Profession × City)

המקצועות (תחילה): `עורך דין`, `יועץ משכנתאות`, `רואה חשבון`, `רופא דובר אמהרית`, `יועץ זוגי`, `פסיכולוג`.
הערים (Phase 3): נתניה, ראשון לציון, רחובות, אשקלון, קריית גת, באר שבע, חיפה, קריית מלאכי.

תבנית URL: `/{profession-slug}/{city-slug}` (לדוגמה `/orech-din-yotzei-etiopiya/netanya`).

| Keyword (template)             | Volume (each) | Intent | KD  | Tedros angle                                                  | Status |
| ------------------------------ | ------------- | ------ | --- | ------------------------------------------------------------- | ------ |
| עורך דין יוצא אתיופיה {city}   | S             | T      | 1   | Profile cards + תחומי-עיסוק + שפת ראיון (אמהרית?) + lead form | target |
| יועץ משכנתאות מהקהילה {city}   | S             | T      | 1   | זהה + הצלבה לדף "משכנתא ליוצאי אתיופיה"                       | target |
| רופא דובר אמהרית {city}        | S             | T      | 1   | זהה + סוג רפואה (משפחה, ילדים, נשים)                          | target |
| רואה חשבון יוצא אתיופיה {city} | S             | T      | 1   | זהה                                                           | target |

**נפח מצטבר:** 6 מקצועות × 8 ערים = 48 דפים. ~30‑50 חיפושים/דף ⇒ ~1.5K‑2.4K הזדמנויות/חודש מצטבר. תחרות אפסית.

### 4.2 `[עיר] × [נושא נדל"ן]` (City × Topic)

| Keyword (template)          | Volume | KD  | Page                                                                                                  |
| --------------------------- | ------ | --- | ----------------------------------------------------------------------------------------------------- |
| נדל"ן ליוצאי אתיופיה {city} | S/M    | 1   | Pillar עיר — overview + listings + שכונות + מקצוענים + זכויות מקומיות. ראה `templates/pillar-city.md` |
| התחדשות עירונית {city}      | M      | 2   | אגרגציה של פרויקטים בעיר → ניווט לדפי שכונה.                                                          |
| מחיר למשתכן {city}          | M      | 3   | סטטוס הגרלות מקומיות + השוואה.                                                                        |
| דירות 3 חדרים {city}        | M      | 4   | Listings filter pre-applied — index רק אם יש ≥10 ליסטינגים live.                                      |
| דירות 4 חדרים {city}        | M      | 4   | זהה.                                                                                                  |

### 4.3 `[שכונה] × [נושא]` (Neighborhood × Topic)

תבנית URL: `/hitchadshut-ironit/{neighborhood-slug}` (כבר ב-Tier 1 #4‑8). Phase 3 מתחיל ב-5 שכונות (TED-16, סעיף 3.2).

| Keyword (template)                | Volume | KD  | Page                                                          |
| --------------------------------- | ------ | --- | ------------------------------------------------------------- |
| התחדשות עירונית {neighborhood}    | S      | 2   | ראה `templates/neighborhood.md`                               |
| דירות למכירה {neighborhood}       | S      | 3   | Listings filter על neighborhood_id — index רק אם ≥10 live.    |
| {neighborhood} שכונה              | S      | 1   | סקירת שכונה כללית — נוכחות קהילתית, שירותים, תחבורה.          |
| תוכנית פינוי בינוי {neighborhood} | S      | 2   | פר-פרויקט: סטטוס, יזם, זכאות דייר. Schema: GovernmentService. |

---

## 5. שאילתות לאיגוף (Defensive)

מילים שאם **לא** נופיע עליהן, יחפש המשתמש את מתחרה במקום אותנו. צריך לפחות עמוד 2 בכולן עד M3.

- `kolzchut אתיופיה` — לא להתחרות עם kolzchut, אבל לוודא שעמודי הזכויות שלנו cross-link ל-kolzchut כמקור (E-E-A-T) ובו זמנית מובילים בנושאים actionable.
- `מתווכים יוצאי אתיופיה` — directory page (Phase 3 ליד-funnel).
- `עזרה כלכלית יוצאי אתיופיה` — נדל"ן × רווחה.
- `הלוואה לדירה ראשונה אתיופים` — נישת מימון.
- `דייר חוזר אתיופיה` — נישת חוזרים.

---

## 6. Anti-keywords (לא נטרגט)

לוודא ש**לא** נטרגט מילים פוגעניות, סטיגמטיות, או בעלות intent מטעה:

- שאילתות עם stigma גזעי (לא מצוטטות כאן) — `noindex` אם מוצא דרך auto-suggest.
- "יוצאי אתיופיה" כקטגוריה לבדה ללא הקשר אקטיבי (למשל מאמרי דעה) — לא pillar.
- שאילתות פוליטיות (מחאות, אלימות משטרתית) — לא טריטוריה של Tedros (לא נדל"ן/זכויות).
- `נישואין אתיופי` ודומים — לא סקופ.

---

## 7. Mapping לזרועות הסטרטגיה (TED-17)

| Tier | מספר דפים בפאזה 3 | Schema עיקרי                                                                  | Owners                                                                               |
| ---- | ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1    | 15 דפים ייעודיים  | `GovernmentService`, `FAQPage`, `Article`                                     | Content & SEO (כתיבה) + Engineer (schema/routes) + Researcher (validation של מועדים) |
| 2    | 7 pillars         | `Article`, `FAQPage`                                                          | Content & SEO + Researcher (מקורות gov.il/CBS)                                       |
| 3    | 60+ דפים          | `Person` (Pro), `RealEstateListing`, `Place` (neighborhood), `BreadcrumbList` | Content & SEO (templates/copy) + Data (DB seed) + Engineer (template→route)          |

---

## 8. KPIs לסבב הראשון (M0–M3)

- **M1 (4 שבועות מהשקה):** 30+ דפים live ואינדקס; Top‑20 שאילתות מ-Tier 1 ב-Search Console (גם אם position 30‑50).
- **M2 (8 שבועות):** 5 שאילתות מ-Tier 1 בעמוד 1 (1‑10); 1‑2 פיצ'ר‑סניפט (Tier 2 #20).
- **M3 (12 שבועות, DoD פאזה 3):** 10+ שאילתות מ-#1‑15 בעמוד 1; CTR ממוצע ≥4%; 0 critical errors ב-Search Console.

עדכון Tracker: דרך Autopilot DevOps שבועי (TED-17 זרוע 5).

---

## 9. TODO (לסבב הבא)

- [ ] Researcher: לאמת volumes ב-Bing Webmaster + Trends לכל שורה ב-Tier 1, להחליף את `S/M/L/XL` ב-מספר.
- [ ] Researcher: לסרוק SERPs לכל #1‑8 ולמלא את עמודת Top SERP בנכסים אמיתיים.
- [ ] לבחון 2026 budget ל-Ahrefs/SEMrush — אם יאושר, להחליף את ההערכות בנפחים אמיתיים.
- [ ] לפתוח `keywords-rights.md` ו-`keywords-pros.md` (זרועות נפרדות; חוצה לפאזה 4).
- [ ] קביעת tagging convention עם Engineer ל-`programmatic_pages.template` (`pillar-city`, `neighborhood-renewal`, `pro-city` וכו').

---

## 10. כתבה: שימור שפת אמהרית אצל הדור השני (2026-08-16)

**עמוד**: `app/lib/news/articles-wave6.server.ts` — `preserving-amharic-second-generation`. **Intent**: informational.

| ביטוי (HE)                 | Intent | הערות                                                       |
| -------------------------- | ------ | ----------------------------------------------------------- |
| שימור שפת אמהרית ילדים     | I      | head-term, יעד ה-H1                                         |
| למה ילדים לא מדברים אמהרית | I      | תואם את הזווית של ynet (ד"ר אנבסה טפרה)                     |
| קורס אמהרית לילדים         | I→T    | תואם את Tegest ואת דוגמת אור יהודה                          |
| אמהרית ספרי לי תרבות 46531 | N      | תואם ישירות לתוכנית גפ"ן של Tegest — נמוך נפח אבל אפס תחרות |
| דור שני יוצאי אתיופיה שפה  | I      | Long-tail, זהות/שימור תרבות                                 |

**הערת מתודולוגיה**: אין גישה בפועל ל-Google Trends/Ahrefs/SEMrush בסביבת המחקר; הדירוגים הם הערכה איכותנית מבדיקת SERP ידנית, לא נפחי חיפוש מספריים. **אזהרת היקף**: התוכן משקף רק 2 יוזמות מאומתות (Tegest — פעילה ומתמשכת; אור יהודה — חד-פעמית, קיץ 2024) ואינו מציג "מערך שימור שפה" ארצי — ר' הערת ההיקף בגוף הכתבה עצמה.

---

## 11. מדריך: אבלות ולוויה במסורת ביתא ישראל (2026-08-30, TED-138)

**עמוד**: `/family/mourning` — `app/lib/family/mourning.server.ts`. **Intent**: informational עם שכבת service (זכויות).

| ביטוי (HE)                | Intent | הערות                                                                    |
| ------------------------- | ------ | ------------------------------------------------------------------------ |
| מנהגי אבלות יוצאי אתיופיה | I      | head-term; אין נכס עברי מעשי מתחרה — SERP נשלט בערכי ויקי כלליים         |
| אזכרה אתיופית / תזכר      | I      | terminology query; המונח המאומת הוא תזכר (ተዝካር) — "חסקה" מהברי'ף לא אומת |
| מה עושים כשמישהו נפטר     | I→T    | נפח גבוה; אנו עונים עם checklist + זווית קהילתית ייחודית                 |
| לוויה אתיופית מה להביא    | I      | שאילתת אורחים — סקשן "לאורחים" בנוי עליה                                 |
| מענק פטירה ביטוח לאומי    | T      | קישור לעמוד btl רשמי; אין עדיין עמוד Rights Hub ייעודי (מועמד ל-issue)   |
| קצבת שאירים איך מגישים    | T      | כנ"ל                                                                     |
| דאס אבלות / לקסו          | I      | long-tail קהילתי, אפס תחרות                                              |

**מקורות מאומתים**: he.wikipedia (תזכר), israeliana.org (עוז אלמוג, 2022), btl.gov.il (מענק פטירה 10,514 ₪ נכון 01.01.2026, קצבת שאירים, דמי קבורה), gov.il (הודעת פטירה, רישום פטירה). **הערת שפה**: הגוף האמהרי הוא מראה מלאה — נדרש human review של דובר אמהרית (מסומן ב-PR).
