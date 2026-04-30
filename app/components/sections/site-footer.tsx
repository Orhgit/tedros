// Site-wide footer (Phase 3 polish).
//
// Designed to reflect what's actually live today (Phase 3 = Rights + Real
// Estate) rather than the long-term 10-pillar vision. Linking to non-existent
// routes hurts user trust and pollutes the broken-link audit.
//
// As later phases ship, move pillars from "Coming soon" → live links.

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
        <div className="grid gap-8 md:grid-cols-4">
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

          {/* Live pillars */}
          <FooterCol title={t(locale, "footer_live_heading")}>
            <FooterLink to={`${base}/rights`}>{t(locale, "nav_rights")}</FooterLink>
            <FooterLink to={`${base}/cities`}>{t(locale, "nav_listings")}</FooterLink>
            <FooterLink to={`${base}/calculator/mortgage-ethiopian-immigrants`}>
              {t(locale, "footer_mortgage_calculator")}
            </FooterLink>
          </FooterCol>

          {/* Coming-soon pillars — surfaced as plain text so users see the
              roadmap without clicking into 404s. */}
          <FooterCol title={t(locale, "footer_soon_heading")}>
            <FooterStaticItem>{t(locale, "pillar_professionals_title")}</FooterStaticItem>
            <FooterStaticItem>{t(locale, "pillar_employment_title")}</FooterStaticItem>
            <FooterStaticItem>{t(locale, "pillar_health_title")}</FooterStaticItem>
            <FooterStaticItem>{t(locale, "pillar_family_title")}</FooterStaticItem>
            <FooterStaticItem>{t(locale, "pillar_voice_title")}</FooterStaticItem>
          </FooterCol>

          {/* Project / open source */}
          <FooterCol title={t(locale, "footer_project_heading")}>
            <FooterLink to={`${base}/about`}>{t(locale, "footer_about")}</FooterLink>
            <FooterExternal href="https://github.com/Orhgit/tedros">
              {t(locale, "footer_github")}
            </FooterExternal>
            <FooterExternal href="https://github.com/Orhgit/tedros/tree/main/docs/adr">
              {t(locale, "footer_adrs")}
            </FooterExternal>
            <FooterExternal href="https://github.com/Orhgit/tedros/tree/main/docs/research">
              {t(locale, "footer_research")}
            </FooterExternal>
          </FooterCol>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t(locale, "footer_copyright", { year })}</p>
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

function FooterExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xs hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {children} <span aria-hidden="true">↗</span>
      </a>
    </li>
  );
}

function FooterStaticItem({ children }: { children: React.ReactNode }) {
  // Coming-soon pillars rendered as plain list items (not links) — looks
  // present but doesn't promise navigation that doesn't work.
  return <li className="opacity-70">{children}</li>;
}
