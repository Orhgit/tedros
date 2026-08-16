// Wave 6 articles — Content & SEO batch (TED).
// Community, non-commercial culinary guide.
import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE6: NewsArticleEntry[] = [
  {
    slug: "where-to-buy-ethiopian-spices-groceries-israel",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    tags: ["community"],
    title: {
      he: "איפה קונים תבלינים ומצרכים אתיופיים בישראל — ומה זה טף",
      en: "Where to buy Ethiopian spices and groceries in Israel — and what teff is",
      am: "በእስራኤል የኢትዮጵያ ቅመማ ቅመም እና ግብዓቶች የት ይገዛሉ — እና ጤፍ ምንድን ነው",
    },
    excerpt: {
      he: "מדריך קהילתי ניטרלי: ברברה, מיטמיטה, ניטר קיבה וטף — מה הם, ואיפה אפשר להשיג אותם בישראל לפי מקורות מאומתים.",
      en: "A neutral community guide: berbere, mitmita, niter kibbeh and teff — what they are, and where to find them in Israel, based on verified sources.",
      am: "ገለልተኛ የማህበረሰብ መመሪያ፦ በርበሬ፣ ሚጥሚጣ፣ ጤፍ — ምንድናቸው፣ በእስራኤልስ የት ማግኘት ይቻላል።",
    },
    bodies: {
      he: `מדריך זה הוא ריכוז קהילתי ניטרלי — לא כתבה ממומנת ולא פרסומת לחנות מסוימת. הוא מבוסס על מקור סמכותי אחד (שגרירות אתיופיה בישראל) ועל בדיקה עצמאית של חנויות נוספות שנמצאו באינטרנט. **טדרוס אינו קשור עסקית לאף אחת מהחנויות המוזכרות כאן.**

## התבלינים והמצרכים העיקריים במטבח האתיופי

- **ברברה (Berbere)** — תערובת התבלינים המזוהה ביותר עם המטבח האתיופי: פלפל אדום חריף, כמון, הל, חילבה, כוסברה, ציפורן, פלפל שחור, ג'ינג'ר, כורכום, פפריקה וקינמון. משמשת בסיס לרוב תבשילי ה"וואט" (תבשילים מתובלים).
- **מיטמיטה (Mitmita)** — תערובת חריפה יותר, המבוססת על פלפל אפריקני אדום (בירדקאנצ'ה), משמשת בעיקר לתיבול בשר ולקיטפו.
- **ניטר קיבה (Niter Kibbeh)** — חמאה מזוקקת ומתובלת (שום, ג'ינג'ר, כורכום ותבלינים נוספים), משמשת כבסיס שומני לרוב התבשילים.
- **קמח טף** — הקמח שממנו אופים אינג'רה, לחם השטוח המסורתי. פירוט על טף בהמשך.

## מה זה טף — ולמה זה מיוחד

**טף (Eragrostis tef)** הוא דגן עתיק שמקורו ברמת הגובה האתיופית, וגידולו ידוע כבר אלפי שנים. הגרגר עצמו זעיר במיוחד — כ-2,000 גרעיני טף שווים במשקל לגרעין חיטה בודד — ומטחינה ממנו מייצרים את קמח הטף, שממנו מכינים את בצק האינג'רה (בתסיסה של מספר ימים).

שתי נקודות שכדאי לדעת:

- **טף הוא **דגן נטול גלוטן** מטבעו** — ולכן אינג'רה מקמח טף טהור מתאימה לרוב לאנשים עם רגישות לגלוטן או צליאק (חשוב לוודא שאין תערובת עם קמח חיטה בתוצר הסופי — יצרנים רבים מוסיפים חיטה כדי להוזיל עלות ולזרז את התסיסה, כך שכדאי לבדוק את רשימת הרכיבים).
- קמח טף מגיע בשני גוונים עיקריים — **בהיר (לבן)** ו**כהה (חום/אדום)** — וההבדל הוא בעיקר בזן ובטעם, לא בערך התזונתי.

## איפה קונים בישראל

אין כיום גוף קהילתי רשמי שמנהל רשימה מעודכנת של כל נקודות המכירה בישראל. הרשימה הבאה מבוססת על שני סוגי מקורות בלבד — ואינה ממצה:

**לפי רשימת שגרירות אתיופיה בישראל** ([ethioemb.org.il](https://ethioemb.org.il/ethiopian-spices-shops/)):

- **סוד הקסם** — חנות מתמחה בתבלינים וצמחי מרפא אתיופיים, פעילה גם [אונליין](https://www.sodhakesem.com/).
- **מולו תבלינים** — חנות פיזית ותיקה בחולון.
- **טזיטה** — חנות אונליין למוצרי יודאיקה ותבלינים אתיופיים ([e-tizita.com](https://www.e-tizita.com/)).
- **קפה ברסאו** — מתמחה בפולי קפה ירוקים אתיופיים ([beresau.co.il](https://beresau.co.il/)).

**חנויות נוספות שנמצאו בבדיקה עצמאית ומוכרות תערובת ברברה אונליין** (לא מופיעות ברשימת השגרירות, מוזכרות כאן כאופציה נוספת בלבד — בדקו בעצמכם רכיבים, מחיר ומשלוח לפני הזמנה):

- [VegaMarket](https://vegamarket.co.il/our-shop/grocery/pantry/spices/%D7%AA%D7%A2%D7%A8%D7%95%D7%91%D7%AA-%D7%91%D7%A8%D7%91%D7%A8%D7%94-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%AA-%D7%9C%D7%A4%D7%99-%D7%9E%D7%A9%D7%A7%D7%9C/) — תערובת ברברה למכירה לפי משקל.
- [טעם לחיים](https://www.taam-lehaim.co.il/product/909-%D7%AA%D7%A2%D7%A8%D7%95%D7%91%D7%AA-%D7%91%D7%A8%D7%91%D7%A8%D7%94-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%AA) — חנות טבע/טבעונית בתל אביב (נחלת בנימין), מוכרת ברברה עם משלוח ארצי.

## טיפים לקנייה

- **קבוצות פייסבוק קהילתיות** הן ערוץ נפוץ מאוד לשאלות "איפה קונים" ולהמלצות עדכניות מיד ראשונה — למשל קבוצות של אמהות מהקהילה. טדרוס אינו מצטט תוכן ספציפי מקבוצות סגורות, אבל אם אתם מחפשים המלצה עדכנית מהשטח, זה ערוץ טבעי לבדוק.
- לפני הזמנה אונליין, בדקו את **רשימת הרכיבים** של תערובות התבלינים (חלק מהתערובות המיוצרות בישראל מותאמות לחך המקומי ולא תמיד זהות לגרסה המקורית).
- אם אתם רגישים לגלוטן וקונים קמח טף או אינג'רה מוכנה — ודאו במפורש מול המוכר שאין תוספת קמח חיטה.
- מחירים ומלאי משתנים בין החנויות ולאורך זמן — טדרוס אינו מפרסם מחירים כדי למנוע מידע לא מעודכן; בדקו ישירות באתר החנות.

## ראו גם

- [חנויות תבלינים ומוצרים מאתיופיה — שגרירות אתיופיה בישראל](https://ethioemb.org.il/ethiopian-spices-shops/)
- [מדריכי קהילה נוספים](/he/news)`,
      en: `This guide is a neutral community roundup — not sponsored content and not an ad for any specific shop. It is based on one authoritative source (the Ethiopian Embassy in Israel) plus an independent check of additional shops found online. **Tedros has no business relationship with any of the shops mentioned here.**

## The main Ethiopian spices and staples

- **Berbere** — the spice blend most associated with Ethiopian cooking: hot red pepper, cumin, cardamom, fenugreek, coriander, cloves, black pepper, ginger, turmeric, paprika and cinnamon. The base of most "wat" (stewed) dishes.
- **Mitmita** — a hotter blend based on African bird's eye chili, used mainly to season meat and for kitfo.
- **Niter kibbeh** — spiced clarified butter (garlic, ginger, turmeric and more), the fat base of most dishes.
- **Teff flour** — the flour injera (the traditional flatbread) is baked from. More on teff below.

## What teff is — and why it's special

**Teff (Eragrostis tef)** is an ancient grain native to the Ethiopian highlands, cultivated for thousands of years. The grain itself is tiny — about 2,000 teff grains weigh the same as a single wheat grain — and milling it produces teff flour, from which injera dough is made (fermented over several days).

Two things worth knowing:

- **Teff is naturally gluten-free**, so injera made from pure teff flour is generally suitable for people with gluten sensitivity or celiac disease (worth confirming there's no wheat flour blended in — many producers add wheat to cut cost and speed fermentation, so check the ingredient list).
- Teff flour comes mainly in two colors — **light (white)** and **dark (brown/red)** — the difference is mostly variety and flavor, not nutritional value.

## Where to buy in Israel

There is currently no official community body maintaining an up-to-date list of every point of sale in Israel. The list below draws on two source types only, and is not exhaustive:

**Per the Ethiopian Embassy in Israel's list** ([ethioemb.org.il](https://ethioemb.org.il/ethiopian-spices-shops/)):

- **Sod HaKesem** — a shop specializing in Ethiopian spices and herbs, also active [online](https://www.sodhakesem.com/).
- **Mulu Tavlenem** — a long-established physical shop in Holon.
- **Tizita** — an online shop for Judaica and Ethiopian spices ([e-tizita.com](https://www.e-tizita.com/)).
- **Kafa Beresau** — specializes in Ethiopian green coffee beans ([beresau.co.il](https://beresau.co.il/)).

**Additional shops found in an independent check that sell berbere online** (not on the Embassy's list, mentioned here as an extra option only — verify ingredients, price and shipping yourself before ordering):

- [VegaMarket](https://vegamarket.co.il/our-shop/grocery/pantry/spices/%D7%AA%D7%A2%D7%A8%D7%95%D7%91%D7%AA-%D7%91%D7%A8%D7%91%D7%A8%D7%94-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%AA-%D7%9C%D7%A4%D7%99-%D7%9E%D7%A9%D7%A7%D7%9C/) — berbere blend sold by weight.
- [Taam LeChaim](https://www.taam-lehaim.co.il/product/909-%D7%AA%D7%A2%D7%A8%D7%95%D7%91%D7%AA-%D7%91%D7%A8%D7%91%D7%A8%D7%94-%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%AA) — a vegan/nature shop in Tel Aviv (Nahalat Binyamin), sells berbere with nationwide shipping.

## Buying tips

- **Community Facebook groups** are a very common channel for "where do I buy" questions and up-to-date first-hand recommendations — for example, groups for community mothers. Tedros does not quote specific content from closed groups, but if you want a current on-the-ground recommendation, this is a natural place to check.
- Before ordering online, check the **ingredient list** of spice blends — some blends produced in Israel are adapted to local taste and aren't always identical to the original.
- If you're gluten-sensitive and buying teff flour or ready-made injera, explicitly confirm with the seller that no wheat flour was added.
- Prices and stock vary between shops and over time — Tedros does not publish prices to avoid stale information; check directly on the shop's site.

## See also

- [Ethiopian spice and grocery shops — Ethiopian Embassy in Israel](https://ethioemb.org.il/ethiopian-spices-shops/)
- [More community guides](/en/news)`,
      am: `ይህ መመሪያ ገለልተኛ የማህበረሰብ ማጠቃለያ ነው — በስፖንሰር የተደረገ ወይም የተወሰነ ሱቅ ማስታወቂያ አይደለም። በአንድ ትክክለኛ ምንጭ (በእስራኤል የኢትዮጵያ ኤምባሲ) እና በተጨማሪ በራስ ገዝ ምርመራ በኢንተርኔት ላይ በተገኙ ሱቆች ላይ የተመሰረተ ነው። **ቴድሮስ ከየትኛውም እዚህ ከተጠቀሱት ሱቆች ጋር የንግድ ግንኙነት የለውም።**

## ዋና ዋና የኢትዮጵያ ቅመማ ቅመሞች

- **በርበሬ** — ከኢትዮጵያ ምግብ ጋር በጣም የተያያዘ ቅመም ድብልቅ፦ ቀይ በርበሬ፣ ኩም ኩም፣ ኤል፣ አብሽ፣ ኮሪያንደር፣ ቅርንፉድ፣ ጥቁር በርበሬ፣ ዝንጅብል፣ ዝንጅብል ቅጠል፣ ፓፕሪካ እና ቀረፋ። አብዛኞቹ የ"ወጥ" ምግቦች መሰረት ነው።
- **ሚጥሚጣ** — ይበልጥ ጠንካራ ድብልቅ፣ በአፍሪካ ትንሽ ቀይ በርበሬ ላይ የተመሰረተ፣ በዋነኝነት ስጋ ለመቅመም እና ለክትፎ ይጠቅማል።
- **ቅቤ (ንጥር ቅቤ)** — በቅመማ ቅመም የተጣራ ቅቤ (ነጭ ሽንኩርት፣ ዝንጅብል፣ ዝንጅብል ቅጠል እና ሌሎች)፣ የአብዛኞቹ ምግቦች የስብ መሰረት።
- **የጤፍ ዱቄት** — እንጀራ የሚጋገርበት ዱቄት።

## ጤፍ ምንድን ነው

**ጤፍ (Eragrostis tef)** ከኢትዮጵያ ደጋማ አካባቢዎች የመጣ ጥንታዊ እህል ነው። ጤፍ **በተፈጥሮ ግሉተን የሌለው** እህል ነው — ስለዚህ ከንፁህ ጤፍ ዱቄት የተሰራ እንጀራ ለግሉተን ስሜታዊ ለሆኑ ሰዎች ተስማሚ ሊሆን ይችላል (ነገር ግን የስንዴ ዱቄት አለመጨመሩን ማረጋገጥ ያስፈልጋል — ብዙ አምራቾች ወጪ ለመቀነስ ስንዴ ይጨምራሉ)።

## በእስራኤልስ የት ይገዛሉ

**በእስራኤል የኢትዮጵያ ኤምባሲ ዝርዝር መሰረት** ([ethioemb.org.il](https://ethioemb.org.il/ethiopian-spices-shops/)): ሶድ ሃከሰም፣ ሙሉ ታቭሌነም (በኾሎን)፣ ትዚታ (በኦንላይን)፣ ካፋ ቤረሳው (ቡና)።

ተጨማሪ ሱቆች — VegaMarket እና ጣዓም ለቻይም (በתל אביב) — በራስ ገዝ ምርመራ የተገኙ፣ በርበሬ በኦንላይን ይሸጣሉ።

## የግዢ ምክሮች

- የማህበረሰብ የፌስቡክ ቡድኖች ለ"የት እገዛለሁ" ጥያቄዎች የተለመደ ቻናል ናቸው።
- ከመግዛትዎ በፊት የቅመም ድብልቆቹን **ንጥረ ነገሮች ዝርዝር** ይመልከቱ።
- ለግሉተን ስሜታዊ ከሆኑ፣ የስንዴ ዱቄት አለመጨመሩን ከሻጩ ጋር በግልጽ ያረጋግጡ።

[TODO: תרגום מקצועי נדרש — הטקסט לעיל תורגם ללא בדיקת דובר אמהרית שפת אם; יש לאמת מונחי תבלינים (מיטמיטה, ניטר קיבה) ותחביר לפני פרסום רחב]

## ይመልከቱ

- [የኢትዮጵያ ቅመማ ቅመም ሱቆች — በእስራኤል የኢትዮጵያ ኤምባሲ](https://ethioemb.org.il/ethiopian-spices-shops/)`,
    },
  },
  {
    slug: "preserving-amharic-second-generation",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-16",
    tags: ["community", "family", "education"],
    title: {
      he: "שימור שפת אמהרית אצל הדור השני — למה זה קורה, ומה כן קיים בפועל",
      en: "Preserving Amharic among the second generation — why it's fading, and what actually exists",
      am: "ሁለተኛው ትውልድ አማርኛን መጠበቅ — ለምን እየደበዘዘ ነው፣ እና በተግባር ያለው ምንድን ነው",
    },
    excerpt: {
      he: "למה ילדים ובני נוער יוצאי אתיופיה שנולדו בישראל לרוב לא דוברים אמהרית, ומה בכל זאת קיים: תוכנית פעילה ומאושרת (Tegest), ודוגמה ליוזמה עירונית חד-פעמית באור יהודה.",
      en: "Why many Israeli-born children of Ethiopian descent don't speak Amharic, and what actually exists: an ongoing approved program (Tegest), and a one-time municipal course example from Or Yehuda.",
      am: "በእስራኤል የተወለዱ ብዙ የኢትዮጵያ ተወላጅ ልጆች አማርኛ የማይናገሩት ለምን እንደሆነ፣ እና በተጨባጭ ያለው ምን እንደሆነ (Tegest፣ እና በኦር ይሁዳ የነበረ የአንድ ጊዜ ኮርስ)።",
    },
    bodies: {
      he: `עשרות אלפי ילדים ובני נוער יוצאי אתיופיה נולדו או גדלו בישראל — "הדור השני". עבור רבים מהם אמהרית כבר איננה שפת היומיום, וזו לא רק שאלה של נוחות תקשורת בבית: היא נוגעת ישירות לקשר עם הורים וסבים, ולזהות תרבותית. **חשוב להבהיר מראש**: אין כיום בישראל רשת ארגונית או תוכנית ממשלתית ארצית לשימור השפה — מדובר בכמה יוזמות נקודתיות בלבד, שמפורטות למטה.

## התופעה: למה הדור השני מאבד את השפה

ד"ר אנבסה טפרה, בלשן ומרצה לאמהרית באוניברסיטת תל אביב שחוקר את התופעה שנים רבות, מצביע על שילוב של גורמים: המעמד החברתי הנמוך יחסית שיוחס לשפה בעיני חלק מהעולים עצמם ("אמהרית או טיגרית לא נתפסות כיוקרתיות כמו צרפתית או רוסית"), ולחץ להיטמע מהר בחברה הישראלית. הוא מספר שבתחילת דרכו, הורים לתלמידים כעסו עליו כשניסה לפתוח איתם שיחה באמהרית: "למה אתה מדבר באמהרית בישראל?" — כתבה מפורטת בנושא פורסמה ב-ynet.

## דוגמה לפתרון פעיל: Tegest — "לומדים אמהרית בכיף"

מיזם אחד שממשיך לפעול בפועל היום הוא [tegest.co.il](https://tegest.co.il/) ("לומדים אמהרית בכיף"), בהובלת תעגסת פלקה, אשת חינוך עם ניסיון של יותר מ-17 שנה במערכת החינוך הישראלית. המיזם מציע כמה כלים במקביל: ערכות לימוד להכרת האותיות ומשחקים משפחתיים, סדנאות חינוכיות לבתי ספר יסודיים, משחקי דיגיטל, חומרי הדפסה חינמיים, וקורס דיגיטלי.

התוכנית שבבסיס המיזם — "אמהרית ספרי לי תרבות" — מאושרת ורשומה במאגר גפ"ן של משרד החינוך (מאגר תוכניות העשרה מוכרות לבתי ספר), תחת מספר תוכנית **46531**. זהו אישור פורמלי שמאפשר לבתי ספר לשלב את התוכנית כחלק ממערך ההעשרה שלהם.

**מה לא מפורט באתר**: אין באתר מחיר, תהליך הרשמה מפורט, או מיקום פיזי קבוע — האתר מפנה ליצירת קשר ישיר בוואטסאפ או במייל (learningt100@gmail.com). מומלץ לפנות ישירות לבירור פרטים לפני החלטה.

## דוגמה נוספת: קורס אמהרית לילדים בעיריית אור יהודה — יוזמה חד-פעמית

בקיץ 2024 הפעילה עיריית אור יהודה, בשיתוף מחלקת החינוך, הוועד הקהילתי ומשרד העלייה והקליטה, קורס בן 10 מפגשים ללימוד אמהרית לילדים יוצאי אתיופיה. הקורס התקיים בימי רביעי, החל מ-24 ביולי 2024, בשעות 18:00–20:00, במועדון יחד (בית ידידות), רחוב איילת השחר 15. מטרתו המוצהרת הייתה לחזק את שפת האם ולשפר את התקשורת בין הילדים להורים.

**חשוב להדגיש**: זו הייתה יוזמה עירונית חד-פעמית לקיץ אחד — **לא תוכנית קבועה**. לא נמצאה באתר העירייה או במקורות נוספים אינדיקציה שהקורס חזר על עצמו בשנים שלאחר מכן, או שקיימת כיום מסגרת דומה קבועה באור יהודה. אם אתם גרים באור יהודה או בעיר אחרת, כדאי לבדוק ישירות מול מחלקת החינוך או הוועד הקהילתי המקומי אם מתוכננת יוזמה עונתית דומה.

## מה זה אומר בפועל

נכון להיום, **אין בישראל רשת ארגונית או תוכנית ממשלתית ארצית** שמטרתה שימור שפת אמהרית אצל הדור השני. מה שקיים הוא כמה יוזמות נקודתיות: תוכנית פרטית פעילה ומתמשכת אחת שאותרה (Tegest), ולצדה יוזמות עירוניות/קהילתיות חד-פעמיות (כמו אור יהודה). עמותות ותיקות כמו פידל ([fidel.org.il](https://fidel.org.il/)), הפועלות בקהילה משנת 1997, יכולות להיות כתובת כללית לברור על יוזמות מקומיות — גם אם לא אותרה בהן תוכנית ספציפית לשימור שפה.

## טיפים להורים

- אם מעניין אתכם שבית הספר של הילדים ישלב תוכנית מוכרת, אפשר להפנות את בית הספר לתוכנית "אמהרית ספרי לי תרבות" (מספר 46531) במאגר גפ"ן, או לפנות ישירות ל-Tegest.
- כדאי לבדוק מול מחלקת החינוך העירונית או הוועד הקהילתי המקומי אם מתוכננת יוזמה עונתית דומה לזו שהייתה באור יהודה.
- לפי הכתבה ב-ynet, חלק מהגורמים לאובדן השפה קשורים לתפיסת יוקרה חברתית וללחץ להיטמע מהר — מודעות לכך יכולה לעזור להורים להחליט במודע אם ובאיזו מידה לדבר אמהרית בבית, בלי לחשוש שזה "מפריע" לקליטה של הילדים.

## מקורות

- [Tegest — לומדים אמהרית בכיף](https://tegest.co.il/)
- [עיריית אור יהודה — קורס לימוד אמהרית לילדי ישראלים יוצאי אתיופיה](https://www.oryehuda.muni.il/news/1774/)
- [ynet — "אמא, אל תדברי איתי באמהרית"](https://www.ynet.co.il/judaism/article/5642948)
- [עמותת פידל](https://fidel.org.il/)

## ראו גם

- [מדריכי קהילה נוספים](/he/news)`,
      en: `Tens of thousands of children and teens of Ethiopian descent were born or raised in Israel — the "second generation." For many of them, Amharic is no longer an everyday language, and this isn't just about convenience at home: it touches directly on the connection with parents and grandparents, and on cultural identity. **Important to state upfront**: there is currently no organized national network or government program in Israel dedicated to language preservation — this is a handful of pinpoint initiatives, detailed below.

## The phenomenon: why the second generation is losing the language

Dr. Anbessa Teferra, a linguist and lecturer in Amharic at Tel Aviv University who has studied this phenomenon for years, points to a combination of factors: the relatively low social status some immigrants themselves attributed to the language ("Amharic or Tigrinya aren't perceived as prestigious as French or Russian"), and pressure to assimilate quickly into Israeli society. He recalls that early in his career, parents of students would get angry when he tried to start a conversation with them in Amharic: "Why are you speaking Amharic in Israel?" — a detailed feature on the subject was published by ynet.

## An active example: Tegest — "Learning Amharic, made fun"

One initiative that is actively running today is [tegest.co.il](https://tegest.co.il/) ("Learning Amharic, made fun"), led by Tegest Falka, an educator with more than 17 years of experience in the Israeli education system. The initiative offers several tools in parallel: learning kits for letter recognition and family games, educational workshops for elementary schools, digital games, free printable materials, and a digital course.

The underlying program — "Amharic, Tell Me a Culture" — is officially approved and listed in the Ministry of Education's Gafan catalog of recognized enrichment programs for schools, under program number **46531**. This is a formal approval that lets schools incorporate the program as part of their enrichment offerings.

**What isn't detailed on the site**: there's no pricing, detailed registration process, or fixed physical location listed — the site directs you to contact them directly via WhatsApp or email (learningt100@gmail.com). Reach out directly to check details before deciding.

## Another example: an Amharic course for children in Or Yehuda — a one-time initiative

In summer 2024, the Or Yehuda municipality, together with its education department, the community council, and the Ministry of Aliyah and Integration, ran a 10-session Amharic course for Ethiopian-Israeli children. The course met on Wednesdays, starting July 24, 2024, from 18:00–20:00, at the "Yachad" club (Beit Yedidut), 15 Ayelet HaShahar St. Its stated goal was to strengthen the children's mother tongue and improve communication between children and parents.

**Important to stress**: this was a one-time municipal initiative for a single summer — **not a standing program**. Neither the municipality's site nor other sources checked indicate the course repeated in later years, or that a similar standing framework currently exists in Or Yehuda. If you live in Or Yehuda or elsewhere, it's worth checking directly with your local education department or community council about whether a similar seasonal initiative is planned.

## What this means in practice

As of today, **there is no organized national network or government program** in Israel dedicated to preserving Amharic among the second generation. What exists is a handful of pinpoint initiatives: one ongoing private program identified (Tegest), alongside one-time municipal/community initiatives (like Or Yehuda). Longstanding community organizations like Fidel ([fidel.org.il](https://fidel.org.il/)), active in the community since 1997, can be a general address to ask about local initiatives — even though no specific language-preservation program was found there.

## Tips for parents

- If you'd like your child's school to adopt a recognized program, you can point the school to "Amharic, Tell Me a Culture" (program 46531) in the Gafan catalog, or contact Tegest directly.
- Check with your local education department or community council about whether a seasonal initiative similar to the one in Or Yehuda is planned.
- Per the ynet article, some of the reasons behind language loss relate to perceived social prestige and pressure to assimilate quickly — being aware of this can help parents decide, deliberately, whether and how much to speak Amharic at home, without worrying it will "get in the way" of their children's absorption.

## Sources

- [Tegest — Learning Amharic, made fun](https://tegest.co.il/)
- [Or Yehuda Municipality — Amharic course for children of Ethiopian descent](https://www.oryehuda.muni.il/news/1774/)
- [ynet — "Mom, don't speak to me in Amharic"](https://www.ynet.co.il/judaism/article/5642948)
- [Fidel Association](https://fidel.org.il/)

## See also

- [More community guides](/en/news)`,
      am: `ብዙ ሺህ የኢትዮጵያ ተወላጅ ልጆችና ወጣቶች — "ሁለተኛው ትውልድ" — በእስራኤል ተወልደው ወይም አድገው ይኖራሉ። ለብዙዎቻቸው አማርኛ ከእንግዲህ የዕለት ተዕለት ቋንቋ አይደለም። **አስቀድሞ ግልጽ መሆን ያለበት**፦ በአሁኑ ጊዜ በእስራኤል ቋንቋውን ለመጠበቅ የተዘጋጀ አገር አቀፍ ድርጅታዊ መረብ ወይም የመንግስት ፕሮግራም የለም — ከዚህ በታች የተዘረዘሩት ጥቂት የተለዩ ተነሳሽነቶች ብቻ ናቸው።

## ክስተቱ

ዶ/ር አንበሳ ተፈራ፣ በተል አቪቭ ዩኒቨርሲቲ የአማርኛ ቋንቋ ምሁር፣ ይህን ክስተት ለብዙ ዓመታት አጥንተዋል። ስደተኞች ራሳቸው ለቋንቋው የሰጡት ዝቅተኛ ማህበራዊ ደረጃ እና በፍጥነት ወደ እስራኤል ማህበረሰብ የመዋሃድ ግፊት ምክንያቶች እንደሆኑ ይናገራሉ።

## ንቁ ምሳሌ፦ Tegest — "አማርኛ በደስታ መማር"

[tegest.co.il](https://tegest.co.il/)፣ በ17+ ዓመት የትምህርት ልምድ ባላት ትዕግሥት ፈለቃ የሚመራ፣ በአሁኑ ጊዜ ንቁ ነው። መርሃ ግብሩ — "አማርኛ ባህል ንገሪኝ" — በትምህርት ሚኒስቴር ገፋን ካታሎግ ውስጥ በቁጥር **46531** በይፋ ጸድቆ ተመዝግቧል።

## ተጨማሪ ምሳሌ፦ በኦር ይሁዳ ማዘጋጃ ቤት — የአንድ ጊዜ ተነሳሽነት

በ2024 ክረምት፣ የኦር ይሁዳ ማዘጋጃ ቤት ከትምህርት ክፍል፣ ከማህበረሰብ ኮሚቴ እና ከዓሊያ እና ውህደት ሚኒስቴር ጋር በመተባበር ለ10 ስብሰባዎች የአማርኛ ትምህርት ኮርስ ለልጆች አካሂዷል። **ይህ ለአንድ ክረምት ብቻ የተደረገ ተነሳሽነት ነበር — ቋሚ ፕሮግራም አይደለም።** ኮርሱ ከዚያ በኋላ በሌሎች ዓመታት ተደግሞ እንደሆነ የሚያሳይ ምንጭ አልተገኘም።

## በተግባር ምን ማለት ነው

እስከ አሁን፣ ሁለተኛውን ትውልድ አማርኛን ለመጠበቅ የተዘጋጀ አገር አቀፍ ድርጅታዊ መረብ የለም። ያለው ጥቂት የተለዩ ተነሳሽነቶች ብቻ ናቸው፦ አንድ ንቁ የግል ፕሮግራም (Tegest)፣ እና የአንድ ጊዜ የማዘጋጃ ቤት ተነሳሽነቶች (እንደ ኦር ይሁዳ)። የፊደል ማህበር ([fidel.org.il](https://fidel.org.il/))፣ ከ1997 ጀምሮ በማህበረሰቡ ውስጥ የሚሰራ፣ ስለ አካባቢያዊ ተነሳሽነቶች ለመጠየቅ አጠቃላይ አድራሻ ሊሆን ይችላል።

## ምክሮች ለወላጆች

- ትምህርት ቤቱ የታወቀ ፕሮግራም እንዲጠቀም ከፈለጉ፣ ትምህርት ቤቱን ወደ "አማርኛ ባህል ንገሪኝ" (ቁጥር 46531) በገፋን ካታሎግ ውስጥ ማመልከት ወይም በቀጥታ ወደ Tegest መገናኘት ይችላሉ።
- በኦር ይሁዳ እንደነበረው ተመሳሳይ ወቅታዊ ተነሳሽነት የታቀደ እንደሆነ ከአካባቢዎ የትምህርት ክፍል ወይም ማህበረሰብ ኮሚቴ ጋር ያረጋግጡ።
- እንደ ynet ዘገባ፣ ቋንቋን የማጣት አንዳንድ ምክንያቶች ከማህበራዊ ክብር አመለካከት እና በፍጥነት የመዋሃድ ግፊት ጋር የተያያዙ ናቸው — ይህን ማወቅ ወላጆች በቤት ውስጥ አማርኛ መናገር ወይ እና ምን ያህል እንደሆነ በንቃት እንዲወስኑ ሊረዳ ይችላል።

[TODO: תרגום מקצועי מלא נדרש — הטקסט לעיל תורגם ללא בדיקת דובר אמהרית שפת אם; יש לאמת את הציטוטים מד"ר אנבסה טפרה, את פרטי התוכנית של Tegest, ואת ההבחנה בין תוכנית פעילה (Tegest) ליוזמה חד-פעמית (אור יהודה), לפני פרסום רחב.]

## ምንጮች

- [Tegest — አማርኛ በደስታ መማር](https://tegest.co.il/)
- [የኦር ይሁዳ ማዘጋጃ ቤት](https://www.oryehuda.muni.il/news/1774/)
- [ynet](https://www.ynet.co.il/judaism/article/5642948)
- [ፊደል ማህበር](https://fidel.org.il/)`,
    },
  },
];
