import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "10 Interior Design Trends to Watch in 2024",
      excerpt:
        "Discover the emerging design trends that will define interiors in the coming year, from sustainable materials to bold color choices.",
      date: "May 10, 2024",
      author: "Alexandra Reynolds",
      category: "Trends",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "How to Choose the Perfect Color Palette for Your Home",
      excerpt:
        "Learn the principles of color theory and how to apply them to create harmonious, personalized color schemes for any space.",
      date: "April 28, 2024",
      author: "Marcus Chen",
      category: "Design Tips",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Small Space Solutions: Maximizing Function in Compact Homes",
      excerpt:
        "Creative strategies for making the most of limited square footage without sacrificing style or comfort.",
      date: "April 15, 2024",
      author: "Sophia Williams",
      category: "Small Spaces",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "The Art of Mixing Vintage and Modern Pieces",
      excerpt:
        "How to blend different eras and styles to create interiors with depth, character, and a timeless quality.",
      date: "March 30, 2024",
      author: "Alexandra Reynolds",
      category: "Styling",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Biophilic Design: Bringing Nature Indoors",
      excerpt:
        "Explore how incorporating natural elements and principles can create healthier, more inspiring interior environments.",
      date: "March 18, 2024",
      author: "Marcus Chen",
      category: "Wellness",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "The Psychology of Interior Design: How Spaces Affect Mood",
      excerpt:
        "Understanding the emotional impact of design choices and how to create spaces that support wellbeing and productivity.",
      date: "March 5, 2024",
      author: "Sophia Williams",
      category: "Psychology",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  const categories = ["All", "Trends", "Design Tips", "Small Spaces", "Styling", "Wellness", "Psychology"]

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Insights, inspiration, and practical advice from our design experts.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
              {category}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">By {post.author}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${index}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </div>

        <div className="rounded-lg bg-muted p-8 text-center">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground">
              Stay updated with the latest design trends, tips, and inspiration delivered directly to your inbox.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input placeholder="Your email address" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
