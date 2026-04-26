import type { Route } from "./+types/auth.$";
import { handleAuth } from "~/lib/auth/auth.server";

export const loader = ({ request }: Route.LoaderArgs) => handleAuth(request);
export const action = ({ request }: Route.ActionArgs) => handleAuth(request);
