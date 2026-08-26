import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

const PROMO_HREF = "https://merkaz-h.co.il/campaign/miami-residence";

// Owner-confirmed campaign (TED-121): the banner and its merkaz-h target are
// intentional. Bump the key when the campaign changes so a new campaign
// reappears for users who dismissed the old one.
const DISMISS_KEY = "promo-dismissed:miami-residence";

// Never show an investment ad above crisis content — it undermines trust at
// the exact moment a visitor needs the site most (TED-121).
const SENSITIVE_PATHS = [
  "/family/domestic-violence",
  "/health/mental-health",
  "/voice/racism-report",
];

// Colors sampled from merkaz-h.co.il's own campaign page so the banner
// reads as a continuation of their brand, not a generic ad strip.
export function PromoBanner({ locale }: { locale: Locale }) {
  const [dismissed, setDismissed] = useState(false);
  const { pathname } = useLocation();

  // localStorage is read after hydration (SSR has no window) — a previously
  // dismissed banner flashes briefly, then hides for good.
  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      // storage unavailable (private mode) — banner just stays dismissible per page
    }
  }, []);

  if (dismissed) return null;
  if (SENSITIVE_PATHS.some((p) => pathname.includes(p))) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // best effort
    }
  };

  return (
    <div
      role="region"
      aria-label={t(locale, "promo_banner_label")}
      className="relative z-40 overflow-hidden bg-[#1c2b45] text-white"
    >
      <div className="container-default flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 ps-10 pe-12 text-center text-sm sm:text-base">
        <span aria-hidden className="text-lg">
          🏝️
        </span>
        <span className="font-medium">{t(locale, "promo_banner_text")}</span>
        <span className="rounded-full bg-[#deb459] px-2.5 py-0.5 text-sm font-extrabold whitespace-nowrap text-[#1c2b45] shadow-sm">
          {t(locale, "promo_banner_price")}
        </span>
        <a
          href={PROMO_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-[#25d366] px-3 py-1 text-sm font-bold text-[#0b3320] shadow-sm transition hover:bg-[#1fbd5a]"
        >
          {t(locale, "promo_banner_cta")}
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t(locale, "promo_banner_dismiss")}
        className="absolute end-1.5 top-1.5 rounded-full p-1.5 text-lg leading-none text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:end-2 sm:top-1/2 sm:-translate-y-1/2"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
