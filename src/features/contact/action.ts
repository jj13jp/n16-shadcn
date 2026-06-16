"use server"

import { parseWithZod } from "@conform-to/zod/v4"
import { Resend } from "resend"
import { contactSchema } from "@/features/contact/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContact(_prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, { schema: contactSchema })

	if (submission.status !== "success") {
		return submission.reply()
	}

	const { name, email, message } = submission.value

	const { error } = await resend.emails.send({
		from: process.env.MAIL_FROM as string,
		to: process.env.EMAIL_ADDRESS as string,
		replyTo: email,
		subject: `お問い合わせ: ${name}`,
		text: `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
	})

	if (error) {
		return submission.reply({
			formErrors: ["送信に失敗しました。時間をおいて再度お試しください。"],
		})
	}

	return submission.reply({ resetForm: true })
}
