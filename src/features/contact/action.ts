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

	// ハニーポット: 人間には不可視の項目。値が入っていれば bot とみなし、
	// 送信せず成功を装って返す（bot に検知を悟らせない）。
	if (formData.get("company")) {
		return submission.reply({ resetForm: true })
	}

	const resendApiKey = process.env.RESEND_API_KEY
	const mailFrom = process.env.MAIL_FROM
	const emailAddress = process.env.EMAIL_ADDRESS

	if (!resendApiKey || !mailFrom || !emailAddress) {
		console.error(
			"RESEND_API_KEY, MAIL_FROM, or EMAIL_ADDRESS is not configured"
		)
		return submission.reply({
			formErrors: ["送信に失敗しました。時間をおいて再度お試しください。"],
		})
	}

	const { name, email, message } = submission.value

	try {
		const { error } = await resend.emails.send({
			from: mailFrom,
			to: emailAddress,
			replyTo: email,
			subject: `お問い合わせ: ${name}`,
			text: `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
		})

		if (error) {
			return submission.reply({
				formErrors: ["送信に失敗しました。時間をおいて再度お試しください。"],
			})
		}
	} catch {
		return submission.reply({
			formErrors: ["送信に失敗しました。時間をおいて再度お試しください。"],
		})
	}

	return submission.reply({ resetForm: true })
}
