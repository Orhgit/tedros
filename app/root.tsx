import { lazy, Suspense } from "react";
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
import { getEnv } from "./lib/env.server";
import { AccessibilityWidget } from "./components/ui/accessibility-widget";
import { PromoBanner } from "./components/sections/promo-banner";
import "./app.css";

const MulaChat = lazy(() =>
  import("./components/mula-chat").then((m) => ({ default: m.MulaChat })),
);

/**
 * Phase 1 ships with system fonts only — the @theme cascade in app.css falls
 * through to `system-ui`/`-apple-system`/etc. when Heebo/Inter aren't loaded.
 * Designer re-introduces the brand fonts in Phase 2 with self-hosting (or
 * @fontsource) + `<link rel="preload" as="font">` per ADR-005's LCP budget.
 * The previous Google Fonts <link> was render-blocking on Slow 4G and pushed
 * LCP past 2000ms in CI Lighthouse.
 */
export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const segment = url.pathname.split("/")[1];
  const fromUrl =
    segment === "he" || segment === "en" || segment === "am" ? segment : undefined;
  const cookieLocale = await readLocaleCookie(request);
  const locale: Locale = (fromUrl ?? cookieLocale ?? DEFAULT_LOCALE) as Locale;
  const { GA_MEASUREMENT_ID } = getEnv();
  return { locale, gaId: GA_MEASUREMENT_ID ?? null };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>() ?? {
    locale: DEFAULT_LOCALE as Locale,
    gaId: null,
  };
  const locale = data.locale ?? DEFAULT_LOCALE;
  const gaId = data.gaId ?? null;
  const dir = LOCALE_DIRECTION[locale];
  const htmlLang = LOCALE_HTML_LANG[locale];

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="google-site-verification" content="2279d081ccbfa4c2" />
        <Meta />
        <Links />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen antialiased">
        <PromoBanner locale={locale} />
        {children}
        <Suspense fallback={null}>
          <MulaChat />
        </Suspense>
        <AccessibilityWidget locale={locale} />
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
  const isRouteError = isRouteErrorResponse(error);
  const status = isRouteError ? error.status : 500;
  // Locale fallback: ErrorBoundary may run before the layout's loader data
  // has populated, so we default to HE per ADR-002.
  const locale: Locale = "he";

  // Friendly copy per common status. Anything else falls through to a
  // generic "something went wrong" message — we intentionally don't
  // surface raw error.data / stack to public visitors (raw payload was
  // leaking serialized loader errors before this).
  const COPY: Record<
    string,
    { title: string; body: string; primaryHref: string; primaryLabel: string }
  > = {
    "404-he": {
      title: "הדף לא נמצא",
      body: "הקישור הזה לא קיים, או שהוא הוסר. אפשר לחזור לעמוד הבית או לעבור ישירות לזכויות.",
      primaryHref: "/he",
      primaryLabel: "חזרה לעמוד הבית",
    },
    "404-en": {
      title: "Page not found",
      body: "This link doesn't exist or has been removed. Head back home, or jump to the rights catalog.",
      primaryHref: "/en",
      primaryLabel: "Back to homepage",
    },
    "404-am": {
      title: "ገጹ አልተገኘም",
      body: "ይህ አገናኝ የለም ወይም ተወግዷል። ወደ መነሻ ገጹ ይመለሱ ወይም ወደ መብቶች ካታሎግ ይዝለሉ።",
      primaryHref: "/am",
      primaryLabel: "ወደ መነሻ ገጽ",
    },
    "500-he": {
      title: "משהו השתבש",
      body: "תקלה זמנית בצד שלנו. נסו לרענן את הדף, ואם זה ממשיך — דווחו לנו ב-GitHub.",
      primaryHref: "/he",
      primaryLabel: "חזרה לעמוד הבית",
    },
    "500-en": {
      title: "Something went wrong",
      body: "Temporary issue on our side. Try refreshing the page; if it persists, file an issue on GitHub.",
      primaryHref: "/en",
      primaryLabel: "Back to homepage",
    },
    "500-am": {
      title: "የሆነ ነገር ተበላሸ",
      body: "በእኛ በኩል ጊዜያዊ ችግር። ገጹን እንደገና ለመጫን ይሞክሩ።",
      primaryHref: "/am",
      primaryLabel: "ወደ መነሻ ገጽ",
    },
  };

  const key = `${status}-${locale}` in COPY ? `${status}-${locale}` : `500-${locale}`;
  const c = COPY[key]!;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <div className="container-default mx-auto max-w-2xl py-16 sm:py-24">
        <p className="font-display text-6xl font-bold tracking-tight text-earth-700 sm:text-7xl">
          {status}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">{c.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={c.primaryHref}
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700"
          >
            {c.primaryLabel}
          </a>
          {status === 404 && (
            <a
              href={`/${locale}/rights`}
              className="inline-flex items-center rounded-md border border-earth-300 px-5 py-2.5 text-base font-medium text-earth-900 transition hover:bg-earth-50"
            >
              {locale === "he" ? "זכויות" : locale === "en" ? "Rights" : "መብቶች"}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
