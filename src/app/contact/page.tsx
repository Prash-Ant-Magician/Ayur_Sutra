"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { MapPin, Phone, Mail } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", subject: "", message: "" },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Message Sent!",
            description: "Thank you for contacting us. We will get back to you shortly.",
        });
        form.reset();
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
             <header className="sticky top-0 z-50 bg-card shadow-sm">
                <div className="container mx-auto flex items-center justify-between p-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-auto text-primary" />
                    <span className="font-headline text-2xl font-bold text-foreground">Ayur Sutra</span>
                  </Link>
                  <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link>
                    <Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
                    <Link href="/testimonials" className="text-muted-foreground hover:text-primary">Testimonials</Link>
                    <Link href="/contact" className="text-primary font-semibold">Contact</Link>
                  </nav>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Login with Google</Button>
                    <Button size="sm" asChild><Link href="/login">Login / Sign Up</Link></Button>
                  </div>
                </div>
              </header>

            <main className="flex-1">
                 <section className="py-20 text-center bg-primary/10">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Get in Touch</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           We're here to answer any questions you may have about our services and platform.
                        </p>
                    </div>
                </section>
                
                <section className="py-24">
                    <div className="container mx-auto grid md:grid-cols-2 gap-16">
                        <Card className="p-8">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="subject" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl><Input placeholder="Question about Panchakarma" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="message" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl><Textarea placeholder="Your message here..." {...field} rows={5}/></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="submit" className="w-full">Send Message</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold font-headline">Contact Information</h3>
                             <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Our Clinic</h4>
                                    <p className="text-muted-foreground">123 Wellness Lane, Harmony City, 45678</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Phone</h4>
                                    <p className="text-muted-foreground">(123) 456-7890</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Email</h4>
                                    <p className="text-muted-foreground">contact@ayursutra.com</p>
                                </div>
                            </div>
                             <div>
                                <h4 className="font-semibold mb-2">Business Hours</h4>
                                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                                <p className="text-muted-foreground">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}