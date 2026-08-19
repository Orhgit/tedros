// Which professions can reasonably serve the whole country remotely, vs.
// which need a real local/regional presence. Reasoning (2026-08-19):
//
// - accountant, mortgage-advisor, career-counselor: routinely handled by
//   phone/document review/video in Israel, no in-person requirement.
// - psychologist: telehealth is explicitly recognized by the Ministry of
//   Health (dedicated remote-care guidance) and has its own chapter in the
//   psychologists' professional code of ethics — legitimate, not a stretch.
// - lawyer, doctor, social-worker, real-estate-agent: kept location-bound
//   (document signing/court presence, physical exams, in-person community
//   work, physical properties, respectively).
import type { Profession } from "../professionals/categories";

export const LOCATION_OPTIONAL_PROFESSIONS: readonly Profession[] = [
  "accountant",
  "mortgage-advisor",
  "career-counselor",
  "psychologist",
];

export function isLocationOptional(profession: Profession): boolean {
  return (LOCATION_OPTIONAL_PROFESSIONS as readonly string[]).includes(profession);
}
