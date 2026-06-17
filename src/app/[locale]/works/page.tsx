import type { Metadata } from "next"
import { WorksSection } from "@/components/sections/WorksSection"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""

const META = {
	ja: {
		title: "Works",
		description:
			"青木丈の制作実績。Next.js・React・TypeScript を中心としたフロントエンド開発プロジェクトを紹介します。",
	},
	en: {
		title: "Works",
		description:
			"Portfolio projects by Jo Aoki — frontend development work built with Next.js, React, and TypeScript.",
	},
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const m = locale === "ja" ? META.ja : META.en
	return {
		title: m.title,
		description: m.description,
		alternates: {
			canonical: `${SITE_URL}/${locale}/works`,
			languages: {
				ja: `${SITE_URL}/ja/works`,
				en: `${SITE_URL}/en/works`,
				"x-default": `${SITE_URL}/ja/works`,
			},
		},
	}
}

export default function WorksPage() {
	return (
		<main className="pt-16">
			<WorksSection />
		</main>
	)
}
