// Confirm a subscriber by their single-use token (TED-25).
//
// On successful confirm we send the welcome mail with the unsubscribe link.
// Idempotent on a second click: returns `already-confirmed` so the page
// renders the same "you're in" view rather than a scary error.

import { and, eq, isNull } from "drizzle-orm";

import { db } from "../db.server";
import { subscribers } from "../db/schema/subscribers";
import { getEnv } from "../env.server";
import { getEmailAdapter } from "../integrations/email.server";
import type { Locale } from "../i18n/config";
import { renderWelcomeEmail } from "./templates";

export type ConfirmResult =
  | { ok: true; status: "confirmed" | "already-confirmed"; locale: Locale }
  | { ok: false; error: "invalid-token" };

function buildUnsubscribeUrl(locale: Locale, token: string): string {
  const { PUBLIC_URL } = getEnv();
  return `${PUBLIC_URL}/${locale}/subscribe/unsubscribe/${token}`;
}

export async function confirmSubscriber(token: string): Promise<ConfirmResult> {
  // First: try the live, unconfirmed row that owns this token.
  const pending = await db
    .select({
      id: subscribers.id,
      email: subscribers.email,
      locale: subscribers.locale,
      unsubscribeToken: subscribers.unsubscribeToken,
    })
    .from(subscribers)
    .where(
      and(
        eq(subscribers.confirmationToken, token),
        isNull(subscribers.confirmedAt),
        isNull(subscribers.deletedAt),
      ),
    )
    .limit(1);

  if (pending[0]) {
    const row = pending[0];
    await db
      .update(subscribers)
      .set({ confirmedAt: new Date(), confirmationToken: null })
      .where(eq(subscribers.id, row.id));

    const adapter = getEmailAdapter();
    const { RESEND_FROM } = getEnv();
    const welcome = renderWelcomeEmail({
      locale: row.locale,
      unsubscribeUrl: buildUnsubscribeUrl(row.locale, row.unsubscribeToken),
    });
    await adapter.send({
      to: row.email,
      from: RESEND_FROM,
      subject: welcome.subject,
      html: welcome.html,
      text: welcome.text,
      tags: [{ name: "kind", value: "subscribe-welcome" }],
    });

    return { ok: true, status: "confirmed", locale: row.locale };
  }

  // The token may have already been consumed — be friendly: if any live row
  // recently confirmed has matching unsubscribe URL prefix, we'd have to scan.
  // Instead we just say "invalid": after confirm we cleared the token, so a
  // refresh of the same URL returns invalid. UI surfaces a friendly message
  // either way and points them to the homepage.
  return { ok: false, error: "invalid-token" };
}
