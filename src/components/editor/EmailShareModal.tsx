import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

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

  const modal = (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-share-title"
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
          aria-hidden
        />
        <div className="relative my-auto w-full max-w-md rounded-2xl border border-editor-border bg-editor-panel p-6 shadow-2xl">
          {status === "done" ? (
            <div className="text-center">
              <p className="text-xl font-semibold text-fg">
                {result === "shared" ? "Shared successfully" : "Email client opened"}
              </p>
              <p className="mt-2 text-sm text-fg-muted">
                {result === "shared"
                  ? "Your business card PDF was shared."
                  : "The PDF was downloaded — attach it to your email before sending."}
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <h3 id="email-share-title" className="text-xl font-semibold text-fg">
                Share via email
              </h3>
              <p className="mt-1 text-sm text-fg-muted">
                Send a print-ready PDF of your business card.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="recipient"
                    className="mb-1.5 block text-xs tracking-wide text-fg-muted uppercase"
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
                    className="w-full rounded-xl border border-editor-border bg-editor-input px-4 py-2.5 text-sm text-fg outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs tracking-wide text-fg-muted uppercase"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Hi,\n\nPlease find my business card attached.\n\nBest,\n${senderName}`}
                    className="w-full resize-none rounded-xl border border-editor-border bg-editor-input px-4 py-2.5 text-sm text-fg outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex-1 rounded-full bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
                  >
                    {status === "sending" ? "Preparing PDF…" : "Send PDF"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-full border border-editor-border px-5 py-2.5 text-sm text-fg-muted hover:text-fg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
