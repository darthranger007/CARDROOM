import { getTheme } from "../../data/templates";
import type { CardData, CardLayout, CardTheme } from "../../types/card";

type CardSize = "default" | "showcase" | "editor";

interface BusinessCardProps {
  data: CardData;
  theme: CardTheme;
  layout: CardLayout;
  logoUrl?: string | null;
  className?: string;
  index?: string;
  badge?: string;
  exportMode?: boolean;
  size?: CardSize;
}

type LogoSize = "sm" | "md" | "lg";

function CardLogo({
  logoUrl,
  size = "md",
  onDarkCard,
}: {
  logoUrl: string;
  size?: LogoSize;
  onDarkCard?: boolean;
}) {
  const dim = size === "lg" ? 96 : size === "md" ? 56 : 44;

  return (
    <img
      src={logoUrl}
      alt=""
      crossOrigin="anonymous"
      className="object-contain"
      style={{
        width: dim,
        height: dim,
        filter: onDarkCard
          ? "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))"
          : undefined,
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
  badge,
  exportMode = false,
  size = "default",
}: BusinessCardProps) {
  const theme = getTheme(themeId);
  const isEditor = size === "editor" && !exportMode;
  const isShowcase = size === "showcase" && !exportMode;
  const isLarge = isShowcase || isEditor || exportMode;

  const contactLine = [data.email, data.location || data.year]
    .filter(Boolean)
    .join(" / ");

  const pad = exportMode ? 48 : isShowcase ? undefined : undefined;
  const logoSize: LogoSize = exportMode ? "lg" : isEditor || isShowcase ? "md" : "sm";
  const logoReserve = logoUrl
    ? logoSize === "lg"
      ? 108
      : logoSize === "md"
        ? 64
        : 48
    : 0;
  const logoOffset = logoReserve;
  const onDarkCard = themeId === "cobalt" || themeId === "charcoal";

  const shellClass = exportMode
    ? `relative h-full w-full overflow-hidden ${className}`
    : `relative w-full overflow-hidden ${
        isEditor
          ? "h-full min-h-[280px] rounded-[24px]"
          : `aspect-[1.75/1] ${isShowcase ? "rounded-[18px]" : "rounded-xl shadow-md"}`
      } ${className}`;

  const padClass = exportMode
    ? ""
    : isEditor
      ? "p-10 lg:p-12"
      : isShowcase
        ? "p-7 sm:p-8 lg:p-9"
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
      {(badge || index) &&
        !exportMode &&
        !(index && isShowcase) &&
        !(badge && isEditor) && (
        <span
          className={`absolute font-semibold tracking-wide ${
            isEditor
              ? "top-10 left-10 text-[13px]"
              : "top-4 left-4 text-[10px] opacity-60"
          } ${!badge && themeId === "paper" && isEditor ? "text-accent" : ""}`}
          style={{
            color: badge
              ? theme.textMuted
              : !badge && themeId === "paper" && isEditor
                ? undefined
                : isEditor
                  ? indexColor
                  : theme.textMuted,
          }}
        >
          — {badge ?? index}
        </span>
      )}

      {logoUrl && layout !== "minimal" && (
        <div
          className={
            exportMode
              ? "absolute"
              : isEditor
                ? "absolute top-10 right-10"
                : isShowcase
                  ? "absolute top-8 right-8 lg:top-10 lg:right-10"
                  : "absolute top-4 right-4 sm:top-5 sm:right-5"
          }
          style={exportMode ? { top: pad, right: pad } : undefined}
        >
          <CardLogo logoUrl={logoUrl} size={logoSize} onDarkCard={onDarkCard} />
        </div>
      )}

      {layout === "classic" && (
        <div
          className={`flex h-full flex-col justify-between ${padClass}`}
          style={exportMode ? { padding: pad } : undefined}
        >
          <div style={{ paddingRight: logoOffset }}>
            {index && isShowcase && (
              <p
                className={`mb-5 text-[13px] font-semibold tracking-wide ${
                  themeId === "paper" ? "text-accent" : ""
                }`}
                style={
                  themeId !== "paper" ? { color: indexColor } : undefined
                }
              >
                — {index}
              </p>
            )}
            <h3
              className={`leading-tight font-bold tracking-[-0.02em] ${
                exportMode
                  ? ""
                  : isEditor
                    ? "text-[2rem] lg:text-[2.25rem]"
                    : isShowcase
                      ? "text-[1.75rem] lg:text-[2rem]"
                      : "text-xl sm:text-2xl"
              }`}
              style={{
                color: theme.text,
                fontSize: exportMode ? 44 : undefined,
              }}
            >
              {data.name || "Your name"}
            </h3>
            <p
              className={`tracking-wide ${
                exportMode
                  ? "mt-2"
                  : isEditor
                    ? "mt-3 text-base lg:text-lg"
                    : isShowcase
                      ? "mt-2 text-[15px] text-ink-muted"
                      : "mt-1 text-xs sm:text-sm"
              }`}
              style={{
                color: theme.textMuted,
                fontSize: exportMode ? 22 : undefined,
              }}
            >
              {data.role || "Independent Creative Director"}
            </p>
          </div>
          <p
            className={`tracking-wide ${
              exportMode
                ? ""
                : isEditor
                  ? "text-sm lg:text-base"
                  : isShowcase
                    ? "text-[13px] lg:text-sm"
                    : "text-[10px] sm:text-xs"
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
          style={exportMode ? { padding: pad } : undefined}
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
          <div className="flex max-w-[42%] shrink-0 flex-col items-end justify-center gap-3">
            {logoUrl && (
              <CardLogo
                logoUrl={logoUrl}
                size={exportMode ? "lg" : "sm"}
                onDarkCard={onDarkCard}
              />
            )}
            <p
              className={`text-right tracking-wide ${
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
        </div>
      )}
    </div>
  );
}
