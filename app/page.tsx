import BannerSlider from "@/components/banner-slider"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import Testimonials from "@/components/testimonials"
import VideoShowcase from "@/components/video-showcase"
import ContactCta from "@/components/contact-cta"
import Process from "@/components/process"
import Stats from "@/components/stats"
import BeforeAfterSlider from "@/components/before-after-slider"
import RoomVisualizer from "@/components/room-visualizer"
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
      <RoomVisualizer />
      <VideoShowcase />
      <CostCalculator />
      <Testimonials />
      <ContactCta />
    </div>
  )
}
