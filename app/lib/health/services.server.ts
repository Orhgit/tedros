// Health Services Directory seed (RIN-656 — Wave 2).
//
// 7 organisations and services relevant to the Ethiopian-Israeli community.
// Covers phone translation, crisis support, emergency, mental health, and
// legal health-rights services.
//
// HE is source-of-truth (CLAUDE.md). EN + AM mirrored.
// Update cadence: yearly or when contact details change.

import type { Translatable } from "../db/columns";

export type HealthServiceCategory =
  | "translation"
  | "crisis"
  | "mental-health"
  | "emergency"
  | "rights";

export interface HealthServiceEntry {
  slug: string;
  name: Translatable;
  description: Translatable;
  category: HealthServiceCategory;
  phone?: string;
  url?: string;
  openHours?: Translatable;
  isFree: boolean;
}

export const HEALTH_SERVICES: HealthServiceEntry[] = [
  // ── 1. טנא בריאות — קול לבריאות ──────────────────────────────────────────
  {
    slug: "tene-briut",
    name: {
      he: "טנא בריאות — קול לבריאות",
      en: 'Tene Briut — "Kol LaBriut" Hotline',
      am: 'ጤና ብርሃን — "ቆል ላብሪኡት" የስልክ መስመር',
    },
    description: {
      he: "קו תרגום רפואי טלפוני באמהרית, טיגרינית ועברית. נוסד ב-2007, מעניק שירותי תרגום בזמן אמת לביקורי רופא, ליווי בבתי חולים, ימי בריאות קהילתיים, שידורי רדיו בנושאי בריאות, ותיווך תרבותי. לפחות 30 מרפאות שותפות ברחבי הארץ. השירות חינמי לאוכלוסייה.",
      en: "Medical phone-translation hotline in Amharic, Tigrinya, and Hebrew. Founded in 2007, providing real-time interpretation for doctor visits, hospital accompaniment, community health days, health-focused radio broadcasts, and cultural mediation. At least 30 partner clinics nationwide. Service is free of charge.",
      am: "በአማርኛ፣ ትግርኛ እና ዕብራይስጥ ሕክምናዊ የስልክ ትርጉም አገልግሎት። በ2007 የተቋቋመ፣ ለዶክተር ጉብኝቶች፣ ሆስፒታል ምትክ፣ የማህበረሰብ የጤና ቀናት፣ ስለ ጤና ሬዲዮ ስርጭቶች እና ባህላዊ ሽምግልና ትርጉም ይሰጣል። ቢያንስ 30 አጋር ክሊኒኮች አሉ። አገልግሎቱ ነጻ ነው።",
    },
    category: "translation",
    phone: "03-5370253",
    url: "https://tene-briut.org.il",
    openHours: {
      he: "ימים א׳–ה׳, 08:00–16:00",
      en: "Sun–Thu 08:00–16:00",
      am: "እሁድ–ሐሙስ 08:00–16:00",
    },
    isFree: true,
  },

  // ── 2. אלם — נוער בסיכון ──────────────────────────────────────────────────
  {
    slug: "elem",
    name: {
      he: "אלם — נוער בסיכון",
      en: "Elem — Youth in Distress",
      am: "ኤሌም — አደጋ ውስጥ ያሉ ወጣቶች",
    },
    description: {
      he: "ארגון המסייע לנוער ישראלי-אתיופי במצבי מצוקה — אלימות, נשירה בית-ספרית, בדידות, ופגיעות נפשיות. מפעיל מרכזים קהילתיים, שיחות פרטניות, וסיוע בהשתלבות חברתית. פעיל בערי הליבה של הקהילה.",
      en: "Organisation supporting Ethiopian-Israeli youth in distress — violence, school dropout, isolation, and mental vulnerability. Runs community centres, one-on-one counselling, and social-integration support. Active in core community cities.",
      am: "ችግር ውስጥ ለሚገኙ ኢትዮጵያዊ-እስራኤላዊ ወጣቶችን የሚያግዝ ድርጅት — ጥቃት፣ ትምህርት ቤት ማቋረጥ፣ ብቸኝነት፣ እና የአእምሮ ድካም። የማህበረሰብ ማዕከሎች፣ ግላዊ ምክር፣ እና የማህበራዊ ውህደት ድጋፍ ይሰጣል።",
    },
    category: "crisis",
    url: "https://elem.org.il",
    isFree: true,
  },

  // ── 3. נטל"י — טראומה ו-PTSD ─────────────────────────────────────────────
  {
    slug: "natal",
    name: {
      he: 'נטל"י — חוסן ישראלי',
      en: "NATAL — Israeli Trauma & Resiliency Center",
      am: "ናታል — ከጦርነት ቀውስ የማገገሚያ ማዕከል",
    },
    description: {
      he: "מרכז ישראלי לטיפול בטראומה ו-PTSD. רלוונטי במיוחד לוותיקי מבצע שלמה, חיילים משוחררים ובני-משפחה. מספק טיפול פסיכולוגי, קבוצות תמיכה, ייעוץ, וקו סיוע. חלק מהשירותים ניתנים ללא תשלום לפי מבחן הכנסה.",
      en: "Israeli centre for trauma and PTSD treatment. Particularly relevant for Operation Solomon veterans, discharged soldiers, and their families. Provides psychological therapy, support groups, counselling, and a helpline. Some services are offered free of charge based on means testing.",
      am: "ለጦርነት ቀውስ (PTSD) ሕክምና የሚሰጥ እስራኤላዊ ማዕከል። ለ'ሶሎሞን ዘመቻ' አርበኞች፣ ለተሰናበቱ ወታደሮች እና ቤተሰቦቻቸው ልዩ አዛምድ ነው። ሥነ-ልቡናዊ ሕክምና፣ ድጋፍ ቡድኖች፣ ምክር እና የዕርዳታ መስመር ይሰጣል።",
    },
    category: "mental-health",
    phone: "1-800-363-363",
    url: "https://www.natal.org.il",
    openHours: {
      he: "ימים א׳–ה׳, 09:00–21:00",
      en: "Sun–Thu 09:00–21:00",
      am: "እሁድ–ሐሙስ 09:00–21:00",
    },
    isFree: false,
  },

  // ── 4. ער"ן 1201 — קו חירום נפשי ────────────────────────────────────────
  {
    slug: "eran-1201",
    name: {
      he: 'ער"ן 1201 — קו חירום נפשי',
      en: "ERAN 1201 — Emotional First Aid Hotline",
      am: "ኢራን 1201 — የስነ-ልቡና ድንገተኛ ዕርዳታ",
    },
    description: {
      he: "קו חירום רגשי ונפשי 24 שעות ביממה, 7 ימים בשבוע. מספק קשבה, תמיכה ומידע בעברית, ערבית, רוסית ואנגלית. מתנדבים מוסמכים. אנונימי לחלוטין. לאחר שיחה — ניתן לקבל הפניה לגורמי טיפול.",
      en: "24/7 emotional and mental-health crisis hotline. Provides listening, support, and referral in Hebrew, Arabic, Russian, and English. Staffed by trained volunteers. Fully anonymous. After a call, referrals to treatment providers can be arranged.",
      am: "24/7 የስሜታዊ እና የአእምሮ ጤና ድንገተኛ ዕርዳታ መስመር። በዕብራይስጥ፣ አረብኛ፣ ሩሲያኛ እና እንግሊዝኛ ሰምቶ ድጋፍ እና ማጣቀሻ ይሰጣል። ሙሉ ስም-አልባ ነው።",
    },
    category: "crisis",
    phone: "1201",
    url: "https://www.eran.org.il",
    openHours: {
      he: "24/7 — כל ימות השנה",
      en: "24/7 — all year",
      am: "24/7 — ዓመቱን ሙሉ",
    },
    isFree: true,
  },

  // ── 5. מתרגמים תרבותיים — משרד הבריאות ──────────────────────────────────
  {
    slug: "cultural-mediators-moh",
    name: {
      he: "מתרגמים תרבותיים — קופות חולים ומשרד הבריאות",
      en: "Cultural Mediators — HMOs & Ministry of Health",
      am: "ባህላዊ አስተርጓሚዎች — ጤና-ቤቶች እና የጤና ሚኒስቴር",
    },
    description: {
      he: "מעל 30 מרפאות ראשוניות ברחבי ישראל מעסיקות מתרגמים תרבותיים דוברי אמהרית ועברית, בהסכמות עם קופות חולים. כל מטופל זכאי לבקש מתרגם ללא תשלום (חוק זכויות החולה, סעיף 3). ניתן לפנות ישירות לקופת חולים לקבלת המידע.",
      en: "Over 30 primary-care clinics across Israel employ Amharic-speaking cultural mediators under agreements with health-maintenance organisations (HMOs). Every patient is entitled by law to request a free interpreter (Patient Rights Act 1996, section 3). Contact your HMO directly for availability.",
      am: "በእስራኤል ውስጥ ከ30 በላይ የዋና ሕክምና ክሊኒኮች፣ ከጤና ድርጅቶች ጋር ባደረጉ ስምምነቶች፣ አማርኛ ተናጋሪ ባህላዊ አስተርጓሚዎችን ያቀፋሉ። እያንዳንዱ ታካሚ ነጻ አስተርጓሚ የመጠየቅ ህጋዊ መብት አለው (የታካሚ መብቶች ህግ 1996፣ አንቀጽ 3)።",
    },
    category: "translation",
    url: "https://www.health.gov.il",
    isFree: true,
  },

  // ── 6. מגן דוד אדום — 101 ─────────────────────────────────────────────────
  {
    slug: "mda-101",
    name: {
      he: "מגן דוד אדום — 101",
      en: "Magen David Adom — 101",
      am: "ማገን ዳዊድ አዶም — 101",
    },
    description: {
      he: "שירות רפואת חירום לאומי. חייג 101 לאמבולנס בכל מצב חירום רפואי. השירות חינמי ללא תלות בקופת חולים או מעמד ביטוחי. תגובה מהירה גם ביישובים קטנים.",
      en: "National emergency medical service. Dial 101 for an ambulance in any medical emergency. Service is free regardless of HMO affiliation or insurance status. Rapid response even in smaller localities.",
      am: "ብሔራዊ የድንገተኛ ሕክምና አገልግሎት። ለማንኛውም ሕክምናዊ ድንገተኛ ሁኔታ 101 ደውሉ። አገልግሎቱ ከጤና ድርጅት ወይም ከቢሕና ደረጃ ሳይጠየቅ ነጻ ነው።",
    },
    category: "emergency",
    phone: "101",
    url: "https://www.mdais.org",
    openHours: {
      he: "24/7",
      en: "24/7",
      am: "24/7",
    },
    isFree: true,
  },

  // ── 7. זכות תרגום — קופות חולים ─────────────────────────────────────────
  {
    slug: "translation-rights-hmo",
    name: {
      he: "זכות לתרגום — קופות חולים (חוק זכויות החולה)",
      en: "Right to Interpretation — HMOs (Patient Rights Act)",
      am: "ትርጉም የማግኘት መብት — ጤና ድርጅቶች (የታካሚ መብቶች ህግ)",
    },
    description: {
      he: "על פי חוק זכויות החולה (1996, סעיף 3), כל מטופל שאינו מבין עברית זכאי לתרגום חינמי במסגרת קופת חולים. יש לבקש מהרופא או הקבלה בכתב, ולתעד את הבקשה. אם הבקשה נדחית, ניתן להתלונן בנציב קבילות הציבור של משרד הבריאות.",
      en: "Under the Patient Rights Act (1996, section 3), every patient who does not understand Hebrew is entitled to free interpretation within their HMO. Request it from the doctor or reception in writing and document the request. If denied, complaints can be filed with the Ministry of Health Public Complaints Commissioner.",
      am: "በታካሚ መብቶች ህግ (1996፣ አንቀጽ 3) መሠረት፣ ዕብራይስጥ የማይረዱ ሁሉም ታካሚዎች ከጤና ድርጅቱ ነጻ ትርጉም የማግኘት መብት አላቸው። ጥያቄውን ለሐኪም ወይም ለቀበላ ፅፎ ማስረዳት ያስፈልጋል። ፈቃዱ ቢ거ፍ፣ ቅሬታ ለጤና ሚኒስቴር ማቅረብ ይቻላል።",
    },
    category: "rights",
    url: "https://www.health.gov.il/UnitsOffice/HR/LegalAdvice/Pages/Patient_rights.aspx",
    isFree: true,
  },
];

/** Return all services in a given category. */
export function servicesByCategory(
  category: HealthServiceCategory,
): HealthServiceEntry[] {
  return HEALTH_SERVICES.filter((s) => s.category === category);
}

/** Compute localised name for a service. Falls back to HE. */
export function serviceName(
  entry: HealthServiceEntry,
  locale: "he" | "en" | "am",
): string {
  return entry.name[locale] ?? entry.name.he;
}

/** Compute localised description for a service. Falls back to HE. */
export function serviceDescription(
  entry: HealthServiceEntry,
  locale: "he" | "en" | "am",
): string {
  return entry.description[locale] ?? entry.description.he;
}

/** Compute localised open-hours string. Falls back to HE when available. */
export function serviceOpenHours(
  entry: HealthServiceEntry,
  locale: "he" | "en" | "am",
): string | undefined {
  if (!entry.openHours) return undefined;
  return entry.openHours[locale] ?? entry.openHours.he;
}
