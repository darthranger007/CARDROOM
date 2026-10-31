import { Link } from "react-router-dom";

interface HeaderProps {
  variant?: "dark" | "light";
}

export function Header({ variant = "dark" }: HeaderProps) {
  const isDark = variant === "dark";

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5 lg:px-12 lg:py-6">
        <Link
          to="/"
          className={`text-[14px] font-bold tracking-[0.14em] uppercase transition-opacity hover:opacity-70 ${
            isDark ? "text-fg" : "text-ink"
          }`}
        >
          Cardroom<sup className="ml-0.5 text-[8px] font-normal">®</sup>
        </Link>
        <Link
          to="/editor"
          className={`rounded-full px-6 py-2.5 text-[13px] font-semibold transition-all ${
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
