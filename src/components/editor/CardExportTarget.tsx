import { useCard } from "../../context/CardContext";
import { BusinessCard } from "../card/BusinessCard";
import { EXPORT_HEIGHT_PX, EXPORT_WIDTH_PX } from "../../utils/exportCard";

export function CardExportTarget() {
  const { cardData, theme, layout, logoUrl } = useCard();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-[-9999px] overflow-hidden"
      style={{ width: EXPORT_WIDTH_PX, height: EXPORT_HEIGHT_PX }}
    >
      <div id="card-export-target" style={{ width: EXPORT_WIDTH_PX, height: EXPORT_HEIGHT_PX }}>
        <BusinessCard
          data={cardData}
          theme={theme}
          layout={layout}
          logoUrl={logoUrl}
          exportMode
        />
      </div>
    </div>
  );
}
