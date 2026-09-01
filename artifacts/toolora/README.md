# Toolora

Toolora is a free, browser-first collection of small online tools for everyday digital work. It helps people compress, resize, convert, format, count, generate, and tidy without an account or a complicated workflow.

## Features

- Searchable tool library with category filters
- Browser-local favorites and recently used tools
- Client-side image compression, resizing, cropping, conversion, and image-to-PDF export
- Word and character counting with reading time
- JSON formatting and validation
- Text case conversion, line cleanup, reversal, and Lorem Ipsum generation
- Base64 encoding and decoding
- Password and UUID generation using browser APIs
- Color picker, Unix timestamp conversion, and QR code generation
- Responsive layout with accessible keyboard and focus states

## Tool categories

Image and file tools, text tools, developer helpers, design utilities, generators, and popular shortcuts.

## Tech stack

- React + TypeScript
- Vite
- Wouter
- Tailwind CSS
- Lucide React
- qrcode and pdf-lib-compatible browser tooling

## Local development

```bash
pnpm install
pnpm --filter @workspace/toolora run dev
```

The workspace workflow supplies `PORT` and `BASE_PATH`; both default to `5173` and `/` respectively when running outside Replit.

## Production build

```bash
PORT=23533 BASE_PATH=/ pnpm --filter @workspace/toolora run build
```

The static output is written to `dist/public`.

## Vercel deployment

Toolora is designed to deploy as a static Vite site:

1. Import the repository into Vercel.
2. Set the project root to `artifacts/toolora` if deploying this package alone.
3. Use `pnpm run build` as the build command.
4. Publish `dist/public` as the output directory.
5. Configure the host to rewrite unknown routes to `index.html` so direct tool links work.

No environment variables or server-side persistence are required for the browser tools.

## Project structure

```text
src/
  components/       Shared shell, cards, workspace, and UI primitives
  data/tools.ts     Central tool registry
  hooks/            Browser-local preferences
  lib/              Browser processing and download helpers
  pages/            Home, library, category, tool, legal, and error routes
```