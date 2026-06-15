"use client"

import { motion, useInView } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"

export function AboutSection() {
	const t = useTranslations("about")
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-120px" })

	return (
		<section id="about" ref={ref} className="py-36 px-6">
			<div className="max-w-6xl mx-auto">
				{/* セクション番号 + 見出し */}
				<div className="flex items-baseline gap-4 mb-20 overflow-hidden">
					<motion.span
						className="font-mono text-xs text-muted-foreground/50 self-start mt-1"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.5 }}
					>
						01
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

				<div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
					{/* テキスト */}
					<div className="space-y-6">
						<motion.p
							className="text-lg md:text-xl leading-relaxed text-muted-foreground"
							initial={{ opacity: 0, x: -30 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
						>
							{t("body")}
						</motion.p>
						<motion.p
							className="text-lg md:text-xl leading-relaxed text-muted-foreground"
							initial={{ opacity: 0, x: -30 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
						>
							{t("body2")}
						</motion.p>
					</div>

					{/* ビジュアル */}
					<motion.div
						className="relative"
						initial={{ opacity: 0, x: 30 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
					>
						<div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden flex items-center justify-center relative">
							{/* 装飾グリッド */}
							<div
								className="absolute inset-0 opacity-[0.07]"
								style={{
									backgroundImage:
										"linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
									backgroundSize: "32px 32px",
								}}
							/>
							<motion.span
								className="font-display text-8xl text-foreground/10 select-none"
								animate={isInView ? { scale: [0.9, 1] } : {}}
								transition={{ duration: 1, delay: 0.4 }}
							>
								JA
							</motion.span>
						</div>
						{/* 装飾ボーダー */}
						<motion.div
							className="absolute -bottom-5 -right-5 w-40 h-28 border border-border rounded-2xl -z-10"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={isInView ? { opacity: 1, scale: 1 } : {}}
							transition={{ duration: 0.5, delay: 0.5 }}
						/>
						<motion.div
							className="absolute -top-3 -left-3 w-16 h-16 rounded-full border border-border -z-10"
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.5, delay: 0.6 }}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
