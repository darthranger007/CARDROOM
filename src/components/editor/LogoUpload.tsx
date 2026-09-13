import { useRef } from "react";
import { useCard } from "../../context/CardContext";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
const MAX_SIZE_MB = 2;

export function LogoUpload() {
  const { logoUrl, setLogoUrl, removeLogo } = useCard();
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Logo</h2>

      {logoUrl ? (
        <div className="flex items-center gap-4 rounded-xl border border-paper-muted bg-white p-4">
          <img
            src={logoUrl}
            alt="Uploaded logo"
            className="h-14 w-14 rounded-lg border border-paper-muted object-contain p-1"
          />
          <div className="min-w-0 flex-1">
            <p className="font-sans text-sm font-medium">Logo uploaded</p>
            <p className="font-sans text-[11px] text-ink-muted">
              Appears in the top-right of your card
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-paper-muted px-3 py-1.5 font-sans text-xs transition-colors hover:border-ink/30"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={removeLogo}
              className="rounded-lg px-3 py-1.5 font-sans text-xs text-red-600 transition-colors hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-paper-muted bg-paper/50 px-6 py-8 transition-colors hover:border-ink/30 hover:bg-white"
        >
          <svg
            className="mb-2 h-8 w-8 text-ink-muted/50"
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
          <span className="font-sans text-sm font-medium">Upload logo</span>
          <span className="mt-1 font-sans text-[11px] text-ink-muted">
            PNG, JPG, SVG or WebP · max {MAX_SIZE_MB}MB
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
