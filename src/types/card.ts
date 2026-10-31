export type CardTheme = "paper" | "cobalt" | "charcoal";

export type CardLayout = "classic" | "editorial" | "minimal";

export type CardFontId =
  | "instrument-serif"
  | "inter"
  | "dm-sans"
  | "playfair"
  | "libre-baskerville"
  | "space-grotesk"
  | "lora"
  | "cormorant";

export interface CardTextStyle {
  fontId: CardFontId;
  bold: boolean;
  italic: boolean;
}

export type CardTypographyZone = keyof CardTypography;

export interface CardTypography {
  name: CardTextStyle;
  role: CardTextStyle;
  tagline: CardTextStyle;
  contact: CardTextStyle;
}

export interface CardData {
  name: string;
  role: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  tagline: string;
  year: string;
}

export interface CardThemeConfig {
  id: CardTheme;
  name: string;
  description: string;
  background: string;
  text: string;
  textMuted: string;
  accent: string;
  border: string;
}

export interface CardTemplate {
  id: CardLayout;
  name: string;
  description: string;
  sample: CardData;
}
