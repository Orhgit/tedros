// /:lang/professionals/join — public self-serve "join the directory" page
// (TED-26). Shareable link: the owner posts it in community WhatsApp/
// Facebook groups; anyone can fill it in he/en/am. Submissions land in
// `professional_applications` (DB) as `pending` for manual review — see
// `app/lib/professional-applications/`.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.professionals.join";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { ProfessionalApplicationForm } from "~/components/professional-application-form";
import { CITIES } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const env = getEnv();
  return {
    locale,
    publicUrl: env.PUBLIC_URL,
    turnstileSiteKey: env.TURNSTILE_SITE_KEY ?? null,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "professional_apply_seo_title");
  const description = t(locale, "professional_apply_hero_subtitle");
  return [
    { title },
    { name: "description", content: description },
    // Public intake form — not a content page, keep it out of the index.
    { name: "robots", content: "noindex" },
    ...hreflangMeta(publicUrl, locale, "/professionals/join"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function ProfessionalsJoin({ loaderData }: Route.ComponentProps) {
  const { locale, turnstileSiteKey } = loaderData;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/professionals/join`} />
      <main id="main-content" className="container-default mx-auto max-w-xl py-10">
        <p className="text-sm font-medium text-earth-700">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>{" "}
          /{" "}
          <Link to={`/${locale}/professionals`} className="hover:underline">
            {t(locale, "professionals_breadcrumb")}
          </Link>
        </p>
        <p className="mt-3 text-sm font-medium text-earth-700">
          {t(locale, "professional_apply_hero_intro")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
          {t(locale, "professional_apply_hero_title")}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-700">
          {t(locale, "professional_apply_hero_subtitle")}
        </p>
        <div className="mt-8">
          <ProfessionalApplicationForm
            locale={locale}
            cities={CITIES}
            {...(turnstileSiteKey ? { turnstileSiteKey } : {})}
          />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
