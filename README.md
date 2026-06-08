# QR Studio

A fast, privacy-friendly **QR code generator** built with **React + Vite**, **Tailwind CSS**, and **React Router**. Generate QR codes for websites, WhatsApp, phone, SMS, and email — everything runs in the browser, so no data is ever sent to a server.

![QR Studio](public/qr.svg)

## Features

- ⚡ **Live preview** — QR code updates as you type
- 🧩 **Many content types** — Website, Text, Email, Phone, SMS, WhatsApp, Wi-Fi, Contact (vCard), Location
- 📷 **Scanner** — read codes with the camera **or by uploading an image**
- 📏 **Size slider** — 128px to 512px
- 💾 **Download as PNG** — via canvas `toDataURL`, saved as `qrcode.png`
- 📋 **Copy to clipboard** — one-click copy
- 📲 **Installable PWA** — add to your phone/desktop home screen, works offline
- 🔔 **Toast notifications** + ⏳ loading state + 🚫 error handling
- ⌨️ **Keyboard shortcut** — press **Enter** to generate
- 🌗 **Light & dark theme** (light by default)
- 💬 **Accessible tooltips** + 🔎 SEO / Open Graph meta tags

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL printed in the terminal (default: http://localhost:5173).

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite dev server         |
| `npm run build`   | Build for production into `dist/` |
| `npm run preview` | Preview the production build      |

## Project structure

```
src/
├── components/   # Navbar, Footer, Layout, QRGenerator, Toast
├── pages/        # Home, Generator, About, NotFound
├── hooks/        # useQRCode, useLocalStorage, useToast
├── utils/        # download, validate
├── App.jsx       # Route definitions
└── main.jsx      # App entry point
```

## Install as an app (PWA)

QR Studio is a Progressive Web App, so it can be installed to a phone or desktop
and used offline.

- **Android / Chrome / Edge:** tap the **Install** button in the header (or the
  browser's "Install app" menu item).
- **iPhone / iPad (Safari):** tap **Share → Add to Home Screen**.
- **Desktop Chrome/Edge:** click the **Install** button, or the install icon in
  the address bar.

> The service worker and install prompt only run over **HTTPS** (or `localhost`).
> They are disabled during `npm run dev`. To test installability locally, build
> and preview the production bundle:
>
> ```bash
> npm run build && npm run preview
> ```
>
> On a phone, the install prompt appears once the app is served over HTTPS — e.g.
> after deploying to Vercel.

App icons are generated from `scripts/icon-source.svg`. To regenerate them:

```bash
npm run icons
```

## Deploy to Vercel

This app is a single-page application, so all routes must fall back to `index.html`.
That rewrite is already configured in [`vercel.json`](vercel.json).

### Option A — Vercel Dashboard

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects the **Vite** framework. Confirm the defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### Option B — Vercel CLI

```bash
npm i -g vercel   # install the CLI (once)
vercel            # deploy a preview
vercel --prod     # deploy to production
```

> **Note:** After deploying, update the absolute URLs in [`index.html`](index.html)
> (`og:url`, `og:image`, `canonical`, etc.) to match your real domain so social
> previews render correctly. For best results, replace `/qr.svg` in the `og:image`
> tags with a 1200×630 PNG.

## Tech stack

- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [qrcode.react](https://github.com/zpao/qrcode.react)
"# qr-code-generator" 
