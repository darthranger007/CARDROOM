import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { defaultCardData, getTemplate } from "../data/templates";
import type { CardData, CardLayout, CardTheme } from "../types/card";

interface CardContextValue {
  cardData: CardData;
  theme: CardTheme;
  layout: CardLayout;
  logoUrl: string | null;
  updateCardData: (updates: Partial<CardData>) => void;
  setTheme: (theme: CardTheme) => void;
  setLayout: (layout: CardLayout) => void;
  setLogoUrl: (url: string) => void;
  removeLogo: () => void;
  loadTemplate: (layout: CardLayout) => void;
}

const CardContext = createContext<CardContextValue | null>(null);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [theme, setTheme] = useState<CardTheme>("paper");
  const [layout, setLayout] = useState<CardLayout>("classic");
  const [logoUrl, setLogoUrlState] = useState<string | null>(null);

  const updateCardData = (updates: Partial<CardData>) => {
    setCardData((prev) => ({ ...prev, ...updates }));
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
        updateCardData,
        setTheme,
        setLayout,
        setLogoUrl,
        removeLogo,
        loadTemplate,
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
