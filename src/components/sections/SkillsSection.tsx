"use client"

import { motion, useInView } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"

type Category = {
	label: string
	items: string[]
}

export function SkillsSection() {
	const t = useTranslations("skills")
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, margin: "-80px" })

	const categories = t.raw("categories") as Category[]

	let globalIndex = 0

	return (
		<section id="skills" ref={ref} className="py-36 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="flex items-baseline gap-4 mb-20 overflow-hidden">
					<motion.span
						className="font-mono text-xs text-muted-foreground/50 self-start mt-1"
						aria-hidden="true"
						initial={{ opacity: 0 }}
						animate={isInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.5 }}
					>
						03
					</motion.span>
					<motion.h1
						className="font-display text-6xl md:text-8xl tracking-tight"
						initial={{ y: 60, opacity: 0 }}
						animate={isInView ? { y: 0, opacity: 1 } : {}}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					>
						{t("heading")}
					</motion.h1>
				</div>

				<div className="space-y-14">
					{categories.map((cat) => (
						<div key={cat.label}>
							<motion.p
								className="font-mono text-xs text-muted-foreground/60 uppercase tracking-[0.2em] mb-5"
								initial={{ opacity: 0, x: -10 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.4, delay: 0.1 }}
							>
								{cat.label}
							</motion.p>

							<div className="flex flex-wrap gap-3">
								{cat.items.map((skill) => {
									const idx = globalIndex++
									return (
										<motion.span
											key={skill}
											className="px-5 py-2.5 rounded-full border border-border text-sm font-medium transition-colors cursor-default"
											initial={{ opacity: 0, scale: 0.8, y: 10 }}
											animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
											transition={{
												duration: 0.45,
												delay: 0.05 * idx + 0.15,
												ease: [0.22, 1, 0.36, 1],
											}}
											whileHover={{
												scale: 1.07,
												backgroundColor: "var(--color-foreground)",
												color: "var(--color-background)",
												borderColor: "var(--color-foreground)",
												transition: { duration: 0.18 },
											}}
										>
											{skill}
										</motion.span>
									)
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
