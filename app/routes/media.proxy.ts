// Image proxy for merkaz-h.co.il property photos.
// Fetches images server-side, bypassing browser CORS/ORB restrictions
// and URL-encoding issues with Hebrew characters in paths.
// Route: GET /media/proxy?url=<encoded-merkaz-url>

import type { Route } from "./+types/media.proxy";

const ALLOWED_HOST = "merkaz-h.co.il";
const CACHE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function loader({ request }: Route.LoaderArgs) {
  const raw = new URL(request.url).searchParams.get("url");
  if (!raw) return new Response("Missing url", { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  if (target.hostname !== ALLOWED_HOST) {
    return new Response("Not allowed", { status: 403 });
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: { "User-Agent": "Tedros/1.0 (+https://tedros.co.il)" },
    });

    if (!upstream.ok) {
      return new Response("Not found", { status: 404 });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/webp";
    const body = await upstream.arrayBuffer();

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${CACHE_SECONDS}, immutable`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response("Upstream error", { status: 502 });
  }
}
