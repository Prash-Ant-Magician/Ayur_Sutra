"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";

type UpcomingAppointmentsProps = {
  appointments: Appointment[];
};

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div key={apt.id} className="p-4 rounded-lg border bg-card flex flex-col gap-2">
                <h4 className="font-semibold">{apt.therapyType}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{apt.time}</span>
                </div>
                <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="ghost">Cancel</Button>
                </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No upcoming appointments.</p>
        )}
      </CardContent>
    </Card>
  );
}
