// Glossary seed (RIN-418 / part of RIN-417 — SEO surface expansion Wave 1).
//
// 12 community-vocabulary terms ("what is X?") authored in HE/EN/AM. Captures
// long-tail informational searches that don't map to a Right (e.g. "מה זה
// סיגד", "what is Falash Mura"), and links *into* the Rights Hub via the
// `relatedRights` field.
//
// HE is source-of-truth (CLAUDE.md). EN + AM are factual mirrors.
// Each entry is renderable from this seed alone — no DB, no CMS — same
// pattern as `lib/db/seeds/rights.ts`.
//
// Wave 2 (20 additional entries) is imported from ./glossary-wave2.server.ts
// and merged into the exported GLOSSARY array at the bottom of this file.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { GlossaryCategory } from "./categories";
import { GLOSSARY_WAVE2 } from "./glossary-wave2.server";

export type { GlossaryCategory } from "./categories";

export interface GlossaryEntry {
  slug: string;
  category: GlossaryCategory;
  term: Translatable;
  /** One-line plain-text summary, used for cards + meta description. */
  summary: Translatable;
  /** Slugs of related rights (under `/rights/{slug}`). */
  relatedRights: string[];
  /** Slugs of related glossary terms (under `/glossary/{slug}`). */
  relatedTerms: string[];
  /** External authoritative sources, attached at the bottom of the body. */
  sources?: Array<{ title: string; url: string }>;
  bodies: Record<Locale, string>;
}

// --- Wave 1: 12 glossary entries --------------------------------------------
// Wave 2 (20 entries) is defined in ./glossary-wave2.server.ts and merged below.

const GLOSSARY_WAVE1: GlossaryEntry[] = [
  // 1. Sigd — חג קהילתי + חוק 5774
  {
    slug: "sigd",
    category: "tradition",
    term: { he: "סיגד", en: "Sigd", am: "ሰግድ" },
    summary: {
      he: "חג קהילתי של יהודי אתיופיה, החל ב-29 בחשוון. חוק 5774-2008 הופך אותו לחג מועד-בעבודה בישראל.",
      en: "An Ethiopian-Jewish community holiday observed on the 29th of Heshvan. Law 5774-2008 recognizes it as an official Israeli holiday.",
      am: "በ29ኛው የሄሽቫን ቀን የሚከበር የኢትዮጵያ-አይሁድ ማህበረሰብ በዓል። የ5774-2008 ሕግ በእስራኤል ብሔራዊ በዓል አድርጎ ያውቀዋል።",
    },
    relatedRights: ["funding-sigd-events"],
    relatedTerms: ["beta-israel", "kessim"],
    sources: [
      {
        title: "חוק חג הסיגד תשס״ט-2008",
        url: "https://www.nevo.co.il/law_html/Law01/999_502.htm",
      },
      {
        title: "ישראל היום — סיגד",
        url: "https://www.gov.il/he/departments/topics/sigd_holiday",
      },
    ],
    bodies: {
      he: `## מה זה?

הסיגד הוא חג קהילתי של יהודי אתיופיה, מקור השם בארמית "סגד" (השתחווה). הוא נחגג ב-29 בחודש חשוון — 50 יום אחרי יום הכיפורים — ומסמן את הציפייה לציון ולתורה.

## הסטוריה

באתיופיה, החג היה היום המרכזי בו עלו הקהילות מכל הכפרים אל הר-ראש (Mount Hoharwa) להאזין לקייסים קוראים בתורה ובחזון של הנביאים. ב-1991, אחרי מבצע שלמה, הסיגד החל להחגג בכל הארץ — האירוע המרכזי מתקיים בארמון הנציב בירושלים, וכן בנתניה, ראשון לציון, רחובות, באר שבע, חיפה ועוד.

## חוק 5774-2008

ב-30 ביולי 2008, הכנסת קיבלה את חוק חג הסיגד (תשס״ט-2008) — חג מדינה רשמי בישראל. עובד יהודי אתיופי זכאי ליום היעדרות בתשלום ליום הסיגד; משרד החינוך מקיים יום שיעורים על הקהילה.

## רלוונטיות לקהילה

- אירוע מרכזי לזהות תרבותית — מועבר מדור לדור
- הקייסים (כהני הדת) מובילים את התפילה והקריאה בתורה
- בכל עיר עם קהילה גדולה (נתניה, רחובות, ראשון לציון, חיפה) מתקיים אירוע מקומי
- מועצות מקומיות תומכות במימון אירועים ([מימון אירועי סיגד](/he/rights/funding-sigd-events))

## ראו גם

- [ביתא ישראל](/he/glossary/beta-israel) — הזהות הקהילתית של יהודי אתיופיה
- [קייסים](/he/glossary/kessim) — מנהיגות דתית ביהדות אתיופיה
- [מבצע שלמה](/he/glossary/operation-solomon) — העלייה ההמונית שאיפשרה את הסיגד הישראלי
`,
      en: `## What is it?

Sigd is a community holiday of Ethiopian Jewry. The name derives from the Aramaic "to bow." It is observed on the 29th of Heshvan — 50 days after Yom Kippur — and marks the longing for Zion and renewal of the covenant with the Torah.

## History

In Ethiopia, Sigd was the day on which the communities ascended a designated mountain (Mount Hoharwa) to listen to the Kessim chant from the Torah and the prophets. After Operation Solomon (1991), Sigd became a nationwide observance in Israel — the main ceremony is held in Jerusalem at the Armon HaNatziv promenade, with parallel ceremonies in Netanya, Rishon LeZion, Rehovot, Beersheba, Haifa, and other community-strong cities.

## Law 5774-2008

On July 30, 2008, the Knesset passed the Sigd Holiday Law (5769-2008), recognizing it as an official Israeli national holiday. Ethiopian-Israeli employees are entitled to a paid day off; the Ministry of Education runs a community-themed lesson day.

## Community relevance

- Anchor cultural-identity event — transmitted across generations
- The Kessim (religious leaders) lead the prayers and the Torah recitation
- Every city with a sizeable community (Netanya, Rehovot, Rishon LeZion, Haifa) holds a local ceremony
- Municipalities subsidize venue and logistics ([Sigd event funding](/en/rights/funding-sigd-events))

## See also

- [Beta Israel](/en/glossary/beta-israel) — the communal identity of Ethiopian Jewry
- [Kessim](/en/glossary/kessim) — religious leadership in Ethiopian Judaism
- [Operation Solomon](/en/glossary/operation-solomon) — the airlift that made the Israeli Sigd possible
`,
      am: `## ምንድ ነው?

ሰግድ የኢትዮጵያ አይሁዶች ማህበረሰብ በዓል ነው። ስሙ ከአራማይክ "መስገድ" የመጣ ነው። በ29ኛው የሄሽቫን ቀን — ከዮም ኪፑር በኋላ 50 ቀናት — ይከበራል፣ ለጽዮን ናፍቆትና ከቶራህ ጋር ያለውን ኪዳን እንደ መታደስ ይታያል።

## ታሪክ

በኢትዮጵያ ሰግድ ማህበረሰቦች ወደ ተራራ (የሆሃርዋ ተራራ) ወጥተው ቄሶቹ ቶራህንና የነቢያትን ቃል እንዲያነቡ የሚያዳምጡበት ቀን ነበር። ከኦፐሬሽን ሰለሞን (1991) በኋላ ሰግድ በመላው እስራኤል ይከበራል — ዋናው ሥነ-ሥርዓት በኢየሩሳሌም በአርሞን ሃናጺቭ ነው፣ በነታንያ፣ ሪሾን ለጽዮን፣ ሬሆቮት፣ ቤርሼባ፣ ሐይፋ እና ሌሎች ማህበረሰብ ካለባቸው ከተሞችም ይከበራል።

## ሕግ 5774-2008

ሐምሌ 30 ቀን 2008 የእስራኤል ኬሰት የሰግድ በዓል ሕግ (5769-2008) አጸደቀ፣ የእስራኤል ብሔራዊ በዓል አድርጎ አውቆታል። የኢትዮጵያ-እስራኤል ሰራተኞች በደመወዝ የእረፍት ቀን የማግኘት መብት አላቸው፤ የትምህርት ሚኒስቴር በማህበረሰብ ላይ ያተኮረ የትምህርት ቀን ያካሂዳል።

## የማህበረሰቡ ጠቀሜታ

- የዓመቱ ዋነኛ የባህል-ማንነት ክንውን — ከትውልድ ወደ ትውልድ ይተላለፋል
- ቄሶቹ ጸሎቱንና የቶራህ ንባቡን ይመራሉ
- ብዙ ማህበረሰብ ያላቸው ከተሞች ሁሉ (ነታንያ፣ ሬሆቮት፣ ሪሾን ለጽዮን፣ ሐይፋ) የራሳቸውን ሥነ-ሥርዓት ያካሂዳሉ
- ማዘጋጃ ቤቶች የቦታና ሎጂስቲክስ ድጎማ ይሰጣሉ ([የሰግድ ክንውን ድጎማ](/am/rights/funding-sigd-events))

## ይህንንም ይመልከቱ

- [ቤታ እስራኤል](/am/glossary/beta-israel) — የኢትዮጵያ አይሁድ ማህበረሰብ ማንነት
- [ቄሶች](/am/glossary/kessim) — የኢትዮጵያ አይሁድ ሃይማኖት መሪነት
- [ኦፐሬሽን ሰለሞን](/am/glossary/operation-solomon) — የእስራኤል ሰግድ የሰጠው የአየር ላይ ጉዞ
`,
    },
  },

  // 2. Beta Israel — זהות קהילתית
  {
    slug: "beta-israel",
    category: "identity",
    term: { he: "ביתא ישראל", en: "Beta Israel", am: "ቤታ እስራኤል" },
    summary: {
      he: "השם המסורתי של קהילת יהודי אתיופיה. כולל היום כ-160,000 איש בישראל.",
      en: "The traditional name of the Ethiopian-Jewish community. Today numbers approximately 160,000 in Israel.",
      am: "የኢትዮጵያ አይሁድ ማህበረሰብ ባህላዊ ስም። ዛሬ በእስራኤል ወደ 160,000 ሰዎች ናቸው።",
    },
    relatedRights: ["klita-basket", "falash-mura-direct-absorption"],
    relatedTerms: ["sigd", "kessim", "falash-mura", "aliyah-from-ethiopia"],
    sources: [
      {
        title: "Central Bureau of Statistics — Ethiopian-born population",
        url: "https://www.cbs.gov.il/he/subjects/Pages/יוצאי-אתיופיה.aspx",
      },
    ],
    bodies: {
      he: `## מה זה?

"ביתא ישראל" (תרגום: "בית ישראל") הוא השם המסורתי שבו כינתה הקהילה את עצמה במשך מאות שנים באתיופיה. הוא מבחין את הקהילה היהודית מהאוכלוסייה הנוצרית והמוסלמית באתיופיה ההיסטורית.

## הסטוריה

המסורת הקהילתית רואה את עצמה כצאצאי שבט דן (אחד מעשרת השבטים האבודים), עם קהילה רציפה בצפון אתיופיה (גונדר, טיגראי, וולקאית). ההלכה הקהילתית מבוססת על המקרא ועל ספרי הקייסים — לפני המגע עם יהדות העולם המודרני, ההלכה הרבנית (משנה, תלמוד) לא הייתה חלק מהפרקטיקה.

ב-1973 הרב הראשי הספרדי עובדיה יוסף הכריז שביתא ישראל הם יהודים גמורים מצאצאי שבט דן, החלטה שפתחה את הדרך לעלייה לישראל לפי חוק השבות. הרב הראשי האשכנזי קיבל את ההחלטה ב-1975.

## אוכלוסייה היום

- כ-160,000 בישראל (CBS, 2024)
- הריכוזים הגדולים: נתניה, רחובות, ראשון לציון, באר שבע, אשקלון, פתח תקווה, חיפה
- כ-150,000 ילידי הארץ (דור 2 ו-3)

## רלוונטיות לקהילה

הזהות "ביתא ישראל" עומדת בתודעה הקהילתית — לעיתים נשמעת בקריאות "אנחנו ביתא ישראל, לא רק יוצאי אתיופיה." היא מחברת בין הדור הראשון לדור השני והשלישי שנולדו בארץ.

## ראו גם

- [סיגד](/he/glossary/sigd) — חג מרכזי של ביתא ישראל
- [קייסים](/he/glossary/kessim) — המנהיגות הרוחנית
- [פלשמורה](/he/glossary/falash-mura) — קבוצה מובחנת באתיופיה
- [עליית יהודי אתיופיה](/he/glossary/aliyah-from-ethiopia) — סיפור העלייה
`,
      en: `## What is it?

"Beta Israel" (literally "House of Israel") is the traditional self-designation of the Ethiopian-Jewish community for centuries. It distinguished the Jewish community from Christian and Muslim populations in historical Ethiopia.

## History

Communal tradition traces its origins to the Tribe of Dan (one of the Ten Lost Tribes), with continuous Jewish presence in northern Ethiopia (Gondar, Tigray, Welkayit). Communal halakha is based on the Bible and the Kessim's books — before contact with modern world Judaism, rabbinic halakha (Mishnah, Talmud) was not part of the practice.

In 1973, Rabbi Ovadia Yosef (Sephardi Chief Rabbi of Israel) ruled that Beta Israel are full Jews descended from the Tribe of Dan, opening the path to aliyah under the Law of Return. The Ashkenazi Chief Rabbi accepted the ruling in 1975.

## Demographics today

- ~160,000 in Israel (CBS, 2024)
- Largest concentrations: Netanya, Rehovot, Rishon LeZion, Beersheba, Ashkelon, Petah Tikva, Haifa
- ~150,000 Israeli-born (2nd and 3rd generations)

## Community relevance

The "Beta Israel" identity is alive in community consciousness — heard in calls of "we are Beta Israel, not just Ethiopian-Israelis." It bridges the first generation with second- and third-generation Israelis.

## See also

- [Sigd](/en/glossary/sigd) — central Beta Israel holiday
- [Kessim](/en/glossary/kessim) — spiritual leadership
- [Falash Mura](/en/glossary/falash-mura) — a related but distinct community
- [Aliyah from Ethiopia](/en/glossary/aliyah-from-ethiopia) — the immigration story
`,
      am: `## ምንድ ነው?

"ቤታ እስራኤል" (ቃል በቃል "የእስራኤል ቤት") ለብዙ መቶ ዓመታት የኢትዮጵያ አይሁድ ማህበረሰብ ራሱን የጠራበት ባህላዊ ስም ነው። በታሪካዊ ኢትዮጵያ የአይሁድ ማህበረሰብን ከክርስቲያን እና ሙስሊም ህዝቦች ይለያል።

## ታሪክ

የማህበረሰቡ ባህል ራሱን ከዳን ነገድ (ከአስርቱ ጠፍ ነገዶች አንዱ) እንደ መጣ ይቆጥራል፣ በሰሜናዊ ኢትዮጵያ (ጎንደር፣ ትግራይ፣ ወልቃይት) ቀጣይ የአይሁድ መኖሪያ ነበር። የማህበረሰቡ ሃላካህ በመጽሐፍ ቅዱስ እና በቄሶች መጻሕፍት ላይ የተመሰረተ ነው — ከዘመናዊ የዓለም አይሁድነት ጋር ግንኙነት ከመፈጠሩ በፊት፣ የራቢ ሃላካህ (ሚሽና፣ ታልሙድ) የተግባር አካል አልነበረም።

በ1973፣ ራቢ ኦቫድያ ዮሴፍ (የእስራኤል ሴፋርዲ ዋና ራቢ) ቤታ እስራኤል ከዳን ነገድ የመጡ ሙሉ አይሁዶች መሆናቸውን ወሰነ፣ በመመለስ ሕግ መሰረት ወደ እስራኤል ለመውጣት መንገድ ከፈተ። የአሽከናዚ ዋና ራቢ ውሳኔውን በ1975 ተቀበለ።

## የዛሬ ሕዝብ ብዛት

- በእስራኤል ~160,000 (CBS፣ 2024)
- ትልልቅ ማዕከላት፦ ነታንያ፣ ሬሆቮት፣ ሪሾን ለጽዮን፣ ቤርሼባ፣ አሽኬሎን፣ ፔታህ ቲክቫ፣ ሐይፋ
- ~150,000 በእስራኤል የተወለዱ (2ኛ እና 3ኛ ትውልድ)

## የማህበረሰቡ ጠቀሜታ

"ቤታ እስራኤል" ማንነት በማህበረሰቡ ንቃተ ህሊና ውስጥ ሕያው ነው — "እኛ ቤታ እስራኤል ነን፣ የኢትዮጵያ-እስራኤል ብቻ አይደለንም" በሚል ጥሪዎች ይሰማል። የመጀመሪያውን ትውልድ ከ2ኛና 3ኛ ትውልድ እስራኤላውያን ጋር ያገናኛል።

## ይህንንም ይመልከቱ

- [ሰግድ](/am/glossary/sigd) — የቤታ እስራኤል ዋነኛ በዓል
- [ቄሶች](/am/glossary/kessim) — መንፈሳዊ መሪነት
- [ፋላሽ ሙራ](/am/glossary/falash-mura) — የተዛመደ ግን ልዩ ማህበረሰብ
- [ከኢትዮጵያ ዐሊያህ](/am/glossary/aliyah-from-ethiopia) — የስደቱ ታሪክ
`,
    },
  },

  // 3. Falash Mura
  {
    slug: "falash-mura",
    category: "identity",
    term: { he: "פלשמורה", en: "Falash Mura", am: "ፋላሽ ሙራ" },
    summary: {
      he: "צאצאי יהודי אתיופיה שהמירו לנצרות במאה ה-19. החלטות הממשלה ב-2015, 2018 ו-2024 פתחו עלייה מדורגת.",
      en: "Descendants of Ethiopian Jews who converted to Christianity in the 19th century. Government decisions in 2015, 2018, and 2024 enabled phased aliyah.",
      am: "በ19ኛው ክፍለ ዘመን ወደ ክርስትና የተቀየሩ የኢትዮጵያ አይሁዶች ዘሮች። የ2015፣ 2018 እና 2024 መንግስት ውሳኔዎች ደረጃ-ደረጃ ዐሊያህን አስችለዋል።",
    },
    relatedRights: ["falash-mura-direct-absorption", "klita-basket"],
    relatedTerms: ["beta-israel", "aliyah-from-ethiopia"],
    sources: [
      {
        title: "החלטה 716 — Falash Mura aliyah",
        url: "https://www.gov.il/he/departments/policies/dec716_2015",
      },
    ],
    bodies: {
      he: `## מה זה?

"פלשמורה" (ולחילופין "פלשמרה") הוא מונח לצאצאי יהודי אתיופיה שהמירו את דתם לנצרות במאות ה-19 וה-20, מתחילה בעיקר תחת לחץ פוליטי-כלכלי. רבים מהם המשיכו בדת היהודית בסתר, ושמרו על מסורת קהילתית מרוחקת.

## הסטוריה הסבוכה

בשנות ה-90, התעוררה שאלת זכות העלייה של הפלשמורה. הרבנות הראשית קבעה ב-2003 שיש לקבל אותם חזרה ליהדות לאחר תהליך גיור, ולא לפי חוק השבות (שלא חל על מי שהמיר את דתו).

## תהליך העלייה

- 2010 — החלטת ממשלה 1085: סיום מבצע הפלשמורה (למעשה דחה את העלייה)
- 2015 — החלטה 716: חידוש העלייה ב-9,000 איש
- 2018 — החלטה 4399: 1,000 איש נוספים
- 2024 — החלטה 716 חודשה והתבקשו 1,000-3,000 איש נוספים, בעיקר אנשים שמשפחותיהם בארץ
- מסלול: גיור > עלייה > מסלול קליטה ייעודי במרכזים

## רלוונטיות לקהילה

- אומדן: 7,000-12,000 פלשמורה ממתינים באתיופיה (גונדר ואדיס אבבה)
- מי שעלה זכאי ל-[מסלול קליטה ייעודי](/he/rights/falash-mura-direct-absorption) ול-[סל קליטה](/he/rights/klita-basket)
- נושא ציבורי-פוליטי משמעותי בקהילה — איחוד משפחות

## ראו גם

- [ביתא ישראל](/he/glossary/beta-israel) — הקהילה ההיסטורית
- [עליית יהודי אתיופיה](/he/glossary/aliyah-from-ethiopia) — מסלולי העלייה הקודמים
`,
      en: `## What is it?

"Falash Mura" refers to descendants of Ethiopian Jews who converted to Christianity in the 19th and 20th centuries, primarily under political and economic pressure. Many continued to practice Judaism in secret, retaining a distant communal tradition.

## Complex history

In the 1990s, the question of Falash Mura aliyah rights came to the fore. In 2003, the Israeli Chief Rabbinate ruled that the community must undergo a formal halakhic conversion process to return to Judaism, rather than entering under the Law of Return (which excludes converts to other religions).

## Aliyah process

- 2010 — Government Resolution 1085: closure of the Falash Mura operation (effectively delaying aliyah)
- 2015 — Resolution 716: renewed aliyah of 9,000 people
- 2018 — Resolution 4399: an additional 1,000 people
- 2024 — Resolution 716 reactivated; 1,000-3,000 additional people requested, primarily those with families already in Israel
- Track: conversion → aliyah → dedicated absorption track at designated centers

## Community relevance

- Estimated 7,000-12,000 Falash Mura still waiting in Ethiopia (Gondar and Addis Ababa)
- Olim are eligible for the [dedicated absorption track](/en/rights/falash-mura-direct-absorption) and the [klita basket](/en/rights/klita-basket)
- A major public-political issue in the community — family reunification

## See also

- [Beta Israel](/en/glossary/beta-israel) — the historical community
- [Aliyah from Ethiopia](/en/glossary/aliyah-from-ethiopia) — earlier aliyah tracks
`,
      am: `## ምንድ ነው?

"ፋላሽ ሙራ" በ19ኛው እና 20ኛው ክፍለ ዘመን፣ በዋናነት በፖለቲካዊና ኢኮኖሚያዊ ግፊት ምክንያት ወደ ክርስትና የተቀየሩ የኢትዮጵያ አይሁዶች ዘሮችን ያመለክታል። ብዙዎቹ በስውር አይሁድነታቸውን መለማመድ ቀጥለው፣ የራቀ የማህበረሰብ ባህል ጠብቀዋል።

## ውስብስብ ታሪክ

በ1990ዎቹ የፋላሽ ሙራ የዐሊያህ መብት ጥያቄ ወደ ፊት መጣ። በ2003 የእስራኤል ዋና ራቢነት ማህበረሰቡ ወደ አይሁድነት ለመመለስ መደበኛ የሃላክሂክ መለወጥ ሂደት ማለፍ እንዳለበት ወሰነ።

## የዐሊያህ ሂደት

- 2010 — የመንግስት ውሳኔ 1085: የፋላሽ ሙራ ኦፐሬሽን መዘጋት
- 2015 — ውሳኔ 716: የ9,000 ሰዎች የተደሰሰ ዐሊያህ
- 2018 — ውሳኔ 4399: ተጨማሪ 1,000 ሰዎች
- 2024 — ውሳኔ 716 ታደሰ፤ 1,000-3,000 ተጨማሪ ሰዎች ተጠይቀዋል፣ በዋናነት በእስራኤል ቤተሰብ ያላቸው
- ሂደት፦ መለወጥ → ዐሊያህ → በተወሰኑ ማዕከሎች የተወሰነ የመቀበል ሂደት

## የማህበረሰቡ ጠቀሜታ

- ግምት፦ 7,000-12,000 ፋላሽ ሙራ አሁንም በኢትዮጵያ ይጠባበቃሉ (ጎንደር እና አዲስ አበባ)
- ዐሊያህ ያደረጉ ለ[የተወሰነ የመቀበል ሂደት](/am/rights/falash-mura-direct-absorption) እና [የክሊታ ቅርጫት](/am/rights/klita-basket) የመብት አላቸው
- በማህበረሰቡ ዘንድ ዋነኛ የህዝብ-ፖለቲካ ጉዳይ — የቤተሰብ ዳግም ግንኙነት

## ይህንንም ይመልከቱ

- [ቤታ እስራኤል](/am/glossary/beta-israel) — ታሪካዊ ማህበረሰብ
- [ከኢትዮጵያ ዐሊያህ](/am/glossary/aliyah-from-ethiopia) — ቀደም ሲል የነበሩ የዐሊያህ መንገዶች
`,
    },
  },

  // 4. Kessim
  {
    slug: "kessim",
    category: "tradition",
    term: { he: "קייסים", en: "Kessim", am: "ቄሶች" },
    summary: {
      he: "מנהיגי הדת המסורתיים של ביתא ישראל. כיום מוכרים בישראל כמורי הוראה דתיים-תרבותיים אך אינם משולבים במערך הרבני הראשי.",
      en: "The traditional religious leaders of Beta Israel. In Israel today they are recognized as religious-cultural authorities but are not integrated into the official Chief Rabbinate.",
      am: "የቤታ እስራኤል ባህላዊ ሃይማኖት መሪዎች። ዛሬ በእስራኤል እንደ ሃይማኖት-ባህል ባለስልጣናት ይታወቃሉ ግን በይፋ የዋና ራቢነት መዋቅር ውስጥ አይደሉም።",
    },
    relatedRights: ["kessim-stipend", "funding-sigd-events"],
    relatedTerms: ["beta-israel", "sigd"],
    bodies: {
      he: `## מה זה?

הקייסים (יחיד: "קייס" / "כָהֵן") הם מנהיגי הדת המסורתיים של קהילת ביתא ישראל. השם נגזר מ"כָהֵן" (אמהרית: ቄስ — "kes"). הם פעלו באתיופיה כמורי הלכה, פוסקים, וקוראים בתורה.

## תפקידים מסורתיים

- קריאה בתורה ובמסורות הקהילתיות (Orit, Mota Aleksandros)
- שחיטה כשרה לפי המסורת הקהילתית
- חתונות, גירושין, וברית מילה
- הובלת תפילות חגי הקהילה — סיגד, חג המצות, חג הסוכות

## מצב היום בישראל

- כ-50 קייסים פעילים בישראל
- קיימים מרכזי תפילה קהילתיים בנתניה, רחובות, באר שבע, ועוד
- הקייסים אינם מוכרים על-ידי הרבנות הראשית כרבני קהילה רשמיים, אך כן מקבלים מענק חודשי ממשרד הדתות ([מענק קייסים](/he/rights/kessim-stipend))
- צעירים שעולים לרבנות מסורתית עוברים את מסלול הסמיכה הרבני הסטנדרטי, מצב שגורם לעיתים למתח בין-דורי

## רלוונטיות לקהילה

- אנקור קהילתי — מקור סמכות רוחנית
- מנהיגי טקסי הסיגד והחגים
- חיוני לזהות הקהילתית — מסירה של מסורת מקור-אתיופיה לדור הבא

## ראו גם

- [ביתא ישראל](/he/glossary/beta-israel) — הקהילה
- [סיגד](/he/glossary/sigd) — החג שהקייסים מובילים
`,
      en: `## What is it?

The Kessim (singular: "Kes" / "Kahen") are the traditional religious leaders of the Beta Israel community. The name derives from "Kahen" / "Priest" (Amharic: ቄስ — kes). In Ethiopia they served as community legal scholars, halakhic decisors, and Torah readers.

## Traditional roles

- Recitation of the Torah and communal traditions (Orit, Mota Aleksandros)
- Kosher slaughter according to community tradition
- Weddings, divorces, and circumcision
- Leading prayer at communal festivals — Sigd, Passover, Sukkot

## Current status in Israel

- ~50 active Kessim in Israel
- Community prayer centers in Netanya, Rehovot, Beersheba, and more
- The Kessim are not recognized by the Chief Rabbinate as official communal rabbis, but do receive a monthly stipend from the Ministry of Religious Services ([Kessim stipend](/en/rights/kessim-stipend))
- Young community members entering the rabbinate go through the standard rabbinic ordination track — this sometimes creates intergenerational tension

## Community relevance

- Communal anchor — a source of spiritual authority
- Lead the Sigd and other festival ceremonies
- Vital for community identity — transmission of Ethiopian-origin tradition to the next generation

## See also

- [Beta Israel](/en/glossary/beta-israel) — the community
- [Sigd](/en/glossary/sigd) — the holiday led by the Kessim
`,
      am: `## ምንድ ነው?

ቄሶች (ነጠላ፦ "ቄስ" / "ካህን") የቤታ እስራኤል ማህበረሰብ ባህላዊ ሃይማኖት መሪዎች ናቸው። ስሙ ከ"ካህን" / "ቄስ" (አማርኛ፦ ቄስ — kes) የመጣ ነው። በኢትዮጵያ የማህበረሰብ ሕግ ምሁራን፣ የሃላካህ ወሳኞች እና የቶራህ አንባቢዎች ሆነው አገልግለዋል።

## ባህላዊ ኃላፊነቶች

- የቶራህ እና የማህበረሰብ ባህሎች ንባብ (ኦሪት፣ ሞታ አሌክሳንድሮስ)
- በማህበረሰብ ባህል መሰረት ኮሸር እርድ
- ሰርግ፣ ፍች፣ እና ግዝረት
- በማህበረሰብ በዓላት ጸሎት መምራት — ሰግድ፣ ፋሲካ፣ ሱኮት

## በእስራኤል የአሁን ሁኔታ

- በእስራኤል ~50 ንቁ ቄሶች
- በነታንያ፣ ሬሆቮት፣ ቤርሼባ እና በሌሎችም የማህበረሰብ ጸሎት ማዕከላት አሉ
- ቄሶች በዋና ራቢነት እንደ ይፋዊ የማህበረሰብ ራቢ አይታወቁም፣ ግን ከሃይማኖት አገልግሎት ሚኒስቴር ወርሃዊ ድጎማ ያገኛሉ ([የቄሶች ድጎማ](/am/rights/kessim-stipend))
- ወደ ራቢነት የሚገቡ ወጣት የማህበረሰብ አባላት መደበኛውን የራቢነት መሾም ይከተላሉ — ይህ አንዳንድ ጊዜ የትውልዶች መካከል ውጥረት ያስከትላል

## የማህበረሰቡ ጠቀሜታ

- የማህበረሰብ መሰረት — የመንፈሳዊ ስልጣን ምንጭ
- የሰግድና የበዓላት ሥነ-ሥርዓቶችን ይመራሉ
- ለማህበረሰብ ማንነት ወሳኝ — የኢትዮጵያ-ምንጭ ወግን ለቀጣዩ ትውልድ ማስተላለፍ

## ይህንንም ይመልከቱ

- [ቤታ እስራኤል](/am/glossary/beta-israel) — ማህበረሰቡ
- [ሰግድ](/am/glossary/sigd) — ቄሶች የሚመሩት በዓል
`,
    },
  },

  // 5. Aliyah from Ethiopia — overview
  {
    slug: "aliyah-from-ethiopia",
    category: "history",
    term: {
      he: "עליית יהודי אתיופיה",
      en: "Aliyah from Ethiopia",
      am: "ከኢትዮጵያ ዐሊያህ",
    },
    summary: {
      he: "כ-95,000 יהודים עלו מאתיופיה ב-3 גלים: סודן (1984-1985), שלמה (1991), ופלשמורה (2003-מתמשך).",
      en: "Approximately 95,000 Ethiopian Jews made aliyah in three waves: Sudan (1984-1985), Solomon (1991), and Falash Mura (2003-ongoing).",
      am: "በሶስት ሞገዶች ውስጥ ~95,000 የኢትዮጵያ አይሁዶች ወደ እስራኤል ሄዱ፦ ሱዳን (1984-1985)፣ ሰለሞን (1991)፣ እና ፋላሽ ሙራ (2003-አሁን ድረስ)።",
    },
    relatedRights: ["klita-basket", "falash-mura-direct-absorption"],
    relatedTerms: ["operation-moses", "operation-solomon", "falash-mura", "beta-israel"],
    bodies: {
      he: `## סקירה

עליית יהודי אתיופיה לישראל התרחשה בשלושה גלים מרכזיים, על פני כ-40 שנה. סך הכל עלו ~95,000 יהודים מאתיופיה.

## הגלים

### גל 1 — מסלול סודן (1977-1985)
- אלפי יהודים יצאו רגלית מצפון אתיופיה לסודן
- מבצע אחים, מבצע משה (1984), מבצע יהושע (1985)
- ~14,000 עולים, רבים נספו במסע

### גל 2 — מבצע שלמה (1991)
- 36 שעות, 14,325 איש על 35 מטוסים
- מ-אדיס אבבה לישראל בעקבות מלחמת אזרחים באתיופיה
- מנהיגות: ראש הממשלה שמיר, נכבדי הקהילה

### גל 3 — פלשמורה (2003-מתמשך)
- מסלול גיור > עלייה
- כ-30,000 פלשמורה עלו עד 2024
- עוד 7,000-12,000 ממתינים בגונדר ואדיס אבבה

## משמעות תרבותית-לאומית

- העלייה הראשונה בהיסטוריה של מדינת ישראל מאפריקה השחורה
- אישוש הזכות הקיומית של קהילה יהודית מחוץ לאירופה ולמזרח התיכון
- אתגרי קליטה יוצאי-דופן — שפה, תעסוקה, חינוך — שעדיין משפיעים על דור 2 ו-3

## ראו גם

- [מבצע משה](/he/glossary/operation-moses)
- [מבצע שלמה](/he/glossary/operation-solomon)
- [פלשמורה](/he/glossary/falash-mura)
- [ביתא ישראל](/he/glossary/beta-israel)
`,
      en: `## Overview

Aliyah from Ethiopia took place in three major waves spanning ~40 years. In total, ~95,000 Ethiopian Jews made aliyah.

## The waves

### Wave 1 — Sudan route (1977-1985)
- Thousands of Jews walked from northern Ethiopia to Sudan
- Operation Brothers, Operation Moses (1984), Operation Joshua (1985)
- ~14,000 olim; many died en route

### Wave 2 — Operation Solomon (1991)
- 36 hours, 14,325 people on 35 aircraft
- From Addis Ababa to Israel during the Ethiopian civil war
- Led by PM Shamir and community leadership

### Wave 3 — Falash Mura (2003-ongoing)
- Conversion → aliyah track
- ~30,000 Falash Mura have made aliyah through 2024
- An additional 7,000-12,000 await in Gondar and Addis Ababa

## National-cultural significance

- The first aliyah in Israel's history from sub-Saharan Africa
- Affirmed the existential validity of a Jewish community outside Europe and the Middle East
- Exceptional absorption challenges — language, employment, education — that still affect the 2nd and 3rd generations

## See also

- [Operation Moses](/en/glossary/operation-moses)
- [Operation Solomon](/en/glossary/operation-solomon)
- [Falash Mura](/en/glossary/falash-mura)
- [Beta Israel](/en/glossary/beta-israel)
`,
      am: `## ማጠቃለያ

ከኢትዮጵያ ዐሊያህ በ~40 ዓመታት ውስጥ በሶስት ዋና ሞገዶች ተካሄደ። በጠቅላላ ~95,000 የኢትዮጵያ አይሁዶች ወደ እስራኤል ሄደዋል።

## ሞገዶቹ

### ሞገድ 1 — የሱዳን መንገድ (1977-1985)
- ብዙ ሺዎች ከሰሜናዊ ኢትዮጵያ በእግራቸው ወደ ሱዳን ተጓዙ
- ኦፐሬሽን ብራዘርስ፣ ኦፐሬሽን ሙሴ (1984)፣ ኦፐሬሽን ዮሽዋ (1985)
- ~14,000 ኦሊም፣ ብዙዎች በመንገድ ላይ ሞተዋል

### ሞገድ 2 — ኦፐሬሽን ሰለሞን (1991)
- በ36 ሰዓታት ውስጥ፣ በ35 አውሮፕላኖች ላይ 14,325 ሰዎች
- ከአዲስ አበባ ወደ እስራኤል በኢትዮጵያ የእርስ በርስ ጦርነት ጊዜ
- በጠቅላይ ሚኒስትር ሻሚርና በማህበረሰብ መሪነት የተመራ

### ሞገድ 3 — ፋላሽ ሙራ (2003-አሁን ድረስ)
- መለወጥ → ዐሊያህ መንገድ
- እስከ 2024 ~30,000 ፋላሽ ሙራ ተሰደዱ
- ተጨማሪ 7,000-12,000 በጎንደርና አዲስ አበባ እየጠበቁ ናቸው

## ብሔራዊ-ባህላዊ ጠቀሜታ

- በእስራኤል ታሪክ ከሰሃራ በታች አፍሪካ የመጀመሪያው ዐሊያህ
- ከአውሮፓና ከመካከለኛው ምስራቅ ውጭ ያለ የአይሁድ ማህበረሰብ ሕልውና ማረጋገጥ
- ልዩ የመቀበል ፈተናዎች — ቋንቋ፣ ሥራ፣ ትምህርት — አሁንም 2ኛ እና 3ኛ ትውልዶችን የሚነኩ

## ይህንንም ይመልከቱ

- [ኦፐሬሽን ሙሴ](/am/glossary/operation-moses)
- [ኦፐሬሽን ሰለሞን](/am/glossary/operation-solomon)
- [ፋላሽ ሙራ](/am/glossary/falash-mura)
- [ቤታ እስራኤል](/am/glossary/beta-israel)
`,
    },
  },

  // 6. Operation Solomon
  {
    slug: "operation-solomon",
    category: "history",
    term: { he: "מבצע שלמה", en: "Operation Solomon", am: "ኦፐሬሽን ሰለሞን" },
    summary: {
      he: "מבצע 24-25 במאי 1991: 14,325 יהודים מאתיופיה לישראל ב-36 שעות, ב-35 מטוסים מאדיס אבבה.",
      en: "May 24-25, 1991: 14,325 Ethiopian Jews flown to Israel in 36 hours via 35 aircraft from Addis Ababa.",
      am: "ግንቦት 24-25፣ 1991: በ36 ሰዓታት ውስጥ በ35 አውሮፕላኖች ከአዲስ አበባ 14,325 የኢትዮጵያ አይሁዶች ወደ እስራኤል ተጓዙ።",
    },
    relatedRights: ["klita-basket"],
    relatedTerms: ["aliyah-from-ethiopia", "operation-moses", "beta-israel"],
    bodies: {
      he: `## תאריכי המבצע

24-25 במאי 1991 — בשיא מלחמת האזרחים באתיופיה (משטר מנגיסטו על-סף נפילה).

## המספרים

- 14,325 איש (כולל 7 לידות באוויר)
- 35 מטוסים: ש-El Al + 757 + IAF (חיל האוויר הישראלי)
- 36 שעות בלבד מהמטוס הראשון לאחרון
- אחת ההובלות האוויריות הצפופות ביותר בהיסטוריה — מטוס אחד ביצע את הטיסה בדגדוג של 1,088 איש (שיא גינס)

## הקדם-מבצע

- מאות נוצרים-יהודים (ביתא ישראל) הגיעו אדיס אבבה במהלך 1990 על-פי ההבטחה למסלול עלייה
- ראש הממשלה יצחק שמיר ניהל את המבצע, השר אריאל שרון פיקוד מבצעי
- "Operation Solomon" — שם הקוד, על-שם מלך שלמה (לפי המסורת, האתיופים צאצאי המלך)
- ארה"ב סייעה במשא ומתן עם משטר מנגיסטו — שילם 35 מיליון $ לשחרור

## משמעות בקהילה

- מהרגעים המכוננים בזיכרון הקהילתי
- תאריכי "1991" עוצמתיים — דור עולי 1991 מתאר עצמו ב-"בני שלמה"
- אנקור לזיכרון הקהילתי לדור 2

## הקליטה לאחר המבצע

- המרכזים: עזריאלי, מבשרת ציון, נתניה, חיפה
- בעיות: שפה (אמהרית/תיגרינית, מעט עברית), תעסוקה, חינוך לילדים
- גל גדול דורש משאבים ייחודיים — סל קליטה הופך למבנה כללי

## ראו גם

- [מבצע משה](/he/glossary/operation-moses) — הגל הקודם
- [עליית יהודי אתיופיה](/he/glossary/aliyah-from-ethiopia) — הסקירה הכוללת
`,
      en: `## Dates

May 24-25, 1991 — at the height of the Ethiopian civil war (the Mengistu regime on the verge of collapse).

## The numbers

- 14,325 people (including 7 in-flight births)
- 35 aircraft: El Al + 757 + IAF (Israeli Air Force)
- Just 36 hours from the first aircraft to the last
- One of the densest airlifts in history — a single flight carried 1,088 people (Guinness record)

## Pre-operation

- Hundreds of Ethiopian Jews (Beta Israel) had reached Addis Ababa during 1990 under the promise of an aliyah track
- PM Yitzhak Shamir led; Minister Ariel Sharon directed operations
- "Operation Solomon" — codename after King Solomon (by tradition, Ethiopian Jews trace ancestry to him)
- The U.S. mediated negotiations with the Mengistu regime — Israel paid $35M for the release

## Community significance

- One of the foundational moments in communal memory
- "1991" carries weight — the 1991 generation calls themselves "Sons of Solomon"
- An anchor for community memory of the second generation

## Post-operation absorption

- Centers: Azrieli, Mevasseret Zion, Netanya, Haifa
- Challenges: language (Amharic/Tigrinya, little Hebrew), employment, child education
- A large wave required dedicated resources — the klita basket became a generalized structure

## See also

- [Operation Moses](/en/glossary/operation-moses) — the previous wave
- [Aliyah from Ethiopia](/en/glossary/aliyah-from-ethiopia) — the overall survey
`,
      am: `## ቀኖች

ግንቦት 24-25፣ 1991 — በኢትዮጵያ የእርስ በርስ ጦርነት ማበቂያ ላይ (የመንግሥቱ መንግስት ለመዉደቅ በቅርብ የነበረበት ሰዓት)።

## ቁጥሮች

- 14,325 ሰዎች (በበረራ ላይ 7 ልጆችን ጨምሮ)
- 35 አውሮፕላኖች፦ ኤል ኣል + 757 + የእስራኤል የአየር ኃይል
- ከመጀመሪያው እስከ መጨረሻው አውሮፕላን 36 ሰዓታት ብቻ
- በታሪክ ከነበሩት የተጨናነቁ የአየር ጉዞዎች አንዱ — በአንድ በረራ 1,088 ሰዎች ተጓጉዘዋል (የጊነስ ሪከርድ)

## ከኦፐሬሽን በፊት

- በ1990 በመቶዎች የሚቆጠሩ የኢትዮጵያ አይሁዶች (ቤታ እስራኤል) በዐሊያህ መስመር ቃል ኪዳን አዲስ አበባ ደርሰው ነበር
- ጠቅላይ ሚኒስትር ይጽሐቅ ሻሚር መርቷል፤ ሚኒስትር አሪኤል ሻሮን ስራዎችን ይመራ ነበር
- "ኦፐሬሽን ሰለሞን" — ስሙ ከንጉሥ ሰለሞን ነው (በባህል የኢትዮጵያ አይሁዶች ራሳቸውን ከእሱ የመጡ ናቸው ይላሉ)
- ከመንግሥቱ አስተዳደር ጋር በመደራደር ላይ አሜሪካ አግዛለች — እስራኤል ለመፈቀድ $35 ሚሊዮን ከፍላለች

## የማህበረሰቡ ጠቀሜታ

- ከማህበረሰብ ትዝታ ግዙፍ ጊዜዎች አንዱ
- "1991" ክብደት አለው — የ1991 ትውልድ ራሱን "የሰለሞን ልጆች" ብሎ ይጠራል
- ለ2ኛ ትውልድ ማህበረሰብ ትዝታ መሰረት

## ከኦፐሬሽን በኋላ መቀበል

- ማዕከላት፦ አዝሪኤሊ፣ መቫሰሬት ጽዮን፣ ነታንያ፣ ሐይፋ
- ፈተናዎች፦ ቋንቋ (አማርኛ/ትግርኛ፣ አነስተኛ ዕብራይስጥ)፣ ሥራ፣ የልጆች ትምህርት
- ትልቅ ሞገድ የተወሰኑ ሀብቶች ይጠይቅ ነበር — የክሊታ ቅርጫት ወደ አጠቃላይ መዋቅር ሆነ

## ይህንንም ይመልከቱ

- [ኦፐሬሽን ሙሴ](/am/glossary/operation-moses) — ቀደም ያለው ሞገድ
- [ከኢትዮጵያ ዐሊያህ](/am/glossary/aliyah-from-ethiopia) — አጠቃላይ መግለጫ
`,
    },
  },

  // 7. Operation Moses
  {
    slug: "operation-moses",
    category: "history",
    term: { he: "מבצע משה", en: "Operation Moses", am: "ኦፐሬሽን ሙሴ" },
    summary: {
      he: "מבצע סודי בנובמבר 1984 - ינואר 1985: ~8,000 יהודים מסודן לישראל. מבצע אחים והמשכים של מסע סודן.",
      en: "Covert November 1984 - January 1985 operation: ~8,000 Ethiopian Jews from Sudan to Israel. Climax of the Sudan journey.",
      am: "በህዳር 1984 - ጥር 1985 የተደበቀ ኦፐሬሽን፦ ~8,000 የኢትዮጵያ አይሁዶች ከሱዳን ወደ እስራኤል። የሱዳን ጉዞ ቁንጮ።",
    },
    relatedRights: ["klita-basket"],
    relatedTerms: ["aliyah-from-ethiopia", "operation-solomon"],
    bodies: {
      he: `## תאריכי המבצע

נובמבר 1984 — 5 בינואר 1985 (כאשר נחשף בעיתון "וושינגטון פוסט" והופסק).

## הרקע — מסע סודן

מ-1977, אלפי יהודים מאתיופיה ברחו רגלית מצפון אתיופיה (גונדר, וולקאית) דרך מדבר סודן, אל מחנות פליטים בקרב גרסון, אום ראקובה, יבריקין ועוד. המסע ארך חודשים, רבים נספו ברעב, מחלות, ואלימות.

## מבצע משה (35 לילות)

- 35 לילות, 30 טיסות El Al + IAF
- מסלול: סודן (חרטום) → דרך אירופה → ישראל
- ~8,000 איש הוטסו
- כל הפעולה הייתה חשאית — לא מותר היה לאף עיתונאי או מסמך לחשוף את המבצע

## חשיפה והפסקה

5 בינואר 1985 — דליפה לוושינגטון פוסט הביאה לחשיפת המבצע. סודן הפסיקה את שיתוף הפעולה. ~1,500 יהודים נשארו בסודן ללא יציאה.

## מבצע יהושע (מרס 1985)

ארה"ב התערבה — מבצע יהושע (Operation Joshua, "Sheba") הוציא 800 איש נוספים. שאר הקהילה נותרו בסודן עד מבצעים מאוחרים יותר.

## משמעות

- העלייה ההמונית הראשונה מאתיופיה — סוללה את הדרך למבצע שלמה
- "מבצע משה" — קונוטציה תנכ"ית של "יציאת מצרים" של דור עולים
- כ-4,000 בני קהילה מתו במהלך 8 שנות מסע סודן (1977-1985)

## ראו גם

- [עליית יהודי אתיופיה](/he/glossary/aliyah-from-ethiopia) — הסקירה
- [מבצע שלמה](/he/glossary/operation-solomon) — הגל הבא
`,
      en: `## Dates

November 1984 - January 5, 1985 (when leaked to The Washington Post and halted).

## Background — the Sudan journey

From 1977, thousands of Ethiopian Jews fled on foot from northern Ethiopia (Gondar, Welkayit) through the Sudanese desert to refugee camps in Garson, Um Rakuba, Yabrikin, and others. The journey lasted months; many died of starvation, disease, and violence.

## Operation Moses (35 nights)

- 35 nights, 30 El Al + IAF flights
- Route: Sudan (Khartoum) → via Europe → Israel
- ~8,000 people airlifted
- The entire operation was clandestine — no journalists or documents were permitted to expose it

## Disclosure and halt

January 5, 1985 — a leak to The Washington Post led to the operation's disclosure. Sudan halted cooperation. ~1,500 Jews remained stranded in Sudan.

## Operation Joshua (March 1985)

The U.S. intervened — Operation Joshua ("Sheba") airlifted an additional 800 people. The rest of the community remained in Sudan until later operations.

## Significance

- The first mass aliyah from Ethiopia — paved the way for Operation Solomon
- "Operation Moses" — Biblical resonance with the "Exodus from Egypt" of an immigrant generation
- ~4,000 community members died during the 8 years of the Sudan journey (1977-1985)

## See also

- [Aliyah from Ethiopia](/en/glossary/aliyah-from-ethiopia) — overview
- [Operation Solomon](/en/glossary/operation-solomon) — the next wave
`,
      am: `## ቀኖች

ህዳር 1984 — ጥር 5፣ 1985 (ለዋሽንግተን ፖስት ሲዳረስ እና ሲቆም)።

## ዳራ — የሱዳን ጉዞ

ከ1977 ጀምሮ ብዙ ሺዎች የኢትዮጵያ አይሁዶች ከሰሜናዊ ኢትዮጵያ (ጎንደር፣ ወልቃይት) በእግራቸው በሱዳን በረሃ በኩል ወደ ጋርሰን፣ ኡም ራኩባ፣ ያብሪኪን እና ሌሎች የመጠለያ ካምፖች አምልጠው ነበር። ጉዞው ለወራት ቆየ፤ ብዙዎች በረሃብ፣ በህመምና በዓመፅ ሞተዋል።

## ኦፐሬሽን ሙሴ (35 ምሽቶች)

- 35 ምሽቶች፣ 30 የኤል ኣል + የእስራኤል የአየር ኃይል በረራዎች
- መንገድ፦ ሱዳን (ካርቱም) → በአውሮፓ በኩል → እስራኤል
- ~8,000 ሰዎች በአየር ተጉዘዋል
- ሁሉም ኦፐሬሽን በስውር ነበር — ምንም ጋዜጠኛ ወይም ሰነድ እንዲገልጥ አይፈቀድም ነበር

## ግልጽ መሆንና ማቆም

ጥር 5፣ 1985 — ለዋሽንግተን ፖስት የመጣ ዘገባ ኦፐሬሽኑን ለማጋለጥ አስችሎታል። ሱዳን ትብብርን አቋረጠች። ~1,500 አይሁዶች በሱዳን ቀርተዋል።

## ኦፐሬሽን ኢያሱ (መጋቢት 1985)

አሜሪካ ጣልቃ ገብታ — ኦፐሬሽን ኢያሱ ("ሸባ") ተጨማሪ 800 ሰዎችን አጓዛ። ቀሪ ማህበረሰቡ እስከ ቀጣይ ኦፐሬሽኖች በሱዳን ቆይቷል።

## ጠቀሜታ

- ከኢትዮጵያ የመጀመሪያው ብዙ ሕዝብ ዐሊያህ — ለኦፐሬሽን ሰለሞን መንገድ ከፍቷል
- "ኦፐሬሽን ሙሴ" — የስደተኞች ትውልድ "ከግብጽ መውጣት" መጽሐፍ ቅዱሳዊ ድምጽ
- በ8 ዓመታት የሱዳን ጉዞ (1977-1985) ~4,000 የማህበረሰብ አባላት ሞተዋል

## ይህንንም ይመልከቱ

- [ከኢትዮጵያ ዐሊያህ](/am/glossary/aliyah-from-ethiopia) — ማጠቃለያ
- [ኦፐሬሽን ሰለሞን](/am/glossary/operation-solomon) — ቀጣዩ ሞገድ
`,
    },
  },

  // 8. Tene Briut (org)
  {
    slug: "tene-briut",
    category: "organization",
    term: { he: "טנא בריאות", en: "Tene Briut", am: "ቴኔ ብሪዩት" },
    summary: {
      he: "ארגון בריאות הקהילה היחיד בישראל המתמקד ביוצאי אתיופיה. מפעיל מתאמי בריאות, תרגום רפואי, ופרויקטי מניעה.",
      en: "Israel's only community-health organization focused on Ethiopian-Israelis. Runs health navigators, medical translation, and prevention projects.",
      am: "በኢትዮጵያ-እስራኤላውያን ላይ ያተኮረች በእስራኤል ብቸኛዋ የማህበረሰብ ጤና ድርጅት። የጤና አማካሪዎች፣ የህክምና ትርጉም እና የመከላከያ ፕሮጀክቶችን ያካሂዳል።",
    },
    relatedRights: ["chronic-disease-prevention", "medical-translation-services"],
    relatedTerms: ["beta-israel"],
    sources: [{ title: "tene-briut.org.il", url: "https://www.tene-briut.org.il" }],
    bodies: {
      he: `## מה זה?

טנא בריאות הוא ארגון לא-ממשלתי המוקדש לבריאות יוצאי אתיופיה בישראל. המודל היחיד מסוגו — צוות מקצועי דובר אמהרית הפועל בכמעט כל קופות החולים והמרכזים בארץ.

## תכניות

- **מתאמי בריאות** — מלווים מטופלים בקופות חולים, בבתי חולים, ובהליכים מורכבים
- **שירות תרגום** — אמהרית/תיגרינית/עברית בזמן אמת בפגישות רפואיות
- **מניעת מחלות כרוניות** — סוכרת, יתר לחץ דם — אבחון מוקדם בקהילה
- **בריאות נפש** — ייעוץ לקהילה ומתן הכשרה למקצועות הסיוע
- **בריאות נשים** — פוריות, הריון, מניעה

## מבנה

- מטה: רחובות
- סניפים פעילים: ירושלים, נתניה, רחובות, ראשון לציון, באר שבע, חיפה, ועוד
- מימון: ממשלה, ביטוח לאומי, JDC, פילנתרופיה

## רלוונטיות לקהילה

- אנקור-קהילתי ל-Phase 6 (Health) של פורטל טדרוס — ראה ADR-011
- שותף חיוני בכל מהלך-בריאות-קהילתי
- ה-Default יחיד לאנשים שלא יודעים מי לשאול

## ראו גם

- [Right: מניעת מחלות כרוניות](/he/rights/chronic-disease-prevention) — שתופית עם טנא בריאות
- [Right: שירותי תרגום רפואי](/he/rights/medical-translation-services)
`,
      en: `## What is it?

Tene Briut is an NGO dedicated to the health of Ethiopian-Israelis. The model is unique — a culturally and linguistically Ethiopian-Israeli professional team operating across nearly every HMO and hospital in Israel.

## Programs

- **Health navigators** — accompany patients through HMOs, hospitals, and complex procedures
- **Translation service** — real-time Amharic/Tigrinya/Hebrew at medical appointments
- **Chronic disease prevention** — diabetes, hypertension — community-level early detection
- **Mental health** — community counseling and training for helping professions
- **Women's health** — fertility, pregnancy, prevention

## Structure

- HQ: Rehovot
- Active branches: Jerusalem, Netanya, Rehovot, Rishon LeZion, Beersheba, Haifa, and more
- Funding: government, National Insurance, JDC, philanthropic

## Community relevance

- The community anchor for Tedros Phase 6 (Health) — see ADR-011
- Essential partner in any community health initiative
- The default ask for anyone who doesn't know whom to ask

## See also

- [Right: chronic disease prevention](/en/rights/chronic-disease-prevention) — partnered with Tene Briut
- [Right: medical translation services](/en/rights/medical-translation-services)
`,
      am: `## ምንድ ነው?

ቴኔ ብሪዩት የኢትዮጵያ-እስራኤላውያን ጤና ላይ የሚሰራ መንግስታዊ ያልሆነ ድርጅት ነው። ሞዴሉ ልዩ ነው — በእስራኤል ውስጥ በሁሉም ኤች.ኤም.ኦ እና ሆስፒታሎች የሚሰራ የባህልና ቋንቋ የኢትዮጵያ-እስራኤላዊ ባለሙያ ቡድን አለው።

## ፕሮግራሞች

- **የጤና አማካሪዎች** — ታካሚዎችን በኤች.ኤም.ኦ፣ በሆስፒታሎች እና በውስብስብ ሂደቶች ያጅባሉ
- **የትርጉም አገልግሎት** — በህክምና ምክክሮች ላይ በቅጽበት አማርኛ/ትግርኛ/ዕብራይስጥ
- **ሥር-ሰደድ በሽታ መከላከል** — ስኳር በሽታ፣ የደም ግፊት — በማህበረሰብ ደረጃ ቀደም ብሎ መለየት
- **የአዕምሮ ጤና** — የማህበረሰብ ምክክርና ለድጋፍ ሙያዎች ሥልጠና
- **የሴቶች ጤና** — የመውለድ፣ እርግዝና፣ መከላከል

## መዋቅር

- ዋና መሥሪያ ቤት፦ ሬሆቮት
- ንቁ ቅርንጫፎች፦ ኢየሩሳሌም፣ ነታንያ፣ ሬሆቮት፣ ሪሾን ለጽዮን፣ ቤርሼባ፣ ሐይፋ እና ሌሎች
- ድጋፍ፦ መንግስት፣ ብሔራዊ ኢንሹራንስ፣ JDC፣ በጎ አድራጎት

## የማህበረሰቡ ጠቀሜታ

- ለቴድሮስ ምዕራፍ 6 (ጤና) የማህበረሰብ መሰረት — ADR-011 ይመልከቱ
- በማንኛውም የማህበረሰብ ጤና ኢኒሽዬቲቭ ውስጥ አስፈላጊ አጋር
- ለሚጠይቁ ወዴት እንደማይታወቅ ሰዎች ብቸኛው አማራጭ

## ይህንንም ይመልከቱ

- [Right: ሥር-ሰደድ በሽታ መከላከል](/am/rights/chronic-disease-prevention) — ከቴኔ ብሪዩት ጋር በአጋርነት
- [Right: የህክምና ትርጉም አገልግሎቶች](/am/rights/medical-translation-services)
`,
    },
  },

  // 9. Tebeka
  {
    slug: "tebeka",
    category: "organization",
    term: { he: "טבקה", en: "Tebeka", am: "ጠበቃ" },
    summary: {
      he: "מרכז סיוע משפטי ליוצאי אתיופיה. מנהיגה ארצית בנושאי גזענות, אכיפה, וזכויות אזרח.",
      en: "Legal aid center for Ethiopian-Israelis. National leader on issues of racism, law enforcement, and civil rights.",
      am: "ለኢትዮጵያ-እስራኤላውያን የሕግ ድጋፍ ማዕከል። በዘረኝነት፣ የሕግ አስከባሪ ኃይሎች እና የዜጎች መብቶች ጉዳዮች ብሔራዊ መሪ።",
    },
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["beta-israel"],
    sources: [{ title: "tebeka.org.il", url: "https://www.tebeka.org.il" }],
    bodies: {
      he: `## מה זה?

טבקה ("Tebeka", באמהרית: "מצדיק" / "סנגור") הוא מרכז סיוע משפטי ליוצאי אתיופיה. הוקם ב-2000 על-ידי עורך דין פנטהון אסיפה-דווית.

## תחומי פעולה

- **תביעות גזענות** — הגשת תלונות וייצוג משפטי בתביעות אזרחיות ופליליות
- **אכיפה משטרתית** — סיוע במקרי שימוש מופרז בכוח, אפליה, וגזענות מצד שוטרים
- **זכויות אזרח** — הגנה במקרים של אפליה בתעסוקה, דיור, וחינוך
- **השפעה ציבורית** — תזכירי-חוק לוועדת חוקה בכנסת, איחוד תזכירים בנושא קהילה
- **הסברה והכשרה** — סדנאות לקהילה על זכויות, ולסטודנטים אקדמיים

## מבנה

- מטה: ירושלים
- צוות: כ-25 עורכי דין דוברי אמהרית/עברית
- מימון: ממשלה (קורן הקרן הקיימת לישראל), JDC, פילנתרופיה
- מקרים שנתיים: ~2,000 (אומדן)

## רלוונטיות לקהילה

- אנקור-קהילתי ל-Phase 8 (Voice) של פורטל טדרוס — ראה ADR-011
- בריר-Default ראשון לכל מקרה אכיפה או אפליה
- מקור-מידע מוסמך לתחום משפטי

## ראו גם

- [Right: סיוע משפטי טבקה](/he/rights/tebeka-legal-aid) — שירות חינמי לזכאים
`,
      en: `## What is it?

Tebeka ("vindicator" / "advocate" in Amharic) is a legal aid center for Ethiopian-Israelis. Founded in 2000 by attorney Fentahun Assefa-Dawit.

## Activities

- **Racism litigation** — filing complaints and providing legal representation in civil and criminal suits
- **Police accountability** — assistance in cases of excessive force, discrimination, and racism by officers
- **Civil rights** — defense in cases of discrimination in employment, housing, and education
- **Public influence** — submissions to the Knesset Constitution Committee, position papers
- **Outreach and training** — community workshops on rights, and academic-student training

## Structure

- HQ: Jerusalem
- Staff: ~25 attorneys (Amharic/Hebrew speakers)
- Funding: government, KKL Foundation, JDC, philanthropic
- Annual cases: ~2,000 (estimate)

## Community relevance

- Community anchor for Tedros Phase 8 (Voice) — see ADR-011
- First default for any law-enforcement or discrimination incident
- Authoritative source on legal matters in the community

## See also

- [Right: Tebeka legal aid](/en/rights/tebeka-legal-aid) — free service for eligible community members
`,
      am: `## ምንድ ነው?

ጠበቃ (በአማርኛ "ጠበቃ" / "ተከራካሪ") ለኢትዮጵያ-እስራኤላውያን የሕግ ድጋፍ ማዕከል ነው። በ2000 በጠበቃ ፈንታሁን አሰፋ-ዳዊት ተመሥርቷል።

## የሥራ መስኮች

- **የዘረኝነት ክስ** — ቅሬታ ማቅረብ እና በሲቪልና ወንጀል ክሶች ሕጋዊ ውክልና መስጠት
- **የፖሊስ ተጠያቂነት** — በመኮንኖች ያለ ቁጥጥር ኃይል መጠቀም፣ መድሎ እና ዘረኝነት ጉዳዮች ድጋፍ
- **የዜጎች መብቶች** — በሥራ ቅጥር፣ መኖሪያ ቤት እና ትምህርት መድሎ ጉዳዮች መከላከል
- **የህዝብ ተጽእኖ** — ለኬሰት ሕገ-መንግስት ኮሚቴ ሕዝባዊ ሰነዶች ማቅረብ
- **አስተዋወቅና ስልጠና** — ለማህበረሰቡ የመብቶች አውደ ጥናት እና የአካዳሚክ-ተማሪ ስልጠና

## መዋቅር

- ዋና መሥሪያ ቤት፦ ኢየሩሳሌም
- ሰራተኞች፦ ~25 ጠበቆች (አማርኛ/ዕብራይስጥ ተናጋሪዎች)
- ድጋፍ፦ መንግስት፣ KKL ፋውንዴሽን፣ JDC፣ በጎ አድራጎት
- ዓመታዊ ጉዳዮች፦ ~2,000 (ግምት)

## የማህበረሰቡ ጠቀሜታ

- ለቴድሮስ ምዕራፍ 8 (ድምጽ) የማህበረሰብ መሰረት — ADR-011 ይመልከቱ
- ለማንኛውም የሕግ አስከባሪ ወይም መድሎ ክስተት የመጀመሪያ አማራጭ
- በማህበረሰቡ ለሕግ ጉዳዮች የሚታወቅ ምንጭ

## ይህንንም ይመልከቱ

- [Right: ጠበቃ የሕግ ድጋፍ](/am/rights/tebeka-legal-aid) — ለብቁ የማህበረሰብ አባላት ነጻ አገልግሎት
`,
    },
  },

  // 10. Olim Beyahad
  {
    slug: "olim-beyahad",
    category: "organization",
    term: { he: "עולים ביחד", en: "Olim Beyahad", am: "ኦሊም በያሐድ" },
    summary: {
      he: "ארגון מובילי קריירה לבוגרי תואר ראשון יוצאי אתיופיה. מקשר בין סטודנטים לבין מנטורים בכירים בכלכלה.",
      en: "A career-mentorship organization for Ethiopian-Israeli university graduates. Connects students with senior mentors in industry.",
      am: "ለኢትዮጵያ-እስራኤል ባችለር ምሩቃን የሥራ መንገድ የሚመራ ድርጅት። ተማሪዎችን ከኢንዱስትሪ መሪዎች ጋር ያገናኛል።",
    },
    relatedRights: ["mentorship-program-graduates"],
    relatedTerms: ["beta-israel"],
    sources: [{ title: "olim-beyahad.org.il", url: "https://www.olim-beyahad.org.il" }],
    bodies: {
      he: `## מה זה?

עולים ביחד הוא ארגון לא-ממשלתי שמתמקד בקידום מקצועי-תעסוקתי של בוגרי תואר ראשון יוצאי אתיופיה. הוקם ב-2007.

## תכניות

- **מנטורינג** — בוגר תואר ראשון נצמד למנטור בכיר בתעשייה (טכנולוגיה, פיננסים, חינוך, רפואה, וכו')
- **כיוונים תעסוקתיים** — סדנאות חיפוש עבודה, כתיבת קו"ח, ראיונות
- **קונקציונס** — אירועי נטוורקינג עם חברות מובילות (Microsoft, Google, IBM, EY, BDO ועוד)
- **תכנית הייטק** — שילוב בוגרים בעולם ההייטק עם תקופת חניכה

## מבנה

- ~1,500 בוגרים סיימו את התכנית מאז 2007
- 200+ מנטורים פעילים מ-150+ חברות
- מימון: חברות, ממשלה, JDC

## רלוונטיות לקהילה

- כלי מרכזי לסגירת פערי-קריירה אקדמיים-מקצועיים
- מודל-מסלול לרבים מבני הקהילה לתעסוקה איכותית

## ראו גם

- [Right: מנטורינג לבוגרים](/he/rights/mentorship-program-graduates)
`,
      en: `## What is it?

Olim Beyahad ("Rising Together") is an NGO focused on the career advancement of Ethiopian-Israeli university graduates. Founded in 2007.

## Programs

- **Mentorship** — first-degree graduate paired with a senior mentor in industry (tech, finance, education, medicine, etc.)
- **Career direction** — workshops on job searching, CV writing, and interviews
- **Connections** — networking events with leading firms (Microsoft, Google, IBM, EY, BDO, and more)
- **Hi-tech track** — graduate placement in the tech sector with apprenticeship period

## Structure

- ~1,500 graduates have completed the program since 2007
- 200+ active mentors from 150+ companies
- Funding: corporate, government, JDC

## Community relevance

- A primary tool for closing the academic-to-career gap
- A model track that many community members follow into quality employment

## See also

- [Right: graduate mentorship](/en/rights/mentorship-program-graduates)
`,
      am: `## ምንድ ነው?

ኦሊም በያሐድ (በዕብራይስጥ "ተባብረን ወጣን") በኢትዮጵያ-እስራኤል ዩኒቨርሲቲ ምሩቃን የሥራ መንገድ ላይ የሚሰራ መንግስታዊ ያልሆነ ድርጅት ነው። በ2007 ተመሥርቷል።

## ፕሮግራሞች

- **አማካሪነት** — የመጀመሪያ ዲግሪ ምሩቅ ከኢንዱስትሪ ከፍተኛ አማካሪ ጋር (ቴክ፣ ፋይናንስ፣ ትምህርት፣ ሕክምና፣ ወዘተ) ይጣመራል
- **የሥራ አቅጣጫ** — የሥራ ፍለጋ፣ የሲቪ ጻፊ እና የቃለ መጠይቅ አውደ ጥናት
- **ግንኙነቶች** — ከመሪ ድርጅቶች (ማይክሮሶፍት፣ ጉግል፣ አይቢኤም፣ ኢ.ዋይ፣ ቢ.ዲ.ኦ እና ሌሎች) ጋር የኔትወርኪንግ ክንውኖች
- **የቴክ መንገድ** — ምሩቅን ከስልጠና ጊዜ ጋር በቴክ ዘርፍ መመደብ

## መዋቅር

- ከ2007 ጀምሮ ~1,500 ምሩቃን ፕሮግራሙን አጠናቀዋል
- ከ150+ ኩባንያዎች 200+ ንቁ አማካሪዎች
- ድጋፍ፦ ድርጅታዊ፣ መንግስት፣ JDC

## የማህበረሰቡ ጠቀሜታ

- ለአካዳሚክ-ወደ-ሥራ ክፍተት መዝጊያ ዋነኛ መሳሪያ
- በብዙ የማህበረሰብ አባላት የሚከተሉት ሞዴል መንገድ

## ይህንንም ይመልከቱ

- [Right: የምሩቅ አማካሪነት](/am/rights/mentorship-program-graduates)
`,
    },
  },

  // 11. ENP
  {
    slug: "enp",
    category: "organization",
    term: {
      he: "ENP — שותפות לאומית לקהילה",
      en: "ENP — Ethiopian National Project",
      am: "ENP — የኢትዮጵያ ብሔራዊ ፕሮጀክት",
    },
    summary: {
      he: "מסגרת השותפות הלאומית לקידום הקהילה האתיופית-ישראלית, מפעילה תכניות חינוך, נוער, ומימון מצטיינים.",
      en: "A national partnership framework for advancing the Ethiopian-Israeli community, operating programs in education, youth, and excellence funding.",
      am: "የኢትዮጵያ-እስራኤል ማህበረሰብን ለማራመድ ብሔራዊ ሽርክና ማዕቀፍ፣ የትምህርት፣ የወጣቶችና የልህቀት ፋይናንስ ፕሮግራሞችን ያካሂዳል።",
    },
    relatedRights: ["bagrut-grant", "tech-career-bootcamp"],
    relatedTerms: ["beta-israel"],
    sources: [{ title: "enp.org.il", url: "https://www.enp.org.il" }],
    bodies: {
      he: `## מה זה?

ENP — Ethiopian National Project — היא שותפות-מסגרת בין ממשלת ישראל, הסוכנות היהודית, JDC, פדרציות בצפון אמריקה, ומשפחות-יהודיות-עם-קהילה. הוקמה ב-2001.

## תכניות עיקריות

- **SPACE (השלמה)** — תוכנית רב-שנתית לעזרה לימודית בתיכונים — מעל 4,500 חניכים בכיתות ז'-י"ב
- **SHALAV** — תכנית בית-ספרית לכיתות א'-ו'
- **מענק בגרות** — מימון תיכוניסטים מצטיינים יוצאי אתיופיה — ~1,000 חניכים בשנה
- **Tech-Career bootcamp** — מסלול הסבה להייטק — ~120 בוגרים בשנה
- **Israel Sci-Tech Alumni** — מסלול לקריירה מדעית

## מבנה

- מטה: ירושלים
- מימון: ממשלה (40%), JDC + פדרציות (40%), פילנתרופיה (20%)
- מספר נמצאים בתכניות: ~10,000 בני נוער ומבוגרים בשנה

## רלוונטיות לקהילה

- שותף-Tier-A במימון תכניות חינוך-נוער
- חיבור לקהילה הלאומית והבינ"ל
- "Default" לארגוני מימון ופילנתרופיה

## ראו גם

- [Right: מענק בגרות](/he/rights/bagrut-grant) — ENP ב-Tier-1
- [Right: Tech-Career bootcamp](/he/rights/tech-career-bootcamp)
`,
      en: `## What is it?

ENP — Ethiopian National Project — is a partnership framework between the Government of Israel, the Jewish Agency, JDC, North American federations, and Jewish-community-with-community families. Established in 2001.

## Main programs

- **SPACE** — multi-year academic-support program for high-schoolers — 4,500+ participants in grades 7-12
- **SHALAV** — school-based program for grades 1-6
- **Bagrut Grant** — funding for high-achieving Ethiopian-Israeli high-schoolers — ~1,000 participants/year
- **Tech-Career Bootcamp** — career-pivot program into tech — ~120 graduates/year
- **Israel Sci-Tech Alumni** — track to a science career

## Structure

- HQ: Jerusalem
- Funding: government (40%), JDC + federations (40%), philanthropy (20%)
- Annual reach: ~10,000 youth and adults in programs

## Community relevance

- Tier-A funding partner for education-and-youth programs
- Connection to national and international community
- "Default" reference among funding and philanthropy organizations

## See also

- [Right: Bagrut grant](/en/rights/bagrut-grant) — operated by ENP at Tier-1
- [Right: Tech-Career bootcamp](/en/rights/tech-career-bootcamp)
`,
      am: `## ምንድ ነው?

ENP — የኢትዮጵያ ብሔራዊ ፕሮጀክት — በእስራኤል መንግስት፣ በአይሁድ ኤጀንሲ፣ በJDC፣ በሰሜን አሜሪካ ፌዴሬሽኖች እና በአይሁድ-ማህበረሰብ-ቤተሰቦች መካከል የሽርክና ማዕቀፍ ነው። በ2001 ተመሥርቷል።

## ዋና ፕሮግራሞች

- **SPACE** — ለሁለተኛ ደረጃ ተማሪዎች የብዙ ዓመት የአካዳሚክ ድጋፍ ፕሮግራም — በ7-12ኛ ክፍል 4,500+ ተሳታፊዎች
- **SHALAV** — ለ1-6ኛ ክፍል የትምህርት ቤት ፕሮግራም
- **የባግሩት ስጦታ** — ለከፍተኛ ውጤት ላስመዘገቡ የኢትዮጵያ-እስራኤል ሁለተኛ ደረጃ ተማሪዎች ድጋፍ — በዓመት ~1,000 ተሳታፊዎች
- **የቴክ-ሥራ ቦትካምፕ** — ወደ ቴክ የሥራ መለወጫ ፕሮግራም — በዓመት ~120 ምሩቃን
- **የእስራኤል ሳይ-ቴክ ቀደምት ምሩቃን** — ወደ ሳይንስ ሥራ መንገድ

## መዋቅር

- ዋና መሥሪያ ቤት፦ ኢየሩሳሌም
- ድጋፍ፦ መንግስት (40%)፣ JDC + ፌዴሬሽኖች (40%)፣ በጎ አድራጎት (20%)
- ዓመታዊ ተደራሽነት፦ በፕሮግራሞች ~10,000 ወጣቶችና ጎልማሶች

## የማህበረሰቡ ጠቀሜታ

- ለትምህርት-እና-ወጣቶች ፕሮግራሞች የTier-A ድጋፍ አጋር
- ከብሔራዊና ዓለም አቀፍ ማህበረሰብ ጋር ግንኙነት
- በድጋፍና በጎ አድራጎት ድርጅቶች መካከል "Default" ማጣቀሻ

## ይህንንም ይመልከቱ

- [Right: የባግሩት ስጦታ](/am/rights/bagrut-grant) — በENP በTier-1 ይካሄዳል
- [Right: የቴክ-ሥራ ቦትካምፕ](/am/rights/tech-career-bootcamp)
`,
    },
  },

  // 12. Hesegim ISEF (programs)
  {
    slug: "hesegim-isef",
    category: "program",
    term: {
      he: "הישגים / ISEF — מצטיינים",
      en: "Hesegim / ISEF — Excellence",
      am: "ሄሰጊም / ISEF — ብቃት",
    },
    summary: {
      he: "תוכניות מימון לסטודנטים מצטיינים יוצאי אתיופיה במסלול לתואר ראשון ושני. כיסוי שכר לימוד + מענק חודשי.",
      en: "Funding programs for excellent Ethiopian-Israeli students pursuing a B.A. or M.A. Tuition coverage + monthly stipend.",
      am: "ለBA ወይም MA ለሚማሩ ምርጥ የኢትዮጵያ-እስራኤል ተማሪዎች የፋይናንስ ፕሮግራሞች። የትምህርት ክፍያ ሽፋን + ወርሃዊ ድጎማ።",
    },
    relatedRights: ["scholarship-aggregator"],
    relatedTerms: ["beta-israel", "enp"],
    sources: [
      { title: "isef.org.il", url: "https://www.isef.org.il" },
      {
        title: "Hesegim — gov",
        url: "https://www.gov.il/he/departments/topics/hesegim_program",
      },
    ],
    bodies: {
      he: `## מה זה?

"הישגים" / "ISEF" / "ISEF Foundation" הן תוכניות שכוללות מספר אופציות-מימון לסטודנטים מצטיינים יוצאי אתיופיה.

## תוכניות מרכזיות

### הישגים (ממשלתי)
- מימון מ-משרד-העלייה-והקליטה
- ~600 סטודנטים בשנה
- כיסוי 75% שכר לימוד + מענק חודשי 2,500 ₪
- דרישות: ממוצע 80+ בתיכון/אקדמיה

### ISEF
- קרן פרטית-פילנתרופית עם מטה בארה"ב
- ~400 סטודנטים בשנה
- כיסוי שכר לימוד מלא + מענק 3,000-3,500 ₪
- דרישות: ממוצע 85+ + פוטנציאל מנהיגות
- מסלולים: B.A., M.A., Ph.D.

## דרישות אופייניות

- אזרחות ישראלית + הוכחת מקור אתיופי (אחד ההורים נולד באתיופיה)
- ממוצע פסיכומטרי 580-650+ (תלוי תכנית)
- שירות צבאי או לאומי
- ראיון אישי (ל-ISEF)

## רלוונטיות לקהילה

- קריטיות לסגירת פער-אקדמי
- "Default" לסטודנטים יוצאי אתיופיה — אם לא הישגים, אז ISEF, ואם לא — חברות פרטיות

## ראו גם

- [Right: סוכן מילגות לסטודנטים](/he/rights/scholarship-aggregator) — מאגד את כל האופציות
- [ENP](/he/glossary/enp) — שותף עיקרי במימון
`,
      en: `## What is it?

"Hesegim" / "ISEF" / "ISEF Foundation" are programs offering several funding options for outstanding Ethiopian-Israeli students.

## Main programs

### Hesegim (government)
- Funded by the Ministry of Aliyah and Integration
- ~600 students/year
- 75% tuition coverage + 2,500 ILS monthly stipend
- Requirements: 80+ average in HS/academia

### ISEF
- Private philanthropic foundation, U.S.-headquartered
- ~400 students/year
- Full tuition coverage + 3,000-3,500 ILS stipend
- Requirements: 85+ average + leadership potential
- Tracks: B.A., M.A., Ph.D.

## Typical requirements

- Israeli citizenship + Ethiopian origin (one parent born in Ethiopia)
- Psychometric exam 580-650+ (depending on program)
- Military or national service
- Personal interview (for ISEF)

## Community relevance

- Critical for closing the academic gap
- "Default" for Ethiopian-Israeli students — if not Hesegim, then ISEF, otherwise private companies

## See also

- [Right: scholarship aggregator for students](/en/rights/scholarship-aggregator) — combines all options
- [ENP](/en/glossary/enp) — primary funding partner
`,
      am: `## ምንድ ነው?

"ሄሰጊም" / "ISEF" / "ISEF Foundation" ለታዋቂ የኢትዮጵያ-እስራኤል ተማሪዎች ብዙ የፋይናንስ አማራጮችን የሚያቀርቡ ፕሮግራሞች ናቸው።

## ዋና ፕሮግራሞች

### ሄሰጊም (መንግስታዊ)
- በዐሊያህና በመቀበል ሚኒስቴር የተደገፈ
- በዓመት ~600 ተማሪዎች
- 75% የትምህርት ክፍያ ሽፋን + ወርሃዊ 2,500 ሺ"ል ድጎማ
- መስፈርቶች፦ በሁለተኛ ደረጃ/አካዳሚ 80+ ኣማካይ

### ISEF
- የግል በጎ አድራጎት ፋውንዴሽን፣ ዋና መሥሪያ ቤት በአሜሪካ
- በዓመት ~400 ተማሪዎች
- ሙሉ የትምህርት ክፍያ ሽፋን + 3,000-3,500 ሺ"ል ድጎማ
- መስፈርቶች፦ 85+ ኣማካይ + የመሪነት አቅም
- መንገዶች፦ BA፣ MA፣ PhD

## የተለመዱ መስፈርቶች

- የእስራኤል ዜግነት + የኢትዮጵያ ምንጭ (ከወላጆች አንዱ በኢትዮጵያ የተወለደ)
- የሳይኮሜትሪክ ፈተና 580-650+ (በፕሮግራሙ ይወሰናል)
- ወታደራዊ ወይም ብሔራዊ አገልግሎት
- የግል ቃለ መጠይቅ (ለISEF)

## የማህበረሰቡ ጠቀሜታ

- የአካዳሚክ ክፍተትን ለመዝጋት ወሳኝ
- ለኢትዮጵያ-እስራኤል ተማሪዎች "Default" — ሄሰጊም ካልሆነ ISEF፣ ካልሆነ የግል ኩባንያዎች

## ይህንንም ይመልከቱ

- [Right: ለተማሪዎች የስኮላርሺፕ ሰብሳቢ](/am/rights/scholarship-aggregator) — ሁሉንም አማራጮች ያጣምራል
- [ENP](/am/glossary/enp) — ዋና የፋይናንስ አጋር
`,
    },
  },
];

// --- Merged export: Wave 1 + Wave 2 ----------------------------------------

export const GLOSSARY: GlossaryEntry[] = [...GLOSSARY_WAVE1, ...GLOSSARY_WAVE2];

// --- Helpers ----------------------------------------------------------------

export function pickLocale<T extends { he: string; en?: string; am?: string }>(
  t: T,
  locale: Locale,
): string {
  return t[locale] ?? t.he;
}

export function getEntryBodyForLocale(entry: GlossaryEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
