import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Panchakarma",
    description: "A comprehensive detoxification and rejuvenation program designed to cleanse the body of toxins and restore balance. It involves a series of five therapeutic treatments.",
    image: "https://picsum.photos/seed/panchakarma/400/300",
    imageHint: "ayurvedic therapy"
  },
  {
    title: "Abhyanga",
    description: "A full-body massage using warm, herb-infused oils. This therapy helps to improve circulation, soothe the nervous system, and nourish the skin.",
    image: "https://picsum.photos/seed/abhyanga/400/300",
    imageHint: "oil massage"
  },
  {
    title: "Shirodhara",
    description: "A unique therapy where a continuous stream of warm oil is gently poured over the forehead. It is profoundly relaxing and beneficial for stress and anxiety.",
    image: "https://picsum.photos/seed/shirodhara/400/300",
    imageHint: "forehead oil"
  },
  {
    title: "Herbal Steam (Swedana)",
    description: "An herbal steam bath that helps to open up the body's channels, flush out toxins, and relieve muscle stiffness.",
    image: "https://picsum.photos/seed/swedana/400/300",
    imageHint: "herbal steam"
  },
   {
    title: "Yoga & Meditation",
    description: "Guided sessions to harmonize the mind, body, and spirit. Suitable for all levels, these practices complement our Ayurvedic treatments.",
    image: "https://picsum.photos/seed/yoga/400/300",
    imageHint: "yoga meditation"
  },
   {
    title: "Diet & Lifestyle Counseling",
    description: "Personalized guidance on diet, nutrition, and daily routines based on your unique constitution (Prakriti) to promote long-term health.",
    image: "https://picsum.photos/seed/diet/400/300",
    imageHint: "healthy food"
  },
];

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
             <header className="sticky top-0 z-50 bg-card shadow-sm">
                <div className="container mx-auto flex items-center justify-between p-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-auto text-primary" />
                    <span className="font-headline text-2xl font-bold text-foreground">Ayur Sutra</span>
                  </Link>
                  <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/services" className="text-primary font-semibold">Services</Link>
                    <Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
                    <Link href="/testimonials" className="text-muted-foreground hover:text-primary">Testimonials</Link>
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
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Services</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           A range of authentic Ayurvedic therapies to rejuvenate your mind, body, and soul.
                        </p>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map(service => (
                                <Card key={service.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <Image src={service.image} alt={service.title} width={400} height={300} className="w-full h-48 object-cover" data-ai-hint={service.imageHint} />
                                    <CardHeader>
                                        <CardTitle className="font-headline">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                                        <Button variant="outline" asChild>
                                            <Link href="/dashboard/patient/schedule">Book Now</Link>
                                        </Button>
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
