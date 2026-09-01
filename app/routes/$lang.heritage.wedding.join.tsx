// /:lang/heritage/wedding/join — self-serve "add your business to the wedding
// & henna directory" page (TED-143). Follows `$lang.professionals.join.tsx`:
// a shareable, noindex intake page the owner can post in community WhatsApp
// and Facebook groups, submitting to the existing professional-applications
// pipeline where entries land as `pending` for manual review.
//
// Submissions are stored with a namespaced `wedding-<category>` profession, so
// supplier intake never enters the licensed-professionals directory.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.heritage.wedding.join";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WeddingSupplierForm } from "~/components/wedding-supplier-form";
import { CITIES } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { weddingJoinPath, weddingPath } from "~/lib/heritage/links";
import { ALL_WEDDING_SUPPLIER_CATEGORIES } from "~/lib/heritage/wedding-categories";
import { WEDDING_FORM_LABELS, weddingCopy } from "~/lib/heritage/wedding.server";
import { categoryName } from "~/lib/heritage/wedding-suppliers.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const env = getEnv();

  const categoryNames = Object.fromEntries(
    ALL_WEDDING_SUPPLIER_CATEGORIES.map((c) => [c, categoryName(c, locale)]),
  ) as Record<(typeof ALL_WEDDING_SUPPLIER_CATEGORIES)[number], string>;

  return {
    locale,
    publicUrl: env.PUBLIC_URL,
    turnstileSiteKey: env.TURNSTILE_SITE_KEY ?? null,
    title: weddingCopy("joinTitle", locale),
    subtitle: weddingCopy("joinSubtitle", locale),
    backToHub: weddingCopy("backToHub", locale),
    labels: {
      businessName: WEDDING_FORM_LABELS.businessName![locale],
      category: WEDDING_FORM_LABELS.category![locale],
      categoryPlaceholder: WEDDING_FORM_LABELS.categoryPlaceholder![locale],
      city: WEDDING_FORM_LABELS.city![locale],
      nationwide: WEDDING_FORM_LABELS.nationwide![locale],
      description: WEDDING_FORM_LABELS.description![locale],
      descriptionHint: WEDDING_FORM_LABELS.descriptionHint![locale],
      consent: WEDDING_FORM_LABELS.consent![locale],
      categoryNames,
    },
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, title, subtitle } = data;
  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    // Public intake form — not a content page, keep it out of the index.
    { name: "robots", content: "noindex" },
    ...hreflangMeta(publicUrl, locale, weddingJoinPath()),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function WeddingSupplierJoin({ loaderData }: Route.ComponentProps) {
  const { locale, turnstileSiteKey, title, subtitle, backToHub, labels } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${weddingJoinPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-xl py-10">
        <p className="text-sm font-medium text-earth-700">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>{" "}
          /{" "}
          <Link to={`/${locale}${weddingPath()}`} className="hover:underline">
            {backToHub}
          </Link>
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-700">{subtitle}</p>
        <div className="mt-8">
          <WeddingSupplierForm
            locale={locale}
            cities={CITIES}
            labels={labels}
            {...(turnstileSiteKey ? { turnstileSiteKey } : {})}
          />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
