import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Basic Consultation",
      price: "$250",
      description: "Perfect for those seeking professional advice for a single room or small space.",
      features: [
        "90-minute consultation",
        "Professional design advice",
        "Space planning recommendations",
        "Color scheme suggestions",
        "Shopping list with budget options",
      ],
      cta: "Book Consultation",
      popular: false,
    },
    {
      name: "Full Design Package",
      price: "$2,500",
      description: "Comprehensive design service for a complete room transformation.",
      features: [
        "Initial consultation",
        "Detailed space planning",
        "Custom furniture layout",
        "Material and finish selections",
        "3D renderings of final design",
        "Detailed shopping list",
        "2 revision rounds",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Premium Package",
      price: "$5,000+",
      description: "Full-service design and project management for entire homes or large spaces.",
      features: [
        "Everything in Full Design Package",
        "Project management",
        "Contractor coordination",
        "Custom furniture design",
        "Accessory procurement",
        "Final styling and installation",
        "Post-installation follow-up",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Transparent Pricing</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Choose the perfect design package that fits your needs and budget.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md ${
                plan.popular ? "border-primary" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.name !== "Premium Package" && <span className="ml-1 text-muted-foreground">/room</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mb-6 flex-1 space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className={`w-full rounded-full ${plan.popular ? "" : "variant-outline"}`}>
                <Link href="/contact">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-8 text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl font-bold">Need a Custom Quote?</h2>
            <p className="text-muted-foreground">
              We understand that every project is unique. Contact us for a personalized quote tailored to your specific
              requirements.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
