"use client"

import type { Variants } from "motion/react"
import { motion, useInView } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { Link } from "@/i18n/routing"

type WorkItem = {
	title: string
	description: string
	tech: string[]
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 50 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.65, delay: i * 0.12, ease: EASE },
	}),
}

export function WorksHighlight() {
	const t = useTranslations("works")
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-80px" })

	const items = (t.raw("items") as WorkItem[]).slice(0, 2)

	return (
		<section ref={ref} className="py-28 px-6 bg-muted/20">
			<div className="max-w-6xl mx-auto">
				<div className="flex items-end justify-between mb-14 gap-4">
					<div className="flex items-baseline gap-4 overflow-hidden">
						<motion.span
							className="font-mono text-xs text-muted-foreground/50 self-start mt-1"
							aria-hidden="true"
							initial={{ opacity: 0 }}
							animate={isInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.5 }}
						>
							01
						</motion.span>
						<motion.h2
							className="font-display text-5xl md:text-7xl tracking-tight"
							initial={{ y: 60, opacity: 0 }}
							animate={isInView ? { y: 0, opacity: 1 } : {}}
							transition={{ duration: 0.8, ease: EASE }}
						>
							{t("heading")}
						</motion.h2>
					</div>

					<motion.div
						initial={{ opacity: 0, x: 10 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<Link
							href="/works"
							className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
						>
							{t("viewAll")} →
						</Link>
					</motion.div>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					{items.map((item, i) => (
						<motion.article
							key={item.title}
							custom={i}
							variants={cardVariants}
							initial="hidden"
							animate={isInView ? "visible" : "hidden"}
							className="group relative bg-background rounded-2xl p-7 border border-border cursor-default"
							whileHover={{
								y: -8,
								transition: { duration: 0.3, ease: EASE },
							}}
						>
							<motion.div
								className="absolute inset-0 rounded-2xl bg-foreground/[0.02] opacity-0 group-hover:opacity-100 pointer-events-none"
								transition={{ duration: 0.3 }}
							/>

							<div className="mb-5">
								<span className="font-mono text-xs text-muted-foreground/40">
									{String(i + 1).padStart(2, "0")}
								</span>
							</div>

							<h3 className="font-display text-2xl md:text-3xl tracking-tight mb-3">
								{item.title}
							</h3>

							<p className="text-sm text-muted-foreground leading-relaxed mb-7">
								{item.description}
							</p>

							<div className="flex flex-wrap gap-2">
								{item.tech.map((tag) => (
									<span
										key={tag}
										className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-mono"
									>
										{tag}
									</span>
								))}
							</div>

							<motion.span
								aria-hidden="true"
								className="absolute bottom-7 right-7 text-muted-foreground/20 text-xl font-light"
								animate={{ x: 0, opacity: 0.2 }}
								whileHover={{ x: 3, opacity: 0.6 }}
								transition={{ duration: 0.2 }}
							>
								↗
							</motion.span>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	)
}
