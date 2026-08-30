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
    upcomingDates: ["2026-11-19", "2027-11-08", "2028-11-25"],
    relatedRights: ["sigd-funding"],
    relatedTerms: ["sigd", "kessim"],
    relatedOrgs: ["bina", "iaej"],
    bodies: {
      he: `## מה זה סיגד?

סיגד הוא חג מרכזי בלוח השנה של יהדות אתיופיה — נחגג מאז המאה ה-15. החג מציין את חידוש הברית של בני ישראל עם אלוהים, על-פי המודל של שיבת ציון בספר נחמיה. ב-2008 נחקק חוק יום הסיגד, והוא חג רשמי במדינת ישראל.

**סיגד 2026 יחול ב-19 בנובמבר 2026 (29 בחשוון תשפ"ז).**

## לוח אירועים 2026

| עיר | אירוע | מועד משוער |
|-----|-------|-----------|
| ירושלים — ארמון הנציב | טקס מרכזי, ~5,000 משתתפים | 19.11.2026 |
| נתניה | טקס עירוני + שוק מסורתי | 19.11.2026 |
| רחובות | טקס קהילתי | 19.11.2026 |
| באר-שבע | אירוע קהילה + ריקודים | 19.11.2026 |
| חיפה | טקס בפארק | 19.11.2026 |
| אשדוד | פסטיבל סיגד | 19.11.2026 |
| רמלה / לוד | אירוע משותף | 19.11.2026 |

## הטקס בירושלים — מה לצפות?

טקס ירושלים הוא הגדול ביותר — מאות אלפים חוגגים יחד מאז 1993 ביפה הנוף שעל הארמון הנציב.

**לוח הטקס (שעות משוערות):**
- 07:00 — עלות הקייסים עם ספרי הוּ-אוֹת (תורה אתיופית)
- 08:00–12:00 — תפילות ופיוטים בניהול קייסים, צום עד הצהריים
- 12:00 — שבירת הצום + חגיגות
- 14:00–18:00 — מופעי מוזיקה ומחול
- 18:00+ — ריקודי שירה קהילתיים

## מה להביא?

- בגדים לבנים (מסורתי) — אך לא חובה
- אוכל לשבירת הצום (הטרה/דורו ווט נפוצים)
- כיסא מתקפל / שמיכה ישיבה
- מים (הצום ממים מותר, אך מומלץ אחרי 12:00)
- כרית לילדים לישיבה ארוכה

## הגעה לירושלים — תחבורה

- **הסעות מאורגנות** ממרבית ערי הקליטה (בדרך כלל חינמיות — פנה לעירייה ולקהילה המקומית)
- **רכבת לירושלים** ועיר מסילה → אוטובוס 78/78א' לארמון הנציב
- **חניה**: מוגבלת מאוד — מומלץ תחבורה ציבורית

## קייסים — מי הם?

הקייסים הם הרבנים של יהדות אתיופיה — גדלו בתפקידם עוד לפני העלייה לישראל. הם המנהיגים את הטקסים, מלמדים ניגון התפילות המסורתיים ושומרים על האמוניקה — הנוסח האתיופי.

## מימון פעילויות סיגד מקומיות

יש זכות ממשלתית של סבסוד פעילויות סיגד מקומיות (טקסים, חינוך, תחבורה). ראו [מימון סיגד — זכות](/he/rights/sigd-funding) לפרטים.

## תפריט הסיגד — מה אוכלים בסיום הצום

לאחר התפילות והצום מהבוקר ועד הצהריים, מגיע רגע שבירת הצום — סביב השעה 12:00 (ראו לוח הטקס למעלה). מסורתית, המשתתפים נושאים עימם צידה לשבירת הצום מיד לאחר התפילה, ובכפרים באתיופיה נהגו לחתום את היום בסעודת מצווה חגיגית. הכנסת אורחים היא מנהג בעל משמעות מיוחדת סביב חג הסיגד — הארוחה המשותפת היא חלק מהחיבור הקהילתי של החג, לא רק ארוחה לשובע.

הארוחה החגיגית של הסיגד, כמו רוב הארוחות החגיגיות במטבח האתיופי, מבוססת על אינג'רה — לחם ספוגי מקמח טף המשמש גם כ"צלחת" וגם כלחם. עליה מוגשים תבשילים כמו דורו ווט (תבשיל עוף חריף, לעיתים עם ביצה קשה), תבשיל עדשים חריף (קיי מסר ווט) ותבשיל ירקות עדין יותר (אלצ'ה) — לצד תבלין הברברה, שמעניק לתבשילים את הצבע האדום והחריפות האופייניים. בקהילות מסוימות מוגשים גם קייסר (תבשיל סלק) ואגוואט (גבינה ביתית) לצד דאבו (לחם עגול אפוי).

חשוב להדגיש: אלה מאכלים אתיופיים מסורתיים שמלווים בדרך כלל את חגיגות הסיגד — לא תפריט אחיד או "רשמי", והמנהג משתנה ממשפחה למשפחה ומקהילה לקהילה.

להרחבה — מנה אחר מנה, משמעות הצום וקניות לקראת החג: [צום הסיגד ותפריט שבירת הצום — המדריך המלא](/he/culinary/sigd-menu).

## ראו גם

- [סיגד — מילון](/he/glossary/sigd)
- [קייסים — מילון](/he/glossary/kessim)
- [BINA — פרופיל ארגון](/he/orgs/bina)`,
      en: `## What is Sigd?

Sigd is a central holiday in the Ethiopian Jewish calendar — celebrated since the 15th century. The holiday marks the renewal of the covenant between the Children of Israel and God, modeled on the return to Zion in the Book of Nehemiah. In 2008, the Sigd Day Law was enacted, and it is now a national holiday in the State of Israel.

**Sigd 2026 falls on 19 November 2026 (29 Cheshvan 5787).**

## 2026 events calendar

| City | Event | Approx. date |
|------|-------|-------------|
| Jerusalem — Armon Hanatziv | Main ceremony, ~5,000 attendees | 19.11.2026 |
| Netanya | Municipal ceremony + traditional market | 19.11.2026 |
| Rehovot | Community ceremony | 19.11.2026 |
| Beersheba | Community event + dancing | 19.11.2026 |
| Haifa | Park ceremony | 19.11.2026 |
| Ashdod | Sigd festival | 19.11.2026 |
| Ramla / Lod | Joint event | 19.11.2026 |

## The Jerusalem ceremony — what to expect

The Jerusalem ceremony is the largest — tens of thousands celebrate together since 1993 at the scenic Armon Hanatziv promenade.

**Ceremony schedule (approximate):**
- 07:00 — Kessim ascend with Hu'at scrolls (Ethiopian Torah)
- 08:00–12:00 — Prayers and liturgical songs led by Kessim; fasting until noon
- 12:00 — Breaking the fast + celebrations
- 14:00–18:00 — Music and dance performances
- 18:00+ — Community singing and dancing

## What to bring

- White clothing (traditional, but not mandatory)
- Food to break the fast (injera/doro wat are popular)
- Folding chair or blanket to sit on
- Water (fasting from water is permitted, but drinking from noon onward is recommended)
- Cushion for children for the long sitting

## Getting to Jerusalem

- **Organised transport** from most absorption cities (usually free — check with your municipality or local community)
- **Train to Jerusalem** then bus 78/78a to Armon Hanatziv
- **Parking**: very limited — public transport strongly recommended

## The Kessim — who are they?

The Kessim are the rabbis of Ethiopian Judaism — they grew into their role before the aliyah to Israel. They lead the ceremonies, teach the traditional prayer melodies, and preserve the Orit — the Ethiopian version of the Torah.

## Funding for Sigd activities

There is a government right subsidizing local Sigd activities (ceremonies, education, transportation). See [Sigd funding — right](/en/rights/sigd-funding) for details.

## The Sigd table — what's eaten after the fast

After the morning-to-noon prayers and fast, the fast is broken — around 12:00 (see the ceremony schedule above). Traditionally, participants carried provisions with them to break the fast right after the prayers, and in villages in Ethiopia the day historically closed with a festive communal meal. Hospitality carries special significance around Sigd — the shared meal is as much about community as it is about food.

Like most festive meals in Ethiopian cuisine, the Sigd feast is built around injera — a spongy teff-flour flatbread that serves as both plate and bread. It's topped with stews such as doro wat (a spicy chicken stew, often served with a hard-boiled egg), a spicy lentil stew (kai misir wat), and a milder vegetable stew (alicha) — all seasoned with berbere, the spice blend that gives the dishes their characteristic red colour and heat. In some communities the table also includes kaysar (a beet stew) and agwat (homemade cheese) alongside dabo (round baked bread).

Worth noting: these are traditional Ethiopian dishes commonly associated with Sigd celebrations — not a fixed or "official" menu, and customs vary by family and community.

For more — dish by dish, the meaning of the fast, and shopping for the holiday: [The Sigd fast and the break-fast menu — the complete guide](/en/culinary/sigd-menu).

## See also

- [Sigd — glossary](/en/glossary/sigd)
- [Kessim — glossary](/en/glossary/kessim)
- [BINA — organization profile](/en/orgs/bina)`,
      am: `## ሰግድ ምንድን ነው?

ሰግድ የኢትዮጵያ አይሁዳዊ የቀን መቁጠሪያ ዋና በዓል ነው — ከ15ኛው ክፍለ ዘመን ጀምሮ ይከበራል። በዓሉ የእስራኤል ልጆች ከእግዚአብሔር ጋር ያለው ቃል ኪዳን መታደሱን ያመለክታል። በ2008 የሰግድ ቀን ህግ ተሻሽሏል፣ አሁን ብሔራዊ በዓል ነው።

**ሰግድ 2026 — ህዳር 19፣ 2026 (29 ኅዳር 5787)**

## 2026 የዝግጅቶች ዝርዝር

- **ኢየሩሳሌም** — ዋና ስነ-ስርዓት፣ ~5,000 ተሳታፊዎች
- **ናታንያ** — የከተማ ስነ-ስርዓት + ባህላዊ ገበያ
- **ሬሆቮት** — የማህበረሰብ ስነ-ስርዓት
- **ቤርሼቫ** — የማህበረሰብ ዝግጅት + ዳንስ
- **ሀይፋ** — ፓርክ ስነ-ስርዓት
- **አሽዶድ** — ሰግድ ፌስቲቫል

## ምን ይዘው ይምጡ

- ነጭ ልብስ (ባህላዊ፣ ግዴታ አይደለም)
- ጾምን ለመስበር ምግብ (እንጀራ/ዶሮ ወጥ ዝነኛ ናቸው)
- ወንበር ወይም ብርድ ልብስ
- ውሃ (ከምሳ ሰዓት ጀምሮ ይመከራል)

## ቄሶች — ማን ናቸው?

ቄሶች የኢትዮጵያ አይሁዳዊ ሃይማኖት መሪዎች ናቸው — ከእስራኤል ከመምጣታቸው በፊት ሚናቸውን ይዘው አደጉ። ስነ-ስርዓቶቹን ይመሩ፣ ባህላዊ ጸሎት ዜማዎችን ያስተምሩ።

## ለሰግድ ዝግጅቶች ገንዘብ ድጋፍ

ለሰግድ ዝግጅቶች (ስነ-ስርዓቶች፣ ትምህርት፣ ትራንስፖርት) መንግሥታዊ ድጎማ አለ። ዝርዝር ለማወቅ [ሰግድ ፋይናንሲንግ](/am/rights/sigd-funding) ይዩ።

## የሰግድ ምግቦች — ከጾም በኋላ ምን ይበላል

ከጠዋት እስከ ቀትር ከጸሎትና ከጾም በኋላ፣ ጾሙ ይሰበራል — በግምት ከቀኑ 12:00 ላይ (ከላይ ያለውን የስነ-ስርዓት ሰዓት ይመልከቱ)። በባህል፣ ተሳታፊዎች ጾም ወዲያውኑ ለመስበር ስንቅ ይዘው ይመጣሉ፤ በኢትዮጵያ መንደሮችም ቀኑ በበዓል የማህበረሰብ ምግብ ይዘጋ ነበር። እንግዳ ተቀባይነት በሰግድ ወቅት ልዩ ትርጉም አለው — የጋራ ምግቡ ስለ ማህበረሰብ ትስስር እንጂ ስለ ምግብ ብቻ አይደለም።

እንደ አብዛኛው የኢትዮጵያ ባህላዊ በዓል ምግቦች፣ የሰግድ ምግብም በእንጀራ ላይ የተመሰረተ ነው — ሁለቱም እንደ ሳህንም እንደ ዳቦም የሚያገለግል የጤፍ ዱቄት ምግብ። ከላይ ዶሮ ወጥ (በርበሬ የበዛበት፣ ብዙ ጊዜ ከእንቁላል ጋር)፣ ምስር ወጥ (ቅመም የበዛበት የምስር ወጥ) እና አልጫ (ለስላሳ የአትክልት ወጥ) ይቀርባል — ሁሉም በርበሬ በተባለው ቅመም ተለውሰው። በአንዳንድ ማህበረሰቦች ውስጥ ቂጣ (ካይሰር) እና አጓት (የቤት ውስጥ አይብ) ከዳቦ ጋር ይቀርባሉ።

*[⚠️ የAI ትርጉም — የምግብ ስሞችን ትክክለኛነት (በተለይ "ካይሰር"/"ቂጣ") በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*

ለተጨማሪ — የጾሙ ትርጉምና ለበዓሉ ግብይት፡ [የሰግድ ጾም እና የጾም መስበሪያ ምግብ — ሙሉ መመሪያ](/am/culinary/sigd-menu)።

## ተጨማሪ

- [ሰግድ — መዝገብ](/am/glossary/sigd)
- [ቄሶች — መዝገብ](/am/glossary/kessim)`,
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
    upcomingDates: ["2026-11-19", "2027-11-08", "2028-11-25"],
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
- **ארגוני נציגות**: האגודה לקידום מעמד האתיופים (אמ"א), תבקה — סיוע משפטי.

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
