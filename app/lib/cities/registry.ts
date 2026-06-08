// City registry — source of truth for programmatic SEO pages.
// Pure module: no DB, safe to import from loaders, actions, or tests.

import type { Locale } from "~/lib/i18n/config";

export type CityName = { he: string; en: string; am: string };
export type CityOverview = { he: string; en: string; am: string };

export type CommunityStat = {
  label: { he: string; en: string; am: string };
  value: string;
};

export type City = {
  slug: string;
  names: CityName;
  region: "jerusalem" | "center" | "south" | "north";
  geo: { lat: number; lon: number };
  overview: CityOverview;
  communityStats?: CommunityStat[];
};

export const CITIES: City[] = [
  // ── Jerusalem district ──────────────────────────────────────────────────
  {
    slug: "jerusalem",
    names: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    region: "jerusalem",
    geo: { lat: 31.7683, lon: 35.2137 },
    overview: {
      he: "ירושלים, עיר הבירה, מאכלסת קהילה גדולה של יוצאי אתיופיה, עם ריכוז היסטורי בשכונת גונדר בצפון העיר ונוכחות בקרית היובל ובשכונות נוספות. בעיר פועלים המרכז למורשת יהדות אתיופיה ובתי כנסת מסורתיים בניהול קייסים, ועם הביקוש לדיור קיים מגוון רחב של פתרונות מגורים.",
      en: "Jerusalem, Israel's capital, hosts a large Israeli-Ethiopian community concentrated historically in the Gondar neighbourhood in the north and with significant presence in Kiryat HaYovel and other areas. The city is home to the Centre for Ethiopian Jewish Heritage and several traditional synagogues led by kessim, alongside a broad housing market.",
      am: "ኢየሩሳሌም፣ የእስራኤል ዋና ከተማ፣ ከታሪካዊ አኳያ ሰሜናዊ ጎንደር ሰፈር ላይ ያተኮረ ትልቅ እስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ ያስተናግዳለች። ከተማዋ የኢትዮጵያ አይሁዳዊ ቅርስ ማዕከልን እና በቄሶች የሚመሩ ተለምዷዊ ምኩራቦችን ታስተናግዳለች፣ ሰፊ የቤት ፍለጋ ዕድሎችም አሉ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~30,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "גונדר, קרית היובל, פסגת זאב" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "מרכז מורשת יהדות אתיופיה, ENP" },
    ],
  },
  {
    slug: "beit-shemesh",
    names: { he: "בית שמש", en: "Beit Shemesh", am: "ቤት ሼሜሽ" },
    region: "jerusalem",
    geo: { lat: 31.7503, lon: 35.0005 },
    overview: {
      he: 'בית שמש היא אחת הערים הצומחות ביותר בישראל, ובמקביל לגידול האוכלוסין גדלה גם קהילת יוצאי אתיופיה המאכלסת מספר שכונות בעיר. שוק הנדל"ן מציע מחירים נגישים יחסית לאזור ירושלים, עם פרויקטים חדשים ובתי ספר מפותחים.',
      en: "Beit Shemesh is one of Israel's fastest-growing cities, and the Israeli-Ethiopian community has grown alongside it, settling in several neighbourhoods. The real-estate market offers relatively accessible prices for the greater Jerusalem area, with new developments and strong school infrastructure.",
      am: "ቤት ሼሜሽ ከፍ ያለ ዕድገት ካለባቸው ከተሞች አንዷ ናት፣ እስራኤላዊ-ኢትዮጵያዊ ማህበረሰቡም ተመጣጥኖ አድጓል። ትምህርት ቤቶችን ያካተቱ አዳዲስ ልማቶች ምቹ ዋጋ ያቀርባሉ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~8,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~9%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "רמת שפיר, גבעת שרת, נווה שאנן" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: 'ENP, מרכז קהילתי, ביה"ס עירוני' },
    ],
  },

  {
    slug: "maale-adumim",
    names: { he: "מעלה אדומים", en: "Ma'ale Adumim", am: "ማዓለ አዱሚም" },
    region: "jerusalem",
    geo: { lat: 31.7724, lon: 35.2992 },
    overview: {
      he: 'מעלה אדומים היא עיר באזור ירושלים עם קהילה ערה של יוצאי אתיופיה. שוק הנדל"ן מציע מגוון רחב של דירות, דופלקסים ובתים פרטיים — לרוב במחירים נוחים יותר ביחס לירושלים הסמוכה, עם גישה מהירה לבירה ולאזור המרכז.',
      en: "Ma'ale Adumim is a city in the greater Jerusalem area with a vibrant Israeli-Ethiopian community. The real-estate market offers a wide range of apartments, duplexes and private homes — often at more accessible prices than neighbouring Jerusalem, with quick access to the capital and the central region.",
      am: "ማዓለ አዱሚም በኢየሩሳሌም ዙሪያ ላይ ያለ ከተማ ሲሆን ንቁ የእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ አለ። ለካፒታሉ ቅርበት ያለ ሰፊ ቤቶች፣ ዱፕሌክሶች እና ፍላቶች ዕድሎች ያቀርባል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~2,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "פרחי אביב, נופים" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },

  // ── Center ───────────────────────────────────────────────────────────────
  {
    slug: "netanya",
    names: { he: "נתניה", en: "Netanya", am: "ነታንያ" },
    region: "center",
    geo: { lat: 32.3329, lon: 34.8599 },
    overview: {
      he: "נתניה היא אחד המוקדים הגדולים בישראל לקהילת יוצאי אתיופיה, עם נוכחות משמעותית במיוחד בשכונות דורה, נאות שקד וקריית נורדאו. בנוסף לקהילה הוותיקה, רבות מהמשפחות הצעירות מחפשות פתרונות דיור באזור — בין השאר במסגרת פרויקטי ההתחדשות העירונית הפעילים בעיר.",
      en: "Netanya is one of Israel's largest hubs of the Israeli-Ethiopian community, with a particularly strong presence in the Dora, Neot Shaked and Kiryat Nordau neighbourhoods. Alongside the established community, many younger families are looking for housing in the area — including through the active urban-renewal projects across the city.",
      am: "ነታንያ ለእስራኤላዊ-ኢትዮጵያዊ ማህበረሰብ በእስራኤል ካሉ ትላልቅ ማዕከላት አንዷ ናት፣ በተለይም በዶራ፣ ኒዮት ሻከድ እና ቂርያት ኖርዳው ሰፈሮች ጠንካራ መገኘት አላት። ብዙ ወጣት ቤተሰቦች ከከተማው ንቁ የከተማ እድሳት ፕሮጀክቶች ጨምሮ ቤት ይፈልጋሉ።",
    },
    communityStats: [
      {
        label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" },
        value: "~22,000",
      },
      {
        label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" },
        value: "~11%",
      },
      {
        label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" },
        value: "דורה, נאות שקד, קריית נורדאו",
      },
      {
        label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" },
        value: 'תנה בריאות, NATAL, ENP, מתנ"ס',
      },
    ],
  },
  {
    slug: "rishon-lezion",
    names: { he: "ראשון לציון", en: "Rishon LeZion", am: "ሪሾን ለጽዮን" },
    region: "center",
    geo: { lat: 31.971, lon: 34.7892 },
    overview: {
      he: "ראשון לציון מארחת קהילה גדולה ופעילה של יוצאי אתיופיה, עם ריכוז היסטורי בשכונת רמת אליהו — שכונה שנבנתה במקור כקליטה והפכה למוקד קהילתי ותיק. כיום השכונה נמצאת בלב מהלכי התחדשות עירונית, לצד נוכחות גוברת של בני הדור השני בכל רחבי העיר.",
      en: "Rishon LeZion is home to a large, active Israeli-Ethiopian community, historically concentrated in the Ramat Eliyahu neighbourhood — originally built as absorption housing and now a long-standing community centre. The neighbourhood is at the heart of urban-renewal efforts, alongside a growing second-generation presence across the city.",
      am: "ሪሾን ለጽዮን ትልቅ እና ንቁ የሆነ ማህበረሰብ ያስተናግዳለች፣ በታሪክ ወደ ራማት ኤልያሁ ሰፈር ያተኮረ። ሰፈሩ አሁን የከተማ እድሳት ማዕከል ሆኖ ሲሆን፣ ሁለተኛ ትውልዱ በመላ ከተማዋ ይስፋፋል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~12,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~8%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "רמת אליהו, נחלה" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "תנה בריאות, ביטוח לאומי מקומי" },
    ],
  },
  {
    slug: "rehovot",
    names: { he: "רחובות", en: "Rehovot", am: "ረሆቮት" },
    region: "center",
    geo: { lat: 31.8928, lon: 34.8113 },
    overview: {
      he: "רחובות מאכלסת קהילה ותיקה ומעורבת של יוצאי אתיופיה, עם ריכוז משמעותי בשכונת קריית משה. השכונה — שמרבית תושביה מהקהילה — נמצאת תחת תהליכי התחדשות עירונית, ויחד איתם עולה הביקוש לפתרונות דיור משלימים בעיר ובסביבתה.",
      en: "Rehovot has a long-established Israeli-Ethiopian community, with a significant concentration in the Kiryat Moshe neighbourhood. Most of the neighbourhood's residents are from the community, and it is currently going through urban-renewal processes — driving demand for additional housing options in the city and surrounding area.",
      am: "ረሆቮት ቆየት ያለ ማህበረሰብ አላት፣ በቂርያት ሞሼ ሰፈር ላይ ጉልህ መገኘት ያለው። ሰፈሩ የከተማ እድሳት ሂደቶችን እያለፈ ሲሆን ለቤት ፍለጋ ፍላጎቱ እያደገ ነው።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~8,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~8%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "קריית משה" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "tel-aviv",
    names: { he: "תל אביב", en: "Tel Aviv", am: "ቴል አቪቭ" },
    region: "center",
    geo: { lat: 32.0853, lon: 34.7818 },
    overview: {
      he: 'תל אביב היא מרכז משיכה לדור השני של יוצאי אתיופיה — אקדמאים, יזמים ואנשי מקצוע בהייטק, עיצוב ומשפט. הפעילות הקהילתית בעיר מתמקדת בקידום שוויון ומאבק בגזענות, לצד שוק נדל"ן תוסס המציע מגוון רחב של פתרונות מגורים.',
      en: "Tel Aviv is the main draw for the second generation of Israeli-Ethiopians — academics, entrepreneurs and professionals in tech, design and law. Community activity in the city focuses on equality and combating racism, alongside a vibrant real-estate market offering a wide range of housing options.",
      am: "ቴል አቪቭ ለሁለተኛ ትውልድ እስራኤላዊ-ኢትዮጵያዊ — ምሁራን፣ ሥራ ፈጣሪዎች፣ ሙያተኞች — ዋና ማዕከል ናት። ማህበረሰቡ ለሕዝቦቻቸው ሚዛናዊ ሁኔታ ዘርፈ-ሰፊ ድርጊቶችን ሲሰጥ ሕያው የሪል እስቴት ገበያ ሰፊ ምርጫ ያቀርባል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~6,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~1.5%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' הצפון, דרום תל אביב" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, HAMA, פרנץ' קיי קולה" },
    ],
  },
  {
    slug: "petach-tikva",
    names: { he: "פתח תקווה", en: "Petach Tikva", am: "ፔታህ ቲቅቫ" },
    region: "center",
    geo: { lat: 32.0841, lon: 34.8878 },
    overview: {
      he: "פתח תקווה מארחת קהילה פעילה של יוצאי אתיופיה, עם ריכוז של אקדמאים ואנשי מקצוע בכירים, בין השאר בזכות שיתוף הפעולה עם עמותת עולים ביחד. העיר מציעה מגוון דירות ואפשרויות רכישה בתנאים תחרותיים לאזור השרון.",
      en: "Petach Tikva hosts an active Israeli-Ethiopian community with a concentration of senior professionals and academics, in part through collaboration with the Olim Beyahad organisation. The city offers a variety of apartments and purchase options at competitive prices for the Sharon region.",
      am: "ፔታህ ቲቅቫ ዋናው በኦሊም ቢያሃድ ድርጅት ጋር ትብብርን ጨምሮ ሙያ ከፍ ያሉ እና ምሁራን ያሉ ንቁ ማህበረሰብ ያስተናጋጅ ናት። ከተማዋ ለሻሮን ክልሉ ተወዳዳሪ ዋጋ ያሉ ዓይነት ዓይነት አፓርታማዎች እና ምርጫዎች ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~7,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "כפר גנים, קריית ספיר" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "עולים ביחד, ENP" },
    ],
  },
  {
    slug: "lod",
    names: { he: "לוד", en: "Lod", am: "ሎዳ" },
    region: "center",
    geo: { lat: 31.9513, lon: 34.8956 },
    overview: {
      he: 'לוד מאכלסת קהילה ותיקה של יוצאי אתיופיה, עם שכונות בהן שיעור הקהילה גבוה. בשנים האחרונות מקבלת העיר תשומת לב רבה בשל תוכניות התחדשות עירונית ושינויים דמוגרפיים, המשפיעים ישירות על שוק הנדל"ן המקומי ועל אפשרויות הדיור לקהילה.',
      en: "Lod has a long-established Israeli-Ethiopian community in neighbourhoods where the community proportion is significant. In recent years the city has drawn attention due to urban-renewal plans and demographic shifts that directly affect the local real-estate market and housing options for the community.",
      am: "ሎዳ ጉልህ ከሆነ ሕዝቡ ድርሻ ያላቸው ሰፈሮች ቆየት ያለ ማህበረሰብ አላት። ቀጥተኛ ሁኔታ ለቤቶች ዕቅዶች እና ሕዝብ ለውጦች ምክንያት ሎዳ ሰፊ ትኩረት ሳቢ ሆኗል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~8,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~11%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "רמת אשכול, מרכז, גנים" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, NATAL, ביה\"ס אתיופי" },
    ],
  },
  {
    slug: "ramla",
    names: { he: "רמלה", en: "Ramla", am: "ራምላ" },
    region: "center",
    geo: { lat: 31.9246, lon: 34.8702 },
    overview: {
      he: "רמלה, הממוקמת בסמוך לתל אביב ולשדה התעופה, מאכלסת קהילה של יוצאי אתיופיה הנהנית מהמיקום האסטרטגי של העיר. שוק הדיור ברמלה מציע דירות במחירים נגישים יחסית למרכז, ומושך תושבים חדשים המחפשים נגישות לאזור תל אביב.",
      en: "Ramla, conveniently located near Tel Aviv and Ben Gurion Airport, hosts an Israeli-Ethiopian community that benefits from the city's strategic location. Ramla's housing market offers apartments at relatively accessible prices for the central region, attracting residents seeking easy access to greater Tel Aviv.",
      am: "ለቴል አቪቭ እና ቤን ጉሪዮን አውሮፕላን ማረፊያ ቅርብ ራምላ ጣቢያዊ ቦታ ጥቅሞቹን ተጠቅሞ ያለ ማህበረሰብ ትኮለምቻለህ። ለማዕከሉ ተደራሽ ዋጋ ያሉ አፓርታማዎችን ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~5,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~8%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ד', מרכז" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "ashdod",
    names: { he: "אשדוד", en: "Ashdod", am: "አሽዶድ" },
    region: "center",
    geo: { lat: 31.8044, lon: 34.6553 },
    overview: {
      he: "אשדוד, אחת הערים הגדולות בישראל, מארחת קהילה גדולה ומושרשת של יוצאי אתיופיה שהגיעה בגלי העלייה הראשונים. העיר מציעה מגוון נכסים — מדירות בשכונות ותיקות ועד פרויקטים חדשים — לצד רשת ענפה של שירותים ומוסדות קהילתיים.",
      en: "Ashdod, one of Israel's largest cities, is home to a large and well-rooted Israeli-Ethiopian community that arrived in the first waves of aliyah. The city offers a variety of properties — from apartments in established neighbourhoods to new projects — alongside an extensive network of community services and institutions.",
      am: "ከእስራኤል ትላልቅ ከተሞች አንዷ አሽዶድ ከመጀመሪያዎቹ ዓሊያ ሞገዶች ትልቅ እና ሥር የሰደደ ማህበረሰብ ያስተናግዳለህ። ሰፊ ማህበረሰብ አገልግሎቶች ጎን ለጎን ዓይነት ዓይነት ንብረቶችን ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~15,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~7%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "ד', ה', ז'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, NATAL, תנה בריאות" },
    ],
  },
  {
    slug: "holon",
    names: { he: "חולון", en: "Holon", am: "ሆሎን" },
    region: "center",
    geo: { lat: 32.0118, lon: 34.7747 },
    overview: {
      he: 'חולון מארחת קהילה גדלה של יוצאי אתיופיה, בעיקר בני הדור השני המחפשים קרבה לתל אביב תוך שמירה על עלויות דיור נוחות. העיר מציעה שוק נדל"ן מגוון ומרחב עירוני עם שירותים מפותחים ומוסדות תרבות.',
      en: "Holon hosts a growing Israeli-Ethiopian community, primarily second-generation members seeking proximity to Tel Aviv while maintaining accessible housing costs. The city offers a diverse real-estate market and an urban environment with developed services and cultural institutions.",
      am: "ሆሎን እያደገ ያለ ዋናው ሁለተኛ ትውልድ አባላት ሲሆኑ ለቴል አቪቭ ቅርበትን ሲፈልጉ ተደራሽ የቤት ወጪዎችን ያስጠብቃሉ። ሰፊ ዘርፍ ያለው ሪል እስቴት ገበያ እና ባህላዊ ተቋማት ያሉ ከተማዊ አካባቢ ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~5,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "קריית שרת, אזור" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: 'ENP, מתנ"ס' },
    ],
  },
  {
    slug: "bat-yam",
    names: { he: "בת ים", en: "Bat Yam", am: "ባት ያም" },
    region: "center",
    geo: { lat: 32.0172, lon: 34.7502 },
    overview: {
      he: 'בת ים, שכנה לחוף הים ולתל אביב, מאכלסת קהילה של יוצאי אתיופיה עם נוכחות בשכונות שונות בעיר. מחירי הנדל"ן הנוחים יחסית ומיקומה האטרקטיבי הופכים אותה לפתרון מגורים מועדף עבור מי שמחפש איזון בין מרכזיות לנגישות.',
      en: "Bat Yam, adjacent to the sea and Tel Aviv, hosts an Israeli-Ethiopian community present in several neighbourhoods across the city. Its relatively accessible real-estate prices and attractive location make it a preferred housing option for those seeking a balance between centrality and accessibility.",
      am: "ወደ ባህሩ እና ቴል አቪቭ ቅርብ ባት ያም በከተማዋ ብዙ ሰፈሮች ያሉ ማህበረሰብ ያስተናጋጅ ናት። ተደራሽ ዋጋ እና ቅርብ ቦታ ማዕከልነት ሚዛናዊ ለሚፈልጉ ምቹ ምርጫ ናት።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~4,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "רמת יוסף, בת-גלים" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "yavne",
    names: { he: "יבנה", en: "Yavne", am: "ያቭኔ" },
    region: "center",
    geo: { lat: 31.8778, lon: 34.7444 },
    overview: {
      he: 'יבנה ממוקמת בלב אזור הדרום-מרכז ומקיימת קהילה מקומית של יוצאי אתיופיה. שוק הנדל"ן ביבנה ידוע במחירים תחרותיים ובאיכות חיים גבוהה, ומושך משפחות המחפשות פתרון דיור ביניים בין מרכז לדרום.',
      en: "Yavne, located in the heart of the south-central region, has a local Israeli-Ethiopian community. Yavne's real-estate market is known for competitive prices and good quality of life, attracting families looking for an intermediate housing option between the centre and the south.",
      am: "ደቡብ-ማዕከላዊ ክልሉ ልብ ያለ ያቭኔ አካባቢያዊ ማህበረሰብ አላት። ዋጋ ተወዳዳሪ ሁኔታ እና ጥሩ ጥቅም ያለ ሕይወት ሁኔታ ለሚፈልጉ ቤተሰቦች ሰፊ አቅርቦት ታቀርብለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~3,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~6%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ד', מרכז" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
  {
    slug: "kfar-saba",
    names: { he: "כפר סבא", en: "Kfar Saba", am: "ካፋር ሳባ" },
    region: "center",
    geo: { lat: 32.1753, lon: 34.9077 },
    overview: {
      he: "כפר סבא מארחת קהילה של יוצאי אתיופיה עם ריכוז של אקדמאים ואנשי מקצוע המשתלבים בשוק העבודה האזורי. העיר מציעה שכונות שקטות, איכות חיים גבוהה ונגישות נוחה לתחבורה ולמרכזי תעסוקה בשרון.",
      en: "Kfar Saba hosts an Israeli-Ethiopian community with a concentration of academics and professionals integrated into the regional job market. The city offers quiet neighbourhoods, high quality of life and easy access to transportation and employment centres in the Sharon region.",
      am: "ካፋር ሳባ ዋናው አካባቢያዊ ሥራ ገበያ ውስጥ ተዋህደዉ ያሉ ምሁራን እና ሙያተኞችን ያቀፈ ማህበረሰብ ያስተናጋጅ ናት። ጸጥ ያሉ ሰፈሮች፣ ከፍ ያለ ሕይወት ጥራት እና ለሻሮን ቀዳሚ ቦታ ትሰጣለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~3,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~3%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ג', רמת כפר סבא" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "עולים ביחד, ENP" },
    ],
  },
  {
    slug: "herzliya",
    names: { he: "הרצליה", en: "Herzliya", am: "ሄርዝሊያ" },
    region: "center",
    geo: { lat: 32.1672, lon: 34.8396 },
    overview: {
      he: 'הרצליה, הידועה כמרכז היי-טק ישראלי, מושכת יוצאי אתיופיה מהדור השני שהשתלבו בתעשיות ובשירותים המתקדמים. שוק הנדל"ן בהרצליה פעיל ותוסס עם מגוון אפשרויות מגורים לאנשי מקצוע.',
      en: "Herzliya, known as a hub of Israeli high-tech, attracts second-generation Israeli-Ethiopians integrated into advanced industries and services. The city's real-estate market is active and dynamic, with a variety of housing options for professionals.",
      am: "ሄርዝሊያ ሃይ-ቴክ ማዕከልነቱ ታዋቂ ሲሆን ወደ ሁለተኛ ትውልድ እስራኤላዊ-ኢትዮጵያዊ ቀዳምያን ይስባል። ሕያው ሪል እስቴት ገበያ ዓይነት ዓይነት ምርጫ ያቀርባል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~2,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~2%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "הרצליה פיתוח, נווה אמל" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
  {
    slug: "modiin",
    names: { he: "מודיעין", en: "Modi'in", am: "ሞዲኢን" },
    region: "center",
    geo: { lat: 31.8977, lon: 35.0099 },
    overview: {
      he: "מודיעין-מכבים-רעות, שנבנתה כעיר ממוזגת ומתוכננת, מהווה מגנט לדור השני של יוצאי אתיופיה המחפש סביבה עירונית חדשה. העיר מציעה פתרונות דיור חדשים ואיכותיים, לצד תשתיות חינוך ותחבורה מפותחות.",
      en: "Modi'in-Maccabim-Re'ut, built as a planned mixed city, is a magnet for the second generation of Israeli-Ethiopians looking for a new urban environment. The city offers new, high-quality housing options alongside developed education and transportation infrastructure.",
      am: "ሞዲኢን-ማካቢም-ሪኡት ዕቅድ ተይዞ የተሰራ ሲሆን ዘመናዊ አካባቢ ለሚፈልጉ ሁለተኛ ትውልድ ቀዳሚ ምርጫ ነው። ዳበሩ ትምህርት እና ትራንስፖርት ጎን ለጎን አዳዲስ ቤቶችን ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~2,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~2%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "אנות, ענבל" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },

  // ── South ────────────────────────────────────────────────────────────────
  {
    slug: "ashkelon",
    names: { he: "אשקלון", en: "Ashkelon", am: "አሽከሎን" },
    region: "south",
    geo: { lat: 31.6688, lon: 34.5717 },
    overview: {
      he: "אשקלון קלטה גלים משמעותיים של יוצאי אתיופיה משנות ה-90 ואילך, ומהווה כיום מוקד קהילתי דרומי משמעותי. הקהילה פרושה בשכונות שונות בעיר, עם נוכחות גוברת של עסקים, מוסדות חינוך ויוזמות חברתיות מקומיות.",
      en: "Ashkelon absorbed significant waves of Israeli-Ethiopian community members from the 1990s onward and is today a major southern community hub. Community members are spread across multiple neighbourhoods in the city, alongside a growing presence of local businesses, educational institutions and community-led initiatives.",
      am: "አሽከሎን ከ1990ዎቹ ጀምሮ ጉልህ ሞገዶችን ተቀብላ ዛሬ ዋና ደቡባዊ ማዕከል ናት። ማህበረሰቡ ከአካባቢ ንግዶች እና ትምህርት ተቋማት ጋር በሰፈሮች ተበትኗል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~9,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~7%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "ברנע, שמשון, אפרידר" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, NATAL, מרכז קהילתי" },
    ],
  },
  {
    slug: "kiryat-gat",
    names: { he: "קריית גת", en: "Kiryat Gat", am: "ቂርያት ጋት" },
    region: "south",
    geo: { lat: 31.6098, lon: 34.7642 },
    overview: {
      he: "קריית גת היא אחת הערים בישראל בהן שיעור הקהילה מתוך כלל האוכלוסייה הוא מהגבוהים. הקהילה פעילה בעיר עשרות שנים, עם רשת ענפה של ארגונים, בתי ספר ומיזמים — ועל רקע זה גם דרישה גבוהה לפתרונות דיור הוגנים בעיר.",
      en: "Kiryat Gat has one of the highest proportions of Israeli-Ethiopian community members relative to total population in Israel. The community has been active in the city for decades, with a broad network of organisations, schools and initiatives — and a correspondingly high demand for fair housing options.",
      am: "ቂርያት ጋት ከጠቅላላ ሕዝብ አንፃር ከፍተኛ ድርሻ ያለ ማህበረሰብ ካሉባቸው ከተሞች አንዷ ናት። ሰፊ ድርጅቶች፣ ትምህርት ቤቶች፣ ተነሳሽነቶች እና ፍትሐዊ ቤት ዕድሎች ሰፊ ፍላጎት አለ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~15,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~28%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, מזרח, גבעת השלושה" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מתנ\"ס, ביה\"ס קהילתי" },
    ],
  },
  {
    slug: "beer-sheva",
    names: { he: "באר שבע", en: "Be'er Sheva", am: "ቤር ሼቫ" },
    region: "south",
    geo: { lat: 31.2518, lon: 34.7913 },
    overview: {
      he: "באר שבע, הגדולה בערי הדרום, מאכלסת קהילה גדלה של יוצאי אתיופיה, עם נוכחות משמעותית של בני הדור השני סביב אוניברסיטת בן גוריון ובמוסדות חינוך אזוריים. העיר מציעה מגוון נכסים והזדמנויות דיור, לצד פרויקטי תשתית ופיתוח.",
      en: "Be'er Sheva, the largest city in the south, hosts a growing Israeli-Ethiopian community, with a notable second-generation presence around Ben-Gurion University and regional educational institutions. The city offers a wide range of properties and housing opportunities alongside ongoing infrastructure and development projects.",
      am: "ቤር ሼቫ ከደቡብ ትላቅ ናት፣ እያደገ ያለ ማህበረሰብ ያስተናግዳለህ፣ ዋናው ሁለተኛ ትውልድ ሲሆን ሰፊ ቤቶች እና ሥርዓተ-ምህዳር ዕድሎች ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~10,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~5%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ד', שכ' ה', שכ' א'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, אוניברסיטת בן גוריון, עמותות מקומיות" },
    ],
  },
  {
    slug: "kiryat-malakhi",
    names: { he: "קריית מלאכי", en: "Kiryat Malakhi", am: "ቂርያት ማላኪ" },
    region: "south",
    geo: { lat: 31.7311, lon: 34.7466 },
    overview: {
      he: "קריית מלאכי היא אחת הערים בישראל עם שיעור גבוה במיוחד של יוצאי אתיופיה מתוך כלל האוכלוסייה. הקהילה היא חלק מרכזי באופי העיר — עם השפעה נראית במוסדות חינוך, מסחר ופעילות חברתית — ועם דרישה משמעותית לפתרונות דיור עדכניים.",
      en: "Kiryat Malakhi is one of Israel's cities with a particularly high proportion of Israeli-Ethiopian community members relative to total population. The community is a central part of the city's character — visibly present in education, commerce and community activity — alongside significant demand for updated housing options.",
      am: "ቂርያት ማላኪ ከጠቅላላ ሕዝቡ አንፃር ከፍ ያለ ድርሻ ያለ ማህበረሰብ ካሉባቸው ከተሞች አንዷ ናት። ማህበረሰቡ ለከተማዋ ባሕሪ ዋናው ክፍል ናቸው — ለዘመናዊ ቤቶች ጉልህ ፍላጎት አለ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~9,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~30%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, צפון, קרית חיים" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "sderot",
    names: { he: "שדרות", en: "Sderot", am: "ስደሮት" },
    region: "south",
    geo: { lat: 31.5239, lon: 34.5962 },
    overview: {
      he: "שדרות, הממוקמת בצמוד לגבול עם עזה, מאכלסת קהילה ותיקה של יוצאי אתיופיה שהתמודדה עם אתגרים ביטחוניים לצד קשיים כלכליים. הקהילה הוכיחה חוסן מרשים, ופרויקטי הפיתוח בעיר מציעים הזדמנויות דיור חדשות.",
      en: "Sderot, located adjacent to the Gaza border, hosts a long-established Israeli-Ethiopian community that has dealt with security challenges alongside economic hardship. The community has demonstrated remarkable resilience, and development projects in the city offer new housing opportunities.",
      am: "ከጋዛ ድንበር ቅርብ ያለ ስደሮት ከጸጥታ ፈተናዎች ጋር ቆርቆሮ ቆየ ያለ ማህበረሰብ ያስተናግዳለህ። ማህበረሰቡ ጉልህ ጽናት ያሳይ ሲሆን ልማት ፕሮጀክቶች አዳዲስ ቤት ዕድሎች ያቀርባሉ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~7,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~35%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ב', שכ' ג'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: 'ENP, NATAL, ביה"ס קהילתי' },
    ],
  },
  {
    slug: "dimona",
    names: { he: "דימונה", en: "Dimona", am: "ዲሞና" },
    region: "south",
    geo: { lat: 31.068, lon: 35.0326 },
    overview: {
      he: 'דימונה ידועה כאחת הערים בישראל עם שיעור גבוה של יוצאי אתיופיה מתוך כלל האוכלוסייה — קהילה שאחראית לחלק ניכר מהתרבות העירונית ומהרשת החינוכית. שוק הנדל"ן מציע נכסים בעלויות נגישות ביחס לגודל הדירות.',
      en: "Dimona is known as one of Israel's cities with a high proportion of Israeli-Ethiopian community members relative to total population — a community that accounts for a significant part of the city's culture and educational networks. The real-estate market offers properties at accessible prices relative to apartment size.",
      am: "ዲሞና ከፍ ያለ ድርሻ ያለ ማህበረሰብ ካሉባቸው ከተሞች ታዋቂ ናት። ማህበረሰቡ ለከተማ ባህል እና ትምህርት ዋናው ክፍል ናቸው ሲሆን ተደራሽ ዋጋ ያሉ ንብረቶች ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~8,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~32%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ב', שכ' ג', מרכז" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי, בית כנסת קייסים" },
    ],
  },
  {
    slug: "yerucham",
    names: { he: "ירוחם", en: "Yerucham", am: "ኢሩሃም" },
    region: "south",
    geo: { lat: 30.9988, lon: 34.9305 },
    overview: {
      he: "ירוחם, עיר מדבר קטנה בנגב, מאכלסת קהילה קטנה של יוצאי אתיופיה המשתלבת בחיי הקהילה המקומית. בשנים האחרונות הפכה ירוחם למוקד פיתוח המושך אוכלוסיות צעירות, עם פתרונות דיור במחירים נוחים מאוד.",
      en: "Yerucham, a small Negev desert town, hosts a small Israeli-Ethiopian community integrated into local community life. In recent years Yerucham has become a development hub attracting younger populations, offering very accessible housing prices.",
      am: "ትንሽ የኔጌቭ ምድረ-በዳ ከተማ ኢሩሃም ወደ አካባቢ ሕይወት ተዋህዶ ያለ ትንሽ ማህበረሰብ ያስተናጋጅ ናት። ወጣቶችን የሚስብ ልማት ማዕከል ሆኗል፣ ሰፊ ተደራሽ ዋጋ ያሉ ቤቶችን ያቀርባሉ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~2,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~20%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, צפון" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "eilat",
    names: { he: "אילת", en: "Eilat", am: "ኤይላት" },
    region: "south",
    geo: { lat: 29.5581, lon: 34.9482 },
    overview: {
      he: 'אילת, עיר הנמל הדרומית על ים סוף, מארחת קהילה קטנה של יוצאי אתיופיה עם נוכחות בתחומי האירוח והשירותים. שוק הנדל"ן באילת ייחודי בהיעדר מע"מ על רכישת דירות, מה שמושך משקיעים ורוכשים מכל הארץ.',
      en: "Eilat, the southern port city on the Red Sea, hosts a small Israeli-Ethiopian community with a presence in the hospitality and services sectors. Eilat's real-estate market is unique in its VAT exemption on property purchases, attracting investors and buyers from across the country.",
      am: "የቀይ ባሕር ወደብ ከተማ ደቡባዊ ኤይላት ዕረፍት እና አገልግሎቶች ዘርፍ ያለ ትንሽ ማህበረሰብ ያስተናጋጅ ናት። ቀረጥ የሌለ ምርጫ ሕዝቡን ሁሉ ሰፊ ሳቢ ያደርጋቸዋል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~3%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, צפון אילת" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
  {
    slug: "netivot",
    names: { he: "נתיבות", en: "Netivot", am: "ንቲቮት" },
    region: "south",
    geo: { lat: 31.4196, lon: 34.5903 },
    overview: {
      he: 'נתיבות היא עיר דרומית קטנה עם קהילה של יוצאי אתיופיה החיה בה שנים רבות. העיר מציעה סביבת חיים שקטה ואיכותית, עם מחירי נדל"ן נגישים ביחס לאזור הנגב.',
      en: "Netivot is a small southern city with an Israeli-Ethiopian community that has lived there for many years. The city offers a quiet, quality living environment with accessible real-estate prices for the Negev region.",
      am: "ንቲቮት ብዙ ዓመታት ኖሮ ያለ ማህበረሰብ ያስተናጋጅ ትንሽ ደቡባዊ ከተማ ናት። ጸጥ ያለ ጥሩ ሕይወት ምቹ ዋጋ ያሉ ቤቶችን ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~3,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~14%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, מזרח" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "arad",
    names: { he: "ערד", en: "Arad", am: "ዓረድ" },
    region: "south",
    geo: { lat: 31.2596, lon: 35.2127 },
    overview: {
      he: 'ערד, עיר מדבר קטנה בנגב, מאכלסת קהילה קטנה ויציבה של יוצאי אתיופיה. יתרונות ערד כוללים מחירי נדל"ן נמוכים, אוויר נקי וסביבה טבעית מרהיבה, לצד פרויקטי פיתוח חדשים בעיר.',
      en: "Arad, a small Negev desert city, hosts a small and stable Israeli-Ethiopian community. Arad's advantages include low real-estate prices, clean air and a stunning natural environment, alongside new development projects in the city.",
      am: "ትንሽ የኔጌቭ ምድረ-በዳ ከተማ ዓረድ ትንሽ እና ሙሉ ማህበረሰብ ያስተናጋጅ ናት። ዝቅተኛ ዋጋ ያለ ሪል እስቴት፣ ንፁህ አየር እና ድንቅ ተፈጥሮ ዙሪያ ጥቅሞቿ ናቸው።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~10%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ג', שכ' ד'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },

  // ── North ────────────────────────────────────────────────────────────────
  {
    slug: "haifa",
    names: { he: "חיפה", en: "Haifa", am: "ሐይፋ" },
    region: "north",
    geo: { lat: 32.794, lon: 34.9896 },
    overview: {
      he: 'חיפה מארחת קהילה ותיקה של יוצאי אתיופיה, פרושה ברבעים שונים בעיר. שוק הנדל"ן בעיר מציע מגוון של פתרונות דיור — מעיצובים מודרניים בכרמל ועד שכונות עם פוטנציאל התחדשות במזרח העיר.',
      en: "Haifa is home to an established Israeli-Ethiopian community, spread across multiple neighbourhoods in the city. The local real-estate market offers a range of housing options — from modern projects in the Carmel area to neighbourhoods with urban-renewal potential in the eastern part of the city.",
      am: "ሐይፋ የተመሰረተ ማህበረሰብ ያስተናጋጅ ናት፣ በብዙ ሰፈሮች ተበትኗል። ሪል እስቴት ዓይነት ዓይነት ምርጫ ያቀርባል — ከካርሜል ዘመናዊ ፕሮጀክቶች እስከ ምስራቃዊ ሰፈሮች።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~10,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "כרמל הצרפתי, הדר, כרמליה" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP חיפה, בית הספר לקהילה" },
    ],
  },
  {
    slug: "kiryat-ata",
    names: { he: "קריית אתא", en: "Kiryat Ata", am: "ቂርያት አታ" },
    region: "north",
    geo: { lat: 32.8068, lon: 35.1097 },
    overview: {
      he: "קריית אתא, עיר בגוש חיפה, מאכלסת קהילה של יוצאי אתיופיה המשתרעת על פני מספר שכונות. קרבתה לחיפה ולאזורי תעסוקה מרכזיים הופכת אותה לאפשרות משיכה עבור מי שמחפש דיור בעלות נמוכה יחסית לחיפה.",
      en: "Kiryat Ata, a city in the Haifa metropolitan area, is home to an Israeli-Ethiopian community spread across several neighbourhoods. Its proximity to Haifa and major employment centres makes it an attractive option for those seeking housing at a lower cost than Haifa.",
      am: "ቂርያት አታ ለሐይፋ ሜትሮ አካባቢ ያለ ለብዙ ሰፈሮች ዘርፍ ያለ ማህበረሰብ ቤት ናት። ለሐይፋ ቅርበቱ ዝቅ ያለ ዋጋ ለሚፈልጉ ጥሩ ምርጫ ያደርጋቸዋል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~3,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~5%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ב', שכ' ג'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי חיפה" },
    ],
  },
  {
    slug: "kiryat-bialik",
    names: { he: "קריית ביאליק", en: "Kiryat Bialik", am: "ቂርያት ቢያሊቅ" },
    region: "north",
    geo: { lat: 32.8214, lon: 35.0919 },
    overview: {
      he: 'קריית ביאליק, אחת מיישובי הקריות הסמוכים לחיפה, מאכלסת קהילה קטנה של יוצאי אתיופיה. העיר מציעה מחירי נדל"ן נגישים יחסית לחיפה ונגישות נוחה לאזורי תעסוקה ולמוסדות חינוך בצפון.',
      en: "Kiryat Bialik, one of the Kiryot settlements adjacent to Haifa, hosts a small Israeli-Ethiopian community. The city offers accessible real-estate prices relative to Haifa and easy access to employment areas and educational institutions in the north.",
      am: "ቂርያት ቢያሊቅ ለሐይፋ ቅርብ ሰፈሮቿ ካሉ ትንሽ ማህበረሰብ ያስተናጋጅ ናት። ለሰሜን ቦታዎች ሰፊ ቀዳሜ ዋጋ ያለ ሪል እስቴት ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~2,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ג', מרכז" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
  {
    slug: "carmiel",
    names: { he: "כרמיאל", en: "Carmiel", am: "ካርሚኤል" },
    region: "north",
    geo: { lat: 32.9184, lon: 35.3057 },
    overview: {
      he: 'כרמיאל, עיר ראשית בגליל, מאכלסת קהילה מצומצמת אך פעילה של יוצאי אתיופיה. העיר מציעה שוק נדל"ן יציב ואיכות חיים גבוהה בסביבה ירוקה, עם נגישות לאזורי תעסוקה ומוסדות חינוך אזוריים.',
      en: "Carmiel, a major city in the Galilee, has a small but active Israeli-Ethiopian community. The city offers a stable real-estate market and high quality of life in a green environment, with access to employment areas and regional educational institutions.",
      am: "ካርሚኤል ዋናዋ ጋሊሌ ከተማ ሆና ትንሽ ነገር ግን ንቁ ማህበረሰብ ያስተናጋጅ ናት። ሰፊ ልዩ ቦታ ሕያው ሪል እስቴት ሁኔታ እና ከፍ ያለ ሕይወት ጥራት ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~2,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~5%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, שכ' ב'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "afula",
    names: { he: "עפולה", en: "Afula", am: "አፉላ" },
    region: "north",
    geo: { lat: 32.6052, lon: 35.2894 },
    overview: {
      he: 'עפולה, מרכז עמק יזרעאל, מאכלסת קהילה של יוצאי אתיופיה עם נוכחות בשכונות שונות. העיר מציעה מחירי נדל"ן נוחים ונגישות לשירותי בריאות ולמרכזי תעסוקה אזוריים.',
      en: "Afula, the centre of the Jezreel Valley, hosts an Israeli-Ethiopian community with a presence in various neighbourhoods. The city offers accessible real-estate prices and access to health services and regional employment centres.",
      am: "ዬዝሬኤል ሸለቆ ማዕከል አፉላ ዓይነት ዓይነት ሰፈሮች ያሉ ማህበረሰብ ያስተናጋጅ ናት። ምቹ ዋጋ ያሉ ሪል እስቴት እና ወደ ጤና አገልግሎቶች ቀዳሚ ቦታ ትሰጣለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~3,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~7%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ב', שכ' ג'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "acre",
    names: { he: "עכו", en: "Acre", am: "ዓክኮ" },
    region: "north",
    geo: { lat: 32.92, lon: 35.0694 },
    overview: {
      he: 'עכו, עיר הנמל ההיסטורית בצפון, מאכלסת קהילה קטנה של יוצאי אתיופיה הנהנית מהאווירה הייחודית של העיר. שוק הנדל"ן בעכו מציע נכסים במחירים נגישים, כולל נכסים בעיר העתיקה ובשכונות החדשות.',
      en: "Acre, the historic northern port city, hosts a small Israeli-Ethiopian community that enjoys the city's unique atmosphere. Acre's real-estate market offers properties at accessible prices, including properties in the Old City and the newer neighbourhoods.",
      am: "ታሪካዊ ሰሜናዊ ወደብ ዓክኮ ትንሽ ነገር ግን ንቁ የሆነ ማህበረሰብ ያስተናጋጅ ናት። ምቹ ዋጋ ያሉ ሪል እስቴት ታቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "הצפון, המזרח" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
  {
    slug: "nahariya",
    names: { he: "נהריה", en: "Nahariya", am: "ናሃርያ" },
    region: "north",
    geo: { lat: 33.0097, lon: 35.0975 },
    overview: {
      he: 'נהריה, עיר חוף ציורית בצפון הארץ, מאכלסת קהילה קטנה של יוצאי אתיופיה. שוק הנדל"ן בנהריה מציע מגוון נכסים לצד הים ובסביבתו, במחירים הנחשבים נגישים יחסית לאזור הצפון.',
      en: "Nahariya, a scenic northern coastal city, hosts a small Israeli-Ethiopian community. Nahariya's real-estate market offers a variety of properties along and near the sea, at prices considered accessible relative to the northern region.",
      am: "ቆንጆ ሰሜናዊ ወደብ ናሃርያ ትንሽ ማህበረሰብ ያስተናጋጅ ናት። ሪል እስቴት ሰፊ ዓይነት ዓይነት ንብረቶችን ለሰሜን ተደራሽ ዋጋ ያቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~4%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ג', מרכז" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
  {
    slug: "kiryat-shmona",
    names: { he: "קריית שמונה", en: "Kiryat Shmona", am: "ቂርያት ሽሞና" },
    region: "north",
    geo: { lat: 33.2073, lon: 35.5706 },
    overview: {
      he: 'קריית שמונה, הממוקמת בגליל העליון, מאכלסת קהילה קטנה של יוצאי אתיופיה הנהנית מהנוף ומהקרבה לטבע. שוק הנדל"ן מציע נכסים במחירים נמוכים מאוד, לצד אתגרי ביטחון ידועים.',
      en: "Kiryat Shmona, located in the Upper Galilee, hosts a small Israeli-Ethiopian community that enjoys the scenery and proximity to nature. The real-estate market offers properties at very low prices, alongside known security challenges.",
      am: "ከፍ ባለ ጋሊሌ ያለ ቂርያት ሽሞና ትንሽ ነገር ግን ሙሉ ማህበረሰብ ያስተናጋጅ ናት። ሪል እስቴት ዝቅ ያለ ዋጋ ያቀርባለህ፣ ከጥሩ ተፈጥሮ ጋር።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~6%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, דרום" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "tiberias",
    names: { he: "טבריה", en: "Tiberias", am: "ጢቤርያስ" },
    region: "north",
    geo: { lat: 32.7939, lon: 35.5308 },
    overview: {
      he: 'טבריה, על גדות הכינרת, מאכלסת קהילה קטנה של יוצאי אתיופיה. שוק הנדל"ן בטבריה מציע נכסים במחירים נגישים עם נוף לכינרת, ויש בה אפשרויות פיתוח תיירותי ועסקי.',
      en: "Tiberias, on the shores of the Sea of Galilee, hosts a small Israeli-Ethiopian community. Tiberias's real-estate market offers accessible-priced properties with views of the Kinneret, alongside tourism and business development opportunities.",
      am: "ኪናሮስ ባሕር ዳርቻ ጢቤርያስ ትንሽ ነገር ግን ሕያው ማህበረሰብ ያስተናጋጅ ናት። ሪል እስቴት ምቹ ዋጋ ያሉ ቤቶችን ከኪናሮስ ምስክር ጋር ያቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~5%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' א', שכ' ב'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
  {
    slug: "safed",
    names: { he: "צפת", en: "Safed", am: "ጽፋት" },
    region: "north",
    geo: { lat: 32.9658, lon: 35.4958 },
    overview: {
      he: 'צפת, עיר ההרים הגלילית הידועה במורשתה הרוחנית, מאכלסת קהילה קטנה של יוצאי אתיופיה. שוק הנדל"ן מציע נכסים במחירים נוחים ביחס לאיכות הסביבה, עם פוטנציאל תיירותי ייחודי.',
      en: "Safed, the Galilean mountain city known for its spiritual heritage, hosts a small Israeli-Ethiopian community. The real-estate market offers properties at accessible prices relative to the quality of the environment, with unique tourism potential.",
      am: "ሰፊ ባህሉ ሕዝቡን ታዋቂ ከሆነው ጋሊሌ ሸለቆ ተራሮ ጽፋት ትንሽ ማህበረሰብ ያስተናጋጅ ናት። ሪል እስቴት ምቹ ዋጋ ያቀርባለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~5%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז, קנדה" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "nof-hagalil",
    names: { he: "נוף הגליל", en: "Nof HaGalil", am: "ኖፍ ሃጋሊል" },
    region: "north",
    geo: { lat: 32.7048, lon: 35.3303 },
    overview: {
      he: "נוף הגליל (לשעבר נצרת עילית), עיר הממוקמת מעל נצרת, מאכלסת קהילה של יוצאי אתיופיה עם נוכחות בשכונות שונות. העיר מציעה נוף מרהיב לגליל, מחירי דיור נגישים ומיקום נוח לאזורי תעסוקה בצפון.",
      en: "Nof HaGalil (formerly Nazareth Illit), a city overlooking Nazareth, hosts an Israeli-Ethiopian community with a presence in various neighbourhoods. The city offers stunning Galilee views, accessible housing prices and a convenient location for employment areas in the north.",
      am: "ናዝሬት ላይ ያለ ኖፍ ሃጋሊል ዓይነት ዓይነት ሰፈሮች ያሉ ማህበረሰብ ያስተናጋጅ ናት። ድንቅ ጋሊሌ ምስክር፣ ምቹ ዋጋ ያሉ ቤቶች እና ለሰሜን ቀዳሚ ቦታ ትሰጣለህ።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~2,500" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~7%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "שכ' ג', שכ' ד'" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP, מרכז קהילתי" },
    ],
  },
  {
    slug: "maalot-tarshiha",
    names: { he: "מעלות-תרשיחא", en: "Ma'alot-Tarshiha", am: "ማዓሎት-ታርሺሃ" },
    region: "north",
    geo: { lat: 33.0155, lon: 35.2693 },
    overview: {
      he: 'מעלות-תרשיחא היא עיר מעורבת (יהודית-ערבית) בצפון הגליל, עם קהילה קטנה של יוצאי אתיופיה. מחירי הנדל"ן הנגישים, הסביבה הירוקה ואיכות החיים הגבוהה הופכים אותה לאפשרות מגורים מושכת.',
      en: "Ma'alot-Tarshiha is a mixed (Jewish-Arab) city in the Upper Galilee, with a small Israeli-Ethiopian community. Its accessible real-estate prices, green surroundings and high quality of life make it an attractive residential option.",
      am: "ማዓሎት-ታርሺሃ ሰሜናዊ ጋሊሌ ቅልቅል ከተማ ናት፣ ከትንሽ ማህበረሰብ ጋር። ምቹ ዋጋ ያሉ ሪል እስቴት፣ ሰፊ አረንጓዴ ሁኔታ እና ከፍ ያለ ሕይወት ጥራት ጋሪ ያደርጋቸዋል።",
    },
    communityStats: [
      { label: { he: "אוכלוסיית הקהילה", en: "Community population", am: "የማህበረሰብ ህዝብ" }, value: "~1,000" },
      { label: { he: "אחוז מהעיר", en: "Share of city", am: "ከከተማ ድርሻ" }, value: "~7%" },
      { label: { he: "שכונות עיקריות", en: "Main neighbourhoods", am: "ዋና ሰፈሮች" }, value: "מרכז" },
      { label: { he: "שירותי קהילה", en: "Community services", am: "የማህበረሰብ አገልግሎቶች" }, value: "ENP" },
    ],
  },
];

const BY_SLUG = new Map<string, City>(CITIES.map((c) => [c.slug, c]));

export function findCityBySlug(slug: string): City | undefined {
  return BY_SLUG.get(slug);
}

export function cityName(city: City, locale: Locale): string {
  return city.names[locale] ?? city.names.he;
}

export function cityOverview(city: City, locale: Locale): string {
  return city.overview[locale] ?? city.overview.he;
}

export const CITY_PATH_PREFIX = "/cities";

export function cityPath(locale: Locale, slug: string): string {
  return `/${locale}${CITY_PATH_PREFIX}/${slug}`;
}
