// Ethiopian-Israeli wedding & henna planning guide (TED-143).
//
// ── Sourcing note — read before editing ────────────────────────────────────
//
// The anchor source is a peer-reviewed study of exactly this subject:
// רחל שרעבי, "היבטים משפחתיים בטקסי הנישואים של יהודי אתיופיה", פעמים 141
// (מכון בן-צבי), pp. 105–137 — ~30 interviewees (including kesim), plus
// direct observation at weddings in Israeli event halls. It separates "in
// Ethiopia" from "in Israel today" throughout, which is why this guide can.
//
// THE ONE THING TO GET RIGHT: two different vocabularies get conflated all
// over the web. The Beta Israel (Ethiopian-Jewish) sequence uses kal kidan,
// ij menshiya, macet, keshera, haftat, gurshit, kemis, netela, wol. The words
// melse, telosh, shimagile and gursha belong to the wider — largely Orthodox
// Christian — habesha wedding vocabulary, and are documented only in
// commercial wedding blogs and diaspora sites. Sharabi's study of Jewish
// weddings never uses them. So they live in a SEPARATE, explicitly labelled
// terms section here, never presented as Beta Israel stages.
//
// Claims deliberately NOT made, because the sources say otherwise or say
// nothing (each of these is an easy thing to get wrong):
//  - No shekel figures. Guest COUNTS are documented; costs are not, anywhere.
//  - Not "guests expect injera and doro wat at the hall". Sharabi's direct
//    observation is the opposite: Ethiopian food has left the hall menu and
//    Israeli catering is served. Traditional food is at the henna and at the
//    post-wedding home/tent days.
//  - Not "the kes can marry you". Only a rabbi, or a kes ordained by the
//    Chief Rabbinate, may perform the kiddushin. The 2018 government
//    decision did not change that. See /heritage/marriage.
//  - Not "the coffee ceremony is part of the wedding" — no source documents
//    buna as part of the Ethiopian-Israeli wedding or henna.
//  - Not "Ethiopian henna is henna" — in Ethiopia the paste came from the
//    gurshit tuber; the switch to real henna leaves happened in Israel.
//  - The keshera is presented as historic and now rare, not as a to-do item.
//
// Ge'ez spellings are given ONLY for terms whose script could be verified.
// The Beta Israel terms are vocalised in Hebrew in the source and are left
// transliterated in every locale rather than guessed at in Ge'ez.
//
// HE is the source-of-truth locale. Server-only module (ADR-020) — the
// publication date lives in the route, because `meta` cannot import this.

import type { Locale } from "../i18n/config";

export interface WeddingStage {
  id: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
  /** When it happens, relative to the wedding. */
  timing: Record<Locale, string>;
  /** Locale-relative internal path, e.g. "/heritage/marriage". */
  internalPath?: string;
  internalLabel?: Record<Locale, string>;
}

export interface WeddingTerm {
  /** Hebrew transliteration — the form the anchor source uses. */
  term: Record<Locale, string>;
  /** Ge'ez script, only where it could be verified. */
  geez?: string;
  meaning: Record<Locale, string>;
}

export interface WeddingFaqItem {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export interface WeddingSource {
  name: Record<Locale, string>;
  url: string;
}

export const WEDDING_TITLE: Record<Locale, string> = {
  he: "חתונה וחינה אתיופית — מדריך תכנון, שלב אחר שלב",
  en: "The Ethiopian wedding and henna — a stage-by-stage planning guide",
  am: "የኢትዮጵያ ሰርግና ሒና — ደረጃ በደረጃ የዕቅድ መመሪያ",
};

export const WEDDING_SUBTITLE: Record<Locale, string> = {
  he: "מה קורה בכל שלב, מה באמת נהוג בישראל היום, ואיפה מוצאים ספקים — חינה, שמלות הבשה, קייטרינג וצילום. מבוסס על מחקר אקדמי על טקסי הנישואין של יהודי אתיופיה, לא על בלוגים.",
  en: "What happens at each stage, what is actually practised in Israel today, and where to find suppliers — henna, habesha dresses, catering and photography. Based on academic research into Ethiopian-Jewish marriage ceremonies, not on blogs.",
  am: "በእያንዳንዱ ደረጃ ምን እንደሚሆን፣ ዛሬ በእስራኤል በእውነት ምን እንደሚደረግ፣ እና አቅራቢዎችን የት እንደሚያገኙ — ሒና፣ የሐበሻ ቀሚስ፣ የምግብ አገልግሎትና ፎቶግራፍ።",
};

export const WEDDING_BODY: Record<Locale, string> = {
  he: `חתונה אתיופית בישראל היא לא אירוע אחד — היא רצף. הוא מתחיל במפגש בין ההורים, עובר דרך אירוסין בבית הכלה וטקס חינה יומיים לפני, ונמשך ימים אחרי החופה עצמה, בבית המשפחות.

המדריך הזה מתאר את הרצף כפי שהוא מתועד במחקר — כולל מה השתנה מאתיופיה לישראל, ומה נהוג היום ומה כבר לא. חשוב לומר מראש: הנוהג משתנה בין משפחות ובין אזורי מוצא. ההבדל בין משפחות ממוצא גונדר לבין משפחות ממוצא תיגראי הוא לא ניואנס — הוא מופיע כמעט בכל שלב, ותועד ככזה.

ובנוגע לעלויות: לא נמצא שום מקור מתועד למחירים — לא לחינה, לא לשמלות, לא לאולם ולא לימים שאחרי. לכן אין כאן טווחי מחירים. מספרי אורחים, לעומת זאת, כן מתועדים, והם מופיעים בהמשך.`,
  en: `An Ethiopian wedding in Israel is not one event — it is a sequence. It begins with a meeting between the parents, passes through a betrothal at the bride's home and a henna ceremony two days before, and continues for days after the chuppah itself, at the families' homes.

This guide describes that sequence as it is documented in research — including what changed between Ethiopia and Israel, and what is still practised and what is not. One thing to say up front: practice varies between families and between regions of origin. The difference between families of Gondar origin and families of Tigray origin is not a nuance — it shows up at almost every stage, and is documented as such.

On costs: no documented source for prices was found — not for the henna, the dresses, the venue or the days afterwards. So there are no price ranges here. Guest numbers, by contrast, are documented, and they appear below.`,
  am: `በእስራኤል ያለ የኢትዮጵያ ሰርግ አንድ ዝግጅት አይደለም — ተከታታይ ሂደት ነው። በወላጆች መገናኘት ይጀምራል፣ በሙሽራዋ ቤት በሚደረግ እጮኝነትና ከሰርጉ ሁለት ቀን በፊት በሚደረግ የሒና ሥነ ሥርዓት ያልፋል፣ ከሠርጉ በኋላም በቤተሰቦች ቤት ለቀናት ይቀጥላል።

ይህ መመሪያ ይህን ተከታታይ ሂደት በምርምር እንደተመዘገበው ይገልጻል — ከኢትዮጵያ ወደ እስራኤል ምን እንደተለወጠ ጨምሮ። ልማዱ በቤተሰቦችና በትውልድ አካባቢዎች መካከል ይለያያል፤ በጎንደርና በትግራይ ተወላጅ ቤተሰቦች መካከል ያለው ልዩነት በሁሉም ደረጃ ማለት ይቻላል ይታያል።

ስለ ወጪዎች፡ ለሒና፣ ለቀሚሶች፣ ለአዳራሽ ወይም ከሰርግ በኋላ ላሉት ቀናት የተመዘገበ የዋጋ ምንጭ አልተገኘም። ስለዚህ እዚህ የዋጋ ክልሎች የሉም። የእንግዶች ቁጥር ግን ተመዝግቧል፣ ከዚህ በታች ይገኛል።`,
};

export const WEDDING_STAGES: WeddingStage[] = [
  {
    id: "shlichim",
    timing: {
      he: "לפני הכול",
      en: "Before everything",
      am: "ከሁሉም በፊት",
    },
    title: {
      he: "הבקשה, השליחים ובדיקת הדורות",
      en: "The request, the emissaries and the generation check",
      am: "ጥያቄው፣ መልእክተኞቹና የትውልድ ምርመራ",
    },
    detail: {
      he: "באתיופיה, אבי החתן היה שולח מכובדים מכפרו לבקש את ידה של הכלה מהוריה. אבי הכלה לא ענה מיד — תשובה מיידית נחשבה חוסר כבוד, והשהות שימשה אותו כדי לברר על משפחת החתן דרך שליחים משלו. גם היום, אף שבני הזוג בוחרים זה בזה, עדיין נהוג שאבי החתן מגיע לבית הורי הכלה ומבקש את ידה. לפני הכול נבדקת הקרבה המשפחתית: קרובים עד שבעה דורות נחשבו אח ואחות, ונישואין ביניהם נאסרו. הכלל הזה עדיין חי — צעירים מתחתנים היום במרחק חמישה-שישה דורות, ובני תיגראי אף בארבעה, בעוד שהזקנים מבקשים לשמור על שבעה. זה ויכוח בין-דורי אמיתי, לא פורמליות.",
      en: "In Ethiopia, the groom's father sent respected men from his village to ask the bride's parents for her hand. Her father did not answer immediately — an immediate answer was considered disrespectful, and the interval let him check the groom's family through emissaries of his own. Today, although the couple choose each other, it is still customary for the groom's father to come to the bride's parents' home and ask for her hand. Before anything else, family proximity is checked: relatives up to seven generations counted as brother and sister, and marriage between them was forbidden. That rule is still live — young people today marry at five or six generations' distance, and those of Tigray origin at four, while the elders want the seven kept. It is a genuine generational argument, not a formality.",
      am: "በኢትዮጵያ የሙሽራው አባት ከመንደሩ የተከበሩ ሰዎችን ወደ ሙሽራዋ ወላጆች ይልክ ነበር። የሙሽራዋ አባት ወዲያውኑ አይመልስም ነበር — ወዲያውኑ መመለስ አክብሮት እንደሌለው ይቆጠር ነበር። ዛሬም ቢሆን ጥንዶቹ እርስ በርስ ቢመራረጡም፣ የሙሽራው አባት ወደ ሙሽራዋ ወላጆች ቤት ሄዶ እጇን መጠየቁ ልማድ ነው። ከሁሉ በፊት የዝምድና ርቀት ይመረመራል፡ እስከ ሰባት ትውልድ ያሉ ዘመዶች እንደ ወንድምና እህት ይቆጠሩ ነበር። ዛሬ ወጣቶች በአምስት-ስድስት ትውልድ ርቀት፣ የትግራይ ተወላጆችም በአራት ይጋባሉ።",
    },
  },
  {
    id: "ij-menshiya",
    timing: {
      he: "עם ההסכמה",
      en: "On agreement",
      am: "ስምምነት ሲደረግ",
    },
    title: {
      he: "איג' מנשייה — הסכם הכסף בין המשפחות",
      en: "Ij menshiya — the money agreement between the families",
      am: "ኢጅ መንሺያ — በቤተሰቦች መካከል የገንዘብ ስምምነት",
    },
    detail: {
      he: "עם ההסכמה, אבי החתן נותן לאבי הכלה סכום כסף — בפני עדים משני הצדדים — שמסמן את חתימת ההסכם. באתיופיה, הפרת ההסכם גררה קנס כבד שקבעו זקני הכפר. הנוהג הזה שרד את העלייה: גם בישראל הורי החתן מגיעים לבית הורי הכלה ונותנים סכום כסף כמו באתיופיה. התפקיד שלו השתנה — הוא כבר לא קונה הסכמה, אלא יוצר הסכם בין ההורים שמעניק תוקף לבחירה של בני הזוג עצמם, וזה גם המעמד שבו שתי המשפחות נפגשות לראשונה.",
      en: "Once the families agree, the groom's father gives the bride's father a sum of money — before witnesses from both sides — marking the sealing of the agreement. In Ethiopia, breaking it meant a heavy fine set by the village elders. The custom survived the aliyah: in Israel too, the groom's parents come to the bride's parents' home and give a sum of money as in Ethiopia. Its role has changed — it no longer buys consent, it creates an agreement between the parents that legitimises the couple's own choice, and it is the occasion on which the two families first meet.",
      am: "ስምምነት ሲደረግ የሙሽራው አባት ለሙሽራዋ አባት ከሁለቱም ወገን ምስክሮች ፊት የተወሰነ ገንዘብ ይሰጣል፤ ይህም ስምምነቱ መታተሙን ያመለክታል። በኢትዮጵያ ስምምነቱን ማፍረስ በመንደሩ ሽማግሌዎች የሚወሰን ከባድ ቅጣት ያስከትል ነበር። ልማዱ በእስራኤልም ቀጥሏል፤ ሚናው ግን ተለውጧል — የጥንዶቹን ምርጫ የሚያጸና በወላጆች መካከል ያለ ስምምነት ነው፣ እና ሁለቱ ቤተሰቦች ለመጀመሪያ ጊዜ የሚገናኙበት አጋጣሚ ነው።",
    },
  },
  {
    id: "kal-kidan",
    timing: {
      he: "כמה חודשים לפני",
      en: "A few months before",
      am: "ከጥቂት ወራት በፊት",
    },
    title: {
      he: "קאל קידאן — האירוסין בבית הכלה",
      en: "Kal kidan — the betrothal at the bride's home",
      am: "ቃል ኪዳን — በሙሽራዋ ቤት የሚደረግ እጮኝነት",
    },
    detail: {
      he: "כמה חודשים אחרי מפגש ההורים, הורי הכלה מארחים את טקס האירוסין בביתם. באתיופיה זה היה מעמד גדול עם קרובים ונכבדי הכפר: אבי החתן נתן נעליים, בגדים ותכשיטים לכלה — עגילים, צמידי זהב לידיים ולרגליים, ושרשרת ארוכה עם תליון מטבע כסף שענדה עד החתונה, כדי לסמן בפומבי את מעמדה. הורי הכלה השיבו בבגדים ובבעלי חיים לחתן — חליפין הדדיים ומכוונים לשוויון, שנקראו מאצ'ת, כדי שלזוג יהיו רכוש ופרנסה. באותו מעמד נקבע גם מועד החתונה. בישראל השלב הזה שרד — במשפחות ממוצא גונדר כמעט במלואו, ובאזורי מוצא אחרים בשינויים. החתן נוכח היום, מביא בגדים ותכשיטים, אבל בדרך כלל הכלה היא שבוחרת אותם. הורי הכלה מזמינים קייס לברך את בני הזוג, ואחר כך אוכל מסורתי, מוזיקה באמהרית או בתיגרינית וריקודים.",
      en: "A few months after the parents' meeting, the bride's parents host the betrothal at their home. In Ethiopia it was a large occasion with relatives and village notables: the groom's father gave shoes, clothing and jewellery for the bride — earrings, gold bracelets for hands and feet, and a long necklace with a silver-coin pendant she wore until the wedding, publicly marking her status. Her parents reciprocated with clothing and livestock for the groom — a deliberately equal exchange called macet, so the couple would have property and a livelihood. The wedding date was fixed at the same event. In Israel the stage survived — almost in full among families of Gondar origin, in modified form elsewhere. The groom is present today and brings clothes and jewellery, but usually the bride chooses them. The bride's parents invite a kes to bless the couple; then traditional food, music in Amharic or Tigrinya, and dancing.",
      am: "ከወላጆች መገናኘት ከጥቂት ወራት በኋላ የሙሽራዋ ወላጆች የእጮኝነት ሥነ ሥርዓቱን በቤታቸው ያዘጋጃሉ። በኢትዮጵያ የሙሽራው አባት ለሙሽራዋ ጫማ፣ ልብስና ጌጣጌጥ ይሰጥ ነበር፤ የሙሽራዋ ወላጆችም ለሙሽራው ልብስና እንስሳት ይመልሱ ነበር — ማጨት የሚባል እኩል የሆነ ልውውጥ። የሰርጉ ቀንም በዚያው ይወሰን ነበር። በእስራኤል ይህ ደረጃ ቀጥሏል — በጎንደር ተወላጅ ቤተሰቦች ዘንድ ሙሉ በሙሉ ማለት ይቻላል። ዛሬ ሙሽራው ይገኛል፣ ልብስና ጌጣጌጥ ያመጣል፣ ብዙ ጊዜ ግን ሙሽራዋ ትመርጣቸዋለች። የሙሽራዋ ወላጆች ጥንዶቹን እንዲባርክ ቄስ ይጋብዛሉ።",
    },
  },
  {
    id: "henna",
    timing: {
      he: "יומיים לפני החתונה",
      en: "Two days before the wedding",
      am: "ከሰርጉ ሁለት ቀን በፊት",
    },
    title: {
      he: "טקס החינה — ולמה הוא שונה מהחינה שאתם מכירים",
      en: "The henna ceremony — and why it differs from the henna you know",
      am: "የሒና ሥነ ሥርዓት — ከምታውቁት ሒና ለምን እንደሚለይ",
    },
    detail: {
      he: "זה השלב שבו המסורת האתיופית חיה היום — ולעיתים קרובות יותר מאשר בחופה עצמה. שלוש נקודות שכדאי לדעת, כי הן שונות מהחינה התימנית או המרוקאית שרוב הישראלים מכירים. ראשית, החומר: באתיופיה המשחה כלל לא הופקה מעלי שיח החינה, אלא מפקעת של צמח בשם גוּרְשִׁיט — פקעות אדומות הדומות לתפוחי אדמה. שלב ההכנה נקרא אִינְסוֹסִילֶה, והמקורות עצמם חלוקים לגביו: יש שתיארו קילוף, בישול והטבלת ציפורני הידיים והרגליים, ויש שתיארו גירוד, ייבוש בשמש עד להאדמה, ועירוב עם לימון. רק בישראל, במגע עם יוצאי מרוקו ותימן, הוחלפה הפקעת בעלי חינה אמיתיים. שנית, מי: באתיופיה החינה הייתה של הכלה בלבד, כי המעבר היה משמעותי הרבה יותר עבורה. בישראל היא הפכה משותפת לכלה ולחתן. שלישית, מתי: באתיופיה יום אחד לפני החתונה; בישראל יומיים לפני — בכוונה, כדי לתת למשפחות לנוח לפני החתונה. בשנים הראשונות אחרי העלייה החינה לא נערכה כלל, כי ימי החגיגה כווצו כדי לא להפסיד ימי עבודה. היא חזרה מאז, ונהוגה במיוחד אצל זוגות ממוצא תיגראי. האוכל, הלבוש והמוזיקה בטקס הם אתיופיים מסורתיים, והקייס מברך את החתן, הכלה והאורחים.",
      en: "This is the stage where the tradition actually lives today — often more than the chuppah itself. Three things worth knowing, because they differ from the Yemenite or Moroccan henna most Israelis know. First, the substance: in Ethiopia the paste was not made from henna-shrub leaves at all, but from the tuber of a plant called gurshit — red tubers resembling potatoes. The preparation stage was called insosile, and the sources themselves differ on it: some described peeling, boiling and dipping fingernails and toenails; others grating, drying in the sun until it reddened, and mixing with lemon. Only in Israel, through contact with Moroccan and Yemenite Israelis, was the tuber replaced with real henna leaves. Second, who: in Ethiopia the henna was for the bride alone, because the transition was far more significant for her. In Israel it became joint for bride and groom. Third, when: in Ethiopia one day before the wedding; in Israel two days before — deliberately, to let the families rest before the wedding. In the first years after the aliyah the henna was not held at all, because the days of celebration were compressed to avoid lost work days. It has since returned, and is practised especially by couples of Tigray origin. The food, dress and music at the ceremony are traditional Ethiopian, and the kes blesses the couple and their guests.",
      am: "ወጉ ዛሬ በእውነት የሚኖርበት ደረጃ ይህ ነው — ብዙ ጊዜ ከሠርጉ ራሱ በላይ። ሦስት ነጥቦች፡ በመጀመሪያ ንጥረ ነገሩ፡ በኢትዮጵያ ቅባቱ ከሒና ቅጠል ሳይሆን ጉርሺት ከሚባል ተክል ሥር ይሠራ ነበር። የዝግጅቱ ደረጃ ኢንሶሶሌ ይባል ነበር። በእስራኤል ብቻ ነው ከሞሮኮና ከየመን ተወላጆች ጋር በመገናኘት በእውነተኛ የሒና ቅጠል የተተካው። ሁለተኛ ማን፡ በኢትዮጵያ ለሙሽራዋ ብቻ ነበር፤ በእስራኤል የጋራ ሆኗል። ሦስተኛ መቼ፡ በኢትዮጵያ ከሰርጉ አንድ ቀን በፊት፤ በእስራኤል ሁለት ቀን በፊት — ቤተሰቦች እንዲያርፉ ሆን ተብሎ። ምግቡ፣ አለባበሱና ሙዚቃው ባህላዊ ኢትዮጵያዊ ናቸው፣ ቄሱም ጥንዶቹንና እንግዶቹን ይባርካል።",
    },
  },
  {
    id: "chuppah",
    timing: {
      he: "יום החתונה — כמעט תמיד יום חמישי",
      en: "The wedding day — almost always a Thursday",
      am: "የሰርግ ቀን — ሁልጊዜም ማለት ይቻላል ሐሙስ",
    },
    title: {
      he: "החופה — ומי באמת מחתן",
      en: "The chuppah — and who actually officiates",
      am: "ሠርጉ — በእውነት ማን ያጋባል",
    },
    detail: {
      he: "כמעט כל החתונות נערכות ביום חמישי, כי החגיגה נמשכת עד הבוקר שלמחרת ויום שישי אינו יום עבודה; הקיץ הוא העונה המועדפת, ורוב החתונות נערכות במרכז הארץ מפני שהוא נגיש לקרובים הפזורים בכל הארץ. לגבי מי מחתן — זו נקודה שחשוב לא לטעות בה: בישראל רק רב, או קייס שהוסמך על ידי הרבנות הראשית, רשאי לערוך את הקידושין. עם זאת, למשפחות חשוב לשתף את הקייס בחופה, והוא מצטרף לתפילות ולברכות. נישואי קייס בלבד, שהיו נפוצים בשנות השמונים, אינם מוכרים על ידי הממסד הדתי והמדינה. הלבוש באולם מעורב: נשים מבוגרות לובשות שמלה אתיופית לבנה (טֶלֶף) עם שרוולים רקומים ונֶטֶלָה לבנה מעליה, וזקנים נושאים מקל עץ מגולף שמסמן במסורת האתיופית אדם שיש לכבדו. שושבינות הכלה מותאמות בצבע ובמספר לשושבינים, בין שתיים לארבע.",
      en: "Almost every wedding is held on a Thursday, because the celebration runs until the following morning and Friday is not a work day; summer is the preferred season, and most weddings are held in the centre of the country because it is reachable for relatives dispersed nationwide. As for who officiates — this is the point not to get wrong: in Israel only a rabbi, or a kes ordained by the Chief Rabbinate, may perform the kiddushin. Even so, it matters to families to include the kes in the chuppah, and he joins the prayers and blessings. Kes-only marriages, common in the 1980s, are not recognised by the religious establishment or the state. Dress at the venue is mixed: older women wear a white Ethiopian dress (telef) with embroidered sleeves and a white netela over it, and elders carry a carved wooden staff, which in Ethiopian tradition marks a person to be honoured. The bridesmaids are matched in colour and number to the groomsmen, between two and four.",
      am: "ሁሉም ማለት ይቻላል ሰርጎች ሐሙስ ይደረጋሉ፤ ክብረ በዓሉ እስከ ማግስቱ ጠዋት ስለሚቀጥልና ዓርብ የሥራ ቀን ስላልሆነ። ማን እንደሚያጋባ — ይህ ስህተት ሊሠራበት የማይገባ ነጥብ ነው፡ በእስራኤል ረቢ ብቻ፣ ወይም በዋና ረቢነት የተሾመ ቄስ ብቻ ኪዱሺንን ማከናወን ይችላል። ሆኖም ቤተሰቦች ቄሱን በሠርጉ ማካተት ይፈልጋሉ፣ በጸሎትና በበረከት ይሳተፋል። በ1980ዎቹ የተለመዱት በቄስ ብቻ የተደረጉ ጋብቻዎች በመንግሥት አይታወቁም። አለባበሱ ቅልቅል ነው፡ አረጋውያን ሴቶች ነጭ ጠለፍ ከነጠላ ጋር ይለብሳሉ።",
    },
    internalPath: "/heritage/marriage",
    internalLabel: {
      he: "מדריך רישום נישואין ברבנות — שלב אחר שלב",
      en: "The Rabbanut marriage-registration guide — step by step",
      am: "የረቢነት የጋብቻ ምዝገባ መመሪያ — ደረጃ በደረጃ",
    },
  },
  {
    id: "after",
    timing: {
      he: "מיום שישי ועד יום שני",
      en: "From Friday to Monday",
      am: "ከዓርብ እስከ ሰኞ",
    },
    title: {
      he: "הימים שאחרי — קבלות הפנים ושבת חתן",
      en: "The days after — the receptions and Shabbat Chatan",
      am: "ከሠርግ በኋላ ያሉት ቀናት",
    },
    detail: {
      he: "החגיגה של בני הזוג נגמרת למחרת, אבל של המשפחות ממשיכה. את האירועים האלה מכנים היום \"קבלת פנים\" — מונח שמבטא בעצמו את הרצון להמשיך את המסורת גם בצורה שהשתנתה. ביום שישי, עד כניסת השבת, החגיגה נערכת באוהל גדול בחצר בית הכלה או במועדון שכונתי, עם מוזיקה באמהרית ובתיגרינית ואוכל מסורתי. בשבת נערכת שבת חתן — מנהג שיוצאי אתיופיה אימצו מהחברה הדתית בישראל — שבה מתכנסים כל הקרובים ומעניקים מתנות; יוצאי תיגראי אימצו גם את אירוח משפחת הכלה בבית משפחת החתן באותה שבת. ממוצאי שבת החגיגה נמשכת בבית משפחת הכלה עד יום שני. חלוקת האחריות הכספית מתועדת במפורש: בני הזוג אחראים לטקס החתונה ומממנים אותו, וההורים אחראים לאירוח הקרובים והאורחים בימים שאחרי, לפי יכולתם הכלכלית.",
      en: "The celebration ends for the couple the next day, but continues for the families. These events are now called kabalat panim — a term that itself expresses the wish to continue the tradition even in an altered form. On Friday, until Shabbat comes in, the celebration is held in a large tent in the yard of the bride's home or at the neighbourhood club, with music in Amharic and Tigrinya and traditional food. On Shabbat comes Shabbat Chatan — a practice Ethiopian-Israelis adopted from Israeli religious society — where all the relatives gather and give gifts; those of Tigray origin also adopted hosting the bride's family at the groom's family's home on that Shabbat. From Motza'ei Shabbat the celebration continues at the bride's family's home until Monday. The division of financial responsibility is explicitly documented: the couple are responsible for the wedding ceremony and finance it, while the parents are responsible for hosting relatives and guests in the days afterwards, according to their means.",
      am: "የጥንዶቹ ክብረ በዓል በማግስቱ ያበቃል፣ የቤተሰቦቹ ግን ይቀጥላል። እነዚህ ዝግጅቶች ዛሬ «ቀባላት ፓኒም» ይባላሉ። ዓርብ እስከ ሰንበት መግቢያ ድረስ ክብረ በዓሉ በሙሽራዋ ቤት ግቢ በተተከለ ትልቅ ድንኳን ወይም በሰፈር ክበብ ይደረጋል፣ በአማርኛና በትግርኛ ሙዚቃና ባህላዊ ምግብ። በሰንበት «ሻባት ሓታን» ይደረጋል — ኢትዮጵያውያን-እስራኤላውያን ከእስራኤል ሃይማኖተኛ ማህበረሰብ የወሰዱት ልማድ። ከሰንበት መውጫ ጀምሮ ክብረ በዓሉ በሙሽራዋ ቤተሰብ ቤት እስከ ሰኞ ይቀጥላል። የገንዘብ ኃላፊነት ክፍፍል፡ ጥንዶቹ የሰርጉን ሥነ ሥርዓት ይሸፍናሉ፣ ወላጆች ደግሞ ከሰርግ በኋላ ያሉትን ቀናት እንግዳ ተቀባይነት ይሸፍናሉ።",
    },
  },
];

// ── terms ──────────────────────────────────────────────────────────────────
//
// Two separate lists, deliberately. Merging them is the single most common
// error in web content on this subject — see the header note.

export const BETA_ISRAEL_TERMS: WeddingTerm[] = [
  {
    term: {
      he: "איג' מנשייה (ij menshiya)",
      en: "Ij menshiya",
      am: "ኢጅ መንሺያ (ij menshiya)",
    },
    meaning: {
      he: "סכום הכסף שאבי החתן נותן לאבי הכלה בפני עדים, כחתימה על ההסכם בין המשפחות.",
      en: "The sum the groom's father gives the bride's father before witnesses, sealing the agreement between the families.",
      am: "የሙሽራው አባት ለሙሽራዋ አባት በምስክሮች ፊት የሚሰጠው ገንዘብ፣ በቤተሰቦች መካከል ያለውን ስምምነት ማተሚያ።",
    },
  },
  {
    term: { he: "קאל קידאן (kal kidan)", en: "Kal kidan", am: "ቃል ኪዳን (kal kidan)" },
    meaning: {
      he: "טקס האירוסין בבית הכלה, שבו נקבע גם מועד החתונה.",
      en: "The betrothal ceremony at the bride's home, at which the wedding date is also set.",
      am: "በሙሽራዋ ቤት የሚደረግ የእጮኝነት ሥነ ሥርዓት፤ የሰርጉ ቀንም እዚያ ይወሰናል።",
    },
  },
  {
    term: { he: "מאצ'ת (macet)", en: "Macet", am: "ማጨት (macet)" },
    meaning: {
      he: "החליפין ההדדיים בין המשפחות באירוסין — מכוונים לשוויון, כדי שלזוג יהיו רכוש ופרנסה.",
      en: "The reciprocal exchange between the families at the betrothal — deliberately equal, so the couple would have property and a livelihood.",
      am: "በእጮኝነት ጊዜ በቤተሰቦች መካከል የሚደረግ የጋራ ልውውጥ፤ ጥንዶቹ ንብረትና መተዳደሪያ እንዲኖራቸው።",
    },
  },
  {
    term: { he: "גוּרְשִׁיט (gurshit)", en: "Gurshit", am: "ጉርሺት (gurshit)" },
    meaning: {
      he: "הפקעת האדומה שממנה הופקה משחת החינה באתיופיה — לא שיח החינה. שלב ההכנה נקרא אינסוסילה.",
      en: "The red tuber the henna paste was made from in Ethiopia — not the henna shrub. The preparation stage was called insosile.",
      am: "በኢትዮጵያ የሒና ቅባት ይሠራበት የነበረው ቀይ ሥር — የሒና ተክል አይደለም። የዝግጅቱ ደረጃ ኢንሶሶሌ ይባል ነበር።",
    },
  },
  {
    term: { he: "קֶשֶׁרָה (keshera)", en: "Keshera", am: "ቀሸራ (keshera)" },
    meaning: {
      he: "סרט אדום-לבן שנקשר למצח החתן. הפירושים חלוקים: טוהר, או — לפי מסורת תיגראי — הקשת אחרי המבול. היום רק מעטים עדיין נוהגים בו.",
      en: "A red-and-white band tied to the groom's forehead. Interpretations differ: purity, or — in the Tigray tradition — the rainbow after the Flood. Today only a few still practise it.",
      am: "በሙሽራው ግንባር ላይ የሚታሠር ቀይና ነጭ ማሰሪያ። ትርጓሜዎች ይለያያሉ። ዛሬ ጥቂቶች ብቻ ይለማመዱታል።",
    },
  },
  {
    term: { he: "הָפְתָת (haftat)", en: "Haftat", am: "ሃፍታት (haftat)" },
    meaning: {
      he: "היום השביעי, שבו הקייס התיר את הקשרה מהמצח וקשר אותה לעמוד המרכזי של הבית כמזכרת.",
      en: "The seventh day, on which the kes removed the keshera from the forehead and tied it to the house's central pillar as a keepsake.",
      am: "ሰባተኛው ቀን፤ ቄሱ ቀሸራውን ከግንባሩ አውልቆ በቤቱ ማዕከላዊ ምሰሶ ላይ እንደ መታሰቢያ ያስረው ነበር።",
    },
  },
  {
    term: { he: "וֹול (wol)", en: "Wol", am: "ዎል (wol)" },
    meaning: {
      he: "שטר הנישואין באתיופיה — המקבילה לכתובה. נכתב בשלושה עותקים ונחתם בידי שני האבות, החתן, הקייס ושלושה עדים.",
      en: "The marriage contract in Ethiopia — the parallel to a ketubah. Written in three copies and signed by both fathers, the groom, the kes and three witnesses.",
      am: "በኢትዮጵያ የጋብቻ ውል — የኬቱባ አቻ። በሦስት ቅጂ ተጽፎ በሁለቱ አባቶች፣ በሙሽራው፣ በቄሱና በሦስት ምስክሮች ይፈረም ነበር።",
    },
  },
  {
    term: { he: "טֶלֶף (telef)", en: "Telef", am: "ጠለፍ (telef)" },
    meaning: {
      he: "השמלה האתיופית הלבנה עם השרוולים הרקומים בצבע, שנשים מבוגרות לובשות בחתונה, ומעליה נטלה לבנה.",
      en: "The white Ethiopian dress with colour-embroidered sleeves that older women wear at the wedding, with a white netela over it.",
      am: "አረጋውያን ሴቶች በሰርግ ላይ የሚለብሱት በቀለም የተጠለፈ እጅጌ ያለው ነጭ የኢትዮጵያ ቀሚስ፣ ከላዩ ነጭ ነጠላ።",
    },
  },
];

export const HABESHA_TERMS: WeddingTerm[] = [
  {
    term: { he: "מלסה / מלס", en: "Melse", am: "መልስ" },
    geez: "መልስ",
    meaning: {
      he: "קבלת פנים יום עד שלושה אחרי החתונה, בדרך כלל מטעם משפחת הכלה, שבה בני הזוג לובשים לבוש מסורתי וכאבה. מונח נפוץ בקהילה האתיופית הרחבה; הוא אינו מופיע במחקר על טקסי הנישואין של יהודי אתיופיה.",
      en: "A reception one to three days after the wedding, usually hosted by the bride's side, at which the couple wear traditional dress and the kaba cape. A widespread term in the broader Ethiopian community; it does not appear in the research on Ethiopian-Jewish marriage ceremonies.",
      am: "ከሰርግ ከአንድ እስከ ሦስት ቀን በኋላ የሚደረግ አቀባበል፣ ብዙውን ጊዜ በሙሽራዋ ወገን። በኢትዮጵያ አይሁዶች የጋብቻ ሥነ ሥርዓት ጥናት ውስጥ አይገኝም።",
    },
  },
  {
    term: { he: "טלוש", en: "Telosh", am: "ጥሎሽ" },
    geez: "ጥሎሽ",
    meaning: {
      he: "טקס מתנות בבית משפחת הכלה, יומיים לפני החתונה, שבו משפחת החתן מעניקה תכשיטים, זהב ובגדים.",
      en: "A gift ceremony at the bride's family home two days before the wedding, at which the groom's family present jewellery, gold and clothing.",
      am: "ከሰርጉ ሁለት ቀን በፊት በሙሽራዋ ቤተሰብ ቤት የሚደረግ የስጦታ ሥነ ሥርዓት።",
    },
  },
  {
    term: { he: "שמגלה", en: "Shimagile", am: "ሽማግሌ" },
    geez: "ሽማግሌ",
    meaning: {
      he: "\"זקן\" — הזקנים ששולחת משפחת החתן לבקש את יד הכלה. במסורת של ביתא ישראל המקורות מדברים על \"מכובדים\" או \"שליחים\", לא על שמגלה.",
      en: "\"Elder\" — the elders the groom's family sends to ask for the bride's hand. In the Beta Israel tradition the sources speak of \"respected men\" or \"emissaries\", not shimagile.",
      am: "«ሽማግሌ» — የሙሽራው ቤተሰብ የሙሽራዋን እጅ ለመጠየቅ የሚልካቸው ሽማግሌዎች።",
    },
  },
  {
    term: { he: "גוּרְשָׁה", en: "Gursha", am: "ጉርሻ" },
    geez: "ጉርሻ",
    meaning: {
      he: "\"פה מלא\" — הגשת נגיס אינג'רה עטוף בתבשיל ישירות לפיו של אדם אחר, כמחוות כבוד, אהבה והכרת תודה. נהוג במגוון אירועים, ובכללם חתונות.",
      en: "\"A mouthful\" — feeding another person a morsel of injera wrapped around stew, as a gesture of honour, love and gratitude. Practised at many occasions, weddings among them.",
      am: "«ጉርሻ» — በወጥ የተጠቀለለ እንጀራ በእጅ ለሌላ ሰው ማጉረስ፤ የክብር፣ የፍቅርና የምስጋና ምልክት።",
    },
  },
  {
    term: { he: "שוּרוּבָּה", en: "Shuruba", am: "ሹሩባ" },
    geez: "ሹሩባ",
    meaning: {
      he: "קליעה מסורתית — חמש עד שבע צמות עבות לסירוגין עם דקות. תסרוקות באתיופיה סימנו דת, גיל, מוצא ומעמד משפחתי.",
      en: "Traditional braiding — five to seven thick cornrows alternating with thin ones. Hairstyles in Ethiopia signalled religion, age, ethnicity and marital status.",
      am: "ባህላዊ ሽርባ — ከአምስት እስከ ሰባት ወፍራም ሹሩባዎች ከቀጫጭኖች ጋር ተፈራርቀው።",
    },
  },
  {
    term: { he: "שמלת הבשה (habesha kemis)", en: "Habesha kemis", am: "የሀበሻ ቀሚስ" },
    geez: "የሀበሻ ቀሚስ",
    meaning: {
      he: "שמלת כותנה ארוכה בעבודת יד. הפס הרקום בשוליים, בשרוולים ובצוואר נקרא טִיבֶּבּ, והמוטיבים שלו שונים בין אזורים — גונדר, גוג'אם, וולו ושווה.",
      en: "A long handwoven cotton dress. The embroidered band at hem, sleeves and neckline is the tibeb, and its motifs differ by region — Gondar, Gojjam, Wollo and Shewa.",
      am: "ረጅም በእጅ የተሠራ የጥጥ ቀሚስ። በጫፉ፣ በእጅጌውና በአንገቱ ላይ ያለው የተጠለፈ መስመር ጥበብ ይባላል።",
    },
  },
  {
    term: { he: "נֶטֶלָה (netela)", en: "Netela", am: "ነጠላ" },
    geez: "ነጠላ",
    meaning: {
      he: "צעיף כותנה דק שמונח על הכתפיים מעל השמלה. באתיופיה כיסה גם את ראש הכלה, כדי שהחתן לא יראה את פניה.",
      en: "A light cotton shawl draped over the shoulders above the dress. In Ethiopia it also covered the bride's head, so the groom could not see her face.",
      am: "ከቀሚሱ በላይ በትከሻ ላይ የሚጣል ቀጭን የጥጥ ሸማ። በኢትዮጵያ የሙሽራዋንም ራስ ይሸፍን ነበር።",
    },
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────

export const WEDDING_FAQ: WeddingFaqItem[] = [
  {
    id: "when-henna",
    question: {
      he: "מתי עורכים את החינה?",
      en: "When is the henna held?",
      am: "ሒና መቼ ይደረጋል?",
    },
    answer: {
      he: "בישראל — יומיים לפני החתונה. באתיופיה זה היה יום אחד לפני, והשינוי נעשה בכוונה, כדי לתת למשפחות יום מנוחה לפני החתונה עצמה.",
      en: "In Israel — two days before the wedding. In Ethiopia it was one day before, and the change was deliberate: to give the families a day of rest before the wedding itself.",
      am: "በእስራኤል — ከሰርጉ ሁለት ቀን በፊት። በኢትዮጵያ አንድ ቀን በፊት ነበር፤ ለውጡ ሆን ተብሎ የተደረገ ነው።",
    },
  },
  {
    id: "different-henna",
    question: {
      he: "במה החינה האתיופית שונה מהחינה התימנית או המרוקאית?",
      en: "How does the Ethiopian henna differ from the Yemenite or Moroccan one?",
      am: "የኢትዮጵያ ሒና ከየመንና ከሞሮኮ ሒና በምን ይለያል?",
    },
    answer: {
      he: "בשלושה דברים. החומר — באתיופיה המשחה הופקה מפקעת בשם גורשיט ולא מעלי שיח החינה, והמעבר לחינה אמיתית קרה רק בישראל, במגע עם יוצאי מרוקו ותימן. ההיקף — באתיופיה החינה נמרחה על הציפורניים בלבד, ולא על כפות הידיים. ומי משתתף — באתיופיה הטקס היה של הכלה בלבד; בישראל הוא משותף לכלה ולחתן.",
      en: "In three ways. The substance — in Ethiopia the paste came from a tuber called gurshit, not from henna-shrub leaves, and the switch to real henna happened only in Israel, through contact with Moroccan and Yemenite Israelis. The extent — in Ethiopia it was applied to the nails only, not the palms. And who takes part — in Ethiopia the ceremony was the bride's alone; in Israel it is joint for bride and groom.",
      am: "በሦስት ነገሮች። ንጥረ ነገሩ — በኢትዮጵያ ቅባቱ ጉርሺት ከሚባል ሥር ይሠራ ነበር። መጠኑ — በኢትዮጵያ በጥፍር ላይ ብቻ ይቀባ ነበር። ተሳታፊው — በኢትዮጵያ የሙሽራዋ ብቻ ነበር፤ በእስራኤል የጋራ ነው።",
    },
  },
  {
    id: "guest-count",
    question: {
      he: "כמה אורחים באמת מגיעים?",
      en: "How many guests actually come?",
      am: "በእርግጥ ስንት እንግዶች ይመጣሉ?",
    },
    answer: {
      he: "הרבה יותר ממה שתכננתם. בכתבה מתועד זוג שתכנן כשלוש מאות, הזמין בסוף כשמונה מאות, הזמין אולם ל-550 ועוד 150 ברזרבה — והגיעו כשבע מאות. אבות כלה מדברים על \"אולי חמש מאות ואולי אלף\". הסיבה מבנית: ההזמנה קהילתית ולא אישית, ואישורי הגעה אינם נהוגים — לבקש אישור הגעה נחשב לא מכובד. תכננו לפי זה.",
      en: "Many more than you planned for. One documented couple planned for about three hundred, ended up inviting about eight hundred, booked a venue for 550 with 150 in reserve — and about seven hundred came. Fathers of brides speak of \"maybe five hundred and maybe a thousand\". The reason is structural: the invitation is communal rather than personal, and RSVPs are not customary — asking for confirmation is considered disrespectful. Plan accordingly.",
      am: "ካቀዱት በጣም ብዙ። አንድ የተመዘገበ ጥንድ ሦስት መቶ አቅዶ ስምንት መቶ ጋበዘ፣ አዳራሽ ለ550 ከ150 መጠባበቂያ ጋር ያዘ — ሰባት መቶ ያህል መጡ። የመምጣት ማረጋገጫ መጠየቅ አክብሮት እንደሌለው ይቆጠራል።",
    },
  },
  {
    id: "food",
    question: {
      he: "מגישים אוכל אתיופי בחתונה?",
      en: "Is Ethiopian food served at the wedding?",
      am: "በሰርጉ ላይ የኢትዮጵያ ምግብ ይቀርባል?",
    },
    answer: {
      he: "לרוב לא באולם. תצפיות בחתונות באולמות בישראל מצאו שהאוכל האתיופי ירד מהתפריט של האולם ומוגש אוכל ישראלי. האוכל המסורתי נמצא דווקא בחינה ובימי החגיגה בבית ובאוהל — ושם גם מזמינים קייטרינג אתיופי או אינג'רה בכמויות. אם אתם מחפשים ספק, זה השלב שבו הוא נדרש.",
      en: "Usually not at the venue. Observations at weddings in Israeli halls found that Ethiopian food has left the hall menu and Israeli catering is served. The traditional food is at the henna and at the home-and-tent celebration days — and that is where Ethiopian catering or injera in quantity is actually ordered. If you are looking for a supplier, that is the stage that needs one.",
      am: "ብዙውን ጊዜ በአዳራሹ አይደለም። በእስራኤል አዳራሾች የተደረጉ ምልከታዎች የኢትዮጵያ ምግብ ከአዳራሹ ምናሌ እንደወጣ አግኝተዋል። ባህላዊው ምግብ በሒናና በቤት ክብረ በዓሎች ላይ ነው።",
    },
  },
  {
    id: "kes",
    question: {
      he: "האם הקייס יכול לחתן אותנו?",
      en: "Can the kes marry us?",
      am: "ቄሱ ሊያጋባን ይችላል?",
    },
    answer: {
      he: "רק אם הוסמך לכך על ידי הרבנות הראשית. בישראל רק רב, או קייס מוסמך, רשאי לערוך את הקידושין. נישואי קייס שאינו מוסמך אינם מוכרים על ידי המדינה. בפועל, המתכונת הנפוצה היא חופה ברבנות עם מסדר קידושין מוסמך, כשהקייס נוכח ומשתתף בתפילות ובברכות — וזה מה שחשוב למשפחות. את הליך הרישום עצמו מפרט המדריך שלנו לרישום נישואין.",
      en: "Only if he has been ordained for it by the Chief Rabbinate. In Israel only a rabbi, or an ordained kes, may perform the kiddushin. A marriage by a kes who is not ordained is not recognised by the state. In practice the common arrangement is a Rabbanut chuppah with an ordained officiant, with the kes present and taking part in the prayers and blessings — which is what matters to families. Our marriage-registration guide sets out the registration procedure itself.",
      am: "በዋና ረቢነት ከተሾመ ብቻ። በእስራኤል ረቢ ብቻ ወይም የተሾመ ቄስ ኪዱሺንን ማከናወን ይችላል። ያልተሾመ ቄስ ያጋባው ጋብቻ በመንግሥት አይታወቅም።",
    },
  },
  {
    id: "cost",
    question: {
      he: "כמה זה עולה?",
      en: "How much does it cost?",
      am: "ምን ያህል ያስከፍላል?",
    },
    answer: {
      he: "אין לנו נתון, ולא נמציא אחד. לא נמצא שום מקור מתועד למחירים של חינה, שמלות, אולם או הימים שאחרי. מה שכן מתועד היא חלוקת האחריות: בני הזוג מממנים את טקס החתונה, וההורים אחראים לאירוח בימים שאחריה, לפי יכולתם.",
      en: "We do not have a figure, and we will not invent one. No documented source was found for the price of the henna, the dresses, the venue or the days afterwards. What is documented is the division of responsibility: the couple finance the wedding ceremony, and the parents are responsible for the hosting in the days that follow, according to their means.",
      am: "ቁጥር የለንም፣ አንፈጥርምም። ለሒና፣ ለቀሚሶች፣ ለአዳራሽ ወይም ከሰርግ በኋላ ላሉት ቀናት የተመዘገበ የዋጋ ምንጭ አልተገኘም። የተመዘገበው የኃላፊነት ክፍፍል ነው።",
    },
  },
  {
    id: "day",
    question: {
      he: "באיזה יום בשבוע מתחתנים?",
      en: "Which day of the week do people marry on?",
      am: "በሳምንቱ በየትኛው ቀን ይጋባሉ?",
    },
    answer: {
      he: "כמעט תמיד יום חמישי. החגיגה נמשכת עד הבוקר שלמחרת, ויום שישי אינו יום עבודה — כך שהאורחים יכולים להישאר. הקיץ הוא העונה המועדפת, ורוב החתונות נערכות במרכז הארץ, כי הוא הנגיש ביותר לקרובים מכל הארץ.",
      en: "Almost always a Thursday. The celebration runs until the following morning, and Friday is not a work day — so guests can stay. Summer is the preferred season, and most weddings are held in the centre of the country, because it is the most reachable for relatives from all over.",
      am: "ሁልጊዜም ማለት ይቻላል ሐሙስ። ክብረ በዓሉ እስከ ማግስቱ ጠዋት ይቀጥላል፣ ዓርብም የሥራ ቀን አይደለም። በጋ የተመረጠው ወቅት ነው።",
    },
  },
];

// ── page copy (server-side only — never enters the message bundle) ─────────

export const WEDDING_COPY: Record<string, Record<Locale, string>> = {
  stagesHeading: {
    he: "השלבים, לפי הסדר",
    en: "The stages, in order",
    am: "ደረጃዎቹ በቅደም ተከተል",
  },
  bodyHeading: {
    he: "לפני שמתחילים",
    en: "Before you start",
    am: "ከመጀመርዎ በፊት",
  },
  faqHeading: {
    he: "שאלות שחוזרות",
    en: "Questions that come up",
    am: "ተደጋጋሚ ጥያቄዎች",
  },
  betaIsraelTermsHeading: {
    he: "מונחים מטקסי הנישואין של ביתא ישראל",
    en: "Terms from the Beta Israel marriage ceremonies",
    am: "ከቤታ እስራኤል የጋብቻ ሥነ ሥርዓቶች ቃላት",
  },
  habeshaTermsHeading: {
    he: "מונחים שתשמעו בקהילה האתיופית הרחבה",
    en: "Terms you will hear in the wider Ethiopian community",
    am: "በሰፊው የኢትዮጵያ ማህበረሰብ የሚሰሙ ቃላት",
  },
  habeshaTermsNote: {
    he: "המונחים הבאים שייכים לתרבות החתונה האתיופית הרחבה, לא בהכרח למסורת של ביתא ישראל. תשמעו אותם באירועים, אצל ספקים ובאינטרנט — אבל הם אינם מופיעים במחקר על טקסי הנישואין של יהודי אתיופיה, ולכן הם מוצגים כאן בנפרד ולא כשלבים.",
    en: "The terms below belong to the wider Ethiopian wedding culture, not necessarily to the Beta Israel tradition. You will hear them at events, from suppliers and online — but they do not appear in the research on Ethiopian-Jewish marriage ceremonies, so they are presented here separately rather than as stages.",
    am: "ከዚህ በታች ያሉት ቃላት የሰፊው የኢትዮጵያ የሰርግ ባህል ናቸው፤ የግድ የቤታ እስራኤል ወግ አይደሉም። በዝግጅቶች፣ ከአቅራቢዎችና በመስመር ላይ ይሰሟቸዋል፣ ነገር ግን በኢትዮጵያ አይሁዶች የጋብቻ ሥነ ሥርዓት ጥናት ውስጥ አይገኙም።",
  },
  variationNote: {
    he: "אזור המוצא משנה. משפחות ממוצא גונדר שימרו כמעט את כל רצף האירוסין; החינה נהוגה במיוחד אצל יוצאי תיגראי, שגם נותנים לצבעי הקשרה פירוש אחר — הקשת שאחרי המבול — ומתחתנים במרחק דורות קטן יותר. אם משהו כאן לא מתאים למשפחה שלכם, זה לא בהכרח טעות: זו שונות מתועדת.",
    en: "Region of origin matters. Families of Gondar origin preserved almost the entire betrothal sequence; the henna is practised especially by those of Tigray origin, who also read the keshera colours differently — the rainbow after the Flood — and marry at a smaller generational distance. If something here does not match your family, it is not necessarily wrong: this is documented variation.",
    am: "የትውልድ አካባቢ ይለውጣል። የጎንደር ተወላጅ ቤተሰቦች የእጮኝነቱን ሂደት ሙሉ በሙሉ ማለት ይቻላል ጠብቀዋል፤ ሒና በተለይ በትግራይ ተወላጆች ዘንድ ይለመዳል። እዚህ ያለው ነገር ከቤተሰብዎ ጋር ካልተስማማ የግድ ስህተት አይደለም።",
  },
  suppliersHeading: {
    he: "ספקים לחתונה ולחינה",
    en: "Wedding and henna suppliers",
    am: "የሰርግና የሒና አቅራቢዎች",
  },
  suppliersIntro: {
    he: "ספקי החתונה האתיופית עוברים כמעט אך ורק מפה לאוזן, ואין להם מדריך מקוון. התחלנו אחד. כל עסק ברשימה אומת מול מקור פומבי שלו — אתר, עמוד עסקי פעיל או כתבה שנוקבת בשמו — והמקור ותאריך הבדיקה מופיעים ליד כל רשומה. לא הוספנו עסקים כדי למלא קטגוריה או עיר.",
    en: "Ethiopian wedding suppliers travel almost entirely by word of mouth, and there is no online guide to them. We started one. Every business listed was verified against its own public source — a site, an active business page, or an article naming it — and the source and check date appear beside each entry. We did not add businesses to fill out a category or a city.",
    am: "የኢትዮጵያ የሰርግ አቅራቢዎች ከአፍ ወደ አፍ ብቻ ይተላለፋሉ፣ የመስመር ላይ ማውጫም የላቸውም። እኛ አንዱን ጀመርን። እያንዳንዱ ንግድ በራሱ ይፋዊ ምንጭ ተረጋግጧል፣ ምንጩና የተመረመረበት ቀን ከእያንዳንዱ መዝገብ አጠገብ ይታያሉ።",
  },
  emptyCategory: {
    he: "לא נמצא אף ספק שאפשר לאמת בקטגוריה הזאת. אנחנו לא ממציאים רשומות כדי למלא עמוד — עדיף עמוד ריק על רשימה שנראית טוב. אם אתם מפעילים עסק כזה, או מכירים אחד, הוסיפו אותו והוא ייבדק וייכנס.",
    en: "No supplier in this category could be verified. We do not invent entries to fill a page — an empty page beats a list that merely looks good. If you run such a business, or know one, add it and it will be checked and listed.",
    am: "በዚህ ምድብ ሊረጋገጥ የሚችል አቅራቢ አልተገኘም። ገጽ ለመሙላት መዝገቦችን አንፈጥርም። እንዲህ ያለ ንግድ የሚያንቀሳቅሱ ከሆነ ወይም የሚያውቁ ከሆነ ያክሉት።",
  },
  joinCta: {
    he: "מפעילים עסק לחתונות וחינה אתיופיות?",
    en: "Run a business for Ethiopian weddings and henna?",
    am: "ለኢትዮጵያ ሰርግና ሒና ንግድ ያንቀሳቅሳሉ?",
  },
  joinCtaBody: {
    he: "הוסיפו אותו למדריך. אנחנו בודקים כל פנייה מול מקור פומבי לפני שהיא מתפרסמת, ומפרסמים רק פרטי קשר שהעסק עצמו מפרסם.",
    en: "Add it to the directory. We check every submission against a public source before it is published, and publish only contact details the business itself publishes.",
    am: "ወደ ማውጫው ያክሉት። እያንዳንዱን ማመልከቻ ከመታተሙ በፊት ከይፋዊ ምንጭ ጋር እናረጋግጣለን።",
  },
  joinTitle: {
    he: "הוספת עסק למדריך החתונה והחינה",
    en: "Add a business to the wedding and henna directory",
    am: "ወደ የሰርግና ሒና ማውጫ ንግድ ማከል",
  },
  joinSubtitle: {
    he: "המדריך נבנה מעסקים שאפשר לאמת. מלאו את הפרטים, נבדוק מול מקור פומבי, ונוסיף. הבדיקה היא הסיבה שהמדריך שווה משהו.",
    en: "The directory is built from businesses that can be verified. Fill in the details, we will check against a public source, and add you. The checking is what makes the directory worth anything.",
    am: "ማውጫው ሊረጋገጡ ከሚችሉ ንግዶች ተገንብቷል። ዝርዝሮቹን ይሙሉ፣ ከይፋዊ ምንጭ ጋር እናረጋግጣለን፣ እናከልዎታለን።",
  },
  datedBadge: {
    he: "לאימות",
    en: "Verify",
    am: "ማረጋገጫ ይፈልጋል",
  },
  checkedPrefix: {
    he: "נבדק ב-",
    en: "Checked ",
    am: "የተመረመረው ",
  },
  verifiedLabel: {
    he: "מקור ותאריך בדיקה",
    en: "Source and check date",
    am: "ምንጭና የምርመራ ቀን",
  },
  datedNotice: {
    he: "המקור העדכני ביותר שנמצא לעסק הזה ישן. התקשרו לפני שאתם נוסעים.",
    en: "The most recent source found for this business is old. Call before you travel.",
    am: "ለዚህ ንግድ የተገኘው የቅርብ ጊዜ ምንጭ አሮጌ ነው። ከመሄድዎ በፊት ይደውሉ።",
  },
  callAhead: {
    he: "המדריך מפנה למקורות פומביים ואינו המלצה. אנחנו לא מקבלים תשלום מספקים, לא בודקים מחירים ולא ערבים לשירות — בררו ותאמו ישירות מול העסק.",
    en: "The directory points to public sources and is not a recommendation. We take no payment from suppliers, do not check prices and do not vouch for service — check and arrange directly with the business.",
    am: "ማውጫው ወደ ይፋዊ ምንጮች ይመራል እንጂ ምክረ ሐሳብ አይደለም። ከአቅራቢዎች ክፍያ አንቀበልም፣ ዋጋዎችን አንመረምርም።",
  },
  relatedHeading: {
    he: "להמשך קריאה",
    en: "Further reading",
    am: "ተጨማሪ ንባብ",
  },
  relatedMarriage: {
    he: "רישום נישואין ברבנות ליוצאי אתיופיה — המדריך המלא",
    en: "Rabbanut marriage registration for Ethiopian-Israelis — the full guide",
    am: "ለኢትዮጵያ-እስራኤላውያን የረቢነት የጋብቻ ምዝገባ — ሙሉ መመሪያ",
  },
  relatedKessim: {
    he: "מדריך הקייסים ורבני העדה לפי עיר",
    en: "The kessim and community rabbis directory, by city",
    am: "የቄሶችና የማህበረሰብ ረቢዎች ማውጫ በከተማ",
  },
  relatedNews: {
    he: "\"בת של מי את?\" — פרויקט האנימציה על מסורות החתונה האתיופית",
    en: "\"Whose daughter are you?\" — the animation project on Ethiopian wedding traditions",
    am: "«የማን ልጅ ነሽ?» — በኢትዮጵያ የሰርግ ወጎች ላይ የአኒሜሽን ፕሮጀክት",
  },
  backToHub: {
    he: "חזרה למדריך החתונה והחינה",
    en: "Back to the wedding and henna guide",
    am: "ወደ የሰርግና ሒና መመሪያ ተመለስ",
  },
  otherCategoriesHeading: {
    he: "קטגוריות נוספות",
    en: "Other categories",
    am: "ሌሎች ምድቦች",
  },
  citiesHeading: {
    he: "לפי עיר",
    en: "By city",
    am: "በከተማ",
  },
  noCityNote: {
    he: "חלק מהעסקים ברשימה אינם נוקבים בעיר בעמוד שלהם. לא שייכנו אותם לעיר שלא הם עצמם ציינו, ולכן הם מופיעים כאן ולא בעמודי הערים.",
    en: "Some businesses in this list state no city on their own page. We did not assign them to a city they did not state themselves, so they appear here and not on the city pages.",
    am: "በዚህ ዝርዝር ውስጥ አንዳንድ ንግዶች በገጻቸው ላይ ከተማ አይጠቅሱም። እነሱ ራሳቸው ወዳልጠቀሱት ከተማ አልመደብናቸውም።",
  },
  cityEmpty: {
    he: "אין עדיין ספק מאומת בקטגוריה הזאת בעיר הזאת.",
    en: "There is not yet a verified supplier in this category in this city.",
    am: "በዚህ ከተማ በዚህ ምድብ ገና የተረጋገጠ አቅራቢ የለም።",
  },
  sourcesHeading: { he: "מקורות", en: "Sources", am: "ምንጮች" },
  disclaimer: {
    he: "המדריך מתאר מנהגים כפי שהם מתועדים במחקר ובעיתונות, ואינו הנחיה הלכתית. הנוהג משתנה בין משפחות ובין אזורי מוצא — התייעצו עם הקייס או הרב שמלווה אתכם.",
    en: "This guide describes customs as documented in research and the press, and is not halachic guidance. Practice varies between families and regions of origin — consult the kes or rabbi accompanying you.",
    am: "ይህ መመሪያ ልማዶችን በምርምርና በጋዜጠኝነት እንደተመዘገቡ ይገልጻል እንጂ የሃላካ መመሪያ አይደለም። ልማዱ በቤተሰቦችና በትውልድ አካባቢዎች ይለያያል።",
  },
};

export function weddingCopy(key: keyof typeof WEDDING_COPY, locale: Locale): string {
  return WEDDING_COPY[key]![locale];
}

// ── sources ────────────────────────────────────────────────────────────────

export const WEDDING_SOURCES: WeddingSource[] = [
  {
    name: {
      he: "רחל שרעבי, \"היבטים משפחתיים בטקסי הנישואים של יהודי אתיופיה\", פעמים 141, מכון בן-צבי (מחקר עמיתים; ראיונות ותצפיות בחתונות בישראל)",
      en: "Rachel Sharabi, \"Family aspects in the marriage ceremonies of Ethiopian Jews\", Pe'amim 141, Ben-Zvi Institute (peer-reviewed; interviews and observation at weddings in Israel)",
      am: "ራሔል ሻራቢ፣ «በኢትዮጵያ አይሁዶች የጋብቻ ሥነ ሥርዓቶች የቤተሰብ ገጽታዎች»፣ ፔአሚም 141፣ የቤን-ጽvi ተቋም",
    },
    url: "https://files.ybz.org.il/periodicals/peamim/141/Pe'amim_141.4.pdf",
  },
  {
    name: {
      he: "ynet — גלית הראלי, על תכנון חתונה אתיופית: מספרי אורחים, בדיקת שבעה דורות ובקשת יד הכלה",
      en: "ynet — Galit Hareli, on planning an Ethiopian wedding: guest numbers, the seven-generation check and the request for the bride's hand",
      am: "ynet — ጋሊት ሃረሊ፣ የኢትዮጵያ ሰርግ ማቀድ፡ የእንግዶች ቁጥር፣ የሰባት ትውልድ ምርመራ",
    },
    url: "https://www.ynet.co.il/laisha/article/h1s61186n1l",
  },
  {
    name: {
      he: "ynet — ניצן פינקו, \"לחתונה אתיופית כולם מוזמנים\": הזמנה קהילתית ושמות הסבים",
      en: "ynet — Nitzan Pinko, \"Everyone is invited to an Ethiopian wedding\": the communal invitation and the grandparents' names",
      am: "ynet — ኒጻን ፒንኮ፣ «ወደ ኢትዮጵያ ሰርግ ሁሉም ተጋብዟል»",
    },
    url: "https://www.ynet.co.il/dating/weddings/article/rkqnx003rmg",
  },
  {
    name: {
      he: "ynet — החלטת הממשלה מ-19.2.2018 בדבר הכרה בקייסים ושילובם במועצות הדתיות",
      en: "ynet — the government decision of 19 Feb 2018 recognising the kessim and integrating them into the religious councils",
      am: "ynet — የ2018 የመንግሥት ውሳኔ ቄሶችን ስለ መቀበል",
    },
    url: "https://www.ynet.co.il/articles/0,7340,L-5121468,00.html",
  },
  {
    name: {
      he: "בית הלל ומכון עתים — כנס על שילוב טקס הנישואין עם מנהגי יהדות אתיופיה",
      en: "Beit Hillel and Itim — conference on integrating the wedding ceremony with Ethiopian-Jewish customs",
      am: "ቤት ሂሌልና ዒቲም — የሰርግ ሥነ ሥርዓትን ከኢትዮጵያ አይሁዶች ልማዶች ጋር ስለ ማዋሃድ ጉባኤ",
    },
    url: "https://beithillel.org.il/post-535/",
  },
  {
    name: {
      he: "מרכז המחקר והמידע של הכנסת — מעמד הקייסים ומתן שירותי דת",
      en: "Knesset Research and Information Center — the status of the kessim and the provision of religious services",
      am: "የክኔሴት ምርምርና መረጃ ማዕከል — የቄሶች ሁኔታ",
    },
    url: "https://fs.knesset.gov.il/globaldocs/MMM/ccbe8d55-f7f7-e411-80c8-00155d010977/2_ccbe8d55-f7f7-e411-80c8-00155d010977_11_9609.pdf",
  },
  {
    name: {
      he: "UNDP אתיופיה — שורובה: קליעה מסורתית ומשמעותה",
      en: "UNDP Ethiopia — shuruba: traditional braiding and its meaning",
      am: "UNDP ኢትዮጵያ — ሹሩባ፡ ባህላዊ ሽርባና ትርጉሙ",
    },
    url: "https://www.undp.org/ethiopia/stories/shuruba-providing-healing-and-sanctuary-women-through-beauty-braids-and-cornrows",
  },
];
