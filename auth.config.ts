import type { AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";

/**
 * Provider list for Phase 1.
 *
 * Per ADR-003: Auth.js v5 + Drizzle adapter + DB sessions, with Email
 * (magic-link) and Google providers. Phase 1 ships Google-only because
 * the Email/Nodemailer provider requires an adapter (it persists
 * verification tokens) regardless of session strategy. The adapter
 * lands in `app/lib/db/schema/auth.ts` from Tedros Data & Integrations
 * (PR #1, per Vega D3). Re-enable Email by adding back:
 *
 *   import Nodemailer from "@auth/core/providers/nodemailer";
 *   Nodemailer({ server: { ...EMAIL_SERVER_HOST/PORT/USER/PASS }, from: EMAIL_FROM })
 *
 * to this list, plus `adapter: DrizzleAdapter(db)` in `auth.server.ts`.
 */
export const authProviders: AuthConfig["providers"] =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : [];

/**
 * `/login` (no lang prefix) is a locale-aware shim that redirects to
 * `/<locale>/login` based on the `tedros_locale` cookie (see app/routes/login.tsx).
 * This keeps Auth.js's redirects locale-aware per ADR-004.
 */
export const authPages = {
  signIn: "/login",
  verifyRequest: "/login?status=check-email",
  error: "/login?status=error",
} as const;
