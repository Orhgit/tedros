// Site-wide footer.
//
// User-facing only. Internal-team artifacts (GitHub source, ADRs, community
// research) live in the repo / docs — not in the public footer. The portal
// targets community members looking for rights/services, not engineers.

import { Link } from "react-router";

import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

import { Separator } from "../ui/separator";

export interface SiteFooterProps {
  locale: Locale;
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      className="mt-24 border-t border-border bg-surface text-surface-foreground"
    >
      <div className="container-default py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand + mission */}
          <div>
            <p className="font-display text-lg font-bold">
              {t(locale, "homepage_title")}
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {t(locale, "homepage_subtitle")}
            </p>
            <div aria-hidden className="flag-stripe mt-4 h-1 w-24 rounded-full" />
          </div>

          {/* Content pillars — all live */}
          <FooterCol title={t(locale, "footer_live_heading")}>
            <FooterLink to={`${base}/rights`}>{t(locale, "nav_rights")}</FooterLink>
            <FooterLink to={`${base}/careers`}>
              {t(locale, "pillar_employment_title")}
            </FooterLink>
            <FooterLink to={`${base}/health`}>
              {t(locale, "pillar_health_title")}
            </FooterLink>
            <FooterLink to={`${base}/education`}>
              {t(locale, "pillar_education_title")}
            </FooterLink>
            <FooterLink to={`${base}/heritage/events`}>
              {t(locale, "pillar_heritage_title")}
            </FooterLink>
            <FooterLink to={`${base}/news`}>{t(locale, "pillar_news_title")}</FooterLink>
            <FooterLink to={`${base}/statistics`}>
              {t(locale, "statistics_landing_title")}
            </FooterLink>
            <FooterLink to={`${base}/family`}>
              {t(locale, "pillar_family_title")}
            </FooterLink>
            <FooterLink to={`${base}/voice`}>
              {t(locale, "pillar_voice_title")}
            </FooterLink>
          </FooterCol>

          {/* Tools & directory */}
          <FooterCol title={t(locale, "footer_resources_heading")}>
            <FooterLink to={`${base}/cities`}>{t(locale, "nav_listings")}</FooterLink>
            <FooterLink to={`${base}/calculator/mortgage-ethiopian-immigrants`}>
              {t(locale, "footer_mortgage_calculator")}
            </FooterLink>
            <FooterLink to={`${base}/glossary`}>
              {t(locale, "glossary_landing_title")}
            </FooterLink>
            <FooterLink to={`${base}/orgs`}>{t(locale, "orgs_landing_title")}</FooterLink>
            <FooterLink to={`${base}/professionals`}>
              {t(locale, "professionals_landing_title")}
            </FooterLink>
            <FooterLink to={`${base}/compare`}>
              {t(locale, "comparisons_landing_title")}
            </FooterLink>
            <FooterLink to={`${base}/programs`}>
              {t(locale, "programs_landing_title")}
            </FooterLink>
          </FooterCol>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>{t(locale, "footer_copyright", { year })}</p>
            <Link
              to={`${base}/about`}
              className="rounded-xs hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t(locale, "footer_about")}
            </Link>
          </div>
          <p className="text-xs">{t(locale, "footer_made_with")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="rounded-xs hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {children}
      </Link>
    </li>
  );
}
