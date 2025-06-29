"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Process() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We begin with a thorough consultation to understand your vision, needs, and budget for the space.",
    },
    {
      number: "02",
      title: "Concept Development",
      description:
        "Our designers create a detailed concept that aligns with your aesthetic preferences and functional requirements.",
    },
    {
      number: "03",
      title: "Design Presentation",
      description:
        "We present comprehensive design plans including 3D renderings, material selections, and furniture layouts.",
    },
    {
      number: "04",
      title: "Implementation",
      description:
        "Our team manages the entire execution process, from procurement to installation, ensuring quality at every step.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="container py-16 md:py-24 bg-gradient-to-b from-background to-muted/60">
      <div className="mx-auto max-w-5xl space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            How We Work
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Design Process</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            A streamlined approach that transforms your vision into reality with precision and care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line - hidden on mobile, visible on desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-primary/20 md:block z-0" />

          <div className="flex flex-col gap-16 md:gap-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex flex-col md:grid md:grid-cols-2 md:items-center md:min-h-[180px]"
                  style={{ minHeight: isMobile ? undefined : 180 }}
                >
                  {/* Left side (content for even, empty for odd) */}
                  {/* Left side (even: content, odd: empty) */}
                  <div
                    className={`hidden md:flex md:justify-end md:pr-12`}
                    style={{ gridColumn: 1 }}
                  >
                    {isEven ? (
                      <div className="inline-block max-w-md rounded-xl bg-white/90 shadow-lg ring-1 ring-border px-8 py-6 text-right">
                        <span className="text-lg font-bold text-primary/80">{step.number}</span>
                        <h3 className="mt-2 text-2xl font-bold text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-base text-muted-foreground">{step.description}</p>
                      </div>
                    ) : null}
                  </div>

                  {/* Center timeline indicator */}
                  <div className="absolute left-1/2 top-0 flex h-full w-0 md:w-1 -translate-x-1/2 md:static md:translate-x-0 z-10">
                    <div className="relative flex flex-col items-center justify-center h-full">
                      {/* Step number circle (desktop) */}
                      <div className="hidden md:flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground border-4 border-background z-20 shadow-lg">
                        <span className="text-lg font-extrabold">{step.number}</span>
                      </div>
                      {/* Arrow icon */}
                      <div className="hidden md:block h-6 w-6 mt-2 text-primary">
                        <ArrowRight className="h-5 w-5 mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Right side (content for odd, empty for even) */}
                  {/* Right side (odd: content, even: empty) */}
                  <div
                    className={`hidden md:flex md:justify-start md:pl-12`}
                    style={{ gridColumn: 2 }}
                  >
                    {!isEven ? (
                      <div className="inline-block max-w-md rounded-xl bg-white/90 shadow-lg ring-1 ring-border px-8 py-6 text-left">
                        <span className="text-lg font-bold text-primary/80">{step.number}</span>
                        <h3 className="mt-2 text-2xl font-bold text-gray-900">{step.title}</h3>
                        <p className="mt-1 text-base text-muted-foreground">{step.description}</p>
                      </div>
                    ) : null}
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-4 pl-2 mb-8">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-bold">{step.number}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
