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
// All facts are sourced — see `sources` in ./content.server.ts per entry. Do
// not add a neighborhood without a verifiable name and at least one source.
//
// This file is the CLIENT-SAFE INDEX (ADR-020): slugs, short names, numeric
// unit counts. The narrative fields — status, authority, communityContext,
// qualitative unit notes, source lists — live in ./content.server.ts and are
// re-attached by `hydrateNeighborhood` inside a loader. Route `meta` reads
// them off loader `data`; `meta` may not import the server module, because it
// is not stripped from the client build and the build fails outright.

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

/**
 * The client-safe half of a neighborhood record: identifiers, the short
 * display name, numeric unit counts. This is what ships in the browser
 * bundle, so nothing narrative belongs here (ADR-020).
 */
export type UrbanRenewalNeighborhoodIndex = {
  /** Route slug — `<neighborhood>-<city>`, globally unique. */
  slug: string;
  /** City this neighborhood belongs to — references `~/lib/cities/registry`. */
  citySlug: string;
  name: LocalizedText;
  units: UrbanRenewalUnits;
  /** `rights` seed slug to link to for the legal-aid / tenant-rights CTA. */
  rightSlug: string;
};

/**
 * A neighborhood with its long-form prose re-attached. Only ever produced
 * server-side, by `hydrateNeighborhood` in ./content.server.ts; routes hand
 * it to the client as loader data. The type itself is erased at build time,
 * so declaring it here costs the bundle nothing.
 */
export type UrbanRenewalNeighborhood = UrbanRenewalNeighborhoodIndex & {
  /** Project status: what stage it's at, who's driving it. */
  status: LocalizedText;
  /** Developer / municipal authority / administration name. */
  authority: LocalizedText;
  /** Why this matters to the Ethiopian-Israeli community specifically. */
  communityContext: LocalizedText;
  /** Source URLs / search pointers the facts above were drawn from. */
  sources: string[];
};

export const URBAN_RENEWAL_NEIGHBORHOODS: UrbanRenewalNeighborhoodIndex[] = [
  {
    slug: "kiryat-moshe-rehovot",
    citySlug: "rehovot",
    name: { he: "קרית משה", en: "Kiryat Moshe", am: "ቅርያት ሞሼ" },
    units: { before: 1300, after: 8700 },
    rightSlug: "urban-renewal-kiryat-moshe",
  },
  {
    slug: "ramat-eliyahu-rishon-lezion",
    citySlug: "rishon-lezion",
    name: { he: "רמת אליהו", en: "Ramat Eliyahu", am: "ራማት ኤልያሁ" },
    units: { before: 2600, after: 7200 },
    rightSlug: "urban-renewal-ramat-eliyahu",
  },
  {
    slug: "dora-netanya",
    citySlug: "netanya",
    name: { he: "דורה", en: "Dora", am: "ዶራ" },
    units: {},
    rightSlug: "urban-renewal-netanya",
  },
  {
    slug: "neot-shaked-netanya",
    citySlug: "netanya",
    name: { he: "נאות שקד", en: "Neot Shaked", am: "ኔኦት ሻቄድ" },
    units: {},
    rightSlug: "urban-renewal-netanya",
  },
  {
    slug: "kiryat-nordau-netanya",
    citySlug: "netanya",
    name: { he: "קריית נורדאו", en: "Kiryat Nordau", am: "ቂርያት ኖርዳው" },
    units: {},
    rightSlug: "urban-renewal-netanya",
  },
  {
    slug: "sela-netanya",
    citySlug: "netanya",
    name: { he: "שכונת סלע", en: "Sela", am: "ሴላ" },
    units: { before: 8, after: 116 },
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "rova-hanevim-kiryat-gat",
    citySlug: "kiryat-gat",
    name: { he: "רובע הנביאים", en: "Rova HaNevi'im", am: "ሮቫ ሃነቢኢም" },
    units: {},
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "shvat-israel-kiryat-gat",
    citySlug: "kiryat-gat",
    name: { he: "שכונת שבט ישראל", en: "Shevet Israel", am: "ሸቬት እስራኤል" },
    units: { after: 2300 },
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "komemiyut-yaski-kiryat-gat",
    citySlug: "kiryat-gat",
    name: {
      he: "מתחם קוממיות-יסקי",
      en: "Komemiyut-Yaski complex",
      am: "ኮመሚዩት-ያስኪ ማዕከል",
    },
    units: { before: 114, after: 1552 },
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "kibbutz-galuyot-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: "מתחם קיבוץ גלויות", en: "Kibbutz Galuyot", am: "ኪቡትስ ጋሉዮት" },
    units: {},
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "moshe-sharet-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: "מתחם משה שרת", en: "Moshe Sharet", am: "ሞሼ ሻሬት" },
    units: {},
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "chabad-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: 'שכונת חב"ד', en: "Chabad", am: "ቻባድ" },
    units: {},
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "herzl-kiryat-malakhi",
    citySlug: "kiryat-malakhi",
    name: { he: "מתחם הרצל", en: "Herzl", am: "ሄርዝል" },
    units: {},
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "ramat-ashkol-lod",
    citySlug: "lod",
    name: { he: "רמת אשכול", en: "Ramat Ashkol", am: "ራማት አሽኮል" },
    units: { before: 1200, after: 5200 },
    rightSlug: "pinui-binui-tenant-rights",
  },
  {
    slug: "shchuna-dalet-beer-sheva",
    citySlug: "beer-sheva",
    name: { he: "שכונה ד'", en: "Shchuna Dalet", am: "ሽኩና ዳሌት" },
    units: {},
    rightSlug: "pinui-binui-tenant-rights",
  },
];

const BY_SLUG = new Map<string, UrbanRenewalNeighborhoodIndex>(
  URBAN_RENEWAL_NEIGHBORHOODS.map((n) => [n.slug, n]),
);

export function findNeighborhoodBySlug(
  slug: string,
): UrbanRenewalNeighborhoodIndex | undefined {
  return BY_SLUG.get(slug);
}

export function neighborhoodsByCity(citySlug: string): UrbanRenewalNeighborhoodIndex[] {
  return URBAN_RENEWAL_NEIGHBORHOODS.filter((n) => n.citySlug === citySlug);
}

export function neighborhoodName(
  n: UrbanRenewalNeighborhoodIndex,
  locale: Locale,
): string {
  return n.name[locale] ?? n.name.he;
}

export function localized(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.he;
}

export const URBAN_RENEWAL_PATH_PREFIX = "/urban-renewal";

export function neighborhoodPath(locale: Locale, slug: string): string {
  return `/${locale}${URBAN_RENEWAL_PATH_PREFIX}/${slug}`;
}
