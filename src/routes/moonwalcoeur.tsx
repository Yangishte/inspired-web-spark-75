import { createFileRoute, Link } from "@tanstack/react-router";
import signature from "@/assets/brand/signature.png.asset.json";

export const Route = createFileRoute("/moonwalcoeur")({
  head: () => ({
    meta: [
      { title: "Moonwalcoeur — Bar à custom" },
      { name: "description", content: "Moonwalcoeur : l'univers créatif derrière le Bar à custom. Pièces sur-mesure, faites main avec cœur." },
    ],
  }),
  component: Moonwalcoeur,
});

function Moonwalcoeur() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8">
        <Link to="/" className="float-soft font-display text-2xl" style={{ color: "var(--cocoa)" }}>
          ← Bar à custom
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
        <span className="float-soft font-handwritten text-2xl" style={{ color: "var(--clay)" }}>
          Notre univers ✿
        </span>
        <h1 className="float-soft float-delay-1 mt-4 font-display text-5xl md:text-7xl" style={{ color: "var(--cocoa)" }}>
          Moonwalcoeur
        </h1>
        <div
          className="float-neutral mt-12 rounded-3xl border-4 p-8 shadow-2xl md:p-14"
          style={{ borderColor: "var(--cocoa)", background: "var(--cream)" }}
        >
          <img src={signature.url} alt="Signature Moonwalcoeur" className="mx-auto w-full max-w-xl" />
        </div>
        <p className="mt-10 max-w-2xl font-handwritten text-2xl md:text-3xl" style={{ color: "var(--cocoa)" }}>
          Un tandem créatif, deux frères, et l'envie de créer des pièces qui racontent une histoire.
        </p>
        <Link
          to="/"
          className="float-left mt-12 rounded-full px-7 py-3 font-marker text-lg transition-transform hover:scale-105"
          style={{ background: "var(--cocoa)", color: "var(--cream)" }}
        >
          Retour à l'atelier
        </Link>
      </section>
    </div>
  );
}
