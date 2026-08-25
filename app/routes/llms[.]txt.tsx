import { getEnv } from "~/lib/env.server";

/**
 * Resource route — `/llms.txt`. No default export, only loader.
 * Informal standard AI agents (ChatGPT, Perplexity, Claude) increasingly read
 * to understand a site's purpose and find its authoritative pages, without
 * having to crawl and infer it from HTML. See app/routes/robots[.]txt.tsx for
 * the crawler-facing counterpart.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();
  const body = `# Tedros

> Tedros is a Hebrew-first (also available in English and Amharic) information
> portal for the Ethiopian-Israeli community: rights, benefits, careers,
> health, education, and family/immigration guidance.

Every factual claim on Tedros is sourced from primary references — Israeli
government bodies (gov.il), the Central Bureau of Statistics (הלמ״ס), the
National Insurance Institute (ביטוח לאומי), and similar authorities. We do not
publish estimated or unsourced statistics about the community.

## Key sections

- ${PUBLIC_URL}/he/rights — Rights and benefits catalog
- ${PUBLIC_URL}/he/careers — Careers, jobs, and affirmative action
- ${PUBLIC_URL}/he/health — Health rights and conditions
- ${PUBLIC_URL}/he/education — Education and scholarships
- ${PUBLIC_URL}/he/family — Family and immigration guidance
- ${PUBLIC_URL}/he/urban-renewal — Urban renewal by neighborhood
- ${PUBLIC_URL}/he/news.rss — News feed (RSS 2.0)

Available in Hebrew (/he), English (/en), and Amharic (/am) — swap the locale
segment on any URL above.

## Full index

${PUBLIC_URL}/sitemap.xml — sitemap index covering all sections and locales.
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
