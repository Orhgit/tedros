// Send the admin "new agency pending" notification. Wraps the shared
// adapter (`integrations/email.server.ts`) so dev runs without an API key
// fall back to the mock that just logs.

import { getEnv } from "../env.server";
import { getEmailAdapter } from "../integrations/email.server";
import { renderAgencyPendingEmail } from "./admin-templates";

export interface NotifyAdminAgencyPendingInput {
  agencyName: string;
  agencyId: string;
  contactEmail: string;
  contactPhone: string;
}

export async function notifyAdminAgencyPending(
  input: NotifyAdminAgencyPendingInput,
): Promise<string | null> {
  const { ADMIN_NOTIFICATIONS_EMAIL, RESEND_FROM } = getEnv();
  const adapter = getEmailAdapter();
  const email = renderAgencyPendingEmail(input);
  const result = await adapter.send({
    to: ADMIN_NOTIFICATIONS_EMAIL,
    from: RESEND_FROM,
    subject: email.subject,
    html: email.html,
    text: email.text,
    tags: [{ name: "kind", value: "agency-pending-admin" }],
  });
  return result.id;
}
