import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    {
      title: "Residential Design",
      description:
        "Transform your home into a personalized sanctuary that reflects your unique style and meets your functional needs.",
      image: "/service-1.jpg",
      features: ["Space Planning", "Furniture Selection", "Color Consultation", "Custom Solutions"],
    },
    {
      title: "Commercial Design",
      description:
        "Create inspiring workspaces that enhance productivity, reflect your brand identity, and impress your clients.",
      image: "/service-2.jpg",
      features: ["Office Layouts", "Brand Integration", "Ergonomic Solutions", "Sustainable Design"],
    },
    {
      title: "Hospitality Design",
      description:
        "Design memorable experiences for your guests with spaces that combine aesthetics, comfort, and functionality.",
      image: "/service-3.jpg",
      features: ["Hotel Interiors", "Restaurant Design", "Experience Creation", "Lighting Design"],
    },
    {
      title: "Renovation Consulting",
      description:
        "Breathe new life into existing spaces with strategic renovations that maximize impact while respecting your budget.",
      image: "/service-4.jpg",
      features: ["Project Management", "Contractor Coordination", "Material Selection", "Budget Planning"],
    },
    {
      title: "Custom Furniture Design",
      description: "Commission bespoke furniture pieces that perfectly fit your space and express your personal style.",
      image: "/service-5.jpg",
      features: ["Custom Cabinetry", "Statement Pieces", "Built-ins", "Material Sourcing"],
    },
    {
      title: "Virtual Design Services",
      description: "Access our expertise remotely with comprehensive virtual design packages tailored to your needs.",
      image: "/service-6.jpg",
      features: ["3D Renderings", "Digital Mood Boards", "Online Consultations", "Shopping Lists"],
    },
  ]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Comprehensive interior design solutions tailored to your unique needs and vision.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={service.image || "/service-1.jpg"}
                  alt={service.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="ml-5 list-disc text-sm text-muted-foreground">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Inquire Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8 text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl font-bold">Not sure which service you need?</h2>
            <p className="text-muted-foreground">
              Schedule a complimentary consultation with our design team to discuss your project and discover the best
              approach for your space.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
