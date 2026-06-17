import type { Metadata } from "next"
import { SkillsSection } from "@/components/sections/SkillsSection"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const META = {
	ja: {
		title: "スキル",
		description:
			"青木丈の技術スタック。React・Next.js・TypeScript を中心に、フロントエンド開発で活用しているツールと得意領域を紹介します。",
	},
	en: {
		title: "Skills",
		description:
			"Technical skills of Jo Aoki — React, Next.js, TypeScript, and the frontend tools used in day-to-day development.",
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
			canonical: `${SITE_URL}/${locale}/skills`,
			languages: {
				ja: `${SITE_URL}/ja/skills`,
				en: `${SITE_URL}/en/skills`,
				"x-default": `${SITE_URL}/ja/skills`,
			},
		},
	}
}

export default function SkillsPage() {
	return (
		<main className="pt-16">
			<SkillsSection />
		</main>
	)
}
