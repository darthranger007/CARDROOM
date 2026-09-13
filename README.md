# Cardroom — Professional Business Card Maker

A React-based UI for designing professional business cards. Inspired by [Cardroom on Framer](https://affectionate-designs-400452.framer.app/).

## Features

- **Landing page** — Hero, how-it-works, and template showcase
- **Card editor** — Edit name, role, email, location, and year
- **3 templates** — Classic, Editorial, and Minimal layouts
- **3 themes** — Crisp paper, Cobalt confidence, Quiet charcoal
- **Live preview** — See changes instantly as you edit
- **Logo upload** — Add your brand mark (PNG, JPG, SVG, WebP)
- **PDF/PNG export** — Print-ready output at 3.5 × 2 in (300 DPI)
- **Email sharing** — Send the PDF via native share or mailto

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router

## Project structure

```
src/
├── components/
│   ├── card/          # BusinessCard component
│   ├── editor/        # Editor panels (form, templates, themes)
│   ├── landing/       # Landing page sections
│   └── layout/        # Header, Footer
├── context/           # Card state (React Context)
├── data/              # Templates and theme definitions
├── pages/             # Landing & Editor routes
└── types/             # TypeScript interfaces
```

## Export & email

Exports use a hidden 1050×600px render target (300 DPI at 3.5×2 in). Email sharing uses the Web Share API when available (attaches PDF directly on mobile); otherwise it downloads the PDF and opens your mail client with a pre-filled message.

## Next steps

- Persist designs to localStorage or a backend
- Digital card sharing via unique URLs
- Custom font selection
