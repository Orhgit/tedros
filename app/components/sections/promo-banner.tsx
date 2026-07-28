import { useState } from "react";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

const PROMO_HREF = "https://merkaz-h.co.il/campaign/miami-residence";

// Colors sampled from merkaz-h.co.il's own campaign page so the banner
// reads as a continuation of their brand, not a generic ad strip.
export function PromoBanner({ locale }: { locale: Locale }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label={t(locale, "promo_banner_label")}
      className="relative z-40 overflow-hidden bg-[#1c2b45] text-white"
    >
      <div className="container-default flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-10 py-2.5 text-center text-sm sm:text-base">
        <span aria-hidden className="text-lg">
          🏝️
        </span>
        <span className="font-medium">
          {t(locale, "promo_banner_text")}{" "}
          <span className="font-bold text-[#deb459]">
            {t(locale, "promo_banner_price")}
          </span>
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
        onClick={() => setDismissed(true)}
        aria-label={t(locale, "promo_banner_dismiss")}
        className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" />
        </svg>
      </button>
    </div>
  );
}
