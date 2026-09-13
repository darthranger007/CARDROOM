import { useState } from "react";
import { sharePdfViaEmail, slugify } from "../../utils/exportCard";

interface EmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  getExportElement: () => HTMLElement | null;
}

export function EmailShareModal({
  isOpen,
  onClose,
  senderName,
  getExportElement,
}: EmailShareModalProps) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [result, setResult] = useState<"shared" | "mailto" | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exportElement = getExportElement();
    if (!exportElement || !recipientEmail.trim()) return;

    setStatus("sending");
    try {
      const filename = slugify(senderName || "business-card") || "business-card";
      const shareResult = await sharePdfViaEmail({
        element: exportElement,
        filename,
        recipientEmail: recipientEmail.trim(),
        senderName: senderName || "Cardroom User",
        message: message.trim() || undefined,
      });
      setResult(shareResult);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-paper p-6 shadow-2xl">
        {status === "done" ? (
          <div className="text-center">
            <p className="text-xl font-semibold">
              {result === "shared" ? "Shared successfully" : "Email client opened"}
            </p>
            <p className="mt-2 font-sans text-sm text-ink-muted">
              {result === "shared"
                ? "Your business card PDF was shared."
                : "The PDF was downloaded — attach it to your email before sending."}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-full bg-ink px-6 py-2.5 font-sans text-sm font-medium text-paper"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold">Share via email</h3>
            <p className="mt-1 font-sans text-sm text-ink-muted">
              Send a print-ready PDF of your business card.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="recipient"
                  className="mb-1.5 block font-sans text-xs tracking-wide text-ink-muted uppercase"
                >
                  Recipient email
                </label>
                <input
                  id="recipient"
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full rounded-lg border border-paper-muted bg-white px-4 py-2.5 font-sans text-sm outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-sans text-xs tracking-wide text-ink-muted uppercase"
                >
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi,\n\nPlease find my business card attached.\n\nBest,\n${senderName}`}
                  className="w-full resize-none rounded-lg border border-paper-muted bg-white px-4 py-2.5 font-sans text-sm outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                />
              </div>

              {status === "error" && (
                <p className="font-sans text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 rounded-full bg-ink py-2.5 font-sans text-sm font-medium text-paper transition-all hover:bg-ink/90 disabled:opacity-50"
                >
                  {status === "sending" ? "Preparing PDF…" : "Send PDF"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-paper-muted px-5 py-2.5 font-sans text-sm transition-colors hover:border-ink/30"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
