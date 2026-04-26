import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getEnv } from "./env.server";

declare global {
  var __tedros_pg__: postgres.Sql | undefined;
}

function createClient() {
  const { DATABASE_URL, NODE_ENV } = getEnv();
  return postgres(DATABASE_URL, {
    max: NODE_ENV === "production" ? 10 : 4,
    idle_timeout: 20,
    prepare: false,
  });
}

const client = globalThis.__tedros_pg__ ?? createClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.__tedros_pg__ = client;
}

export const db = drizzle(client, { logger: process.env.NODE_ENV !== "production" });
export const sqlClient = client;
