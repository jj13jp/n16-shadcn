"use client"

import { useTranslations } from "next-intl"

export function Footer() {
	const t = useTranslations("footer")

	return (
		<footer className="py-10 px-6 border-t border-border">
			<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
				<span>© {new Date().getFullYear()} Jo Aoki</span>
				<span>{t("built")}</span>
			</div>
		</footer>
	)
}
