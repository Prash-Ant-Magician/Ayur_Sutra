import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, LayoutDashboard, LogIn, Stethoscope, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'landing-hero');

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
            <Button asChild variant="ghost">
              <Link href="/login">
                Log in <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="relative isolate">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-headline">
                    Harmonizing Health, Simplifying Care.
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-muted-foreground sm:max-w-md lg:max-w-none">
                    Welcome to AyurSutra, your integrated platform for holistic wellness. Seamlessly manage therapy schedules, track your healing journey, and receive personalized care every step of the way.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Button asChild size="lg">
                      <Link href="/dashboard/patient/schedule">Book a Therapy Session</Link>
                    </Button>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      {heroImage && (
                        <Image
                          src={heroImage.imageUrl}
                          alt={heroImage.description}
                          data-ai-hint={heroImage.imageHint}
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          width={600}
                          height={900}
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                       <Image
                          src="https://picsum.photos/seed/2/600/900"
                          alt="Calm therapy session"
                          data-ai-hint="calm therapy"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          width={600}
                          height={900}
                        />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                       <Image
                          src="https://picsum.photos/seed/3/600/400"
                          alt="Natural herbs and oils"
                          data-ai-hint="natural herbs"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          width={600}
                          height={400}
                        />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
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
                Dedicated Portals for Every Role
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Access tailored features and tools designed for your specific needs within the AyurSutra ecosystem.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-headline">Patient Portal</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Manage your appointments, track your therapy progress, and connect with our AI assistant for support.
                    </CardDescription>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/patient">Access Portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Stethoscope className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-headline">Practitioner Portal</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      View your schedule, manage patient data, and utilize AI-powered tools to create personalized therapy plans.
                    </CardDescription>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/practitioner">Access Portal <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <LayoutDashboard className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-headline">Admin Dashboard</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      Oversee all platform activities, manage users, and view system analytics and configurations.
                    </CardDescription>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/admin">Access Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
