import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { WorksSection } from "@/components/sections/WorksSection"

export default function Page() {
	return (
		<>
			<Header />
			<main>
				<HeroSection />
				<AboutSection />
				<WorksSection />
				<SkillsSection />
				<ContactSection />
			</main>
			<Footer />
		</>
	)
}
