"use client"

import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

interface PublicPageHeaderProps {
    currentPage: 'services' | 'resources' | 'about' | 'testimonials' | 'contact';
}

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About Us" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
]

export function PublicPageHeader({ currentPage }: PublicPageHeaderProps) {
    const { handleGoogleSignIn, loading } = useAuth();
    return (
        <header className="sticky top-0 z-50 bg-card shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-auto text-primary" />
                <span className="font-headline text-2xl font-bold text-foreground">Ayur Sutra</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navLinks.map(link => (
                        <Link 
                            key={link.href}
                            href={link.href} 
                            className={cn(
                                "hover:text-primary",
                                currentPage === link.label.toLowerCase().replace(' ', '') ? "text-primary font-semibold" : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleGoogleSignIn} disabled={loading}>Login with Google</Button>
                    <Button size="sm" asChild><Link href="/login">Login / Sign Up</Link></Button>
                </div>
            </div>
        </header>
    );
}
