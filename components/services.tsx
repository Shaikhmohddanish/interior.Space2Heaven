"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Home, Building2, Hotel, Hammer, Sofa, Monitor } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const isMobile = useMediaQuery("(max-width: 768px)")

  const services = [
    {
      title: "Residential Design",
      description:
        "Transform your home into a personalized sanctuary that reflects your unique style and meets your functional needs.",
      icon: Home,
      href: "/services",
      image: "/portfolio-1.jpg",
    },
    {
      title: "Commercial Design",
      description:
        "Create inspiring workspaces that enhance productivity, reflect your brand identity, and impress your clients.",
      icon: Building2,
      href: "/services",
      image: "/portfolio-2.jpg",
    },
    {
      title: "Hospitality Design",
      description:
        "Design memorable experiences for your guests with spaces that combine aesthetics, comfort, and functionality.",
      icon: Hotel,
      href: "/services",
      image: "/portfolio-3.jpg",
    },
    {
      title: "Renovation Consulting",
      description:
        "Breathe new life into existing spaces with strategic renovations that maximize impact while respecting your budget.",
      icon: Hammer,
      href: "/services",
      image: "/portfolio-4.jpg",
    },
    {
      title: "Custom Furniture Design",
      description: "Commission bespoke furniture pieces that perfectly fit your space and express your personal style.",
      icon: Sofa,
      href: "/services",
      image: "/portfolio-5.jpg",
    },
    {
      title: "Virtual Design Services",
      description: "Access our expertise remotely with comprehensive virtual design packages tailored to your needs.",
      icon: Monitor,
      href: "/services",
      image: "/portfolio-6.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

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
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Our Expertise
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Comprehensive Design Solutions</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Professional interior design services tailored to your unique needs and vision.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group relative h-full overflow-hidden border-border/40 bg-background transition-all duration-300 hover:border-primary/20 hover:shadow-md dark:bg-background/50">
                  {/* Background image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover object-center opacity-60 group-hover:opacity-70 transition-opacity duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                  </div>
                  <div className="relative z-10 text-white">
                    <CardHeader>
                      <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="transition-colors duration-300 group-hover:text-primary text-white drop-shadow-md">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-white/90 drop-shadow">{service.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-2">
                      <Link
                        href={service.href}
                        className="group inline-flex items-center text-sm font-medium text-white transition-colors hover:text-primary"
                      >
                        Learn More{" "}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center rounded-full bg-primary/5 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            View All Services{" "}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
