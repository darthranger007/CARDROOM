import { Link } from "react-router-dom";

interface HeaderProps {
  variant?: "dark" | "light";
}

export function Header({ variant = "dark" }: HeaderProps) {
  const isDark = variant === "dark";

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-6 lg:px-12">
        <Link
          to="/"
          className={`text-[13px] font-semibold tracking-[0.18em] uppercase transition-opacity hover:opacity-70 ${
            isDark ? "text-fg" : "text-ink"
          }`}
        >
          Cardroom<sup className="text-[7px]">®</sup>
        </Link>
        <Link
          to="/editor"
          className={`rounded-full px-5 py-2.5 text-[13px] font-medium transition-all ${
            isDark
              ? "bg-accent text-white hover:bg-accent-hover"
              : "bg-ink text-paper hover:bg-ink/90"
          }`}
        >
          Start creating
        </Link>
      </div>
    </header>
  );
}
