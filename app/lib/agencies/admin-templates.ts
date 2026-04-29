// Internal admin notification when an agency hits "pending" — sent only
// once per signup (TED-21). HE only: the recipient is the Tedros admin
// inbox, so we don't translate. Plain HTML with inline styles for Gmail.

interface AgencyPendingVars {
  agencyName: string;
  agencyId: string;
  contactEmail: string;
  contactPhone: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderAgencyPendingEmail(vars: AgencyPendingVars): RenderedEmail {
  const subject = `[Tedros] New agency signup: ${vars.agencyName}`;
  const html =
    `<!doctype html><html lang="he" dir="rtl"><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;line-height:1.5">` +
    `<p>Pending verification for <strong>${escapeHtml(vars.agencyName)}</strong>.</p>` +
    `<ul>` +
    `<li>Agency ID: <code>${escapeHtml(vars.agencyId)}</code></li>` +
    `<li>Contact email: <a href="mailto:${escapeHtml(vars.contactEmail)}">${escapeHtml(vars.contactEmail)}</a></li>` +
    `<li>Contact phone: ${escapeHtml(vars.contactPhone)}</li>` +
    `</ul>` +
    `</body></html>`;
  const text = [
    `Pending verification for ${vars.agencyName}.`,
    "",
    `Agency ID: ${vars.agencyId}`,
    `Contact email: ${vars.contactEmail}`,
    `Contact phone: ${vars.contactPhone}`,
  ].join("\n");
  return { subject, html, text };
}
