"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type AvatarState = "idle" | "thinking" | "talking";

type MulaDigitalHumanProps = {
  state?: AvatarState;
  size?: number;
  className?: string;
};

export function MulaDigitalHuman({ state = "idle", size = 120, className }: MulaDigitalHumanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize -1 to +1 relative to viewport centre
      mouseRef.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.5))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.5))),
      };
    };
    window.addEventListener("mousemove", handleMouse);

    let t = 0;
    const animate = () => {
      t += 0.016;
      const el = containerRef.current;
      if (el) {
        // Lerp toward target
        const targetX = mouseRef.current.y * -8 + Math.sin(t * 0.7) * 1.5;
        const targetY = mouseRef.current.x * 10;
        currentRotRef.current.x += (targetX - currentRotRef.current.x) * 0.06;
        currentRotRef.current.y += (targetY - currentRotRef.current.y) * 0.06;

        const breathe = 1 + Math.sin(t * 1.1) * 0.012;
        const thinkSway = state === "thinking" ? Math.sin(t * 2.5) * 3 : 0;

        el.style.transform = `
          perspective(600px)
          rotateX(${currentRotRef.current.x}deg)
          rotateY(${currentRotRef.current.y + thinkSway}deg)
          scale(${breathe})
        `;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(frameRef.current);
    };
  }, [state]);

  const glowColor = state === "talking"
    ? "rgba(251,191,36,0.7)"
    : state === "thinking"
      ? "rgba(139,92,246,0.6)"
      : "rgba(251,191,36,0.35)";

  const ringSpeed = state === "thinking" ? "0.8s" : "4s";

  if (!mounted) return <div style={{ width: size, height: size }} className={className} />;

  return (
    <div
      className={cn("relative shrink-0 select-none", className)}
      style={{ width: size, height: size }}
    >
      {/* Ambient glow behind */}
      <div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: "scale(1.4)",
          transition: "background 0.5s ease",
          animation: "mula-halo-idle 2.5s ease-in-out infinite",
        }}
      />

      {/* Spinning outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px solid transparent",
          borderTopColor: "#fbbf24",
          borderRightColor: "rgba(251,191,36,0.25)",
          borderBottomColor: "#f59e0b",
          borderLeftColor: "rgba(251,191,36,0.1)",
          animation: `mula-spin ${ringSpeed} linear infinite`,
        }}
      />
      {/* Counter ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 3,
          border: "1px solid transparent",
          borderTopColor: "rgba(167,139,250,0.5)",
          borderBottomColor: "rgba(167,139,250,0.4)",
          animation: `mula-spin-rev ${state === "thinking" ? "1.2s" : "6s"} linear infinite`,
        }}
      />

      {/* ── THE PHOTO — 3D animated ── */}
      <div
        ref={containerRef}
        className="absolute overflow-hidden rounded-full"
        style={{
          inset: 6,
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: `inset 0 0 ${size * 0.15}px rgba(0,0,0,0.4), 0 0 ${size * 0.2}px ${glowColor}`,
          transition: "box-shadow 0.4s ease",
        }}
      >
        <img
          src="/mula.jpeg"
          alt="מולה"
          draggable={false}
          className="size-full object-cover object-top"
          style={{
            filter: state === "thinking"
              ? "brightness(0.85) saturate(0.7) hue-rotate(20deg)"
              : "brightness(1.05) saturate(1.1) contrast(1.05)",
            transition: "filter 0.4s ease",
          }}
        />

        {/* Blink overlay */}
        <div
          className="absolute inset-x-0 top-0 bg-[#5c2a0d]"
          style={{
            height: "100%",
            transformOrigin: "top",
            animation: "mula-blink-overlay 6s ease-in-out infinite",
          }}
        />

        {/* Talking mouth glow overlay */}
        {state === "talking" && (
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "28%",
              background: "linear-gradient(to top, rgba(251,191,36,0.15), transparent)",
              animation: "mula-mouth-pulse 0.4s ease-in-out infinite alternate",
            }}
          />
        )}

        {/* Holographic scan line */}
        <div
          className="absolute inset-x-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)",
            animation: "mula-scan 3s ease-in-out infinite",
            top: 0,
          }}
        />

        {/* Thinking colour tint pulse */}
        {state === "thinking" && (
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(139,92,246,0.12)",
              animation: "mula-think-pulse 1s ease-in-out infinite alternate",
            }}
          />
        )}
      </div>

      {/* Orbiting dot */}
      <div className="absolute inset-0">
        <div
          style={{
            position: "absolute",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: state === "thinking" ? "#a78bfa" : "#fbbf24",
            boxShadow: `0 0 6px ${state === "thinking" ? "#a78bfa" : "#fbbf24"}`,
            top: "50%",
            left: "50%",
            transformOrigin: `0 -${size / 2 + 2}px`,
            animation: `mula-spin ${state === "thinking" ? "1s" : "4s"} linear infinite`,
            marginTop: -3.5,
            marginLeft: -3.5,
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
            <div key={i} className="w-1 rounded-full bg-amber-400"
              style={{ height: `${h * 100}%`, animation: `mula-wave-bar 0.45s ease-in-out infinite ${i * 0.07}s alternate` }}
            />
          ))}
        </div>
      )}

      {/* Thinking dots */}
      {state === "thinking" && (
        <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-violet-400"
              style={{ animation: `mula-dot-bounce 0.7s ease-in-out infinite ${i * 0.15}s` }} />
          ))}
        </div>
      )}

      {/* Online dot */}
      {state === "idle" && (
        <span className="absolute bottom-1 right-1 flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-70" />
          <span className="relative inline-flex size-2.5 rounded-full bg-green-500 ring-1 ring-white" />
        </span>
      )}
    </div>
  );
}
