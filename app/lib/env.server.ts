import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  PUBLIC_URL: z
    .string()
    .url()
    .regex(/[^/]$/, "PUBLIC_URL must not end with a trailing slash")
    .default("http://localhost:3000")
    .refine(
      (url) => process.env.NODE_ENV !== "production" || !url.includes("localhost"),
      "PUBLIC_URL must be set to a production URL (not localhost) when NODE_ENV=production",
    ),

  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required (postgres://user:pass@host:port/db)"),

  REDIS_URL: z.string().url().optional(),

  AUTH_SECRET: z
    .string()
    .min(
      32,
      "AUTH_SECRET must be at least 32 characters (use `openssl rand -base64 32`)",
    ),
  AUTH_URL: z.string().url().optional(),
  AUTH_TRUST_HOST: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  EMAIL_SERVER_HOST: z.string().default("localhost"),
  EMAIL_SERVER_PORT: z.coerce.number().int().positive().default(1025),
  EMAIL_SERVER_USER: z.string().optional(),
  EMAIL_SERVER_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().email().default("no-reply@tedros.local"),

  // Resend (TED-22) — blank in dev uses no-op mock adapter
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().email().default("no-reply@tedros.local"),
  LEADS_DEFAULT_TO_EMAIL: z.string().email().default("admin@tedros.local"),
  ADMIN_NOTIFICATIONS_EMAIL: z.string().email().default("admin@tedros.local"),

  // Cloudflare Turnstile (optional) — omitting keys disables verification
  TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),

  // Google Analytics 4 — set GA_MEASUREMENT_ID=G-XXXXXXXXXX in production
  GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/)
    .optional(),

  // Mula AI chatbot — Claude API
  ANTHROPIC_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

export function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}

export const env = new Proxy({} as Env, {
  get(_target, prop: string) {
    return getEnv()[prop as keyof Env];
  },
});
