import BannerSlider from "@/components/banner-slider"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import Testimonials from "@/components/testimonials"
import ContactCta from "@/components/contact-cta"
import Process from "@/components/process"
import Stats from "@/components/stats"
import BeforeAfterSlider from "@/components/before-after-slider"
import CostCalculator from "@/components/cost-calculator"

export default function Home() {
  return (
    <div className="flex flex-col">
      <BannerSlider />
      <Stats />
      <Services />
      <Process />
      <Portfolio />
      <BeforeAfterSlider />
      <CostCalculator />
      <Testimonials />
      <ContactCta />
    </div>
  )
}
