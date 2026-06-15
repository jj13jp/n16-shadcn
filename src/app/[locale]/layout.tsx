import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { routing } from "@/i18n/routing"

export const metadata: Metadata = {
	title: "Jo Aoki — Frontend Engineer",
	description:
		"Frontend engineer specializing in React and Next.js. フロントエンドエンジニア。",
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
