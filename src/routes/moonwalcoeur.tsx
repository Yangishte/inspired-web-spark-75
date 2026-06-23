import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import signature from "@/assets/brand/signature.png.asset.json";
import astronaut from "@/assets/moonwalcoeur/astronaut-line-transparent.png";
import moonAsset from "@/assets/moonwalcoeur/moon.png.asset.json";
import chaussureAsset from "@/assets/moonwalcoeur/chaussure.jpeg.asset.json";
import textileImg from "@/assets/moonwalcoeur/textile.jpg";
import autresImg from "@/assets/moonwalcoeur/autres.jpg";
import petits1Asset from "@/assets/moonwalcoeur/petits-1.jpeg.asset.json";
import petits2Asset from "@/assets/moonwalcoeur/petits-2.jpeg.asset.json";
import petits3Asset from "@/assets/moonwalcoeur/petits-3.jpeg.asset.json";

export const Route = createFileRoute("/moonwalcoeur")({
  head: () => ({
    meta: [
      { title: "Moonwalcoeur — Bar à custom" },
      {
        name: "description",
        content:
          "Moonwalcoeur : un voyage cosmique au cœur de l'univers créatif derrière le Bar à custom.",
      },
    ],
  }),
  component: Moonwalcoeur,
});

type Star = { x: number; y: number; r: number; o: number; tw: number };

function useStars(count: number, seed = 1) {
  return useMemo<Star[]>(() => {
    let s = seed * 9301 + 49297;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, () => ({
      x: rnd() * 100,
      y: rnd() * 100,
      r: rnd() * 1.6 + 0.3,
      o: rnd() * 0.6 + 0.3,
      tw: rnd() * 4 + 2,
    }));
  }, [count, seed]);
}

function StarField({
  count,
  seed,
  className = "",
}: {
  count: number;
  seed?: number;
  className?: string;
}) {
  const stars = useStars(count, seed);
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#F2F0E9]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.r}px`,
            height: `${s.r}px`,
            opacity: s.o,
            boxShadow: `0 0 ${s.r * 4}px rgba(232,184,109,0.35)`,
            animation: `mw-twinkle ${s.tw}s ease-in-out ${(i % 7) * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function Moonwalcoeur() {
  const y = useScrollY();
  const astroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen overflow-hidden text-[#F2F0E9]">
      <style>{`
        @keyframes mw-twinkle { 0%,100% { opacity: 0.25 } 50% { opacity: 1 } }
        @keyframes mw-drift { 0%,100% { transform: translateY(0) rotate(-2deg) } 50% { transform: translateY(-22px) rotate(2deg) } }
        @keyframes mw-orbit { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes mw-shoot { 0% { transform: translate3d(-10vw,-10vh,0) rotate(20deg); opacity: 0 } 10% { opacity: 1 } 100% { transform: translate3d(110vw,60vh,0) rotate(20deg); opacity: 0 } }
        .mw-bg { background: radial-gradient(1200px 800px at 70% 10%, rgba(75,63,140,0.55), transparent 60%), radial-gradient(900px 700px at 10% 90%, rgba(255,107,92,0.18), transparent 60%), linear-gradient(180deg, #0B0F2A 0%, #11142E 50%, #161B33 100%); }
        .mw-nebula { background: radial-gradient(closest-side, rgba(232,184,109,0.18), transparent 70%), radial-gradient(closest-side, rgba(75,63,140,0.55), transparent 70%); filter: blur(20px); }
      `}</style>

      {/* Fond fixe cosmique */}
      <div className="fixed inset-0 mw-bg" aria-hidden />
      <div className="fixed inset-0" aria-hidden>
        <StarField count={120} seed={3} />
      </div>
      <div
        className="fixed inset-0"
        aria-hidden
        style={{ transform: `translateY(${y * -0.15}px)` }}
      >
        <StarField count={70} seed={11} />
      </div>
      <div
        className="fixed inset-0"
        aria-hidden
        style={{ transform: `translateY(${y * -0.35}px)` }}
      >
        <StarField count={40} seed={29} />
      </div>

      {/* Étoile filante */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute left-0 top-0 h-[2px] w-40 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E8B86D, #F2F0E9)",
            boxShadow: "0 0 14px #E8B86D",
            animation: "mw-shoot 7s linear 2s infinite",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8">
        <Link
          to="/"
          className="rounded-full border border-[#A8AEC9]/30 bg-[#0B0F2A]/40 px-4 py-2 font-display text-base tracking-wide backdrop-blur transition-colors hover:border-[#E8B86D] hover:text-[#E8B86D]"
        >
          ← Bar à custom
        </Link>
        <span className="font-handwritten text-xl text-[#A8AEC9]">
          Mission · Moonwalcoeur
        </span>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <span
          className="font-handwritten text-2xl tracking-wide"
          style={{ color: "#E8B86D" }}
        >
          ✦ entrée en orbite ✦
        </span>
        <h1 className="mt-4 mx-auto w-full max-w-3xl">
          <span className="sr-only">Moonwalcoeur</span>
          <img
            src={mwSignatureAsset.url}
            alt="Moonwalcoeur"
            className="mx-auto w-full h-auto"
            style={{
              filter: "invert(1) drop-shadow(0 0 24px rgba(232,184,109,0.35)) drop-shadow(0 0 60px rgba(75,63,140,0.6))",
            }}
          />
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#A8AEC9] md:text-xl">
          Un voyage cosmique au cœur de notre univers créatif. Deux frères, un atelier,
          des pièces qui flottent quelque part entre la Terre et la Lune.
        </p>

        {/* Astronaute */}
        <div
          ref={astroRef}
          className="relative mt-16 w-full max-w-sm"
          style={{
            transform: `translateY(${Math.min(y, 800) * 0.25}px) rotate(${y * 0.02}deg)`,
            animation: "mw-drift 8s ease-in-out infinite",
          }}
        >
          <div
            className="mw-nebula absolute inset-0 -z-10 scale-150 rounded-full"
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle, rgba(242,240,233,0.95) 0%, rgba(232,184,109,0.55) 45%, rgba(75,63,140,0) 72%)",
              filter: "blur(2px)",
            }}
          />
          <img
            src={astronaut}
            alt="Astronaute Moonwalcoeur et son cœur"
            className="relative mx-auto w-full"
            style={{
              filter:
                "drop-shadow(0 0 18px rgba(232,184,109,0.5)) drop-shadow(0 20px 40px rgba(11,15,42,0.6))",
            }}
          />
        </div>

        <span className="mt-12 font-handwritten text-lg text-[#A8AEC9]">
          ↓ continuez le voyage ↓
        </span>
      </section>

      {/* SECTION 2 — Lune orbitale + histoire */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 px-6 py-32 md:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <img
            src={moonAsset.url}
            alt="Lune Moonwalcoeur"
            width={1024}
            height={1024}
            loading="lazy"
            className="absolute inset-0 h-full w-full rounded-full object-cover"
            style={{
              boxShadow: "0 0 80px rgba(232,184,109,0.35), inset -30px -30px 80px rgba(0,0,0,0.35)",
              transform: `rotate(${y * 0.05}deg)`,
            }}
          />
          {/* anneau */}
          <div
            className="absolute inset-[-10%] rounded-full border border-[#A8AEC9]/40"
            style={{ transform: `rotate3d(1,0.3,0,75deg)` }}
          />
          {/* lune en orbite */}
          <div
            className="absolute inset-0"
            style={{ animation: "mw-orbit 18s linear infinite" }}
          >
            <div
              className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 rounded-full bg-[#F2F0E9]"
              style={{ boxShadow: "0 0 20px rgba(242,240,233,0.6)" }}
            />
          </div>
        </div>

        <div>
          <span className="font-handwritten text-2xl" style={{ color: "#E8B86D" }}>
            ✦ Notre histoire
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            Qui sommes-nous
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-[#F2F0E9]">
            Bienvenue chez <span className="font-handwritten" style={{ color: "#E8B86D" }}>Moonwalcoeur</span>, un tandem créatif formé par deux frères passionnés : Nicola et Kevin.
          </p>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#A8AEC9]">
            <p>
              Depuis notre tendre enfance, le dessin a été notre refuge, notre moyen d'expression. Chaque trait, chaque éclat de couleur raconte une histoire, reflète une émotion et nous transporte dans un univers où la créativité n'a pas de limites.
            </p>
            <p>
              Nous sommes animés par une vision commune : celle de créer des souvenirs intemporels pour les petits et les grands "walcoeurs". Parce que nous croyons en la magie des souvenirs, en leur capacité à évoquer des sourires et à tisser des liens précieux. Nous mettons tout notre talent et notre passion au service de la création d'objets uniques et personnalisés.
            </p>
            <p>
              Notre équipe dévouée est là pour concrétiser vos rêves et donner vie à vos idées. Que ce soit pour personnaliser des vêtements, des chaussures, des casquettes, des accessoires ou même les baskets de vos enfants, nous mettons notre expertise à votre disposition. Chaque création est pensée avec soin et réalisée avec "cœur", pour que chaque pièce devienne un véritable trésor, porteur d'histoires et de souvenirs inoubliables.
            </p>
            <p className="font-handwritten text-xl" style={{ color: "#E8B86D" }}>
              Chez Moonwalcoeur, nous croyons en la beauté du custom et en son pouvoir de rassembler. Nous sommes impatients de partager notre passion avec vous et de créer ensemble des moments magiques et uniques.
            </p>
            <p className="font-handwritten text-xl" style={{ color: "#FF6B5C" }}>
              Bienvenue dans notre univers, où chaque création est une invitation au voyage sur la lune.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Trois capsules */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="text-center">
          <span className="font-handwritten text-2xl" style={{ color: "#E8B86D" }}>
            ✦ Nos supports
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Ce que l'on customise
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            { title: "Chaussure", img: chaussureAsset.url },
            { title: "Textile", img: textileImg },
            { title: "Autres supports", img: autresImg },
          ].map((card, i) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl border border-[#A8AEC9]/20 bg-[#0B0F2A]/60 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#E8B86D]/60"
              style={{
                boxShadow: "inset 0 1px 0 rgba(242,240,233,0.08)",
              }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,15,42,0.85) 0%, rgba(11,15,42,0.1) 60%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(circle, #4B3F8C, transparent 70%)"
                        : "radial-gradient(circle, #FF6B5C, transparent 70%)",
                  }}
                />
                <h3 className="absolute bottom-5 left-6 font-display text-2xl text-[#F2F0E9]">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3b — Pour les petits */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
        <div className="text-center">
          <span className="font-handwritten text-2xl" style={{ color: "#E8B86D" }}>
            ✦ Pour les petits
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Pour les petits
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            { title: "Ethan", img: petits1Asset.url },
            { title: "Gear 5", img: petits2Asset.url },
            { title: "Roshan", img: petits3Asset.url },
          ].map((card, i) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl border border-[#A8AEC9]/20 bg-[#0B0F2A]/60 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#E8B86D]/60"
              style={{
                boxShadow: "inset 0 1px 0 rgba(242,240,233,0.08)",
              }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,15,42,0.85) 0%, rgba(11,15,42,0.1) 60%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
                  style={{
                    background:
                      i % 2 === 0
                        ? "radial-gradient(circle, #4B3F8C, transparent 70%)"
                        : "radial-gradient(circle, #FF6B5C, transparent 70%)",
                  }}
                />
                <h3 className="absolute bottom-5 left-6 font-display text-2xl text-[#F2F0E9]">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Signature dans une capsule */}
      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
        <span className="font-handwritten text-2xl" style={{ color: "#E8B86D" }}>
          ✦ La signature
        </span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">
          Posée comme un drapeau sur la Lune.
        </h2>

        <div
          className="relative mt-14 w-full max-w-2xl rounded-[2rem] border border-[#A8AEC9]/25 p-10 md:p-16"
          style={{
            background:
              "linear-gradient(180deg, rgba(242,240,233,0.06), rgba(75,63,140,0.18))",
            boxShadow:
              "0 30px 80px rgba(11,15,42,0.6), inset 0 1px 0 rgba(242,240,233,0.15)",
          }}
        >
          <div
            className="absolute -inset-1 -z-10 rounded-[2.2rem] opacity-70 blur-2xl"
            style={{
              background:
                "linear-gradient(135deg, #4B3F8C, #FF6B5C, #E8B86D)",
            }}
            aria-hidden
          />
          <img
            src={signature.url}
            alt="Signature Moonwalcoeur"
            className="mx-auto w-full max-w-lg"
            style={{ filter: "invert(1) brightness(1.15) hue-rotate(-10deg)" }}
          />
        </div>

        <p className="mx-auto mt-12 max-w-2xl font-handwritten text-2xl text-[#F2F0E9] md:text-3xl">
          Un tandem créatif, deux frères, et l'envie de créer des pièces qui
          racontent une histoire.
        </p>

        <Link
          to="/"
          className="mt-14 inline-flex items-center gap-3 rounded-full px-8 py-4 font-marker text-lg text-[#0B0F2A] transition-all hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, #E8B86D 0%, #FF6B5C 100%)",
            boxShadow: "0 0 40px rgba(232,184,109,0.5)",
          }}
        >
          ⟵ Retour sur Terre
        </Link>
      </section>

      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-8 text-center text-sm text-[#A8AEC9]">
        Moonwalcoeur · transmission depuis l'atelier · © 2026
      </footer>
    </div>
  );
}
