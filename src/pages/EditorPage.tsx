import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CardExportTarget } from "../components/editor/CardExportTarget";
import { CardForm } from "../components/editor/CardForm";
import { CardPreview } from "../components/editor/CardPreview";
import { ExportPanel } from "../components/editor/ExportPanel";
import { LogoUpload } from "../components/editor/LogoUpload";
import { TemplateSelector } from "../components/editor/TemplateSelector";
import { ThemeSelector } from "../components/editor/ThemeSelector";
import { Header } from "../components/layout/Header";
import { useCard } from "../context/CardContext";
import type { CardLayout } from "../types/card";

const validTemplates: CardLayout[] = ["classic", "editorial", "minimal"];

export function EditorPage() {
  const [searchParams] = useSearchParams();
  const { loadTemplate, setTheme } = useCard();

  useEffect(() => {
    const template = searchParams.get("template");
    if (template && validTemplates.includes(template as CardLayout)) {
      loadTemplate(template as CardLayout);
      const themeMap: Record<string, "paper" | "cobalt" | "charcoal"> = {
        classic: "paper",
        editorial: "cobalt",
        minimal: "charcoal",
      };
      setTheme(themeMap[template] ?? "paper");
    }
  }, [searchParams, loadTemplate, setTheme]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header variant="light" />
      <CardExportTarget />
      <main className="px-6 pt-24 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs tracking-[0.25em] text-ink-muted uppercase">
              Card editor
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              Shape your introduction.
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
            <div className="space-y-10">
              <CardForm />
              <LogoUpload />
              <TemplateSelector />
              <ThemeSelector />
              <ExportPanel />
            </div>

            <div className="hidden lg:block">
              <CardPreview />
            </div>
          </div>

          <div className="mt-10 lg:hidden">
            <CardPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
