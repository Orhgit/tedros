// Client-safe path helpers for the Family & Support pillar.
// Pure functions — no server imports.

export function familyPath(): string {
  return "/family";
}

export function domesticViolencePath(): string {
  return "/family/domestic-violence";
}

export function elderlyPath(): string {
  return "/family/elderly";
}

export function womenEmpowermentPath(): string {
  return "/family/women-empowerment";
}

export function mourningPath(): string {
  return "/family/mourning";
}

// ── Soldiers & families hub (TED-142) ─────────────────────────────────────

export function soldiersPath(): string {
  return "/family/soldiers";
}

export function soldierDetentionPath(): string {
  return "/family/soldiers/detention";
}

export function loneSoldierPath(): string {
  return "/family/soldiers/lone-soldier";
}

/** The ת"ש eligibility wizard lives on the Rights Hub (wizard-engine). */
export function familySupportWizardPath(): string {
  return "/rights/idf-family-support";
}
