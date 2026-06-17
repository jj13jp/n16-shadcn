import { HeroSection } from "@/components/sections/HeroSection"
import { WorksHighlight } from "@/components/sections/WorksHighlight"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""

function safeJsonLd(data: unknown): string {
	return JSON.stringify(data)
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e")
		.replace(/&/g, "\\u0026")
}

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const name = locale === "ja" ? "青木丈" : "Jo Aoki"

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name,
		jobTitle: "Frontend Engineer",
		url: `${SITE_URL}/${locale}`,
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
