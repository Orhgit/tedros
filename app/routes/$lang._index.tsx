import { Link } from "react-router";
import type { Route } from "./+types/$lang._index";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  return { locale, year: new Date().getFullYear() };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const title = t(locale, "homepage_title");
  const description = t(locale, "homepage_subtitle");
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { locale, year } = loaderData;

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">
          {t(locale, "homepage_title")}
        </h1>
        <nav className="flex gap-3 text-sm" aria-label={t(locale, "lang_switcher_label")}>
          <Link to="/he" hrefLang="he" className="rounded px-2 py-1 hover:bg-gray-100">
            {t(locale, "lang_he")}
          </Link>
          <Link to="/en" hrefLang="en" className="rounded px-2 py-1 hover:bg-gray-100">
            {t(locale, "lang_en")}
          </Link>
          <Link to="/am" hrefLang="am" className="rounded px-2 py-1 hover:bg-gray-100">
            {t(locale, "lang_am")}
          </Link>
        </nav>
      </header>

      <main className="mt-12 flex-1">
        <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          {t(locale, "homepage_subtitle")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {t(locale, "homepage_intro")}
        </p>

        <div className="mt-10 flex gap-3">
          <Link
            to={`/${locale}/login`}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {t(locale, "nav_login")}
          </Link>
          <Link
            to={`/${locale}/dashboard`}
            className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            {t(locale, "nav_dashboard")}
          </Link>
        </div>
      </main>

      <footer className="mt-16 border-t border-gray-200 pt-6 text-sm text-gray-500 dark:border-gray-800">
        {t(locale, "footer_copyright", { year })}
      </footer>
    </div>
  );
}
