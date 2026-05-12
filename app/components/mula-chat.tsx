"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { MulaAvatar } from "./mula-avatar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

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

  useEffect(() => {
    if (open && messages.length === 0) {
      setAvatarState("talking");
      const timer = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "שלום! אני מולה 👋\nאני העוזר החכם של Tedros — פה לעזור לך למצוא כל מה שתצטרך. שאל אותי!",
          },
        ]);
        setAvatarState("idle");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
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
      // After "talking" period, go back to idle
      setTimeout(() => setAvatarState("idle"), Math.min(reply.length * 30, 3000));
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
      {/* Floating launcher button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "סגור צ'אט עם מולה" : "פתח צ'אט עם מולה"}
        className={cn(
          "fixed bottom-6 left-6 z-50 transition-all duration-300",
          "hover:scale-110 active:scale-95",
          open && "scale-105",
        )}
        style={{ animation: open ? "none" : "mula-float 3s ease-in-out infinite" }}
      >
        {open ? (
          <div className="flex size-16 items-center justify-center rounded-full bg-amber-500 shadow-xl ring-2 ring-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ) : (
          <MulaAvatar size="xl" state="idle" />
        )}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-28 left-6 z-50 flex w-[min(92vw,390px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10",
          "transition-all duration-300 origin-bottom-left",
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none",
        )}
        dir="rtl"
        role="dialog"
        aria-label="צ'אט עם מולה"
        aria-hidden={!open}
        style={{ animation: open ? "mula-slide-up 0.3s ease-out" : "none" }}
      >
        {/* Header with live avatar */}
        <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-l from-amber-700 via-amber-600 to-amber-500 px-4 py-3">
          {/* Background shimmer */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />

          <MulaAvatar size="lg" state={avatarState} className="shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-bold text-white text-lg leading-tight">מולה</p>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-amber-100">AI</span>
            </div>
            <p className="text-xs text-amber-100">
              {avatarState === "thinking"
                ? "חושב..."
                : avatarState === "talking"
                  ? "מדבר..."
                  : "עוזר קהילתי · Tedros"}
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="סגור"
            className="rounded-full p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex flex-col gap-3 overflow-y-auto px-4 py-4"
          style={{ maxHeight: "340px", minHeight: "180px" }}
        >
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center gap-3 py-6">
              <MulaAvatar size="xl" state="idle" />
              <p className="text-sm text-gray-400 text-center">מולה מוכן לעזור לך...</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-2 items-end",
                msg.role === "user" ? "flex-row-reverse" : "flex-row",
              )}
            >
              {msg.role === "assistant" && (
                <MulaAvatar size="sm" state="idle" className="-mb-1" />
              )}
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                  msg.role === "user"
                    ? "bg-amber-500 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm",
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2">
              <MulaAvatar size="sm" state="thinking" className="-mb-1" />
              <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 shadow-sm">
                <span className="flex gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="size-2 rounded-full bg-amber-400"
                      style={{ animation: `mula-dot-bounce 0.7s ease-in-out infinite ${d * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-500 border border-red-100">
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick questions — show only on first message */}
        {messages.length <= 1 && !loading && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-3">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/60 px-3 py-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="שאל את מולה..."
            disabled={loading}
            className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:opacity-60 transition-all"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            aria-label="שלח"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-md hover:bg-amber-600 active:scale-95 disabled:opacity-40 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 -rotate-90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
