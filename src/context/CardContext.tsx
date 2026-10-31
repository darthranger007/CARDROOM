import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { defaultCardData, getTemplate } from "../data/templates";
import { defaultCardTypography } from "../data/fonts";
import type { CardData, CardLayout, CardTheme, CardTextStyle, CardTypography, CardTypographyZone } from "../types/card";

interface CardContextValue {
  cardData: CardData;
  theme: CardTheme;
  layout: CardLayout;
  logoUrl: string | null;
  typography: CardTypography;
  updateCardData: (updates: Partial<CardData>) => void;
  setTheme: (theme: CardTheme) => void;
  setLayout: (layout: CardLayout) => void;
  setLogoUrl: (url: string) => void;
  removeLogo: () => void;
  loadTemplate: (layout: CardLayout) => void;
  updateTypography: (zone: CardTypographyZone, updates: Partial<CardTextStyle>) => void;
  resetTypography: () => void;
  applyTypographyFromZone: (source: CardTypographyZone) => void;
}

const CardContext = createContext<CardContextValue | null>(null);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [theme, setTheme] = useState<CardTheme>("cobalt");
  const [layout, setLayout] = useState<CardLayout>("classic");
  const [logoUrl, setLogoUrlState] = useState<string | null>(null);
  const [typography, setTypography] = useState<CardTypography>(defaultCardTypography);

  const updateCardData = (updates: Partial<CardData>) => {
    setCardData((prev) => ({ ...prev, ...updates }));
  };

  const updateTypography = (
    zone: CardTypographyZone,
    updates: Partial<CardTextStyle>
  ) => {
    setTypography((prev) => ({
      ...prev,
      [zone]: { ...prev[zone], ...updates },
    }));
  };

  const resetTypography = () => {
    setTypography(defaultCardTypography);
  };

  const applyTypographyFromZone = (source: CardTypographyZone) => {
    setTypography((prev) => {
      const style = prev[source];
      return {
        name: { ...style },
        role: { ...style },
        tagline: { ...style },
        contact: { ...style },
      };
    });
  };

  const setLogoUrl = (url: string) => {
    setLogoUrlState(url);
  };

  const removeLogo = () => {
    setLogoUrlState(null);
  };

  const loadTemplate = (newLayout: CardLayout) => {
    const template = getTemplate(newLayout);
    setLayout(newLayout);
    setCardData(template.sample);
  };

  return (
    <CardContext.Provider
      value={{
        cardData,
        theme,
        layout,
        logoUrl,
        typography,
        updateCardData,
        setTheme,
        setLayout,
        setLogoUrl,
        removeLogo,
        loadTemplate,
        updateTypography,
        resetTypography,
        applyTypographyFromZone,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCard() {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}
