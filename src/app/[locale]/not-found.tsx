"use client"

import type { Variants } from "motion/react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.05, delayChildren: 0.1 },
	},
}

const charVariants: Variants = {
	hidden: { opacity: 0, y: 50, rotateX: -30 },
	visible: {
		opacity: 1,
		y: 0,
		rotateX: 0,
		transition: { duration: 0.6, ease: EASE },
	},
}

export default function NotFound() {
	const t = useTranslations("notFound")

	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
			{/* 背景グロー */}
			<motion.div
				className="absolute inset-0 -z-10 pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 2 }}
			>
				<div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-foreground/[0.03] rounded-full blur-3xl" />
			</motion.div>

			<div className="text-center max-w-2xl w-full perspective-[800px]">
				{/* 404 大文字 */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="font-display text-[clamp(6rem,20vw,16rem)] leading-none tracking-tighter text-foreground/10 select-none mb-2"
					aria-hidden
				>
					{"404".split("").map((char, i) => (
						<motion.span
							key={`char-${i}`}
							variants={charVariants}
							className="inline-block"
						>
							{char}
						</motion.span>
					))}
				</motion.div>

				{/* ラベル */}
				<motion.p
					className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					{t("code")} — Not Found
				</motion.p>

				{/* 見出し */}
				<motion.h1
					className="font-display text-2xl md:text-3xl tracking-tight mb-4"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
				>
					{t("heading")}
				</motion.h1>

				{/* 説明文 */}
				<motion.p
					className="text-sm text-muted-foreground mb-10 leading-relaxed"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
				>
					{t("body")}
				</motion.p>

				{/* 仕切り線 */}
				<motion.div
					className="flex items-center justify-center gap-4 mb-10"
					initial={{ opacity: 0, scaleX: 0 }}
					animate={{ opacity: 1, scaleX: 1 }}
					transition={{ duration: 0.5, delay: 0.85 }}
				>
					<span className="h-px w-16 bg-border" />
				</motion.div>

				{/* CTAボタン */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
				>
					<Link href="/">
						<motion.span
							className="inline-flex items-center gap-3 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-full cursor-pointer"
							whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
							whileTap={{ scale: 0.97 }}
						>
							<motion.span
								animate={{ x: [0, -4, 0] }}
								transition={{
									duration: 1.5,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								←
							</motion.span>
							{t("cta")}
						</motion.span>
					</Link>
				</motion.div>
			</div>
		</main>
	)
}
