import { getTheme } from "../../data/templates";
import { cardTextStyle, defaultCardTypography } from "../../data/fonts";
import type {
  CardData,
  CardLayout,
  CardTheme,
  CardThemeConfig,
  CardTextStyle,
  CardTypography,
} from "../../types/card";

type CardSize = "default" | "showcase" | "editor";

interface BusinessCardProps {
  data: CardData;
  theme: CardTheme;
  layout: CardLayout;
  logoUrl?: string | null;
  typography?: CardTypography;
  className?: string;
  index?: string;
  badge?: string;
  exportMode?: boolean;
  size?: CardSize;
}

type LogoSize = "sm" | "md" | "lg";

type TextScale = {
  exportMode: boolean;
  isEditor: boolean;
  isShowcase: boolean;
};

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

function getContactEntries(data: CardData, compact: boolean): { text: string }[] {
  const locality = [data.location, data.year].filter((v) => v.trim()).join(" · ");

  if (!compact) {
    return [data.email, data.phone, data.website, locality]
      .map((v) => v.trim())
      .filter(Boolean)
      .map((text) => ({ text }));
  }

  const lines: { text: string }[] = [];

  if (data.email.trim()) {
    lines.push({ text: data.email.trim() });
  }

  const details = [data.phone, data.website, locality]
    .map((v) => v.trim())
    .filter(Boolean)
    .join(" · ");
  if (details) {
    lines.push({ text: details });
  }

  return lines.slice(0, 2);
}

function hasContactContent(data: CardData): boolean {
  return Boolean(
    data.email.trim() ||
      data.phone.trim() ||
      data.website.trim() ||
      data.location.trim() ||
      data.year.trim()
  );
}

function CardAccentMark({ theme }: { theme: CardThemeConfig }) {
  return (
    <div
      className="absolute top-[22%] bottom-[22%] left-0 w-[3px] rounded-r-full"
      style={{ backgroundColor: theme.accent, opacity: theme.accent === "#ffffff" ? 0.9 : 1 }}
      aria-hidden
    />
  );
}

function CardDivider({ theme, compact }: { theme: CardThemeConfig; compact?: boolean }) {
  return (
    <div
      className={`h-px w-full max-w-[120px] ${compact ? "my-2" : "my-3"}`}
      style={{ backgroundColor: theme.border }}
      aria-hidden
    />
  );
}

function CardTagline({
  data,
  theme,
  scale,
  textStyle,
}: {
  data: CardData;
  theme: CardThemeConfig;
  scale: TextScale;
  textStyle: CardTextStyle;
}) {
  const text = data.tagline.trim();
  if (!text) return null;

  return (
    <p
      className={`tracking-wide ${
        scale.exportMode
          ? "mt-2"
          : scale.isEditor || scale.isShowcase
            ? "mt-1.5 text-[12px]"
            : "mt-1.5 text-xs sm:text-sm"
      }`}
      style={{
        color: theme.textMuted,
        fontSize: scale.exportMode ? 20 : undefined,
        ...cardTextStyle(textStyle),
      }}
    >
      {text}
    </p>
  );
}

function CardRoleLine({
  data,
  theme,
  scale,
  textStyle,
  muted = true,
  className = "",
}: {
  data: CardData;
  theme: CardThemeConfig;
  scale: TextScale;
  textStyle: CardTextStyle;
  muted?: boolean;
  className?: string;
}) {
  const trimmed = data.role.trim();
  if (!trimmed) return null;

  return (
    <p
      className={`tracking-wide ${className}`}
      style={{
        color: muted ? theme.textMuted : theme.text,
        fontSize: scale.exportMode ? 22 : undefined,
        letterSpacing: muted ? "0.02em" : undefined,
        ...cardTextStyle(textStyle),
      }}
    >
      {trimmed}
    </p>
  );
}

function CardNameHeading({
  data,
  theme,
  scale,
  textStyle,
  className,
  exportFontSize,
}: {
  data: CardData;
  theme: CardThemeConfig;
  scale: TextScale;
  textStyle: CardTextStyle;
  className: string;
  exportFontSize: number;
}) {
  const trimmed = data.name.trim();
  const previewHint = scale.isEditor && !scale.exportMode;
  if (!trimmed && !previewHint && scale.exportMode) return null;
  if (!trimmed && !previewHint && !scale.isShowcase) return null;

  const ghost = !trimmed && previewHint;

  return (
    <h3
      className={`${className} ${ghost ? "opacity-35" : ""}`}
      style={{
        color: theme.text,
        fontSize: scale.exportMode ? exportFontSize : undefined,
        ...cardTextStyle(textStyle),
      }}
    >
      {trimmed || (previewHint ? "Your name" : trimmed || "Your Name")}
    </h3>
  );
}

function CardContactLines({
  data,
  theme,
  scale,
  align = "left",
  compact = false,
  textStyle,
}: {
  data: CardData;
  theme: CardThemeConfig;
  scale: TextScale;
  align?: "left" | "right";
  compact?: boolean;
  textStyle: CardTextStyle;
}) {
  const lines = getContactEntries(data, compact);
  if (lines.length === 0) return null;
  const isPreview = scale.isEditor || scale.isShowcase;
  const textClass = scale.exportMode
    ? "tracking-wide"
    : isPreview
      ? "text-[11px] leading-snug tracking-wide lg:text-[12px]"
      : "text-[10px] tracking-wide sm:text-xs";

  return (
    <div className={`${compact ? "space-y-0.5" : "space-y-1"} ${align === "right" ? "text-right" : ""}`}>
      {lines.map((line, i) => (
        <p
          key={i}
          className={textClass}
          style={{
            color: theme.textMuted,
            fontSize: scale.exportMode ? 17 : undefined,
            ...cardTextStyle(textStyle),
          }}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export function BusinessCard({
  data,
  theme: themeId,
  layout,
  logoUrl,
  typography = defaultCardTypography,
  className = "",
  index,
  badge,
  exportMode = false,
  size = "default",
}: BusinessCardProps) {
  const theme = getTheme(themeId);
  const isEditor = size === "editor" && !exportMode;
  const isShowcase = size === "showcase" && !exportMode;
  const scale: TextScale = { exportMode, isEditor, isShowcase };
  const compactContact = !exportMode;
  const showContact = hasContactContent(data);

  const pad = exportMode ? 48 : undefined;
  const logoSize: LogoSize = exportMode
    ? "lg"
    : isEditor
      ? "sm"
      : isShowcase
        ? "md"
        : "sm";
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
    : `relative aspect-[1.75/1] w-full overflow-hidden ${
        isEditor ? "rounded-[20px]" : isShowcase ? "rounded-[18px]" : "rounded-xl"
      } ${className}`;

  const padClass = exportMode
    ? ""
    : isEditor
      ? "p-6 pl-8 sm:p-7 sm:pl-9"
      : isShowcase
        ? "p-7 pl-9 sm:p-8 sm:pl-10 lg:p-9 lg:pl-11"
        : "p-5 pl-7 sm:p-6 sm:pl-8";

  const indexColor = themeId === "paper" ? theme.accent : theme.textMuted;

  const cardShadow =
    exportMode
      ? undefined
      : themeId === "paper"
        ? "0 18px 45px rgba(10, 10, 10, 0.1), 0 2px 8px rgba(10, 10, 10, 0.04)"
        : themeId === "cobalt"
          ? "0 20px 50px rgba(0, 40, 120, 0.35)"
          : "0 20px 50px rgba(0, 0, 0, 0.45)";

  return (
    <div
      className={shellClass}
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        border: exportMode ? "none" : `1px solid ${theme.border}`,
        boxShadow: cardShadow,
      }}
    >
      <CardAccentMark theme={theme} />

      {(badge || index) &&
        !exportMode &&
        !(index && isShowcase) &&
        !(badge && isEditor) && (
          <span
            className={`absolute font-semibold tracking-wide ${
              isEditor
                ? "top-10 left-12 text-[13px] lg:left-14"
                : "top-4 left-7 text-[10px] opacity-60 sm:left-8"
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
                ? "absolute top-6 right-6 sm:top-7 sm:right-7"
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
          style={exportMode ? { padding: pad, paddingLeft: (pad ?? 0) + 12 } : undefined}
        >
          <div style={{ paddingRight: logoOffset }}>
            {index && isShowcase && (
              <p
                className={`mb-4 text-[13px] font-semibold tracking-wide ${
                  themeId === "paper" ? "text-accent" : ""
                }`}
                style={themeId !== "paper" ? { color: indexColor } : undefined}
              >
                — {index}
              </p>
            )}
            <CardNameHeading
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.name}
              exportFontSize={46}
              className={`leading-[1.05] tracking-[-0.01em] ${
                exportMode
                  ? ""
                  : isEditor || isShowcase
                    ? "text-[1.55rem] lg:text-[1.7rem]"
                    : "text-xl sm:text-2xl"
              }`}
            />
            <CardRoleLine
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.role}
              className={
                exportMode
                  ? "mt-2"
                  : isEditor || isShowcase
                    ? "mt-1.5 text-[14px]"
                    : "mt-1 text-xs sm:text-sm"
              }
            />
            <CardTagline
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.tagline}
            />
          </div>
          {showContact && (
            <div>
              <CardDivider theme={theme} compact={compactContact} />
              <CardContactLines
                data={data}
                theme={theme}
                scale={scale}
                compact={compactContact}
                textStyle={typography.contact}
              />
            </div>
          )}
        </div>
      )}

      {layout === "editorial" && (
        <div
          className={`flex h-full flex-col justify-between ${padClass}`}
          style={exportMode ? { padding: pad, paddingLeft: (pad ?? 0) + 12 } : undefined}
        >
          <div style={{ paddingRight: logoOffset }}>
            <CardNameHeading
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.name}
              exportFontSize={56}
              className={`leading-none tracking-[-0.01em] ${
                exportMode
                  ? ""
                  : isShowcase || isEditor
                    ? "text-[1.85rem] lg:text-[2rem]"
                    : "text-2xl sm:text-3xl"
              }`}
            />
            <CardTagline
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.tagline}
            />
          </div>
          <div>
            <CardRoleLine
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.role}
              muted={false}
              className={
                exportMode ? "" : isShowcase ? "text-[15px] lg:text-base" : "text-xs sm:text-sm"
              }
            />
            {showContact && (
              <>
                <CardDivider theme={theme} compact={compactContact} />
                <CardContactLines
                  data={data}
                  theme={theme}
                  scale={scale}
                  compact={compactContact}
                  textStyle={typography.contact}
                />
              </>
            )}
          </div>
        </div>
      )}

      {layout === "minimal" && (
        <div
          className={`flex h-full items-stretch justify-between ${
            exportMode ? "gap-6" : isShowcase ? "gap-6" : "gap-4"
          } ${padClass}`}
          style={exportMode ? { padding: pad, paddingLeft: (pad ?? 0) + 12 } : undefined}
        >
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <CardNameHeading
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.name}
              exportFontSize={40}
              className={`leading-tight tracking-[-0.01em] ${
                exportMode
                  ? ""
                  : isShowcase || isEditor
                    ? "text-[1.45rem] lg:text-[1.6rem]"
                    : "truncate text-lg sm:text-xl"
              }`}
            />
            <CardRoleLine
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.role}
              className={
                exportMode
                  ? "mt-1"
                  : isShowcase
                    ? "mt-1 text-[13px] lg:text-sm"
                    : "mt-0.5 truncate text-[10px] sm:text-xs"
              }
            />
            <CardTagline
              data={data}
              theme={theme}
              scale={scale}
              textStyle={typography.tagline}
            />
          </div>
          {(logoUrl || showContact) && (
            <>
              <div
                className="my-2 w-px shrink-0"
                style={{ backgroundColor: theme.border }}
              />
              <div className="flex max-w-[44%] shrink-0 flex-col items-end justify-center gap-3 py-1">
                {logoUrl && (
                  <CardLogo
                    logoUrl={logoUrl}
                    size={exportMode ? "lg" : "sm"}
                    onDarkCard={onDarkCard}
                  />
                )}
                <CardContactLines
                  data={data}
                  theme={theme}
                  scale={scale}
                  compact={compactContact}
                  align="right"
                  textStyle={typography.contact}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
