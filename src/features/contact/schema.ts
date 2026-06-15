import { z } from "zod"

export const contactSchema = z.object({
	name: z.string().min(1, "お名前を入力してください"),
	email: z.string().email("有効なメールアドレスを入力してください"),
	message: z.string().min(10, "メッセージは10文字以上で入力してください"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
