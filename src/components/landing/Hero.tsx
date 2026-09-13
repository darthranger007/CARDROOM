import { Link } from "react-router-dom";
import { defaultCardData } from "../../data/templates";
import { BusinessCard } from "../card/BusinessCard";

export function Hero() {
  return (
    <section className="px-8 pt-28 pb-20 lg:px-12 lg:pt-32 lg:pb-28">
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-6 text-[11px] font-medium tracking-[0.22em] text-fg-muted uppercase">
            The professional card maker
          </p>
          <h1 className="max-w-xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.02em]">
            Make the introduction before the handshake.
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
            A precise new way to shape your name, work and contact details into
            cards worth keeping.
          </p>
          <Link
            to="/editor"
            className="mt-10 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-bg transition-all hover:bg-white/90"
          >
            Build your card
          </Link>
        </div>

        <div>
          <div className="rounded-[28px] bg-bg-card p-8 lg:p-10">
            <BusinessCard
              data={defaultCardData}
              theme="paper"
              layout="classic"
              index="01"
              size="showcase"
            />
          </div>
          <div className="mt-6 flex items-center gap-2.5">
            <svg
              className="h-4 w-4 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-[11px] font-medium tracking-[0.18em] text-fg-muted uppercase">
              A considered first impression
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
