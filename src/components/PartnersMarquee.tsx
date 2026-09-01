import { useEffect, useRef, type ReactNode } from "react";

/**
 * Infinite horizontal marquee with pointer (touch + mouse) drag control.
 * Children are rendered three times; the track wraps seamlessly using modulo offset.
 * A click is only suppressed when the pointer actually moved (real drag),
 * so links inside stay clickable on desktop.
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
  const pointerDown = useRef(false);
  const dragging = useRef(false);
  const moved = useRef(0);
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
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerDown.current = true;
    dragging.current = false;
    moved.current = 0;
    velocity.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerDown.current) return;
    const dx = e.clientX - lastX.current;
    moved.current += Math.abs(dx);
    if (!dragging.current) {
      if (moved.current < 6) {
        lastX.current = e.clientX;
        return;
      }
      dragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    }
    const now = performance.now();
    const dt = Math.max(now - lastT.current, 1) / 1000;
    offset.current += dx;
    velocity.current = dx / dt;
    lastX.current = e.clientX;
    lastT.current = now;
  };

  const endDrag = () => {
    pointerDown.current = false;
    // keep dragging flag briefly so the click handler can cancel a drag-click
    if (dragging.current) {
      requestAnimationFrame(() => {
        dragging.current = false;
      });
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragging.current || moved.current > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`relative overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
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
