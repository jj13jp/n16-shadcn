import { describe, expect, test } from "vitest"
import { contactSchema } from "@/features/contact/schema"

describe("contactSchema", () => {
	test("有効なデータで success を返す", () => {
		const result = contactSchema.safeParse({
			name: "青木丈",
			email: "jo@example.com",
			message: "10文字以上のメッセージです",
		})
		expect(result.success).toBe(true)
	})

	test("name が空のとき「お名前を入力してください」", () => {
		const result = contactSchema.safeParse({
			name: "",
			email: "jo@example.com",
			message: "10文字以上のメッセージです",
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe("お名前を入力してください")
	})

	test("name が undefined のとき「お名前を入力してください」", () => {
		const result = contactSchema.safeParse({
			name: undefined,
			email: "jo@example.com",
			message: "10文字以上のメッセージです",
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe("お名前を入力してください")
	})

	test("email が不正形式のとき「有効なメールアドレスを入力してください」", () => {
		const result = contactSchema.safeParse({
			name: "青木丈",
			email: "not-an-email",
			message: "10文字以上のメッセージです",
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe(
			"有効なメールアドレスを入力してください",
		)
	})

	test("email が undefined のとき「メールアドレスを入力してください」", () => {
		const result = contactSchema.safeParse({
			name: "青木丈",
			email: undefined,
			message: "10文字以上のメッセージです",
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe(
			"メールアドレスを入力してください",
		)
	})

	test("message が9文字のとき「メッセージは10文字以上で入力してください」", () => {
		const result = contactSchema.safeParse({
			name: "青木丈",
			email: "jo@example.com",
			message: "123456789",
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe(
			"メッセージは10文字以上で入力してください",
		)
	})

	test("message が undefined のとき「メッセージを入力してください」", () => {
		const result = contactSchema.safeParse({
			name: "青木丈",
			email: "jo@example.com",
			message: undefined,
		})
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe("メッセージを入力してください")
	})
})
