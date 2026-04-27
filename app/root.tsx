import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import {
  DEFAULT_LOCALE,
  LOCALE_DIRECTION,
  LOCALE_HTML_LANG,
  type Locale,
} from "./lib/i18n/config";
import { readLocaleCookie } from "./lib/i18n/cookie.server";
import "./app.css";

/**
 * Phase 1 ships with system fonts only — the @theme cascade in app.css falls
 * through to `system-ui`/`-apple-system`/etc. when Heebo/Inter aren't loaded.
 * Designer re-introduces the brand fonts in Phase 2 with self-hosting (or
 * @fontsource) + `<link rel="preload" as="font">` per ADR-005's LCP budget.
 * The previous Google Fonts <link> was render-blocking on Slow 4G and pushed
 * LCP past 2000ms in CI Lighthouse.
 */
export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.ico" }];

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const segment = url.pathname.split("/")[1];
  const fromUrl =
    segment === "he" || segment === "en" || segment === "am" ? segment : undefined;
  const cookieLocale = await readLocaleCookie(request);
  const locale: Locale = (fromUrl ?? cookieLocale ?? DEFAULT_LOCALE) as Locale;
  return { locale };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>() ?? { locale: DEFAULT_LOCALE as Locale };
  const locale = data.locale ?? DEFAULT_LOCALE;
  const dir = LOCALE_DIRECTION[locale];
  const htmlLang = LOCALE_HTML_LANG[locale];

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const title = isRouteErrorResponse(error) ? error.statusText : "Application Error";
  const message =
    isRouteErrorResponse(error) && error.data
      ? typeof error.data === "string"
        ? error.data
        : JSON.stringify(error.data)
      : error instanceof Error
        ? error.message
        : "An unexpected error occurred.";

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">{status}</h1>
      <p className="mt-2 text-lg">{title}</p>
      <pre className="mt-4 overflow-auto rounded-md bg-gray-100 p-4 text-sm dark:bg-gray-900">
        {message}
      </pre>
    </main>
  );
}
