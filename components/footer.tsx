"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const isMobile = useMediaQuery("(max-width: 768px)")

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
    <footer className="border-t bg-muted/40 dark:bg-muted/10">
      <div className="container py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-medium">Space2Haven</h3>
            <p className="text-sm text-muted-foreground">
              Transforming spaces into havens through thoughtful design and meticulous execution.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-medium">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span>
                  4th Floor, Zenia Building,<br />Hiranandani Business Park, Thane
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="tel:+918976511551" className="hover:text-primary">
                  +91 897 651 1551
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="tel:+918286984597" className="hover:text-primary">
                  +91 828 698 4597
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="mailto:Hello@space2heaven.com" className="hover:text-primary">
                  Hello@space2heaven.com
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest design trends and inspiration.
            </p>
            <div className="flex flex-col space-y-2">
              <Input placeholder="Your email address" />
              <Button className="rounded-full">Subscribe</Button>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 border-t border-border/50 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
            <p>&copy; {currentYear} Space2Haven. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="https://space2haven.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="https://space2haven.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/918976511551?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20interior%20design%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-circle"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          <span className="sr-only">Contact us on WhatsApp</span>
        </a>
      </div>
    </footer>
  )
}
