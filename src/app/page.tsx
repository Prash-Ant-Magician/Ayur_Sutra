import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronDown, LayoutDashboard, LogIn, Stethoscope, Users, Bot, CalendarCheck, FileText } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

export default function Home() {
  const features = [
    {
      icon: CalendarCheck,
      title: "Effortless Scheduling",
      description: "Patients can easily book and manage appointments with practitioners through an intuitive calendar interface.",
      role: "Patient"
    },
    {
      icon: FileText,
      title: "Personalized Care Plans",
      description: "Practitioners can create and assign detailed, personalized therapy plans for each patient.",
      role: "Practitioner"
    },
    {
      icon: Bot,
      title: "AI-Powered Assistance",
      description: "Both patients and practitioners benefit from AI tools for suggestions, precautions, and support.",
      role: "AI Feature"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Logo className="h-8 w-auto text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">AyurSutra</span>
            </Link>
          </div>
           <div className="flex lg:flex-1 lg:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  View Portals
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Dedicated Portals</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/patient">
                    <Users className="mr-2 h-4 w-4" />
                    Patient Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/practitioner">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Practitioner Portal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="relative isolate">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl text-center lg:text-left mx-auto">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                    Harmonizing Health, Simplifying Care.
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-muted-foreground sm:max-w-md lg:max-w-none mx-auto lg:mx-0">
                    Welcome to AyurSutra, your integrated platform for holistic wellness. Seamlessly manage therapy schedules, track your healing journey, and receive personalized care every step of the way.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6 justify-center lg:justify-start">
                    <Button asChild size="lg">
                      <Link href="/dashboard/patient/schedule">Book a Therapy Session</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                A Seamless Experience for Everyone
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our platform is designed to provide a tailored and intuitive experience for patients, practitioners, and administrators alike.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                           <p className="text-sm font-semibold text-primary">{feature.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
