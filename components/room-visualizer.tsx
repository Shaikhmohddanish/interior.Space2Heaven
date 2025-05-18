"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { PaintBucket, Sofa, Lamp, Table, Maximize2, Minimize2 } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function RoomVisualizer() {
  const [activeRoom, setActiveRoom] = useState("living")
  const [activeTab, setActiveTab] = useState("colors")
  const [selectedColor, setSelectedColor] = useState("#F9F5F0")
  const [selectedFurniture, setSelectedFurniture] = useState("modern")
  const [selectedLighting, setSelectedLighting] = useState("warm")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lightIntensity, setLightIntensity] = useState([70])
  const isMobile = useMediaQuery("(max-width: 768px)")

  const visualizerRef = useRef<HTMLDivElement>(null)

  const rooms = [
    { id: "living", name: "Living Room" },
    { id: "bedroom", name: "Bedroom" },
    { id: "kitchen", name: "Kitchen" },
    { id: "bathroom", name: "Bathroom" },
  ]

  const colors = [
    { name: "Warm White", value: "#F9F5F0" },
    { name: "Soft Gray", value: "#E0E0E0" },
    { name: "Sage Green", value: "#D1E2C4" },
    { name: "Dusty Blue", value: "#B8C5D6" },
    { name: "Terracotta", value: "#E07A5F" },
    { name: "Navy Blue", value: "#2C3E50" },
  ]

  const furniture = [
    { id: "modern", name: "Modern" },
    { id: "traditional", name: "Traditional" },
    { id: "minimalist", name: "Minimalist" },
    { id: "industrial", name: "Industrial" },
  ]

  const lighting = [
    { id: "warm", name: "Warm" },
    { id: "cool", name: "Cool" },
    { id: "natural", name: "Natural" },
    { id: "dramatic", name: "Dramatic" },
  ]

  const toggleFullscreen = () => {
    if (!visualizerRef.current) return

    if (!isFullscreen) {
      if (visualizerRef.current.requestFullscreen) {
        visualizerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Interactive Room Visualizer</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Experiment with different colors, furniture styles, and lighting to visualize your perfect space.
          </p>
        </motion.div>

        <div ref={visualizerRef} className="relative overflow-hidden rounded-lg border shadow-lg">
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={toggleFullscreen}
              data-no-scroll="true"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Room navigation */}
          <div className="absolute left-4 right-4 top-4 z-10 flex justify-center">
            <div className="rounded-full bg-background/80 p-1 backdrop-blur-sm">
              <div className="flex flex-wrap justify-center gap-1">
                {rooms.map((room) => (
                  <Button
                    key={room.id}
                    variant={activeRoom === room.id ? "default" : "ghost"}
                    size={isMobile ? "sm" : "default"}
                    className="rounded-full text-xs"
                    onClick={() => setActiveRoom(room.id)}
                    data-no-scroll="true"
                  >
                    {isMobile ? room.name.charAt(0) : room.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Room visualization area */}
          <div
            className="aspect-video w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(/placeholder.svg?height=1080&width=1920)`,
              backgroundColor: selectedColor,
              backgroundBlendMode: "overlay",
              filter: `brightness(${lightIntensity[0]}%)`,
            }}
          >
            {/* Placeholder for 3D room or image */}
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">
                  {activeRoom.charAt(0).toUpperCase() + activeRoom.slice(1)} Visualization
                </p>
                <p className="text-sm">Wall Color: {colors.find((c) => c.value === selectedColor)?.name}</p>
                <p className="text-sm">Furniture Style: {furniture.find((f) => f.id === selectedFurniture)?.name}</p>
                <p className="text-sm">Lighting: {lighting.find((l) => l.id === selectedLighting)?.name}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="border-t bg-background p-4">
            <Tabs defaultValue="colors" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="colors"
                  className="flex items-center justify-center gap-1 px-1 py-1.5 text-xs md:gap-2 md:px-3 md:py-2 md:text-sm"
                  data-no-scroll="true"
                >
                  <PaintBucket className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Colors</span>
                </TabsTrigger>
                <TabsTrigger
                  value="furniture"
                  className="flex items-center justify-center gap-1 px-1 py-1.5 text-xs md:gap-2 md:px-3 md:py-2 md:text-sm"
                  data-no-scroll="true"
                >
                  <Sofa className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Furniture</span>
                </TabsTrigger>
                <TabsTrigger
                  value="lighting"
                  className="flex items-center justify-center gap-1 px-1 py-1.5 text-xs md:gap-2 md:px-3 md:py-2 md:text-sm"
                  data-no-scroll="true"
                >
                  <Lamp className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Lighting</span>
                </TabsTrigger>
                <TabsTrigger
                  value="accessories"
                  className="flex items-center justify-center gap-1 px-1 py-1.5 text-xs md:gap-2 md:px-3 md:py-2 md:text-sm"
                  data-no-scroll="true"
                >
                  <Table className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Accessories</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="mt-4">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        className={`h-10 w-10 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedColor === color.value ? "border-primary ring-2 ring-primary/20" : "border-border"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setSelectedColor(color.value)}
                        title={color.name}
                        data-no-scroll="true"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Selected:</span>
                    <span className="text-sm font-medium">{colors.find((c) => c.value === selectedColor)?.name}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="furniture" className="mt-4">
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                  {furniture.map((item) => (
                    <Button
                      key={item.id}
                      variant={selectedFurniture === item.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedFurniture(item.id)}
                      data-no-scroll="true"
                    >
                      <Sofa className="mr-2 h-4 w-4" />
                      {item.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="lighting" className="mt-4">
                <div className="space-y-4">
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                    {lighting.map((item) => (
                      <Button
                        key={item.id}
                        variant={selectedLighting === item.id ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setSelectedLighting(item.id)}
                        data-no-scroll="true"
                      >
                        <Lamp className="mr-2 h-4 w-4" />
                        {item.name}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Light Intensity</span>
                      <span className="text-sm font-medium">{lightIntensity[0]}%</span>
                    </div>
                    <Slider value={lightIntensity} min={30} max={100} step={5} onValueChange={setLightIntensity} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accessories" className="mt-4">
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-muted-foreground">Accessory options coming soon!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href="/contact">Schedule a Design Consultation</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
