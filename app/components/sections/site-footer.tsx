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
          <div>
            <p className="font-display text-lg font-bold">
              {t(locale, "homepage_title")}
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {t(locale, "homepage_subtitle")}
            </p>
          </div>
          <FooterCol title={t(locale, "nav_listings")}>
            <FooterLink to={`${base}/listings`}>{t(locale, "nav_listings")}</FooterLink>
            <FooterLink to={`${base}/listings/sale`}>מכירה</FooterLink>
            <FooterLink to={`${base}/listings/rent`}>השכרה</FooterLink>
            <FooterLink to={`${base}/listings/urban-renewal`}>התחדשות עירונית</FooterLink>
          </FooterCol>
          <FooterCol title={t(locale, "nav_rights")}>
            <FooterLink to={`${base}/rights`}>{t(locale, "nav_rights")}</FooterLink>
            <FooterLink to={`${base}/rights/housing`}>דיור</FooterLink>
            <FooterLink to={`${base}/rights/education`}>חינוך</FooterLink>
            <FooterLink to={`${base}/rights/employment`}>תעסוקה</FooterLink>
          </FooterCol>
          <FooterCol title={t(locale, "nav_professionals")}>
            <FooterLink to={`${base}/professionals`}>
              {t(locale, "nav_professionals")}
            </FooterLink>
            <FooterLink to={`${base}/articles`}>{t(locale, "nav_articles")}</FooterLink>
            <FooterLink to={`${base}/about`}>אודות</FooterLink>
            <FooterLink to={`${base}/contact`}>צור קשר</FooterLink>
          </FooterCol>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t(locale, "footer_copyright", { year })}</p>
          <div aria-hidden className="flag-stripe h-1 w-32 rounded-full" />
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
