"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Space2Haven transformed our outdated living room into a stunning, functional space that perfectly reflects our style. Their attention to detail and ability to understand our needs was exceptional.",
      author: "Sarah Johnson",
      role: "Homeowner",
      image: "/testimonial-1.jpg",
    },
    {
      quote:
        "Working with Space2Haven on our office redesign was a seamless experience. They created a workspace that not only looks amazing but has significantly improved our team's productivity and morale.",
      author: "Michael Chen",
      role: "CEO, TechStart Inc.",
      image: "/testimonial-3.jpg",
    },
    {
      quote:
        "The team at Space2Haven brought our boutique hotel vision to life with their innovative design approach. Our guests constantly compliment the unique, welcoming atmosphere they created.",
      author: "Emma Rodriguez",
      role: "Hotel Manager",
      image: "/testimonial-1.jpg",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")  // Media query for mobile devices

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }, [isAnimating, testimonials.length])

  const prevTestimonial = useCallback(() => {
    if (isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }, [isAnimating, testimonials.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [nextTestimonial])

  return (
    <section className="bg-muted/30 py-10 md:py-24 dark:bg-muted/10">
      <div className="container px-2 sm:px-4">
        <div className="mx-auto max-w-5xl space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Testimonials
            </span>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-base md:text-lg">
              Hear what our clients have to say about their experience working with Space2Haven.
            </p>
          </motion.div>

          <div className="relative overflow-visible md:overflow-hidden">
            <div className="relative h-[420px] xs:h-[350px] md:h-[250px] flex items-center justify-center">
              {/* Navigation buttons on either side for all screens */}
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full flex items-center justify-center bg-background/80 shadow-md"
                disabled={isAnimating}
                data-no-scroll="true"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 w-full px-1 xs:px-2 sm:px-4 transition-all duration-500 flex items-center justify-center",
                    index === activeIndex && !isAnimating && "opacity-100 translate-x-0 z-10",
                    index !== activeIndex && "opacity-0 z-0",
                    isAnimating && index === activeIndex && direction === "left" && "translate-x-full opacity-0 z-0",
                    isAnimating && index === activeIndex && direction === "right" && "-translate-x-full opacity-0 z-0",
                    isAnimating &&
                      index === (activeIndex + 1) % testimonials.length &&
                      direction === "right" &&
                      "translate-x-0 opacity-100 z-10",
                    isAnimating &&
                      index === (activeIndex - 1 + testimonials.length) % testimonials.length &&
                      direction === "left" &&
                      "translate-x-0 opacity-100 z-10",
                  )}
                >
                  <Card className="w-full max-w-md sm:max-w-lg h-full border-none bg-background shadow-md mx-auto">
                    <CardContent className="flex h-full flex-col items-center gap-4 p-4 text-center md:flex-row md:gap-8 md:p-8 md:text-left">
                      <div className="flex-shrink-0 mb-2 md:mb-0">
                        <div className="relative h-16 w-16 xs:h-20 xs:w-20 overflow-hidden rounded-full border-2 border-primary/10 md:h-24 md:w-24 mx-auto md:mx-0">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-3 md:space-y-4 flex-1">
                        <Quote className="mx-auto h-7 w-7 text-primary/40 md:ml-0 md:h-8 md:w-8" />
                        <p className="text-base xs:text-lg italic">{testimonial.quote}</p>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-xs xs:text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full flex items-center justify-center bg-background/80 shadow-md"
                disabled={isAnimating}
                data-no-scroll="true"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Indicators: Hide on mobile */}
            <div className={`mt-6 ${isMobile ? "hidden" : "flex"} justify-center gap-2`}>
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (index === activeIndex || isAnimating) return
                    setDirection(index > activeIndex ? "right" : "left")
                    setIsAnimating(true)
                    setTimeout(() => {
                      setActiveIndex(index)
                      setIsAnimating(false)
                    }, 500)
                  }}
                  className={`h-2 w-2 rounded-full p-0 ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
                  disabled={isAnimating}
                  data-no-scroll="true"
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
