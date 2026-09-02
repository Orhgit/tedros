// Voice & Action pillar — Wave 2 topic data (18 topics).
//
// HE is source-of-truth (CLAUDE.md). EN + AM mirrored.
// Content reviewed: 2026-06-02. Factual audit: TED-158, 2026-09-02.
// See docs/adr/021-sourced-claims.md.
//
// NOTE ON REACH: no route imports ALL_VOICE_TOPICS, so these 18 topics
// render nowhere today — only the four wave-1 pages are routed and in the
// sitemap. They were audited anyway: the entries carried a `lastReviewed`
// stamp, which is exactly the trap TED-152 left behind (content that looks
// reviewed because a field says so). See the TED-158 PR for the argument
// that this file should be deleted rather than kept as unrouted debt.
//
// VERIFIED AGAINST PRIMARY SOURCES
//   - הצוות למיגור הגזענות נגד יוצאי אתיופיה (המכונה "ועדת פלמור"):
//     החלטת ממשלה 1107 (4.2.2016) הקימה אותו; המלצותיו (למעלה מ-50)
//     אומצו בהחלטה 1958 (16.8.2016).
//   - החלטת ממשלה 3243 (15.7.2025) — התקציב הייעודי הנוכחי: 99.75 מ' ₪
//     (2025) ו-113.93 מ' ₪ (2026). מחליפה את החלטה 787 (17.7.2023).
//   - ס' 144ב לחוק העונשין (5 שנות מאסר); חוק איסור הפליה התשס"א-2000
//     ס' 5 (פיצוי ללא הוכחת נזק, 50,000 ₪ צמוד למדד, בסיס אוקטובר 2000).
//   - חוק המידע הפלילי ותקנת השבים, התשע"ט-2019 — נכנס לתוקף 15.7.2022
//     וביטל את חוק המרשם הפלילי 1981 (ס' 56). התיישנות ס' 18-20,
//     מחיקה ס' 21-23.
//   - הסיוע המשפטי: *6405 (מידע) / 073-3927788 (פתיחת תיק).
//   - טבקה: 072-2424622, "ללא תשלום", מאתר הארגון.
//   - מועצת העיתונות והתקשורת בישראל: presscouncil.co.il.
//   - יהודה ביאדגה (18.1.2019, בת ים) וסלומון טקה (30.6.2019, קריית חיים)
//     — שני אירועים נפרדים; פרטי ההליכים המשפטיים מדיווח עיתונאי.
//
// DELIBERATELY EXCLUDED — investigated, not published
//   - "1-700-704-555" as the Legal Aid line: returns zero hits anywhere,
//     in any language. Not a retired number — no evidence it is anyone's.
//   - "ידיד — מרכזי זכויות בקהילה": the NGO went into liquidation in 2019
//     and closed in 2020, and yedid.org.il is now an unrelated commercial
//     tutoring marketplace. We were sending people seeking rights help to
//     an ad site. Removed entirely.
//   - "תנועת אמונה" (amona.co.il): NXDOMAIN — never registered.
//   - "מועצת העיתונות" at m-z.co.il: that domain is a bookkeeping firm.
//   - IAEJ "מפרסם ניתוחי תקציב": iaej.co.il currently serves an "אתר
//     בבנייה" placeholder; no budget analysis could be found.
//   - Tebeka "הייעוץ הראשוני ניתן ללא עלות": their site does not say it.
//     Their free-of-charge statement is kept; the free-*initial-
//     consultation* framing is not.
//   - Tebeka "עבירות שנאה" as a practice area: they litigate racist
//     harassment and לשון הרע; their site never uses that phrase.
//   - Tebeka "מלווה יוזמות קהילתיות": they run their own programmes
//     (רקיע, נערי דין), not third-party initiatives.
//   - A precise count of the Palmor recommendations (51 / 60 / "over 50"
//     disagree) and any claim about the current composition of the
//     Second Authority council (in flux after the June 2026 resignations).
//   - The name of the current כאן ombudsman: could not be confirmed.

import type { VoiceTopic } from "./topics.server";

export const VOICE_TOPICS_WAVE2: VoiceTopic[] = [
  // ── 1. Ethiopian Knesset Members ────────────────────────────────────────────
  {
    slug: "ethiopian-knesset-members",
    title: {
      he: "חברי כנסת יוצאי אתיופיה — רשימה ופעולות",
      en: "Ethiopian-Israeli Knesset Members — Roster and Action",
      am: "ኢትዮጵያ-ተወላጅ የክነሰት አባላት — ዝርዝር እና ተግባር",
    },
    subtitle: {
      he: "מי הם חברי הכנסת מהקהילה האתיופית, מה הם מקדמים, וכיצד לפנות אליהם בדרישות.",
      en: "Who the Knesset members from the Ethiopian community are, what they promote, and how to petition them.",
      am: "ከኢትዮጵያ ማህበረሰብ የተውጣጡ የክነሰት አባላት እነማን ናቸው፣ ምን ያስተዋውቃሉ፣ እና እንዴት ጥያቄ ማቅረብ።",
    },
    body: {
      he: `ייצוג פוליטי בכנסת הוא אחד הכלים החזקים ביותר לשינוי מדיניות. מאז כניסתה של אדיסו מסלה לכנסת ב-1996 — חבר הכנסת הראשון יוצא אתיופיה — הקהילה ראתה גידול הדרגתי בייצוג.

## נציגים בולטים לאורך השנים
*(נכון לספטמבר 2026)*

- **אדיסו מסלה** — חבר הכנסת הראשון מהקהילה, הושבע ב-17.6.1996 בכנסת ה-14 וסיים ב-7.6.1999. כיהן מטעם העבודה ומ-25.3.1999 מטעם "עם אחד".
- **שלמה מולה** — כיהן עד פברואר 2013; קידם חקיקה נגד אפליה ובזכויות עולים.
- **פנינה תמנו-שטה** — חברת הכנסת הראשונה ילידת אתיופיה (2013). כיהנה כשרת העלייה והקליטה מ-17.5.2020 עד 29.12.2022, וכיו"ר הוועדה לקידום מעמד האישה מ-13.3.2024 עד 8.7.2025. **מכהנת כיום בכנסת ה-25 — ואינה שרה.**
- **גדי יברקן** — כיהן עד אוגוסט 2022, ובתוך כך כ**סגן** השר לביטחון הפנים (25.5.2020-13.6.2021). פעל בנושאי גזענות מוסדית וייצוג הולם.

## במה הם עוסקים?
חברי הכנסת מהקהילה מקדמים בדרך כלל:
1. **ייצוג הולם** בשירות הציבורי ובחברות ממשלתיות.
2. **מאבק באפליה** — קידום יישום המלצות ועדת פלמור (2016).
3. **השכלה גבוהה** — הרחבת מלגות ומכינות.
4. **דיור** — נגישות למשכנתאות והרחבת זכאות.

## כיצד לפנות אליהם
כל אזרח רשאי לפנות לחבר כנסת. הדרכים האפקטיביות:
- **מכתב מנומק** המתאר בעיה קונקרטית ובקשה ברורה.
- **פנייה דרך לשכת חבר הכנסת** באתר הכנסת (knesset.gov.il).
- **תיאום עם ארגון קהילתי** כמו טבקה או IAEJ, שיכול לחזק את הפנייה.
- **עצומה ציבורית** בנושא בעל תמיכה רחבה.

## חשיבות ההשתתפות
ייצוג נמוך בקלפי מתורגם לכוח פוליטי נמוך. הצבעה בבחירות — ארציות ומקומיות — היא הדרך הישירה ביותר להגדיל את מספר הנציגים מהקהילה ולחזק את קולה.`,
      en: `Political representation in the Knesset is one of the most powerful tools for policy change. Since Addisu Messele entered the Knesset in 1996 — the first member of Ethiopian origin — the community has seen gradual growth in representation.

## Notable representatives over the years
*(as of September 2026)*

- **Addisu Messele** — the first Knesset member from the community, sworn in on 17.6.1996 in the 14th Knesset and leaving on 7.6.1999. He sat for Labor and, from 25.3.1999, for Am Ehad.
- **Shlomo Molla** — served until February 2013; advanced anti-discrimination and immigrant-rights legislation.
- **Pnina Tamano-Shata** — the first Ethiopian-born woman MK (2013). Minister of Aliyah and Integration from 17.5.2020 to 29.12.2022, and chair of the Committee on the Status of Women from 13.3.2024 to 8.7.2025. **She is a serving MK in the 25th Knesset — and is not a minister.**
- **Gadi Yevarkan** — served until August 2022, including as **Deputy** Minister of Public Security (25.5.2020-13.6.2021). Worked on institutional racism and fair representation.

## What do they work on?
Knesset members from the community generally promote:
1. **Fair representation** in public service and government companies.
2. **Combating discrimination** — advancing implementation of the Palmor Committee recommendations (2016).
3. **Higher education** — expanding scholarships and pre-academic programs.
4. **Housing** — mortgage access and broadened eligibility.

## How to petition them
Any citizen may contact a Knesset member. Effective routes:
- A **reasoned letter** describing a concrete problem and a clear request.
- An **approach through the member's bureau** on the Knesset website (knesset.gov.il).
- **Coordination with a community organisation** such as Tebeka or IAEJ to strengthen the appeal.
- A **public petition** on an issue with broad support.

## Why participation matters
Low turnout at the ballot box translates into low political power. Voting — national and local — is the most direct way to increase the number of community representatives and amplify its voice.`,
      am: `በክነሰት ውስጥ ፖለቲካዊ ውክልና ለፖሊሲ ለውጥ ኃይለኛ መሣሪያዎች አንዱ ነው። አዲሱ መሰለ በ1996 ወደ ክነሰት ከገባ ጀምሮ — የመጀመሪያው ኢትዮጵያ-ተወላጅ አባል — ማህበረሰቡ ቀስ በቀስ የውክልና ዕድገት አይቷል።

## ታዋቂ ተወካዮች
አዲሱ መሰለ የመጀመሪያው የክነሰት አባል ነበር። ፍኒና ተማኖ-ሻታ የመጀመሪያዋ ኢትዮጵያ-ተወላጅ የስደትና ቅበላ ሚኒስትር ነበረች።

## ምን ይሰራሉ?
ዕኩል ውክልና፣ አድሎን መዋጋት፣ ከፍተኛ ትምህርት እና መኖሪያ ቤት ያስተዋውቃሉ።

## እንዴት ጥያቄ ማቅረብ
እያንዳንዱ ዜጋ የክነሰት አባልን ማናገር ይችላል። ምክንያታዊ ደብዳቤ ይጻፉ፣ በ knesset.gov.il በኩል ያነጋግሩ፣ ከቴቤካ ወይም IAEJ ጋር ይተባበሩ።

## ተሳትፎ ለምን አስፈላጊ ነው
ዝቅተኛ የምርጫ ተሳትፎ ዝቅተኛ ፖለቲካዊ ኃይል ይሆናል። ምርጫ የማህበረሰቡን ድምጽ ለማጉላት ቀጥተኛ መንገድ ነው።`,
    },
    resources: [
      {
        name: "כנסת ישראל — איתור חברי כנסת ולשכות",
        url: "https://www.knesset.gov.il/mk/heb/mkindex_current.asp",
        description: {
          he: "מאגר רשמי לאיתור חברי הכנסת המכהנים ופרטי הלשכות שלהם לפנייה ישירה.",
          en: "Official directory for finding sitting Knesset members and their bureau contact details for direct appeals.",
          am: "በስራ ላይ ያሉ የክነሰት አባላትን እና የቢሮ መረጃዎቻቸውን ለማግኘት ኦፊሴላዊ ማውጫ።",
        },
      },
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "מלווה פניות ציבוריות ודרישות מדיניות מול נבחרי ציבור בשם הקהילה.",
          en: "Accompanies public appeals and policy demands to elected officials on behalf of the community.",
          am: "ለማህበረሰቡ ሕዝባዊ ጥያቄዎችን እና የፖሊሲ ጥያቄዎችን ወደ ተመራጮች ያስተናግዳል።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 2. Protest Timeline 1996–2026 ───────────────────────────────────────────
  {
    slug: "ethiopian-protest-timeline",
    title: {
      he: "מחאות יוצאי אתיופיה — ציר זמן 1996–2026",
      en: "Ethiopian-Israeli Protests — Timeline 1996–2026",
      am: "የኢትዮጵያ-እስራኤላዊ ተቃውሞዎች — የጊዜ ሰሌዳ 1996–2026",
    },
    subtitle: {
      he: 'מ"פרשת מנות הדם" ועד מחאות 2019 — שלושים שנות מאבק לשוויון וכבוד.',
      en: 'From the "blood donation affair" to the 2019 protests — three decades of struggle for equality and dignity.',
      am: 'ከ"የደም ልገሳ ጉዳይ" እስከ 2019 ተቃውሞዎች — ሰላሳ ዓመታት የእኩልነት እና ክብር ትግል።',
    },
    body: {
      he: `המחאה הציבורית הייתה כלי מרכזי במאבק הקהילה האתיופית לשוויון בישראל. ציר הזמן הבא מסכם תחנות מרכזיות.

## 1996 — פרשת מנות הדם
ב-24.1.1996 נחשף שבנק הדם השליך תרומות דם של יוצאי אתיופיה מחשש מופרך ל-HIV. ב-28.1.1996 הפגינו כ-8,000-10,000 איש מול משרד ראש הממשלה בירושלים; 41 שוטרים ולמעלה מ-20 מפגינים נפצעו. ועדת נבון בחנה את הפרשה ודיווחה ביולי 1996. זו הייתה המחאה הגדולה הראשונה — ונקודת מפנה בתודעה הציבורית.

## 2012 — מחאת הדיור בקריית-מלאכי
בינואר 2012 נחשף בערוץ 2 שדיירים בשכונת בר-יהודה בקריית-מלאכי סירבו למכור ולהשכיר דירות למשפחות יוצאות אתיופיה. ב-10.1.2012 הפגינו כ-2,000 איש בקריית-מלאכי, וב-18.1.2012 כ-5,000 בירושלים.

## 2015 — מחאת דמאס פיקדה
ב-27.4.2015 בחולון תועד בווידאו שוטר מכה את החייל דמאס פיקדה. התיעוד הצית גל מחאות ארצי, ובהן ההפגנה הגדולה בכיכר רבין בתל-אביב במאי 2015. השוטר הושעה ומח"ש לא הגישה נגדו כתב אישום; תיקו של פיקדה עצמו נסגר בעילת "חוסר אשמה" באפריל 2019.

## 2016 — דוח הצוות למיגור הגזענות ("ועדת פלמור")
הצוות, בראשות עו"ד אמי פלמור, הוקם בהחלטת ממשלה 1107 (4.2.2016) בעקבות גל המחאות. דוחו מיולי 2016 כלל למעלה מ-50 המלצות, והממשלה אימצה אותן בהחלטה 1958 (16.8.2016) — ההכרה הרשמית הראשונה בקיומה של אפליה שיטתית. בעקבותיו הוקמה היחידה הממשלתית לתיאום המאבק בגזענות.

## ינואר 2019 — יהודה ביאדגה
ב-18.1.2019 בבת ים נורה למוות יהודה ביאדגה, בן 24, בידי שוטר **במדים ובתפקיד**. ביאדגה יצא מביתו במצוקה נפשית חריפה כשהוא אוחז סכין; בני משפחתו הם שהזעיקו את המשטרה וביקשו לנהוג בזהירות בשל מצבו. ב-30.1.2019 הפגינו כ-20,000 איש בתל-אביב. מח"ש סגרה את התיק כעבור כארבעה חודשים; המשפחה עתרה לבג"ץ והעתירה נדחתה. לא הוגש כתב אישום.

## יוני 2019 — סלומון טקה
ב-30.6.2019 בקריית-חיים נהרג סלומון טקה, בן 18. שוטר **שלא היה בתפקיד**, בבגדים אזרחיים, התערב בתגרה, הותקף באבנים וירה יריה אחת לעבר הקרקע; הכדור הקפיץ מהאספלט ופגע בטקה. אחרי הלווייתו ב-2.7.2019 פרצו המחאות הגדולות ביותר בתולדות הקהילה, ובהן חסימת צמתים ראשיים ברחבי הארץ. השוטר הועמד לדין בפברואר 2020 בעבירת גרימת מוות ברשלנות, **זוכה באפריל 2024** בטענת הגנה עצמית, וערעור המדינה נדחה בספטמבר 2024. במקביל שילמה המשטרה למשפחה 1.8 מיליון ₪ בפשרה אזרחית (מרץ 2022).

*פרטי ההליכים המשפטיים בשני המקרים מבוססים על דיווח עיתונאי, לא על נוסח פסקי הדין.*

## מורשת המחאה
המחאות הביאו להכרה ממשלתית, להקמת יחידות ניטור, ולהעלאת המודעות הציבורית. הן הוכיחו שקול קולקטיבי מארגן יוצר שינוי מדיניות ממשי.`,
      en: `Public protest has been a central tool in the Ethiopian community's struggle for equality in Israel. The following timeline summarises key milestones.

## 1996 — The blood donation affair
On 24.1.1996 it emerged that the blood bank discarded donations from Ethiopian Israelis over an unfounded fear of HIV. On 28.1.1996 some 8,000-10,000 people protested outside the Prime Minister's Office in Jerusalem; 41 police officers and more than 20 demonstrators were injured. The Navon Commission examined the affair and reported in July 1996. This was the first large protest — and a turning point in public awareness.

## 2012 — The Kiryat Malachi housing protest
In January 2012 a Channel 2 report revealed that residents of the Bar-Yehuda neighbourhood in Kiryat Malachi were refusing to sell or rent apartments to Ethiopian-Israeli families. Some 2,000 protested in Kiryat Malachi on 10.1.2012 and about 5,000 in Jerusalem on 18.1.2012.

## 2015 — The Damas Pakada protest
On 27.4.2015 in Holon, video captured a police officer beating soldier Damas Pakada. The footage sparked a nationwide protest wave, including the large Rabin Square demonstration in Tel Aviv in May 2015. The officer was suspended and MAHASH filed no charges; Pakada's own file was closed for "lack of guilt" in April 2019.

## 2016 — Report of the team to eradicate racism ("the Palmor Committee")
The team, chaired by Emi Palmor, was established by Government Decision 1107 (4.2.2016) following the protest wave. Its July 2016 report made more than 50 recommendations, adopted by Government Decision 1958 (16.8.2016) — the first formal recognition that systematic discrimination exists. It led to the creation of the Government Unit for Coordinating the Fight Against Racism.

## January 2019 — Yehuda Biadga
On 18.1.2019 in Bat Yam, Yehuda Biadga, 24, was shot dead by a uniformed, **on-duty** officer. Biadga had left home in acute mental distress holding a knife; it was his own family who called the police and asked them to take care given his condition. Some 20,000 protested in Tel Aviv on 30.1.2019. MAHASH closed the case after about four months; the family petitioned the Supreme Court and the petition was rejected. No indictment was filed.

## June 2019 — Solomon Teka
On 30.6.2019 in Kiryat Haim, Solomon Teka, 18, was killed. An **off-duty** officer in civilian clothes intervened in a scuffle, was pelted with stones and fired one shot at the ground; the bullet ricocheted off the asphalt and struck Teka. After his funeral on 2.7.2019 the largest protests in the community's history broke out, blocking major junctions nationwide. The officer was indicted in February 2020 for negligent homicide, **acquitted in April 2024** on self-defence grounds, and the State's appeal was rejected in September 2024. Separately, the police paid the family ₪1.8m in a civil settlement (March 2022).

*The legal outcomes in both cases are drawn from press reporting, not from the judgment texts.*

## The legacy of protest
The protests brought governmental recognition, the creation of monitoring units, and raised public awareness. They proved that an organised collective voice produces real policy change.`,
      am: `ሕዝባዊ ተቃውሞ የኢትዮጵያ ማህበረሰብ ለእኩልነት ትግል ማዕከላዊ መሣሪያ ነበር። ይህ የጊዜ ሰሌዳ ቁልፍ ምዕራፎችን ያጠቃልላል።

## 1996 — የደም ልገሳ ጉዳይ
በ24.1.1996 የደም ባንክ ከኢትዮጵያ ዜጎች የተገኙ ልገሳዎችን በHIV ፍርሃት ይጥል እንደነበር ተገለጸ። በ28.1.1996 ከ8,000-10,000 ሰዎች በኢየሩሳሌም ተቃውመዋል።

## 2012 — የቂርያት ማላኪ የመኖሪያ ቤት ተቃውሞ
በጥር 2012 በቂርያት ማላኪ ነዋሪዎች ለኢትዮጵያ-እስራኤላዊ ቤተሰቦች ቤት ለመሸጥ አለመፍቀዳቸው ተጋለጠ። በ10.1.2012 ወደ 2,000፣ በ18.1.2012 በኢየሩሳሌም ወደ 5,000 ተቃውመዋል።

## 2015 — የደማስ ፓካዳ ተቃውሞ
በ27.4.2015 በሖሎን ወታደር ደማስ ፓካዳ በፖሊስ ሲደበደብ የሚያሳይ ቪዲዮ በመላ ሀገሪቱ ተቃውሞ ቀሰቀሰ።

## 2016 — ዘረኝነትን ለማጥፋት የተቋቋመው ቡድን ሪፖርት ("የፓልሞር ኮሚቴ")
በመንግሥት ውሳኔ 1107 (4.2.2016) ተቋቋመ፤ ከ50 በላይ ምክረ ሐሳቦቹ በውሳኔ 1958 (16.8.2016) ጸድቀዋል።

## ጥር 2019 — የሁዳ ቢያድጋ
በ18.1.2019 በባት ያም የ24 ዓመቱ የሁዳ ቢያድጋ **በሥራ ላይ በነበረ** ፖሊስ ተገደለ። በከባድ የአእምሮ ጭንቀት ውስጥ ሆኖ ቢላዋ ይዞ ከቤቱ ወጥቶ ነበር፤ ፖሊስን የጠሩት ቤተሰቦቹ ናቸው። በ30.1.2019 ወደ 20,000 ሰዎች በተል አቪቭ ተቃውመዋል። ክስ አልቀረበም።

## ሰኔ 2019 — ሰሎሞን ተካ
በ30.6.2019 በቂርያት ሐይም የ18 ዓመቱ ሰሎሞን ተካ ተገደለ። **በሥራ ላይ ያልነበረ** ፖሊስ ወደ መሬት አንድ ጥይት ተኮሰ፤ ጥይቱ ከአስፋልቱ ተመልሶ መታው። ከቀብሩ በኋላ በማህበረሰቡ ታሪክ ትልቁ ተቃውሞ ተነሳ። ፖሊሱ በ2020 ተከሶ በሚያዝያ 2024 ተለቋል።

*በሁለቱም ጉዳዮች ያሉት የሕግ ውጤቶች ከጋዜጣ ዘገባ የተወሰዱ ናቸው።*

## የተቃውሞ ውርስ
ተቃውሞዎቹ የመንግሥት ዕውቅና፣ የክትትል ክፍሎች መቋቋም እና የሕዝብ ግንዛቤ አምጥተዋል።`,
    },
    resources: [
      {
        name: "ועדת פלמור — דוח למיגור גזענות (משרד המשפטים)",
        url: "https://www.gov.il/he/departments/ministry_of_justice",
        description: {
          he: "הדוח הממשלתי הרשמי שהכיר באפליה שיטתית והגדיר תוכנית פעולה לאומית.",
          en: "The official government report that recognised systematic discrimination and defined a national action plan.",
          am: "ሥርዓታዊ አድሎን የተቀበለ እና ብሔራዊ የድርጊት መርሐ ግብር የገለጸ ኦፊሴላዊ የመንግሥት ሪፖርት።",
        },
      },
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "ליווי משפטי וייצוג של מפגינים ושל נפגעי אלימות משטרתית במהלך מחאות.",
          en: "Legal accompaniment and representation of protesters and victims of police violence during demonstrations.",
          am: "በተቃውሞዎች ጊዜ የተቃዋሚዎችን እና የፖሊስ ጥቃት ሰለባዎችን ሕጋዊ ድጋፍ እና ውክልና።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 3. IAEJ ─────────────────────────────────────────────────────────────────
  {
    slug: "iaej-association",
    title: {
      he: "אגודת יהודי אתיופיה (IAEJ) — מה הם עושים",
      en: "Israeli Association for Ethiopian Jews (IAEJ) — What They Do",
      am: "የኢትዮጵያ አይሁዶች የእስራኤል ማህበር (IAEJ) — ምን ይሰራሉ",
    },
    subtitle: {
      he: "ארגון הסנגור הוותיק לקהילה — מאבק לזכויות, מחקר מדיניות, וקידום הזדמנויות.",
      en: "The veteran advocacy organisation for the community — rights advocacy, policy research, and opportunity promotion.",
      am: "ለማህበረሰቡ ጥንታዊው የተሟጋቾ ድርጅት — የመብት ተሟጋችነት፣ የፖሊሲ ምርምር እና ዕድል ማስፋፋት።",
    },
    body: {
      he: `אגודת יהודי אתיופיה (The Israeli Association for Ethiopian Jews — IAEJ) היא אחד מארגוני הסנגור הוותיקים והמובילים של הקהילה. הוקמה במטרה להבטיח שילוב מלא ושוויוני של יוצאי אתיופיה בחברה הישראלית.

## תחומי הפעילות המרכזיים
1. **סנגור מדיניות** — קידום חקיקה ותקנות שמצמצמות פערים בחינוך, דיור, ותעסוקה.
2. **מחקר ונתונים** — איסוף ופרסום נתונים על מצב הקהילה, המשמשים בסיס לדרישות מבוססות-ראיות.
3. **ליווי פרטני** — סיוע למשפחות מול רשויות בתחומי קליטה, חינוך וזכויות.
4. **העצמת נוער ומנהיגות** — תוכניות לפיתוח דור מנהיגים חדש.

## איך הם פועלים?
האגודה פועלת מול הכנסת, משרדי הממשלה, והרשויות המקומיות. היא מגישה ניירות עמדה, יוזמת דיונים בוועדות הכנסת, ומשתפת פעולה עם ארגוני זכויות אדם נוספים כמו האגודה לזכויות האזרח (ACRI).

## כיצד אפשר להיעזר בהם?
- **פנייה לייעוץ** בנושאי זכויות וקליטה.
- **השתתפות בתוכניות מנהיגות** לצעירים.
- **הצטרפות כמתנדבים** או תרומה לפעילות.
- **שיתוף נתונים** על אפליה או פערים — שמסייעים למאמצי הסנגור.

## חשיבות הארגון
ארגוני סנגור ממסדיים נותנים לקהילה כוח מתמשך מעבר למחאה נקודתית. הם מתרגמים כעס ומצוקה לדרישות מדיניות מנוסחות, מבוססות-נתונים, שקשה לממשלה להתעלם מהן.

*הערה: למידע מעודכן על תוכניות ופרטי קשר, מומלץ לפנות ישירות לארגון.*`,
      en: `The Israeli Association for Ethiopian Jews (IAEJ) is one of the community's veteran and leading advocacy organisations. It was founded to ensure the full and equal integration of Ethiopian Israelis into Israeli society.

## Core areas of activity
1. **Policy advocacy** — promoting legislation and regulations that close gaps in education, housing, and employment.
2. **Research and data** — collecting and publishing data on the community's situation, used as a basis for evidence-based demands.
3. **Individual accompaniment** — assisting families before authorities in absorption, education, and rights matters.
4. **Youth and leadership empowerment** — programs to develop a new generation of leaders.

## How do they operate?
The Association works with the Knesset, government ministries, and local authorities. It submits position papers, initiates discussions in Knesset committees, and cooperates with other human rights organisations such as ACRI.

## How can you use their help?
- **Seek advice** on rights and absorption matters.
- **Participate in leadership programs** for young people.
- **Join as a volunteer** or donate to the work.
- **Share data** about discrimination or gaps — which supports advocacy efforts.

## Why the organisation matters
Institutional advocacy organisations give the community lasting power beyond a one-off protest. They translate anger and distress into formulated, data-based policy demands that are hard for the government to ignore.

*Note: for up-to-date information on programs and contact details, it is recommended to approach the organisation directly.*`,
      am: `የኢትዮጵያ አይሁዶች የእስራኤል ማህበር (IAEJ) ከማህበረሰቡ ጥንታዊ እና ቀዳሚ የተሟጋቾ ድርጅቶች አንዱ ነው። ዋና የስራ መስኮች የፖሊሲ ተሟጋችነት፣ ምርምር እና መረጃ፣ የግል ድጋፍ እና የወጣቶች መሪነት ማብቃት። ድርጅቱ ከ ACRI ጋር ይተባበራል።`,
    },
    resources: [
      {
        name: "אגודת יהודי אתיופיה (IAEJ)",
        url: "https://www.iaej.co.il",
        description: {
          he: "ארגון סנגור ומחקר הפועל לשילוב שוויוני של הקהילה בחינוך, דיור ותעסוקה.",
          en: "An advocacy and research organisation working for the community's equal integration in education, housing, and employment.",
          am: "ለማህበረሰቡ ዕኩል ውህደት በትምህርት፣ መኖሪያ ቤት እና ሥራ የሚሰራ የተሟጋችነት እና ምርምር ድርጅት።",
        },
      },
      {
        name: "האגודה לזכויות האזרח (ACRI)",
        url: "https://www.acri.org.il",
        description: {
          he: "שותפה לקואליציות זכויות אדם בנושאי אפליה שיטתית לצד IAEJ.",
          en: "A partner in human rights coalitions on systemic discrimination alongside IAEJ.",
          am: "ከ IAEJ ጎን ለጎን በሥርዓታዊ አድሎ ጉዳዮች የሰብዓዊ መብቶች ጥምረት አጋር።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 4. ENP National Project ─────────────────────────────────────────────────
  {
    slug: "enp-national-project",
    title: {
      he: "פרויקט ENP — הפרויקט הלאומי לקהילה האתיופית",
      en: "ENP — The National Project for the Ethiopian Community",
      am: "ENP — ለኢትዮጵያ ማህበረሰብ ብሔራዊ ፕሮጀክት",
    },
    subtitle: {
      he: "תוכניות חינוך, מנהיגות ומלגות שמלוות עשרות אלפי בני נוער וצעירים בקהילה.",
      en: "Education, leadership, and scholarship programs supporting tens of thousands of community youth and young adults.",
      am: "በአስር ሺዎች የሚቆጠሩ ወጣቶችን የሚደግፉ የትምህርት፣ መሪነት እና ስኮላርሺፕ ፕሮግራሞች።",
    },
    body: {
      he: `הפרויקט הלאומי לקהילה האתיופית (ENP — Ethiopian National Project) הוא שותפות בין ממשלת ישראל, רשויות מקומיות, וארגונים יהודיים בעולם. מטרתו: לצמצם פערים ולקדם מצוינות בקרב ילדים, נוער וצעירים.

## תוכניות הדגל
1. **SPACE** — תוכנית העשרה לימודית אחר הצהריים לתלמידי בית-ספר. כוללת שיעורי תגבור, ליווי אישי, ופעילות חברתית.
2. **תוכניות מנהיגות נוער** — פיתוח כישורי הנהגה, מעורבות חברתית, וזהות קהילתית.
3. **ליווי הורים** — סדנאות והכוונה למשפחות.
4. **מלגות והכוונה אקדמית** — סיוע במעבר להשכלה גבוהה.

## כיצד נרשמים?
- **פנייה לבית-הספר** של הילד — רכז SPACE מקומי.
- **פנייה לרשות המקומית** — מחלקת הרווחה או החינוך.
- **אתר ENP** למידע על תוכניות פעילות.

*הערה: זכאות ותנאי הרשמה משתנים בין רשויות.*`,
      en: `The Ethiopian National Project (ENP) is a partnership between the Israeli government, local authorities, and Jewish organisations worldwide. Its goal: to close gaps and promote excellence among children, youth, and young adults.

## Flagship programs
1. **SPACE** — an after-school academic enrichment program. Includes tutoring, personal mentoring, and social activity.
2. **Youth leadership programs** — leadership skills, social engagement, and community identity.
3. **Parent guidance** — workshops for families to strengthen involvement in children's education.
4. **Scholarships and academic guidance** — assistance transitioning to higher education.

## How to register
- **Approach the child's school** — the local SPACE coordinator.
- **Contact the local authority** — welfare or education department.
- **The ENP website** for active programs and contact details.

*Note: eligibility and registration conditions vary between localities.*`,
      am: `ENP በእስራኤል መንግሥት፣ አካባቢ ባለ ሥልጣናት እና ዓለም አቀፍ ድርጅቶች መካከል ሽርክና ነው። SPACE ፕሮግራምን፣ የወጣቶች መሪነትን፣ የወላጆች ድጋፍ እና ስኮላርሺፕ ያካትታሉ። ለመመዝገብ የልጁን ትምህርት ቤት ወይም አካባቢ ባለ ሥልጣናትን ያነጋግሩ።`,
    },
    resources: [
      {
        name: "ENP — הפרויקט הלאומי לקהילה האתיופית",
        url: "https://www.enp.org.il",
        description: {
          he: "תוכניות חינוך, מנהיגות ומלגות לבני נוער וצעירים מהקהילה, ובהן תוכנית SPACE.",
          en: "Education, leadership, and scholarship programs for community youth, including the SPACE program.",
          am: "ለማህበረሰብ ወጣቶች የትምህርት፣ መሪነት እና ስኮላርሺፕ ፕሮግራሞች፣ SPACE ፕሮግራምን ጨምሮ።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 5. NACOEJ ───────────────────────────────────────────────────────────────
  {
    slug: "nacoej-organization",
    title: {
      he: "NACOEJ — הארגון הצפון-אמריקאי למען יהודי אתיופיה",
      en: "NACOEJ — North American Conference on Ethiopian Jewry",
      am: "NACOEJ — የሰሜን አሜሪካ ጉባኤ ለኢትዮጵያ አይሁዶች",
    },
    subtitle: {
      he: "ארגון בינלאומי שסייע בעלייה ובקליטה — ופועל עד היום בחינוך ובתמיכה.",
      en: "An international organisation that aided immigration and absorption — and still works today in education and support.",
      am: "ለስደት እና ቅበላ የረዳ እና ዛሬም በትምህርት እና ድጋፍ የሚሰራ ዓለም አቀፍ ድርጅት።",
    },
    body: {
      he: `NACOEJ (North American Conference on Ethiopian Jewry) הוא ארגון יהודי בינלאומי שמילא תפקיד היסטורי בהצלת יהודי אתיופיה ובהבאתם לישראל. הארגון הוקם בארצות-הברית ופועל מאז שנות ה-80.

## תפקיד היסטורי
NACOEJ סייע בתקופות הקריטיות של מבצע משה (1984) ומבצע שלמה (1991), כולל מימון, סנגור בינלאומי, ותמיכה ביהודים שנותרו באזורי גונדר ואדיס-אבבה בהמתנה לעלייה.

## מצב הארגון כיום — חשוב לדעת
**NACOEJ מצוי בתהליך סגירה.** באתר הארגון עצמו נכתב שהוא "winding down its operations" לקראת העברת פעילותו לסוכנות היהודית. הדוחות הכספיים האחרונים שפורסמו הם משנת 2023, וחלק מתיאורי התוכניות עדיין מתייחסים לתקופת הקורונה.

**המשמעות המעשית:** אין להסתמך על NACOEJ כמקור למלגה או לסיוע כיום. מי שמחפש מלגה או ליווי בקליטה — פנו לסוכנות היהודית, למשרד העלייה והקליטה, או לארגוני הקהילה הפעילים.

## תפקידו ההיסטורי נותר חשוב
גם כשארגון נסגר, התיעוד שיצר נשאר. NACOEJ אסף חומרים על הקהילה בגונדר ובאדיס-אבבה ועל תקופת ההמתנה לעלייה — מקור לחוקרים ולמשפחות המחפשות את סיפורן.`,
      en: `NACOEJ (North American Conference on Ethiopian Jewry) is an international Jewish organisation that played a historic role in rescuing Ethiopian Jews and bringing them to Israel. It has operated since the 1980s.

## Historic role
NACOEJ assisted during Operation Moses (1984) and Operation Solomon (1991), including funding, international advocacy, and support for Jews awaiting immigration.

## Where the organisation stands today — important
**NACOEJ is winding down.** Its own site states that it "is now winding down its operations in preparation for the takeover of the Jewish Agency for Israel". The most recent published financials are from 2023, and some programme descriptions still refer to the COVID period.

**What that means in practice:** do not rely on NACOEJ as a source of a scholarship or of assistance today. For a scholarship or absorption support, approach the Jewish Agency, the Ministry of Aliyah and Integration, or the community organisations that are currently active.

## Its historical role still matters
When an organisation closes, the record it created remains. NACOEJ gathered material on the communities in Gondar and Addis Ababa and on the years of waiting to emigrate — a source for researchers and for families looking for their own story.`,
      am: `NACOEJ ኢትዮጵያ አይሁዶችን ለማዳን ታሪካዊ ሚና የተጫወተ ዓለም አቀፍ ድርጅት ነው። **ነገር ግን ድርጅቱ አሁን በመዘጋት ሂደት ላይ ነው** — በራሱ ድረ-ገጽ እንደተገለጸው ሥራውን ወደ አይሁድ ኤጀንሲ በማስተላለፍ ላይ ነው። ስለዚህ ለስኮላርሺፕ ወይም ለድጋፍ በእሱ ላይ አይተማመኑ፤ ወደ አይሁድ ኤጀንሲ ወይም ወደ የስደት ሚኒስቴር ይሂዱ።`,
    },
    resources: [
      {
        name: "NACOEJ — North American Conference on Ethiopian Jewry",
        url: "https://www.nacoej.org",
        description: {
          he: "ארגון בינלאומי לתמיכה בחינוך, קליטה ושימור מורשת של יהודי אתיופיה.",
          en: "An international organisation supporting education, absorption, and heritage preservation for Ethiopian Jews.",
          am: "ለኢትዮጵያ አይሁዶች ትምህርት፣ ቅበላ እና ቅርስ ጥበቃ የሚደግፍ ዓለም አቀፍ ድርጅት።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 6. Police Violence Trials ───────────────────────────────────────────────
  {
    slug: "police-violence-trials",
    title: {
      he: "אלימות משטרתית — משפטים ותוצאות",
      en: "Police Violence — Trials and Outcomes",
      am: "የፖሊስ ጥቃት — ፍርዶች እና ውጤቶች",
    },
    subtitle: {
      he: "מה קורה לאחר אירוע אלימות משטרתית — ההליך המשפטי, התלונה, והדרך לאחריותיות.",
      en: "What happens after a police violence incident — the legal process, the complaint, and the path to accountability.",
      am: "ከፖሊስ ጥቃት ክስተት በኋላ ምን ይከሰታል — የሕግ ሂደት፣ ቅሬታ እና ወደ ተጠያቂነት የሚወስደው መንገድ።",
    },
    body: {
      he: `אירועי אלימות משטרתית כלפי יוצאי אתיופיה עוררו דיון ציבורי נרחב — אך הדרך מתלונה לאחריותיות משפטית מורכבת.

> **הבהרה משפטית:** מידע זה כללי ואינו תחליף לייעוץ משפטי פרטני.

## שלב 1 — תיעוד ותלונה
לאחר אירוע אלימות חשוב לתעד: צילומים, שמות עדים, פרטי השוטרים, ותיעוד רפואי. את התלונה מגישים ל**מחלקת חקירות שוטרים (מח"ש)** במשרד המשפטים.

## ההליך המשפטי
1. **חקירת מח"ש** — בדיקת התלונה, גביית עדויות ואיסוף ראיות.
2. **החלטה על העמדה לדין** — מח"ש מחליטה אם להגיש כתב אישום, להעביר לטיפול משמעתי, או לסגור.
3. **ערר** — אם התיק נסגר, ניתן להגיש ערר.
4. **משפט** — אם הוגש כתב אישום, מתנהל הליך פלילי.

## הדרך לאחריותיות
- **תביעה אזרחית** — בנוסף להליך הפלילי, ניתן לתבוע פיצויים.
- **ליווי ארגוני** — טבקה וה-ACRI מלווים תיקים תקדימיים.
- **תיעוד ציבורי** — שקיפות ופרסום מחזקים לחץ לאחריותיות.`,
      en: `Incidents of police violence against Ethiopian Israelis have sparked broad public debate — but the path from complaint to legal accountability is complex.

> **Legal disclaimer:** This information is general and not a substitute for individual legal advice.

## The first stage — documentation and complaint
Document: photos, witness names, officers' details, and medical documentation. The complaint is filed with the **Police Investigations Department (MAHASH)** at the Ministry of Justice.

## The legal process
MAHASH investigation → decision on prosecution → appeal → trial.

## The path to accountability
Civil suit, organisational accompaniment (Tebeka, ACRI), and public documentation all strengthen pressure for systemic accountability.`,
      am: `ከፖሊስ ጥቃት ክስተት በኋላ ፎቶዎችን፣ የምስክሮች ስሞችን እና የሕክምና ሰነድ ይዘግቡ። ቅሬታውን ለ מח"ש ያቅርቡ። ቴቤካ እና ACRI ሕጋዊ ድጋፍ ይሰጣሉ።`,
    },
    resources: [
      {
        name: 'מח"ש — מחלקת חקירות פנימיות של המשטרה',
        url: "https://www.gov.il/he/departments/units/mahash",
        description: {
          he: "הגוף הרשמי לחקירת תלונות נגד שוטרים ולהחלטה על העמדה לדין.",
          en: "The official body for investigating complaints against officers and deciding on prosecution.",
          am: "ለፖሊስ ቅሬታዎች ምርመራ እና ለክስ ውሳኔ ኦፊሴላዊ አካል።",
        },
      },
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "ייצוג וליווי משפטי בתיקי אלימות משטרתית, כולל תביעות אזרחיות ועררים.",
          en: "Legal representation and accompaniment in police violence cases, including civil suits and appeals.",
          am: "በፖሊስ ጥቃት ጉዳዮች ሕጋዊ ውክልና እና ድጋፍ።",
        },
      },
      {
        name: "האגודה לזכויות האזרח (ACRI)",
        url: "https://www.acri.org.il",
        description: {
          he: "ליווי תיקים תקדימיים וקידום רפורמות במנגנוני הביקורת על המשטרה.",
          en: "Accompanying precedent-setting cases and advancing reforms in police oversight mechanisms.",
          am: "ቅድመ ምሳሌ የሆኑ ጉዳዮችን መደገፍ እና በፖሊስ ቁጥጥር ዘዴዎች ማሻሻያዎችን ማራመድ።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 7. Punishing Racism — Law and Reality ───────────────────────────────────
  {
    slug: "racism-law-and-reality",
    title: {
      he: "ענישה על גזענות — חוק ומציאות",
      en: "Punishing Racism — Law and Reality",
      am: "ዘረኝነትን መቅጣት — ሕግ እና እውነታ",
    },
    subtitle: {
      he: "מה החוק הישראלי קובע על גזענות והסתה — ומה הפער בין הספר לבין האכיפה.",
      en: "What Israeli law says about racism and incitement — and the gap between the books and enforcement.",
      am: "የእስራኤል ሕግ ስለ ዘረኝነት እና ቅስቀሳ ምን ይላል — እና በሕግ እና በአፈጻጸም መካከል ያለው ክፍተት።",
    },
    body: {
      he: `החוק הישראלי אוסר גזענות והסתה — אך הפער בין החקיקה לבין האכיפה בפועל הוא מקור לתסכול בקהילה.

> **הבהרה משפטית:** מידע זה כללי ואינו ייעוץ משפטי. למקרה קונקרטי פנו לעורך-דין או לטבקה.

## מה אוסר החוק?
1. **הסתה לגזענות** (סעיף 144ב לחוק העונשין) — עונשה עד 5 שנות מאסר.
2. **חוק איסור הפליה במוצרים ובשירותים (2000)** — אוסר אפליה במקומות ציבוריים ובמתן שירות.
3. **חוק שוויון ההזדמנויות בעבודה (1988)** — אוסר אפליה בעבודה.
4. **חוק-יסוד: כבוד האדם וחירותו** — המסגרת החוקתית להגנה על שוויון.

## הפער בין החוק למציאות
- **תת-דיווח** — קורבנות רבים אינם מגישים תלונה.
- **קושי בהוכחה** — אפליה "שקטה" קשה יותר להוכיח.
- **שיעור העמדה לדין נמוך.**

## מה אפשר לעשות?
1. **להגיש תלונה** — כל תלונה מתעדת דפוס.
2. **לתבוע פיצוי אזרחי** — **סעיף 5 לחוק איסור הפליה** מאפשר תביעה **ללא הוכחת נזק**, עד 50,000 ₪ צמוד למדד (בסיס אוקטובר 2000).
3. **לפנות לטבקה** לייעוץ וליווי.

מקורות: [ס' 144ב לחוק העונשין](https://www.nevo.co.il/law_html/law01/073_002.htm) · [חוק איסור הפליה, התשס"א-2000](https://www.nevo.co.il/law_html/law00/74365.htm) · נבדק ספטמבר 2026.`,
      en: `Israeli law prohibits racism and incitement — but the gap between legislation and actual enforcement is a source of frustration.

> **Legal disclaimer:** This information is general and not legal advice. Contact a lawyer or Tebeka for a concrete case.

## What does the law prohibit?
1. **Incitement to racism** (Section 144B of the Penal Code) — up to 5 years' imprisonment.
2. **Prohibition of Discrimination in Products and Services Act (2000)** — public places and services.
3. **Equal Opportunity in Employment Act (1988)** — employment discrimination.
4. **Basic Law: Human Dignity and Liberty** — constitutional equality framework.

## The gap between law and reality
Under-reporting, difficulty of proof, and a low prosecution rate.

## What can be done?
File a complaint; sue for civil damages — **s.5 of the 2000 Act** allows a claim **without proof of damage**, up to ₪50,000 index-linked (October 2000 base); and contact Tebeka.

Sources: [Penal Code s.144B](https://www.nevo.co.il/law_html/law01/073_002.htm) · [anti-discrimination act, 2000](https://www.nevo.co.il/law_html/law00/74365.htm) · verified September 2026.`,
      am: `ሕጉ ዘረኝነትን ይከለክላል ነገር ግን አፈጻጸሙ ዝቅተኛ ነው። ቅሬታ ያቅርቡ፣ ካሳ ይጠይቁ፣ ቴቤካን ያነጋግሩ።`,
    },
    resources: [
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "ייעוץ משפטי חינמי וייצוג בתביעות אפליה והסתה לגזענות.",
          en: "Free legal advice and representation in discrimination and incitement-to-racism claims.",
          am: "ነጻ የሕግ ምክር እና በአድሎ እና ቅስቀሳ ክሶች ውክልና።",
        },
      },
      {
        name: "האגודה לזכויות האזרח (ACRI)",
        url: "https://www.acri.org.il",
        description: {
          he: "פעילות לחיזוק האכיפה נגד גזענות והסתה ולקידום חקיקה מגינה.",
          en: "Work to strengthen enforcement against racism and incitement and advance protective legislation.",
          am: "ዘረኝነትን እና ቅስቀሳን መከላከል ለማጠናከር የሚሰራ።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 8. Government Budget Tracking ───────────────────────────────────────────
  {
    slug: "government-budget-tracking",
    title: {
      he: "מעקב תקציב ממשלתי לקהילה האתיופית",
      en: "Tracking Government Budget for the Ethiopian Community",
      am: "ለኢትዮጵያ ማህበረሰብ የመንግሥት ቡጀት መከታተል",
    },
    subtitle: {
      he: "כיצד מתחקים אחר ההחלטות והתקציבים הממשלתיים — וכיצד דורשים יישום ושקיפות.",
      en: "How to track government decisions and budgets — and how to demand implementation and transparency.",
      am: "የመንግሥት ውሳኔዎችን እና ቡጀቶችን እንዴት መከታተል — እና ትግበራ እና ግልጽነት እንዴት መጠየቅ።",
    },
    body: {
      he: `הממשלה מקבלת מעת לעת החלטות ומקצה תקציבים ייעודיים לצמצום פערים. אך החלטה ללא יישום היא חסרת ערך — ולכן מעקב אזרחי הוא כלי סנגור מרכזי.

## התקציב הייעודי הנוכחי
**החלטת ממשלה 3243 מיום 15.7.2025** מקצה 99.75 מיליון ₪ לשנת 2025 ו-113.93 מיליון ₪ לשנת 2026, בחלוקה בין משרדי החינוך, העבודה, הרווחה, הביטחון הלאומי, הבריאות, התרבות והספורט וההתיישבות, ולמטה יישום. היא מחליפה את החלטה 787 (17.7.2023). **שימו לב: ההחלטה מתקצבת עד סוף 2026 בלבד** — המשך התקצוב אינו מובטח, וזו נקודת הלחץ הסנגורית הקרובה.

## כיצד עוקבים אחר תקציב?
1. **אתר החלטות הממשלה** (gov.il) — מאגר ציבורי של כל ההחלטות.
2. **דוחות מבקר המדינה** — בודקים אם תקציבים יושמו בפועל.
3. **ועדות הכנסת** — ועדת הכספים ודיוני ועדות בנושא יישום.
4. **מרכז המחקר והמידע של הכנסת (ממ"מ)** — מסמכים מבוססי-נתונים לפי בקשת חבר כנסת.

## כיצד דורשים יישום?
- **שאילתה דרך חבר כנסת** על מצב היישום.
- **חוק חופש המידע (1998)** — לדרוש מידע על ניצול התקציב.
- **פנייה לארגון מחקר** שיכין נייר עמדה.

## מסקנה
תקציב שלא נוצל "נשרף" בסוף שנה. נתונים מדויקים הם הנשק היעיל ביותר מול בירוקרטיה.

מקורות: [החלטה 3243 (15.7.2025)](https://www.gov.il/he/pages/dec3243-2025) · [החלטה 787 (17.7.2023)](https://www.gov.il/he/pages/dec787-2023) · נבדק ספטמבר 2026.`,
      en: `The government periodically makes decisions and allocates dedicated budgets to close gaps. But a decision without implementation is worthless — so civic monitoring is a central advocacy tool.

## The current dedicated budget
**Government Decision 3243 of 15.7.2025** allocates ₪99.75m for 2025 and ₪113.93m for 2026, split across the ministries of Education, Labour, Welfare, National Security, Health, Culture and Sport, and Settlement, plus an implementation HQ. It replaced Decision 787 (17.7.2023). **Note that it funds 2025-2026 only** — continuation is not guaranteed, which is the nearest advocacy pressure point.

## How to track a budget
The government decisions repository (gov.il), State Comptroller reports, Knesset committees, and the Knesset Research and Information Center (MMM), which prepares data-based papers at an MK's request.

## How to demand implementation
A parliamentary query through a Knesset member, and Freedom of Information Act requests.

## Conclusion
An unused budget is burned at year-end. Accurate data is the most effective weapon against bureaucracy.

Sources: [Decision 3243 (15.7.2025)](https://www.gov.il/he/pages/dec3243-2025) · [Decision 787 (17.7.2023)](https://www.gov.il/he/pages/dec787-2023) · verified September 2026.`,
      am: `የቡጀት ክትትል ጸጥ ያለ ግን ኃይለኛ የትግል ዓይነት ነው። ትክክለኛ መረጃ በቢሮክራሲ ላይ ውጤታማ መሣሪያ ነው።`,
    },
    resources: [
      {
        name: "מאגר החלטות הממשלה (gov.il)",
        url: "https://www.gov.il/he/departments/policies",
        description: {
          he: "מאגר ציבורי לאיתור החלטות ממשלה, יעדים ותקציבים ייעודיים.",
          en: "A public repository for finding government decisions, targets, and dedicated budgets.",
          am: "የመንግሥት ውሳኔዎችን፣ ግቦችን እና ቡጀቶችን ለማግኘት ሕዝባዊ ማከማቻ።",
        },
      },
      {
        name: "מבקר המדינה — דוחות ביקורת",
        url: "https://www.mevaker.gov.il",
        description: {
          he: "דוחות ביקורת רשמיים הבודקים יישום תקציבים והחלטות ממשלה בפועל.",
          en: "Official audit reports examining the actual implementation of budgets and government decisions.",
          am: "የቡጀቶችን ተግባራዊ አፈጻጸም የሚመረምሩ ኦፊሴላዊ ሪፖርቶች።",
        },
      },
      {
        name: "אגודת יהודי אתיופיה (IAEJ)",
        url: "https://www.iaej.co.il",
        description: {
          he: 'ארגון סנגור ומחקר ותיק לקהילה. נכון לספטמבר 2026 אתר הארגון מציג דף "אתר בבנייה" — מומלץ לפנות אליו ישירות ולא להסתמך על האתר.',
          en: 'A veteran advocacy and research organisation for the community. As of September 2026 its website serves an "under construction" placeholder — approach the organisation directly rather than relying on the site.',
          am: 'ለማህበረሰቡ ጥንታዊ የተሟጋችነት እና ምርምር ድርጅት። እስከ መስከረም 2026 ድረስ ድረ-ገጹ "በግንባታ ላይ" ነው።',
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 9. Women and Leadership ─────────────────────────────────────────────────
  {
    slug: "women-community-leadership",
    title: {
      he: "נשים ומנהיגות בקהילה האתיופית",
      en: "Women and Leadership in the Ethiopian Community",
      am: "ሴቶች እና መሪነት በኢትዮጵያ ማህበረሰብ",
    },
    subtitle: {
      he: "נשים יוצאות אתיופיה מובילות שינוי — תוכניות העצמה, דמויות מופת, ודרכי השתלבות.",
      en: "Ethiopian-Israeli women leading change — empowerment programs, role models, and paths to participation.",
      am: "ለውጥ የሚመሩ ኢትዮጵያ-እስራኤላዊ ሴቶች — የማብቃት ፕሮግራሞች፣ አርአያዎች እና የተሳትፎ መንገዶች።",
    },
    body: {
      he: `נשים יוצאות אתיופיה ניצבות בחזית המאבק לשוויון. לצד הישגים מרשימים, הן מתמודדות עם **תקרת זכוכית כפולה** — מחסומים גם מגדריים וגם עדתיים.

## דמויות מופת
- **פנינה תמנו-שטה** — שרת העלייה והקליטה הראשונה ילידת אתיופיה.
- **עו"ד אסתר אדמסו** ופעילות משפטיות — מובילות מאבקים לזכויות.

## תוכניות העצמה
- **תוכניות מנהיגות** לפיתוח כישורי הובלה ורשתות מקצועיות.
- **קורסי יזמות** וליווי עסקי.
- **קבוצות תמיכה** המשלבות העצמה אישית עם פעילות חברתית.
- **מלגות לימודים** לנשים בהשכלה גבוהה.

## כיצד להשתלב?
- **לפנות לארגון** כמו גוונים או טבקה על תוכניות פעילות.
- **להצטרף לרשת מנהיגות** של בוגרות.
- **ליזום** קבוצה מקומית.`,
      en: `Ethiopian-Israeli women stand at the forefront of the equality struggle, facing a **double glass ceiling** — both gender and ethnic barriers.

## Role models
Pnina Tamano-Shata — the first Ethiopian-born Minister of Immigration and Absorption. Legal activists, entrepreneurs, researchers, and artists.

## Empowerment programs
Leadership programs, entrepreneurship courses, support groups, and study scholarships.

## How to get involved
Approach Gvanim or Tebeka about active programs, join a leadership network, or initiate a local group.`,
      am: `ኢትዮጵያ-እስራኤላዊ ሴቶች ለእኩልነት ትግል ግንባር ቀደም ናቸው። ድርብ ፈተና ይገጥማቸዋል። ጋቫኒም እና ቴቤካ ፕሮግራሞች ያቀርባሉ።`,
    },
    resources: [
      // TED-158: "תנועת אמונה" removed — amona.co.il is NXDOMAIN.
      {
        name: "גוונים — מרכז לשילוב וקידום",
        url: "https://www.gvanim.org.il",
        description: {
          he: "תוכניות מנהיגות ושילוב נשים בעמדות השפעה במגזר הציבורי.",
          en: "Leadership programs and integration of women into positions of influence in the public sector.",
          am: "የመሪነት ፕሮግራሞች እና ሴቶችን በሕዝባዊ ዘርፍ ማዋሀድ።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 10. Youth and Leadership ────────────────────────────────────────────────
  {
    slug: "youth-leadership-programs",
    title: {
      he: "נוער ומנהיגות — תוכניות ודמויות",
      en: "Youth and Leadership — Programs and Figures",
      am: "ወጣቶች እና መሪነት — ፕሮግራሞች እና ሰዎች",
    },
    subtitle: {
      he: "תוכניות לפיתוח דור מנהיגים צעיר בקהילה — ממכינות קדם-צבאיות ועד מיזמים חברתיים.",
      en: "Programs to develop a young generation of leaders in the community — from pre-military academies to social ventures.",
      am: "በማህበረሰቡ ውስጥ ወጣት መሪዎችን ለማልማት ፕሮግራሞች።",
    },
    body: {
      he: `דור הצעירים יוצאי אתיופיה הוא העתיד של הקהילה. השקעה במנהיגות צעירה היא השקעה בשינוי בר-קיימא.

## תוכניות מנהיגות מרכזיות
1. **ENP — תוכניות נוער** — פיתוח מנהיגות ומעורבות חברתית.
2. **מכינות קדם-צבאיות** — פיתוח אישי, ערכי ומנהיגותי.
3. **תוכניות מצוינות אקדמית** — ליווי לקראת לימודים גבוהים.
4. **תנועות נוער** — חינוך בלתי-פורמלי ומעורבות אזרחית.

## מה צעירים מקבלים?
כלי הנהגה, רשת חברתית, תחושת שליחות, ודמויות מופת.

## כיצד מצטרפים?
דרך בית-הספר, הרשות המקומית, ארגוני הקהילה (ENP, גוונים), או מרכזי צעירים עירוניים.

## מסקנה
מנהיגות היא מיומנות נרכשת. תוכניות מובנות נותנות לצעירים כלים להפוך מכוח פוטנציאלי לכוח מוביל.`,
      en: `The young generation of Ethiopian Israelis is the community's future. Investing in young leadership is investing in sustainable change.

## Key leadership programs
ENP youth programs, pre-military academies, academic excellence programs, and youth movements.

## What do young people gain?
Leadership tools, a social network, a sense of mission, and role models.

## How to join
Through school, local authority, community organisations (ENP, Gvanim), or municipal youth centres.`,
      am: `ወጣቶችን ለማልማት ENP፣ ቅድመ-ወታደራዊ ማሰልጠኛዎች፣ አካዳሚክ ፕሮግራሞች እና የወጣት እንቅስቃሴዎች አሉ።`,
    },
    resources: [
      {
        name: "ENP — הפרויקט הלאומי לקהילה האתיופית",
        url: "https://www.enp.org.il",
        description: {
          he: "תוכניות מנהיגות, העשרה ומצוינות לבני נוער מהקהילה ברשויות רבות.",
          en: "Leadership, enrichment, and excellence programs for community youth in many localities.",
          am: "ለማህበረሰብ ወጣቶች የመሪነት እና ብቃት ፕሮግራሞች።",
        },
      },
      // TED-158: "תנועת אמונה" removed — amona.co.il is NXDOMAIN.
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 11. Demanding Media Representation ──────────────────────────────────────
  {
    slug: "demanding-media-representation",
    title: {
      he: "כיצד לדרוש ייצוג תקשורתי הוגן",
      en: "How to Demand Fair Media Representation",
      am: "ፍትሐዊ የሚዲያ ውክልና እንዴት መጠየቅ",
    },
    subtitle: {
      he: "מאבק נגד סטריאוטיפים בתקשורת — תלונות לרשות השנייה, פנייה לעורכים, ויצירת תוכן עצמאי.",
      en: "Fighting stereotypes in the media — complaints to the regulator, approaching editors, and creating independent content.",
      am: "በሚዲያ ውስጥ የተዛቡ አመለካከቶችን መዋጋት — ለተቆጣጣሪ ቅሬታ፣ አዘጋጆችን ማነጋገር እና ራስ-ገዝ ይዘት መፍጠር።",
    },
    body: {
      he: `ייצוג תקשורתי מעצב תפיסות ציבוריות. כאשר קהילה מיוצגת באופן חלקי — נפגעת תדמיתה.

## הבעיות בייצוג הקיים
1. **תת-ייצוג** — נוכחות נמוכה כמגישים, כתבים, ובעלי תפקידים בכירים.
2. **סטריאוטיפים** — הופעה לרוב בהקשרים שליליים.
3. **היעדר קול אותנטי** — סיפורים מסופרים מבחוץ.

## כיצד פועלים?
1. **תלונה לרשות השנייה לטלוויזיה ולרדיו** — על תוכן פוגעני בשידורים מסחריים.
2. **פנייה לממונה על קבילות הציבור בתאגיד השידור הישראלי (כאן)** — על תכנים בשידור הציבורי. התפקיד מעוגן בחוק השידור הציבורי הישראלי, התשע"ד-2014. דוא"ל kvilot@kan.org.il.
3. **פנייה ישירה לעורכים** — מכתב מנומק.
4. **מועצת העיתונות** — לתלונות על אתיקה עיתונאית.

## יצירת תוכן עצמאי
רשתות חברתיות, פודקאסטים, ובלוגים — סיפור הנרטיב מבפנים.`,
      en: `Media representation shapes public perceptions. When a community is partially represented — its image suffers.

## Problems in current representation
Under-representation, stereotypes, and absence of an authentic voice.

## How to act
Complaint to the Second Authority for Television and Radio (commercial broadcasting), to the Public Complaints Commissioner at the Israeli Public Broadcasting Corporation (Kan) — a statutory post under the 2014 Public Broadcasting Law, kvilot@kan.org.il — a direct approach to editors, or the Press and Media Council.

## Creating independent content
Social networks, podcasts, and blogs — telling the narrative from within.`,
      am: `ፍትሐዊ ውክልና ለሁለተኛው ባለ ሥልጣን ቅሬታ ማቅረብ፣ አዘጋጆችን ማነጋገር እና ራስ-ገዝ ይዘት መፍጠርን ይጠይቃል።`,
    },
    resources: [
      {
        name: "הרשות השנייה לטלוויזיה ולרדיו",
        url: "https://www.gov.il/he/departments/the_second_authority_for_television_and_radio",
        description: {
          he: "הגוף המפקח על שידורים מסחריים — ניתן להגיש תלונה על תוכן פוגעני.",
          en: "The body overseeing commercial broadcasting — you can file a complaint about offensive or discriminatory content.",
          am: "የንግድ ስርጭትን የሚቆጣጠር አካል — ስለ ጎጂ ይዘት ቅሬታ ማቅረብ ይቻላል።",
        },
      },
      {
        name: "מועצת העיתונות והתקשורת בישראל",
        url: "https://www.presscouncil.co.il/tluna/",
        description: {
          he: "גוף אתי לבירור תלונות על סיקור עיתונאי פוגעני או מפלה.",
          en: "An ethics body for adjudicating complaints about offensive or discriminatory journalistic coverage.",
          am: "ስለ ጎጂ ወይም አድሎ የጋዜጠኝነት ሽፋን ቅሬታዎችን ለመመርመር የስነ-ምግባር አካል።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 12. Local Ethiopian Politicians ─────────────────────────────────────────
  {
    slug: "local-ethiopian-politicians",
    title: {
      he: "פוליטיקאים מקומיים יוצאי אתיופיה",
      en: "Local Ethiopian-Israeli Politicians",
      am: "የአካባቢ ኢትዮጵያ-ተወላጅ ፖለቲከኞች",
    },
    subtitle: {
      he: "חברי מועצה, סגני ראשי ערים ומנהיגים מקומיים — והשפעתם על חיי היומיום בקהילה.",
      en: "Council members, deputy mayors, and local leaders — and their impact on daily community life.",
      am: "የምክር ቤት አባላት፣ ምክትል ከንቲባዎች እና የአካባቢ መሪዎች — እና በዕለታዊ ሕይወት ላይ ያላቸው ተጽዕኖ።",
    },
    body: {
      he: `הפוליטיקה המקומית משפיעה על חיי היומיום יותר מכל זירה אחרת — חינוך, גנים, רווחה, ניקיון, ותכנון עירוני.

## היכן מתרכזים נציגים מקומיים?
נתניה, ראשון-לציון, חדרה, רחובות, קריית-מלאכי, באר-שבע, ירושלים, וקריית-גת ראו נבחרי ציבור מהקהילה.

## במה עוסק חבר מועצה?
ועדות עירוניות (חינוך, רווחה, תכנון, ספורט), תקצוב מקומי, קשר עם תושבים, ויזום מדיניות.

## כיצד פונים לנציג מקומי?
- דרך אתר העירייה.
- ישיבות מועצה פתוחות.
- קבלת קהל.
- דרך ארגון קהילתי מקומי.

## כיצד מגדילים ייצוג מקומי?
הצבעה בבחירות המקומיות, תמיכה במועמדים, והתנדבות בקמפיינים.`,
      en: `Local politics affects daily life more than any other arena — education, kindergartens, welfare, and urban planning.

## Where are local representatives concentrated?
Netanya, Rishon LeZion, Hadera, Rehovot, Kiryat Malachi, Be'er Sheva, Jerusalem, and Kiryat Gat.

## How to approach a local representative?
Municipality website, open council meetings, public reception hours, or a local community organisation.

## How to increase local representation?
Vote in local elections, support community candidates, and volunteer in campaigns.`,
      am: `የአካባቢ ፖለቲካ ዕለታዊ ሕይወትን ይነካል። በናታንያ፣ ሪሾን ሌዚዮን፣ ሐደራ እና ቤኤርሼቫ ተወካዮች አሉ። በምርጫ ይሳተፉ።`,
    },
    resources: [
      {
        name: "מרכז השלטון המקומי בישראל",
        url: "https://www.masham.org.il",
        description: {
          he: "מידע על רשויות מקומיות, מועצות עיר, ובחירות מקומיות בישראל.",
          en: "Information on local authorities, city councils, and local elections in Israel.",
          am: "ስለ አካባቢ ባለ ሥልጣናት እና ምርጫዎች መረጃ።",
        },
      },
      {
        name: "גוונים — מרכז לשילוב וקידום",
        url: "https://www.gvanim.org.il",
        description: {
          he: "מקדם ייצוג יוצאי אתיופיה בשלטון המקומי ובמוסדות ציבוריים.",
          en: "Promotes Ethiopian-Israeli representation in local government and public institutions.",
          am: "ኢትዮጵያ-እስራኤላዊ ውክልናን ያስተዋውቃል።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 13. How to Start Community Activism ─────────────────────────────────────
  {
    slug: "starting-community-activism",
    title: {
      he: "פעילות קהילתית — כיצד להתחיל",
      en: "Community Activism — How to Begin",
      am: "የማህበረሰብ እንቅስቃሴ — እንዴት መጀመር",
    },
    subtitle: {
      he: "מדריך מעשי להתחלת פעילות חברתית — מזיהוי בעיה ועד הקמת קבוצה ויצירת השפעה.",
      en: "A practical guide to starting social activism — from identifying a problem to forming a group and making an impact.",
      am: "ማህበራዊ እንቅስቃሴ ለመጀመር ተግባራዊ መምሪያ።",
    },
    body: {
      he: `כל שינוי חברתי מתחיל באדם אחד שמחליט שלא להישאר אדיש.

## שלב 1 — זיהוי הבעיה
התמקדו בבעיה קונקרטית: גן שאין בו מקום, מתקן מוזנח, אפליה במקום ציבורי. ככל שהבעיה ממוקדת — קל יותר לגייס תמיכה.

## שלב 2 — איסוף מידע
תיעוד עובדות, מיפוי בעלי עניין, ובדיקת זכויות.

## שלב 3 — בניית קבוצה
גיוס שותפים, חלוקת תפקידים, וערוץ תקשורת (ווטסאפ / רשתות חברתיות).

## שלב 4 — פעולה
פנייה לרשות, עצומה, חשיפה תקשורתית, ושיתוף ארגון כמו טבקה או IAEJ.

## שלב 5 — התמדה
שינוי לוקח זמן. תיעוד התקדמות וחגיגת הישגים קטנים הם מפתח להתמדה.`,
      en: `Every social change begins with one person who decides not to remain indifferent.

## Step 1 — Identify the problem
Focus on a concrete, clear problem. The more focused — the easier to rally support.

## Step 2 — Gather information
Document facts, map stakeholders, and check rights.

## Step 3 — Build a group
Recruit partners, divide roles, create a communication channel.

## Step 4 — Action
Approach the authority, petition, seek media exposure, partner with Tebeka or IAEJ.

## Step 5 — Persist
Change takes time. Document progress and celebrate small wins.`,
      am: `ችግሩን ይለዩ፣ መረጃ ይሰብስቡ፣ ቡድን ይገንቡ፣ እርምጃ ይውሰዱ እና ጽናት ይኑሩ።`,
    },
    resources: [
      {
        name: "שתיל — סיוע לארגונים ולפעילים חברתיים",
        url: "https://www.shatil.org.il",
        description: {
          he: "מרכז הכשרה וליווי לפעילים חברתיים ולקבוצות שמתחילות לפעול לשינוי.",
          en: "A training and accompaniment centre for social activists and groups beginning to work for change.",
          am: "ለማህበራዊ አንቂዎች እና ለለውጥ ቡድኖች የስልጠና እና ድጋፍ ማዕከል።",
        },
      },
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "מלווה יוזמות קהילתיות בנושאי זכויות ואפליה ומספק ייעוץ משפטי.",
          en: "Accompanies community initiatives on rights and discrimination and provides legal advice.",
          am: "የማህበረሰብ ተነሳሽነቶችን ይደግፋል።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 14. Building Coalitions ─────────────────────────────────────────────────
  {
    slug: "building-coalitions",
    title: {
      he: "בניית קואליציות עם קהילות אחרות",
      en: "Building Coalitions with Other Communities",
      am: "ከሌሎች ማህበረሰቦች ጋር ጥምረት መገንባት",
    },
    subtitle: {
      he: "כיצד שיתופי פעולה בין-קהילתיים מחזקים מאבקים משותפים לשוויון וצדק חברתי.",
      en: "How inter-community collaborations strengthen shared struggles for equality and social justice.",
      am: "የማህበረሰብ-ተሻጋሪ ትብብሮች ለእኩልነት ትግሎችን እንዴት ያጠናክራሉ።",
    },
    body: {
      he: `מאבקים בודדים חזקים — אך קואליציות חזקות יותר.

## למה קואליציות?
1. **כוח במספרים** — דרישה משותפת קשה יותר להתעלם ממנה.
2. **שיתוף משאבים** — ידע, תקציב, וקשרים.
3. **לגיטימציה ציבורית** — מאבק רחב נתפס כצדק כללי.
4. **למידה הדדית** — קהילות לומדות זו מהאסטרטגיות של זו.

## שותפים פוטנציאליים
קהילות מזרחיות, יוצאי ברית-המועצות, ערבים אזרחי ישראל, ACRI, וארגוני נשים ולהט"ב.

## עקרונות לקואליציה מוצלחת
מטרה משותפת ברורה, כבוד הדדי, חלוקת תפקידים הוגנת, ושקיפות.

## מסקנה
"לבד מגיעים מהר, יחד מגיעים רחוק."`,
      en: `Single struggles are strong — but coalitions are stronger.

## Why coalitions?
Power in numbers, resource sharing, public legitimacy, and mutual learning.

## Potential partners
Mizrahi communities, FSU immigrants, Arab citizens of Israel, ACRI, women's and LGBT organisations.

## Principles for success
Clear shared goal, mutual respect, fair role division, and transparency.`,
      am: `"ብቻ በፍጥነት ትደርሳለህ፣ አብረህ ሩቅ ትደርሳለህ።" ጥምረቶች ሰፊ ድጋፍ ይፈጥራሉ።`,
    },
    resources: [
      {
        name: "האגודה לזכויות האזרח (ACRI)",
        url: "https://www.acri.org.il",
        description: {
          he: "ארגון-גג לזכויות אדם המוביל קואליציות רוחב בנושאי שוויון ואפליה.",
          en: "An umbrella human rights organisation leading cross-cutting coalitions on equality and discrimination.",
          am: "ተሻጋሪ ጥምረቶችን የሚመራ የሰብዓዊ መብቶች ጃንጥላ ድርጅት።",
        },
      },
      {
        name: "שתיל — בניית שותפויות וקואליציות",
        url: "https://www.shatil.org.il",
        description: {
          he: "מספק הכשרה וליווי לבניית שותפויות וקואליציות בין ארגונים וקהילות.",
          en: "Provides training and accompaniment for building partnerships and coalitions between organisations and communities.",
          am: "ሽርክናዎችን እና ጥምረቶችን ለመገንባት ስልጠና ይሰጣል።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 15. Legal Aid Organisations ─────────────────────────────────────────────
  {
    slug: "legal-aid-organizations",
    title: {
      he: "ארגוני סיוע משפטי לקהילה",
      en: "Legal Aid Organisations for the Community",
      am: "ለማህበረሰቡ የሕግ እርዳታ ድርጅቶች",
    },
    subtitle: {
      he: "היכן מקבלים ייעוץ וייצוג משפטי בחינם או בעלות נמוכה — מטבקה ועד הסיוע המשפטי הממשלתי.",
      en: "Where to get free or low-cost legal advice and representation — from Tebeka to the state Legal Aid.",
      am: "ነጻ ወይም ዝቅተኛ ወጪ የሕግ ምክር እና ውክልና የት ማግኘት — ከቴቤካ እስከ የመንግሥት የሕግ እርዳታ።",
    },
    body: {
      he: `גישה לצדק לא צריכה להיות תלויה ביכולת כלכלית. בישראל פועלים כמה גופים שמספקים ייעוץ וייצוג משפטי בחינם.

> **הבהרה:** רשימה זו כללית. זכאות ותחומי טיפול משתנים.

## טבקה — ייעוץ ייעודי לקהילה
מתמחה בזכויות הקהילה האתיופית: אפליה על רקע מוצא, אלימות משטרתית, עיכובים, דיני עבודה, ומחיקת רישום פלילי. הארגון מציין באתרו שסיועו ניתן ללא תשלום. טלפון 072-2424622.

## הסיוע המשפטי — משרד המשפטים
ייצוג בתחומים אזרחיים (משפחה, דיור, ביטוח לאומי) לזכאים כלכלית. השירות ניתן ללא תשלום, למעט דמי השתתפות שנקבעים לפי רמת ההכנסה. מוקד מידע **\\*6405**; פתיחת תיק 073-3927788.

## ארגונים נוספים
1. **ACRI** — תיקים עקרוניים בזכויות אדם.
2. **קליניקות משפטיות באוניברסיטאות** — ללא עלות, בליווי מרצים.

## מתי לפנות?
מוקדם ככל האפשר — לתיקים פליליים ולתלונות יש מועדי התיישנות.`,
      en: `Access to justice should not depend on financial means.

> **Disclaimer:** This list is general. Eligibility and areas of practice vary.

## Tebeka
Specialises in Ethiopian community rights. Free advice and representation in discrimination, police violence, and civil rights cases.

## Legal Aid — Ministry of Justice
Civil representation (family, housing, National Insurance) for the financially eligible. The service is free apart from a participation fee set by income level. Information line **\\*6405**; to open a case, 073-3927788.

## Additional organisations
ACRI (principled human-rights cases) and university legal clinics (free, supervised by faculty).

## When to turn to them?
As early as possible — criminal cases and complaints have limitation periods.`,
      am: `ቴቤካ ለኢትዮጵያ ተወላጆች ያለ ክፍያ የሕግ ድጋፍ ይሰጣል። የፍትህ ሚኒስቴር የሕግ እርዳታ ለሚበቁ ሰዎች በፍትሐ ብሔር ጉዳዮች ውክልና ይሰጣል — የመረጃ መስመር **\\*6405**። ACRI እና የዩኒቨርሲቲ የሕግ ክሊኒኮች ሌሎች አማራጮች ናቸው።`,
    },
    resources: [
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "ייעוץ וייצוג משפטי חינמי בתיקי אפליה, אלימות משטרתית וזכויות אזרח לקהילה.",
          en: "Free legal advice and representation in discrimination, police violence, and civil rights cases for the community.",
          am: "ለማህበረሰቡ ነጻ የሕግ ምክር እና ውክልና።",
        },
      },
      {
        name: "הסיוע המשפטי — משרד המשפטים",
        phone: "*6405",
        url: "https://www.gov.il/he/departments/legal_aid",
        description: {
          he: "ייצוג משפטי חינמי בתחומים אזרחיים לזכאים מבחינה כלכלית, לפי אזור מגורים.",
          en: "Free legal representation in civil matters for the financially eligible, by area of residence.",
          am: "ለሚበቁ ሰዎች ነጻ የፍትሐ ብሔር ውክልና።",
        },
      },
      // TED-158: "ידיד — מרכזי זכויות בקהילה" removed. The NGO went into
      // liquidation in 2019 and closed in 2020, and yedid.org.il is now an
      // unrelated commercial tutoring/personal-training marketplace — so
      // this entry was routing people seeking rights help to an ad site.
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 16. Reporting Hate Crimes ───────────────────────────────────────────────
  {
    slug: "reporting-hate-crimes",
    title: {
      he: "דיווח על עבירות שנאה — מדריך",
      en: "Reporting Hate Crimes — A Guide",
      am: "የጥላቻ ወንጀሎችን ሪፖርት ማድረግ — መምሪያ",
    },
    subtitle: {
      he: "מה נחשב עבירת שנאה, כיצד לתעד אותה, ולמי לפנות — כולל מקרי חירום מיידיים.",
      en: "What counts as a hate crime, how to document it, and whom to approach — including immediate emergencies.",
      am: "ምን የጥላቻ ወንጀል ይባላል፣ እንዴት መዘገብ እና ማንን ማነጋገር — አስቸኳይ ጉዳዮችን ጨምሮ።",
    },
    body: {
      he: `עבירת שנאה היא עבירה פלילית שבוצעה ממניע גזעני. בישראל מניע גזעני מהווה נסיבה מחמירה בענישה.

> **חירום:** במצב של סכנה מיידית — חייגו **100** למשטרה מיד.

## מה נחשב עבירת שנאה?
1. **תקיפה פיזית** על רקע מוצא.
2. **השחתת רכוש** עם כתובות גזעניות.
3. **איומים והטרדה** ממניע גזעני.
4. **הסתה לאלימות** (סעיף 144 לחוק העונשין).
5. **ונדליזם** נגד מוסדות קהילתיים.

## שלב 1 — בטיחות תחילה
ודאו שאתם בטוחים. אם נפצעתם — פנו לטיפול רפואי ובקשו תיעוד.

## שלב 2 — תיעוד
צילום הזירה, שמות עדים, תאריך ומקום מדויק, שמירת הודעות אם מדובר באיום מקוון.

## שלב 3 — הגשת תלונה
הגישו תלונה למשטרה. הדגישו שמדובר במניע גזעני כדי שהאירוע יסווג כעבירת שנאה.

## שלב 4 — ליווי
טבקה מספקת ייעוץ וליווי משפטי לנפגעי עבירות שנאה.`,
      en: `A hate crime is a criminal offence committed out of a racist motive. In Israel, a racist motive is an aggravating circumstance.

> **Emergency:** In immediate danger — call **100** for the police immediately.

## What counts as a hate crime?
Physical assault, property damage with racist graffiti, threats and harassment, incitement to violence, and vandalism against community institutions.

## Steps
1. Safety first — seek medical care if injured.
2. Document — photo, witnesses, date, location, save messages.
3. File a complaint — explicitly state the racist motive.
4. Contact Tebeka for legal accompaniment.`,
      am: `አስቸኳይ ጊዜ: **100** ይደውሉ። ፎቶ ያንሱ፣ ምስክሮችን ይዝግቡ፣ ቅሬታ ያቅርቡ፣ ቴቤካን ያነጋግሩ።`,
    },
    resources: [
      {
        name: "משטרת ישראל — חירום",
        phone: "100",
        url: "https://www.gov.il/he/departments/israel_police",
        description: {
          he: "במקרה חירום, אלימות פיזית או סכנה מיידית — חייגו 100 לקבלת סיוע מיידי.",
          en: "In an emergency, physical violence, or immediate danger — call 100 for immediate assistance.",
          am: "በአስቸኳይ ጊዜ — ለአፋጣኝ እርዳታ 100 ይደውሉ።",
        },
      },
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "ליווי משפטי ותמיכה בנפגעי תקיפה, הטרדה והתבטאויות גזעניות — לרבות במסלול לשון הרע.",
          en: "Legal accompaniment and support for people harmed by racially motivated assault, harassment and statements — including via the defamation route.",
          am: "ለዘረኛ ምክንያት የጥላቻ ወንጀል ሰለባዎች ሕጋዊ ድጋፍ።",
        },
      },
      {
        name: "האגודה לזכויות האזרח (ACRI)",
        url: "https://www.acri.org.il",
        description: {
          he: "טיפול בתיקי עבירות שנאה עקרוניים וקידום אכיפה מערכתית.",
          en: "Handling principled hate crime cases and advancing systemic enforcement.",
          am: "የጥላቻ ወንጀል ጉዳዮችን ማስተናገድ።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 17. Criminal Record Expungement ─────────────────────────────────────────
  {
    slug: "criminal-record-expungement",
    title: {
      he: "מחיקת רישום פלילי — זכויות ותהליך",
      en: "Criminal Record Expungement — Rights and Process",
      am: "የወንጀል መዝገብ ማጥፋት — መብቶች እና ሂደት",
    },
    subtitle: {
      he: "כיצד פועלים חוק המרשם הפלילי ותקופות ההתיישנות והמחיקה — ומתי כדאי לפנות לסיוע.",
      en: "How the Criminal Register Law, limitation, and expungement periods work — and when to seek help.",
      am: "የወንጀል መዝገብ ሕግ፣ የይርጋ እና የማጥፋት ጊዜዎች እንዴት ይሰራሉ — እና መቼ እርዳታ መፈለግ።",
    },
    body: {
      he: `רישום פלילי יכול ללוות אדם שנים ולפגוע בתעסוקה. אך החוק קובע מנגנונים של התיישנות ומחיקה.

> **הבהרה משפטית:** מידע זה כללי. כל מקרה שונה — מומלץ לפנות לעורך-דין.

## ההבדל בין התיישנות למחיקה
החוק החל היום הוא **חוק המידע הפלילי ותקנת השבים, התשע"ט-2019**, שנכנס לתוקף ב-15.7.2022 והחליף את חוק המרשם הפלילי ותקנת השבים משנת 1981. שני השלבים נשמרו:

1. **תקופת ההתיישנות** (ס' 18-20) — בתומה, רק גופים מסוימים רשאים לראות את המידע; מעסיק רגיל אינו רשאי.
2. **תקופת המחיקה** (ס' 21-23) — לאחר תקופה נוספת המידע נמחק.

## בקשת חנינה
ניתן לפנות לנשיא המדינה בבקשת חנינה לקיצור התקופות — בדרך כלל בליווי עורך-דין.

מקור: [חוק המידע הפלילי ותקנת השבים, התשע"ט-2019](https://www.nevo.co.il/law_html/law00/228942.htm) · נבדק ספטמבר 2026.

## למה זה חשוב לקהילה?
שיטור-יתר עלול להותיר רישום לצעירים על עבירות קלות. ידיעה שהרישום נמחק מאפשרת תכנון עתיד תעסוקתי.`,
      en: `A criminal record can follow a person for years. But the law establishes limitation and expungement mechanisms.

> **Legal disclaimer:** This information is general. Every case differs — consult a lawyer or Legal Aid.

## The difference between limitation and expungement
The governing statute today is the **Criminal Information and Rehabilitation of Offenders Law, 2019**, in force since 15.7.2022, which replaced the 1981 Criminal Register act. Both stages survive:

1. **Limitation period** (ss.18-20) — after this, only certain bodies may view the information; ordinary employers may not.
2. **Expungement period** (ss.21-23) — after a further period the information is erased.

## Petitioning for a pardon
You may petition the President for a pardon to shorten these periods — usually with a lawyer's help.

Source: [Criminal Information and Rehabilitation of Offenders Law, 2019](https://www.nevo.co.il/law_html/law00/228942.htm) · verified September 2026.

## Why does this matter to the community?
Over-policing may leave young people with records for minor offences. Knowing the record can be expunged enables planning for employment.`,
      am: `ዛሬ የሚሠራው ሕግ **የ2019 የወንጀል መረጃ እና የወንጀለኞች መልሶ ማቋቋም ሕግ** ነው፤ ከ15.7.2022 ጀምሮ በሥራ ላይ ውሎ የ1981ኙን ተክቷል። የይርጋ ጊዜ (ክፍሎች 18-20) እና የማጥፋት ጊዜ (ክፍሎች 21-23) ሁለቱም አሉ። ሕጋዊ ምክር ይፈልጉ።`,
    },
    resources: [
      {
        name: "הסיוע המשפטי — משרד המשפטים",
        phone: "*6405",
        url: "https://www.gov.il/he/departments/legal_aid",
        description: {
          he: "ייעוץ משפטי בנושאי מרשם פלילי, התיישנות, מחיקה ובקשות חנינה לזכאים.",
          en: "Legal advice on criminal register, limitation, expungement, and pardon applications for the eligible.",
          am: "ስለ ወንጀል መዝገብ እና ይርጋ የሕግ ምክር።",
        },
      },
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "ייעוץ וליווי משפטי בנושאי רישום פלילי וזכויות, במיוחד בעקבות שיטור-יתר.",
          en: "Legal advice and accompaniment on criminal record and rights, especially following over-policing.",
          am: "ስለ ወንጀል መዝገብ እና መብቶች ሕጋዊ ምክር።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },

  // ── 18. Tebeka — Justice and Equality ───────────────────────────────────────
  {
    slug: "tebeka-justice-equality",
    title: {
      he: "ארגון טבקה — צדק ושוויון לקהילה",
      en: "Tebeka — Justice and Equality for the Community",
      am: "ቴቤካ ድርጅት — ለማህበረሰቡ ፍትህ እና እኩልነት",
    },
    subtitle: {
      he: "הארגון המשפטי המוביל של הקהילה — ייעוץ, ייצוג ומאבק בגזענות. כל מה שצריך לדעת.",
      en: "The community's leading legal organisation — advice, representation, and the fight against racism. All you need to know.",
      am: "የማህበረሰቡ ቀዳሚ የሕግ ድርጅት — ምክር፣ ውክልና እና ዘረኝነትን መዋጋት።",
    },
    body: {
      he: `"טבקה" — שמשמעותו באמהרית **"סנגור של צדק"** — הוא ארגון משפטי-חברתי שהוקם כדי להגן על זכויות הקהילה האתיופית בישראל.

## מה טבקה עושה?
1. **ייעוץ וייצוג משפטי** — אפליה על רקע מוצא, אלימות משטרתית, עיכובים, דיני עבודה, דיור, חינוך ובריאות. הארגון מציין באתרו שסיועו ניתן ללא תשלום.
2. **ליטיגציה אסטרטגית** — תיקים תקדימיים שמשנים מדיניות, כולל עתירות לבג"ץ (בהן עתירות נגד נוהל דרישת הזדהות של המשטרה).
3. **סנגור ציבורי** — קידום חקיקה ושינוי נהלים מול הכנסת והממשלה.
4. **הסברה והעצמה** — הרצאות וסדנאות על זכויות, בעברית ובאמהרית.
5. **תוכניות של הארגון עצמו** — בהן "רקיע" ו"נערי דין".

## מתי לפנות לטבקה?
- חוויתם אפליה במקום עבודה, בכניסה למקום ציבורי, או בקבלת שירות.
- נפגעתם מאלימות משטרתית או עוכבתם ללא סיבה נראית לעין.
- פוטרתם או קופחתם על רקע מוצא.
- נתקלתם בהתבטאויות גזעניות או בהסתה — טבקה מטפלת בהן גם במסלול לשון הרע.
- נותר לכם רישום פלילי ואתם רוצים לבדוק מחיקה.

## כיצד פונים?
טלפון: **072-2424622** | אתר: tebeka.org.il. תארו בקצרה את הבעיה, התאריך, והמסמכים שברשותכם.

## מסקנה
אם חוויתם פגיעה בזכויות — אל תישארו לבד. טבקה כאן בדיוק בשביל זה.`,
      en: `"Tebeka" — Amharic for **"advocate of justice"** — is a legal-social organisation founded to protect the rights of the Ethiopian community in Israel.

## What does Tebeka do?
1. **Legal advice and representation** — origin-based discrimination, police violence, street stops, employment, housing, education and health. The organisation states on its site that its assistance is provided without payment.
2. **Strategic litigation** — precedent-setting cases that change policy, including Supreme Court petitions (among them petitions against the police procedure for demanding identification).
3. **Public advocacy** — legislation and changes to official procedure.
4. **Education and empowerment** — lectures and workshops on rights, in Hebrew and Amharic.
5. **Its own programmes** — including Rakia and Na'arei Din.

## When to turn to Tebeka?
Discrimination at work, in entry to a public place, or in receiving a service; police violence or a stop with no visible cause; dismissal or disadvantage based on origin; racist statements or incitement, which they also pursue as defamation; and checking whether a criminal record can be expunged.

## How to approach
Phone: **072-2424622** | Website: tebeka.org.il.

## Conclusion
If you have experienced a rights violation — do not stay alone. Tebeka is here for exactly that.`,
      am: `"ቴቤካ" በአማርኛ **"የፍትህ ጠበቃ"** ማለት ነው። በተወላጅነት ላይ የተመሠረተ አድሎ፣ የፖሊስ ጥቃት፣ ማቆም፣ የሥራ ሕግ እና የወንጀል መዝገብ ማጥፋት ላይ የሕግ ምክር እና ውክልና ይሰጣሉ፤ በድረ-ገጻቸው ድጋፉ ያለ ክፍያ እንደሚሰጥ ገልጸዋል። ስትራቴጂካዊ ሙግት፣ ሕዝባዊ ተሟጋችነት እና ትምህርትም ይሰጣሉ። ስልክ: 072-2424622። መብትዎ ከተጣሰ ብቻዎን አይቆዩ።`,
    },
    resources: [
      {
        name: "טבקה — ארגון זכויות לקהילה האתיופית",
        phone: "072-2424622",
        url: "https://www.tebeka.org.il",
        description: {
          he: "מוקד הפניות המרכזי לייעוץ וייצוג משפטי חינמי בתיקי אפליה וזכויות אזרח.",
          en: "The central enquiry line for free legal advice and representation in discrimination and civil rights cases.",
          am: "ነጻ የሕግ ምክር እና ውክልና ማዕከላዊ የጥሪ መስመር።",
        },
      },
      {
        name: "האגודה לזכויות האזרח (ACRI)",
        url: "https://www.acri.org.il",
        description: {
          he: "ארגון זכויות אדם שותף לטבקה בתיקים עקרוניים של אפליה שיטתית.",
          en: "A human rights organisation partnering with Tebeka on principled systemic discrimination cases.",
          am: "ከቴቤካ ጋር አጋር የሰብዓዊ መብቶች ድርጅት።",
        },
      },
    ],
    lastReviewed: "2026-09-02",
  },
];
