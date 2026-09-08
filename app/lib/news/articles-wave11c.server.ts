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
];
