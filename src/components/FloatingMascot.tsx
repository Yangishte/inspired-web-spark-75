import { useEffect, useMemo, useRef, useState } from "react";
import mascot0 from "@/assets/mascot/Calque_4.png";
import mascot1 from "@/assets/mascot/Calque_5.png";
import mascot2 from "@/assets/mascot/Calque_6.png";
import mascot3 from "@/assets/mascot/Calque_7.png";
import mascot4 from "@/assets/mascot/Calque_8.png";

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

const SPEAK_INTERVAL = 30_000; // la mascotte parle toutes les 30s
const BUBBLE_VISIBLE_DURATION = 7_000; // la bulle reste visible 7s

/**
 * Mascotte fixée en bas à gauche.
 * - Flotte légèrement (translation + rotation douces).
 * - Affiche une bulle cartoon avec des anecdotes / news toutes les 30s, puis se repose.
 * - Au clic : change d'émotion + change de message.
 */
export function FloatingMascot() {
  const [emotionIdx, setEmotionIdx] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  // Cycle automatique : une apparition toutes les 30s, puis pause.
  useEffect(() => {
    const openTimer = window.setTimeout(() => {
      setBubbleOpen(true);
      closeTimerRef.current = window.setTimeout(() => {
        setBubbleOpen(false);
      }, BUBBLE_VISIBLE_DURATION);
    }, 1500);

    const cycleTimer = window.setInterval(() => {
      setMessageIdx((i) => (i + 1) % MESSAGES.length);
      setBubbleOpen(true);
      closeTimerRef.current = window.setTimeout(() => {
        setBubbleOpen(false);
      }, BUBBLE_VISIBLE_DURATION);
    }, SPEAK_INTERVAL);

    return () => {
      window.clearTimeout(openTimer);
      window.clearInterval(cycleTimer);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    setEmotionIdx((i) => (i + 1) % EMOTIONS.length);
    setMessageIdx((i) => (i + 1) % MESSAGES.length);
    setBubbleOpen(true);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setBubbleOpen(false);
    }, BUBBLE_VISIBLE_DURATION);
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
        @keyframes bubble-float {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-6px) rotate(1deg); }
        }
        .mascot-bubble-float {
          animation: bubble-float 3.5s ease-in-out infinite;
          transform-origin: bottom left;
        }
        @keyframes bubble-pop {
          0%   { opacity: 0; transform: translateY(10px) scale(0.85); }
          70%  { transform: translateY(-2px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bubble-hide {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(8px) scale(0.9); }
        }
        .mascot-bubble {
          animation: bubble-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .mascot-bubble.hiding {
          animation: bubble-hide 0.25s ease-in forwards;
        }
        .mascot-bubble::after {
          content: "";
          position: absolute;
          left: 22px;
          bottom: -12px;
          width: 20px;
          height: 20px;
          background: #fffdf7;
          border-right: 3px solid #2b2b2b;
          border-bottom: 3px solid #2b2b2b;
          transform: rotate(45deg);
          border-bottom-right-radius: 5px;
        }
        .mascot-wrap { width: ${size.w}px; height: ${size.h}px; }
        .mascot-bubble-max { max-width: 280px; }
        @media (max-width: 767px) {
          .mascot-wrap { width: ${size.wMobile}px; height: ${size.hMobile}px; }
          .mascot-bubble-max { max-width: 210px; font-size: 13px; }
        }
      `}</style>

      <div className="fixed bottom-4 left-4 z-[9999] flex flex-col items-start gap-3 md:bottom-6 md:left-6">
        {bubbleOpen && (
          <div
            className="mascot-bubble-float mascot-bubble mascot-bubble-max relative rounded-[22px] border-[3px] px-4 py-3 font-handwritten text-[15px] leading-snug shadow-[4px_4px_0px_rgba(43,43,43,1)]"
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
              className="absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full border-[3px] text-[12px] font-bold leading-none shadow-[2px_2px_0px_rgba(43,43,43,1)] transition-transform hover:scale-110"
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
