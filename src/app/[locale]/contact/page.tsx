import type { Metadata } from "next"
import { ContactSection } from "@/components/sections/ContactSection"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""

const META = {
	ja: {
		title: "Contact",
		description:
			"青木丈へのお仕事のご依頼・お問い合わせはこちらから。フォームよりお気軽にご連絡ください。",
	},
	en: {
		title: "Contact",
		description:
			"Get in touch with Jo Aoki for work inquiries or any questions. Send a message via the contact form.",
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
			canonical: `${SITE_URL}/${locale}/contact`,
			languages: {
				ja: `${SITE_URL}/ja/contact`,
				en: `${SITE_URL}/en/contact`,
				"x-default": `${SITE_URL}/ja/contact`,
			},
		},
	}
}

export default function ContactPage() {
	return (
		<main className="pt-16">
			<ContactSection />
		</main>
	)
}
