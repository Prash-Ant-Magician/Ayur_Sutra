"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Appointment, Practitioner } from "@/lib/types";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

interface AppointmentSchedulerProps {
  appointments: Appointment[];
  practitioners: Practitioner[];
}

export function AppointmentScheduler({ appointments, practitioners }: AppointmentSchedulerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const isTimeSlotBooked = (time: string) => {
    if (!date) return false;
    return appointments.some(
      (apt) =>
        format(new Date(apt.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
        apt.time === time
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Select a Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(day) => day < new Date() || day > addDays(new Date(), 60)}
                    />
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Select a Time</CardTitle>
                    <p className="text-sm text-muted-foreground">{date ? format(date, "PPP") : "Please select a date"}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                        <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            disabled={isTimeSlotBooked(time)}
                        >
                            {time}
                        </Button>
                        ))}
                    </div>
                    {selectedTime && (
                    <div className="space-y-4 pt-4 border-t">
                         <div>
                            <label className="text-sm font-medium">Therapy Type</label>
                            <Select>
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
                            <label className="text-sm font-medium">Practitioner</label>
                            <Select>
                                <SelectTrigger>
                                <SelectValue placeholder="Select practitioner" />
                                </SelectTrigger>
                                <SelectContent>
                                {practitioners.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full">Confirm Booking</Button>
                    </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
