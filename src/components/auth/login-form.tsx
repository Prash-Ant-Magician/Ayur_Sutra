"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { patients, practitioners, admins } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password cannot be empty." }),
});

const phoneSchema = z.object({
    phone: z.string().min(10, { message: "Please enter a valid phone number."}),
    code: z.string().optional(),
})

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: ""},
  });

  const handleSuccessfulLogin = (email: string | null) => {
    // This is a simplified way to determine role for the demo.
    const allUsers = [...patients, ...practitioners, ...admins];
    const user = allUsers.find(u => u.email === email);

    if (user) {
      toast({
        title: "Login Successful",
        description: `Redirecting to ${user.role} dashboard...`,
      });

      setTimeout(() => {
        switch (user.role) {
          case "patient":
            router.push("/dashboard/patient");
            break;
          case "practitioner":
            router.push("/dashboard/practitioner");
            break;
          case "admin":
            router.push("/dashboard/admin");
            break;
          default:
            router.push("/dashboard");
        }
      }, 1000);
    } else {
      toast({
        title: "Login Successful",
        description: `Redirecting to dashboard...`,
      });
      setTimeout(() => {
        router.push("/dashboard/patient");
      }, 1000);
    }
  }

  async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      handleSuccessfulLogin(userCredential.user.email);
    } catch (error: any) {
        toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
        })
    } finally {
        setLoading(false);
    }
  }

  async function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
    setLoading(true);
    if (!confirmationResult) {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response: any) => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, values.phone, appVerifier);
            setConfirmationResult(result);
            toast({ title: "Verification code sent", description: "Please check your phone for the code." });
        } catch (error: any) {
             toast({
                title: "Phone Sign-In Failed",
                description: error.message,
                variant: "destructive"
            });
        }
    } else {
        try {
            const credential = await confirmationResult.confirm(values.code);
            handleSuccessfulLogin(credential.user.email);
        } catch(error: any) {
            toast({
                title: "Invalid Code",
                description: "The code you entered is invalid. Please try again.",
                variant: "destructive"
            });
        }
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      handleSuccessfulLogin(userCredential.user.email);
    } catch (error: any) {
       toast({
            title: "Google Sign-In Failed",
            description: error.message,
            variant: "destructive"
        })
    } finally {
        setLoading(false);
    }
  }

  return (
    <>
    <div id="recaptcha-container"></div>
      <Tabs defaultValue="email">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
             <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4 pt-4">
                <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={emailForm.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <p className="text-sm text-muted-foreground pt-2">
                    <strong>Demo logins:</strong>
                    <br />
                    Patient: <code className="font-mono">alice@example.com</code>
                    <br />
                    Practitioner: <code className="font-mono">e.reed@ayursutra.com</code>
                    <br />
                    Admin: <code className="font-mono">admin@ayursutra.com</code>
                    <br />
                    Password for all is <code className="font-mono">password123</code>.
                    </p>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login with Email
                </Button>
                </form>
            </Form>
        </TabsContent>
        <TabsContent value="phone">
            <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4 pt-4">
                     <FormField
                        control={phoneForm.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                            <Input placeholder="+1 555-555-5555" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    {confirmationResult && (
                         <FormField
                            control={phoneForm.control}
                            name="code"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                <Input placeholder="123456" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {confirmationResult ? 'Verify Code' : 'Send Code'}
                    </Button>
                </form>
            </Form>
        </TabsContent>
      </Tabs>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
       <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
            <>
            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.62-4.24 1.62-4.82 0-8.75-3.93-8.75-8.75s3.93-8.75 8.75-8.75c2.62 0 4.5 1.12 5.57 2.15l2.4-2.4C18.68 1.95 15.96 0 12.48 0 5.6 0 0 5.6 0 12.5S5.6 25 12.48 25c3.34 0 6.08-1.12 8.16-3.25 2.16-2.16 2.8-5.2 2.8-7.65 0-.6-.05-1.15-.15-1.7z"
                />
            </svg>
            Google
            </>
        }
        </Button>
    </>
  );
}
