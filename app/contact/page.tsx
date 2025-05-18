"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  serviceType: z.string({
    required_error: "Please select a service type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Form submitted!",
        description: "We'll get back to you as soon as possible.",
      })
      form.reset()
    }, 1500)
  }

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Ready to transform your space? Get in touch with our design team to discuss your project.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential Design</SelectItem>
                          <SelectItem value="commercial">Commercial Design</SelectItem>
                          <SelectItem value="hospitality">Hospitality Design</SelectItem>
                          <SelectItem value="renovation">Renovation Consulting</SelectItem>
                          <SelectItem value="furniture">Custom Furniture</SelectItem>
                          <SelectItem value="virtual">Virtual Design</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your project" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Design Street, Suite 100
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">(212) 555-1234</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">info@space2haven.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri: 9AM - 6PM
                      <br />
                      Sat: By appointment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="overflow-hidden rounded-lg bg-muted">
              {/* This would be a Google Map in a real implementation */}
              <div className="aspect-video bg-muted p-4 text-center">
                <p className="text-muted-foreground">Interactive Map Would Be Here</p>
              </div>
            </div>

            <div className="rounded-lg bg-primary/10 p-6">
              <h3 className="font-medium">Book a Consultation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefer to speak with a designer directly? Schedule a complimentary 30-minute consultation to discuss
                your project needs.
              </p>
              <Button variant="outline" className="mt-4">
                Schedule Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
