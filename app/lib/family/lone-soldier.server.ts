// Family & Support — "חייל בודד וחייל ממשפחה מתקשה" guide (TED-142).
//
// Second guide of the Soldiers & Families hub. Shares the types and the
// rendering shell with the detention guide; kept in its own module so each
// page's prose stays readable and reviewable.
//
// ── VERIFICATION ───────────────────────────────────────────────────────────
//
// Verified against Kol Zchut's חייל בודד / הגשת בקשה להכרה כחייל בודד /
// חיילים בודדים / תשמ"ש pages, which cite פקודות מטכ"ל 35.0808 ("חיילים
// בודדים — עקרונות, זכויות ונהלים") and 35.0210 ("חוקת התשלומים למשפחות
// חיילים בשירות חובה"), plus the MoD pre-recruitment portal 9779.mod.gov.il
// for the ת"ש framing, and משרד העלייה והקליטה נוהל 11.186 ("נוהל חיילים
// עולים", in force 01.02.2021) for the olim-soldier grant.
//
// DELIBERATELY EXCLUDED (see the PR body):
//   - Every shekel amount. The two figures circulating for the lone-soldier
//     monthly grant contradict each other (a flat ₪600 on a MoD page carrying
//     no update date, vs "100% of a private's base salary" on Kol Zchut,
//     which the same MoD page puts at a figure implying roughly double).
//     The page names the entitlement and routes to the משק"ית ת"ש instead.
//   - The length of the extended eligibility window that נוהל 11.186 grants
//     יוצאי אתיופיה, and the enhanced grant percentage. Two independent
//     verification passes returned different windows (10 vs 15 years) because
//     gov.il 403s automated fetches, so the page states that an extended
//     window exists — which the procedure does document — and routes the
//     reader to the ministry hotline *2994 for the number.
//   - Any income threshold, sibling-count rule or per-capita calculation for
//     תשמ"ש. These live inside פ"מ 35.0210, whose text is not public. Kol
//     Zchut states only that support is set "לאור המצב הכלכלי והסוציאלי של
//     המבקש ומשפחתו". The required-documents list must NOT be read as a
//     scoring rule, and the wizard does not treat it as one.
//   - The monthly day-off entitlement's exact cadence (sources disagree).

import type { SoldierFaq, SoldierTopic } from "./soldiers.server";

const LAST_REVIEWED = "2026-08-31";

export const LONE_SOLDIER_TOPIC: SoldierTopic = {
  slug: "lone-soldier",
  title: {
    he: "חייל בודד וחייל ממשפחה מתקשה — מסלולי התמיכה",
    en: "Lone Soldiers and Soldiers from Struggling Families — Support Tracks",
    am: "ብቸኛ ወታደር እና ከተቸገረ ቤተሰብ የመጣ ወታደር — የድጋፍ መንገዶች",
  },
  subtitle: {
    he: "מי מוכר כחייל בודד, איך מגישים בקשה ואילו מסמכים באמת נדרשים, מה מקבלים — ומה עושים כשהמשפחה בארץ אבל המצב הכלכלי קשה.",
    en: "Who is recognized as a lone soldier, how to apply and which documents are actually required, what you receive — and what to do when the family is here but money is tight.",
    am: "ማን እንደ ብቸኛ ወታደር ይታወቃል፣ እንዴት ማመልከት እንደሚቻል እና በእውነት የሚያስፈልጉ ሰነዶች፣ ምን እንደሚያገኙ — እና ቤተሰቡ በአገር ውስጥ ሆኖ የገንዘብ ሁኔታው ከከበደ ምን ማድረግ።",
  },
  body: {
    he: `שתי מציאויות שונות מובילות לאותה מצוקה. באחת, לחייל אין בארץ משפחה שתומכת בו. בשנייה, יש משפחה — אבל היא זו שזקוקה לתמיכה, והחייל מרגיש שעליו לפרנס אותה. לשתיהן יש מסלול מוסדר, ולשתיהן הכתובת הראשונה זהה: **המש"קית ת"ש**.

**מי נחשב חייל בודד**
ההגדרה, לפי פקודת מטכ"ל 35.0808, פשוטה: חייל בודד הוא חייל בשירות חובה **שאין לו בארץ תמיכה הורית**. יש שלוש קטגוריות מוכרות:

**1. בודד מובהק** — הורים המתגוררים דרך קבע בחו"ל והחייל עלה לבדו; הורים שירדו מהארץ; או הורים בשליחות בחו"ל לשישה חודשים ומעלה.

**2. חסר עורף משפחתי** — אין קשר כלל עם ההורים; או שיש קשר אך החייל אינו יכול לשהות אצלם והם אינם מהווים תא משפחתי תומך; או חייל שגדל במשפחה אומנת עד גיל 18.

**3. יתום** — יתום משני ההורים.

חיילים בשירות קבע אינם נכללים. שימו לב גם: **"חייל בודד מבחירה" אינו מעמד קיים** — הביטוי מסתובב ברשת, אבל אין לו בסיס בפקודות. אם הקשר עם ההורים נותק, הקטגוריה הנכונה היא "חסר עורף משפחתי", והיא זו שדורשת את התיעוד הכבד ביותר.

**איך מגישים — ואיזה טופס**
לפני הגיוס: מעלים את הנושא בריאיון הראשוני בלשכת הגיוס וממלאים עם המש"קית **טופס 7304**. המש"קית מעבירה לפיקוד; מקרים חריגים נדונים ב**ועדת ההכרה בחייל בודד**. אישור נשלח הביתה, ובגיוס מונפקת **תעודת חייל בודד** המפרטת את תקופת התוקף ואת הזכאויות. במהלך השירות: ממלאים **טופס 62 — "שאלון הכרה לחייל בודד"** בשני עותקים, בפני קצין או בפני המש"קית ת"ש.

**מה באמת צריך להביא — וזה פחות ממה שחושבים**
זו נקודה שמרתיעה משפחות שלא לצורך. **אין צורך בתיעוד כלל** כאשר ההורים ירדו מהארץ, כאשר החייל עלה לבדו, או כאשר ההורים נפטרו. תיעוד נדרש רק בשני מקרים: הורים בשליחות (אישור מהמוסד השולח עם תאריכים), וחייל מנותק קשר (דוח עובד סוציאלי, אישור יועץ בית ספר ומסמכים כלכליים). אם אתם בקטגוריה שאינה דורשת מסמכים — אל תדחו את הבקשה בגלל טפסים שאינכם צריכים.

**מה מקבלים**
הזכאויות המוכרות כוללות מענק חודשי, מענקי מזון ודמי כלכלה, תווי חג, סיוע בהוצאות דיור, לינה בבית החייל ובקיבוצים, דירות אל"ח, הנחה בחשבון החשמל ופטור מארנונה, חופשה מיוחדת ויום חופשה לסידורים אישיים, מימון טיסה לביקור הורים בחו"ל, ומימון שיחות טלפון לחו"ל. **המענק החודשי ניתן אוטומטית** למי שהוכר — אין צורך בבקשה נפרדת. סיוע הדיור משולם כהשתתפות בשכר הדירה ובאחזקתה, וניתן לקבלו עד שלושה חודשים מראש כשחוזה השכירות מחייב זאת; מגישים לסגל ת"ש עם החוזה.

> לא פירטנו כאן סכומים בשקלים. המקורות הרשמיים הזמינים נותנים מספרים סותרים לאותו מענק, וחלקם ללא תאריך עדכון. שאלו את המש"קית ת"ש מה הסכום העדכני — היא הגורם המוסמך.

**עולים — וזכות ייעודית ליוצאי אתיופיה**
למשרד העלייה והקליטה נוהל ייעודי לחיילים עולים ("נוהל חיילים עולים", 11.186), והוא מגדיר את **החיילים יוצאי אתיופיה כאוכלוסייה ייחודית**. הנוהל מבחין בין חייל יוצא אתיופיה שהוריו בארץ לבין חייל שהוריו אינם בארץ — לשניים אלה נקבעות רמות סיוע שונות — וקובע ליוצאי אתיופיה **תקופת זכאות מורחבת** למענק החודשי לעומת עולים אחרים. זו זכות נפרדת מהמענק הצה"לי ומשולמת בנוסף לו. את הסכום ואת אורך התקופה בררו במוקד המשרד (2994*) — המקורות הפומביים חלוקים ביניהם, ולא נצטט כאן מספר שאיננו בטוחים בו.

**והמקרה השני: המשפחה כאן, אבל המצב קשה**
אם יש הורים בארץ אבל המשפחה מתקשה כלכלית, המסלול אינו "חייל בודד" אלא **תשמ"ש — תשלומי משפחה**. הוא נועד להבטיח את קיומה המינימלי של משפחת החייל. הבקשה מוגשת למש"קית ת"ש — בלשכת הגיוס לפני הגיוס, וביחידה במהלך השירות — ואפשר לבקש תשלום עבור ההורים (שניהם או אחד מהם), עבור בן או בת זוג, עבור ילדים, ועבור אחים ואחיות אם החייל הוא האפוטרופוס שלהם. **בדקו זכאות באשף ת"ש שלנו.**

**מה להביא לבקשת תשמ"ש**
תלושי שכר של ההורים או בן/בת הזוג משלושה חודשים; דפי חשבון בנק משלושה חודשים; אישורי קצבאות מביטוח לאומי אם יש; צילום תעודת זהות עם הספח שבו רשומים הילדים; דוח עובד סוציאלי אם רלוונטי; אישור אפוטרופסות אם רלוונטי; פרטי הלוואות ופיקדונות; דפי כרטיס אשראי משלושה חודשים; ואישור בעלות על רכב אם יש. ייתכן גם ביקור בית. אם נדחיתם — יש זכות ערעור, דרך לשכת הגיוס או המש"קית ביחידה.

**האגודה למען החייל — והנקודה המעשית**
האגודה מפעילה את "קופת הידידות" (ריהוט ומוצרי חשמל לחיילים ממשפחות מעוטות יכולת ולחיילים בודדים), תווי חג לכל חייל בודד או חייל הזכאי לתשלומי משפחה, מימון טיסה לחייל בודד לביקור הורים, ודירות לחיילים בודדים. הנקודה המעשית: **הבקשות מוגשות דרך המש"קית ת"ש ביחידה, לא ישירות לאגודה**. שוב אותה כתובת.

**ולמה כל זה חשוב במיוחד אצלנו**
מסמך שהוכן במרכז המחקר והמידע של הכנסת (דצמבר 2015) מצא כי "חלק ניכר מהחיילים סובלים מבעיות כלכליות בבתיהם ונאלצים לסייע בפרנסת המשפחה" — וזהו הרקע השכיח לנפקדות ולכליאה. פתיחת תיק ת"ש בזמן היא הדבר שמונע את השרשרת הזו. אין בזה בושה ואין בזה טובה: זו זכות.

> **הבהרה:** מידע זה כללי ואינו ייעוץ משפטי או פיננסי. הקובע הוא לשון פקודות המטכ"ל ונהלי המשרדים, והגורם המוסמך הוא המש"קית ת"ש.`,
    en: `Two different realities lead to the same distress. In one, the soldier has no family in Israel to support them. In the other, there is a family — but it is the family that needs support, and the soldier feels they must provide for it. Both have a formal track, and for both the first address is the same: **the family-support NCO (מש"קית ת"ש)**.

**Who counts as a lone soldier**
The definition, per General Staff Order 35.0808, is simple: a lone soldier is a compulsory-service soldier **who has no parental support in Israel**. There are three recognized categories:

**1. Clear-cut lone soldier** — parents permanently resident abroad and the soldier immigrated alone; parents who emigrated from Israel; or parents on an official posting abroad for six months or more.

**2. Without family backing** — no contact at all with the parents; or contact exists but the soldier cannot stay with them and they do not constitute a supportive family unit; or a soldier raised in foster care until 18.

**3. Orphan** — orphaned of both parents.

Career-service soldiers are excluded. Note also: **"lone soldier by choice" is not a real status** — the term circulates online but has no basis in the orders. If contact with the parents has broken down, the correct category is "without family backing", and it is the one requiring the heaviest documentation.

**How to apply — and which form**
Before enlistment: raise it at the initial interview at the recruitment office and complete **Form 7304** with the coordinator. The coordinator forwards it to command; exceptional cases go to the **lone-soldier recognition committee**. An approval letter is mailed home, and at enlistment a **lone-soldier certificate** is issued listing the validity period and entitlements. During service: complete **Form 62 — the lone-soldier recognition questionnaire** in duplicate, before an officer or the family-support NCO.

**What you actually need to bring — less than people think**
This is the point that deters families unnecessarily. **No documentation at all is required** where the parents emigrated, where the soldier immigrated alone, or where the parents have died. Documentation is required in only two cases: parents on posting (confirmation from the sending institution with dates), and a soldier out of contact with their parents (a social worker's report, a school counselor's statement, and financial documents). If you are in a category that requires no documents — do not postpone the application over paperwork you do not need.

**What you receive**
Recognized entitlements include a monthly grant, food grants and subsistence payments, holiday vouchers, housing-cost assistance, accommodation at soldiers' houses and on kibbutzim, lone-soldier apartments, an electricity-bill discount and a municipal-tax exemption, special leave and a monthly day off for personal errands, funding for a flight to visit parents abroad, and funding for international phone calls. **The monthly grant is given automatically** to anyone recognized — no separate application is needed. Housing assistance is paid as a contribution to rent and upkeep, and may be received up to three months in advance where the lease requires it; submit it to the family-support staff with the lease attached.

> We have not listed shekel amounts here. The available official sources give conflicting numbers for the same grant, and some carry no update date. Ask your family-support NCO for the current figure — they are the authoritative source.

**Olim — and a dedicated entitlement for Ethiopian-Israelis**
The Ministry of Aliyah and Integration has a dedicated procedure for immigrant soldiers ("Immigrant Soldiers Procedure", 11.186), and it defines **Ethiopian-Israeli soldiers as a distinct population**. The procedure distinguishes an Ethiopian-origin soldier whose parents are in Israel from one whose parents are not — setting different levels of assistance for each — and establishes an **extended eligibility period** for the monthly grant for Ethiopian-Israelis compared with other olim. This is separate from, and paid in addition to, the IDF grant. Check the amount and the length of the period with the ministry hotline (*2994) — the public sources disagree, and we will not quote a number we are not sure of.

**And the second case: the family is here, but times are hard**
If there are parents in Israel but the family is struggling financially, the track is not "lone soldier" but **תשמ"ש — family payments**. Its purpose is to secure the minimum subsistence of the soldier's family. The application goes to the family-support NCO — at the recruitment office before enlistment, and in the unit during service — and payment may be requested for the parents (both or one), a spouse, children, and siblings where the soldier is their guardian. **Check your eligibility in our family-support wizard.**

**What to bring for a family-payments application**
Three months of payslips for the parents or spouse; three months of bank statements; National Insurance benefit confirmations if any; a copy of the ID card with the appendix listing children; a social worker's report if relevant; guardianship confirmation if relevant; loan and deposit details; three months of credit-card statements; and proof of vehicle ownership if any. A home visit may also take place. If you are rejected, there is a right of appeal, through the recruitment office or the unit's coordinator.

**The Association for the Wellbeing of Israel's Soldiers — the practical point**
The Association runs the "Kupat HaYedidut" fund (furniture and appliances for soldiers from low-income families and for lone soldiers), holiday vouchers for every lone soldier or soldier eligible for family payments, flight funding for a lone soldier to visit parents, and apartments for lone soldiers. The practical point: **applications are submitted through the unit's family-support NCO, not directly to the Association.** The same address again.

**And why this matters especially for us**
A paper prepared by the Knesset Research and Information Center (December 2015) found that "a considerable share of the soldiers suffer from financial problems at home and are compelled to help support the family" — and that is the common backdrop to absence and incarceration. Opening a family-support case in time is the thing that breaks that chain. There is no shame in it and it is not a favour: it is an entitlement.

> **Note:** This is general information, not legal or financial advice. The General Staff orders and ministry procedures govern, and the authoritative party is the family-support NCO.`,
    am: `ሁለት የተለያዩ እውነታዎች ወደ አንድ ችግር ይመራሉ። በአንዱ ወታደሩ በአገር ውስጥ የሚደግፈው ቤተሰብ የለውም። በሌላው ቤተሰብ አለ — ነገር ግን ድጋፍ የሚያስፈልገው ቤተሰቡ ነው፣ ወታደሩም እሱ ሊያስተዳድረው እንደሚገባ ይሰማዋል። ለሁለቱም የተደራጀ መንገድ አለ፣ ለሁለቱም የመጀመሪያው አድራሻ አንድ ነው: **የמש"קית ת"ש**።

**ማን እንደ ብቸኛ ወታደር ይቆጠራል**
በጠቅላይ ኤታማዦር ትዕዛዝ 35.0808 መሠረት ትርጓሜው ቀላል ነው: ብቸኛ ወታደር ማለት **በአገር ውስጥ የወላጅ ድጋፍ የሌለው** የግዴታ አገልግሎት ወታደር ነው። ሦስት የታወቁ ምድቦች አሉ:

**1. ግልጽ ብቸኛ** — ወላጆች በቋሚነት በውጭ አገር የሚኖሩ እና ወታደሩ ብቻውን የመጣ፤ ከአገር የወጡ ወላጆች፤ ወይም ለስድስት ወራት እና ከዚያ በላይ በውጭ አገር በተልዕኮ ላይ ያሉ ወላጆች።

**2. የቤተሰብ ድጋፍ የሌለው** — ከወላጆች ጋር ምንም ግንኙነት የሌለ፤ ወይም ግንኙነት ቢኖርም ወታደሩ ከእነሱ ጋር መቆየት የማይችል እና ደጋፊ የቤተሰብ ክፍል ካልሆኑ፤ ወይም እስከ 18 ዓመት በአሳዳጊ ቤተሰብ ያደገ ወታደር።

**3. ወላጅ አልባ** — ከሁለቱም ወላጆች ወላጅ አልባ።

የቋሚ አገልግሎት ወታደሮች አይካተቱም። ልብ ይበሉ: **"በምርጫ ብቸኛ ወታደር" የሚባል ደረጃ የለም** — ቃሉ በኢንተርኔት ይዘዋወራል ግን በትዕዛዞቹ ውስጥ መሠረት የለውም። ከወላጆች ጋር ግንኙነት ከተቋረጠ ትክክለኛው ምድብ "የቤተሰብ ድጋፍ የሌለው" ነው፣ እሱም ከባዱን ሰነድ የሚጠይቀው ነው።

**እንዴት ማመልከት — እና የትኛው ቅጽ**
ከምዝገባ በፊት: በምልመላ ጽሕፈት ቤት በመጀመሪያው ቃለ መጠይቅ ጉዳዩን ያንሱ እና ከአስተባባሪው ጋር **ቅጽ 7304** ይሙሉ። አስተባባሪው ወደ ዕዝ ያስተላልፋል፤ ልዩ ጉዳዮች ወደ **የብቸኛ ወታደር ዕውቅና ኮሚቴ** ይሄዳሉ። የማጽደቂያ ደብዳቤ ወደ ቤት ይላካል፣ በምዝገባም የሚሰጡትን መብቶች የሚዘረዝር **የብቸኛ ወታደር የምስክር ወረቀት** ይሰጣል። በአገልግሎት ወቅት: **ቅጽ 62 — የብቸኛ ወታደር ዕውቅና መጠይቅ** በሁለት ቅጂ፣ በመኮንን ወይም በמש"קית ת"ש ፊት ይሙሉ።

**በእውነት ማምጣት የሚያስፈልገው — ከሚታሰበው ያንሳል**
ይህ ቤተሰቦችን ያለ አግባብ የሚያስፈራ ነጥብ ነው። ወላጆች ከአገር ከወጡ፣ ወታደሩ ብቻውን ከመጣ፣ ወይም ወላጆች ከሞቱ **ምንም ሰነድ አያስፈልግም**። ሰነድ የሚያስፈልገው በሁለት ጉዳዮች ብቻ ነው: በተልዕኮ ላይ ያሉ ወላጆች (ከላከው ተቋም ከቀኖች ጋር ማረጋገጫ)፣ እና ከወላጆቹ ግንኙነት የተቋረጠ ወታደር (የማህበራዊ ሠራተኛ ሪፖርት፣ የትምህርት ቤት አማካሪ ማረጋገጫ እና የገንዘብ ሰነዶች)። ሰነድ በማይጠይቅ ምድብ ውስጥ ከሆኑ — የማያስፈልግዎትን ወረቀት ሲጠብቁ ማመልከቻውን አያዘግዩ።

**ምን ያገኛሉ**
የታወቁ መብቶች: ወርሃዊ ድጎማ፣ የምግብ ድጎማ እና የቀለብ ክፍያ፣ የበዓል ቫውቸሮች፣ የመኖሪያ ወጪ ድጋፍ፣ በወታደር ቤቶች እና በኪቡፅ ማደሪያ፣ ለብቸኛ ወታደሮች አፓርታማዎች፣ የኤሌክትሪክ ሂሳብ ቅናሽ እና ከማዘጋጃ ቤት ግብር ነጻ መሆን፣ ልዩ ፈቃድ እና ለግል ጉዳዮች ወርሃዊ የፈቃድ ቀን፣ በውጭ አገር ወላጆችን ለመጎብኘት የበረራ ወጪ፣ እና ወደ ውጭ አገር የስልክ ጥሪ ወጪ። **ወርሃዊው ድጎማ በራስ-ሰር ይሰጣል** ዕውቅና ላገኘ ሰው — የተለየ ማመልከቻ አያስፈልግም። የመኖሪያ ድጋፍ በኪራይና በጥገና ላይ እንደ መዋጮ ይከፈላል፣ የኪራይ ውሉ ሲጠይቅም እስከ ሦስት ወር በቅድሚያ ሊገኝ ይችላል፤ ከውሉ ጋር ለת"ש ሠራተኞች ያቅርቡ።

> እዚህ የሸቀል መጠኖችን አልዘረዘርንም። የሚገኙት ኦፊሴላዊ ምንጮች ለአንድ ድጎማ የሚጋጩ ቁጥሮች ይሰጣሉ፣ አንዳንዶቹም የዘመነበት ቀን የላቸውም። ወቅታዊውን መጠን ከמש"קית ת"ש ይጠይቁ — ሥልጣን ያለው አካል እሷ ናት።

**ዓሊያ ያደረጉ — እና ለኢትዮጵያ ተወላጆች የተለየ መብት**
የዓሊያ እና መቀበል ሚኒስቴር ለስደተኛ ወታደሮች የተለየ መመሪያ አለው ("የስደተኛ ወታደሮች መመሪያ"፣ 11.186)፣ እና **የኢትዮጵያ ተወላጅ ወታደሮችን እንደ ልዩ ሕዝብ** ይተረጉማል። መመሪያው ወላጆቹ በአገር ውስጥ ያሉትን የኢትዮጵያ ተወላጅ ወታደር ወላጆቹ በአገር ውስጥ ከሌሉት ይለያል — ለሁለቱም የተለያየ የድጋፍ ደረጃ ይወስናል — እና ለኢትዮጵያ ተወላጆች ከሌሎች ስደተኞች የተለየ **የተራዘመ የብቁነት ጊዜ** ይደነግጋል። ይህ ከጦር ኃይሉ ድጎማ የተለየ ነው እና በተጨማሪ ይከፈላል። መጠኑንና የጊዜውን ርዝመት ከሚኒስቴሩ ማዕከል (2994*) ያረጋግጡ — የሕዝብ ምንጮች ይጋጫሉ፣ እኛም እርግጠኛ ያልሆንንበትን ቁጥር አንጠቅስም።

**ሁለተኛው ጉዳይ: ቤተሰቡ እዚህ ነው፣ ግን ሁኔታው ከብዷል**
በአገር ውስጥ ወላጆች ካሉ ግን ቤተሰቡ በገንዘብ የሚቸገር ከሆነ፣ መንገዱ "ብቸኛ ወታደር" ሳይሆን **תשמ"ש — የቤተሰብ ክፍያዎች** ነው። ዓላማው የወታደሩን ቤተሰብ ዝቅተኛ ኑሮ ማረጋገጥ ነው። ማመልከቻው ለמש"קית ת"ש ይቀርባል — ከምዝገባ በፊት በምልመላ ጽሕፈት ቤት፣ በአገልግሎት ወቅት በክፍሉ — እና ለወላጆች (ለሁለቱም ወይም ለአንዱ)፣ ለትዳር አጋር፣ ለልጆች፣ እና ወታደሩ አሳዳጊያቸው ከሆነ ለወንድሞችና እህቶች ክፍያ መጠየቅ ይቻላል። **በת"ש አዋቂያችን ብቁነትዎን ይመርምሩ።**

**ለתשמ"ש ማመልከቻ ምን ማምጣት**
የወላጆች ወይም የትዳር አጋር የሦስት ወር የደመወዝ ወረቀቶች፤ የሦስት ወር የባንክ ሂሳብ ወረቀቶች፤ ካሉ የብሔራዊ ኢንሹራንስ አበል ማረጋገጫዎች፤ ልጆች የተመዘገቡበት ሰፍሕ ያለው የመታወቂያ ቅጂ፤ አግባብ ካለው የማህበራዊ ሠራተኛ ሪፖርት፤ አግባብ ካለው የአሳዳጊነት ማረጋገጫ፤ የብድርና የተቀማጭ ዝርዝሮች፤ የሦስት ወር የክሬዲት ካርድ ወረቀቶች፤ እና ካለ የተሽከርካሪ ባለቤትነት ማረጋገጫ። የቤት ጉብኝትም ሊደረግ ይችላል። ውድቅ ከተደረጉ — በምልመላ ጽሕፈት ቤት ወይም በክፍሉ አስተባባሪ በኩል የይግባኝ መብት አለ።

**የወታደር ደህንነት ማህበር — ተግባራዊው ነጥብ**
ማህበሩ "קופת הידידות"ን (ከዝቅተኛ ገቢ ቤተሰቦች ለሆኑ ወታደሮችና ለብቸኛ ወታደሮች የቤት ዕቃና የኤሌክትሪክ ዕቃ)፣ ለእያንዳንዱ ብቸኛ ወታደር ወይም የቤተሰብ ክፍያ ለሚገባው ወታደር የበዓል ቫውቸሮች፣ ለብቸኛ ወታደር ወላጆችን ለመጎብኘት የበረራ ወጪ፣ እና ለብቸኛ ወታደሮች አፓርታማዎችን ያካሂዳል። ተግባራዊ ነጥቡ: **ማመልከቻዎቹ በክፍሉ በמש"קית ת"ש በኩል ይቀርባሉ፣ በቀጥታ ወደ ማህበሩ አይደለም።** እንደገና ያው አድራሻ።

**ይህ ለምን በተለይ ለእኛ አስፈላጊ ነው**
በክነሴት የምርምር እና መረጃ ማዕከል የተዘጋጀ ሰነድ (ታኅሣሥ 2015) "ከወታደሮቹ ጉልህ ክፍል በቤታቸው የገንዘብ ችግር ይሰቃያሉ እና ቤተሰቡን ለመርዳት ይገደዳሉ" ብሎ አግኝቷል — ይህም ለנפקדות እና ለእስር የተለመደው ዳራ ነው። የת"ש መዝገብን በጊዜ መክፈት ይህን ሰንሰለት የሚሰብረው ነገር ነው። በዚህ ውስጥ ዕፍረት የለም፣ ውለታም አይደለም: መብት ነው።

> **ማስታወሻ:** ይህ አጠቃላይ መረጃ ነው፣ የሕግ ወይም የገንዘብ ምክር አይደለም። የሚወስኑት የጠቅላይ ኤታማዦር ትዕዛዞችና የሚኒስቴር መመሪያዎች ናቸው፣ ሥልጣን ያለውም አካል የמש"קית ת"ש ናት።`,
  },
  resources: [
    {
      name: 'מש"קית ת"ש — ביחידה או בלשכת הגיוס',
      description: {
        he: 'הכתובת הראשונה והמוסמכת לכל בקשה — הכרה כחייל בודד, תשמ"ש, סיוע בדיור, ופניות לאגודה למען החייל. לפני הגיוס: בלשכת הגיוס. במהלך השירות: ביחידה.',
        en: "The first and authoritative address for every request — lone-soldier recognition, family payments, housing assistance, and applications to the Association for the Wellbeing of Israel's Soldiers. Before enlistment: at the recruitment office. During service: in the unit.",
        am: 'ለሁሉም ጥያቄ የመጀመሪያውና ሥልጣን ያለው አድራሻ — የብቸኛ ወታደር ዕውቅና፣ תשמ"ש፣ የመኖሪያ ድጋፍ። ከምዝገባ በፊት በምልመላ ጽሕፈት ቤት፤ በአገልግሎት ወቅት በክፍሉ።',
      },
    },
    {
      name: "מוקד חיילים בודדים",
      phone: "03-7375200",
      description: {
        he: "מוקד ייעודי לחיילים בודדים, פועל 24 שעות ביממה. גם הכתובת למי שהוכר בעבר בביטוח לאומי כילד יתום או נטוש.",
        en: "A dedicated lone-soldier hotline, operating 24 hours a day. Also the address for those previously recognized by National Insurance as an orphaned or abandoned child.",
        am: "ለብቸኛ ወታደሮች የተለየ ማዕከል፣ 24 ሰዓት ይሠራል። ከዚህ በፊት በብሔራዊ ኢንሹራንስ ወላጅ አልባ ወይም የተተወ ልጅ ተብለው ለታወቁም አድራሻ ነው።",
      },
    },
    {
      name: "משרד העלייה והקליטה — מוקד",
      phone: "*2994",
      url: "https://www.gov.il/he/departments/ministry_of_aliyah_and_integration",
      description: {
        he: 'מענק לחייל עולה לפי "נוהל חיילים עולים" (11.186), המגדיר את יוצאי אתיופיה כאוכלוסייה ייחודית ומעניק להם תקופת זכאות מורחבת. בררו במוקד את הסכום ואת התקופה העדכניים.',
        en: 'The immigrant-soldier grant under the "Immigrant Soldiers Procedure" (11.186), which defines Ethiopian-Israelis as a distinct population and grants them an extended eligibility period. Check the current amount and period with the hotline.',
        am: 'በ"የስደተኛ ወታደሮች መመሪያ" (11.186) መሠረት ለስደተኛ ወታደር ድጎማ፤ የኢትዮጵያ ተወላጆችን እንደ ልዩ ሕዝብ ይተረጉማል እና የተራዘመ የብቁነት ጊዜ ይሰጣቸዋል። ወቅታዊውን መጠንና ጊዜ ከማዕከሉ ያረጋግጡ።',
      },
    },
    {
      name: "האגודה למען החייל",
      phone: "072-2702222",
      url: "https://www.ufis.org.il/",
      description: {
        he: 'קופת הידידות (ריהוט ומוצרי חשמל), תווי חג לכל חייל בודד או זכאי תשלומי משפחה, מימון טיסה לביקור הורים, ודירות לחיילים בודדים. מגישים דרך המש"קית ת"ש ביחידה.',
        en: "The Kupat HaYedidut fund (furniture and appliances), holiday vouchers for every lone soldier or family-payments recipient, flight funding to visit parents, and lone-soldier apartments. Apply through the unit's family-support NCO.",
        am: 'קופת הידידות (የቤት ዕቃና የኤሌክትሪክ ዕቃ)፣ ለእያንዳንዱ ብቸኛ ወታደር የበዓል ቫውቸሮች፣ ወላጆችን ለመጎብኘት የበረራ ወጪ፣ እና አፓርታማዎች። በክፍሉ በמש"קית ת"ש በኩል ያመልክቱ።',
      },
    },
  ],
  lastReviewed: LAST_REVIEWED,
};

export const LONE_SOLDIER_FAQS: SoldierFaq[] = [
  {
    question: {
      he: "ההורים שלי בארץ אבל אין לי מהם תמיכה — אני חייל בודד?",
      en: "My parents are in Israel but give me no support — am I a lone soldier?",
      am: "ወላጆቼ በአገር ውስጥ ናቸው ግን ድጋፍ አላገኝም — ብቸኛ ወታደር ነኝ?",
    },
    answer: {
      he: 'ייתכן. הקטגוריה נקראת "חסר עורף משפחתי", והיא חלה גם כשיש קשר עם ההורים אך החייל אינו יכול לשהות אצלם והם אינם מהווים תא משפחתי תומך. זו הקטגוריה הדורשת את התיעוד הרב ביותר: דוח עובד סוציאלי, אישור יועץ בית ספר ומסמכים כלכליים. פנו למש"קית ת"ש.',
      en: "Possibly. The category is \"without family backing\", and it applies also where contact with the parents exists but the soldier cannot stay with them and they do not constitute a supportive family unit. It is the category requiring the most documentation: a social worker's report, a school counselor's statement and financial documents. Speak to your family-support NCO.",
      am: 'ሊሆን ይችላል። ምድቡ "የቤተሰብ ድጋፍ የሌለው" ይባላል፣ ከወላጆች ጋር ግንኙነት ቢኖርም ወታደሩ ከእነሱ ጋር መቆየት ካልቻለ እና ደጋፊ የቤተሰብ ክፍል ካልሆኑ ይሠራል። ብዙ ሰነድ የሚጠይቀው ምድብ ነው። ወደ מש"קית ת"ש ይሂዱ።',
    },
  },
  {
    question: {
      he: "אילו מסמכים צריך כדי להיות מוכר כחייל בודד?",
      en: "Which documents are needed for lone-soldier recognition?",
      am: "ለብቸኛ ወታደር ዕውቅና ምን ሰነዶች ያስፈልጋሉ?",
    },
    answer: {
      he: "תלוי בקטגוריה, ולעיתים קרובות — כלום. אין צורך בתיעוד כאשר ההורים ירדו מהארץ, כאשר החייל עלה לבדו, או כאשר ההורים נפטרו. תיעוד נדרש רק להורים בשליחות (אישור מהמוסד השולח עם תאריכים) ולחייל מנותק קשר.",
      en: "It depends on the category, and often — nothing. No documentation is required where the parents emigrated, where the soldier immigrated alone, or where the parents have died. Documentation is required only for parents on posting (confirmation from the sending institution with dates) and for a soldier out of contact with their parents.",
      am: "በምድቡ ይወሰናል፣ ብዙ ጊዜም — ምንም። ወላጆች ከአገር ከወጡ፣ ወታደሩ ብቻውን ከመጣ፣ ወይም ወላጆች ከሞቱ ሰነድ አያስፈልግም። ሰነድ የሚያስፈልገው በተልዕኮ ላሉ ወላጆችና ግንኙነት ለተቋረጠ ወታደር ብቻ ነው።",
    },
  },
  {
    question: {
      he: 'שמעתי על "חייל בודד מבחירה" — איך נרשמים לזה?',
      en: 'I heard about "lone soldier by choice" — how do I register for it?',
      am: '"በምርጫ ብቸኛ ወታደር" ሰምቻለሁ — እንዴት እመዘገባለሁ?',
    },
    answer: {
      he: 'לא נרשמים, כי המעמד הזה אינו קיים. הביטוי מסתובב ברשת אך אין לו בסיס בפקודות המטכ"ל. הקטגוריות המוכרות הן שלוש: בודד מובהק, חסר עורף משפחתי, ויתום. אם הקשר עם ההורים נותק — הקטגוריה הרלוונטית היא "חסר עורף משפחתי".',
      en: 'You do not, because that status does not exist. The term circulates online but has no basis in the General Staff orders. There are three recognized categories: clear-cut lone soldier, without family backing, and orphan. If contact with the parents has broken down, the relevant category is "without family backing".',
      am: 'አይመዘገቡም፣ ምክንያቱም ያ ደረጃ የለም። ቃሉ በኢንተርኔት ይዘዋወራል ግን በትዕዛዞቹ መሠረት የለውም። የታወቁት ሦስት ምድቦች ናቸው። ግንኙነት ከተቋረጠ ተገቢው ምድብ "የቤተሰብ ድጋፍ የሌለው" ነው።',
    },
  },
  {
    question: {
      he: "המשפחה שלי בארץ ובמצוקה כלכלית — מה מגיע לנו?",
      en: "My family is in Israel and in financial distress — what are we entitled to?",
      am: "ቤተሰቤ በአገር ውስጥ ነው እና በገንዘብ ተቸግሯል — ምን ይገባናል?",
    },
    answer: {
      he: 'המסלול הוא תשמ"ש — תשלומי משפחה, שנועד להבטיח את קיומה המינימלי של משפחת החייל. אפשר לבקש עבור ההורים, בן/בת זוג, ילדים, ואחים אם החייל הוא האפוטרופוס. הבקשה מוגשת למש"קית ת"ש, ויש זכות ערעור אם נדחיתם. בדקו באשף ת"ש שלנו.',
      en: "The track is תשמ\"ש — family payments, intended to secure the minimum subsistence of the soldier's family. You may request it for the parents, a spouse, children, and siblings where the soldier is their guardian. The application goes to the family-support NCO, and there is a right of appeal if rejected. Check our family-support wizard.",
      am: 'መንገዱ תשמ"ש — የቤተሰብ ክፍያዎች ነው። ለወላጆች፣ ለትዳር አጋር፣ ለልጆች እና ወታደሩ አሳዳጊ ከሆነ ለወንድሞችና እህቶች መጠየቅ ይቻላል። ማመልከቻው ለמש"קית ת"ש ይቀርባል፣ ውድቅ ከተደረገም የይግባኝ መብት አለ።',
    },
  },
  {
    question: {
      he: "כמה כסף מקבלים בפועל?",
      en: "How much money is actually received?",
      am: "በእውነት ስንት ገንዘብ ይገኛል?",
    },
    answer: {
      he: 'לא נצטט כאן סכום. המקורות הרשמיים הזמינים סותרים זה את זה לגבי אותו מענק, וחלקם אינם נושאים תאריך עדכון — ומספר שגוי כאן עלול להוביל להחלטה שגויה אצלכם. המש"קית ת"ש היא הגורם המוסמך למסור את הסכום העדכני.',
      en: "We will not quote a figure here. The available official sources contradict one another on the same grant, and some carry no update date — and a wrong number here could drive a wrong decision on your side. The family-support NCO is the authoritative source for the current amount.",
      am: 'እዚህ መጠን አንጠቅስም። የሚገኙት ኦፊሴላዊ ምንጮች ስለ አንድ ድጎማ እርስ በርስ ይጋጫሉ፣ አንዳንዶቹም የዘመነበት ቀን የላቸውም። ወቅታዊውን መጠን ለመስጠት ሥልጣን ያለው አካል የמש"קית ת"ש ናት።',
    },
  },
  {
    question: {
      he: 'אני עולה מאתיופיה — יש לי זכות נוספת מעבר למענק הצה"לי?',
      en: "I am an immigrant from Ethiopia — do I have an entitlement beyond the IDF grant?",
      am: "ከኢትዮጵያ የመጣሁ ስደተኛ ነኝ — ከጦር ኃይሉ ድጎማ በተጨማሪ መብት አለኝ?",
    },
    answer: {
      he: 'כן. "נוהל חיילים עולים" (11.186) של משרד העלייה והקליטה מגדיר את יוצאי אתיופיה כאוכלוסייה ייחודית, מבחין בין חייל שהוריו בארץ לחייל שהוריו אינם בארץ, וקובע תקופת זכאות מורחבת למענק החודשי. המענק משולם בנוסף למענק הצה"לי. בררו סכום ותקופה במוקד המשרד, 2994*.',
      en: 'Yes. The Ministry of Aliyah and Integration\'s "Immigrant Soldiers Procedure" (11.186) defines Ethiopian-Israelis as a distinct population, distinguishes a soldier whose parents are in Israel from one whose parents are not, and sets an extended eligibility period for the monthly grant. It is paid in addition to the IDF grant. Check the amount and period with the ministry hotline, *2994.',
      am: 'አዎ። የሚኒስቴሩ "የስደተኛ ወታደሮች መመሪያ" (11.186) የኢትዮጵያ ተወላጆችን እንደ ልዩ ሕዝብ ይተረጉማል፣ ወላጆቹ በአገር ውስጥ ያሉትን ከሌሉት ይለያል፣ እና የተራዘመ የብቁነት ጊዜ ይወስናል። ከጦር ኃይሉ ድጎማ በተጨማሪ ይከፈላል። መጠኑን ከ2994* ያረጋግጡ።',
    },
  },
];

export const LONE_SOLDIER_AM_SUMMARY_TITLE = "ማጠቃለያ በአማርኛ ለወላጆች — ብቸኛ ወታደር እና የቤተሰብ ድጋፍ";

export const LONE_SOLDIER_AM_SUMMARY: string[] = [
  'ለሁሉም ነገር የመጀመሪያው አድራሻ አንድ ነው: የמש"קית ת"ש — ከምዝገባ በፊት በምልመላ ጽሕፈት ቤት፣ በኋላ በክፍሉ።',
  "ብቸኛ ወታደር ማለት በአገር ውስጥ የወላጅ ድጋፍ የሌለው ወታደር ነው። ሦስት ምድቦች: ወላጆች በውጭ አገር፣ የቤተሰብ ድጋፍ የሌለው፣ እና ወላጅ አልባ።",
  "ወላጆች ከአገር ከወጡ፣ ልጅዎ ብቻውን ከመጣ፣ ወይም ወላጆች ከሞቱ — ምንም ሰነድ አያስፈልግም። ወረቀት ስለሌለ አያዘግዩ።",
  'ከምዝገባ በፊት ቅጽ 7304፤ በአገልግሎት ወቅት ቅጽ 62። ሁለቱም ከמש"קית ת"ש ጋር ይሞላሉ።',
  "ዕውቅና ካገኘ ወርሃዊው ድጎማ በራስ-ሰር ይመጣል — ተጨማሪ ማመልከቻ አያስፈልግም።",
  'ቤተሰቡ እዚህ ሆኖ በገንዘብ ከተቸገረ: መንገዱ תשמ"ש (የቤተሰብ ክፍያዎች) ነው — ለወላጆች፣ ለትዳር አጋር፣ ለልጆች።',
  'ለתשמ"ש ማምጣት: የሦስት ወር የደመወዝ ወረቀት፣ የባንክ ወረቀት፣ የመታወቂያ ቅጂ ከሰፍሕ ጋር፣ የብድር ዝርዝሮች።',
  "ውድቅ ከተደረጉ የይግባኝ መብት አለ። ተስፋ አይቁረጡ።",
  "የኢትዮጵያ ተወላጅ ወታደሮች በሚኒስቴሩ መመሪያ 11.186 እንደ ልዩ ሕዝብ ይታወቃሉ — ተጨማሪ ድጎማ አለ። 2994* ይደውሉ።",
  'የወታደር ደህንነት ማህበር እርዳታ በמש"קית ת"ש በኩል ይጠየቃል፣ በቀጥታ አይደለም። 072-2702222።',
  "የብቸኛ ወታደሮች ማዕከል 24 ሰዓት ይሠራል: 03-7375200።",
  "ይህ ውለታ አይደለም — መብት ነው። በጊዜ መጠየቅ נפקדותን እና እስርን ይከላከላል።",
];
