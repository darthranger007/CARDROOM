import { Link } from "react-router-dom";
import { themes } from "../../data/templates";
import { useCard } from "../../context/CardContext";
import type { CardData, CardTheme } from "../../types/card";
import { BusinessCard } from "../card/BusinessCard";
import { EditorPreviewFrame } from "./EditorPreviewFrame";
import { LogoUpload } from "./LogoUpload";
import { TypographyControls } from "./TypographyControls";

interface EditorEssentialsProps {
  onContinue: () => void;
}

type FieldKey = keyof Pick<
  CardData,
  "name" | "role" | "tagline" | "email" | "phone" | "website" | "location"
>;

const identityFields: {
  key: FieldKey;
  label: string;
  placeholder: string;
  optional?: boolean;
}[] = [
  { key: "name", label: "Full name", placeholder: "Your name" },
  {
    key: "role",
    label: "Professional role",
    placeholder: "Independent professional",
    optional: true,
  },
  {
    key: "tagline",
    label: "Tagline",
    placeholder: "One small signal of personality",
    optional: true,
  },
];

const contactFields: {
  key: FieldKey;
  label: string;
  placeholder: string;
  optional?: boolean;
}[] = [
  { key: "email", label: "Email address", placeholder: "hello@yourstudio.com", optional: true },
  { key: "phone", label: "Phone", placeholder: "+91 00000 00000", optional: true },
  { key: "website", label: "Website", placeholder: "yourstudio.com", optional: true },
  { key: "location", label: "Location", placeholder: "mumbai", optional: true },
];

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: { key: FieldKey; label: string; placeholder: string; optional?: boolean };
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={`editor-${field.key}`}
        className="mb-2 block text-[12px] font-medium tracking-wide text-fg-muted"
      >
        {field.label}
        {field.optional ? (
          <span className="font-normal text-fg-subtle"> (optional)</span>
        ) : null}
      </label>
      <input
        id={`editor-${field.key}`}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full rounded-xl border border-editor-border/80 bg-editor-input/90 px-4 py-3 text-[14px] text-fg placeholder:text-fg-subtle/80 outline-none transition-all focus:border-accent/60 focus:bg-editor-input focus:ring-2 focus:ring-accent/15"
      />
    </div>
  );
}

export function EditorEssentials({ onContinue }: EditorEssentialsProps) {
  const { cardData, theme, setTheme, updateCardData, logoUrl, typography } = useCard();

  return (
    <div className="flex flex-col">
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-fg-muted uppercase">
            Cardroom editor
          </p>
          <h1 className="mt-3 font-card-serif text-[clamp(1.85rem,3.5vw,2.85rem)] leading-[1.08] tracking-[-0.01em] text-fg">
            Begin with the essentials.
          </h1>
        </div>
        <Link
          to="/"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-editor-border bg-editor-surface/80 text-fg-muted transition-all hover:border-white/25 hover:text-fg"
          aria-label="Back to home"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>

      <section className="mb-10">
        <p className="mb-5 text-[10px] font-medium tracking-[0.2em] text-fg-muted uppercase">
          Theme
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
                className={`flex min-h-[160px] flex-col rounded-[22px] p-5 text-left transition-all duration-200 sm:min-h-[180px] ${
                  selected
                    ? "scale-[1.02] ring-1 ring-accent shadow-[0_0_0_1px_rgba(43,127,255,0.5)]"
                    : "hover:scale-[1.01] hover:brightness-105"
                }`}
                style={{
                  backgroundColor: t.background,
                  color: t.text,
                  border: `1px solid ${selected ? t.accent : t.border}`,
                }}
              >
                <span
                  className="text-[11px] font-semibold tracking-wide"
                  style={{ color: isLight ? t.accent : t.textMuted }}
                >
                  — 0{i + 1}
                </span>
                <p className="mt-4 font-card-serif text-[1.25rem] leading-none sm:mt-5 sm:text-[1.35rem]">
                  {t.name}
                </p>
                <p
                  className="mt-2 flex-1 text-[12px] leading-relaxed"
                  style={{ color: t.textMuted }}
                >
                  {t.description}
                </p>
                <span
                  className="mt-3 text-[9px] font-medium tracking-[0.16em] uppercase sm:mt-4"
                  style={{ color: t.textMuted }}
                >
                  {selected ? "Selected" : "Select theme"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        <div className="space-y-8">
          <section>
            <p className="mb-4 text-[10px] font-medium tracking-[0.2em] text-fg-muted uppercase">
              Identity
            </p>
            <div className="space-y-4">
              {identityFields.map((field) => (
                <FieldInput
                  key={field.key}
                  field={field}
                  value={cardData[field.key]}
                  onChange={(v) => updateCardData({ [field.key]: v })}
                />
              ))}
            </div>
          </section>

          <section>
            <p className="mb-4 text-[10px] font-medium tracking-[0.2em] text-fg-muted uppercase">
              Contact
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactFields.map((field) => (
                <FieldInput
                  key={field.key}
                  field={field}
                  value={cardData[field.key]}
                  onChange={(v) => updateCardData({ [field.key]: v })}
                />
              ))}
            </div>
          </section>

          <LogoUpload variant="dark" compact />

          <section>
            <p className="mb-4 text-[10px] font-medium tracking-[0.2em] text-fg-muted uppercase">
              Typography
            </p>
            <TypographyControls />
          </section>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <EditorPreviewFrame>
            <BusinessCard
              data={cardData}
              theme={theme}
              layout="classic"
              logoUrl={logoUrl}
              typography={typography}
              size="editor"
            />
          </EditorPreviewFrame>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-editor-border/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-fg-muted">
          Add your details, then continue to layout and export.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(43,127,255,0.35)] transition-all hover:bg-accent-hover hover:shadow-[0_10px_28px_rgba(43,127,255,0.45)]"
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
