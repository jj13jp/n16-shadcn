import { describe, expect, test } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
	test("単一クラスをそのまま返す", () => {
		expect(cn("foo")).toBe("foo")
	})

	test("複数クラスをスペース区切りで結合する", () => {
		expect(cn("foo", "bar")).toBe("foo bar")
	})

	test("falsy な値を無視する", () => {
		expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar")
	})

	test("Tailwind の競合クラスを後勝ちでマージする", () => {
		expect(cn("p-4", "p-8")).toBe("p-8")
	})

	test("条件付きクラスを適用する", () => {
		expect(cn("base", { active: true, disabled: false })).toBe("base active")
	})
})
