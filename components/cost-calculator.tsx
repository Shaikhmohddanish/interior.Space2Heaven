"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calculator, DollarSign, Home, Maximize2, Sofa } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function CostCalculator() {
  const [spaceType, setSpaceType] = useState("living")
  const [squareFootage, setSquareFootage] = useState([1000])
  const [designPackage, setDesignPackage] = useState("standard")
  const [includeFurniture, setIncludeFurniture] = useState(true)
  const [includeAccessories, setIncludeAccessories] = useState(true)
  const [includePainting, setIncludePainting] = useState(true)
  const [totalCost, setTotalCost] = useState(0)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const spaceTypes = [
    { id: "living", name: "Living Room", baseRate: 75 },
    { id: "bedroom", name: "Bedroom", baseRate: 65 },
    { id: "kitchen", name: "Kitchen", baseRate: 100 },
    { id: "bathroom", name: "Bathroom", baseRate: 85 },
    { id: "office", name: "Home Office", baseRate: 70 },
    { id: "outdoor", name: "Outdoor Space", baseRate: 60 },
  ]

  const designPackages = [
    { id: "basic", name: "Basic", multiplier: 1 },
    { id: "standard", name: "Standard", multiplier: 1.5 },
    { id: "premium", name: "Premium", multiplier: 2.5 },
    { id: "luxury", name: "Luxury", multiplier: 4 },
  ]

  const calculateCost = () => {
    const selectedSpace = spaceTypes.find((s) => s.id === spaceType)
    const selectedPackage = designPackages.find((p) => p.id === designPackage)

    if (!selectedSpace || !selectedPackage) return 0

    let cost = selectedSpace.baseRate * squareFootage[0] * selectedPackage.multiplier

    if (includeFurniture) cost += squareFootage[0] * 25
    if (includeAccessories) cost += squareFootage[0] * 10
    if (includePainting) cost += squareFootage[0] * 5

    return Math.round(cost)
  }

  useEffect(() => {
    const cost = calculateCost()
    setTotalCost(cost)
    setMonthlyPayment(Math.round(cost / 12))
  }, [spaceType, squareFootage, designPackage, includeFurniture, includeAccessories, includePainting])

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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Design Cost Calculator</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Get an instant estimate for your interior design project based on your specific needs.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Space Type</h3>
              </div>
              <RadioGroup
                value={spaceType}
                onValueChange={setSpaceType}
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
              >
                {spaceTypes.map((space) => (
                  <div key={space.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={space.id} id={`space-${space.id}`} data-no-scroll="true" />
                    <Label htmlFor={`space-${space.id}`} className={isMobile ? "text-sm" : ""}>
                      {space.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Square Footage</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Area size</span>
                  <span className="font-medium">{squareFootage[0]} sq ft</span>
                </div>
                <Slider value={squareFootage} min={100} max={3000} step={50} onValueChange={setSquareFootage} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100 sq ft</span>
                  <span>3000 sq ft</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Design Package</h3>
              </div>
              <Select value={designPackage} onValueChange={setDesignPackage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a design package" />
                </SelectTrigger>
                <SelectContent>
                  {designPackages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
                <div className="rounded-lg border p-2 text-center">
                  <div className="font-medium">Basic</div>
                  <div>Design consultation</div>
                </div>
                <div className="rounded-lg border p-2 text-center">
                  <div className="font-medium">Standard</div>
                  <div>+ 3D visualization</div>
                </div>
                <div className="rounded-lg border p-2 text-center">
                  <div className="font-medium">Premium</div>
                  <div>+ Custom solutions</div>
                </div>
                <div className="rounded-lg border p-2 text-center">
                  <div className="font-medium">Luxury</div>
                  <div>+ Full service</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sofa className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Additional Services</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="furniture"
                    checked={includeFurniture}
                    onCheckedChange={(checked) => setIncludeFurniture(!!checked)}
                    data-no-scroll="true"
                  />
                  <Label htmlFor="furniture" className={isMobile ? "text-sm" : ""}>
                    Furniture Selection & Procurement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accessories"
                    checked={includeAccessories}
                    onCheckedChange={(checked) => setIncludeAccessories(!!checked)}
                    data-no-scroll="true"
                  />
                  <Label htmlFor="accessories" className={isMobile ? "text-sm" : ""}>
                    Accessories & Decor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="painting"
                    checked={includePainting}
                    onCheckedChange={(checked) => setIncludePainting(!!checked)}
                    data-no-scroll="true"
                  />
                  <Label htmlFor="painting" className={isMobile ? "text-sm" : ""}>
                    Painting & Wallpaper
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Your Estimate
                </CardTitle>
                <CardDescription>Based on your selections and requirements</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">${totalCost.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Estimated project cost</p>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex justify-between">
                      <span>Monthly payment:</span>
                      <span className="font-medium">${monthlyPayment}/mo</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">With approved financing over 12 months</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Space Type:</span>
                      <span>{spaceTypes.find((s) => s.id === spaceType)?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Square Footage:</span>
                      <span>{squareFootage[0]} sq ft</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Design Package:</span>
                      <span>{designPackages.find((p) => p.id === designPackage)?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Additional Services:</span>
                      <span>
                        {[
                          includeFurniture && "Furniture",
                          includeAccessories && "Accessories",
                          includePainting && "Painting",
                        ]
                          .filter(Boolean)
                          .join(", ") || "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <p className="text-xs text-muted-foreground">
                  This is an estimate only. Final pricing may vary based on detailed requirements and site conditions.
                </p>
                <Button className="w-full rounded-full">
                  Get Detailed Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
