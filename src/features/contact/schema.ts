import { z } from "zod"

export const contactSchema = z.object({
	name: z
		.string({ error: (i) => (i.input === undefined ? "お名前を入力してください" : undefined) })
		.min(1, "お名前を入力してください"),
	email: z.email({
		error: (i) =>
			i.input === undefined
				? "メールアドレスを入力してください"
				: "有効なメールアドレスを入力してください",
	}),
	message: z
		.string({ error: (i) => (i.input === undefined ? "メッセージを入力してください" : undefined) })
		.min(10, "メッセージは10文字以上で入力してください"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
