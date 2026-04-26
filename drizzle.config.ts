import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL is required for drizzle-kit. Run: cp .env.example .env",
  );
}

export default defineConfig({
  schema: "./app/lib/db/schema/index.ts",
  out: "./app/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
  verbose: true,
  strict: true,
});
