import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/layout/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { admins, patients, practitioners } from "@/lib/data";
import Link from "next/link";

export default function LoginPage() {
    const users = [...patients, ...practitioners, ...admins];
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <Logo className="h-10 w-auto text-primary" />
                    <span className="font-headline text-3xl font-bold text-foreground">AyurSutra</span>
                </Link>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
                        <CardDescription>Select a user to simulate login.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm users={users} />
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
