import { cn } from "~/lib/utils";

type MulaAvatarProps = {
  size?: "sm" | "md" | "lg" | "xl";
  state?: "idle" | "thinking" | "talking";
  className?: string;
};

const SIZES = { sm: 32, md: 48, lg: 64, xl: 96 };

export function MulaAvatar({ size = "md", state = "idle", className }: MulaAvatarProps) {
  const px = SIZES[size];

  const ringAnim =
    state === "talking"
      ? "mula-ring-talk 0.7s ease-in-out infinite"
      : state === "thinking"
        ? "mula-ring-think 1.2s ease-in-out infinite"
        : "mula-ring-idle 3s ease-in-out infinite";

  const faceAnim =
    state === "thinking"
      ? "mula-head-think 1.4s ease-in-out infinite"
      : "mula-breathe 3.5s ease-in-out infinite";

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: px, height: px }}
      aria-hidden
    >
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            state === "talking"
              ? "radial-gradient(circle, rgba(251,191,36,0.5) 0%, transparent 70%)"
              : state === "thinking"
                ? "radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)",
          animation: ringAnim,
          transform: "scale(1.3)",
        }}
      />

      {/* Spinning ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "transparent",
          border: `${Math.max(1.5, px * 0.025)}px solid transparent`,
          borderTopColor: "#fbbf24",
          borderRightColor: "rgba(251,191,36,0.3)",
          borderBottomColor: "#f59e0b",
          borderLeftColor: "rgba(251,191,36,0.15)",
          animation:
            state === "thinking"
              ? "mula-spin 1s linear infinite"
              : "mula-spin 6s linear infinite",
        }}
      />

      {/* Counter ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: px * 0.04,
          background: "transparent",
          border: `${Math.max(1, px * 0.015)}px solid transparent`,
          borderTopColor: "rgba(167,139,250,0.5)",
          borderBottomColor: "rgba(167,139,250,0.5)",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          animation: "mula-spin-rev 4s linear infinite",
        }}
      />

      {/* Photo container — breathing / head movement */}
      <div
        className="absolute overflow-hidden rounded-full"
        style={{
          inset: px * 0.08,
          animation: faceAnim,
          transformOrigin: "50% 60%",
        }}
      >
        {/* Blink overlay */}
        <div
          className="absolute inset-x-0 z-10 bg-black"
          style={{
            top: 0,
            height: "100%",
            transformOrigin: "top",
            animation: "mula-blink-overlay 6s ease-in-out infinite",
          }}
        />

        {/* The actual photo */}
        <img
          src="/mula.jpeg"
          alt="מולה"
          className="size-full object-cover object-top"
          style={{ filter: state === "thinking" ? "brightness(0.9) saturate(0.8)" : "brightness(1) saturate(1.05)" }}
        />

        {/* Subtle holographic shimmer on photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(251,191,36,0.08) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "mula-shimmer-face 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Talking waveform indicator */}
      {state === "talking" && (
        <div
          className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-end gap-0.5"
          style={{ height: Math.max(10, px * 0.15) }}
        >
          {[0.6, 1, 0.8, 1, 0.6].map((h, i) => (
            <div
              key={i}
              className="w-0.5 rounded-full bg-amber-400"
              style={{
                height: `${h * 100}%`,
                animation: `mula-wave-bar 0.5s ease-in-out infinite ${i * 0.08}s alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Online indicator (idle only) */}
      {state === "idle" && (
        <span className="absolute bottom-0.5 right-0.5 flex" style={{ width: px * 0.16, height: px * 0.16 }}>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex size-full rounded-full bg-green-500 ring-1 ring-white" />
        </span>
      )}

      {/* Thinking dots */}
      {state === "thinking" && (
        <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-violet-400"
              style={{ animation: `mula-dot-bounce 0.7s ease-in-out infinite ${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
