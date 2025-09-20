import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/layout/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                 <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Logo className="h-10 w-auto text-primary" />
                    <span className="font-headline text-3xl font-bold text-foreground">AyurSutra</span>
                </Link>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                        <CardDescription>Join AyurSutra and start your wellness journey.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignupForm />
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="underline">
                                Log in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
