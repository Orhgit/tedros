// Lead email templates (HE/EN/AM).
//
// We render two messages per lead:
//   • lead-to-agency: notification → the receiving agency / admin inbox.
//   • lead-to-user (auto-reply): "we got your inquiry, expect a reply within X hours".
//
// HE is the source of truth (CLAUDE.md). EN and AM are mirrored. Plain
// HTML inline-styled — Resend free tier doesn't ship MJML and most agency
// inboxes (Gmail/Outlook) ignore <style> blocks.

import type { Locale } from "../i18n/config";
import { LOCALE_DIRECTION } from "../i18n/config";
import type { LeadSource } from "../leads/source";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export interface AgencyNotificationVars {
  locale: Locale;
  leadName: string;
  leadEmail?: string;
  leadPhone?: string;
  leadMessage?: string;
  source: LeadSource;
  // Pre-rendered absolute URL into the agency dashboard for this lead.
  dashboardUrl?: string;
}

export interface AutoReplyVars {
  locale: Locale;
  leadName: string;
  responseHours: number;
}

// Hours we tell the user to expect a reply within. ADR-005 doesn't pin this;
// 24h is the conservative default the team agreed on at TED-22 kickoff.
export const DEFAULT_AUTO_REPLY_HOURS = 24;

// --- Strings --------------------------------------------------------------

type Strings = {
  agencySubject: (vars: { sourceLabel: string }) => string;
  agencyHeading: string;
  agencyIntro: string;
  agencyName: string;
  agencyEmail: string;
  agencyPhone: string;
  agencyMessage: string;
  agencySource: string;
  agencyDashboardCta: string;
  autoReplySubject: string;
  autoReplyHeading: (name: string) => string;
  autoReplyBody: (hours: number) => string;
  autoReplySignature: string;
  // Source labels used in the "via {label}" line of the agency mail subject.
  sourceLabels: Record<LeadSource["kind"], string>;
};

const STRINGS: Record<Locale, Strings> = {
  he: {
    agencySubject: ({ sourceLabel }) => `ליד חדש מ-Tedros · ${sourceLabel}`,
    agencyHeading: "ליד חדש מהאתר",
    agencyIntro: 'התקבלה פנייה חדשה דרך טופס "אני מעוניין".',
    agencyName: "שם",
    agencyEmail: "אימייל",
    agencyPhone: "טלפון",
    agencyMessage: "הודעה",
    agencySource: "מקור",
    agencyDashboardCta: "פתחו את הליד בדאשבורד",
    autoReplySubject: "קיבלנו את פנייתך — Tedros",
    autoReplyHeading: (name) => `שלום ${name},`,
    autoReplyBody: (hours) =>
      `קיבלנו את פנייתך, נחזור אליך בתוך כ-${hours} שעות. ` +
      "אם יש לך עדכון בינתיים, אפשר להשיב למייל הזה.",
    autoReplySignature: "צוות Tedros",
    sourceLabels: {
      listing: "נכס",
      "urban-renewal": "התחדשות עירונית",
      agency: 'משרד נדל"ן',
      "mortgage-calc": "מחשבון משכנתא",
      general: "פנייה כללית",
    },
  },
  en: {
    agencySubject: ({ sourceLabel }) => `New Tedros lead · ${sourceLabel}`,
    agencyHeading: "New lead from the website",
    agencyIntro: 'A new inquiry came in through the "I\'m interested" form.',
    agencyName: "Name",
    agencyEmail: "Email",
    agencyPhone: "Phone",
    agencyMessage: "Message",
    agencySource: "Source",
    agencyDashboardCta: "Open the lead in the dashboard",
    autoReplySubject: "We got your inquiry — Tedros",
    autoReplyHeading: (name) => `Hi ${name},`,
    autoReplyBody: (hours) =>
      `Thanks for reaching out — we'll get back to you within about ${hours} hours. ` +
      "If anything changes in the meantime, just reply to this email.",
    autoReplySignature: "The Tedros team",
    sourceLabels: {
      listing: "Property",
      "urban-renewal": "Urban renewal",
      agency: "Agency",
      "mortgage-calc": "Mortgage calculator",
      general: "General inquiry",
    },
  },
  am: {
    agencySubject: ({ sourceLabel }) => `አዲስ ሊድ ከ Tedros · ${sourceLabel}`,
    agencyHeading: "ከድረ-ገጽ አዲስ ሊድ",
    agencyIntro: 'በ "ፍላጎት አለኝ" ቅጽ በኩል አዲስ ጥያቄ ደርሶናል።',
    agencyName: "ስም",
    agencyEmail: "ኢሜል",
    agencyPhone: "ስልክ",
    agencyMessage: "መልዕክት",
    agencySource: "ምንጭ",
    agencyDashboardCta: "ሊድን በዳሽቦርድ ይክፈቱ",
    autoReplySubject: "ጥያቄዎ ደርሶናል — Tedros",
    autoReplyHeading: (name) => `ሰላም ${name}፣`,
    autoReplyBody: (hours) =>
      `ስለ ጥያቄዎ እናመሰግናለን። በ ${hours} ሰዓታት ውስጥ ምላሽ እንሰጥዎታለን። ` +
      "በዚያ ጊዜ ውስጥ ለውጥ ካለ፣ ለዚህ ኢሜል መልስ ይስጡ።",
    autoReplySignature: "የ Tedros ቡድን",
    sourceLabels: {
      listing: "ንብረት",
      "urban-renewal": "የከተማ መታደስ",
      agency: "ኤጀንሲ",
      "mortgage-calc": "የብድር ካልኩሌተር",
      general: "አጠቃላይ ጥያቄ",
    },
  },
};

// --- Helpers --------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function describeSourceForBody(source: LeadSource, s: Strings): string {
  switch (source.kind) {
    case "listing":
      return `${s.sourceLabels.listing} · ${source.listingId}`;
    case "urban-renewal":
      return `${s.sourceLabels["urban-renewal"]} · ${source.slug}`;
    case "agency":
      return `${s.sourceLabels.agency} · ${source.agencyId}`;
    case "mortgage-calc":
      return s.sourceLabels["mortgage-calc"];
    case "general":
      return s.sourceLabels.general;
  }
}

// --- Renderers ------------------------------------------------------------

export function renderAgencyNotification(vars: AgencyNotificationVars): RenderedEmail {
  const s = STRINGS[vars.locale];
  const dir = LOCALE_DIRECTION[vars.locale];
  const sourceBody = describeSourceForBody(vars.source, s);
  const subject = s.agencySubject({ sourceLabel: s.sourceLabels[vars.source.kind] });

  const fields: { label: string; value: string }[] = [
    { label: s.agencyName, value: vars.leadName },
  ];
  if (vars.leadEmail) fields.push({ label: s.agencyEmail, value: vars.leadEmail });
  if (vars.leadPhone) fields.push({ label: s.agencyPhone, value: vars.leadPhone });
  if (vars.leadMessage) fields.push({ label: s.agencyMessage, value: vars.leadMessage });
  fields.push({ label: s.agencySource, value: sourceBody });

  const rowsHtml = fields
    .map(
      (f) =>
        `<tr><td style="padding:6px 12px;color:#555;width:120px;vertical-align:top"><strong>${escapeHtml(f.label)}</strong></td>` +
        `<td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(f.value)}</td></tr>`,
    )
    .join("");

  const ctaHtml = vars.dashboardUrl
    ? `<p style="margin-top:24px"><a href="${escapeHtml(vars.dashboardUrl)}" style="background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;display:inline-block">${escapeHtml(s.agencyDashboardCta)}</a></p>`
    : "";

  const html =
    `<!doctype html><html lang="${vars.locale}" dir="${dir}"><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;line-height:1.5">` +
    `<h2 style="margin:0 0 8px">${escapeHtml(s.agencyHeading)}</h2>` +
    `<p style="margin:0 0 16px;color:#444">${escapeHtml(s.agencyIntro)}</p>` +
    `<table style="border-collapse:collapse;border:1px solid #eee">${rowsHtml}</table>` +
    ctaHtml +
    `</body></html>`;

  const textLines = [
    s.agencyHeading,
    "",
    s.agencyIntro,
    "",
    ...fields.map((f) => `${f.label}: ${f.value}`),
  ];
  if (vars.dashboardUrl) {
    textLines.push("", `${s.agencyDashboardCta}: ${vars.dashboardUrl}`);
  }
  return { subject, html, text: textLines.join("\n") };
}

export function renderAutoReply(vars: AutoReplyVars): RenderedEmail {
  const s = STRINGS[vars.locale];
  const dir = LOCALE_DIRECTION[vars.locale];
  const heading = s.autoReplyHeading(vars.leadName);
  const body = s.autoReplyBody(vars.responseHours);
  const html =
    `<!doctype html><html lang="${vars.locale}" dir="${dir}"><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;line-height:1.6;max-width:560px">` +
    `<p style="margin:0 0 12px"><strong>${escapeHtml(heading)}</strong></p>` +
    `<p style="margin:0 0 12px">${escapeHtml(body)}</p>` +
    `<p style="margin:24px 0 0;color:#666">${escapeHtml(s.autoReplySignature)}</p>` +
    `</body></html>`;
  const text = [heading, "", body, "", s.autoReplySignature].join("\n");
  return { subject: s.autoReplySubject, html, text };
}
