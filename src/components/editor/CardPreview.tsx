import { useCard } from "../../context/CardContext";
import { BusinessCard } from "../card/BusinessCard";

export function CardPreview() {
  const { cardData, theme, layout, logoUrl } = useCard();

  return (
    <div className="sticky top-24">
      <p className="mb-4 font-sans text-xs tracking-[0.2em] text-ink-muted uppercase">
        Live preview
      </p>
      <div className="mx-auto max-w-md">
        <BusinessCard
          data={cardData}
          theme={theme}
          layout={layout}
          logoUrl={logoUrl}
        />
      </div>
      <p className="mt-4 text-center font-sans text-[11px] text-ink-muted">
        Standard size · 3.5 × 2 in
      </p>
    </div>
  );
}
