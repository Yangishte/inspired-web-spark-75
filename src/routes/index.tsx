import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
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

function Index() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 5000);
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
            Atelier de personnalisation — fait main ✿
          </span>
          <h1
            className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl"
            style={{ color: "var(--cocoa)" }}
          >
            Et si ta pièce préférée n'existait qu'en un seul exemplaire&nbsp;?
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed" style={{ color: "var(--cocoa)" }}>
            Bienvenue au <span className="scribble-underline">Bar à custom</span>. On peint, on brode, on transforme les supports vierges et
            accessoires en pièces uniques — autour d'une boisson, dans une ambiance douce et
            ensoleillée.
            <br />
            <br />
            Accessible dès 6ans.
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
              date: "Samedi 25 avril 2026",
              titre: "Atelier au Restaurant Manor Lausanne",
              lieu: "Restaurant Manor Lausanne",
              time: "Durée : 2 heures",
              price: "CHF 49.- / personne",
              desc: "Le Bar à Custom déménage à Manor le temps d'un atelier exceptionnel. Tu peins sur ton support, tu sirotes une petite boisson, tu dégustes quelques mignardises et tu crées un souvenir inoubliable 😍"
            },
            {
              date: "Dimanche 31 mai 2026",
              titre: "Brunch & Paint à l'Hôtel En Bellevue",
              lieu: "En Bellevue 1, 1163 Etoy",
              time: "10h – 14h",
              price: "CHF 90.- / personne (brunch + atelier)",
              desc: "Le Bar à Custom déménage à l'hôtel pour un atelier Brunch & Paint 🎨🥞 Petit brunch en terrasse, puis tu peins ton support textile et repars avec le bide bien rempli et un sac supermégatrop joli ! 🤩"
            },
            {
              date: "Dimanche 7 juin 2026",
              titre: "Vin & Créativité au Domaine Maison Blanche",
              lieu: "Domaine Maison Blanche – Mont-sur-Rolle",
              time: "13h30 – 15h30",
              price: "CHF 65.- / personne",
              desc: "Un après-midi entre vin, soleil et créativité 🍇🖌️ Antoine nous parle de son domaine, puis tu profites de vin à discrétion tout en personnalisant ton support textile dans une ambiance détendue et inspirante."
            },
            { date: "Juin 2025", titre: "Festival des artistes", lieu: "Lausanne", desc: "Musique, art de rue et un stand Moonwalcoeur où chacun est reparti avec un souvenir unique." },
            { date: "Septembre 2025", titre: "Pop-up à la Manère", lieu: "Vevey", desc: "Collaboration éphémère dans une boutique locale pour présenter notre nouvelle collection." },
          ].map((e) => (
            <div
              key={e.titre}
              className="rounded-3xl border-2 p-6 transition-transform duration-300 hover:scale-[1.02]"
              style={{ borderColor: "var(--cocoa)", background: "var(--cream)" }}
            >
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
          ))}
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
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-24 md:grid-cols-3">
          {[
            { name: "Adulte", price: "CHF 49.-", desc: "2 heures d'atelier, boisson offerte, support inclus." },
            { name: "Enfant", price: "CHF 39.-", desc: "2 heures d'atelier, boisson offerte, support inclus.", featured: true },
          ].map((p, i) => (
            <div
              key={p.name}
              className={`rounded-3xl border-2 p-8 text-center ${i === 0 ? "float-left" : "float-right float-delay-2"}`}
              style={{
                borderColor: "var(--cocoa)",
                background: p.featured ? "var(--cocoa)" : "transparent",
                color: p.featured ? "var(--cream)" : "var(--cocoa)",
              }}
            >
              <h3 className="font-display text-2xl">{p.name}</h3>
              <p className="mt-4 font-display text-5xl">{p.price}</p>
              <p className="mt-4 text-base leading-relaxed opacity-90">{p.desc}</p>
            </div>
          ))}
          <Link
            to="/moonwalcoeur"
            className="animate-shimmer-glow group rounded-3xl border-2 p-8 text-center transition-transform hover:scale-[1.03]"
            style={{ borderColor: "var(--clay)", background: "var(--cream)", color: "var(--cocoa)" }}
          >
            <h3 className="font-display text-2xl">Le sur-mesure</h3>
            <p className="mt-4 font-display text-4xl" style={{ color: "var(--clay)" }}>Sur devis</p>
            <p className="mt-4 text-base leading-relaxed opacity-90">Projet long, mariage, cadeau. On en parle.</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <img src={moonwalcoeurLogo.url} alt="Moonwalcoeur" className="h-8 w-auto" />
              <p className="font-handwritten text-xl" style={{ color: "var(--clay)" }}>Découvrir Moonwalcoeur →</p>
            </div>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 py-28">
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
          className="float-left mx-auto mt-10 inline-block rounded-full px-10 py-4 font-marker text-xl transition-transform hover:scale-105"
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
