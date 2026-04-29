// Barrel re-export for the Drizzle schema.
// `db.server.ts` imports `* as schema from "./schema"` and passes it to
// drizzle's `.schema` for typed `db.query.*` access.

// Shared column helpers — re-exported so drizzle-kit picks up `localeEnum`
// (used by `users.preferred_locale` + every `*_translations.locale`).
// Without this, drizzle-kit emits SQL that references the `locale` type
// without ever creating it. (QA-PR1, B1.)
export * from "../columns";

export * from "./identity";
export * from "./auth";
export * from "./realestate";
export * from "./rights";
export * from "./professionals";
export * from "./content";
export * from "./audit";
export * from "./subscribers";
