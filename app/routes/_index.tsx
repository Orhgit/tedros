import { redirect } from "react-router";
import type { Route } from "./+types/_index";
import { DEFAULT_LOCALE } from "~/lib/i18n/config";
import { readLocaleCookie } from "~/lib/i18n/cookie.server";

export async function loader({ request }: Route.LoaderArgs) {
  const locale = (await readLocaleCookie(request)) ?? DEFAULT_LOCALE;
  return redirect(`/${locale}`, 302);
}
