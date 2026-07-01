import { useEffect, useState } from "react";
import mascotImg from "@/assets/mascot/plank-no-helmet.png";

/**
 * Floating wooden plank mascot (no helmet) drifting around the site.
 * - Fixed on the viewport so it appears in every section.
 * - Scroll-driven horizontal/vertical sway plus a continuous time-based drift.
 * - CSS bobbing + rotation keeps it in motion even when the page isn't scrolling.
 */
export function FloatingMascot() {
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let scrollRaf = 0;
    let timeRaf = 0;
    let start = performance.now();

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        scrollRaf = 0;
      });
    };

    const tick = (now: number) => {
      setTime((now - start) / 1000);
      timeRaf = requestAnimationFrame(tick);
    };

    onScroll();
    timeRaf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (timeRaf) cancelAnimationFrame(timeRaf);
    };
  }, []);

  // Scroll-driven sway: horizontal 5% .. 85%, vertical 18% .. 78%.
  const swayPhase = (scrollY / 600) % (Math.PI * 2);
  const scrollLeft = 45 + Math.sin(swayPhase) * 38;
  const scrollTop = 20 + ((Math.cos(swayPhase * 0.7) + 1) / 2) * 55;
  const scrollTilt = Math.sin(swayPhase) * 10;

  // Continuous time-based drift so it never stays perfectly still.
  const driftLeft = Math.sin(time * 0.4) * 3; // +/- 3%
  const driftTop = Math.cos(time * 0.35) * 4; // +/- 4%
  const driftRotate = Math.sin(time * 0.6) * 6;

  const leftPct = scrollLeft + driftLeft;
  const topPct = scrollTop + driftTop;
  const tilt = scrollTilt + driftRotate;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden md:block"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
        transition:
          "left 700ms cubic-bezier(.22,.61,.36,1), top 700ms cubic-bezier(.22,.61,.36,1), transform 700ms cubic-bezier(.22,.61,.36,1)",
        willChange: "left, top, transform",
      }}
    >
      <style>{`
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25%      { transform: translateY(-10px) rotate(2.5deg); }
          50%      { transform: translateY(-18px) rotate(0deg); }
          75%      { transform: translateY(-8px) rotate(-2.5deg); }
        }
        .mascot-inner {
          animation: mascot-float 3.2s ease-in-out infinite;
          filter: drop-shadow(0 10px 20px rgba(11,15,42,0.35))
                  drop-shadow(0 0 14px rgba(232,184,109,0.25));
        }
      `}</style>
      <div className="mascot-inner">
        <img
          src={mascotImg}
          alt=""
          className="h-auto w-16 lg:w-20 select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

