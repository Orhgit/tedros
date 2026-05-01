// Career-track seed (RIN-470 — Careers Hub Wave 0 / RIN-469).
//
// 10 career tracks authored in HE/EN/AM. The pillar page (`/careers`) and
// each track page (`/careers/$track`) render directly from this seed.
// City × track programmatic cells (`/careers/$track/$city` — Sub-4) read
// the same shape via `lib/careers/relevance.ts`.
//
// HE source-of-truth (CLAUDE.md). EN + AM mirrored. Same render-from-seed
// pattern as `lib/orgs/orgs.server.ts` — no DB needed.

import type { Translatable } from "../db/columns";
import type { Locale } from "../i18n/config";
import { DEFAULT_LOCALE } from "../i18n/config";
import type { CareerTrack } from "./categories";

export type { CareerTrack } from "./categories";

export interface CareerTrackEntry {
  slug: CareerTrack;
  /** 1 = highest, 10 = lowest. Sort key for landing card grid. */
  priority: number;
  name: Translatable;
  shortDescription: Translatable;
  /** Slugs of related rights (under `/rights/{slug}`). */
  relatedRights: string[];
  /** Slugs of related orgs (under `/orgs/{slug}`). */
  relatedOrgs: string[];
  /** Slugs of related glossary terms (under `/glossary/{slug}`). */
  relatedTerms: string[];
  /** Bootcamp slugs that lead into this track. Filled in by Sub-3. */
  recommendedBootcamps: string[];
  /** Profession slugs from `lib/professionals/categories.ts`. */
  relatedProfessions: string[];
  bodies: Record<Locale, string>;
}

export const CAREER_TRACKS: CareerTrackEntry[] = [
  // 1 — tech
  {
    slug: "tech",
    priority: 1,
    name: { he: "הייטק", en: "Tech", am: "ቴክኖሎጂ" },
    shortDescription: {
      he: "מסלולים לתעשיית ההייטק — bootcamps, mentorship ו-bootstrapped paths למפתחים, אנליסטים ו-product מקהילת יוצאי אתיופיה.",
      en: "Pathways into the Israeli tech industry — bootcamps, mentorship, and bootstrapped tracks for developers, analysts, and product roles from the Ethiopian-Israeli community.",
      am: "ወደ ቴክ ኢንዱስትሪ መግቢያ መንገዶች — ቡት ካምፖች፣ አማካሪነት እና የእድገት መንገዶች ለማበልፀጊዎች፣ ተንታኞች እና ምርት ሚናዎች ከኢትዮጵያ-እስራኤል ማህበረሰብ።",
    },
    relatedRights: ["tech-career-bootcamp", "student-aid"],
    relatedOrgs: ["enp", "olim-beyahad", "isef"],
    relatedTerms: ["enp", "olim-beyahad"],
    recommendedBootcamps: ["enp-tech-career", "itworks-israel", "codeoved"],
    relatedProfessions: ["career-counselor"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

תעשיית ההייטק הישראלית היא מנוע השכר וההזדמנויות הגדול בכלכלה — והייצוג בה של בני קהילת יוצאי אתיופיה עדיין נמוך משמעותית מהממוצע הארצי. תכניות כמו ENP Tech-Career, ITWorks ו-Olim Beyahad פותחות דלתות לתפקידי junior-developer, QA, ו-product-analyst עם תמיכת mentorship צמודה.

## מסלולי כניסה עיקריים

- **Bootcamp 6-12 חודשים** — Tech-Career של ENP (ראשון לציון, באר-שבע, חיפה), ITWorks
- **Mentorship 1:1** — Olim Beyahad לבוגרי תואר במדעי המחשב/מתמטיקה/הנדסה
- **מסלול ISEF** — מצטיינים אקדמיים → entry-level positions בחברות שותפות

## מה כדאי לדעת

- שכר התחלה: ~₪16-22K לחודש (תפקידי junior 2024-2025)
- שלוש הערים שבהן רוב המסלולים פעילים פיזית: תל-אביב, באר-שבע, חיפה
- אין צורך בתואר ראשון — bootcamp + portfolio מספיקים לרוב המעסיקים השותפים`,
      en: `## Why this matters for the community

Israeli tech is the country's biggest wage and mobility engine — and Ethiopian-Israeli representation still lags the national average significantly. Programs like ENP Tech-Career, ITWorks, and Olim Beyahad open doors to junior developer, QA, and product analyst roles with closely-supervised mentorship.

## Main entry routes

- **6-12 month bootcamp** — ENP Tech-Career (Rishon LeZion, Beersheba, Haifa), ITWorks
- **1:1 mentorship** — Olim Beyahad for graduates in CS, math, or engineering
- **ISEF track** — academic excellence → entry-level positions at partner companies

## What to know

- Starting salary: ~₪16-22K/month (junior roles, 2024-2025)
- Three cities host most physical programs: Tel Aviv, Beersheba, Haifa
- No bachelor's required — a bootcamp plus portfolio is enough for most partner employers`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

የእስራኤል ቴክ ዋነኛ የደመወዝና የእድገት መንቀሳቀሻ ነው — ነገር ግን የኢትዮጵያ-እስራኤላውያን ውክልና አሁንም ከአገራዊ መካከለኛ በታች ነው። እንደ ENP Tech-Career፣ ITWorks እና Olim Beyahad ያሉ ፕሮግራሞች ለ junior developer፣ QA እና product analyst ሚናዎች በጥብቅ ተቆጣጣሪ አማካሪነት ይከፍታሉ።

## ዋና መግቢያ መንገዶች

- **6-12 ወር ቡት ካምፕ** — ENP Tech-Career፣ ITWorks
- **1:1 አማካሪነት** — Olim Beyahad ለ CS፣ ሒሳብ ወይም ኢንጂነሪንግ ምሩቃን
- **ISEF መንገድ** — የአካዳሚክ ብቃት → መግቢያ ሚናዎች በአጋር ኩባንያዎች

## ማወቅ ያለበት

- መነሻ ደመወዝ: ~₪16-22K በወር (junior 2024-2025)
- ብዙ ፕሮግራሞች የሚካሄዱባቸው ሦስት ከተሞች: ቴል አቪቭ፣ ቤርሼባ፣ ሀይፋ
- የመጀመሪያ ዲግሪ አያስፈልግም — ቡት ካምፕ እና portfolio ለብዙ አጋር ቀጣሪዎች በቂ ናቸው`,
    },
  },

  // 2 — healthcare
  {
    slug: "healthcare",
    priority: 2,
    name: { he: "בריאות וסיעוד", en: "Healthcare", am: "ጤና" },
    shortDescription: {
      he: "מסלולי תעסוקה במערכת הבריאות — מתאמי בריאות תרבותיים, אחים/אחיות, סייעי-בריאות, ועובדי קהילה דוברי אמהרית.",
      en: "Employment paths in the health system — cultural health navigators, nurses, health aides, and Amharic-speaking community-health workers.",
      am: "በጤና ስርዓት ውስጥ የስራ መንገዶች — የባህል ጤና አማካሪዎች፣ ነርሶች፣ የጤና ረዳቶች እና አማርኛ ተናጋሪ የማህበረሰብ-ጤና ሰራተኞች።",
    },
    relatedRights: [
      "chronic-disease-prevention",
      "medical-translation",
      "tene-briut-mental-health",
    ],
    relatedOrgs: ["tene-briut", "jdc-ashalim"],
    relatedTerms: ["tene-briut"],
    recommendedBootcamps: ["enp-teaching-fellowship", "career-counselors-network"],
    relatedProfessions: ["doctor", "psychologist", "social-worker"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

מערכת הבריאות בישראל סובלת מתת-ייצוג חמור של מתאמי-בריאות דוברי אמהרית, מה שיוצר בעיות תרגום, אבחון ומעקב כרוני. טנא-בריאות מפעילה את הצוות הגדול בארץ של Cultural Health Navigators, ויצירת תפקידי-קהילה דרכה היא נתיב כניסה ישיר.

## מסלולי כניסה עיקריים

- **מתאם-בריאות תרבותי (Tene Briut)** — קליטה במרפאות + הכשרה פנים-ארגונית, אין דרישת תואר
- **קורס סיעוד 3 שנים** — מסלול אקדמי לאחות/אח רישום, מלגות ENP/ISEF זמינות
- **תוכניות הכשרת עובדי-קהילה (JDC-ג'וינט)** — שילוב בריאות קהילתית עם רווחה

## מה כדאי לדעת

- מטרת ייצוג חציונית: 5% מתאמי-בריאות מהקהילה (2030 — תכנית משרד הבריאות)
- שכר התחלה: ~₪9-13K לחודש (מתאם תרבותי), ₪14-17K לאחות
- ערי-קהילה שבהן יש ביקוש גבוה: רחובות, נתניה, ירושלים, באר-שבע, חיפה`,
      en: `## Why this matters for the community

Israel's health system is severely under-staffed with Amharic-speaking health navigators, which causes translation, diagnosis, and chronic-care follow-up gaps. Tene Briut runs Israel's largest Cultural Health Navigator team — and creating a community-health role through them is a direct entry route.

## Main entry routes

- **Cultural Health Navigator (Tene Briut)** — clinic placement + in-house training, no degree required
- **3-year nursing track** — academic path to registered nurse, ENP/ISEF scholarships available
- **Community-worker training (JDC-Ashalim)** — community health combined with welfare

## What to know

- Median representation target: 5% community health navigators by 2030 (Ministry of Health plan)
- Starting salary: ~₪9-13K/month (cultural navigator), ₪14-17K for nurse
- Community cities with high demand: Rehovot, Netanya, Jerusalem, Beersheba, Haifa`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

በእስራኤል የጤና ስርዓት ውስጥ አማርኛ ተናጋሪ የጤና አማካሪዎች በጣም ጥቂት ናቸው፣ ይህም የትርጉም፣ የምርመራና የክትትል ክፍተቶችን ይፈጥራል። ቴኔ ብሪዩት የእስራኤል ትልቁን የባህል ጤና አማካሪ ቡድን ያስተናግዳል — በዚያ መንገድ ሚና መፍጠር ቀጥተኛ መግቢያ ነው።

## ዋና መግቢያ መንገዶች

- **የባህል ጤና አማካሪ (ቴኔ ብሪዩት)** — በክሊኒክ ላይ ምደባ + የውስጥ ስልጠና፣ ዲግሪ አያስፈልግም
- **3 ዓመት የነርሲንግ መንገድ** — ወደ ምዝግብ ነርስ የአካዳሚክ መንገድ፣ ENP/ISEF እርዳታ አለ
- **የማህበረሰብ ሰራተኛ ስልጠና (JDC-Ashalim)** — የማህበረሰብ ጤና ከደህንነት ጋር ተጣምሮ

## ማወቅ ያለበት

- መካከለኛ ውክልና ግብ: 5% የማህበረሰብ ጤና አማካሪዎች በ2030 (የጤና ሚኒስቴር እቅድ)
- መነሻ ደመወዝ: ~₪9-13K በወር (የባህል አማካሪ)፣ ₪14-17K ለነርስ
- ከፍተኛ ፍላጎት ያላቸው የማህበረሰብ ከተሞች: ሬሆቮት፣ ነታንያ፣ ኢየሩሳሌም፣ ቤርሼባ፣ ሀይፋ`,
    },
  },

  // 3 — education
  {
    slug: "education",
    priority: 3,
    name: { he: "חינוך והוראה", en: "Education", am: "ትምህርት" },
    shortDescription: {
      he: "מסלולי הוראה והדרכה — מורים, רכזי-קהילה במוסדות חינוך, מנטורים אקדמיים ועובדי-נוער.",
      en: "Teaching and educational paths — teachers, school community coordinators, academic mentors, and youth workers.",
      am: "የማስተማር እና ትምህርታዊ መንገዶች — መምህራን፣ የትምህርት ቤት ማህበረሰብ አስተባባሪዎች፣ የአካዳሚክ አማካሪዎች እና የወጣት ሰራተኞች።",
    },
    relatedRights: ["matriculation-grant", "student-aid", "youth-mentorship"],
    relatedOrgs: ["enp", "fidel", "hila", "atid-bamidbar"],
    relatedTerms: ["enp"],
    recommendedBootcamps: ["enp-teaching-fellowship", "hila-bagrut-tech"],
    relatedProfessions: ["social-worker", "career-counselor"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

חינוך הוא נתיב מוכח ל-mobility בקהילה — והגוף הגדול ביותר שמכשיר מורים מהקהילה הוא ENP, יחד עם פידל וחילה שעוסקים בליווי הורי-תלמידים והשלמת בגרות. דרישת המערכת לעובדי הוראה דוברי אמהרית גוברת במיוחד בערי הקליטה.

## מסלולי כניסה עיקריים

- **ENP Teaching Fellowship** — fellowship שנתי + הכשרה למורה מן הקהילה
- **השלמת בגרות + B.Ed** — מסלול חילה (Hila) להשלמת בגרות → תואר ראשון בחינוך
- **רכזי-קהילה בבתי ספר** — תפקידי-גישור מבית הספר להורים (פידל / atid-bamidbar)

## מה כדאי לדעת

- מספר משרות שנתי: ~150-200 משרות מורה חדשות עבור הקהילה (אומדן ENP, 2024)
- שכר התחלה: ~₪10-12K לחודש (מורה מתחיל)
- ערים עם ביקוש גבוה: כל 16 ערי הקליטה, במיוחד נתניה, רחובות, באר-שבע, אשדוד`,
      en: `## Why this matters for the community

Education is a proven mobility path — and the biggest pipeline for community teachers is ENP, alongside Fidel and Hila working on parent engagement and matriculation completion. System demand for Amharic-speaking educators is rising especially in absorption cities.

## Main entry routes

- **ENP Teaching Fellowship** — yearly fellowship + community-teacher training
- **Matriculation completion + B.Ed** — Hila track for matriculation → bachelor's in education
- **School community coordinators** — school-to-parent bridging roles (Fidel / Atid Bamidbar)

## What to know

- Annual openings: ~150-200 new teaching positions for the community (ENP estimate, 2024)
- Starting salary: ~₪10-12K/month (entry-level teacher)
- High-demand cities: all 16 absorption cities, especially Netanya, Rehovot, Beersheba, Ashdod`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

ትምህርት የተረጋገጠ የዕድገት መንገድ ነው — ለማህበረሰብ መምህራን ትልቁ ምንጭ ENP ሲሆን፣ ከፊደል እና ሂላ ጋር ተጣምሮ ለወላጅ ተሳትፎ እና የብቃት ምስክር ወረቀት መጨረስ ይሰራል። የስርዓቱ የአማርኛ-ተናጋሪ መምህራን ፍላጎት በተለይ በመቀበያ ከተሞች ይጨምራል።

## ዋና መግቢያ መንገዶች

- **ENP የማስተማር Fellowship** — ዓመታዊ fellowship + የማህበረሰብ መምህር ስልጠና
- **የብቃት ምስክር መጨረስ + B.Ed** — የሂላ መንገድ
- **የትምህርት ቤት ማህበረሰብ አስተባባሪዎች** — ከትምህርት ቤት ወደ ወላጆች ድልድይ ሚናዎች

## ማወቅ ያለበት

- ዓመታዊ ቦታዎች: ~150-200 አዲስ የማስተማር ቦታዎች (ENP ግምት፣ 2024)
- መነሻ ደመወዝ: ~₪10-12K በወር
- ከፍተኛ ፍላጎት ያላቸው ከተሞች: 16ቱ የመቀበያ ከተሞች ሁሉ`,
    },
  },

  // 4 — public-sector
  {
    slug: "public-sector",
    priority: 4,
    name: { he: "שירות ציבורי", en: "Public Sector", am: "የመንግስት አገልግሎት" },
    shortDescription: {
      he: "כניסה לשירות הציבורי דרך ייצוג הולם (צו 50) — משרדי ממשלה, רשויות מקומיות, ושירות התעסוקה.",
      en: "Entry into the Israeli civil service via affirmative-action representation (Order 50) — ministries, municipalities, and the Employment Service.",
      am: "በቅድሚያ ውክልና (ትዕዛዝ 50) በኩል ወደ መንግስት አገልግሎት መግቢያ — ሚኒስቴሮች፣ ማዘጋጃ ቤቶች እና የቅጥር አገልግሎት።",
    },
    relatedRights: ["public-sector-representation", "tebeka-legal-aid"],
    relatedOrgs: ["tebeka", "iaej"],
    relatedTerms: ["beta-israel"],
    recommendedBootcamps: ["atidim-academic", "atidim-military"],
    relatedProfessions: ["lawyer", "social-worker", "career-counselor"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

צו נציבות שירות המדינה ("צו 50") מחייב ייצוג הולם של בני קהילת יוצאי אתיופיה במשרות שירות המדינה — אבל היישום בפועל עדיין רחוק מהיעד. הכרת המסלולים והגשת מועמדות נכונה (סימון flag) הם המפתח.

## מסלולי כניסה עיקריים

- **משרות עם flag צו-50** — חובת מעסיק לתעדף בשורה כפול
- **עתידים אקדמי** — מסלול אקדמי + שירות ציבורי מובטח לזוכים
- **עתידים צה"לי** — צה"ל → תפקיד מדיני ראשון בשירות הציבורי

## מה כדאי לדעת

- אחוז ייצוג נוכחי: 1.7% (יעד: 2.5% עד 2027 — מבקר המדינה)
- ערעור לאחר דחייה: דרך טבקה (Tebeka) — מקרי discrimination מתועדים
- שכר התחלה: ~₪9-14K (דרגה 1-3 בשירות המדינה)`,
      en: `## Why this matters for the community

Israel's Civil Service Commission Order ("Order 50") mandates representative employment of Ethiopian-Israelis in state-service roles — but actual implementation still lags the target. Knowing the routes and applying correctly (with the affirmative-action flag) is the key.

## Main entry routes

- **Order-50 flagged positions** — employer must prefer when shortlisted at par
- **Atidim academic** — academic path with guaranteed civil-service placement for awardees
- **Atidim military** — IDF → first civil-service political role

## What to know

- Current representation: 1.7% (target: 2.5% by 2027 — State Comptroller)
- Appeals after rejection: through Tebeka — documented discrimination cases
- Starting salary: ~₪9-14K (state-service grades 1-3)`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

የመንግስት አገልግሎት ኮሚሽን ትዕዛዝ ("ትዕዛዝ 50") የኢትዮጵያ-እስራኤላውያንን ተወካይ ቅጥር ለመንግስት አገልግሎት ሚናዎች ያስገድዳል — ግን ትግበራው አሁንም ከግቡ በታች ነው። መንገዶችን ማወቅ እና በትክክል ማመልከት (ምልክት ጋር) ቁልፉ ነው።

## ዋና መግቢያ መንገዶች

- **ትዕዛዝ-50 ምልክት ቦታዎች** — ቀጣሪ በተመረጠ ጊዜ ቅድሚያ መስጠት ግዴታው ነው
- **አካዳሚክ Atidim** — ለተሸላሚዎች የተረጋገጠ የመንግስት አገልግሎት ቦታ
- **ወታደራዊ Atidim** — IDF → መጀመሪያ የመንግስት አገልግሎት ሚና

## ማወቅ ያለበት

- አሁናዊ ውክልና: 1.7% (ግብ: 2.5% በ2027)
- አግልግሎ መቃወም: በጤቤካ በኩል
- መነሻ ደመወዝ: ~₪9-14K`,
    },
  },

  // 5 — entrepreneurship
  {
    slug: "entrepreneurship",
    priority: 5,
    name: { he: "יזמות ועסקים", en: "Entrepreneurship", am: "ስራ ፈጠራ" },
    shortDescription: {
      he: "פתיחת עסק עצמאי — מימון, ייעוץ עסקי, וגישה ל-network של יזמים מהקהילה.",
      en: "Starting your own business — funding, business mentorship, and access to a network of community entrepreneurs.",
      am: "የራስዎን ስራ መጀመር — ገንዘብ፣ የንግድ አማካሪነት እና ከማህበረሰብ ስራ ፈጣሪዎች ጋር መተዋወቅ።",
    },
    relatedRights: ["ujia-kiedf-business-loans"],
    relatedOrgs: ["olim-beyahad", "iaej", "atid-bamidbar"],
    relatedTerms: [],
    recommendedBootcamps: ["scaleup-velocity", "olim-beyahad-mentorship"],
    relatedProfessions: ["accountant", "career-counselor"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

עסקים-קטנים בבעלות יוצאי אתיופיה הם נתיב mobility משמעותי, אבל גישה למימון ראשוני וליווי עסקי עדיין מוגבלת. UJIA-KIEDF מספקות הלוואות ביזמיות ייעודיות, ו-ScaleUp Velocity מציעה bootcamp ליזמות לבוגרי תואר.

## מסלולי כניסה עיקריים

- **הלוואת UJIA-KIEDF** — הלוואה עד ₪150K, ריבית סובסידית, ליווי 12 חודשים
- **ScaleUp Velocity** — bootcamp 16 שבועות + seed funding לבוגרים מצטיינים
- **ENP Entrepreneur Track** — חניכים בבוגרי Tech-Career שמתחילים עסק טכנולוגי

## מה כדאי לדעת

- שיעור עסקים בבעלות יוצאי אתיופיה: 1.2% מהמשק (לעומת 5% באוכלוסייה הכללית)
- עסקים פעילים שורדים שנה: 67% (לעומת 73% במשק) — סגירת gap דורש ליווי עסקי
- ערים מובילות ליזמות: תל-אביב, חיפה, ירושלים, באר-שבע, נתניה, רחובות`,
      en: `## Why this matters for the community

Small businesses owned by Ethiopian-Israelis are a meaningful mobility path — but access to seed capital and business mentorship still lags. UJIA-KIEDF provides community-targeted business loans; ScaleUp Velocity offers a graduate-level entrepreneurship bootcamp.

## Main entry routes

- **UJIA-KIEDF loan** — up to ₪150K, subsidized interest, 12-month mentorship
- **ScaleUp Velocity** — 16-week bootcamp + seed funding for top graduates
- **ENP Entrepreneur Track** — Tech-Career grads launching tech businesses

## What to know

- Ethiopian-Israeli-owned businesses: 1.2% of the economy (vs 5% in the general population)
- 1-year survival rate: 67% (vs 73% nationally) — closing the gap needs mentorship
- Top entrepreneurial cities: Tel Aviv, Haifa, Jerusalem, Beersheba, Netanya, Rehovot`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

በኢትዮጵያ-እስራኤላውያን ባለቤትነት የተያዙ ትናንሽ ንግዶች ጠቃሚ የእድገት መንገድ ናቸው — ነገር ግን ወደ መነሻ ካፒታልና የንግድ አማካሪነት መድረስ አሁንም ጥቂት ነው። UJIA-KIEDF ለማህበረሰብ-ያተኮሩ የንግድ ብድሮችን ይሰጣል፣ ScaleUp Velocity ደግሞ ለምሩቃን የሥራ ፈጠራ ቡት ካምፕ ያቀርባል።

## ዋና መግቢያ መንገዶች

- **UJIA-KIEDF ብድር** — እስከ ₪150K፣ የተደገፈ ወለድ፣ የ12 ወር አማካሪነት
- **ScaleUp Velocity** — 16 ሳምንት ቡት ካምፕ
- **ENP የስራ ፈጠራ መንገድ**

## ማወቅ ያለበት

- በኢትዮጵያ-እስራኤላውያን ባለቤትነት ንግዶች: 1.2% (ከ5% ጋር ሲነጻጸር)
- የ1 ዓመት ህልውና: 67% (ከ73% ጋር)
- ቁልፍ ከተሞች: ቴል አቪቭ፣ ሀይፋ፣ ኢየሩሳሌም፣ ቤርሼባ፣ ነታንያ፣ ሬሆቮት`,
    },
  },

  // 6 — finance
  {
    slug: "finance",
    priority: 6,
    name: { he: "פיננסים וחשבונאות", en: "Finance", am: "ፋይናንስ" },
    shortDescription: {
      he: "מסלולי פיננסים — רואי חשבון, יועצי משכנתאות, אנליסטים פיננסיים, ועובדי בנקים.",
      en: "Finance pathways — accountants, mortgage advisors, financial analysts, and bank employees.",
      am: "የፋይናንስ መንገዶች — የሂሳብ ባለሙያዎች፣ የሞርጌጅ አማካሪዎች፣ የፋይናንስ ተንታኞችና የባንክ ሰራተኞች።",
    },
    relatedRights: ["600k-mortgage"],
    relatedOrgs: ["isef", "olim-beyahad"],
    relatedTerms: [],
    recommendedBootcamps: ["isef-excellence-employment", "presen"],
    relatedProfessions: ["accountant", "mortgage-advisor"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

תפקידי פיננסים מציעים שכר יציב, mobility ברורה (junior → senior → manager), והם בעלי ביקוש קבוע. ה-pipeline של מצטיינים אקדמיים דרך ISEF הוא הנתיב המרכזי לקהילה לתפקידי entry-level בבנקים, חברות ראיית-חשבון, ופירמות פיננסיות.

## מסלולי כניסה עיקריים

- **תואר ראשון בחשבונאות + מלגת ISEF** — מסלול מצטיינים → התמחות בפירמה
- **קורס יועץ משכנתאות** — דרישה מובנית לחברה האתיופית-ישראלית בגלל המשכנתא הקהילתית
- **PRESEN — interview prep** — הכנה לראיונות ללא pre-screening bias

## מה כדאי לדעת

- שכר התחלה: ₪12-18K (Junior accountant), ₪10-14K (יועץ משכנתאות)
- ערים פיננסיות מרכזיות: תל-אביב, רמת-גן, ירושלים, חיפה, נתניה
- חובה: רישיון רואה-חשבון מלשכת רואי החשבון לאחר התמחות שנתיים`,
      en: `## Why this matters for the community

Finance roles offer stable pay, clear mobility (junior → senior → manager), and steady demand. The academic-excellence pipeline via ISEF is the community's primary route into entry-level positions at banks, accounting firms, and financial firms.

## Main entry routes

- **Bachelor's in accounting + ISEF scholarship** — excellence track → firm internship
- **Mortgage advisor course** — community-specific demand due to the community mortgage
- **PRESEN — interview prep** — interview preparation without pre-screening bias

## What to know

- Starting salary: ₪12-18K (junior accountant), ₪10-14K (mortgage advisor)
- Key finance cities: Tel Aviv, Ramat Gan, Jerusalem, Haifa, Netanya
- Required: CPA license from the Institute of Certified Public Accountants after a 2-year internship`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

የፋይናንስ ሚናዎች የተረጋጋ ደመወዝ፣ ግልፅ ዕድገት፣ እና ቋሚ ፍላጎት ይሰጣሉ። የ ISEF የአካዳሚክ-ብቃት pipeline ለማህበረሰቡ ዋና መንገድ ነው ወደ banks፣ የሂሳብ ኩባንያዎች እና የፋይናንስ ድርጅቶች።

## ዋና መግቢያ መንገዶች

- **የመጀመሪያ ዲግሪ በሂሳብ + ISEF እርዳታ**
- **የሞርጌጅ አማካሪ ኮርስ**
- **PRESEN — interview prep**

## ማወቅ ያለበት

- መነሻ ደመወዝ: ₪12-18K
- ቁልፍ የፋይናንስ ከተሞች: ቴል አቪቭ፣ ራማት ጋን፣ ኢየሩሳሌም፣ ሀይፋ፣ ነታንያ
- አስፈላጊ: CPA ፈቃድ ከሁለት ዓመት ስልጠና በኋላ`,
    },
  },

  // 7 — social-work
  {
    slug: "social-work",
    priority: 7,
    name: { he: "עבודה סוציאלית", en: "Social Work", am: "ማህበራዊ ስራ" },
    shortDescription: {
      he: "תפקידי עבודה סוציאלית — לשכות רווחה, מרכזי-קהילה, פנים-ארגוניות לארגוני סיוע, ועובדי-נוער.",
      en: "Social-work roles — welfare offices, community centers, in-house roles at aid organizations, and youth workers.",
      am: "የማህበራዊ ስራ ሚናዎች — የደህንነት ቢሮዎች፣ የማህበረሰብ ማዕከላት፣ ወጣት ሰራተኞች።",
    },
    relatedRights: ["family-counseling", "domestic-violence-support", "youth-mentorship"],
    relatedOrgs: ["jdc-ashalim", "friends-by-nature", "iaej"],
    relatedTerms: [],
    recommendedBootcamps: ["enp-teaching-fellowship", "career-counselors-network"],
    relatedProfessions: ["social-worker", "psychologist"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

עבודה סוציאלית היא הנתיב הקלאסי לתעסוקה ציבורית-משמעותית בקהילה — דרישת המערכת לעו"ס דוברי אמהרית גבוהה במיוחד בלשכות רווחה בערי הקליטה ובמרכזי טיפול בני נוער ב-Friends by Nature.

## מסלולי כניסה עיקריים

- **תואר ראשון בעבודה סוציאלית** — מסלול 3 שנים, מלגות ENP/ISEF זמינות לקהילה
- **תפקידי-עוזר עו"ס** — אפשרי בלי תואר תוך כדי לימודים (לשכות רווחה ערי-קהילה)
- **JDC-Ashalim Strong Families** — תכנית ליווי + תעסוקה במשפחות בסיכון

## מה כדאי לדעת

- שכר עו"ס מתחיל: ~₪10-12K (משרד הרווחה דרגה ב')
- חובה: רישיון מועצת עו"ס + 2 שנות התמחות
- ערים בולטות: כל ערי הקליטה — אבל רחובות, נתניה, באר-שבע מבליטות בביקוש`,
      en: `## Why this matters for the community

Social work is the classic path to meaningful public-sector employment — system demand for Amharic-speaking social workers is high in welfare offices in absorption cities and in youth-treatment centers like Friends by Nature.

## Main entry routes

- **Bachelor's in social work** — 3-year track, ENP/ISEF community scholarships available
- **Social-work assistant roles** — possible without a degree while studying (community-city welfare offices)
- **JDC-Ashalim Strong Families** — guidance + employment in at-risk families

## What to know

- Entry social-worker salary: ~₪10-12K (Welfare Ministry grade 2)
- Required: license from the Council of Social Workers + 2-year internship
- Notable cities: all absorption cities — Rehovot, Netanya, Beersheba lead in demand`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

ማህበራዊ ስራ የክላሲክ የመንግስት ሥራ መንገድ ነው — የስርዓቱ ፍላጎት ለአማርኛ-ተናጋሪ ማህበራዊ ሰራተኞች በመቀበያ ከተሞች ከፍተኛ ነው።

## ዋና መግቢያ መንገዶች

- **የመጀመሪያ ዲግሪ በማህበራዊ ስራ**
- **የማህበራዊ ሰራተኛ ረዳት ሚናዎች**
- **JDC-Ashalim Strong Families**

## ማወቅ ያለበት

- መነሻ ደመወዝ: ~₪10-12K
- አስፈላጊ: ፈቃድ + 2 ዓመት ስልጠና`,
    },
  },

  // 8 — law
  {
    slug: "law",
    priority: 8,
    name: { he: "משפטים", en: "Law", am: "ህግ" },
    shortDescription: {
      he: "מסלולי קריירה משפטית — סטודנטיאליים, מתמחים, ועורכי דין הקרובים לטבקה ולעבודת-זכויות הקהילה.",
      en: "Legal-career pathways — students, interns, and lawyers connected to Tebeka and the community's rights advocacy work.",
      am: "የህግ ስራ መንገዶች — ተማሪዎች፣ ሰልጣኞች እና ጠበቆች።",
    },
    relatedRights: ["tebeka-legal-aid", "public-sector-representation"],
    relatedOrgs: ["tebeka", "iaej"],
    relatedTerms: ["tebeka"],
    recommendedBootcamps: ["isef-excellence-employment"],
    relatedProfessions: ["lawyer"],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

עורכי דין מהקהילה נדרשים לטיפול במקרי discrimination, ייצוג זכויות, וערעורים על דחיות-צו-50. טבקה (Tebeka) היא ה-pipeline המרכזי — מתמחים שלה הופכים לעו"ד שמטפלים בתיקי קהילה ספציפיים.

## מסלולי כניסה עיקריים

- **LLB + מלגת ISEF** — מסלול 4 שנים, מלגות מצטיינים ל-3 שנים אחרונות
- **התמחות בטבקה** — תיקי advocacy + discrimination, רשת לאחר ההתמחות
- **תפקידי עוזר משפטי (Legal Aide)** — אפשריים בלי תואר, פוטנציאל למסלול מואץ

## מה כדאי לדעת

- שכר מתמחה: ~₪8-10K (סטנדרט לכל הענף)
- שכר עו"ד שנה ראשונה אחרי התמחות: ₪13-22K (תלוי בפירמה)
- ערים: תל-אביב (רוב הפירמות), ירושלים (ממשלה), חיפה, באר-שבע`,
      en: `## Why this matters for the community

Community lawyers are needed to handle discrimination cases, rights advocacy, and appeals against Order-50 rejections. Tebeka is the primary pipeline — its interns become lawyers handling community-specific casework.

## Main entry routes

- **LLB + ISEF scholarship** — 4-year track, excellence scholarships for the final 3 years
- **Tebeka internship** — advocacy + discrimination casework, post-internship network
- **Legal-aide roles** — possible without a degree, with an accelerated track potential

## What to know

- Internship salary: ~₪8-10K (industry standard)
- First-year post-internship salary: ₪13-22K (depending on firm)
- Cities: Tel Aviv (most firms), Jerusalem (government), Haifa, Beersheba`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

የማህበረሰብ ጠበቆች ለ discrimination ጉዳዮች፣ ለመብቶች ጥብቅና እና ለትዕዛዝ-50 ውድቀቶች ይፈለጋሉ። ጤቤካ ዋናው pipeline ነው።

## ዋና መግቢያ መንገዶች

- **LLB + ISEF እርዳታ**
- **በጤቤካ ስልጠና**
- **የህግ ረዳት ሚናዎች**

## ማወቅ ያለበት

- የስልጠና ደመወዝ: ~₪8-10K
- መጀመሪያ ዓመት ደመወዝ: ₪13-22K
- ከተሞች: ቴል አቪቭ፣ ኢየሩሳሌም፣ ሀይፋ፣ ቤርሼባ`,
    },
  },

  // 9 — trades
  {
    slug: "trades",
    priority: 9,
    name: { he: "מקצועות יד", en: "Trades", am: "የእጅ ሙያዎች" },
    shortDescription: {
      he: "מקצועות יד מסובסדים — חשמל, אינסטלציה, ריתוך, מכונאות. אישור מקצועי + פתיחת עסק עצמאי בתום הקורס.",
      en: "Subsidized trades — electrical, plumbing, welding, mechanics. Professional certification + opening your own business after the course.",
      am: "የተደገፉ የእጅ ሙያዎች — ኤሌክትሪክ፣ ቧንቧ፣ ብየዳ፣ ሜካኒክ።",
    },
    relatedRights: ["ujia-kiedf-business-loans"],
    relatedOrgs: ["atid-bamidbar"],
    relatedTerms: [],
    recommendedBootcamps: ["madrasa-trades", "ta-employment-academy"],
    relatedProfessions: [],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

מקצועות יד מציעים נתיב מהיר ל-self-employment עם ביקוש קבוע, וזו דרך מקובלת ל-mobility בקהילה ללא דרישת תואר אקדמי. תכניות מסובסדות בערי-קהילה (אבי שלום ב-קרית-מלאכי, רחובות) מקצרות את זמן ההסמכה.

## מסלולי כניסה עיקריים

- **קורס חשמלאי 6-9 חודשים** — מסובסד ע"י משרד העבודה לבני קהילה (תקציב 2024)
- **קורס אינסטלטור 4-6 חודשים** — מסובסד באופן דומה, ביקוש גבוה
- **Madrasa מקצועות יד** — רשת קורסים מקצועיים שכוללת ליווי לפתיחת עסק עצמאי

## מה כדאי לדעת

- אחרי הסמכה: עצמאי או עובד שכיר; שכר עובד שכיר ~₪14-18K, עצמאי ~₪20-30K (תלוי בעומס)
- חובה: רישיון מקצועי ממשרד העבודה + ביטוח אחריות מקצועית
- ערים: ביקוש גבוה בכל 16 ערי הקליטה — מקומיים מעדיפים בעלי מקצוע מהקהילה`,
      en: `## Why this matters for the community

Trades offer a fast path to self-employment with steady demand — a well-established mobility route without an academic degree. Subsidized programs in absorption cities (Avi Shalom in Kiryat Malachi, Rehovot) shorten certification time.

## Main entry routes

- **Electrician 6-9 month course** — Ministry of Labor subsidy for community members (2024 budget)
- **Plumber 4-6 month course** — similarly subsidized, high demand
- **Madrasa trades** — career-oriented courses with a self-employment launch package

## What to know

- After certification: self-employed or salaried; salaried ~₪14-18K, self-employed ~₪20-30K (depends on volume)
- Required: professional license from the Ministry of Labor + professional liability insurance
- Cities: high demand in all 16 absorption cities — locals prefer community professionals`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

የእጅ ሙያዎች ፈጣን የራስ-ስራ መንገድ ይሰጣሉ።

## ዋና መግቢያ መንገዶች

- **6-9 ወር የኤሌክትሪክ ኮርስ**
- **4-6 ወር የቧንቧ ኮርስ**
- **Madrasa**

## ማወቅ ያለበት

- ደመወዝ: ~₪14-18K (ቅጥር)፣ ~₪20-30K (የራስ-ስራ)
- አስፈላጊ: ፈቃድ`,
    },
  },

  // 10 — retail-services
  {
    slug: "retail-services",
    priority: 10,
    name: { he: "קמעונאות ושירות", en: "Retail & Services", am: "ችርቻሮ እና አገልግሎቶች" },
    shortDescription: {
      he: "תפקידי שירות, מכירות וניהול-חנות — נתיב mobility מ-junior ל-store-manager בלי דרישת תואר.",
      en: "Service, sales, and store-management roles — a mobility path from junior to store-manager without a degree.",
      am: "የአገልግሎት፣ የሽያጭ እና የመደብር አመራር ሚናዎች።",
    },
    relatedRights: [],
    relatedOrgs: ["olim-beyahad"],
    relatedTerms: [],
    recommendedBootcamps: ["place-il", "presen"],
    relatedProfessions: [],
    bodies: {
      he: `## למה זה רלוונטי לקהילה

קמעונאות ושירות הם נתיב כניסה זמין ביותר — אין דרישת תואר, השכר מתחיל ב-₪32 לשעה, ויש מסלול ברור ל-shift-leader → assistant-manager → store-manager. תכניות כמו Place-IL מסייעות במצבי הסבה מהירה אחרי משבר תעסוקתי.

## מסלולי כניסה עיקריים

- **משרות ראשונות** — שופרסל, רמי לוי, רשתות אופנה — אין דרישות מוקדמות
- **Place-IL** — רשת השמה לבעלי משברי-תעסוקה אחרי קורונה / ניוד
- **PRESEN** — הכנה לראיונות עבודה (גם ל-customer-facing roles)

## מה כדאי לדעת

- שכר התחלה: ₪32-37 לשעה (4-5 שעות יום בממוצע = ~₪6-8K/חודש part-time)
- מסלול שכר אחרי 2-3 שנים: ₪10-14K (assistant-manager)
- ערים: ביקוש קבוע בכל 16 ערי הקליטה ובמרכזי קניות אזוריים`,
      en: `## Why this matters for the community

Retail and service is the most accessible entry — no degree, starting wage of ₪32/hour, clear mobility from shift-lead → assistant-manager → store-manager. Programs like Place-IL help with rapid pivots after employment crises.

## Main entry routes

- **Entry-level positions** — Shufersal, Rami Levy, fashion chains — no prerequisites
- **Place-IL** — placement network for those facing job-disruption after COVID / relocation
- **PRESEN** — interview prep (also for customer-facing roles)

## What to know

- Starting wage: ₪32-37/hour (4-5 hour days on average = ~₪6-8K/month part-time)
- After 2-3 years: ₪10-14K (assistant-manager)
- Cities: steady demand in all 16 absorption cities and regional shopping centers`,
      am: `## ለማህበረሰቡ ለምን ጠቃሚ ነው

ችርቻሮ እና አገልግሎት በጣም ተደራሽ መግቢያ ነው።

## ዋና መግቢያ መንገዶች

- **መነሻ ቦታዎች**
- **Place-IL**
- **PRESEN**

## ማወቅ ያለበት

- መነሻ ደመወዝ: ₪32-37 በሰዓት
- ከ2-3 ዓመት በኋላ: ₪10-14K`,
    },
  },
];

// ── lookup helpers ─────────────────────────────────────────────────────────

export function findCareerTrack(slug: string): CareerTrackEntry | null {
  return CAREER_TRACKS.find((t) => t.slug === slug) ?? null;
}

export function careerTracksByPriority(): CareerTrackEntry[] {
  return [...CAREER_TRACKS].sort((a, b) => a.priority - b.priority);
}

export function careerTrackBody(entry: CareerTrackEntry, locale: Locale): string {
  return entry.bodies[locale] ?? entry.bodies[DEFAULT_LOCALE];
}
