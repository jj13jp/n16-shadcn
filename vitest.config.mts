import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		coverage: {
			provider: "v8", // または 'istanbul'
			reporter: ["text", "json", "html"], // 出力するレポートの形式
			include: ["src/**/*.ts", "src/**/*.tsx"], // カバレッジ測定の対象ファイル
			exclude: ["src/**/*.d.ts", "src/main.tsx"], // 対象外にするファイル
		},
	},
})
