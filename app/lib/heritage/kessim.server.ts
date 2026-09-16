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
  /**
   * When we last re-ran the roster against the live datastore (TED-170).
   * 2026-09-16: `package_show?id=ethiopianrav` still reports a single resource
   * `cd9f47b3-…`, `last_modified` 2024-10-13 and `metadata_modified`
   * 2024-10-13 — i.e. no newer version of the list exists. All 75 records
   * re-fetched and diffed field-by-field against the entries below:
   * 75/75 present, zero additions, zero removals, zero mismatches on
   * position, familyName, firstName or phone. 31 distinct `Place` values,
   * matching the 31 city slugs. No corrections were required.
   */
  recheckedAt: "2026-09-16",
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
    he: "החלטת הממשלה מ-2018 הכירה במעמד הקייסים ושילבה אותם במועצות הדתיות — אבל היא אינה אישור אוטומטי לערוך חופה וקידושין, שהוא אישור אישי. המדריך לרישום נישואין מסביר מה לבדוק, את מי לשאול ובאיזה סדר.",
    en: "The 2018 government decision recognized the status of the kessim and integrated them into the religious councils — but it is not an automatic permit to officiate a wedding, which is granted personally. The marriage registration guide explains what to check, whom to ask, and in what order.",
    am: "የ2018 የመንግሥት ውሳኔ የቄሶችን ደረጃ አውቆ በሃይማኖት ምክር ቤቶች አካቷቸዋል — ነገር ግን ሠርግ ለመፈጸም ራስ-ሰር ፈቃድ አይደለም፤ ፈቃዱ የግል ነው። የጋብቻ ምዝገባ መመሪያው ምን ማጣራት እንዳለብዎ፣ ማንን መጠየቅ እንዳለብዎና በምን ቅደም ተከተል እንደሆነ ያብራራል።",
  },
};

export function kessimCopy(key: keyof typeof KESSIM_COPY, locale: Locale): string {
  return KESSIM_COPY[key]![locale];
}

// ── what a reader actually needs (TED-170) ─────────────────────────────────
//
// The directory shipped as a roster: 75 names, 31 cities, phone numbers. The
// Search Console check that opened TED-170 found it earned ZERO impressions
// in 90 days, while the national, definitional queries — "kessim" (60 impr,
// avg pos 4.8), "קייסים", "קסים", "מה זה קייס" — were being answered by the
// glossary and by rights cells that TED-172 is about to redirect away.
//
// So the demand is "who is a kes and how do I approach one", not "a kes in my
// city". The roster is the asset; this section is the answer. It renders on
// the landing page (where the demand actually lands) and on each city page
// (which otherwise carries no reason to read past the phone numbers).
//
// Sources for this section:
// - Israeliana, "מסורת ומורשת בקהילת יוצאי אתיופיה בישראל: דת ואמונה" — the
//   kes as the chief religious authority in Beta Israel, ordination by years
//   of study and examination, and his role in weddings (including the kushera
//   cord), mourning and tazkar, brit mila and post-birth purification, the
//   three daily prayers, and the festival cycle.
// - Davar, davar1.co.il/157433 — the mass Sigd ceremony on the Armon HaNatziv
//   promenade is led by the community's rabbis and kessim, reading from the
//   Orit / Metzhaf Kedus.
// - Government decision 3649 (19.02.2018) — kessim recognized as the
//   community's spiritual leaders, with funded posts in religious councils.
//   See the correction note in marriage.server.ts: it is NOT an officiant's
//   permit, and the wedding entry below says so.
// - The ministry roster itself (KESSIM_SOURCE) — the published numbers are
//   office / religious-council numbers, which is why the copy tells readers
//   to call the council rather than hunt for a private line.
//
// No monetary amounts appear here by design: whether a family pays anything,
// and how much, varies by council and by ceremony and is published nowhere
// citable. The copy tells the reader to ask rather than guessing for them
// (ADR-021 §3).

export interface KessimTopic {
  id: string;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}

/** Which ceremonies a kes is approached for, most urgent first. */
export const KESSIM_CEREMONIES: KessimTopic[] = [
  {
    id: "mourning",
    title: {
      he: "אבלות, לוויה ואזכרה (תזכאר)",
      en: "Mourning, funeral and memorial (tazkar)",
      am: "ሐዘን፣ ቀብርና ተዝካር",
    },
    body: {
      he: "זו הפנייה הנפוצה ביותר, והדחופה ביותר. הקס מוביל את תפילות הלוויה, מלווה את המשפחה בימי האבל, ומנהל את טקס התזכאר — האזכרה שנערכת במועדים קבועים אחרי הפטירה ומכנסת את המשפחה המורחבת. בפועל, כשיש פטירה במשפחה, המועצה הדתית בעיר היא הכתובת הראשונה, והיא זו שתקשר אתכם לקס שמכהן באזור. אל תחכו לשעות משרד — לחברה קדישא ולמועצות הדתיות יש מענה גם מחוץ להן.",
      en: "This is the most common reason to look for a kes, and the most urgent. The kes leads the funeral prayers, accompanies the family through the mourning days, and conducts the tazkar — the memorial held at set intervals after a death, which gathers the extended family. In practice, when there is a death in the family the city's religious council is the first address, and it is the council that connects you to the kes serving the area. Do not wait for office hours — the burial society and the religious councils answer outside them too.",
      am: "ይህ ቄስ የሚፈለግበት በጣም የተለመደውና አጣዳፊው ምክንያት ነው። ቄሱ የቀብር ጸሎቶችን ይመራል፣ ቤተሰቡን በሐዘን ቀናት ያጅባል፣ ተዝካሩንም ይመራል — ከሞት በኋላ በተወሰኑ ጊዜያት የሚደረገውና ሰፊውን ቤተሰብ የሚሰበስበው መታሰቢያ። በተግባር በቤተሰብ ውስጥ ሞት ሲከሰት የከተማው የሃይማኖት ምክር ቤት የመጀመሪያው አድራሻ ነው፤ በአካባቢው የሚያገለግለውን ቄስ የሚያገናኝዎትም እሱ ነው። የቢሮ ሰዓት አይጠብቁ — የቀብር ማኅበሩና የሃይማኖት ምክር ቤቶች ከሰዓቱ ውጭም ይመልሳሉ።",
    },
  },
  {
    id: "wedding",
    title: {
      he: "חתונה — הטקס המסורתי לצד החופה הרשומה",
      en: "Weddings — the traditional ceremony alongside the registered one",
      am: "ሠርግ — ባህላዊው ሥነ ሥርዓት ከተመዘገበው ጎን",
    },
    body: {
      he: "הקס מברך את בני הזוג, קורא את הברכות המסורתיות ומנהל את מנהגי החתונה של ביתא ישראל — בהם הקושרה, קשירת חוטים צבעוניים על מצח החתן. שימו לב להבחנה שחוסכת אכזבה: ההכרה במעמד הקייסים ב-2018 אינה אישור לערוך חופה וקידושין רשומה. האישור הזה אישי, וניתן על ידי רב העיר או הוועדה ברבנות הראשית. רוב המשפחות משלבות — רב עורך את החופה הרשומה, והקס מוביל את הברכות והמסורת. בררו במועצה הדתית שמית מי מחזיק באישור, לפני שקובעים תאריך ואולם.",
      en: "The kes blesses the couple, recites the traditional blessings and leads the Beta Israel wedding customs — among them the kushera, binding coloured cords around the groom's forehead. Note the distinction that saves disappointment: the 2018 recognition of the kessim's status is not a permit to officiate a registered wedding. That permit is personal, granted by the city rabbi or by the Chief Rabbinate's committee. Most families combine the two — a rabbi officiates the registered ceremony while the kes leads the blessings and the tradition. Ask the religious council by name who holds the permit, before you book a date and a venue.",
      am: "ቄሱ ጥንዶቹን ይባርካል፣ ባህላዊ ቡራኬዎችን ያነባል፣ የቤተ እስራኤልን የሠርግ ልማዶችም ይመራል — ከእነሱም ቁሽራ፣ በሙሽራው ግንባር ላይ ባለቀለም ክሮችን ማሰር። ብስጭት የሚያድን ልዩነት ልብ ይበሉ፡ የ2018 የቄሶች ደረጃ እውቅና የተመዘገበ ሠርግ የመፈጸሚያ ፈቃድ አይደለም። ፈቃዱ የግል ሲሆን በከተማው ረቢ ወይም በዋናው ረቢነት ኮሚቴ ይሰጣል። አብዛኞቹ ቤተሰቦች ሁለቱን ያዋህዳሉ — ረቢ የተመዘገበውን ሥነ ሥርዓት ሲፈጽም ቄሱ ቡራኬዎቹንና ባህሉን ይመራል። ቀንና አዳራሽ ከመያዝዎ በፊት ፈቃዱ ያለው ማን እንደሆነ ከሃይማኖት ምክር ቤቱ በስም ያጣሩ።",
    },
  },
  {
    id: "birth",
    title: {
      he: "לידה, ברית ומתן שם",
      en: "Birth, brit mila and naming",
      am: "ልደት፣ ግርዛትና ስም ማውጣት",
    },
    body: {
      he: "הקס עורך את הברית, מברך את התינוק ואת היולדת ומלווה את מנהגי הטהרה שאחרי הלידה. משפחות רבות מזמינות קס גם לברכה בבית בשבועות הראשונים. אם אתם מתכננים ברית — פנו מוקדם. התאריך קבוע מראש ואין בו גמישות, ולכן כדאי לתאם עם הקס כבר בימים הראשונים אחרי הלידה.",
      en: "The kes performs the brit, blesses the baby and the mother, and accompanies the purification customs following birth. Many families also invite a kes for a blessing at home in the first weeks. If you are planning a brit, reach out early — the date is fixed in advance and has no flexibility, so arrange it with the kes in the first days after the birth.",
      am: "ቄሱ ግርዛቱን ይፈጽማል፣ ሕፃኑንና እናትየውን ይባርካል፣ ከወሊድ በኋላ ያሉትንም የመንጻት ልማዶች ያጅባል። ብዙ ቤተሰቦች በመጀመሪያዎቹ ሳምንታት ለቤት ቡራኬም ቄስ ይጋብዛሉ። ግርዛት እያቀዱ ከሆነ ቀድመው ይገናኙ — ቀኑ አስቀድሞ የተወሰነ ሲሆን ተለዋዋጭነት የለውም፤ ስለዚህ ከወሊድ በኋላ በመጀመሪያዎቹ ቀናት ከቄሱ ጋር ያቀናጁ።",
    },
  },
  {
    id: "sigd-holidays",
    title: {
      he: "סיגד וחגי הקהילה",
      en: "Sigd and the community festivals",
      am: "ሲግድና የማኅበረሰቡ በዓላት",
    },
    body: {
      he: "בסיגד הקייסים הם שמובילים את הטקס: הם קוראים מהאורית — מצחף קדוס, כתבי הקודש של הקהילה — מתפללים ומברכים את הקהל. הטקס המרכזי נערך בטיילת ארמון הנציב בירושלים, המשקיפה אל הר הבית, ובמקביל נערכים טקסים מקומיים בערים שיש בהן קהילה. הקייסים מובילים גם את תפילות החגים לאורך השנה. אם אתם מחפשים טקס סיגד קרוב לבית — המועצה הדתית בעיר תדע היכן הוא נערך השנה.",
      en: "At Sigd it is the kessim who lead the ceremony: they read from the Orit — the Metzhaf Kedus, the community's scriptures — pray, and bless the crowd. The central ceremony is held on the Armon HaNatziv promenade in Jerusalem, overlooking the Temple Mount, with local ceremonies held in parallel in cities that have a community. The kessim also lead the festival prayers through the year. If you are looking for a Sigd ceremony near home, the city's religious council will know where this year's is held.",
      am: "በሲግድ ሥነ ሥርዓቱን የሚመሩት ቄሶች ናቸው፡ ከኦሪት — መጽሐፍ ቅዱስ፣ የማኅበረሰቡ ቅዱሳት መጻሕፍት — ያነባሉ፣ ይጸልያሉ፣ ሕዝቡንም ይባርካሉ። ማዕከላዊው ሥነ ሥርዓት በኢየሩሳሌም በአርሞን ሃናጺቭ መንሸራሸሪያ ላይ ይካሄዳል፤ ማኅበረሰብ ባላቸው ከተሞችም አካባቢያዊ ሥነ ሥርዓቶች ይደረጋሉ። ቄሶቹ በዓመቱ ውስጥ የበዓላትን ጸሎቶችም ይመራሉ። ከቤት ቅርብ የሲግድ ሥነ ሥርዓት የሚፈልጉ ከሆነ የከተማው የሃይማኖት ምክር ቤት የዘንድሮው የት እንደሚደረግ ያውቃል።",
    },
  },
  {
    id: "blessing-guidance",
    title: {
      he: "ברכה בבית, ייעוץ והכרעה במחלוקת",
      en: "Home blessings, guidance and settling a dispute",
      am: "የቤት ቡራኬ፣ ምክርና አለመግባባትን መፍታት",
    },
    body: {
      he: "הקס הוא הסמכות הדתית של ביתא ישראל, ומוסמך אחרי שנות לימוד ומבחנים. פונים אליו לברכת בית חדש, לברכה לפני מסע או ניתוח, ולשאלות של הלכה ומנהג. באופן מסורתי הקס גם מגשר ומכריע במחלוקות משפחתיות וקהילתיות — תפקיד שאין לו מקבילה במערכת הרשמית, וממשיך להתקיים בקהילה בישראל.",
      en: "The kes is Beta Israel's religious authority, ordained after years of study and examination. He is approached for a blessing on a new home, a blessing before a journey or an operation, and questions of law and custom. Traditionally the kes also mediates and rules in family and community disputes — a role with no equivalent in the official system, and one that continues in the community in Israel.",
      am: "ቄሱ የቤተ እስራኤል የሃይማኖት ባለሥልጣን ነው፤ ከዓመታት ትምህርትና ፈተና በኋላ የተሾመ። ለአዲስ ቤት ቡራኬ፣ ከጉዞ ወይም ከቀዶ ሕክምና በፊት ለቡራኬ፣ እንዲሁም ለሕግና ልማድ ጥያቄዎች ይቀርባል። በባህል ቄሱ በቤተሰብና በማኅበረሰብ አለመግባባቶች ያስታርቃል ይፈርዳልም — በይፋዊው ሥርዓት አቻ የሌለው ሚና፣ በእስራኤልም በማኅበረሰቡ ውስጥ ቀጥሏል።",
    },
  },
];

/** What to ask before committing to anything — the practical checklist. */
export const KESSIM_QUESTIONS: Record<Locale, string[]> = {
  he: [
    "האם הקס מכהן דרך המועצה הדתית, ובאיזו עיר? הרשימה הרשמית מפרטת מי מכהן היכן, וזה מה שקובע מול מי מתאמים.",
    "אם מדובר בחתונה — האם הוא מחזיק באישור אישי לעריכת חופה וקידושין? שאלו במפורש, ואמתו מול המועצה הדתית. אל תניחו.",
    "האם יש תשלום, ומי משלם — המשפחה או המועצה הדתית? זה משתנה בין מועצה למועצה ובין טקס לטקס. שאלו מראש בטלפון, לפני שמתחייבים.",
    "באיזו שפה יתנהל הטקס — אמהרית, תיגרינית או עברית? ואם יש בני משפחה שאינם דוברי אמהרית, יהיה מי שיתרגם?",
    "מה המשפחה צריכה להכין — בגדים, מזון לטקס, מקום, ציוד? בטקסים מסורתיים חלק מההכנה מוטל על המשפחה, ועדיף לדעת מראש.",
    "כמה זמן מראש צריך לתאם? ללוויה ולאזכרה התשובה שונה לגמרי מחתונה.",
  ],
  en: [
    "Does the kes serve through the religious council, and in which city? The official list records who serves where, and that determines whom you coordinate with.",
    "For a wedding — does he hold a personal permit to officiate a registered ceremony? Ask explicitly, and verify with the religious council. Do not assume.",
    "Is there a fee, and who pays it — the family or the religious council? This varies between councils and between ceremonies. Ask up front, by phone, before committing.",
    "What language will the ceremony be in — Amharic, Tigrinya or Hebrew? And if relatives do not speak Amharic, will someone translate?",
    "What does the family need to prepare — clothing, food for the ceremony, a venue, equipment? In traditional ceremonies part of the preparation falls to the family, and it is better to know in advance.",
    "How far ahead do you need to arrange it? For a funeral or a memorial the answer is entirely different from a wedding.",
  ],
  am: [
    "ቄሱ በሃይማኖት ምክር ቤት በኩል ያገለግላል? በየትኛው ከተማ? ይፋዊው ዝርዝር ማን የት እንደሚያገለግል ይመዘግባል፤ ከማን ጋር እንደሚቀናጁም የሚወስነው ይኸው ነው።",
    "ለሠርግ ከሆነ — የተመዘገበ ሥነ ሥርዓት ለመፈጸም የግል ፈቃድ አለው? በግልጽ ይጠይቁ፣ ከሃይማኖት ምክር ቤቱም ያረጋግጡ። አለ ብለው አያስቡ።",
    "ክፍያ አለ? የሚከፍለውስ ማን ነው — ቤተሰቡ ወይስ የሃይማኖት ምክር ቤቱ? ይህ ከምክር ቤት ምክር ቤት ከሥነ ሥርዓትም ሥነ ሥርዓት ይለያያል። ከመወሰንዎ በፊት በስልክ አስቀድመው ይጠይቁ።",
    "ሥነ ሥርዓቱ በምን ቋንቋ ይሆናል — አማርኛ፣ ትግርኛ ወይስ ዕብራይስጥ? አማርኛ የማይናገሩ ዘመዶች ካሉስ የሚተረጉም ሰው ይኖራል?",
    "ቤተሰቡ ምን ማዘጋጀት አለበት — ልብስ፣ ለሥነ ሥርዓቱ ምግብ፣ ቦታ፣ ዕቃ? በባህላዊ ሥነ ሥርዓቶች የዝግጅቱ ከፊሉ በቤተሰብ ላይ ነው፤ አስቀድሞ ማወቅ ይሻላል።",
    "ምን ያህል አስቀድሞ ማቀናጀት ያስፈልጋል? ለቀብርና ለተዝካር መልሱ ከሠርግ ፈጽሞ የተለየ ነው።",
  ],
};

/** How to actually arrange one — the steps, in order. */
export const KESSIM_ARRANGE: KessimTopic[] = [
  {
    id: "start-council",
    title: {
      he: "התחילו במועצה הדתית, לא בטלפון של הקס",
      en: "Start at the religious council, not at the kes's phone",
      am: "ከቄሱ ስልክ ሳይሆን ከሃይማኖት ምክር ቤቱ ይጀምሩ",
    },
    body: {
      he: "המספרים ברשימה שכאן הם מספרי משרד ומועצה דתית — כך הם פורסמו, ולא במקרה. המועצה הדתית יודעת מי מכהן בפועל היום, מי זמין בתאריך שאתם צריכים, ומי מוסמך לְמה. זו גם הכתובת שתדע לומר לכם אם הקס שחיפשתם כבר אינו מכהן באותה עיר.",
      en: "The numbers in the list here are office and religious-council numbers — that is how they were published, and not by accident. The religious council knows who actually serves today, who is available on the date you need, and who is authorized for what. It is also the address that can tell you if the kes you were looking for no longer serves in that city.",
      am: "እዚህ ባለው ዝርዝር ውስጥ ያሉት ቁጥሮች የቢሮና የሃይማኖት ምክር ቤት ቁጥሮች ናቸው — የታተሙትም እንዲሁ ነው፣ በአጋጣሚም አይደለም። የሃይማኖት ምክር ቤቱ ዛሬ በእርግጥ ማን እንደሚያገለግል፣ በሚፈልጉት ቀን ማን እንደሚገኝ፣ ማንም ለምን እንደተፈቀደለት ያውቃል። የፈለጉት ቄስ በዚያች ከተማ ከአሁን በኋላ የማያገለግል ከሆነም የሚነግርዎ አድራሻ ነው።",
    },
  },
  {
    id: "verify-first",
    title: {
      he: "אמתו לפני שנוסעים",
      en: "Verify before you travel",
      am: "ከመጓዝዎ በፊት ያረጋግጡ",
    },
    body: {
      he: "הרשימה הרשמית עודכנה לאחרונה באוקטובר 2024, ובדקנו אותה מול המקור שוב בספטמבר 2026 — היא לא השתנתה מאז. אבל רשימה שלא עודכנה שנתיים אינה אותו דבר כמו רשימה נכונה: אנשים פורשים, עוברים עיר ונפטרים. התקשרו ואמתו לפני שאתם נוסעים או קובעים מועד. אם גיליתם פרט שאינו מעודכן — ספרו לנו, ונתקן מול המקור.",
      en: "The official list was last updated in October 2024, and we re-checked it against the source in September 2026 — it has not changed since. But a list that has not been updated in two years is not the same thing as a correct list: people retire, move city, and die. Call and verify before you travel or set a date. If you find a detail that is out of date, tell us and we will correct it against the source.",
      am: "ይፋዊው ዝርዝር መጨረሻ የዘመነው በጥቅምት 2024 ነው፤ በመስከረም 2026 ከምንጩ ጋር እንደገና አረጋግጠነዋል — ከዚያ ወዲህ አልተለወጠም። ነገር ግን ለሁለት ዓመት ያልዘመነ ዝርዝር ትክክለኛ ዝርዝር ማለት አይደለም፡ ሰዎች ጡረታ ይወጣሉ፣ ከተማ ይቀይራሉ፣ ያልፋሉም። ከመጓዝዎ ወይም ቀን ከመቁረጥዎ በፊት ደውለው ያረጋግጡ። ያልዘመነ ዝርዝር ካገኙ ይንገሩን፤ ከምንጩ ጋር እናስተካክላለን።",
    },
  },
  {
    id: "no-kes-nearby",
    title: {
      he: "אם אין קס בעיר שלכם",
      en: "If there is no kes in your city",
      am: "በከተማዎ ቄስ ከሌለ",
    },
    body: {
      he: "הרשימה הרשמית מכסה 31 ערים, והקהילה חיה ביותר מכך. אם העיר שלכם אינה ברשימה, זה לא אומר שאין מענה: פנו למועצה הדתית בעיר שלכם ובקשו הפניה לקס או לרב של העדה באזור, או פנו למועצה בעיר הקרובה שכן מופיעה ברשימה. קייסים רבים משרתים כמה יישובים באזור. אנחנו לא ממציאים רשומות לערים שאינן ברשימה הרשמית — אם עיר חסרה כאן, היא חסרה גם שם.",
      en: "The official list covers 31 cities, and the community lives in more than that. If your city is not on the list, that does not mean there is no answer: ask your own religious council for a referral to a kes or a community rabbi in the area, or contact the council in the nearest city that does appear. Many kessim serve several towns in a region. We do not invent entries for cities that are not on the official list — if a city is missing here, it is missing there too.",
      am: "ይፋዊው ዝርዝር 31 ከተሞችን ይሸፍናል፤ ማኅበረሰቡ ግን ከዚያ በላይ ይኖራል። ከተማዎ በዝርዝሩ ውስጥ ከሌለ መልስ የለም ማለት አይደለም፡ የራስዎን የሃይማኖት ምክር ቤት በአካባቢው ወዳለ ቄስ ወይም የማኅበረሰብ ረቢ እንዲመራዎ ይጠይቁ፣ ወይም በዝርዝሩ ውስጥ ወዳለችው ቅርብ ከተማ ምክር ቤት ይደውሉ። ብዙ ቄሶች በአንድ አካባቢ በርካታ ከተሞችን ያገለግላሉ። በይፋዊው ዝርዝር ውስጥ ለሌሉ ከተሞች መዝገብ አንፈጥርም — አንዲት ከተማ እዚህ ከጎደለች እዚያም ጎድላለች።",
    },
  },
];
