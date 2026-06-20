import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? "github" : "list",
	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		command: "pnpm dev",
		url: "http://localhost:3000/ja",
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		// メール送信を確実に無効化（UX・検証パスのみを検証するため）
		env: { RESEND_API_KEY: "", MAIL_FROM: "", EMAIL_ADDRESS: "" },
	},
})
