"use server"

import { parseWithZod } from "@conform-to/zod/v4"
import { contactSchema } from "./schema"

export async function submitContact(_prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, { schema: contactSchema })

	if (submission.status !== "success") {
		return submission.reply()
	}

	// TODO: ここに実際のメール送信処理を追加（Resend等）
	// await resend.emails.send({ to: "jo.aoki.0113.jj@gmail.com", ... })

	return submission.reply({ resetForm: true })
}
