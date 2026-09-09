import { Auth, type AuthConfig } from "@auth/core";
import { authProviders, authPages, configuredProviderIds } from "../../../auth.config";
import { getEnv } from "../env.server";

/**
 * Build the Auth.js v5 config at request time.
 *
 * Phase 1 uses `strategy: "jwt"` so the magic-link / Google flow works
 * end-to-end without a DB adapter. Switching back to `strategy: "database"`
 * is a one-line change once Tedros Data & Integrations lands the auth tables
 * (`users`, `accounts`, `sessions`, `verification_tokens`) in
 * `app/lib/db/schema/auth.ts` per ADR-003 + Vega D3.
 */
function buildAuthConfig(): AuthConfig {
  const { AUTH_SECRET, AUTH_TRUST_HOST } = getEnv();
  return {
    providers: authProviders,
    secret: AUTH_SECRET,
    trustHost: AUTH_TRUST_HOST,
    session: { strategy: "jwt" },
    pages: authPages,
    callbacks: {
      session({ session, token }) {
        if (session.user && token?.sub) {
          (session.user as { id?: string }).id = token.sub;
        }
        return session;
      },
    },
  };
}

/**
 * Auth.js actions whose second path segment names a provider, e.g.
 * `/auth/callback/google` or `/auth/signin/google`.
 */
const PROVIDER_SCOPED_ACTIONS = new Set(["callback", "signin", "signout"]);

/**
 * True when the URL addresses a provider that isn't registered.
 *
 * Auth.js resolves `options.provider` from the path segment and then reads
 * `options.provider.type` without a guard, so an unregistered provider id
 * surfaces as `TypeError: Cannot read properties of undefined (reading
 * 'type')` from `AuthInternal` — once per request, with a full stack trace.
 * With `GOOGLE_CLIENT_ID` unset every provider id is unregistered, so scanner
 * traffic to `/auth/callback/*` generated a steady stream of those.
 */
function targetsUnknownProvider(request: Request): boolean {
  const segments = new URL(request.url).pathname.split("/").filter(Boolean);
  // ["auth", <action>, <providerId>?]
  const [prefix, action, providerId] = segments;
  if (prefix !== "auth" || !action || !providerId) return false;
  if (!PROVIDER_SCOPED_ACTIONS.has(action)) return false;
  return !configuredProviderIds.includes(providerId);
}

export function handleAuth(request: Request): Promise<Response> {
  if (targetsUnknownProvider(request)) {
    return Promise.resolve(
      new Response("Not Found", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      }),
    );
  }
  return Auth(request, buildAuthConfig());
}

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
};

export type AuthSession = {
  user?: SessionUser;
  expires: string;
};

/**
 * Read the active session by replaying the cookie against Auth.js's session
 * endpoint internally. This avoids a round-trip and works in loaders/actions.
 */
export async function getSession(request: Request): Promise<AuthSession | null> {
  const url = new URL("/auth/session", request.url);
  const sessionRequest = new Request(url, {
    headers: { cookie: request.headers.get("cookie") ?? "" },
  });
  const response = await Auth(sessionRequest, buildAuthConfig());
  if (response.status !== 200) return null;
  const raw = (await response.json()) as unknown;
  if (!raw || typeof raw !== "object" || !("expires" in raw)) return null;
  return raw as AuthSession;
}
