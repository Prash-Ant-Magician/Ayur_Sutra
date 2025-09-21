
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Patient, Practitioner, Appointment } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DoctorVisitingSlipDialog } from "./doctor-visiting-slip";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

const formSchema = z.object({
  patientUid: z.string({ required_error: "Please select a patient." }),
  practitionerId: z.string({ required_error: "Please select a practitioner." }),
  therapy: z.string({ required_error: "Please select a therapy." }),
  appointmentDate: z.date({ required_error: "An appointment date is required." }),
  appointmentTime: z.string({ required_error: "Please select an appointment time." }),
});

interface AdminAppointmentFormProps {
  patients: Patient[];
  practitioners: Practitioner[];
}

export function AdminAppointmentForm({ patients, practitioners }: AdminAppointmentFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const [slipData, setSlipData] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const appointmentData = {
        patientUid: values.patientUid,
        practitionerId: values.practitionerId,
        therapyType: values.therapy,
        date: format(values.appointmentDate, "yyyy-MM-dd"),
        time: values.appointmentTime,
        status: 'Scheduled',
      };

      await addDoc(collection(db, "appointments"), appointmentData);

      await addDoc(collection(db, "notifications"), {
        patientUid: values.patientUid,
        title: "New Appointment Scheduled by Admin",
        description: `An appointment for ${values.therapy} on ${format(values.appointmentDate, "PPP")} at ${values.appointmentTime} has been booked for you.`,
        date: new Date().toISOString(),
        read: false,
      });

      const patient = patients.find(p => p.id === values.patientUid);
      const practitioner = practitioners.find(p => p.id === values.practitionerId);
      
      setSlipData({
          patientName: patient?.name,
          practitionerName: practitioner?.name,
          therapyType: values.therapy,
          date: format(values.appointmentDate, "PPP"),
          time: values.appointmentTime,
          clinicName: "Ayur Sutra Clinic",
          clinicAddress: "123 Wellness Lane, Harmony City, 45678",
      });

      setShowSlip(true);
      toast({
        title: "Appointment Booked!",
        description: "The visiting slip is ready to be printed.",
      });

      form.reset();

    } catch (error) {
        toast({
            title: "Booking Failed",
            description: "There was an error booking the appointment. Please try again.",
            variant: "destructive"
        });
        console.error("Booking error:", error);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="patientUid"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Patient</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="practitionerId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Practitioner</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a practitioner" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {practitioners.map(practitioner => (
                        <SelectItem key={practitioner.id} value={practitioner.id}>{practitioner.name}</SelectItem>
                    ))}
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
                        date < new Date(new Date().toDateString())
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
                <FormItem className="md:col-span-2">
                <FormLabel>Appointment Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
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
          <Button type="submit" className="w-full md:col-span-2" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Book Appointment
          </Button>
        </form>
      </Form>
      {slipData && (
        <DoctorVisitingSlipDialog 
            isOpen={showSlip}
            onClose={() => setShowSlip(false)}
            slipData={slipData}
        />
      )}
    </>
  );
}
