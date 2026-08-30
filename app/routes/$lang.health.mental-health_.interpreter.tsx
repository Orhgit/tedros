// /:lang/health/mental-health/interpreter — getting mental-health care with
// an interpreter (TED-144). The access-critical page: full Amharic summary,
// MoH interpretation center *5144, the exact ask at the kupa, and the right
// to state-funded translation at psychiatric committee hearings.
//
// "mental-health_." escapes fs-routes nesting under the mental-health hub
// route (which renders no Outlet) while keeping the URL segment.

import type { Route } from "./+types/$lang.health.mental-health_.interpreter";
import { MentalHealthAccessArticle } from "~/components/health/mental-health-access-article";
import { loadMentalHealthAccessPage } from "~/lib/health/mental-health-access-route.server";
import { mentalHealthAccessMeta } from "~/lib/health/mental-health-access-meta";

export async function loader({ params }: Route.LoaderArgs) {
  return loadMentalHealthAccessPage(params.lang, "interpreter");
}

export const meta: Route.MetaFunction = ({ data }) => mentalHealthAccessMeta(data);

export default function MentalHealthInterpreter({ loaderData }: Route.ComponentProps) {
  return <MentalHealthAccessArticle {...loaderData} />;
}
