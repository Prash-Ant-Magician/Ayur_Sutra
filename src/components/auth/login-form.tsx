"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const loggedInUser = userCredential.user;

      // This is a simplified way to determine role for the demo.
      // In a real app, this would be handled by a custom claim or a database lookup.
      const allUsers = [...patients, ...practitioners, ...admins];
      const user = allUsers.find(u => u.email === loggedInUser.email);

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
        // This case handles users who signed up but are not in the static data.
        // We'll default them to the patient dashboard.
        toast({
          title: "Login Successful",
          description: `Redirecting to dashboard...`,
        });
        setTimeout(() => {
          router.push("/dashboard/patient");
        }, 1000);
      }
    } catch (error: any) {
        toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
        })
    }
  }

  return (
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
  );
}
