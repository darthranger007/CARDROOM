import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CardExportTarget } from "../components/editor/CardExportTarget";
import { EditorEssentials } from "../components/editor/EditorEssentials";
import { EditorFinish } from "../components/editor/EditorFinish";
import { useCard } from "../context/CardContext";
import type { CardLayout } from "../types/card";

const validTemplates: CardLayout[] = ["classic", "editorial", "minimal"];

export function EditorPage() {
  const [searchParams] = useSearchParams();
  const { loadTemplate, setTheme } = useCard();
  const [step, setStep] = useState<"essentials" | "finish">("essentials");

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
    <div className="min-h-screen bg-editor-bg text-fg">
      <CardExportTarget />
      <main className="flex min-h-screen items-start justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-[1100px] rounded-[28px] border border-editor-border bg-editor-panel p-6 sm:p-10 lg:p-12">
          {step === "essentials" ? (
            <EditorEssentials onContinue={() => setStep("finish")} />
          ) : (
            <EditorFinish onBack={() => setStep("essentials")} />
          )}
        </div>
      </main>
    </div>
  );
}
