/**
 * One-shot backlink outreach script.
 * Sends personalised Hebrew emails to 5 partner orgs asking for a backlink
 * to the relevant Tedros section.
 *
 * Usage (on production server where .env has RESEND_API_KEY):
 *   node --env-file=.env scripts/send-backlink-outreach.mjs
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM ?? "info@tedros.co.il";
const BASE_URL = process.env.PUBLIC_URL ?? "https://tedros.co.il";

if (!RESEND_API_KEY) {
  console.error("ERROR: RESEND_API_KEY not set");
  process.exit(1);
}

const ORGS = [
  {
    name: "ENP — מיזם קהילות",
    to: "info@enp.org.il",
    targetUrl: `${BASE_URL}/he/careers`,
    targetAnchor: "מדריך קריירה יוצאי אתיופיה",
    subject: "בקשה לשיתוף פעולה — פורטל טדרוס ומיזם קהילות ENP",
    bodyHe: `שלום לצוות ENP,

אנחנו טדרוס — פורטל קהילתי חינמי שמרכז מידע, זכויות ושירותים ליוצאי אתיופיה בישראל בעברית, אנגלית ואמהרית.

בנינו מדריך קריירה מקיף שמפנה לתכניות ה-bootcamp של ENP, למשרות פתוחות ולזכויות תעסוקה — הכול במקום אחד ובשלוש שפות: ${BASE_URL}/he/careers

אנחנו מבקשים קישור לאתר שלנו מהדף הרלוונטי ב-enp.org.il — כשיתוף פעולה שיועיל לקהילה: גולשים שיגיעו אלינו ימצאו את ה-bootcamps שלכם ישירות ולהיפך.

מוכנים לשוחח ולדון בדרך הטובה ביותר לשתף פעולה.

בברכה,
צוות טדרוס
${BASE_URL}/he/about
info@tedros.co.il`,
  },
  {
    name: "טבקה — סיוע משפטי",
    to: "general@tebeka.org.il",
    targetUrl: `${BASE_URL}/he/rights`,
    targetAnchor: "מדריך זכויות יוצאי אתיופיה",
    subject: "שיתוף פעולה — מדריך זכויות טדרוס וטבקה",
    bodyHe: `שלום לצוות טבקה,

אנחנו טדרוס — פורטל קהילתי שמרכז זכויות ושירותים ליוצאי אתיופיה בישראל בשלוש שפות.

בנינו מדריך זכויות מפורט שמציין את טבקה כגוף הפנייה המרכזי לייצוג משפטי — ומפנה אליכם ישירות מכל דף זכות רלוונטי: ${BASE_URL}/he/rights

אם יש אפשרות להוסיף קישור לפורטל שלנו מ-tebeka.org.il, הדבר יעזור לאנשים שמחפשים את השירותים שלכם למצוא אתכם מהר יותר.

מוכנים לפגישה קצרה כדי לסקור את שני האתרים יחד.

בברכה,
צוות טדרוס
${BASE_URL}/he/about`,
  },
  {
    name: "תנה בריאות",
    to: "info@tene-briut.org.il",
    targetUrl: `${BASE_URL}/he/health`,
    targetAnchor: "מדריך בריאות יוצאי אתיופיה",
    subject: "שיתוף פעולה — פורטל הבריאות של טדרוס ותנה בריאות",
    bodyHe: `שלום לצוות תנה בריאות,

אנחנו טדרוס — פורטל קהילתי חינמי ליוצאי אתיופיה בישראל.

בנינו פילר בריאות מקיף שמסביר 40 מצבים בריאותיים, שירותים ותרופות — ומציין את שירותי תנה בריאות בכל עיר רלוונטית: ${BASE_URL}/he/health

מבקשים קישור לפורטל מ-tene-briut.org.il — זה יעזור לאנשים שמחפשים בריאות למצוא את השירותים שלכם דרך Google.

שמחים לסקור את שיתוף הפעולה האפשרי יחד.

בברכה,
צוות טדרוס
${BASE_URL}/he/about`,
  },
  {
    name: "עולים ביחד",
    to: "info@olim-beyahad.org.il",
    targetUrl: `${BASE_URL}/he/careers/tech`,
    targetAnchor: "קריירה בהייטק — יוצאי אתיופיה",
    subject: "שיתוף פעולה — קריירת הייטק טדרוס ועולים ביחד",
    bodyHe: `שלום לצוות עולים ביחד,

אנחנו טדרוס — פורטל קהילתי ליוצאי אתיופיה שמרכז הזדמנויות קריירה, זכויות ושירותים בשלוש שפות.

הפנינו לעולים ביחד מדפי הקריירה שלנו — ובפרט ממסלול ההייטק שמפרט את המנטורינג שלכם: ${BASE_URL}/he/careers/tech

אם אפשר להוסיף קישור לפורטל שלנו מ-olim-beyahad.org.il, נשמח. הדבר יוביל אנשים שמחפשים קריירה למצוא את התכניות שלכם ואת המידע שלנו יחד.

נשמח לדבר.

בברכה,
צוות טדרוס
${BASE_URL}/he/about`,
  },
  {
    name: 'נט"ל — מרכז טראומה',
    to: "info@natal.org.il",
    targetUrl: `${BASE_URL}/he/health/mental-health`,
    targetAnchor: "בריאות נפש — יוצאי אתיופיה",
    subject: 'שיתוף פעולה — בריאות הנפש טדרוס ונט"ל',
    bodyHe: `שלום לצוות נט"ל,

אנחנו טדרוס — פורטל קהילתי שמרכז מידע ושירותים ליוצאי אתיופיה בישראל, כולל פרק מקיף על בריאות הנפש.

מציינים את נט"ל (1201) בדפי הבריאות שלנו כגוף המרכזי לטיפול בטראומה ו-PTSD ללא צורך בהפניה: ${BASE_URL}/he/health/mental-health

אם אפשר להוסיף קישור לפורטל שלנו מ-natal.org.il — הדבר יעזור לאנשים בקהילה למצוא את השירות שלכם מהר יותר.

תודה מראש,
צוות טדרוס
${BASE_URL}/he/about`,
  },
];

async function sendEmail({ to, subject, bodyHe }) {
  const html = `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#222;max-width:600px">
    ${bodyHe.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>").replace(/^/, "<p>").replace(/$/, "</p>")}
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      html,
      text: bodyHe,
      tags: [{ name: "campaign", value: "backlink-outreach-2026" }],
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Resend error ${res.status}: ${JSON.stringify(body)}`);
  }
  return body.id;
}

console.log(`Sending outreach to ${ORGS.length} organizations from ${FROM}...\n`);

for (const org of ORGS) {
  try {
    const id = await sendEmail(org);
    console.log(`  ✓  ${org.name} <${org.to}> — id: ${id}`);
  } catch (err) {
    console.error(`  ✗  ${org.name} <${org.to}> — ${err.message}`);
  }
  // 500ms between sends — respect rate limits
  await new Promise((r) => setTimeout(r, 500));
}

console.log("\nDone.");
