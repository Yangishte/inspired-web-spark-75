import { createFileRoute } from "@tanstack/react-router";

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

function Doodle({ className = "", color = "var(--clay)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 30 Q 30 5 60 30 T 115 25" />
      <path d="M105 18 L 115 25 L 108 35" />
    </svg>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="font-marker text-sm tracking-wide transition-transform hover:-translate-y-0.5"
      style={{ color: "var(--cocoa)" }}
    >
      {label}
    </a>
  );
}

function Index() {
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
        <a href="#" className="font-display text-2xl tracking-tight tilt-left" style={{ color: "var(--cocoa)" }}>
          Bar à custom
        </a>
        <nav className="flex flex-wrap items-center gap-7">
          <NavLink label="L'atelier" href="#atelier" />
          <NavLink label="Services" href="#services" />
          <NavLink label="Galerie" href="#galerie" />
          <NavLink label="Tarifs" href="#tarifs" />
          <NavLink label="Contact" href="#contact" />
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
            Bienvenue au <span className="scribble-underline">Bar à custom</span>. On peint, on brode, on patche, on
            transforme tes vêtements et accessoires en pièces uniques — autour d'un café, dans une ambiance douce et
            ensoleillée.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full px-7 py-3 font-marker text-lg tilt-left transition-transform hover:scale-105"
              style={{ background: "var(--cocoa)", color: "var(--cream)" }}
            >
              Réserver une session
            </a>
            <a
              href="#galerie"
              className="rounded-full border-2 px-7 py-3 font-marker text-lg tilt-right transition-transform hover:scale-105"
              style={{ borderColor: "var(--clay)", color: "var(--clay)" }}
            >
              Voir la galerie
            </a>
          </div>
        </div>

        <div className="relative mx-auto">
          <div
            className="relative h-80 w-80 rotate-3 overflow-hidden rounded-[2rem] border-4 shadow-2xl md:h-96 md:w-96"
            style={{ borderColor: "var(--cocoa)", background: "var(--sand)" }}
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-display text-7xl" style={{ color: "var(--cocoa)" }}>★</div>
                <p className="mt-4 font-handwritten text-3xl" style={{ color: "var(--cocoa)" }}>
                  Pièce unique<br />n°327
                </p>
              </div>
            </div>
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
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl leading-tight md:text-6xl" style={{ color: "var(--cocoa)" }}>
            Un comptoir, des pinceaux, ton imagination.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-handwritten text-3xl" style={{ color: "var(--clay)" }}>
            Pas de série, pas de standard — chaque pièce raconte ton histoire.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
        <div className="mb-12 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--clay)" }}>Ce qu'on fait ↓</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
            Trois manières de customiser
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Peinture textile",
              desc: "Vestes, jeans, baskets — on peint à la main, à ton style.",
              tag: "★",
            },
            {
              title: "Broderie & patches",
              desc: "Lettrages, motifs, écussons cousus avec amour.",
              tag: "✿",
            },
            {
              title: "Upcycling",
              desc: "On transforme l'ancien en pièce qu'on a envie de re-porter.",
              tag: "✦",
            },
          ].map((s, i) => (
            <div
              key={s.title}
              className={`rounded-3xl border-2 p-8 transition-transform hover:-translate-y-1 ${i % 2 === 0 ? "tilt-left" : "tilt-right"}`}
              style={{ borderColor: "var(--cocoa)", background: "var(--cream)" }}
            >
              <div className="font-display text-5xl" style={{ color: "var(--clay)" }}>{s.tag}</div>
              <h3 className="mt-4 font-display text-2xl" style={{ color: "var(--cocoa)" }}>{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--cocoa)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALERIE */}
      <section id="galerie" className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <h2 className="font-display text-4xl md:text-5xl" style={{ color: "var(--cocoa)" }}>
          Quelques pièces qui sont sorties d'ici.
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "Veste denim — fleurs",
            "Sneakers — lettrage",
            "Tote bag — patches",
            "Sweat — broderie",
            "Casquette — peint",
            "Chemise — upcycling",
            "Jean — étoiles",
            "Foulard — main libre",
          ].map((label, i) => (
            <div
              key={label}
              className="group relative aspect-square overflow-hidden rounded-2xl border-2 transition-transform hover:-rotate-1"
              style={{
                borderColor: "var(--cocoa)",
                background: i % 2 === 0 ? "var(--sand)" : "var(--clay)",
              }}
            >
              <div className="absolute inset-0 grid place-items-center px-3 text-center">
                <span
                  className="font-handwritten text-2xl"
                  style={{ color: i % 2 === 0 ? "var(--cocoa)" : "var(--cream)" }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TARIFS */}
      <section
        id="tarifs"
        className="relative border-y-2"
        style={{ borderColor: "var(--clay)", background: "var(--cream)" }}
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-24 md:grid-cols-3">
          {[
            { name: "La petite touche", price: "25€", desc: "Un patch, un mot, une étoile. Pour goûter." },
            { name: "Le total look", price: "65€", desc: "Une pièce entière revisitée. Le best-seller.", featured: true },
            { name: "Le sur-mesure", price: "Sur devis", desc: "Projet long, mariage, cadeau. On en parle." },
          ].map((p) => (
            <div
              key={p.name}
              className="rounded-3xl border-2 p-8 text-center"
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
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">
        <Doodle className="mx-auto mb-6 w-32" color="var(--clay)" />
        <h2 className="font-display text-4xl leading-tight md:text-6xl" style={{ color: "var(--cocoa)" }}>
          On se retrouve à l'atelier&nbsp;?
        </h2>
        <p className="mt-6 font-handwritten text-2xl" style={{ color: "var(--clay)" }}>
          Réserve ta session, ramène ta pièce, on s'occupe du reste.
        </p>
        <a
          href="mailto:hello@baracustom.fr"
          className="mt-10 inline-block rounded-full px-10 py-4 font-marker text-xl tilt-left transition-transform hover:scale-105"
          style={{ background: "var(--cocoa)", color: "var(--cream)" }}
        >
          hello@baracustom.fr
        </a>
        <p className="mt-6 text-sm" style={{ color: "var(--cocoa)" }}>
          12 rue des Artisans · Ouvert du mercredi au samedi · 10h–19h
        </p>
      </section>

      <footer
        className="relative z-10 border-t-2 px-6 py-8 text-center font-handwritten text-lg"
        style={{ borderColor: "var(--clay)", color: "var(--cocoa)" }}
      >
        Bar à custom — fait main avec beaucoup de café · © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
