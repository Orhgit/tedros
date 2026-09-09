import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { rejectUnhandledWrite } from "~/lib/http/no-action";
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

// `POST /login` was the second most common scanner probe (44 hits) (TED-166).
// The sign-in form posts to `/auth/signin/google`, never to this shim, so
// nothing legitimate submits here.
export async function action(_args: Route.ActionArgs) {
  rejectUnhandledWrite(405);
}
