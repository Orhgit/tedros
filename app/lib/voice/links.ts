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

export function streetStopPath(): string {
  return "/voice/street-stop";
}

// Record-expungement wizard (TED-137) — lives in the Rights Hub but is
// cross-promoted from every police-facing Voice page.
export function expungementWizardPath(): string {
  return "/rights/criminal-record-expungement";
}
