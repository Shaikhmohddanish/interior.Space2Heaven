"use client"

import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Stats() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const stats = [
    { value: "250+", label: "Projects Completed" },
    { value: "15+", label: "Years of Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "40+", label: "Design Awards" },
  ]

  return (
    <section className="border-y bg-muted/30 py-12 dark:bg-muted/10">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <motion.p
                className="text-3xl font-bold text-primary md:text-4xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
