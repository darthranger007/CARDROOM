import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="border-t border-border px-8 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px] text-center">
        <p className="text-[14px] text-fg-muted">
          Your card is already in there.
        </p>
        <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-bold tracking-[-0.02em]">
          Make it unmistakable.
        </h2>
        <Link
          to="/editor"
          className="mt-10 inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-[14px] font-semibold transition-all hover:border-white/40 hover:bg-white/5"
        >
          Start your card
        </Link>
      </div>
    </section>
  );
}
