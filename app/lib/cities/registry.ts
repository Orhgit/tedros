// City registry — source of truth for programmatic SEO pages.
//
// Client-safe INDEX only: slug, names, region, geo. Long-form prose
// (overview, communityStats) lives in ./content.server.ts and reaches the
// browser as loader data — see docs/adr/020-content-lives-in-server-modules.md.
// Keeping it out of here matters because route `meta` functions import
// `cityName`, and `meta` is never stripped from the client bundle.
//
// Pure module: no DB, safe to import from loaders, actions, components, or tests.

import type { Locale } from "~/lib/i18n/config";

export type CityName = { he: string; en: string; am: string };

export type City = {
  slug: string;
  names: CityName;
  region: "jerusalem" | "center" | "south" | "north";
  geo: { lat: number; lon: number };
};

export const CITIES: City[] = [
  {
    slug: "jerusalem",
    names: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    region: "jerusalem",
    geo: { lat: 31.7683, lon: 35.2137 },
  },
  {
    slug: "beit-shemesh",
    names: { he: "בית שמש", en: "Beit Shemesh", am: "ቤት ሼሜሽ" },
    region: "jerusalem",
    geo: { lat: 31.7503, lon: 35.0005 },
  },
  {
    slug: "maale-adumim",
    names: { he: "מעלה אדומים", en: "Ma'ale Adumim", am: "ማዓለ አዱሚም" },
    region: "jerusalem",
    geo: { lat: 31.7724, lon: 35.2992 },
  },
  {
    slug: "netanya",
    names: { he: "נתניה", en: "Netanya", am: "ነታንያ" },
    region: "center",
    geo: { lat: 32.3329, lon: 34.8599 },
  },
  {
    slug: "rishon-lezion",
    names: { he: "ראשון לציון", en: "Rishon LeZion", am: "ሪሾን ለጽዮን" },
    region: "center",
    geo: { lat: 31.971, lon: 34.7892 },
  },
  {
    slug: "rehovot",
    names: { he: "רחובות", en: "Rehovot", am: "ረሆቮት" },
    region: "center",
    geo: { lat: 31.8928, lon: 34.8113 },
  },
  {
    slug: "tel-aviv",
    names: { he: "תל אביב", en: "Tel Aviv", am: "ቴል አቪቭ" },
    region: "center",
    geo: { lat: 32.0853, lon: 34.7818 },
  },
  {
    slug: "petach-tikva",
    names: { he: "פתח תקווה", en: "Petach Tikva", am: "ፔታህ ቲቅቫ" },
    region: "center",
    geo: { lat: 32.0841, lon: 34.8878 },
  },
  {
    slug: "lod",
    names: { he: "לוד", en: "Lod", am: "ሎዳ" },
    region: "center",
    geo: { lat: 31.9513, lon: 34.8956 },
  },
  {
    slug: "ramla",
    names: { he: "רמלה", en: "Ramla", am: "ራምላ" },
    region: "center",
    geo: { lat: 31.9246, lon: 34.8702 },
  },
  {
    slug: "ashdod",
    names: { he: "אשדוד", en: "Ashdod", am: "አሽዶድ" },
    region: "center",
    geo: { lat: 31.8044, lon: 34.6553 },
  },
  {
    slug: "holon",
    names: { he: "חולון", en: "Holon", am: "ሆሎን" },
    region: "center",
    geo: { lat: 32.0118, lon: 34.7747 },
  },
  {
    slug: "bat-yam",
    names: { he: "בת ים", en: "Bat Yam", am: "ባት ያም" },
    region: "center",
    geo: { lat: 32.0172, lon: 34.7502 },
  },
  {
    slug: "yavne",
    names: { he: "יבנה", en: "Yavne", am: "ያቭኔ" },
    region: "center",
    geo: { lat: 31.8778, lon: 34.7444 },
  },
  {
    slug: "kfar-saba",
    names: { he: "כפר סבא", en: "Kfar Saba", am: "ካፋር ሳባ" },
    region: "center",
    geo: { lat: 32.1753, lon: 34.9077 },
  },
  {
    slug: "herzliya",
    names: { he: "הרצליה", en: "Herzliya", am: "ሄርዝሊያ" },
    region: "center",
    geo: { lat: 32.1672, lon: 34.8396 },
  },
  {
    slug: "modiin",
    names: { he: "מודיעין", en: "Modi'in", am: "ሞዲኢን" },
    region: "center",
    geo: { lat: 31.8977, lon: 35.0099 },
  },
  {
    slug: "ashkelon",
    names: { he: "אשקלון", en: "Ashkelon", am: "አሽከሎን" },
    region: "south",
    geo: { lat: 31.6688, lon: 34.5717 },
  },
  {
    slug: "kiryat-gat",
    names: { he: "קריית גת", en: "Kiryat Gat", am: "ቂርያት ጋት" },
    region: "south",
    geo: { lat: 31.6098, lon: 34.7642 },
  },
  {
    slug: "beer-sheva",
    names: { he: "באר שבע", en: "Be'er Sheva", am: "ቤር ሼቫ" },
    region: "south",
    geo: { lat: 31.2518, lon: 34.7913 },
  },
  {
    slug: "kiryat-malakhi",
    names: { he: "קריית מלאכי", en: "Kiryat Malakhi", am: "ቂርያት ማላኪ" },
    region: "south",
    geo: { lat: 31.7311, lon: 34.7466 },
  },
  {
    slug: "sderot",
    names: { he: "שדרות", en: "Sderot", am: "ስደሮት" },
    region: "south",
    geo: { lat: 31.5239, lon: 34.5962 },
  },
  {
    slug: "dimona",
    names: { he: "דימונה", en: "Dimona", am: "ዲሞና" },
    region: "south",
    geo: { lat: 31.068, lon: 35.0326 },
  },
  {
    slug: "yerucham",
    names: { he: "ירוחם", en: "Yerucham", am: "ኢሩሃም" },
    region: "south",
    geo: { lat: 30.9988, lon: 34.9305 },
  },
  {
    slug: "eilat",
    names: { he: "אילת", en: "Eilat", am: "ኤይላት" },
    region: "south",
    geo: { lat: 29.5581, lon: 34.9482 },
  },
  {
    slug: "netivot",
    names: { he: "נתיבות", en: "Netivot", am: "ንቲቮት" },
    region: "south",
    geo: { lat: 31.4196, lon: 34.5903 },
  },
  {
    slug: "arad",
    names: { he: "ערד", en: "Arad", am: "ዓረድ" },
    region: "south",
    geo: { lat: 31.2596, lon: 35.2127 },
  },
  {
    slug: "haifa",
    names: { he: "חיפה", en: "Haifa", am: "ሐይፋ" },
    region: "north",
    geo: { lat: 32.794, lon: 34.9896 },
  },
  {
    slug: "kiryat-ata",
    names: { he: "קריית אתא", en: "Kiryat Ata", am: "ቂርያት አታ" },
    region: "north",
    geo: { lat: 32.8068, lon: 35.1097 },
  },
  {
    slug: "kiryat-bialik",
    names: { he: "קריית ביאליק", en: "Kiryat Bialik", am: "ቂርያት ቢያሊቅ" },
    region: "north",
    geo: { lat: 32.8214, lon: 35.0919 },
  },
  {
    slug: "carmiel",
    names: { he: "כרמיאל", en: "Carmiel", am: "ካርሚኤል" },
    region: "north",
    geo: { lat: 32.9184, lon: 35.3057 },
  },
  {
    slug: "afula",
    names: { he: "עפולה", en: "Afula", am: "አፉላ" },
    region: "north",
    geo: { lat: 32.6052, lon: 35.2894 },
  },
  {
    slug: "acre",
    names: { he: "עכו", en: "Acre", am: "ዓክኮ" },
    region: "north",
    geo: { lat: 32.92, lon: 35.0694 },
  },
  {
    slug: "nahariya",
    names: { he: "נהריה", en: "Nahariya", am: "ናሃርያ" },
    region: "north",
    geo: { lat: 33.0097, lon: 35.0975 },
  },
  {
    slug: "kiryat-shmona",
    names: { he: "קריית שמונה", en: "Kiryat Shmona", am: "ቂርያት ሽሞና" },
    region: "north",
    geo: { lat: 33.2073, lon: 35.5706 },
  },
  {
    slug: "tiberias",
    names: { he: "טבריה", en: "Tiberias", am: "ጢቤርያስ" },
    region: "north",
    geo: { lat: 32.7939, lon: 35.5308 },
  },
  {
    slug: "safed",
    names: { he: "צפת", en: "Safed", am: "ጽፋት" },
    region: "north",
    geo: { lat: 32.9658, lon: 35.4958 },
  },
  {
    slug: "nof-hagalil",
    names: { he: "נוף הגליל", en: "Nof HaGalil", am: "ኖፍ ሃጋሊል" },
    region: "north",
    geo: { lat: 32.7048, lon: 35.3303 },
  },
  {
    slug: "maalot-tarshiha",
    names: { he: "מעלות-תרשיחא", en: "Ma'alot-Tarshiha", am: "ማዓሎት-ታርሺሃ" },
    region: "north",
    geo: { lat: 33.0155, lon: 35.2693 },
  },
];

const BY_SLUG = new Map<string, City>(CITIES.map((c) => [c.slug, c]));

export function findCityBySlug(slug: string): City | undefined {
  return BY_SLUG.get(slug);
}

export function cityName(city: City, locale: Locale): string {
  return city.names[locale] ?? city.names.he;
}

export const CITY_PATH_PREFIX = "/cities";

export function cityPath(locale: Locale, slug: string): string {
  return `/${locale}${CITY_PATH_PREFIX}/${slug}`;
}
