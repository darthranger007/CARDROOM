const EDITOR_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400;1,9..40,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Space+Grotesk:wght@400;500;600;700&display=swap";

let editorFontsRequested = false;

/** Loads extra Google Fonts used in the card editor (not needed on the landing page). */
export function ensureEditorFontsLoaded(): void {
  if (editorFontsRequested || typeof document === "undefined") return;
  editorFontsRequested = true;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = EDITOR_FONTS_HREF;
  document.head.appendChild(link);
}
