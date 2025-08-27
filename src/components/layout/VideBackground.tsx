import { useEffect, useRef } from "react";

type Props = {
  /** number of animated beam lines */
  lines?: number;
  /** animation speed multiplier (1 = default) */
  speed?: number;
  /** center position (0..1, 0.5 = center) */
  cx?: number;
  cy?: number;
  /** extra classNames (positioning) */
  className?: string;
};

export default function VibeBackground({
  lines = 10,
  speed = 1,
  cx = 0.55,
  cy = 0.52,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let frame = 0;
    let running = true;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // beam model
    type Beam = {
      y: number; // start Y
      cpx: number; // control point x
      cpy: number; // control point y
      hue: number;
      t: number; // 0..1 moving dot
      v: number; // speed
      alpha: number;
      width: number;
    };

    const beams: Beam[] = [];
    const initBeams = () => {
      beams.length = 0;
      const { clientWidth: w, clientHeight: h } = canvas;
      for (let i = 0; i < lines; i++) {
        const y = h * (0.25 + Math.random() * 0.5);
        const cpx = w * (0.25 + Math.random() * 0.35);
        const cpy = h * (0.25 + Math.random() * 0.5);
        beams.push({
          y,
          cpx,
          cpy,
          hue: 210 + Math.random() * 80, // blue-violet range
          t: Math.random(),
          v: (0.002 + Math.random() * 0.003) * speed,
          alpha: 0.45 + Math.random() * 0.25,
          width: 1.2 + Math.random() * 1.6,
        });
      }
    };

    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      // background gradient (deep violet → navy)
      const g = ctx.createLinearGradient(0, 0, 0, h);
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        g.addColorStop(0, "#0b1020");
        g.addColorStop(1, "#1a0f2f");
      } else {
        g.addColorStop(0, "#dfe7ff");
        g.addColorStop(1, "#e9e2ff");
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // radial glows (top + bottom)
      const rg1 = ctx.createRadialGradient(
        w * cx,
        h * (cy - 0.18),
        0,
        w * cx,
        h * (cy - 0.18),
        Math.max(w, h) * 0.8
      );
      if (isDark) {
        rg1.addColorStop(0, "rgba(124,58,237,0.35)"); // violet
        rg1.addColorStop(1, "rgba(124,58,237,0)");
      } else {
        rg1.addColorStop(0, "rgba(99,102,241,0.28)");
        rg1.addColorStop(1, "rgba(99,102,241,0)");
      }
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = rg1;
      ctx.fillRect(0, 0, w, h);

      const rg2 = ctx.createRadialGradient(
        w * (cx - 0.4),
        h * (cy + 0.6),
        0,
        w * (cx - 0.4),
        h * (cy + 0.6),
        Math.max(w, h) * 0.9
      );
      if (isDark) {
        rg2.addColorStop(0, "rgba(16,185,129,0.18)"); // emerald
        rg2.addColorStop(1, "rgba(16,185,129,0)");
      } else {
        rg2.addColorStop(0, "rgba(5,150,105,0.12)");
        rg2.addColorStop(1, "rgba(5,150,105,0)");
      }
      ctx.fillStyle = rg2;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // beams + moving particles
      const endX = w * cx;
      const endY = h * cy;

      beams.forEach((b) => {
        // beam path (quadratic from left edge → center)
        const startX = -w * 0.1;
        ctx.beginPath();
        ctx.moveTo(startX, b.y);
        ctx.quadraticCurveTo(b.cpx, b.cpy, endX, endY);
        const grad = ctx.createLinearGradient(startX, b.y, endX, endY);
        const beamColor = `hsla(${b.hue},95%,70%,${b.alpha})`;
        grad.addColorStop(0, "rgba(255,255,255,0.0)");
        grad.addColorStop(0.35, `hsla(${b.hue},95%,68%,0.05)`);
        grad.addColorStop(0.7, `hsla(${b.hue},95%,70%,0.25)`);
        grad.addColorStop(1, beamColor);
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width;
        ctx.stroke();

        // moving dot along curve (param t)
        b.t += b.v;
        if (b.t > 1) b.t = 0;

        // position on quadratic
        const t = b.t;
        const x =
          (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * b.cpx + t * t * endX;
        const y =
          (1 - t) * (1 - t) * b.y + 2 * (1 - t) * t * b.cpy + t * t * endY;

        const dot = ctx.createRadialGradient(x, y, 0, x, y, 16);
        dot.addColorStop(0, `hsla(${b.hue},100%,85%,0.9)`);
        dot.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = dot;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
      });

      // subtle star field
      if (frame++ % 2 === 0) {
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < 25; i++) {
          const x = Math.random() * w;
          const y = Math.random() * h;
          const a = Math.random() * 0.08;
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // vignette
      const vg = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.max(w, h) * 0.2,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.8
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, isDark ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.15)");
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
    };

    const loop = () => {
      draw();
      if (!prefersReducedMotion && running) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    resize();
    initBeams();
    loop();

    window.addEventListener("resize", () => {
      resize();
      // re-init curves on resize for better composition
      initBeams();
    });

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lines, speed, cx, cy]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* center glow overlay (on top of canvas) */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-[28px] blur-3xl"
        style={{
          left: `${cx * 100}%`,
          top: `${cy * 100}%`,
          width: "220px",
          height: "220px",
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.15), rgba(255,255,255,0))",
        }}
      />
    </div>
  );
}
