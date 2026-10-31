import { useState } from "react";
import { CARD_FONTS, TYPOGRAPHY_ZONE_LABELS } from "../../data/fonts";
import { useCard } from "../../context/CardContext";
import type { CardFontId, CardTypographyZone } from "../../types/card";

function StyleToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`flex h-9 min-w-9 items-center justify-center rounded-lg border text-[13px] transition-all ${
        active
          ? "border-accent bg-accent/15 text-fg ring-1 ring-accent/40"
          : "border-editor-border bg-editor-input/80 text-fg-muted hover:border-white/20 hover:text-fg"
      }`}
    >
      {label === "Bold" ? (
        <span className="font-bold">B</span>
      ) : (
        <span className="italic">I</span>
      )}
    </button>
  );
}

const zones: CardTypographyZone[] = ["name", "role", "tagline", "contact"];

export function TypographyControls() {
  const { typography, updateTypography, resetTypography, applyTypographyFromZone } =
    useCard();
  const [matchSource, setMatchSource] = useState<CardTypographyZone>("name");

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-accent/25 bg-accent/5 p-4">
        <p className="mb-3 text-[12px] font-medium text-fg">Match all text to one style</p>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={matchSource}
            onChange={(e) => setMatchSource(e.target.value as CardTypographyZone)}
            className="min-w-0 flex-1 rounded-lg border border-editor-border bg-editor-input px-3 py-2 text-[13px] text-fg outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
            aria-label="Style source for apply to all"
          >
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {TYPOGRAPHY_ZONE_LABELS[zone]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => applyTypographyFromZone(matchSource)}
            className="rounded-lg border border-accent/40 bg-accent/15 px-4 py-2 text-[13px] font-medium text-fg transition-all hover:bg-accent/25"
          >
            Apply to entire card
          </button>
        </div>
        <p className="mt-2 text-[11px] text-fg-muted">
          Copies font, bold, and italic from the row you pick to name, role, tagline, and contact.
        </p>
      </div>

      {zones.map((zone) => {
        const style = typography[zone];
        return (
          <div
            key={zone}
            className="rounded-xl border border-editor-border/80 bg-editor-surface/60 p-4"
          >
            <p className="mb-3 text-[12px] font-medium text-fg">{TYPOGRAPHY_ZONE_LABELS[zone]}</p>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={style.fontId}
                onChange={(e) =>
                  updateTypography(zone, { fontId: e.target.value as CardFontId })
                }
                className="min-w-0 flex-1 rounded-lg border border-editor-border bg-editor-input px-3 py-2 text-[13px] text-fg outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
                aria-label={`${TYPOGRAPHY_ZONE_LABELS[zone]} font`}
              >
                {CARD_FONTS.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.label}
                  </option>
                ))}
              </select>
              <StyleToggle
                label="Bold"
                active={style.bold}
                onClick={() => updateTypography(zone, { bold: !style.bold })}
              />
              <StyleToggle
                label="Italic"
                active={style.italic}
                onClick={() => updateTypography(zone, { italic: !style.italic })}
              />
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={resetTypography}
        className="text-[12px] text-fg-muted transition-colors hover:text-fg"
      >
        Reset typography to defaults
      </button>
    </div>
  );
}
