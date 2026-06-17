import { beforeEach, describe, expect, test, vi } from "vitest"

const mockSend = vi.hoisted(() => vi.fn())

vi.mock("resend", () => ({
	Resend: class {
		emails = { send: mockSend }
	},
}))

import { submitContact } from "@/features/contact/action"

const validFormData = () => {
	const fd = new FormData()
	fd.append("name", "青木丈")
	fd.append("email", "jo@example.com")
	fd.append("message", "10文字以上のメッセージです")
	return fd
}

describe("submitContact", () => {
	beforeEach(() => {
		mockSend.mockReset()
		process.env.RESEND_API_KEY = "re_test_key"
		process.env.MAIL_FROM = "noreply@example.com"
		process.env.EMAIL_ADDRESS = "admin@example.com"
	})

	test("バリデーション失敗時はエラーを返す", async () => {
		const fd = new FormData()
		fd.append("name", "")
		fd.append("email", "invalid-email")
		fd.append("message", "短い")

		const result = await submitContact(undefined, fd)

		expect(result.status).toBe("error")
		expect(mockSend).not.toHaveBeenCalled()
	})

	test("Resend 成功時は status なし・initialValue null を返す", async () => {
		mockSend.mockResolvedValue({ data: { id: "email-id" }, error: null })

		const result = await submitContact(undefined, validFormData())

		expect(result.status).toBeUndefined()
		expect(result.initialValue).toBeNull()
		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({
				from: "noreply@example.com",
				to: "admin@example.com",
				subject: "お問い合わせ: 青木丈",
			})
		)
	})

	test("Resend エラー時はフォームエラーを返す", async () => {
		mockSend.mockResolvedValue({
			data: null,
			error: { message: "API error" },
		})

		const result = await submitContact(undefined, validFormData())

		expect(result.status).toBe("error")
		expect(result.error?.[""]?.[0]).toContain("送信に失敗しました")
	})
})
