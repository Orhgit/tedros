// Mourning & funeral guide — Beta Israel customs in Israel (TED-138).
//
// A practical service page for the week after a death: the ceremony, the
// mourning days, the tezkar (ተዝካር) memorial, burial arrangements with the
// chevra kadisha, and the Bituach Leumi rights that follow a death.
//
// HE is the source-of-truth locale (CLAUDE.md). EN + AM are mirrors — the
// Amharic body is intentionally a full mirror (older readers depend on it).
//
// Terminology note (verified for TED-138): the memorial rite is called
// tezkar (ተዝካር, from the root z-k-r "to remember"). In Beta Israel practice
// it is obligatory — first held about a week after the death and again at
// the one-year mark; in Israel it has largely merged with the rabbinic
// azkara. Among Ethiopian Orthodox Christians the equivalent falls on day
// 40. The spelling "חסקה" mentioned in the issue brief was NOT attested in
// any source we found — this module uses תזכר / אזכרה only.
//
// Sources (customs — academic / israeliana / community; rights — gov):
// - he.wikipedia.org/wiki/תזכר (timing, seudah, merge with rabbinic azkara)
// - israeliana.org — "מסורת ומורשת בקהילת יוצאי אתיופיה בישראל: דת ואמונה"
//   (Oz Almog's project, 2022): shama shrouds, das mourning booth, 7 days,
//   purity of burial handlers, kessim role, condolence donations.
// - btl.gov.il — burial fees (דמי קבורה), death grant (מענק פטירה,
//   ₪10,514 as of 01.01.2026), survivors' pension (קצבת שאירים).
// - gov.il — death notification + burial permit, death registration.
//
// Server-only module — do not import in client bundles.

import type { Locale } from "../i18n/config";
import type { FamilyTopic } from "./topics.server";

// ── main topic (registered in FAMILY_TOPICS) ───────────────────────────────

export const MOURNING_TOPIC: FamilyTopic = {
  slug: "mourning",
  title: {
    he: "אבלות ולוויה במסורת ביתא ישראל — מדריך מעשי",
    en: "Mourning and Funerals in the Beta Israel Tradition — A Practical Guide",
    am: "በቤተ እስራኤል ባህል ሐዘን እና ቀብር — ተግባራዊ መመሪያ",
  },
  subtitle: {
    he: "מה עושים כשמישהו נפטר: הלוויה, ימי האבל, טקס התזכר, סידורי קבורה מול חברה קדישא, וזכויות בביטוח לאומי — צעד אחר צעד.",
    en: "What to do when someone passes away: the funeral, the mourning days, the tezkar memorial, burial arrangements with the chevra kadisha, and your Bituach Leumi rights — step by step.",
    am: "አንድ ሰው ሲሞት ምን ማድረግ እንዳለብዎ፡ ቀብር፣ የሐዘን ቀናት፣ የተዝካር ሥነ ሥርዓት፣ ከቀብር ማኅበር (ሔቭራ ካዲሻ) ጋር ዝግጅት፣ እና በብሔራዊ ኢንሹራንስ ያሉ መብቶች — ደረጃ በደረጃ።",
  },
  body: {
    he: `אובדן של אדם קרוב הוא רגע קשה — ודווקא בו נדרשת המשפחה להתמודד גם עם בירוקרטיה ישראלית וגם עם שמירה על מסורת הקהילה. המדריך הזה נכתב כדי שלא תצטרכו לחפש לבד: מה המסורת מבקשת, מה החוק דורש, ומה מגיע לכם.

מסורת האבלות של ביתא ישראל
באתיופיה נשמרו מנהגי אבלות מוקפדים: את הנפטר רחצו והלבישו בתכריכים לבנים (שאמה), והקבורה נערכה סמוך ככל האפשר לפטירה. מי שטיפלו בנפטר נחשבו טמאים שבעה ימים — בהתאם לדיני הטהרה שבתורה (במדבר י"ט) — וטבלו בנהר ביום השלישי והשביעי. בישראל רוב המנהג הזה אינו נוהג עוד, אך יסודותיו — כבוד המת, קבורה מהירה וליווי קהילתי צמוד — נשמרים.

בפתח בית האבלים הוקמה סוכת אבלים — ה"דאס" — ובה התכנסה הקהילה סביב המשפחה: ישיבה משותפת, בכי וקינה (לֶקְסוֹ, ለቅሶ באמהרית), סעודות אבלים של אינג'רה ותבשילי ווט, ותרומות כספיות למשפחה כדי לשאת בהוצאות. הקייסים מובילים את התפילות לעילוי נשמת הנפטר ואת ניחום האבלים. גם בישראל נהוג בהרבה משפחות להקים דאס — לרוב חצר או חניה מקורה ליד הבית — ולשבת בו את השבעה.

ימי האבל: שבעה ימי אבלות הם מנהג הקהילה מדורי דורות, והוא משתלב באופן טבעי עם השבעה הנהוגה בישראל. רבים מוסיפים את יום השלושים לפי המנהג הרבני.

תזכר — האזכרה של ביתא ישראל
טקס הזיכרון המרכזי נקרא תזכר (ተዝካር — מלשון "לזכור"). במסורת ביתא ישראל התזכר הוא חובה: הראשון נערך כשבוע לאחר הפטירה, ותזכר נוסף במלאת שנה. במרכזו סעודה לעילוי נשמת הנפטר ולתיקונה, בהשתתפות הקהילה, כשלקייסים נערך שולחן מכובד משלהם. בישראל שילבו רבים את התזכר עם טקס האזכרה הרבני — עלייה לקבר, קדיש וסעודה. חשוב לדעת: אצל שכנינו האתיופים הנוצרים התזכר נערך ביום הארבעים — אל תתבלבלו בין המועדים; בביתא ישראל המועדים הם שבוע ושנה, והמנהג משתנה ממשפחה למשפחה.

ארגון אזכרה/תזכר — למעשה:
• קבעו מועד ומקום — בבית, בבית כנסת או באולם. באזכרות גדולות מזמינים את הקהילה כולה.
• הזמינו קס — ואם המשפחה מעוניינת גם רב. לקייסים בשירות המדינה ראו קישור בהמשך העמוד.
• סעודה — במסורת הקהילה הסעודה היא לב הטקס: אינג'רה, ווט, דאבו וקפה (בונה). מקובל שקרובים ושכנים עוזרים בהכנות.
• עלייה לקבר — במסורת באתיופיה לא נהגו לפקוד את הקבר לאחר התזכר; בישראל רבים אימצו את מנהג העלייה לקבר באזכרות. שני המנהגים לגיטימיים — עשו כמנהג משפחתכם.

קבורה בישראל — מה חשוב לדעת
הקבורה בישראל מאורגנת על-ידי חברות קדישא ומועצות דתיות, והיא ממומנת על-ידי ביטוח לאומי (דמי קבורה): חלקת קבר בעיר המגורים, העברת הנפטר, טהרה, תכריכים, הלוויה ומצבה זמנית — הכול ללא תשלום. גובים תשלום רק על חריגים, כמו חלקה מיוחדת שבחרתם או קבורה בעיר אחרת. אם חשוב לכם שקס ישתתף בטקס לצד נציג חברה קדישא — בקשו זאת מראש בעת תיאום ההלוויה. זו זכותכם המלאה לקיים את הטקס לפי מסורת הקהילה.

זכויות כספיות לאחר פטירה — אל תוותרו עליהן
• מענק פטירה — סכום חד-פעמי של 10,514 ₪ (נכון ל-01.01.2026) המשולם לבן/בת הזוג או לילדי הנפטר, אם הנפטר קיבל מביטוח לאומי קצבת אזרח ותיק, שאירים, נכות, הבטחת הכנסה או קצבאות מסוימות נוספות. ברוב המקרים המענק משולם אוטומטית — אם לא התקבל, מגישים תביעה (טופס 416).
• קצבת שאירים — קצבה חודשית לאלמן/אלמנה וליתומים עד גיל 18 (ובתנאים מסוימים מעבר לכך). הקצבה אינה משולמת אוטומטית — חובה להגיש תביעה לביטוח לאומי.
• צו ירושה או צו קיום צוואה — מגישים לרשם לענייני ירושה (משרד המשפטים). בלי צו לא ניתן להעביר חשבון בנק, דירה או רכב על שם היורשים. מי שידו אינה משגת זכאי לסיוע משפטי חינם — ראו קישור בהמשך.
כל הקישורים הרשמיים — ברשימת הצעדים ובמשאבים שבעמוד זה.`,
    en: `Losing a loved one is hard — and at that very moment the family must handle both Israeli bureaucracy and the community's traditions. This guide exists so you don't have to search alone: what tradition asks, what the law requires, and what you are entitled to.

The Beta Israel mourning tradition
In Ethiopia, mourning customs were strictly kept: the deceased was washed and dressed in white shrouds (shama), and burial took place as soon as possible. Those who handled the body were considered ritually impure for seven days — per the Torah's purity laws (Numbers 19) — and immersed in the river on the third and seventh days. In Israel most of that practice is no longer observed, but its foundations — honoring the dead, swift burial, and close communal accompaniment — remain.

At the entrance to the mourners' home a mourning booth — the das — was erected, and the community gathered there around the family: sitting together, weeping and lament (leqso, ለቅሶ in Amharic), mourners' meals of injera and wat stews, and monetary contributions to help the family carry the costs. The kessim lead the prayers for the soul of the departed and the comforting of the mourners. In Israel many families still put up a das — usually a covered yard or car-port by the house — and sit the shiva there.

The mourning days: seven days of mourning are the community's custom of many generations, and they merge naturally with the shiva practiced in Israel. Many families add the thirtieth-day observance (shloshim) per the rabbinic custom.

Tezkar — the Beta Israel memorial
The central memorial rite is called tezkar (ተዝካር — from the root "to remember"). In Beta Israel tradition the tezkar is obligatory: the first is held about a week after the death, and another at the one-year mark. At its heart is a meal for the elevation and repair of the departed soul, with the community attending and an honored separate table set for the kessim. In Israel many families have merged the tezkar with the rabbinic azkara — visiting the grave, kaddish, and a meal. Good to know: among Ethiopia's Christians the tezkar falls on the fortieth day — don't confuse the dates; in Beta Israel the milestones are one week and one year, and practice varies family to family.

Organizing an azkara/tezkar — in practice:
• Set a date and place — at home, in a synagogue, or in a hall. For large memorials the whole community is invited.
• Invite a kes — and, if the family wishes, a rabbi as well. For state-employed kessim see the link further down this page.
• The meal — in the community's tradition the meal is the heart of the rite: injera, wat, dabo, and coffee (buna). Relatives and neighbors customarily help with the preparations.
• Visiting the grave — in Ethiopia the grave was traditionally not visited after the tezkar; in Israel many families have adopted the custom of visiting the grave at memorials. Both are legitimate — follow your family's custom.

Burial in Israel — what matters
Burial in Israel is organized by chevra kadisha societies and religious councils, and is funded by Bituach Leumi (burial fees): a plot in the city of residence, transport of the deceased, tahara (purification), shrouds, the funeral, and a temporary marker — all free of charge. Payment is collected only for extras, such as a specific plot you chose or burial in another city. If it matters to you that a kes takes part in the ceremony alongside the chevra kadisha — ask for it in advance when scheduling the funeral. Holding the ceremony per the community's tradition is fully your right.

Financial rights after a death — don't give them up
• Death grant (ma'anak petira) — a one-time payment of ₪10,514 (as of 01.01.2026) to the spouse or children of the deceased, if the deceased received an old-age, survivors', disability, income-support, or certain other Bituach Leumi benefits. In most cases it is paid automatically — if it wasn't, file a claim (form 416).
• Survivors' pension (kitzvat she'erim) — a monthly pension for the widow/widower and for orphans under 18 (and in certain conditions beyond). It is not paid automatically — you must file a claim with Bituach Leumi.
• Inheritance order or probate order — filed with the Inheritance Registrar (Ministry of Justice). Without an order, a bank account, an apartment, or a car cannot be transferred to the heirs. Those who cannot afford a lawyer are entitled to free legal aid — see the link below.
All official links appear in the checklist and resources on this page.`,
    am: `የቅርብ ሰው ማጣት ከባድ ነው — እናም በዚያ ሰዓት ቤተሰቡ የእስራኤልን ቢሮክራሲም የማኅበረሰቡን ባህልም በአንድነት መያዝ አለበት። ይህ መመሪያ ብቻዎን እንዳይፈልጉ ተጽፏል፡ ባህሉ ምን እንደሚጠይቅ፣ ሕጉ ምን እንደሚፈልግ፣ እና ምን መብት እንዳለዎት።

የቤተ እስራኤል የሐዘን ባህል
በኢትዮጵያ የሐዘን ሥርዓቶች በጥብቅ ይጠበቁ ነበር፡ ሟቹ ታጥቦ በነጭ ከፈን (ሻማ) ይለበስ ነበር፣ ቀብሩም በተቻለ ፍጥነት ይፈጸም ነበር። አስከሬኑን የነኩ ሰዎች ሰባት ቀን እንደ ርኩስ ይቆጠሩ ነበር — በኦሪት (ዘኍልቍ 19) የንጽሕና ሕግ መሠረት — በሦስተኛውና በሰባተኛው ቀን በወንዝ ይጠመቁ ነበር። በእስራኤል ይህ ልማድ በአብዛኛው አይተገበርም፣ ነገር ግን መሠረቶቹ — ሟችን ማክበር፣ ፈጣን ቀብር፣ እና ጥብቅ የማኅበረሰብ አጃቢነት — ጸንተዋል።

በሐዘንተኞቹ ቤት ደጃፍ የሐዘን ዳስ ይተከል ነበር፣ ማኅበረሰቡም በቤተሰቡ ዙሪያ ይሰበሰብ ነበር፡ አብሮ መቀመጥ፣ ለቅሶ፣ የእንጀራና የወጥ የሐዘን ምግቦች፣ እና ወጪውን ለመሸፈን ለቤተሰቡ የገንዘብ እርዳታ። ቄሶች ለሟቹ ነፍስ ጸሎቶችን እና የሐዘንተኞችን ማጽናናት ይመራሉ። በእስራኤልም ብዙ ቤተሰቦች ዳስ ይተክላሉ — በአብዛኛው በቤቱ አጠገብ የተሸፈነ ግቢ — እና ሰባቱን ቀናት (ሺቫ) እዚያ ይቀመጣሉ።

የሐዘን ቀናት፡ ሰባት የሐዘን ቀናት ከትውልድ ወደ ትውልድ የመጣ የማኅበረሰቡ ልማድ ነው፣ በእስራኤል ከሚደረገው ሺቫ ጋር በተፈጥሮ ይዋሃዳል። ብዙዎች በረቢናዊ ልማድ መሠረት ሠላሳኛውን ቀን (ሽሎሺም) ይጨምራሉ።

ተዝካር — የቤተ እስራኤል መታሰቢያ
ዋናው የመታሰቢያ ሥነ ሥርዓት ተዝካር ይባላል ("ማስታወስ" ከሚለው ሥር)። በቤተ እስራኤል ባህል ተዝካር ግዴታ ነው፡ የመጀመሪያው ከሞት በኋላ በአንድ ሳምንት ገደማ፣ ሌላውም ዓመት ሲሞላ ይደረጋል። በማዕከሉ ለሟቹ ነፍስ ዕረፍት የሚደረግ ምግብ አለ፣ ማኅበረሰቡ ይሳተፋል፣ ለቄሶችም የተከበረ የተለየ ገበታ ይዘጋጃል። በእስራኤል ብዙ ቤተሰቦች ተዝካሩን ከረቢናዊ አዝካራ ጋር አዋህደዋል — መቃብር መጎብኘት፣ ቃዲሽ፣ እና ምግብ። ማወቅ ጠቃሚ ነው፡ በኢትዮጵያ ክርስቲያኖች ዘንድ ተዝካር በአርባኛው ቀን ይደረጋል — ቀኖቹን አያምታቱ፤ በቤተ እስራኤል ምዕራፎቹ አንድ ሳምንት እና አንድ ዓመት ናቸው፣ ልማዱም ከቤተሰብ ወደ ቤተሰብ ይለያያል።

አዝካራ/ተዝካር ማዘጋጀት — በተግባር፡
• ቀን እና ቦታ ይወስኑ — በቤት፣ በምኩራብ ወይም በአዳራሽ። ለትልቅ መታሰቢያ መላው ማኅበረሰብ ይጋበዛል።
• ቄስ ይጋብዙ — ቤተሰቡ ከፈለገም ረቢ ጭምር። በመንግሥት አገልግሎት ስላሉ ቄሶች ከዚህ ገጽ በታች ያለውን አገናኝ ይመልከቱ።
• ምግቡ — በማኅበረሰቡ ባህል ምግቡ የሥርዓቱ ልብ ነው፡ እንጀራ፣ ወጥ፣ ዳቦ እና ቡና። ዘመዶችና ጎረቤቶች በዝግጅቱ መርዳት የተለመደ ነው።
• መቃብር መጎብኘት — በኢትዮጵያ ከተዝካር በኋላ መቃብር መጎብኘት ልማድ አልነበረም፤ በእስራኤል ብዙዎች በመታሰቢያ ቀናት መቃብር መጎብኘትን ተቀብለዋል። ሁለቱም ትክክል ናቸው — የቤተሰብዎን ልማድ ይከተሉ።

ቀብር በእስራኤል — ማወቅ ያለብዎት
በእስራኤል ቀብር በቀብር ማኅበሮች (ሔቭራ ካዲሻ) እና በሃይማኖት ምክር ቤቶች ይደራጃል፣ በብሔራዊ ኢንሹራንስ (ቢቱዋሕ ሌኡሚ) ይከፈላል፡ በመኖሪያ ከተማ የመቃብር ቦታ፣ የሟቹ ማጓጓዝ፣ ንጽሕና (ጣሃራ)፣ ከፈን፣ ቀብር እና ጊዜያዊ ምልክት — ሁሉም ያለ ክፍያ ነው። ክፍያ የሚጠየቀው ለተለየ ነገር ብቻ ነው — ለምሳሌ እርስዎ የመረጡት ልዩ ቦታ ወይም በሌላ ከተማ ቀብር። ቄስ ከሔቭራ ካዲሻ ወኪል ጎን በሥርዓቱ እንዲሳተፍ ከፈለጉ — ቀብሩን ሲያስተባብሩ አስቀድመው ይጠይቁ። ሥርዓቱን በማኅበረሰቡ ባህል መፈጸም ሙሉ መብትዎ ነው።

ከሞት በኋላ የገንዘብ መብቶች — አይተዉአቸው
• የሞት ስጦታ (ማዓናክ ፕቲራ) — 10,514 ₪ (እ.ኤ.አ. 01.01.2026) የአንድ ጊዜ ክፍያ ለሟቹ ባል/ሚስት ወይም ልጆች — ሟቹ ከብሔራዊ ኢንሹራንስ የእርጅና፣ የተረፉ፣ የአካል ጉዳት፣ የገቢ ድጋፍ ወይም ሌሎች የተወሰኑ አበሎችን ይቀበል ከነበረ። በአብዛኛው ጊዜ በራስ-ሰር ይከፈላል — ካልተከፈለ ጥያቄ ያቅርቡ (ቅጽ 416)።
• የተረፉ አበል (ክጽቫት ሸኢሪም) — ለባል/ሚስት እና ከ18 ዓመት በታች ላሉ ወላጅ አልባ ልጆች ወርሃዊ አበል (በተወሰኑ ሁኔታዎችም ከዚያ በላይ)። በራስ-ሰር አይከፈልም — ለብሔራዊ ኢንሹራንስ ጥያቄ ማቅረብ ግዴታ ነው።
• የውርስ ትዕዛዝ ወይም የኑዛዜ ማጽደቂያ — ለውርስ ጉዳዮች መዝጋቢ (የፍትሕ ሚኒስቴር) ይቀርባል። ያለ ትዕዛዝ የባንክ ሂሳብ፣ ቤት ወይም መኪና ወደ ወራሾች መተላለፍ አይችልም። ጠበቃ መክፈል የማይችል ነፃ የሕግ እርዳታ የማግኘት መብት አለው — ከታች ያለውን አገናኝ ይመልከቱ።
ሁሉም ይፋዊ አገናኞች — በዚህ ገጽ ባለው የእርምጃ ዝርዝር እና መርጃዎች ውስጥ ይገኛሉ።`,
  },
  resources: [
    {
      name: "ביטוח לאומי — קצבת שאירים ומענק פטירה",
      phone: "*6050",
      url: "https://www.btl.gov.il/benefits/Survivors_%20Insurance/Pages/default.aspx",
      description: {
        he: "הגשת תביעה לקצבת שאירים ולמענק פטירה, ובירור זכויות בני משפחה של הנפטר.",
        en: "Filing claims for the survivors' pension and death grant, and checking the rights of the deceased's family members.",
        am: "ለተረፉ አበል እና ለሞት ስጦታ ጥያቄ ማቅረብ፣ የሟቹ ቤተሰብ አባላት መብቶችን ማጣራት።",
      },
    },
    {
      name: "ביטוח לאומי — דמי קבורה",
      url: "https://www.btl.gov.il/benefits/dmaykvura/Pages/default.aspx",
      description: {
        he: "מה כלול בקבורה ללא תשלום: חלקה, העברה, טהרה, תכריכים, הלוויה ומצבה זמנית.",
        en: "What free burial includes: plot, transport, tahara, shrouds, the funeral, and a temporary marker.",
        am: "በነፃ ቀብር ውስጥ ምን እንደሚካተት፡ ቦታ፣ ማጓጓዝ፣ ንጽሕና፣ ከፈን፣ ቀብር እና ጊዜያዊ ምልክት።",
      },
    },
    {
      name: "משרד הבריאות — הודעת פטירה ורישיון קבורה",
      url: "https://www.gov.il/he/service/death-notification-and-burial-permit",
      description: {
        he: "המסמכים הנדרשים לפני הקבורה: הודעת פטירה מרופא או פרמדיק ורישיון קבורה מלשכת הבריאות.",
        en: "The documents required before burial: a death notification from a doctor or paramedic and a burial permit from the health bureau.",
        am: "ከቀብር በፊት የሚያስፈልጉ ሰነዶች፡ ከሐኪም ወይም ከፓራሜዲክ የሞት ማስታወቂያ እና ከጤና ቢሮ የቀብር ፈቃድ።",
      },
    },
    {
      name: "רשות האוכלוסין — רישום פטירה ותעודת פטירה",
      url: "https://www.gov.il/he/service/death_registration",
      description: {
        he: "רישום הפטירה במרשם האוכלוסין והנפקת תעודת פטירה — נדרשת לביטוח לאומי, לבנקים ולירושה.",
        en: "Registering the death in the population registry and issuing a death certificate — required for Bituach Leumi, banks, and inheritance.",
        am: "ሞትን በሕዝብ መዝገብ ማስመዝገብ እና የሞት የምስክር ወረቀት ማውጣት — ለብሔራዊ ኢንሹራንስ፣ ለባንኮች እና ለውርስ ያስፈልጋል።",
      },
    },
    {
      name: "עמותת עתים — ליווי מול חברה קדישא",
      url: "https://itim.org.il",
      phone: "*8083",
      description: {
        he: "מידע וסיוע חינם בהתנהלות מול חברות קדישא וברשויות הדת — כולל במקרים של קושי או סירוב.",
        en: "Free guidance in dealing with chevra kadisha societies and religious authorities — including cases of difficulty or refusal.",
        am: "ከቀብር ማኅበሮች እና ከሃይማኖት ባለሥልጣናት ጋር በሚደረግ ግንኙነት ነፃ መረጃ እና እርዳታ — ችግር ወይም እምቢታ ሲያጋጥም ጭምር።",
      },
    },
  ],
};

// ── checklist — "מה עושים כשמישהו נפטר" ────────────────────────────────────

export interface MourningChecklistStep {
  id: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
  /** Official (gov) link for this step, if any. */
  officialUrl?: string;
  officialLabel?: Record<Locale, string>;
  /** Locale-relative internal path, e.g. "/rights/free-legal-aid". */
  internalPath?: string;
  internalLabel?: Record<Locale, string>;
}

export const MOURNING_CHECKLIST: MourningChecklistStep[] = [
  {
    id: "death-notification",
    title: {
      he: "קבלו הודעת פטירה",
      en: "Obtain a death notification",
      am: "የሞት ማስታወቂያ ያግኙ",
    },
    detail: {
      he: 'בבית חולים — הצוות מנפיק אותה. בבית — מזמינים רופא, או מד"א (101) ופרמדיק מוסמך ינפיק את ההודעה. בלי הודעת פטירה אי-אפשר לקבל רישיון קבורה.',
      en: "In a hospital the staff issues it. At home, call a doctor or MDA (101) — a certified paramedic will issue the notification. Without it a burial permit cannot be issued.",
      am: "በሆስፒታል — ሠራተኞቹ ያወጣሉ። በቤት — ሐኪም ይጥሩ ወይም መዳ (101)፤ የተመሰከረለት ፓራሜዲክ ማስታወቂያውን ያወጣል። ያለሱ የቀብር ፈቃድ ማግኘት አይቻልም።",
    },
    officialUrl: "https://www.gov.il/he/service/death-notification-and-burial-permit",
    officialLabel: {
      he: "משרד הבריאות — הודעת פטירה ורישיון קבורה",
      en: "Ministry of Health — death notification and burial permit",
      am: "የጤና ሚኒስቴር — የሞት ማስታወቂያ እና የቀብר ፈቃድ",
    },
  },
  {
    id: "chevra-kadisha",
    title: {
      he: "פנו לחברה קדישא ותאמו את ההלוויה",
      en: "Contact the chevra kadisha and schedule the funeral",
      am: "የቀብር ማኅበሩን (ሔቭራ ካዲሻ) ያነጋግሩ እና ቀብሩን ያስተባብሩ",
    },
    detail: {
      he: "חברה קדישא בעיר המגורים מטפלת ברישיון הקבורה, בטהרה ובחלקה. הקבורה ממומנת על-ידי ביטוח לאומי — ללא תשלום בעיר המגורים. רוצים שקס יוביל את הטקס או ישתתף בו? אמרו זאת כבר בשיחת התיאום — זו זכותכם.",
      en: "The chevra kadisha in the city of residence handles the burial permit, tahara, and plot. Burial is funded by Bituach Leumi — free of charge in the city of residence. Want a kes to lead or take part in the ceremony? Say so in the scheduling call — it is your right.",
      am: "በመኖሪያ ከተማው ያለው ሔቭራ ካዲሻ የቀብር ፈቃዱን፣ ንጽሕናውን እና ቦታውን ያስተናግዳል። ቀብር በብሔራዊ ኢንሹራንስ ይከፈላል — በመኖሪያ ከተማ ያለ ክፍያ። ቄስ ሥርዓቱን እንዲመራ ወይም እንዲሳተፍ ይፈልጋሉ? በማስተባበሪያው ጥሪ ላይ ይናገሩ — መብትዎ ነው።",
    },
    officialUrl: "https://www.btl.gov.il/benefits/dmaykvura/Pages/default.aspx",
    officialLabel: {
      he: "ביטוח לאומי — דמי קבורה (מה כלול בחינם)",
      en: "Bituach Leumi — burial fees (what's included free)",
      am: "ብሔራዊ ኢንሹራንስ — የቀብር ክፍያ (በነፃ ምን ይካተታል)",
    },
    internalPath: "/rights/kessim-religious-support",
    internalLabel: {
      he: "קייסים בשירות המדינה — הזכות המלאה",
      en: "State-employed kessim — the full right",
      am: "በመንግሥት አገልግሎት ያሉ ቄሶች — ሙሉው መብት",
    },
  },
  {
    id: "shiva-das",
    title: {
      he: "הקימו את הדאס ושבו שבעה",
      en: "Put up the das and sit the seven days",
      am: "ዳሱን ይትከሉ እና ሰባቱን ቀናት ይቀመጡ",
    },
    detail: {
      he: "לפי מסורת הקהילה מקימים סוכת אבלים (דאס) בפתח הבית — חצר או חניה מקורה — ובה מתכנסת הקהילה לשבעת ימי האבל. שכנים וקרובים נושאים בהכנת הסעודות; מקובל שהבאים תורמים למשפחה לכיסוי ההוצאות.",
      en: "Per the community's tradition a mourning booth (das) is put up at the home's entrance — a yard or covered car-port — where the community gathers for the seven mourning days. Neighbors and relatives carry the meal preparations; visitors customarily contribute to the family's costs.",
      am: "በማኅበረሰቡ ባህል መሠረት በቤቱ ደጃፍ የሐዘን ዳስ ይተከላል — ግቢ ወይም የተሸፈነ ቦታ — ማኅበረሰቡም ለሰባቱ የሐዘን ቀናት እዚያ ይሰበሰባል። ጎረቤቶችና ዘመዶች ምግቡን ያዘጋጃሉ፤ ጎብኚዎች ለቤተሰቡ ወጪ መርዳት የተለመደ ነው።",
    },
  },
  {
    id: "death-certificate",
    title: {
      he: "הוציאו תעודת פטירה",
      en: "Obtain the death certificate",
      am: "የሞት የምስክር ወረቀት ያውጡ",
    },
    detail: {
      he: "לאחר רישום הפטירה במרשם האוכלוסין, בני משפחה מדרגה ראשונה מקבלים תעודת פטירה מרשות האוכלוסין (משרד הפנים). התעודה נדרשת לביטוח לאומי, לבנק, לפנסיה ולירושה — הוציאו אותה מוקדם.",
      en: "After the death is registered in the population registry, first-degree relatives receive a death certificate from the Population Authority (Ministry of Interior). The certificate is needed for Bituach Leumi, the bank, pensions, and inheritance — obtain it early.",
      am: "ሞቱ በሕዝብ መዝገብ ከተመዘገበ በኋላ የመጀመሪያ ደረጃ ዘመዶች ከሕዝብ ባለሥልጣን (የአገር ውስጥ ሚኒስቴር) የሞት የምስክር ወረቀት ይቀበላሉ። ለብሔራዊ ኢንሹራንስ፣ ለባንክ፣ ለጡረታ እና ለውርስ ያስፈልጋል — ቀድመው ያውጡት።",
    },
    officialUrl: "https://www.gov.il/he/service/death_registration",
    officialLabel: {
      he: "רשות האוכלוסין — רישום פטירה",
      en: "Population Authority — death registration",
      am: "የሕዝብ ባለሥልጣን — የሞት ምዝገባ",
    },
  },
  {
    id: "btl-rights",
    title: {
      he: "תבעו את הזכויות בביטוח לאומי",
      en: "Claim your Bituach Leumi rights",
      am: "የብሔራዊ ኢንሹራንስ መብቶችዎን ይጠይቁ",
    },
    detail: {
      he: "מענק פטירה (10,514 ₪ נכון ל-01.01.2026) משולם לרוב אוטומטית לבן/בת הזוג אם הנפטר קיבל קצבה — ודאו שהגיע. קצבת שאירים לאלמן/ה וליתומים אינה אוטומטית — הגישו תביעה בסניף, בטלפון *6050 או באתר.",
      en: "The death grant (₪10,514 as of 01.01.2026) is usually paid automatically to the spouse if the deceased received a benefit — verify it arrived. The survivors' pension for the widow/er and orphans is not automatic — file a claim at a branch, by phone *6050, or online.",
      am: "የሞት ስጦታ (10,514 ₪ እ.ኤ.አ. 01.01.2026) ሟቹ አበል ይቀበል ከነበረ በአብዛኛው በራስ-ሰር ለባል/ሚስት ይከፈላል — መድረሱን ያረጋግጡ። የተረፉ አበል በራስ-ሰር አይከፈልም — በቅርንጫፍ፣ በስልክ *6050 ወይም በኢንተርኔት ጥያቄ ያቅርቡ።",
    },
    officialUrl:
      "https://www.btl.gov.il/benefits/Survivors_%20Insurance/Pages/default.aspx",
    officialLabel: {
      he: "ביטוח לאומי — קצבת שאירים",
      en: "Bituach Leumi — survivors' pension",
      am: "ብሔራዊ ኢንሹራንስ — የተረፉ አበል",
    },
  },
  {
    id: "azkara-tezkar",
    title: {
      he: "ארגנו את האזכרה והתזכר",
      en: "Organize the azkara and tezkar",
      am: "አዝካራውን እና ተዝካሩን ያዘጋጁ",
    },
    detail: {
      he: "תזכר ראשון — כשבוע לאחר הפטירה; רבים מציינים גם שלושים; תזכר שנה — במלאת שנה. קבעו מקום, הזמינו קס (ורב אם רוצים), והכינו סעודה לעילוי הנשמה. פרטים מלאים בגוף המדריך למעלה.",
      en: "First tezkar — about a week after the death; many also mark the shloshim; the year tezkar — at the one-year mark. Set a venue, invite a kes (and a rabbi if desired), and prepare the memorial meal. Full details in the guide above.",
      am: "የመጀመሪያ ተዝካር — ከሞት በኋላ በአንድ ሳምንት ገደማ፤ ብዙዎች ሠላሳኛውንም ያከብራሉ፤ የዓመት ተዝካር — ዓመት ሲሞላ። ቦታ ይወስኑ፣ ቄስ ይጋብዙ (ከፈለጉም ረቢ)፣ የመታሰቢያውን ምግብ ያዘጋጁ። ሙሉ ዝርዝር ከላይ ባለው መመሪያ ውስጥ።",
    },
    internalPath: "/heritage/kessim",
    internalLabel: {
      he: "קייסים ורבני העדה האתיופית — לפי עיר",
      en: "Kessim and Ethiopian community rabbis — by city",
      am: "ቄሶችና የኢትዮጵያ ማኅበረሰብ ረቢዎች — በከተማ",
    },
  },
  {
    id: "inheritance",
    title: {
      he: "טפלו בירושה — ואל תשלמו על עורך דין אם אינכם חייבים",
      en: "Handle the inheritance — and don't pay for a lawyer if you don't have to",
      am: "ውርሱን ያስተናግዱ — ግዴታ ካልሆነ ለጠበቃ አይክፈሉ",
    },
    detail: {
      he: "בקשה לצו ירושה (בלי צוואה) או צו קיום צוואה מגישים לרשם לענייני ירושה במשרד המשפטים. מי שידו אינה משגת זכאי לייצוג חינם מהלשכה לסיוע משפטי — בדקו את הזכאות לפני ששוכרים עורך דין פרטי.",
      en: "A request for an inheritance order (no will) or probate order is filed with the Inheritance Registrar at the Ministry of Justice. Those who cannot afford it are entitled to free representation from the Legal Aid Bureau — check eligibility before hiring a private lawyer.",
      am: "የውርስ ትዕዛዝ (ኑዛዜ ከሌለ) ወይም የኑዛዜ ማጽደቂያ ጥያቄ ለፍትሕ ሚኒስቴር የውርስ መዝጋቢ ይቀርባል። መክፈል የማይችል ከሕግ እርዳታ ቢሮ ነፃ ውክልና የማግኘት መብት አለው — የግል ጠበቃ ከመቅጠርዎ በፊት ብቁነትዎን ያጣሩ።",
    },
    internalPath: "/rights/free-legal-aid",
    internalLabel: {
      he: "סיוע משפטי חינם — הזכות המלאה",
      en: "Free legal aid — the full right",
      am: "ነፃ የሕግ እርዳታ — ሙሉው መብት",
    },
  },
];

// ── guest guide — for non-Ethiopian visitors at a levaya/azkara ────────────

export interface MourningGuestTip {
  id: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
}

export const MOURNING_GUEST_TIPS: MourningGuestTip[] = [
  {
    id: "show-up",
    title: {
      he: "עצם ההגעה היא הניחום",
      en: "Showing up is the comfort",
      am: "መገኘት ራሱ ማጽናናት ነው",
    },
    detail: {
      he: 'במסורת האתיופית האבל הוא עניין קהילתי — נוכחות רחבה מכבדת את הנפטר ואת משפחתו. אינכם צריכים לדעת מה לומר; מספיק לבוא, ללחוץ יד ולשבת עם המשפחה. ברכת "המקום ינחם" המקובלת מתאימה לגמרי.',
      en: "In the Ethiopian tradition mourning is communal — a broad presence honors the deceased and the family. You don't need to know what to say; coming, shaking hands, and sitting with the family is enough. The customary Hebrew condolence greeting is entirely appropriate.",
      am: "በኢትዮጵያ ባህል ሐዘን የማኅበረሰብ ጉዳይ ነው — ሰፊ መገኘት ሟቹንና ቤተሰቡን ያከብራል። ምን እንደሚሉ ማወቅ አያስፈልግዎትም፤ መምጣት፣ እጅ መጨበጥ እና ከቤተሰቡ ጋር መቀመጥ በቂ ነው።",
    },
  },
  {
    id: "the-das",
    title: {
      he: "צפו לדאס — סוכת האבלים",
      en: "Expect the das — the mourning booth",
      am: "ዳሱን ይጠብቁ — የሐዘን ዳስ",
    },
    detail: {
      he: "השבעה מתקיימת לרוב בסוכת אבלים (דאס) שמוקמת ליד הבית — לא בהכרח בסלון. מצטרפים לישיבה בשקט, גם אם לא מכירים את רוב היושבים. ייתכן בכי וקינה קוליים (לקסו) — זהו חלק מן המנהג, לא אובדן שליטה.",
      en: "The shiva usually takes place in a mourning booth (das) put up by the house — not necessarily in the living room. Join and sit quietly, even if you don't know most of those present. There may be loud weeping and lament (leqso) — that is part of the custom, not a loss of control.",
      am: "ሺቫው በአብዛኛው በቤቱ አጠገብ በተተከለ የሐዘን ዳስ ውስጥ ይካሄዳል። አብዛኞቹን ባያውቋቸውም በጸጥታ ይቀላቀሉ። ከፍ ያለ ለቅሶ ሊኖር ይችላል — ያ የልማዱ አካል ነው።",
    },
  },
  {
    id: "dress-and-conduct",
    title: {
      he: "לבוש צנוע, התנהגות שקטה",
      en: "Modest dress, quiet conduct",
      am: "ልከኛ አለባበስ፣ ጸጥ ያለ ባህሪ",
    },
    detail: {
      he: "בואו בלבוש צנוע ומאופק. בהלוויה עצמה ההספדים ותפילות הקס (לעיתים בגעז) עשויים להיות שונים ממה שאתם מכירים — פשוט עמדו בכבוד. אין מנהג להביא פרחים לקבר, כמקובל בקבורה יהודית.",
      en: "Come modestly and soberly dressed. At the funeral itself the eulogies and the kes's prayers (sometimes in Ge'ez) may differ from what you know — simply stand respectfully. Flowers are not customary at the grave, as in Jewish burial generally.",
      am: "በልከኛ አለባበስ ይምጡ። በቀብሩ ላይ የቄሱ ጸሎቶች (አንዳንዴ በግዕዝ) ከሚያውቁት ሊለዩ ይችላሉ — በአክብሮት ይቁሙ። እንደ አጠቃላይ የአይሁድ ቀብር አበባ ማምጣት ልማድ አይደለም።",
    },
  },
  {
    id: "contribution",
    title: {
      he: "תרומה כספית — מנהג מכובד, לא חובה",
      en: "A monetary contribution — an honored custom, not an obligation",
      am: "የገንዘብ እርዳታ — የተከበረ ልማድ ነው፣ ግዴታ አይደለም",
    },
    detail: {
      he: "במסורת הקהילה מקובל שהבאים לנחם משתתפים בהוצאות המשפחה בתרומה כספית צנועה, בדיסקרטיות (מעטפה). אורח שאינו מהקהילה אינו מחויב — אך תרומה כזו תתקבל בהוקרה. אפשר גם להביא מצרכי מזון לסעודות האבלים.",
      en: "In the community's tradition, comforters customarily share the family's costs with a modest, discreet monetary contribution (an envelope). A guest from outside the community is not obliged — but such a contribution is received with appreciation. Bringing groceries for the mourners' meals is also welcome.",
      am: "በማኅበረሰቡ ልማድ አጽናኞች በመጠነኛ የገንዘብ እርዳታ (በፖስታ) የቤተሰቡን ወጪ ይካፈላሉ። ከማኅበረሰቡ ውጭ የሆነ እንግዳ ግዴታ የለበትም — ግን እንዲህ ያለ እርዳታ በምስጋና ይቀበላል። ለሐዘን ምግቦች ሸቀጣሸቀጥ ማምጣትም ይቻላል።",
    },
  },
  {
    id: "food-and-coffee",
    title: {
      he: "כיבוד וקפה — לקבל זו דרך לכבד",
      en: "Food and coffee — accepting is a way of honoring",
      am: "ምግብ እና ቡና — መቀበል ማክበር ነው",
    },
    detail: {
      he: "בבית האבלים ובאזכרה יוגשו לרוב אינג'רה, תבשילי ווט וקפה. סירוב מנומס אינו פוגע, אך טעימה מהכיבוד — ובמיוחד מהקפה — היא דרך פשוטה לכבד את המארחים ואת זכר הנפטר.",
      en: "At the mourners' home and at the azkara you will usually be offered injera, wat stews, and coffee. A polite decline does not offend, but tasting what is offered — especially the coffee — is a simple way to honor the hosts and the memory of the deceased.",
      am: "በሐዘንተኞቹ ቤት እና በአዝካራው ላይ በአብዛኛው እንጀራ፣ ወጥ እና ቡና ይቀርባል። በትህትና አለመቀበል አያስከፋም፣ ግን መቅመስ — በተለይ ቡናውን — አስተናጋጆቹን የማክበር ቀላል መንገድ ነው።",
    },
  },
  {
    id: "azkara-guest",
    title: {
      he: "הוזמנתם לאזכרה או לתזכר? זה כבוד גדול",
      en: "Invited to an azkara or tezkar? It is a great honor",
      am: "ወደ አዝካራ ወይም ተዝካር ተጋብዘዋል? ትልቅ ክብር ነው",
    },
    detail: {
      he: "התזכר הוא סעודה לעילוי נשמת הנפטר — ההזמנה אליו מבטאת קרבה. השתתפו בתפילה גם אם הנוסח אינו מוכר לכם, המתינו לברכת הקס או הרב לפני האוכל, וזכרו: זהו ערב של זיכרון, לא אירוע חברתי.",
      en: "The tezkar is a meal for the elevation of the departed soul — being invited expresses closeness. Join the prayer even if the liturgy is unfamiliar, wait for the kes's or rabbi's blessing before eating, and remember: it is an evening of remembrance, not a social event.",
      am: "ተዝካር ለሟቹ ነፍስ ዕረፍት የሚደረግ ምግብ ነው — መጋበዝ ቅርበትን ያሳያል። ሥርዓቱ ባይታወቅዎትም በጸሎቱ ይሳተፉ፣ ከመብላት በፊት የቄሱን ወይም የረቢውን ቡራኬ ይጠብቁ፣ ያስታውሱ፡ ይህ የመታሰቢያ ምሽት ነው እንጂ ማኅበራዊ ዝግጅት አይደለም።",
    },
  },
];

// ── sources (rendered on-page) ─────────────────────────────────────────────

export interface MourningSource {
  name: Record<Locale, string>;
  url: string;
}

export const MOURNING_SOURCES: MourningSource[] = [
  {
    name: {
      he: "ישראליאנה — מסורת ומורשת בקהילת יוצאי אתיופיה: דת ואמונה (פרויקט פרופ' עוז אלמוג)",
      en: "Israeliana — Tradition and heritage in the Ethiopian-Israeli community: religion and faith (Prof. Oz Almog's project)",
      am: "እስራኤሊያና — በኢትዮጵያ-እስራኤላዊ ማኅበረሰብ ባህል እና ቅርስ፡ ሃይማኖት እና እምነት",
    },
    url: "https://www.israeliana.org/post/%D7%A4%D7%95%D7%9C%D7%A7%D7%9C%D7%95%D7%A8-%D7%9E%D7%95%D7%A8%D7%A9%D7%AA-%D7%95%D7%A0%D7%95%D7%A1%D7%98%D7%9C%D7%92%D7%99%D7%94-%D7%91%D7%A7%D7%94%D7%99%D7%9C%D7%AA-%D7%99%D7%95%D7%A6%D7%90%D7%99-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94-%D7%91%D7%99%D7%A9%D7%A8%D7%90%D7%9C-%D7%97%D7%9C%D7%A7-%D7%91",
  },
  {
    name: {
      he: "ויקיפדיה — תזכר (טקס האזכרה בתרבות האתיופית)",
      en: "Wikipedia (Hebrew) — Tezkar (the memorial rite in Ethiopian culture)",
      am: "ውክፔዲያ (ዕብራይስጥ) — ተዝካር",
    },
    url: "https://he.wikipedia.org/wiki/%D7%AA%D7%96%D7%9B%D7%A8",
  },
  {
    name: {
      he: "ביטוח לאומי — מענק פטירה לבני משפחה של הנפטר",
      en: "Bituach Leumi — death grant for the deceased's family members",
      am: "ብሔራዊ ኢንሹራንስ — ለሟቹ ቤተሰብ የሞት ስጦታ",
    },
    url: "https://www.btl.gov.il/benefits/Survivors_%20Insurance/Pages/%D7%9E%D7%A2%D7%A0%D7%A7%20%D7%A4%D7%98%D7%99%D7%A8%D7%94.aspx",
  },
  {
    name: {
      he: "ביטוח לאומי — קצבת שאירים",
      en: "Bituach Leumi — survivors' pension",
      am: "ብሔራዊ ኢንሹራንስ — የተረፉ አበል",
    },
    url: "https://www.btl.gov.il/benefits/Survivors_%20Insurance/Pages/default.aspx",
  },
  {
    name: {
      he: "ביטוח לאומי — דמי קבורה",
      en: "Bituach Leumi — burial fees",
      am: "ብሔራዊ ኢንሹራንስ — የቀብር ክፍያ",
    },
    url: "https://www.btl.gov.il/benefits/dmaykvura/Pages/default.aspx",
  },
];
