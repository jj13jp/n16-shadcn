import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"

export default async function NotFound() {
	const locale = await getLocale()
	const t = await getTranslations({ locale, namespace: "notFound" })

	const homeHref = `/${locale}`

	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
			<div className="text-center max-w-2xl w-full">
				{/* 404 大文字 */}
				<p
					className="font-display text-[clamp(6rem,20vw,16rem)] leading-none tracking-tighter text-foreground/10 select-none mb-2"
					aria-hidden
				>
					404
				</p>

				{/* ラベル */}
				<p className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
					{t("code")} — Not Found
				</p>

				{/* 見出し */}
				<h1 className="font-display text-2xl md:text-3xl tracking-tight mb-4">
					{t("heading")}
				</h1>

				{/* 説明文 */}
				<p className="text-sm text-muted-foreground mb-10 leading-relaxed">
					{t("body")}
				</p>

				<div className="flex items-center justify-center mb-10">
					<span className="h-px w-16 bg-border" />
				</div>

				{/* CTAボタン */}
				<Link
					href={homeHref}
					className="inline-flex items-center gap-3 px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-full"
				>
					← {t("cta")}
				</Link>
			</div>
		</main>
	)
}
