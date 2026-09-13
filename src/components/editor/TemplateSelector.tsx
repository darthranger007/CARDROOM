import { useCard } from "../../context/CardContext";
import { templates } from "../../data/templates";
import { BusinessCard } from "../card/BusinessCard";

export function TemplateSelector() {
  const { layout, theme, loadTemplate } = useCard();

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Template</h2>
      <div className="grid gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => loadTemplate(template.id)}
            className={`rounded-xl border p-3 text-left transition-all ${
              layout === template.id
                ? "border-ink bg-white shadow-sm"
                : "border-paper-muted bg-paper/50 hover:border-ink/20"
            }`}
          >
            <div className="pointer-events-none">
              <BusinessCard
                data={template.sample}
                theme={theme}
                layout={template.id}
              />
            </div>
            <p className="mt-2 font-sans text-xs font-medium">{template.name}</p>
            <p className="font-sans text-[11px] text-ink-muted">
              {template.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
