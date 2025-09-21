"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Please select a gender."}),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  hospitalLocation: z.string({required_error: "Please select a hospital location."}),
  therapy: z.string({required_error: "Please select a therapy."}),
  appointmentDate: z.date({
    required_error: "An appointment date is required.",
  }),
  appointmentTime: z.string({required_error: "Please select an appointment time."}),
  medicalHistory: z.string().optional(),
  symptoms: z.string().optional(),
  currentTherapies: z.string().optional(),
});

export function AppointmentBookingForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, password);
      const user = userCredential.user;

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

      // Store appointment details in Firestore
      const appointment = {
        patientUid: user.uid,
        hospitalLocation: values.hospitalLocation,
        therapyType: values.therapy,
        date: format(values.appointmentDate, "yyyy-MM-dd"),
        time: values.appointmentTime,
        status: 'Scheduled',
        practitionerId: 'pr1' // Assigning a default practitioner for now
      };
      await addDoc(collection(db, "appointments"), appointment);

      // Create a notification for the booking
      await addDoc(collection(db, "notifications"), {
        patientUid: user.uid,
        title: "Appointment Confirmed",
        description: `Your appointment for ${values.therapy} on ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime} is confirmed.`,
        date: new Date().toISOString(),
        read: false,
      });

      // --- Simulated Notifications ---
      console.log(`--- Sending Booking Confirmation ---`);
      console.log(`Email to: ${values.email}`);
      console.log(`Subject: Your Appointment is Confirmed!`);
      console.log(`Body: Your appointment for ${values.therapy} on ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime} is confirmed.`);
      console.log(`---`);
      console.log(`SMS to: ${values.phone}`);
      console.log(`Body: Your AyurSutra appointment for ${values.therapy} on ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime} is confirmed.`);
      console.log(`---------------------------------`);
      
      toast({
        title: "Booking Successful & Account Created!",
        description: `Your account has been created. Your email is ${values.email} and your temporary password is ${password}. Please login to see your dashboard.`,
        duration: 10000,
      });

      router.push("/login");
    } catch (error: any) {
       toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive"
      })
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
        <FormField
          control={form.control}
          name="hospitalLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hospital Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </Trigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="harmony-city">Harmony City</SelectItem>
                  <SelectItem value="serenity-valley">Serenity Valley</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="therapy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Therapy</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select therapy" />
                  </Trigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value="Abhyanga">Abhyanga</SelectItem>
                    <SelectItem value="Shirodhara">Shirodhara</SelectItem>
                    <SelectItem value="Panchakarma">Panchakarma</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Appointment Date</FormLabel>
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
                      date < new Date()
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
          name="appointmentTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </Trigger>
                </FormControl>
                <SelectContent>
                  {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:col-span-2">
          Book Appointment & Create Account
        </Button>
      </form>
    </Form>
  );
}
