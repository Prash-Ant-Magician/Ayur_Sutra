import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Leaf, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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
                    <Link href="/about" className="text-primary font-semibold">About Us</Link>
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
                        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">About Ayur Sutra</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           Fusing ancient Ayurvedic wisdom with modern technology to create a seamless path to holistic well-being.
                        </p>
                    </div>
                </section>
                
                <section className="py-24">
                    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-headline mb-4">Our Story</h2>
                            <p className="text-muted-foreground mb-4">
                                Ayur Sutra was born from a desire to make holistic Ayurvedic care more accessible and manageable in today's fast-paced world. We saw a gap between traditional practices and the needs of modern individuals seeking a balanced lifestyle. 
                            </p>
                             <p className="text-muted-foreground">
                                Our platform is designed to bridge that gap, providing intuitive tools for both patients and practitioners to connect, manage treatments, and embark on a journey toward optimal health together. We believe in empowering individuals with the knowledge and resources to integrate Ayurveda into their daily lives.
                            </p>
                        </div>
                        <div>
                           <Image src="https://picsum.photos/seed/about-us/600/400" alt="Our Team" width={600} height={400} className="rounded-lg shadow-md" data-ai-hint="wellness team"/>
                        </div>
                    </div>
                </section>
                
                <section className="py-24 bg-muted">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <Card className="p-6">
                                <CardHeader>
                                    <div className="p-3 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                                        <Leaf className="h-8 w-8 text-primary"/>
                                    </div>
                                    <CardTitle>Our Philosophy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">We honor the ancient traditions of Ayurveda while embracing innovation to provide care that is both authentic and convenient.</p>
                                </CardContent>
                            </Card>
                             <Card className="p-6">
                                <CardHeader>
                                     <div className="p-3 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                                        <Target className="h-8 w-8 text-primary"/>
                                    </div>
                                    <CardTitle>Our Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">To empower individuals to achieve holistic health by providing a comprehensive, user-friendly platform for Ayurvedic care.</p>
                                </CardContent>
                            </Card>
                             <Card className="p-6">
                                <CardHeader>
                                    <div className="p-3 bg-primary/20 rounded-full w-fit mx-auto mb-4">
                                        <Users className="h-8 w-8 text-primary"/>
                                    </div>
                                    <CardTitle>Our Team</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">A dedicated group of practitioners, developers, and wellness advocates passionate about making a difference.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
