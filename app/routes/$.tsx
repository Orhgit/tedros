import { redirect } from "react-router";
import type { Route } from "./+types/$";
import { rejectUnhandledWrite } from "~/lib/http/no-action";
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

// Scanners POST to paths this splat swallows (/wp-admin/admin-ajax.php,
// /login, /.git/config, /graphql …). Without an `action` React Router builds
// an Error + stack trace for every one of them (TED-166). Nothing in the app
// legitimately POSTs to an unprefixed URL — every form targets its own
// locale-prefixed route — so a flat 404 is correct as well as cheap.
export async function action(_args: Route.ActionArgs) {
  rejectUnhandledWrite(404);
}

export default function CatchAll() {
  return null;
}
