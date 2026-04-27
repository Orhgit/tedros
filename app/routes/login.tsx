import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { DEFAULT_LOCALE } from "~/lib/i18n/config";
import { readLocaleCookie } from "~/lib/i18n/cookie.server";

/**
 * Locale-aware shim: Auth.js's `pages.signIn` / `verifyRequest` / `error`
 * point here (no lang prefix) so we preserve query params from Auth.js
 * (`?status=check-email`, `?error=...`) while bouncing to the user's
 * preferred locale per ADR-004.
 */
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const locale = (await readLocaleCookie(request)) ?? DEFAULT_LOCALE;
  throw redirect(`/${locale}/login${url.search}`, 307);
}
