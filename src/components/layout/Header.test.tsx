// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { afterEach, describe, expect, test, vi } from "vitest"

afterEach(cleanup)

vi.mock("motion/react", async () => {
	const { createElement } = await import("react")

	type MotionProps = React.HTMLAttributes<HTMLElement> & {
		initial?: unknown
		animate?: unknown
		exit?: unknown
		transition?: unknown
		whileHover?: unknown
		whileTap?: unknown
	}

	const stub =
		(tag: string) =>
		({
			initial: _i,
			animate: _a,
			exit: _e,
			transition: _t,
			whileHover: _wh,
			whileTap: _wt,
			children,
			...rest
		}: MotionProps) =>
			createElement(tag, rest, children)

	return {
		motion: {
			header: stub("header"),
			div: stub("div"),
			span: stub("span"),
			button: stub("button"),
		},
		useInView: () => true,
	}
})

vi.mock("next-intl", () => ({
	useTranslations: () => (key: string) => key,
	useLocale: () => "ja",
}))

vi.mock("next-themes", () => ({
	useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }),
}))

vi.mock("@/i18n/routing", () => {
	type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		locale?: string
		href: string
	}
	return {
		Link: ({ locale: _locale, children, ...rest }: LinkProps) =>
			React.createElement("a", rest, children),
		usePathname: () => "/",
	}
})

import { Header } from "./Header"

describe("Header ハンバーガーメニュー", () => {
	test("初期状態: aria-expanded=false、aria-controls=mobile-menu", () => {
		render(<Header />)
		const btn = screen.getByRole("button", { name: "メニューを開く" })
		expect(btn.getAttribute("aria-expanded")).toBe("false")
		expect(btn.getAttribute("aria-controls")).toBe("mobile-menu")
	})

	test("クリックでメニューが開き aria-expanded=true になる", async () => {
		const user = userEvent.setup()
		render(<Header />)
		await user.click(screen.getByRole("button", { name: "メニューを開く" }))
		const btn = screen.getByRole("button", { name: "メニューを閉じる" })
		expect(btn.getAttribute("aria-expanded")).toBe("true")
	})

	test("再クリックで閉じ aria-expanded=false に戻る", async () => {
		const user = userEvent.setup()
		render(<Header />)
		await user.click(screen.getByRole("button", { name: "メニューを開く" }))
		await user.click(screen.getByRole("button", { name: "メニューを閉じる" }))
		const btn = screen.getByRole("button", { name: "メニューを開く" })
		expect(btn.getAttribute("aria-expanded")).toBe("false")
	})

	test("モバイルナビが id=mobile-menu を持つ", () => {
		render(<Header />)
		expect(document.getElementById("mobile-menu")).not.toBeNull()
	})
})
