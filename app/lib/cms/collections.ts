// Payload CMS collection blueprints (TED-21).
//
// Payload itself is not yet installed (no monthly cost, but it's a separate
// Node process that needs DevOps wiring + a payload-only Postgres schema).
// The shapes below are the **single source of truth** the eventual
// `payload.config.ts` assembles its `collections` from. Until then, this
// file exists so:
//
//   - Reviewers can see what the CMS surface will look like.
//   - The Drizzle schema and Zod validators can be cross-checked against it.
//   - The DevOps install task is a mechanical translation, not a redesign.
//
// Spec — minimal shape we depend on, decoupled from Payload's TS types so
// this file compiles without `payload` as a dep.

export type CollectionFieldType =
  | "text"
  | "textarea"
  | "richText"
  | "number"
  | "email"
  | "checkbox"
  | "select"
  | "date"
  | "relationship"
  | "upload"
  | "json"
  | "array"
  | "group";

export type CollectionField = {
  name: string;
  type: CollectionFieldType;
  required?: boolean;
  localized?: boolean;
  // For `select`
  options?: Array<{ label: string; value: string }>;
  // For `relationship` / `upload`
  relationTo?: string;
  hasMany?: boolean;
  // For `array` / `group`
  fields?: CollectionField[];
  admin?: {
    description?: string;
    position?: "sidebar";
  };
};

export type CollectionAccess = {
  // Free-form descriptor — Payload's access functions are wired in
  // `payload.config.ts` from these names. (`owner-only` reads agency_id
  // from the active user; `published` filters publishedAt + status.)
  read?: "anyone" | "authenticated" | "agency-scoped" | "admin-only" | "published";
  create?: "authenticated" | "agency-scoped" | "admin-only";
  update?: "agency-scoped" | "admin-only";
  delete?: "agency-scoped" | "admin-only";
};

export type CollectionBlueprint = {
  slug: string;
  // Drizzle table this collection mirrors. Drizzle is the system of record;
  // Payload is the editor-facing UI on top of the same rows.
  drizzleTable: string;
  labels: { singular: string; plural: string };
  admin: {
    useAsTitle: string;
    defaultColumns?: string[];
    description?: string;
  };
  access: CollectionAccess;
  versions?: { drafts: boolean };
  fields: CollectionField[];
};

// --- Listings --------------------------------------------------------------
export const listingsCollection: CollectionBlueprint = {
  slug: "listings",
  drizzleTable: "listings",
  labels: { singular: "Listing", plural: "Listings" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "status", "city", "price", "publishedAt"],
    description:
      "Real-estate units. Type-specific fields live in `attributes` JSON; values must validate against `app/lib/validation/listings.ts` before save.",
  },
  access: {
    read: "published",
    create: "agency-scoped",
    update: "agency-scoped",
    delete: "agency-scoped",
  },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, localized: true },
    { name: "agency", type: "relationship", relationTo: "agencies", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Sale", value: "sale" },
        { label: "Rent", value: "rent" },
        { label: "Urban renewal", value: "urban_renewal" },
        { label: "Investment", value: "investment" },
        { label: "Government program", value: "gov_program" },
        { label: "Commercial", value: "commercial" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Active", value: "active" },
        { label: "Sold", value: "sold" },
        { label: "Rented", value: "rented" },
        { label: "Archived", value: "archived" },
      ],
    },
    { name: "price", type: "number" },
    { name: "city", type: "relationship", relationTo: "cities", required: true },
    { name: "neighborhood", type: "relationship", relationTo: "neighborhoods" },
    {
      name: "attributes",
      type: "json",
      admin: {
        description:
          "Type-specific JSON. Validated server-side against the per-type Zod schema before save.",
      },
    },
    { name: "body", type: "richText", localized: true },
    {
      name: "media",
      type: "array",
      fields: [
        { name: "r2Key", type: "text", required: true },
        { name: "altText", type: "text", localized: true },
        { name: "kind", type: "select", options: [
          { label: "Image", value: "image" },
          { label: "Video", value: "video" },
          { label: "Floorplan", value: "floorplan" },
          { label: "3D Tour", value: "tour_3d" },
        ] },
      ],
    },
  ],
};

// --- Agencies --------------------------------------------------------------
export const agenciesCollection: CollectionBlueprint = {
  slug: "agencies",
  drizzleTable: "agencies",
  labels: { singular: "Agency", plural: "Agencies" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "verificationStatus", "contactEmail", "createdAt"],
    description: "B2B onboarding. Admin verifies legalId + licenseNumber.",
  },
  access: {
    read: "anyone", // public agency profile pages
    create: "authenticated",
    update: "agency-scoped",
    delete: "admin-only",
  },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, localized: true },
    {
      name: "verificationStatus",
      type: "select",
      required: true,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Verified", value: "verified" },
        { label: "Rejected", value: "rejected" },
        { label: "Suspended", value: "suspended" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "legalId", type: "text", admin: { description: "ת.ז. / ח.פ. — 9 digits" } },
    { name: "licenseNumber", type: "text", admin: { description: "Ministry of Justice broker license" } },
    { name: "contactEmail", type: "email" },
    { name: "contactPhone", type: "text" },
    { name: "websiteUrl", type: "text" },
    { name: "description", type: "textarea", localized: true },
    { name: "owner", type: "relationship", relationTo: "users", required: true },
  ],
};

// --- Articles --------------------------------------------------------------
export const articlesCollection: CollectionBlueprint = {
  slug: "articles",
  drizzleTable: "articles",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "author"],
  },
  access: {
    read: "published",
    create: "admin-only",
    update: "admin-only",
    delete: "admin-only",
  },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, localized: true },
    { name: "excerpt", type: "textarea", localized: true },
    { name: "body", type: "richText", localized: true, required: true },
    { name: "coverR2Key", type: "text" },
    { name: "author", type: "relationship", relationTo: "users" },
    { name: "tags", type: "json" },
  ],
};

// --- Rights ----------------------------------------------------------------
export const rightsCollection: CollectionBlueprint = {
  slug: "rights",
  drizzleTable: "rights",
  labels: { singular: "Right", plural: "Rights" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt"],
  },
  access: {
    read: "published",
    create: "admin-only",
    update: "admin-only",
    delete: "admin-only",
  },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, localized: true },
    { name: "govUrl", type: "text" },
    { name: "eligibilitySummary", type: "textarea", localized: true },
    { name: "body", type: "richText", localized: true, required: true },
    { name: "tags", type: "json" },
  ],
};

// --- Programs --------------------------------------------------------------
export const programsCollection: CollectionBlueprint = {
  slug: "programs",
  drizzleTable: "programs",
  labels: { singular: "Program", plural: "Programs" },
  admin: { useAsTitle: "title" },
  access: {
    read: "published",
    create: "admin-only",
    update: "admin-only",
    delete: "admin-only",
  },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, localized: true },
    { name: "provider", type: "text", localized: true },
    { name: "eligibilitySummary", type: "textarea", localized: true },
    { name: "applicationUrl", type: "text" },
    { name: "body", type: "richText", localized: true, required: true },
    { name: "tags", type: "json" },
  ],
};

// --- Roster ----------------------------------------------------------------
// Order = navigation order in the admin sidebar.
export const PAYLOAD_COLLECTIONS: readonly CollectionBlueprint[] = [
  listingsCollection,
  agenciesCollection,
  articlesCollection,
  rightsCollection,
  programsCollection,
] as const;
