// /:lang/health/mental-health/hospitalization-rights — patient rights in
// psychiatric hospitalization, including involuntary (TED-144). Who decides,
// appeal to the psychiatric committee, free legal representation. Carries a
// "not legal advice" banner in addition to the standard YMYL disclaimer.

import type { Route } from "./+types/$lang.health.mental-health_.hospitalization-rights";
import { MentalHealthAccessArticle } from "~/components/health/mental-health-access-article";
import { loadMentalHealthAccessPage } from "~/lib/health/mental-health-access-route.server";
import { mentalHealthAccessMeta } from "~/lib/health/mental-health-access-meta";

export async function loader({ params }: Route.LoaderArgs) {
  return loadMentalHealthAccessPage(params.lang, "hospitalization-rights");
}

export const meta: Route.MetaFunction = ({ data }) => mentalHealthAccessMeta(data);

export default function MentalHealthHospitalizationRights({
  loaderData,
}: Route.ComponentProps) {
  return <MentalHealthAccessArticle {...loaderData} />;
}
