import { useEffect, useRef, type ReactNode } from "react";

/**
 * Infinite horizontal marquee with touch/pointer drag control.
 * Children are rendered twice; the track wraps seamlessly using modulo offset.
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
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const dragging = useRef(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);

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
        // offset driven by pointer handlers
      } else if (Math.abs(velocity.current) > 5) {
        offset.current += velocity.current * dt;
        velocity.current *= 0.94;
      } else if (!reduce) {
        offset.current -= speed * dt;
      }

      // wrap
      offset.current = ((offset.current % width) + width) % width;
      track.style.transform = `translate3d(${offset.current - width}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    velocity.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    const now = performance.now();
    const dt = Math.max(now - lastT.current, 1) / 1000;
    offset.current += dx;
    velocity.current = dx / dt;
    lastX.current = e.clientX;
    lastT.current = now;
  };

  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
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
