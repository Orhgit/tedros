// Client-safe path helpers for the Culinary pillar (TED-146).
// Pure functions — no server imports.

export function culinaryPath(): string {
  return "/culinary";
}

export function culinaryShoppingCityPath(citySlug: string): string {
  return `/culinary/shopping/${citySlug}`;
}

export function sigdMenuPath(): string {
  return "/culinary/sigd-menu";
}
