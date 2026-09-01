import { useEffect } from "react";

/**
 * TEMPORARY DEBUG COMPONENT
 * Logs unexpected scroll jumps (delta > 50px without recent user interaction)
 * and body height changes. Remove once the scroll bug is identified.
 */
export function ScrollJumpDebug() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;
    let lastInteraction = 0;
    const INTERACTION_WINDOW = 600; // ms

    const markInteraction = () => {
      lastInteraction = performance.now();
    };

    const interactionEvents = [
      "wheel",
      "touchstart",
      "touchmove",
      "mousedown",
      "keydown",
      "pointerdown",
    ] as const;
    interactionEvents.forEach((e) =>
      window.addEventListener(e, markInteraction, { passive: true }),
    );

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      const sinceInteraction = performance.now() - lastInteraction;
      const userDriven = sinceInteraction < INTERACTION_WINDOW;

      if (Math.abs(delta) > 50 && !userDriven) {
        console.warn(
          `[SCROLL-DEBUG] 🚨 JUMP AUTOMATIQUE ${new Date().toISOString()} | from=${lastY} to=${y} delta=${delta.toFixed(
            0,
          )}px | dernière interaction il y a ${Math.round(sinceInteraction)}ms`,
        );
        console.trace("[SCROLL-DEBUG] stack du saut de scroll");
      } else {
        console.log(
          `[SCROLL-DEBUG] scrollY=${y} delta=${delta.toFixed(0)} user=${userDriven} t=${new Date().toISOString()}`,
        );
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    let lastBodyHeight = document.body.scrollHeight;
    let ro: ResizeObserver | undefined;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => {
        const h = document.body.scrollHeight;
        if (h !== lastBodyHeight) {
          console.log(
            `[SCROLL-DEBUG] 📐 body height ${lastBodyHeight} → ${h} (Δ${h - lastBodyHeight}px) scrollY=${window.scrollY} t=${new Date().toISOString()}`,
          );
          lastBodyHeight = h;
        }
      });
      ro.observe(document.body);
    }

    console.log("[SCROLL-DEBUG] actif — surveille scroll + hauteur du body");

    return () => {
      window.removeEventListener("scroll", onScroll);
      interactionEvents.forEach((e) =>
        window.removeEventListener(e, markInteraction),
      );
      ro?.disconnect();
    };
  }, []);

  return null;
}
