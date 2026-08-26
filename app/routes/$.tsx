import { redirect } from "react-router";
import type { Route } from "./+types/$";
import { localePrefixTarget } from "~/lib/i18n/locale-redirect";

// Root catch-all: URLs shared without a locale prefix (e.g. /rights/600k-mortgage)
// don't match any $lang.* pattern, so without this they 404 instead of landing
// on the /he equivalent (TED-118).
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const target = localePrefixTarget(url.pathname, url.search);
  if (target) throw redirect(target, 308);
  // Path already starts with a supported locale — a genuine 404, never redirect
  // (guards against /he/xyz → /he/he/xyz loops).
  throw new Response("Not Found", { status: 404 });
}

export default function CatchAll() {
  return null;
}
