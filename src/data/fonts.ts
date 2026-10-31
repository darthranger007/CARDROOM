import type { CSSProperties } from "react";
import type { CardFontId, CardTextStyle, CardTypography, CardTypographyZone } from "../types/card";

export interface CardFontDefinition {
  id: CardFontId;
  label: string;
  family: string;
  normalWeight: number;
  boldWeight: number;
  sampleClass?: string;
}

export const CARD_FONTS: CardFontDefinition[] = [
  {
    id: "instrument-serif",
    label: "Instrument Serif",
    family: '"Instrument Serif", Georgia, serif',
    normalWeight: 400,
    boldWeight: 700,
  },
  {
    id: "inter",
    label: "Inter",
    family: '"Inter", system-ui, sans-serif',
    normalWeight: 400,
    boldWeight: 700,
  },
  {
    id: "dm-sans",
    label: "DM Sans",
    family: '"DM Sans", system-ui, sans-serif',
    normalWeight: 400,
    boldWeight: 700,
  },
  {
    id: "playfair",
    label: "Playfair Display",
    family: '"Playfair Display", Georgia, serif',
    normalWeight: 400,
    boldWeight: 700,
  },
  {
    id: "libre-baskerville",
    label: "Libre Baskerville",
    family: '"Libre Baskerville", Georgia, serif',
    normalWeight: 400,
    boldWeight: 700,
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    family: '"Space Grotesk", system-ui, sans-serif',
    normalWeight: 400,
    boldWeight: 700,
  },
  {
    id: "lora",
    label: "Lora",
    family: '"Lora", Georgia, serif',
    normalWeight: 400,
    boldWeight: 700,
  },
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    family: '"Cormorant Garamond", Georgia, serif',
    normalWeight: 400,
    boldWeight: 600,
  },
];

const fontById = Object.fromEntries(
  CARD_FONTS.map((f) => [f.id, f])
) as Record<CardFontId, CardFontDefinition>;

export function getCardFont(id: CardFontId): CardFontDefinition {
  return fontById[id];
}

export const defaultCardTypography: CardTypography = {
  name: { fontId: "instrument-serif", bold: false, italic: false },
  role: { fontId: "inter", bold: false, italic: false },
  tagline: { fontId: "inter", bold: false, italic: true },
  contact: { fontId: "inter", bold: false, italic: false },
};

export function cardTextStyle(style: CardTextStyle): CSSProperties {
  const font = getCardFont(style.fontId);
  return {
    fontFamily: font.family,
    fontWeight: style.bold ? font.boldWeight : font.normalWeight,
    fontStyle: style.italic ? "italic" : "normal",
  };
}

export const TYPOGRAPHY_ZONE_LABELS: Record<CardTypographyZone, string> = {
  name: "Name",
  role: "Role",
  tagline: "Tagline",
  contact: "Contact details",
};
