// Phase 3.4 seed: 8 priority cities for the community.
//
// Names + slugs aligned with the SEO city registry at
// `app/lib/cities/registry.ts` (Engineer's source of truth for the
// programmatic SEO pages). The registry also carries `region` + `geo`,
// which are not currently in the DB schema — adding them is a separate
// migration if/when listings/pros need to filter on region.
//
// I extend to ~50 community-concentrated cities once Phase 3.3 listings
// onboarding starts and we know which secondary cities have inventory.
//
// HE slug is the unique key in `cities` (see `realestate.ts` —
// `cities_slug_he_unique`). Slugs are Latin kebab-case in every locale
// to match the URL form `/{locale}/cities/{slug}`.

import type { Translatable } from "../columns";

export const PHASE_1_CITIES: Array<{ name: Translatable; slug: Translatable }> = [
  {
    name: { he: "נתניה", en: "Netanya", am: "ነታንያ" },
    slug: { he: "netanya", en: "netanya", am: "netanya" },
  },
  {
    name: { he: "ראשון לציון", en: "Rishon LeZion", am: "ሪሾን ለጽዮן" },
    slug: { he: "rishon-lezion", en: "rishon-lezion", am: "rishon-lezion" },
  },
  {
    name: { he: "רחובות", en: "Rehovot", am: "ረሆቮት" },
    slug: { he: "rehovot", en: "rehovot", am: "rehovot" },
  },
  {
    name: { he: "אשקלון", en: "Ashkelon", am: "አሽከሎን" },
    slug: { he: "ashkelon", en: "ashkelon", am: "ashkelon" },
  },
  {
    name: { he: "קריית גת", en: "Kiryat Gat", am: "ቂርያት ጋት" },
    slug: { he: "kiryat-gat", en: "kiryat-gat", am: "kiryat-gat" },
  },
  {
    name: { he: "באר שבע", en: "Be'er Sheva", am: "ቤር ሼቫ" },
    slug: { he: "beer-sheva", en: "beer-sheva", am: "beer-sheva" },
  },
  {
    name: { he: "חיפה", en: "Haifa", am: "ሐይፋ" },
    slug: { he: "haifa", en: "haifa", am: "haifa" },
  },
  {
    name: { he: "קריית מלאכי", en: "Kiryat Malakhi", am: "ቂርያት ማላኪ" },
    slug: {
      he: "kiryat-malakhi",
      en: "kiryat-malakhi",
      am: "kiryat-malakhi",
    },
  },
];
