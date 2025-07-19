"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState<Record<string, boolean>>({})

  const categories = ["All", "Residential", "Commercial", "Hospitality"]
  const [activeCategory, setActiveCategory] = useState("All")

  type Project = {
    title: string
    category: string
    description: string
    location: string
    year: string
    images: string[]
  }

  const projects: Project[] = [
    {
      title: "Modern Minimalist Apartment",
      category: "Residential",
      description:
        "A sleek, minimalist apartment design that maximizes space and light while maintaining a warm, inviting atmosphere.",
      location: "New York, NY",
      year: "2023",
      images: [
        "/portfolio-1.jpg",
        "/hero-1.jpg",
        "/service-1.jpg",
      ],
    },
    {
      title: "Coastal Retreat",
      category: "Residential",
      description:
        "A beachfront home designed to capture stunning ocean views while providing a serene, comfortable living environment.",
      location: "Malibu, CA",
      year: "2022",
      images: [
        "/hero-2.jpg",
        "/portfolio-4.jpg",
        "/service-5.jpg",
      ],
    },
    {
      title: "Tech Startup Headquarters",
      category: "Commercial",
      description:
        "A dynamic office space that fosters creativity and collaboration while reflecting the company's innovative brand identity.",
      location: "San Francisco, CA",
      year: "2023",
      images: [
        "/portfolio-2.jpg",
        "/hero-3.jpg",
        "/service-2.jpg",
      ],
    },
    {
      title: "Boutique Hotel Lobby",
      category: "Hospitality",
      description:
        "An elegant hotel lobby that creates a memorable first impression with its sophisticated design and thoughtful details.",
      location: "Chicago, IL",
      year: "2022",
      images: [
        "/portfolio-3.jpg",
        "/service-3.jpg",
        "/portfolio-6.jpg",
      ],
    },
    {
      title: "Urban Loft Renovation",
      category: "Residential",
      description:
        "A complete transformation of an industrial loft into a contemporary living space that honors the building's historic character.",
      location: "Boston, MA",
      year: "2021",
      images: [
        "/modern-kitchen.jpg",
        "/luxury-living.jpg",
        "/modern-office.jpg",
      ],
    },
    {
      title: "Luxury Retail Store",
      category: "Commercial",
      description:
        "A high-end retail environment designed to showcase premium products while providing an immersive brand experience.",
      location: "Miami, FL",
      year: "2023",
      images: [
        "/modern-bathroom.jpg",
        "/bedroom-design.jpg",
        "/portfolio-6.jpg",
      ],
    },
    {
      title: "Farm-to-Table Restaurant",
      category: "Hospitality",
      description:
        "A warm, rustic restaurant design that emphasizes natural materials and creates a connection to the local agricultural community.",
      location: "Portland, OR",
      year: "2022",
      images: [
        "/restaurant-design.jpg",
        "/service-2.jpg",
        "/service-3.jpg",
      ],
    },
    {
      title: "Contemporary Family Home",
      category: "Residential",
      description:
        "A spacious family residence that balances modern aesthetics with practical, family-friendly features.",
      location: "Austin, TX",
      year: "2021",
      images: [
        "/luxury-living.jpg",
        "/modern-kitchen.jpg",
        "/bedroom-design.jpg",
      ],
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
  }, [activeCategory])

  const nextImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
  }

  const prevImage = () => {
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
  }

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Portfolio</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Explore our collection of thoughtfully designed spaces across residential, commercial, and hospitality
            projects.
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center">
            <TabsList className="h-11">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-lg border border-border/40 bg-card shadow-sm transition-all duration-300 hover:shadow-md"
                  onClick={() => {
                    setSelectedProject(project)
                    setCurrentImageIndex(0)
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center bg-muted/30 transition-opacity",
                        isLoaded[project.images[0]] ? "opacity-0" : "opacity-100",
                      )}
                    >
                      <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                    </div>
                    <Image
                      src={project.images[0] || "/modern-kitchen.jpg"}
                      alt={project.title}
                      width={800}
                      height={600}
                      className={cn(
                        "h-full w-full object-cover transition-all duration-700",
                        "group-hover:scale-105",
                        isLoaded[project.images[0]] ? "opacity-100" : "opacity-0",
                      )}
                      onLoad={() => handleImageLoad(project.images[0])}
                      priority={index < 6}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="space-y-1 text-white">
                        <p className="text-sm font-medium">{project.location}</p>
                        <p className="text-xs">{project.year}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.category} | {project.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProject(null)
              setCurrentImageIndex(0)
            }
          }}
        >
          {selectedProject && (
            <DialogContent className="max-w-5xl border-none bg-background/95 p-0 backdrop-blur-sm sm:rounded-lg">
              <DialogTitle className="sr-only">{selectedProject?.title || "Project Details"}</DialogTitle>
              <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-gray-800/70 p-2 text-white backdrop-blur-sm transition-colors hover:bg-gray-800/90">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
              {selectedProject && (
                <div className="relative">
                  <div className="relative aspect-video overflow-hidden bg-muted/30">
                    <Image
                      src={selectedProject.images[currentImageIndex] || "/modern-kitchen.jpg"}
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
                    {selectedProject.images.map((image, i) => (
                      <div
                        key={i}
                        className={cn(
                          "relative h-16 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all",
                          i === currentImageIndex ? "border-primary" : "border-transparent",
                        )}
                        onClick={() => setCurrentImageIndex(i)}
                      >
                        <Image
                          src={image || "/modern-kitchen.jpg"}
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
          )}
        </Dialog>
      </div>
    </div>
  )
}
