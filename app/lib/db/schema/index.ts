// Barrel re-export for the Drizzle schema.
// `db.server.ts` imports `* as schema from "./schema"` and passes it to
// drizzle's `.schema` for typed `db.query.*` access.

export * from "./identity";
export * from "./auth";
export * from "./realestate";
export * from "./rights";
export * from "./professionals";
export * from "./content";
export * from "./audit";
