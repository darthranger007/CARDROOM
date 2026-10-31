const steps = [
  {
    number: "01",
    title: "Start with your details.",
    description:
      "Name, role, links, and one small signal of personality.",
  },
  {
    number: "02",
    title: "Choose your atmosphere.",
    description:
      "Move between crisp paper, cobalt confidence, and quiet charcoal.",
  },
  {
    number: "03",
    title: "Share it beautifully.",
    description:
      "Export a print-ready card or pass along a living digital link.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border px-8 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-14 text-[11px] font-medium tracking-[0.24em] text-fg-muted uppercase lg:mb-16">
          A considered first impression
        </p>

        <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-border">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border-b border-border py-8 last:border-b-0 sm:border-b-0 sm:px-10 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="text-[13px] font-medium text-fg-subtle">
                {step.number}
              </span>
              <h3 className="mt-6 text-[18px] leading-snug font-semibold tracking-[-0.01em] text-fg">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-fg-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
