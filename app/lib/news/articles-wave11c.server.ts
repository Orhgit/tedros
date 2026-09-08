// Wave 11c articles — health, family and rights (TED-164), researched and
// verified 2026-09-02.
//
// Same discipline as waves 8 and 10: every item below is based on a primary
// source that was opened and read in full — not a search-result snippet. The
// two Knesset MMM data papers and the Prime Minister's Office programme report
// were downloaded as PDFs and read as extracted text; the statute was read
// section by section; the peer-reviewed study was read from its PMC full text;
// the National Insurance circular's tables were read column by column
// (layout-preserved) rather than trusted to a summary, because the first pass
// through them transposed the "January 2026" and "value until now" columns.
//
// This is YMYL content. Rules applied here:
//   * No phone number is published unless the owning organization's own page
//     publishes it. The Ministry of Health *5144 interpretation centre is
//     already covered on our health/mental-health/interpreter page, so these articles link
//     there rather than restate a number.
//   * No shekel figure appears without a btl.gov.il / ministry source and its
//     effective date, per ADR-021.
//   * Legal content carries the "not legal advice" line.
//
// Dropped rather than published (see the PR body): a February 2026 Knesset
// Health Committee session on cultural adaptation of mental-health services,
// which surfaced only as a search-engine summary and whose protocol could not
// be located on oknesset or knesset.gov.il; and Government Decision 3243,
// whose gov.il decision page returns 403 to every tool available here — it is
// described below only where the PMO report itself describes it.
import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE11C: NewsArticleEntry[] = [
  {
    slug: "moh-ethiopian-health-programme-report-2026",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["health", "rights"],
    title: {
      he: "דוח המדינה על בריאות הקהילה: 19 מגשרים חדשים בקופות — ושלושה מתורגמנים לאמהרית בכל מוקד המידע",
      en: "The state's own report on community health: 19 new mediators in the HMOs — and three Amharic interpreters in the entire information line",
      am: "የመንግሥት ሪፖርት ስለ ማህበረሰቡ ጤና፦ በጤና ድርጅቶች 19 አዲስ አገናኞች — በሙሉ የመረጃ ማዕከል ግን ሦስት የአማርኛ አስተርጓሚዎች",
    },
    excerpt: {
      he: "משרד ראש הממשלה פרסם בינואר 2026 את דוח הסיכום של התוכנית הממשלתית לשילוב יוצאי אתיופיה לשנים 2023–2024. פרק הבריאות מפרט מה נבנה, מה בוצע חלקית ומה עדיין חסר — כולל המספר המדויק של המתורגמנים לאמהרית במוקד המידע של משרד הבריאות.",
      en: "In January 2026 the Prime Minister's Office published the summary report of the government programme for the integration of Ethiopian-Israelis for 2023–2024. The health chapter sets out what was built, what was only partly delivered, and what is still missing — including the exact number of Amharic interpreters staffing the Health Ministry's information line.",
      am: "የጠቅላይ ሚኒስትር ጽ/ቤት በጥር 2026 ለ2023–2024 የኢትዮጵያ ተወላጆች የመዋሃድ መንግሥታዊ መርሃ ግብር ማጠቃለያ ሪፖርት አሳተመ። የጤና ምዕራፉ ምን እንደተሠራ፣ ምን በከፊል እንደተፈጸመ እና ምን እንደጎደለ ይዘረዝራል።",
    },
    bodies: {
      he: `משרד ראש הממשלה פרסם בינואר 2026 דוח סיכום פעילות של התוכנית הממשלתית לשילוב יוצאי אתיופיה לשנים 2023–2024. זהו מסמך ממשלתי גלוי, ואפשר לקרוא בו בדיוק מה המדינה התחייבה לעשות בתחום הבריאות, ומה היא מדווחת שעשתה בפועל.

## הנתון שכדאי להתחיל ממנו

בטבלת היעדים של משרד הבריאות בדוח מופיעה שורה אחת שמסבירה הרבה מהחוויה שלכם בקופה ובבית החולים:

> מוקד "קול הבריאות" מונה כ-3 מתורגמנים לשפה האמהרית ו-2 לשפה הטיגרית.

שלושה. זה המצאי המדווח של מוקד המידע הארצי של משרד הבריאות, נכון לדיווח על 2024. באותה טבלה מדווח גם שנוספו **19 מגשרים בקופות החולים**, ושב-2025 פורסם מבחן תמיכה לגיוס מגשרים נוספים.

## מה עוד מופיע בפרק הבריאות

הדוח מפרט את תוכניות משרד הבריאות לשנת 2024 ואת רמת הביצוע של כל אחת:

- **בוצע מעבר למתוכנן**: עידוד פעילות גופנית ואורח חיים בריא; הכנה לקליטת עלייה; תוכניות ליווי בריאות הנפש ומניעת התמכרויות.
- **בוצע במלואו**: גישור בבית חולים; מוקד "קול הבריאות".
- **בוצע חלקית**: מניעה וטיפול ב-HIV; מניעה וטיפול בשחפת; מלגות לסטודנטים לפסיכולוגיה; בריאות האישה והנערה; התוכנית למניעת אובדנות.

הדוח עצמו מסביר את הביצוע החלקי: "עיכוב בהעברת התקציבים מטעם המטה ודחיית חלק מהפעילויות לשנת 2025". קמפיין חיסון ה-BCG, למשל, נדחה ל-2025 בגלל עיכוב תקציבי ב-2024.

שימו לב לשורה "מלגות לסטודנטים לפסיכולוגיה" שבוצעה חלקית. זו התוכנית שאמורה לייצר, בעוד עשור, את הפסיכולוגים דוברי האמהרית שאין היום.

## מה המשרד אומר שהוא בונה עכשיו

לפי הדוח, בשנים 2023–2024 פעלה ועדה מייעצת למשרד הבריאות, שהוקמה על ידי מנכ"ל המשרד ב-2023, ומונתה פרויקטורית ייעודית ב-2024. הוועדה קבעה יעדים לתוכנית מקיפה שמהווה בסיס לתוכנית העבודה לשנים 2024–2026:

- מערך הנגשה לשונית ומיצוי זכויות, ובתוכו מערך המגשרים;
- צמצום התחלואה במחלות כרוניות;
- התאמת תכנים במערך בריאות הנפש והפחתת האשפוזים;
- קידום בריאות האישה, בדגש על הפחתת הפסקות היריון לא רצויות והעלאת מודעות לסרטן השד;
- מענה לגילוי אירוע מוחי (CVA) ותוכנית שיקום מותאמת;
- **בניית מודל להגברת האמון בין הקהילה למערכת הבריאות.**

היעד האחרון הוא הודאה, בשפה של מסמך ממשלתי, שהבעיה איננה רק שפה.

הדוח מדווח כי תקציב משרד הבריאות בתוכנית מוצה במלואו (100%) ב-2024, וכי המשרד חזר ב-2024 להיות חלק מהחלטת הממשלה 787 עם 20 תוכניות ייעודיות, אחרי שב-2023 הפעיל תוכניות פנימיות מחוץ להחלטה.

## מה זה אומר לכם, מחר בבוקר

1. **מגשר בקופה זו זכות, לא טובה.** אם בקופה שלכם יש מגשר תרבותי — אפשר לבקש שיהיה נוכח. אם אין, אפשר לבקש מהצוות להפעיל את מוקד התרגום של משרד הבריאות. הסברנו איך בדיוק עושים את זה, ומה אומרים בקביעת התור, ב[מדריך הנגישות הלשונית בבריאות הנפש שלנו](/he/health/mental-health/interpreter).
2. **בקשה בכתב שווה יותר מבקשה בעל פה.** SMS או הודעה באפליקציית הקופה משאירים אסמכתא.
3. **בדיקת BRCA 1,2 נכנסה לסל**, ולפי הדוח הופקו דפי מידע בשפה האמהרית והמשרד הוציא הנחיות לעידוד ביצוע הבדיקה בקופות החולים.

## מה הדוח לא אומר

הדוח מדווח תפוקות — כמה מגשרים, כמה תוכניות, כמה תקציב. הוא לא מדווח כמה מטופלים ביקשו מתורגמן וקיבלו, ולא כמה ביקשו ולא קיבלו. המטה עצמו כותב שיש צורך לעבור "ממעקב על תשומות (מספר משתתפים, סכומי תקציב) למדידה של תוצאות והשפעה בפועל". עד שזה יקרה, המספר היחיד שאתם באמת יכולים לבדוק הוא מה שקרה בפגישה שלכם.

מקור: [משרד ראש הממשלה — התוכנית הממשלתית לשילוב יוצאי אתיופיה, דוח סיכום פעילות 2023–2024, ינואר 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) · נבדק ספטמבר 2026.

## מקורות

- [משרד ראש הממשלה, המטה לשילוב יוצאי אתיופיה — "התוכנית הממשלתית לשילוב יוצאי אתיופיה: דוח סיכום פעילות לשנים 2023-2024", ינואר 2026 (טבת תשפ"ו)](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) — פרק "משרד הבריאות", עמ' 42–44
- [הנגישות הלשונית בבריאות הנפש — המדריך שלנו](/he/health/mental-health/interpreter)
- [מרכז הבריאות של טדרוס](/he/health)`,
      en: `In January 2026 the Prime Minister's Office published a summary report of the government programme for the integration of Ethiopian-Israelis covering 2023–2024. It is a public government document, and it states exactly what the state undertook to do on health and what it reports actually happened.

## The number to start from

One row in the Health Ministry's target table explains a great deal about what you experience at the clinic and the hospital:

> The "Kol HaBriut" information line has roughly 3 Amharic interpreters and 2 Tigrinya interpreters.

Three. That is the reported staffing of the Health Ministry's national information line, as of the 2024 reporting. The same table reports that **19 mediators were added at the health funds**, and that in 2025 a support tender was published to recruit more.

## What else the health chapter says

The report lists the ministry's 2024 programmes and how far each was delivered:

- **Delivered beyond plan**: physical activity and healthy lifestyle promotion; preparation for absorption of new immigrants; mental-health accompaniment and addiction-prevention programmes.
- **Delivered in full**: hospital mediation; the "Kol HaBriut" information line.
- **Partly delivered**: HIV prevention and treatment; tuberculosis prevention and treatment; scholarships for psychology students; women's and girls' health; the suicide-prevention programme.

The report explains the shortfalls itself: "a delay in the transfer of budgets from the programme headquarters, and postponement of some activities to 2025". The BCG vaccination campaign, for instance, slipped to 2025 because the 2024 budget arrived late.

Note the row "scholarships for psychology students", delivered only in part. That is the programme meant to produce, a decade from now, the Amharic-speaking psychologists who do not exist today.

## What the ministry says it is building now

Per the report, an advisory committee to the Health Ministry operated during 2023–2024, established by the director-general in 2023, with a dedicated programme lead appointed in 2024. The committee set targets for a comprehensive programme that forms the basis of the 2024–2026 work plan:

- a language-access and rights-realisation array, including the mediator corps;
- reducing chronic disease;
- adapting mental-health content and reducing hospitalisations;
- women's health, with an emphasis on reducing unwanted pregnancy terminations and raising breast-cancer awareness;
- stroke (CVA) detection and an adapted rehabilitation programme;
- **building a model for increasing trust between the community and the health system.**

That last target is an admission, in the language of a government document, that the problem is not only language.

The report states the Health Ministry's programme budget was fully utilised (100%) in 2024, and that the ministry returned in 2024 to being part of Government Decision 787 with 20 dedicated programmes, after running internal programmes outside the decision in 2023.

## What this means for you tomorrow morning

1. **A mediator at your health fund is a right, not a favour.** If your fund has a cultural mediator, you can ask for them to be present. If not, you can ask the staff to use the Health Ministry's interpretation centre. We set out exactly how, and what to say when booking, in our [language-access guide for mental health](/en/health/mental-health/interpreter).
2. **A request in writing is worth more than one made aloud.** An SMS or a message in your fund's app leaves a record.
3. **BRCA 1,2 screening entered the basket**, and per the report, information sheets were produced in Amharic and the ministry issued guidance to the health funds to encourage uptake.

## What the report does not say

The report reports outputs — how many mediators, how many programmes, how much budget. It does not report how many patients asked for an interpreter and got one, nor how many asked and did not. The programme headquarters itself writes that it needs to move "from tracking inputs (number of participants, budget sums) to measuring outcomes and actual impact". Until that happens, the only number you can really check is what happened in your own appointment.

Source: [Prime Minister's Office — The government programme for the integration of Ethiopian-Israelis, activity summary report 2023–2024, January 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) · verified September 2026.

## Sources

- [Prime Minister's Office, Headquarters for the Integration of Ethiopian-Israelis — "The government programme for the integration of Ethiopian-Israelis: activity summary report 2023–2024", January 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) — "Ministry of Health" chapter, pp. 42–44
- [Our language-access guide for mental health](/en/health/mental-health/interpreter)
- [The Tedros health hub](/en/health)`,
      am: `የጠቅላይ ሚኒስትር ጽ/ቤት በጥር 2026 ለ2023–2024 የኢትዮጵያ ተወላጆች የመዋሃድ መንግሥታዊ መርሃ ግብር የእንቅስቃሴ ማጠቃለያ ሪፖርት አሳተመ። ይህ ይፋዊ የመንግሥት ሰነድ ነው፣ በጤና መስክ መንግሥት ምን ለማድረግ እንደተስማማ እና ምን እንደተፈጸመ በትክክል ይናገራል።

## መጀመሪያ ልብ ሊባል የሚገባው ቁጥር

በጤና ሚኒስቴር የግብ ሰንጠረዥ ውስጥ ያለ አንድ መስመር በጤና ድርጅትና በሆስፒታል ስለሚያጋጥምዎት ነገር ብዙ ያብራራል፦

> የ«ኮል ሀብሪዩት» የመረጃ ማዕከል በግምት 3 የአማርኛ አስተርጓሚዎችና 2 የትግርኛ አስተርጓሚዎች አሉት።

ሦስት። ይህ የጤና ሚኒስቴር አገር አቀፍ የመረጃ ማዕከል የተዘገበ አቅም ነው (የ2024 ሪፖርት)። በዚያው ሰንጠረዥ **በጤና ድርጅቶች 19 አገናኞች (መጋሽሪም) መጨመራቸው** እና በ2025 ተጨማሪ ለመቅጠር ጨረታ መውጣቱ ተዘግቧል።

## የጤና ምዕራፉ ሌላ ምን ይላል

ሪፖርቱ የ2024 መርሃ ግብሮችንና የአፈጻጸም ደረጃቸውን ይዘረዝራል፦

- **ከታቀደው በላይ ተፈጽሟል**፦ የአካል እንቅስቃሴና ጤናማ አኗኗር ማበረታታት፤ ለአዲስ መጪዎች ዝግጅት፤ የአእምሮ ጤና አጃቢነትና ሱስ መከላከል።
- **ሙሉ በሙሉ ተፈጽሟል**፦ በሆስፒታል ውስጥ ማገናኘት፤ የ«ኮል ሀብሪዩት» ማዕከል።
- **በከፊል ተፈጽሟል**፦ የኤችአይቪ መከላከልና ሕክምና፤ የሳንባ ነቀርሳ መከላከልና ሕክምና፤ ለሳይኮሎጂ ተማሪዎች ስኮላርሺፕ፤ የሴቶችና የወጣት ልጃገረዶች ጤና፤ ራስን ማጥፋትን የመከላከል መርሃ ግብር።

ሪፖርቱ ራሱ ምክንያቱን ያብራራል፦ «ከዋናው መሥሪያ ቤት የበጀት ማስተላለፍ መዘግየትና የተወሰኑ ተግባራት ወደ 2025 መተላለፍ»።

«ለሳይኮሎጂ ተማሪዎች ስኮላርሺፕ» በከፊል ብቻ መፈጸሙን ልብ ይበሉ። ይህ ከአሥር ዓመት በኋላ ዛሬ የሌሉትን አማርኛ ተናጋሪ ሳይኮሎጂስቶች ሊያመርት የሚገባው መርሃ ግብር ነው።

## ሚኒስቴሩ አሁን ምን እየገነባ ነው

በሪፖርቱ መሠረት፣ በ2023 በዋና ዳይሬክተሩ የተቋቋመ አማካሪ ኮሚቴ በ2023–2024 ሠርቷል፣ በ2024 ደግሞ ልዩ የመርሃ ግብር መሪ ተሾመ። ኮሚቴው ለ2024–2026 የሥራ ዕቅድ መሠረት የሆኑ ግቦችን አስቀምጧል፦

- የቋንቋ ተደራሽነትና የመብት ተጠቃሚነት ሥርዓት፣ በውስጡም የአገናኞች ቡድን፤
- ሥር የሰደዱ በሽታዎችን መቀነስ፤
- የአእምሮ ጤና ይዘቶችን ማስማማትና ሆስፒታል መተኛትን መቀነስ፤
- የሴቶች ጤና — ያልተፈለገ እርግዝና ማቋረጥን መቀነስና ስለ ጡት ካንሰር ግንዛቤ ማሳደግ፤
- የስትሮክ (CVA) ማወቅና የተስማማ የማገገሚያ መርሃ ግብር፤
- **በማህበረሰቡና በጤና ሥርዓቱ መካከል መተማመንን ለማሳደግ ሞዴል መገንባት።**

የመጨረሻው ግብ፣ በመንግሥት ሰነድ ቋንቋ፣ ችግሩ የቋንቋ ብቻ አለመሆኑን መቀበል ነው።

ሪፖርቱ የጤና ሚኒስቴር በጀት በ2024 ሙሉ በሙሉ (100%) መዋሉንና ሚኒስቴሩ በ2024 ወደ የመንግሥት ውሳኔ 787 በ20 ልዩ መርሃ ግብሮች መመለሱን ይገልጻል።

## ነገ ጠዋት ለእርስዎ ምን ማለት ነው

1. **በጤና ድርጅት ውስጥ አገናኝ መብት ነው፣ ውለታ አይደለም።** ድርጅትዎ የባህል አገናኝ ካለው እንዲገኝ መጠየቅ ይችላሉ። ከሌለ ሠራተኞቹ የጤና ሚኒስቴርን የትርጉም ማዕከል እንዲጠቀሙ መጠየቅ ይችላሉ። እንዴት እንደሚደረግ በ[የአእምሮ ጤና የቋንቋ ተደራሽነት መመሪያችን](/am/health/mental-health/interpreter) አብራርተናል።
2. **በጽሑፍ የቀረበ ጥያቄ ከቃል ይበልጣል።** SMS ወይም በመተግበሪያ የተላከ መልእክት ማስረጃ ይተዋል።
3. **የBRCA 1,2 ምርመራ ወደ ጤና ቅርጫቱ ገብቷል**፣ በሪፖርቱ መሠረትም በአማርኛ የመረጃ ወረቀቶች ተዘጋጅተዋል።

## ሪፖርቱ የማይናገረው

ሪፖርቱ ውጤቶችን ሳይሆን ውጤቶችን — ስንት አገናኝ፣ ስንት መርሃ ግብር፣ ስንት በጀት — ይዘግባል። ስንት ታካሚ አስተርጓሚ ጠይቆ እንዳገኘ፣ ስንቱም ጠይቆ እንዳላገኘ አይዘግብም። ዋናው መሥሪያ ቤት ራሱ «ከግብዓት ክትትል ወደ ውጤትና ተጽዕኖ መለካት» መሸጋገር እንደሚያስፈልግ ጽፏል።

ምንጭ፦ [የጠቅላይ ሚኒስትር ጽ/ቤት — የኢትዮጵያ ተወላጆች መዋሃድ መንግሥታዊ መርሃ ግብር፣ የ2023–2024 ማጠቃለያ ሪፖርት፣ ጥር 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) · በመስከረም 2026 ተረጋግጧል።

## ምንጮች

- [የጠቅላይ ሚኒስትር ጽ/ቤት — «የኢትዮጵያ ተወላጆች መዋሃድ መንግሥታዊ መርሃ ግብር፦ የ2023-2024 የእንቅስቃሴ ማጠቃለያ ሪፖርት»፣ ጥር 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) — «የጤና ሚኒስቴር» ምዕራፍ፣ ገጽ 42–44
- [የአእምሮ ጤና የቋንቋ ተደራሽነት መመሪያችን](/am/health/mental-health/interpreter)
- [የትድሮስ የጤና ማዕከል](/am/health)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "welfare-services-ethiopian-families-report-2026",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["family", "rights"],
    title: {
      he: "643 ילדים הוצאו מהבית ב-2024 לעומת 491 ב-2019 — ומספר המשפחות בשירותי הרווחה בקהילה שולש",
      en: "643 children removed from home in 2024 versus 491 in 2019 — while the number of families using community welfare services tripled",
      am: "በ2024 643 ልጆች ከቤት ወጥተዋል፣ በ2019 491 ነበሩ — በማህበረሰብ የበጎ አድራጎት አገልግሎት ያሉ ቤተሰቦች ቁጥር ግን ሦስት እጥፍ ሆኗል",
    },
    excerpt: {
      he: "פרק הרווחה בדוח הממשלתי שפורסם בינואר 2026 מציג שתי מגמות מנוגדות: זינוק במספר המשפחות שמשתמשות בשירותי הרווחה הרגילים בקהילה, ובמקביל עלייה במספר הילדים שהוצאו מהבית ובשיעור הצעירים בשירות המבחן לנוער. הנה מה שכתוב שם, ומה אפשר לעשות עם זה.",
      en: "The welfare chapter of the government report published in January 2026 shows two opposing trends: a jump in the number of families using ordinary community welfare services, and at the same time a rise in children removed from home and in the share of young people under youth probation. Here is what it says, and what you can do with it.",
      am: "በጥር 2026 የታተመው የመንግሥት ሪፖርት የበጎ አድራጎት ምዕራፍ ሁለት ተቃራኒ አዝማሚያዎችን ያሳያል፦ በማህበረሰብ የበጎ አድራጎት አገልግሎቶች የሚጠቀሙ ቤተሰቦች ቁጥር መጨመርና በተመሳሳይ ጊዜ ከቤት የወጡ ልጆች ቁጥር መጨመር።",
    },
    bodies: {
      he: `דוח הסיכום של התוכנית הממשלתית לשילוב יוצאי אתיופיה לשנים 2023–2024, שפרסם משרד ראש הממשלה בינואר 2026, כולל פרק על משרד הרווחה והביטחון החברתי. הפרק הזה מכיל את הנתונים הקשים ביותר בדוח.

## שלושה מספרים

הדוח מציג טבלת יעדים שמשווה בין 2019 ל-2024:

| יעד | 2019 | 2024 |
| --- | --- | --- |
| ילדים המוצאים מבתיהם למסגרות חוץ-ביתיות ואומנה | 491 | 643 |
| אחוז יוצאי אתיופיה המטופלים בשירות המבחן לנוער | 1.5% | 2.4% |
| משפחות ויחידים המשולבים בשירותי הרווחה הקיימים בקהילה (תוכניות לא ייחודיות) | 3,120 | 9,986 |

השורה השלישית היא הצלחה מוצהרת של מדיניות: מאז 2021 משרד הרווחה עבר במכוון מ"תוכניות ייחודיות ליוצאי אתיופיה" לשילוב במענים האוניברסליים, והרחיב את התוכנית ל-23 רשויות שבהן מונו מנהלי תוכנית במחלקות לשירותים חברתיים ומלווי משפחות לסיוע במיצוי זכויות. יותר משפחות מגיעות לשירות שממילא מגיע להן.

שתי השורות הראשונות הן כישלון מוצהר. הדוח כותב זאת במפורש: "בשנת 2024 ניתן לזהות עלייה במספר הילדים שהוצאו למסגרות חוץ-ביתיות ואומנה ועלייה באחוז יוצאי אתיופיה המטופלים בשירות המבחן לנוער. כלומר בהקשר זה, היעד טרם הושג."

ההסבר שהדוח נותן: המציאות של החברה הישראלית בשנים האחרונות — הקורונה ומלחמת "חרבות ברזל" — ו"הידרדרות במצבם הנפשי של ילדים ובני נוער ללא קשר למוצאם".

## מה מופעל בפועל

טבלת המשתתפים בתוכניות משרד הרווחה ב-2024:

- **הכשרות לאנשי מקצוע** — 524 משתתפים (בוצע במלואו)
- **משפחה תומכת** — 221 משתתפים (בוצע במלואו)
- **עו"ס מתכלל ומלווה משפחה** — 44 מתוך 56 תקנים (בוצע באופן חלקי)
- **תוכניות להגדלת השילוב בשירותי הרווחה** — 9,771 משתתפים (בוצע במלואו)
- **טיפול בטראומה לעולים מאתיופיה דרך סודאן** — 70 משתתפים (בוצע במלואו)

השורה של 44 מתוך 56 תקנים חשובה, כי היא מסבירה למה יש תור. הדוח כותב: המשרד לא ניצל את תקציבו במלואו "כיוון שיש קושי באיוש תקנים של עובדים סוציאליים". התקציב היה שם; העובדים לא היו.

## מה זה אומר לכם

1. **מלווה משפחה למיצוי זכויות הוא שירות שקיים ב-23 רשויות.** אם אתם באחת מהן, אפשר לשאול במחלקה לשירותים חברתיים ברשות שלכם אם יש מנהל/ת תוכנית או מלווה משפחה, ולבקש הפניה. זה לא "טיפול" — זה עזרה למלא טפסים ולהגיע למה שמגיע לכם.
2. **פנייה לשירותי רווחה איננה סיכון לילדים שלכם.** הדוח כולו בנוי על ההנחה ההפוכה: המדינה מנסה להגדיל את השימוש בשירותים בקהילה **כדי** להימנע מהוצאה למסגרת חוץ-ביתית. השורה של 9,986 משפחות היא היעד, לא האזהרה.
3. **תוכנית הטראומה לעולים דרך סודאן קיימת.** אם עברתם את המסע דרך סודאן, או שהוריכם עברו אותו, זו מסגרת מוכרת ומתוקצבת — 70 אנשים השתתפו בה ב-2024. שווה לשאול עליה במחלקה לשירותים חברתיים.

## על אלימות במשפחה

בכל מצב של אלימות במשפחה — הקו הארצי של משרד הרווחה והביטחון החברתי הוא **118**, פעיל 24 שעות ביממה, וכולל מענה באמהרית. בסכנה מיידית — **100**. פירטנו את המסלול המלא ב[מדריך שלנו על אלימות במשפחה](/he/family/domestic-violence).

## מקורות

- [משרד ראש הממשלה, המטה לשילוב יוצאי אתיופיה — "התוכנית הממשלתית לשילוב יוצאי אתיופיה: דוח סיכום פעילות לשנים 2023-2024", ינואר 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) — פרק "משרד הרווחה והבטחון החברתי", עמ' 40–41
- [החלטת ממשלה 787, 17.7.2023 — כפי שמצוטטת בדוח](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf)
- [מרכז המשפחה של טדרוס](/he/family/domestic-violence)`,
      en: `The summary report of the government programme for the integration of Ethiopian-Israelis for 2023–2024, published by the Prime Minister's Office in January 2026, includes a chapter on the Ministry of Welfare and Social Security. That chapter carries the hardest numbers in the report.

## Three numbers

The report presents a target table comparing 2019 with 2024:

| Target | 2019 | 2024 |
| --- | --- | --- |
| Children removed from home to out-of-home placements and foster care | 491 | 643 |
| Share of Ethiopian-Israelis handled by the youth probation service | 1.5% | 2.4% |
| Families and individuals integrated into existing community welfare services (non-dedicated programmes) | 3,120 | 9,986 |

The third row is a declared policy success: since 2021 the welfare ministry deliberately moved away from "programmes unique to Ethiopian-Israelis" toward integration into universal services, expanding the programme to 23 local authorities where programme managers were appointed in the social services departments alongside family accompaniers who help people claim what they are owed. More families are reaching a service they were entitled to anyway.

The first two rows are a declared failure. The report says so plainly: "in 2024 an increase can be identified in the number of children removed to out-of-home and foster settings and an increase in the share of Ethiopian-Israelis handled by the youth probation service. In this respect the target has not yet been achieved."

The explanation the report offers: the reality of Israeli society in recent years — COVID and the "Iron Swords" war — and "a deterioration in the mental state of children and adolescents regardless of their origin".

## What is actually running

Participants in the welfare ministry's programmes in 2024:

- **Training for professionals** — 524 participants (delivered in full)
- **Supportive family** — 221 participants (delivered in full)
- **Integrating/accompanying family social worker** — 44 of 56 posts (partly delivered)
- **Programmes to increase uptake of welfare services** — 9,771 participants (delivered in full)
- **Trauma treatment for immigrants who came via Sudan** — 70 participants (delivered in full)

The 44-of-56 line matters, because it explains the waiting list. The report writes that the ministry did not fully use its budget "because of difficulty in filling social worker posts". The budget was there; the staff were not.

## What this means for you

1. **A family accompanier for claiming entitlements exists in 23 local authorities.** If you live in one, you can ask your municipal social services department whether there is a programme manager or family accompanier and request a referral. This is not "treatment" — it is help filling in forms and reaching what is yours.
2. **Approaching welfare services is not a risk to your children.** The entire report is built on the opposite premise: the state is trying to increase use of community services **in order** to avoid out-of-home placement. The 9,986 line is the goal, not the warning.
3. **The trauma programme for those who came via Sudan exists.** If you made the journey through Sudan, or your parents did, this is a recognised and funded framework — 70 people took part in 2024. It is worth asking about at your social services department.

## On domestic violence

In any situation of domestic violence, the national line of the Ministry of Welfare and Social Security is **118**, operating 24 hours a day and including service in Amharic. In immediate danger — **100**. We set out the full route in [our domestic violence guide](/en/family/domestic-violence).

## Sources

- [Prime Minister's Office, Headquarters for the Integration of Ethiopian-Israelis — "The government programme for the integration of Ethiopian-Israelis: activity summary report 2023-2024", January 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) — "Ministry of Welfare and Social Security" chapter, pp. 40–41
- [Government Decision 787, 17 July 2023 — as cited in the report](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf)
- [The Tedros family hub](/en/family/domestic-violence)`,
      am: `የጠቅላይ ሚኒስትር ጽ/ቤት በጥር 2026 ያሳተመው የ2023–2024 ማጠቃለያ ሪፖርት የበጎ አድራጎትና ማህበራዊ ደህንነት ሚኒስቴር ምዕራፍ አለው። ይህ ምዕራፍ በሪፖርቱ ውስጥ በጣም ከባዱን አኃዞች ይዟል።

## ሦስት ቁጥሮች

ሪፖርቱ 2019ን ከ2024 የሚያነጻጽር ሰንጠረዥ ያቀርባል፦

| ግብ | 2019 | 2024 |
| --- | --- | --- |
| ከቤት ወደ ውጭ ተቋማትና ማሳደጊያ የወጡ ልጆች | 491 | 643 |
| በወጣቶች ፕሮቤሽን አገልግሎት የሚስተናገዱ የኢትዮጵያ ተወላጆች መቶኛ | 1.5% | 2.4% |
| በነባር የማህበረሰብ የበጎ አድራጎት አገልግሎቶች የተካተቱ ቤተሰቦችና ግለሰቦች | 3,120 | 9,986 |

ሦስተኛው መስመር የታወጀ የፖሊሲ ስኬት ነው፦ ከ2021 ጀምሮ ሚኒስቴሩ ከ«ለኢትዮጵያ ተወላጆች ብቻ ከሚሆኑ መርሃ ግብሮች» ወደ ሁሉን አቀፍ አገልግሎቶች ሆን ብሎ ተሸጋግሯል፣ መርሃ ግብሩንም ወደ 23 የአካባቢ አስተዳደሮች አስፋፍቷል።

የመጀመሪያዎቹ ሁለት መስመሮች የታወጀ ውድቀት ናቸው። ሪፖርቱ በግልጽ ይላል፦ «በ2024 ከቤት ወደ ውጭ ተቋማት የወጡ ልጆች ቁጥር መጨመርና በወጣቶች ፕሮቤሽን የሚስተናገዱ መቶኛ መጨመር ይታያል። በዚህ ረገድ ግቡ ገና አልተሳካም።»

## በተግባር ምን እየሠራ ነው

በ2024 የበጎ አድራጎት ሚኒስቴር መርሃ ግብሮች ተሳታፊዎች፦

- **ለሙያተኞች ሥልጠና** — 524 ተሳታፊዎች (ሙሉ በሙሉ ተፈጽሟል)
- **ደጋፊ ቤተሰብ** — 221 ተሳታፊዎች (ሙሉ በሙሉ ተፈጽሟል)
- **ቤተሰብ አጃቢ ማህበራዊ ሠራተኛ** — ከ56 ቦታዎች 44 (በከፊል ተፈጽሟል)
- **በበጎ አድራጎት አገልግሎቶች ተሳትፎን ለማሳደግ መርሃ ግብሮች** — 9,771 ተሳታፊዎች
- **በሱዳን በኩል ለመጡ የስነ ልቦና ጉዳት ሕክምና** — 70 ተሳታፊዎች

ከ56 44 የሚለው መስመር ወረፋ ለምን እንዳለ ያብራራል። ሪፖርቱ ሚኒስቴሩ በጀቱን ሙሉ በሙሉ አለመጠቀሙን «የማህበራዊ ሠራተኞች ቦታዎችን በመሙላት ችግር ስላለ» ይላል።

## ለእርስዎ ምን ማለት ነው

1. **የመብት ተጠቃሚነት ቤተሰብ አጃቢ በ23 የአካባቢ አስተዳደሮች አለ።** በአንዱ ውስጥ ከሆኑ በማህበራዊ አገልግሎት መምሪያዎ ላይ መጠየቅ ይችላሉ።
2. **ወደ በጎ አድራጎት አገልግሎት መቅረብ ለልጆችዎ አደጋ አይደለም።** ሪፖርቱ በተቃራኒው መነሻ ላይ የተገነባ ነው፦ መንግሥት ከቤት ማውጣትን **ለማስቀረት** የማህበረሰብ አገልግሎቶችን አጠቃቀም ለማሳደግ እየሞከረ ነው።
3. **በሱዳን በኩል ለመጡ የስነ ልቦና ጉዳት መርሃ ግብር አለ።** በሱዳን በኩል ጉዞውን ካደረጉ ወይም ወላጆችዎ ካደረጉ፣ ይህ የታወቀና በጀት የተመደበለት ማዕቀፍ ነው።

## ስለ ቤት ውስጥ ጥቃት

በማንኛውም የቤት ውስጥ ጥቃት ሁኔታ — የበጎ አድራጎትና ማህበራዊ ደህንነት ሚኒስቴር አገር አቀፍ መስመር **118** ነው፣ በቀን 24 ሰዓት የሚሠራ ሲሆን በአማርኛም ምላሽ ይሰጣል። አፋጣኝ አደጋ ላይ ከሆኑ — **100**። ሙሉውን መንገድ በ[የቤት ውስጥ ጥቃት መመሪያችን](/am/family/domestic-violence) አብራርተናል።

## ምንጮች

- [የጠቅላይ ሚኒስትር ጽ/ቤት — «የኢትዮጵያ ተወላጆች መዋሃድ መንግሥታዊ መርሃ ግብር፦ የ2023-2024 ማጠቃለያ ሪፖርት»፣ ጥር 2026](https://www.gov.il/BlobFolder/news/ethiopia080126/he/file_ethiopia080126.pdf) — «የበጎ አድራጎትና ማህበራዊ ደህንነት ሚኒስቴር» ምዕራፍ፣ ገጽ 40–41
- [የትድሮስ የቤተሰብ ማዕከል](/am/family/domestic-violence)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "over-policing-hearing-and-missing-data-2026",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["rights"],
    title: {
      he: "המשטרה הפסיקה למסור נתוני אכיפה מ-2023 — וזו הסיבה שקשה להוכיח מה שכולם רואים",
      en: "The police stopped releasing enforcement data in 2023 — which is why what everyone sees is hard to prove",
      am: "ፖሊስ ከ2023 ጀምሮ የማስፈጸሚያ መረጃ መስጠት አቁሟል — ሁሉም የሚያየው ነገር ለማስረዳት የከበደው ለዚህ ነው",
    },
    excerpt: {
      he: "בינואר 2026 נשמעו בכנסת עדויות הורים על אלימות שוטרים כלפי ילדיהם. ביוני 2026 פרסם ynet תחקיר שלפיו המשטרה אינה מוסרת נתוני אכיפה מאז 2023. מסמך מרכז המחקר של הכנסת מ-2024 הוא עדיין הנתון הרשמי האחרון — והנה מה שכתוב בו.",
      en: "In January 2026 the Knesset heard parents testify about police violence against their children. In June 2026 Ynet published an investigation reporting that the police have released no enforcement data since 2023. A 2024 Knesset Research Center paper is still the last official figure — here is what it says.",
      am: "በጥር 2026 በኔሴት ወላጆች በልጆቻቸው ላይ ስለደረሰ የፖሊስ ጥቃት መስክረዋል። በሰኔ 2026 ይኔት ፖሊስ ከ2023 ጀምሮ የማስፈጸሚያ መረጃ አለመስጠቱን የሚገልጽ ምርመራ አሳተመ።",
    },
    bodies: {
      he: `## מה קרה בכנסת בינואר

ב-6 בינואר 2026 דיווחה אפרת פורשר בוואלה על דיון בוועדה מיוחדת בכנסת, ביוזמת ח"כ פנינה תמנו-שטה, שבו נשמעו עדויות הורים על יחס שוטרים לילדיהם. בין העדויות שדווחו: אם שסיפרה שבנה, נכה צה"ל, הוכה בידי שוטרים ונשאר במעצר; הורה שסיפר על ילד בן 12 ש"מפחד לצאת מהבית"; אב שתיאר שוטרים ששלפו נשק במעצר בנו בחשד לגניבת קורקינט שהיה שלו; וגבר בן 30 שתיאר שירו בו טייזר כשהיה אזוק, אחרי שהגיע להגיש תלונה.

לפי אותו דיווח, דובר המשטרה אריה דורון הזכיר בתגובה את היחידה הייעודית לקשרי הקהילה ואת תמיכת המשטרה בחקיקה למחיקת הרישום הפלילי. תמנו-שטה אמרה באותו דיון שהיא מתדרכת את ילדה מגיל 7 בכל פעם שהוא יוצא מהבית.

## מה קרה בתחקיר ביוני

ב-19 ביוני 2026 פרסם גיא אסיף ב-ynet תחקיר על אכיפה משטרתית כלפי יוצאי אתיופיה. שני ממצאים ממנו:

- **המשטרה אינה מוסרת נתוני אכיפה מאז 2023.** גורם במרכז המחקר והמידע של הכנסת נמסר בתחקיר כאומר שלא התקבלו תשובות מהמשטרה במשך חודשים.
- לפי הנתונים שכן הוצגו בתחקיר: יוצאי אתיופיה מהווים כ-2.2% מהאוכלוסייה היהודית בישראל אך כ-9% מכלל מעצרי הקטינים; ולמעלה מ-50% מתיקי החקירה שנפתחו נגד יוצאי אתיופיה נסגרו מחוסר ראיות מספיקות — שיעור גבוה בכ-5% מזה שבאוכלוסייה היהודית הכללית.

בתגובה שפורסמה בתחקיר מנה המשרד לביטחון לאומי הישגים בתקופת השר איתמר בן גביר, ובהם חוק מחיקת הרישומים מיולי 2024, גיוס 170 שוטרים יוצאי אתיופיה ב-2024 לעומת 46 ב-2021, והקמת יחידה ייעודית לשיטור קהילתי. המשטרה מסרה שהיא דוחה מכל וכל הצגה מוטה, והפנתה להכשרות ולתוכניות קהילתיות שהופעלו מאז 2021.

## הנתון הרשמי האחרון

כשמערכת מפסיקה לפרסם, מה שנשאר הוא הפרסום האחרון. זהו מסמך מרכז המחקר והמידע של הכנסת "נתוני אכיפה כלפי יוצאי אתיופיה בשנים 2019–2023", מאת ד"ר נורית יכימוביץ-כהן, מיום 21 במאי 2024. הוא הוכן לבקשת ח"כ צגה מלכו, כרקע לדיוני ועדת החוקה בהצעת חוק מחיקת הרישומים.

מה שכתוב בו, בכל אחת מהשנים 2019–2023:

- יוצאי אתיופיה הם **2.2%** מכלל היהודים בישראל.
- שיעורם בכלל העצורים היהודים: **8%–9%**.
- שיעורם במעצרים בגין "עבירות מגע" (תקיפת שוטר, תקיפת שוטר בנסיבות מחמירות, הכשלת שוטר): **10%–12%**.
- שיעורם מקרב החשודים בכלל תיקי החקירה: **5%–6%**; בתיקי עבירות מגע: **9%–11%**.

המסמך עצמו מציין שהגרסה שפורסמה מחליפה גרסה קודמת, ושחלק מנתוני עבירות המגע הוסרו ממנו "עקב איתור טעות בנתונים שהמשטרה העבירה".

## למה זה חשוב מעבר למספרים

שנתיים וחצי בלי נתונים חדשים אינן רק בעיה מחקרית. הן קובעות מי נושא בנטל ההוכחה. בלי סדרת נתונים מתעדכנת, כל תלונה חוזרת להיות סיפור אישי מול הכחשה מוסדית — וזה בדיוק המבנה שבו עדות של הורה בוועדה נשמעת כרגש, ותגובת דובר נשמעת כעובדה.

## מה לעשות בעצירה ברחוב

- אתם רשאים לשאול **על מה אתם מעוכבים**. פירטנו את הזכויות והנוסחים המדויקים ב[מדריך העיכוב ברחוב שלנו](/he/voice/street-stop).
- להתלונן על התנהגות שוטר — הנתיבים והכתובות מרוכזים ב[מדריך התנהלות מול שוטרים](/he/voice/police-conduct).
- אם נפתח נגדכם תיק בעבר על עבירות הפרת סדר — ייתכן שהוא נמחק בחוק מ-2024. בדקו ב[עמוד מחיקת הרישום הפלילי](/he/rights/criminal-record-expungement).

> המידע כאן הוא מידע כללי ואינו ייעוץ משפטי. במקרה קונקרטי — פנו לעורך דין או לסיוע משפטי.

## מקורות

- [וואלה חדשות, 6.1.2026 — אפרת פורשר, "הורים לצעירים יוצאי אתיופיה שחוו אלימות משטרתית"](https://news.walla.co.il/item/3807037)
- [ynet, ‏19.6.2026 — גיא אסיף, "גזענות המשטרה נגד יוצאי אתיופיה לא נעלמה. היא רק שינתה צורה"](https://www.ynet.co.il/news/article/yokra14801640)
- [מרכז המחקר והמידע של הכנסת — ד"ר נורית יכימוביץ-כהן, "נתוני אכיפה כלפי יוצאי אתיופיה בשנים 2019–2023", 21.5.2024](https://fs.knesset.gov.il/25/law/25_ls_mmm_4436954.pdf)`,
      en: `## What happened in the Knesset in January

On 6 January 2026 Efrat Forcher reported in Walla on a special Knesset committee hearing, convened at the initiative of MK Pnina Tamano-Shata, at which parents testified about how police treated their children. Among the testimonies reported: a mother who said her son, a disabled IDF veteran, was beaten by officers and remained in custody; a parent who described a 12-year-old who "is afraid to leave home"; a father who described officers drawing weapons during his son's arrest over a scooter that belonged to the boy; and a 30-year-old man who described being tasered while handcuffed, after coming in to file a complaint.

Per that report, police spokesperson Arieh Doron pointed in response to the dedicated community-relations unit and to police support for the records-expungement legislation. Tamano-Shata said at the hearing that she briefs her own child, from age seven, every time he leaves the house.

## What the June investigation found

On 19 June 2026 Gai Asif published an investigation in Ynet into police enforcement against Ethiopian-Israelis. Two findings from it:

- **The police have released no enforcement data since 2023.** A figure at the Knesset Research and Information Center is quoted in the piece as saying no answers had been received from the police for months.
- Of the data the piece did present: Ethiopian-Israelis are around 2.2% of Israel's Jewish population but around 9% of all youth arrests; and more than 50% of investigation files opened against Ethiopian-Israelis were closed for insufficient evidence — about 5% higher than the rate in the general Jewish population.

In the response published in the piece, the National Security Ministry listed achievements under Minister Itamar Ben Gvir, among them the July 2024 records-deletion law, the recruitment of 170 Ethiopian-Israeli officers in 2024 against 46 in 2021, and the establishment of a dedicated community-policing unit. The police said they firmly reject any biased portrayal, and pointed to training and community programmes run since 2021.

## The last official figure

When a system stops publishing, what is left is the last publication. That is the Knesset Research and Information Center paper "Enforcement data concerning Ethiopian-Israelis, 2019–2023", by Dr Nurit Yachimovich-Cohen, dated 21 May 2024. It was prepared at the request of MK Tsega Melaku, as background for the Constitution Committee's debate on the records-deletion bill.

What it says, in each of the years 2019–2023:

- Ethiopian-Israelis are **2.2%** of all Jews in Israel.
- Their share of all Jewish detainees: **8%–9%**.
- Their share of arrests for "contact offences" (assaulting an officer, aggravated assault of an officer, obstructing an officer): **10%–12%**.
- Their share of suspects across all investigation files: **5%–6%**; in contact-offence files: **9%–11%**.

The paper itself notes that the published version replaces an earlier one, and that some contact-offence data were removed from it "following the identification of an error in the data transmitted by the police".

## Why this matters beyond the numbers

Two and a half years without fresh data is not only a research problem. It decides who carries the burden of proof. Without an updated data series, every complaint reverts to being a personal story against an institutional denial — which is exactly the structure in which a parent's testimony at a committee sounds like emotion, and a spokesperson's response sounds like fact.

## What to do in a street stop

- You are entitled to ask **what you are being detained for**. We set out the rights and the exact wording in [our street-stop guide](/en/voice/street-stop).
- To complain about an officer's conduct, the routes and addresses are gathered in [our guide to dealing with police](/en/voice/police-conduct).
- If a file was opened against you in the past for public-order offences, it may have been deleted by the 2024 law. Check on [our criminal-record deletion page](/en/rights/criminal-record-expungement).

> This is general information and not legal advice. In a specific case, consult a lawyer or legal aid.

## Sources

- [Walla News, 6 Jan 2026 — Efrat Forcher, "Parents of young Ethiopian-Israelis who experienced police violence"](https://news.walla.co.il/item/3807037)
- [Ynet, 19 June 2026 — Gai Asif, "Police racism against Ethiopian-Israelis has not disappeared. It has only changed shape"](https://www.ynet.co.il/news/article/yokra14801640)
- [Knesset Research and Information Center — Dr Nurit Yachimovich-Cohen, "Enforcement data concerning Ethiopian-Israelis, 2019–2023", 21 May 2024](https://fs.knesset.gov.il/25/law/25_ls_mmm_4436954.pdf)`,
      am: `## በጥር በኔሴት ምን ተከሰተ

በጥር 6፣ 2026 ኤፍራት ፎርሸር በዋላ ላይ በኔሴት ልዩ ኮሚቴ ስለተካሄደ ውይይት ዘግባለች። ውይይቱ በኔሴት አባል ፒኒና ተምኑ-ሻጣ ተነሳሽነት የተጠራ ሲሆን ወላጆች ፖሊስ ልጆቻቸውን እንዴት እንደያዘ መስክረዋል። ከተዘገቡት ምስክርነቶች መካከል፦ ልጇ የጦር ሠራዊት አካል ጉዳተኛ ሆኖ በፖሊስ እንደተደበደበና በእስር እንደቀረ የተናገረች እናት፤ ባለ12 ዓመት ልጅ «ከቤት ለመውጣት እንደሚፈራ» የገለጸ ወላጅ፤ የልጁ የነበረውን ስኩተር በመስረቅ ጥርጣሬ ፖሊሶች መሣሪያ እንደመዘዙ የገለጸ አባት፤ እና ቅሬታ ለማቅረብ ከመጣ በኋላ በካቴና ታስሮ ሳለ ቴዘር እንደተተኮሰበት የተናገረ የ30 ዓመት ወንድ።

በዚያው ዘገባ መሠረት፣ የፖሊስ ቃል አቀባይ አርየ ዶሮን በምላሹ ስለ ማህበረሰብ ግንኙነት ልዩ ክፍልና ፖሊስ የወንጀል ሪከርድ ስረዛ ሕግን ስለመደገፉ ጠቅሷል።

## በሰኔ ምርመራው ምን አገኘ

በሰኔ 19፣ 2026 ጋይ አሲፍ በይኔት ላይ በኢትዮጵያ ተወላጆች ላይ ስለሚደረግ የፖሊስ ማስፈጸሚያ ምርመራ አሳተመ። ሁለት ግኝቶች፦

- **ፖሊስ ከ2023 ጀምሮ የማስፈጸሚያ መረጃ አልሰጠም።** በኔሴት የምርምርና መረጃ ማዕከል ውስጥ ያለ ባለሙያ ለወራት ከፖሊስ ምላሽ እንዳልደረሰው ተጠቅሷል።
- በዘገባው ከቀረቡት መረጃዎች፦ የኢትዮጵያ ተወላጆች ከእስራኤል አይሁድ ሕዝብ 2.2% ገደማ ሲሆኑ ከወጣቶች እስራት ግን 9% ገደማ ናቸው፤ በኢትዮጵያ ተወላጆች ላይ ከተከፈቱ የምርመራ መዝገቦች ከ50% በላይ በበቂ ማስረጃ እጦት ተዘግተዋል — ከጠቅላላው የአይሁድ ሕዝብ በ5% ገደማ የሚበልጥ።

በዘገባው በወጣው ምላሽ የብሔራዊ ደህንነት ሚኒስቴር በሚኒስትር ኢታማር ቤን ግቪር ጊዜ የተገኙ ውጤቶችን ዘርዝሯል — የሐምሌ 2024 የሪከርድ ስረዛ ሕግ፣ በ2024 170 የኢትዮጵያ ተወላጅ ፖሊሶች መቀጠር (በ2021 46 ነበሩ)፣ እና ልዩ የማህበረሰብ ፖሊስ ክፍል መቋቋም። ፖሊስ ማንኛውንም አድሏዊ አቀራረብ እንደሚቃወም ገልጿል።

## የመጨረሻው ይፋዊ አኃዝ

አንድ ሥርዓት ማተም ሲያቆም የሚቀረው የመጨረሻው ህትመት ነው። ይህም የኔሴት የምርምርና መረጃ ማዕከል «በ2019–2023 በኢትዮጵያ ተወላጆች ላይ የማስፈጸሚያ መረጃ» የሚለው ሰነድ ነው — በዶ/ር ኑሪት ያኪሞቪች-ኮሄን፣ ግንቦት 21፣ 2024። በኔሴት አባል ጼጋ መላኩ ጥያቄ የተዘጋጀ ነው።

በ2019–2023 በእያንዳንዱ ዓመት የሚለው፦

- የኢትዮጵያ ተወላጆች ከእስራኤል አይሁዶች ሁሉ **2.2%** ናቸው።
- ከታሰሩት አይሁዶች ሁሉ ድርሻቸው፦ **8%–9%**።
- «የመነካካት ወንጀሎች» (ፖሊስ ማጥቃት፣ ፖሊስ ማደናቀፍ) እስራት ውስጥ ድርሻቸው፦ **10%–12%**።
- በሁሉም የምርመራ መዝገቦች ከተጠርጣሪዎች ድርሻቸው፦ **5%–6%**፤ በመነካካት ወንጀል መዝገቦች፦ **9%–11%**።

ሰነዱ ራሱ የታተመው ስሪት ቀደም ያለውን እንደሚተካና «ፖሊስ ባስተላለፈው መረጃ ላይ ስህተት በመገኘቱ» የተወሰኑ መረጃዎች እንደተወገዱ ይገልጻል።

## ከቁጥሮች ባሻገር ለምን አስፈላጊ ነው

ሁለት ዓመት ተኩል ያለ አዲስ መረጃ የምርምር ችግር ብቻ አይደለም። የማስረጃ ሸክሙን ማን እንደሚሸከም ይወስናል። የተዘመነ የመረጃ ተከታታይ ከሌለ፣ እያንዳንዱ ቅሬታ ወደ ግላዊ ታሪክ ተመልሶ በተቋማዊ ክህደት ፊት ይቆማል።

## በመንገድ ላይ ሲያቆሙዎት ምን ማድረግ

- **በምን ምክንያት እንደታገዱ** የመጠየቅ መብት አለዎት። መብቶቹንና ትክክለኛዎቹን አገላለጾች በ[የመንገድ ማቆም መመሪያችን](/am/voice/street-stop) አብራርተናል።
- ስለ ፖሊስ ባህርይ ቅሬታ ለማቅረብ — መንገዶቹ በ[ከፖሊስ ጋር የመገናኘት መመሪያችን](/am/voice/police-conduct) ተሰብስበዋል።
- ቀደም ሲል በሕዝብ ሥርዓት ጥሰት መዝገብ ተከፍቶብዎ ከነበረ በ2024 ሕግ ተሰርዞ ሊሆን ይችላል። በ[የወንጀል ሪከርድ ስረዛ ገጻችን](/am/rights/criminal-record-expungement) ይመልከቱ።

> ይህ አጠቃላይ መረጃ ነው እንጂ የሕግ ምክር አይደለም። በተለየ ጉዳይ ጠበቃ ወይም የሕግ እርዳታ ያማክሩ።

## ምንጮች

- [ዋላ ኒውስ፣ ጥር 6፣ 2026 — ኤፍራት ፎርሸር](https://news.walla.co.il/item/3807037)
- [ይኔት፣ ሰኔ 19፣ 2026 — ጋይ አሲፍ](https://www.ynet.co.il/news/article/yokra14801640)
- [የኔሴት የምርምርና መረጃ ማዕከል — ዶ/ር ኑሪት ያኪሞቪች-ኮሄን፣ «በ2019–2023 በኢትዮጵያ ተወላጆች ላይ የማስፈጸሚያ መረጃ»፣ ግንቦት 21፣ 2024](https://fs.knesset.gov.il/25/law/25_ls_mmm_4436954.pdf)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "records-deletion-law-what-it-covers-2026",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["rights"],
    title: {
      he: "חוק מחיקת הרישומים: מה בדיוק נמחק, למי, ולמה עדיין אין מספר",
      en: "The records-deletion law: exactly what is deleted, for whom, and why there is still no number",
      am: "የሪከርድ ስረዛ ሕግ፦ በትክክል ምን ይሰረዛል፣ ለማን፣ እና ለምን እስካሁን ቁጥር የለም",
    },
    excerpt: {
      he: "קראנו את נוסח החוק מסעיף לסעיף. הוא מוחק רישום פלילי ומשטרתי בעבירות הפרת סדר שנעברו עד 31.12.2020, בתנאים מוגדרים, ומחייב את המשטרה לדווח לוועדת החוקה כמה רישומים נמחקו. את הדיווח הזה לא הצלחנו למצוא מפורסם.",
      en: "We read the statute section by section. It deletes criminal and police records for public-order offences committed up to 31 December 2020, on defined conditions, and requires the police to report to the Constitution Committee how many records were deleted. We could not find that report published anywhere.",
      am: "የሕጉን ጽሑፍ ከአንቀጽ አንቀጽ አነበብን። እስከ 31.12.2020 ለተፈጸሙ የሕዝብ ሥርዓት ጥሰት ወንጀሎች የወንጀልና የፖሊስ ሪከርድን ይሰርዛል፣ ፖሊስም ስንት ሪከርድ እንደተሰረዘ ለኮሚቴው እንዲያሳውቅ ያስገድዳል።",
    },
    bodies: {
      he: `חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה, התשפ"ד–2024, התקבל בכנסת ב-16 ביולי 2024 ופורסם בספר החוקים תשפ"ד, עמ' 1094. קראנו את נוסחו המלא. הנה מה שהוא אומר בפועל — ומה עוד לא קרה.

## מי נחשב "יוצא אתיופיה" לעניין החוק

סעיף 1 מגדיר: מי שנולד באתיופיה, **או** שלפחות אחד מהוריו נולד באתיופיה. זו הגדרה רחבה יותר מזו שמשתמשת בה הלמ"ס בסטטיסטיקה, שסופרת רק ילידי ישראל שאביהם יליד אתיופיה.

## מה נמחק

**סעיף 2(א) — רישום פלילי.** פרטי רישום פלילי בעבירות "הפרת הסדר הציבורי" המנויות בתוספת לחוק, **שנעברו עד 31 בדצמבר 2020**, יימחקו — בהתקיים שלושה תנאים במצטבר:

1. לא הוטל מאסר בפועל על אותה עבירה;
2. אין פרט רישום פלילי אחר שתקופות ההתיישנות והמחיקה שלו טרם חלפו;
3. אין פרט רישום משטרתי לפי סעיף 27(א)(1)–(3) לחוק המידע הפלילי.

**סעיף 2(ב) — רישום משטרתי.** פרטי רישום משטרתי לפי סעיף 27(א)(2) לחוק המידע הפלילי, באותן עבירות ובאותה תקופה, יבוטלו — אם אין רישום פלילי או משטרתי אחר שתקופותיו טרם חלפו.

## אילו עבירות

התוספת לחוק מונה סעיפי עבירה מוגדרים: סעיפים 151–158, 216, 275, 287(א), 288, 288א ו-382א(א) לחוק העונשין; סעיף 47(א) לפקודת סדר הדין הפלילי; וסעיף 79(1)(ב) לפקודת המשטרה. אלה סעיפי ההתפרעות, ההפרעה לשוטר והתקיפה שנפתחו בהמוניהם בגלי המחאה.

**מה לא בתוספת:** עבירות מחוץ לרשימה הזו. אם התיק שלכם נפתח בעבירה אחרת — החוק הזה אינו חל עליו, וייתכן שמסלול המחיקה הכללי בחוק המידע הפלילי כן רלוונטי.

## הדיווח שהחוק דורש — ומה מצאנו

סעיף 3 קובע שמשטרת ישראל תמסור לוועדת החוקה, חוק ומשפט של הכנסת, **בתום שישה חודשים מיום תחילתו של החוק**, דיווח על יישום הוראותיו ועל מספר פרטי הרישום שנמחקו או בוטלו לפי סעיף 2, בפירוט לפי סעיפי העבירה.

חיפשנו את הדיווח הזה — באתר הכנסת, בפרוטוקולי ועדת החוקה ובפרסומי המשטרה. **לא מצאנו אותו מפורסם.** אנחנו כותבים זאת כאן במפורש, במקום לנחש מספר: אנחנו לא יודעים כמה רישומים נמחקו בפועל, ואיננו יודעים אם הדיווח נמסר ולא פורסם, או לא נמסר.

בשני פרסומים עיתונאיים מ-2026 הוזכר החוק על ידי גורמים רשמיים — המשרד לביטחון לאומי מנה אותו בין הישגי התקופה (ynet, 19.6.2026), ודובר המשטרה הזכיר את תמיכת המשטרה בחקיקה (וואלה, 6.1.2026) — אך באף אחד מהם לא הופיע מספר הרישומים שנמחקו.

## מה זה אומר לכם

המחיקה לפי החוק אינה תלויה בהגשת בקשה: הסעיף מנוסח כמחיקה, לא כזכות להגיש בקשה. אבל **בדיקה של המצב בפועל היא באחריותכם**, ושווה לעשות אותה לפני ראיון עבודה, גיוס, או בקשה לרישיון.

- בדקו ראשית אם התנאים חלים עליכם ב[עמוד מחיקת הרישום הפלילי שלנו](/he/rights/criminal-record-expungement), שמפרט את התנאים בשאלות פשוטות.
- אם התיק שלכם נפתח אחרי 31.12.2020 — החוק הזה לא חל עליו.

> המידע כאן הוא מידע כללי ואינו ייעוץ משפטי. מצב הרישום שלכם תלוי בנתונים שרק הרשויות רואות. במקרה קונקרטי — פנו לעורך דין או לסיוע משפטי.

## מקורות

- [נוסח החוק — חוק מחיקת רישומים פליליים ומשטרתיים של יוצאי אתיופיה, התשפ"ד–2024 (ויקיטקסט; ס"ח תשפ"ד עמ' 1094, התקבל בכנסת 16.7.2024)](https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%9E%D7%97%D7%99%D7%A7%D7%AA_%D7%A8%D7%99%D7%A9%D7%95%D7%9E%D7%99%D7%9D_%D7%A4%D7%9C%D7%99%D7%9C%D7%99%D7%99%D7%9D_%D7%95%D7%9E%D7%A9%D7%98%D7%A8%D7%AA%D7%99%D7%99%D7%9D_%D7%A9%D7%9C_%D7%99%D7%95%D7%A6%D7%90%D7%99_%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94)
- [מרכז המחקר והמידע של הכנסת — "נתוני אכיפה כלפי יוצאי אתיופיה בשנים 2019–2023", 21.5.2024 (הוכן כרקע לדיוני ועדת החוקה בהצעת החוק)](https://fs.knesset.gov.il/25/law/25_ls_mmm_4436954.pdf)
- [ynet, ‏19.6.2026 — גיא אסיף](https://www.ynet.co.il/news/article/yokra14801640)
- [וואלה חדשות, 6.1.2026 — אפרת פורשר](https://news.walla.co.il/item/3807037)
- [בדיקת הזכאות שלנו](/he/rights/criminal-record-expungement)`,
      en: `The Law for the Deletion of Criminal and Police Records of Ethiopian-Israelis, 5784–2024, passed the Knesset on 16 July 2024 and was published in the statute book (5784, p. 1094). We read the full text. Here is what it actually says — and what has not yet happened.

## Who counts as "of Ethiopian origin" under the law

Section 1 defines it: a person born in Ethiopia, **or** with at least one parent born in Ethiopia. That is broader than the definition the Central Bureau of Statistics uses, which counts Israel-born people only where the father was born in Ethiopia.

## What is deleted

**Section 2(a) — criminal records.** Criminal record entries for the "public order" offences listed in the schedule to the law, **committed up to 31 December 2020**, are deleted — where three conditions hold together:

1. no actual imprisonment was imposed for that offence;
2. there is no other criminal record entry whose limitation and deletion periods have not yet run;
3. there is no police record entry under section 27(a)(1)–(3) of the Criminal Information Law.

**Section 2(b) — police records.** Police record entries under section 27(a)(2) of the Criminal Information Law, for the same offences and the same period, are cancelled — if there is no other criminal or police record whose periods have not yet run.

## Which offences

The schedule lists specific offence sections: sections 151–158, 216, 275, 287(a), 288, 288a and 382a(a) of the Penal Law; section 47(a) of the Criminal Procedure Ordinance; and section 79(1)(b) of the Police Ordinance. These are the riot, obstruction-of-an-officer and assault provisions under which files were opened en masse during the protest waves.

**What is not in the schedule:** offences outside that list. If your file was opened under a different offence, this law does not apply to it, and the general deletion route under the Criminal Information Law may be the relevant one instead.

## The report the law requires — and what we found

Section 3 provides that Israel Police shall submit to the Knesset Constitution, Law and Justice Committee, **within six months of the law's commencement**, a report on implementation and on the number of record entries deleted or cancelled under section 2, itemised by offence section.

We looked for that report — on the Knesset site, in Constitution Committee protocols, and in police publications. **We did not find it published.** We are saying so plainly rather than guessing at a number: we do not know how many records have actually been deleted, and we do not know whether the report was submitted and not published, or not submitted.

Two 2026 news reports quote officials invoking the law — the National Security Ministry listed it among its achievements (Ynet, 19 June 2026), and a police spokesperson referred to police support for the legislation (Walla, 6 January 2026) — but neither carried a figure for records deleted.

## What this means for you

Deletion under the law does not depend on filing an application: the section is drafted as a deletion, not as a right to apply. But **checking your actual status is on you**, and it is worth doing before a job interview, enlistment, or a licence application.

- First check whether the conditions apply to you on [our criminal-record deletion page](/en/rights/criminal-record-expungement), which walks through the conditions as plain questions.
- If your file was opened after 31 December 2020, this law does not cover it.

> This is general information and not legal advice. Your record status depends on data only the authorities can see. In a specific case, consult a lawyer or legal aid.

## Sources

- [The statute — Law for the Deletion of Criminal and Police Records of Ethiopian-Israelis, 5784–2024 (Wikisource; statute book 5784 p. 1094, passed 16 July 2024)](https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%9E%D7%97%D7%99%D7%A7%D7%AA_%D7%A8%D7%99%D7%A9%D7%95%D7%9E%D7%99%D7%9D_%D7%A4%D7%9C%D7%99%D7%9C%D7%99%D7%99%D7%9D_%D7%95%D7%9E%D7%A9%D7%98%D7%A8%D7%AA%D7%99%D7%99%D7%9D_%D7%A9%D7%9C_%D7%99%D7%95%D7%A6%D7%90%D7%99_%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94)
- [Knesset Research and Information Center — "Enforcement data concerning Ethiopian-Israelis, 2019–2023", 21 May 2024 (prepared as background for the Constitution Committee's debate on the bill)](https://fs.knesset.gov.il/25/law/25_ls_mmm_4436954.pdf)
- [Ynet, 19 June 2026 — Gai Asif](https://www.ynet.co.il/news/article/yokra14801640)
- [Walla News, 6 January 2026 — Efrat Forcher](https://news.walla.co.il/item/3807037)
- [Our eligibility check](/en/rights/criminal-record-expungement)`,
      am: `የኢትዮጵያ ተወላጆች የወንጀልና የፖሊስ ሪከርድ ስረዛ ሕግ፣ 5784–2024፣ በሐምሌ 16፣ 2024 በኔሴት ጸድቆ በሕግ መጽሐፍ (5784፣ ገጽ 1094) ታትሟል። ሙሉ ጽሑፉን አነበብን። በተግባር የሚለውና ገና ያልተከናወነው ይኸውና።

## በሕጉ መሠረት «የኢትዮጵያ ተወላጅ» ማን ነው

አንቀጽ 1 ይተረጉመዋል፦ በኢትዮጵያ የተወለደ፣ **ወይም** ቢያንስ አንድ ወላጁ በኢትዮጵያ የተወለደ። ይህ ማዕከላዊ የስታቲስቲክስ ቢሮ ከሚጠቀመው ትርጓሜ ይሰፋል።

## ምን ይሰረዛል

**አንቀጽ 2(ሀ) — የወንጀል ሪከርድ።** በሕጉ አባሪ ውስጥ ለተዘረዘሩ «የሕዝብ ሥርዓት» ወንጀሎች፣ **እስከ ታኅሣሥ 31፣ 2020 ለተፈጸሙ**፣ የወንጀል ሪከርድ መዝገቦች ይሰረዛሉ — ሦስቱ ሁኔታዎች በአንድነት ሲሟሉ፦

1. በዚያ ወንጀል ላይ ትክክለኛ እስራት አልተጣለም፤
2. የይርጋና የስረዛ ጊዜያቸው ያላለፈ ሌላ የወንጀል ሪከርድ የለም፤
3. በወንጀል መረጃ ሕግ አንቀጽ 27(ሀ)(1)–(3) መሠረት የፖሊስ ሪከርድ የለም።

**አንቀጽ 2(ለ) — የፖሊስ ሪከርድ።** በወንጀል መረጃ ሕግ አንቀጽ 27(ሀ)(2) መሠረት ያሉ የፖሊስ ሪከርዶች፣ በተመሳሳይ ወንጀሎችና ጊዜ፣ ይሰረዛሉ — ጊዜያቸው ያላለፈ ሌላ ሪከርድ ከሌለ።

## የትኞቹ ወንጀሎች

አባሪው የተወሰኑ የወንጀል አንቀጾችን ይዘረዝራል፦ የቅጣት ሕግ አንቀጾች 151–158፣ 216፣ 275፣ 287(ሀ)፣ 288፣ 288ሀ እና 382ሀ(ሀ)፤ የወንጀል ሥነ ሥርዓት አዋጅ አንቀጽ 47(ሀ)፤ እና የፖሊስ አዋጅ አንቀጽ 79(1)(ለ)።

**በአባሪው ውስጥ ያልሆነው፦** ከዚህ ዝርዝር ውጭ ያሉ ወንጀሎች። መዝገብዎ በሌላ ወንጀል ከተከፈተ ይህ ሕግ አይመለከተውም።

## ሕጉ የሚጠይቀው ሪፖርት — እና ያገኘነው

አንቀጽ 3 የእስራኤል ፖሊስ **ሕጉ ከጸና ከስድስት ወር በኋላ** ለኔሴት ሕገ መንግሥት፣ ሕግና ፍትሕ ኮሚቴ የአፈጻጸም ሪፖርትና በአንቀጽ 2 መሠረት የተሰረዙ ሪከርዶች ብዛት፣ በወንጀል አንቀጽ ተከፋፍሎ እንዲያቀርብ ይደነግጋል።

ይህን ሪፖርት ፈለግን — በኔሴት ድህረ ገጽ፣ በኮሚቴ ቃለ ጉባኤዎችና በፖሊስ ህትመቶች። **ታትሞ አላገኘነውም።** ቁጥር ከመገመት ይልቅ ይህን በግልጽ እንጽፋለን፦ በተግባር ስንት ሪከርድ እንደተሰረዘ አናውቅም።

ሁለት የ2026 ዘገባዎች ባለሥልጣናት ሕጉን ሲጠቅሱ ያሳያሉ — የብሔራዊ ደህንነት ሚኒስቴር (ይኔት፣ ሰኔ 19፣ 2026) እና የፖሊስ ቃል አቀባይ (ዋላ፣ ጥር 6፣ 2026) — ነገር ግን በሁለቱም የተሰረዙ ሪከርዶች ቁጥር አልቀረበም።

## ለእርስዎ ምን ማለት ነው

በሕጉ መሠረት ስረዛው ማመልከቻ ማቅረብን አይጠይቅም። ነገር ግን **ትክክለኛ ሁኔታዎን ማረጋገጥ የእርስዎ ኃላፊነት ነው** — ከሥራ ቃለ መጠይቅ፣ ከውትድርና ወይም ከፈቃድ ማመልከቻ በፊት ማድረግ ተገቢ ነው።

- መጀመሪያ ሁኔታዎቹ እርስዎን ይመለከቱ እንደሆነ በ[የወንጀል ሪከርድ ስረዛ ገጻችን](/am/rights/criminal-record-expungement) ይመልከቱ።
- መዝገብዎ ከታኅሣሥ 31፣ 2020 በኋላ ከተከፈተ ይህ ሕግ አይሸፍነውም።

> ይህ አጠቃላይ መረጃ ነው እንጂ የሕግ ምክር አይደለም። በተለየ ጉዳይ ጠበቃ ወይም የሕግ እርዳታ ያማክሩ።

## ምንጮች

- [የሕጉ ጽሑፍ — የኢትዮጵያ ተወላጆች የወንጀልና የፖሊስ ሪከርድ ስረዛ ሕግ፣ 5784–2024](https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%9E%D7%97%D7%99%D7%A7%D7%AA_%D7%A8%D7%99%D7%A9%D7%95%D7%9E%D7%99%D7%9D_%D7%A4%D7%9C%D7%99%D7%9C%D7%99%D7%99%D7%9D_%D7%95%D7%9E%D7%A9%D7%98%D7%A8%D7%AA%D7%99%D7%99%D7%9D_%D7%A9%D7%9C_%D7%99%D7%95%D7%A6%D7%90%D7%99_%D7%90%D7%AA%D7%99%D7%95%D7%A4%D7%99%D7%94)
- [የኔሴት የምርምርና መረጃ ማዕከል፣ ግንቦት 21፣ 2024](https://fs.knesset.gov.il/25/law/25_ls_mmm_4436954.pdf)
- [ይኔት፣ ሰኔ 19፣ 2026 — ጋይ አሲፍ](https://www.ynet.co.il/news/article/yokra14801640)
- [ዋላ ኒውስ፣ ጥር 6፣ 2026 — ኤፍራት ፎርሸር](https://news.walla.co.il/item/3807037)
- [የእኛ የብቁነት ማረጋገጫ](/am/rights/criminal-record-expungement)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
  {
    slug: "mental-health-hospitalization-and-rehab-data-2026",
    publishedAt: "2026-09-02",
    updatedAt: "2026-09-02",
    tags: ["health"],
    title: {
      he: "904 אשפוזים, 1,112 סלי שיקום: המספרים שמראים איפה בדיוק הקהילה נופלת בין הכיסאות",
      en: "904 hospitalisations, 1,112 rehabilitation baskets: the numbers that show exactly where the community falls between the chairs",
      am: "904 ሆስፒታል መተኛቶች፣ 1,112 የማገገሚያ ቅርጫቶች፦ ማህበረሰቡ በየትኛው ክፍተት እንደሚወድቅ የሚያሳዩ ቁጥሮች",
    },
    excerpt: {
      he: "מסמך מרכז המחקר והמידע של הכנסת על בריאות יוצאי אתיופיה מציג שני נתונים שצריך לקרוא יחד: ייצוג יתר בקבלות לאשפוז פסיכיאטרי, וייצוג חסר — ויורד — בסל השיקום בקהילה. זה ההבדל בין להיות מטופל לבין להיות מאושפז.",
      en: "The Knesset Research Center paper on the health of Ethiopian-Israelis presents two figures that must be read together: over-representation in psychiatric hospital admissions, and under-representation — falling — in community rehabilitation baskets. That is the difference between being treated and being hospitalised.",
      am: "የኔሴት የምርምርና መረጃ ማዕከል ሰነድ አብረው መነበብ ያለባቸውን ሁለት አኃዞች ያቀርባል፦ በሥነ ልቦና ሆስፒታል መተኛት ከመጠን በላይ መወከል፣ በማህበረሰብ ማገገሚያ ቅርጫት ደግሞ ከመጠን በታች መወከል።",
    },
    bodies: {
      he: `מרכז המחקר והמידע של הכנסת פרסם מסמך נתונים בשם "נתונים על מצב הבריאות של יוצאי אתיופיה", בכתיבת יונת מייזל ובאישור שלי לוי, מיום 10 ביולי 2024. הוא הוכן לבקשת ח"כ צגה צגנש מלכו. קראנו אותו במלואו. פרק בריאות הנפש שבו מכיל שני מספרים שצריך לקרוא זה מול זה.

## המספר הראשון: אשפוז

בשנת 2023 נרשמו בישראל **23,825 קבלות לאשפוז** במוסדות לבריאות הנפש. מתוכן, **כ-3.8% — 904 קבלות — נרשמו ליוצאי אתיופיה**, שהם כ-2% מאוכלוסיית ישראל.

יש כאן גם מגמה חיובית: בין 2019 ל-2023 ירד שיעור הקבלות של יוצאי אתיופיה מ-4.4% ל-3.8%. הפער הצטמצם. הוא לא נסגר.

המסמך מציין שמשרד הבריאות לא מסר נתונים על יוצאי אתיופיה בחלופות אשפוז כמו "בתים מאזנים", מפני שלדבריו אין בידיו נתונים על מקבלי השירות שם.

## המספר השני: שיקום בקהילה

בשנת 2023 חיו בישראל **37,898 מקבלי סל שיקום** במסגרת שיקום נכי נפש בקהילה. מתוכם **כ-2.9% — 1,112 — יוצאי אתיופיה**.

וכאן המגמה הפוכה: שיעור המשתקמים יוצאי אתיופיה מכלל המשתקמים בקהילה **ירד** מ-3.3% ב-2019 ל-2.9% ב-2023. המסמך מציין במפורש שאין בידיו מידע על שיעורם מכלל הזקוקים לשיקום.

## למה שני המספרים האלה יחד הם הסיפור

סל שיקום הוא מה שקורה **לפני** ו**אחרי** אשפוז — דיור, תעסוקה, לימודים, ליווי חברתי. אשפוז הוא מה שקורה כשאין את זה. הקהילה מיוצגת ביתר במקום שבו נכנסים במשבר, ובחסר במקום שמונע את המשבר. זה בדיוק המבנה שמייצר את המספר הראשון.

## נתוני האובדנות שבאותו מסמך

- לפי הלמ"ס, בשנת 2022 שיעור הפטירות מפגיעה עצמית מכוונת ל-100,000 תושבים בקרב יוצאי אתיופיה היה **8.4**, לעומת **3.7** בכלל האוכלוסייה — יותר מפי שניים. ב-2021 הפער היה גדול הרבה יותר: **16.1** לעומת **4.2**.
- לפי משרד הבריאות, בשנים 2019–2021 נרשמו **112** ניסיונות התאבדות מתוקננים לגיל ל-100,000 בקרב עולים מאתיופיה בני עשר ומעלה, לעומת **91** בקרב יהודים ואחרים ללא עולים, ו-**136** בקרב עולים מברית המועצות לשעבר.

## הערת הגדרה שחשוב להכיר

המסמך מזהיר שהלמ"ס ומשרד הבריאות סופרים אוכלוסיות שונות. הלמ"ס כוללת ילידי אתיופיה וילידי ישראל שאביהם נולד באתיופיה — כלומר **לא** כוללת ילידי ישראל שרק אימם ילידת אתיופיה, שהיו 6,144 איש בסוף 2022. חלק מנתוני משרד הבריאות מתייחסים לילידי אתיופיה בלבד. כשמשווים אחוזים בין מקורות, ההגדרה משנה.

בסוף 2022 נמנו עם אוכלוסיית יוצאי אתיופיה בישראל כ-175,000 תושבים — כ-2% מהאוכלוסייה.

## מה אפשר לעשות עם זה

1. **סל שיקום הוא זכות שמבקשים.** הוא מתחיל בפנייה לוועדת סל שיקום אזורית של משרד הבריאות. אם מישהו במשפחה מתמודד עם מצב נפשי מתמשך, זו השאלה שכדאי לשאול את הגורם המטפל — לפני שהמצב מגיע למיון.
2. **באשפוז יש זכויות, וגם זכות למתורגמן.** ריכזנו אותן ב[עמוד זכויות באשפוז פסיכיאטרי](/he/health/mental-health/hospitalization-rights) וב[מדריך הנגישות הלשונית](/he/health/mental-health/interpreter).
3. **אם אתם או מישהו קרוב במצוקה נפשית — ער"ן, קו חם 1201**, לפי אתר העמותה. בסכנת חיים מיידית — **101**.

## מקורות

- [מרכז המחקר והמידע של הכנסת — יונת מייזל, "נתונים על מצב הבריאות של יוצאי אתיופיה", 10.7.2024 (הוכן לבקשת ח"כ צגה צגנש מלכו)](https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf)
- [ער"ן — עזרה ראשונה נפשית, קו חם 1201](https://www.eran.org.il/)
- [זכויות באשפוז פסיכיאטרי](/he/health/mental-health/hospitalization-rights)
- [בריאות הנפש בקהילה](/he/health/mental-health)`,
      en: `The Knesset Research and Information Center published a data paper titled "Data on the health status of Ethiopian-Israelis", written by Yonat Meisel and approved by Shelly Levy, dated 10 July 2024. It was prepared at the request of MK Tsega Tsegenesh Melaku. We read it in full. Its mental-health chapter contains two numbers that need to be read against each other.

## The first number: hospitalisation

In 2023 there were **23,825 admissions** to mental health institutions in Israel. Of those, **around 3.8% — 904 admissions — were of Ethiopian-Israelis**, who are around 2% of Israel's population.

There is a positive trend here too: between 2019 and 2023 the Ethiopian-Israeli share of admissions fell from 4.4% to 3.8%. The gap narrowed. It did not close.

The paper notes that the Health Ministry supplied no data on Ethiopian-Israelis in hospitalisation alternatives such as "balancing houses", because it says it holds no data on who receives that service.

## The second number: community rehabilitation

In 2023, **37,898 people in Israel received a rehabilitation basket** under community rehabilitation for people with psychiatric disability. Of them, **around 2.9% — 1,112 — were Ethiopian-Israelis**.

And here the trend runs the other way: the Ethiopian-Israeli share of all people in community rehabilitation **fell** from 3.3% in 2019 to 2.9% in 2023. The paper states explicitly that it has no information on their share of all those who need rehabilitation.

## Why the two numbers together are the story

A rehabilitation basket is what happens **before** and **after** hospitalisation — housing, employment, study, social accompaniment. Hospitalisation is what happens when that is missing. The community is over-represented where people enter in crisis, and under-represented where crisis is prevented. That is precisely the structure that produces the first number.

## The suicide data in the same paper

- Per the Central Bureau of Statistics, in 2022 the rate of deaths from intentional self-harm per 100,000 residents among Ethiopian-Israelis was **8.4**, against **3.7** in the general population — more than double. In 2021 the gap was far wider: **16.1** against **4.2**.
- Per the Health Ministry, in 2019–2021 there were **112** age-standardised suicide attempts per 100,000 among immigrants from Ethiopia aged ten and over, against **91** among Jews and others excluding immigrants, and **136** among immigrants from the former Soviet Union.

## A definitional note worth knowing

The paper warns that the CBS and the Health Ministry count different populations. The CBS includes people born in Ethiopia and Israel-born people whose father was born in Ethiopia — so it does **not** include Israel-born people whose only Ethiopian-born parent is the mother, who numbered 6,144 at the end of 2022. Some Health Ministry figures refer only to people born in Ethiopia. When comparing percentages across sources, the definition matters.

At the end of 2022 the Ethiopian-Israeli population numbered around 175,000 — about 2% of the population.

## What you can do with this

1. **A rehabilitation basket is a right you ask for.** It starts with an application to a regional Health Ministry rehabilitation-basket committee. If someone in your family is living with an ongoing mental health condition, that is the question to put to their clinician — before things reach an emergency room.
2. **Hospitalisation carries rights, including the right to an interpreter.** We have gathered them on our [psychiatric hospitalisation rights page](/en/health/mental-health/hospitalization-rights) and in our [language-access guide](/en/health/mental-health/interpreter).
3. **If you or someone close to you is in distress — ERAN, hotline 1201**, per the organisation's own site. In immediate danger to life — **101**.

## Sources

- [Knesset Research and Information Center — Yonat Meisel, "Data on the health status of Ethiopian-Israelis", 10 July 2024 (prepared at the request of MK Tsega Tsegenesh Melaku)](https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf)
- [ERAN — emotional first aid, hotline 1201](https://www.eran.org.il/)
- [Psychiatric hospitalisation rights](/en/health/mental-health/hospitalization-rights)
- [Mental health in the community](/en/health/mental-health)`,
      am: `የኔሴት የምርምርና መረጃ ማዕከል «የኢትዮጵያ ተወላጆች የጤና ሁኔታ መረጃ» የተባለ ሰነድ አሳትሟል — በዮናት ማይዘል ተጽፎ በሼሊ ሌቪ የጸደቀ፣ ሐምሌ 10፣ 2024። በኔሴት አባል ጼጋ ጼገነሽ መላኩ ጥያቄ የተዘጋጀ ነው። ሙሉ በሙሉ አነበብነው። የአእምሮ ጤና ምዕራፉ እርስ በርስ መነጻጸር ያለባቸው ሁለት ቁጥሮች አሉት።

## የመጀመሪያው ቁጥር፦ ሆስፒታል መተኛት

በ2023 በእስራኤል ወደ አእምሮ ጤና ተቋማት **23,825 መግቢያዎች** ተመዝግበዋል። ከእነዚህ **3.8% ገደማ — 904 መግቢያዎች — የኢትዮጵያ ተወላጆች** ነበሩ፤ እነሱ ደግሞ ከእስራኤል ሕዝብ 2% ገደማ ናቸው።

አዎንታዊ አዝማሚያም አለ፦ ከ2019 እስከ 2023 የኢትዮጵያ ተወላጆች ድርሻ ከ4.4% ወደ 3.8% ወርዷል። ክፍተቱ ጠበበ እንጂ አልተዘጋም።

ሰነዱ የጤና ሚኒስቴር ስለ «ሚዛን ቤቶች» መረጃ እንዳልሰጠ ይገልጻል — መረጃው የለኝም ስላለ።

## ሁለተኛው ቁጥር፦ በማህበረሰብ ውስጥ ማገገም

በ2023 በእስራኤል **37,898 ሰዎች የማገገሚያ ቅርጫት** አግኝተዋል። ከእነሱ **2.9% ገደማ — 1,112 — የኢትዮጵያ ተወላጆች** ናቸው።

እዚህ ላይ አዝማሚያው በተቃራኒው ነው፦ ድርሻቸው ከ2019 3.3% ወደ 2023 2.9% **ወርዷል**። ሰነዱ ከሚያስፈልጋቸው ሁሉ ስንቱን እንደሚወክል መረጃ እንደሌለው በግልጽ ይናገራል።

## ሁለቱ ቁጥሮች አብረው ለምን ታሪኩ ናቸው

የማገገሚያ ቅርጫት ከሆስፒታል መተኛት **በፊትና በኋላ** የሚሆነው ነው — መኖሪያ፣ ሥራ፣ ትምህርት፣ ማህበራዊ አጃቢነት። ሆስፒታል መተኛት ደግሞ ይህ ሲጠፋ የሚሆነው ነው። ማህበረሰቡ ሰዎች በችግር በሚገቡበት ቦታ ከመጠን በላይ፣ ችግሩ በሚከላከልበት ቦታ ደግሞ ከመጠን በታች ተወክሏል።

## በዚያው ሰነድ ውስጥ ያለው ራስን የማጥፋት መረጃ

- በማዕከላዊ ስታቲስቲክስ ቢሮ መሠረት፣ በ2022 በኢትዮጵያ ተወላጆች መካከል ሆን ተብሎ በራስ ላይ በሚደርስ ጉዳት የሞት ምጣኔ በ100,000 ነዋሪ **8.4** ነበር፣ በጠቅላላው ሕዝብ ደግሞ **3.7** — ከእጥፍ በላይ። በ2021 ልዩነቱ በጣም ሰፊ ነበር፦ **16.1** በተቃራኒው **4.2**።
- በጤና ሚኒስቴር መሠረት፣ በ2019–2021 ከኢትዮጵያ በመጡ ዕድሜያቸው አሥርና ከዚያ በላይ በሆኑ መካከል በ100,000 **112** የራስን ሕይወት የማጥፋት ሙከራዎች ተመዝግበዋል፤ ከቀድሞ ሶቪየት ኅብረት በመጡ መካከል ደግሞ **136**።

## ማወቅ የሚገባ የትርጓሜ ማስታወሻ

ሰነዱ ማዕከላዊ ስታቲስቲክስ ቢሮና ጤና ሚኒስቴር የተለያዩ ሕዝቦችን እንደሚቆጥሩ ያስጠነቅቃል። ቢሮው በኢትዮጵያ የተወለዱትንና አባታቸው በኢትዮጵያ የተወለደ እስራኤል ተወላጆችን ያካትታል — እናታቸው ብቻ ኢትዮጵያ ተወላጅ የሆኑትን (በ2022 መጨረሻ 6,144 ሰዎች) **አያካትትም**።

በ2022 መጨረሻ የኢትዮጵያ ተወላጆች ብዛት 175,000 ገደማ ነበር — ከሕዝቡ 2% ገደማ።

## በዚህ ምን ማድረግ ይቻላል

1. **የማገገሚያ ቅርጫት የሚጠየቅ መብት ነው።** በጤና ሚኒስቴር የክልል ኮሚቴ ማመልከቻ ይጀምራል። በቤተሰብዎ ውስጥ ተከታታይ የአእምሮ ጤና ሁኔታ ያለው ሰው ካለ፣ ሁኔታው ወደ ድንገተኛ ክፍል ከመድረሱ በፊት ሐኪሙን መጠየቅ ያለብዎ ጥያቄ ይህ ነው።
2. **በሆስፒታል መተኛት ውስጥ መብቶች አሉ፣ የአስተርጓሚ መብትም ጭምር።** በ[የሥነ ልቦና ሆስፒታል መተኛት መብቶች ገጻችን](/am/health/mental-health/hospitalization-rights) እና በ[የቋንቋ ተደራሽነት መመሪያችን](/am/health/mental-health/interpreter) ሰብስበናቸዋል።
3. **እርስዎ ወይም የቅርብ ሰው በጭንቀት ውስጥ ከሆኑ — ኤራን፣ ሙቅ መስመር 1201**፣ በድርጅቱ ድህረ ገጽ መሠረት። አፋጣኝ የሕይወት አደጋ ላይ — **101**።

## ምንጮች

- [የኔሴት የምርምርና መረጃ ማዕከል — ዮናት ማይዘል፣ «የኢትዮጵያ ተወላጆች የጤና ሁኔታ መረጃ»፣ ሐምሌ 10፣ 2024](https://fs.knesset.gov.il/globaldocs/MMM/e0e08b83-2fcf-ee11-815f-005056aac6c3/2_e0e08b83-2fcf-ee11-815f-005056aac6c3_11_20620.pdf)
- [ኤራን — የስሜት የመጀመሪያ እርዳታ፣ ሙቅ መስመር 1201](https://www.eran.org.il/)
- [የሥነ ልቦና ሆስፒታል መተኛት መብቶች](/am/health/mental-health/hospitalization-rights)
- [በማህበረሰብ ውስጥ የአእምሮ ጤና](/am/health/mental-health)

*[⚠️ የAI ትርጉም — በአማርኛ ቋንቋ ተወላጅ ተናጋሪ እንዲገመግም ይመከራል።]*`,
    },
  },
];
