// Generic eligibility wizard surface (RIN-338).
//
// Schema-driven, client-side eligibility checker. Renders the questions
// from a WizardSchema, evaluates locally on submit (no server roundtrip,
// no DB), and shows an eligible/ineligible result with the localized
// failure reasons.
//
// Why client-side: the engine is a pure function (no I/O), and showing
// the result instantly keeps the UX of an interactive tool. Submitting
// the form via React Router's <Form> would force a roundtrip and a
// re-render that erases the user's filled-in answers — strictly worse
// for this surface.

import { useState } from "react";

import { Button } from "../ui/button";
import { t } from "~/lib/i18n/messages";
import type { Locale } from "~/lib/i18n/config";
import {
  evaluate,
  type Answer,
  type Answers,
  type EligibilityResult,
  type WizardSchema,
} from "~/lib/rights/wizard-engine";
import { glyphForTag } from "~/lib/rights/categories";

interface EligibilityWizardProps {
  schema: WizardSchema;
  locale: Locale;
  govUrl: string;
  // The right's primary tag — used to color the "eligible" success block.
  primaryTag: string;
}

export function EligibilityWizard({
  schema,
  locale,
  govUrl,
  primaryTag,
}: EligibilityWizardProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<EligibilityResult | null>(null);

  function setAnswer(id: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(evaluate(schema, answers));
  }

  function reset() {
    setAnswers({});
    setResult(null);
  }

  // Group questions by their `group` translatable label so the form has
  // visual sections. Questions without a group go into a default bucket.
  const groups = new Map<string, typeof schema.questions>();
  for (const q of schema.questions) {
    const key: string = q.group ? (q.group[locale] ?? q.group.he ?? "_") : "_";
    const existing = groups.get(key);
    if (existing) existing.push(q);
    else groups.set(key, [q]);
  }

  return (
    <section
      aria-labelledby="wizard-heading"
      className="mt-10 rounded-2xl border-2 border-earth-300 bg-card p-6 shadow-xs sm:p-8"
    >
      <header className="mb-6">
        <p className="text-sm font-medium tracking-wide text-earth-700 uppercase">
          {t(locale, "wizard_kicker")}
        </p>
        <h2
          id="wizard-heading"
          className="mt-1 font-display text-2xl font-bold text-earth-900 sm:text-3xl"
        >
          {t(locale, "wizard_heading")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          {t(locale, "wizard_subtitle")}
        </p>
      </header>

      {result === null ? (
        <form onSubmit={onSubmit} className="space-y-6">
          {Array.from(groups.entries()).map(([groupLabel, questions]) => (
            <fieldset key={groupLabel} className="rounded-lg border border-earth-200 p-4">
              {groupLabel !== "_" && (
                <legend className="px-2 text-sm font-semibold text-earth-900">
                  {groupLabel}
                </legend>
              )}
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id}>
                    {/* aria-labelledby ties each radiogroup to its question —
                        screen readers announced bare "radio, not checked"
                        with no context before this (TED-127). */}
                    <p
                      id={`wizard-q-${q.id}`}
                      className="mb-2 text-sm font-medium text-foreground"
                    >
                      {q.label[locale]}
                    </p>
                    {q.type === "boolean" ? (
                      <div
                        className="flex gap-3"
                        role="radiogroup"
                        aria-labelledby={`wizard-q-${q.id}`}
                      >
                        {(["true", "false"] as const).map((val) => {
                          const active = answers[q.id] === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => setAnswer(q.id, val)}
                              className={
                                active
                                  ? "inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-earth-800 bg-earth-800 px-4 py-2.5 text-sm font-medium text-white transition"
                                  : "inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-earth-300 bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-earth-500 hover:bg-earth-50"
                              }
                            >
                              {val === "true" ? "✓" : "✗"}{" "}
                              {t(
                                locale,
                                val === "true" ? "wizard_answer_yes" : "wizard_answer_no",
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        className="space-y-2"
                        role="radiogroup"
                        aria-labelledby={`wizard-q-${q.id}`}
                      >
                        {q.options.map((opt) => {
                          const active = answers[q.id] === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() => setAnswer(q.id, opt.value)}
                              className={
                                active
                                  ? "flex w-full items-center justify-between gap-2 rounded-md border-2 border-earth-800 bg-earth-50 px-4 py-2.5 text-start text-sm font-medium text-earth-900 transition"
                                  : "flex w-full items-center justify-between gap-2 rounded-md border border-earth-300 bg-card px-4 py-2.5 text-start text-sm text-foreground transition hover:border-earth-500"
                              }
                            >
                              <span>{opt.label[locale]}</span>
                              {active && (
                                <span className="text-earth-800" aria-hidden="true">
                                  ●
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {t(locale, "wizard_submit")}
          </Button>
        </form>
      ) : result.eligible ? (
        <div className="rounded-lg border-2 border-accent-green/30 bg-accent-green/5 p-6">
          <p className="flex items-center gap-2 font-display text-2xl font-bold text-accent-green">
            <span aria-hidden="true">✓</span> {t(locale, "wizard_eligible_title")}
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {t(locale, "wizard_eligible_body")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={govUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent-green px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:opacity-90"
            >
              <span aria-hidden="true">↗</span>
              {t(locale, "rights_official_form_cta")}
            </a>
            <Button type="button" variant="outline" onClick={reset}>
              {t(locale, "wizard_retry")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-accent-red/30 bg-accent-red/5 p-6">
          <p className="flex items-center gap-2 font-display text-2xl font-bold text-accent-red">
            <span aria-hidden="true">✗</span> {t(locale, "wizard_ineligible_title")}
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {t(locale, "wizard_ineligible_body")}
          </p>
          <ul className="mt-4 space-y-2 ps-5 text-ink-700">
            {result.reasons.map((reason, idx) => (
              <li key={idx} className="text-sm leading-relaxed">
                <span aria-hidden="true" className="me-2">
                  {glyphForTag(primaryTag)}
                </span>
                {reason[locale]}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={reset}>
              {t(locale, "wizard_retry")}
            </Button>
            <a
              href={govUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-earth-300 px-5 py-2.5 text-sm font-medium text-earth-700 transition hover:bg-earth-50"
            >
              {t(locale, "wizard_view_program")}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
