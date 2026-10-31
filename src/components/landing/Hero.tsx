import { Link } from "react-router-dom";
import { heroCardData } from "../../data/templates";
import { BusinessCard } from "../card/BusinessCard";

export function Hero() {
  return (
    <section className="px-8 pt-28 pb-16 lg:px-12 lg:pt-32 lg:pb-20">
      <div className="mx-auto grid max-w-[1400px] min-h-[calc(100vh-8rem)] items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div className="max-w-xl">
          <p className="mb-6 text-[11px] font-medium tracking-[0.24em] text-fg-muted uppercase">
            The professional card maker
          </p>
          <h1 className="text-[clamp(2.5rem,4.8vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.03em] text-fg">
            Make the introduction before the handshake.
          </h1>
          <p className="mt-7 max-w-md text-[16px] leading-[1.65] text-fg-muted">
            A precise new way to shape your name, work and contact details into
            cards worth keeping.
          </p>
          <Link
            to="/editor"
            className="mt-10 inline-flex items-center rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-ink transition-all hover:bg-white/92"
          >
            Build your card
          </Link>
        </div>

        <div className="w-full lg:max-w-[540px] lg:justify-self-end">
          <div className="flex flex-col overflow-hidden rounded-[32px] border border-white/[0.06] bg-bg-card shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="p-6 sm:p-8 lg:p-10">
              <BusinessCard
                data={heroCardData}
                theme="paper"
                layout="classic"
                index="01"
                size="showcase"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-6 py-4 sm:px-8 lg:px-10">
              <p className="text-[11px] font-medium tracking-[0.2em] text-fg-muted uppercase">
                A considered first impression
              </p>
              <svg
                className="h-[18px] w-[18px] shrink-0 text-accent"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
