// Phase-3 seed: 1 demo agency + 5 demo listings (TED-21 DoD).
//
// The seed script (TBD by Engineer in `seeds/index.ts`) is expected to:
//   1. Insert the demo agency, mark verification_status = 'verified'.
//   2. Make the agency_owner user (looked up by env DEMO_AGENCY_OWNER_EMAIL).
//   3. Insert one row per `DEMO_LISTINGS` referencing the agency.id, the
//      city looked up from `slug.he`, and the optional neighborhood.
//
// The seed objects below are *parameter shapes* — pure data, no DB calls.
// Keeping them static lets vitest assert their validity (see
// `tests/listings.seed.test.ts`).

import type { Translatable } from "../columns";
import {
  parseListingAttributes,
  type ListingAttributes,
} from "../../validation/listings";

export type ListingType = ListingAttributes["type"];
export type ListingStatus = "draft" | "active" | "sold" | "rented" | "archived";

export const DEMO_AGENCY = {
  name: { he: "תדרוס נדל\"ן הדגמה", en: "Tedros Demo Realty", am: "ቴድሮስ ነድልአን ዴሞ" },
  slug: { he: "tedros-demo", en: "tedros-demo", am: "tedros-demo" },
  legalId: "000000018", // valid 9-digit Luhn-style demo value
  licenseNumber: "DEMO-0001",
  contactEmail: "broker@demo.tedros.local",
  contactPhone: "+972-50-0000000",
  websiteUrl: "https://demo.tedros.local",
  description: {
    he: "סוכנות הדגמה לפיילוט הליסטינגים של תדרוס.",
    en: "Demo agency used for the Tedros listings pilot.",
    am: "ለቴድሮስ ሊስቲንግስ ፓይለት የሚያገለግል ናሙና ኤጀንሲ።",
  } as Translatable,
} as const;

export type DemoListingSeed = {
  type: ListingType;
  status: ListingStatus;
  citySlugHe: string;
  neighborhoodSlugHe?: string;
  title: Translatable;
  slug: Translatable;
  // Stored on `listings.price`. ILS unless `attributes.currency` overrides.
  price: number;
  attributes: Record<string, unknown>;
  body: { he: string; en?: string; am?: string };
};

export const DEMO_LISTINGS: DemoListingSeed[] = [
  {
    type: "sale",
    status: "active",
    citySlugHe: "netanya",
    neighborhoodSlugHe: "kiryat-nordau",
    title: {
      he: "דירת 4 חדרים מרווחת בקריית נורדאו",
      en: "Spacious 4-room flat in Kiryat Nordau",
      am: "በቅርያት ኖርዳው ሰፊ 4-ክፍል ፍላት",
    },
    slug: {
      he: "4-rooms-kiryat-nordau",
      en: "4-rooms-kiryat-nordau",
      am: "4-rooms-kiryat-nordau",
    },
    price: 2_180_000,
    attributes: {
      address: "רחוב הרצל 12, נתניה",
      currency: "ILS",
      areaM2: 95,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      floor: 5,
      totalFloors: 9,
      parkingSpots: 1,
      yearBuilt: 2014,
      amenities: ["מעלית", "מרפסת", "ממ\"ד"],
      priceIncludesVat: true,
      mortgageEligibleHint: true,
    },
    body: {
      he: "דירה מוארת ומאווררת בקומה 5 עם נוף לים. קרובה לבתי ספר, גנים ותחבורה. מתאימה למשפחה צעירה.",
      en: "Bright, airy 5th-floor flat with a sea view. Close to schools, parks and transit.",
      am: "በ5ኛ ፎቅ ላይ የሚገኝ ብርሃን ያለው ፍላት ከባሕር እይታ ጋር።",
    },
  },
  {
    type: "rent",
    status: "active",
    citySlugHe: "rishon-lezion",
    neighborhoodSlugHe: "ramat-eliyahu",
    title: {
      he: "להשכרה — 3 חדרים ברמת אליהו",
      en: "For rent — 3 rooms in Ramat Eliyahu",
      am: "ለኪራይ — 3-ክፍል በራማት ኤልያሁ",
    },
    slug: {
      he: "3-rooms-rent-ramat-eliyahu",
      en: "3-rooms-rent-ramat-eliyahu",
      am: "3-rooms-rent-ramat-eliyahu",
    },
    price: 5_400,
    attributes: {
      address: "רחוב יצחק רבין 8, ראשון לציון",
      currency: "ILS",
      areaM2: 70,
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      floor: 2,
      totalFloors: 4,
      parkingSpots: 1,
      yearBuilt: 1998,
      amenities: ["מזגן", "מרפסת"],
      depositMonths: 2,
      furnishedLevel: "partial",
      petsAllowed: false,
      availableFrom: "2026-06-01",
    },
    body: {
      he: "דירה נקייה, מתאימה לזוג או משפחה קטנה. הריהוט הקיים יכול להישאר.",
      en: "Clean unit, suitable for a couple or small family. Existing furniture optional.",
    },
  },
  {
    type: "urban_renewal",
    status: "active",
    citySlugHe: "rehovot",
    neighborhoodSlugHe: "kiryat-moshe",
    title: {
      he: "פינוי-בינוי קרית משה — דירה חדשה תמורת ישנה",
      en: "Pinui-Binui Kiryat Moshe — new flat for old",
      am: "ፒኑዊ-ቢኑዊ ቅርያት ሞሼ — አዲስ ለአሮጌ",
    },
    slug: {
      he: "pinui-binui-kiryat-moshe",
      en: "pinui-binui-kiryat-moshe",
      am: "pinui-binui-kiryat-moshe",
    },
    price: 0,
    attributes: {
      address: "רחוב הרב קוק, רחובות",
      currency: "ILS",
      areaM2: 110,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      programKind: "pinui_binui",
      projectStatus: "באישור הוועדה המחוזית",
      estimatedCompletion: "2030-06-01",
      administrationName: "מינהלת קריית משה",
      amenities: ["חניה", "מרפסת"],
    },
    body: {
      he: "פרויקט פינוי-בינוי בשלבי אישור. תושבים זכאים לדירה חדשה (110 מ\"ר) במקום הקיימת + פיצוי שכירות.",
      en: "Pinui-Binui project pending district approval. Residents receive a new 110 m² unit plus rental compensation.",
    },
  },
  {
    type: "investment",
    status: "active",
    citySlugHe: "haifa",
    title: {
      he: "השקעה — 2 חדרים מושכרים בחיפה",
      en: "Investment — 2-room tenant-in-place in Haifa",
      am: "ኢንቨስትመንት — በሐይፋ 2-ክፍል ከተከራይ ጋር",
    },
    slug: {
      he: "investment-2-rooms-haifa",
      en: "investment-2-rooms-haifa",
      am: "investment-2-rooms-haifa",
    },
    price: 920_000,
    attributes: {
      address: "רחוב הרצל 47, חיפה",
      currency: "ILS",
      areaM2: 52,
      rooms: 2,
      bedrooms: 1,
      yearBuilt: 1972,
      expectedYieldPct: 4.6,
      strategy: "buy_to_let",
      occupancyStatus: "tenant_in_place",
    },
    body: {
      he: "דירת השקעה מושכרת לטווח ארוך. תשואה משוערת 4.6% ברוטו.",
    },
  },
  {
    type: "gov_program",
    status: "active",
    citySlugHe: "ashdod",
    title: {
      he: "מחיר למשתכן — אשדוד 2026",
      en: "Mehir LeMishtaken — Ashdod 2026",
      am: "መሂር ለመሽታከን — አሽዶድ 2026",
    },
    slug: {
      he: "mehir-lemishtaken-ashdod-2026",
      en: "mehir-lemishtaken-ashdod-2026",
      am: "mehir-lemishtaken-ashdod-2026",
    },
    price: 1_450_000,
    attributes: {
      address: "מתחם רובע ט\"ז, אשדוד",
      currency: "ILS",
      areaM2: 100,
      rooms: 4,
      bedrooms: 3,
      programCode: "mehir-lemishtaken-2026",
      unitsAvailable: 84,
      applicationDeadline: "2026-08-15",
      drawDate: "2026-09-01",
    },
    body: {
      he: "הגרלת מחיר למשתכן ברובע ט\"ז. 84 דירות. הרשמה עד 15.8.2026, הגרלה ב-1.9.2026.",
    },
  },
];

/** Validate the seed at import time — fail loudly during build/seed. */
export function validateSeedListings(): void {
  for (const l of DEMO_LISTINGS) {
    parseListingAttributes(l.type, l.attributes);
  }
}
