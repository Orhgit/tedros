// Culinary pillar — the staples of Ethiopian-Jewish cuisine in Israel
// (TED-146).
//
// Positioning per docs/research/2026-08-05-culinary-and-benefits-keyword-research.md:
// the recipe niche is saturated (ynet, Haaretz, Walla, food blogs) — the open
// niche is the CULTURAL/RELIGIOUS context nobody covers. So every staple here
// leads with meaning and community context, not cooking steps. No restaurant
// listings, no plain recipes.
//
// HE is the source-of-truth locale (CLAUDE.md). EN + AM are mirrors.
// Server-only module — do not import in client bundles.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

export type StapleKind = "staple" | "health";

export interface CulinaryStapleEntry {
  slug: string;
  /** Section anchor + heading. */
  title: Translatable;
  /** One-line summary used on the pillar and in meta description assembly. */
  summary: Translatable;
  kind: StapleKind;
  /** Markdown bodies. Internal links are locale-prefixed per locale. */
  body: Record<Locale, string>;
  lastReviewed: string;
}

export const CULINARY_STAPLES: CulinaryStapleEntry[] = [
  // ── 1. Injera + teff ───────────────────────────────────────────────────────
  {
    slug: "injera-teff",
    title: {
      he: "אינג'רה וטף — הלחם שבמרכז השולחן",
      en: "Injera and teff — the bread at the centre of the table",
      am: "እንጀራ እና ጤፍ — በማዕዱ መሃል ያለው እንጀራ",
    },
    summary: {
      he: "למה האינג'רה היא הרבה יותר מלחם: התססה של שלושה ימים, אכילה משותפת, וגוּרשה כמחוות כבוד.",
      en: "Why injera is much more than bread: three days of fermentation, communal eating, and the gursha gesture of honour.",
      am: "እንጀራ ከዳቦ በላይ ነው፡ የሶስት ቀን ማብላያ፣ የጋራ መብላት እና ጉርሻ።",
    },
    kind: "staple",
    body: {
      he: `האינג'רה — לחם שטוח וספוגי מקמח טף מותסס — היא הבסיס של כמעט כל ארוחה אתיופית, אבל תפקידה חורג הרבה מעבר לתזונה. האינג'רה היא גם הצלחת, גם הסכו"ם וגם הלחם: התבשילים מונחים ישירות עליה, וכל הסועדים אוכלים מאותו מגש משותף (מֶסוֹב). האכילה המשותפת הזאת אינה מקרית — היא ביטוי לערך מרכזי בתרבות האתיופית: הארוחה היא אירוע קהילתי, לא פעולה פרטית.

מחווה אחת מדגימה את זה יותר מכול: **גוּרשה** — הגשת נגיס אינג'רה עטוף בתבשיל ישירות לפיו של אדם אחר. בתרבות האתיופית זו מחוות כבוד ואהבה, והיא נפוצה בארוחות חג ובאירועים משפחתיים. מי שמתארח אצל משפחה מהקהילה ומקבל גוּרשה — קיבל מחמאה.

הכנת אינג'רה מסורתית אורכת יומיים-שלושה: בצק הטף מותסס באיטיות, והחמיצות העדינה המתקבלת היא סימן ההיכר של אינג'רה אמיתית. ההתססה הארוכה היא לא רק עניין של טעם — היא גם הסיבה שהאינג'רה נחשבת קלה יותר לעיכול ובעלת אינדקס גליקמי נמוך יחסית. בבתים רבים בישראל ממשיכים להכין אינג'רה ביתית, ובערים עם קהילה גדולה אפשר לקנות אינג'רה טרייה — ראו [איפה קונים מצרכים אתיופיים](/he/culinary) לפי עיר.

בהקשר היהודי-אתיופי, האינג'רה ליוותה גם את השבת: בקהילת ביתא ישראל באתיופיה הוכנו המאכלים לשבת מבעוד יום, והארוחה המשותפת סביב המסוב הייתה חלק ממרקם החיים הדתי של הכפר.

**מקורות**: [המדריך המלא לאינג'רה — thebaker.science](https://thebaker.science/%D7%90%D7%99%D7%A0%D7%92%D7%A8%D7%94-%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%A9%D7%9C%D7%90-%D7%AA%D7%A8%D7%A6%D7%95-%D7%9C%D7%A4%D7%A1%D7%A4%D7%A1/); על היתרונות הבריאותיים — [תזונה — מרכז הבריאות של Tedros](/he/health/nutrition).`,
      en: `Injera — a spongy fermented teff flatbread — is the base of almost every Ethiopian meal, but its role goes far beyond nutrition. Injera is plate, cutlery, and bread at once: stews are placed directly on it, and everyone eats from the same shared tray (the mesob). This communal eating is no accident — it expresses a core value of Ethiopian culture: a meal is a community event, not a private act.

One gesture captures this better than anything: **gursha** — feeding another person a morsel of injera wrapped around stew, directly by hand. In Ethiopian culture this is a gesture of honour and affection, common at holiday meals and family occasions. If you are hosted by a community family and receive a gursha — you have been paid a compliment.

Traditional injera takes two to three days to make: the teff batter ferments slowly, and the gentle sourness that results is the hallmark of real injera. The long fermentation is not just about flavour — it is also why injera is considered easier to digest, with a relatively low glycemic index. Many households in Israel still make injera at home, and in cities with a large community you can buy it fresh — see [where to buy Ethiopian groceries](/en/culinary) by city.

In the Ethiopian-Jewish context, injera also accompanied Shabbat: in the Beta Israel community in Ethiopia, Shabbat foods were prepared in advance, and the shared meal around the mesob was part of the village's religious fabric.

**Sources**: [The complete injera guide — thebaker.science](https://thebaker.science/%D7%90%D7%99%D7%A0%D7%92%D7%A8%D7%94-%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%A9%D7%9C%D7%90-%D7%AA%D7%A8%D7%A6%D7%95-%D7%9C%D7%A4%D7%A1%D7%A4%D7%A1/); on the health benefits — [Nutrition — Tedros Health Hub](/en/health/nutrition).`,
      am: `እንጀራ — ከተብላላ ጤፍ የሚሰራ ስፖንጃማ ዳቦ — የሁሉም የኢትዮጵያ ምግብ መሰረት ነው። እንጀራ ሳህንም፣ ማንኪያም፣ ዳቦም ነው፡ ወጦቹ በቀጥታ በላዩ ላይ ይቀመጣሉ፣ ሁሉም ከአንድ መሶብ ይበላል። ይህ የጋራ መብላት የኢትዮጵያ ባህል ዋና እሴት ነው — ምግብ የማህበረሰብ ክስተት ነው።

**ጉርሻ** — ለሌላ ሰው በእጅ እንጀራ ከወጥ ጋር ማጉረስ — የክብርና የፍቅር ምልክት ነው።

ባህላዊ እንጀራ ለመስራት ሁለት-ሶስት ቀናት ይወስዳል፡ የጤፍ ሊጡ ቀስ ብሎ ይብላላል። ረጅሙ ማብላያ ለመፈጨት ቀላል ያደርገዋል፣ ዝቅተኛ glycemic index አለው። በእስራኤል ብዙ ቤቶች እንጀራ በቤት ይሰራሉ፤ ትልቅ ማህበረሰብ ባለባቸው ከተሞች ትኩስ እንጀራ መግዛት ይቻላል — [የኢትዮጵያ ምግብ የት እንደሚገዛ](/am/culinary) በከተማ ይመልከቱ።

በቤተ እስራኤል ማህበረሰብ የሰንበት ምግቦች አስቀድመው ይዘጋጁ ነበር፣ በመሶብ ዙሪያ ያለው የጋራ ምግብ የመንደሩ ሃይማኖታዊ ሕይወት አካል ነበር።`,
    },
    lastReviewed: "2026-08-30",
  },

  // ── 2. Berbere ─────────────────────────────────────────────────────────────
  {
    slug: "berbere",
    title: {
      he: "ברברה — התבלין שנותן למטבח את צבעו",
      en: "Berbere — the spice that gives the cuisine its colour",
      am: "በርበሬ — ለምግቡ ቀለም የሚሰጠው ቅመም",
    },
    summary: {
      he: "תערובת הפלפלים האדומה שמכינים בבית, מסורת שעוברת בין דורות — ואיפה קונים אותה בישראל.",
      en: "The red pepper blend traditionally prepared at home, a tradition passed between generations — and where to buy it in Israel.",
      am: "በቤት የሚዘጋጀው ቀይ ቅመም ድብልቅ — በእስራኤልም የት እንደሚገዛ።",
    },
    kind: "staple",
    body: {
      he: `הברברה היא תערובת התבלינים המזוהה ביותר עם המטבח האתיופי: בסיסה פלפלים אדומים מיובשים, ואליהם מצטרפים — בהתאם למסורת המשפחתית — שום, ג'ינג'ר, קורנית אתיופית (בֶּסוֹבִּילָה), חילבה, קימל ותבלינים נוספים. היא שנותנת לדורו ואט ולקיי מסר ואט את הצבע האדום העמוק ואת החריפות המאופקת.

בתרבות האתיופית, הכנת ברברה הייתה מסורתית עבודה ביתית של נשים, שנמשכה ימים: ייבוש הפלפלים בשמש, קילוף, טחינה ותיבול. לתערובת של כל משפחה יש טעם משלה, והמתכון עובר מאם לבת. גם בישראל, משפחות רבות מהקהילה עדיין מכינות ברברה ביתית או מקבלות אותה מקרובים — וזה חלק מהסיבה שחנויות התבלינים האתיופיות הן הרבה יותר מנקודת מכירה: הן צומת קהילתי.

מי שלא מכין בבית יכול לקנות ברברה מוכנה בחנויות אתיופיות ברוב ערי הקהילה, וכיום גם בחנויות תבלינים כלליות ובאתרי מכירה. ההבדל המורגש: ברברה מחנות אתיופית נטחנת בדרך כלל טרייה ובהרכב מסורתי. ראו [איפה קונים מצרכים אתיופיים בעיר שלכם](/he/culinary).

הערה למי שלא רגיל: עוצמת החריפות של ברברה משתנה מאוד בין תערובות. מתחילים בכמות קטנה.

**מקורות**: [חנויות תבלינים ומוצרים מאתיופיה — שגרירות אתיופיה בישראל](https://ethioemb.org.il/ethiopian-spices-shops/); [דורו ואט מסורתי — מכון אסיף](https://asif.org/he/recipes/%D7%93%D7%95%D7%A8%D7%95-%D7%95%D7%95%D7%90%D7%98-%D7%9E%D7%A1%D7%95%D7%A8%D7%AA%D7%99-%D7%AA%D7%91%D7%A9%D7%99%D7%9C-%D7%A2%D7%95%D7%A3-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99-%D7%9C%D7%A9%D7%91%D7%AA/).`,
      en: `Berbere is the spice blend most identified with Ethiopian cuisine: its base is dried red peppers, joined — according to each family's tradition — by garlic, ginger, Ethiopian basil (besobela), fenugreek, caraway and more. It is what gives doro wat and kai misir wat their deep red colour and restrained heat.

In Ethiopian culture, preparing berbere was traditionally women's home work that took days: sun-drying the peppers, peeling, grinding and seasoning. Every family's blend has its own taste, and the recipe passes from mother to daughter. In Israel too, many community families still make berbere at home or receive it from relatives — which is part of why Ethiopian spice shops are much more than a point of sale: they are a community crossroads.

If you do not make it at home, ready-made berbere is sold at Ethiopian shops in most community cities, and today also at general spice shops and online. The noticeable difference: berbere from an Ethiopian shop is usually ground fresh, in a traditional composition. See [where to buy Ethiopian groceries in your city](/en/culinary).

A note for the uninitiated: the heat of berbere varies widely between blends. Start small.

**Sources**: [Ethiopian spice and product shops — Embassy of Ethiopia in Israel](https://ethioemb.org.il/ethiopian-spices-shops/); [Traditional doro wat — Asif Institute](https://asif.org/he/recipes/%D7%93%D7%95%D7%A8%D7%95-%D7%95%D7%95%D7%90%D7%98-%D7%9E%D7%A1%D7%95%D7%A8%D7%AA%D7%99-%D7%AA%D7%91%D7%A9%D7%99%D7%9C-%D7%A2%D7%95%D7%A3-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99-%D7%9C%D7%A9%D7%91%D7%AA/).`,
      am: `በርበሬ ከኢትዮጵያ ምግብ ጋር በጣም የተቆራኘው ቅመም ነው፡ መሰረቱ የደረቀ ቀይ በርበሬ ሲሆን፣ እንደየቤተሰቡ ወግ ነጭ ሽንኩርት፣ ዝንጅብል፣ በሶቢላ፣ አብሽ እና ሌሎችም ይጨመራሉ። ለዶሮ ወጥ እና ለቀይ ምስር ወጥ ቀዩን ቀለም የሚሰጠው እሱ ነው።

በርበሬ ማዘጋጀት በባህል የቀናት የቤት ስራ ነበር፡ በፀሐይ ማድረቅ፣ መፍጨት፣ መቀመም። የእያንዳንዱ ቤተሰብ ድብልቅ የራሱ ጣዕም አለው፣ አዘገጃጀቱ ከእናት ወደ ልጅ ይተላለፋል። በእስራኤልም ብዙ ቤተሰቦች በቤት ይሰራሉ — የኢትዮጵያ ቅመም ሱቆች ከመሸጫ በላይ የማህበረሰብ መገናኛ የሆኑበት ምክንያት ይህ ነው።

ዝግጁ በርበሬ በአብዛኛዎቹ የማህበረሰብ ከተሞች የኢትዮጵያ ሱቆች ይሸጣል። [በከተማዎ የኢትዮጵያ ምግብ የት እንደሚገዛ](/am/culinary) ይመልከቱ።`,
    },
    lastReviewed: "2026-08-30",
  },

  // ── 3. Dabo ────────────────────────────────────────────────────────────────
  {
    slug: "dabo",
    title: {
      he: "דאבו — לחם החג והשבת",
      en: "Dabo — the bread of Shabbat and holidays",
      am: "ዳቦ — የሰንበትና የበዓል ዳቦ",
    },
    summary: {
      he: "הלחם העגול והמתקתק של ביתא ישראל: ברכה, שבת, וסעודות חג — כולל שבירת צום הסיגד.",
      en: "The round, slightly sweet bread of Beta Israel: blessing, Shabbat, and holiday meals — including breaking the Sigd fast.",
      am: "የቤተ እስራኤል ክብ ዳቦ፡ በረከት፣ ሰንበት እና የበዓል ምግቦች።",
    },
    kind: "staple",
    body: {
      he: `הדאבו הוא לחם שמרים עגול, דחוס ומעט מתקתק, אפוי בדרך כלל בסיר עמוק או עטוף בעלים בשיטה המסורתית. במטבח האתיופי הכללי הוא לחם של אירועים — אבל בקהילת ביתא ישראל יש לו מעמד מיוחד: זהו לחם השבת והחג.

בכפרים באתיופיה נאפה הדאבו לקראת שבת, כשהמלאכה נעשית מבעוד יום — בהתאם לשמירת השבת הקפדנית של הקהילה. בפתיחת סעודת השבת היה ראש המשפחה או הקייס בוצע את הלחם ומברך, והפרוסות מחולקות לכל המסובים לפי סדר של כבוד — מהמבוגרים לצעירים. רבים בקהילה מזהים את הדאבו עם רגע הברכה המשפחתי הזה, מקבילה חיה של לחם המשנה.

גם בחגי הקהילה הדאבו נוכח: בסעודות שבירת צום הסיגד הוא מוגש לצד אינג'רה ותבשילים — ראו [תפריט הסיגד ומשמעות הצום](/he/culinary/sigd-menu) — ובאירועים משמחים כמו בריתות וחתונות הוא נאפה בגרסאות חגיגיות ומועשרות.

בישראל אפשר למצוא דאבו טרי בחנויות ומאפיות אתיופיות בערי הקהילה, בעיקר לקראת סוף השבוע. מי שרוצה לטעום את הגרסה המסורתית ביותר — יחפש דאבו אפוי בעלי בננה או אנסט (בננה שוטית).

**מקורות**: על שמירת השבת של ביתא ישראל — [ביתא ישראל — עמוד המורשת](/he/heritage/events/beta-israel); [מוזיאון העם היהודי (אנו) — על מסורות יהדות אתיופיה](https://www.anumuseum.org.il/).`,
      en: `Dabo is a round, dense, slightly sweet yeast bread, usually baked in a deep pot or wrapped in leaves in the traditional method. In general Ethiopian cuisine it is an occasion bread — but in the Beta Israel community it holds special status: it is the bread of Shabbat and holidays.

In the villages of Ethiopia, dabo was baked ahead of Shabbat, with the work finished before sundown — in keeping with the community's strict Shabbat observance. At the opening of the Shabbat meal, the head of the family or the kes would break the bread and bless it, and slices were distributed to everyone at the table in order of honour — from elders to the young. Many in the community identify dabo with that moment of family blessing, a living parallel of the Shabbat loaves.

Dabo is present at community holidays too: at meals breaking the Sigd fast it is served alongside injera and stews — see [the Sigd menu and the meaning of the fast](/en/culinary/sigd-menu) — and at celebrations such as britot and weddings it is baked in festive, enriched versions.

In Israel you can find fresh dabo at Ethiopian shops and bakeries in community cities, especially towards the weekend. For the most traditional version, look for dabo baked in banana or enset leaves.

**Sources**: on Beta Israel Shabbat observance — [Beta Israel — heritage page](/en/heritage/events/beta-israel); [ANU — Museum of the Jewish People, on Ethiopian Jewish traditions](https://www.anumuseum.org.il/).`,
      am: `ዳቦ ክብ፣ ጥቅጥቅ ያለ እና ትንሽ ጣፋጭ የእርሾ ዳቦ ነው። በአጠቃላይ የኢትዮጵያ ምግብ የበዓል ዳቦ ነው — በቤተ እስራኤል ማህበረሰብ ግን ልዩ ደረጃ አለው፡ የሰንበትና የበዓል ዳቦ ነው።

በኢትዮጵያ መንደሮች ዳቦ ለሰንበት አስቀድሞ ይጋገር ነበር — የማህበረሰቡን ጥብቅ የሰንበት አጠባበቅ በመከተል። በሰንበት ምግብ መክፈቻ የቤተሰቡ አለቃ ወይም ቄሱ ዳቦውን ቆርሶ ይባርክ ነበር፣ ቁርጥራጮቹም በክብር ቅደም ተከተል ይከፋፈሉ ነበር።

በሰግድ ጾም መስበሪያ ምግቦችም ዳቦ ከእንጀራና ከወጦች ጎን ይቀርባል — [የሰግድ ምግብና የጾሙ ትርጉም](/am/culinary/sigd-menu) ይመልከቱ።

በእስራኤል ትኩስ ዳቦ በማህበረሰብ ከተሞች የኢትዮጵያ ሱቆችና ዳቦ ቤቶች ይገኛል፣ በተለይ ወደ ሳምንቱ መጨረሻ።`,
    },
    lastReviewed: "2026-08-30",
  },

  // ── 4. Buna ceremony ───────────────────────────────────────────────────────
  {
    slug: "buna",
    title: {
      he: "טקס הבּוּנָה — קפה כטקס חברתי",
      en: "The buna ceremony — coffee as a social ritual",
      am: "የቡና ስነ-ስርዓት",
    },
    summary: {
      he: "שלושה סיבובים, קלייה בבית, וקטורת: טקס הקפה האתיופי כמוסד חברתי — וגם בישראל.",
      en: "Three rounds, home roasting, and incense: the Ethiopian coffee ceremony as a social institution — in Israel too.",
      am: "ሶስት ዙር፣ በቤት መቁላት እና እጣን፡ የቡና ስነ-ስርዓት እንደ ማህበራዊ ተቋም።",
    },
    kind: "staple",
    body: {
      he: `אתיופיה היא ערש הקפה, וטקס הבונה (בּוּנָה = קפה באמהרית) הוא אחד המוסדות החברתיים החשובים בתרבות האתיופית. זה איננו "לשתות קפה" — זה אירוח במלוא מובן המילה, שנמשך שעה ויותר: פולי הקפה הירוקים נקלים במחבת על אש גלויה מול האורחים, נטחנים במכתש, ומבושלים בג'בנה — קנקן החרס המסורתי עם הצוואר הצר.

הקפה מוגש בשלושה סיבובים, ולכל אחד שם ומשמעות: **אַבּוֹל** (הסיבוב הראשון, החזק ביותר), **טוֹנָה** (השני) ו**בַּרַקָה** (השלישי — "ברכה"). לסיים את שלושת הסיבובים זו דרך לכבד את המארחת; לקום אחרי הראשון נחשב לא מנומס. לצד הקפה מוגשים בדרך כלל פופקורן, בטטה או דאבו, ולעיתים מוקטרת לבונה — מנהג שמזכיר עד כמה הטקס קרוב במקורו לעולם של תפילה וברכה.

בבתים רבים של יוצאי אתיופיה בישראל, טקס הבונה נשמר בעיקר בסופי שבוע, באבלות ובשמחות — הוא המסגרת שבה מתחלקות חדשות המשפחה, נפתרים סכסוכים ומתקבלים אורחים. עבור הדור השני, הטקס הפך לאחד מסמלי הזהות הנגישים ביותר: לא צריך לדעת אמהרית כדי לשבת סביב הג'בנה.

את הציוד — ג'בנה, ספלי סיני (פינג'ן), מחבת קלייה — ופולי קפה ירוקים אפשר לקנות בחנויות אתיופיות בערי הקהילה. ראו [איפה קונים מצרכים אתיופיים](/he/culinary).

**מקורות**: על מקום הטקס בחיי הקהילה — [המרכז למורשת יהדות אתיופיה](https://www.ethiopianjewry.org.il/); על אבלות וטקסי משפחה — [מדריך האבלות של Tedros](/he/family/mourning).`,
      en: `Ethiopia is the birthplace of coffee, and the buna ceremony (buna = coffee in Amharic) is one of the most important social institutions of Ethiopian culture. It is not "having a coffee" — it is hospitality in the fullest sense, lasting an hour or more: green coffee beans are roasted in a pan over open flame in front of the guests, ground in a mortar, and brewed in a jebena — the traditional narrow-necked clay pot.

The coffee is served in three rounds, each with a name and a meaning: **abol** (the first and strongest), **tona** (the second) and **baraka** (the third — "blessing"). Staying for all three rounds honours the host; leaving after the first is considered impolite. Alongside the coffee, popcorn, sweet potato or dabo are usually served, and sometimes frankincense is burned — a custom that recalls how close the ceremony is, in origin, to the world of prayer and blessing.

In many Ethiopian-Israeli homes, the buna ceremony is kept mainly on weekends, in mourning and in celebration — it is the setting where family news is shared, disputes are settled and guests are received. For the second generation, the ceremony has become one of the most accessible symbols of identity: you do not need Amharic to sit around the jebena.

The equipment — jebena, small cups (finjan), roasting pan — and green coffee beans can be bought at Ethiopian shops in community cities. See [where to buy Ethiopian groceries](/en/culinary).

**Sources**: on the ceremony's place in community life — [The Centre for Ethiopian Jewish Heritage](https://www.ethiopianjewry.org.il/); on mourning and family rituals — [Tedros mourning guide](/en/family/mourning).`,
      am: `ኢትዮጵያ የቡና መገኛ ናት፣ የቡና ስነ-ስርዓቱም የኢትዮጵያ ባህል ዋና ማህበራዊ ተቋም ነው። ይህ "ቡና መጠጣት" ብቻ አይደለም — ሙሉ እንግዳ ተቀባይነት ነው፡ አረንጓዴ ቡና በእሳት ላይ በእንግዶቹ ፊት ይቆላል፣ በሙቀጫ ይፈጫል፣ በጀበና ይፈላል።

ቡናው በሶስት ዙር ይቀርባል፡ **አቦል**፣ **ቶና** እና **በረካ**። ሶስቱን ዙር መጨረስ ለአስተናጋጇ ክብር ነው። ከቡናው ጎን ፈንዲሻ ወይም ዳቦ ይቀርባል፣ አንዳንዴም እጣን ይታጠናል።

በእስራኤል ባሉ ብዙ ቤቶች የቡና ስነ-ስርዓቱ በሳምንት መጨረሻ፣ በሀዘንና በደስታ ይጠበቃል — የቤተሰብ ዜና የሚካፈልበት፣ እንግዶች የሚስተናገዱበት ማዕቀፍ ነው። ለሁለተኛው ትውልድ በጣም ተደራሽ የማንነት ምልክት ሆኗል።

ጀበና፣ ስኒዎችና አረንጓዴ ቡና በማህበረሰብ ከተሞች የኢትዮጵያ ሱቆች ይገዛሉ። [የኢትዮጵያ ምግብ የት እንደሚገዛ](/am/culinary) ይመልከቱ።`,
    },
    lastReviewed: "2026-08-30",
  },

  // ── 5. Teff / gluten-free (health angle) ───────────────────────────────────
  {
    slug: "teff-gluten-free",
    title: {
      he: "טף ורגישות לגלוטן — מה חשוב לדעת",
      en: "Teff and gluten sensitivity — what to know",
      am: "ጤፍ እና ግሉተን — ማወቅ ያለብዎት",
    },
    summary: {
      he: "טף הוא דגן ללא גלוטן באופן טבעי — אבל לא כל אינג'רה בישראל היא 100% טף. מדריך לצרכן.",
      en: "Teff is naturally gluten-free — but not every injera in Israel is 100% teff. A consumer's guide.",
      am: "ጤፍ በተፈጥሮ ግሉተን የለውም — ግን በእስራኤል ያለው እንጀራ ሁሉ 100% ጤፍ አይደለም።",
    },
    kind: "health",
    body: {
      he: `הטף — הדגן הזעיר שממנו נטחן קמח האינג'רה — הוא דגן שאינו מכיל גלוטן באופן טבעי, ולכן הוא מושך עניין גובר גם מחוץ לקהילה: בקרב חולי צליאק, רגישים לגלוטן, ומי שמחפש דגנים מלאים עשירים בסיבים, ברזל וסידן.

אבל כאן נדרשת זהירות צרכנית, במיוחד למי שהגלוטן מסוכן לו באמת:

- **לא כל אינג'רה היא 100% טף.** קמח טף יקר, ולכן חלק מהאינג'רה הנמכרת בישראל (וגם באתיופיה) מוכנת מתערובת של טף עם קמח חיטה, שיפון או שעורה — שכולם מכילים גלוטן. חולה צליאק חייב לשאול ממה הוכנה האינג'רה, ולא להסתפק ב"זו אינג'רה".
- **גם קמח טף נקי עלול להיטחן בטחנה שמעבדת חיטה.** מי שרגיש ברמה של צליאק צריך לחפש מוצר עם סימון "ללא גלוטן" מפוקח, או יצרן שמצהיר על קו ייצור נפרד.
- **לרוב האוכלוסייה, שילוב של טף בתפריט הוא יתרון תזונתי** — במיוחד כתחליף ללחם לבן, כפי שמפורט ב[עמוד התזונה של מרכז הבריאות](/he/health/nutrition).

בישראל נמכר קמח טף בחנויות אתיופיות בערי הקהילה, ובשנים האחרונות גם מגדלים טף בארץ ומוצרי טף מגיעים לרשתות הטבע. מחפשים חנות? [רשימת נקודות המכירה לפי עיר](/he/culinary).

חשוב: המידע כאן הוא כללי ואינו תחליף לייעוץ רפואי. חולי צליאק — התייעצו עם דיאטנית קלינית לפני שינוי תפריט.

**מקורות**: [עמותת צליאק ישראל](https://celiac.org.il/); [המדריך המלא לאינג'רה — thebaker.science](https://thebaker.science/%D7%90%D7%99%D7%A0%D7%92%D7%A8%D7%94-%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%A9%D7%9C%D7%90-%D7%AA%D7%A8%D7%A6%D7%95-%D7%9C%D7%A4%D7%A1%D7%A4%D7%A1/).`,
      en: `Teff — the tiny grain ground into injera flour — is naturally gluten-free, which is why it draws growing interest beyond the community: among celiac patients, the gluten-sensitive, and anyone looking for whole grains rich in fibre, iron and calcium.

But consumer caution is required, especially for those to whom gluten is genuinely dangerous:

- **Not every injera is 100% teff.** Teff flour is expensive, so some injera sold in Israel (and in Ethiopia) is made from teff mixed with wheat, rye or barley flour — all of which contain gluten. A celiac patient must ask what the injera was made from, and never settle for "it's injera".
- **Even pure teff flour may be milled in a facility that processes wheat.** Anyone with celiac-level sensitivity should look for a supervised "gluten-free" label, or a producer declaring a separate production line.
- **For most people, adding teff to the diet is a nutritional win** — especially as a substitute for white bread, as detailed on the [Health Hub nutrition page](/en/health/nutrition).

In Israel, teff flour is sold at Ethiopian shops in community cities; in recent years teff is also grown locally and teff products reach health-food chains. Looking for a shop? [Points of sale by city](/en/culinary).

Important: this information is general and is not a substitute for medical advice. Celiac patients — consult a clinical dietitian before changing your diet.

**Sources**: [Celiac Association of Israel](https://celiac.org.il/); [The complete injera guide — thebaker.science](https://thebaker.science/%D7%90%D7%99%D7%A0%D7%92%D7%A8%D7%94-%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%A9%D7%9C%D7%90-%D7%AA%D7%A8%D7%A6%D7%95-%D7%9C%D7%A4%D7%A1%D7%A4%D7%A1/).`,
      am: `ጤፍ — እንጀራ የሚሰራበት ትንሹ እህል — በተፈጥሮ ግሉተን የለውም። ስለዚህ ለሴልያክ ህመምተኞችና ግሉተን ለሚነካቸው ሰዎች ትኩረት ስቧል።

ግን ጥንቃቄ ያስፈልጋል፡

- **እንጀራ ሁሉ 100% ጤፍ አይደለም።** የጤፍ ዱቄት ውድ ስለሆነ በእስራኤል የሚሸጠው አንዳንድ እንጀራ ከስንዴ ወይም ከገብስ ዱቄት ጋር ተቀላቅሎ ይሰራል — እነዚህ ግሉተን አላቸው። የሴልያክ ህመምተኛ እንጀራው ከምን እንደተሰራ መጠየቅ አለበት።
- **ንጹህ የጤፍ ዱቄትም ስንዴ በሚፈጭበት ወፍጮ ተፈጭቶ ሊሆን ይችላል።** "ግሉተን-ነጻ" ምልክት ያለው ምርት ይፈልጉ።
- **ለአብዛኛው ሰው ጤፍ የተመጣጠነ ምግብ ጥቅም ነው** — [የጤና ማዕከሉ የምግብ ገጽ](/am/health/nutrition) ይመልከቱ።

ይህ መረጃ አጠቃላይ ነው፣ የህክምና ምክር ምትክ አይደለም። የሴልያክ ህመምተኞች — ምግብ ከመቀየር በፊት ዲዬቲሺያን ያማክሩ።`,
    },
    lastReviewed: "2026-08-30",
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findStaple(slug: string): CulinaryStapleEntry | undefined {
  return CULINARY_STAPLES.find((s) => s.slug === slug);
}

export function stapleTitle(entry: CulinaryStapleEntry, locale: Locale): string {
  return entry.title[locale] ?? entry.title[DEFAULT_LOCALE] ?? entry.title.he;
}

export function stapleSummary(entry: CulinaryStapleEntry, locale: Locale): string {
  return entry.summary[locale] ?? entry.summary[DEFAULT_LOCALE] ?? entry.summary.he;
}

export function stapleBody(entry: CulinaryStapleEntry, locale: Locale): string {
  return entry.body[locale] ?? entry.body[DEFAULT_LOCALE];
}
