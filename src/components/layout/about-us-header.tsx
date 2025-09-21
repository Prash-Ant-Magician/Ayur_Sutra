"use client"

import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "./logo";

export function AboutUsHeader() {
    const { handleGoogleSignIn, loading } = useAuth();
    return (
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
                <Button variant="outline" size="sm" onClick={handleGoogleSignIn} disabled={loading}>Login with Google</Button>
                <Button size="sm" asChild><Link href="/login">Login / Sign Up</Link></Button>
                </div>
            </div>
        </header>
    );
}
