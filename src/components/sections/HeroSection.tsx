"use client"

import type { Variants } from "motion/react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.04, delayChildren: 0.1 },
	},
}

const charVariants: Variants = {
	hidden: { opacity: 0, y: 60, rotateX: -40 },
	visible: {
		opacity: 1,
		y: 0,
		rotateX: 0,
		transition: { duration: 0.7, ease: EASE },
	},
}

export function HeroSection() {
	const t = useTranslations("hero")
	const name = t("name")

	return (
		<section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
			{/* 背景のアンビエントグロー */}
			<motion.div
				className="absolute inset-0 -z-10 pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 2 }}
			>
				<div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-foreground/[0.03] rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-foreground/[0.02] rounded-full blur-3xl" />
			</motion.div>

			<div className="text-center max-w-5xl w-full perspective-[800px]">
				{/* ローマ字の小見出し */}
				<motion.p
					className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					Portfolio
				</motion.p>

				{/* メインの名前 — 文字ごとにアニメーション */}
				<motion.h1
					className="font-display text-[clamp(4rem,15vw,12rem)] leading-none tracking-tighter mb-6"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{name.split("").map((char, i) => (
						<motion.span
							key={`char-${i}`}
							variants={charVariants}
							className="inline-block"
						>
							{char === " " ? " " : char}
						</motion.span>
					))}
				</motion.h1>

				{/* 役職 */}
				<motion.div
					className="flex items-center justify-center gap-4 mb-12"
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.9 }}
				>
					<span className="h-px w-12 bg-border" />
					<p className="text-sm md:text-base text-muted-foreground tracking-widest uppercase font-mono">
						{t("title")}
					</p>
					<span className="h-px w-12 bg-border" />
				</motion.div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.1 }}
				>
					<Link href="/works">
						<motion.span
							className="inline-flex items-center gap-3 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-full cursor-pointer"
							whileHover={{
								scale: 1.04,
								transition: { duration: 0.2 },
							}}
							whileTap={{ scale: 0.97 }}
						>
							{t("cta")}
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
						</motion.span>
					</Link>
				</motion.div>
			</div>

			{/* スクロールインジケーター */}
			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.6, duration: 0.6 }}
			>
				<motion.div
					className="w-px bg-foreground/30 origin-top"
					initial={{ height: 0 }}
					animate={{ height: 48 }}
					transition={{ delay: 1.9, duration: 0.8, ease: "easeOut" }}
				/>
				<motion.span
					className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase rotate-90 origin-center"
					animate={{ opacity: [0.4, 1, 0.4] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
				>
					scroll
				</motion.span>
			</motion.div>
		</section>
	)
}
