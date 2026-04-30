// Generic eligibility wizard engine (RIN-338).
//
// Pure, schema-driven evaluator for "am I eligible for X?" flows. The
// platform's competitive USP per ADR-010 is the action layer over public
// information — this engine is the reusable kernel for every "Do" surface
// that ships under that thesis (Phase 3 rights, Phase 5 scholarships,
// Phase 6 health-program intake, etc.).
//
// Design principles:
//   - **Pure function.** No DOM, no fetch, no router, no I/O. Easy to unit
//     test. Same engine runs in browser (form submit) and on server (form
//     action) without a code split.
//   - **Schema, not code.** The rights seed describes wizards as data; the
//     engine evaluates the data. Adding a new wizard = adding a row in the
//     seed, not adding a route or component.
//   - **Translatable failure reasons.** Each rule carries its own HE/EN/AM
//     reason — the result lists *why* a user is not eligible in the
//     locale they're reading.
//
// Question types:
//   `boolean` — true/false answer (shown as a Yes/No radio in the UI).
//   `radio`   — pick one from a fixed option list.
//
// Rule kinds:
//   `require-true`   — the named boolean answer must be true.
//   `require-false`  — the named boolean answer must be false.
//   `require-any`    — at least one of the named boolean answers must be
//                      true (origin-style "any path of N suffices" cases,
//                      mirroring the mortgage calculator's origin block).
//   `require-one-of` — the named radio answer must equal one of N values.
//   `require-not`    — the named radio answer must NOT equal any of N
//                      values.
//
// Add new kinds when a real wizard needs them; over-design is the wrong
// move here.

import type { Translatable } from "../db/columns";

export type Answer = boolean | string;
export type Answers = Record<string, Answer>;

export interface BooleanQuestion {
  id: string;
  type: "boolean";
  label: Translatable;
  group?: Translatable;
}

export interface RadioOption {
  value: string;
  label: Translatable;
}

export interface RadioQuestion {
  id: string;
  type: "radio";
  label: Translatable;
  group?: Translatable;
  options: RadioOption[];
}

export type Question = BooleanQuestion | RadioQuestion;

export type Rule =
  | { kind: "require-true"; questionId: string; reason: Translatable }
  | { kind: "require-false"; questionId: string; reason: Translatable }
  | { kind: "require-any"; questionIds: string[]; reason: Translatable }
  | {
      kind: "require-one-of";
      questionId: string;
      values: string[];
      reason: Translatable;
    }
  | {
      kind: "require-not";
      questionId: string;
      values: string[];
      reason: Translatable;
    };

export interface WizardSchema {
  questions: Question[];
  rules: Rule[];
}

export type EligibilityResult =
  | { eligible: true }
  | { eligible: false; reasons: Translatable[] };

function asBoolean(value: Answer | undefined): boolean | null {
  if (value === undefined) return null;
  if (typeof value === "boolean") return value;
  // Form submissions arrive as strings; accept the canonical "true"/"false".
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

function asString(value: Answer | undefined): string | null {
  if (value === undefined || value === null) return null;
  return String(value);
}

export function evaluate(schema: WizardSchema, answers: Answers): EligibilityResult {
  const reasons: Translatable[] = [];

  for (const rule of schema.rules) {
    switch (rule.kind) {
      case "require-true": {
        const v = asBoolean(answers[rule.questionId]);
        if (v !== true) reasons.push(rule.reason);
        break;
      }
      case "require-false": {
        const v = asBoolean(answers[rule.questionId]);
        if (v !== false) reasons.push(rule.reason);
        break;
      }
      case "require-any": {
        const anyTrue = rule.questionIds.some((qid) => asBoolean(answers[qid]) === true);
        if (!anyTrue) reasons.push(rule.reason);
        break;
      }
      case "require-one-of": {
        const v = asString(answers[rule.questionId]);
        if (v === null || !rule.values.includes(v)) reasons.push(rule.reason);
        break;
      }
      case "require-not": {
        const v = asString(answers[rule.questionId]);
        if (v !== null && rule.values.includes(v)) reasons.push(rule.reason);
        break;
      }
    }
  }

  if (reasons.length === 0) return { eligible: true };
  return { eligible: false, reasons };
}
