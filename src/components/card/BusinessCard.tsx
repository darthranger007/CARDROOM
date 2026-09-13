import { getTheme } from "../../data/templates";
import type { CardData, CardLayout, CardTheme } from "../../types/card";

type CardSize = "default" | "showcase";

interface BusinessCardProps {
  data: CardData;
  theme: CardTheme;
  layout: CardLayout;
  logoUrl?: string | null;
  className?: string;
  index?: string;
  exportMode?: boolean;
  size?: CardSize;
}

function CardLogo({
  logoUrl,
  large,
  themeBorder,
}: {
  logoUrl: string;
  large: boolean;
  themeBorder: string;
}) {
  const dim = large ? 72 : 40;

  return (
    <img
      src={logoUrl}
      alt=""
      crossOrigin="anonymous"
      className="object-contain"
      style={{
        width: dim,
        height: dim,
        border: `1px solid ${themeBorder}`,
        borderRadius: 4,
        padding: large ? 4 : 2,
      }}
    />
  );
}

export function BusinessCard({
  data,
  theme: themeId,
  layout,
  logoUrl,
  className = "",
  index,
  exportMode = false,
  size = "default",
}: BusinessCardProps) {
  const theme = getTheme(themeId);
  const isShowcase = size === "showcase" && !exportMode;
  const isLarge = isShowcase || exportMode;

  const contactLine = [data.email, data.location || data.year]
    .filter(Boolean)
    .join(" / ");

  const pad = exportMode ? 48 : isShowcase ? undefined : undefined;
  const logoOffset = logoUrl ? (isLarge ? 88 : 48) : 0;

  const shellClass = exportMode
    ? `relative h-full w-full overflow-hidden ${className}`
    : `relative aspect-[1.75/1] w-full overflow-hidden ${isShowcase ? "rounded-[20px]" : "rounded-xl shadow-md"} ${className}`;

  const padClass = exportMode
    ? ""
    : isShowcase
      ? "p-8 lg:p-10"
      : "p-5 sm:p-6";

  const indexColor =
    themeId === "paper" ? theme.accent : theme.textMuted;

  return (
    <div
      className={shellClass}
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        border: exportMode ? "none" : `1px solid ${theme.border}`,
      }}
    >
      {index && !exportMode && (
        <span
          className={`absolute font-medium tracking-wide ${isShowcase ? "top-8 left-8 text-[13px] lg:top-10 lg:left-10" : "top-4 left-4 text-[10px] opacity-60"}`}
          style={{ color: isShowcase ? indexColor : theme.textMuted }}
        >
          — {index}
        </span>
      )}

      {logoUrl && (
        <div
          className={
            exportMode
              ? "absolute"
              : isShowcase
                ? "absolute top-8 right-8 lg:top-10 lg:right-10"
                : "absolute top-4 right-4 sm:top-5 sm:right-5"
          }
          style={exportMode ? { top: pad, right: pad } : undefined}
        >
          <CardLogo
            logoUrl={logoUrl}
            large={isLarge}
            themeBorder={theme.border}
          />
        </div>
      )}

      {layout === "classic" && (
        <div
          className={`flex h-full flex-col justify-between ${padClass}`}
          style={exportMode ? { padding: pad } : undefined}
        >
          <div style={{ paddingRight: logoOffset }}>
            <h3
              className={`leading-tight font-bold tracking-[-0.02em] ${
                exportMode
                  ? ""
                  : isShowcase
                    ? "text-[1.75rem] lg:text-[2rem]"
                    : "text-xl sm:text-2xl"
              }`}
              style={{
                color: theme.text,
                fontSize: exportMode ? 44 : undefined,
              }}
            >
              {data.name || "Your Name"}
            </h3>
            <p
              className={`tracking-wide ${
                exportMode
                  ? "mt-2"
                  : isShowcase
                    ? "mt-2 text-[15px] lg:text-base"
                    : "mt-1 text-xs sm:text-sm"
              }`}
              style={{
                color: theme.textMuted,
                fontSize: exportMode ? 22 : undefined,
              }}
            >
              {data.role || "Your Role"}
            </p>
          </div>
          <p
            className={`tracking-wide ${
              exportMode ? "" : isShowcase ? "text-[13px] lg:text-sm" : "text-[10px] sm:text-xs"
            }`}
            style={{
              color: theme.textMuted,
              fontSize: exportMode ? 18 : undefined,
            }}
          >
            {contactLine || "email@example.com"}
          </p>
        </div>
      )}

      {layout === "editorial" && (
        <div
          className={`flex h-full flex-col justify-between ${padClass}`}
          style={exportMode ? { padding: pad } : undefined}
        >
          <div style={{ paddingRight: logoOffset }}>
            <h3
              className={`leading-none font-bold tracking-[-0.02em] ${
                exportMode
                  ? ""
                  : isShowcase
                    ? "text-[2rem] lg:text-[2.25rem]"
                    : "text-2xl sm:text-3xl"
              }`}
              style={{
                color: theme.text,
                fontSize: exportMode ? 56 : undefined,
              }}
            >
              {data.name || "Your Name"}
            </h3>
          </div>
          <div>
            <p
              className={`font-medium tracking-wide ${
                exportMode ? "" : isShowcase ? "text-[15px] lg:text-base" : "text-xs sm:text-sm"
              }`}
              style={{
                color: theme.text,
                fontSize: exportMode ? 22 : undefined,
              }}
            >
              {data.role || "Your Role"}
            </p>
            <p
              className={`tracking-wide ${
                exportMode
                  ? "mt-4"
                  : isShowcase
                    ? "mt-3 text-[13px] lg:text-sm"
                    : "mt-2 text-[10px] sm:text-xs"
              }`}
              style={{
                color: theme.textMuted,
                fontSize: exportMode ? 18 : undefined,
              }}
            >
              {contactLine || "email@example.com"}
            </p>
          </div>
        </div>
      )}

      {layout === "minimal" && (
        <div
          className={`flex h-full items-center justify-between ${
            exportMode ? "gap-6" : isShowcase ? "gap-6" : "gap-4"
          } ${padClass}`}
          style={
            exportMode
              ? {
                  padding: pad,
                  paddingTop: logoUrl ? (pad ?? 0) + 56 : pad,
                }
              : undefined
          }
        >
          <div className="min-w-0 flex-1">
            <h3
              className={`leading-tight font-bold tracking-[-0.02em] ${
                exportMode
                  ? ""
                  : isShowcase
                    ? "text-[1.5rem] lg:text-[1.75rem]"
                    : "truncate text-lg sm:text-xl"
              }`}
              style={{
                color: theme.text,
                fontSize: exportMode ? 40 : undefined,
              }}
            >
              {data.name || "Your Name"}
            </h3>
            <p
              className={`tracking-wide ${
                exportMode
                  ? "mt-1"
                  : isShowcase
                    ? "mt-1 text-[13px] lg:text-sm"
                    : "mt-0.5 truncate text-[10px] sm:text-xs"
              }`}
              style={{
                color: theme.textMuted,
                fontSize: exportMode ? 18 : undefined,
              }}
            >
              {data.role || "Your Role"}
            </p>
          </div>
          <div
            className="shrink-0"
            style={{
              width: 1,
              height: isLarge ? 48 : 32,
              backgroundColor: theme.border,
            }}
          />
          <p
            className={`shrink-0 text-right tracking-wide ${
              exportMode
                ? ""
                : isShowcase
                  ? "text-[13px] lg:text-sm"
                  : "text-[9px] leading-relaxed sm:text-[10px]"
            }`}
            style={{
              color: theme.textMuted,
              fontSize: exportMode ? 18 : undefined,
            }}
          >
            {contactLine.split(" / ").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
