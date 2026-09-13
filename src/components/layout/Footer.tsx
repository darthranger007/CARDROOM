interface FooterProps {
  variant?: "dark" | "light";
}

export function Footer({ variant = "dark" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      className={`px-8 py-10 lg:px-12 ${
        isDark ? "border-t border-border text-fg-muted" : "border-t border-paper-muted text-ink-muted"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs">
          Cardroom<sup className="text-[7px]">®</sup> — Professional Business Cards
        </p>
        <p className={`text-xs ${isDark ? "text-fg-subtle" : "text-ink-muted/60"}`}>
          Built with React
        </p>
      </div>
    </footer>
  );
}
