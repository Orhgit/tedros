"use client";

import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

type AvatarState = "idle" | "thinking" | "talking";

type MulaDigitalHumanProps = {
  state?: AvatarState;
  size?: number;
  className?: string;
};

export function MulaDigitalHuman({
  state = "idle",
  size = 120,
  className,
}: MulaDigitalHumanProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const blinkTimerRef = useRef(Math.random() * 180 + 60);
  const blinkRef = useRef(0);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.44;

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const parentRect = (canvas!.closest("[data-mula-scene]") as HTMLElement)?.getBoundingClientRect() ?? rect;
      mouseRef.current = {
        x: (e.clientX - parentRect.left) / parentRect.width,
        y: (e.clientY - parentRect.top) / parentRect.height,
      };
    }
    window.addEventListener("mousemove", handleMouseMove);

    function drawFrame(t: number) {
      if (!ctx) return;
      timeRef.current = t * 0.001;
      const time = timeRef.current;
      const s = stateRef.current;

      ctx.clearRect(0, 0, size, size);

      // ── Mouse-driven head offset (parallax feel) ──
      const mx = (mouseRef.current.x - 0.5) * 10;
      const my = (mouseRef.current.y - 0.5) * 8;

      // ── Breathing ──
      const breathScale = 1 + Math.sin(time * 1.1) * 0.012;
      const breathY = Math.sin(time * 1.1) * 1.5;

      // ── State modifiers ──
      const thinkSway = s === "thinking" ? Math.sin(time * 2.2) * 3 : 0;
      const headX = cx + mx + thinkSway;
      const headY = cy + my + breathY;

      ctx.save();
      ctx.translate(headX, headY);
      ctx.scale(breathScale, breathScale);
      ctx.translate(-cx, -cy);

      // ── BACKGROUND GLOW ──
      const bgGlow = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.6);
      bgGlow.addColorStop(0, s === "thinking" ? "rgba(139,92,246,0.18)" : s === "talking" ? "rgba(251,191,36,0.2)" : "rgba(245,158,11,0.12)");
      bgGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, size, size);

      // ── NECK ──
      const neckGrad = ctx.createLinearGradient(cx - 14, cy + r * 0.7, cx + 14, cy + r * 0.7);
      neckGrad.addColorStop(0, "#3d1a0a");
      neckGrad.addColorStop(0.5, "#5c2a0d");
      neckGrad.addColorStop(1, "#3d1a0a");
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy + r);
      ctx.lineTo(cx - 16, size * 0.98);
      ctx.lineTo(cx + 16, size * 0.98);
      ctx.lineTo(cx + 14, cy + r);
      ctx.fillStyle = neckGrad;
      ctx.fill();

      // ── SHIRT COLLAR ──
      ctx.beginPath();
      ctx.moveTo(cx - 28, size * 0.98);
      ctx.lineTo(cx - 14, cy + r * 0.85);
      ctx.lineTo(cx, cy + r * 0.72);
      ctx.lineTo(cx + 14, cy + r * 0.85);
      ctx.lineTo(cx + 28, size * 0.98);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();
      // Jacket lapels
      ctx.beginPath();
      ctx.moveTo(cx - 28, size * 0.98);
      ctx.lineTo(cx - 14, cy + r * 0.85);
      ctx.lineTo(cx - 6, cy + r * 0.78);
      ctx.lineTo(cx - 20, size * 0.98);
      ctx.fillStyle = "#1a1a2e";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx + 28, size * 0.98);
      ctx.lineTo(cx + 14, cy + r * 0.85);
      ctx.lineTo(cx + 6, cy + r * 0.78);
      ctx.lineTo(cx + 20, size * 0.98);
      ctx.fillStyle = "#1a1a2e";
      ctx.fill();

      // ── SKULL / HEAD SHAPE ──
      const faceGrad = ctx.createRadialGradient(cx - r * 0.15, cy - r * 0.1, r * 0.1, cx, cy, r);
      faceGrad.addColorStop(0, "#7a3a12");
      faceGrad.addColorStop(0.4, "#5c2a0d");
      faceGrad.addColorStop(1, "#2d1005");
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 0.82, r, 0, 0, Math.PI * 2);
      ctx.fillStyle = faceGrad;
      ctx.fill();

      // ── EARS ──
      [cx - r * 0.82, cx + r * 0.82].forEach((ex, i) => {
        const earGrad = ctx.createRadialGradient(ex, cy, 0, ex, cy, r * 0.14);
        earGrad.addColorStop(0, "#6b3010");
        earGrad.addColorStop(1, "#3d1a06");
        ctx.beginPath();
        ctx.ellipse(ex, cy + r * 0.05, r * 0.1, r * 0.15, i === 0 ? -0.1 : 0.1, 0, Math.PI * 2);
        ctx.fillStyle = earGrad;
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(ex, cy + r * 0.05, r * 0.055, r * 0.09, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#4a2008";
        ctx.fill();
      });

      // ── HAIR ──
      const hairGrad = ctx.createRadialGradient(cx, cy - r * 0.7, r * 0.1, cx, cy - r * 0.4, r * 0.9);
      hairGrad.addColorStop(0, "#1a0f05");
      hairGrad.addColorStop(0.6, "#0d0703");
      hairGrad.addColorStop(1, "#080402");
      ctx.beginPath();
      ctx.ellipse(cx, cy - r * 0.3, r * 0.82, r * 0.72, 0, Math.PI, 0);
      ctx.fillStyle = hairGrad;
      ctx.fill();
      // Hairline detail
      ctx.beginPath();
      ctx.ellipse(cx, cy - r * 0.25, r * 0.75, r * 0.62, 0, Math.PI, 0);
      ctx.fillStyle = "#0d0703";
      ctx.fill();

      // ── EYEBROWS ──
      ctx.lineWidth = r * 0.055;
      ctx.lineCap = "round";
      const brows: [number, number, number, number][] = [
        [cx - r * 0.42, cy - r * 0.22, cx - r * 0.13, cy - r * 0.28],
        [cx + r * 0.13, cy - r * 0.28, cx + r * 0.42, cy - r * 0.22],
      ];
      brows.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo((x1 + x2) / 2, y1 - r * 0.04, x2, y2);
        ctx.strokeStyle = "#120804";
        ctx.stroke();
      });

      // ── BLINK logic ──
      blinkTimerRef.current -= 1;
      if (blinkTimerRef.current <= 0) {
        blinkRef.current = 12;
        blinkTimerRef.current = Math.random() * 200 + 80;
      }
      if (blinkRef.current > 0) blinkRef.current -= 1;
      const blinkProgress = blinkRef.current > 6
        ? 1 - (blinkRef.current - 6) / 6
        : blinkRef.current / 6;

      // ── EYES ──
      const eyePositions = [
        { x: cx - r * 0.3, y: cy - r * 0.08 },
        { x: cx + r * 0.3, y: cy - r * 0.08 },
      ];
      eyePositions.forEach(({ x: ex, y: ey }, idx) => {
        const eyeR = r * 0.155;

        // Eye socket shadow
        ctx.beginPath();
        ctx.ellipse(ex, ey + eyeR * 0.1, eyeR * 1.3, eyeR * 1.1, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fill();

        // Eyeball
        ctx.beginPath();
        ctx.ellipse(ex, ey, eyeR, eyeR * (1 - blinkProgress * 0.9), 0, 0, Math.PI * 2);
        const eyeGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, eyeR);
        eyeGrad.addColorStop(0, "#1a0900");
        eyeGrad.addColorStop(0.5, "#0d0500");
        eyeGrad.addColorStop(1, "#060200");
        ctx.fillStyle = eyeGrad;
        ctx.fill();

        if (blinkProgress < 0.7) {
          // Iris
          ctx.beginPath();
          ctx.ellipse(ex, ey, eyeR * 0.65, eyeR * 0.65 * (1 - blinkProgress * 0.9), 0, 0, Math.PI * 2);
          const irisGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, eyeR * 0.65);
          irisGrad.addColorStop(0, "#2d1506");
          irisGrad.addColorStop(0.5, "#3d2008");
          irisGrad.addColorStop(1, "#1a0a03");
          ctx.fillStyle = irisGrad;
          ctx.fill();

          // Pupil
          ctx.beginPath();
          ctx.ellipse(ex, ey, eyeR * 0.3, eyeR * 0.3, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#000";
          ctx.fill();

          // Eye shine
          ctx.beginPath();
          ctx.ellipse(ex + eyeR * 0.22, ey - eyeR * 0.25, eyeR * 0.16, eyeR * 0.12, -0.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.88)";
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(ex - eyeR * 0.15, ey + eyeR * 0.2, eyeR * 0.07, eyeR * 0.05, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.fill();

          // Talking eye flicker
          if (s === "talking") {
            ctx.beginPath();
            ctx.ellipse(ex, ey, eyeR * 0.72, eyeR * 0.72, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(251,191,36,${0.3 + Math.sin(time * 8 + idx) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Eyelid
        if (blinkProgress > 0) {
          ctx.beginPath();
          ctx.ellipse(ex, ey - eyeR * (1 - blinkProgress), eyeR * 1.1, eyeR * blinkProgress, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#5c2a0d";
          ctx.fill();
        }
      });

      // ── NOSE ──
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.08, cy + r * 0.05);
      ctx.bezierCurveTo(cx - r * 0.14, cy + r * 0.22, cx - r * 0.18, cy + r * 0.3, cx - r * 0.12, cy + r * 0.32);
      ctx.bezierCurveTo(cx, cy + r * 0.38, cx + r * 0.12, cy + r * 0.32, cx + r * 0.18, cy + r * 0.3);
      ctx.bezierCurveTo(cx + r * 0.14, cy + r * 0.22, cx + r * 0.08, cy + r * 0.05, cx, cy + r * 0.02);
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fill();
      // Nostrils
      [-r * 0.13, r * 0.13].forEach((nx) => {
        ctx.beginPath();
        ctx.ellipse(cx + nx, cy + r * 0.32, r * 0.08, r * 0.055, nx < 0 ? -0.3 : 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
      });

      // ── MOUTH ──
      const mouthY = cy + r * 0.55;
      const talkAmp = s === "talking" ? Math.abs(Math.sin(time * 7)) * r * 0.12 : 0;
      const smileAmt = s === "talking" ? 0.04 : 0.1;

      // Mouth shadow
      ctx.beginPath();
      ctx.ellipse(cx, mouthY + talkAmp * 0.3, r * 0.32, r * 0.06 + talkAmp * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fill();

      // Lips
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.28, mouthY);
      ctx.bezierCurveTo(cx - r * 0.14, mouthY - r * smileAmt, cx + r * 0.14, mouthY - r * smileAmt, cx + r * 0.28, mouthY);
      ctx.bezierCurveTo(cx + r * 0.14, mouthY + r * 0.07 + talkAmp, cx - r * 0.14, mouthY + r * 0.07 + talkAmp, cx - r * 0.28, mouthY);
      if (talkAmp > r * 0.03) {
        ctx.fillStyle = "#1a0800";
        ctx.fill();
      }
      // Upper lip
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.28, mouthY);
      ctx.bezierCurveTo(cx - r * 0.16, mouthY - r * 0.09, cx - r * 0.06, mouthY - r * 0.07, cx, mouthY - r * 0.05);
      ctx.bezierCurveTo(cx + r * 0.06, mouthY - r * 0.07, cx + r * 0.16, mouthY - r * 0.09, cx + r * 0.28, mouthY);
      ctx.strokeStyle = "#3d1a08";
      ctx.lineWidth = r * 0.025;
      ctx.stroke();
      // Smile line
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.28, mouthY);
      ctx.bezierCurveTo(cx - r * 0.14, mouthY + r * smileAmt * 1.5, cx + r * 0.14, mouthY + r * smileAmt * 1.5, cx + r * 0.28, mouthY);
      ctx.strokeStyle = "#3d1a08";
      ctx.lineWidth = r * 0.025;
      ctx.stroke();

      // Teeth when talking
      if (talkAmp > r * 0.04) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.28, mouthY);
        ctx.bezierCurveTo(cx - r * 0.14, mouthY - r * smileAmt, cx + r * 0.14, mouthY - r * smileAmt, cx + r * 0.28, mouthY);
        ctx.bezierCurveTo(cx + r * 0.14, mouthY + r * 0.07 + talkAmp, cx - r * 0.14, mouthY + r * 0.07 + talkAmp, cx - r * 0.28, mouthY);
        ctx.clip();
        ctx.fillStyle = "#f8f6f0";
        ctx.fillRect(cx - r * 0.24, mouthY - r * 0.01, r * 0.48, r * 0.1);
        ctx.restore();
      }

      // ── FACE SHADING / DEPTH ──
      const shadowL = ctx.createRadialGradient(cx - r * 0.85, cy, 0, cx - r * 0.5, cy, r * 0.9);
      shadowL.addColorStop(0, "rgba(0,0,0,0.25)");
      shadowL.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 0.82, r, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowL;
      ctx.fill();

      const highlightGrad = ctx.createRadialGradient(cx + r * 0.15, cy - r * 0.25, 0, cx + r * 0.15, cy, r * 0.55);
      highlightGrad.addColorStop(0, "rgba(255,255,255,0.06)");
      highlightGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 0.82, r, 0, 0, Math.PI * 2);
      ctx.fillStyle = highlightGrad;
      ctx.fill();

      ctx.restore(); // end head transform

      // ── AI RINGS (outside head transform) ──
      const ringPulse = 0.5 + Math.sin(time * 2) * 0.5;
      const ringColor = s === "thinking" ? `rgba(139,92,246,${0.5 + ringPulse * 0.4})`
        : s === "talking" ? `rgba(251,191,36,${0.6 + ringPulse * 0.4})`
        : `rgba(245,158,11,${0.3 + ringPulse * 0.2})`;

      // Spinning dashed ring
      ctx.save();
      ctx.translate(cx + mx * 0.3, cy + my * 0.3);
      ctx.rotate(time * (s === "thinking" ? 2.5 : 0.5));
      ctx.beginPath();
      ctx.arc(0, 0, r + r * 0.1, 0, Math.PI * 2);
      ctx.setLineDash([r * 0.15, r * 0.1]);
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Counter ring
      ctx.save();
      ctx.translate(cx + mx * 0.2, cy + my * 0.2);
      ctx.rotate(-time * 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, r + r * 0.18, 0, Math.PI * 2);
      ctx.setLineDash([r * 0.06, r * 0.25]);
      ctx.strokeStyle = s === "thinking" ? "rgba(167,139,250,0.35)" : "rgba(251,191,36,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Orbiting dot
      const orbitAngle = time * (s === "thinking" ? 3 : 1);
      const orbitR = r + r * 0.1;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(orbitAngle) * orbitR + mx * 0.4, cy + Math.sin(orbitAngle) * orbitR + my * 0.4, 3, 0, Math.PI * 2);
      ctx.fillStyle = s === "thinking" ? "#a78bfa" : "#fbbf24";
      ctx.fill();

      // ── TALKING WAVEFORM ──
      if (s === "talking") {
        const bars = 7;
        const barW = r * 0.07;
        const waveY = cy + r + r * 0.25;
        for (let i = 0; i < bars; i++) {
          const bh = r * 0.08 + r * 0.14 * Math.abs(Math.sin(time * 8 + i * 0.7));
          const bx = cx - (bars / 2 - i) * (barW + 3);
          const barGrad = ctx.createLinearGradient(bx, waveY - bh, bx, waveY + bh);
          barGrad.addColorStop(0, "rgba(251,191,36,0.9)");
          barGrad.addColorStop(1, "rgba(245,158,11,0.3)");
          ctx.beginPath();
          ctx.roundRect(bx - barW / 2, waveY - bh, barW, bh * 2, 3);
          ctx.fillStyle = barGrad;
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(drawFrame);
    }

    frameRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={cn("block", className)}
      style={{ width: size, height: size, imageRendering: "pixelated" }}
    />
  );
}
