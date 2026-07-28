// Professionals directory seed (RIN-444 / part of RIN-417 SEO Wave 2b).
//
// IMPORTANT: each entry is an *anonymous "professional slot"* — a structured
// description of "what to expect when seeking this kind of professional in
// this city for this specialty". This is deliberately NOT a list of named
// individuals — at launch, the directory carries no fabricated identities
// and instead serves as a discoverability layer that:
//   1. ranks for high-intent queries ("עורך דין דובר אמהרית בנתניה")
//   2. teaches users what to ask / look for / expect
//   3. funnels real professionals into the join-the-directory CTA
//
// When real profs onboard via admin flow (RIN-443, deferred), they will
// REPLACE the corresponding slot here. The same slug + URL is preserved so
// the SEO equity transfers.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { Profession } from "./categories";

export type { Profession } from "./categories";

export interface ProfessionalSlot {
  /** URL slug: "{profession}-{citySlug}-{specialty}". */
  slug: string;
  profession: Profession;
  /** Matches a slug from `lib/cities/registry.ts`. */
  citySlug: string;
  /** Short specialty keyword (kebab-case). */
  specialty: string;
  /** Card/header title — "{profession} {city} — {specialty}". */
  title: Translatable;
  /** One-line summary for cards + meta description. */
  shortDescription: Translatable;
  /** Slugs of related rights. */
  relatedRights: string[];
  /** Slugs of related glossary terms. */
  relatedTerms: string[];
  /** Slugs of related orgs. */
  relatedOrgs: string[];
  /** Markdown body × 3 locales. */
  bodies: Record<Locale, string>;
}

// --- Reusable body fragments ------------------------------------------------
// Centralized "join the directory" CTA so it stays consistent across all
// entries and is easy to update when onboarding launches.
const JOIN_CTA: Record<Locale, string> = {
  he: `## הצטרפות לקטלוג

האם אתה איש מקצוע מהקהילה האתיופית-ישראלית או דובר אמהרית? הקטלוג נמצא בשלבי הקמה ראשוניים. **לרישום עתידי**, פנו לטדרוס דרך [טופס הצטרפות](/he/about) ונחזור אליכם כשנפתח.`,
  en: `## Join the directory

Are you an Ethiopian-Israeli or Amharic-speaking professional? The directory is in early build. **For future listing**, reach out via [the join form](/en/about) and we'll get back to you when onboarding opens.`,
  am: `## ወደ ካታሎግ መግባት

የኢትዮጵያ-እስራኤል ወይም አማርኛ-ተናጋሪ ባለሙያ ነዎት? ካታሎጉ በቅድመ-ግንባታ ላይ ነው። **ለወደፊት ምዝገባ**፣ በ[የመግቢያ ቅጽ](/am/about) በኩል ያግኙን፣ ምዝገባ ሲከፈት እንመለስልዎታለን።`,
};

const DISCLAIMER: Record<Locale, string> = {
  he: `> ⚠️ **דף מידע, לא רשימת אנשים**: עמוד זה מתאר *סוג* של איש מקצוע בעיר זו ואת מה שצריך לבדוק לפני בחירה. אנשי מקצוע אמיתיים ייכללו עם פתיחת הרישום.`,
  en: `> ⚠️ **Information page, not a person list**: this page describes the *type* of professional in this city and what to verify before choosing. Real listed professionals will appear once onboarding opens.`,
  am: `> ⚠️ **የመረጃ ገጽ፣ የሰዎች ዝርዝር አይደለም**: ይህ ገጽ በዚህ ከተማ ውስጥ ያለ ባለሙያ *ዓይነት* እና ከመምረጥ በፊት ምን ማረጋገጥ እንዳለብዎ ይገልጻል። እውነተኛ ባለሙያዎች ምዝገባ ሲከፈት ይመዘገባሉ።`,
};

// --- Slot factory -----------------------------------------------------------
// Most entries share the same body skeleton. This helper keeps the seed file
// readable. Each entry only specifies its unique pieces; the wrapper renders
// the full markdown.
function slot(args: {
  profession: Profession;
  citySlug: string;
  specialty: string;
  title: Translatable;
  shortDescription: Translatable;
  whenSeek: Record<Locale, string>;
  whatToCheck: Record<Locale, string>;
  feeNote: Record<Locale, string>;
  relatedRights?: string[];
  relatedTerms?: string[];
  relatedOrgs?: string[];
}): ProfessionalSlot {
  const slug = `${args.profession}-${args.citySlug}-${args.specialty}`;

  function body(
    loc: Locale,
    headings: { when: string; check: string; fee: string },
  ): string {
    return `${DISCLAIMER[loc]}

## ${headings.when}

${args.whenSeek[loc]}

## ${headings.check}

${args.whatToCheck[loc]}

## ${headings.fee}

${args.feeNote[loc]}

${JOIN_CTA[loc]}
`;
  }

  return {
    slug,
    profession: args.profession,
    citySlug: args.citySlug,
    specialty: args.specialty,
    title: args.title,
    shortDescription: args.shortDescription,
    relatedRights: args.relatedRights ?? [],
    relatedTerms: args.relatedTerms ?? [],
    relatedOrgs: args.relatedOrgs ?? [],
    bodies: {
      he: body("he", {
        when: "מתי לפנות?",
        check: "מה לבדוק לפני שמסתייעים",
        fee: "עלויות אופייניות",
      }),
      en: body("en", {
        when: "When to seek help",
        check: "What to verify before choosing",
        fee: "Typical fees",
      }),
      am: body("am", {
        when: "መቼ እርዳታ መፈለግ",
        check: "ከመምረጥ በፊት ምን ማረጋገጥ",
        fee: "የተለመዱ ክፍያዎች",
      }),
    },
  };
}

// --- 30 directory slots -----------------------------------------------------
// Distribution: 8 professions × balanced community-cities coverage.

export const PROFESSIONALS: ProfessionalSlot[] = [
  // --- Lawyers (7 entries) -------------------------------------------------
  slot({
    profession: "lawyer",
    citySlug: "netanya",
    specialty: "family-law",
    title: {
      he: "עורכ/ת דין דוברי אמהרית — נתניה — דיני משפחה",
      en: "Amharic-speaking Lawyer — Netanya — Family Law",
      am: "አማርኛ ተናጋሪ ጠበቃ — ነታንያ — የቤተሰብ ሕግ",
    },
    shortDescription: {
      he: "ייצוג בענייני גירושין, מזונות, משמורת ומעמד-אישי. ליווי בשפת המקור.",
      en: "Representation in divorce, alimony, custody, and personal-status matters. Native-language support.",
      am: "በፍቺ፣ ምግብ፣ ጠባቂነት እና የግል ሁኔታ ጉዳዮች ውክልና። በቋንቋ ድጋፍ።",
    },
    whenSeek: {
      he: 'כשנדרש סיוע משפטי בענייני גירושין/מזונות/משמורת ויש העדפה לליווי בשפה אמהרית. עו"ד דובר/ת אמהרית מבטיח/ה הבנה מלאה של הניסוחים המשפטיים — קריטי במצבים בהם אי-הבנה עלולה לפגוע בזכויות.',
      en: "When you need legal assistance in divorce/alimony/custody and prefer Amharic-language support. An Amharic-speaking lawyer ensures full comprehension of legal phrasing — critical in situations where misunderstanding can compromise rights.",
      am: "በፍቺ/ምግብ/ጠባቂነት ሕጋዊ እርዳታ ሲፈልጉና በአማርኛ ድጋፍ ሲመርጡ። አማርኛ ተናጋሪ ጠበቃ ሕጋዊ ቃላትን ሙሉ ለሙሉ መረዳትን ያረጋግጣል — አለመግባባት መብቶችን ሊጎዳ በሚችል ሁኔታ ወሳኝ።",
    },
    whatToCheck: {
      he: '- רישיון עריכת דין בתוקף (אתר לשכת עוה"ד)\n- ניסיון מוכח בדיני משפחה (≥ 3 שנים)\n- חברות בועדת דיני משפחה של הלשכה\n- שפת אמהרית רהוטה (לא מתורגמן בלבד)',
      en: "- Active bar license (verify on Bar Association website)\n- Documented family-law experience (3+ years)\n- Family-law committee membership at the Bar Association\n- Fluent Amharic (not via interpreter only)",
      am: "- ሕያው የሕግ ፈቃድ (በባር ማህበር ድረ-ገጽ ያረጋግጡ)\n- የቤተሰብ ሕግ ልምድ (3+ ዓመታት)\n- በባር ማህበር የቤተሰብ ሕግ ኮሚቴ አባልነት\n- አቀላጥፎ አማርኛ (በአስተርጓሚ ብቻ አይደለም)",
    },
    feeNote: {
      he: "פגישת ייעוץ ראשונה: ₪500-800. תיק גירושין מלא: ₪15,000-30,000. ניתן לבקש סיוע ממשרד-המשפטים (סיוע משפטי) או מ-Tebeka עבור זכאים.",
      en: "Initial consultation: ₪500-800. Full divorce case: ₪15,000-30,000. Eligible community members can request assistance from the Ministry of Justice (Legal Aid) or Tebeka.",
      am: "የመጀመሪያ ምክክር: ₪500-800። ሙሉ የፍቺ ጉዳይ: ₪15,000-30,000። ብቁ የማህበረሰብ አባላት ከፍትህ ሚኒስቴር (ሕጋዊ እርዳታ) ወይም ከጠበቃ እርዳታ መጠየቅ ይችላሉ።",
    },
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["tebeka", "beta-israel"],
    relatedOrgs: ["tebeka", "iaej"],
  }),

  slot({
    profession: "lawyer",
    citySlug: "rehovot",
    specialty: "immigration-law",
    title: {
      he: "עורכ/ת דין דוברי אמהרית — רחובות — דיני עלייה",
      en: "Amharic-speaking Lawyer — Rehovot — Immigration Law",
      am: "አማርኛ ተናጋሪ ጠበቃ — ሬሆቮት — የስደት ሕግ",
    },
    shortDescription: {
      he: "מעמד אישי, איחוד משפחות, עלייה לפי חוק השבות, אזרחות. תיקי פלשמורה.",
      en: "Personal status, family reunification, aliyah under the Law of Return, citizenship. Falash Mura cases.",
      am: "የግል ሁኔታ፣ የቤተሰብ ዳግም ግንኙነት፣ በመመለስ ሕግ ዐሊያህ፣ ዜግነት። የፋላሽ ሙራ ጉዳዮች።",
    },
    whenSeek: {
      he: "תיקי פלשמורה (איחוד משפחות עם קרובים שעדיין באתיופיה), אזרחות לדור 2 שנולד מחוץ לישראל, סבכי-מסמכים מהעלייה. דיני עלייה בענייני אתיופיה דורשים ניסיון ספציפי במחלקה זו של רשות ההגירה.",
      en: "Falash Mura cases (family reunification with relatives still in Ethiopia), citizenship for 2nd-gen born outside Israel, documentation tangles from aliyah. Ethiopian-context immigration law requires specific experience with this department of the Population Authority.",
      am: "የፋላሽ ሙራ ጉዳዮች (በኢትዮጵያ ካሉ ዘመዶች ጋር ቤተሰብ ዳግም ግንኙነት)፣ ከእስራኤል ውጭ የተወለዱ የ2ኛ ትውልድ ዜግነት፣ ከስደት የመጡ የሰነድ ችግሮች። የኢትዮጵያ-አውዱ የስደት ሕግ የተለየ ልምድ ይፈልጋል።",
    },
    whatToCheck: {
      he: "- ניסיון מתועד בתיקים מול רשות האוכלוסין וההגירה\n- היכרות עם תקנות 716/2015 ו-תקנות 4399/2018 (פלשמורה)\n- שותפות עם IAEJ או Tebeka\n- אמהרית/תיגרינית רהוטה (קליטת מסמכים לא-מתורגמים)",
      en: "- Documented experience with Population Authority cases\n- Familiarity with Resolution 716/2015 and 4399/2018 (Falash Mura)\n- Partnership with IAEJ or Tebeka\n- Fluent Amharic/Tigrinya (handling untranslated documents)",
      am: "- በሕዝብ ባለሥልጣን ጉዳዮች የተመዘገበ ልምድ\n- ከውሳኔ 716/2015 እና 4399/2018 (ፋላሽ ሙራ) ጋር መተዋወቅ\n- ከIAEJ ወይም ከጠበቃ ጋር ሽርክና\n- አቀላጥፎ አማርኛ/ትግርኛ (ያልተተረጎመ ሰነድ ማስተናገድ)",
    },
    feeNote: {
      he: "ייעוץ: ₪600-900. תיק איחוד-משפחות: ₪10,000-25,000 (תלוי במורכבות). תיקים בעלי קשר ל-IAEJ עשויים לקבל סבסוד.",
      en: "Consultation: ₪600-900. Family-reunification case: ₪10,000-25,000 (complexity-dependent). Cases tied to IAEJ may receive subsidy.",
      am: "ምክክር: ₪600-900። የቤተሰብ ዳግም ግንኙነት ጉዳይ: ₪10,000-25,000 (በውስብስብነት የተወሰነ)። ከIAEJ ጋር የተያያዙ ጉዳዮች ድጎማ ሊያገኙ ይችላሉ።",
    },
    relatedRights: ["falash-mura-direct-absorption", "klita-basket"],
    relatedTerms: ["falash-mura", "aliyah-from-ethiopia"],
    relatedOrgs: ["iaej", "tebeka"],
  }),

  slot({
    profession: "lawyer",
    citySlug: "jerusalem",
    specialty: "civil-rights",
    title: {
      he: "עורכ/ת דין דוברי אמהרית — ירושלים — זכויות אזרח",
      en: "Amharic-speaking Lawyer — Jerusalem — Civil Rights",
      am: "አማርኛ ተናጋሪ ጠበቃ — ኢየሩሳሌም — የዜጎች መብቶች",
    },
    shortDescription: {
      he: "מקרי גזענות, אכיפה משטרתית מופרזת, אפליה בעבודה ובדיור. ייצוג בתביעות אזרחיות ופליליות.",
      en: "Racism cases, excessive police force, employment and housing discrimination. Representation in civil and criminal suits.",
      am: "የዘረኝነት ጉዳዮች፣ ከመጠን ያለፈ የፖሊስ ኃይል፣ የሥራና የመኖሪያ መድሎ። በሲቪልና ወንጀል ክሶች ውክልና።",
    },
    whenSeek: {
      he: "מקרי-גזענות מאומתים, שימוש מופרז בכוח של שוטר/ת, אפליה בעת חיפוש דיור או מקום-עבודה, פגיעה בזכויות-אזרחיות בסיסיות. בירושלים יש לתפס במהירות בגלל ה-jurisdiction של בית-המשפט המחוזי.",
      en: "Documented racism, excessive force by police, discrimination in housing or employment, violations of basic civil rights. In Jerusalem, act fast given the District Court's jurisdiction.",
      am: "የተመዘገቡ የዘረኝነት ጉዳዮች፣ በፖሊስ ከመጠን ያለፈ ኃይል፣ በመኖሪያ ቤት ወይም ሥራ መድሎ፣ መሰረታዊ የዜጎች መብት ጥሰት። በኢየሩሳሌም በወረዳ ፍርድ ቤት ስልጣን ምክንያት በፍጥነት እርምጃ ይውሰዱ።",
    },
    whatToCheck: {
      he: "- ניסיון בייצוג נגד גופי-מדינה ומשטרה\n- שותפות פעילה עם Tebeka\n- חברות בועדה הזכויות של הלשכה\n- היסטוריית-תיקים פומבית (ניתן לבקש)",
      en: "- Experience representing against state bodies and police\n- Active partnership with Tebeka\n- Civil-rights committee membership at the Bar\n- Public case history (request when needed)",
      am: "- በመንግስት አካላት እና ፖሊስ ላይ ውክልና ልምድ\n- ከጠበቃ ጋር ንቁ ሽርክና\n- በባር ማህበር የዜጎች መብት ኮሚቴ አባልነት\n- የህዝብ ጉዳዮች ታሪክ (ሲጠይቁ)",
    },
    feeNote: {
      he: "ייעוץ ראשוני חינם דרך Tebeka. תיק אזרחי מלא: ₪8,000-25,000 או pro-bono לזכאים. תביעות פיצויים מקבלות לעיתים אחוזים מההיקף.",
      en: "Free initial consultation via Tebeka. Full civil case: ₪8,000-25,000 or pro-bono for eligible. Damages claims sometimes contingency-fee.",
      am: "በጠበቃ በኩል ነጻ የመጀመሪያ ምክክር። ሙሉ የሲቪል ጉዳይ: ₪8,000-25,000 ወይም ለብቁ pro-bono። የጉዳት ካሳ ጥያቄዎች አንዳንድ ጊዜ የውሎ ክፍያ።",
    },
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["tebeka", "beta-israel"],
    relatedOrgs: ["tebeka", "iaej"],
  }),

  slot({
    profession: "lawyer",
    citySlug: "rishon-lezion",
    specialty: "real-estate",
    title: {
      he: 'עורכ/ת דין דוברי אמהרית — ראשון לציון — דיני נדל"ן',
      en: "Amharic-speaking Lawyer — Rishon LeZion — Real Estate Law",
      am: "አማርኛ ተናጋሪ ጠበቃ — ሪሾን ለጽዮን — የንብረት ሕግ",
    },
    shortDescription: {
      he: "ליווי עסקת קנייה/מכירה/שכירות, רישום משכנתא, סבכי-טאבו ופינוי-בינוי.",
      en: "Buy/sell/rent transactions, mortgage registration, land-registry tangles, urban renewal.",
      am: "ግዢ/ሽያጭ/ኪራይ ግብይቶች፣ የብድር ምዝገባ፣ የመሬት መዝገብ ችግሮች፣ የከተማ መታደስ።",
    },
    whenSeek: {
      he: "בכל עסקת רכישת נכס (חובה!), הסכם שכירות מורכב, רישום משכנתא קהילתית-של-600K, או סבך טאבו (פלשמורה ללא מסמכי-בעלות מאתיופיה). בראשון לציון: עומס גבוה של פינוי-בינוי.",
      en: "On every property purchase (mandatory!), complex rental agreements, registering the 600K community mortgage, or land-registry tangles (Falash Mura without ownership docs from Ethiopia). High urban-renewal volume in Rishon LeZion.",
      am: "በሁሉም የንብረት ግዢ (ግዴታ!)፣ ውስብስብ የኪራይ ስምምነቶች፣ የ600K የማህበረሰብ ብድር ምዝገባ፣ ወይም የመሬት መዝገብ ችግሮች። በሪሾን ለጽዮን: ከፍተኛ የከተማ መታደስ መጠን።",
    },
    whatToCheck: {
      he: "- רישיון עורך-דין-תיווך בתוקף\n- ניסיון מתועד במשכנתא הקהילתית\n- היכרות עם הסכמי-מסגרת של בנק לאומי/דיסקונט/איגוד\n- היכרות עם תכניות פינוי-בינוי באזור",
      en: "- Active real-estate-lawyer license\n- Documented experience with the community mortgage\n- Familiarity with Bank Leumi/Discount/Igud framework agreements\n- Familiarity with local urban-renewal plans",
      am: "- ሕያው የንብረት ጠበቃ ፈቃድ\n- በማህበረሰብ ብድር የተመዘገበ ልምድ\n- ከሊዩሚ/ዲስካውንት/ኢጉድ ባንክ ስምምነቶች ጋር መተዋወቅ\n- ከአካባቢ የከተማ መታደስ እቅዶች ጋር",
    },
    feeNote: {
      he: 'עסקת רכישה: 0.5%-1% משווי הנכס + מע"מ. ייצוג שכירות: ₪800-1,500. תיק פינוי-בינוי: ₪3,000-8,000.',
      en: "Purchase transaction: 0.5%-1% of property value + VAT. Rental representation: ₪800-1,500. Urban-renewal case: ₪3,000-8,000.",
      am: "የግዢ ግብይት: ከንብረት ዋጋ 0.5%-1% + VAT። የኪራይ ውክልና: ₪800-1,500። የከተማ መታደስ ጉዳይ: ₪3,000-8,000።",
    },
    relatedRights: ["600k-mortgage", "urban-renewal-ramat-eliyahu"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: [],
  }),

  slot({
    profession: "lawyer",
    citySlug: "beer-sheva",
    specialty: "labor-law",
    title: {
      he: "עורכ/ת דין דוברי אמהרית — באר שבע — דיני עבודה",
      en: "Amharic-speaking Lawyer — Beersheba — Labor Law",
      am: "አማርኛ ተናጋሪ ጠበቃ — ቤርሼባ — የሥራ ሕግ",
    },
    shortDescription: {
      he: "פיטורין שלא כדין, אפליה במקום העבודה, תביעות פיצויים ושכר. גם ליווי בארגוני-עובדים.",
      en: "Unfair dismissal, workplace discrimination, severance and wage claims. Also union accompaniment.",
      am: "ያላግባብ መባረር፣ በሥራ ቦታ መድሎ፣ የመውጫና የደመወዝ ጥያቄዎች። የሠራተኞች ማህበር ድጋፍ።",
    },
    whenSeek: {
      he: "פיטורי-יום-אחד ללא הרשמה, אפליה בקידום, סירוב לתשלום פיצויים מלאים, ירידה-ב-שכר ללא הסכמה, או צורך בייצוג בועדת-משמעת. בנגב: דרוש זמינות לעמוד מול מעסיקים תעשייתיים גדולים (סודה-בלוקר, חב' בנייה).",
      en: "Same-day dismissal without registration, promotion discrimination, denial of full severance, unilateral salary cuts, or representation in disciplinary committees. In the Negev: must be available to face large industrial employers (Soda-Blocker, construction firms).",
      am: "ያለ ምዝገባ የቀን-አንድ መባረር፣ የእድገት መድሎ፣ ሙሉ የመውጫ ክፍያ መከልከል፣ ያለ ስምምነት የደመወዝ ቅነሳ፣ ወይም በዲሲፕሊን ኮሚቴ ውክልና። በነጎቭ: ትላልቅ ኢንዱስትሪ አሰሪዎችን መጋፈጥ የሚችል መሆን አለበት።",
    },
    whatToCheck: {
      he: "- ניסיון בבית-הדין-לעבודה (≥ 3 שנים)\n- היכרות עם דיני-עבודה-קולקטיביים\n- שותפות עם ההסתדרות או עם ועדים-עצמאיים\n- אמהרית רהוטה (חוזי-עבודה לא תמיד מתורגמים)",
      en: "- Labor Court experience (3+ years)\n- Familiarity with collective labor law\n- Partnership with the Histadrut or independent unions\n- Fluent Amharic (employment contracts aren't always translated)",
      am: "- የሥራ ፍርድ ቤት ልምድ (3+ ዓመታት)\n- ከጋራ የሥራ ሕግ ጋር መተዋወቅ\n- ከሂስታድሩት ወይም ከራሳቸው ማህበራት ጋር ሽርክና\n- አቀላጥፎ አማርኛ",
    },
    feeNote: {
      he: "ייעוץ: ₪400-700. תביעת פיטורין: ₪3,500-12,000 או 25% מההיקף. ייצוג בועדת-משמעת: ₪1,500-3,000.",
      en: "Consultation: ₪400-700. Dismissal claim: ₪3,500-12,000 or 25% contingency. Disciplinary committee: ₪1,500-3,000.",
      am: "ምክክር: ₪400-700። የመባረር ጥያቄ: ₪3,500-12,000 ወይም 25% ውሎ። የዲሲፕሊን ኮሚቴ: ₪1,500-3,000።",
    },
    relatedRights: ["public-sector-representation"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["tebeka"],
  }),

  slot({
    profession: "lawyer",
    citySlug: "haifa",
    specialty: "criminal-defense",
    title: {
      he: "עורכ/ת דין דוברי אמהרית — חיפה — הגנה פלילית",
      en: "Amharic-speaking Lawyer — Haifa — Criminal Defense",
      am: "አማርኛ ተናጋሪ ጠበቃ — ሐይፋ — የወንጀል ጥብቅና",
    },
    shortDescription: {
      he: 'ייצוג בחקירת משטרה, הגנה בכתבי אישום, ייצוג נוער. עדיפות לעו"ד עם רקע ספציפי בקהילה.',
      en: "Representation in police interrogation, defense in indictments, youth representation. Prefer lawyers with community-specific background.",
      am: "በፖሊስ ምርመራ ውክልና፣ በክስ ጥብቅና፣ የወጣት ውክልና። የማህበረሰብ-ልዩ ዳራ ያላቸው ጠበቆች ይመረጣሉ።",
    },
    whenSeek: {
      he: '**מיידי** — אם נעצר/ת או מוזמן/נת לחקירה (זכותך לעו"ד מהרגע הראשון). פנו ל-Tebeka תחילה לסיוע מיידי. בחיפה: ניסיון מול בית-משפט שלום + מחוזי.',
      en: "**Immediately** — if arrested or summoned to interrogation (right to counsel from minute one). Contact Tebeka first for immediate help. In Haifa: magistrate + district court experience needed.",
      am: "**ወዲያውኑ** — ከታሰሩ ወይም ለምርመራ ከተጠሩ (ከመጀመሪያው ደቂቃ የጠበቃ መብት)። ለፈጣን እርዳታ መጀመሪያ ጠበቃን ያግኙ።",
    },
    whatToCheck: {
      he: "- ניסיון בבתי-משפט שלום + מחוזי בצפון\n- היסטוריית-זיכויים פומבית\n- שותפות עם Tebeka לתיקים בעלי רקע גזעני\n- זמינות חירום 24/7 (חיוני)",
      en: "- Magistrate + District Court (north) experience\n- Public acquittals history\n- Partnership with Tebeka for cases with racism backdrop\n- 24/7 emergency availability (essential)",
      am: "- የሰላም + የወረዳ ፍርድ ቤት (በሰሜን) ልምድ\n- የህዝብ ነጻ መሆን ታሪክ\n- ለዘረኝነት ዳራ ጉዳዮች ከጠበቃ ጋር ሽርክና\n- 24/7 የአደጋ ጊዜ ተደራሽነት",
    },
    feeNote: {
      he: "ייעוץ דחוף: ₪500-800 לשעה. תיק הגנה מלא: ₪10,000-50,000 (תלוי בחומרה). סיוע משפטי ציבורי לזכאים.",
      en: "Urgent consultation: ₪500-800/hour. Full defense case: ₪10,000-50,000 (severity-dependent). Public legal aid for eligible.",
      am: "አስቸኳይ ምክክር: በሰዓት ₪500-800። ሙሉ የጥብቅና ጉዳይ: ₪10,000-50,000። ለብቁ የህዝብ ሕጋዊ እርዳታ።",
    },
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["tebeka"],
    relatedOrgs: ["tebeka"],
  }),

  slot({
    profession: "lawyer",
    citySlug: "ashkelon",
    specialty: "social-security",
    title: {
      he: "עורכ/ת דין דוברי אמהרית — אשקלון — ביטוח לאומי",
      en: "Amharic-speaking Lawyer — Ashkelon — Social Security",
      am: "አማርኛ ተናጋሪ ጠበቃ — አሽኬሎን — ብሔራዊ ኢንሹራንስ",
    },
    shortDescription: {
      he: "ערעורים על ביטוח-לאומי: נכות, אבטלה, סיעוד, השלמת-הכנסה. ליווי בועדות רפואיות.",
      en: "National Insurance appeals: disability, unemployment, long-term care, income supplement. Medical-committee accompaniment.",
      am: "የብሔራዊ ኢንሹራንስ ይግባኝ: የአካል ጉዳት፣ ሥራ አጥነት፣ የረዥም ጊዜ እንክብካቤ፣ የገቢ ድጎማ።",
    },
    whenSeek: {
      he: 'דחיית בקשת-נכות, ערעור על אחוז-נכות, סירוב להעניק קצבת-סיעוד או השלמת-הכנסה. ועדה רפואית במצב מורכב — ליווי עו"ד יכול להעלות סיכויי-זכייה משמעותית.',
      en: "Disability claim denial, disability-percentage appeal, denial of long-term-care or income supplement. Medical committee in complex situations — lawyer accompaniment can significantly raise success rates.",
      am: "የአካል ጉዳት ጥያቄ መከልከል፣ የአካል ጉዳት መቶኛ ይግባኝ፣ የረዥም ጊዜ እንክብካቤ ወይም የገቢ ድጎማ መከልከል። በውስብስብ ሁኔታ የሕክምና ኮሚቴ — የጠበቃ አጃቢነት የስኬት እድልን ሊያሳድግ ይችላል።",
    },
    whatToCheck: {
      he: "- ניסיון מתועד בערעורים בביטוח-לאומי\n- שיעור-זכייה (ניתן לבקש בנימוס)\n- היכרות עם סוגיות בריאות-ייחודיות לקהילה (סוכרת, יתר-לחץ-דם)\n- שותפות עם טנא בריאות לליווי-תיקים",
      en: "- Documented appeal experience\n- Win rate (politely request)\n- Familiarity with community-specific health issues (diabetes, hypertension)\n- Partnership with Tene Briut for case accompaniment",
      am: "- የተመዘገበ የይግባኝ ልምድ\n- የስኬት መጠን (ጨዋነት ጠይቁ)\n- ከማህበረሰብ-ልዩ የጤና ጉዳዮች ጋር መተዋወቅ\n- ከቴኔ ብሪዩት ጋር ሽርክና",
    },
    feeNote: {
      he: "ייעוץ: ₪300-500. תיק ערעור מלא: ₪3,000-7,000 או 25% מההפרש. סיוע משפטי לזכאים.",
      en: "Consultation: ₪300-500. Full appeal case: ₪3,000-7,000 or 25% of differential. Legal aid for eligible.",
      am: "ምክክር: ₪300-500። ሙሉ የይግባኝ ጉዳይ: ₪3,000-7,000። ለብቁ ሕጋዊ እርዳታ።",
    },
    relatedRights: ["chronic-disease-prevention"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["tene-briut"],
  }),

  // --- Psychologists (5 entries) -------------------------------------------
  slot({
    profession: "psychologist",
    citySlug: "netanya",
    specialty: "trauma",
    title: {
      he: "פסיכולוג/ית קליני/ת דוברי אמהרית — נתניה — טראומה",
      en: "Amharic-speaking Clinical Psychologist — Netanya — Trauma",
      am: "አማርኛ ተናጋሪ ክሊኒካል ሳይኮሎጂስት — ነታንያ — ትራውማ",
    },
    shortDescription: {
      he: "טיפול בטראומת-עלייה, אבל-קולקטיבי, וטראומות-בין-דוריות. גישה תרבותית-קלינית.",
      en: "Treatment of aliyah trauma, collective grief, and intergenerational trauma. Cultural-clinical approach.",
      am: "የስደት ትራውማ፣ የጋራ ሀዘን፣ እና የትውልድ መካከል ትራውማ ሕክምና።",
    },
    whenSeek: {
      he: "תסמיני PTSD מהמסע מ-אתיופיה (סודן, מחנות-פליטים), אובדנים-בלתי-מתועדים מבני-משפחה, מתח-בין-דורי בין הורי-עולים לדור 2. נתניה: ריכוז גבוה של עולי-1991 — צוות-טיפולי מנוסה.",
      en: "PTSD symptoms from the Ethiopia journey (Sudan, refugee camps), undocumented loss of family, intergenerational stress between immigrant parents and 2nd-gen. Netanya: high concentration of 1991 olim — experienced therapy teams.",
      am: "ከኢትዮጵያ ጉዞ የተነሳ የPTSD ምልክቶች (ሱዳን፣ የስደት ካምፖች)፣ ያልተመዘገበ የቤተሰብ ኪሳራ፣ በስደተኛ ወላጆችና 2ኛ ትውልድ መካከል ውጥረት።",
    },
    whatToCheck: {
      he: '- רישוי משרד-הבריאות (פסיכולוג קליני)\n- הכשרה בטיפול בטראומה (EMDR, CBT-Trauma)\n- ניסיון תרבותי עם הקהילה (≥ 5 שנים)\n- הפניה דרך טנא בריאות / קופ"ח',
      en: "- Ministry of Health licensing (clinical psychologist)\n- Trauma-therapy training (EMDR, CBT-Trauma)\n- Cultural experience with the community (5+ years)\n- Referral via Tene Briut / HMO",
      am: "- የጤና ሚኒስቴር ፈቃድ\n- የትራውማ ሕክምና ስልጠና (EMDR፣ CBT-Trauma)\n- የማህበረሰብ ባህላዊ ልምድ (5+ ዓመታት)",
    },
    feeNote: {
      he: 'פגישה ב-קופ"ח: השתתפות-עצמית ₪35-60. פרטית: ₪350-550 לפגישה. ועדים-מקצועיים יכולים לאשר 24-48 פגישות בקופה.',
      en: "HMO session: ₪35-60 co-pay. Private: ₪350-550 per session. Professional committees can approve 24-48 HMO sessions.",
      am: "በኤች.ኤም.ኦ ክፍለ ጊዜ: ₪35-60 የራሳቸው ድርሻ። የግል: በክፍለ ጊዜ ₪350-550።",
    },
    relatedRights: ["chronic-disease-prevention"],
    relatedTerms: ["aliyah-from-ethiopia", "operation-solomon"],
    relatedOrgs: ["tene-briut", "jdc-ashalim"],
  }),

  slot({
    profession: "psychologist",
    citySlug: "rehovot",
    specialty: "family-therapy",
    title: {
      he: "פסיכולוג/ית משפחתי/ת דוברי אמהרית — רחובות — תרפיה זוגית-משפחתית",
      en: "Amharic-speaking Family Psychologist — Rehovot — Family Therapy",
      am: "አማርኛ ተናጋሪ የቤተሰብ ሳይኮሎጂስት — ሬሆቮት — የቤተሰብ ሕክምና",
    },
    shortDescription: {
      he: "פערים-בין-דוריים, מתחי-תפקידים מסורתיים, ייעוץ זוגי בעקבות עלייה.",
      en: "Generational gaps, traditional-role tensions, couples' counseling post-aliyah.",
      am: "የትውልዶች ልዩነት፣ የባህላዊ ሚና ውጥረት፣ ከስደት በኋላ የጋብቻ ምክክር።",
    },
    whenSeek: {
      he: "מתחי-משפחה לאחר עלייה (תפקידי-מגדר, סטטוס בעבודה), נישואים שעוברים משבר תרבותי, פערים בין הורים לילדים שגדלו בארץ. גישה תרבותית-יודעת חיונית.",
      en: "Family tensions post-aliyah (gender roles, job status), marriages experiencing cultural crisis, gaps between parents and Israeli-raised children.",
      am: "ከስደት በኋላ የቤተሰብ ውጥረት፣ የባህል ቀውስ የሚያጋጥማቸው ጋብቻዎች፣ በወላጆችና በእስራኤል በተወለዱ ልጆች መካከል ያለ ልዩነት።",
    },
    whatToCheck: {
      he: "- רישוי + הסמכה לטיפול-משפחתי\n- ניסיון מתועד עם זוגות יוצאי-אתיופיה\n- עבודה בקבוצה (אופציה לקבוצות-תמיכה)",
      en: "- Licensing + family-therapy certification\n- Documented experience with Ethiopian-Israeli couples\n- Group work (option for support groups)",
      am: "- ፈቃድ + የቤተሰብ ሕክምና ማረጋገጫ\n- ከኢትዮጵያ-እስራኤል ጥንዶች የተመዘገበ ልምድ",
    },
    feeNote: {
      he: "קופ\"ח: השתתפות ₪40-70. פרטית: ₪400-600 לפגישה זוגית. תכנית 'משפחות-חזקות' של JDC-אשלים: סבסוד מלא לזכאים.",
      en: "HMO: ₪40-70 co-pay. Private: ₪400-600 per couples' session. 'Strong Families' program by JDC-Ashalim: full subsidy for eligible.",
      am: "ኤች.ኤም.ኦ: ₪40-70 ድርሻ። የግል: በክፍለ ጊዜ ₪400-600። የJDC-አሻሊም 'ጠንካራ ቤተሰቦች' ፕሮግራም: ለብቁ ሙሉ ድጎማ።",
    },
    relatedRights: ["domestic-violence-support"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["jdc-ashalim", "tene-briut"],
  }),

  slot({
    profession: "psychologist",
    citySlug: "beer-sheva",
    specialty: "youth",
    title: {
      he: "פסיכולוג/ית-נוער דוברי אמהרית — באר שבע — בני-נוער בסיכון",
      en: "Amharic-speaking Youth Psychologist — Beersheba — At-Risk Youth",
      am: "አማርኛ ተናጋሪ የወጣት ሳይኮሎጂስት — ቤርሼባ — ለአደጋ የተጋለጡ ወጣቶች",
    },
    shortDescription: {
      he: "ילדים ובני-נוער: בעיות-בית-ספר, נשירה, התמכרויות, דכאון. תיווך מערכת-בריאות.",
      en: "Children and youth: school issues, dropout, addictions, depression. Health-system mediation.",
      am: "ልጆችና ወጣቶች: የትምህርት ቤት ችግሮች፣ ማቋረጥ፣ ሱሰኝነት፣ ድብርት።",
    },
    whenSeek: {
      he: "בן/בת-נוער שמתקשה בבית-ספר, מסתבך/ת ב-משטרה, מראה/ת סימנים של דכאון או חרדה, או נושא/ת נטל הסטוריה משפחתית. בנגב: שיתוף-פעולה עם חברים בטבע + עתיד במדבר.",
      en: "A youth struggling in school, getting into trouble with police, showing signs of depression/anxiety, or carrying family-history burden. In the Negev: partnership with Friends by Nature + Atid B'midbar.",
      am: "በትምህርት ቤት የሚቸገር ወጣት፣ ከፖሊስ ጋር ችግር ላይ የወደቀ፣ የድብርት/ጭንቀት ምልክት የሚያሳይ።",
    },
    whatToCheck: {
      he: "- רישוי + הסמכה ילד-נוער\n- ניסיון בעבודה עם בני-נוער יוצאי אתיופיה\n- שותפות עם חברים-בטבע / ENP / SPACE",
      en: "- Licensing + child-youth certification\n- Experience with Ethiopian-Israeli youth\n- Partnership with Friends by Nature / ENP / SPACE",
      am: "- ፈቃድ + የልጅ-ወጣት ማረጋገጫ\n- ከኢትዮጵያ-እስራኤል ወጣቶች ልምድ",
    },
    feeNote: {
      he: 'קופ"ח: השתתפות ₪30-60. פרטית: ₪300-500. סבסוד דרך JDC-אשלים / חברים-בטבע לזכאים.',
      en: "HMO: ₪30-60 co-pay. Private: ₪300-500. Subsidy via JDC-Ashalim / Friends by Nature for eligible.",
      am: "ኤች.ኤም.ኦ: ₪30-60 ድርሻ። የግል: ₪300-500።",
    },
    relatedRights: ["summer-camps-subsidy", "domestic-violence-support"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["friends-by-nature", "atid-bamidbar", "jdc-ashalim"],
  }),

  slot({
    profession: "psychologist",
    citySlug: "ashdod",
    specialty: "anxiety-depression",
    title: {
      he: "פסיכולוג/ית קליני/ת דוברי אמהרית — אשדוד — חרדה ודכאון",
      en: "Amharic-speaking Clinical Psychologist — Ashdod — Anxiety & Depression",
      am: "አማርኛ ተናጋሪ ክሊኒካል ሳይኮሎጂስት — አሽዶድ — ጭንቀትና ድብርት",
    },
    shortDescription: {
      he: "טיפול קוגניטיבי-התנהגותי לחרדה, דכאון, ופוסט-טראומה. גישה ידידותית-לתרבות.",
      en: "Cognitive-behavioral therapy for anxiety, depression, and post-trauma. Culturally-friendly approach.",
      am: "ለጭንቀት፣ ድብርት እና ድህረ-ትራውማ የግንዛቤ-ባህሪ ሕክምና።",
    },
    whenSeek: {
      he: 'תסמיני חרדה/דכאון מתמשכים שלא משתפרים, מחשבות אובדניות, התקפי-פאניקה. **סכנת-חיים — צאו לעזרה מיידית: ער"ן 1201 / קוו-החיים 1800-243-1234.**',
      en: "Persistent anxiety/depression not improving, suicidal ideation, panic attacks. **Life-threatening — seek help immediately: ERAN 1201 / Life Line 1800-243-1234.**",
      am: "የማይሻሻል ጭንቀት/ድብርት፣ ራስን ስለመግደል ሀሳብ፣ የፍርሃት ጥቃት። **ሕይወት አደጋ ላይ — ወዲያውኑ እርዳታ ይፈልጉ።**",
    },
    whatToCheck: {
      he: "- רישוי בתוקף\n- הכשרה ב-CBT (Cognitive Behavioral)\n- אמהרית רהוטה (סקלות-מדידה לא תמיד מתורגמות)",
      en: "- Active license\n- CBT training\n- Fluent Amharic (assessment scales not always translated)",
      am: "- ሕያው ፈቃድ\n- የCBT ስልጠና\n- አቀላጥፎ አማርኛ",
    },
    feeNote: {
      he: 'קופ"ח: ₪35-60 השתתפות. פרטית: ₪350-500 לפגישה.',
      en: "HMO: ₪35-60 co-pay. Private: ₪350-500 per session.",
      am: "ኤች.ኤም.ኦ: ₪35-60 ድርሻ። የግል: በክፍለ ጊዜ ₪350-500።",
    },
    relatedRights: ["chronic-disease-prevention"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["tene-briut"],
  }),

  slot({
    profession: "psychologist",
    citySlug: "petach-tikva",
    specialty: "addictions",
    title: {
      he: "פסיכולוג/ית קליני/ת דוברי אמהרית — פתח תקווה — התמכרויות",
      en: "Amharic-speaking Clinical Psychologist — Petach Tikva — Addictions",
      am: "አማርኛ ተናጋሪ ክሊኒካል ሳይኮሎጂስት — ፔታህ ቲክቫ — ሱሰኝነት",
    },
    shortDescription: {
      he: "טיפול בהתמכרות לאלכוהול, סמים, וקנאביס. ייעוץ-משפחתי לבני-משפחה של מכור/ה.",
      en: "Treatment of alcohol, drug, and cannabis addiction. Family counseling for relatives of addicts.",
      am: "የአልኮል፣ የአደገኛ ዕፅ እና የካናቢስ ሱሰኝነት ሕክምና።",
    },
    whenSeek: {
      he: "התמכרות שמשפיעה על תפקוד-יומי, פגיעה במערכות-יחסים או בעבודה, שתיית-יתר ב-משפחה. בני-משפחה זכאים לייעוץ נפרד גם אם המכור/ה לא מוכן/ה לטיפול.",
      en: "Addiction affecting daily functioning, harming relationships or work, family-level over-drinking. Family members deserve separate counseling even if the addict isn't ready.",
      am: "ዕለታዊ ሥራን የሚነካ፣ ግንኙነቶችን ወይም ሥራን የሚጎዳ፣ የቤተሰብ ደረጃ ከመጠን ያለፈ መጠጣት።",
    },
    whatToCheck: {
      he: "- הסמכה ספציפית בהתמכרויות\n- שותפות עם בית-חולים גהה / מרכזי-גמילה\n- ניסיון עם הקהילה",
      en: "- Specific addictions certification\n- Partnership with Geha hospital / rehab centers\n- Community experience",
      am: "- የተለየ የሱሰኝነት ማረጋገጫ\n- ከገሃ ሆስፒታል / የማገገሚያ ማዕከላት ጋር ሽርክና",
    },
    feeNote: {
      he: 'קופ"ח: ₪40 השתתפות. פרטית: ₪400-600. תכניות-גמילה ממומנות לזכאים דרך ביטוח-לאומי.',
      en: "HMO: ₪40 co-pay. Private: ₪400-600. Funded rehab programs for eligible via National Insurance.",
      am: "ኤች.ኤም.ኦ: ₪40 ድርሻ። የግል: ₪400-600።",
    },
    relatedRights: ["chronic-disease-prevention"],
    relatedTerms: [],
    relatedOrgs: ["jdc-ashalim", "tene-briut"],
  }),

  // --- Doctors (4 entries) -------------------------------------------------
  slot({
    profession: "doctor",
    citySlug: "rehovot",
    specialty: "family-medicine",
    title: {
      he: "רופא/ת משפחה דוברי אמהרית — רחובות",
      en: "Amharic-speaking Family Physician — Rehovot",
      am: "አማርኛ ተናጋሪ የቤተሰብ ሐኪም — ሬሆቮት",
    },
    shortDescription: {
      he: "רפואה ראשונית, מעקב מחלות-כרוניות, תיווך-תרבותי-בריאותי.",
      en: "Primary care, chronic-disease follow-up, cultural-health mediation.",
      am: "ቀዳሚ እንክብካቤ፣ የሥር-ሰደድ በሽታ ክትትል፣ የባህል-ጤና ድልድይ።",
    },
    whenSeek: {
      he: 'כשאתם זקוקים לרופא/ת משפחה קבועה. רחובות מארחת את מטה טנא בריאות — שיתוף-פעולה הדוק בין רפואה ראשונית לתיווך-תרבותי. סוכרת/יל"ד שכיחים בקהילה.',
      en: "When you need a regular family physician. Rehovot hosts Tene Briut's HQ — close cooperation between primary care and cultural mediation. Diabetes/hypertension common in community.",
      am: "ቋሚ የቤተሰብ ሐኪም ሲፈልጉ። ሬሆቮት የቴኔ ብሪዩት ዋና መሥሪያ ቤት ነው።",
    },
    whatToCheck: {
      he: "- רופא/ת משפחה מומחה/ית\n- היכרות עם פרוטוקולים של טנא-בריאות\n- כיסוי בקופת-החולים שלך",
      en: "- Specialist family physician\n- Familiarity with Tene Briut protocols\n- Coverage in your HMO",
      am: "- የቤተሰብ ሐኪም ስፔሻሊስት\n- ከቴኔ ብሪዩት ፕሮቶኮሎች ጋር መተዋወቅ",
    },
    feeNote: {
      he: 'קופ"ח: השתתפות ₪32. ביקור-בית: ₪80-150 השתתפות. שירות פרטי: ₪400-600 לביקור.',
      en: "HMO: ₪32 co-pay. House call: ₪80-150 co-pay. Private: ₪400-600 per visit.",
      am: "ኤች.ኤም.ኦ: ₪32 ድርሻ። የቤት ጉብኝት: ₪80-150 ድርሻ።",
    },
    relatedRights: ["chronic-disease-prevention", "medical-translation"],
    relatedTerms: ["tene-briut"],
    relatedOrgs: ["tene-briut"],
  }),

  slot({
    profession: "doctor",
    citySlug: "kiryat-malakhi",
    specialty: "pediatrics",
    title: {
      he: "רופא/ת ילדים דוברי אמהרית — קרית מלאכי",
      en: "Amharic-speaking Pediatrician — Kiryat Malakhi",
      am: "አማርኛ ተናጋሪ የልጅ ሐኪም — ኪሪያት ማላኪ",
    },
    shortDescription: {
      he: "מעקב התפתחותי, חיסונים, מחלות-ילדים. תיווך-תרבותי בנושאים רגישים.",
      en: "Developmental follow-up, vaccinations, pediatric diseases. Cultural mediation on sensitive topics.",
      am: "የእድገት ክትትል፣ ክትባቶች፣ የልጅ በሽታዎች።",
    },
    whenSeek: {
      he: "מעקב-תינוק, חיסונים, מחלות-ילדים, צרכים-מיוחדים. בקרית מלאכי: ריכוז גבוה של משפחות-עולים — לחפש רופא/ה עם ניסיון בקהילה.",
      en: "Infant follow-up, vaccinations, childhood illnesses, special needs. In Kiryat Malakhi: high concentration of immigrant families — seek a pediatrician with community experience.",
      am: "የጨቅላ ክትትል፣ ክትባቶች፣ የልጅ በሽታዎች፣ ልዩ ፍላጎቶች።",
    },
    whatToCheck: {
      he: "- מומחה/ית ברפואת-ילדים\n- ניסיון עם משפחות יוצאות-אתיופיה\n- שותפות עם טיפת-חלב / טנא-בריאות",
      en: "- Pediatrics specialist\n- Experience with Ethiopian-Israeli families\n- Partnership with Tipat-Halav / Tene Briut",
      am: "- የልጅ ሕክምና ስፔሻሊስት\n- ከኢትዮጵያ-እስራኤል ቤተሰቦች ልምድ",
    },
    feeNote: {
      he: 'קופ"ח: ₪32 השתתפות. פגישות מיוחדות: ₪150-300.',
      en: "HMO: ₪32 co-pay. Special appointments: ₪150-300.",
      am: "ኤች.ኤም.ኦ: ₪32 ድርሻ። ልዩ ቀጠሮ: ₪150-300።",
    },
    relatedRights: ["chronic-disease-prevention"],
    relatedTerms: [],
    relatedOrgs: ["tene-briut"],
  }),

  slot({
    profession: "doctor",
    citySlug: "ashdod",
    specialty: "obgyn",
    title: {
      he: "רופא/ת נשים דוברי אמהרית — אשדוד",
      en: "Amharic-speaking OB/GYN — Ashdod",
      am: "አማርኛ ተናጋሪ የሴቶች ሐኪም — አሽዶድ",
    },
    shortDescription: {
      he: "מעקב הריון, פוריות, בריאות נשים. גישה רגישת-תרבות.",
      en: "Pregnancy follow-up, fertility, women's health. Culturally-sensitive approach.",
      am: "የእርግዝና ክትትል፣ የመውለድ ችሎታ፣ የሴቶች ጤና።",
    },
    whenSeek: {
      he: "מעקב-הריון, ייעוץ-פוריות, בריאות-נשים שגרתית. נושאים רגישים תרבותית (תכנון-משפחה, בריאות-מינית) — חשוב לבחור רופא/ה דובר/ת אמהרית.",
      en: "Pregnancy follow-up, fertility consultation, routine women's health. Culturally-sensitive topics (family planning, sexual health) — important to choose an Amharic-speaking practitioner.",
      am: "የእርግዝና ክትትል፣ የመውለድ ምክክር፣ መደበኛ የሴቶች ጤና።",
    },
    whatToCheck: {
      he: "- מומחה/ית בנשים-יולדות\n- ניסיון בקהילה (≥ 5 שנים)\n- שותפות עם תוכנית 'בריאות-נשים' של טנא-בריאות",
      en: "- OB/GYN specialist\n- Community experience (5+ years)\n- Partnership with Tene Briut's Women's Health program",
      am: "- የሴቶች-ሕክምና ስፔሻሊስት\n- የማህበረሰብ ልምድ (5+ ዓመታት)",
    },
    feeNote: {
      he: 'קופ"ח: ₪32 השתתפות. ייעוץ-פוריות פרטי: ₪500-800.',
      en: "HMO: ₪32 co-pay. Private fertility consultation: ₪500-800.",
      am: "ኤች.ኤም.ኦ: ₪32 ድርሻ።",
    },
    relatedRights: ["chronic-disease-prevention"],
    relatedTerms: [],
    relatedOrgs: ["tene-briut"],
  }),

  slot({
    profession: "doctor",
    citySlug: "haifa",
    specialty: "internal-medicine",
    title: {
      he: "רופא/ת פנימית דוברי אמהרית — חיפה",
      en: "Amharic-speaking Internist — Haifa",
      am: "አማርኛ ተናጋሪ የውስጥ-ሕክምና ሐኪም — ሐይፋ",
    },
    shortDescription: {
      he: 'מחלות-כרוניות, סוכרת, יל"ד, בעיות-לב. ניסיון תרבותי קליני.',
      en: "Chronic diseases, diabetes, hypertension, cardiac issues. Cultural-clinical experience.",
      am: "ሥር-ሰደድ በሽታዎች፣ ስኳር በሽታ፣ የደም ግፊት፣ የልብ ችግሮች።",
    },
    whenSeek: {
      he: 'אבחון או מעקב מחלה-כרונית מורכבת, ניהול-תרופות, ייעוץ לפני ניתוח. בקהילה האתיופית: שיעורי-סוכרת ויל"ד גבוהים — מעקב מסודר חיוני.',
      en: "Diagnosis or follow-up of complex chronic disease, medication management, pre-surgery consultation. In the Ethiopian-Israeli community: high diabetes/hypertension rates — orderly follow-up critical.",
      am: "ውስብስብ ሥር-ሰደድ በሽታ ምርመራ ወይም ክትትል።",
    },
    whatToCheck: {
      he: "- מומחה/ית פנימית\n- ניסיון מתועד עם הקהילה\n- היכרות עם תרופות שלא מתורגמות לאמהרית",
      en: "- Internal-medicine specialist\n- Documented community experience\n- Familiarity with medications not translated to Amharic",
      am: "- የውስጥ-ሕክምና ስፔሻሊስት\n- የተመዘገበ የማህበረሰብ ልምድ",
    },
    feeNote: {
      he: 'קופ"ח: ₪32 השתתפות. פרטית: ₪500-700.',
      en: "HMO: ₪32 co-pay. Private: ₪500-700.",
      am: "ኤች.ኤም.ኦ: ₪32 ድርሻ።",
    },
    relatedRights: ["chronic-disease-prevention", "medical-translation"],
    relatedTerms: [],
    relatedOrgs: ["tene-briut"],
  }),

  // --- Accountants (3 entries) ---------------------------------------------
  slot({
    profession: "accountant",
    citySlug: "netanya",
    specialty: "small-business",
    title: {
      he: "רואה/ת חשבון דוברי אמהרית — נתניה — עסק קטן",
      en: "Amharic-speaking Accountant — Netanya — Small Business",
      am: "አማርኛ ተናጋሪ ሒሳብ ባለሙያ — ነታንያ — ትንሽ ንግድ",
    },
    shortDescription: {
      he: "פתיחת עוסק-מורשה, ניהול-ספרים, דוחות שנתיים. ייעוץ למתחילים.",
      en: "Opening a sole proprietorship, bookkeeping, annual filings. Advice for beginners.",
      am: "የራስ ንግድ መክፈት፣ የመጻሕፍት አያያዝ፣ ዓመታዊ ማቅረብ።",
    },
    whenSeek: {
      he: "תכנון-פתיחה של עסק-קטן, מעבר מ-עוסק-פטור ל-עוסק-מורשה, דוח-שנתי, ייעוץ-מס. נתניה: ריכוז גבוה של עסקים-קטנים-מהקהילה — נסיון רלוונטי.",
      en: "Planning a small-business launch, transitioning from exempt to registered dealer, annual return, tax advice. Netanya: high concentration of community small-businesses.",
      am: "ትንሽ ንግድ ለመጀመር ማቀድ፣ ከነጻ ወደ ተመዘገበ ነጋዴ መሸጋገር፣ ዓመታዊ ሪፖርት።",
    },
    whatToCheck: {
      he: '- רישוי רו"ח (לא יועץ-מס בלבד)\n- ניסיון עם עוסק-פטור/מורשה\n- שותפות עם עתיד-במדבר / Olim Beyahad',
      en: "- CPA license (not tax-advisor only)\n- Experience with exempt/registered dealers\n- Partnership with Atid B'midbar / Olim Beyahad",
      am: "- የሒሳብ ባለሙያ ፈቃድ\n- ከነጻ/ተመዘገበ ነጋዴ ልምድ",
    },
    feeNote: {
      he: "פתיחת-עסק: ₪500-1,500. ניהול-ספרים חודשי: ₪300-800. דוח-שנתי: ₪1,500-3,000.",
      en: "Opening a business: ₪500-1,500. Monthly bookkeeping: ₪300-800. Annual return: ₪1,500-3,000.",
      am: "ንግድ መክፈት: ₪500-1,500። ወርሃዊ የመጻሕፍት አያያዝ: ₪300-800።",
    },
    relatedRights: ["ujia-kiedf-business-loans"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["olim-beyahad", "atid-bamidbar"],
  }),

  slot({
    profession: "accountant",
    citySlug: "tel-aviv",
    specialty: "tax-advisory",
    title: {
      he: "רואה/ת חשבון דוברי אמהרית — תל אביב — ייעוץ-מס",
      en: "Amharic-speaking Accountant — Tel Aviv — Tax Advisory",
      am: "አማርኛ ተናጋሪ ሒሳብ ባለሙያ — ቴል አቪቭ — የግብር ምክር",
    },
    shortDescription: {
      he: "תכנון מס לעצמאיים ולשכירים, החזר-מס, רעיוני-מס לעולים-חדשים.",
      en: "Tax planning for self-employed and salaried, tax refunds, new-immigrant tax incentives.",
      am: "ለራስ-ቅጥርና ለደመወዝ ሰራተኞች የግብር እቅድ።",
    },
    whenSeek: {
      he: "החזר-מס שלא מומש (סטודנטים, עולים-חדשים), תכנון-מס לעצמאי/ת, רעיוני-מס לעולה-חדש (5/10 שנים). תל-אביב: שותפות עם ENP / Olim Beyahad לבוגרים בעולם-העסקים.",
      en: "Unclaimed tax refunds (students, new immigrants), self-employed tax planning, new-immigrant incentives (5/10 years). Tel Aviv: partnership with ENP / Olim Beyahad for business-world graduates.",
      am: "ያልተጠየቀ የግብር ምላሽ፣ የራስ-ቅጥር የግብር እቅድ።",
    },
    whatToCheck: {
      he: '- רישוי רו"ח\n- ניסיון בהחזרי-מס לעולים\n- שותפות עם ENP/Olim Beyahad',
      en: "- CPA license\n- Tax-refund experience for olim\n- Partnership with ENP/Olim Beyahad",
      am: "- የሒሳብ ባለሙያ ፈቃድ\n- ለስደተኞች የግብር ምላሽ ልምድ",
    },
    feeNote: {
      he: "החזר-מס: ₪500-1,500. ייעוץ-מס פרטי: ₪600-1,200 לפגישה.",
      en: "Tax refund: ₪500-1,500. Private tax consultation: ₪600-1,200 per session.",
      am: "የግብር ምላሽ: ₪500-1,500።",
    },
    relatedRights: ["immigrant-tax-relief"],
    relatedTerms: [],
    relatedOrgs: ["enp", "olim-beyahad"],
  }),

  slot({
    profession: "accountant",
    citySlug: "rishon-lezion",
    specialty: "personal-finance",
    title: {
      he: "רואה/ת חשבון דוברי אמהרית — ראשון לציון — כספים אישיים",
      en: "Amharic-speaking Accountant — Rishon LeZion — Personal Finance",
      am: "አማርኛ ተናጋሪ ሒሳብ ባለሙያ — ሪሾን ለጽዮን — የግል ፋይናንስ",
    },
    shortDescription: {
      he: "תכנון-תקציב, החזר-מס, ייעוץ-חיסכון, פנסיה. עזרה לבעלי-משכנתא.",
      en: "Budget planning, tax refunds, savings advice, pension. Help for mortgage holders.",
      am: "የበጀት እቅድ፣ የግብር ምላሽ፣ የቁጠባ ምክር፣ ጡረታ።",
    },
    whenSeek: {
      he: "ייעוץ-תקציב לאחר עלייה, תכנון-פנסיה (גם לעולים שמתחילים מאוחר), ניהול-משכנתא קהילתית. ראשון לציון: ריכוז גבוה של משפחות עם משכנתא קהילתית של 600K.",
      en: "Post-aliyah budget consultation, pension planning (also for late-starting immigrants), community-mortgage management.",
      am: "ከስደት በኋላ የበጀት ምክክር፣ የጡረታ እቅድ።",
    },
    whatToCheck: {
      he: '- רישוי רו"ח או יועץ-פנסיוני\n- ניסיון עם משכנתא קהילתית 600K\n- היכרות עם תכניות-חיסכון לעולים',
      en: "- CPA or pension-advisor license\n- Experience with the 600K community mortgage\n- Familiarity with immigrant savings programs",
      am: "- የሒሳብ ባለሙያ ወይም የጡረታ አማካሪ ፈቃድ",
    },
    feeNote: {
      he: "ייעוץ-תקציב חד-פעמי: ₪500-1,000. ליווי-תקציבי שנתי: ₪3,000-6,000.",
      en: "One-time budget consultation: ₪500-1,000. Annual budget accompaniment: ₪3,000-6,000.",
      am: "የአንድ ጊዜ ምክክር: ₪500-1,000።",
    },
    relatedRights: ["600k-mortgage"],
    relatedTerms: [],
    relatedOrgs: ["olim-beyahad"],
  }),

  // --- Social workers (3 entries) ------------------------------------------
  slot({
    profession: "social-worker",
    citySlug: "kiryat-malakhi",
    specialty: "welfare",
    title: {
      he: "עובד/ת סוציאלי/ת דוברי אמהרית — קרית מלאכי — רווחה כללית",
      en: "Amharic-speaking Social Worker — Kiryat Malakhi — General Welfare",
      am: "አማርኛ ተናጋሪ ማህበራዊ ሰራተኛ — ኪሪያት ማላኪ — አጠቃላይ ደህንነት",
    },
    shortDescription: {
      he: "ליווי משפחות עם ילדים, סיוע מוסדות, תיווך-מערכות. הכרה בשירותי-רווחה.",
      en: "Family-with-children accompaniment, institution assistance, system mediation. Welfare-services advocacy.",
      am: "ልጆች ያላቸው ቤተሰቦች አጃቢነት።",
    },
    whenSeek: {
      he: "משפחה במצוקה כלכלית, סבך מוסדות (חינוך, רווחה), אובדן-משרה ממושך, אלימות-במשפחה. בקרית מלאכי: עומס גבוה — להגיע מוקדם.",
      en: "Family in financial distress, institutional tangles (education, welfare), prolonged job loss, family violence. In Kiryat Malakhi: high caseload — arrive early.",
      am: "በፋይናንስ ችግር ውስጥ ያለ ቤተሰብ።",
    },
    whatToCheck: {
      he: "- רישיון עובד/ת סוציאלי/ת\n- ניסיון בעבודה עם הקהילה\n- הכרת שותפות-עיר עם משרד-הרווחה",
      en: "- Licensed social worker\n- Experience with the community\n- Familiarity with city-Ministry of Welfare partnership",
      am: "- የተፈቀደ ማህበራዊ ሰራተኛ።",
    },
    feeNote: {
      he: "שירותי לשכת-רווחה: חינם לזכאים. עובד/ת סוציאלי/ת פרטי/ת: ₪300-500 לפגישה.",
      en: "Welfare-office services: free for eligible. Private social worker: ₪300-500 per session.",
      am: "የደህንነት ቢሮ አገልግሎቶች: ለብቁ ነጻ።",
    },
    relatedRights: ["domestic-violence-support", "summer-camps-subsidy"],
    relatedTerms: [],
    relatedOrgs: ["jdc-ashalim", "iaej"],
  }),

  slot({
    profession: "social-worker",
    citySlug: "lod",
    specialty: "elderly",
    title: {
      he: "עובד/ת סוציאלי/ת דוברי אמהרית — לוד — קשישים",
      en: "Amharic-speaking Social Worker — Lod — Elderly Care",
      am: "አማርኛ ተናጋሪ ማህበራዊ ሰራተኛ — ሎድ — የአዛውንት እንክብካቤ",
    },
    shortDescription: {
      he: "ליווי קשישים יוצאי-אתיופיה: זכויות, מועדונים, סיעוד, בידוד.",
      en: "Accompanying Ethiopian-Israeli seniors: rights, clubs, long-term care, isolation.",
      am: "የኢትዮጵያ-እስራኤል አዛውንቶች አጃቢነት።",
    },
    whenSeek: {
      he: "קשיש/ה שמתבודד/ת, צרכי-סיעוד שלא ממומשים, ניתוק תרבותי-לשוני בבית-אבות. ב-לוד: מועדוני-קשישים של IAEJ פעילים.",
      en: "Isolated senior, unmet long-term-care needs, cultural-linguistic disconnect in nursing home. In Lod: IAEJ senior centers are active.",
      am: "የተገለለ አዛውንት፣ ያልተሟሉ የእንክብካቤ ፍላጎቶች።",
    },
    whatToCheck: {
      he: "- רישוי + הסמכה לגיל-זהב\n- ניסיון עם IAEJ\n- היכרות עם זכויות-קשישים יוצאי-אתיופיה",
      en: "- Licensing + senior-care certification\n- IAEJ experience\n- Familiarity with Ethiopian-Israeli senior rights",
      am: "- ፈቃድ + የአዛውንት እንክብካቤ ማረጋገጫ።",
    },
    feeNote: {
      he: "שירות לשכה-של-רווחה: חינם. ייעוץ פרטי: ₪300-500.",
      en: "Welfare-office service: free. Private consultation: ₪300-500.",
      am: "የደህንነት ቢሮ አገልግሎት: ነጻ።",
    },
    relatedRights: ["senior-pension", "kessim-religious-support"],
    relatedTerms: ["beta-israel", "kessim"],
    relatedOrgs: ["iaej", "jdc-ashalim"],
  }),

  slot({
    profession: "social-worker",
    citySlug: "ramla",
    specialty: "youth-at-risk",
    title: {
      he: "עובד/ת סוציאלי/ת דוברי אמהרית — רמלה — נוער בסיכון",
      en: "Amharic-speaking Social Worker — Ramla — At-Risk Youth",
      am: "አማርኛ ተናጋሪ ማህበራዊ ሰራተኛ — ራምላ — ለአደጋ የተጋለጡ ወጣቶች",
    },
    shortDescription: {
      he: "נוער בנשירה, סבך-משטרה, חינוך-בלתי-פורמלי. שותפות עם חברים-בטבע.",
      en: "Youth dropout, police entanglement, informal education. Partnership with Friends by Nature.",
      am: "የወጣት ማቋረጥ፣ ከፖሊስ ጋር ችግር።",
    },
    whenSeek: {
      he: "בן/בת-נוער שעוזב/ת בית-ספר, נכנס/ת למסלול-פלילי, מסתבך/ת עם משטרה. ברמלה: שתי תכניות-מצוקה פעילות (חברים-בטבע + JDC-אשלים).",
      en: "Youth leaving school, entering criminal track, getting into police trouble. In Ramla: two active distress programs (Friends by Nature + JDC-Ashalim).",
      am: "ትምህርት ቤት የሚተው ወጣት።",
    },
    whatToCheck: {
      he: "- ניסיון בנוער-בסיכון\n- שותפות עם חברים-בטבע\n- זמינות-חירום",
      en: "- At-risk-youth experience\n- Partnership with Friends by Nature\n- Emergency availability",
      am: "- የለአደጋ የተጋለጡ ወጣቶች ልምድ።",
    },
    feeNote: {
      he: "שירות עירוני: חינם. ליווי פרטי: ₪400-600.",
      en: "Municipal service: free. Private accompaniment: ₪400-600.",
      am: "የከተማ አገልግሎት: ነጻ።",
    },
    relatedRights: ["domestic-violence-support", "summer-camps-subsidy"],
    relatedTerms: [],
    relatedOrgs: ["friends-by-nature", "jdc-ashalim"],
  }),

  // --- Mortgage advisors (3 entries) ---------------------------------------
  slot({
    profession: "mortgage-advisor",
    citySlug: "rishon-lezion",
    specialty: "community-mortgage",
    title: {
      he: "יועצ/ת משכנתאות דוברי אמהרית — ראשון לציון — משכנתא קהילתית",
      en: "Amharic-speaking Mortgage Advisor — Rishon LeZion — Community Mortgage",
      am: "አማርኛ ተናጋሪ የብድር አማካሪ — ሪሾን ለጽዮን — የማህበረሰብ ብድር",
    },
    shortDescription: {
      he: 'ליווי המשכנתא הקהילתית של 600K ש"ח: זכאות, הגרלה, חתימת חוזה.',
      en: "Accompanying the 600K community mortgage: eligibility, lottery, contract signing.",
      am: "የ600K የማህበረሰብ ብድር አጃቢነት።",
    },
    whenSeek: {
      he: "תכנון רכישת-דירה ראשונה, בדיקת-זכאות למשכנתא הקהילתית, סבכים בהגרלה. בראשון: עשרות בעלי-משכנתא חדשים בשנה — יועץ/ת מנוסה חיוני/ת.",
      en: "First-home purchase planning, community-mortgage eligibility check, lottery tangles. In Rishon: dozens of new mortgage holders annually — experienced advisor essential.",
      am: "የመጀመሪያ ቤት ግዢ ማቀድ።",
    },
    whatToCheck: {
      he: "- רישוי יועץ/ת משכנתאות (משרד-האוצר)\n- ניסיון מתועד עם המשכנתא הקהילתית\n- היכרות עם בנקים שותפים (לאומי, דיסקונט, איגוד)",
      en: "- Mortgage advisor license (Ministry of Finance)\n- Documented community-mortgage experience\n- Familiarity with partner banks (Leumi, Discount, Igud)",
      am: "- የብድር አማካሪ ፈቃድ።",
    },
    feeNote: {
      he: "ייעוץ ראשוני: חינם (פגישת-היכרות). ליווי-תיק מלא: 0.5%-1% מסכום ההלוואה (₪3,000-6,000 ל-600K).",
      en: "Initial consultation: free. Full case accompaniment: 0.5%-1% of loan amount (₪3,000-6,000 for 600K).",
      am: "የመጀመሪያ ምክክር: ነጻ።",
    },
    relatedRights: ["600k-mortgage"],
    relatedTerms: [],
    relatedOrgs: [],
  }),

  slot({
    profession: "mortgage-advisor",
    citySlug: "ashkelon",
    specialty: "first-home",
    title: {
      he: "יועצ/ת משכנתאות דוברי אמהרית — אשקלון — דירה-ראשונה",
      en: "Amharic-speaking Mortgage Advisor — Ashkelon — First Home",
      am: "አማርኛ ተናጋሪ የብድር አማካሪ — አሽኬሎን — የመጀመሪያ ቤት",
    },
    shortDescription: {
      he: "ליווי דירה-ראשונה: שילוב משכנתא רגילה + מענקים. תכנון-תקציב.",
      en: "First-home accompaniment: combining regular mortgage + grants. Budget planning.",
      am: "የመጀመሪያ ቤት አጃቢነት።",
    },
    whenSeek: {
      he: "רכישת דירה-ראשונה, שילוב משכנתא + מענקים (קליטה, ראשון-במגורים), בדיקת-זכאות לתכניות-ממשלה. אשקלון: מחירים נמוכים יחסית, אזור בו תכניות-ממשלה אקטיביות.",
      en: "First-home purchase, combining mortgage + grants (klita, first-residence), eligibility check for government programs. Ashkelon: relatively low prices, area with active government programs.",
      am: "የመጀመሪያ ቤት ግዢ።",
    },
    whatToCheck: {
      he: "- רישוי + ניסיון עם תכניות-ממשלה\n- שותפות עם משרד-הבינוי-והשיכון\n- שקיפות-עלויות",
      en: "- License + government-program experience\n- Partnership with Ministry of Construction & Housing\n- Cost transparency",
      am: "- ፈቃድ + የመንግስት ፕሮግራም ልምድ።",
    },
    feeNote: {
      he: "ייעוץ ראשוני: חינם. ליווי מלא: 0.5%-1%.",
      en: "Initial consultation: free. Full accompaniment: 0.5%-1%.",
      am: "የመጀመሪያ ምክክር: ነጻ።",
    },
    relatedRights: ["600k-mortgage", "klita-basket"],
    relatedTerms: [],
    relatedOrgs: [],
  }),

  slot({
    profession: "mortgage-advisor",
    citySlug: "afula",
    specialty: "refinancing",
    title: {
      he: "יועצ/ת משכנתאות דוברי אמהרית — עפולה — מחזור-משכנתא",
      en: "Amharic-speaking Mortgage Advisor — Afula — Refinancing",
      am: "አማርኛ ተናጋሪ የብድር አማካሪ — አፉላ — ብድር ማደስ",
    },
    shortDescription: {
      he: "מחזור משכנתאות: הורדת ריבית, שינוי-מסלול. בעלי-משכנתא עם 5+ שנים.",
      en: "Mortgage refinancing: rate reduction, track change. For mortgage holders with 5+ years.",
      am: "ብድር ማደስ።",
    },
    whenSeek: {
      he: "משכנתא ב-5+ שנים, ריבית גבוהה ביחס לשוק, רצון לשנות-מסלול. עפולה: קהילה צומחת, מחזורים יכולים לחסוך ₪50,000+ לאורך-חיי-המשכנתא.",
      en: "5+ year-old mortgage, above-market interest, desire to change tracks. Afula: growing community, refinancing can save ₪50,000+ over mortgage lifetime.",
      am: "5+ ዓመት የቆየ ብድር።",
    },
    whatToCheck: {
      he: "- רישוי + ניסיון במחזורים (לא רק חתימות-ראשונות)\n- שקיפות-מלאה של חיסכון נטו\n- אין-תלות בבנק יחיד",
      en: "- License + refinancing experience (not just first-time)\n- Full transparency on net savings\n- Bank-independent",
      am: "- ፈቃድ + የብድር ማደስ ልምድ።",
    },
    feeNote: {
      he: "מחזור: ₪2,000-5,000 (תלוי בסכום).",
      en: "Refinancing: ₪2,000-5,000 (amount-dependent).",
      am: "ብድር ማደስ: ₪2,000-5,000።",
    },
    relatedRights: ["600k-mortgage"],
    relatedTerms: [],
    relatedOrgs: [],
  }),

  // --- Career counselors (3 entries) ---------------------------------------
  slot({
    profession: "career-counselor",
    citySlug: "tel-aviv",
    specialty: "tech-pivot",
    title: {
      he: "יועצ/ת קריירה דוברי אמהרית — תל אביב — מעבר להייטק",
      en: "Amharic-speaking Career Counselor — Tel Aviv — Tech Pivot",
      am: "አማርኛ ተናጋሪ የሥራ አማካሪ — ቴል አቪቭ — ወደ ቴክ መለወጥ",
    },
    shortDescription: {
      he: "ליווי בוגרי-תואר-ראשון למעבר להייטק. הכוונה לתכנית Tech-Career של ENP.",
      en: "Accompanying first-degree graduates pivoting to tech. Direction to ENP's Tech-Career program.",
      am: "የመጀመሪያ ዲግሪ ምሩቃንን ወደ ቴክ ማስተላለፍ።",
    },
    whenSeek: {
      he: "בוגר/ת תואר ראשון בתחום-לא-טכני (היסטוריה, חינוך, ביולוגיה) שמעוניין/ת במעבר להייטק. תל-אביב: 80%+ מהמשרות בתחום, נטוורקינג חיוני.",
      en: "First-degree graduate in non-tech field (history, education, biology) interested in pivoting to tech. Tel Aviv: 80%+ of jobs are here, networking essential.",
      am: "በቴክ ላልሆነ መስክ የመጀመሪያ ዲግሪ ምሩቅ።",
    },
    whatToCheck: {
      he: "- רקע אקדמי-קריירה (לפחות תואר ראשון)\n- שותפות עם ENP / Olim Beyahad\n- היכרות עם החברות-המקבלות (Microsoft, Google, IBM)",
      en: "- Academic-career background (BA minimum)\n- Partnership with ENP / Olim Beyahad\n- Familiarity with hiring companies (Microsoft, Google, IBM)",
      am: "- የአካዳሚክ-ሥራ ዳራ (ቢያንስ ቢኤ)።",
    },
    feeNote: {
      he: "Tech-Career bootcamp: סבסוד מלא לזכאים. ייעוץ-קריירה פרטי: ₪400-700 לפגישה.",
      en: "Tech-Career bootcamp: full subsidy for eligible. Private career counseling: ₪400-700 per session.",
      am: "የቴክ-ሥራ ቦትካምፕ: ለብቁ ሙሉ ድጎማ።",
    },
    relatedRights: ["tech-career-bootcamp"],
    relatedTerms: ["enp", "olim-beyahad"],
    relatedOrgs: ["enp", "olim-beyahad"],
  }),

  slot({
    profession: "career-counselor",
    citySlug: "haifa",
    specialty: "students",
    title: {
      he: "יועצ/ת קריירה דוברי אמהרית — חיפה — סטודנטים",
      en: "Amharic-speaking Career Counselor — Haifa — Students",
      am: "አማርኛ ተናጋሪ የሥራ አማካሪ — ሐይፋ — ተማሪዎች",
    },
    shortDescription: {
      he: "ליווי סטודנטים בבחירת מסלול-לימודים, מלגות, ועבודה במקביל.",
      en: "Accompanying students in choosing study tracks, scholarships, and concurrent work.",
      am: "ተማሪዎችን በትምህርት መንገድ ምርጫ ማጀብ።",
    },
    whenSeek: {
      he: "תלמיד/ת תיכון בוחר/ת מסלול אקדמי, סטודנט/ית בשנה ראשונה, בוגר/ת מצטיין/ת המעוניין/ת ב-PhD. בחיפה: שותפות-טכניון לפרויקטי-מצוינות.",
      en: "High-school student choosing academic track, first-year student, outstanding graduate considering PhD. In Haifa: Technion partnership for excellence projects.",
      am: "የትምህርት መንገድ የሚመርጥ የሁለተኛ ደረጃ ተማሪ።",
    },
    whatToCheck: {
      he: "- רקע אקדמי\n- שותפות עם ISEF / Hesegim / ENP\n- היכרות עם תכניות-מילגה",
      en: "- Academic background\n- Partnership with ISEF / Hesegim / ENP\n- Familiarity with scholarship programs",
      am: "- የአካዳሚክ ዳራ።",
    },
    feeNote: {
      he: "ייעוץ-מילגה: חינם דרך הקרנות. ייעוץ פרטי: ₪400-600.",
      en: "Scholarship advice: free via foundations. Private consultation: ₪400-600.",
      am: "የስኮላርሺፕ ምክር: በፋውንዴሽን ነጻ።",
    },
    relatedRights: ["unconditional-scholarships-7-sources", "matriculation-grant"],
    relatedTerms: ["hesegim-isef", "enp"],
    relatedOrgs: ["isef", "enp", "fidel"],
  }),

  slot({
    profession: "career-counselor",
    citySlug: "beer-sheva",
    specialty: "transitions",
    title: {
      he: "יועצ/ת קריירה דוברי אמהרית — באר שבע — מעברי-קריירה",
      en: "Amharic-speaking Career Counselor — Beersheba — Career Transitions",
      am: "አማርኛ ተናጋሪ የሥራ አማካሪ — ቤርሼባ — የሥራ መሸጋገሮች",
    },
    shortDescription: {
      he: "ליווי במעבר-עבודה, חזרה-לעבודה אחרי הפסקה, פיתוח-מקצועי. שותפות עם עתיד-במדבר.",
      en: "Accompanying job transitions, return to work after a break, professional development. Partnership with Atid B'midbar.",
      am: "የሥራ መሸጋገር አጃቢነት።",
    },
    whenSeek: {
      he: "מעבר-עבודה לאחר 3+ שנים, חזרה-לעבודה לאחר חופשת-לידה / טיפול-משפחתי, פיתוח-מקצועי בעבודה הנוכחית. בנגב: שיתוף-פעולה עם עתיד-במדבר לתפקידי-טק.",
      en: "Job transition after 3+ years, return-to-work after parental leave / family care, professional development in current role. In the Negev: partnership with Atid B'midbar for tech roles.",
      am: "ከ3+ ዓመት በኋላ የሥራ መሸጋገር።",
    },
    whatToCheck: {
      he: "- רישוי או הכשרה בקריירה\n- שותפות עם Atid B'midbar / ENP\n- ניסיון במעברי-קריירה (לא רק כניסה ראשונה)",
      en: "- Career-counseling license or training\n- Partnership with Atid B'midbar / ENP\n- Career-transition experience (not just first-job entry)",
      am: "- የሥራ ምክር ፈቃድ ወይም ስልጠና።",
    },
    feeNote: {
      he: "ייעוץ ראשוני: ₪300-500. תכנית-ליווי 3 חודשים: ₪2,000-4,000.",
      en: "Initial consultation: ₪300-500. 3-month accompaniment: ₪2,000-4,000.",
      am: "የመጀመሪያ ምክክር: ₪300-500።",
    },
    relatedRights: ["tech-career-bootcamp"],
    relatedTerms: [],
    relatedOrgs: ["atid-bamidbar", "enp", "olim-beyahad"],
  }),

  // --- Real estate agents (2 entries) --------------------------------------
  slot({
    profession: "real-estate-agent",
    citySlug: "netanya",
    specialty: "buy-rent",
    title: {
      he: 'סוכנ/ת נדל"ן דוברי אמהרית — נתניה — קנייה ושכירות',
      en: "Amharic-speaking Real Estate Agent — Netanya — Buy & Rent",
      am: "አማርኛ ተናጋሪ የንብረት ወኪል — ነታንያ — ግዢና ኪራይ",
    },
    shortDescription: {
      he: "ליווי משפחות יוצאות-אתיופיה ברכישה ובהשכרה. הכרה עמוקה של שכונות-קהילתיות.",
      en: "Accompanying Ethiopian-Israeli families in buying and renting. Deep knowledge of community neighborhoods.",
      am: "የኢትዮጵያ-እስራኤል ቤተሰቦችን በግዢና በኪራይ ማጀብ።",
    },
    whenSeek: {
      he: "משפחה שמחפשת דירה ב-נתניה, מעוניין/ת בשכונה ספציפית (קרית-נורדאו, רמת-פולג, נחל-בלוטה), או צריך/ה ייעוץ-קנייה ראשונה. סוכן/ת מהקהילה — ידע על שכונות, בתי-ספר, ומשפחות-קיימות.",
      en: "Family searching for an apartment in Netanya, interested in a specific neighborhood (Kiryat Nordau, Ramat Poleg, Nahal Bluta), or needing first-purchase advice. Community agent — knowledge of neighborhoods, schools, existing families.",
      am: "በነታንያ ቤት የሚፈልግ ቤተሰብ።",
    },
    whatToCheck: {
      he: "- רישיון תיווך משרד-המשפטים\n- היסטוריית-עסקאות (ניתן לבקש)\n- היכרות עם שכונות-קהילתיות בנתניה",
      en: "- Ministry of Justice broker license\n- Transaction history (request)\n- Familiarity with community Netanya neighborhoods",
      am: "- የፍትህ ሚኒስቴር የንግድ ፈቃድ።",
    },
    feeNote: {
      he: 'מכירה: 2% ממחיר-העסקה + מע"מ (משלם הקונה והמוכר ביחד). שכירות: דמי-שכירות-של-חודש + מע"מ.',
      en: "Sale: 2% of transaction + VAT (paid by buyer and seller together). Rent: one month's rent + VAT.",
      am: "ሽያጭ: ከግብይት 2% + VAT።",
    },
    relatedRights: ["600k-mortgage"],
    relatedTerms: [],
    relatedOrgs: [],
  }),

  slot({
    profession: "real-estate-agent",
    citySlug: "rehovot",
    specialty: "buy-rent",
    title: {
      he: 'סוכנ/ת נדל"ן דוברי אמהרית — רחובות — קנייה ושכירות',
      en: "Amharic-speaking Real Estate Agent — Rehovot — Buy & Rent",
      am: "አማርኛ ተናጋሪ የንብረት ወኪል — ሬሆቮት — ግዢና ኪራይ",
    },
    shortDescription: {
      he: "ליווי משפחות ב-רחובות. דגש על שכונות-קהילתיות (קרית-משה, אושיות, קרית-עזר).",
      en: "Accompanying families in Rehovot. Focus on community neighborhoods (Kiryat Moshe, Ushiyot, Kiryat Ezer).",
      am: "በሬሆቮት ቤተሰቦችን ማጀብ።",
    },
    whenSeek: {
      he: "משפחה ש-עברה לרחובות בעקבות תעסוקת-מכון-ויצמן או טנא בריאות. רוצה דירה בקרבת בתי-ספר ומועדוני-קהילה. ניתן גם להתחיל עם שכירות.",
      en: "Family relocated to Rehovot for Weizmann Institute or Tene Briut employment. Wants apartment near schools and community clubs. Can also start with renting.",
      am: "ወደ ሬሆቮት የተዛወረ ቤተሰብ።",
    },
    whatToCheck: {
      he: '- רישיון בתוקף\n- היכרות עם שכונות-קהילתיות\n- שותפות עם רו"ח-נדל"ן מקומי/ת',
      en: "- Active license\n- Familiarity with community neighborhoods\n- Partnership with local real-estate-CPA",
      am: "- ሕያው ፈቃድ።",
    },
    feeNote: {
      he: 'מכירה: 2% + מע"מ. שכירות: דמי-שכירות-חודשי + מע"מ.',
      en: "Sale: 2% + VAT. Rent: monthly rent + VAT.",
      am: "ሽያጭ: 2% + VAT።",
    },
    relatedRights: ["600k-mortgage"],
    relatedTerms: [],
    relatedOrgs: [],
  }),
];

// --- Helpers ----------------------------------------------------------------

export function pickLocale<T extends { he: string; en?: string; am?: string }>(
  t: T,
  locale: Locale,
): string {
  return t[locale] ?? t.he;
}

export function getProfessionalBodyForLocale(
  entry: ProfessionalSlot,
  locale: Locale,
): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
