// Ethiopian wedding & henna supplier directory — category × city (TED-143).
//
// ── VERIFICATION POLICY — read before adding anything ─────────────────────
//
// Every supplier below was found through a public source and then RE-CHECKED
// in a second, independent verification pass on 2026-09-01, by fetching the
// source again and confirming (a) it resolves, (b) it belongs to the business
// named, and (c) it actually offers the stated service. Only businesses that
// publish their own public channel are listed. No phone numbers are stored
// here at all — the source link takes you to whatever the business itself
// publishes, which keeps us from ever republishing a number that has been
// retired or that turns out to be a private individual's.
//
// A directory with four real suppliers beats one with twenty plausible ones.
// Categories and cities that yielded nothing verifiable are NOT padded: the
// page says so in as many words and the join form becomes the call to action.
// `culinary/shops.server.ts` established this rule; it exists because
// fabricated directory entries do real harm — someone calls a business that
// does not exist, or a real business gets misattributed.
//
// ── What the second pass changed, and why it is worth recording ───────────
//
// The first research round proposed ten businesses. The verification pass
// rejected or corrected six of them, which is the whole argument for doing
// two passes:
//   - "טופ צלמים" (photography) — REJECTED. Genuine dedicated Ethiopian-sector
//     page, but it is a lead-generation aggregator matching clients to a pool
//     of photographers, not a photographer. No individual is identifiable
//     behind it. That leaves the photography category with nothing.
//   - "סמבו הפקות" — REJECTED twice over. The proposed city (Bat Yam) is
//     contradicted by two business directories, which both say Holon; and it
//     is a general events-attractions company (drummer circles, Brazilian
//     band, LED show) with traditional Ethiopian dress as one line item.
//     Filing it as an Ethiopian attire supplier oversold it.
//   - Migdal HaEmek, Lod and Ashdod were proposed as the cities for three
//     businesses; NONE of the three pages states a city. Those entries are
//     listed with no `citySlug`, so they appear on their category page and in
//     no city cell. Inventing the city would have been the fabrication.
//   - "סאני הפקות" was proposed for photography as well as henna. The page
//     shows no evidence of a photography service, so it is henna only.
//   - "ניגסת סבה" was proposed as an alternative name for the Netivot
//     business. Its page does not use that name, so it is not used here.
//
// ── `confidence`, precisely ───────────────────────────────────────────────
//
//   "current" — evidence of recent activity: dated content within about two
//               years, or a live site publishing current operating details.
//   "dated"   — the newest evidence found is old, OR the source carries no
//               recency evidence at all (several business pages served no
//               post dates). Either way: call before you travel.
//
// Adding an entry: find the business's own page, record the URL and the date
// you checked it, set `confidence` honestly, and set `citySlug` only if the
// page itself states the city. Do not "fill in" a city.
//
// HE is the source-of-truth locale. Server-only module (ADR-020).

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import {
  ALL_WEDDING_SUPPLIER_CATEGORIES,
  type WeddingSupplierCategory,
} from "./wedding-categories";

export type SupplierConfidence = "current" | "dated";

export interface WeddingSupplier {
  /** Business name in Hebrew, exactly as its own page writes it. */
  name: string;
  /** A business can legitimately serve more than one category. */
  categories: WeddingSupplierCategory[];
  /**
   * City slug from `cities/registry` — set ONLY when the business's own page
   * states the city. Businesses whose page states no location appear on the
   * category page and in no city cell.
   */
  citySlug?: string;
  /** Where the business is based, as its page states it. */
  area: Translatable;
  /** What the source says they supply. */
  offers: Translatable;
  /** The public page the business itself publishes. */
  sourceUrl: string;
  sourceLabel: Translatable;
  /** Year of the most recent DATED evidence on that source, when it has one. */
  sourceYear?: number;
  /** ISO date this entry was last checked against its source. */
  checkedAt: string;
  confidence: SupplierConfidence;
  /** Caveat rendered with the entry when the listing needs framing. */
  note?: Translatable;
}

const CHECKED = "2026-09-01";

export const WEDDING_SUPPLIERS: WeddingSupplier[] = [
  // ── Catering ────────────────────────────────────────────────────────────
  {
    name: "באלינג׳רה",
    categories: ["catering"],
    citySlug: "tel-aviv",
    area: {
      he: "תל אביב — מל\"ן 4 / הכובשים 39",
      en: "Tel Aviv — Malan 4 / HaKovshim 39",
      am: "ቴል አቪቭ — ማላን 4 / ሃኮቭሺም 39",
    },
    offers: {
      he: "מסעדה אתיופית עם עמוד אירועים וקייטרינג ייעודי: ארוחות קבוצתיות ואירועים פרטיים, תפריטי בשר וצמחוני.",
      en: "Ethiopian restaurant with a dedicated events-and-catering page: group meals and private events, meat and vegetarian menus.",
      am: "ለዝግጅቶችና ለምግብ አገልግሎት የተለየ ገጽ ያለው የኢትዮጵያ ምግብ ቤት፡ የቡድን ምግቦችና የግል ዝግጅቶች።",
    },
    sourceUrl: "https://www.balinjera.com/events",
    sourceLabel: {
      he: "אתר העסק — עמוד אירועים וקייטרינג",
      en: "The business's own site — events and catering page",
      am: "የንግዱ ድህረ ገጽ — የዝግጅትና የምግብ አገልግሎት ገጽ",
    },
    checkedAt: CHECKED,
    confidence: "current",
  },
  {
    name: "טף — פתרונות קולינריים מהמטבח האתיופי",
    categories: ["catering"],
    citySlug: "yavne",
    area: {
      he: "יבנה — רחוב הירדן פינת הפרת",
      en: "Yavne — HaYarden corner of HaPrat",
      am: "ያቭኔ — ሃያርደን ከሃፕራት ጋር በሚገናኝበት",
    },
    offers: {
      he: "מאפיית אינג'רה וקייטרינג מהמטבח האתיופי — מספקת אינג'רה בכמויות גדולות לאירועים.",
      en: "An injera bakery and Ethiopian-kitchen catering — supplies injera in large quantities for events.",
      am: "የእንጀራ ዳቦ ቤትና የኢትዮጵያ ምግብ አገልግሎት — ለዝግጅቶች እንጀራ በብዛት ያቀርባል።",
    },
    sourceUrl: "https://www.facebook.com/profile.php?id=100063769442894",
    sourceLabel: {
      he: "עמוד העסק בפייסבוק (מאשר את השם ואת יבנה)",
      en: "The business's Facebook page (confirms the name and Yavne)",
      am: "የንግዱ ፌስቡክ ገጽ (ስሙንና ያቭኔን ያረጋግጣል)",
    },
    sourceYear: 2021,
    checkedAt: CHECKED,
    confidence: "dated",
    note: {
      he: "העדות העצמאית העדכנית ביותר שנמצאה היא כתבה מקומית מאפריל 2021. לעסק אין אתר עצמאי. התקשרו לפני שאתם מזמינים.",
      en: "The most recent independent evidence found is a local news article from April 2021. The business has no site of its own. Call before ordering.",
      am: "የተገኘው የቅርብ ጊዜ ገለልተኛ ማስረጃ ከሚያዝያ 2021 የአካባቢ ዜና ዘገባ ነው። ከማዘዝዎ በፊት ይደውሉ።",
    },
  },
  {
    name: "קייטרינג אדיס-עלם",
    categories: ["catering"],
    area: {
      he: "העמוד אינו נוקב בעיר",
      en: "The page does not state a city",
      am: "ገጹ ከተማ አይጠቅስም",
    },
    offers: {
      he: "קייטרינג אתיופי לאירועים.",
      en: "Ethiopian catering for events.",
      am: "ለዝግጅቶች የኢትዮጵያ ምግብ አገልግሎት።",
    },
    sourceUrl: "https://www.facebook.com/adissalem05/",
    sourceLabel: {
      he: "עמוד העסק בפייסבוק",
      en: "The business's Facebook page",
      am: "የንግዱ ፌስቡክ ገጽ",
    },
    checkedAt: CHECKED,
    confidence: "dated",
    note: {
      he: "העמוד לא הציג תאריכי פרסום ולא ציין עיר, ולכן הרשומה מופיעה בקטגוריה בלבד ולא בעמוד עיר. אמתו שהעסק פעיל לפני שאתם מתכננים סביבו.",
      en: "The page showed no post dates and stated no city, so this entry appears in the category only and in no city page. Confirm the business is active before planning around it.",
      am: "ገጹ የመለጠፊያ ቀኖችን አላሳየም ከተማም አልጠቀሰም። ንግዱ ንቁ መሆኑን ያረጋግጡ።",
    },
  },

  // ── Dress + henna production ────────────────────────────────────────────
  {
    name: "דסטה הפקות",
    categories: ["dress", "henna-styling"],
    area: {
      he: "העמוד אינו נוקב בעיר — שירות לפי תיאום",
      en: "The page states no city — by arrangement",
      am: "ገጹ ከተማ አይጠቅስም — በስምምነት",
    },
    offers: {
      he: "הפקת חינה אתיופית מסורתית והשכרת ביגוד לאירוע — כאבות, שמלות רקומות, תכשיטים וציוד לטקס.",
      en: "Traditional Ethiopian henna production and event attire rental — kabas, embroidered dresses, jewellery and ceremony equipment.",
      am: "ባህላዊ የኢትዮጵያ ሒና ዝግጅትና የዝግጅት ልብስ ኪራይ — ካባዎች፣ የተጠለፉ ቀሚሶች፣ ጌጣጌጥና የሥነ ሥርዓት ቁሳቁስ።",
    },
    sourceUrl: "https://www.desta100.com/",
    sourceLabel: {
      he: "אתר העסק (עמוד אינסטגרם פעיל, עדכון אחרון יולי 2026)",
      en: "The business's own site (active Instagram, last updated July 2026)",
      am: "የንግዱ ድህረ ገጽ (ንቁ ኢንስታግራም፣ የመጨረሻ ዝማኔ ሐምሌ 2026)",
    },
    sourceYear: 2026,
    checkedAt: CHECKED,
    confidence: "current",
  },
  {
    name: "קאבה הפקות",
    categories: ["dress", "henna-styling"],
    area: {
      he: "העמוד אינו נוקב בעיר",
      en: "The page does not state a city",
      am: "ገጹ ከተማ አይጠቅስም",
    },
    offers: {
      he: "הפקת חינה אתיופית מסורתית והשכרת ביגוד וציוד לאירועים — כלשון העמוד עצמו.",
      en: "Traditional Ethiopian henna production and rental of attire and equipment for events — in the page's own words.",
      am: "ባህላዊ የኢትዮጵያ ሒና ዝግጅትና ለዝግጅቶች የልብስና የቁሳቁስ ኪራይ።",
    },
    sourceUrl: "https://www.instagram.com/kaba_hina/",
    sourceLabel: {
      he: "עמוד אינסטגרם עסקי",
      en: "Business Instagram account",
      am: "የንግድ ኢንስታግራም ገጽ",
    },
    sourceYear: 2024,
    checkedAt: CHECKED,
    confidence: "dated",
    note: {
      he: "הפרסום האחרון בעמוד הוא מאוגוסט 2024, והעמוד אינו נוקב בעיר. ודאו שהעסק עדיין פעיל.",
      en: "The most recent post on the page is from August 2024, and the page states no city. Confirm the business is still active.",
      am: "በገጹ ላይ የመጨረሻው ልጥፍ ከነሐሴ 2024 ነው። ንግዱ አሁንም ንቁ መሆኑን ያረጋግጡ።",
    },
  },
  {
    name: "שלי חינה מסורתית אתיופית",
    categories: ["dress", "henna-styling"],
    citySlug: "netivot",
    area: { he: "נתיבות", en: "Netivot", am: "ነቲቮት" },
    offers: {
      he: "ארגון ועיצוב טקס חינה אתיופי מסורתי, לצד תפירת תלבושות מסורתיות.",
      en: "Organising and styling a traditional Ethiopian henna ceremony, alongside tailoring traditional costumes.",
      am: "ባህላዊ የኢትዮጵያ ሒና ሥነ ሥርዓት ማዘጋጀትና ማስዋብ፣ ከባህላዊ አልባሳት ስፌት ጋር።",
    },
    sourceUrl: "https://slymogos.wixsite.com/shellyhenna",
    sourceLabel: {
      he: "אתר העסק (נוקב במפורש בנתיבות)",
      en: "The business's own site (states Netivot explicitly)",
      am: "የንግዱ ድህረ ገጽ (ነቲቮትን በግልጽ ይጠቅሳል)",
    },
    checkedAt: CHECKED,
    confidence: "dated",
    note: {
      he: "האתר חי ומפורט, אך אין בו תאריכים — לא ניתן היה לאמת עד כמה הוא עדכני.",
      en: "The site is live and detailed, but carries no dates — how current it is could not be verified.",
      am: "ድህረ ገጹ ንቁና ዝርዝር ነው፣ ቀኖች ግን የሉትም።",
    },
  },
  {
    name: "סאני הפקות חינה אתיופית מסורתית",
    categories: ["henna-styling"],
    citySlug: "rehovot",
    area: { he: "רחובות", en: "Rehovot", am: "ረሆቮት" },
    offers: {
      he: "הפקת טקס חינה אתיופי מסורתי.",
      en: "Production of a traditional Ethiopian henna ceremony.",
      am: "ባህላዊ የኢትዮጵያ ሒና ሥነ ሥርዓት ማዘጋጀት።",
    },
    sourceUrl:
      "https://www.facebook.com/p/%D7%A1%D7%90%D7%A0%D7%99-%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%97%D7%99%D7%A0%D7%94-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%AA-%D7%9E%D7%A1%D7%95%D7%A8%D7%AA%D7%99%D7%AA-100054391275999/",
    sourceLabel: {
      he: "עמוד העסק בפייסבוק (רחובות מופיעה בכותרת העמוד)",
      en: "The business's Facebook page (Rehovot appears in the page header)",
      am: "የንግዱ ፌስቡክ ገጽ (ረሆቮት በገጹ ራስጌ ላይ ይታያል)",
    },
    checkedAt: CHECKED,
    confidence: "dated",
    note: {
      he: "העמוד לא הציג תאריכי פרסום, ולכן לא ניתן היה לאמת שהעסק פעיל כעת.",
      en: "The page showed no post dates, so it could not be verified that the business is currently active.",
      am: "ገጹ የመለጠፊያ ቀኖችን አላሳየም።",
    },
  },
  {
    name: "AFRO BEAUTY HAIRSTYLE",
    categories: ["henna-styling"],
    citySlug: "netanya",
    area: { he: "נתניה — רזיאל 7", en: "Netanya — Raziel 7", am: "ነታንያ — ራዚኤል 7" },
    offers: {
      he: "מספרה המתמחה בצמות, צמות מיוחדות ותסרוקות כלה.",
      en: "A salon specialising in braids, special braids and bridal hair.",
      am: "በሹሩባ፣ በልዩ ሹሩባዎችና በሙሽራ ፀጉር አሠራር የተካነ የፀጉር ቤት።",
    },
    sourceUrl: "https://www.instagram.com/afro_beauty_hairstyle/",
    sourceLabel: {
      he: "עמוד אינסטגרם עסקי (כתובת ושעות פתיחה בעמוד)",
      en: "Business Instagram account (address and opening hours on the page)",
      am: "የንግድ ኢንስታግራም ገጽ (አድራሻና የሥራ ሰዓት በገጹ ላይ)",
    },
    sourceYear: 2024,
    checkedAt: CHECKED,
    confidence: "current",
  },
];

// ── category presentation ──────────────────────────────────────────────────

export const CATEGORY_NAMES: Record<WeddingSupplierCategory, Translatable> = {
  catering: {
    he: "קייטרינג אתיופי ואינג'רה",
    en: "Ethiopian catering and injera",
    am: "የኢትዮጵያ ምግብ አገልግሎትና እንጀራ",
  },
  dress: {
    he: "שמלות הבשה וכאבה — השכרה ותפירה",
    en: "Habesha dresses and kabas — rental and tailoring",
    am: "የሐበሻ ቀሚስና ካባ — ኪራይና ስፌት",
  },
  music: {
    he: "מוזיקה ולהקות אתיופיות",
    en: "Ethiopian music and bands",
    am: "የኢትዮጵያ ሙዚቃና ባንዶች",
  },
  "henna-styling": {
    he: "הפקת חינה, הלבשה ועיצוב שיער",
    en: "Henna production, dressing and hair styling",
    am: "የሒና ዝግጅት፣ አለባበስና የፀጉር አሠራር",
  },
  photography: {
    he: "צילום חתונה וחינה",
    en: "Wedding and henna photography",
    am: "የሰርግና የሒና ፎቶግራፍ",
  },
};

export const CATEGORY_INTROS: Record<WeddingSupplierCategory, Translatable> = {
  catering: {
    he: "שימו לב איפה זה נדרש: תצפיות בחתונות באולמות בישראל מצאו שהאוכל האתיופי כמעט ירד מתפריט האולם, ומוגש שם אוכל ישראלי. האוכל המסורתי — ואיתו הזמנת אינג'רה בכמויות — נמצא דווקא בחינה ובימי החגיגה בבית ובאוהל. שם תזדקקו לספק.",
    en: "Note where this is actually needed: observations at weddings in Israeli halls found that Ethiopian food has all but left the hall menu, and Israeli catering is served there. The traditional food — and with it ordering injera in quantity — belongs to the henna and to the home-and-tent celebration days. That is where you will need a supplier.",
    am: "የት እንደሚያስፈልግ ልብ ይበሉ፡ በእስራኤል አዳራሾች የተደረጉ ምልከታዎች የኢትዮጵያ ምግብ ከአዳራሹ ምናሌ ወጥቷል ማለት ይቻላል። ባህላዊው ምግብ — እንጀራንም በብዛት ማዘዝ — በሒናና በቤት ክብረ በዓል ቀናት ላይ ነው።",
  },
  dress: {
    he: "כאבה לחתן ולכלה, שמלות רקומות בטיבב, תכשיטים מסורתיים וציוד לטקס — כמעט הכול בהשכרה. חנות קמעונאית לשמלות הבשה בישראל לא נמצאה בחיפוש, וגם לא ספק אונליין שאפשר לאמת.",
    en: "Kabas for the couple, dresses embroidered with tibeb, traditional jewellery and ceremony equipment — almost all of it for rental. The search found no retail shop for habesha dresses in Israel, and no verifiable online seller either.",
    am: "ለሙሽሮች ካባ፣ በጥበብ የተጠለፉ ቀሚሶች፣ ባህላዊ ጌጣጌጥና የሥነ ሥርዓት ቁሳቁስ — ሁሉም ማለት ይቻላል ለኪራይ። በእስራኤል የሐበሻ ቀሚስ ችርቻሮ ሱቅ አልተገኘም።",
  },
  music: {
    he: "אזמרי, מסינקו, כרר ותופים. מוזיקאים אתיופים בישראל מוזמנים כמעט אך ורק מפה לאוזן, ובחיפוש שלנו לא עלה אף עסק עם נוכחות מקוונת שאפשר לאמת. אם אתם מכירים אחד — או מנגנים בעצמכם — זה בדיוק המקום שבו רשומה אחת אמיתית תשנה משהו.",
    en: "Azmari singers, masinko, krar and drums. Ethiopian musicians in Israel are booked almost entirely by word of mouth, and our search surfaced no business with a verifiable online presence. If you know one — or play yourself — this is exactly the place where one real entry would change something.",
    am: "አዝማሪ፣ ማሲንቆ፣ ክራርና ከበሮ። በእስራኤል ያሉ የኢትዮጵያ ሙዚቀኞች ከአፍ ወደ አፍ ብቻ ይያዛሉ፤ በፍለጋችንም ሊረጋገጥ የሚችል የመስመር ላይ ንግድ አልተገኘም።",
  },
  "henna-styling": {
    he: "הפקת טקס החינה מקצה לקצה: הלבשת החתן, הכלה והמשפחה, עיצוב המרחב, כניסה מסורתית, וקליעת שורובה ותסרוקות כלה. זו הקטגוריה העשירה ביותר במדריך — ולא במקרה, כי החינה היא השלב שבו המסורת חיה היום.",
    en: "End-to-end production of the henna ceremony: dressing the couple and the family, styling the space, the traditional entrance, and shuruba braiding and bridal hair. This is the fullest category in the directory — not by accident, because the henna is the stage where the tradition lives today.",
    am: "የሒና ሥነ ሥርዓትን ከጫፍ እስከ ጫፍ ማዘጋጀት፡ ሙሽሮችንና ቤተሰብን ማልበስ፣ ቦታውን ማስዋብ፣ የሹሩባ ሽርባና የሙሽራ ፀጉር። በማውጫው ውስጥ ሙሉው ምድብ ይህ ነው።",
  },
  photography: {
    he: "צלמים עם ניסיון מוצהר בחתונה ובחינה אתיופית — כלומר כאלה שיודעים מתי מגיעה הכניסה ומה לא לפספס. לא נמצא סטודיו עצמאי כזה שאפשר לאמת. אתר אחד הציע התאמת צלם למגזר האתיופי, אבל הוא מתווך לידים ולא צלם, ולכן אינו מופיע כאן.",
    en: "Photographers with declared experience of Ethiopian weddings and henna — the kind who know when the entrance happens and what not to miss. No such independent studio could be verified. One site did offer to match you with a photographer for the Ethiopian sector, but it is a lead broker rather than a photographer, so it is not listed here.",
    am: "በኢትዮጵያ ሰርግና ሒና የተረጋገጠ ልምድ ያላቸው ፎቶግራፍ አንሺዎች። ሊረጋገጥ የሚችል ገለልተኛ ስቱዲዮ አልተገኘም። አንድ ድህረ ገጽ አቅርቦ ነበር፣ ግን የደንበኛ አገናኝ እንጂ ፎቶግራፍ አንሺ አይደለም።",
  },
};

// ── lookups ────────────────────────────────────────────────────────────────

export function localized(value: Translatable, locale: Locale): string {
  return value[locale] ?? value[DEFAULT_LOCALE] ?? value.he;
}

export function suppliersByCategory(
  category: WeddingSupplierCategory,
): WeddingSupplier[] {
  return WEDDING_SUPPLIERS.filter((s) => s.categories.includes(category));
}

export function suppliersByCategoryCity(
  category: WeddingSupplierCategory,
  citySlug: string,
): WeddingSupplier[] {
  return suppliersByCategory(category).filter((s) => s.citySlug === citySlug);
}

/** City slugs with at least one verified supplier in this category. */
export function citiesForCategory(category: WeddingSupplierCategory): string[] {
  const out: string[] = [];
  for (const s of suppliersByCategory(category)) {
    if (s.citySlug && !out.includes(s.citySlug)) out.push(s.citySlug);
  }
  return out;
}

/** Every category × city cell that has at least one verified supplier. */
export function weddingSupplierCells(): Array<{
  category: WeddingSupplierCategory;
  citySlug: string;
}> {
  const out: Array<{ category: WeddingSupplierCategory; citySlug: string }> = [];
  for (const category of ALL_WEDDING_SUPPLIER_CATEGORIES) {
    for (const citySlug of citiesForCategory(category)) {
      out.push({ category, citySlug });
    }
  }
  return out;
}

export function categoryName(
  category: WeddingSupplierCategory,
  locale: Locale,
): string {
  return localized(CATEGORY_NAMES[category], locale);
}

export function categoryIntro(
  category: WeddingSupplierCategory,
  locale: Locale,
): string {
  return localized(CATEGORY_INTROS[category], locale);
}

/**
 * "3 ספקים מאומתים · 2 ערים" / "אין עדיין ספק מאומת".
 * Built here rather than from `messages/*` so the pluralisation and the
 * honest zero-state stay next to the data they describe.
 */
export function supplierCountLabel(
  count: number,
  cityCount: number,
  locale: Locale,
): string {
  if (count === 0) {
    return locale === "he"
      ? "אין עדיין ספק מאומת"
      : locale === "am"
        ? "ገና የተረጋገጠ አቅራቢ የለም"
        : "No verified supplier yet";
  }
  const suppliers =
    locale === "he"
      ? `${count} ${count === 1 ? "ספק מאומת" : "ספקים מאומתים"}`
      : locale === "am"
        ? `${count} የተረጋገጡ አቅራቢዎች`
        : `${count} verified ${count === 1 ? "supplier" : "suppliers"}`;
  if (cityCount === 0) return suppliers;
  const cities =
    locale === "he"
      ? `${cityCount} ${cityCount === 1 ? "עיר" : "ערים"}`
      : locale === "am"
        ? `${cityCount} ከተሞች`
        : `${cityCount} ${cityCount === 1 ? "city" : "cities"}`;
  return `${suppliers} · ${cities}`;
}

// ── page titles and meta descriptions ──────────────────────────────────────
//
// Built here rather than from `messages/*` because they interpolate the
// category and city names and would otherwise need six more dictionary keys
// shipped in three locales to every client (ADR-020 §3).

export function categoryPageTitle(
  category: WeddingSupplierCategory,
  locale: Locale,
): string {
  const name = categoryName(category, locale);
  if (locale === "he") return `${name} — ספקים לחתונה וחינה אתיופית`;
  if (locale === "am") return `${name} — ለኢትዮጵያ ሰርግና ሒና አቅራቢዎች`;
  return `${name} — suppliers for an Ethiopian wedding and henna`;
}

export function categoryPageDescription(
  category: WeddingSupplierCategory,
  count: number,
  locale: Locale,
): string {
  const name = categoryName(category, locale);
  if (count === 0) {
    if (locale === "he")
      return `${name}: עדיין לא אימתנו אף ספק בקטגוריה הזאת. אנחנו לא ממציאים רשומות — אם אתם מכירים עסק, הוסיפו אותו.`;
    if (locale === "am")
      return `${name}፡ በዚህ ምድብ ገና አንድም አቅራቢ አላረጋገጥንም። መዝገቦችን አንፈጥርም።`;
    return `${name}: we have not yet verified a single supplier in this category. We do not invent entries — if you know a business, add it.`;
  }
  if (locale === "he")
    return `${count} ספקים מאומתים ל${name} בישראל — כל אחד עם מקור פומבי ותאריך בדיקה. בלי רשומות מומצאות.`;
  if (locale === "am")
    return `በእስራኤል ${count} የተረጋገጡ አቅራቢዎች — እያንዳንዱ ይፋዊ ምንጭና የምርመራ ቀን ያለው።`;
  return `${count} verified suppliers for ${name} in Israel — each with a public source and a check date. No invented entries.`;
}

export function cityPageTitle(
  category: WeddingSupplierCategory,
  city: string,
  locale: Locale,
): string {
  const name = categoryName(category, locale);
  if (locale === "he") return `${name} ב${city}`;
  if (locale === "am") return `${name} በ${city}`;
  return `${name} in ${city}`;
}

export function cityPageDescription(
  category: WeddingSupplierCategory,
  city: string,
  count: number,
  locale: Locale,
): string {
  const name = categoryName(category, locale);
  if (locale === "he")
    return `${count} ${count === 1 ? "ספק מאומת" : "ספקים מאומתים"} ל${name} ב${city} — עם מקור פומבי ותאריך בדיקה לכל רשומה.`;
  if (locale === "am")
    return `በ${city} ${count} የተረጋገጡ አቅራቢዎች — ለእያንዳንዱ መዝገብ ይፋዊ ምንጭና የምርመራ ቀን።`;
  return `${count} verified ${count === 1 ? "supplier" : "suppliers"} for ${name} in ${city} — with a public source and check date for every entry.`;
}

/** Loader-shaped projection — resolves one locale, drops the rest. */
export function presentSupplier(supplier: WeddingSupplier, locale: Locale) {
  return {
    name: supplier.name,
    area: localized(supplier.area, locale),
    offers: localized(supplier.offers, locale),
    sourceUrl: supplier.sourceUrl,
    sourceLabel: localized(supplier.sourceLabel, locale),
    sourceYear: supplier.sourceYear ?? null,
    checkedAt: supplier.checkedAt,
    confidence: supplier.confidence,
    note: supplier.note ? localized(supplier.note, locale) : null,
  };
}
