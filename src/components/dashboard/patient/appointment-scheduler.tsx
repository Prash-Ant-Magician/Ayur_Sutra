"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Clock, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Appointment, Practitioner } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

interface AppointmentSchedulerProps {
  appointments: Appointment[];
  practitioners: Practitioner[];
}

export function AppointmentScheduler({ appointments, practitioners }: AppointmentSchedulerProps) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [therapy, setTherapy] = React.useState<string | null>(null);
  const [practitioner, setPractitioner] = React.useState<string | null>(null);

  const isTimeSlotBooked = (time: string) => {
    if (!date) return false;
    return appointments.some(
      (apt) =>
        format(new Date(apt.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
        apt.time === time
    );
  };
  
  const handleBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your session for ${therapy} with a practitioner on ${date ? format(date, "PPP") : ''} at ${selectedTime} has been scheduled.`,
    });
    // Reset state after booking
    setSelectedTime(null);
    setTherapy(null);
    setPractitioner(null);
  };

  return (
    <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Choose a Date and Time</CardTitle>
            <CardDescription>Select a day and time that works best for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border mx-auto"
                    disabled={(day) => day < new Date() || day > addDays(new Date(), 60)}
                />
                {date && (
                    <div className="w-full md:w-1/2 space-y-4">
                        <h3 className="font-semibold text-center md:text-left">Available Slots for {format(date, "PPP")}</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                                <Button
                                    key={time}
                                    variant={selectedTime === time ? "default" : "outline"}
                                    onClick={() => setSelectedTime(time)}
                                    disabled={isTimeSlotBooked(time)}
                                    className="flex items-center gap-2"
                                >
                                    <Clock className="w-4 h-4" />
                                    {time}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedTime && (
            <div className="space-y-6 pt-6 border-t">
                <h3 className="text-xl font-semibold text-center font-headline">Finalize Your Booking</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-primary"/>Therapy Type</label>
                        <Select onValueChange={setTherapy}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select therapy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="abhyanga">Abhyanga</SelectItem>
                                <SelectItem value="shirodhara">Shirodhara</SelectItem>
                                <SelectItem value="panchakarma">Panchakarma</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-medium flex items-center gap-2 mb-2"><User className="w-4 h-4 text-primary"/>Practitioner</label>
                        <Select onValueChange={setPractitioner}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select practitioner" />
                            </SelectTrigger>
                            <SelectContent>
                            {practitioners.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button className="w-full" onClick={handleBooking} disabled={!therapy || !practitioner}>
                    Confirm Booking for {date ? format(date, "PPP") : ''} at {selectedTime}
                </Button>
            </div>
            )}
        </CardContent>
    </Card>
  );
}
