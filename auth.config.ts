import type { AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";
import Nodemailer from "@auth/core/providers/nodemailer";

/**
 * Provider list (without the adapter — adapter is wired in
 * `app/lib/auth/auth.server.ts` because it depends on the DB client).
 *
 * Per ADR-003: Auth.js v5 + Drizzle adapter + DB sessions (NOT JWT).
 * Magic link email + Google OAuth.
 */
export const authProviders: AuthConfig["providers"] = [
  Nodemailer({
    server: {
      host: process.env.EMAIL_SERVER_HOST ?? "localhost",
      port: Number(process.env.EMAIL_SERVER_PORT ?? 1025),
      auth:
        process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD
          ? {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD,
            }
          : undefined,
    },
    from: process.env.EMAIL_FROM ?? "no-reply@tedros.local",
  }),
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ]
    : []),
];

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
