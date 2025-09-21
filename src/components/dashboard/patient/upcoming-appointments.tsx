"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/types";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";

type UpcomingAppointmentsProps = {
  appointments: Appointment[];
  getPractitionerName: (id: string) => string;
};

export function UpcomingAppointments({ appointments, getPractitionerName }: UpcomingAppointmentsProps) {
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
                    <User className="w-4 h-4 mr-2" />
                    <span>Dr. {getPractitionerName(apt.practitionerId)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(new Date(apt.date), "EEEE, MMMM do, yyyy")}</span>
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
