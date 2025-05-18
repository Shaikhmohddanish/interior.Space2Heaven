"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ContactCta() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section className="bg-primary/5 py-16 md:py-24 dark:bg-primary/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl space-y-6 text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Get Started Today
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Space?</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Contact us today to schedule a consultation and take the first step toward creating your dream space.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
          >
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
