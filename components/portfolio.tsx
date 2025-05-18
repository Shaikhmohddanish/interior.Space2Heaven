"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, X, Filter } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Portfolio() {
  const categories = ["All", "Residential", "Commercial", "Hospitality"]
  const styles = ["All Styles", "Modern", "Traditional", "Industrial", "Minimalist", "Eclectic"]

  const [activeCategory, setActiveCategory] = useState("All")
  const [activeStyle, setActiveStyle] = useState("All Styles")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState<Record<string, boolean>>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const containerRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: "Modern Minimalist Apartment",
      category: "Residential",
      style: "Minimalist",
      image: "/placeholder.svg?height=600&width=800",
      description: "A sleek, minimalist design that maximizes space and light.",
    },
    {
      title: "Tech Startup Headquarters",
      category: "Commercial",
      style: "Modern",
      image: "/placeholder.svg?height=600&width=800",
      description: "A dynamic workspace fostering creativity and collaboration.",
    },
    {
      title: "Boutique Hotel Lobby",
      category: "Hospitality",
      style: "Eclectic",
      image: "/placeholder.svg?height=600&width=800",
      description: "An elegant hotel lobby creating a memorable first impression.",
    },
    {
      title: "Urban Loft Renovation",
      category: "Residential",
      style: "Industrial",
      image: "/placeholder.svg?height=600&width=800",
      description: "A contemporary living space honoring industrial character.",
    },
    {
      title: "Luxury Retail Store",
      category: "Commercial",
      style: "Modern",
      image: "/placeholder.svg?height=600&width=800",
      description: "A high-end retail environment showcasing premium products.",
    },
    {
      title: "Farm-to-Table Restaurant",
      category: "Hospitality",
      style: "Traditional",
      image: "/placeholder.svg?height=600&width=800",
      description: "A warm, rustic design emphasizing natural materials.",
    },
  ]

  const filteredProjects = projects.filter(
    (project) =>
      (activeCategory === "All" || project.category === activeCategory) &&
      (activeStyle === "All Styles" || project.style === activeStyle),
  )

  const handleImageLoad = (image: string) => {
    setIsLoaded((prev) => ({ ...prev, [image]: true }))
  }

  // Reset loaded state when filters change
  useEffect(() => {
    setIsLoaded({})
  }, [activeCategory, activeStyle])

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = containerRef.current.querySelectorAll(".project-item")
    items.forEach((item) => observer.observe(item))

    return () => {
      items.forEach((item) => observer.unobserve(item))
    }
  }, [filteredProjects])

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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Portfolio</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Explore our collection of thoughtfully designed spaces across residential, commercial, and hospitality
            projects.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs defaultValue="All" className="w-auto">
            <TabsList className="h-auto overflow-x-auto p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  data-no-scroll="true"
                  className={isMobile ? "text-xs px-2" : ""}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              data-no-scroll="true"
            >
              <Filter className="h-4 w-4" />
              {!isMobile && "Filter"}
              {activeStyle !== "All Styles" && (
                <Badge variant="secondary" className={isMobile ? "ml-0" : "ml-2"}>
                  {isMobile ? activeStyle.charAt(0) : activeStyle}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Style filter dropdown */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <Button
                    key={style}
                    variant={activeStyle === style ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setActiveStyle(style)
                      setIsFilterOpen(false)
                    }}
                    data-no-scroll="true"
                    className={isMobile ? "text-xs px-2" : ""}
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="project-item group cursor-pointer overflow-hidden rounded-lg border border-border/40 bg-card shadow-sm transition-all duration-500 hover:shadow-md"
                onClick={() => setSelectedImage(project.image)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-muted/30 transition-opacity",
                      isLoaded[project.image] ? "opacity-0" : "opacity-100",
                    )}
                  >
                    <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                  </div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className={cn(
                      "h-full w-full object-cover transition-all duration-700",
                      "group-hover:scale-105",
                      isLoaded[project.image] ? "opacity-100" : "opacity-0",
                    )}
                    onLoad={() => handleImageLoad(project.image)}
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="space-y-1 text-white">
                      <p className="text-sm font-medium">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-white/30 text-white">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white">
                          {project.style}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium group-hover:text-primary">{project.title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{project.style}</span>
                  </div>
                </div>

                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white bg-transparent text-white hover:bg-white/20"
                      data-no-scroll="true"
                    >
                      View Project
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center rounded-full bg-primary/5 px-6 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-md"
          >
            View Full Portfolio{" "}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-4xl border-none bg-background/95 p-0 backdrop-blur-sm sm:rounded-lg">
            <DialogClose
              className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              data-no-scroll="true"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            {selectedImage && (
              <div className="overflow-hidden sm:rounded-lg">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Portfolio image"
                  width={1200}
                  height={800}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
