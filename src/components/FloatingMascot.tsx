import { useEffect, useState } from "react";
import mascotAsset from "@/assets/mascot/plank-astronaut.png.asset.json";

/**
 * Astronaut Plank mascot floating around the site.
 * - Fixed on the viewport so it drifts across every section.
 * - Horizontal position gently oscillates with scroll (side-to-side sway).
 * - Vertical position also shifts with scroll so it "swims" through the page.
 * - Continuous CSS bobbing + rotation for the zero-gravity feel.
 */
export function FloatingMascot() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = 0;
      });
    };
    const onResize = () => setVh(window.innerHeight);
    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Sway horizontally between ~5% and ~85% of viewport width based on scroll.
  const swayPhase = (scrollY / 600) % (Math.PI * 2);
  const leftPct = 45 + Math.sin(swayPhase) * 38; // 7% .. 83%
  // Drift vertically within the viewport as user scrolls.
  const topPct = 20 + ((Math.cos(swayPhase * 0.7) + 1) / 2) * 55; // 20% .. 75%
  const tilt = Math.sin(swayPhase) * 12; // degrees

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden md:block"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
        transition:
          "left 900ms cubic-bezier(.22,.61,.36,1), top 900ms cubic-bezier(.22,.61,.36,1), transform 900ms cubic-bezier(.22,.61,.36,1)",
        willChange: "left, top, transform",
      }}
    >
      <style>{`
        @keyframes mascot-float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%     { transform: translateY(-14px) rotate(3deg); }
        }
        .mascot-inner {
          animation: mascot-float 5.5s ease-in-out infinite;
          filter: drop-shadow(0 12px 24px rgba(11,15,42,0.35))
                  drop-shadow(0 0 18px rgba(232,184,109,0.25));
        }
      `}</style>
      <div className="mascot-inner">
        <img
          src={mascotAsset.url}
          alt=""
          className="h-auto w-24 lg:w-32 select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
