import type { ReactNode } from "react";

export function EditorPreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-bg-card shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
      <div className="border-b border-white/[0.06] px-5 py-3 sm:px-6">
        <p className="text-[10px] font-medium tracking-[0.22em] text-fg-muted uppercase">
          Live preview
        </p>
      </div>
      <div className="p-5 sm:p-6 lg:p-7">{children}</div>
    </div>
  );
}
