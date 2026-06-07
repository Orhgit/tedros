import { getEnv } from "~/lib/env.server";

/** Serves the IndexNow ownership key at /indexnow.txt */
export function loader() {
  const { INDEXNOW_KEY } = getEnv();
  if (!INDEXNOW_KEY) {
    throw new Response("Not found", { status: 404 });
  }
  return new Response(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
