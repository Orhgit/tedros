import { cn } from "~/lib/utils";

type MulaAvatarProps = {
  size?: "sm" | "md" | "lg" | "xl";
  state?: "idle" | "thinking" | "talking";
  className?: string;
};

const SIZES = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export function MulaAvatar({ size = "md", state = "idle", className }: MulaAvatarProps) {
  const px = SIZES[size];

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: px, height: px }}
      aria-hidden
    >
      {/* Outer glow ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          state === "talking"
            ? "animate-[mula-ring-pulse_0.8s_ease-in-out_infinite]"
            : state === "thinking"
              ? "animate-[mula-ring-pulse_1.4s_ease-in-out_infinite]"
              : "animate-[mula-ring-idle_3s_ease-in-out_infinite]",
        )}
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)",
        }}
      />

      <svg
        width={px}
        height={px}
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg-grad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
          <radialGradient id="face-grad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#5c2a06" />
          </radialGradient>
          <radialGradient id="eye-shine" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <clipPath id="avatar-clip">
            <circle cx="48" cy="48" r="46" />
          </clipPath>
        </defs>

        {/* Background circle */}
        <circle cx="48" cy="48" r="46" fill="url(#bg-grad)" />

        {/* Subtle grid pattern overlay */}
        <circle cx="48" cy="48" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Body / shoulders */}
        <ellipse cx="48" cy="90" rx="30" ry="18" fill="#1C1917" clipPath="url(#avatar-clip)" />
        <ellipse cx="48" cy="82" rx="22" ry="12" fill="#292524" clipPath="url(#avatar-clip)" />

        {/* Shirt collar */}
        <path d="M35 78 L48 72 L61 78" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" clipPath="url(#avatar-clip)" />

        {/* Head — breathing animation */}
        <g
          style={{
            transformOrigin: "48px 46px",
            animation:
              state === "thinking"
                ? "mula-think 1.5s ease-in-out infinite"
                : "mula-breathe 3s ease-in-out infinite",
          }}
        >
          {/* Face shape */}
          <ellipse cx="48" cy="44" rx="22" ry="24" fill="url(#face-grad)" />

          {/* Ear left */}
          <ellipse cx="26.5" cy="44" rx="3.5" ry="4.5" fill="#7C3A0C" />
          {/* Ear right */}
          <ellipse cx="69.5" cy="44" rx="3.5" ry="4.5" fill="#7C3A0C" />

          {/* Hair */}
          <path
            d="M27 36 Q28 20 48 20 Q68 20 69 36 Q66 26 48 25 Q30 26 27 36Z"
            fill="#0f0a07"
          />

          {/* Eyebrows */}
          <path d="M35 33 Q39 31 43 33" stroke="#1a0f05" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M53 33 Q57 31 61 33" stroke="#1a0f05" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Left eye */}
          <g style={{ animation: "mula-blink 4s ease-in-out infinite" }}>
            <ellipse cx="39" cy="38" rx="4.5" ry="4.5" fill="#1a0a02" />
            <ellipse cx="39" cy="38" rx="3" ry="3" fill="#2d1409" />
            <circle cx="39" cy="38" r="1.8" fill="white" opacity="0.9" />
            {/* Pupil highlight */}
            <circle cx="40.2" cy="37" r="0.8" fill="white" />
          </g>

          {/* Right eye */}
          <g style={{ animation: "mula-blink 4s ease-in-out infinite 0.1s" }}>
            <ellipse cx="57" cy="38" rx="4.5" ry="4.5" fill="#1a0a02" />
            <ellipse cx="57" cy="38" rx="3" ry="3" fill="#2d1409" />
            <circle cx="57" cy="38" r="1.8" fill="white" opacity="0.9" />
            <circle cx="58.2" cy="37" r="0.8" fill="white" />
          </g>

          {/* Nose */}
          <path d="M46 43 Q48 47 50 43" stroke="#5c2808" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Mouth — changes with state */}
          {state === "talking" ? (
            <g style={{ animation: "mula-talk 0.4s ease-in-out infinite alternate" }}>
              <ellipse cx="48" cy="54" rx="6" ry="3.5" fill="#1a0a02" />
              <path d="M42 54 Q48 51 54 54" stroke="#8B4513" strokeWidth="1" fill="none" />
            </g>
          ) : state === "thinking" ? (
            <path d="M43 53 Q48 55 53 53" stroke="#8B5E3C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M42 53 Q48 58 54 53" stroke="#8B5E3C" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}

          {/* Cheek glow */}
          <ellipse cx="33" cy="47" rx="5" ry="3" fill="rgba(220,100,60,0.18)" />
          <ellipse cx="63" cy="47" rx="5" ry="3" fill="rgba(220,100,60,0.18)" />
        </g>

        {/* AI circuit lines decoration */}
        <g opacity="0.25" style={{ animation: "mula-circuit 3s ease-in-out infinite" }}>
          <path d="M6 48 L14 48 L18 44 L22 44" stroke="#FDE68A" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <circle cx="14" cy="48" r="1.2" fill="#FDE68A" />
          <path d="M90 48 L82 48 L78 44 L74 44" stroke="#FDE68A" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <circle cx="82" cy="48" r="1.2" fill="#FDE68A" />
          <path d="M48 6 L48 14 L52 18 L52 22" stroke="#FDE68A" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <circle cx="48" cy="14" r="1.2" fill="#FDE68A" />
        </g>

        {/* Border ring */}
        <circle cx="48" cy="48" r="45" stroke="rgba(251,191,36,0.6)" strokeWidth="2" fill="none" />
      </svg>

      {/* Thinking dots */}
      {state === "thinking" && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-amber-400"
              style={{ animation: `mula-dot-bounce 0.8s ease-in-out infinite ${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      {/* Online indicator */}
      {state === "idle" && (
        <span className="absolute bottom-0.5 right-0.5 flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-green-500 ring-1 ring-white" />
        </span>
      )}
    </div>
  );
}
