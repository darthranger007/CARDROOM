import { Link } from "react-router-dom";
import { templates } from "../../data/templates";
import { BusinessCard } from "../card/BusinessCard";

const showcaseThemes = ["paper", "cobalt", "charcoal"] as const;

export function TemplateShowcase() {
  return (
    <section className="border-t border-border px-8 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col gap-4 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
            The first edition.
          </h2>
          <p className="text-[11px] font-medium tracking-[0.22em] text-fg-muted uppercase">
            Three ways to say hello.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {templates.map((template, i) => (
            <Link
              key={template.id}
              to={`/editor?template=${template.id}`}
              className="group block"
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <BusinessCard
                  data={template.sample}
                  theme={showcaseThemes[i]}
                  layout="classic"
                  index={`0${i + 1}`}
                  size="showcase"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
