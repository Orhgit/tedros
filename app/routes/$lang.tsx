import { data, Outlet, redirect } from "react-router";
import type { Route } from "./+types/$lang";
import { DEFAULT_LOCALE, isLocale, LOCALE_DIRECTION } from "~/lib/i18n/config";
import { serializeLocaleCookie } from "~/lib/i18n/cookie.server";

export async function loader({ params, request }: Route.LoaderArgs) {
  const candidate = params.lang;
  if (!isLocale(candidate)) {
    const url = new URL(request.url);
    const target = url.pathname.replace(/^\/[^/]+/, `/${DEFAULT_LOCALE}`);
    throw redirect(`${target}${url.search}`, 308);
  }
  const setCookie = await serializeLocaleCookie(candidate);
  return data(
    { locale: candidate, dir: LOCALE_DIRECTION[candidate] },
    {
      headers: {
        "Set-Cookie": setCookie,
        "Content-Language": candidate,
      },
    },
  );
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  return [
    { tagName: "link", rel: "canonical", href: `https://tedros.example/${locale}` },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "he",
      href: "https://tedros.example/he",
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "en",
      href: "https://tedros.example/en",
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "am",
      href: "https://tedros.example/am",
    },
    {
      tagName: "link",
      rel: "alternate",
      hrefLang: "x-default",
      href: "https://tedros.example/he",
    },
  ];
};

export default function LocaleLayout() {
  return <Outlet />;
}
