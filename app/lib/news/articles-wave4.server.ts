// Wave 4 articles — Content & SEO batch (TED).
// Import and spread into ARTICLES in articles.server.ts.

import type { NewsArticleEntry } from "./articles.server";

export const ARTICLES_WAVE4: NewsArticleEntry[] = [
  {
    slug: "child-allowance-guide-ethiopian-community",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-02",
    tags: ["family", "policy"],
    title: {
      he: "קצבת ילדים — מדריך מלא לקהילת יוצאי אתיופיה",
      en: "Child allowance — complete guide for the Ethiopian-Israeli community",
      am: "የልጆች ጡረታ — ለኢትዮጵያ-እስራኤል ማህበረሰብ ሙሉ መመሪያ",
    },
    excerpt: {
      he: "קצבת ילדים משולמת מדי חודש לכל משפחה עם ילדים עד גיל 18. כיצד מוודאים שמקבלים, כמה, ומה זה חיסכון לכל ילד.",
      en: "Child allowance is paid monthly to every family with children up to age 18. How to verify you receive it, how much, and what Savings for Every Child is.",
      am: "የልጆች ጡረታ ለእያንዳንዱ እስከ 18 ዓመት ልጆች ላሏቸው ቤተሰቦች በወር ይከፈላል።",
    },
    bodies: {
      he: `## מה זה קצבת ילדים

קצבת ילדים היא תשלום חודשי מהמוסד לביטוח לאומי לכל משפחה בישראל שמתגוררת בה ילדים עד גיל 18. היא אוטומטית — בדרך כלל נפתחת ברגע שמדווחים על הלידה, אך כדאי לוודא.

## כמה מקבלים (כללי)

- סכום חודשי **לכל ילד**, עד גיל 18
- **תוספת עבור הילד השני עד החמישי** — סכום גבוה יותר בדרך כלל
- הסכומים מתעדכנים מעת לעת על-פי החלטות ממשלה

## מתי משלמים

- משולמת **פעם בחודש**, בדרך כלל ב-20 לחודש, ישירות לחשבון הבנק של ההורה
- עבור ילדים רבים — סכום מצטבר

## חיסכון לכל ילד

במקביל לקצבה, המדינה מפקידה **חיסכון לכל ילד** — סכום חודשי נוסף שנצבר עד גיל 18 (ואז עומד לרשות הילד). ההורה יכול:
- לבחור **בין בנק לבית השקעות** ומסלול
- להוסיף מסכום הקצבה (מהסכום שנצבר). אם לא בחרתם — נפתח מסלול ברירת מחדל.

## איך מוודאים שמקבלים — צעד אחר צעד

1. **בדקו באזור האישי** באתר ביט"ל שהקצבה פעילה
2. **ודאו פרטי חשבון בנק** מעודכנים
3. **בחרו מסלול חיסכון לכל ילד** (בנק / בית השקעות)
4. **דווחו על שינויים** (לידה, מעבר דירה)

## עזרה

- **מוקד ביטוח לאומי: 1201**
- **טבקה** — מיצוי זכויות

> הסכומים מתעדכנים; בדקו באתר ביט"ל.

## ראו גם

- [תמיכה בהורים חד-הוריים](/he/family)
- [קצבת זקנה](/he/rights)`,
      en: `## What child allowance is

Child allowance is a monthly payment from the National Insurance Institute to every Israeli-resident family with children up to age 18. It is automatic — usually opened when the birth is registered, but it's worth verifying.

## How much (general)

- A monthly sum **per child**, up to age 18
- **A supplement for the second through fifth child** — usually a higher amount for these
- Amounts update periodically by government decisions

## When it's paid

- Paid **once a month**, usually on the 20th, directly to the parent's bank account
- For many children — a cumulative sum

## Savings for every child

Alongside the allowance, the state deposits a **Savings for Every Child** — an additional monthly sum accumulating until age 18 (then available to the child). The parent can:
- Choose **between a bank and an investment house** and a track
- Add a monthly sum of their own from the allowance (to double the savings)

If you don't choose — a default track opens.

## How to verify you receive it — step by step

1. **Check your personal area** on the NII site that the allowance is active
2. **Verify bank details** are current
3. **Choose a Savings for Every Child track** (bank / investment house)
4. **Report changes** (birth, moving)

## Help

- **National Insurance hotline: 1201**
- **Tebeka** — realizing rights

> Amounts update; check the NII site.

## See also

- [Support for single parents](/en/family)
- [Old-age pension](/en/rights)`,
      am: `## የልጆች ጡረታ ምንድን ነው

ከብሔራዊ ኢንሹራንስ እስከ 18 ዓመት ልጆች ላሏቸው ቤተሰቦች ወርሃዊ ክፍያ ነው። አውቶማቲክ ነው።

## ስንት

ለእያንዳንዱ ልጅ ወርሃዊ መጠን፣ ከ2ኛ-5ኛ ልጅ ተጨማሪ።

## መቼ

በወር አንድ ጊዜ፣ በ20ኛው ቀን ወደ ባንክ ሂሳብ።

## ለእያንዳንዱ ልጅ ቁጠባ

መንግስት እስከ 18 ዓመት ተጨማሪ ይቆጥባል። ባንክ ወይም የኢንቨስትመንት ቤት ይምረጡ።

## እንዴት ማረጋገጥ

1. በግል ቦታ ይፈትሹ
2. የባንክ ዝርዝሮች ያረጋግጡ
3. የቁጠባ መንገድ ይምረጡ

ሞቅ መስመር: 1201።`,
    },
  },
  {
    slug: "ethiopian-women-employment-data-programs",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-02",
    tags: ["employment", "community", "family"],
    title: {
      he: "תעסוקת נשים יוצאות אתיופיה — נתונים ותוכניות",
      en: "Ethiopian women's employment — data and programs",
      am: "የኢትዮጵያ ሴቶች ሥራ — መረጃ እና ፕሮግራሞች",
    },
    excerpt: {
      he: "נשים יוצאות אתיופיה הובילו את עליית התעסוקה בקהילה. הנתונים, האתגרים והתוכניות שמסייעות.",
      en: "Ethiopian-Israeli women led the rise in community employment. The data, the challenges, and the programs that help.",
      am: "የኢትዮጵያ ሴቶች በማህበረሰቡ የሥራ ዕድገት መሩ።",
    },
    bodies: {
      he: `## תמונת מצב

נשים יוצאות אתיופיה רשמו בעשור האחרון עלייה משמעותית בשיעורי התעסוקה — אחת ממגמות ההתקדמות הבולטות בקהילה. עם זאת, רבות עדיין מועסקות במשרות בשכר נמוך, ופערי השכר וההזדמנויות נותרים אתגר.

## הנתונים (מגמות)

- **שיעור תעסוקה עולה** בקרב נשים יוצאות אתיופיה, מתקרב לממוצע הארצי
- ריכוז יחסי גבוה ב**מקצועות סיעוד, שירותים וחינוך**
- ייצוג חסר בתפקידי ניהול, הייטק ומשרות בכירות
- עלייה במספר הסטודנטיות והאקדמאיות

## האתגרים

- שילוב בין עבודה לבית, במיוחד באמהות לילדים רבים
- מחסום שפה בקרב חלק מהנשים המבוגרות
- אפליה כפולה (מגדר + מוצא) בשוק העבודה
- חוסר נגישות למידע על זכויות ותוכניות

## תוכניות שמסייעות

- **ENP** — ליווי, הכשרה והכוון תעסוקתי לנשים
- **שוברי הכשרה מקצועית** — מימון קורסים
- **תוכניות יזמות נשים** והלוואות בערבות מדינה
- **מרכזי הכוון תעסוקתי** ברשויות
- **סבסוד מעונות** לנשים עובדות

## איך מתחילים — צעד אחר צעד

1. **פנו למרכז הכוון תעסוקתי** או ל-ENP
2. **בנו תוכנית** עם יועצת קריירה
3. **שלבו הכשרה** (שובר / קורס) לפי היעד
4. **בדקו סבסוד מעונות** להקלת השילוב
5. **חברו לרשת תמיכה** של נשים בקהילה

## עזרה

- **ENP** — ליווי תעסוקתי לנשים
- **שירות התעסוקה** — שוברי הכשרה
- ארגוני נשים יוצאות אתיופיה

## ראו גם

- [תמיכה בהורים חד-הוריים](/he/family)
- [נתוני אוכלוסייה 2025](/he/statistics)`,
      en: `## Snapshot

Over the past decade, Ethiopian-Israeli women have recorded a significant rise in employment rates — one of the community's most notable advances. Still, many remain in low-wage jobs, and gaps in pay and opportunity remain a challenge.

## The data (trends)

- **A rising employment rate** among Ethiopian-Israeli women, approaching the national average
- A relatively high concentration in **caregiving, services, and education**
- Under-representation in management, tech, and senior roles
- A rise in the number of female students and graduates

## The challenges

- Balancing work and home, especially for mothers of many children
- A language barrier among some older women
- Double discrimination (gender + origin) in the labor market
- Limited access to information about rights and programs

## Programs that help

- **ENP** — mentoring, training, and employment guidance for women
- **Vocational training vouchers** — course funding
- **Women's entrepreneurship programs** and state-guaranteed loans
- **Employment guidance centers** in local authorities
- **Daycare subsidies** for working women

## How to start — step by step

1. **Contact an employment guidance center** or ENP
2. **Build a plan** with a career advisor
3. **Add training** (voucher / course) by your goal
4. **Check daycare subsidies** to ease integration
5. **Connect to a support network** of community women

## Help

- **ENP** — employment support for women
- **Employment Service** — training vouchers
- Ethiopian-Israeli women's organizations

## See also

- [Support for single parents](/en/family)
- [Population data 2025](/en/statistics)`,
      am: `## ሁኔታ

በቅርብ አሥር ዓመት የኢትዮጵያ ሴቶች የሥራ መጠን ጨምሯል — የማህበረሰቡ ጉልህ እድገት። ሆኖም ብዙዎች በዝቅተኛ ደመወዝ ይሰራሉ።

## መረጃ

የሥራ መጠን ይጨምራል። በነርሲንግ፣ አገልግሎት፣ ትምህርት ይከማቻሉ። በአስተዳደር ውክልና ዝቅተኛ።

## ፈተናዎች

ሥራ እና ቤት ማጣጣም፣ የቋንቋ እንቅፋት፣ ድርብ መድልዎ።

## ፕሮግራሞች

ENP፣ የስልጠና ቫውቸሮች፣ የሴቶች ሥራ ፈጠራ፣ የመዋዕለ ሕፃናት ድጋፍ።

## እንዴት መጀመር

1. የሥራ ማዕከል ያነጋግሩ
2. እቅድ ይገንቡ
3. ስልጠና ይጨምሩ

ENP ይረዳል።`,
    },
  },
  {
    slug: "enp-national-project-who-they-are",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-02",
    tags: ["community", "education", "employment"],
    title: {
      he: "ENP — הפרויקט הלאומי — מי הם ומה הם עושים",
      en: "ENP — the National Project — who they are and what they do",
      am: "ENP — ብሔራዊ ፕሮጀክት — እነማን ናቸው እና ምን ያደርጋሉ",
    },
    excerpt: {
      he: "ENP הוא הארגון הגדול לקידום יוצאי אתיופיה. מה הם עושים, אילו תוכניות, ואיך נעזרים בהם.",
      en: "ENP is the largest organization advancing Ethiopian-Israelis. What they do, which programs, and how to use them.",
      am: "ENP የኢትዮጵያ ተወላጆችን የሚያሳድግ ትልቁ ድርጅት ነው።",
    },
    bodies: {
      he: `## מי הם ENP

ENP — "הפרויקט הלאומי לקהילת יוצאי אתיופיה בישראל" — הוא ארגון גג מרכזי הפועל לצמצום פערים וקידום הקהילה בתחומי החינוך, ההשכלה הגבוהה, התעסוקה והרווחה. הארגון פועל בשיתוף הממשלה, רשויות מקומיות, פדרציות יהודיות וגורמים פילנתרופיים.

## מה הם עושים

- **חינוך**: תוכניות העשרה, חיזוק לימודי וליווי תלמידים מהיסודי ועד התיכון
- **השכלה גבוהה**: ליווי סטודנטים, הכנה לאקדמיה, מלגות וקשר למוסדות
- **תעסוקה**: הכשרות (כולל Tech-Career), הכוון והשמה
- **צעירים**: תוכניות מעבר (SPACE) אחרי צבא/שירות
- **קהילה**: חיזוק מנהיגות מקומית ומעורבות הורים

## למי זה מתאים

- תלמידים, סטודנטים וצעירים יוצאי אתיופיה
- הורים המחפשים תמיכה חינוכית לילדים
- מבוגרים המחפשים הכשרה והכוון תעסוקתי

## איך נעזרים — צעד אחר צעד

1. **אתרו את הסניף האזורי** של ENP בעיר שלכם
2. **פנו לרכז/ת** המתאים לתחום (חינוך / תעסוקה / צעירים)
3. **קבלו אבחון** ובנו תוכנית אישית
4. **השתתפו** בתוכניות הליווי וההכשרה
5. **שלבו** עם מלגות וזכויות נוספות

## למה זה חשוב

ENP הוא נקודת כניסה מצוינת למיצוי הזדמנויות — מלגות, הכשרות וקריירה — עם הבנה עמוקה של צרכי הקהילה והקשר התרבותי.

## ראו גם

- [ENP Tech-Career](/he/careers/programs/enp-tech-career)
- [תוכנית ENP SPACE](/he/education)`,
      en: `## Who ENP are

ENP — "the National Project for the Ethiopian-Israeli Community" — is a central umbrella organization working to close gaps and advance the community in education, higher education, employment, and welfare. It operates in partnership with the government, local authorities, Jewish federations, and philanthropic bodies.

## What they do

- **Education**: enrichment programs, academic strengthening, and pupil mentoring from elementary through high school
- **Higher education**: student mentoring, academic prep, scholarships, and institutional ties
- **Employment**: training (including Tech-Career), guidance, and placement
- **Youth**: transition programs (SPACE) after army/service
- **Community**: strengthening local leadership and parental involvement

## Who fits

- Ethiopian-Israeli pupils, students, and young people
- Parents seeking educational support for their children
- Adults seeking training and employment guidance

## How to use them — step by step

1. **Find the regional ENP branch** in your city
2. **Contact the relevant coordinator** (education / employment / youth)
3. **Get an assessment** and build a personal plan
4. **Participate** in mentoring and training programs
5. **Combine** with scholarships and other rights

## Why it matters

ENP is an excellent entry point for realizing opportunities — scholarships, training, and careers — with a deep understanding of community needs and cultural context.

## See also

- [ENP Tech-Career](/en/careers/programs/enp-tech-career)
- [The ENP SPACE program](/en/education)`,
      am: `## ENP እነማን ናቸው

ENP — "የኢትዮጵያ ማህበረሰብ ብሔራዊ ፕሮጀክት" — ክፍተቶችን ለመዝጋት እና ማህበረሰቡን ለማሳደግ የሚሰራ ዋና ድርጅት ነው።

## ምን ያደርጋሉ

- ትምህርት: የማበልጸግ ፕሮግራሞች
- ከፍተኛ ትምህርት: የተማሪ መከታተል፣ ስኮላርሺፖች
- ሥራ: ስልጠናዎች (Tech-Career)፣ ቅጥር
- ወጣቶች: SPACE
- ማህበረሰብ: የአካባቢ አመራር

## ለማን ይስማማል

ተማሪዎች፣ ተማሪዎች፣ ወጣቶች፣ ወላጆች።

## እንዴት መጠቀም

1. የአካባቢ ቅርንጫፍ ያግኙ
2. አስተባባሪ ያነጋግሩ
3. የግል እቅድ ይገንቡ`,
    },
  },
  {
    slug: "cv-writing-guide-ethiopian-2026",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-02",
    tags: ["employment", "education"],
    title: {
      he: "מדריך כתיבת קורות חיים ליוצאי אתיופיה",
      en: "CV writing guide for Ethiopian-Israelis",
      am: "የሲቪ አጻጻፍ መመሪያ ለኢትዮጵያ-እስራኤላውያን",
    },
    excerpt: {
      he: "קורות חיים טובים פותחים דלת לראיון. מבנה מנצח, טעויות נפוצות, וטיפים להבלטת החוזקות שלכם.",
      en: "A good CV opens the door to an interview. A winning structure, common mistakes, and tips to highlight your strengths.",
      am: "ጥሩ ሲቪ ወደ ቃለ-መጠይቅ በር ይከፍታል።",
    },
    bodies: {
      he: `## למה קורות החיים חשובים

קורות החיים הם הרושם הראשוני שלכם אצל מעסיק — לעיתים יש למגייס פחות מ-30 שניות לסקור אותם. מסמך ברור, ממוקד ומותאם למשרה מגדיל משמעותית את הסיכוי להגיע לראיון.

## מבנה מנצח

1. **פרטים אישיים** — שם, טלפון, אימייל, עיר (ללא תעודת זהות או תמונה אם לא נדרש)
2. **תקציר מקצועי** — 2-3 שורות שמסכמות מי אתם ומה אתם מחפשים
3. **ניסיון תעסוקתי** — מהחדש לישן, עם תיאור הישגים (לא רק תפקידים)
4. **השכלה והכשרות** — תארים, קורסים, תעודות
5. **כישורים** — שפות, תוכנות, מיומנויות
6. **שירות צבאי/לאומי** — תפקיד ותרומה (יתרון בישראל)

## טעויות נפוצות שכדאי להימנע מהן

- מסמך ארוך מדי (שאפו לעמוד אחד, שניים לכל היותר)
- ניסוח כללי במקום הישגים מדידים ("ניהלתי צוות של 5", "הגדלתי מכירות ב-20%")
- שגיאות כתיב — בקשו מחבר/ה להגיה
- אותו קו"ח לכל משרה — התאימו לכל הגשה

## טיפים להבלטת החוזקות

- הדגישו **שירות צבאי**, התנדבות ומנהיגות קהילתית
- ציינו **שפות** (אמהרית/טיגרינית הן יתרון בתפקידים מסוימים)
- תרגמו ניסיון "לא פורמלי" לכישורים (אחריות, עבודת צוות, התמדה)
- השתמשו בפעלים אקטיביים: "הובלתי", "פיתחתי", "ייעלתי"

## איפה מקבלים עזרה

- **ENP** — סדנאות קורות חיים והכנה לראיונות
- **מרכזי הכוון תעסוקתי** ברשויות ובשירות התעסוקה
- מנטורים מקצועיים בקהילה

## ראו גם

- [תוכנית Tech-Career](/he/careers/tech)
- [ENP — הפרויקט הלאומי](/he/orgs/enp)`,
      en: `## Why a CV matters

Your CV is your first impression on an employer — a recruiter sometimes has less than 30 seconds to scan it. A clear, focused document tailored to the job significantly raises your chance of reaching an interview.

## A winning structure

1. **Personal details** — name, phone, email, city (no national ID or photo unless required)
2. **Professional summary** — 2-3 lines summarizing who you are and what you seek
3. **Work experience** — newest to oldest, describing achievements (not just roles)
4. **Education and training** — degrees, courses, certificates
5. **Skills** — languages, software, abilities
6. **Military/national service** — role and contribution (an advantage in Israel)

## Common mistakes to avoid

- Too long a document (aim for one page, two at most)
- Generic phrasing instead of measurable achievements ("managed a team of 5", "grew sales 20%")
- Spelling errors — ask a friend to proofread
- The same CV for every job — tailor each submission

## Tips to highlight strengths

- Emphasize **military service**, volunteering, and community leadership
- Note **languages** (Amharic/Tigrinya are an advantage in some roles)
- Translate "informal" experience into skills (responsibility, teamwork, persistence)
- Use active verbs: "led", "developed", "streamlined"

## Where to get help

- **ENP** — CV workshops and interview prep
- **Employment guidance centers** in authorities and the Employment Service
- Professional mentors in the community

## See also

- [Tech-Career program](/en/careers/tech)
- [ENP — the National Project](/en/orgs/enp)`,
      am: `## ሲቪ ለምን አስፈላጊ ነው

ሲቪ የመጀመሪያ ስሜትዎ ነው — መልማዩ ከ30 ሰከንድ ባነሰ ይመለከታል። ግልጽ ሰነድ ወደ ቃለ-መጠይቅ ዕድል ይጨምራል።

## የሚያሸንፍ መዋቅር

1. የግል ዝርዝሮች
2. ሙያዊ ማጠቃለያ
3. የሥራ ልምድ (ስኬቶች)
4. ትምህርት
5. ክህሎቶች
6. ወታደራዊ አገልግሎት

## የተለመዱ ስህተቶች

በጣም ረጅም፣ አጠቃላይ አገላለጽ፣ የፊደል ስህተቶች።

## ምክሮች

ወታደራዊ አገልግሎት ያጉሉ፣ ቋንቋዎች ይጥቀሱ፣ ንቁ ግሶች ይጠቀሙ።

ENP ወርክሾፖች ይሰጣል።`,
    },
  },
];
