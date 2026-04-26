import { redirect } from "react-router";
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
    throw redirect(
      `/${locale}/login?redirectTo=${encodeURIComponent(redirectTo)}`,
    );
  }
  return session.user;
}

/**
 * Require the active user to have at least the given role.
 *
 * Note: the actual role lookup against `users.role` will be wired once Data lands
 * the schema. For now this is shape-correct but role defaults to "user".
 */
export async function requireRole(
  request: Request,
  minimum: Role,
): Promise<SessionUser & { role: Role }> {
  const user = await requireUser(request);
  const userRole: Role = "user";
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
