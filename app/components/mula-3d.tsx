"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type AvatarState = "idle" | "thinking" | "talking";

type MulaDigitalHumanProps = {
  state?: AvatarState;
  size?: number;
  className?: string;
};

// כשהסרטונים יגיעו — שים אותם ב-/public:
//   /mula-idle.mp4      (מולה יושב, מהנהן קלות — 10 שניות)
//   /mula-thinking.mp4  (מולה מסתכל הצדה — 5 שניות)
//   /mula-talking.mp4   (מולה מדבר/מחייך — 8 שניות)
const VIDEOS: Record<AvatarState, string> = {
  idle: "/mula-idle.mp4",
  thinking: "/mula-thinking.mp4",
  talking: "/mula-talking.mp4",
};

export function MulaDigitalHuman({
  state = "idle",
  size = 120,
  className,
}: MulaDigitalHumanProps) {
  const [hasVideo, setHasVideo] = useState(false);
  const idleRef = useRef<HTMLVideoElement>(null);
  const thinkRef = useRef<HTMLVideoElement>(null);
  const talkRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0 });

  // בדוק אם קיים וידאו
  useEffect(() => {
    fetch(VIDEOS.idle, { method: "HEAD" })
      .then((r) => setHasVideo(r.ok))
      .catch(() => setHasVideo(false));
  }, []);

  // Mouse-tracking 3D effect (על הכלי כולו)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);
    let t = 0;
    const loop = () => {
      t += 0.016;
      const el = containerRef.current;
      if (el) {
        const tx = mouseRef.current.y * -6 + Math.sin(t * 0.8) * 1.2;
        const ty = mouseRef.current.x * 8;
        rotRef.current.x += (tx - rotRef.current.x) * 0.07;
        rotRef.current.y += (ty - rotRef.current.y) * 0.07;
        const breathe = 1 + Math.sin(t * 1.1) * 0.01;
        el.style.transform = `perspective(700px) rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg) scale(${breathe})`;
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // החלף וידאו לפי state
  useEffect(() => {
    if (!hasVideo) return;
    const refs = { idle: idleRef, thinking: thinkRef, talking: talkRef };
    Object.entries(refs).forEach(([k, ref]) => {
      if (!ref.current) return;
      if (k === state) {
        ref.current.currentTime = 0;
        ref.current.play().catch(() => {});
      } else {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  }, [state, hasVideo]);

  const ringSpeed = state === "thinking" ? "1s" : "5s";
  const glowColor =
    state === "talking" ? "#fbbf24" : state === "thinking" ? "#a78bfa" : "#f59e0b";

  return (
    <div
      className={cn("relative shrink-0 select-none", className)}
      style={{ width: size, height: size }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-xl"
        style={{
          background: `radial-gradient(circle, ${glowColor}55 0%, transparent 70%)`,
          transform: "scale(1.5)",
          transition: "background 0.5s",
        }}
      />

      {/* Spinning ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px solid transparent",
          borderTopColor: glowColor,
          borderRightColor: `${glowColor}44`,
          borderBottomColor: glowColor,
          borderLeftColor: `${glowColor}22`,
          animation: `mula-spin ${ringSpeed} linear infinite`,
          transition: "border-color 0.5s",
        }}
      />

      {/* Counter ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 3,
          border: "1px solid transparent",
          borderTopColor: `${glowColor}66`,
          borderBottomColor: `${glowColor}44`,
          animation: `mula-spin-rev ${state === "thinking" ? "1.5s" : "8s"} linear infinite`,
        }}
      />

      {/* ── תמונה/וידאו — 3D animated ── */}
      <div
        ref={containerRef}
        className="absolute overflow-hidden rounded-full"
        style={{
          inset: 6,
          willChange: "transform",
          boxShadow: `0 0 ${size * 0.18}px ${glowColor}55`,
          transition: "box-shadow 0.5s",
        }}
      >
        {hasVideo ? (
          /* ── סרטוני מולה ── */
          <>
            {(["idle", "thinking", "talking"] as AvatarState[]).map((s) => (
              <video
                key={s}
                ref={s === "idle" ? idleRef : s === "thinking" ? thinkRef : talkRef}
                src={VIDEOS[s]}
                loop
                muted
                playsInline
                className="absolute inset-0 size-full object-cover object-top"
                style={{ opacity: state === s ? 1 : 0, transition: "opacity 0.4s ease" }}
              />
            ))}
          </>
        ) : (
          /* ── Fallback: תמונה עם אנימציה עד שהסרטון יגיע ── */
          <>
            <img
              src="/mula.jpeg"
              alt="מולה"
              draggable={false}
              className="size-full object-cover object-top"
              style={{
                filter:
                  state === "thinking"
                    ? "brightness(0.85) saturate(0.7)"
                    : "brightness(1.05) saturate(1.1)",
                transition: "filter 0.4s",
              }}
            />
            {/* blink */}
            <div
              className="absolute inset-x-0 top-0 h-full bg-[#5c2a0d]"
              style={{
                transformOrigin: "top",
                animation: "mula-blink-overlay 6s ease-in-out infinite",
              }}
            />
            {/* talking glow */}
            {state === "talking" && (
              <div
                className="absolute inset-x-0 bottom-0 h-[28%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(251,191,36,0.18), transparent)",
                  animation: "mula-mouth-pulse 0.4s ease-in-out infinite alternate",
                }}
              />
            )}
            {state === "thinking" && (
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  animation: "mula-think-pulse 1s ease-in-out infinite alternate",
                }}
              />
            )}
          </>
        )}

        {/* Scan line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}99, transparent)`,
            animation: "mula-scan 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Orbiting dot */}
      <div className="pointer-events-none absolute inset-0">
        <div
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: glowColor,
            boxShadow: `0 0 8px ${glowColor}`,
            top: "50%",
            left: "50%",
            transformOrigin: `0 -${size / 2 + 1}px`,
            animation: `mula-spin ${state === "thinking" ? "1s" : "4s"} linear infinite`,
            marginTop: -3,
            marginLeft: -3,
          }}
        />
      </div>

      {/* Talking waveform */}
      {state === "talking" && (
        <div
          className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-end gap-0.5"
          style={{ height: 14 }}
        >
          {[0.5, 0.8, 1, 0.9, 0.6, 0.9, 0.5].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full"
              style={{
                height: `${h * 100}%`,
                background: glowColor,
                animation: `mula-wave-bar 0.45s ease-in-out infinite ${i * 0.07}s alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Thinking dots */}
      {state === "thinking" && (
        <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-violet-400"
              style={{
                animation: `mula-dot-bounce 0.7s ease-in-out infinite ${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Online dot */}
      {state === "idle" && (
        <span className="absolute right-1 bottom-1 flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-70" />
          <span className="relative inline-flex size-2.5 rounded-full bg-green-500 ring-1 ring-white" />
        </span>
      )}
    </div>
  );
}
