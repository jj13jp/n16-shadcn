import type { Metadata } from "next"
import { AboutSection } from "@/components/sections/AboutSection"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const META = {
	ja: {
		title: "プロフィール",
		description:
			"React / Next.js を中心としたフロントエンド開発を専門とするエンジニア、青木丈のプロフィールページ。UI/UX を重視したコンポーネント設計が得意領域です。",
	},
	en: {
		title: "About",
		description:
			"Profile of Jo Aoki, a frontend engineer specializing in React and Next.js. Focused on component architecture and UI/UX.",
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
			canonical: `${SITE_URL}/${locale}/about`,
			languages: {
				ja: `${SITE_URL}/ja/about`,
				en: `${SITE_URL}/en/about`,
				"x-default": `${SITE_URL}/ja/about`,
			},
		},
	}
}

export default function AboutPage() {
	return (
		<main className="pt-16">
			<AboutSection />
		</main>
	)
}
