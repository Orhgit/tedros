// Where-to-buy Ethiopian groceries — programmatic (city) pages (TED-146).
//
// EVERY shop listed here was verified against a named public source on
// 2026-08-30 (WebSearch round, three parallel verification passes). The
// rule from the issue + keyword research is absolute: a page with 2 real
// shops beats 10 invented ones. Shops whose only sources are old carry
// `confidence: "dated"` and the routes render an explicit call-ahead
// caveat. Cities where no grocery could be verified at all (e.g. Ashdod,
// Kiryat Gat) are NOT given pages. Restaurants are excluded by design
// (saturated SERP, per docs/research/2026-08-05-culinary-and-benefits-
// keyword-research.md).
//
// HE is the source-of-truth locale. Server-only module.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";

/** "current" — live site/recent press/active social account.
 *  "dated"   — named in a real source, but the source is old; call ahead. */
export type ShopConfidence = "current" | "dated";

export interface VerifiedShop {
  /** Business name in Hebrew, exactly as written in the source. */
  name: string;
  /** Street / area within the city, if the source states one. */
  area?: Translatable;
  /** What the source says it sells. */
  sells: Translatable;
  /** The public source that names this business. */
  sourceUrl: string;
  sourceLabel: Translatable;
  /** Year of the most recent source found. */
  sourceYear: number;
  confidence: ShopConfidence;
}

export interface CityShoppingEntry {
  citySlug: string;
  /** "verified" — at least one current-confidence shop.
   *  "partial"  — only dated/low-confidence listings; page renders a
   *               prominent verify-before-you-go notice. */
  status: "verified" | "partial";
  /** Short locale intro: where the community shopping area is + context. */
  intro: Record<Locale, string>;
  /** Named market area / commercial cluster, when sources document one. */
  marketArea?: Translatable;
  shops: VerifiedShop[];
  /** Date this city's list was last checked against sources. */
  verifiedAt: string;
}

/** Nationwide online sellers — rendered on every city page as a fallback. */
export interface OnlineSeller {
  name: string;
  url: string;
  sells: Translatable;
}

export const ONLINE_SELLERS: OnlineSeller[] = [
  {
    name: "סוד הקסם",
    url: "https://www.sodhakesem.com/",
    sells: {
      he: "תערובות ברברה, קמח טף ומוצרים אתיופיים — חנות ביהוד + משלוחים לכל הארץ",
      en: "Berbere blends, teff flour and Ethiopian products — shop in Yehud + nationwide delivery",
      am: "የበርበሬ ድብልቆች፣ የጤፍ ዱቄት — በየሁድ ሱቅ + በመላ አገሪቱ መላኪያ",
    },
  },
  {
    name: "מולו תבלינים",
    url: "https://www.mulu-tavlenem.com/he/home",
    sells: {
      he: "תבלינים ומוצרים אתיופיים — חנות בחולון + הזמנה אונליין",
      en: "Ethiopian spices and products — shop in Holon + online ordering",
      am: "የኢትዮጵያ ቅመሞችና ምርቶች — በሆሎን ሱቅ + በመስመር ላይ ማዘዝ",
    },
  },
  {
    name: "מרקטו שוק",
    url: "https://www.facebook.com/Marketonayla/",
    sells: {
      he: "תבלינים ומוצרים מאתיופיה — חנות בנתניה, מכירה לכל הארץ",
      en: "Spices and products from Ethiopia — shop in Netanya, ships nationwide",
      am: "ከኢትዮጵያ ቅመሞችና ምርቶች — በነታንያ ሱቅ፣ በመላ አገሪቱ ይልካል",
    },
  },
];

export const CITY_SHOPPING: CityShoppingEntry[] = [
  // ── Netanya — the community's largest city (CBS: 13,300) ─────────────────
  {
    citySlug: "netanya",
    status: "verified",
    marketArea: {
      he: "שוק נתניה (רחובות שוהם, יהלום ורזיאל)",
      en: "Netanya market (Shoham, Yahalom and Raziel streets)",
      am: "የነታንያ ገበያ (ሾሃም፣ ያሃሎም እና ራዚኤል ጎዳናዎች)",
    },
    intro: {
      he: "נתניה היא העיר עם קהילת יוצאי האתיופיה הגדולה בישראל, ושוק נתניה — סביב רחובות שוהם, יהלום ורזיאל — הוא האזור המתועד ביותר בעיר לחנויות תבלינים בבעלות בני הקהילה. אם אתם מחפשים אינג'רה טרייה, קמח טף, ברברה או פולי קפה ירוקים — מתחילים בשוק.",
      en: "Netanya has Israel's largest Ethiopian-Israeli community, and the Netanya market — around Shoham, Yahalom and Raziel streets — is the city's best-documented area for community-owned spice shops. Looking for fresh injera, teff flour, berbere or green coffee beans — start at the market.",
      am: "ነታንያ በእስራኤል ትልቁ የኢትዮጵያ ማህበረሰብ ያላት ከተማ ናት፤ የነታንያ ገበያ የማህበረሰቡ የቅመም ሱቆች የተመዘገበበት ቦታ ነው። ትኩስ እንጀራ፣ የጤፍ ዱቄት፣ በርበሬ ወይም አረንጓዴ ቡና ከፈለጉ — ከገበያው ይጀምሩ።",
    },
    shops: [
      {
        name: "מרקטו שוק",
        area: { he: "נתניה", en: "Netanya", am: "ነታንያ" },
        sells: {
          he: "תבלינים ומוצרים מאתיופיה; מכירה ומשלוחים לכל הארץ",
          en: "Spices and products from Ethiopia; ships nationwide",
          am: "ከኢትዮጵያ ቅመሞችና ምርቶች፤ በመላ አገሪቱ ይልካል",
        },
        sourceUrl: "https://www.facebook.com/Marketonayla/",
        sourceLabel: {
          he: "עמוד פייסבוק פעיל + אינדקס עסקים",
          en: "Active Facebook page + business directory",
          am: "ንቁ ፌስቡክ ገጽ + የንግድ ማውጫ",
        },
        sourceYear: 2026,
        confidence: "current",
      },
      {
        name: "יאסו טעמים",
        area: { he: "שוק נתניה", en: "Netanya market", am: "የነታንያ ገበያ" },
        sells: {
          he: "תבלינים אתיופיים, צמחי מרפא ושמנים טבעיים",
          en: "Ethiopian spices, medicinal herbs and natural oils",
          am: "የኢትዮጵያ ቅመሞች፣ የመድኃኒት ዕፅዋትና ተፈጥሯዊ ዘይቶች",
        },
        sourceUrl: "https://www.ksn.co.il/%D7%90%D7%93%D7%95%D7%9F-%D7%94%D7%AA%D7%91%D7%9C%D7%99%D7%A0%D7%99%D7%9D/",
        sourceLabel: {
          he: "כתבה בנתניה און ליין (2016)",
          en: "Netanya Online feature (2016)",
          am: "የነታንያ ኦንላይን ጽሁፍ (2016)",
        },
        sourceYear: 2016,
        confidence: "dated",
      },
    ],
    verifiedAt: "2026-08-30",
  },

  // ── Tel Aviv — Neve Sha'anan / Central Bus Station cluster ───────────────
  {
    citySlug: "tel-aviv",
    status: "verified",
    marketArea: {
      he: "רחוב נווה שאנן וסביבת התחנה המרכזית החדשה",
      en: "Neve Sha'anan Street and the New Central Bus Station area",
      am: "የነቬ ሻአናን ጎዳና እና የአዲሱ ማዕከላዊ አውቶቡስ ጣቢያ አካባቢ",
    },
    intro: {
      he: "בתל אביב, המרכז המסחרי האתיופי מרוכז ברחוב נווה שאנן ובסביבת התחנה המרכזית החדשה — לא בשוק העלייה, שנסגר כשוק עוד ב-1981. באזור פועלות חנויות, מסעדות ודוכני קפה אתיופיים, וחנות אחת מתועדת היטב במקורות עדכניים.",
      en: "In Tel Aviv, the Ethiopian commercial cluster is on Neve Sha'anan Street and around the New Central Bus Station — not Shuk HaAliyah, which closed as a market back in 1981. The area holds Ethiopian shops, restaurants and coffee stands, and one grocery is well documented in current sources.",
      am: "በቴል አቪቭ የኢትዮጵያ የንግድ ስብስብ በነቬ ሻአናን ጎዳና እና በአዲሱ ማዕከላዊ አውቶቡስ ጣቢያ ዙሪያ ነው። አካባቢው የኢትዮጵያ ሱቆች፣ ምግብ ቤቶችና የቡና መሸጫዎች አሉት።",
    },
    shops: [
      {
        name: "נחום רקורדס",
        area: {
          he: "סביבת התחנה המרכזית החדשה",
          en: "New Central Bus Station area",
          am: "የአዲሱ ማዕከላዊ አውቶቡስ ጣቢያ አካባቢ",
        },
        sells: {
          he: "תבלינים ומצרכי גלם מיובאים מאתיופיה, קפה, בירה וערק אתיופיים, קוסמטיקה — התחיל כחנות תקליטים והפך למכולת קהילתית",
          en: "Spices and raw ingredients imported from Ethiopia, coffee, Ethiopian beer and arak, cosmetics — began as a record shop and became a community grocery",
          am: "ከኢትዮጵያ የገቡ ቅመሞችና ጥሬ ግብዓቶች፣ ቡና፣ የኢትዮጵያ ቢራ — እንደ ሙዚቃ ሱቅ ጀምሮ የማህበረሰብ ግሮሰሪ ሆኗል",
        },
        sourceUrl: "https://www.ynet.co.il/food/article/byfh0kiu0",
        sourceLabel: {
          he: "כתבת ynet (יולי 2024) + חשבון אינסטגרם פעיל",
          en: "ynet feature (July 2024) + active Instagram account",
          am: "የynet ጽሁፍ (2024) + ንቁ ኢንስታግራም",
        },
        sourceYear: 2024,
        confidence: "current",
      },
    ],
    verifiedAt: "2026-08-30",
  },

  // ── Rishon LeZion ────────────────────────────────────────────────────────
  {
    citySlug: "rishon-lezion",
    status: "verified",
    marketArea: {
      he: "רחוב תרמ\"ב, מרכז העיר",
      en: "Tarmav Street, city centre",
      am: "የታርማብ ጎዳና፣ የከተማው መሃል",
    },
    intro: {
      he: "בראשון לציון, העסקים האתיופיים המתועדים מתרכזים ברחוב תרמ\"ב שבמרכז העיר. חנות התבלינים המאומתת בעיר יושבת שם, במרחק הליכה מהשוק העירוני. בשכונת רמת אליהו — הריכוז ההיסטורי של הקהילה — לא אותרה חנות מתועדת במקורות פומביים, אף שפועל בה מרכז מסחרי שכונתי.",
      en: "In Rishon LeZion, documented Ethiopian businesses cluster on Tarmav Street in the city centre. The city's verified spice shop sits there, within walking distance of the municipal market. In Ramat Eliyahu — the community's historic concentration — no shop could be located in public sources, although the neighbourhood has its own commercial centre.",
      am: "በሪሾን ለጽዮን የተመዘገቡ የኢትዮጵያ ንግዶች በከተማው መሃል በታርማብ ጎዳና ላይ ይሰበሰባሉ። የተረጋገጠው የቅመም ሱቅ እዚያ ነው።",
    },
    shops: [
      {
        name: "תבליני סלמון",
        area: { he: "רחוב תרמ\"ב 18", en: "18 Tarmav St.", am: "ታርማብ ጎዳና 18" },
        sells: {
          he: "תבלינים אתיופיים אותנטיים — ברברה, מיטמיטה, קוררימה, בסובילה — ופולי קפה אתיופיים",
          en: "Authentic Ethiopian spices — berbere, mitmita, korarima, besobela — and Ethiopian coffee beans",
          am: "እውነተኛ የኢትዮጵያ ቅመሞች — በርበሬ፣ ሚጥሚጣ፣ ኮረሪማ፣ በሶቢላ — እና የኢትዮጵያ ቡና",
        },
        sourceUrl: "https://salmonspice.com/",
        sourceLabel: {
          he: "אתר רשמי פעיל (2025)",
          en: "Live official website (2025)",
          am: "ንቁ ኦፊሴላዊ ድህረ ገጽ (2025)",
        },
        sourceYear: 2025,
        confidence: "current",
      },
    ],
    verifiedAt: "2026-08-30",
  },

  // ── Rehovot — three named shops, all from 2015-era press ─────────────────
  {
    citySlug: "rehovot",
    status: "partial",
    marketArea: {
      he: "שוק רחובות ורחוב הרצל",
      en: "Rehovot market and Herzl Street",
      am: "የረሆቮት ገበያ እና የሄርፅል ጎዳና",
    },
    intro: {
      he: "אזור שוק רחובות ורחוב הרצל הוא האזור המתועד בעיר לקניות אתיופיות — שלוש חנויות נזכרות בשמן בכתבות עיתונות ארציות. שימו לב: המקורות הם מ-2015, ולכן מומלץ מאוד להתקשר או לבדוק במקום לפני שמגיעים במיוחד. אם ביקרתם ואתם יודעים מה פתוח — נשמח לעדכון.",
      en: "The Rehovot market area and Herzl Street are the city's documented zone for Ethiopian shopping — three shops are named in national press features. Note: the sources date to 2015, so calling ahead or checking locally before making a special trip is strongly recommended. If you have visited and know what is open — we would love an update.",
      am: "የረሆቮት ገበያ አካባቢና የሄርፅል ጎዳና ለኢትዮጵያ ግብይት የተመዘገበው ዞን ነው — ሶስት ሱቆች በአገራዊ ጋዜጦች ተጠቅሰዋል። ማስታወሻ፡ ምንጮቹ ከ2015 ናቸው — ከመሄድዎ በፊት መደወል ይመከራል።",
    },
    shops: [
      {
        name: "תבליני עזריה",
        area: {
          he: "רחוב הלל, בפאתי שוק רחובות",
          en: "Hillel St., at the edge of Rehovot market",
          am: "ሂሌል ጎዳና፣ በረሆቮት ገበያ ዳር",
        },
        sells: {
          he: "שני סוגי קמח טף, ציוד להכנת אינג'רה, שירו, חומוס אתיופי, ברברה וקפה ירוק",
          en: "Two kinds of teff flour, injera-making equipment, shiro, Ethiopian chickpeas, berbere and green coffee",
          am: "ሁለት ዓይነት የጤፍ ዱቄት፣ የእንጀራ መስሪያ፣ ሽሮ፣ በርበሬ እና አረንጓዴ ቡና",
        },
        sourceUrl: "https://food.walla.co.il/item/2898362",
        sourceLabel: {
          he: "סיור שוק של וואלה אוכל (2015)",
          en: "Walla Food market tour (2015)",
          am: "የዋላ ምግብ የገበያ ጉብኝት (2015)",
        },
        sourceYear: 2015,
        confidence: "dated",
      },
      {
        name: "תבליני קאסה",
        area: { he: "שוק רחובות", en: "Rehovot market", am: "የረሆቮት ገበያ" },
        sells: {
          he: "תבלינים אתיופיים",
          en: "Ethiopian spices",
          am: "የኢትዮጵያ ቅመሞች",
        },
        sourceUrl: "https://www.ynet.co.il/articles/0,7340,L-4687764,00.html",
        sourceLabel: {
          he: "כתבת ynet (2015)",
          en: "ynet feature (2015)",
          am: "የynet ጽሁፍ (2015)",
        },
        sourceYear: 2015,
        confidence: "dated",
      },
      {
        name: "ללה מאכלים אתיופיים",
        area: {
          he: "רחוב טלר 32 פינת הרצל 149",
          en: "32 Teller St., corner of 149 Herzl St.",
          am: "ቴለር ጎዳና 32፣ ሄርፅል 149 ጥግ",
        },
        sells: {
          he: "מאכלים ומצרכים אתיופיים",
          en: "Ethiopian foods and groceries",
          am: "የኢትዮጵያ ምግቦችና ሸቀጦች",
        },
        sourceUrl: "https://food.walla.co.il/item/2768163",
        sourceLabel: {
          he: "כתבות ynet ווואלה (2015)",
          en: "ynet and Walla features (2015)",
          am: "የynet እና ዋላ ጽሁፎች (2015)",
        },
        sourceYear: 2015,
        confidence: "dated",
      },
    ],
    verifiedAt: "2026-08-30",
  },

  // ── Holon ────────────────────────────────────────────────────────────────
  {
    citySlug: "holon",
    status: "verified",
    intro: {
      he: "בחולון פועלת אחת מחנויות התבלינים האתיופיות המבוססות באזור המרכז — מהחנויות הבודדות שמופיעות גם ברשימת החנויות שמפרסמת שגרירות אתיופיה בישראל. החנות משרתת גם את קהילות תל אביב, בת ים וראשון לציון הסמוכות.",
      en: "Holon is home to one of the central region's established Ethiopian spice shops — one of the few that also appear on the shop list published by the Embassy of Ethiopia in Israel. It serves the neighbouring Tel Aviv, Bat Yam and Rishon LeZion communities as well.",
      am: "በሆሎን ከማዕከላዊው ክልል የተቋቋሙ የኢትዮጵያ ቅመም ሱቆች አንዱ አለ — በእስራኤል የኢትዮጵያ ኤምባሲ ዝርዝር ላይም ይገኛል።",
    },
    shops: [
      {
        name: "מולו תבלינים",
        area: { he: "חולון", en: "Holon", am: "ሆሎን" },
        sells: {
          he: "תבלינים ומוצרים אתיופיים; חנות פיזית + הזמנות אונליין",
          en: "Ethiopian spices and products; physical shop + online ordering",
          am: "የኢትዮጵያ ቅመሞችና ምርቶች፤ ሱቅ + በመስመር ላይ ማዘዝ",
        },
        sourceUrl: "https://www.mulu-tavlenem.com/he/home",
        sourceLabel: {
          he: "אתר רשמי פעיל + רשימת שגרירות אתיופיה",
          en: "Live official website + Embassy of Ethiopia shop list",
          am: "ንቁ ድህረ ገጽ + የኢትዮጵያ ኤምባሲ ዝርዝር",
        },
        sourceYear: 2026,
        confidence: "current",
      },
    ],
    verifiedAt: "2026-08-30",
  },

  // ── Ashkelon ─────────────────────────────────────────────────────────────
  {
    citySlug: "ashkelon",
    status: "verified",
    intro: {
      he: "באשקלון פועלת חנות מפעל מבוססת לתבלינים ומוצרים אתיופיים, עם אתר פעיל, שעות פתיחה מפורסמות ומרכז הפצה במושב בית שקמה הסמוך. זו נקודת המכירה המאומתת המרכזית בדרום מישור החוף.",
      en: "Ashkelon has an established factory shop for Ethiopian spices and products, with a live website, published opening hours and a distribution centre in nearby Moshav Beit Shikma. It is the main verified point of sale on the southern coastal plain.",
      am: "በአሽቀሎን ለኢትዮጵያ ቅመሞችና ምርቶች የተቋቋመ የፋብሪካ ሱቅ አለ — ንቁ ድህረ ገጽና የታወቁ የክፍት ሰዓቶች አሉት።",
    },
    shops: [
      {
        name: "עלמיתו תבלינים",
        area: { he: "רחוב העבודה 26", en: "26 HaAvoda St.", am: "ሃአቮዳ ጎዳና 26" },
        sells: {
          he: "תבלינים אתיופיים, קטניות, קמח טף, ביגוד ותכשיטים מסורתיים והשכרת ציוד לאירועים",
          en: "Ethiopian spices, legumes, teff flour, traditional clothing and jewellery, and equipment rental for events",
          am: "የኢትዮጵያ ቅመሞች፣ ጥራጥሬዎች፣ የጤፍ ዱቄት፣ ባህላዊ ልብሶች እና የበዓል ዕቃ ኪራይ",
        },
        sourceUrl: "https://keren7890.wixsite.com/almitospices",
        sourceLabel: {
          he: "אתר רשמי פעיל + אינדקס עסקים BIBC",
          en: "Live official website + BIBC business directory",
          am: "ንቁ ኦፊሴላዊ ድህረ ገጽ + የBIBC ማውጫ",
        },
        sourceYear: 2026,
        confidence: "current",
      },
    ],
    verifiedAt: "2026-08-30",
  },

  // ── Kiryat Malakhi — highest community share (CBS: 13.8%) ────────────────
  {
    citySlug: "kiryat-malakhi",
    status: "partial",
    marketArea: {
      he: "המרכז המסחרי הישן",
      en: "The old commercial centre",
      am: "አሮጌው የንግድ ማዕከል",
    },
    intro: {
      he: "קריית מלאכי היא העיר עם השיעור הגבוה בישראל של יוצאי אתיופיה מכלל האוכלוסייה (13.8% לפי הלמ\"ס), אבל דווקא בה קשה לאמת חנויות במקורות פומביים. החנות היחידה שנזכרת בשמה בעיתונות הארצית פועלת במרכז המסחרי הישן, והמקור עליה הוא מ-2020 — התקשרו לפני שמגיעים במיוחד. אם אתם מהעיר ויודעים מה פתוח היום — נשמח לעדכון.",
      en: "Kiryat Malakhi has Israel's highest share of Ethiopian-Israelis in the total population (13.8% per CBS), yet it is precisely here that shops are hard to verify in public sources. The only shop named in national press operates in the old commercial centre, and the source dates to 2020 — call before making a special trip. If you live in the city and know what is open today — we would love an update.",
      am: "ቂርያት ማላኪ በእስራኤል ከፍተኛው የማህበረሰብ ድርሻ ያላት ከተማ ናት (13.8%)፣ ግን ሱቆችን በይፋዊ ምንጮች ማረጋገጥ ከባድ ነው። በጋዜጣ የተጠቀሰው ሱቅ በአሮጌው የንግድ ማዕከል ነው፤ ምንጩ ከ2020 ነው — ከመሄድዎ በፊት ይደውሉ።",
    },
    shops: [
      {
        name: "תבליני אורי",
        area: {
          he: "המרכז המסחרי הישן",
          en: "The old commercial centre",
          am: "አሮጌው የንግድ ማዕከል",
        },
        sells: {
          he: "מוצרי מזון אתיופיים מסורתיים ותבלינים",
          en: "Traditional Ethiopian food products and spices",
          am: "ባህላዊ የኢትዮጵያ ምግብ ምርቶችና ቅመሞች",
        },
        sourceUrl: "https://www.ynet.co.il/news/article/BJZX49Tlv",
        sourceLabel: {
          he: "כתבת ynet (2020)",
          en: "ynet feature (2020)",
          am: "የynet ጽሁፍ (2020)",
        },
        sourceYear: 2020,
        confidence: "dated",
      },
    ],
    verifiedAt: "2026-08-30",
  },

  // ── Be'er Sheva ──────────────────────────────────────────────────────────
  {
    citySlug: "beer-sheva",
    status: "partial",
    marketArea: {
      he: "העיר העתיקה",
      en: "The Old City",
      am: "አሮጌዋ ከተማ",
    },
    intro: {
      he: "בבאר שבע, העסקים האתיופיים המתועדים מתרכזים בעיר העתיקה — אבל אלה בעיקר מסעדות; חנות מכולת ייעודית קשה לאמת במקורות עדכניים. שם אחד מופיע ברשימת נקודות מכירה של טף, ללא כתובת וללא אימות עדכני — התקשרו לפני. לחלופין, המוכרים האונליין שברשימה למטה שולחים גם לדרום.",
      en: "In Be'er Sheva, documented Ethiopian businesses cluster in the Old City — but these are mostly restaurants; a dedicated grocery is hard to verify in current sources. One name appears on a teff points-of-sale list, with no address and no current verification — call first. Alternatively, the online sellers listed below deliver to the south as well.",
      am: "በቤር ሼቫ የተመዘገቡ የኢትዮጵያ ንግዶች በአሮጌዋ ከተማ ይሰበሰባሉ — ግን አብዛኞቹ ምግብ ቤቶች ናቸው። አንድ ስም በጤፍ መሸጫ ዝርዝር ላይ ይገኛል — አድራሻ የለውም፣ በቅድሚያ ይደውሉ።",
    },
    shops: [
      {
        name: "האחים ברוך",
        sells: {
          he: "תבלינים, כלי הגשה אתיופיים ומוצרי טף",
          en: "Spices, Ethiopian serving ware and teff products",
          am: "ቅመሞች፣ የኢትዮጵያ ማቅረቢያ ዕቃዎችና የጤፍ ምርቶች",
        },
        sourceUrl:
          "http://www.teff.co.il/%D7%97%D7%A0%D7%95%D7%99%D7%95%D7%AA-%D7%95%D7%90%D7%AA%D7%A8%D7%99-%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98-%D7%9C%D7%A7%D7%A0%D7%99%D7%99%D7%AA-%D7%98%D7%A3/",
        sourceLabel: {
          he: "רשימת נקודות מכירה של teff.co.il (לא מתוארך)",
          en: "teff.co.il points-of-sale list (undated)",
          am: "የteff.co.il የመሸጫ ዝርዝር (ያልተዘገበ ቀን)",
        },
        sourceYear: 2015,
        confidence: "dated",
      },
    ],
    verifiedAt: "2026-08-30",
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findCityShopping(citySlug: string): CityShoppingEntry | undefined {
  return CITY_SHOPPING.find((c) => c.citySlug === citySlug);
}

export function localized(value: Translatable, locale: Locale): string {
  return value[locale] ?? value[DEFAULT_LOCALE] ?? value.he ?? "";
}

export function cityIntro(entry: CityShoppingEntry, locale: Locale): string {
  return entry.intro[locale] ?? entry.intro[DEFAULT_LOCALE];
}
