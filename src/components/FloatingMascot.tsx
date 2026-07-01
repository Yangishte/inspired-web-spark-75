import { useEffect, useRef, useState } from "react";
import mascotAsset from "@/assets/mascot/mascot.png.asset.json";

const WIDTH_DESKTOP = 60;
const HEIGHT_DESKTOP = 88;
const WIDTH_MOBILE = 42;
const HEIGHT_MOBILE = 62;
const SPEED_DESKTOP = 1.5 * 60; // px/s, normalisé à 60 FPS (~1.5 px/frame)
const SPEED_MOBILE = 1 * 60; // px/s, normalisé à 60 FPS (~1 px/frame)

/**
 * Floating mascot — DVD screensaver style.
 * - Fixed on the viewport, independent of scroll.
 * - Bounces off the 4 edges of the window.
 * - Picks a new random direction on every collision.
 * - Renders at the root level, outside of every page/route.
 * - Image is preserved (object-fit: contain) so the PNG is never stretched.
 */
export function FloatingMascot() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
      const width = checkMobile() ? WIDTH_MOBILE : WIDTH_DESKTOP;
      const height = checkMobile() ? HEIGHT_MOBILE : HEIGHT_DESKTOP;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Clamp inside the viewport after a resize.
      posRef.current.x = Math.min(Math.max(posRef.current.x, 0), w - width);
      posRef.current.y = Math.min(Math.max(posRef.current.y, 0), h - height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const speed = isMobile ? SPEED_MOBILE : SPEED_DESKTOP;
    const width = isMobile ? WIDTH_MOBILE : WIDTH_DESKTOP;
    const height = isMobile ? HEIGHT_MOBILE : HEIGHT_DESKTOP;

    // Random initial direction.
    const angle = Math.random() * Math.PI * 2;
    velRef.current = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
    posRef.current = { x: 0, y: 0 };

    let last = performance.now();

    const randomizeDirection = () => {
      const speed = isMobile ? SPEED_MOBILE : SPEED_DESKTOP;
      const angle = Math.random() * Math.PI * 2;
      velRef.current = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
    };

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05); // cap delta to avoid jumps
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      posRef.current.x += velRef.current.x * delta;
      posRef.current.y += velRef.current.y * delta;

      // Bounce off the four edges and pick a new random direction each time.
      if (posRef.current.x <= 0) {
        posRef.current.x = 0;
        randomizeDirection();
        velRef.current.x = Math.abs(velRef.current.x);
      } else if (posRef.current.x >= w - width) {
        posRef.current.x = w - width;
        randomizeDirection();
        velRef.current.x = -Math.abs(velRef.current.x);
      }

      if (posRef.current.y <= 0) {
        posRef.current.y = 0;
        randomizeDirection();
        velRef.current.y = Math.abs(velRef.current.y);
      } else if (posRef.current.y >= h - height) {
        posRef.current.y = h - height;
        randomizeDirection();
        velRef.current.y = -Math.abs(velRef.current.y);
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, isMobile]);

  if (!mounted) return null;

  const width = isMobile ? WIDTH_MOBILE : WIDTH_DESKTOP;
  const height = isMobile ? HEIGHT_MOBILE : HEIGHT_DESKTOP;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed"
      style={{
        top: 0,
        left: 0,
        zIndex: 9999,
        width,
        height,
        willChange: "transform",
      }}
    >
      <style>{`
        @keyframes mascot-tilt {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .mascot-inner {
          animation: mascot-tilt 5s ease-in-out infinite;
          transform-origin: center center;
        }
      `}</style>
      <div className="mascot-inner" style={{ width: "100%", height: "100%" }}>
        <img
          src={mascotAsset.url}
          alt=""
          width={width}
          height={height}
          draggable={false}
          className="select-none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
