# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js 16（最重要）

@AGENTS.md

このバージョンの Next.js は破壊的変更を含む。**コードを書く前に** `node_modules/next/dist/docs/` の該当ガイドを必ず読むこと。

- 遅いクライアント遷移を修正する場合、Suspense だけでは不十分。ルートから `unstable_instant` を export し、`node_modules/next/dist/docs/01-app/02-guides/instant-navigation.mdx` を読んでから着手する。

## コマンド

パッケージマネージャは **pnpm**（npm は使わない）。

- `pnpm dev` — 開発サーバ起動
- `pnpm build` / `pnpm start` — 本番ビルド / 起動
- `pnpm check` — Biome の lint + format を自動修正（`biome check --write`）
- `pnpm typecheck` — `tsc --noEmit` で型チェック
- `pnpm test` — vitest（watch モード）
- `pnpm test:run` — vitest 単発実行（`vitest run`）。単体ファイルは `pnpm test:run <path>`
- `pnpm test:ui` — vitest UI（`vitest --ui`）
- `pnpm test:ci` — カバレッジ付き単発実行（`vitest run --coverage`）

`vitest.config.mts` は coverage(v8) のみ設定で、test 環境は既定の `node`（`environment: jsdom` も `setupFiles`・`globals` も未設定）。**React コンポーネントを @testing-library/react でテストする場合は、ファイル先頭に `// @vitest-environment jsdom` を付ける**か config に jsdom 環境を追加する。

## アーキテクチャ・ディレクトリ規約

App Router（RSC 有効）。パスエイリアス `@/*` → `src/*`。

- `src/app/` — ルート定義
- `src/components/ui/` — shadcn コンポーネント（style: **radix-luma**）。追加は `pnpm dlx shadcn@latest add <component>`
- `src/components/` — 共有コンポーネント。`theme-provider.tsx` は next-themes 統合 + `d` キーでダーク/ライト切替（ThemeHotkey）
- `src/features/<feature>/` — 機能別ディレクトリ（規約。現状は空）
- `src/hooks/` — カスタムフック（現状は空）
- `src/lib/utils.ts` — `cn()`（clsx + tailwind-merge）

## スタイリング

- Tailwind CSS v4（`@tailwindcss/postcss`）。`tailwind.config` ファイルは無く、設定は `src/app/globals.css` の CSS 変数ベース
- 色は oklch の CSS 変数で定義（`globals.css` の `:root` と `.dark`）
- アイコン: lucide-react、UI プリミティブ: radix-ui
- **ビジュアル目標は @DESIGN.md（メルカリ）**。ただし DESIGN.md は参照元サイトの実測値で「CSS Framework: Panda CSS / font 15px / Mercari Red #ff333f」と記すが、**実装スタックは本リポジトリの shadcn(radix-luma) + Tailwind v4 + oklch neutral**。DESIGN.md の数値・配色を Tailwind/CSS 変数へ翻訳して適用し、Panda CSS は導入しない。

## コード規約（Biome で強制）

- インデントは**タブ**（width 2）、行幅 80
- `noExplicitAny` / `noUnusedVariables` / `noCommonJs` はいずれも error（ESM のみ）
- React: `useHookAtTopLevel`、`useJsxKeyInIterable` は error

## 技術スタック

バリデーションは **zod**、状態管理は **zustand**（いずれも導入済み・未使用。新規実装時に利用する）。

## その他（重要）

- 適切なタイミングで"git commit"を実施する