// /:lang/health/mental-health/culturally-competent-care — what culturally
// competent mental-health care means, questions to ask a clinician, and
// verified Amharic-language services (TED-144). Links to the
// /professionals/amharic landing (TED-136 / PR #114).

import type { Route } from "./+types/$lang.health.mental-health_.culturally-competent-care";
import { MentalHealthAccessArticle } from "~/components/health/mental-health-access-article";
import { loadMentalHealthAccessPage } from "~/lib/health/mental-health-access-route.server";
import { mentalHealthAccessMeta } from "~/lib/health/mental-health-access-meta";

export async function loader({ params }: Route.LoaderArgs) {
  return loadMentalHealthAccessPage(params.lang, "culturally-competent-care");
}

export const meta: Route.MetaFunction = ({ data }) => mentalHealthAccessMeta(data);

export default function MentalHealthCulturallyCompetentCare({
  loaderData,
}: Route.ComponentProps) {
  return <MentalHealthAccessArticle {...loaderData} />;
}
