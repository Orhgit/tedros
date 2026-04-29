// Subscriber signup → DB persist + confirmation email (TED-25).
//
// Behavior matrix on resubmit:
//   - new email                    → INSERT row, send confirmation
//   - existing, unconfirmed        → rotate confirmation_token, send fresh
//                                    confirmation (covers lost emails)
//   - existing, confirmed          → no-op, idempotent success (don't leak
//                                    "you're already subscribed" to scrapers)
//   - existing, soft-deleted (prev unsubscribed) → INSERT fresh row; the old
//                                    row is preserved for audit
//
// Locale follows the request — we don't override what's already on file
// because the user might have switched browsers.

import { randomUUID } from "node:crypto";

import { and, eq, isNull } from "drizzle-orm";

import { db } from "../db.server";
import { subscribers } from "../db/schema/subscribers";
import { getEnv } from "../env.server";
import { getEmailAdapter } from "../integrations/email.server";
import type { Locale } from "../i18n/config";
import { renderConfirmationEmail } from "./templates";

export interface SubmitSubscriberInput {
  email: string;
  locale: Locale;
}

export type SubmitSubscriberResult =
  | { ok: true; status: "pending" | "already-confirmed" }
  | { ok: false; error: "rate-limited" };

// Build absolute URL into the confirmation route. We include locale in the
// path so the confirm page renders in the user's language.
function buildConfirmUrl(locale: Locale, token: string): string {
  const { PUBLIC_URL } = getEnv();
  return `${PUBLIC_URL}/${locale}/subscribe/confirm/${token}`;
}

export async function submitSubscriber(
  input: SubmitSubscriberInput,
): Promise<SubmitSubscriberResult> {
  const existing = await db
    .select({
      id: subscribers.id,
      confirmedAt: subscribers.confirmedAt,
      deletedAt: subscribers.deletedAt,
    })
    .from(subscribers)
    .where(and(eq(subscribers.email, input.email), isNull(subscribers.deletedAt)))
    .limit(1);

  const adapter = getEmailAdapter();
  const { RESEND_FROM } = getEnv();

  // existing-confirmed → idempotent.
  if (existing[0]?.confirmedAt) {
    return { ok: true, status: "already-confirmed" };
  }

  // existing-unconfirmed → rotate token + resend.
  if (existing[0]) {
    const newToken = randomUUID();
    await db
      .update(subscribers)
      .set({ confirmationToken: newToken, locale: input.locale })
      .where(eq(subscribers.id, existing[0].id));

    const email = renderConfirmationEmail({
      locale: input.locale,
      confirmUrl: buildConfirmUrl(input.locale, newToken),
    });
    await adapter.send({
      to: input.email,
      from: RESEND_FROM,
      subject: email.subject,
      html: email.html,
      text: email.text,
      tags: [{ name: "kind", value: "subscribe-confirm" }],
    });
    return { ok: true, status: "pending" };
  }

  // new (or previously-soft-deleted) → INSERT.
  const confirmationToken = randomUUID();
  const unsubscribeToken = randomUUID();
  await db.insert(subscribers).values({
    email: input.email,
    locale: input.locale,
    confirmationToken,
    unsubscribeToken,
  });

  const email = renderConfirmationEmail({
    locale: input.locale,
    confirmUrl: buildConfirmUrl(input.locale, confirmationToken),
  });
  await adapter.send({
    to: input.email,
    from: RESEND_FROM,
    subject: email.subject,
    html: email.html,
    text: email.text,
    tags: [{ name: "kind", value: "subscribe-confirm" }],
  });
  return { ok: true, status: "pending" };
}
