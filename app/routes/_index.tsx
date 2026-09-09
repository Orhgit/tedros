import { redirect } from "react-router";
import type { Route } from "./+types/_index";
import { rejectUnhandledWrite } from "~/lib/http/no-action";
import { DEFAULT_LOCALE } from "~/lib/i18n/config";
import { readLocaleCookie } from "~/lib/i18n/cookie.server";

export async function loader({ request }: Route.LoaderArgs) {
  const locale = (await readLocaleCookie(request)) ?? DEFAULT_LOCALE;
  return redirect(`/${locale}`, 301);
}

// `POST /` was the single most common scanner probe in the production log
// (139 hits in one window) and lands on this index route (TED-166). It is a
// locale redirect, never a form target.
export async function action(_args: Route.ActionArgs) {
  rejectUnhandledWrite(405);
}
