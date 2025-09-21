import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Ayur Batra",
    avatar: "https://picsum.photos/seed/patient-avatar/80/80",
    imageHint: "person portrait",
    testimonial: "Ayur Sutra changed my life. The personalized care and attention to detail are unmatched. I've never felt better.",
    therapy: "Panchakarma Program"
  },
  {
    name: "Sarah L.",
    avatar: "https://picsum.photos/seed/avatar-sarah/80/80",
    imageHint: "woman smiling",
    testimonial: "The Shirodhara therapy was incredibly relaxing. I felt a sense of calm that lasted for days. The practitioners are true experts.",
    therapy: "Shirodhara"
  },
  {
    name: "Michael P.",
    avatar: "https://picsum.photos/seed/avatar-michael/80/80",
    imageHint: "man outside",
    testimonial: "As a busy professional, stress was taking a toll. The diet and lifestyle counseling has been a game-changer for my energy levels and focus.",
    therapy: "Lifestyle Counseling"
  },
  {
    name: "Jessica Y.",
    avatar: "https://picsum.photos/seed/avatar-jessica/80/80",
    imageHint: "woman hiking",
    testimonial: "I was skeptical at first, but the Abhyanga massage worked wonders for my chronic muscle pain. The platform is so easy to use for booking.",
    therapy: "Abhyanga"
  },
];

export default function TestimonialsPage() {
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
                    <Link href="/testimonials" className="text-primary font-semibold">Testimonials</Link>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
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
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Words of Wellness</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           Hear from our community about their healing journeys with Ayur Sutra.
                        </p>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="p-6">
                                    <CardContent className="flex flex-col h-full">
                                        <blockquote className="italic text-muted-foreground mb-4 flex-grow">
                                            "{testimonial.testimonial}"
                                        </blockquote>
                                        <div className="flex items-center gap-4 pt-4 border-t">
                                            <Avatar>
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.imageHint}/>
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold">{testimonial.name}</p>
                                                <p className="text-sm text-primary">{testimonial.therapy}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
