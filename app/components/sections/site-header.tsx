import { Link } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { LangSwitcher } from "../ui/lang-switcher";
import { NavMenu } from "../ui/nav-menu";

export interface SiteHeaderProps {
  locale: Locale;
  currentPath?: string;
  user?: { name: string } | null;
}

export function SiteHeader({ locale, currentPath = "", user = null }: SiteHeaderProps) {
  const base = `/${locale}`;
  const items = [
    { href: `${base}/listings`, label: t(locale, "nav_listings") },
    { href: `${base}/rights`, label: t(locale, "nav_rights") },
    { href: `${base}/professionals`, label: t(locale, "nav_professionals") },
    { href: `${base}/articles`, label: t(locale, "nav_articles") },
  ].map((i) => ({ ...i, current: currentPath.startsWith(i.href) }));

  // Switch to other locale, preserving the rest of the path.
  const hrefForLocale = (next: Locale) => {
    if (!currentPath || currentPath === "/") return `/${next}`;
    const parts = currentPath.split("/").filter(Boolean);
    parts[0] = next;
    return `/${parts.join("/")}`;
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-(--z-sticky) border-b border-border bg-background/85 backdrop-blur-md"
    >
      <a href="#main-content" className="sr-skip">
        {t(locale, "nav_home")}
      </a>
      <div className="container-default flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            to={base}
            className="flex items-center gap-2 rounded-xs font-display text-xl font-bold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <span aria-hidden className="size-2.5 rounded-full bg-primary" />
            <span>{t(locale, "homepage_title")}</span>
          </Link>
          <div className="hidden md:block">
            <NavMenu items={items} ariaLabel={t(locale, "nav_home")} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LangSwitcher
            current={locale}
            hrefFor={hrefForLocale}
            className="hidden sm:inline-flex"
          />
          {user ? (
            <Button asChild variant="outline" size="sm">
              <Link to={`${base}/dashboard`}>{user.name}</Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to={`${base}/login`}>{t(locale, "nav_login")}</Link>
            </Button>
          )}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
            aria-label="תפריט"
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </header>
  );
}
