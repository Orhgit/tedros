// Org profiles seed (RIN-419 / part of RIN-417 — SEO Wave 1b).
//
// 12 community organizations authored in HE/EN/AM. Captures high-intent
// "Tene Briut services", "Tebeka legal aid" queries and provides a strong
// internal-link graph between Rights, Glossary, and Cities.
//
// HE source-of-truth (CLAUDE.md). Same render-from-seed pattern as
// `lib/glossary/glossary.ts` and `lib/db/seeds/rights.ts` — no DB needed.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { OrgCategory } from "./categories";

export type { OrgCategory } from "./categories";

export interface OrgEntry {
  slug: string;
  category: OrgCategory;
  name: Translatable;
  shortDescription: Translatable;
  /** Year the organization was founded. */
  foundedYear: number;
  /** Official website (used for `sameAs` in JSON-LD). */
  websiteUrl: string;
  /** Headquarters city (used in body + Organization.address). */
  headquartersCity: Translatable;
  /** Email for community-facing inquiries (optional — many orgs prefer web form). */
  contactEmail?: string;
  /** Slugs of related rights (under `/rights/{slug}`). */
  relatedRights: string[];
  /** Slugs of related glossary terms (under `/glossary/{slug}`). */
  relatedTerms: string[];
  /** Other org slugs to cross-link in "see also". */
  relatedOrgs: string[];
  bodies: Record<Locale, string>;
}

export const ORGS: OrgEntry[] = [
  // 1. Tene Briut — health
  {
    slug: "tene-briut",
    category: "health",
    name: { he: "טנא בריאות", en: "Tene Briut", am: "ቴኔ ብሪዩት" },
    shortDescription: {
      he: "ארגון בריאות הקהילה היחיד בישראל המתמקד ביוצאי אתיופיה — מתאמי בריאות, תרגום רפואי, ומניעת מחלות.",
      en: "Israel's only community-health NGO focused on Ethiopian-Israelis — health navigators, medical translation, and disease prevention.",
      am: "በኢትዮጵያ-እስራኤላውያን ላይ ያተኮረች በእስራኤል ብቸኛዋ የማህበረሰብ ጤና ድርጅት — የጤና አማካሪዎች፣ የህክምና ትርጉም እና የበሽታ መከላከል።",
    },
    foundedYear: 1999,
    websiteUrl: "https://www.tene-briut.org.il",
    headquartersCity: { he: "רחובות", en: "Rehovot", am: "ሬሆቮት" },
    contactEmail: "info@tene-briut.org.il",
    relatedRights: ["chronic-disease-prevention", "medical-translation"],
    relatedTerms: ["tene-briut", "beta-israel"],
    relatedOrgs: ["jdc-ashalim", "enp"],
    bodies: {
      he: `## על הארגון

טנא בריאות הוא ארגון לא-ממשלתי המוקדש לקידום הבריאות של הקהילה האתיופית-ישראלית. הוא מפעיל את צוות ה-Cultural Health Navigators היחיד בישראל בקנה-מידה זה — אנשי מקצוע דוברי אמהרית/תיגרינית הפועלים בכמעט כל קופות החולים, בתי החולים, וקופות סל-בריאות בארץ.

## תכניות עיקריות

- **מתאמי בריאות תרבותיים** — ליווי מטופלים בקופות חולים ובבתי חולים, תיווך תרבותי-לשוני
- **שירות תרגום רפואי** — אמהרית/תיגרינית/עברית בזמן אמת בפגישות ובדיקות מורכבות
- **מניעת מחלות כרוניות** — סוכרת, יתר לחץ דם, השמנת יתר — אבחון מוקדם בקהילה
- **בריאות נפש** — ייעוץ קהילתי, הכשרה למקצועות סיוע
- **בריאות נשים** — פוריות, הריון, מניעת אלימות במשפחה

## למי מיועד?

- כל אדם יוצא אתיופיה (כולל דור 2 ו-3) הזקוק לליווי בריאותי
- בני משפחה המלווים מטופל
- אנשי מקצוע מערכת הבריאות הזקוקים לתיווך תרבותי

## איך פונים?

- אתר: [tene-briut.org.il](https://www.tene-briut.org.il)
- אימייל: info@tene-briut.org.il
- סניפים פעילים: רחובות (מטה), ירושלים, נתניה, ראשון לציון, באר שבע, חיפה
- שיחת-טלפון ראשונה ללא עלות; הליווי חינמי לזכאים

## ראו גם

- [מניעת מחלות כרוניות](/he/rights/chronic-disease-prevention) — Right בשיתוף הארגון
- [שירותי תרגום רפואי](/he/rights/medical-translation) — Right
- [מילון: טנא בריאות](/he/glossary/tene-briut) — הקשר רחב יותר
- [JDC-ג׳וינט](/he/orgs/jdc-ashalim) — שותף-מימון מרכזי
`,
      en: `## About

Tene Briut is an NGO dedicated to advancing the health of the Ethiopian-Israeli community. It runs Israel's only Cultural Health Navigators team at this scale — Amharic/Tigrinya-speaking professionals operating across nearly every HMO, hospital, and community-health basket in the country.

## Main programs

- **Cultural Health Navigators** — patient accompaniment in HMOs and hospitals, cultural-linguistic mediation
- **Medical translation service** — real-time Amharic/Tigrinya/Hebrew at appointments and complex procedures
- **Chronic disease prevention** — diabetes, hypertension, obesity — community-level early detection
- **Mental health** — community counseling, training for helping professions
- **Women's health** — fertility, pregnancy, family-violence prevention

## Who is it for?

- Any Ethiopian-Israeli (including 2nd and 3rd generations) needing health navigation
- Family members accompanying a patient
- Healthcare professionals needing cultural mediation

## How to reach out

- Website: [tene-briut.org.il](https://www.tene-briut.org.il)
- Email: info@tene-briut.org.il
- Active branches: Rehovot (HQ), Jerusalem, Netanya, Rishon LeZion, Beersheba, Haifa
- First consultation is free; navigation is free for eligible community members

## See also

- [Chronic disease prevention](/en/rights/chronic-disease-prevention) — Right operated in partnership
- [Medical translation services](/en/rights/medical-translation) — Right
- [Glossary: Tene Briut](/en/glossary/tene-briut) — broader context
- [JDC-Ashalim](/en/orgs/jdc-ashalim) — major funding partner
`,
      am: `## ስለ ድርጅቱ

ቴኔ ብሪዩት የኢትዮጵያ-እስራኤል ማህበረሰብ ጤናን ለማራመድ የተወሰነ መንግስታዊ ያልሆነ ድርጅት ነው። በዚህ ስፋት ብቻ የእስራኤል የባህል ጤና አማካሪዎች ቡድን ያለው ብቸኛ ድርጅት ነው — በሁሉም የኤች.ኤም.ኦ፣ ሆስፒታሎችና የማህበረሰብ ጤና ቅርጫቶች የሚሰሩ አማርኛ/ትግርኛ ተናጋሪ ባለሙያዎች።

## ዋና ፕሮግራሞች

- **የባህል ጤና አማካሪዎች** — በኤች.ኤም.ኦና በሆስፒታሎች ታካሚዎችን ማጀብ፣ የባህል-ቋንቋ ድልድይ መሆን
- **የህክምና ትርጉም አገልግሎት** — በምክክሮችና በውስብስብ ሂደቶች ላይ በቅጽበት አማርኛ/ትግርኛ/ዕብራይስጥ
- **ሥር-ሰደድ በሽታ መከላከል** — ስኳር በሽታ፣ የደም ግፊት፣ ውፍረት — በማህበረሰብ ደረጃ ቀደም ብሎ መለየት
- **የአዕምሮ ጤና** — የማህበረሰብ ምክክርና ለድጋፍ ሙያዎች ሥልጠና
- **የሴቶች ጤና** — የመውለድ፣ እርግዝና፣ የቤተሰብ ብጥብጥ መከላከል

## ለማን ነው?

- ማንኛውም የኢትዮጵያ-እስራኤላዊ (ዘር 2 እና 3 ጨምሮ) የጤና አጃቢ የሚያስፈልገው
- ታካሚን የሚያጅቡ የቤተሰብ አባላት
- የባህል ድልድይ የሚያስፈልጋቸው የጤና ባለሙያዎች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [tene-briut.org.il](https://www.tene-briut.org.il)
- ኢሜይል፦ info@tene-briut.org.il
- ንቁ ቅርንጫፎች፦ ሬሆቮት (ዋና መሥሪያ ቤት)፣ ኢየሩሳሌም፣ ነታንያ፣ ሪሾን ለጽዮን፣ ቤርሼባ፣ ሐይፋ
- የመጀመሪያ ምክክር ነጻ ነው፤ አጃቢነት ለብቁዎች ነጻ ነው

## ይህንንም ይመልከቱ

- [ሥር-ሰደድ በሽታ መከላከል](/am/rights/chronic-disease-prevention) — በሽርክና የሚሰራ Right
- [የህክምና ትርጉም አገልግሎቶች](/am/rights/medical-translation) — Right
- [መዝገብ፦ ቴኔ ብሪዩት](/am/glossary/tene-briut) — ሰፊ ዝርዝር
- [JDC-አሻሊም](/am/orgs/jdc-ashalim) — ዋና የፋይናንስ አጋር
`,
    },
  },

  // 2. Tebeka — legal
  {
    slug: "tebeka",
    category: "legal",
    name: { he: "טבקה", en: "Tebeka", am: "ጠበቃ" },
    shortDescription: {
      he: "מרכז סיוע משפטי ליוצאי אתיופיה. מנהיגה ארצית בנושאי גזענות, אכיפה משטרתית, וזכויות אזרח.",
      en: "Legal aid center for Ethiopian-Israelis. National leader on racism, police accountability, and civil rights.",
      am: "ለኢትዮጵያ-እስራኤላውያን የሕግ ድጋፍ ማዕከል። በዘረኝነት፣ የፖሊስ ተጠያቂነትና የዜጎች መብቶች ብሔራዊ መሪ።",
    },
    foundedYear: 2000,
    websiteUrl: "https://www.tebeka.org.il",
    headquartersCity: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    contactEmail: "general@tebeka.org.il",
    relatedRights: ["tebeka-legal-aid"],
    relatedTerms: ["tebeka", "beta-israel"],
    relatedOrgs: ["iaej"],
    bodies: {
      he: `## על הארגון

טבקה (אמהרית: "מצדיק" / "סנגור") הוא מרכז סיוע משפטי-קהילתי שהוקם ב-2000 על-ידי עורך דין פנטהון אסיפה-דווית. הצוות כולל ~25 עורכי דין דוברי אמהרית/עברית.

## תכניות עיקריות

- **תביעות גזענות** — תלונות, ייצוג בתביעות אזרחיות ופליליות
- **אכיפה משטרתית** — סיוע במקרי שימוש מופרז בכוח, אפליה, וגזענות מצד שוטרים
- **זכויות אזרח** — אפליה בתעסוקה, דיור, חינוך, ושירותים ציבוריים
- **השפעה ציבורית** — תזכירי-חוק לוועדת חוקה בכנסת, תזכירי-עמדה
- **הסברה** — סדנאות לקהילה ולסטודנטים

## למי מיועד?

- כל אדם יוצא אתיופיה הנתקל באפליה / שימוש בכוח / שלילת זכויות
- בני משפחה המלווים תלונה
- מקרים ציבוריים-אסטרטגיים

## איך פונים?

- אתר: [tebeka.org.il](https://www.tebeka.org.il)
- אימייל: general@tebeka.org.il
- מטה: ירושלים. נוכחות במחוזות נוספים לפי תיק.
- ייעוץ ראשוני חינמי לכל פונה

## ראו גם

- [סיוע משפטי טבקה](/he/rights/tebeka-legal-aid) — Right בעבור הזכאים
- [מילון: טבקה](/he/glossary/tebeka) — הקשר רחב
- [האגודה הישראלית למען יהודי אתיופיה (IAEJ)](/he/orgs/iaej) — שותפת-עמדה
`,
      en: `## About

Tebeka ("vindicator" / "advocate" in Amharic) is a community legal-aid center founded in 2000 by attorney Fentahun Assefa-Dawit. The team includes ~25 attorneys speaking Amharic/Hebrew.

## Main programs

- **Racism litigation** — complaints, representation in civil and criminal suits
- **Police accountability** — assistance in cases of excessive force, discrimination, racism
- **Civil rights** — discrimination in employment, housing, education, and public services
- **Public influence** — submissions to the Knesset Constitution Committee, position papers
- **Outreach** — community and student workshops

## Who is it for?

- Any Ethiopian-Israeli encountering discrimination / use of force / denial of rights
- Family members accompanying a complaint
- Public-strategic cases

## How to reach out

- Website: [tebeka.org.il](https://www.tebeka.org.il)
- Email: general@tebeka.org.il
- HQ: Jerusalem. Presence in additional districts per case.
- First consultation free for any caller

## See also

- [Tebeka legal aid](/en/rights/tebeka-legal-aid) — Right for eligible community members
- [Glossary: Tebeka](/en/glossary/tebeka) — broader context
- [IAEJ](/en/orgs/iaej) — partner on community advocacy
`,
      am: `## ስለ ድርጅቱ

ጠበቃ (በአማርኛ "ጠበቃ" / "ተከራካሪ") በ2000 በጠበቃ ፈንታሁን አሰፋ-ዳዊት የተመሠረተ የማህበረሰብ የሕግ ድጋፍ ማዕከል ነው። ቡድኑ ~25 አማርኛ/ዕብራይስጥ ተናጋሪ ጠበቆችን ይይዛል።

## ዋና ፕሮግራሞች

- **የዘረኝነት ክሶች** — ቅሬታዎች፣ በሲቪልና ወንጀል ክሶች ውክልና
- **የፖሊስ ተጠያቂነት** — በመኮንኖች ያለ ቁጥጥር ኃይል መጠቀም፣ መድሎ፣ ዘረኝነት
- **የዜጎች መብቶች** — በሥራ ቅጥር፣ መኖሪያ ቤት፣ ትምህርትና የህዝብ አገልግሎት መድሎ
- **የህዝብ ተጽእኖ** — ለኬሰት ሕገ-መንግስት ኮሚቴ ሰነዶች ማቅረብ
- **አስተዋወቅ** — የማህበረሰብና የተማሪ አውደ ጥናቶች

## ለማን ነው?

- መድሎ / ኃይል / መብት መከልከል የገጠመው ማንኛውም የኢትዮጵያ-እስራኤላዊ
- ቅሬታ የሚያጅቡ የቤተሰብ አባላት
- የህዝብ-ስትራቴጂክ ጉዳዮች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [tebeka.org.il](https://www.tebeka.org.il)
- ኢሜይል፦ general@tebeka.org.il
- ዋና መሥሪያ ቤት፦ ኢየሩሳሌም። እንደ ጉዳዩ በሌሎች ክልሎች መገኘት።
- ለማንኛውም ጠያቂ የመጀመሪያ ምክክር ነጻ

## ይህንንም ይመልከቱ

- [ጠበቃ የሕግ ድጋፍ](/am/rights/tebeka-legal-aid) — ለብቁ የማህበረሰብ አባላት Right
- [መዝገብ፦ ጠበቃ](/am/glossary/tebeka) — ሰፊ ዝርዝር
- [IAEJ](/am/orgs/iaej) — በማህበረሰብ መብት ጥብቅና አጋር
`,
    },
  },

  // 3. ENP — community
  {
    slug: "enp",
    category: "community",
    name: {
      he: "ENP — שותפות לאומית לקהילה",
      en: "ENP — Ethiopian National Project",
      am: "ENP — የኢትዮጵያ ብሔራዊ ፕሮጀክት",
    },
    shortDescription: {
      he: "שותפות מסגרת בין ממשלה, JDC, סוכנות יהודית ופדרציות — מפעילה תכניות חינוך, נוער, ומימון מצטיינים.",
      en: "Partnership framework between the government, JDC, Jewish Agency, and federations — running education, youth, and excellence programs.",
      am: "በመንግስት፣ በJDC፣ በአይሁድ ኤጀንሲና በፌዴሬሽኖች መካከል የሽርክና ማዕቀፍ — የትምህርት፣ የወጣቶችና የብቃት ፕሮግራሞችን ያስኬዳል።",
    },
    foundedYear: 2001,
    websiteUrl: "https://www.enp.org.il",
    headquartersCity: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    contactEmail: "info@enp.org.il",
    relatedRights: ["matriculation-grant", "tech-career-bootcamp"],
    relatedTerms: ["enp", "beta-israel"],
    relatedOrgs: ["fidel", "hila", "isef"],
    bodies: {
      he: `## על הארגון

ENP — Ethiopian National Project — היא מסגרת שותפות בין ממשלת ישראל, ה-Joint (JDC), הסוכנות היהודית, פדרציות יהודיות בצפון אמריקה, וקרנות פילנתרופיות. הוקמה ב-2001 כתגובה לפערי-המשלות בקרב הקהילה האתיופית-ישראלית.

## תכניות עיקריות

- **SPACE** — תכנית רב-שנתית לעזרה לימודית בכיתות ז'-י"ב (4,500+ חניכים)
- **SHALAV** — תוכנית תוך-בית-ספרית לכיתות א'-ו'
- **מענק בגרות** — מימון תיכוניסטים מצטיינים (~1,000 חניכים בשנה)
- **Tech-Career bootcamp** — מסלול הסבה להייטק (~120 בוגרים בשנה)
- **Israel Sci-Tech Alumni** — מסלול לקריירה מדעית

## למי מיועד?

- בני נוער יוצאי אתיופיה בכיתות א'-י"ב (תכניות SPACE/SHALAV)
- תיכוניסטים מצטיינים (מענק בגרות)
- מבוגרים מעוניינים במעבר להייטק (Tech-Career)

## איך פונים?

- אתר: [enp.org.il](https://www.enp.org.il)
- אימייל: info@enp.org.il
- רישום לתכניות: דרך בתי ספר שותפים או ישירות באתר

## ראו גם

- [מענק בגרות](/he/rights/matriculation-grant) — Right
- [Tech-Career bootcamp](/he/rights/tech-career-bootcamp) — Right
- [מילון: ENP](/he/glossary/enp) — הקשר
- [Fidel](/he/orgs/fidel), [Hila](/he/orgs/hila) — שותפות-חינוך
- [ISEF](/he/orgs/isef) — מימון מצטיינים אקדמי
`,
      en: `## About

ENP — Ethiopian National Project — is a partnership framework between the Government of Israel, the Joint (JDC), the Jewish Agency, North American federations, and philanthropic foundations. Established in 2001 in response to achievement gaps in the Ethiopian-Israeli community.

## Main programs

- **SPACE** — multi-year academic-support program for grades 7-12 (4,500+ participants)
- **SHALAV** — school-based program for grades 1-6
- **Bagrut Grant** — funding for high-achieving high-schoolers (~1,000/year)
- **Tech-Career Bootcamp** — career-pivot program into tech (~120 graduates/year)
- **Israel Sci-Tech Alumni** — track to a science career

## Who is it for?

- Ethiopian-Israeli youth in grades 1-12 (SPACE/SHALAV)
- High-achieving high-school students (Bagrut Grant)
- Adults pivoting into tech (Tech-Career)

## How to reach out

- Website: [enp.org.il](https://www.enp.org.il)
- Email: info@enp.org.il
- Program registration: through partner schools or directly on the website

## See also

- [Bagrut grant](/en/rights/matriculation-grant) — Right
- [Tech-Career bootcamp](/en/rights/tech-career-bootcamp) — Right
- [Glossary: ENP](/en/glossary/enp) — context
- [Fidel](/en/orgs/fidel), [Hila](/en/orgs/hila) — education partners
- [ISEF](/en/orgs/isef) — academic excellence funding
`,
      am: `## ስለ ድርጅቱ

ENP — የኢትዮጵያ ብሔራዊ ፕሮጀክት — በእስራኤል መንግስት፣ በጆይንት (JDC)፣ በአይሁድ ኤጀንሲ፣ በሰሜን አሜሪካ የአይሁድ ፌዴሬሽኖችና በበጎ አድራጎት ፋውንዴሽኖች መካከል ያለ የሽርክና ማዕቀፍ ነው። በ2001 በኢትዮጵያ-እስራኤል ማህበረሰብ ላይ ያሉ የውጤት ክፍተቶችን ለመመለስ ተቋቋመ።

## ዋና ፕሮግራሞች

- **SPACE** — ለ7-12ኛ ክፍል የብዙ ዓመት የአካዳሚክ ድጋፍ ፕሮግራም (4,500+ ተሳታፊዎች)
- **SHALAV** — ለ1-6ኛ ክፍል የትምህርት ቤት ፕሮግራም
- **የባግሩት ስጦታ** — ከፍተኛ ውጤት ላስመዘገቡ ሁለተኛ ደረጃ ተማሪዎች ድጋፍ (በዓመት ~1,000)
- **የቴክ-ሥራ ቦትካምፕ** — ወደ ቴክ የሥራ መለወጫ (በዓመት ~120 ምሩቃን)
- **የእስራኤል ሳይ-ቴክ ምሩቃን** — ወደ ሳይንስ ሥራ መንገድ

## ለማን ነው?

- በ1-12ኛ ክፍል ያሉ የኢትዮጵያ-እስራኤል ወጣቶች (SPACE/SHALAV)
- ከፍተኛ ውጤት ያላቸው የሁለተኛ ደረጃ ተማሪዎች (የባግሩት ስጦታ)
- ወደ ቴክ ለመለወጥ የሚፈልጉ ጎልማሶች (ቴክ-ሥራ)

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [enp.org.il](https://www.enp.org.il)
- ኢሜይል፦ info@enp.org.il
- ለፕሮግራሞች ምዝገባ፦ በሽርክና ትምህርት ቤቶች ወይም በቀጥታ በድረ-ገጹ

## ይህንንም ይመልከቱ

- [የባግሩት ስጦታ](/am/rights/matriculation-grant) — Right
- [የቴክ-ሥራ ቦትካምፕ](/am/rights/tech-career-bootcamp) — Right
- [መዝገብ፦ ENP](/am/glossary/enp) — ዝርዝር
- [Fidel](/am/orgs/fidel)፣ [Hila](/am/orgs/hila) — የትምህርት አጋሮች
- [ISEF](/am/orgs/isef) — የአካዳሚክ ብቃት ድጋፍ
`,
    },
  },

  // 4. Olim Beyahad — community
  {
    slug: "olim-beyahad",
    category: "community",
    name: { he: "עולים ביחד", en: "Olim Beyahad", am: "ኦሊም በያሐድ" },
    shortDescription: {
      he: "ארגון מנטורינג קריירה לבוגרי תואר ראשון יוצאי אתיופיה. מקשר סטודנטים למנטורים בכירים בכלכלה.",
      en: "A career-mentorship organization for Ethiopian-Israeli university graduates. Connects students with senior industry mentors.",
      am: "ለኢትዮጵያ-እስራኤል ዩኒቨርሲቲ ምሩቃን የሥራ መንገድ የሚመራ ድርጅት። ተማሪዎችን ከኢንዱስትሪ መሪዎች ጋር ያገናኛል።",
    },
    foundedYear: 2007,
    websiteUrl: "https://www.olim-beyahad.org.il",
    headquartersCity: { he: "תל אביב", en: "Tel Aviv", am: "ቴል አቪቭ" },
    contactEmail: "info@olim-beyahad.org.il",
    relatedRights: ["youth-mentorship"],
    relatedTerms: ["olim-beyahad", "beta-israel"],
    relatedOrgs: ["enp"],
    bodies: {
      he: `## על הארגון

עולים ביחד הוא ארגון לא-ממשלתי שמתמקד בקידום מקצועי-תעסוקתי של בוגרי תואר ראשון יוצאי אתיופיה. הוקם ב-2007.

## תכניות עיקריות

- **מנטורינג** — בוגר תואר נצמד למנטור בכיר בתעשייה (טכנולוגיה, פיננסים, חינוך, רפואה)
- **כיוונים תעסוקתיים** — סדנאות חיפוש עבודה, כתיבת קו"ח, ראיונות
- **נטוורקינג** — אירועים עם חברות מובילות (Microsoft, Google, IBM, EY, BDO ועוד)
- **תכנית הייטק** — שילוב בוגרים בעולם ההייטק עם תקופת חניכה
- **מועצת בוגרים** — קהילת alumni הפעילה כמנטורים לדור הבא

## למי מיועד?

- בוגרי תואר ראשון יוצאי אתיופיה (כולל לפני סיום)
- בוגרי תואר שני / שלישי בקריירה ראשונה
- מקצוענים יוצאי אתיופיה המבקשים מנטור-קריירה

## איך פונים?

- אתר: [olim-beyahad.org.il](https://www.olim-beyahad.org.il)
- אימייל: info@olim-beyahad.org.il
- מטה: תל אביב. אירועים בכל הארץ.
- רישום: דרך טופס מקוון באתר; ראיון התאמה

## ראו גם

- [מנטורינג לבוגרים](/he/rights/excellence-employment) — Right
- [מילון: עולים ביחד](/he/glossary/olim-beyahad) — הקשר
- [ENP](/he/orgs/enp) — שותפת-מימון
`,
      en: `## About

Olim Beyahad ("Rising Together") is an NGO focused on the career advancement of Ethiopian-Israeli university graduates. Founded in 2007.

## Main programs

- **Mentorship** — first-degree graduate paired with a senior industry mentor (tech, finance, education, medicine)
- **Career direction** — workshops on job searching, CV writing, interviews
- **Networking** — events with leading firms (Microsoft, Google, IBM, EY, BDO, and more)
- **Hi-tech track** — graduate placement in tech with apprenticeship period
- **Alumni council** — active alumni community serving as mentors for the next generation

## Who is it for?

- Ethiopian-Israeli first-degree graduates (including pre-completion)
- 2nd / 3rd degree graduates in early careers
- Ethiopian-Israeli professionals seeking a career mentor

## How to reach out

- Website: [olim-beyahad.org.il](https://www.olim-beyahad.org.il)
- Email: info@olim-beyahad.org.il
- HQ: Tel Aviv. Events across the country.
- Registration: online form on the website; matching interview

## See also

- [Graduate mentorship](/en/rights/excellence-employment) — Right
- [Glossary: Olim Beyahad](/en/glossary/olim-beyahad) — context
- [ENP](/en/orgs/enp) — funding partner
`,
      am: `## ስለ ድርጅቱ

ኦሊም በያሐድ (በዕብራይስጥ "ተባብረን ወጣን") በኢትዮጵያ-እስራኤል ዩኒቨርሲቲ ምሩቃን የሥራ መንገድ ላይ የሚሰራ መንግስታዊ ያልሆነ ድርጅት ነው። በ2007 ተመሥርቷል።

## ዋና ፕሮግራሞች

- **አማካሪነት** — የመጀመሪያ ዲግሪ ምሩቅ ከኢንዱስትሪ ከፍተኛ አማካሪ ጋር (ቴክ፣ ፋይናንስ፣ ትምህርት፣ ሕክምና) ይጣመራል
- **የሥራ አቅጣጫ** — የሥራ ፍለጋ፣ ሲቪ መጻፍ፣ ቃለ መጠይቅ አውደ ጥናቶች
- **ኔትወርኪንግ** — ከመሪ ድርጅቶች (ማይክሮሶፍት፣ ጉግል፣ አይቢኤም፣ ኢ.ዋይ፣ ቢ.ዲ.ኦ ሌሎችም) ጋር ክንውኖች
- **የቴክ መንገድ** — ምሩቅን ከስልጠና ጊዜ ጋር በቴክ ዘርፍ መመደብ
- **የቀድሞ ምሩቃን ምክር ቤት** — ለቀጣዩ ትውልድ አማካሪ የሚሆኑ ቀደምት ምሩቃን ማህበረሰብ

## ለማን ነው?

- የመጀመሪያ ዲግሪ ኢትዮጵያ-እስራኤል ምሩቃን (ከመጨረስ በፊትም ጨምሮ)
- በቀደምት ሥራ ላይ ያሉ የ2ኛ / 3ኛ ዲግሪ ምሩቃን
- የሥራ አማካሪ የሚፈልጉ የኢትዮጵያ-እስራኤል ባለሙያዎች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [olim-beyahad.org.il](https://www.olim-beyahad.org.il)
- ኢሜይል፦ info@olim-beyahad.org.il
- ዋና መሥሪያ ቤት፦ ቴል አቪቭ። በመላ ሀገሪቱ ክንውኖች።
- ምዝገባ፦ በድረ-ገጹ የመስመር ላይ ቅጽ፤ የማቀላቀል ቃለ መጠይቅ

## ይህንንም ይመልከቱ

- [የምሩቅ አማካሪነት](/am/rights/excellence-employment) — Right
- [መዝገብ፦ ኦሊም በያሐድ](/am/glossary/olim-beyahad) — ዝርዝር
- [ENP](/am/orgs/enp) — የፋይናንስ አጋር
`,
    },
  },

  // 5. ISEF — education funding
  {
    slug: "isef",
    category: "education",
    name: {
      he: "קרן ISEF",
      en: "ISEF Foundation",
      am: "የISEF ፋውንዴሽን",
    },
    shortDescription: {
      he: "קרן פילנתרופית-אקדמית למימון סטודנטים מצטיינים יוצאי אתיופיה לתואר ראשון, שני, ושלישי.",
      en: "Philanthropic-academic foundation funding outstanding Ethiopian-Israeli students for B.A., M.A., and Ph.D. degrees.",
      am: "ለBA፣ MA እና PhD ለሚማሩ ምርጥ የኢትዮጵያ-እስራኤል ተማሪዎች የሚደግፍ የበጎ አድራጎት-አካዳሚክ ፋውንዴሽን።",
    },
    foundedYear: 1977,
    websiteUrl: "https://www.isef.org.il",
    headquartersCity: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    contactEmail: "info@isef.org.il",
    relatedRights: ["unconditional-scholarships-7-sources"],
    relatedTerms: ["hesegim-isef", "beta-israel"],
    relatedOrgs: ["enp", "fidel"],
    bodies: {
      he: `## על הארגון

ISEF (Israel Sephardi Education Fund) הוקמה ב-1977 כקרן פילנתרופית להעצמת קהילות מודרות בישראל. ב-1991, אחרי מבצע שלמה, הקרן הרחיבה את שדה-פעולתה לקהילה האתיופית-ישראלית. כיום, רוב מקבלי המלגה הם יוצאי אתיופיה.

## תכניות עיקריות

- **מלגת תואר ראשון** — כיסוי מלא של שכר לימוד + מענק חודשי 3,000-3,500 ₪ (~400 סטודנטים בשנה)
- **מלגת תואר שני** — כיסוי + מנטור אקדמי
- **מלגת דוקטורט** — כיסוי + תקציב מחקר
- **מנהיגות קהילתית** — סדנאות לסטודנטים על פעילות קהילתית
- **רשת בוגרים** — alumni network של 4,000+ בוגרים

## דרישות זכאות

- ממוצע 85+ בתעודת בגרות / ממוצע אקדמי
- פסיכומטרי 580+ (ל-תואר ראשון)
- שירות צבאי או לאומי
- ראיון אישי
- פוטנציאל מנהיגות קהילתית

## איך פונים?

- אתר: [isef.org.il](https://www.isef.org.il)
- אימייל: info@isef.org.il
- רישום: טופס מקוון באתר. מועד הגשה: מאי-יוני (לשנת לימודים אחת קדימה).
- מטה: ירושלים. ראיונות: ארץ-ישראל ובארה"ב.

## ראו גם

- [סוכן מילגות לסטודנטים](/he/rights/unconditional-scholarships-7-sources) — Right
- [מילון: הישגים / ISEF](/he/glossary/hesegim-isef) — הקשר
- [ENP](/he/orgs/enp), [Fidel](/he/orgs/fidel) — שותפות-חינוך
`,
      en: `## About

ISEF (Israel Sephardi Education Fund) was founded in 1977 as a philanthropic foundation to empower marginalized communities in Israel. In 1991, after Operation Solomon, the foundation expanded its focus to the Ethiopian-Israeli community. Today, the majority of scholarship recipients are Ethiopian-Israelis.

## Main programs

- **B.A. scholarship** — full tuition + 3,000-3,500 ILS monthly stipend (~400 students/year)
- **M.A. scholarship** — coverage + academic mentor
- **Ph.D. scholarship** — coverage + research budget
- **Community leadership** — workshops on community engagement
- **Alumni network** — 4,000+ graduates

## Eligibility requirements

- 85+ average in high-school matriculation / academic average
- Psychometric exam 580+ (for B.A.)
- Military or national service
- Personal interview
- Community leadership potential

## How to reach out

- Website: [isef.org.il](https://www.isef.org.il)
- Email: info@isef.org.il
- Registration: online form on the website. Submission window: May-June (for the upcoming academic year).
- HQ: Jerusalem. Interviews: in Israel and the U.S.

## See also

- [Scholarship aggregator for students](/en/rights/unconditional-scholarships-7-sources) — Right
- [Glossary: Hesegim / ISEF](/en/glossary/hesegim-isef) — context
- [ENP](/en/orgs/enp), [Fidel](/en/orgs/fidel) — education partners
`,
      am: `## ስለ ድርጅቱ

ISEF (Israel Sephardi Education Fund) የተገለሉ ማህበረሰቦችን ለማበረታታት በ1977 የተቋቋመ የበጎ አድራጎት ፋውንዴሽን ነው። በ1991 ከኦፐሬሽን ሰለሞን በኋላ ፋውንዴሽኑ ትኩረቱን ወደ ኢትዮጵያ-እስራኤል ማህበረሰብ አሰፋ። ዛሬ አብዛኞቹ የስኮላርሺፕ ተቀባዮች የኢትዮጵያ-እስራኤላውያን ናቸው።

## ዋና ፕሮግራሞች

- **የBA ስኮላርሺፕ** — ሙሉ የትምህርት ክፍያ + ወርሃዊ 3,000-3,500 ሺ"ል ድጎማ (በዓመት ~400 ተማሪዎች)
- **የMA ስኮላርሺፕ** — ሽፋን + የአካዳሚክ አማካሪ
- **የPhD ስኮላርሺፕ** — ሽፋን + የምርምር ድጋፍ
- **የማህበረሰብ መሪነት** — የማህበረሰብ ተሳትፎ አውደ ጥናቶች
- **የቀድሞ ምሩቃን ኔትወርክ** — 4,000+ ምሩቃን

## የብቁነት መስፈርቶች

- በከፍተኛ ሁለተኛ ደረጃ የመጨረሻ ፈተና / አካዳሚክ ኣማካይ 85+
- የሳይኮሜትሪክ ፈተና 580+ (ለBA)
- ወታደራዊ ወይም ብሔራዊ አገልግሎት
- የግል ቃለ መጠይቅ
- የማህበረሰብ መሪነት አቅም

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [isef.org.il](https://www.isef.org.il)
- ኢሜይል፦ info@isef.org.il
- ምዝገባ፦ በድረ-ገጹ የመስመር ላይ ቅጽ። የማመልከቻ መስኮት፦ ግንቦት-ሰኔ (ለሚቀጥለው የትምህርት ዓመት)።
- ዋና መሥሪያ ቤት፦ ኢየሩሳሌም። ቃለ መጠይቆች፦ በእስራኤልና በአሜሪካ።

## ይህንንም ይመልከቱ

- [ለተማሪዎች የስኮላርሺፕ ሰብሳቢ](/am/rights/unconditional-scholarships-7-sources) — Right
- [መዝገብ፦ ሄሰጊም / ISEF](/am/glossary/hesegim-isef) — ዝርዝር
- [ENP](/am/orgs/enp)፣ [Fidel](/am/orgs/fidel) — የትምህርት አጋሮች
`,
    },
  },

  // 6. Fidel — education
  {
    slug: "fidel",
    category: "education",
    name: { he: "פידל", en: "Fidel", am: "ፊደል" },
    shortDescription: {
      he: "אגודת ההורים והתלמידים יוצאי אתיופיה — מובילה תכניות חינוך, סנגור הורים, ובניית מנהיגות בתי ספר.",
      en: "The Ethiopian-Israeli parents and students association — runs education programs, parent advocacy, and school leadership.",
      am: "የኢትዮጵያ-እስራኤል ወላጆችና ተማሪዎች ማህበር — የትምህርት ፕሮግራሞችን፣ የወላጅ ጥብቅናንና የትምህርት ቤት መሪነትን ይመራል።",
    },
    foundedYear: 1995,
    websiteUrl: "https://www.fidel-il.org",
    headquartersCity: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    relatedRights: ["matriculation-grant", "unconditional-scholarships-7-sources"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["enp", "hila"],
    bodies: {
      he: `## על הארגון

פידל ("אלפבית" באמהרית) הוא אגודת הורים-תלמידים יוצאי אתיופיה הפועלת בכל ארץ-ישראל. הוקמה ב-1995 כתגובה לפערי-המשלות במערכת החינוך. שמה מסמן "אלף-בית" — שורש החינוך.

## תכניות עיקריות

- **תוכנית הורים שותפים** — הכשרת הורים לסנגור על ילדם בבתי ספר ולמעורבות בוועדות הורים
- **מועצות בתי-ספר** — נציגות הורים יוצאי אתיופיה במוסדות חינוך
- **סדנאות לתיכוניסטים** — בגרות, הכנה לפסיכומטרי, מנהיגות
- **מבצעי סנגור** — תזכירי-עמדה למשרד החינוך, וועדות הכנסת
- **חניכי קיץ** — תכניות העשרה ב-בתי ספר אזוריים

## למי מיועד?

- הורים יוצאי אתיופיה לילדים בכיתות א'-י"ב
- תלמידים בכיתות י'-י"ב
- ועדי הורים בבתי ספר עם כיתות מעורבות

## איך פונים?

- אתר: [fidel-il.org](https://www.fidel-il.org)
- מטה: ירושלים. סניפים: נתניה, רחובות, חיפה, באר שבע.
- רישום: טופס מקוון או דרך בית ספר שותף

## ראו גם

- [מענק בגרות](/he/rights/matriculation-grant) — Right
- [סוכן מילגות](/he/rights/unconditional-scholarships-7-sources) — Right
- [ENP](/he/orgs/enp), [Hila](/he/orgs/hila) — שותפות-חינוך
`,
      en: `## About

Fidel ("alphabet" in Amharic) is the Ethiopian-Israeli parents-students association operating throughout Israel. Founded in 1995 in response to achievement gaps in the education system. Its name ("alphabet") signifies the root of education.

## Main programs

- **Partner parents program** — training parents to advocate for their child in school and engage with parent committees
- **School councils** — Ethiopian-Israeli parent representation in education institutions
- **High-school workshops** — matriculation, psychometric prep, leadership
- **Advocacy campaigns** — position papers to the Ministry of Education and Knesset committees
- **Summer programs** — enrichment programs in regional schools

## Who is it for?

- Ethiopian-Israeli parents of children in grades 1-12
- Students in grades 10-12
- Parent committees in schools with mixed classrooms

## How to reach out

- Website: [fidel-il.org](https://www.fidel-il.org)
- HQ: Jerusalem. Branches: Netanya, Rehovot, Haifa, Beersheba.
- Registration: online form or through a partner school

## See also

- [Bagrut grant](/en/rights/matriculation-grant) — Right
- [Scholarship aggregator](/en/rights/unconditional-scholarships-7-sources) — Right
- [ENP](/en/orgs/enp), [Hila](/en/orgs/hila) — education partners
`,
      am: `## ስለ ድርጅቱ

ፊደል (በአማርኛ "ፊደል") በመላ እስራኤል የሚሰራ የኢትዮጵያ-እስራኤል ወላጆች-ተማሪዎች ማህበር ነው። በ1995 በትምህርት ስርዓት ያሉ የውጤት ክፍተቶችን ለመመለስ ተቋቋመ። ስሙ ("ፊደል") የትምህርት ሥር ማለት ነው።

## ዋና ፕሮግራሞች

- **የሽርክና ወላጆች ፕሮግራም** — ወላጆችን ለልጃቸው በትምህርት ቤት እንዲቆሙና በወላጆች ኮሚቴ እንዲሳተፉ ማሰልጠን
- **የትምህርት ቤት ምክር ቤቶች** — በትምህርት ተቋማት የኢትዮጵያ-እስራኤል ወላጅ ውክልና
- **የሁለተኛ ደረጃ አውደ ጥናቶች** — የመጨረሻ ፈተና፣ የሳይኮሜትሪክ ዝግጅት፣ መሪነት
- **የጥብቅና ዘመቻዎች** — ለትምህርት ሚኒስቴርና ለኬሰት ኮሚቴዎች ሰነዶች
- **የክረምት ፕሮግራሞች** — በክልል ትምህርት ቤቶች የእግዘር ፕሮግራሞች

## ለማን ነው?

- በ1-12ኛ ክፍል ልጆች ያሏቸው የኢትዮጵያ-እስራኤል ወላጆች
- በ10-12ኛ ክፍል ተማሪዎች
- ድብልቅ ክፍል ባላቸው ትምህርት ቤቶች የወላጅ ኮሚቴዎች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [fidel-il.org](https://www.fidel-il.org)
- ዋና መሥሪያ ቤት፦ ኢየሩሳሌም። ቅርንጫፎች፦ ነታንያ፣ ሬሆቮት፣ ሐይፋ፣ ቤርሼባ።
- ምዝገባ፦ የመስመር ላይ ቅጽ ወይም በሽርክና ትምህርት ቤት

## ይህንንም ይመልከቱ

- [የባግሩት ስጦታ](/am/rights/matriculation-grant) — Right
- [የስኮላርሺፕ ሰብሳቢ](/am/rights/unconditional-scholarships-7-sources) — Right
- [ENP](/am/orgs/enp)፣ [Hila](/am/orgs/hila) — የትምህርት አጋሮች
`,
    },
  },

  // 7. Hila — education
  {
    slug: "hila",
    category: "education",
    name: { he: 'חיל"ה', en: "Hila", am: "ሂላ" },
    shortDescription: {
      he: 'חיל"ה — חינוך לילדי-יוצאי-אתיופיה. תוכניות תגבור לימודי, סדנאות הורים, וצוות חינוכי בתוך בתי ספר.',
      en: "Hila — education for Ethiopian-Israeli children. Tutoring programs, parent workshops, and embedded school staff.",
      am: "ሂላ — ለኢትዮጵያ-እስራኤል ልጆች ትምህርት። የቱቶሪንግ ፕሮግራሞች፣ የወላጅ አውደ ጥናቶችና በትምህርት ቤት ውስጥ ያለ የትምህርት ሰራተኛ።",
    },
    foundedYear: 1998,
    websiteUrl: "https://www.hila.org.il",
    headquartersCity: { he: "תל אביב", en: "Tel Aviv", am: "ቴል አቪቭ" },
    relatedRights: ["matriculation-grant"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["fidel", "enp"],
    bodies: {
      he: `## על הארגון

חיל"ה (חינוך לילדי-יוצאי-אתיופיה) הוקמה ב-1998 על-ידי בוגרי תכנית "מקיף" של ה-JDC. הארגון מפעיל צוותי-תגבור בתוך בתי ספר ובמרכזי קהילה.

## תכניות עיקריות

- **תגבור לימודי** — שיעורי עזר במתמטיקה, אנגלית, מדעים — בקבוצות קטנות
- **תוכנית "אבן ראשונה"** — חזק כיתות א'-ג' (אבני בניין ל-בית הספר)
- **סדנאות הורים** — איך להיות מעורב בלימודי הילד
- **צוות חינוכי** — מורים-מתאמים בתוך בתי ספר עם ריכוז גבוה
- **חניכי גיל-הזהב** — תוכנית בין-דורית

## למי מיועד?

- תלמידים יוצאי אתיופיה כיתות א'-י"ב (התמקדות ב-א'-ו')
- הורים לתלמידים
- בתי ספר עם 30%+ תלמידים יוצאי אתיופיה

## איך פונים?

- אתר: [hila.org.il](https://www.hila.org.il)
- מטה: תל אביב. עובדים: 50+ מורים-מתאמים בכל הארץ.
- רישום: דרך בית הספר של הילד או באתר

## ראו גם

- [מענק בגרות](/he/rights/matriculation-grant) — Right
- [Fidel](/he/orgs/fidel), [ENP](/he/orgs/enp) — שותפות-חינוך
`,
      en: `## About

Hila (Education for Ethiopian-Israeli Children) was founded in 1998 by graduates of the JDC "Makif" program. The organization runs tutoring teams embedded in schools and community centers.

## Main programs

- **Academic tutoring** — math, English, sciences — in small groups
- **"First Stone" program** — strengthening grades 1-3 (school building blocks)
- **Parent workshops** — how to engage in your child's learning
- **Embedded education staff** — teacher-coordinators in schools with high concentration
- **Intergenerational program** — senior-citizen mentoring

## Who is it for?

- Ethiopian-Israeli students grades 1-12 (focus on 1-6)
- Parents of students
- Schools with 30%+ Ethiopian-Israeli students

## How to reach out

- Website: [hila.org.il](https://www.hila.org.il)
- HQ: Tel Aviv. Staff: 50+ teacher-coordinators across Israel.
- Registration: through your child's school or on the website

## See also

- [Bagrut grant](/en/rights/matriculation-grant) — Right
- [Fidel](/en/orgs/fidel), [ENP](/en/orgs/enp) — education partners
`,
      am: `## ስለ ድርጅቱ

ሂላ (ለኢትዮጵያ-እስራኤል ልጆች ትምህርት) በ1998 በJDC "ማኪፍ" ፕሮግራም ምሩቃን ተቋቋመ። ድርጅቱ በትምህርት ቤቶችና በማህበረሰብ ማዕከላት ውስጥ የቱቶሪንግ ቡድኖችን ያስኬዳል።

## ዋና ፕሮግራሞች

- **የአካዳሚክ ድጋፍ** — ሂሳብ፣ እንግሊዝኛ፣ ሳይንስ — በትናንሽ ቡድኖች
- **"የመጀመሪያ ድንጋይ" ፕሮግራም** — የ1-3ኛ ክፍልን ማጠናከር (የትምህርት ቤት መሰረት)
- **የወላጅ አውደ ጥናቶች** — በልጃችሁ ትምህርት እንዴት መሳተፍ
- **በትምህርት ቤት ውስጥ ያለ ሠራተኛ** — ከፍተኛ ትኩረት ባላቸው ትምህርት ቤቶች መምህር-አስተባባሪዎች
- **የትውልዶች መካከል ፕሮግራም** — የአዛውንት አማካሪነት

## ለማን ነው?

- በ1-12ኛ ክፍል የኢትዮጵያ-እስራኤል ተማሪዎች (በ1-6 ላይ ትኩረት)
- የተማሪ ወላጆች
- 30%+ የኢትዮጵያ-እስራኤል ተማሪዎች ያሏቸው ትምህርት ቤቶች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [hila.org.il](https://www.hila.org.il)
- ዋና መሥሪያ ቤት፦ ቴል አቪቭ። ሠራተኞች፦ በመላ እስራኤል 50+ መምህር-አስተባባሪዎች።
- ምዝገባ፦ በልጃችሁ ትምህርት ቤት ወይም በድረ-ገጹ

## ይህንንም ይመልከቱ

- [የባግሩት ስጦታ](/am/rights/matriculation-grant) — Right
- [Fidel](/am/orgs/fidel)፣ [ENP](/am/orgs/enp) — የትምህርት አጋሮች
`,
    },
  },

  // 8. JDC-Ashalim — community
  {
    slug: "jdc-ashalim",
    category: "community",
    name: {
      he: 'ג"וינט אשלים',
      en: "JDC-Israel Ashalim",
      am: "JDC-እስራኤል አሻሊም",
    },
    shortDescription: {
      he: 'אגף "אשלים" של ג"וינט-ישראל. מפעיל תכניות התערבות ושותפויות עם משרדי ממשלה לקהילות מודרות, כולל יוצאי אתיופיה.',
      en: "JDC-Israel's Ashalim division. Runs intervention programs and government partnerships for marginalized communities, including Ethiopian-Israelis.",
      am: "የJDC-እስራኤል የአሻሊም ክፍል። ለተገለሉ ማህበረሰቦች፣ የኢትዮጵያ-እስራኤላውያንን ጨምሮ፣ የጣልቃ ገብነት ፕሮግራሞችን ያስኬዳል።",
    },
    foundedYear: 1998,
    websiteUrl: "https://www.jdc.org.il/ashalim",
    headquartersCity: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    relatedRights: ["chronic-disease-prevention", "summer-camps-subsidy"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["tene-briut", "enp", "friends-by-nature"],
    bodies: {
      he: `## על הארגון

אשלים ("ילדים ונוער בסיכון בישראל") היא יחידה של JDC-ישראל (American Jewish Joint Distribution Committee). מפעילה תכניות התערבות בשותפות עם משרדי הרווחה, החינוך, והבריאות לקהילות מודרות — כולל הקהילה האתיופית-ישראלית.

## תכניות עיקריות (עם השפעה על הקהילה)

- **משפחות חזקות** — תכנית-אם אחות לקהילה — ליווי משפחות עם ילדים בסיכון
- **בריאות הקהילה** — שותפה ראשית של טנא בריאות במשתי-קצב
- **חינוך מוקדם** — מעונות יום ופעוטונים באזורי ריכוז גבוה
- **נוער בסיכון** — שותפה ראשית של חברים בטבע
- **שירותי תרגום** — מימון 30+ מתורגמנים רפואיים

## למי מיועד?

- קהילות מודרות בכל הארץ — האתיופית-ישראלית בהם
- אנשי-מקצוע במערכת הבריאות, חינוך, רווחה — דרך תכניות הכשרה
- משפחות עם ילדים בסיכון

## איך פונים?

- אתר: [jdc.org.il/ashalim](https://www.jdc.org.il/ashalim)
- מטה: ירושלים
- שירותי הקהילה: דרך טנא בריאות / חברים בטבע / ENP — שותפות-מימון

## ראו גם

- [טנא בריאות](/he/orgs/tene-briut) — שותפה
- [חברים בטבע](/he/orgs/friends-by-nature) — שותפה
- [ENP](/he/orgs/enp) — שותפות-מימון
- [מניעת מחלות כרוניות](/he/rights/chronic-disease-prevention) — Right
`,
      en: `## About

Ashalim ("Children and Youth at Risk in Israel") is a division of JDC-Israel (American Jewish Joint Distribution Committee). It operates intervention programs in partnership with the Ministries of Welfare, Education, and Health for marginalized communities — including the Ethiopian-Israeli community.

## Main programs (Ethiopian-Israeli impact)

- **Strong Families** — flagship program — accompanying families with at-risk children
- **Community Health** — primary partner of Tene Briut on multiple scales
- **Early childhood** — daycare and preschool centers in high-concentration areas
- **Youth at risk** — primary partner of Friends by Nature
- **Translation services** — funding 30+ medical translators

## Who is it for?

- Marginalized communities throughout Israel — Ethiopian-Israeli among them
- Healthcare, education, and welfare professionals — through training programs
- Families with children at risk

## How to reach out

- Website: [jdc.org.il/ashalim](https://www.jdc.org.il/ashalim)
- HQ: Jerusalem
- Community services: through Tene Briut / Friends by Nature / ENP — funding partner

## See also

- [Tene Briut](/en/orgs/tene-briut) — partner
- [Friends by Nature](/en/orgs/friends-by-nature) — partner
- [ENP](/en/orgs/enp) — funding partner
- [Chronic disease prevention](/en/rights/chronic-disease-prevention) — Right
`,
      am: `## ስለ ድርጅቱ

አሻሊም ("በእስራኤል አደጋ ላይ ያሉ ልጆችና ወጣቶች") የJDC-እስራኤል (የአሜሪካን ጆይንት) ክፍል ነው። ከደህንነት፣ ትምህርትና ጤና ሚኒስቴሮች ጋር በሽርክና ለተገለሉ ማህበረሰቦች — የኢትዮጵያ-እስራኤል ማህበረሰብን ጨምሮ — የጣልቃ ገብነት ፕሮግራሞችን ያስኬዳል።

## ዋና ፕሮግራሞች (በኢትዮጵያ-እስራኤል ላይ ተፅዕኖ)

- **ጠንካራ ቤተሰቦች** — ዋነኛ ፕሮግራም — አደጋ ላይ ያሉ ልጆች ያሉባቸውን ቤተሰቦች ማጀብ
- **የማህበረሰብ ጤና** — የቴኔ ብሪዩት ዋና አጋር በብዙ ደረጃዎች
- **ቅድመ-ትምህርት ዕድሜ** — ከፍተኛ ትኩረት ባላቸው አካባቢዎች የቀን ማቆያና የቅድመ ትምህርት ማዕከላት
- **አደጋ ላይ ያሉ ወጣቶች** — የFriends by Nature ዋና አጋር
- **የትርጉም አገልግሎቶች** — 30+ የህክምና አስተርጓሚዎችን መደገፍ

## ለማን ነው?

- በመላ እስራኤል ያሉ የተገለሉ ማህበረሰቦች — የኢትዮጵያ-እስራኤልን ጨምሮ
- የጤና፣ ትምህርትና ደህንነት ባለሙያዎች — በስልጠና ፕሮግራሞች
- አደጋ ላይ ያሉ ልጆች ያሉባቸው ቤተሰቦች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [jdc.org.il/ashalim](https://www.jdc.org.il/ashalim)
- ዋና መሥሪያ ቤት፦ ኢየሩሳሌም
- የማህበረሰብ አገልግሎቶች፦ በቴኔ ብሪዩት / Friends by Nature / ENP — የፋይናንስ አጋር

## ይህንንም ይመልከቱ

- [ቴኔ ብሪዩት](/am/orgs/tene-briut) — አጋር
- [Friends by Nature](/am/orgs/friends-by-nature) — አጋር
- [ENP](/am/orgs/enp) — የፋይናንስ አጋር
- [ሥር-ሰደድ በሽታ መከላከል](/am/rights/chronic-disease-prevention) — Right
`,
    },
  },

  // 9. Friends by Nature — community
  {
    slug: "friends-by-nature",
    category: "community",
    name: { he: "חברים בטבע", en: "Friends by Nature", am: "ጓደኞች በተፈጥሮ" },
    shortDescription: {
      he: "ארגון העוסק בנוער בסיכון מהקהילה האתיופית-ישראלית. בתי-נוער, ליווי אישי, וטיפול במצבי-משבר.",
      en: "Organization working with at-risk Ethiopian-Israeli youth. Youth centers, personal accompaniment, and crisis response.",
      am: "ከኢትዮጵያ-እስራኤል ማህበረሰብ ለአደጋ የተጋለጡ ወጣቶች የሚሰራ ድርጅት። የወጣት ማዕከላት፣ የግል አጃቢነትና የቀውስ ምላሽ።",
    },
    foundedYear: 1996,
    websiteUrl: "https://www.friendsbynature.org",
    headquartersCity: { he: "ירושלים", en: "Jerusalem", am: "ኢየሩሳሌም" },
    relatedRights: ["domestic-violence-support", "summer-camps-subsidy"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["jdc-ashalim"],
    bodies: {
      he: `## על הארגון

חברים בטבע הוקמה ב-1996 כתגובה לעלייה בשיעורי-נשירה ובסיכוני-נוער בקהילה האתיופית-ישראלית. מפעילה ~30 בתי-נוער בכל הארץ.

## תכניות עיקריות

- **בתי-נוער** — מרכזי-פנאי-וחינוך אחרי בית הספר ב-30 מוקדים
- **ליווי-אישי** — חניכים מוצמדים למלווה (1:1) לטיפול בנושאים אישיים
- **משבר חירום** — קו-טלפון 24/7 + ליווי מיידי במצבי-משבר
- **קייטנות קיץ** — תכנית-קיץ ארצית ל-2,500+ חניכים
- **סדנאות מנהיגות** — לבני נוער מצטיינים

## למי מיועד?

- בני נוער יוצאי אתיופיה גילאי 12-18 בסיכון או בקבוצת-סיכון
- משפחות בליווי-משבר
- ילדים שעלו ללא הוריהם (10% מהקהילה)

## איך פונים?

- אתר: [friendsbynature.org](https://www.friendsbynature.org)
- הארגון אינו מפרסם קו חירום. במצוקה מיידית: ער"ן 1201, נט"ל 1-800-363-363, משטרה 100, מד"א 101
- מטה: ירושלים. בתי-נוער: בכל מרכזי הקהילה.

## ראו גם

- [סיוע במצבי אלימות במשפחה](/he/rights/domestic-violence-support) — Right
- [קייטנות קיץ סובסידיות](/he/rights/summer-camps-subsidy) — Right
- [JDC-אשלים](/he/orgs/jdc-ashalim) — שותפת-מימון
`,
      en: `## About

Friends by Nature was founded in 1996 in response to rising dropout rates and youth risk in the Ethiopian-Israeli community. Operates ~30 youth centers throughout Israel.

## Main programs

- **Youth centers** — leisure-and-education centers after school at 30 locations
- **Personal accompaniment** — youth paired 1:1 with a mentor for personal-issue work
- **Crisis response** — 24/7 hotline + immediate accompaniment in crisis situations
- **Summer camps** — national summer program for 2,500+ participants
- **Leadership workshops** — for outstanding youth

## Who is it for?

- Ethiopian-Israeli youth ages 12-18 at risk or in risk groups
- Families needing crisis accompaniment
- Children who immigrated without their parents (10% of the community)

## How to reach out

- Website: [friendsbynature.org](https://www.friendsbynature.org)
- The organisation publishes no crisis line. In immediate distress: ERAN 1201, NATAL 1-800-363-363, police 100, MDA 101
- HQ: Jerusalem. Youth centers: in every community center.

## See also

- [Domestic violence support](/en/rights/domestic-violence-support) — Right
- [Summer-camp subsidies](/en/rights/summer-camps-subsidy) — Right
- [JDC-Ashalim](/en/orgs/jdc-ashalim) — funding partner
`,
      am: `## ስለ ድርጅቱ

ጓደኞች በተፈጥሮ በ1996 በኢትዮጵያ-እስራኤል ማህበረሰብ የትምህርት ማቋረጥና የወጣት አደጋ መነሳት ምላሽ ለመስጠት ተቋቋመ። በመላ እስራኤል ~30 የወጣት ማዕከላት ያስኬዳል።

## ዋና ፕሮግራሞች

- **የወጣት ማዕከላት** — በ30 ቦታዎች ከትምህርት በኋላ የመዝናኛ-እና-ትምህርት ማዕከላት
- **የግል አጃቢነት** — ወጣቶች ለግል ጉዳዮች ሥራ ከአማካሪ ጋር 1:1 ይጣመራሉ
- **የቀውስ ምላሽ** — 24/7 የቀጥታ መስመር + በቀውስ ሁኔታዎች ፈጣን አጃቢነት
- **የክረምት ካምፖች** — 2,500+ ተሳታፊዎች ላሏቸው ብሔራዊ የክረምት ፕሮግራም
- **የመሪነት አውደ ጥናቶች** — ለተመረጡ ወጣቶች

## ለማን ነው?

- ዕድሜያቸው 12-18 በአደጋ ላይ ወይም በአደጋ ቡድን ውስጥ ያሉ የኢትዮጵያ-እስራኤል ወጣቶች
- የቀውስ አጃቢነት የሚያስፈልጋቸው ቤተሰቦች
- ያለ ወላጆቻቸው የተሰደዱ ልጆች (የማህበረሰቡ 10%)

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [friendsbynature.org](https://www.friendsbynature.org)
- ድርጅቱ የቀውስ መስመር አያሳትምም። በአስቸኳይ፦ ERAN 1201፣ ፖሊስ 100፣ MDA 101
- ዋና መሥሪያ ቤት፦ ኢየሩሳሌም። የወጣት ማዕከላት፦ በሁሉም የማህበረሰብ ማዕከላት።

## ይህንንም ይመልከቱ

- [የቤተሰብ ብጥብጥ ድጋፍ](/am/rights/domestic-violence-support) — Right
- [የክረምት ካምፕ ድጎማ](/am/rights/summer-camps-subsidy) — Right
- [JDC-አሻሊም](/am/orgs/jdc-ashalim) — የፋይናንስ አጋር
`,
    },
  },

  // 10. IAEJ — Israeli Association for Ethiopian Jews
  {
    slug: "iaej",
    category: "legal",
    name: {
      he: "האגודה הישראלית למען יהודי אתיופיה",
      en: "Israeli Association for Ethiopian Jews (IAEJ)",
      am: "የእስራኤል ለኢትዮጵያ አይሁዶች ማህበር (IAEJ)",
    },
    shortDescription: {
      he: "ארגון-גג קהילתי וסנגור מרכזי. מנהיגה את המאבק לאיחוד-משפחות פלשמורה ומפעיל מועדוני-קשישים.",
      en: "Community umbrella and primary advocacy organization. Leads the Falash Mura family-reunification campaign and runs senior centers.",
      am: "የማህበረሰብ ጥላና ዋና የጥብቅና ድርጅት። የፋላሽ ሙራ ቤተሰብ ዳግም ግንኙነት ዘመቻን ይመራልና የአዛውንት ማዕከላትን ያስኬዳል።",
    },
    foundedYear: 1993,
    websiteUrl: "https://www.iaej.co.il",
    headquartersCity: { he: "תל אביב", en: "Tel Aviv", am: "ቴል አቪቭ" },
    relatedRights: ["falash-mura-direct-absorption", "klita-basket"],
    relatedTerms: ["beta-israel", "falash-mura"],
    relatedOrgs: ["tebeka"],
    bodies: {
      he: `## על הארגון

האגודה הישראלית למען יהודי אתיופיה (IAEJ) הוקמה ב-1993 על-ידי קבוצת מנהיגי-קהילה. היא הארגון-גג הקהילתי המרכזי והקול הציבורי של הקהילה האתיופית-ישראלית.

## תכניות עיקריות

- **סנגור פלשמורה** — מאבק ציבורי-פוליטי לאיחוד-משפחות + ייצוג מול ממשלה ו-Knesset
- **מועדוני-קשישים** — 30+ מרכזים יומיים לקשישים יוצאי אתיופיה
- **תכניות-נשים** — קבוצות-תמיכה ונטוורקינג לנשים יוצאות אתיופיה
- **תזכירי-עמדה** — לוועדת חוץ ובטחון, ועדת חוקה, ועדת עלייה
- **שולחן-עגול** — דיאלוג עם משרדי-ממשלה

## למי מיועד?

- יוצאי אתיופיה הזקוקים לסיוע בנושא איחוד-משפחות פלשמורה
- קשישים יוצאי אתיופיה (מעל גיל 65)
- קהילות-מקור לתזכירים-עמדה ומאבק

## איך פונים?

- אתר: [iaej.co.il](https://www.iaej.co.il)
- מטה: תל אביב. נציגים: בכל הערים עם קהילה (38 ערים).
- מועדוני-קשישים: דרך משרד-הרווחה המקומי או באתר

## ראו גם

- [פלשמורה - מסלול קליטה ייעודי](/he/rights/falash-mura-direct-absorption) — Right
- [סל קליטה](/he/rights/klita-basket) — Right
- [מילון: פלשמורה](/he/glossary/falash-mura) — הקשר
- [טבקה](/he/orgs/tebeka) — שותפת-סנגור משפטי
`,
      en: `## About

The Israeli Association for Ethiopian Jews (IAEJ) was founded in 1993 by a group of community leaders. It is the central community umbrella organization and the public voice of the Ethiopian-Israeli community.

## Main programs

- **Falash Mura advocacy** — public-political campaign for family reunification + representation before government and Knesset
- **Senior centers** — 30+ day centers for Ethiopian-Israeli seniors
- **Women's programs** — support groups and networking for Ethiopian-Israeli women
- **Position papers** — to the Foreign Affairs and Defense Committee, Constitution Committee, Aliyah Committee
- **Round table** — dialogue with government ministries

## Who is it for?

- Ethiopian-Israelis needing assistance with Falash Mura family reunification
- Ethiopian-Israeli seniors (65+)
- Source communities for position papers and advocacy

## How to reach out

- Website: [iaej.co.il](https://www.iaej.co.il)
- HQ: Tel Aviv. Representatives: in all 38 community cities.
- Senior centers: through your local welfare office or via website

## See also

- [Falash Mura direct absorption track](/en/rights/falash-mura-direct-absorption) — Right
- [Klita basket](/en/rights/klita-basket) — Right
- [Glossary: Falash Mura](/en/glossary/falash-mura) — context
- [Tebeka](/en/orgs/tebeka) — legal advocacy partner
`,
      am: `## ስለ ድርጅቱ

የእስራኤል ለኢትዮጵያ አይሁዶች ማህበር (IAEJ) በ1993 በማህበረሰብ መሪዎች ቡድን ተቋቋመ። የማህበረሰብ ዋናው ጥላ ድርጅትና የኢትዮጵያ-እስራኤል ማህበረሰብ የህዝብ ድምጽ ነው።

## ዋና ፕሮግራሞች

- **የፋላሽ ሙራ ጥብቅና** — የቤተሰብ ዳግም ግንኙነት የህዝብ-ፖለቲካ ዘመቻ + በመንግስትና ኬሰት ፊት ውክልና
- **የአዛውንት ማዕከላት** — 30+ የኢትዮጵያ-እስራኤል አዛውንቶች የቀን ማዕከላት
- **የሴቶች ፕሮግራሞች** — ለኢትዮጵያ-እስራኤል ሴቶች የድጋፍ ቡድኖችና ኔትወርኪንግ
- **የአቋም ሰነዶች** — ለውጭ ጉዳይና መከላከያ ኮሚቴ፣ ሕገ-መንግስት ኮሚቴ፣ ዐሊያህ ኮሚቴ
- **ክብ ጠረጴዛ** — ከመንግስት ሚኒስቴሮች ጋር ውይይት

## ለማን ነው?

- የፋላሽ ሙራ ቤተሰብ ዳግም ግንኙነት እርዳታ የሚያስፈልጋቸው ኢትዮጵያ-እስራኤላውያን
- የኢትዮጵያ-እስራኤል አዛውንቶች (65+)
- ለአቋም ሰነዶችና ለጥብቅና የመነሻ ማህበረሰቦች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [iaej.co.il](https://www.iaej.co.il)
- ዋና መሥሪያ ቤት፦ ቴል አቪቭ። ተወካዮች፦ በሁሉም 38 የማህበረሰብ ከተሞች።
- የአዛውንት ማዕከላት፦ በአካባቢያዊ የደህንነት ቢሮ ወይም በድረ-ገጽ

## ይህንንም ይመልከቱ

- [የፋላሽ ሙራ ቀጥተኛ መቀበያ መንገድ](/am/rights/falash-mura-direct-absorption) — Right
- [የክሊታ ቅርጫት](/am/rights/klita-basket) — Right
- [መዝገብ፦ ፋላሽ ሙራ](/am/glossary/falash-mura) — ዝርዝር
- [ጠበቃ](/am/orgs/tebeka) — የሕግ ጥብቅና አጋር
`,
    },
  },

  // 11. BINA — Beta Israel of North America
  {
    slug: "bina",
    category: "community",
    name: {
      he: "ביתא ישראל בצפון אמריקה (BINA)",
      en: "Beta Israel of North America (BINA)",
      am: "ቤታ እስራኤል የሰሜን አሜሪካ (BINA)",
    },
    shortDescription: {
      he: "ארגון-גג של קהילת יוצאי אתיופיה בצפון אמריקה. מימון פרויקטים בישראל ובניית גשר בין-קהילתי.",
      en: "Umbrella organization of the Ethiopian-Jewish community in North America. Funds Israeli projects and builds inter-community bridges.",
      am: "በሰሜን አሜሪካ የኢትዮጵያ-አይሁድ ማህበረሰብ ጥላ ድርጅት። የእስራኤል ፕሮጀክቶችን ይደግፋልና የማህበረሰብ መካከል ድልድይ ይገነባል።",
    },
    foundedYear: 2010,
    websiteUrl: "https://binacf.org",
    headquartersCity: { he: "ניו יורק", en: "New York", am: "ኒው ዮርክ" },
    relatedRights: [],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["enp"],
    bodies: {
      he: `## על הארגון

ביתא ישראל בצפון אמריקה (BINA) היא ארגון-גג של ~5,000 ביתא ישראל המתגוררים בארה"ב ובקנדה. רובם בני-משפחות שעלו לישראל אך עברו לצפון-אמריקה לתעסוקה / לימודים. הוקמה ב-2010.

## תכניות עיקריות

- **גיוס-כספים** — לפרויקטים בישראל (ENP, IAEJ, Tene Briut)
- **חיבור-בין-קהילתי** — דיאלוג עם קהילות יהודיות אמריקאיות (פדרציות)
- **גרינוף שגרירים** — שליחי-קהילה לאירועי AJC, AIPAC, ועוד
- **תיירות-מורשת** — סיורי-קהילה לישראל לקרובי-משפחה (yearly heritage tour)
- **ארכיון-בעל-פה** — תיעוד-זיכרון של גלי-העלייה ב-EN

## למי מיועד?

- יוצאי אתיופיה (דור 1, 2, 3) המתגוררים בארה"ב/קנדה
- חברי קהילה יהודית-אמריקאית המעוניינים ללמוד על קהילת ביתא ישראל
- ארגונים בישראל הזקוקים למימון מ-North America

## איך פונים?

- אתר: [binacf.org](https://binacf.org)
- מטה: ניו יורק. ועדות אזוריות: בוסטון, ל"א, מיאמי, טורונטו.
- חברות: $50/שנה לסטודנטים, $150/שנה למבוגרים

## ראו גם

- [מילון: ביתא ישראל](/he/glossary/beta-israel) — הזהות
- [ENP](/he/orgs/enp) — שותפה למימון
`,
      en: `## About

Beta Israel of North America (BINA) is an umbrella organization of ~5,000 Beta Israel residing in the U.S. and Canada. Most are members of families that made aliyah to Israel but moved to North America for employment / education. Founded in 2010.

## Main programs

- **Fundraising** — for Israeli projects (ENP, IAEJ, Tene Briut)
- **Inter-community connection** — dialogue with American Jewish federations
- **Ambassador grooming** — community envoys to AJC, AIPAC, and other events
- **Heritage tourism** — yearly community tours to Israel for relatives
- **Oral archive** — EN-language documentation of aliyah waves

## Who is it for?

- Ethiopian-Israelis (1st, 2nd, 3rd gen) residing in the U.S./Canada
- American-Jewish community members interested in learning about Beta Israel
- Israeli organizations seeking North American funding

## How to reach out

- Website: [binacf.org](https://binacf.org)
- HQ: New York. Regional committees: Boston, LA, Miami, Toronto.
- Membership: $50/year students, $150/year adults

## See also

- [Glossary: Beta Israel](/en/glossary/beta-israel) — the identity
- [ENP](/en/orgs/enp) — funding partner
`,
      am: `## ስለ ድርጅቱ

ቤታ እስራኤል የሰሜን አሜሪካ (BINA) በአሜሪካና በካናዳ የሚኖሩ ~5,000 ቤታ እስራኤል የጥላ ድርጅት ነው። አብዛኞቹ ወደ እስራኤል የተሰደዱና ለሥራ / ትምህርት ወደ ሰሜን አሜሪካ የተጓጓዙ የቤተሰብ አባላት ናቸው። በ2010 ተቋቁሞታል።

## ዋና ፕሮግራሞች

- **የገቢ ማሰባሰብ** — ለእስራኤል ፕሮጀክቶች (ENP፣ IAEJ፣ ቴኔ ብሪዩት)
- **የማህበረሰብ መካከል ግንኙነት** — ከአሜሪካን አይሁድ ፌዴሬሽኖች ጋር ውይይት
- **የአምባሳደር ስልጠና** — ለAJC፣ AIPAC እና ለሌሎች ክንውኖች የማህበረሰብ መልዕክተኞች
- **የቅርስ ቱሪዝም** — ለቤተሰብ አባላት ዓመታዊ የማህበረሰብ ጉዞ ወደ እስራኤል
- **የቃል መዝገብ ቤት** — የስደት ሞገዶች በEN ቋንቋ ሰነዶች

## ለማን ነው?

- በአሜሪካ/ካናዳ የሚኖሩ ኢትዮጵያ-እስራኤላውያን (1ኛ፣ 2ኛ፣ 3ኛ ትውልድ)
- ስለ ቤታ እስራኤል ለመማር የሚፈልጉ የአሜሪካ-አይሁድ ማህበረሰብ አባላት
- ከሰሜን አሜሪካ ድጋፍ የሚፈልጉ የእስራኤል ድርጅቶች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [binacf.org](https://binacf.org)
- ዋና መሥሪያ ቤት፦ ኒው ዮርክ። የክልል ኮሚቴዎች፦ ቦስተን፣ ሎስ አንጀለስ፣ ማያሚ፣ ቶሮንቶ።
- አባልነት፦ ለተማሪዎች በዓመት $50፣ ለጎልማሶች በዓመት $150

## ይህንንም ይመልከቱ

- [መዝገብ፦ ቤታ እስራኤል](/am/glossary/beta-israel) — ማንነት
- [ENP](/am/orgs/enp) — የፋይናንስ አጋር
`,
    },
  },

  // 12. Atid B'midbar — community development
  {
    slug: "atid-bamidbar",
    category: "community",
    name: { he: "עתיד במדבר", en: "Atid B'midbar", am: "አቲድ ባምድባር" },
    shortDescription: {
      he: "ארגון-פיתוח קהילתי בנגב, ממוקד באוכלוסיות יוצאי אתיופיה ואחרים. תכניות תעסוקה, חינוך, ופיתוח מנהיגות.",
      en: "Negev community-development organization focused on Ethiopian-Israeli and other populations. Employment, education, and leadership programs.",
      am: "በነጎቭ ለኢትዮጵያ-እስራኤልና ለሌሎች ህዝቦች ያተኮረ የማህበረሰብ ልማት ድርጅት። የሥራ፣ የትምህርትና የመሪነት ፕሮግራሞች።",
    },
    foundedYear: 2003,
    websiteUrl: "https://www.bamidbar.org",
    headquartersCity: { he: "באר שבע", en: "Beersheba", am: "ቤርሼባ" },
    relatedRights: ["tech-career-bootcamp", "summer-camps-subsidy"],
    relatedTerms: ["beta-israel"],
    relatedOrgs: ["enp"],
    bodies: {
      he: `## על הארגון

עתיד במדבר הוקמה ב-2003 בבאר שבע על-ידי קבוצת תושבי-נגב יוצאי אתיופיה. מתמקדת בפיתוח קהילתי באזור הדרומי, בו ~12,000 יוצאי אתיופיה (כ-7% מהקהילה).

## תכניות עיקריות

- **קוד-קמפ** — בית-ספר לתכנות בבאר שבע — 80+ בוגרים בשנה
- **תעסוקה** — תיווך-עבודה עם חברות הייטק בנגב (חברות SOC + נגב-טק)
- **חינוך** — תגבור לימודי ב-7 בתי ספר באזור באר שבע / רהט / שדרות
- **פיתוח-מנהיגות** — סדנאות לבני נוער לאקטיביזם קהילתי
- **קייטנות-קיץ** — לילדי הקהילה הדרומית

## למי מיועד?

- יוצאי אתיופיה תושבי-נגב (אר שבע, אופקים, אשקלון, נתיבות, שדרות, רהט)
- בני נוער ומבוגרים-בקריירה-ראשונה
- בתי ספר עם 30%+ תלמידים יוצאי אתיופיה בדרום

## איך פונים?

- אתר: [bamidbar.org](https://www.bamidbar.org)
- מטה: באר שבע. נוכחות: כל ערי הנגב.
- רישום: דרך טופס מקוון או דרך בית הספר / מרכז-הקהילה

## ראו גם

- [Tech-Career bootcamp](/he/rights/tech-career-bootcamp) — Right (במקביל ל-ENP)
- [קייטנות-קיץ](/he/rights/summer-camps-subsidy) — Right
- [ENP](/he/orgs/enp) — שותפת-מימון
`,
      en: `## About

Atid B'midbar ("Future in the Desert") was founded in 2003 in Beersheba by a group of Ethiopian-Israeli Negev residents. Focuses on community development in the southern region, home to ~12,000 Ethiopian-Israelis (~7% of the community).

## Main programs

- **Code Camp** — coding bootcamp in Beersheba — 80+ graduates/year
- **Employment** — job placement with Negev tech firms (SOC and Negev-Tech companies)
- **Education** — academic tutoring in 7 schools in the Beersheba / Rahat / Sderot area
- **Leadership development** — youth workshops on community activism
- **Summer camps** — for southern-community children

## Who is it for?

- Ethiopian-Israeli Negev residents (Beersheba, Ofakim, Ashkelon, Netivot, Sderot, Rahat)
- Youth and early-career adults
- Schools with 30%+ Ethiopian-Israeli students in the south

## How to reach out

- Website: [bamidbar.org](https://www.bamidbar.org)
- HQ: Beersheba. Presence: all Negev cities.
- Registration: online form or through your school / community center

## See also

- [Tech-Career bootcamp](/en/rights/tech-career-bootcamp) — Right (parallel to ENP)
- [Summer camps](/en/rights/summer-camps-subsidy) — Right
- [ENP](/en/orgs/enp) — funding partner
`,
      am: `## ስለ ድርጅቱ

አቲድ ባምድባር (በዕብራይስጥ "በምድሩ ወደፊት") በ2003 በቤርሼባ በነጎቭ ውስጥ የሚኖሩ የኢትዮጵያ-እስራኤል ቡድን ተቋቁሟል። በደቡባዊው ክልል፣ ~12,000 ኢትዮጵያ-እስራኤላውያን (የማህበረሰቡ ~7%) በሚኖሩበት፣ የማህበረሰብ ልማት ላይ ያተኮረ ነው።

## ዋና ፕሮግራሞች

- **ኮድ ካምፕ** — በቤርሼባ የኮድ ቦትካምፕ — በዓመት 80+ ምሩቃን
- **ሥራ** — ከነጎቭ ቴክ ድርጅቶች ጋር (SOC እና ነጎቭ-ቴክ) የሥራ ምደባ
- **ትምህርት** — በቤርሼባ / ራሃት / ስደሮት አካባቢ በ7 ትምህርት ቤቶች የአካዳሚክ ድጋፍ
- **የመሪነት ልማት** — በማህበረሰብ ተግባራዊነት ላይ የወጣት አውደ ጥናቶች
- **የክረምት ካምፖች** — ለደቡባዊ-ማህበረሰብ ልጆች

## ለማን ነው?

- የነጎቭ ነዋሪ ኢትዮጵያ-እስራኤላውያን (ቤርሼባ፣ ኦፋኪም፣ አሽኬሎን፣ ነቲቮት፣ ስደሮት፣ ራሃት)
- ወጣቶችና በቀደምት ሥራ ላይ ያሉ ጎልማሶች
- በደቡብ 30%+ ኢትዮጵያ-እስራኤላዊ ተማሪዎች ያሏቸው ትምህርት ቤቶች

## እንዴት እንደሚደርሱ

- ድረ-ገጽ፦ [bamidbar.org](https://www.bamidbar.org)
- ዋና መሥሪያ ቤት፦ ቤርሼባ። መገኘት፦ በሁሉም የነጎቭ ከተሞች።
- ምዝገባ፦ የመስመር ላይ ቅጽ ወይም በትምህርት ቤትዎ / የማህበረሰብ ማዕከል በኩል

## ይህንንም ይመልከቱ

- [የቴክ-ሥራ ቦትካምፕ](/am/rights/tech-career-bootcamp) — Right (ከENP ጋር በትይዩ)
- [የክረምት ካምፖች](/am/rights/summer-camps-subsidy) — Right
- [ENP](/am/orgs/enp) — የፋይናንስ አጋር
`,
    },
  },
];

// --- Helpers ----------------------------------------------------------------

export function pickLocale<T extends { he: string; en?: string; am?: string }>(
  t: T,
  locale: Locale,
): string {
  return t[locale] ?? t.he;
}

export function getOrgBodyForLocale(entry: OrgEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
