import { DM_Serif_Display, Geist_Mono, Noto_Sans } from "next/font/google"
import { getLocale } from "next-intl/server"
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

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const locale = await getLocale()

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
			<body className="font-sans">{children}</body>
		</html>
	)
}
