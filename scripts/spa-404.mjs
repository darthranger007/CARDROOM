import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const index = join("dist", "index.html");
const fallback = join("dist", "404.html");

if (!existsSync(index)) {
  console.error("spa-404: dist/index.html not found — run vite build first");
  process.exit(1);
}

copyFileSync(index, fallback);
console.log("spa-404: copied dist/index.html → dist/404.html (GitHub Pages client routes)");
