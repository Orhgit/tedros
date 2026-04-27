// Lead source string parser. The form posts a single `source` token that
// identifies which feature surface produced the lead. Keep this tiny and
// pure — it is shared between the form, the action, and tests.

export type LeadSource =
  | { kind: "listing"; listingId: string }
  | { kind: "urban-renewal"; slug: string }
  | { kind: "agency"; agencyId: string }
  | { kind: "mortgage-calc" }
  | { kind: "general" };

export type LeadSourceKind = LeadSource["kind"];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG_RE = /^[a-z0-9-]{1,64}$/;

export function parseLeadSource(raw: string | null | undefined): LeadSource | null {
  if (!raw) return null;
  const value = raw.trim();
  if (value === "mortgage-calc") return { kind: "mortgage-calc" };
  if (value === "general") return { kind: "general" };

  const idx = value.indexOf(":");
  if (idx === -1) return null;
  const prefix = value.slice(0, idx);
  const arg = value.slice(idx + 1);
  if (!arg) return null;

  switch (prefix) {
    case "listing":
      return UUID_RE.test(arg) ? { kind: "listing", listingId: arg } : null;
    case "agency":
      return UUID_RE.test(arg) ? { kind: "agency", agencyId: arg } : null;
    case "urban-renewal":
      return SLUG_RE.test(arg) ? { kind: "urban-renewal", slug: arg } : null;
    default:
      return null;
  }
}

export function serializeLeadSource(source: LeadSource): string {
  switch (source.kind) {
    case "listing":
      return `listing:${source.listingId}`;
    case "agency":
      return `agency:${source.agencyId}`;
    case "urban-renewal":
      return `urban-renewal:${source.slug}`;
    case "mortgage-calc":
      return "mortgage-calc";
    case "general":
      return "general";
  }
}
