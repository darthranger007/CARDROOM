import { useRef } from "react";
import { useCard } from "../../context/CardContext";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
const MAX_SIZE_MB = 2;

interface LogoUploadProps {
  variant?: "dark" | "light";
  showHeading?: boolean;
  compact?: boolean;
}

export function LogoUpload({
  variant = "light",
  showHeading = true,
  compact = false,
}: LogoUploadProps) {
  const { logoUrl, setLogoUrl, removeLogo } = useCard();
  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = variant === "dark";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert("Please upload a PNG, JPG, SVG, or WebP image.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Logo must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const headingClass = isDark
    ? "mb-4 text-[11px] font-medium tracking-[0.18em] text-fg-muted uppercase"
    : "mb-4 text-xl font-semibold text-ink";

  const uploadedWrap = isDark
    ? "flex items-center gap-4 rounded-xl border border-editor-border bg-editor-surface p-4"
    : "flex items-center gap-4 rounded-xl border border-paper-muted bg-white p-4";

  const emptyBtn = isDark
    ? `flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-editor-border bg-editor-surface transition-colors hover:border-accent/40 ${
        compact ? "px-4 py-5" : "px-6 py-8"
      }`
    : `flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-paper-muted bg-paper/50 transition-colors hover:border-ink/30 hover:bg-white ${
        compact ? "px-4 py-5" : "px-6 py-8"
      }`;

  return (
    <div>
      {showHeading && (
        <p className={headingClass}>
          {isDark ? "Custom logo (optional)" : "Logo"}
        </p>
      )}

      {logoUrl ? (
        <div className={uploadedWrap}>
          <img
            src={logoUrl}
            alt="Uploaded logo"
            className={`rounded-lg border object-contain p-1 ${
              isDark
                ? "h-12 w-12 border-editor-border"
                : "h-14 w-14 border-paper-muted"
            }`}
          />
          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-medium ${isDark ? "text-fg" : "text-ink"}`}
            >
              Logo added
            </p>
            <p className={`text-[12px] ${isDark ? "text-fg-muted" : "text-ink-muted"}`}>
              Top-right on your card
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={
                isDark
                  ? "rounded-lg border border-editor-border px-3 py-1.5 text-xs text-fg-muted hover:text-fg"
                  : "rounded-lg border border-paper-muted px-3 py-1.5 text-xs hover:border-ink/30"
              }
            >
              Replace
            </button>
            <button
              type="button"
              onClick={removeLogo}
              className={
                isDark
                  ? "rounded-lg px-3 py-1.5 text-xs text-red-400 hover:bg-red-400/10"
                  : "rounded-lg px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
              }
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} className={emptyBtn}>
          {!compact && (
            <svg
              className={`mb-2 h-7 w-7 ${isDark ? "text-fg-subtle" : "text-ink-muted/50"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          )}
          <span className={`text-sm font-medium ${isDark ? "text-fg" : "text-ink"}`}>
            Upload logo
          </span>
          <span className={`mt-1 text-[12px] ${isDark ? "text-fg-muted" : "text-ink-muted"}`}>
            PNG, JPG, SVG, WebP · max {MAX_SIZE_MB}MB
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
