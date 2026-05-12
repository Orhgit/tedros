// Client-safe path helpers for the Voice & Action pillar.
// Pure functions — no server imports.

export function voicePath(): string {
  return "/voice";
}

export function racismReportPath(): string {
  return "/voice/racism-report";
}

export function policeConductPath(): string {
  return "/voice/police-conduct";
}

export function communityActionPath(): string {
  return "/voice/community-action";
}
