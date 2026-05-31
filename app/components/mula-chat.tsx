"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { MulaDigitalHuman } from "./mula-3d";

type Message = { role: "user" | "assistant"; content: string };
type AvatarState = "idle" | "thinking" | "talking";

const QUICK_QUESTIONS = [
  "מה הזכויות שלי כשוכר?",
  "איך מוצאים עבודה?",
  "אירועי קהילה",
  "מה יש באתר?",
];

export function MulaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setAvatarState("talking");
      const timer = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content:
              "שלום! אני מולה 👋\nאני העוזר החכם של Tedros — פה לעזור לך למצוא כל מה שתצטרך. שאל אותי!",
          },
        ]);
        setAvatarState("idle");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
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
        throw new Error((err as { error?: string }).error ?? "שגיאה בשרת");
      }
      const { reply } = (await res.json()) as { reply: string };
      setAvatarState("talking");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setTimeout(() => setAvatarState("idle"), Math.min(reply.length * 30, 3500));
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה לא צפויה");
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
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "סגור צ'אט" : "פתח צ'אט עם מולה"}
        className={cn(
          "fixed bottom-6 left-6 z-50 transition-all duration-300 hover:scale-110 active:scale-95",
          open ? "scale-105" : "",
        )}
        style={{ animation: open ? "none" : "mula-float 3s ease-in-out infinite" }}
      >
        {open ? (
          <div className="flex size-16 items-center justify-center rounded-full bg-amber-500 shadow-xl ring-2 ring-amber-300">
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
            <MulaDigitalHuman state="idle" size={64} />
          </div>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className={cn(
          "fixed bottom-28 left-6 z-50 flex w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10",
          "origin-bottom-left transition-all duration-300",
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0",
        )}
        dir="rtl"
        role="dialog"
        aria-label="צ'אט עם מולה"
        aria-hidden={!open}
        style={{ animation: open ? "mula-slide-up 0.3s ease-out" : "none" }}
      >
        {/* ── Header — big live avatar ── */}
        <div
          className="relative flex flex-col items-center gap-1 overflow-hidden pt-4 pb-3"
          style={{
            background: "linear-gradient(180deg, #0f0a1f 0%, #1a1035 60%, #2d1a5e 100%)",
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
            <p className="text-base leading-tight font-bold text-white">מולה</p>
            <span className="rounded-full bg-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-500/40">
              AI
            </span>
          </div>
          <p className="relative -mt-1 pb-1 text-xs text-amber-200/70">
            {avatarState === "thinking"
              ? "⋯ חושב"
              : avatarState === "talking"
                ? "▶ מדבר"
                : "עוזר קהילתי · Tedros"}
          </p>

          <button
            onClick={() => setOpen(false)}
            aria-label="סגור"
            className="absolute top-3 left-3 rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
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
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 transition-colors hover:border-amber-300 hover:bg-amber-100"
              >
                {q}
              </button>
            ))}
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
            placeholder="שאל את מולה..."
            disabled={loading}
            className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 transition-all placeholder:text-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none disabled:opacity-60"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            aria-label="שלח"
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
    </>
  );
}
