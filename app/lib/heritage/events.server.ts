// Heritage-event seed (RIN-422 — Wave 3 / RIN-417).
//
// 3 community-significant heritage events: Sigd (a national Israeli
// holiday since 2008), Genna (Ethiopian Christmas, January 7), and Yom
// Aliyah (commemorating immigration from Ethiopia, 28 Iyyar). The route
// layer at `/$lang/heritage/events/$event` and the (event × city)
// programmatic cells emit `Event` JSON-LD which Google indexes as a
// dedicated SERP feature.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. Dates are
// authoritative for each event's calendar pattern; specific year
// observations land via the `nextDate` helper.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { HeritageEventSlug } from "./categories";

export interface HeritageEventEntry {
  slug: HeritageEventSlug;
  name: Translatable;
  shortDescription: Translatable;
  /**
   * Hebrew calendar fixed date (used to compute `nextDate`). For Sigd:
   * 29 Cheshvan. For Genna: Jan 7 (Gregorian). For Aliyah Day: 28 Iyyar.
   * Stored as a free-form description because we don't ship a Hebrew
   * calendar library — `nextDate` returns the next observance year as a
   * Gregorian YYYY-MM-DD string we maintain explicitly here.
   */
  dateDescription: Translatable;
  /** Future observance dates (Gregorian YYYY-MM-DD) — owner updates yearly. */
  upcomingDates: string[];
  /** Slugs of related rights / glossary terms / orgs for cross-links. */
  relatedRights: string[];
  relatedTerms: string[];
  relatedOrgs: string[];
  bodies: Record<Locale, string>;
}

export const HERITAGE_EVENTS: HeritageEventEntry[] = [
  // 1 — Sigd (the headline event) ----------------------------------------
  {
    slug: "sigd",
    name: { he: "סיגד", en: "Sigd", am: "ሰግድ" },
    shortDescription: {
      he: "החג הרשמי המרכזי של יהדות אתיופיה — חודש חשוון, אירוע ראשי בירושלים + 36 ערים.",
      en: "The Ethiopian Jewish community's headline holiday, recognized as a national holiday in 2008 — main observance in Jerusalem with parallel events in 36 cities.",
      am: "የኢትዮጵያ አይሁዳዊ ማህበረሰብ ዋና ብሔራዊ በዓል — በኢየሩሳሌም እና በ36 ከተሞች።",
    },
    dateDescription: {
      he: "29 בחשוון (סוף אוקטובר/תחילת נובמבר)",
      en: "29 Cheshvan (late October / early November)",
      am: "29 ኅዳር (የጥቅምት መጨረሻ / የኅዳር መጀመሪያ)",
    },
    upcomingDates: ["2026-11-19", "2027-11-08", "2028-11-25"],
    relatedRights: ["sigd-funding"],
    relatedTerms: ["sigd", "kessim"],
    relatedOrgs: ["bina", "iaej"],
    bodies: {
      he: `## מה זה סיגד

סיגד הוא חג מרכזי בלוח השנה של יהדות אתיופיה — נחגג מאז המאה ה-15. החג מציין את חידוש הברית של בני ישראל עם אלוהים, על-פי המודל של שיבת ציון בספר נחמיה. ב-2008 נחקק כ-חוק יום הסיגד, והוא חג רשמי במדינת ישראל.

## איפה חוגגים

- **טקס מרכזי בירושלים** — בארמון הנציב, מכנסת ~5,000 בני קהילה. הצום, הקייסים מובילים את התפילות, פלגי מים סמליים
- **טקסים אזוריים** — ב-36 ערים נוספות, בעיקר בקהילות-קליטה (נתניה, רחובות, באר-שבע, חיפה, אשדוד, רמלה, ועוד)
- **בתי ספר** — תכניות לימוד מיוחדות בשבוע שלפני החג

## קייסים

הקייסים (כהני הדת של יהדות אתיופיה) מובילים את הטקסים. בני קהילה רבים שואלים את עצמם על הזמן הקרוב לסיגד — איך להגיע, מה להביא, אם יש שירותי תחבורה מאזורם.

## איך להשתתף

- ירושלים — הסעות מאורגנות מערי קליטה (חינם או בסבסוד)
- במקומך — בקש בעירייה / בית כנסת המקומי
- חינוך — בתי ספר רבים מקיימים פעילות חוויתית בשבוע שלפני

## מימון פעילויות סיגד

יש זכות ממשלתית של סבסוד פעילויות סיגד מקומיות (טקסים, חינוך, תחבורה). ראו [מימון סיגד — זכות](/he/rights/sigd-funding) לפרטים.

## ראו גם

- [סיגד — מילון](/he/glossary/sigd)
- [קייסים — מילון](/he/glossary/kessim)
- [BINA — פרופיל ארגון](/he/orgs/bina)`,
      en: `## What is Sigd

Sigd is a central holiday in the Ethiopian Jewish calendar — celebrated since the 15th century. The holiday marks the renewal of the covenant between the Children of Israel and God, modeled on the return to Zion in the Book of Nehemiah. In 2008, the Sigd Day Law was enacted, and it is now a national holiday in the State of Israel.

## Where it's celebrated

- **Main ceremony in Jerusalem** — at the Armon Hanatziv promenade, gathering ~5,000 community members. Fasting, the Kessim leading prayers, symbolic streams of water
- **Regional ceremonies** — in 36 additional cities, mainly in absorption communities (Netanya, Rehovot, Beersheba, Haifa, Ashdod, Ramla, and more)
- **Schools** — special curricula in the week before the holiday

## The Kessim

The Kessim (Ethiopian Jewish religious leaders) lead the ceremonies. Many community members ask how to get there, what to bring, whether transportation is provided from their area.

## How to participate

- Jerusalem — organized buses from absorption cities (free or subsidized)
- In your area — ask your municipality / local synagogue
- Education — many schools host hands-on activities the week before

## Funding for Sigd activities

There is a government right subsidizing local Sigd activities (ceremonies, education, transportation). See [Sigd funding — right](/en/rights/sigd-funding) for details.

## See also

- [Sigd — glossary](/en/glossary/sigd)
- [Kessim — glossary](/en/glossary/kessim)
- [BINA — organization profile](/en/orgs/bina)`,
      am: `## ሰግድ ምንድን ነው

ሰግድ የኢትዮጵያ አይሁዳዊ የቀን መቁጠሪያ ዋና በዓል ነው — ከ15ኛው ክፍለ ዘመን ጀምሮ ይከበራል። በዓሉ የእስራኤል ልጆች ከእግዚአብሔር ጋር ያለው ቃል ኪዳን መታደሱን ያመለክታል። በ2008 የሰግድ ቀን ህግ ተሻሽሏል፣ አሁን ብሔራዊ በዓል ነው።

## የት ይከበራል

- በኢየሩሳሌም ዋና ስነ-ስርዓት
- በ36 ተጨማሪ ከተሞች
- በትምህርት ቤቶች ልዩ ፕሮግራሞች

## ቄሶች

ቄሶች (የኢትዮጵያ አይሁዳዊ ሃይማኖት መሪዎች) ስነ-ስርዓቶቹን ይመሩ።

## እንዴት ይካፈላሉ

- ኢየሩሳሌም — ከመቀበያ ከተሞች የተደራጀ መጓጓዣ
- በአካባቢዎ — ማዘጋጃ ቤትዎን ይጠይቁ

## ተጨማሪ

- [ሰግድ — መዝገብ](/am/glossary/sigd)
- [ቄሶች — መዝገብ](/am/glossary/kessim)`,
    },
  },

  // 2 — Genna (Ethiopian Christmas) -------------------------------------
  {
    slug: "genna",
    name: { he: "ג'נה — חג מולד אתיופי", en: "Genna — Ethiopian Christmas", am: "ገና" },
    shortDescription: {
      he: "חג המולד של הקהילה הנוצרית האתיופית בישראל — 7 בינואר, חוגגים בכנסיות התיאוטוקוס בירושלים, חיפה ובאר-שבע.",
      en: "Christmas for the Ethiopian Christian community in Israel — January 7, observed at Theotokos churches in Jerusalem, Haifa, and Beersheba.",
      am: "ገና — በእስራኤል ለኢትዮጵያ ክርስቲያኖች የክርስቶስ ልደት — ጥር 7።",
    },
    dateDescription: {
      he: "7 בינואר (לפי הלוח היוליאני של הכנסייה האתיופית-אורתודוקסית)",
      en: "January 7 (per the Julian calendar used by the Ethiopian Orthodox Tewahedo Church)",
      am: "ጥር 7 (በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ጁሊያን ቀን አቆጣጠር)",
    },
    upcomingDates: ["2027-01-07", "2028-01-07", "2029-01-07"],
    relatedRights: [],
    relatedTerms: [],
    relatedOrgs: [],
    bodies: {
      he: `## מה זה ג'נה

ג'נה (ቃላት: "ገና") הוא חג המולד של הכנסייה האתיופית-אורתודוקסית. הכנסייה שומרת על הלוח היוליאני (ולא הגרגוריאני), ולכן ג'נה נחגג ב-7 בינואר ולא ב-25 בדצמבר.

## איפה חוגגים בישראל

- **כנסיית התיאוטוקוס — ירושלים** — הכנסייה המרכזית ב-קומפלקס המנזר האתיופי בעיר העתיקה
- **כנסיית מריה הקדושה — חיפה** — קהילה קטנה אבל פעילה
- **כנסייה האתיופית — באר-שבע** — קהילה צעירה, פעילה בשנים האחרונות

## הטקס

יום הצום מסתיים עם תפילת חצות. אחר-כך — סעודת חג עם בשר, דובו (תבשיל ירק), וטף (דייסה).

## חשוב לדעת

החג הוא בעיקר משפחתי וקהילתי. אורחים שאינם מהקהילה — מוזמנים לתפילה הציבורית של חצות; הסעודה היא משפחתית.`,
      en: `## What is Genna

Genna ("ገና") is the Christmas celebration of the Ethiopian Orthodox Tewahedo Church. The Church follows the Julian calendar (not the Gregorian), so Genna is celebrated on January 7 rather than December 25.

## Where it's celebrated in Israel

- **Theotokos Church — Jerusalem** — the main church at the Ethiopian monastery complex in the Old City
- **Saint Mary's Church — Haifa** — a small but active community
- **Ethiopian Church — Beersheba** — a younger community, active in recent years

## The ceremony

The fast day ends with a midnight prayer. Then — a holiday meal with meat, doro wat (chicken stew), and injera.

## Good to know

The holiday is primarily a family + community affair. Visitors from outside the community are welcome at the public midnight prayer; the meal is family-only.`,
      am: `## ገና ምንድን ነው

ገና በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን የክርስቶስ ልደት ነው። ቤተ ክርስቲያኒቱ የጁሊያን ቀን አቆጣጠር ስለምትከተል ገና በጥር 7 ይከበራል።

## በእስራኤል የሚከበርባቸው ቦታዎች

- ቴዎጦቆስ ቤተ ክርስቲያን — ኢየሩሳሌም
- ቅድስት ማርያም ቤተ ክርስቲያን — ሀይፋ
- ኢትዮጵያ ቤተ ክርስቲያን — ቤርሼባ

## ስነ-ስርዓቱ

የጾም ቀኑ በመንፈቅ ሌሊት ጸሎት ይጠናቀቃል። ከዚያም የበዓል ምግብ።`,
    },
  },

  // 3 — Yom HaAliyah from Ethiopia --------------------------------------
  {
    slug: "aliyah-day",
    name: {
      he: "יום עליית יהודי אתיופיה",
      en: "Ethiopian Aliyah Memorial Day",
      am: "የኢትዮጵያ አሊያ መታሰቢያ ቀን",
    },
    shortDescription: {
      he: "יום הזיכרון הלאומי לעלייה ולנפלי הדרך מאתיופיה — 28 באייר (יום ירושלים + 1).",
      en: "National memorial day for the aliyah from Ethiopia and those who fell along the way — 28 Iyyar (Jerusalem Day + 1).",
      am: "ለኢትዮጵያ አሊያ እና በመንገድ ላይ ለሞቱት ብሔራዊ መታሰቢያ ቀን።",
    },
    dateDescription: {
      he: "28 באייר (יום אחרי יום ירושלים, סוף מאי / תחילת יוני)",
      en: "28 Iyyar (the day after Jerusalem Day, late May / early June)",
      am: "28 ኢያር (ከኢየሩሳሌም ቀን በኋላ ያለ ቀን)",
    },
    upcomingDates: ["2026-05-26", "2027-05-15", "2028-06-02"],
    relatedRights: ["falash-mura-direct-absorption", "klita-basket"],
    relatedTerms: ["aliyah-from-ethiopia", "operation-solomon", "operation-moses"],
    relatedOrgs: ["iaej", "bina"],
    bodies: {
      he: `## מה זה יום עליית יהודי אתיופיה

יום הזיכרון הלאומי שנקבע ב-2017 לציין את המסע ההיסטורי של יהדות אתיופיה לישראל — דרך סודן, ב-מבצע משה (1984) ובמבצע שלמה (1991), ועד היום. ביום הזה גם זוכרים את אלפי בני הקהילה שנפלו במהלך המסע.

## איפה מציינים

- **טקס ממלכתי בהר הרצל** — ב-חלקת חללי הדרך, מצביעים מסכמים את שמות הנופלים
- **בתי ספר** — תכניות לימוד מיוחדות, מפגשים עם עולים ותיקים
- **קהילות מקומיות** — טקסים בכל ערי הקליטה

## למה זה חשוב

מבצעי משה ושלמה הצילו ~16,000 בני קהילה. כ-4,000 נפלו במסע (רעב, מחלות, התקפות). יום הזיכרון מכיר במחיר ההיסטורי של העלייה.

## ראו גם

- [עלייה מאתיופיה — מילון](/he/glossary/aliyah-from-ethiopia)
- [מבצע שלמה — מילון](/he/glossary/operation-solomon)
- [מבצע משה — מילון](/he/glossary/operation-moses)
- [Falash Mura — קליטה ישירה](/he/rights/falash-mura-direct-absorption)`,
      en: `## What is Ethiopian Aliyah Memorial Day

A national memorial day established in 2017 to mark the historic journey of Ethiopian Jewry to Israel — through Sudan, in Operation Moses (1984) and Operation Solomon (1991), and to the present. The day also commemorates the thousands of community members who fell during the journey.

## Where it's observed

- **State ceremony at Mount Herzl** — at the section for those who fell on the way; the names of the fallen are read out
- **Schools** — special curricula, meetings with veteran olim
- **Local communities** — ceremonies in every absorption city

## Why it matters

Operations Moses and Solomon saved ~16,000 community members. About 4,000 fell during the journey (hunger, disease, attacks). The memorial day acknowledges the historic price of the aliyah.

## See also

- [Aliyah from Ethiopia — glossary](/en/glossary/aliyah-from-ethiopia)
- [Operation Solomon — glossary](/en/glossary/operation-solomon)
- [Operation Moses — glossary](/en/glossary/operation-moses)
- [Falash Mura — direct absorption](/en/rights/falash-mura-direct-absorption)`,
      am: `## የኢትዮጵያ አሊያ መታሰቢያ ቀን

በ2017 የተቋቋመ ብሔራዊ መታሰቢያ ቀን — ለኢትዮጵያ አይሁዳዊነት ወደ እስራኤል ታሪካዊ ጉዞ — በሙሴ ኦፕሬሽን (1984) እና በሰሎሞን ኦፕሬሽን (1991)። በመንገድ ላይ የወደቁ የማህበረሰብ አባላትም ይታወሳሉ።

## የት ይከበራል

- በሄርዝል ተራራ ብሔራዊ ስነ-ስርዓት
- በትምህርት ቤቶች ልዩ ፕሮግራሞች
- በመቀበያ ከተሞች የአካባቢ ስነ-ስርዓቶች

## ለምን አስፈላጊ ነው

የሙሴና የሰሎሞን ኦፕሬሽኖች ~16,000 የማህበረሰብ አባላትን አዳኑ። በመንገድ ላይ ~4,000 ወድቀዋል። መታሰቢያ ቀኑ የአሊያ ታሪካዊ ዋጋ ያውቃል።`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findHeritageEvent(slug: string): HeritageEventEntry | null {
  return HERITAGE_EVENTS.find((e) => e.slug === slug) ?? null;
}

export function heritageEventBody(entry: HeritageEventEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}

/** Next observance date (YYYY-MM-DD) or null if all upcomingDates are past. */
export function nextDate(
  entry: HeritageEventEntry,
  now: Date = new Date(),
): string | null {
  const today = now.toISOString().slice(0, 10);
  for (const d of entry.upcomingDates) {
    if (d >= today) return d;
  }
  return null;
}
