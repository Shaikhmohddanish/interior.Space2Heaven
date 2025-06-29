"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, X, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
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
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
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
      image: "/portfolio-1.jpg",
      description: "A sleek, minimalist design that maximizes space and light.",
      images: ["/portfolio-1.jpg", "/hero-1.jpg", "/service-1.jpg"]
    },
    {
      title: "Tech Startup Headquarters",
      category: "Commercial",
      style: "Modern",
      image: "/portfolio-2.jpg",
      description: "A dynamic workspace fostering creativity and collaboration.",
      images: ["/portfolio-2.jpg", "/hero-3.jpg", "/service-2.jpg"]
    },
    {
      title: "Boutique Hotel Lobby",
      category: "Hospitality",
      style: "Eclectic",
      image: "/portfolio-3.jpg",
      description: "An elegant hotel lobby creating a memorable first impression.",
      images: ["/portfolio-3.jpg", "/service-3.jpg", "/portfolio-6.jpg"]
    },
    {
      title: "Urban Loft Renovation",
      category: "Residential",
      style: "Industrial",
      image: "/portfolio-4.jpg",
      description: "A contemporary living space honoring industrial character.",
      images: ["/portfolio-4.jpg", "/portfolio-5.jpg", "/service-1.jpg"]
    },
    {
      title: "Luxury Retail Store",
      category: "Commercial",
      style: "Modern",
      image: "/portfolio-5.jpg",
      description: "A high-end retail environment showcasing premium products.",
      images: ["/portfolio-5.jpg", "/service-4.jpg", "/service-2.jpg"]
    },
    {
      title: "Farm-to-Table Restaurant",
      category: "Hospitality",
      style: "Traditional",
      image: "/portfolio-6.jpg",
      description: "A warm, rustic design emphasizing natural materials.",
      images: ["/portfolio-6.jpg", "/hero-2.jpg", "/service-5.jpg"]
    },
  ]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  const handleImageLoad = (image: string) => {
    setIsLoaded((prev) => ({ ...prev, [image]: true }))
  }

  // Reset loaded state when category changes
  useEffect(() => {
    setIsLoaded({})
  }, [activeCategory, activeStyle])

  const openProjectDialog = (project: any) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
  }

  const prevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
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
                onClick={() => openProjectDialog(project)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
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
                      hoveredIndex === index ? "scale-105" : "scale-100",
                      isLoaded[project.image] ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => handleImageLoad(project.image)}
                    priority={index < 3}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium group-hover:text-primary">{project.title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{project.style}</span>
                  </div>
                </div>
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

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-4xl border-none bg-background/95 p-0 backdrop-blur-sm sm:rounded-lg">
            <DialogTitle className="sr-only">{selectedProject?.title || "Project Details"}</DialogTitle>
            <DialogClose
              className="absolute right-4 top-4 z-10 rounded-full bg-gray-800/70 p-2 text-white backdrop-blur-sm transition-colors hover:bg-gray-800/90"
              data-no-scroll="true"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            {selectedProject && (
              <div className="relative">
                <div className="relative aspect-video overflow-hidden bg-muted/30">
                  <Image
                    src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                    priority
                  />

                  {selectedProject.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                      >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">Previous image</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                      >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Next image</span>
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex gap-2 overflow-x-auto p-4">
                  {selectedProject.images.map((image: string, i: number) => (
                    <div
                      key={i}
                      className={cn(
                        "relative h-16 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all",
                        i === currentImageIndex ? "border-primary" : "border-transparent",
                      )}
                      onClick={() => setCurrentImageIndex(i)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${selectedProject.title} thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
