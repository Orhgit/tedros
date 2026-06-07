import { BOOTCAMPS } from "~/lib/careers/bootcamps.server";
import { CAREER_TRACKS } from "~/lib/careers/careers.server";
import { FAQS } from "~/lib/careers/faqs.server";
import { activeJobs } from "~/lib/careers/jobs.server";
import { relevantCities as careerRelevantCities } from "~/lib/careers/relevance";
import { STORIES } from "~/lib/careers/stories.server";
import { CITIES } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * Careers sitemap — hub pages, bootcamps, FAQs, stories, jobs, track×city cells.
 * ~136 career cells + jobs + supporting pages × 3 locales ≈ 600 URLs.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const jobs = activeJobs();
  const lastmodByPath = new Map<string, string>(
    jobs.map((j) => [`/careers/jobs/${j.slug}`, j.postedAt.slice(0, 10)]),
  );

  const cellPaths: string[] = [];
  for (const track of CAREER_TRACKS) {
    for (const city of careerRelevantCities(track.slug, CITIES)) {
      cellPaths.push(`/careers/${track.slug}/${city.slug}`);
    }
  }

  const paths = [
    ...CAREER_TRACKS.map((t) => `/careers/${t.slug}`),
    "/careers/affirmative-action",
    ...BOOTCAMPS.map((b) => `/careers/programs/${b.slug}`),
    ...cellPaths,
    "/careers/jobs",
    ...jobs.map((j) => `/careers/jobs/${j.slug}`),
    "/careers/statistics",
    "/careers/faq",
    ...FAQS.map((f) => `/careers/faq/${f.slug}`),
    "/careers/stories",
    ...STORIES.map((s) => `/careers/stories/${s.slug}`),
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths, lastmodByPath));
}
