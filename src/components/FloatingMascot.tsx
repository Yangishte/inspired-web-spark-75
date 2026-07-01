import { useEffect, useMemo, useState } from "react";
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

// Anecdotes & news autour du Bar à Custom
const MESSAGES = [
  "Coucou ! Moi c'est Planky, la mascotte du Bar à Custom 👋",
  "Le saviez-vous ? Chaque pièce customisée ici est unique au monde.",
  "Astuce : réserve tôt le week-end, les créneaux partent vite !",
  "News : de nouveaux modèles de sacs viennent d'arriver 🎨",
  "Petit défi : ose une couleur que tu n'utilises jamais 😉",
  "Nos posca sont rechargés, prêts pour ta prochaine création !",
  "Anecdote : Kévin a customisé plus de 500 pièces depuis l'ouverture.",
  "Idée cadeau : un bon Bar à Custom fait toujours plaisir 🎁",
  "Amène tes potes : à plusieurs, c'est encore plus fun !",
  "Un doute sur ton dessin ? Respire, il n'y a pas de faute ici.",
];

/**
 * Mascotte fixée en bas à gauche.
 * - Flotte légèrement (translation + rotation douces).
 * - Affiche une bulle avec des anecdotes / news qui tournent.
 * - Au clic : change d'émotion + change de message.
 */
export function FloatingMascot() {
  const [emotionIdx, setEmotionIdx] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  // Ouverture initiale après un court délai, puis rotation auto des anecdotes
  useEffect(() => {
    const openTimer = window.setTimeout(() => setBubbleOpen(true), 1500);
    const rotateTimer = window.setInterval(() => {
      setMessageIdx((i) => (i + 1) % MESSAGES.length);
      setBubbleOpen(true);
    }, 9000);
    return () => {
      window.clearTimeout(openTimer);
      window.clearInterval(rotateTimer);
    };
  }, []);

  const handleClick = () => {
    setEmotionIdx((i) => (i + 1) % EMOTIONS.length);
    setMessageIdx((i) => (i + 1) % MESSAGES.length);
    setBubbleOpen(true);
  };

  const size = useMemo(
    () => ({
      w: WIDTH_DESKTOP,
      h: HEIGHT_DESKTOP,
      wMobile: WIDTH_MOBILE,
      hMobile: HEIGHT_MOBILE,
    }),
    [],
  );

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
        @keyframes bubble-pop {
          0%   { opacity: 0; transform: translateY(6px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mascot-bubble {
          animation: bubble-pop 0.25s ease-out both;
        }
        .mascot-bubble::after {
          content: "";
          position: absolute;
          left: 22px;
          bottom: -10px;
          width: 18px;
          height: 18px;
          background: #fffdf7;
          border-right: 2px solid #2b2b2b;
          border-bottom: 2px solid #2b2b2b;
          transform: rotate(45deg);
          border-bottom-right-radius: 4px;
        }
        .mascot-wrap { width: ${size.w}px; height: ${size.h}px; }
        .mascot-bubble-max { max-width: 260px; }
        @media (max-width: 767px) {
          .mascot-wrap { width: ${size.wMobile}px; height: ${size.hMobile}px; }
          .mascot-bubble-max { max-width: 200px; font-size: 13px; }
        }
      `}</style>

      <div className="fixed bottom-4 left-4 z-[9999] flex flex-col items-start gap-2 md:bottom-6 md:left-6">
        {bubbleOpen && (
          <div className="mascot-bubble mascot-bubble-max relative rounded-2xl border-2 px-4 py-2.5 font-handwritten text-[15px] leading-snug shadow-md"
            style={{
              background: "#fffdf7",
              borderColor: "#2b2b2b",
              color: "#2b2b2b",
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setBubbleOpen(false);
              }}
              aria-label="Fermer la bulle"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] font-bold leading-none"
              style={{ background: "#fffdf7", borderColor: "#2b2b2b", color: "#2b2b2b" }}
            >
              ×
            </button>
            {MESSAGES[messageIdx]}
          </div>
        )}

        <button
          type="button"
          onClick={handleClick}
          aria-label="Parler à la mascotte"
          className="mascot-wrap cursor-pointer border-0 bg-transparent p-0"
        >
          <span
            className="mascot-float-inner block h-full w-full"
            style={{ willChange: "transform" }}
          >
            <img
              src={EMOTIONS[emotionIdx].url}
              alt=""
              draggable={false}
              className="block h-full w-full select-none"
              style={{ objectFit: "contain" }}
            />
          </span>
        </button>
      </div>
    </>
  );
}
