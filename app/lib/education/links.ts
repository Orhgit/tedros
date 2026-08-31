// Canonical locale-relative paths for the Education pillar.
//
// Client-safe: these are pure string builders, so route components and the
// server content modules can share them without dragging long-form copy into
// the client bundle.

export function educationLandingPath(): string {
  return "/education";
}

export function scholarshipsLandingPath(): string {
  return "/education/scholarships";
}

export function tracksLandingPath(): string {
  return "/education/tracks";
}

// ── Parents vs. the school system (TED-145) ────────────────────────────────

/** Guide: what counts as discrimination in school registration, and what to do. */
export function registrationDiscriminationPath(): string {
  return "/education/registration-discrimination";
}

/** Guide: first parents' meeting and a parent's rights at school. */
export function parentRightsPath(): string {
  return "/education/parent-rights";
}

// ── Learning Amharic (TED-147) ─────────────────────────────────────────────

/** Hub: learning Amharic — the fidel, family phrases, where to study. */
export function amharicHubPath(): string {
  return "/education/amharic";
}

/**
 * Hebrew ulpan for adult Ethiopian-Israeli immigrants — the other direction of
 * the same language question. Lives under the Amharic hub rather than in the
 * Rights Hub: it is a guide to a national service, not an eligibility record.
 */
export function amharicUlpanPath(): string {
  return "/education/amharic/ulpan";
}

/**
 * The special-education eligibility-committee right (ועדת זכאות ואפיון),
 * which carries the objection (השגה) wizard. It lives in the Rights Hub
 * rather than under /education because the wizard engine renders on the
 * rights detail route.
 */
export function eligibilityCommitteePath(): string {
  return "/rights/special-education-eligibility-committee";
}
