"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [currentProject, setCurrentProject] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: "Living Room Transformation",
      description: "From outdated to contemporary elegance",
      before: "/before-1.jpg",
      after: "/after-1.jpg",
    },
    {
      title: "Kitchen Renovation",
      description: "A complete modernization with improved functionality",
      before: "/before-2.jpg",
      after: "/after-2.jpg",
    },
    {
      title: "Bedroom Makeover",
      description: "A cozy and modern retreat",
      before: "/portfolio-2.jpg",
      after: "/portfolio-3.jpg",
    },
    {
      title: "Office Upgrade",
      description: "Functional and inspiring workspace redesign",
      before: "/portfolio-4.jpg",
      after: "/portfolio-5.jpg",
    },
  ]

  // Drag logic for slider
  const handleDrag = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleDrag(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDrag(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    handleDrag(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleDrag(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  useEffect(() => {
    if (!isDragging) return
    const onMouseUp = () => setIsDragging(false)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("mouseleave", onMouseUp)
    return () => {
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("mouseleave", onMouseUp)
    }
  }, [isDragging])

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Before & After</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Witness the dramatic transformations we've achieved for our clients.
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Arrows - Hide on mobile */}
          <div className="absolute left-4 right-4 top-1/2 z-10 hidden -translate-y-1/2 justify-between md:flex">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              onClick={prevProject}
              data-no-scroll="true"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              onClick={nextProject}
              data-no-scroll="true"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div
              ref={containerRef}
              className="relative aspect-[16/9] w-full cursor-ew-resize overflow-hidden rounded-lg touch-pan-x select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* After image (full width) */}
              <div className="absolute inset-0">
                <Image
                  src={projects[currentProject].after || "/placeholder.svg"}
                  alt="After"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Before image (clipped) */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <Image
                  src={projects[currentProject].before || "/placeholder.svg"}
                  alt="Before"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Slider control */}
              <div
                className="absolute bottom-0 top-0 z-10 w-1 cursor-ew-resize bg-white"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-primary shadow-lg">
                  <div className="flex h-full items-center justify-center">
                    <ChevronLeft className="h-4 w-4 text-white" />
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                Before
              </div>
              <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                After
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold">{projects[currentProject].title}</h3>
              <p className="text-muted-foreground">{projects[currentProject].description}</p>
            </div>

            {/* Project navigation dots */}
            <div className="flex justify-center gap-2">
              <div className="hidden md:flex">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${index === currentProject ? "bg-primary w-4" : "bg-muted"}`}
                    onClick={() => setCurrentProject(index)}
                    data-no-scroll="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
