// Internal-link helpers + canonical paths for the Heritage events vertical.

import type { HeritageEventSlug } from "./categories";

export function eventsLandingPath(): string {
  return "/heritage/events";
}

export function eventPath(event: HeritageEventSlug): string {
  return `/heritage/events/${event}`;
}

export function eventCityPath(event: HeritageEventSlug, citySlug: string): string {
  return `/heritage/events/${event}/${citySlug}`;
}

// ── kessim directory + marriage guide (TED-140) ────────────────────────────

export function kessimLandingPath(): string {
  return "/heritage/kessim";
}

export function kessimCityPath(citySlug: string): string {
  return `/heritage/kessim/${citySlug}`;
}

export function marriagePath(): string {
  return "/heritage/marriage";
}
