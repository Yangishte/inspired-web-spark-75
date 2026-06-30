import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import heroImg1 from "@/assets/hero/IMG_0362.jpeg.asset.json";
import heroImg2 from "@/assets/hero/IMG_3609.jpeg.asset.json";
import heroImg3 from "@/assets/hero/IMG_6192.jpeg.asset.json";
import heroImg4 from "@/assets/hero/IMG_6209.jpeg.asset.json";
import heroImg5 from "@/assets/hero/IMG_6211.jpeg.asset.json";
import heroImg6 from "@/assets/hero/IMG_6623.jpeg.asset.json";
import heroImg7 from "@/assets/hero/IMG_7448.jpeg.asset.json";
import heroImg8 from "@/assets/hero/IMG_7459.jpeg.asset.json";
import heroImg9 from "@/assets/hero/IMG_7474.jpeg.asset.json";

import atelierImg1 from "@/assets/atelier/IMG_0367.jpeg.asset.json";
import atelierImg2 from "@/assets/atelier/IMG_0360.jpeg.asset.json";
import BagsCarousel3D from "@/components/BagsCarousel3D";
import moonwalcoeurLogo from "@/assets/moonwalcoeur/logo.png.asset.json";
import brunchTerrasseImg from "@/assets/events/brunch-terrasse.jpg.asset.json";
import winePaintImg from "@/assets/events/wine-paint.jpg.asset.json";
import manorLausanneImg from "@/assets/events/manor-lausanne.jpg.asset.json";
import lfmLogo from "@/assets/partners/lfm.png.asset.json";
import illustreLogo from "@/assets/partners/illustre.png.asset.json";
import visilabLogo from "@/assets/partners/visilab.png";
import interviewImg from "@/assets/clique-pour-voir-interview.png.asset.json";

const partners = [
  { name: "LFM La Radio", url: lfmLogo.url, shape: "circle" as const },
  { name: "L'Illustré", url: illustreLogo.url, shape: "rect" as const },
  { name: "Visilab", url: visilabLogo, shape: "rect" as const },
  { name: "L'Arche de Noé", url: archeNoeLogo, shape: "rect" as const },
];

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5, heroImg6, heroImg7, heroImg8, heroImg9];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bar à custom — Personnalisation unique & faite main" },
      {
        name: "description",
        content:
          "Bar à custom : atelier de personnalisation sur-mesure. Vêtements, accessoires et objets uniques, customisés à la main dans un esprit chaleureux et artisanal.",
      },
      { property: "og:title", content: "Bar à custom — Personnalisation unique & faite main" },
      {
        property: "og:description",
        content: "Atelier de customisation sur-mesure. Venez créer la pièce qui vous ressemble.",
      },
    ],
  }),
  component: Index,
});


function NavLink({ label, href, delay = 0 }: { label: string; href: string; delay?: number }) {
  return (
    <a
      href={href}
      className={`float-soft float-delay-${delay} font-marker text-sm tracking-wide transition-transform hover:-translate-y-0.5`}
      style={{ color: "var(--cocoa)" }}
    >
      {label}
    </a>
  );
}

const reviews = [
  {
    name: "Helena M.",
    text: "Super expérience, beaucoup de choix de créations ! Un joli moment passé entre copines! Je recommande",
  },
  {
    name: "Gianluigi",
    text: "Superbe espace créatif ! A deux pas du lac, l’inspiration s’y trouve facilement. Kévin est passionné par son art et cela se ressent dans son énergie. Une concept inédit dans la région. Un atelier à expérimenter en famille ou entre amis. Tout de bon pour la suite !",
  },
  {
    name: "Isia Balestrini",
    text: "Très belle expérience au bar à custom ! Beaucoup de supports à choix, très joli cadre et un moment de détente assuré ! Merci le bar à custom pour l’accueil chaleureux ! Je recommande",
  },
  {
    name: "Christiane Krieg",
    text: "Joli moment de détente et de créativité avec ma fille! Merci",
  },
];

function Index() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [faqVisible, setFaqVisible] = useState(false);
  const [slot0, setSlot0] = useState(0);
  const [slot1, setSlot1] = useState(1);
  const [fadingSlot, setFadingSlot] = useState<0 | 1 | null>(null);
  const [flippedEvents, setFlippedEvents] = useState<Set<string>>(new Set());
  const [flippedPricing, setFlippedPricing] = useState<Set<string>>(new Set());
  const nextReviewRef = useRef(2);
  const activeSlotRef = useRef<0 | 1>(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const slotToUpdate = activeSlotRef.current;
      setFadingSlot(slotToUpdate);
      const timeoutId = setTimeout(() => {
        const next = nextReviewRef.current;
        if (slotToUpdate === 0) setSlot0(next);
        else setSlot1(next);
        nextReviewRef.current = (next + 1) % reviews.length;
        activeSlotRef.current = slotToUpdate === 0 ? 1 : 0;
        requestAnimationFrame(() => setFadingSlot(null));
      }, 300);
      return () => clearTimeout(timeoutId);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://embed.acuityscheduling.com/embed/button/32315373.css";
    link.id = "acuity-button-styles";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://embed.acuityscheduling.com/embed/button/32315373.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const section = document.getElementById("faq");
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFaqVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* subtle grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.15] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.55 0.06 50 / 0.4) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* NAV */}
      <header className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 pt-8">
        <a href="#" className="float-soft font-display text-2xl tracking-tight" style={{ color: "var(--cocoa)" }}>
          Bar à custom
        </a>
        <nav className="flex flex-wrap items-center gap-7">
          <NavLink label="L'atelier" href="#atelier" delay={1} />
          <NavLink label="Événements" href="#evenements" delay={2} />
          <NavLink label="Services" href="#services" delay={3} />
          <NavLink label="Tarifs" href="#tarifs" delay={4} />
          <NavLink label="FAQ" href="#faq" delay={5} />
          <NavLink label="Réserver" href="#reserver" delay={6} />
          <NavLink label="Contact" href="#contact" delay={1} />
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-32 pt-20 md:grid-cols-[1.2fr_1fr] md:pt-32">
        <div>
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>
            Atelier de personnalisation — St-Sulpice&nbsp;
          </span>
          <h1
            className="mt-4 break-words font-display text-4xl leading-[0.95] sm:text-5xl md:text-7xl"
            style={{ color: "var(--cocoa)" }}
          >
            Et si ta pièce préférée n'existait qu'en un seul exemplaire&nbsp;?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed md:mt-8" style={{ color: "var(--cocoa)" }}>
            Bienvenue au <span className="scribble-underline">Bar à custom</span>. On peint, on brode, on transforme les supports vierges et
            accessoires en pièces uniques — autour d'une boisson, dans une ambiance douce et
            ensoleillée.
          </p>
          <p className="mt-3 text-base" style={{ color: "var(--clay)" }}>
            Accessible dès 6 ans.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#reserver"
              className="float-left rounded-full px-7 py-3 font-marker text-lg transition-transform hover:scale-105"
              style={{ background: "var(--cocoa)", color: "var(--cream)" }}
            >
              Réserver une session
            </a>
            <a
              href="#services"
              className="float-right float-delay-2 rounded-full border-2 px-7 py-3 font-marker text-lg transition-transform hover:scale-105"
              style={{ borderColor: "var(--clay)", color: "var(--clay)" }}
            >
              Découvrir les services
            </a>
          </div>
        </div>

        <div className="relative mx-auto">
          <div
            className="animate-float-hero relative h-80 w-80 overflow-hidden rounded-[2rem] border-4 shadow-2xl md:h-96 md:w-96"
            style={{ borderColor: "var(--cocoa)", background: "var(--sand)" }}
          >
            {heroImages.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`Création Bar à custom ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === heroIndex ? 1 : 0 }}
              />
            ))}
          </div>
          <span
            className="absolute -bottom-4 -left-4 rotate-[-8deg] rounded-full border-2 px-4 py-2 font-handwritten text-xl"
            style={{ borderColor: "var(--clay)", color: "var(--clay)", background: "var(--cream)" }}
          >
            100% fait main
          </span>
        </div>
      </section>

      {/* ATELIER BAND */}
      <section
        id="atelier"
        className="relative border-y-2"
        style={{ borderColor: "var(--clay)", background: "var(--sand)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl leading-tight md:text-6xl" style={{ color: "var(--cocoa)" }}>
            Un comptoir, des pinceaux, ton imagination.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-handwritten text-3xl" style={{ color: "var(--clay)" }}>
            Pas de série, pas de standard — chaque pièce raconte ton histoire.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="float-left overflow-hidden rounded-3xl border-4 shadow-xl" style={{ borderColor: "var(--cocoa)" }}>
              <img src={atelierImg1.url} alt="Atelier Bar à custom — espace de création" className="h-72 w-full object-cover md:h-96" />
            </div>
            <div className="float-right float-delay-2 overflow-hidden rounded-3xl border-4 shadow-xl" style={{ borderColor: "var(--cocoa)" }}>
              <img src={atelierImg2.url} alt="Atelier Bar à custom — préparation" className="h-72 w-full object-cover md:h-96" />
            </div>
          </div>

          {/* AVIS BULLES */}
          <div className="mt-16 grid items-start gap-6 md:grid-cols-2">
            {[slot0, slot1].map((reviewIndex, slot) => {
              const review = reviews[reviewIndex];
              const isFading = fadingSlot === slot;
              return (
                <div
                  key={slot}
                  className={`relative rounded-3xl border-2 p-5 text-left shadow-xl transition-opacity duration-300 sm:p-6 ${slot === 0 ? "float-left" : "float-right float-delay-2"} ${isFading ? "opacity-0" : "opacity-100"}`}
                  style={{ borderColor: "var(--clay)", background: "var(--cream)" }}
                >
                  <span
                    className="absolute -top-5 left-6 font-display text-5xl leading-none"
                    style={{ color: "var(--clay)" }}
                    aria-hidden
                  >
                    "
                  </span>
                  <div className="mb-3 flex gap-1 pt-3" aria-label="5 étoiles">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#FACC15" color="#FACC15" />
                    ))}
                  </div>
                  <p className="font-handwritten text-lg sm:text-xl" style={{ color: "var(--cocoa)" }}>
                    {review.text}
                  </p>
                  <p className="mt-4 font-marker text-sm" style={{ color: "var(--clay)" }}>
                    — {review.name}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ÉVÉNEMENTS */}
      <section id="evenements" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-10 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>Réserve ta place ↓</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
            Nos événements
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              date: "Dimanche 7 juin 2026",
              titre: "Wine & Paint au Domaine Maison Blanche",
              lieu: "Domaine Maison Blanche – Mont-sur-Rolle",
              time: "13h30 – 15h30",
              price: "CHF 65.- / personne",
              desc: "Un après-midi entre vin, soleil et créativité 🍇🖌️ Antoine nous parle de son domaine, puis tu profites de vin à discrétion tout en personnalisant ton support textile dans une ambiance détendue et inspirante.",
              past: true,
              image: winePaintImg.url,
              imagePosition: "center 15%",
              instagramUrl: "https://www.instagram.com/reel/DYxFsXAobkI/",
            },
            {
              date: "Dimanche 31 mai 2026",
              titre: "Brunch & Paint à l'Hôtel En Bellevue",
              lieu: "En Bellevue 1, 1163 Etoy",
              time: "10h – 14h",
              price: "CHF 90.- / personne (brunch + atelier)",
              desc: "Le Bar à Custom déménage à l'hôtel pour un atelier Brunch & Paint 🎨🥞 Petit brunch en terrasse, puis tu peins ton support textile et repars avec le bide bien rempli et un sac supermégatrop joli ! 🤩",
              past: true,
              image: brunchTerrasseImg.url,
              instagramUrl: "https://www.instagram.com/p/DYKe5apsLhx/",
            },
            {
              date: "Samedi 25 avril 2026",
              titre: "Atelier au Restaurant Manor Lausanne",
              lieu: "Restaurant Manor Lausanne",
              time: "Durée : 2 heures",
              price: "CHF 49.- / personne",
              desc: "Le Bar à Custom déménage à Manor le temps d'un atelier exceptionnel. Tu peins sur ton support, tu sirotes une petite boisson, tu dégustes quelques mignardises et tu crées un souvenir inoubliable 😍",
              past: true,
              image: manorLausanneImg.url,
              imagePosition: "center 25%",
              instagramUrl: "https://www.instagram.com/reel/DZK1T1woaFi/",
            },
          ].map((e) => (
            <div
              key={e.titre}
              className="group min-h-[440px] cursor-pointer"
              style={{ perspective: "1200px" }}
              onClick={() => {
                setFlippedEvents((prev) => {
                  const next = new Set(prev);
                  if (next.has(e.titre)) next.delete(e.titre);
                  else next.add(e.titre);
                  return next;
                });
              }}
              role="button"
              aria-label={`Carte ${e.titre}, cliquez pour retourner`}
              tabIndex={0}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setFlippedEvents((prev) => {
                    const next = new Set(prev);
                    if (next.has(e.titre)) next.delete(e.titre);
                    else next.add(e.titre);
                    return next;
                  });
                }
              }}
            >
              <div
                className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedEvents.has(e.titre) ? "[transform:rotateY(180deg)]" : ""} group-hover:[transform:rotateY(180deg)]`}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-3xl border-2 p-6"
                  style={{
                    borderColor: "var(--cocoa)",
                    background: "var(--cream)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {e.past && (
                    <div
                      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                      style={{ background: "rgba(255, 248, 240, 0.3)" }}
                    >
                      <div className="relative rotate-[-10deg]">
                        <div
                          className="font-marker rounded-2xl border-4 px-5 py-2 text-4xl uppercase tracking-widest"
                          style={{
                            color: "#dc2626",
                            borderColor: "#dc2626",
                            background: "rgba(255, 255, 255, 0.85)",
                            boxShadow: "4px 4px 0 0 rgba(220, 38, 38, 0.35)",
                            textShadow: "2px 2px 0 rgba(220, 38, 38, 0.15)",
                          }}
                        >
                          Passé
                        </div>
                        <svg
                          className="absolute -right-2 -top-2 w-7"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          aria-hidden="true"
                        >
                          <path d="M12 2l2.5 6.5L21 9l-5 4.5 1.5 6.5-5.5-3.5-5.5 3.5 1.5-6.5-5-4.5 6.5-0.5L12 2z" />
                        </svg>
                        <svg
                          className="absolute -bottom-1 -left-2 w-5 rotate-[-20deg]"
                          viewBox="0 0 24 24"
                          fill="#dc2626"
                          aria-hidden="true"
                        >
                          <path d="M12 2l2.5 6.5L21 9l-5 4.5 1.5 6.5-5.5-3.5-5.5 3.5 1.5-6.5-5-4.5 6.5-0.5L12 2z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <span className="font-marker text-sm tracking-wide" style={{ color: "var(--clay)" }}>{e.date}</span>
                  <h3 className="mt-3 font-display text-xl leading-tight" style={{ color: "var(--cocoa)" }}>{e.titre}</h3>
                  <p className="mt-1 font-handwritten text-lg" style={{ color: "var(--clay)" }}>{e.lieu}</p>
                  {(e.time || e.price) && (
                    <div className="mt-3 space-y-1 text-sm font-marker" style={{ color: "var(--cocoa)" }}>
                      {e.time && <p>🗓️ {e.time}</p>}
                      {e.price && <p>🏷️ {e.price}</p>}
                    </div>
                  )}
                  <p className="mt-4 text-base leading-relaxed opacity-90" style={{ color: "var(--cocoa)" }}>{e.desc}</p>
                </div>

                {/* BACK */}
                <a
                  href={e.instagramUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Voir ${e.titre} sur Instagram`}
                  aria-hidden={!flippedEvents.has(e.titre)}
                  tabIndex={flippedEvents.has(e.titre) ? 0 : -1}
                  className="absolute inset-0 block overflow-hidden rounded-3xl border-2 shadow-xl"
                  style={{
                    borderColor: "var(--cocoa)",
                    background: "var(--sand)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  onClick={(ev) => ev.stopPropagation()}
                >
                  {e.image ? (
                    <img
                      src={e.image}
                      alt={e.titre}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: (e as { imagePosition?: string }).imagePosition || "center" }}
                    />
                  ) : (
                    <div
                      className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
                      style={{ color: "var(--cocoa)" }}
                    >
                      <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>
                        Image à venir
                      </span>
                      <p className="font-marker text-sm opacity-70">
                        Visuel & lien Instagram à ajouter
                      </p>
                    </div>
                  )}
                  <div
                    className="absolute bottom-3 right-3 rounded-full px-3 py-1 font-marker text-xs"
                    style={{ background: "var(--cocoa)", color: "var(--cream)" }}
                  >
                    Voir sur Instagram ↗
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTENAIRES — Bandeau défilant */}
      <section aria-label="Ils nous font confiance" className="relative z-10 py-12 overflow-hidden" style={{ background: "var(--cocoa)" }}>
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl" style={{ color: "var(--cream)" }}>
            Ils nous font confiance
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-10 marquee-track w-max">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className={`shrink-0 overflow-hidden ${
                p.shape === "circle"
                  ? "h-24 w-24 md:h-28 md:w-28 rounded-full"
                  : "h-16 md:h-20 rounded-md"
              }`}
              style={p.shape === "rect" ? { aspectRatio: "3 / 1" } : undefined}
            >
              <img
                src={p.url}
                alt={p.name}
                className={`h-full w-full ${p.shape === "circle" ? "object-cover" : "object-contain px-2"}`}
                loading="lazy"
              />
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* SERVICES — Carrousel 3D */}
      <section id="services" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>Choisis ton support ↓</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
            Nos supports à customiser
          </h2>
        </div>
        <BagsCarousel3D />
      </section>


      {/* TARIFS */}
      <section
        id="tarifs"
        className="relative border-y-2"
        style={{ borderColor: "var(--clay)", background: "var(--cream)" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2 md:gap-10">
            {[
              { name: "Adulte", price: "CHF 49.-", desc: "2 heures d'atelier, boisson offerte, support inclus." },
              { name: "Enfant", price: "CHF 39.-", desc: "2 heures d'atelier, boisson offerte, support inclus.", featured: true },
            ].map((p, i) => (
              <div
                key={p.name}
                className={`group min-h-[280px] cursor-pointer ${i === 0 ? "float-left" : "float-right float-delay-2"}`}
                style={{ perspective: "1200px" }}
                onClick={() => {
                  setFlippedPricing((prev) => {
                    const next = new Set(prev);
                    if (next.has(p.name)) next.delete(p.name);
                    else next.add(p.name);
                    return next;
                  });
                }}
                role="button"
                aria-label={`Carte ${p.name}, cliquez pour retourner`}
                tabIndex={0}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setFlippedPricing((prev) => {
                      const next = new Set(prev);
                      if (next.has(p.name)) next.delete(p.name);
                      else next.add(p.name);
                      return next;
                    });
                  }
                }}
              >
                <div
                  className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedPricing.has(p.name) ? "[transform:rotateY(180deg)]" : ""} group-hover:[transform:rotateY(180deg)]`}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-3xl border-2 p-5 text-center sm:p-8"
                    style={{
                      borderColor: "var(--cocoa)",
                      background: p.featured ? "var(--cocoa)" : "transparent",
                      color: p.featured ? "var(--cream)" : "var(--cocoa)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <h3 className="font-display text-2xl">{p.name}</h3>
                    <p className="mt-4 font-display text-4xl md:text-5xl">{p.price}</p>
                    <p className="mt-4 text-base leading-relaxed opacity-90">{p.desc}</p>
                  </div>
                  {/* BACK */}
                  <a
                    href="https://app.acuityscheduling.com/schedule.php?owner=32315373&ref=booking_button"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-hidden={!flippedPricing.has(p.name)}
                    tabIndex={flippedPricing.has(p.name) ? 0 : -1}
                    className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-3xl border-2 p-5 text-center sm:p-8"
                    style={{
                      borderColor: "var(--cocoa)",
                      background: "var(--sand)",
                      color: "var(--cocoa)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      textDecoration: "none",
                    }}
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>
                      Réserver
                    </span>
                    <p className="mt-2 font-display text-3xl">{p.price}</p>
                    <p className="mt-4 font-marker text-lg">Prendre rendez-vous →</p>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/moonwalcoeur"
              className="group inline-flex items-center gap-3 rounded-full border-2 px-6 py-3 text-sm transition-transform hover:scale-[1.03]"
              style={{ borderColor: "var(--clay)", background: "var(--cream)", color: "var(--cocoa)" }}
            >
              <img src={moonwalcoeurLogo.url} alt="Moonwalcoeur" className="h-6 w-auto" />
              <span className="font-display">Le sur-mesure · Sur devis</span>
              <span className="hidden font-handwritten text-sm sm:inline" style={{ color: "var(--clay)" }}>Projets longs, mariage, cadeau →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 py-28">
        {/* Floating question marks that appear on scroll */}
        {[
          { top: "2%", left: "4%", size: "text-5xl", delay: "0ms", rotate: "-12deg", float: "float-left" },
          { top: "8%", right: "6%", size: "text-4xl", delay: "150ms", rotate: "10deg", float: "float-right" },
          { top: "32%", left: "-2%", size: "text-6xl", delay: "300ms", rotate: "-6deg", float: "float-neutral" },
          { top: "28%", right: "-1%", size: "text-5xl", delay: "450ms", rotate: "14deg", float: "float-right" },
          { top: "55%", left: "3%", size: "text-4xl", delay: "600ms", rotate: "8deg", float: "float-soft" },
          { top: "62%", right: "4%", size: "text-6xl", delay: "750ms", rotate: "-10deg", float: "float-left" },
          { top: "85%", left: "10%", size: "text-5xl", delay: "900ms", rotate: "-4deg", float: "float-neutral" },
          { top: "88%", right: "8%", size: "text-4xl", delay: "1050ms", rotate: "12deg", float: "float-right" },
        ].map((q, i) => (
          <span
            key={i}
            aria-hidden
            className={`pointer-events-none absolute hidden font-marker ${q.size} ${q.float} transition-opacity duration-700 ease-out sm:block`}
            style={{
              top: q.top,
              left: q.left,
              right: q.right,
              rotate: q.rotate,
              color: i % 2 === 0 ? "var(--clay)" : "var(--cocoa)",
              opacity: faqVisible ? 0.55 : 0,
              transitionDelay: q.delay,
            }}
          >
            ?
          </span>
        ))}
        <div className="mb-10 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>Les questions ↓</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
            FAQ
          </h2>
        </div>
        <div className="rounded-3xl border-2 p-4 md:p-8" style={{ borderColor: "var(--cocoa)", background: "var(--cream)" }}>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {[
              { q: "Où ?", a: (
                <div className="space-y-1">
                  <p>Rue Centre 37</p>
                  <p>1025 St-Sulpice</p>
                  <div className="mt-4 overflow-hidden rounded-2xl border-2" style={{ borderColor: "var(--cocoa)" }}>
                    <iframe
                      src="https://www.google.com/maps?q=Rue+Centre+37,1025+St-Sulpice,Switzerland&output=embed"
                      width="100%"
                      height="280"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localisation Bar à custom"
                    />
                  </div>
                </div>
              ) },
              { q: "Tarifs ?", a: "Adulte : CHF 49.- · Enfant : CHF 39.-" },
              { q: "Durée ?", a: "2 heures avec boisson offertes !" },
              { q: "Dois-je venir avec mes supports ?", a: "Non pas besoin! Choisissez parmi divers supports: des trousses grandes ou petites, des sacs de diverses tailles et formes, des sacs à dos, etc." },
              {
                q: "Réseaux sociaux ?",
                a: (
                  <>
                    Instagram{" "}
                    <a
                      href="https://www.instagram.com/_baracustom/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-marker underline"
                      style={{ color: "var(--clay)" }}
                    >
                      <Instagram size={18} />
                      @_baracustom
                    </a>
                  </>
                ),
              },
              { q: "Ensuite ?", a: "Après les deux heures d'atelier, vous pourrez repartir avec votre création. La peinture résiste à un lavage à 30°." },
            ].map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-0">
                <AccordionTrigger 
                  className="rounded-2xl px-4 py-4 font-marker text-lg hover:no-underline hover:bg-[var(--sand)] data-[state=open]:bg-[var(--sand)]"
                  style={{ color: "var(--cocoa)" }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2 text-base leading-relaxed" style={{ color: "var(--cocoa)" }}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* RESERVER */}
      <section
        id="reserver"
        className="relative z-10 py-28"
        style={{ background: "var(--cream)" }}
      >
        <div className="mx-auto mb-8 max-w-5xl px-6 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>Prends ton créneau</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
            Réserver un rendez-vous
          </h2>
          <p className="mt-4 font-handwritten text-xl" style={{ color: "var(--clay)" }}>
            Choisis ta date, ton créneau et viens customiser ta pièce !
          </p>
        </div>
        <div className="mx-auto flex max-w-5xl justify-center px-6">
          <a
            href="https://app.acuityscheduling.com/schedule.php?owner=32315373&ref=booking_button"
            target="_blank"
            rel="noopener noreferrer"
            className="acuity-embed-button float-neutral inline-block rounded-full px-8 py-4 font-marker text-lg transition-transform hover:scale-105"
            style={{ background: "var(--cocoa)", color: "var(--cream)", textDecoration: "none" }}
          >
            Prendre rendez-vous
          </a>
        </div>
      </section>

      {/* Nuages croquis flottants entre Réserver et Contact */}
      <div className="relative z-10 h-28 w-full overflow-hidden" aria-hidden="true">
        <svg
          className="float-soft absolute left-[12%] top-6 w-20"
          viewBox="0 0 100 60"
          fill="none"
          stroke="var(--clay)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 48 C 15 30, 35 20, 48 30 C 55 15, 80 15, 88 35 C 95 38, 95 48, 85 48 L 15 48 Z" />
        </svg>
        <svg
          className="float-neutral float-delay-2 absolute left-[42%] top-2 w-28"
          viewBox="0 0 100 60"
          fill="none"
          stroke="var(--clay)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 46 C 12 24, 38 14, 50 26 C 58 10, 86 12, 90 34 C 96 38, 92 46, 82 46 L 12 46 Z" />
        </svg>
        <svg
          className="float-soft float-delay-4 absolute left-[72%] top-8 w-16"
          viewBox="0 0 100 60"
          fill="none"
          stroke="var(--clay)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 47 C 18 28, 36 22, 46 31 C 54 18, 78 20, 84 36 C 90 40, 88 47, 78 47 L 18 47 Z" />
        </svg>
      </div>

      {/* CONTACT */}

      <section id="contact" className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
        
        <h2 className="font-display text-4xl leading-tight md:text-6xl" style={{ color: "var(--cocoa)" }}>
          Des questions ?
        </h2>
        <p className="mt-6 font-handwritten text-2xl" style={{ color: "var(--clay)" }}>
          On se fera un plaisir de te répondre dans les meilleurs délais!
        </p>
          <a
            href="mailto:moonwalcoeur@outlook.com"
            className="mx-auto mt-10 inline-block max-w-full break-words rounded-full px-6 py-4 font-marker text-lg transition-transform hover:scale-105 sm:px-10 sm:text-xl"
            style={{ background: "var(--cocoa)", color: "var(--cream)" }}
          >
            moonwalcoeur@outlook.com
          </a>
      </section>

      <footer
        className="relative z-10 border-t-2 px-6 py-8 text-center font-handwritten text-lg whitespace-pre-line"
        style={{ borderColor: "var(--clay)", color: "var(--cocoa)" }}
      >
        Bar à custom & MoonWalcoeur
        {"\n"}
        © 2026
      </footer>
    </div>
  );
}
