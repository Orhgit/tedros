// Phase-1 seed: 5 priority cities (DoD per Vega/Architect summary).
// I extend to 50 (community-concentrated) when I take over after the
// Engineer's skeleton lands.

import type { Translatable } from "../columns";

export const PHASE_1_CITIES: Array<{ name: Translatable; slug: Translatable }> =
  [
    {
      name: { he: "נתניה", en: "Netanya", am: "ነታንያ" },
      slug: { he: "netanya", en: "netanya", am: "netanya" },
    },
    {
      name: { he: "ראשון לציון", en: "Rishon LeZion", am: "ሪሾን ለጽዮን" },
      slug: { he: "rishon-lezion", en: "rishon-lezion", am: "rishon-lezion" },
    },
    {
      name: { he: "רחובות", en: "Rehovot", am: "ረሆቮት" },
      slug: { he: "rehovot", en: "rehovot", am: "rehovot" },
    },
    {
      name: { he: "אשדוד", en: "Ashdod", am: "አሽዶድ" },
      slug: { he: "ashdod", en: "ashdod", am: "ashdod" },
    },
    {
      name: { he: "חיפה", en: "Haifa", am: "ሐይፋ" },
      slug: { he: "haifa", en: "haifa", am: "haifa" },
    },
  ];
