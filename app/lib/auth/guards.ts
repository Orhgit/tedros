import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { db } from "../db.server";
import { users } from "../db/schema/identity";
import { DEFAULT_LOCALE, isLocale, type Locale } from "../i18n/config";
import { getSession, type SessionUser } from "./auth.server";

/**
 * Per ADR-003: guards are plain functions called at the top of loaders/actions.
 * No middleware magic. Each guard either returns the resource it asserted, or
 * throws a Response (redirect) that RR7 surfaces.
 */

export type Role = "user" | "agency_member" | "agency_admin" | "admin";

const roleRank: Record<Role, number> = {
  user: 0,
  agency_member: 1,
  agency_admin: 2,
  admin: 3,
};

function localeFromRequest(request: Request): Locale {
  const segment = new URL(request.url).pathname.split("/")[1];
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export async function requireUser(request: Request): Promise<SessionUser> {
  const session = await getSession(request);
  if (!session?.user) {
    const url = new URL(request.url);
    const locale = localeFromRequest(request);
    const redirectTo = `${url.pathname}${url.search}`;
    throw redirect(`/${locale}/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }
  return session.user;
}

/**
 * Require the active user to have at least the given role.
 *
 * Role is looked up against `users.role` (per ADR-019's note that the admin
 * review surface depends on this lookup actually being wired, not just
 * shape-correct). Auth.js's session only carries `id`/`email`/`name`/`image`
 * (see `SessionUser`), so the role itself always comes from this DB read —
 * a session can't self-report its own role.
 */
export async function requireRole(
  request: Request,
  minimum: Role,
): Promise<SessionUser & { role: Role }> {
  const user = await requireUser(request);
  const [row] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);
  const userRole: Role = row?.role ?? "user";
  if (roleRank[userRole] < roleRank[minimum]) {
    throw new Response("Forbidden", { status: 403 });
  }
  return { ...user, role: userRole };
}

/**
 * Require the active user to be a member of the given agency.
 * Wired against `agency_members` once schema lands.
 */
export async function requireAgencyAccess(
  request: Request,
  _agencyId: string,
): Promise<SessionUser> {
  const user = await requireUser(request);
  return user;
}
