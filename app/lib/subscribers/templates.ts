// Subscriber email templates (TED-25). HE/EN/AM, plain inlined HTML +
// matching plaintext part — same shape as leads/email-templates.ts. HE is
// source of truth (CLAUDE.md); EN/AM mirror.
//
// Two templates:
//   - confirmation : sent right after the visitor types their email; carries
//                    a single-use link that flips `confirmed_at`.
//   - welcome      : sent after they confirm; carries the unsubscribe token.
//
// We never render translations dynamically — the locale is picked from the
// subscribers row at send time.

import type { Locale } from "../i18n/config";
import { LOCALE_DIRECTION } from "../i18n/config";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export interface ConfirmationVars {
  locale: Locale;
  confirmUrl: string;
}

export interface WelcomeVars {
  locale: Locale;
  unsubscribeUrl: string;
}

type Strings = {
  confirmSubject: string;
  confirmHeading: string;
  confirmBody: string;
  confirmCta: string;
  confirmFootnote: string;
  welcomeSubject: string;
  welcomeHeading: string;
  welcomeBody: string;
  welcomeUnsubscribe: string;
  signature: string;
};

const STRINGS: Record<Locale, Strings> = {
  he: {
    confirmSubject: "אנא אשרו את ההרשמה — Tedros",
    confirmHeading: "ברוכים הבאים ל-Tedros",
    confirmBody:
      "תודה שנרשמתם לעדכונים. נא לאשר את כתובת האימייל שלכם בלחיצה על הכפתור למטה. הקישור חד-פעמי וייסגר אחרי השימוש.",
    confirmCta: "אישור הרשמה",
    confirmFootnote: "אם לא ביקשתם להירשם, אפשר להתעלם מהמייל הזה — לא תהיה הרשמה.",
    welcomeSubject: "ההרשמה אושרה — Tedros",
    welcomeHeading: "ההרשמה אושרה",
    welcomeBody: "תקבלו עדכונים על זכויות חדשות, נכסים, ותכניות ממשלה — ישירות לאימייל.",
    welcomeUnsubscribe: "להסרה מהרשימה — בלחיצה אחת",
    signature: "צוות Tedros",
  },
  en: {
    confirmSubject: "Please confirm your subscription — Tedros",
    confirmHeading: "Welcome to Tedros",
    confirmBody:
      "Thanks for subscribing. Please confirm your email by clicking the button below. The link is single-use and will expire after you use it.",
    confirmCta: "Confirm subscription",
    confirmFootnote:
      "If you didn't request this, you can ignore this email — no subscription will be created.",
    welcomeSubject: "Your subscription is confirmed — Tedros",
    welcomeHeading: "Subscription confirmed",
    welcomeBody:
      "You'll get updates on new rights, properties, and government programs — straight to your inbox.",
    welcomeUnsubscribe: "Unsubscribe — one click",
    signature: "The Tedros team",
  },
  am: {
    confirmSubject: "እባክዎ ምዝገባዎን ያረጋግጡ — Tedros",
    confirmHeading: "ወደ Tedros እንኳን በደህና መጡ",
    confirmBody:
      "ስለ ምዝገባዎ እናመሰግናለን። ከታች ያለውን ቁልፍ በመጫን ኢሜልዎን ያረጋግጡ። አገናኙ አንድ ጊዜ ብቻ ጥቅም ላይ ይውላል።",
    confirmCta: "ምዝገባን አረጋግጥ",
    confirmFootnote: "ምዝገባ ካልጠየቁ ይህን ኢሜል ማለፍ ይችላሉ — ምንም ምዝገባ አይፈጠርም።",
    welcomeSubject: "ምዝገባዎ ተረጋገጧል — Tedros",
    welcomeHeading: "ምዝገባ ተረጋግጧል",
    welcomeBody: "ስለ አዳዲስ መብቶች፣ ንብረቶች እና የመንግስት ፕሮግራሞች ዝመናዎችን — በቀጥታ ወደ ኢሜልዎ ይደርሱዎታል።",
    welcomeUnsubscribe: "ከዝርዝሩ ለመውጣት — በአንድ ጠቅታ",
    signature: "የ Tedros ቡድን",
  },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ctaButton(href: string, label: string): string {
  return (
    `<p style="margin:24px 0"><a href="${escapeHtml(href)}" ` +
    `style="background:#9A6B3F;color:#fff;padding:12px 24px;border-radius:6px;` +
    `text-decoration:none;display:inline-block;font-weight:500">` +
    `${escapeHtml(label)}</a></p>`
  );
}

export function renderConfirmationEmail(vars: ConfirmationVars): RenderedEmail {
  const s = STRINGS[vars.locale];
  const dir = LOCALE_DIRECTION[vars.locale];
  const html =
    `<!doctype html><html lang="${vars.locale}" dir="${dir}">` +
    `<body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">` +
    `<h2 style="margin:0 0 12px;color:#5A3A1F">${escapeHtml(s.confirmHeading)}</h2>` +
    `<p style="margin:0 0 12px">${escapeHtml(s.confirmBody)}</p>` +
    ctaButton(vars.confirmUrl, s.confirmCta) +
    `<p style="margin:0 0 12px;color:#666;font-size:14px">${escapeHtml(s.confirmFootnote)}</p>` +
    `<p style="margin:24px 0 0;color:#666">${escapeHtml(s.signature)}</p>` +
    `</body></html>`;
  const text = [
    s.confirmHeading,
    "",
    s.confirmBody,
    "",
    `${s.confirmCta}: ${vars.confirmUrl}`,
    "",
    s.confirmFootnote,
    "",
    s.signature,
  ].join("\n");
  return { subject: s.confirmSubject, html, text };
}

export function renderWelcomeEmail(vars: WelcomeVars): RenderedEmail {
  const s = STRINGS[vars.locale];
  const dir = LOCALE_DIRECTION[vars.locale];
  const html =
    `<!doctype html><html lang="${vars.locale}" dir="${dir}">` +
    `<body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">` +
    `<h2 style="margin:0 0 12px;color:#5A3A1F">${escapeHtml(s.welcomeHeading)}</h2>` +
    `<p style="margin:0 0 12px">${escapeHtml(s.welcomeBody)}</p>` +
    `<p style="margin:24px 0 0;color:#666">${escapeHtml(s.signature)}</p>` +
    `<hr style="margin:32px 0 16px;border:none;border-top:1px solid #eee" />` +
    `<p style="margin:0;color:#888;font-size:13px">` +
    `<a href="${escapeHtml(vars.unsubscribeUrl)}" style="color:#888">${escapeHtml(s.welcomeUnsubscribe)}</a>` +
    `</p>` +
    `</body></html>`;
  const text = [
    s.welcomeHeading,
    "",
    s.welcomeBody,
    "",
    s.signature,
    "",
    `${s.welcomeUnsubscribe}: ${vars.unsubscribeUrl}`,
  ].join("\n");
  return { subject: s.welcomeSubject, html, text };
}
