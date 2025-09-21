
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Please select a gender."}),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  medicalHistory: z.string().optional(),
  symptoms: z.string().optional(),
  currentTherapies: z.string().optional(),
});

export function AddPatientForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    try {
      // We need a separate auth instance to create a user without signing out the admin
      // This is a simplified approach. For production, you'd use Admin SDK on a backend.
      // Since we don't have a backend, we'll create the user and immediately sign the admin back in.
      // THIS IS NOT A PRODUCTION-READY SOLUTION.
      
      const { user } = await createUserWithEmailAndPassword(auth, values.email, password);

      // Add display name to user profile
      await updateProfile(user, { displayName: values.name });

      // Store user role and other details in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: values.name,
        email: values.email,
        role: "patient",
        phone: values.phone,
        gender: values.gender,
        dob: values.dob,
        address: values.address,
        medicalHistory: values.medicalHistory || '',
        symptoms: values.symptoms || '',
        currentTherapies: values.currentTherapies || '',
      });
      
      toast({
        title: "Patient Account Created!",
        description: `Patient: ${values.name}. Email: ${values.email}. Temporary Password: ${password}`,
        duration: 10000,
      });

      form.reset();
      router.push("/dashboard/admin/patients");

    } catch (error: any) {
       toast({
        title: "Creation Failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
        setIsLoading(false);
        // Note: The admin will be signed out after creating a user. This is a limitation
        // of using the client-side SDK for user creation. A better solution involves a backend function.
        await auth.signOut();
        toast({
            title: "Admin Signed Out",
            description: "You have been signed out for security. Please log in again.",
            duration: 8000,
        });
        router.push('/login');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
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
         <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="123 Wellness Lane, Harmony City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="medicalHistory"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Medical History (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Hypertension, Type 2 Diabetes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Current Symptoms (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Chronic back pain, insomnia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="currentTherapies"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Current Medications/Therapies (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Metformin, Lisinopril" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:col-span-2" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Patient
        </Button>
      </form>
    </Form>
  );
}
