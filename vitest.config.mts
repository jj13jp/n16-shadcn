import { defineConfig } from "vitest/config"

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/lib/**/*.ts", "src/features/**/*.ts"],
			exclude: ["src/**/*.d.ts", "src/**/*.test.ts"],
			thresholds: {
				lines: 100,
				functions: 100,
				branches: 100,
				statements: 100,
			},
		},
	},
})
