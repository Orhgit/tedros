import { Auth, type AuthConfig } from "@auth/core";
import { authProviders, authPages } from "../../../auth.config";
import { getEnv } from "../env.server";

/**
 * Build the Auth.js v5 config at request time.
 *
 * The Drizzle adapter will be wired here once Tedros Data & Integrations
 * lands the auth tables (`users`, `accounts`, `sessions`, `verification_tokens`)
 * in `app/lib/db/schema/auth.ts` per ADR-003. Until then, providers + pages
 * are scaffolded but no adapter — meaning sign-in is parsed but no session
 * is persisted yet. This is intentional and unblocks UI work.
 */
function buildAuthConfig(): AuthConfig {
  const { AUTH_SECRET, AUTH_TRUST_HOST } = getEnv();
  return {
    providers: authProviders,
    secret: AUTH_SECRET,
    trustHost: AUTH_TRUST_HOST,
    session: { strategy: "database" },
    pages: authPages,
    callbacks: {
      session({ session, user }) {
        if (session.user && user) {
          (session.user as { id?: string }).id = user.id;
        }
        return session;
      },
    },
  };
}

export function handleAuth(request: Request): Promise<Response> {
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
  const data = (await response.json()) as AuthSession | Record<string, never>;
  if (!data || !("expires" in data)) return null;
  return data;
}
