import { describe, expect, it } from "vitest";

import type { WizardSchema } from "../app/lib/rights/wizard-engine";
import { evaluate } from "../app/lib/rights/wizard-engine";

const t = (he: string) => ({ he, en: he, am: he });

describe("evaluate — require-true", () => {
  const schema: WizardSchema = {
    questions: [{ id: "q1", type: "boolean", label: t("q1") }],
    rules: [{ kind: "require-true", questionId: "q1", reason: t("q1 must be true") }],
  };

  it("eligible when true", () => {
    expect(evaluate(schema, { q1: true })).toEqual({ eligible: true });
  });

  it("ineligible when false", () => {
    const r = evaluate(schema, { q1: false });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons[0]?.he).toBe("q1 must be true");
  });

  it("ineligible when missing", () => {
    expect(evaluate(schema, {}).eligible).toBe(false);
  });

  it("accepts string 'true' / 'false' from form submissions", () => {
    expect(evaluate(schema, { q1: "true" })).toEqual({ eligible: true });
    expect(evaluate(schema, { q1: "false" }).eligible).toBe(false);
  });
});

describe("evaluate — require-false", () => {
  const schema: WizardSchema = {
    questions: [{ id: "q1", type: "boolean", label: t("q1") }],
    rules: [{ kind: "require-false", questionId: "q1", reason: t("must not be true") }],
  };

  it("eligible when false", () => {
    expect(evaluate(schema, { q1: false })).toEqual({ eligible: true });
  });

  it("ineligible when true", () => {
    expect(evaluate(schema, { q1: true }).eligible).toBe(false);
  });
});

describe("evaluate — require-any (origin-style)", () => {
  const schema: WizardSchema = {
    questions: [
      { id: "self", type: "boolean", label: t("self") },
      { id: "parent", type: "boolean", label: t("parent") },
      { id: "spouse", type: "boolean", label: t("spouse") },
    ],
    rules: [
      {
        kind: "require-any",
        questionIds: ["self", "parent", "spouse"],
        reason: t("must have at least one origin path"),
      },
    ],
  };

  it("eligible when one is true", () => {
    expect(evaluate(schema, { self: true })).toEqual({ eligible: true });
    expect(evaluate(schema, { parent: true, spouse: false })).toEqual({
      eligible: true,
    });
  });

  it("ineligible when all are false", () => {
    expect(evaluate(schema, { self: false, parent: false, spouse: false }).eligible).toBe(
      false,
    );
  });

  it("ineligible when none answered", () => {
    expect(evaluate(schema, {}).eligible).toBe(false);
  });
});

describe("evaluate — require-one-of (radio)", () => {
  const schema: WizardSchema = {
    questions: [
      {
        id: "status",
        type: "radio",
        label: t("status"),
        options: [
          { value: "married", label: t("married") },
          { value: "single", label: t("single") },
        ],
      },
    ],
    rules: [
      {
        kind: "require-one-of",
        questionId: "status",
        values: ["married"],
        reason: t("must be married"),
      },
    ],
  };

  it("eligible when answer is in allowed set", () => {
    expect(evaluate(schema, { status: "married" })).toEqual({ eligible: true });
  });

  it("ineligible when not in allowed set", () => {
    expect(evaluate(schema, { status: "single" }).eligible).toBe(false);
  });
});

describe("evaluate — require-not (negation)", () => {
  const schema: WizardSchema = {
    questions: [
      {
        id: "income",
        type: "radio",
        label: t("income"),
        options: [
          { value: "low", label: t("low") },
          { value: "medium", label: t("medium") },
          { value: "high", label: t("high") },
        ],
      },
    ],
    rules: [
      {
        kind: "require-not",
        questionId: "income",
        values: ["high"],
        reason: t("high earners not eligible"),
      },
    ],
  };

  it("eligible when value is not excluded", () => {
    expect(evaluate(schema, { income: "low" })).toEqual({ eligible: true });
    expect(evaluate(schema, { income: "medium" })).toEqual({ eligible: true });
  });

  it("ineligible when value is excluded", () => {
    expect(evaluate(schema, { income: "high" }).eligible).toBe(false);
  });
});

describe("evaluate — multi-rule, all-must-pass", () => {
  const schema: WizardSchema = {
    questions: [
      { id: "citizen", type: "boolean", label: t("citizen") },
      { id: "owner", type: "boolean", label: t("owner") },
    ],
    rules: [
      {
        kind: "require-true",
        questionId: "citizen",
        reason: t("citizenship required"),
      },
      {
        kind: "require-false",
        questionId: "owner",
        reason: t("must not own property"),
      },
    ],
  };

  it("eligible when both pass", () => {
    expect(evaluate(schema, { citizen: true, owner: false })).toEqual({
      eligible: true,
    });
  });

  it("collects all failure reasons", () => {
    const r = evaluate(schema, { citizen: false, owner: true });
    expect(r.eligible).toBe(false);
    if (!r.eligible) expect(r.reasons.length).toBe(2);
  });
});
