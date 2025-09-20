"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password cannot be empty." }),
});

export function LoginForm({ users }: { users: User[] }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSuccessfulLogin = (email: string | null) => {
    // This is a simplified way to determine role for the demo.
    // In a real app, this would be handled by a custom claim or a database lookup.
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
      // This case handles users who signed up but are not in the static data (e.g. via Google).
      // We'll default them to the patient dashboard.
      toast({
        title: "Login Successful",
        description: `Redirecting to dashboard...`,
      });
      setTimeout(() => {
        router.push("/dashboard/patient");
      }, 1000);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      handleSuccessfulLogin(userCredential.user.email);
    } catch (error: any) {
        toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
        })
    }
  }

  async function handleGoogleSignIn() {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      handleSuccessfulLogin(userCredential.user.email);
    } catch (error: any) {
       toast({
            title: "Google Sign-In Failed",
            description: error.message,
            variant: "destructive"
        })
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
              Password for all is <code className="font-mono">password123</code>. Or, sign up with a new account.
            </p>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
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
       <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
        <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
            <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.62-4.24 1.62-4.82 0-8.75-3.93-8.75-8.75s3.93-8.75 8.75-8.75c2.62 0 4.5 1.12 5.57 2.15l2.4-2.4C18.68 1.95 15.96 0 12.48 0 5.6 0 0 5.6 0 12.5S5.6 25 12.48 25c3.34 0 6.08-1.12 8.16-3.25 2.16-2.16 2.8-5.2 2.8-7.65 0-.6-.05-1.15-.15-1.7z"
            />
        </svg>
        Google
        </Button>
    </>
  );
}
