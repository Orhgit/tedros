// Per-listing-type Zod validators for `listings.attributes` (ADR-002).
//
// The schema column is `jsonb` — Postgres won't enforce shape, so the action
// layer parses the discriminated union below before insert/update. Each
// branch matches a value of `listing_type`; common fields live on the base
// schema and type-specific fields on the variant.
//
// Engineer: import `parseListingAttributes` in your action and call it on
// the form payload before writing. Throw the resulting error as a 400.

import { z } from "zod";

// --- Common fields ---------------------------------------------------------
// Address is free-text — we'll geocode async via the city/neighborhood
// FK lookup, not by parsing this string. Currency defaults to ILS; agencies
// may post listings in USD/EUR for the diaspora investment audience.

const currencyEnum = z.enum(["ILS", "USD", "EUR"]);

const baseAttributes = z.object({
  address: z.string().trim().min(2).max(300).optional(),
  // Stored alongside `listings.price` — column is currency-agnostic.
  currency: currencyEnum.default("ILS"),
  // Metres² — covers houses (50–500) and plots (up to 10000 for commercial).
  areaM2: z.number().positive().max(100_000).optional(),
  // Total room count, half-rooms allowed (Israeli convention: 4.5 חדרים).
  rooms: z.number().multipleOf(0.5).min(0.5).max(20).optional(),
  bedrooms: z.number().int().min(0).max(20).optional(),
  bathrooms: z.number().multipleOf(0.5).min(0).max(10).optional(),
  floor: z.number().int().min(-3).max(60).optional(),
  totalFloors: z.number().int().min(0).max(60).optional(),
  parkingSpots: z.number().int().min(0).max(20).optional(),
  yearBuilt: z.number().int().min(1850).max(2100).optional(),
  // Free-form amenity tags — open set; refined later if a controlled
  // vocabulary becomes useful for filters.
  amenities: z.array(z.string().min(1).max(40)).max(50).default([]),
});

// --- Type-specific variants ------------------------------------------------

const saleAttributes = baseAttributes.extend({
  type: z.literal("sale"),
  // VAT inclusion matters for residential vs investment buyers.
  priceIncludesVat: z.boolean().default(true),
  mortgageEligibleHint: z.boolean().optional(),
});

const rentAttributes = baseAttributes.extend({
  type: z.literal("rent"),
  // Months of rent the deposit covers.
  depositMonths: z.number().int().min(0).max(12).optional(),
  furnishedLevel: z.enum(["unfurnished", "partial", "furnished"]).default("unfurnished"),
  petsAllowed: z.boolean().optional(),
  availableFrom: z.string().date().optional(),
  // For rent, `price` is monthly — capture annual as derived data only.
});

const urbanRenewalAttributes = baseAttributes.extend({
  type: z.literal("urban_renewal"),
  // PINUI_BINUI = פינוי-בינוי (clear and rebuild).
  // TAMA_38_1 / TAMA_38_2 = strengthening / demolition under TAMA 38.
  programKind: z.enum(["pinui_binui", "tama_38_1", "tama_38_2", "other"]),
  // Free-text status flag from the מינהלת — e.g. "in approval", "construction".
  projectStatus: z.string().min(2).max(80).optional(),
  // Estimated completion date (YYYY-MM-DD).
  estimatedCompletion: z.string().date().optional(),
  // Project administrative body — usually `מינהלת השכונה` name.
  administrationName: z.string().min(2).max(120).optional(),
});

const investmentAttributes = baseAttributes.extend({
  type: z.literal("investment"),
  // Annual gross yield as a percentage (no division — UI shows '%').
  expectedYieldPct: z.number().min(0).max(50).optional(),
  // Strategy hint for the listing card.
  strategy: z
    .enum(["buy_to_let", "flip", "renovation", "land_bank", "other"])
    .default("buy_to_let"),
  occupancyStatus: z.enum(["vacant", "tenant_in_place", "owner_occupied"]).optional(),
});

const govProgramAttributes = baseAttributes.extend({
  type: z.literal("gov_program"),
  // Program identifier — e.g. 'mahir-lemishtaken-2026', 'ethiopian-mortgage'.
  programCode: z.string().min(2).max(64),
  // Slot count for lottery-style programs (default 1 = single unit listing).
  unitsAvailable: z.number().int().min(1).max(10_000).default(1),
  // Lottery registration deadline / public draw date.
  applicationDeadline: z.string().date().optional(),
  drawDate: z.string().date().optional(),
});

const commercialAttributes = baseAttributes.extend({
  type: z.literal("commercial"),
  commercialKind: z.enum([
    "office",
    "retail",
    "warehouse",
    "industrial",
    "hospitality",
    "mixed_use",
    "land",
  ]),
  zoning: z.string().min(1).max(80).optional(),
  // For sale OR rent — commercial agencies handle both via this single type.
  priceModel: z.enum(["sale", "rent_monthly", "rent_annual"]).default("sale"),
});

// --- Discriminated union + parse helper ------------------------------------

export const listingAttributesSchema = z.discriminatedUnion("type", [
  saleAttributes,
  rentAttributes,
  urbanRenewalAttributes,
  investmentAttributes,
  govProgramAttributes,
  commercialAttributes,
]);

export type ListingAttributes = z.infer<typeof listingAttributesSchema>;

/**
 * Parse `attributes` for a given listing_type. Throws ZodError on invalid
 * input — call from a server action and surface as a 400 with field errors.
 */
export function parseListingAttributes(
  type: ListingAttributes["type"],
  raw: unknown,
): ListingAttributes {
  // Inject the discriminator so callers can pass the form's `attributes`
  // object without copying `type` into it.
  const withType =
    raw && typeof raw === "object" ? { ...(raw as object), type } : { type };
  return listingAttributesSchema.parse(withType);
}

// --- Top-level listing intake ----------------------------------------------
// What the agency dashboard form posts. The action layer is responsible for
// generating slugs (HE), assigning city_id from the city slug, and writing
// `listing_translations` for the body. Per ADR-005 publish gate, agencies
// can only set `status: 'active'` if their `verification_status === 'verified'`.

export const listingTitleSchema = z.object({
  he: z.string().trim().min(2).max(160),
  en: z.string().trim().max(160).optional(),
  am: z.string().trim().max(160).optional(),
});

export const listingIntakeSchema = z.object({
  agencyId: z.string().uuid(),
  type: z.enum([
    "sale",
    "rent",
    "urban_renewal",
    "investment",
    "gov_program",
    "commercial",
  ]),
  status: z.enum(["draft", "active", "sold", "rented", "archived"]).default("draft"),
  title: listingTitleSchema,
  // Top-level `price` is currency-agnostic (currency lives in attributes).
  // Allow string for HTML form posts; coerce to number.
  price: z.coerce.number().nonnegative().max(10_000_000_000).optional(),
  cityId: z.string().uuid(),
  neighborhoodId: z.string().uuid().optional(),
  attributes: z.unknown(),
  // Optional body per locale — written to `listing_translations`.
  body: z
    .object({
      he: z.string().min(20).max(20_000),
      en: z.string().max(20_000).optional(),
      am: z.string().max(20_000).optional(),
    })
    .optional(),
});

export type ListingIntake = z.infer<typeof listingIntakeSchema>;

/**
 * Combined parser — validates the top-level fields then validates the
 * `attributes` JSON against the per-type schema.
 */
export function parseListingIntake(raw: unknown): ListingIntake & {
  attributes: ListingAttributes;
} {
  const top = listingIntakeSchema.parse(raw);
  const attributes = parseListingAttributes(top.type, top.attributes);
  return { ...top, attributes };
}
