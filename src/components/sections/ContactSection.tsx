"use client"

import {
	getFormProps,
	getInputProps,
	getTextareaProps,
	useForm,
} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { motion, useInView } from "motion/react"
import { useTranslations } from "next-intl"
import { useActionState, useRef } from "react"
import { submitContact } from "@/features/contact/action"
import { contactSchema } from "@/features/contact/schema"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function ContactSection() {
	const t = useTranslations("contact")
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-80px" })

	const [lastResult, action, isPending] = useActionState(
		submitContact,
		undefined
	)

	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: contactSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	const isSuccess = lastResult !== undefined && lastResult.status !== "error"

	return (
		<section id="contact" ref={ref} className="py-40 px-6 bg-muted/20">
			<div className="max-w-6xl mx-auto">
				{/* 見出し */}
				<div className="flex items-baseline gap-4 mb-20 overflow-hidden">
					<motion.span
						className="font-mono text-xs text-muted-foreground/50 self-start mt-1"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.5 }}
					>
						04
					</motion.span>
					<motion.h2
						className="font-display text-6xl md:text-8xl tracking-tight"
						initial={{ y: 60, opacity: 0 }}
						animate={isInView ? { y: 0, opacity: 1 } : {}}
						transition={{ duration: 0.8, ease: EASE }}
					>
						{t("heading")}
					</motion.h2>
				</div>

				<div className="max-w-2xl">
					<motion.p
						className="text-xl md:text-2xl text-muted-foreground mb-14 leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.25 }}
					>
						{t("body")}
					</motion.p>

					{/* フォーム */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
					>
						{isSuccess ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.2 }}
								className="py-8"
							>
								<div className="overflow-hidden mb-6">
									<motion.p
										className="font-display text-5xl md:text-7xl tracking-tight"
										initial={{ y: 80 }}
										animate={{ y: 0 }}
										transition={{ duration: 0.8, ease: EASE }}
									>
										{t("form.successHeading")}
									</motion.p>
								</div>
								<motion.div
									className="h-px bg-foreground mb-6"
									style={{ transformOrigin: "left" }}
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
								/>
								<motion.p
									className="font-mono text-xs text-muted-foreground/70 tracking-[0.12em] uppercase"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.6, delay: 0.8 }}
								>
									{t("form.success")}
								</motion.p>
							</motion.div>
						) : (
							<form
								{...getFormProps(form)}
								action={action}
								className="space-y-10"
							>
								{/* お名前 */}
								<div className="relative">
									<label
										htmlFor={fields.name.id}
										className="block font-mono text-xs text-muted-foreground/60 uppercase tracking-[0.15em] mb-3"
									>
										{t("form.name")}
									</label>
									<input
										{...getInputProps(fields.name, { type: "text" })}
										className="w-full bg-transparent border-b border-border pb-3 text-base outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30"
										placeholder="—"
									/>
									{fields.name.errors && (
										<motion.p
											className="mt-2 text-xs text-destructive font-mono"
											initial={{ opacity: 0, y: -4 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.2 }}
										>
											{fields.name.errors[0]}
										</motion.p>
									)}
								</div>

								{/* メールアドレス */}
								<div className="relative">
									<label
										htmlFor={fields.email.id}
										className="block font-mono text-xs text-muted-foreground/60 uppercase tracking-[0.15em] mb-3"
									>
										{t("form.email")}
									</label>
									<input
										{...getInputProps(fields.email, { type: "email" })}
										className="w-full bg-transparent border-b border-border pb-3 text-base outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/30"
										placeholder="—"
									/>
									{fields.email.errors && (
										<motion.p
											className="mt-2 text-xs text-destructive font-mono"
											initial={{ opacity: 0, y: -4 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.2 }}
										>
											{fields.email.errors[0]}
										</motion.p>
									)}
								</div>

								{/* メッセージ */}
								<div className="relative">
									<label
										htmlFor={fields.message.id}
										className="block font-mono text-xs text-muted-foreground/60 uppercase tracking-[0.15em] mb-3"
									>
										{t("form.message")}
									</label>
									<textarea
										{...getTextareaProps(fields.message)}
										rows={5}
										className="w-full bg-transparent border-b border-border pb-3 text-base outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/30"
										placeholder="—"
									/>
									{fields.message.errors && (
										<motion.p
											className="mt-2 text-xs text-destructive font-mono"
											initial={{ opacity: 0, y: -4 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.2 }}
										>
											{fields.message.errors[0]}
										</motion.p>
									)}
								</div>

								{/* フォームエラー */}
								{form.errors && (
									<p className="text-xs text-destructive font-mono">
										{form.errors[0]}
									</p>
								)}

								{/* 送信ボタン */}
								<motion.button
									type="submit"
									disabled={isPending}
									className="inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background text-sm font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
									whileHover={
										isPending
											? {}
											: {
													scale: 1.03,
													transition: { duration: 0.2, ease: EASE },
												}
									}
									whileTap={isPending ? {} : { scale: 0.97 }}
								>
									{isPending ? (
										<span className="font-mono text-xs opacity-70">...</span>
									) : (
										<>
											{t("form.submit")}
											<motion.span
												animate={{ x: [0, 4, 0] }}
												transition={{
													duration: 1.5,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
												}}
											>
												→
											</motion.span>
										</>
									)}
								</motion.button>
							</form>
						)}
					</motion.div>

					{/* 装飾ライン */}
					<motion.div
						className="mt-24 h-px bg-border"
						initial={{ scaleX: 0, originX: 0 }}
						animate={isInView ? { scaleX: 1 } : {}}
						transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
					/>
				</div>
			</div>
		</section>
	)
}
