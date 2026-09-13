import { useCard } from "../../context/CardContext";

const fields = [
  { key: "name" as const, label: "Full name", placeholder: "Nila Rao" },
  { key: "role" as const, label: "Role / Title", placeholder: "Independent Creative Director" },
  { key: "email" as const, label: "Email", placeholder: "nila@raoworks.studio" },
  { key: "location" as const, label: "Location", placeholder: "mumbai" },
  { key: "year" as const, label: "Year (optional)", placeholder: "2026" },
];

export function CardForm() {
  const { cardData, updateCardData } = useCard();

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Your details</h2>
      {fields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label
            htmlFor={key}
            className="mb-1.5 block font-sans text-xs tracking-wide text-ink-muted uppercase"
          >
            {label}
          </label>
          <input
            id={key}
            type="text"
            value={cardData[key]}
            onChange={(e) => updateCardData({ [key]: e.target.value })}
            placeholder={placeholder}
            className="w-full rounded-lg border border-paper-muted bg-white px-4 py-2.5 font-sans text-sm outline-none transition-colors focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
          />
        </div>
      ))}
    </div>
  );
}
