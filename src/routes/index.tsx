import { createFileRoute } from "@tanstack/react-router";
import palm from "@/assets/palm.png";
import portrait from "@/assets/portrait.png";
import jungle from "@/assets/jungle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hey, I'm Sam — I make ridiculously fun websites" },
      {
        name: "description",
        content:
          "Personal playground of a designer and developer who refuses to make another beige, boring website. Come for the palm trees, stay for the squiggles.",
      },
      { property: "og:title", content: "Hey, I'm Sam — I make ridiculously fun websites" },
      {
        property: "og:description",
        content: "Designer, developer, professional doodler. Built with love and zero corporate vibes.",
      },
      { property: "og:image", content: jungle },
      { name: "twitter:image", content: jungle },
    ],
  }),
  component: Index,
});

function NavIcon({ label, color }: { label: string; color: string }) {
  return (
    <a
      href="#"
      className="group flex flex-col items-center gap-1 font-marker text-sm tracking-wide transition-transform hover:-translate-y-1"
      style={{ color }}
    >
      <div
        className="grid h-12 w-12 place-items-center rounded-full border-2 transition-colors"
        style={{ borderColor: color }}
      >
        <span className="text-lg">★</span>
      </div>
      {label}
    </a>
  );
}

function Doodle({ className = "", color = "#3ee0d6" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M5 30 Q 30 5 60 30 T 115 25" />
      <path d="M105 18 L 115 25 L 108 35" />
    </svg>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* ambient palm decorations */}
      <img
        src={palm}
        alt=""
        aria-hidden
        width={896}
        height={1216}
        className="pointer-events-none absolute -right-32 top-[10vh] hidden w-[480px] opacity-90 float-slow md:block"
      />
      <img
        src={palm}
        alt=""
        aria-hidden
        width={896}
        height={1216}
        className="pointer-events-none absolute -left-40 top-[120vh] hidden w-[380px] -scale-x-100 opacity-80 float-slow md:block"
      />

      {/* NAV */}
      <header className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 pt-8">
        <a
          href="#"
          className="font-marker text-3xl tracking-wide tilt-left"
          style={{ color: "var(--neon-yellow)" }}
        >
          Sam Squiggle
        </a>
        <nav className="flex flex-wrap items-center gap-7">
          <NavIcon label="Course" color="var(--neon-yellow)" />
          <NavIcon label="Videos" color="var(--neon-yellow)" />
          <NavIcon label="Talks" color="var(--neon-yellow)" />
          <NavIcon label="Articles" color="var(--neon-yellow)" />
          <NavIcon label="Work" color="var(--neon-yellow)" />
          <NavIcon label="Say hi" color="var(--neon-yellow)" />
        </nav>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pb-32 pt-20 md:grid-cols-2 md:pt-32">
        <div className="relative mx-auto md:mx-0">
          <span
            className="absolute -left-8 -top-2 rotate-[-14deg] font-handwritten text-2xl"
            style={{ color: "var(--neon-cyan)" }}
          >
            That's me! →
          </span>
          <span
            className="absolute -right-4 top-10 rotate-[8deg] font-handwritten text-lg leading-tight md:text-xl"
            style={{ color: "var(--neon-cyan)" }}
          >
            I do this hair thing
            <br /> to look taller.
          </span>
          <img
            src={portrait}
            alt="A friendly cartoon portrait of Sam"
            width={1024}
            height={1024}
            className="relative w-72 md:w-96"
          />
          <span
            className="absolute -bottom-2 left-8 rotate-[-6deg] font-handwritten text-lg leading-tight"
            style={{ color: "var(--neon-cyan)" }}
          >
            I rarely wear collars.
            <br /> They get in the way.
          </span>
        </div>

        <div>
          <h1
            className="font-display text-5xl leading-[0.95] md:text-7xl"
            style={{ color: "var(--neon-yellow)" }}
          >
            I'm tired of boring websites.
          </h1>
          <p className="mt-8 font-handwritten text-2xl leading-snug md:text-3xl" style={{ color: "var(--neon-cyan)" }}>
            So I built this loud little thing instead. It makes me happy. Sorry about the giant images, I'm into them.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-full px-7 py-3 font-marker text-lg tilt-left transition-transform hover:scale-105"
              style={{ background: "var(--neon-yellow)", color: "var(--primary-foreground)" }}
            >
              Poke around
            </a>
            <a
              href="#hi"
              className="rounded-full border-2 px-7 py-3 font-marker text-lg tilt-right transition-transform hover:scale-105"
              style={{ borderColor: "var(--neon-pink)", color: "var(--neon-pink)" }}
            >
              Say hi 👋
            </a>
          </div>
        </div>
      </section>

      {/* JUNGLE BAND */}
      <section className="relative">
        <img
          src={jungle}
          alt="Low-poly jungle sunset"
          width={1920}
          height={1024}
          loading="lazy"
          className="h-[55vh] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <h2
            className="max-w-4xl font-display text-4xl leading-tight drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] md:text-6xl"
            style={{ color: "var(--neon-yellow)" }}
          >
            I design things, write code, make videos, and dream of the 80s &amp; 90s.
          </h2>
        </div>
      </section>

      {/* ABOUT BLURB */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="font-handwritten text-3xl leading-snug md:text-4xl" style={{ color: "var(--neon-cyan)" }}>
          I built{" "}
          <a href="#" className="scribble-underline" style={{ color: "var(--neon-yellow)" }}>
            Wobblefish CMS
          </a>{" "}
          (the most ridiculous CMS ever) and teach in my{" "}
          <a href="#" className="scribble-underline" style={{ color: "var(--neon-yellow)" }}>
            Radical Web Course
          </a>
          . I live in a small town, drink too much coffee, learn fast, try to put others first, and believe websites
          should feel like a Saturday morning, not a Monday meeting.
        </p>
      </section>

      {/* LATEST THING */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-32">
        <div className="mb-8 text-center">
          <span className="font-handwritten text-2xl" style={{ color: "var(--neon-pink)" }}>
            Check out my latest thing! ↓
          </span>
        </div>
        <a
          href="#"
          className="group relative block overflow-hidden rounded-3xl border-4 p-10 transition-transform hover:-rotate-1 md:p-16"
          style={{
            borderColor: "var(--neon-yellow)",
            background: "linear-gradient(135deg, oklch(0.32 0.08 200), oklch(0.26 0.06 200))",
          }}
        >
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-display text-4xl md:text-6xl" style={{ color: "var(--neon-yellow)" }}>
                Radical Web Course
              </h3>
              <p
                className="mt-4 font-handwritten text-2xl"
                style={{ color: "var(--neon-cyan)" }}
              >
                A rebellious, possibly life-changing course on building websites with personality. Yes, really.
              </p>
            </div>
            <div
              className="grid h-32 w-32 place-items-center rounded-full font-marker text-xl tilt-right transition-transform group-hover:scale-110"
              style={{ background: "var(--neon-pink)", color: "white" }}
            >
              Enroll →
            </div>
          </div>
        </a>
      </section>

      {/* ARTICLES */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-32">
        <h2
          className="ml-auto max-w-2xl text-right font-display text-3xl leading-tight md:text-5xl"
          style={{ color: "var(--neon-yellow)" }}
        >
          I scribbled these articles recently &amp; right-aligned them for absolutely no reason.
        </h2>
        <ul className="mt-12 space-y-6 text-right">
          {[
            { when: "2 weeks ago", title: "Hey Starbucks, I have some ideas for you" },
            { when: "1 month ago", title: "Beep beep beep, here comes the squiggle truck!" },
            { when: "3 months ago", title: "Finally, a side project worth abandoning properly" },
            { when: "6 months ago", title: "Why your portfolio should embarrass your mom (a little)" },
          ].map((a) => (
            <li key={a.title} className="group">
              <a
                href="#"
                className="inline-flex flex-wrap items-baseline justify-end gap-x-4 gap-y-1 transition-transform hover:-translate-x-1"
              >
                <span className="font-handwritten text-xl" style={{ color: "var(--neon-cyan)" }}>
                  {a.when}
                </span>
                <span
                  className="font-marker text-2xl group-hover:underline md:text-3xl"
                  style={{ color: "var(--neon-yellow)" }}
                >
                  {a.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* SAY HI */}
      <section id="hi" className="relative z-10 mx-auto max-w-4xl px-6 pb-40 text-center">
        <Doodle className="mx-auto mb-6 w-32" color="var(--neon-pink)" />
        <h2
          className="font-display text-5xl leading-tight md:text-7xl"
          style={{ color: "var(--neon-yellow)" }}
        >
          Wanna make something weird together?
        </h2>
        <p className="mt-6 font-handwritten text-2xl" style={{ color: "var(--neon-cyan)" }}>
          I take on a small handful of projects a year. If yours has palm trees, even better.
        </p>
        <a
          href="mailto:hi@samsquiggle.com"
          className="mt-10 inline-block rounded-full px-10 py-4 font-marker text-xl tilt-left transition-transform hover:scale-110"
          style={{ background: "var(--neon-pink)", color: "white" }}
        >
          hi@samsquiggle.com
        </a>
      </section>

      <footer className="relative z-10 border-t-2 px-6 py-10 text-center font-handwritten text-xl" style={{ borderColor: "var(--neon-yellow)", color: "var(--neon-cyan)" }}>
        Made with neon markers &amp; way too much coffee. © {new Date().getFullYear()}.
      </footer>
    </div>
  );
}
