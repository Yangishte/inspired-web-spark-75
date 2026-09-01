import { useEffect, useRef, type ReactNode } from "react";

/**
 * Infinite horizontal marquee with drag control (native touch + mouse).
 * Children are rendered three times; the track wraps seamlessly using a modulo offset.
 * Touch uses non-passive touch events so the browser never steals the gesture
 * (pointercancel on mobile used to kill the drag). A click is only suppressed
 * when the pointer actually moved, so links inside stay tappable/clickable.
 */
export function PartnersMarquee({
  children,
  speed = 40,
  className = "",
}: {
  children: ReactNode;
  /** px per second */
  speed?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const active = useRef(false);
  const dragging = useRef(false);
  const moved = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const startY = useRef(0);
  const lastT = useRef(0);

  // animation loop
  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let prev = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(now - prev, 64) / 1000;
      prev = now;
      const width = set.offsetWidth || 1;

      if (dragging.current) {
        // offset driven by drag handlers
      } else if (Math.abs(velocity.current) > 5) {
        offset.current += velocity.current * dt;
        velocity.current *= 0.94;
      } else if (!reduce) {
        offset.current -= speed * dt;
      }

      offset.current = ((offset.current % width) + width) % width;
      track.style.transform = `translate3d(${offset.current - width}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const begin = (x: number, y: number) => {
    active.current = true;
    dragging.current = false;
    moved.current = 0;
    velocity.current = 0;
    lastX.current = x;
    startY.current = y;
    lastT.current = performance.now();
  };

  /** returns true when the gesture is a horizontal drag (caller may preventDefault) */
  const move = (x: number, y: number): boolean => {
    if (!active.current) return false;
    const dx = x - lastX.current;
    moved.current += Math.abs(dx);
    if (!dragging.current) {
      const dy = Math.abs(y - startY.current);
      if (moved.current < 6) {
        lastX.current = x;
        return false;
      }
      // vertical intent wins -> let the page scroll
      if (dy > moved.current) {
        active.current = false;
        return false;
      }
      dragging.current = true;
    }
    const now = performance.now();
    const dt = Math.max(now - lastT.current, 1) / 1000;
    offset.current += dx;
    velocity.current = dx / dt;
    lastX.current = x;
    lastT.current = now;
    return true;
  };

  const end = () => {
    active.current = false;
    if (dragging.current) {
      requestAnimationFrame(() => {
        dragging.current = false;
      });
    }
  };

  // native touch listeners (non-passive so we can keep the gesture)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      begin(t.clientX, t.clientY);
    };
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      if (move(t.clientX, t.clientY) && e.cancelable) e.preventDefault();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", end);
    el.addEventListener("touchcancel", end);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", end);
      el.removeEventListener("touchcancel", end);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-grab active:cursor-grabbing [&_img]:pointer-events-none ${className}`}
      style={{ touchAction: "pan-y" }}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        begin(e.clientX, e.clientY);
      }}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onMouseUp={end}
      onMouseLeave={end}
      onClickCapture={(e) => {
        if (dragging.current || moved.current > 6) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={setRef} className="flex w-max shrink-0 items-center gap-10 md:gap-12 pr-10 md:pr-12">
          {children}
        </div>
        <div className="flex w-max shrink-0 items-center gap-10 md:gap-12 pr-10 md:pr-12" aria-hidden="true">
          {children}
        </div>
        <div className="flex w-max shrink-0 items-center gap-10 md:gap-12 pr-10 md:pr-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
