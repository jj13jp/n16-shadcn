import { z } from "zod"

export const contactSchema = z.object({
	name: z
		.string({ error: "お名前を入力してください" })
		.min(1, "お名前を入力してください")
		.max(100, "お名前は100文字以内で入力してください"),
	email: z.email({
		error: (i) =>
			i.input === undefined
				? "メールアドレスを入力してください"
				: "有効なメールアドレスを入力してください",
	}),
	message: z
		.string({ error: "メッセージを入力してください" })
		.min(10, "メッセージは10文字以上で入力してください")
		.max(5000, "メッセージは5000文字以内で入力してください"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
