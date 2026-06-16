import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { routing } from "@/i18n/routing"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""

const META = {
	ja: {
		title: "青木丈 — フロントエンドエンジニア",
		description:
			"React・Next.js を専門とするフロントエンドエンジニア。UI/UX を重視したコンポーネント設計が得意です。",
		siteName: "青木丈 ポートフォリオ",
		author: "青木丈",
		ogLocale: "ja_JP",
		altLocale: "en_US",
	},
	en: {
		title: "Jo Aoki — Frontend Engineer",
		description:
			"Frontend engineer specializing in React and Next.js. Focused on component architecture and UI/UX.",
		siteName: "Jo Aoki Portfolio",
		author: "Jo Aoki",
		ogLocale: "en_US",
		altLocale: "ja_JP",
	},
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const m = locale === "ja" ? META.ja : META.en
	const authorName = locale === "ja" ? "青木丈" : "Jo Aoki"

	return {
		metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
		title: {
			default: m.title,
			template: `%s | ${authorName}`,
		},
		description: m.description,
		authors: [{ name: m.author }],
		openGraph: {
			type: "website",
			locale: m.ogLocale,
			alternateLocale: m.altLocale,
			title: m.title,
			description: m.description,
			siteName: m.siteName,
			url: `${SITE_URL}/${locale}`,
		},
		twitter: {
			card: "summary",
			title: m.title,
			description: m.description,
		},
		alternates: {
			canonical: `${SITE_URL}/${locale}`,
			languages: {
				ja: `${SITE_URL}/ja`,
				en: `${SITE_URL}/en`,
			},
		},
	}
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<NextIntlClientProvider messages={messages}>
			<ThemeProvider>
				<Header />
				{children}
				<Footer />
			</ThemeProvider>
		</NextIntlClientProvider>
	)
}
