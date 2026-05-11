// Client-safe path helpers for the Health Hub (RIN-653/654/655 Wave 1,
// RIN-656/657 Wave 2). Pure functions — no server imports.

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

// RIN-656 — Health Services Directory
export function servicesPath(): string {
  return "/health/services";
}

// RIN-657 — Health Rights
export function rightsPath(): string {
  return "/health/rights";
}

// RIN-658 — Traditional Medicine Hub
export function traditionalMedicinePath(): string {
  return "/health/traditional-medicine";
}

// RIN-659 — Nutrition Hub
export function nutritionPath(): string {
  return "/health/nutrition";
}
