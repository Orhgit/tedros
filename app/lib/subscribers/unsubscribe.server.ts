// Unsubscribe a subscriber by their permanent unsubscribe token (TED-25).
//
// Soft-delete (sets deleted_at) — keeps audit trail and lets the same email
// re-subscribe later from the homepage form.

import { and, eq, isNull } from "drizzle-orm";

import { db } from "../db.server";
import { subscribers } from "../db/schema/subscribers";
import type { Locale } from "../i18n/config";

export type UnsubscribeResult =
  | { ok: true; locale: Locale }
  | { ok: false; error: "invalid-token" };

export async function unsubscribeSubscriber(token: string): Promise<UnsubscribeResult> {
  const row = await db
    .select({ id: subscribers.id, locale: subscribers.locale })
    .from(subscribers)
    .where(and(eq(subscribers.unsubscribeToken, token), isNull(subscribers.deletedAt)))
    .limit(1);

  if (!row[0]) return { ok: false, error: "invalid-token" };

  await db
    .update(subscribers)
    .set({ deletedAt: new Date() })
    .where(eq(subscribers.id, row[0].id));

  return { ok: true, locale: row[0].locale };
}
