"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { FloatingChatbot } from "@/components/homepage/floating-chatbot";

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10z" />
            <path d="M12 2a7 7 0 0 1 7 7h2a10 10 0 0 0-10-10z" />
        </svg>
    )
}

function DropletIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
    )
}

function PersonStandingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="1" />
            <path d="m9 20 3-6 3 6" />
            <path d="m6 8 6 2 6-2" />
            <path d="M12 10v4" />
        </svg>
    )
}

const patientFeatures = [
    { icon: "📅", title: "Easy Appointment Booking" },
    { icon: "📜", title: "Personalized Therapy Plans" },
    { icon: "📊", title: "Patient History at Glance" },
];

const therapistFeatures = [
    { icon: "🗓️", title: "Manage Daily Itinerary" },
    { icon: "⚙️", title: "Streamlined Operations" },
];


export default function Home() {
    const { handleGoogleSignIn, loading } = useAuth();
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
            <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleGoogleSignIn} disabled={loading}>Login with Google</Button>
            <Button size="sm" asChild>
                <Link href="/login">Login / Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-primary/90 text-primary-foreground">
            <Image
                src="https://picsum.photos/seed/spa-bg/1200/600"
                alt="Ayurvedic treatment"
                fill
                className="object-cover z-0"
                data-ai-hint="serene spa"
            />
            <div className="absolute inset-0 bg-primary/70 z-10" />
            <div className="relative container mx-auto flex flex-col items-start justify-center h-full z-20 text-left">
                <p className="font-semibold text-lg">Ayurveda</p>
                <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight max-w-2xl">
                    Discover Holistic Wellness with Ayur Sutra Panchakarma
                </h1>
                <p className="mt-4 max-w-lg text-lg">
                    Effortlessly manage your Ayurvedic treatments and appointments.
                </p>
                <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link href="/book-appointment">Schedule Your Therapy</Link>
                </Button>
            </div>
        </section>

        <section className="bg-background py-16 -mt-20 relative z-30">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="p-4 border-2 border-primary rounded-full">
                            <LeafIcon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Detoxification</h3>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="p-4 border-2 border-primary rounded-full">
                            <DropletIcon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Stress Relief</h3>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="p-4 border-2 border-primary rounded-full">
                           <PersonStandingIcon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold">Rejuvenation</h3>
                    </div>
                </div>
            </div>
        </section>

        {/* Key Features Section */}
        <section className="py-24 bg-muted">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold font-headline text-center mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-semibold text-center mb-6">For Patients</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {patientFeatures.map(feature => (
                                <Card key={feature.title} className="text-center p-6 bg-card">
                                    <div className="text-4xl mb-2">{feature.icon}</div>
                                    <p className="font-semibold">{feature.title}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-center mb-6">For Therapists</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {therapistFeatures.map(feature => (
                                <Card key={feature.title} className="text-center p-6 bg-card">
                                    <div className="text-4xl mb-2">{feature.icon}</div>
                                    <p className="font-semibold">{feature.title}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-background">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline mb-4">What Our Patients Say</h2>
                <div className="max-w-3xl mx-auto">
                    <Card className="p-8 bg-card">
                        <div className="flex items-center gap-4">
                            <Image src="https://picsum.photos/seed/patient-avatar/80/80" alt="Patient" width={80} height={80} className="rounded-full" data-ai-hint="person portrait"/>
                            <div>
                                <blockquote className="text-lg italic text-left">
                                    "Ayur Sutra changed my life. The personalized care and attention to detail are unmatched. I've never felt better."
                                </blockquote>
                                <p className="text-right font-semibold mt-4">- Ayur Batra</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                    <li><Link href="/about" className="hover:underline">About Us</Link></li>
                    <li><Link href="/services" className="hover:underline">Services</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex gap-4">
                    <Link href="#" aria-label="Facebook"><Facebook /></Link>
                    <Link href="#" aria-label="Twitter"><Twitter /></Link>
                    <Link href="#" aria-label="Instagram"><Instagram /></Link>
                </div>
            </div>
            <div className="md:col-span-2 text-right">
                 <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/book-appointment">
                       Schedule an Appointment <ArrowRight className="ml-2"/>
                    </Link>
                 </Button>
            </div>
        </div>
        <div className="container mx-auto text-center mt-8 border-t border-primary-foreground/20 pt-4">
            <p className="text-sm text-primary-foreground/80">&copy; {new Date().getFullYear()} Ayur Sutra. All rights reserved.</p>
        </div>
      </footer>
      <FloatingChatbot />
    </div>
  );
}
