// /:lang/heritage/sigd — no page of its own (TED-169).
//
// The Sigd guide lives at /heritage/sigd/events-2026's parent in spirit but
// at `/heritage/events/sigd` in fact: that is the URL with the ranking
// history worth keeping, so this bare path 301s there rather than becoming a
// second, competing hub.

import { redirect } from "react-router";

import type { Route } from "./+types/$lang.heritage.sigd._index";
import { eventPath } from "~/lib/heritage/links";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  throw redirect(`/${locale}${eventPath("sigd")}`, 301);
}
