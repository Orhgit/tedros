// Copy for /:lang/privacy — SERVER ONLY (ADR-020).
//
// The privacy policy in three locales. The loader picks the one locale being
// rendered and returns it as `content`; the component and `meta` both read it
// off loader data. `meta` may not import this module — it is not stripped
// from the client build and the build fails outright.

import type { Locale } from "~/lib/i18n/config";

const CONTACT_EMAIL = "info@tedros.co.il";

export interface PrivacySection {
  heading: string;
  paragraphs: string[];
}

export interface PrivacyContent {
  title: string;
  metaDescription: string;
  updatedLabel: string;
  intro: string;
  sections: PrivacySection[];
}

const CONTENT: Record<Locale, PrivacyContent> = {
  he: {
    title: "מדיניות פרטיות",
    metaDescription:
      "איזה מידע טדרוס אוסף, למה הוא משמש, איך הוא נשמר ואיך מבקשים עיון או מחיקה.",
    updatedLabel: "עודכן לאחרונה",
    intro:
      "טדרוס (tedros.co.il) הוא פורטל מידע וקהילה ליוצאי אתיופיה בישראל. אנחנו אוספים כמה שפחות מידע אישי — רק מה שנדרש כדי לחזור אליכם כשביקשתם זאת.",
    sections: [
      {
        heading: "איזה מידע נאסף",
        paragraphs: [
          "טפסי פנייה (ליד): שם, טלפון ו/או אימייל, והודעה חופשית אם כתבתם. נשלח רק כשאתם לוחצים על כפתור השליחה.",
          "הרשמה לעדכונים: כתובת אימייל, שנשמרת רק לאחר אישור בקישור שנשלח אליכם.",
          "הצטרפות למאגר אנשי המקצוע: הפרטים שמילאתם בטופס ההצטרפות (שם, מקצוע, טלפון, אימייל, אזורי פעילות, מספר רישיון אם בחרתם).",
          "מידע טכני: האתר שומר עוגייה (cookie) אחת של העדפת שפה. אין באתר פיקסלים פרסומיים ואין העברת מידע לרשתות חברתיות.",
        ],
      },
      {
        heading: "למה המידע משמש",
        paragraphs: [
          "פניות (לידים) משמשות אך ורק כדי לחזור אליכם בנושא שביקשתם — למשל חיבור ליועץ משכנתאות או לאיש מקצוע מהקהילה.",
          "כתובת האימייל ברשימת העדכונים משמשת לשליחת עדכוני תוכן של טדרוס בלבד. אפשר להסיר את עצמכם בכל רגע בקישור ההסרה שבכל הודעה.",
          "אנחנו לא מוכרים מידע אישי ולא מעבירים אותו לגורמי פרסום.",
        ],
      },
      {
        heading: "שיתוף עם צדדים שלישיים",
        paragraphs: [
          "כשפנייה מבקשת חיבור לאיש מקצוע או לארגון, הפרטים שמסרתם מועברים לגורם הרלוונטי בלבד — זו מטרת הפנייה.",
          "שליחת אימיילים מתבצעת דרך ספק תשתית (Resend). מדידת שימוש באתר נעשית בכלים ששומרים על פרטיות, ללא זיהוי אישי.",
        ],
      },
      {
        heading: "אחסון ואבטחה",
        paragraphs: [
          "המידע נשמר בבסיס נתונים בשרת ייעודי של הפרויקט, עם גישה מוגבלת לצוות התפעול בלבד, ומוצפן בתעבורה (HTTPS).",
          "פניות נשמרות כל עוד הן נדרשות לטיפול, ונמחקות לפי בקשה.",
        ],
      },
      {
        heading: "הזכויות שלכם",
        paragraphs: [
          `אפשר לבקש לעיין במידע שנאסף עליכם, לתקן אותו או למחוק אותו לגמרי — כתבו לנו ל-${CONTACT_EMAIL} ונטפל בבקשה בהקדם.`,
          "הסרה מרשימת העדכונים אפשרית בכל רגע דרך קישור ההסרה שבתחתית כל אימייל.",
        ],
      },
      {
        heading: "יצירת קשר",
        paragraphs: [
          `לשאלות על מדיניות זו: ${CONTACT_EMAIL}. אם נעדכן את המדיניות, התאריך שבראש העמוד יתעדכן בהתאם.`,
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    metaDescription:
      "What information Tedros collects, what it is used for, how it is stored, and how to request access or deletion.",
    updatedLabel: "Last updated",
    intro:
      "Tedros (tedros.co.il) is an information and community portal for Ethiopian Israelis. We collect as little personal information as possible — only what is needed to get back to you when you asked us to.",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "Contact (lead) forms: name, phone and/or email, and a free-text message if you wrote one. Sent only when you press the submit button.",
          "Updates subscription: your email address, stored only after you confirm via the link we send you.",
          "Professional directory applications: the details you filled in (name, profession, phone, email, service regions, license number if you chose to share it).",
          "Technical: the site stores a single cookie for your language preference. There are no advertising pixels and no data sharing with social networks.",
        ],
      },
      {
        heading: "How it is used",
        paragraphs: [
          "Leads are used solely to get back to you about what you asked for — for example connecting you with a mortgage advisor or a professional from the community.",
          "The updates list is used for Tedros content updates only. You can unsubscribe at any time using the link in every email.",
          "We do not sell personal information and do not pass it to advertisers.",
        ],
      },
      {
        heading: "Sharing with third parties",
        paragraphs: [
          "When your request asks to be connected with a professional or organization, the details you provided are passed to that party only — that is the purpose of the request.",
          "Emails are delivered through an infrastructure provider (Resend). Site usage is measured with privacy-preserving tools, without personal identification.",
        ],
      },
      {
        heading: "Storage and security",
        paragraphs: [
          "Data is stored in a database on the project's own server, with access limited to the operating team, and encrypted in transit (HTTPS).",
          "Leads are kept as long as they are needed for handling, and deleted on request.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `You can ask to see the information collected about you, correct it, or delete it entirely — write to ${CONTACT_EMAIL} and we will handle the request promptly.`,
          "You can leave the updates list at any moment via the unsubscribe link at the bottom of every email.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `Questions about this policy: ${CONTACT_EMAIL}. If the policy changes, the date at the top of this page will be updated.`,
        ],
      },
    ],
  },
  am: {
    title: "የግላዊነት ፖሊሲ",
    metaDescription:
      "ቴድሮስ ምን መረጃ እንደሚሰበስብ፣ ለምን እንደሚጠቀምበት፣ እንዴት እንደሚያከማች እና መረጃ ማየት ወይም መሰረዝ እንዴት እንደሚጠየቅ።",
    updatedLabel: "መጨረሻ የተዘመነው",
    intro:
      "ቴድሮስ (tedros.co.il) ለኢትዮጵያውያን እስራኤላውያን የመረጃ እና የማህበረሰብ ፖርታል ነው። የግል መረጃ በተቻለ መጠን በትንሹ እንሰበስባለን — እርስዎ ሲጠይቁን ብቻ ለመመለስ የሚያስፈልገውን።",
    sections: [
      {
        heading: "ምን እንሰበስባለን",
        paragraphs: [
          "የመገናኛ (ሊድ) ቅጾች፦ ስም፣ ስልክ እና/ወይም ኢሜይል፣ እና ከጻፉ ነጻ መልእክት። የመላኪያ አዝራሩን ሲጫኑ ብቻ ይላካል።",
          "የዝማኔ ምዝገባ፦ የኢሜይል አድራሻዎ፣ በላክንልዎ አገናኝ ካረጋገጡ በኋላ ብቻ ይቀመጣል።",
          "የባለሙያዎች ማውጫ ማመልከቻ፦ በቅጹ የሞሉት ዝርዝሮች (ስም፣ ሙያ፣ ስልክ፣ ኢሜይል፣ የአገልግሎት አካባቢዎች፣ ከመረጡ የፈቃድ ቁጥር)።",
          "ቴክኒካዊ፦ ጣቢያው ለቋንቋ ምርጫዎ አንድ ኩኪ ብቻ ያስቀምጣል። የማስታወቂያ ፒክስሎች የሉም፣ ለማህበራዊ አውታረ መረቦችም መረጃ አይተላለፍም።",
        ],
      },
      {
        heading: "ለምን እንጠቀምበታለን",
        paragraphs: [
          "ሊዶች ስለጠየቁት ጉዳይ ብቻ ለመመለስ ያገለግላሉ — ለምሳሌ ከሞርጌጅ አማካሪ ወይም ከማህበረሰቡ ባለሙያ ጋር ለማገናኘት።",
          "የዝማኔ ዝርዝሩ ለቴድሮስ የይዘት ዝማኔዎች ብቻ ያገለግላል። በእያንዳንዱ ኢሜይል ውስጥ ባለው አገናኝ በማንኛውም ጊዜ መውጣት ይችላሉ።",
          "የግል መረጃ አንሸጥም፣ ለማስታወቂያ አካላትም አናስተላልፍም።",
        ],
      },
      {
        heading: "ከሶስተኛ ወገኖች ጋር ማጋራት",
        paragraphs: [
          "ጥያቄዎ ከባለሙያ ወይም ከድርጅት ጋር መገናኘትን ሲጠይቅ፣ የሰጡት ዝርዝሮች ለዚያ አካል ብቻ ይተላለፋሉ — ይህ የጥያቄው ዓላማ ነው።",
          "ኢሜይሎች በመሠረተ ልማት አቅራቢ (Resend) በኩል ይላካሉ። የጣቢያ አጠቃቀም ግላዊነትን በሚጠብቁ መሣሪያዎች፣ ያለ ግላዊ መለያ ይለካል።",
        ],
      },
      {
        heading: "ማከማቻ እና ደህንነት",
        paragraphs: [
          "መረጃው በፕሮጀክቱ የራሱ አገልጋይ ላይ ባለ የውሂብ ጎታ ውስጥ ይቀመጣል፣ መዳረሻው ለአስተዳደር ቡድኑ ብቻ የተገደበ ነው፣ በመተላለፊያም የተመሰጠረ ነው (HTTPS)።",
          "ሊዶች ለአያያዝ እስከሚያስፈልጉ ድረስ ይቀመጣሉ፣ በጥያቄም ይሰረዛሉ።",
        ],
      },
      {
        heading: "መብቶችዎ",
        paragraphs: [
          `ስለእርስዎ የተሰበሰበውን መረጃ ማየት፣ ማስተካከል ወይም ሙሉ በሙሉ መሰረዝ መጠየቅ ይችላሉ — ወደ ${CONTACT_EMAIL} ይጻፉ፣ ጥያቄውን በፍጥነት እናስተናግዳለን።`,
          "በእያንዳንዱ ኢሜይል ግርጌ ባለው አገናኝ በማንኛውም ጊዜ ከዝማኔ ዝርዝሩ መውጣት ይችላሉ።",
        ],
      },
      {
        heading: "አግኙን",
        paragraphs: [
          `ስለዚህ ፖሊሲ ጥያቄዎች፦ ${CONTACT_EMAIL}። ፖሊሲው ከተቀየረ በገጹ አናት ያለው ቀን ይዘመናል።`,
        ],
      },
    ],
  },
};

export function privacyContent(locale: Locale): PrivacyContent {
  return CONTENT[locale] ?? CONTENT.he;
}
