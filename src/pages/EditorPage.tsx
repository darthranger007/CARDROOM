import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardExportTarget } from "../components/editor/CardExportTarget";
import { EditorEssentials } from "../components/editor/EditorEssentials";
import { EditorFinish } from "../components/editor/EditorFinish";
import { DonateButton } from "../components/layout/DonateButton";
import { useCard } from "../context/CardContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME } from "../config/site";
import type { CardLayout } from "../types/card";
import { ensureEditorFontsLoaded } from "../utils/loadEditorFonts";

const validTemplates: CardLayout[] = ["classic", "editorial", "minimal"];

export function EditorPage() {
  const [searchParams] = useSearchParams();
  const { loadTemplate, setTheme } = useCard();
  const [step, setStep] = useState<"essentials" | "finish">("essentials");

  usePageMeta({
    title: `Design Your Business Card | ${SITE_NAME}`,
    path: "editor",
  });

  useEffect(() => {
    ensureEditorFontsLoaded();
  }, []);

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
    <div className="editor-ambient min-h-screen text-fg">
      <CardExportTarget />
      <main className="flex min-h-screen justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex w-full max-w-[1120px] flex-col rounded-[32px] border border-white/[0.08] bg-editor-panel/95 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-10 lg:p-12">
          {step === "essentials" ? (
            <EditorEssentials onContinue={() => setStep("finish")} />
          ) : (
            <EditorFinish onBack={() => setStep("essentials")} />
          )}
          <div className="mt-10 flex justify-center border-t border-editor-border/70 pt-6">
            <DonateButton variant="dark" />
          </div>
        </div>
      </main>
    </div>
  );
}
