import { useEffect, useRef } from "react";

export type Partner = {
  name: string;
  url: string;
  shape: "circle" | "rect";
  link?: string;
  text?: string;
};

const SPEED = 40; // px per second

export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const half = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();

    const measure = () => {
      half.current = track.scrollWidth / 2;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = () => {
      const h = half.current;
      if (h <= 0) return;
      while (offset.current <= -h) offset.current += h;
      while (offset.current > 0) offset.current -= h;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!dragging.current) offset.current -= SPEED * dt;
      wrap();
      track.style.transform = `translate3d(${offset.current}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [partners]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    offset.current += e.clientX - lastX.current;
    lastX.current = e.clientX;
  };
  const endDrag = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const items = [...partners, ...partners];

  return (
    <div
      ref={viewportRef}
      className="relative overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div ref={trackRef} className="flex w-max items-center gap-10 will-change-transform md:gap-12">
        {items.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className={`flex shrink-0 flex-col items-center justify-center ${p.text ? "gap-1" : ""}`}
          >
            <div className="flex h-16 w-28 items-center justify-center md:h-20 md:w-36">
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  className="flex h-full w-full items-center justify-center"
                >
                  <Logo p={p} />
                </a>
              ) : (
                <Logo p={p} />
              )}
            </div>
            {p.text && (
              <span className="font-marker text-xs tracking-wide" style={{ color: "var(--cream)" }}>
                {p.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Logo({ p }: { p: Partner }) {
  if (p.shape === "circle") {
    return (
      <div className="h-16 w-16 overflow-hidden rounded-full md:h-20 md:w-20">
        <img
          src={p.url}
          alt={p.name}
          draggable={false}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <img
      src={p.url}
      alt={p.name}
      draggable={false}
      className="h-full w-full object-contain px-2"
      loading="lazy"
    />
  );
}
