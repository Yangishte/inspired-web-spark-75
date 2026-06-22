export function FloatingClouds({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <div className="relative mx-auto max-w-6xl py-6">
        <svg
          className="float-left float-delay-1 opacity-80"
          viewBox="0 0 120 70"
          width="120"
          height="70"
          style={{ position: "absolute", left: "6%", top: "20%", color: "var(--cream)" }}
          fill="currentColor"
        >
          <path d="M25 55C11.2 55 0 44.4 0 31.5 0 21.5 7.2 13.2 17 11c2.8-10.2 13.6-18 26.5-18 13.6 0 25 8.7 28.2 20.5 1.2-.2 2.5-.3 3.8-.3 13.3 0 24 10.3 24 23 0 12.5-10.1 22.8-22.5 23H25z" />
        </svg>

        <svg
          className="float-neutral float-delay-3 opacity-90"
          viewBox="0 0 160 90"
          width="160"
          height="90"
          style={{ position: "absolute", left: "35%", top: "0%", color: "var(--sand)" }}
          fill="currentColor"
        >
          <path d="M35 72C16.2 72 0 57.6 0 39.5 0 26 10 14.7 24 11.5c3.8-13.5 18-23.5 35-23.5 18 0 33.2 11.5 37.5 27 1.5-.2 3.2-.3 4.8-.3 17.7 0 32 13.7 32 30.5 0 16.6-13.4 30.3-30 30.8H35z" />
        </svg>

        <svg
          className="float-right float-delay-2 opacity-80"
          viewBox="0 0 120 70"
          width="120"
          height="70"
          style={{ position: "absolute", right: "8%", top: "25%", color: "var(--cream)" }}
          fill="currentColor"
        >
          <path d="M25 55C11.2 55 0 44.4 0 31.5 0 21.5 7.2 13.2 17 11c2.8-10.2 13.6-18 26.5-18 13.6 0 25 8.7 28.2 20.5 1.2-.2 2.5-.3 3.8-.3 13.3 0 24 10.3 24 23 0 12.5-10.1 22.8-22.5 23H25z" />
        </svg>

        <svg
          className="float-soft float-delay-4 opacity-60"
          viewBox="0 0 80 50"
          width="80"
          height="50"
          style={{ position: "absolute", left: "22%", top: "55%", color: "var(--cream)" }}
          fill="currentColor"
        >
          <path d="M16 40C7.2 40 0 32.4 0 23.5 0 16 5 10 12 8.5c1.8-7.2 9-12.5 18-12.5 9 0 16.5 5.8 18.5 13.5.8-.1 1.6-.2 2.5-.2 8.8 0 16 6.8 16 15 0 8.3-6.7 15.2-15 15.5H16z" />
        </svg>

        <svg
          className="float-soft float-delay-5 opacity-60"
          viewBox="0 0 80 50"
          width="80"
          height="50"
          style={{ position: "absolute", right: "20%", top: "60%", color: "var(--sand)" }}
          fill="currentColor"
        >
          <path d="M16 40C7.2 40 0 32.4 0 23.5 0 16 5 10 12 8.5c1.8-7.2 9-12.5 18-12.5 9 0 16.5 5.8 18.5 13.5.8-.1 1.6-.2 2.5-.2 8.8 0 16 6.8 16 15 0 8.3-6.7 15.2-15 15.5H16z" />
        </svg>
      </div>
    </div>
  );
}
