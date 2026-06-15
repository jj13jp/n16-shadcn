"use client"

import { motion, useInView } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"

const EMAIL = "jo.aoki.0113.jj@gmail.com"

export function ContactSection() {
	const t = useTranslations("contact")
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-80px" })

	return (
		<section id="contact" ref={ref} className="py-40 px-6 bg-muted/20">
			<div className="max-w-6xl mx-auto">
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
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<motion.a
							href={`mailto:${EMAIL}`}
							className="group inline-flex items-center gap-4 px-10 py-5 bg-foreground text-background rounded-full text-sm font-medium"
							whileHover={{
								scale: 1.03,
								transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
							}}
							whileTap={{ scale: 0.97 }}
						>
							<span>{t("emailLabel")}</span>
							<motion.span
								className="font-mono text-xs opacity-60"
								animate={{ x: 0 }}
								whileHover={{ x: 3 }}
								transition={{ duration: 0.2 }}
							>
								{EMAIL}
							</motion.span>
						</motion.a>
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
