import { ALL_HEALTH_CONDITIONS } from "~/lib/health/categories";
import { getEnv } from "~/lib/env.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * Health sitemap — hub pages + all 40 health conditions.
 * ~46 paths × 3 locales = ~138 URLs.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const paths = [
    "/health/conditions",
    ...ALL_HEALTH_CONDITIONS.map((c) => `/health/conditions/${c}`),
    "/health/mental-health",
    "/health/mental-health/interpreter",
    "/health/mental-health/hospitalization-rights",
    "/health/mental-health/culturally-competent-care",
    "/health/services",
    "/health/rights",
    "/health/traditional-medicine",
    "/health/nutrition",
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths));
}
