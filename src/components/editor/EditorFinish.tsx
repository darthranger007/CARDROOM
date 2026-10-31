import { useState } from "react";
import { templates } from "../../data/templates";
import { useCard } from "../../context/CardContext";
import type { CardLayout } from "../../types/card";
import {
  exportCardAsPdf,
  exportCardAsPng,
  slugify,
} from "../../utils/exportCard";
import { BusinessCard } from "../card/BusinessCard";
import { EmailShareModal } from "./EmailShareModal";
import { LogoUpload } from "./LogoUpload";

const extraFields = [
  { key: "location" as const, label: "Location", placeholder: "mumbai" },
  { key: "year" as const, label: "Year (optional)", placeholder: "2026" },
];

interface EditorFinishProps {
  onBack: () => void;
}

export function EditorFinish({ onBack }: EditorFinishProps) {
  const { cardData, theme, layout, logoUrl, setLayout, updateCardData } =
    useCard();
  const [loading, setLoading] = useState<"pdf" | "png" | null>(null);
  const [emailOpen, setEmailOpen] = useState(false);

  const getExportElement = () => document.getElementById("card-export-target");
  const filename = slugify(cardData.name || "business-card") || "business-card";

  const handleExportPdf = async () => {
    const element = getExportElement();
    if (!element) return;
    setLoading("pdf");
    try {
      await exportCardAsPdf(element, filename);
    } catch {
      alert("Failed to export PDF.");
    } finally {
      setLoading(null);
    }
  };

  const handleExportPng = async () => {
    const element = getExportElement();
    if (!element) return;
    setLoading("png");
    try {
      await exportCardAsPng(element, filename);
    } catch {
      alert("Failed to export PNG.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-4 text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              ← Back
            </button>
            <p className="text-[11px] font-medium tracking-[0.22em] text-fg-muted uppercase">
              Cardroom editor
            </p>
            <h1 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.02em] text-fg">
              Finish your card.
            </h1>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-10">
            <LogoUpload variant="dark" />

            <div>
              <p className="mb-5 text-[11px] font-medium tracking-[0.18em] text-fg-muted uppercase">
                Card layout
              </p>
              <div className="grid gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setLayout(template.id as CardLayout)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      layout === template.id
                        ? "border-accent bg-editor-surface ring-1 ring-accent/30"
                        : "border-editor-border bg-editor-surface hover:border-white/20"
                    }`}
                  >
                    <p className="text-sm font-semibold text-fg">{template.name}</p>
                    <p className="mt-1 text-[12px] text-fg-muted">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-5 text-[11px] font-medium tracking-[0.18em] text-fg-muted uppercase">
                Additional details
              </p>
              <div className="space-y-4">
                {extraFields.map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="mb-2 block text-[13px] text-fg-muted">{label}</label>
                    <input
                      type="text"
                      value={cardData[key]}
                      onChange={(e) => updateCardData({ [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-editor-border bg-editor-input px-4 py-3 text-[15px] text-fg placeholder:text-fg-subtle outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-5 text-[11px] font-medium tracking-[0.18em] text-fg-muted uppercase">
                Export & share
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleExportPdf}
                  disabled={loading !== null}
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {loading === "pdf" ? "Generating…" : "Download PDF"}
                </button>
                <button
                  type="button"
                  onClick={handleExportPng}
                  disabled={loading !== null}
                  className="rounded-full border border-editor-border px-6 py-2.5 text-sm font-medium text-fg hover:border-white/30 disabled:opacity-50"
                >
                  {loading === "png" ? "Generating…" : "Download PNG"}
                </button>
                <button
                  type="button"
                  onClick={() => setEmailOpen(true)}
                  disabled={loading !== null}
                  className="rounded-full border border-editor-border px-6 py-2.5 text-sm font-medium text-fg hover:border-white/30 disabled:opacity-50"
                >
                  Share via email
                </button>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-fg-muted uppercase">
              Live preview
            </p>
            <BusinessCard
              data={cardData}
              theme={theme}
              layout={layout}
              logoUrl={logoUrl}
              size="editor"
            />
          </div>
        </div>
      </div>

      <EmailShareModal
        isOpen={emailOpen}
        onClose={() => setEmailOpen(false)}
        senderName={cardData.name}
        getExportElement={getExportElement}
      />
    </>
  );
}
