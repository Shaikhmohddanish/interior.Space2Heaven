"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const banners = [
  {
    id: 1,
    title: "Transform Your Space",
    subtitle: "Award-winning interior design for modern living",
    description:
      "Creating beautiful, functional spaces that reflect your unique style and enhance your quality of life.",
    image: "/hero-1.jpg",
    ctaText: "View Our Work",
    ctaLink: "/portfolio",
    secondaryCtaText: "Book a Consultation",
    secondaryCtaLink: "/contact",
    align: "left",
  },
  {
    id: 2,
    title: "Luxury Interior Design",
    subtitle: "Elevate your home with premium design services",
    description: "Bespoke interior solutions crafted with meticulous attention to detail and the finest materials.",
    image: "/hero-2.jpg",
    ctaText: "Explore Services",
    ctaLink: "/services",
    secondaryCtaText: "View Portfolio",
    secondaryCtaLink: "/portfolio",
    align: "center",
  },
  {
    id: 3,
    title: "Commercial Excellence",
    subtitle: "Inspiring workspaces for forward-thinking businesses",
    description: "Strategic design solutions that enhance productivity, reflect your brand, and impress your clients.",
    image: "/hero-3.jpg",
    ctaText: "Commercial Services",
    ctaLink: "/services",
    secondaryCtaText: "Contact Us",
    secondaryCtaLink: "/contact",
    align: "right",
  },
]

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Reset the timer when the slide changes
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        goToNext()
      }, 5000) // 5 seconds for a more professional pace
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentIndex, isPaused])

  // Pause slider on hover
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <div
      ref={sliderRef}
      className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            className={cn("absolute inset-0 h-full w-full", index === currentIndex ? "z-10" : "z-0")}
            initial={{ opacity: 0 }}
            animate={index === currentIndex ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={banner.image || "/hero-1.jpg"}
                alt={banner.title}
                fill
                priority
                className="object-cover object-center brightness-[0.7] transition-transform duration-10000 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
            </div>

            {/* Content */}
            <div className="container relative z-10 flex h-full items-center">
              <div
                className={cn(
                  "max-w-2xl space-y-6 text-white",
                  banner.align === "center" && "mx-auto text-center",
                  banner.align === "right" && "ml-auto text-right",
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-2"
                >
                  <h3 className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80 sm:text-base">
                    {banner.subtitle}
                  </h3>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                    {banner.title}
                  </h2>
                  <p className="max-w-md text-sm text-white/80 sm:text-base md:text-lg">{banner.description}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={cn(
                    "flex gap-4",
                    banner.align === "center" && "justify-center",
                    banner.align === "right" && "justify-end",
                  )}
                >
                  <Button
                    asChild
                    size={isMobile ? "default" : "lg"}
                    className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href={banner.ctaLink}>{banner.ctaText}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size={isMobile ? "default" : "lg"}
                    className="rounded-full border-white bg-transparent text-white hover:bg-white/10"
                  >
                    <Link href={banner.secondaryCtaLink}>{banner.secondaryCtaText}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
          onClick={goToPrevious}
          data-no-scroll="true"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
          onClick={goToNext}
          data-no-scroll="true"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Indicators (Hidden on Mobile) */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 hidden sm:flex">
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "w-8 bg-white" : "bg-white/50",
            )}
            onClick={() => goToSlide(index)}
            data-no-scroll="true"
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 w-full bg-white/20">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentIndex}
        />
      </div>
    </div>
  )
}
