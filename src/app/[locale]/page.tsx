import { HeroSection } from "@/components/sections/HeroSection"
import { WorksHighlight } from "@/components/sections/WorksHighlight"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

function safeJsonLd(data: unknown): string {
	return JSON.stringify(data)
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e")
		.replace(/&/g, "\\u0026")
		.replace(/\u2028/g, "\\u2028")
		.replace(/\u2029/g, "\\u2029")
}

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const name = locale === "ja" ? "青木丈" : "Jo Aoki"
	const description =
		locale === "ja"
			? "React・Next.js を専門とするフロントエンドエンジニア。"
			: "Frontend engineer specializing in React and Next.js."

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name,
		jobTitle: "Frontend Engineer",
		url: `${SITE_URL}/${locale}`,
		image: `${SITE_URL}/og-image.png`,
		description,
		sameAs: ["https://github.com/jj13jp"],
	}

	return (
		<main>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
			/>
			<HeroSection />
			<WorksHighlight />
		</main>
	)
}
