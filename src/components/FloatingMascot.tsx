import { useEffect, useState } from "react";
import mascotAsset from "@/assets/mascot/plank-mascot.png.asset.json";

/**
 * Floating plank mascot.
 * - Drifts gently across the viewport on its own (no scroll dependency).
 * - Visible in every section because it is fixed to the viewport.
 * - Slow, small-amplitude motion so it livens the page without blocking content.
 */
export function FloatingMascot() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let raf = 0;
    let start = performance.now();

    const tick = (now: number) => {
      setTime((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Slow, gentle drift along the far right edge: covers the whole page
  // vertically without crossing the main content area.
  // Long periods (50–80s) keep the motion calm and unobtrusive.
  const leftPct = 90 + Math.sin(time * 0.10) * 5;   // 85% .. 95%
  const topPct = 50 + Math.cos(time * 0.06) * 28;    // 22% .. 78%
  const tilt = Math.sin(time * 0.07) * 6;            // -6° .. 6°

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden md:block"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
        transition:
          "left 1.4s cubic-bezier(.22,.61,.36,1), top 1.4s cubic-bezier(.22,.61,.36,1), transform 1.4s cubic-bezier(.22,.61,.36,1)",
        willChange: "left, top, transform",
      }}
    >
      <style>{`
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-6px) rotate(2deg); }
        }
        .mascot-inner {
          animation: mascot-float 5s ease-in-out infinite;
          filter: drop-shadow(0 8px 16px rgba(11,15,42,0.30))
                  drop-shadow(0 0 12px rgba(232,184,109,0.20));
        }
      `}</style>
      <div className="mascot-inner">
        <img
          src={mascotAsset.url}
          alt=""
          className="h-auto w-14 lg:w-16 select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}


