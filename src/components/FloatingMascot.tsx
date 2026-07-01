import { useState } from "react";
import mascot0 from "@/assets/mascot/Calque_4.png.asset.json";
import mascot1 from "@/assets/mascot/Calque_5.png.asset.json";
import mascot2 from "@/assets/mascot/Calque_6.png.asset.json";
import mascot3 from "@/assets/mascot/Calque_7.png.asset.json";
import mascot4 from "@/assets/mascot/Calque_8.png.asset.json";

const WIDTH_DESKTOP = 90;
const HEIGHT_DESKTOP = 132;
const WIDTH_MOBILE = 64;
const HEIGHT_MOBILE = 94;

const EMOTIONS = [mascot0, mascot1, mascot2, mascot3, mascot4];

/**
 * Mascot fixée en bas à gauche.
 * - Flotte légèrement (translation + rotation douces).
 * - Au clic, change d'émotion (cycle sur les 5 variantes).
 */
export function FloatingMascot() {
  const [index, setIndex] = useState(0);

  const cycle = () => setIndex((i) => (i + 1) % EMOTIONS.length);

  return (
    <>
      <style>{`
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-8px) rotate(2deg); }
        }
        .mascot-float-inner {
          animation: mascot-float 4s ease-in-out infinite;
          transform-origin: center bottom;
        }
      `}</style>
      <button
        type="button"
        onClick={cycle}
        aria-label="Changer l'émotion de la mascotte"
        className="fixed bottom-4 left-4 z-[9999] cursor-pointer border-0 bg-transparent p-0 md:bottom-6 md:left-6"
        style={{
          width: WIDTH_DESKTOP,
          height: HEIGHT_DESKTOP,
        }}
      >
        <span
          className="mascot-float-inner block h-full w-full"
          style={{ willChange: "transform" }}
        >
          <img
            src={EMOTIONS[index].url}
            alt=""
            draggable={false}
            className="block h-full w-full select-none"
            style={{ objectFit: "contain" }}
          />
        </span>
        <style>{`
          @media (max-width: 767px) {
            button[aria-label="Changer l'émotion de la mascotte"] {
              width: ${WIDTH_MOBILE}px !important;
              height: ${HEIGHT_MOBILE}px !important;
            }
          }
        `}</style>
      </button>
    </>
  );
}
