import type { CardData, CardTemplate, CardThemeConfig } from "../types/card";

export const themes: CardThemeConfig[] = [
  {
    id: "paper",
    name: "Paper",
    description: "Quiet, considered, direct",
    background: "#f5f3ef",
    text: "#0a0a0a",
    textMuted: "#6b6560",
    accent: "#2b7fff",
    border: "#e5e2db",
  },
  {
    id: "cobalt",
    name: "Cobalt",
    description: "Clear, bright, confident",
    background: "#2b7fff",
    text: "#ffffff",
    textMuted: "rgba(255, 255, 255, 0.75)",
    accent: "#ffffff",
    border: "#1a6fe8",
  },
  {
    id: "charcoal",
    name: "Charcoal",
    description: "Calm, premium, graphic",
    background: "#141824",
    text: "#f0eeeb",
    textMuted: "#8b95a8",
    accent: "#c4c4c8",
    border: "#252d3d",
  },
];

export const templates: CardTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Balanced hierarchy with a refined footer line",
    sample: {
      name: "Ira Mehta",
      role: "Architect & Spatial Designer",
      email: "ira@mehta.studio",
      location: "mumbai",
      tagline: "",
      year: "",
    },
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Bold name treatment with editorial spacing",
    sample: {
      name: "Sahil Batra",
      role: "Founder, Common Table",
      email: "sahil@commontable.co",
      location: "delhi",
      tagline: "",
      year: "",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Quiet composition with essential details only",
    sample: {
      name: "Lena Ford",
      role: "Cultural Strategist",
      email: "lena@fordoffice.co",
      location: "london",
      tagline: "",
      year: "",
    },
  },
];

export const defaultCardData: CardData = {
  name: "",
  role: "",
  email: "",
  location: "",
  tagline: "",
  year: "",
};

export const heroCardData: CardData = {
  name: "Nila Rao",
  role: "Independent Creative Director",
  email: "nila@raoworks.studio",
  location: "",
  tagline: "",
  year: "2026",
};

export function getTheme(id: string): CardThemeConfig {
  return themes.find((t) => t.id === id) ?? themes[0];
}

export function getTemplate(id: string): CardTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}
