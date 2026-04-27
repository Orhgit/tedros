// Listing detail page (TED-22 mock entry point).
// Phase 3.3 lands the real listings detail page + DB lookup; this stub
// pulls the listing id from the search query (`?id=…`) so the LeadForm
// can be exercised against a `listing:{uuid}` source pre-3.3.

import type { Route } from "./+types/$lang.listings.$city.$slug";
import { LeadForm } from "~/components/lead-form";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const url = new URL(request.url);
  const idParam = url.searchParams.get("id");
  const listingId = idParam && UUID_RE.test(idParam) ? idParam : null;
  const env = getEnv();
  return {
    locale,
    city: params.city ?? "",
    slug: params.slug ?? "",
    listingId,
    turnstileSiteKey: env.TURNSTILE_SITE_KEY ?? null,
  };
}

export default function ListingDetail({ loaderData }: Route.ComponentProps) {
  const { locale, city, slug, listingId, turnstileSiteKey } = loaderData;
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-xs tracking-wide text-gray-500 uppercase">
        {city} · {slug}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        {t(locale, "lead_form_title")}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t(locale, "lead_form_subtitle")}
      </p>
      <div className="mt-8">
        <LeadForm
          locale={locale}
          source={listingId ? { kind: "listing", listingId } : { kind: "general" }}
          {...(turnstileSiteKey ? { turnstileSiteKey } : {})}
        />
      </div>
    </main>
  );
}
