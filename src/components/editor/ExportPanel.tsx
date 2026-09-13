import { useState } from "react";
import { useCard } from "../../context/CardContext";
import {
  exportCardAsPdf,
  exportCardAsPng,
  slugify,
} from "../../utils/exportCard";
import { EmailShareModal } from "./EmailShareModal";

export function ExportPanel() {
  const { cardData } = useCard();
  const [loading, setLoading] = useState<"pdf" | "png" | null>(null);
  const [emailOpen, setEmailOpen] = useState(false);

  const getExportElement = () =>
    document.getElementById("card-export-target");

  const filename = slugify(cardData.name || "business-card") || "business-card";

  const handleExportPdf = async () => {
    const element = getExportElement();
    if (!element) return;

    setLoading("pdf");
    try {
      await exportCardAsPdf(element, filename);
    } catch {
      alert("Failed to export PDF. Please try again.");
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
      alert("Failed to export PNG. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="border-t border-paper-muted pt-6">
        <h2 className="mb-4 text-xl font-semibold">Export & share</h2>
        <p className="mb-4 font-sans text-sm text-ink-muted">
          Download a print-ready file at standard 3.5 × 2 in, or share via
          email.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={loading !== null}
            className="rounded-full bg-ink px-6 py-2.5 font-sans text-sm font-medium text-paper transition-all hover:bg-ink/90 disabled:opacity-50"
          >
            {loading === "pdf" ? "Generating…" : "Download PDF"}
          </button>
          <button
            type="button"
            onClick={handleExportPng}
            disabled={loading !== null}
            className="rounded-full border border-ink px-6 py-2.5 font-sans text-sm font-medium transition-all hover:bg-ink hover:text-paper disabled:opacity-50"
          >
            {loading === "png" ? "Generating…" : "Download PNG"}
          </button>
          <button
            type="button"
            onClick={() => setEmailOpen(true)}
            disabled={loading !== null}
            className="rounded-full border border-paper-muted px-6 py-2.5 font-sans text-sm font-medium transition-all hover:border-ink/30 disabled:opacity-50"
          >
            Share via email
          </button>
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
