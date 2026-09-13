import { useCard } from "../../context/CardContext";
import { themes } from "../../data/templates";
import type { CardTheme } from "../../types/card";

export function ThemeSelector() {
  const { theme, setTheme } = useCard();

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Atmosphere</h2>
      <div className="grid gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id as CardTheme)}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
              theme === t.id
                ? "border-ink bg-white shadow-sm"
                : "border-paper-muted hover:border-ink/20"
            }`}
          >
            <div
              className="h-10 w-10 shrink-0 rounded-lg border"
              style={{
                backgroundColor: t.background,
                borderColor: t.border,
              }}
            />
            <div>
              <p className="font-sans text-sm font-medium">{t.name}</p>
              <p className="font-sans text-[11px] text-ink-muted">
                {t.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
