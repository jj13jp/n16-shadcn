"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Link, usePathname } from "@/i18n/routing"

export function Header() {
	const t = useTranslations("nav")
	const locale = useLocale()
	const pathname = usePathname()
	const { resolvedTheme, setTheme } = useTheme()
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		const handler = () => setScrolled(window.scrollY > 60)
		window.addEventListener("scroll", handler, { passive: true })
		return () => window.removeEventListener("scroll", handler)
	}, [])

	const navItems = [
		{ href: "/about", label: t("about") },
		{ href: "/works", label: t("works") },
		{ href: "/skills", label: t("skills") },
		{ href: "/contact", label: t("contact") },
	]

	return (
		<motion.header
			style={{ viewTransitionName: "site-header" }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				scrolled
					? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
					: "bg-transparent"
			}`}
			initial={{ y: -80, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
		>
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link href="/">
					<motion.span
						className="font-display text-lg tracking-tight cursor-pointer"
						whileHover={{ opacity: 0.6 }}
						transition={{ duration: 0.15 }}
					>
						Jo Aoki
					</motion.span>
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-8">
					{navItems.map((item, i) => {
						const isActive = pathname === item.href
						return (
							<motion.div
								key={item.href}
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
								whileHover={{ y: -2 }}
							>
								<Link
									href={item.href}
									className={`text-sm transition-colors ${
										isActive
											? "text-foreground font-medium"
											: "text-muted-foreground hover:text-foreground"
									}`}
								>
									{item.label}
								</Link>
							</motion.div>
						)
					})}
				</nav>

				<div className="flex items-center gap-4">
					{/* Language switcher */}
					<motion.div
						className="flex items-center gap-1 font-mono text-xs"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
					>
						<Link
							href={pathname}
							locale="ja"
							className={`px-2 py-1 rounded transition-colors ${
								locale === "ja"
									? "text-foreground font-semibold"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							JA
						</Link>
						<span className="text-border select-none">/</span>
						<Link
							href={pathname}
							locale="en"
							className={`px-2 py-1 rounded transition-colors ${
								locale === "en"
									? "text-foreground font-semibold"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							EN
						</Link>
					</motion.div>

					{/* Theme toggle */}
					<motion.button
						type="button"
						className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
						onClick={() => {
							const next = resolvedTheme === "dark" ? "light" : "dark"
							if (
								typeof document !== "undefined" &&
								"startViewTransition" in document
							) {
								document.documentElement.classList.add("theme-switching")
								;(
									document as Document & {
										startViewTransition: (cb: () => void) => {
											finished: Promise<void>
										}
									}
								)
									.startViewTransition(() => setTheme(next))
									.finished.finally(() => {
										document.documentElement.classList.remove("theme-switching")
									})
							} else {
								setTheme(next)
							}
						}}
						aria-label="テーマ切り替え"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						{resolvedTheme === "light" ? <Sun size={16} /> : <Moon size={16} />}
					</motion.button>

					{/* Mobile hamburger */}
					<button
						type="button"
						className="md:hidden flex flex-col gap-1.5 p-1"
						onClick={() => setMenuOpen((v) => !v)}
						aria-label="メニュー"
					>
						<motion.span
							className="block w-5 h-px bg-foreground origin-center"
							animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.25 }}
						/>
						<motion.span
							className="block w-5 h-px bg-foreground"
							animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
							transition={{ duration: 0.15 }}
						/>
						<motion.span
							className="block w-5 h-px bg-foreground origin-center"
							animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.25 }}
						/>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<motion.div
				className="md:hidden overflow-hidden"
				initial={false}
				animate={{ height: menuOpen ? "auto" : 0 }}
				transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
			>
				<nav className="px-6 pb-6 pt-2 flex flex-col gap-4 bg-background/95 backdrop-blur-md border-b border-border">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`text-sm transition-colors py-1 ${
								pathname === item.href
									? "text-foreground font-medium"
									: "text-muted-foreground hover:text-foreground"
							}`}
							onClick={() => setMenuOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</motion.div>
		</motion.header>
	)
}
