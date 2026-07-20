import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Star, Menu, X } from "lucide-react";
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
import matchaPaintImg from "@/assets/events/matcha-paint.jpg";
import lfmLogo from "@/assets/partners/lfm.png.asset.json";
import illustreLogo from "@/assets/partners/illustre.png.asset.json";
import visanaLogo from "@/assets/partners/visana.jpg.asset.json";
import archeNoeLogo from "@/assets/partners/arche-noe.png";
import littleGreenHouseLogo from "@/assets/partners/little-green-house.png.asset.json";
import corridorLogo from "@/assets/partners/corridor.webp.asset.json";
import manorLogo from "@/assets/partners/manor.png.asset.json";
import maisonBlancheLogo from "@/assets/partners/maison-blanche.png.asset.json";
import afterworkLogo from "@/assets/partners/afterwork.png.asset.json";
import clientCherry from "@/assets/clients/client-cherry.png.asset.json";
import clientDolphin from "@/assets/clients/client-dolphin-new.png.asset.json";
import clientLemon from "@/assets/clients/client-lemon.png.asset.json";
import clientBordel from "@/assets/clients/client-bordel.png.asset.json";
import clientRockpaper from "@/assets/clients/client-rockpaper.png.asset.json";


type Partner = {
  name: string;
  url: string;
  shape: "circle" | "rect";
  link?: string;
  text?: string;
};

const partners: Partner[] = [
  { name: "LFM La Radio", url: lfmLogo.url, shape: "circle", link: "https://www.lfm.ch/podcasts/le-6-9-lfm-linvite·e-du-6-9-16-03-2026-0818/", text: "Ecoute le podcast ici!" },
  { name: "L'Illustré", url: illustreLogo.url, shape: "rect" },
  { name: "Visana", url: visanaLogo.url, shape: "rect" },
  { name: "L'Arche de Noé", url: archeNoeLogo, shape: "rect" },
  { name: "Little Green House", url: littleGreenHouseLogo.url, shape: "rect" },
  { name: "Corridor Lausanne", url: corridorLogo.url, shape: "rect" },
  { name: "Manor", url: manorLogo.url, shape: "rect" },
  { name: "Maison Blanche", url: maisonBlancheLogo.url, shape: "circle" },
  { name: "Afterwork", url: afterworkLogo.url, shape: "rect" },
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

const CLIENT_IMAGES = [
  { src: clientCherry.url, alt: "Sac cerises peint main" },
  { src: clientDolphin.url, alt: "Trousse dauphins peinte main" },
  { src: clientLemon.url, alt: "Sac citrons peint main" },
  { src: clientBordel.url, alt: "Trousse Mon bordel artistique" },
  { src: clientRockpaper.url, alt: "Sac Rock Paper Scissors chats peint main" },
];

// Chaque position appartient à une "zone" (coin de la section). On garantit
// au plus une image par zone à un instant donné → pas de chevauchement entre
// deux images, et rien au centre où se trouve le texte.
const POSITIONS = [
  // Zone haut-gauche
  { zone: "tl", cls: "left-[6%] top-[12%] w-20 md:w-32", rot: "-8deg" },
  // Zone haut-droite
  { zone: "tr", cls: "right-[6%] top-[8%] w-20 md:w-32", rot: "10deg" },
  // Zone bas-gauche
  { zone: "bl", cls: "left-[8%] bottom-[20%] w-20 md:w-32", rot: "6deg" },
  // Zone bas-droite
  { zone: "br", cls: "right-[8%] bottom-[20%] w-20 md:w-32", rot: "-6deg" },
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickPosition(prevPosition: number, usedZones: Set<string>): number {
  const candidates = POSITIONS
    .map((p, i) => ({ i, zone: p.zone }))
    .filter(({ i, zone }) => !usedZones.has(zone) && i !== prevPosition);
  const pool = candidates.length
    ? candidates
    : POSITIONS.map((p, i) => ({ i, zone: p.zone })).filter(({ i }) => i !== prevPosition);
  return pool[Math.floor(Math.random() * pool.length)].i;
}

function ClientPeeks() {
  const [slots, setSlots] = useState<{ image: number; position: number }[]>(() => {
    const images = shuffle(CLIENT_IMAGES.map((_, i) => i));
    // Choisir 3 zones distinctes parmi les 4
    const zones = shuffle(["tl", "tr", "bl", "br"]).slice(0, 3);
    const positions = zones.map((z) => {
      const inZone = POSITIONS.map((p, i) => ({ i, zone: p.zone })).filter((p) => p.zone === z);
      return inZone[Math.floor(Math.random() * inZone.length)].i;
    });
    return Array.from({ length: 3 }, (_, i) => ({ image: images[i], position: positions[i] }));
  });

  const cycleSlot = (slotIdx: number) => {
    setSlots((prev) => {
      const usedImages = new Set(prev.map((s) => s.image));
      usedImages.delete(prev[slotIdx].image);
      const availableImages = CLIENT_IMAGES.map((_, i) => i).filter((i) => !usedImages.has(i) && i !== prev[slotIdx].image);
      const imagePool = availableImages.length
        ? availableImages
        : CLIENT_IMAGES.map((_, i) => i).filter((i) => i !== prev[slotIdx].image);
      const nextImage = imagePool[Math.floor(Math.random() * imagePool.length)];

      const usedZones = new Set(prev.map((s, idx) => (idx === slotIdx ? null : POSITIONS[s.position].zone)).filter(Boolean) as string[]);
      const nextPosition = pickPosition(prev[slotIdx].position, usedZones);

      const copy = [...prev];
      copy[slotIdx] = { image: nextImage, position: nextPosition };
      return copy;
    });
  };


  return (
    <>
      {slots.map((slot, i) => {
        const pos = POSITIONS[slot.position];
        const img = CLIENT_IMAGES[slot.image];
        return (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            aria-hidden="true"
            className={`pointer-events-none absolute z-0 client-peek ${pos.cls}`}
            style={{ ["--peek-rot" as string]: pos.rot, animationDelay: `${i * 5}s` }}
            onAnimationIteration={() => cycleSlot(i)}
          />
        );
      })}
    </>
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
  
  
  const [hoveredPricing, setHoveredPricing] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Scroll-reveal for sections
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
      <header className="relative z-20 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 pt-8">
        <a href="#" className="float-soft font-display text-2xl tracking-tight" style={{ color: "var(--cocoa)" }}>
          Bar à custom
        </a>
        {/* Desktop nav */}
        <nav className="hidden md:flex flex-wrap items-center gap-7">
          <NavLink label="L'atelier" href="#atelier" delay={1} />
          <NavLink label="Événements" href="#evenements" delay={2} />
          <NavLink label="Services" href="#services" delay={3} />
          <NavLink label="Tarifs" href="#tarifs" delay={4} />
          <NavLink label="FAQ" href="#faq" delay={5} />
          <NavLink label="Réserver" href="#reserver" delay={6} />
          <NavLink label="Contact" href="#contact" delay={1} />
        </nav>
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden grid h-11 w-11 place-items-center transition-transform active:scale-95"
          style={{ color: "var(--cocoa)" }}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden w-full mt-2 flex flex-col gap-4 rounded-2xl border-2 p-5"
            style={{ borderColor: "var(--cocoa)", background: "var(--cream)" }}
          >
            {[
              { label: "L'atelier", href: "#atelier" },
              { label: "Événements", href: "#evenements" },
              { label: "Services", href: "#services" },
              { label: "Tarifs", href: "#tarifs" },
              { label: "FAQ", href: "#faq" },
              { label: "Réserver", href: "#reserver" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-marker text-base tracking-wide"
                style={{ color: "var(--cocoa)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
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
        data-reveal="fade-up"
        className="reveal relative border-y-2"
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
      <section id="evenements" data-reveal="zoom-in" className="reveal relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-6 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>Réserve ta place ↓</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
            Nos événements
          </h2>
        </div>
        {(() => {
          const events = [
            {
              date: "Samedi 5 septembre 2026",
              titre: "Matcha & Paint",
              lieu: "Au bord du lac, St-Sulpice",
              time: "Horaire à venir",
              price: "Tarif à venir",
              desc: "Retrouve-nous le 5 septembre pour un atelier en collaboration entre My Matcha Harmony et Le Bar à Custom. Pendant que tu laisses parler ta créativité, Michela sera là pour te faire découvrir de délicieux matcha latte préparés avec le matcha cérémonial de Shizuoka. 🍵🎨",
              past: false,
              image: matchaPaintImg,
              imagePosition: "center",
              instagramUrl: null,
            },
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
              price: "CHF 90.- / personne",
              desc: "Le Bar à Custom déménage à l'hôtel pour un atelier Brunch & Paint 🎨🥞 Petit brunch en terrasse, puis tu peins ton support textile et repars avec le bide bien rempli et un sac supermégatrop joli ! 🤩",
              past: true,
              image: brunchTerrasseImg.url,
              instagramUrl: "https://www.instagram.com/p/DYKe5apsLhx/",
            },
            {
              date: "Samedi 25 avril 2026",
              titre: "Atelier au Restaurant Manor Lausanne",
              lieu: "Restaurant Manor Lausanne",
              time: "2 heures",
              price: "CHF 49.- / personne",
              desc: "Le Bar à Custom déménage à Manor le temps d'un atelier exceptionnel. Tu peins sur ton support, tu sirotes une petite boisson, tu dégustes quelques mignardises et tu crées un souvenir inoubliable 😍",
              past: true,
              image: manorLausanneImg.url,
              imagePosition: "center 25%",
              instagramUrl: "https://www.instagram.com/reel/DZK1T1woaFi/",
            },
          ];

          const renderEventCard = (e: typeof events[0]) => {
            const ctaHref = e.instagramUrl || "#reserver";
            const ctaLabel = e.past ? "Voir" : "Réserver";
            return (
              <div
                key={e.titre}
                className="flex flex-col overflow-hidden rounded-3xl border-2 shadow-xl"
                style={{ borderColor: "var(--cocoa)", background: "var(--cream)" }}
              >
                {/* IMAGE / TOP BUBBLE */}
                <div className="relative m-3 h-48 overflow-hidden rounded-2xl sm:h-56">
                  {e.image ? (
                    <img
                      src={e.image}
                      alt={e.titre}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: (e as { imagePosition?: string }).imagePosition || "center" }}
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #f4d9a0 0%, #f5c9b0 50%, #f0bcc0 100%)",
                      }}
                    >
                      <span className="font-handwritten text-2xl" style={{ color: "var(--cocoa)" }}>
                        PROCHAINEMENT
                      </span>
                    </div>
                  )}
                  {e.past && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="relative rotate-[-10deg]">
                        <div
                          className="font-marker rounded-2xl border-4 px-5 py-2 text-3xl uppercase tracking-widest"
                          style={{
                            color: "#dc2626",
                            borderColor: "#dc2626",
                            background: "rgba(255, 255, 255, 0.85)",
                            boxShadow: "4px 4px 0 0 rgba(220, 38, 38, 0.35)",
                          }}
                        >
                          Passé
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
                  <div className="space-y-1">
                    {e.lieu && (
                      <p className="text-sm" style={{ color: "var(--cocoa)" }}>
                        <span aria-hidden="true" className="inline-block" style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif" }}>📍</span>{" "}
                        <span className="font-marker">{e.lieu}</span>
                      </p>
                    )}
                    {e.date && (
                      <p className="text-sm" style={{ color: "var(--cocoa)" }}>
                        <span aria-hidden="true" className="inline-block" style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif" }}>📅</span>{" "}
                        <span className="font-marker">{e.date}</span>
                      </p>
                    )}
                    {e.time && (
                      <p className="text-sm" style={{ color: "var(--cocoa)" }}>
                        <span aria-hidden="true" className="inline-block" style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif" }}>🗓️</span>{" "}
                        <span className="font-marker">{e.time}</span>
                      </p>
                    )}
                  </div>
                  <h3
                    className="mt-3 font-display text-2xl leading-tight"
                    style={{ color: "var(--cocoa)" }}
                  >
                    {e.titre}
                  </h3>
                  <div className="mb-4 flex flex-1 flex-col">
                    <p
                      className="mt-3 text-base leading-relaxed opacity-90"
                      style={{ color: "var(--cocoa)" }}
                    >
                      {e.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <a
                      href={ctaHref}
                      target={e.instagramUrl ? "_blank" : undefined}
                      rel={e.instagramUrl ? "noopener noreferrer" : undefined}
                      className="rounded-xl px-6 py-3 font-marker text-base transition-transform hover:scale-105"
                      style={{ background: "var(--cocoa)", color: "var(--cream)" }}
                    >
                      {ctaLabel}
                    </a>
                    {e.price && (
                      <span
                        className="rounded-xl px-5 py-3 font-marker text-base whitespace-pre-line text-center leading-tight"
                        style={{ background: "#e8b84a", color: "var(--cocoa)" }}
                      >
                        {e.price.split("\n")[0]}
                        {e.price.includes("\n") && (
                          <span className="block text-xs opacity-90">
                            {e.price.split("\n").slice(1).join(" ")}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          };

          return (
            <div className="space-y-10">
              {/* À VENIR */}
              <div>
                <div className="mb-4 h-1 rounded-full" style={{ background: "var(--cocoa)" }} />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {events.filter((e) => !e.past).map(renderEventCard)}
                </div>
              </div>

              {/* PASSÉS */}
              <div>
                <div className="mb-4 h-1 rounded-full" style={{ background: "var(--cocoa)" }} />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {events.filter((e) => e.past).map(renderEventCard)}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* PARTENAIRES — Bandeau défilant */}
      <section aria-label="Ils nous font confiance" data-reveal="fade-left" className="reveal relative z-10 py-6 overflow-hidden" style={{ background: "var(--cocoa)" }}>
        <div className="mb-4 text-center">
          <h2 className="font-display text-xl md:text-2xl" style={{ color: "var(--cream)" }}>
            Ils nous font confiance
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-10 md:gap-12 marquee-track w-max">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className={`shrink-0 flex flex-col items-center justify-center ${p.text ? "gap-1" : ""}`}
              >
                <div className="flex h-16 w-28 md:h-20 md:w-36 items-center justify-center">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full w-full items-center justify-center"
                    >
                      {p.shape === "circle" ? (
                        <div className="h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full">
                          <img
                            src={p.url}
                            alt={p.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <img
                          src={p.url}
                          alt={p.name}
                          className="h-full w-full object-contain px-2"
                          loading="lazy"
                        />
                      )}
                    </a>
                  ) : p.shape === "circle" ? (
                    <div className="h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-full">
                      <img
                        src={p.url}
                        alt={p.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <img
                      src={p.url}
                      alt={p.name}
                      className="h-full w-full object-contain px-2"
                      loading="lazy"
                    />
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
      </section>

      {/* SERVICES — Carrousel 3D */}
      <section id="services" data-reveal="flip-up" className="reveal relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>Choisis ton support!</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
            Exemples de supports
          </h2>
        </div>
        <BagsCarousel3D />
      </section>


      {/* TARIFS */}
      <section
        id="tarifs"
        data-reveal="blur-in"
        className="reveal relative border-y-2"
        style={{ borderColor: "var(--clay)", background: "var(--cream)" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2 md:gap-10">
            {[
              { name: "Adulte", price: "CHF 49.-", desc: "2 heures d'atelier, boisson offerte, support inclus." },
              { name: "Enfant", price: "CHF 39.-", desc: "2 heures d'atelier, boisson offerte, support inclus.", featured: true },
            ].map((p, i) => (
              <a
                key={p.name}
                href="https://app.acuityscheduling.com/schedule.php?owner=32315373&ref=booking_button"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 p-5 text-center transition-all duration-500 ease-out sm:p-8 ${i === 0 ? "float-left" : "float-right float-delay-2"} ${hoveredPricing === p.name ? "md:z-10 md:scale-105" : hoveredPricing ? "md:scale-95 md:opacity-80" : ""}`}
                style={{
                  borderColor: "var(--cocoa)",
                  background: p.featured ? "var(--cocoa)" : "transparent",
                  color: p.featured ? "var(--cream)" : "var(--cocoa)",
                  textDecoration: "none",
                }}
                onMouseEnter={() => setHoveredPricing(p.name)}
                onMouseLeave={() => setHoveredPricing(null)}
                aria-label={`Carte ${p.name}, ${p.price}, réserver`}
              >
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="mt-4 font-display text-4xl md:text-5xl">{p.price}</p>
                <p className="mt-4 text-base leading-relaxed opacity-90">{p.desc}</p>
                <span
                  className={`mt-6 inline-flex items-center justify-center rounded-full border-2 px-6 py-2 font-handwritten text-lg transition-all duration-500 ease-out opacity-100 translate-y-0 ${hoveredPricing === p.name ? "md:translate-y-0 md:opacity-100" : "md:translate-y-4 md:opacity-0"}`}
                  style={{
                    borderColor: p.featured ? "var(--cream)" : "var(--cocoa)",
                    background: "transparent",
                    color: p.featured ? "var(--cream)" : "var(--cocoa)",
                  }}
                >
                  Réserver
                </span>
              </a>
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
      <section id="faq" data-reveal="fade-right" className="reveal relative z-10 mx-auto max-w-4xl px-6 py-28">
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
              { q: "📍 Où se déroule l'atelier ?", a: (
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
              { 
                q: "💰 Quels sont les tarifs ?", 
                a: (
                  <div className="whitespace-pre-line">
                    Adulte : CHF 49.-&nbsp;{"\n"}
                    Enfant : CHF 39.- (pour les enfants de 13 ans ou moins, au tarif standard de CHF 49.-{"\n"}
                    En présentant la carte d'identité de l'enfant sur place, CHF 10.- vous seront remboursés.)
                  </div>
                ) 
              },
              {
                q: "📅 Comment réserver ?",
                a: (
                  <div className="space-y-3">
                    <ol className="list-decimal space-y-2 pl-5">
                      <li>
                        Aller à{" "}
                        <a
                          href="https://app.acuityscheduling.com/schedule/6d9effbc/appointment/81047761/calendar/10150049?ref=booking_button"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                          style={{ color: "var(--clay)" }}
                        >
                          la page de réservation
                        </a>
                        &nbsp;;
                      </li>
                      <li>Sélectionner sous quantité : le nombre de personnes participant à l'atelier ;</li>
                      <li>Choisissez une date et un créneau horaire ;</li>
                      <li>Cliquez sur : Sélectionner et continuer ;</li>
                      <li>
                        Remplissez vos informations et réglez votre session directement sur la page suivante via notre plateforme de paiement sécurisée. Vous recevrez ensuite un e-mail de confirmation.
                      </li>
                    </ol>
                  </div>
                ),
              },
              {
                q: "👧 Comment réserver pour les enfants ?",
                a: (
                  <div className="space-y-3">
                    <p>
                      Réservez directement sur le site web pour les enfants de 13 ans ou moins, au tarif standard de CHF 49.-. En présentant la carte d'identité de l'enfant sur place, CHF 10.- vous seront remboursés, réduisant ainsi le prix final de l'enfant à CHF 39.-.
                    </p>
                    <p>5 à 13 ans (CHF 39.- / dont CHF 10.- des CHF 49.- remboursés sur place)</p>
                    <p>La présence d'un participant adulte est obligatoire pour les enfants de moins de 14 ans.</p>
                  </div>
                ),
              },
              { q: "⏱️ Quelle est la durée de l'atelier ?", a: "2 heures avec boisson offertes !" },
              {
                q: "📝 Comment annuler ou modifier ma réservation ?",
                a: (
                  <div className="space-y-3">
                    <p>
                      Vous avez la possibilité de modifier la date de votre réservation jusqu'à 48 heures avant le début de l'atelier. Ce délai passé, aucune modification ne sera acceptée.
                    </p>
                    <p>
                      La modification de votre réservation est possible via le lien correspondant donné dans le courriel de confirmation ou par e-mail à :{" "}
                      <a href="mailto:lebaracustom@gmail.com" className="underline" style={{ color: "var(--clay)" }}>
                        lebaracustom@gmail.com
                      </a>
                    </p>
                    <p>
                      Dans aucun cas, nous ne procéderons au remboursement d'une réservation. Deux possibilités sont proposées :
                    </p>
                    <ol className="list-decimal space-y-1 pl-5">
                      <li>Replanifier un rendez-vous</li>
                      <li>Recevoir un bon valeur pour une prochaine réservation.</li>
                    </ol>
                    <p>Nous vous remercions pour votre compréhension.</p>
                  </div>
                ),
              },
              { q: "👜 Dois-je venir avec mes supports ?", a: "Non pas besoin! Choisissez parmi divers supports: des trousses grandes ou petites, des sacs de diverses tailles et formes, des sacs à dos, etc." },
              {
                q: "📱 Avez-vous des réseaux sociaux ?",
                a: (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span>Instagram</span>
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
                    </div>
                    <div className="flex items-center gap-3">
                      <span>TikTok</span>
                      <a
                        href="https://www.tiktok.com/@_baracustom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-marker underline"
                        style={{ color: "var(--clay)" }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12a4 4 0 1 0 4 4V4c.667 1.333 2.3 4 6 4" />
                        </svg>
                        @_baracustom
                      </a>
                    </div>
                  </div>
                ),
              },
              {
                q: "🎁 Possibilité de faire des bons cadeaux, événements ou privatiser ?",
                a: (
                  <p>
                    Pour les bons cadeaux, les évènements privés, team-building, anniversaires, EVJF, EVJG, etc. veuillez nous contacter par e-mail :{" "}
                    <a href="mailto:moonwalcoeur@outlook.com" className="underline" style={{ color: "var(--clay)" }}>
                      moonwalcoeur@outlook.com
                    </a>
                  </p>
                ),
              },
              { q: "✨ Après l'atelier ?", a: "Après les deux heures d'atelier, vous pourrez repartir avec votre création. La peinture résiste à un lavage à 30°." },
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
        data-reveal="rotate-in"
        className="reveal relative z-10 py-28"
        style={{ background: "var(--cream)", overflow: "visible" }}
      >
        {/* Créations clients qui apparaissent/disparaissent — positions permutées à chaque cycle */}
        <ClientPeeks />


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
        {/* Nuage 1 : petit et rond */}
        <svg
          className="float-soft absolute left-[10%] top-7 w-20"
          viewBox="0 0 160 90"
          fill="none"
          stroke="var(--cloud-shadow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M28 70 C 10 70, 8 52, 22 48 C 18 32, 38 24, 52 34 C 56 16, 86 14, 96 30 C 108 22, 130 28, 132 46 C 150 44, 154 62, 142 70 L 36 70 C 30 74, 24 74, 28 70 Z"
            fill="var(--cloud-fill)"
          />
          <path d="M42 52 C 48 46, 60 48, 64 54" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
          <path d="M84 40 C 90 34, 104 36, 108 44" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
        </svg>

        {/* Nuage 2 : large et étiré */}
        <svg
          className="float-neutral float-delay-2 absolute left-[38%] top-1 w-36"
          viewBox="0 0 180 90"
          fill="none"
          stroke="var(--cloud-shadow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M18 68 C 2 68, 0 50, 16 46 C 12 30, 34 22, 48 32 C 52 14, 86 10, 98 26 C 112 16, 138 20, 142 38 C 162 36, 172 54, 158 64 C 164 72, 150 78, 138 74 L 32 74 C 20 78, 10 72, 18 68 Z"
            fill="var(--cloud-fill)"
          />
          <path d="M34 54 C 40 48, 54 50, 60 56" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
          <path d="M78 40 C 86 32, 104 34, 110 42" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
          <path d="M120 52 C 128 46, 142 48, 146 56" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
        </svg>

        {/* Nuage 3 : moyen avec bosse haute */}
        <svg
          className="float-soft float-delay-4 absolute left-[74%] top-8 w-24"
          viewBox="0 0 160 90"
          fill="none"
          stroke="var(--cloud-shadow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M24 72 C 8 72, 6 52, 22 48 C 18 28, 42 18, 56 30 C 60 10, 94 8, 104 24 C 118 16, 138 22, 140 40 C 156 38, 162 56, 150 66 C 156 74, 142 80, 130 76 L 34 76 C 26 80, 16 76, 24 72 Z"
            fill="var(--cloud-fill)"
          />
          <path d="M38 52 C 44 46, 56 48, 60 54" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
          <path d="M76 36 C 82 30, 96 32, 100 40" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
          <path d="M112 48 C 118 42, 130 44, 134 52" stroke="var(--cloud-highlight)" strokeWidth="1.8" opacity="0.9" />
        </svg>
      </div>


      {/* CONTACT */}

      <section id="contact" data-reveal="zoom-out" className="reveal relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
        
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
          <div className="mx-auto mt-6 flex items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/_baracustom/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center rounded-full p-3 transition-transform hover:scale-110"
              style={{ background: "var(--cocoa)", color: "var(--cream)" }}
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@_baracustom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex items-center justify-center rounded-full p-3 transition-transform hover:scale-110"
              style={{ background: "var(--cocoa)", color: "var(--cream)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4c.667 1.333 2.3 4 6 4" />
              </svg>
            </a>
          </div>
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
