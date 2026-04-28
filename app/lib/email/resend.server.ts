// Resend transactional email (TED-21 + cost-discipline note in CLAUDE.md —
// Resend free tier 3K/mo).
//
// `sendAdminEmail` falls back to console logging if RESEND_API_KEY is unset
// so the agency-signup flow stays usable in dev/CI without an external dep.
// Returns the Resend ID (when sent) or `null` (when logged-only).

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(args: SendArgs): Promise<string | null> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "no-reply@tedros.local";
  if (!apiKey) {
    console.info("[email:dev] would send", { ...args, from });
    return null;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend send failed (${res.status}): ${body}`);
  }
  const json = (await res.json()) as { id?: string };
  return json.id ?? null;
}

export async function sendAdminAgencyPendingEmail(opts: {
  agencyName: string;
  agencyId: string;
  contactEmail: string;
  contactPhone: string;
}): Promise<string | null> {
  const adminEmail = process.env.ADMIN_NOTIFICATIONS_EMAIL ?? "admin@tedros.local";
  return sendEmail({
    to: adminEmail,
    subject: `[Tedros] New agency signup: ${opts.agencyName}`,
    html: `<p>Pending verification for <strong>${escapeHtml(opts.agencyName)}</strong>.</p>
<ul>
  <li>Agency ID: <code>${escapeHtml(opts.agencyId)}</code></li>
  <li>Contact email: <a href="mailto:${escapeHtml(opts.contactEmail)}">${escapeHtml(opts.contactEmail)}</a></li>
  <li>Contact phone: ${escapeHtml(opts.contactPhone)}</li>
</ul>`,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
