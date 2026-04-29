import { data, Outlet, redirect } from "react-router";
import type { Route } from "./+types/$lang";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, LOCALE_DIRECTION } from "~/lib/i18n/config";
import { readLocaleCookie, serializeLocaleCookie } from "~/lib/i18n/cookie.server";

export async function loader({ params, request }: Route.LoaderArgs) {
  const candidate = params.lang;
  if (!isLocale(candidate)) {
    const url = new URL(request.url);
    const target = url.pathname.replace(/^\/[^/]+/, `/${DEFAULT_LOCALE}`);
    throw redirect(`${target}${url.search}`, 308);
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

export const meta: Route.MetaFunction = ({ data }) => {
  const base = data?.publicUrl ?? "http://localhost:3000";
  return [
    {
      tagName: "link",
      rel: "canonical",
      href: `${base}/${data?.locale ?? DEFAULT_LOCALE}`,
    },
    { tagName: "link", rel: "alternate", hrefLang: "he", href: `${base}/he` },
    { tagName: "link", rel: "alternate", hrefLang: "en", href: `${base}/en` },
    { tagName: "link", rel: "alternate", hrefLang: "am", href: `${base}/am` },
    { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${base}/he` },
  ];
};

export default function LocaleLayout() {
  return <Outlet />;
}
