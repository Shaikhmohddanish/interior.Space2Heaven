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
            How We Work
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Design Process</h2>
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
          <div className="absolute left-[calc(50%-1px)] top-0 hidden h-full w-0.5 bg-border md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative ${isMobile ? "mb-12 pl-16" : "md:grid md:grid-cols-2 md:gap-8"}`}
              >
                {/* Mobile step number */}
                <motion.div
                  className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground md:hidden`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm font-bold">{step.number}</span>
                </motion.div>

                {/* Content */}
                <div className={`${isMobile ? "" : index % 2 === 0 ? "md:text-right" : "md:order-2"}`}>
                  <div className="space-y-2">
                    <span className="hidden text-sm font-medium text-primary md:inline-block">{step.number}</span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Desktop step indicator */}
                <motion.div
                  className={`absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground md:flex ${
                    index % 2 === 0 ? "md:order-2 md:justify-self-start" : "md:justify-self-end"
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
