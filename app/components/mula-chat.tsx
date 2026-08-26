"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALE_DIRECTION, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { cn } from "~/lib/utils";
import { MulaDigitalHuman } from "./mula-3d";

type Message = { role: "user" | "assistant"; content: string };
type AvatarState = "idle" | "thinking" | "talking";

const QUICK_QUESTION_KEYS = ["mula_q1", "mula_q2", "mula_q3", "mula_q4"] as const;

// Positioned with logical properties (end-*) on purpose: the accessibility
// widget sits at start-*, so the two floating buttons land in OPPOSITE
// corners in every writing direction. The old physical left-6 collided with
// it on LTR locales (en/am) and fully covered its click target (TED-122).
export function MulaChat({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setAvatarState("talking");
      const timer = setTimeout(() => {
        setMessages([{ role: "assistant", content: t(locale, "mula_greeting") }]);
        setAvatarState("idle");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [open, messages.length, locale]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on Escape and hand focus back to the launcher (same pattern as
  // the accessibility widget).
  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMessage: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setAvatarState("thinking");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { error?: string }).error ?? t(locale, "mula_error_server"),
        );
      }
      const { reply } = (await res.json()) as { reply: string };
      setAvatarState("talking");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setTimeout(() => setAvatarState("idle"), Math.min(reply.length * 30, 3500));
    } catch (e) {
      setError(e instanceof Error ? e.message : t(locale, "mula_error_unexpected"));
      setAvatarState("idle");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* ── Floating launcher ── */}
      <button
        ref={launcherRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={t(locale, open ? "mula_close_chat" : "mula_open_chat")}
        aria-expanded={open}
        className={cn(
          "fixed end-6 bottom-6 z-50 transition-all duration-300 hover:scale-110 active:scale-95",
          open ? "scale-105" : "",
        )}
        style={{ animation: open ? "none" : "mula-float 3s ease-in-out infinite" }}
      >
        {open ? (
          <div className="flex size-14 items-center justify-center rounded-full bg-amber-500 shadow-xl ring-2 ring-amber-300 sm:size-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : (
          <div data-mula-scene className="relative" ref={sceneRef}>
            {/* 56px keeps the launcher from covering content lines on 375px
                screens (TED-122) — the panel avatar stays large. */}
            <MulaDigitalHuman state="idle" size={56} />
          </div>
        )}
      </button>

      {/* ── Chat panel — only mounted when open to keep focusables out of DOM ── */}
      {open && (
        <div
          className="fixed end-6 bottom-24 z-50 flex w-[min(92vw,400px)] origin-bottom flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 sm:bottom-28"
          dir={LOCALE_DIRECTION[locale]}
          role="dialog"
          aria-label={t(locale, "mula_dialog_label")}
          style={{ animation: "mula-slide-up 0.3s ease-out" }}
        >
          {/* ── Header — big live avatar ── */}
          <div
            className="relative flex flex-col items-center gap-1 overflow-hidden pt-4 pb-3"
            style={{
              background:
                "linear-gradient(180deg, #0f0a1f 0%, #1a1035 60%, #2d1a5e 100%)",
            }}
            data-mula-scene
          >
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, transparent 40%, rgba(251,191,36,0.15) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s ease-in-out infinite",
              }}
            />

            <MulaDigitalHuman state={avatarState} size={140} />

            <div className="relative flex items-center gap-2 pb-1">
              <p className="text-base leading-tight font-bold text-white">
                {t(locale, "mula_name")}
              </p>
              <span className="rounded-full bg-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/40">
                AI
              </span>
            </div>
            <p className="relative -mt-1 pb-1 text-xs text-amber-200/70">
              {avatarState === "thinking"
                ? `⋯ ${t(locale, "mula_status_thinking")}`
                : avatarState === "talking"
                  ? `▶ ${t(locale, "mula_status_talking")}`
                  : t(locale, "mula_status_idle")}
            </p>

            <button
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label={t(locale, "mula_close")}
              className="absolute end-3 top-3 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* ── Messages ── */}
          <div
            className="flex flex-col gap-3 overflow-y-auto px-4 py-4"
            style={{ maxHeight: "280px", minHeight: "120px" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-end gap-2",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row",
                )}
              >
                {msg.role === "assistant" && (
                  <div className="size-7 shrink-0 overflow-hidden rounded-full bg-slate-900 ring-1 ring-amber-400/40">
                    <MulaDigitalHuman state="idle" size={28} />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                    msg.role === "user"
                      ? "rounded-br-sm bg-amber-500 text-white"
                      : "rounded-bl-sm bg-gray-100 text-gray-800",
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-end gap-2">
                <div className="size-7 shrink-0 overflow-hidden rounded-full bg-slate-900 ring-1 ring-amber-400/40">
                  <MulaDigitalHuman state="thinking" size={28} />
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 shadow-sm">
                  <span className="flex gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="size-2 rounded-full bg-amber-400"
                        style={{
                          animation: `mula-dot-bounce 0.7s ease-in-out infinite ${d * 0.15}s`,
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-center text-xs text-red-500">
                {error}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && !loading && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {QUICK_QUESTION_KEYS.map((key) => {
                const q = t(locale, key);
                return (
                  <button
                    key={key}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 transition-colors hover:border-amber-300 hover:bg-amber-100"
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/60 px-3 py-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t(locale, "mula_placeholder")}
              aria-label={t(locale, "mula_input_label")}
              disabled={loading}
              className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none disabled:opacity-60"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label={t(locale, "mula_send")}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-md transition-all hover:bg-amber-600 active:scale-95 disabled:opacity-40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 -rotate-90"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
