import { expect, test } from "@playwright/test"

// 問い合わせフォーム送信のクリティカルパス（UX・検証パス）。
// メール送信成功パスは action.test.ts（Resend モック）が担保するため、
// ここではブラウザ側のバリデーション・ハニーポット・フォーム挙動のみを検証する。
test.describe("問い合わせフォーム", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/ja/contact")
	})

	test("フォームのラベル付き項目が表示される", async ({ page }) => {
		await expect(page.getByLabel("お名前")).toBeVisible()
		await expect(page.getByLabel("メールアドレス")).toBeVisible()
		await expect(page.getByLabel("メッセージ")).toBeVisible()
		await expect(page.getByRole("button", { name: /送信する/ })).toBeVisible()
	})

	test("空のまま送信するとバリデーションエラーが表示され成功画面に進まない", async ({
		page,
	}) => {
		await page.getByRole("button", { name: /送信する/ }).click()

		await expect(page.getByText("お名前を入力してください")).toBeVisible()
		await expect(
			page.getByText("メールアドレスを入力してください")
		).toBeVisible()
		await expect(page.getByText("メッセージを入力してください")).toBeVisible()

		// 成功見出しは出ない（送信されていない）
		await expect(page.getByText("Thank you.")).toHaveCount(0)
	})

	test("不正なメールアドレスではエラーが表示される", async ({ page }) => {
		await page.getByLabel("お名前").fill("青木丈")
		await page.getByLabel("メールアドレス").fill("not-an-email")
		await page
			.getByLabel("メッセージ")
			.fill("これは十分な長さのテストメッセージです")

		await page.getByRole("button", { name: /送信する/ }).click()

		await expect(
			page.getByText("有効なメールアドレスを入力してください")
		).toBeVisible()
		await expect(page.getByText("Thank you.")).toHaveCount(0)
	})

	test("ハニーポット項目は支援技術・キーボードから到達不能", async ({
		page,
	}) => {
		const honeypot = page.locator('input[name="company"]')
		await expect(honeypot).toHaveCount(1)
		// 画面外配置のため Playwright 上は visible 扱いだが、
		// aria-hidden と tabindex=-1 により利用者・AT からは到達できない
		await expect(honeypot).toHaveAttribute("aria-hidden", "true")
		await expect(honeypot).toHaveAttribute("tabindex", "-1")
	})
})
