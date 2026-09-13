export type CardTheme = "paper" | "cobalt" | "charcoal";

export type CardLayout = "classic" | "editorial" | "minimal";

export interface CardData {
  name: string;
  role: string;
  email: string;
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
