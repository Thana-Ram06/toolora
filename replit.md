# Toolora

Toolora is a browser-first collection of free online tools for everyday digital tasks.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `PORT=23533 BASE_PATH=/ pnpm --filter @workspace/toolora run build` — production build for Toolora
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/toolora/src/data/tools.ts` — centralized tool registry
- `artifacts/toolora/src/components/tool-workspace.tsx` — client-side tool workspaces
- `artifacts/toolora/src/lib/client-tools.ts` — image, download, and PDF browser helpers
- `artifacts/toolora/src/index.css` — Toolora visual tokens and global styles

## Architecture decisions

- Toolora is client-only so file contents can remain in the user's browser.
- Wouter routes are backed by the shared tool registry so library, category, related-tool, and detail views stay consistent.
- Browser localStorage stores only favorites and recent tool slugs; no account is required.
- File processing uses Canvas and Blob APIs, while QR/PDF export is lazy at the workspace level.

## Product

Toolora provides searchable tools for image processing, text cleanup, developer formatting, local generation, and lightweight utilities. It includes browser-local favorites and recents plus dedicated workspaces for each tool.

## User preferences

Toolora should remain lightweight, welcoming, and usable without login or a paywall.

## Gotchas

The Vite build needs `PORT` and `BASE_PATH`; the managed web workflow supplies them automatically.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
