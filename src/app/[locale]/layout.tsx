import type { Metadata } from "next"
import { DM_Serif_Display, Geist_Mono, Noto_Sans } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ThemeProvider } from "@/components/theme-provider"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import "@/app/globals.css"

const notoSans = Noto_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
})

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
})

const dmSerifDisplay = DM_Serif_Display({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-display",
})

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
		<html
			lang={locale}
			suppressHydrationWarning
			className={cn(
				"antialiased",
				notoSans.variable,
				geistMono.variable,
				dmSerifDisplay.variable
			)}
		>
			<body className="font-sans">
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider>
						<Header />
						{children}
						<Footer />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
