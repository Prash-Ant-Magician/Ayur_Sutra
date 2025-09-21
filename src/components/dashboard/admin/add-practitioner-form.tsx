"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  specialty: z.string().min(2, { message: "Specialty is required." }),
});

export function AddPractitionerForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { specialty: "Ayurvedic Medicine" }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    try {
      // As with adding a patient, this uses the client SDK and will sign the admin out.
      // For a real-world app, this action should be handled by a secure backend function.
      const { user } = await createUserWithEmailAndPassword(auth, values.email, password);

      await updateProfile(user, { displayName: values.name });

      // Store user role in 'users' collection
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: values.name,
        email: values.email,
        role: "practitioner",
      });
      
      // Store practitioner details in 'practitioners' collection
      const practitionerDocRef = doc(db, "practitioners", user.uid);
      await setDoc(practitionerDocRef, {
        id: user.uid,
        name: values.name,
        email: values.email,
        role: 'practitioner',
        avatar: `https://picsum.photos/seed/${user.uid}/200/200`,
        lastLogin: new Date().toISOString(),
        specialty: values.specialty,
      });

      toast({
        title: "Practitioner Account Created!",
        description: `Practitioner: ${values.name}. Email: ${values.email}. Temporary Password: ${password}`,
        duration: 10000,
      });

      form.reset();
      router.refresh();
      // The sign-out and redirect below are necessary due to client-side SDK limitations.
      await auth.signOut();
      router.push('/login');
      toast({
        title: "Admin Signed Out",
        description: "You have been signed out for security reasons. Please log back in.",
        duration: 8000,
      });

    } catch (error: any) {
       toast({
        title: "Creation Failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Dr. John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="dr.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Ayurvedic Medicine">Ayurvedic Medicine</SelectItem>
                        <SelectItem value="Panchakarma Therapy">Panchakarma Therapy</SelectItem>
                        <SelectItem value="Herbal Medicine">Herbal Medicine</SelectItem>
                        <SelectItem value="Yoga & Meditation">Yoga & Meditation</SelectItem>
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Practitioner
        </Button>
      </form>
    </Form>
  );
}
