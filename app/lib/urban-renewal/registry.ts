// Urban-renewal neighborhood registry — T3 template (TED-93 / ADR-016).
// Pure module: no DB, safe to import from loaders, actions, or tests —
// same pattern as `app/lib/cities/registry.ts` (T1). See ADR-016 §D2 for
// why this content does NOT live in `app/lib/db/seeds/neighborhoods.ts`
// (that file seeds the `neighborhoods` DB table used as a listings FK
// target and uses short, per-city slugs; this registry uses the globally
// unique `<neighborhood>-<city>` slug the T3 route is addressed by).
//
// EN/AM strings below are machine-draft translations pending native
// review (repo convention — see CLAUDE.md "Languages"). Hebrew is the
// authored/sourced original; do not treat EN/AM as independently sourced.
//
// All facts are sourced — see `sources` per entry. Do not add a
// neighborhood here without a verifiable name and at least one source.

import type { Locale } from "~/lib/i18n/config";

export type LocalizedText = { he: string; en: string; am: string };

export type UrbanRenewalUnits = {
  /** Existing units slated for demolition/replacement, if known. */
  before?: number;
  /** Planned/new units once the project completes, if known. */
  after?: number;
  /** Free-text qualifier when exact before/after counts aren't public. */
  note?: LocalizedText;
};

export type UrbanRenewalNeighborhood = {
  /** Route slug — `<neighborhood>-<city>`, globally unique. */
  slug: string;
  /** City this neighborhood belongs to — references `~/lib/cities/registry`. */
  citySlug: string;
  name: LocalizedText;
  /** Project status: what stage it's at, who's driving it. */
  status: LocalizedText;
  /** Developer / municipal authority / administration name. */
  authority: LocalizedText;
  units: UrbanRenewalUnits;
  /** Why this matters to the Ethiopian-Israeli community specifically. */
  communityContext: LocalizedText;
  /** `rights` seed slug to link to for the legal-aid / tenant-rights CTA. */
  rightSlug: string;
  /** Source URLs / search pointers the facts above were drawn from. */
  sources: string[];
};

export const URBAN_RENEWAL_NEIGHBORHOODS: UrbanRenewalNeighborhood[] = [
  // ── 5 existing priority neighborhoods (Phase 3 seed) ──────────────────────
  {
    slug: "kiryat-moshe-rehovot",
    citySlug: "rehovot",
    name: { he: "קרית משה", en: "Kiryat Moshe", am: "ቅርያት ሞሼ" },
    status: {
      he: 'קריית משה היא חלק מתמ"ל 1086, תוכנית מתאר ארצית שאושרה להריסת כ-1,300 יחידות דיור קיימות ובנייתן מחדש כ-4,500 יחידות דיור באזור אחד ועוד 4,200 יחידות דיור באזור נוסף (סה"כ יותר מ-8,700 יחידות דיור חדשות). רשות מקרקעי ישראל פרסמה מכרז לביצוע בדצמבר 2023 (מכרז רמ"י 12/2023).',
      en: "Kiryat Moshe is covered by TAMA 1086, a national outline plan approved to demolish roughly 1,300 existing housing units and rebuild them as approximately 4,500 units in one zone plus a further 4,200 units in another (8,700+ new units in total). The Israel Land Authority published a construction tender in December 2023 (RMI tender 12/2023).",
      am: 'ቅርያት ሞሼ በብሔራዊ ዕቅድ ትማ"ል 1086 ስር ትገኛለች — ወደ 1,300 ነባር ቤቶችን በማፍረስ በአንድ ዞን 4,500 እና በሌላ ዞን 4,200 (በድምሩ ከ8,700 በላይ) አዲስ ቤቶች ለመገንባት የፀደቀ ዕቅድ። የእስራኤል መሬት ባለስልጣን በታኅሣሥ 2023 ጨረታ አውጥቷል።',
    },
    authority: {
      he: 'תמ"ל 1086 — תוכנית מתאר ארצית לדיור, בביצוע רשות מקרקעי ישראל (רמ"י).',
      en: "TAMA 1086 — a national housing outline plan, executed by the Israel Land Authority (Rashut Mekarke'ei Yisrael).",
      am: 'ትማ"ል 1086 — ብሔራዊ የቤት ዕቅድ፣ በእስራኤል መሬት ባለስልጣን የሚተገበር።',
    },
    units: { before: 1300, after: 8700 },
    communityContext: {
      he: "קריית משה היא אחת מ-5 השכונות שסומנו בעדיפות עליונה לקהילת יוצאי אתיופיה, עם מינהלת התחדשות עירונית ייעודית שהוקמה עם מנדט גישור-תרבותי מפורש. רוב הדיירים בשכונה הם מהקהילה, ועקרון מנחה בתוכנית הוא חזרת הדיירים לאותה שכונה לאחר הבנייה.",
      en: "Kiryat Moshe is one of 5 neighborhoods flagged as top-priority for the Ethiopian-Israeli community, with a dedicated urban-renewal administration set up with an explicit cultural-bridge mandate. Most of the neighborhood's residents are from the community, and a guiding principle of the plan is that residents return to the same neighborhood after construction.",
      am: "ቅርያት ሞሼ ለኢትዮጵያ-እስራኤላዊ ማህበረሰብ ቅድሚያ ከተሰጣቸው 5 ሰፈሮች አንዷ ስትሆን፣ ግልጽ የባህል-ድልድይ ተልእኮ ያለው ልዩ የከተማ ዕድሳት አስተዳደር ተቋቁሟል። አብዛኞቹ የሰፈሩ ነዋሪዎች ከማህበረሰቡ ናቸው።",
    },
    rightSlug: "urban-renewal-kiryat-moshe",
    sources: ["https://nadlancenter.co.il/article/10590"],
  },
  {
    slug: "ramat-eliyahu-rishon-lezion",
    citySlug: "rishon-lezion",
    name: { he: "רמת אליהו", en: "Ramat Eliyahu", am: "ራማት ኤልያሁ" },
    status: {
      he: 'שכונת רמת אליהו, שנבנתה במקור כשכונת קליטה, נמצאת בתהליכי התחדשות עירונית שיגדילו את מספר יחידות הדיור מכ-2,600 הקיימות לכ-7,200 יחידות דיור חדשות. בעיריית ראשון לציון פועלת מנהלת התחדשות עירונית ייעודית לשכונה, ולצד הפרויקטים העירוניים פעיל בשכונה גם יזם פרטי — "ניו הופ" — האחראי לכ-20% מהבניינים המתוכננים.',
      en: 'Ramat Eliyahu, originally built as an absorption neighborhood, is undergoing urban renewal that will grow the housing stock from roughly 2,600 existing units to about 7,200 new units. Rishon LeZion municipality runs a dedicated urban-renewal administration for the neighborhood, and alongside the municipal projects a private developer — "New Hope" — is responsible for about 20% of the planned buildings.',
      am: 'በመጀመሪያ እንደ ማዋሃጃ ሰፈር የተገነባችው ራማት ኤልያሁ፣ ከ2,600 ነባር ቤቶች ወደ 7,200 አዲስ ቤቶች የሚያሳድግ የከተማ ዕድሳት እያካሄደች ነው። የራሾን ለጽዮን ማዘጋጃ ቤት ልዩ የከተማ ዕድሳት አስተዳደር ለሰፈሩ አቋቁሟል፣ ከዚያም ጎን ለጎን የግል አልሚ "ኒው ሆፕ" ወደ 20% የሚደርሱ ህንፃዎችን ይቆጣጠራል።',
    },
    authority: {
      he: 'מנהלת התחדשות עירונית של עיריית ראשון לציון, בשיתוף יזם פרטי "ניו הופ" (~20% מהבניינים).',
      en: 'Rishon LeZion municipal urban-renewal administration, alongside a private developer "New Hope" (~20% of buildings).',
      am: 'የራሾን ለጽዮን ማዘጋጃ ቤት የከተማ ዕድሳት አስተዳደር፣ ከግል አልሚ "ኒው ሆፕ" ጋር (~20% ህንፃዎች)።',
    },
    units: { before: 2600, after: 7200 },
    communityContext: {
      he: "רמת אליהו היא שכונה עם ריכוז היסטורי גדול של יוצאי אתיופיה בראשון לציון, ואחת מ-5 השכונות המסומנות בעדיפות עליונה לקהילה בתוכניות ההתחדשות העירונית. השכונה נמצאת בלב מהלכי ההתחדשות, לצד נוכחות גוברת של בני הדור השני בעיר.",
      en: "Ramat Eliyahu is a neighborhood with a large historical concentration of Israeli-Ethiopians in Rishon LeZion, and one of the 5 neighborhoods flagged as top-priority for the community in urban-renewal plans. The neighborhood is at the heart of the renewal effort, alongside a growing second-generation presence across the city.",
      am: "ራማት ኤልያሁ በራሾን ለጽዮን ውስጥ ትልቅ ታሪካዊ የኢትዮጵያ-እስራኤላውያን ክምችት ያላት ሰፈር ስትሆን፣ ለማህበረሰቡ ቅድሚያ ከተሰጣቸው 5 ሰፈሮች አንዷ ናት።",
    },
    rightSlug: "urban-renewal-ramat-eliyahu",
    sources: [
      "https://urbanologia.tau.ac.il/urban-renewal-ramat-eliyahu",
      "https://www.newhope.co.il/ramat-eliau",
    ],
  },
  {
    slug: "dora-netanya",
    citySlug: "netanya",
    name: { he: "דורה", en: "Dora", am: "ዶራ" },
    status: {
      he: "דורה היא אחת משתי השכונות המרכזיות (יחד עם נאות שקד) שבהן מרוכזים פרויקטי ההתחדשות העירונית העירוניים בנתניה עבור הקהילה — אשכול הכולל כ-464 משפחות, המהוות מעל מחצית מכלל הדירות המחודשות בעיר עבור הקהילה.",
      en: "Dora is one of two central neighborhoods (alongside Neot Shaked) where Netanya's community-focused urban-renewal projects are concentrated — a cluster covering roughly 464 families, accounting for more than half of all renewed apartments for the community citywide.",
      am: "ዶራ ከኔኦት ሻቄድ ጋር በኔታንያ ውስጥ ለማህበረሰቡ ያተኮሩ የከተማ ዕድሳት ፕሮጀክቶች ከሚካሄዱባቸው ሁለት ዋና ሰፈሮች አንዷ ናት — ወደ 464 ቤተሰቦችን የያዘ ስብስብ፣ ከከተማዋ ለማህበረሰቡ ከታደሱ ቤቶች ግማሽ በላይ የሚሸፍን።",
    },
    authority: {
      he: "עיריית נתניה ומינהלת ההתחדשות העירונית המקומית.",
      en: "Netanya municipality and the local urban-renewal administration.",
      am: "የኔታንያ ማዘጋጃ ቤት እና የአካባቢ የከተማ ዕድሳት አስተዳደር።",
    },
    units: {
      note: {
        he: "כ-464 משפחות באשכול המשותף לדורה ולנאות שקד (מספר יחידות דיור מדויק לשכונה בנפרד לא פורסם).",
        en: "Roughly 464 families across the shared Dora + Neot Shaked cluster (an exact per-neighbourhood unit count has not been published).",
        am: "ወደ 464 ቤተሰቦች በዶራ እና ኔኦት ሻቄድ የጋራ ስብስብ ውስጥ።",
      },
    },
    communityContext: {
      he: "דורה, לצד נאות שקד וקריית נורדאו, היא אחת מהשכונות המרכזיות שבהן מתגוררת קהילת יוצאי אתיופיה בנתניה — העיר עם אחד הריכוזים הגדולים בישראל של הקהילה.",
      en: "Dora, alongside Neot Shaked and Kiryat Nordau, is one of the central neighborhoods where the Israeli-Ethiopian community lives in Netanya — a city with one of Israel's largest concentrations of the community.",
      am: "ዶራ ከኔኦት ሻቄድ እና ከቂርያት ኖርዳው ጋር በኔታንያ ውስጥ የኢትዮጵያ-እስራኤላውያን ማህበረሰብ ከሚኖርባቸው ዋና ሰፈሮች አንዷ ናት።",
    },
    rightSlug: "urban-renewal-netanya",
    sources: ["https://nadlancenter.co.il/article/5278"],
  },
  {
    slug: "neot-shaked-netanya",
    citySlug: "netanya",
    name: { he: "נאות שקד", en: "Neot Shaked", am: "ኔኦት ሻቄድ" },
    status: {
      he: "נאות שקד היא אחת משתי השכונות המרכזיות (יחד עם דורה) שבהן מרוכזים פרויקטי ההתחדשות העירונית בנתניה עבור הקהילה — אשכול הכולל כ-464 משפחות, המהוות מעל מחצית מכלל הדירות המחודשות בעיר עבור הקהילה.",
      en: "Neot Shaked is one of two central neighborhoods (alongside Dora) where Netanya's community-focused urban-renewal projects are concentrated — a cluster covering roughly 464 families, accounting for more than half of all renewed apartments for the community citywide.",
      am: "ኔኦት ሻቄድ ከዶራ ጋር በኔታንያ ውስጥ ለማህበረሰቡ ያተኮሩ የከተማ ዕድሳት ፕሮጀክቶች ከሚካሄዱባቸው ሁለት ዋና ሰፈሮች አንዷ ናት።",
    },
    authority: {
      he: "עיריית נתניה ומינהלת ההתחדשות העירונית המקומית.",
      en: "Netanya municipality and the local urban-renewal administration.",
      am: "የኔታንያ ማዘጋጃ ቤት እና የአካባቢ የከተማ ዕድሳት አስተዳደር።",
    },
    units: {
      note: {
        he: "כ-464 משפחות באשכול המשותף לדורה ולנאות שקד (מספר יחידות דיור מדויק לשכונה בנפרד לא פורסם).",
        en: "Roughly 464 families across the shared Dora + Neot Shaked cluster (an exact per-neighbourhood unit count has not been published).",
        am: "ወደ 464 ቤተሰቦች በዶራ እና ኔኦት ሻቄድ የጋራ ስብስብ ውስጥ።",
      },
    },
    communityContext: {
      he: "נאות שקד, לצד דורה וקריית נורדאו, היא אחת מהשכונות המרכזיות שבהן מתגוררת קהילת יוצאי אתיופיה בנתניה.",
      en: "Neot Shaked, alongside Dora and Kiryat Nordau, is one of the central neighborhoods where the Israeli-Ethiopian community lives in Netanya.",
      am: "ኔኦት ሻቄድ ከዶራ እና ከቂርያት ኖርዳው ጋር በኔታንያ ውስጥ የኢትዮጵያ-እስራኤላውያን ማህበረሰብ ከሚኖርባቸው ዋና ሰፈሮች አንዷ ናት።",
    },
    rightSlug: "urban-renewal-netanya",
    sources: ["https://nadlancenter.co.il/article/5278"],
  },
  {
    slug: "kiryat-nordau-netanya",
    citySlug: "netanya",
    name: { he: "קריית נורדאו", en: "Kiryat Nordau", am: "ቂርያት ኖርዳው" },
    status: {
      he: "קריית נורדאו נמצאת בתוך אותה מגמה רחבה יותר של התחדשות עירונית בנתניה, לצד דורה ונאות שקד — אם כי ריכוז הפרויקטים המתועד בפירוט (אשכול 464 המשפחות) מתייחס בעיקר לדורה ולנאות שקד.",
      en: "Kiryat Nordau is part of the same broader urban-renewal trend in Netanya, alongside Dora and Neot Shaked — though the specifically documented project cluster (the 464-family figure) refers primarily to Dora and Neot Shaked.",
      am: "ቂርያት ኖርዳው ከዶራ እና ኔኦት ሻቄድ ጋር በኔታንያ ውስጥ ካለው ሰፊ የከተማ ዕድሳት አዝማሚያ ውስጥ ትገኛለች።",
    },
    authority: {
      he: "עיריית נתניה ומינהלת ההתחדשות העירונית המקומית.",
      en: "Netanya municipality and the local urban-renewal administration.",
      am: "የኔታንያ ማዘጋጃ ቤት እና የአካባቢ የከተማ ዕድሳት አስተዳደር።",
    },
    units: {
      note: {
        he: "מספרי יחידות דיור ספציפיים לקריית נורדאו לא פורסמו בנפרד ממגמת ההתחדשות הרחבה בעיר.",
        en: "Unit numbers specific to Kiryat Nordau have not been published separately from the city's broader renewal trend.",
        am: "ለቂርያት ኖርዳው ብቻ የተለዩ የቤት ቁጥሮች በተናጠል አልታተሙም።",
      },
    },
    communityContext: {
      he: "קריית נורדאו, לצד דורה ונאות שקד, היא אחת מהשכונות המרכזיות שבהן מתגוררת קהילת יוצאי אתיופיה בנתניה.",
      en: "Kiryat Nordau, alongside Dora and Neot Shaked, is one of the central neighborhoods where the Israeli-Ethiopian community lives in Netanya.",
      am: "ቂርያት ኖርዳው ከዶራ እና ከኔኦት ሻቄድ ጋር በኔታንያ ውስጥ የኢትዮጵያ-እስራኤላውያን ማህበረሰብ ከሚኖርባቸው ዋና ሰፈሮች አንዷ ናት።",
    },
    rightSlug: "urban-renewal-netanya",
    sources: ["https://nadlancenter.co.il/article/5278"],
  },

  // ── 9 new neighborhoods (TED-93) ───────────────────────────────────────────
  {
    slug: "sela-netanya",
    citySlug: "netanya",
    name: { he: "שכונת סלע", en: "Sela", am: "ሴላ" },
    status: {
      he: "הפרויקט הראשון של פינוי-בינוי בשכונת סלע אושר בפועל ונמצא בביצוע: הריסה ובנייה מחדש של 8 בניינים (116 יחידות דיור), כחלק מתוכנית רחבה יותר לשכונה שמדברת על כ-1,000 דירות חדשות בסך הכול.",
      en: "The first pinui-binui (demolish-rebuild) project in the Sela neighborhood has been formally approved and is in progress: demolition and rebuilding of 8 buildings (116 housing units), as part of a broader neighborhood plan totaling roughly 1,000 new apartments.",
      am: "በሴላ ሰፈር የመጀመሪያው የፒኑይ-ቢኑይ (አፍርሶ-መልሶ-ግንባታ) ፕሮጀክት በይፋ ጸድቆ በሂደት ላይ ነው፦ 8 ህንፃዎችን (116 ቤቶች) ማፍረስና እንደገና መገንባት፣ ወደ 1,000 አዲስ ቤቶች ከሚደርስ ሰፊ የሰፈር ዕቅድ አካል ሆኖ።",
    },
    authority: {
      he: "עיריית נתניה — תוכנית פינוי-בינוי מקומית לשכונת סלע.",
      en: "Netanya municipality — local pinui-binui plan for the Sela neighborhood.",
      am: "የኔታንያ ማዘጋጃ ቤት — ለሴላ ሰፈር የአካባቢ ፒኑይ-ቢኑይ ዕቅድ።",
    },
    units: {
      before: 8 * 1,
      after: 116,
      note: {
        he: '8 בניינים → 116 יח"ד בשלב הראשון; כ-1,000 דירות בתוכנית הכוללת.',
        en: "8 buildings → 116 units in phase one; ~1,000 apartments in the overall plan.",
        am: "8 ህንፃዎች → 116 ቤቶች በመጀመሪያ ደረጃ፤ ~1,000 ቤቶች በጠቅላላ ዕቅድ።",
      },
    },
    communityContext: {
      he: "סלע היא שכונה נוספת בנתניה — עיר עם אחד הריכוזים הגדולים בישראל של קהילת יוצאי אתיופיה — שבה יוצא לפועל פינוי-בינוי, לצד הפרויקטים המוכרים יותר בדורה, נאות שקד וקריית נורדאו.",
      en: "Sela is another Netanya neighborhood — a city with one of Israel's largest concentrations of the Israeli-Ethiopian community — where pinui-binui is moving forward, alongside the better-known projects in Dora, Neot Shaked and Kiryat Nordau.",
      am: "ሴላ ኔታንያ ውስጥ ካሉ ሰፈሮች አንዷ ስትሆን ፒኑይ-ቢኑይ በመካሄድ ላይ ነው፣ ከዶራ፣ ኔኦት ሻቄድ እና ቂርያት ኖርዳው ፕሮጀክቶች ጎን ለጎን።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: [
      'https://www.90fm.co.il (search: "שכונת סלע מתחדשת פרויקט פינוי בינוי נתניה")',
      "https://nadlan.walla.co.il/item/3670192",
    ],
  },
  {
    slug: "rova-hanevim-kiryat-gat",
    citySlug: "kiryat-gat",
    name: { he: "רובע הנביאים", en: "Rova HaNevi'im", am: "ሮቫ ሃነቢኢም" },
    status: {
      he: "רובע הנביאים בקריית גת נכלל בהחלטת ממשלה 2253 (2017), שהקצתה 120 מיליון ₪ ייעודיים לקידום פינוי-בינוי ב-5 שכונות פיילוט ברחבי הארץ — במפורש כחלק מתוכנית לשילוב יוצאי אתיופיה.",
      en: "Rova HaNevi'im in Kiryat Gat was included under Government Decision 2253 (2017), which earmarked 120 million ILS specifically to advance pinui-binui in 5 pilot neighborhoods nationwide — explicitly as part of a plan for integrating Israeli-Ethiopians.",
      am: 'በቂርያት ጋት የሚገኘው ሮቫ ሃነቢኢም በ2017 የመንግስት ውሳኔ 2253 ስር ተካቷል፣ ይህም 120 ሚሊዮን ሺ"ል በሀገር አቀፍ ደረጃ በ5 የሙከራ ሰፈሮች ፒኑይ-ቢኑይ ለማራመድ የተመደበ ሲሆን — በግልጽ ኢትዮጵያ-እስራኤላውያንን ለማዋሃድ ዕቅድ አካል ነው።',
    },
    authority: {
      he: "החלטת ממשלה 2253 (2017) — תקצוב ייעודי, בביצוע משותף עם עיריית קריית גת.",
      en: "Government Decision 2253 (2017) — dedicated budget, implemented jointly with Kiryat Gat municipality.",
      am: "የ2017 የመንግስት ውሳኔ 2253 — ልዩ በጀት፣ ከቂርያት ጋት ማዘጋጃ ቤት ጋር በጋራ የሚተገበር።",
    },
    units: {
      note: {
        he: "מספר יחידות דיור ספציפי לרובע הנביאים לא פורסם; התקציב (120 מיליון ₪) משותף ל-5 שכונות הפיילוט.",
        en: "A specific unit count for Rova HaNevi'im has not been published; the 120M ILS budget is shared across the 5 pilot neighborhoods.",
        am: 'ለሮቫ ሃነቢኢም ብቻ የተለየ የቤት ቁጥር አልታተመም፤ 120 ሚሊዮን ሺ"ል በጀት ለ5ቱ የሙከራ ሰፈሮች የጋራ ነው።',
      },
    },
    communityContext: {
      he: "קריית גת היא אחת הערים בישראל בהן שיעור הקהילה מתוך כלל האוכלוסייה מהגבוהים בארץ (כ-28%). היות רובע הנביאים אחת מ-5 שכונות הפיילוט הארציות שהוקצה להן תקציב ממשלתי ייעודי לקהילה מדגיש את מרכזיות העיר בתוכנית הלאומית.",
      en: "Kiryat Gat is one of Israel's cities with one of the highest shares of the Israeli-Ethiopian community relative to total population (roughly 28%). Rova HaNevi'im being one of the 5 nationwide pilot neighborhoods that received a dedicated government budget for the community underscores the city's centrality to the national plan.",
      am: "ቂርያት ጋት ከጠቅላላ ሕዝብ አንፃር ከፍተኛ ማህበረሰብ ድርሻ (~28%) ካላቸው ከተሞች አንዷ ናት። ሮቫ ሃነቢኢም ለማህበረሰቡ ልዩ የመንግስት በጀት ከተመደበላቸው 5 ሀገር አቀፍ የሙከራ ሰፈሮች አንዷ መሆኗ ለከተማዋ ማዕከላዊነት ያጎላል።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: [
      "calcalist.co.il (local news coverage of Government Decision 2253)",
      "Knesset Research and Information Center (MMM) briefing document",
    ],
  },
  {
    slug: "shvat-israel-kiryat-gat",
    citySlug: "kiryat-gat",
    name: { he: "שכונת שבט ישראל", en: "Shevet Israel", am: "ሸቬት እስራኤል" },
    status: {
      he: "תוכנית פינוי-בינוי לשכונת שבט ישראל בקריית גת אושרה בשנת 2019, ומדובר בפרויקט בהיקף של כ-2,300 יחידות דיור.",
      en: "A pinui-binui plan for the Shevet Israel neighborhood in Kiryat Gat was approved in 2019, at a scale of roughly 2,300 housing units.",
      am: "በቂርያት ጋት ለሸቬት እስራኤል ሰፈር የፒኑይ-ቢኑይ ዕቅድ በ2019 ጸድቋል፣ ወደ 2,300 ቤቶች የሚደርስ ስፋት ያለው ፕሮጀክት ነው።",
    },
    authority: {
      he: "עיריית קריית גת — תוכנית פינוי-בינוי מאושרת (2019).",
      en: "Kiryat Gat municipality — approved pinui-binui plan (2019).",
      am: "የቂርያት ጋት ማዘጋጃ ቤት — የፀደቀ ፒኑይ-ቢኑይ ዕቅድ (2019)።",
    },
    units: { after: 2300 },
    communityContext: {
      he: "קריית גת היא אחת הערים בישראל עם השיעור הגבוה ביותר של יוצאי אתיופיה מתוך כלל האוכלוסייה (כ-28%), והתוכנית לשבט ישראל היא אחת ממספר תוכניות התחדשות עירונית פעילות בעיר המשרתות ישירות את הקהילה.",
      en: "Kiryat Gat is one of Israel's cities with the highest share of Israeli-Ethiopians relative to total population (roughly 28%), and the Shevet Israel plan is one of several active urban-renewal plans in the city directly serving the community.",
      am: "ቂርያት ጋት ከጠቅላላ ሕዝብ አንፃር ከፍተኛ የኢትዮጵያ-እስራኤላውያን ድርሻ (~28%) ካላቸው ከተሞች አንዷ ስትሆን፣ የሸቬት እስራኤል ዕቅድ ለማህበረሰቡ በቀጥታ ከሚያገለግሉ በርካታ ንቁ የከተማ ዕድሳት ዕቅዶች አንዱ ነው።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: ["kg4u.co.il — 2026 Kiryat Gat urban-renewal map"],
  },
  {
    slug: "kibbutz-galuyot-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: "מתחם קיבוץ גלויות", en: "Kibbutz Galuyot", am: "ኪቡትስ ጋሉዮት" },
    status: {
      he: "מתחם קיבוץ גלויות הוא הפרויקט הראשון מסוגו בקריית מלאכי לאחר 24 שנה שבהן לא קודם פינוי-בינוי בעיר. הוא אחד מ-4 מתחמים המקודמים כיום בעיר, שמסתכמים יחד בכ-4,000 יחידות דיור.",
      en: "The Kibbutz Galuyot compound is the first project of its kind in Kiryat Malakhi in 24 years — the city had not advanced a pinui-binui project in all that time. It is one of 4 compounds now being advanced citywide, totaling roughly 4,000 housing units combined.",
      am: "የኪቡትስ ጋሉዮት ማዕከል በቂርያት ማላኪ ውስጥ ላለፉት 24 ዓመታት ከተከናወነው ማንኛውም ፒኑይ-ቢኑይ በኋላ የመጀመሪያው ዓይነት ፕሮጀክት ነው። አሁን በከተማዋ ደረጃ ከሚራመዱ 4 ማዕከሎች አንዱ ሲሆን፣ በጠቅላላ ወደ 4,000 ቤቶች ይደርሳሉ።",
    },
    authority: {
      he: "עיריית קריית מלאכי — אחד מ-4 המתחמים המקודמים בעיר.",
      en: "Kiryat Malakhi municipality — one of 4 compounds being advanced citywide.",
      am: "የቂርያት ማላኪ ማዘጋጃ ቤት — በከተማዋ ደረጃ ከሚራመዱ 4 ማዕከሎች አንዱ።",
    },
    units: {
      note: {
        he: 'כ-4,000 יח"ד בסך הכול על פני 4 המתחמים בעיר (קיבוץ גלויות, משה שרת, חב"ד, הרצל); פילוח מדויק למתחם זה בלבד לא פורסם.',
        en: "~4,000 units total across the city's 4 compounds (Kibbutz Galuyot, Moshe Sharet, Chabad, Herzl); an exact breakdown for this compound alone has not been published.",
        am: "~4,000 ቤቶች በጠቅላላ በከተማዋ 4 ማዕከሎች (ኪቡትስ ጋሉዮት፣ ሞሼ ሻሬት፣ ቻባድ፣ ሄርዝል)፤ ለዚህ ማዕከል ብቻ የተለየ ስሌት አልታተመም።",
      },
    },
    communityContext: {
      he: "קריית מלאכי היא העיר עם שיעור הגבוה ביותר של יוצאי אתיופיה מכלל האוכלוסייה בישראל — כ-16.4%. הפרויקט במתחם קיבוץ גלויות הוא הראשון מסוגו בעיר אחרי 24 שנה, ומהווה ציון דרך משמעותי עבור הקהילה בעיר.",
      en: "Kiryat Malakhi is the Israeli city with the highest share of Israeli-Ethiopians relative to total population — roughly 16.4%. The Kibbutz Galuyot compound project is the first of its kind in the city in 24 years, marking a significant milestone for the community there.",
      am: "ቂርያት ማላኪ ከጠቅላላ ሕዝብ አንፃር ከፍተኛ የኢትዮጵያ-እስራኤላውያን ድርሻ (~16.4%) ያላት የእስራኤል ከተማ ናት። የኪቡትስ ጋሉዮት ማዕከል ፕሮጀክት በከተማዋ ውስጥ ላለፉት 24 ዓመታት የመጀመሪያው ዓይነት ፕሮጀክት ሲሆን ለማህበረሰቡ ትልቅ ምዕራፍ ነው።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: ["https://www.ynet.co.il/economy/article/bk2kswj32"],
  },
  {
    slug: "moshe-sharet-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: "מתחם משה שרת", en: "Moshe Sharet", am: "ሞሼ ሻሬት" },
    status: {
      he: "מתחם משה שרת הוא אחד מ-4 המתחמים המקודמים כיום לפינוי-בינוי בקריית מלאכי — נפרד גאוגרפית ממתחם קיבוץ גלויות.",
      en: "The Moshe Sharet compound is one of 4 pinui-binui compounds currently being advanced in Kiryat Malakhi — geographically separate from the Kibbutz Galuyot compound.",
      am: "የሞሼ ሻሬት ማዕከል በቂርያት ማላኪ አሁን ከሚራመዱ 4 ፒኑይ-ቢኑይ ማዕከሎች አንዱ ነው — ከኪቡትስ ጋሉዮት ማዕከል በጂኦግራፊያዊ የተለየ።",
    },
    authority: {
      he: "עיריית קריית מלאכי — אחד מ-4 המתחמים המקודמים בעיר.",
      en: "Kiryat Malakhi municipality — one of 4 compounds being advanced citywide.",
      am: "የቂርያት ማላኪ ማዘጋጃ ቤት — በከተማዋ ደረጃ ከሚራመዱ 4 ማዕከሎች አንዱ።",
    },
    units: {
      note: {
        he: 'כ-4,000 יח"ד בסך הכול על פני 4 המתחמים בעיר; פילוח מדויק למתחם זה בלבד לא פורסם.',
        en: "~4,000 units total across the city's 4 compounds; an exact breakdown for this compound alone has not been published.",
        am: "~4,000 ቤቶች በጠቅላላ በከተማዋ 4 ማዕከሎች፤ ለዚህ ማዕከል ብቻ የተለየ ስሌት አልታተመም።",
      },
    },
    communityContext: {
      he: "קריית מלאכי היא העיר עם שיעור הגבוה ביותר של יוצאי אתיופיה מכלל האוכלוסייה בישראל — כ-16.4%. מתחם משה שרת הוא חלק מ-4 המתחמים המקודמים בעיר לטובת חידוש הדיור עבור הקהילה.",
      en: "Kiryat Malakhi is the Israeli city with the highest share of Israeli-Ethiopians relative to total population — roughly 16.4%. The Moshe Sharet compound is part of the 4 compounds being advanced citywide for housing renewal for the community.",
      am: "ቂርያት ማላኪ ከጠቅላላ ሕዝብ አንፃር ከፍተኛ የኢትዮጵያ-እስራኤላውያን ድርሻ (~16.4%) ያላት ከተማ ናት። የሞሼ ሻሬት ማዕከል ለማህበረሰቡ የቤት ዕድሳት ከሚራመዱ 4 ማዕከሎች አካል ነው።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: ["https://www.ynet.co.il/economy/article/bk2kswj32"],
  },
  {
    slug: "chabad-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: 'שכונת חב"ד', en: "Chabad", am: "ቻባድ" },
    status: {
      he: 'תוכנית פינוי-בינוי ספציפית לשכונת חב"ד בקריית מלאכי אושרה בוועדה המחוזית, ומתוארת בדיווחים המקומיים כתוכנית "פורצת דרך" עבור העיר.',
      en: 'A specific pinui-binui plan for the Chabad neighborhood in Kiryat Malakhi was approved by the district planning committee, and is described in local reporting as a "trailblazing" plan for the city.',
      am: 'በቂርያት ማላኪ ለቻባድ ሰፈር ልዩ የፒኑይ-ቢኑይ ዕቅድ በክልል ኮሚቴ ጸድቋል፣ በአካባቢ ዘገባዎች ለከተማዋ "መንገድ ጠራጊ" ተብሎ ተገልጿል።',
    },
    authority: {
      he: "עיריית קריית מלאכי — תוכנית מאושרת בוועדה המחוזית.",
      en: "Kiryat Malakhi municipality — plan approved by the district planning committee.",
      am: "የቂርያት ማላኪ ማዘጋጃ ቤት — በክልል ኮሚቴ የፀደቀ ዕቅድ።",
    },
    units: {
      note: {
        he: 'מספר יחידות דיור מדויק לשכונת חב"ד לא פורסם בנפרד; היא אחת מ-4 המתחמים בעיר (סה"כ כ-4,000 יח"ד).',
        en: "An exact unit count for the Chabad neighborhood has not been published separately; it is one of the city's 4 compounds (~4,000 units total).",
        am: "ለቻባድ ሰፈር ብቻ የተለየ የቤት ቁጥር አልታተመም፤ ከከተማዋ 4 ማዕከሎች አንዷ ናት (በጠቅላላ ~4,000 ቤቶች)።",
      },
    },
    communityContext: {
      he: 'קריית מלאכי היא העיר עם שיעור הגבוה ביותר של יוצאי אתיופיה מכלל האוכלוסייה בישראל — כ-16.4%. תוכנית שכונת חב"ד היא חלק מהמהלך הרחב של 4 מתחמי ההתחדשות בעיר.',
      en: "Kiryat Malakhi is the Israeli city with the highest share of Israeli-Ethiopians relative to total population — roughly 16.4%. The Chabad neighborhood plan is part of the city's broader push across 4 renewal compounds.",
      am: "ቂርያት ማላኪ ከጠቅላላ ሕዝብ አንፃር ከፍተኛ የኢትዮጵያ-እስራኤላውያን ድርሻ (~16.4%) ያላት ከተማ ናት። የቻባድ ሰፈር ዕቅድ ከከተማዋ 4 የዕድሳት ማዕከሎች ሰፊ እንቅስቃሴ አካል ነው።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: ["magdilim.co.il/270620240930"],
  },
  {
    slug: "herzl-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: "מתחם הרצל", en: "Herzl", am: "ሄርዝል" },
    status: {
      he: "מתחם הרצל הוא הרביעי מתוך 4 המתחמים המקודמים כיום לפינוי-בינוי בקריית מלאכי.",
      en: "The Herzl compound is the fourth of the 4 compounds currently being advanced for pinui-binui in Kiryat Malakhi.",
      am: "የሄርዝል ማዕከል በቂርያት ማላኪ አሁን ከሚራመዱ 4 ማዕከሎች አራተኛው ነው።",
    },
    authority: {
      he: "עיריית קריית מלאכי — אחד מ-4 המתחמים המקודמים בעיר.",
      en: "Kiryat Malakhi municipality — one of 4 compounds being advanced citywide.",
      am: "የቂርያት ማላኪ ማዘጋጃ ቤት — በከተማዋ ደረጃ ከሚራመዱ 4 ማዕከሎች አንዱ።",
    },
    units: {
      note: {
        he: 'כ-4,000 יח"ד בסך הכול על פני 4 המתחמים בעיר; פילוח מדויק למתחם זה בלבד לא פורסם.',
        en: "~4,000 units total across the city's 4 compounds; an exact breakdown for this compound alone has not been published.",
        am: "~4,000 ቤቶች በጠቅላላ በከተማዋ 4 ማዕከሎች፤ ለዚህ ማዕከል ብቻ የተለየ ስሌት አልታተመም።",
      },
    },
    communityContext: {
      he: "קריית מלאכי היא העיר עם שיעור הגבוה ביותר של יוצאי אתיופיה מכלל האוכלוסייה בישראל — כ-16.4%. מתחם הרצל משלים את מהלך ההתחדשות בן 4 המתחמים בעיר.",
      en: "Kiryat Malakhi is the Israeli city with the highest share of Israeli-Ethiopians relative to total population — roughly 16.4%. The Herzl compound completes the city's 4-compound renewal push.",
      am: "ቂርያት ማላኪ ከጠቅላላ ሕዝብ አንፃር ከፍተኛ የኢትዮጵያ-እስራኤላውያን ድርሻ (~16.4%) ያላት ከተማ ናት። የሄርዝል ማዕከል የከተማዋን የ4 ማዕከል የዕድሳት እንቅስቃሴ ያጠናቅቃል።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: ["https://www.ynet.co.il/economy/article/bk2kswj32"],
  },
  {
    slug: "ramat-ashkol-lod",
    citySlug: "lod",
    name: { he: "רמת אשכול", en: "Ramat Ashkol", am: "ራማት አሽኮል" },
    status: {
      he: "בשכונת רמת אשכול בלוד מתוכננת הריסה של כ-1,200 יחידות דיור קיימות ובנייתן מחדש כ-5,200 יחידות דיור חדשות — 53 בניינים בגובה של עד 10 קומות ו-27 בניינים נוספים בגובה של עד 25 קומות.",
      en: "In the Ramat Ashkol neighborhood in Lod, roughly 1,200 existing housing units are planned for demolition and rebuilding as about 5,200 new units — 53 buildings up to 10 floors and a further 27 buildings up to 25 floors.",
      am: "በሎድ ራማት አሽኮል ሰፈር ወደ 1,200 ነባር ቤቶችን ማፍረስና ወደ 5,200 አዲስ ቤቶች መልሶ መገንባት ታቅዷል — 53 ህንፃዎች እስከ 10 ፎቅ እና ተጨማሪ 27 ህንፃዎች እስከ 25 ፎቅ።",
    },
    authority: {
      he: "עיריית לוד — תוכנית פינוי-בינוי לשכונת רמת אשכול.",
      en: "Lod municipality — pinui-binui plan for the Ramat Ashkol neighborhood.",
      am: "የሎድ ማዘጋጃ ቤት — ለራማት አሽኮል ሰፈር ፒኑይ-ቢኑይ ዕቅድ።",
    },
    units: { before: 1200, after: 5200 },
    communityContext: {
      he: "לוד מאכלסת קהילה ותיקה של יוצאי אתיופיה, עם שכונות בהן שיעור הקהילה גבוה — רמת אשכול ביניהן. פרויקט ההתחדשות בהיקף כזה צפוי להשפיע ישירות על אפשרויות הדיור של הקהילה בעיר.",
      en: "Lod has a long-established Israeli-Ethiopian community, with neighborhoods — Ramat Ashkol among them — where the community's share is high. A renewal project at this scale is expected to directly affect the community's housing options in the city.",
      am: "ሎድ ጉልህ ከሆነ ማህበረሰብ ድርሻ ካላቸው ሰፈሮች ጋር — ራማት አሽኮል ጨምሮ — ቆየት ያለ የኢትዮጵያ-እስራኤላውያን ማህበረሰብ አላት። በዚህ ስፋት ያለ የዕድሳት ፕሮጀክት በከተማዋ ለማህበረሰቡ የቤት ምርጫዎች ላይ ቀጥተኛ ተጽዕኖ ይኖረዋል ተብሎ ይጠበቃል።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: [
      "https://www.ynet.co.il/articles/0,7340,L-5492446,00.html",
      "themarker.com (real-estate section)",
    ],
  },
  {
    slug: "shchuna-dalet-beer-sheva",
    citySlug: "beer-sheva",
    name: { he: "שכונה ד'", en: "Shchuna Dalet", am: "ሽኩና ዳሌት" },
    status: {
      he: "שלב תכנון מפורט יצא לדרך עבור מתחם \"יעקב\" בשכונה ד' בבאר שבע — הפרויקט הראשון מסוגו להתחדשות עירונית בשכונה ד'.",
      en: 'A detailed planning stage has begun for the "Yaakov" compound in Shchuna Dalet, Be\'er Sheva — the first urban-renewal project of its kind in Shchuna Dalet.',
      am: 'በበኤር ሼቫ ሽኩና ዳሌት ውስጥ ለ"ያዕቆብ" ማዕከል ዝርዝር የዕቅድ ደረጃ ተጀምሯል — በሽኩና ዳሌት የመጀመሪያው ዓይነት የከተማ ዕድሳት ፕሮጀክት።',
    },
    authority: {
      he: 'עיריית באר שבע — שלב תכנון מפורט למתחם "יעקב".',
      en: 'Be\'er Sheva municipality — detailed planning stage for the "Yaakov" compound.',
      am: 'የበኤር ሼቫ ማዘጋጃ ቤት — ለ"ያዕቆብ" ማዕከል ዝርዝር የዕቅድ ደረጃ።',
    },
    units: {
      note: {
        he: "הפרויקט בשלב תכנון מפורט; מספרי יחידות דיור סופיים טרם פורסמו.",
        en: "The project is at the detailed-planning stage; final unit numbers have not yet been published.",
        am: "ፕሮጀክቱ በዝርዝር የዕቅድ ደረጃ ላይ ነው፤ የመጨረሻ የቤት ቁጥሮች እስካሁን አልታተሙም።",
      },
    },
    communityContext: {
      he: "שכונה ד' בבאר שבע היא אחת מהשכונות בעיר בהן מתגוררת קהילת יוצאי אתיופיה, בעיר שמארחת אחת מקהילות היוצאי אתיופיה הגדולות בדרום הארץ. היות זה הפרויקט הראשון מסוגו בשכונה מדגיש את תחילתה של מגמת התחדשות חדשה עבור התושבים.",
      en: "Shchuna Dalet in Be'er Sheva is one of the city's neighborhoods where the Israeli-Ethiopian community lives, in a city that hosts one of the largest concentrations of the community in southern Israel. Its being the first project of its kind in the neighborhood marks the start of a new renewal trend for residents.",
      am: "በበኤር ሼቫ ያለው ሽኩና ዳሌት የኢትዮጵያ-እስራኤላውያን ማህበረሰብ ከሚኖርባቸው የከተማዋ ሰፈሮች አንዷ ስትሆን፣ ከተማዋ በደቡብ እስራኤል ትልቁን የማህበረሰብ ክምችት ካላቸው መካከል ናት። ይህ በሰፈሩ የመጀመሪያው ዓይነት ፕሮጀክት መሆኑ ለነዋሪዎች አዲስ የዕድሳት አዝማሚያ መጀመሩን ያመለክታል።",
    },
    rightSlug: "pinui-binui-tenant-rights",
    sources: ['b7net.co.il (search: "מתחם ראשון להתחדשות עירונית בשכונה ד\' יוצא לדרך")'],
  },
];

const BY_SLUG = new Map<string, UrbanRenewalNeighborhood>(
  URBAN_RENEWAL_NEIGHBORHOODS.map((n) => [n.slug, n]),
);

export function findNeighborhoodBySlug(
  slug: string,
): UrbanRenewalNeighborhood | undefined {
  return BY_SLUG.get(slug);
}

export function neighborhoodsByCity(citySlug: string): UrbanRenewalNeighborhood[] {
  return URBAN_RENEWAL_NEIGHBORHOODS.filter((n) => n.citySlug === citySlug);
}

export function neighborhoodName(n: UrbanRenewalNeighborhood, locale: Locale): string {
  return n.name[locale] ?? n.name.he;
}

export function localized(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.he;
}

export const URBAN_RENEWAL_PATH_PREFIX = "/urban-renewal";

export function neighborhoodPath(locale: Locale, slug: string): string {
  return `/${locale}${URBAN_RENEWAL_PATH_PREFIX}/${slug}`;
}
