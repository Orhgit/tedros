// Client-safe path helpers for the Health Hub (RIN-653/654/655).
// Pure functions — no server imports.

export function healthPath(): string {
  return "/health";
}

export function conditionsPath(): string {
  return "/health/conditions";
}

export function conditionPath(slug: string): string {
  return `/health/conditions/${slug}`;
}

export function mentalHealthPath(): string {
  return "/health/mental-health";
}
