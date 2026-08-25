import { data, Outlet, redirect } from "react-router";
import type { Route } from "./+types/$lang";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, LOCALE_DIRECTION } from "~/lib/i18n/config";
import { readLocaleCookie, serializeLocaleCookie } from "~/lib/i18n/cookie.server";
import { localePrefixTarget } from "~/lib/i18n/locale-redirect";

export async function loader({ params, request }: Route.LoaderArgs) {
  const candidate = params.lang;
  if (!isLocale(candidate)) {
    const url = new URL(request.url);
    const target = localePrefixTarget(url.pathname, url.search);
    throw redirect(target ?? `/${DEFAULT_LOCALE}`, 308);
  }
  const cookieLocale = await readLocaleCookie(request);
  const headers: HeadersInit = { "Content-Language": candidate };
  if (cookieLocale !== candidate) {
    headers["Set-Cookie"] = await serializeLocaleCookie(candidate);
  }
  // Prevent Safari (and others) from heuristically caching HTML in dev. A
  // stale cached HTML caused owner-visible "the fix didn't apply" reports
  // even after merge + reload. Production keeps default semantics.
  if (process.env.NODE_ENV !== "production") {
    headers["Cache-Control"] = "no-store, must-revalidate";
  }
  const { PUBLIC_URL } = getEnv();
  return data(
    {
      locale: candidate,
      dir: LOCALE_DIRECTION[candidate],
      publicUrl: PUBLIC_URL,
    },
    { headers },
  );
}

// Forward headers (Cache-Control, Content-Language, Set-Cookie) from the
// loader to the actual HTTP response. React Router v7 doesn't auto-merge
// loader-attached headers without an explicit `headers` export.
export const headers: Route.HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

// Canonical + hreflang for each page are owned by the leaf route (see
// `hreflangMeta` in ~/lib/i18n/hreflang.ts). This layout used to also emit
// its own canonical/hreflang pointing at the locale root, which duplicated
// (and conflicted with) the leaf route's tags on every child page — Google
// ignores or arbitrarily picks between multiple canonical tags. Leaf routes
// that intentionally skip hreflangMeta are noindex (admin/CRUD, dashboard,
// login, design, subscribe tokens) or action-only endpoints, so nothing
// needs a fallback here.

export default function LocaleLayout() {
  return <Outlet />;
}
