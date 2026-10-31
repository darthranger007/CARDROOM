import { Link } from "react-router-dom";
import { themes } from "../../data/templates";
import { useCard } from "../../context/CardContext";
import type { CardTheme } from "../../types/card";
import { BusinessCard } from "../card/BusinessCard";
import { LogoUpload } from "./LogoUpload";

interface EditorEssentialsProps {
  onContinue: () => void;
}

const primaryFields = [
  {
    key: "name" as const,
    label: "Full name",
    placeholder: "Your name",
  },
  {
    key: "role" as const,
    label: "Professional role",
    placeholder: "Independent professional",
  },
  {
    key: "email" as const,
    label: "Email address",
    placeholder: "hello@yourstudio.com",
  },
];

export function EditorEssentials({ onContinue }: EditorEssentialsProps) {
  const { cardData, theme, setTheme, updateCardData, logoUrl } = useCard();

  return (
    <div className="flex flex-col">
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-fg-muted uppercase">
            Cardroom editor
          </p>
          <h1 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.02em] text-fg">
            Begin with the essentials.
          </h1>
        </div>
        <Link
          to="/"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-editor-border bg-editor-surface text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
          aria-label="Back to home"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
        <div>
          <p className="mb-5 text-[11px] font-medium tracking-[0.18em] text-fg-muted uppercase">
            Your details
          </p>
          <div className="space-y-5">
            {primaryFields.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label
                  htmlFor={`editor-${key}`}
                  className="mb-2 block text-[13px] text-fg-muted"
                >
                  {label}
                </label>
                <input
                  id={`editor-${key}`}
                  type="text"
                  value={cardData[key]}
                  onChange={(e) => updateCardData({ [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-editor-border bg-editor-input px-4 py-3.5 text-[15px] text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                />
              </div>
            ))}
            <div className="pt-2">
              <LogoUpload variant="dark" compact />
            </div>
          </div>
        </div>

        <div className="min-h-[320px] lg:min-h-[380px]">
          <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-fg-muted uppercase">
            Live preview
          </p>
          <BusinessCard
            data={cardData}
            theme={theme}
            layout="classic"
            logoUrl={logoUrl}
            size="editor"
          />
        </div>
      </div>

      <div className="mt-12">
        <p className="mb-5 text-[11px] font-medium tracking-[0.18em] text-fg-muted uppercase">
          Select a template
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {themes.map((t, i) => {
            const selected = theme === t.id;
            const isLight = t.id === "paper";

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id as CardTheme)}
                className={`flex min-h-[220px] flex-col rounded-[20px] p-6 text-left transition-all ${
                  selected
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-editor-panel"
                    : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: t.background,
                  color: t.text,
                  border: `1px solid ${t.border}`,
                }}
              >
                <span
                  className="text-[12px] font-medium"
                  style={{ color: isLight ? t.accent : t.textMuted }}
                >
                  — 0{i + 1}
                </span>
                <p className="mt-6 text-[22px] font-bold tracking-[-0.02em]">
                  {t.name}
                </p>
                <p
                  className="mt-2 flex-1 text-[13px] leading-relaxed"
                  style={{ color: t.textMuted }}
                >
                  {t.description}
                </p>
                <span
                  className="mt-4 text-[10px] font-medium tracking-[0.15em] uppercase"
                  style={{ color: t.textMuted }}
                >
                  {selected ? "Selected" : "Select this template"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-editor-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] text-fg-muted">
          Select a template to continue.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-accent-hover"
        >
          Continue
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
