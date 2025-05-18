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
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      quote:
        "Working with Space2Haven on our office redesign was a seamless experience. They created a workspace that not only looks amazing but has significantly improved our team's productivity and morale.",
      author: "Michael Chen",
      role: "CEO, TechStart Inc.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      quote:
        "The team at Space2Haven brought our boutique hotel vision to life with their innovative design approach. Our guests constantly compliment the unique, welcoming atmosphere they created.",
      author: "Emma Rodriguez",
      role: "Hotel Manager",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

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
    <section className="bg-muted/30 py-16 md:py-24 dark:bg-muted/10">
      <div className="container">
        <div className="mx-auto max-w-5xl space-y-12">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Hear what our clients have to say about their experience working with Space2Haven.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="relative h-[300px] md:h-[250px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 w-full px-4 transition-all duration-500",
                    index === activeIndex && !isAnimating && "opacity-100 translate-x-0",
                    index !== activeIndex && "opacity-0",
                    isAnimating && index === activeIndex && direction === "left" && "translate-x-full opacity-0",
                    isAnimating && index === activeIndex && direction === "right" && "-translate-x-full opacity-0",
                    isAnimating &&
                      index === (activeIndex + 1) % testimonials.length &&
                      direction === "right" &&
                      "translate-x-0 opacity-100",
                    isAnimating &&
                      index === (activeIndex - 1 + testimonials.length) % testimonials.length &&
                      direction === "left" &&
                      "translate-x-0 opacity-100",
                  )}
                >
                  <Card className="h-full border-none bg-background shadow-md">
                    <CardContent className="flex h-full flex-col items-center gap-6 p-6 text-center md:flex-row md:gap-8 md:p-8 md:text-left">
                      <div className="flex-shrink-0">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary/10 md:h-24 md:w-24">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Quote className="mx-auto h-8 w-8 text-primary/40 md:ml-0" />
                        <p className="text-lg italic">{testimonial.quote}</p>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full"
                disabled={isAnimating}
                data-no-scroll="true"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
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
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full"
                disabled={isAnimating}
                data-no-scroll="true"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
