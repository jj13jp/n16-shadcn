import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ""
const locales = ["ja", "en"] as const
const pages = ["", "/about", "/works", "/skills", "/contact"] as const

export default function sitemap(): MetadataRoute.Sitemap {
	return locales.flatMap((locale) =>
		pages.map((page) => ({
			url: `${SITE_URL}/${locale}${page}`,
			lastModified: new Date(),
			alternates: {
				languages: {
					ja: `${SITE_URL}/ja${page}`,
					en: `${SITE_URL}/en${page}`,
				},
			},
		}))
	)
}
