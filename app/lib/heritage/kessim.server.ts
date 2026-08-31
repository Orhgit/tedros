// Kessim & Ethiopian-community rabbis directory (TED-140).
//
// Official state directory of רבני העדה האתיופית — the kessim and community
// rabbis employed through the religious councils — grouped by city for the
// programmatic pages at /heritage/kessim and /heritage/kessim/$city.
//
// Data source (official): the Ministry of Religious Services dataset
// "רבני העדה האתיופית" on data.gov.il (dataset `ethiopianrav`, resource
// cd9f47b3-e4fa-42c9-ad6b-97410c78725b, resource last modified 2024-10-13),
// which mirrors the gov.il dynamic collector at
// https://www.gov.il/he/departments/dynamiccollectors/ethiopian_rabbinical_list
// The gov.il page itself blocks automated fetches (Cloudflare 403); the
// data.gov.il datastore API returned the full list — 75 entries: 46 kessim,
// 28 rabbis, and the Chief Rabbi of Ethiopian Jewry (Rabbi Reuven Wabashat).
//
// Names are kept exactly as published (Hebrew only — the state list is not
// published in other scripts). Phone numbers are kept verbatim as published,
// including one number (entry 7) that appears with an extra digit in the
// source. Do not "fix" data here — refresh from the dataset instead.
//
// Server-only module — do not import in client bundles.

import type { Locale } from "../i18n/config";
import { CITIES, type CityName } from "../cities/registry";

// ── source metadata (rendered on-page for attribution) ─────────────────────

export const KESSIM_SOURCE = {
  /** The friendly gov.il dynamic-collector page (human-facing source). */
  govUrl: "https://www.gov.il/he/departments/dynamiccollectors/ethiopian_rabbinical_list",
  /** The open-data mirror the entries were actually fetched from. */
  dataGovUrl: "https://data.gov.il/dataset/ethiopianrav",
  publisher: {
    he: "המשרד לשירותי דת",
    en: "Ministry of Religious Services",
    am: "የሃይማኖት አገልግሎት ሚኒስቴር",
  },
  /** Resource last-modified date on data.gov.il (YYYY-MM-DD). */
  updatedAt: "2024-10-13",
} as const;

// ── entries ────────────────────────────────────────────────────────────────

export type KessimPosition = "kes" | "rabbi" | "chief-rabbi";

export interface KessimEntry {
  /** `_id` in the data.gov.il datastore — stable per dataset revision. */
  id: number;
  position: KessimPosition;
  familyName: string;
  firstName: string;
  citySlug: string;
  /** Office phone as published by the ministry (verbatim). */
  phone?: string;
}

export const KESSIM_POSITION_LABELS: Record<KessimPosition, Record<Locale, string>> = {
  kes: { he: "קייס", en: "Kes", am: "ቄስ" },
  rabbi: { he: "רב", en: "Rabbi", am: "ረቢ" },
  "chief-rabbi": {
    he: "הרב הראשי ליהודי אתיופיה",
    en: "Chief Rabbi of Ethiopian Jewry",
    am: "የኢትዮጵያ አይሁዶች ዋና ረቢ",
  },
};

// Sorted by citySlug, then family name — the directory renders in this order.
export const KESSIM_DIRECTORY: KessimEntry[] = [
  {
    id: 2,
    position: "kes",
    familyName: "אברהם",
    firstName: "טסמה",
    citySlug: "afula",
    phone: "04-6593507",
  },
  {
    id: 27,
    position: "rabbi",
    familyName: "זאודה",
    firstName: "בנימין",
    citySlug: "afula",
    phone: "04-6593507",
  },
  {
    id: 34,
    position: "kes",
    familyName: "זמנה",
    firstName: "טסמה",
    citySlug: "afula",
    phone: "04-6593507",
  },
  {
    id: 64,
    position: "rabbi",
    familyName: "סולומון",
    firstName: "מברהטו",
    citySlug: "alon-shvut",
    phone: "02-5099103",
  },
  {
    id: 75,
    position: "rabbi",
    familyName: "שי",
    firstName: "אברהם",
    citySlug: "arad",
    phone: "08-9957269",
  },
  {
    id: 8,
    position: "kes",
    familyName: "אמביצ'ו",
    firstName: "איוב",
    citySlug: "ashdod",
    phone: "08-8630637",
  },
  {
    id: 48,
    position: "kes",
    familyName: "מהרט",
    firstName: "וובה",
    citySlug: "ashdod",
    phone: "08-8630637",
  },
  {
    id: 47,
    position: "rabbi",
    familyName: "מהרט",
    firstName: "מיכאל",
    citySlug: "ashdod",
    phone: "08-8630637",
  },
  {
    id: 51,
    position: "kes",
    familyName: "מלאסה",
    firstName: "אדאגו",
    citySlug: "ashdod",
    phone: "08-8630637",
  },
  {
    id: 1,
    position: "kes",
    familyName: "אביהו",
    firstName: "עזריה",
    citySlug: "ashkelon",
    phone: "08-6738402",
  },
  {
    id: 19,
    position: "kes",
    familyName: "גואנגול",
    firstName: 'צהייה(טסה"ה)',
    citySlug: "ashkelon",
    phone: "08-6738402",
  },
  {
    id: 36,
    position: "kes",
    familyName: "טגבו",
    firstName: "איילה",
    citySlug: "ashkelon",
    phone: "08-6738402",
  },
  {
    id: 45,
    position: "rabbi",
    familyName: "מדהני",
    firstName: "אילן",
    citySlug: "ashkelon",
    phone: "08-6738402",
  },
  {
    id: 21,
    position: "kes",
    familyName: "דנקו",
    firstName: "אדנה",
    citySlug: "bat-yam",
    phone: "03-5068883",
  },
  {
    id: 3,
    position: "kes",
    familyName: "אייאסו",
    firstName: "יצחק יחזקאל",
    citySlug: "beer-sheva",
    phone: "08-6204000",
  },
  {
    id: 12,
    position: "rabbi",
    familyName: "ביינה",
    firstName: "מזור",
    citySlug: "beer-sheva",
    phone: "08-6204000",
  },
  {
    id: 16,
    position: "kes",
    familyName: "ברוך טספהון",
    firstName: "מנטסנוט",
    citySlug: "beer-sheva",
    phone: "08-6204000",
  },
  {
    id: 17,
    position: "kes",
    familyName: "ברוק",
    firstName: "גובזיה",
    citySlug: "beer-sheva",
    phone: "08-6204000",
  },
  {
    id: 29,
    position: "kes",
    familyName: "זאודה",
    firstName: "אוריה",
    citySlug: "beer-sheva",
    phone: "08-6204000",
  },
  {
    id: 54,
    position: "rabbi",
    familyName: "מנגשה",
    firstName: "אליעזר",
    citySlug: "beer-sheva",
    phone: "08-6204000",
  },
  {
    id: 58,
    position: "kes",
    familyName: "מסרט",
    firstName: "ברוך",
    citySlug: "beer-sheva",
    phone: "08-6204000",
  },
  {
    id: 30,
    position: "rabbi",
    familyName: "זאודו",
    firstName: "אברהם אמיר",
    citySlug: "beit-shemesh",
    phone: "02-9912867",
  },
  {
    id: 72,
    position: "kes",
    familyName: "צגאי",
    firstName: "רחמים",
    citySlug: "beit-shemesh",
    phone: "02-9912867",
  },
  {
    id: 40,
    position: "kes",
    familyName: "יהייס",
    firstName: "נגטו",
    citySlug: "carmiel",
    phone: "04-9985630",
  },
  {
    id: 5,
    position: "kes",
    familyName: "אירני",
    firstName: "נגה",
    citySlug: "gedera",
    phone: "08-8592625",
  },
  {
    id: 66,
    position: "kes",
    familyName: "סיסאי",
    firstName: "סמו",
    citySlug: "gedera",
    phone: "08-8592625",
  },
  {
    id: 39,
    position: "kes",
    familyName: "טסמה",
    firstName: "גרמו",
    citySlug: "hadera",
    phone: "04-6337556",
  },
  {
    id: 42,
    position: "kes",
    familyName: "יוסף",
    firstName: "אדגואצ'או",
    citySlug: "hadera",
    phone: "04-6337556",
  },
  {
    id: 53,
    position: "rabbi",
    familyName: "מנגיסטו",
    firstName: "אמיר",
    citySlug: "hadera",
    phone: "04-6337556",
  },
  {
    id: 57,
    position: "kes",
    familyName: "מנשה ראובן",
    firstName: "אדגואצ'או",
    citySlug: "hadera",
    phone: "04-6337556",
  },
  {
    id: 55,
    position: "rabbi",
    familyName: "מנדפרו",
    firstName: "אליעזר",
    citySlug: "haifa",
    phone: "04-8605600",
  },
  {
    id: 68,
    position: "kes",
    familyName: "סמני",
    firstName: "פלקה",
    citySlug: "holon",
    phone: "03-5086000",
  },
  {
    id: 25,
    position: "chief-rabbi",
    familyName: "וובשת",
    firstName: "ראובן",
    citySlug: "jerusalem",
    phone: "02-5311335",
  },
  {
    id: 37,
    position: "rabbi",
    familyName: "טגניה",
    firstName: "חיים",
    citySlug: "jerusalem",
    phone: "02-6214888",
  },
  {
    id: 70,
    position: "rabbi",
    familyName: "סנבטו",
    firstName: "אלעד",
    citySlug: "jerusalem",
    phone: "02-6214888",
  },
  {
    id: 32,
    position: "kes",
    familyName: "זימרו",
    firstName: "קאסו",
    citySlug: "kfar-saba",
    phone: "09-7905600",
  },
  {
    id: 50,
    position: "kes",
    familyName: "מולה מאיר",
    firstName: "זריהון",
    citySlug: "kiryat-ekron",
    phone: "08-9354360",
  },
  {
    id: 6,
    position: "kes",
    familyName: "אלי",
    firstName: "וונדה",
    citySlug: "kiryat-gat",
    phone: "08-6881691",
  },
  {
    id: 15,
    position: "kes",
    familyName: "ברהנה",
    firstName: "אורי יהייס",
    citySlug: "kiryat-gat",
    phone: "08-6881691",
  },
  {
    id: 28,
    position: "rabbi",
    familyName: "זאודה",
    firstName: "אודי",
    citySlug: "kiryat-gat",
    phone: "08-6881691",
  },
  {
    id: 35,
    position: "rabbi",
    familyName: "זרו",
    firstName: "בנימן",
    citySlug: "kiryat-gat",
    phone: "08-6881691",
  },
  {
    id: 65,
    position: "kes",
    familyName: "סולומון",
    firstName: "נגה טרונך",
    citySlug: "kiryat-gat",
    phone: "08-6881691",
  },
  {
    id: 73,
    position: "kes",
    familyName: "ראובן",
    firstName: "אלמו",
    citySlug: "kiryat-gat",
    phone: "08-6881691",
  },
  {
    id: 7,
    position: "kes",
    familyName: "אלמו",
    firstName: "מרשה",
    citySlug: "kiryat-malakhi",
    phone: "08-88587867",
  },
  {
    id: 62,
    position: "kes",
    familyName: "סהלו",
    firstName: "רובל",
    citySlug: "kiryat-malakhi",
    phone: "08-8587867",
  },
  {
    id: 61,
    position: "rabbi",
    familyName: "סהלו",
    firstName: "שלמה",
    citySlug: "kiryat-malakhi",
    phone: "08-8587867",
  },
  {
    id: 4,
    position: "kes",
    familyName: "אייסה",
    firstName: "ירגה",
    citySlug: "lod",
    phone: "08-9224769",
  },
  {
    id: 43,
    position: "rabbi",
    familyName: "כבדה",
    firstName: "אליהו",
    citySlug: "lod",
    phone: "08-9224769",
  },
  {
    id: 22,
    position: "rabbi",
    familyName: "דסה",
    firstName: "גדי",
    citySlug: "migdal-haemek",
    phone: "04-6541849",
  },
  {
    id: 18,
    position: "rabbi",
    familyName: "ברקולין",
    firstName: "אהרון",
    citySlug: "ness-ziona",
    phone: "077-5020045",
  },
  {
    id: 9,
    position: "rabbi",
    familyName: "אנברם",
    firstName: "אברהם",
    citySlug: "netanya",
    phone: "09-8336324",
  },
  {
    id: 41,
    position: "kes",
    familyName: "יוסי - וובשט",
    firstName: "יאלו",
    citySlug: "netanya",
    phone: "09-8336324",
  },
  {
    id: 59,
    position: "kes",
    familyName: "משה איינאו",
    firstName: "יהייס",
    citySlug: "netanya",
    phone: "09-8336324",
  },
  {
    id: 14,
    position: "rabbi",
    familyName: "בירסאו",
    firstName: "דוד",
    citySlug: "netivot",
    phone: "08-9933555",
  },
  {
    id: 46,
    position: "kes",
    familyName: "מדהני",
    firstName: "סמואל",
    citySlug: "netivot",
    phone: "08-9933555",
  },
  {
    id: 69,
    position: "rabbi",
    familyName: "סנאי",
    firstName: "אברהם",
    citySlug: "pardes-hanna",
    phone: "04-6379502",
  },
  {
    id: 52,
    position: "kes",
    familyName: "מלקו",
    firstName: "פקדו",
    citySlug: "petach-tikva",
    phone: "03-9051501",
  },
  {
    id: 56,
    position: "rabbi",
    familyName: "מנדפרו",
    firstName: "משה",
    citySlug: "petach-tikva",
    phone: "03-6378232",
  },
  {
    id: 20,
    position: "rabbi",
    familyName: "גטהון",
    firstName: "זוהר",
    citySlug: "ramla",
    phone: "08-9225360",
  },
  {
    id: 24,
    position: "kes",
    familyName: "וובה",
    firstName: "אברהם",
    citySlug: "ramla",
    phone: "08-9225360",
  },
  {
    id: 26,
    position: "rabbi",
    familyName: "ווסי",
    firstName: "יורם",
    citySlug: "rehovot",
    phone: "08-9362681",
  },
  {
    id: 31,
    position: "rabbi",
    familyName: "זגאי",
    firstName: "יצחק",
    citySlug: "rehovot",
    phone: "08-9362681",
  },
  {
    id: 33,
    position: "kes",
    familyName: "זמנה",
    firstName: "מלקם",
    citySlug: "rehovot",
    phone: "08-9362681",
  },
  {
    id: 38,
    position: "kes",
    familyName: "טגנייה",
    firstName: "בירקו",
    citySlug: "rehovot",
    phone: "050-7919731",
  },
  {
    id: 44,
    position: "kes",
    familyName: "ליקאונט",
    firstName: "בימרו",
    citySlug: "rehovot",
    phone: "08-9362681",
  },
  {
    id: 74,
    position: "kes",
    familyName: "שבתאי סמי",
    firstName: "דסה",
    citySlug: "rehovot",
    phone: "08-9362681",
  },
  {
    id: 11,
    position: "rabbi",
    familyName: "בוגלה",
    firstName: "משה קפיאלו",
    citySlug: "rishon-lezion",
    phone: "03-9599571",
  },
  {
    id: 13,
    position: "kes",
    familyName: "ביסוור",
    firstName: "מנחם",
    citySlug: "rishon-lezion",
    phone: "03-9599571",
  },
  {
    id: 67,
    position: "kes",
    familyName: "סמאי",
    firstName: "אליס",
    citySlug: "rishon-lezion",
    phone: "03-9599571",
  },
  {
    id: 60,
    position: "rabbi",
    familyName: "סהלה",
    firstName: "יהודה",
    citySlug: "tel-aviv",
    phone: "03-6938930",
  },
  {
    id: 10,
    position: "kes",
    familyName: "באינסי",
    firstName: "אדיסו",
    citySlug: "yavne",
    phone: "08-9431287",
  },
  {
    id: 23,
    position: "kes",
    familyName: "דסלין",
    firstName: "ליג'אלם",
    citySlug: "yavne",
    phone: "08-9431287",
  },
  {
    id: 49,
    position: "rabbi",
    familyName: "מהרי",
    firstName: "יצחק",
    citySlug: "yavne",
    phone: "08-9431287",
  },
  {
    id: 63,
    position: "kes",
    familyName: "סהלו",
    firstName: "וורקו",
    citySlug: "yavne",
    phone: "08-9431287",
  },
  {
    id: 71,
    position: "kes",
    familyName: "פסחא",
    firstName: "טגאי",
    citySlug: "yehud",
    phone: "03-5360870",
  },
];

// ── cities ─────────────────────────────────────────────────────────────────
//
// 23 of the 31 directory cities exist in the main city registry — their
// names are reused from there so spellings stay consistent site-wide. The
// remaining 8 (below) appear only in the ministry list and carry their own
// trilingual names.

export interface KessimCity {
  slug: string;
  names: CityName;
  /** True when the city also has a /cities/$slug page to cross-link. */
  inRegistry: boolean;
}

const EXTRA_CITY_NAMES: Record<string, CityName> = {
  gedera: { he: "גדרה", en: "Gedera", am: "ገዴራ" },
  "ness-ziona": { he: "נס ציונה", en: "Ness Ziona", am: "ኔስ ጽዮና" },
  "migdal-haemek": { he: "מגדל העמק", en: "Migdal HaEmek", am: "ሚግዳል ሃዔመቅ" },
  hadera: { he: "חדרה", en: "Hadera", am: "ኻዴራ" },
  "kiryat-ekron": { he: "קרית עקרון", en: "Kiryat Ekron", am: "ኪርያት ዔክሮን" },
  "alon-shvut": { he: "אלון שבות", en: "Alon Shvut", am: "አሎን ሽቩት" },
  "pardes-hanna": { he: "פרדס חנה", en: "Pardes Hanna", am: "ፓርዴስ ሓና" },
  yehud: { he: "יהוד", en: "Yehud", am: "የሁድ" },
};

function buildKessimCities(): KessimCity[] {
  const slugs = Array.from(new Set(KESSIM_DIRECTORY.map((e) => e.citySlug))).sort();
  return slugs.map((slug) => {
    const registryCity = CITIES.find((c) => c.slug === slug);
    if (registryCity) {
      return { slug, names: registryCity.names, inRegistry: true };
    }
    const names = EXTRA_CITY_NAMES[slug];
    if (!names) {
      throw new Error(`kessim.server: no city names for slug "${slug}"`);
    }
    return { slug, names, inRegistry: false };
  });
}

/** All 31 directory cities, alphabetical by slug. */
export const KESSIM_CITIES: KessimCity[] = buildKessimCities();

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findKessimCity(slug: string): KessimCity | null {
  return KESSIM_CITIES.find((c) => c.slug === slug) ?? null;
}

export function kessimByCity(citySlug: string): KessimEntry[] {
  return KESSIM_DIRECTORY.filter((e) => e.citySlug === citySlug);
}

export function kessimPositionLabel(position: KessimPosition, locale: Locale): string {
  return KESSIM_POSITION_LABELS[position][locale];
}

/** Full display name as published: "קייס טסמה אברהם" style (title + first + family). */
export function kessimDisplayName(entry: KessimEntry, locale: Locale): string {
  return `${kessimPositionLabel(entry.position, locale)} ${entry.firstName} ${entry.familyName}`;
}

// ── long-form page copy ────────────────────────────────────────────────────
//
// Deliberately NOT in `messages/*.json`: every message file is bundled into
// the client, and these paragraphs are only ever rendered server-side. The
// short, reusable labels stay in messages; the prose lives here. Keeping it
// out of the bundle is what holds the size budget (TED-115).

export const KESSIM_COPY: Record<string, Record<Locale, string>> = {
  landingSubtitle: {
    he: "הרשימה הרשמית של המשרד לשירותי דת: קייסים ורבנים של העדה האתיופית המכהנים במועצות הדתיות, מסודרים לפי עיר, עם פרטי הקשר כפי שהם מפורסמים.",
    en: "The official Ministry of Religious Services list: kessim and Ethiopian-community rabbis serving in the religious councils, organized by city, with contact details exactly as published.",
    am: "የሃይማኖት አገልግሎት ሚኒስቴር ይፋዊ ዝርዝር፡ በሃይማኖት ምክር ቤቶች የሚያገለግሉ ቄሶችና የኢትዮጵያ ማኅበረሰብ ረቢዎች፣ በከተማ ተደራጅተው፣ እንደታተመው የመገናኛ መረጃ ጋር።",
  },
  phoneNote: {
    he: "מספרי הטלפון הם מספרי המשרד או המועצה הדתית כפי שפורסמו ברשימה הרשמית, ולא מספרים פרטיים.",
    en: "The phone numbers are office or religious-council numbers as published in the official list, not private numbers.",
    am: "የስልክ ቁጥሮቹ በይፋዊው ዝርዝር እንደታተሙት የቢሮ ወይም የሃይማኖት ምክር ቤት ቁጥሮች ናቸው እንጂ የግል ቁጥሮች አይደሉም።",
  },
  sourceCaveat: {
    he: "הרשימה משקפת את המצב במועד העדכון שלעיל ועשויה להשתנות. לפני פנייה מומלץ לאמת את פרטי הקשר מול המועצה הדתית בעיר.",
    en: "The list reflects the state of the data as of the update date above and may change. Before reaching out, verify the contact details with the religious council in that city.",
    am: "ዝርዝሩ ከላይ በተጠቀሰው የዘመነበት ቀን ያለውን ሁኔታ ያሳያል፣ ሊለወጥም ይችላል። ከመደወልዎ በፊት የመገናኛ መረጃውን በከተማው ካለው የሃይማኖት ምክር ቤት ጋር ያረጋግጡ።",
  },
  marriageCrosslinkBody: {
    he: "מאז 2018 הקייסים מוכרים ומוסמכים לערוך חופה וקידושין. המדריך לרישום נישואין מסביר מה לעשות ובאיזה סדר.",
    en: "Since 2018 the kessim have been recognized and authorized to officiate weddings. The marriage registration guide explains what to do and in what order.",
    am: "ከ2018 ጀምሮ ቄሶች ታውቀዋል፣ ሠርግ የመፈጸም ሥልጣንም አላቸው። የጋብቻ ምዝገባ መመሪያው ምን ማድረግ እንዳለብዎና በምን ቅደም ተከተል እንደሆነ ያብራራል።",
  },
};

export function kessimCopy(key: keyof typeof KESSIM_COPY, locale: Locale): string {
  return KESSIM_COPY[key]![locale];
}
