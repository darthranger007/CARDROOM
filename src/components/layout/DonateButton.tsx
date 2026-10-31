import { DONATE_LABEL, DONATE_URL } from "../../config/site";

type DonateButtonProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function DonateButton({ variant = "dark", className = "" }: DonateButtonProps) {
  if (!DONATE_URL.trim()) return null;

  const isDark = variant === "dark";

  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-all ${className} ${
        isDark
          ? "border-white/15 bg-white/[0.06] text-fg hover:border-white/25 hover:bg-white/10"
          : "border-ink/15 bg-ink/[0.04] text-ink hover:border-ink/25 hover:bg-ink/[0.08]"
      }`}
    >
      <svg
        className="h-4 w-4 text-accent"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      {DONATE_LABEL}
    </a>
  );
}
